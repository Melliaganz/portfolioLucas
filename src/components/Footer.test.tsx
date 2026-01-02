import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { Footer } from "./Footer";

describe("Footer Component", () => {
  beforeEach(() => {
    vi.stubGlobal("__APP_YEAR__", "2026");
  });

  it("doit afficher tous les liens sociaux avec les bons attributs", () => {
    render(<Footer />);

    const links = [
      { title: "Mon github", href: "https://github.com/Melliaganz" },
      { title: "Mon discord", href: "https://discord.gg/YJhEmGKK" },
      { title: "Mon mail", href: "mailto:lucaslengranddev@gmail.com" },
      { title: "Mon X", href: "https://x.com/LucasLengrand2" },
      { title: "Mon linkedIn", href: "https://www.linkedin.com/in/lucaslengrand" },
      { title: "Mon instagram", href: "https://www.instagram.com/melliaganz/" },
    ];

    links.forEach((link) => {
      const anchor = screen.getByTitle(link.title);
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute("href", link.href);
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor).toHaveAttribute("rel", "noopener");
    });
  });

  it("doit afficher le copyright avec l'année correcte", () => {
    render(<Footer />);
    
    const copyrightText = screen.getByText(/© 2026 Lengrand Lucas. Tous droits réservés./i);
    expect(copyrightText).toBeInTheDocument();
  });

  it("doit contenir le nombre exact de liens sociaux", () => {
    render(<Footer />);
    const socialLinks = screen.getAllByRole("link");
    expect(socialLinks).toHaveLength(6);
  });
});
