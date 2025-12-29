
import React, { useState } from 'react';
import {
    DollarSign,
    CreditCard,
    TrendingUp,
    TrendingDown,
    Activity,
    ArrowRight
} from 'lucide-react';
import {
    MetricCard,
    PageHeader,
    StatBlock,
    StatusBadge
} from '../../../components/superadmin/SharedComponents';

export const RevenueDashboard = () => {
    const [range, setRange] = useState('30d');

    return (
        <div className="space-y-6">
            <PageHeader
                title="Revenue Dashboard"
                subtext="Platform-wide subscription revenue overview"
            >
                <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
                    {['30d', '90d', 'YTD'].map((r) => (
                        <button
                            key={r}
                            onClick={() => setRange(r)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${range === r
                                    ? 'bg-gray-100 text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </PageHeader>

            {/* Core Revenue Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    label="Monthly Recurring Revenue"
                    value="$142,500"
                    subtext="+8.2% vs last month"
                    icon={DollarSign}
                    iconColor="text-emerald-600"
                    bgColor="bg-emerald-50"
                />
                <MetricCard
                    label="Active Subscriptions"
                    value="142"
                    subtext="Across all plans"
                    icon={CreditCard}
                    iconColor="text-blue-600"
                    bgColor="bg-blue-50"
                />
                <MetricCard
                    label="Avg Revenue per Tenant"
                    value="$1,003"
                    subtext="ARPT"
                    icon={TrendingUp}
                    iconColor="text-purple-600"
                    bgColor="bg-purple-50"
                />
                <MetricCard
                    label="Churned This Period"
                    value="2"
                    subtext="1.4% churn rate"
                    icon={TrendingDown}
                    iconColor="text-red-600"
                    bgColor="bg-red-50"
                />
            </div>

            {/* Revenue Breakdown & Recent Events */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Revenue Breakdown */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-6 text-lg">Revenue Breakdown</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Positive */}
                        <div className="space-y-4">
                            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">New Revenue</p>
                                <div className="flex justify-between items-end">
                                    <h4 className="text-2xl font-bold text-gray-900">$12,450</h4>
                                    <span className="text-xs text-emerald-600 font-medium">+ New Subs & Upgrades</span>
                                </div>
                            </div>
                            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">Expansion</p>
                                <div className="flex justify-between items-end">
                                    <h4 className="text-2xl font-bold text-gray-900">$4,200</h4>
                                    <span className="text-xs text-blue-600 font-medium">+ Add-ons & usage</span>
                                </div>
                            </div>
                        </div>

                        {/* Negative */}
                        <div className="space-y-4">
                            <div className="p-4 bg-red-50/50 rounded-xl border border-red-100">
                                <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-1">Lost Revenue</p>
                                <div className="flex justify-between items-end">
                                    <h4 className="text-2xl font-bold text-gray-900">$1,850</h4>
                                    <span className="text-xs text-red-600 font-medium">- Cancellations</span>
                                </div>
                            </div>
                            <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                                <p className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-1">Discounts / Comped</p>
                                <div className="flex justify-between items-end">
                                    <h4 className="text-2xl font-bold text-gray-900">$850</h4>
                                    <span className="text-xs text-orange-600 font-medium">- Promotional offers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Billing Events */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900 text-lg">Billing Activity</h3>
                        <button className="text-xs font-bold text-primary hover:text-primary-hover hover:underline uppercase tracking-wide">View All</button>
                    </div>
                    <ul className="space-y-6">
                        {[
                            { text: 'Acme Corp upgraded to Enterprise', time: '2 hours ago', type: 'positive' },
                            { text: 'Payment failed: BetaPack', time: '4 hours ago', type: 'negative' },
                            { text: 'Invoice paid: TechFlow ($299.00)', time: '5 hours ago', type: 'neutral' },
                            { text: 'New Subscription: GreenEst', time: '1 day ago', type: 'positive' },
                            { text: 'Credit card expiring: OldStyle Co', time: '2 days ago', type: 'warning' },
                        ].map((event, i) => (
                            <li key={i} className="flex flex-col">
                                <div className="flex items-start gap-3">
                                    <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${event.type === 'positive' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' :
                                            event.type === 'negative' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' :
                                                event.type === 'warning' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]' :
                                                    'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]'
                                        }`} />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{event.text}</p>
                                        <p className="text-xs text-gray-400 mt-1">{event.time}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
