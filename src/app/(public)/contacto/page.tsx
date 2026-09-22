'use client';

import React, { useState } from 'react';
import { useInfoLaw } from '@/lib/store';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Lock,
  ArrowRight
} from 'lucide-react';

export default function ContactoPage() {
  const { createLead } = useInfoLaw();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    serviceArea: 'Derecho Corporativo & M&A',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) return;

    createLead({
      fullName: formData.fullName,
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      serviceArea: formData.serviceArea,
      stage: 'NEW_LEAD',
      assignedToName: 'Dra. Martina Ferraro',
      notes: `Consulta web recibida: "${formData.message}"`,
      nextAction: 'Calificar necesidad legal y enviar propuesta inicial'
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 animate-in fade-in duration-150">
      
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest block">
          Admisión & Primer Contacto
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-950 tracking-tight">
          Solicitud de Consulta Confidencial.
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Sometemos cada asunto a análisis de conflicto de intereses y evaluación preliminar de viabilidad procesal y fiscal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Form Column */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-serif">
                Consulta Registrada Exitosamente
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                Hemos ingresado su asunto a nuestro sistema interno de admisión. Uno de nuestros socios o directores se comunicará con usted dentro de las próximas 2 horas hábiles.
              </p>
              <div className="p-4 bg-white rounded-xl border border-emerald-200 text-xs font-mono text-slate-800">
                Código de Seguimiento: <strong className="text-emerald-800">INTAKE-2026-{(Math.random()*1000).toFixed(0)}</strong>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ej: Lic. Martín Rodríguez"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Empresa / Razón Social</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Ej: Grupo Belgrano S.A."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contacto@empresa.com"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Teléfono Directo</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+54 11 ..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Área o Tipo de Asunto *</label>
                <select
                  value={formData.serviceArea}
                  onChange={e => setFormData({ ...formData, serviceArea: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <option>Derecho Corporativo & M&A</option>
                  <option>Planificación Fiscal & Defensa ARCA</option>
                  <option>Litigios Comerciales Complejos</option>
                  <option>Derecho Laboral Empresarial</option>
                  <option>Contratos Internacionales & Arbitraje</option>
                  <option>Sucesiones & Reorganizaciones Familiares</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Síntesis del Asunto</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describa brevemente los hechos, juzgado o contingencia impositiva..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg text-[11px] text-slate-500">
                <Lock size={14} className="text-amber-700 shrink-0" />
                <span>La información ingresada está protegida bajo el secreto profesional de la abogacía y ciencias económicas.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-obsidian-950 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Send size={13} className="text-amber-400" />
                <span>Enviar Consulta para Dictamen</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-5 space-y-6 text-xs text-slate-600">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h2 className="font-serif text-lg font-bold text-slate-900">
              Sede Central Bariloche & CABA
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Oficinas Centrales</strong>
                  <span>Av. Corrientes 456, Piso 12, CABA</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={16} className="text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Central Telefónica</strong>
                  <span className="font-mono">+54 11 5239-8000 (Líneas Rotativas)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={16} className="text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Recepción de Cédulas & Documentación</strong>
                  <span className="font-mono">mesadeentradas@ferraroyasoc.com.ar</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
            <h3 className="font-bold text-amber-900 text-xs">Urgencias Procesales o Medidas Cautelares</h3>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Para medidas de no innovar, embargos o allanamientos fiscales en curso, contamos con guardia legal permanente 24/7 para clientes con abono activo.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
