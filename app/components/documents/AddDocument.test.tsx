import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import dayjs from "dayjs";
import AddDocument from "./AddDocument";

vi.mock("@/app/services/DocumentsService", () => ({
  default: {
    createDocument: vi.fn(),
    uploadDocumentFiles: vi.fn(),
  },
}));

import DocumentsService from "@/app/services/DocumentsService";

describe("AddDocument", () => {
  it("creates document and uploads files", async () => {
    vi.mocked(DocumentsService.createDocument).mockResolvedValueOnce({
      id: "doc-1",
      type: "PASSPORT",
      description: "Test doc",
      expirationDate: dayjs(),
      status: "NEW",
    });
    vi.mocked(DocumentsService.uploadDocumentFiles).mockResolvedValueOnce(["f1"]);

    const onCreated = vi.fn();
    render(<AddDocument onCreated={onCreated} />);

    fireEvent.click(screen.getByRole("button", { name: /добавить новый документ/i }));
    fireEvent.change(screen.getByLabelText(/описание документа/i), {
      target: { value: "Test doc" },
    });

    const file = new File(["hello"], "hello.txt", { type: "text/plain" });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByRole("button", { name: /^добавить документ$/i }));

    await waitFor(() => {
      expect(DocumentsService.createDocument).toHaveBeenCalledTimes(1);
      expect(DocumentsService.uploadDocumentFiles).toHaveBeenCalledWith("doc-1", [file]);
      expect(onCreated).toHaveBeenCalledTimes(1);
    });
  });
});

