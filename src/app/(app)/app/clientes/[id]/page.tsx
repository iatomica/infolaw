'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useInfoLaw } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { 
  Building2, 
  User, 
  ArrowLeft, 
  Briefcase, 
  FileText, 
  Receipt, 
  MessageSquare, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function ClienteDetailPage() {
  const params = useParams();
  const clientId = params?.id as string;
  const { clients, matters, documents, invoices, messages, openQuickView } = useInfoLaw();
  const [activeTab, setActiveTab] = useState<'RESUMEN' | 'CASOS' | 'DOCUMENTOS' | 'FINANZAS' | 'MENSAJES'>('RESUMEN');

  const client = clients.find(c => c.id === clientId) || clients[0];
  const clientMatters = matters.filter(m => m.clientId === client.id);
  const clientDocuments = documents.filter(d => d.clientId === client.id);
  const clientInvoices = invoices.filter(i => i.clientId === client.id);
  const clientMessages = messages.filter(m => m.clientId === client.id);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Back and Title */}
      <div>
        <Link 
          href="/app/clientes" 
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium mb-3"
        >
          <ArrowLeft size={14} />
          <span>Volver al Directorio de Clientes</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${
              client.type === 'COMPANY' 
                ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                : 'bg-blue-100 text-blue-900 border border-blue-300'
            }`}>
              {client.type === 'COMPANY' ? <Building2 size={24} /> : <User size={24} />}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {client.displayName}
                </h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                  {client.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                CUIT/DNI: <strong>{client.taxId}</strong> · {client.industry || 'Persona Física'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/app/expedientes"
              className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Plus size={14} />
              <span>Abrir Nuevo Expediente</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold overflow-x-auto">
        {[
          { id: 'RESUMEN', label: '1. Resumen Corporativo' },
          { id: 'CASOS', label: `2. Expedientes (${clientMatters.length})` },
          { id: 'DOCUMENTOS', label: `3. Documentos (${clientDocuments.length})` },
          { id: 'FINANZAS', label: `4. Finanzas & Facturas (${clientInvoices.length})` },
          { id: 'MENSAJES', label: `5. Comunicaciones (${clientMessages.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 px-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-amber-600 text-amber-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Resumen */}
      {activeTab === 'RESUMEN' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle space-y-4">
              <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Datos Fiscales & Societarios
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] block">Razón Social</span>
                  <span className="font-semibold text-slate-900">{client.displayName}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Identificación Tributaria</span>
                  <span className="font-mono font-semibold text-slate-900">{client.taxId}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Representante Legal</span>
                  <span className="font-semibold text-slate-900">{client.legalRepresentative || 'Titular Directo'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Rubro / Industria</span>
                  <span className="font-semibold text-slate-900">{client.industry || 'Servicios Profesionales'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Domicilio Constituido</span>
                  <span className="font-semibold text-slate-900">{client.address}, {client.city}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Acceso a Portal Clientes</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1 mt-0.5">
                    <ShieldCheck size={14} />
                    <span>Habilitado (Credenciales Activas)</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle space-y-3">
              <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Resumen de Actividad Reciente
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                El cliente mantiene relaciones activas con el estudio desde hace 2 años con cumplimiento intachable en provisión de documentación y cancelación de honorarios.
              </p>
            </div>
          </div>

          {/* Right Summary */}
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-slate-900 text-white shadow-md space-y-3">
              <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider font-bold">
                Balance Acumulado
              </span>
              <div className="text-2xl font-mono font-black">
                {formatCurrency(client.totalBilled)}
              </div>
              <span className="text-slate-400 text-xs block">
                Facturación total en el ejercicio vigente
              </span>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle space-y-3 text-xs">
              <span className="font-bold text-slate-900 block">Canales Directos</span>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail size={14} className="text-slate-400" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 font-mono">
                  <Phone size={14} className="text-slate-400" />
                  <span>{client.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Casos */}
      {activeTab === 'CASOS' && (
        <div className="space-y-3">
          {clientMatters.map(m => (
            <div 
              key={m.id}
              onClick={() => openQuickView({ type: 'matter', data: m })}
              className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {m.internalCode}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{m.practiceArea}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{m.title}</h3>
                <p className="text-xs text-slate-600">{m.summary}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                  {m.status}
                </span>
                <span className="text-[11px] text-slate-500 block mt-1 font-mono">
                  Próx. vencimiento: {m.nextActionDeadline}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Documentos */}
      {activeTab === 'DOCUMENTOS' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-subtle divide-y divide-slate-100 text-xs">
          {clientDocuments.map(doc => (
            <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-amber-600" />
                <div>
                  <div className="font-bold text-slate-900">{doc.fileName}</div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {doc.fileSize} · Subido el {doc.uploadedAt} por {doc.uploadedByName}
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
                {doc.category}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Finanzas */}
      {activeTab === 'FINANZAS' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase border-b border-slate-200">
                  <th className="p-3">Factura N°</th>
                  <th className="p-3">Concepto</th>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Importe Total</th>
                  <th className="p-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clientInvoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-800">{inv.invoiceNumber}</td>
                    <td className="p-3 text-slate-700">{inv.concept}</td>
                    <td className="p-3 text-slate-500 font-mono">{inv.issueDate}</td>
                    <td className="p-3 font-mono font-bold text-slate-900">{formatCurrency(inv.totalAmount)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Mensajes */}
      {activeTab === 'MENSAJES' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-5 space-y-4">
          <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Historial de Mensajería con el Cliente
          </h2>
          <div className="space-y-3">
            {clientMessages.map(msg => (
              <div key={msg.id} className={`p-3.5 rounded-xl border text-xs ${
                msg.senderRole === 'STAFF' ? 'bg-amber-50/50 border-amber-200 ml-8' : 'bg-slate-50 border-slate-200 mr-8'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">{msg.senderName}</span>
                  <span className="text-[10px] font-mono text-slate-400">{msg.timestamp}</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{msg.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
