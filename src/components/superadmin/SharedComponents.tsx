
import React from 'react';

// --- Metric Card ---
export const MetricCard = ({ label, value, subtext, icon: Icon, iconColor, bgColor }: any) => (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)] transition-all duration-300 group hover:-translate-y-1">
        <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-500 group-hover:text-primary transition-colors truncate">{label}</p>
                <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2 tracking-tight truncate">{value}</h4>
                <p className="text-[10px] sm:text-xs font-medium text-gray-400 mt-1 flex items-center gap-1">
                    {subtext}
                </p>
            </div>
            <div className={`p-2.5 sm:p-3.5 rounded-xl ${bgColor} bg-opacity-50 group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor}`} />
            </div>
        </div>
    </div>
);

// --- Status Badge ---
export const StatusBadge = ({ status, type = 'default' }: { status: string, type?: 'default' | 'pill' }) => {
    let colorClass = 'bg-gray-100 text-gray-600 border-gray-200';

    const s = status.toLowerCase();
    if (s.includes('active') || s.includes('healthy') || s === 'operational') colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    else if (s.includes('trial') && !s.includes('expir')) colorClass = 'bg-blue-50 text-blue-700 border-blue-200';
    else if (s.includes('warning') || s.includes('expir') || s.includes('risk')) colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
    else if (s.includes('suspend') || s.includes('error') || s.includes('fail')) colorClass = 'bg-red-50 text-red-700 border-red-200';
    else if (s.includes('dormant')) colorClass = 'bg-gray-100 text-gray-500 border-gray-200';

    if (type === 'pill') {
        return (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${colorClass}`}>
                {s.includes('active') && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />}
                {status}
            </span>
        );
    }

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${colorClass}`}>
            {status}
        </span>
    );
};

// --- Stat Block (No Icon) ---
export const StatBlock = ({ label, value, subtext }: any) => (
    <div className="flex flex-col p-5 bg-gray-50/50 rounded-2xl border border-gray-100 text-center hover:bg-white hover:shadow-sm transition-all duration-300">
        <span className="text-4xl font-bold text-gray-900 tracking-tight">{value}</span>
        <span className="text-sm font-semibold text-gray-600 mt-2 uppercase tracking-wide">{label}</span>
        <span className="text-xs text-gray-400 mt-1">{subtext}</span>
    </div>
);

// --- Health Pill ---
export const HealthPill = ({ label, status, text }: any) => {
    let colorClass, dotClass;

    if (status === 'healthy') {
        colorClass = 'bg-emerald-50/80 border-emerald-100 text-emerald-800';
        dotClass = 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]';
    } else if (status === 'warning') {
        colorClass = 'bg-amber-50/80 border-amber-100 text-amber-800';
        dotClass = 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]';
    } else {
        colorClass = 'bg-gray-50 border-gray-100 text-gray-600';
        dotClass = 'bg-gray-400';
    }

    return (
        <div className={`flex items-center justify-between p-4 rounded-xl border ${colorClass} transition-all duration-300`}>
            <span className="text-sm font-semibold">{label}</span>
            <div className="flex items-center gap-2.5">
                <div className={`w-2.5 h-2.5 rounded-full ${dotClass}`} />
                <span className="text-sm font-bold">{text}</span>
            </div>
        </div>
    );
};

// --- Table Components ---
export const TableContainer = ({ title, subtext, children, action }: any) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/30">
            <div>
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">{title}</h3>
                {subtext && <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{subtext}</p>}
            </div>
            {action && <div className="w-full sm:w-auto">{action}</div>}
        </div>
        <div className="overflow-x-auto scrollbar-hide">
            <div className="min-w-[800px] sm:min-w-full">
                {children}
            </div>
        </div>
    </div>
);

export const TableHeader = ({ columns }: { columns: string[] }) => (
    <thead className="bg-white text-gray-400 font-semibold uppercase tracking-wider text-[11px] border-b border-gray-50">
        <tr>
            {columns.map((col, i) => (
                <th key={i} className={`px-8 py-4 ${i === columns.length - 1 ? 'text-right' : 'text-left'}`}>
                    {col}
                </th>
            ))}
        </tr>
    </thead>
);

export const PageHeader = ({ title, subtext, children }: any) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
            <p className="text-sm text-gray-500 mt-1">{subtext}</p>
        </div>
        <div className="flex items-center gap-3">
            {children}
        </div>
    </div>
);
