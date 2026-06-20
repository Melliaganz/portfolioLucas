import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { MobileApp } from "./MobileApp";

describe("MobileApp Component", () => {
  it("doit proposer le téléchargement de l'APK", () => {
    render(<MobileApp />);
    const link = screen.getByRole("link", { name: /Télécharger l'APK/i });
    expect(link).toHaveAttribute("href", expect.stringContaining(".apk"));
    expect(link).toHaveAttribute("download");
  });

  it("doit générer un QR code", () => {
    const { container } = render(<MobileApp />);
    // qrcode.react rend un <svg> ; on vérifie sa présence.
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
