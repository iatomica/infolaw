# Architecture: InfoLaw Platform

## 1. System Overview
**InfoLaw** is an enterprise multi-tenant Operating System and client collaboration platform for legal, accounting, and multidisciplinary professional firms.

It integrates three cohesive experiences:
1. **Public Institutional Portal**: High-authority, editorial digital presence showcasing practice areas, attorneys/CPAs, thought leadership (*Insights*), and lead intake.
2. **Internal Firm Management OS (ERP/CRM)**: Professional high-density workspace for Partners, Senior & Junior Professionals, and Administrative staff.
3. **Private Client Portal**: Client-facing portal for case monitoring, milestone tracking, secure document uploads/downloads, fee tracking, and messaging.

```
+-----------------------------------------------------------------------------------+
|                               INFOLAW ARCHITECTURE                                |
+-----------------------------------------------------------------------------------+
|  PUBLIC INSTITUTIONAL WEB   |        PRIVATE CLIENT PORTAL        |   INTERNAL OS |
|  - Editorial Home           |  - Active Matters & Milestones      |   - Dashboard |
|  - Legal & Tax Practices    |  - Pending Document Requests (Upload)|  - Clients    |
|  - Partner & Senior Profiles|  - Invoices & Statements            |   - Matters   |
|  - Insights / Doctrine      |  - Direct Advisor Messaging         |   - Tasks     |
|  - Lead & Intake Form       |  - Strict Isolation from Notes/Hours|   - Calendar  |
|                             |                                     |   - Billing   |
+-----------------------------+-------------------------------------+---------------+
|                                CORE LOGIC & RBAC ENGINE                           |
|  - Multi-tenant Organization Scope (organizationId)                               |
|  - 7 Roles (Super Admin, Socio, Senior, Junior, Admin, Secretaría, Cliente)       |
|  - 30+ Granular Permissions (cases.read, billing.write, internal_notes.read, etc.)|
+-----------------------------------------------------------------------------------+
|                              DATA & STORAGE ADAPTER                               |
|  - Relational Schema (Organizations, Clients, Matters, Tasks, Invoices, Docs)     |
|  - Auditing & Timeline Event Dispatcher                                           |
|  - Next.js App Router API & Server Actions                                        |
+-----------------------------------------------------------------------------------+
```

---

## 2. Directory & Route Hierarchy

```
src/
├── app/
│   ├── (public)/                 # Public institutional routes
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Editorial Homepage
│   │   ├── areas/                # Practice Areas (Legal & Tax)
│   │   │   └── page.tsx
│   │   ├── equipo/               # Professional Team & Leadership
│   │   │   └── page.tsx
│   │   ├── insights/             # Publications, Jurisprudence & Tax Analysis
│   │   │   └── page.tsx
│   │   └── contacto/             # Consultation Request & Intake
│   │       └── page.tsx
│   ├── (portal)/                 # Dedicated Client Portal
│   │   ├── portal/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx          # "Buenos días, Martín" Client Overview
│   │   │   ├── expedientes/      # Client-published matter progress
│   │   │   ├── documentos/       # Document exchange & pending requests
│   │   │   ├── finanzas/         # Fee agreements & invoices
│   │   │   └── mensajes/         # Direct communication thread
│   ├── (app)/                    # Internal Firm Workspace (ERP/CRM)
│   │   ├── app/
│   │   │   ├── layout.tsx        # Collapsible Sidebar, Header, ⌘K, Role Switcher
│   │   │   ├── dashboard/        # Role-adaptive analytics & priority workload
│   │   │   ├── clientes/         # Directory of Individuals & Corporations
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx # 360° Client Profile (Cases, Docs, Billing)
│   │   │   ├── expedientes/      # Core Matter / Case Workspace
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx # 9-Tab Matter Workspace (Timeline, Tasks, etc.)
│   │   │   ├── tareas/           # Task Management (List, Kanban Board)
│   │   │   ├── calendario/       # Court Hearings, Tax Deadlines & Meetings
│   │   │   ├── documentos/       # Document Repository & Client Requests
│   │   │   ├── crm/              # Lead Pipeline & Intake Opportunities
│   │   │   ├── finanzas/         # Invoices, Payments, Expenses & Time Entries
│   │   │   ├── administracion/   # Organization, Users, RBAC & Audit Log
│   │   │   └── layout.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                       # Accessible Primitives (Buttons, Badges, Inputs, Dialogs)
│   ├── public/                   # Public Web Components (Hero, Practices, Team, Articles)
│   ├── workspace/                # Internal App Components (CommandPalette, QuickDrawer, TaskBoard)
│   └── portal/                   # Client Portal Components
├── lib/
│   ├── rbac.ts                   # Role-Based Access Control logic
│   ├── store.ts                  # Reactive State & Persistence Adapter
│   └── utils.ts
└── data/
    └── mockData.ts               # Realistic Spanish Seed (Estudio Ferraro & Asociados)
```

---

## 3. Multi-Tenancy & Data Isolation

1. **Organization Isolation**: Every database entity includes `organizationId: string`.
2. **Context Provider**: `CurrentOrganizationContext` ensures zero cross-firm data bleeding.
3. **Client Portal Firewall**:
   - Client sessions only read records where `clientId === session.clientId` AND `visibility === 'CLIENT_PUBLIC'`.
   - Internal notes (`isInternal: true`), non-billable raw time entries, and private strategy memos are excluded at the data-access layer.

---

## 4. State Management & Storage Adapter Pattern
- Data services expose an interface `IInfoLawRepository` allowing seamless transition from in-memory/localStorage seed store to PostgreSQL with Prisma ORM.
- Optimistic updates with reactive notifications and timeline dispatching.
