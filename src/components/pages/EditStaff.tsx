import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Mail, Briefcase, Lock, Eye, Bell, MessageSquare, X } from 'lucide-react';

interface StaffFormData {
  // Basic Information
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  employeeId: string;

  // Contact Information
  workEmail: string;
  phoneNumber: string;

  // Role & Access
  role: 'admin' | 'receptionist' | 'staff';
  isActive: boolean;

  // Notification Preferences
  emailVisitorArrival: boolean;
  smsVisitorArrival: boolean;
  emailDeliveryArrival: boolean;

  // Host Visibility Settings
  visibleOnKiosk: boolean;
  hideUntilSearch: boolean;

  // Login & Security
  autoGeneratePassword: boolean;
  sendInviteEmail: boolean;
  forcePasswordReset: boolean;
}

interface EditStaffProps {
  onClose?: () => void;
  onSubmit?: (data: StaffFormData) => void;
}

export const EditStaff: React.FC<EditStaffProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<StaffFormData>({
    firstName: '',
    lastName: '',
    jobTitle: '',
    department: '',
    employeeId: '',
    workEmail: '',
    phoneNumber: '',
    role: 'staff',
    isActive: true,
    emailVisitorArrival: true,
    smsVisitorArrival: false,
    emailDeliveryArrival: true,
    visibleOnKiosk: true,
    hideUntilSearch: false,
    autoGeneratePassword: true,
    sendInviteEmail: true,
    forcePasswordReset: true,
  });

  const handleInputChange = (field: keyof StaffFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const ToggleSwitch: React.FC<{ checked: boolean; onChange: (value: boolean) => void; disabled?: boolean }> = ({ checked, onChange, disabled = false }) => (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${checked ? 'bg-primary' : 'bg-gray-300'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Create New Staff</h1>
          <p className="text-gray-500 text-sm">Add a new team member and configure their access.</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Basic Information */}
        <Card className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
            <Briefcase className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-secondary">Basic Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              required
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              required
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          </div>

          <Input
            label="Job Title"
            placeholder="e.g., Receptionist, Host"
            value={formData.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Department</label>
              <select
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Department</option>
                <option value="reception">Reception</option>
                <option value="admin">Administration</option>
                <option value="facilities">Facilities</option>
                <option value="it">IT</option>
                <option value="hr">Human Resources</option>
              </select>
            </div>
            <Input
              label="Employee ID (Optional)"
              placeholder="EMP-001"
              value={formData.employeeId}
              onChange={(e) => handleInputChange('employeeId', e.target.value)}
            />
          </div>
        </Card>

        {/* 2. Contact Information */}
        <Card className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
            <Mail className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-secondary">Contact Information</h2>
          </div>

          <Input
            label="Work Email"
            type="email"
            placeholder="john.doe@company.com"
            required
            value={formData.workEmail}
            onChange={(e) => handleInputChange('workEmail', e.target.value)}
            helperText="Used for login and notifications"
          />

          <Input
            label="Phone Number (Optional)"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            helperText="Required for SMS notifications"
          />
        </Card>

        {/* 3. Role & Access */}
        <Card className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
            <Briefcase className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-secondary">Role & Access</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="admin">Admin</option>
              <option value="receptionist">Receptionist / Front Desk</option>
              <option value="staff">Staff / Host</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
            <span className="font-medium text-secondary">Account Status</span>
            <ToggleSwitch
              checked={formData.isActive}
              onChange={(value) => handleInputChange('isActive', value)}
            />
            <span className="text-xs text-gray-500 ml-2">{formData.isActive ? 'Active' : 'Inactive'}</span>
          </div>
        </Card>

        {/* 4. Notification Preferences */}
        <Card className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-secondary">Notification Preferences (Default)</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-gray-500 mr-3" />
                <span className="font-medium text-secondary">Email when visitor arrives</span>
              </div>
              <ToggleSwitch
                checked={formData.emailVisitorArrival}
                onChange={(value) => handleInputChange('emailVisitorArrival', value)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 text-gray-500 mr-3" />
                <span className="font-medium text-secondary">SMS when visitor arrives</span>
                <span className="text-xs text-gray-500 ml-2">{formData.phoneNumber ? '' : '(phone required)'}</span>
              </div>
              <ToggleSwitch
                checked={formData.smsVisitorArrival && !!formData.phoneNumber}
                onChange={(value) => handleInputChange('smsVisitorArrival', value)}
                disabled={!formData.phoneNumber}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-gray-500 mr-3" />
                <span className="font-medium text-secondary">Email when delivery arrives</span>
              </div>
              <ToggleSwitch
                checked={formData.emailDeliveryArrival}
                onChange={(value) => handleInputChange('emailDeliveryArrival', value)}
              />
            </div>
          </div>

          <p className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
            Staff can edit these preferences later in their profile settings.
          </p>
        </Card>

        {/* 5. Host Visibility Settings */}
        <Card className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
            <Eye className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-secondary">Host Visibility Settings</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
              <span className="font-medium text-secondary">Allow visitors to find this staff on kiosk</span>
              <ToggleSwitch
                checked={formData.visibleOnKiosk}
                onChange={(value) => handleInputChange('visibleOnKiosk', value)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
              <span className="font-medium text-secondary">Hide staff until search</span>
              <ToggleSwitch
                checked={formData.hideUntilSearch}
                onChange={(value) => handleInputChange('hideUntilSearch', value)}
              />
            </div>
          </div>
        </Card>

        {/* 6. Login & Security */}
        <Card className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
            <Lock className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-secondary">Login & Security</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
              <span className="font-medium text-secondary">Auto-generate password</span>
              <ToggleSwitch
                checked={formData.autoGeneratePassword}
                onChange={(value) => handleInputChange('autoGeneratePassword', value)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
              <span className="font-medium text-secondary">Send invite email with login link</span>
              <ToggleSwitch
                checked={formData.sendInviteEmail}
                onChange={(value) => handleInputChange('sendInviteEmail', value)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
              <span className="font-medium text-secondary">Force password reset on first login</span>
              <ToggleSwitch
                checked={formData.forcePasswordReset}
                onChange={(value) => handleInputChange('forcePasswordReset', value)}
              />
            </div>
          </div>
        </Card>

        {/* 7. Actions */}
        <div className="flex gap-3 p-4 rounded-lg border border-gray-100 bg-gray-50">
          {onClose && (
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          )}
          <Button type="submit" className="flex-1">
            Create Staff
          </Button>
        </div>
      </form>
    </div>
  );
};
