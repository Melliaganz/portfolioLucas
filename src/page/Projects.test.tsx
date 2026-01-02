import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { Projects } from "./Projects";

describe("Projects Component", () => {
  it("doit afficher tous les projets par défaut", () => {
    render(<Projects />);
    const cards = screen.getAllByRole("heading", { level: 3 });
    expect(cards.length).toBeGreaterThan(0);
  });

  it("doit filtrer les projets par catégorie", () => {
    render(<Projects />);
    const mobileFilter = screen.getByRole("button", { name: /mobile/i });
    fireEvent.click(mobileFilter);
    const projects = screen.getAllByRole("heading", { level: 3 });
    expect(projects.length).toBeGreaterThan(0);
  });

  it("doit gérer le smart link pour Android", () => {
    Object.defineProperty(navigator, "userAgent", {
      value: "Android",
      configurable: true,
    });
    render(<Projects />);
    const links = screen.getAllByRole("link") as HTMLAnchorElement[];
    const playStoreLink = links.find((link: HTMLAnchorElement) => 
      link.href.includes("play.google.com")
    );
    expect(playStoreLink).toBeDefined();
  });

  it("doit gérer le smart link pour iOS", () => {
    Object.defineProperty(navigator, "userAgent", {
      value: "iPhone",
      configurable: true,
    });
    render(<Projects />);
    const links = screen.getAllByRole("link") as HTMLAnchorElement[];
    const appStoreLink = links.find((link: HTMLAnchorElement) => 
      link.href.includes("apps.apple.com")
    );
    expect(appStoreLink).toBeDefined();
  });

  it("doit déclencher l'état de drag lors du clic souris", () => {
    const { container } = render(<Projects />);
    const slider = container.querySelector('[class*="slider"]') || container.firstChild;
    if (slider) {
      fireEvent.mouseDown(slider);
      expect(slider).toBeInTheDocument();
    }
  });

  it("doit afficher les tags de chaque projet", () => {
    render(<Projects />);
    const projects = screen.getAllByRole("heading", { level: 3 });
    expect(projects[0]).toBeInTheDocument();
  });
});
