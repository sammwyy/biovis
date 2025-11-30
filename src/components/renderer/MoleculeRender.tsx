import { useMemo, useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { InstancedMesh, Object3D, Color, CatmullRomCurve3, Vector3, DoubleSide, SphereGeometry, MeshStandardMaterial, Group, CylinderGeometry } from 'three';

import { Structure, ViewerState, Atom, RenderStyle } from '@/lib/types';
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
    const { showWater, showLigands, showProtein, opacity, hoveredAtom, selectedAtom, renderStyle } = viewState;

    const atomMeshRef = useRef<InstancedMesh>(null);
    const bondMeshRef = useRef<InstancedMesh>(null);
    const groupRef = useRef<Group>(null);

    const visibleAtoms = useMemo(() => {
        return structure.atoms.filter(atom => {
            if (atom.residueName === 'HOH') return showWater;
            if (atom.isHetAtm && atom.residueName !== 'HOH') return showLigands;
            if (!atom.isHetAtm && atom.residueName !== 'HOH') return showProtein;
            return false;
        });
    }, [structure, showWater, showLigands, showProtein]);

    const visibleBonds = useMemo(() => {
        const atomIds = new Set(visibleAtoms.map(a => a.id));
        return structure.bonds.filter(b => atomIds.has(b.atom1.id) && atomIds.has(b.atom2.id));
    }, [structure, visibleAtoms]);

    // Determine which representations to show
    const showAtoms = [
        RenderStyle.SPHERES_CPK,
        RenderStyle.BALL_STICK,
        RenderStyle.SURFACE,
        RenderStyle.VDW_SURFACE,
        RenderStyle.HYPERBALL
    ].includes(renderStyle);

    const showBonds = [
        RenderStyle.STICK,
        RenderStyle.BALL_STICK,
        RenderStyle.LINE
    ].includes(renderStyle);

    // Update Atom Geometry
    useEffect(() => {
        if (!atomMeshRef.current || !showAtoms) return;

        atomMeshRef.current.count = visibleAtoms.length;

        visibleAtoms.forEach((atom, i) => {
            let radius = getAtomRadius(atom.element, 0.4);
            
            // Adjust radius based on representation
            if (renderStyle === RenderStyle.SPHERES_CPK) {
                radius = getAtomRadius(atom.element, 0.6);
            } else if (renderStyle === RenderStyle.BALL_STICK) {
                radius = getAtomRadius(atom.element, 0.5);
            } else if (renderStyle === RenderStyle.HYPERBALL) {
                radius = getAtomRadius(atom.element, 0.8);
            } else if (renderStyle === RenderStyle.SURFACE || renderStyle === RenderStyle.VDW_SURFACE) {
                radius = getAtomRadius(atom.element, 1.2);
            }

            tempObject.position.copy(atom.position);
            tempObject.scale.setScalar(radius);
            tempObject.updateMatrix();
            atomMeshRef.current!.setMatrixAt(i, tempObject.matrix);

            tempColor.set(getElementColor(atom.element));
            atomMeshRef.current!.setColorAt(i, tempColor);
        });

        atomMeshRef.current.instanceMatrix.needsUpdate = true;
        if (atomMeshRef.current.instanceColor) atomMeshRef.current.instanceColor.needsUpdate = true;
    }, [visibleAtoms, renderStyle, showAtoms]);

    // Update Colors (Interact)
    useEffect(() => {
        if (!atomMeshRef.current || !showAtoms) return;

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
    }, [hoveredAtom, selectedAtom, visibleAtoms, showAtoms]);

    // Update Bond Geometry
    useEffect(() => {
        if (!bondMeshRef.current || !showBonds) return;

        bondMeshRef.current.count = visibleBonds.length;
        const bondRadius = renderStyle === RenderStyle.LINE ? 0.05 : 0.1;

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
    }, [visibleBonds, renderStyle, showBonds]);

    const handlePointerMove = (e: any) => {
        e.stopPropagation();
        const instanceId = e.instanceId;
        if (instanceId !== undefined && showAtoms) {
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
        if (instanceId !== undefined && showAtoms) {
            const atom = visibleAtoms[instanceId];
            onAtomClick(atom);
        }
    };

    // --- Ribbon/Cartoon Generation ---
    const ribbonMeshes = useMemo(() => {
        if (!showProtein || renderStyle !== RenderStyle.RIBBON) return null;

        const chains = structure.chains.filter(c => c.type === 'PROTEIN' || c.type === 'DNA');

        return chains.map((chain, index) => {
            const traceAtoms = chain.residues.map(r => {
                return r.atoms.find(a => a.name === 'CA' || a.name === "P") || r.atoms[0];
            }).filter(Boolean);

            if (traceAtoms.length < 2) return null;

            const points = traceAtoms.map(a => a.position);
            const curve = new CatmullRomCurve3(points, false, 'catmullrom', 0.2);

            const baseColor = chain.type === 'DNA'
                ? SECONDARY_COLORS.DNA
                : CHAIN_COLORS[index % CHAIN_COLORS.length];

            // Group residues by secondary structure for cartoon effect
            const structureSegments: { type: 'HELIX' | 'SHEET' | 'LOOP', residues: typeof chain.residues }[] = [];
            let currentSegment: typeof structureSegments[0] | null = null;

            chain.residues.forEach(residue => {
                const type = residue.secondaryStructureType || 'LOOP';
                if (!currentSegment || currentSegment.type !== type) {
                    if (currentSegment) structureSegments.push(currentSegment);
                    currentSegment = { type: type as 'HELIX' | 'SHEET' | 'LOOP', residues: [] };
                }
                currentSegment.residues.push(residue);
            });
            if (currentSegment) structureSegments.push(currentSegment);

            return (
                <group key={chain.id}>
                    {structureSegments.map((segment, segIdx) => {
                        const segmentAtoms = segment.residues.map(r => {
                            return r.atoms.find(a => a.name === 'CA' || a.name === "P") || r.atoms[0];
                        }).filter(Boolean);

                        if (segmentAtoms.length < 2) return null;

                        const segPoints = segmentAtoms.map(a => a.position);
                        const segCurve = new CatmullRomCurve3(segPoints, false, 'catmullrom', 0.2);

                        let radius = 0.3;
                        let tubeSegments = 8;
                        if (segment.type === 'HELIX') {
                            radius = 0.5;
                            tubeSegments = 12;
                        } else if (segment.type === 'SHEET') {
                            radius = 0.4;
                            tubeSegments = 8;
                        }

                        return (
                            <mesh key={`${chain.id}-${segIdx}`}>
                                <tubeGeometry args={[segCurve, segPoints.length * 8, radius, tubeSegments, false]} />
                                <meshStandardMaterial
                                    color={baseColor}
                                    side={DoubleSide}
                                    transparent
                                    opacity={opacity}
                                    roughness={segment.type === 'HELIX' ? 0.2 : 0.4}
                                    metalness={segment.type === 'HELIX' ? 0.3 : 0.1}
                                />
                            </mesh>
                        );
                    })}
                </group>
            );
        });
    }, [structure, showProtein, opacity, renderStyle]);

    // --- Backbone Trace Generation ---
    const backboneTraceMeshes = useMemo(() => {
        if (!showProtein || renderStyle !== RenderStyle.BACKBONE_TRACE) return null;

        const chains = structure.chains.filter(c => c.type === 'PROTEIN' || c.type === 'DNA');

        return chains.map((chain, index) => {
            const traceAtoms = chain.residues.map(r => {
                return r.atoms.find(a => a.name === 'CA' || a.name === "P") || r.atoms[0];
            }).filter(Boolean);

            if (traceAtoms.length < 2) return null;

            const points = traceAtoms.map(a => a.position);
            const curve = new CatmullRomCurve3(points, false, 'catmullrom', 0.2);

            const baseColor = chain.type === 'DNA'
                ? SECONDARY_COLORS.DNA
                : CHAIN_COLORS[index % CHAIN_COLORS.length];

            return (
                <mesh key={chain.id}>
                    <tubeGeometry args={[curve, points.length * 8, 0.15, 6, false]} />
                    <meshStandardMaterial
                        color={baseColor}
                        side={DoubleSide}
                        transparent
                        opacity={opacity}
                        roughness={0.5}
                        metalness={0.1}
                    />
                </mesh>
            );
        });
    }, [structure, showProtein, opacity, renderStyle]);

    // --- Surface Generation ---
    const surfaceMesh = useMemo(() => {
        if (renderStyle !== RenderStyle.SURFACE && renderStyle !== RenderStyle.VDW_SURFACE) return null;

        const proteinAtoms = structure.atoms.filter(atom => {
            if (atom.residueName === 'HOH') return showWater;
            if (atom.isHetAtm && atom.residueName !== 'HOH') return showLigands;
            if (!atom.isHetAtm && atom.residueName !== 'HOH') return showProtein;
            return false;
        });

        if (proteinAtoms.length === 0) return null;

        const sphereGeometry = new SphereGeometry(1, 16, 16);

        return (
            <group>
                {proteinAtoms.map((atom) => {
                    const radius = getAtomRadius(atom.element, renderStyle === RenderStyle.VDW_SURFACE ? 1.5 : 1.2);
                    const color = getElementColor(atom.element);
                    
                    return (
                        <mesh
                            key={atom.id}
                            position={[atom.position.x, atom.position.y, atom.position.z]}
                            geometry={sphereGeometry}
                        >
                            <meshStandardMaterial
                                color={color}
                                transparent
                                opacity={opacity}
                                roughness={0.6}
                                metalness={0.1}
                                side={DoubleSide}
                            />
                        </mesh>
                    );
                })}
            </group>
        );
    }, [structure, showProtein, showLigands, showWater, opacity, renderStyle]);

    return (
        <group ref={groupRef}>
            {showAtoms && (
                <instancedMesh
                    ref={atomMeshRef}
                    args={[undefined, undefined, 0]}
                    onPointerMove={handlePointerMove}
                    onPointerOut={handlePointerOut}
                    onClick={handleClick}
                >
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshStandardMaterial transparent opacity={opacity} metalness={0.2} roughness={0.5} />
                </instancedMesh>
            )}

            {showBonds && (
                <instancedMesh
                    ref={bondMeshRef}
                    args={[undefined, undefined, 0]}
                >
                    <cylinderGeometry args={[1, 1, 1, 8]} />
                    <meshStandardMaterial transparent opacity={opacity} metalness={0.1} roughness={0.8} />
                </instancedMesh>
            )}

            {ribbonMeshes}
            {backboneTraceMeshes}
            {surfaceMesh}
        </group>
    );
};
