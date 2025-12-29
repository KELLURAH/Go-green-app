
import {
    LayoutDashboard,
    Users,
    ClipboardList,
    FileText,
    UserCheck,
    Monitor,
    Settings,
    UserCircle
} from 'lucide-react';

export interface NavItem {
    label: string;
    icon?: any;
    id: string;
    subItems?: NavItem[];
    roles?: string[]; // 'super_admin' | 'assistant'
}

export const superAdminItems: NavItem[] = [
    { label: 'Overview', icon: LayoutDashboard, id: 'super-admin-overview', roles: ['super_admin', 'assistant'] },
    {
        label: 'Tenants',
        icon: Users,
        id: 'super-admin-tenants',
        roles: ['super_admin', 'assistant'],
        subItems: [
            { label: 'All Tenants', id: 'super-admin-tenants-all', roles: ['super_admin', 'assistant'] },
            { label: 'Tenant Details', id: 'super-admin-tenants-details', roles: ['super_admin', 'assistant'] },
            { label: 'Trials & Invitations', id: 'super-admin-tenants-trials', roles: ['super_admin', 'assistant'] },
        ]
    },
    {
        label: 'Usage & Analytics',
        icon: ClipboardList,
        id: 'super-admin-usage',
        roles: ['super_admin', 'assistant'],
        subItems: [
            { label: 'Usage Dashboard', id: 'super-admin-usage-dashboard', roles: ['super_admin', 'assistant'] },
            { label: 'Feature Adoption', id: 'super-admin-usage-adoption', roles: ['super_admin', 'assistant'] },
            { label: 'Activity Reports', id: 'super-admin-usage-reports', roles: ['super_admin', 'assistant'] },
        ]
    },
    {
        label: 'Billing & Revenue',
        icon: FileText,
        id: 'super-admin-billing',
        roles: ['super_admin', 'assistant'],
        subItems: [
            { label: 'Revenue Dashboard', id: 'super-admin-billing-revenue', roles: ['super_admin', 'assistant'] },
            { label: 'Subscriptions', id: 'super-admin-billing-subscriptions', roles: ['super_admin', 'assistant'] },
            { label: 'Invoices & Payments', id: 'super-admin-billing-invoices', roles: ['super_admin', 'assistant'] }, // Invoices visible but read-only logic inside page?
            { label: 'Plans & Pricing', id: 'super-admin-billing-pricing', roles: ['super_admin', 'assistant'] },
        ]
    },
    {
        label: 'Security',
        icon: UserCheck,
        id: 'super-admin-security',
        roles: ['super_admin'], // RESTRICTED
        subItems: [
            { label: 'Audit Activity', id: 'super-admin-security-audit', roles: ['super_admin'] },
            { label: 'Login Activity', id: 'super-admin-security-logins', roles: ['super_admin'] },
            { label: 'System Alerts', id: 'super-admin-security-alerts', roles: ['super_admin'] },
        ]
    },
    {
        label: 'System Health',
        icon: Monitor,
        id: 'super-admin-health',
        roles: ['super_admin'], // RESTRICTED
        subItems: [
            { label: 'System Status', id: 'super-admin-health-status', roles: ['super_admin'] },
            { label: 'Background Jobs', id: 'super-admin-health-jobs', roles: ['super_admin'] },
            { label: 'Integrations Health', id: 'super-admin-health-integrations', roles: ['super_admin'] },
            { label: 'Error Logs', id: 'super-admin-health-logs', roles: ['super_admin'] },
            { label: 'Feature Flags', id: 'super-admin-health-flags', roles: ['super_admin'] },
            { label: 'Maintenance', id: 'super-admin-health-maintenance', roles: ['super_admin'] },
        ]
    },
    {
        label: 'Support & Tools',
        icon: Settings,
        id: 'super-admin-support',
        roles: ['super_admin', 'assistant'],
        subItems: [
            { label: 'Support Inbox', id: 'super-admin-support-inbox', roles: ['super_admin', 'assistant'] },
            { label: 'Impersonate Tenant', id: 'super-admin-support-impersonate', roles: ['super_admin', 'assistant'] },
            { label: 'Admin Tools', id: 'super-admin-support-tools', roles: ['super_admin', 'assistant'] },
        ]
    },
    {
        label: 'Account',
        icon: UserCircle,
        id: 'super-admin-account',
        roles: ['super_admin', 'assistant'],
        subItems: [
            { label: 'Profile', id: 'super-admin-account-profile', roles: ['super_admin', 'assistant'] },
            { label: 'Preferences', id: 'super-admin-account-preferences', roles: ['super_admin', 'assistant'] },
            { label: 'Team Members', id: 'super-admin-account-team', roles: ['super_admin'] }, // Only Super Admin can manage team
        ]
    }
];
