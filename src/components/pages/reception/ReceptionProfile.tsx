import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { 
  User, Mail, Phone, Briefcase, Camera, Save, 
  Bell, MessageSquare, Monitor, Copy, Link as LinkIcon, 
  Shield, Lock, AlertTriangle, ExternalLink
} from 'lucide-react';
import type { ReceptionProfileProps } from './types';

export const ReceptionProfile: React.FC = () => {
  // State for Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Front Desk Admin',
    email: 'reception@gogreen.com',
    phone: '+1 (555) 019-2834',
    jobTitle: 'Receptionist',
    photoUrl: 'https://ui-avatars.com/api/?name=Front+Desk&background=0D8ABC&color=fff'
  });

  // State for Notifications
  const [notifications, setNotifications] = useState({
    visitorCheckIn: true,
    deliveryLogged: true,
    deliveryAssigned: true,
    enableSms: false
  });

  // State for Security
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isRemovalRequested, setIsRemovalRequested] = useState(false);

  // Handlers
  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurity(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveInfo = () => {
    alert('Personal information updated successfully.');
  };

  const handleSaveNotifications = () => {
    alert('Notification preferences saved.');
  };

  const handleUpdatePassword = () => {
    if (security.newPassword !== security.confirmPassword) {
      alert('New passwords do not match.');
      return;
    }
    alert('Password updated successfully.');
    setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://kiosk.gogreen-enterprise.com/launch');
    alert('Kiosk URL copied to clipboard.');
  };

  const handleRequestRemoval = () => {
    if (confirm('Are you sure you want to request account removal? An administrator will need to approve this.')) {
      setIsRemovalRequested(true);
      alert('Removal request sent to administrator.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary">My Profile</h1>
        <p className="text-gray-500 text-sm">Manage your personal details and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Personal Info & Notifications */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Personal Information */}
          <Card className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-secondary">Personal Information</h2>
            </div>

            <div className="flex items-start space-x-6">
               <div className="flex flex-col items-center space-y-3">
                  <div className="relative group cursor-pointer">
                     <img 
                       src={personalInfo.photoUrl} 
                       alt="Profile" 
                       className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 group-hover:border-primary/20 transition-all" 
                     />
                     <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-6 h-6 text-white" />
                     </div>
                  </div>
                  <button className="text-xs text-red-500 hover:text-red-600 font-medium">Remove Photo</button>
               </div>
               
               <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Input 
                      label="Full Name" 
                      name="fullName"
                      value={personalInfo.fullName}
                      onChange={handleInfoChange}
                      icon={User}
                    />
                  </div>
                  <Input 
                    label="Email Address" 
                    name="email"
                    value={personalInfo.email}
                    readOnly
                    className="bg-gray-50 text-gray-500 cursor-not-allowed"
                    icon={Mail}
                  />
                  <Input 
                    label="Phone Number" 
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handleInfoChange}
                    icon={Phone}
                    placeholder="+1 (555) 000-0000"
                  />
                  <div className="md:col-span-2">
                    <Input 
                      label="Job Title" 
                      name="jobTitle"
                      value={personalInfo.jobTitle}
                      onChange={handleInfoChange}
                      icon={Briefcase}
                    />
                  </div>
               </div>
            </div>

            <div className="flex justify-end pt-2">
               <Button leftIcon={Save} onClick={handleSaveInfo}>Save Changes</Button>
            </div>
          </Card>

          {/* 2. Notification Preferences */}
          <Card className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-secondary">Notification Preferences</h2>
            </div>

            <div className="space-y-4">
               <ToggleItem 
                 label="Visitor Check-in Alert" 
                 description="Receive an email when a guest checks in."
                 checked={notifications.visitorCheckIn}
                 onChange={() => handleNotificationToggle('visitorCheckIn')}
               />
               <ToggleItem 
                 label="Delivery Logged Alert" 
                 description="Receive an email when a new package is logged."
                 checked={notifications.deliveryLogged}
                 onChange={() => handleNotificationToggle('deliveryLogged')}
               />
               <ToggleItem 
                 label="Delivery Assignment Alert" 
                 description="Notify me when a delivery is assigned to me."
                 checked={notifications.deliveryAssigned}
                 onChange={() => handleNotificationToggle('deliveryAssigned')}
               />
               
               <div className="h-px bg-gray-100 my-2"></div>
               
               <div className="flex items-center justify-between">
                  <div className="flex items-start">
                     <div className={`mr-3 mt-0.5 ${notifications.enableSms ? 'text-primary' : 'text-gray-400'}`}>
                        <MessageSquare className="w-5 h-5" />
                     </div>
                     <div>
                       <label className="font-medium text-secondary">Enable SMS Notifications</label>
                       <p className="text-xs text-gray-500 mt-0.5">Receive urgent alerts via text message.</p>
                     </div>
                  </div>
                  {personalInfo.phone ? (
                     <Toggle 
                       checked={notifications.enableSms} 
                       onChange={() => handleNotificationToggle('enableSms')} 
                     />
                  ) : (
                     <span className="text-xs text-orange-500 font-medium bg-orange-50 px-2 py-1 rounded">Add Phone #</span>
                  )}
               </div>
            </div>

            <div className="flex justify-end pt-2">
               <Button variant="outline" onClick={handleSaveNotifications}>Save Preferences</Button>
            </div>
          </Card>

        </div>

        {/* Right Column: Kiosk, Security, Danger Zone */}
        <div className="space-y-6">
          
          {/* 3. Kiosk Access Helper */}
          <Card className="space-y-4 bg-surface-subtle border-none">
             <div className="flex items-center space-x-2 pb-2">
                <Monitor className="w-5 h-5 text-secondary" />
                <h2 className="text-md font-bold text-secondary">Kiosk Access</h2>
             </div>
             
             <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                   <span>Kiosk URL</span>
                   <Badge status="Active" className="scale-75 origin-right">Live</Badge>
                </div>
                <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 p-2">
                   <div className="flex-1 truncate text-xs font-mono text-gray-600">
                      https://kiosk.gogreen-enterprise.com/launch
                   </div>
                   <button onClick={handleCopyLink} className="ml-2 text-primary hover:text-primary-hover">
                      <Copy className="w-4 h-4" />
                   </button>
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs" leftIcon={LinkIcon} onClick={handleCopyLink}>
                   Copy Kiosk Link
                </Button>
                
                {/* Optional Pair Device - Visual only for receptionist */}
                <div className="pt-2 border-t border-gray-100 mt-2">
                   <p className="text-xs text-gray-400 mb-2">Need to set up a new iPad?</p>
                   <Button size="sm" className="w-full text-xs" leftIcon={ExternalLink}>Pair New Device</Button>
                </div>
             </div>
          </Card>

          {/* 4. Security */}
          <Card className="space-y-4">
             <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-2">
                <Shield className="w-5 h-5 text-secondary" />
                <h2 className="text-md font-bold text-secondary">Security</h2>
             </div>

             <div className="space-y-3">
                <Input 
                   type="password"
                   label="Current Password" 
                   name="currentPassword"
                   value={security.currentPassword}
                   onChange={handleSecurityChange}
                   icon={Lock}
                />
                <Input 
                   type="password"
                   label="New Password" 
                   name="newPassword"
                   value={security.newPassword}
                   onChange={handleSecurityChange}
                   icon={Lock}
                />
                <Input 
                   type="password"
                   label="Confirm Password" 
                   name="confirmPassword"
                   value={security.confirmPassword}
                   onChange={handleSecurityChange}
                   icon={Lock}
                />
                <Button 
                   className="w-full mt-2" 
                   onClick={handleUpdatePassword}
                   disabled={!security.currentPassword || !security.newPassword}
                >
                   Update Password
                </Button>
             </div>
          </Card>

          {/* 5. Danger Zone */}
          <div className="border border-red-100 bg-red-50/30 rounded-2xl p-6">
             <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h2 className="text-md font-bold text-red-700">Danger Zone</h2>
             </div>
             <p className="text-xs text-gray-500 mb-4">
                Request to have your account removed. This action requires administrator approval.
             </p>
             <Button 
                variant="danger" 
                size="sm" 
                className="w-full" 
                onClick={handleRequestRemoval}
                disabled={isRemovalRequested}
             >
                {isRemovalRequested ? 'Request Pending' : 'Request Account Removal'}
             </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

// Helper Components
const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button 
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${checked ? 'bg-primary' : 'bg-gray-200'}`}
  >
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);

const ToggleItem: React.FC<{
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
}> = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between">
    <div>
      <label className="font-medium text-secondary">{label}</label>
      {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);
