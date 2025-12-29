
import { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { SuperAdminNavbar } from '../components/layout/SuperAdminNavbar';


export const SuperAdminLayout = () => {
    // Simple session check
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    // Determine active tab based on path
    const [activeTab, setActiveTab] = useState('super-admin-overview');
    const [userRole, setUserRole] = useState<'super_admin' | 'assistant'>(
        (sessionStorage.getItem('sa_role') as any) || 'super_admin'
    );

    useEffect(() => {
        const token = sessionStorage.getItem('sa_ok');
        if (token === '1') {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }, [location.pathname]);

    useEffect(() => {
        // Sync activeTab with URL
        if (location.pathname.includes('tenants')) setActiveTab('super-admin-tenants');
        else if (location.pathname.includes('usage')) setActiveTab('super-admin-usage');
        else if (location.pathname.includes('billing')) setActiveTab('super-admin-billing');
        else if (location.pathname.includes('security')) setActiveTab('super-admin-security');
        else if (location.pathname.includes('health')) setActiveTab('super-admin-health');
        else if (location.pathname.includes('support')) setActiveTab('super-admin-support');
        else if (location.pathname.includes('account')) setActiveTab('super-admin-account');
        else setActiveTab('super-admin-overview');

        // Route Guard for Assistant role
        if (userRole === 'assistant') {
            const restrictedPaths = ['security', 'health', 'billing/plans', 'account/team'];
            const isRestricted = restrictedPaths.some(path => location.pathname.includes(path));
            if (isRestricted) {
                navigate('/superadmin', { replace: true });
            }
        }
    }, [location.pathname, userRole]);

    const handleLogout = () => {
        sessionStorage.removeItem('sa_ok');
        sessionStorage.removeItem('sa_role');
        navigate('/superadmin/login');
    };

    const handleRoleSwitch = (role: 'super_admin' | 'assistant') => {
        setUserRole(role);
        sessionStorage.setItem('sa_role', role);
    };

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        // Navigate based on tab ID
        switch (tabId) {
            case 'super-admin-overview': navigate('/superadmin'); break;

            case 'super-admin-tenants-all': navigate('/superadmin/tenants'); break;
            case 'super-admin-tenants-details': navigate('/superadmin/tenants/details'); break;
            case 'super-admin-tenants-trials': navigate('/superadmin/tenants/trials'); break;

            // Usage & Analytics
            case 'super-admin-usage-dashboard': navigate('/superadmin/usage'); break;
            case 'super-admin-usage-adoption': navigate('/superadmin/usage/features'); break;
            case 'super-admin-usage-reports': navigate('/superadmin/usage/reports'); break;

            // Billing & Revenue
            case 'super-admin-billing-revenue': navigate('/superadmin/billing'); break;
            case 'super-admin-billing-subscriptions': navigate('/superadmin/billing/subscriptions'); break;
            case 'super-admin-billing-invoices': navigate('/superadmin/billing/invoices'); break;
            case 'super-admin-billing-pricing': navigate('/superadmin/billing/plans'); break;

            // Security
            case 'super-admin-security-audit': navigate('/superadmin/security/audit'); break;
            case 'super-admin-security-logins': navigate('/superadmin/security/logins'); break;
            case 'super-admin-security-alerts': navigate('/superadmin/security/alerts'); break;

            // System Health
            case 'super-admin-health-status': navigate('/superadmin/health'); break;
            case 'super-admin-health-jobs': navigate('/superadmin/health/jobs'); break;
            case 'super-admin-health-integrations': navigate('/superadmin/health/integrations'); break;
            case 'super-admin-health-logs': navigate('/superadmin/health/logs'); break;
            case 'super-admin-health-flags': navigate('/superadmin/health/flags'); break;
            case 'super-admin-health-maintenance': navigate('/superadmin/health/maintenance'); break;

            // Account
            case 'super-admin-account-profile': navigate('/superadmin/account/profile'); break;
            case 'super-admin-account-preferences': navigate('/superadmin/account/preferences'); break;
            case 'super-admin-account-team': navigate('/superadmin/account/team'); break;

            // Support
            case 'super-admin-support-inbox': navigate('/superadmin/support/inbox'); break;
            case 'super-admin-support-impersonate': navigate('/superadmin/support/impersonate'); break;
            case 'super-admin-support-tools': navigate('/superadmin/support/tools'); break;

            default:
                console.log('Navigating to:', tabId);
                break;
        }
    };



    if (isAuthorized === null) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>;
    }

    if (location.pathname === '/superadmin/login') {
        return <Outlet />;
    }

    if (!isAuthorized) {
        return <Navigate to="/superadmin/login" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            {/* Navbar */}
            <SuperAdminNavbar
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                onLogout={handleLogout}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
                userRole={userRole}
                onRoleSwitch={handleRoleSwitch}
            />

            <div className="flex flex-1 pt-0">
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};
