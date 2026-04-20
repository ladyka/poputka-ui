# Functionality

## Dialogs / Booking chat messages

### Get messages
- **Endpoint**: `GET /api/booking/messages/{bookingId}`
- **Response item shape** (`BookingMessageDto`):
  - `id: string`
  - `payload: { type: string, ... }` (discriminated by `type`)
    - text message payload typically includes `text?: string`
    - service payload may include `event?: string`, `from?: string`, `to?: string`
  - `messageStatus: "SENT" | "DELIVERED" | "READ"`
  - `modifiedDatetime: string` (date-time)
  - `myMessage: boolean`

**Note**: the UI must render message text from `payload.text` (there is no flat `content` on `BookingMessageDto`).

### Send message
- **Endpoint**: `PUT /api/booking/messages`
- **Request** (`MessageCreateDto`):
  - `bookingId: string`
  - `payload: Message | Service` (where `Message` includes `text`)
  - `content`: not used by the UI; message text is sent via `payload.text`

### Share current location (UI-only convention)
The backend message payload currently supports text messages (`type = "MESSAGE"` with `text`).
To share coordinates, the UI sends a text message in the format:

- `payload.type = "MESSAGE"`
- `payload.text = "GEO:<lat>,<lon>"`

The chat UI detects `GEO:` messages and renders an OpenStreetMap preview + a link to open the location.

## Tooling / verification

### ESLint configuration
The repo uses ESLint flat config via `eslint.config.js`. This is required for `npm run verify` (which runs `npm run lint && npm run test`) to work reliably.
