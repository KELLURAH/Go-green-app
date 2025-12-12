import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { 
  Upload, Image as ImageIcon, RotateCcw, Save, 
  Check, Smartphone, Monitor, Layout
} from 'lucide-react';
import type { BrandingSettingsProps } from './types';

export const BrandingSettings: React.FC = () => {
  const defaultState = {
    primaryColor: '#C8A45E',
    secondaryColor: '#2E3340',
    accentColor: '#4CAF50',
    buttonStyle: 'rounded' as 'rounded' | 'sharp',
    welcomeMessage: 'Welcome to GO-GREEN Enterprise',
    showKioskLogo: true,
    logoPreview: 'https://via.placeholder.com/150x50?text=LOGO',
    kioskBgPreview: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80'
  };

  const [settings, setSettings] = useState(defaultState);

  const handleColorChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all branding settings to default?')) {
      setSettings(defaultState);
    }
  };

  const handleSave = () => {
    alert('Branding settings saved successfully!');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Branding & Customization</h1>
          <p className="text-gray-500 text-sm">Customize the look and feel of your admin dashboard and visitor kiosk.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="ghost" leftIcon={RotateCcw} onClick={handleReset}>Reset Defaults</Button>
          <Button leftIcon={Save} onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column: Settings Form */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Brand Elements */}
          <Card>
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-6">
              <ImageIcon className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-secondary">Brand Assets</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUploader label="Primary Logo" sublabel="Recommended: 200x50px PNG" />
                <ImageUploader label="Dark Mode Logo" sublabel="For dark backgrounds" />
              </div>
              <ImageUploader label="Favicon" sublabel="32x32px ICO or PNG" small />
            </div>
          </Card>

          {/* Colors */}
          <Card>
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-6">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-blue-500" />
              <h2 className="text-lg font-bold text-secondary">Color Palette</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <ColorInput 
                label="Primary Color" 
                value={settings.primaryColor} 
                onChange={(v) => handleColorChange('primaryColor', v)} 
              />
              <ColorInput 
                label="Secondary Color" 
                value={settings.secondaryColor} 
                onChange={(v) => handleColorChange('secondaryColor', v)} 
              />
              <ColorInput 
                label="Accent Color" 
                value={settings.accentColor} 
                onChange={(v) => handleColorChange('accentColor', v)} 
              />
            </div>

            <div className="border-t border-gray-100 pt-6">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Button Style</label>
              <div className="flex gap-4">
                <button 
                  onClick={() => setSettings(prev => ({ ...prev, buttonStyle: 'rounded' }))}
                  className={`flex-1 p-4 border-2 rounded-xl flex flex-col items-center justify-center transition-all ${settings.buttonStyle === 'rounded' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                >
                  <div className="w-16 h-8 bg-current rounded-lg mb-2 opacity-20"></div>
                  <span className="text-sm font-medium">Rounded</span>
                </button>
                <button 
                  onClick={() => setSettings(prev => ({ ...prev, buttonStyle: 'sharp' }))}
                  className={`flex-1 p-4 border-2 rounded-xl flex flex-col items-center justify-center transition-all ${settings.buttonStyle === 'sharp' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                >
                  <div className="w-16 h-8 bg-current rounded-none mb-2 opacity-20"></div>
                  <span className="text-sm font-medium">Sharp / Boxy</span>
                </button>
              </div>
            </div>
          </Card>

          {/* Kiosk Settings */}
          <Card>
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-6">
              <Monitor className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-secondary">Kiosk Branding</h2>
            </div>
            
            <div className="space-y-6">
              <ImageUploader label="Kiosk Background Image" sublabel="1920x1080px JPG or PNG" />
              
              <div>
                <Input 
                  label="Welcome Message" 
                  value={settings.welcomeMessage}
                  onChange={(e) => setSettings(prev => ({...prev, welcomeMessage: e.target.value}))}
                />
              </div>

              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                 <span className="text-sm font-medium text-gray-700">Show Company Logo on Kiosk</span>
                 <div 
                   onClick={() => setSettings(prev => ({...prev, showKioskLogo: !prev.showKioskLogo}))}
                   className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${settings.showKioskLogo ? 'bg-primary' : 'bg-gray-300'}`}
                 >
                   <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.showKioskLogo ? 'translate-x-6' : 'translate-x-1'}`} />
                 </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Live Preview */}
        <div className="xl:col-span-1">
          <div className="sticky top-24 space-y-6">
             <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span className="font-bold uppercase tracking-wider flex items-center"><Layout className="w-4 h-4 mr-2"/> Live Preview</span>
                <Badge status="Info">Kiosk View</Badge>
             </div>

             {/* Mock Kiosk Device */}
             <div className="bg-gray-900 rounded-[2rem] p-3 shadow-2xl border-4 border-gray-800">
               <div className="bg-white rounded-[1.5rem] overflow-hidden relative aspect-[9/16] flex flex-col">
                  {/* Kiosk Background */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url(${settings.kioskBgPreview})` }}
                  >
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>

                  {/* Kiosk Content */}
                  <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center text-white">
                     {settings.showKioskLogo && (
                       <div className="mb-8 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                          <span className="text-xl font-bold tracking-tight">GO-GREEN</span>
                       </div>
                     )}
                     
                     <h2 className="text-2xl font-bold mb-2 leading-tight">{settings.welcomeMessage}</h2>
                     <p className="text-white/80 text-sm mb-8">Please select an option below to continue.</p>

                     <div className="w-full space-y-3">
                        <button 
                          style={{ 
                            backgroundColor: settings.primaryColor, 
                            borderRadius: settings.buttonStyle === 'rounded' ? '0.75rem' : '0.25rem' 
                          }}
                          className="w-full py-3 font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
                        >
                          Check In
                        </button>
                        <button 
                          style={{ 
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            borderRadius: settings.buttonStyle === 'rounded' ? '0.75rem' : '0.25rem'
                          }}
                          className="w-full py-3 font-bold text-white backdrop-blur-md hover:bg-white/30 transition-colors"
                        >
                          Delivery
                        </button>
                     </div>
                  </div>

                  {/* Kiosk Footer */}
                  <div className="relative z-10 p-4 text-center">
                     {/* Removed Powered by PBD Enterprise text */}
                  </div>
               </div>
             </div>

             {/* Style Summary */}
             <Card className="bg-surface-subtle border-none">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Active Style Config</h3>
                <div className="flex gap-2 mb-2">
                   <div className="w-8 h-8 rounded shadow-sm" style={{backgroundColor: settings.primaryColor}} title="Primary"></div>
                   <div className="w-8 h-8 rounded shadow-sm" style={{backgroundColor: settings.secondaryColor}} title="Secondary"></div>
                   <div className="w-8 h-8 rounded shadow-sm" style={{backgroundColor: settings.accentColor}} title="Accent"></div>
                </div>
                <div className="text-xs text-gray-500 font-mono">
                   Btn: {settings.buttonStyle}
                </div>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components

const ImageUploader: React.FC<{ label: string; sublabel?: string; small?: boolean }> = ({ label, sublabel, small }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{label}</label>
    <div className={`
      border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 
      rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center text-center
      ${small ? 'h-24' : 'h-32'}
    `}>
      <Upload className="w-6 h-6 text-gray-400 mb-2" />
      <span className="text-sm font-medium text-secondary">Click to upload</span>
      {sublabel && <span className="text-xs text-gray-400 mt-1">{sublabel}</span>}
    </div>
  </div>
);

const ColorInput: React.FC<{ label: string; value: string; onChange: (val: string) => void }> = ({ label, value, onChange }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{label}</label>
    <div className="flex items-center bg-surface-subtle border border-gray-200 rounded-xl p-2">
       <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 shadow-sm relative mr-3 shrink-0">
          <input 
            type="color" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0"
          />
       </div>
       <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-none text-sm font-mono text-secondary focus:ring-0 w-full uppercase"
       />
    </div>
  </div>
);
