
import { useState } from 'react';
import {
    ChevronDown,
    ChevronRight,
    Search
} from 'lucide-react';
import {
    PageHeader
} from '../../../components/superadmin/SharedComponents';

export const ErrorLogs = () => {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    // Mock Data
    const errors = [
        { id: 1, time: '10:42:15 AM', source: 'API Server', type: 'DatabaseError', message: 'Connection pool exhausted', count: 15, severity: 'High', trace: 'Error: Connection pool exhausted\n    at Pool.connect (/app/node_modules/pg-pool/index.js:12:15)\n    at Query.run (/app/src/db.ts:45:12)\n    ...' },
        { id: 2, time: '10:41:03 AM', source: 'Frontend', type: 'TypeError', message: 'Cannot read property "map" of undefined', count: 4, severity: 'Medium', trace: 'TypeError: Cannot read property "map" of undefined\n    at TenantList (TenantList.tsx:24:15)\n    at renderWithHooks (react-dom.development.js:14803)\n    ...' },
        { id: 3, time: '10:38:55 AM', source: 'Background Job', type: 'TimeoutError', message: 'Job execution timed out after 30000ms', count: 1, severity: 'Low', trace: 'TimeoutError: Job execution timed out\n    at Timeout._onTimeout (job-queue.ts:150:23)\n    ...' },
    ];

    const toggleRow = (id: number) => {
        if (expandedRow === id) {
            setExpandedRow(null);
        } else {
            setExpandedRow(id);
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Error Logs"
                subtext="Detailed system error logs and stack traces"
            />

            {/* A. Filters */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 w-full">
                    <div className="flex items-center gap-2 flex-1">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search errors..."
                            className="bg-transparent border-none text-sm outline-none w-full placeholder-gray-400"
                        />
                    </div>
                    <div className="h-6 w-px bg-gray-200" />
                    <div className="flex items-center gap-3">
                        <select className="text-sm bg-gray-50 border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-primary">
                            <option>All Sources</option>
                            <option>Frontend</option>
                            <option>API</option>
                            <option>Database</option>
                        </select>
                        <select className="text-sm bg-gray-50 border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-primary">
                            <option>All Severities</option>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* B. Error Log List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Recent Errors</h3>
                </div>
                <div className="divide-y divide-gray-50">
                    {errors.map((error) => (
                        <div key={error.id} className="group">
                            <div
                                className={`flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${expandedRow === error.id ? 'bg-gray-50' : ''}`}
                                onClick={() => toggleRow(error.id)}
                            >
                                <div className="text-gray-400">
                                    {expandedRow === error.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                </div>
                                <div className="w-24 flex-shrink-0 text-xs font-mono text-gray-500">{error.time}</div>
                                <div className="w-24 flex-shrink-0">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${error.severity === 'High' ? 'bg-red-50 text-red-700 border-red-100' :
                                        error.severity === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                            'bg-blue-50 text-blue-700 border-blue-100'
                                        }`}>
                                        {error.severity}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-semibold text-gray-900 truncate">{error.type}: {error.message}</p>
                                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-gray-100 text-gray-500 font-medium uppercase tracking-wide">{error.source}</span>
                                    </div>
                                </div>
                                <div className="text-sm font-mono font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                    {error.count}
                                </div>
                            </div>

                            {/* Expandable Stack Trace */}
                            {expandedRow === error.id && (
                                <div className="px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-100">
                                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                        <pre className="text-xs font-mono text-gray-300 leading-relaxed">
                                            {error.trace}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
