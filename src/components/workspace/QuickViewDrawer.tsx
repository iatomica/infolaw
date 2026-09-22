'use client';

import React from 'react';
import Link from 'next/link';
import { useInfoLaw } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { 
  X, 
  ExternalLink, 
  Briefcase, 
  Users, 
  Clock, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Building,
  UserCheck
} from 'lucide-react';

export const QuickViewDrawer: React.FC = () => {
  const { quickView, closeQuickView, matters, clients, tasks } = useInfoLaw();

  if (!quickView) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity" 
        onClick={closeQuickView} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-drawer border-l border-slate-200 flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              {quickView.type === 'matter' && (
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded bg-amber-100 text-amber-800">
                    <Briefcase size={16} />
                  </span>
                  <div>
                    <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {quickView.data.internalCode}
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">Expediente Jurídico / Contable</span>
                  </div>
                </div>
              )}

              {quickView.type === 'client' && (
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded bg-blue-100 text-blue-800">
                    <Users size={16} />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-900">Ficha de Cliente</span>
                    <span className="text-[11px] font-mono text-slate-500 block">CUIT: {quickView.data.taxId}</span>
                  </div>
                </div>
              )}

              {quickView.type === 'task' && (
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded bg-emerald-100 text-emerald-800">
                    <CheckCircle2 size={16} />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-900">Detalle de Tarea</span>
                    <span className="text-[11px] text-slate-500 block">Vencimiento: {quickView.data.dueDate}</span>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={closeQuickView}
              aria-label="Cerrar panel rápido"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-slate-700">
            
            {/* Matter View */}
            {quickView.type === 'matter' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {quickView.data.title}
                  </h3>
                  <p className="text-slate-600 mt-2 text-xs leading-relaxed">
                    {quickView.data.summary}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Cliente</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block">{quickView.data.clientName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Área de Práctica</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block">{quickView.data.practiceArea}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Estado</span>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                      {quickView.data.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Prioridad</span>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      quickView.data.priority === 'HIGH' ? 'bg-red-100 text-red-800' : 'bg-slate-200 text-slate-800'
                    }`}>
                      {quickView.data.priority}
                    </span>
                  </div>
                </div>

                {quickView.data.courtDocketNumber && (
                  <div className="p-3 border border-slate-200 rounded-xl">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Radicación Judicial</span>
                    <div className="font-medium text-slate-900 mt-1">{quickView.data.courtOrganism}</div>
                    <div className="font-mono text-[11px] text-amber-700 mt-0.5 font-bold">
                      Expte Judicial: {quickView.data.courtDocketNumber}
                    </div>
                  </div>
                )}

                <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl">
                  <span className="text-[10px] font-mono text-amber-800 font-bold uppercase block">Próxima Acción Procesal</span>
                  <p className="font-medium text-slate-900 mt-1">{quickView.data.nextAction}</p>
                  <span className="text-[11px] text-amber-700 mt-1 block">
                    Vencimiento límite: <strong>{quickView.data.nextActionDeadline}</strong>
                  </span>
                </div>
              </div>
            )}

            {/* Client View */}
            {quickView.type === 'client' && (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{quickView.data.displayName}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {quickView.data.status}
                    </span>
                  </div>
                  <span className="text-slate-500 text-xs mt-1 block">{quickView.data.industry || 'Persona Física'}</span>
                </div>

                <div className="space-y-2 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">DNI / CUIT</span>
                    <span className="font-mono font-semibold text-slate-800">{quickView.data.taxId}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Email Contacto</span>
                    <span className="font-medium text-slate-800">{quickView.data.email}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Teléfono</span>
                    <span className="font-medium text-slate-800">{quickView.data.phone}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Expedientes Activos</span>
                    <span className="font-bold text-amber-700">{quickView.data.activeMattersCount} casos</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Facturación Acumulada</span>
                    <span className="font-mono font-bold text-slate-900">{formatCurrency(quickView.data.totalBilled)}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-800 block mb-2">Expedientes Asociados:</span>
                  <div className="space-y-1.5">
                    {matters.filter(m => m.clientId === quickView.data.id).map(m => (
                      <div key={m.id} className="p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs">
                        <div className="font-mono text-[10px] text-amber-700 font-bold">{m.internalCode}</div>
                        <div className="font-semibold text-slate-900 mt-0.5">{m.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Task View */}
            {quickView.type === 'task' && (
              <div className="space-y-5">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                    {quickView.data.status}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2">{quickView.data.title}</h3>
                  <p className="text-slate-600 mt-2 text-xs leading-relaxed">{quickView.data.description}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Asignada a:</span>
                    <span className="font-semibold text-slate-900">{quickView.data.assignedToName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Fecha límite:</span>
                    <span className="font-mono font-semibold text-red-700">{quickView.data.dueDate}</span>
                  </div>
                  {quickView.data.matterTitle && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Expediente:</span>
                      <span className="font-medium text-amber-800 truncate max-w-[200px]">{quickView.data.matterTitle}</span>
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-800 block mb-2">Checklist de Cumplimiento:</span>
                  <div className="space-y-2">
                    {quickView.data.checklist.map(c => (
                      <div key={c.id} className="flex items-center gap-2 p-2 rounded border border-slate-200 bg-white">
                        <input type="checkbox" checked={c.completed} readOnly className="rounded text-amber-600" />
                        <span className={`text-xs ${c.completed ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                          {c.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer Navigation */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <button 
              onClick={closeQuickView}
              className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Cerrar
            </button>

            {quickView.type === 'matter' && (
              <Link 
                href={`/app/expedientes/${quickView.data.id}`}
                onClick={closeQuickView}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>Abrir Workspace 360°</span>
                <ExternalLink size={13} />
              </Link>
            )}

            {quickView.type === 'client' && (
              <Link 
                href={`/app/clientes/${quickView.data.id}`}
                onClick={closeQuickView}
                className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>Ver Ficha Completa</span>
                <ExternalLink size={13} />
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
