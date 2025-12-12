import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/30 focus:ring-primary",
    secondary: "bg-secondary text-white hover:bg-secondary-hover shadow-lg shadow-secondary/30 focus:ring-secondary",
    ghost: "bg-transparent text-secondary hover:bg-primary/10",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    danger: "bg-accent-red text-white hover:bg-red-600 shadow-lg shadow-red-500/30",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {LeftIcon && <LeftIcon className="w-4 h-4 mr-2" />}
      {children}
      {RightIcon && <RightIcon className="w-4 h-4 ml-2" />}
    </button>
  );
};