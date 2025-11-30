import { Vector3 } from 'three';

import { Atom, Bond, Chain, ElementType, Residue, Structure, PdbMetadata } from '../types';

export const parsePDB = (content: string): Structure => {
    const lines = content.split('\n');
    const atoms: Atom[] = [];
    const residuesMap = new Map<string, Residue>();
    const chainsMap = new Map<string, Chain>();

    const helices: Structure['helices'] = [];
    const sheets: Structure['sheets'] = [];

    const metadata: PdbMetadata = {
        authors: []
    };

    // 1. First Pass: Parse Atoms, Structure, and Metadata
    lines.forEach((line) => {
        const type = line.substring(0, 6).trim();

        // Metadata Parsing
        if (type === 'HEADER') {
            metadata.classification = line.substring(10, 50).trim();
            metadata.depositionDate = line.substring(50, 59).trim();
            metadata.id = line.substring(62, 66).trim();
        } else if (type === 'TITLE') {
            metadata.title = (metadata.title || '') + line.substring(10, 80).trim() + ' ';
        } else if (type === 'EXPDTA') {
            metadata.experimentMethod = line.substring(10, 79).trim();
        } else if (type === 'AUTHOR') {
            const authorStr = line.substring(10, 79).trim();
            metadata.authors?.push(authorStr);
        } else if (type === 'REMARK') {
            const remarkNum = parseInt(line.substring(7, 10));
            if (remarkNum === 2) {
                if (line.includes('RESOLUTION')) {
                    const match = line.match(/RESOLUTION\.\s+(\d+\.\d+)/);
                    if (match) metadata.resolution = parseFloat(match[1]);
                }
            }
        }

        // Structure Parsing
        else if (type === 'HELIX') {
            const startChain = line[19];
            const startSeq = parseInt(line.substring(21, 25));
            const endChain = line[31];
            const endSeq = parseInt(line.substring(33, 37));
            helices.push({ startChain, startSeq, endChain, endSeq });
        }
        else if (type === 'SHEET') {
            const startChain = line[21];
            const startSeq = parseInt(line.substring(22, 26));
            const endChain = line[32];
            const endSeq = parseInt(line.substring(33, 37));
            sheets.push({ startChain, startSeq, endChain, endSeq });
        }
        else if (type === 'ATOM' || type === 'HETATM') {
            const serial = parseInt(line.substring(6, 11));
            const name = line.substring(12, 16).trim();
            const altLoc = line[16];
            const resName = line.substring(17, 20).trim();
            const chainID = line[21].trim() || 'A';
            const resSeq = parseInt(line.substring(22, 26));
            const x = parseFloat(line.substring(30, 38));
            const y = parseFloat(line.substring(38, 46));
            const z = parseFloat(line.substring(46, 54));
            const occupancy = parseFloat(line.substring(54, 60)) || 0;
            const bFactor = parseFloat(line.substring(60, 66)) || 0;
            let element = line.substring(76, 78).trim();

            if (!element) {
                // Infer element from name if missing
                const firstChar = name.replace(/[0-9]/g, '').substring(0, 1);
                element = firstChar;
            }

            // Skip alternative locations
            if (altLoc !== ' ' && altLoc !== 'A' && altLoc !== '') return;

            const position = new Vector3(x, y, z);

            const atom: Atom = {
                id: serial,
                serial,
                name,
                element: element as ElementType || ElementType.UNKNOWN,
                residueName: resName,
                residueSeq: resSeq,
                chainID,
                position,
                isHetAtm: type === 'HETATM',
                bFactor,
                occupancy
            };

            atoms.push(atom);

            // Group into Residues
            const resKey = `${chainID}_${resSeq}`;
            if (!residuesMap.has(resKey)) {
                residuesMap.set(resKey, {
                    name: resName,
                    seq: resSeq,
                    chainID,
                    atoms: [],
                    center: new Vector3()
                });
            }
            const res = residuesMap.get(resKey)!;
            res.atoms.push(atom);
            res.center.add(position);
        }
    });

    // 2. Finalize Residues & Build Chains
    residuesMap.forEach((res) => {
        res.center.divideScalar(res.atoms.length);

        // Determine secondary structure
        const isHelix = helices.some(h => h.startChain === res.chainID && res.seq >= h.startSeq && res.seq <= h.endSeq);
        const isSheet = sheets.some(s => s.startChain === res.chainID && res.seq >= s.startSeq && res.seq <= s.endSeq);

        if (isHelix) res.secondaryStructureType = 'HELIX';
        else if (isSheet) res.secondaryStructureType = 'SHEET';
        else res.secondaryStructureType = 'LOOP';

        if (!chainsMap.has(res.chainID)) {
            chainsMap.set(res.chainID, {
                id: res.chainID,
                residues: [],
                type: res.name === 'HOH' ? 'WATER' : (['A', 'G', 'C', 'T', 'U'].includes(res.name.trim()) ? 'DNA' : 'PROTEIN')
            });
        }
        chainsMap.get(res.chainID)!.residues.push(res);
    });

    chainsMap.forEach(chain => {
        chain.residues.sort((a, b) => a.seq - b.seq);
        const firstRes = chain.residues[0];
        if (firstRes.atoms[0].isHetAtm && firstRes.name !== 'HOH' && chain.residues.length < 5) {
            chain.type = 'LIGAND';
        }
    });

    // 3. Generate Bonds (Simplified)
    const bonds: Bond[] = [];
    const spatialHash: Record<string, Atom[]> = {};
    const gridSize = 2.0;
    const hashPos = (p: Vector3) => `${Math.floor(p.x / gridSize)},${Math.floor(p.y / gridSize)},${Math.floor(p.z / gridSize)}`;

    atoms.forEach(atom => {
        const key = hashPos(atom.position);
        if (!spatialHash[key]) spatialHash[key] = [];
        spatialHash[key].push(atom);
    });

    atoms.forEach(atom => {
        const cx = Math.floor(atom.position.x / gridSize);
        const cy = Math.floor(atom.position.y / gridSize);
        const cz = Math.floor(atom.position.z / gridSize);

        for (let x = cx - 1; x <= cx + 1; x++) {
            for (let y = cy - 1; y <= cy + 1; y++) {
                for (let z = cz - 1; z <= cz + 1; z++) {
                    const neighbors = spatialHash[`${x},${y},${z}`];
                    if (!neighbors) continue;

                    for (const neighbor of neighbors) {
                        if (atom.id >= neighbor.id) continue;

                        const sameRes = atom.residueSeq === neighbor.residueSeq && atom.chainID === neighbor.chainID;
                        const adjRes = Math.abs(atom.residueSeq - neighbor.residueSeq) === 1 && atom.chainID === neighbor.chainID;

                        if (!sameRes && !adjRes) continue;

                        const distSq = atom.position.distanceToSquared(neighbor.position);
                        if (distSq < 3.8 && distSq > 0.4) {
                            bonds.push({ atom1: atom, atom2: neighbor, order: 1 });
                        }
                    }
                }
            }
        }
    });

    const min = new Vector3(Infinity, Infinity, Infinity);
    const max = new Vector3(-Infinity, -Infinity, -Infinity);
    atoms.forEach(a => {
        min.min(a.position);
        max.max(a.position);
    });
    const center = new Vector3().addVectors(min, max).multiplyScalar(0.5);
    const size = new Vector3().subVectors(max, min);

    // Clean title
    if (metadata.title) metadata.title = metadata.title.trim();

    return {
        chains: Array.from(chainsMap.values()),
        atoms,
        bonds,
        helices,
        sheets,
        center,
        size,
        metadata
    };
};

