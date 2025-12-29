
import React, { useState } from 'react';
import {
    Moon,
    Sun,
    Bell,
    Globe,
    CheckCircle
} from 'lucide-react';
import {
    PageHeader
} from '../../../components/superadmin/SharedComponents';

export const Preferences = () => {
    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState({
        platform: true,
        billing: true,
        health: false
    });
    const [showToast, setShowToast] = useState(false);

    const handleSave = () => {
        // Simulate save
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications(prev => {
            const newState = { ...prev, [key]: !prev[key] };
            handleSave();
            return newState;
        });
    };

    return (
        <div className="space-y-8 relative">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 z-50">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-medium">Preferences saved</span>
                </div>
            )}

            <PageHeader
                title="Preferences"
                subtext="Personal system preferences"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1. Display */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Sun className="w-5 h-5 text-gray-400" />
                        Display & Time
                    </h3>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Theme</span>
                            <div className="bg-gray-100 p-1 rounded-lg flex items-center">
                                <button
                                    onClick={() => { setTheme('light'); handleSave(); }}
                                    className={`p-1.5 rounded-md transition-all ${theme === 'light' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
                                >
                                    <Sun className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => { setTheme('dark'); handleSave(); }}
                                    className={`p-1.5 rounded-md transition-all ${theme === 'dark' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
                                >
                                    <Moon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Date Format</label>
                            <select
                                className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:border-primary"
                                onChange={handleSave}
                            >
                                <option>MM/DD/YYYY</option>
                                <option>DD/MM/YYYY</option>
                                <option>YYYY-MM-DD</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Time Zone</label>
                            <select
                                className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:border-primary"
                                onChange={handleSave}
                            >
                                <option>UTC (Coordinated Universal Time)</option>
                                <option>EST (Eastern Standard Time)</option>
                                <option>PST (Pacific Standard Time)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 2. Notifications */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-gray-400" />
                        Notification Settings
                    </h3>

                    <div className="space-y-6">
                        <ToggleItem
                            label="Platform Alerts"
                            desc="Receive updates about system maintenance and features."
                            checked={notifications.platform}
                            onChange={() => toggleNotification('platform')}
                        />
                        <ToggleItem
                            label="Billing Alerts"
                            desc="Get notified about failed payments and invoice generation."
                            checked={notifications.billing}
                            onChange={() => toggleNotification('billing')}
                        />
                        <ToggleItem
                            label="System Health Alerts"
                            desc="Real-time alerts for system outages and degradation."
                            checked={notifications.health}
                            onChange={() => toggleNotification('health')}
                        />
                    </div>
                </div>

                {/* 3. Language */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 md:col-span-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-gray-400" />
                        Language
                    </h3>

                    <div className="max-w-md">
                        <select
                            className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:border-primary"
                            onChange={handleSave}
                        >
                            <option>English (US)</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ToggleItem = ({ label, desc, checked, onChange }: { label: string, desc: string, checked: boolean, onChange: () => void }) => (
    <div className="flex items-start justify-between">
        <div>
            <p className="font-semibold text-gray-900 text-sm">{label}</p>
            <p className="text-xs text-gray-500 mt-0.5 max-w-[200px]">{desc}</p>
        </div>
        <button
            onClick={onChange}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-primary' : 'bg-gray-200'}`}
        >
            <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}
            />
        </button>
    </div>
);
