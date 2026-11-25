import { PROFILE } from "../data/portfolioData";

export default function About() {
  return (
    <section id="about" className="page-section alt-bg">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">01 / About</span>
          <h2 className="section-title">A bit about how I work</h2>
        </div>

        <div className="about-copy">
          {PROFILE.aboutParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
