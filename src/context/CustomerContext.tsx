import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Customer, Subscription, Bill, PaymentMethod, UsageData, Offering, ServiceRequest, Order, Contract, MarketingPreferences, Alert } from '../types';
import { mockCustomers, mockCustomerData } from '../mockData';

interface CustomerContextType {
  currentCustomer: Customer | null;
  subscriptions: Subscription[];
  bills: Bill[];
  paymentMethods: PaymentMethod[];
  usageData: UsageData[];
  offerings: Offering[];
  serviceRequests: ServiceRequest[];
  orders: Order[];
  contracts: Contract[];
  alerts: Alert[];
  allCustomers: Customer[];
  setCustomer: (customerId: string | null) => void;
  updatePreferences: (prefs: MarketingPreferences) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [currentCustomerId, setCurrentCustomerId] = useState<string | null>(null);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);

  const setCustomer = (customerId: string | null) => {
    if (customerId === null || customers.find(c => c.id === customerId)) {
      setCurrentCustomerId(customerId);
    }
  };

  const updatePreferences = (prefs: MarketingPreferences) => {
    if (!currentCustomerId) return;
    setCustomers(prev => prev.map(c => 
      c.id === currentCustomerId ? { ...c, preferences: prefs } : c
    ));
  };

  const currentCustomer = currentCustomerId ? customers.find(c => c.id === currentCustomerId) || null : null;
  const data = currentCustomerId ? mockCustomerData[currentCustomerId] : {
    subscriptions: [],
    bills: [],
    paymentMethods: [],
    usageData: [],
    offerings: [],
    serviceRequests: [],
    orders: [],
    contracts: [],
    alerts: []
  };

  const value = {
    currentCustomer,
    subscriptions: data.subscriptions,
    bills: data.bills,
    paymentMethods: data.paymentMethods,
    usageData: data.usageData,
    offerings: data.offerings,
    serviceRequests: data.serviceRequests,
    orders: data.orders,
    contracts: data.contracts,
    alerts: data.alerts,
    allCustomers: customers,
    setCustomer,
    updatePreferences,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
}
