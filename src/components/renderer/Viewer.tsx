import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Html, Stats, GizmoHelper, GizmoViewport } from '@react-three/drei';
import * as THREE from 'three';

import { MoleculeRender } from './MoleculeRender';
import { Structure, ViewerState, Atom, Annotation } from '@/lib/types';

interface Props {
    structure: Structure | null;
    viewState: ViewerState;
    annotations: Annotation[];
    onAtomClick: (atom: Atom) => void;
    onAtomHover: (atom: Atom | null) => void;
    onScreenshot?: (dataUrl: string) => void;
}

const CameraController: React.FC<{ structure: Structure | null }> = ({ structure }) => {
    const { camera, controls } = useThree();
    const controlsRef = useRef<any>(controls);

    useEffect(() => {
        if (structure && controlsRef.current) {
            const center = structure.center;
            const size = Math.max(structure.size.x, structure.size.y, structure.size.z);
            const distance = size * 2.0;

            camera.position.set(center.x, center.y, center.z + distance);
            camera.lookAt(center);
            controlsRef.current.target.copy(center);
            controlsRef.current.update();
        }
    }, [structure, camera]);

    return null;
};

const ScreenshotHandler: React.FC<{ onCapture?: (url: string) => void }> = ({ onCapture }) => {
    const { gl, scene, camera } = useThree();
    useEffect(() => {
        const handleCapture = () => {
            gl.render(scene, camera);
            const data = gl.domElement.toDataURL('image/png');
            if (onCapture) onCapture(data);
        };
        window.addEventListener('trigger-screenshot', handleCapture);
        return () => window.removeEventListener('trigger-screenshot', handleCapture);
    }, [gl, scene, camera, onCapture]);
    return null;
}

// DataBridge: Reads 3D data and writes to DOM elements outside the Canvas
// This prevents the "UI moving with camera" bug and solves z-index issues
const DataBridge: React.FC = () => {
    const { camera } = useThree();

    useFrame(() => {
        const posEl = document.getElementById('camera-pos-val');
        const rotEl = document.getElementById('camera-rot-val');

        if (posEl && rotEl) {
            const { x, y, z } = camera.position;
            const rotX = THREE.MathUtils.radToDeg(camera.rotation.x);
            const rotY = THREE.MathUtils.radToDeg(camera.rotation.y);
            const rotZ = THREE.MathUtils.radToDeg(camera.rotation.z);

            posEl.innerText = `X:${x.toFixed(0)} Y:${y.toFixed(0)} Z:${z.toFixed(0)}`;
            rotEl.innerText = `P:${rotX.toFixed(0)}° Y:${rotY.toFixed(0)}°`;
        }
    });

    return null;
};

export const Viewer: React.FC<Props> = ({ structure, viewState, annotations, onAtomClick, onAtomHover, onScreenshot }) => {
    const isDark = viewState.isDarkMode;
    const bgColor = isDark ? '#09090b' : '#f5f5f5';

    return (
        <div className="w-full h-full relative group" style={{ backgroundColor: bgColor }}>

            {/* 2D UI Overlays (Outside Canvas for correct Z-Index) */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">

                {/* Top Left: Molecule Title & Description */}
                {structure?.metadata && (
                    <div className="absolute top-6 left-6 max-w-lg animate-fade-in pointer-events-auto">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className={`text-4xl font-extrabold tracking-tight leading-none ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                                {structure.metadata.title || 'Unknown Structure'}
                            </h1>
                        </div>

                        {structure.metadata.description && (
                            <p className={`text-sm leading-relaxed max-w-md ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
                                {structure.metadata.description}
                            </p>
                        )}

                        <div className="flex gap-2 mt-3">
                            <span className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
                                {structure.atoms.length.toLocaleString()} atoms
                            </span>
                        </div>
                    </div>
                )}

                {/* Bottom Left: Camera Stats */}
                <div className={`absolute bottom-4 left-4 font-mono text-[10px] flex flex-col gap-1 transition-opacity duration-500 ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
                    <div className="flex gap-2">
                        <span className="font-bold text-emerald-500">POS</span>
                        <span id="camera-pos-val">X:0 Y:0 Z:0</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="font-bold text-blue-500">ROT</span>
                        <span id="camera-rot-val">P:0° Y:0°</span>
                    </div>
                </div>
            </div>

            <Canvas shadows dpr={[1, 2]} gl={{ preserveDrawingBuffer: true, antialias: true }}>
                <Stats className="!left-auto !right-0 !top-auto !bottom-0 opacity-50 hover:opacity-100 transition-opacity" />

                <color attach="background" args={[bgColor]} />

                <PerspectiveCamera makeDefault position={[0, 0, 50]} fov={45} />

                <ambientLight intensity={isDark ? 0.7 : 0.8} />
                <directionalLight position={[10, 10, 10]} intensity={isDark ? 0.8 : 0.8} castShadow />
                <directionalLight position={[-10, -10, -10]} intensity={0.4} />
                <pointLight position={[0, 0, 0]} intensity={0.2} />

                {/* Top Right: Gizmo */}
                <GizmoHelper alignment="top-right" margin={[80, 80]}>
                    <GizmoViewport
                        axisColors={['#ef4444', '#22c55e', '#3b82f6']}
                        labelColor="white"
                        hideNegativeAxes={false}
                    />
                </GizmoHelper>

                {isDark && <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={0.5} />}

                <Suspense fallback={<Html center><div className={isDark ? "text-neutral-400 font-mono text-sm" : "text-neutral-600 font-mono text-sm"}>Building Geometry...</div></Html>}>
                    {structure && (
                        <>
                            <MoleculeRender
                                structure={structure}
                                viewState={viewState}
                                onAtomClick={onAtomClick}
                                onAtomHover={onAtomHover}
                            />
                            <CameraController structure={structure} />
                            <DataBridge />
                        </>
                    )}

                    {viewState.showAnnotations && annotations.map(ann => (
                        <Html key={ann.id} position={new THREE.Vector3(...ann.targetPosition)}>
                            <div className={`text-xs px-2 py-1 rounded border shadow-sm pointer-events-none whitespace-nowrap backdrop-blur-sm ${isDark ? 'bg-black/80 text-white border-neutral-700' : 'bg-white/80 text-black border-neutral-300'
                                }`}>
                                {ann.label}
                            </div>
                        </Html>
                    ))}
                </Suspense>

                <OrbitControls makeDefault minDistance={2} maxDistance={1000} />
                <ScreenshotHandler onCapture={onScreenshot} />
            </Canvas>

            {!structure && (
                <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    <div className="text-4xl font-light mb-2 tracking-tighter">BioVIS</div>
                    <p className="text-xs tracking-widest uppercase">No Molecular Structure Loaded</p>
                </div>
            )}
        </div>
    );
};

