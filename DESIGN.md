# Design System & Aesthetic Guidelines: InfoLaw

> Generated per **Taste Skill** guidelines (`design-taste-frontend`).
> Reading this as: **B2B SaaS / Professional Firm Operating System & Private Client Portal for prestigious legal and accounting practices**, with a **Linear + Stripe + Notion + International Legal Boutique** visual language.

---

## 1. Core Taste Skill Dials

* **`DESIGN_VARIANCE: 6 / 10`**: Restrained symmetry in dashboards, controlled editorial asymmetry in the public institutional web.
* **`MOTION_INTENSITY: 4 / 10`**: High-performance, functional microinteractions (150ms-220ms transitions, drawer slides, command palette scales). Zero gratuitous looping animations.
* **`VISUAL_DENSITY`**:
  * **Public Institutional Web: `4 / 10`** (Generous whitespace, editorial rhythm, 1200px max-width container, clear typographic hierarchy).
  * **Internal OS & Workspaces: `7 / 10`** (High data density, rapid scanning, compact tables, workspace tabs, drawer side panels, monospace docket numbers).

---

## 2. Anti-Default Discipline (What is Banned)

❌ **NO AI Purple/Violet Gradients**: Replaced with deep obsidian, warm parchment, and crisp slate neutral tones.
❌ **NO Generic 3-Card Columns**: Replaced with purposeful bento grids, editorial typography, and asymmetric list views.
❌ **NO Bubble/Oversaturated Corners**: Border radius strictly bounded (`rounded-lg` / `rounded-md` max 8px for cards, `rounded-sm` for tags/badges).
❌ **NO Giant Floating Icons**: Icons standardized to `16px-20px` with uniform `1.75px` stroke width.
❌ **NO Heavy Glassmorphism or Crypto Aesthetics**: Pure solid backgrounds with crisp hairline borders (`border-slate-200` in light, `border-slate-800` in dark).

---

## 3. Color Palette Tokens

### Neutrals (Foundation)
- **Obsidian / Midnight (Dark UI & Public Header)**: `#090D16`, `#0F172A`, `#1E293B`
- **Surface Crisp Light**: `#FFFFFF`, `#F8FAFC`, `#F1F5F9`
- **Hairline Borders**: `#E2E8F0` (light mode), `#334155` / `#1E293B` (dark mode)
- **Text Hierarchy**:
  - Primary Text: `#0F172A` (light) / `#F8FAFC` (dark)
  - Secondary Text: `#475569` (light) / `#94A3B8` (dark)
  - Tertiary / Muted: `#64748B` (light) / `#64748B` (dark)

### Accent & Semantic Tokens
- **Institutional Bronze / Amber**: `#B45309` (Accent 600), `#D97706` (Accent 500), `#FEF3C7` (Badge BG)
- **Legal Navy / Authority**: `#1E3A8A`, `#1E40AF`
- **Success / Court Clearance**: `#059669` (Emerald 600)
- **Urgent / Court Deadline**: `#DC2626` (Red 600)
- **Warning / Fiscal Pending**: `#D97706` (Amber 600)

---

## 4. Typography

- **Interface Body & Controls**: `Plus Jakarta Sans` / `Inter`, system fallback sans-serif (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`).
- **Institutional Headings (Public)**: Editorial Serif styling (`Playfair Display` or refined serif stack) for hero statement and practice titles.
- **Data & Dockets**: `JetBrains Mono` / Monospace for:
  - Court dockets (`COM 18492/2025`)
  - Internal IDs (`EXP-2026-089`)
  - Tax CUIT (`30-71458920-4`)
  - Financial balances and currencies (`$ 1.850.000 ARS`)

---

## 5. Component Patterns & UX Mechanics

### A. Quick-View Drawer (`QuickViewDrawer`)
- Clicking any client, matter, or invoice opens a right-side drawer (480px wide) allowing instant review without full-page navigation.
- Contains quick actions: "Crear Tarea", "Subir Documento", "Abrir Workspace Completo".

### B. Command Palette (`⌘K` / `Ctrl+K`)
- Accessible anywhere in the internal system.
- Searches across Clients, Matters, Invoices, Documents, and Tasks.
- Instant jump navigation.

### C. Live Demo Switcher (`RoleSwitcherBar`)
- Subtle top control allowing evaluators to switch between:
  - `Socio Director`
  - `Abogado Senior`
  - `Abogado Junior`
  - `Administrativo`
  - `Cliente (Martín Rodríguez - Grupo Belgrano)`
- Dynamically recalculates RBAC permissions and updates the UI in real time.

### D. Workspace Matter Detail (9 Pestañas)
1. **Resumen**: Carátula, partes, juzgado, radicación, estado, responsable y equipo.
2. **Timeline**: Historial cronológico con hitos judiciales y fiscales.
3. **Tareas**: Lista de pendientes vinculados al expediente.
4. **Documentos**: Archivos versionados y solicitudes.
5. **Personas**: Clientes, letrados contrarios, peritos, jueces.
6. **Calendario**: Audiencias y vencimientos asociados.
7. **Horas**: Registro de tiempo facturable/no facturable.
8. **Honorarios & Gastos**: Presupuestos, tasas de justicia y facturación.
9. **Notas Internas**: Memos confidenciales protegidos por RBAC.
