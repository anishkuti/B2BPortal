import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Customer, Subscription, Bill, PaymentMethod, UsageData, Offering, ServiceRequest, Order, MarketingPreferences, Alert } from '../types';
import { mockCustomers, mockCustomerData } from '../mockData';

interface CustomerContextType {
  currentCustomer: Customer;
  subscriptions: Subscription[];
  bills: Bill[];
  paymentMethods: PaymentMethod[];
  usageData: UsageData[];
  offerings: Offering[];
  serviceRequests: ServiceRequest[];
  orders: Order[];
  alerts: Alert[];
  allCustomers: Customer[];
  setCustomer: (customerId: string) => void;
  updatePreferences: (prefs: MarketingPreferences) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [currentCustomerId, setCurrentCustomerId] = useState(mockCustomers[0].id);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);

  const setCustomer = (customerId: string) => {
    if (customers.find(c => c.id === customerId)) {
      setCurrentCustomerId(customerId);
    }
  };

  const updatePreferences = (prefs: MarketingPreferences) => {
    setCustomers(prev => prev.map(c => 
      c.id === currentCustomerId ? { ...c, preferences: prefs } : c
    ));
  };

  const currentCustomer = customers.find(c => c.id === currentCustomerId)!;
  const data = mockCustomerData[currentCustomerId];

  const value = {
    currentCustomer,
    subscriptions: data.subscriptions,
    bills: data.bills,
    paymentMethods: data.paymentMethods,
    usageData: data.usageData,
    offerings: data.offerings,
    serviceRequests: data.serviceRequests,
    orders: data.orders,
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
