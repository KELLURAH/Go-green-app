
import { useState } from 'react';
import {
    ToggleRight,
    Users,
    Globe
} from 'lucide-react';
import {
    PageHeader,
    TableContainer,
    TableHeader,
    StatusBadge
} from '../../../components/superadmin/SharedComponents';

export const FeatureFlags = () => {
    // Mock Data
    const [features, setFeatures] = useState([
        { id: 1, name: 'New Dashboard UI', status: 'On', scope: 'Global', lastUpdated: '2 days ago' },
        { id: 2, name: 'Advanced Reporting', status: 'Off', scope: 'Plan: Enterprise', lastUpdated: '1 week ago' },
        { id: 3, name: 'Beta API Access', status: 'On', scope: 'Global', lastUpdated: '1 month ago' },
        { id: 4, name: 'AI Assistant', status: 'Off', scope: 'Global', lastUpdated: 'Just now' },
    ]);

    const toggleFeature = (id: number) => {
        setFeatures(features.map(f => {
            if (f.id === id) {
                return { ...f, status: f.status === 'On' ? 'Off' : 'On' };
            }
            return f;
        }));
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Feature Flags"
                subtext="Safely control feature exposure across the platform"
            />

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
                <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                    <ToggleRight className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-amber-900">Global Feature Control</h4>
                    <p className="text-xs text-amber-700 mt-1">
                        Changes made here affect all tenants immediately. Use with caution.
                        Per-tenant toggles are currently read-only in this view.
                    </p>
                </div>
            </div>

            <TableContainer
                title="Feature Management"
                subtext="List of active and inactive features"
            >
                <table className="w-full text-sm text-left">
                    <TableHeader columns={['Feature Name', 'Status', 'Scope', 'Last Updated', 'Action']} />
                    <tbody className="divide-y divide-gray-50">
                        {features.map((feature) => (
                            <tr key={feature.id} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-none">
                                <td className="px-8 py-4 font-semibold text-gray-900">{feature.name}</td>
                                <td className="px-8 py-4">
                                    <StatusBadge status={feature.status === 'On' ? 'Active' : 'Inactive'} />
                                </td>
                                <td className="px-8 py-4 text-gray-600 flex items-center gap-2">
                                    {feature.scope === 'Global' ? <Globe className="w-3 h-3 text-gray-400" /> : <Users className="w-3 h-3 text-gray-400" />}
                                    {feature.scope}
                                </td>
                                <td className="px-8 py-4 text-gray-500 font-mono text-xs">{feature.lastUpdated}</td>
                                <td className="px-8 py-4">
                                    <button
                                        onClick={() => toggleFeature(feature.id)}
                                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${feature.status === 'On' ? 'bg-primary' : 'bg-gray-200'}`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${feature.status === 'On' ? 'translate-x-5' : 'translate-x-0'}`}
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableContainer>
        </div>
    );
};
