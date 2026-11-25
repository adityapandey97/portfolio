import { SKILL_GROUPS } from "../data/portfolioData";

export default function Skills() {
  return (
    <section id="skills" className="page-section">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">04 / Skills</span>
          <h2 className="section-title">Tools &amp; Fundamentals</h2>
          <p className="section-desc">
            Technologies I use to build and deploy applications, along with core computer science
            subjects.
          </p>
        </div>

        <div className="skills-groups">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category} className="skill-group-card">
              <h3 className="skill-group-title">{group.category}</h3>
              <div className="skill-pills">
                {group.items.map((item) => (
                  <span key={item} className="skill-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
