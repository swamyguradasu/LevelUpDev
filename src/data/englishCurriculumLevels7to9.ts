import { CurriculumLevel, CurriculumModule, CurriculumTopic, PracticeExercise } from './englishCurriculumLevels0to3';

// =========================================================================
// LEVEL 7: PROFESSIONAL WORKPLACE COMMUNICATION (WEEKS 10–14)
// =========================================================================
export const LEVEL_7_PROFESSIONAL_COMM: CurriculumLevel = {
  id: 'level-7-professional-comm',
  levelNumber: 7,
  levelCode: 'LEVEL 7',
  title: 'Professional Workplace & Meeting Mastery',
  weeks: 'Weeks 10–14',
  objective: 'Master corporate collaboration, cross-functional agile meetings, slide presentation delivery, and executive communication presence.',
  badge: 'Workplace Leader',
  iconName: 'Briefcase',
  modules: [
    {
      id: 'module-20-workplace-english',
      moduleNumber: 20,
      title: 'Daily Workplace Communication & Team Alignment',
      description: 'Giving updates, asking for help, giving/receiving feedback, discussing deadlines, and reporting problems.',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-20-1-asking-help-blockers',
          title: 'Asking for Help & Escalating Blockers',
          summary: 'How to ask senior teammates or leads for assistance without wasting their time.',
          coreConcept: 'The 3-Part Help Request: 1. What I am trying to achieve -> 2. What I have already tried -> 3. The exact blocker.',
          whyItMatters: 'Senior engineers appreciate proactive, well-researched questions; they dislike vague "it does not work" messages.',
          lessonContent: {
            overview: 'Learn how to write high-signal Slack/Teams requests for assistance.',
            keyPoints: [
              'Bad: "Hi, code is not running, please check."',
              'Good: "Hi Alex, I am working on the Stripe webhook integration (Ticket-412). I have verified the payload signing secret and endpoint route; however, the HMAC signature verification fails on test payloads. I have documented the curl reproduction script here. Could we pair for 10 minutes after lunch?"',
            ],
          },
          practice: {
            id: 'prac-20-1',
            type: 'speech',
            prompt: 'Deliver a 45-second verbal request to a senior engineer asking for help with a Docker network bridge configuration error.',
            targetDurationSeconds: 45,
            sampleAnswer: 'Hi David, I am configuring the Docker network bridge for our microservice suite. I have verified that the container ports are exposed and DNS resolution works locally; however, the worker service cannot establish a TCP handshake with the PostgreSQL container. I have logged the container inspect output in this gist. Do you have 10 minutes today to review the compose network configuration?',
            rubricOrTips: ['Clear goal stated.', 'Documented steps already tried.', 'Specific time request.'],
          },
        },
      ],
    },
    {
      id: 'module-21-meetings',
      moduleNumber: 21,
      title: 'Agile Meetings & Active Participation',
      description: 'Joining meetings, interjecting gracefully, sharing ideas, agreeing, disagreeing, and summarizing action items.',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-21-1-meeting-interjections',
          title: 'Graceful Meeting Interjections & Idea Sharing',
          summary: 'Phrases to enter active discussions smoothly without interrupting awkwardly.',
          coreConcept: 'Use verbal bridge cues to signal that you have a valuable technical perspective to contribute.',
          whyItMatters: 'Silent engineers are often overlooked for promotions and lead roles even if their code is excellent.',
          lessonContent: {
            overview: 'Master the 5 essential interjection formulas for engineering meetings.',
            keyPoints: [
              'Do not wait for complete silence in large remote meetings; use respectful bridge phrases like "If I could jump in here...".',
              'Acknowledge previous speakers before pivoting to validate their input and build collaborative consensus.',
              'Always tie suggestions back to tangible metrics: developer velocity, reduced cloud costs, or lower latency.',
            ],
            templatesOrPatterns: [
              { pattern: 'If I could jump in here with a quick thought on [Topic]...', example: 'If I could jump in here with a quick thought on database sharding...', usageTip: 'Joining discussion' },
              { pattern: 'Building on what [Colleague] mentioned about [Point]...', example: 'Building on what Priya mentioned about latency, we could also cache session tokens.', usageTip: 'Additive collaboration' },
              { pattern: 'To summarize our key action items before we wrap up...', example: 'To summarize our key action items: Swamy will draft the RFC by Wednesday, and Alex will review staging metrics.', usageTip: 'Meeting wrap-up' },
            ],
          },
          practice: {
            id: 'prac-21-1',
            type: 'speech',
            prompt: 'Practice interjecting in a sprint planning meeting to propose adding automated linting checks to the CI pipeline.',
            targetDurationSeconds: 45,
            sampleAnswer: 'If I could jump in here with a quick thought on our code review velocity: building on what David mentioned regarding formatting inconsistencies, we could integrate an automated ESLint and Prettier pre-commit hook. This would eliminate 80% of cosmetic review comments and allow reviewers to focus purely on business logic.',
            rubricOrTips: ['Smooth bridge phrase.', 'Additive contribution.', 'Clear engineering benefit.'],
          },
        },
      ],
    },
    {
      id: 'module-22-presentation-skills',
      moduleNumber: 22,
      title: 'Technical Presentation & Slide Deck Delivery',
      description: 'Opening hooks, introducing topics, explaining architecture diagrams, transitioning, handling Q&A, and closing.',
      estimatedMinutes: 75,
      topics: [
        {
          id: 'topic-22-1-presentation-delivery',
          title: 'The 5-Phase Technical Presentation Framework',
          summary: 'Hook -> Agenda -> Core Architecture Walkthrough -> Live Demo / Data -> Q&A Handshake.',
          coreConcept: 'Presentations must tell a story of problem, decision, and metric impact rather than reading bullet points off slides.',
          whyItMatters: 'Demoing sprint features to stakeholders and C-suite leaders builds company-wide visibility.',
          lessonContent: {
            overview: 'Learn the transitions that keep audiences engaged during technical slide reviews.',
            keyPoints: [
              'Opening: "Today, I am excited to walk you through our new real-time analytics pipeline..."',
              'Slide Transition: "Now that we have covered the ingestion layer, let us shift our attention to how worker pools handle batch serialization..."',
              'Handling Tough Questions: "That is an excellent question regarding failover latency. Let me break down our recovery sequence..."',
            ],
          },
          practice: {
            id: 'prac-22-1',
            type: 'speech',
            prompt: 'Deliver a 90-second opening and slide transition for a tech demo on a newly deployed caching layer.',
            targetDurationSeconds: 90,
            sampleAnswer: 'Good morning everyone, and thank you for joining. Today, I am excited to present the architecture and benchmark results of our newly deployed Redis caching layer. Over the past quarter, our primary objective was reducing checkout latency during peak traffic spikes. On this first slide, you can see our previous architecture where every user request hit the PostgreSQL database directly, causing p99 latency to spike above 800 milliseconds. Now, turning to our revised architecture on slide two, we introduced an in-memory cache with an LRU eviction policy. As shown in the telemetry graph, this optimization reduced database CPU utilization by 40% and brought median response times down to 35 milliseconds.',
            rubricOrTips: ['Engaging opening.', 'Clear slide transition phrase.', 'Clear data narration.'],
          },
        },
      ],
    },
  ],
};

// =========================================================================
// LEVEL 8: INTERVIEW COMMUNICATION (WEEKS 11–15)
// =========================================================================
export const LEVEL_8_INTERVIEW_COMM: CurriculumLevel = {
  id: 'level-8-interview-comm',
  levelNumber: 8,
  levelCode: 'LEVEL 8',
  title: 'Job Interview & Behavioral Mastery (STAR)',
  weeks: 'Weeks 11–15',
  objective: 'Master professional self-introductions, HR leadership questions, technical problem-solving articulation, and structured STAR behavioral storytelling for top product MNCs and startups.',
  badge: 'Interview Elite',
  iconName: 'Award',
  modules: [
    {
      id: 'module-23-self-introduction',
      moduleNumber: 23,
      title: 'The Executive "Tell Me About Yourself" Formula',
      description: 'Deliver crisp 60-second and 2-minute professional introductions: Background, Skills, Projects, and Career Trajectory.',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-23-1-pitch-mastery',
          title: 'The 4-Part Executive Introduction Blueprint',
          summary: '1. Identity & Domain -> 2. Flagship Achievements -> 3. Core Tech Competencies -> 4. Alignment with Role.',
          coreConcept: 'Your introduction must establish your technical identity immediately and guide the interviewer to ask questions about your strongest projects.',
          whyItMatters: 'Sets the positive tone and confidence baseline for the entire 60-minute interview.',
          lessonContent: {
            overview: 'Study the exact phrasing for senior engineering and graduate software roles.',
            keyPoints: [
              'Part 1: "I am a software engineer with expertise in full-stack architecture, Python, and scalable backend design."',
              'Part 2: "Recently, I designed and built LevelUpDev, a high-performance learning platform featuring dual-layer persistence, dynamic streak calculations, and interactive developer roadmaps."',
              'Part 3: "My core technical strengths include data structure optimization, asynchronous API design, and clean modular code."',
              'Part 4: "What excites me about this opportunity at your company is your engineering culture and investment in scalable AI infrastructure."',
            ],
          },
          practice: {
            id: 'prac-23-1',
            type: 'speech',
            prompt: 'Deliver your polished 90-second "Tell Me About Yourself" pitch.',
            targetDurationSeconds: 90,
            sampleAnswer: 'Hello, my name is Swamy. I am a software engineer focused on building robust full-stack applications, scalable backend APIs, and distributed systems. Over the past year, I have built production-grade web platforms with Next.js, TypeScript, and Firebase, while solving hundreds of algorithmic challenges across dynamic programming, trees, and graphs. One of my flagship achievements was architecting LevelUpDev, where I implemented complex caching and state synchronization across offline and cloud databases, achieving sub-50ms render latency. What draws me to this team is your focus on engineering excellence and high-throughput systems, where I can contribute my problem-solving skills and grow as an impactful engineer.',
            rubricOrTips: ['Strong professional hook.', 'Highlighted flagship project.', 'Natural delivery under 90s.'],
          },
        },
      ],
    },
    {
      id: 'module-24-hr-questions',
      moduleNumber: 24,
      title: 'High-Impact Answers to Standard HR & Fit Questions',
      description: 'Master answers to "Why this company?", "Why should we hire you?", "Strengths/Weaknesses", and "Where do you see yourself in 5 years?".',
      estimatedMinutes: 75,
      topics: [
        {
          id: 'topic-24-1-strengths-weaknesses',
          title: 'Authentic Strengths, Genuine Weaknesses & 5-Year Vision',
          summary: 'How to discuss strengths with evidence and weaknesses with proactive remediation.',
          coreConcept: 'Never use fake weaknesses ("I am too perfectionist"). Pick a real area of growth and show the concrete automated guardrails you built.',
          whyItMatters: 'Demonstrates self-awareness, emotional intelligence, and genuine engineering maturity.',
          lessonContent: {
            overview: 'Study the framework for discussing strengths, weaknesses, and 5-year career roadmaps.',
            keyPoints: [
              'Strength: State strength + give concrete metric evidence ("My strength is rapid architectural ramp-up; in my last project, I mastered Next.js App Router and shipped in 2 weeks.").',
              'Weakness: State past gap + show active remediation ("Early on, I spent too long over-engineering solutions before getting stakeholder feedback. Now, I create lightweight RFCs and align on core requirements within the first 24 hours.").',
            ],
          },
          practice: {
            id: 'prac-24-1',
            type: 'speech',
            prompt: 'Answer the question: "What is your greatest strength and an area you are currently improving?" in 60 seconds.',
            targetDurationSeconds: 60,
            sampleAnswer: 'My greatest strength is my disciplined problem-solving approach and consistency. When tackling complex algorithmic or system challenges, I break problems down into edge cases, baseline constraints, and optimal trade-offs. An area I am actively improving is delegating and aligning earlier during ambiguity. In past projects, I tended to solve edge cases in isolation before asking for input. Over the past six months, I have adopted a collaborative approach of drafting quick technical proposals and getting team alignment early in sprint cycles.',
            rubricOrTips: ['Evidence-backed strength.', 'Constructive, honest improvement area.', 'Polished conclusion.'],
          },
        },
      ],
    },
    {
      id: 'module-25-tech-interview-comm',
      title: 'Live Coding & System Design "Thinking Aloud"',
      moduleNumber: 25,
      description: 'Clarify constraints, state brute-force baselines, explain optimal pattern pivots, write modular code, and dry-run edge cases.',
      estimatedMinutes: 90,
      topics: [
        {
          id: 'topic-25-1-thinking-aloud-protocol',
          title: 'The 5-Step Live Coding Communication Protocol',
          summary: '1. Clarify Constraints -> 2. Brute Force Baseline -> 3. Pattern Optimization -> 4. Modular Implementation -> 5. Edge Case Dry Run.',
          coreConcept: 'Interviewers care more about your structured thought process and communication than memorized code.',
          whyItMatters: 'Silent coders fail technical interviews even if their final code passes test cases.',
          lessonContent: {
            overview: 'Study the exact vocal transitions during live algorithmic coding interviews.',
            keyPoints: [
              'Phase 1: "Before writing any code, let me clarify the constraints: Can the array contain negative numbers, and what is the maximum length of N?"',
              'Phase 2: "A brute force approach would be checking all pairs in O(N^2) time and O(1) space."',
              'Phase 3: "To optimize this, we can trade O(N) space for O(N) time using a Hash Map to store complements in a single pass."',
              'Phase 4: "Let me write out the clean implementation now, keeping functions modular and variables descriptive."',
              'Phase 5: "Now let me dry-run this logic against an empty array and a duplicate-value edge case to ensure boundaries hold."',
            ],
          },
          practice: {
            id: 'prac-25-1',
            type: 'speech',
            prompt: 'Practice narrating your thought process out loud for solving the Two Sum problem using a Hash Map.',
            targetDurationSeconds: 60,
            sampleAnswer: 'First, let me confirm constraints: We have an integer array and a target sum, and we want to return the indices of the two numbers that add up to target. The brute-force solution uses two nested loops, checking every pair in O(N^2) time. However, we can optimize this to O(N) linear time using a Hash Map. As we iterate through the array once, we calculate the complement—target minus current value. If the complement is already in our map, we return its index and our current index. If not, we insert the current value and index into the map. This achieves O(N) time and O(N) space.',
            rubricOrTips: ['Stated constraints.', 'Explained brute-force vs optimal trade-off.', 'Clean complexity analysis.'],
          },
        },
      ],
    },
    {
      id: 'module-26-behavioral-star',
      moduleNumber: 26,
      title: 'STAR Behavioral Storytelling (Conflict, Failure, Leadership)',
      description: 'Master Situation (15s), Task (15s), Action (45s), and Result (30s) across all behavioral interview domains.',
      estimatedMinutes: 90,
      topics: [
        {
          id: 'topic-26-1-star-conflict',
          title: 'STAR Story: Resolving a Technical Disagreement',
          summary: 'How to structure a high-scoring story about technical disagreement with a team member.',
          coreConcept: 'Anchoring discussions in data and automated benchmarks rather than emotional ego debates.',
          whyItMatters: 'Top tier tech companies (Amazon, Google, Microsoft) weigh behavioral rounds equally with coding rounds.',
          lessonContent: {
            overview: 'Learn how to balance Situation (15s), Task (15s), Action (45s), and Result (30s).',
            keyPoints: [
              'Situation: Real-time notification engine debate between client polling vs WebSockets.',
              'Task: Deliver features on tight schedule while preventing backend server saturation.',
              'Action: Conducted a 30-minute benchmark spike, simulated 10k users, presented CPU telemetry data collaboratively.',
              'Result: Adopted WebSockets, launched on time with <15% CPU load and sub-50ms latency.',
            ],
          },
          practice: {
            id: 'prac-26-1',
            type: 'star-builder',
            prompt: 'Deliver your complete STAR story answering: "Tell me about a time you had a technical disagreement with a teammate."',
            targetDurationSeconds: 105,
            sampleAnswer: 'Situation: In our team project, we were deciding how to implement real-time status updates for our dashboard. My teammate suggested continuous client-side polling every 2 seconds to ship quickly, while I proposed Server-Sent Events to minimize server load. Task: My responsibility was to ensure we met our deadline without risking backend server crashes during high traffic. Action: Rather than arguing preferences, I built a quick 30-minute benchmark simulating 5,000 concurrent clients. The data demonstrated that polling generated over 150,000 requests per minute and 75% CPU load, whereas Server-Sent Events used under 10% CPU. I shared this telemetry data with my teammate along with a phased integration plan. Result: He agreed with the data-driven proposal, and we shipped on schedule with zero server degradation and sub-50ms latency.',
            rubricOrTips: ['Balanced timing across S-T-A-R.', 'Empirical data-driven action.', 'Quantified numerical result.'],
          },
        },
      ],
    },
  ],
};

// =========================================================================
// LEVEL 9: ADVANCED PROFESSIONAL & JOB-READY COMMUNICATION (WEEKS 15–16)
// =========================================================================
export const LEVEL_9_ADVANCED_JOB_READY: CurriculumLevel = {
  id: 'level-9-advanced-job-ready',
  levelNumber: 9,
  levelCode: 'LEVEL 9',
  title: 'Advanced Professional & Job-Ready Polish',
  weeks: 'Weeks 15–16',
  objective: 'Eliminate conversational filler words, master the PREP (Point, Reason, Example, Point) framework, cultivate unshakeable confidence, and complete simulated job-ready communication scenarios.',
  badge: 'Job Ready Elite',
  iconName: 'TrendingUp',
  modules: [
    {
      id: 'module-27-clarity-fillers',
      moduleNumber: 27,
      title: 'Clarity & Filler Word Elimination',
      description: 'Remove repetitive fillers ("actually", "basically", "like", "you know", "umm") and practice crisp, concise technical answers.',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-27-1-zero-filler-technique',
          title: 'The Silent Pause Technique for Zero Fillers',
          summary: 'Replace vocal fillers with confident 1-second silent pauses while breathing calmly.',
          coreConcept: 'Listeners perceive silent pauses as deliberate executive thought, whereas fillers sound uncertain and unprepared.',
          whyItMatters: 'Eliminating filler words instantly doubles the perceived maturity of your answers.',
          lessonContent: {
            overview: 'Learn why the brain generates "um/like/basically" and how to silence the vocal cord during thought transitions.',
            keyPoints: [
              'When thinking: Close your lips and breathe through your nose for 1 second.',
              'Never start an answer with "Basically..." or "Actually speaking...".',
              'Trim unnecessary qualifiers: Say "The database query is unindexed" instead of "Actually, basically what happened is the database is slow."',
            ],
          },
          practice: {
            id: 'prac-27-1',
            type: 'speech',
            prompt: 'Explain why Microservices are decoupled from Monoliths in 45 seconds with ZERO filler words (no "um", "like", "basically").',
            targetDurationSeconds: 45,
            sampleAnswer: 'Microservice architectures decouple large monolithic applications into independent, autonomous services. Each service owns its dedicated database and business domain. This enables teams to deploy features independently, scale individual compute bottlenecks, and isolate failures without taking down the entire system.',
            rubricOrTips: ['Zero filler words.', 'Confident silent pauses.', 'Crisp, punchy sentence delivery.'],
          },
        },
      ],
    },
    {
      id: 'module-28-confidence-handling-unknowns',
      moduleNumber: 28,
      title: 'Confidence & Handling Unknown Questions',
      description: 'Speak without hesitation, handle unfamiliar technical questions with poise, and correct yourself naturally.',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-28-1-handling-unfamiliar',
          title: 'The 3-Step Strategy for Unfamiliar Technical Questions',
          summary: '1. Acknowledge baseline -> 2. Connect to first-principles or adjacent tech -> 3. Reason through hypothesis.',
          coreConcept: 'Interviewers often ask questions outside your domain intentionally to test how you reason under uncertainty.',
          whyItMatters: 'Saying a flat "I don not know" ends the conversation; reasoning from first principles showcases engineering intellect.',
          lessonContent: {
            overview: 'Master the hypothesis reasoning formula.',
            keyPoints: [
              'Step 1: "While I have not worked directly with Cassandra in production..."',
              'Step 2: "...I am deeply familiar with distributed NoSQL concepts like consistent hashing and LSM-trees."',
              'Step 3: "Based on those first principles, I would hypothesize that Cassandra optimizes write throughput by appending to an in-memory memtable before flushing to SSTables on disk."',
            ],
          },
          practice: {
            id: 'prac-28-1',
            type: 'speech',
            prompt: 'Practice answering an unfamiliar question: "How would you design a distributed cache invalidation strategy?" using first principles.',
            targetDurationSeconds: 60,
            sampleAnswer: 'While distributed cache invalidation is known as one of the hardest challenges in computer science, we can reason through it using two foundational patterns: TTL-based expiration and event-driven invalidation. For data where eventual consistency is acceptable, setting a short TTL minimizes stale reads with zero operational overhead. For critical data like user permissions, publishing a cache eviction event over a pub/sub topic whenever records are updated ensures near real-time synchronization across all distributed nodes.',
            rubricOrTips: ['Structured first-principles reasoning.', 'Clean trade-off comparison.', 'Confident tone.'],
          },
        },
      ],
    },
    {
      id: 'module-29-prep-framework',
      moduleNumber: 29,
      title: 'Structured Communication with PREP',
      description: 'Master the PREP formula: Point (10s) -> Reason (20s) -> Example (30s) -> Point / Conclusion (10s).',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-29-1-prep-mastery',
          title: 'The PREP Formula for Executive Technical Pitching',
          summary: 'Point -> Reason -> Example -> Point. The most persuasive framework in business and engineering.',
          coreConcept: 'Executive audiences want your conclusion first (Point), supported by clear technical causality and evidence.',
          whyItMatters: 'Ensures your answers never drift off-topic or leave interviewers confused.',
          lessonContent: {
            overview: 'Study how to apply PREP to architectural proposals and interview questions.',
            keyPoints: [
              'Point: "We should adopt TypeScript across our entire frontend codebase."',
              'Reason: "Because static typing catches 15% of runtime bugs during compilation rather than in production."',
              'Example: "In our last sprint, an undefined property error caused a staging crash that TypeScript would have caught instantly at build time."',
              'Point: "Therefore, adopting TypeScript will significantly elevate code stability and developer velocity."',
            ],
          },
          practice: {
            id: 'prac-29-1',
            type: 'speech',
            prompt: 'Use the PREP framework to persuade an engineering manager to invest 1 day in writing automated integration tests.',
            targetDurationSeconds: 60,
            sampleAnswer: 'Point: We should invest one day this sprint to implement automated integration tests for our checkout API. Reason: Because manual testing before each deployment is consuming two hours of QA time and still missing edge-case regression bugs. Example: Last week, a minor database schema change broke payment confirmation, which was only discovered after user complaints in production. Point: Therefore, spending one day on automated integration tests will protect revenue and save our team dozens of hours in manual testing every month.',
            rubricOrTips: ['Followed P-R-E-P explicitly.', 'Compelling business ROI argument.', 'Concise delivery under 60s.'],
          },
        },
      ],
    },
    {
      id: 'module-30-job-ready-capstone',
      moduleNumber: 30,
      title: 'Job-Ready Capstone Simulation & Final Readiness',
      description: 'Comprehensive simulation: Mock interview, technical presentation, project walkthrough, and recruiter negotiation.',
      estimatedMinutes: 120,
      topics: [
        {
          id: 'topic-30-1-final-simulation',
          title: 'The Final Job-Ready Comprehensive Simulation',
          summary: 'The ultimate graduation simulation combining technical explanation, STAR storytelling, and executive presence.',
          coreConcept: 'You have progressed through sentence foundations, thinking in English, technical vocabulary, and interview storytelling.',
          whyItMatters: 'Validates that you are 100% prepared to excel in interviews, meetings, and global engineering teamwork.',
          lessonContent: {
            overview: 'Review your 10-level journey and practice the final capstone interview simulation.',
            keyPoints: [
              '1. Clear vocal projection with natural pacing (120-140 WPM).',
              '2. Zero reliance on internal Telugu translation.',
              '3. Structured answers using STAR and PREP frameworks.',
              '4. Precision technical terminology and blameless collaborative tone.',
            ],
          },
          practice: {
            id: 'prac-30-1',
            type: 'speech',
            prompt: 'Deliver your final capstone graduation speech (2 minutes): Summarize your technical skillset, flagship project architecture, how you handle complex engineering challenges, and why you are ready to excel as a software/AI engineer.',
            targetDurationSeconds: 120,
            sampleAnswer: 'Hello, my name is Swamy, and I am a software engineer dedicated to building scalable backend systems, robust full-stack applications, and performant data pipelines. Over the course of my engineering journey, I have focused on mastering both technical foundations and clear professional communication. My flagship project, LevelUpDev, demonstrates my ability to architect dual-layer persistence, manage complex state synchronization, and build sub-50ms user experiences with Next.js, TypeScript, and Firebase. When solving challenging algorithmic and system design problems, I anchor my decisions in first principles—analyzing time-space complexity, evaluating database trade-offs, and proactively addressing edge cases. Furthermore, I believe that engineering excellence requires strong team collaboration, constructive code reviews, and transparent communication. I am excited to bring my technical rigor, problem-solving passion, and continuous growth mindset to an ambitious engineering team.',
            rubricOrTips: [
              'Flawless executive presence.',
              'Structured coverage of skills, project, and leadership values.',
              'Confident, professional, natural delivery.',
            ],
          },
        },
      ],
    },
  ],
};
