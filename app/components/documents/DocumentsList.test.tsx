import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import dayjs from "dayjs";
import DocumentsList from "./DocumentsList";

vi.mock("@/app/services/DocumentsService", () => ({
  default: {
    getDocuments: vi.fn(),
  },
}));

import DocumentsService from "@/app/services/DocumentsService";

describe("DocumentsList", () => {
  it("renders empty state", async () => {
    vi.mocked(DocumentsService.getDocuments).mockResolvedValueOnce([]);

    render(<DocumentsList />);

    await waitFor(() => {
      expect(screen.getByText(/документов пока нет/i)).toBeInTheDocument();
    });
  });

  it("shows expiration date chip", async () => {
    vi.mocked(DocumentsService.getDocuments).mockResolvedValueOnce([
      {
        id: "1",
        type: "PASSPORT",
        description: "Паспорт РФ",
        expirationDate: dayjs("2030-01-02"),
        status: "NEW",
      },
    ]);

    render(<DocumentsList />);

    await waitFor(() => {
      expect(screen.getByText(/паспорт рф/i)).toBeInTheDocument();
      expect(screen.getByText(/до 02\.01\.2030/i)).toBeInTheDocument();
    });
  });
});

