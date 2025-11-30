import { Vector3 } from 'three';
import { Structure, Atom, Bond, Chain, ElementType } from '../types';

// Basic MOL2 parser (for ligands)
export const parseMOL2 = (content: string): Structure => {
    const lines = content.split('\n');
    const atoms: Atom[] = [];
    const bonds: Bond[] = [];

    let inAtomSection = false;
    let inBondSection = false;
    let atomIdx = 0;

    lines.forEach((line) => {
        const trimmed = line.trim();

        if (trimmed === '@<TRIPOS>ATOM') {
            inAtomSection = true;
            inBondSection = false;
            atomIdx = 0;
            return;
        } else if (trimmed === '@<TRIPOS>BOND') {
            inAtomSection = false;
            inBondSection = true;
            return;
        } else if (trimmed.startsWith('@<TRIPOS>')) {
            inAtomSection = false;
            inBondSection = false;
            return;
        }

        if (inAtomSection) {
            const parts = trimmed.split(/\s+/);
            if (parts.length >= 6) {
                const x = parseFloat(parts[2]);
                const y = parseFloat(parts[3]);
                const z = parseFloat(parts[4]);
                const element = parts[5].split('.')[0]; // Remove atom type suffix

                const atom: Atom = {
                    id: atomIdx + 1,
                    serial: atomIdx + 1,
                    name: element,
                    element: element.toUpperCase() as ElementType || ElementType.C,
                    residueName: parts[7] || 'LIG',
                    residueSeq: parseInt(parts[6]) || 1,
                    chainID: 'A',
                    position: new Vector3(x, y, z),
                    isHetAtm: true,
                    bFactor: 0,
                    occupancy: 1
                };
                atoms.push(atom);
                atomIdx++;
            }
        } else if (inBondSection) {
            const parts = trimmed.split(/\s+/);
            if (parts.length >= 4) {
                const atom1Idx = parseInt(parts[1]) - 1;
                const atom2Idx = parseInt(parts[2]) - 1;
                const order = parts[3] === 'ar' ? 1 : parseInt(parts[3]) || 1;

                if (atom1Idx >= 0 && atom1Idx < atoms.length && atom2Idx >= 0 && atom2Idx < atoms.length) {
                    bonds.push({
                        atom1: atoms[atom1Idx],
                        atom2: atoms[atom2Idx],
                        order
                    });
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

