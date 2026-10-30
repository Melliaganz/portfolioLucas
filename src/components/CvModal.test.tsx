import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { CvModal } from "./CvModal";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

describe("CvModal Component", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("doit intégrer le PDF dans une iframe sur ordinateur", () => {
    render(<CvModal onClose={() => {}} />);
    expect(screen.getByTitle("Aperçu du CV de Lucas Lengrand")).toBeInTheDocument();
  });

  it("doit proposer d'ouvrir le PDF sur un écran tactile, sans iframe", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query === "(pointer: coarse)",
      media: query,
    }));
    render(<CvModal onClose={() => {}} />);

    expect(screen.queryByTitle("Aperçu du CV de Lucas Lengrand")).not.toBeInTheDocument();
    expect(screen.getByText("L'aperçu n'est pas disponible sur cet appareil.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ouvrir le CV", hidden: true })).toHaveAttribute(
      "href",
      "/CVLengrandLucas.pdf"
    );
  });
});
