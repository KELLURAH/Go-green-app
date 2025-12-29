
import { useState } from 'react';
import {
    Shield,
    Globe,
    Monitor,
    Smartphone,
    Search,
    Filter,
    Clock,
    UserCheck,
    UserCircle,
    Download,
    Eye,
    X,
    ShieldAlert,
    CheckCircle2,
    Activity,
    Info,
    AlertTriangle
} from 'lucide-react';
import {
    PageHeader,
    TableContainer,
    TableHeader,
    MetricCard,
    StatusBadge
} from '../../../components/superadmin/SharedComponents';

export const LoginActivity = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    // Mock Login Data avec Risk Levels
    const loginEvents = [
        {
            id: 1,
            user: 'Super Admin',
            role: 'Super Admin',
            tenant: 'System',
            timestamp: '2025-12-28 17:50:00',
            ipAddress: '192.168.1.105',
            device: 'Desktop',
            location: 'New York, US',
            status: 'Success',
            risk: 'Low',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        {
            id: 2,
            user: 'Jane Smith',
            role: 'Admin',
            tenant: 'TechFlow',
            timestamp: '2025-12-28 17:42:15',
            ipAddress: '45.76.x.x',
            device: 'Mobile',
            location: 'London, UK',
            status: 'Success',
            risk: 'Low',
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        },
        {
            id: 3,
            user: 'Unknown',
            role: 'Guest',
            tenant: 'None',
            timestamp: '2025-12-28 17:30:12',
            ipAddress: '127.0.x.x',
            device: 'Unknown',
            location: 'Moscow, RU',
            status: 'Failed',
            risk: 'High',
            userAgent: 'Python-urllib/3.10'
        },
        {
            id: 4,
            user: 'Alex Assistant',
            role: 'Assistant',
            tenant: 'System',
            timestamp: '2025-12-28 16:30:44',
            ipAddress: '102.14.x.x',
            device: 'Desktop',
            location: 'Toronto, CA',
            status: 'Success',
            risk: 'Medium',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        {
            id: 5,
            user: 'Mark Miller',
            role: 'User',
            tenant: 'Acme Corp',
            timestamp: '2025-12-28 15:10:20',
            ipAddress: '88.12.x.x',
            device: 'Desktop',
            location: 'Berlin, DE',
            status: 'Success',
            risk: 'Low',
            userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    ];

    const filteredEvents = loginEvents.filter(event => {
        const matchesSearch = event.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.ipAddress.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'All' || event.role === roleFilter;
        const matchesStatus = statusFilter === 'All' || event.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const getDeviceIcon = (device: string) => {
        switch (device) {
            case 'Desktop': return <Monitor className="w-3 h-3" />;
            case 'Mobile': return <Smartphone className="w-3 h-3" />;
            default: return <Clock className="w-3 h-3" />;
        }
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'High': return 'text-rose-600 bg-rose-50 border-rose-100';
            case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100';
            default: return 'text-emerald-600 bg-emerald-50 border-emerald-100';
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Login Activity"
                subtext="Monitor session events and identify potential account risks"
            >
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    onClick={() => console.log('Exporting CSV...')}
                >
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </PageHeader>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    label="Total Logins"
                    value="1,284"
                    subtext="+12% from yesterday"
                    icon={Activity}
                    iconColor="text-blue-600"
                    bgColor="bg-blue-100"
                />
                <MetricCard
                    label="Successful"
                    value="1,240"
                    subtext="96.5% success rate"
                    icon={CheckCircle2}
                    iconColor="text-emerald-600"
                    bgColor="bg-emerald-100"
                />
                <MetricCard
                    label="Failed Attempts"
                    value="44"
                    subtext="3 blocks in last hour"
                    icon={X}
                    iconColor="text-rose-600"
                    bgColor="bg-rose-100"
                />
                <MetricCard
                    label="Suspicious"
                    value="2"
                    subtext="Requires review"
                    icon={ShieldAlert}
                    iconColor="text-amber-600"
                    bgColor="bg-amber-100"
                />
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by user, tenant or IP..."
                        className="w-full pl-9 p-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                        className="p-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-primary transition-all font-medium bg-white"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="All">All Roles</option>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Admin">Admin</option>
                        <option value="Assistant">Assistant</option>
                        <option value="User">User</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <select
                        className="p-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-primary transition-all font-medium bg-white"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Success">Success</option>
                        <option value="Failed">Failed</option>
                    </select>
                </div>
            </div>

            {/* Login Table */}
            <TableContainer
                title="Recent Login Events"
                subtext="Comprehensive log of platform-wide authentication attempts"
            >
                <table className="w-full text-sm text-left">
                    <TableHeader columns={['User / Role', 'Tenant', 'Timestamp', 'Context (IP/Device)', 'Risk Level', 'Status', 'Actions']} />
                    <tbody className="divide-y divide-gray-50">
                        {filteredEvents.map((event) => (
                            <tr key={event.id} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-none">
                                <td className="px-8 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${event.role === 'Super Admin' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {event.user.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{event.user}</p>
                                            <div className="flex items-center gap-1">
                                                <Shield className="w-3 h-3 text-primary/60" />
                                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">{event.role}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-4">
                                    <div className="flex items-center gap-2">
                                        {event.tenant === 'System' ? <UserCheck className="w-4 h-4 text-purple-500" /> : <UserCircle className="w-4 h-4 text-blue-500" />}
                                        <span className="font-medium text-gray-700">{event.tenant}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-4">
                                    <div className="flex flex-col text-xs">
                                        <span className="font-bold text-gray-900 tracking-tight">{event.timestamp.split(' ')[0]}</span>
                                        <span className="text-gray-500 font-medium">{event.timestamp.split(' ')[1]}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold">
                                            {getDeviceIcon(event.device)}
                                            {event.ipAddress}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                                            <Globe className="w-3 h-3" />
                                            {event.location}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getRiskColor(event.risk)}`}>
                                        {event.risk} Risk
                                    </span>
                                </td>
                                <td className="px-8 py-4">
                                    <StatusBadge status={event.status} />
                                </td>
                                <td className="px-8 py-4 text-right">
                                    <button
                                        onClick={() => setSelectedEvent(event)}
                                        className="text-gray-400 hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-lg"
                                        title="View Details"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableContainer>

            {/* Event Details Overlay (Side Panel) */}
            {selectedEvent && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex justify-end">
                    <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Event Details</h3>
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold ${selectedEvent.risk === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-900'
                                    }`}>
                                    {selectedEvent.user.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900">{selectedEvent.user}</h4>
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">{selectedEvent.role}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Status</p>
                                    <StatusBadge status={selectedEvent.status} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Risk Level</p>
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getRiskColor(selectedEvent.risk)}`}>
                                        {selectedEvent.risk}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Session Metadata</h5>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                                            <Monitor className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase">Device & Browser</p>
                                            <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedEvent.device}</p>
                                            <p className="text-xs text-gray-400 mt-1 leading-relaxed break-all font-mono">
                                                {selectedEvent.userAgent}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                                            <Globe className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase">IP & Location</p>
                                            <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedEvent.ipAddress}</p>
                                            <p className="text-sm text-gray-600 mt-1">{selectedEvent.location}</p>
                                            <div className="mt-2 text-[10px] text-blue-600 bg-blue-50 px-2 py-1 rounded-md inline-flex items-center gap-1 font-bold">
                                                <Info className="w-3 h-3" />
                                                ISP: Verizon Wireless (Placeholder)
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase">Timestamp</p>
                                            <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedEvent.timestamp}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {selectedEvent.risk === 'High' && (
                                <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl space-y-2">
                                    <div className="flex items-center gap-2 text-rose-700">
                                        <AlertTriangle className="w-4 h-4" />
                                        <p className="text-sm font-bold uppercase tracking-tight">Security Alert</p>
                                    </div>
                                    <p className="text-xs text-rose-600 leading-relaxed font-medium">
                                        This login attempt was flagged due to a suspicious location (Moscow, RU) which deviates from this user's typical pattern.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center gap-3">
                            <button className="flex-1 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-bold shadow-lg shadow-gray-900/20 hover:bg-gray-800 transition-all">
                                Whitepost IP
                            </button>
                            <button className="flex-1 py-2.5 bg-white border border-gray-200 text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-50 transition-all">
                                Block Access
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
