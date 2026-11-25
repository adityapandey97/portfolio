import { ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "../data/portfolioData";

export default function Projects() {
  return (
    <section id="projects" className="page-section">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">02 / Projects</span>
          <h2 className="section-title">Things I&apos;ve built</h2>
          <p className="section-desc">
            A focused set of full-stack and GenAI projects built to solve practical problems.
          </p>
        </div>

        <div className="projects-list">
          {PROJECTS.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-top">
                <span className="project-type">{project.type}</span>
                <div className="project-links">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Live Demo"
                      aria-label={`Live demo for ${project.title}`}
                    >
                      <ExternalLink size={17} />
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub Repository"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <Github size={17} />
                  </a>
                </div>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              <ul className="project-bullets">
                {project.highlights.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <div className="tag-row">
                {project.tech.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
