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

