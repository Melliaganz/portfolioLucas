import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { ErrorBoundary } from "./ErrorBoundary";
import { LanguageProvider } from "../i18n/LanguageContext";

const Boom = () => {
  throw new Error("boom");
};

describe("ErrorBoundary Component", () => {
  it("doit afficher le message de secours dans la langue choisie", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    localStorage.setItem("lang", "en");

    render(
      <LanguageProvider>
        <ErrorBoundary>
          <Boom />
        </ErrorBoundary>
      </LanguageProvider>
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
    expect(screen.getByRole("button", { name: "Reload the page" })).toBeInTheDocument();

    localStorage.removeItem("lang");
    vi.restoreAllMocks();
  });
});
