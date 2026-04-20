export interface Subscription {
  id: string;
  type: 'Mobile' | 'Fibre' | 'VoIP';
  phoneNumber: string;
  plan: string;
  status: 'Active' | 'Suspended' | 'Pending';
  dataLimit: string;
  dataUsed: number;
  dataTotal: number;
  voiceUsed: number;
  voiceTotal: number;
  smsUsed: number;
  smsTotal: number;
  monthlyCost: number;
  device: string;
  services: string[]; // List of specific services/addons in this subscription
  unbilledUsage: {
    data: number; // in MB
    voice: number; // in Minutes
    sms: number;
    estimatedCost: number;
  };
}

export interface Bill {
  id: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  dueDate: string;
  subscriptionId?: string; // Optional: If present, this is a subscription-level bill
  breakdown?: {
    productCharges: number;
    serviceCharges: number;
    usageCharges: number;
  };
}

export interface PaymentMethod {
  id: string;
  type: 'Visa' | 'Mastercard' | 'Amex' | 'BACS' | 'Debit' | 'Direct Debit';
  last4: string;
  expiry?: string;
  isDefault: boolean;
  accountNumber?: string; // For BACS
  sortCode?: string; // For BACS
}

export interface UsageData {
  name: string;
  data: number;
  voice: number;
  sms: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  companyName: string;
  industry: string;
  tier: 'Enterprise' | 'Premium' | 'Standard';
  accountManager: string;
  joinedDate: string;
  totalLines: number;
  activeLines: number;
  preferences: MarketingPreferences;
  interactions: Interaction[];
  insight?: string;
  insightTitle?: string;
}

export interface Interaction {
  id: string;
  type: 'Call' | 'Email' | 'Chat' | 'In-Person' | 'SMS' | 'WhatsApp' | 'Phone';
  date: string;
  summary: string;
  outcome: string;
}

export interface MarketingPreferences {
  email: boolean;
  sms: boolean;
  phone: boolean;
  thirdParty: boolean;
  dataSharing: boolean;
}

export interface Alert {
  id: string;
  type: 'Utility' | 'Billing' | 'Security' | 'Network';
  severity: 'Info' | 'Warning' | 'Critical';
  title: string;
  message: string;
  timestamp: string;
}

export interface Offering {
  id: string;
  title: string;
  description: string;
  category: 'Plan' | 'Device' | 'Service' | 'Security';
  price: string;
  benefit: string;
  icon: string;
  isNew: boolean;
  tag?: string;
}

export interface ServiceRequest {
  id: string;
  subject: string;
  status: 'Pending' | 'Completed' | 'In Progress' | 'Action Required';
  priority: 'Low' | 'Medium' | 'High';
  type: 'Technical' | 'Billing' | 'Suspension' | 'Move' | 'Product Activation' | 'General';
  createdAt: string;
  updatedAt: string;
  subscriptionId?: string; // Associated subscription (e.g. mobile number)
}

export interface Order {
  id: string;
  type: 'New' | 'Modify' | 'Cease' | 'Move';
  segment: 'Fixed' | 'Mobile' | 'Fiber';
  status: 'Order Placed' | 'In Progress' | 'Shipped' | 'Completed' | 'Cancelled';
  date: string;
  items: string[];
  total: number;
  subscriptionId?: string; // Associated subscription/mobile number
}
