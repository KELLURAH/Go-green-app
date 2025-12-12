import React from 'react';

interface BadgeProps {
  status: 'Active' | 'Pending' | 'Inactive' | 'Success' | 'Error' | 'Warning' | 'Info' | 'Checked In' | 'Checked Out' | 'Expected' | 'Waiting' | 'Picked Up' | 'Signed' | 'Not Signed' | 'Upcoming' | 'Expired';
  className?: string;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ status, className = '', children }) => {
  const styles: Record<string, string> = {
    // User Statuses
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-gray-100 text-gray-600",
    Pending: "bg-yellow-100 text-yellow-700",
    Warning: "bg-yellow-100 text-yellow-700",
    
    // Visitor Statuses
    'Checked In': "bg-green-100 text-green-700",
    'Checked Out': "bg-gray-100 text-gray-500",
    Expected: "bg-blue-50 text-blue-700 border border-blue-100",
    
    // Pre-Registration Statuses
    Upcoming: "bg-purple-50 text-purple-700 border border-purple-100",
    Expired: "bg-red-50 text-red-600 border border-red-100",
    
    // Delivery Statuses
    Waiting: "bg-yellow-100 text-yellow-700",
    'Picked Up': "bg-gray-100 text-gray-500",

    // Agreement Statuses
    Signed: "bg-green-50 text-green-700 border border-green-200",
    'Not Signed': "bg-red-50 text-red-700 border border-red-200",

    // Generic
    Success: "bg-green-100 text-green-700",
    Error: "bg-red-100 text-red-700",
    Info: "bg-blue-100 text-blue-700",
  };

  const dotColor = (s: string) => {
    if (['Active', 'Success', 'Checked In', 'Signed'].includes(s)) return 'bg-green-500';
    if (['Pending', 'Warning', 'Waiting'].includes(s)) return 'bg-yellow-500';
    if (['Error', 'Not Signed', 'Expired'].includes(s)) return 'bg-red-500';
    if (['Info', 'Expected', 'Upcoming'].includes(s)) return 'bg-blue-500';
    return 'bg-gray-400';
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status] || styles.Inactive} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColor(status)}`}></span>
      {children || status}
    </span>
  );
};