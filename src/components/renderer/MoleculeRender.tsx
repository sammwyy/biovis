import { useMemo, useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { InstancedMesh, Object3D, Color, CatmullRomCurve3, Vector3, DoubleSide } from 'three';

import { Structure, ViewerState, Atom } from '@/lib/types';
import { getElementColor, getAtomRadius, SECONDARY_COLORS, CHAIN_COLORS } from '@/lib/constants';

interface Props {
    structure: Structure;
    viewState: ViewerState;
    onAtomClick: (atom: Atom) => void;
    onAtomHover: (atom: Atom | null) => void;
}

const tempObject = new Object3D();
const tempColor = new Color();
const hoverColor = new Color('#FACC15'); // Yellow-400
const selectColor = new Color('#10B981'); // Emerald-500

export const MoleculeRender: React.FC<Props> = ({ structure, viewState, onAtomClick, onAtomHover }) => {
    const { showWater, showLigands, showProtein, opacity, hoveredAtom, selectedAtom } = viewState;

    const atomMeshRef = useRef<InstancedMesh>(null);
    const bondMeshRef = useRef<InstancedMesh>(null);

    const visibleAtoms = useMemo(() => {
        return structure.atoms.filter(atom => {
            if (atom.residueName === 'HOH') return showWater;
            if (atom.isHetAtm && atom.residueName !== 'HOH') return showLigands;
            return false;
        });
    }, [structure, showWater, showLigands, showProtein]);

    const visibleBonds = useMemo(() => {
        const atomIds = new Set(visibleAtoms.map(a => a.id));
        return structure.bonds.filter(b => atomIds.has(b.atom1.id) && atomIds.has(b.atom2.id));
    }, [structure, visibleAtoms]);


    // Update Atom Geometry
    useEffect(() => {
        if (!atomMeshRef.current) return;

        atomMeshRef.current.count = visibleAtoms.length;

        visibleAtoms.forEach((atom, i) => {
            const radius = getAtomRadius(atom.element, 0.4);
            tempObject.position.copy(atom.position);
            tempObject.scale.setScalar(radius);
            tempObject.updateMatrix();
            atomMeshRef.current!.setMatrixAt(i, tempObject.matrix);

            tempColor.set(getElementColor(atom.element));
            atomMeshRef.current!.setColorAt(i, tempColor);
        });

        atomMeshRef.current.instanceMatrix.needsUpdate = true;
        if (atomMeshRef.current.instanceColor) atomMeshRef.current.instanceColor.needsUpdate = true;
    }, [visibleAtoms]);

    // Update Colors (Interact)
    useEffect(() => {
        if (!atomMeshRef.current) return;

        visibleAtoms.forEach((atom, i) => {
            if (selectedAtom?.id === atom.id) {
                tempColor.copy(selectColor);
            } else if (hoveredAtom?.id === atom.id) {
                tempColor.copy(hoverColor);
            } else {
                tempColor.set(getElementColor(atom.element));
            }
            atomMeshRef.current!.setColorAt(i, tempColor);
        });

        if (atomMeshRef.current.instanceColor) atomMeshRef.current.instanceColor.needsUpdate = true;
    }, [hoveredAtom, selectedAtom, visibleAtoms]);


    // Update Bond Geometry
    useEffect(() => {
        if (!bondMeshRef.current) return;

        bondMeshRef.current.count = visibleBonds.length;
        const bondRadius = 0.1;

        visibleBonds.forEach((bond, i) => {
            const start = bond.atom1.position;
            const end = bond.atom2.position;
            const dist = start.distanceTo(end);
            const mid = new Vector3().addVectors(start, end).multiplyScalar(0.5);

            tempObject.position.copy(mid);
            tempObject.lookAt(end);
            tempObject.rotateX(Math.PI / 2);
            tempObject.scale.set(bondRadius, dist, bondRadius);
            tempObject.updateMatrix();

            bondMeshRef.current!.setMatrixAt(i, tempObject.matrix);

            tempColor.set('#A1A1AA'); // Zinc-400
            bondMeshRef.current!.setColorAt(i, tempColor);
        });

        bondMeshRef.current.instanceMatrix.needsUpdate = true;
        if (bondMeshRef.current.instanceColor) bondMeshRef.current.instanceColor.needsUpdate = true;
    }, [visibleBonds]);


    const handlePointerMove = (e: any) => {
        e.stopPropagation();
        const instanceId = e.instanceId;
        if (instanceId !== undefined) {
            const atom = visibleAtoms[instanceId];
            if (hoveredAtom?.id !== atom.id) {
                onAtomHover(atom);
            }
        }
    };

    const handlePointerOut = () => {
        if (hoveredAtom) onAtomHover(null);
    };

    const handleClick = (e: any) => {
        e.stopPropagation();
        const instanceId = e.instanceId;
        if (instanceId !== undefined) {
            const atom = visibleAtoms[instanceId];
            onAtomClick(atom);
        }
    };

    // --- Ribbon Generation ---
    const backboneMeshes = useMemo(() => {
        if (!showProtein) return null;

        const chains = structure.chains.filter(c => c.type === 'PROTEIN' || c.type === 'DNA');

        return chains.map((chain, index) => {
            const traceAtoms = chain.residues.map(r => {
                return r.atoms.find(a => a.name === 'CA' || a.name === "P") || r.atoms[0];
            }).filter(Boolean);

            if (traceAtoms.length < 2) return null;

            const points = traceAtoms.map(a => a.position);
            const curve = new CatmullRomCurve3(points, false, 'catmullrom', 0.2);

            // Use the palette, cycling through based on chain index
            const baseColor = chain.type === 'DNA'
                ? SECONDARY_COLORS.DNA
                : CHAIN_COLORS[index % CHAIN_COLORS.length];

            return (
                <mesh key={chain.id}>
                    <tubeGeometry args={[curve, points.length * 8, 0.3, 8, false]} />
                    <meshStandardMaterial
                        color={baseColor}
                        side={DoubleSide}
                        transparent
                        opacity={opacity}
                        roughness={0.3}
                        metalness={0.1}
                    />
                </mesh>
            );
        });
    }, [structure, showProtein, opacity]);

    return (
        <group>
            <instancedMesh
                ref={atomMeshRef}
                args={[undefined, undefined, 0]}
                onPointerMove={handlePointerMove}
                onPointerOut={handlePointerOut}
                onClick={handleClick}
            >
                <sphereGeometry args={[1, 12, 12]} />
                <meshStandardMaterial transparent opacity={opacity} metalness={0.2} roughness={0.5} />
            </instancedMesh>

            <instancedMesh
                ref={bondMeshRef}
                args={[undefined, undefined, 0]}
            >
                <cylinderGeometry args={[1, 1, 1, 6]} />
                <meshStandardMaterial transparent opacity={opacity} metalness={0.1} roughness={0.8} />
            </instancedMesh>

            {backboneMeshes}
        </group>
    );
};

