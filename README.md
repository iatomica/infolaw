# InfoLaw — Plataforma Integral Jurídico-Contable (SaaS)

> **Sistema Operativo para Estudios Profesionales & Portal Privado de Clientes**  
> Diseñado bajo los estándares de **Taste Skill** (`design-taste-frontend`) con estética inspirada en Linear, Stripe, Notion y firmas legales/consultoras internacionales de primer nivel.

---

## 🏛️ Descripción General

**InfoLaw** es una plataforma web completa de grado empresarial diseñada tanto para **estudios jurídicos**, **estudios contables**, como para **firmas multidisciplinarias**.

Integra tres experiencias cohesivas:
1. **Sitio Web Institucional Público**: Presencia digital de alta autoridad y diseño editorial, con catálogo de áreas de práctica, credenciales de socios y directores, publicaciones doctrinales (*Insights*) y formulario de admisión de causas.
2. **Sistema Operativo Interno (ERP/CRM del Estudio)**: Software de gestión de alta densidad visual (7/10) con dashboards según rol, gestión integral de clientes y empresas, workspace de expedientes en 9 pestañas, tareas en lista y tablero Kanban, agenda unificada de audiencias y vencimientos fiscales, gestor documental con solicitudes, pipeline CRM, finanzas con time-tracking, y panel de administración con matriz RBAC granular y auditoría inmutable.
3. **Portal Privado de Clientes**: Entorno seguro y aislado para seguimiento de causas judiciales y societarias, descarga de copias selladas, subida interactiva de documentación requerida por los letrados, estado de facturación y mensajería encriptada.

---

## 🎨 Dirección de Diseño (Taste Skill)

- **Configuración de Diales**:
  - `DESIGN_VARIANCE: 6 / 10` (Equilibrio sobrio y asimetría editorial controlada).
  - `MOTION_INTENSITY: 4 / 10` (Microinteracciones funcionales de 150-200ms, drawers y modales fluidos).
  - `VISUAL_DENSITY`:
    - **Web Pública**: `4 / 10` (Espacio generoso, ritmo editorial, tipografía con jerarquía limpia).
    - **Sistema Interno**: `7 / 10` (Densidad profesional, tablas compactas, monospaced para números de expediente judicial y CUITs).
- **Prohibiciones Anti-Default**:
  - Cero gradientes violetas genéricos de IA.
  - Cero tarjetas idénticas repetidas en 3 columnas sin propósito.
  - Cero exceso de bordes redondeados o sombras pesadas.
  - Cero íconos gigantes desproporcionados.

---

## 📂 Mapa de Módulos & Rutas

| Ruta | Módulo | Descripción |
| :--- | :--- | :--- |
| `/` | **Home Pública** | Hero editorial, áreas, metodología, profesionales, doctrina, testimonios discretos y contacto. |
| `/areas` | **Áreas de Práctica** | Catálogo corporativo, litigios, laboral, planificación fiscal, auditoría y comercio exterior. |
| `/equipo` | **El Estudio** | Credenciales, matrículas profesionales (CPACF/CPCECABA) y trayectorias de los socios. |
| `/insights` | **Insights & Doctrina** | Publicaciones especializadas sobre reformas tributarias, fallos de la CSJN y arbitraje. |
| `/contacto` | **Admisión** | Formulario de consulta confidencial conectado reactivamente al pipeline CRM del estudio. |
| `/app/dashboard` | **Dashboard Interno** | Panel operativo adaptativo por rol (Socio, Abogado Senior, Junior, Administrativo, Recepción). |
| `/app/clientes` | **Directorio de Clientes** | Directorio de personas físicas y jurídicas, CUIT/DNI, filtros, facturación y ficha 360°. |
| `/app/clientes/[id]` | **Ficha de Cliente** | Resumen societario, causas vinculadas, documentos, finanzas y canal de mensajería. |
| `/app/expedientes` | **Catálogo de Causas** | Listado general con radicación judicial, número de expediente y alertas de vencimiento. |
| `/app/expedientes/[id]` | **Workspace 360°** | Entorno de trabajo con **9 pestañas**: Resumen, Timeline, Tareas, Docs, Personas, Agenda, Horas, Honorarios y Notas confidenciales. |
| `/app/tareas` | **Tareas & PM** | Gestión de diligencias con vistas en Lista y Tablero Kanban por estados y checklists. |
| `/app/calendario` | **Agenda & Vencimientos** | Audiencias judiciales, plazos perentorios y vencimientos tributarios de ARCA (AFIP). |
| `/app/documentos` | **Gestor Documental** | Repositorio clasificado y módulo de solicitudes de documentación a clientes. |
| `/app/crm` | **Pipeline de Admisión** | Pipeline visual de oportunidades desde nuevo lead hasta conversión en cliente activo. |
| `/app/finanzas` | **Finanzas & Cobranzas** | Facturación, cobros imputados, gastos reintegrables de expedientes y time-tracking. |
| `/app/administracion`| **Seguridad & RBAC** | Configuración de organización, usuarios, matriz granular de permisos y auditoría inmutable. |
| `/portal` | **Portal Cliente: Home** | Resumen personalizado para clientes ("Buenos días, Martín") con causas, próximos eventos y pedidos. |
| `/portal/expedientes` | **Portal: Mis Causas** | Visualización de avances procesales y próximos pasos sin acceso a notas ni horas internas. |
| `/portal/documentos` | **Portal: Documentación**| Descarga de archivos compartidos y carga de documentación solicitada por los abogados. |
| `/portal/finanzas` | **Portal: Honorarios** | Facturas emitidas, estados de pago y descarga de comprobantes electrónicos. |
| `/portal/mensajes` | **Portal: Mensajería** | Canal directo y seguro con el equipo legal asignado. |

---

## ⚡ Barra de Conmutación de Roles (Demo Switcher)

Ubicada en la parte superior fija de la pantalla, permite al evaluador o cliente potencial alternar en 1 clic entre:
- **Socio Director** (*Dra. Martina Ferraro*)
- **Abogada Senior** (*Abog. Sofía Herrera*)
- **Contador Junior** (*CPN Tomás Peralta*)
- **Administración** (*Lic. Andrea Gómez*)
- **Recepción & Intake** (*Camila Rossi*)
- **Portal Cliente** (*Martín Rodríguez - Grupo Belgrano*)
- **Super Admin**

---

## 🚀 Puesta en Marcha Local

```bash
# Instalar dependencias
npm install

# Compilar para producción
npm run build

# Iniciar servidor local
npm run dev
```

La aplicación se servirá en `http://localhost:3000`.
Buscador global accesible en cualquier pantalla interna mediante el atajo de teclado: `⌘K` o `Ctrl+K`.
