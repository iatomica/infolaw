'use client';

import React from 'react';
import { useInfoLaw } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { Receipt, Download, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PortalFinanzasPage() {
  const { invoices } = useInfoLaw();
  const clientInvoices = invoices.filter(i => i.clientId === 'cli-2' || i.clientId === 'cli-1');

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Honorarios & Facturación
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Comprobantes emitidos por el estudio, convenios de honorarios y estado de pagos.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase border-b border-slate-200">
              <th className="p-4">N° Factura</th>
              <th className="p-4">Concepto</th>
              <th className="p-4">Fecha de Emisión</th>
              <th className="p-4">Vencimiento</th>
              <th className="p-4">Importe Total</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Comprobante</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clientInvoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-slate-900">{inv.invoiceNumber}</td>
                <td className="p-4 text-slate-700">{inv.concept}</td>
                <td className="p-4 font-mono text-slate-500">{inv.issueDate}</td>
                <td className="p-4 font-mono font-bold text-red-700">{inv.dueDate}</td>
                <td className="p-4 font-mono font-bold text-slate-900">{formatCurrency(inv.totalAmount)}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {inv.status === 'PAID' ? '✓ Pagada' : 'Pendiente de Pago'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => alert(`Descargando factura electrónica ${inv.invoiceNumber}...`)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                  >
                    <Download size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
