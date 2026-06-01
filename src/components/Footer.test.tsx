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
      { title: "Github", href: "https://github.com/Melliaganz" },
      { title: "Discord", href: "https://discord.gg/7q5KAbqfdu" },
      { title: "Email", href: "mailto:lucaslengranddev@gmail.com" },
      { title: "Twitter", href: "https://x.com/LucasLengrand2" },
      { title: "LinkedIn", href: "https://www.linkedin.com/in/lucaslengrand" },
      { title: "Instagram", href: "https://www.instagram.com/melliaganz/" },
    ];

    links.forEach((link) => {
      const anchor = screen.getByTitle(link.title);
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute("href", link.href);
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
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
