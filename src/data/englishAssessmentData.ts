/**
 * English & Career Communication Assessment Engine
 * 
 * 8 Core Competencies:
 * 1. Grammar
 * 2. Vocabulary
 * 3. Sentence Formation
 * 4. Reading
 * 5. Listening
 * 6. Speaking
 * 7. Technical Communication
 * 8. Interview Communication
 * 
 * Skill Levels:
 * - Foundation (< 45%)
 * - Developing (45% - 64%)
 * - Intermediate (65% - 84%)
 * - Professional Ready (85% - 100%)
 */

export type AssessmentSkillLevel = 'Foundation' | 'Developing' | 'Intermediate' | 'Professional Ready';

export interface AssessmentSectionConfig {
  id: string;
  name: string;
  shortLabel: string;
  iconName: string;
  description: string;
  targetTab: string;
}

export const ASSESSMENT_SECTIONS: AssessmentSectionConfig[] = [
  {
    id: 'grammar',
    name: 'Grammar Precision',
    shortLabel: 'Grammar',
    iconName: 'CheckCircle2',
    description: 'Tenses, inversion, subject-verb agreement, and conditionals',
    targetTab: 'grammar',
  },
  {
    id: 'vocabulary',
    name: 'Executive Vocabulary',
    shortLabel: 'Vocabulary',
    iconName: 'BookOpen',
    description: 'High-precision engineering verbs and corporate collocations',
    targetTab: 'vocabulary',
  },
  {
    id: 'sentence_formation',
    name: 'Sentence Formation',
    shortLabel: 'Sentence Formation',
    iconName: 'Layers',
    description: 'Compound clause transitions, RFC 2119 imperatives, and parallelism',
    targetTab: 'daily',
  },
  {
    id: 'reading',
    name: 'Technical Reading',
    shortLabel: 'Reading',
    iconName: 'FileText',
    description: 'Architecture documents, API SLA trade-offs, and incident post-mortems',
    targetTab: 'technical',
  },
  {
    id: 'listening',
    name: 'Stakeholder Listening',
    shortLabel: 'Listening',
    iconName: 'Headphones',
    description: 'Comprehending fast-paced agile standups and client pushback nuances',
    targetTab: 'listening',
  },
  {
    id: 'speaking',
    name: 'Speaking & Fluency',
    shortLabel: 'Speaking',
    iconName: 'Mic',
    description: 'Spontaneous oral delivery, pacing, and filler word control',
    targetTab: 'speaking',
  },
  {
    id: 'technical_comm',
    name: 'Technical Communication',
    shortLabel: 'Tech Comm',
    iconName: 'Cpu',
    description: 'Constructive code reviews, latency defense, and architecture walkthroughs',
    targetTab: 'technical',
  },
  {
    id: 'interview_comm',
    name: 'Interview Communication',
    shortLabel: 'Interview Comm',
    iconName: 'Award',
    description: 'STAR behavioral answers, technical depth articulation, and value framing',
    targetTab: 'interview',
  },
];

export interface DiagnosticQuestion {
  id: string;
  sectionId: string;
  question: string;
  contextSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  levelTarget: AssessmentSkillLevel;
}

export const INITIAL_ASSESSMENT_QUESTIONS: DiagnosticQuestion[] = [
  // =========================================================================
  // 1. GRAMMAR (4 questions)
  // =========================================================================
  {
    id: 'init_g1',
    sectionId: 'grammar',
    question: 'Select the grammatically correct sentence for an engineering architecture document:',
    options: [
      'If the microservice will experience downtime, the fallback queue activates.',
      'Were the primary database to fail, the replica would automatically assume the master role.',
      'Had we knew about the memory leak, we would patch it sooner.',
      'The cluster of nodes are failing their ping intervals.',
    ],
    correctIndex: 1,
    explanation: '"Were the primary database to fail, the replica would..." correctly uses the inverted conditional for hypothetical architectural resilience.',
    levelTarget: 'Professional Ready',
  },
  {
    id: 'init_g2',
    sectionId: 'grammar',
    question: 'Identify the sentence with correct subject-verb agreement and modifier placement:',
    options: [
      'Each of the background worker threads have dedicated logging channels.',
      'Neither the backend engineers nor the DevOps lead were informed about the deployment freeze.',
      'A series of latency spikes were observed across all three microservices.',
      'Each of the background worker threads has a dedicated logging channel.',
    ],
    correctIndex: 3,
    explanation: '"Each" is singular and requires the singular verb "has".',
    levelTarget: 'Intermediate',
  },
  {
    id: 'init_g3',
    sectionId: 'grammar',
    question: 'Which sentence correctly expresses past accomplishment vs current system capability?',
    options: [
      'Last quarter, I have optimized the cache and now throughput is increased.',
      'Last quarter, I optimized the cache, and our throughput has since increased by 40%.',
      'I am optimizing the cache last quarter and throughput was increasing.',
      'Last quarter I optimize the cache, so throughput increases.',
    ],
    correctIndex: 1,
    explanation: 'Simple past ("optimized") for completed past action + present perfect ("has since increased") for ongoing result.',
    levelTarget: 'Developing',
  },
  {
    id: 'init_g4',
    sectionId: 'grammar',
    question: 'Choose the correct preposition and phrasing for explaining technical causality:',
    options: [
      'The API timeout happened because of the payload was too large.',
      'The API timeout occurred due to the payload being excessively large.',
      'The API timeout occurred because to the payload size.',
      'The API timeout resulted with the large payload.',
    ],
    correctIndex: 1,
    explanation: '"due to" is correctly followed by a noun phrase / gerund ("due to the payload being excessively large").',
    levelTarget: 'Foundation',
  },

  // =========================================================================
  // 2. VOCABULARY (4 questions)
  // =========================================================================
  {
    id: 'init_v1',
    sectionId: 'vocabulary',
    question: 'Which term best describes an architecture that uses minimal resources, avoids bloat, and optimizes memory:',
    options: ['Concomitant', 'Parsimonious', 'Disambiguated', 'Ephemeral'],
    correctIndex: 1,
    explanation: '"Parsimonious" denotes frugal, highly economical resource design.',
    levelTarget: 'Professional Ready',
  },
  {
    id: 'init_v2',
    sectionId: 'vocabulary',
    question: 'Select the most precise verb to describe resolving a persistent concurrency race condition:',
    options: ['Fixed', 'Remediated', 'Did', 'Touched'],
    correctIndex: 1,
    explanation: '"Remediated" communicates thorough diagnosis, root cause elimination, and structured recovery.',
    levelTarget: 'Intermediate',
  },
  {
    id: 'init_v3',
    sectionId: 'vocabulary',
    question: 'What is the most accurate term for separating frontend UI concerns from backend business logic:',
    options: ['Decoupling', 'Breaking apart', 'Dividing down', 'Un-attaching'],
    correctIndex: 0,
    explanation: '"Decoupling" is the industry-standard software engineering term for isolating module interdependencies.',
    levelTarget: 'Developing',
  },
  {
    id: 'init_v4',
    sectionId: 'vocabulary',
    question: 'Which word means temporary and short-lived in the context of cloud infrastructure compute instances:',
    options: ['Immutable', 'Ephemeral', 'Monolithic', 'Asynchronous'],
    correctIndex: 1,
    explanation: '"Ephemeral" means short-lived, such as serverless Lambdas or temporary spot instances.',
    levelTarget: 'Foundation',
  },

  // =========================================================================
  // 3. SENTENCE FORMATION (4 questions)
  // =========================================================================
  {
    id: 'init_sf1',
    sectionId: 'sentence_formation',
    question: 'Select the sentence with parallel structure and clean technical transition markers:',
    options: [
      'The engineer analyzed the bottleneck, refactored the SQL query, and bench-marking the new response time.',
      'The engineer analyzed the bottleneck, refactored the SQL query, and benchmarked the resulting response time.',
      'The engineer was analyzing the bottleneck, to refactor the SQL query, and benchmarked.',
      'The engineer analyzed the bottleneck, refactoring of SQL query, and benchmarked.',
    ],
    correctIndex: 1,
    explanation: 'Parallel past-tense verbs: "analyzed", "refactored", and "benchmarked".',
    levelTarget: 'Intermediate',
  },
  {
    id: 'init_sf2',
    sectionId: 'sentence_formation',
    question: 'Which option correctly adheres to RFC 2119 specification language for mandatory compliance?',
    options: [
      'The client SHOULD send the auth token, but only if they feel like it.',
      'The client MUST include the HMAC-SHA256 signature in the authorization header.',
      'The client MIGHT send an encrypted body whenever convenient.',
      'The client PROBABLY sends the authorization header.',
    ],
    correctIndex: 1,
    explanation: '"MUST" denotes absolute technical requirement under RFC 2119 standards.',
    levelTarget: 'Professional Ready',
  },
  {
    id: 'init_sf3',
    sectionId: 'sentence_formation',
    question: 'How should you fix this run-on sentence: "The service exceeded memory limits it crashed the pod"?',
    options: [
      'The service exceeded memory limits, it crashed the pod.',
      'The service exceeded memory limits, consequently crashing the pod.',
      'The service exceeded memory limits so it crashed.',
      'Exceeded memory limits crashed pod.',
    ],
    correctIndex: 1,
    explanation: 'Using the participial clause ", consequently crashing the pod" elegantly solves the run-on with clear causality.',
    levelTarget: 'Developing',
  },
  {
    id: 'init_sf4',
    sectionId: 'sentence_formation',
    question: 'Which compound sentence joins two related engineering ideas correctly:',
    options: [
      'We enabled Redis caching; as a result, database read IOPS dropped by 65%.',
      'We enabled Redis caching, as a result database read IOPS dropped by 65%.',
      'We enabled Redis caching; but database read IOPS dropped by 65%.',
      'We enabled Redis caching because database read IOPS dropped.',
    ],
    correctIndex: 0,
    explanation: 'A semicolon followed by a conjunctive adverb ("as a result,") cleanly connects two independent clauses.',
    levelTarget: 'Foundation',
  },

  // =========================================================================
  // 4. TECHNICAL READING (4 questions)
  // =========================================================================
  {
    id: 'init_r1',
    sectionId: 'reading',
    contextSnippet: `Post-Mortem Extract: "At 14:02 UTC, the ingestion pipeline experienced a 10x throughput surge. The downstream workers exhausted available database connection pools because long-running analytical queries held open transaction locks without timeouts. Consequently, incoming HTTP writes were rejected with 503 Service Unavailable."`,
    question: 'Based on the post-mortem, what was the primary root cause of the 503 write failures?',
    options: [
      'The HTTP gateway crashed due to hardware failure.',
      'Database connection starvation caused by unconstrained locks from analytical queries during a traffic surge.',
      'The analytical queries completed too quickly.',
      'Developers deployed broken code at 14:02 UTC.',
    ],
    correctIndex: 1,
    explanation: 'The analytical queries held open locks without timeouts, exhausting connection pools when traffic surged.',
    levelTarget: 'Intermediate',
  },
  {
    id: 'init_r2',
    sectionId: 'reading',
    contextSnippet: `RFC Excerpt: "In order to guarantee idempotent retries, each POST mutation request MUST include an Idempotency-Key header. The server SHALL cache successful responses for 24 hours keyed to this UUID. If a retry arrives while the initial operation is in-flight, the server MUST return HTTP 409 Conflict."`,
    question: 'What happens if a client retries a request while the original request is still processing?',
    options: [
      'The server creates a duplicate record.',
      'The server returns HTTP 409 Conflict.',
      'The server immediately returns HTTP 200 OK.',
      'The server discards the Idempotency-Key.',
    ],
    correctIndex: 1,
    explanation: 'The specification explicitly mandates returning HTTP 409 Conflict for in-flight concurrent duplicates.',
    levelTarget: 'Professional Ready',
  },
  {
    id: 'init_r3',
    sectionId: 'reading',
    contextSnippet: `Architecture RFC: "We chose eventual consistency over strong consistency for the user timeline service to prioritize sub-50ms p99 read latency across geographically distributed edge nodes."`,
    question: 'What engineering trade-off was explicitly made in this architecture?',
    options: [
      'Sacrificing immediate global consistency to achieve ultra-low read latency.',
      'Sacrificing read speed to achieve ACID transaction guarantees.',
      'Eliminating edge nodes to simplify operations.',
      'Increasing p99 latency to 500ms.',
    ],
    correctIndex: 0,
    explanation: 'Eventual consistency was selected to minimize read latency at the edge.',
    levelTarget: 'Developing',
  },
  {
    id: 'init_r4',
    sectionId: 'reading',
    contextSnippet: `Security Advisory: "A cross-site scripting vulnerability was identified in the Markdown renderer. User-submitted HTML tags were unsanitized before being injected into the DOM."`,
    question: 'What caused the security vulnerability?',
    options: [
      'The markdown renderer was too fast.',
      'Unsanitized user HTML input was rendered directly into the DOM.',
      'The database password was weak.',
      'Users logged in with invalid credentials.',
    ],
    correctIndex: 1,
    explanation: 'Failure to sanitize user HTML prior to DOM insertion permitted script injection.',
    levelTarget: 'Foundation',
  },

  // =========================================================================
  // 5. STAKEHOLDER LISTENING (4 questions)
  // =========================================================================
  {
    id: 'init_l1',
    sectionId: 'listening',
    contextSnippet: `Audio Scenario: Product Manager: "We really need the payment gateway integration by Friday for the marketing launch. I know the automated reconciliation module isn't finished, but can we ship just the frontend flow now and reconcile manually over the weekend?"`,
    question: 'What is the Product Manager proposing and what is the underlying operational trade-off?',
    options: [
      'Canceling the launch entirely.',
      'Shipping an MVP frontend to meet a hard marketing deadline while taking on temporary manual operational debt.',
      'Writing automated reconciliation from scratch on Friday night.',
      'Refusing to launch until next month.',
    ],
    correctIndex: 1,
    explanation: 'The PM is negotiating scope: meet the launch date by accepting short-term manual reconciliation.',
    levelTarget: 'Intermediate',
  },
  {
    id: 'init_l2',
    sectionId: 'listening',
    contextSnippet: `Audio Scenario: Principal Architect: "I hear your argument for using GraphQL here, but given our strict p99 latency SLA and existing cache infrastructure, introducing dynamic query parsing on every request adds non-trivial overhead. Let's start with optimized REST endpoints."`,
    question: 'What is the Architect\'s core reservation regarding GraphQL?',
    options: [
      'They do not like the syntax of GraphQL.',
      'Dynamic query parsing overhead and cache invalidation complexity conflict with strict p99 latency SLAs.',
      'REST endpoints take longer to build.',
      'The frontend team lacks skills.',
    ],
    correctIndex: 1,
    explanation: 'The architect identifies CPU parsing overhead and cache incompatibility as risks to the p99 SLA.',
    levelTarget: 'Professional Ready',
  },
  {
    id: 'init_l3',
    sectionId: 'listening',
    contextSnippet: `Audio Scenario: DevOps Lead: "Heads up team: staging will be unavailable between 3 PM and 4 PM UTC for Kubernetes control plane upgrades. Please wrap up any PR verifications before then."`,
    question: 'What action should engineers take based on this announcement?',
    options: [
      'Deploy to production immediately.',
      'Complete staging PR testing prior to 3 PM UTC to avoid interruption.',
      'Ignore the message.',
      'Shut down their local development environment.',
    ],
    correctIndex: 1,
    explanation: 'Engineers should plan verification tasks before the 3 PM UTC staging maintenance window.',
    levelTarget: 'Developing',
  },
  {
    id: 'init_l4',
    sectionId: 'listening',
    contextSnippet: `Audio Scenario: Engineering Manager: "Let's make sure everyone updates their Jira tickets before tomorrow's sprint retrospective so our burndown metrics are accurate."`,
    question: 'What is the manager requesting from the team?',
    options: [
      'Write new code tonight.',
      'Update ticket statuses before tomorrow\'s sprint retro for accurate reporting.',
      'Cancel the retrospective.',
      'Create 10 new user stories.',
    ],
    correctIndex: 1,
    explanation: 'Clear instruction to update Jira tickets prior to the sprint retrospective.',
    levelTarget: 'Foundation',
  },

  // =========================================================================
  // 6. SPEAKING & FLUENCY
  // =========================================================================
  {
    id: 'init_sp1',
    sectionId: 'speaking',
    question: 'When asked in an executive meeting "What is the status of the migration?", which opening demonstrates the highest clarity?',
    options: [
      '"Um, yeah, so basically we started last week and there were some things that happened..."',
      '"Bottom Line Up Front: the core database migration is 80% complete and on track for Wednesday delivery with zero customer downtime."',
      '"I think it is going okay, we worked hard yesterday."',
      '"Why are you asking about the migration today?"',
    ],
    correctIndex: 1,
    explanation: 'Applies the BLUF (Bottom Line Up Front) model: high-level summary, completion metric, ETA, and business impact in one breath.',
    levelTarget: 'Professional Ready',
  },
  {
    id: 'init_sp2',
    sectionId: 'speaking',
    question: 'How should you transition from describing a technical problem to explaining your solution during an oral presentation?',
    options: [
      '"And then stuff was broken."',
      '"To mitigate this bottleneck, we engineered a distributed caching layer that reduced query load by 60%."',
      '"So yeah, next slide."',
      '"I don\'t remember what we did next."',
    ],
    correctIndex: 1,
    explanation: '"To mitigate this bottleneck, we engineered..." provides an authoritative verbal signpost connecting problem to solution.',
    levelTarget: 'Intermediate',
  },
  {
    id: 'init_sp3',
    sectionId: 'speaking',
    question: 'When caught off-guard by a senior architect\'s complex question, what is the best verbal strategy?',
    options: [
      'Say "um, like, maybe" while thinking randomly.',
      'Use a deliberate 1-second pause, say "That is an important consideration. Let me break down our trade-off analysis into two points...", and answer calmly.',
      'Pretend you did not hear them.',
      'Immediately guess without thinking.',
    ],
    correctIndex: 1,
    explanation: 'Replacing fillers with deliberate pauses and framing phrases demonstrates executive poise under pressure.',
    levelTarget: 'Developing',
  },
  {
    id: 'init_sp4',
    sectionId: 'speaking',
    question: 'Which phrasing best expresses confidence without sounding arrogant?',
    options: [
      '"I am the only one who knows how this works."',
      '"Based on our telemetry and load testing, we are confident this architecture will support our peak 50k RPS target."',
      '"It will probably not crash, I hope."',
      '"Nobody else could have written this code."',
    ],
    correctIndex: 1,
    explanation: 'Anchors confidence in objective data ("telemetry and load testing") rather than personal ego.',
    levelTarget: 'Foundation',
  },

  // =========================================================================
  // 7. TECHNICAL COMMUNICATION (4 questions)
  // =========================================================================
  {
    id: 'init_tc1',
    sectionId: 'technical_comm',
    question: 'Which code review comment exhibits the highest degree of constructive technical leadership?',
    options: [
      'This function is way too long. Rewrite it cleaner.',
      'Why did you use synchronous fs calls here? It is bad practice.',
      'I noticed we are reading files synchronously here. Under concurrent web traffic, this could block the Node event loop. What do you think about refactoring to `fs.promises.readFile`?',
      'Approved, but this will probably crash in staging.',
    ],
    correctIndex: 2,
    explanation: 'Explains specific system consequence (event loop blocking) and offers an exact, collaborative alternative.',
    levelTarget: 'Professional Ready',
  },
  {
    id: 'init_tc2',
    sectionId: 'technical_comm',
    question: 'How should you communicate a 30-minute production outage to executive stakeholders?',
    options: [
      'Blame the cloud provider on public social media.',
      'Provide an executive incident memo stating the impact duration, root cause (e.g. DNS misconfiguration), immediate mitigation applied, and preventative permanent guardrails.',
      'Send a 5,000-line raw server log dump without explanation.',
      'Wait a week and see if anyone notices.',
    ],
    correctIndex: 1,
    explanation: 'Executive communication requires transparency, root cause clarity, and preventative guardrails.',
    levelTarget: 'Intermediate',
  },
  {
    id: 'init_tc3',
    sectionId: 'technical_comm',
    question: 'Which statement best defends choosing PostgreSQL over MongoDB for a financial transaction system?',
    options: [
      'I like PostgreSQL better.',
      'PostgreSQL provides strict ACID transaction compliance and relational integrity constraints essential for preventing financial ledger anomalies.',
      'MongoDB is too modern.',
      'Everyone uses PostgreSQL so we should too.',
    ],
    correctIndex: 1,
    explanation: 'Cites specific technical properties (ACID compliance, relational integrity constraints) tied to business risk.',
    levelTarget: 'Developing',
  },
  {
    id: 'init_tc4',
    sectionId: 'technical_comm',
    question: 'How do you ask a clarifying question about an ambiguous API requirement during a sprint planning meeting?',
    options: [
      '"This ticket makes no sense."',
      '"To ensure we align on scope: should this endpoint return a paginated cursor or the full result array when query parameters are omitted?"',
      '"I will just guess the implementation."',
      '"Why didn\'t the PM write better specs?"',
    ],
    correctIndex: 1,
    explanation: 'Frames the question politely with concrete implementation choices ("paginated cursor or full array").',
    levelTarget: 'Foundation',
  },

  // =========================================================================
  // 8. INTERVIEW COMMUNICATION (4 questions)
  // =========================================================================
  {
    id: 'init_ic1',
    sectionId: 'interview_comm',
    question: 'When an interviewer asks "Tell me about yourself", what is the most effective opening structure?',
    options: [
      'Recite your entire high school and college coursework history chronologically.',
      'The 4-part opening: Present Role & Tech Stack, Key High-Impact Achievement, Core Technical Superpower, and Why This Role Aligns With Your Goals.',
      'Start by listing all your hobbies outside of programming.',
      'Say "My resume has everything, what do you want to know?"',
    ],
    correctIndex: 1,
    explanation: 'The 4-part opening immediately establishes seniority, technical credibility, and alignment.',
    levelTarget: 'Professional Ready',
  },
  {
    id: 'init_ic2',
    sectionId: 'interview_comm',
    question: 'When asked "Tell me about a time you made a mistake" in a Senior tech interview, the best strategy is:',
    options: [
      'Pick a fake flaw like "I work too hard and care too much about code quality."',
      'Blame a teammate while explaining how you saved the day.',
      'Acknowledge a genuine technical/planning error, explain the immediate mitigation, and highlight the permanent automated guardrail you implemented.',
      'Claim you have never made a mistake due to thorough testing.',
    ],
    correctIndex: 2,
    explanation: 'High-caliber engineering cultures value psychological safety, accountability, and systematic prevention over artificial perfection.',
    levelTarget: 'Intermediate',
  },
  {
    id: 'init_ic3',
    sectionId: 'interview_comm',
    question: 'Under the STAR method for behavioral answers, what does the "A" represent?',
    options: [
      'Agreement - agreeing with the interviewer.',
      'Action - the specific technical actions and leadership decisions you personally took.',
      'Audience - the stakeholders listening to your presentation.',
      'Analysis - analyzing why other people failed.',
    ],
    correctIndex: 1,
    explanation: 'Action highlights your specific technical contribution, engineering trade-offs, and execution.',
    levelTarget: 'Developing',
  },
  {
    id: 'init_ic4',
    sectionId: 'interview_comm',
    question: 'How should you articulate your contribution when discussing a team project in an interview?',
    options: [
      'Always say "we" for everything so the interviewer doesn\'t know who did what.',
      'Use "we" to give credit for team context, but pivot to "I specifically designed and implemented..." to highlight your own contributions.',
      'Claim credit for the entire architecture even if you only built one component.',
      'Avoid talking about your personal code.',
    ],
    correctIndex: 1,
    explanation: 'Demonstrates collaborative teamwork while clarifying your specific individual engineering ownership.',
    levelTarget: 'Foundation',
  },
];

// =========================================================================
// WEEKLY ASSESSMENT QUESTION BANK (ROTATING WEEKS)
// =========================================================================
export const WEEKLY_ASSESSMENT_BANK: Record<number, DiagnosticQuestion[]> = {
  1: [
    {
      id: 'w1_g',
      sectionId: 'grammar',
      question: 'Which sentence correctly handles past continuous vs simple past in an incident review?',
      options: [
        'While the worker thread processed the queue, a deadlock had occurred.',
        'While the worker thread was processing the queue, a deadlock occurred.',
        'While worker thread is processing, deadlock occurred.',
        'Worker thread processed when deadlock was occurring.',
      ],
      correctIndex: 1,
      explanation: '"While the worker thread was processing... a deadlock occurred" correctly pairs background action with interrupting event.',
      levelTarget: 'Intermediate',
    },
    {
      id: 'w1_v',
      sectionId: 'vocabulary',
      question: 'Choose the most impactful executive verb: "We [improved] the data ingestion latency by 50%."',
      options: ['fixed up', 'streamlined', 'did better', 'touched'],
      correctIndex: 1,
      explanation: '"Streamlined" conveys systematic removal of friction and measurable efficiency.',
      levelTarget: 'Intermediate',
    },
    {
      id: 'w1_sf',
      sectionId: 'sentence_formation',
      question: 'Select the sentence with correct modifier placement:',
      options: [
        'Having crashed five times, the engineer rebooted the server.',
        'Having crashed five times, the server was rebooted by the engineer.',
        'The engineer rebooted having crashed five times the server.',
        'Rebooting the server having crashed five times.',
      ],
      correctIndex: 1,
      explanation: 'Avoids dangling modifier: the server crashed, not the engineer.',
      levelTarget: 'Intermediate',
    },
    {
      id: 'w1_r',
      sectionId: 'reading',
      contextSnippet: `SLA Agreement: "The API guarantees 99.95% monthly uptime. Scheduled maintenance windows announced 48 hours in advance are excluded from downtime calculations."`,
      question: 'Are planned maintenance windows counted against the 99.95% uptime budget?',
      options: ['Yes, always.', 'No, provided they are announced 48 hours in advance.', 'Only if they occur on weekends.', 'Yes, if latency exceeds 1 second.'],
      correctIndex: 1,
      explanation: 'Excluded explicitly when announced 48 hours prior.',
      levelTarget: 'Foundation',
    },
    {
      id: 'w1_l',
      sectionId: 'listening',
      contextSnippet: `Audio Scenario: "We need to throttle non-authenticated requests to protect the downstream payment gateway from DDoS."`,
      question: 'What is the objective of rate limiting unauthenticated traffic?',
      options: ['To charge users more money.', 'To protect downstream payment infrastructure from denial-of-service overload.', 'To disable all logins.', 'To speed up database backups.'],
      correctIndex: 1,
      explanation: 'Rate limiting protects critical downstream dependencies from overload.',
      levelTarget: 'Foundation',
    },
    {
      id: 'w1_sp',
      sectionId: 'speaking',
      question: 'How do you structure a 60-second architectural trade-off explanation orally?',
      options: [
        'Just state which library you like.',
        'Problem → Options Evaluated → Trade-off Rationale → Measured Result.',
        'Talk about your feelings regarding code.',
        'Ask the interviewer to choose.',
      ],
      correctIndex: 1,
      explanation: 'Clear 4-step framework ensures structured, concise executive explanation.',
      levelTarget: 'Professional Ready',
    },
    {
      id: 'w1_tc',
      sectionId: 'technical_comm',
      question: 'Which phrasing offers constructive feedback without defensiveness?',
      options: [
        'Your code is messy.',
        'To improve maintainability, consider extracting this 80-line nested loop into a helper function with descriptive typing.',
        'I would never write it this way.',
        'Change this immediately.',
      ],
      correctIndex: 1,
      explanation: 'Gives specific actionable advice tied to code quality ("improving maintainability").',
      levelTarget: 'Intermediate',
    },
    {
      id: 'w1_ic',
      sectionId: 'interview_comm',
      question: 'In a behavioral interview, how should you conclude your STAR story?',
      options: [
        '"And that\'s why I\'m great."',
        'Quantify the concrete business Result (e.g. 35% latency drop, $50k cloud savings) and share what you learned.',
        'Stop speaking abruptly.',
        'Ask if you passed.',
      ],
      correctIndex: 1,
      explanation: 'Ending with measurable business results and reflective learning cements senior credibility.',
      levelTarget: 'Professional Ready',
    },
  ],
};

// =========================================================================
// EVALUATION & SCORING HELPERS
// =========================================================================

export function getSkillLevel(scorePercent: number): AssessmentSkillLevel {
  if (scorePercent >= 85) return 'Professional Ready';
  if (scorePercent >= 65) return 'Intermediate';
  if (scorePercent >= 45) return 'Developing';
  return 'Foundation';
}

export function getSkillLevelColor(level: AssessmentSkillLevel): { bg: string; text: string; border: string } {
  switch (level) {
    case 'Professional Ready':
      return { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' };
    case 'Intermediate':
      return { bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: 'border-cyan-500/30' };
    case 'Developing':
      return { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30' };
    case 'Foundation':
    default:
      return { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30' };
  }
}

export interface AssessmentSectionResultDetail {
  sectionId: string;
  sectionName: string;
  correct: number;
  total: number;
  scorePercent: number;
  level: AssessmentSkillLevel;
  feedback: string;
}

export interface GeneratedAssessmentEvaluation {
  overallScorePercent: number;
  overallLevel: AssessmentSkillLevel;
  totalQuestions: number;
  correctCount: number;
  sectionDetails: Record<string, AssessmentSectionResultDetail>;
  strengths: string[];
  weaknesses: string[];
  recommendedTraining: Array<{
    title: string;
    description: string;
    targetTab: string;
    actionParam?: string;
  }>;
  first7DayPlan: Array<{
    day: number;
    title: string;
    focusArea: string;
    objective: string;
    estimatedMinutes: number;
    targetTab: string;
  }>;
}

/**
 * Computes diagnostic evaluation from user answers.
 */
export function evaluateAssessmentSubmission(
  answers: Record<string, number>,
  questions: DiagnosticQuestion[]
): GeneratedAssessmentEvaluation {
  const sectionCounts: Record<string, { correct: number; total: number }> = {};

  for (const s of ASSESSMENT_SECTIONS) {
    sectionCounts[s.id] = { correct: 0, total: 0 };
  }

  let totalCorrect = 0;
  const totalQuestionsCount = questions.length;

  for (const q of questions) {
    if (!sectionCounts[q.sectionId]) {
      sectionCounts[q.sectionId] = { correct: 0, total: 0 };
    }
    sectionCounts[q.sectionId].total++;
    const userAnswer = answers[q.id];
    if (userAnswer !== undefined && userAnswer === q.correctIndex) {
      sectionCounts[q.sectionId].correct++;
      totalCorrect++;
    }
  }

  const sectionDetails: Record<string, AssessmentSectionResultDetail> = {};
  const sortedSections: Array<{ id: string; name: string; scorePercent: number; level: AssessmentSkillLevel }> = [];

  for (const s of ASSESSMENT_SECTIONS) {
    const data = sectionCounts[s.id] || { correct: 0, total: 1 };
    const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
    const level = getSkillLevel(pct);

    let feedback = '';
    if (level === 'Professional Ready') {
      feedback = `Exceptional precision and command of professional technical ${s.shortLabel.toLowerCase()}.`;
    } else if (level === 'Intermediate') {
      feedback = `Solid working competency in ${s.shortLabel.toLowerCase()} with opportunities for executive refinement.`;
    } else if (level === 'Developing') {
      feedback = `Active foundation established; focus on consistent patterns and targeted ${s.shortLabel.toLowerCase()} drills.`;
    } else {
      feedback = `Priority growth area. Structured foundational ${s.shortLabel.toLowerCase()} practice will unlock rapid gains.`;
    }

    sectionDetails[s.id] = {
      sectionId: s.id,
      sectionName: s.name,
      correct: data.correct,
      total: data.total,
      scorePercent: pct,
      level,
      feedback,
    };

    sortedSections.push({
      id: s.id,
      name: s.name,
      scorePercent: pct,
      level,
    });
  }

  // Sort by score descending
  sortedSections.sort((a, b) => b.scorePercent - a.scorePercent);

  const overallScorePercent = Math.round((totalCorrect / Math.max(1, totalQuestionsCount)) * 100);
  const overallLevel = getSkillLevel(overallScorePercent);

  // Identify Strengths (Top 2-3 sections)
  const topSections = sortedSections.slice(0, 3).filter((s) => s.scorePercent >= 50);
  const strengths = topSections.length > 0
    ? topSections.map((s) => `Strong command in ${s.name} (${s.scorePercent}% • ${s.level})`)
    : [`Positive commitment to diagnostic training and active baseline establishment.`];

  // Identify Weaknesses / Priority Growth Areas (Lowest 2-3 sections)
  const bottomSections = [...sortedSections].reverse().slice(0, 3);
  const weaknesses = bottomSections.map(
    (s) => `Targeted growth in ${s.name} (${s.scorePercent}% • ${s.level})`
  );

  // Recommended Training based on bottom sections
  const recommendedTraining = bottomSections.slice(0, 3).map((s) => {
    const cfg = ASSESSMENT_SECTIONS.find((sec) => sec.id === s.id);
    return {
      title: `Master ${s.name}`,
      description: `Targeted practice drills and scenario walkthroughs to elevate ${s.name} from ${s.level} to the next tier.`,
      targetTab: cfg?.targetTab || 'daily',
      actionParam: s.id,
    };
  });

  // First 7-Day Plan customized to results
  const weakestSection = bottomSections[0] || sortedSections[sortedSections.length - 1];
  const secondWeakest = bottomSections[1] || sortedSections[sortedSections.length - 2];

  const first7DayPlan = [
    {
      day: 1,
      title: `Baseline Calibration: ${weakestSection?.name || 'Foundation English'}`,
      focusArea: weakestSection?.name || 'English Foundation',
      objective: `Master core rules and structural patterns in your primary focus area (${weakestSection?.name || 'Grammar'}).`,
      estimatedMinutes: 45,
      targetTab: ASSESSMENT_SECTIONS.find((s) => s.id === weakestSection?.id)?.targetTab || 'daily',
    },
    {
      day: 2,
      title: 'Executive Vocabulary & Precision Engineering Verbs',
      focusArea: 'Vocabulary & Nuance',
      objective: 'Adopt 10 high-precision verbs and replace generic words in technical updates.',
      estimatedMinutes: 45,
      targetTab: 'vocabulary',
    },
    {
      day: 3,
      title: 'Oral Fluency & Spontaneous Speech Practice',
      focusArea: 'Speaking & Pacing',
      objective: 'Record a 2-minute spontaneous self-talk drill with pause replacement techniques.',
      estimatedMinutes: 50,
      targetTab: 'speaking',
    },
    {
      day: 4,
      title: `Reinforcement: ${secondWeakest?.name || 'Technical Grammar'}`,
      focusArea: secondWeakest?.name || 'Grammar Precision',
      objective: `Eliminate recurring friction in ${secondWeakest?.name || 'sentence structure and grammar'}.`,
      estimatedMinutes: 50,
      targetTab: ASSESSMENT_SECTIONS.find((s) => s.id === secondWeakest?.id)?.targetTab || 'grammar',
    },
    {
      day: 5,
      title: '5-Minute System Architecture Walkthrough',
      focusArea: 'Technical Communication',
      objective: 'Articulate component trade-offs, throughput constraints, and failover design smoothly.',
      estimatedMinutes: 60,
      targetTab: 'speaking',
    },
    {
      day: 6,
      title: 'STAR Behavioral Framework & Pitch Mastery',
      focusArea: 'Interview Communication',
      objective: 'Rehearse your 90-second "Tell me about yourself" elevator pitch with confidence.',
      estimatedMinutes: 60,
      targetTab: 'interview',
    },
    {
      day: 7,
      title: 'Weekly Progress Check & Comprehensive Review',
      focusArea: 'Weekly Assessment',
      objective: 'Complete the Day 7 milestone assessment and measure score deltas across all 8 dimensions.',
      estimatedMinutes: 45,
      targetTab: 'assessment',
    },
  ];

  return {
    overallScorePercent,
    overallLevel,
    totalQuestions: totalQuestionsCount,
    correctCount: totalCorrect,
    sectionDetails,
    strengths,
    weaknesses,
    recommendedTraining,
    first7DayPlan,
  };
}

export interface SectionDeltaItem {
  sectionId: string;
  sectionName: string;
  previousLevel: AssessmentSkillLevel;
  currentLevel: AssessmentSkillLevel;
  previousScore: number;
  currentScore: number;
  scoreChange: number;
  statusText: string;
  deltaType: 'improved' | 'regressed' | 'stable';
  isImproved: boolean;
}

export interface AssessmentComparisonDelta {
  previousScorePercent: number;
  currentScorePercent: number;
  overallScoreChange: number;
  scoreDeltaPercent: number;
  previousOverallLevel: AssessmentSkillLevel;
  currentOverallLevel: AssessmentSkillLevel;
  sectionDeltas: SectionDeltaItem[];
  sectionDeltasMap: Record<string, SectionDeltaItem>;
}

/**
 * Calculates deterministic delta comparison between two assessments.
 * Strictly calculates only from actual stored previous and current records.
 */
export function calculateAssessmentComparisonDelta(
  current: { overallScorePercent?: number; overallLevel?: AssessmentSkillLevel; scorePercent?: number; sectionDetails?: Record<string, AssessmentSectionResultDetail>; categoryBreakdown?: Record<string, { correct: number; total: number }> },
  previous: { overallScorePercent?: number; overallLevel?: AssessmentSkillLevel; scorePercent?: number; sectionDetails?: Record<string, AssessmentSectionResultDetail>; categoryBreakdown?: Record<string, { correct: number; total: number }> }
): AssessmentComparisonDelta {
  const curScore = current.overallScorePercent ?? current.scorePercent ?? 0;
  const prevScore = previous.overallScorePercent ?? previous.scorePercent ?? 0;
  const overallScoreChange = curScore - prevScore;
  const curOverallLevel = current.overallLevel || getSkillLevel(curScore);
  const prevOverallLevel = previous.overallLevel || getSkillLevel(prevScore);

  const sectionDeltasMap: Record<string, SectionDeltaItem> = {};
  const sectionDeltas: SectionDeltaItem[] = [];

  for (const s of ASSESSMENT_SECTIONS) {
    let curSecScore = current.sectionDetails?.[s.id]?.scorePercent;
    if (curSecScore === undefined && current.categoryBreakdown?.[s.shortLabel]) {
      const b = current.categoryBreakdown[s.shortLabel];
      curSecScore = b.total > 0 ? Math.round((b.correct / b.total) * 100) : 0;
    }
    curSecScore = curSecScore ?? 0;

    let prevSecScore = previous.sectionDetails?.[s.id]?.scorePercent;
    if (prevSecScore === undefined && previous.categoryBreakdown?.[s.shortLabel]) {
      const b = previous.categoryBreakdown[s.shortLabel];
      prevSecScore = b.total > 0 ? Math.round((b.correct / b.total) * 100) : 0;
    }
    prevSecScore = prevSecScore ?? 0;

    const curSecLevel = current.sectionDetails?.[s.id]?.level || getSkillLevel(curSecScore);
    const prevSecLevel = previous.sectionDetails?.[s.id]?.level || getSkillLevel(prevSecScore);

    const scoreChange = curSecScore - prevSecScore;
    let statusText = `${prevSecLevel} → ${curSecLevel}`;
    let deltaType: 'improved' | 'regressed' | 'stable' = 'stable';
    if (scoreChange > 0) {
      statusText += ` (+${scoreChange}%)`;
      deltaType = 'improved';
    } else if (scoreChange < 0) {
      statusText += ` (${scoreChange}%)`;
      deltaType = 'regressed';
    } else {
      statusText = `Consistent (${curSecLevel} • ${curSecScore}%)`;
      deltaType = 'stable';
    }

    const item: SectionDeltaItem = {
      sectionId: s.id,
      sectionName: s.name,
      previousLevel: prevSecLevel,
      currentLevel: curSecLevel,
      previousScore: prevSecScore,
      currentScore: curSecScore,
      scoreChange,
      statusText,
      deltaType,
      isImproved: scoreChange > 0,
    };

    sectionDeltasMap[s.id] = item;
    sectionDeltas.push(item);
  }

  return {
    previousScorePercent: prevScore,
    currentScorePercent: curScore,
    overallScoreChange,
    scoreDeltaPercent: overallScoreChange,
    previousOverallLevel: prevOverallLevel,
    currentOverallLevel: curOverallLevel,
    sectionDeltas,
    sectionDeltasMap,
  };
}
