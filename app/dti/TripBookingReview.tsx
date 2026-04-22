export interface TripBookingReviewPublicListItemDto {
  id: number;
  rating: number;
  comment?: string;
  approvedAt?: number;
  tripPlaceFrom?: string;
  tripPlaceTo?: string;
}

export interface PageTripBookingReviewPublicListItemDto {
  totalElements: number;
  totalPages: number;
  size: number;
  content: TripBookingReviewPublicListItemDto[];
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export type TripBookingReviewStatus = "DRAFT" | "PENDING_MODERATION" | "APPROVED" | "REJECTED";

export interface TripBookingReviewCreateRequestDto {
  rating: number;
  comment?: string;
}

export interface TripBookingReviewPatchRequestDto {
  rating: number;
  comment?: string;
}

export interface TripBookingReviewItemDto {
  id: number;
  bookingId: string;
  status: TripBookingReviewStatus;
  rating: number;
  comment?: string;
  revieweeId: number;
  createdAt?: number;
  canEdit: boolean;
  editableUntil?: number;
  moderatorComment?: string;
}

export interface TripBookingReviewMeResponseDto {
  hasReview: boolean;
  review?: TripBookingReviewItemDto;
}

