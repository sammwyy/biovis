import { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    isDark?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    leftIcon,
    rightIcon,
    isDark = false,
    size = 'md',
    className = '',
    ...props
}) => {
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-3 text-base'
    };

    const inputClasses = `
        w-full rounded-lg border outline-none transition-all font-mono
        ${sizeClasses[size]}
        ${leftIcon ? 'pl-9 sm:pl-10' : 'pl-4'}
        ${rightIcon ? 'pr-10' : 'pr-4'}
        ${isDark
            ? 'bg-neutral-900 border-neutral-800 focus:border-emerald-500/50 focus:bg-neutral-800 text-white placeholder-neutral-600'
            : 'bg-neutral-50 border-neutral-200 focus:border-emerald-500 focus:bg-white text-neutral-900 placeholder-neutral-500'
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
                {leftIcon && (
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-neutral-600 group-focus-within:text-emerald-500' : 'text-neutral-400'}`}>
                        {leftIcon}
                    </div>
                )}
                <input
                    className={inputClasses}
                    {...props}
                />
                {rightIcon && (
                    <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                        {rightIcon}
                    </div>
                )}
            </div>
            {error && (
                <div className={`mt-1.5 text-xs px-3 py-1.5 rounded-lg ${isDark ? 'bg-red-900/20 border border-red-800/50 text-red-400' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                    {error}
                </div>
            )}
        </div>
    );
};

