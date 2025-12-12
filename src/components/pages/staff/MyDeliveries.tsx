
import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Package, Truck, CheckCircle } from 'lucide-react';

const myDeliveries = [
  { id: '1', courier: 'UPS', tracking: '1Z999...', arrived: '10:30 AM', status: 'Waiting' },
  { id: '8', courier: 'Amazon', tracking: 'TBA11...', arrived: 'Yesterday', status: 'Picked Up' },
];

export const MyDeliveries: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-secondary">My Deliveries</h1>
        <p className="text-gray-500 text-sm">Packages waiting for you at reception.</p>
      </div>

      <div className="grid gap-4">
        {myDeliveries.map(d => (
          <Card key={d.id} className="flex flex-col sm:flex-row items-center justify-between p-6">
             <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                   <Package className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="font-bold text-secondary text-lg">{d.courier} Package</h3>
                   <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Truck className="w-3 h-3 mr-1" />
                      <span className="font-mono mr-3">{d.tracking}</span>
                      <span className="text-gray-300">|</span>
                      <span className="ml-3">Arrived: {d.arrived}</span>
                   </div>
                </div>
             </div>
             
             <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                <Badge status={d.status as any} />
                {d.status === 'Waiting' && (
                  <Button size="sm" variant="outline" leftIcon={CheckCircle}>Mark Picked Up</Button>
                )}
             </div>
          </Card>
        ))}
        {myDeliveries.length === 0 && (
           <div className="text-center py-12 text-gray-400">
              No deliveries found.
           </div>
        )}
      </div>
    </div>
  );
};
