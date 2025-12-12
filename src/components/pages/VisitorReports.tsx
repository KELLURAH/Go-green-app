
import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { 
  Download, Printer, FileText, Calendar, 
  Users, Building, Clock, Activity, Filter,
  ChevronLeft, ChevronRight, Search
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Mock Data for Charts
const timelineData = [
  { date: 'Oct 18', visitors: 12 },
  { date: 'Oct 19', visitors: 18 },
  { date: 'Oct 20', visitors: 15 },
  { date: 'Oct 21', visitors: 25 },
  { date: 'Oct 22', visitors: 22 },
  { date: 'Oct 23', visitors: 30 },
  { date: 'Oct 24', visitors: 42 },
];

const hostData = [
  { name: 'E. Addams', visitors: 15 },
  { name: 'J. Fox', visitors: 12 },
  { name: 'M. Garcia', visitors: 8 },
  { name: 'D. Brown', visitors: 6 },
  { name: 'P. Potts', visitors: 5 },
];

const typeData = [
  { name: 'Vendor', value: 35 },
  { name: 'Guest', value: 25 },
  { name: 'Interview', value: 20 },
  { name: 'Contractor', value: 15 },
  { name: 'VIP', value: 5 },
];

const COLORS = ['#C8A45E', '#2E3340', '#4CAF50', '#2196F3', '#FFEB3B'];

// Mock Data for Table
const reportData = [
  { id: '1', name: 'Sarah Connor', company: 'Skynet', host: 'E. Addams', type: 'Vendor', checkIn: '09:15 AM', checkOut: '11:30 AM', duration: '2h 15m', status: 'Checked Out' },
  { id: '2', name: 'James Cameron', company: 'Lightstorm', host: 'J. Fox', type: 'Guest', checkIn: '10:00 AM', checkOut: '-', duration: 'Active', status: 'Checked In' },
  { id: '3', name: 'Ellen Ripley', company: 'Weyland-Yutani', host: 'M. Garcia', type: 'Contractor', checkIn: '08:45 AM', checkOut: '05:00 PM', duration: '8h 15m', status: 'Checked Out' },
  { id: '4', name: 'Marty McFly', company: 'DeLorean Inc', host: 'D. Brown', type: 'Vendor', checkIn: '01:30 PM', checkOut: '02:15 PM', duration: '45m', status: 'Checked Out' },
  { id: '5', name: 'Tony Stark', company: 'Stark Ind', host: 'P. Potts', type: 'VIP', checkIn: '11:00 AM', checkOut: '-', duration: 'Active', status: 'Checked In' },
  { id: '6', name: 'Bruce Wayne', company: 'Wayne Ent', host: 'A. Pennyworth', type: 'Interview', checkIn: '02:00 PM', checkOut: '04:00 PM', duration: '2h 00m', status: 'Checked Out' },
  { id: '7', name: 'Clark Kent', company: 'Daily Planet', host: 'L. Lane', type: 'Guest', checkIn: '09:00 AM', checkOut: '10:00 AM', duration: '1h 00m', status: 'Checked Out' },
  { id: '8', name: 'Diana Prince', company: 'Themyscira', host: 'S. Trevor', type: 'VIP', checkIn: '10:30 AM', checkOut: '12:00 PM', duration: '1h 30m', status: 'Checked Out' },
];

interface VisitorReportsProps {
  variant?: 'admin' | 'receptionist';
}

export const VisitorReports: React.FC<VisitorReportsProps> = ({ variant = 'admin' }) => {
  const [dateRange, setDateRange] = useState(variant === 'receptionist' ? 'Today' : 'Last 7 Days');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination Logic
  const totalPages = Math.ceil(reportData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = reportData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handleExport = () => {
    // Generate CSV content
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Name,Company,Host,Type,CheckIn,CheckOut,Status\n"
        + reportData.map(row => `${row.name},${row.company},${row.host},${row.type},${row.checkIn},${row.checkOut},${row.status}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `visitor_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isReceptionist = variant === 'receptionist';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header & Export Options */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">
            {isReceptionist ? "Today's Visitor Report" : "Visitor Reports"}
          </h1>
          <p className="text-gray-500 text-sm">
            {isReceptionist ? "View and export visitor logs for today." : "Analyze visitor traffic, host activity, and compliance."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {!isReceptionist && (
            <Button variant="ghost" size="sm" className="bg-white border border-gray-200">
              <Printer className="w-4 h-4" />
            </Button>
          )}
          {!isReceptionist && (
            <Button variant="secondary" size="sm" leftIcon={FileText}>
              Export PDF
            </Button>
          )}
          <Button size="sm" leftIcon={Download} onClick={handleExport}>
            Export {isReceptionist ? "Today's Logs" : "CSV"}
          </Button>
        </div>
      </div>

      {/* Date Filters - Admin Only */}
      {!isReceptionist && (
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
               {['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'Custom'].map(range => (
                 <button
                   key={range}
                   onClick={() => setDateRange(range)}
                   className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                     dateRange === range 
                       ? 'bg-secondary text-white' 
                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                   }`}
                 >
                   {range}
                 </button>
               ))}
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
               <div className="relative flex-1 md:w-40">
                  <input type="date" className="w-full text-xs p-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-1 focus:ring-primary outline-none" />
               </div>
               <span className="text-gray-400 text-xs">to</span>
               <div className="relative flex-1 md:w-40">
                  <input type="date" className="w-full text-xs p-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-1 focus:ring-primary outline-none" />
               </div>
            </div>
          </div>
        </Card>
      )}

      {/* KPI Cards */}
      {isReceptionist ? (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="flex items-center p-5">
               <div className="p-3 bg-primary/10 rounded-xl mr-4 text-primary">
                  <Users className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Visitors Today</p>
                  <h3 className="text-2xl font-bold text-secondary">42</h3>
               </div>
            </Card>
            <Card className="flex items-center p-5">
               <div className="p-3 bg-green-50 rounded-xl mr-4 text-green-600">
                  <Clock className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Checked In Now</p>
                  <h3 className="text-2xl font-bold text-secondary">18</h3>
               </div>
            </Card>
            <Card className="flex items-center p-5">
               <div className="p-3 bg-blue-50 rounded-xl mr-4 text-blue-600">
                  <Activity className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Expected Arrivals</p>
                  <h3 className="text-2xl font-bold text-secondary">6</h3>
               </div>
            </Card>
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Visitors', value: '1,248', icon: Users, sub: '+12% vs last period' },
            { label: 'Unique Companies', value: '86', icon: Building, sub: 'Top: Skynet' },
            { label: 'Avg. Duration', value: '1h 45m', icon: Clock, sub: '-5m vs last period' },
            { label: 'Peak Hour', value: '10:00 AM', icon: Activity, sub: '42 Check-ins' },
          ].map((stat, i) => (
            <Card key={i} className="flex items-center p-5">
              <div className="p-3 bg-primary/10 rounded-xl mr-4 text-primary">
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                 <h3 className="text-2xl font-bold text-secondary">{stat.value}</h3>
                 <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Charts - Admin Only */}
      {!isReceptionist && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
             <h3 className="font-bold text-secondary mb-6">Visitors Over Time</h3>
             <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={timelineData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                   <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                   <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}/>
                   <Line type="monotone" dataKey="visitors" stroke="#C8A45E" strokeWidth={3} dot={{r: 4, fill: '#C8A45E'}} activeDot={{r: 6}} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
          </Card>

          <div className="grid grid-cols-1 gap-6">
             <Card className="flex flex-col">
               <h3 className="font-bold text-secondary mb-4">Visitor Types</h3>
               <div className="flex-1 min-h-[200px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={200}>
                     <PieChart>
                        <Pie
                          data={typeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {typeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
             </Card>
             
             <Card className="flex flex-col">
                <h3 className="font-bold text-secondary mb-4">Top Hosts</h3>
                <div className="flex-1 min-h-[200px]">
                   <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={hostData} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={80} tick={{fill: '#4B5563', fontSize: 11}} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                        <Bar dataKey="visitors" fill="#2E3340" radius={[0, 4, 4, 0]} barSize={20} />
                      </BarChart>
                   </ResponsiveContainer>
                </div>
             </Card>
          </div>
        </div>
      )}

      {/* Detailed Data Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
           <h3 className="font-bold text-secondary">{isReceptionist ? "Today's Visit Logs" : "Visit Logs"}</h3>
           <div className="flex gap-2 w-full sm:w-auto">
             <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search logs..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
             </div>
             {!isReceptionist && (
               <Button variant="ghost" className="border border-gray-200 px-3"><Filter className="w-4 h-4" /></Button>
             )}
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-subtle text-gray-500">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase text-xs">Visitor</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs">Host</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs">Type</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs">In / Out</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs">Duration</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               {currentData.map(row => (
                 <tr key={row.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                       <div className="font-medium text-secondary">{row.name}</div>
                       <div className="text-xs text-gray-500">{row.company}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{row.host}</td>
                    <td className="px-6 py-4">
                       <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                         {row.type}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="text-gray-900">{row.checkIn}</div>
                       <div className="text-xs text-gray-400">{row.checkOut}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-mono text-xs">{row.duration}</td>
                    <td className="px-6 py-4">
                       <Badge status={row.status as any} />
                    </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
            <div className="text-sm text-gray-500">
              Showing <span className="font-semibold text-secondary">{startIndex + 1}</span> to <span className="font-semibold text-secondary">{Math.min(startIndex + itemsPerPage, reportData.length)}</span> of <span className="font-semibold text-secondary">{reportData.length}</span> entries
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
                className="h-9 w-9 p-0 flex items-center justify-center rounded-lg"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium text-gray-600 px-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
                className="h-9 w-9 p-0 flex items-center justify-center rounded-lg"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
      </Card>
    </div>
  );
};
