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
    primary: 'bg-primary hover:bg-primary/90 text-[hsl(15,45%,15.7%)] shadow-lg shadow-primary/20 hover:shadow-primary/40',
    secondary: 'bg-card border border-primary/20 hover:bg-card/80 text-primary shadow-lg shadow-primary/10 hover:shadow-primary/20',
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
