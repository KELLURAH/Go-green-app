
import {
    ShieldAlert,
    AlertTriangle,
    Eye,
    CheckCircle2,
    XCircle,
    MapPin,
    Lock,
    Clock,
    ChevronRight,
    Search,
    Filter
} from 'lucide-react';
import {
    PageHeader,
} from '../../../components/superadmin/SharedComponents';

export const SecurityAlerts = () => {
    // Mock Alerts Data
    const alerts = [
        {
            id: 1,
            type: 'Multiple Failed Logins',
            severity: 'High',
            description: 'Account "admin@techflow.com" has 5 failed login attempts in 2 minutes.',
            target: 'TechFlow (Account: admin@techflow.com)',
            timestamp: '2025-12-28 18:15:22',
            location: 'Multiple (US, RU, CN)',
            status: 'Active'
        },
        {
            id: 2,
            type: 'Suspicious Login Pattern',
            severity: 'Medium',
            description: 'Unexpected login from a new location for Super Admin.',
            target: 'Super Admin Account',
            timestamp: '2025-12-28 17:30:10',
            location: 'Singapore, SG (Expected: New York, US)',
            status: 'Resolved'
        },
        {
            id: 3,
            type: 'Restricted Access Attempt',
            severity: 'Low',
            description: 'Attempt to access "Billing Settings" by an unauthorized staff member.',
            target: 'Acme Corp (Staff: John Doe)',
            timestamp: '2025-12-28 16:45:05',
            location: 'Internal Network',
            status: 'Active'
        },
        {
            id: 4,
            type: 'Unusual Export Volume',
            severity: 'Medium',
            description: 'Bulk export of 5,000+ data records detected.',
            target: 'Global Logistics (User: Sarah Lee)',
            timestamp: '2025-12-28 15:20:00',
            location: 'London, UK',
            status: 'Active'
        }
    ];

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'High': return 'bg-rose-50 text-rose-700 border-rose-100';
            case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'Low': return 'bg-blue-50 text-blue-700 border-blue-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Active': return <ShieldAlert className="w-4 h-4 text-rose-500 animate-pulse" />;
            case 'Resolved': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
            default: return <Clock className="w-4 h-4 text-gray-400" />;
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="System Alerts"
                subtext="Early warning system for security-critical events and suspicious patterns"
            />

            {/* Quick Stats / Filters */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-rose-50 border border-rose-100 px-4 py-2 rounded-xl flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-rose-500" />
                        <span className="text-sm font-bold text-rose-700">3 Active High Alerts</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search alerts..."
                            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-primary transition-all font-medium"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-600">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                </div>
            </div>

            {/* Alerts List */}
            <div className="grid gap-4">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`group bg-white rounded-2xl border transition-all hover:shadow-md ${alert.status === 'Active' ? 'border-gray-200' : 'border-gray-100 opacity-75'
                            }`}
                    >
                        <div className="p-5 flex items-start gap-4">
                            <div className={`p-3 rounded-xl border ${getSeverityColor(alert.severity)}`}>
                                {alert.severity === 'High' ? <ShieldAlert className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base font-bold text-gray-900">{alert.type}</h3>
                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getSeverityColor(alert.severity)}`}>
                                            {alert.severity}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                        {getStatusIcon(alert.status)}
                                        {alert.status}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">{alert.description}</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6 pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-gray-400" />
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Target</p>
                                            <p className="text-xs font-semibold text-gray-700 truncate">{alert.target}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">LocationContext</p>
                                            <p className="text-xs font-semibold text-gray-700 truncate">{alert.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Detected At</p>
                                            <p className="text-xs font-semibold text-gray-700 truncate">{alert.timestamp}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-primary/5 rounded-lg" title="View Details">
                                    <Eye className="w-5 h-5" />
                                </button>
                                {alert.status === 'Active' && (
                                    <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors hover:bg-emerald-50 rounded-lg" title="Mark Resolved">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </button>
                                )}
                                <button className="p-2 text-gray-400 hover:text-rose-600 transition-colors hover:bg-rose-50 rounded-lg" title="Ignore Alert">
                                    <XCircle className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-bold text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-all flex items-center justify-center gap-2">
                View Older Alerts
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
};
