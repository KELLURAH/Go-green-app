
import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Bell, Mail, MessageSquare, Save } from 'lucide-react';

export const StaffSettings: React.FC = () => {
  const [prefs, setPrefs] = useState({
    email: true,
    sms: true,
    slack: false
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Notification Preferences</h1>
        <p className="text-gray-500 text-sm">Manage how you want to be alerted.</p>
      </div>

      <Card className="max-w-xl space-y-6">
         <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-secondary">Alert Channels</h2>
         </div>

         <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50">
               <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="font-medium text-secondary">Email Notifications</span>
               </div>
               <input type="checkbox" checked={prefs.email} onChange={() => setPrefs({...prefs, email: !prefs.email})} className="h-5 w-5 text-primary rounded" />
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50">
               <div className="flex items-center">
                  <MessageSquare className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="font-medium text-secondary">SMS / Text Message</span>
               </div>
               <input type="checkbox" checked={prefs.sms} onChange={() => setPrefs({...prefs, sms: !prefs.sms})} className="h-5 w-5 text-primary rounded" />
            </div>
         </div>

         <Button className="w-full" leftIcon={Save}>Save Preferences</Button>
      </Card>
    </div>
  );
};
