# Functionality

## Public user profiles

- **Route**: `/user/{userId}` (App Router: `app/user/[userId]/page.tsx`)
- **Purpose**: public profile page for a user
- **Currently displayed**: approved trip booking reviews for the user
  - **API**: `GET /api/trip-booking-review/users/{userId}`
  - **UI**: `app/user/[userId]/UserProfilePage.tsx`

