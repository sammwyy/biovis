import { FileText, RotateCcw, Camera, Search, Upload } from 'lucide-react';
import { IconButton } from '../ui/IconButton';

interface MobileBottomBarProps {
    structure: any;
    onMoleculeDetails: () => void;
    onResetCamera: () => void;
    onScreenshot: () => void;
    onExplore: () => void;
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isDark: boolean;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
    structure,
    onMoleculeDetails,
    onResetCamera,
    onScreenshot,
    onExplore,
    onFileUpload,
    isDark
}) => {
    return (
        <div className={`h-16 border-t flex items-center justify-around px-2 sm:px-4 transition-colors z-30 shrink-0 shadow-lg ${isDark ? 'bg-[#09090b] border-neutral-800' : 'bg-white border-neutral-200'}`}>
            {structure?.metadata && (
                <IconButton 
                    onClick={onMoleculeDetails} 
                    icon={<FileText size={20} />} 
                    title="Molecule Details" 
                    isDark={isDark}
                    size="lg"
                />
            )}
            <IconButton 
                onClick={onResetCamera} 
                icon={<RotateCcw size={20} />} 
                title="Reset View" 
                isDark={isDark}
                size="lg"
            />
            <IconButton 
                onClick={onScreenshot} 
                icon={<Camera size={20} />} 
                title="Capture" 
                isDark={isDark}
                size="lg"
            />
            <IconButton 
                onClick={onExplore} 
                icon={<Search size={20} />} 
                title="Explore" 
                isDark={isDark}
                size="lg"
            />
            <label 
                className={`p-2.5 rounded-lg cursor-pointer transition-all flex items-center justify-center ${isDark
                    ? 'text-emerald-400 hover:bg-neutral-800 hover:text-emerald-300'
                    : 'text-emerald-600 hover:bg-neutral-100 hover:text-emerald-700'
                    }`} 
                title="Open PDB"
            >
                <Upload size={20} />
                <input type="file" accept=".pdb,.ent" onChange={onFileUpload} className="hidden" />
            </label>
        </div>
    );
};

