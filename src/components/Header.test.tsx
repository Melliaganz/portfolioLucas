import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
import { Header } from "./Header";

expect.extend(matchers);

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollY = 0;
    document.body.style.overflow = "unset";
  });

  it("doit afficher le nom et les liens de navigation", () => {
    render(<Header />);
    
    expect(screen.getByText(/Lengrand Lucas/i)).toBeInTheDocument();
    expect(screen.getByText(/À propos/i)).toBeInTheDocument();
    expect(screen.getByText(/Projets/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/CV/i)).toBeInTheDocument();
  });

  it("doit changer de style au scroll (isScrolled)", () => {
    render(<Header />);
    const header = screen.getByRole("banner");

    // Simuler un scroll > 20px
    window.scrollY = 50;
    fireEvent.scroll(window);

    // On vérifie la présence de la classe via l'objet styles importé (approximatif avec CSS Modules)
    // Dans les tests, les classes CSS Modules sont souvent préfixées ou transformées
    expect(header.className).toContain("scrolled");
  });

  it("doit ouvrir et fermer le menu burger sur mobile", () => {
    render(<Header />);
    
    const burgerBtn = screen.getByRole("button", { name: /ouvrir le menu/i });
    
    // Ouverture
    fireEvent.click(burgerBtn);
    expect(burgerBtn).toHaveAttribute("aria-expanded", "true");
    expect(document.body.style.overflow).toBe("hidden");

    // Fermeture via le même bouton
    fireEvent.click(burgerBtn);
    expect(burgerBtn).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.overflow).toBe("unset");
  });

  it("doit fermer le menu lorsqu'un lien est cliqué", () => {
    render(<Header />);
    
    const burgerBtn = screen.getByRole("button", { name: /ouvrir le menu/i });
    fireEvent.click(burgerBtn); // On ouvre d'abord
    
    const projectsLink = screen.getByText(/Projets/i);
    fireEvent.click(projectsLink);

    expect(burgerBtn).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.overflow).toBe("unset");
  });

  it("doit avoir les bons attributs pour le téléchargement du CV", () => {
    render(<Header />);
    
    const cvLink = screen.getByRole("link", { name: /CV/i });
    
    expect(cvLink).toHaveAttribute("download", "CV_Lengrand_Lucas.pdf");
    expect(cvLink).toHaveAttribute("target", "_blank");
    expect(cvLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
