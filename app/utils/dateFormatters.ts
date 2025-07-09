export function parseDateTime(raw: string): Date {
  return new Date(raw);
}

export  function formatDateLabel(raw: string) {
  const d = parseDateTime(raw);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

export function formatTimeLabel(raw: string) {
  const d = parseDateTime(raw);
  return d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}