import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import type { CheckInButtonConfig } from '../../../types';
import { KioskPreview } from './components/KioskPreview';
import { ArrowLeft, Save, Check, User, Camera, FileText, Printer, Plus, Trash2, X } from 'lucide-react';

interface EditWorkflowProps {
  button: CheckInButtonConfig;
  allButtons: CheckInButtonConfig[]; // For preview context
  onBack: () => void;
}

interface CustomField {
  id: string;
  label: string;
  collect: boolean;
  required: boolean;
}

export const EditWorkflow: React.FC<EditWorkflowProps> = ({ button, allButtons, onBack }) => {
  const [localBtn, setLocalBtn] = useState(button);
  const [activeTab, setActiveTab] = useState('options');

  // Mock Workflow State
  const [workflow, setWorkflow] = useState({
    notifyType: 'employee_search',
    fields: {
      fullName: { collect: true, required: true },
      email: { collect: true, required: true },
      company: { collect: true, required: true },
      phone: { collect: false, required: false },
    },
    customFields: [] as CustomField[],
    options: {
      capturePhoto: false,
      printBadge: true,
      requireNda: false
    }
  });

  // Custom Field State
  const [isAddingField, setIsAddingField] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState('');

  const handleSave = () => {
    alert('Workflow saved!');
  };

  const handleAddCustomField = () => {
    if (!newFieldLabel.trim()) return;
    
    const newField: CustomField = {
      id: Date.now().toString(),
      label: newFieldLabel,
      collect: true,
      required: false
    };

    setWorkflow(prev => ({
      ...prev,
      customFields: [...prev.customFields, newField]
    }));
    
    setNewFieldLabel('');
    setIsAddingField(false);
  };

  const handleDeleteCustomField = (id: string) => {
    setWorkflow(prev => ({
      ...prev,
      customFields: prev.customFields.filter(f => f.id !== id)
    }));
  };

  const toggleCustomField = (id: string, prop: 'collect' | 'required') => {
    setWorkflow(prev => ({
      ...prev,
      customFields: prev.customFields.map(f => 
        f.id === id ? { ...f, [prop]: !f[prop] } : f
      )
    }));
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
           <Button variant="ghost" size="sm" onClick={onBack} leftIcon={ArrowLeft}>Back</Button>
           <div>
              <h1 className="text-2xl font-bold text-secondary">Edit: {localBtn.label}</h1>
              <p className="text-gray-500 text-sm">Configure data collection and notifications.</p>
           </div>
        </div>
        <Button leftIcon={Save} onClick={handleSave}>Publish Changes</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Editor */}
        <div className="lg:col-span-7 space-y-6">
           {/* Tabs */}
           <div className="flex border-b border-gray-200">
              {['Button Basics', 'Notifications', 'Data Collection', 'Extras'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tab === 'Button Basics' ? 'border-primary text-secondary' : 'border-transparent text-gray-500 hover:text-secondary'}`}
                >
                  {tab}
                </button>
              ))}
           </div>

           <Card className="space-y-6">
              <h3 className="font-bold text-secondary text-lg">Button Basics</h3>
              <Input 
                label="Button Label" 
                value={localBtn.label} 
                onChange={(e) => setLocalBtn({...localBtn, label: e.target.value})}
              />
              
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                 <div>
                    <span className="block font-medium text-secondary">Button Status</span>
                    <span className="text-xs text-gray-500">Visible on kiosk home screen</span>
                 </div>
                 <Toggle 
                   checked={localBtn.isEnabled} 
                   onChange={() => setLocalBtn({...localBtn, isEnabled: !localBtn.isEnabled})}
                 />
              </div>
           </Card>

           <Card className="space-y-6">
              <h3 className="font-bold text-secondary text-lg">Visitor Information</h3>
              <div className="space-y-3">
                 <FieldRow label="Full Name" fieldKey="fullName" state={workflow.fields} onChange={(v) => setWorkflow({...workflow, fields: v})} />
                 <FieldRow label="Email Address" fieldKey="email" state={workflow.fields} onChange={(v) => setWorkflow({...workflow, fields: v})} />
                 <FieldRow label="Company" fieldKey="company" state={workflow.fields} onChange={(v) => setWorkflow({...workflow, fields: v})} />
                 <FieldRow label="Phone Number" fieldKey="phone" state={workflow.fields} onChange={(v) => setWorkflow({...workflow, fields: v})} />
                 
                 {/* Custom Fields List */}
                 {workflow.customFields.map(field => (
                   <div key={field.id} className="flex items-center justify-between p-3 rounded-xl border border-blue-100 bg-blue-50/30 group">
                      <div className="flex items-center space-x-3">
                         <div 
                           className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${field.collect ? 'bg-secondary border-secondary text-white' : 'border-gray-300 bg-white'}`} 
                           onClick={() => toggleCustomField(field.id, 'collect')}
                         >
                            {field.collect && <Check className="w-3 h-3" />}
                         </div>
                         <span className={`text-sm font-medium ${field.collect ? 'text-gray-900' : 'text-gray-400'}`}>{field.label}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {field.collect && (
                          <div className="flex items-center space-x-2">
                             <span className="text-xs text-gray-500">Required</span>
                             <Toggle checked={field.required} onChange={() => toggleCustomField(field.id, 'required')} />
                          </div>
                        )}
                        <button 
                          onClick={() => handleDeleteCustomField(field.id)}
                          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                   </div>
                 ))}

                 {/* Add New Field Section */}
                 {!isAddingField ? (
                   <button 
                     onClick={() => setIsAddingField(true)}
                     className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center font-medium text-sm mt-2"
                   >
                     <Plus className="w-4 h-4 mr-2" /> Create new information
                   </button>
                 ) : (
                   <div className="flex items-center gap-2 mt-2 p-3 bg-gray-50 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-top-2">
                      <Input 
                        placeholder="E.g. License Plate, T-Shirt Size..." 
                        value={newFieldLabel}
                        onChange={(e) => setNewFieldLabel(e.target.value)}
                        className="h-10 bg-white"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleAddCustomField()}
                      />
                      <Button size="sm" onClick={handleAddCustomField}>Add</Button>
                      <Button size="sm" variant="ghost" onClick={() => { setIsAddingField(false); setNewFieldLabel(''); }}>
                        <X className="w-4 h-4" />
                      </Button>
                   </div>
                 )}
              </div>
           </Card>

           <Card className="space-y-6">
              <h3 className="font-bold text-secondary text-lg">Additional Options</h3>
              <div className="space-y-4">
                 <OptionToggle 
                   label="Capture Photo" 
                   icon={Camera}
                   checked={workflow.options.capturePhoto} 
                   onChange={() => setWorkflow({...workflow, options: {...workflow.options, capturePhoto: !workflow.options.capturePhoto}})} 
                 />
                 <OptionToggle 
                   label="Print Badge" 
                   icon={Printer}
                   checked={workflow.options.printBadge} 
                   onChange={() => setWorkflow({...workflow, options: {...workflow.options, printBadge: !workflow.options.printBadge}})} 
                 />
                 <OptionToggle 
                   label="Require Signature (NDA)" 
                   icon={FileText}
                   checked={workflow.options.requireNda} 
                   onChange={() => setWorkflow({...workflow, options: {...workflow.options, requireNda: !workflow.options.requireNda}})} 
                 />
              </div>
           </Card>
        </div>

        {/* Right Column: Preview */}
        <div className="lg:col-span-5">
           <KioskPreview 
             buttons={allButtons.map(b => b.id === localBtn.id ? localBtn : b)} 
             highlightId={localBtn.id}
           />
        </div>
      </div>
    </div>
  );
};

// Helper Components for Editor
const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button 
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${checked ? 'bg-primary' : 'bg-gray-200'}`}
  >
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);

const FieldRow: React.FC<{ label: string; fieldKey: string; state: any; onChange: (s: any) => void }> = ({ label, fieldKey, state, onChange }) => {
  const field = state[fieldKey];
  const handleToggle = (prop: 'collect' | 'required') => {
    onChange({
      ...state,
      [fieldKey]: { ...field, [prop]: !field[prop] }
    });
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-white">
       <div className="flex items-center space-x-3">
          <div className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${field.collect ? 'bg-secondary border-secondary text-white' : 'border-gray-300 bg-white'}`} onClick={() => handleToggle('collect')}>
             {field.collect && <Check className="w-3 h-3" />}
          </div>
          <span className={`text-sm font-medium ${field.collect ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
       </div>
       {field.collect && (
         <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Required</span>
            <Toggle checked={field.required} onChange={() => handleToggle('required')} />
         </div>
       )}
    </div>
  );
};

const OptionToggle: React.FC<{ label: string; icon: any; checked: boolean; onChange: () => void }> = ({ label, icon: Icon, checked, onChange }) => (
  <div className="flex items-center justify-between">
     <div className="flex items-center">
        <div className={`p-2 rounded-lg mr-3 transition-colors ${checked ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
           <Icon className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
     </div>
     <Toggle checked={checked} onChange={onChange} />
  </div>
);
