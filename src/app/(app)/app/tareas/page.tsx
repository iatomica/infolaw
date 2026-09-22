'use client';

import React, { useState } from 'react';
import { useInfoLaw } from '@/lib/store';
import { TaskStatus, PriorityLevel, Task } from '@/types';
import { 
  CheckSquare, 
  Plus, 
  List, 
  Kanban, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical
} from 'lucide-react';

export default function TareasPage() {
  const { tasks, updateTaskStatus, toggleTaskChecklist, openQuickView } = useInfoLaw();
  const [viewMode, setViewMode] = useState<'KANBAN' | 'LIST'>('KANBAN');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const columns: { status: TaskStatus; label: string; color: string }[] = [
    { status: 'PENDING', label: 'Pendiente', color: 'border-slate-300' },
    { status: 'IN_PROGRESS', label: 'En Progreso', color: 'border-blue-400' },
    { status: 'IN_REVIEW', label: 'En Revisión / Firma', color: 'border-amber-400' },
    { status: 'COMPLETED', label: 'Completada', color: 'border-emerald-400' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider block">
            Project Management Jurídico & Contable
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Tareas, Actuaciones & Checklists
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Seguimiento de redacción de escritos, liquidaciones fiscales y diligencias asignadas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View switcher */}
          <div className="bg-slate-200/80 p-1 rounded-lg flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => setViewMode('KANBAN')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                viewMode === 'KANBAN' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Kanban size={14} />
              <span>Tablero Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('LIST')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                viewMode === 'LIST' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List size={14} />
              <span>Lista Detallada</span>
            </button>
          </div>

          <button 
            onClick={() => alert('Crear Tarea: Permite asignar responsable, plazo fatal y asociar a un expediente.')}
            className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Plus size={14} />
            <span>Nueva Tarea</span>
          </button>
        </div>
      </div>

      {/* KANBAN VIEW */}
      {viewMode === 'KANBAN' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
          {columns.map((col) => {
            const colTasks = tasks.filter(t => t.status === col.status);
            return (
              <div 
                key={col.status} 
                className="bg-slate-100/70 rounded-xl p-3.5 border border-slate-200 space-y-3"
              >
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-800 uppercase tracking-wide">
                      {col.label}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                      {colTasks.length}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => openQuickView({ type: 'task', data: task })}
                      className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all cursor-pointer space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          task.priority === 'HIGH' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-red-700">
                          {task.dueDate}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {task.title}
                      </h4>

                      {task.matterTitle && (
                        <div className="text-[11px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 truncate">
                          {task.matterTitle}
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span>{task.assignedToName.split(' ')[1] || task.assignedToName}</span>
                        <span className="font-mono">
                          {task.checklist.filter(c => c.completed).length}/{task.checklist.length} ítems
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'LIST' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase border-b border-slate-200">
                <th className="p-3">Estado</th>
                <th className="p-3">Tarea</th>
                <th className="p-3">Expediente Asociado</th>
                <th className="p-3">Responsable</th>
                <th className="p-3">Vencimiento</th>
                <th className="p-3">Prioridad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tasks.map((task) => (
                <tr 
                  key={task.id} 
                  onClick={() => openQuickView({ type: 'task', data: task })}
                  className="hover:bg-slate-50 cursor-pointer"
                >
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                      {task.status}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-slate-900">{task.title}</td>
                  <td className="p-3 font-mono text-amber-800">{task.matterTitle || 'General'}</td>
                  <td className="p-3 text-slate-700">{task.assignedToName}</td>
                  <td className="p-3 font-mono font-bold text-red-700">{task.dueDate}</td>
                  <td className="p-3">
                    <span className="font-mono text-[10px] text-slate-600 font-semibold">{task.priority}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
