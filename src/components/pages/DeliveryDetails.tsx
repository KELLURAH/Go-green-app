import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowLeft, Check, Package, Clock, User, Bell } from 'lucide-react';

export const DeliveryDetails: React.FC = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
       <div className="flex items-center justify-between">
         <Button variant="ghost" leftIcon={ArrowLeft}>Back to List</Button>
         <Button>Mark as Picked Up</Button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Package Info */}
          <div className="space-y-6">
             <Card>
                <div className="flex items-start justify-between mb-6">
                   <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                         <Package className="w-8 h-8" />
                      </div>
                      <div>
                         <h1 className="text-xl font-bold text-secondary">UPS Package</h1>
                         <p className="text-sm text-gray-500 font-mono mt-1">1Z9999999999999999</p>
                      </div>
                   </div>
                   <Badge status="Waiting" />
                </div>
                
                <div className="space-y-4 border-t border-gray-100 pt-4">
                   <div>
                      <label className="text-xs font-bold text-gray-400 uppercase">Recipient</label>
                      <div className="flex items-center mt-2">
                         <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xs font-bold mr-3">EA</div>
                         <div>
                            <p className="font-semibold text-secondary">Elizabeth Addams</p>
                            <p className="text-xs text-gray-500">Design Dept</p>
                         </div>
                      </div>
                   </div>
                   <div>
                      <label className="text-xs font-bold text-gray-400 uppercase">Notes</label>
                      <p className="text-sm text-gray-600 mt-1">Left at front desk. Box is slightly damaged on corner.</p>
                   </div>
                </div>
             </Card>
             
             <Card className="p-0 overflow-hidden">
                <img src="https://picsum.photos/id/1/600/300" className="w-full h-48 object-cover" alt="package" />
             </Card>
          </div>

          {/* Timeline */}
          <Card>
             <h3 className="font-bold text-secondary mb-6">Tracking History</h3>
             <div className="relative pl-4 border-l-2 border-gray-100 space-y-8">
                <div className="relative">
                   <div className="absolute -left-[21px] top-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white ring-1 ring-gray-100"></div>
                   <h4 className="text-sm font-bold text-secondary">Logged at Reception</h4>
                   <p className="text-xs text-gray-500 mt-1">Oct 24, 10:30 AM • By Front Desk</p>
                </div>
                <div className="relative">
                   <div className="absolute -left-[21px] top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white ring-1 ring-gray-100"></div>
                   <h4 className="text-sm font-bold text-secondary">Notification Sent</h4>
                   <p className="text-xs text-gray-500 mt-1">Oct 24, 10:31 AM • Slack & Email</p>
                   <div className="flex items-center mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded inline-flex">
                      <Bell className="w-3 h-3 mr-1" /> Notified
                   </div>
                </div>
                <div className="relative opacity-50">
                   <div className="absolute -left-[21px] top-0 w-4 h-4 bg-gray-300 rounded-full border-2 border-white ring-1 ring-gray-100"></div>
                   <h4 className="text-sm font-bold text-gray-600">Picked Up</h4>
                   <p className="text-xs text-gray-500 mt-1">Pending...</p>
                </div>
             </div>
          </Card>
       </div>
    </div>
  );
};