import React, { ReactNode } from 'react';
import { useUser } from '../context/UserContext';

interface TipCardProps {
  children: ReactNode;
  title: string;
  variant?: 'primary' | 'ppd';
  icon?: ReactNode;
}

const TipCard: React.FC<TipCardProps> = ({ children, title, variant = 'primary', icon }) => {
  const { userData } = useUser();
  const isMom = userData?.parentType === 'mum';
  
  const variants = {
    primary: {
      bg: isMom ? 'bg-pink-50' : 'bg-totocare-blue-light',
      border: isMom ? 'border-mom-pink' : 'border-totocare-blue',
      text: isMom ? 'text-mom-pink' : 'text-totocare-blue',
    },
    ppd: {
      bg: 'bg-purple-50',
      border: 'border-purple-500',
      text: 'text-purple-600',
    }
  }

  const selectedVariant = variants[variant];
  
  return (
    <div className={`p-4 rounded-lg border-l-4 ${selectedVariant.bg} ${selectedVariant.border}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {icon ? <div className={selectedVariant.text}>{icon}</div> : 
            <span className={`material-symbols-outlined ${selectedVariant.text}`}>lightbulb</span>
          }
        </div>
        <div className="ml-3">
          <h4 className={`text-base font-bold ${selectedVariant.text}`}>{title}</h4>
          <div className="mt-2 text-sm text-text-secondary">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipCard;