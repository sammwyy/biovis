import { SelectHTMLAttributes, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    label?: string;
    error?: string;
    isDark?: boolean;
    size?: 'sm' | 'md' | 'lg';
    options: Array<{ value: string; label: string }>;
}

export const Select: React.FC<SelectProps> = ({
    label,
    error,
    isDark = false,
    size = 'md',
    className = '',
    options,
    ...props
}) => {
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-5 py-3 text-base'
    };

    const selectClasses = `
        w-full rounded-lg border outline-none transition-all appearance-none pr-10
        ${sizeClasses[size]}
        ${isDark
            ? 'bg-neutral-900 border-neutral-800 focus:border-emerald-500/50 focus:bg-neutral-800 text-white'
            : 'bg-neutral-50 border-neutral-200 focus:border-emerald-500 focus:bg-white'
        }
        ${error ? (isDark ? 'border-red-500/50' : 'border-red-300') : ''}
        ${className}
    `;

    return (
        <div className="relative group">
            {label && (
                <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    className={selectClasses}
                    {...props}
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown 
                    size={18} 
                    className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`} 
                />
            </div>
            {error && (
                <div className={`mt-1.5 text-xs px-3 py-1.5 rounded-lg ${isDark ? 'bg-red-900/20 border border-red-800/50 text-red-400' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                    {error}
                </div>
            )}
        </div>
    );
};

