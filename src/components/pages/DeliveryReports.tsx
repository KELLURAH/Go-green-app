import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { 
  Download, Printer, FileText, Calendar, 
  Package, Truck, Clock, AlertCircle, Filter,
  ChevronLeft, ChevronRight, Search, CheckCircle, User
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import type { Delivery } from '../../types';

// Mock Data for Charts
const timelineData = [
  { date: 'Oct 18', packages: 8 },
  { date: 'Oct 19', packages: 15 },
  { date: 'Oct 20', packages: 12 },
  { date: 'Oct 21', packages: 20 },
  { date: 'Oct 22', packages: 18 },
  { date: 'Oct 23', packages: 25 },
  { date: 'Oct 24', packages: 32 },
];

const courierData = [
  { name: 'UPS', value: 45 },
  { name: 'FedEx', value: 30 },
  { name: 'Amazon', value: 15 },
  { name: 'USPS', value: 10 },
];

const recipientData = [
  { name: 'Design Team', packages: 24 },
  { name: 'IT Dept', packages: 18 },
  { name: 'E. Addams', packages: 12 },
  { name: 'J. Fox', packages: 9 },
  { name: 'Facilities', packages: 7 },
];

const COLORS = ['#C8A45E', '#2E3340', '#4CAF50', '#2196F3', '#FFEB3B'];

// Mock Data for Table
const reportData = [
  { id: '1', recipient: 'Elizabeth Addams', courier: 'UPS', tracking: '1Z999...', arrival: 'Oct 24, 10:30 AM', pickup: '-', status: 'Waiting', loggedBy: 'Front Desk' },
  { id: '2', recipient: 'Johnny Fox', courier: 'FedEx', tracking: '7850...', arrival: 'Oct 24, 09:15 AM', pickup: 'Oct 24, 11:00 AM', status: 'Picked Up', loggedBy: 'Security' },
  { id: '3', recipient: 'IT Dept', courier: 'Amazon', tracking: 'TBA...', arrival: 'Oct 24, 11:45 AM', pickup: '-', status: 'Waiting', loggedBy: 'Front Desk' },
  { id: '4', recipient: 'Sarah Wilson', courier: 'USPS', tracking: '9400...', arrival: 'Oct 23, 02:00 PM', pickup: 'Oct 23, 04:30 PM', status: 'Picked Up', loggedBy: 'Front Desk' },
  { id: '5', recipient: 'Design Team', courier: 'DHL', tracking: '1234...', arrival: 'Oct 23, 01:15 PM', pickup: '-', status: 'Waiting', loggedBy: 'Security' },
  { id: '6', recipient: 'Reception', courier: 'FedEx', tracking: '5555...', arrival: 'Oct 23, 08:00 AM', pickup: 'Oct 23, 08:30 AM', status: 'Picked Up', loggedBy: 'Front Desk' },
  { id: '7', recipient: 'CEO Office', courier: 'UPS', tracking: '1Z888...', arrival: 'Oct 22, 02:30 PM', pickup: 'Oct 22, 05:00 PM', status: 'Picked Up', loggedBy: 'Security' },
  { id: '8', recipient: 'Facilities', courier: 'Amazon', tracking: 'TBA11...', arrival: 'Oct 22, 11:00 AM', pickup: '-', status: 'Waiting', loggedBy: 'Front Desk' },
];

interface DeliveryReportsProps {
  variant?: 'admin' | 'receptionist';
}

export const DeliveryReports: React.FC<DeliveryReportsProps> = ({ variant = 'admin' }) => {
  const [dateRange, setDateRange] = useState(variant === 'receptionist' ? 'Today' : 'Last 7 Days');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourier, setFilterCourier] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const itemsPerPage = 5;

  // Filter Logic
  const filteredData = reportData.filter(item => {
    const matchesSearch = item.recipient.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.tracking.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourier = filterCourier === 'All' || item.courier === filterCourier;
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    
    return matchesSearch && matchesCourier && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handleExport = () => {
    // Generate CSV content
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Recipient,Courier,Tracking,Arrival,Pickup,Status,LoggedBy\n"
        + reportData.map(row => `${row.recipient},${row.courier},${row.tracking},${row.arrival},${row.pickup},${row.status},${row.loggedBy}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `delivery_report_${new Date().toISOString().split('T')[0]}.csv`);
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
             {isReceptionist ? "Today's Delivery Report" : "Delivery Reports"}
          </h1>
          <p className="text-gray-500 text-sm">
             {isReceptionist ? "View and export delivery logs for today." : "Track package volume, courier performance, and pickup efficiency."}
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
               {['Today', 'Last 7 Days', 'Last 30 Days', 'Custom'].map(range => (
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
               <div className="p-3 bg-navy-100 rounded-xl mr-4 text-secondary bg-gray-100">
                  <Package className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Deliveries Today</p>
                  <h3 className="text-2xl font-bold text-secondary">32</h3>
               </div>
            </Card>
            <Card className="flex items-center p-5">
               <div className="p-3 bg-yellow-100 rounded-xl mr-4 text-yellow-700">
                  <Clock className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pending Pickups</p>
                  <h3 className="text-2xl font-bold text-secondary">24</h3>
               </div>
            </Card>
            <Card className="flex items-center p-5">
               <div className="p-3 bg-green-100 rounded-xl mr-4 text-green-700">
                  <CheckCircle className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Picked Up Today</p>
                  <h3 className="text-2xl font-bold text-secondary">8</h3>
               </div>
            </Card>
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Deliveries', value: '342', icon: Package, sub: '+8% vs last period', theme: 'navy' },
            { label: 'Pending Pickups', value: '24', icon: Clock, sub: '4 Overdue (>24h)', theme: 'gold' },
            { label: 'Picked Up', value: '318', icon: CheckCircle, sub: '93% Clearance Rate', theme: 'green' },
            { label: 'Top Courier', value: 'UPS', icon: Truck, sub: '45% of volume', theme: 'blue' },
          ].map((stat, i) => (
            <Card key={i} className="flex items-center p-5">
              <div className={`p-3 rounded-xl mr-4 ${
                stat.theme === 'navy' ? 'bg-gray-100 text-gray-700' :
                stat.theme === 'gold' ? 'bg-yellow-100 text-yellow-700' :
                stat.theme === 'green' ? 'bg-green-100 text-green-700' :
                'bg-blue-100 text-blue-700'
              }`}>
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
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
               <h3 className="font-bold text-secondary mb-6">Deliveries Over Time</h3>
               <div className="h-[250px]">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={timelineData}>
                     <defs>
                        <linearGradient id="colorPkg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2E3340" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#2E3340" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                     <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                     <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}/>
                     <Area type="monotone" dataKey="packages" stroke="#2E3340" strokeWidth={3} fill="url(#colorPkg)" />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
            </Card>

            <Card className="flex flex-col">
               <h3 className="font-bold text-secondary mb-4">Courier Split</h3>
               <div className="flex-1 min-h-[200px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={200}>
                     <PieChart>
                        <Pie
                          data={courierData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {courierData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{fontSize: '11px'}} />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
            </Card>
          </div>
          
          {/* Recipient Chart */}
          <Card>
             <h3 className="font-bold text-secondary mb-6">Top Recipients (Volume)</h3>
             <div className="h-[200px]">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={recipientData} layout="vertical" margin={{left: 20}}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E0E0E0" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={80} tick={{fill: '#4B5563', fontSize: 12}} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                    <Bar dataKey="packages" fill="#C8A45E" radius={[0, 4, 4, 0]} barSize={24} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </Card>
        </>
      )}

      {/* Detailed Data Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
           <h3 className="font-bold text-secondary">
             {isReceptionist ? "Today's Delivery Logs" : "Delivery Logs"}
           </h3>
           <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
             <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search recipient, tracking..." 
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
             {!isReceptionist && (
               <div className="flex gap-2">
                  <select 
                    className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-2 focus:ring-primary focus:border-primary outline-none"
                    value={filterCourier}
                    onChange={(e) => setFilterCourier(e.target.value)}
                  >
                     <option value="All">All Couriers</option>
                     <option value="UPS">UPS</option>
                     <option value="FedEx">FedEx</option>
                     <option value="Amazon">Amazon</option>
                     <option value="USPS">USPS</option>
                     <option value="DHL">DHL</option>
                  </select>
                  <select 
                    className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-2 focus:ring-primary focus:border-primary outline-none"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                     <option value="All">All Status</option>
                     <option value="Waiting">Waiting</option>
                     <option value="Picked Up">Picked Up</option>
                  </select>
               </div>
             )}
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-subtle text-gray-500">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase text-xs">Recipient</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs">Courier / Tracking</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs">Arrival</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs">Pickup</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs">Status</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs">Logged By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               {currentData.map(row => (
                 <tr key={row.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                       <div className="font-medium text-secondary">{row.recipient}</div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center">
                          <Truck className="w-3 h-3 mr-1.5 text-gray-400" />
                          <span className="font-medium mr-2">{row.courier}</span>
                       </div>
                       <div className="text-xs text-gray-400 font-mono">{row.tracking}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{row.arrival}</td>
                    <td className="px-6 py-4 text-gray-600">{row.pickup}</td>
                    <td className="px-6 py-4">
                       <Badge status={row.status as any} />
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center text-xs text-gray-500">
                          <User className="w-3 h-3 mr-1" />
                          {row.loggedBy}
                       </div>
                    </td>
                 </tr>
               ))}
               {filteredData.length === 0 && (
                 <tr>
                   <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                         <Package className="w-12 h-12 mb-3 opacity-20" />
                         <p className="font-medium">No deliveries found</p>
                         <p className="text-xs mt-1">Try adjusting your filters or search terms.</p>
                      </div>
                   </td>
                 </tr>
               )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {filteredData.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
            <div className="text-sm text-gray-500">
              Showing <span className="font-semibold text-secondary">{startIndex + 1}</span> to <span className="font-semibold text-secondary">{Math.min(startIndex + itemsPerPage, filteredData.length)}</span> of <span className="font-semibold text-secondary">{filteredData.length}</span> entries
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
        )}
      </Card>
    </div>
  );
};
