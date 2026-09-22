'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_USERS } from '@/data/mockData';
import { Mail, Phone, Award, ShieldCheck } from 'lucide-react';

export default function EquipoPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 animate-in fade-in duration-150">
      
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest block">
          Cuerpo Profesional & Dirección
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-950 tracking-tight">
          Abogados litigantes y contadores con rigor técnico probado.
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Nuestros socios y directores lideran personalmente cada estrategia. Conozca las credenciales académicas, matriculación oficial y trayectoria de los profesionales que componen el estudio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_USERS.map((user) => (
          <div 
            key={user.id} 
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-xs"
              />
              <div>
                <h2 className="font-serif text-lg font-bold text-slate-900">{user.name}</h2>
                <span className="text-xs text-amber-800 font-semibold block">{user.roleTitle}</span>
                {user.licenseNumber && (
                  <span className="font-mono text-[11px] text-slate-500 block mt-1">
                    Matrícula: {user.licenseNumber}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Especialidad</span>
                <span className="font-semibold text-slate-800">{user.specialty || 'Derecho General'}</span>
              </div>

              {user.bio && (
                <p className="text-slate-600 leading-relaxed pt-1">
                  {user.bio}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-1.5">
                <Mail size={12} className="text-slate-400" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
