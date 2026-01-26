import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export function Card({
  children,
  className = '',
  title,
}: CardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800
        rounded-lg shadow-md
        border border-gray-200 dark:border-gray-700
        ${className}
      `}
    >
      {title && (
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
