import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import Icon from "./Icon";

function DifficultyDonutChart({ easy, medium, hard }) {
  const total = easy + medium + hard || 549;
  const pEasy = (easy / total) * 100;
  const pMed = (medium / total) * 100;
  const pHard = (hard / total) * 100;

  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const strokeEasy = (pEasy / 100) * circ;
  const strokeMed = (pMed / 100) * circ;
  const strokeHard = (pHard / 100) * circ;

  return (
    <div className="donut-chart-wrapper">
      <div className="donut-svg-container">
        <svg viewBox="0 0 140 140" className="donut-svg" role="img" aria-label="DSA Difficulty Breakdown Chart">
          <circle cx="70" cy="70" r={radius} className="donut-bg" />
          <circle
            cx="70"
            cy="70"
            r={radius}
            className="donut-segment segment-easy"
            strokeDasharray={`${strokeEasy} ${circ}`}
            strokeDashoffset={0}
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            className="donut-segment segment-med"
            strokeDasharray={`${strokeMed} ${circ}`}
            strokeDashoffset={-strokeEasy}
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            className="donut-segment segment-hard"
            strokeDasharray={`${strokeHard} ${circ}`}
            strokeDashoffset={-(strokeEasy + strokeMed)}
          />
        </svg>
        <div className="donut-center-text">
          <span className="donut-number">{total}</span>
          <span className="donut-caption">DSA Solved</span>
        </div>
      </div>

      <div className="donut-legend">
        <div className="legend-item legend-easy">
          <span className="legend-bullet" />
          <div className="legend-info">
            <span className="legend-name">Easy</span>
            <span className="legend-val">
              <strong>{easy}</strong> <small>({pEasy.toFixed(1)}%)</small>
            </span>
          </div>
        </div>
        <div className="legend-item legend-med">
          <span className="legend-bullet" />
          <div className="legend-info">
            <span className="legend-name">Medium</span>
            <span className="legend-val">
              <strong>{medium}</strong> <small>({pMed.toFixed(1)}%)</small>
            </span>
          </div>
        </div>
        <div className="legend-item legend-hard">
          <span className="legend-bullet" />
          <div className="legend-info">
            <span className="legend-name">Hard</span>
            <span className="legend-val">
              <strong>{hard}</strong> <small>({pHard.toFixed(1)}%)</small>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsSection({
  metrics,
  systemHealth,
  lastUpdatedText,
  isRefreshing,
  onRefresh,
}) {
  const { distribution } = PORTFOLIO_CONFIG.verifiedStats;

  const platformBars = [
    { name: "DSA (LeetCode / Core)", solves: metrics.dsaTotal, color: "var(--accent-amber)", icon: "code" },
    { name: "CodeChef (CP)", solves: metrics.codechefSolved, color: "var(--accent-codechef)", icon: "terminal" },
    { name: "Codeforces (CP)", solves: metrics.codeforcesSolved, color: "var(--accent)", icon: "cpu" },
    { name: "GFG Basic (Fundamentals)", solves: distribution.fundamentals.gfgBasic, color: "var(--accent-emerald)", icon: "book-open" },
    { name: "HackerRank (Fundamentals)", solves: distribution.fundamentals.hackerrank, color: "var(--accent-secondary)", icon: "award" },
  ];

  const maxBar = Math.max(...platformBars.map((p) => p.solves), 550);

  const benchmarks = [
    {
      platform: "LeetCode",
      rating: metrics.leetcodeRating,
      maxRating: metrics.leetcodeMax,
      badge: `${metrics.leetcodeContests} Contests`,
      tag: "Weekly 527 • Rank 2,430",
      color: "var(--accent-amber)",
    },
    {
      platform: "CodeChef",
      rating: metrics.codechefRating,
      maxRating: metrics.codechefMax,
      badge: `${metrics.codechefContests} Contests • ${metrics.codechefStars}`,
      tag: `${metrics.codechefDiv} Competitor`,
      color: "var(--accent-codechef)",
    },
    {
      platform: "Codeforces",
      rating: metrics.codeforcesRating,
      maxRating: metrics.codeforcesMax,
      badge: `${metrics.codeforcesContests} Contests • ${metrics.codeforcesRank}`,
      tag: `${metrics.codeforcesSolved} Problems Solved`,
      color: "var(--accent)",
    },
    {
      platform: "AtCoder",
      rating: metrics.atcoderRating,
      maxRating: metrics.atcoderMax,
      badge: `${metrics.atcoderContests} Contests`,
      tag: "Algorithmic Rounds",
      color: "var(--accent-emerald)",
    },
  ];

  return (
    <section id="analytics" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">01. Problem Solving &amp; Telemetry</span>
          <h2 className="section-title">Competitive Programming &amp; DSA Analytics</h2>
          <p className="section-subtitle">
            Verified multi-platform competitive programming profile spanning {metrics.totalSolved} solved problems,{" "}
            {metrics.totalContests} rated contests, 450 active days, and 13 platform awards.
          </p>
        </div>

        <div className="dashboard-control-bar">
          <div className="control-bar-left">
            <div className={`system-status-pill ${systemHealth.badgeClass}`}>
              <span className="status-dot" />
              <span className="status-label">{systemHealth.label}</span>
            </div>
            <span className="last-updated-text">
              Last synced: <strong>{lastUpdatedText}</strong>
            </span>
          </div>

          <div className="control-bar-right">
            <a
              href={PORTFOLIO_CONFIG.urls.codolio}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <Icon name="bar-chart-3" size={15} />
              <span>Codolio Profile</span>
            </a>
            <button
              type="button"
              className="btn-refresh"
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Fetch fresh statistics from platform APIs"
            >
              <Icon name="refresh-cw" size={15} className={`refresh-icon ${isRefreshing ? "spin" : ""}`} />
              <span>{isRefreshing ? "Refreshing..." : "Refresh Live Data"}</span>
            </button>
          </div>
        </div>

        {/* 4 Platform Cards */}
        <div className="analytics-grid">
          <article className="platform-card">
            <div className="platform-card-header">
              <div className="platform-brand">
                <div className="platform-icon-wrap lc">
                  <Icon name="code" size={20} />
                </div>
                <div>
                  <h3 className="platform-title">LeetCode</h3>
                  <span className="platform-handle">@{PORTFOLIO_CONFIG.handles.leetcode}</span>
                </div>
              </div>
              <span className="badge badge-warning">Max {metrics.leetcodeMax}</span>
            </div>

            <div className="platform-stats-grid">
              <div className="stat-item">
                <span className="stat-item-label">Rating</span>
                <span className="stat-item-val">{metrics.leetcodeRating}</span>
              </div>
              <div className="stat-item">
                <span className="stat-item-label">DSA Solved</span>
                <span className="stat-item-val">{metrics.dsaTotal}</span>
              </div>
              <div className="stat-item">
                <span className="stat-item-label">Easy / Med / Hard</span>
                <span className="stat-item-val" style={{ fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--accent-emerald)" }}>{metrics.easy}</span> /{" "}
                  <span style={{ color: "var(--accent-amber)" }}>{metrics.medium}</span> /{" "}
                  <span style={{ color: "var(--accent-rose)" }}>{metrics.hard}</span>
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-item-label">Contests</span>
                <span className="stat-item-val">{metrics.leetcodeContests}</span>
              </div>
            </div>

            <div className="platform-card-footer">
              <span className="text-muted" style={{ fontSize: "0.76rem" }}>
                Weekly 527 • Rank <strong>2,430</strong>
              </span>
              <a
                href={PORTFOLIO_CONFIG.urls.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-profile-link"
              >
                <span>Profile</span>
                <Icon name="external-link" size={14} />
              </a>
            </div>
          </article>

          <article className="platform-card">
            <div className="platform-card-header">
              <div className="platform-brand">
                <div className="platform-icon-wrap cc">
                  <Icon name="terminal" size={20} />
                </div>
                <div>
                  <h3 className="platform-title">CodeChef</h3>
                  <span className="platform-handle">@{PORTFOLIO_CONFIG.handles.codechef}</span>
                </div>
              </div>
              <span className="badge badge-success">Max {metrics.codechefMax}</span>
            </div>

            <div className="platform-stats-grid">
              <div className="stat-item">
                <span className="stat-item-label">Rating</span>
                <span className="stat-item-val">{metrics.codechefRating}</span>
              </div>
              <div className="stat-item">
                <span className="stat-item-label">Stars</span>
                <span className="stat-item-val">{metrics.codechefStars}</span>
              </div>
              <div className="stat-item">
                <span className="stat-item-label">Division</span>
                <span className="stat-item-val">{metrics.codechefDiv}</span>
              </div>
              <div className="stat-item">
                <span className="stat-item-label">Solved</span>
                <span className="stat-item-val">{metrics.codechefSolved}</span>
              </div>
            </div>

            <div className="platform-card-footer">
              <span className="text-muted" style={{ fontSize: "0.76rem" }}>
                Contests: <strong>{metrics.codechefContests}</strong>
              </span>
              <a
                href={PORTFOLIO_CONFIG.urls.codechef}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-profile-link"
              >
                <span>Profile</span>
                <Icon name="external-link" size={14} />
              </a>
            </div>
          </article>

          <article className="platform-card">
            <div className="platform-card-header">
              <div className="platform-brand">
                <div className="platform-icon-wrap cf">
                  <Icon name="cpu" size={20} />
                </div>
                <div>
                  <h3 className="platform-title">Codeforces</h3>
                  <span className="platform-handle">@{PORTFOLIO_CONFIG.handles.codeforces}</span>
                </div>
              </div>
              <span className="badge badge-cyan">Max {metrics.codeforcesMax}</span>
            </div>

            <div className="platform-stats-grid">
              <div className="stat-item">
                <span className="stat-item-label">Rating</span>
                <span className="stat-item-val">{metrics.codeforcesRating}</span>
              </div>
              <div className="stat-item">
                <span className="stat-item-label">Max Rating</span>
                <span className="stat-item-val">{metrics.codeforcesMax}</span>
              </div>
              <div className="stat-item">
                <span className="stat-item-label">Rank</span>
                <span className="stat-item-val">{metrics.codeforcesRank}</span>
              </div>
              <div className="stat-item">
                <span className="stat-item-label">Solved</span>
                <span className="stat-item-val">{metrics.codeforcesSolved}</span>
              </div>
            </div>

            <div className="platform-card-footer">
              <span className="text-muted" style={{ fontSize: "0.76rem" }}>
                Contests: <strong>{metrics.codeforcesContests}</strong>
              </span>
              <a
                href={PORTFOLIO_CONFIG.urls.codeforces}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-profile-link"
              >
                <span>Profile</span>
                <Icon name="external-link" size={14} />
              </a>
            </div>
          </article>

          <article className="platform-card">
            <div className="platform-card-header">
              <div className="platform-brand">
                <div className="platform-icon-wrap ac">
                  <Icon name="zap" size={20} />
                </div>
                <div>
                  <h3 className="platform-title">AtCoder</h3>
                  <span className="platform-handle">Beginner Contests</span>
                </div>
              </div>
              <span className="badge badge-neutral">Max {metrics.atcoderMax}</span>
            </div>

            <div className="platform-stats-grid">
              <div className="stat-item">
                <span className="stat-item-label">Rating</span>
                <span className="stat-item-val">{metrics.atcoderRating}</span>
              </div>
              <div className="stat-item">
                <span className="stat-item-label">Max Rating</span>
                <span className="stat-item-val">{metrics.atcoderMax}</span>
              </div>
              <div className="stat-item">
                <span className="stat-item-label">Contests</span>
                <span className="stat-item-val">{metrics.atcoderContests}</span>
              </div>
              <div className="stat-item">
                <span className="stat-item-label">Languages</span>
                <span className="stat-item-val" style={{ fontSize: "0.9rem" }}>
                  C++ / Java
                </span>
              </div>
            </div>

            <div className="platform-card-footer">
              <span className="text-muted" style={{ fontSize: "0.76rem" }}>
                Algorithmic Rounds
              </span>
              <a
                href={PORTFOLIO_CONFIG.urls.codolio}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-profile-link"
              >
                <span>Codolio</span>
                <Icon name="external-link" size={14} />
              </a>
            </div>
          </article>
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">DSA Difficulty Distribution</h3>
              <span className="badge badge-neutral">{metrics.dsaTotal} DSA</span>
            </div>
            <div className="chart-body">
              <DifficultyDonutChart easy={metrics.easy} medium={metrics.medium} hard={metrics.hard} />
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Question Distribution Across Platforms</h3>
              <span className="badge badge-neutral">{metrics.totalSolved} Total Solved</span>
            </div>
            <div className="chart-body">
              <div className="bar-chart-list">
                {platformBars.map((item) => {
                  const pct = Math.min(100, Math.max(6, (item.solves / maxBar) * 100));
                  return (
                    <div key={item.name} className="bar-item">
                      <div className="bar-label-row">
                        <span className="bar-name">
                          <Icon name={item.icon} className="icon-inline" />
                          {item.name}
                        </span>
                        <span className="bar-value">
                          <strong>{item.solves}</strong> solved
                        </span>
                      </div>
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{ width: `${pct}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Contest Benchmarks */}
        <div className="chart-card" style={{ marginBottom: "32px" }}>
          <div className="chart-header">
            <h3 className="chart-title">Contest Rankings &amp; Participation</h3>
            <span className="badge badge-cyan">{metrics.totalContests} Contests Attended</span>
          </div>
          <div className="chart-body">
            <div className="rating-grid rating-grid-4">
              {benchmarks.map((b) => (
                <div key={b.platform} className="rating-box">
                  <div className="rating-box-header">
                    <span className="rating-platform-name">{b.platform}</span>
                    <span
                      className="rating-badge"
                      style={{ borderColor: b.color, color: b.color }}
                    >
                      {b.badge}
                    </span>
                  </div>
                  <div className="rating-main-num">{b.rating}</div>
                  <div className="rating-sub">
                    Peak: <strong>{b.maxRating}</strong> • {b.tag}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Verified Consistency & Awards Telemetry */}
        <div className="telemetry-summary-card">
          <div className="telemetry-left">
            <span className="telemetry-tag">Verified Coding Telemetry</span>
            <div className="telemetry-main-val">{metrics.totalSolved} Solved</div>
            <p className="telemetry-note">
              Consistent daily problem solving across <strong>450 active days</strong> using{" "}
              <strong>C++</strong> and <strong>Java</strong>, backed by{" "}
              <strong>{metrics.totalContests} rated contests</strong> and{" "}
              <strong>13 platform awards</strong>.
            </p>
          </div>

          <div className="telemetry-grid">
            <div className="telemetry-tile">
              <span className="telemetry-tile-label">Consistency &amp; Streaks</span>
              <span className="telemetry-tile-val">450 Active Days • 90d Max Streak</span>
              <span className="telemetry-tile-sub">
                464 Submissions (May–Nov) • Current Streak: 2 Days
              </span>
            </div>
            <div className="telemetry-tile">
              <span className="telemetry-tile-label">
                Question Distribution ({metrics.totalSolved})
              </span>
              <span className="telemetry-tile-val">
                {metrics.dsaTotal} DSA • 131 CP • 34 Fundamentals
              </span>
              <span className="telemetry-tile-sub">
                GFG Basic: 18 • HackerRank: 16 • CodeChef: {metrics.codechefSolved} • Codeforces:{" "}
                {metrics.codeforcesSolved}
              </span>
            </div>
            <div className="telemetry-tile">
              <span className="telemetry-tile-label">Latest Contest Milestone</span>
              <span className="telemetry-tile-val">Weekly Contest 527 • Rank 2,430</span>
              <span className="telemetry-tile-sub">
                08 Nov 2026 • Peak LeetCode Rating: {metrics.leetcodeMax}
              </span>
            </div>
            <div className="telemetry-tile">
              <span className="telemetry-tile-label">Awards &amp; Languages</span>
              <span className="telemetry-tile-val">13 Platform Awards • C++ &amp; Java</span>
              <span className="telemetry-tile-sub">
                Earned for 50+ Problems Milestone &amp; 5+ Contest Streaks
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
