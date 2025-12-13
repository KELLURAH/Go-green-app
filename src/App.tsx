
import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { StaffLayout } from './components/staff/StaffLayout';
import { SignIn } from './components/pages/SignIn';
import { Dashboard } from './components/pages/Dashboard';
import { DesignSystem } from './components/pages/DesignSystem';
import { Teams } from './components/pages/Teams';
import { VisitorManagement } from './components/pages/VisitorManagement';
import { VisitorDetails } from './components/pages/VisitorDetails';
import { DeliveriesList } from './components/pages/DeliveriesList';
import { DeliveryDetails } from './components/pages/DeliveryDetails';
import { PreRegistrations } from './components/pages/PreRegistrations';
import { VisitorReports } from './components/pages/VisitorReports';
import { DeliveryReports } from './components/pages/DeliveryReports';
import { CompanyProfile } from './components/pages/settings/CompanyProfile';
import { BrandingSettings } from './components/pages/settings/BrandingSettings';
import { NotificationSettings } from './components/pages/settings/NotificationSettings';
import { VisitorFlowSettings } from './components/pages/settings/VisitorFlowSettings';
import { KioskSettings } from './components/pages/settings/KioskSettings';
// Kiosk Components
import { CheckInOptions } from './components/pages/kiosk/CheckInOptions';
import { KioskLayout } from './components/kiosk/KioskLayout';
import { WelcomeScreen } from './components/kiosk/WelcomeScreen';
import { CheckInFlow } from './components/kiosk/CheckInFlow';
// Staff Components
import { StaffDashboard } from './components/pages/staff/StaffDashboard';
import { MyVisitors } from './components/pages/staff/MyVisitors';
import { MyDeliveries } from './components/pages/staff/MyDeliveries';
import { StaffPreRegistrations } from './components/pages/staff/StaffPreRegistrations';
import { StaffSettings } from './components/pages/staff/StaffSettings';
// Reception Components
import { KioskMonitoring } from './components/pages/reception/KioskMonitoring';
import { ReceptionProfile } from './components/pages/reception/ReceptionProfile';
import { ReceptionDashboard } from './components/pages/reception/ReceptionDashboard';
// Layout Components
import { FloatingActions } from './components/layout/FloatingActions';

import { Menu, Search, Bell, Construction } from 'lucide-react';

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 text-gray-400">
    <Construction className="w-16 h-16 mb-4 opacity-20" />
    <h2 className="text-xl font-bold text-secondary capitalize">{title}</h2>
    <p className="text-sm mt-2">This page is under construction.</p>
  </div>
);

type DrawerType = 'notifications' | 'notes' | 'reminders' | null;

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [portalMode, setPortalMode] = useState<'admin' | 'staff' | 'receptionist'>('admin');

  // Kiosk internal state
  const [kioskState, setKioskState] = useState<'welcome' | 'flow'>('welcome');
  const [kioskFlowType, setKioskFlowType] = useState<'visitor' | 'delivery'>('visitor');

  // Shared state for adding a visitor from Dashboard
  const [shouldOpenAddVisitorModal, setShouldOpenAddVisitorModal] = useState(false);

  // Shared drawer state for FloatingActions
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);

  const handleTriggerAddVisitor = () => {
    if (portalMode === 'receptionist') {
      setActiveTab('reception-visitors-all');
    } else {
      setActiveTab('visitors-list');
    }
    setShouldOpenAddVisitorModal(true);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Reset to admin mode on logout
    setPortalMode('admin'); 
    setActiveTab('dashboard');
  };

  const handleSwitchPortal = (mode: 'admin' | 'staff' | 'receptionist') => {
    setPortalMode(mode);
    if (mode === 'staff') {
      setActiveTab('staff-dashboard');
    } else if (mode === 'receptionist') {
      setActiveTab('reception-dashboard');
    } else {
      setActiveTab('dashboard');
    }
  };

  // Logic to intercept navigation for portal switching
  const handleNavigation = (tabId: string) => {
    if (tabId === 'switch-to-staff') {
      handleSwitchPortal('staff');
    } else if (tabId === 'switch-to-admin') {
      handleSwitchPortal('admin');
    } else if (tabId === 'switch-to-receptionist') {
      handleSwitchPortal('receptionist');
    } else {
      setActiveTab(tabId);
    }
  };

  // Kiosk Mode Handling
  if (activeTab === 'kiosk-mode') {
    return (
      <KioskLayout onExit={() => {
        if (portalMode === 'receptionist') {
            setActiveTab('reception-dashboard');
        } else {
            setActiveTab('dashboard');
        }
        setKioskState('welcome');
      }}>
        {kioskState === 'welcome' ? (
          <WelcomeScreen onStart={(type) => {
            setKioskFlowType(type);
            setKioskState('flow');
          }} />
        ) : (
          <CheckInFlow 
            flowType={kioskFlowType}
            onComplete={() => setKioskState('welcome')} 
            onCancel={() => setKioskState('welcome')} 
          />
        )}
      </KioskLayout>
    );
  }

  const renderAdminContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onAddVisitor={handleTriggerAddVisitor} />;
      
      // Visitor Routes
      case 'visitors-list':
        return (
          <VisitorManagement 
            onNavigate={(tab) => setActiveTab(tab)} 
            shouldOpenModal={shouldOpenAddVisitorModal}
            onModalOpenHandled={() => setShouldOpenAddVisitorModal(false)}
          />
        );
      case 'visitor-details':
        return <VisitorDetails />;
      
      // Staff Routes
      case 'staff-list':
        return <Teams />;
      case 'staff-edit':
        return <PlaceholderPage title="Add / Edit Staff" />;

      // Deliveries Routes
      case 'deliveries-list':
        return <DeliveriesList onNavigate={(tab) => setActiveTab(tab)} />;
      case 'delivery-details':
        return <DeliveryDetails />;

      // Pre-registrations
      case 'pre-registrations':
        return <PreRegistrations />;
        
      // Reports
      case 'reports-visitor':
        return <VisitorReports />;
      case 'reports-delivery':
        return <DeliveryReports />;
        
      // Kiosk Admin Routes
      case 'kiosk-checkin-options':
        return <CheckInOptions />;
      case 'settings-kiosk':
        return <KioskSettings onLaunchKiosk={() => setActiveTab('kiosk-mode')} />;

      // Settings Routes
      case 'settings-profile':
        return <CompanyProfile />;
      case 'settings-branding':
        return <BrandingSettings />;
      case 'settings-notifications':
        return <NotificationSettings />;
      case 'settings-flow':
        return <VisitorFlowSettings />;
      
      default:
        return <PlaceholderPage title={activeTab.replace(/-/g, ' ')} />;
    }
  };

  const renderReceptionistContent = () => {
    switch (activeTab) {
      case 'reception-dashboard':
        return (
          <ReceptionDashboard 
            onAddVisitor={handleTriggerAddVisitor}
            onLogDelivery={() => setActiveTab('reception-deliveries-all')}
            onViewKiosk={() => setActiveTab('reception-kiosk-status')}
            onViewAllVisitors={() => setActiveTab('reception-visitors-all')}
            onViewAllDeliveries={() => setActiveTab('reception-deliveries-all')}
          />
        );
      
      // Visitor Routes
      case 'reception-visitors-all':
        return (
            <VisitorManagement 
                title="All Visitors"
                initialFilter="All"
                onNavigate={(tab) => setActiveTab(tab === 'visitor-details' ? 'reception-visitor-details' : tab)}
                shouldOpenModal={shouldOpenAddVisitorModal}
                onModalOpenHandled={() => setShouldOpenAddVisitorModal(false)}
            />
        );
      case 'reception-visitors-today':
        return (
             <VisitorManagement 
                title="Today's Visitors"
                initialFilter="All" 
                // In a real app, we would pass a date filter here. For now we use the title to imply context.
                onNavigate={(tab) => setActiveTab(tab === 'visitor-details' ? 'reception-visitor-details' : tab)}
            />
        );
      case 'reception-visitors-active':
        return (
             <VisitorManagement 
                title="Active Visitors (In Building)"
                initialFilter="On-site"
                onNavigate={(tab) => setActiveTab(tab === 'visitor-details' ? 'reception-visitor-details' : tab)}
            />
        );
      case 'reception-visitor-details':
         return <VisitorDetails />;

      // Delivery Routes
      case 'reception-deliveries-all':
        return <DeliveriesList title="All Deliveries" initialFilter="All" onNavigate={(tab) => setActiveTab(tab === 'delivery-details' ? 'reception-delivery-details' : tab)} />;
      case 'reception-deliveries-pending':
        return <DeliveriesList title="Pending Pickups" initialFilter="Waiting" onNavigate={(tab) => setActiveTab(tab === 'delivery-details' ? 'reception-delivery-details' : tab)} />;
      case 'reception-deliveries-picked-up':
        return <DeliveriesList title="Picked Up History" initialFilter="Picked Up" onNavigate={(tab) => setActiveTab(tab === 'delivery-details' ? 'reception-delivery-details' : tab)} />;
      case 'reception-delivery-details':
        return <DeliveryDetails />;

      // Other
      case 'reception-prereg':
        return <PreRegistrations />;
      case 'reception-staff':
        return <Teams readOnly={true} />;
      case 'reception-kiosk-status':
        return <KioskMonitoring activeTab="status" onLaunchKiosk={() => setActiveTab('kiosk-mode')} />;
      case 'reception-kiosk-log':
        return <KioskMonitoring activeTab="log" onLaunchKiosk={() => setActiveTab('kiosk-mode')} />;
      case 'reception-reports-visitor':
        return <VisitorReports variant="receptionist" />;
      case 'reception-reports-delivery':
        return <DeliveryReports variant="receptionist" />;
      case 'reception-profile':
        return <ReceptionProfile />;
      
      default:
        return <PlaceholderPage title={activeTab.replace(/-/g, ' ')} />;
    }
  };

  const renderStaffContent = () => {
    switch (activeTab) {
      case 'staff-dashboard':
        return <StaffDashboard />;
      case 'staff-visitors':
        return <MyVisitors />;
      case 'staff-deliveries':
        return <MyDeliveries />;
      case 'staff-prereg':
        return <StaffPreRegistrations />;
      case 'staff-settings':
        return <StaffSettings />;
      default:
        return <PlaceholderPage title={activeTab.replace(/-/g, ' ')} />;
    }
  };

  if (!isAuthenticated) {
    return <SignIn onLogin={handleLogin} />;
  }

  if (portalMode === 'staff') {
    return (
      <StaffLayout 
        activeTab={activeTab} 
        setActiveTab={handleNavigation}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onLogout={handleLogout}
        title={activeTab.replace('staff-', '').replace(/-/g, ' ')}
      >
        {renderStaffContent()}
        <FloatingActions 
          activeDrawer={activeDrawer}
          onSetActiveDrawer={setActiveDrawer}
        />
      </StaffLayout>
    );
  }

  // Admin & Receptionist Layout
  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleNavigation} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onLogout={handleLogout}
        variant={portalMode}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="bg-background/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
             <button 
               className="mr-4 lg:hidden p-2 text-secondary hover:bg-gray-200 rounded-lg"
               onClick={() => setIsMobileOpen(true)}
             >
               <Menu className="w-6 h-6" />
             </button>
             
             {/* Breadcrumb-ish title */}
             <div className="hidden md:flex items-center text-sm">
                <span className="text-gray-400">{portalMode === 'receptionist' ? 'Front Desk' : 'Admin Portal'}</span>
                <span className="mx-2 text-gray-300">/</span>
                <span className="font-semibold text-secondary capitalize">{activeTab.replace('reception-', '').replace(/-/g, ' ')}</span>
             </div>
          </div>

          <div className="flex items-center space-x-4">
             {/* Search Bar */}
             <div className="hidden md:flex items-center bg-white px-3 py-2 rounded-xl border border-transparent focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
               <Search className="w-4 h-4 text-gray-400 mr-2" />
               <input 
                 type="text" 
                 placeholder="Search..." 
                 className="bg-transparent border-none focus:outline-none text-sm w-48 text-secondary placeholder-gray-400" 
               />
               <span className="text-xs text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 ml-2">⌘K</span>
             </div>

             {/* Floating Actions on Mobile/Tablet */}
             <div className="lg:hidden">
               <FloatingActions 
                 variant="header" 
                 activeDrawer={activeDrawer}
                 onSetActiveDrawer={setActiveDrawer}
               />
             </div>
          </div>
        </header>

        {/* Main Scroll Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
           <div className="max-w-7xl mx-auto">
              {portalMode === 'receptionist' ? renderReceptionistContent() : renderAdminContent()}
           </div>
        </main>

        {/* Floating Actions Overlay */}
        <FloatingActions 
          activeDrawer={activeDrawer}
          onSetActiveDrawer={setActiveDrawer}
        />
      </div>
    </div>
  );
}
