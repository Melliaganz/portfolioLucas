import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { Hero } from "./page/Hero";
import { Parcours } from "./page/Parcours";
import { Projects } from "./page/Projects";
import { Contact } from "./page/Contact";

function App() {
  return (
    <main>
      <Header />
      <Hero />
      <Parcours />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
