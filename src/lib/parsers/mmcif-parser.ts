import { Vector3 } from 'three';
import { Structure, Atom, Bond, Chain, ElementType, Residue } from '../types';

// Basic mmCIF parser (simplified)
export const parseMMCIF = (content: string): Structure => {
    // For now, try to extract ATOM records similar to PDB
    // A more complete parser would handle the full mmCIF format
    const lines = content.split('\n');
    const atoms: Atom[] = [];
    const residuesMap = new Map<string, Residue>();
    const chainsMap = new Map<string, Chain>();
    
    let inAtomSite = false;
    let atomSiteLabels: string[] = [];
    
    lines.forEach((line) => {
        const trimmed = line.trim();
        
        if (trimmed.startsWith('_atom_site.')) {
            inAtomSite = true;
            const label = trimmed.split('.')[1]?.split(/\s/)[0];
            if (label) atomSiteLabels.push(label);
        } else if (trimmed.startsWith('loop_')) {
            inAtomSite = false;
            atomSiteLabels = [];
        } else if (inAtomSite && trimmed && !trimmed.startsWith('#')) {
            const fields = trimmed.split(/\s+/);
            if (fields.length >= atomSiteLabels.length) {
                const getField = (name: string): string => {
                    const idx = atomSiteLabels.indexOf(name);
                    return idx >= 0 ? fields[idx] : '';
                };
                
                const groupPDB = getField('group_PDB');
                if (groupPDB === 'ATOM' || groupPDB === 'HETATM') {
                    const x = parseFloat(getField('Cartn_x') || getField('Cartn_x_esd') || '0');
                    const y = parseFloat(getField('Cartn_y') || getField('Cartn_y_esd') || '0');
                    const z = parseFloat(getField('Cartn_z') || getField('Cartn_z_esd') || '0');
                    const labelAtomId = getField('label_atom_id');
                    const labelCompId = getField('label_comp_id');
                    const labelAsymId = getField('label_asym_id') || 'A';
                    const labelSeqId = parseInt(getField('label_seq_id') || '0');
                    const element = getField('type_symbol') || labelAtomId[0] || 'X';
                    
                    const position = new Vector3(x, y, z);
                    const serial = atoms.length + 1;
                    
                    const atom: Atom = {
                        id: serial,
                        serial,
                        name: labelAtomId,
                        element: element.toUpperCase() as ElementType || ElementType.UNKNOWN,
                        residueName: labelCompId,
                        residueSeq: labelSeqId,
                        chainID: labelAsymId,
                        position,
                        isHetAtm: groupPDB === 'HETATM',
                        bFactor: parseFloat(getField('B_iso_or_equiv') || '0'),
                        occupancy: parseFloat(getField('occupancy') || '1')
                    };
                    
                    atoms.push(atom);
                    
                    const resKey = `${labelAsymId}_${labelSeqId}`;
                    if (!residuesMap.has(resKey)) {
                        residuesMap.set(resKey, {
                            name: labelCompId,
                            seq: labelSeqId,
                            chainID: labelAsymId,
                            atoms: [],
                            center: new Vector3()
                        });
                    }
                    const res = residuesMap.get(resKey)!;
                    res.atoms.push(atom);
                    res.center.add(position);
                }
            }
        }
    });
    
    // Build chains and bonds similar to PDB parser
    residuesMap.forEach((res) => {
        res.center.divideScalar(res.atoms.length);
        
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

