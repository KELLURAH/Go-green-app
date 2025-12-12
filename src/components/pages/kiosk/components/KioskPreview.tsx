import React from 'react';
import type { CheckInButtonConfig } from '../../../../types';
import { 
  User, Truck, Calendar, Package, Briefcase, Coffee, Info 
} from 'lucide-react';

interface KioskPreviewProps {
  buttons: CheckInButtonConfig[];
  highlightId?: string;
}

export const KioskPreview: React.FC<KioskPreviewProps> = ({ buttons, highlightId }) => {
  const IconMap: Record<string, React.ElementType> = {
    User, Truck, Calendar, Package, Briefcase, Coffee, Info
  };

  const enabledButtons = buttons.filter(b => b.isEnabled);

  return (
    <div className="sticky top-6">
      <div className="bg-gray-900 rounded-[2.5rem] p-4 shadow-2xl border-4 border-gray-800 ring-4 ring-gray-200/50">
        {/* iPad Bezel/Screen */}
        <div className="bg-secondary rounded-[2rem] overflow-hidden relative aspect-[3/4] flex flex-col">
          
          {/* Status Bar Mock */}
          <div className="h-6 w-full flex justify-between items-center px-6 pt-2">
             <span className="text-[10px] text-white font-medium">9:41 AM</span>
             <div className="flex gap-1.5">
                <div className="w-4 h-2.5 bg-white rounded-[1px]"></div>
                <div className="w-0.5 h-2.5 bg-white/30 rounded-[1px]"></div>
             </div>
          </div>

          {/* Screen Content */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
             {/* Logo */}
             <div className="mb-8 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                <span className="text-lg font-bold tracking-tight text-white">GO-GREEN</span>
             </div>

             <h2 className="text-2xl font-bold text-white mb-2 text-center">Welcome</h2>
             <p className="text-white/60 text-sm mb-8 text-center">Please select an option to check in.</p>

             {/* Dynamic Grid */}
             <div className="grid grid-cols-1 w-full gap-3">
                {enabledButtons.map(btn => {
                  const Icon = IconMap[btn.icon] || Info;
                  return (
                    <div 
                      key={btn.id}
                      className={`
                        flex items-center p-4 rounded-xl bg-white text-secondary shadow-lg transition-all duration-300
                        ${highlightId === btn.id ? 'ring-4 ring-[#C8A45E] scale-105' : 'hover:bg-gray-50'}
                      `}
                    >
                       <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-primary mr-4 shrink-0">
                          <Icon className="w-5 h-5" />
                       </div>
                       <span className="font-bold text-sm">{btn.label}</span>
                    </div>
                  )
                })}
                {enabledButtons.length === 0 && (
                  <div className="text-white/30 text-center text-xs border-2 border-dashed border-white/10 rounded-xl p-4">
                    No active buttons
                  </div>
                )}
             </div>
          </div>

          {/* Background Decorative */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#4CAF50] rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#C8A45E] rounded-full blur-[80px] opacity-20 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        </div>
      </div>
      <div className="text-center mt-4">
         <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Kiosk Preview</p>
      </div>
    </div>
  );
};