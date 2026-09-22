'use client';

import React from 'react';
import Link from 'next/link';
import { useInfoLaw } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { 
  Briefcase, 
  Clock, 
  Calendar, 
  FileText, 
  Receipt, 
  Upload, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  MessageSquare
} from 'lucide-react';

export default function PortalOverviewPage() {
  const { matters, documentRequests, invoices, messages, uploadRequestedDocument } = useInfoLaw();

  // Client matters (Martin Rodriguez: 'cli-2')
  const clientMatters = matters.filter(m => m.clientId === 'cli-2' || m.clientId === 'cli-1');
  const clientRequests = documentRequests.filter(r => r.clientId === 'cli-2' || r.clientId === 'cli-1');
  const clientInvoices = invoices.filter(i => i.clientId === 'cli-2' || i.clientId === 'cli-1');
  const clientMessages = messages.filter(m => m.clientId === 'cli-2' || m.clientId === 'cli-1');

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg space-y-3">
        <span className="text-[11px] font-mono uppercase text-amber-400 font-bold tracking-wider">
          Portal Privado de Clientes
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          Buenos días, Martín.
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Desde aquí podés seguir el avance de tus causas judiciales y societarias, descargar escritos presentados y cargar la documentación solicitada por tu equipo legal.
        </p>
      </div>

      {/* Grid: 3 Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Active Matters & Pending Docs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Matters */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-amber-700" />
                <h2 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                  Mis Expedientes Activos
                </h2>
              </div>
              <Link href="/portal/expedientes" className="text-xs font-semibold text-purple-700 hover:text-purple-800 flex items-center gap-1">
                <span>Ver Detalle</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="space-y-3">
              {clientMatters.slice(0, 2).map((m) => (
                <div key={m.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {m.internalCode}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                      {m.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {m.title}
                  </h3>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-700">
                    <strong className="text-slate-900 block mb-0.5">Próximo paso procesal:</strong>
                    {m.nextAction}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Letrada a cargo: <strong>Abog. Sofía Herrera</strong></span>
                    <span className="font-mono text-red-700 font-bold">Límite: {m.nextActionDeadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Document Requests from Lawyers */}
          <div className="bg-white rounded-xl border border-amber-200 shadow-subtle p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-amber-700" />
                <h2 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                  Documentación Solicitada por tu Abogado
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 font-mono">
                Atención Requerida
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {clientRequests.map((req) => (
                <div key={req.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{req.title}</span>
                    <span className="font-mono text-slate-500 text-[11px]">Vence: {req.dueDate}</span>
                  </div>
                  <p className="text-slate-600">{req.instructions}</p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      req.status === 'RECEIVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {req.status === 'RECEIVED' ? '✓ Recibido y en revisión' : 'Esperando tu archivo'}
                    </span>

                    <button
                      onClick={() => {
                        const file = prompt('Ingrese nombre del archivo PDF simulado (ej: Copia_Boleto_Firma.pdf):', 'Comprobante_Certificado.pdf');
                        if (file) uploadRequestedDocument(req.id, file);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs"
                    >
                      <Upload size={13} />
                      <span>{req.status === 'RECEIVED' ? 'Actualizar Archivo' : 'Subir Documento'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Next Hearing, Invoices & Chat */}
        <div className="space-y-6">
          
          {/* Next Event */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-5 space-y-3 text-xs">
            <span className="font-mono text-[10px] text-slate-400 font-bold uppercase block">
              Próximo Evento Notificado
            </span>
            <div className="p-3.5 rounded-lg bg-purple-50 border border-purple-200 space-y-1">
              <span className="font-bold text-purple-900 text-xs block">Inspección Pericial Ocular Inmueble</span>
              <span className="text-slate-600 text-[11px] block">Jueves 24 de Septiembre, 10:00 hs</span>
              <span className="text-[11px] text-purple-700 font-mono block">Lugar: Av. Juan B. Justo 3420</span>
            </div>
          </div>

          {/* Pending Invoices */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-5 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-900">Estado de Cuenta</span>
              <Link href="/portal/finanzas" className="text-purple-700 font-semibold hover:underline">Ver Todo</Link>
            </div>
            {clientInvoices.slice(0, 2).map((inv) => (
              <div key={inv.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-slate-900 block">{inv.invoiceNumber}</span>
                  <span className="text-slate-500 text-[10px]">Vence: {inv.dueDate}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-900 block">{formatCurrency(inv.totalAmount)}</span>
                  <span className="text-[10px] font-bold text-amber-700">{inv.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Chat Link */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-5 space-y-3 text-xs">
            <span className="font-bold text-slate-900 block">Canal Directo con tu Equipo</span>
            <p className="text-slate-600 text-[11px]">
              Tenés 2 mensajes recientes con la Abogada Sofía Herrera y la Socia Directora Martina Ferraro.
            </p>
            <Link
              href="/portal/mensajes"
              className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-center block"
            >
              Abrir Mensajería Segura
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
