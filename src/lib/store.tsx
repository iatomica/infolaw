'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRoleCode, 
  User, 
  Client, 
  Matter, 
  Task, 
  CalendarEvent, 
  DocumentItem, 
  DocumentRequest, 
  InternalNote, 
  TimeEntry, 
  Invoice, 
  Payment, 
  Expense, 
  Lead, 
  MessageItem, 
  AuditLog, 
  Article 
} from '../types';
import { 
  MOCK_USERS, 
  MOCK_CLIENTS, 
  MOCK_MATTERS, 
  MOCK_TASKS, 
  MOCK_CALENDAR_EVENTS, 
  MOCK_DOCUMENTS, 
  MOCK_DOCUMENT_REQUESTS, 
  MOCK_INTERNAL_NOTES, 
  MOCK_TIME_ENTRIES, 
  MOCK_INVOICES, 
  MOCK_PAYMENTS, 
  MOCK_EXPENSES, 
  MOCK_LEADS, 
  MOCK_MESSAGES, 
  MOCK_AUDIT_LOGS, 
  MOCK_ARTICLES 
} from '../data/mockData';

export type QuickViewItem = 
  | { type: 'client'; data: Client }
  | { type: 'matter'; data: Matter }
  | { type: 'task'; data: Task }
  | { type: 'invoice'; data: Invoice }
  | null;

interface InfoLawContextType {
  // Active Role and User
  currentRole: UserRoleCode;
  currentUser: User;
  switchRole: (role: UserRoleCode) => void;

  // Collections
  clients: Client[];
  matters: Matter[];
  tasks: Task[];
  calendarEvents: CalendarEvent[];
  documents: DocumentItem[];
  documentRequests: DocumentRequest[];
  internalNotes: InternalNote[];
  timeEntries: TimeEntry[];
  invoices: Invoice[];
  payments: Payment[];
  expenses: Expense[];
  leads: Lead[];
  messages: MessageItem[];
  auditLogs: AuditLog[];
  articles: Article[];

  // Mutations
  updateMatterStatus: (matterId: string, newStatus: Matter['status']) => void;
  updateTaskStatus: (taskId: string, newStatus: Task['status']) => void;
  toggleTaskChecklist: (taskId: string, checkId: string) => void;
  createLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  addDocumentRequest: (req: Omit<DocumentRequest, 'id' | 'status' | 'updatedAt'>) => void;
  uploadRequestedDocument: (requestId: string, fileName: string) => void;
  addInternalNote: (matterId: string, content: string) => void;
  addTimeEntry: (entry: Omit<TimeEntry, 'id' | 'userId' | 'userName' | 'status'>) => void;
  createInvoice: (inv: Omit<Invoice, 'id' | 'paidAmount' | 'balance'>) => void;
  addChatMessage: (clientId: string, content: string, senderRole: 'STAFF' | 'CLIENT') => void;

  // Quick View Drawer & Command Palette
  quickView: QuickViewItem;
  openQuickView: (item: NonNullable<QuickViewItem>) => void;
  closeQuickView: () => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

const InfoLawContext = createContext<InfoLawContextType | undefined>(undefined);

export const InfoLawProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Managing Partner (Socio Director)
  const [currentRole, setCurrentRole] = useState<UserRoleCode>('SOCIO_DIRECTOR');
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);

  // Main collections initialized with mock data
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [matters, setMatters] = useState<Matter[]>(MOCK_MATTERS);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(MOCK_CALENDAR_EVENTS);
  const [documents, setDocuments] = useState<DocumentItem[]>(MOCK_DOCUMENTS);
  const [documentRequests, setDocumentRequests] = useState<DocumentRequest[]>(MOCK_DOCUMENT_REQUESTS);
  const [internalNotes, setInternalNotes] = useState<InternalNote[]>(MOCK_INTERNAL_NOTES);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(MOCK_TIME_ENTRIES);
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [messages, setMessages] = useState<MessageItem[]>(MOCK_MESSAGES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
  const [articles] = useState<Article[]>(MOCK_ARTICLES);

  // Quick View & Command Palette UI State
  const [quickView, setQuickView] = useState<QuickViewItem>(null);
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Switch role handler
  const switchRole = (role: UserRoleCode) => {
    setCurrentRole(role);
    if (role === 'CLIENTE') {
      setCurrentUser({
        id: 'client-user-1',
        organizationId: 'org-1',
        name: 'Martín Rodríguez',
        email: 'mrodriguez@inverdelta.com',
        roleCode: 'CLIENTE',
        roleTitle: 'Cliente Principal (Grupo Belgrano & Part.)',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
        phone: '+54 11 6120-8844'
      });
    } else {
      const match = MOCK_USERS.find(u => u.roleCode === role) || MOCK_USERS[0];
      setCurrentUser(match);
    }
  };

  // Keyboard shortcut for Command Palette (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openQuickView = (item: NonNullable<QuickViewItem>) => setQuickView(item);
  const closeQuickView = () => setQuickView(null);

  // Actions
  const updateMatterStatus = (matterId: string, newStatus: Matter['status']) => {
    setMatters(prev => prev.map(m => m.id === matterId ? { ...m, status: newStatus } : m));
    // Append audit log
    const target = matters.find(m => m.id === matterId);
    if (target) {
      setAuditLogs(prev => [
        {
          id: `aud-${Date.now()}`,
          actorName: currentUser.name,
          actorRole: currentUser.roleTitle,
          action: 'STATUS_CHANGE',
          entityType: 'Expediente',
          entityId: target.internalCode,
          changeSummary: `Estado actualizado a "${newStatus}"`,
          timestamp: 'Justo ahora',
          ipAddress: '190.220.14.82'
        },
        ...prev
      ]);
    }
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const toggleTaskChecklist = (taskId: string, checkId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        checklist: t.checklist.map(c => c.id === checkId ? { ...c, completed: !c.completed } : c)
      };
    }));
  };

  const createLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `led-${Date.now()}`,
      createdAt: 'Justo ahora'
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const addDocumentRequest = (reqData: Omit<DocumentRequest, 'id' | 'status' | 'updatedAt'>) => {
    const newReq: DocumentRequest = {
      ...reqData,
      id: `req-${Date.now()}`,
      status: 'REQUESTED',
      updatedAt: 'Justo ahora'
    };
    setDocumentRequests(prev => [newReq, ...prev]);
  };

  const uploadRequestedDocument = (requestId: string, fileName: string) => {
    setDocumentRequests(prev => prev.map(r => {
      if (r.id !== requestId) return r;
      return {
        ...r,
        status: 'RECEIVED',
        receivedFileName: fileName,
        updatedAt: 'Justo ahora'
      };
    }));
  };

  const addInternalNote = (matterId: string, content: string) => {
    const note: InternalNote = {
      id: `not-${Date.now()}`,
      matterId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      content,
      createdAt: 'Justo ahora',
      isConfidential: true
    };
    setInternalNotes(prev => [note, ...prev]);
  };

  const addTimeEntry = (entryData: Omit<TimeEntry, 'id' | 'userId' | 'userName' | 'status'>) => {
    const entry: TimeEntry = {
      ...entryData,
      id: `tim-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      status: 'UNBILLED'
    };
    setTimeEntries(prev => [entry, ...prev]);
  };

  const createInvoice = (invData: Omit<Invoice, 'id' | 'paidAmount' | 'balance'>) => {
    const inv: Invoice = {
      ...invData,
      id: `inv-${Date.now()}`,
      paidAmount: 0,
      balance: invData.totalAmount
    };
    setInvoices(prev => [inv, ...prev]);
  };

  const addChatMessage = (clientId: string, content: string, senderRole: 'STAFF' | 'CLIENT') => {
    const msg: MessageItem = {
      id: `msg-${Date.now()}`,
      clientId,
      senderName: currentUser.name,
      senderRole,
      content,
      timestamp: 'Justo ahora'
    };
    setMessages(prev => [...prev, msg]);
  };

  return (
    <InfoLawContext.Provider
      value={{
        currentRole,
        currentUser,
        switchRole,
        clients,
        matters,
        tasks,
        calendarEvents,
        documents,
        documentRequests,
        internalNotes,
        timeEntries,
        invoices,
        payments,
        expenses,
        leads,
        messages,
        auditLogs,
        articles,
        updateMatterStatus,
        updateTaskStatus,
        toggleTaskChecklist,
        createLead,
        addDocumentRequest,
        uploadRequestedDocument,
        addInternalNote,
        addTimeEntry,
        createInvoice,
        addChatMessage,
        quickView,
        openQuickView,
        closeQuickView,
        isCommandPaletteOpen,
        setCommandPaletteOpen
      }}
    >
      {children}
    </InfoLawContext.Provider>
  );
};

export const useInfoLaw = () => {
  const context = useContext(InfoLawContext);
  if (!context) {
    throw new Error('useInfoLaw must be used within an InfoLawProvider');
  }
  return context;
};
