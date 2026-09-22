// InfoLaw Unified Types & Interfaces

export type UserRoleCode = 
  | 'SUPER_ADMIN'
  | 'SOCIO_DIRECTOR'
  | 'ABOGADO_CONTADOR_SENIOR'
  | 'ABOGADO_CONTADOR_JUNIOR'
  | 'ADMINISTRATIVO'
  | 'RECEPCION'
  | 'CLIENTE';

export interface User {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  roleCode: UserRoleCode;
  roleTitle: string;
  licenseNumber?: string; // T° F° CPACF / CPCECABA
  avatarUrl: string;
  phone: string;
  specialty?: string;
  bio?: string;
  isPartner?: boolean;
}

export interface Organization {
  id: string;
  name: string;
  legalName: string;
  taxId: string; // CUIT
  type: 'LEGAL' | 'ACCOUNTING' | 'MULTIDISCIPLINARY';
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
}

export type ClientType = 'INDIVIDUAL' | 'COMPANY';

export interface Client {
  id: string;
  organizationId: string;
  type: ClientType;
  displayName: string;
  taxId: string; // DNI o CUIT
  email: string;
  phone: string;
  address: string;
  city: string;
  status: 'ACTIVE' | 'PROSPECT' | 'INACTIVE';
  primaryResponsibleId: string;
  portalAccessEnabled: boolean;
  industry?: string;
  legalRepresentative?: string;
  activeMattersCount: number;
  totalBilled: number;
  lastActivity: string;
}

export type MatterType = 
  | 'JUDICIAL'
  | 'EXTRAJUDICIAL'
  | 'CONSULTANCY'
  | 'TAX_AUDIT'
  | 'RECURRENT_ACCOUNTING';

export type MatterStatus = 
  | 'INTAKE'
  | 'ACTIVE'
  | 'WAITING_CLIENT'
  | 'WAITING_THIRD_PARTY'
  | 'COURT_STAGE'
  | 'NEGOTIATION'
  | 'CLOSED'
  | 'ARCHIVED';

export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface Matter {
  id: string;
  organizationId: string;
  internalCode: string; // Ej: EXP-2026-089
  title: string;
  clientId: string;
  clientName: string;
  opposingParty?: string;
  opposingCounsel?: string;
  practiceArea: string;
  type: MatterType;
  responsibleUserId: string;
  teamUserIds: string[];
  courtOrganism?: string;
  courtDocketNumber?: string; // COM 18492/2025
  jurisdiction?: string;
  startDate: string;
  status: MatterStatus;
  priority: PriorityLevel;
  nextAction: string;
  nextActionDeadline: string;
  isPublicToClient: boolean;
  summary: string;
}

export type MatterEventType = 
  | 'FILING'
  | 'HEARING'
  | 'DOCUMENT_UPLOAD'
  | 'CLIENT_NOTE'
  | 'STATUS_CHANGE'
  | 'OFFICIAL_NOTICE'
  | 'TAX_SUBMISSION';

export interface MatterEvent {
  id: string;
  matterId: string;
  authorName: string;
  authorRole: string;
  date: string;
  title: string;
  description: string;
  type: MatterEventType;
  isClientVisible: boolean;
  documentName?: string;
}

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'BLOCKED' | 'IN_REVIEW' | 'COMPLETED';

export interface Task {
  id: string;
  organizationId: string;
  matterId?: string;
  matterTitle?: string;
  clientId?: string;
  clientName?: string;
  title: string;
  description: string;
  assignedToId: string;
  assignedToName: string;
  delegatedById: string;
  priority: PriorityLevel;
  status: TaskStatus;
  dueDate: string;
  checklist: { id: string; text: string; completed: boolean }[];
  commentsCount: number;
}

export type CalendarEventType = 
  | 'HEARING'
  | 'CLIENT_MEETING'
  | 'COURT_DEADLINE'
  | 'TAX_DEADLINE'
  | 'INTERNAL_REVIEW';

export interface CalendarEvent {
  id: string;
  organizationId: string;
  matterId?: string;
  matterTitle?: string;
  clientId?: string;
  title: string;
  type: CalendarEventType;
  startDate: string;
  endDate: string;
  location: string;
  attendeeNames: string[];
  isPublicToClient: boolean;
  priority: PriorityLevel;
}

export type DocumentCategory = 
  | 'CONTRATO'
  | 'DEMANDA'
  | 'ESCRITO'
  | 'PODER'
  | 'DOCUMENTO_IDENTIDAD'
  | 'CONSTANCIA'
  | 'INFORME_CONTABLE'
  | 'DECLARACION_JURADA'
  | 'OTRO';

export interface DocumentItem {
  id: string;
  organizationId: string;
  matterId?: string;
  matterTitle?: string;
  clientId?: string;
  clientName?: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  category: DocumentCategory;
  uploadedByName: string;
  uploadedAt: string;
  version: number;
  isClientVisible: boolean;
}

export type DocumentRequestStatus = 'REQUESTED' | 'RECEIVED' | 'APPROVED' | 'REJECTED';

export interface DocumentRequest {
  id: string;
  clientId: string;
  clientName: string;
  matterId?: string;
  matterTitle?: string;
  requestedByName: string;
  title: string;
  instructions: string;
  dueDate: string;
  status: DocumentRequestStatus;
  receivedFileName?: string;
  updatedAt: string;
}

export interface InternalNote {
  id: string;
  matterId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  isConfidential: boolean;
}

export interface TimeEntry {
  id: string;
  matterId: string;
  matterTitle: string;
  userId: string;
  userName: string;
  date: string;
  durationHours: number;
  description: string;
  isBillable: boolean;
  hourlyRate: number;
  currency: 'ARS' | 'USD';
  status: 'UNBILLED' | 'BILLED';
}

export type InvoiceStatus = 'DRAFT' | 'ISSUED' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export interface Invoice {
  id: string;
  organizationId: string;
  clientId: string;
  clientName: string;
  matterId?: string;
  matterTitle?: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  currency: 'ARS' | 'USD';
  status: InvoiceStatus;
  paidAmount: number;
  balance: number;
  concept: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  date: string;
  amount: number;
  currency: 'ARS' | 'USD';
  paymentMethod: 'TRANSFER' | 'CHECK' | 'CREDIT_CARD' | 'CASH';
  referenceCode: string;
}

export interface Expense {
  id: string;
  matterId: string;
  matterTitle: string;
  concept: string;
  category: 'TASA_JUDICIAL' | 'CERTIFICACION_NOTARIAL' | 'PERITAJE' | 'TRASLADO' | 'DILIGENCIA' | 'OTRO';
  amount: number;
  currency: 'ARS' | 'USD';
  date: string;
  isReimbursable: boolean;
  status: 'PENDING' | 'BILLED' | 'REIMBURSED';
}

export type LeadStage = 
  | 'NEW_LEAD'
  | 'CONTACTED'
  | 'CONSULTATION_SCHEDULED'
  | 'EVALUATION'
  | 'PROPOSAL_SENT'
  | 'WON_CLIENT'
  | 'LOST';

export interface Lead {
  id: string;
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  serviceArea: string;
  stage: LeadStage;
  estimatedValue?: number;
  assignedToName: string;
  notes: string;
  nextAction: string;
  createdAt: string;
}

export interface MessageItem {
  id: string;
  clientId: string;
  matterId?: string;
  senderName: string;
  senderRole: 'STAFF' | 'CLIENT';
  senderAvatar?: string;
  content: string;
  timestamp: string;
  attachments?: string[];
}

export interface AuditLog {
  id: string;
  actorName: string;
  actorRole: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'STATUS_CHANGE' | 'LOGIN' | 'DOCUMENT_DOWNLOAD' | 'PERMISSION_GRANT';
  entityType: string;
  entityId: string;
  changeSummary: string;
  timestamp: string;
  ipAddress: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  authorName: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  imageUrl?: string;
}
