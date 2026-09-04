export interface TrainingTrack {
  id: string;
  title: string;
  shortDescription: string;
  iconName: string;
  category: 'core' | 'specialized' | 'assessment';
  estimatedHours: number;
  totalModules: number;
}

export interface GrammarTopic {
  id: string;
  title: string;
  level: 'Intermediate' | 'Advanced' | 'Expert';
  ruleSummary: string;
  commonMistake: string;
  correctedVersion: string;
  engineeringContext: string;
  examples: Array<{
    scenario: string;
    incorrect: string;
    correct: string;
    explanation: string;
  }>;
  quickQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface VocabularyItem {
  id: string;
  term: string;
  category: 'Executive' | 'System Architecture' | 'Product & Strategy' | 'Agile & Collaboration' | 'Negotiation';
  phonetic: string;
  definition: string;
  corporateContext: string;
  sampleSentences: string[];
  synonyms: string[];
  antonyms?: string[];
  nuanceTip: string;
}

export interface PronunciationItem {
  id: string;
  term: string;
  phonetic: string;
  syllableBreakdown: string;
  audioSimulatedText: string;
  commonMispronunciation: string;
  whyItMatters: string;
  practiceSentence: string;
}

export interface SpeakingPrompt {
  id: string;
  title: string;
  category: 'Technical Pitch' | 'Agile Standup' | 'Executive Presentation' | 'Conflict Resolution' | 'Design Trade-Offs';
  timeLimitSeconds: number;
  scenario: string;
  bulletPointsToCover: string[];
  modelAnswerOutline: string;
  keyPhrasesToUse: string[];
  fillerWordWatchlist: string[];
}

export interface ListeningScenario {
  id: string;
  title: string;
  speakerRole: string;
  accent: string;
  durationApprox: string;
  audioTranscript: string;
  contextNote: string;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
}

export interface TechnicalEnglishLesson {
  id: string;
  title: string;
  focusArea: 'Code Reviews' | 'RFC Writing' | 'Incident Postmortems' | 'System Trade-offs' | 'Technical Mentorship';
  framework: string;
  goodVsBadExamples: Array<{
    situation: string;
    unprofessional: string;
    professional: string;
    keyDifference: string;
  }>;
  templates: Array<{
    name: string;
    pattern: string;
    fillInExample: string;
  }>;
}

export interface InterviewEnglishLesson {
  id: string;
  title: string;
  interviewType: 'Behavioral (STAR)' | 'Technical Leadership' | 'System Design Discussion' | 'Salary Negotiation' | 'Introduction';
  framework: string;
  sampleQuestion: string;
  sampleHighScoringAnswer: string;
  breakdown: Array<{
    phase: string;
    content: string;
  }>;
  powerPhrases: string[];
}

export interface ProfessionalEmailTemplate {
  id: string;
  category: 'Status Updates' | 'Scope Creep / Pushback' | 'Executive Escalation' | 'Salary & Promotion' | 'Client Relations';
  title: string;
  scenario: string;
  subjectLine: string;
  body: string;
  keyTakeaways: string[];
}

export interface AssessmentQuestion {
  id: string;
  category: 'Grammar' | 'Vocabulary' | 'Technical Clarity' | 'Interview Judgment' | 'Tone & Diplomacy';
  question: string;
  scenarioContext?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DailyMicroMission {
  dateStr: string; // YYYY-MM-DD
  dayNumber: number;
  title: string;
  focusTrack: string;
  speechDrill: {
    prompt: string;
    targetDurationSeconds: number;
    targetPhrases: string[];
  };
  grammarDrill: {
    sentenceWithFlaw: string;
    hint: string;
    correctSentence: string;
    rule: string;
  };
  vocabularyWord: VocabularyItem;
  quickTip: string;
}

// =========================================================================
// 1. TRAINING TRACKS OVERVIEW
// =========================================================================
export const TRAINING_TRACKS: TrainingTrack[] = [
  {
    id: 'daily',
    title: 'Daily Micro-Training',
    shortDescription: '15-minute high-yield routine combining impromptu speaking, vocabulary booster, and grammar refinement.',
    iconName: 'Flame',
    category: 'core',
    estimatedHours: 20,
    totalModules: 30,
  },
  {
    id: 'speaking',
    title: 'Speaking & Pacing Fluency',
    shortDescription: 'Master vocal projection, rhythm, syllable stress, and eliminate conversational filler words.',
    iconName: 'Mic',
    category: 'core',
    estimatedHours: 25,
    totalModules: 18,
  },
  {
    id: 'technical',
    title: 'Technical & Architecture English',
    shortDescription: 'Articulate architectural trade-offs, lead constructive code reviews, and author crisp RFCs.',
    iconName: 'Cpu',
    category: 'specialized',
    estimatedHours: 30,
    totalModules: 14,
  },
  {
    id: 'interview',
    title: 'Tech Interview Communication (STAR)',
    shortDescription: 'Deliver structured behavioral stories, think aloud during live coding, and convey engineering leadership.',
    iconName: 'Award',
    category: 'specialized',
    estimatedHours: 35,
    totalModules: 16,
  },
  {
    id: 'professional',
    title: 'Corporate & Executive Presence',
    shortDescription: 'Write airtight executive emails, navigate agile standups, and resolve cross-functional friction with diplomacy.',
    iconName: 'Briefcase',
    category: 'specialized',
    estimatedHours: 22,
    totalModules: 15,
  },
  {
    id: 'vocabulary',
    title: 'Executive Vocabulary Flashcards',
    shortDescription: 'Acquire 100+ precision idioms and collocations used by senior Silicon Valley & MNC leaders.',
    iconName: 'BookOpen',
    category: 'core',
    estimatedHours: 15,
    totalModules: 20,
  },
  {
    id: 'grammar',
    title: 'Grammar for Engineering Leaders',
    shortDescription: 'Eliminate subtle ESL habits, master conditional structures, and refine technical passive/active voice.',
    iconName: 'CheckCircle2',
    category: 'core',
    estimatedHours: 18,
    totalModules: 12,
  },
  {
    id: 'listening',
    title: 'Global Stakeholder Listening Drills',
    shortDescription: 'Simulate high-stakes requirements meetings with diverse international accents and rapid technical briefs.',
    iconName: 'Headphones',
    category: 'core',
    estimatedHours: 15,
    totalModules: 10,
  },
];

// =========================================================================
// 2. GRAMMAR FOR ENGINEERING LEADERS
// =========================================================================
export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'conditionals-tradeoffs',
    title: 'Conditionals for System Design & Trade-Offs',
    level: 'Advanced',
    ruleSummary: 'Use Second & Third Conditionals with modal verbs ("If we used Redis, we would reduce latency, but if we had chosen PostgreSQL...") to sound analytical rather than dogmatic.',
    commonMistake: 'Using "If we will use Kafka..." or mixing unreal past with present conditional incorrectly.',
    correctedVersion: 'If we provision a Kafka cluster, we will achieve higher throughput; however, if we were to adopt RabbitMQ, operational overhead would be lower.',
    engineeringContext: 'Whiteboard design interviews and architectural review meetings require speculating on hypothetical architectural decisions.',
    examples: [
      {
        scenario: 'Explaining database choice to CTO',
        incorrect: 'If we will shard the database now, it is wasting time.',
        correct: 'If we were to shard the database at our current scale, we would introduce unnecessary complexity.',
        explanation: 'The hypothetical conditional ("were to... would") expresses nuanced technical prudence.',
      },
      {
        scenario: 'Post-mortem incident analysis',
        incorrect: 'If we added circuit breakers before, the outage will not happen.',
        correct: 'Had we implemented circuit breakers, the cascade failure would have been mitigated.',
        explanation: 'Inverted third conditional ("Had we implemented...") provides concise, authoritative retrospective tone.',
      },
    ],
    quickQuiz: {
      question: 'Which sentence best expresses a cautious technical recommendation for an upcoming migration?',
      options: [
        'If we will migrate to Kubernetes, our deployments become faster.',
        'Were we to migrate to Kubernetes now, we would risk stretching our ops bandwidth.',
        'If we migrate to Kubernetes, we would have been faster.',
        'If we migrated to Kubernetes, we will see better autoscaling.',
      ],
      correctIndex: 1,
      explanation: '"Were we to migrate... we would risk..." accurately frames a hypothetical evaluation with professional nuance.',
    },
  },
  {
    id: 'active-vs-passive-rfcs',
    title: 'Active vs. Passive Voice in Technical RFCs',
    level: 'Intermediate',
    ruleSummary: 'Use Active Voice for ownership ("The auth service verifies tokens") and Passive Voice for system actions where the actor is the environment ("Requests are throttled when thresholds are exceeded").',
    commonMistake: 'Overusing passive voice to describe engineering responsibility, obscuring who owns what.',
    correctedVersion: 'The Data Engineering team maintains the pipeline, whereas worker threads consume queue messages.',
    engineeringContext: 'Architecture RFCs and API documentation must be unambiguous regarding system actors and human owners.',
    examples: [
      {
        scenario: 'Writing Pull Request description',
        incorrect: 'Memory leaks were observed and fixes were deployed by me.',
        correct: 'I identified the memory leak in the connection pool and optimized garbage collector thresholds.',
        explanation: 'Active voice demonstrates clear ownership and engineering leadership.',
      },
      {
        scenario: 'API Security Specification',
        incorrect: 'Our team encrypts all payloads before they are sent.',
        correct: 'The gateway encrypts all outgoing payloads using AES-256 before transmission.',
        explanation: 'Explicit technical subject gives precise architectural mechanics.',
      },
    ],
    quickQuiz: {
      question: 'Select the sentence with the most effective technical clarity for an engineering design doc:',
      options: [
        'The query is being slow because of indexes not being built.',
        'Unindexed foreign keys cause full table scans during peak traffic.',
        'A full table scan is happened when queries run.',
        'Indexes were forgotten to be created by someone.',
      ],
      correctIndex: 1,
      explanation: 'Direct active causation ("Unindexed foreign keys cause full table scans") provides immediate root-cause clarity.',
    },
  },
  {
    id: 'modal-verbs-requirements',
    title: 'Modal Verbs of Obligation & Recommendation (RFC 2119)',
    level: 'Advanced',
    ruleSummary: 'Standardize on precise modal verbs: MUST (mandatory requirement), SHOULD (strong recommendation unless valid exception), MAY (optional feature).',
    commonMistake: 'Using vague terms like "We will try to" or "It is nice to have" in formal technical specifications.',
    correctedVersion: 'Microservices MUST authenticate via mTLS and SHOULD log correlation IDs in OpenTelemetry format.',
    engineeringContext: 'RFC 2119 compliance is the industry standard for engineering specifications across Google, AWS, and ISO.',
    examples: [
      {
        scenario: 'Defining SLA / SLO in sprint contract',
        incorrect: 'The API might respond within 200ms if servers are fine.',
        correct: 'The service MUST maintain a p99 latency below 200ms under standard load.',
        explanation: 'MUST establishes an enforceable engineering contract.',
      },
      {
        scenario: 'Recommending caching strategy',
        incorrect: 'You can maybe use Redis if you feel like.',
        correct: 'Clients SHOULD leverage local caching to prevent thundering herd issues on the database.',
        explanation: 'SHOULD signals best practice with room for edge-case deviation.',
      },
    ],
    quickQuiz: {
      question: 'Which statement correctly uses RFC 2119 modal verbs for a zero-trust architecture rule?',
      options: [
        'Endpoints might need authentication sometimes.',
        'All public-facing API endpoints MUST enforce JWT verification on incoming requests.',
        'It is very good if JWT verification is done on endpoints.',
        'We will surely verify JWT on all requests.',
      ],
      correctIndex: 1,
      explanation: '"MUST enforce" is the canonical standard for non-negotiable architectural mandates.',
    },
  },
  {
    id: 'subject-verb-concurrency',
    title: 'Subject-Verb Agreement in Complex Engineering Sentences',
    level: 'Advanced',
    ruleSummary: 'Ensure verbs agree with the core head noun rather than intervening prepositional phrases or descriptive clauses.',
    commonMistake: '"A cluster of twelve high-memory worker nodes are failing health checks."',
    correctedVersion: 'A cluster of twelve high-memory worker nodes is failing health checks.',
    engineeringContext: 'Describing distributed systems often involves lengthy noun phrases with multiple qualifiers.',
    examples: [
      {
        scenario: 'Incident report summary',
        incorrect: 'The latency of the microservice endpoints have increased by 40%.',
        correct: 'The latency of the microservice endpoints has increased by 40%.',
        explanation: '"Latency" (singular) is the subject, not "endpoints".',
      },
      {
        scenario: 'Resource capacity planning',
        incorrect: 'Neither the primary node nor the secondary replicas was responsive.',
        correct: 'Neither the primary node nor the secondary replicas were responsive.',
        explanation: 'When using "neither... nor", the verb agrees with the closer subject ("replicas" -> plural).',
      },
    ],
    quickQuiz: {
      question: 'Identify the grammatically flawless technical observation:',
      options: [
        'Each of the background worker threads have encountered memory exhaustion.',
        'The group of decoupled services communicates via event-driven Kafka topics.',
        'A collection of automated regression tests are failing in CI/CD.',
        'The number of concurrent database connections have exceeded max limits.',
      ],
      correctIndex: 1,
      explanation: '"The group" is singular and correctly takes the singular verb "communicates".',
    },
  },
  {
    id: 'past-present-perfect-sprints',
    title: 'Present Perfect vs. Past Simple in Agile & Sprint Reporting',
    level: 'Intermediate',
    ruleSummary: 'Use Simple Past for completed past actions with a specific time ("Yesterday I deployed the fix") and Present Perfect for ongoing states or achievements with present impact ("I have resolved the edge cases and am ready for QA").',
    commonMistake: 'Saying "I have fixed this bug yesterday" (incorrect time pairing) or "I already finish it".',
    correctedVersion: 'Yesterday, I analyzed the memory dump; this morning, I have deployed the hotfix and verified telemetry.',
    engineeringContext: 'Daily standups require rapid, accurate chronological orientation of progress and blockers.',
    examples: [
      {
        scenario: 'Daily Standup Update',
        incorrect: 'Since last sprint, I completed 5 tickets and I have closed them yesterday.',
        correct: 'Since last sprint, I have completed 5 tickets; I closed the final batch yesterday.',
        explanation: '"Since last sprint" takes Present Perfect; "yesterday" takes Simple Past.',
      },
    ],
    quickQuiz: {
      question: 'Which standup sentence uses tense structure correctly?',
      options: [
        'I have pushed the pull request two hours ago.',
        'I pushed the pull request two hours ago, and CI has already passed.',
        'I already push the pull request yesterday.',
        'I have been pushing the pull request yesterday morning.',
      ],
      correctIndex: 1,
      explanation: '"Pushed two hours ago" (Past Simple) pairs correctly with "CI has already passed" (Present Perfect result).',
    },
  },
];

// =========================================================================
// 3. VOCABULARY FOR TECH & EXECUTIVE LEADERSHIP
// =========================================================================
export const VOCABULARY_LIST: VocabularyItem[] = [
  {
    id: 'parsimonious',
    term: 'Parsimonious',
    category: 'System Architecture',
    phonetic: '/ˌpɑːr.səˈmoʊ.ni.əs/',
    definition: 'Frugal, extremely economical with resources or design footprint.',
    corporateContext: 'Used when justifying lightweight architecture, minimalistic dependencies, or low memory footprint.',
    sampleSentences: [
      'Our microservice design is parsimonious with network hops to ensure sub-10ms response times.',
      'We chose a parsimonious data schema that minimized serialized payload overhead across distributed nodes.',
    ],
    synonyms: ['Frugal', 'Minimalist', 'Efficient', 'Lean'],
    antonyms: ['Bloated', 'Extravagant', 'Profligate'],
    nuanceTip: 'Use in system design reviews to highlight conscious optimization over accidental complexity.',
  },
  {
    id: 'ephemeral',
    term: 'Ephemeral',
    category: 'System Architecture',
    phonetic: '/ɪˈfem.ər.əl/',
    definition: 'Lasting for a very short time; transient and non-persistent.',
    corporateContext: 'Used for stateless containers, short-lived tokens, serverless executions, and temporary compute instances.',
    sampleSentences: [
      'Lambda instances operate with ephemeral storage that is discarded immediately after execution.',
      'We use ephemeral session credentials with a 15-minute TTL to enforce strict zero-trust security.',
    ],
    synonyms: ['Transient', 'Short-lived', 'Stateless', 'Fleeting'],
    antonyms: ['Persistent', 'Durable', 'Permanent'],
    nuanceTip: 'Distinguish clearly between "ephemeral cache" and "durable persistent store" in technical evaluations.',
  },
  {
    id: 'disambiguate',
    term: 'Disambiguate',
    category: 'Product & Strategy',
    phonetic: '/ˌdɪs.æmˈbɪɡ.ju.eɪt/',
    definition: 'To remove uncertainty or alternative interpretations from a requirement or data stream.',
    corporateContext: 'Used when aligning conflicting stakeholder requirements, clarifying vague user stories, or parsing polymorphic data.',
    sampleSentences: [
      'Let us disambiguate the SLA requirements before committing to the Q4 roadmap.',
      'The API gateway uses contextual headers to disambiguate requests between legacy and v2 microservices.',
    ],
    synonyms: ['Clarify', 'Demystify', 'Elucidate', 'Standardize'],
    antonyms: ['Obfuscate', 'Conflate', 'Complicate'],
    nuanceTip: 'Highly respected in senior leadership meetings when proposing requirement discovery sessions.',
  },
  {
    id: 'concomitant',
    term: 'Concomitant',
    category: 'Executive',
    phonetic: '/kənˈkɑː.mə.t̬ənt/',
    definition: 'Naturally accompanying or associated with a primary event or decision.',
    corporateContext: 'Used when discussing side-effects, operational overheads, or accompanying security implications of a major pivot.',
    sampleSentences: [
      'Rapid scaling without concomitant automated testing will inevitably escalate technical debt.',
      'The migration to event-driven streaming brought a concomitant need for robust dead-letter queue monitoring.',
    ],
    synonyms: ['Accompanying', 'Attendant', 'Associated', 'Concurrent'],
    nuanceTip: 'Pairs powerfully in risk management matrices and executive strategy documents.',
  },
  {
    id: 'caveat',
    term: 'Caveat',
    category: 'Executive',
    phonetic: '/ˈkæv.i.ɑːt/',
    definition: 'A warning or proviso of specific stipulations, conditions, or limitations.',
    corporateContext: 'Used to qualify technical commitments or highlight operational boundary conditions.',
    sampleSentences: [
      'I approve this architecture with one important caveat: we must benchmark database connection pool limits under 10x traffic.',
      'Our performance benchmarks look promising, but the caveat is that tests were conducted on synthetic mock data.',
    ],
    synonyms: ['Proviso', 'Stipulation', 'Condition', 'Disclaimer'],
    nuanceTip: 'Say "With the caveat that..." rather than "One problem is..." to sound constructive and strategic.',
  },
  {
    id: 'amortize',
    term: 'Amortize',
    category: 'System Architecture',
    phonetic: '/ˈæm.ɚ.taɪz/',
    definition: 'To gradually write off or distribute a cost or complexity overhead over multiple operations or time periods.',
    corporateContext: 'Common in algorithmic complexity analysis (e.g. dynamic array resizing) and cloud infrastructure ROI calculations.',
    sampleSentences: [
      'While index rebuilding has high upfront computational cost, it amortizes to O(1) read latency during peak hours.',
      'The initial engineering effort to build a custom CI runner will amortize across hundreds of daily builds.',
    ],
    synonyms: ['Distribute', 'Balance', 'Offset', 'Prorate'],
    nuanceTip: 'Essential for DSA interview rounds when explaining amortized time complexity of hash tables or vectors.',
  },
  {
    id: 'canonical',
    term: 'Canonical',
    category: 'System Architecture',
    phonetic: '/kəˈnɑː.nɪ.kəl/',
    definition: 'Conforming to a recognized standard, orthodox rule, or authoritative reference model.',
    corporateContext: 'Used for single-source-of-truth data schemas, reference architectures, and official company coding guidelines.',
    sampleSentences: [
      'All microservices must deserialize user records from the canonical protobuf schema published by the Core Data team.',
      'This implementation represents the canonical implementation of the Circuit Breaker pattern in our codebase.',
    ],
    synonyms: ['Authoritative', 'Standard', 'Definitive', 'Exemplary'],
    nuanceTip: 'Use when establishing foundational blueprints across multiple engineering squads.',
  },
  {
    id: 'bifurcate',
    term: 'Bifurcate',
    category: 'Agile & Collaboration',
    phonetic: '/ˈbaɪ.fɚ.keɪt/',
    definition: 'To divide into two distinct branches, forks, or operational streams.',
    corporateContext: 'Used when splitting codebase repositories, segregating user traffic in A/B experiments, or branching roadmaps.',
    sampleSentences: [
      'We bifurcated the monolithic API into an external public gateway and an internal high-throughput service mesh.',
      'To expedite delivery, we can bifurcate the initiative into an MVP release and a post-launch optimization sprint.',
    ],
    synonyms: ['Fork', 'Split', 'Diverge', 'Segregate'],
    nuanceTip: 'Clean, professional substitute for "split into two parts".',
  },
];

// =========================================================================
// 4. PRONUNCIATION & PHONETICS FOR TECH LEADERS
// =========================================================================
export const PRONUNCIATION_LIST: PronunciationItem[] = [
  {
    id: 'kubernetes',
    term: 'Kubernetes',
    phonetic: '/ˌkuː.bɚˈnet̬.iːz/',
    syllableBreakdown: 'Koo - ber - NET - eez',
    audioSimulatedText: 'Stress on the 3rd syllable: "NET"',
    commonMispronunciation: 'Koo-ber-net-ess or Kuber-nets',
    whyItMatters: 'Every DevOps and backend interview checks your familiarity with industry container orchestration.',
    practiceSentence: 'We orchestrated our containerized microservices on a multi-region Kubernetes cluster.',
  },
  {
    id: 'hierarchy',
    term: 'Hierarchy',
    phonetic: '/ˈhaɪ.rɑːr.ki/',
    syllableBreakdown: 'HY - er - ar - kee',
    audioSimulatedText: 'First syllable sounds like "HI" or "HIGH"',
    commonMispronunciation: 'Hair-ar-chee or Hee-rar-kee',
    whyItMatters: 'Used constantly when describing class inheritance, organizational charts, and DOM trees.',
    practiceSentence: 'The DOM tree maintains a strict parent-child node hierarchy.',
  },
  {
    id: 'paradigm',
    term: 'Paradigm',
    phonetic: '/ˈper.ə.daɪm/',
    syllableBreakdown: 'PAIR - uh - dime',
    audioSimulatedText: 'The "g" is completely silent; ends with "DIME"',
    commonMispronunciation: 'Para-dig-um or Para-dij-em',
    whyItMatters: 'Central to discussing functional vs object-oriented programming paradigms in high-level architectural chats.',
    practiceSentence: 'React introduced a declarative component paradigm that streamlined state synchronization.',
  },
  {
    id: 'cache',
    term: 'Cache',
    phonetic: '/kæʃ/',
    syllableBreakdown: 'CASH',
    audioSimulatedText: 'Rhymes exactly with "Cash" or "Dash"',
    commonMispronunciation: 'Caysh or Cash-ay (which is "cachet")',
    whyItMatters: 'One of the most frequently spoken words in backend engineering and system design interviews.',
    practiceSentence: 'We implemented an in-memory Redis cache to dramatically reduce latency.',
  },
  {
    id: 'boolean',
    term: 'Boolean',
    phonetic: '/ˈbuː.li.ən/',
    syllableBreakdown: 'BOO - lee - un',
    audioSimulatedText: 'Starts with "BOO" as in spooky, followed by "lee-un"',
    commonMispronunciation: 'Bowl-ee-an or Boo-lin',
    whyItMatters: 'Foundational data type referenced in daily code discussions and logic reviews.',
    practiceSentence: 'The authentication guard returns a boolean flag indicating verification status.',
  },
  {
    id: 'tuple',
    term: 'Tuple',
    phonetic: '/ˈtʌp.əl/ or /ˈtuː.pəl/',
    syllableBreakdown: 'TUP - uhl or TOO - puhl',
    audioSimulatedText: 'Either "TUP-uhl" (like cup) or "TOO-puhl" (like two)',
    commonMispronunciation: 'Too-play or Tup-lay',
    whyItMatters: 'Crucial in Python, TypeScript, and relational algebra discussions.',
    practiceSentence: 'The function returns an immutable tuple containing the response status and payload.',
  },
  {
    id: 'epoch',
    term: 'Epoch',
    phonetic: '/ˈep.ək/ or /ˈiː.pɑːk/',
    syllableBreakdown: 'EH - puck or EE - pock',
    audioSimulatedText: 'Short "E" like "egg", ending in "puck"',
    commonMispronunciation: 'Ee-potch or Ep-oh-k',
    whyItMatters: 'Standard in Unix timestamp formatting and Machine Learning training cycles.',
    practiceSentence: 'Timestamps are stored as 64-bit integers representing milliseconds since the Unix epoch.',
  },
];

// =========================================================================
// 5. SPEAKING PROMPTS & IMPROMPTU DRILLS
// =========================================================================
export const SPEAKING_PROMPTS: SpeakingPrompt[] = [
  {
    id: 'system-tradeoff-60s',
    title: '60-Second Architecture Defense: SQL vs NoSQL',
    category: 'Design Trade-Offs',
    timeLimitSeconds: 60,
    scenario: 'A senior engineering manager asks: "Why should we choose PostgreSQL over MongoDB for our new financial transactions service?"',
    bulletPointsToCover: [
      'ACID transactional guarantees vs eventual consistency',
      'Data integrity, foreign key constraints, schema enforcement',
      'Financial auditing requirements and rollback capabilities',
    ],
    modelAnswerOutline: 'Begin with direct assertion -> Highlight ACID and strict schema necessity for ledger transactions -> Address scale trade-off -> Conclude with confident recommendation.',
    keyPhrasesToUse: [
      'The primary differentiator is strict ACID compliance...',
      'In a financial ledger context, data integrity supersedes flexible schema agility...',
      'Were we to encounter distributed race conditions, relational transactions guarantee state consistency...',
    ],
    fillerWordWatchlist: ['Um', 'Uh', 'Like', 'Actually', 'Basically', 'You know'],
  },
  {
    id: 'standup-blocker-60s',
    title: 'Agile Standup: Articulating a Third-Party API Blocker',
    category: 'Agile Standup',
    timeLimitSeconds: 60,
    scenario: 'In morning standup, you need to report that your task is blocked by an unannounced breaking change in Stripe payment webhooks.',
    bulletPointsToCover: [
      'What was completed yesterday',
      'The exact blocker encountered (Stripe webhook payload signature failure)',
      'Immediate mitigation underway and team member you need 10 mins with',
    ],
    modelAnswerOutline: 'Status of completed integration -> Clear identification of breaking change blocker -> Specific call to action / pair programming request.',
    keyPhrasesToUse: [
      'Yesterday, I finalized the checkout endpoint integration...',
      'However, I am currently blocked on Stripe webhook verification due to a signature mismatch...',
      'I have opened an escalation ticket and would like to sync with Priya for 10 minutes after standup...',
    ],
    fillerWordWatchlist: ['So yeah', 'Kind of', 'Sort of', 'I guess'],
  },
  {
    id: 'code-review-pushback-90s',
    title: 'Diplomatic Code Review Pushback on Pull Request',
    category: 'Conflict Resolution',
    timeLimitSeconds: 90,
    scenario: 'A colleague left a comment on your PR demanding you rewrite your async Promise pipeline using synchronous blocking calls.',
    bulletPointsToCover: [
      'Acknowledge colleague intent for simpler code',
      'Explain technical drawback of blocking the Node.js event loop',
      'Propose clean async/await refactor with try/catch to satisfy both concerns',
    ],
    modelAnswerOutline: 'Appreciate review -> Quantify event loop saturation risk -> Offer clean async pattern as collaborative middle ground.',
    keyPhrasesToUse: [
      'I appreciate your point regarding readability...',
      'The core concern with synchronous execution is that it blocks the event loop under concurrent load...',
      'To balance clean syntax with non-blocking performance, I have refactored this into async/await with robust error boundaries...',
    ],
    fillerWordWatchlist: ['You are wrong', 'Obviously', 'Whatever'],
  },
  {
    id: 'tell-me-about-yourself-120s',
    title: 'Executive Elevator Pitch: "Tell Me About Yourself"',
    category: 'Technical Pitch',
    timeLimitSeconds: 120,
    scenario: 'You are kicking off an interview with a VP of Engineering at a top product tech company.',
    bulletPointsToCover: [
      'Current role & high-impact engineering specialization',
      'Key milestone: Scaled system, solved hard performance challenge, or built end-to-end product',
      'Why this company and specific mission align with your technical trajectory',
    ],
    modelAnswerOutline: 'Present identity -> Highlight flagship accomplishment with metrics -> Connect passion to company roadmap.',
    keyPhrasesToUse: [
      'I am a software engineer specializing in scalable full-stack architectures and distributed backend systems...',
      'Most recently, I architected a real-time analytics pipeline that reduced latency by 35% across 50,000 active users...',
      'What excites me about this team is your investment in high-throughput infrastructure and generative AI developer tooling...',
    ],
    fillerWordWatchlist: ['I am basically Swamy and I did...', 'Nothing much', 'Um... so...'],
  },
];

// =========================================================================
// 6. LISTENING COMPREHENSION SCENARIOS
// =========================================================================
export const LISTENING_SCENARIOS: ListeningScenario[] = [
  {
    id: 'us-product-manager-brief',
    title: 'Sprint Kickoff: Product Manager on Real-Time Webhook SLAs',
    speakerRole: 'Director of Product (US West Coast)',
    accent: 'Standard American (Fast-Paced)',
    durationApprox: '1m 15s read',
    audioTranscript: `"Hey team, thanks for jumping on. To recap our sync with enterprise clients yesterday: they're experiencing intermittent drops during peak flash-sale hours on our webhook ingestion pipeline. Specifically, when their system triggers more than five thousand events per second, our gateway throttles them with 429 Too Many Requests instead of buffering the payloads. 

    The product requirement for Q4 is non-negotiable: we must transition from synchronous HTTP handling to an asynchronous ingestion queue using Kafka or SQS. The gateway should return an immediate 202 Accepted response with a tracking UUID within fifty milliseconds, while worker pools process the payload downstream. 

    Devin and Swamy, I need you two to spike an architectural RFC by Thursday so we can review load testing projections with infrastructure before sprint freeze. Let me know if anyone has bandwidth constraints."`,
    contextNote: 'Notice the implicit expectation: the gateway response contract changes from 200 OK synchronous to 202 Accepted asynchronous.',
    questions: [
      {
        id: 'q1',
        question: 'What is the primary technical failure enterprise clients are experiencing during flash sales?',
        options: [
          'Database deadlocks during user checkout',
          'HTTP 429 rate limiting due to lack of an async buffer queue at 5k+ EPS',
          'SSL handshake timeouts on the API gateway',
          'Kafka consumer lag exceeding 10 minutes',
        ],
        correctIndex: 1,
        explanation: 'The PM stated the gateway throttles clients with 429 Too Many Requests instead of buffering high-volume spikes.',
      },
      {
        id: 'q2',
        question: 'What is the new SLA and response status code mandated for the API gateway?',
        options: [
          '200 OK within 200 milliseconds',
          '202 Accepted with a tracking UUID within 50 milliseconds',
          '201 Created with full payload metadata within 100 milliseconds',
          '204 No Content immediately upon TCP connection',
        ],
        correctIndex: 1,
        explanation: 'The specification calls for returning "an immediate 202 Accepted response with a tracking UUID within fifty milliseconds".',
      },
      {
        id: 'q3',
        question: 'What is the deliverable requested by Thursday?',
        options: [
          'Production deployment of Kafka workers',
          'An architectural RFC with load testing projections',
          'A client refund proposal for lost transactions',
          'A complete rewrite of the frontend dashboard',
        ],
        correctIndex: 1,
        explanation: 'The PM specifically asked Devin and Swamy to "spike an architectural RFC by Thursday".',
      },
    ],
  },
  {
    id: 'uk-lead-architect-refactor',
    title: 'Architecture Review: Tech Lead on Microservice Decoupling',
    speakerRole: 'Principal Architect (London, UK)',
    accent: 'British Received Pronunciation',
    durationApprox: '1m 30s read',
    audioTranscript: `"Right, let's address the monolith decoupling strategy. At present, the order service makes direct synchronous gRPC calls into the inventory and pricing databases. This creates a brittle temporal coupling—if inventory latency spikes by even two hundred milliseconds, order completions grind to a halt. 

    Rather than patching the gRPC connection pool, we propose shifting to the Saga pattern orchestrated via event streams. The order service will publish an 'OrderInitiated' event. Inventory will consume this, reserve the SKU locally, and publish an 'InventoryReserved' event. If inventory fails, a compensating transaction triggers an immediate rollback. 

    This insulates our checkout funnel from upstream database volatility. I'd like our backend squad to prototype the state machine using idempotency keys so that duplicated Kafka messages don't result in double-booking stock. Thoughts?"`,
    contextNote: 'Pay attention to the architectural design terminology: "temporal coupling", "Saga pattern", "compensating transaction", and "idempotency keys".',
    questions: [
      {
        id: 'q1',
        question: 'Why does the architect object to continuing with direct synchronous gRPC calls?',
        options: [
          'gRPC is deprecated in modern cloud architectures',
          'It causes brittle temporal coupling where inventory latency cascades into checkout failures',
          'JSON is more performant than Protocol Buffers',
          'The security certificates are too expensive to maintain',
        ],
        correctIndex: 1,
        explanation: 'The architect explicitly cited "brittle temporal coupling—if inventory latency spikes... order completions grind to a halt".',
      },
      {
        id: 'q2',
        question: 'Which architectural pattern is recommended for handling distributed transactions?',
        options: [
          'Two-Phase Commit (2PC) over TCP',
          'Saga pattern orchestrated via event streams with compensating transactions',
          'Shared database tables with pessimistic row locking',
          'Master-Slave replication with manual failover',
        ],
        correctIndex: 1,
        explanation: 'The proposal recommends the Saga pattern with event streams and compensating rollback transactions.',
      },
    ],
  },
];

// =========================================================================
// 7. TECHNICAL & INTERVIEW ENGLISH LESSONS
// =========================================================================
export const TECHNICAL_ENGLISH_LESSONS: TechnicalEnglishLesson[] = [
  {
    id: 'code-reviews-constructive',
    title: 'High-Impact, Constructive Code Review Comments',
    focusArea: 'Code Reviews',
    framework: 'Observation -> Consequence -> Collaborative Suggestion',
    goodVsBadExamples: [
      {
        situation: 'Spotting an unindexed N+1 database query in an ORM loop',
        unprofessional: 'Why did you put a query inside a loop? This will crash our DB in production.',
        professional: 'I noticed this loop executes a separate query per user record, which introduces an N+1 query pattern. Under production load with 10k users, this could saturate database connection pools. What do you think about using eager loading (`select_related` / `JOIN`) to fetch this in a single query?',
        keyDifference: 'Frames the issue around system consequences and asks a collaborative question rather than attacking the developer.',
      },
      {
        situation: 'Missing input sanitization on public route',
        unprofessional: 'This is unsafe. Fix SQL injection immediately.',
        professional: 'Good catch adding this search route! One security consideration: since `rawQuery` is directly interpolated into the SQL string, it leaves the endpoint vulnerable to SQL injection. Could we parameterize this query using prepared statements?',
        keyDifference: 'Compliments the feature intent first, then gives precise technical remediation.',
      },
    ],
    templates: [
      {
        name: 'Performance Optimization Suggestion',
        pattern: 'I noticed [Observed Code]. Under [Specific Load Condition], this might cause [Technical Consequence]. What are your thoughts on [Suggested Pattern/Optimization]?',
        fillInExample: 'I noticed we are cloning the entire array in memory. Under 50MB payload sizes, this might cause high heap allocation and GC pauses. What are your thoughts on passing an iterator instead?',
      },
      {
        name: 'Edge Case Flagging',
        pattern: 'Nice work on [Feature Name]! One edge case to consider: how does this behave when [Edge Case Scenario]? Perhaps we could add a fallback for [Scenario]?',
        fillInExample: 'Nice work on the payment retry handler! One edge case to consider: how does this behave when the network drops mid-transaction? Perhaps we could add an idempotency key to prevent duplicate charges?',
      },
    ],
  },
  {
    id: 'incident-postmortems',
    title: 'Blameless Incident Postmortems & Root Cause Analysis',
    focusArea: 'Incident Postmortems',
    framework: 'Timeline -> Contributing Factors -> Systemic Fixes (Not Human Blame)',
    goodVsBadExamples: [
      {
        situation: 'A developer forgot to run database migration before deploying code',
        unprofessional: 'The outage happened because John deployed without checking migrations.',
        professional: 'The service disruption occurred due to a schema mismatch between the application version v2.4 and the un-migrated database. Our deployment pipeline lacked an automated pre-flight validation gate to block release when pending migrations exist.',
        keyDifference: 'Blameless engineering culture focuses on missing automated guardrails, not individual human error.',
      },
    ],
    templates: [
      {
        name: 'Root Cause Description',
        pattern: 'The primary contributing factor was [Underlying Technical Cause], compounded by [Secondary Factor], which prevented [Expected Guardrail/Fallback].',
        fillInExample: 'The primary contributing factor was connection pool exhaustion in Redis, compounded by aggressive client retries, which prevented health checks from passing.',
      },
    ],
  },
];

export const INTERVIEW_ENGLISH_LESSONS: InterviewEnglishLesson[] = [
  {
    id: 'star-behavioral-conflict',
    title: 'STAR Method: Technical Disagreement with Team Lead',
    interviewType: 'Behavioral (STAR)',
    framework: 'Situation (15s) -> Task (15s) -> Action (45s) -> Result (30s)',
    sampleQuestion: 'Tell me about a time you had a strong technical disagreement with a colleague or lead. How did you resolve it?',
    sampleHighScoringAnswer: `In my previous project, we were designing the real-time notification engine for a financial dashboard. My team lead favored using client-side polling every 2 seconds to ship quickly, whereas I advocated for Server-Sent Events (SSE) or WebSockets to minimize server overhead.

My responsibility was to ensure we met our tight delivery deadline without jeopardizing backend scalability during peak market hours.

Rather than debating abstract preferences, I scheduled a focused 30-minute benchmark spike. I built a minimal prototype simulating 10,000 concurrent connected clients. The telemetry data clearly demonstrated that HTTP polling generated over 300,000 unnecessary server requests per minute, consuming 80% CPU on our instances, whereas SSE maintained a lightweight persistent connection with under 15% CPU utilization. I presented this data to my lead along with a phased rollout plan that fit within our sprint timeline.

He appreciated the data-driven approach and approved the SSE implementation. We launched on schedule with zero performance degradation, supporting 50,000 peak concurrent users during launch week with sub-50ms notification latency.`,
    breakdown: [
      { phase: 'Situation', content: 'Debate between HTTP polling vs Server-Sent Events for financial notifications.' },
      { phase: 'Task', content: 'Deliver on time while protecting backend infrastructure from catastrophic load.' },
      { phase: 'Action', content: 'Conducted a 30-minute benchmark spike and presented quantitative telemetry data collaboratively.' },
      { phase: 'Result', content: 'Adopted SSE, launched on time, supported 50k users at <15% CPU load.' },
    ],
    powerPhrases: [
      'Rather than debating abstract preferences, I anchored the discussion in empirical benchmark data...',
      'My objective was to align our architectural prudence with the product launch timeline...',
      'The outcome validated our engineering hypothesis with a 70% reduction in server footprint...',
    ],
  },
  {
    id: 'thinking-aloud-dsa',
    title: 'Thinking Aloud During Live Coding & DSA Interviews',
    interviewType: 'System Design Discussion',
    framework: 'Clarify -> State Brute Force -> Propose Optimal Pattern -> Write Modular Code -> Dry Run Test Cases',
    sampleQuestion: 'How should you communicate when given a complex LeetCode Medium/Hard algorithmic problem?',
    sampleHighScoringAnswer: `First, let me clarify the constraints: Are there negative numbers in the array, and what is the maximum length of N? 

A brute force approach would be to check every possible pair with nested loops, which takes O(N^2) time and O(1) space. 

However, since we need an optimal solution, we can trade O(N) space for O(N) linear time using a Hash Map. As we iterate through the array, we can check if the complement (target minus current value) is already present in our map. If it is, we return the stored index immediately in single pass.

Let me write out the clean implementation now, and then I will walk through an example trace with edge cases like empty arrays and duplicate values.`,
    breakdown: [
      { phase: '1. Clarification', content: 'Ask about edge cases, constraints, and negative numbers before touching the keyboard.' },
      { phase: '2. Baseline', content: 'State the naive/brute force time & space complexity upfront.' },
      { phase: '3. Optimization Pivot', content: 'Explain WHY a data structure (Hash Map, Two Pointers, Monotonic Stack) solves the bottleneck.' },
      { phase: '4. Trace & Dry Run', content: 'Walk through an explicit dry run with pointer markers before submitting.' },
    ],
    powerPhrases: [
      'Before writing code, let me verify the input boundaries and edge constraints...',
      'The bottleneck in the brute force is the repeated search, which we can optimize to O(1) using...',
      'Let me dry-run this logic against an empty array and a single-element case to verify boundary conditions...',
    ],
  },
];

// =========================================================================
// 8. PROFESSIONAL & EXECUTIVE EMAIL TEMPLATES
// =========================================================================
export const PROFESSIONAL_EMAIL_TEMPLATES: ProfessionalEmailTemplate[] = [
  {
    id: 'feature-delay-escalation',
    category: 'Status Updates',
    title: 'Proactive Project Delay Notice with Mitigation Plan',
    scenario: 'You discover that an unexpected third-party security audit will delay the payment gateway release by 4 business days.',
    subjectLine: '[Update] Revised Timeline & Mitigation for Payment Gateway Rollout',
    body: `Hi Alex,

I am writing to provide a proactive update regarding the Payment Gateway integration scheduled for Friday's release.

During our final staging verification, we identified that our third-party compliance vendor requires an updated PCI-DSS encryption audit. Completing this compliance handshake will require an additional 4 business days, shifting our target launch date to next Wednesday, September 10th.

To mitigate downstream impact:
1. Core checkout and inventory components are fully tested and frozen.
2. We have configured feature flags so that all non-payment UI enhancements deploy on schedule without blocking QA.
3. I am directly coordinating with the security compliance lead to expedite the tokenization certificate.

I will share our next progress check-in on Monday by 11:00 AM. Please let me know if you would like to review the updated staging telemetry before then.

Best regards,
Swamy
Lead Software Engineer`,
    keyTakeaways: [
      'Deliver bad news early rather than at the last minute.',
      'Always present specific mitigation actions already underway.',
      'Establish a clear, predictable time for the next communication check-in.',
    ],
  },
  {
    id: 'scope-creep-pushback',
    category: 'Scope Creep / Pushback',
    title: 'Diplomatic Scope Creep Pushback to Product Stakeholder',
    scenario: 'Product manager requests 3 new complex analytics filters 2 days before sprint code freeze.',
    subjectLine: 'Re: Additional Analytics Filters for Q3 Release — Technical Feasibility & Options',
    body: `Hi Sarah,

Thanks for sharing these additional analytics filter concepts. They will certainly provide valuable insight for enterprise dashboard users.

Given that our code freeze is scheduled in 48 hours, integrating all three multidimensional filters would risk our regression testing window and compromise overall sprint stability.

To ensure we deliver maximum value without jeopardizing the launch date, I propose two options:

Option A (Recommended): We ship the top-priority 'Date Range' and 'User Segment' filters in the current release, and queue the complex 'Custom Multi-Attribute' filter as the flagship item for Sprint 14.
Option B: We accommodate all three filters in this cycle by extending the code freeze by 3 days and adjusting the QA sign-off date accordingly.

Let me know which path best aligns with the upcoming client demo commitments.

Warm regards,
Swamy`,
    keyTakeaways: [
      'Avoid saying a flat "No". Instead, present concrete trade-off options with consequences.',
      'Label your recommended path to guide executive decision making.',
    ],
  },
  {
    id: 'promotion-salary-case',
    category: 'Salary & Promotion',
    title: 'Structuring a Promotion / Level-Up Request to Engineering Manager',
    scenario: 'Preparing a formal case for advancing to Senior / Staff Software Engineer during annual review.',
    subjectLine: 'Career Growth & Senior Engineer Leveling Review — Swamy',
    body: `Hi David,

As we approach our mid-year performance cycle, I would like to schedule 30 minutes to discuss my career trajectory and formal transition to the Senior Software Engineer (L5) band.

Over the past twelve months, I have focused on driving technical scope and engineering excellence across our organization:
• Architectural Leadership: Spearheaded the real-time event streaming pipeline, reducing system latency by 35% and saving $24k/year in cloud compute costs.
• Cross-Functional Execution: Owned the end-to-end delivery of the Placement Preparation & Learning Portal, delivering on schedule across 3 squads.
• Mentorship & Team Health: Onboarded 4 junior engineers, led weekly system design workshops, and reduced open PR turnaround time from 48h to 14h.

I have compiled a detailed impact document mapping these contributions against our engineering leveling rubric. 

Could we use part of our 1:1 next Tuesday to review this document and align on next steps?

Best regards,
Swamy`,
    keyTakeaways: [
      'Quantify results with hard metrics (latency, cost savings, onboarding metrics).',
      'Directly align accomplishments to the formal leveling rubric.',
      'Request dedicated review time ahead of compensation cycle deadlines.',
    ],
  },
];

// =========================================================================
// 9. WEEKLY ASSESSMENT QUESTIONS
// =========================================================================
export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'a1',
    category: 'Grammar',
    question: 'Select the grammatically correct sentence for an architecture review document:',
    options: [
      'If the microservice will experience downtime, the fallback queue activates.',
      'Were the primary database to fail, the replica would automatically assume the master role.',
      'Had we knew about the memory leak, we would patch it sooner.',
      'The cluster of nodes are failing their ping intervals.',
    ],
    correctIndex: 1,
    explanation: '"Were the primary database to fail, the replica would..." correctly uses the inverted conditional for hypothetical architectural resilience.',
  },
  {
    id: 'a2',
    category: 'Vocabulary',
    question: 'Which term best describes an architecture that uses minimal resources, lean dependencies, and avoids bloated code?',
    options: ['Concomitant', 'Parsimonious', 'Disambiguated', 'Ephemeral'],
    correctIndex: 1,
    explanation: '"Parsimonious" denotes frugal, highly economical resource design.',
  },
  {
    id: 'a3',
    category: 'Technical Clarity',
    question: 'Which code review comment exhibits the highest degree of constructive technical leadership?',
    options: [
      'This function is way too long. Rewrite it cleaner.',
      'Why did you use synchronous fs calls here? It is bad practice.',
      'I noticed we are reading files synchronously. Under concurrent web traffic, this could block the Node event loop. What do you think about refactoring to `fs.promises.readFile`?',
      'Approved, but this will probably crash in staging.',
    ],
    correctIndex: 2,
    explanation: 'Explains specific system consequence (event loop blocking) and offers an exact, collaborative alternative.',
  },
  {
    id: 'a4',
    category: 'Interview Judgment',
    question: 'When asked "Tell me about a time you made a mistake" in a Senior FAANG interview, the best strategy is:',
    options: [
      'Pick a trivial flaw like "I work too hard and care too much about perfection."',
      'Blame an intern or junior teammate while explaining how you saved the day.',
      'Acknowledge a genuine technical/planning error, explain the immediate mitigation, and highlight the permanent automated guardrail you implemented.',
      'State that with proper unit testing, you have never introduced a production bug.',
    ],
    correctIndex: 2,
    explanation: 'High-caliber engineering cultures value psychological safety, accountability, and systematic prevention over artificial perfection.',
  },
  {
    id: 'a5',
    category: 'Tone & Diplomacy',
    question: 'How should you respond in Slack when an executive asks for an unrealistic deadline without technical context?',
    options: [
      'Impossible. We need at least two more months.',
      'We can certainly explore ways to hit that target. To deliver within that window, we would need to trim features X and Y or shift QA resources. Let us review the options on a quick 10-minute sync.',
      'Sure, we will try our best (knowing we will fail).',
      'Ignore the message until sprint planning.',
    ],
    correctIndex: 1,
    explanation: 'Maintains can-do executive diplomacy while anchoring constraints around scope and resourcing trade-offs.',
  },
];

// =========================================================================
// 10. DYNAMIC DAILY MICRO-MISSION GENERATOR
// =========================================================================
export function getDailyMicroMission(dateStr?: string): DailyMicroMission {
  const targetDate = dateStr || new Date().toISOString().split('T')[0];
  const [y, m, d] = targetDate.split('-').map(Number);
  const dayIndex = (y * 365 + m * 30 + d) % SPEAKING_PROMPTS.length;
  const vocabIndex = (y * 365 + m * 30 + d) % VOCABULARY_LIST.length;
  const grammarIndex = (y * 365 + m * 30 + d) % GRAMMAR_TOPICS.length;

  const prompt = SPEAKING_PROMPTS[dayIndex] || SPEAKING_PROMPTS[0];
  const vocab = VOCABULARY_LIST[vocabIndex] || VOCABULARY_LIST[0];
  const grammar = GRAMMAR_TOPICS[grammarIndex] || GRAMMAR_TOPICS[0];

  return {
    dateStr: targetDate,
    dayNumber: d,
    title: `Daily Communication Mastery — Day ${d}`,
    focusTrack: prompt.category,
    speechDrill: {
      prompt: prompt.scenario,
      targetDurationSeconds: prompt.timeLimitSeconds,
      targetPhrases: prompt.keyPhrasesToUse,
    },
    grammarDrill: {
      sentenceWithFlaw: grammar.commonMistake,
      hint: grammar.ruleSummary,
      correctSentence: grammar.correctedVersion,
      rule: grammar.title,
    },
    vocabularyWord: vocab,
    quickTip: 'Record your voice once without pausing. Listen back and count your filler words.',
  };
}

export * from './englishCareerCurriculum';

