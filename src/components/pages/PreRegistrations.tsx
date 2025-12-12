import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Dropdown } from '../ui/Dropdown';
import { 
  Search, Filter, Plus, QrCode, Mail, Copy, 
  Calendar, User, Building, Trash2, Edit2, Download, Eye,
  ChevronLeft, ChevronRight, CheckCircle, RefreshCw
} from 'lucide-react';
import type { PreRegistration } from '../../types';

const initialData: PreRegistration[] = [
  {
    id: '1',
    visitorName: 'Michael Corleone',
    company: 'Genco Olive Oil',
    email: 'michael@genco.com',
    host: 'Elizabeth Addams',
    visitDate: '2023-10-26',
    visitTime: '14:00',
    purpose: 'Vendor Meeting',
    status: 'Upcoming',
    qrCodeUrl: 'mock-qr-1',
    emailSent: true
  },
  {
    id: '2',
    visitorName: 'Tony Montana',
    company: 'Montana Corp',
    email: 'tony@worldisyours.com',
    host: 'Johnny Fox',
    visitDate: '2023-10-25',
    visitTime: '10:00',
    purpose: 'Partnership',
    status: 'Checked In',
    qrCodeUrl: 'mock-qr-2',
    emailSent: true
  },
  {
    id: '3',
    visitorName: 'Walter White',
    company: 'Gray Matter',
    email: 'walter@chemistry.com',
    host: 'Doc Brown',
    visitDate: '2023-10-20',
    visitTime: '09:00',
    purpose: 'Consultation',
    status: 'Expired',
    qrCodeUrl: 'mock-qr-3',
    emailSent: false
  }
];

export const PreRegistrations: React.FC = () => {
  const [data, setData] = useState<PreRegistration[]>(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Upcoming' | 'Used' | 'Expired'>('All');
  
  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PreRegistration | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    visitorName: '',
    company: '',
    email: '',
    phone: '',
    host: '',
    visitDate: '',
    visitTime: '',
    purpose: '',
    autoSendEmail: true
  });

  const resetForm = () => {
    setFormData({
      visitorName: '',
      company: '',
      email: '',
      phone: '',
      host: '',
      visitDate: new Date().toISOString().split('T')[0],
      visitTime: '09:00',
      purpose: '',
      autoSendEmail: true
    });
    setIsEditMode(false);
    setSelectedRecord(null);
  };

  const handleCreate = () => {
    const newRecord: PreRegistration = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: 'Upcoming',
      qrCodeUrl: `qr-${Math.random()}`,
      emailSent: formData.autoSendEmail
    };

    if (isEditMode && selectedRecord) {
      setData(prev => prev.map(item => item.id === selectedRecord.id ? { ...newRecord, id: item.id, status: item.status } : item));
    } else {
      setData([newRecord, ...data]);
    }
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleEdit = (record: PreRegistration) => {
    setFormData({
      visitorName: record.visitorName,
      company: record.company,
      email: record.email,
      phone: record.phone || '',
      host: record.host,
      visitDate: record.visitDate,
      visitTime: record.visitTime,
      purpose: record.purpose,
      autoSendEmail: record.emailSent
    });
    setSelectedRecord(record);
    setIsEditMode(true);
    setIsCreateModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this pre-registration?')) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleViewDetails = (record: PreRegistration) => {
    setSelectedRecord(record);
    setIsDetailModalOpen(true);
  };

  const handleResendEmail = (id: string) => {
    alert(`Invitation email resent to visitor.`);
  };

  const handleDownloadQR = (id: string) => {
    alert(`Downloading QR Code for ID: ${id}`);
  };

  // Filter Logic
  const filteredData = data.filter(item => {
    const matchesSearch = item.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' ? true : 
                          activeFilter === 'Used' ? item.status === 'Checked In' :
                          item.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Pre-Registrations</h1>
          <p className="text-gray-500 text-sm">Manage upcoming visits and send invitations.</p>
        </div>
        <Button leftIcon={Plus} onClick={() => { resetForm(); setIsCreateModalOpen(true); }}>
          Create Pre-Registration
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 bg-surface-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-96 flex gap-2">
            <Input 
              placeholder="Search by visitor or company..." 
              icon={Search} 
              className="bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto max-w-full">
            {['All', 'Upcoming', 'Used', 'Expired'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as any)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeFilter === filter 
                    ? 'bg-white shadow-sm text-secondary' 
                    : 'text-gray-500 hover:bg-gray-200/50'
                }`}
              >
                {filter}
              </button>
            ))}
            <button className="flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-primary transition-colors whitespace-nowrap">
              <Filter className="w-3.5 h-3.5 mr-2" /> Host
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left">
            <thead className="bg-white border-b border-gray-100 text-gray-500">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Visitor</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Host</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Visit Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">QR</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-bold text-secondary text-sm">{item.visitorName}</div>
                      <div className="text-xs text-gray-500">{item.company}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.host}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-secondary">{item.visitDate}</div>
                    <div className="text-xs text-gray-500">{item.visitTime}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge status={item.status} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <QrCode className="w-5 h-5 text-gray-400 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Dropdown 
                      items={[
                        { label: 'View Details', icon: Eye, onClick: () => handleViewDetails(item) },
                        { label: 'Resend Invitation', icon: Mail, onClick: () => handleResendEmail(item.id) },
                        { label: 'Download QR Code', icon: QrCode, onClick: () => handleDownloadQR(item.id) },
                        { label: 'Edit', icon: Edit2, onClick: () => handleEdit(item) },
                        { label: 'Delete', icon: Trash2, onClick: () => handleDelete(item.id), className: 'text-red-600 hover:bg-red-50' },
                      ]} 
                    />
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No records found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title={isEditMode ? "Edit Pre-Registration" : "Create Pre-Registration"}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} leftIcon={Mail}>
              {isEditMode ? "Save Changes" : "Create Invitation"}
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          {/* Visitor Info */}
          <div>
            <h4 className="text-sm font-bold text-secondary mb-3 flex items-center">
              <User className="w-4 h-4 mr-2 text-primary" /> Visitor Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Full Name" 
                placeholder="e.g. John Wick" 
                value={formData.visitorName}
                onChange={(e) => setFormData({...formData, visitorName: e.target.value})}
              />
              <Input 
                label="Company" 
                placeholder="e.g. Continental"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
              <Input 
                label="Email" 
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <Input 
                label="Phone (Optional)" 
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Visit Details */}
          <div>
            <h4 className="text-sm font-bold text-secondary mb-3 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-primary" /> Visit Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Host</label>
                <select 
                  className="w-full bg-surface-subtle border border-gray-200 text-secondary rounded-xl py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={formData.host}
                  onChange={(e) => setFormData({...formData, host: e.target.value})}
                >
                  <option value="">Select Host...</option>
                  <option value="Elizabeth Addams">Elizabeth Addams</option>
                  <option value="Johnny Fox">Johnny Fox</option>
                  <option value="Doc Brown">Doc Brown</option>
                </select>
              </div>
              <div className="w-full">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Purpose</label>
                <select 
                  className="w-full bg-surface-subtle border border-gray-200 text-secondary rounded-xl py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={formData.purpose}
                  onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                >
                  <option value="">Select Purpose...</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Interview">Interview</option>
                  <option value="Vendor">Vendor</option>
                </select>
              </div>
              <Input 
                type="date"
                label="Visit Date"
                value={formData.visitDate}
                onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
              />
              <Input 
                type="time"
                label="Visit Time"
                value={formData.visitTime}
                onChange={(e) => setFormData({...formData, visitTime: e.target.value})}
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Options */}
          <div className="bg-gray-50 p-4 rounded-xl space-y-3">
             <div className="flex items-center justify-between">
                <div className="flex items-center">
                   <input 
                     type="checkbox" 
                     id="autoEmail"
                     className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                     checked={formData.autoSendEmail}
                     onChange={(e) => setFormData({...formData, autoSendEmail: e.target.checked})}
                   />
                   <label htmlFor="autoEmail" className="ml-2 text-sm font-medium text-gray-700">Auto-send email invitation</label>
                </div>
                <Badge status="Info" className="bg-blue-50 text-blue-600">Default</Badge>
             </div>
             <div className="flex items-center justify-between opacity-70">
                <div className="flex items-center">
                   <input type="checkbox" checked disabled className="h-4 w-4 text-gray-400 border-gray-300 rounded" />
                   <label className="ml-2 text-sm font-medium text-gray-500">Auto-generate QR Code</label>
                </div>
                <span className="text-xs text-green-600 font-bold uppercase">Always On</span>
             </div>
          </div>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Invitation Details"
        footer={
           <Button onClick={() => setIsDetailModalOpen(false)}>Close</Button>
        }
      >
        {selectedRecord && (
          <div className="flex flex-col items-center text-center p-4">
             <div className="bg-white p-4 rounded-2xl border-2 border-gray-100 shadow-sm mb-6">
                {/* Mock QR */}
                <div className="w-48 h-48 bg-gray-900 flex items-center justify-center text-white">
                   <QrCode className="w-24 h-24 opacity-20" />
                   <span className="absolute text-xs text-gray-400 mt-16 font-mono tracking-widest">QR MOCK</span>
                </div>
             </div>
             
             <h2 className="text-2xl font-bold text-secondary">{selectedRecord.visitorName}</h2>
             <p className="text-gray-500 mb-6">{selectedRecord.company}</p>

             <div className="grid grid-cols-2 gap-4 w-full text-left bg-surface-subtle p-6 rounded-xl mb-6">
                <div>
                   <p className="text-xs font-bold text-gray-400 uppercase">Host</p>
                   <p className="font-semibold text-secondary">{selectedRecord.host}</p>
                </div>
                <div>
                   <p className="text-xs font-bold text-gray-400 uppercase">Status</p>
                   <Badge status={selectedRecord.status} className="mt-1" />
                </div>
                <div>
                   <p className="text-xs font-bold text-gray-400 uppercase">Date</p>
                   <p className="font-semibold text-secondary">{selectedRecord.visitDate} @ {selectedRecord.visitTime}</p>
                </div>
                <div>
                   <p className="text-xs font-bold text-gray-400 uppercase">Invitation</p>
                   <p className={`text-sm font-medium flex items-center ${selectedRecord.emailSent ? 'text-green-600' : 'text-orange-500'}`}>
                      {selectedRecord.emailSent ? <CheckCircle className="w-3 h-3 mr-1"/> : <RefreshCw className="w-3 h-3 mr-1"/>}
                      {selectedRecord.emailSent ? 'Sent' : 'Not Sent'}
                   </p>
                </div>
             </div>

             <div className="w-full space-y-3">
                <Button variant="outline" className="w-full justify-center" leftIcon={Copy} onClick={() => alert('Link copied!')}>
                  Copy QR Code Link
                </Button>
                <div className="text-xs text-gray-400">
                   Notes: {selectedRecord.purpose}
                </div>
             </div>
          </div>
        )}
      </Modal>
    </div>
  );
};