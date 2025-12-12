
import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { 
  UserCheck, Package, Calendar, Clock, 
  ArrowRight, Truck, User 
} from 'lucide-react';

const todaysVisitors = [
  { id: '1', name: 'Sarah Connor', company: 'Skynet Systems', time: '09:15 AM', status: 'Checked In' },
  { id: '5', name: 'Tony Stark', company: 'Stark Ind', time: '11:20 AM', status: 'Checked In' },
];

const recentDeliveries = [
  { id: '1', courier: 'UPS', tracking: '1Z999...', arrived: '10:30 AM', status: 'Waiting' },
  { id: '8', courier: 'Amazon', tracking: 'TBA11...', arrived: 'Yesterday', status: 'Picked Up' },
];

export const StaffDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary">Welcome, Mr. Martin</h1>
        <p className="text-gray-500">Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center p-5 border-l-4 border-l-[#C8A45E]">
           <div className="p-3 bg-[#C8A45E]/10 rounded-xl mr-4 text-[#C8A45E]">
              <UserCheck className="w-6 h-6" />
           </div>
           <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Visitors Today</p>
              <h3 className="text-2xl font-bold text-secondary">2</h3>
           </div>
        </Card>
        
        <Card className="flex items-center p-5 border-l-4 border-l-blue-500">
           <div className="p-3 bg-blue-50 rounded-xl mr-4 text-blue-600">
              <Package className="w-6 h-6" />
           </div>
           <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pending Deliveries</p>
              <h3 className="text-2xl font-bold text-secondary">1</h3>
           </div>
        </Card>

        <Card className="flex items-center p-5 border-l-4 border-l-green-500">
           <div className="p-3 bg-green-50 rounded-xl mr-4 text-green-600">
              <Calendar className="w-6 h-6" />
           </div>
           <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pre-registered</p>
              <h3 className="text-2xl font-bold text-secondary">5</h3>
           </div>
        </Card>
      </div>

      {/* Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Next Arrivals */}
        <div className="space-y-4">
           <div className="flex items-center justify-between">
              <h3 className="font-bold text-secondary text-lg flex items-center">
                 <Clock className="w-5 h-5 mr-2 text-gray-400" /> Today's Visitors
              </h3>
              <Button variant="ghost" size="sm" rightIcon={ArrowRight} className="text-primary hover:text-primary-hover">View All</Button>
           </div>
           <Card className="p-0 overflow-hidden">
              <div className="divide-y divide-gray-100">
                 {todaysVisitors.map(v => (
                    <div key={v.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                       <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3 text-gray-500">
                             <User className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="font-bold text-sm text-secondary">{v.name}</p>
                             <p className="text-xs text-gray-500">{v.company}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-sm font-medium text-secondary">{v.time}</p>
                          <Badge status={v.status as any} className="mt-1" />
                       </div>
                    </div>
                 ))}
                 {todaysVisitors.length === 0 && (
                    <div className="p-8 text-center text-gray-400 text-sm">No visitors scheduled for today.</div>
                 )}
              </div>
           </Card>
        </div>

        {/* Latest Deliveries */}
        <div className="space-y-4">
           <div className="flex items-center justify-between">
              <h3 className="font-bold text-secondary text-lg flex items-center">
                 <Truck className="w-5 h-5 mr-2 text-gray-400" /> Recent Packages
              </h3>
              <Button variant="ghost" size="sm" rightIcon={ArrowRight} className="text-primary hover:text-primary-hover">View All</Button>
           </div>
           <Card className="p-0 overflow-hidden">
              <div className="divide-y divide-gray-100">
                 {recentDeliveries.map(d => (
                    <div key={d.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                       <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mr-3">
                             <Package className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="font-bold text-sm text-secondary">{d.courier}</p>
                             <p className="text-xs text-gray-500 font-mono">{d.tracking}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-xs text-gray-400 mb-1">{d.arrived}</p>
                          <Badge status={d.status as any} />
                       </div>
                    </div>
                 ))}
                 {recentDeliveries.length === 0 && (
                    <div className="p-8 text-center text-gray-400 text-sm">No recent deliveries.</div>
                 )}
              </div>
           </Card>
        </div>

      </div>
    </div>
  );
};
