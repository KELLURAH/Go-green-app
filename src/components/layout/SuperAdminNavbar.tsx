
import React, { useState } from 'react';
import { LogOut, ChevronDown, Menu as MenuIcon, X } from 'lucide-react';
import { superAdminItems, type NavItem } from '../../config/navigationConfig';

interface SuperAdminNavbarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onLogout: () => void;
    isMobileOpen?: boolean;
    setIsMobileOpen?: (open: boolean) => void;
    userRole: 'super_admin' | 'assistant';
    onRoleSwitch: (role: 'super_admin' | 'assistant') => void;
}

export const SuperAdminNavbar: React.FC<SuperAdminNavbarProps> = ({
    activeTab,
    setActiveTab,
    onLogout,
    isMobileOpen,
    setIsMobileOpen,
    userRole,
    onRoleSwitch
}) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleMouseEnter = (itemId: string) => {
        setOpenDropdown(itemId);
    };

    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };

    const handleClick = (item: NavItem) => {
        if (!item.subItems) {
            setActiveTab(item.id);
            setOpenDropdown(null);
        }
    };

    const handleSubItemClick = (e: React.MouseEvent, id: string) => {
        e?.stopPropagation?.();
        setActiveTab(id);
        setOpenDropdown(null);
    };

    return (
        <>
            <nav className="bg-[#1e2025] text-white border-b border-gray-800 relative z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Left: Logo & Mobile Menu */}
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-3">
                                {/* Mobile Menu Button */}
                                <button
                                    className="lg:hidden p-2 text-gray-400 hover:text-white"
                                    onClick={() => setIsMobileOpen?.(true)}
                                >
                                    <MenuIcon className="w-6 h-6" />
                                </button>

                                {/* Logo */}
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg shadow-white/10 shrink-0">
                                        <span className="text-[#1e2025] font-bold text-lg">S</span>
                                    </div>
                                    <span className="font-bold text-lg tracking-tight hidden sm:block">SuperAdmin</span>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {superAdminItems
                                .filter(item => !item.roles || item.roles.includes(userRole))
                                .map((item) => {
                                    const filteredSubItems = item.subItems?.filter(sub => !sub.roles || sub.roles.includes(userRole));
                                    const isActive = activeTab === item.id || filteredSubItems?.some(sub => sub.id === activeTab);

                                    return (
                                        <div
                                            key={item.id}
                                            className="relative group h-16 flex items-center"
                                            onMouseEnter={() => handleMouseEnter(item.id)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <button
                                                onClick={() => handleClick(item)}
                                                className={`
                                                    flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors
                                                    ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'}
                                                `}
                                            >
                                                {item.label}
                                                {filteredSubItems && filteredSubItems.length > 0 && <ChevronDown className="w-4 h-4 opacity-50" />}
                                            </button>

                                            {/* Dropdown */}
                                            {filteredSubItems && filteredSubItems.length > 0 && openDropdown === item.id && (
                                                <div className="absolute top-14 left-0 w-56 bg-[#252830] rounded-lg shadow-xl border border-gray-700 py-2 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
                                                    {filteredSubItems.map((subItem) => (
                                                        <button
                                                            key={subItem.id}
                                                            onClick={(e) => handleSubItemClick(e, subItem.id)}
                                                            className={`
                                                                w-full text-left px-4 py-2.5 text-sm transition-colors
                                                                ${activeTab === subItem.id ? 'bg-[#C8A45E] text-white font-medium' : 'text-gray-300 hover:bg-white/5 hover:text-white'}
                                                            `}
                                                        >
                                                            {subItem.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Active Indicator Line */}
                                            {isActive && (
                                                <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C8A45E] rounded-t-full" />
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>

                {/* Secondary Bar for Role Toggle & Logout */}
                <div className="bg-[#1e2025]/50 border-t border-gray-800/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-end gap-4">
                        {/* Compact Role Toggle */}
                        <div className="flex items-center bg-black/30 rounded-lg p-0.5 border border-white/5 shadow-inner">
                            <button
                                onClick={() => onRoleSwitch('super_admin')}
                                className={`px-2.5 py-1 rounded-md text-[9px] font-bold transition-all uppercase tracking-tighter ${userRole === 'super_admin' ? 'bg-[#C8A45E] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                Admin
                            </button>
                            <button
                                onClick={() => onRoleSwitch('assistant')}
                                className={`px-2.5 py-1 rounded-md text-[9px] font-bold transition-all uppercase tracking-tighter ${userRole === 'assistant' ? 'bg-[#C8A45E] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                Assistant
                            </button>
                        </div>

                        <div className="h-4 w-px bg-gray-800 mx-1" />

                        <button
                            onClick={onLogout}
                            className="flex items-center gap-1.5 px-2 py-1 text-gray-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest group"
                            title="Logout"
                        >
                            <span className="hidden sm:inline">Sign Out</span>
                            <LogOut className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer Overlay */}
            {isMobileOpen && (
                <div className="lg:hidden fixed inset-0 z-[60]">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsMobileOpen?.(false)}
                    />

                    {/* Drawer */}
                    <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#1e2025] shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
                        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                    <span className="text-[#1e2025] font-bold text-lg">S</span>
                                </div>
                                <span className="text-white font-bold text-lg">SuperAdmin</span>
                            </div>
                            <button
                                onClick={() => setIsMobileOpen?.(false)}
                                className="p-2 text-gray-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Mobile Role Toggle */}
                        <div className="px-6 py-4 border-b border-gray-800">
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">Active Role</p>
                            <div className="flex bg-[#252830] rounded-xl p-1 border border-gray-700">
                                <button
                                    onClick={() => onRoleSwitch('super_admin')}
                                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${userRole === 'super_admin' ? 'bg-[#C8A45E] text-white shadow-lg' : 'text-gray-500'}`}
                                >
                                    Admin
                                </button>
                                <button
                                    onClick={() => onRoleSwitch('assistant')}
                                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${userRole === 'assistant' ? 'bg-[#C8A45E] text-white shadow-lg' : 'text-gray-500'}`}
                                >
                                    Assistant
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                            {superAdminItems
                                .filter(item => !item.roles || item.roles.includes(userRole))
                                .map((item) => {
                                    const filteredSubItems = item.subItems?.filter(sub => !sub.roles || sub.roles.includes(userRole));
                                    const isActive = activeTab === item.id || filteredSubItems?.some(sub => sub.id === activeTab);
                                    const isExpanded = openDropdown === item.id;

                                    return (
                                        <div key={item.id} className="space-y-1">
                                            <button
                                                onClick={() => (filteredSubItems && filteredSubItems.length > 0) ? setOpenDropdown(isExpanded ? null : item.id) : handleSubItemClick({ stopPropagation: () => { } } as any, item.id)}
                                                className={`
                                                    w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all
                                                    ${isActive ? 'bg-[#C8A45E]/10 text-[#C8A45E]' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}
                                                `}
                                            >
                                                <span className="font-semibold">{item.label}</span>
                                                {filteredSubItems && filteredSubItems.length > 0 && (
                                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                                                )}
                                            </button>

                                            {filteredSubItems && filteredSubItems.length > 0 && isExpanded && (
                                                <div className="ml-4 pl-4 border-l border-gray-800 space-y-1 mt-1">
                                                    {filteredSubItems.map((sub) => (
                                                        <button
                                                            key={sub.id}
                                                            onClick={(e) => {
                                                                handleSubItemClick(e, sub.id);
                                                                setIsMobileOpen?.(false);
                                                            }}
                                                            className={`
                                                                w-full text-left px-4 py-2 rounded-lg text-sm transition-colors
                                                                ${activeTab === sub.id ? 'text-white font-bold' : 'text-gray-500 hover:text-gray-300'}
                                                            `}
                                                        >
                                                            {sub.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>

                        <div className="p-6 border-t border-gray-800">
                            <button
                                onClick={onLogout}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 rounded-xl font-bold hover:bg-red-500/20 transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
