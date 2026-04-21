import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignIn from "./SignIn";

const replaceMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
    push: vi.fn(),
  }),
}));

vi.mock("@/app/services/UserAuthService", () => ({
  useLoginService: () => () => Promise.resolve({ status: 200, data: "OK" }),
}));

describe("SignIn", () => {
  it("redirects to next after successful login", async () => {
    render(<SignIn next="/dialogs/abc" />);

    fireEvent.change(screen.getByLabelText(/электронная почта/i), {
      target: { value: "a@b.com" },
    });
    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /войти/i }));

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/dialogs/abc");
    });
  });
});

