'use client';

import React, { useState } from 'react';
import { useInfoLaw } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { 
  Receipt, 
  DollarSign, 
  ArrowUpRight, 
  Clock, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet,
  Download
} from 'lucide-react';

export default function FinanzasPage() {
  const { invoices, payments, expenses, timeEntries, createInvoice } = useInfoLaw();
  const [subTab, setSubTab] = useState<'FACTURAS' | 'PAGOS' | 'GASTOS' | 'HORAS'>('FACTURAS');

  const totalBilled = invoices.reduce((acc, i) => acc + i.totalAmount, 0);
  const totalPaid = invoices.reduce((acc, i) => acc + i.paidAmount, 0);
  const totalPending = invoices.reduce((acc, i) => acc + i.balance, 0);
  const totalHours = timeEntries.reduce((acc, t) => acc + t.durationHours, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider block">
            Administración Financiera & Facturación
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Finanzas, Honorarios & Cobranzas
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Comprobantes de honorarios, imputación de cobros, gastos reintegrables y time-tracking.
          </p>
        </div>

        <button 
          onClick={() => alert('Emisión de Factura: Permite seleccionar cliente, alícuotas de IVA y concepto de honorarios.')}
          className="px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-all self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>Emitir Factura de Honorarios</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle">
          <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">Total Facturado</span>
          <div className="text-2xl font-black text-slate-900 mt-2 font-mono">{formatCurrency(totalBilled)}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Ejercicio vigente 2026</span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle">
          <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">Cobrado Efectivo</span>
          <div className="text-2xl font-black text-emerald-700 mt-2 font-mono">{formatCurrency(totalPaid)}</div>
          <span className="text-[11px] text-emerald-800 font-medium mt-1 block">Tasa de cobro: 68%</span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle">
          <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">Saldo Pendiente</span>
          <div className="text-2xl font-black text-amber-700 mt-2 font-mono">{formatCurrency(totalPending)}</div>
          <span className="text-[11px] text-amber-800 font-medium mt-1 block">1 comprobante en mora</span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle">
          <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">Horas Facturables</span>
          <div className="text-2xl font-black text-purple-700 mt-2 font-mono">{totalHours.toFixed(1)} hs</div>
          <span className="text-[11px] text-slate-500 mt-1 block">85% rendimiento operativo</span>
        </div>
      </div>

      {/* Subtabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold overflow-x-auto">
        {[
          { id: 'FACTURAS', label: `Facturas Emitidas (${invoices.length})` },
          { id: 'PAGOS', label: `Cobros & Pagos (${payments.length})` },
          { id: 'GASTOS', label: `Gastos del Estudio (${expenses.length})` },
          { id: 'HORAS', label: `Time Tracking (${timeEntries.length})` }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id as any)}
            className={`pb-3 px-3.5 border-b-2 transition-all whitespace-nowrap ${
              subTab === t.id
                ? 'border-amber-600 text-amber-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Facturas */}
      {subTab === 'FACTURAS' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase border-b border-slate-200">
                <th className="p-3">N° Comprobante</th>
                <th className="p-3">Cliente</th>
                <th className="p-3">Concepto</th>
                <th className="p-3">Fecha Emisión</th>
                <th className="p-3">Vencimiento</th>
                <th className="p-3">Total</th>
                <th className="p-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-900">{inv.invoiceNumber}</td>
                  <td className="p-3 font-semibold text-slate-800">{inv.clientName}</td>
                  <td className="p-3 text-slate-600 max-w-xs truncate">{inv.concept}</td>
                  <td className="p-3 font-mono text-slate-500">{inv.issueDate}</td>
                  <td className="p-3 font-mono font-bold text-red-700">{inv.dueDate}</td>
                  <td className="p-3 font-mono font-bold text-slate-900">{formatCurrency(inv.totalAmount)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' :
                      inv.status === 'OVERDUE' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Pagos */}
      {subTab === 'PAGOS' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase border-b border-slate-200">
                <th className="p-3">Ref. Pago</th>
                <th className="p-3">Factura Asociada</th>
                <th className="p-3">Cliente</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Medio de Pago</th>
                <th className="p-3 font-mono">Importe Cobrado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-slate-700 font-bold">{p.referenceCode}</td>
                  <td className="p-3 font-mono text-amber-800">{p.invoiceNumber}</td>
                  <td className="p-3 font-semibold text-slate-900">{p.clientName}</td>
                  <td className="p-3 font-mono text-slate-500">{p.date}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700">
                      {p.paymentMethod}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-bold text-emerald-700">{formatCurrency(p.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Gastos */}
      {subTab === 'GASTOS' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase border-b border-slate-200">
                <th className="p-3">Concepto</th>
                <th className="p-3">Expediente</th>
                <th className="p-3">Categoría</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Monto</th>
                <th className="p-3">Reintegrable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenses.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{e.concept}</td>
                  <td className="p-3 font-mono text-amber-800">{e.matterTitle}</td>
                  <td className="p-3 font-mono text-slate-500">{e.category}</td>
                  <td className="p-3 font-mono text-slate-500">{e.date}</td>
                  <td className="p-3 font-mono font-bold text-slate-900">{formatCurrency(e.amount)}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                      {e.isReimbursable ? 'Reintegrable' : 'Gasto Propio'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Horas */}
      {subTab === 'HORAS' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase border-b border-slate-200">
                <th className="p-3">Profesional</th>
                <th className="p-3">Expediente</th>
                <th className="p-3">Actividad</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Horas</th>
                <th className="p-3">Tarifa / Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {timeEntries.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">{t.userName}</td>
                  <td className="p-3 font-mono text-amber-800">{t.matterTitle}</td>
                  <td className="p-3 text-slate-700">{t.description}</td>
                  <td className="p-3 font-mono text-slate-500">{t.date}</td>
                  <td className="p-3 font-mono font-bold text-amber-800">{t.durationHours} hs</td>
                  <td className="p-3">
                    <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                      ${t.hourlyRate} USD · {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
