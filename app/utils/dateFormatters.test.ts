import { describe, expect, it, vi } from "vitest";
import { formatDateLabel, formatTimeLabel, parseDateTime } from "./dateFormatters";

describe("dateFormatters", () => {
  it("parseDateTime returns a Date", () => {
    const d = parseDateTime("2026-04-21T12:34:56.000Z");
    expect(d).toBeInstanceOf(Date);
    expect(Number.isNaN(d.getTime())).toBe(false);
  });

  it("formatDateLabel uses the locale APIs", () => {
    const spy = vi.spyOn(Date.prototype, "toLocaleDateString");
    const out = formatDateLabel("2026-04-21T12:34:56.000Z");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(typeof out).toBe("string");
    spy.mockRestore();
  });

  it("formatTimeLabel uses 24h format options", () => {
    const spy = vi.spyOn(Date.prototype, "toLocaleTimeString");
    formatTimeLabel("2026-04-21T12:34:56.000Z");
    expect(spy).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({ hour12: false }),
    );
    spy.mockRestore();
  });
});

