import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { Quality } from "./Quality";

describe("Quality Component", () => {
  it("doit afficher les quatre piliers", () => {
    render(<Quality />);
    ["Performance", "Sécurité", "Accessibilité", "Fiabilité"].forEach((t) => {
      expect(screen.getByText(t)).toBeInTheDocument();
    });
  });

  it("doit lier le code source du site", () => {
    render(<Quality />);
    const link = screen.getByRole("link", { name: /code source/i });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/Melliaganz/portfolioLucas"
    );
    expect(link).toHaveAttribute("target", "_blank");
  });
});
