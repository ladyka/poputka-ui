import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/app/services/ApiInstance";
import type { PageTripBookingReviewPublicListItemDto } from "@/app/dti/TripBookingReview";

function normalizePage(data: unknown): PageTripBookingReviewPublicListItemDto {
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

export function useUserTripBookingReviews(userId: number, page: number, size: number) {
  return useQuery<PageTripBookingReviewPublicListItemDto, Error>({
    queryKey: ["user-trip-booking-reviews", userId, page, size],
    queryFn: async () => {
      const response = await apiInstance.get(`/trip-booking-review/users/${userId}`, {
        params: {
          page,
          size,
        },
      });
      return normalizePage(response.data as unknown);
    },
    enabled: Number.isFinite(userId) && userId > 0,
    staleTime: 60_000,
  });
}

