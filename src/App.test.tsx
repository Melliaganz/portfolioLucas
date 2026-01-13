import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
import App from "./App";

expect.extend(matchers);

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

vi.stubGlobal("localStorage", localStorageMock);

describe("App Component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.stubGlobal("location", { href: "" });
  });

  it("doit rendre le conteneur principal et les composants de base", () => {
    render(<App />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("doit afficher la popup Android avec le bon contenu", () => {
    vi.stubGlobal("navigator", {
      userAgent: "mozilla/5.0 android 11",
    });

    render(<App />);

    expect(screen.getByText(/Version Android disponible/i)).toBeInTheDocument();
    expect(screen.getByText("🤖")).toBeInTheDocument();
    expect(screen.getByText(/Télécharger l'APK/i)).toBeInTheDocument();
  });

  it("doit afficher la popup iOS sans bouton de téléchargement", () => {
    vi.stubGlobal("navigator", {
      userAgent: "mozilla/5.0 iphone cpu os 15",
    });

    render(<App />);

    expect(screen.getByText(/Application Mobile/i)).toBeInTheDocument();
    expect(screen.getByText("🍎")).toBeInTheDocument();
    expect(screen.queryByText(/Télécharger l'APK/i)).not.toBeInTheDocument();
  });

  it("doit enregistrer le choix dans le localStorage et fermer la popup", () => {
    vi.stubGlobal("navigator", {
      userAgent: "android",
    });

    render(<App />);

    const closeBtn = screen.getByText(/Continuer sur le navigateur/i);
    fireEvent.click(closeBtn);

    expect(
      screen.queryByText(/Version Android disponible/i)
    ).not.toBeInTheDocument();
    expect(localStorage.getItem("hasSeenAppPopup")).toBe("true");
  });

  it("doit rediriger vers l'APK lors du clic sur télécharger (Android)", () => {
    vi.stubGlobal("navigator", {
      userAgent: "android",
    });

    const locationMock = { href: "" };
    vi.stubGlobal("location", locationMock);

    render(<App />);

    const downloadBtn = screen.getByText(/Télécharger l'APK/i);
    fireEvent.click(downloadBtn);

    expect(locationMock.href).toContain("PortfolioLucas.apk");
    expect(localStorage.getItem("hasSeenAppPopup")).toBe("true");
  });

  it("ne doit pas afficher la popup si l'utilisateur l'a déjà vue", () => {
    localStorage.setItem("hasSeenAppPopup", "true");
    vi.stubGlobal("navigator", {
      userAgent: "android",
    });

    render(<App />);

    expect(
      screen.queryByText(/Version Android disponible/i)
    ).not.toBeInTheDocument();
  });
});
