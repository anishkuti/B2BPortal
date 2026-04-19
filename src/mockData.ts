import { Subscription, Bill, PaymentMethod, UsageData, Customer, Offering, ServiceRequest, Order, Alert } from './types';

export const mockCustomers: Customer[] = [
  {
    id: 'ACC-982341',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@techsolutions.com',
    phone: '+1 (555) 012-3456',
    location: 'Austin, TX - Headquarters',
    companyName: 'TechSolutions Global Inc.',
    industry: 'Information Technology',
    tier: 'Enterprise',
    accountManager: 'Alex Rivera',
    joinedDate: 'Jan 12, 2022',
    totalLines: 42,
    activeLines: 38,
    preferences: { email: true, sms: false, phone: true, thirdParty: false, dataSharing: true },
    interactions: [
      { id: 'INT-001', type: 'Phone', date: '2024-04-10', summary: 'Discussion on 5G rollout for Austin campus', outcome: 'Technical site survey requested' },
      { id: 'INT-002', type: 'WhatsApp', date: '2024-04-12', summary: 'Quick check on regional outage status', outcome: 'Confirmed resolved' },
      { id: 'INT-003', type: 'SMS', date: '2024-04-16', summary: 'Automated notification: High usage alert', outcome: 'Acknowledged' }
    ],
    insightTitle: 'Roaming Policy Alert',
    insight: "Global roaming costs are up 30% this month. Applying the 'Global Roaming Pass+' could save this account $450 this billing cycle."
  },
  {
    id: 'ACC-552109',
    name: 'Marcus Chen',
    email: 'm.chen@chenlogistics.com',
    phone: '+1 (555) 987-6543',
    location: 'Chicago, IL - Logistics Hub',
    companyName: 'Chen Logistics & Supply',
    industry: 'Logistics',
    tier: 'Premium',
    accountManager: 'Alex Rivera',
    joinedDate: 'Mar 15, 2021',
    totalLines: 156,
    activeLines: 142,
    preferences: { email: true, sms: true, phone: false, thirdParty: false, dataSharing: false },
    interactions: [
      { id: 'INT-101', type: 'In-Person', date: '2024-03-05', summary: 'Quarterly account review and hardware refresh planning', outcome: 'Agreed on bulk upgrade for Q3' }
    ],
    insightTitle: 'Infrastructure Note',
    insight: 'Chicago logistics hub is showing 99.8% stability since the recent hardware refresh. No immediate action required, but monitoring for peak usage spikes.'
  },
  {
    id: 'ACC-110293',
    name: 'Elena Rodriguez',
    email: 'elena@rodriguez-media.io',
    phone: '+1 (555) 246-1357',
    location: 'Los Angeles, CA - Studios',
    companyName: 'Rodriguez Media Group',
    industry: 'Media & Entertainment',
    tier: 'Standard',
    accountManager: 'Sarah Mitchell',
    joinedDate: 'Nov 20, 2023',
    totalLines: 12,
    activeLines: 12,
    preferences: { email: false, sms: false, phone: true, thirdParty: true, dataSharing: true },
    interactions: [
      { id: 'INT-201', type: 'Chat', date: '2024-04-17', summary: 'Inquiry about 2Gbps fiber speed upgrade', outcome: 'Order ORD-7701 placed' }
    ],
    insightTitle: 'Optimization Opportunity',
    insight: 'The Los Angeles studio is hitting 95% bandwidth capacity during peak upload hours. Upgrading to the 5GB Fiber Link would eliminate the current bottleneck.'
  },
  {
    id: 'ACC-771100',
    name: 'David Vanderveld',
    email: 'david.v@nexus-venture.net',
    phone: '+1 (555) 777-8888',
    location: 'Silicon Valley, CA - Innovation Hub',
    companyName: 'Nexus Venture Group',
    industry: 'Venture Capital',
    tier: 'Enterprise',
    accountManager: 'Alex Rivera',
    joinedDate: 'Feb 10, 2023',
    totalLines: 85,
    activeLines: 85,
    preferences: { email: true, sms: false, phone: false, thirdParty: false, dataSharing: true },
    interactions: [
      { id: 'INT-701', type: 'Email', date: '2024-04-15', summary: 'Discussion on portfolio-wide connectivity audit', outcome: 'Meeting scheduled for next week' }
    ],
    insightTitle: 'Critical Usage Spike',
    insight: "This account has seen a 15% surge in high-bandwidth data consumption this week. We recommend an immediate transition to the 'Infinite Bandwidth+' tier to prevent significant overage charges."
  }
];

export const mockCustomerData: Record<string, {
  subscriptions: Subscription[],
  bills: Bill[],
  paymentMethods: PaymentMethod[],
  usageData: UsageData[],
  offerings: Offering[],
  serviceRequests: ServiceRequest[],
  orders: Order[],
  alerts: Alert[]
}> = {
  'ACC-982341': {
    // ... rest of the data remains similar but needs structure update
    subscriptions: [
      {
        id: 'SUB-101',
        type: 'Mobile',
        phoneNumber: '+1 (555) 123-4567',
        plan: 'Enterprise Unlimited Pro',
        status: 'Active',
        dataLimit: 'Unlimited',
        dataUsed: 42.5,
        dataTotal: 100,
        voiceUsed: 450,
        voiceTotal: 1000,
        smsUsed: 120,
        smsTotal: 200,
        monthlyCost: 65.0,
        device: 'iPhone 15 Pro',
        services: ['Unlimited Local Calls', 'Visual Voicemail', '5G Access', 'International SMS'],
        unbilledUsage: { data: 5200, voice: 450, sms: 120, estimatedCost: 12.50 }
      },
      {
        id: 'SUB-102',
        type: 'Mobile',
        phoneNumber: '+1 (555) 987-6543',
        plan: 'Enterprise Data 50GB',
        status: 'Active',
        dataLimit: '50GB',
        dataUsed: 48.2,
        dataTotal: 50,
        voiceUsed: 15,
        voiceTotal: 500,
        smsUsed: 5,
        smsTotal: 100,
        monthlyCost: 45.0,
        device: 'Samsung Galaxy S24',
        services: ['50GB Shared Data', 'Corporate VPN', 'Mobile Hotspot (15GB)'],
        unbilledUsage: { data: 1200, voice: 15, sms: 5, estimatedCost: 0 }
      },
      {
        id: 'SUB-103',
        type: 'Fiber',
        phoneNumber: 'FIB-001-TECH',
        plan: 'Gigabit Business Fiber',
        status: 'Active',
        dataLimit: 'Unlimited',
        dataUsed: 850,
        dataTotal: 1000,
        voiceUsed: 0,
        voiceTotal: 0,
        smsUsed: 0,
        smsTotal: 0,
        monthlyCost: 120.0,
        device: 'Enterprise Router X1',
        services: ['Static IP', '24/7 Priority Support', 'Managed Firewall'],
        unbilledUsage: { data: 45000, voice: 0, sms: 0, estimatedCost: 0 }
      },
      {
        id: 'SUB-104',
        type: 'Mobile',
        phoneNumber: '+1 (555) 246-1357',
        plan: 'Enterprise Starter',
        status: 'Suspended',
        dataLimit: '10GB',
        dataUsed: 0,
        dataTotal: 10,
        voiceUsed: 0,
        voiceTotal: 500,
        smsUsed: 0,
        smsTotal: 100,
        monthlyCost: 25.0,
        device: 'Pixel 8',
        services: ['10GB Data', 'Standard Voice'],
        unbilledUsage: { data: 0, voice: 0, sms: 0, estimatedCost: 0 }
      },
      {
        id: 'SUB-105',
        type: 'Mobile',
        phoneNumber: '+1 (555) 333-4444',
        plan: 'Enterprise Data 25GB',
        status: 'Active',
        dataLimit: '25GB',
        dataUsed: 12.0,
        dataTotal: 25,
        voiceUsed: 150,
        voiceTotal: 500,
        smsUsed: 200,
        smsTotal: 200,
        monthlyCost: 35.0,
        device: 'iPhone 14',
        services: ['25GB Priority Data', 'Visual Voicemail'],
        unbilledUsage: { data: 0, voice: 0, sms: 0, estimatedCost: 0 }
      },
      {
        id: 'SUB-106',
        type: 'VoIP',
        phoneNumber: 'EXT-105-TECH',
        plan: 'Cloud PBX Standard',
        status: 'Active',
        dataLimit: 'N/A',
        dataUsed: 0,
        dataTotal: 0,
        voiceUsed: 1200,
        voiceTotal: 1500,
        smsUsed: 0,
        smsTotal: 0,
        monthlyCost: 25.0,
        device: 'Polycom Desk Phone',
        services: ['Extension Dialing', 'Call Transfer'],
        unbilledUsage: { data: 0, voice: 1200, sms: 0, estimatedCost: 0 }
      },
    ],
    bills: [
      { 
        id: 'INV-2024-004', 
        date: 'Apr 01, 2024', 
        amount: 2450.75, 
        status: 'Unpaid', 
        dueDate: 'Apr 15, 2024',
        breakdown: { productCharges: 1800.00, serviceCharges: 450.75, usageCharges: 200.00 }
      },
      { 
        id: 'SUB-INV-101', 
        date: 'Apr 05, 2024', 
        amount: 85.50, 
        status: 'Unpaid', 
        dueDate: 'Apr 20, 2024', 
        subscriptionId: 'SUB-101',
        breakdown: { productCharges: 65.00, serviceCharges: 15.00, usageCharges: 5.50 }
      },
      { 
        id: 'SUB-INV-102', 
        date: 'Apr 05, 2024', 
        amount: 45.00, 
        status: 'Paid', 
        dueDate: 'Apr 20, 2024', 
        subscriptionId: 'SUB-102',
        breakdown: { productCharges: 45.00, serviceCharges: 0, usageCharges: 0 }
      },
      { id: 'INV-2024-003', date: 'Mar 01, 2024', amount: 2380.50, status: 'Paid', dueDate: 'Mar 15, 2024' },
      { id: 'INV-2024-002', date: 'Feb 01, 2024', amount: 2380.50, status: 'Paid', dueDate: 'Feb 15, 2024' },
      { id: 'INV-2024-001', date: 'Jan 01, 2024', amount: 2210.00, status: 'Paid', dueDate: 'Jan 15, 2024' },
    ],
    paymentMethods: [
      { id: 'PM-1', type: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
      { id: 'PM-2', type: 'Mastercard', last4: '8812', expiry: '08/25', isDefault: false },
      { id: 'PM-3', type: 'BACS', last4: '9901', isDefault: false, accountNumber: '88776655', sortCode: '20-30-40' },
    ],
    usageData: [
      { name: 'Mon', data: 4000, voice: 240, sms: 100 },
      { name: 'Tue', data: 3000, voice: 139, sms: 80 },
      { name: 'Wed', data: 2000, voice: 980, sms: 120 },
      { name: 'Thu', data: 2780, voice: 390, sms: 150 },
      { name: 'Fri', data: 1890, voice: 480, sms: 60 },
      { name: 'Sat', data: 2390, voice: 380, sms: 40 },
      { name: 'Sun', data: 3490, voice: 430, sms: 20 },
    ],
    offerings: [
      {
        id: 'OFF-001',
        title: 'Enterprise AI Security Suite',
        description: 'Advanced threat protection and AI-driven behavior analysis for all corporate lines.',
        category: 'Security',
        price: '$4.99/line/mo',
        benefit: 'Reduce security breaches by up to 85%',
        icon: 'ShieldAlert',
        isNew: true,
        tag: 'Recommended'
      },
      {
        id: 'OFF-002',
        title: 'Global Roaming Pass+',
        description: 'Unlimited data and calls in over 150 countries with no extra daily fees.',
        category: 'Service',
        price: '$25/line/mo',
        benefit: 'Save 40% on international travel costs',
        icon: 'Globe',
        isNew: true
      },
      {
        id: 'OFF-003',
        title: '5G Ultra Wideband Upgrade',
        description: 'Boost speeds by up to 10x in supported metropolitan areas.',
        category: 'Plan',
        price: '$10/line/mo',
        benefit: 'Unmatched speed for lightning-fast business ops',
        icon: 'Zap',
        isNew: false
      },
      {
        id: 'OFF-004',
        title: 'Unified Communications Bundle',
        description: 'Integrate your mobile, VoIP, and fiber lines into one seamless portal.',
        category: 'Service',
        price: '$50/account/mo',
        benefit: 'Improve team collaboration by 30%',
        icon: 'MessageSquare',
        isNew: true,
        tag: 'Upsell'
      }
    ],
    serviceRequests: [
      { id: 'SR-1001', subject: 'Fiber Connection Intermittent', status: 'In Progress', priority: 'High', type: 'Technical', createdAt: 'Apr 14, 2024', updatedAt: 'Apr 16, 2024' },
      { id: 'SR-1002', subject: 'Product Activation: Security Suite', status: 'Completed', priority: 'Medium', type: 'Product Activation', createdAt: 'Mar 28, 2024', updatedAt: 'Mar 30, 2024' },
      { id: 'SR-1003', subject: 'Office Relocation: Fiber Move', status: 'Pending', priority: 'High', type: 'Move', createdAt: 'Apr 17, 2024', updatedAt: 'Apr 17, 2024' },
    ],
    orders: [
      { id: 'ORD-5501', type: 'Plan Upgrade', status: 'In Progress', date: 'Apr 15, 2024', items: ['Enterprise Unlimited Pro Upgrade'], total: 120.00 },
      { id: 'ORD-5502', type: 'Product Activation', status: 'Completed', date: 'Mar 10, 2024', items: ['Cloud Security Plus'], total: 49.00 },
      { id: 'ORD-5503', type: 'Move', status: 'Order Placed', date: 'Apr 16, 2024', items: ['Business Fiber Move - Floor 2'], total: 0 },
    ],
    alerts: [
      { id: 'ALT-001', type: 'Network', severity: 'Warning', title: 'Planned Maintenance', message: 'Austin HQ fiber lines will undergo maintenance on April 20th between 02:00 - 04:00 AM CST.', timestamp: 'Apr 16, 2024' },
      { id: 'ALT-002', type: 'Billing', severity: 'Critical', title: 'Bill Past Due', message: 'Invoice INV-2024-004 is past due. Please settle to avoid service interruption.', timestamp: 'Apr 15, 2024' },
      { id: 'ALT-003', type: 'Security', severity: 'Info', title: 'New Login Detected', message: 'A new login was recorded from an unrecognized device in Austin, TX.', timestamp: 'Apr 17, 2024' }
    ]
  },
  'ACC-552109': {
    subscriptions: [
      {
        id: 'SUB-201',
        type: 'Mobile',
        phoneNumber: '+1 (555) 555-0001',
        plan: 'Logistics Fleet Pro',
        status: 'Active',
        dataLimit: 'Unlimited',
        dataUsed: 120.5,
        dataTotal: 500,
        voiceUsed: 300,
        voiceTotal: 1000,
        smsUsed: 50,
        smsTotal: 500,
        monthlyCost: 55.0,
        device: 'Zebra TC57',
        services: ['Asset Tracking', '4G LTE Backup', 'Push-to-Talk'],
        unbilledUsage: { data: 12000, voice: 300, sms: 50, estimatedCost: 0 }
      },
      {
        id: 'SUB-202',
        type: 'Mobile',
        phoneNumber: '+1 (555) 555-0002',
        plan: 'Logistics Fleet Pro',
        status: 'Active',
        dataLimit: 'Unlimited',
        dataUsed: 110.2,
        dataTotal: 500,
        voiceUsed: 250,
        voiceTotal: 1000,
        smsUsed: 40,
        smsTotal: 500,
        monthlyCost: 55.0,
        device: 'Zebra TC57',
        services: ['Asset Tracking', '4G LTE Backup', 'Push-to-Talk'],
        unbilledUsage: { data: 9500, voice: 250, sms: 40, estimatedCost: 0 }
      },
      {
        id: 'SUB-203',
        type: 'Fiber',
        phoneNumber: 'FIB-HQ-CHEN',
        plan: 'Multi-Gig Warehouse Fiber',
        status: 'Active',
        dataLimit: 'Unlimited',
        dataUsed: 4650,
        dataTotal: 5000,
        voiceUsed: 0,
        voiceTotal: 0,
        smsUsed: 0,
        smsTotal: 0,
        monthlyCost: 450.0,
        device: 'Cisco Meraki MX250',
        services: ['DDoS Protection', 'Secure SD-WAN', 'Managed Support'],
        unbilledUsage: { data: 1500000, voice: 0, sms: 0, estimatedCost: 0 }
      }
    ],
    bills: [
      { id: 'INV-CHEN-004', date: 'Apr 05, 2024', amount: 8420.50, status: 'Unpaid', dueDate: 'Apr 20, 2024' },
      { id: 'INV-CHEN-003', date: 'Mar 05, 2024', amount: 8210.00, status: 'Paid', dueDate: 'Mar 20, 2024' },
    ],
    paymentMethods: [
      { id: 'PM-CHEN-1', type: 'Mastercard', last4: '1122', expiry: '06/27', isDefault: true },
    ],
    usageData: [
      { name: 'Mon', data: 12000, voice: 1200, sms: 500 },
      { name: 'Tue', data: 11000, voice: 1100, sms: 480 },
      { name: 'Wed', data: 13000, voice: 1300, sms: 550 },
      { name: 'Thu', data: 12500, voice: 1250, sms: 520 },
      { name: 'Fri', data: 14000, voice: 1400, sms: 600 },
      { name: 'Sat', data: 8000, voice: 800, sms: 300 },
      { name: 'Sun', data: 7000, voice: 700, sms: 250 },
    ],
    offerings: [
      {
        id: 'OFF-CHEN-001',
        title: 'IoT Fleet Tracker Integration',
        description: 'Real-time tracking and logistics optimization for your entire fleet.',
        category: 'Service',
        price: '$2.00/line/mo',
        benefit: 'Increase delivery efficiency by 20%',
        icon: 'Globe',
        isNew: true,
        tag: 'Industry Best'
      },
      {
        id: 'OFF-CHEN-002',
        title: 'Unlimited Hotspot Add-on',
        description: 'Enable high-speed tethering for all fleet devices.',
        category: 'Plan',
        price: '$15/mo',
        benefit: 'Stay connected anywhere',
        icon: 'Wifi',
        isNew: false
      }
    ],
    serviceRequests: [
      { id: 'SR-2001', subject: 'Fleet Tracker Sync Issue', status: 'Pending', priority: 'Medium', type: 'Technical', createdAt: 'Apr 16, 2024', updatedAt: 'Apr 16, 2024' },
    ],
    orders: [
      { id: 'ORD-6601', type: 'New Line', status: 'Completed', date: 'Feb 20, 2024', items: ['Logistics Fleet Pro Line x5'], total: 275.00 },
    ],
    alerts: [
      { id: 'ALT-101', type: 'Network', severity: 'Critical', title: 'Regional Outage', message: 'Chicago Logistics Hub is experiencing a regional fiber outage. 4G backup is active.', timestamp: 'Apr 17, 2024' }
    ]
  },
  'ACC-110293': {
    subscriptions: [
      {
        id: 'SUB-301',
        type: 'Mobile',
        phoneNumber: '+1 (555) 000-1111',
        plan: 'Media Creator Unlimited',
        status: 'Active',
        dataLimit: 'Unlimited',
        dataUsed: 450.0,
        dataTotal: 1000,
        voiceUsed: 45,
        voiceTotal: 1000,
        smsUsed: 10,
        smsTotal: 500,
        monthlyCost: 85.0,
        device: 'iPhone 15 Pro Max',
        services: ['Content Creator Pack', 'Unlimited Uploads', 'Adobe CC Subscription Included'],
        unbilledUsage: { data: 34000, voice: 45, sms: 10, estimatedCost: 0 }
      },
      {
        id: 'SUB-302',
        type: 'VoIP',
        phoneNumber: 'VOIP-MG-HQ',
        plan: 'Cloud PBX Business',
        status: 'Active',
        dataLimit: 'N/A',
        dataUsed: 0,
        dataTotal: 0,
        voiceUsed: 1200,
        voiceTotal: 2000,
        smsUsed: 0,
        smsTotal: 0,
        monthlyCost: 35.0,
        device: 'Cisco IP Phone 8841',
        services: ['Auto-Attendant', 'Call Recording', 'International SIP Trunking'],
        unbilledUsage: { data: 0, voice: 1200, sms: 0, estimatedCost: 5.00 }
      }
    ],
    bills: [
      { id: 'INV-MG-001', date: 'Apr 12, 2024', amount: 320.45, status: 'Paid', dueDate: 'Apr 26, 2024' },
    ],
    paymentMethods: [
      { id: 'PM-MG-1', type: 'Amex', last4: '9988', expiry: '11/25', isDefault: true },
    ],
    usageData: [
      { name: 'Mon', data: 15000, voice: 100, sms: 20 },
      { name: 'Tue', data: 18000, voice: 150, sms: 30 },
      { name: 'Wed', data: 22000, voice: 200, sms: 40 },
      { name: 'Thu', data: 19000, voice: 180, sms: 35 },
      { name: 'Fri', data: 25000, voice: 300, sms: 50 },
      { name: 'Sat', data: 30000, voice: 400, sms: 60 },
      { name: 'Sun', data: 28000, voice: 350, sms: 55 },
    ],
    offerings: [
      {
        id: 'OFF-MG-001',
        title: '5G Content Creator Pass',
        description: 'Uncapped uploads for high-res video streaming and content delivery.',
        category: 'Plan',
        price: '$20/mo',
        benefit: 'Zero-latency live streaming',
        icon: 'Zap',
        isNew: true,
        tag: 'Creator Special'
      }
    ],
    serviceRequests: [],
    orders: [
      { id: 'ORD-7701', type: 'Speed Change', status: 'In Progress', date: 'Apr 17, 2024', items: ['Fiber Speed Boost 2Gbps'], total: 40.00 },
    ],
    alerts: [
      { id: 'ALT-201', type: 'Billing', severity: 'Warning', title: 'Payment Method Expiring', message: 'Your Amex card ending in 9988 expires next month. Please update your payment method.', timestamp: 'Apr 16, 2024' }
    ]
  },
  'ACC-771100': {
    subscriptions: [
      {
        id: 'SUB-701',
        type: 'Fiber',
        phoneNumber: 'FIB-NEXUS-MAIN',
        plan: 'Enterprise Platinum Fiber',
        status: 'Active',
        dataLimit: '10TB',
        dataUsed: 8.5,
        dataTotal: 10,
        voiceUsed: 0,
        voiceTotal: 0,
        smsUsed: 0,
        smsTotal: 0,
        monthlyCost: 850.0,
        device: 'Nexus Core Router',
        services: ['SLA 99.99%', 'Managed Security', 'Direct Cloud Connect'],
        unbilledUsage: { data: 1200000, voice: 0, sms: 0, estimatedCost: 150.00 }
      }
    ],
    bills: [
      { id: 'INV-NEX-004', date: 'Apr 02, 2024', amount: 980.50, status: 'Paid', dueDate: 'Apr 16, 2024' },
    ],
    paymentMethods: [
      { id: 'PM-NEX-1', type: 'Visa', last4: '0011', expiry: '05/28', isDefault: true },
    ],
    usageData: [
      { name: 'Mon', data: 45000, voice: 0, sms: 0 },
      { name: 'Tue', data: 48000, voice: 0, sms: 0 },
      { name: 'Wed', data: 52000, voice: 0, sms: 0 },
      { name: 'Thu', data: 65000, voice: 0, sms: 0 },
      { name: 'Fri', data: 88000, voice: 0, sms: 0 },
      { name: 'Sat', data: 72000, voice: 0, sms: 0 },
      { name: 'Sun', data: 75000, voice: 0, sms: 0 },
    ],
    offerings: [
      {
        id: 'OFF-NEX-001',
        title: 'Infinite Bandwidth+',
        description: 'Remove all soft-caps and enable multi-gigabit throughput across your entire fiber footprint.',
        category: 'Plan',
        price: '+$200/mo',
        benefit: 'Eliminate overage risk for high-performance teams',
        icon: 'Zap',
        isNew: true,
        tag: 'Recommended Upgrade'
      }
    ],
    serviceRequests: [],
    orders: [],
    alerts: [
      { id: 'ALT-NEX-001', type: 'Utility', severity: 'Warning', title: 'Data Threshold Reached', message: 'Main HQ line has exceeded 85% of monthly allotted data. Significant spike detected since Friday.', timestamp: 'Apr 17, 2024' }
    ]
  }
};
