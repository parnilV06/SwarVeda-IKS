import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  hoverable?: boolean;
  icon?: ReactNode;
}

export default function SectionCard({
  title,
  description,
  children,
  className,
  hoverable = true,
  icon,
}: SectionCardProps) {
  return (
    <div
      className={cn(
        'glow-box rounded-xl p-6 backdrop-blur-sm transition-all duration-300',
        hoverable && 'hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/40',
        className
      )}
    >
      {icon && (
        <div className="mb-4 text-2xl">
          {icon}
        </div>
      )}
      {title && (
        <h3 className="text-lg font-semibold text-white mb-2">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-gray-300 mb-4">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
