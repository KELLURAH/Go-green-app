
import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Search, Calendar, Filter } from 'lucide-react';
import { Input } from '../../ui/Input';

const myVisitors = [
  { id: '1', name: 'Sarah Connor', company: 'Skynet Systems', time: '09:15 AM', status: 'Checked In', date: 'Today' },
  { id: '5', name: 'Tony Stark', company: 'Stark Ind', time: '11:20 AM', status: 'Checked In', date: 'Today' },
  { id: '10', name: 'Peter Parker', company: 'Daily Bugle', time: '02:00 PM', status: 'Expected', date: 'Tomorrow' },
];

export const MyVisitors: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">My Visitors</h1>
          <p className="text-gray-500 text-sm">Guests scheduled to visit you.</p>
        </div>
        <Button leftIcon={Calendar}>View Calendar</Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex gap-4">
           <Input placeholder="Search visitors..." icon={Search} className="bg-white max-w-xs" />
           <Button variant="ghost" className="border border-gray-200" leftIcon={Filter}>Filter</Button>
        </div>
        
        <table className="w-full text-sm text-left">
          <thead className="bg-surface-subtle text-gray-500">
            <tr>
              <th className="px-6 py-4 font-semibold uppercase text-xs">Visitor</th>
              <th className="px-6 py-4 font-semibold uppercase text-xs">Company</th>
              <th className="px-6 py-4 font-semibold uppercase text-xs">Date & Time</th>
              <th className="px-6 py-4 font-semibold uppercase text-xs text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {myVisitors.map(v => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-secondary">{v.name}</td>
                <td className="px-6 py-4 text-gray-500">{v.company}</td>
                <td className="px-6 py-4 text-gray-600">
                   <div className="flex flex-col">
                      <span className="font-medium text-secondary">{v.time}</span>
                      <span className="text-xs text-gray-400">{v.date}</span>
                   </div>
                </td>
                <td className="px-6 py-4 text-right">
                   <Badge status={v.status as any} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
