
import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { 
  Bell, Mail, MessageSquare, Clock, ShieldAlert, 
  Check, Save, Send, AlertCircle 
} from 'lucide-react';

export const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    // Visitor Settings
    notifyHostEmail: true,
    notifyHostSms: true,
    includeVisitorName: true,
    includePurpose: false,
    
    // Delivery Settings
    notifyRecipientEmail: true,
    notifyRecipientSms: false,
    attachPackagePhoto: true,
    
    // Escalation
    escalationTime: '10',
    backupContact: 'Reception',
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert('Notification preferences saved successfully.');
  };

  const handleTest = () => {
    alert('Test notification sent to your registered email and phone.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Notification Settings</h1>
          <p className="text-gray-500 text-sm">Configure how and when your team receives alerts.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" leftIcon={Send} onClick={handleTest}>Send Test Alert</Button>
          <Button leftIcon={Save} onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visitor Notifications */}
        <Card className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-secondary">Visitor Check-In</h2>
          </div>
          
          <div className="space-y-5">
            <ToggleItem 
              label="Notify Host by Email" 
              description="Send an email when a guest checks in."
              checked={settings.notifyHostEmail}
              onChange={() => handleToggle('notifyHostEmail')}
              icon={Mail}
            />
            <ToggleItem 
              label="Notify Host by SMS" 
              description="Send a text message to host's mobile."
              checked={settings.notifyHostSms}
              onChange={() => handleToggle('notifyHostSms')}
              icon={MessageSquare}
            />
            
            <div className="border-t border-gray-100 pt-4 mt-4 space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message Content</h4>
              <ToggleItem 
                label="Include Visitor Name" 
                checked={settings.includeVisitorName}
                onChange={() => handleToggle('includeVisitorName')}
                compact
              />
              <ToggleItem 
                label="Include Visit Purpose" 
                checked={settings.includePurpose}
                onChange={() => handleToggle('includePurpose')}
                compact
              />
            </div>
          </div>
        </Card>

        {/* Delivery Notifications */}
        <Card className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
            <div className="relative">
              <Bell className="w-5 h-5 text-secondary" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </div>
            <h2 className="text-lg font-bold text-secondary">Delivery Logged</h2>
          </div>
          
          <div className="space-y-5">
            <ToggleItem 
              label="Notify Recipient by Email" 
              description="Email employee when package arrives."
              checked={settings.notifyRecipientEmail}
              onChange={() => handleToggle('notifyRecipientEmail')}
              icon={Mail}
            />
            <ToggleItem 
              label="Notify Recipient by SMS" 
              description="Urgent text alert for packages."
              checked={settings.notifyRecipientSms}
              onChange={() => handleToggle('notifyRecipientSms')}
              icon={MessageSquare}
            />
            
            <div className="border-t border-gray-100 pt-4 mt-4 space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Attachments</h4>
              <ToggleItem 
                label="Attach Package Photo" 
                description="Include the photo taken at reception."
                checked={settings.attachPackagePhoto}
                onChange={() => handleToggle('attachPackagePhoto')}
                compact
              />
            </div>
          </div>
        </Card>

        {/* Escalation Rules */}
        <Card className="md:col-span-2">
           <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-6">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-bold text-secondary">Escalation Rules</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 bg-red-50/50 p-6 rounded-xl border border-red-100">
             <div className="bg-white p-3 rounded-full shadow-sm text-red-500">
                <Clock className="w-6 h-6" />
             </div>
             <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 text-secondary font-medium">
                   <span>If host does not respond in</span>
                   <div className="w-20">
                      <Input 
                        name="escalationTime"
                        value={settings.escalationTime} 
                        onChange={handleChange}
                        className="text-center h-10 bg-white"
                        placeholder="10"
                      />
                   </div>
                   <span>minutes, notify backup contact:</span>
                   <div className="w-48">
                      <select 
                        name="backupContact"
                        value={settings.backupContact}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-200 text-secondary rounded-xl h-10 px-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                         <option value="Reception">Front Desk / Reception</option>
                         <option value="Security">Security Team</option>
                         <option value="Admin">Office Admin</option>
                      </select>
                   </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 flex items-center">
                   <AlertCircle className="w-3 h-3 mr-1" />
                   This applies to Check-in notifications only.
                </p>
             </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Helper Toggle Component
interface ToggleItemProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
  icon?: React.ElementType;
  compact?: boolean;
}

const ToggleItem: React.FC<ToggleItemProps> = ({ label, description, checked, onChange, icon: Icon, compact }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-start">
      {Icon && (
        <div className={`mr-3 mt-0.5 ${checked ? 'text-primary' : 'text-gray-400'}`}>
           <Icon className="w-5 h-5" />
        </div>
      )}
      <div>
        <label className={`font-medium text-secondary ${compact ? 'text-sm' : 'text-base'}`}>{label}</label>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
    </div>
    <button 
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${checked ? 'bg-primary' : 'bg-gray-200'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
);
