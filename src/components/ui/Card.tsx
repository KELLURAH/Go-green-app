import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverable = false }) => {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${hoverable ? 'transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer' : ''} ${className}`}>
      {children}
    </div>
  );
};