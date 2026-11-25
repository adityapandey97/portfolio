import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { PROFILE } from "../data/portfolioData";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#problem-solving", label: "Problem Solving" },
  { href: "#skills", label: "Skills" },
  { href: "#background", label: "Background" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="brand-link">
          <span className="brand-dot" aria-hidden="true" />
          <span>{PROFILE.name}</span>
        </a>

        <nav className="nav-list" aria-label="Main navigation">
          {LINKS.map((item) => (
            <a key={item.href} href={item.href} className="nav-item">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            type="button"
            className="icon-btn mobile-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div className={`mobile-drawer ${open ? "open" : ""}`}>
        {LINKS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="nav-item"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}
