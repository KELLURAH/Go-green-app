import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Trash2, Calendar, Mail, MessageSquare, Bell } from 'lucide-react';
import { Badge } from '../ui/Badge';
import type { Reminder } from './types';

export const RemindersPanel: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', text: 'Call vendor about invoice', datetime: '2023-10-25T14:00', notifyEmail: true, notifySms: false }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    notifyEmail: true,
    notifySms: false
  });

  const handleSave = () => {
    if (!newReminder.text || !newReminder.datetime) return;

    const reminder: Reminder = {
      id: Date.now().toString(),
      text: newReminder.text,
      datetime: newReminder.datetime,
      notifyEmail: newReminder.notifyEmail || false,
      notifySms: newReminder.notifySms || false
    };

    setReminders([reminder, ...reminders]);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const resetForm = () => {
    setNewReminder({ notifyEmail: true, notifySms: false });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {!isAdding ? (
        <>
          <Button onClick={() => setIsAdding(true)} className="w-full" leftIcon={Plus}>
            Set New Reminder
          </Button>

          <div className="space-y-4">
            {reminders.map(reminder => (
               <div key={reminder.id} className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                     <div>
                        <p className="font-bold text-secondary text-sm">{reminder.text}</p>
                        <p className="text-xs text-primary font-bold mt-1 flex items-center">
                           <Calendar className="w-3 h-3 mr-1" />
                           {new Date(reminder.datetime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                        </p>
                     </div>
                     <button onClick={() => handleDelete(reminder.id)} className="text-gray-300 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                     </button>
                  </div>
                  
                  <div className="flex gap-2 border-t border-gray-100 pt-3">
                     {reminder.notifyEmail && (
                        <Badge status="Info" className="bg-blue-50 text-blue-600 border-none text-[10px] py-0.5 px-2">
                           <Mail className="w-3 h-3 mr-1" /> Email
                        </Badge>
                     )}
                     {reminder.notifySms && (
                        <Badge status="Info" className="bg-purple-50 text-purple-600 border-none text-[10px] py-0.5 px-2">
                           <MessageSquare className="w-3 h-3 mr-1" /> SMS
                        </Badge>
                     )}
                     {!reminder.notifyEmail && !reminder.notifySms && (
                        <span className="text-[10px] text-gray-400">No external notification</span>
                     )}
                  </div>
               </div>
            ))}
            {reminders.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                    <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No active reminders.</p>
                </div>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-4 animate-in slide-in-from-right-4 fade-in bg-gray-50 p-4 rounded-xl border border-gray-200">
           <h3 className="font-bold text-secondary">New Reminder</h3>
           
           <Input 
             label="Reminder Text"
             placeholder="e.g. Check delivery status"
             value={newReminder.text || ''}
             onChange={(e) => setNewReminder({...newReminder, text: e.target.value})}
             autoFocus
           />

           <Input 
             type="datetime-local"
             label="When?"
             value={newReminder.datetime || ''}
             onChange={(e) => setNewReminder({...newReminder, datetime: e.target.value})}
           />

           <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Notification Method</label>
              <div className="flex gap-4">
                 <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded text-primary focus:ring-primary"
                      checked={newReminder.notifyEmail}
                      onChange={(e) => setNewReminder({...newReminder, notifyEmail: e.target.checked})}
                    />
                    <span className="text-sm text-secondary">Email</span>
                 </label>
                 <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded text-primary focus:ring-primary"
                      checked={newReminder.notifySms}
                      onChange={(e) => setNewReminder({...newReminder, notifySms: e.target.checked})}
                    />
                    <span className="text-sm text-secondary">SMS</span>
                 </label>
              </div>
           </div>

           <div className="flex gap-3 pt-2">
              <Button className="flex-1" onClick={handleSave}>Set Reminder</Button>
              <Button variant="ghost" onClick={resetForm}>Cancel</Button>
           </div>
        </div>
      )}
    </div>
  );
};
