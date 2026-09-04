import { CurriculumLevel, CurriculumModule, CurriculumTopic, PracticeExercise } from './englishCurriculumLevels0to3';

// =========================================================================
// LEVEL 4: LISTENING & SHADOWING (WEEKS 5–10)
// =========================================================================
export const LEVEL_4_LISTENING_SHADOWING: CurriculumLevel = {
  id: 'level-4-listening-shadowing',
  levelNumber: 4,
  levelCode: 'LEVEL 4',
  title: 'Listening & Shadowing Mastery',
  weeks: 'Weeks 5–10',
  objective: 'Train auditory comprehension of diverse international accents and master the Shadowing Technique (Listen -> Pause -> Repeat -> Compare -> Polish) for natural sentence melody and pacing.',
  badge: 'Shadowing Pro',
  iconName: 'Headphones',
  modules: [
    {
      id: 'module-12-listening',
      moduleNumber: 12,
      title: 'Active Technical Listening & Keyword Extraction',
      description: 'Filter conversational noise, extract technical constraints, and parse rapid multi-accent speech.',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-12-1-identifying-keywords',
          title: 'Identifying Action Items & Technical Constraints',
          summary: 'Techniques to extract the core requirements when stakeholders speak quickly.',
          coreConcept: 'Focus on content words (nouns, verbs, metrics, deadlines) and filter out filler conversational preambles.',
          whyItMatters: 'In global sprint planning meetings, missing a key constraint leads to major rework.',
          lessonContent: {
            overview: 'Learn how to mentally bracket sentences into Subject, Action, Constraint, and Deadline.',
            keyPoints: [
              'Pay special attention to modal emphasis ("We MUST deploy" vs "We COULD consider").',
              'Listen for negation markers ("Do not", "Avoid", "Exclude").',
              'Write down numerical values immediately (SLA ms, QPS, dates).',
            ],
          },
          practice: {
            id: 'prac-12-1',
            type: 'quiz',
            prompt: 'Stakeholder briefing: "Although we initially discussed Redis clustering, our immediate priority for Sprint 12 is migrating the auth service to JWT tokens with a 15-minute expiry. Redis caching will be deferred to next month." What is the immediate deliverable for Sprint 12?',
            options: [
              'Redis cluster migration',
              'Auth service migration to JWT tokens with 15-minute expiry',
              'Database hardware provisioning',
              'Frontend UI overhaul',
            ],
            correctIndex: 1,
            explanation: 'The speaker explicitly prioritized JWT auth migration for Sprint 12 and deferred Redis caching.',
            rubricOrTips: ['Filter out deferred items.'],
          },
        },
      ],
    },
    {
      id: 'module-13-shadowing',
      moduleNumber: 13,
      title: 'The Shadowing Technique (Listen -> Repeat -> Compare)',
      description: 'Echo native speech cadence, intonation peaks, and syllable reductions to build natural muscle memory.',
      estimatedMinutes: 75,
      topics: [
        {
          id: 'topic-13-1-shadowing-drills',
          title: '6-Tier Shadowing Practice Drills',
          summary: 'Practice repeating everyday, professional, technical, interview, meeting, and presentation sentences.',
          coreConcept: 'Shadowing builds neurological muscle memory for English rhythm, connected speech, and vowel reduction.',
          whyItMatters: 'Reading silently does not train your vocal cords or tongue muscles for spoken fluency.',
          lessonContent: {
            overview: 'The 5-Step Shadowing Protocol: 1. Listen without speaking -> 2. Listen & read transcript -> 3. Shadow along aloud -> 4. Record yourself -> 5. Compare pitch & pacing.',
            keyPoints: [
              'Everyday: "I am going to check the staging server logs right now."',
              'Professional: "I would like to propose an alternative caching strategy for our API gateway."',
              'Technical: "The time complexity is O(N) because each node is visited exactly once in the tree traversal."',
              'Interview: "My primary contribution was architecting the real-time notification engine using WebSockets."',
              'Meeting: "Just to add to what Alex mentioned, we should also benchmark the database connection pool."',
              'Presentation: "As you can see on this slide, our latency decreased by 35% following the index optimization."',
            ],
          },
          practice: {
            id: 'prac-13-1',
            type: 'shadowing',
            prompt: 'Shadow this technical sentence 3 times aloud: "The time complexity is O(N) because each node is visited exactly once in the tree traversal."',
            listenScript: 'The time complexity is O(N) because each node is visited exactly once in the tree traversal.',
            sampleAnswer: 'The time complexity is O(N) because each node is visited exactly once in the tree traversal.',
            rubricOrTips: [
              'Accurate stress on "time complexity", "O of N", "exactly once".',
              'Connected speech between "because" and "each".',
              'Confident, steady rhythm.',
            ],
          },
        },
      ],
    },
  ],
};

// =========================================================================
// LEVEL 5: SPEAKING FLUENCY & EXPLANATION (WEEKS 7–10)
// =========================================================================
export const LEVEL_5_SPEAKING_FLUENCY: CurriculumLevel = {
  id: 'level-5-speaking-fluency',
  levelNumber: 5,
  levelCode: 'LEVEL 5',
  title: 'Speaking Fluency & Timed Explanations',
  weeks: 'Weeks 7–10',
  objective: 'Build sustained spontaneous speaking power through daily fluency logs, 2-minute non-stop speaking drills, and 5-minute technical deep dives.',
  badge: 'Fluency Athlete',
  iconName: 'Mic',
  modules: [
    {
      id: 'module-14-daily-speaking',
      moduleNumber: 14,
      title: 'Daily Spontaneous Speaking Prompts',
      description: 'Daily speech drills covering your day, college studies, capstone project, career goals, technology, and AI trends.',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-14-1-daily-prompts',
          title: 'Structuring Spontaneous Daily Speech',
          summary: 'Speak on any prompt using the 3-part framework: Context -> Core Narrative -> Takeaway.',
          coreConcept: 'Never pause more than 1 second. If you make a grammar mistake, keep moving forward without freezing.',
          whyItMatters: 'Interviews require answering unanticipated questions smoothly without visible panic.',
          lessonContent: {
            overview: 'Practice answering 8 core daily speech topics: day, college, studies, project, goals, technology, AI, and current learning.',
            keyPoints: [
              'Begin with a strong topic sentence.',
              'Provide two supporting details or examples.',
              'Conclude with your key learning or future intention.',
            ],
          },
          practice: {
            id: 'prac-14-1',
            type: 'speech',
            prompt: 'Speak for 90 seconds on: "How Generative AI is transforming modern software engineering."',
            targetDurationSeconds: 90,
            sampleAnswer: 'Generative AI is fundamentally shifting software development from manual syntax writing to high-level architectural orchestration. Tools like GitHub Copilot and AI coding assistants accelerate boilerplate generation, allowing engineers to focus on system design, security, and edge-case testing. However, the importance of foundational computer science—such as data structures and distributed systems—remains higher than ever, as developers must critically audit AI-generated code for correctness, performance, and security vulnerabilities.',
            rubricOrTips: ['Balanced perspective.', 'Strong technical vocabulary.', 'Clear concluding summary.'],
          },
        },
      ],
    },
    {
      id: 'module-15-two-minute-speaking',
      moduleNumber: 15,
      title: 'Two-Minute Continuous Speaking Rule',
      description: 'Speak non-stop for 120 seconds on random technical and engineering prompts without freezing.',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-15-1-two-minute-rule',
          title: 'The Non-Stop 2-Minute Fluency Protocol',
          summary: 'Overcome hesitation by forcing your speech engine to prioritize momentum over micro-correction.',
          coreConcept: 'Fluency first, accuracy second. Once momentum is established, grammar self-correction becomes effortless.',
          whyItMatters: 'Interviewers evaluate whether you can sustain a coherent technical monologue when explaining design choices.',
          lessonContent: {
            overview: 'The Golden Rules: 1. Do not stop because of a slip -> 2. Use bridge phrases ("Furthermore", "In addition") -> 3. Anchor thoughts around real-world analogies.',
            keyPoints: [
              'Minute 1: Problem statement, baseline approach, and motivation.',
              'Minute 2: Architectural solution, trade-offs, metrics, and future improvements.',
            ],
          },
          practice: {
            id: 'prac-15-1',
            type: 'speech',
            prompt: 'Speak continuously for 120 seconds on: "Why Clean Code and Code Reviews are critical for engineering teams."',
            targetDurationSeconds: 120,
            sampleAnswer: 'Clean code is the bedrock of long-term software maintainability. In any professional engineering organization, code is read ten times more frequently than it is written. When developers write modular, self-documenting code with clear variable naming and single-responsibility functions, the entire team moves faster during onboarding and feature development. Code reviews act as a collaborative quality gate. They ensure that potential memory leaks, security vulnerabilities, and unindexed database queries are caught before reaching production. Furthermore, code reviews foster continuous mentorship and knowledge sharing across engineering squads.',
            rubricOrTips: ['Spoke for full 120 seconds.', 'Zero dead silence freezes.', 'Structured progression of points.'],
          },
        },
      ],
    },
    {
      id: 'module-16-five-minute-explanation',
      moduleNumber: 16,
      title: 'Five-Minute Technical Deep Dive',
      description: 'Master long-form technical explanations for Python, DSA, Machine Learning, Databases, APIs, Git, and Capstone Projects.',
      estimatedMinutes: 90,
      topics: [
        {
          id: 'topic-16-1-dsa-explanation',
          title: '5-Minute DSA & Algorithmic Roadmap Pitch',
          summary: 'Structure a comprehensive 5-minute technical explanation of Data Structures & Algorithms.',
          coreConcept: 'Structure long explanations into 5 clear chapters: 1. Overview -> 2. Core Primitives -> 3. Advanced Patterns -> 4. Complexity Optimization -> 5. Real-World Applications.',
          whyItMatters: 'Technical leadership interviews often feature open-ended prompts like "Walk me through your DSA mastery roadmap."',
          lessonContent: {
            overview: 'Review how to pace a 5-minute presentation without rushing or trailing off.',
            keyPoints: [
              'Chapter 1 (0:00-1:00): Why DSA matters (efficiency, scalability).',
              'Chapter 2 (1:00-2:00): Core linear structures (Arrays, Linked Lists, Stacks, Queues).',
              'Chapter 3 (2:00-3:00): Non-linear structures & graphs (Trees, BST, Tries, DFS, BFS).',
              'Chapter 4 (3:00-4:00): Advanced optimization (Dynamic Programming, Sliding Window, Two Pointers).',
              'Chapter 5 (4:00-5:00): Real-world application (Database indexing via B-Trees, routing algorithms).',
            ],
          },
          practice: {
            id: 'prac-16-1',
            type: 'speech',
            prompt: 'Deliver a 3 to 5-minute structured technical walkthrough of why Data Structures and Algorithms are critical for building scalable systems.',
            targetDurationSeconds: 180,
            sampleAnswer: 'Data structures and algorithms form the operational backbone of all computational systems. At low scale with a few hundred users, almost any naive brute-force implementation appears to work. However, when traffic scales to millions of requests per second, the mathematical difference between an O(N^2) quadratic algorithm and an O(N log N) or O(1) optimal solution dictates whether servers survive or experience catastrophic outage. By mastering foundational structures—like hash maps for constant-time lookups and balanced trees for range queries—engineers can design systems with predictable latency bounds.',
            rubricOrTips: ['Clear chapter transitions.', 'Professional terminology.', 'Paced vocal delivery.'],
          },
        },
      ],
    },
  ],
};

// =========================================================================
// LEVEL 6: TECHNICAL COMMUNICATION (WEEKS 8–12)
// =========================================================================
export const LEVEL_6_TECH_COMMUNICATION: CurriculumLevel = {
  id: 'level-6-tech-communication',
  levelNumber: 6,
  levelCode: 'LEVEL 6',
  title: 'Technical & System Communication',
  weeks: 'Weeks 8–12',
  objective: 'Master the 5-step technical concept explanation formula (Definition -> Explanation -> Example -> Use Case -> Conclusion), project presentation architecture, and debugging communication.',
  badge: 'Technical Architect',
  iconName: 'Cpu',
  modules: [
    {
      id: 'module-17-explaining-concepts',
      moduleNumber: 17,
      title: 'The 5-Step Technical Concept Formula',
      description: 'Explain Python, DSA, OOP, DBMS, SQL, OS, Networks, ML, and Generative AI with flawless clarity.',
      estimatedMinutes: 90,
      topics: [
        {
          id: 'topic-17-1-five-step-formula',
          title: 'The 5-Step Concept Explanation Framework',
          summary: '1. Definition -> 2. Mechanism -> 3. Concrete Example -> 4. Real-World Use Case -> 5. Summary / Trade-off.',
          coreConcept: 'Never give just a dictionary definition. Always connect the concept to how computers execute it and why engineers use it.',
          whyItMatters: 'The gold standard for passing technical screening rounds at top software companies.',
          lessonContent: {
            overview: 'Study how to apply the 5-step formula across 11 core computer science domains.',
            keyPoints: [
              'Step 1 (Definition): "Object-Oriented Programming is a paradigm based on bundling data and behavior into classes and objects."',
              'Step 2 (Mechanism): "It relies on four pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism."',
              'Step 3 (Example): "For instance, a `BankAccount` class encapsulates the `balance` attribute and exposes a `deposit()` method."',
              'Step 4 (Use Case): "In enterprise banking software, this prevents unauthorized direct mutation of account balances."',
              'Step 5 (Trade-off): "While OOP increases code modularity, excessive inheritance hierarchies can introduce memory overhead."',
            ],
          },
          practice: {
            id: 'prac-17-1',
            type: 'explanation',
            prompt: 'Explain "Database Indexing" using all 5 steps of the formula in 90 seconds.',
            targetDurationSeconds: 90,
            sampleAnswer: '1. Definition: A database index is a specialized data structure, typically a B-Tree, that optimizes the speed of data retrieval operations on a table. 2. Mechanism: Instead of performing an expensive full-table scan through millions of rows, the database engine searches the sorted index tree in O(log N) logarithmic time. 3. Example: If we frequently query `users` by `email`, creating an index on the email column allows instant pointer lookup. 4. Use Case: In high-traffic login endpoints handling 10,000 QPS, indexing prevents database CPU saturation. 5. Trade-off: The trade-off is that indexes consume additional disk space and slightly increase the write latency of INSERT and UPDATE operations.',
            rubricOrTips: ['Covered all 5 steps explicitly.', 'Mentioned time complexity.', 'Highlighted write overhead trade-off.'],
          },
        },
      ],
    },
    {
      id: 'module-18-project-communication',
      moduleNumber: 18,
      title: 'End-to-End Project Architecture Presentation',
      description: 'Present capstone projects: Problem Statement, Motivation, Tech Stack, Architecture, Challenges, Solutions, Results.',
      estimatedMinutes: 90,
      topics: [
        {
          id: 'topic-18-1-project-storytelling',
          title: 'Structuring a Flagship Project Pitch',
          summary: 'The 8-pillar project presentation blueprint that wows interviewers and hiring managers.',
          coreConcept: 'Interviewers do not just want to see code; they want to understand WHY you built it, WHAT challenges you overcame, and HOW you measured success.',
          whyItMatters: 'Your project discussion occupies 50% of technical interview time.',
          lessonContent: {
            overview: 'The 8 Pillars: 1. Project Hook -> 2. Problem Statement -> 3. Target User -> 4. Architecture & Stack -> 5. Core Implementation -> 6. Hardest Engineering Challenge -> 7. Metrics & Results -> 8. Future Roadmap.',
            keyPoints: [
              'Start with user impact, not just library names.',
              'Dedicate significant time to the HARDEST BUG or architectural constraint you solved.',
              'Provide quantitative metrics (e.g. "reduced latency by 30%", "supported 5,000 concurrent requests").',
            ],
          },
          practice: {
            id: 'prac-18-1',
            type: 'speech',
            prompt: 'Deliver your complete 2-minute capstone project pitch covering Problem, Tech Stack, Challenge, and Results.',
            targetDurationSeconds: 120,
            sampleAnswer: 'I developed LevelUpDev, a personalized learning platform designed to streamline student preparation for software and AI engineering careers. The problem we addressed is the fragmented nature of learning resources. I architected the application using Next.js, TypeScript, Tailwind CSS, and Firebase Firestore for dual-layer persistence. The hardest engineering challenge was designing a robust streak engine and dynamic progress calculator that seamlessly synchronizes state across offline LocalStorage and live cloud databases. By implementing optimistic caching and deep object merging, we achieved sub-50ms page load times and zero data loss across session reloads. In the future, I plan to integrate real-time AI mock interview feedback.',
            rubricOrTips: ['Clear problem & solution.', 'Highlighted technical challenge.', 'Included performance metrics.'],
          },
        },
      ],
    },
    {
      id: 'module-19-debugging-communication',
      moduleNumber: 19,
      title: 'Articulating Bugs, Investigations & Root Causes',
      description: 'Communicate technical investigations with precision: "I identified the root cause...", "The error was caused by...".',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-19-1-debugging-phrases',
          title: 'The 6-Phase Debugging Narrative Framework',
          summary: 'Symptom -> Reproduction -> Investigation -> Root Cause -> Remediation -> Verification.',
          coreConcept: 'Structured debugging communication demonstrates rigorous scientific problem-solving.',
          whyItMatters: 'Live coding and troubleshooting rounds test how logically you communicate when unexpected bugs occur.',
          lessonContent: {
            overview: 'Master the 6 anchor phrases for technical troubleshooting.',
            keyPoints: [
              '"I noticed an unexpected symptom where [Behavior] occurred."',
              '"I reproduced the error by supplying [Edge Case Input]."',
              '"I investigated the execution stack trace and inspected [Log/Memory Dump]."',
              '"I identified the root cause as [Underlying Defect, e.g. unhandled null pointer]."',
              '"I fixed the issue by implementing [Defensive Check / Patch]."',
              '"I verified the solution by running automated unit and integration tests."',
            ],
          },
          practice: {
            id: 'prac-19-1',
            type: 'speech',
            prompt: 'Describe a challenging bug you recently fixed using the 6-phase debugging narrative.',
            targetDurationSeconds: 60,
            sampleAnswer: 'During load testing of our auth endpoint, I noticed an unexpected symptom where users received 500 internal server errors during token renewal. I reproduced the issue by simulating concurrent session refreshes. Investigating the server logs revealed that database connection pool exhaustion was the root cause. I resolved the issue by implementing connection pooling with a maximum timeout and adding exponential backoff retries. I verified the fix by running a load test with 5,000 simulated users, achieving 100% success rate.',
            rubricOrTips: ['Used all 6 phases.', 'Clear root cause identification.', 'Empirical verification metric.'],
          },
        },
      ],
    },
  ],
};
