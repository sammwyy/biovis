import { useState } from 'react';

import { Atom } from '@/lib/types';
import { X, Plus, Atom as AtomIcon } from 'lucide-react';

interface Props {
    atom: Atom | null;
    onClose: () => void;
    onAddAnnotation: (atom: Atom, text: string) => void;
    isDark: boolean;
}

export const InfoPanel: React.FC<Props> = ({ atom, onClose, onAddAnnotation, isDark }) => {
    const [annoText, setAnnoText] = useState('');
    const [showAnnoInput, setShowAnnoInput] = useState(false);

    if (!atom) return null;

    const handleAdd = () => {
        if (annoText.trim()) {
            onAddAnnotation(atom, annoText);
            setAnnoText('');
            setShowAnnoInput(false);
        }
    };

    // Carbon Theme
    const cardClass = isDark ? 'bg-[#09090b]/95 border-neutral-800 text-neutral-200' : 'bg-white/95 border-neutral-200 text-neutral-900';
    const labelClass = isDark ? 'text-neutral-500' : 'text-neutral-600';
    const valueClass = 'font-mono text-sm';
    const inputClass = isDark ? 'bg-neutral-900 border-neutral-700 text-white placeholder-neutral-600' : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500';

    return (
        <div className={`absolute right-6 top-20 w-80 backdrop-blur-md border rounded-2xl shadow-2xl p-0 overflow-hidden animate-fade-in z-10 flex flex-col ${cardClass}`}>
            <div className={`p-4 border-b flex justify-between items-center ${isDark ? 'border-neutral-800' : 'border-neutral-100'}`}>
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner ${isDark ? 'bg-neutral-800 text-emerald-400' : 'bg-neutral-100 text-emerald-600'}`}>
                        {atom.element}
                    </div>
                    <div>
                        <h3 className="font-bold text-sm leading-none mb-1">{atom.name}</h3>
                        <span className={`text-xs flex items-center gap-1 ${isDark ? 'opacity-60' : 'text-neutral-600'}`}>
                            ID #{atom.serial}
                        </span>
                    </div>
                </div>
                <button onClick={onClose} className={`p-1 rounded-full transition-colors ${isDark ? 'hover:bg-neutral-500/10' : 'hover:bg-neutral-200'}`}>
                    <X size={16} className={isDark ? 'opacity-60' : 'text-neutral-600'} />
                </button>
            </div>

            <div className="p-5 space-y-5">
                <div className="grid grid-cols-2 gap-y-5 gap-x-3">

                    <div>
                        <span className={`text-[10px] uppercase tracking-widest font-bold block mb-1 ${labelClass}`}>Residue</span>
                        <div className="flex items-baseline gap-2">
                            <span className="font-bold">{atom.residueName}</span>
                            <span className="text-xs opacity-70 font-mono">#{atom.residueSeq}</span>
                        </div>
                    </div>

                    <div>
                        <span className={`text-[10px] uppercase tracking-widest font-bold block mb-1 ${labelClass}`}>Chain</span>
                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${isDark ? 'bg-neutral-800 border border-neutral-700' : 'bg-neutral-100 border border-neutral-200'}`}>{atom.chainID}</span>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <span className={`text-[10px] uppercase tracking-widest font-bold block mb-2 ${labelClass}`}>Coordinates (Å)</span>
                        <div className={`grid grid-cols-3 gap-2 p-2.5 rounded-lg border ${isDark ? 'bg-black/40 border-neutral-800' : 'bg-neutral-50 border-neutral-100'}`}>
                            <div className="text-center">
                                <span className={`text-[9px] block mb-1 ${isDark ? 'opacity-40' : 'text-neutral-500'}`}>X</span>
                                <span className={valueClass}>{atom.position.x.toFixed(1)}</span>
                            </div>
                            <div className={`text-center border-l ${isDark ? 'border-neutral-500/10' : 'border-neutral-200'}`}>
                                <span className={`text-[9px] block mb-1 ${isDark ? 'opacity-40' : 'text-neutral-500'}`}>Y</span>
                                <span className={valueClass}>{atom.position.y.toFixed(1)}</span>
                            </div>
                            <div className={`text-center border-l ${isDark ? 'border-neutral-500/10' : 'border-neutral-200'}`}>
                                <span className={`text-[9px] block mb-1 ${isDark ? 'opacity-40' : 'text-neutral-500'}`}>Z</span>
                                <span className={valueClass}>{atom.position.z.toFixed(1)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 flex justify-between pt-2">
                        <div>
                            <span className={`text-[10px] uppercase tracking-widest font-bold block ${labelClass}`}>B-Factor</span>
                            <span className={valueClass}>{atom.bFactor}</span>
                        </div>
                        <div className="text-right">
                            <span className={`text-[10px] uppercase tracking-widest font-bold block ${labelClass}`}>Occupancy</span>
                            <span className={valueClass}>{atom.occupancy}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`p-4 border-t ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-100'}`}>
                {!showAnnoInput ? (
                    <button
                        onClick={() => setShowAnnoInput(true)}
                        className={`w-full py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${isDark ? 'bg-neutral-800 hover:bg-neutral-700 text-white' : 'bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700'}`}
                    >
                        <Plus size={14} /> Add Annotation
                    </button>
                ) : (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <input
                            type="text"
                            autoFocus
                            value={annoText}
                            onChange={(e) => setAnnoText(e.target.value)}
                            placeholder="Label text..."
                            className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 ${inputClass}`}
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleAdd}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded-lg text-sm font-medium"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setShowAnnoInput(false)}
                                className={`flex-1 py-1.5 rounded-lg text-sm font-medium ${isDark ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200' : 'bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800'}`}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

