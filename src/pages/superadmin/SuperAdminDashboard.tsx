import React, { useState } from 'react';
import {
    Users,
    Activity,
    TrendingUp,
    Shield,
    Calendar,
    ArrowRight,
    AlertCircle,
    CheckCircle,
    RefreshCw,
    Server,
    Bell,
    Clock,
    AlertTriangle,
    DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    MetricCard,
    HealthPill,
    StatBlock,
    StatusBadge
} from '../../components/superadmin/SharedComponents';

export const SuperAdminDashboard = () => {
    const [dateRange, setDateRange] = useState('7d');

    return (
        <div className="space-y-8 font-sans text-gray-900 pb-10">

            {/* 1️⃣ Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Platform Overview</h1>
                    <p className="text-sm text-gray-500 mt-1">High-level view of platform activity and tenant usage</p>
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

            {/* 2️⃣ Core Metrics (Primary Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    label="Total Tenants"
                    value="12"
                    subtext="+2 this month"
                    icon={Users}
                    iconColor="text-blue-600"
                    bgColor="bg-blue-50"
                />
                <MetricCard
                    label="Active Tenants"
                    value="8"
                    subtext="Last 7 days"
                    icon={Activity}
                    iconColor="text-green-600"
                    bgColor="bg-green-50"
                />
                <MetricCard
                    label="Monthly Revenue"
                    value="$12,450"
                    subtext="Est. recurring"
                    icon={DollarSign}
                    iconColor="text-indigo-600"
                    bgColor="bg-indigo-50"
                />
                <MetricCard
                    label="Platform Activity"
                    value="1,240"
                    subtext="Actions today"
                    icon={TrendingUp}
                    iconColor="text-orange-600"
                    bgColor="bg-orange-50"
                />
            </div>

            {/* 3️⃣ Usage Snapshot (Mid Section) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Most Active Tenants */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                        <h3 className="font-bold text-gray-900 text-lg">Most Active Tenants</h3>
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full uppercase tracking-wide">Top 5</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white text-gray-400 font-semibold uppercase tracking-wider text-[11px] border-b border-gray-50">
                                <tr>
                                    <th className="px-8 py-4">Company</th>
                                    <th className="px-6 py-4">Plan</th>
                                    <th className="px-8 py-4 text-right">Activity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                <TenantRow company="Acme Corp" plan="Enterprise" activity="420" time="2m ago" />
                                <TenantRow company="TechFlow" plan="Pro" activity="215" time="15m ago" />
                                <TenantRow company="Global Logistics" plan="Enterprise" activity="180" time="1h ago" />
                                <TenantRow company="StartUp Inc" plan="Starter" activity="95" time="3h ago" />
                                <TenantRow company="GreenPack" plan="Pro" activity="42" time="5h ago" />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right: Dormant / Low Activity Tenants */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                        <h3 className="font-bold text-gray-900 text-lg">Dormant / Risk</h3>
                        <span className="text-[10px] font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full uppercase tracking-wide">Needing Attention</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white text-gray-400 font-semibold uppercase tracking-wider text-[11px] border-b border-gray-50">
                                <tr>
                                    <th className="px-8 py-4">Company</th>
                                    <th className="px-6 py-4">Plan</th>
                                    <th className="px-8 py-4 text-right">Last Active</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                <DormantRow company="OldStyle Co" plan="Starter" status="Dormant" lastActive="14d ago" />
                                <DormantRow company="Beta Testers" plan="Trial" status="Trial Expiring" lastActive="2d ago" />
                                <DormantRow company="Inactive Ltd" plan="Pro" status="Churn Risk" lastActive="7d ago" />
                                <DormantRow company="Ghost Inc" plan="Starter" status="Dormant" lastActive="30d ago" />
                                <DormantRow company="Trial User 1" plan="Trial" status="Trial" lastActive="1d ago" />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 4️⃣ Growth & 5️⃣ System Health Grouped */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 4️⃣ Growth Snapshot */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-6 text-lg">Growth Snapshot</h3>
                    <div className="grid grid-cols-3 gap-6">
                        <StatBlock label="New Tenants" value="3" subtext="This Month" />
                        <StatBlock label="Active Trials" value="5" subtext="Ending soon" />
                        <StatBlock label="Trials Converted" value="2" subtext="Last 30 days" />
                    </div>
                </div>

                {/* 5️⃣ System Health */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-6 text-lg">System Health</h3>
                    <div className="space-y-4">
                        <HealthPill label="System Status" status="healthy" text="Operational" />
                        <HealthPill label="Failed Jobs" status="neutral" text="0" />
                        <HealthPill label="Security Alerts" status="neutral" text="0" />
                    </div>
                </div>
            </div>

            {/* 6️⃣ Recent Platform Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-gray-900 text-lg">Recent Platform Activity</h3>
                    <button className="text-xs font-bold text-primary hover:text-primary-hover hover:underline uppercase tracking-wide">View All</button>
                </div>
                <div className="flow-root">
                    <ul className="-mb-8">
                        <ActivityItem
                            title="Acme Ltd logged 42 visitors today"
                            time="2 hours ago"
                            icon={Users}
                            iconBg="bg-blue-100"
                            iconColor="text-blue-600"
                        />
                        <ActivityItem
                            title="New tenant created: GreenPack Inc"
                            time="4 hours ago"
                            icon={CheckCircle}
                            iconBg="bg-green-100"
                            iconColor="text-green-600"
                        />
                        <ActivityItem
                            title="Plan upgraded: Starter → Pro (TechFlow)"
                            time="6 hours ago"
                            icon={TrendingUp}
                            iconBg="bg-purple-100"
                            iconColor="text-purple-600"
                        />
                        <ActivityItem
                            title="System Maintenance Completed"
                            time="1 day ago"
                            icon={CheckCircle}
                            iconBg="bg-gray-100"
                            iconColor="text-gray-600"
                        />
                        <ActivityItem
                            title="Failed Login Attempt (IP: 192.168.1.1)"
                            time="1 day ago"
                            icon={AlertTriangle}
                            iconBg="bg-red-100"
                            iconColor="text-red-600"
                        />
                    </ul>
                </div>
            </div>

        </div>
    );
};

// --- Helper Components ---

interface TenantRowProps {
    company: string;
    plan: 'Enterprise' | 'Pro' | 'Starter' | 'Trial';
    activity: string | number;
    time: string;
}

const TenantRow = ({ company, plan, activity, time }: TenantRowProps) => (
    <tr className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-none">
        <td className="px-6 py-4">
            <div className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{company}</div>
        </td>
        <td className="px-6 py-4">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${plan === 'Enterprise' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                    plan === 'Pro' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        'bg-gray-50 text-gray-700 border-gray-100'
                }`}>
                {plan}
            </span>
        </td>
        <td className="px-6 py-4 text-right">
            <div className="text-sm font-medium text-gray-900">{activity}</div>
            <div className="text-xs text-gray-400">{time}</div>
        </td>
    </tr>
);

interface DormantRowProps {
    company: string;
    plan: string;
    status: string;
    lastActive: string;
}

const DormantRow = ({ company, plan, status, lastActive }: DormantRowProps) => (
    <tr className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-none">
        <td className="px-6 py-4">
            <div className="font-semibold text-gray-900">{company}</div>
        </td>
        <td className="px-6 py-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                {plan}
            </span>
        </td>
        <td className="px-6 py-4 text-right">
            <div className="text-sm text-gray-500">{lastActive}</div>
            <StatusBadge status={status} />
        </td>
    </tr>
);

interface ActivityItemProps {
    title: string;
    time: string;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
}

const ActivityItem = ({ title, time, icon: Icon, iconBg, iconColor }: ActivityItemProps) => (
    <li className="relative pb-8 last:pb-0">
        <div className="absolute top-4 left-5 -ml-px h-full w-0.5 bg-gray-100 last:hidden" aria-hidden="true" />
        <div className="relative flex space-x-4">
            <div>
                <span className={`h-10 w-10 rounded-xl flex items-center justify-center ring-4 ring-white ${iconBg} shadow-sm`}>
                    <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
                </span>
            </div>
            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                    <p className="text-sm text-gray-900 font-semibold">{title}</p>
                </div>
                <div className="whitespace-nowrap text-right text-xs text-gray-400 font-medium bg-gray-50 px-2 py-0.5 rounded-md self-start">
                    {time}
                </div>
            </div>
        </div>
    </li>
);
