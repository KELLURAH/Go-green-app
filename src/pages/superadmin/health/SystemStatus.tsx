
import {
    Activity,
    Server,
    Clock,
    AlertTriangle,
    CheckCircle,
    Database,
    Globe,
    MessageSquare
} from 'lucide-react';
import {
    PageHeader,
    MetricCard,
    StatusBadge
} from '../../../components/superadmin/SharedComponents';

export const SystemStatus = () => {
    // Mock Data
    const services = [
        { name: 'Web Application', status: 'Operational', lastChecked: 'Just now', icon: Globe },
        { name: 'API Server', status: 'Operational', lastChecked: 'Just now', icon: Server },
        { name: 'Database Cluster', status: 'Operational', lastChecked: '1m ago', icon: Database },
        { name: 'Notification Service', status: 'Degraded', lastChecked: '5m ago', icon: MessageSquare },
    ];

    const incidents = [
        { id: 1, time: 'Today, 10:42 AM', description: 'High latency on API endpoints', status: 'Resolved' },
        { id: 2, time: 'Yesterday, 2:15 PM', description: 'Scheduled maintenance completed', status: 'Resolved' },
        { id: 3, time: 'Dec 25, 08:30 AM', description: 'Email delivery delay identified', status: 'Resolved' },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="System Status"
                subtext="Real-time platform availability and health"
            />

            {/* B. Core Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    label="API Status"
                    value="Healthy"
                    subtext="All systems operational"
                    icon={CheckCircle}
                    iconColor="text-emerald-600"
                    bgColor="bg-emerald-50"
                />
                <MetricCard
                    label="App Uptime (30d)"
                    value="99.98%"
                    subtext="Target: 99.90%"
                    icon={Activity}
                    iconColor="text-blue-600"
                    bgColor="bg-blue-50"
                />
                <MetricCard
                    label="Avg Response Time"
                    value="142ms"
                    subtext="-12ms vs yesterday"
                    icon={Clock}
                    iconColor="text-purple-600"
                    bgColor="bg-purple-50"
                />
                <MetricCard
                    label="Active Incidents"
                    value="0"
                    subtext="No open issues"
                    icon={AlertTriangle}
                    iconColor="text-gray-600"
                    bgColor="bg-gray-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* C. Service List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-6 text-lg">Service Health</h3>
                    <div className="space-y-4">
                        {services.map((service, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2.5 rounded-lg bg-white shadow-sm text-gray-500`}>
                                        <service.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{service.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Last checked: {service.lastChecked}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {service.status === 'Operational' ? (
                                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-700 text-xs font-bold border border-emerald-100">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            Operational
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/50 text-amber-700 text-xs font-bold border border-amber-100">
                                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                                            {service.status}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* D. Recent Incidents */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-6 text-lg">Recent Incidents</h3>
                    <div className="space-y-6">
                        {incidents.map((incident) => (
                            <div key={incident.id} className="relative pl-6 pb-6 border-l-2 border-gray-100 last:pb-0 last:border-l-0">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white bg-gray-200 shadow-sm" />
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{incident.time}</span>
                                    <p className="font-medium text-gray-900 mt-1">{incident.description}</p>
                                    <div className="mt-2">
                                        <StatusBadge status={incident.status} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
