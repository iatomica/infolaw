'use client';

import React, { useState } from 'react';
import { useInfoLaw } from '@/lib/store';
import { DocumentCategory, DocumentRequest } from '@/types';
import { 
  FolderLock, 
  FileText, 
  Download, 
  Upload, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Tag,
  Building
} from 'lucide-react';

export default function DocumentosPage() {
  const { documents, documentRequests, addDocumentRequest } = useInfoLaw();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = documents.filter(d => {
    const matchesCat = selectedCategory === 'ALL' || d.category === selectedCategory;
    const matchesSearch = d.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (d.matterTitle && d.matterTitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider block">
            Gestor Documental Seguro
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Documentos & Solicitudes a Clientes
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Repositorio de escritos sellados, peritajes, actas societarias y solicitudes directas a clientes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert('Cargar Documento: Permite subir un archivo firmado, categorizarlo y asociarlo a un expediente.')}
            className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Upload size={14} />
            <span>Subir Documento</span>
          </button>
        </div>
      </div>

      {/* Section 1: Active Document Requests to Clients */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-amber-700" />
            <h2 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
              Solicitudes de Documentación a Clientes (Portal)
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {documentRequests.length} solicitudes activas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {documentRequests.map((req) => (
            <div 
              key={req.id} 
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  req.status === 'RECEIVED' ? 'bg-emerald-100 text-emerald-800' :
                  req.status === 'APPROVED' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {req.status === 'REQUESTED' ? 'Pendiente Cliente' : req.status === 'RECEIVED' ? 'Recibido (A revisar)' : 'Aprobado'}
                </span>
                <span className="font-mono text-slate-500 text-[11px]">Plazo: {req.dueDate}</span>
              </div>

              <h4 className="font-bold text-slate-900 leading-snug">{req.title}</h4>
              <p className="text-slate-600 text-[11px] line-clamp-2">{req.instructions}</p>

              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                <span className="font-semibold text-slate-800">{req.clientName}</span>
                {req.receivedFileName && (
                  <span className="text-emerald-700 font-mono font-bold truncate max-w-[130px]">
                    {req.receivedFileName}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Repository Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-subtle">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre de archivo o expediente..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'ALL', label: 'Todos' },
            { id: 'DEMANDA', label: 'Demandas' },
            { id: 'CONTRATO', label: 'Contratos' },
            { id: 'INFORME_CONTABLE', label: 'Informes' },
            { id: 'DECLARACION_JURADA', label: 'DDJJ Fiscales' }
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap ${
                selectedCategory === c.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase border-b border-slate-200">
              <th className="p-3">Nombre del Archivo</th>
              <th className="p-3">Expediente Asociado</th>
              <th className="p-3">Categoría</th>
              <th className="p-3">Tamaño</th>
              <th className="p-3">Versión</th>
              <th className="p-3">Subido por</th>
              <th className="p-3 text-right">Descargar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50">
                <td className="p-3">
                  <div className="flex items-center gap-2.5">
                    <FileText size={16} className="text-amber-700 shrink-0" />
                    <span className="font-bold text-slate-900">{doc.fileName}</span>
                  </div>
                </td>
                <td className="p-3 font-mono text-amber-800">{doc.matterTitle || 'General'}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
                    {doc.category}
                  </span>
                </td>
                <td className="p-3 font-mono text-slate-500">{doc.fileSize}</td>
                <td className="p-3 font-mono font-bold text-slate-700">v{doc.version}</td>
                <td className="p-3 text-slate-600">{doc.uploadedByName} ({doc.uploadedAt})</td>
                <td className="p-3 text-right">
                  <button 
                    onClick={() => alert(`Descargando copia legal de ${doc.fileName}...`)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <Download size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
