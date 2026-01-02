import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
import { Parcours } from "./Parcours";

expect.extend(matchers);

// Correction : Utilisation d'une classe pour le mock ResizeObserver
// Cela permet d'utiliser le mot-clé 'new' sans erreur
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

window.ResizeObserver = MockResizeObserver as any;

// Mock des données
vi.mock("../data/parcours", () => ({
  experiences: [
    {
      id: "1",
      date: "2023 - Présent",
      title: "Développeur Fullstack",
      company: "Ma Super Entreprise",
      location: "Paris",
      intro: "Une intro passionnante",
      description: ["Mission A", "Mission B"],
      isList: true,
      isActive: true,
      icon: "work",
      companyUrl: "https://test.com"
    }
  ]
}));

describe("Parcours Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("doit afficher les informations de base de l'expérience", () => {
    render(<Parcours />);
    
    expect(screen.getByText(/Mon Parcours/i)).toBeInTheDocument();
    expect(screen.getByText(/Développeur Fullstack/i)).toBeInTheDocument();
    expect(screen.getByText(/Ma Super Entreprise/i)).toBeInTheDocument();
  });

  it("doit afficher la liste des missions", () => {
    render(<Parcours />);
    
    expect(screen.getByText("Mission A")).toBeInTheDocument();
    expect(screen.getByText("Mission B")).toBeInTheDocument();
  });

  it("doit avoir un lien externe vers l'entreprise", () => {
    render(<Parcours />);
    
    const link = screen.getByRole("link", { name: /Ma Super Entreprise/i });
    expect(link).toHaveAttribute("href", "https://test.com");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("ne doit pas afficher le bouton 'Voir plus' par défaut", () => {
    render(<Parcours />);
    expect(screen.queryByText(/Voir plus/i)).not.toBeInTheDocument();
  });
});
