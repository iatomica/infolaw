import { 
  Organization, 
  User, 
  Client, 
  Matter, 
  MatterEvent, 
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

export const MOCK_ORGANIZATION: Organization = {
  id: 'org-1',
  name: 'Estudio Ferraro & Asociados',
  legalName: 'Ferraro, Bianchi & Méndez S.C.',
  taxId: '30-71458920-4',
  type: 'MULTIDISCIPLINARY',
  address: 'Av. Corrientes 456, Piso 12',
  city: 'Ciudad Autónoma de Buenos Aires',
  country: 'Argentina',
  phone: '+54 11 5239-8000',
  email: 'contacto@ferraroyasoc.com.ar'
};

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    organizationId: 'org-1',
    name: 'Dra. Martina Ferraro',
    email: 'mferraro@ferraroyasoc.com.ar',
    roleCode: 'SOCIO_DIRECTOR',
    roleTitle: 'Socia Directora · Derecho Corporativo & Litigios',
    licenseNumber: 'T° 84 F° 122 CPACF',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    phone: '+54 11 4055-1101',
    specialty: 'Derecho Societario & Arbitraje Comercial',
    bio: 'Graduada con honores en la UBA. Máster en Derecho Empresarial (Austral). Más de 20 años asesorando grupos empresarios en reestructuraciones y litigios complejos.',
    isPartner: true
  },
  {
    id: 'user-2',
    organizationId: 'org-1',
    name: 'Dr. Ignacio Bianchi',
    email: 'ibianchi@ferraroyasoc.com.ar',
    roleCode: 'SOCIO_DIRECTOR',
    roleTitle: 'Socio · Derecho Laboral & Negociación Colectiva',
    licenseNumber: 'T° 91 F° 408 CPACF',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    phone: '+54 11 4055-1102',
    specialty: 'Conflictos Laborales y Sindicales',
    bio: 'Especialista en derecho del trabajo y relaciones laborales de alta complejidad. Árbitro en tribunales arbitrales nacionales.',
    isPartner: true
  },
  {
    id: 'user-3',
    organizationId: 'org-1',
    name: 'CPN Lucía Méndez',
    email: 'lmendez@ferraroyasoc.com.ar',
    roleCode: 'SOCIO_DIRECTOR',
    roleTitle: 'Socia · Planificación Fiscal & Auditoría',
    licenseNumber: 'T° 142 F° 89 CPCECABA',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    phone: '+54 11 4055-1103',
    specialty: 'Impuestos Corporativos y Precios de Transferencia',
    bio: 'Contadora Pública (UBA). Especialista en Tributación y estructuración fiscal para empresas multinacionales y PyMEs en expansión.',
    isPartner: true
  },
  {
    id: 'user-4',
    organizationId: 'org-1',
    name: 'Abog. Sofía Herrera',
    email: 'sherrera@ferraroyasoc.com.ar',
    roleCode: 'ABOGADO_CONTADOR_SENIOR',
    roleTitle: 'Abogada Senior · Contratos & Litigios',
    licenseNumber: 'T° 108 F° 712 CPACF',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    phone: '+54 11 4055-1104',
    specialty: 'Litigios Comerciales y Daños',
    bio: 'Abogada litigante con destacada actuación en fueros comercial y civil nacional. Redactora de dictámenes procesales.',
    isPartner: false
  },
  {
    id: 'user-5',
    organizationId: 'org-1',
    name: 'CPN Tomás Peralta',
    email: 'tperalta@ferraroyasoc.com.ar',
    roleCode: 'ABOGADO_CONTADOR_JUNIOR',
    roleTitle: 'Contador Junior · Liquidación Impositiva',
    licenseNumber: 'T° 201 F° 55 CPCECABA',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
    phone: '+54 11 4055-1105',
    specialty: 'Presentaciones ARCA/AFIP y Balances',
    bio: 'Joven profesional enfocado en fiscalidad mensual, libros contables digitales y auditoría documental.',
    isPartner: false
  },
  {
    id: 'user-6',
    organizationId: 'org-1',
    name: 'Lic. Andrea Gómez',
    email: 'agomez@ferraroyasoc.com.ar',
    roleCode: 'ADMINISTRATIVO',
    roleTitle: 'Responsable de Facturación & Cobranzas',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=250',
    phone: '+54 11 4055-1106',
    specialty: 'Gestión Administrativa',
    isPartner: false
  },
  {
    id: 'user-7',
    organizationId: 'org-1',
    name: 'Camila Rossi',
    email: 'crossi@ferraroyasoc.com.ar',
    roleCode: 'RECEPCION',
    roleTitle: 'Recepción & Coordinación de Turnos',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=250',
    phone: '+54 11 4055-1107',
    specialty: 'Atención al Cliente',
    isPartner: false
  }
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'cli-1',
    organizationId: 'org-1',
    type: 'COMPANY',
    displayName: 'Grupo Belgrano S.A.',
    taxId: '30-71458920-4',
    email: 'directorio@grupobelgrano.com.ar',
    phone: '+54 11 4890-5000',
    address: 'Av. Libertador 2200, Piso 8',
    city: 'CABA',
    status: 'ACTIVE',
    primaryResponsibleId: 'user-1',
    portalAccessEnabled: true,
    industry: 'Logística & Comercio Exterior',
    legalRepresentative: 'Ing. Esteban Belgrano',
    activeMattersCount: 3,
    totalBilled: 14850000,
    lastActivity: 'Hoy 11:20'
  },
  {
    id: 'cli-2',
    organizationId: 'org-1',
    type: 'INDIVIDUAL',
    displayName: 'Martín Rodríguez',
    taxId: '20-28491022-7',
    email: 'mrodriguez@inverdelta.com',
    phone: '+54 11 6120-8844',
    address: 'Billinghurst 1845, PB',
    city: 'CABA',
    status: 'ACTIVE',
    primaryResponsibleId: 'user-4',
    portalAccessEnabled: true,
    industry: 'Desarrollo Inmobiliario',
    activeMattersCount: 1,
    totalBilled: 3200000,
    lastActivity: 'Ayer 16:45'
  },
  {
    id: 'cli-3',
    organizationId: 'org-1',
    type: 'COMPANY',
    displayName: 'Inversiones del Plata S.R.L.',
    taxId: '30-68932014-9',
    email: 'administracion@delplatasrl.com',
    phone: '+54 11 4322-9011',
    address: 'Reconquista 650, Piso 4',
    city: 'CABA',
    status: 'ACTIVE',
    primaryResponsibleId: 'user-3',
    portalAccessEnabled: true,
    industry: 'Inversiones Financieras',
    legalRepresentative: 'Lic. Guillermo Castro',
    activeMattersCount: 2,
    totalBilled: 8900000,
    lastActivity: '18 Sep 2026'
  },
  {
    id: 'cli-4',
    organizationId: 'org-1',
    type: 'INDIVIDUAL',
    displayName: 'Luciana Torres',
    taxId: '27-33102845-4',
    email: 'luciana.torres@estudiotorres.ar',
    phone: '+54 11 5099-3312',
    address: 'Gorostiaga 1720',
    city: 'CABA',
    status: 'ACTIVE',
    primaryResponsibleId: 'user-2',
    portalAccessEnabled: true,
    industry: 'Particular / Sucesiones',
    activeMattersCount: 1,
    totalBilled: 2100000,
    lastActivity: '15 Sep 2026'
  },
  {
    id: 'cli-5',
    organizationId: 'org-1',
    type: 'COMPANY',
    displayName: 'Agropecuaria Pampa Norte S.A.',
    taxId: '30-62119844-3',
    email: 'finanzas@pampanorte.com.ar',
    phone: '+54 236 443-8900',
    address: 'Ruta 7 Km 258',
    city: 'Junín, Bs. As.',
    status: 'ACTIVE',
    primaryResponsibleId: 'user-3',
    portalAccessEnabled: true,
    industry: 'Producción Agropecuaria & Granos',
    legalRepresentative: 'Dr. Roberto Pampa',
    activeMattersCount: 2,
    totalBilled: 19400000,
    lastActivity: '12 Sep 2026'
  }
];

export const MOCK_MATTERS: Matter[] = [
  {
    id: 'mat-1',
    organizationId: 'org-1',
    internalCode: 'EXP-2026-089',
    title: 'Rodríguez c/ Inmobiliaria Delta s/ Daños y Perjuicios',
    clientId: 'cli-2',
    clientName: 'Martín Rodríguez',
    opposingParty: 'Inmobiliaria Delta S.A. y Aseguradora del Sur',
    opposingCounsel: 'Dr. Horacio Valenzuela',
    practiceArea: 'Litigios Comerciales & Daños',
    type: 'JUDICIAL',
    responsibleUserId: 'user-4',
    teamUserIds: ['user-1', 'user-4'],
    courtOrganism: 'Juzgado Nacional de Primera Instancia en lo Comercial N° 14, Secretaría 28',
    courtDocketNumber: 'COM 18492/2025',
    jurisdiction: 'Justicia Nacional Ordinaria (CABA)',
    startDate: '14/03/2025',
    status: 'COURT_STAGE',
    priority: 'HIGH',
    nextAction: 'Presentar alegatos y producir informe pericial de ingeniería edilicia',
    nextActionDeadline: '28/09/2026',
    isPublicToClient: true,
    summary: 'Demanda ordinaria por incumplimiento contractual en entrega de desarrollo inmobiliario en pozo y vicios constructivos graves.'
  },
  {
    id: 'mat-2',
    organizationId: 'org-1',
    internalCode: 'EXP-2026-042',
    title: 'Constitución Sociedad Vehículo & Pacto de Accionistas',
    clientId: 'cli-1',
    clientName: 'Grupo Belgrano S.A.',
    opposingParty: 'Socios Minoritarios / Inversores Semilla',
    practiceArea: 'Derecho Corporativo & M&A',
    type: 'EXTRAJUDICIAL',
    responsibleUserId: 'user-1',
    teamUserIds: ['user-1', 'user-4'],
    jurisdiction: 'IGJ CABA',
    startDate: '02/06/2026',
    status: 'ACTIVE',
    priority: 'MEDIUM',
    nextAction: 'Dictamen de precalificación notarial e inscripción definitiva en IGJ',
    nextActionDeadline: '30/09/2026',
    isPublicToClient: true,
    summary: 'Estructuración societaria para nueva división logística con cláusulas de tag-along, drag-along y resolución de controversias en el CAM.'
  },
  {
    id: 'mat-3',
    organizationId: 'org-1',
    internalCode: 'EXP-2026-105',
    title: 'Auditoría Fiscal Preventiva y Planificación Ganancias 2026',
    clientId: 'cli-1',
    clientName: 'Grupo Belgrano S.A.',
    opposingParty: 'ARCA (ex AFIP) - Dirección Regional Centro',
    practiceArea: 'Derecho Tributario & Contabilidad',
    type: 'TAX_AUDIT',
    responsibleUserId: 'user-3',
    teamUserIds: ['user-3', 'user-5'],
    courtOrganism: 'ARCA - División Fiscalización Externa N° 4',
    jurisdiction: 'Nacional Tributario',
    startDate: '10/08/2026',
    status: 'WAITING_CLIENT',
    priority: 'HIGH',
    nextAction: 'Revisión final de libros IVA digital y justificación de retenciones computadas',
    nextActionDeadline: '25/09/2026',
    isPublicToClient: true,
    summary: 'Defensa preventiva frente a requerimiento de inspección sobre deducciones de gastos financieros del período fiscal anterior.'
  },
  {
    id: 'mat-4',
    organizationId: 'org-1',
    internalCode: 'EXP-2026-017',
    title: 'Revisión Contractual y Cláusula Arbitral Proveedor Brasil',
    clientId: 'cli-3',
    clientName: 'Inversiones del Plata S.R.L.',
    opposingParty: 'Sul Logística e Participações Ltda.',
    practiceArea: 'Contratos Internacionales & Comercio Exterior',
    type: 'CONSULTANCY',
    responsibleUserId: 'user-1',
    teamUserIds: ['user-1'],
    jurisdiction: 'Cámara de Comercio Internacional (CCI París)',
    startDate: '15/01/2026',
    status: 'NEGOTIATION',
    priority: 'HIGH',
    nextAction: 'Remitir adenda con limitación de responsabilidad y ley aplicable neutral',
    nextActionDeadline: '02/10/2026',
    isPublicToClient: true,
    summary: 'Contrato de suministro internacional y distribución exclusiva para el Cono Sur con cláusulas de seguro y contingencias arancelarias.'
  },
  {
    id: 'mat-5',
    organizationId: 'org-1',
    internalCode: 'EXP-2025-231',
    title: 'Sucesión Torres c/ Legatarios',
    clientId: 'cli-4',
    clientName: 'Luciana Torres',
    opposingParty: 'Co-herederos y Acreedores Testamentarios',
    practiceArea: 'Derecho Civil & Sucesiones',
    type: 'JUDICIAL',
    responsibleUserId: 'user-2',
    teamUserIds: ['user-2', 'user-4'],
    courtOrganism: 'Juzgado Nacional de Primera Instancia en lo Civil N° 82',
    courtDocketNumber: 'CIV 49301/2024',
    jurisdiction: 'Justicia Civil Nacional (CABA)',
    startDate: '20/11/2025',
    status: 'COURT_STAGE',
    priority: 'MEDIUM',
    nextAction: 'Inscripción de declaratoria de herederos sobre inmueble de Av. Santa Fe',
    nextActionDeadline: '05/10/2026',
    isPublicToClient: true,
    summary: 'Trámite sucesorio con acuerdo unánime de adjudicación de bienes registrables e informes de dominio sin gravámenes.'
  }
];

export const MOCK_TIMELINE_EVENTS: MatterEvent[] = [
  {
    id: 'ev-1',
    matterId: 'mat-1',
    authorName: 'Abog. Sofía Herrera',
    authorRole: 'Abogada Senior',
    date: '21 Sep 2026',
    title: 'Presentación de escrito de impulso procesal y queja de peritaje',
    description: 'Se intimó al perito ingeniero designado de oficio a fijar fecha definitiva para inspección ocular en el predio.',
    type: 'FILING',
    isClientVisible: true,
    documentName: 'Escrito_Intimacion_Perito_Ingeniero.pdf'
  },
  {
    id: 'ev-2',
    matterId: 'mat-1',
    authorName: 'Dra. Martina Ferraro',
    authorRole: 'Socia Directora',
    date: '14 Sep 2026',
    title: 'Audiencia de conciliación judicial (Art. 360 CPCCN)',
    description: 'Se celebró audiencia testimonial en sede judicial. La aseguradora solicitó cuarto intermedio para elevar propuesta indemnizatoria.',
    type: 'HEARING',
    isClientVisible: true
  },
  {
    id: 'ev-3',
    matterId: 'mat-1',
    authorName: 'Martín Rodríguez',
    authorRole: 'Cliente',
    date: '10 Sep 2026',
    title: 'Cliente adjuntó comprobantes bancarios de pagos de expensas',
    description: 'Documentación cargada directamente desde el portal cliente para complementar el rubro de daño emergente.',
    type: 'DOCUMENT_UPLOAD',
    isClientVisible: true,
    documentName: 'Comprobantes_Expensas_2025_2026.pdf'
  },
  {
    id: 'ev-4',
    matterId: 'mat-3',
    authorName: 'CPN Lucía Méndez',
    authorRole: 'Socia Tributaria',
    date: '18 Sep 2026',
    title: 'Presentación de descargo formal ante ARCA / AFIP',
    description: 'Se dio respuesta al requerimiento F. 8000 acompañando planillas de conciliación bancaria y contratos certificados.',
    type: 'TAX_SUBMISSION',
    isClientVisible: true,
    documentName: 'Descargo_Requerimiento_ARCA_F8000.pdf'
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 'tsk-1',
    organizationId: 'org-1',
    matterId: 'mat-1',
    matterTitle: 'Rodríguez c/ Inmobiliaria Delta',
    clientId: 'cli-2',
    clientName: 'Martín Rodríguez',
    title: 'Redactar alegatos de prueba documental y testimonial',
    description: 'Sintetizar las contradicciones de los testigos de la constructora y adjuntar tasación de martillero matriculado.',
    assignedToId: 'user-4',
    assignedToName: 'Abog. Sofía Herrera',
    delegatedById: 'user-1',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    dueDate: '25/09/2026',
    checklist: [
      { id: 'chk-1', text: 'Revisar acta notarial de constatación', completed: true },
      { id: 'chk-2', text: 'Calcular actualización monetaria con tasa activa BNA', completed: true },
      { id: 'chk-3', text: 'Cierre de conclusiones y firma digital del escrito', completed: false }
    ],
    commentsCount: 4
  },
  {
    id: 'tsk-2',
    organizationId: 'org-1',
    matterId: 'mat-3',
    matterTitle: 'Auditoría Fiscal Grupo Belgrano',
    clientId: 'cli-1',
    clientName: 'Grupo Belgrano S.A.',
    title: 'Conciliar retenciones y percepciones SICORE del ejercicio',
    description: 'Verificar certificados en Mis Retenciones y cruzar con libro IVA Compras digital.',
    assignedToId: 'user-5',
    assignedToName: 'CPN Tomás Peralta',
    delegatedById: 'user-3',
    priority: 'HIGH',
    status: 'PENDING',
    dueDate: '24/09/2026',
    checklist: [
      { id: 'chk-4', text: 'Descargar reporte TXT de ARCA', completed: true },
      { id: 'chk-5', text: 'Armar matriz de diferencias temporarias', completed: false }
    ],
    commentsCount: 2
  },
  {
    id: 'tsk-3',
    organizationId: 'org-1',
    matterId: 'mat-2',
    matterTitle: 'Constitución Sociedad Grupo Belgrano',
    clientId: 'cli-1',
    clientName: 'Grupo Belgrano S.A.',
    title: 'Gestionar rúbrica de libros de comercio y depósito en garantía',
    description: 'Completar formulario de depósito del 25% del capital social en Banco Nación.',
    assignedToId: 'user-4',
    assignedToName: 'Abog. Sofía Herrera',
    delegatedById: 'user-1',
    priority: 'MEDIUM',
    status: 'IN_REVIEW',
    dueDate: '28/09/2026',
    checklist: [
      { id: 'chk-6', text: 'Certificar estatuto por escribano público', completed: true },
      { id: 'chk-7', text: 'Publicar edictos en Boletín Oficial', completed: true },
      { id: 'chk-8', text: 'Generar timbrado F.1 de IGJ', completed: false }
    ],
    commentsCount: 1
  },
  {
    id: 'tsk-4',
    organizationId: 'org-1',
    matterId: 'mat-4',
    matterTitle: 'Revisión Contractual Proveedor Brasil',
    clientId: 'cli-3',
    clientName: 'Inversiones del Plata S.R.L.',
    title: 'Traducir y compatibilizar términos Incoterms DDP 2020',
    description: 'Asegurar que la transferencia de riesgos coincida con la póliza de transporte multimodal.',
    assignedToId: 'user-1',
    assignedToName: 'Dra. Martina Ferraro',
    delegatedById: 'user-1',
    priority: 'MEDIUM',
    status: 'PENDING',
    dueDate: '01/10/2026',
    checklist: [
      { id: 'chk-9', text: 'Revisar borrador en portugués', completed: false }
    ],
    commentsCount: 0
  },
  {
    id: 'tsk-5',
    organizationId: 'org-1',
    clientId: 'cli-1',
    clientName: 'Grupo Belgrano S.A.',
    title: 'Emitir factura mensual por abono corporativo Septiembre',
    description: 'Facturar abono legal y contable integral según acuerdo de honorarios vigente.',
    assignedToId: 'user-6',
    assignedToName: 'Lic. Andrea Gómez',
    delegatedById: 'user-3',
    priority: 'LOW',
    status: 'COMPLETED',
    dueDate: '20/09/2026',
    checklist: [
      { id: 'chk-10', text: 'Comprobar horas adicionales del mes', completed: true },
      { id: 'chk-11', text: 'Enviar comprobante por correo electrónico', completed: true }
    ],
    commentsCount: 1
  }
];

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'cal-1',
    organizationId: 'org-1',
    matterId: 'mat-1',
    matterTitle: 'Rodríguez c/ Inmobiliaria Delta',
    clientId: 'cli-2',
    title: 'Inspección Pericial Ocular Inmueble',
    type: 'HEARING',
    startDate: '2026-09-24T10:00:00',
    endDate: '2026-09-24T12:00:00',
    location: 'Av. Juan B. Justo 3420, CABA',
    attendeeNames: ['Abog. Sofía Herrera', 'Martín Rodríguez', 'Perito Ing. Banchero'],
    isPublicToClient: true,
    priority: 'HIGH'
  },
  {
    id: 'cal-2',
    organizationId: 'org-1',
    matterId: 'mat-3',
    matterTitle: 'Auditoría Fiscal Grupo Belgrano',
    clientId: 'cli-1',
    title: 'Vencimiento Respuesta Requerimiento ARCA (AFIP)',
    type: 'TAX_DEADLINE',
    startDate: '2026-09-25T13:00:00',
    endDate: '2026-09-25T14:00:00',
    location: 'Plataforma Trámites a Distancia (TAD)',
    attendeeNames: ['CPN Lucía Méndez', 'CPN Tomás Peralta'],
    isPublicToClient: true,
    priority: 'URGENT'
  },
  {
    id: 'cal-3',
    organizationId: 'org-1',
    matterId: 'mat-2',
    matterTitle: 'Constitución Sociedad Grupo Belgrano',
    clientId: 'cli-1',
    title: 'Firma de Estatuto y Poder en Escribanía',
    type: 'CLIENT_MEETING',
    startDate: '2026-09-26T15:30:00',
    endDate: '2026-09-26T17:00:00',
    location: 'Escribanía Albarracín - Reconquista 336',
    attendeeNames: ['Dra. Martina Ferraro', 'Ing. Esteban Belgrano'],
    isPublicToClient: true,
    priority: 'MEDIUM'
  },
  {
    id: 'cal-4',
    organizationId: 'org-1',
    title: 'Reunión de Socios: Planificación Estratégica Q4',
    type: 'INTERNAL_REVIEW',
    startDate: '2026-09-28T09:00:00',
    endDate: '2026-09-28T11:00:00',
    location: 'Sala de Directorio Estudio',
    attendeeNames: ['Dra. Martina Ferraro', 'Dr. Ignacio Bianchi', 'CPN Lucía Méndez'],
    isPublicToClient: false,
    priority: 'HIGH'
  }
];

export const MOCK_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    organizationId: 'org-1',
    matterId: 'mat-1',
    matterTitle: 'Rodríguez c/ Inmobiliaria Delta',
    clientId: 'cli-2',
    clientName: 'Martín Rodríguez',
    fileName: 'Demanda_Ordinaria_Inmobiliaria_Delta_Sellada.pdf',
    fileSize: '3.8 MB',
    fileType: 'application/pdf',
    category: 'DEMANDA',
    uploadedByName: 'Abog. Sofía Herrera',
    uploadedAt: '15 Mar 2025',
    version: 1,
    isClientVisible: true
  },
  {
    id: 'doc-2',
    organizationId: 'org-1',
    matterId: 'mat-1',
    matterTitle: 'Rodríguez c/ Inmobiliaria Delta',
    clientId: 'cli-2',
    clientName: 'Martín Rodríguez',
    fileName: 'Pericia_Arquitectonica_Preliminar_Conclusiones.pdf',
    fileSize: '6.2 MB',
    fileType: 'application/pdf',
    category: 'INFORME_CONTABLE',
    uploadedByName: 'Abog. Sofía Herrera',
    uploadedAt: '08 Ago 2026',
    version: 2,
    isClientVisible: true
  },
  {
    id: 'doc-3',
    organizationId: 'org-1',
    matterId: 'mat-2',
    matterTitle: 'Constitución Sociedad Grupo Belgrano',
    clientId: 'cli-1',
    clientName: 'Grupo Belgrano S.A.',
    fileName: 'Borrador_Estatuto_Social_Logistica_Sur_SA.docx',
    fileSize: '840 KB',
    fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    category: 'CONTRATO',
    uploadedByName: 'Dra. Martina Ferraro',
    uploadedAt: '12 Sep 2026',
    version: 3,
    isClientVisible: true
  },
  {
    id: 'doc-4',
    organizationId: 'org-1',
    matterId: 'mat-3',
    matterTitle: 'Auditoría Fiscal Grupo Belgrano',
    clientId: 'cli-1',
    clientName: 'Grupo Belgrano S.A.',
    fileName: 'Requerimiento_Oficial_ARCA_Expte_8842.pdf',
    fileSize: '1.2 MB',
    fileType: 'application/pdf',
    category: 'DECLARACION_JURADA',
    uploadedByName: 'CPN Lucía Méndez',
    uploadedAt: '10 Ago 2026',
    version: 1,
    isClientVisible: true
  }
];

export const MOCK_DOCUMENT_REQUESTS: DocumentRequest[] = [
  {
    id: 'req-1',
    clientId: 'cli-1',
    clientName: 'Grupo Belgrano S.A.',
    matterId: 'mat-3',
    matterTitle: 'Auditoría Fiscal Grupo Belgrano',
    requestedByName: 'CPN Lucía Méndez',
    title: 'Subir Comprobantes Bancarios de Retenciones Sufridas Período 2025',
    instructions: 'Adjuntar extractos bancarios en formato PDF donde figuren las percepciones bancarias de IIBB y Ganancias.',
    dueDate: '24/09/2026',
    status: 'REQUESTED',
    updatedAt: '20 Sep 2026'
  },
  {
    id: 'req-2',
    clientId: 'cli-2',
    clientName: 'Martín Rodríguez',
    matterId: 'mat-1',
    matterTitle: 'Rodríguez c/ Inmobiliaria Delta',
    requestedByName: 'Abog. Sofía Herrera',
    title: 'Copia Certificada de Boleto de Compraventa Original',
    instructions: 'Digitalizar con alta resolución las fojas 1 a 6 con sello notarial visible.',
    dueDate: '27/09/2026',
    status: 'RECEIVED',
    receivedFileName: 'Boleto_Compraventa_Certificado_Delta.pdf',
    updatedAt: '21 Sep 2026'
  },
  {
    id: 'req-3',
    clientId: 'cli-1',
    clientName: 'Grupo Belgrano S.A.',
    matterId: 'mat-2',
    matterTitle: 'Constitución Sociedad Grupo Belgrano',
    requestedByName: 'Dra. Martina Ferraro',
    title: 'DNI y Constancias de CUIT de Directores Titulares y Suplentes',
    instructions: 'Obligatorio para adjuntar al legajo societario ante IGJ.',
    dueDate: '22/09/2026',
    status: 'APPROVED',
    receivedFileName: 'DNI_Directorio_Belgrano.pdf',
    updatedAt: '18 Sep 2026'
  }
];

export const MOCK_INTERNAL_NOTES: InternalNote[] = [
  {
    id: 'not-1',
    matterId: 'mat-1',
    authorId: 'user-1',
    authorName: 'Dra. Martina Ferraro',
    content: 'CONFIDENCIAL: En la audiencia de conciliación el abogado contrario admitió off-the-record que el seguro cubre hasta USD 120.000. No aceptar propuesta inicial inferior a dicho tope.',
    createdAt: '14 Sep 2026 15:40',
    isConfidential: true
  },
  {
    id: 'not-2',
    matterId: 'mat-3',
    authorId: 'user-3',
    authorName: 'CPN Lucía Méndez',
    content: 'Estrategia fiscal: Ante el requerimiento de ARCA, conviene plantear la compensación con saldos de libre disponibilidad antes de abrir la etapa de determinación de oficio.',
    createdAt: '19 Sep 2026 10:15',
    isConfidential: true
  }
];

export const MOCK_TIME_ENTRIES: TimeEntry[] = [
  {
    id: 'tim-1',
    matterId: 'mat-1',
    matterTitle: 'Rodríguez c/ Inmobiliaria Delta',
    userId: 'user-4',
    userName: 'Abog. Sofía Herrera',
    date: '21/09/2026',
    durationHours: 3.5,
    description: 'Análisis de acta pericial y redacción de pliego de impugnaciones técnicas',
    isBillable: true,
    hourlyRate: 120,
    currency: 'USD',
    status: 'UNBILLED'
  },
  {
    id: 'tim-2',
    matterId: 'mat-2',
    matterTitle: 'Constitución Sociedad Grupo Belgrano',
    userId: 'user-1',
    userName: 'Dra. Martina Ferraro',
    date: '20/09/2026',
    durationHours: 2.0,
    description: 'Reunión de negociación de cláusula de salida y buy-sell agreement con asesores de la contraparte',
    isBillable: true,
    hourlyRate: 180,
    currency: 'USD',
    status: 'UNBILLED'
  },
  {
    id: 'tim-3',
    matterId: 'mat-3',
    matterTitle: 'Auditoría Fiscal Grupo Belgrano',
    userId: 'user-3',
    userName: 'CPN Lucía Méndez',
    date: '18/09/2026',
    durationHours: 4.0,
    description: 'Cálculo de contingencia fiscal y redacción de informe técnico de descargo',
    isBillable: true,
    hourlyRate: 150,
    currency: 'USD',
    status: 'BILLED'
  }
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    organizationId: 'org-1',
    clientId: 'cli-1',
    clientName: 'Grupo Belgrano S.A.',
    matterId: 'mat-2',
    matterTitle: 'Constitución Sociedad Grupo Belgrano',
    invoiceNumber: 'FAC-A-0001-00000412',
    issueDate: '01/09/2026',
    dueDate: '15/09/2026',
    subtotal: 3500000,
    taxAmount: 735000,
    totalAmount: 4235000,
    currency: 'ARS',
    status: 'PAID',
    paidAmount: 4235000,
    balance: 0,
    concept: 'Honorarios profesionales por redacción estatutaria y pacto de socios'
  },
  {
    id: 'inv-2',
    organizationId: 'org-1',
    clientId: 'cli-2',
    clientName: 'Martín Rodríguez',
    matterId: 'mat-1',
    matterTitle: 'Rodríguez c/ Inmobiliaria Delta',
    invoiceNumber: 'FAC-B-0001-00000845',
    issueDate: '10/09/2026',
    dueDate: '25/09/2026',
    subtotal: 1200000,
    taxAmount: 252000,
    totalAmount: 1452000,
    currency: 'ARS',
    status: 'SENT',
    paidAmount: 0,
    balance: 1452000,
    concept: 'Honorarios de patrocinio letrado etapa probatoria y audiencias testimoniales'
  },
  {
    id: 'inv-3',
    organizationId: 'org-1',
    clientId: 'cli-3',
    clientName: 'Inversiones del Plata S.R.L.',
    matterId: 'mat-4',
    matterTitle: 'Revisión Contractual Proveedor Brasil',
    invoiceNumber: 'FAC-A-0001-00000413',
    issueDate: '15/08/2026',
    dueDate: '30/08/2026',
    subtotal: 2800000,
    taxAmount: 588000,
    totalAmount: 3388000,
    currency: 'ARS',
    status: 'OVERDUE',
    paidAmount: 1000000,
    balance: 2388000,
    concept: 'Dictamen de comercio exterior y arbitraje CCI con Brasil'
  }
];

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: 'pay-1',
    invoiceId: 'inv-1',
    invoiceNumber: 'FAC-A-0001-00000412',
    clientId: 'cli-1',
    clientName: 'Grupo Belgrano S.A.',
    date: '10/09/2026',
    amount: 4235000,
    currency: 'ARS',
    paymentMethod: 'TRANSFER',
    referenceCode: 'TRF-BANCO-GALICIA-89211'
  },
  {
    id: 'pay-2',
    invoiceId: 'inv-3',
    invoiceNumber: 'FAC-A-0001-00000413',
    clientId: 'cli-3',
    clientName: 'Inversiones del Plata S.R.L.',
    date: '28/08/2026',
    amount: 1000000,
    currency: 'ARS',
    paymentMethod: 'TRANSFER',
    referenceCode: 'TRF-BBVA-44019'
  }
];

export const MOCK_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    matterId: 'mat-1',
    matterTitle: 'Rodríguez c/ Inmobiliaria Delta',
    concept: 'Tasa de Justicia 3% Fuero Comercial CABA',
    category: 'TASA_JUDICIAL',
    amount: 185000,
    currency: 'ARS',
    date: '14/03/2025',
    isReimbursable: true,
    status: 'BILLED'
  },
  {
    id: 'exp-2',
    matterId: 'mat-2',
    matterTitle: 'Constitución Sociedad Grupo Belgrano',
    concept: 'Certificaciones de firma y fojas notariales',
    category: 'CERTIFICACION_NOTARIAL',
    amount: 92000,
    currency: 'ARS',
    date: '10/09/2026',
    isReimbursable: true,
    status: 'PENDING'
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'led-1',
    fullName: 'Dr. Fernando Casares',
    companyName: 'Biotecnología del Sur S.A.',
    email: 'fcasares@biosur.com.ar',
    phone: '+54 11 4782-9900',
    serviceArea: 'Derecho Corporativo & Patentes',
    stage: 'EVALUATION',
    estimatedValue: 6500000,
    assignedToName: 'Dra. Martina Ferraro',
    notes: 'Requieren asesoramiento en ronda de inversión Serie A y protección de propiedad intelectual internacional.',
    nextAction: 'Enviar propuesta de honorarios y términos de engagement',
    createdAt: '20 Sep 2026'
  },
  {
    id: 'led-2',
    fullName: 'Dra. Patricia Varela',
    companyName: 'Clínica Médica Santa Rosa',
    email: 'pvarela@santarosa.med.ar',
    phone: '+54 11 5821-4433',
    serviceArea: 'Reestructuración Laboral & Contabilidad',
    stage: 'CONSULTATION_SCHEDULED',
    estimatedValue: 4200000,
    assignedToName: 'Dr. Ignacio Bianchi',
    notes: 'Reunión presencial coordinada para el próximo jueves a las 11:00 hs.',
    nextAction: 'Preparar análisis preliminar de convenio colectivo sanidad',
    createdAt: '19 Sep 2026'
  },
  {
    id: 'led-3',
    fullName: 'Mariano Benítez',
    email: 'mbenitez.it@gmail.com',
    phone: '+54 11 3902-1144',
    serviceArea: 'Planificación Fiscal Personas Humanas',
    stage: 'NEW_LEAD',
    estimatedValue: 950000,
    assignedToName: 'CPN Lucía Méndez',
    notes: 'Consulta por régimen de regularización de activos y tributación de rentas del exterior.',
    nextAction: 'Llamar para calificar situación fiscal y coordinar videollamada',
    createdAt: 'Hoy 09:15'
  }
];

export const MOCK_MESSAGES: MessageItem[] = [
  {
    id: 'msg-1',
    clientId: 'cli-2',
    matterId: 'mat-1',
    senderName: 'Abog. Sofía Herrera',
    senderRole: 'STAFF',
    content: 'Estimado Martín: Te confirmamos que la inspección pericial en el inmueble quedó fijada para este jueves a las 10:00 hs. Te sugerimos estar presente con las llaves de acceso.',
    timestamp: 'Hoy 10:14'
  },
  {
    id: 'msg-2',
    clientId: 'cli-2',
    matterId: 'mat-1',
    senderName: 'Martín Rodríguez',
    senderRole: 'CLIENT',
    content: 'Perfecto, Sofía. Ya coordiné con la administración del edificio para que dejen ingresar al perito ingeniero. Voy a tener a mano las copias de los reclamos previos.',
    timestamp: 'Hoy 10:28'
  },
  {
    id: 'msg-3',
    clientId: 'cli-1',
    matterId: 'mat-3',
    senderName: 'CPN Lucía Méndez',
    senderRole: 'STAFF',
    content: 'Ingeniero Belgrano: Hemos cargado el borrador del descargo para ARCA. En la pestaña Documentos pueden revisar la presentación antes de su ingreso definitivo.',
    timestamp: 'Ayer 17:50'
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-1',
    actorName: 'Dra. Martina Ferraro',
    actorRole: 'Socio Director',
    action: 'STATUS_CHANGE',
    entityType: 'Expediente',
    entityId: 'EXP-2026-089',
    changeSummary: 'Estado actualizado de "Análisis Preliminar" a "Etapa Judicial"',
    timestamp: '21 Sep 2026 14:32',
    ipAddress: '190.220.14.82'
  },
  {
    id: 'aud-2',
    actorName: 'Lic. Andrea Gómez',
    actorRole: 'Administrativo',
    action: 'CREATE',
    entityType: 'Factura',
    entityId: 'FAC-B-0001-00000845',
    changeSummary: 'Emisión de comprobante por $ 1.452.000 para Martín Rodríguez',
    timestamp: '20 Sep 2026 11:05',
    ipAddress: '190.220.14.83'
  },
  {
    id: 'aud-3',
    actorName: 'Martín Rodríguez',
    actorRole: 'Cliente (Portal)',
    action: 'DOCUMENT_DOWNLOAD',
    entityType: 'Documento',
    entityId: 'DOC-1',
    changeSummary: 'Descarga de Demanda_Ordinaria_Inmobiliaria_Delta_Sellada.pdf',
    timestamp: '19 Sep 2026 18:22',
    ipAddress: '181.44.201.12'
  },
  {
    id: 'aud-4',
    actorName: 'Dra. Martina Ferraro',
    actorRole: 'Socio Director',
    action: 'PERMISSION_GRANT',
    entityType: 'Rol',
    entityId: 'ABOGADO_CONTADOR_SENIOR',
    changeSummary: 'Habilitación de acceso a módulo CRM para Sofía Herrera',
    timestamp: '15 Sep 2026 09:12',
    ipAddress: '190.220.14.82'
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Nuevo Régimen de Regularización de Activos y Contingencias Tributarias 2026',
    slug: 'nuevo-regimen-regularizacion-activos-2026',
    category: 'Derecho Tributario & Fiscal',
    summary: 'Análisis pormenorizado de las alícuotas especiales, exclusiones subjetivas y pautas de seguridad jurídica frente a fiscalizaciones futuras de ARCA.',
    content: `El reciente paquete de reformas fiscales introduce transformaciones estructurales en la exteriorización de tenencias de moneda nacional y extranjera...`,
    authorName: 'CPN Lucía Méndez',
    authorRole: 'Socia de Planificación Fiscal',
    publishedAt: '18 Sep 2026',
    readTime: '6 min lectura',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'art-2',
    title: 'Cláusulas de Arbitraje Internacional en Contratos de Suministro Transfronterizo',
    slug: 'clausulas-arbitraje-internacional-suministro',
    category: 'Derecho Corporativo & M&A',
    summary: 'Cómo estructurar convenios arbitrales en el marco de la Cámara de Comercio Internacional (CCI) para mitigar riesgos de ejecución en América Latina.',
    content: `La creciente volatilidad cambiaria y regulatoria en el comercio regional ha devuelto centralidad a los pactos de sumisión a arbitraje institucional...`,
    authorName: 'Dra. Martina Ferraro',
    authorRole: 'Socia Fundadora',
    publishedAt: '12 Sep 2026',
    readTime: '8 min lectura',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'art-3',
    title: 'Impacto de la Jurisprudencia de la CSJN en Solidaridad Laboral de Grupos Económicos',
    slug: 'solidaridad-laboral-grupos-economicos-csjn',
    category: 'Derecho Laboral Empresarial',
    summary: 'Límites doctrinarios a la extensión de responsabilidad hacia directores y accionistas en juicios por despido e indemnizaciones agravadas.',
    content: `La interpretación del artículo 30 y 31 de la Ley de Contrato de Trabajo continúa siendo uno de los ejes más litigiosos para las empresas con múltiples sociedades vinculadas...`,
    authorName: 'Dr. Ignacio Bianchi',
    authorRole: 'Socio Laboral',
    publishedAt: '05 Sep 2026',
    readTime: '5 min lectura',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800'
  }
];
