export const PORTFOLIO_CONFIG = {
  personal: {
    name: "Aditya Pandey",
    shortName: "AP",
    brandStatus: "GenAI & Full-Stack • SDE",
    roleTitle: "GenAI & Full-Stack Developer",
    subRoles: [
      "GenAI & Full-Stack Developer",
      "Competitive Programmer",
      "Problem Solver",
    ],
    email: "honeypandey409@gmail.com",
    location: "Noida, India",
    educationShort: "B.Tech IT, NIET (2024–2028)",
    resumeUrl: "assets/Aditya_Pandey_Resume.pdf",
    profilePhoto: "profile.jpg",
    avatarPhoto: "assets/avatar.jpg",
  },

  handles: {
    github: "adityapandey97",
    leetcode: "adityapandey088",
    codeforces: "_aditya_pandey",
    codechef: "adityapande97",
    codolio: "aditya55@",
  },

  urls: {
    github: "https://github.com/adityapandey97",
    githubRepos: "https://github.com/adityapandey97?tab=repositories",
    linkedin: "https://www.linkedin.com/in/aditya-pandey-819a85318",
    codolio: "https://codolio.com/profile/aditya55@",
    leetcode: "https://leetcode.com/u/adityapandey088/",
    codeforces: "https://codeforces.com/profile/_aditya_pandey",
    codechef: "https://www.codechef.com/users/adityapande97",
    atcoder: "https://atcoder.jp/",
  },

  endpoints: {
    github: {
      user: (u) => `https://api.github.com/users/${u}`,
      repos: (u) => `https://api.github.com/users/${u}/repos?sort=updated&per_page=20`,
      events: (u) => `https://api.github.com/users/${u}/events/public?per_page=12`,
    },
    leetcode: {
      profile: (u) => `https://alfa-leetcode-api.onrender.com/userProfile/${u}`,
      contest: (u) => `https://alfa-leetcode-api.onrender.com/${u}/contest`,
    },
    codeforces: {
      user: (h) => `https://codeforces.com/api/user.info?handles=${h}`,
      status: (h, count = 10) =>
        `https://codeforces.com/api/user.status?handle=${h}&from=1&count=${count}`,
    },
    codechef: {
      profile: (h) => `https://codechef-api.vercel.app/handle/${h}`,
    },
  },

  cacheTTL: 15 * 60 * 1000,

  verifiedStats: {
    totalQuestionsSolved: 714,
    activeDays: 450,
    recentSubmissions: 464,
    maxStreak: 90,
    currentStreak: 2,
    totalContests: 52,
    awards: 13,
    distribution: {
      fundamentals: { total: 34, gfgBasic: 18, hackerrank: 16 },
      dsa: { total: 549, easy: 204, medium: 306, hard: 39 },
      competitive: { total: 131, codechef: 72, codeforces: 59 },
    },
    leetcode: {
      rating: 1718,
      maxRating: 1718,
      latestContest: "Weekly Contest 527",
      latestContestDate: "08 Nov 2026",
      latestContestRank: 2430,
      totalSolved: 549,
      easySolved: 204,
      mediumSolved: 306,
      hardSolved: 39,
      contestsAttended: 20,
    },
    codechef: {
      rating: 1401,
      maxRating: 1413,
      stars: "2★",
      division: "Div 3",
      solved: 72,
      contests: 18,
    },
    codeforces: {
      rating: 1029,
      maxRating: 1062,
      rank: "Newbie",
      solved: 59,
      contests: 8,
    },
    atcoder: {
      rating: 247,
      maxRating: 247,
      contests: 6,
    },
    github: {
      publicRepos: 17,
      followers: 14,
      following: 15,
      bio: "B.Tech IT @ NIET • GenAI & Full-Stack Developer • Competitive Programmer",
    },
  },
};

export const PROJECTS_DATA = [
  {
    id: "jeevan-vani",
    name: "Jeevan Vani",
    category: "genai",
    tagline: "GenAI-powered healthcare & citizen guidance assistant platform",
    description:
      "Full-stack Generative AI assistant engineered to deliver accessible, context-aware wellness and healthcare guidance through structured LLM workflows, Redis caching, and low-latency REST APIs.",
    stack: ["GenAI / LLMs", "React.js", "Node.js", "Express.js", "MongoDB", "Redis", "Docker"],
    badge: "GenAI + Full-Stack",
    github: "https://github.com/adityapandey97?tab=repositories",
    repoKeywords: ["jeevan", "vani", "wani"],
    demo: null,
    modal: {
      problem:
        "Access to timely, understandable medical triage and wellness information is often blocked by fragmented portals, clinical jargon, and slow support channels.",
      solution:
        "Engineered Jeevan Vani as an intelligent conversational and guidance web platform combining prompt-orchestrated LLM pipelines with structured intake workflows and session state management.",
      architecture:
        "Decoupled React frontend communicating with a containerized Node.js/Express API gateway. Uses Redis for response caching and rate limiting, MongoDB for persistent session/history storage, and Docker for reproducible deployment.",
      keyFeatures: [
        "Context-aware GenAI conversational triage & guidance engine",
        "Prompt guardrails with structured intake and input sanitization",
        "Redis-backed rate limiting and frequent-query caching for low latency",
        "Persistent conversation threads and user profile history in MongoDB",
        "Containerized backend services ready for Docker & Kubernetes orchestration",
      ],
      role: "Full-Stack & GenAI Engineer (API Architecture, Prompt Engineering, Caching & UI)",
    },
  },
  {
    id: "smart-shop",
    name: "Smart Shop Management System",
    category: "fullstack",
    tagline: "Enterprise-grade retail, inventory & credit intelligence platform",
    description:
      "Production-grade MERN commercial platform automating stock workflows, POS billing, customer credit ledgers (Udhar), supplier price tracking, dead-stock detection, and P&L analytics.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "Redis"],
    badge: "Featured Full-Stack",
    github: "https://github.com/adityapandey97/smart-shop-manegment-system",
    repoKeywords: ["smart-shop", "smartshop"],
    demo: "https://smart-shop-manegment-system.vercel.app",
    modal: {
      problem:
        "Small and medium retail businesses suffer from inventory leakage, unrecorded customer credit (Udhar), manual reconciliation errors, and zero actionable visibility into dead stock or profit margins.",
      solution:
        "Built an end-to-end commercial management suite integrating real-time POS operations, automated supplier invoice tracking, intelligent dynamic pricing, and customer debt ledgers.",
      architecture:
        "MERN architecture utilizing MongoDB Aggregation pipelines for multi-period financial reporting, indexed queries for sub-100ms lookups, JWT authentication, and clean modular REST endpoints.",
      keyFeatures: [
        "Real-time inventory tracking with automated low-stock reorder alerts",
        "POS sales billing with instant receipt generation & stock deduction",
        "Supplier price history tracking and procurement cost analytics",
        "Customer credit ledger (Udhar) with payment settlement history",
        "Live Profit/Loss dashboard & dead-stock capital lockup detection",
        "Dynamic pricing recommendations driven by margin and turnover data",
      ],
      role: "Sole Full-Stack Architect (Database Schema, REST APIs, Aggregation & React UI)",
    },
  },
  {
    id: "worker-sathi",
    name: "Worker Sathi",
    category: "backend",
    tagline: "Workforce connection, wage tracking & digital companion platform",
    description:
      "Full-stack labor and workforce empowerment platform connecting skilled & daily-wage workers with verified job opportunities, attendance logs, and transparent payment tracking.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Docker"],
    badge: "Full-Stack & Backend",
    github: "https://github.com/adityapandey97?tab=repositories",
    repoKeywords: ["worker", "sathi"],
    demo: null,
    modal: {
      problem:
        "Unorganized sector workers lack reliable access to verified work opportunities, transparent attendance records, and clear digital wage tracking.",
      solution:
        "Developed Worker Sathi to bridge workers and employers through structured onboarding, role-based dashboards, shift/attendance logging, and verifiable job listings.",
      architecture:
        "Modular Express.js & MongoDB backend with role-based access control (RBAC), indexed search queries, and a responsive mobile-first React frontend.",
      keyFeatures: [
        "Role-based workflows for workers and employers/contractors",
        "Skill-matched job discovery and direct application tracking",
        "Digital attendance and wage ledger for transparent payouts",
        "Mobile-first, accessible interface designed for low-bandwidth use",
        "Normalized MongoDB schemas with strict server-side validation",
      ],
      role: "Full-Stack Developer (System Design, RBAC Backend APIs, Frontend Architecture)",
    },
  },
  {
    id: "glimpse",
    name: "Glimpse",
    category: "fullstack",
    tagline: "Modern responsive social networking & media-sharing platform",
    description:
      "Full-stack social media web application offering personalized content feeds, real-time user interactions, media posting, user discovery, and JWT-secured profiles.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "REST APIs"],
    badge: "Full-Stack App",
    github: "https://github.com/adityapandey97/Glimpse",
    repoKeywords: ["glimpse"],
    demo: "https://glimpse-flame-theta.vercel.app",
    modal: {
      problem:
        "Modern web users expect fluid, responsive social feeds with optimistic UI updates, reliable media handling, and consistent cross-device performance.",
      solution:
        "Built Glimpse with modular React components, efficient state management, optimistic social interactions, and an Express REST API backed by MongoDB.",
      architecture:
        "Decoupled client-server architecture deployed on Vercel and Node.js environments with JWT authorization, normalized MongoDB user/post collections, and RESTful feed pagination.",
      keyFeatures: [
        "User profile customization, authentication, and account management",
        "Interactive post creation, media sharing, and feed discovery",
        "Social engagement workflows (likes, comments, follow/discover)",
        "JWT-secured REST APIs with protected route middleware",
        "Responsive, mobile-friendly UI optimized for modern viewports",
      ],
      role: "Full-Stack Developer (Frontend State, REST APIs, Database Modeling & Deployment)",
    },
  },
];

export const SKILLS_DATA = [
  // GenAI & Full-Stack
  { name: "GenAI & LLMs", detail: "RAG, Prompting & AI Agents", category: "genai-web", icon: "sparkles" },
  { name: "React.js", detail: "Hooks, State & Responsive UI", category: "genai-web", icon: "layout" },
  { name: "Node.js & Express.js", detail: "REST APIs & Middleware", category: "genai-web", icon: "server" },
  { name: "RESTful Architecture", detail: "JWT Auth, Rate Limit & Validation", category: "genai-web", icon: "webhook" },
  // Cloud, DevOps & Cache
  { name: "Docker", detail: "Containers & Multi-stage Builds", category: "devops", icon: "box" },
  { name: "Kubernetes", detail: "Pods, Deployments & Services", category: "devops", icon: "boxes" },
  { name: "Redis", detail: "Caching, Sessions & Pub/Sub", category: "devops", icon: "zap" },
  { name: "Git & GitHub", detail: "Version Control & Workflows", category: "devops", icon: "git-branch" },
  // Core CS & DSA
  { name: "DSA (714+ Solved)", detail: "Graphs, DP, Trees, Heaps, Tries", category: "core", icon: "binary" },
  { name: "OOPs", detail: "SOLID, Design Patterns, Inheritance", category: "core", icon: "component" },
  { name: "DBMS", detail: "ACID, Indexing, Normalization", category: "core", icon: "hard-drive" },
  { name: "Operating Systems", detail: "Concurrency, Threads, Deadlocks", category: "core", icon: "cpu" },
  { name: "Computer Networks", detail: "TCP/IP, HTTP/S, DNS, Routing", category: "core", icon: "globe" },
  // Languages
  { name: "C++", detail: "Competitive Coding & STL", category: "languages", icon: "code-2" },
  { name: "Java", detail: "OOP, Collections & Backend", category: "languages", icon: "coffee" },
  { name: "JavaScript (ES6+)", detail: "Async I/O, Full-Stack Web", category: "languages", icon: "braces" },
  { name: "Python", detail: "GenAI, Scripting & Analytics", category: "languages", icon: "terminal" },
  // Databases & Web
  { name: "MongoDB", detail: "NoSQL Schemas & Aggregations", category: "databases", icon: "database" },
  { name: "MySQL & SQL", detail: "Relational Modeling & Joins", category: "databases", icon: "table-2" },
  { name: "HTML5 & CSS3", detail: "Semantic & Responsive Design", category: "databases", icon: "layers" },
];

export const EXPERIENCE_DATA = [
  {
    period: "June 2025 — July 2025",
    role: "Software Development Intern",
    company: "@ Codesoft • Remote",
    bullets: [
      "Built modular full-stack web components with clean state management and responsive layouts.",
      "Implemented REST API integrations, input validation, and reusable UI architecture.",
    ],
  },
  {
    period: "Offline Technical Workshop • Verified",
    role: "Nation Skillup DSA Intensive",
    company: "@ GeeksforGeeks • Led by Sandeep Jain",
    bullets: [
      "Hands-on mastery of algorithmic optimization, complexity analysis, and competitive problem solving.",
    ],
    link: {
      label: "View Certificate Credential",
      url: "https://drive.google.com/file/d/1yEYvO9yzMJVyH1b0qorHJ5PF82CU2dj-/view?usp=sharing",
    },
  },
];

export const EDUCATION_DATA = [
  {
    period: "2024 — 2028",
    role: "B.Tech in Information Technology",
    company: "Noida Institute of Engineering & Technology (NIET)",
    location: "Greater Noida, Uttar Pradesh, India",
    bullets: [
      "Core CS Coursework: Data Structures & Algorithms, OOPs, DBMS, Operating Systems, Computer Networks.",
      "Active Competitive Programmer (52+ Contests) & Hackathon Finalist.",
    ],
  },
  {
    period: "Graduated May 2024",
    role: "Class XII — Science (CBSE)",
    company: "Central Board of Secondary Education",
    highlight: "Score: 78.9%",
    note: "Foundation in Physics, Chemistry, Mathematics, and Computer Science.",
  },
];

export const CERTIFICATIONS_DATA = [
  {
    title: "Oracle Certification",
    issuer: "Object-Oriented Programming with Java",
    badge: "Verified",
    badgeClass: "badge-success",
    icon: "badge-check",
    desc: "Validates enterprise OOP design patterns, inheritance hierarchies, and memory lifecycle management.",
  },
  {
    title: "TUF — DSA Certification",
    issuer: "takeUforward / Striver",
    badge: "Verified",
    badgeClass: "badge-success",
    icon: "binary",
    desc: "Comprehensive data structures and algorithmic mastery spanning dynamic programming, graphs, and trees.",
  },
  {
    title: "Adobe Hackathon",
    issuer: "Adobe Systems • Round 2 Qualifiers",
    badge: "Round 2 Selection",
    badgeClass: "badge-warning",
    icon: "trophy",
    desc: "Selected for Round 2 following competitive problem formulation and scalable system design evaluation.",
  },
  {
    title: "Codathon Final Round",
    issuer: "Competitive Programming Challenge • NIET",
    badge: "Final Round",
    badgeClass: "badge-cyan",
    icon: "award",
    desc: "Advanced to the Final Round in time-constrained algorithmic problem solving and competitive coding.",
    link: {
      label: "View Presentation",
      url: "https://docs.google.com/presentation/d/1oZSzRNRH96S110clC-zdSSmOjijJF9zuoJuAKtLiOxo/edit?usp=sharing",
    },
  },
  {
    title: "IDEAHACK 2.0",
    issuer: "Innovation & Pitching Challenge • NIET TBI",
    badge: "Innovation",
    badgeClass: "badge-neutral",
    icon: "lightbulb",
    desc: "Recognized for technical product architecture and commercial feasibility modeling.",
    link: {
      label: "View Credential",
      url: "https://drive.google.com/file/d/1-XyV0_nxbJ8YvKfg4cmbsjmiRPDcq3gO/view?usp=sharing",
    },
  },
  {
    title: "Bharat XR (Snap AR)",
    issuer: "Snap Inc. • AR Lens Development",
    badge: "AR Specialization",
    badgeClass: "badge-neutral",
    icon: "layers",
    desc: "Augmented reality lens development and real-time computer vision scripting.",
    link: {
      label: "View Credential",
      url: "https://drive.google.com/file/d/1xKbKKwGw87VvqEJu4WcL8RXGG2YgQeLw/view?usp=sharing",
    },
  },
];

export const SEARCHABLE_INDEX = [
  { type: "Project", title: "Jeevan Vani", desc: "GenAI healthcare & citizen guidance assistant (LLM, Redis, Docker)", link: "#projects" },
  { type: "Project", title: "Smart Shop Management System", desc: "MERN retail inventory, POS, Udhar ledger & analytics", link: "#projects" },
  { type: "Project", title: "Worker Sathi", desc: "Workforce connection, attendance & wage tracking platform", link: "#projects" },
  { type: "Project", title: "Glimpse", desc: "Full-stack social media web application with JWT auth", link: "#projects" },
  { type: "Skill", title: "GenAI & LLM Engineering", desc: "Prompt engineering, RAG pipelines, LLM API integration", link: "#skills" },
  { type: "Skill", title: "Docker & Kubernetes", desc: "Containerization, multi-stage builds, K8s orchestration", link: "#skills" },
  { type: "Skill", title: "Redis", desc: "In-memory caching, rate limiting, session store, pub/sub", link: "#skills" },
  { type: "Skill", title: "C++ & Java", desc: "Competitive programming, STL, OOP & systems design", link: "#skills" },
  { type: "Skill", title: "MERN Full-Stack", desc: "React.js, Node.js, Express.js, MongoDB, MySQL, REST APIs", link: "#skills" },
  { type: "Skill", title: "Core CS: DSA, OOP, DBMS, OS, CN", desc: "714+ problems solved, ACID, concurrency, TCP/IP", link: "#skills" },
  { type: "Analytics", title: "714 Questions Solved • 450 Active Days", desc: "549 DSA (204E/306M/39H), 131 CP, 34 Fundamentals", link: "#analytics" },
  { type: "Analytics", title: "LeetCode 1718 Rating (20 Contests)", desc: "Weekly Contest 527 Rank 2,430 • 549 DSA solved", link: "#analytics" },
  { type: "Analytics", title: "CodeChef 1401 (2★) • Codeforces 1029 • AtCoder 247", desc: "52 total contests attended & 13 platform awards", link: "#analytics" },
  { type: "Certification", title: "Adobe Hackathon Round 2 & Codathon Finalist", desc: "Competitive engineering & algorithmic recognition", link: "#certifications" },
  { type: "Certification", title: "Oracle OOP & TUF DSA Certifications", desc: "Verified Java OOP and DSA mastery credentials", link: "#certifications" },
];
