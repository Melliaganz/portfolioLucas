import { lazy, Suspense } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./page/Hero";
import { Footer } from "./components/Footer";

const Parcours = lazy(() =>
  import("./page/Parcours").then((module) => ({ default: module.Parcours }))
);
const Projects = lazy(() =>
  import("./page/Projects").then((module) => ({ default: module.Projects }))
);
const Contact = lazy(() =>
  import("./page/Contact").then((module) => ({ default: module.Contact }))
);

function App() {
  return (
    <main>
      <Header />
      <Hero />
      <Suspense fallback={<div />}>
        <Parcours />
        <Projects />
        <Contact />
      </Suspense>

      <Footer />
    </main>
  );
}

export default App;
