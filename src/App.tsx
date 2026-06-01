import { useState, useEffect, useRef } from "react";
import { Suspense, lazy } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./page/Hero";
import { detectOs } from "./utils/smartLink";

const Parcours = lazy(() =>
  import("./page/Parcours").then((module) => ({ default: module.Parcours }))
);
const Projects = lazy(() =>
  import("./page/Projects").then((module) => ({ default: module.Projects }))
);
const Contact = lazy(() =>
  import("./page/Contact").then((module) => ({ default: module.Contact }))
);
const Footer = lazy(() =>
  import("./components/Footer").then((module) => ({ default: module.Footer }))
);

const AppDownloadPopup = () => {
  const [[os, initiallyVisible]] = useState<["android" | "ios" | "other", boolean]>(() => {
    const detectedOs = detectOs();
    return [detectedOs, !localStorage.getItem("hasSeenAppPopup") && detectedOs !== "other"];
  });
  const [isVisible, setIsVisible] = useState(initiallyVisible);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem("hasSeenAppPopup", "true");
  };

  const handleDownload = () => {
    if (os === "android") {
      window.location.href =
        "https://github.com/Melliaganz/portfolioLucasMobile/releases/latest/download/PortfolioLucas.apk";
    } else {
      alert("La version iOS sera bientôt disponible sur l'App Store.");
    }
    closePopup();
  };

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isVisible) return;
    closeButtonRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopup();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <div className="popup-card">
        <div className="popup-emoji" aria-hidden="true">{os === "android" ? "🤖" : "🍎"}</div>
        <h2 id="popup-title" className="popup-title">
          {os === "android"
            ? "Version Android disponible"
            : "Application Mobile"}
        </h2>
        <p className="popup-description">
          {os === "android"
            ? "Téléchargez l'APK pour profiter d'une expérience fluide et native sur votre smartphone."
            : "Mon application arrive bientôt sur iOS. En attendant, continuez la visite sur le web !"}
        </p>

        {os === "android" && (
          <button type="button" className="popup-download-btn" onClick={handleDownload}>
            Télécharger l'APK
          </button>
        )}

        <button type="button" ref={closeButtonRef} className="popup-close-btn" onClick={closePopup}>
          Continuer sur le navigateur
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

      <Suspense fallback={null}>
        <Parcours />
        <Projects />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  );
}

export default App;
