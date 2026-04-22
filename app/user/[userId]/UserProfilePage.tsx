"use client";

import * as React from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Pagination from "@mui/material/Pagination";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useUserTripBookingReviews } from "@/app/services/TripBookingReviewService";

export function UserProfilePage({ userId }: { userId: number }) {
  const [page, setPage] = React.useState(1);
  const size = 10;

  const { data, isLoading, isError, error } = useUserTripBookingReviews(userId, page - 1, size);

  const totalPages = Math.max(1, data?.totalPages ?? 1);
  const reviews = data?.content ?? [];

  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Stack spacing={0.5}>
        <Typography variant="h4">Пользователь #{userId}</Typography>
        <Typography variant="body2" color="text.secondary">
          Публичный профиль
        </Typography>
      </Stack>

      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Отзывы
        </Typography>

        {isLoading && <Typography color="text.secondary">Загрузка…</Typography>}

        {isError && (
          <Typography color="error">
            Не удалось загрузить отзывы{error?.message ? `: ${error.message}` : ""}.
          </Typography>
        )}

        {!isLoading && !isError && reviews.length === 0 && (
          <Typography color="text.secondary">Пока нет опубликованных отзывов.</Typography>
        )}

        <Stack spacing={2} sx={{ mt: 2 }}>
          {reviews.map((r) => {
            const trip =
              r.tripPlaceFrom && r.tripPlaceTo ? `${r.tripPlaceFrom} → ${r.tripPlaceTo}` : undefined;
            const date =
              typeof r.approvedAt === "number" ? dayjs(r.approvedAt).format("DD.MM.YYYY") : undefined;

            return (
              <Card key={r.id} variant="outlined">
                <CardContent>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                      <Rating value={r.rating ?? 0} readOnly />
                      {date && (
                        <Typography variant="body2" color="text.secondary">
                          {date}
                        </Typography>
                      )}
                    </Stack>

                    {trip && <Typography variant="subtitle2">{trip}</Typography>}

                    {r.comment && r.comment.trim().length > 0 && (
                      <Typography variant="body1">{r.comment}</Typography>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>

        {totalPages > 1 && (
          <Stack alignItems="center" sx={{ mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, next) => setPage(next)}
              color="primary"
            />
          </Stack>
        )}
      </Box>
    </Stack>
  );
}

