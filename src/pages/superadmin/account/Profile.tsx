
import {
    User,
    Shield,
    Clock,
    Lock,
    LogIn,
    Smartphone,
    RefreshCw
} from 'lucide-react';
import {
    PageHeader
} from '../../../components/superadmin/SharedComponents';
import { useState, useEffect } from 'react';

export const Profile = () => {
    const [role, setRole] = useState(sessionStorage.getItem('sa_role') || 'super_admin');

    const toggleRole = () => {
        const newRole = role === 'super_admin' ? 'assistant' : 'super_admin';
        sessionStorage.setItem('sa_role', newRole);
        setRole(newRole);
        window.location.reload(); // Reload to apply layout changes
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Profile"
                subtext="Your Super Admin account details"
            />

            {/* Role Toggle for Testing */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                        <Shield className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-amber-900">Current Role: {role === 'super_admin' ? 'Super Admin' : 'Assistant'}</h4>
                        <p className="text-xs text-amber-700 mt-1">
                            Use this toggle to switch views and test permissions.
                        </p>
                    </div>
                </div>
                <button
                    onClick={toggleRole}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-200 text-amber-700 text-sm font-bold rounded-lg hover:bg-amber-50 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    Switch to {role === 'super_admin' ? 'Assistant' : 'Super Admin'}
                </button>
            </div>

            {/* B. Profile Card */}
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-gray-900 to-gray-800 relative">
                    <div className="absolute -bottom-16 left-8">
                        <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center shadow-md">
                            <span className="text-4xl font-bold text-gray-500">
                                {role === 'super_admin' ? 'SA' : 'AA'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="pt-20 px-8 pb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {role === 'super_admin' ? 'Super Admin' : 'Alex Assistant'}
                            </h2>
                            <p className="text-gray-500">
                                {role === 'super_admin' ? 'superadmin@gogreen.com' : 'alex@gogreen.com'}
                            </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${role === 'super_admin' ? 'bg-gray-900 text-white' : 'bg-blue-100 text-blue-700'
                            }`}>
                            {role === 'super_admin' ? 'Super Admin' : 'Assistant'}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Account Created</p>
                                <p className="text-sm font-semibold text-gray-900">Dec 01, 2023</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                                <LogIn className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Last Login</p>
                                <p className="text-sm font-semibold text-gray-900">Just now</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* C. Security Snapshot */}
            <div className="max-w-2xl mx-auto">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    Security Snapshot
                </h3>
                <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Lock className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm font-medium text-gray-900">Password</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">Set</span>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Smartphone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">MFA</span>
                        </div>
                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">Not enabled</span>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <User className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-gray-900">Active Sessions</span>
                        </div>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Current only</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
