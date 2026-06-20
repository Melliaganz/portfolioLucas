import { Component, type ErrorInfo, type ReactNode } from "react";
import styles from "../styles/ErrorBoundary.module.css";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// Capture les erreurs de rendu et, surtout, les échecs de chargement des chunks
// lazy (fréquents après un redéploiement alors qu'un onglet reste ouvert).
// Évite l'écran blanc en proposant un rechargement de la page.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Erreur de rendu :", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className={styles.fallback} role="alert">
        <h2 className={styles.title}>Une erreur est survenue</h2>
        <p className={styles.text}>
          Le contenu n'a pas pu se charger. Cela arrive parfois après une mise à
          jour du site.
        </p>
        <button
          type="button"
          className={styles.button}
          onClick={() => window.location.reload()}
        >
          Recharger la page
        </button>
      </div>
    );
  }
}
