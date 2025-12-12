import React, { useState } from 'react';
import { Modal } from '../../../ui/Modal';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';
import type { CheckInButtonConfig } from '../../../../types';
import { 
  User, Truck, Calendar, Package, Briefcase, Coffee, Info 
} from 'lucide-react';

interface AddButtonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (btn: CheckInButtonConfig) => void;
}

export const AddButtonModal: React.FC<AddButtonModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [label, setLabel] = useState('');
  const [type, setType] = useState<any>('Visit Employee');
  const [icon, setIcon] = useState<any>('User');

  const IconMap: Record<string, React.ElementType> = {
    User, Truck, Calendar, Package, Briefcase, Coffee, Info
  };

  const handleSave = () => {
    const newBtn: CheckInButtonConfig = {
      id: Math.random().toString(36).substr(2, 9),
      label,
      type,
      icon,
      isEnabled: true
    };
    onAdd(newBtn);
    setLabel('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Check-In Button"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={!label}>Create Button</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input 
          label="Button Name" 
          placeholder="e.g. Contractor Access" 
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          autoFocus
        />

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Button Type</label>
          <select 
            className="w-full bg-surface-subtle border border-gray-200 text-secondary rounded-xl py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Visit Employee">Visit Employee</option>
            <option value="Delivery">Delivery</option>
            <option value="Event">Event</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Select Icon</label>
          <div className="grid grid-cols-7 gap-2">
            {Object.keys(IconMap).map((key) => {
                const Ico = IconMap[key];
                const isSelected = icon === key;
                return (
                  <button 
                    key={key}
                    onClick={() => setIcon(key)}
                    className={`aspect-square rounded-xl border flex items-center justify-center transition-all ${isSelected ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/20' : 'border-gray-200 hover:border-gray-300 text-gray-500'}`}
                  >
                      <Ico className="w-5 h-5" />
                  </button>
                )
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};