import { useState, useCallback, useTransition, useEffect, useRef } from 'react';
import { RotateCcw, Camera, Search, Upload, History, Clock, Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

import { Sidebar } from './components/layout/Sidebar';
import { Viewer } from './components/renderer/Viewer';
import { InfoPanel } from './components/layout/InfoPanel';
import { ExploreModal } from './components/layout/ExploreModal';
import { MoleculeDetailsModal } from './components/layout/MoleculeDetailsModal';
import { MobileBottomBar, MobileNavbar } from './components/mobile';
import { IconButton, Button } from './components/ui';
import { Structure, ViewerState, RenderStyle, AnimationMode, Atom, Annotation, PdbMetadata } from './lib/types';
import { parseStructureFile, loadStructureById } from './lib/fileParsers';
import { GalleryItem } from './lib/molecules';
import { useIsMobile, useIsTablet } from './hooks/useMediaQuery';

function App() {
    const [structure, setStructure] = useState<Structure | null>(null);
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [isPending, startTransition] = useTransition();
    const [isExploreOpen, setIsExploreOpen] = useState(false);
    const [history, setHistory] = useState<GalleryItem[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMoleculeDetailsOpen, setIsMoleculeDetailsOpen] = useState(false);
    const historyRef = useRef<HTMLDivElement>(null);

    const isMobile = useIsMobile();
    const isTablet = useIsTablet();
    const isMobileOrTablet = isMobile || isTablet;

    const [viewState, setViewState] = useState<ViewerState>({
        renderStyle: RenderStyle.RIBBON,
        animationMode: AnimationMode.SLOW_ROTATION,
        playTrajectory: true,
        showStars: true,
        showWater: false,
        showLigands: true,
        showProtein: true,
        showAnnotations: true,
        opacity: 1.0,
        selectedAtom: null,
        hoveredAtom: null,
        isDarkMode: true
    });

    const [isLoading, setIsLoading] = useState(false);

    // Load user preferences from localStorage
    const loadPreferences = (): Partial<ViewerState> => {
        try {
            const saved = localStorage.getItem('biovis_preferences');
            if (saved) {
                const prefs = JSON.parse(saved);
                return {
                    renderStyle: prefs.renderStyle || RenderStyle.RIBBON,
                    animationMode: prefs.animationMode || AnimationMode.SLOW_ROTATION,
                    playTrajectory: prefs.playTrajectory !== undefined ? prefs.playTrajectory : true,
                    showStars: prefs.showStars !== undefined ? prefs.showStars : true,
                };
            }
        } catch (e) {
            console.error("Failed to load preferences", e);
        }
        return {
            renderStyle: RenderStyle.RIBBON,
            animationMode: AnimationMode.SLOW_ROTATION,
            playTrajectory: true,
            showStars: true,
        };
    };

    // Save preferences to localStorage
    const savePreferences = (updates: Partial<ViewerState>) => {
        try {
            const current = localStorage.getItem('biovis_preferences');
            const prefs = current ? JSON.parse(current) : {};
            const newPrefs = { ...prefs, ...updates };
            localStorage.setItem('biovis_preferences', JSON.stringify(newPrefs));
        } catch (e) {
            console.error("Failed to save preferences", e);
        }
    };

    // Initial load of history and preferences
    useEffect(() => {
        try {
            const saved = localStorage.getItem('biovis_history');
            if (saved) {
                setHistory(JSON.parse(saved));
            }
        } catch (e) {
            console.error("Failed to load history", e);
        }

        // Load preferences and update viewState
        const prefs = loadPreferences();
        setViewState(prev => ({ ...prev, ...prefs }));

        const handleClickOutside = (event: MouseEvent) => {
            if (historyRef.current && !historyRef.current.contains(event.target as Node)) {
                setShowHistory(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const addToHistory = (item: GalleryItem) => {
        setHistory(prev => {
            // Remove duplicate if exists at top
            const filtered = prev.filter(h => h.id !== item.id);
            const newHistory = [item, ...filtered].slice(0, 20);
            try {
                localStorage.setItem('biovis_history', JSON.stringify(newHistory));
            } catch (e) { console.error(e); }
            return newHistory;
        });
    };

    const processStructureFile = (text: string, filename: string, options: { meta?: Partial<PdbMetadata> } = {}) => {
        try {
            const parsed = parseStructureFile(text, filename);

            // If loaded from file, use filename as title, and original title as description
            const originalTitle = parsed.metadata?.title;
            parsed.metadata = {
                ...parsed.metadata,
                title: filename,
                description: originalTitle
            };

            // Merge extra metadata (from Gallery) if available
            if (options.meta && parsed.metadata) {
                parsed.metadata = {
                    ...parsed.metadata,
                    ...options.meta,
                    // Ensure ID from gallery takes precedence if consistent
                    id: options.meta.id || parsed.metadata.id
                };
            }

            setStructure(parsed);
            setViewState(prev => ({
                ...prev,
                selectedAtom: null,
                hoveredAtom: null,
                renderStyle: RenderStyle.RIBBON
            }));
            setAnnotations([]);
        } catch (err: any) {
            console.error("Failed to parse file", err);
            alert(err.message || "Error parsing structure file.");
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        setTimeout(() => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                processStructureFile(text, file.name);
                setIsLoading(false);
            };
            reader.onerror = () => {
                setIsLoading(false);
                alert("Error reading file.");
            };
            reader.readAsText(file);
        }, 100);
    };

    const handleLoadItem = async (item: GalleryItem) => {
        setIsExploreOpen(false);
        setShowHistory(false);
        setIsLoading(true);
        // Immediately add to history so it's saved even if fetch fails
        addToHistory(item);

        try {
            // Check if URL is from RCSB PDB (can try multiple formats)
            const isRcsbUrl = item.url.includes('files.rcsb.org/download/');

            if (isRcsbUrl) {
                // Extract PDB ID from URL and try multiple formats
                const pdbId = item.id;
                const { structure, filename } = await loadStructureById(pdbId);

                // Set structure directly with metadata overrides
                setStructure({
                    ...structure,
                    metadata: {
                        ...structure.metadata,
                        title: item.title,
                        description: item.description,
                        tags: item.tags,
                        classification: item.category,
                        id: pdbId
                    }
                });
                setViewState(prev => ({
                    ...prev,
                    selectedAtom: null,
                    hoveredAtom: null
                    // Keep user's renderStyle preference
                }));
                setAnnotations([]);
            } else {
                // Use original URL (for non-RCSB sources)
                const response = await fetch(item.url);
                if (!response.ok) throw new Error("Failed to fetch structure");
                const text = await response.text();

                // Pass gallery item details as metadata overrides
                processStructureFile(text, item.id + '.pdb', {
                    meta: {
                        title: item.title,
                        description: item.description,
                        tags: item.tags,
                        classification: item.category
                    }
                });
            }
        } catch (e: any) {
            console.error(e);
            alert(e.message || "Could not load molecule from database.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setIsLoading(true);
            setTimeout(() => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const text = e.target?.result as string;
                    processStructureFile(text, file.name);
                    setIsLoading(false);
                };
                reader.onerror = () => {
                    setIsLoading(false);
                    alert("Error reading file.");
                };
                reader.readAsText(file);
            }, 100);
        }
    };

    const handleAtomClick = useCallback((atom: Atom) => {
        setViewState(prev => ({ ...prev, selectedAtom: atom }));
    }, []);

    const handleAtomHover = useCallback((atom: Atom | null) => {
        startTransition(() => {
            setViewState(prev => {
                if (prev.hoveredAtom?.id === atom?.id) return prev;
                return { ...prev, hoveredAtom: atom };
            });
        });
    }, []);

    const addAnnotation = (atom: Atom, label: string) => {
        const newAnno: Annotation = {
            id: uuidv4(),
            targetPosition: [atom.position.x, atom.position.y, atom.position.z],
            label,
            residueInfo: `${atom.residueName}${atom.residueSeq}`
        };
        setAnnotations(prev => [...prev, newAnno]);
    };

    const triggerScreenshot = () => {
        window.dispatchEvent(new Event('trigger-screenshot'));
    };

    const handleScreenshotCapture = (dataUrl: string) => {
        const link = document.createElement('a');
        link.setAttribute('download', `biovis_snapshot_${Date.now()}.png`);
        link.setAttribute('href', dataUrl);
        link.click();
    };

    const resetCamera = () => {
        if (structure) setStructure({ ...structure });
    };

    const isDark = viewState.isDarkMode;

    // Update body class for dark mode
    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div
            className={`flex w-screen overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#09090b] text-white' : 'bg-neutral-100 text-neutral-900'}`}
            style={{ height: '100dvh', minHeight: '-webkit-fill-available' }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            {/* Desktop Sidebar */}
            {!isMobileOrTablet && (
                <Sidebar structure={structure} viewState={viewState} setViewState={setViewState} />
            )}

            {/* Mobile/Tablet Sidebar Drawer */}
            {isMobileOrTablet && (
                <Sidebar
                    structure={structure}
                    viewState={viewState}
                    setViewState={setViewState}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    isMobile={true}
                />
            )}

            <div className="flex-1 relative flex flex-col min-w-0">
                {/* Mobile Navbar */}
                {isMobileOrTablet ? (
                    <MobileNavbar
                        structure={structure}
                        history={history}
                        showHistory={showHistory}
                        onToggleSidebar={() => setIsSidebarOpen(true)}
                        onToggleHistory={() => setShowHistory(!showHistory)}
                        onLoadItem={handleLoadItem}
                        onExplore={() => setIsExploreOpen(true)}
                        onFileUpload={handleFileUpload}
                        historyRef={historyRef}
                        isDark={isDark}
                    />
                ) : (
                    /* Desktop Top Bar */
                    <div className={`h-16 border-b flex items-center justify-between px-6 transition-colors z-20 relative shrink-0 ${isDark ? 'bg-[#09090b] border-neutral-800' : 'bg-white border-neutral-200'}`}>
                        <div className={`font-mono text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
                            <span className="flex items-center gap-2">
                                <span className="font-semibold tracking-wide">Viewer</span>
                                {structure && <span className="opacity-50 mx-2">/</span>}
                                {structure?.metadata?.id && (
                                    <span className="font-mono">{structure.metadata.id}</span>
                                )}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <IconButton onClick={resetCamera} icon={<RotateCcw size={16} />} title="Reset View" isDark={isDark} />
                            <IconButton onClick={triggerScreenshot} icon={<Camera size={16} />} title="Capture" isDark={isDark} />
                            <div className={`h-6 w-px mx-2 opacity-30 ${isDark ? 'bg-neutral-700' : 'bg-neutral-300'}`}></div>

                            {/* History Dropdown */}
                            <div className="relative" ref={historyRef}>
                                <IconButton
                                    onClick={() => setShowHistory(!showHistory)}
                                    icon={
                                        <>
                                            <History size={16} className={isDark ? 'text-neutral-400' : 'text-neutral-700'} />
                                            {history.length > 0 && (
                                                <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                            )}
                                        </>
                                    }
                                    title="History"
                                    isDark={isDark}
                                    variant="secondary"
                                />

                                {showHistory && (
                                    <div className={`absolute right-0 top-full mt-2 w-80 rounded-xl shadow-xl border z-50 overflow-hidden ${isDark ? 'bg-[#09090b] border-neutral-800' : 'bg-white border-neutral-200'}`}>
                                        <div className={`p-3 border-b text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? 'border-neutral-800 text-neutral-500' : 'border-neutral-200 text-neutral-600'}`}>
                                            <Clock size={12} /> Recent History
                                        </div>
                                        <div className="max-h-80 overflow-y-auto">
                                            {history.length === 0 ? (
                                                <div className="p-6 text-center opacity-40 text-sm">No recent items</div>
                                            ) : (
                                                history.map((item, idx) => (
                                                    <button
                                                        key={`${item.id}-${idx}`}
                                                        onClick={() => handleLoadItem(item)}
                                                        className={`w-full text-left p-3 flex items-start gap-3 transition-colors ${isDark ? 'hover:bg-neutral-800 border-b border-neutral-900' : 'hover:bg-neutral-50 border-b border-neutral-100'}`}
                                                    >
                                                        <div className={`shrink-0 w-8 h-8 rounded flex items-center justify-center text-[10px] font-bold font-mono ${isDark ? 'bg-neutral-800 text-emerald-500' : 'bg-neutral-200 text-emerald-600'}`}>
                                                            {item.id}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium leading-none mb-1">{item.title}</div>
                                                            <div className="text-[10px] opacity-50 truncate w-48">{item.category}</div>
                                                        </div>
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button
                                onClick={() => setIsExploreOpen(true)}
                                variant="secondary"
                                isDark={isDark}
                            >
                                <Search size={16} className="mr-2" />
                                Explore
                            </Button>

                            <label className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-all shadow-lg shadow-emerald-900/20 text-sm font-medium ml-2">
                                <Upload size={16} />
                                <span>Open File</span>
                                <input type="file" accept=".pdb,.ent,.cif,.mmtf,.sdf,.mol2,.gro,.xtc,.trr,.dcd,.mrc,.ccp4" onChange={handleFileUpload} className="hidden" />
                            </label>
                        </div>
                    </div>
                )}

                {/* 3D Content */}
                <div className="flex-1 relative z-0">
                    {isLoading && (
                        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md transition-opacity">
                            <Loader2 className="animate-spin text-emerald-500 mb-2" size={48} />
                            <span className="text-white font-medium tracking-wide">Processing Structure...</span>
                        </div>
                    )}

                    <Viewer
                        structure={structure}
                        viewState={viewState}
                        annotations={annotations}
                        onAtomClick={handleAtomClick}
                        onAtomHover={handleAtomHover}
                        onScreenshot={handleScreenshotCapture}
                        isMobileOrTablet={isMobileOrTablet}
                    />

                    <InfoPanel
                        atom={viewState.selectedAtom}
                        onClose={() => setViewState(prev => ({ ...prev, selectedAtom: null }))}
                        onAddAnnotation={addAnnotation}
                        isDark={isDark}
                        isMobileOrTablet={isMobileOrTablet}
                    />
                </div>

                {/* Mobile/Tablet Bottom Bar */}
                {isMobileOrTablet && (
                    <MobileBottomBar
                        structure={structure}
                        onMoleculeDetails={() => setIsMoleculeDetailsOpen(true)}
                        onResetCamera={resetCamera}
                        onScreenshot={triggerScreenshot}
                        onExplore={() => setIsExploreOpen(true)}
                        onFileUpload={handleFileUpload}
                        isDark={isDark}
                    />
                )}
            </div>

            <ExploreModal
                isOpen={isExploreOpen}
                onClose={() => setIsExploreOpen(false)}
                onSelect={handleLoadItem}
                history={history}
                isDark={isDark}
            />

            <MoleculeDetailsModal
                isOpen={isMoleculeDetailsOpen}
                onClose={() => setIsMoleculeDetailsOpen(false)}
                structure={structure}
                isDark={isDark}
            />
        </div>
    );
}

export default App;

