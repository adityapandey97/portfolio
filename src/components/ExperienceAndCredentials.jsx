import {
  CERTIFICATIONS_DATA,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
} from "../data/portfolioData";
import Icon from "./Icon";

export default function ExperienceAndCredentials() {
  return (
    <>
      <section id="experience" className="section" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="dual-timeline-grid">
            <div>
              <div className="section-header" style={{ marginBottom: "24px" }}>
                <span className="section-tag">06. Experience &amp; Training</span>
                <h2 className="section-title" style={{ fontSize: "1.85rem" }}>
                  Engineering Experience
                </h2>
              </div>

              {EXPERIENCE_DATA.map((exp) => (
                <article key={exp.role} className="experience-card">
                  <span className="exp-period">{exp.period}</span>
                  <h3 className="exp-role">{exp.role}</h3>
                  <span className="exp-company">{exp.company}</span>
                  <ul className="exp-bullets">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx}>
                        <Icon name="chevron-right" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  {exp.link && (
                    <div style={{ marginTop: "8px" }}>
                      <a
                        href={exp.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="platform-profile-link"
                        style={{ fontSize: "0.8rem" }}
                      >
                        <span>{exp.link.label}</span>
                        <Icon name="external-link" size={14} />
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>

            <div id="education">
              <div className="section-header" style={{ marginBottom: "24px" }}>
                <span className="section-tag">07. Academic Foundation</span>
                <h2 className="section-title" style={{ fontSize: "1.85rem" }}>
                  Education Timeline
                </h2>
              </div>

              {EDUCATION_DATA.map((edu) => (
                <article key={edu.role} className="education-card">
                  <span className="exp-period">{edu.period}</span>
                  <h3 className="exp-role">{edu.role}</h3>
                  <span className="exp-company">{edu.company}</span>
                  {edu.location && (
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{edu.location}</p>
                  )}
                  {edu.highlight && (
                    <p style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 600 }}>
                      {edu.highlight}
                    </p>
                  )}
                  {edu.note && (
                    <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>
                      {edu.note}
                    </p>
                  )}
                  {edu.bullets && (
                    <ul className="exp-bullets" style={{ marginTop: "6px" }}>
                      {edu.bullets.map((b, idx) => (
                        <li key={idx}>
                          <Icon name="chevron-right" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="certifications" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">08. Honors &amp; Credentials</span>
            <h2 className="section-title">Certifications &amp; Competitive Achievements</h2>
            <p className="section-subtitle">
              Verified credentials across Object-Oriented Programming, Data Structures, and
              competitive hackathons.
            </p>
          </div>

          <div className="certs-grid">
            {CERTIFICATIONS_DATA.map((cert) => (
              <article key={cert.title} className="cert-card">
                <div className="cert-header">
                  <div className="cert-icon">
                    <Icon name={cert.icon} size={18} />
                  </div>
                  <span className={`badge ${cert.badgeClass}`}>{cert.badge}</span>
                </div>
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{cert.desc}</p>
                {cert.link && (
                  <a
                    href={cert.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-link"
                  >
                    <span>{cert.link.label}</span>
                    <Icon name="external-link" size={14} />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
