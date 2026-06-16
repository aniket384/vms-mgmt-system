# VMS Management System

Enterprise-style Video Management System frontend built with Next.js App Router, TypeScript, TailwindCSS, Zustand, React Hook Form, Zod, TanStack Table, Recharts, Sonner, and Lucide icons.

This build is intentionally demo-mode only. Authentication and data are frontend mock implementations so stakeholders can review the product UX before backend/security integration.

## Demo Credentials

| Role | Email | Password |
| --- | --- | --- |
| Super Admin | `admin@vms.local` | `Admin@1234` |
| Operator | `operator@vms.local` | `Operator@1234` |
| Viewer | `viewer@vms.local` | `Viewer@1234` |

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

If port `3000` is already occupied, Next.js will choose the next available port.

## Quality Gates

Run these before every demo or deployment:

```bash
npm run test
npm run lint
npm run build
npm audit --audit-level=moderate
```

Current expected state:

- Unit/component tests pass.
- ESLint passes.
- Production build passes.
- npm audit reports a known moderate advisory in Next's nested PostCSS dependency. Do not run `npm audit fix --force` without reviewing the resulting dependency changes.

## Architecture

Key folders:

- `src/app`: Next.js App Router routes.
- `src/components`: reusable UI, layout, table, video, chart, and dashboard components.
- `src/mock-data`: frontend-only demo data.
- `src/services`: service abstraction layer. Replace these methods with API calls when backend integration starts.
- `src/store`: client UI/auth state using Zustand.
- `src/types`: shared TypeScript domain models.

## Demo Mode Boundaries

The following are intentionally mocked:

- Authentication and session persistence.
- Camera, recording, user, event, audit, download, and shared video data.
- Mutating actions such as delete, edit, reset password, and share.
- Public sample MP4 streams.

The UI is structured so real backend integration can replace service methods without changing page composition.

## Deployment

Recommended demo deployment: Vercel.

Build command:

```bash
npm run build
```

Install command:

```bash
npm install
```

Environment variables:

```bash
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_APP_NAME="VMS Management System"
```

## Security Notes

Security headers are configured in `next.config.ts`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- Restrictive `Permissions-Policy`

Before real production release, replace dummy auth with a server-backed provider, remove visible credentials, add API authorization checks, add audit-backed mutations, and re-run dependency/security review.
