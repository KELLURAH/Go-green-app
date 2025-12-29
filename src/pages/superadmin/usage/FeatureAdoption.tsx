
import React from 'react';
import {
    TrendingUp,
    TrendingDown,
    CheckCircle,
    AlertCircle,
    Info,
    Layout // Keeping consistent icon imports
} from 'lucide-react';
import { PageHeader } from '../../../components/superadmin/SharedComponents';

export const FeatureAdoption = () => {

    const features = [
        { id: 1, name: 'Visitor Check-in', enabled: 12, used: 11, rate: 92, trend: 'up' },
        { id: 2, name: 'Kiosk Mode', enabled: 10, used: 8, rate: 80, trend: 'up' },
        { id: 3, name: 'Deliveries', enabled: 12, used: 9, rate: 75, trend: 'stable' },
        { id: 4, name: 'Pre-registrations', enabled: 12, used: 6, rate: 50, trend: 'down' },
        { id: 5, name: 'Reports Export', enabled: 12, used: 4, rate: 33, trend: 'up' },
        { id: 6, name: 'Branding Customization', enabled: 5, used: 5, rate: 100, trend: 'stable' },
        { id: 7, name: 'NDA Signing', enabled: 8, used: 2, rate: 25, trend: 'down' },
        { id: 8, name: 'Badge Printing', enabled: 6, used: 6, rate: 100, trend: 'up' },
    ];

    // Derived Insights (Mock logic for display)
    const mostUsed = features.reduce((prev, current) => (prev.rate > current.rate) ? prev : current);
    const leastUsed = features.reduce((prev, current) => (prev.rate < current.rate) ? prev : current);
    const enabledUnused = features.find(f => f.enabled > 0 && f.used === 0) || { name: 'None', enabled: 0 };

    return (
        <div className="space-y-8">
            <PageHeader
                title="Feature Adoption"
                subtext="Feature usage across active tenants"
            />

            {/* B. Feature List (Main Content) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-gray-500 font-medium border-b border-gray-50 bg-gray-50/20">
                            <tr>
                                <th className="px-6 py-4">Feature</th>
                                <th className="px-6 py-4 text-center">Tenants Enabled</th>
                                <th className="px-6 py-4 text-center">Tenants Used</th>
                                <th className="px-6 py-4 text-center">Usage Rate</th>
                                <th className="px-6 py-4 text-center">Trend</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {features.map((feature) => (
                                <tr key={feature.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{feature.name}</td>
                                    <td className="px-6 py-4 text-center text-gray-600">{feature.enabled}</td>
                                    <td className="px-6 py-4 text-center text-gray-600">{feature.used}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <span className={`font-bold ${feature.rate >= 80 ? 'text-green-600' :
                                                    feature.rate >= 50 ? 'text-yellow-600' :
                                                        'text-red-600'
                                                }`}>{feature.rate}%</span>
                                            {/* Simple visual bar */}
                                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${feature.rate >= 80 ? 'bg-green-500' :
                                                            feature.rate >= 50 ? 'bg-yellow-500' :
                                                                'bg-red-500'
                                                        }`}
                                                    style={{ width: `${feature.rate}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center">
                                            {feature.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                                            {feature.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                                            {feature.trend === 'stable' && <span className="text-gray-400 text-xs">-</span>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* C. Adoption Insight (Bottom) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InsightCard
                    title="Most Used Feature"
                    feature={mostUsed.name}
                    stat={`${mostUsed.rate}% adoption`}
                    icon={CheckCircle}
                    color="text-green-600"
                    bgColor="bg-green-50"
                />
                <InsightCard
                    title="Least Used Feature"
                    feature={leastUsed.name}
                    stat={`${leastUsed.rate}% adoption`}
                    icon={AlertCircle}
                    color="text-red-600"
                    bgColor="bg-red-50"
                />
                <InsightCard
                    title="Enabled but Unused"
                    feature={enabledUnused.name === 'None' ? 'All active features are used' : enabledUnused.name}
                    stat={enabledUnused.name === 'None' ? 'Great job!' : `${enabledUnused.enabled} tenants enabled`}
                    icon={Info}
                    color="text-blue-600"
                    bgColor="bg-blue-50"
                />
            </div>
        </div>
    );
};

// Simple internal helper for insights
const InsightCard = ({ title, feature, stat, icon: Icon, color, bgColor }: any) => (
    <div className={`p-6 rounded-2xl border border-gray-100 ${bgColor} bg-opacity-30 flex items-start gap-4`}>
        <div className={`p-2 rounded-lg bg-white shadow-sm ${color}`}>
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">{title}</h4>
            <p className="font-bold text-gray-900 text-lg leading-tight">{feature}</p>
            <p className={`text-xs font-medium mt-1 ${color}`}>{stat}</p>
        </div>
    </div>
);
