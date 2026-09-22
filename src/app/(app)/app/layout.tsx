'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useInfoLaw } from '@/lib/store';
import { getRoleBadgeInfo, hasPermission } from '@/lib/rbac';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CheckSquare, 
  Calendar, 
  FolderLock, 
  TrendingUp, 
  Receipt, 
  ShieldCheck, 
  Menu, 
  X, 
  Search, 
  Bell, 
  SlidersHorizontal,
  LogOut,
  Clock,
  DollarSign,
  Plus
} from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentRole, currentUser, setCommandPaletteOpen } = useInfoLaw();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const badge = getRoleBadgeInfo(currentRole);

  const navItems = [
    { label: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard, permission: null },
    { label: 'Clientes & Empresas', href: '/app/clientes', icon: Users, permission: 'clients.read' as const },
    { label: 'Casos / Expedientes', href: '/app/expedientes', icon: Briefcase, permission: 'cases.read' as const },
    { label: 'Tareas & Board', href: '/app/tareas', icon: CheckSquare, permission: 'tasks.manage' as const },
    { label: 'Calendario & Vencimientos', href: '/app/calendario', icon: Calendar, permission: 'calendar.manage' as const },
    { label: 'Gestor Documental', href: '/app/documentos', icon: FolderLock, permission: 'documents.read' as const },
    { label: 'CRM & Admisión', href: '/app/crm', icon: TrendingUp, permission: 'crm.pipeline' as const },
    { label: 'Finanzas & Facturación', href: '/app/finanzas', icon: Receipt, permission: 'billing.view' as const },
    { label: 'Administración & Auditoría', href: '/app/administracion', icon: ShieldCheck, permission: 'audit.read' as const },
  ];

  // Filter items based on current role permissions
  const visibleNavItems = navItems.filter(item => {
    if (!item.permission) return true;
    return hasPermission(currentRole, item.permission);
  });

  return (
    <div className="flex-1 flex bg-[#F8FAFC]">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-obsidian-950 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Firm Logo & Subtitle */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <Link href="/app/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-serif text-amber-500 font-bold text-base shadow-xs">
                IL
              </div>
              <div>
                <span className="font-serif tracking-widest text-slate-100 font-bold text-sm block">INFOLAW</span>
                <span className="text-[10px] text-slate-400 font-medium tracking-tight block">Ferraro & Asociados</span>
              </div>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              aria-label="Cerrar menú lateral"
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* User Profile Brief in Sidebar */}
          <div className="p-4 mx-3 my-3 rounded-xl bg-obsidian-900 border border-slate-800/90 flex items-center gap-3">
            <img 
              src={currentUser.avatarUrl} 
              alt={currentUser.name} 
              className="w-9 h-9 rounded-full object-cover border border-amber-500/40"
            />
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-slate-100 block truncate">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-amber-400 font-mono block truncate">
                {badge.label}
              </span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="px-3 py-2 space-y-1">
            {visibleNavItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/app/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30 shadow-xs' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-amber-400' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Info */}
        <div className="p-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sistema Operativo Conectado</span>
          </div>
          <span className="font-mono text-[10px]">v2.4</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Workspace Sub-Header */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menú de navegación lateral"
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <Menu size={18} />
            </button>
            <div className="hidden sm:block">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Estudio Jurídico & Contable</span>
              <h1 className="text-sm font-bold text-slate-900">Ferraro, Bianchi & Méndez S.C.</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search shortcut */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 text-xs transition-colors"
            >
              <Search size={14} className="text-slate-400" />
              <span className="hidden md:inline">Buscar caso, cliente o CUIT...</span>
              <kbd className="hidden md:inline bg-white px-1.5 py-0.5 rounded text-[10px] font-mono border border-slate-200 text-slate-400">⌘K</kbd>
            </button>

            {/* Role indicator pill */}
            <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${badge.color}`}>
              {badge.label}
            </span>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
