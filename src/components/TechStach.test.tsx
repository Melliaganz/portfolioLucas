import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { TechStack } from "./TechStack";

describe("TechStack Component", () => {
  let scrollLeftStore = 0;
  const originalScrollLeft = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollLeft');
  const originalOffsetLeft = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetLeft');

  beforeEach(() => {
    scrollLeftStore = 0;
    Object.defineProperty(HTMLElement.prototype, 'scrollLeft', {
      configurable: true,
      get: () => scrollLeftStore,
      set: (v) => { scrollLeftStore = v; }
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetLeft', {
      configurable: true,
      get: () => 0
    });
  });

  afterEach(() => {
    if (originalScrollLeft) {
      Object.defineProperty(HTMLElement.prototype, 'scrollLeft', originalScrollLeft);
    }
    if (originalOffsetLeft) {
      Object.defineProperty(HTMLElement.prototype, 'offsetLeft', originalOffsetLeft);
    }
  });

  it("doit mettre à jour le scrollLeft lors du mouvement de la souris (drag)", () => {
    const { container } = render(<TechStack />);
    const marquee = container.querySelector('[class*="marqueeContainer"]') as HTMLElement;

    if (!marquee) throw new Error("Marquee non trouvé");

    fireEvent.mouseDown(marquee, { pageX: 100, clientX: 100 });

    act(() => {
      fireEvent.mouseMove(marquee, { 
        pageX: 50, 
        clientX: 50,
        buttons: 1 
      });
    });

    expect(scrollLeftStore).toBe(75);
  });

  it("doit afficher le titre et le nombre de badges correct (24)", () => {
    render(<TechStack />);
    
    // Correction du titre ici pour correspondre au DOM reçu
    expect(screen.getByText(/Stack technique principale/i)).toBeInTheDocument();
    
    const badges = document.querySelectorAll('[class*="badge"]');
    expect(badges.length).toBe(24);
  });

  it("doit changer la classe CSS lors du drag", () => {
    const { container } = render(<TechStack />);
    const marquee = container.querySelector('[class*="marqueeContainer"]') as HTMLElement;

    expect(marquee.className).not.toMatch(/isDragging/);
    
    fireEvent.mouseDown(marquee, { pageX: 100 });
    expect(marquee.className).toMatch(/isDragging/);
    
    fireEvent.mouseUp(marquee);
    expect(marquee.className).not.toMatch(/isDragging/);
  });

  it("doit arrêter le drag quand la souris quitte le conteneur", () => {
    const { container } = render(<TechStack />);
    const marquee = container.querySelector('[class*="marqueeContainer"]') as HTMLElement;

    fireEvent.mouseDown(marquee, { pageX: 100 });
    expect(marquee.className).toMatch(/isDragging/);

    fireEvent.mouseLeave(marquee);
    expect(marquee.className).not.toMatch(/isDragging/);
  });
});
