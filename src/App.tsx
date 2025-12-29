import { Suspense, lazy } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./page/Hero";

const Parcours = lazy(() => import("./page/Parcours").then(module => ({ default: module.Parcours })));
const Projects = lazy(() => import("./page/Projects").then(module => ({ default: module.Projects })));
const Contact = lazy(() => import("./page/Contact").then(module => ({ default: module.Contact })));
const Footer = lazy(() => import("./components/Footer").then(module => ({ default: module.Footer })));

function App() {
  return (
    <main>
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
