
import React, { useState } from 'react';
import {
    Activity,
    Users,
    Zap,
    Calendar,
    RefreshCw,
    ArrowRight,
    Search
} from 'lucide-react';
import {
    PageHeader,
    MetricCard,
    StatusBadge
} from '../../../components/superadmin/SharedComponents';

export const UsageDashboard = () => {
    const [dateRange, setDateRange] = useState('7d');

    // Mock Data for Top Active Tenants
    const topactiveTenants = [
        { id: 1, company: 'Acme Corp', plan: 'Enterprise', actions: 1240, lastActive: '2m ago' },
        { id: 2, company: 'TechFlow', plan: 'Pro', actions: 856, lastActive: '15m ago' },
        { id: 3, company: 'Global Logistics', plan: 'Enterprise', actions: 642, lastActive: '1h ago' },
        { id: 4, company: 'StartUp Inc', plan: 'Starter', actions: 420, lastActive: '3h ago' },
        { id: 5, company: 'GreenPack', plan: 'Pro', actions: 315, lastActive: '5h ago' },
        { id: 6, company: 'Beta Testers', plan: 'Trial', actions: 180, lastActive: '2d ago' },
        { id: 7, company: 'Consulting Grp', plan: 'Pro', actions: 156, lastActive: '1d ago' },
        { id: 8, company: 'Design Studio', plan: 'Starter', actions: 112, lastActive: '4h ago' },
        { id: 9, company: 'Law Firm LLP', plan: 'Enterprise', actions: 98, lastActive: '1d ago' },
        { id: 10, company: 'Retail Chain', plan: 'Enterprise', actions: 85, lastActive: '6h ago' },
    ];

    // Mock Data for Low Usage / At Risk
    const atRiskTenants = [
        { id: 1, company: 'OldStyle Co', plan: 'Starter', lastActive: '14d ago', status: 'Dormant' },
        { id: 2, company: 'Inactive Ltd', plan: 'Pro', lastActive: '7d ago', status: 'Churn Risk' },
        { id: 3, company: 'Ghost Inc', plan: 'Starter', lastActive: '30d ago', status: 'Dormant' },
        { id: 4, company: 'Trial User 1', plan: 'Trial', lastActive: '1d ago', status: 'Trial' }, // Example of trial expiring soon maybe?
        { id: 5, company: 'Forgotten LLC', plan: 'Trial', lastActive: '5d ago', status: 'Trial Expiring' },
    ];

    return (
        <div className="space-y-6">
            {/* A. Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Usage Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Platform-wide activity across all tenants</p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2 outline-none cursor-pointer hover:border-gray-400 transition-colors"
                    >
                        <option value="today">Today</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                    </select>
                    <button className="p-2 bg-white border border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* B. Core Usage Metrics (4 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    label="Total Actions"
                    value="15,240"
                    subtext="All platform events"
                    icon={Activity}
                    iconColor="text-blue-600"
                    bgColor="bg-blue-50"
                />
                <MetricCard
                    label="Active Tenants"
                    value="42"
                    subtext="Logged in this period"
                    icon={Users}
                    iconColor="text-green-600"
                    bgColor="bg-green-50"
                />
                <MetricCard
                    label="Avg Activity / Tenant"
                    value="362"
                    subtext="Actions per tenant"
                    icon={Zap}
                    iconColor="text-purple-600"
                    bgColor="bg-purple-50"
                />
                <MetricCard
                    label="Peak Activity Day"
                    value="Wednesday"
                    subtext="Highest volume"
                    icon={Calendar}
                    iconColor="text-orange-600"
                    bgColor="bg-orange-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* C. Top Active Tenants (Top 10) - Takes up 2 columns */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                        <h3 className="font-bold text-gray-900">Top Active Tenants</h3>
                        <button className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1">
                            View All <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-gray-500 font-medium border-b border-gray-50 bg-gray-50/20">
                                <tr>
                                    <th className="px-6 py-3">Company</th>
                                    <th className="px-6 py-3">Plan</th>
                                    <th className="px-6 py-3 text-right">Actions Count</th>
                                    <th className="px-6 py-3 text-right">Last Active</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {topactiveTenants.map((tenant) => (
                                    <tr key={tenant.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{tenant.company}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${tenant.plan === 'Enterprise' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                                    tenant.plan === 'Pro' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                        'bg-gray-50 text-gray-700 border-gray-100'
                                                }`}>
                                                {tenant.plan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono text-gray-600">{tenant.actions}</td>
                                        <td className="px-6 py-4 text-right text-gray-500">{tenant.lastActive}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* D. Low Usage / At Risk (Top 5) - Takes up 1 column */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                        <h3 className="font-bold text-gray-900">Low Usage / At Risk</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-gray-500 font-medium border-b border-gray-50 bg-gray-50/20">
                                <tr>
                                    <th className="px-6 py-3">Company</th>
                                    {/* Plan hidden on small screens if needed, but keeping for now */}
                                    <th className="px-6 py-3 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {atRiskTenants.map((tenant) => (
                                    <tr key={tenant.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{tenant.company}</div>
                                            <div className="text-xs text-gray-400 mt-0.5">Active: {tenant.lastActive}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <StatusBadge status={tenant.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
