import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { Contact } from "./Contact";

const fillForm = () => {
  fireEvent.change(screen.getByPlaceholderText("John Doe"), { target: { value: "Lucas" } });
  fireEvent.change(screen.getByPlaceholderText("john@example.com"), { target: { value: "test@test.com" } });
  fireEvent.change(screen.getByPlaceholderText("Décrivez votre projet..."), { target: { value: "Bonjour" } });
};

describe("Contact Component", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    vi.stubEnv("VITE_API_FORM", "test-key");
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("doit afficher correctement les informations de contact et le formulaire", () => {
    render(<Contact />);
    expect(screen.getByText("Travaillons ensemble")).toBeInTheDocument();
  });

  it("doit soumettre le formulaire avec succès", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    } as Response);
    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText("John Doe"), { target: { value: "Lucas" } });
    fireEvent.change(screen.getByPlaceholderText("john@example.com"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("Décrivez votre projet..."), { target: { value: "Bonjour" } });

    fireEvent.click(screen.getByRole("button", { name: /envoyer/i }));

    expect(await screen.findByText("Envoyé !")).toBeInTheDocument();
  });

  it("doit gérer une erreur de l'API", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: false }),
    } as Response);
    render(<Contact />);
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: /envoyer/i }));
    expect(await screen.findByText(/L'envoi a échoué/)).toHaveAttribute("role", "status");
    expect(screen.getByText("Envoyer")).toBeInTheDocument();
  });

  it("doit garder l'erreur affichée jusqu'au prochain envoi", async () => {
    vi.useFakeTimers();
    vi.mocked(fetch).mockRejectedValue(new Error("network"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(<Contact />);
    fillForm();

    fireEvent.click(screen.getByRole("button", { name: /envoyer/i }));
    await act(async () => {});
    expect(screen.getByRole("status")).toHaveTextContent(/L'envoi a échoué/);

    // Pas de retour automatique à l'état initial.
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    expect(screen.getByRole("status")).toHaveTextContent(/L'envoi a échoué/);

    // Un nouvel envoi efface l'erreur.
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    } as Response);
    fireEvent.click(screen.getByRole("button", { name: /envoyer/i }));
    await act(async () => {});
    expect(screen.getByRole("status")).toHaveTextContent("Merci ! Votre message a bien été envoyé.");

    vi.useRealTimers();
  });

  it("doit valider les champs requis", () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText("John Doe")).toBeRequired();
  });

  it("doit réinitialiser l'état après un certain temps en cas de succès", async () => {
    vi.useFakeTimers();
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    } as Response);

    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText("John Doe"), { target: { value: "Lucas" } });
    fireEvent.change(screen.getByPlaceholderText("john@example.com"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("Décrivez votre projet..."), { target: { value: "Bonjour" } });

    fireEvent.click(screen.getByRole("button", { name: /envoyer/i }));

    await act(async () => {});
    expect(screen.getByText("Envoyé !")).toBeInTheDocument();

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(screen.getByText("Envoyer")).toBeInTheDocument();

    vi.useRealTimers();
  });
});
