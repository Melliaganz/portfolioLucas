import React, { useState, useEffect } from "react";
import { Suspense, lazy } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./page/Hero";

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
  const [isVisible, setIsVisible] = useState(false);
  const [os, setOs] = useState<"android" | "ios" | "other">("other");

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = /android/.test(ua);
    const isIOS = /iphone|ipad|ipod/.test(ua);

    if (isAndroid) setOs("android");
    else if (isIOS) setOs("ios");

    const hasSeenPopup = localStorage.getItem("hasSeenAppPopup");

    if (!hasSeenPopup && (isAndroid || isIOS)) {
      setIsVisible(true);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem("hasSeenAppPopup", "true");
  };

  const handleDownload = () => {
    if (os === "android") {
      window.location.href =
        "https://github.com/Melliaganz/portfolioLucasMobile/releases/download/V1.0.0/PortfolioLucas.apk";
    } else {
      alert("La version iOS sera bientôt disponible sur l'App Store.");
    }
    closePopup();
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <div className="popup-emoji">{os === "android" ? "🤖" : "🍎"}</div>
        <h2 className="popup-title">
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
          <button className="popup-download-btn" onClick={handleDownload}>
            Télécharger l'APK
          </button>
        )}

        <button className="popup-close-btn" onClick={closePopup}>
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
