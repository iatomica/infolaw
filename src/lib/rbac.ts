import { UserRoleCode } from '../types';

export type PermissionCode = 
  | 'org.manage'
  | 'users.manage'
  | 'roles.manage'
  | 'audit.read'
  | 'clients.read'
  | 'clients.write'
  | 'clients.delete'
  | 'cases.read'
  | 'cases.write'
  | 'cases.delete'
  | 'internal_notes.read'
  | 'internal_notes.write'
  | 'tasks.manage'
  | 'calendar.manage'
  | 'documents.read'
  | 'documents.write'
  | 'documents.request'
  | 'crm.pipeline'
  | 'billing.view'
  | 'billing.manage'
  | 'timetrack.all'
  | 'timetrack.self';

export const ROLE_PERMISSIONS: Record<UserRoleCode, PermissionCode[]> = {
  SUPER_ADMIN: [
    'org.manage', 'users.manage', 'roles.manage', 'audit.read',
    'clients.read', 'clients.write', 'clients.delete',
    'cases.read', 'cases.write', 'cases.delete',
    'internal_notes.read', 'internal_notes.write',
    'tasks.manage', 'calendar.manage',
    'documents.read', 'documents.write', 'documents.request',
    'crm.pipeline', 'billing.view', 'billing.manage',
    'timetrack.all', 'timetrack.self'
  ],
  SOCIO_DIRECTOR: [
    'users.manage', 'audit.read',
    'clients.read', 'clients.write',
    'cases.read', 'cases.write',
    'internal_notes.read', 'internal_notes.write',
    'tasks.manage', 'calendar.manage',
    'documents.read', 'documents.write', 'documents.request',
    'crm.pipeline', 'billing.view', 'billing.manage',
    'timetrack.all', 'timetrack.self'
  ],
  ABOGADO_CONTADOR_SENIOR: [
    'clients.read', 'clients.write',
    'cases.read', 'cases.write',
    'internal_notes.read', 'internal_notes.write',
    'tasks.manage', 'calendar.manage',
    'documents.read', 'documents.write', 'documents.request',
    'crm.pipeline', 'billing.view',
    'timetrack.self'
  ],
  ABOGADO_CONTADOR_JUNIOR: [
    'clients.read',
    'cases.read',
    'tasks.manage', 'calendar.manage',
    'documents.read', 'documents.write',
    'timetrack.self'
  ],
  ADMINISTRATIVO: [
    'clients.read', 'clients.write',
    'cases.read',
    'tasks.manage', 'calendar.manage',
    'documents.read', 'documents.write', 'documents.request',
    'billing.view', 'billing.manage',
    'crm.pipeline'
  ],
  RECEPCION: [
    'clients.read',
    'calendar.manage',
    'documents.write',
    'crm.pipeline'
  ],
  CLIENTE: [
    'cases.read',
    'documents.read',
    'documents.write',
    'billing.view'
  ]
};

export function hasPermission(role: UserRoleCode, permission: PermissionCode): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

export function getRoleBadgeInfo(role: UserRoleCode): { label: string; color: string } {
  switch (role) {
    case 'SUPER_ADMIN':
      return { label: 'Super Admin', color: 'bg-red-500/10 text-red-700 border-red-200' };
    case 'SOCIO_DIRECTOR':
      return { label: 'Socio Director', color: 'bg-amber-500/10 text-amber-700 border-amber-200' };
    case 'ABOGADO_CONTADOR_SENIOR':
      return { label: 'Profesional Senior', color: 'bg-blue-500/10 text-blue-700 border-blue-200' };
    case 'ABOGADO_CONTADOR_JUNIOR':
      return { label: 'Profesional Junior', color: 'bg-slate-500/10 text-slate-700 border-slate-200' };
    case 'ADMINISTRATIVO':
      return { label: 'Administración', color: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' };
    case 'RECEPCION':
      return { label: 'Recepción & Intake', color: 'bg-indigo-500/10 text-indigo-700 border-indigo-200' };
    case 'CLIENTE':
      return { label: 'Portal Cliente', color: 'bg-purple-500/10 text-purple-700 border-purple-200' };
    default:
      return { label: role, color: 'bg-gray-100 text-gray-700 border-gray-200' };
  }
}
