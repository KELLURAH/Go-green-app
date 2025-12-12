import React from 'react';
import { Sidebar } from '../layout/Sidebar';
import { Menu, Search, Bell } from 'lucide-react';
import type { StaffLayoutProps } from './types';

export const StaffLayout: React.FC<StaffLayoutProps> = ({ 
  children, 
  activeTab, 
  setActiveTab, 
  isMobileOpen, 
  setIsMobileOpen, 
  onLogout,
  title
}) => {
  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onLogout={onLogout}
        variant="staff"
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header - Staff Specific (Simpler) */}
        <header className="bg-background/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
             <button 
               className="mr-4 lg:hidden p-2 text-secondary hover:bg-gray-200 rounded-lg"
               onClick={() => setIsMobileOpen(true)}
             >
               <Menu className="w-6 h-6" />
             </button>
             
             <div className="hidden md:flex items-center text-sm">
                <span className="text-gray-400">Staff Portal</span>
                <span className="mx-2 text-gray-300">/</span>
                <span className="font-semibold text-secondary capitalize">{title}</span>
             </div>
          </div>

          <div className="flex items-center space-x-4">
             <button className="relative p-2 text-gray-500 hover:bg-white rounded-xl transition-colors">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
             </button>
          </div>
        </header>

        {/* Main Scroll Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
           <div className="max-w-6xl mx-auto">
              {children}
           </div>
        </main>
      </div>
    </div>
  );
};
