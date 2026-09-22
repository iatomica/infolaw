'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useInfoLaw } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { MatterStatus } from '@/types';
import { 
  Briefcase, 
  ArrowLeft, 
  Calendar, 
  CheckSquare, 
  FileText, 
  Clock, 
  DollarSign, 
  Users, 
  Lock, 
  Plus, 
  ShieldAlert, 
  AlertCircle,
  Building,
  CheckCircle2,
  Send,
  Download,
  Eye,
  MessageSquare
} from 'lucide-react';

export default function MatterWorkspacePage() {
  const params = useParams();
  const matterId = params?.id as string;
  const { 
    matters, 
    tasks, 
    documents, 
    calendarEvents, 
    timeEntries, 
    invoices, 
    expenses, 
    internalNotes, 
    addInternalNote,
    addTimeEntry,
    updateMatterStatus,
    toggleTaskChecklist,
    currentUser,
    currentRole
  } = useInfoLaw();

  const [activeTab, setActiveTab] = useState<
    'RESUMEN' | 'TIMELINE' | 'TAREAS' | 'DOCUMENTOS' | 'PERSONAS' | 'CALENDARIO' | 'HORAS' | 'HONORARIOS' | 'NOTAS'
  >('RESUMEN');

  const [newNoteText, setNewNoteText] = useState('');
  const [newHours, setNewHours] = useState('2.5');
  const [newHoursDesc, setNewHoursDesc] = useState('');

  const matter = matters.find(m => m.id === matterId) || matters[0];
  const matterTasks = tasks.filter(t => t.matterId === matter.id);
  const matterDocs = documents.filter(d => d.matterId === matter.id);
  const matterEvents = calendarEvents.filter(e => e.matterId === matter.id);
  const matterHours = timeEntries.filter(t => t.matterId === matter.id);
  const matterInvoices = invoices.filter(i => i.matterId === matter.id);
  const matterExpenses = expenses.filter(e => e.matterId === matter.id);
  const matterNotes = internalNotes.filter(n => n.matterId === matter.id);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addInternalNote(matter.id, newNoteText);
    setNewNoteText('');
  };

  const handleAddTime = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHoursDesc.trim()) return;
    addTimeEntry({
      matterId: matter.id,
      matterTitle: matter.title,
      date: new Date().toLocaleDateString('es-AR'),
      durationHours: parseFloat(newHours) || 1,
      description: newHoursDesc,
      isBillable: true,
      hourlyRate: 150,
      currency: 'USD'
    });
    setNewHoursDesc('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Back and Workspace Header */}
      <div>
        <Link 
          href="/app/expedientes" 
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium mb-3"
        >
          <ArrowLeft size={14} />
          <span>Volver al Catálogo de Expedientes</span>
        </Link>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                  {matter.internalCode}
                </span>

                <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
                  {matter.clientName}
                </span>

                <span className="text-slate-300">·</span>

                <span className="text-xs text-slate-500 font-mono">
                  {matter.practiceArea}
                </span>

                {matter.courtDocketNumber && (
                  <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                    {matter.courtDocketNumber}
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {matter.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                {matter.courtOrganism && (
                  <span>
                    Radicación: <strong>{matter.courtOrganism}</strong>
                  </span>
                )}
                <span>
                  Contraparte: <strong>{matter.opposingParty || 'N/A'}</strong>
                </span>
                <span>
                  Jurisdicción: <strong>{matter.jurisdiction || 'Nacional'}</strong>
                </span>
              </div>
            </div>

            {/* Quick Status Control */}
            <div className="flex flex-col sm:flex-row items-start lg:items-end gap-3 shrink-0">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Estado del Expediente:
                </span>
                <select
                  value={matter.status}
                  onChange={(e) => updateMatterStatus(matter.id, e.target.value as MatterStatus)}
                  aria-label="Estado procesal del expediente"
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="INTAKE">INTAKE (Admisión)</option>
                  <option value="ACTIVE">ACTIVO (En Trámite)</option>
                  <option value="WAITING_CLIENT">ESPERANDO CLIENTE</option>
                  <option value="WAITING_THIRD_PARTY">ESPERANDO TERCERO</option>
                  <option value="COURT_STAGE">ETAPA JUDICIAL / PRUEBA</option>
                  <option value="NEGOTIATION">NEGOCIACIÓN / CONCILIACIÓN</option>
                  <option value="CLOSED">CERRADO / SENTENCIA</option>
                  <option value="ARCHIVED">ARCHIVADO</option>
                </select>
              </div>

              <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                matter.priority === 'HIGH' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'
              }`}>
                Prioridad: {matter.priority}
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* 9 Workspace Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 text-xs font-semibold overflow-x-auto pb-px">
        {[
          { id: 'RESUMEN', label: '1. Resumen' },
          { id: 'TIMELINE', label: '2. Timeline Cronológico' },
          { id: 'TAREAS', label: `3. Tareas (${matterTasks.length})` },
          { id: 'DOCUMENTOS', label: `4. Documentos (${matterDocs.length})` },
          { id: 'PERSONAS', label: '5. Personas & Partes' },
          { id: 'CALENDARIO', label: `6. Calendario (${matterEvents.length})` },
          { id: 'HORAS', label: `7. Horas (${matterHours.length})` },
          { id: 'HONORARIOS', label: `8. Honorarios & Gastos` },
          { id: 'NOTAS', label: `9. Notas Internas (${matterNotes.length})`, isSecret: true }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 px-3.5 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === tab.id
                ? 'border-amber-600 text-amber-900 font-bold bg-amber-50/40 rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            {tab.isSecret && <Lock size={12} className="text-red-600" />}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: RESUMEN */}
      {activeTab === 'RESUMEN' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Próxima Acción Box */}
            <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200/90 shadow-subtle space-y-2">
              <span className="font-mono text-xs font-bold text-amber-900 uppercase tracking-wider block">
                ⚡ Próxima Acción Procesal Inmediata
              </span>
              <p className="text-sm font-bold text-slate-900 leading-snug">
                {matter.nextAction}
              </p>
              <div className="flex items-center gap-4 text-xs text-amber-800 pt-1 font-mono">
                <span>Fecha límite procesal: <strong>{matter.nextActionDeadline}</strong></span>
                <span>·</span>
                <span>Alerta: Activa</span>
              </div>
            </div>

            {/* Carátula y Síntesis */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-subtle space-y-4">
              <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Resumen Ejecutivo del Asunto
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed font-serif text-sm">
                {matter.summary}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-3 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 text-[11px] block">Abogado / Profesional a Cargo</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">Abog. Sofía Herrera</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Supervisión / Socio Responsable</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">Dra. Martina Ferraro</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Fecha de Apertura</span>
                  <span className="font-mono text-slate-900 mt-0.5 block">{matter.startDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Visibilidad en Portal Cliente</span>
                  <span className="font-semibold text-emerald-700 mt-0.5 block">
                    {matter.isPublicToClient ? 'Publicado (Habilitado para seguimiento)' : 'Privado'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Summary */}
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-slate-900 text-white shadow-md space-y-3">
              <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider font-bold">
                Control de Radicación
              </span>
              <div className="text-sm font-bold text-slate-100">
                {matter.courtOrganism || 'Sede Administrativa / Arbitral'}
              </div>
              <div className="font-mono text-xs text-amber-300">
                Expte: {matter.courtDocketNumber || 'S/N'}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle space-y-3 text-xs">
              <span className="font-bold text-slate-900 block">Cliente Vinculado</span>
              <div className="font-bold text-amber-800 text-sm">{matter.clientName}</div>
              <Link
                href={`/app/clientes/${matter.clientId}`}
                className="text-xs text-blue-700 hover:text-blue-800 font-semibold inline-flex items-center gap-1 mt-1"
              >
                <span>Ver Ficha 360° del Cliente</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TIMELINE */}
      {activeTab === 'TIMELINE' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Historial Cronológico de Actuaciones</h2>
              <p className="text-xs text-slate-500">Registro inmutable de presentaciones, cédulas, audiencias y aportes de prueba.</p>
            </div>
            <button 
              onClick={() => alert('Carga de actuación: Permite registrar un escrito presentado, proveído de juzgado o notificación oficial.')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus size={14} />
              <span>Cargar Actuación</span>
            </button>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {[
              {
                date: '21 SEP 2026',
                title: 'Presentación de escrito de impulso procesal y queja de peritaje',
                author: 'Abog. Sofía Herrera',
                role: 'Abogada Senior',
                desc: 'Se intimó al perito ingeniero designado de oficio a fijar fecha definitiva para inspección ocular en el predio.',
                doc: 'Escrito_Intimacion_Perito_Ingeniero.pdf'
              },
              {
                date: '14 SEP 2026',
                title: 'Audiencia de conciliación judicial (Art. 360 CPCCN)',
                author: 'Dra. Martina Ferraro',
                role: 'Socia Directora',
                desc: 'Se celebró audiencia testimonial en sede judicial. La aseguradora solicitó cuarto intermedio para elevar propuesta indemnizatoria.'
              },
              {
                date: '10 SEP 2026',
                title: 'Cliente adjuntó comprobantes bancarios de pagos de expensas',
                author: 'Martín Rodríguez',
                role: 'Cliente (Portal)',
                desc: 'Documentación cargada directamente desde el portal cliente para complementar el rubro de daño emergente.',
                doc: 'Comprobantes_Expensas_2025_2026.pdf'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative space-y-1 text-xs">
                <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-amber-600 border-2 border-white ring-2 ring-amber-100" />
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[10px]">
                    {item.date}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600 font-semibold">{item.author} ({item.role})</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                {item.doc && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-mono text-[11px] mt-1 hover:bg-slate-200 cursor-pointer">
                    <FileText size={12} />
                    <span>{item.doc}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TAREAS */}
      {activeTab === 'TAREAS' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Tareas Vinculadas al Expediente</h2>
              <p className="text-xs text-slate-500">Checklist operativo asignado a letrados y contadores.</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {matterTasks.map((t) => (
              <div key={t.id} className="py-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                      {t.status}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{t.title}</span>
                  </div>
                  <span className="font-mono text-red-700 font-bold text-xs">
                    Vence: {t.dueDate}
                  </span>
                </div>

                <p className="text-slate-600">{t.description}</p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-bold block">Checklist:</span>
                  {t.checklist.map((c) => (
                    <div 
                      key={c.id} 
                      onClick={() => toggleTaskChecklist(t.id, c.id)}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
                    >
                      <input 
                        type="checkbox" 
                        checked={c.completed} 
                        onChange={() => {}} 
                        className="rounded text-amber-600" 
                      />
                      <span className={`text-xs ${c.completed ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                        {c.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DOCUMENTOS */}
      {activeTab === 'DOCUMENTOS' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Repositorio Documental del Caso</h2>
              <p className="text-xs text-slate-500">Escritos sellados, peritajes, actas notariales y contratos versionados.</p>
            </div>
            <button 
              onClick={() => alert('Solicitud de Documento: Envía una notificación al portal cliente para pedirle que adjunte un comprobante o constancia.')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus size={14} />
              <span>Solicitar Doc al Cliente</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {matterDocs.map((doc) => (
              <div key={doc.id} className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-amber-700" />
                  <div>
                    <span className="font-bold text-slate-900 block">{doc.fileName}</span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {doc.fileSize} · Versión {doc.version} · Subido por {doc.uploadedByName} ({doc.uploadedAt})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
                    {doc.category}
                  </span>
                  <button 
                    onClick={() => alert(`Descargando copia autorizada de ${doc.fileName}...`)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PERSONAS & PARTES */}
      {activeTab === 'PERSONAS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-subtle space-y-4 text-xs">
            <h2 className="font-mono font-bold text-amber-800 uppercase tracking-wider text-xs">
              Partes Intervinientes
            </h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Parte Actora (Cliente)</span>
                <span className="font-bold text-slate-900 text-sm block">{matter.clientName}</span>
                <span className="text-slate-500">Patrocinio Letrado: Estudio Ferraro & Asociados</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Parte Demandada / Contraparte</span>
                <span className="font-bold text-slate-900 text-sm block">{matter.opposingParty || 'N/A'}</span>
                <span className="text-slate-500">Letrado de Contraparte: {matter.opposingCounsel || 'Sin apoderado constituido'}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-subtle space-y-4 text-xs">
            <h2 className="font-mono font-bold text-amber-800 uppercase tracking-wider text-xs">
              Auxiliares de la Justicia & Peritos
            </h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Perito Ingeniero Edilicio</span>
                <span className="font-bold text-slate-900 block">Ing. Carlos Banchero</span>
                <span className="text-slate-500">Designado de oficio · Aceptó cargo el 10/05/2026</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Perito Contador Oficial</span>
                <span className="font-bold text-slate-900 block">CPN Graciela De Luca</span>
                <span className="text-slate-500">Pendiente de sorteo en Secretaría</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CALENDARIO */}
      {activeTab === 'CALENDARIO' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Audiencias & Vencimientos del Expediente</h2>
          <div className="space-y-3 text-xs">
            {matterEvents.map((evt) => (
              <div key={evt.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-purple-100 text-purple-800">
                    {evt.type}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">{evt.title}</h3>
                  <p className="text-slate-500 mt-0.5">{evt.location} · {evt.attendeeNames.join(', ')}</p>
                </div>
                <div className="text-right font-mono font-bold text-slate-800 text-sm">
                  {new Date(evt.startDate).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: HORAS / TIME TRACKING */}
      {activeTab === 'HORAS' && (
        <div className="space-y-6">
          {/* Form to log hours */}
          <form onSubmit={handleAddTime} className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full sm:w-28">
              <span className="text-[10px] text-slate-400 font-mono uppercase block mb-1">Horas</span>
              <input
                type="number"
                step="0.25"
                value={newHours}
                onChange={(e) => setNewHours(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold"
              />
            </div>
            <div className="flex-1 w-full">
              <span className="text-[10px] text-slate-400 font-mono uppercase block mb-1">Descripción de la Tarea Realizada</span>
              <input
                type="text"
                value={newHoursDesc}
                onChange={(e) => setNewHoursDesc(e.target.value)}
                placeholder="Ej: Redacción de recurso extraordinario ante la Corte..."
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 mt-4 sm:mt-0 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold self-end"
            >
              Registrar Horas
            </button>
          </form>

          {/* Time entries list */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase border-b border-slate-200">
                  <th className="p-3">Profesional</th>
                  <th className="p-3">Descripción</th>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Duración</th>
                  <th className="p-3">Tarifa Horaria</th>
                  <th className="p-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {matterHours.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{t.userName}</td>
                    <td className="p-3 text-slate-700">{t.description}</td>
                    <td className="p-3 text-slate-500 font-mono">{t.date}</td>
                    <td className="p-3 font-mono font-bold text-amber-800">{t.durationHours} hs</td>
                    <td className="p-3 font-mono text-slate-600">${t.hourlyRate} USD/h</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 8: HONORARIOS & GASTOS */}
      {activeTab === 'HONORARIOS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-5 space-y-4">
            <h2 className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
              Facturación & Comprobantes Emitidos
            </h2>
            <div className="space-y-2">
              {matterInvoices.map((inv) => (
                <div key={inv.id} className="p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-slate-900">{inv.invoiceNumber}</span>
                    <span className="text-slate-500 block text-[11px]">{inv.concept}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900 block">{formatCurrency(inv.totalAmount)}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-5 space-y-4">
            <h2 className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
              Gastos & Tasas de Justicia Reintegrables
            </h2>
            <div className="space-y-2">
              {matterExpenses.map((exp) => (
                <div key={exp.id} className="p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-900">{exp.concept}</span>
                    <span className="text-slate-500 block text-[11px] font-mono">{exp.category} · {exp.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900 block">{formatCurrency(exp.amount)}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">Reintegrable</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: NOTAS INTERNAS (CONFIDENCIAL) */}
      {activeTab === 'NOTAS' && (
        <div className="bg-white rounded-xl border border-red-200 shadow-subtle p-6 space-y-6">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs">
            <Lock size={16} className="shrink-0" />
            <div>
              <span className="font-bold">Espacio de Estrategia Confidencial Protegido por Secreto Profesional.</span>
              <span className="block text-[11px] text-red-700">Estas notas jamás se transmiten ni publican en el Portal del Cliente.</span>
            </div>
          </div>

          {/* New note form */}
          <form onSubmit={handleAddNote} className="space-y-3">
            <textarea
              rows={3}
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Escribir nota interna confidencial, estrategia de negociación o apreciación reservada..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2"
            >
              <Send size={13} />
              <span>Guardar Nota Confidencial</span>
            </button>
          </form>

          {/* Notes list */}
          <div className="space-y-3 pt-2">
            {matterNotes.map((note) => (
              <div key={note.id} className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/60 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{note.authorName}</span>
                  <span className="font-mono text-[11px] text-slate-400">{note.createdAt}</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-mono text-[11px]">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
