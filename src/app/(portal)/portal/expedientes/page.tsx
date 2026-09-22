'use client';

import React from 'react';
import { useInfoLaw } from '@/lib/store';
import { Briefcase, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function PortalExpedientesPage() {
  const { matters } = useInfoLaw();
  const clientMatters = matters.filter(m => m.clientId === 'cli-2' || m.clientId === 'cli-1');

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Mis Asuntos & Expedientes
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Evolución procesal, estado de trámites y próximos pasos consensuados con el estudio.
        </p>
      </div>

      <div className="space-y-4">
        {clientMatters.map((m) => (
          <div key={m.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                  {m.internalCode}
                </span>
                <span className="text-xs text-slate-500 font-medium">{m.practiceArea}</span>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-blue-100 text-blue-800 self-start sm:self-auto">
                {m.status}
              </span>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">{m.title}</h2>
              <p className="text-slate-600 mt-1 leading-relaxed">{m.summary}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-mono text-[11px] font-bold text-amber-900 uppercase block">
                Próxima Gestión Prevista:
              </span>
              <p className="text-slate-800 font-semibold">{m.nextAction}</p>
              <span className="text-[11px] text-slate-500 block">
                Fecha límite estimada: <strong className="text-slate-700">{m.nextActionDeadline}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px] text-slate-500">
              <div>
                <span>Juzgado / Sede: </span>
                <strong className="text-slate-800">{m.courtOrganism || 'Trámite Extrajudicial'}</strong>
              </div>
              <div>
                <span>Expediente Judicial: </span>
                <strong className="text-slate-800 font-mono">{m.courtDocketNumber || 'S/N'}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
