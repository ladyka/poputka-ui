# Functionality

## Public user profiles

- **Route**: `/user/{userId}` (App Router: `app/user/[userId]/page.tsx`)
- **Purpose**: public profile page for a user
- **Currently displayed**: approved trip booking reviews for the user
  - **API**: `GET /api/trip-booking-review/users/{userId}`
  - **UI**: `app/user/[userId]/UserProfilePage.tsx`

## Trip booking reviews (dialogs + trip page)

- **Dialogs** (`/dialogs/{bookingId}`):
  - When `bookingStatus` is **`COMPLETED`**, the chat UI shows a review editor for that booking.
  - The trip link in the dialog header includes deep-link query params for opening the review modal on the trip page.
- **Trip page** (`/trip/{tripId}`):
  - Supports opening a review modal via query string:
    - `?review=1&bookingId=<bookingId>`
  - **UI**: `app/trip/[id]/page.tsx` + shared editor `app/components/TripBookingReviewEditor.tsx`

Notes (UX):
- The review UI avoids exposing the internal **`DRAFT`** state wording to end users; when editing is allowed, it prefers messaging about the remaining edit window (based on `editableUntil` when present).

## Admin: trip booking review moderation

- **Route**: `/admin/trips/reviews` (App Router: `app/admin/trips/reviews/page.tsx`)
- **Purpose**: review moderation queue + approve/reject actions for trip booking reviews
- **API**:
  - `GET /api/trip-booking-review/moderation/pending`
  - `PUT /api/trip-booking-review/moderation/{reviewId}`

