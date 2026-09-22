'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Scale, Receipt, ShieldCheck, Building2, Users, Landmark } from 'lucide-react';

export default function AreasPage() {
  const practices = [
    {
      category: 'DERECHO & LITIGIOS',
      title: 'Derecho Corporativo, M&A & Estructuraciones',
      desc: 'Asesoramos en la constitución de sociedades anónimas, SAS y SRL, convenios de accionistas con cláusulas de arrastre y acompañamiento, rondas de capital y reorganizaciones societarias.',
      items: ['Inscripciones y Dictámenes IGJ', 'Fusiones y Adquisiciones', 'Gobierno Corporativo y Compliance']
    },
    {
      category: 'CONTABILIDAD & TRIBUTACIÓN',
      title: 'Planificación Fiscal & Defensa ante ARCA (AFIP)',
      desc: 'Estructuración tributaria integral para optimizar la carga impositiva nacional, provincial y municipal. Patrocinio en fiscalizaciones complejas y ante el Tribunal Fiscal de la Nación.',
      items: ['Inspecciones de ARCA y AGIP', 'Precios de Transferencia', 'Impuesto a las Ganancias y Bienes Personales']
    },
    {
      category: 'DERECHO & LITIGIOS',
      title: 'Litigios Comerciales, Bancarios & Daños',
      desc: 'Patrocinio en controversias contractuales de gran cuantía, medidas cautelares urgentes, concursos y quiebras, y defensas frente a reclamos de responsabilidad patrimonial.',
      items: ['Fuero Comercial Nacional', 'Medidas Cautelares de Urgencia', 'Ejecuciones Prendarias e Hipotecarias']
    },
    {
      category: 'DERECHO LABORAL',
      title: 'Derecho del Trabajo Empresarial & Sindicatos',
      desc: 'Prevención de contingencias laborales masivas, negociación colectiva con comisiones gremiales, acuerdos de confidencialidad para directivos y defensa en audiencias del SECLO.',
      items: ['Negociaciones Colectivas CCT', 'Acuerdos Gerenciales y Stock Options', 'Conciliaciones Laborales']
    },
    {
      category: 'INTERNACIONAL & ARBITRAJE',
      title: 'Contratos Internacionales & Arbitraje CCI',
      desc: 'Redacción y negociación de acuerdos de distribución transfronteriza, suministro bajo Incoterms 2020 y representación arbitral ante la Cámara de Comercio Internacional (CCI).',
      items: ['Arbitrajes Comerciales Internacionales', 'Comercio Exterior y Aduana', 'Tratados de Protección de Inversiones']
    },
    {
      category: 'CONTABILIDAD & SUELDOS',
      title: 'Outsourcing Contable, Auditoría & Sueldos',
      desc: 'Gestión externa de libros digitales, liquidación de haberes mensuales según convenio, confección del F. 931 y emisión de balances certificados por el Consejo Profesional.',
      items: ['Certificaciones Contables CPCECABA', 'Liquidación de Cargas Sociales', 'Auditoría de Estados Contables']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 animate-in fade-in duration-150">
      
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest block">
          Áreas de Práctica Jurídica & Contable
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-950 tracking-tight">
          Especialización disciplinaria con visión corporativa unificada.
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Nuestra estructura integra profesionales letrados y contadores públicos de carrera para blindar jurídica y fiscalmente cada decisión de nuestros clientes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {practices.map((p, idx) => (
          <div key={idx} className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-4">
            <span className="font-mono text-xs font-bold text-amber-700 block">
              {p.category}
            </span>
            <h2 className="font-serif text-xl font-bold text-slate-900 leading-snug">
              {p.title}
            </h2>
            <p className="text-slate-600 text-xs leading-relaxed">
              {p.desc}
            </p>
            <div className="pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-700">
              {p.items.map((it, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                  <span>{it}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="p-10 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-serif text-2xl font-bold">¿Requiere un dictamen especializado?</h2>
          <p className="text-slate-400 text-xs mt-1">Nuestros directores evalúan antecedentes y emiten un informe técnico preliminar.</p>
        </div>
        <Link
          href="/contacto"
          className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold whitespace-nowrap"
        >
          Solicitar Consulta
        </Link>
      </div>

    </div>
  );
}
