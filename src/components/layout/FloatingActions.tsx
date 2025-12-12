
import React, { useState } from 'react';
import { Bell, StickyNote, Clock } from 'lucide-react';
import { RightDrawer } from '../ui/RightDrawer';
import { NotificationsPanel } from '../panels/NotificationsPanel';
import { NotesPanel } from '../panels/NotesPanel';
import { RemindersPanel } from '../panels/RemindersPanel';

type DrawerType = 'notifications' | 'notes' | 'reminders' | null;

export const FloatingActions: React.FC = () => {
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);

  const toggleDrawer = (type: DrawerType) => {
    setActiveDrawer(activeDrawer === type ? null : type);
  };

  const closeDrawer = () => setActiveDrawer(null);

  const getTitle = () => {
    switch (activeDrawer) {
      case 'notifications': return 'Notifications';
      case 'notes': return 'Quick Notes';
      case 'reminders': return 'Reminders';
      default: return '';
    }
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
        
        {/* Notifications FAB */}
        <div className="relative group">
          <button 
            onClick={() => toggleDrawer('notifications')}
            className={`
              w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300
              ${activeDrawer === 'notifications' ? 'bg-primary text-white scale-110' : 'bg-secondary text-white hover:bg-secondary-hover hover:scale-110'}
            `}
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Notifications
          </span>
          {/* Unread indicator dot */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-background rounded-full"></span>
        </div>

        {/* Notes FAB */}
        <div className="relative group">
          <button 
            onClick={() => toggleDrawer('notes')}
            className={`
              w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300
              ${activeDrawer === 'notes' ? 'bg-primary text-white scale-110' : 'bg-secondary text-white hover:bg-secondary-hover hover:scale-110'}
            `}
            title="Notes"
          >
            <StickyNote className="w-5 h-5" />
          </button>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Quick Notes
          </span>
        </div>

        {/* Reminders FAB */}
        <div className="relative group">
          <button 
            onClick={() => toggleDrawer('reminders')}
            className={`
              w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300
              ${activeDrawer === 'reminders' ? 'bg-primary text-white scale-110' : 'bg-secondary text-white hover:bg-secondary-hover hover:scale-110'}
            `}
            title="Reminders"
          >
            <Clock className="w-5 h-5" />
          </button>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Reminders
          </span>
        </div>
      </div>

      {/* Drawer Container */}
      <RightDrawer
        isOpen={activeDrawer !== null}
        onClose={closeDrawer}
        title={getTitle()}
      >
        {activeDrawer === 'notifications' && <NotificationsPanel />}
        {activeDrawer === 'notes' && <NotesPanel />}
        {activeDrawer === 'reminders' && <RemindersPanel />}
      </RightDrawer>
    </>
  );
};
