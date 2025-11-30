import { ReactNode } from 'react';

interface IconButtonProps {
    icon: ReactNode;
    onClick?: () => void;
    title?: string;
    variant?: 'ghost' | 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
    isDark?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    onClick,
    title,
    variant = 'ghost',
    size = 'md',
    disabled = false,
    className = '',
    isDark = false
}) => {
    const baseClasses = 'rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center';
    
    const variantClasses = {
        ghost: isDark
            ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
        primary: isDark
            ? 'text-emerald-400 hover:bg-neutral-800 hover:text-emerald-300'
            : 'text-emerald-600 hover:bg-neutral-100 hover:text-emerald-700',
        secondary: isDark
            ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
            : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
    };

    const sizeClasses = {
        sm: 'p-1.5',
        md: 'p-2',
        lg: 'p-2.5'
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        >
            {icon}
        </button>
    );
};

