import { useState } from "react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import { formatRelativeTime } from "../services/api";
import Icon from "./Icon";

const LANG_FILTERS = ["all", "JavaScript", "Java", "C++", "Python"];

export default function GitHubSection({ profile, repos = [] }) {
  const [langFilter, setLangFilter] = useState("all");

  const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
  const filtered =
    langFilter === "all"
      ? repos
      : repos.filter((r) => r.language && r.language.toLowerCase() === langFilter.toLowerCase());

  return (
    <section id="github" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">03. Version Control &amp; Codebases</span>
          <h2 className="section-title">GitHub Overview &amp; Repositories</h2>
          <p className="section-subtitle">
            Explore public repositories, primary tech stacks, and system implementations on GitHub.
          </p>
        </div>

        <div className="github-overview-card">
          <div className="gh-profile-meta">
            <img
              src={PORTFOLIO_CONFIG.personal.avatarPhoto}
              alt="Aditya Pandey GitHub Avatar"
              className="gh-avatar"
              width="60"
              height="60"
            />
            <div>
              <h3 className="gh-name">
                {PORTFOLIO_CONFIG.personal.name}{" "}
                <span className="mono" style={{ fontSize: "0.85rem", color: "var(--accent)" }}>
                  (@{PORTFOLIO_CONFIG.handles.github})
                </span>
              </h3>
              <p className="gh-bio">
                B.Tech IT @ NIET • GenAI &amp; Full-Stack Developer • Competitive Programmer
              </p>
            </div>
          </div>

          <div className="gh-stats-row">
            <div className="gh-stat-box">
              <div className="gh-stat-val">
                {profile?.public_repos || repos.length || PORTFOLIO_CONFIG.verifiedStats.github.publicRepos}
              </div>
              <div className="gh-stat-lbl">Public Repos</div>
            </div>
            <div className="gh-stat-box">
              <div className="gh-stat-val">
                {profile?.followers ?? PORTFOLIO_CONFIG.verifiedStats.github.followers}
              </div>
              <div className="gh-stat-lbl">Followers</div>
            </div>
            <div className="gh-stat-box">
              <div className="gh-stat-val">
                {profile?.following ?? PORTFOLIO_CONFIG.verifiedStats.github.following}
              </div>
              <div className="gh-stat-lbl">Following</div>
            </div>
            <div className="gh-stat-box">
              <div className="gh-stat-val">{totalStars}</div>
              <div className="gh-stat-lbl">Total Stars</div>
            </div>
          </div>

          <a
            href={PORTFOLIO_CONFIG.urls.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            <Icon name="github" size={16} />
            <span>Visit GitHub Profile</span>
          </a>
        </div>

        <div className="filter-tabs">
          {LANG_FILTERS.map((lang) => (
            <button
              key={lang}
              type="button"
              className={`filter-btn ${langFilter === lang ? "active" : ""}`}
              onClick={() => setLangFilter(lang)}
            >
              {lang === "all" ? "All Languages" : lang}
            </button>
          ))}
        </div>

        <div className="repos-grid">
          {filtered.length === 0 ? (
            <div className="empty-state" style={{ gridColumn: "1 / -1", padding: "20px 0" }}>
              Visit{" "}
              <a
                href={PORTFOLIO_CONFIG.urls.githubRepos}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)", textDecoration: "underline" }}
              >
                github.com/{PORTFOLIO_CONFIG.handles.github}
              </a>{" "}
              to explore all public repositories.
            </div>
          ) : (
            filtered.slice(0, 8).map((repo) => (
              <div key={repo.id || repo.name} className="repo-card">
                <div className="repo-card-top">
                  <Icon name="folder-git-2" className="repo-icon" />
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-link"
                    aria-label={`View ${repo.name} on GitHub`}
                  >
                    <Icon name="external-link" size={16} />
                  </a>
                </div>
                <h4 className="repo-name">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h4>
                <p className="repo-desc">
                  {repo.description || "Production software repository by Aditya Pandey."}
                </p>
                <div className="repo-meta">
                  <span className="repo-lang">
                    <span className="lang-dot" /> {repo.language || "Code"}
                  </span>
                  <span className="repo-stat">
                    <Icon name="star" /> {repo.stargazers_count || 0}
                  </span>
                  <span className="repo-stat">
                    <Icon name="git-fork" /> {repo.forks_count || 0}
                  </span>
                  <span className="repo-time">
                    {formatRelativeTime(new Date(repo.updated_at).getTime())}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
