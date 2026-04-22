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

export type TripBookingReviewModerationDecision = "APPROVE" | "REJECT";

export interface TripBookingReviewModerationRequestDto {
  decision: TripBookingReviewModerationDecision;
  moderatorComment?: string;
}

export interface TripBookingReviewModerationListItemDto {
  id: number;
  bookingId: string;
  reviewerId: number;
  reviewerUsername?: string;
  revieweeId: number;
  status: TripBookingReviewStatus;
  rating: number;
  comment?: string;
  createdAt?: number;
}

export interface PageTripBookingReviewModerationListItemDto {
  totalElements: number;
  totalPages: number;
  size: number;
  content: TripBookingReviewModerationListItemDto[];
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

