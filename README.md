# Poputka UI

Frontend for `poputka.by` / `poputka.local` built with **Next.js (App Router + Pages Router)**, **React 18**, **TypeScript**, **MUI**, **React Query**, **axios**, and **dayjs**.

## Requirements

- **Node.js**: current CI images use `node:22` / `node:24` (see `.gitlab-ci-next_js-tests-service.yml`)
- **npm**: used by the repo (`package-lock.json` is committed)

## Install

```bash
npm ci
```

## Run (dev)

```bash
npm run dev
```

## Build / Start

```bash
npm run build
npm run start
```

## Lint / Format

```bash
npm run lint
npm run format
```

## Tests

- Unit + component/integration tests are powered by **Vitest + Testing Library**.
- The repo also treats `next build` as a build-time test.

```bash
npm run test          # next build
npm run test:unit
npm run test:coverage
```

Convenience shortcuts:

```bash
make unit
make coverage
make verify
```

More details: `docs/tests.md`.

## Environment variables

### Runtime (Next.js)

No `process.env.*` / `NEXT_PUBLIC_*` usage was found in the codebase.

TODO: verify if any env vars are used only in deployment manifests (nginx/systemd) outside this repo.

### CI / deploy (GitLab)

Used in `.gitlab-ci-next_js-tests-service.yml`:
- `SSH_KEY_FILE_DEV`
- `HOST_TARGET_DEV`
- `SSH_KEY_FILE_PROD`
- `HOST_TARGET_PROD`
- `WWW_DIR`
- `CI_PROJECT_NAME` (GitLab built-in)
- `CI_PROJECT_DIR` (GitLab built-in)

## Project structure (high level)

- **`app/`**: Next.js App Router pages, layouts, and UI (MUI) components
  - `app/layout.tsx`: root layout + providers (Emotion cache + React Query)
  - `app/services/`: axios clients and API-facing hooks/services
  - `app/dti/`: DTO/type definitions used by UI and services
- **`pages/`**: legacy Next.js Pages Router routes (`/blog`, `/faq`, etc.)
- **`docs/`**: project documentation (tests, architecture, API, routing)
- **`test/`**: Vitest setup (`test/setup.ts`)

<<<<<<< HEAD
Key docs:
- `docs/functionality.md`
- `docs/routing.md`
- `docs/api.md`

=======
>>>>>>> edb14a4 (Документация и тесты.)
## Troubleshooting

- **Redirect loop / unexpected HTML from API**: axios response interceptor checks for an HTML marker (`<h2>Please sign in</h2>`) and redirects to `/sign-in?next=...`. See `app/services/ApiInstance.tsx`.
- **Dialogs route requires auth**: `/dialogs/*` performs a client-side auth check via `/api/user/info` and redirects to sign-in on failure. See `app/dialogs/layout.tsx`.
- **`useSearchParams()` build error**: in App Router, `useSearchParams()` requires Suspense. This repo avoids it by reading `searchParams` in `app/sign-in/page.tsx` and passing it down to the client component.
- **ESLint setup**: the repo uses ESLint flat config in `eslint.config.js`.