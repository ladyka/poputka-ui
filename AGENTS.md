# AGENTS.md

This file is a **map of the repo** and a short set of rules for making changes safely.

## Repo map

### Routing (Next.js)

- **App Router**: `app/`
  - Root layout/providers: `app/layout.tsx`
  - Pages: `app/**/page.tsx`
  - Nested route examples:
    - `app/dialogs/page.tsx` → `/dialogs`
    - `app/dialogs/[id]/page.tsx` → `/dialogs/:id`
    - `app/trip/[id]/page.tsx` → `/trip/:id` (App Router)
- **Pages Router**: `pages/` (legacy)
  - `pages/blog.tsx` → `/blog`
  - `pages/faq.tsx` → `/faq`
  - `pages/profile.tsx` → `/profile`
  - `pages/termsandconditions.tsx` → `/termsandconditions`
  - `pages/trip.tsx` → `/trip` (Pages Router)
  - `pages/ride-sharing/[...fromto].tsx` → `/ride-sharing/*` (catch-all)

<<<<<<< HEAD

### API

[baskend-api-docs.json](baskend-api-docs.json)

=======
>>>>>>> edb14a4 (Документация и тесты.)
### API client (axios) and services

- Axios instances + global response interceptor: `app/services/ApiInstance.tsx`
  - `instance`: `baseURL: "/"`, `withCredentials: true` (used for `/login`)
  - `apiInstance`: `baseURL: "/api"`, `withCredentials: true` (backend API)
- Services/hooks:
  - Dialogs/bookings/messages: `app/services/DialogService.tsx`
  - Auth/user: `app/services/UserAuthService.tsx`
  - Trips: `app/services/TripService.tsx`
- DTO/types (used by services and UI): `app/dti/*.tsx`

### Providers / global setup

- **React Query** provider: `app/components/ReactQueryProvider.tsx`
- **MUI/Emotion** SSR registry: `app/components/ThemeRegistry.tsx`
- Theme token builders used by pages: `app/getLPTheme.tsx`, `app/getSignUpInTheme.tsx`, `app/checkout/getCheckoutTheme.tsx`

## Adding a new feature/page

1. **Pick the router**
   - Prefer **App Router**: create `app/<route>/page.tsx` (and optionally `layout.tsx` inside the route).
   - Use `pages/` only if you must integrate with existing Pages Router routes.
2. **Compose UI**
   - Reuse existing components in `app/components/`.
   - Prefer MUI components and `sx` for styling (this repo uses MUI heavily).
3. **Fetch data**
   - Put API calls into `app/services/*`.
   - Put DTOs into `app/dti/*`.

## Adding a new backend endpoint (axios)

1. Add/extend DTOs in `app/dti/<Name>.tsx`.
2. Add a typed function or React Query hook in `app/services/<Domain>Service.tsx`.
   - Use `apiInstance` for `/api/*`.
3. Update UI to call the new hook/service.

Notes:
- `apiInstance` always sends cookies (`withCredentials: true`), so auth is cookie-based.
- A global response interceptor in `app/services/ApiInstance.tsx` may transform `response.data` and can trigger auth redirects.

## Checking changes before commit

```bash
npm run lint
npm run test          # next build
npm run test:unit     # vitest
```

Or:

```bash
make verify
```

## Constraints / do-not-break

- **Do not commit secrets**: `.env*`, private keys, credentials, or any generated deployment bundles.
- **Be careful with API response shapes**: UI expects specific DTOs from `app/dti/*`.
  - Example: chat message text is in `payload.text` (see `docs/api.md` → “Dialogs / booking chat contract”).
- **Do not remove auth redirect behavior** without updating protected routes:
  - HTML sign-in marker redirect: `app/services/ApiInstance.tsx`
  - Dialogs auth guard: `app/dialogs/layout.tsx`
<<<<<<< HEAD
- **Do not put Vitest tests in `pages/`**:
  - Avoid `pages/**/*.test.tsx` / `pages/**/*.spec.tsx` — Next.js can treat them as route modules and `next build` will fail.
  - Put tests in `test/` or next to components (e.g. `app/**/Component.test.tsx`).


## Before finish
In the end of each task, always update tests and relevant documentation (or leave a `TODO:` with exact files/sections if it must be deferred).

Also, at the end of each task:

- Propose a **ready-to-use commit message** summarizing the change.
- Include a quick command the developer can run, e.g.:

```bash
git commit -a -m "<message>"
```

Notes:
- Do **not** commit secrets (`.env*`, keys, credentials).
- Prefer a message that describes **why** the change was made (not only what changed).
=======

>>>>>>> edb14a4 (Документация и тесты.)
