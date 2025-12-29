
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortalApp from './PortalApp';
import { SuperAdminLayout } from './layouts/SuperAdminLayout';
import { SuperAdminLogin } from './pages/superadmin/SuperAdminLogin';
import { SuperAdminDashboard } from './pages/superadmin/SuperAdminDashboard';
import { AllTenants } from './pages/superadmin/tenants/AllTenants';
import { TenantDetails } from './pages/superadmin/tenants/TenantDetails';
import { TrialsInvitations } from './pages/superadmin/tenants/TrialsInvitations';
import { UsageDashboard } from './pages/superadmin/usage/UsageDashboard';
import { FeatureAdoption } from './pages/superadmin/usage/FeatureAdoption';
import { ActivityReports } from './pages/superadmin/usage/ActivityReports';
import { RevenueDashboard } from './pages/superadmin/billing/RevenueDashboard';
import { Subscriptions } from './pages/superadmin/billing/Subscriptions';
import { InvoicesPayments } from './pages/superadmin/billing/InvoicesPayments';
import { PlansPricing } from './pages/superadmin/billing/PlansPricing';

import { SystemStatus } from './pages/superadmin/health/SystemStatus';
import { BackgroundJobs } from './pages/superadmin/health/BackgroundJobs';
import { IntegrationsHealth } from './pages/superadmin/health/IntegrationsHealth';
import { ErrorLogs } from './pages/superadmin/health/ErrorLogs';
import { AuditActivity } from './pages/superadmin/security/AuditActivity';
import { LoginActivity } from './pages/superadmin/security/LoginActivity';
import { SecurityAlerts } from './pages/superadmin/security/SecurityAlerts';
import { FeatureFlags } from './pages/superadmin/health/FeatureFlags';
import { Maintenance } from './pages/superadmin/health/Maintenance';

import { Profile } from './pages/superadmin/account/Profile';
import { Preferences } from './pages/superadmin/account/Preferences';
import { TeamMembers } from './pages/superadmin/account/TeamMembers';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Super Admin Routes */}
        <Route path="/superadmin" element={<SuperAdminLayout />}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path="login" element={<SuperAdminLogin />} />
          <Route path="tenants" element={<AllTenants />} />
          <Route path="tenants/details" element={<TenantDetails />} />
          <Route path="tenants/trials" element={<TrialsInvitations />} />
          <Route path="usage" element={<UsageDashboard />} />
          <Route path="usage/features" element={<FeatureAdoption />} />
          <Route path="usage/reports" element={<ActivityReports />} />
          <Route path="billing" element={<RevenueDashboard />} />
          <Route path="billing/subscriptions" element={<Subscriptions />} />
          <Route path="billing/invoices" element={<InvoicesPayments />} />
          <Route path="billing/plans" element={<PlansPricing />} />

          {/* Health Routes */}
          <Route path="health" element={<SystemStatus />} />
          <Route path="health/jobs" element={<BackgroundJobs />} />
          <Route path="health/integrations" element={<IntegrationsHealth />} />
          <Route path="health/logs" element={<ErrorLogs />} />
          <Route path="health/flags" element={<FeatureFlags />} />
          <Route path="health/maintenance" element={<Maintenance />} />

          {/* Security Routes */}
          <Route path="security/audit" element={<AuditActivity />} />
          <Route path="security/logins" element={<LoginActivity />} />
          <Route path="security/alerts" element={<SecurityAlerts />} />

          {/* Account Routes */}
          <Route path="account/profile" element={<Profile />} />
          <Route path="account/preferences" element={<Preferences />} />
          <Route path="account/team" element={<TeamMembers />} />
        </Route>

        {/* Legacy App Fallback */}
        {/* We use * to catch everything else and render the PortalApp */}
        {/* Note: PortalApp handles its own internal "tab" navigation */}
        <Route path="/*" element={<PortalApp />} />
      </Routes>
    </BrowserRouter>
  );
}
