import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Customer, Subscription, Bill, PaymentMethod, UsageData, Offering, Case, Order } from '../types';
import { mockCustomers, mockCustomerData } from '../mockData';

interface CustomerContextType {
  currentCustomer: Customer;
  subscriptions: Subscription[];
  bills: Bill[];
  paymentMethods: PaymentMethod[];
  usageData: UsageData[];
  offerings: Offering[];
  cases: Case[];
  orders: Order[];
  allCustomers: Customer[];
  setCustomer: (customerId: string) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [currentCustomerId, setCurrentCustomerId] = useState(mockCustomers[0].id);

  const setCustomer = (customerId: string) => {
    if (mockCustomers.find(c => c.id === customerId)) {
      setCurrentCustomerId(customerId);
    }
  };

  const currentCustomer = mockCustomers.find(c => c.id === currentCustomerId)!;
  const data = mockCustomerData[currentCustomerId];

  const value = {
    currentCustomer,
    subscriptions: data.subscriptions,
    bills: data.bills,
    paymentMethods: data.paymentMethods,
    usageData: data.usageData,
    offerings: data.offerings,
    cases: data.cases,
    orders: data.orders,
    allCustomers: mockCustomers,
    setCustomer,
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
