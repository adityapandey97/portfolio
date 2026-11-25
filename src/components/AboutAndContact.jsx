import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import Icon from "./Icon";

export default function AboutAndContact({ onCopyEmail }) {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section id="about" className="section" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">09. Engineering Philosophy</span>
            <h2 className="section-title">About Aditya Pandey</h2>
          </div>

          <div className="about-grid">
            <div className="about-photo-wrapper">
              <img
                src={PORTFOLIO_CONFIG.personal.avatarPhoto}
                alt="Aditya Pandey Developer Portrait"
                className="about-photo"
                width="400"
                height="400"
              />
            </div>

            <div className="about-text-content">
              <p>
                I am a <strong>GenAI &amp; Full-Stack Software Developer</strong> and B.Tech
                Information Technology undergraduate at NIET (2024–2028) who combines strong
                algorithmic problem-solving with modern distributed backend architecture.
              </p>
              <p>
                With <strong>714+ verified questions solved</strong> across{" "}
                <strong>450 active days</strong> (90-day max streak),{" "}
                <strong>52 competitive contests</strong>, and a{" "}
                <strong>1718 LeetCode rating</strong> (plus 1401 on CodeChef, 1029/1062 peak on
                Codeforces, and 247 on AtCoder), I write clean, complexity-aware code grounded in{" "}
                <strong>DSA, OOP, DBMS, Operating Systems, and Computer Networks</strong>.
              </p>
              <p>
                On the systems and product side, I build scalable applications using{" "}
                <strong>
                  React, Node.js, Express, MongoDB, MySQL, Redis, Docker, and Kubernetes
                </strong>{" "}
                along with <strong>Generative AI / LLM</strong> integrations—featured in projects
                including <em>Jeevan Vani</em>, <em>Smart Shop Management System</em>,{" "}
                <em>Worker Sathi</em>, and <em>Glimpse</em>.
              </p>
              <div style={{ display: "flex", gap: "14px", marginTop: "8px", flexWrap: "wrap" }}>
                <a
                  href={PORTFOLIO_CONFIG.urls.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <Icon name="github" size={16} /> GitHub Profile
                </a>
                <a
                  href={PORTFOLIO_CONFIG.urls.codolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <Icon name="external-link" size={16} /> Codolio Profile
                </a>
                <a href="#contact" className="btn btn-outline btn-sm">
                  <Icon name="mail" size={16} /> Get In Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <div className="contact-container-card">
            <span className="section-tag">10. Let&apos;s Build Together</span>
            <h2 className="contact-title">Get In Touch</h2>
            <p className="contact-subtitle">
              Open to SDE internships, GenAI &amp; Full-Stack engineering roles, and impactful
              technical collaborations.
            </p>

            <div className="contact-email-box">
              <Icon name="mail" style={{ color: "var(--accent)" }} />
              <span className="email-address">{PORTFOLIO_CONFIG.personal.email}</span>
              <button
                type="button"
                className="btn btn-sm btn-outline"
                onClick={onCopyEmail}
                title="Copy email address to clipboard"
              >
                <Icon name="copy" size={15} />
                <span>Copy</span>
              </button>
            </div>

            <div className="contact-links-row">
              <a href={`mailto:${PORTFOLIO_CONFIG.personal.email}`} className="btn btn-primary">
                <Icon name="send" size={18} />
                <span>Send Email</span>
              </a>
              <a
                href={PORTFOLIO_CONFIG.urls.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <Icon name="github" size={18} />
                <span>GitHub</span>
              </a>
              <a
                href={PORTFOLIO_CONFIG.urls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <Icon name="linkedin" size={18} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <h3 className="footer-brand-title">{PORTFOLIO_CONFIG.personal.name}</h3>
              <p className="footer-brand-desc">
                GenAI &amp; Full-Stack Software Developer • Competitive Programmer
              </p>
            </div>
            <div className="footer-socials">
              <a
                href={PORTFOLIO_CONFIG.urls.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="GitHub"
              >
                <Icon name="github" size={18} />
              </a>
              <a
                href={PORTFOLIO_CONFIG.urls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="LinkedIn"
              >
                <Icon name="linkedin" size={18} />
              </a>
              <a
                href={PORTFOLIO_CONFIG.urls.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="LeetCode"
              >
                <Icon name="code" size={18} />
              </a>
              <a
                href={PORTFOLIO_CONFIG.urls.codeforces}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="Codeforces"
              >
                <Icon name="cpu" size={18} />
              </a>
              <a
                href={PORTFOLIO_CONFIG.urls.codolio}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="Codolio"
              >
                <Icon name="external-link" size={18} />
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>Engineered by Aditya Pandey • Built with React 18 &amp; Vite</span>
            <span>&copy; {currentYear} Aditya Pandey. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
