import { useRef, useState } from "react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import Icon from "./Icon";

const INITIAL_HISTORY = [
  {
    cmd: "whoami",
    response:
      "Aditya Pandey — GenAI & Full-Stack Software Developer | Competitive Programmer.",
  },
  {
    cmd: "focus",
    response:
      "GenAI Applications + Docker/K8s/Redis + 714+ Verified DSA & CP Solves.",
  },
  {
    cmd: "stack",
    response:
      "C++ • Java • Python • JS • React • Node.js • Docker • Kubernetes • Redis",
  },
];

const TERMINAL_COMMANDS = {
  help: "Available commands: whoami, focus, stack, stats, projects, contact, github, clear",
  whoami:
    "Aditya Pandey — GenAI & Full-Stack Software Developer | Competitive Programmer (NIET '28).",
  focus:
    "GenAI Applications, Distributed Full-Stack Systems (Docker/K8s/Redis) & Algorithmic Problem Solving (714+ Solved).",
  stack:
    "Languages: C++, Java, JavaScript, Python, SQL\nGenAI & Web: LLMs/RAG, React.js, Node.js, Express.js, REST APIs\nInfra & Data: Docker, Kubernetes, Redis, MongoDB, MySQL\nCore CS: DSA, OOP, DBMS, OS, Computer Networks",
  stats:
    "Total Solved: 714 (450 Active Days, 90d Max Streak, 52 Contests, 13 Awards)\nLeetCode: 1718 | CodeChef: 1401 (Max 1413) | Codeforces: 1029 (Max 1062) | AtCoder: 247",
  projects:
    "1. Jeevan Vani (GenAI + Full-Stack)\n2. Smart Shop Management System (MERN + Analytics)\n3. Worker Sathi (Full-Stack Workforce Platform)\n4. Glimpse (Full-Stack Social Media App)",
  contact:
    "Email: honeypandey409@gmail.com | GitHub: github.com/adityapandey97 | Noida, India",
  github: "https://github.com/adityapandey97",
};

export default function Hero({ metrics }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [termHistory, setTermHistory] = useState(INITIAL_HISTORY);
  const [termInput, setTermInput] = useState("");
  const termInputRef = useRef(null);
  const termBodyRef = useRef(null);

  const handleTerminalKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const raw = termInput.trim().toLowerCase();
    setTermInput("");
    if (!raw) return;

    if (raw === "clear") {
      setTermHistory([]);
      return;
    }

    const reply = TERMINAL_COMMANDS[raw];
    setTermHistory((prev) => [
      ...prev,
      reply
        ? { cmd: raw, response: reply, isError: false }
        : {
            cmd: raw,
            response: "Command not recognized. Type 'help' for available commands.",
            isError: true,
          },
    ]);

    requestAnimationFrame(() => {
      if (termBodyRef.current) {
        termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
      }
    });
  };

  const openTerminal = () => {
    setActiveTab("terminal");
    setTimeout(() => termInputRef.current?.focus(), 40);
  };

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-status-pill">
              <span className="status-pulse-dot" />
              <span>Open to SDE &amp; GenAI Full-Stack Opportunities</span>
            </div>

            <h1 className="hero-title">
              Hi, I&apos;m <span className="name-highlight">{PORTFOLIO_CONFIG.personal.name}</span>
            </h1>

            <h2 className="hero-subtitle">
              GenAI &amp; Full-Stack Developer <span className="accent-focus">|</span>{" "}
              Competitive Programmer <span className="accent-focus">|</span> Problem Solver
            </h2>

            <p className="hero-bio">
              B.Tech Information Technology engineer at NIET building production-ready{" "}
              <strong>GenAI</strong> and <strong>Full-Stack</strong> systems with{" "}
              <strong>Docker, Kubernetes, Redis, and MERN</strong>. Grounded in core CS
              fundamentals (<strong>DSA, OOP, DBMS, OS, CN</strong>) with{" "}
              <strong>{metrics.totalSolved}+ solved problems</strong> across{" "}
              <strong>450 active days</strong> and a{" "}
              <strong>{metrics.leetcodeRating} LeetCode rating</strong>.
            </p>

            <div className="hero-meta-chips">
              <span className="meta-chip">
                <Icon name="map-pin" /> {PORTFOLIO_CONFIG.personal.location}
              </span>
              <span className="meta-chip">
                <Icon name="graduation-cap" /> {PORTFOLIO_CONFIG.personal.educationShort}
              </span>
              <span className="meta-chip">
                <Icon name="check-circle-2" /> {metrics.totalSolved} Questions Solved
              </span>
              <span className="meta-chip">
                <Icon name="flame" /> 450 Active Days • 90d Max Streak
              </span>
            </div>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                <span>Explore Projects</span>
                <Icon name="arrow-right" size={18} />
              </a>
              <a
                href={PORTFOLIO_CONFIG.urls.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <Icon name="github" size={18} />
                <span>GitHub (@{PORTFOLIO_CONFIG.handles.github})</span>
              </a>
              <a href="#contact" className="btn btn-outline">
                <Icon name="mail" size={18} />
                <span>Contact Me</span>
              </a>
              <a
                href={PORTFOLIO_CONFIG.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                title="View Resume PDF"
              >
                <Icon name="file-down" size={18} />
                <span>Resume</span>
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-showcase-container">
              <div className="hero-view-switcher" role="tablist" aria-label="Hero visual display options">
                <button
                  type="button"
                  className={`hero-switch-btn ${activeTab === "profile" ? "active" : ""}`}
                  role="tab"
                  aria-selected={activeTab === "profile"}
                  onClick={() => setActiveTab("profile")}
                >
                  <Icon name="user" />
                  <span>Profile</span>
                </button>
                <button
                  type="button"
                  className={`hero-switch-btn ${activeTab === "terminal" ? "active" : ""}`}
                  role="tab"
                  aria-selected={activeTab === "terminal"}
                  onClick={openTerminal}
                >
                  <Icon name="terminal" />
                  <span>Terminal Shell</span>
                </button>
              </div>

              {activeTab === "profile" ? (
                <div className="hero-profile-card active" role="tabpanel">
                  <div className="hero-profile-inner">
                    <div className="hero-avatar-wrapper">
                      <div className="hero-avatar-glow" />
                      <img
                        src={PORTFOLIO_CONFIG.personal.profilePhoto}
                        alt="Aditya Pandey - GenAI & Full-Stack Software Developer"
                        className="hero-avatar-img"
                        width="190"
                        height="190"
                      />
                    </div>

                    <div className="hero-profile-meta">
                      <div className="hero-profile-name-row">
                        <h3 className="hero-profile-name">{PORTFOLIO_CONFIG.personal.name}</h3>
                        <span className="hero-profile-tag">NIET • B.Tech IT &apos;28</span>
                      </div>
                      <p className="hero-profile-tagline">
                        Engineering scalable GenAI &amp; full-stack platforms backed by strong algorithmic rigor.
                      </p>

                      <div className="hero-profile-metrics">
                        <div className="hero-mini-stat">
                          <span className="hero-mini-val">{metrics.totalSolved}</span>
                          <span className="hero-mini-lbl">Solved</span>
                        </div>
                        <div className="hero-mini-stat">
                          <span className="hero-mini-val">{metrics.leetcodeRating}</span>
                          <span className="hero-mini-lbl">LeetCode</span>
                        </div>
                        <div className="hero-mini-stat">
                          <span className="hero-mini-val">{metrics.totalContests}</span>
                          <span className="hero-mini-lbl">Contests</span>
                        </div>
                      </div>

                      <div className="hero-profile-tech-strip">
                        {["GenAI", "Docker", "Kubernetes", "Redis", "React", "Node.js", "C++", "Java"].map(
                          (tech) => (
                            <span key={tech} className="tech-pill">
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <div className="hero-profile-actions">
                      <button
                        type="button"
                        className="btn btn-outline btn-sm hero-switch-to-terminal-btn"
                        onClick={openTerminal}
                      >
                        <Icon name="terminal" size={16} />
                        <span>Launch Interactive Shell</span>
                        <Icon name="arrow-right" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hero-terminal-card active" role="tabpanel">
                  <div className="dev-terminal" role="region" aria-label="Interactive Developer Terminal">
                    <div className="terminal-header">
                      <div className="terminal-dots">
                        <span className="term-dot red" />
                        <span className="term-dot yellow" />
                        <span className="term-dot green" />
                      </div>
                      <div className="terminal-header-center">
                        <img
                          src={PORTFOLIO_CONFIG.personal.profilePhoto}
                          alt="Aditya"
                          className="term-header-avatar"
                          width="18"
                          height="18"
                        />
                        <span className="terminal-title">aditya@sde-genai:~</span>
                      </div>
                      <button
                        type="button"
                        className="term-switch-to-profile-btn"
                        onClick={() => setActiveTab("profile")}
                        title="Switch back to Profile view"
                      >
                        <Icon name="user" />
                        <span>Profile</span>
                      </button>
                    </div>

                    <div className="terminal-body" ref={termBodyRef}>
                      <div className="terminal-history">
                        {termHistory.map((entry, idx) => (
                          <div key={idx} className="term-history-entry">
                            <div className="term-command-line">
                              <span className="term-prompt">$</span> <span>{entry.cmd}</span>
                            </div>
                            <div
                              className={`term-response ${entry.isError ? "text-warning" : ""}`}
                              style={{ whiteSpace: "pre-line" }}
                            >
                              {entry.response}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="term-input-row">
                        <span className="term-prompt">$</span>
                        <input
                          ref={termInputRef}
                          type="text"
                          className="terminal-input"
                          placeholder="type 'help', 'stats', 'projects'..."
                          aria-label="Terminal CLI input"
                          value={termInput}
                          onChange={(e) => setTermInput(e.target.value)}
                          onKeyDown={handleTerminalKeyDown}
                        />
                      </div>
                    </div>

                    <div className="terminal-footer-hint">
                      <span>Interactive Shell: Press Enter to execute</span>
                      <span>React v18</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="quick-stats-row">
          <div className="metric-card">
            <div className="metric-card-top">
              <span className="metric-label">Questions Solved</span>
              <div className="metric-icon">
                <Icon name="check-check" size={16} />
              </div>
            </div>
            <div className="metric-number">{metrics.totalSolved}</div>
            <div className="metric-sub">450 Active Days • 90d Max Streak</div>
          </div>

          <div className="metric-card">
            <div className="metric-card-top">
              <span className="metric-label">LeetCode Rating</span>
              <div className="metric-icon">
                <Icon name="code" size={16} />
              </div>
            </div>
            <div className="metric-number">{metrics.leetcodeRating}</div>
            <div className="metric-sub">
              {metrics.leetcodeContests} Contests • Weekly 527 Rank 2,430
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-card-top">
              <span className="metric-label">CodeChef Rating</span>
              <div className="metric-icon">
                <Icon name="award" size={16} />
              </div>
            </div>
            <div className="metric-number">{metrics.codechefRating}</div>
            <div className="metric-sub">
              {metrics.codechefStars} ({metrics.codechefDiv}) • Peak {metrics.codechefMax} •{" "}
              {metrics.codechefContests} Contests
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-card-top">
              <span className="metric-label">Codeforces</span>
              <div className="metric-icon">
                <Icon name="cpu" size={16} />
              </div>
            </div>
            <div className="metric-number">{metrics.codeforcesRating}</div>
            <div className="metric-sub">
              {metrics.codeforcesRank} • Peak {metrics.codeforcesMax} • {metrics.codeforcesSolved} Solved
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
