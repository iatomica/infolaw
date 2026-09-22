'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useInfoLaw } from '@/lib/store';
import { UserRoleCode } from '@/types';
import { getRoleBadgeInfo } from '@/lib/rbac';
import { 
  ShieldCheck, 
  UserCheck, 
  ExternalLink, 
  Sparkles, 
  Globe, 
  LayoutDashboard, 
  User,
  Search
} from 'lucide-react';

export const RoleSwitcherBar: React.FC = () => {
  const { currentRole, switchRole, currentUser, setCommandPaletteOpen } = useInfoLaw();
  const pathname = usePathname();

  const isPublicWeb = !pathname.startsWith('/app') && !pathname.startsWith('/portal');
  const isPortal = pathname.startsWith('/portal');
  const isInternal = pathname.startsWith('/app');

  const rolesList: { code: UserRoleCode; label: string; name: string }[] = [
    { code: 'SOCIO_DIRECTOR', label: 'Socio Director', name: 'Dra. Martina Ferraro' },
    { code: 'ABOGADO_CONTADOR_SENIOR', label: 'Abogada Senior', name: 'Abog. Sofía Herrera' },
    { code: 'ABOGADO_CONTADOR_JUNIOR', label: 'Contador Junior', name: 'CPN Tomás Peralta' },
    { code: 'ADMINISTRATIVO', label: 'Administración', name: 'Lic. Andrea Gómez' },
    { code: 'RECEPCION', label: 'Recepción', name: 'Camila Rossi' },
    { code: 'CLIENTE', label: 'Portal Cliente', name: 'Martín Rodríguez (Grupo Belgrano)' },
    { code: 'SUPER_ADMIN', label: 'Super Admin', name: 'Control Total' }
  ];

  const badge = getRoleBadgeInfo(currentRole);

  return (
    <header className="bg-obsidian-950 text-slate-200 border-b border-slate-800 text-xs py-2 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Brand & Section Navigation */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <span className="font-serif tracking-widest text-amber-500 font-bold text-sm">LEXIOS</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-medium hidden sm:inline">Ferraro & Asociados</span>
          </div>

          <nav className="flex items-center gap-1 bg-obsidian-900/90 p-1 rounded-lg border border-slate-800 text-[11px]">
            <Link 
              href="/"
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                isPublicWeb 
                  ? 'bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe size={12} />
              <span>Web Pública</span>
            </Link>

            <Link 
              href="/app/dashboard"
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                isInternal 
                  ? 'bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutDashboard size={12} />
              <span>Sistema Interno</span>
            </Link>

            <Link 
              href="/portal"
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                isPortal 
                  ? 'bg-purple-500/20 text-purple-400 font-semibold border border-purple-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User size={12} />
              <span>Portal Clientes</span>
            </Link>
          </nav>
        </div>

        {/* Center: Search Command Palette Trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden lg:flex items-center gap-2 bg-obsidian-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 px-3 py-1 rounded-md border border-slate-800 text-xs transition-colors"
        >
          <Search size={12} />
          <span>Buscar expediente, cliente o tarea...</span>
          <kbd className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px] font-mono border border-slate-700">⌘K</kbd>
        </button>

        {/* Right: Live Demo Role Switcher */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <span className="text-[11px] text-slate-400 hidden xl:inline">Simular Rol:</span>
          
          <div className="relative inline-block text-left">
            <select
              value={currentRole}
              onChange={(e) => switchRole(e.target.value as UserRoleCode)}
              aria-label="Simular rol de usuario en la plataforma"
              className="bg-slate-900 text-slate-200 border border-slate-700 rounded-md px-2.5 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer hover:border-slate-600 transition-colors"
            >
              {rolesList.map(r => (
                <option key={r.code} value={r.code}>
                  {r.label} ({r.name})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
            <img 
              src={currentUser.avatarUrl} 
              alt={currentUser.name} 
              className="w-5 h-5 rounded-full object-cover border border-amber-500/40"
            />
            <span className="text-slate-300 font-medium text-[11px] max-w-[110px] truncate hidden sm:inline">
              {currentUser.name.split(' ')[1] || currentUser.name}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};
