import { Vector3 } from 'three';
import { Structure, Atom, Bond, Chain, ElementType, Residue } from '../types';

// Basic GRO parser (GROMACS)
export const parseGRO = (content: string): Structure => {
    const lines = content.split('\n');
    const atoms: Atom[] = [];
    const residuesMap = new Map<string, Residue>();
    const chainsMap = new Map<string, Chain>();
    
    // Skip title line
    let lineIdx = 1;
    
    // Parse atom count
    const atomCount = parseInt(lines[lineIdx]?.trim() || '0');
    lineIdx++;
    
    // Parse atoms
    for (let i = 0; i < atomCount && lineIdx < lines.length; i++, lineIdx++) {
        const line = lines[lineIdx];
        // GRO format: resnum resname atomname atomnum x y z [vx vy vz]
        const resnum = parseInt(line.substring(0, 5).trim()) || 1;
        const resname = line.substring(5, 10).trim() || 'UNK';
        const atomname = line.substring(10, 15).trim() || 'C';
        const x = parseFloat(line.substring(20, 28)) * 10; // Convert nm to Angstrom
        const y = parseFloat(line.substring(28, 36)) * 10;
        const z = parseFloat(line.substring(36, 44)) * 10;
        
        const element = atomname.replace(/[0-9]/g, '').substring(0, 1) || 'C';
        const chainID = 'A';
        
        const position = new Vector3(x, y, z);
        const atom: Atom = {
            id: i + 1,
            serial: i + 1,
            name: atomname,
            element: element.toUpperCase() as ElementType || ElementType.C,
            residueName: resname,
            residueSeq: resnum,
            chainID,
            position,
            isHetAtm: resname === 'SOL' || resname === 'WAT',
            bFactor: 0,
            occupancy: 1
        };
        
        atoms.push(atom);
        
        const resKey = `${chainID}_${resnum}`;
        if (!residuesMap.has(resKey)) {
            residuesMap.set(resKey, {
                name: resname,
                seq: resnum,
                chainID,
                atoms: [],
                center: new Vector3()
            });
        }
        const res = residuesMap.get(resKey)!;
        res.atoms.push(atom);
        res.center.add(position);
    }
    
    // Build chains
    residuesMap.forEach((res) => {
        res.center.divideScalar(res.atoms.length);
        
        if (!chainsMap.has(res.chainID)) {
            chainsMap.set(res.chainID, {
                id: res.chainID,
                residues: [],
                type: res.name === 'SOL' || res.name === 'WAT' ? 'WATER' : 'PROTEIN'
            });
        }
        chainsMap.get(res.chainID)!.residues.push(res);
    });
    
    chainsMap.forEach(chain => {
        chain.residues.sort((a, b) => a.seq - b.seq);
    });
    
    // Generate bonds (simplified)
    const bonds: Bond[] = [];
    const gridSize = 2.0;
    const spatialHash: Record<string, Atom[]> = {};
    
    atoms.forEach(atom => {
        const key = `${Math.floor(atom.position.x / gridSize)},${Math.floor(atom.position.y / gridSize)},${Math.floor(atom.position.z / gridSize)}`;
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
    
    return {
        chains: Array.from(chainsMap.values()),
        atoms,
        bonds,
        helices: [],
        sheets: [],
        center,
        size,
        metadata: {}
    };
};

