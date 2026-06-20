import { useState, useRef } from "react";
import { Suspense, lazy } from "react";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "./components/Header";
import { Hero } from "./page/Hero";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { detectOs } from "./utils/smartLink";
import { safeGetItem, safeSetItem } from "./utils/storage";
import { useFocusTrap } from "./utils/useFocusTrap";
import { useLang } from "./i18n/LanguageContext";

const Parcours = lazy(() =>
  import("./page/Parcours").then((module) => ({ default: module.Parcours }))
);
const Projects = lazy(() =>
  import("./page/Projects").then((module) => ({ default: module.Projects }))
);
const Quality = lazy(() =>
  import("./page/Quality").then((module) => ({ default: module.Quality }))
);
const CaseStudy = lazy(() =>
  import("./page/CaseStudy").then((module) => ({ default: module.CaseStudy }))
);
const MobileApp = lazy(() =>
  import("./page/MobileApp").then((module) => ({ default: module.MobileApp }))
);
const Contact = lazy(() =>
  import("./page/Contact").then((module) => ({ default: module.Contact }))
);
const Footer = lazy(() =>
  import("./components/Footer").then((module) => ({ default: module.Footer }))
);

const AppDownloadPopup = () => {
  const { t } = useLang();
  const [[os, initiallyVisible]] = useState<["android" | "ios" | "other", boolean]>(() => {
    const detectedOs = detectOs();
    return [detectedOs, !safeGetItem("hasSeenAppPopup") && detectedOs !== "other"];
  });
  const [isVisible, setIsVisible] = useState(initiallyVisible);

  const closePopup = () => {
    setIsVisible(false);
    safeSetItem("hasSeenAppPopup", "true");
  };

  // Le bouton de téléchargement ne s'affiche que pour Android, donc
  // handleDownload n'est appelé que dans ce contexte.
  const handleDownload = () => {
    window.location.href =
      "https://github.com/Melliaganz/portfolioLucasMobile/releases/latest/download/PortfolioLucas.apk";
    closePopup();
  };

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useFocusTrap({
    active: isVisible,
    onClose: closePopup,
    containerRef: cardRef,
    initialFocusRef: closeButtonRef,
  });

  if (!isVisible) return null;

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <div className="popup-card" ref={cardRef}>
        <div className="popup-emoji" aria-hidden="true">{os === "android" ? "🤖" : "🍎"}</div>
        <h2 id="popup-title" className="popup-title">
          {os === "android" ? t.popup.androidTitle : t.popup.iosTitle}
        </h2>
        <p className="popup-description">
          {os === "android" ? t.popup.androidDesc : t.popup.iosDesc}
        </p>

        {os === "android" && (
          <button type="button" className="popup-download-btn" onClick={handleDownload}>
            {t.popup.download}
          </button>
        )}

        <button type="button" ref={closeButtonRef} className="popup-close-btn" onClick={closePopup}>
          {t.popup.continue}
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <main>
      <AppDownloadPopup />
      <Header />
      <Hero />

      <ErrorBoundary>
        <Suspense fallback={null}>
          <Parcours />
          <Projects />
          <CaseStudy />
          <Quality />
          <MobileApp />
          <Contact />
          <Footer />
        </Suspense>
      </ErrorBoundary>
      <Analytics />
    </main>
  );
}

export default App;
