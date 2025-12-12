import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { 
  Building, MapPin, Globe, Phone, Mail, 
  Clock, Save, AlertTriangle, User
} from 'lucide-react';
import type { CompanyProfileProps } from './types';

export const CompanyProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: 'GO-GREEN Enterprise',
    website: 'https://gogreen.com',
    phone: '+1 (555) 123-4567',
    email: 'contact@gogreen.com',
    address: '123 Sustainability Blvd',
    city: 'San Francisco',
    state: 'CA',
    country: 'United States',
    zipCode: '94105',
    adminName: 'Mr. Martin',
    adminEmail: 'martin@pbd.com',
    timezone: 'America/Los_Angeles',
    businessStart: '09:00',
    businessEnd: '17:00'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Mock save action
    alert('Company profile settings saved successfully.');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Company Profile</h1>
          <p className="text-gray-500 text-sm">Manage your organization's general information and branding details.</p>
        </div>
        <Button leftIcon={Save} onClick={handleSave}>Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* General Information */}
        <Card className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
            <Building className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-secondary">General Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Company Name" 
              name="companyName" 
              value={formData.companyName} 
              onChange={handleChange} 
              icon={Building}
            />
            <Input 
              label="Website" 
              name="website" 
              value={formData.website} 
              onChange={handleChange} 
              icon={Globe}
              placeholder="https://"
            />
            <Input 
              label="Main Phone Number" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              icon={Phone}
            />
            <Input 
              label="Main Email Address" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              icon={Mail}
            />
          </div>
        </Card>

        {/* Address */}
        <Card className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-secondary">Location Address</h2>
          </div>
          
          <div className="space-y-4">
            <Input 
              label="Street Address" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2 md:col-span-2">
                 <Input 
                  label="City" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                />
              </div>
              <Input 
                label="State / Province" 
                name="state" 
                value={formData.state} 
                onChange={handleChange} 
              />
              <Input 
                label="Postal Code" 
                name="zipCode" 
                value={formData.zipCode} 
                onChange={handleChange} 
              />
            </div>
            <div className="w-full">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Country</label>
              <select 
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-surface-subtle border border-gray-200 text-secondary rounded-xl py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Regional & Admin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-secondary">Regional Settings</h2>
            </div>
            
            <div className="space-y-4">
               <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Timezone</label>
                  <select 
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    className="w-full bg-surface-subtle border border-gray-200 text-secondary rounded-xl py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="America/Los_Angeles">(GMT-08:00) Pacific Time</option>
                    <option value="America/New_York">(GMT-05:00) Eastern Time</option>
                    <option value="Europe/London">(GMT+00:00) London</option>
                    <option value="Asia/Tokyo">(GMT+09:00) Tokyo</option>
                  </select>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <Input 
                    type="time" 
                    label="Business Start" 
                    name="businessStart"
                    value={formData.businessStart}
                    onChange={handleChange}
                  />
                  <Input 
                    type="time" 
                    label="Business End" 
                    name="businessEnd"
                    value={formData.businessEnd}
                    onChange={handleChange}
                  />
               </div>
            </div>
          </Card>

          <Card className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-secondary">Primary Admin</h2>
            </div>
            
            <div className="space-y-4">
               <Input 
                  label="Admin Name" 
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  icon={User}
                />
                <Input 
                  label="Admin Email" 
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  icon={Mail}
                />
                <div className="bg-blue-50 p-3 rounded-xl flex items-start mt-2">
                   <div className="mr-3 mt-0.5 text-blue-600">
                     <AlertTriangle className="w-4 h-4" />
                   </div>
                   <p className="text-xs text-blue-800 leading-relaxed">
                     Changing the primary admin email may require re-verification. Ensure this contact is always available.
                   </p>
                </div>
            </div>
          </Card>
        </div>

        {/* Danger Zone */}
        <Card className="border-red-100 bg-red-50/30">
           <div className="flex items-center space-x-2 border-b border-red-100 pb-4 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-bold text-red-700">Danger Zone</h2>
           </div>
           
           <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                 <h4 className="font-bold text-secondary text-sm">Delete Organization Account</h4>
                 <p className="text-xs text-gray-500 mt-1 max-w-md">
                   Permanently remove your organization, all visitor logs, delivery records, and employee data. This action cannot be undone.
                 </p>
              </div>
              <Button variant="danger" size="sm">Delete Account</Button>
           </div>
        </Card>
      </div>
    </div>
  );
};
