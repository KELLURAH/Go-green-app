import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Users, Package, UserCheck, UserPlus, FileText, ArrowRight, Clock, MapPin } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar
} from 'recharts';
import { Badge } from '../ui/Badge';

// Mock Data
const visitorFlowData = [
  { time: '8am', visitors: 12 },
  { time: '9am', visitors: 45 },
  { time: '10am', visitors: 38 },
  { time: '11am', visitors: 55 },
  { time: '12pm', visitors: 30 },
  { time: '1pm', visitors: 48 },
  { time: '2pm', visitors: 62 },
  { time: '3pm', visitors: 40 },
  { time: '4pm', visitors: 25 },
  { time: '5pm', visitors: 10 },
];

const deliveryTrendData = [
  { day: 'Mon', packages: 15 },
  { day: 'Tue', packages: 22 },
  { day: 'Wed', packages: 18 },
  { day: 'Thu', packages: 25 },
  { day: 'Fri', packages: 30 },
  { day: 'Sat', packages: 5 },
  { day: 'Sun', packages: 2 },
];

const latestVisitors = [
  { id: 1, name: 'Sarah Connor', host: 'E. Addams', time: '09:15 AM', status: 'Checked In' },
  { id: 2, name: 'James Cameron', host: 'J. Fox', time: '10:00 AM', status: 'Checked In' },
  { id: 3, name: 'Marty McFly', host: 'Doc Brown', time: '08:30 AM', status: 'Checked Out' },
  { id: 4, name: 'Tony Stark', host: 'P. Potts', time: '11:20 AM', status: 'Checked In' },
  { id: 5, name: 'Bruce Wayne', host: 'A. Pennyworth', time: '11:45 AM', status: 'Expected' },
];

const latestDeliveries = [
  { id: 1, courier: 'UPS', recipient: 'Design Team', time: '10:30 AM' },
  { id: 2, courier: 'FedEx', recipient: 'Johnny Fox', time: '11:15 AM' },
  { id: 3, courier: 'Amazon', recipient: 'Reception', time: '11:45 AM' },
  { id: 4, courier: 'USPS', recipient: 'Legal Dept', time: '12:00 PM' },
  { id: 5, courier: 'DHL', recipient: 'IT Support', time: '12:30 PM' },
];

interface DashboardProps {
  onAddVisitor?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onAddVisitor }) => {
  return (
    <div className="space-y-6">
      {/* Quick Actions Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Dashboard</h1>
          <p className="text-gray-500">Overview of today's activity</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button leftIcon={UserPlus} className="shadow-lg shadow-primary/20" onClick={onAddVisitor}>Add Visitor</Button>
          <Button variant="secondary" leftIcon={Package} className="shadow-lg shadow-secondary/20">Log Delivery</Button>
          <Button variant="outline">View Full List</Button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Visitors Today', value: '42', icon: Users, theme: 'gold', change: '+12%' },
          { title: 'Currently In Building', value: '18', icon: UserCheck, theme: 'green', change: 'Peak: 24' },
          { title: 'Waiting Pickups', value: '7', icon: Package, theme: 'blue', change: '3 urgent' },
          { title: 'Total Staff', value: '145', icon: FileText, theme: 'navy', change: 'Active' },
        ].map((stat, i) => (
          <Card key={i} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-secondary mb-1">{stat.value}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  stat.theme === 'green' ? 'bg-green-100 text-green-700' : 
                  stat.theme === 'blue' ? 'bg-blue-100 text-blue-700' :
                  stat.theme === 'navy' ? 'bg-gray-100 text-gray-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className={`p-3 rounded-2xl ${
                stat.theme === 'green' ? 'bg-green-50 text-green-600' :
                stat.theme === 'blue' ? 'bg-blue-50 text-blue-600' :
                stat.theme === 'navy' ? 'bg-gray-100 text-gray-600' :
                'bg-primary/10 text-primary'
              }`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-secondary flex items-center">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              Visitor Flow (Hourly)
            </h3>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorFlowData}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8A45E" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#C8A45E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{ stroke: '#C8A45E', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#C8A45E" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-6">
             <h3 className="font-bold text-secondary flex items-center">
              <Package className="w-4 h-4 mr-2 text-blue-500" />
              Deliveries Trend
            </h3>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0"/>
                <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#9CA3AF'}} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}/>
                <Bar dataKey="packages" fill="#2E3340" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Visitors */}
        <Card className="p-0 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
             <h3 className="font-bold text-secondary">Latest Visitors</h3>
             <Button variant="ghost" size="sm" className="text-primary h-8">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-subtle text-gray-500">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase">Name</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase">Host</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase">Time</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {latestVisitors.map(v => (
                  <tr key={v.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-medium text-secondary">{v.name}</td>
                    <td className="px-5 py-3 text-gray-500">{v.host}</td>
                    <td className="px-5 py-3 text-gray-500">{v.time}</td>
                    <td className="px-5 py-3 text-right">
                      <Badge status={v.status as any} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Latest Deliveries */}
        <Card className="p-0 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
             <h3 className="font-bold text-secondary">Latest Deliveries</h3>
             <Button variant="ghost" size="sm" className="text-primary h-8">Log Package</Button>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm">
              <thead className="bg-surface-subtle text-gray-500">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase">Courier</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase">Recipient</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {latestDeliveries.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-medium text-secondary flex items-center">
                       {d.courier}
                    </td>
                    <td className="px-5 py-3 text-gray-500">{d.recipient}</td>
                    <td className="px-5 py-3 text-right text-gray-500">{d.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};