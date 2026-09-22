'use client';

import React, { useState } from 'react';
import { useInfoLaw } from '@/lib/store';
import { MOCK_USERS, MOCK_ORGANIZATION } from '@/data/mockData';
import { ROLE_PERMISSIONS, getRoleBadgeInfo } from '@/lib/rbac';
import { UserRoleCode } from '@/types';
import { 
  ShieldCheck, 
  Users, 
  Key, 
  History, 
  Building, 
  Sliders, 
  Lock, 
  Check, 
  X,
  FileCheck
} from 'lucide-react';

export default function AdministracionPage() {
  const { auditLogs } = useInfoLaw();
  const [subTab, setSubTab] = useState<'ORGANIZACION' | 'USUARIOS' | 'ROLES' | 'AUDITORIA'>('AUDITORIA');

  const allRoles: UserRoleCode[] = [
    'SUPER_ADMIN',
    'SOCIO_DIRECTOR',
    'ABOGADO_CONTADOR_SENIOR',
    'ABOGADO_CONTADOR_JUNIOR',
    'ADMINISTRATIVO',
    'RECEPCION',
    'CLIENTE'
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider block">
            Seguridad, Gobierno Corporativo & RBAC
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Administración del Estudio & Auditoría
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Configuración multi-tenant, matriz granular de permisos, usuarios y trazabilidad inmutable de acciones.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold overflow-x-auto">
        {[
          { id: 'AUDITORIA', label: `1. Registro de Auditoría (${auditLogs.length})` },
          { id: 'ROLES', label: '2. Matriz de Permisos RBAC' },
          { id: 'USUARIOS', label: `3. Usuarios del Estudio (${MOCK_USERS.length})` },
          { id: 'ORGANIZACION', label: '4. Datos de la Organización' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id as any)}
            className={`pb-3 px-3.5 border-b-2 transition-all whitespace-nowrap ${
              subTab === t.id
                ? 'border-amber-600 text-amber-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Auditoría */}
      {subTab === 'AUDITORIA' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Trazabilidad de Acciones & Seguridad</h2>
              <p className="text-xs text-slate-500">Log de eventos inmutables para cumplimiento normativo y confidencialidad.</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
              SOC 2 / GDPR Compliant
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{log.actorName}</span>
                    <span className="text-[11px] text-slate-400">({log.actorRole})</span>
                    <span className="text-slate-300">·</span>
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      {log.action}
                    </span>
                  </div>
                  <p className="text-slate-700">{log.changeSummary}</p>
                </div>

                <div className="text-right text-[11px] text-slate-400 font-mono shrink-0">
                  <div>{log.timestamp}</div>
                  <div>IP: {log.ipAddress}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Matriz RBAC */}
      {subTab === 'ROLES' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-5 space-y-4 overflow-x-auto">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Matriz Granular de Control de Accesos (RBAC)</h2>
            <p className="text-xs text-slate-500">Permisos por función dentro del estudio profesional y en el portal cliente.</p>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-mono text-slate-600 border-b border-slate-200 uppercase">
                <th className="p-3">Código de Permiso</th>
                {allRoles.map(r => (
                  <th key={r} className="p-3 text-center">{r.split('_')[0]}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-mono">
              {[
                'cases.read',
                'cases.write',
                'internal_notes.read',
                'internal_notes.write',
                'tasks.manage',
                'calendar.manage',
                'documents.read',
                'documents.write',
                'documents.request',
                'billing.view',
                'billing.manage',
                'audit.read'
              ].map(perm => (
                <tr key={perm} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-800">{perm}</td>
                  {allRoles.map(r => {
                    const has = ROLE_PERMISSIONS[r]?.includes(perm as any);
                    return (
                      <td key={r} className="p-3 text-center">
                        {has ? (
                          <span className="inline-block w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-center leading-4 font-bold">✓</span>
                        ) : (
                          <span className="inline-block text-slate-300 font-bold">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Usuarios */}
      {subTab === 'USUARIOS' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase border-b border-slate-200">
                <th className="p-3">Profesional</th>
                <th className="p-3">Rol del Sistema</th>
                <th className="p-3">Matrícula Profesional</th>
                <th className="p-3">Email</th>
                <th className="p-3">Teléfono</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_USERS.map((u) => {
                const badge = getRoleBadgeInfo(u.roleCode);
                return (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <img src={u.avatarUrl} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <span className="font-bold text-slate-900 block">{u.name}</span>
                          <span className="text-[11px] text-slate-500">{u.specialty}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-semibold text-slate-700">{u.licenseNumber || '—'}</td>
                    <td className="p-3 text-slate-600">{u.email}</td>
                    <td className="p-3 font-mono text-slate-500">{u.phone}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Organización */}
      {subTab === 'ORGANIZACION' && (
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-subtle space-y-4 text-xs">
          <h2 className="text-sm font-bold text-slate-900">Datos Institucionales del Estudio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-slate-400 text-[11px] block">Nombre Comercial</span>
              <span className="font-bold text-slate-900 text-sm">{MOCK_ORGANIZATION.name}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Razón Social</span>
              <span className="font-bold text-slate-900 text-sm">{MOCK_ORGANIZATION.legalName}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">CUIT</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{MOCK_ORGANIZATION.taxId}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Tipo de Práctica</span>
              <span className="font-bold text-amber-800 text-sm">Estudio Jurídico-Contable Multidisciplinario</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Sede Central</span>
              <span className="font-medium text-slate-800">{MOCK_ORGANIZATION.address}, {MOCK_ORGANIZATION.city}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Contacto Oficial</span>
              <span className="font-medium text-slate-800">{MOCK_ORGANIZATION.email} · {MOCK_ORGANIZATION.phone}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
