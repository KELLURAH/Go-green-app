import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, Users, UserCheck, Package, 
  FileText, Settings, LogOut, ChevronDown, ChevronRight,
  ClipboardList, ExternalLink, Monitor, UserCircle, Bell, User
} from 'lucide-react';
import type { NavItem } from '../../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  onLogout: () => void;
  variant?: 'admin' | 'staff' | 'receptionist';
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isMobileOpen, 
  setIsMobileOpen, 
  onLogout,
  variant = 'admin'
}) => {
  // Define nav items with useMemo to prevent unnecessary re-renders of effects
  const navItems = useMemo(() => {
    const adminItems: NavItem[] = [
      { label: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
      { 
        label: 'Visitors', 
        icon: UserCheck, 
        id: 'visitors',
        subItems: [
          { label: 'Visitors List', id: 'visitors-list' },
          { label: 'Visitor Details', id: 'visitor-details' }
        ]
      },
      { 
        label: 'Deliveries', 
        icon: Package, 
        id: 'deliveries',
        subItems: [
          { label: 'Deliveries List', id: 'deliveries-list' },
          { label: 'Delivery Details', id: 'delivery-details' }
        ]
      },
      { 
        label: 'Staff Directory', 
        icon: Users, 
        id: 'staff',
        subItems: [
          { label: 'Staff List', id: 'staff-list' },
          { label: 'Add / Edit Staff', id: 'staff-edit' }
        ]
      },
      { label: 'Pre-registrations', icon: ClipboardList, id: 'pre-registrations' },
      { 
        label: 'Reports', 
        icon: FileText, 
        id: 'reports',
        subItems: [
          { label: 'Visitor Reports', id: 'reports-visitor' },
          { label: 'Delivery Reports', id: 'reports-delivery' }
        ]
      },
      {
        label: 'Kiosk',
        icon: Monitor,
        id: 'kiosk-admin',
        subItems: [
          { label: 'Check-in Options', id: 'kiosk-checkin-options' },
          { label: 'Kiosk Settings', id: 'settings-kiosk' }
        ]
      },
      { 
        label: 'Settings', 
        icon: Settings, 
        id: 'settings',
        subItems: [
          { label: 'Company Profile', id: 'settings-profile' },
          { label: 'Branding', id: 'settings-branding' },
          { label: 'Notification Settings', id: 'settings-notifications' },
          { label: 'Visitor Flow Settings', id: 'settings-flow' },
        ]
      },
      {
        label: 'Accounts',
        icon: UserCircle,
        id: 'accounts',
        subItems: [
          { label: 'Staff Portal', id: 'switch-to-staff' },
          { label: 'Receptionist Portal', id: 'switch-to-receptionist' }
        ]
      }
    ];

    const staffItems: NavItem[] = [
      { label: 'Dashboard', icon: LayoutDashboard, id: 'staff-dashboard' },
      { label: 'My Visitors', icon: UserCheck, id: 'staff-visitors' },
      { label: 'My Deliveries', icon: Package, id: 'staff-deliveries' },
      { label: 'Pre-registrations', icon: ClipboardList, id: 'staff-prereg' },
      { label: 'Notification Settings', icon: Bell, id: 'staff-settings' },
      { label: 'My Profile', icon: User, id: 'staff-profile' },
      {
        label: 'Accounts',
        icon: UserCircle,
        id: 'accounts',
        subItems: [
          { label: 'Switch to Admin', id: 'switch-to-admin' }
        ]
      }
    ];

    const receptionistItems: NavItem[] = [
      { label: 'Dashboard', icon: LayoutDashboard, id: 'reception-dashboard' },
      { 
        label: 'Visitors', 
        icon: UserCheck, 
        id: 'reception-visitors',
        subItems: [
          { label: 'All Visitors', id: 'reception-visitors-all' },
          { label: "Today's Visitors", id: 'reception-visitors-today' },
          { label: 'Active (In Building)', id: 'reception-visitors-active' },
        ]
      },
      { 
        label: 'Deliveries', 
        icon: Package, 
        id: 'reception-deliveries',
        subItems: [
          { label: 'All Deliveries', id: 'reception-deliveries-all' },
          { label: 'Pending Pickups', id: 'reception-deliveries-pending' },
          { label: 'Picked Up', id: 'reception-deliveries-picked-up' },
        ]
      },
      { label: 'Pre-registrations', icon: ClipboardList, id: 'reception-prereg' },
      { label: 'Staff Directory', icon: Users, id: 'reception-staff' },
      {
        label: 'Kiosk Monitoring',
        icon: Monitor,
        id: 'reception-kiosk',
        subItems: [
          { label: 'Kiosk Status', id: 'reception-kiosk-status' },
          { label: 'Activity Log', id: 'reception-kiosk-log' },
        ]
      },
      {
        label: 'Reports',
        icon: FileText,
        id: 'reception-reports',
        subItems: [
          { label: "Today's Visitor Report", id: 'reception-reports-visitor' },
          { label: "Today's Delivery Report", id: 'reception-reports-delivery' },
        ]
      },
      { label: 'Profile', icon: User, id: 'reception-profile' },
      {
        label: 'Accounts',
        icon: UserCircle,
        id: 'accounts',
        subItems: [
          { label: 'Switch to Admin', id: 'switch-to-admin' }
        ]
      }
    ];

    if (variant === 'staff') return staffItems;
    if (variant === 'receptionist') return receptionistItems;
    return adminItems;
  }, [variant]);

  // State to track expanded parent items
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Reset expanded items when variant changes to avoid stale state
  useEffect(() => {
    setExpandedItems(new Set());
  }, [variant]);

  // Auto-expand parent if a child is active
  useEffect(() => {
    const parent = navItems.find(item => item.subItems?.some(sub => sub.id === activeTab));
    if (parent) {
      setExpandedItems(prev => new Set(prev).add(parent.id));
    }
  }, [activeTab, navItems]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleNavClick = (item: NavItem) => {
    if (item.subItems) {
      toggleExpand(item.id);
    } else {
      setActiveTab(item.id);
      setIsMobileOpen(false);
    }
  };

  const handleSubItemClick = (id: string) => {
    setActiveTab(id);
    setIsMobileOpen(false);
  };

  const getRoleLabel = () => {
    if (variant === 'admin') return 'Admin';
    if (variant === 'receptionist') return 'Receptionist';
    return 'Staff';
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        sidebar
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-secondary text-gray-300 flex flex-col transition-all duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        h-full lg:h-[calc(100vh-2rem)]
        lg:my-4 lg:ml-4 lg:rounded-[2rem]
        rounded-r-[2rem] lg:rounded-l-[2rem]
      `}>
        {/* Logo Area */}
        <div className="p-8 pb-4">
          <div className="flex items-center space-x-3 text-white">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/10 shrink-0">
              {/* GO-GREEN Icon */}
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#4CAF50]" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white leading-none">GO-GREEN</span>
              <span className="text-[9px] text-[#4CAF50] font-bold tracking-wide uppercase mt-1 leading-none">
                {variant === 'staff' ? 'Staff Portal' : variant === 'receptionist' ? 'Front Desk' : 'Food Packaging Solutions'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 mt-6 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const isExpanded = expandedItems.has(item.id);
            const isChildActive = item.subItems?.some(sub => sub.id === activeTab);
            
            return (
              <div key={item.id} className="mb-1">
                <button
                  onClick={() => handleNavClick(item)}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 group
                    ${isActive || isChildActive
                      ? 'bg-white/10 text-white font-medium' 
                      : 'hover:bg-white/5 hover:text-white'}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`w-5 h-5 transition-colors ${isActive || isChildActive ? 'text-primary' : 'text-gray-400 group-hover:text-white'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.subItems && (
                    <div className="text-gray-500">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  )}
                </button>

                {/* Sub Menu */}
                {item.subItems && isExpanded && (
                  <div className="mt-1 ml-4 space-y-1 border-l border-white/10 pl-2">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleSubItemClick(subItem.id)}
                        className={`
                          w-full flex items-center px-4 py-2 rounded-xl text-sm transition-all
                          ${activeTab === subItem.id
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'}
                        `}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 mt-auto space-y-4">
          {(variant === 'admin' || variant === 'receptionist') && (
            <button 
               onClick={() => setActiveTab('kiosk-mode')}
               className="w-full bg-[#C8A45E] hover:bg-[#B08D4B] text-[#2E3340] font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-colors shadow-lg"
            >
               <ExternalLink className="w-4 h-4 mr-2" /> Launch Kiosk
            </button>
          )}

          <div className="bg-[#1E212B] rounded-2xl p-4 flex items-center space-x-3 border border-white/5 shadow-lg">
            <img 
              src="https://ui-avatars.com/api/?name=Mr+Martin&background=0D8ABC&color=fff" 
              alt="Profile" 
              className="w-10 h-10 rounded-full border-2 border-primary"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Mr. Martin</p>
              <div className="flex items-center text-xs text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                {getRoleLabel()}
              </div>
            </div>
            <button className="text-gray-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-between px-2 text-xs text-gray-500 font-medium">
             <span>v2.0.5</span>
             <button 
               onClick={onLogout}
               className="flex items-center hover:text-white transition-colors"
             >
               <LogOut className="w-3 h-3 mr-1" /> Logout
             </button>
          </div>
        </div>
      </aside>
    </>
  );
};
