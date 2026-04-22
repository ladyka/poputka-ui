import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "@/app/services/ApiInstance";
import type {
  PageTripBookingReviewPublicListItemDto,
  TripBookingReviewCreateRequestDto,
  TripBookingReviewItemDto,
  TripBookingReviewMeResponseDto,
  TripBookingReviewPatchRequestDto,
} from "@/app/dti/TripBookingReview";
import {
  normalizeTripBookingReviewMe,
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

