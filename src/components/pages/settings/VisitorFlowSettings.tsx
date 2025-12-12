import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { 
  Save, FileText, Upload, Plus, Trash2, 
  CheckSquare, Camera, User, Phone, LogOut, FileQuestion, Settings
} from 'lucide-react';
import type { CustomQuestion } from './types';

export const VisitorFlowSettings: React.FC = () => {
  // State
  const [fields, setFields] = useState({
    requirePhoto: true,
    requireCompany: true,
    requirePhone: false,
    requireHost: true,
    requirePurpose: true,
    requireVisitorType: false
  });

  const [nda, setNda] = useState({
    enabled: true,
    title: 'Non-Disclosure Agreement',
    requireSignature: true
  });

  const [checkout, setCheckout] = useState({
    enableQrCheckout: true,
    autoCheckoutHours: '12'
  });

  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([
    { id: '1', label: 'Have you traveled internationally in the last 14 days?', type: 'boolean' }
  ]);

  const [newQuestion, setNewQuestion] = useState({ label: '', type: 'text' as const });

  // Handlers
  const toggleField = (key: keyof typeof fields) => {
    setFields(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddQuestion = () => {
    if (!newQuestion.label.trim()) return;
    const question: CustomQuestion = {
      id: Math.random().toString(36).substr(2, 9),
      label: newQuestion.label,
      type: newQuestion.type
    };
    setCustomQuestions([...customQuestions, question]);
    setNewQuestion({ label: '', type: 'text' });
  };

  const handleDeleteQuestion = (id: string) => {
    setCustomQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleSave = () => {
    alert('Visitor flow configuration saved successfully.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Visitor Flow Settings</h1>
          <p className="text-gray-500 text-sm">Configure the check-in experience, required fields, and agreements.</p>
        </div>
        <Button leftIcon={Save} onClick={handleSave}>Save Visitor Flow</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Check-In Fields */}
        <Card className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
            <CheckSquare className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-secondary">Check-In Fields</h2>
          </div>
          
          <div className="space-y-4">
            <ToggleItem 
              label="Visitor Photo Required" 
              checked={fields.requirePhoto} 
              onChange={() => toggleField('requirePhoto')}
              icon={Camera}
            />
            <ToggleItem 
              label="Company Name Required" 
              checked={fields.requireCompany} 
              onChange={() => toggleField('requireCompany')}
              icon={User}
            />
            <ToggleItem 
              label="Phone Number Required" 
              checked={fields.requirePhone} 
              onChange={() => toggleField('requirePhone')}
              icon={Phone}
            />
            <div className="h-px bg-gray-100 my-2"></div>
            <ToggleItem 
              label="Host Selection" 
              checked={fields.requireHost} 
              onChange={() => toggleField('requireHost')}
            />
            <ToggleItem 
              label="Purpose of Visit" 
              checked={fields.requirePurpose} 
              onChange={() => toggleField('requirePurpose')}
            />
            <ToggleItem 
              label="Visitor Type Selection" 
              checked={fields.requireVisitorType} 
              onChange={() => toggleField('requireVisitorType')}
            />
          </div>
        </Card>

        {/* NDA & Agreements */}
        <Card className="space-y-6">
           <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-secondary">NDA & Agreements</h2>
          </div>

          <div className="space-y-6">
             <div className="bg-gray-50 p-4 rounded-xl mb-4">
                <ToggleItem 
                  label="Enable NDA / Agreement" 
                  checked={nda.enabled} 
                  onChange={() => setNda(prev => ({...prev, enabled: !prev.enabled}))}
                />
             </div>

             {nda.enabled && (
               <div className="space-y-4 animate-in fade-in">
                  <Input 
                    label="Agreement Title" 
                    value={nda.title}
                    onChange={(e) => setNda(prev => ({...prev, title: e.target.value}))}
                  />
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Agreement PDF</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                       <Upload className="w-6 h-6 text-gray-400 mb-2" />
                       <span className="text-sm font-medium text-secondary">Upload PDF Document</span>
                       <span className="text-xs text-gray-400 mt-1">current: standard-nda-v2.pdf</span>
                    </div>
                  </div>

                  <ToggleItem 
                    label="Visitor must sign before check-in" 
                    checked={nda.requireSignature} 
                    onChange={() => setNda(prev => ({...prev, requireSignature: !prev.requireSignature}))}
                    compact
                  />
               </div>
             )}
          </div>
        </Card>

        {/* Check-Out Settings */}
        <Card className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
            <LogOut className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-secondary">Check-Out Settings</h2>
          </div>

          <div className="space-y-4">
             <ToggleItem 
                label="Enable QR Badge Check-out" 
                description="Visitors can scan their badge at kiosk to leave."
                checked={checkout.enableQrCheckout} 
                onChange={() => setCheckout(prev => ({...prev, enableQrCheckout: !prev.enableQrCheckout}))}
             />
             
             <div className="pt-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Auto Check-out</label>
                <div className="flex items-center gap-3">
                   <div className="w-24">
                      <Input 
                        value={checkout.autoCheckoutHours}
                        onChange={(e) => setCheckout(prev => ({...prev, autoCheckoutHours: e.target.value}))}
                        type="number"
                      />
                   </div>
                   <span className="text-sm text-gray-600">hours after check-in</span>
                </div>
             </div>
          </div>
        </Card>

        {/* Custom Questions */}
        <Card className="space-y-6">
           <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
            <FileQuestion className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-secondary">Custom Questions</h2>
          </div>

          <div className="space-y-4">
             {/* List */}
             <div className="space-y-2">
               {customQuestions.map(q => (
                 <div key={q.id} className="flex items-center justify-between p-3 bg-surface-subtle rounded-xl border border-gray-100 group">
                    <div>
                       <p className="text-sm font-semibold text-secondary">{q.label}</p>
                       <Badge status="Info" className="mt-1">{q.type}</Badge>
                    </div>
                    <button 
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="text-gray-400 hover:text-red-500 p-2 rounded-lg transition-colors"
                    >
                       <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
               ))}
               {customQuestions.length === 0 && (
                 <p className="text-sm text-gray-400 italic text-center py-4">No custom questions added.</p>
               )}
             </div>

             {/* Add New */}
             <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Add New Question</h4>
                <div className="space-y-3">
                   <Input 
                     placeholder="Question text..."
                     value={newQuestion.label}
                     onChange={(e) => setNewQuestion(prev => ({...prev, label: e.target.value}))}
                   />
                   <div className="flex gap-2">
                      <select 
                        className="flex-1 bg-white border border-gray-200 text-sm rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={newQuestion.type}
                        onChange={(e) => setNewQuestion(prev => ({...prev, type: e.target.value as any}))}
                      >
                         <option value="text">Short Text</option>
                         <option value="dropdown">Dropdown</option>
                         <option value="boolean">Yes / No</option>
                      </select>
                      <Button leftIcon={Plus} onClick={handleAddQuestion} disabled={!newQuestion.label}>Add</Button>
                   </div>
                </div>
             </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Helper Toggle Component
const ToggleItem: React.FC<{
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
  icon?: React.ElementType;
  compact?: boolean;
}> = ({ label, description, checked, onChange, icon: Icon, compact }) => (
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
