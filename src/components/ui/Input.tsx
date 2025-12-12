import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ElementType;
}

export const Input: React.FC<InputProps> = ({ label, error, icon: Icon, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          className={`
            w-full bg-surface-subtle border border-gray-200 text-secondary rounded-xl py-2.5 
            ${Icon ? 'pl-10' : 'pl-4'} pr-4 
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all
            disabled:bg-gray-100 disabled:text-gray-400
            placeholder-gray-400
            ${error ? 'border-red-500 focus:ring-red-200' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};