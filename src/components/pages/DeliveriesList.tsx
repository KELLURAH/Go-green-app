import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Dropdown } from '../ui/Dropdown';
import { 
  Search, Download, Package, Truck, 
  ChevronLeft, ChevronRight, Eye, CheckCircle, 
  StickyNote, Trash2 
} from 'lucide-react';
import type { Delivery } from '../../types';

const initialDeliveries: Delivery[] = [
  { id: '1', recipient: 'Elizabeth Addams', courier: 'UPS', trackingNumber: '1Z9999999999999999', status: 'Waiting', arrivalDate: '10:30 AM', photoUrl: 'https://picsum.photos/id/1/200/200' },
  { id: '2', recipient: 'Johnny Fox', courier: 'FedEx', trackingNumber: '785000000000', status: 'Picked Up', arrivalDate: '09:15 AM', pickupDate: '11:00 AM' },
  { id: '3', recipient: 'IT Department', courier: 'Amazon', trackingNumber: 'TBA000000000000', status: 'Waiting', arrivalDate: '11:45 AM' },
  { id: '4', recipient: 'Sarah Wilson', courier: 'USPS', trackingNumber: '9400100000000000000000', status: 'Waiting', arrivalDate: '12:00 PM' },
  { id: '5', recipient: 'Design Team', courier: 'DHL', trackingNumber: '1234567890', status: 'Waiting', arrivalDate: '01:15 PM' },
  { id: '6', recipient: 'Reception', courier: 'FedEx', trackingNumber: '555544443333', status: 'Picked Up', arrivalDate: '08:00 AM' },
  { id: '7', recipient: 'CEO Office', courier: 'UPS', trackingNumber: '1Z8888888888888888', status: 'Waiting', arrivalDate: '02:30 PM' },
];

interface DeliveriesListProps {
  onNavigate?: (tab: string) => void;
  initialFilter?: string;
  title?: string;
}

export const DeliveriesList: React.FC<DeliveriesListProps> = ({ 
  onNavigate,
  initialFilter = 'All',
  title = 'Deliveries'
}) => {
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);
  const [activeTab, setActiveTab] = useState(initialFilter);
  
  useEffect(() => {
    setActiveTab(initialFilter);
  }, [initialFilter]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Filter Logic
  const filteredDeliveries = deliveries.filter(d => {
    if (activeTab === 'All') return true;
    return d.status === activeTab;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDeliveries = filteredDeliveries.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  // Action Handlers
  const handleViewDetails = (id: string) => {
    if (onNavigate) onNavigate('delivery-details');
  };

  const handleMarkPickedUp = (id: string) => {
    setDeliveries(prev => prev.map(d => 
      d.id === id ? { ...d, status: 'Picked Up', pickupDate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : d
    ));
  };

  const handleAddNote = (id: string) => {
    alert(`Add Note modal would open for Delivery ID: ${id}`);
  };

  const handleDownloadPhoto = (id: string) => {
    alert(`Downloading photo for Delivery ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this delivery?")) {
      setDeliveries(prev => prev.filter(d => d.id !== id));
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-secondary">{title}</h1>
           <p className="text-gray-500 text-sm">Track incoming packages and manage pickups.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" leftIcon={Download}>Export</Button>
          <Button leftIcon={Package}>Log New Package</Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        {/* Toolbar */}
         <div className="p-5 border-b border-gray-100 bg-surface-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-80">
            <Input placeholder="Search recipient or tracking..." icon={Search} className="bg-white" />
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl">
             {['All', 'Waiting', 'Picked Up'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-white shadow-sm text-secondary' : 'text-gray-500'}`}
                >
                  {tab}
                </button>
             ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full">
            <thead className="bg-white border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-left">Package Info</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-left">Recipient</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-left">Arrival</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-left">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentDeliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                       <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 mr-3">
                          {delivery.photoUrl ? (
                             <img src={delivery.photoUrl} className="w-full h-full object-cover rounded-lg" alt="pkg" />
                          ) : <Package className="w-5 h-5" />}
                       </div>
                       <div>
                          <div className="text-sm font-bold text-secondary">{delivery.courier}</div>
                          <div className="text-xs text-gray-500 font-mono">{delivery.trackingNumber.substring(0, 12)}...</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-sm font-medium text-gray-700">{delivery.recipient}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                     {delivery.arrivalDate}
                  </td>
                  <td className="px-6 py-4">
                    <Badge status={delivery.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                     <Dropdown 
                       items={[
                         { label: 'View Details', icon: Eye, onClick: () => handleViewDetails(delivery.id) },
                         { label: 'Mark as Picked Up', icon: CheckCircle, onClick: () => handleMarkPickedUp(delivery.id) },
                         { label: 'Add Note', icon: StickyNote, onClick: () => handleAddNote(delivery.id) },
                         { label: 'Download Photo', icon: Download, onClick: () => handleDownloadPhoto(delivery.id) },
                         { label: 'Delete Delivery', icon: Trash2, onClick: () => handleDelete(delivery.id), className: 'text-red-600 hover:text-red-700 hover:bg-red-50' },
                       ]}
                     />
                  </td>
                </tr>
              ))}
              {currentDeliveries.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    No deliveries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredDeliveries.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
            <div className="text-sm text-gray-500">
              Showing <span className="font-semibold text-secondary">{startIndex + 1}</span> to <span className="font-semibold text-secondary">{Math.min(endIndex, filteredDeliveries.length)}</span> of <span className="font-semibold text-secondary">{filteredDeliveries.length}</span> entries
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
