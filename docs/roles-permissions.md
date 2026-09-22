# Roles & Permissions: InfoLaw RBAC System

This document specifies the Role-Based Access Control (RBAC) engine for InfoLaw.

---

## 1. Role Definitions

1. **`SUPER_ADMIN`**: Global technical and organizational control. Manages firm config, users, roles, permissions, integrations, billing accounts, and audit logs.
2. **`SOCIO_DIRECTOR` (Partner / Managing Director)**: Executive visibility over all matters, clients, attorneys/CPAs, billing profitability, realization rates, fee agreements, and firm-wide audit logs.
3. **`ABOGADO_CONTADOR_SENIOR` (Senior Associate / Senior CPA)**: Leads assigned matters and client relationships. Creates and delegates tasks, uploads documents, registers court filings, manages deadlines, communicates with clients, and logs billable hours.
4. **`ABOGADO_CONTADOR_JUNIOR` (Junior Associate / Staff CPA)**: Executes delegated tasks, drafts filings, attaches documents, and logs hours. Restricted from viewing sensitive client billing rates, profitability, or confidential partner-level notes.
5. **`ADMINISTRATIVO` (Office Manager / Billing Admin)**: Manages invoices, fee agreements, receipts, bank reconciliations, client contact details, meeting agendas, and general administrative documents. No access to legal strategy notes.
6. **`RECEPCION` (Intake & Front Desk)**: Captures incoming inquiries, registers leads, schedules initial consultations, and uploads onboarding IDs. No access to active matter timelines or financial records.
7. **`CLIENTE` (Private Portal User)**: Portal access restricted strictly to their own matters. Can review published milestones, download shared documents, upload requested files, check invoices/payments, and message their assigned legal/accounting team.

---

## 2. Granular Permissions Matrix

| Permission Code | Description | Super Admin | Socio | Senior | Junior | Admin | Recep. | Cliente |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `org.manage` | Configure firm settings & branding | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `users.manage` | Invite, modify & deactivate users | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `roles.manage` | Modify roles & permission matrix | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `audit.read` | View security & activity audit logs | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `clients.read_all` | View all clients across the firm | ✅ | ✅ | Assigned | Assigned | ✅ | Basic | Own |
| `clients.write` | Create & update client records | ✅ | ✅ | ✅ | ❌ | ✅ | Leads | ❌ |
| `cases.read_all` | View all firm matters & court dockets | ✅ | ✅ | Assigned | Assigned | Read-only | ❌ | Own |
| `cases.write` | Create & update matter workspace | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `cases.delete` | Archive or close matters | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `internal_notes.read`| View confidential attorney/CPA memos | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `internal_notes.write`| Create private internal strategy notes | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `tasks.manage` | Create, reassign & close tasks | ✅ | ✅ | ✅ | Self | ✅ | ❌ | ❌ |
| `calendar.manage` | Schedule hearings & tax deadlines | ✅ | ✅ | ✅ | Self | ✅ | Appts | ❌ |
| `documents.read` | View internal document repository | ✅ | ✅ | ✅ | Assigned | ✅ | Intake | Shared |
| `documents.write` | Upload & version firm documents | ✅ | ✅ | ✅ | ✅ | ✅ | Intake | Upload Req |
| `documents.request`| Issue document requests to clients | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `crm.pipeline` | Manage incoming leads & proposals | ✅ | ✅ | ✅ | ❌ | ✅ | Create | ❌ |
| `billing.view` | View invoices, payments & rates | ✅ | ✅ | Rates only| ❌ | ✅ | ❌ | Own Invoices |
| `billing.manage` | Issue invoices, record payments | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| `timetrack.all` | View hours logged by all staff | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `timetrack.self` | Log own working hours on matters | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |

---

## 3. Enforcement in Architecture

1. **Client Portal Firewall**: Checked at the root of `src/app/(portal)/` — any attempt to load internal routes or internal notes triggers authorization rejection.
2. **Server-Side Verification**: Utility function `hasPermission(userRole, permissionCode)` evaluates server actions and data queries.
3. **UI Adaptation**: Navigation, actions, and tabs dynamically adjust based on the current active role.
