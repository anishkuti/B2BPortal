export interface Subscription {
  id: string;
  type: 'Mobile' | 'Fiber' | 'VoIP';
  phoneNumber: string;
  plan: string;
  status: 'Active' | 'Suspended' | 'Pending';
  dataLimit: string;
  dataUsed: number;
  dataTotal: number;
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
  type: 'Visa' | 'Mastercard' | 'Amex' | 'BACS' | 'Debit';
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
  companyName: string;
  industry: string;
  tier: 'Enterprise' | 'Premium' | 'Standard';
  accountManager: string;
  joinedDate: string;
  totalLines: number;
  activeLines: number;
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

export interface Case {
  id: string;
  subject: string;
  status: 'Pending' | 'Completed' | 'In Progress';
  priority: 'Low' | 'Medium' | 'High';
  type: 'Technical' | 'Billing' | 'General';
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  type: 'New Line' | 'Device Change' | 'Plan Upgrade' | 'Speed Change';
  status: 'In Progress' | 'Completed' | 'Cancelled';
  date: string;
  items: string[];
  total: number;
}
