import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Profile from "@/pages/profile";

vi.mock("@/app/components/AppAppBar", () => ({ default: () => <div data-testid="appbar" /> }));
vi.mock("@/app/components/Footer", () => ({ default: () => <div data-testid="footer" /> }));
vi.mock("@/app/customThemeService", () => ({
  ToggleCustomTheme: () => <div data-testid="toggle-theme" />,
}));
vi.mock("@/app/getLPTheme", () => ({ default: () => ({}) }));

vi.mock("@/app/components/ProfileEdit", () => ({ default: () => <div>PROFILE_EDIT</div> }));
vi.mock("@/app/components/documents/PersonDocuments", () => ({ default: () => <div>PERSON_DOCUMENTS</div> }));

describe("Profile page", () => {
  it("switches between tabs", () => {
    render(<Profile />);

    expect(screen.getByText("PROFILE_EDIT")).toBeInTheDocument();
    expect(screen.queryByText("PERSON_DOCUMENTS")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: /документы/i }));

    expect(screen.getByText("PERSON_DOCUMENTS")).toBeInTheDocument();
    expect(screen.queryByText("PROFILE_EDIT")).not.toBeInTheDocument();
  });
});

