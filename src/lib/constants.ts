import { ElementType } from './types';

export const CPK_COLORS: Record<string, string> = {
    [ElementType.H]: '#FFFFFF',
    [ElementType.C]: '#909090', // Carbon
    [ElementType.N]: '#3050F8', // Nitrogen
    [ElementType.O]: '#FF0D0D', // Oxygen
    [ElementType.S]: '#FFFF30', // Sulfur
    [ElementType.P]: '#FFA500', // Phosphorus
    [ElementType.FE]: '#E06633', // Iron
    [ElementType.MG]: '#8AFF00', // Magnesium
    [ElementType.CA]: '#3DFF00', // Calcium
    [ElementType.ZN]: '#7D80B0', // Zinc
    [ElementType.UNKNOWN]: '#FF69B4', // Pink for unknown
};

export const CHAIN_COLORS = [
    '#3B82F6', // Blue-500
    '#EF4444', // Red-500
    '#10B981', // Emerald-500
    '#F59E0B', // Amber-500
    '#8B5CF6', // Violet-500
    '#EC4899', // Pink-500
    '#06B6D4', // Cyan-500
    '#F97316', // Orange-500
    '#6366F1', // Indigo-500
    '#84CC16', // Lime-500
];

export const VDW_RADII: Record<string, number> = {
    [ElementType.H]: 1.2,
    [ElementType.C]: 1.7,
    [ElementType.N]: 1.55,
    [ElementType.O]: 1.52,
    [ElementType.S]: 1.8,
    [ElementType.P]: 1.8,
    [ElementType.UNKNOWN]: 1.5,
};

export const SECONDARY_COLORS = {
    HELIX: '#E11D48', // Red-600
    SHEET: '#EAB308', // Yellow-500
    LOOP: '#22C55E',  // Green-500
    DNA: '#8B5CF6',   // Violet
};

export const getElementColor = (element: string): string => {
    return CPK_COLORS[element] || CPK_COLORS[ElementType.UNKNOWN];
};

export const getAtomRadius = (element: string, scale: number = 1): number => {
    return (VDW_RADII[element] || 1.5) * scale;
};

