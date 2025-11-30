import { Layers, Eye, EyeOff, Activity, Droplet, Box, Type, Settings, Sun, Moon, Atom, Github, FileText, Tag, Database } from 'lucide-react';

import { ViewerState, Structure } from '@/lib/types';

interface Props {
    structure: Structure | null;
    viewState: ViewerState;
    setViewState: React.Dispatch<React.SetStateAction<ViewerState>>;
}

export const Sidebar: React.FC<Props> = ({ structure, viewState, setViewState }) => {
    const isDark = viewState.isDarkMode;

    const toggle = (key: keyof ViewerState) => {
        setViewState(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const bgClass = isDark ? 'bg-[#09090b] border-neutral-800 text-neutral-400' : 'bg-white border-neutral-200 text-neutral-700';
    const headerClass = isDark ? 'text-neutral-200 border-neutral-800' : 'text-neutral-900 border-neutral-200';
    const sectionTitleClass = isDark ? 'text-neutral-500' : 'text-neutral-600';

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

                {/* Expanded Metadata Card */}
                {structure?.metadata && (
                    <div className="space-y-4">
                        <h2 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${sectionTitleClass}`}>
                            <FileText size={12} /> Molecule Details
                        </h2>
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
                            {(structure.metadata.title) && (
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
                    </div>
                )}

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

