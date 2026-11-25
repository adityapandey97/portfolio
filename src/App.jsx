import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import ProblemSolving from "./components/ProblemSolving";
import Skills from "./components/Skills";
import Background from "./components/Background";
import ContactFooter from "./components/ContactFooter";

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio_theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("portfolio_theme", next);
      return next;
    });
  };

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Projects />
        <ProblemSolving />
        <Skills />
        <Background />
      </main>
      <ContactFooter />
    </>
  );
}
