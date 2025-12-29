
import {
    AlertOctagon,
    Mail,
    MessageSquare,
    CreditCard,
    Calendar,
    ServerCrash
} from 'lucide-react';
import {
    PageHeader
} from '../../../components/superadmin/SharedComponents';

export const IntegrationsHealth = () => {
    // Mock Data
    const integrations = [
        { name: 'Email Provider (SendGrid)', status: 'Operational', lastSuccess: 'Just now', errorRate: '0.01%', icon: Mail, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'SMS Gateway (Twilio)', status: 'Operational', lastSuccess: '2m ago', errorRate: '0.05%', icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { name: 'Payment Gateway (Stripe)', status: 'Operational', lastSuccess: '5m ago', errorRate: '0.00%', icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50' },
        { name: 'Calendar Sync (Google)', status: 'Degraded', lastSuccess: '15m ago', errorRate: '2.4%', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    const failedCalls = [
        { service: 'Calendar Sync', error: 'Rate limit exceeded (429)', time: '10 mins ago' },
        { service: 'SMS Gateway', error: 'Invalid phone number format', time: '25 mins ago' },
        { service: 'Email Provider', error: 'Connection timeout', time: '1 hour ago' },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Integrations Health"
                subtext="Status of third-party services and connections"
            />

            {/* A. Integration Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrations.map((integration, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${integration.bg}`}>
                                    <integration.icon className={`w-6 h-6 ${integration.color}`} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{integration.name}</h3>
                                    <p className="text-xs text-gray-500 mt-1">Last success: {integration.lastSuccess}</p>
                                </div>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${integration.status === 'Operational' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                'bg-amber-50 text-amber-700 border-amber-100'
                                }`}>
                                {integration.status}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Error Rate</span>
                            <span className={`font-mono font-bold ${parseFloat(integration.errorRate) > 1 ? 'text-red-600' : 'text-gray-900'
                                }`}>{integration.errorRate}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* B. Recent Failures */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-6 text-lg flex items-center gap-2">
                    <ServerCrash className="w-5 h-5 text-red-500" />
                    Recent Failures
                </h3>
                <div className="space-y-4">
                    {failedCalls.map((failure, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-red-50/50 rounded-xl border border-red-100">
                            <div className="flex items-center gap-3">
                                <AlertOctagon className="w-4 h-4 text-red-500 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{failure.service}</p>
                                    <p className="text-xs text-red-600 font-mono mt-0.5">{failure.error}</p>
                                </div>
                            </div>
                            <span className="text-xs text-gray-500 font-medium">{failure.time}</span>
                        </div>
                    ))}
                    {failedCalls.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">No recent failures detected.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
