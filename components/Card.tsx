import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  icon?: ReactNode;
  className?: string;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
}

const Card: React.FC<CardProps> = ({ children, title, icon, className = '', headerContent, footerContent }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      {(title || icon || headerContent) && (
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            {icon && <div className="mr-3">{icon}</div>}
            {title && <h3 className="text-lg font-bold text-text-primary">{title}</h3>}
          </div>
          {headerContent}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
      {footerContent && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
            {footerContent}
        </div>
      )}
    </div>
  );
};

export default Card;
