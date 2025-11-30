import { Layers, Eye, EyeOff, Activity, Droplet, Box, Type, Sun, Moon, Atom, Github, X, FileText, Tag, Palette, Play, RotateCw, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { ViewerState, Structure, RenderStyle, AnimationMode } from '@/lib/types';
import { Select } from '@/components/ui';

interface Props {
    structure: Structure | null;
    viewState: ViewerState;
    setViewState: React.Dispatch<React.SetStateAction<ViewerState>>;
    isOpen?: boolean;
    onClose?: () => void;
    isMobile?: boolean;
}

export const Sidebar: React.FC<Props> = ({ structure, viewState, setViewState, isOpen = true, onClose, isMobile = false }) => {
    const isDark = viewState.isDarkMode;

    const toggle = (key: keyof ViewerState) => {
        setViewState(prev => {
            const newState = { ...prev, [key]: !prev[key] };
            // Save to localStorage
            if (key === 'playTrajectory' || key === 'showStars') {
                try {
                    const current = localStorage.getItem('biovis_preferences');
                    const prefs = current ? JSON.parse(current) : {};
                    prefs[key] = newState[key];
                    localStorage.setItem('biovis_preferences', JSON.stringify(prefs));
                } catch (e) {
                    console.error("Failed to save preference", e);
                }
            }
            return newState;
        });
    };

    const handleRenderStyleChange = (style: RenderStyle) => {
        setViewState(prev => {
            const newState = { ...prev, renderStyle: style };
            try {
                const current = localStorage.getItem('biovis_preferences');
                const prefs = current ? JSON.parse(current) : {};
                prefs.renderStyle = style;
                localStorage.setItem('biovis_preferences', JSON.stringify(prefs));
            } catch (e) {
                console.error("Failed to save preference", e);
            }
            return newState;
        });
    };

    const handleAnimationModeChange = (mode: AnimationMode) => {
        setViewState(prev => {
            const newState = { ...prev, animationMode: mode };
            try {
                const current = localStorage.getItem('biovis_preferences');
                const prefs = current ? JSON.parse(current) : {};
                prefs.animationMode = mode;
                localStorage.setItem('biovis_preferences', JSON.stringify(prefs));
            } catch (e) {
                console.error("Failed to save preference", e);
            }
            return newState;
        });
    };

    const bgClass = isDark ? 'bg-[#09090b] border-neutral-800 text-neutral-400' : 'bg-white border-neutral-200 text-neutral-700';
    const headerClass = isDark ? 'text-neutral-200 border-neutral-800' : 'text-neutral-900 border-neutral-200';
    const sectionTitleClass = isDark ? 'text-neutral-500' : 'text-neutral-600';

    // Mobile drawer
    if (isMobile) {
        return (
            <>
                {/* Overlay */}
                {isOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-200"
                        onClick={onClose}
                    />
                )}
                {/* Drawer */}
                <div className={`fixed left-0 top-0 h-full w-80 border-r flex flex-col transition-transform duration-300 z-50 ${bgClass} ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    {/* Header */}
                    <div className={`h-16 px-6 border-b flex items-center justify-between shrink-0 ${headerClass}`}>
                        <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
                            <Atom className="text-emerald-500" size={24} />
                            <span className="font-mono tracking-tighter text-xl">BioVIS</span>
                        </h1>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => toggle('isDarkMode')}
                                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-neutral-100 text-neutral-600'}`}
                            >
                                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                            </button>
                            {onClose && (
                                <button
                                    onClick={onClose}
                                    className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-neutral-100 text-neutral-600'}`}
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 space-y-8 scrollbar-thin">
                        {/* Atom Representation */}
                        <div>
                            <h2 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${sectionTitleClass}`}>
                                <Palette size={12} /> Atom Representation
                            </h2>
                            <Select
                                value={viewState.renderStyle}
                                onChange={(e) => handleRenderStyleChange(e.target.value as RenderStyle)}
                                isDark={isDark}
                                options={Object.values(RenderStyle).map(style => ({ value: style, label: style }))}
                                className="w-full"
                            />
                        </div>

                        {/* Animation */}
                        <div>
                            <h2 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${sectionTitleClass}`}>
                                <RotateCw size={12} /> Animation
                            </h2>
                            <Select
                                value={viewState.animationMode}
                                onChange={(e) => handleAnimationModeChange(e.target.value as AnimationMode)}
                                isDark={isDark}
                                options={Object.values(AnimationMode).map(mode => ({ value: mode, label: mode }))}
                                className="w-full"
                            />
                        </div>

                        {/* Trajectory */}
                        <div>
                            <h2 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${sectionTitleClass}`}>
                                <Play size={12} /> Trajectory
                            </h2>
                            <label className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                                viewState.playTrajectory
                                    ? (isDark ? 'bg-neutral-800' : 'bg-neutral-100')
                                    : (isDark ? 'hover:bg-neutral-800/50' : 'hover:bg-neutral-50')
                            }`}>
                                <input
                                    type="checkbox"
                                    checked={viewState.playTrajectory}
                                    onChange={(e) => toggle('playTrajectory')}
                                    className="w-4 h-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
                                />
                                <span className="text-sm font-medium">Play trajectory</span>
                            </label>
                        </div>

                        {/* Stars */}
                        <div>
                            <h2 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${sectionTitleClass}`}>
                                <Sparkles size={12} /> Background
                            </h2>
                            <label className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                                viewState.showStars
                                    ? (isDark ? 'bg-neutral-800' : 'bg-neutral-100')
                                    : (isDark ? 'hover:bg-neutral-800/50' : 'hover:bg-neutral-50')
                            }`}>
                                <input
                                    type="checkbox"
                                    checked={viewState.showStars}
                                    onChange={(e) => toggle('showStars')}
                                    className="w-4 h-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
                                />
                                <span className="text-sm font-medium">Show stars</span>
                            </label>
                        </div>

                        {/* Visibility Layers */}
                        <div>
                            <h2 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${sectionTitleClass}`}>
                                <Layers size={12} /> Structure Layers
                            </h2>
                            <div className="space-y-2">
                                <LayerToggle
                                    label="Polypeptide Chain"
                                    active={viewState.showProtein}
                                    onClick={() => toggle('showProtein')}
                                    icon={<Activity size={14} />}
                                    isDark={isDark}
                                />
                                <LayerToggle
                                    label="Ligands & HetAtm"
                                    active={viewState.showLigands}
                                    onClick={() => toggle('showLigands')}
                                    icon={<Box size={14} />}
                                    isDark={isDark}
                                />
                                <LayerToggle
                                    label="Solvent (Water)"
                                    active={viewState.showWater}
                                    onClick={() => toggle('showWater')}
                                    icon={<Droplet size={14} />}
                                    isDark={isDark}
                                />
                                <LayerToggle
                                    label="Annotations"
                                    active={viewState.showAnnotations}
                                    onClick={() => toggle('showAnnotations')}
                                    icon={<Type size={14} />}
                                    isDark={isDark}
                                />
                            </div>
                        </div>
                    </div>

                    {/* GitHub Footer */}
                    <div className={`p-5 border-t mt-auto shrink-0 ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
                        <a
                            href="https://github.com/sammwyy/biovis"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium transition-all ${isDark
                                ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                                }`}
                        >
                            <Github size={16} />
                            <span>GitHub Repo</span>
                        </a>
                    </div>
                </div>
            </>
        );
    }

    // Desktop sidebar
    return (
        <div className={`w-80 border-r flex flex-col h-full transition-colors duration-300 ${bgClass}`}>
            {/* Header - Aligned with Navbar (h-16 px-6) */}
            <div className={`h-16 px-6 border-b flex items-center justify-between shrink-0 ${headerClass}`}>
                <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
                    <Atom className="text-emerald-500" size={24} />
                    <span className="font-mono tracking-tighter text-xl">BioVIS</span>
                </h1>
                <button
                    onClick={() => toggle('isDarkMode')}
                    className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-neutral-100 text-neutral-600'}`}
                >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-8 scrollbar-thin">
                {/* Molecule Details Card */}
                <div className="space-y-4">
                    <h2 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${sectionTitleClass}`}>
                        <FileText size={12} /> Molecule Details
                    </h2>
                    {structure?.metadata ? (
                        <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-4 ${isDark ? 'bg-neutral-900/30 border-neutral-800' : 'bg-neutral-50/80 border-neutral-200 text-neutral-800'}`}>
                            {/* ID and Category */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <span className="opacity-50 block mb-1">PDB ID</span>
                                    <div className={`font-mono text-base font-bold tracking-widest px-2 py-0.5 rounded w-fit ${isDark ? 'bg-neutral-800 text-emerald-400' : 'bg-white text-emerald-600 border border-neutral-200'}`}>
                                        {structure.metadata.id || 'N/A'}
                                    </div>
                                </div>
                                {structure.metadata.classification && (
                                    <div className="text-right max-w-[50%]">
                                        <span className="opacity-50 block mb-1">Category</span>
                                        <span className="font-medium block break-words">{structure.metadata.classification}</span>
                                    </div>
                                )}
                            </div>

                            {/* Name */}
                            {structure.metadata.title && (
                                <div className="pt-2 border-t border-dashed border-opacity-10 border-current">
                                    <span className="opacity-50 block mb-1">Name</span>
                                    <span className="font-bold text-sm block leading-snug">{structure.metadata.title}</span>
                                </div>
                            )}

                            {/* Tags */}
                            {structure.metadata.tags && structure.metadata.tags.length > 0 && (
                                <div className="pt-2 border-t border-dashed border-opacity-10 border-current">
                                    <span className="opacity-50 block mb-2 flex items-center gap-1"><Tag size={10} /> Tags</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {structure.metadata.tags.map(tag => (
                                            <span key={tag} className={`px-1.5 py-0.5 rounded-[4px] text-[10px] uppercase font-bold tracking-wide ${isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-200 text-neutral-700'}`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Technical Stats */}
                            <div className="pt-2 border-t border-dashed border-opacity-10 border-current space-y-2">
                                {structure.metadata.resolution && (
                                    <div className="flex justify-between items-center">
                                        <span className="opacity-50">Resolution</span>
                                        <span className="font-mono">{structure.metadata.resolution.toFixed(2)} Å</span>
                                    </div>
                                )}
                                {structure.metadata.depositionDate && (
                                    <div className="flex justify-between items-center">
                                        <span className="opacity-50">Date</span>
                                        <span className="font-mono">{structure.metadata.depositionDate}</span>
                                    </div>
                                )}
                                {structure.metadata.experimentMethod && (
                                    <div className="block pt-1">
                                        <span className="opacity-50 block mb-1">Method</span>
                                        <span className="font-medium opacity-80">{structure.metadata.experimentMethod}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className={`p-4 rounded-xl border text-xs leading-relaxed ${isDark ? 'bg-neutral-900/30 border-neutral-800' : 'bg-neutral-50/80 border-neutral-200 text-neutral-800'}`}>
                            <div className={`text-center py-4 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                                <FileText size={24} className="mx-auto mb-2 opacity-40" />
                                <p className="text-xs">No molecule loaded</p>
                                <p className="text-[10px] mt-1 opacity-60">Load a PDB file to see details</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Atom Representation */}
                <div>
                    <h2 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${sectionTitleClass}`}>
                        <Palette size={12} /> Atom Representation
                    </h2>
                    <Select
                        value={viewState.renderStyle}
                        onChange={(e) => handleRenderStyleChange(e.target.value as RenderStyle)}
                        isDark={isDark}
                        options={Object.values(RenderStyle).map(style => ({ value: style, label: style }))}
                        className="w-full"
                    />
                </div>

                {/* Animation */}
                <div>
                    <h2 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${sectionTitleClass}`}>
                        <RotateCw size={12} /> Animation
                    </h2>
                    <Select
                        value={viewState.animationMode}
                        onChange={(e) => handleAnimationModeChange(e.target.value as AnimationMode)}
                        isDark={isDark}
                        options={Object.values(AnimationMode).map(mode => ({ value: mode, label: mode }))}
                        className="w-full"
                    />
                </div>

                {/* Trajectory */}
                <div>
                    <h2 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${sectionTitleClass}`}>
                        <Play size={12} /> Trajectory
                    </h2>
                    <label className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                        viewState.playTrajectory
                            ? (isDark ? 'bg-neutral-800' : 'bg-neutral-100')
                            : (isDark ? 'hover:bg-neutral-800/50' : 'hover:bg-neutral-50')
                    }`}>
                        <input
                            type="checkbox"
                            checked={viewState.playTrajectory}
                            onChange={() => toggle('playTrajectory')}
                            className="w-4 h-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm font-medium">Play trajectory</span>
                    </label>
                </div>

                {/* Stars */}
                <div>
                    <h2 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${sectionTitleClass}`}>
                        <Sparkles size={12} /> Background
                    </h2>
                    <label className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                        viewState.showStars
                            ? (isDark ? 'bg-neutral-800' : 'bg-neutral-100')
                            : (isDark ? 'hover:bg-neutral-800/50' : 'hover:bg-neutral-50')
                    }`}>
                        <input
                            type="checkbox"
                            checked={viewState.showStars}
                            onChange={() => toggle('showStars')}
                            className="w-4 h-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm font-medium">Show stars</span>
                    </label>
                </div>

                {/* Visibility Layers */}
                <div>
                    <h2 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${sectionTitleClass}`}>
                        <Layers size={12} /> Structure Layers
                    </h2>
                    <div className="space-y-2">
                        <LayerToggle
                            label="Polypeptide Chain"
                            active={viewState.showProtein}
                            onClick={() => toggle('showProtein')}
                            icon={<Activity size={14} />}
                            isDark={isDark}
                        />
                        <LayerToggle
                            label="Ligands & HetAtm"
                            active={viewState.showLigands}
                            onClick={() => toggle('showLigands')}
                            icon={<Box size={14} />}
                            isDark={isDark}
                        />
                        <LayerToggle
                            label="Solvent (Water)"
                            active={viewState.showWater}
                            onClick={() => toggle('showWater')}
                            icon={<Droplet size={14} />}
                            isDark={isDark}
                        />
                        <LayerToggle
                            label="Annotations"
                            active={viewState.showAnnotations}
                            onClick={() => toggle('showAnnotations')}
                            icon={<Type size={14} />}
                            isDark={isDark}
                        />
                    </div>
                </div>
            </div>

            {/* GitHub Footer */}
            <div className={`p-5 border-t mt-auto shrink-0 ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <a
                    href="https://github.com/sammwyy/biovis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium transition-all ${isDark
                        ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                        }`}
                >
                    <Github size={16} />
                    <span>GitHub Repo</span>
                </a>
            </div>
        </div>
    );
};

const LayerToggle: React.FC<{ label: string, active: boolean, onClick: () => void, icon: React.ReactNode, isDark: boolean }> = ({ label, active, onClick, icon, isDark }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all text-sm group ${active
            ? (isDark ? 'bg-neutral-800 text-neutral-100 shadow-sm ring-1 ring-neutral-700' : 'bg-white text-neutral-900 shadow-sm border border-neutral-200')
            : (isDark ? 'text-neutral-500 hover:bg-neutral-800/50' : 'text-neutral-600 hover:bg-neutral-50')
            }`}
    >
        <div className="flex items-center gap-3">
            <span className={active ? (isDark ? 'text-emerald-500' : 'text-emerald-600') : 'text-neutral-500'}>{icon}</span>
            <span className="font-medium">{label}</span>
        </div>
        {active ? <Eye size={14} className={isDark ? 'text-neutral-400' : 'text-neutral-600'} /> : <EyeOff size={14} className="opacity-30" />}
    </button>
);
