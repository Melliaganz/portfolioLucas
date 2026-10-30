import { Suspense, lazy } from "react";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "./components/Header";
import { Hero } from "./page/Hero";
import { ErrorBoundary } from "./components/ErrorBoundary";

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

// Header et Footer hors de <main> : ils gardent leurs rôles de repère
// « banner » et « contentinfo » pour les lecteurs d'écran.
function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <ErrorBoundary>
          <Suspense fallback={null}>
            <Parcours />
            <Projects />
            <CaseStudy />
            <Quality />
            <MobileApp />
            <Contact />
          </Suspense>
        </ErrorBoundary>
      </main>
      {/* Boundary séparée : le footer est hors de <main>. Il se trouve sous le
          Hero (min-height: 100vh), donc hors écran s'il charge avant les
          sections. */}
      <ErrorBoundary>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
      <Analytics />
    </>
  );
}

export default App;
