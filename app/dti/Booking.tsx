export interface Booking {
  bookingId: string;
  tripId: number;
  placeFrom: string;
  placeTo: string;
  start: string;
  bookingStatus: string;
  oppositeUserName: string;
  content: string;
  messageStatus: string;
  lastMessageTime: string;
  userRole: string;
}

export interface CreateBookingResponse {
  id: string;
  tripId: number;
  passengerId: number;
  bookingStatus: string;
}