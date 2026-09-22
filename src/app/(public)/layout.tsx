'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUpRight, 
  ShieldCheck, 
  Scale, 
  ExternalLink 
} from 'lucide-react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { label: 'Inicio', href: '/' },
    { label: 'Áreas de Práctica', href: '/areas' },
    { label: 'El Estudio', href: '/equipo' },
    { label: 'Insights & Doctrina', href: '/insights' },
    { label: 'Contacto & Admisión', href: '/contacto' }
  ];

  return (
    <div className="flex-1 flex flex-col bg-white text-slate-900 font-sans selection:bg-amber-500/20">
      
      {/* Top Institutional Contact Line */}
      <div className="bg-obsidian-950 text-slate-400 text-[11px] py-2 px-6 border-b border-slate-800 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-amber-500" />
              <span>Av. Corrientes 456, Piso 12 · Ciudad Autónoma de Buenos Aires</span>
            </span>
            <span className="flex items-center gap-1.5 font-mono">
              <Phone size={12} className="text-amber-500" />
              <span>+54 11 5239-8000</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/portal" className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1">
              <span>Acceso Clientes</span>
              <ArrowUpRight size={11} />
            </Link>
            <span>·</span>
            <Link href="/app/dashboard" className="text-slate-300 hover:text-white">
              Sistema Interno
            </Link>
          </div>
        </div>
      </div>

      {/* Main Public Header */}
      <header className="sticky top-8 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-obsidian-950 text-amber-500 flex items-center justify-center font-serif text-lg font-bold shadow-xs">
              LX
            </div>
            <div>
              <span className="font-serif tracking-[0.2em] text-slate-950 font-black text-base block">
                FERRARO & ASOCIADOS
              </span>
              <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase block">
                Abogados · Contadores Públicos
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-600">
            {links.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-slate-950 ${
                  pathname === link.href ? 'text-amber-700 font-bold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link 
              href="/portal"
              className="hidden sm:inline-flex px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all"
            >
              Portal Clientes
            </Link>
            <Link 
              href="/contacto"
              className="px-4 py-2 rounded-lg bg-obsidian-950 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>Solicitar Consulta</span>
              <ArrowUpRight size={13} className="text-amber-400" />
            </Link>
          </div>

        </div>
      </header>

      {/* Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Institutional Footer */}
      <footer className="bg-obsidian-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-xs">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center font-serif font-bold text-sm">
                LX
              </div>
              <span className="font-serif tracking-widest text-white font-bold text-sm">
                FERRARO & ASOCIADOS
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Firma boutique multidisciplinaria especializada en derecho corporativo, litigios comerciales de alta cuantía y planificación tributaria estratégica.
            </p>
            <div className="font-mono text-[11px] text-slate-500">
              CABA · San Isidro · Córdoba · Mendoza
            </div>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              Prácticas Jurídicas
            </span>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/areas" className="hover:text-white">Derecho Corporativo & M&A</Link></li>
              <li><Link href="/areas" className="hover:text-white">Litigios Comerciales & Daños</Link></li>
              <li><Link href="/areas" className="hover:text-white">Derecho Laboral Empresarial</Link></li>
              <li><Link href="/areas" className="hover:text-white">Arbitraje Nacional & CCI</Link></li>
              <li><Link href="/areas" className="hover:text-white">Compliance & Protección de Datos</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              Prácticas Contables & Fiscales
            </span>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/areas" className="hover:text-white">Planificación Fiscal Corporativa</Link></li>
              <li><Link href="/areas" className="hover:text-white">Defensa ante ARCA (ex AFIP)</Link></li>
              <li><Link href="/areas" className="hover:text-white">Auditoría de Estados Contables</Link></li>
              <li><Link href="/areas" className="hover:text-white">Precios de Transferencia</Link></li>
              <li><Link href="/areas" className="hover:text-white">Liquidación de Sueldos & Cargas</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              Sede Central
            </span>
            <div className="space-y-1.5 text-slate-300">
              <p>Av. Corrientes 456, Piso 12</p>
              <p>C1043AAR, CABA, Argentina</p>
              <p className="font-mono pt-1 text-amber-400">+54 11 5239-8000</p>
              <p className="font-mono">contacto@ferraroyasoc.com.ar</p>
            </div>
            <div className="pt-2">
              <Link href="/contacto" className="text-xs font-semibold text-white underline underline-offset-4 hover:text-amber-400">
                Iniciar consulta confidencial →
              </Link>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 gap-4">
          <span>© 2026 Ferraro, Bianchi & Méndez S.C. · Matrículas CPACF / CPCECABA · Todos los derechos reservados.</span>
          <div className="flex items-center gap-4">
            <Link href="/portal" className="text-slate-400 hover:text-white">Portal Clientes</Link>
            <Link href="/app/dashboard" className="text-slate-400 hover:text-white">Acceso Profesional</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
