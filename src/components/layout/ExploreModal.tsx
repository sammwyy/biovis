import { useState, useMemo } from 'react';
import { Search, X, Grid, ChevronRight, DownloadCloud, FlaskConical } from 'lucide-react';

import { MOLECULE_GALLERY, GalleryItem } from '@/lib/molecules';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (item: GalleryItem) => void;
    history: GalleryItem[];
    isDark: boolean;
}

export const ExploreModal: React.FC<Props> = ({ isOpen, onClose, onSelect, isDark }) => {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const categories = ['All', ...Array.from(new Set(MOLECULE_GALLERY.map(m => m.category)))];
    const allTags = Array.from(new Set(MOLECULE_GALLERY.flatMap(m => m.tags)));

    const filteredItems = useMemo(() => {
        return MOLECULE_GALLERY.filter(item => {
            const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = activeTag ? item.tags.includes(activeTag) : true;
            return matchesCategory && matchesSearch && matchesTag;
        });
    }, [activeCategory, searchQuery, activeTag]);

    if (!isOpen) return null;

    const bgClass = isDark ? 'bg-[#09090b]' : 'bg-white';
    const textClass = isDark ? 'text-neutral-200' : 'text-neutral-900';
    const borderClass = isDark ? 'border-neutral-800' : 'border-neutral-200';
    const sidebarClass = isDark ? 'bg-[#0c0c0e]' : 'bg-neutral-50';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className={`w-full max-w-5xl h-[80vh] rounded-2xl shadow-2xl flex overflow-hidden border ${bgClass} ${borderClass} ${textClass}`}>

                {/* Sidebar */}
                <div className={`w-64 flex flex-col border-r ${sidebarClass} ${borderClass}`}>
                    <div className="p-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 tracking-tight">
                            <FlaskConical className="text-emerald-500" />
                            Explore
                        </h2>
                    </div>

                    <nav className="flex-1 px-4 space-y-1">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => { setActiveCategory(cat); setActiveTag(null); }}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between group ${activeCategory === cat
                                    ? (isDark ? 'bg-neutral-800 text-white' : 'bg-white text-black shadow-sm')
                                    : (isDark ? 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100')
                                    }`}
                            >
                                {cat}
                                {activeCategory === cat && <ChevronRight size={14} className="opacity-50" />}
                            </button>
                        ))}
                    </nav>

                    <div className={`p-4 text-xs text-center border-t ${isDark ? 'opacity-40 text-neutral-500' : 'text-neutral-500'} ${borderClass}`}>
                        Data provided by RCSB PDB
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0 relative">
                    {/* Header */}
                    <div className={`p-6 border-b flex items-center gap-4 ${borderClass}`}>
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

                        <button onClick={onClose} className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'}`}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Tags */}
                    <div className="px-6 py-4 flex flex-wrap gap-2 overflow-x-auto">
                        <button
                            onClick={() => setActiveTag(null)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${!activeTag
                                ? (isDark ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700')
                                : (isDark ? 'border-neutral-800 text-neutral-500 hover:border-neutral-700' : 'border-neutral-200 text-neutral-500')
                                }`}
                        >
                            All Tags
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all flex items-center gap-1 ${activeTag === tag
                                    ? (isDark ? 'bg-neutral-100 text-black border-white' : 'bg-neutral-800 text-white border-neutral-800')
                                    : (isDark ? 'border-neutral-800 text-neutral-500 hover:border-neutral-600' : 'border-neutral-200 text-neutral-600 hover:border-neutral-400')
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
    );
};

