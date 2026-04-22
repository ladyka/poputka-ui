import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "@/app/services/ApiInstance";
import type {
  PageTripBookingReviewModerationListItemDto,
  PageTripBookingReviewPublicListItemDto,
  TripBookingReviewCreateRequestDto,
  TripBookingReviewItemDto,
  TripBookingReviewMeResponseDto,
  TripBookingReviewModerationListItemDto,
  TripBookingReviewModerationRequestDto,
  TripBookingReviewPatchRequestDto,
} from "@/app/dti/TripBookingReview";
import {
  normalizeTripBookingReviewMe,
  normalizeTripBookingReviewModerationPage,
  normalizeTripBookingReviewPublicPage,
} from "@/app/utils/tripBookingReviewNormalize";

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
      return normalizeTripBookingReviewPublicPage(response.data as unknown);
    },
    enabled: Number.isFinite(userId) && userId > 0,
    staleTime: 60_000,
  });
}

export function useMyTripBookingReview(bookingId: string) {
  return useQuery<TripBookingReviewMeResponseDto, Error>({
    queryKey: ["trip-booking-review-me", bookingId],
    queryFn: async () => {
      const response = await apiInstance.get(`/trip-booking-review/booking/${bookingId}/me`);
      return normalizeTripBookingReviewMe(response.data as unknown);
    },
    enabled: !!bookingId,
    staleTime: 30_000,
  });
}

export function useCreateTripBookingReview(bookingId: string) {
  const queryClient = useQueryClient();
  return useMutation<TripBookingReviewItemDto, Error, TripBookingReviewCreateRequestDto>({
    mutationFn: async (body) => {
      const response = await apiInstance.post(`/trip-booking-review/booking/${bookingId}`, body);
      return response.data as TripBookingReviewItemDto;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["trip-booking-review-me", bookingId] });
    },
  });
}

export function usePatchTripBookingReview(reviewId: number, bookingId: string) {
  const queryClient = useQueryClient();
  return useMutation<TripBookingReviewItemDto, Error, TripBookingReviewPatchRequestDto>({
    mutationFn: async (body) => {
      const response = await apiInstance.patch(`/trip-booking-review/${reviewId}`, body);
      return response.data as TripBookingReviewItemDto;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["trip-booking-review-me", bookingId] });
    },
  });
}

export function usePendingTripBookingReviewModeration(page: number, size: number) {
  return useQuery<PageTripBookingReviewModerationListItemDto, Error>({
    queryKey: ["trip-booking-review-moderation-pending", page, size],
    queryFn: async () => {
      const response = await apiInstance.get(`/trip-booking-review/moderation/pending`, {
        params: {
          page,
          size,
          "pageable.page": page,
          "pageable.size": size,
        },
      });
      return normalizeTripBookingReviewModerationPage(response.data as unknown);
    },
    staleTime: 15_000,
  });
}

export function useModerateTripBookingReview() {
  const queryClient = useQueryClient();
  return useMutation<
    TripBookingReviewModerationListItemDto,
    Error,
    { reviewId: number; body: TripBookingReviewModerationRequestDto }
  >({
    mutationFn: async ({ reviewId, body }) => {
      const response = await apiInstance.put(`/trip-booking-review/moderation/${reviewId}`, body);
      return response.data as TripBookingReviewModerationListItemDto;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["trip-booking-review-moderation-pending"] });
    },
  });
}

