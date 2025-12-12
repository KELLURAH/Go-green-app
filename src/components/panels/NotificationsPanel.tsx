
import React, { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Bell, Check, Clock, AlertCircle, Info, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  read: boolean;
}

export const NotificationsPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Delivery Arrived',
      description: 'Package from UPS for Design Team has arrived at reception.',
      timestamp: '10 mins ago',
      type: 'success',
      read: false
    },
    {
      id: '2',
      title: 'Kiosk Offline',
      description: 'The Rear Entrance Tablet has lost connection.',
      timestamp: '1 hour ago',
      type: 'alert',
      read: false
    },
    {
      id: '3',
      title: 'Visitor Check-in',
      description: 'Sarah Connor has checked in to see Elizabeth Addams.',
      timestamp: '2 hours ago',
      type: 'info',
      read: true
    },
    {
      id: '4',
      title: 'System Update',
      description: 'Scheduled maintenance tonight at 11:00 PM.',
      timestamp: 'Yesterday',
      type: 'warning',
      read: true
    }
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'alert': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
           <span className="text-sm text-gray-500">You have</span>
           <Badge status="Info" className="bg-primary/10 text-primary border-none">{unreadCount} new</Badge>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllRead}
            className="text-xs font-bold text-primary hover:text-primary-hover flex items-center"
          >
            <Check className="w-3 h-3 mr-1" /> Mark all read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`p-4 rounded-xl border transition-all ${
              notification.read 
                ? 'bg-white border-gray-100 opacity-70' 
                : 'bg-white border-l-4 border-l-primary shadow-sm border-gray-100'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                   <h4 className={`text-sm font-bold ${notification.read ? 'text-gray-600' : 'text-secondary'}`}>
                     {notification.title}
                   </h4>
                   <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2 flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {notification.timestamp}
                   </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {notification.description}
                </p>
              </div>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
            <div className="text-center py-12 text-gray-400">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No notifications.</p>
            </div>
        )}
      </div>
    </div>
  );
};
