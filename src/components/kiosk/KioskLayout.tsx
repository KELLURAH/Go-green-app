
import React from 'react';
import { X } from 'lucide-react';

interface KioskLayoutProps {
  children: React.ReactNode;
  onExit?: () => void;
}

export const KioskLayout: React.FC<KioskLayoutProps> = ({ children, onExit }) => {
  return (
    <div className="fixed inset-0 bg-[#2E3340] text-white flex flex-col overflow-hidden font-sans selection:bg-[#C8A45E] selection:text-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4CAF50] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C8A45E] rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between p-8">
        <div className="flex items-center space-x-4">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/10">
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-[#4CAF50]" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
              </svg>
           </div>
           <div>
              <h1 className="text-2xl font-bold tracking-tight leading-none">GO-GREEN</h1>
              <p className="text-xs text-[#4CAF50] font-bold uppercase tracking-widest leading-none mt-1">Enterprise</p>
           </div>
        </div>
        
        {/* Secret/Admin Exit Button */}
        {onExit && (
          <button 
            onClick={onExit}
            className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
            title="Exit Kiosk Mode"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col relative w-full h-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-20 p-6 text-center text-white/30 text-xs font-medium uppercase tracking-widest">
        Secure Check-in System v2.0
      </footer>
    </div>
  );
};
