# Routing

This repo currently uses **both** Next.js routing systems:

- **App Router**: `app/`
- **Pages Router**: `pages/`

## App Router routes (`app/**/page.tsx`)

- `/` → `app/page.tsx`
- `/landing-page` → `app/landing-page/page.tsx`
- `/sign-in` → `app/sign-in/page.tsx`
- `/sign-up` → `app/sign-up/page.tsx`
- `/checkout` → `app/checkout/page.tsx`
- `/dialogs` → `app/dialogs/page.tsx`
- `/dialogs/[id]` → `app/dialogs/[id]/page.tsx`
- `/trip/[id]` → `app/trip/[id]/page.tsx`

Root layout (providers): `app/layout.tsx`

## Pages Router routes (`pages/*.tsx`)

- `/blog` → `pages/blog.tsx`
- `/faq` → `pages/faq.tsx`
- `/profile` → `pages/profile.tsx`
- `/termsandconditions` → `pages/termsandconditions.tsx`
- `/trip` → `pages/trip.tsx`
- `/ride-sharing/*` → `pages/ride-sharing/[...fromto].tsx` (catch-all)

## Guards / redirects

### Protected routes

- `/dialogs/*` is treated as protected in UI.
  - `app/dialogs/layout.tsx` calls `/api/user/info` on mount.
  - If unauthenticated, redirects to `/sign-in?next=<current-url>`.

TODO: confirm whether other routes are intended to be protected (search for `useUserInfoService()` usage beyond `AppAppBar` and dialogs layout).

### Auth loss handling during API calls

`app/services/ApiInstance.tsx` has a response interceptor:
- If the backend returns HTML containing `<h2>Please sign in</h2>`, it redirects to `/sign-in?next=<current-url>`.

### Post-login return (next)

`/sign-in` supports returning back to the originally requested URL:
- `app/sign-in/page.tsx` reads `searchParams.next` and passes it to the client component.
- `app/sign-in/SignIn.tsx` uses `router.replace(next)` after successful login (only for relative paths starting with `/`).

