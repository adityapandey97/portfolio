export const PROFILE = {
  name: "Aditya Pandey",
  role: "Full-Stack & GenAI Developer",
  location: "Noida, India",
  college: "B.Tech IT, NIET (2024 – 2028)",
  email: "honeypandey409@gmail.com",
  resumeUrl: "assets/Aditya_Pandey_Resume.pdf",
  photoUrl: "profile.jpg",
  bio: "I'm a B.Tech IT student at NIET who enjoys building full-stack web apps, working with GenAI workflows, and solving algorithmic problems. Recently I've been focusing on backend scalability with Docker, Kubernetes, and Redis alongside solid CS fundamentals.",
  aboutParagraphs: [
    "I like understanding how software works under the hood — from writing clean database queries and caching layers to structuring React interfaces that feel fast and straightforward.",
    "Alongside building projects with Node.js, React, MongoDB, Redis, Docker, and Kubernetes, I spend consistent time practicing Data Structures & Algorithms in C++ and Java, keeping my fundamentals sharp in OOP, DBMS, Operating Systems, and Computer Networks.",
  ],
  links: {
    github: "https://github.com/adityapandey97",
    linkedin: "https://www.linkedin.com/in/aditya-pandey-819a85318",
    codolio: "https://codolio.com/profile/aditya55@",
    leetcode: "https://leetcode.com/u/adityapandey088/",
    codechef: "https://www.codechef.com/users/adityapande97",
    codeforces: "https://codeforces.com/profile/_aditya_pandey",
  },
};

export const PROBLEM_SOLVING_SUMMARY = {
  headlineMetrics: [
    { label: "Questions Solved", value: "714" },
    { label: "Active Days", value: "450" },
    { label: "Contests Attended", value: "52" },
    { label: "Max Streak", value: "90 Days" },
  ],
  summaryLine:
    "Solved 549 DSA problems (204 Easy, 306 Medium, 39 Hard), 131 competitive programming problems across CodeChef & Codeforces, and 34 fundamentals (GFG & HackerRank) primarily in C++ and Java.",
  ratingLine:
    "Contest ratings: LeetCode 1718 (20 contests, Weekly Contest 527 rank 2,430) • CodeChef 1401 (peak 1413, 18 contests) • Codeforces 1029 (peak 1062, 8 contests) • AtCoder 247 (6 contests) • 13 platform awards.",
};

export const PROJECTS = [
  {
    id: "jeevan-vani",
    title: "Jeevan Vani",
    type: "GenAI & Full-Stack",
    description:
      "A GenAI-assisted health and wellness guidance web app that helps users ask everyday health questions and get clear, structured responses with fast caching and clean session tracking.",
    highlights: [
      "Built prompt-guided LLM workflows with input validation and structured outputs.",
      "Used Redis for response caching and rate limiting, backed by MongoDB and Docker.",
    ],
    tech: ["React", "Node.js", "Express", "GenAI / LLMs", "Redis", "MongoDB", "Docker"],
    github: "https://github.com/adityapandey97?tab=repositories",
    demo: null,
  },
  {
    id: "smart-shop",
    title: "Smart Shop Management System",
    type: "Full-Stack MERN",
    description:
      "A practical retail and shop management platform built for local businesses to track inventory, daily sales billing, supplier prices, and customer credit (Udhar) in one place.",
    highlights: [
      "Added profit/loss summaries, dead-stock alerts, and supplier price history.",
      "Built REST APIs with Express and MongoDB aggregation pipelines.",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "REST APIs"],
    github: "https://github.com/adityapandey97/smart-shop-manegment-system",
    demo: "https://smart-shop-manegment-system.vercel.app",
  },
  {
    id: "worker-sathi",
    title: "Worker Sathi",
    type: "Full-Stack Platform",
    description:
      "A digital companion platform designed to connect daily-wage and skilled workers with nearby job opportunities while keeping attendance and wage logs transparent.",
    highlights: [
      "Implemented separate workflows for workers and employers with role-based access.",
      "Focused on simple, mobile-friendly navigation and reliable backend APIs.",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Docker"],
    github: "https://github.com/adityapandey97?tab=repositories",
    demo: null,
  },
  {
    id: "glimpse",
    title: "Glimpse",
    type: "Full-Stack Web App",
    description:
      "A clean social media web application where users can create profiles, share posts, browse a feed, and interact with others through likes and comments.",
    highlights: [
      "Built JWT-based authentication, user discovery, and responsive UI components.",
      "Structured REST endpoints and MongoDB schemas for users, posts, and interactions.",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/adityapandey97/Glimpse",
    demo: "https://glimpse-flame-theta.vercel.app",
  },
];

export const SKILL_GROUPS = [
  {
    category: "Backend, Cloud & Caching",
    items: ["Node.js", "Express.js", "REST APIs", "Docker", "Kubernetes", "Redis"],
  },
  {
    category: "Frontend & GenAI",
    items: ["React.js", "GenAI / LLMs", "RAG & Prompting", "JavaScript (ES6+)", "HTML5 & CSS3"],
  },
  {
    category: "Languages & Databases",
    items: ["C++", "Java", "Python", "SQL", "MongoDB", "MySQL", "Git & GitHub"],
  },
  {
    category: "CS Fundamentals",
    items: [
      "Data Structures & Algorithms",
      "OOPs",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
    ],
  },
];

export const EXPERIENCE = [
  {
    period: "Jun 2025 – Jul 2025",
    title: "Software Development Intern",
    org: "Codesoft (Remote)",
    summary:
      "Built responsive web interfaces and modular JavaScript features with clean API integration and form validation.",
  },
  {
    period: "Workshop",
    title: "Nation Skillup DSA Workshop",
    org: "GeeksforGeeks",
    summary:
      "Completed an offline hands-on DSA workshop led by Sandeep Jain covering problem-solving patterns and complexity optimization.",
    link: "https://drive.google.com/file/d/1yEYvO9yzMJVyH1b0qorHJ5PF82CU2dj-/view?usp=sharing",
  },
];

export const EDUCATION = [
  {
    period: "2024 – 2028",
    title: "B.Tech in Information Technology",
    org: "Noida Institute of Engineering & Technology (NIET), Greater Noida",
    summary:
      "Studying DSA, OOPs, DBMS, Operating Systems, and Computer Networks alongside active competitive programming.",
  },
  {
    period: "2024",
    title: "Class XII (CBSE – Science)",
    org: "78.9%",
    summary: "Physics, Chemistry, Mathematics, and Computer Science.",
  },
];

export const CERTIFICATIONS = [
  {
    title: "Oracle Java OOP Certification",
    detail: "Object-Oriented Programming with Java",
  },
  {
    title: "TUF DSA Certification",
    detail: "takeUforward — Data Structures & Algorithms",
  },
  {
    title: "Adobe Hackathon — Round 2",
    detail: "Selected for Round 2 problem-solving & system round",
  },
  {
    title: "Codathon Final Round",
    detail: "NIET Competitive Programming Finalist",
    link: "https://docs.google.com/presentation/d/1oZSzRNRH96S110clC-zdSSmOjijJF9zuoJuAKtLiOxo/edit?usp=sharing",
  },
  {
    title: "IDEAHACK 2.0",
    detail: "NIET TBI Innovation & Pitching",
    link: "https://drive.google.com/file/d/1-XyV0_nxbJ8YvKfg4cmbsjmiRPDcq3gO/view?usp=sharing",
  },
  {
    title: "Bharat XR (Snap AR)",
    detail: "AR Lens Development Program",
    link: "https://drive.google.com/file/d/1xKbKKwGw87VvqEJu4WcL8RXGG2YgQeLw/view?usp=sharing",
  },
];
