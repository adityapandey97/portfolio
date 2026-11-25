import { ExternalLink } from "lucide-react";
import { PROBLEM_SOLVING_SUMMARY, PROFILE } from "../data/portfolioData";

export default function ProblemSolving() {
  return (
    <section id="problem-solving" className="page-section alt-bg">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">03 / Problem Solving</span>
          <h2 className="section-title">DSA &amp; Competitive Programming</h2>
          <p className="section-desc">
            A single summary of my practice and contest history across coding platforms.
          </p>
        </div>

        <div className="ps-card">
          <div className="ps-stats-row">
            {PROBLEM_SOLVING_SUMMARY.headlineMetrics.map((metric) => (
              <div key={metric.label} className="ps-stat">
                <span className="ps-stat-val">{metric.value}</span>
                <span className="ps-stat-lbl">{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="ps-summary-text">
            <p>{PROBLEM_SOLVING_SUMMARY.summaryLine}</p>
            <p>{PROBLEM_SOLVING_SUMMARY.ratingLine}</p>
          </div>

          <div className="ps-links">
            <a
              href={PROFILE.links.codolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              <span>Codolio Profile</span>
              <ExternalLink size={14} />
            </a>
            <a
              href={PROFILE.links.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              <span>LeetCode</span>
              <ExternalLink size={14} />
            </a>
            <a
              href={PROFILE.links.codechef}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              <span>CodeChef</span>
              <ExternalLink size={14} />
            </a>
            <a
              href={PROFILE.links.codeforces}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              <span>Codeforces</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
