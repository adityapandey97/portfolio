import { useState } from "react";
import { PROJECTS_DATA } from "../data/portfolioData";
import Icon from "./Icon";

const PROJECT_TABS = [
  { key: "all", label: "All Projects (4)" },
  { key: "genai", label: "GenAI" },
  { key: "fullstack", label: "Full-Stack" },
  { key: "backend", label: "Backend & Platform" },
];

export default function ProjectsSection({ githubRepos = [], onSelectProject }) {
  const [filter, setFilter] = useState("all");

  const resolvedProjects = PROJECTS_DATA.map((project) => {
    if (!githubRepos.length || !project.repoKeywords) return project;
    const match = githubRepos.find((repo) => {
      const lower = (repo.name || "").toLowerCase();
      return project.repoKeywords.some((kw) => lower.includes(kw));
    });
    if (!match) return project;
    return {
      ...project,
      github: match.html_url || project.github,
      demo: project.demo || match.homepage || null,
    };
  });

  const filtered =
    filter === "all"
      ? resolvedProjects
      : resolvedProjects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">05. Featured Engineering Work</span>
          <h2 className="section-title">Featured Projects Showcase</h2>
          <p className="section-subtitle">
            End-to-end GenAI and full-stack software systems built for real-world users. Inspect
            system architecture or jump straight to GitHub.
          </p>
        </div>

        <div className="filter-tabs">
          {PROJECT_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`filter-btn ${filter === tab.key ? "active" : ""}`}
              onClick={() => setFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-card-header">
                <span className="project-badge">{project.badge}</span>
                <div className="project-links">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-icon"
                      title="Live Demo"
                      aria-label={`Live Demo for ${project.name}`}
                    >
                      <Icon name="external-link" size={16} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-icon"
                      title="GitHub Repository"
                      aria-label={`GitHub Repo for ${project.name}`}
                    >
                      <Icon name="github" size={16} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="project-title">{project.name}</h3>
              <p className="project-tagline">{project.tagline}</p>
              <p className="project-desc">{project.description}</p>

              <div className="project-tech-tags">
                {project.stack.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-footer">
                <button
                  type="button"
                  className="btn-details"
                  onClick={() => onSelectProject(project)}
                >
                  <span>Architecture &amp; Details</span>
                  <Icon name="arrow-right" size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
