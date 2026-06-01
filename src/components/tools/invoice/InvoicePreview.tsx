"use client";

import { useInvoice } from './InvoiceContext';
import { InvoiceData } from '@/lib/types/invoice';

export function InvoicePreview() {
  const { data, subtotal, discountAmount, taxAmount, total } = useInvoice();

  const formatMoney = (amount: number) => {
    return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const renderPaymentInfo = () => {
    if (!data.bankDetails && !data.upiId && !data.paypalEmail && !data.stripeLink && !data.notes) return null;
    return (
      <div className="pt-6 border-t border-gray-200 mt-8">
        {data.notes && (
          <div className="mb-4">
            <h3 className="text-xs font-bold uppercase text-gray-500 mb-1">Notes</h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{data.notes}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          {data.bankDetails && (
            <div>
              <h3 className="text-xs font-bold uppercase text-gray-500 mb-1">Bank Details</h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{data.bankDetails}</p>
            </div>
          )}
          <div>
            {(data.upiId || data.paypalEmail || data.stripeLink) && (
              <h3 className="text-xs font-bold uppercase text-gray-500 mb-1">Payment Links</h3>
            )}
            {data.upiId && <p className="text-sm text-gray-700">UPI: <span className="font-medium">{data.upiId}</span></p>}
            {data.paypalEmail && <p className="text-sm text-gray-700">PayPal: <span className="font-medium">{data.paypalEmail}</span></p>}
            {data.stripeLink && <p className="text-sm text-gray-700">Pay Online: <a href={data.stripeLink} className="text-blue-600 underline truncate block max-w-xs">{data.stripeLink}</a></p>}
          </div>
        </div>
      </div>
    );
  };

  const renderTable = (headerColor: string, headerTextColor: string = '#000', borderStyle: string = 'border-b-2') => (
    <table className="w-full mb-8 border-collapse">
      <thead>
        <tr className={borderStyle} style={{ borderBottomColor: headerColor, backgroundColor: headerTextColor === '#fff' ? headerColor : 'transparent' }}>
          <th className="text-left py-3 px-2 font-bold text-xs uppercase" style={{ color: headerTextColor, width: '55%' }}>Description</th>
          <th className="text-center py-3 px-2 font-bold text-xs uppercase" style={{ color: headerTextColor, width: '15%' }}>Qty</th>
          <th className="text-right py-3 px-2 font-bold text-xs uppercase" style={{ color: headerTextColor, width: '15%' }}>Rate</th>
          <th className="text-right py-3 px-2 font-bold text-xs uppercase" style={{ color: headerTextColor, width: '15%' }}>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.items.map(item => (
          <tr key={item.id} className="border-b border-gray-100">
            <td className="py-3 px-2 text-sm font-medium text-gray-900">{item.description || 'Item description'}</td>
            <td className="py-3 px-2 text-sm text-center text-gray-700">{item.quantity}</td>
            <td className="py-3 px-2 text-sm text-right text-gray-700">{data.currency}{formatMoney(item.rate)}</td>
            <td className="py-3 px-2 text-sm text-right font-bold text-gray-900">{data.currency}{formatMoney(item.quantity * item.rate)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderTotals = (accentColor: string) => (
    <div className="flex justify-end">
      <div className="w-1/2 md:w-5/12">
        <div className="flex justify-between py-1 text-sm text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">{data.currency}{formatMoney(subtotal)}</span>
        </div>
        {data.discountValue > 0 && (
          <div className="flex justify-between py-1 text-sm text-gray-600">
            <span>Discount {data.discountType === 'percentage' ? `(${data.discountValue}%)` : ''}</span>
            <span className="font-medium text-red-500">-{data.currency}{formatMoney(discountAmount)}</span>
          </div>
        )}
        {data.taxRate > 0 && (
          <div className="flex justify-between py-1 text-sm text-gray-600 border-b border-gray-200 pb-2">
            <span className="uppercase">{data.taxType} ({data.taxRate}%)</span>
            <span className="font-medium text-gray-900">{data.currency}{formatMoney(taxAmount)}</span>
          </div>
        )}
        <div className="flex justify-between py-3 items-end mt-1">
          <span className="font-bold text-lg text-gray-900">Total Due</span>
          <span className="font-black text-2xl" style={{ color: accentColor }}>{data.currency}{formatMoney(total)}</span>
        </div>
      </div>
    </div>
  );

  const TemplateModern = () => (
    <div className="bg-white text-black p-10 h-full w-full mx-auto relative font-sans">
      <div className="absolute top-0 left-0 right-0 h-4" style={{ backgroundColor: data.themeColor }} />
      <div className="flex flex-wrap justify-between items-start pt-4 border-b border-gray-200 pb-8 mb-8">
        <div className="w-[50%] pr-4">
          {data.logoUrl ? <img src={data.logoUrl} alt="Logo" className="max-h-20 max-w-[200px] object-contain mb-4" /> : <div className="h-10"></div>}
          <h2 className="text-xl font-bold" style={{ color: data.themeColor }}>{data.companyName}</h2>
          <div className="text-sm text-gray-500 whitespace-pre-wrap mt-1 leading-relaxed">{data.companyDetails}</div>
        </div>
        <div className="w-[50%] text-right pl-4">
          <h1 className="text-4xl font-black mb-2 tracking-tight uppercase" style={{ color: data.themeColor }}>INVOICE</h1>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Invoice #: <span className="font-bold text-black">{data.invoiceNumber}</span></p>
            <p>Date: <span className="font-medium text-black">{data.invoiceDate}</span></p>
            {data.dueDate && <p>Due Date: <span className="font-medium text-black">{data.dueDate}</span></p>}
            {data.paymentTerms && <p>Terms: <span className="font-medium text-black">{data.paymentTerms}</span></p>}
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-xs font-bold uppercase mb-2 text-gray-400">Billed To</h3>
        <div className="font-bold text-lg text-gray-900">{data.clientName}</div>
        <div className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{data.clientDetails}</div>
      </div>
      {renderTable(data.themeColor, data.themeColor)}
      {renderTotals(data.themeColor)}
      {renderPaymentInfo()}
    </div>
  );

  const TemplateMinimal = () => (
    <div className="bg-white text-black p-10 h-full w-full mx-auto font-serif">
      <div className="flex flex-wrap justify-between items-center mb-12">
        <div className="w-[50%]">
          {data.logoUrl ? <img src={data.logoUrl} alt="Logo" className="max-h-16 max-w-[150px] object-contain grayscale" /> : <h1 className="text-3xl font-normal tracking-widest uppercase">INVOICE</h1>}
        </div>
        <div className="w-[50%] text-right">
          {data.logoUrl && <h1 className="text-3xl font-normal tracking-widest uppercase mb-2">INVOICE</h1>}
          <div className="text-sm text-gray-500">
            {data.invoiceNumber} | {data.invoiceDate}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between mb-12">
        <div className="w-[45%]">
          <h3 className="text-xs font-bold uppercase text-gray-400 mb-2">From</h3>
          <div className="font-bold text-gray-900">{data.companyName}</div>
          <div className="text-sm text-gray-500 whitespace-pre-wrap">{data.companyDetails}</div>
        </div>
        <div className="w-[45%] text-right">
          <h3 className="text-xs font-bold uppercase text-gray-400 mb-2">Billed To</h3>
          <div className="font-bold text-gray-900">{data.clientName}</div>
          <div className="text-sm text-gray-500 whitespace-pre-wrap">{data.clientDetails}</div>
        </div>
      </div>
      {renderTable('#000', '#000', 'border-b')}
      {renderTotals('#000')}
      {renderPaymentInfo()}
    </div>
  );

  const TemplateCorporate = () => (
    <div className="bg-white text-gray-900 p-10 h-full w-full mx-auto font-sans">
      <div className="flex flex-wrap justify-between items-start mb-8 pb-8 border-b-4" style={{ borderBottomColor: data.themeColor }}>
        <div className="w-[60%] pr-4">
          <h1 className="text-4xl font-black mb-1 uppercase tracking-tight text-gray-800">INVOICE</h1>
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <span className="text-gray-500 block text-xs uppercase font-bold">Invoice #</span>
              <span className="font-medium">{data.invoiceNumber}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-xs uppercase font-bold">Date</span>
              <span className="font-medium">{data.invoiceDate}</span>
            </div>
            {data.dueDate && (
              <div>
                <span className="text-gray-500 block text-xs uppercase font-bold">Due Date</span>
                <span className="font-medium">{data.dueDate}</span>
              </div>
            )}
          </div>
        </div>
        <div className="w-[40%] text-right pl-4">
          {data.logoUrl ? <img src={data.logoUrl} alt="Logo" className="max-h-20 max-w-[200px] object-contain mb-2 ml-auto" /> : <h2 className="text-2xl font-bold" style={{ color: data.themeColor }}>{data.companyName}</h2>}
          {!data.logoUrl && <div className="text-sm text-gray-600 whitespace-pre-wrap">{data.companyDetails}</div>}
          {data.logoUrl && <div className="text-sm text-gray-600 whitespace-pre-wrap mt-2">{data.companyName}<br/>{data.companyDetails}</div>}
        </div>
      </div>
      <div className="mb-10 p-4 rounded-lg bg-gray-50 border border-gray-100">
        <h3 className="text-xs font-bold uppercase mb-2 text-gray-500">Billed To</h3>
        <div className="font-bold text-lg">{data.clientName}</div>
        <div className="text-sm text-gray-600 whitespace-pre-wrap">{data.clientDetails}</div>
      </div>
      {renderTable(data.themeColor, '#fff')}
      {renderTotals(data.themeColor)}
      {renderPaymentInfo()}
    </div>
  );

  const TemplateAgency = () => (
    <div className="bg-white text-gray-800 p-0 h-full w-full mx-auto font-sans">
      <div className="p-10 flex flex-wrap justify-between items-center text-white" style={{ backgroundColor: data.themeColor }}>
        <div className="w-[50%]">
          {data.logoUrl ? <img src={data.logoUrl} alt="Logo" className="max-h-16 max-w-[150px] object-contain brightness-0 invert" /> : <h2 className="text-3xl font-bold">{data.companyName}</h2>}
        </div>
        <div className="w-[50%] text-right">
          <h1 className="text-4xl font-black tracking-widest opacity-90">INVOICE</h1>
        </div>
      </div>
      <div className="px-10 py-8 flex flex-wrap justify-between">
        <div className="w-[45%]">
          <div className="text-sm whitespace-pre-wrap text-gray-600 mb-6">{data.companyDetails}</div>
          <h3 className="text-xs font-bold uppercase mb-1 text-gray-400">Billed To</h3>
          <div className="font-bold text-xl">{data.clientName}</div>
          <div className="text-sm text-gray-600 whitespace-pre-wrap">{data.clientDetails}</div>
        </div>
        <div className="w-[45%] text-right space-y-4">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase">Invoice Number</div>
            <div className="font-bold text-lg">{data.invoiceNumber}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase">Date of Issue</div>
            <div className="font-medium text-md">{data.invoiceDate}</div>
          </div>
          {data.dueDate && (
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase">Due Date</div>
              <div className="font-medium text-md">{data.dueDate}</div>
            </div>
          )}
        </div>
      </div>
      <div className="px-10">
        {renderTable(data.themeColor, data.themeColor)}
        <div className="p-6 rounded-xl mb-8" style={{ backgroundColor: `${data.themeColor}10` }}>
          {renderTotals(data.themeColor)}
        </div>
        {renderPaymentInfo()}
      </div>
    </div>
  );

  const TemplateFreelancer = () => (
    <div className="bg-white text-gray-900 p-10 h-full w-full mx-auto font-mono text-sm">
      <div className="flex flex-wrap justify-between border-b-2 border-black pb-6 mb-8">
        <div className="w-[50%]">
          <div className="text-2xl font-black uppercase tracking-tighter mb-2">{data.companyName}</div>
          <div className="whitespace-pre-wrap text-gray-600 leading-relaxed">{data.companyDetails}</div>
        </div>
        <div className="w-[50%] text-right">
          <div className="text-4xl font-black uppercase tracking-tighter mb-4">INVOICE</div>
          <div className="grid grid-cols-2 gap-2 text-right">
            <div className="text-gray-500">NO.</div><div className="font-bold">{data.invoiceNumber}</div>
            <div className="text-gray-500">DATE</div><div className="font-bold">{data.invoiceDate}</div>
            {data.dueDate && <><div className="text-gray-500">DUE</div><div className="font-bold">{data.dueDate}</div></>}
          </div>
        </div>
      </div>
      <div className="mb-10">
        <div className="uppercase font-bold border-b border-dashed border-gray-300 pb-2 mb-2 inline-block">CLIENT</div>
        <div className="font-bold text-lg">{data.clientName}</div>
        <div className="whitespace-pre-wrap text-gray-600">{data.clientDetails}</div>
      </div>
      {renderTable('#000', '#000', 'border-b-2')}
      {renderTotals('#000')}
      {renderPaymentInfo()}
    </div>
  );

  switch (data.template) {
    case 'minimal': return <TemplateMinimal />;
    case 'corporate': return <TemplateCorporate />;
    case 'agency': return <TemplateAgency />;
    case 'freelancer': return <TemplateFreelancer />;
    case 'modern':
    default: return <TemplateModern />;
  }
}
