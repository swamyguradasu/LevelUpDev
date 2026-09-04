export interface SpeakingExercise {
  id: string;
  modeId:
    | 'daily_self_talk'
    | 'random_topic'
    | 'two_minute_challenge'
    | 'five_minute_tech'
    | 'project_explanation'
    | 'interview_answer'
    | 'workplace_scenario'
    | 'presentation_practice';
  modeTitle: string;
  topic: string;
  category: string;
  timeLimitSeconds: number;
  preparationSeconds: number;
  objective: string;
  structure: string[];
  usefulPhrases: string[];
  sampleSpokenModel: string;
  proTips: string[];
}

export interface SpeakingModeConfig {
  id: SpeakingExercise['modeId'];
  title: string;
  shortDesc: string;
  iconName: string;
  badgeColor: string;
  targetDurationDesc: string;
  recommendedFocus: string;
}

export const SPEAKING_MODES_CONFIG: SpeakingModeConfig[] = [
  {
    id: 'daily_self_talk',
    title: '1. Daily Self Talk',
    shortDesc: 'Form direct thoughts in English without translating from Telugu.',
    iconName: 'MessageSquare',
    badgeColor: 'emerald',
    targetDurationDesc: '60–90 Seconds',
    recommendedFocus: 'Internal narration, daily focus, surroundings, mindset',
  },
  {
    id: 'random_topic',
    title: '2. Random Topic',
    shortDesc: 'Impromptu speaking on spontaneous tech and career prompts.',
    iconName: 'Zap',
    badgeColor: 'amber',
    targetDurationDesc: '60–120 Seconds',
    recommendedFocus: 'Thinking while speaking, zero-filler pauses, agility',
  },
  {
    id: 'two_minute_challenge',
    title: '3. Two-Minute Challenge',
    shortDesc: 'Continuous unhindered speaking without stopping for mistakes.',
    iconName: 'Clock',
    badgeColor: 'orange',
    targetDurationDesc: 'Exactly 120 Seconds',
    recommendedFocus: 'Flow over perfection, verbal stamina, seamless transitions',
  },
  {
    id: 'five_minute_tech',
    title: '4. Five-Minute Technical Deep Dive',
    shortDesc: 'Structured in-depth explanation of core computer science & AI concepts.',
    iconName: 'Cpu',
    badgeColor: 'cyan',
    targetDurationDesc: '300 Seconds',
    recommendedFocus: '5-step technical formula, deep technical conviction',
  },
  {
    id: 'project_explanation',
    title: '5. Project Explanation',
    shortDesc: 'Master the 5-part capstone storytelling framework for recruiters.',
    iconName: 'Layers',
    badgeColor: 'blue',
    targetDurationDesc: '90–150 Seconds',
    recommendedFocus: 'Problem -> Solution -> Tech -> Contribution -> Results',
  },
  {
    id: 'interview_answer',
    title: '6. Interview Answer',
    shortDesc: 'Executive responses using STAR and direct claim-first positioning.',
    iconName: 'Award',
    badgeColor: 'purple',
    targetDurationDesc: '60–120 Seconds',
    recommendedFocus: 'STAR methodology, self-introduction, behavioral mastery',
  },
  {
    id: 'workplace_scenario',
    title: '7. Workplace Scenario',
    shortDesc: 'Diplomatic standups, escalation, code review debates & meetings.',
    iconName: 'Briefcase',
    badgeColor: 'teal',
    targetDurationDesc: '45–90 Seconds',
    recommendedFocus: 'Polite disagreement, asking for help, agile interjections',
  },
  {
    id: 'presentation_practice',
    title: '8. Presentation Practice',
    shortDesc: 'Slide transitions, opening hooks, system demos, and Q&A defense.',
    iconName: 'Sliders',
    badgeColor: 'rose',
    targetDurationDesc: '120–180 Seconds',
    recommendedFocus: 'Vocal projection, audience engagement, slide transitions',
  },
];

export const SPEAKING_EXERCISES: SpeakingExercise[] = [
  // =========================================================================
  // 1. DAILY SELF TALK
  // =========================================================================
  {
    id: 'self-talk-1-morning-goals',
    modeId: 'daily_self_talk',
    modeTitle: 'Daily Self Talk',
    topic: 'Morning Mindset & Daily Engineering Priorities',
    category: 'Daily Mindset',
    timeLimitSeconds: 60,
    preparationSeconds: 10,
    objective: 'Narrate your goals for the day directly in English to prime your brain for spontaneous fluency.',
    structure: [
      '1. Morning State — How are you feeling right now?',
      '2. Primary Priority — What is the #1 technical or communication goal for today?',
      '3. Potential Challenge — What blocker might arise and how will you tackle it?',
      '4. Energizing Close — Clear affirmative commitment.',
    ],
    usefulPhrases: [
      'Today, my primary objective is to...',
      'To make meaningful progress, I will focus on...',
      'One challenge I anticipate is...',
      'I will mitigate this by prioritizing...',
      'By the end of the day, I expect to have completed...',
    ],
    sampleSpokenModel:
      'Good morning. Today, my primary engineering focus is completing the API caching layer and solving two LeetCode tree problems. One challenge I anticipate is debugging race conditions in the async worker; however, I plan to write targeted integration tests before committing any changes. By 5 PM, I expect to have a verified pull request submitted. I am energized and focused.',
    proTips: [
      'Speak out loud even if you are alone in your room.',
      'Do not translate from Telugu; describe your thoughts directly as they arise in English.',
    ],
  },
  {
    id: 'self-talk-2-describe-desk',
    modeId: 'daily_self_talk',
    modeTitle: 'Daily Self Talk',
    topic: 'Describe Your Coding Workspace & Surroundings',
    category: 'Sensory Narration',
    timeLimitSeconds: 60,
    preparationSeconds: 10,
    objective: 'Build spontaneous descriptive vocabulary by narrating physical items and setup in real time.',
    structure: [
      '1. Hardware Setup — Monitor, keyboard, laptop, environment.',
      '2. Current Activity — What editor or tabs are currently open?',
      '3. Ergonomics / Atmosphere — Lighting, sound, mental clarity.',
    ],
    usefulPhrases: [
      'Right now, sitting at my desk, I notice...',
      'On my secondary screen, I have open...',
      'The environment around me is...',
      'This setup helps me maintain deep focus because...',
    ],
    sampleSpokenModel:
      'Looking around my workspace, I have my laptop connected to an external monitor displaying Visual Studio Code on the left and terminal logs on the right. My mechanical keyboard and notebook are positioned within easy reach. The room is quiet with natural sunlight coming from the window, which creates an optimal environment for sustained technical focus.',
    proTips: [
      'Focus on using precise prepositions ("on the left", "within easy reach", "connected to").',
    ],
  },

  // =========================================================================
  // 2. RANDOM TOPIC
  // =========================================================================
  {
    id: 'random-1-ai-developer-future',
    modeId: 'random_topic',
    modeTitle: 'Random Topic',
    topic: 'Will Generative AI Replace Software Engineers or Empower Them?',
    category: 'Tech Debate',
    timeLimitSeconds: 90,
    preparationSeconds: 15,
    objective: 'State a clear thesis, support it with 2 concrete arguments, and conclude without vocalized hesitations.',
    structure: [
      '1. Clear Claim — State your position immediately.',
      '2. Argument 1 — High-level architecture vs syntax boilerplate.',
      '3. Argument 2 — Critical thinking, domain modeling & business edge cases.',
      '4. Conclusion — The evolving role of the AI-augmented engineer.',
    ],
    usefulPhrases: [
      'In my perspective, Generative AI will not replace software engineers; rather, it will empower them.',
      'The main reason is that coding syntax is only twenty percent of software engineering...',
      'For instance, designing fault-tolerant architectures requires deep human judgment...',
      'As a result, engineers who master AI tools will dramatically accelerate their velocity.',
    ],
    sampleSpokenModel:
      'In my perspective, Generative AI will not replace software engineers; rather, it will significantly empower them. The main reason is that writing syntax is only a fraction of the engineering lifecycle. The core value of an engineer lies in problem decomposition, architectural trade-offs, and understanding nuanced business requirements. While AI automates repetitive boilerplate, human engineers remain essential for security audits, system resilience, and domain modeling. As a result, developers who leverage AI will ship higher-quality products faster.',
    proTips: [
      'Never start with "Umm, actually I think maybe...". Start with strong vocal conviction.',
    ],
  },
  {
    id: 'random-2-remote-vs-office',
    modeId: 'random_topic',
    modeTitle: 'Random Topic',
    topic: 'Remote Work vs. In-Office Collaboration for Software Teams',
    category: 'Workplace Culture',
    timeLimitSeconds: 90,
    preparationSeconds: 15,
    objective: 'Analyze trade-offs diplomatically and articulate a balanced hybrid perspective.',
    structure: [
      '1. Balanced Hook — Acknowledge both models.',
      '2. Remote Advantage — Deep focus, zero commute, global talent.',
      '3. Office Advantage — Spontaneous whiteboarding, team bonding.',
      '4. Synthesis — Hybrid or structured async collaboration.',
    ],
    usefulPhrases: [
      'There are compelling advantages to both working models...',
      'On one hand, remote work fosters deep uninterrupted focus time...',
      'On the other hand, in-person whiteboarding accelerates complex architectural alignment...',
      'Therefore, a structured hybrid approach offers the optimal balance.',
    ],
    sampleSpokenModel:
      'Both remote and in-office models offer distinct advantages for software engineering organizations. Remote work provides developers with uninterrupted blocks of deep focus, eliminating stressful daily commutes and enabling companies to hire global talent. Conversely, in-person environments facilitate spontaneous whiteboard brainstorming and rapid team onboarding. In my view, a structured hybrid approach—where teams gather quarterly for alignment while working asynchronously day-to-day—delivers the highest productivity and employee satisfaction.',
    proTips: [
      'Use transition markers like "On one hand...", "Conversely...", "In my view...".',
    ],
  },

  // =========================================================================
  // 3. TWO-MINUTE CHALLENGE
  // =========================================================================
  {
    id: 'two-min-1-ci-cd-importance',
    modeId: 'two_minute_challenge',
    modeTitle: 'Two-Minute Challenge',
    topic: 'Why Continuous Integration & Automated Testing is Non-Negotiable',
    category: 'DevOps & Quality',
    timeLimitSeconds: 120,
    preparationSeconds: 15,
    objective: 'Speak continuously for exactly 120 seconds on CI/CD pipelines without stopping for grammatical perfection.',
    structure: [
      '0–30s: The Problem of Manual Deployments & Merge Nightmares.',
      '30–60s: How Automated CI/CD Pipelines Operate.',
      '60–90s: Business ROI (Speed, Confidence, Bug Prevention).',
      '90–120s: Summary & Vision for Modern Engineering Teams.',
    ],
    usefulPhrases: [
      'In modern software development, automated testing is the backbone of high-velocity teams.',
      'Historically, manual deployments led to painful regression bugs escaping to production...',
      'With CI/CD, every pull request automatically runs linting, unit tests, and security scans...',
      'Consequently, engineers can deploy updates multiple times a day with high confidence.',
    ],
    sampleSpokenModel:
      'In modern software engineering, Continuous Integration and automated testing are absolute non-negotiables for high-performing teams. When organizations rely on manual regression testing, deployment cycles drag on for weeks, and subtle bugs inevitably slip into production. CI/CD transforms this dynamic by turning quality assurance into an automated, continuous gatekeeper. Whenever an engineer opens a pull request, the CI pipeline automatically triggers code linting, unit test suites, and container builds. If a test fails, the team receives instantaneous feedback, allowing them to fix regressions within minutes rather than discovering them after launch. Furthermore, continuous deployment eliminates the fear of high-stakes releases by shipping small, incremental changes daily. Ultimately, automated CI/CD is not just a technical luxury; it is the fundamental engine that enables developer velocity, system stability, and business agility.',
    proTips: [
      'Rule: If you stumble on a word, do not pause or restart; keep speaking and drive your point home.',
    ],
  },

  // =========================================================================
  // 4. FIVE-MINUTE TECHNICAL EXPLANATION
  // =========================================================================
  {
    id: 'five-min-1-database-indexing',
    modeId: 'five_minute_tech',
    modeTitle: 'Five-Minute Technical Deep Dive',
    topic: 'How Database Indexing & B-Trees Work Under the Hood',
    category: 'Database Internals',
    timeLimitSeconds: 300,
    preparationSeconds: 30,
    objective: 'Deliver an authoritative 5-minute technical lecture explaining B-Tree indexing, search complexity, and write trade-offs.',
    structure: [
      'Minute 1: Definition & Full Table Scan Problem ($O(N)$ lookup).',
      'Minute 2: B-Tree Data Structure & Self-Balancing Hierarchy ($O(\\log N)$).',
      'Minute 3: Clustered vs. Non-Clustered Indexes.',
      'Minute 4: The Write Penalty & Index Maintenance Overhead.',
      'Minute 5: Best Practices for Production Query Optimization.',
    ],
    usefulPhrases: [
      'A database index is essentially an auxiliary data structure designed to accelerate data retrieval...',
      'Without an index, the database engine must execute a full table scan, checking every single disk page...',
      'Under the hood, relational engines like PostgreSQL utilize self-balancing B-Trees...',
      'However, there is an unavoidable architectural trade-off: every index incurs write latency during INSERT and UPDATE operations...',
      'To optimize effectively, engineers should index high-cardinality foreign keys and frequently filtered columns.',
    ],
    sampleSpokenModel:
      'Database indexing is one of the most critical mechanisms for optimizing query performance in relational databases. To understand its importance, consider what happens without an index: if a table contains ten million user records, querying by email forces the database engine to perform a full table scan, evaluating every disk page sequentially in linear O(N) time. An index solves this by creating an auxiliary search structure, typically implemented as a self-balancing B-Tree. In a B-Tree, nodes store sorted keys and pointers to child nodes, allowing the search space to be divided hierarchically. This reduces lookup complexity from linear time to logarithmic O(log N) disk reads. Furthermore, we must distinguish between clustered and non-clustered indexes: a clustered index determines the physical storage order of the rows on disk, while a non-clustered index stores sorted pointers referencing the primary heap. However, indexing is not without cost. Every additional index adds write overhead, as INSERT, UPDATE, and DELETE queries must synchronously update the B-Tree hierarchy. Therefore, best practice dictates indexing high-cardinality columns used in WHERE and JOIN clauses while avoiding redundant indexes on low-cardinality fields like boolean status flags. In summary, thoughtful indexing bridges the gap between disk I/O bottlenecks and sub-millisecond API responsiveness.',
    proTips: [
      'Pace yourself steadily; avoid speaking too fast in the first two minutes.',
      'Use hand gestures to visualize the tree branching hierarchy.',
    ],
  },

  // =========================================================================
  // 5. PROJECT EXPLANATION
  // =========================================================================
  {
    id: 'project-1-ml-capstone',
    modeId: 'project_explanation',
    modeTitle: 'Project Explanation',
    topic: 'Explain Your Machine Learning / Web Application Project',
    category: 'Portfolio Capstone',
    timeLimitSeconds: 120,
    preparationSeconds: 20,
    objective: 'Present your primary capstone project clearly to a senior engineering interviewer using the 5-step framework.',
    structure: [
      '1. Problem Statement — What pain point does it solve?',
      '2. Solution Overview — What is the core platform?',
      '3. Technology Stack — Frontend, Backend, Database, AI models.',
      '4. Your Contribution — What specific components did you architect?',
      '5. Measurable Result — Latency, accuracy, throughput, or user adoption.',
    ],
    usefulPhrases: [
      'The core problem we set out to address is...',
      'To solve this, I architected a full-stack platform called...',
      'Our technology stack consists of Next.js, Python FastAPI, PostgreSQL, and PyTorch...',
      'My specific technical contribution was designing the asynchronous inference worker and caching layer...',
      'As a result of this optimization, inference latency dropped by sixty percent.',
    ],
    sampleSpokenModel:
      'I developed LevelUpDev, an adaptive career acceleration platform engineered for software engineers. The primary problem we identified is that engineering graduates often struggle with spontaneous technical communication and structured interview readiness. To address this, I architected a web platform that delivers deterministic 90-day training programs across grammar, vocabulary, and live coding communication. The architecture utilizes Next.js and TypeScript on the frontend, with Firebase and LocalStorage providing seamless dual-layer offline persistence. My core contribution was building an in-browser audio recording studio that operates client-side via MediaRecorder, eliminating backend audio streaming costs while maintaining sub-second feedback. As a result, the platform enables engineers to practice timed speaking drills with zero latency and full progress tracking.',
    proTips: [
      'Emphasize YOUR specific contributions ("I architected...", "I implemented...") rather than vague passive terms.',
    ],
  },

  // =========================================================================
  // 6. INTERVIEW ANSWER
  // =========================================================================
  {
    id: 'interview-1-tell-me-about-yourself',
    modeId: 'interview_answer',
    modeTitle: 'Interview Answer',
    topic: 'Tell Me About Yourself (Executive 60-Second Pitch)',
    category: 'Opening Question',
    timeLimitSeconds: 60,
    preparationSeconds: 15,
    objective: 'Deliver an articulate, memorable self-introduction highlighting education, technical stack, recent project, and career aspirations.',
    structure: [
      '1. Professional Greeting & Identity (No "Myself [Name]").',
      '2. Educational & Technical Foundation.',
      '3. Flagship Project & Key Achievement.',
      '4. Forward-Looking Career Alignment.',
    ],
    usefulPhrases: [
      'Hello, my name is Swamy. I am a software engineer specializing in backend architecture and Python development.',
      'Over the past two years, I have focused heavily on distributed systems, API optimization, and algorithmic problem solving.',
      'Recently, I architected a production-ready web application with dual-layer cloud persistence...',
      'I am excited about this role because your team tackles challenging scalability and AI infrastructure problems.',
    ],
    sampleSpokenModel:
      'Hello, my name is Swamy. I am a software engineer specializing in backend architecture, Python development, and scalable web applications. Over the past two years, I have built production-ready platforms, optimized database query pipelines, and solved over two hundred algorithmic challenges on LeetCode. Recently, I architected LevelUpDev, an AI-powered career training platform featuring real-time audio analysis and cloud synchronization. I am passionate about clean code, robust system design, and continuous learning, and I am eager to contribute to your engineering team.',
    proTips: [
      'Keep your pace at 120–140 words per minute.',
      'Do not recite your entire resume; highlight only the highest-impact achievements.',
    ],
  },
  {
    id: 'interview-2-star-failure',
    modeId: 'interview_answer',
    modeTitle: 'Interview Answer',
    topic: 'Tell Me About a Time You Made a Mistake or Faced a Production Bug',
    category: 'STAR Behavioral',
    timeLimitSeconds: 90,
    preparationSeconds: 20,
    objective: 'Demonstrate humility, technical ownership, rapid triage, and long-term preventative guardrails using STAR.',
    structure: [
      'Situation: Context of the release or deployment.',
      'Task: What went wrong and what was your responsibility?',
      'Action: How did you diagnose, roll back, and fix the root cause?',
      'Result: What automated safeguards did you add to prevent recurrence?',
    ],
    usefulPhrases: [
      'During a scheduled Friday release, I deployed a database migration that accidentally caused...',
      'I immediately took ownership of the incident and initiated a rollback to restore service within five minutes...',
      'Next, I conducted a post-mortem to identify why the staging environment missed the edge case...',
      'To prevent recurrence, I integrated automated migration dry-runs into our CI/CD pipeline.',
    ],
    sampleSpokenModel:
      'During a scheduled deployment, I merged a database migration that updated foreign key constraints without creating an accompanying index, which caused query timeouts during peak traffic. As soon as latency alerts fired, I took immediate ownership, notified the team, and executed a safe rollback script within four minutes to restore normal API latency. Once the incident was mitigated, I investigated the root cause and realized our staging database had insufficient synthetic data to reveal lock contention. I refactored the migration with concurrent indexing and introduced an automated CI check that rejects unindexed foreign keys. This experience reinforced the critical importance of rigorous migration testing and proactive alerting.',
    proTips: [
      'Interviewers look for ownership and preventative systems, not blame.',
    ],
  },

  // =========================================================================
  // 7. WORKPLACE SCENARIO
  // =========================================================================
  {
    id: 'workplace-1-diplomatic-disagreement',
    modeId: 'workplace_scenario',
    modeTitle: 'Workplace Scenario',
    topic: 'Politely Disagreeing With a Tech Lead on Architecture in a Meeting',
    category: 'Engineering Diplomacy',
    timeLimitSeconds: 60,
    preparationSeconds: 15,
    objective: 'Use the 3-step disagreement formula (Validate -> Pivot -> Propose Data-Driven Alternative) without sounding defensive.',
    structure: [
      '1. Validate — Acknowledge the other person’s goal (e.g. speed or simplicity).',
      '2. Pivot with Constraint — Highlight the technical risk (e.g. memory leak, race condition).',
      '3. Propose Alternative — Suggest a collaborative benchmark or compromise.',
    ],
    usefulPhrases: [
      'I completely understand why you want to prioritize fast shipping for this milestone...',
      'However, my concern is that skipping input sanitization might expose our downstream service to security vulnerabilities...',
      'What if we implement a lightweight validation middleware that adds zero noticeable latency?',
      'That way, we maintain our release schedule while safeguarding data integrity.',
    ],
    sampleSpokenModel:
      'I completely understand why you want to use in-memory state to speed up our prototype delivery. However, my primary concern is that once we scale horizontally across multiple container instances, users will experience session drops on load balancer redirects. Would it make sense to benchmark Redis as an external session store? If we create a shared connection pool, we can achieve identical sub-millisecond lookup speeds while ensuring fault-tolerant session persistence.',
    proTips: [
      'Never say "Your idea is bad" or "That won\'t work". Always frame the constraint around system reliability.',
    ],
  },

  // =========================================================================
  // 8. PRESENTATION PRACTICE
  // =========================================================================
  {
    id: 'presentation-1-slide-transition',
    modeId: 'presentation_practice',
    modeTitle: 'Presentation Practice',
    topic: 'Opening & Transitioning Across System Architecture Slides',
    category: 'Technical Demos',
    timeLimitSeconds: 90,
    preparationSeconds: 20,
    objective: 'Deliver a professional opening hook and seamlessly bridge between frontend and backend architecture slides.',
    structure: [
      '1. Opening Hook — Welcome audience and state agenda.',
      '2. Slide 1 (High Level) — Bird’s-eye view of user flow.',
      '3. Verbal Bridge — Seamless transition phrase to the next slide.',
      '4. Slide 2 (Deep Dive) — Backend data ingestion & persistence layer.',
    ],
    usefulPhrases: [
      'Good morning everyone. Today, I am excited to walk you through our new microservices architecture...',
      'As you can see on this diagram, the client application interacts solely through the API gateway...',
      'Now, moving to the next slide, let us examine how data flows from the gateway to our asynchronous worker pool...',
      'Notice how the message broker decouples high-volume writes from database persistence.',
    ],
    sampleSpokenModel:
      'Good morning everyone. Today, I am excited to present the architecture of our real-time notification engine. On this first slide, you can see the high-level user journey: client applications dispatch events over WebSockets to our API Gateway. Now, transitioning to the next slide, let us take a deeper look at our backend processing topology. To prevent database write bottlenecks during flash sale traffic, incoming events are immediately enqueued into Kafka. Our distributed worker pool then consumes messages in batches, guaranteeing exactly-once delivery. In the next section, I will demonstrate how this decoupled architecture reduced latency by seventy percent.',
    proTips: [
      'Always refer verbally to visual cues on your slide ("On the left of this diagram...", "Notice the blue arrows...").',
    ],
  },
];

/**
 * Helper to get exercises by mode.
 */
export function getSpeakingExercisesByMode(modeId: SpeakingExercise['modeId']): SpeakingExercise[] {
  return SPEAKING_EXERCISES.filter((ex) => ex.modeId === modeId);
}

/**
 * Helper to get a random exercise from any mode or a specific mode.
 */
export function getRandomSpeakingExercise(modeId?: SpeakingExercise['modeId']): SpeakingExercise {
  const pool = modeId ? getSpeakingExercisesByMode(modeId) : SPEAKING_EXERCISES;
  if (pool.length === 0) return SPEAKING_EXERCISES[0];
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}
