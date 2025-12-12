
import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Dropdown } from '../ui/Dropdown';
import { 
  Search, Filter, Download, UserPlus, Calendar,
  LogOut, Mail, Building, User, Eye, Edit2, FileDown, Trash2,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import type { Visitor } from '../../types';

const initialVisitors: Visitor[] = [
  { 
    id: '1', 
    name: 'Sarah Connor', 
    company: 'Skynet Systems', 
    email: 'sarah@skynet.com',
    host: 'Elizabeth Addams', 
    purpose: 'Vendor Meeting', 
    checkInTime: '09:15 AM', 
    status: 'Checked In', 
    avatar: 'https://picsum.photos/id/48/100/100',
    badgeNumber: 'V-1024',
    date: 'Oct 24, 2023'
  },
  { 
    id: '2', 
    name: 'James Cameron', 
    company: 'Lightstorm Ent.', 
    email: 'james@lightstorm.com',
    host: 'Johnny Fox', 
    purpose: 'Interview', 
    checkInTime: '10:00 AM', 
    status: 'Checked In', 
    avatar: 'https://picsum.photos/id/55/100/100',
    badgeNumber: 'V-1025',
    date: 'Oct 24, 2023'
  },
  { 
    id: '3', 
    name: 'Ellen Ripley', 
    company: 'Weyland-Yutani', 
    email: 'ripley@weyland.com',
    host: 'Maria Garcia', 
    purpose: 'Site Inspection', 
    checkInTime: '-', 
    status: 'Expected', 
    avatar: 'https://picsum.photos/id/32/100/100',
    badgeNumber: '-',
    date: 'Oct 24, 2023'
  },
  { 
    id: '4', 
    name: 'Marty McFly', 
    company: 'DeLorean Motors', 
    email: 'marty@future.com',
    host: 'Doc Brown', 
    purpose: 'Delivery', 
    checkInTime: '08:30 AM', 
    checkOutTime: '09:45 AM',
    status: 'Checked Out', 
    avatar: 'https://picsum.photos/id/77/100/100',
    badgeNumber: 'V-1022',
    date: 'Oct 24, 2023'
  },
  { 
    id: '5', 
    name: 'Tony Stark', 
    company: 'Stark Ind', 
    email: 'tony@stark.com',
    host: 'Pepper Potts', 
    purpose: 'Meeting', 
    checkInTime: '11:20 AM', 
    status: 'Checked In', 
    avatar: 'https://picsum.photos/id/88/100/100',
    badgeNumber: 'V-1030',
    date: 'Oct 24, 2023'
  },
  { 
    id: '6', 
    name: 'Bruce Wayne', 
    company: 'Wayne Ent', 
    email: 'bruce@wayne.com',
    host: 'Alfred P.', 
    purpose: 'Inspection', 
    checkInTime: '-', 
    status: 'Expected', 
    avatar: 'https://picsum.photos/id/99/100/100',
    badgeNumber: 'V-1031',
    date: 'Oct 24, 2023'
  },
];

interface VisitorManagementProps {
  onNavigate?: (tab: string) => void;
  shouldOpenModal?: boolean;
  onModalOpenHandled?: () => void;
  initialFilter?: 'All' | 'On-site' | 'Expected' | 'History';
  title?: string;
}

export const VisitorManagement: React.FC<VisitorManagementProps> = ({ 
  onNavigate, 
  shouldOpenModal, 
  onModalOpenHandled,
  initialFilter = 'All',
  title = 'Visitor Log'
}) => {
  const [visitors, setVisitors] = useState<Visitor[]>(initialVisitors);
  const [activeTab, setActiveTab] = useState<'All' | 'On-site' | 'Expected' | 'History'>(initialFilter);
  const [selectedVisitors, setSelectedVisitors] = useState<Set<string>>(new Set());
  
  // Update active tab if prop changes
  useEffect(() => {
    setActiveTab(initialFilter);
  }, [initialFilter]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [isAddVisitorOpen, setIsAddVisitorOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [visitorToDelete, setVisitorToDelete] = useState<Visitor | null>(null);

  const [newVisitor, setNewVisitor] = useState({
    name: '',
    company: '',
    email: '',
    host: '',
    purpose: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00'
  });

  const resetForm = () => {
    setNewVisitor({
      name: '',
      company: '',
      email: '',
      host: '',
      purpose: '',
      date: new Date().toISOString().split('T')[0],
      time: '09:00'
    });
  };

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Handle external modal trigger
  useEffect(() => {
    if (shouldOpenModal) {
      resetForm();
      setIsEditMode(false);
      setIsAddVisitorOpen(true);
      if (onModalOpenHandled) {
        onModalOpenHandled();
      }
    }
  }, [shouldOpenModal, onModalOpenHandled]);

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedVisitors(new Set(currentVisitors.map(v => v.id)));
    } else {
      setSelectedVisitors(new Set());
    }
  };

  const toggleVisitor = (id: string) => {
    const newSelected = new Set(selectedVisitors);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedVisitors(newSelected);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewVisitor(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveVisitor = () => {
    if (isEditMode && editingId) {
      // Edit existing
      setVisitors(prev => prev.map(v => v.id === editingId ? {
        ...v,
        name: newVisitor.name,
        company: newVisitor.company,
        email: newVisitor.email,
        host: newVisitor.host,
        purpose: newVisitor.purpose,
        date: newVisitor.date
      } : v));
    } else {
      // Add new
      const visitor: Visitor = {
        id: Math.random().toString(36).substr(2, 9),
        name: newVisitor.name || 'New Visitor',
        company: newVisitor.company || 'Unknown',
        email: newVisitor.email,
        host: newVisitor.host || 'Reception',
        purpose: newVisitor.purpose || 'Visit',
        checkInTime: '-',
        status: 'Expected',
        avatar: `https://ui-avatars.com/api/?name=${newVisitor.name || 'Visitor'}&background=random`,
        date: newVisitor.date
      };
      setVisitors([visitor, ...visitors]);
    }
    
    setIsAddVisitorOpen(false);
    resetForm();
    setIsEditMode(false);
    setEditingId(null);
  };

  // --- Row Actions ---

  const handleViewDetails = () => {
    if (onNavigate) onNavigate('visitor-details');
  };

  const handleCheckOut = (id: string) => {
    setVisitors(prev => prev.map(v => {
      if (v.id === id) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return { ...v, status: 'Checked Out', checkOutTime: timeString };
      }
      return v;
    }));
  };

  const handleEdit = (visitor: Visitor) => {
    setNewVisitor({
      name: visitor.name,
      company: visitor.company,
      email: visitor.email,
      host: visitor.host,
      purpose: visitor.purpose,
      date: visitor.date,
      time: visitor.checkInTime === '-' ? '' : visitor.checkInTime // simplified
    });
    setEditingId(visitor.id);
    setIsEditMode(true);
    setIsAddVisitorOpen(true);
  };

  const handleExport = (id: string) => {
    // Mock download
    alert(`Downloading visit record for Visitor ID: ${id}`);
  };

  const handleDeleteClick = (visitor: Visitor) => {
    setVisitorToDelete(visitor);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (visitorToDelete) {
      setVisitors(prev => prev.filter(v => v.id !== visitorToDelete.id));
      setVisitorToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  // Filter visitors
  const filteredVisitors = visitors.filter(v => {
    if (activeTab === 'All') return true;
    if (activeTab === 'On-site') return v.status === 'Checked In';
    if (activeTab === 'Expected') return v.status === 'Expected';
    if (activeTab === 'History') return v.status === 'Checked Out';
    return true;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredVisitors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVisitors = filteredVisitors.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-secondary">{title}</h1>
           <p className="text-gray-500 text-sm">Monitor guest access, print badges, and manage invitations.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" leftIcon={Download}>Export CSV</Button>
          <Button 
            leftIcon={UserPlus} 
            onClick={() => {
              resetForm();
              setIsEditMode(false);
              setIsAddVisitorOpen(true);
            }}
          >
            Pre-register Guest
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <Card className="p-0 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 bg-surface-subtle flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
             <div className="w-full sm:w-72">
               <Input placeholder="Search name, company, phone..." icon={Search} className="bg-white" />
             </div>
             {/* Visual Filters */}
             <div className="flex space-x-2">
                <button className="flex items-center px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:border-primary transition-colors">
                  <Calendar className="w-3.5 h-3.5 mr-2 text-gray-400" /> Date Range
                </button>
                <button className="flex items-center px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:border-primary transition-colors">
                  <Filter className="w-3.5 h-3.5 mr-2 text-gray-400" /> Host
                </button>
             </div>
          </div>
          
          <div className="flex bg-gray-100 p-1 rounded-xl w-full xl:w-auto overflow-x-auto">
            {['All', 'On-site', 'Expected', 'History'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`
                  px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                  ${activeTab === tab 
                    ? 'bg-white text-secondary shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Action Bar (when selected) */}
        {selectedVisitors.size > 0 && (
           <div className="bg-primary/10 px-6 py-2.5 flex items-center justify-between border-b border-primary/20 animate-in fade-in slide-in-from-top-1">
            <span className="text-sm font-semibold text-primary">{selectedVisitors.size} visitors selected</span>
            <div className="flex space-x-3">
              <Button size="sm" variant="secondary" className="h-8 text-xs">
                <LogOut className="w-3 h-3 mr-1.5"/> Checkout Selected
              </Button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full">
            <thead className="bg-white border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 w-12">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                    onChange={toggleSelectAll}
                    checked={selectedVisitors.size === currentVisitors.length && currentVisitors.length > 0}
                  />
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-left">Visitor Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-left">Host & Purpose</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-left">Check-in / Out</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-left">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentVisitors.map((visitor) => (
                <tr key={visitor.id} className={`group hover:bg-gray-50 transition-colors ${selectedVisitors.has(visitor.id) ? 'bg-primary/5' : ''}`}>
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      checked={selectedVisitors.has(visitor.id)}
                      onChange={() => toggleVisitor(visitor.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="relative">
                        <img className="h-10 w-10 rounded-full object-cover border border-gray-100" src={visitor.avatar} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-secondary">{visitor.name}</div>
                        <div className="text-xs text-gray-500">{visitor.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                       <img src={`https://ui-avatars.com/api/?name=${visitor.host}&background=random&size=24`} className="w-5 h-5 rounded-full mr-2" alt={visitor.host} />
                       <span className="text-sm font-medium text-gray-700">{visitor.host}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1 pl-7">{visitor.purpose}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                       <span className="text-sm font-medium text-gray-900">{visitor.checkInTime}</span>
                       <span className="text-xs text-gray-400">
                         {visitor.checkOutTime ? `Out: ${visitor.checkOutTime}` : visitor.status === 'Expected' ? 'Pending' : 'Duration: 1h 20m'}
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge status={visitor.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Dropdown 
                      items={[
                        { label: 'View Details', icon: Eye, onClick: handleViewDetails },
                        { label: 'Manual Check-Out', icon: LogOut, onClick: () => handleCheckOut(visitor.id) },
                        { label: 'Edit Visitor', icon: Edit2, onClick: () => handleEdit(visitor) },
                        { label: 'Export Visit Record', icon: FileDown, onClick: () => handleExport(visitor.id) },
                        { label: 'Delete Visit', icon: Trash2, onClick: () => handleDeleteClick(visitor), className: 'text-red-600 hover:text-red-700 hover:bg-red-50' },
                      ]} 
                    />
                  </td>
                </tr>
              ))}
              {currentVisitors.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No visitors found matching filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredVisitors.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
            <div className="text-sm text-gray-500">
              Showing <span className="font-semibold text-secondary">{startIndex + 1}</span> to <span className="font-semibold text-secondary">{Math.min(endIndex, filteredVisitors.length)}</span> of <span className="font-semibold text-secondary">{filteredVisitors.length}</span> entries
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

      {/* Add / Edit Visitor Modal */}
      <Modal
        isOpen={isAddVisitorOpen}
        onClose={() => setIsAddVisitorOpen(false)}
        title={isEditMode ? "Edit Visitor Details" : "Pre-register Visitor"}
        footer={
          <>
             <Button variant="ghost" onClick={() => setIsAddVisitorOpen(false)}>Cancel</Button>
             <Button onClick={handleSaveVisitor}>{isEditMode ? "Save Changes" : "Register Visitor"}</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input 
            name="name" 
            value={newVisitor.name} 
            onChange={handleInputChange} 
            label="Full Name" 
            placeholder="e.g. John Doe" 
            icon={User}
          />
          <Input 
            name="company" 
            value={newVisitor.company} 
            onChange={handleInputChange} 
            label="Company" 
            placeholder="e.g. Acme Corp" 
            icon={Building}
          />
          <Input 
            name="email" 
            value={newVisitor.email} 
            onChange={handleInputChange} 
            label="Email Address" 
            type="email" 
            placeholder="john@example.com" 
            icon={Mail}
          />
          
          <div className="w-full">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Host</label>
            <select 
              name="host"
              value={newVisitor.host}
              onChange={handleInputChange}
              className="w-full bg-surface-subtle border border-gray-200 text-secondary rounded-xl py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            >
               <option value="">Select a host...</option>
               <option value="Elizabeth Addams">Elizabeth Addams</option>
               <option value="Johnny Fox">Johnny Fox</option>
               <option value="Maria Garcia">Maria Garcia</option>
               <option value="Doc Brown">Doc Brown</option>
            </select>
          </div>
          
          <div className="w-full">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Purpose</label>
            <select 
              name="purpose"
              value={newVisitor.purpose}
              onChange={handleInputChange}
              className="w-full bg-surface-subtle border border-gray-200 text-secondary rounded-xl py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            >
               <option value="">Select purpose...</option>
               <option value="Meeting">Meeting</option>
               <option value="Interview">Interview</option>
               <option value="Vendor">Vendor</option>
               <option value="Delivery">Delivery</option>
               <option value="Site Inspection">Site Inspection</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <Input 
               name="date" 
               value={newVisitor.date} 
               onChange={handleInputChange} 
               label="Expected Date" 
               type="date" 
             />
             <Input 
               name="time" 
               value={newVisitor.time} 
               onChange={handleInputChange} 
               label="Expected Time" 
               type="time" 
             />
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Delete Record</Button>
          </>
        }
      >
        <div className="py-2">
           <p className="text-gray-600">
             Are you sure you want to permanently delete the visit record for <span className="font-bold text-secondary">{visitorToDelete?.name}</span>? 
             This action cannot be undone.
           </p>
        </div>
      </Modal>
    </div>
  );
};
