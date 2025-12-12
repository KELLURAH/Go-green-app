import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { 
  Monitor, Smartphone, QrCode, Save, RefreshCw, 
  Download, Plus, Trash2, Globe, Clock, Lock, Link as LinkIcon,
  Info, ExternalLink
} from 'lucide-react';
import type { PairedDevice } from './types';

interface KioskSettingsProps {
  onLaunchKiosk?: () => void;
}

export const KioskSettings: React.FC<KioskSettingsProps> = ({ onLaunchKiosk }) => {
  const [accessCode, setAccessCode] = useState('');
  const [kioskUrl] = useState('https://kiosk.gogreen-enterprise.com/launch');
  
  const [devices, setDevices] = useState<PairedDevice[]>([
    { id: '1', name: 'Lobby iPad 1', lastActive: 'Just now', status: 'Online' },
    { id: '2', name: 'Rear Entrance Tablet', lastActive: '2 hours ago', status: 'Offline' },
  ]);

  const [displayOptions, setDisplayOptions] = useState({
    showVisitorType: true,
    showDeliveryBtn: true,
    enableQrCheckIn: true,
    showLanguage: false
  });

  const [idle, setIdle] = useState({
    resetSeconds: '30',
    lockMinutes: '60'
  });

  const generateCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setAccessCode(code);
  };

  const removeDevice = (id: string) => {
    if (confirm('Are you sure you want to remove this device? It will require re-pairing.')) {
      setDevices(prev => prev.filter(d => d.id !== id));
    }
  };

  const handleSave = () => {
    alert('Kiosk settings saved successfully.');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Kiosk Settings</h1>
          <p className="text-gray-500 text-sm">Manage your check-in devices and kiosk behavior.</p>
        </div>
        <Button leftIcon={Save} onClick={handleSave}>Save Kiosk Settings</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Management */}
        <Card className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
            <Monitor className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-secondary">Kiosk Mode Setup</h2>
          </div>

          <div className="space-y-4">
             <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Kiosk URL</label>
                <div className="flex gap-2">
                   <div className="flex-1 bg-surface-subtle border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 truncate font-mono">
                      {kioskUrl}
                   </div>
                   <Button variant="outline" className="px-3" onClick={() => alert('Copied!')}><LinkIcon className="w-4 h-4" /></Button>
                </div>
                <div className="mt-2">
                  <Button 
                    className="w-full bg-secondary text-white hover:bg-secondary-hover" 
                    leftIcon={ExternalLink}
                    onClick={onLaunchKiosk}
                  >
                    Launch Kiosk Simulator
                  </Button>
                </div>
             </div>

             <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
                {!accessCode ? (
                   <div className="space-y-3">
                      <p className="text-sm text-secondary font-medium">Ready to set up a new iPad or tablet?</p>
                      <Button onClick={generateCode} leftIcon={Plus}>Pair New Device</Button>
                   </div>
                ) : (
                   <div className="space-y-3 animate-in zoom-in">
                      <p className="text-xs font-bold text-primary uppercase tracking-wider">Access Code</p>
                      <div className="text-4xl font-mono font-bold text-secondary tracking-widest">{accessCode}</div>
                      <p className="text-xs text-gray-500">Enter this code on the kiosk device screen.</p>
                      <Button variant="ghost" size="sm" onClick={() => setAccessCode('')}>Done</Button>
                   </div>
                )}
             </div>

             <div className="pt-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Paired Devices</label>
                <div className="space-y-2">
                   {devices.map(device => (
                      <div key={device.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                         <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${device.status === 'Online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-300'}`}></div>
                            <div>
                               <p className="text-sm font-bold text-secondary">{device.name}</p>
                               <p className="text-xs text-gray-400">Last active: {device.lastActive}</p>
                            </div>
                         </div>
                         <button onClick={() => removeDevice(device.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                            <Trash2 className="w-4 h-4" />
                         </button>
                      </div>
                   ))}
                   {devices.length === 0 && (
                     <p className="text-xs text-gray-400 italic text-center py-2">No devices paired.</p>
                   )}
                </div>
             </div>
          </div>
        </Card>

        <div className="space-y-6">
           {/* Display Options */}
           <Card className="space-y-6">
             <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
               <Smartphone className="w-5 h-5 text-primary" />
               <h2 className="text-lg font-bold text-secondary">Kiosk Display Options</h2>
             </div>
             
             <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-xl mb-4 flex items-start">
                <Info className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
                <span>Tip: Enable full-screen mode on your browser/device for the best kiosk experience.</span>
             </div>

             <div className="space-y-4">
               <ToggleItem 
                 label="Show Visitor Type Selector" 
                 checked={displayOptions.showVisitorType}
                 onChange={() => setDisplayOptions(prev => ({...prev, showVisitorType: !prev.showVisitorType}))}
               />
               <ToggleItem 
                 label="Show 'I have a delivery' Button" 
                 checked={displayOptions.showDeliveryBtn}
                 onChange={() => setDisplayOptions(prev => ({...prev, showDeliveryBtn: !prev.showDeliveryBtn}))}
               />
               <ToggleItem 
                 label="Enable QR Check-In" 
                 checked={displayOptions.enableQrCheckIn}
                 onChange={() => setDisplayOptions(prev => ({...prev, enableQrCheckIn: !prev.enableQrCheckIn}))}
               />
               <ToggleItem 
                 label="Show Language Switcher" 
                 checked={displayOptions.showLanguage}
                 onChange={() => setDisplayOptions(prev => ({...prev, showLanguage: !prev.showLanguage}))}
                 icon={Globe}
               />
             </div>
           </Card>

           {/* Idle Behavior */}
           <Card className="space-y-6">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
               <Clock className="w-5 h-5 text-primary" />
               <h2 className="text-lg font-bold text-secondary">Idle Behavior</h2>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-xs font-semibold text-gray-500 uppercase">Auto-Reset (Sec)</label>
                   <Input 
                     type="number" 
                     className="mt-1" 
                     value={idle.resetSeconds} 
                     onChange={(e) => setIdle(prev => ({...prev, resetSeconds: e.target.value}))}
                     icon={RefreshCw}
                     placeholder="e.g. 30"
                   />
                </div>
                <div>
                   <label className="text-xs font-semibold text-gray-500 uppercase">Auto-Lock (Min)</label>
                   <Input 
                     type="number" 
                     className="mt-1" 
                     value={idle.lockMinutes} 
                     onChange={(e) => setIdle(prev => ({...prev, lockMinutes: e.target.value}))}
                     icon={Lock}
                     placeholder="e.g. 60"
                   />
                </div>
             </div>
           </Card>
        </div>

        {/* QR Poster Generator */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-secondary to-[#1a1d24] text-white border-none">
           <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                 <div className="bg-white p-3 rounded-xl shadow-lg">
                    <QrCode className="w-24 h-24 text-secondary" />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-white mb-1">QR Poster Generator</h3>
                    <p className="text-gray-400 text-sm max-w-md">
                       Auto-generate a printable PDF poster with a QR code. Visitors can scan this to check in via their own smartphones.
                    </p>
                 </div>
              </div>
              <Button className="bg-primary hover:bg-primary-hover text-white border-none shadow-xl" leftIcon={Download}>
                 Download Poster (PDF)
              </Button>
           </div>
        </Card>
      </div>
    </div>
  );
};

// Helper Toggle Component
const ToggleItem: React.FC<{
  label: string;
  checked: boolean;
  onChange: () => void;
  icon?: React.ElementType;
}> = ({ label, checked, onChange, icon: Icon }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      {Icon && (
        <div className={`mr-3 ${checked ? 'text-primary' : 'text-gray-400'}`}>
           <Icon className="w-4 h-4" />
        </div>
      )}
      <label className="font-medium text-secondary text-sm">{label}</label>
    </div>
    <button 
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${checked ? 'bg-primary' : 'bg-gray-200'}`}
    >
      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  </div>
);
