import { Menu, History, Clock } from 'lucide-react';
import { IconButton } from '../ui/IconButton';
import { GalleryItem } from '@/lib/molecules';

interface MobileNavbarProps {
    structure: any;
    history: GalleryItem[];
    showHistory: boolean;
    onToggleSidebar: () => void;
    onToggleHistory: () => void;
    onLoadItem: (item: GalleryItem) => void;
    onExplore: () => void;
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    historyRef: React.RefObject<HTMLDivElement>;
    isDark: boolean;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
    structure,
    history,
    showHistory,
    onToggleSidebar,
    onToggleHistory,
    onLoadItem,
    onExplore,
    onFileUpload,
    historyRef,
    isDark
}) => {
    return (
        <div className={`h-16 border-b flex items-center justify-between px-4 md:px-6 transition-colors z-20 relative shrink-0 ${isDark ? 'bg-[#09090b] border-neutral-800' : 'bg-white border-neutral-200'}`}>
            <div className={`font-mono text-sm flex items-center gap-2 ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
                <IconButton
                    onClick={onToggleSidebar}
                    icon={<Menu size={20} />}
                    title="Menu"
                    isDark={isDark}
                />
                <span className="flex items-center gap-2">
                    <span className="font-semibold tracking-wide">Viewer</span>
                    {structure && <span className="opacity-50 mx-2">/</span>}
                    {structure?.metadata?.id && (
                        <span className="font-mono">{structure.metadata.id}</span>
                    )}
                </span>
            </div>

            <div className="flex items-center gap-2">
                {/* History Dropdown */}
                <div className="relative" ref={historyRef}>
                    <div className="relative inline-block">
                        <IconButton
                            onClick={onToggleHistory}
                            icon={<History size={16} className={isDark ? 'text-neutral-400' : 'text-neutral-700'} />}
                            title="History"
                            isDark={isDark}
                            variant="secondary"
                        />
                        {history.length > 0 && (
                            <span className="absolute top-0 right-0 flex h-1.5 w-1.5 rounded-full bg-emerald-500 -translate-y-0.5 translate-x-0.5"></span>
                        )}
                    </div>

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
                                            onClick={() => onLoadItem(item)}
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
            </div>
        </div>
    );
};

