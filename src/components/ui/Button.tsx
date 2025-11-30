import { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    isDark?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = 'secondary',
    size = 'md',
    disabled = false,
    className = '',
    type = 'button',
    isDark = false
}) => {
    const baseClasses = 'rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
        primary: isDark
            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
            : 'bg-emerald-600 hover:bg-emerald-700 text-white',
        secondary: isDark
            ? 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
            : 'bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200',
        ghost: isDark
            ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
        danger: isDark
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-red-600 hover:bg-red-700 text-white'
    };

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} flex items-center justify-center gap-2 ${className}`}
        >
            {children}
        </button>
    );
};

