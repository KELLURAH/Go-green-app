
import React, { useState } from 'react';
import {
    Search,
    Filter,
    Download,
    User,
    Settings,
    Layout,
    Shield,
    FileText
} from 'lucide-react';
import {
    PageHeader,
    StatusBadge
} from '../../../components/superadmin/SharedComponents';

export const ActivityReports = () => {
    const [filterTenant, setFilterTenant] = useState('All Tenants');
    const [filterType, setFilterType] = useState('All Actions');

    const logs = [
        { id: 1, time: 'Dec 28, 14:32', tenant: 'Acme Corp', actor: 'Sarah J. (Admin)', action: 'Added 14 visitors', type: 'user', icon: User },
        { id: 2, time: 'Dec 28, 14:15', tenant: 'TechFlow', actor: 'System', action: 'Daily report generated', type: 'system', icon: FileText },
        { id: 3, time: 'Dec 28, 13:45', tenant: 'Acme Corp', actor: 'Mike T. (Staff)', action: 'Updated Kiosk "Lobby 1"', type: 'settings', icon: Layout },
        { id: 4, time: 'Dec 28, 12:30', tenant: 'GreenPack', actor: 'System', action: 'Failed login attempt (IP matching blacklist)', type: 'security', icon: Shield },
        { id: 5, time: 'Dec 28, 11:20', tenant: 'Global Logistics', actor: 'Admin User', action: 'Changed branding settings', type: 'settings', icon: Settings },
        { id: 6, time: 'Dec 28, 10:05', tenant: 'StartUp Inc', actor: 'System', action: 'Trial converted to Paid (Pro)', type: 'system', icon: FileText },
        { id: 7, time: 'Dec 28, 09:15', tenant: 'Acme Corp', actor: 'Sarah J.', action: 'Exported visitor logs', type: 'user', icon: Download },
        { id: 8, time: 'Dec 27, 16:50', tenant: 'OldStyle Co', actor: 'System', action: 'Subscription payment failed', type: 'security', icon: Shield },
    ];

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'user': return 'bg-blue-100 text-blue-600';
            case 'system': return 'bg-gray-100 text-gray-600';
            case 'settings': return 'bg-purple-100 text-purple-600';
            case 'security': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Activity Reports"
                subtext="Detailed system activity across all tenants"
            />

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search logs..."
                            className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <select
                            value={filterTenant}
                            onChange={(e) => setFilterTenant(e.target.value)}
                            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-primary cursor-pointer"
                        >
                            <option>All Tenants</option>
                            <option>Acme Corp</option>
                            <option>TechFlow</option>
                        </select>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-primary cursor-pointer"
                        >
                            <option>All Actions</option>
                            <option>User Actions</option>
                            <option>System Events</option>
                            <option>Security</option>
                        </select>
                        <select
                            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-primary cursor-pointer"
                        >
                            <option>Last 24 Hours</option>
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>Custom Range</option>
                        </select>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>

            {/* Activity Log List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-50">
                    {logs.map((log) => (
                        <div key={log.id} className="p-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors group">
                            {/* Icon */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getTypeColor(log.type)} bg-opacity-20`}>
                                <log.icon className={`w-5 h-5 ${getTypeColor(log.type).replace('bg-', 'text-').split(' ')[1]}`} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                <div className="md:col-span-3">
                                    <p className="text-xs text-gray-400 font-mono mb-0.5">{log.time}</p>
                                    <p className="text-sm font-bold text-gray-900">{log.tenant}</p>
                                </div>
                                <div className="md:col-span-3">
                                    <p className="text-sm text-gray-600 flex items-center gap-2">
                                        <User className="w-3 h-3 text-gray-400" />
                                        {log.actor}
                                    </p>
                                </div>
                                <div className="md:col-span-6">
                                    <p className="text-sm text-gray-800 font-medium">{log.action}</p>
                                </div>
                            </div>

                            {/* Status/Type Badge */}
                            <div className="hidden md:block">
                                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md ${log.type === 'security' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-500'
                                    }`}>
                                    {log.type}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-gray-50 bg-gray-50/30 text-center">
                    <button className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">Load More Activity</button>
                </div>
            </div>
        </div>
    );
};
