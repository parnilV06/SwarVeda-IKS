import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export default function GlowButton({
  children,
  onClick,
  className,
  disabled = false,
  variant = 'primary',
}: GlowButtonProps) {
  const variantClasses = {
    primary: 'glow-button',
    secondary: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/75',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
