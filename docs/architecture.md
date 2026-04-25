# Architecture

This repo is a **Next.js** frontend that currently uses both routing systems:

- **App Router** (`app/`) for most interactive UI and layouts
- **Pages Router** (`pages/`) for several legacy/static pages

## High-level layers

- **Routes / pages**
  - App Router pages: `app/**/page.tsx`
  - Pages Router pages: `pages/**/*.tsx`
- **UI components**
  - Shared components: `app/components/`
  - Feature folders also contain components (e.g. `app/dialogs/components/`)
- **Services (API access)**
  - `app/services/*`
- **DTO / types**
  - `app/dti/*`
- **Utilities**
  - `app/utils/*`

## Providers (global)

Root layout: `app/layout.tsx`.

It wraps all App Router routes with:

- **Emotion cache for MUI SSR**: `app/components/ThemeRegistry.tsx`
- **React Query**: `app/components/ReactQueryProvider.tsx`

Notes:
- Many pages also create their own MUI theme instances and wrap parts of UI with MUI `ThemeProvider` locally (see `app/page.tsx`, `app/dialogs/layout.tsx`).

## MUI theming

Theme token builders:

- Landing/main theme: `app/getLPTheme.tsx`
- Sign-in/sign-up theme: `app/getSignUpInTheme.tsx`
- Checkout theme: `app/checkout/getCheckoutTheme.tsx`

Pattern used in pages:
- keep `mode` (`light`/`dark`) in local state
- create theme via `createTheme(getLPTheme(mode))`
- render with `<ThemeProvider theme={...}>`

<<<<<<< HEAD
## Page "shell" / app frame (AppBar + Footer + theme)

Some App Router pages are implemented with a **client-side shell** that provides the common app frame:

- `ThemeProvider` + `CssBaseline`
- `AppAppBar`
- background gradient + `Container` paddings
- `Footer`
- `ToggleCustomTheme`

Reference implementation:
- `app/trip/[id]/page.tsx`
- `app/user/[userId]/UserProfileShell.tsx`

Recommendation:
- keep `app/<route>/page.tsx` minimal (parse/validate params, render shell)
- put the actual feature UI into a separate client component (e.g. `UserProfilePage`) so it can be reused/tested without duplicating the app frame

=======
>>>>>>> edb14a4 (Документация и тесты.)
## Data fetching & caching (React Query)

- React Query is used for API hooks in `app/services/*` (example: `useGetBookings()` in `app/services/DialogService.tsx`).
- `ReactQueryProvider` constructs a `QueryClient` on the client and wraps the app with `QueryClientProvider` + `HydrationBoundary`.

TODO: confirm if there is any server-side prefetch/hydration used (search for `dehydratedState` usage).

## Error/loading handling patterns

### Auth loss / expired session

There are currently two redirect mechanisms:

- **Axios response interceptor**: `app/services/ApiInstance.tsx`
  - If the backend returns HTML containing `<h2>Please sign in</h2>`, the client navigates to `/sign-in?next=...`.
- **Dialogs route guard**: `app/dialogs/layout.tsx`
  - On mount, calls `/api/user/info` and redirects to `/sign-in?next=...` if unauthenticated.

### API response shape hardening

Some queries defensively coerce response data to arrays to avoid `.map` crashes:
- `useGetBookings()` and `useGetMessages()` in `app/services/DialogService.tsx`

## Dates (dayjs)

`dayjs` is used in UI/forms (examples found via `dayjs(...)` usage):
- `app/components/AppAppBar.tsx`
- `app/trip/TripView.tsx`
- `app/trip/TripEdit.tsx`
- `app/components/SearchForm.tsx`
- `app/components/ProfileEdit.tsx`

There is also a small utility based on `Date`:
- `app/utils/dateFormatters.ts`

