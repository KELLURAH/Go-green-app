import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, Lock } from 'lucide-react';

export const SuperAdminLogin = () => {
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const secret = import.meta.env.VITE_SUPERADMIN_TOKEN;

        if (!secret) {
            setError('System configuration error: Token not set.');
            return;
        }

        if (token === secret) {
            sessionStorage.setItem('sa_ok', '1');
            navigate('/superadmin');
        } else {
            setError('Invalid Access Token');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-gray-900 to-gray-800 skew-y-6 transform -translate-y-24 z-0" />

            <div className="relative z-10 w-full max-w-md p-6">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 text-center bg-gray-900 text-white">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                            <Shield className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold">Super Admin</h1>
                        <p className="text-gray-400 text-sm mt-1">Restricted Access Portal</p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                    Access Token
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                                        placeholder="Enter security token..."
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors shadow-lg shadow-gray-900/20"
                            >
                                <span>Unlock Access</span>
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </button>
                        </form>
                    </div>

                    <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
                        <p className="text-xs text-gray-400">
                            Authorized personnel only. All activities are monitored.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
