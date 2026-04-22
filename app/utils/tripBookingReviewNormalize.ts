import type {
  PageTripBookingReviewPublicListItemDto,
  TripBookingReviewItemDto,
  TripBookingReviewMeResponseDto,
  TripBookingReviewStatus,
} from "@/app/dti/TripBookingReview";

export function normalizeTripBookingReviewPublicPage(data: unknown): PageTripBookingReviewPublicListItemDto {
  const obj = (data ?? {}) as Partial<PageTripBookingReviewPublicListItemDto> & { content?: unknown };
  const content = Array.isArray(obj.content) ? (obj.content as PageTripBookingReviewPublicListItemDto["content"]) : [];

  return {
    totalElements: typeof obj.totalElements === "number" ? obj.totalElements : content.length,
    totalPages: typeof obj.totalPages === "number" ? obj.totalPages : 1,
    size: typeof obj.size === "number" ? obj.size : content.length,
    content,
    number: typeof obj.number === "number" ? obj.number : 0,
    numberOfElements: typeof obj.numberOfElements === "number" ? obj.numberOfElements : content.length,
    first: typeof obj.first === "boolean" ? obj.first : true,
    last: typeof obj.last === "boolean" ? obj.last : true,
    empty: typeof obj.empty === "boolean" ? obj.empty : content.length === 0,
  };
}

export function normalizeTripBookingReviewMe(data: unknown): TripBookingReviewMeResponseDto {
  const obj = (data ?? {}) as Partial<TripBookingReviewMeResponseDto> & { review?: unknown };
  const hasReviewFlag = obj.hasReview === true;

  const reviewRaw = obj.review;
  const reviewObj = (reviewRaw ?? {}) as Partial<TripBookingReviewItemDto>;

  const status = reviewObj.status as TripBookingReviewStatus | undefined;
  const review: TripBookingReviewItemDto | undefined =
    hasReviewFlag &&
    typeof reviewObj.id === "number" &&
    typeof reviewObj.bookingId === "string" &&
    !!status &&
    typeof reviewObj.rating === "number" &&
    typeof reviewObj.revieweeId === "number" &&
    typeof reviewObj.canEdit === "boolean"
      ? {
          id: reviewObj.id,
          bookingId: reviewObj.bookingId,
          status,
          rating: reviewObj.rating,
          comment: typeof reviewObj.comment === "string" ? reviewObj.comment : undefined,
          revieweeId: reviewObj.revieweeId,
          createdAt: typeof reviewObj.createdAt === "number" ? reviewObj.createdAt : undefined,
          canEdit: reviewObj.canEdit,
          editableUntil: typeof reviewObj.editableUntil === "number" ? reviewObj.editableUntil : undefined,
          moderatorComment: typeof reviewObj.moderatorComment === "string" ? reviewObj.moderatorComment : undefined,
        }
      : undefined;

  // If backend marks hasReview=true but payload is incomplete, treat as "no review" for UI safety.
  const hasReview = !!review && hasReviewFlag;

  return { hasReview, review };
}
