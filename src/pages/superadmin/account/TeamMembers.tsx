
import React, { useState } from 'react';
import {
    UserPlus,
    MoreVertical,
    Shield,
    Mail,
    User,
    CheckCircle,
    X
} from 'lucide-react';
import {
    PageHeader,
    TableContainer,
    TableHeader,
    StatusBadge
} from '../../../components/superadmin/SharedComponents';

export const TeamMembers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Mock Data
    const [members, setMembers] = useState([
        { id: 1, name: 'Super Admin', email: 'superadmin@gogreen.com', role: 'Super Admin', status: 'Active', lastActive: 'Just now' },
        { id: 2, name: 'Alex Assistant', email: 'alex@gogreen.com', role: 'Assistant', status: 'Active', lastActive: '2 hours ago' },
    ]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Assistant'
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const newMember = {
            id: members.length + 1,
            name: formData.name,
            email: formData.email,
            role: formData.role === 'super_admin' ? 'Super Admin' : 'Assistant',
            status: 'Active',
            lastActive: 'Never'
        };
        setMembers([...members, newMember]);
        setIsModalOpen(false);
        setFormData({ name: '', email: '', role: 'Assistant' });

        // Show success toast
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="space-y-6 relative">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 z-50">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-medium">Team member created successfully</span>
                </div>
            )}

            <div className="flex items-start justify-between">
                <PageHeader
                    title="Team Management"
                    subtext="Manage admin access and roles"
                />
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                    <UserPlus className="w-4 h-4" />
                    Add Member
                </button>
            </div>

            <TableContainer
                title="Team Members"
                subtext="List of active administrators"
            >
                <table className="w-full text-sm text-left">
                    <TableHeader columns={['Name', 'Role', 'Status', 'Last Active', 'Action']} />
                    <tbody className="divide-y divide-gray-50">
                        {members.map((member) => (
                            <tr key={member.id} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-none">
                                <td className="px-8 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                            {member.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{member.name}</p>
                                            <p className="text-xs text-gray-500">{member.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-4">
                                    <div className="flex items-center gap-2">
                                        <Shield className={`w-3 h-3 ${member.role === 'Super Admin' ? 'text-purple-500' : 'text-blue-500'}`} />
                                        <span className="font-medium text-gray-700">{member.role}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-4">
                                    <StatusBadge status={member.status} />
                                </td>
                                <td className="px-8 py-4 text-gray-500 font-mono text-xs">{member.lastActive}</td>
                                <td className="px-8 py-4">
                                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableContainer>

            {/* Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Add Team Member</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleCreate} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-9 p-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        placeholder="e.g. John Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-9 p-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        placeholder="e.g. john@company.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Role</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className={`
                                        cursor-pointer border rounded-xl p-3 flex flex-col gap-2 transition-all
                                        ${formData.role === 'assistant' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'}
                                    `}>
                                        <input
                                            type="radio"
                                            name="role"
                                            className="hidden"
                                            checked={formData.role === 'assistant'}
                                            onChange={() => setFormData({ ...formData, role: 'assistant' })}
                                        />
                                        <Shield className={`w-5 h-5 ${formData.role === 'assistant' ? 'text-primary' : 'text-gray-400'}`} />
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Assistant</p>
                                            <p className="text-[10px] text-gray-500 leading-tight">Limited to non-critical features.</p>
                                        </div>
                                    </label>
                                    <label className={`
                                        cursor-pointer border rounded-xl p-3 flex flex-col gap-2 transition-all
                                        ${formData.role === 'super_admin' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'}
                                    `}>
                                        <input
                                            type="radio"
                                            name="role"
                                            className="hidden"
                                            checked={formData.role === 'super_admin'}
                                            onChange={() => setFormData({ ...formData, role: 'super_admin' })}
                                        />
                                        <Shield className={`w-5 h-5 ${formData.role === 'super_admin' ? 'text-primary' : 'text-gray-400'}`} />
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Super Admin</p>
                                            <p className="text-[10px] text-gray-500 leading-tight">Full access to all systems.</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="pt-4 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                                >
                                    Create Member
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
