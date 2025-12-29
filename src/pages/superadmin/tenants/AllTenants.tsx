
import { useState } from 'react';
import { Search, Filter, Plus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AllTenants = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data
    const tenants = [
        { id: 1, company: 'Acme Corp', plan: 'Enterprise', status: 'Active', users: 124, activity: 'High', lastActive: '2m ago' },
        { id: 2, company: 'TechFlow', plan: 'Pro', status: 'Active', users: 45, activity: 'Medium', lastActive: '15m ago' },
        { id: 3, company: 'Global Logistics', plan: 'Enterprise', status: 'Past Due', users: 89, activity: 'Low', lastActive: '1h ago' },
        { id: 4, company: 'StartUp Inc', plan: 'Starter', status: 'Trial', users: 5, activity: 'Low', lastActive: '3h ago' },
        { id: 5, company: 'GreenPack', plan: 'Pro', status: 'Active', users: 22, activity: 'Medium', lastActive: '5h ago' },
        { id: 6, company: 'OldStyle Co', plan: 'Starter', status: 'Dormant', users: 2, activity: 'None', lastActive: '14d ago' },
        { id: 7, company: 'Inactive Ltd', plan: 'Pro', status: 'Suspended', users: 10, activity: 'None', lastActive: '7d ago' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'Trial': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Past Due': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'Suspended': return 'bg-red-50 text-red-700 border-red-200';
            case 'Dormant': return 'bg-gray-100 text-gray-500 border-gray-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const handleRowClick = () => {
        navigate('/superadmin/tenants/details');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tenants</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage all companies using the platform</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search tenants..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none w-64 transition-all"
                        />
                    </div>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                        <Filter className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#C8A45E] hover:bg-[#B08D4B] text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                        <Plus className="w-4 h-4" />
                        <span>Invite Tenant</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50/50 text-gray-400 font-semibold uppercase tracking-wider text-[11px] border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Company</th>
                                <th className="px-6 py-4">Plan</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Users</th>
                                <th className="px-6 py-4">Activity (7d)</th>
                                <th className="px-6 py-4">Last Active</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {tenants.map((tenant) => (
                                <tr
                                    key={tenant.id}
                                    onClick={handleRowClick}
                                    className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                                >
                                    <td className="px-6 py-4 font-semibold text-gray-900">
                                        {tenant.company}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <span className="font-medium bg-gray-50 border border-gray-200 text-gray-600 px-2 py-1 rounded-md text-xs">{tenant.plan}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(tenant.status)}`}>
                                            {tenant.status === 'Past Due' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" />}
                                            {tenant.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />}
                                            {tenant.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 font-medium">
                                        {tenant.users}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {tenant.activity}
                                    </td>
                                    <td className={`px-6 py-4 font-medium ${tenant.status === 'Dormant' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {tenant.lastActive}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); navigate('/superadmin/tenants/details'); }}
                                            className="text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors p-2 rounded-lg"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
