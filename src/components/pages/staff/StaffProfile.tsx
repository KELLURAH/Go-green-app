import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import {
    User, Mail, Phone, Bell, Shield, Lock, LogOut, Save, Camera,
    Briefcase, Building, Hash, Eye, EyeOff, Clock
} from 'lucide-react';

export const StaffProfile: React.FC = () => {
    const [loading, setLoading] = useState(false);

    // 1. Personal Information
    const [personalInfo, setPersonalInfo] = useState({
        firstName: 'Sarah',
        lastName: 'Wilson',
        jobTitle: 'Senior UX Designer',
        department: 'Product Design',
        employeeId: 'EMP-2024-001',
        photo: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=0D8ABC&color=fff'
    });

    // 2. Contact Information
    const [contactInfo, setContactInfo] = useState({
        email: 'sarah.wilson@company.com',
        phone: '+1 (555) 123-4567'
    });

    // 3. Notification Preferences
    const [notifications, setNotifications] = useState({
        emailVisitor: true,
        smsVisitor: true,
        emailDelivery: false,
        smsDelivery: true
    });

    // 4. Availability / Visibility
    const [availability, setAvailability] = useState({
        available: true,
        showOnKiosk: true,
        hideUntilSearch: false
    });

    // 5. Security
    const [security, setSecurity] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleSave = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        // Show success message (mock)
        alert('Changes saved successfully!');
    };

    const handleLogout = () => {
        // This will be handled by the parent layout usually, but for now just a placeholder
        console.log('Logout requested');
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-secondary">My Profile</h1>
                    <p className="text-gray-500 text-sm">Manage your personal information and preferences.</p>
                </div>
                <div className="flex space-x-3">
                    <Button variant="outline" onClick={handleLogout} leftIcon={LogOut} className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">
                        Logout
                    </Button>
                    <Button onClick={handleSave} isLoading={loading} leftIcon={Save}>
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Profile Card & Status */}
                <div className="space-y-6">
                    {/* Profile Photo & Basic Info */}
                    <Card className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="relative group">
                            <img
                                src={personalInfo.photo}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                            />
                            <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-md hover:bg-primary-dark transition-colors">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-secondary">{personalInfo.firstName} {personalInfo.lastName}</h2>
                            <p className="text-gray-500">{personalInfo.jobTitle}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Badge variant="success" className="px-3 py-1">Active Staff</Badge>
                            <Badge variant="secondary" className="px-3 py-1">Host</Badge>
                        </div>
                        <div className="w-full pt-4 border-t border-gray-100 mt-4">
                            <div className="flex justify-between text-sm text-gray-500 mb-2">
                                <span>Last Login</span>
                                <span className="font-medium text-secondary">Today, 09:41 AM</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Account Status</span>
                                <span className="font-medium text-green-600">Active</span>
                            </div>
                        </div>
                    </Card>

                    {/* Availability Settings */}
                    <Card className="p-6 space-y-6">
                        <div className="flex items-center space-x-2 border-b border-gray-100 pb-4">
                            <Clock className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-secondary">Availability & Visibility</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-secondary">Available for Visitors</p>
                                    <p className="text-xs text-gray-500">Receive visitor notifications</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={availability.available}
                                    onChange={() => setAvailability({ ...availability, available: !availability.available })}
                                    className="toggle-checkbox h-6 w-11 rounded-full border-gray-300 bg-gray-200 checked:bg-primary transition-colors"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-secondary">Show on Kiosk List</p>
                                    <p className="text-xs text-gray-500">Visible in staff directory</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={availability.showOnKiosk}
                                    onChange={() => setAvailability({ ...availability, showOnKiosk: !availability.showOnKiosk })}
                                    className="toggle-checkbox h-6 w-11 rounded-full border-gray-300 bg-gray-200 checked:bg-primary transition-colors"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-secondary">Hide Until Search</p>
                                    <p className="text-xs text-gray-500">Only show when searched</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={availability.hideUntilSearch}
                                    onChange={() => setAvailability({ ...availability, hideUntilSearch: !availability.hideUntilSearch })}
                                    className="toggle-checkbox h-6 w-11 rounded-full border-gray-300 bg-gray-200 checked:bg-primary transition-colors"
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Middle & Right Column - Forms */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information Form */}
                    <Card className="p-6 space-y-6">
                        <div className="flex items-center space-x-2 border-b border-gray-100 pb-4">
                            <User className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-secondary">Personal Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="First Name"
                                value={personalInfo.firstName}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                            />
                            <Input
                                label="Last Name"
                                value={personalInfo.lastName}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                            />
                            <Input
                                label="Job Title"
                                value={personalInfo.jobTitle}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, jobTitle: e.target.value })}
                                leftIcon={Briefcase}
                            />
                            <Input
                                label="Department"
                                value={personalInfo.department}
                                readOnly
                                className="bg-gray-50 text-gray-500"
                                leftIcon={Building}
                            />
                            <Input
                                label="Employee ID"
                                value={personalInfo.employeeId}
                                readOnly
                                className="bg-gray-50 text-gray-500"
                                leftIcon={Hash}
                            />
                        </div>
                    </Card>

                    {/* Contact Information */}
                    <Card className="p-6 space-y-6">
                        <div className="flex items-center space-x-2 border-b border-gray-100 pb-4">
                            <Phone className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-secondary">Contact Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Work Email"
                                value={contactInfo.email}
                                readOnly
                                className="bg-gray-50 text-gray-500"
                                leftIcon={Mail}
                            />
                            <Input
                                label="Phone Number"
                                value={contactInfo.phone}
                                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                                placeholder="+1 (555) 000-0000"
                                leftIcon={Phone}
                            />
                        </div>
                    </Card>

                    {/* Notification Preferences */}
                    <Card className="p-6 space-y-6">
                        <div className="flex items-center space-x-2 border-b border-gray-100 pb-4">
                            <Bell className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-secondary">Notification Preferences</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Visitor Arrivals</h4>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                    <span className="text-sm font-medium text-secondary">Email Notification</span>
                                    <input
                                        type="checkbox"
                                        checked={notifications.emailVisitor}
                                        onChange={() => setNotifications({ ...notifications, emailVisitor: !notifications.emailVisitor })}
                                        className="h-5 w-5 text-primary rounded"
                                    />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                    <span className="text-sm font-medium text-secondary">SMS Notification</span>
                                    <input
                                        type="checkbox"
                                        checked={notifications.smsVisitor}
                                        onChange={() => setNotifications({ ...notifications, smsVisitor: !notifications.smsVisitor })}
                                        className="h-5 w-5 text-primary rounded"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Deliveries</h4>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                    <span className="text-sm font-medium text-secondary">Email Notification</span>
                                    <input
                                        type="checkbox"
                                        checked={notifications.emailDelivery}
                                        onChange={() => setNotifications({ ...notifications, emailDelivery: !notifications.emailDelivery })}
                                        className="h-5 w-5 text-primary rounded"
                                    />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                    <span className="text-sm font-medium text-secondary">SMS Notification</span>
                                    <input
                                        type="checkbox"
                                        checked={notifications.smsDelivery}
                                        onChange={() => setNotifications({ ...notifications, smsDelivery: !notifications.smsDelivery })}
                                        className="h-5 w-5 text-primary rounded"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Security */}
                    <Card className="p-6 space-y-6">
                        <div className="flex items-center space-x-2 border-b border-gray-100 pb-4">
                            <Shield className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-secondary">Security</h3>
                        </div>

                        <div className="space-y-4">
                            <Input
                                type="password"
                                label="Current Password"
                                value={security.currentPassword}
                                onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                                leftIcon={Lock}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    type="password"
                                    label="New Password"
                                    value={security.newPassword}
                                    onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                                    leftIcon={Lock}
                                />
                                <Input
                                    type="password"
                                    label="Confirm New Password"
                                    value={security.confirmPassword}
                                    onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                                    leftIcon={Lock}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
