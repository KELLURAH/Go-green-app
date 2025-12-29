
import React, { useState } from 'react';
import {
    ChevronDown,
    MoreHorizontal,
    Shield,
    UserCheck,
    CreditCard,
    Activity,
    Users,
    LayoutDashboard,
    AlertCircle,
    CheckCircle,
    Download
} from 'lucide-react';

export const TenantDetails = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="space-y-6">
            {/* Sticky Header */}
            <div className="sticky top-0 z-20 bg-gray-100/95 backdrop-blur-sm -mx-4 px-4 sm:-mx-8 sm:px-8 py-4 border-b border-gray-200 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/20">
                            AC
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-gray-900">Acme Corp</h1>
                                <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium border border-purple-200">Enterprise</span>
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium border border-green-200 flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Active
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">Tenant ID: ten_123456789 • Joined Dec 2024</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                            Impersonate
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 hover:border-red-200 transition-colors shadow-sm">
                            Suspend
                        </button>
                        <button className="p-2 bg-white border border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Sub-Navigation Tabs */}
                <div className="flex items-center gap-6 mt-6 border-b border-gray-200 text-sm font-medium">
                    {['Overview', 'Users', 'Usage', 'Billing', 'Activity'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`pb-3 border-b-2 transition-colors ${activeTab === tab.toLowerCase()
                                ? 'border-[#C8A45E] text-[#C8A45E]'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
                {activeTab === 'overview' && <OverviewTab />}
                {activeTab === 'users' && <UsersTab />}
                {activeTab === 'usage' && <UsageTab />}
                {activeTab === 'billing' && <BillingTab />}
                {activeTab === 'activity' && <ActivityTab />}
            </div>
        </div>
    );
};

// --- Sub-Components for Tabs ---

const OverviewTab = () => (
    <div className="space-y-6">
        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Users" value="124" icon={Users} color="bg-blue-50 text-blue-600 border border-blue-100" />
            <StatCard label="Active Kiosks" value="3" icon={LayoutDashboard} color="bg-orange-50 text-orange-600 border border-orange-100" />
            <StatCard label="Activity (7d)" value="High" icon={Activity} color="bg-emerald-50 text-emerald-600 border border-emerald-100" />
            <StatCard label="Last Login" value="2m ago" icon={UserCheck} color="bg-purple-50 text-purple-600 border border-purple-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Plan & Limits */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 mb-6 text-lg">Plan & Limits</h3>
                <div className="space-y-6">
                    <div className="flex justify-between items-center py-3 border-b border-gray-50">
                        <span className="text-sm font-medium text-gray-500">Current Plan</span>
                        <span className="font-bold text-gray-900 bg-gray-50 px-3 py-1 rounded-md border border-gray-200">Enterprise</span>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-500 font-medium">Seats Used</span>
                            <span className="font-bold text-gray-900">124 / Unlimited</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-blue-600 h-2.5 rounded-full shadow-sm" style={{ width: '15%' }}></div>
                        </div>
                    </div>
                    <div className="pt-2">
                        <span className="text-sm font-medium text-gray-500 block mb-3">Features Enabled</span>
                        <div className="flex flex-wrap gap-2">
                            {['SSO', 'Custom Branding', 'API Access', 'Audit Logs'].map(feat => (
                                <span key={feat} className="px-2.5 py-1 bg-white text-gray-600 text-xs rounded-md font-semibold border border-gray-200 shadow-sm">
                                    {feat}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity (Mini) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 mb-6 text-lg">Recent Activity</h3>
                <div className="space-y-5">
                    {[
                        { text: 'User Sarah J. logged in', time: '2m ago' },
                        { text: 'Kiosk "Main Lobby" updated', time: '15m ago' },
                        { text: 'New visitor registration', time: '1h ago' },
                        { text: 'Settings updated by Admin', time: '3h ago' },
                        { text: 'Weekly report generated', time: '1d ago' },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between text-sm group">
                            <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors truncate">{item.text}</span>
                            <span className="text-gray-400 text-xs whitespace-nowrap bg-gray-50 px-2 py-0.5 rounded-md">{item.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const UsersTab = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Last Login</th>
                    <th className="px-6 py-3 text-right">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {[
                    { name: 'John Doe', role: 'Admin', status: 'Active', login: '2h ago' },
                    { name: 'Sarah Smith', role: 'Staff', status: 'Active', login: '1d ago' },
                    { name: 'Mike Jones', role: 'Staff', status: 'Inactive', login: '5d ago' },
                ].map((user, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 text-gray-500">{user.role}</td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {user.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{user.login}</td>
                        <td className="px-6 py-4 text-right">
                            <button className="text-gray-400 hover:text-red-600 text-xs font-medium">Disable</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const UsageTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <p className="text-sm text-gray-500 font-medium">Total Visitors Created</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">1,245</h3>
            <p className="text-xs text-green-600 mt-1 flex items-center justify-center gap-1">
                <LayoutDashboard className="w-3 h-3" /> All time
            </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <p className="text-sm text-gray-500 font-medium">Deliveries Logged</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">328</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <p className="text-sm text-gray-500 font-medium">Preregistrations</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">854</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <p className="text-sm text-gray-500 font-medium">Peak Day</p>
            <h3 className="text-xl font-bold text-gray-900 mt-2">Wednesdays</h3>
        </div>
    </div>
);

const BillingTab = () => (
    <div className="max-w-3xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-gray-900">Current Subscription</h3>
                    <p className="text-sm text-gray-500">Billing details and plan info</p>
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Active</span>
            </div>
            <div className="p-6 grid grid-cols-2 gap-8">
                <div>
                    <p className="text-sm text-gray-500 mb-1">Plan</p>
                    <p className="text-lg font-bold text-gray-900">Enterprise Yearly</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500 mb-1">Monthly Cost</p>
                    <p className="text-lg font-bold text-gray-900">$2,400.00</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500 mb-1">Next Billing Date</p>
                    <p className="text-lg font-medium text-gray-900">Jan 15, 2026</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                    <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <p className="text-lg font-medium text-gray-900">•••• 4242</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Invoices</h3>
            </div>
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500">
                    <tr>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Download</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    <tr>
                        <td className="px-6 py-4">Dec 15, 2025</td>
                        <td className="px-6 py-4">$2,400.00</td>
                        <td className="px-6 py-4 text-green-600 font-medium">Paid</td>
                        <td className="px-6 py-4 text-right"><Download className="w-4 h-4 ml-auto text-gray-400 hover:text-gray-600 cursor-pointer" /></td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4">Nov 15, 2025</td>
                        <td className="px-6 py-4">$2,400.00</td>
                        <td className="px-6 py-4 text-green-600 font-medium">Paid</td>
                        <td className="px-6 py-4 text-right"><Download className="w-4 h-4 ml-auto text-gray-400 hover:text-gray-600 cursor-pointer" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const ActivityTab = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="space-y-8">
            {[
                { action: 'User Created', details: 'Admin created user "Mike Jones"', time: 'Dec 28, 2:30 PM' },
                { action: 'Settings Changed', details: 'Branding logo updated', time: 'Dec 27, 9:15 AM' },
                { action: 'Plan Upgraded', details: 'Upgraded from Pro to Enterprise', time: 'Dec 15, 10:00 AM' },
                { action: 'Invoice Paid', details: 'Dec 2025 Invoice - $2,400', time: 'Dec 15, 10:05 AM' },
            ].map((log, i) => (
                <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-gray-300 mt-2" />
                        <div className="w-0.5 bg-gray-200 flex-1 my-1 last:hidden" />
                    </div>
                    <div className="pb-2">
                        <p className="text-sm font-bold text-gray-900">{log.action}</p>
                        <p className="text-xs text-gray-500 mt-1">{log.details}</p>
                        <p className="text-xs text-gray-400 mt-1">{log.time}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const StatCard = ({ label, value, icon: Icon, color }: any) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-300">
        <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1 tracking-tight">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
            <Icon className="w-5 h-5" />
        </div>
    </div>
);
