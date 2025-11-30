import { Layers, Eye, EyeOff, Activity, Droplet, Box, Type, Sun, Moon, Atom, Github, X } from 'lucide-react';

import { ViewerState, Structure } from '@/lib/types';

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
        setViewState(prev => ({ ...prev, [key]: !prev[key] }));
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
