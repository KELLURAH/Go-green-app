
import React from 'react';
import {
    Check,
    X,
    Shield,
    Zap,
    Crown
} from 'lucide-react';
import {
    PageHeader
} from '../../../components/superadmin/SharedComponents';

export const PlansPricing = () => {
    return (
        <div className="space-y-8">
            <PageHeader
                title="Plans & Pricing"
                subtext="Control monetization without code changes"
            />

            {/* Plan Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Starter */}
                <PlanCard
                    name="Starter"
                    price="$49"
                    icon={Shield}
                    color="bg-gray-50 text-gray-900 border-gray-200"
                    features={[
                        { text: 'Up to 5 Users', included: true },
                        { text: '1 Kiosk Device', included: true },
                        { text: 'Basic Reporting', included: true },
                        { text: 'SMS Notifications', included: false },
                        { text: 'Custom Branding', included: false },
                    ]}
                />

                {/* Pro (Popular) */}
                <PlanCard
                    name="Pro"
                    price="$199"
                    icon={Zap}
                    color="bg-blue-50/50 text-blue-900 border-blue-200 ring-1 ring-blue-100"
                    popular={true}
                    features={[
                        { text: 'Up to 20 Users', included: true },
                        { text: '5 Kiosk Devices', included: true },
                        { text: 'Advanced Analytics', included: true },
                        { text: 'SMS Notifications', included: true },
                        { text: 'Custom Branding', included: false },
                    ]}
                />

                {/* Enterprise */}
                <PlanCard
                    name="Enterprise"
                    price="$499"
                    icon={Crown}
                    color="bg-purple-50/50 text-purple-900 border-purple-200"
                    features={[
                        { text: 'Unlimited Users', included: true },
                        { text: 'Unlimited Kiosks', included: true },
                        { text: 'Custom Reports', included: true },
                        { text: 'Priority Support', included: true },
                        { text: 'SSO & Audit Logs', included: true },
                    ]}
                />
            </div>

            {/* Plan Rules */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-4xl">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Plan Rules & Logic</h3>

                <div className="space-y-8">
                    {/* Trial Settings */}
                    <div className="flex items-start justify-between pb-8 border-b border-gray-100">
                        <div>
                            <p className="font-semibold text-gray-900">Trial Period</p>
                            <p className="text-sm text-gray-500 mt-1 max-w-md">Default duration for new signups before requiring payment method.</p>
                        </div>
                        <div className="text-right">
                            <span className="font-mono font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-md">14 Days</span>
                        </div>
                    </div>

                    {/* Behavior Toggles (Read Only) */}
                    <div className="space-y-6">
                        <ToggleRow
                            label="Auto-downgrade on payment failure"
                            desc="Automatically move tenants to Free tier after 3 failed attempts."
                            enabled={true}
                        />
                        <ToggleRow
                            label="Prorate upgrades"
                            desc="Charge the difference immediately when moving to a higher plan."
                            enabled={true}
                        />
                        <ToggleRow
                            label="Allow grandfathering"
                            desc="Keep existing tenants on old pricing when global prices increase."
                            enabled={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface Feature {
    text: string;
    included: boolean;
}

interface PlanCardProps {
    name: string;
    price: string;
    features: Feature[];
    icon: React.ElementType;
    color: string;
    popular?: boolean;
}

const PlanCard = ({ name, price, features, icon: Icon, color, popular }: PlanCardProps) => (
    <div className={`relative p-8 rounded-3xl border ${color} bg-white shadow-sm flex flex-col h-full transition-transform hover:-translate-y-1`}>
        {popular && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                Most Popular
            </div>
        )}
        <div className="flex items-center justify-between mb-6">
            <div className={`p-3 rounded-2xl bg-white shadow-sm border border-gray-100`}>
                <Icon className="w-6 h-6 opacity-80" />
            </div>
            <div className="text-right">
                <span className="block text-3xl font-bold tracking-tight">{price}</span>
                <span className="text-xs font-medium opacity-60">/month</span>
            </div>
        </div>

        <h3 className="text-xl font-bold mb-6">{name}</h3>

        <ul className="space-y-4 flex-1">
            {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                    {f.included ? (
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    ) : (
                        <X className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`${f.included ? 'text-gray-700' : 'text-gray-400'}`}>{f.text}</span>
                </li>
            ))}
        </ul>
    </div>
);

interface ToggleRowProps {
    label: string;
    desc: string;
    enabled: boolean;
}

const ToggleRow = ({ label, desc, enabled }: ToggleRowProps) => (
    <div className="flex items-center justify-between">
        <div>
            <p className="font-semibold text-gray-900 text-sm">{label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
        </div>
        <div className={`w-11 h-6 rounded-full relative transition-colors ${enabled ? 'bg-primary' : 'bg-gray-200'}`}>
            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
        </div>
    </div>
);
