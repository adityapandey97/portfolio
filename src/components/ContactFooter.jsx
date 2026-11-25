import { useState } from "react";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "../data/portfolioData";

export default function ContactFooter() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(PROFILE.email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <>
      <section id="contact" className="page-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-label">06 / Contact</span>
            <h2 className="section-title">Get in touch</h2>
            <p className="section-desc">
              Open to software engineering internships, full-stack or GenAI projects, and technical
              discussions.
            </p>
          </div>

          <div className="contact-box">
            <div className="contact-actions">
              <a href={`mailto:${PROFILE.email}`} className="btn btn-primary">
                <Mail size={16} />
                <span>{PROFILE.email}</span>
              </a>
              <button type="button" className="btn btn-secondary" onClick={handleCopy}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? "Copied" : "Copy Email"}</span>
              </button>
            </div>

            <div className="contact-actions">
              <a
                href={PROFILE.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                <Github size={15} />
                <span>GitHub (@adityapandey97)</span>
              </a>
              <a
                href={PROFILE.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                <Linkedin size={15} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>{PROFILE.name}</span>
          <span>&copy; {new Date().getFullYear()} • Built with React</span>
        </div>
      </footer>
    </>
  );
}
