import { ArrowRight, FileText, Github, Mail, MapPin } from "lucide-react";
import { PROFILE } from "../data/portfolioData";

export default function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="container hero-layout">
        <div>
          <div className="hero-eyebrow">
            <MapPin size={15} />
            <span>
              {PROFILE.location} • {PROFILE.college}
            </span>
          </div>

          <h1 className="hero-name">Hi, I&apos;m {PROFILE.name}.</h1>
          <p className="hero-role">{PROFILE.role}</p>
          <p className="hero-bio">{PROFILE.bio}</p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <ArrowRight size={16} />
            </a>
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <FileText size={16} />
              <span>Resume</span>
            </a>
            <a href="#contact" className="btn btn-ghost">
              <Mail size={16} />
              <span>Contact</span>
            </a>
          </div>
        </div>

        <div className="hero-photo-wrap">
          <img
            src={PROFILE.photoUrl}
            alt={PROFILE.name}
            className="hero-photo"
            width="220"
            height="220"
          />
        </div>
      </div>
    </section>
  );
}
