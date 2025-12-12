
import React, { useState, useEffect } from 'react';
import { ChevronRight, Package } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (type: 'visitor' | 'delivery') => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
      
      {/* Clock */}
      <div className="mb-12 space-y-2">
        <div className="text-7xl md:text-8xl font-bold text-white tracking-tighter tabular-nums">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-xl text-white/60 font-medium">
          {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Headlines */}
      <div className="space-y-4 mb-16 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Welcome to GO-GREEN
        </h2>
        <p className="text-xl text-[#E6D5AA]">
          Please sign in to notify your host.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center space-y-6 w-full max-w-md">
        
        {/* Primary Pulse Button */}
        <button 
          onClick={() => onStart('visitor')}
          className="group relative w-full"
        >
          <div className="absolute inset-0 bg-[#C8A45E] rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
          <div className="relative w-full bg-[#C8A45E] hover:bg-[#B08D4B] text-black font-bold text-xl py-6 px-8 rounded-2xl shadow-xl transition-all transform group-hover:scale-[1.02] flex items-center justify-center">
             <span>Tap to Check In</span>
             <ChevronRight className="w-6 h-6 ml-2" />
          </div>
        </button>

        {/* Secondary Button */}
        <button 
          onClick={() => onStart('delivery')}
          className="flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 px-8 py-4 rounded-xl transition-all w-full border border-white/10 hover:border-white/30"
        >
           <Package className="w-5 h-5 mr-3" />
           <span className="font-medium text-lg">I have a delivery</span>
        </button>

      </div>
    </div>
  );
};
