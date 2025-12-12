import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import type { CheckInButtonConfig } from '../../../types';
import { KioskPreview } from './components/KioskPreview';
import { AddButtonModal } from './components/AddButtonModal';
import { EditWorkflow } from './EditWorkflow';
import { 
  User, Truck, Calendar, Package, Briefcase, Coffee, Info,
  GripVertical, Plus, Trash2, Edit, ChevronRight
} from 'lucide-react';

const initialButtons: CheckInButtonConfig[] = [
  { id: '1', label: 'Visit Employee', icon: 'User', type: 'Visit Employee', isEnabled: true },
  { id: '2', label: 'Food Delivery', icon: 'Coffee', type: 'Delivery', isEnabled: true },
  { id: '3', label: 'Event Check-In', icon: 'Calendar', type: 'Event', isEnabled: false },
  { id: '4', label: 'Package Delivery', icon: 'Package', type: 'Delivery', isEnabled: true },
];

export const CheckInOptions: React.FC = () => {
  const [buttons, setButtons] = useState<CheckInButtonConfig[]>(initialButtons);
  const [activeTab, setActiveTab] = useState('options');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const IconMap: Record<string, React.ElementType> = {
    User, Truck, Calendar, Package, Briefcase, Coffee, Info
  };

  const handleToggle = (id: string) => {
    setButtons(prev => prev.map(b => b.id === id ? { ...b, isEnabled: !b.isEnabled } : b));
  };

  const handleUpdateLabel = (id: string, label: string) => {
    setButtons(prev => prev.map(b => b.id === id ? { ...b, label } : b));
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this button option?')) {
      setButtons(prev => prev.filter(b => b.id !== id));
    }
  };

  // If in Edit Mode, render the detailed editor
  if (editingId) {
    const btn = buttons.find(b => b.id === editingId);
    if (!btn) return null; // Should not happen
    return (
      <EditWorkflow 
        button={btn} 
        allButtons={buttons}
        onBack={() => setEditingId(null)} 
      />
    );
  }

  // Main List View
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Kiosk Check-In Options</h1>
          <p className="text-gray-500 text-sm">Select which check-in buttons appear on the kiosk and configure each workflow.</p>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
           {['Check-In Options', 'Location', 'Visual Styles', 'Deleted Options'].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab === 'Check-In Options' ? 'options' : tab)}
               className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                 (tab === 'Check-In Options' && activeTab === 'options') 
                 ? 'border-primary text-secondary' 
                 : 'border-transparent text-gray-500 hover:text-secondary'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Button List */}
        <div className="lg:col-span-7 space-y-6">
           <div className="flex items-center justify-between">
              <div>
                 <h3 className="font-bold text-secondary text-lg">Select Check-In Buttons</h3>
                 <p className="text-xs text-gray-500 mt-1">Drag to reorder. Toggle to hide/show on kiosk.</p>
              </div>
              <div className="flex space-x-2">
                 <Button variant="ghost" size="sm" className="text-gray-500">View Deleted</Button>
                 <Button size="sm" leftIcon={Plus} onClick={() => setIsAddModalOpen(true)}>Add Button</Button>
              </div>
           </div>

           <div className="space-y-3">
              {buttons.map((btn) => {
                const Icon = IconMap[btn.icon] || Info;
                return (
                  <Card key={btn.id} className="p-4 flex items-center gap-4 group hover:border-gray-300 transition-colors">
                     {/* Drag Handle */}
                     <div className="text-gray-300 cursor-grab hover:text-gray-500">
                        <GripVertical className="w-5 h-5" />
                     </div>

                     {/* Icon */}
                     <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-secondary shrink-0">
                        <Icon className="w-5 h-5" />
                     </div>

                     {/* Content */}
                     <div className="flex-1 min-w-0">
                        <input 
                          type="text" 
                          value={btn.label}
                          onChange={(e) => handleUpdateLabel(btn.id, e.target.value)}
                          className="font-bold text-secondary bg-transparent border-none focus:ring-0 p-0 w-full hover:bg-gray-50 rounded px-1 transition-colors"
                        />
                        <div className="flex items-center mt-1 space-x-3">
                           <button 
                             onClick={() => setEditingId(btn.id)}
                             className="text-xs font-medium text-primary hover:text-primary-hover flex items-center"
                           >
                             Edit Options <ChevronRight className="w-3 h-3 ml-0.5" />
                           </button>
                           <span className="text-gray-300">|</span>
                           <span className={`text-xs ${btn.isEnabled ? 'text-green-600' : 'text-gray-400'}`}>
                              {btn.isEnabled ? 'Display' : 'Hidden'}
                           </span>
                        </div>
                     </div>

                     {/* Actions */}
                     <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center">
                           <button 
                              onClick={() => handleToggle(btn.id)}
                              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${btn.isEnabled ? 'bg-green-500' : 'bg-gray-200'}`}
                           >
                              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm ${btn.isEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                           </button>
                        </div>
                        <button 
                          onClick={() => handleDelete(btn.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                           <Trash2 className="w-4 h-4" />
                        </button>
                     </div>
                  </Card>
                )
              })}
           </div>
        </div>

        {/* Right Col: Preview */}
        <div className="lg:col-span-5">
           <KioskPreview buttons={buttons} />
        </div>
      </div>

      <AddButtonModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(newBtn) => setButtons([...buttons, newBtn])}
      />
    </div>
  );
};