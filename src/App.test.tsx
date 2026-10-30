import { render, screen } from "@testing-library/react";
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
  it("ne doit plus afficher de popup d'application sur mobile", () => {
    vi.stubGlobal("navigator", { userAgent: "mozilla/5.0 android 11" });
    render(<App />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("doit garder le header et le footer hors de <main>", async () => {
    render(<App />);
    const main = screen.getByRole("main");
    expect(main).not.toContainElement(screen.getByRole("banner"));
    expect(main).not.toContainElement(await screen.findByRole("contentinfo"));
  });
});
