import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { TechStack } from "./TechStack";
import { technologies } from "../utils/techData";

describe("TechStack Component", () => {
  it("doit afficher le titre et un badge par techno, sans doublon", () => {
    render(<TechStack />);

    expect(screen.getByText(/Stack technique principale/i)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(technologies.length);
  });

  it("doit garder le nom de chaque techno dans le DOM (lecteurs d'écran)", () => {
    render(<TechStack />);

    for (const tech of technologies) {
      expect(screen.getByText(tech.name)).toBeInTheDocument();
    }
  });
});
