import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { CaseStudy } from "./CaseStudy";

describe("CaseStudy Component", () => {
  it("doit afficher le titre et les blocs clés", () => {
    render(<CaseStudy />);
    expect(
      screen.getByRole("heading", { name: /Impots\.gouv/i })
    ).toBeInTheDocument();
    ["Contexte", "Mon rôle", "Défis", "Impact"].forEach((t) => {
      expect(screen.getByText(t)).toBeInTheDocument();
    });
  });

  it("doit proposer un lien vers l'application", () => {
    render(<CaseStudy />);
    expect(
      screen.getByRole("link", { name: /Voir l'application/i })
    ).toBeInTheDocument();
  });
});
