
import React from 'react';
import { Clock, CheckCircle, TrendingUp, MoreHorizontal, ArrowRight } from 'lucide-react';

export const TrialsInvitations = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Trials & Invitations</h1>
                    <p className="text-sm text-gray-500 mt-1">Track growth funnel and conversion rates</p>
                </div>
            </div>

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatBox label="Active Trials" value="18" icon={Clock} color="text-blue-600" bg="bg-blue-50" />
                <StatBox label="Expiring Soon (3d)" value="4" icon={TrendingUp} color="text-orange-600" bg="bg-orange-50" />
                <StatBox label="Converted (Dec)" value="7" icon={CheckCircle} color="text-green-600" bg="bg-green-50" />
            </div>

            {/* Trials Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">Active Trials</h3>
                    <div className="flex gap-2 text-sm">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 font-medium">All</span>
                        <span className="px-3 py-1 hover:bg-gray-50 rounded-full text-gray-500 cursor-pointer">Expiring</span>
                        <span className="px-3 py-1 hover:bg-gray-50 rounded-full text-gray-500 cursor-pointer">New</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">Company</th>
                                <th className="px-6 py-3">Trial Start</th>
                                <th className="px-6 py-3">Trial End</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { company: 'Beta Testers Ltd', start: 'Dec 15, 2025', end: 'Dec 29, 2025', status: 'Expiring' },
                                { company: 'New Wave Co', start: 'Dec 20, 2025', end: 'Jan 03, 2026', status: 'Active' },
                                { company: 'Fresh Start Inc', start: 'Dec 22, 2025', end: 'Jan 05, 2026', status: 'Active' },
                                { company: 'Trial User 55', start: 'Dec 25, 2025', end: 'Jan 08, 2026', status: 'New' },
                            ].map((trial, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{trial.company}</td>
                                    <td className="px-6 py-4 text-gray-500">{trial.start}</td>
                                    <td className="px-6 py-4 text-gray-500">{trial.end}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${trial.status === 'Expiring' ? 'bg-orange-100 text-orange-700' :
                                                trial.status === 'New' ? 'bg-purple-100 text-purple-700' :
                                                    'bg-blue-50 text-blue-700'
                                            }`}>
                                            {trial.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                        <button className="px-3 py-1.5 bg-[#C8A45E] hover:bg-[#B08D4B] text-white text-xs font-medium rounded-md transition-colors shadow-sm">
                                            Convert
                                        </button>
                                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
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

const StatBox = ({ label, value, icon: Icon, color, bg }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
        <div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-sm font-medium text-gray-500 mt-1">{label}</p>
        </div>
        <div className={`p-3 rounded-xl ${bg}`}>
            <Icon className={`w-6 h-6 ${color}`} />
        </div>
    </div>
);
