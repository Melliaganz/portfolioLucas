import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
import { Hero } from "./Hero";

expect.extend(matchers);

// Mock du composant TechStack pour isoler le test du Hero
vi.mock("../components/TechStack", () => ({
  TechStack: () => <div data-testid="tech-stack-mock">TechStack</div>
}));

// Mock des données techNames pour avoir un résultat prévisible sur le useMemo
vi.mock("../utils/techData", () => ({
  techNames: ["React", "TypeScript", "Node", "Next", "Vite", "Vitest", "Docker"]
}));

describe("Hero Component", () => {
  it("doit afficher le titre principal et la description", () => {
    render(<Hero />);
    
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Développeur/i);
    expect(screen.getByText(/Expert en écosystème JavaScript/i)).toBeInTheDocument();
    expect(screen.getByText(/Disponible en freelance/i)).toBeInTheDocument();
  });

  it("doit afficher les informations dans l'éditeur de code (logique useMemo)", () => {
    render(<Hero />);
    
    // Vérifie que ton nom est présent dans la partie "code"
    expect(screen.getByText(/'Lengrand Lucas'/i)).toBeInTheDocument();
    
    // Vérifie que les 6 premières skills sont affichées (logique du slice(0, 6))
    // Le texte attendu formaté par ton useMemo
    const expectedSkills = "'React', 'TypeScript', 'Node', 'Next', 'Vite', 'Vitest'";
    expect(screen.getByText(expectedSkills)).toBeInTheDocument();
  });

  it("doit rendre les boutons d'appel à l'action avec les bonnes ancres", () => {
    render(<Hero />);
    
    const projectsBtn = screen.getByRole("link", { name: /voir mes projets/i });
    const contactBtn = screen.getByRole("link", { name: /me contacter/i });

    expect(projectsBtn).toHaveAttribute("href", "#projects");
    expect(contactBtn).toHaveAttribute("href", "#contact");
  });

  it("doit afficher l'image de profil avec les attributs de performance", () => {
    render(<Hero />);
    
    const img = screen.getByAltText("Lucas Lengrand");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("fetchpriority", "high");
    expect(img).toHaveAttribute("src", "/lucasTravail.webp");
  });

  it("doit inclure le composant TechStack", () => {
    render(<Hero />);
    expect(screen.getByTestId("tech-stack-mock")).toBeInTheDocument();
  });
});
