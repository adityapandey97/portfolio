import { ExternalLink } from "lucide-react";
import { CERTIFICATIONS, EDUCATION, EXPERIENCE } from "../data/portfolioData";

export default function Background() {
  return (
    <section id="background" className="page-section alt-bg">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">05 / Background</span>
          <h2 className="section-title">Experience, Education &amp; Credentials</h2>
        </div>

        <div className="two-col">
          <div>
            <h3 className="sub-heading">Experience &amp; Training</h3>
            <div className="entry-list">
              {EXPERIENCE.map((item) => (
                <div key={item.title} className="entry-item">
                  <span className="entry-period">{item.period}</span>
                  <h4 className="entry-title">{item.title}</h4>
                  <span className="entry-org">{item.org}</span>
                  <p className="entry-summary">{item.summary}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                      style={{ marginTop: "4px" }}
                    >
                      <span>View Certificate</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="sub-heading">Education</h3>
            <div className="entry-list">
              {EDUCATION.map((item) => (
                <div key={item.title} className="entry-item">
                  <span className="entry-period">{item.period}</span>
                  <h4 className="entry-title">{item.title}</h4>
                  <span className="entry-org">{item.org}</span>
                  <p className="entry-summary">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="certs-grid">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.title} className="cert-item">
              <span className="cert-name">{cert.title}</span>
              <span className="cert-detail">{cert.detail}</span>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                  style={{ marginTop: "6px", fontSize: "0.8rem" }}
                >
                  <span>Credential</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
