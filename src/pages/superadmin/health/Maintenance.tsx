
import React, { useState } from 'react';
import {
    AlertTriangle,
    Calendar,
    Clock,
    Save
} from 'lucide-react';
import {
    PageHeader,
    TableContainer,
    TableHeader,
    StatusBadge
} from '../../../components/superadmin/SharedComponents';

export const Maintenance = () => {
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    // Mock Data
    const scheduledMaintenance = [
        { title: 'Database Migration', time: 'Jan 15, 02:00 AM - 04:00 AM', status: 'Scheduled', impact: 'High' },
        { title: 'Security Patching', time: 'Feb 01, 01:00 AM - 02:00 AM', status: 'Scheduled', impact: 'Medium' },
        { title: 'Emergency Hotfix', time: 'Dec 20, 10:00 PM - 10:15 PM', status: 'Completed', impact: 'Low' },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Maintenance"
                subtext="Manage scheduled downtime and maintenance notices"
            />

            {/* A. Maintenance Banner Editor */}
            <div className={`rounded-2xl border p-6 transition-all ${maintenanceMode ? 'bg-red-50 border-red-100 shadow-sm' : 'bg-white border-gray-100 shadow-sm'}`}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <AlertTriangle className={`w-5 h-5 ${maintenanceMode ? 'text-red-500' : 'text-gray-400'}`} />
                            Maintenance Mode
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">When enabled, a banner will be displayed to all users.</p>
                    </div>
                    <button
                        onClick={() => setMaintenanceMode(!maintenanceMode)}
                        className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${maintenanceMode ? 'bg-red-600' : 'bg-gray-200'}`}
                    >
                        <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${maintenanceMode ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Banner Message</label>
                        <textarea
                            className="w-full p-3 text-sm border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            rows={3}
                            defaultValue="We are currently performing scheduled maintenance. Some features may be unavailable."
                        />
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Start Time</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    className="w-full pl-9 p-2.5 text-sm border border-gray-200 rounded-lg bg-white outline-none focus:border-primary"
                                    defaultValue="2024-01-15 02:00"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">End Time</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    className="w-full pl-9 p-2.5 text-sm border border-gray-200 rounded-lg bg-white outline-none focus:border-primary"
                                    defaultValue="2024-01-15 04:00"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
                        <Save className="w-4 h-4" />
                        Save Settings
                    </button>
                </div>
            </div>

            {/* B. Scheduled Maintenance List */}
            <TableContainer
                title="Service Schedule"
                subtext="Upcoming and recent maintenance windows"
            >
                <table className="w-full text-sm text-left">
                    <TableHeader columns={['Event', 'Time Window', 'Status', 'Impact']} />
                    <tbody className="divide-y divide-gray-50">
                        {scheduledMaintenance.map((event, idx) => (
                            <tr key={idx} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-none">
                                <td className="px-8 py-4 font-semibold text-gray-900">{event.title}</td>
                                <td className="px-8 py-4 text-gray-600 font-mono text-xs">{event.time}</td>
                                <td className="px-8 py-4">
                                    <StatusBadge status={event.status === 'Completed' ? 'Active' : event.status} />
                                    {/* Using Active for completed to get green, or mapped inside Component if extended */}
                                </td>
                                <td className="px-8 py-4">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${event.impact === 'High' ? 'bg-red-50 text-red-700 border-red-100' :
                                            event.impact === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                'bg-blue-50 text-blue-700 border-blue-100'
                                        }`}>
                                        {event.impact}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableContainer>
        </div>
    );
};
