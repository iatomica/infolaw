'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useInfoLaw } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { ClientType } from '@/types';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  ExternalLink, 
  Building2, 
  User, 
  MoreHorizontal,
  Mail,
  Phone,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function ClientesPage() {
  const { clients, openQuickView } = useInfoLaw();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');

  const filteredClients = useMemo(() => {
    return clients.filter(c => {
      const matchesSearch = 
        c.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.taxId.includes(searchQuery) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedType === 'ALL' || c.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [clients, searchQuery, selectedType]);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider block">
            Directorio Corporativo & Personas
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Gestión de Clientes
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Base integral de personas físicas y jurídicas, expedientes vinculados y facturación acumulada.
          </p>
        </div>

        <button 
          onClick={() => alert('Formulario de alta de cliente: Permite cargar personas físicas o sociedades con CUIT, poderes, estatutos y contactos directos.')}
          className="px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-all self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>Registrar Nuevo Cliente</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-subtle">
        
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por Razón Social, CUIT, DNI o email..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setSelectedType('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedType === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({clients.length})
          </button>
          <button
            onClick={() => setSelectedType('COMPANY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              selectedType === 'COMPANY'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Building2 size={13} />
            <span>Empresas</span>
          </button>
          <button
            onClick={() => setSelectedType('INDIVIDUAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              selectedType === 'INDIVIDUAL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <User size={13} />
            <span>Particulares</span>
          </button>
        </div>

      </div>

      {/* Professional Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Cliente / Razón Social</th>
                <th className="py-3 px-4">CUIT / DNI</th>
                <th className="py-3 px-4">Contacto</th>
                <th className="py-3 px-4">Casos Activos</th>
                <th className="py-3 px-4">Facturación Total</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredClients.map((client) => (
                <tr 
                  key={client.id}
                  onClick={() => openQuickView({ type: 'client', data: client })}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                >
                  {/* Name & Type */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                        client.type === 'COMPANY' 
                          ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {client.type === 'COMPANY' ? <Building2 size={16} /> : <User size={16} />}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 group-hover:text-blue-900 transition-colors block">
                          {client.displayName}
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {client.industry || 'Persona Física'}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Tax ID */}
                  <td className="py-3 px-4 font-mono font-medium text-slate-700">
                    {client.taxId}
                  </td>

                  {/* Contact */}
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      <div className="text-slate-700 flex items-center gap-1.5">
                        <Mail size={12} className="text-slate-400" />
                        <span>{client.email}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-mono">
                        <Phone size={12} className="text-slate-400" />
                        <span>{client.phone}</span>
                      </div>
                    </div>
                  </td>

                  {/* Active Matters */}
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {client.activeMattersCount} {client.activeMattersCount === 1 ? 'caso' : 'casos'}
                    </span>
                  </td>

                  {/* Total Billed */}
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {formatCurrency(client.totalBilled)}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{client.status}</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <Link
                      href={`/app/clientes/${client.id}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors"
                    >
                      <span>Ficha 360°</span>
                      <ArrowRight size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
