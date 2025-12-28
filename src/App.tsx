import "./App.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Contact } from "./page/Contact";
import { Hero } from "./page/Hero";
import { Parcours } from "./page/Parcours";
import { Projects } from "./page/Projects";

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
