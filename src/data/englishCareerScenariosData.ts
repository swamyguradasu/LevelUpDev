/**
 * Comprehensive Career Scenarios & Job Readiness Matrix
 * 
 * 15 Core Technical Career Pillars:
 * 1. Software Engineering
 * 2. Python Development
 * 3. Data Analysis
 * 4. Data Science
 * 5. Machine Learning
 * 6. AI Engineering & Generative AI
 * 7. DSA & Algorithmic Problem Solving
 * 8. Full-Stack & End-to-End Projects
 * 9. Git, GitHub & CI/CD Collaboration
 * 10. Technical & System Design Interviews
 * 11. HR & Behavioral Interviews
 * 12. Demos & Project Presentations
 * 13. Agile Standups & Daily Syncs
 * 14. Cross-Functional Team Communication
 * 15. Workplace Written Communication
 */

export type CareerTrackId =
  | 'software_eng'
  | 'python_dev'
  | 'data_analysis'
  | 'data_science'
  | 'machine_learning'
  | 'gen_ai'
  | 'dsa'
  | 'projects'
  | 'git_github'
  | 'tech_interviews'
  | 'hr_interviews'
  | 'presentations'
  | 'standups'
  | 'team_comm'
  | 'workplace_writing';

export interface CareerTrackConfig {
  id: CareerTrackId;
  title: string;
  roleTag: string;
  badgeColor: string;
  iconName: string;
  targetEnglishSkills: string[];
  description: string;
  targetRoles: string[];
  primaryFramework: string;
}

export interface CareerScenario {
  id: string;
  trackId: CareerTrackId;
  title: string;
  scenarioContext: string;
  englishSkillFocus: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeLimitSeconds: number;
  prompt: string;
  stepByStepFramework: Array<{
    step: number;
    name: string;
    goal: string;
    starterPhrase: string;
  }>;
  keyTerminology: string[];
  juniorExample: {
    script: string;
    critique: string;
  };
  seniorExemplar: {
    script: string;
    whyItWins: string;
  };
  targetTab: 'speaking' | 'interview' | 'technical' | 'grammar' | 'vocabulary' | 'daily';
}

export const CAREER_TRACKS_CONFIG: CareerTrackConfig[] = [
  {
    id: 'software_eng',
    title: 'Software Engineering',
    roleTag: 'SWE / Backend / Frontend',
    badgeColor: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
    iconName: 'Cpu',
    targetEnglishSkills: ['Architecture Trade-offs', 'API SLAs', 'Failover Phrasing', 'Code Reviews'],
    description: 'Articulate system design, microservices, database transactions, latency trade-offs, and constructive code reviews.',
    targetRoles: ['Software Engineer', 'Backend Developer', 'Frontend Developer', 'Full-Stack Engineer'],
    primaryFramework: 'Context -> Trade-off -> Recommendation -> Mitigation',
  },
  {
    id: 'python_dev',
    title: 'Python Development',
    roleTag: 'Python / Backend Specialist',
    badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    iconName: 'Code',
    targetEnglishSkills: ['Memory Management Phrasing', 'Async IO Explanations', 'GIL Nuance', 'Packaging Specs'],
    description: 'Explain Python internals (GIL, generators, decorators, memory profiling, PyTest fixtures, and async event loops).',
    targetRoles: ['Python Developer', 'Automation Engineer', 'Backend Python Engineer'],
    primaryFramework: 'Mechanism -> Bottleneck -> Optimization -> Implementation',
  },
  {
    id: 'data_analysis',
    title: 'Data Analysis & BI',
    roleTag: 'Data Analyst / BI Engineer',
    badgeColor: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
    iconName: 'BarChart2',
    targetEnglishSkills: ['Executive Metric Summaries', 'SQL Optimization Phrasing', 'Cohort Storytelling'],
    description: 'Translate raw SQL metrics into business revenue drivers, explain data discrepancies, and present dashboards to non-technical stakeholders.',
    targetRoles: ['Data Analyst', 'BI Developer', 'Analytics Engineer'],
    primaryFramework: 'Insight -> Quantitative Proof -> Business Impact -> Next Action',
  },
  {
    id: 'data_science',
    title: 'Data Science',
    roleTag: 'Data Scientist',
    badgeColor: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
    iconName: 'TrendingUp',
    targetEnglishSkills: ['Statistical Nuance', 'Hypothesis Framing', 'Feature Engineering Rationales'],
    description: 'Communicate statistical significance, p-values, feature importance, and exploratory findings with rigor and clarity.',
    targetRoles: ['Data Scientist', 'Quantitative Analyst', 'Research Scientist'],
    primaryFramework: 'Hypothesis -> Methodology -> Statistical Validation -> Interpretation',
  },
  {
    id: 'machine_learning',
    title: 'Machine Learning Engineering',
    roleTag: 'MLE / Applied Scientist',
    badgeColor: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400',
    iconName: 'Zap',
    targetEnglishSkills: ['Precision/Recall Trade-offs', 'Overfitting Explanations', 'Data Drift Defense'],
    description: 'Explain ML pipeline trade-offs, loss functions, regularization, inference latency, and model monitoring in production.',
    targetRoles: ['Machine Learning Engineer', 'Applied ML Specialist', 'MLOps Engineer'],
    primaryFramework: 'Baseline Metric -> Model Selection -> Trade-off Analysis -> Production Validation',
  },
  {
    id: 'gen_ai',
    title: 'AI Engineering & Generative AI',
    roleTag: 'AI / GenAI Engineer',
    badgeColor: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
    iconName: 'Sparkles',
    targetEnglishSkills: ['RAG Pipeline Defense', 'Hallucination Mitigation', 'Context Window Economics'],
    description: 'Articulate vector embeddings, semantic search, prompt chaining, agentic workflows, fine-tuning vs RAG, and evaluation metrics.',
    targetRoles: ['AI Engineer', 'Generative AI Developer', 'LLM Solutions Architect'],
    primaryFramework: 'Architecture -> Latency & Cost -> Accuracy Guardrails -> Evaluation',
  },
  {
    id: 'dsa',
    title: 'DSA & Algorithmic Problem Solving',
    roleTag: 'Live Coding / LeetCode Specialist',
    badgeColor: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
    iconName: 'Layers',
    targetEnglishSkills: ['Thinking Aloud', 'Constraint Clarification', 'Big-O Defense', 'Dry Run Narration'],
    description: 'Narrate step-by-step thinking during live coding interviews: clarify edge cases, state brute force, optimize with data structures, and dry-run code aloud.',
    targetRoles: ['All Technical Candidates', 'Competitive Programmers', 'FAANG / Tier-1 Candidates'],
    primaryFramework: 'Clarify -> Brute Force -> Optimization Pivot -> Clean Code -> Dry Run',
  },
  {
    id: 'projects',
    title: 'Full-Stack & End-to-End Projects',
    roleTag: 'Portfolio Project Showcase',
    badgeColor: 'border-teal-500/30 bg-teal-500/10 text-teal-400',
    iconName: 'BookOpen',
    targetEnglishSkills: ['8-Step Project Narrative', 'Architecture Justification', 'Past Tense Precision'],
    description: 'Deliver crisp 2-to-5 minute project walkthroughs using the 8-step framework (Problem -> Approach -> Tech -> Implementation -> Challenge -> Solution -> Result -> Future Scope).',
    targetRoles: ['All Job Seekers', 'Junior / Mid / Senior Engineers'],
    primaryFramework: 'Problem -> Approach -> Tech -> Implementation -> Challenge -> Solution -> Result -> Future',
  },
  {
    id: 'git_github',
    title: 'Git, GitHub & CI/CD Collaboration',
    roleTag: 'Version Control & DevOps',
    badgeColor: 'border-orange-500/30 bg-orange-500/10 text-orange-400',
    iconName: 'RotateCcw',
    targetEnglishSkills: ['Pull Request Descriptions', 'Merge Conflict Resolution', 'Release Notes Phrasing'],
    description: 'Write executive-level PR summaries, document breaking changes, explain Git merge vs rebase trade-offs, and describe deployment pipelines.',
    targetRoles: ['Software Engineers', 'DevOps / MLOps Engineers'],
    primaryFramework: 'What Changed -> Why Changed -> How Tested -> Rollback Plan',
  },
  {
    id: 'tech_interviews',
    title: 'Technical & System Design Interviews',
    roleTag: 'Technical Interviewee',
    badgeColor: 'border-violet-500/30 bg-violet-500/10 text-violet-400',
    iconName: 'Award',
    targetEnglishSkills: ['4-Step Technical Explanations', 'Trade-off Articulation', 'Scalability Defense'],
    description: 'Defend technical decisions under scrutiny: explain concepts using Definition -> Explanation -> Example -> Application and handle system design scaling.',
    targetRoles: ['Backend Engineers', 'Systems Architects', 'Staff+ Candidates'],
    primaryFramework: 'Definition -> Explanation -> Concrete Example -> Practical Application',
  },
  {
    id: 'hr_interviews',
    title: 'HR & Behavioral Interviews',
    roleTag: 'Behavioral / Culture Fit',
    badgeColor: 'border-pink-500/30 bg-pink-500/10 text-pink-400',
    iconName: 'MessageSquare',
    targetEnglishSkills: ['STAR Method Execution', 'Constructive Vulnerability', 'Value Framing'],
    description: 'Answer "Tell me about yourself", leadership, conflict resolution, failure, and career transition questions with structured confidence.',
    targetRoles: ['All Candidates', 'Campus Graduates', 'Career Changers'],
    primaryFramework: 'Situation -> Task -> Action -> Result (STAR)',
  },
  {
    id: 'presentations',
    title: 'Demos & Project Presentations',
    roleTag: 'Presenter & Technical Speaker',
    badgeColor: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
    iconName: 'Flame',
    targetEnglishSkills: ['Executive Slide Flow', 'Live Demo Pacing', 'Q&A De-escalation'],
    description: 'Deliver engaging sprint review demos, slide pitches, architecture presentations, and manage executive audience questions smoothly.',
    targetRoles: ['Tech Leads', 'Founders', 'Senior Engineers'],
    primaryFramework: 'Hook -> Problem -> Live Demo -> Quantitative Proof -> Q&A',
  },
  {
    id: 'standups',
    title: 'Agile Standups & Daily Syncs',
    roleTag: 'Agile Team Contributor',
    badgeColor: 'border-sky-500/30 bg-sky-500/10 text-sky-400',
    iconName: 'Clock',
    targetEnglishSkills: ['60-Second Concise Updates', 'Blocker Articulation', 'Past vs Present Tenses'],
    description: 'Give punchy 60-second standup updates: yesterday’s progress (past tense), today’s priority (future/present), and specific blockers without rambling.',
    targetRoles: ['All Team Members', 'Remote Developers'],
    primaryFramework: 'Accomplished Yesterday -> Committed Today -> Blocking Issues',
  },
  {
    id: 'team_comm',
    title: 'Cross-Functional Team Communication',
    roleTag: 'Collaborator & Lead',
    badgeColor: 'border-lime-500/30 bg-lime-500/10 text-lime-400',
    iconName: 'ShieldCheck',
    targetEnglishSkills: ['Constructive Pushback', 'Non-Technical Translation', 'Disagree & Commit'],
    description: 'Bridge engineering constraints with product timelines, explain technical debt to PMs, negotiate scope, and communicate across time zones.',
    targetRoles: ['Senior Engineers', 'Engineering Managers', 'Product Engineers'],
    primaryFramework: 'Acknowledge Intent -> State Technical Reality -> Offer 2 Viable Options',
  },
  {
    id: 'workplace_writing',
    title: 'Workplace Written Communication',
    roleTag: 'Technical Writer & Documenter',
    badgeColor: 'border-slate-500/30 bg-slate-500/10 text-slate-300',
    iconName: 'FileText',
    targetEnglishSkills: ['RFC Design Docs', 'Blameless Post-Mortems', 'Executive Slack Messages'],
    description: 'Write crisp asynchronous documentation, RFC proposals, incident root-cause postmortems, and high-stakes executive email updates.',
    targetRoles: ['Remote Engineers', 'Tech Leads', 'Staff Engineers'],
    primaryFramework: 'TL;DR Executive Summary -> Technical Details -> Action Items & Deadlines',
  },
];

export const CAREER_SCENARIOS_BANK: CareerScenario[] = [
  // =========================================================================
  // 1. SOFTWARE ENGINEERING SCENARIOS
  // =========================================================================
  {
    id: 'sc_swe_01',
    trackId: 'software_eng',
    title: 'Defend Database Isolation Level & Latency Trade-off',
    scenarioContext: 'In an architecture review, the lead asks why you chose PostgreSQL Read Committed over Serializable for high-frequency order placement.',
    englishSkillFocus: 'Conditionals & Technical Precision',
    difficulty: 'Advanced',
    timeLimitSeconds: 120,
    prompt: 'Explain why you opted for Read Committed with optimistic row locking rather than full Serializable isolation in your transaction microservice.',
    stepByStepFramework: [
      { step: 1, name: 'State the Baseline Decision', goal: 'State your architecture choice clearly', starterPhrase: 'We explicitly opted for Read Committed isolation because...' },
      { step: 2, name: 'Highlight the Bottleneck of Alternative', goal: 'Explain why Serializable fails at scale', starterPhrase: 'While Serializable guarantees strict serial ordering, under 5,000 requests per second it would cause...' },
      { step: 3, name: 'Explain the Mitigation Strategy', goal: 'Detail optimistic locking and index strategy', starterPhrase: 'To eliminate dirty reads and race conditions, we paired this with optimistic concurrency control using...' },
      { step: 4, name: 'Cite the Benchmark Outcome', goal: 'Provide quantitative latency improvements', starterPhrase: 'This reduced transaction abort rates from 18% down to 0.2% while maintaining sub-15ms p99 latency.' },
    ],
    keyTerminology: ['Read Committed', 'Serializable isolation', 'Optimistic locking', 'Deadlock retry loop', 'p99 latency', 'Transaction throughput'],
    juniorExample: {
      script: 'I used Read Committed because Serializable is too slow and crashes when many users click buy.',
      critique: 'Vague terminology ("too slow", "crashes"). Lacks specific database concurrency concepts, metrics, and mitigation mechanisms.',
    },
    seniorExemplar: {
      script: 'We chose Read Committed isolation paired with version-based optimistic locking. While Serializable guarantees complete isolation, our load benchmarks demonstrated that under high concurrency, Serializable produced excessive transaction serialization failures (40001 errors) and retry storms. By leveraging Read Committed alongside atomic row version checks, we prevented write skew while maintaining a consistent sub-12ms response time under peak Black Friday traffic.',
      whyItWins: 'Uses precise database terminology (40001 serialization errors, write skew, retry storms, row version checks) and quantifies the latency benefit.',
    },
    targetTab: 'speaking',
  },
  {
    id: 'sc_swe_02',
    trackId: 'software_eng',
    title: 'Constructive Pull Request Code Review',
    scenarioContext: 'A peer submitted a PR that executes N+1 database queries inside an API endpoint handler.',
    englishSkillFocus: 'Diplomatic Tone & Actionable Remediation',
    difficulty: 'Intermediate',
    timeLimitSeconds: 90,
    prompt: 'Deliver a constructive, respectful code review comment flagging the N+1 query issue and suggesting eager loading.',
    stepByStepFramework: [
      { step: 1, name: 'Acknowledge Intent First', goal: 'Praise the feature delivery', starterPhrase: 'Great progress on getting this endpoint implemented!' },
      { step: 2, name: 'Identify Technical Consequence', goal: 'Explain the N+1 query bottleneck without blame', starterPhrase: 'One performance consideration: inside the loop on line 42, we are executing a separate SQL query for each customer record...' },
      { step: 3, name: 'Provide Concrete Code Pattern', goal: 'Suggest eager loading / JOIN', starterPhrase: 'What do you think about using eager loading with `joinedload()` or batching into a single `WHERE id IN (...)` query?' },
      { step: 4, name: 'State the Impact', goal: 'Show how this protects the database', starterPhrase: 'This will reduce database round trips from N+1 down to a single query and prevent connection pool starvation.' },
    ],
    keyTerminology: ['N+1 query problem', 'Eager loading', 'Batch query', 'Connection pool starvation', 'Database round trip'],
    juniorExample: {
      script: 'Your code is bad, you wrote N+1 queries in the loop. Fix it with a join.',
      critique: 'Abrasive, confrontational ("Your code is bad"), lacks collaborative guidance.',
    },
    seniorExemplar: {
      script: 'Great work on standing up the order summary route! One performance observation on line 42: iterating through orders and querying line items inside the loop triggers an N+1 query pattern. Under 200 items, this generates over 200 individual database roundtrips. Could we update the query to use `selectinload` or a single `JOIN`? That will collapse the database overhead into a single roundtrip and keep p95 latency under 20ms.',
      whyItWins: 'Compliments intent first, explains the technical bottleneck quantitatively, and provides a drop-in architectural alternative.',
    },
    targetTab: 'technical',
  },

  // =========================================================================
  // 2. PYTHON DEVELOPMENT SCENARIOS
  // =========================================================================
  {
    id: 'sc_py_01',
    trackId: 'python_dev',
    title: 'Explain the Global Interpreter Lock (GIL) & Concurrency Choice',
    scenarioContext: 'In a Python backend interview, the interviewer asks: "Why didn’t you use standard Python threading for your CPU-intensive image transformation pipeline?"',
    englishSkillFocus: 'Past Tense & Technical Explanation',
    difficulty: 'Intermediate',
    timeLimitSeconds: 120,
    prompt: 'Explain the GIL mechanism and why multiprocessing or Celery was chosen over threading for CPU-bound tasks.',
    stepByStepFramework: [
      { step: 1, name: 'Define the GIL Constraint', goal: 'Explain CPython mutex mechanism', starterPhrase: 'In CPython, the Global Interpreter Lock is a mutex that prevents multiple native threads from executing Python bytecodes simultaneously...' },
      { step: 2, name: 'Distinguish I/O vs CPU Bound', goal: 'Contrast network vs computation', starterPhrase: 'While threading works wonderfully for I/O-bound operations like network calls, for CPU-heavy tasks like image resizing...' },
      { step: 3, name: 'Explain the Architectural Solution', goal: 'Describe multiprocessing / worker process pool', starterPhrase: 'To achieve true parallelism across multi-core CPUs, we architected the pipeline using Python’s `multiprocessing` module with worker pools...' },
      { step: 4, name: 'State Quantitative Speedup', goal: 'Cite throughput improvements', starterPhrase: 'This yielded an immediate 3.8x throughput increase across our 4-core worker nodes.' },
    ],
    keyTerminology: ['Global Interpreter Lock (GIL)', 'CPython bytecode mutex', 'CPU-bound vs I/O-bound', 'Multiprocessing pool', 'True parallel execution', 'Process isolation'],
    juniorExample: {
      script: 'Python threads cannot do multiple things at the same time because of GIL, so I used multiprocessing.',
      critique: 'Too brief and lacks the technical distinction between I/O-bound GIL release and CPU-bound bytecode contention.',
    },
    seniorExemplar: {
      script: 'In CPython, the GIL is a mutex that ensures only one native thread executes bytecode at any given moment to protect memory management. For I/O-bound workloads, threads release the GIL during syscalls. However, because image transformations are strictly CPU-bound, multi-threading would introduce thread-switching overhead without any CPU parallelism. Therefore, we used `concurrent.futures.ProcessPoolExecutor` to spawn separate processes with dedicated Python interpreters and address spaces, achieving full 8-core CPU saturation and a 6.5x processing speedup.',
      whyItWins: 'Precisely distinguishes memory safety, I/O syscall release, bytecode execution, and memory address isolation.',
    },
    targetTab: 'speaking',
  },

  // =========================================================================
  // 3. DATA ANALYSIS SCENARIOS
  // =========================================================================
  {
    id: 'sc_da_01',
    trackId: 'data_analysis',
    title: 'Present a 60-Second Executive Summary on User Churn',
    scenarioContext: 'You are presenting monthly cohort retention metrics to the VP of Product and Head of Growth.',
    englishSkillFocus: 'Executive Polish & High-Impact Brevity',
    difficulty: 'Intermediate',
    timeLimitSeconds: 60,
    prompt: 'Deliver a crisp 60-second executive summary explaining why Q3 churn spiked by 4.2% and recommending two actionable fixes.',
    stepByStepFramework: [
      { step: 1, name: 'Bottom Line Up Front (BLUF)', goal: 'State primary metric immediately', starterPhrase: 'Our Q3 user retention analysis revealed a 4.2% increase in monthly churn, primarily concentrated in Day 14 onboarding.' },
      { step: 2, name: 'Root Cause Identification', goal: 'Cite data findings', starterPhrase: 'Digging into cohort behavioral data, users who did not complete the initial workspace integration were 3.4x more likely to abandon the platform.' },
      { step: 3, name: 'Propose High-ROI Fixes', goal: 'Recommend 2 solutions', starterPhrase: 'To reverse this trend, we recommend implementing an automated interactive setup wizard and triggering a targeted re-engagement email on Day 7.' },
      { step: 4, name: 'Expected Business Impact', goal: 'State projected recovery', starterPhrase: 'Our simulation projects this will recover $85,000 in Annual Recurring Revenue by Q4.' },
    ],
    keyTerminology: ['Cohort retention', 'Day 14 drop-off', 'User churn rate', 'Annual Recurring Revenue (ARR)', 'BLUF (Bottom Line Up Front)', 'Statistical significance'],
    juniorExample: {
      script: 'Here are the charts. As you can see, churn went up. People are leaving because onboarding is hard. We should fix onboarding.',
      critique: 'Passive, unquantified, lacks executive posture, and does not provide revenue impact.',
    },
    seniorExemplar: {
      script: 'To summarize our Q3 findings: user churn rose by 4.2% month-over-month, representing approximately $85,000 in annualized risk. Our cohort segmentation isolated 78% of this drop-off to users who stalled during the third step of workspace onboarding. By deploying a guided interactive setup checklist and a Day-5 trigger sequence, our projection models indicate we can recover 60% of this leakage within 45 days. I recommend prioritizing this 2-sprint initiative immediately.',
      whyItWins: 'Delivers the BLUF in the first sentence, isolates the specific cohort segment, and translates metrics into dollarized business impact.',
    },
    targetTab: 'interview',
  },

  // =========================================================================
  // 4. DATA SCIENCE SCENARIOS
  // =========================================================================
  {
    id: 'sc_ds_01',
    trackId: 'data_science',
    title: 'Explain Statistical Significance & A/B Test Results to Stakeholders',
    scenarioContext: 'A product manager wants to roll out a new checkout flow after seeing a 1.2% lift over 3 days of testing.',
    englishSkillFocus: 'Assertive Scientific Communication & Pushback',
    difficulty: 'Advanced',
    timeLimitSeconds: 90,
    prompt: 'Explain why the 3-day A/B test is underpowered and why rolling out now risks a false positive (Type I error).',
    stepByStepFramework: [
      { step: 1, name: 'Acknowledge the Positive Signal', goal: 'Validate the PM’s enthusiasm', starterPhrase: 'It is very encouraging to see an initial 1.2% conversion lift on the new checkout flow.' },
      { step: 2, name: 'Explain Sample Size & Power', goal: 'Explain why 3 days is insufficient', starterPhrase: 'However, looking at our pre-experiment power calculations, 3 days of traffic gives us only 35% statistical power with a p-value of 0.18...' },
      { step: 3, name: 'Highlight Business Risk of Type I Error', goal: 'Explain false positive risk', starterPhrase: 'Shipping prematurely introduces a high probability of a false positive, meaning the observed lift is likely random weekend variance rather than genuine user preference.' },
      { step: 4, name: 'Commit to Clear Timetable', goal: 'Provide exact end date', starterPhrase: 'To achieve 95% confidence (p < 0.05) and account for day-of-week seasonality, we need to let the test run for a full 14-day cycle ending next Tuesday.' },
    ],
    keyTerminology: ['Statistical power', 'p-value threshold (0.05)', 'Type I error / False positive', 'Day-of-week seasonality', 'Sample size adequacy', 'Minimum Detectable Effect (MDE)'],
    juniorExample: {
      script: 'We cannot launch this yet. The p-value is 0.18 so it is not statistically significant. You have to wait.',
      critique: 'Jargon-heavy without explaining the practical business danger of making a wrong decision.',
    },
    seniorExemplar: {
      script: 'While the initial 1.2% lift is promising, our current sample size after 3 days achieves only 35% statistical power, yielding a p-value of 0.18. At this stage, there is nearly a 1-in-5 probability that this lift is random noise caused by weekend shopping variance. If we roll it out today, we risk permanently degrading conversion. To guarantee 95% statistical confidence and normalize for full weekly seasonality, we need 11 more days of data. I will share the final verified readout next Tuesday morning.',
      whyItWins: 'Translates abstract statistics (p=0.18) into tangible business risk ("1-in-5 chance of shipping random noise") and gives an exact decision timeline.',
    },
    targetTab: 'speaking',
  },

  // =========================================================================
  // 5. MACHINE LEARNING SCENARIOS
  // =========================================================================
  {
    id: 'sc_ml_01',
    trackId: 'machine_learning',
    title: 'Defend Precision vs Recall Trade-off in Fraud Detection',
    scenarioContext: 'In an ML systems interview, the lead asks: "Why did you optimize your credit card fraud classifier for Recall (PR-AUC) rather than raw Accuracy or Precision?"',
    englishSkillFocus: 'Cost-Benefit Justification & Metric Nuance',
    difficulty: 'Intermediate',
    timeLimitSeconds: 120,
    prompt: 'Explain the asymmetric business cost of False Negatives vs False Positives in financial fraud detection.',
    stepByStepFramework: [
      { step: 1, name: 'Expose the Accuracy Paradox', goal: 'Explain class imbalance', starterPhrase: 'In fraud detection with 99.8% legitimate transactions, raw accuracy is a deceptive metric because a dummy model predicting all legitimate achieves 99.8% accuracy...' },
      { step: 2, name: 'Analyze Asymmetric Financial Cost', goal: 'Compare FN vs FP cost', starterPhrase: 'We evaluated the cost matrix: a False Negative means allowing a $2,000 fraudulent transaction through, whereas a False Positive merely triggers an SMS verification...' },
      { step: 3, name: 'State Threshold Tuning Strategy', goal: 'Explain PR-AUC & decision threshold', starterPhrase: 'Consequently, we optimized for PR-AUC and lowered the decision threshold to capture 94% of fraudulent patterns...' },
      { step: 4, name: 'Summarize the Operational Balance', goal: 'Explain user experience guardrail', starterPhrase: 'We then capped false-positive friction at under 1.5% through secondary automated risk scoring.' },
    ],
    keyTerminology: ['Class imbalance', 'False Negatives vs False Positives', 'Precision-Recall AUC', 'Decision threshold calibration', 'Asymmetric cost matrix'],
    juniorExample: {
      script: 'Fraud is very rare, so accuracy is useless. We wanted high recall so we don’t miss any bad guys.',
      critique: 'Lacks technical metric depth, cost matrix analysis, and threshold calibration explanation.',
    },
    seniorExemplar: {
      script: 'In our dataset, fraud represented only 0.2% of total transactions. An uncalibrated accuracy metric would render the model blind to the minority class. More critically, the business cost matrix is heavily asymmetric: a False Negative results in direct capital loss and chargeback fees averaging $800, whereas a False Positive costs less than $0.10 via an automated two-factor SMS challenge. Therefore, we optimized for PR-AUC and calibrated our classification threshold to achieve 95% Recall, while establishing a secondary verification tier to protect the checkout experience for legitimate cardholders.',
      whyItWins: 'Directly articulates the business cost matrix ($800 vs $0.10), minority class imbalance, and PR-AUC threshold tuning.',
    },
    targetTab: 'interview',
  },

  // =========================================================================
  // 6. AI & GENERATIVE AI SCENARIOS
  // =========================================================================
  {
    id: 'sc_genai_01',
    trackId: 'gen_ai',
    title: 'Explain RAG vs Fine-Tuning to Leadership',
    scenarioContext: 'The CTO asks: "Should we spend 3 months fine-tuning an open-weights model on our internal knowledge base, or build a Retrieval-Augmented Generation (RAG) pipeline?"',
    englishSkillFocus: 'Architectural Comparison & Cost Nuance',
    difficulty: 'Advanced',
    timeLimitSeconds: 120,
    prompt: 'Deliver a structured comparison of RAG vs Fine-Tuning, recommending RAG for dynamic company documentation.',
    stepByStepFramework: [
      { step: 1, name: 'Define the Core Architectural Difference', goal: 'Explain parametric vs non-parametric memory', starterPhrase: 'Fine-tuning modifies the model’s internal weights (parametric memory) to learn style and domain format, whereas RAG injects verified source documents directly into the prompt context (external non-parametric retrieval).' },
      { step: 2, name: 'Highlight RAG’s Advantages for Dynamic Data', goal: 'Cite real-time updates and citations', starterPhrase: 'Because our engineering documentation updates daily, RAG allows real-time vector indexing with zero model retraining costs and provides exact line-level source citations.' },
      { step: 3, name: 'Address Fine-Tuning Hallucination Risk', goal: 'Explain hallucinations in fine-tuning', starterPhrase: 'Fine-tuning alone does not eliminate hallucination and cannot restrict access based on user authorization roles.' },
      { step: 4, name: 'Recommend the Phased Hybrid Strategy', goal: 'Propose immediate RAG + optional style tuning', starterPhrase: 'I recommend deploying a modular RAG pipeline first to achieve immediate 90%+ factual accuracy within 2 weeks, and only considering LoRA fine-tuning later if we require custom syntax generation.' },
    ],
    keyTerminology: ['Parametric vs Non-parametric memory', 'Retrieval-Augmented Generation (RAG)', 'Vector embeddings & chunking', 'Hallucination mitigation', 'Source attribution & citations', 'Role-Based Access Control (RBAC)'],
    juniorExample: {
      script: 'Fine-tuning is too expensive and takes too long. RAG is better because it uses vectors and we can update documents easily.',
      critique: 'Superficial explanation without contrasting parametric vs non-parametric memory, access control, or hallucination risks.',
    },
    seniorExemplar: {
      script: 'For our internal documentation use case, RAG is decisively the superior architecture. Fine-tuning bakes knowledge into model weights, which makes daily updates prohibitively expensive and frequently hallucinates obsolete information without citations. In contrast, RAG decouples knowledge storage into a Vector Database. When an employee asks a question, we retrieve the top-k relevant chunks with metadata filtering, pass them into the context window, and generate an answer with exact clickable source citations and Role-Based Access Control. We can stand up a production RAG system in 2 weeks at a fraction of the GPU training cost.',
      whyItWins: 'Provides deep architectural contrast (parametric vs vector retrieval, metadata filtering, RBAC, citations, cost economics).',
    },
    targetTab: 'speaking',
  },

  // =========================================================================
  // 7. DSA & ALGORITHMIC INTERVIEW SCENARIOS
  // =========================================================================
  {
    id: 'sc_dsa_01',
    trackId: 'dsa',
    title: 'Thinking Aloud: Two Pointers vs Hash Map in LeetCode Interview',
    scenarioContext: 'In a Google/Meta coding interview, you are presented with: "Given a sorted array, find two numbers that sum up to a target value in O(1) extra space."',
    englishSkillFocus: 'Live Thinking Aloud & Complexity Defense',
    difficulty: 'Intermediate',
    timeLimitSeconds: 120,
    prompt: 'Walk through your problem-solving narrative aloud: clarify constraints, state the Hash Map trade-off, and justify the Two-Pointer O(1) space optimization.',
    stepByStepFramework: [
      { step: 1, name: 'Clarify Constraints & Edge Cases', goal: 'Ask about input size, negatives, duplicates', starterPhrase: 'Before writing code, let me clarify the constraints: Is the array strictly sorted in ascending order, and can there be negative integers?' },
      { step: 2, name: 'State the Baseline / Hash Map Solution', goal: 'Mention O(N) time and O(N) space', starterPhrase: 'If the array were unsorted, a Hash Map would give us O(N) time at the cost of O(N) auxiliary space.' },
      { step: 3, name: 'Pivot to the Optimal Two-Pointer Strategy', goal: 'Leverage sorted property for O(1) space', starterPhrase: 'However, because the input is already sorted, we can eliminate the space overhead completely using a Two-Pointer technique starting at index 0 and index N-1...' },
      { step: 4, name: 'Trace Pointer Adjustments Aloud', goal: 'Explain sum < target vs sum > target', starterPhrase: 'If the current sum is less than the target, we increment the left pointer to increase the sum. If the sum exceeds the target, we decrement the right pointer. This guarantees O(N) linear time and O(1) constant auxiliary memory.' },
    ],
    keyTerminology: ['Two-pointer technique', 'Monotonic properties', 'Auxiliary space complexity O(1)', 'Linear time complexity O(N)', 'Pointer convergence', 'Edge case boundary check'],
    juniorExample: {
      script: 'I will use two pointers left and right and move them until I find the sum.',
      critique: 'Fails to think aloud, skips constraint validation, does not explain WHY the sorted invariant makes Two-Pointers optimal.',
    },
    seniorExemplar: {
      script: 'Before implementing, let me confirm the constraints: the input is already sorted in non-decreasing order, and we want O(1) extra space. While a Hash Map provides O(N) time, it requires O(N) space. Leveraging the sorted invariant, we can initialize a left pointer at index 0 and a right pointer at index N-1. In each step, if `arr[left] + arr[right] == target`, we return the indices. If the sum is smaller, we know any pair with the right element is too small, so we increment `left`. If larger, we decrement `right`. The pointers converge in at most N iterations, achieving O(N) time and strict O(1) auxiliary space. Let me dry-run this against `[-3, 1, 4, 7]` with target 5.',
      whyItWins: 'Demonstrates elite structured thinking: validates constraints, compares complexity trade-offs, explains the mathematical invariant, and announces an explicit dry run.',
    },
    targetTab: 'interview',
  },

  // =========================================================================
  // 8. FULL-STACK PROJECT SCENARIOS
  // =========================================================================
  {
    id: 'sc_proj_01',
    trackId: 'projects',
    title: '8-Step End-to-End Project Walkthrough (AI-Powered Code Reviewer)',
    scenarioContext: 'An interviewer asks: "Tell me about the most impactful technical project you have built recently."',
    englishSkillFocus: 'Past Tense Precision & 8-Step Delivery',
    difficulty: 'Advanced',
    timeLimitSeconds: 180,
    prompt: 'Deliver a complete 8-step walkthrough of your full-stack AI-powered developer tool project.',
    stepByStepFramework: [
      { step: 1, name: 'Problem', goal: 'State user friction', starterPhrase: 'Engineering teams spent 15+ hours weekly on repetitive manual code reviews, leading to slow PR turnaround...' },
      { step: 2, name: 'Approach', goal: 'Describe architectural strategy', starterPhrase: 'I designed an automated GitHub webhook integration that analyzes incoming diffs asynchronously...' },
      { step: 3, name: 'Technology', goal: 'List modern tech stack', starterPhrase: 'I built the service using FastAPI, Python 3.11, Redis BullMQ for task queueing, PostgreSQL, and Claude 3.5 Sonnet via Anthropic API...' },
      { step: 4, name: 'Implementation', goal: 'Detail data pipeline', starterPhrase: 'When a PR opened, the webhook dispatched the git diff into Redis. Worker threads batched files and executed prompt templates checking for OWASP Top 10 vulnerabilities...' },
      { step: 5, name: 'Challenge', goal: 'Describe unexpected engineering roadblock', starterPhrase: 'The core bottleneck was LLM rate limits and large multi-file token overflows on 2,000-line diffs...' },
      { step: 6, name: 'Solution', goal: 'Detail technical remediation', starterPhrase: 'I implemented an AST parser using Tree-sitter to chunk code into isolated function scopes, filtering out non-logic files and caching repeated linting patterns...' },
      { step: 7, name: 'Result', goal: 'Quantify metrics', starterPhrase: 'This cut average PR review cycles by 42% across 25 beta repositories, saving ~6 engineering hours per team weekly.' },
      { step: 8, name: 'Future Scope', goal: 'Highlight roadmap', starterPhrase: 'For future iterations, I plan to fine-tune a specialized 7B model locally to reduce API costs by 70%.' },
    ],
    keyTerminology: ['AST parsing (Tree-sitter)', 'Asynchronous task queue (Redis BullMQ)', 'Webhook event pipeline', 'Token context management', 'OWASP Top 10 automated linting', 'Quantitative PR cycle reduction'],
    juniorExample: {
      script: 'I built an AI code reviewer using Python and React. It takes code and calls ChatGPT to check errors. It was fun and works well.',
      critique: 'No structure, no mention of scalability challenges, asynchronous worker queues, AST parsing, or quantitative business results.',
    },
    seniorExemplar: {
      script: 'I built AutoReview, an asynchronous GitHub action and microservice that automates security and performance linting on Pull Requests. Engineering teams at my previous company were losing over 15 hours per sprint in manual code review bottlenecks. I architected the backend in FastAPI and Redis queue workers, integrating Claude API with AST parsing via Tree-sitter. The biggest challenge was token context overflow on massive 2,000-line diffs. I engineered a semantic chunker that parsed code into discrete syntax blocks, analyzing only modified AST nodes in parallel. This reduced API cost by 65% and cut average PR turnaround time from 24 hours to under 4 hours across 25 active repositories.',
      whyItWins: 'Follows the complete 8-step framework, explains the real architectural bottleneck (AST semantic chunking), and proves real quantitative business value.',
    },
    targetTab: 'interview',
  },

  // =========================================================================
  // 9. GIT & GITHUB COLLABORATION SCENARIOS
  // =========================================================================
  {
    id: 'sc_git_01',
    trackId: 'git_github',
    title: 'Explain Git Rebase vs Merge Trade-offs to a Junior Developer',
    scenarioContext: 'A teammate asks: "Why should I use `git rebase` on my feature branch before submitting a PR instead of running `git merge main`?"',
    englishSkillFocus: 'Clarity & Mentorship Phrasing',
    difficulty: 'Intermediate',
    timeLimitSeconds: 90,
    prompt: 'Explain the difference between a fast-forward rebase and a merge commit, emphasizing clean linear commit history.',
    stepByStepFramework: [
      { step: 1, name: 'Define Both Mechanisms', goal: 'Explain linear vs non-linear DAG', starterPhrase: '`git merge` creates a new merge commit connecting two branch histories, whereas `git rebase` replays your feature commits on top of the latest `main` commit...' },
      { step: 2, name: 'Highlight the Rebase Benefit', goal: 'Clean linear history and git bisect', starterPhrase: 'Rebasing maintains a clean, linear git history without cluttering the log with multiple "Merge branch" commits, making `git bisect` and debugging far simpler...' },
      { step: 3, name: 'State the Golden Rule of Rebasing', goal: 'Never rebase shared public branches', starterPhrase: 'The golden rule is: never rebase public shared branches like `main`, because rewriting public commit history breaks teammate repositories.' },
      { step: 4, name: 'Provide the Standard Workflow Command', goal: 'Give exact steps', starterPhrase: 'For feature branches, running `git fetch origin && git rebase origin/main` ensures your branch is up to date and ready for review.' },
    ],
    keyTerminology: ['Linear commit history', 'Fast-forward merge', 'Git bisect debugging', 'Replaying commits', 'Shared public branch protection'],
    juniorExample: {
      script: 'Rebase is cleaner. Merge makes ugly commits. Just do rebase.',
      critique: 'Inaccurate and misses the critical safety rule about never rebasing public branches.',
    },
    seniorExemplar: {
      script: '`git merge` creates a non-destructive 3-way merge commit that preserves exact branch timing, but can create a messy "railroad track" history when multiple developers are merging simultaneously. In contrast, `git rebase origin/main` takes your localized feature commits and replays them one by one on top of the newest `main` commit. This produces a perfectly linear commit log, which makes automated release changelogs and `git bisect` root-cause debugging seamless. Just remember the golden safety rule: rebase your own local feature branches, but never rewrite history on shared public branches.',
      whyItWins: 'Explains the technical mechanics (3-way merge vs commit replay), highlights debugging benefits (git bisect), and reinforces the essential safety rule.',
    },
    targetTab: 'technical',
  },

  // =========================================================================
  // 10. AGILE STANDUP & SPRINT SCENARIOS
  // =========================================================================
  {
    id: 'sc_standup_01',
    trackId: 'standups',
    title: 'Deliver a Punchy 60-Second Standup with Blockers',
    scenarioContext: 'It is 9:30 AM daily standup. You are working on user authentication and hit a blocker with the OAuth callback on staging.',
    englishSkillFocus: 'Past/Present Tenses & Actionable Brevity',
    difficulty: 'Beginner',
    timeLimitSeconds: 60,
    prompt: 'Deliver a crisp 3-part standup update: yesterday’s progress (past), today’s plan (present/future), and your OAuth callback blocker.',
    stepByStepFramework: [
      { step: 1, name: 'Yesterday (Past Tense)', goal: 'State completed tasks', starterPhrase: 'Yesterday, I finished the JWT token refresh middleware and wrote unit tests in PyTest with 95% branch coverage.' },
      { step: 2, name: 'Today (Present / Future Tense)', goal: 'State today’s commitment', starterPhrase: 'Today, my focus is integrating the Google OAuth callback handler and wiring the redirect flow on frontend.' },
      { step: 3, name: 'Blocker (Clear & Actionable)', goal: 'State exact blocker and who can help', starterPhrase: 'I have one blocker: staging CORS policies are rejecting the redirect URI. I need 10 minutes with Alex from DevOps after standup to update the DNS whitelist.' },
    ],
    keyTerminology: ['JWT refresh middleware', 'Branch coverage', 'OAuth redirect flow', 'CORS policy whitelist', 'Asynchronous follow-up'],
    juniorExample: {
      script: 'Yesterday I worked on authentication. Today I will keep working on it. I have some bugs with Google login so I am stuck.',
      critique: 'Vague ("worked on it"), lacks specific technical accomplishment, and leaves the blocker open-ended without assigning a remediation partner.',
    },
    seniorExemplar: {
      script: 'Yesterday, I completed the JWT session revocation middleware and merged PR #142 with full PyTest coverage. Today, I am hooking up the Google OAuth2 redirect flow. I have one active blocker: the staging API gateway is blocking our redirect URI due to CORS configuration. Alex, do you have 5 minutes after standup to verify the CloudFront CORS headers? No other blockers on my side.',
      whyItWins: 'Crisp past tense usage, specific PR reference, and a directly addressed, low-friction blocker request.',
    },
    targetTab: 'speaking',
  },
];

export function getScenariosByTrack(trackId: CareerTrackId): CareerScenario[] {
  return CAREER_SCENARIOS_BANK.filter((sc) => sc.trackId === trackId);
}

export function getScenarioById(id: string): CareerScenario | undefined {
  return CAREER_SCENARIOS_BANK.find((sc) => sc.id === id);
}

export function getAllCareerTracks(): CareerTrackConfig[] {
  return CAREER_TRACKS_CONFIG;
}
