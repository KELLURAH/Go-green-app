
import React, { useState } from 'react';
import {
    History,
    Search,
    Filter,
    Calendar,
    ArrowRight,
    User,
    Building2,
    ShieldAlert,
    UserX,
    ExternalLink,
    Clock
} from 'lucide-react';
import {
    PageHeader,
    TableContainer,
    TableHeader,
    StatusBadge
} from '../../../components/superadmin/SharedComponents';

export const AuditActivity = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [tenantFilter, setTenantFilter] = useState('All');

    // Mock Audit Data
    const auditLogs = [
        {
            id: 1,
            timestamp: '2025-12-28 17:45:12',
            initiator: 'Super Admin',
            role: 'Super Admin',
            action: 'Impersonation Started',
            target: 'Acme Corp',
            category: 'Impersonation',
            details: 'Initiated support impersonation for tenant: Acme Corp',
            status: 'Success'
        },
        {
            id: 2,
            timestamp: '2025-12-28 16:20:05',
            initiator: 'Jane Smith',
            role: 'Admin',
            action: 'Plan Upgrade',
            target: 'TechFlow',
            category: 'Billing',
            details: 'Upgraded from Pro to Enterprise',
            status: 'Success'
        },
        {
            id: 3,
            timestamp: '2025-12-28 15:12:44',
            initiator: 'Super Admin',
            role: 'Super Admin',
            action: 'Feature Toggle',
            target: 'Global System',
            category: 'System',
            details: 'Enabled "Beta Dashboard" for all tenants',
            status: 'Success'
        },
        {
            id: 4,
            timestamp: '2025-12-28 14:05:30',
            initiator: 'System',
            role: 'Automated',
            action: 'New Tenant Created',
            target: 'Horizon Labs',
            category: 'Tenant',
            details: 'New Enterprise tenant registration completed',
            status: 'Success'
        },
        {
            id: 5,
            timestamp: '2025-12-28 12:30:15',
            initiator: 'Super Admin',
            role: 'Super Admin',
            action: 'Impersonation Ended',
            target: 'Acme Corp',
            category: 'Impersonation',
            details: 'Closed support session for Acme Corp',
            status: 'Success'
        },
        {
            id: 6,
            timestamp: '2025-12-28 10:15:00',
            initiator: 'Alex Assistant',
            role: 'Assistant',
            action: 'Access Denied',
            target: 'System Health',
            category: 'Security',
            details: 'Unauthorized attempt to access Maintenance settings',
            status: 'Warning'
        }
    ];

    const filteredLogs = auditLogs.filter(log => {
        const matchesSearch = log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.initiator.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.target.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || log.category === categoryFilter;
        const matchesTenant = tenantFilter === 'All' || log.target === tenantFilter;
        return matchesSearch && matchesCategory && matchesTenant;
    });

    const categories = ['All', 'Tenant', 'Billing', 'System', 'Impersonation', 'Security'];
    const tenants = ['All', 'Acme Corp', 'TechFlow', 'Horizon Labs', 'Global System'];

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Impersonation': return <UserX className="w-4 h-4 text-purple-500" />;
            case 'Security': return <ShieldAlert className="w-4 h-4 text-amber-500" />;
            case 'Billing': return <ExternalLink className="w-4 h-4 text-emerald-500" />;
            case 'Tenant': return <Building2 className="w-4 h-4 text-blue-500" />;
            default: return <History className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Audit Activity"
                subtext="Centralized accountability and platform-wide monitoring"
            />

            {/* Filters Section */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search logs, initiators, or targets..."
                        className="w-full pl-9 p-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                        className="p-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-primary transition-all font-medium bg-white min-w-[140px]"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat} Category</option>)}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <select
                        className="p-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-primary transition-all font-medium bg-white min-w-[140px]"
                        value={tenantFilter}
                        onChange={(e) => setTenantFilter(e.target.value)}
                    >
                        {tenants.map(t => <option key={t} value={t}>{t === 'All' ? 'All Targets' : t}</option>)}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <button className="flex items-center gap-2 px-3 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
                        Date Range <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Timeline Table */}
            <TableContainer
                title="Audit Timeline"
                subtext="Showing global activity across all sections"
            >
                <table className="w-full text-sm text-left">
                    <TableHeader columns={['Timestamp', 'Initiator', 'Action', 'Target', 'Status', 'Details']} />
                    <tbody className="divide-y divide-gray-50">
                        {filteredLogs.map((log) => (
                            <tr key={log.id} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-none">
                                <td className="px-8 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-mono text-xs font-bold text-gray-900">{log.timestamp.split(' ')[0]}</span>
                                        <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                            <Clock className="w-3 h-3" />
                                            {log.timestamp.split(' ')[1]}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                            {log.initiator.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{log.initiator}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">{log.role}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-4">
                                    <div className="flex items-center gap-2">
                                        {getCategoryIcon(log.category)}
                                        <span className="font-medium text-gray-900">{log.action}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-4">
                                    <span className="text-gray-600 font-medium">{log.target}</span>
                                </td>
                                <td className="px-8 py-4">
                                    <StatusBadge status={log.status} />
                                </td>
                                <td className="px-8 py-4 max-w-xs">
                                    <p className="text-xs text-gray-500 truncate group-hover:whitespace-normal transition-all" title={log.details}>
                                        {log.details}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableContainer>
        </div>
    );
};
