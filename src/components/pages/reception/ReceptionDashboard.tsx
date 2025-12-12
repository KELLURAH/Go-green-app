import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { 
  Users, UserCheck, Package, Monitor, UserPlus, 
  Clock, ArrowRight, MoreVertical, LogOut, Eye,
  AlertCircle, CheckCircle, Truck, Bell, Activity
} from 'lucide-react';
import type { ReceptionDashboardProps } from './types';

const stats = {
  visitorsToday: 42,
  inBuilding: 18,
  pendingDeliveries: 7,
  kioskStatus: 'Online'
};

const inBuildingVisitors = [
  { id: '1', name: 'Sarah Connor', company: 'Skynet Systems', host: 'E. Addams', time: '09:15 AM', status: 'Checked In' },
  { id: '2', name: 'James Cameron', company: 'Lightstorm Ent.', host: 'J. Fox', time: '10:00 AM', status: 'Checked In' },
  { id: '5', name: 'Tony Stark', company: 'Stark Ind', host: 'P. Potts', time: '11:20 AM', status: 'Checked In' },
];

const todaysVisitors = [
  { id: '1', name: 'Sarah Connor', host: 'E. Addams', time: '09:15 AM', out: '-', status: 'Checked In' },
  { id: '4', name: 'Marty McFly', host: 'Doc Brown', time: '08:30 AM', out: '09:45 AM', status: 'Checked Out' },
  { id: '2', name: 'James Cameron', host: 'J. Fox', time: '10:00 AM', out: '-', status: 'Checked In' },
  { id: '5', name: 'Tony Stark', host: 'P. Potts', time: '11:20 AM', out: '-', status: 'Checked In' },
  { id: '3', name: 'Ellen Ripley', host: 'M. Garcia', time: '-', out: '-', status: 'Expected' },
];

const pendingDeliveries = [
  { id: '1', recipient: 'Elizabeth Addams', courier: 'UPS', time: '10:30 AM' },
  { id: '3', recipient: 'IT Department', courier: 'Amazon', time: '11:45 AM' },
  { id: '4', recipient: 'Sarah Wilson', courier: 'USPS', time: '12:00 PM' },
];

const alerts = [
  { id: 1, message: 'Visitor John Doe has been waiting 15 min', type: 'warning', time: '5m ago' },
  { id: 2, message: 'Kiosk "Rear Entrance" offline', type: 'error', time: '10m ago' },
  { id: 3, message: '3 new deliveries logged', type: 'info', time: '1h ago' },
];

export const ReceptionDashboard: React.FC<ReceptionDashboardProps> = ({ 
  onAddVisitor, 
  onLogDelivery,
  onViewKiosk,
  onViewAllVisitors,
  onViewAllDeliveries
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary">Dashboard</h1>
        <p className="text-gray-500">Live operational overview for today.</p>
      </div>

      {/* 2. Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex flex-col justify-between p-5 border-l-4 border-l-blue-500">
           <div className="flex justify-between items-start">
              <div>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Visitors Today</p>
                 <h3 className="text-3xl font-bold text-secondary mt-1">{stats.visitorsToday}</h3>
              </div>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                 <Users className="w-5 h-5" />
              </div>
           </div>
           <p className="text-xs text-gray-400 mt-4">Arrived so far</p>
        </Card>

        <Card className="flex flex-col justify-between p-5 border-l-4 border-l-green-500">
           <div className="flex justify-between items-start">
              <div>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">In Building Now</p>
                 <h3 className="text-3xl font-bold text-secondary mt-1">{stats.inBuilding}</h3>
              </div>
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                 <UserCheck className="w-5 h-5" />
              </div>
           </div>
           <p className="text-xs text-gray-400 mt-4">Still on-site</p>
        </Card>

        <Card className="flex flex-col justify-between p-5 border-l-4 border-l-yellow-500">
           <div className="flex justify-between items-start">
              <div>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Deliveries</p>
                 <h3 className="text-3xl font-bold text-secondary mt-1">{stats.pendingDeliveries}</h3>
              </div>
              <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
                 <Package className="w-5 h-5" />
              </div>
           </div>
           <p className="text-xs text-gray-400 mt-4">Awaiting pickup</p>
        </Card>

        <Card className="flex flex-col justify-between p-5 border-l-4 border-l-purple-500 relative overflow-hidden group">
           <div className="flex justify-between items-start relative z-10">
              <div>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kiosk Status</p>
                 <div className="flex items-center mt-1">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    <h3 className="text-xl font-bold text-secondary">{stats.kioskStatus}</h3>
                 </div>
              </div>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                 <Monitor className="w-5 h-5" />
              </div>
           </div>
           <button 
             onClick={onViewKiosk}
             className="text-xs text-primary font-bold mt-4 hover:underline text-left relative z-10"
           >
             View details →
           </button>
           <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Monitor className="w-24 h-24" />
           </div>
        </Card>
      </div>

      {/* 3. Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button 
          onClick={onAddVisitor} 
          size="lg" 
          className="shadow-lg shadow-primary/20 px-8 py-4 h-auto text-lg"
          leftIcon={UserPlus}
        >
           Add Visitor
        </Button>
        <Button 
          onClick={onLogDelivery}
          size="lg" 
          className="shadow-lg shadow-secondary/20 px-8 py-4 h-auto text-lg bg-secondary hover:bg-secondary-hover text-white"
          leftIcon={Package}
        >
           Log Delivery
        </Button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 width) */}
        <div className="xl:col-span-2 space-y-6">
           
           {/* Visitors In Building Now */}
           <Card className="p-0 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                 <h3 className="font-bold text-secondary flex items-center">
                    <UserCheck className="w-5 h-5 mr-2 text-green-600" />
                    Visitors In Building Now
                 </h3>
                 <Badge status="Active" className="bg-green-100 text-green-800">Live</Badge>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                    <thead className="bg-surface-subtle text-gray-500">
                       <tr>
                          <th className="px-6 py-3 font-semibold uppercase text-xs">Visitor</th>
                          <th className="px-6 py-3 font-semibold uppercase text-xs">Host</th>
                          <th className="px-6 py-3 font-semibold uppercase text-xs">Check-in</th>
                          <th className="px-6 py-3 font-semibold uppercase text-xs text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {inBuildingVisitors.map(v => (
                          <tr key={v.id} className="hover:bg-gray-50">
                             <td className="px-6 py-4">
                                <div className="font-bold text-secondary">{v.name}</div>
                                <div className="text-xs text-gray-500">{v.company}</div>
                             </td>
                             <td className="px-6 py-4 text-gray-600">{v.host}</td>
                             <td className="px-6 py-4">
                                <span className="font-mono text-secondary font-medium">{v.time}</span>
                             </td>
                             <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                   <button className="text-xs font-semibold text-secondary hover:text-primary border border-gray-200 rounded px-2 py-1 transition-colors">
                                      Check Out
                                   </button>
                                   <button className="p-1 text-gray-400 hover:text-secondary">
                                      <Eye className="w-4 h-4" />
                                   </button>
                                </div>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </Card>

           {/* Today's Visitors */}
           <Card className="p-0 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                 <h3 className="font-bold text-secondary flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-400" />
                    Today's Visitors
                 </h3>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                    <thead className="bg-surface-subtle text-gray-500">
                       <tr>
                          <th className="px-6 py-3 font-semibold uppercase text-xs">Name</th>
                          <th className="px-6 py-3 font-semibold uppercase text-xs">Host</th>
                          <th className="px-6 py-3 font-semibold uppercase text-xs">In</th>
                          <th className="px-6 py-3 font-semibold uppercase text-xs">Out</th>
                          <th className="px-6 py-3 font-semibold uppercase text-xs text-right">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {todaysVisitors.map(v => (
                          <tr key={v.id} className="hover:bg-gray-50">
                             <td className="px-6 py-4 font-medium text-secondary">{v.name}</td>
                             <td className="px-6 py-4 text-gray-600">{v.host}</td>
                             <td className="px-6 py-4 text-gray-500 font-mono text-xs">{v.time}</td>
                             <td className="px-6 py-4 text-gray-500 font-mono text-xs">{v.out}</td>
                             <td className="px-6 py-4 text-right">
                                <Badge status={v.status as any} />
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <div className="p-3 border-t border-gray-100 bg-gray-50 text-center">
                 <button onClick={onViewAllVisitors} className="text-sm font-bold text-primary hover:text-primary-hover flex items-center justify-center w-full">
                    View All Visitors <ArrowRight className="w-4 h-4 ml-1" />
                 </button>
              </div>
           </Card>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
           
           {/* Pending Deliveries */}
           <Card className="p-0 overflow-hidden border-t-4 border-t-yellow-500">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                 <h3 className="font-bold text-secondary flex items-center">
                    <Package className="w-5 h-5 mr-2 text-yellow-600" />
                    Pending Deliveries
                 </h3>
                 <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {stats.pendingDeliveries}
                 </span>
              </div>
              <div className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto">
                 {pendingDeliveries.map(d => (
                    <div key={d.id} className="p-4 hover:bg-gray-50 transition-colors group">
                       <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-secondary text-sm">{d.recipient}</span>
                          <span className="text-xs font-mono text-gray-400">{d.time}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <div className="flex items-center text-xs text-gray-500">
                             <Truck className="w-3 h-3 mr-1" /> {d.courier}
                          </div>
                          <button className="text-xs text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                             Mark Picked Up
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
              <div className="p-3 border-t border-gray-100 bg-gray-50 text-center">
                 <button onClick={onViewAllDeliveries} className="text-sm font-bold text-secondary hover:text-black flex items-center justify-center w-full">
                    View All Deliveries <ArrowRight className="w-4 h-4 ml-1" />
                 </button>
              </div>
           </Card>

           {/* Kiosk Activity Preview */}
           <Card className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                 <h3 className="font-bold text-secondary flex items-center">
                    <Monitor className="w-5 h-5 mr-2 text-purple-500" />
                    Lobby Kiosk
                 </h3>
                 <Badge status="Active" className="bg-green-100 text-green-700">Online</Badge>
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Activity</span>
                    <span className="font-medium text-secondary">2 min ago</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Battery</span>
                    <span className="font-medium text-green-600">98%</span>
                 </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" onClick={onViewKiosk}>
                 Open Kiosk Monitoring
              </Button>
           </Card>

           {/* Alerts Panel */}
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-secondary flex items-center mb-4">
                 <Bell className="w-4 h-4 mr-2 text-gray-400" />
                 Alerts & Notifications
              </h3>
              <div className="space-y-3">
                 {alerts.map(alert => (
                    <div key={alert.id} className="flex items-start p-3 bg-gray-50 rounded-xl border border-gray-100">
                       <div className={`mt-0.5 mr-3 shrink-0 ${
                          alert.type === 'error' ? 'text-red-500' :
                          alert.type === 'warning' ? 'text-orange-500' : 'text-blue-500'
                       }`}>
                          {alert.type === 'error' ? <AlertCircle className="w-4 h-4" /> :
                           alert.type === 'warning' ? <Clock className="w-4 h-4" /> :
                           <Activity className="w-4 h-4" />}
                       </div>
                       <div>
                          <p className="text-xs font-medium text-secondary leading-snug">{alert.message}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{alert.time}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};
