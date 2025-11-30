import { useState, useMemo } from 'react';
import { Search, X, Grid, ChevronRight, DownloadCloud, FlaskConical, Plus, ArrowRight, Loader2, ChevronDown } from 'lucide-react';

import { MOLECULE_GALLERY, GalleryItem } from '@/lib/molecules';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (item: GalleryItem) => void;
    history: GalleryItem[];
    isDark: boolean;
}

interface TagModalProps {
    isOpen: boolean;
    onClose: () => void;
    activeTags: string[];
    onToggleTag: (tag: string) => void;
    allTags: string[];
    tagCounts: Record<string, number>;
    isDark: boolean;
}

const TagModal: React.FC<TagModalProps> = ({ isOpen, onClose, activeTags, onToggleTag, allTags, tagCounts, isDark }) => {
    if (!isOpen) return null;

    const bgClass = isDark ? 'bg-[#09090b]' : 'bg-white';
    const textClass = isDark ? 'text-neutral-200' : 'text-neutral-900';
    const borderClass = isDark ? 'border-neutral-800' : 'border-neutral-200';

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={handleOverlayClick}
        >
            <div 
                className={`w-full max-w-2xl max-h-[70vh] rounded-xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${bgClass} ${borderClass} ${textClass}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`p-4 sm:p-6 border-b flex items-center justify-between ${borderClass}`}>
                    <h2 className="text-lg sm:text-xl font-bold">Select Tags</h2>
                    <button onClick={onClose} className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'}`}>
                        <X size={18} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin">
                    <div className="flex flex-wrap gap-2">
                        {allTags.map(tag => {
                            const isActive = activeTags.includes(tag);
                            return (
                                <button
                                    key={tag}
                                    onClick={() => onToggleTag(tag)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${isActive
                                        ? (isDark ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700')
                                        : (isDark ? 'border-neutral-800 text-neutral-500 hover:border-neutral-600' : 'border-neutral-200 text-neutral-600 hover:border-neutral-400')
                                        }`}
                                >
                                    {tag}
                                    <span className={`text-[10px] ${isActive ? 'opacity-80' : 'opacity-50'}`}>
                                        ({tagCounts[tag] || 0})
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ExploreModal: React.FC<Props> = ({ isOpen, onClose, onSelect, isDark }) => {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [isTagModalOpen, setIsTagModalOpen] = useState(false);
    const [pdbIdInput, setPdbIdInput] = useState('');
    const [isLoadingPdb, setIsLoadingPdb] = useState(false);
    const [pdbError, setPdbError] = useState<string | null>(null);

    const categories = ['All', ...Array.from(new Set(MOLECULE_GALLERY.map(m => m.category)))];
    const allTags = Array.from(new Set(MOLECULE_GALLERY.flatMap(m => m.tags)));

    // Calculate tag counts
    const tagCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        allTags.forEach(tag => {
            counts[tag] = MOLECULE_GALLERY.filter(item => item.tags.includes(tag)).length;
        });
        return counts;
    }, [allTags]);

    // Calculate category counts
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        categories.forEach(cat => {
            if (cat === 'All') {
                counts[cat] = MOLECULE_GALLERY.length;
            } else {
                counts[cat] = MOLECULE_GALLERY.filter(item => item.category === cat).length;
            }
        });
        return counts;
    }, [categories]);

    const toggleTag = (tag: string) => {
        setActiveTags(prev => {
            if (prev.includes(tag)) {
                return prev.filter(t => t !== tag);
            } else {
                return [...prev, tag];
            }
        });
    };

    const handleLoadPdbById = async () => {
        const pdbId = pdbIdInput.trim().toUpperCase();
        
        // Validate PDB ID format (4 alphanumeric characters)
        if (!/^[A-Z0-9]{4}$/.test(pdbId)) {
            setPdbError('Please enter a valid 4-character PDB ID (e.g., 1CRN)');
            return;
        }

        setIsLoadingPdb(true);
        setPdbError(null);

        try {
            // Create a temporary GalleryItem for the PDB ID
            // The URL doesn't matter since handleLoadItem will try multiple formats
            const tempItem: GalleryItem = {
                id: pdbId,
                title: pdbId,
                category: 'Custom',
                tags: [],
                description: `Loading structure ${pdbId} from RCSB PDB...`,
                url: `https://files.rcsb.org/download/${pdbId}.pdb`
            };

            // Call onSelect which will handle the loading in App.tsx
            // It will automatically try PDB, CIF, and other formats
            onSelect(tempItem);
            setPdbIdInput('');
            onClose();
        } catch (error) {
            console.error('Error loading structure:', error);
            setPdbError('Failed to load structure. Please check the ID and try again.');
        } finally {
            setIsLoadingPdb(false);
        }
    };

    const handlePdbIdKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLoadPdbById();
        }
    };

    const filteredItems = useMemo(() => {
        return MOLECULE_GALLERY.filter(item => {
            const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = activeTags.length === 0 || activeTags.some(tag => item.tags.includes(tag));
            return matchesCategory && matchesSearch && matchesTag;
        });
    }, [activeCategory, searchQuery, activeTags]);

    if (!isOpen) return null;

    const bgClass = isDark ? 'bg-[#09090b]' : 'bg-white';
    const textClass = isDark ? 'text-neutral-200' : 'text-neutral-900';
    const borderClass = isDark ? 'border-neutral-800' : 'border-neutral-200';
    const sidebarClass = isDark ? 'bg-[#0c0c0e]' : 'bg-neutral-50';

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={handleOverlayClick}
        >
            <div 
                className={`w-full max-w-5xl h-[85vh] sm:h-[80vh] rounded-xl sm:rounded-2xl shadow-2xl flex flex-col sm:flex-row overflow-hidden border ${bgClass} ${borderClass} ${textClass}`}
                onClick={(e) => e.stopPropagation()}
            >

                {/* Desktop Sidebar */}
                <div className={`hidden sm:flex sm:w-64 flex-col border-r shrink-0 ${sidebarClass} ${borderClass}`}>
                    <div className="p-6 shrink-0">
                        <h2 className="text-xl font-bold flex items-center gap-2 tracking-tight">
                            <FlaskConical className="text-emerald-500" size={20} />
                            Explore
                        </h2>
                    </div>

                    <nav className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-0 space-y-1 scrollbar-thin min-h-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => { setActiveCategory(cat); setActiveTags([]); }}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between group ${activeCategory === cat
                                    ? (isDark ? 'bg-neutral-800 text-white' : 'bg-white text-black shadow-sm')
                                    : (isDark ? 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100')
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    {cat}
                                    <span className={`text-[10px] ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                        ({categoryCounts[cat] || 0})
                                    </span>
                                </span>
                                {activeCategory === cat && <ChevronRight size={14} className="opacity-50" />}
                            </button>
                        ))}
                    </nav>

                    <div className={`p-4 text-xs text-center border-t shrink-0 ${isDark ? 'opacity-40 text-neutral-500' : 'text-neutral-500'} ${borderClass}`}>
                        Data provided by RCSB PDB
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0 min-h-0 relative">
                    {/* Mobile Header with Dropdown */}
                    <div className={`sm:hidden p-4 border-b space-y-3 shrink-0 ${borderClass}`}>
                        <div className="flex items-center gap-3">
                            <h2 className="text-lg font-bold flex items-center gap-2 tracking-tight">
                                <FlaskConical className="text-emerald-500" size={20} />
                                Explore
                            </h2>
                            <button onClick={onClose} className={`ml-auto p-2 rounded-full transition-colors ${isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'}`}>
                                <X size={18} />
                            </button>
                        </div>

                        {/* Search Input */}
                        <div className={`relative group`}>
                            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-neutral-600 group-focus-within:text-emerald-500' : 'text-neutral-400'}`} size={16} />
                            <input
                                type="text"
                                placeholder="Search molecules..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full pl-9 pr-4 py-2 rounded-lg border outline-none transition-all text-sm ${isDark
                                    ? 'bg-neutral-900 border-neutral-800 focus:border-emerald-500/50 focus:bg-neutral-800 text-white placeholder-neutral-600'
                                    : 'bg-neutral-50 border-neutral-200 focus:border-emerald-500 focus:bg-white'
                                    }`}
                            />
                        </div>

                        {/* Category Dropdown and PDB ID Input Row */}
                        <div className="flex items-center gap-2">
                            {/* Category Dropdown */}
                            <div className="relative flex-1">
                                <select
                                    value={activeCategory}
                                    onChange={(e) => { setActiveCategory(e.target.value); setActiveTags([]); }}
                                    className={`w-full px-4 py-2 rounded-lg border outline-none transition-all text-xs appearance-none pr-8 font-mono ${isDark
                                        ? 'bg-neutral-900 border-neutral-800 focus:border-emerald-500/50 focus:bg-neutral-800 text-white'
                                        : 'bg-neutral-50 border-neutral-200 focus:border-emerald-500 focus:bg-white'
                                        }`}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat} ({categoryCounts[cat] || 0})
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown 
                                    size={16} 
                                    className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`} 
                                />
                            </div>

                            {/* PDB ID Input */}
                            <div className={`relative flex-1 group`}>
                                <input
                                    type="text"
                                    placeholder="PDB ID"
                                    value={pdbIdInput}
                                    onChange={(e) => {
                                        setPdbIdInput(e.target.value.toUpperCase());
                                        setPdbError(null);
                                    }}
                                    onKeyPress={handlePdbIdKeyPress}
                                    maxLength={4}
                                    className={`w-full pl-3 pr-3 py-2 rounded-lg border outline-none transition-all font-mono text-xs ${isDark
                                        ? 'bg-neutral-900 border-neutral-800 focus:border-emerald-500/50 focus:bg-neutral-800 text-white placeholder-neutral-600'
                                        : 'bg-neutral-50 border-neutral-200 focus:border-emerald-500 focus:bg-white'
                                        } ${pdbError ? (isDark ? 'border-red-500/50' : 'border-red-300') : ''}`}
                                />
                            </div>
                            <button
                                onClick={handleLoadPdbById}
                                disabled={isLoadingPdb || !pdbIdInput.trim()}
                                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 ${isDark
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                    }`}
                            >
                                {isLoadingPdb ? (
                                    <>
                                        <Loader2 size={14} className="animate-spin" />
                                        <span>Loading...</span>
                                    </>
                                ) : (
                                    <>
                                        <ArrowRight size={14} />
                                        <span>Load</span>
                                    </>
                                )}
                            </button>
                        </div>
                        {pdbError && (
                            <div className={`text-xs px-3 py-2 rounded-lg ${isDark ? 'bg-red-900/20 border border-red-800/50 text-red-400' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                                {pdbError}
                            </div>
                        )}
                    </div>

                    {/* Desktop Header */}
                    <div className={`hidden sm:block p-6 border-b space-y-3 shrink-0 ${borderClass}`}>
                        <div className="flex items-center gap-4">
                            <div className={`relative flex-1 group`}>
                                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-neutral-600 group-focus-within:text-emerald-500' : 'text-neutral-400'}`} size={18} />
                                <input
                                    type="text"
                                    placeholder="Search molecules by name or ID..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-all ${isDark
                                        ? 'bg-neutral-900 border-neutral-800 focus:border-emerald-500/50 focus:bg-neutral-800 text-white placeholder-neutral-600'
                                        : 'bg-neutral-50 border-neutral-200 focus:border-emerald-500 focus:bg-white'
                                        }`}
                                />
                            </div>

                            <button onClick={onClose} className={`p-2 rounded-full transition-colors shrink-0 ${isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'}`}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* PDB ID Input */}
                        <div className="flex items-center gap-2">
                            <div className={`relative flex-1 group`}>
                                <input
                                    type="text"
                                    placeholder="PDB ID (e.g., 1CRN)"
                                    value={pdbIdInput}
                                    onChange={(e) => {
                                        setPdbIdInput(e.target.value.toUpperCase());
                                        setPdbError(null);
                                    }}
                                    onKeyPress={handlePdbIdKeyPress}
                                    maxLength={4}
                                    className={`w-full pl-4 pr-4 py-2 rounded-lg border outline-none transition-all font-mono text-xs sm:text-sm ${isDark
                                        ? 'bg-neutral-900 border-neutral-800 focus:border-emerald-500/50 focus:bg-neutral-800 text-white placeholder-neutral-600'
                                        : 'bg-neutral-50 border-neutral-200 focus:border-emerald-500 focus:bg-white'
                                        } ${pdbError ? (isDark ? 'border-red-500/50' : 'border-red-300') : ''}`}
                                />
                            </div>
                            <button
                                onClick={handleLoadPdbById}
                                disabled={isLoadingPdb || !pdbIdInput.trim()}
                                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1 sm:gap-2 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 ${isDark
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                    }`}
                            >
                                {isLoadingPdb ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Loading...</span>
                                    </>
                                ) : (
                                    <>
                                        <ArrowRight size={16} />
                                        <span>Load</span>
                                    </>
                                )}
                            </button>
                        </div>
                        {pdbError && (
                            <div className={`text-xs px-3 py-2 rounded-lg ${isDark ? 'bg-red-900/20 border border-red-800/50 text-red-400' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                                {pdbError}
                            </div>
                        )}
                    </div>

                    {/* Tags - Only show active tags */}
                    <div className="px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap gap-2 overflow-x-auto items-center shrink-0">
                        {activeTags.length === 0 ? (
                            <span className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                                No tags selected
                            </span>
                        ) : (
                            activeTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${isDark
                                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/30'
                                        : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                                        }`}
                                >
                                    {tag}
                                    <span className="text-[10px] opacity-70">({tagCounts[tag] || 0})</span>
                                    <X size={12} className="opacity-60" />
                                </button>
                            ))
                        )}
                        <button
                            onClick={() => setIsTagModalOpen(true)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all flex items-center gap-1 ${isDark
                                ? 'border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-400'
                                : 'border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-neutral-800'
                                }`}
                        >
                            <Plus size={14} />
                            Add Tags
                        </button>
                    </div>

                    {/* Grid */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin min-h-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {filteredItems.map(item => (
                                <div
                                    key={item.id}
                                    onClick={() => onSelect(item)}
                                    className={`group relative rounded-xl border p-5 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg ${isDark
                                        ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 hover:shadow-black/50'
                                        : 'bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-neutral-200/50'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold font-mono text-sm border ${isDark ? 'bg-black border-neutral-800 text-emerald-500' : 'bg-neutral-50 border-neutral-200 text-emerald-600'
                                            }`}>
                                            {item.id}
                                        </div>
                                        <div className={`p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'bg-emerald-500 text-white' : 'bg-emerald-600 text-white'}`}>
                                            <DownloadCloud size={16} />
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-500 transition-colors">{item.title}</h3>
                                    <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
                                        {item.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {item.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider ${isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-700'
                                                }`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredItems.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center opacity-40">
                                <Grid size={48} className="mb-4" />
                                <p>No molecules found matching your filters.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <TagModal
                isOpen={isTagModalOpen}
                onClose={() => setIsTagModalOpen(false)}
                activeTags={activeTags}
                onToggleTag={toggleTag}
                allTags={allTags}
                tagCounts={tagCounts}
                isDark={isDark}
            />
        </div>
    );
};

