
import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { EditStaff } from './EditStaff';
import { Search, Filter, Download, MoreHorizontal, ChevronLeft, ChevronRight, ArrowUpDown, Trash2, Edit2 } from 'lucide-react';
import type { User } from '../../types';

const mockUsers: User[] = [
  { id: '1', name: 'Mr. Martin', role: 'Admin', status: 'Active', email: 'martin@pbd.com', avatar: 'https://ui-avatars.com/api/?name=Mr+Martin&background=0D8ABC&color=fff', lastActive: '10:45 AM' },
  { id: '2', name: 'Johnny Fox', role: 'Editor', status: 'Pending', email: 'johnny.fox@pbd.com', avatar: 'https://picsum.photos/id/91/100/100', lastActive: 'Yesterday' },
  { id: '3', name: 'Alice Turner', role: 'Viewer', status: 'Inactive', email: 'alice.t@pbd.com', avatar: 'https://picsum.photos/id/129/100/100', lastActive: '3 days ago' },
  { id: '4', name: 'Maria Garcia', role: 'Developer', status: 'Active', email: 'm.garcia@pbd.com', avatar: 'https://picsum.photos/id/237/100/100', lastActive: 'Just now' },
  { id: '5', name: 'Robert Johnson', role: 'Admin', status: 'Active', email: 'bob.j@pbd.com', avatar: 'https://picsum.photos/id/111/100/100', lastActive: '1 hour ago' },
  { id: '6', name: 'Sarah Wilson', role: 'Editor', status: 'Warning', email: 's.wilson@pbd.com', avatar: 'https://picsum.photos/id/338/100/100', lastActive: '2 days ago' },
];

interface TeamsProps {
  readOnly?: boolean;
}

export const Teams: React.FC<TeamsProps> = ({ readOnly = false }) => {
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [isCreateStaffOpen, setIsCreateStaffOpen] = useState(false);

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    if (e.target.checked) {
      setSelectedUsers(new Set(mockUsers.map(u => u.id)));
    } else {
      setSelectedUsers(new Set());
    }
  };

  const toggleUser = (id: string) => {
    if (readOnly) return;
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedUsers(newSelected);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-secondary">Manage Teams</h1>
           <p className="text-gray-500 text-sm">Monitor user access and manage roles.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" leftIcon={Download}>Export</Button>
          {!readOnly && <Button leftIcon={Filter} onClick={() => setIsCreateStaffOpen(true)}>Add User</Button>}
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        {/* Table Toolbar */}
        <div className="p-5 border-b border-gray-100 bg-surface-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-72">
            <Input placeholder="Search users..." icon={Search} className="bg-white" />
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-500">
             <span className="hidden sm:inline">Filter by:</span>
             <select className="bg-white border-none text-sm font-medium text-secondary focus:ring-0 rounded-lg py-1 pl-2 pr-8 cursor-pointer">
               <option>Status: All</option>
               <option>Active</option>
               <option>Pending</option>
             </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {!readOnly && selectedUsers.size > 0 && (
          <div className="bg-primary/10 px-6 py-2 flex items-center justify-between animate-in slide-in-from-top-2 fade-in">
            <span className="text-sm font-semibold text-primary">{selectedUsers.size} users selected</span>
            <div className="flex space-x-3">
              <button className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center"><Trash2 className="w-3 h-3 mr-1"/> Delete</button>
              <button className="text-xs font-semibold text-secondary hover:text-black flex items-center"><Download className="w-3 h-3 mr-1"/> Archive</button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white text-left">
              <tr>
                <th className="px-6 py-4 w-12">
                  <input 
                    type="checkbox" 
                    className={`rounded border-gray-300 text-primary focus:ring-primary ${readOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onChange={toggleSelectAll}
                    checked={selectedUsers.size === mockUsers.length && mockUsers.length > 0}
                    disabled={readOnly}
                  />
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-primary group">
                  <div className="flex items-center">User <ArrowUpDown className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" /></div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockUsers.map((user) => (
                <tr key={user.id} className={`hover:bg-gray-50 transition-colors ${selectedUsers.has(user.id) ? 'bg-primary/5' : ''}`}>
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      className={`rounded border-gray-300 text-primary focus:ring-primary ${readOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
                      checked={selectedUsers.has(user.id)}
                      onChange={() => toggleUser(user.id)}
                      disabled={readOnly}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img className="h-9 w-9 rounded-full object-cover border border-gray-200" src={user.avatar} alt="" />
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-secondary">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge status={user.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       {!readOnly && (
                         <>
                           <button className="p-1 text-gray-400 hover:text-primary transition-colors"><Edit2 className="w-4 h-4" /></button>
                           <button className="p-1 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                         </>
                       )}
                       <button className="p-1 text-gray-400 hover:text-secondary transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-semibold text-secondary">1</span> to <span className="font-semibold text-secondary">6</span> of <span className="font-semibold text-secondary">42</span> users
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled><ChevronLeft className="w-4 h-4" /></Button>
            <Button variant="outline" size="sm"><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </Card>

      {/* Create Staff Modal */}
      <Modal
        isOpen={isCreateStaffOpen}
        onClose={() => setIsCreateStaffOpen(false)}
        title="Create New Staff"
      >
        <EditStaff 
          onClose={() => setIsCreateStaffOpen(false)}
          onSubmit={(data) => {
            console.log('New staff created:', data);
            setIsCreateStaffOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};
