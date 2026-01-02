import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { Contact } from "./Contact";

describe("Contact Component", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it("doit afficher correctement les informations de contact et le formulaire", () => {
    render(<Contact />);
    expect(screen.getByText("Travaillons ensemble")).toBeInTheDocument();
  });

  it("doit soumettre le formulaire avec succès", async () => {
    (fetch as any).mockResolvedValue({
      json: () => Promise.resolve({ success: true }),
    });
    render(<Contact />);
    
    fireEvent.change(screen.getByPlaceholderText("John Doe"), { target: { value: "Lucas" } });
    fireEvent.change(screen.getByPlaceholderText("john@example.com"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("Décrivez votre projet..."), { target: { value: "Bonjour" } });
    
    fireEvent.click(screen.getByRole("button", { name: /envoyer/i }));
    
    await waitFor(() => expect(screen.getByText("Envoyé !")).toBeInTheDocument());
  });

  it("doit gérer une erreur de l'API", async () => {
    (fetch as any).mockResolvedValue({
      json: () => Promise.resolve({ success: false }),
    });
    render(<Contact />);
    fireEvent.click(screen.getByRole("button", { name: /envoyer/i }));
    await waitFor(() => expect(screen.getByText("Envoyer")).toBeInTheDocument());
  });

  it("doit valider les champs requis", () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText("John Doe")).toBeRequired();
  });

  it("doit réinitialiser l'état après un certain temps en cas de succès", async () => {
    vi.useFakeTimers();
    (fetch as any).mockResolvedValue({
      json: () => Promise.resolve({ success: true }),
    });

    render(<Contact />);
    
    fireEvent.change(screen.getByPlaceholderText("John Doe"), { target: { value: "Lucas" } });
    fireEvent.change(screen.getByPlaceholderText("john@example.com"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("Décrivez votre projet..."), { target: { value: "Bonjour" } });
    
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /envoyer/i }));
    });

    // runAllTimersAsync va vider la file des micro-tâches (le fetch) 
    // PUIS déclencher les macro-tâches (le setTimeout de 5s)
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    // On vérifie que le bouton est revenu à son état initial "Envoyer"
    expect(screen.getByText("Envoyer")).toBeInTheDocument();

    vi.useRealTimers();
  });
});
