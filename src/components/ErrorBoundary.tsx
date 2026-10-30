import { Component, type ErrorInfo, type ReactNode } from "react";
import styles from "../styles/ErrorBoundary.module.css";
import { useLang } from "../i18n/LanguageContext";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// Composant fonction séparé : une classe ne peut pas appeler useLang.
const ErrorFallback = () => {
  const { t } = useLang();
  return (
    <div className={styles.fallback} role="alert">
      <h2 className={styles.title}>{t.errorBoundary.title}</h2>
      <p className={styles.text}>{t.errorBoundary.text}</p>
      <button
        type="button"
        className={styles.button}
        onClick={() => window.location.reload()}
      >
        {t.errorBoundary.reload}
      </button>
    </div>
  );
};

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
    return this.state.hasError ? <ErrorFallback /> : this.props.children;
  }
}
