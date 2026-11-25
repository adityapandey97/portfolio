import { useEffect, useMemo, useRef, useState } from "react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import Icon from "./Icon";

export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-container">
        <div className="modal-header">
          <div>
            <span className="project-badge">{project.badge}</span>
            <h2 className="modal-title" id="modal-project-title">
              {project.name}
            </h2>
            <p className="modal-subtitle">{project.tagline}</p>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close modal">
            <Icon name="x" size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h4>
              <Icon name="alert-circle" /> The Problem
            </h4>
            <p>{project.modal.problem}</p>
          </div>

          <div className="modal-section">
            <h4>
              <Icon name="check-circle-2" /> The Solution &amp; Implementation
            </h4>
            <p>{project.modal.solution}</p>
          </div>

          <div className="modal-section">
            <h4>
              <Icon name="layers" /> System Architecture
            </h4>
            <p>{project.modal.architecture}</p>
          </div>

          <div className="modal-section">
            <h4>
              <Icon name="sparkles" /> Key Engineering Features
            </h4>
            <ul className="modal-features-list">
              {project.modal.keyFeatures.map((feat, idx) => (
                <li key={idx}>
                  <Icon name="check" className="icon-check" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <h4>
              <Icon name="code-2" /> Technologies &amp; Tools
            </h4>
            <div className="project-tech-tags">
              {project.stack.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h4>
              <Icon name="user-check" /> Role &amp; Contribution
            </h4>
            <p>{project.modal.role}</p>
          </div>
        </div>

        <div className="modal-footer">
          <div className="modal-actions">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                <Icon name="external-link" size={15} /> Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <Icon name="github" size={15} /> GitHub Code
              </a>
            )}
          </div>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function CommandPalette({
  isOpen,
  onClose,
  onToggleTheme,
  onCopyEmail,
  onRefreshData,
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const commands = useMemo(
    () => [
      { id: "home", label: "Go to Home", icon: "home", section: "#home" },
      { id: "analytics", label: "CP & DSA Analytics (714+ Solved)", icon: "activity", section: "#analytics" },
      { id: "activity", label: "Recent Coding Activity", icon: "git-commit", section: "#activity" },
      { id: "github", label: "GitHub Repositories & Stats", icon: "github", section: "#github" },
      { id: "skills", label: "Technical Skills (GenAI, Docker, K8s, Redis, Core CS)", icon: "code", section: "#skills" },
      { id: "projects", label: "Projects: Jeevan Vani, Smart Shop, Worker Sathi, Glimpse", icon: "folder", section: "#projects" },
      { id: "experience", label: "Experience & Education", icon: "briefcase", section: "#experience" },
      { id: "certifications", label: "Certifications & Achievements", icon: "award", section: "#certifications" },
      { id: "about", label: "About Aditya Pandey", icon: "user", section: "#about" },
      { id: "contact", label: "Contact Aditya Pandey", icon: "mail", section: "#contact" },
      {
        id: "open-github",
        label: "Open GitHub Profile (@adityapandey97)",
        icon: "external-link",
        action: () => window.open(PORTFOLIO_CONFIG.urls.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "resume",
        label: "View Resume (PDF)",
        icon: "file-text",
        action: () => window.open(PORTFOLIO_CONFIG.personal.resumeUrl, "_blank", "noopener,noreferrer"),
      },
      { id: "theme", label: "Toggle Dark / Light Theme", icon: "sun", action: onToggleTheme },
      { id: "copy-email", label: "Copy Email Address", icon: "copy", action: onCopyEmail },
      { id: "refresh-data", label: "Refresh Live Coding Data", icon: "refresh-cw", action: onRefreshData },
    ],
    [onToggleTheme, onCopyEmail, onRefreshData]
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const execute = (cmd) => {
    onClose();
    if (cmd.action) {
      cmd.action();
    } else if (cmd.section) {
      document.querySelector(cmd.section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isOpen) return null;

  const safeIndex = filtered.length ? Math.min(selectedIndex, filtered.length - 1) : 0;

  return (
    <div
      className="command-palette-overlay active"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="palette-box">
        <div className="palette-input-wrap">
          <Icon name="search" className="palette-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="palette-input"
            placeholder="Type a command or jump to section..."
            autoComplete="off"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" && filtered.length) {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % filtered.length);
              } else if (e.key === "ArrowUp" && filtered.length) {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
              } else if (e.key === "Enter" && filtered[safeIndex]) {
                e.preventDefault();
                execute(filtered[safeIndex]);
              } else if (e.key === "Escape") {
                onClose();
              }
            }}
          />
          <span className="kbd">ESC</span>
        </div>

        <div className="palette-results">
          {filtered.length === 0 ? (
            <div className="palette-empty">No commands matching &ldquo;{query}&rdquo;</div>
          ) : (
            filtered.map((cmd, idx) => (
              <div
                key={cmd.id}
                className={`palette-item ${idx === safeIndex ? "selected" : ""}`}
                onClick={() => execute(cmd)}
              >
                <Icon name={cmd.icon} className="palette-icon" />
                <span className="palette-label">{cmd.label}</span>
                <span className="palette-hint">{cmd.section ? "Jump" : "Action"}</span>
              </div>
            ))
          )}
        </div>

        <div className="palette-footer">
          <span>
            Navigation: <span className="kbd">↑</span> <span className="kbd">↓</span> to navigate
          </span>
          <span>
            Select: <span className="kbd">ENTER</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function ToastContainer({ toasts = [] }) {
  return (
    <div id="toast-container" className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        const iconName =
          toast.type === "success"
            ? "check-circle"
            : toast.type === "error"
            ? "alert-triangle"
            : "info";
        return (
          <div key={toast.id} className={`toast toast-${toast.type} show`}>
            <Icon name={iconName} className="toast-icon" />
            <span className="toast-text">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}
