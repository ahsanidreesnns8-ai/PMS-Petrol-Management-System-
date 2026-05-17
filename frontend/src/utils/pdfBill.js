import { jsPDF } from 'jspdf';
import { getSiteConfig } from '../config/site';
import { formatCurrency, formatDateTime } from './formatters';

export function downloadBillPdf(bill) {
  const site = getSiteConfig();
  const doc = new jsPDF({ unit: 'mm', format: 'a5' });
  const w = doc.internal.pageSize.getWidth();

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, w, 32, 'F');
  doc.setTextColor(251, 191, 36);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('JUTT GM', w / 2, 14, { align: 'center' });
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(site.tagline, w / 2, 20, { align: 'center' });
  doc.text(site.address, w / 2, 26, { align: 'center' });

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('FUEL RECEIPT', 14, 42);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  const lines = [
    ['Bill No:', bill.bill_number],
    ['Date:', formatDateTime(bill.created_at)],
    ['Branch:', bill.branch?.name || site.pumpName],
    ['City:', bill.branch?.city || '—'],
    ['Customer:', bill.customer_name || 'Walk-in'],
    ['Vehicle:', bill.vehicle_number || '—'],
    ['Fuel:', `${bill.fuel?.name} (${bill.fuel?.category})`],
    ['Quantity:', `${bill.quantity} Liters`],
    ['Rate/L:', formatCurrency(bill.rate)],
    ['Subtotal:', formatCurrency(bill.subtotal)],
    [`GST (${bill.gst_percent}%):`, formatCurrency(bill.gst_amount)],
    ['Payment:', (bill.payment_method || 'cash').toUpperCase()],
  ];

  let y = 48;
  lines.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label, 14, y);
    doc.setFont('helvetica', 'normal');
    doc.text(String(value), 55, y);
    y += 7;
  });

  if (bill.payment_method === 'easypaisa' && bill.branch?.easypaisa_account) {
    doc.setFontSize(8);
    doc.text(`Easypaisa: ${bill.branch.easypaisa_account}`, 14, y + 2);
    y += 6;
  }
  if (bill.payment_method === 'jazzcash' && bill.branch?.jazzcash_account) {
    doc.text(`JazzCash: ${bill.branch.jazzcash_account}`, 14, y + 2);
    y += 6;
  }

  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.8);
  doc.line(14, y + 4, w - 14, y + 4);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 83, 9);
  doc.text(`TOTAL: ${formatCurrency(bill.total)}`, w / 2, y + 14, { align: 'center' });

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Thank you for choosing JUTT GM', w / 2, y + 24, { align: 'center' });
  doc.text('This is a computer-generated receipt.', w / 2, y + 29, { align: 'center' });

  doc.save(`JUTT-GM-${bill.bill_number}.pdf`);
}
