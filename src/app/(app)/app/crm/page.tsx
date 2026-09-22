'use client';

import React, { useState } from 'react';
import { useInfoLaw } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { LeadStage, Lead } from '@/types';
import { 
  TrendingUp, 
  Plus, 
  Mail, 
  Phone, 
  Building2, 
  User, 
  ArrowRight, 
  Sparkles,
  DollarSign
} from 'lucide-react';

export default function CRMPage() {
  const { leads, createLead } = useInfoLaw();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newService, setNewService] = useState('Derecho Corporativo');

  const stages: { stage: LeadStage; label: string }[] = [
    { stage: 'NEW_LEAD', label: '1. Nuevo Prospecto' },
    { stage: 'CONTACTED', label: '2. Contactado' },
    { stage: 'CONSULTATION_SCHEDULED', label: '3. Consulta Agendada' },
    { stage: 'EVALUATION', label: '4. En Evaluación' },
    { stage: 'PROPOSAL_SENT', label: '5. Propuesta Enviada' },
    { stage: 'WON_CLIENT', label: '6. Ganado / Cliente' }
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName.trim()) return;
    createLead({
      fullName: newFullName,
      companyName: newCompany,
      email: newEmail,
      phone: newPhone,
      serviceArea: newService,
      stage: 'NEW_LEAD',
      assignedToName: 'Dra. Martina Ferraro',
      notes: 'Ingreso directo por CRM administrativo.',
      nextAction: 'Llamar para calificar necesidades legales/contables'
    });
    setNewFullName('');
    setNewCompany('');
    setNewEmail('');
    setNewPhone('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider block">
            Captación & Pipeline de Consultas
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            CRM & Admisión de Nuevos Clientes
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Flujo de calificación de prospectos, cotización de honorarios y conversión a clientes activos.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-all self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>Registrar Prospecto</span>
        </button>
      </div>

      {/* Pipeline Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 items-start">
        {stages.map((st) => {
          const stageLeads = leads.filter(l => l.stage === st.stage);
          return (
            <div 
              key={st.stage} 
              className="bg-slate-100/80 rounded-xl p-3 border border-slate-200 space-y-3"
            >
              <div className="flex items-center justify-between px-1">
                <span className="font-mono text-[11px] font-bold text-slate-800 uppercase tracking-tight truncate">
                  {st.label}
                </span>
                <span className="font-mono text-[10px] font-bold bg-white text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                  {stageLeads.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {stageLeads.map((lead) => (
                  <div 
                    key={lead.id} 
                    className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-2 text-xs"
                  >
                    <div className="font-bold text-slate-900 leading-tight">
                      {lead.fullName}
                    </div>

                    {lead.companyName && (
                      <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                        <Building2 size={11} className="text-slate-400" />
                        <span>{lead.companyName}</span>
                      </div>
                    )}

                    <div className="text-[11px] text-amber-800 font-mono font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {lead.serviceArea}
                    </div>

                    {lead.estimatedValue && (
                      <div className="font-mono font-bold text-slate-900 text-[11px]">
                        Est.: {formatCurrency(lead.estimatedValue)}
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 space-y-0.5">
                      <div className="text-slate-700 font-medium truncate">
                        {lead.nextAction}
                      </div>
                      <div className="text-slate-400 font-mono">
                        Resp: {lead.assignedToName.split(' ')[1] || lead.assignedToName}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal to create lead */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Registrar Nuevo Prospecto (Lead)</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={e => setNewFullName(e.target.value)}
                  placeholder="Ej: Lic. Gustavo Morales"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Empresa / Razón Social (Opcional)</label>
                <input
                  type="text"
                  value={newCompany}
                  onChange={e => setNewCompany(e.target.value)}
                  placeholder="Ej: Logística Austral S.A."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    placeholder="contacto@empresa.com"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    placeholder="+54 11 ..."
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Área Requerida</label>
                <select
                  value={newService}
                  onChange={e => setNewService(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <option>Derecho Corporativo & M&A</option>
                  <option>Litigios Comerciales & Daños</option>
                  <option>Derecho Laboral Empresarial</option>
                  <option>Planificación Fiscal & Auditoría</option>
                  <option>Contabilidad & Sueldos</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold"
                >
                  Guardar en Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
