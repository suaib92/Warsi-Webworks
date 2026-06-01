export interface LineItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceData {
  template: 'modern' | 'minimal' | 'corporate' | 'agency' | 'freelancer';

  // Branding
  logoUrl?: string; // Base64
  themeColor: string; // Hex color

  // Settings
  currency: string; // e.g. '$', '€', '£', '₹', 'د.إ'
  taxType: string;
  taxRate: number; // percentage
  discountType: 'percentage' | 'fixed';
  discountValue: number;

  // Company Details
  companyName: string;
  companyDetails: string;
  
  // Client Details
  clientName: string;
  clientDetails: string;
  
  // Invoice Meta
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string; // e.g. "Net 15", "Due on Receipt"
  status: 'draft' | 'sent' | 'paid';
  
  // Line Items
  items: LineItem[];
  
  // Payment Information
  bankDetails: string;
  upiId: string;
  paypalEmail: string;
  stripeLink: string;

  // Footer
  notes: string;
  signature?: string; // Text or Base64 image
}
