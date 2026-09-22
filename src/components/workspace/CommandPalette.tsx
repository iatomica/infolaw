'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useInfoLaw } from '@/lib/store';
import { 
  Search, 
  Briefcase, 
  Users, 
  CheckSquare, 
  FileText, 
  Receipt, 
  X, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    setCommandPaletteOpen, 
    matters, 
    clients, 
    tasks, 
    invoices,
    openQuickView
  } = useInfoLaw();

  const [query, setQuery] = useState('');
  const router = useRouter();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  // Reset query on open
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        matters: matters.slice(0, 3),
        clients: clients.slice(0, 3),
        tasks: tasks.slice(0, 2),
        invoices: invoices.slice(0, 2)
      };
    }

    return {
      matters: matters.filter(m => 
        m.title.toLowerCase().includes(q) || 
        m.internalCode.toLowerCase().includes(q) ||
        (m.courtDocketNumber && m.courtDocketNumber.toLowerCase().includes(q))
      ),
      clients: clients.filter(c => 
        c.displayName.toLowerCase().includes(q) || 
        c.taxId.includes(q)
      ),
      tasks: tasks.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.assignedToName.toLowerCase().includes(q)
      ),
      invoices: invoices.filter(i => 
        i.invoiceNumber.toLowerCase().includes(q) || 
        i.clientName.toLowerCase().includes(q)
      )
    };
  }, [query, matters, clients, tasks, invoices]);

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={() => setCommandPaletteOpen(false)} />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por expediente, juzgado, CUIT, cliente, tarea o factura..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button 
            onClick={() => setCommandPaletteOpen(false)}
            aria-label="Cerrar buscador"
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-3 space-y-4 flex-1">
          
          {/* Section: Expedientes */}
          {filteredResults.matters.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                <Briefcase size={12} className="text-amber-600" />
                <span>Casos & Expedientes</span>
              </div>
              <div className="mt-1 space-y-1">
                {filteredResults.matters.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setCommandPaletteOpen(false);
                      openQuickView({ type: 'matter', data: m });
                    }}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {m.internalCode}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-900">
                          {m.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {m.courtOrganism ? `${m.courtOrganism} · ` : ''}
                          {m.courtDocketNumber ? `${m.courtDocketNumber}` : ''}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Ver Ficha</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Clientes */}
          {filteredResults.clients.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                <Users size={12} className="text-blue-600" />
                <span>Clientes & Empresas</span>
              </div>
              <div className="mt-1 space-y-1">
                {filteredResults.clients.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setCommandPaletteOpen(false);
                      openQuickView({ type: 'client', data: c });
                    }}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                        {c.displayName[0]}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-900">
                          {c.displayName}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {c.taxId} · {c.type === 'COMPANY' ? 'Persona Jurídica' : 'Persona Física'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Ver Perfil</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Tareas */}
          {filteredResults.tasks.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                <CheckSquare size={12} className="text-emerald-600" />
                <span>Tareas & Vencimientos</span>
              </div>
              <div className="mt-1 space-y-1">
                {filteredResults.tasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setCommandPaletteOpen(false);
                      openQuickView({ type: 'task', data: t });
                    }}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-medium text-slate-900">
                        {t.title}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-500">Vence: {t.dueDate}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        t.priority === 'HIGH' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {t.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {filteredResults.matters.length === 0 && 
           filteredResults.clients.length === 0 && 
           filteredResults.tasks.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <p className="text-xs">No se encontraron resultados para "{query}"</p>
            </div>
          )}

        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>Navegar con teclado</span>
            <span>·</span>
            <span>ESC para cerrar</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-amber-700">
            <Sparkles size={12} />
            <span>Lexios Search OS</span>
          </div>
        </div>

      </div>

    </div>
  );
};
