import { X, Tag, FileText } from 'lucide-react';
import { Structure } from '@/lib/types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    structure: Structure | null;
    isDark: boolean;
}

export const MoleculeDetailsModal: React.FC<Props> = ({ isOpen, onClose, structure, isDark }) => {
    if (!isOpen || !structure?.metadata) return null;

    const bgClass = isDark ? 'bg-[#09090b] border-neutral-800 text-neutral-400' : 'bg-white border-neutral-200 text-neutral-700';
    const headerClass = isDark ? 'text-neutral-200 border-neutral-800' : 'text-neutral-900 border-neutral-200';
    const sectionTitleClass = isDark ? 'text-neutral-500' : 'text-neutral-600';

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={handleOverlayClick}
        >
            <div
                className={`w-full max-w-lg max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${bgClass}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className={`h-14 sm:h-16 px-4 sm:px-6 border-b flex items-center justify-between shrink-0 ${headerClass}`}>
                    <h2 className="text-base sm:text-lg font-bold tracking-tight flex items-center gap-2">
                        <FileText size={18} className="sm:w-5 sm:h-5" />
                        <span>Molecule Details</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-neutral-100 text-neutral-600'}`}
                    >
                        <X size={18} className="sm:w-5 sm:h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin">
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
                </div>
            </div>
        </div>
    );
};

