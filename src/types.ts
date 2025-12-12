import React from 'react';

export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'Active' | 'Pending' | 'Inactive' | 'Warning';
  lastActive: string;
  email: string;
}

export interface Visitor {
  id: string;
  name: string;
  company: string;
  email: string;
  host: string;
  purpose: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'Checked In' | 'Checked Out' | 'Expected';
  avatar: string;
  badgeNumber?: string;
  date: string;
}

export interface PreRegistration {
  id: string;
  visitorName: string;
  company: string;
  email: string;
  phone?: string;
  host: string;
  visitDate: string;
  visitTime: string;
  purpose: string;
  status: 'Upcoming' | 'Checked In' | 'Expired';
  qrCodeUrl: string;
  emailSent: boolean;
}

export interface Delivery {
  id: string;
  recipient: string;
  courier: 'UPS' | 'FedEx' | 'USPS' | 'Amazon' | 'DHL' | 'Other';
  trackingNumber: string;
  status: 'Waiting' | 'Picked Up';
  arrivalDate: string;
  pickupDate?: string;
  photoUrl?: string;
}

export interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  sub?: string;
  icon: React.ElementType;
  theme: 'gold' | 'blue' | 'green' | 'red' | 'navy';
}

export type NavItem = {
  label: string;
  icon: React.ElementType;
  id: string;
  subItems?: { label: string; id: string }[];
};

// --- Kiosk Types ---

export type KioskButtonType = 'Visit Employee' | 'Delivery' | 'Event' | 'Other';

export interface CheckInButtonConfig {
  id: string;
  label: string;
  icon: 'User' | 'Truck' | 'Calendar' | 'Package' | 'Briefcase' | 'Coffee' | 'Info';
  type: KioskButtonType;
  isEnabled: boolean;
}

export interface CheckInWorkflowConfig {
  id: string;
  buttonId: string;
  notifyType: 'employee_search' | 'specific_contact';
  specificContactEmail?: string;
  
  // Data Collection
  fields: {
    fullName: { collect: boolean; required: boolean };
    email: { collect: boolean; required: boolean };
    company: { collect: boolean; required: boolean };
    phone: { collect: boolean; required: boolean };
    host: { collect: boolean; required: boolean };
  };

  // Messages
  welcomeMessage: string;
  completionMessage: string;

  // Extra Options
  capturePhoto: boolean;
  printBadge: boolean;
  requireNda: boolean;
}