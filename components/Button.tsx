
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { useUser } from '../context/UserContext';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const { userData } = useUser();
  const isMom = userData?.parentType === 'mum';

  const baseClasses = 'inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed';

  const momVariantClasses = {
    primary: 'bg-mom-pink text-white hover:bg-pink-500 focus:ring-mom-pink',
    secondary: 'bg-gray-200 text-text-secondary hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-danger text-white hover:bg-red-700 focus:ring-danger',
  };
  
  const dadVariantClasses = {
    primary: 'bg-totocare-blue text-white hover:bg-blue-500 focus:ring-totocare-blue',
    secondary: 'bg-gray-200 text-text-secondary hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-danger text-white hover:bg-red-700 focus:ring-danger',
  };

  const variantClasses = isMom ? momVariantClasses[variant] : dadVariantClasses[variant];


  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;