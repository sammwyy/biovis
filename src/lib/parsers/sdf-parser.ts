import { Vector3 } from 'three';
import { Structure, Atom, Bond, Chain, ElementType } from '../types';

// Basic SDF parser (for ligands)
export const parseSDF = (content: string): Structure => {
    const lines = content.split('\n');
    const atoms: Atom[] = [];
    const bonds: Bond[] = [];

    let lineIdx = 0;
    let atomCount = 0;
    let bondCount = 0;

    // Skip header
    while (lineIdx < lines.length && !lines[lineIdx].includes('V2000') && !lines[lineIdx].includes('V3000')) {
        lineIdx++;
    }

    // Parse counts line
    if (lineIdx < lines.length) {
        const countsLine = lines[lineIdx].trim().split(/\s+/);
        atomCount = parseInt(countsLine[0] || '0');
        bondCount = parseInt(countsLine[1] || '0');
        lineIdx++;
    }

    // Parse atoms
    for (let i = 0; i < atomCount && lineIdx < lines.length; i++, lineIdx++) {
        const line = lines[lineIdx];
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 4) {
            const x = parseFloat(parts[0]);
            const y = parseFloat(parts[1]);
            const z = parseFloat(parts[2]);
            const element = parts[3] || 'C';

            const atom: Atom = {
                id: i + 1,
                serial: i + 1,
                name: element,
                element: element.toUpperCase() as ElementType || ElementType.C,
                residueName: 'LIG',
                residueSeq: 1,
                chainID: 'A',
                position: new Vector3(x, y, z),
                isHetAtm: true,
                bFactor: 0,
                occupancy: 1
            };
            atoms.push(atom);
        }
    }

    // Parse bonds
    for (let i = 0; i < bondCount && lineIdx < lines.length; i++, lineIdx++) {
        const line = lines[lineIdx];
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 3) {
            const atom1Idx = parseInt(parts[0]) - 1;
            const atom2Idx = parseInt(parts[1]) - 1;
            const order = parseInt(parts[2]) || 1;

            if (atom1Idx >= 0 && atom1Idx < atoms.length && atom2Idx >= 0 && atom2Idx < atoms.length) {
                bonds.push({
                    atom1: atoms[atom1Idx],
                    atom2: atoms[atom2Idx],
                    order
                });
            }
        }
    }

    const min = new Vector3(Infinity, Infinity, Infinity);
    const max = new Vector3(-Infinity, -Infinity, -Infinity);
    atoms.forEach(a => {
        min.min(a.position);
        max.max(a.position);
    });
    const center = new Vector3().addVectors(min, max).multiplyScalar(0.5);
    const size = new Vector3().subVectors(max, min);

    const chain: Chain = {
        id: 'A',
        residues: [{
            name: 'LIG',
            seq: 1,
            chainID: 'A',
            atoms,
            center
        }],
        type: 'LIGAND'
    };

    return {
        chains: [chain],
        atoms,
        bonds,
        helices: [],
        sheets: [],
        center,
        size,
        metadata: {}
    };
};

