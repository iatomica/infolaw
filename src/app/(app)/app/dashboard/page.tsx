'use client';

import React from 'react';
import Link from 'next/link';
import { useInfoLaw } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { 
  Briefcase, 
  Users, 
  CheckSquare, 
  Calendar, 
  Receipt, 
  Clock, 
  ArrowUpRight, 
  AlertTriangle, 
  FileText, 
  Plus, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Building
} from 'lucide-react';

export default function DashboardPage() {
  const { 
    currentRole, 
    currentUser, 
    matters, 
    clients, 
    tasks, 
    calendarEvents, 
    invoices, 
    leads, 
    timeEntries,
    openQuickView 
  } = useInfoLaw();

  // Metrics
  const activeMatters = matters.filter(m => m.status !== 'CLOSED' && m.status !== 'ARCHIVED');
  const pendingTasks = tasks.filter(t => t.status !== 'COMPLETED');
  const urgentEvents = calendarEvents.slice(0, 3);
  const totalBilledMonth = invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
  const totalCollectedMonth = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const totalPendingCollection = invoices.reduce((acc, inv) => acc + inv.balance, 0);
  const totalHoursLogged = timeEntries.reduce((acc, t) => acc + t.durationHours, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Top Welcome & Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
              Sistema Operativo Ferraro & Asociados
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-mono">22 SEP 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Buenos días, {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {currentRole === 'SOCIO_DIRECTOR' && 'Panel Ejecutivo y Control de Operaciones del Estudio.'}
            {currentRole === 'ABOGADO_CONTADOR_SENIOR' && 'Gestión de Casos Asignados, Redacción Procesal y Vencimientos.'}
            {currentRole === 'ABOGADO_CONTADOR_JUNIOR' && 'Tareas Asignadas, Asistencia Contable y Presentaciones Fiscales.'}
            {currentRole === 'ADMINISTRATIVO' && 'Control de Facturación, Cobranzas y Documentación Administrativa.'}
            {currentRole === 'RECEPCION' && 'Recepción de Consultas, Asignación de Turnos y Registro de Clientes.'}
            {currentRole === 'SUPER_ADMIN' && 'Administración Global de la Organización y Auditoría de Seguridad.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/app/expedientes"
            className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-all"
          >
            <Plus size={14} />
            <span>Nuevo Expediente</span>
          </Link>
          <Link
            href="/app/clientes"
            className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Users size={14} className="text-slate-400" />
            <span>Nuevo Cliente</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards: Dynamic by Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Casos Activos */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium uppercase font-mono">Expedientes Activos</span>
            <span className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <Briefcase size={16} />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
            {activeMatters.length}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold mt-2">
            <ArrowUpRight size={13} />
            <span>5 en etapa judicial · 2 corporativos</span>
          </div>
        </div>

        {/* Card 2: Tareas Pendientes */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium uppercase font-mono">Tareas & Diligencias</span>
            <span className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <CheckSquare size={16} />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
            {pendingTasks.length}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-amber-700 font-semibold mt-2">
            <AlertTriangle size={13} />
            <span>2 con vencimiento esta semana</span>
          </div>
        </div>

        {/* Card 3: Facturación / Cobranzas */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium uppercase font-mono">Facturación Septiembre</span>
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <Receipt size={16} />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
            {formatCurrency(totalBilledMonth)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium mt-2">
            <span>Cobrado: </span>
            <span className="font-bold text-emerald-700 font-mono">{formatCurrency(totalCollectedMonth)}</span>
          </div>
        </div>

        {/* Card 4: Horas o Vencimientos */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium uppercase font-mono">Horas Registradas</span>
            <span className="p-2 rounded-lg bg-purple-50 text-purple-700">
              <Clock size={16} />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
            {totalHoursLogged.toFixed(1)} <span className="text-xs font-normal text-slate-500">hs</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium mt-2">
            <span>85% facturables a clientes</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Priorities, Matters & Agenda */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Casos de Mayor Prioridad & Actuaciones */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section: Casos / Expedientes Activos */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-amber-700" />
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Casos de Mayor Prioridad & Movimientos
                </h2>
              </div>
              <Link 
                href="/app/expedientes"
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <span>Ver todos ({matters.length})</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {matters.slice(0, 4).map((m) => (
                <div 
                  key={m.id}
                  onClick={() => openQuickView({ type: 'matter', data: m })}
                  className="p-4 hover:bg-slate-50 cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {m.internalCode}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">
                        {m.clientName}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {m.practiceArea}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                      {m.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-1">
                      <strong className="text-slate-700">Próxima acción:</strong> {m.nextAction}
                    </p>
                  </div>

                  <div className="flex items-center sm:flex-col items-end gap-1.5 shrink-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                      {m.status}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      Límite: {m.nextActionDeadline}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Tareas en Progreso */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <CheckSquare size={16} className="text-emerald-700" />
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Tareas Críticas en Ejecución
                </h2>
              </div>
              <Link 
                href="/app/tareas"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>Abrir Tablero Kanban</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {tasks.filter(t => t.status !== 'COMPLETED').slice(0, 3).map((t) => (
                <div 
                  key={t.id}
                  onClick={() => openQuickView({ type: 'task', data: t })}
                  className="p-4 hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        t.priority === 'HIGH' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {t.priority}
                      </span>
                      {t.matterTitle && (
                        <span className="text-[11px] text-amber-700 font-mono font-medium">
                          {t.matterTitle}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-900">
                      {t.title}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Responsable: <strong>{t.assignedToName}</strong>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono text-xs font-bold text-red-700">
                      {t.dueDate}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {t.checklist.filter(c => c.completed).length} / {t.checklist.length} ítems
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Audiencias, Vencimientos & Admisión */}
        <div className="space-y-6">
          
          {/* Agenda & Vencimientos */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-red-700" />
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Próximos Vencimientos & Citas
                </h2>
              </div>
              <Link 
                href="/app/calendario"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Agenda
              </Link>
            </div>

            <div className="p-4 space-y-3">
              {calendarEvents.map((evt) => (
                <div 
                  key={evt.id}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      evt.type === 'HEARING' ? 'bg-purple-100 text-purple-800' :
                      evt.type === 'TAX_DEADLINE' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {evt.type === 'HEARING' ? 'Audiencia' : evt.type === 'TAX_DEADLINE' ? 'Vencimiento Fiscal' : 'Reunión'}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-600">
                      {new Date(evt.startDate).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-slate-900">
                    {evt.title}
                  </div>

                  <div className="text-[11px] text-slate-500">
                    {evt.location}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inbound Leads / Intake CRM Widget */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-emerald-700" />
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Consultas Entrantes (CRM)
                </h2>
              </div>
              <Link 
                href="/app/crm"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Pipeline
              </Link>
            </div>

            <div className="p-4 space-y-3">
              {leads.map((l) => (
                <div key={l.id} className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{l.fullName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold">
                      {l.stage}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {l.serviceArea} {l.companyName ? `· ${l.companyName}` : ''}
                  </div>
                  <div className="text-[11px] text-amber-800 font-medium mt-1">
                    Próxima acción: {l.nextAction}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
