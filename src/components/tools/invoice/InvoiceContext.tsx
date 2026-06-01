"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { InvoiceData, LineItem } from '@/lib/types/invoice';

interface InvoiceContextType {
  data: InvoiceData;
  updateData: (updates: Partial<InvoiceData>) => void;
  addItem: () => void;
  updateItem: (id: number, field: keyof LineItem, value: string | number) => void;
  removeItem: (id: number) => void;
  moveItem: (id: number, direction: 'up' | 'down') => void;
  // Computed totals
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
}

const defaultData: InvoiceData = {
  template: 'modern',
  logoUrl: '',
  themeColor: '#1e3a8a',
  currency: '₹',
  taxType: 'Tax',
  taxRate: 0,
  discountType: 'percentage',
  discountValue: 0,
  companyName: 'Your Company LLC',
  companyDetails: '123 Business Rd.\nCity, State 12345\nhello@yourcompany.com',
  clientName: 'Acme Corp',
  clientDetails: '456 Client St.\nClient City, CC 67890',
  invoiceNumber: 'INV-2024-001',
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: '',
  paymentTerms: 'Due on Receipt',
  status: 'draft',
  items: [
    { id: 1, description: 'Web Development Services', quantity: 1, rate: 2500 },
    { id: 2, description: 'Hosting (1 Year)', quantity: 1, rate: 250 },
  ],
  notes: 'Thank you for your business. Please process payment within 15 days.',
  signature: '',
  bankDetails: '',
  upiId: '',
  paypalEmail: '',
  stripeLink: '',
};

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<InvoiceData>(defaultData);

  const updateData = (updates: Partial<InvoiceData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const addItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), description: '', quantity: 1, rate: 0 }]
    }));
  };

  const updateItem = (id: number, field: keyof LineItem, value: string | number) => {
    setData(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const removeItem = (id: number) => {
    setData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const moveItem = (id: number, direction: 'up' | 'down') => {
    setData(prev => {
      const index = prev.items.findIndex(item => item.id === id);
      if (index < 0) return prev;
      if (direction === 'up' && index === 0) return prev;
      if (direction === 'down' && index === prev.items.length - 1) return prev;

      const newItems = [...prev.items];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const temp = newItems[index];
      newItems[index] = newItems[targetIndex];
      newItems[targetIndex] = temp;

      return { ...prev, items: newItems };
    });
  };

  // Compute totals dynamically
  const subtotal = data.items.reduce((sum, item) => sum + ((Number(item.quantity) || 0) * (Number(item.rate) || 0)), 0);
  const safeDiscountValue = Number(data.discountValue) || 0;
  const safeTaxRate = Number(data.taxRate) || 0;

  const discountAmount = data.discountType === 'percentage' 
    ? (subtotal * safeDiscountValue) / 100 
    : safeDiscountValue;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const taxAmount = (discountedSubtotal * safeTaxRate) / 100;
  const total = discountedSubtotal + taxAmount;

  return (
    <InvoiceContext.Provider value={{
      data,
      updateData,
      addItem,
      updateItem,
      removeItem,
      moveItem,
      subtotal,
      taxAmount,
      discountAmount,
      total
    }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoice() {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
}
