import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import { formatRelativeTime } from "../services/api";
import Icon from "./Icon";

const VERIFIED_MILESTONES = [
  {
    platform: "LeetCode",
    icon: "code",
    color: "var(--accent-amber)",
    badge: "Rating 1718",
    badgeClass: "badge-warning",
    title: "Weekly Contest 527 — Global Rank 2,430",
    detail: "20 Contests Attended • 549 DSA Problems Solved (204 Easy / 306 Med / 39 Hard)",
    link: PORTFOLIO_CONFIG.urls.leetcode,
    timeText: "08 Nov 2026",
  },
  {
    platform: "Codolio",
    icon: "flame",
    color: "var(--accent-emerald)",
    badge: "90-Day Max Streak",
    badgeClass: "badge-success",
    title: "714 Total Questions Solved Across 450 Active Days",
    detail: "464 Submissions (May–Nov) • 52 Contests • 13 Platform Awards",
    link: PORTFOLIO_CONFIG.urls.codolio,
    timeText: "Verified Snapshot",
  },
  {
    platform: "Codeforces",
    icon: "cpu",
    color: "var(--accent)",
    badge: "Peak 1062",
    badgeClass: "badge-cyan",
    title: "59 Algorithmic Problems Solved • 8 Rated Contests",
    detail: "Current Rating: 1029 (Newbie) • C++ / Java",
    link: PORTFOLIO_CONFIG.urls.codeforces,
    timeText: "Active Competitor",
  },
  {
    platform: "GitHub",
    icon: "github",
    color: "var(--accent-secondary)",
    badge: "GenAI & Full-Stack",
    badgeClass: "badge-neutral",
    title: "Building Jeevan Vani, Smart Shop, Worker Sathi & Glimpse",
    detail: "MERN, GenAI/LLMs, Redis, Docker, Kubernetes",
    link: PORTFOLIO_CONFIG.urls.github,
    timeText: "Active Builder",
  },
];

export default function ActivityTimeline({
  codeforcesSubmissions = [],
  leetcodeStats,
  githubActivity = [],
}) {
  const activities = [];

  codeforcesSubmissions.forEach((sub) => {
    activities.push({
      platform: "Codeforces",
      icon: "cpu",
      color: sub.verdict === "OK" ? "var(--accent-emerald)" : "var(--accent-rose)",
      badge: sub.verdict === "OK" ? "Accepted" : sub.verdict === "WRONG_ANSWER" ? "Wrong Answer" : sub.verdict,
      badgeClass: sub.verdict === "OK" ? "badge-success" : "badge-danger",
      title: `${sub.problemIndex ? `${sub.problemIndex}. ` : ""}${sub.problemName}`,
      detail: `Language: ${sub.language || "C++"} • Rating: ${sub.rating || "N/A"}`,
      link: sub.contestId
        ? `https://codeforces.com/contest/${sub.contestId}/problem/${sub.problemIndex}`
        : PORTFOLIO_CONFIG.urls.codeforces,
      timestamp: sub.timestamp,
    });
  });

  if (Array.isArray(leetcodeStats?.recentSubmissions)) {
    leetcodeStats.recentSubmissions.forEach((sub) => {
      const isAc = sub.statusDisplay === "Accepted";
      activities.push({
        platform: "LeetCode",
        icon: "code",
        color: isAc ? "var(--accent-emerald)" : "var(--accent-rose)",
        badge: isAc ? "Accepted" : sub.statusDisplay || "Attempted",
        badgeClass: isAc ? "badge-success" : "badge-danger",
        title: sub.title,
        detail: `Language: ${sub.lang ? sub.lang.toUpperCase() : "C++"} • DSA Practice`,
        link: `https://leetcode.com/problems/${sub.titleSlug}/`,
        timestamp: Number(sub.timestamp) * 1000,
      });
    });
  }

  githubActivity.forEach((evt) => {
    if (evt.type === "PushEvent") {
      const repoName = evt.repo ? evt.repo.name.replace("adityapandey97/", "") : "Repository";
      const commitMsg = evt.payload?.commits?.[0]?.message || "Pushed code commits";
      activities.push({
        platform: "GitHub",
        icon: "git-commit",
        color: "var(--accent)",
        badge: "Code Push",
        badgeClass: "badge-cyan",
        title: `${commitMsg} [${repoName}]`,
        detail: `Aditya pushed commits to ${repoName}`,
        link: `https://github.com/${evt.repo ? evt.repo.name : "adityapandey97"}`,
        timestamp: new Date(evt.created_at).getTime(),
      });
    }
  });

  activities.sort((a, b) => b.timestamp - a.timestamp);
  const items = activities.length > 0 ? activities.slice(0, 10) : VERIFIED_MILESTONES;

  return (
    <section id="activity" className="section" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">02. Live Event Stream</span>
          <h2 className="section-title">Recent Coding Activity</h2>
          <p className="section-subtitle">
            Chronological stream of LeetCode problem solutions, Codeforces contest verdicts, and
            GitHub engineering commits.
          </p>
        </div>

        <div className="timeline-list">
          {items.map((act, idx) => (
            <div key={`${act.platform}-${idx}`} className="timeline-item">
              <div className="timeline-dot" style={{ backgroundColor: act.color }} />
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-platform">
                    <Icon name={act.icon} /> {act.platform}
                  </span>
                  <span className={`timeline-badge badge ${act.badgeClass}`}>{act.badge}</span>
                  <span className="timeline-time">
                    {act.timeText || formatRelativeTime(act.timestamp)}
                  </span>
                </div>
                <h4 className="timeline-title">
                  <a href={act.link} target="_blank" rel="noopener noreferrer">
                    {act.title}
                  </a>
                </h4>
                <p className="timeline-detail">{act.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
