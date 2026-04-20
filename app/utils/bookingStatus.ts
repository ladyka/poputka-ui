export const bookingStatusLabel: Record<string, string> = {
  WAITING: "Ожидает подтверждения",
  ACCEPTED: "Подтверждено",
  REJECTED: "Отклонено",
  CANCELLED: "Отменено",
  EXPIRED: "Истекло",
  NO_SHOW: "Неявка",
  CHECKED_IN: "Прибыл(а)",
  IN_PROGRESS: "В пути",
  COMPLETED: "Завершено",
};

export function getBookingStatusLabel(status: string): string {
  return bookingStatusLabel[status] ?? status;
}
