'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useInfoLaw } from '@/lib/store';
import { MatterStatus, PriorityLevel } from '@/types';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Plus, 
  ArrowRight, 
  Clock, 
  Calendar, 
  AlertCircle, 
  Building2, 
  User,
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';

export default function ExpedientesPage() {
  const { matters, openQuickView } = useInfoLaw();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [practiceFilter, setPracticeFilter] = useState<string>('ALL');

  const filteredMatters = useMemo(() => {
    return matters.filter(m => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        m.title.toLowerCase().includes(q) ||
        m.internalCode.toLowerCase().includes(q) ||
        (m.courtDocketNumber && m.courtDocketNumber.toLowerCase().includes(q)) ||
        m.clientName.toLowerCase().includes(q) ||
        (m.opposingParty && m.opposingParty.toLowerCase().includes(q));

      const matchesStatus = statusFilter === 'ALL' || m.status === statusFilter;
      const matchesPractice = practiceFilter === 'ALL' || m.practiceArea.toLowerCase().includes(practiceFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesPractice;
    });
  }, [matters, searchQuery, statusFilter, practiceFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider block">
            Gestión de Casos & Obligaciones
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Expedientes & Asuntos Jurídico-Contables
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Seguimiento procesal, estructuraciones corporativas, auditorías tributarias y diligencias.
          </p>
        </div>

        <button 
          onClick={() => alert('Apertura de Expediente: Permite caratular un nuevo caso, asignar cliente, letrado responsable, radicación judicial y vencimientos.')}
          className="px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-all self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>Apertura de Expediente</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-subtle">
        
        {/* Search */}
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por carátula, número de expediente judicial, cliente o radicación..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 w-full lg:w-auto overflow-x-auto text-xs">
          {[
            { id: 'ALL', label: 'Todos' },
            { id: 'COURT_STAGE', label: 'Etapa Judicial' },
            { id: 'ACTIVE', label: 'Activo' },
            { id: 'WAITING_CLIENT', label: 'Esp. Cliente' },
            { id: 'NEGOTIATION', label: 'Negociación' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Matters List Cards */}
      <div className="space-y-3">
        {filteredMatters.map((matter) => (
          <div
            key={matter.id}
            onClick={() => openQuickView({ type: 'matter', data: matter })}
            className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group"
          >
            <div className="space-y-2 flex-1">
              
              {/* Badges bar */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {matter.internalCode}
                </span>

                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  {matter.clientName}
                </span>

                <span className="text-slate-300">·</span>

                <span className="text-[11px] font-mono text-slate-500">
                  {matter.practiceArea}
                </span>

                {matter.courtDocketNumber && (
                  <span className="text-[11px] font-mono font-bold text-amber-900 bg-amber-100/50 px-2 py-0.5 rounded">
                    {matter.courtDocketNumber}
                  </span>
                )}
              </div>

              {/* Title & summary */}
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                  {matter.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {matter.summary}
                </p>
              </div>

              {/* Court organism & next action */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
                {matter.courtOrganism && (
                  <span>
                    Radicación: <strong className="text-slate-700">{matter.courtOrganism}</strong>
                  </span>
                )}
                <span>
                  Contraparte: <strong className="text-slate-700">{matter.opposingParty || 'N/A'}</strong>
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-xs">
                <span className="font-mono text-[10px] text-amber-800 uppercase font-bold block">
                  Próxima Actuación Procesal:
                </span>
                <span className="text-slate-800 font-medium">{matter.nextAction}</span>
                <span className="text-amber-800 font-mono font-bold ml-2">
                  (Límite: {matter.nextActionDeadline})
                </span>
              </div>

            </div>

            {/* Right Meta & Actions */}
            <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded text-[11px] font-bold bg-blue-100 text-blue-800">
                  {matter.status}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  matter.priority === 'HIGH' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                }`}>
                  {matter.priority}
                </span>
              </div>

              <Link
                href={`/app/expedientes/${matter.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition-all"
              >
                <span>Workspace 360°</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
