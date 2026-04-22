# API / HTTP

This project uses **axios** with cookie-based auth (`withCredentials: true`).

## Where the axios clients live

File: `app/services/ApiInstance.tsx`

It exports two axios instances:

- `instance`
  - `baseURL: "/"` (used for `/login`)
  - `withCredentials: true`
- `apiInstance`
  - `baseURL: "/api"`
  - `withCredentials: true`

## Response interceptor and error handling

Also in `app/services/ApiInstance.tsx`, a global response interceptor:

- **Auth HTML detection**
  - If `response.data` is a string containing `<h2>Please sign in</h2>`, the client redirects to:
    - `/sign-in?next=<current-path-and-query>`
  - This is meant to handle expired sessions where backend returns an HTML sign-in page.

- **Body unwrapping**
  - If `response.data` is an object with a `body` field, the interceptor replaces `response.data` with `response.data.body`.
  - Otherwise it keeps `response.data` as-is.

Important:
- Services that call axios still do `return response.data;` — after the interceptor, that value may already be unwrapped.

## Services / hooks

Most backend access is implemented as small services/hooks in `app/services/*`:

- Dialogs/bookings/messages: `app/services/DialogService.tsx`
  - `GET /api/booking/`
  - `GET /api/booking/messages/{bookingId}`
  - `PUT /api/booking/messages`
  - `GET /api/booking/{bookingId}/available-statuses`
  - `POST /api/booking/{bookingId}/status`
- Trips: `app/services/TripService.tsx`
  - `GET /api/trip/{id}`
  - `POST /api/trip/`
  - `POST /api/trip/search`
  - `GET /api/trip/popular`
- Auth/user: `app/services/UserAuthService.tsx`
  - `POST /login` (via `instance`)
  - `GET /api/user/info`
  - `POST /api/user/signup`
  - `POST /api/user/update`
- Trip booking reviews: `app/services/TripBookingReviewService.tsx`
  - `GET /api/trip-booking-review/users/{userId}`

## DTOs / typing

DTOs are stored in `app/dti/*.tsx` and imported by services/components.

Examples:
- `app/dti/Booking.tsx`
- `app/dti/Message.tsx`
- `app/dti/UserInfo.tsx`

Services use these DTOs as React Query generic types, for example:
- `useQuery<Booking[], Error>(...)` in `app/services/DialogService.tsx`

## Dialogs / booking chat contract

UI and backend contract details for chat messages live here to avoid “tribal knowledge”.

### Get messages

- **Endpoint**: `GET /api/booking/messages/{bookingId}`
- **Response item shape** (`BookingMessageDto`) — the UI expects at least:
  - `id: string`
  - `payload: { type: string, ... }` (discriminated by `type`)
    - text message payload typically includes `text?: string`
    - service payload may include `event?: string`, `from?: string`, `to?: string`
  - `messageStatus: "SENT" | "DELIVERED" | "READ"`
  - `modifiedDatetime: string` (date-time)
  - `myMessage: boolean`

Important:
- **Message text must be rendered from `payload.text`**. There is no flat `content` field on `BookingMessageDto`.

### Send message

- **Endpoint**: `PUT /api/booking/messages`
- **Request** (`MessageCreateDto`):
  - `bookingId: string`
  - `payload: Message | Service` (where `Message` includes `text`)
  - `content`: not used by the UI; message text is sent via `payload.text`

### Share current location (UI-only convention)

Backend payload currently supports text messages (`type = "MESSAGE"` with `text`).
To share coordinates, the UI sends a text message in the format:

- `payload.type = "MESSAGE"`
- `payload.text = "GEO:<lat>,<lon>"`

The chat UI detects `GEO:` messages and renders an OpenStreetMap preview + a link to open the location.

## How to add a new endpoint (recommended steps)

1. **Create/extend a DTO** in `app/dti/` (or reuse an existing one).
2. **Add a function or React Query hook** in `app/services/<Domain>Service.tsx`.
   - Use `apiInstance` for `/api/*`.
   - Keep return types explicit (e.g. `useQuery<MyDto, Error>(...)`).
3. **Handle auth-expired UX**:
   - If the endpoint might return HTML sign-in, the interceptor will redirect.
   - For protected pages, also consider a route-level guard (example: `app/dialogs/layout.tsx`).
4. **Add a test**:
   - Unit test for pure mappers/formatters
   - Component/integration test for UI behavior (see `docs/tests.md`)

