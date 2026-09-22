'use client';

import React from 'react';
import { useInfoLaw } from '@/lib/store';
import { FileText, Download, Upload, CheckCircle2, Clock } from 'lucide-react';

export default function PortalDocumentosPage() {
  const { documents, documentRequests, uploadRequestedDocument } = useInfoLaw();
  const clientDocs = documents.filter(d => d.clientId === 'cli-2' || d.clientId === 'cli-1');
  const clientReqs = documentRequests.filter(r => r.clientId === 'cli-2' || r.clientId === 'cli-1');

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Documentos & Solicitudes de Entrega
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Archivos oficiales compartidos por el estudio y documentación requerida para tus causas.
        </p>
      </div>

      {/* Pending Requests Section */}
      <div className="bg-white rounded-2xl border border-amber-200 shadow-subtle p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="font-mono text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
            <Clock size={16} />
            <span>Documentación Solicitada por tu Letrado</span>
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 font-mono">
            {clientReqs.filter(r => r.status === 'REQUESTED').length} pendientes
          </span>
        </div>

        <div className="space-y-3 text-xs">
          {clientReqs.map((req) => (
            <div key={req.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-bold text-slate-900 text-sm block">{req.title}</span>
                <p className="text-slate-600">{req.instructions}</p>
                <span className="font-mono text-slate-500 text-[11px] block">
                  Fecha límite: <strong className="text-slate-700">{req.dueDate}</strong> · Solicitado por: {req.requestedByName}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  req.status === 'RECEIVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {req.status === 'RECEIVED' ? '✓ Recibido' : 'Pendiente'}
                </span>

                <button
                  onClick={() => {
                    const name = prompt('Nombre del archivo a adjuntar (ej: Balance_Auditado_2025.pdf):', 'Comprobante_Pago_Certificado.pdf');
                    if (name) uploadRequestedDocument(req.id, name);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <Upload size={13} />
                  <span>Subir Archivo</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shared Files Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          Archivos Compartidos por el Estudio
        </h2>

        <div className="divide-y divide-slate-100 text-xs">
          {clientDocs.map((doc) => (
            <div key={doc.id} className="py-3.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-amber-700" />
                <div>
                  <span className="font-bold text-slate-900 block">{doc.fileName}</span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {doc.fileSize} · Subido el {doc.uploadedAt} · Categoría: {doc.category}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => alert(`Descargando copia legal de ${doc.fileName}...`)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold flex items-center gap-1.5"
              >
                <Download size={13} />
                <span>Descargar</span>
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
