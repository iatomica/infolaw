# Data Model: InfoLaw Platform

This document specifies the unified relational schema supporting both legal and accounting operations.

---

## 1. Core Organizational & Identity Entities

### `Organization`
The tenant entity representing the law or accounting firm.
- `id`: string (UUID / cuid)
- `name`: string ("Estudio Ferraro & Asociados")
- `legalName`: string ("Ferraro, Bianchi & Méndez S.C.")
- `taxId`: string ("30-71458920-4")
- `type`: enum (`LEGAL`, `ACCOUNTING`, `MULTIDISCIPLINARY`)
- `address`: string
- `phone`: string
- `email`: string
- `website`: string
- `createdAt`, `updatedAt`: DateTime

### `User`
Attorneys, CPAs, administrative staff, and partners.
- `id`: string
- `organizationId`: string -> `Organization.id`
- `name`: string ("Dra. Martina Ferraro")
- `email`: string
- `roleId`: string -> `Role.id`
- `title`: string ("Socia Fundadora · Derecho Corporativo & Arbitraje")
- `licenseNumber`: string ("T° 84 F° 122 CPACF")
- `avatarUrl`: string
- `phone`: string
- `isActive`: boolean
- `createdAt`: DateTime

### `Role` & `Permission`
RBAC foundation.
- `Role`: `id`, `organizationId`, `name`, `code` (`SUPER_ADMIN`, `SOCIO_DIRECTOR`, `SENIOR`, `JUNIOR`, `ADMINISTRATIVO`, `RECEPCION`, `CLIENTE`), `description`
- `Permission`: `id`, `code` (`cases.read`, `cases.write`, `billing.view`, etc.), `category`, `description`
- `RolePermission`: `roleId`, `permissionId`

---

## 2. CRM & Client Entities

### `Client`
Individual or Corporate client entity.
- `id`: string
- `organizationId`: string
- `type`: enum (`INDIVIDUAL`, `COMPANY`)
- `displayName`: string ("Grupo Belgrano S.A." / "Martín Rodríguez")
- `taxId`: string (CUIT/CUIL/DNI)
- `email`: string
- `phone`: string
- `address`: string
- `city`: string
- `state`: string
- `status`: enum (`ACTIVE`, `PROSPECT`, `INACTIVE`, `BLOCKED`)
- `primaryResponsibleId`: string -> `User.id`
- `portalAccessEnabled`: boolean
- `portalUserId`: string? -> `User.id`
- `createdAt`, `updatedAt`: DateTime

### `Company` (Extension for Corporate Clients)
- `id`: string
- `clientId`: string -> `Client.id`
- `legalName`: string ("Grupo Belgrano S.A.")
- `commercialName`: string ("Belgrano Logística")
- `industry`: string ("Transporte y Comercio Exterior")
- `incorporationDate`: string
- `registrationNumber`: string ("IGJ N° 1892043")
- `directors`: string (JSON array)
- `shareholders`: string (JSON array)

### `Contact`
Key individuals linked to a client/company.
- `id`: string
- `clientId`: string -> `Client.id`
- `fullName`: string ("Ing. Esteban Belgrano")
- `position`: string ("Director Ejecutivo")
- `email`: string
- `phone`: string
- `isPrimary`: boolean

### `Lead`
Inbound prospects via public website intake or referrals.
- `id`: string
- `organizationId`: string
- `fullName`: string
- `companyName`: string?
- `email`: string
- `phone`: string
- `serviceArea`: string ("Derecho Corporativo" / "Planeamiento Fiscal")
- `stage`: enum (`NEW_LEAD`, `CONTACTED`, `CONSULTATION_SCHEDULED`, `EVALUATION`, `PROPOSAL_SENT`, `WON_CLIENT`, `LOST`)
- `estimatedValue`: number?
- `assignedToId`: string? -> `User.id`
- `notes`: string
- `nextAction`: string
- `nextActionDate`: string?

---

## 3. Matters / Expedientes (Cases)

### `Matter` (Case / Expediente / Obligación)
The central operational unit.
- `id`: string
- `organizationId`: string
- `internalCode`: string ("EXP-2026-089")
- `title`: string ("Rodríguez c/ Inmobiliaria Delta s/ Daños y Perjuicios")
- `clientId`: string -> `Client.id`
- `opposingParty`: string ("Inmobiliaria Delta S.A.")
- `opposingCounsel`: string ("Dr. Horacio Valenzuela")
- `practiceArea`: string ("Litigios Complejos" / "Societario" / "Auditoría Fiscal")
- `type`: enum (`JUDICIAL`, `EXTRAJUDICIAL`, `CONSULTANCY`, `TAX_AUDIT`, `RECURRENT_ACCOUNTING`)
- `responsibleUserId`: string -> `User.id`
- `teamMemberIds`: string[] (Attorneys / CPAs involved)
- `courtOrganism`: string ("Juzgado Nacional Comercial N° 14, Secretaría 28")
- `courtDocketNumber`: string ("COM 18492/2025")
- `jurisdiction`: string ("CABA, República Argentina")
- `startDate`: string
- `status`: enum (`INTAKE`, `ACTIVE`, `WAITING_CLIENT`, `WAITING_THIRD_PARTY`, `COURT_STAGE`, `NEGOTIATION`, `CLOSED`, `ARCHIVED`)
- `priority`: enum (`LOW`, `MEDIUM`, `HIGH`, `URGENT`)
- `nextAction`: string ("Presentar memoria de prueba pericial contable")
- `nextActionDeadline`: string
- `isPublicToClient`: boolean (Exposed in Client Portal)
- `createdAt`, `updatedAt`: DateTime

### `MatterEvent` (Timeline / Historial de Actuaciones)
Chronological log of activities, filings, hearings, and status changes.
- `id`: string
- `matterId`: string -> `Matter.id`
- `authorId`: string -> `User.id`
- `date`: string
- `title`: string ("Presentación de escrito de contestación de traslado")
- `description`: string
- `type`: enum (`FILING`, `HEARING`, `DOCUMENT_UPLOAD`, `CLIENT_NOTE`, `STATUS_CHANGE`, `OFFICIAL_NOTICE`, `TAX_SUBMISSION`)
- `isClientVisible`: boolean (whether shown in client portal)
- `documentId`: string? -> `Document.id`

---

## 4. Operational Entities (Tasks, Calendar, Documents)

### `Task`
- `id`: string
- `organizationId`: string
- `matterId`: string? -> `Matter.id`
- `clientId`: string? -> `Client.id`
- `title`: string ("Revisión de cláusula de arbitraje ICC")
- `description`: string
- `assignedToId`: string -> `User.id`
- `delegatedById`: string -> `User.id`
- `priority`: enum (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`)
- `status`: enum (`PENDING`, `IN_PROGRESS`, `BLOCKED`, `IN_REVIEW`, `COMPLETED`)
- `dueDate`: string
- `checklist`: JSON array of `{ id: string, text: string, completed: boolean }`
- `createdAt`, `updatedAt`: DateTime

### `CalendarEvent`
Unified court hearings, tax deadlines, and client meetings.
- `id`: string
- `organizationId`: string
- `matterId`: string? -> `Matter.id`
- `title`: string ("Audiencia Testimonial Art. 360 CPCCN")
- `type`: enum (`HEARING`, `CLIENT_MEETING`, `COURT_DEADLINE`, `TAX_DEADLINE`, `INTERNAL_REVIEW`)
- `startDate`: string (ISO)
- `endDate`: string (ISO)
- `location`: string ("Sala de Audiencias N° 4 / Zoom")
- `attendeeUserIds`: string[]
- `isPublicToClient`: boolean

### `Document` & `DocumentVersion`
Enterprise document asset.
- `id`: string
- `organizationId`: string
- `matterId`: string? -> `Matter.id`
- `clientId`: string? -> `Client.id`
- `fileName`: string ("Demanda_Principal_Firmada.pdf")
- `fileSize`: string ("2.4 MB")
- `fileType`: string ("application/pdf")
- `category`: enum (`CONTRATO`, `DEMANDA`, `ESCRITO`, `PODER`, `DOCUMENTO_IDENTIDAD`, `CONSTANCIA`, `INFORME_CONTABLE`, `DECLARACION_JURADA`, `OTRO`)
- `uploadedById`: string -> `User.id`
- `version`: number
- `isClientVisible`: boolean
- `createdAt`: DateTime

### `DocumentRequest` (Solicitud de Documentación al Cliente)
Interactive request where clients upload requested files in their portal.
- `id`: string
- `clientId`: string -> `Client.id`
- `matterId`: string? -> `Matter.id`
- `requestedById`: string -> `User.id`
- `title`: string ("Subir Balance Ejercicio 2025 y Memoria")
- `instructions`: string ("Por favor adjuntar archivo PDF certificado por Consejo Profesional.")
- `dueDate`: string
- `status`: enum (`REQUESTED`, `RECEIVED`, `APPROVED`, `REJECTED`)
- `uploadedDocumentId`: string? -> `Document.id`
- `createdAt`: DateTime

### `Note` (Notas Internas Privadas)
Private attorney/CPA memos, strictly isolated from clients.
- `id`: string
- `matterId`: string? -> `Matter.id`
- `authorId`: string -> `User.id`
- `content`: string ("Estrategia confidencial: no revelar el tope de negociación hasta la audiencia del 15/10.")
- `isConfidential`: boolean (true)
- `createdAt`: DateTime

### `Message` & `Conversation`
Direct communication between client and assigned team.
- `id`: string
- `clientId`: string
- `matterId`: string?
- `senderId`: string (User or Client)
- `senderRole`: enum (`STAFF`, `CLIENT`)
- `content`: string
- `attachments`: JSON array
- `createdAt`: DateTime

---

## 5. Billing, Time Tracking & Financials

### `TimeEntry`
- `id`: string
- `matterId`: string -> `Matter.id`
- `userId`: string -> `User.id`
- `date`: string
- `durationHours`: number (e.g. 1.75)
- `description`: string ("Redacción de escrito recursivo ante Cámara")
- `isBillable`: boolean
- `hourlyRate`: number (USD / ARS)
- `status`: enum (`UNBILLED`, `BILLED`, `WRITTEN_OFF`)

### `Invoice` & `InvoiceItem`
- `id`: string
- `organizationId`: string
- `clientId`: string -> `Client.id`
- `matterId`: string? -> `Matter.id`
- `invoiceNumber`: string ("FAC-A-0001-00000412")
- `issueDate`: string
- `dueDate`: string
- `subtotal`: number
- `taxAmount`: number
- `totalAmount`: number
- `currency`: enum (`ARS`, `USD`)
- `status`: enum (`DRAFT`, `ISSUED`, `SENT`, `PAID`, `OVERDUE`, `CANCELLED`)
- `paidAmount`: number
- `balance`: number

### `Payment`
- `id`: string
- `invoiceId`: string -> `Invoice.id`
- `clientId`: string -> `Client.id`
- `date`: string
- `amount`: number
- `paymentMethod`: enum (`TRANSFER`, `CHECK`, `CREDIT_CARD`, `CRYPTO`, `CASH`)
- `referenceCode`: string ("TRF-BANCO-GALICIA-89211")

### `Expense` (Gastos Vinculados al Expediente)
- `id`: string
- `matterId`: string -> `Matter.id`
- `concept`: string ("Tasa de Justicia 3% CABA")
- `category`: enum (`TASA_JUDICIAL`, `CERTIFICACION_NOTARIAL`, `PERITAJE`, `TRASLADO`, `DILIGENCIA`, `OTRO`)
- `amount`: number
- `isReimbursable`: boolean (Reintegrable por el cliente)
- `status`: enum (`PENDING`, `BILLED`, `REIMBURSED`)

---

## 6. Audit & Public CMS Entities

### `AuditLog`
Complete audit trail for SOC 2 / compliance.
- `id`: string
- `organizationId`: string
- `actorId`: string -> `User.id`
- `actorName`: string
- `action`: enum (`CREATE`, `UPDATE`, `DELETE`, `STATUS_CHANGE`, `DOWNLOAD`, `PERMISSION_GRANT`)
- `entityType`: string ("Matter" / "Client" / "Invoice" / "Document")
- `entityId`: string
- `changeSummary`: string ("Estado modificado de 'Activo' a 'Judicial'")
- `ipAddress`: string
- `timestamp`: DateTime

### `Article` (Insights / Blog Jurídico & Contable)
- `id`: string
- `title`: string
- `slug`: string
- `category`: string ("Derecho Tributario", "Litigios", "Compliance")
- `summary`: string
- `content`: string (Markdown / HTML)
- `authorId`: string -> `User.id`
- `publishedAt`: string
- `readTimeMinutes`: number
