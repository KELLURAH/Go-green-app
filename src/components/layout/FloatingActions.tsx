
import React, { useState } from 'react';
import { Bell, StickyNote, Clock } from 'lucide-react';
import { RightDrawer } from '../ui/RightDrawer';
import { NotificationsPanel } from '../panels/NotificationsPanel';
import { NotesPanel } from '../panels/NotesPanel';
import { RemindersPanel } from '../panels/RemindersPanel';

type DrawerType = 'notifications' | 'notes' | 'reminders' | null;

interface FloatingActionsProps {
  variant?: 'floating' | 'header';
  activeDrawer?: DrawerType;
  onSetActiveDrawer?: (drawer: DrawerType) => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ 
  variant = 'floating',
  activeDrawer: externalActiveDrawer,
  onSetActiveDrawer
}) => {
  // Use external state if provided, otherwise use internal state
  const [internalActiveDrawer, setInternalActiveDrawer] = useState<DrawerType>(null);
  const activeDrawer = externalActiveDrawer !== undefined ? externalActiveDrawer : internalActiveDrawer;
  
  const setActiveDrawer = (drawer: DrawerType) => {
    if (onSetActiveDrawer) {
      onSetActiveDrawer(drawer);
    } else {
      setInternalActiveDrawer(drawer);
    }
  };

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

  const fabContainerClass = variant === 'header' 
    ? 'flex items-center gap-2' 
    : 'hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-4';

  const fabButtonClass = (active: boolean) => variant === 'header'
    ? `w-10 h-10 rounded-lg shadow-md flex items-center justify-center transition-all duration-300 ${
        active ? 'bg-primary text-white scale-105' : 'bg-gray-100 text-secondary hover:bg-gray-200 hover:scale-105'
      }`
    : `w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
        active ? 'bg-primary text-white scale-110' : 'bg-secondary text-white hover:bg-secondary-hover hover:scale-110'
      }`;

  const fabIconClass = variant === 'header' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <>
      {/* Floating Action Buttons */}
      <div className={fabContainerClass}>
        
        {/* Notifications FAB */}
        <div className={variant === 'header' ? 'relative' : 'relative group'}>
          <button 
            onClick={() => toggleDrawer('notifications')}
            className={fabButtonClass(activeDrawer === 'notifications')}
            title="Notifications"
          >
            <Bell className={fabIconClass} />
          </button>
          {variant === 'floating' && (
            <>
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Notifications
              </span>
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-background rounded-full"></span>
            </>
          )}
          {variant === 'header' && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border-2 border-background rounded-full"></span>
          )}
        </div>

        {/* Notes FAB */}
        <div className={variant === 'header' ? 'relative' : 'relative group'}>
          <button 
            onClick={() => toggleDrawer('notes')}
            className={fabButtonClass(activeDrawer === 'notes')}
            title="Notes"
          >
            <StickyNote className={fabIconClass} />
          </button>
          {variant === 'floating' && (
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Quick Notes
            </span>
          )}
        </div>

        {/* Reminders FAB */}
        <div className={variant === 'header' ? 'relative' : 'relative group'}>
          <button 
            onClick={() => toggleDrawer('reminders')}
            className={fabButtonClass(activeDrawer === 'reminders')}
            title="Reminders"
          >
            <Clock className={fabIconClass} />
          </button>
          {variant === 'floating' && (
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Reminders
            </span>
          )}
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
