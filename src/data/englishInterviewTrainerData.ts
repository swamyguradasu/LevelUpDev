export type InterviewCategory =
  | 'self_introduction'
  | 'hr'
  | 'behavioral'
  | 'technical'
  | 'project'
  | 'dsa_explanation'
  | 'aiml'
  | 'situational'
  | 'workplace'
  | 'recruiter';

export type QuestionDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'beginner' | 'intermediate' | 'advanced';

export type QuestionFrameworkType = 'STAR' | 'Technical' | 'Project' | 'General' | 'star' | 'technical_def' | 'project_8step' | 'general';

export interface FrameworkStepConfig {
  key: string;
  label: string;
  placeholder: string;
  guidance?: string;
  hint?: string;
}

export interface InterviewQuestion {
  id: string;
  category: InterviewCategory;
  categoryTitle: string;
  difficulty: QuestionDifficulty;
  question: string;
  title?: string;
  objective?: string;
  expectedKeywords?: string[];
  timeLimitSeconds?: number;
  frameworkType: QuestionFrameworkType;
  frameworkSteps: FrameworkStepConfig[];
  thinkPhase: {
    mentalFramework?: string;
    whatInterviewerLooksFor?: string;
    keyKeywords?: string[];
    expectedKeywords?: string[];
    pointsToAvoid?: string[];
    trapsToAvoid?: string;
    mentalOutline?: string[];
    targetDurationSec?: number;
  };
  reviewPhase: {
    goldenModelAnswer?: string;
    goldenAnswer?: string;
    keyPhrases: string[];
    checklist?: string[];
  };
  improvePhase: {
    vocabularyUpgrades: Array<{ from: string; to: string }>;
    concisenessTips: string[];
    commonTrap?: string;
  };
}

export interface InterviewCategoryMeta {
  id?: InterviewCategory;
  category: InterviewCategory;
  title: string;
  shortDesc: string;
  iconName?: string;
  icon?: string;
  badgeColor?: string;
  recommendedFramework?: string;
  keyAdvice?: string;
}

export const INTERVIEW_CATEGORIES_CONFIG: InterviewCategoryMeta[] = [
  {
    category: 'self_introduction',
    title: '1. Self Introduction',
    shortDesc: 'Executive elevator pitches, core technical identity, and career narrative.',
    iconName: 'UserCheck',
    badgeColor: 'blue',
    recommendedFramework: 'Present -> Past Impact -> Future Alignment',
    keyAdvice: 'Do not recite your resume chronologically. Highlight current technical strengths and 1 major impactful outcome.',
  },
  {
    category: 'hr',
    title: '2. HR & Culture Fit',
    shortDesc: 'Salary expectations, why this company, 5-year growth trajectory, and strengths.',
    iconName: 'Award',
    badgeColor: 'amber',
    recommendedFramework: 'Claim -> Concrete Evidence -> Mutual Value',
    keyAdvice: 'Frame every personal ambition in terms of the measurable value you deliver to the engineering team.',
  },
  {
    category: 'behavioral',
    title: '3. Behavioral (STAR)',
    shortDesc: 'High-stakes behavioral scenarios using Situation, Task, Action, Result.',
    iconName: 'Target',
    badgeColor: 'purple',
    recommendedFramework: 'STAR: Situation -> Task -> Action -> Result',
    keyAdvice: 'Dedicate 60% of your response time to the "Action" phase detailing your individual contributions.',
  },
  {
    category: 'technical',
    title: '4. Technical Concepts',
    shortDesc: 'Foundational computer science, distributed systems, caching, and API design.',
    iconName: 'Cpu',
    badgeColor: 'cyan',
    recommendedFramework: 'Definition -> Explanation -> Example -> Application',
    keyAdvice: 'Define the term in 1 punchy sentence before diving into mechanics, trade-offs, and production use cases.',
  },
  {
    category: 'project',
    title: '5. Project Deep Dive',
    shortDesc: 'Comprehensive capstone walkthroughs across the full 8-part architectural lifecycle.',
    iconName: 'Layers',
    badgeColor: 'emerald',
    recommendedFramework: 'Problem -> Approach -> Tech -> Implementation -> Challenge -> Solution -> Result -> Scope',
    keyAdvice: 'Highlight the business problem first, then explain why you picked your specific tech stack over alternatives.',
  },
  {
    category: 'dsa_explanation',
    title: '6. DSA & Algorithmic Logic',
    shortDesc: 'Thinking aloud during data structures, algorithm trade-offs, and complexity analysis.',
    iconName: 'RotateCcw',
    badgeColor: 'orange',
    recommendedFramework: 'Clarify -> Brute Force -> Optimized Intuition -> Complexity Analysis',
    keyAdvice: 'Never code in silence. State time/space trade-offs before writing a single line of implementation.',
  },
  {
    category: 'aiml',
    title: '7. AI & Machine Learning',
    shortDesc: 'LLMs, Transformers, RAG pipelines, fine-tuning, embeddings, and MLOps.',
    iconName: 'Sparkles',
    badgeColor: 'rose',
    recommendedFramework: 'Definition -> Architecture Mechanics -> Optimization / Loss -> Production Use Case',
    keyAdvice: 'Explain mathematical and architectural concepts intuitively using practical analogies and evaluation metrics.',
  },
  {
    category: 'situational',
    title: '8. Situational Judgement',
    shortDesc: 'Tight deadlines, handling technical debt, production outage triage, and ambiguity.',
    iconName: 'AlertCircle',
    badgeColor: 'red',
    recommendedFramework: 'Triage / Assess -> Communicate -> Execute Mitigation -> Post-Mortem',
    keyAdvice: 'Demonstrate calm crisis prioritization: isolate damage, inform stakeholders, and implement long-term fixes.',
  },
  {
    category: 'workplace',
    title: '9. Workplace & Teamwork',
    shortDesc: 'Code review debates, cross-functional collaboration, and pushing back on scope.',
    iconName: 'Briefcase',
    badgeColor: 'teal',
    recommendedFramework: 'Empathetic Listening -> Objective Data -> Collaborative Compromise',
    keyAdvice: 'Depersonalize technical disagreements by anchoring decisions on customer outcomes and latency metrics.',
  },
  {
    category: 'recruiter',
    title: '10. Recruiter Screening',
    shortDesc: 'Initial phone screen, notice period, tech stack matching, and relocation expectations.',
    iconName: 'MessageSquare',
    badgeColor: 'indigo',
    recommendedFramework: 'Direct Answer -> Relevant Highlight -> Enthusiastic Transition',
    keyAdvice: 'Keep recruiter screen responses crisp (30–45s). Demonstrate enthusiasm and alignment with the job description.',
  },
];

export const BEHAVIORAL_STAR_STEPS: FrameworkStepConfig[] = [
  {
    key: 'situation',
    label: '1. Situation',
    placeholder: 'Set the context: company, timeline, project, and background environment...',
    guidance: 'Keep this concise (15–20s). Outline who the stakeholders were and what was at stake.',
  },
  {
    key: 'task',
    label: '2. Task',
    placeholder: 'Explain the specific challenge or objective assigned to you...',
    guidance: 'Define the explicit technical or organizational problem you needed to solve.',
  },
  {
    key: 'action',
    label: '3. Action',
    placeholder: 'Detail the step-by-step actions YOU individually took to resolve the issue...',
    guidance: 'Use "I" instead of "we". Mention specific tools, architectural decisions, and leadership actions.',
  },
  {
    key: 'result',
    label: '4. Result',
    placeholder: 'State the quantifiable business outcome and what you learned...',
    guidance: 'Quantify metrics (e.g. latency reduced by 40%, 99.9% uptime, saved $12k cloud costs).',
  },
];

export const TECHNICAL_STEPS: FrameworkStepConfig[] = [
  {
    key: 'definition',
    label: '1. Definition',
    placeholder: 'Give a 1-sentence crystal-clear definition of the concept...',
    guidance: 'Avoid filler words. State what the technology is and its primary objective.',
  },
  {
    key: 'explanation',
    label: '2. Explanation & Mechanics',
    placeholder: 'Explain how it works under the hood (data flow, components, algorithms)...',
    guidance: 'Break down internal mechanics, key components, and underlying data structures.',
  },
  {
    key: 'example',
    label: '3. Example / Analogy',
    placeholder: 'Provide an intuitive real-world engineering example or analogy...',
    guidance: 'Use an intuitive mental model (e.g., Redis caching like a desk notepad vs database file cabinet).',
  },
  {
    key: 'application',
    label: '4. Real-World Application & Trade-offs',
    placeholder: 'Where should this be used in production? What are the trade-offs?',
    guidance: 'Explain when NOT to use this tool and how you applied it in your systems.',
  },
];

export const PROJECT_8_STEPS: FrameworkStepConfig[] = [
  {
    key: 'problem',
    label: '1. Problem Statement',
    placeholder: 'What business or user pain point did this project solve?',
    guidance: 'State the friction users faced and why existing tools fell short.',
  },
  {
    key: 'approach',
    label: '2. High-Level Approach',
    placeholder: 'What was your architectural strategy and system design philosophy?',
    guidance: 'Describe the overall end-to-end dataflow and design paradigm.',
  },
  {
    key: 'technology',
    label: '3. Technology Stack Choice',
    placeholder: 'Which technologies did you choose and why (over alternatives)?',
    guidance: 'Justify your tech choices (e.g. FastAPI over Django for lightweight async throughput).',
  },
  {
    key: 'implementation',
    label: '4. Implementation & Modules',
    placeholder: 'How did you structure the core modules and services?',
    guidance: 'Describe the primary service layers, API contracts, and database schema.',
  },
  {
    key: 'challenge',
    label: '5. Major Technical Challenge',
    placeholder: 'What was the toughest roadblock you encountered during development?',
    guidance: 'Detail an unexpected bug, concurrency race condition, or memory bottleneck.',
  },
  {
    key: 'solution',
    label: '6. Engineering Solution',
    placeholder: 'How did you debug, analyze, and resolve that specific challenge?',
    guidance: 'Demonstrate debugging methodology, profiling, and iterative optimization.',
  },
  {
    key: 'result',
    label: '7. Quantifiable Results',
    placeholder: 'What measurable outcomes did this project achieve?',
    guidance: 'Mention response times, query optimization percentages, accuracy scores, or test coverage.',
  },
  {
    key: 'future_scope',
    label: '8. Future Scope & Learnings',
    placeholder: 'What would you improve or scale if you had 3 more months?',
    guidance: 'Show architectural maturity: mention distributed caching, sharding, or real-time event streaming.',
  },
];

export const GENERAL_STEPS: FrameworkStepConfig[] = [
  {
    key: 'direct_answer',
    label: '1. Direct Claim / Position',
    placeholder: 'State your main point directly in the first 10 seconds...',
    guidance: 'Open with strong conviction without hedging.',
  },
  {
    key: 'supporting_evidence',
    label: '2. Supporting Evidence / Story',
    placeholder: 'Provide concrete context, data, or engineering experience...',
    guidance: 'Ground your answer in real technical projects you completed.',
  },
  {
    key: 'conclusion_alignment',
    label: '3. Conclusion & Company Alignment',
    placeholder: 'Connect your answer back to how you will excel in this role...',
    guidance: 'Tie your conclusion to the team\'s mission and technical challenges.',
  },
];

export const INTERVIEW_QUESTIONS_BANK: InterviewQuestion[] = [
  // =========================================================================
  // 1. SELF INTRODUCTION
  // =========================================================================
  {
    id: 'self_intro_1',
    category: 'self_introduction',
    categoryTitle: 'Self Introduction',
    difficulty: 'Beginner',
    question: 'Tell me about yourself and walk me through your background.',
    frameworkType: 'General',
    frameworkSteps: GENERAL_STEPS,
    thinkPhase: {
      mentalFramework: 'Present Technical Strengths -> Past Proven Outcomes -> Future Alignment',
      keyKeywords: ['Software Engineer', 'Full-stack & AI', 'Scalable systems', 'Clean architecture', 'Passionate about engineering'],
      pointsToAvoid: ['Starting from school/birth', 'Reciting every bullet on resume', 'Personal hobbies unrelated to tech'],
      targetDurationSec: 90,
    },
    reviewPhase: {
      goldenModelAnswer:
        'Hi, I am a software engineer specializing in modern full-stack development and AI system integration. Over the past few years, I have focused on building high-performance web applications using React, Next.js, Node.js, and Python. Recently, I developed a scalable learning platform that handled asynchronous state persistence and real-time assessments for thousands of active users. What drives me as an engineer is taking complex algorithmic problems and turning them into intuitive, resilient products. I am particularly excited about this role because your team is pushing the boundaries of AI-driven developer tooling, which aligns directly with my technical focus.',
      keyPhrases: [
        'I specialize in building...',
        'My primary technical focus is...',
        'A key milestone in my work was...',
        'What drives me as an engineer is...',
        'I am excited about this role because...',
      ],
      checklist: [
        'Delivered in 60–90 seconds without rushing',
        'Clearly stated core technical stack',
        'Highlighted at least 1 measurable project milestone',
        'Connected enthusiasm directly to the company',
      ],
    },
    improvePhase: {
      vocabularyUpgrades: [
        { from: 'I did many projects', to: 'I engineered full-lifecycle applications' },
        { from: 'I know coding', to: 'I specialize in full-stack architecture' },
        { from: 'I want this job', to: 'This role aligns directly with my engineering focus' },
      ],
      concisenessTips: [
        'Eliminate chronological filler ("First in 2021 I did... then in 2022 I did..."). Lead with who you are right now.',
      ],
      commonTrap: 'Speaking for over 3 minutes until the interviewer cuts you off. Keep it crisp at 90 seconds.',
    },
  },
  {
    id: 'self_intro_2',
    category: 'self_introduction',
    categoryTitle: 'Self Introduction',
    difficulty: 'Intermediate',
    question: 'How would you summarize your technical strengths and engineering philosophy?',
    frameworkType: 'General',
    frameworkSteps: GENERAL_STEPS,
    thinkPhase: {
      mentalFramework: 'Core Strengths -> Architecture Discipline -> Value Proposition',
      keyKeywords: ['Maintainability', 'Defensive programming', 'System latency', 'Test-driven mindset', 'Developer experience'],
      pointsToAvoid: ['Listing 20 programming languages without depth', 'Saying "I am a perfectionist"'],
      targetDurationSec: 75,
    },
    reviewPhase: {
      goldenModelAnswer:
        'My core engineering strength lies in building robust, decoupled architectures with a strong emphasis on maintainability and performance. When designing systems, my philosophy is "simplicity before optimization" — write clean, well-tested code first, profile bottlenecks with telemetry, and optimize based on real data. In my recent capstone projects, this mindset helped me eliminate redundant database roundtrips by 40% through intelligent caching layers.',
      keyPhrases: [
        'My core technical strength lies in...',
        'My engineering philosophy is anchored on...',
        'I prioritize clean abstractions and...',
      ],
      checklist: [
        'Expressed clear engineering standards',
        'Showed balance between velocity and code quality',
      ],
    },
    improvePhase: {
      vocabularyUpgrades: [
        { from: 'I write good code', to: 'I maintain high code quality and test coverage' },
        { from: 'I try to make it fast', to: 'I profile bottlenecks and optimize based on latency metrics' },
      ],
      concisenessTips: ['Ground abstract philosophy in 1 concrete metric.'],
      commonTrap: 'Sounding dogmatic. Show that you adapt architecture to business constraints.',
    },
  },

  // =========================================================================
  // 2. HR & CULTURE FIT
  // =========================================================================
  {
    id: 'hr_1',
    category: 'hr',
    categoryTitle: 'HR & Culture Fit',
    difficulty: 'Beginner',
    question: 'Why do you want to work for our company specifically?',
    frameworkType: 'General',
    frameworkSteps: GENERAL_STEPS,
    thinkPhase: {
      mentalFramework: 'Product Admiration -> Specific Technical Challenge -> My Value Contribution',
      keyKeywords: ['Product vision', 'Engineering culture', 'Scale', 'Impact', 'Technology stack alignment'],
      pointsToAvoid: ['Generic praise ("You are a market leader")', 'Focusing only on salary or perks'],
      targetDurationSec: 60,
    },
    reviewPhase: {
      goldenModelAnswer:
        'I have followed your engineering team’s recent work, particularly your transition toward low-latency microservices and AI-assisted workflows. What stands out to me is how your team balances rapid product releases with strict system reliability. I want to contribute my background in async backend architectures and modern React UI engineering to help accelerate your platform’s developer adoption while learning from seasoned distributed systems engineers.',
      keyPhrases: [
        'What specifically attracted me to your team is...',
        'I admire how you approached...',
        'I am eager to contribute my experience in...',
      ],
      checklist: [
        'Mentioned specific company product or engineering blog topic',
        'Explained what value you will bring to their current challenges',
      ],
    },
    improvePhase: {
      vocabularyUpgrades: [
        { from: 'Your company is very big and good', to: 'Your engineering team has established high standards in distributed systems' },
      ],
      concisenessTips: ['Avoid flattery. Focus on technical alignment and business mission.'],
      commonTrap: 'Giving an answer that could apply to literally any other software company.',
    },
  },
  {
    id: 'hr_2',
    category: 'hr',
    categoryTitle: 'HR & Culture Fit',
    difficulty: 'Intermediate',
    question: 'What is your greatest technical weakness, and what steps are you taking to improve it?',
    frameworkType: 'General',
    frameworkSteps: GENERAL_STEPS,
    thinkPhase: {
      mentalFramework: 'Real Technical Gap -> Proactive Learning Habit -> Observable Progress',
      keyKeywords: ['Self-awareness', 'Continuous learning', 'Hands-on practice', 'Technical depth'],
      pointsToAvoid: ['Fake weaknesses ("I work too hard")', 'Unfixable red flags ("I hate teamwork")'],
      targetDurationSec: 60,
    },
    reviewPhase: {
      goldenModelAnswer:
        'Early on, my expertise was heavily weighted toward frontend architecture, which meant I had less hands-on intuition for low-level database indexing and query optimization under heavy concurrency. Recognizing this gap, I dedicated the last six months to deep-diving into PostgreSQL internals, query execution plans, and Redis caching topologies. I applied these learnings directly into my latest capstone project, successfully reducing complex multi-table query latencies from 350 milliseconds down to 45 milliseconds.',
      keyPhrases: [
        'Historically, my focus was primarily on...',
        'To proactively bridge this gap, I...',
        'I applied these learnings directly by...',
      ],
      checklist: [
        'Chose a genuine, technical area of growth',
        'Demonstrated active, disciplined learning routine',
        'Showed concrete improvement outcome',
      ],
    },
    improvePhase: {
      vocabularyUpgrades: [
        { from: 'I do not know database well', to: 'My intuition for low-level query indexing was an identified growth area' },
      ],
      concisenessTips: ['Spend 20% on the weakness, 80% on the proactive improvement.'],
      commonTrap: 'Leaving the interviewer worried that the weakness will break production.',
    },
  },

  // =========================================================================
  // 3. BEHAVIORAL (STAR)
  // =========================================================================
  {
    id: 'behav_1',
    category: 'behavioral',
    categoryTitle: 'Behavioral (STAR)',
    difficulty: 'Intermediate',
    question: 'Tell me about a time you faced a severe bug or production issue under a tight deadline.',
    frameworkType: 'STAR',
    frameworkSteps: BEHAVIORAL_STAR_STEPS,
    thinkPhase: {
      mentalFramework: 'STAR: Situation (Context) -> Task (Goal) -> Action (My steps) -> Result (Metrics)',
      keyKeywords: ['Root-cause analysis', 'Reproduce bug', 'Telemetry logs', 'Rollback strategy', 'Permanent fix', 'Post-mortem'],
      pointsToAvoid: ['Blaming teammates', 'Panicking in narrative', 'Vague resolution ("It started working")'],
      targetDurationSec: 120,
    },
    reviewPhase: {
      goldenModelAnswer:
        '[Situation] Two days before our scheduled capstone launch, our authentication service began randomly dropping user sessions during peak concurrent testing.\n\n[Task] As the backend lead, I needed to isolate the root cause immediately without delaying the scheduled deployment.\n\n[Action] First, I instrumented detailed structured logging to inspect token expiration timestamps. I discovered a race condition in our distributed Redis token store where concurrent writes with mismatched TTLs invalidated valid session tokens. I wrote automated unit tests replicating the race condition, refactored token validation to use atomic Redis transactions, and implemented graceful fallback handling.\n\n[Result] The fix completely eliminated session drops during our 500-user stress test, allowing us to launch on schedule with 99.9% auth reliability.',
      keyPhrases: [
        'The situation began when...',
        'My specific responsibility was to...',
        'To diagnose the root cause, I...',
        'I implemented a resilient fix by...',
        'As a direct result, we achieved...',
      ],
      checklist: [
        'Followed clean S-T-A-R sequence',
        'Highlighted individual technical debugging actions',
        'Stated clear quantifiable outcome',
      ],
    },
    improvePhase: {
      vocabularyUpgrades: [
        { from: 'We had a problem with tokens', to: 'We encountered a concurrency race condition in our distributed token store' },
        { from: 'I fixed it quickly', to: 'I refactored the pipeline using atomic transactions and verified with stress testing' },
      ],
      concisenessTips: ['Do not get bogged down in background backstory. Get to your Action quickly.'],
      commonTrap: 'Using "We did this, we decided that" without clarifying what YOU individually executed.',
    },
  },
  {
    id: 'behav_2',
    category: 'behavioral',
    categoryTitle: 'Behavioral (STAR)',
    difficulty: 'Advanced',
    question: 'Describe a situation where you had a major disagreement with a teammate over technical architecture.',
    frameworkType: 'STAR',
    frameworkSteps: BEHAVIORAL_STAR_STEPS,
    thinkPhase: {
      mentalFramework: 'STAR: Situation (Disagreement) -> Task (Align on solution) -> Action (Data-driven benchmarking) -> Result (Optimal architecture & team cohesion)',
      keyKeywords: ['Objective benchmarking', 'Trade-off analysis', 'Prototyping', 'Ego-free communication', 'Consensus'],
      pointsToAvoid: ['Saying "I proved I was right"', 'Portraying teammate as incompetent'],
      targetDurationSec: 110,
    },
    reviewPhase: {
      goldenModelAnswer:
        '[Situation] While designing our analytics pipeline, a teammate advocated for a heavyweight microservice message broker, whereas I proposed starting with lightweight background worker queues.\n\n[Task] We needed to reach architectural consensus without stalling sprint progress or introducing unnecessary infrastructure complexity.\n\n[Action] Rather than debating hypotheticals, I proposed building a quick 1-day benchmark comparing both options against our anticipated Q1 message volume. I benchmarked throughput, memory footprint, and deployment overhead. The data revealed that the background queue met our SLA with one-third of the operational overhead. I also documented a clear threshold at which migrating to a full message broker would become necessary.\n\n[Result] My teammate agreed with the data-driven proposal, our sprint remained on schedule, and the shared decision matrix strengthened our team’s engineering trust.',
      keyPhrases: [
        'We held differing technical perspectives regarding...',
        'To establish objective alignment, I proposed...',
        'We benchmarked the critical trade-offs...',
        'This collaborative approach enabled us to...',
      ],
      checklist: [
        'Demonstrated diplomatic, data-driven collaboration',
        'Avoided personal conflict; focused on engineering trade-offs',
      ],
    },
    improvePhase: {
      vocabularyUpgrades: [
        { from: 'I told him he was wrong', to: 'I proposed benchmarking both alternatives against our real throughput requirements' },
      ],
      concisenessTips: ['Emphasize the data-driven compromise.'],
      commonTrap: 'Sounding defensive or triumphant instead of collaborative.',
    },
  },

  // =========================================================================
  // 4. TECHNICAL
  // =========================================================================
  {
    id: 'tech_1',
    category: 'technical',
    categoryTitle: 'Technical Concepts',
    difficulty: 'Beginner',
    question: 'What is the difference between SQL and NoSQL databases, and how do you choose between them?',
    frameworkType: 'Technical',
    frameworkSteps: TECHNICAL_STEPS,
    thinkPhase: {
      mentalFramework: 'Definition -> Core Mechanics (Schema vs Flexible) -> Concrete Example -> Decision Matrix',
      keyKeywords: ['Relational vs Document', 'ACID compliance', 'Horizontal vs Vertical scaling', 'Schema enforcement', 'Query complexity'],
      pointsToAvoid: ['Saying "NoSQL is always faster than SQL"', 'Ignoring ACID transactional needs'],
      targetDurationSec: 90,
    },
    reviewPhase: {
      goldenModelAnswer:
        '[Definition] SQL databases are relational, table-based systems with rigid schemas and strong ACID guarantees, while NoSQL databases are non-relational, distributed stores designed for flexible schemas and horizontal scalability.\n\n[Explanation] SQL engines like PostgreSQL organize data in structured relations, making them ideal for complex joins and transactional integrity like payment processing. NoSQL engines like MongoDB or DynamoDB store unstructured or semi-structured data (such as JSON documents or key-values), optimizing for rapid write ingestion and horizontal partitioning across clusters.\n\n[Example] Think of SQL like an Excel ledger where every column must match precisely, and NoSQL like a collection of JSON file folders where each document can hold unique fields.\n\n[Application] In practice, I choose SQL for transactional applications like user authentication, orders, and financial data where schema consistency is paramount. I choose NoSQL for high-throughput telemetry, real-time activity feeds, or caching where read/write velocity outweighs relational joins.',
      keyPhrases: [
        'The fundamental distinction is...',
        'Under the hood, relational databases enforce...',
        'Conversely, non-relational databases optimize for...',
        'When architecting production systems, my decision rule is...',
      ],
      checklist: [
        'Defined both paradigms accurately',
        'Explained ACID vs horizontal scale trade-offs',
        'Gave a clear decision rubric for production use',
      ],
    },
    improvePhase: {
      vocabularyUpgrades: [
        { from: 'SQL is tables, NoSQL is documents', to: 'SQL enforces relational ACID schemas, whereas NoSQL prioritizes horizontal partitioning' },
      ],
      concisenessTips: ['Conclude with your practical decision rule.'],
      commonTrap: 'Treating NoSQL as a replacement for SQL rather than a complementary tool.',
    },
  },
  {
    id: 'tech_2',
    category: 'technical',
    categoryTitle: 'Technical Concepts',
    difficulty: 'Intermediate',
    question: 'How does caching with Redis improve system throughput, and how do you handle cache invalidation?',
    frameworkType: 'Technical',
    frameworkSteps: TECHNICAL_STEPS,
    thinkPhase: {
      mentalFramework: 'Definition -> RAM vs Disk Mechanics -> Invalidation Strategies (TTL, Write-through) -> Trade-offs',
      keyKeywords: ['In-memory key-value store', 'Sub-millisecond latency', 'Cache-aside pattern', 'TTL (Time-To-Live)', 'Stale data mitigation'],
      pointsToAvoid: ['Treating Redis as primary persistent database without caveats'],
      targetDurationSec: 90,
    },
    reviewPhase: {
      goldenModelAnswer:
        '[Definition] Redis is an in-memory data store that serves reads and writes with sub-millisecond latency by storing data directly in RAM rather than querying disk-bound relational databases.\n\n[Explanation] In a typical Cache-Aside pattern, the application checks Redis first. On a cache hit, data returns instantly without touching the database. On a cache miss, the service queries SQL, populates Redis with an expiration TTL, and returns the response. This reduces database CPU load by up to 80% during traffic surges.\n\n[Example] For a live leaderboard, calculating rankings from SQL on every request would choke the database; caching the ranked sorted set in Redis allows thousands of users to read updates with zero latency penalty.\n\n[Application] To handle cache invalidation — one of computer science’s hardest problems — I combine sensible TTL expiration with event-driven invalidation, purging the specific Redis key immediately whenever an update mutation succeeds.',
      keyPhrases: [
        'Redis operates directly in-memory, delivering...',
        'Under the Cache-Aside pattern...',
        'To prevent stale state, we implement...',
      ],
      checklist: [
        'Explained in-memory vs disk mechanics',
        'Walked through Cache-Aside workflow',
        'Covered TTL and event-driven invalidation strategy',
      ],
    },
    improvePhase: {
      vocabularyUpgrades: [
        { from: 'It saves data in memory so it is fast', to: 'It bypasses disk I/O bottlenecks by serving sub-millisecond reads directly from RAM' },
      ],
      concisenessTips: ['Mention Cache-Aside explicitly by name.'],
      commonTrap: 'Forgetting to address cache invalidation and stale data.',
    },
  },

  // =========================================================================
  // 5. PROJECT DEEP DIVE
  // =========================================================================
  {
    id: 'proj_1',
    category: 'project',
    categoryTitle: 'Project Deep Dive',
    difficulty: 'Intermediate',
    question: 'Explain your most technically challenging project from architectural concept to deployment.',
    frameworkType: 'Project',
    frameworkSteps: PROJECT_8_STEPS,
    thinkPhase: {
      mentalFramework: '8-Step Project Lifecycle: Problem -> Approach -> Tech -> Implementation -> Challenge -> Solution -> Results -> Future Scope',
      keyKeywords: ['Microservices / Full-Stack', 'Asynchronous processing', 'Concurrency', 'Latency optimization', 'End-to-end delivery'],
      pointsToAvoid: ['Only talking about UI styling', 'Skipping the technical challenge and solution'],
      targetDurationSec: 150,
    },
    reviewPhase: {
      goldenModelAnswer:
        '[Problem] Aspiring engineers struggle with structured communication and interview fluency due to lack of immediate feedback.\n\n[Approach] I architected an interactive, browser-based full-stack communication training platform that tracks multi-pillar progress deterministically.\n\n[Technology] I selected Next.js and TypeScript for reactive, type-safe rendering, Tailwind CSS for responsive styling, and a hybrid local/cloud storage synchronization engine for resilient persistence.\n\n[Implementation] The platform features an 8-mode speaking studio, an algorithmic English correction engine, and state tracking that synchronizes assessments and streaks.\n\n[Challenge] Handling multi-mode timer countdowns alongside optional Web Audio recording caused UI re-renders and potential memory leaks when users switched tabs rapidly.\n\n[Solution] I decoupled audio stream buffers into isolated React refs, managed intervals through memoized lifecycle hooks, and implemented graceful fallback handling when microphone access was denied.\n\n[Result] The application achieved zero frame drops, instant sub-50ms tab transitions, and passed 100% static build validation with 42 prerendered routes.\n\n[Future Scope] In the next phase, I plan to integrate real-time WebSockets for peer-to-peer mock interview practice.',
      keyPhrases: [
        'The core problem I set out to solve was...',
        'My architectural strategy was centered on...',
        'I selected this specific stack because...',
        'A critical engineering bottleneck we encountered was...',
        'I resolved this by refactoring...',
        'The final outcome delivered measurable improvements in...',
      ],
      checklist: [
        'Covered all 8 lifecycle phases logically',
        'Highlighted a real technical challenge and clean resolution',
        'Stated verifiable performance outcomes',
      ],
    },
    improvePhase: {
      vocabularyUpgrades: [
        { from: 'I made a website for speaking', to: 'I architected an interactive full-stack communication training platform' },
        { from: 'It had some lag but I fixed it', to: 'I resolved component re-render bottlenecks by decoupling audio buffers into persistent refs' },
      ],
      concisenessTips: ['Spend 30 seconds on problem & tech, 60 seconds on challenge & solution, 30 seconds on results.'],
      commonTrap: 'Describing what the website looks like rather than how you engineered the system.',
    },
  },

  // =========================================================================
  // 6. DSA & ALGORITHMIC LOGIC
  // =========================================================================
  {
    id: 'dsa_1',
    category: 'dsa_explanation',
    categoryTitle: 'DSA & Algorithmic Logic',
    difficulty: 'Intermediate',
    question: 'How would you find the longest substring without repeating characters in optimal time complexity?',
    frameworkType: 'General',
    frameworkSteps: GENERAL_STEPS,
    thinkPhase: {
      mentalFramework: 'Clarify -> Brute Force O(N^3) -> Sliding Window O(N) -> Edge Cases',
      keyKeywords: ['Sliding Window', 'Two Pointers', 'Hash Map / Set', 'Time: O(N)', 'Space: O(min(N, M))'],
      pointsToAvoid: ['Writing code immediately without stating the algorithmic intuition'],
      targetDurationSec: 90,
    },
    reviewPhase: {
      goldenModelAnswer:
        '[Clarify & Brute Force] A brute force check evaluates every possible substring, checking for duplicates in O(N³) or O(N²) time, which is inefficient for large strings.\n\n[Optimized Intuition] We can optimize this to O(N) time using the Sliding Window technique with two pointers and a Hash Map storing each character’s last seen index.\n\n[Algorithm Walkthrough] We maintain a left pointer `L` and expand a right pointer `R` across the string. When we encounter a character already in our map at index `idx` (where `idx >= L`), we jump `L` immediately to `idx + 1`, eliminating the duplicate from our current active window. At each step, we update the maximum length as `R - L + 1` and record the character’s new index.\n\n[Complexity] Time complexity is strictly linear O(N) because each character is visited at most twice. Space complexity is O(min(N, AlphabetSize)) to store the map.',
      keyPhrases: [
        'The brute force approach requires O(N^2), but we can optimize to O(N)...',
        'By utilizing the Sliding Window pattern with a hash map...',
        'When a duplicate is detected within the active window...',
        'This guarantees linear O(N) time complexity because...',
      ],
      checklist: [
        'Explained why brute force is suboptimal',
        'Walked through two-pointer sliding window mechanics clearly',
        'Accurately stated Time and Space complexity',
      ],
    },
    improvePhase: {
      vocabularyUpgrades: [
        { from: 'We use a loop and move pointers', to: 'We maintain a dynamic sliding window bounded by left and right index pointers' },
      ],
      concisenessTips: ['Do not recite code line-by-line; explain the invariant of the window.'],
      commonTrap: 'Forgetting to check if the duplicate index is actually inside the current window (`idx >= L`).',
    },
  },

  // =========================================================================
  // 7. AIML
  // =========================================================================
  {
    id: 'aiml_1',
    category: 'aiml',
    categoryTitle: 'AI & Machine Learning',
    difficulty: 'Intermediate',
    question: 'Explain how Retrieval-Augmented Generation (RAG) works and how you prevent hallucinations in LLM applications.',
    frameworkType: 'Technical',
    frameworkSteps: TECHNICAL_STEPS,
    thinkPhase: {
      mentalFramework: 'Definition -> 3-Stage Pipeline (Ingest, Retrieve, Generate) -> Hallucination Guardrails -> Production Metrics',
      keyKeywords: ['Embeddings', 'Vector Database', 'Cosine similarity', 'Context injection', 'Grounding', 'Re-ranking', 'Chunking strategy'],
      pointsToAvoid: ['Saying RAG fine-tunes the model weights (RAG retrieves context, fine-tuning modifies weights)'],
      targetDurationSec: 100,
    },
    reviewPhase: {
      goldenModelAnswer:
        '[Definition] Retrieval-Augmented Generation (RAG) is an architectural pattern that enhances Large Language Models by retrieving relevant factual documents from an external vector knowledge base and injecting them into the model’s prompt at inference time.\n\n[Explanation] The pipeline works in two phases: During ingestion, proprietary documents are chunked, converted to dense vector embeddings, and indexed in a vector store like Pinecone or Qdrant. During query time, the user’s prompt is embedded, top-k semantically similar chunks are retrieved via cosine similarity, and both the question and retrieved chunks are passed into the LLM with explicit system instructions to base its answer solely on the provided context.\n\n[Example] Think of standard LLMs like taking an open-book exam relying only on memory; RAG provides the exact relevant textbook pages before answering.\n\n[Application & Guardrails] To prevent hallucinations, I enforce strict chunking strategies with overlap, apply cross-encoder re-ranking to filter irrelevant chunks, and instruct the system prompt to explicitly respond "I do not have sufficient information" if retrieved context confidence falls below a set threshold.',
      keyPhrases: [
        'RAG combines dense vector retrieval with LLM generation...',
        'During query time, semantic similarity search retrieves...',
        'To ground responses and eliminate hallucinations, we implement...',
      ],
      checklist: [
        'Distinguished between retrieval ingestion and inference generation',
        'Explained vector similarity and context injection',
        'Covered re-ranking and fallback thresholds for hallucination prevention',
      ],
    },
    improvePhase: {
      vocabularyUpgrades: [
        { from: 'It searches text and gives it to AI', to: 'It performs dense semantic retrieval over a vector database to inject grounded context' },
      ],
      concisenessTips: ['Clarify that RAG updates knowledge without expensive model re-training.'],
      commonTrap: 'Confusing fine-tuning with RAG retrieval.',
    },
  },

  // =========================================================================
  // 8. SITUATIONAL JUDGEMENT
  // =========================================================================
  {
    id: 'sit_1',
    category: 'situational',
    categoryTitle: 'Situational Judgement',
    difficulty: 'Intermediate',
    question: 'How do you handle a situation where a major feature is 3 days from release, but critical acceptance tests are failing?',
    frameworkType: 'General',
    frameworkSteps: GENERAL_STEPS,
    thinkPhase: {
      mentalFramework: 'Assess Scope -> Communicate Early -> Propose Decoupled Mitigation / Feature Flag -> Post-Mortem',
      keyKeywords: ['Triage', 'Feature flag', 'Scope negotiation', 'Transparent communication', 'De-risk launch'],
      pointsToAvoid: ['Hiding the delay until launch day', 'Shipping broken code silently'],
      targetDurationSec: 75,
    },
    reviewPhase: {
      goldenModelAnswer:
        'When critical tests fail near a deadline, my first priority is transparent risk management. I immediately triage the failures to determine whether they represent core architectural blockers or edge-case regressions. Rather than keeping quiet, I alert my engineering lead and product manager with a clear impact assessment. I then propose wrapping the unstable sub-module behind a feature flag so the stable core release ships on time, while scheduling the failing component for a dedicated patch release after thorough automated testing.',
      keyPhrases: [
        'My first step is to perform rapid triage...',
        'I communicate early and transparently with stakeholders...',
        'I propose de-risking the release using feature flags...',
      ],
      checklist: [
        'Demonstrated proactive communication',
        'Offered practical technical mitigation (feature flags / scope decoupling)',
      ],
    },
    improvePhase: {
      vocabularyUpgrades: [
        { from: 'I will work overnight to fix it', to: 'I will triage the root cause, communicate risk, and isolate unstable paths behind feature flags' },
      ],
      concisenessTips: ['Highlight that protecting production stability comes before arbitrary deadlines.'],
      commonTrap: 'Saying you would just push the code and hope for the best.',
    },
  },

  // =========================================================================
  // 9. WORKPLACE & TEAMWORK
  // =========================================================================
  {
    id: 'work_1',
    category: 'workplace',
    categoryTitle: 'Workplace & Teamwork',
    difficulty: 'Intermediate',
    question: 'How do you handle receiving critical or blunt feedback during a pull request code review?',
    frameworkType: 'General',
    frameworkSteps: GENERAL_STEPS,
    thinkPhase: {
      mentalFramework: 'Ego Separation -> Clarifying Intent -> Implementing Quality -> Shared Team Standards',
      keyKeywords: ['Constructive feedback', 'Code quality', 'Ego-free mindset', 'Continuous learning', 'Team standards'],
      pointsToAvoid: ['Taking code comments personally', 'Starting an argumentative comment war'],
      targetDurationSec: 60,
    },
    reviewPhase: {
      goldenModelAnswer:
        'I view code reviews as a collaborative mechanism to protect production reliability and elevate code quality, never as a personal critique. When I receive blunt feedback, I separate my ego from the code, evaluate the reviewer’s technical reasoning objectively, and ask clarifying questions if alternative patterns were suggested. If the suggestion improves performance or readability, I implement it immediately. If there is a trade-off debate, I hop on a brief 5-minute sync to align quickly rather than engaging in long comment threads.',
      keyPhrases: [
        'I view code reviews as an opportunity to protect system quality...',
        'I separate my personal ego from the code...',
        'For complex trade-offs, I prefer a quick 5-minute sync...',
      ],
      checklist: [
        'Expressed mature, non-defensive mindset',
        'Showed preference for quick resolution over bikeshedding',
      ],
    },
    improvePhase: {
      vocabularyUpgrades: [
        { from: 'I do not get angry', to: 'I separate personal ego from the code and evaluate technical trade-offs objectively' },
      ],
      concisenessTips: ['Keep the focus on code maintainability and team velocity.'],
      commonTrap: 'Sounding passive-aggressive about reviewers.',
    },
  },

  // =========================================================================
  // 10. RECRUITER SCREENING
  // =========================================================================
  {
    id: 'rec_1',
    category: 'recruiter',
    categoryTitle: 'Recruiter Screening',
    difficulty: 'Beginner',
    question: 'What are you looking for in your next software engineering role?',
    frameworkType: 'General',
    frameworkSteps: GENERAL_STEPS,
    thinkPhase: {
      mentalFramework: 'Technical Growth -> High-Impact Team -> Solving Meaningful Engineering Challenges',
      keyKeywords: ['Technical ownership', 'High-velocity team', 'Scalable architecture', 'Continuous learning'],
      pointsToAvoid: ['Complaining about current manager or salary', 'Sounding directionless'],
      targetDurationSec: 60,
    },
    reviewPhase: {
      goldenModelAnswer:
        'In my next role, I am looking to join an ambitious engineering team where I can take ownership of end-to-end features, contribute to scalable full-stack and AI architectures, and collaborate closely with experienced engineers. I thrive in environments that value clean code, strong testing practices, and fast feedback loops, which is why your team’s focus on building high-impact developer tooling is an ideal fit.',
      keyPhrases: [
        'In my next role, I am seeking an environment where...',
        'I am excited to take technical ownership of...',
        'I thrive in engineering cultures that prioritize...',
      ],
      checklist: [
        'Answered in under 45 seconds',
        'Showed ambition for technical ownership and teamwork',
      ],
    },
    improvePhase: {
      vocabularyUpgrades: [
        { from: 'I want a good company and high package', to: 'I am seeking a high-velocity team where I can take technical ownership of scalable systems' },
      ],
      concisenessTips: ['Keep it under 45 seconds; recruiters look for energy and clear direction.'],
      commonTrap: 'Spending time venting about past employers.',
    },
  },
];

/**
 * Helper to get questions by category.
 */
export function getInterviewQuestionsByCategory(category?: InterviewCategory): InterviewQuestion[] {
  if (!category) return INTERVIEW_QUESTIONS_BANK;
  return INTERVIEW_QUESTIONS_BANK.filter((q) => q.category === category);
}

export const getQuestionsByCategory = getInterviewQuestionsByCategory;

/**
 * Helper to get questions by difficulty.
 */
export function getInterviewQuestionsByDifficulty(difficulty?: QuestionDifficulty): InterviewQuestion[] {
  if (!difficulty) return INTERVIEW_QUESTIONS_BANK;
  return INTERVIEW_QUESTIONS_BANK.filter((q) => q.difficulty.toLowerCase() === difficulty.toLowerCase());
}

/**
 * Helper to get random questions for mock interview simulation.
 */
export function getRandomMockQuestions(
  category: InterviewCategory | 'mixed',
  difficulty: QuestionDifficulty | 'mixed',
  count: number = 5
): InterviewQuestion[] {
  let pool = [...INTERVIEW_QUESTIONS_BANK];
  if (category !== 'mixed') {
    pool = pool.filter((q) => q.category === category);
  }
  if (difficulty !== 'mixed') {
    pool = pool.filter((q) => q.difficulty.toLowerCase() === difficulty.toLowerCase());
  }
  if (pool.length === 0) pool = [...INTERVIEW_QUESTIONS_BANK];

  const shuffled = pool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Multi-dimensional evaluation algorithm.
 * Evaluates communication on:
 * - Clarity
 * - Structure
 * - Relevance
 * - Confidence
 * - Technical Accuracy
 * - Conciseness
 * (Does NOT make score depend solely on grammar!)
 */
export interface EvaluationDimensions {
  clarityScore: number; // 0 - 100
  structureScore: number; // 0 - 100
  relevanceScore: number; // 0 - 100
  confidenceScore: number; // 0 - 100
  technicalAccuracyScore: number; // 0 - 100
  concisenessScore: number; // 0 - 100
  overallScore: number; // 0 - 100
  strengths: string[];
  weakAreas: string[];
  targetedDrillRecommendations: string[];
  recommendations: string[]; // alias
  actionableFeedback: string;
}

export type InterviewEvaluationResult = EvaluationDimensions;

export interface EvaluateResponseOptions {
  question: InterviewQuestion;
  freeformAnswer?: string;
  stepAnswers?: string[];
  userConfidenceRating?: number;
  fillerWordCount?: number;
}

export function evaluateInterviewResponse(
  questionOrOptions: InterviewQuestion | EvaluateResponseOptions,
  answerTextArg?: string,
  timeTakenSeconds?: number
): EvaluationDimensions {
  let question: InterviewQuestion;
  let answerText: string = '';
  let userConfidenceRating: number = 4;
  let explicitFillerCount: number = 0;

  if ('category' in questionOrOptions && 'question' in questionOrOptions) {
    question = questionOrOptions as InterviewQuestion;
    answerText = answerTextArg || '';
  } else {
    const opts = questionOrOptions as EvaluateResponseOptions;
    question = opts.question;
    answerText = [opts.freeformAnswer, ...(opts.stepAnswers || [])].filter(Boolean).join(' ');
    userConfidenceRating = opts.userConfidenceRating ?? 4;
    explicitFillerCount = opts.fillerWordCount ?? 0;
  }

  const cleanAnswer = answerText.trim();
  const wordCount = cleanAnswer.split(/\s+/).filter(Boolean).length;
  const lowerAnswer = cleanAnswer.toLowerCase();

  // 1. Structure Score: check framework markers
  let structurePoints = 70;
  const normFramework = question.frameworkType.toLowerCase();

  if (normFramework.includes('star')) {
    const hasSituation = lowerAnswer.includes('situation') || lowerAnswer.includes('context') || lowerAnswer.includes('when') || lowerAnswer.includes('while');
    const hasTask = lowerAnswer.includes('task') || lowerAnswer.includes('objective') || lowerAnswer.includes('challenge') || lowerAnswer.includes('needed to');
    const hasAction = lowerAnswer.includes('action') || lowerAnswer.includes('implemented') || lowerAnswer.includes('built') || lowerAnswer.includes('refactored') || lowerAnswer.includes('i did');
    const hasResult = lowerAnswer.includes('result') || lowerAnswer.includes('outcome') || lowerAnswer.includes('reduced') || lowerAnswer.includes('percent') || lowerAnswer.includes('achieved');

    let starHits = 0;
    if (hasSituation) starHits++;
    if (hasTask) starHits++;
    if (hasAction) starHits++;
    if (hasResult) starHits++;
    structurePoints = Math.min(100, 50 + starHits * 12);
  } else if (normFramework.includes('tech')) {
    const hasDef = lowerAnswer.includes('is a') || lowerAnswer.includes('refers to') || lowerAnswer.includes('means');
    const hasEx = lowerAnswer.includes('for example') || lowerAnswer.includes('like') || lowerAnswer.includes('instance');
    const hasApp = lowerAnswer.includes('production') || lowerAnswer.includes('use case') || lowerAnswer.includes('trade-off') || lowerAnswer.includes('in practice');
    structurePoints = 65 + (hasDef ? 12 : 0) + (hasEx ? 12 : 0) + (hasApp ? 11 : 0);
  } else if (normFramework.includes('project')) {
    const hasProblem = lowerAnswer.includes('problem') || lowerAnswer.includes('struggle') || lowerAnswer.includes('friction');
    const hasTech = lowerAnswer.includes('react') || lowerAnswer.includes('next') || lowerAnswer.includes('python') || lowerAnswer.includes('sql') || lowerAnswer.includes('tech');
    const hasChallenge = lowerAnswer.includes('challenge') || lowerAnswer.includes('bottleneck') || lowerAnswer.includes('bug') || lowerAnswer.includes('issue');
    const hasResult = lowerAnswer.includes('result') || lowerAnswer.includes('metric') || lowerAnswer.includes('reduced') || lowerAnswer.includes('improved');
    structurePoints = 60 + (hasProblem ? 10 : 0) + (hasTech ? 10 : 0) + (hasChallenge ? 10 : 0) + (hasResult ? 10 : 0);
  } else {
    structurePoints = wordCount > 40 ? 85 : 70;
  }
  const structureScore = Math.min(100, structurePoints);

  // 2. Relevance Score: keyword matching
  const keywordsList = question.thinkPhase?.keyKeywords || question.expectedKeywords || [];
  let matchedKeywords = 0;
  keywordsList.forEach((kw) => {
    if (lowerAnswer.includes(kw.toLowerCase())) matchedKeywords++;
  });
  const keywordRatio = keywordsList.length > 0 ? matchedKeywords / keywordsList.length : 0.6;
  const relevanceScore = Math.min(100, Math.round(60 + keywordRatio * 40));

  // 3. Technical Accuracy Score
  const technicalKeywords = [
    'latency', 'async', 'cache', 'database', 'architecture', 'api', 'component',
    'throughput', 'concurrency', 'state', 'model', 'embeddings', 'sql', 'redis',
    'trade-off', 'benchmark', 'scale', 'microservice', 'pipeline', 'deployment',
  ];
  let techHits = 0;
  technicalKeywords.forEach((tk) => {
    if (lowerAnswer.includes(tk)) techHits++;
  });
  const technicalAccuracyScore = Math.min(100, 65 + Math.min(35, techHits * 6));

  // 4. Confidence Score: active voice vs excessive hedging/fillers
  const fillers = ['basically', 'actually', 'sort of', 'kind of', 'maybe', 'i think like', 'you know', 'um', 'uh'];
  let detectedFillers = explicitFillerCount;
  fillers.forEach((f) => {
    if (lowerAnswer.includes(f)) detectedFillers++;
  });
  const baseConfidence = userConfidenceRating * 18;
  const confidenceScore = Math.max(50, Math.min(100, baseConfidence - detectedFillers * 4 + (wordCount > 40 ? 10 : 0)));

  // 5. Conciseness Score
  let concisenessScore = 85;
  if (wordCount < 20) concisenessScore = 60; // too short
  else if (wordCount > 300) concisenessScore = 70; // rambling
  else if (wordCount >= 50 && wordCount <= 180) concisenessScore = 95; // sweet spot

  // 6. Clarity Score
  const clarityScore = Math.round(structureScore * 0.4 + relevanceScore * 0.3 + confidenceScore * 0.3);

  // Overall Weighted Score (Not grammar dependent!)
  const overallScore = Math.round(
    clarityScore * 0.2 +
    structureScore * 0.2 +
    relevanceScore * 0.2 +
    confidenceScore * 0.15 +
    technicalAccuracyScore * 0.15 +
    concisenessScore * 0.1
  );

  // Generate dynamic Strengths, Weak Areas, and Recommendations
  const strengths: string[] = [];
  const weakAreas: string[] = [];
  const targetedDrillRecommendations: string[] = [];

  if (structureScore >= 80) strengths.push('Strong adherence to the recommended delivery framework.');
  else weakAreas.push('Answer structure could be clearer. Break your narrative into explicit ordered phases.');

  if (technicalAccuracyScore >= 80) strengths.push('Used authoritative technical terminology and specific engineering mechanics.');
  else weakAreas.push('Could incorporate deeper technical specifics (e.g. mention trade-offs, architecture layers, or profiling tools).');

  if (confidenceScore >= 80) strengths.push('Decisive, active voice delivery with minimal filler hesitation.');
  else weakAreas.push('Watch out for filler words ("basically", "sort of") that can dilute executive presence.');

  if (concisenessScore >= 85) strengths.push('Well-paced delivery within the target interview sweet spot.');
  else if (wordCount < 30) weakAreas.push('Response is too brief; elaborate with a concrete engineering example or metric.');
  else weakAreas.push('Response is slightly long; tighten your phrasing by eliminating repeated background context.');

  // Targeted practice recommendations based on category
  const cat = question.category;
  if (cat === 'behavioral') {
    targetedDrillRecommendations.push('Practice the STAR Action step: detail 3 specific technical decisions YOU personally made.');
  } else if (cat === 'technical') {
    targetedDrillRecommendations.push('Practice 1-sentence definitions followed immediately by real-world trade-offs.');
  } else if (cat === 'project') {
    targetedDrillRecommendations.push('Emphasize the Challenge & Solution: what broke, how did you analyze logs, and what metric improved?');
  } else if (cat === 'dsa_explanation') {
    targetedDrillRecommendations.push('State Time and Space complexity upfront before detailing pointer movements.');
  } else {
    targetedDrillRecommendations.push('Practice opening with a punchy 10-second claim before providing supporting evidence.');
  }

  const actionableFeedback =
    overallScore >= 85
      ? 'Outstanding response! Your answer demonstrates strong technical conviction, clear structure, and professional pacing.'
      : overallScore >= 70
      ? 'Solid performance. To elevate this from good to elite, emphasize your measurable outcomes and eliminate any lingering filler phrases.'
      : 'Good foundation. Focus on structuring your answer around the provided framework and grounding your claims with concrete technical examples.';

  return {
    clarityScore,
    structureScore,
    relevanceScore,
    confidenceScore,
    technicalAccuracyScore,
    concisenessScore,
    overallScore,
    strengths: strengths.length > 0 ? strengths : ['Communicative intent and enthusiasm are clear.'],
    weakAreas: weakAreas.length > 0 ? weakAreas : ['Continue refining pacing and metric quantification.'],
    targetedDrillRecommendations,
    recommendations: targetedDrillRecommendations,
    actionableFeedback,
  };
}

