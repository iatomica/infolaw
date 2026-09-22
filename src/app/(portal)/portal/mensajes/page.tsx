'use client';

import React, { useState } from 'react';
import { useInfoLaw } from '@/lib/store';
import { Send, UserCheck, ShieldCheck } from 'lucide-react';

export default function PortalMensajesPage() {
  const { messages, addChatMessage } = useInfoLaw();
  const [newMsg, setNewMsg] = useState('');
  const clientMessages = messages.filter(m => m.clientId === 'cli-2' || m.clientId === 'cli-1');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    addChatMessage('cli-2', newMsg, 'CLIENT');
    setNewMsg('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Mensajería Segura con tu Equipo Legal
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Canal directo y confidencial protegido por secreto profesional con tus letrados a cargo.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle flex flex-col h-[550px] overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <span className="font-bold text-slate-900 block">Abog. Sofía Herrera & Dra. Martina Ferraro</span>
              <span className="text-[11px] text-slate-500">Estudio Ferraro & Asociados · Respuesta promedio: &lt; 2 horas</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-purple-100 text-purple-800 font-mono text-[10px] font-bold">
            Canal Cifrado
          </span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
          {clientMessages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col ${msg.senderRole === 'CLIENT' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-slate-700">{msg.senderName}</span>
                <span className="text-[10px] font-mono text-slate-400">{msg.timestamp}</span>
              </div>
              <div className={`p-3.5 rounded-2xl max-w-lg leading-relaxed ${
                msg.senderRole === 'CLIENT' 
                  ? 'bg-slate-900 text-white rounded-tr-none' 
                  : 'bg-amber-50/80 border border-amber-200/80 text-slate-900 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-slate-50/50 flex items-center gap-3">
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Escribí tu mensaje o consulta al equipo..."
            className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Send size={13} />
            <span>Enviar</span>
          </button>
        </form>

      </div>
    </div>
  );
}
