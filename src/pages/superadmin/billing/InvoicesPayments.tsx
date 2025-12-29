
import React, { useState } from 'react';
import {
    FileText,
    Download,
    AlertCircle,
    CheckCircle,
    ArrowRight,
    Search,
    Filter
} from 'lucide-react';
import {
    PageHeader,
    TableContainer,
    TableHeader,
    StatusBadge
} from '../../../components/superadmin/SharedComponents';

export const InvoicesPayments = () => {
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const allInvoices = [
        { id: 'INV-2024-001', company: 'Acme Corp', amount: '$499.00', status: 'Paid', date: 'Dec 28, 2023' },
        { id: 'INV-2024-002', company: 'TechFlow', amount: '$199.00', status: 'Paid', date: 'Dec 27, 2023' },
        { id: 'INV-2024-003', company: 'OldStyle Co', amount: '$49.00', status: 'Failed', date: 'Dec 25, 2023' },
        { id: 'INV-2024-004', company: 'GreenEst', amount: '$499.00', status: 'Unpaid', date: 'Dec 24, 2023' },
        { id: 'INV-2024-005', company: 'BetaPack', amount: '$199.00', status: 'Paid', date: 'Dec 20, 2023' },
    ];

    const filteredInvoices = allInvoices.filter(inv => {
        const matchesStatus = filterStatus === 'All' || inv.status === filterStatus;
        const matchesSearch = inv.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inv.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <PageHeader
                title="Invoices & Payments"
                subtext="What has been billed and what’s unpaid?"
            />

            {/* Payment Health Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Outstanding Invoices</p>
                        <h4 className="text-2xl font-bold text-gray-900 mt-1">3</h4>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-xl">
                        <FileText className="w-5 h-5 text-amber-600" />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Failed Payments</p>
                        <h4 className="text-2xl font-bold text-gray-900 mt-1">1</h4>
                    </div>
                    <div className="p-3 bg-red-50 rounded-xl">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Collected (30d)</p>
                        <h4 className="text-2xl font-bold text-gray-900 mt-1">$45,290</h4>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search invoices..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-primary cursor-pointer"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Failed">Failed</option>
                        </select>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>

            {/* Invoice Table */}
            <TableContainer
                title="Recent Invoices"
                subtext="History of all generated invoices and their payment status"
            >
                <table className="w-full text-sm text-left">
                    <TableHeader columns={['Invoice #', 'Company', 'Amount', 'Status', 'Date', 'Action']} />
                    <tbody className="divide-y divide-gray-50">
                        {filteredInvoices.length > 0 ? (
                            filteredInvoices.map((inv, i) => (
                                <tr key={i} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-none">
                                    <td className="px-8 py-4 font-mono font-medium text-gray-500">{inv.id}</td>
                                    <td className="px-8 py-4 font-semibold text-gray-900">{inv.company}</td>
                                    <td className="px-8 py-4 font-medium text-gray-900">{inv.amount}</td>
                                    <td className="px-8 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                            inv.status === 'Failed' ? 'bg-red-50 text-red-700 border-red-200' :
                                                'bg-gray-100 text-gray-600 border-gray-200'
                                            }`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-4 text-gray-500">{inv.date}</td>
                                    <td className="px-8 py-4 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-wide">
                                                View <ArrowRight className="w-3 h-3" />
                                            </button>
                                            <button className="text-gray-400 hover:text-primary transition-colors" title="Download PDF">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-8 py-12 text-center text-gray-500">
                                    No invoices found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </TableContainer>
        </div>
    );
};
