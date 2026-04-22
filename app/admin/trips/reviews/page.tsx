"use client";

import * as React from "react";
import dayjs from "dayjs";
import { alpha, PaletteMode } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AppAppBar from "@/app/components/AppAppBar";
import Footer from "@/app/components/Footer";
import getLPTheme from "@/app/getLPTheme";
import { ToggleCustomTheme } from "@/app/customThemeService";
import type { TripBookingReviewModerationDecision, TripBookingReviewModerationListItemDto } from "@/app/dti/TripBookingReview";
import { useModerateTripBookingReview, usePendingTripBookingReviewModeration } from "@/app/services/TripBookingReviewService";

function moderationStatusLabel(status: TripBookingReviewModerationListItemDto["status"]): string {
  switch (status) {
    case "PENDING_MODERATION":
      return "На модерации";
    case "APPROVED":
      return "Одобрен";
    case "REJECTED":
      return "Отклонён";
    case "DRAFT":
      return "Черновик";
    default:
      return status;
  }
}

export default function AdminTripBookingReviewsPage() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => setMode((prev) => (prev === "dark" ? "light" : "dark"));
  const toggleCustomTheme = () => setShowCustomTheme((prev) => !prev);

  const [page, setPage] = React.useState(1);
  const size = 20;

  const { data, isLoading, isError, error, refetch, isFetching } = usePendingTripBookingReviewModeration(page - 1, size);
  const moderateMutation = useModerateTripBookingReview();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<TripBookingReviewModerationListItemDto | null>(null);
  const [decision, setDecision] = React.useState<TripBookingReviewModerationDecision>("APPROVE");
  const [moderatorComment, setModeratorComment] = React.useState("");

  const rows = data?.content ?? [];
  const totalPages = Math.max(1, data?.totalPages ?? 1);

  const openDialog = (row: TripBookingReviewModerationListItemDto, d: TripBookingReviewModerationDecision) => {
    setSelected(row);
    setDecision(d);
    setModeratorComment("");
    setDialogOpen(true);
  };

  const handleModerate = () => {
    if (!selected) return;

    if (decision === "REJECT" && moderatorComment.trim().length === 0) {
      alert("Для отклонения нужен комментарий модератора.");
      return;
    }

    moderateMutation.mutate(
      {
        reviewId: selected.id,
        body: {
          decision,
          moderatorComment: moderatorComment.trim().length > 0 ? moderatorComment.trim() : undefined,
        },
      },
      {
        onSuccess() {
          setDialogOpen(false);
          setSelected(null);
          setModeratorComment("");
        },
        onError(err) {
          console.error(err);
          alert("Не удалось применить решение модерации.");
        },
      },
    );
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: "background.default" }}>
        <Box
          sx={(theme) => ({
            width: "100%",
            backgroundImage:
              theme.palette.mode === "light"
                ? "linear-gradient(180deg, #CEE5FD, #FFF)"
                : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
            backgroundSize: "100% 20%",
            backgroundRepeat: "no-repeat",
          })}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              pt: { xs: 14, sm: 20 },
              pb: { xs: 8, sm: 12 },
            }}
          >
            <Stack spacing={2}>
              <Stack spacing={0.5}>
                <Typography variant="h4">Модерация отзывов о поездках</Typography>
                <Typography variant="body2" color="text.secondary">
                  Очередь: отзывы, ожидающие модерации.
                </Typography>
              </Stack>

              {isLoading && <Typography color="text.secondary">Загрузка…</Typography>}
              {isError && (
                <Typography color="error">
                  Не удалось загрузить очередь{error?.message ? `: ${error.message}` : ""}.
                </Typography>
              )}

              {!isLoading && !isError && rows.length === 0 && (
                <Typography color="text.secondary">Очередь пуста.</Typography>
              )}

              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Booking</TableCell>
                      <TableCell>Автор</TableCell>
                      <TableCell>Оценка</TableCell>
                      <TableCell>Комментарий</TableCell>
                      <TableCell>Статус</TableCell>
                      <TableCell>Создан</TableCell>
                      <TableCell align="right">Действия</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((r) => (
                      <TableRow key={r.id} hover>
                        <TableCell>{r.id}</TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>{r.bookingId}</TableCell>
                        <TableCell>{r.reviewerUsername ?? r.reviewerId}</TableCell>
                        <TableCell>
                          <Rating value={r.rating} readOnly size="small" />
                        </TableCell>
                        <TableCell sx={{ maxWidth: 360 }}>
                          <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                            {r.comment ?? ""}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>{moderationStatusLabel(r.status)}</TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {typeof r.createdAt === "number" ? dayjs(r.createdAt).format("DD.MM.YYYY HH:mm") : ""}
                        </TableCell>
                        <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                          <Button size="small" variant="contained" color="success" onClick={() => openDialog(r, "APPROVE")}>
                            Одобрить
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            sx={{ ml: 1 }}
                            onClick={() => openDialog(r, "REJECT")}
                          >
                            Отклонить
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {totalPages > 1 && (
                <Stack direction="row" justifyContent="center">
                  <Pagination
                    color="primary"
                    page={page}
                    count={totalPages}
                    onChange={(_, next) => setPage(next)}
                    disabled={isFetching}
                  />
                </Stack>
              )}

              <Button variant="text" onClick={() => refetch()} disabled={isFetching}>
                Перезагрузить список
              </Button>
            </Stack>
          </Container>
        </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={() => !moderateMutation.isPending && setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{decision === "APPROVE" ? "Одобрить отзыв" : "Отклонить отзыв"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {selected && (
              <Typography variant="body2" color="text.secondary">
                Отзыв #{selected.id}, booking {selected.bookingId}
              </Typography>
            )}
            <TextField
              label="Комментарий модератора"
              value={moderatorComment}
              onChange={(e) => setModeratorComment(e.target.value)}
              multiline
              minRows={3}
              fullWidth
              required={decision === "REJECT"}
              helperText={decision === "REJECT" ? "Обязательно для отклонения" : "Необязательно для одобрения"}
              disabled={moderateMutation.isPending}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} disabled={moderateMutation.isPending}>
            Отмена
          </Button>
          <Button variant="contained" onClick={handleModerate} disabled={moderateMutation.isPending}>
            Применить
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
      <ToggleCustomTheme showCustomTheme={showCustomTheme} toggleCustomTheme={toggleCustomTheme} />
    </ThemeProvider>
  );
}
