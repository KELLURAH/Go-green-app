
import React, { useState } from 'react';
import {
    Filter,
    MoreHorizontal,
    CreditCard,
    ArrowRight
} from 'lucide-react';
import {
    PageHeader,
    TableContainer,
    TableHeader,
    StatusBadge
} from '../../../components/superadmin/SharedComponents';

export const Subscriptions = () => {
    const [filterStatus, setFilterStatus] = useState('All Statuses');

    return (
        <div className="space-y-6">
            <PageHeader
                title="Subscriptions"
                subtext="Who is paying, who isn't, and why?"
            >
                <div className="flex items-center gap-2">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-primary cursor-pointer shadow-sm hover:border-gray-300 transition-colors"
                    >
                        <option>All Statuses</option>
                        <option>Active</option>
                        <option>Past Due</option>
                        <option>Canceled</option>
                        <option>Trial</option>
                    </select>
                </div>
            </PageHeader>

            <TableContainer
                title="All Subscriptions"
                subtext="Manage active and past subscriptions across all tenants"
            >
                <table className="w-full text-sm text-left">
                    <TableHeader columns={['Company', 'Plan', 'Status', 'Monthly Amount', 'Renewal Date', 'Action']} />
                    <tbody className="divide-y divide-gray-50">
                        {[
                            { name: 'Acme Corp', plan: 'Enterprise', status: 'Active', amount: '$499.00', renewal: 'Jan 15, 2024' },
                            { name: 'TechFlow', plan: 'Pro', status: 'Active', amount: '$199.00', renewal: 'Jan 20, 2024' },
                            { name: 'OldStyle Co', plan: 'Starter', status: 'Past Due', amount: '$49.00', renewal: 'Dec 25, 2023', alert: true },
                            { name: 'BetaPack', plan: 'Pro', status: 'Canceled', amount: '$199.00', renewal: '-', dim: true },
                            { name: 'GreenEst', plan: 'Enterprise', status: 'Active', amount: '$499.00', renewal: 'Feb 01, 2024' },
                            { name: 'StartUp Inc', plan: 'Trial', status: 'Trial', amount: '$0.00', renewal: 'Ends in 12 days' },
                        ].map((sub, i) => (
                            <tr key={i} className={`group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-none ${sub.dim ? 'opacity-60 bg-gray-50/30' : ''}`}>
                                <td className="px-8 py-4 font-semibold text-gray-900 flex items-center gap-3">
                                    {sub.alert && <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" title="Past Due Alert" />}
                                    {sub.name}
                                </td>
                                <td className="px-8 py-4 text-gray-500">{sub.plan}</td>
                                <td className="px-8 py-4">
                                    <StatusBadge status={sub.status} />
                                </td>
                                <td className="px-8 py-4 font-mono font-medium text-gray-700">{sub.amount}</td>
                                <td className="px-8 py-4 text-gray-500">{sub.renewal}</td>
                                <td className="px-8 py-4 text-right">
                                    <button className="text-gray-400 hover:text-primary transition-colors flex items-center justify-end gap-1 text-xs font-bold uppercase tracking-wide">
                                        View <ArrowRight className="w-3 h-3" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableContainer>
        </div>
    );
};
