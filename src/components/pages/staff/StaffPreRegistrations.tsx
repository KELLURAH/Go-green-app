
import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { UserPlus, Mail, Calendar } from 'lucide-react';

export const StaffPreRegistrations: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Invite Guests</h1>
        <p className="text-gray-500 text-sm">Send a pre-registration link to your visitors.</p>
      </div>

      <Card className="max-w-2xl">
         <div className="space-y-4">
            <h3 className="font-bold text-lg text-secondary border-b border-gray-100 pb-2">New Invitation</h3>
            <div className="grid grid-cols-2 gap-4">
               <Input label="Guest Name" placeholder="e.g. John Doe" />
               <Input label="Company" placeholder="e.g. Acme Inc" />
            </div>
            <Input label="Email Address" placeholder="john@example.com" type="email" icon={Mail} />
            
            <div className="grid grid-cols-2 gap-4">
               <Input label="Visit Date" type="date" />
               <Input label="Visit Time" type="time" />
            </div>
            
            <div className="pt-4">
               <Button className="w-full" leftIcon={UserPlus}>Send Invitation</Button>
            </div>
         </div>
      </Card>
    </div>
  );
};
