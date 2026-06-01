"use client";

import { useInvoice } from './InvoiceContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ArrowUp, ArrowDown, Image as ImageIcon } from 'lucide-react';
import { useRef } from 'react';

export function InvoiceEditor() {
  const { data, updateData, addItem, updateItem, removeItem, moveItem } = useInvoice();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData({ logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div className="bg-surface p-6 border border-border-section rounded-xl space-y-4">
        <h3 className="font-bold text-text-primary text-lg">Template Design</h3>
        <div className="grid grid-cols-3 gap-2">
          {['modern', 'minimal', 'corporate', 'agency', 'freelancer'].map(tpl => (
            <Button 
              key={tpl} 
              variant={data.template === tpl ? 'default' : 'outline'}
              onClick={() => updateData({ template: tpl as any })}
              className={`capitalize ${data.template === tpl ? 'bg-accent text-white' : ''}`}
            >
              {tpl}
            </Button>
          ))}
        </div>
      </div>

      {/* Branding & Design */}
      <div className="bg-surface p-6 border border-border-section rounded-xl space-y-4">
        <h3 className="font-bold text-text-primary text-lg">Branding</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-2">Company Logo</label>
            <div className="flex gap-2">
              <Button variant="outline" className="w-full bg-base" onClick={() => fileInputRef.current?.click()}>
                <ImageIcon size={16} className="mr-2" /> {data.logoUrl ? 'Change Logo' : 'Upload Logo'}
              </Button>
              {data.logoUrl && (
                <Button variant="outline" className="text-red-500 border-red-200" onClick={() => updateData({ logoUrl: '' })}>
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/png, image/jpeg" onChange={handleLogoUpload} />
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Theme Color</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={data.themeColor} onChange={e => updateData({ themeColor: e.target.value })} className="w-10 h-10 p-1 border border-border-section rounded cursor-pointer bg-base" />
              <Input value={data.themeColor} onChange={e => updateData({ themeColor: e.target.value })} className="bg-base font-mono uppercase" />
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-surface p-6 border border-border-section rounded-xl space-y-6">
        <h3 className="font-bold text-text-primary text-lg">Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-text-muted">From</h4>
            <Input value={data.companyName} onChange={e => updateData({ companyName: e.target.value })} placeholder="Company Name" className="bg-base font-bold" />
            <Textarea value={data.companyDetails} onChange={e => updateData({ companyDetails: e.target.value })} placeholder="Company Address & Details" className="bg-base min-h-[100px]" />
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-text-muted">To (Client)</h4>
            <Input value={data.clientName} onChange={e => updateData({ clientName: e.target.value })} placeholder="Client Name" className="bg-base font-bold" />
            <Textarea value={data.clientDetails} onChange={e => updateData({ clientDetails: e.target.value })} placeholder="Client Address & Details" className="bg-base min-h-[100px]" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-muted uppercase">Invoice #</label>
            <Input value={data.invoiceNumber} onChange={e => updateData({ invoiceNumber: e.target.value })} className="bg-base" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-muted uppercase">Date</label>
            <Input type="date" value={data.invoiceDate} onChange={e => updateData({ invoiceDate: e.target.value })} className="bg-base" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-muted uppercase">Due Date</label>
            <Input type="date" value={data.dueDate} onChange={e => updateData({ dueDate: e.target.value })} className="bg-base" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-muted uppercase">Terms</label>
            <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-base text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" value={data.paymentTerms} onChange={e => updateData({ paymentTerms: e.target.value })}>
              <option value="Due on Receipt">Due on Receipt</option>
              <option value="Net 15">Net 15</option>
              <option value="Net 30">Net 30</option>
              <option value="Net 60">Net 60</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="bg-surface p-6 border border-border-section rounded-xl space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-text-primary text-lg">Line Items</h3>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Currency:</label>
            <select className="h-8 px-2 rounded border border-input bg-base text-sm" value={data.currency} onChange={e => updateData({ currency: e.target.value })}>
              <option value="$">USD ($)</option>
              <option value="€">EUR (€)</option>
              <option value="£">GBP (£)</option>
              <option value="₹">INR (₹)</option>
              <option value="د.إ">AED (د.إ)</option>
              <option value="¥">JPY (¥)</option>
              <option value="A$">AUD (A$)</option>
              <option value="C$">CAD (C$)</option>
            </select>
          </div>
        </div>

        <div className="hidden sm:grid grid-cols-12 gap-2 text-xs font-bold text-text-muted uppercase px-2">
          <div className="col-span-6">Description</div>
          <div className="col-span-2 text-center">Qty</div>
          <div className="col-span-3 text-right">Rate</div>
          <div className="col-span-1"></div>
        </div>

        <div className="space-y-3">
          {data.items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-base p-3 sm:p-0 sm:bg-transparent rounded-lg border border-border-section sm:border-none relative group">
              <div className="sm:col-span-6 flex gap-2">
                <div className="flex flex-col gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity absolute -left-6 top-1/2 -translate-y-1/2 hidden sm:flex">
                  <button onClick={() => moveItem(item.id, 'up')} disabled={index === 0} className="text-text-muted hover:text-text-primary disabled:opacity-30"><ArrowUp size={12} /></button>
                  <button onClick={() => moveItem(item.id, 'down')} disabled={index === data.items.length - 1} className="text-text-muted hover:text-text-primary disabled:opacity-30"><ArrowDown size={12} /></button>
                </div>
                <Input value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} placeholder="Item description..." className="w-full bg-base" />
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <span className="sm:hidden text-xs font-bold text-text-muted w-12">Qty</span>
                <Input type="number" value={item.quantity} onChange={e => updateItem(item.id, 'quantity', Number(e.target.value))} className="w-full bg-base text-center" min={1} />
              </div>
              <div className="sm:col-span-3 flex items-center gap-2">
                <span className="sm:hidden text-xs font-bold text-text-muted w-12">Rate</span>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">{data.currency}</span>
                  <Input type="number" value={item.rate} onChange={e => updateItem(item.id, 'rate', Number(e.target.value))} className="w-full bg-base pl-6 text-right" min={0} />
                </div>
              </div>
              <div className="sm:col-span-1 flex justify-end">
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" disabled={data.items.length === 1}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={addItem} variant="outline" className="w-full border-dashed border-border-strong hover:bg-accent/5">
          <Plus size={16} className="mr-2" /> Add Line Item
        </Button>
      </div>

      {/* Finances & Settings */}
      <div className="bg-surface p-6 border border-border-section rounded-xl space-y-6">
        <h3 className="font-bold text-text-primary text-lg">Finances</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Discount Type</label>
            <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-base text-sm" value={data.discountType} onChange={e => updateData({ discountType: e.target.value as any })}>
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Discount Value</label>
            <Input type="number" value={data.discountValue || 0} onChange={e => updateData({ discountValue: Number(e.target.value) })} className="bg-base" min={0} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tax Label (e.g. GST, VAT)</label>
            <Input value={data.taxType} onChange={e => updateData({ taxType: e.target.value })} className="bg-base" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tax Rate (%)</label>
            <Input type="number" value={data.taxRate || 0} onChange={e => updateData({ taxRate: Number(e.target.value) })} className="bg-base" min={0} max={100} />
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-surface p-6 border border-border-section rounded-xl space-y-6">
        <h3 className="font-bold text-text-primary text-lg">Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Bank Details / Wire Transfer</label>
            <Textarea value={data.bankDetails} onChange={e => updateData({ bankDetails: e.target.value })} className="bg-base min-h-[80px]" placeholder="Account Name, Number, Routing/IFSC..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">UPI ID</label>
            <Input value={data.upiId} onChange={e => updateData({ upiId: e.target.value })} className="bg-base" placeholder="yourname@upi" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">PayPal Email</label>
            <Input value={data.paypalEmail} onChange={e => updateData({ paypalEmail: e.target.value })} className="bg-base" placeholder="billing@yourcompany.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Stripe / Payment Link</label>
            <Input value={data.stripeLink} onChange={e => updateData({ stripeLink: e.target.value })} className="bg-base" placeholder="https://buy.stripe.com/..." />
          </div>
        </div>
      </div>

      {/* Footer Notes */}
      <div className="bg-surface p-6 border border-border-section rounded-xl space-y-4">
        <h3 className="font-bold text-text-primary text-lg">Footer</h3>
        <div className="space-y-2">
          <label className="text-sm font-medium">Notes & Payment Instructions</label>
          <Textarea value={data.notes} onChange={e => updateData({ notes: e.target.value })} className="bg-base min-h-[100px]" placeholder="Bank details, check instructions, or thank you note..." />
        </div>
      </div>
    </div>
  );
}
