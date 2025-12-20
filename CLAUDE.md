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

### Development
```bash
npm start                        # Start dev server (default port 4200)
npm run watch                    # Build in watch mode
npm run format                   # Format code with Prettier
```

### Build & Test
```bash
npm run build                    # Production build → dist/sakai-ng/
npm test                         # Run Karma/Jasmine tests
```

### Code Quality
```bash
npm run format                   # Format all .ts, .html, .js files
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
- Component selector prefix: `app-`
- Inline style language: SCSS

**NDT Dashboard** (`src/app/pages/ndt-dashboard/`):
- Primary feature module for NDT inspection workflow
- Composed of widgets:
  - `weld-params-widget/` - Input for weld thickness (S1, S2), joint types, quality levels
  - `ndt-norms/` - Inspection standards tables
    - `vt-norms/` - Visual Testing standards with dynamic content

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

### NDT Testing Methods
The application supports multiple NDT methods:
- **VT** - Visual Testing
- **UT** - Ultrasonic Testing
- **RT** - Radiographic Testing
- **PT** - Penetrant Testing
- **MT** - Magnetic Testing
- **UT-Edges** - Ultrasonic edge inspection

### Quality Levels
Inspection quality standards: A, B, C (highest to lowest)

### Weld Parameters
- **S1** - Thickness of first welded element
- **S2** - Thickness of second welded element
- **S (min)** - Minimum of S1 and S2, used for standard lookups

## Project Naming Note

The `package.json` and `angular.json` reference "sakai-ng" (template name). The actual project is "piloman-ndt". Build output goes to `dist/sakai-ng/`.

## Deployment

Configured for Vercel deployment (`vercel.json`):
- SPA routing with rewrites to `index.html`
- Trailing slash handling configured

## AI Assistant Guidelines

* Разработка ведётся на ОС Windows
* Ты должен общаться на русском языке

Мой проект (Angular 21 + NestJS + MongoDB + развёртывание в Yandex Cloud).
Так же ты хорошо разбираешься в Неразрушающем контроле сварных соединений.

Задача: разработать веб-приложение piloman.ru для специалистов неразрушающего контроля (НК) для:
- быстрого оформления производственных документов и заключений;
- ведения реестров, протоколов и отчётности;
- удобной повседневной работы дефектоскопистов и инженеров.

Технологический стек:
- Frontend: Angular 21, Standalone-компоненты, Vite builder, TypeScript, PrimeNG 20, TailwindCSS, PrimeIcons.
- Backend: NestJS (REST).
- База данных: MongoDB + Mongoose (хранение всех документов и связанной информации).
- Инфраструктура и деплой: Docker, Docker Compose, Nginx, Yandex Cloud (VM, сети, security groups, домен piloman.ru, SSL).
- Прочее: JWT-аутентификация, ролевые права, платёжный шлюз для приёма оплат в России за платную версию приложения.