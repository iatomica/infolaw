'use client';

import React, { useState } from 'react';
import { useInfoLaw } from '@/lib/store';
import { CalendarEventType } from '@/types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  AlertTriangle, 
  Plus, 
  Filter,
  CheckCircle2,
  Scale,
  Receipt
} from 'lucide-react';

export default function CalendarioPage() {
  const { calendarEvents } = useInfoLaw();
  const [selectedType, setSelectedType] = useState<string>('ALL');

  const filteredEvents = calendarEvents.filter(evt => {
    if (selectedType === 'ALL') return true;
    return evt.type === selectedType;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider block">
            Agenda Unificada & Vencimientos Fatales
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Calendario de Audiencias & Vencimientos Fiscales
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Plazos procesales improrrogables, audiencias Art. 360, vencimientos ARCA/AFIP y reuniones de directorio.
          </p>
        </div>

        <button 
          onClick={() => alert('Agendar Evento: Permite programar audiencias, vencimientos procesales o reuniones con clientes.')}
          className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Agendar Audiencia / Plazo</span>
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
        {[
          { id: 'ALL', label: 'Todos los Eventos' },
          { id: 'HEARING', label: 'Audiencias Judiciales' },
          { id: 'TAX_DEADLINE', label: 'Vencimientos Fiscales (ARCA)' },
          { id: 'CLIENT_MEETING', label: 'Reuniones de Clientes' },
          { id: 'INTERNAL_REVIEW', label: 'Comité de Socios' }
        ].map(chip => (
          <button
            key={chip.id}
            onClick={() => setSelectedType(chip.id)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
              selectedType === chip.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Events Timeline / Buckets */}
      <div className="space-y-6">
        
        {/* Next 7 Days Bucket */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-mono text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-2">
              <CalendarIcon size={14} />
              <span>Próximos 7 Días (Plazos Fatales)</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">Semana 39 · Septiembre 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEvents.map((evt) => (
              <div 
                key={evt.id} 
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    evt.type === 'HEARING' ? 'bg-purple-100 text-purple-800' :
                    evt.type === 'TAX_DEADLINE' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {evt.type === 'HEARING' ? 'AUDIENCIA JUDICIAL' : evt.type === 'TAX_DEADLINE' ? 'VENCIMIENTO FISCAL' : 'REUNIÓN'}
                  </span>

                  <span className="font-mono font-bold text-xs text-slate-700">
                    {new Date(evt.startDate).toLocaleDateString('es-AR', { weekday: 'short', day: '2-digit', month: 'short' })}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {evt.title}
                </h3>

                {evt.matterTitle && (
                  <div className="text-[11px] font-mono text-amber-800 font-medium">
                    Expte: {evt.matterTitle}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-slate-400" />
                    <span>{evt.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={12} className="text-slate-400" />
                    <span>{evt.attendeeNames.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
