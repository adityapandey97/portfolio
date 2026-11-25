import { useCallback, useEffect, useMemo, useState } from "react";
import { PORTFOLIO_CONFIG } from "./data/portfolioData";
import { fetchAllPortfolioTelemetry, formatLastUpdated } from "./services/api";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AnalyticsSection from "./components/AnalyticsSection";
import ActivityTimeline from "./components/ActivityTimeline";
import GitHubSection from "./components/GitHubSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceAndCredentials from "./components/ExperienceAndCredentials";
import AboutAndContact from "./components/AboutAndContact";
import { CommandPalette, ProjectModal, ToastContainer } from "./components/Overlays";

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [telemetry, setTelemetry] = useState(() => ({
    githubProfile: PORTFOLIO_CONFIG.verifiedStats.github,
    githubRepos: [],
    githubActivity: [],
    leetcodeStats: PORTFOLIO_CONFIG.verifiedStats.leetcode,
    leetcodeContest: {
      contestRating: PORTFOLIO_CONFIG.verifiedStats.leetcode.rating,
      contestAttend: PORTFOLIO_CONFIG.verifiedStats.leetcode.contestsAttended,
    },
    codeforcesProfile: PORTFOLIO_CONFIG.verifiedStats.codeforces,
    codeforcesSubmissions: [],
    codechefProfile: PORTFOLIO_CONFIG.verifiedStats.codechef,
    systemHealth: {
      status: "operational",
      label: "Verified Snapshot • 08 Nov 2026",
      badgeClass: "badge-success",
    },
    lastUpdatedText: formatLastUpdated(new Date()),
  }));

  const showToast = useCallback((message, type = "info", duration = 3000) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      } else if (e.key === "Escape" && paletteOpen) {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [paletteOpen]);

  const loadTelemetry = useCallback(
    async (force = false) => {
      setIsRefreshing(true);
      if (force) showToast("Fetching real-time platform data...", "info");
      try {
        const result = await fetchAllPortfolioTelemetry(force);
        setTelemetry(result);
        if (force) showToast("All developer statistics updated!", "success");
      } catch {
        if (force) showToast("Using verified snapshot data.", "info");
      } finally {
        setIsRefreshing(false);
      }
    },
    [showToast]
  );

  useEffect(() => {
    loadTelemetry(false);
  }, [loadTelemetry]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      showToast(`Switched to ${next === "dark" ? "Dark" : "Light"} theme`, "info");
      return next;
    });
  }, [showToast]);

  const copyEmail = useCallback(() => {
    const email = PORTFOLIO_CONFIG.personal.email;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(email)
        .then(() => showToast(`Copied ${email} to clipboard!`, "success"))
        .catch(() => showToast(`Email: ${email}`, "info"));
    } else {
      showToast(`Email: ${email}`, "info");
    }
  }, [showToast]);

  const metrics = useMemo(() => {
    const v = PORTFOLIO_CONFIG.verifiedStats;
    const lc = telemetry.leetcodeStats || v.leetcode;
    const lcContest = telemetry.leetcodeContest || {};
    const cc = telemetry.codechefProfile || v.codechef;
    const cf = telemetry.codeforcesProfile || v.codeforces;

    const easy = Math.max(v.distribution.dsa.easy, Number(lc.easySolved || 0));
    const medium = Math.max(v.distribution.dsa.medium, Number(lc.mediumSolved || 0));
    const hard = Math.max(v.distribution.dsa.hard, Number(lc.hardSolved || 0));
    const dsaTotal = easy + medium + hard;

    const leetcodeRating = Math.max(v.leetcode.rating, Math.round(lcContest.contestRating || 0));
    const leetcodeMax = Math.max(v.leetcode.maxRating, leetcodeRating);
    const leetcodeContests = Math.max(
      v.leetcode.contestsAttended,
      Number(lcContest.contestAttend || 0)
    );

    const codechefRating = Math.max(v.codechef.rating, Number(cc.rating || 0));
    const codechefMax = Math.max(v.codechef.maxRating, Number(cc.maxRating || 0));
    const codechefSolved = Math.max(v.codechef.solved, Number(cc.solved || 0));
    const codechefContests = Math.max(v.codechef.contests, Number(cc.contests || 0));

    const codeforcesRating = Math.max(v.codeforces.rating, Number(cf.rating || 0));
    const codeforcesMax = Math.max(v.codeforces.maxRating, Number(cf.maxRating || 0));
    const codeforcesSolved = Math.max(v.codeforces.solved, Number(cf.solved || 0));
    const codeforcesContests = v.codeforces.contests;

    const totalSolved = Math.max(
      v.totalQuestionsSolved,
      dsaTotal + codechefSolved + codeforcesSolved + v.distribution.fundamentals.total
    );
    const totalContests =
      leetcodeContests + codechefContests + codeforcesContests + v.atcoder.contests;

    return {
      totalSolved,
      totalContests,
      dsaTotal,
      easy,
      medium,
      hard,
      leetcodeRating,
      leetcodeMax,
      leetcodeContests,
      codechefRating,
      codechefMax,
      codechefStars: cc.stars || v.codechef.stars,
      codechefDiv: cc.division || v.codechef.division,
      codechefSolved,
      codechefContests,
      codeforcesRating,
      codeforcesMax,
      codeforcesRank: cf.rank || v.codeforces.rank,
      codeforcesSolved,
      codeforcesContests,
      atcoderRating: v.atcoder.rating,
      atcoderMax: v.atcoder.maxRating,
      atcoderContests: v.atcoder.contests,
    };
  }, [telemetry]);

  return (
    <>
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setPaletteOpen(true)}
        onCopyEmail={copyEmail}
      />

      <main>
        <Hero metrics={metrics} />

        <AnalyticsSection
          metrics={metrics}
          systemHealth={telemetry.systemHealth}
          lastUpdatedText={telemetry.lastUpdatedText}
          isRefreshing={isRefreshing}
          onRefresh={() => loadTelemetry(true)}
        />

        <ActivityTimeline
          codeforcesSubmissions={telemetry.codeforcesSubmissions}
          leetcodeStats={telemetry.leetcodeStats}
          githubActivity={telemetry.githubActivity}
        />

        <GitHubSection
          profile={telemetry.githubProfile}
          repos={telemetry.githubRepos}
        />

        <SkillsSection />

        <ProjectsSection
          githubRepos={telemetry.githubRepos}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <ExperienceAndCredentials />

        <AboutAndContact onCopyEmail={copyEmail} />
      </main>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onToggleTheme={toggleTheme}
        onCopyEmail={copyEmail}
        onRefreshData={() => loadTelemetry(true)}
      />

      <ToastContainer toasts={toasts} />
    </>
  );
}
