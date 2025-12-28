import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./page/Hero";

function App() {
  return (
    <main className="flex">
      <Header />
      <Hero />
    </main>
  );
}

export default App;
