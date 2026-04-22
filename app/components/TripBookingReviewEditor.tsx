"use client";

import * as React from "react";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import type { TripBookingReviewStatus, TripBookingReviewItemDto, TripBookingReviewPatchRequestDto } from "@/app/dti/TripBookingReview";
import { apiInstance } from "@/app/services/ApiInstance";
import { useCreateTripBookingReview, useMyTripBookingReview } from "@/app/services/TripBookingReviewService";

function statusLabel(status: TripBookingReviewStatus): string {
  switch (status) {
    case "DRAFT":
      return "Черновик";
    case "PENDING_MODERATION":
      return "На модерации";
    case "APPROVED":
      return "Одобрен";
    case "REJECTED":
      return "Отклонён";
    default:
      return status;
  }
}

export function TripBookingReviewEditor({
  bookingId,
  disabled,
}: {
  bookingId: string;
  disabled?: boolean;
}) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, refetch, isFetching } = useMyTripBookingReview(bookingId);
  const createMutation = useCreateTripBookingReview(bookingId);

  const reviewId = data?.review?.id;

  const patchMutation = useMutation<TripBookingReviewItemDto, Error, TripBookingReviewPatchRequestDto>({
    mutationFn: async (body) => {
      const cached = queryClient.getQueryData(["trip-booking-review-me", bookingId]) as
        | { review?: { id?: number } }
        | undefined;
      const id = typeof reviewId === "number" ? reviewId : cached?.review?.id;
      if (typeof id !== "number") {
        throw new Error("MISSING_REVIEW_ID");
      }
      const response = await apiInstance.patch(`/trip-booking-review/${id}`, body);
      return response.data as TripBookingReviewItemDto;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["trip-booking-review-me", bookingId] });
    },
  });

  const [rating, setRating] = React.useState<number | null>(5);
  const [comment, setComment] = React.useState<string>("");

  React.useEffect(() => {
    if (!data?.hasReview || !data.review) {
      setRating(5);
      setComment("");
      return;
    }

    setRating(data.review.rating);
    setComment(data.review.comment ?? "");
  }, [data?.hasReview, data?.review?.id, data?.review?.rating, data?.review?.comment]);

  const review = data?.review;
  const canSubmit = !!bookingId && !disabled && rating !== null && rating >= 1 && rating <= 5;

  const handleSubmit = () => {
    if (!canSubmit || rating === null) return;

    const payload = { rating, comment };

    if (!data?.hasReview) {
      createMutation.mutate(payload, {
        onError(err) {
          console.error(err);
          alert("Не удалось отправить отзыв.");
        },
      });
      return;
    }

    if (!review) {
      alert("Отзыв недоступен.");
      return;
    }

    if (!review.canEdit) {
      alert("Редактирование отзыва сейчас недоступно.");
      return;
    }

    patchMutation.mutate(payload, {
      onError(err) {
        console.error(err);
        alert("Не удалось обновить отзыв.");
      },
    });
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 720 }}>
      <Stack spacing={1.5}>
        <Typography variant="subtitle1">Отзыв о поездке</Typography>

        {isLoading && <Typography color="text.secondary">Загрузка отзыва…</Typography>}
        {isError && (
          <Typography color="error">
            Не удалось загрузить отзыв{error?.message ? `: ${error.message}` : ""}.
          </Typography>
        )}

        {!isLoading && !isError && data?.hasReview && review && (
          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              Статус: {statusLabel(review.status)}
            </Typography>
            {typeof review.editableUntil === "number" && (
              <Typography variant="caption" color="text.secondary">
                Редактирование до: {dayjs(review.editableUntil).format("DD.MM.YYYY HH:mm")}
              </Typography>
            )}
            {review.moderatorComment && review.moderatorComment.trim().length > 0 && (
              <Typography variant="body2" color="text.secondary">
                Комментарий модератора: {review.moderatorComment}
              </Typography>
            )}
          </Stack>
        )}

        <Stack spacing={1}>
          <Typography component="legend" variant="body2" color="text.secondary">
            Оценка
          </Typography>
          <Rating
            value={rating}
            onChange={(_, v) => setRating(v)}
            readOnly={disabled || (!!review && !review.canEdit) || createMutation.isPending || patchMutation.isPending}
          />
        </Stack>

        <TextField
          label="Комментарий"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          minRows={3}
          fullWidth
          disabled={disabled || (!!review && !review.canEdit) || createMutation.isPending || patchMutation.isPending}
        />

        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !canSubmit ||
              isLoading ||
              isFetching ||
              createMutation.isPending ||
              patchMutation.isPending ||
              (!!review && !review.canEdit && data?.hasReview)
            }
          >
            {!data?.hasReview ? "Отправить отзыв" : review?.canEdit ? "Сохранить изменения" : "Отзыв отправлен"}
          </Button>

          <Button variant="text" onClick={() => refetch()} disabled={isFetching}>
            Обновить
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
