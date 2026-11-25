import { useState } from "react";
import { SKILLS_DATA } from "../data/portfolioData";
import Icon from "./Icon";

const SKILL_TABS = [
  { key: "all", label: "All Skills" },
  { key: "genai-web", label: "GenAI & Full-Stack" },
  { key: "devops", label: "Cloud, DevOps & Cache" },
  { key: "core", label: "Core CS & DSA" },
  { key: "languages", label: "Languages" },
  { key: "databases", label: "Databases" },
];

export default function SkillsSection() {
  const [category, setCategory] = useState("all");

  const visibleSkills =
    category === "all"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((skill) => skill.category === category);

  return (
    <section id="skills" className="section" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">04. Engineering Stack</span>
          <h2 className="section-title">Technical Skills Matrix</h2>
          <p className="section-subtitle">
            Production full-stack &amp; GenAI technologies, container orchestration, caching
            infrastructure, and core CS fundamentals.
          </p>
        </div>

        <div className="filter-tabs">
          {SKILL_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`filter-btn ${category === tab.key ? "active" : ""}`}
              onClick={() => setCategory(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {visibleSkills.map((skill) => (
            <div key={skill.name} className="skill-item">
              <div className="skill-icon-wrap">
                <Icon name={skill.icon} size={20} />
              </div>
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-category">{skill.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
