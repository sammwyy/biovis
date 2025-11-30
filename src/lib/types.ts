import { Vector3 } from 'three';

export enum RenderStyle {
    SPHERES_CPK = 'Spheres (CPK)',
    STICK = 'Stick',
    BALL_STICK = 'Ball & Stick',
    RIBBON = 'Ribbon / Cartoon',
    LINE = 'Line',
    SURFACE = 'Surface',
    HYPERBALL = 'Hyperball',
    VDW_SURFACE = 'Van der Waals surface',
    BACKBONE_TRACE = 'Backbone trace'
}

export enum AnimationMode {
    STATIC = 'Static',
    SLOW_ROTATION = 'Slow rotation',
    FAST_ROTATION = 'Fast rotation'
}

export enum ElementType {
    H = 'H', C = 'C', N = 'N', O = 'O', S = 'S', P = 'P', FE = 'FE', MG = 'MG', CA = 'CA', ZN = 'ZN', UNKNOWN = 'X'
}

export interface Atom {
    id: number;
    serial: number;
    name: string;
    element: ElementType;
    residueName: string;
    residueSeq: number;
    chainID: string;
    position: Vector3;
    isHetAtm: boolean;
    bFactor: number;
    occupancy: number;
}

export interface Bond {
    atom1: Atom;
    atom2: Atom;
    order: number;
}

export interface Residue {
    name: string;
    seq: number;
    chainID: string;
    atoms: Atom[];
    secondaryStructureType?: 'HELIX' | 'SHEET' | 'LOOP';
    center: Vector3;
}

export interface Chain {
    id: string;
    residues: Residue[];
    type: 'PROTEIN' | 'DNA' | 'RNA' | 'LIGAND' | 'WATER';
}

export interface PdbMetadata {
    id?: string;
    title?: string;
    description?: string;
    tags?: string[];
    classification?: string;
    depositionDate?: string;
    experimentMethod?: string;
    resolution?: number;
    source?: string;
    authors?: string[];
}

export interface Structure {
    chains: Chain[];
    atoms: Atom[]; // Flat list for easy iteration
    bonds: Bond[];
    helices: { startChain: string; startSeq: number; endChain: string; endSeq: number }[];
    sheets: { startChain: string; startSeq: number; endChain: string; endSeq: number }[];
    center: Vector3;
    size: Vector3;
    metadata?: PdbMetadata;
}

export interface Annotation {
    id: string;
    targetPosition: [number, number, number]; // Serializable array
    label: string;
    description?: string;
    residueInfo?: string;
}

export interface ViewerState {
    renderStyle: RenderStyle;
    animationMode: AnimationMode;
    playTrajectory: boolean;
    showStars: boolean;
    showWater: boolean;
    showLigands: boolean;
    showProtein: boolean;
    showAnnotations: boolean;
    opacity: number;
    selectedAtom: Atom | null;
    hoveredAtom: Atom | null;
    isDarkMode: boolean;
}

