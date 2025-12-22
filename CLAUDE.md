# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**piloman-ndt** is a web-based dashboard application for managing Non-Destructive Testing (NDT) inspections of welds. The application helps track weld parameters, inspection standards, and quality control documentation for various NDT methods (VT, UT, RT, PT, MT).

## Technology Stack

- **Angular 21.0.3** with standalone components
- **PrimeNG 21.0.1** for UI components
- **Tailwind CSS 4.1.11** for styling (using v4 with PostCSS plugin)
- **TypeScript 5.9.3**
- **RxJS 7.8.2** and Angular Signals for state management

## Common Commands

```bash
npm start          # Start dev server (default port 4200)
npm run build      # Production build → dist/sakai-ng/
npm test           # Run Karma/Jasmine tests
npm run format     # Format all .ts, .html, .js files with Prettier
npm run watch      # Build in watch mode
```

## Architecture

### State Management
This application uses **Angular Signals** for reactive state management, not traditional RxJS BehaviorSubjects or NgRx.

- **WeldParamsStore** (`src/app/store/weld-params.store.ts`): Global store managing weld thickness parameters
  - Stores S1 and S2 thickness values
  - Provides computed signal `s` = min(S1, S2) for minimum thickness
  - Injectable at root level, used across NDT components

When adding new global state:
- Create stores in `src/app/store/`
- Use Angular signals with `signal()` and `computed()` APIs
- Keep signals private, expose via computed getters
- Provide setter methods for updates

### Routing Architecture

Routes are defined in `src/app.routes.ts` with nested structure:

- Root path (`/`) renders `AppLayout` component with NDT Dashboard as default page
- Uses path alias `@/*` → `src/app/*` for cleaner imports
- Authentication routes use lazy loading: `loadChildren: () => import(...)`

Key routes:
- `/` - NDT Dashboard (primary application interface)
- `/ndt-dashboard` - NDT Dashboard (same as root)
- `/auth` - Authentication pages (lazy loaded: login, error, access denied)
- `/notfound` - 404 error page

### Component Structure

**Standalone Components** (modern Angular approach):
- All components use `imports: [...]` instead of NgModule declarations
- Component selector prefix: `p-` (configured in eslint.config.js)
- Component class suffix: none (no `Component` suffix, e.g., `NdtDashboard` not `NdtDashboardComponent`)
- Inline style language: SCSS

**NDT Dashboard** (`src/app/pages/ndt-dashboard/`):
- Primary feature module for NDT inspection workflow
- Composed of:
  - `weld-params-widget/` - Input for weld thickness (S1, S2), joint types, quality levels
  - `ndt-norms/` - Inspection standards tables for each NDT method (vt, ut, rt, pt, mt, ut-edges)
  - `ndt-test-reports/` - Test report forms for each NDT method

When creating new components:
- Use standalone component pattern
- Follow feature-based directory structure under `src/app/pages/`
- Place shared widgets in parent feature directory

### Styling Architecture

**Tailwind CSS v4 + PrimeNG Integration:**
- Global styles: `src/assets/styles.scss`
- PostCSS configuration: `.postcssrc.json` with `@tailwindcss/postcss`
- Tailwind config: `src/assets/tailwind.css`
- PrimeNG theme: Aura preset with dark mode support (`.app-dark` selector)
- Component styles: SCSS files co-located with components

Styling approach:
- Use Tailwind utility classes for layout and spacing
- PrimeNG components provide pre-styled UI elements
- Custom SCSS for component-specific styles
- Dark mode managed via `.app-dark` class toggle

### TypeScript Configuration

**Path Aliases:**
- `@/*` maps to `src/app/*`
- Use this alias for all internal imports: `import { Foo } from '@/pages/foo/foo'`

**Strict Mode:**
- Strict TypeScript enabled
- Component input accessors must be explicit
- Template type checking enabled

## Key Domain Concepts

### Reference basic documentations
The `.claude/basicDocumentationForTheApp/` directory contains the official standards that define inspection requirements:
- **СТО Газпром 15-1.3-004-2023** - Primary NDT standard with Appendix G forms
- **СТО Газпром 15-2.3-005-2023** - Additional welding standards

### NDT Testing Methods
The application supports multiple NDT methods:
- **VT** - Visual Testing (Визуальный контроль)
- **UT** - Ultrasonic Testing (Ультразвуковой контроль)
- **RT** - Radiographic Testing (Радиографический контроль)
- **PT** - Penetrant Testing (Капиллярный контроль)
- **MT** - Magnetic Testing (Магнитопорошковый контроль)
- **UT-Edges** - Ultrasonic edge inspection (УЗК кромок)

### Quality Levels
Inspection quality standards: A, B, C (A is highest)

### Weld Parameters
- **S1** - Thickness of first welded element (толщина первого элемента)
- **S2** - Thickness of second welded element (толщина второго элемента)
- **S (min)** - Minimum of S1 and S2, used for standard lookups

## Project Naming Note

The `package.json` and `angular.json` reference "sakai-ng" (template name). The actual project is "piloman-ndt". Build output goes to `dist/sakai-ng/`.

## Deployment

Configured for Vercel deployment (`vercel.json`):
- SPA routing with rewrites to `index.html`
- Trailing slash handling configured

## AI Assistant Guidelines

- Разработка ведётся на ОС Windows
- Общение ведётся на русском языке
- Ассистент должен разбираться в Неразрушающем контроле сварных соединений

### Project Goals
Разработка веб-приложения piloman.ru для специалистов НК:
- Быстрое оформление производственных документов и заключений (по формам Приложения Г СТО Газпром 15-1.3-004-2023)
- Ведение реестров, протоколов и отчётности
- Удобная повседневная работа дефектоскопистов и инженеров

### Full Stack (planned)
- **Frontend**: Angular 21, Standalone-компоненты, TypeScript, PrimeNG 21, TailwindCSS
- **Backend**: NestJS (REST)
- **Database**: MongoDB + Mongoose
- **Infrastructure**: Docker, Docker Compose, Nginx, Yandex Cloud (VM, домен piloman.ru, SSL)
- **Auth**: JWT-аутентификация, ролевые права
