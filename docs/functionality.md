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

