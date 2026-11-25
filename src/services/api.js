import { PORTFOLIO_CONFIG } from "../data/portfolioData";

const CACHE_PREFIX = "ap_portfolio_cache_";

const serviceStatus = {
  github_profile: "pending",
  github_repos: "pending",
  github_events: "pending",
  leetcode_stats: "pending",
  leetcode_contest: "pending",
  codeforces_profile: "pending",
  codeforces_submissions: "pending",
  codechef_profile: "pending",
};

async function fetchWithTimeout(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    return response;
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}

function getFromCache(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const isExpired = Date.now() - parsed.timestamp > PORTFOLIO_CONFIG.cacheTTL;
    return { data: parsed.data, timestamp: parsed.timestamp, isExpired };
  } catch {
    return null;
  }
}

function saveToCache(key, data) {
  try {
    localStorage.setItem(
      CACHE_PREFIX + key,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    // Ignore storage quota errors
  }
}

async function safeFetch(key, fetcherFn, fallbackValue, forceRefresh = false) {
  const cached = getFromCache(key);
  if (cached && !cached.isExpired && !forceRefresh) {
    serviceStatus[key] = "operational";
    return { source: "live_cache", data: cached.data, timestamp: cached.timestamp };
  }

  try {
    const liveData = await fetcherFn();
    if (liveData) {
      saveToCache(key, liveData);
      serviceStatus[key] = "operational";
      return { source: "live", data: liveData, timestamp: Date.now() };
    }
  } catch {
    // Fall back gracefully
  }

  if (cached && cached.data) {
    serviceStatus[key] = "cached";
    return { source: "expired_cache", data: cached.data, timestamp: cached.timestamp };
  }

  serviceStatus[key] = "fallback";
  return { source: "verified_fallback", data: fallbackValue, timestamp: Date.now() };
}

export function formatLastUpdated(dateObj = new Date()) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };
  try {
    return `${new Intl.DateTimeFormat("en-IN", options).format(dateObj)} IST`;
  } catch {
    return `${dateObj.toLocaleString()} IST`;
  }
}

export function formatRelativeTime(timestampMs) {
  if (!timestampMs) return "Recently";
  const diffSec = Math.floor((Date.now() - timestampMs) / 1000);
  if (diffSec < 60) return "Just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;
  return new Date(timestampMs).toLocaleDateString();
}

export function getSystemHealth() {
  const coreKeys = [
    "github_profile",
    "leetcode_stats",
    "codeforces_profile",
    "codechef_profile",
  ];
  const liveCount = coreKeys.filter((k) => serviceStatus[k] === "operational").length;
  const total = coreKeys.length;

  if (liveCount === total) {
    return {
      status: "operational",
      label: "All Systems Operational",
      badgeClass: "badge-success",
    };
  }
  if (liveCount > 0) {
    return {
      status: "degraded",
      label: `Live + Verified Snapshot (${liveCount}/${total} Synced)`,
      badgeClass: "badge-warning",
    };
  }
  return {
    status: "fallback",
    label: "Verified Snapshot • 08 Nov 2026",
    badgeClass: "badge-success",
  };
}

export async function fetchAllPortfolioTelemetry(forceRefresh = false) {
  const { handles, endpoints, verifiedStats } = PORTFOLIO_CONFIG;

  const [
    ghProfileRes,
    ghReposRes,
    ghEventsRes,
    lcStatsRes,
    lcContestRes,
    cfProfileRes,
    cfSubsRes,
    ccProfileRes,
  ] = await Promise.allSettled([
    safeFetch(
      "github_profile",
      async () => {
        const res = await fetchWithTimeout(endpoints.github.user(handles.github));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      },
      verifiedStats.github,
      forceRefresh
    ),
    safeFetch(
      "github_repos",
      async () => {
        const res = await fetchWithTimeout(endpoints.github.repos(handles.github));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return Array.isArray(data) ? data : [];
      },
      [],
      forceRefresh
    ),
    safeFetch(
      "github_events",
      async () => {
        const res = await fetchWithTimeout(endpoints.github.events(handles.github));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return Array.isArray(data) ? data.slice(0, 8) : [];
      },
      [],
      forceRefresh
    ),
    safeFetch(
      "leetcode_stats",
      async () => {
        const res = await fetchWithTimeout(endpoints.leetcode.profile(handles.leetcode));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return {
          totalSolved: Math.max(verifiedStats.leetcode.totalSolved, data.totalSolved || 0),
          easySolved: Math.max(verifiedStats.leetcode.easySolved, data.easySolved || 0),
          mediumSolved: Math.max(verifiedStats.leetcode.mediumSolved, data.mediumSolved || 0),
          hardSolved: Math.max(verifiedStats.leetcode.hardSolved, data.hardSolved || 0),
          recentSubmissions: (data.recentSubmissions || []).slice(0, 8),
        };
      },
      verifiedStats.leetcode,
      forceRefresh
    ),
    safeFetch(
      "leetcode_contest",
      async () => {
        const res = await fetchWithTimeout(endpoints.leetcode.contest(handles.leetcode));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return {
          contestRating: Math.max(verifiedStats.leetcode.rating, Math.round(data.contestRating || 0)),
          contestAttend: Math.max(verifiedStats.leetcode.contestsAttended, data.contestAttend || 0),
        };
      },
      {
        contestRating: verifiedStats.leetcode.rating,
        contestAttend: verifiedStats.leetcode.contestsAttended,
      },
      forceRefresh
    ),
    safeFetch(
      "codeforces_profile",
      async () => {
        const res = await fetchWithTimeout(endpoints.codeforces.user(handles.codeforces));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.status !== "OK" || !data.result?.[0]) throw new Error("Invalid CF");
        const user = data.result[0];
        return {
          rating: Math.max(verifiedStats.codeforces.rating, user.rating || 0),
          maxRating: Math.max(verifiedStats.codeforces.maxRating, user.maxRating || 0),
          rank: user.rank ? user.rank.charAt(0).toUpperCase() + user.rank.slice(1) : "Newbie",
          solved: verifiedStats.codeforces.solved,
          contests: verifiedStats.codeforces.contests,
        };
      },
      verifiedStats.codeforces,
      forceRefresh
    ),
    safeFetch(
      "codeforces_submissions",
      async () => {
        const res = await fetchWithTimeout(endpoints.codeforces.status(handles.codeforces, 10));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.status !== "OK" || !Array.isArray(data.result)) throw new Error("Invalid CF subs");
        return data.result.map((sub) => ({
          id: sub.id,
          contestId: sub.contestId,
          problemIndex: sub.problem?.index || "",
          problemName: sub.problem?.name || "Problem",
          rating: sub.problem?.rating || null,
          verdict: sub.verdict,
          language: sub.programmingLanguage,
          timestamp: (sub.creationTimeSeconds || 0) * 1000,
        }));
      },
      [],
      forceRefresh
    ),
    safeFetch(
      "codechef_profile",
      async () => {
        const res = await fetchWithTimeout(endpoints.codechef.profile(handles.codechef));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return {
          rating: Math.max(verifiedStats.codechef.rating, data.currentRating || 0),
          maxRating: Math.max(verifiedStats.codechef.maxRating, data.highestRating || 0),
          stars: data.stars || verifiedStats.codechef.stars,
          division: "Div 3",
          solved: Math.max(verifiedStats.codechef.solved, data.solvedCount || 0),
          contests: Math.max(verifiedStats.codechef.contests, data.contestCount || 0),
        };
      },
      verifiedStats.codechef,
      forceRefresh
    ),
  ]);

  return {
    githubProfile: ghProfileRes.status === "fulfilled" ? ghProfileRes.value.data : verifiedStats.github,
    githubRepos: ghReposRes.status === "fulfilled" ? ghReposRes.value.data : [],
    githubActivity: ghEventsRes.status === "fulfilled" ? ghEventsRes.value.data : [],
    leetcodeStats: lcStatsRes.status === "fulfilled" ? lcStatsRes.value.data : verifiedStats.leetcode,
    leetcodeContest:
      lcContestRes.status === "fulfilled"
        ? lcContestRes.value.data
        : {
            contestRating: verifiedStats.leetcode.rating,
            contestAttend: verifiedStats.leetcode.contestsAttended,
          },
    codeforcesProfile: cfProfileRes.status === "fulfilled" ? cfProfileRes.value.data : verifiedStats.codeforces,
    codeforcesSubmissions: cfSubsRes.status === "fulfilled" ? cfSubsRes.value.data : [],
    codechefProfile: ccProfileRes.status === "fulfilled" ? ccProfileRes.value.data : verifiedStats.codechef,
    systemHealth: getSystemHealth(),
    lastUpdatedText: formatLastUpdated(new Date()),
  };
}
