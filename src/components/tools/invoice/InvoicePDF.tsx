"use client";

import { Document, Page, Text, View, StyleSheet, Image, PDFDownloadLink, Link } from '@react-pdf/renderer';
import { useInvoice } from './InvoiceContext';
import { InvoiceData } from '@/lib/types/invoice';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';

const formatMoney = (amount: number) => {
  return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const InvoiceDocument = ({ data, subtotal, taxAmount, discountAmount, total }: { data: InvoiceData, subtotal: number, taxAmount: number, discountAmount: number, total: number }) => {
  const isValidHex = (color: string) => /^#([0-9A-F]{3}){1,2}$/i.test(color);
  const safeThemeColor = isValidHex(data.themeColor) ? data.themeColor : '#333333';

  // The default PDF fonts (Helvetica) do not support extended unicode symbols like ₹ or €.
  // We map them to safe ASCII equivalents for the PDF generation.
  const getSafeCurrency = (sym: string) => {
    const map: Record<string, string> = { '₹': 'Rs. ', '€': 'EUR ', '£': 'GBP ' };
    return map[sym] || sym;
  };
  const safeCurrency = getSafeCurrency(data.currency);

  const commonStyles = StyleSheet.create({
    tableHeaderRow: {
      flexDirection: 'row',
      paddingBottom: 5,
      marginBottom: 10
    },
    thDesc: { width: '55%', fontWeight: 'bold', textTransform: 'uppercase' },
    thQty: { width: '15%', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' },
    thRate: { width: '15%', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'right' },
    thAmt: { width: '15%', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'right' },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      paddingVertical: 8
    },
    tdDesc: { width: '55%', fontWeight: 'bold', color: '#000' },
    tdQty: { width: '15%', textAlign: 'center' },
    tdRate: { width: '15%', textAlign: 'right' },
    tdAmt: { width: '15%', fontWeight: 'bold', color: '#000', textAlign: 'right' },
    
    totalsBox: { width: '45%' },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
    totalLabel: { color: '#666' },
    totalValue: { color: '#000', fontWeight: 'bold' },
    grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, marginTop: 4 },
    grandTotalLabel: { fontSize: 14, fontWeight: 'bold', color: '#000' },
    grandTotalValue: { fontSize: 16, fontWeight: 'bold' },
    
    paymentSection: { marginTop: 20, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#eee' },
    paymentGrid: { flexDirection: 'row', justifyContent: 'space-between' },
    paymentCol: { width: '48%' },
    sectionTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 },
    pText: { color: '#444' },
    link: { color: '#2563eb', textDecoration: 'none' }
  });

  const renderTable = (headerColor: string, headerTextColor: string = '#000', borderStyle: number = 2) => (
    <View style={{ width: '100%', marginBottom: 30 }}>
      <View style={[commonStyles.tableHeaderRow, { borderBottomWidth: borderStyle, borderBottomColor: headerColor }, headerTextColor === '#fff' ? { backgroundColor: headerColor, padding: 5 } : { padding: 0 }]} fixed>
        <Text style={[commonStyles.thDesc, { color: headerTextColor }]}>Description</Text>
        <Text style={[commonStyles.thQty, { color: headerTextColor }]}>Qty</Text>
        <Text style={[commonStyles.thRate, { color: headerTextColor }]}>Rate</Text>
        <Text style={[commonStyles.thAmt, { color: headerTextColor }]}>Amount</Text>
      </View>
      {data.items.map(item => (
        <View key={item.id} style={commonStyles.tableRow} wrap={false}>
          <Text style={commonStyles.tdDesc}>{item.description || 'Item description'}</Text>
          <Text style={[commonStyles.tdQty, { color: '#444' }]}>{item.quantity}</Text>
          <Text style={[commonStyles.tdRate, { color: '#444' }]}>{safeCurrency}{formatMoney(item.rate)}</Text>
          <Text style={commonStyles.tdAmt}>{safeCurrency}{formatMoney(item.quantity * item.rate)}</Text>
        </View>
      ))}
    </View>
  );

  const renderTotals = (accentColor: string) => (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }} wrap={false}>
      <View style={commonStyles.totalsBox}>
        <View style={commonStyles.totalRow}>
          <Text style={commonStyles.totalLabel}>Subtotal</Text>
          <Text style={commonStyles.totalValue}>{safeCurrency}{formatMoney(subtotal)}</Text>
        </View>
        {data.discountValue > 0 && (
          <View style={commonStyles.totalRow}>
            <Text style={commonStyles.totalLabel}>Discount {data.discountType === 'percentage' ? `(${data.discountValue}%)` : ''}</Text>
            <Text style={[commonStyles.totalValue, { color: '#ef4444' }]}>-{safeCurrency}{formatMoney(discountAmount)}</Text>
          </View>
        )}
        {data.taxRate > 0 && (
          <View style={[commonStyles.totalRow, { borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 8 }]}>
            <Text style={[commonStyles.totalLabel, { textTransform: 'uppercase' }]}>{data.taxType} ({data.taxRate}%)</Text>
            <Text style={commonStyles.totalValue}>{safeCurrency}{formatMoney(taxAmount)}</Text>
          </View>
        )}
        <View style={commonStyles.grandTotalRow}>
          <Text style={commonStyles.grandTotalLabel}>Total Due</Text>
          <Text style={[commonStyles.grandTotalValue, { color: accentColor }]}>{safeCurrency}{formatMoney(total)}</Text>
        </View>
      </View>
    </View>
  );

  const renderPaymentInfo = () => {
    if (!data.bankDetails && !data.upiId && !data.paypalEmail && !data.stripeLink && !data.notes) return null;
    return (
      <View style={commonStyles.paymentSection} wrap={false}>
        {data.notes ? (
          <View style={{ marginBottom: 15 }}>
            <Text style={[commonStyles.sectionTitle, { color: '#666' }]}>Notes</Text>
            <Text style={commonStyles.pText}>{data.notes}</Text>
          </View>
        ) : null}
        <View style={commonStyles.paymentGrid}>
          {data.bankDetails ? (
            <View style={commonStyles.paymentCol}>
              <Text style={[commonStyles.sectionTitle, { color: '#666' }]}>Bank Details</Text>
              <Text style={commonStyles.pText}>{data.bankDetails}</Text>
            </View>
          ) : null}
          <View style={commonStyles.paymentCol}>
            {(data.upiId || data.paypalEmail || data.stripeLink) ? (
              <Text style={[commonStyles.sectionTitle, { color: '#666' }]}>Payment Links</Text>
            ) : null}
            {data.upiId ? <Text style={commonStyles.pText}>UPI: <Text style={{ fontWeight: 'bold', color: '#000' }}>{data.upiId}</Text></Text> : null}
            {data.paypalEmail ? (
              <Text style={commonStyles.pText}>PayPal: <Link src={`mailto:${data.paypalEmail}`} style={commonStyles.link}>{data.paypalEmail}</Link></Text>
            ) : null}
            {data.stripeLink ? (
              <Text style={commonStyles.pText}>Pay Online: <Link src={data.stripeLink} style={commonStyles.link}>{data.stripeLink}</Link></Text>
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  const TemplateModern = () => {
    const s = StyleSheet.create({
      page: { padding: 40, fontSize: 10, lineHeight: 1.5, color: '#333' },
      topBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 10, backgroundColor: safeThemeColor },
      header: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 20, marginBottom: 30, marginTop: 10 },
      colLeft: { width: '48%' },
      colRight: { width: '48%', alignItems: 'flex-end' },
      logo: { maxWidth: 150, maxHeight: 60, marginBottom: 10, objectFit: 'contain' },
      title: { fontSize: 32, fontWeight: 'bold', color: safeThemeColor, letterSpacing: 1, marginBottom: 15, lineHeight: 1 },
      companyName: { fontSize: 16, fontWeight: 'bold', color: safeThemeColor, marginBottom: 4 },
      metaRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 2 },
      metaLabel: { width: 60, color: '#666', textAlign: 'right', marginRight: 10 },
      metaValue: { width: 80, fontWeight: 'bold', color: '#000', textAlign: 'right' }
    });
    return (
      <Page size="A4" style={s.page}>
        <View style={s.topBar} fixed />
        <View style={s.header}>
          <View style={s.colLeft}>
            {data.logoUrl ? <Image src={data.logoUrl} style={s.logo} /> : null}
            <Text style={s.companyName}>{data.companyName}</Text>
            <Text style={{ color: '#666' }}>{data.companyDetails}</Text>
          </View>
          <View style={s.colRight}>
            <Text style={s.title}>INVOICE</Text>
            <View style={s.metaRow}><Text style={s.metaLabel}>Invoice #:</Text><Text style={s.metaValue}>{data.invoiceNumber}</Text></View>
            <View style={s.metaRow}><Text style={s.metaLabel}>Date:</Text><Text style={s.metaValue}>{data.invoiceDate}</Text></View>
            {data.dueDate ? <View style={s.metaRow}><Text style={s.metaLabel}>Due Date:</Text><Text style={s.metaValue}>{data.dueDate}</Text></View> : null}
            {data.paymentTerms ? <View style={s.metaRow}><Text style={s.metaLabel}>Terms:</Text><Text style={s.metaValue}>{data.paymentTerms}</Text></View> : null}
          </View>
        </View>
        <View style={{ marginBottom: 30 }} wrap={false}>
          <Text style={[commonStyles.sectionTitle, { color: safeThemeColor }]}>Billed To</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 4 }}>{data.clientName}</Text>
          <Text style={{ color: '#444' }}>{data.clientDetails}</Text>
        </View>
        {renderTable(safeThemeColor, safeThemeColor)}
        {renderTotals(safeThemeColor)}
        {renderPaymentInfo()}
      </Page>
    );
  };

  const TemplateMinimal = () => {
    const s = StyleSheet.create({
      page: { padding: 40, fontSize: 10, lineHeight: 1.5, color: '#000' },
      header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40, alignItems: 'center' },
      colLeft: { width: '48%' },
      colRight: { width: '48%', alignItems: 'flex-end' },
      logo: { maxWidth: 120, maxHeight: 50, objectFit: 'contain' },
      title: { fontSize: 24, letterSpacing: 2, textTransform: 'uppercase', lineHeight: 1 },
      detailsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
    });
    return (
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View style={s.colLeft}>
            {data.logoUrl ? <Image src={data.logoUrl} style={s.logo} /> : <Text style={s.title}>INVOICE</Text>}
          </View>
          <View style={s.colRight}>
            {data.logoUrl ? <Text style={[s.title, { marginBottom: 10 }]}>INVOICE</Text> : null}
            <Text style={{ color: '#666' }}>{data.invoiceNumber} | {data.invoiceDate}</Text>
          </View>
        </View>
        <View style={s.detailsRow} wrap={false}>
          <View style={s.colLeft}>
            <Text style={[commonStyles.sectionTitle, { color: '#666' }]}>From</Text>
            <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{data.companyName}</Text>
            <Text style={{ color: '#444' }}>{data.companyDetails}</Text>
          </View>
          <View style={s.colRight}>
            <Text style={[commonStyles.sectionTitle, { color: '#666' }]}>Billed To</Text>
            <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{data.clientName}</Text>
            <Text style={{ color: '#444' }}>{data.clientDetails}</Text>
          </View>
        </View>
        {renderTable('#000', '#000', 1)}
        {renderTotals('#000')}
        {renderPaymentInfo()}
      </Page>
    );
  };

  const TemplateCorporate = () => {
    const s = StyleSheet.create({
      page: { padding: 40, fontSize: 10, lineHeight: 1.5, color: '#333' },
      header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, paddingBottom: 20, borderBottomWidth: 4, borderBottomColor: safeThemeColor },
      colLeft: { width: '58%' },
      colRight: { width: '38%', alignItems: 'flex-end' },
      title: { fontSize: 36, fontWeight: 'bold', letterSpacing: -1, textTransform: 'uppercase', color: '#222', lineHeight: 1 },
      metaGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 },
      metaItem: { width: '50%', marginBottom: 10 },
      metaLabel: { fontSize: 8, fontWeight: 'bold', color: '#666', textTransform: 'uppercase' },
      metaValue: { fontWeight: 'bold', color: '#000' },
      logo: { maxWidth: 150, maxHeight: 60, marginBottom: 10, objectFit: 'contain' },
      billedBox: { backgroundColor: '#f9fafb', padding: 15, borderRadius: 4, borderWidth: 1, borderStyle: 'solid', borderColor: '#f3f4f6', marginBottom: 30 },
    });
    return (
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View style={s.colLeft}>
            <Text style={s.title}>INVOICE</Text>
            <View style={s.metaGrid}>
              <View style={s.metaItem}><Text style={s.metaLabel}>Invoice #</Text><Text style={s.metaValue}>{data.invoiceNumber}</Text></View>
              <View style={s.metaItem}><Text style={s.metaLabel}>Date</Text><Text style={s.metaValue}>{data.invoiceDate}</Text></View>
              {data.dueDate ? <View style={s.metaItem}><Text style={s.metaLabel}>Due Date</Text><Text style={s.metaValue}>{data.dueDate}</Text></View> : null}
            </View>
          </View>
          <View style={s.colRight}>
            {data.logoUrl ? <Image src={data.logoUrl} style={s.logo} /> : <Text style={{ fontSize: 20, fontWeight: 'bold', color: safeThemeColor, marginBottom: 5 }}>{data.companyName}</Text>}
            <Text style={{ color: '#666', textAlign: 'right' }}>{data.logoUrl ? `${data.companyName}\n${data.companyDetails}` : data.companyDetails}</Text>
          </View>
        </View>
        <View style={s.billedBox} wrap={false}>
          <Text style={[commonStyles.sectionTitle, { color: '#666' }]}>Billed To</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 4 }}>{data.clientName}</Text>
          <Text style={{ color: '#444' }}>{data.clientDetails}</Text>
        </View>
        {renderTable(safeThemeColor, '#fff')}
        {renderTotals(safeThemeColor)}
        {renderPaymentInfo()}
      </Page>
    );
  };

  const TemplateAgency = () => {
    const s = StyleSheet.create({
      page: { padding: 0, fontSize: 10, lineHeight: 1.5, color: '#333' },
      header: { backgroundColor: safeThemeColor, padding: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
      logo: { maxWidth: 120, maxHeight: 50, objectFit: 'contain' },
      companyName: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
      title: { fontSize: 32, fontWeight: 'bold', letterSpacing: 2, color: '#fff', opacity: 0.9, lineHeight: 1 },
      detailsRow: { paddingHorizontal: 40, paddingTop: 30, paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between' },
      colLeft: { width: '45%' },
      colRight: { width: '45%', alignItems: 'flex-end' },
    });
    return (
      <Page size="A4" style={s.page}>
        <View style={s.header} fixed>
          <View style={{ width: '50%' }}>
            {data.logoUrl ? <Image src={data.logoUrl} style={s.logo} /> : <Text style={s.companyName}>{data.companyName}</Text>}
          </View>
          <View style={{ width: '50%', alignItems: 'flex-end' }}>
            <Text style={s.title}>INVOICE</Text>
          </View>
        </View>
        <View style={s.detailsRow}>
          <View style={s.colLeft}>
            <Text style={{ color: '#666', marginBottom: 20 }}>{data.companyDetails}</Text>
            <Text style={[commonStyles.sectionTitle, { color: '#999' }]}>Billed To</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 4 }}>{data.clientName}</Text>
            <Text style={{ color: '#666' }}>{data.clientDetails}</Text>
          </View>
          <View style={s.colRight}>
            <View style={{ marginBottom: 15 }}>
              <Text style={[commonStyles.sectionTitle, { color: '#999', textAlign: 'right' }]}>Invoice Number</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{data.invoiceNumber}</Text>
            </View>
            <View style={{ marginBottom: 15 }}>
              <Text style={[commonStyles.sectionTitle, { color: '#999', textAlign: 'right' }]}>Date of Issue</Text>
              <Text style={{ fontSize: 12, fontWeight: 'normal' }}>{data.invoiceDate}</Text>
            </View>
            {data.dueDate ? (
              <View>
                <Text style={[commonStyles.sectionTitle, { color: '#999', textAlign: 'right' }]}>Due Date</Text>
                <Text style={{ fontSize: 12, fontWeight: 'normal' }}>{data.dueDate}</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={{ paddingHorizontal: 40 }}>
          {renderTable(safeThemeColor, safeThemeColor)}
          <View style={{ backgroundColor: '#f9fafb', padding: 20, borderRadius: 8, marginBottom: 30 }}>
            {renderTotals(safeThemeColor)}
          </View>
          {renderPaymentInfo()}
        </View>
      </Page>
    );
  };

  const TemplateFreelancer = () => {
    const s = StyleSheet.create({
      page: { padding: 40, fontSize: 10, lineHeight: 1.5, color: '#333' },
      header: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 2, borderBottomColor: '#000', paddingBottom: 20, marginBottom: 30 },
      colLeft: { width: '48%' },
      colRight: { width: '48%', alignItems: 'flex-end' },
      companyName: { fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 },
      title: { fontSize: 32, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 15, lineHeight: 1 },
      metaGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end' },
      metaLabel: { width: 40, color: '#666', textAlign: 'right', marginRight: 10, marginBottom: 5 },
      metaValue: { width: 70, fontWeight: 'bold', color: '#000', textAlign: 'right', marginBottom: 5 },
      clientBox: { marginBottom: 30 },
      clientLabel: { fontWeight: 'bold', borderBottomWidth: 1, borderStyle: 'dashed', borderBottomColor: '#ccc', paddingBottom: 5, marginBottom: 10, width: 60 }
    });
    return (
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View style={s.colLeft}>
            <Text style={s.companyName}>{data.companyName}</Text>
            <Text style={{ color: '#666' }}>{data.companyDetails}</Text>
          </View>
          <View style={s.colRight}>
            <Text style={s.title}>INVOICE</Text>
            <View style={s.metaGrid}>
              <Text style={s.metaLabel}>NO.</Text><Text style={s.metaValue}>{data.invoiceNumber}</Text>
              <Text style={s.metaLabel}>DATE</Text><Text style={s.metaValue}>{data.invoiceDate}</Text>
              {data.dueDate ? <Text style={s.metaLabel}>DUE</Text> : null}
              {data.dueDate ? <Text style={s.metaValue}>{data.dueDate}</Text> : null}
            </View>
          </View>
        </View>
        <View style={s.clientBox} wrap={false}>
          <Text style={s.clientLabel}>CLIENT</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 4 }}>{data.clientName}</Text>
          <Text style={{ color: '#444' }}>{data.clientDetails}</Text>
        </View>
        {renderTable('#000', '#000', 2)}
        {renderTotals('#000')}
        {renderPaymentInfo()}
      </Page>
    );
  };

  const renderTemplate = () => {
    switch (data.template) {
      case 'minimal': return <TemplateMinimal />;
      case 'corporate': return <TemplateCorporate />;
      case 'agency': return <TemplateAgency />;
      case 'freelancer': return <TemplateFreelancer />;
      case 'modern':
      default: return <TemplateModern />;
    }
  };

  return <Document>{renderTemplate()}</Document>;
};

export function DownloadInvoicePDFButton() {
  const { data, subtotal, taxAmount, discountAmount, total } = useInvoice();

  return (
    <PDFDownloadLink 
      document={<InvoiceDocument data={data} subtotal={subtotal} taxAmount={taxAmount} discountAmount={discountAmount} total={total} />} 
      fileName={`Invoice-${data.invoiceNumber || 'draft'}.pdf`}
      className="w-full h-10 block rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow bg-accent hover:bg-accent/90 text-white transition-colors"
      style={{ textDecoration: 'none' }}
    >
      {({ loading }) => (
        <span className="flex items-center justify-center w-full h-full text-sm font-medium px-4">
          {loading ? (
            <><Loader2 size={16} className="animate-spin mr-2" /> Generating...</>
          ) : (
            <><Download size={16} className="mr-2" /> Download PDF</>
          )}
        </span>
      )}
    </PDFDownloadLink>
  );
}
