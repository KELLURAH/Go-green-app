
import React from 'react';
import {
    Cpu,
    AlertCircle,
    RotateCw,
    Clock
} from 'lucide-react';
import {
    PageHeader,
    MetricCard,
    TableContainer,
    TableHeader,
    StatusBadge
} from '../../../components/superadmin/SharedComponents';

export const BackgroundJobs = () => {
    // Mock Data
    const jobs = [
        { type: 'Email Notification', status: 'Completed', attempts: 1, lastRun: '1m ago', error: '-' },
        { type: 'Daily Report Gen', status: 'Processing', attempts: 1, lastRun: 'Running...', error: '-' },
        { type: 'Data Sync (CRM)', status: 'Failed', attempts: 3, lastRun: '15m ago', error: 'Timeout' },
        { type: 'SMS Gateway', status: 'Retrying', attempts: 2, lastRun: '3m ago', error: 'Connection Refused' },
        { type: 'Cache Cleanup', status: 'Completed', attempts: 1, lastRun: '1h ago', error: '-' },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Background Jobs"
                subtext="Queued and processed system tasks"
            />

            {/* B. Job Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    label="Jobs Processed (24h)"
                    value="124,592"
                    subtext="Successful executions"
                    icon={Cpu}
                    iconColor="text-blue-600"
                    bgColor="bg-blue-50"
                />
                <MetricCard
                    label="Failed Jobs"
                    value="14"
                    subtext="Requires attention"
                    icon={AlertCircle}
                    iconColor="text-red-600"
                    bgColor="bg-red-50"
                />
                <MetricCard
                    label="Retry Queue"
                    value="42"
                    subtext="Waiting for retry"
                    icon={RotateCw}
                    iconColor="text-amber-600"
                    bgColor="bg-amber-50"
                />
                <MetricCard
                    label="Avg Job Time"
                    value="240ms"
                    subtext="Execution duration"
                    icon={Clock}
                    iconColor="text-gray-600"
                    bgColor="bg-gray-50"
                />
            </div>

            {/* C. Job Table */}
            <TableContainer
                title="Recent Jobs"
                subtext="List of most recent background tasks and their status"
            >
                <table className="w-full text-sm text-left">
                    <TableHeader columns={['Job Type', 'Status', 'Attempts', 'Last Run', 'Error']} />
                    <tbody className="divide-y divide-gray-50">
                        {jobs.map((job, idx) => (
                            <tr key={idx} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-none">
                                <td className="px-8 py-4 font-semibold text-gray-900">{job.type}</td>
                                <td className="px-8 py-4">
                                    <StatusBadge status={job.status} />
                                </td>
                                <td className="px-8 py-4 text-gray-600">{job.attempts}</td>
                                <td className="px-8 py-4 font-mono text-gray-500 text-xs">{job.lastRun}</td>
                                <td className="px-8 py-4">
                                    {job.error !== '-' ? (
                                        <span className="text-red-600 text-xs font-semibold bg-red-50 px-2 py-1 rounded border border-red-100">
                                            {job.error}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableContainer>
        </div>
    );
};
