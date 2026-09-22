'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useInfoLaw } from '@/lib/store';
import { 
  User, 
  Briefcase, 
  FileText, 
  Receipt, 
  MessageSquare, 
  ShieldCheck, 
  Phone, 
  Mail,
  Lock,
  Building2
} from 'lucide-react';

export default function ClientPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { clients } = useInfoLaw();
  const client = clients[1]; // Martín Rodríguez

  const nav = [
    { label: 'Mi Resumen', href: '/portal', icon: User },
    { label: 'Mis Expedientes', href: '/portal/expedientes', icon: Briefcase },
    { label: 'Documentación & Pedidos', href: '/portal/documentos', icon: FileText },
    { label: 'Honorarios & Facturas', href: '/portal/finanzas', icon: Receipt },
    { label: 'Mensajes con mi Abogado', href: '/portal/mensajes', icon: MessageSquare }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      
      {/* Portal Top Bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
              <Lock size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif tracking-widest text-slate-900 font-bold text-sm">PORTAL PRIVADO</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                  Acceso Seguro
                </span>
              </div>
              <span className="text-xs text-slate-500">Estudio Ferraro & Asociados · Área de Clientes</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-bold text-slate-900 block">{client.displayName}</span>
              <span className="text-[11px] text-slate-500 font-mono">CUIT: {client.taxId}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              MR
            </div>
          </div>
        </div>
      </header>

      {/* Sub Navigation */}
      <div className="bg-white border-b border-slate-200/80 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          {nav.map(item => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-purple-600 text-purple-900 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-purple-600' : 'text-slate-400'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Client Portal Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        {children}
      </main>

      {/* Footer Support */}
      <footer className="bg-white border-t border-slate-200 py-6 px-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2026 Estudio Ferraro & Asociados · Todos los derechos reservados · Canales encriptados</span>
          <div className="flex items-center gap-4">
            <span>Mesa de Ayuda: +54 11 5239-8000</span>
            <span>·</span>
            <span>contacto@ferraroyasoc.com.ar</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
