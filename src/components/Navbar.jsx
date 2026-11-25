import { useEffect, useRef, useState } from "react";
import { PORTFOLIO_CONFIG, SEARCHABLE_INDEX } from "../data/portfolioData";
import Icon from "./Icon";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#analytics", label: "Analytics" },
  { href: "#activity", label: "Activity" },
  { href: "#github", label: "GitHub" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Credentials" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({
  theme,
  onToggleTheme,
  onOpenPalette,
  onCopyEmail,
}) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const searchWrapRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + 120;
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");
        if (id && scrollY >= top && scrollY < top + height) {
          setActiveSection(id);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDocClick = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setSearchVisible(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const trimmed = searchQuery.trim().toLowerCase();
  const searchMatches =
    trimmed.length >= 2
      ? SEARCHABLE_INDEX.filter(
          (item) =>
            item.title.toLowerCase().includes(trimmed) ||
            item.desc.toLowerCase().includes(trimmed) ||
            item.type.toLowerCase().includes(trimmed)
        )
      : [];

  return (
    <header className="navbar" id="navbar">
      <div className="container nav-container">
        <a href="#home" className="nav-brand" aria-label="Aditya Pandey Home">
          <div className="brand-badge">{PORTFOLIO_CONFIG.personal.shortName}</div>
          <div className="brand-info">
            <span className="brand-name">{PORTFOLIO_CONFIG.personal.name}</span>
            <span className="brand-status">{PORTFOLIO_CONFIG.personal.brandStatus}</span>
          </div>
        </a>

        <nav className="nav-links" aria-label="Main Navigation">
          {NAV_LINKS.map((item) => {
            const id = item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link ${activeSection === id ? "active" : ""}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="nav-actions">
          <div className="search-container" ref={searchWrapRef}>
            <div className="search-input-wrap">
              <Icon name="search" />
              <input
                type="text"
                className="global-search-input"
                placeholder="Search portfolio..."
                aria-label="Search skills, projects, achievements"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchVisible(e.target.value.trim().length >= 2);
                }}
                onFocus={() => {
                  if (trimmed.length >= 2) setSearchVisible(true);
                }}
              />
            </div>

            {searchVisible && trimmed.length >= 2 && (
              <div className="search-results-popup visible">
                {searchMatches.length === 0 ? (
                  <div className="search-empty" style={{ padding: "12px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    No results found for &ldquo;{searchQuery}&rdquo;
                  </div>
                ) : (
                  searchMatches.map((m, idx) => (
                    <a
                      key={`${m.title}-${idx}`}
                      href={m.link}
                      className="search-item"
                      onClick={() => setSearchVisible(false)}
                    >
                      <span className="search-badge">{m.type}</span>
                      <div className="search-info">
                        <span className="search-title">{m.title}</span>
                        <span className="search-desc">{m.desc}</span>
                      </div>
                    </a>
                  ))
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            className="nav-cmd-btn"
            onClick={onOpenPalette}
            title="Command Palette (Ctrl + K)"
            aria-label="Open Command Palette"
          >
            <span>Menu</span>
            <span className="kbd">Ctrl K</span>
          </button>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title="Toggle Theme"
            aria-label="Toggle Dark and Light theme"
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} className="theme-toggle-icon" />
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            aria-label="Toggle Mobile Navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <Icon name={mobileOpen ? "x" : "menu"} />
          </button>
        </div>
      </div>

      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        {NAV_LINKS.map((item, idx) => (
          <a
            key={item.href}
            href={item.href}
            className="mobile-nav-link"
            onClick={() => setMobileOpen(false)}
          >
            {String(idx + 1).padStart(2, "0")}. {item.label}
          </a>
        ))}
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <a
            href={PORTFOLIO_CONFIG.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
            style={{ flex: 1 }}
          >
            <Icon name="file-down" size={16} /> Resume
          </a>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onCopyEmail}
            style={{ flex: 1 }}
          >
            <Icon name="copy" size={16} /> Copy Email
          </button>
        </div>
      </div>
    </header>
  );
}
