'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  Scale, 
  FileText, 
  ShieldCheck, 
  Building2, 
  Users, 
  TrendingUp, 
  ChevronRight,
  Award,
  Clock,
  Landmark,
  CheckCircle2
} from 'lucide-react';
import { MOCK_USERS, MOCK_ARTICLES } from '@/data/mockData';

export default function HomePage() {
  return (
    <div className="space-y-24 sm:space-y-32 py-10 animate-in fade-in duration-200">
      
      {/* 1. HERO SECTION: EDITORIAL & REFINED */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-mono tracking-wider uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              <span>Estudio Jurídico & Contable de Alta Dirección</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 leading-[1.12] tracking-tight">
              Soluciones jurídicas y contables para decisiones que importan.
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
              Asesoramos a corporaciones, fondos de inversión y directivos en transacciones complejas, litigios de alto impacto y planificación tributaria preventiva.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/contacto"
                className="px-6 py-3.5 rounded-xl bg-obsidian-950 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all group"
              >
                <span>Solicitar Consulta Confidencial</span>
                <ArrowUpRight size={14} className="text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href="/portal"
                className="px-6 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Acceso a Portal Clientes</span>
                <span className="text-slate-400">→</span>
              </Link>
            </div>

            {/* Micro stats banner */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 text-xs">
              <div>
                <span className="font-mono text-xl sm:text-2xl font-black text-slate-950 block">30+</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">Años de trayectoria</span>
              </div>
              <div>
                <span className="font-mono text-xl sm:text-2xl font-black text-slate-950 block">+850</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">Empresas asesoradas</span>
              </div>
              <div>
                <span className="font-mono text-xl sm:text-2xl font-black text-slate-950 block">98%</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">Resolución favorable</span>
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=900"
                alt="Edificio Corporativo Ferraro & Asociados"
                className="w-full h-[460px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 font-bold">
                  Sede Central · CABA
                </span>
                <span className="font-serif text-lg font-bold mt-1">
                  Av. Corrientes 456, Piso 12
                </span>
                <span className="text-slate-300 text-xs mt-0.5">
                  Salas de Directorio y Arbitraje Comercial
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ÁREAS DE PRÁCTICA (DERECHO & CONTABILIDAD) */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest block">
                Especialidades de Alta Dirección
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950">
                Áreas de Práctica Jurídica & Contable
              </h2>
            </div>
            <Link
              href="/areas"
              className="text-xs font-bold text-slate-900 hover:text-amber-800 flex items-center gap-1.5"
            >
              <span>Ver todas las áreas especializadas</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Práctica 1 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-3">
              <span className="font-mono text-xs font-bold text-amber-700 block">01 / DERECHO</span>
              <h3 className="font-serif text-xl font-bold text-slate-900">Derecho Corporativo & M&A</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Estructuración de sociedades, pactos de socios, fusiones, adquisiciones y financiamiento internacional de proyectos.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-slate-900 flex items-center gap-1">
                <span>IGJ, Covenants y Arbitraje</span>
              </div>
            </div>

            {/* Práctica 2 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-3">
              <span className="font-mono text-xs font-bold text-amber-700 block">02 / CONTABILIDAD</span>
              <h3 className="font-serif text-xl font-bold text-slate-900">Planificación Fiscal & Auditoría</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Diagnóstico impositivo preventivo, auditorías ante ARCA (ex AFIP), precios de transferencia y estructuración patrimonial.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-slate-900 flex items-center gap-1">
                <span>Dictámenes Técnicos y DDJJ</span>
              </div>
            </div>

            {/* Práctica 3 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-3">
              <span className="font-mono text-xs font-bold text-amber-700 block">03 / LITIGIOS</span>
              <h3 className="font-serif text-xl font-bold text-slate-900">Litigios Comerciales Complejos</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Defensa y patrocinio en fueros comercial, civil y contencioso administrativo. Medidas cautelares y recupero crediticio.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-slate-900 flex items-center gap-1">
                <span>Fuero Nacional & Federal</span>
              </div>
            </div>

            {/* Práctica 4 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-3">
              <span className="font-mono text-xs font-bold text-amber-700 block">04 / LABORAL</span>
              <h3 className="font-serif text-xl font-bold text-slate-900">Derecho Laboral Empresarial</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Negociación colectiva con sindicatos, redacción de acuerdos de alta gerencia, liquidación de haberes y despidos contenciosos.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-slate-900 flex items-center gap-1">
                <span>SECLO y Juzgados Laborales</span>
              </div>
            </div>

            {/* Práctica 5 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-3">
              <span className="font-mono text-xs font-bold text-amber-700 block">05 / INTERNACIONAL</span>
              <h3 className="font-serif text-xl font-bold text-slate-900">Contratos Internacionales & Arbitraje</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Acuerdos de distribución transfronteriza, licencias de propiedad intelectual y cláusulas arbitrales bajo reglas de la CCI y CAM.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-slate-900 flex items-center gap-1">
                <span>Mercosur, USA & Europa</span>
              </div>
            </div>

            {/* Práctica 6 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-3">
              <span className="font-mono text-xs font-bold text-amber-700 block">06 / SUELDOS</span>
              <h3 className="font-serif text-xl font-bold text-slate-900">Outsourcing Contable & Sueldos</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Gestión integral de nómina, cargas sociales del F. 931, conciliaciones bancarias y confección de balances auditados.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-slate-900 flex items-center gap-1">
                <span>Libros Digitales y AFIP</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. METODOLOGÍA & RIGOR PROFESIONAL */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest block">
              Metodología de Trabajo
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950 leading-tight">
              Precisión técnica, confidencialidad absoluta y tiempos predecibles.
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Combinamos la visión jurídica y contable bajo un mismo techo. Cada cliente cuenta con un socio asignado y un canal seguro donde los expedientes se actualizan en tiempo real sin intermediarios innecesarios.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start gap-3">
                <span className="p-1 rounded bg-emerald-100 text-emerald-800 mt-0.5">
                  <CheckCircle2 size={14} />
                </span>
                <div>
                  <strong className="text-slate-900 block">Portal Privado con Trazabilidad Total</strong>
                  <span className="text-slate-600">Acceso a escritos judiciales sellados y fechas de vencimiento las 24 horas.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="p-1 rounded bg-emerald-100 text-emerald-800 mt-0.5">
                  <CheckCircle2 size={14} />
                </span>
                <div>
                  <strong className="text-slate-900 block">Interdisciplina Jurídica y Fiscal</strong>
                  <span className="text-slate-600">Ningún contrato corporativo se firma sin previa validación de su impacto tributario.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="p-1 rounded bg-emerald-100 text-emerald-800 mt-0.5">
                  <CheckCircle2 size={14} />
                </span>
                <div>
                  <strong className="text-slate-900 block">Honorarios Transparentes y Previsibles</strong>
                  <span className="text-slate-600">Convenios por abonos fijos, horas auditables o tarifas por resultado debidamente estipuladas.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                alt="Dra. Martina Ferraro en Directorio"
                className="w-full h-[450px] object-cover"
              />
              <div className="p-5 bg-white border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">Dra. Martina Ferraro</span>
                  <span className="text-xs text-slate-500 font-mono">Socia Fundadora · Matrícula T° 84 F° 122 CPACF</span>
                </div>
                <Link href="/equipo" className="text-xs font-semibold text-amber-700 hover:text-amber-800">
                  Ver Perfil →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SOCIOS & EQUIPO DIRECTIVO */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest block">
                Cuerpo Profesional
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950">
                Socios & Directores de Práctica
              </h2>
            </div>
            <Link
              href="/equipo"
              className="text-xs font-bold text-slate-900 hover:text-amber-800 flex items-center gap-1.5"
            >
              <span>Conocer a todo el equipo</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_USERS.slice(0, 3).map((partner) => (
              <div 
                key={partner.id} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all space-y-4 p-6"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={partner.avatarUrl}
                    alt={partner.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="font-serif text-lg font-bold text-slate-900">{partner.name}</h3>
                    <span className="text-xs text-amber-800 font-medium block">{partner.roleTitle}</span>
                    <span className="font-mono text-[11px] text-slate-400 block mt-0.5">{partner.licenseNumber}</span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs leading-relaxed">
                  {partner.bio}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{partner.email}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. ARTÍCULOS & INSIGHTS DOCTRINARIOS */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest block">
              Pensamiento Estratégico & Doctrina
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950">
              Insights & Publicaciones Jurídico-Fiscales
            </h2>
          </div>
          <Link
            href="/insights"
            className="text-xs font-bold text-slate-900 hover:text-amber-800 flex items-center gap-1.5"
          >
            <span>Ver todas las publicaciones</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_ARTICLES.map((article) => (
            <div 
              key={article.id} 
              className="group space-y-3 cursor-pointer"
            >
              <div className="rounded-xl overflow-hidden border border-slate-200 aspect-[16/10] relative">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {article.category}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">{article.readTime}</span>
                </div>

                <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-slate-600 text-xs line-clamp-2">
                  {article.summary}
                </p>

                <div className="text-[11px] text-slate-400 pt-1 font-mono">
                  Por {article.authorName} · {article.publishedAt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIOS DISCRETOS & CONFIANZA INSTITUCIONAL */}
      <section className="bg-obsidian-950 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold block">
            Relaciones de Largo Plazo
          </span>
          <blockquote className="font-serif text-2xl sm:text-3xl font-medium leading-relaxed text-slate-100">
            "Ferraro & Asociados nos ha brindado un blindaje societario y tributario excepcional en nuestra expansión regional. Su portal digital nos permite operar con total transparencia y agilidad."
          </blockquote>
          <div className="text-xs text-slate-400 font-mono">
            <span className="font-bold text-white block text-sm">Director de Finanzas & Legales</span>
            <span>Grupo Logístico Internacional · Cliente desde 2018</span>
          </div>
        </div>
      </section>

      {/* 7. CTA / CONTACTO BANNER */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-xs text-amber-400 uppercase font-bold tracking-wider block">
              Admisión de Nuevos Clientes
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              ¿Desea someter un asunto a análisis de nuestros socios?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Evaluamos la viabilidad procesal y fiscal de su consulta bajo estricto acuerdo de confidencialidad previo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/contacto"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold text-center shadow-md transition-all"
            >
              Iniciar Consulta de Admisión
            </Link>
            <Link
              href="/portal"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold text-center transition-all"
            >
              Portal Clientes
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
