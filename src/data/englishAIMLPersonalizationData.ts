import { LucideIcon } from 'lucide-react';

export type CommunicationProgressionStageId =
  | 'stage_1_simple_english'
  | 'stage_2_fluent_everyday'
  | 'stage_3_technical_english'
  | 'stage_4_professional_workplace'
  | 'stage_5_interview_english'
  | 'stage_6_job_ready_executive';

export interface ProgressionStageInfo {
  id: CommunicationProgressionStageId;
  stageNumber: number;
  title: string;
  shortSubtitle: string;
  tagline: string;
  focusGoal: string;
  badgeColor: string;
  iconName: string;
  targetMilestone: string;
  coreSkills: string[];
  sampleDrillTitle: string;
}

export interface PersonalizedSpeakingDrill {
  id: string;
  stageId: CommunicationProgressionStageId;
  stageNumber: number;
  category:
    | 'speaking_confidence'
    | 'technical_comm'
    | 'project_explanation'
    | 'dsa_explanation'
    | 'aiml_explanation'
    | 'interview_comm'
    | 'hr_comm'
    | 'presentation'
    | 'workplace_comm';
  categoryLabel: string;
  title: string;
  targetDurationSeconds: number;
  preparationSeconds: number;
  context: string;
  whyThisMatters: string;
  responseFramework: Array<{
    stepNumber: number;
    stepTitle: string;
    description: string;
    starterPhrase: string;
  }>;
  keyTerminology: string[];
  powerPhrases: string[];
  modelSpokenAnswer: string;
  commonPitfallsToAvoid: string[];
  rehearsalChecklist: string[];
}

export const PERSONALIZED_USER_PROFILE = {
  name: 'Swamy',
  email: 'swamy@levelupdev.com',
  currentYear: '3rd Year B.Tech in Artificial Intelligence & Machine Learning (AIML)',
  targetGoals: [
    'AI / Machine Learning Engineering Internships',
    'Generative AI & LLM Systems Developer Roles',
    'Backend Python & Distributed Systems Engineer Positions',
    'On-Campus & Off-Campus Technical / HR Placements',
  ],
  strengths: [
    'Strong theoretical AI/ML foundations (Transformers, RAG, Neural Networks)',
    'Solid Python and modern web stack fundamentals (FastAPI, Next.js, PyTorch)',
    'Determined problem-solver building real-world platforms like LevelUpDev',
  ],
  communicationPriorities: [
    'Spontaneous English speaking fluency without hesitation',
    'Live thinking-aloud during algorithmic / DSA coding rounds',
    'Structured 8-step capstone project architecture walkthroughs',
    'Crisp defense of AIML model choices, metrics & trade-offs',
    'Executive STAR storytelling in HR & behavioral interviews',
    'Concise 60-second daily standup & agile engineering updates',
  ],
};

export const PROGRESSION_STAGES_CONFIG: ProgressionStageInfo[] = [
  {
    id: 'stage_1_simple_english',
    stageNumber: 1,
    title: 'Simple English & Fluency Kickstart',
    shortSubtitle: 'Overcoming Hesitation & Direct Expression',
    tagline: 'Stop translating from native language — express direct, clear sentences with zero self-doubt.',
    focusGoal: 'Eliminate hesitation, form grammatically clear sentences, and speak daily thoughts directly in English.',
    badgeColor: 'emerald',
    iconName: 'MessageSquare',
    targetMilestone: 'Speak for 60 seconds continuously without switching languages or prolonged freezes.',
    coreSkills: [
      'Direct English thought formation',
      'Basic subject-verb-object clarity',
      'Describing daily tech routines',
      'Speaking out loud in solitude',
    ],
    sampleDrillTitle: 'Daily Engineering Routine & Workspace Narration',
  },
  {
    id: 'stage_2_fluent_everyday',
    stageNumber: 2,
    title: 'Fluent Everyday English & Flow',
    shortSubtitle: 'Smooth Transitions & Zero Fillers',
    tagline: 'Replace "umm/uh/like" with confident pauses and seamless connectors.',
    focusGoal: 'Build continuous rhythm, vocal projection, and natural sentence bridging across 2 uninterrupted minutes.',
    badgeColor: 'amber',
    iconName: 'Zap',
    targetMilestone: 'Deliver 120-second impromptu talks on tech topics with fewer than 2 filler words.',
    coreSkills: [
      'Filler word elimination (umm, uh, actually, basically)',
      'Logical connectors (Furthermore, On the other hand, Consequently)',
      'Active voice and strong pitch cadence',
      'Vocal energy and sentence pacing',
    ],
    sampleDrillTitle: 'Spontaneous 2-Minute Tech Debate: AI vs Software Engineers',
  },
  {
    id: 'stage_3_technical_english',
    stageNumber: 3,
    title: 'Technical English & Systems Precision',
    shortSubtitle: 'Engineering Vocabulary & Architecture',
    tagline: 'Speak with precise engineering terminology instead of vague descriptions.',
    focusGoal: 'Master exact computer science, Python, and system architecture vocabulary with structured definitions.',
    badgeColor: 'cyan',
    iconName: 'Cpu',
    targetMilestone: 'Explain complex engineering mechanisms (caching, concurrency, indexing) using the 4-part definition formula.',
    coreSkills: [
      'High-precision technical verbs (orchestrate, benchmark, mitigate, decouple)',
      '4-part technical concept breakdown',
      'Memory, latency, and throughput explanations',
      'Explaining Python internals (GIL, generators, decorators)',
    ],
    sampleDrillTitle: 'Explaining Python Concurrency: Threading vs Multiprocessing vs AsyncIO',
  },
  {
    id: 'stage_4_professional_workplace',
    stageNumber: 4,
    title: 'Professional Workplace Communication',
    shortSubtitle: 'Standups, PRs & Cross-Functional Alignment',
    tagline: 'Communicate like a senior team player — crisp updates, respectful pushback, and blameless analysis.',
    focusGoal: 'Master agile standups, asynchronous pull request discussions, and diplomatic stakeholder debates.',
    badgeColor: 'teal',
    iconName: 'Briefcase',
    targetMilestone: 'Deliver a high-impact 60-second standup and write structured architectural decision proposals.',
    coreSkills: [
      '60-second standup framework (Yesterday / Today / Blockers)',
      'Diplomatic disagreement formula (Validate -> Pivot -> Propose)',
      'Blameless outage post-mortems',
      'Async RFC & PR communication',
    ],
    sampleDrillTitle: 'Agile 60-Second Daily Standup with Blocker Escalation',
  },
  {
    id: 'stage_5_interview_english',
    stageNumber: 5,
    title: 'High-Stakes Interview Communication',
    shortSubtitle: 'STAR Behavioral & Live DSA Thinking Aloud',
    tagline: 'Nail top tech interviews with structured behavioral storytelling and real-time algorithmic narration.',
    focusGoal: 'Master the 60-second executive pitch, STAR behavioral frameworks, and live think-aloud DSA problem solving.',
    badgeColor: 'purple',
    iconName: 'Award',
    targetMilestone: 'Ace a full 30-minute mock interview covering self-intro, DSA logic aloud, and HR behavioral questions.',
    coreSkills: [
      '60-second executive elevator pitch (No "Myself Swamy")',
      'STAR behavioral mastery (Situation -> Task -> Action -> Result)',
      'Live DSA think-aloud framework (Clarify -> Brute Force -> Optimize -> Complexity)',
      'HR culture fit & salary alignment',
    ],
    sampleDrillTitle: 'Live DSA Thinking Aloud: Two Pointers vs Hash Map Optimization',
  },
  {
    id: 'stage_6_job_ready_executive',
    stageNumber: 6,
    title: 'Job-Ready Executive & AIML Defense',
    shortSubtitle: 'Capstone Storytelling & AI Architecture Defense',
    tagline: 'Present capstone AI projects with undeniable technical conviction and leadership presence.',
    focusGoal: 'Defend end-to-end AIML pipelines, explain complex deep learning trade-offs, and demo products to executives.',
    badgeColor: 'rose',
    iconName: 'Sparkles',
    targetMilestone: 'Deliver an end-to-end 8-step capstone project defense that wows senior engineering managers.',
    coreSkills: [
      '8-step capstone project architecture walkthrough',
      'Defending RAG vs Fine-Tuning trade-offs to senior architects',
      'Explaining neural network loss functions, embeddings & latency',
      'Executive slide demos & stakeholder Q&A defense',
    ],
    sampleDrillTitle: '8-Step Capstone Defense: AI-Powered Career Platform Architecture',
  },
];

export const PERSONALIZED_SPEAKING_DRILLS: PersonalizedSpeakingDrill[] = [
  // =========================================================================
  // STAGE 1: SIMPLE ENGLISH & FLUENCY KICKSTART
  // =========================================================================
  {
    id: 'pdrill-s1-daily-routine',
    stageId: 'stage_1_simple_english',
    stageNumber: 1,
    category: 'speaking_confidence',
    categoryLabel: 'Confidence & Daily Fluency',
    title: 'Describe Your Daily AIML Study & Coding Routine',
    targetDurationSeconds: 60,
    preparationSeconds: 10,
    context:
      'As a 3rd-year AIML student, you spend your days coding, attending classes, and building projects. Practice describing your routine directly in English without hesitating or translating from Telugu.',
    whyThisMatters:
      'Fluency begins by narrating what you know best. If you can speak smoothly about your daily schedule, you build automatic English reflex pathways in your brain.',
    responseFramework: [
      {
        stepNumber: 1,
        stepTitle: 'Morning Kickoff',
        description: 'State what time you start and your first engineering task.',
        starterPhrase: 'Every morning, I usually begin my day by...',
      },
      {
        stepNumber: 2,
        stepTitle: 'Core Learning Block',
        description: 'Describe your AIML coursework or coding practice.',
        starterPhrase: 'During the afternoon, my main focus is on...',
      },
      {
        stepNumber: 3,
        stepTitle: 'Evening Project Work',
        description: 'Mention what project or LeetCode problem you tackle.',
        starterPhrase: 'In the evening, I spend two hours developing...',
      },
      {
        stepNumber: 4,
        stepTitle: 'Daily Reflection',
        description: 'Summarize how you track your consistency.',
        starterPhrase: 'To maintain consistency, I always ensure that I...',
      },
    ],
    keyTerminology: ['routine', 'consistency', 'problem solving', 'deep focus', 'milestone'],
    powerPhrases: [
      'Every morning, I usually begin my day by reviewing algorithmic problems...',
      'During the afternoon, my main focus is on my AIML coursework...',
      'In the evening, I dedicate dedicated time to hands-on project development...',
      'This routine helps me build momentum and maintain continuous improvement.',
    ],
    modelSpokenAnswer:
      'Every morning, I begin my day around seven AM by spending forty-five minutes solving one algorithmic problem on LeetCode to sharpen my problem-solving skills. During the afternoon, I attend my third-year AIML lectures and laboratory sessions, focusing on deep learning and database management. In the evening, I dedicate two to three hours to hands-on development on my full-stack web application, LevelUpDev. Before going to bed, I review my progress in a digital log. This structured daily routine ensures continuous technical growth and prepares me for upcoming internship opportunities.',
    commonPitfallsToAvoid: [
      'Do not say "I am doing study" (say "I study" or "I focus on coursework").',
      'Avoid long pauses between sentences; connect them with "During...", "After that...", "In the evening...".',
      'Do not switch to Telugu midway when searching for a word; simplify the English sentence instead.',
    ],
    rehearsalChecklist: [
      'Did you speak for the full 60 seconds without freezing?',
      'Did you cover morning, afternoon, and evening smoothly?',
      'Did you use clear past/present tenses?',
    ],
  },
  {
    id: 'pdrill-s1-laptop-setup',
    stageId: 'stage_1_simple_english',
    stageNumber: 1,
    category: 'speaking_confidence',
    categoryLabel: 'Confidence & Daily Fluency',
    title: 'Explain Your Development Environment & Tools',
    targetDurationSeconds: 60,
    preparationSeconds: 10,
    context:
      'Describe the operating system, code editor, terminal, and AI tools you use daily on your laptop.',
    whyThisMatters:
      'Familiarity with everyday technical tools gives you instant vocabulary that bridges into interview conversations.',
    responseFramework: [
      {
        stepNumber: 1,
        stepTitle: 'Primary Hardware & OS',
        description: 'State your machine, operating system, and primary environment.',
        starterPhrase: 'For my daily development, I work on a...',
      },
      {
        stepNumber: 2,
        stepTitle: 'Editor & Extensions',
        description: 'Mention VS Code, extensions, and themes you rely on.',
        starterPhrase: 'My primary code editor is Visual Studio Code, configured with...',
      },
      {
        stepNumber: 3,
        stepTitle: 'Terminal & Version Control',
        description: 'Explain your command line setup and Git workflow.',
        starterPhrase: 'In the terminal, I frequently run Git commands to...',
      },
      {
        stepNumber: 4,
        stepTitle: 'AI Productivity Tools',
        description: 'Mention how you use AI assistants responsibly for productivity.',
        starterPhrase: 'Additionally, I leverage AI tools to assist with debugging and documentation.',
      },
    ],
    keyTerminology: ['development environment', 'VS Code', 'terminal', 'version control', 'Git repository'],
    powerPhrases: [
      'For my daily engineering work, I rely on a streamlined setup...',
      'I configure Visual Studio Code with ESLint, Prettier, and Python linting...',
      'My terminal workflow is centered around Git for version tracking...',
    ],
    modelSpokenAnswer:
      'For my daily engineering work, I utilize a Windows laptop optimized for full-stack and machine learning development. My primary code editor is Visual Studio Code, which I have customized with Python, TypeScript, and Tailwind extensions for rapid prototyping. In the terminal, I actively use PowerShell and Git to manage my repositories, commit changes systematically, and branch features cleanly. Additionally, I use Google Chrome DevTools for client-side debugging. This clean development environment allows me to focus deeply on writing maintainable code.',
    commonPitfallsToAvoid: [
      'Avoid vague words like "some software" — name specific tools like "Visual Studio Code" and "Git".',
    ],
    rehearsalChecklist: [
      'Did you speak clearly with correct pronunciation of technical tools?',
      'Did you avoid hesitation when transitioning between tools?',
    ],
  },

  // =========================================================================
  // STAGE 2: FLUENT EVERYDAY ENGLISH & FLOW
  // =========================================================================
  {
    id: 'pdrill-s2-why-aiml',
    stageId: 'stage_2_fluent_everyday',
    stageNumber: 2,
    category: 'speaking_confidence',
    categoryLabel: 'Fluency & Spontaneity',
    title: 'Why Did You Choose AI & Machine Learning as Your Major?',
    targetDurationSeconds: 90,
    preparationSeconds: 15,
    context:
      'A recruiter or senior engineer asks why you specifically chose Artificial Intelligence and Machine Learning for your engineering degree.',
    whyThisMatters:
      'This question appears in nearly every HR screening and technical icebreaker. Having a passionate, structured answer immediately sets a positive tone.',
    responseFramework: [
      {
        stepNumber: 1,
        stepTitle: 'The Spark / Initial Fascination',
        description: 'Explain what initially ignited your curiosity in AI and data.',
        starterPhrase: 'I chose AI and Machine Learning because I have always been fascinated by...',
      },
      {
        stepNumber: 2,
        stepTitle: 'Hands-On Discovery',
        description: 'Describe when you wrote your first Python script or trained your first model.',
        starterPhrase: 'When I built my first machine learning model, I realized that...',
      },
      {
        stepNumber: 3,
        stepTitle: 'Real-World Impact',
        description: 'Connect AI capabilities to solving practical, impactful problems.',
        starterPhrase: 'What excites me most today is the potential of Generative AI to...',
      },
      {
        stepNumber: 4,
        stepTitle: 'Future Ambition',
        description: 'State your goal as a graduating engineer.',
        starterPhrase: 'My objective is to become a high-impact AI engineer who bridges theoretical models with production systems.',
      },
    ],
    keyTerminology: ['artificial intelligence', 'machine learning', 'predictive modeling', 'generative AI', 'production systems'],
    powerPhrases: [
      'I chose AI and Machine Learning because of its transformative power...',
      'Rather than writing deterministic rules for every edge case, ML enables systems to learn from data...',
      'What excites me most is bridging theoretical algorithms with production-ready user interfaces...',
    ],
    modelSpokenAnswer:
      'I chose Artificial Intelligence and Machine Learning because of its transformative ability to solve complex, non-linear problems. Early in my academic journey, I realized that traditional software engineering relies on hardcoded rules, which cannot easily handle unstructured data like natural language or images. When I trained my first neural network and watched it generalize patterns from raw data, I was hooked. What excites me most today is the emergence of Generative AI and Large Language Models. My goal is not just to study theoretical equations, but to engineer robust, scalable systems that solve real human challenges.',
    commonPitfallsToAvoid: [
      'Do not say "My parents told me AI has good scope" — speak about your own genuine curiosity and technical drive.',
      'Do not ramble without structure; stick to Spark -> Hands-on Discovery -> Impact -> Ambition.',
    ],
    rehearsalChecklist: [
      'Did you show genuine vocal enthusiasm and energy?',
      'Did you avoid filler words like "like", "you know", "basically"?',
    ],
  },
  {
    id: 'pdrill-s2-ai-vs-engineers',
    stageId: 'stage_2_fluent_everyday',
    stageNumber: 2,
    category: 'speaking_confidence',
    categoryLabel: 'Fluency & Debate',
    title: 'Will AI Replace Junior Software Engineers? (Spontaneous Debate)',
    targetDurationSeconds: 90,
    preparationSeconds: 15,
    context:
      'Express a nuanced, mature engineering opinion on whether AI coding assistants will eliminate junior developer jobs or elevate their potential.',
    whyThisMatters:
      'Tests your spontaneous reasoning, ability to balance trade-offs, and professional perspective on industry trends.',
    responseFramework: [
      {
        stepNumber: 1,
        stepTitle: 'Clear Thesis Claim',
        description: 'State your stance firmly without hedging.',
        starterPhrase: 'In my perspective, AI will not replace junior software engineers; rather, it will redefine what junior engineering entails.',
      },
      {
        stepNumber: 2,
        stepTitle: 'Argument 1: Boilerplate vs Architecture',
        description: 'Explain that syntax is easy, but systems thinking is where value lies.',
        starterPhrase: 'While LLMs excel at generating boilerplate syntax, engineering is fundamentally about understanding constraints...',
      },
      {
        stepNumber: 3,
        stepTitle: 'Argument 2: The AI-Augmented Developer',
        description: 'Explain how developers who leverage AI ship 5x faster.',
        starterPhrase: 'Furthermore, junior developers who master AI tools can prototype, test, and iterate with unprecedented speed...',
      },
      {
        stepNumber: 4,
        stepTitle: 'Conclusion & Advice',
        description: 'Summarize the core differentiator: deep foundational knowledge.',
        starterPhrase: 'Ultimately, engineers who master core CS fundamentals and leverage AI effectively will be in higher demand than ever.',
      },
    ],
    keyTerminology: ['boilerplate code', 'architectural constraints', 'AI-augmented engineer', 'developer velocity', 'domain modeling'],
    powerPhrases: [
      'In my perspective, AI is an amplifier, not a replacement...',
      'Writing syntax represents only a fraction of the software engineering lifecycle...',
      'The true value lies in problem decomposition, edge case validation, and system integration...',
    ],
    modelSpokenAnswer:
      'In my perspective, AI will not replace junior software engineers; rather, it will fundamentally redefine the role. While tools like GitHub Copilot can instantly generate boilerplate syntax, coding is only twenty percent of software engineering. The remaining eighty percent requires problem decomposition, domain modeling, verifying edge cases, and ensuring security guardrails. An AI can draft a function, but a human engineer must determine whether that function meets latency requirements and handles production failures gracefully. Consequently, junior developers who combine strong computer science fundamentals with AI tooling will achieve unprecedented velocity.',
    commonPitfallsToAvoid: [
      'Do not express extreme black-or-white views ("Yes, everyone will lose jobs" or "No, AI is useless").',
      'Use professional vocabulary like "amplify developer velocity" rather than "makes work fast".',
    ],
    rehearsalChecklist: [
      'Did you state your thesis in the first 5 seconds?',
      'Did you provide 2 distinct supporting points?',
      'Did you conclude with a memorable takeaway?',
    ],
  },

  // =========================================================================
  // STAGE 3: TECHNICAL ENGLISH & SYSTEMS PRECISION
  // =========================================================================
  {
    id: 'pdrill-s3-python-concurrency',
    stageId: 'stage_3_technical_english',
    stageNumber: 3,
    category: 'technical_comm',
    categoryLabel: 'Python & Systems',
    title: 'Explain Python Concurrency: GIL, Threading, Multiprocessing & AsyncIO',
    targetDurationSeconds: 120,
    preparationSeconds: 20,
    context:
      'A technical interviewer asks: "Can you explain how Python handles concurrency, what the Global Interpreter Lock (GIL) is, and when you would use Multiprocessing versus AsyncIO?"',
    whyThisMatters:
      'A signature question for Python and AI backend roles that separates surface-level script writers from true engineers.',
    responseFramework: [
      {
        stepNumber: 1,
        stepTitle: 'The Core Bottleneck: GIL Defined',
        description: 'Define the Global Interpreter Lock in 1 sentence.',
        starterPhrase: 'In CPython, the Global Interpreter Lock (GIL) is a mutex that allows only one native thread to execute Python bytecode at a time...',
      },
      {
        stepNumber: 2,
        stepTitle: 'I/O-Bound vs CPU-Bound Distinction',
        description: 'Categorize workloads into network/disk waits vs heavy mathematical computing.',
        starterPhrase: 'To select the right concurrency model, we must distinguish between I/O-bound and CPU-bound workloads...',
      },
      {
        stepNumber: 3,
        stepTitle: 'AsyncIO & Threading for I/O',
        description: 'Explain non-blocking event loops and threads for APIs/scraping.',
        starterPhrase: 'For I/O-bound tasks like API calls and database queries, AsyncIO utilizes a single-threaded cooperative event loop...',
      },
      {
        stepNumber: 4,
        stepTitle: 'Multiprocessing for CPU/AIML',
        description: 'Explain spawning separate OS processes with dedicated memory for model inference.',
        starterPhrase: 'Conversely, for CPU-bound tasks like image processing or model training, the multiprocessing module bypasses the GIL by spawning distinct OS processes...',
      },
    ],
    keyTerminology: ['Global Interpreter Lock (GIL)', 'CPython mutex', 'I/O-bound', 'CPU-bound', 'event loop', 'multiprocessing', 'process memory space'],
    powerPhrases: [
      'The Global Interpreter Lock prevents multi-core parallel execution of bytecode within a single process...',
      'For I/O-heavy workloads, AsyncIO delivers massive concurrency with minimal memory footprint...',
      'For compute-intensive operations, Multiprocessing bypasses the GIL by allocating separate memory spaces across CPU cores.',
    ],
    modelSpokenAnswer:
      'In CPython, the Global Interpreter Lock, or GIL, is a synchronization mutex that prevents multiple native threads from executing Python bytecode simultaneously. This means standard multi-threading cannot achieve true CPU parallelism on multi-core processors. To address concurrency, we choose between two distinct paradigms based on workload characteristics. For I/O-bound tasks—such as fetching web APIs or querying databases—the thread releases the GIL while waiting for network responses. Here, AsyncIO is the optimal choice because its single-threaded event loop can handle thousands of concurrent connections with negligible memory overhead. Conversely, for CPU-bound tasks—such as tensor matrix multiplication or image augmentations—we use the multiprocessing module. Multiprocessing spawns independent OS processes, each with its own memory space and Python interpreter, fully leveraging all CPU cores. In summary, I use AsyncIO for high-throughput web servers and Multiprocessing for heavy machine learning computations.',
    commonPitfallsToAvoid: [
      'Do not confuse concurrency (dealing with lots of things at once) with parallelism (doing lots of things simultaneously).',
      'Always clearly explain WHY the GIL exists (memory management and reference counting in CPython).',
    ],
    rehearsalChecklist: [
      'Did you define the GIL accurately?',
      'Did you contrast AsyncIO (I/O-bound) vs Multiprocessing (CPU-bound)?',
      'Did you use precise terms like "event loop", "bytecode", "OS process"?',
    ],
  },
  {
    id: 'pdrill-s3-dsa-complexity',
    stageId: 'stage_3_technical_english',
    stageNumber: 3,
    category: 'dsa_explanation',
    categoryLabel: 'DSA & Complexity',
    title: 'Explain Time & Space Complexity Trade-Offs (O(N) vs O(1))',
    targetDurationSeconds: 90,
    preparationSeconds: 15,
    context:
      'During a coding interview, explain why trading space (using a Hash Map) to reduce time complexity from $O(N^2)$ to $O(N)$ is an optimal engineering decision.',
    whyThisMatters:
      'Interviewers evaluate how fluently you justify architectural trade-offs during live algorithm discussions.',
    responseFramework: [
      {
        stepNumber: 1,
        stepTitle: 'The Naive Approach & Its Bottleneck',
        description: 'Mention the nested loop brute force solution with $O(N^2)$ time.',
        starterPhrase: 'The naive brute-force approach requires nested loops, comparing every pair in O(N squared) time complexity...',
      },
      {
        stepNumber: 2,
        stepTitle: 'The Optimization Strategy',
        description: 'Introduce auxiliary memory (Hash Map / Set) for $O(1)$ lookups.',
        starterPhrase: 'To optimize this, we can trade auxiliary space for dramatic time savings by utilizing a hash map...',
      },
      {
        stepNumber: 3,
        stepTitle: 'The Complexity Analysis',
        description: 'State exact time and space complexity with clear justification.',
        starterPhrase: 'This reduces our overall time complexity to linear O(N) because hash map lookups take amortized O(1) time...',
      },
      {
        stepNumber: 4,
        stepTitle: 'Production Justification',
        description: 'Why this trade-off is almost always preferred in modern production systems.',
        starterPhrase: 'In production, memory is relatively inexpensive compared to CPU latency, making this linear time solution vastly superior.',
      },
    ],
    keyTerminology: ['time complexity', 'space complexity', 'Big-O notation', 'nested iteration', 'hash map lookup', 'amortized constant time', 'auxiliary memory'],
    powerPhrases: [
      'The naive brute force approach results in an exponential or quadratic bottleneck...',
      'By introducing an auxiliary hash map, we achieve amortized O(1) lookups in a single pass...',
      'This brings the overall time complexity down to linear O(N) at the cost of O(N) additional space.',
    ],
    modelSpokenAnswer:
      'When solving this problem, the initial brute-force approach would use nested iterations, checking every element against every other element. While this requires zero additional space, it incurs an unacceptable O(N squared) time complexity, which degrades rapidly as dataset size grows. To optimize this, we can make an intentional space-time trade-off by introducing a hash map. In a single linear pass through the array, we check if the complement exists in our map in amortized O(1) constant time before inserting the current value. As a result, we reduce time complexity from quadratic to linear O(N), with an auxiliary space complexity of O(N). In modern production environments where memory is abundant and user responsiveness is paramount, trading linear space for sub-second execution is the gold standard approach.',
    commonPitfallsToAvoid: [
      'Do not say "Big-O of N square" (say "O of N squared" or "quadratic time").',
      'Remember to mention "amortized O(1)" for hash map lookups to account for collision handling.',
    ],
    rehearsalChecklist: [
      'Did you state both Time and Space complexities clearly?',
      'Did you explain the trade-off rationale from an engineering perspective?',
    ],
  },

  // =========================================================================
  // STAGE 4: PROFESSIONAL WORKPLACE COMMUNICATION
  // =========================================================================
  {
    id: 'pdrill-s4-daily-standup',
    stageId: 'stage_4_professional_workplace',
    stageNumber: 4,
    category: 'workplace_comm',
    categoryLabel: 'Workplace & Standup',
    title: 'Deliver a 60-Second Daily Standup with Blocker Escalation',
    targetDurationSeconds: 60,
    preparationSeconds: 10,
    context:
      'You are in a morning agile engineering standup. Give your update covering what you finished yesterday, your task today, and an unblocking request to a teammate.',
    whyThisMatters:
      'Engineering teams judge professionalism by standup conciseness. A clear standup under 60 seconds signals confidence and respect for team time.',
    responseFramework: [
      {
        stepNumber: 1,
        stepTitle: 'Yesterday (Accomplishment & PR)',
        description: 'State the feature completed and pull request submitted.',
        starterPhrase: 'Good morning team. Yesterday, I completed the...',
      },
      {
        stepNumber: 2,
        stepTitle: 'Today (Primary Objective)',
        description: 'State the exact ticket or module you are tackling next.',
        starterPhrase: 'Today, my primary focus is implementing the...',
      },
      {
        stepNumber: 3,
        stepTitle: 'Blocker / Collaboration Ask',
        description: 'Concise, actionable ask directed at a specific person or channel.',
        starterPhrase: 'In terms of blockers, I need a quick five-minute sync with...',
      },
      {
        stepNumber: 4,
        stepTitle: 'Crisp Hand-off',
        description: 'End clearly and pass the microphone.',
        starterPhrase: 'That covers my updates. Passing it over to...',
      },
    ],
    keyTerminology: ['standup update', 'pull request (PR)', 'unit tests', 'integration blocker', 'code review', 'hand-off'],
    powerPhrases: [
      'Good morning team. Yesterday, I finalized the API rate-limiting middleware and opened PR #42...',
      'Today, I will focus on writing end-to-end integration tests for the authentication workflow...',
      'I have one minor blocker: I need a quick five-minute sync with Rahul on the token schema...',
      'That covers my updates. Passing it over to Sarah.',
    ],
    modelSpokenAnswer:
      'Good morning team. Yesterday, I finalized the audio recording pipeline and submitted pull request number forty-five for review, which includes unit test coverage for browser media stream permissions. Today, my primary focus is integrating the Firestore synchronization handler to ensure offline practice sessions persist reliably upon reconnection. In terms of blockers, I need a quick five-minute sync with Rahul after standup to confirm the authentication token refresh schema. That covers my updates. Passing it over to Priya.',
    commonPitfallsToAvoid: [
      'Never give a play-by-play narrative of your entire day ("First I woke up, then I opened my laptop, then I tried this...").',
      'Do not start solving the blocker inside the standup meeting; simply state the blocker and schedule a post-standup sync.',
    ],
    rehearsalChecklist: [
      'Did you finish in under 60 seconds?',
      'Did you follow Yesterday -> Today -> Blocker -> Hand-off structure?',
      'Was your voice crisp, audible, and professional?',
    ],
  },
  {
    id: 'pdrill-s4-diplomatic-pushback',
    stageId: 'stage_4_professional_workplace',
    stageNumber: 4,
    category: 'workplace_comm',
    categoryLabel: 'Workplace Diplomacy',
    title: 'Pushing Back Diplomatically on Last-Minute Scope Creep',
    targetDurationSeconds: 90,
    preparationSeconds: 15,
    context:
      'A Product Manager asks to add 3 new complex features two days before a sprint release. Push back professionally while offering a realistic phased alternative.',
    whyThisMatters:
      'Senior engineers protect code quality and team velocity through diplomatic negotiation, not emotional resistance.',
    responseFramework: [
      {
        stepNumber: 1,
        stepTitle: 'Validate the Product Goal',
        description: 'Acknowledge why the requested feature is valuable for users.',
        starterPhrase: 'I completely understand why adding real-time analytics would enhance the user experience for this launch...',
      },
      {
        stepNumber: 2,
        stepTitle: 'Highlight the Technical Constraint',
        description: 'Explain the risk to system stability and testing coverage.',
        starterPhrase: 'However, with our release scheduled in forty-eight hours, introducing these additional endpoints creates a significant risk of regression bugs...',
      },
      {
        stepNumber: 3,
        stepTitle: 'Propose a Phased Solution',
        description: 'Offer a clean compromise (Phase 1 launch core, Phase 2 fast follow).',
        starterPhrase: 'What I propose is shipping the current core features on schedule for Phase 1, while prioritizing the analytics module as the very first item in the next sprint...',
      },
      {
        stepNumber: 4,
        stepTitle: 'Collaborative Close',
        description: 'Ensure alignment on quality and timelines.',
        starterPhrase: 'This approach guarantees a zero-downtime launch while giving us adequate time to write robust test suites for the new features.',
      },
    ],
    keyTerminology: ['scope creep', 'regression risk', 'sprint deadline', 'phased rollout', 'test coverage', 'production stability'],
    powerPhrases: [
      'I completely understand the value of this feature for our users...',
      'However, introducing architectural changes two days before release creates substantial reliability risks...',
      'What I suggest is a phased rollout: deliver the stable baseline now, and follow up with the enhancement in Sprint 2.',
    ],
    modelSpokenAnswer:
      'I completely understand why having real-time analytics would be valuable for our launch next week. However, with our scheduled deployment only forty-eight hours away, adding these three database migrations and WebSocket listeners introduces a substantial risk of regressions in our core checkout flow. What I propose instead is a phased rollout: let us ship our current, thoroughly tested release on schedule for Phase 1. Simultaneously, I can branch the analytics feature and prioritize it as ticket number one in the upcoming sprint. This guarantees a stable, bug-free launch for our initial users while giving us the necessary buffer to benchmark query latency properly. How does that sound?',
    commonPitfallsToAvoid: [
      'Do not say "No, that is impossible" or "You always add features at the last minute".',
      'Frame the constraint around customer experience and system stability, not personal workload.',
    ],
    rehearsalChecklist: [
      'Did you use the Validate -> Constraint -> Phased Solution structure?',
      'Did you maintain a calm, collaborative vocal tone?',
    ],
  },

  // =========================================================================
  // STAGE 5: HIGH-STAKES INTERVIEW COMMUNICATION
  // =========================================================================
  {
    id: 'pdrill-s5-tell-me-about-yourself',
    stageId: 'stage_5_interview_english',
    stageNumber: 5,
    category: 'interview_comm',
    categoryLabel: 'Interview Opening',
    title: 'The 60-Second Executive Pitch ("Tell Me About Yourself")',
    targetDurationSeconds: 60,
    preparationSeconds: 15,
    context:
      'The interviewer opens: "Tell me about yourself, your background, and what you are looking for in an engineering internship."',
    whyThisMatters:
      'The first 60 seconds define the interviewer’s mental model of your capability. A sharp, confident pitch instantly separates you from hundreds of candidates.',
    responseFramework: [
      {
        stepNumber: 1,
        stepTitle: 'Professional Greeting & Identity',
        description: 'State your name and specialization (Never start with "Myself Swamy").',
        starterPhrase: 'Hello, my name is Swamy. I am a third-year computer science and AIML engineer specializing in full-stack architecture and machine learning systems...',
      },
      {
        stepNumber: 2,
        stepTitle: 'Core Technical Stack & Foundation',
        description: 'Mention your primary languages and algorithms solved.',
        starterPhrase: 'Over the past two years, I have built production-grade web applications using Next.js and Python, and solved over two hundred DSA challenges on LeetCode...',
      },
      {
        stepNumber: 3,
        stepTitle: 'Flagship Project & Measurable Outcome',
        description: 'Highlight LevelUpDev or your primary AI capstone.',
        starterPhrase: 'Recently, I architected LevelUpDev, an AI-powered career training platform featuring client-side audio processing and cloud synchronization...',
      },
      {
        stepNumber: 4,
        stepTitle: 'Company Alignment & Enthusiasm',
        description: 'Connect your skills directly to their engineering team.',
        starterPhrase: 'I am excited about this internship because your team is solving high-scale AI and software engineering challenges where I can contribute immediately.',
      },
    ],
    keyTerminology: ['third-year AIML engineer', 'full-stack architecture', 'Next.js & Python', 'LeetCode problem-solver', 'LevelUpDev platform', 'scalable software'],
    powerPhrases: [
      'Hello, my name is Swamy. I am a software engineer specializing in backend architecture and AI systems...',
      'My technical core centers on Python, Next.js, and distributed algorithmic problem solving...',
      'Recently, I architected LevelUpDev, a production-ready application serving real-time user workflows...',
      'I am eager to bring this passion for scalable code to your engineering team.',
    ],
    modelSpokenAnswer:
      'Hello, my name is Swamy. I am a third-year engineering student specializing in Artificial Intelligence and Machine Learning, with a strong focus on backend architecture, Python development, and scalable web platforms. Over the past two years, I have developed deep proficiency in Next.js, TypeScript, and FastAPI, while solving over two hundred algorithmic challenges on LeetCode. Recently, I architected LevelUpDev, a comprehensive career training platform featuring in-browser audio recording, dynamic assessment engines, and cloud persistence. I am passionate about building resilient systems and writing clean, maintainable code, and I am excited about the opportunity to contribute to your engineering team as an intern.',
    commonPitfallsToAvoid: [
      'CRITICAL: Never say "Myself Swamy" (Incorrect Indian English). Always say "Hello, my name is Swamy" or "I am Swamy".',
      'Do not recite your high school marks or chronological schooling — focus on technical skills, projects, and impact.',
      'Keep it strictly between 50 and 65 seconds.',
    ],
    rehearsalChecklist: [
      'Did you start with "Hello, my name is Swamy"?',
      'Did you highlight your technical stack and LevelUpDev project?',
      'Was your delivery crisp, confident, and free of fillers?',
    ],
  },
  {
    id: 'pdrill-s5-star-debugging-challenge',
    stageId: 'stage_5_interview_english',
    stageNumber: 5,
    category: 'interview_comm',
    categoryLabel: 'STAR Behavioral',
    title: 'STAR Story: Overcoming a Tough Production Bug or State Bug',
    targetDurationSeconds: 90,
    preparationSeconds: 20,
    context:
      'Behavioral question: "Tell me about a time you encountered a difficult technical bug or unexpected failure in your code. How did you diagnose and resolve it?"',
    whyThisMatters:
      'Interviewers test debugging intuition, systematic root-cause analysis, and emotional resilience under frustration.',
    responseFramework: [
      {
        stepNumber: 1,
        stepTitle: 'Situation (15s)',
        description: 'Set the context: developing the audio recording engine for LevelUpDev.',
        starterPhrase: 'While developing the client-side audio recording module for our web application...',
      },
      {
        stepNumber: 2,
        stepTitle: 'Task (15s)',
        description: 'Define the bug: memory leaks and intermittent stream freezing on mobile browsers.',
        starterPhrase: 'My objective was to ensure seamless voice recording across both desktop and mobile browsers without audio chunk corruption...',
      },
      {
        stepNumber: 3,
        stepTitle: 'Action (40s)',
        description: 'Explain your systematic diagnosis using DevTools profiler and refactoring cleanup hooks.',
        starterPhrase: 'To resolve this, I used browser performance profilers to inspect MediaStream garbage collection. I discovered that unclosed audio tracks were retaining memory in background tabs. I refactored the custom hook to cleanly release hardware tracks on unmount and implemented fallback MIME-type detection...',
      },
      {
        stepNumber: 4,
        stepTitle: 'Result (20s)',
        description: 'State the metric outcome: zero stream drops and 100% test pass rate.',
        starterPhrase: 'As a result, recording reliability reached one hundred percent across all major browsers, and audio latency dropped to under fifty milliseconds.',
      },
    ],
    keyTerminology: ['STAR method', 'MediaRecorder API', 'garbage collection', 'memory profiling', 'MIME type fallback', 'unmount cleanup', 'zero-downtime'],
    powerPhrases: [
      'While architecting the client-side audio engine...',
      'I conducted systematic root-cause analysis using browser profilers...',
      'I refactored the lifecycle cleanup and introduced defensive MIME-type fallback handlers...',
      'Consequently, we achieved 100% cross-browser reliability.',
    ],
    modelSpokenAnswer:
      'While building the in-browser speaking studio for LevelUpDev, I encountered an issue where audio recording would intermittently fail on Safari and mobile devices. My objective was to deliver a frictionless, zero-latency recording experience across all client environments. To diagnose the root cause, I attached browser memory profilers and inspected the MediaRecorder lifecycle. I discovered two underlying problems: Safari required specific audio container MIME types, and active microphone hardware streams were not being properly released on component unmount, causing memory leaks. To fix this, I engineered an adaptive MIME-type fallback matrix and implemented strict useEffect cleanup handlers that explicitly stop all audio tracks. As a result, cross-browser recording reliability reached one hundred percent, and client memory overhead was reduced by forty percent.',
    commonPitfallsToAvoid: [
      'Do not say "We googled the error and copied a StackOverflow snippet".',
      'Detail YOUR personal diagnostic method: profilers, network tabs, unit tests, and lifecycle hooks.',
    ],
    rehearsalChecklist: [
      'Did you spend the majority of time on the ACTION step?',
      'Did you quantify the RESULT (e.g. 100% reliability, 40% memory reduction)?',
    ],
  },
  {
    id: 'pdrill-s5-dsa-think-aloud',
    stageId: 'stage_5_interview_english',
    stageNumber: 5,
    category: 'dsa_explanation',
    categoryLabel: 'DSA Live Thinking',
    title: 'Live DSA Think-Aloud: Two Sum & Sliding Window Strategy',
    targetDurationSeconds: 90,
    preparationSeconds: 15,
    context:
      'Simulate an interview where you have just received a coding problem. Communicate your thoughts aloud before writing a single line of code.',
    whyThisMatters:
      'Silent coders fail interviews. Articulating your thought process allows the interviewer to guide you and score you high on communication.',
    responseFramework: [
      {
        stepNumber: 1,
        stepTitle: 'Clarify Constraints & Edge Cases',
        description: 'Ask questions about input sizes, negative numbers, empty arrays.',
        starterPhrase: 'Before jumping into the implementation, let me clarify a few key constraints. Can the input array contain negative values or duplicates, and what is the expected maximum array length?',
      },
      {
        stepNumber: 2,
        stepTitle: 'State the Naive Brute Force',
        description: 'Quickly explain the baseline solution ($O(N^2)$) to show you understand the problem.',
        starterPhrase: 'The straightforward brute-force approach would be to check every possible pair with nested loops, which gives us O(N squared) time complexity...',
      },
      {
        stepNumber: 3,
        stepTitle: 'Propose the Optimal Intuition',
        description: 'Explain the Hash Map or Two-Pointer strategy in plain English.',
        starterPhrase: 'To optimize this to linear time, we can maintain a hash map where keys represent the complement target minus current number...',
      },
      {
        stepNumber: 4,
        stepTitle: 'Confirm Complexity & Ask to Code',
        description: 'State $O(N)$ time, $O(N)$ space and request permission to write code.',
        starterPhrase: 'This gives us an optimal O(N) time and O(N) space complexity. If this approach looks sound to you, I will begin writing the clean implementation.',
      },
    ],
    keyTerminology: ['constraint clarification', 'edge cases', 'brute force baseline', 'linear time O(N)', 'hash map lookup', 'two pointers', 'sliding window'],
    powerPhrases: [
      'Before writing code, let me clarify the constraints and edge cases...',
      'The naive baseline gives us quadratic time, which we can optimize using auxiliary memory...',
      'By storing visited elements in a hash map, we achieve single-pass O(N) execution...',
      'Does this high-level logic align with your expectations before I begin typing?',
    ],
    modelSpokenAnswer:
      'Before writing any code, let me clarify a few important constraints. First, can the array contain negative numbers or duplicate values? And second, is it guaranteed that exactly one valid solution exists? Assuming standard constraints, the naive brute-force approach would iterate with two nested loops, checking every pair in O(N squared) time. However, we can optimize this to linear time by making a space-time trade-off. As we iterate through the array in a single pass, we can calculate the complement—which is the target minus the current element—and check if it already exists in our hash map in O(1) time. If it exists, we return the stored index pair; otherwise, we store the current value and index. This achieves O(N) time and O(N) auxiliary space complexity. If this strategy looks good to you, I will proceed to write the implementation.',
    commonPitfallsToAvoid: [
      'Never start coding in dead silence.',
      'Always ask for confirmation from the interviewer before writing code ("Does this approach make sense?").',
    ],
    rehearsalChecklist: [
      'Did you clarify constraints first?',
      'Did you mention both the brute force and optimal solutions?',
      'Did you state time and space complexity clearly?',
    ],
  },

  // =========================================================================
  // STAGE 6: JOB-READY EXECUTIVE & AIML DEFENSE
  // =========================================================================
  {
    id: 'pdrill-s6-rag-vs-finetuning',
    stageId: 'stage_6_job_ready_executive',
    stageNumber: 6,
    category: 'aiml_explanation',
    categoryLabel: 'AIML Architecture Defense',
    title: 'Defend RAG vs. Fine-Tuning for Enterprise Document Intelligence',
    targetDurationSeconds: 120,
    preparationSeconds: 20,
    context:
      'A Senior AI Architect asks: "For our internal company wiki with thousands of confidential, rapidly changing documents, would you recommend Fine-Tuning an LLM or building a Retrieval-Augmented Generation (RAG) pipeline? Justify your architectural trade-offs."',
    whyThisMatters:
      'Demonstrates real-world AI engineering mastery where business constraints, data privacy, hallucination mitigation, and GPU cost matrices dictate technical choices.',
    responseFramework: [
      {
        stepNumber: 1,
        stepTitle: 'Clear Architectural Recommendation',
        description: 'State RAG as the definitive recommendation immediately.',
        starterPhrase: 'For this specific use case, I strongly recommend a Retrieval-Augmented Generation (RAG) architecture over Fine-Tuning...',
      },
      {
        stepNumber: 2,
        stepTitle: 'Reason 1: Dynamic Knowledge & Zero Retraining',
        description: 'Explain vector database ingestion vs costly model retraining.',
        starterPhrase: 'The primary factor is that enterprise documentation changes continuously. In a RAG pipeline, updating data requires only re-indexing vectors in a vector database, whereas Fine-Tuning would necessitate expensive, recurring GPU retraining runs...',
      },
      {
        stepNumber: 3,
        stepTitle: 'Reason 2: Hallucination Mitigation & Source Attribution',
        description: 'Explain citation links and auditability.',
        starterPhrase: 'Secondly, RAG drastically reduces hallucinations by forcing the model to cite exact document chunks, providing enterprise auditability...',
      },
      {
        stepNumber: 4,
        stepTitle: 'When Fine-Tuning IS Appropriate',
        description: 'Demonstrate nuanced depth by stating when fine-tuning is used (style/domain vocab).',
        starterPhrase: 'Fine-tuning is superior for teaching a model specific output styles or proprietary syntax, but for dynamic factual retrieval, RAG delivers superior cost efficiency, security, and accuracy.',
      },
    ],
    keyTerminology: ['Retrieval-Augmented Generation (RAG)', 'vector database', 'embeddings', 'chunking strategy', 'hallucination mitigation', 'GPU retraining cost', 'source attribution'],
    powerPhrases: [
      'For dynamic enterprise documentation, I unequivocally recommend a RAG pipeline over Fine-Tuning...',
      'RAG decouples knowledge storage from model weights, allowing real-time index updates without GPU retraining overhead...',
      'Furthermore, RAG provides deterministic source attribution, which is essential for enterprise compliance...',
      'Fine-tuning adapts model behavior and style, whereas RAG injects factual context at inference time.',
    ],
    modelSpokenAnswer:
      'For an enterprise knowledge base with rapidly evolving documentation, I strongly recommend a Retrieval-Augmented Generation, or RAG, architecture over fine-tuning. There are three critical architectural reasons for this decision. First, data freshness and cost: in a RAG pipeline, when a policy document updates, we simply chunk the text, generate embeddings, and upsert vectors into a vector database like Pinecone or Qdrant in seconds. In contrast, fine-tuning requires continuous, expensive GPU retraining cycles to bake new facts into parametric weights. Second, hallucination mitigation and auditability: RAG grounds the LLM response in retrieved context chunks, allowing the system to display exact clickable source citations, which is critical for enterprise trust. Third, access control: RAG allows us to apply metadata role-based access filters during vector similarity search, preventing unauthorized staff from retrieving confidential executive docs. While fine-tuning is powerful for teaching specialized syntax or tone, RAG is vastly superior for dynamic factual retrieval.',
    commonPitfallsToAvoid: [
      'Do not say "Fine-tuning gives more knowledge to the LLM" — explain that fine-tuning teaches form/style, while RAG provides factual retrieval.',
      'Mention Role-Based Access Control (RBAC) and vector similarity search to show real production awareness.',
    ],
    rehearsalChecklist: [
      'Did you recommend RAG in the first 10 seconds?',
      'Did you explain cost, data freshness, and citation trade-offs?',
      'Did you explain when fine-tuning would be appropriate?',
    ],
  },
  {
    id: 'pdrill-s6-capstone-8step-walkthrough',
    stageId: 'stage_6_job_ready_executive',
    stageNumber: 6,
    category: 'project_explanation',
    categoryLabel: 'Capstone Storytelling',
    title: 'The 8-Step Capstone Project Walkthrough: LevelUpDev AI Platform',
    targetDurationSeconds: 150,
    preparationSeconds: 30,
    context:
      'A Hiring Manager says: "Take two to three minutes and walk me through your most impactful project from architecture to real-world outcomes."',
    whyThisMatters:
      'This is your flagship showcase. Delivering an articulate, structured 8-step capstone walkthrough establishes you as an elite, job-ready candidate.',
    responseFramework: [
      {
        stepNumber: 1,
        stepTitle: '1. Problem & Friction',
        description: 'Engineering students struggle with spontaneous English and unstructured interview explanations.',
        starterPhrase: 'The core problem I set out to solve with LevelUpDev is that engineering graduates often face significant barriers in spontaneous technical communication and structured interview readiness...',
      },
      {
        stepNumber: 2,
        stepTitle: '2. Solution Architecture',
        description: 'Built a full-stack job-readiness platform with 15 career tracks and audio studio.',
        starterPhrase: 'To address this, I architected LevelUpDev, a comprehensive web platform featuring deterministic daily roadmaps, interactive diagnostic engines, and browser-based audio rehearsal studios...',
      },
      {
        stepNumber: 3,
        stepTitle: '3. Technology Stack Choice',
        description: 'Next.js, TypeScript, Tailwind CSS, Firebase Firestore & LocalStorage dual-layer cache.',
        starterPhrase: 'I built the platform using Next.js with React 19 and TypeScript for type safety, coupled with a dual-layer persistence strategy combining Cloud Firestore and LocalStorage...',
      },
      {
        stepNumber: 4,
        stepTitle: '4. Key Module Implementation',
        description: 'Client-side MediaRecorder pipeline and multi-step assessment engines.',
        starterPhrase: 'My primary technical contribution was engineering an in-browser audio recording pipeline that captures speech without backend streaming bottlenecks...',
      },
      {
        stepNumber: 5,
        stepTitle: '5. Toughest Technical Challenge',
        description: 'Handling audio lifecycle states, zero-latency caching, and offline state reconciliation.',
        starterPhrase: 'The toughest technical hurdle was ensuring seamless offline data synchronization when network connectivity drops during active mock sessions...',
      },
      {
        stepNumber: 6,
        stepTitle: '6. Engineering Solution',
        description: 'Engineered an optimistic local cache that syncs to Firestore with conflict resolution.',
        starterPhrase: 'I resolved this by implementing an optimistic local storage queue that records timestamps and performs batched synchronization once the network reconnects...',
      },
      {
        stepNumber: 7,
        stepTitle: '7. Measurable Impact & Results',
        description: 'Sub-second page loads, 100% test passing rate across 42 static and dynamic routes.',
        starterPhrase: 'As a result of these architectural decisions, the platform delivers sub-second page transitions across forty-two optimized routes with zero data loss...',
      },
      {
        stepNumber: 8,
        stepTitle: '8. Future Roadmap / AI Integration',
        description: 'Integrating automated real-time acoustic speech feedback and LLM semantic grading.',
        starterPhrase: 'Looking ahead, my next milestone is integrating local WebAssembly Whisper models for real-time acoustic phoneme analysis and speech scoring.',
      },
    ],
    keyTerminology: [
      'LevelUpDev platform',
      'Next.js & TypeScript',
      'dual-layer persistence',
      'MediaRecorder API',
      'optimistic caching',
      'sub-second latency',
      'WebAssembly Whisper',
    ],
    powerPhrases: [
      'I architected LevelUpDev to solve the critical gap in engineering communication...',
      'The architecture utilizes Next.js on the frontend with dual-layer cloud and local storage persistence...',
      'My key technical contribution was designing a client-side audio recording studio operating with sub-50ms latency...',
      'This project solidified my expertise in building resilient, full-stack production systems.',
    ],
    modelSpokenAnswer:
      'I architected LevelUpDev, a comprehensive career acceleration platform engineered specifically for software and AI engineering candidates. The core problem we identified is that while students possess strong theoretical coding skills, they frequently struggle with spontaneous verbal communication and structured interview explanations. To solve this, I designed a web platform featuring deterministic daily roadmaps, an interactive diagnostic assessment suite, and client-side audio rehearsal studios. For the technology stack, I chose Next.js and TypeScript for complete type safety, with a dual-layer persistence model combining Cloud Firestore and LocalStorage. My primary technical contribution was building an in-browser audio recording engine using the MediaRecorder API, enabling users to record and review timed mock answers client-side with zero streaming latency. The biggest challenge I solved was offline synchronization: by implementing optimistic caching and background batching, users never lose practice data even during network fluctuations. As a result, the application compiles across forty-two optimized routes with sub-second response times. Moving forward, I am currently prototyping real-time Whisper speech-to-text integration for automated grammatical feedback.',
    commonPitfallsToAvoid: [
      'Never skip the "Toughest Challenge" step — interviewers want to see how you solve real engineering problems.',
      'Quantify results wherever possible (e.g. 42 routes, zero streaming latency, dual-layer sync).',
    ],
    rehearsalChecklist: [
      'Did you cover all 8 steps systematically?',
      'Did you highlight YOUR specific code and architectural contributions?',
      'Did you finish with a forward-looking engineering roadmap?',
    ],
  },
  {
    id: 'pdrill-s6-presentation-demo',
    stageId: 'stage_6_job_ready_executive',
    stageNumber: 6,
    category: 'presentation',
    categoryLabel: 'Executive Presentation',
    title: 'Executive AI Demo: Pitching LevelUpDev to Engineering Leaders',
    targetDurationSeconds: 120,
    preparationSeconds: 20,
    context:
      'Present a 2-minute live demo pitch of your platform to engineering managers, showcasing the product vision, architecture, and developer outcomes.',
    whyThisMatters:
      'Great engineers are also great storytellers. Demonstrating a product smoothly proves you are ready for cross-functional leadership.',
    responseFramework: [
      {
        stepNumber: 1,
        stepTitle: 'Engaging Hook & Problem',
        description: 'Capture attention with a surprising statistic on engineering hiring.',
        starterPhrase: 'Over eighty percent of engineering candidates fail technical interviews not because of their code, but because of poor verbal communication...',
      },
      {
        stepNumber: 2,
        stepTitle: 'Live Solution Demo',
        description: 'Walk through the 15-track scenario studio and daily routines.',
        starterPhrase: 'LevelUpDev solves this by transforming passive reading into active, timed vocal rehearsal across fifteen specialized career tracks...',
      },
      {
        stepNumber: 3,
        stepTitle: 'Architecture Highlight',
        description: 'Mention the lightning-fast tech stack and privacy-first design.',
        starterPhrase: 'Under the hood, the platform is built for speed and privacy, featuring client-side recording and resilient cloud persistence...',
      },
      {
        stepNumber: 4,
        stepTitle: 'Impactful Call to Action',
        description: 'Summarize the vision of turning students into job-ready engineers.',
        starterPhrase: 'By combining structured technical frameworks with daily deliberate practice, we empower engineers to communicate with undeniable conviction.',
      },
    ],
    keyTerminology: ['executive pitch', 'product vision', 'vocal rehearsal studio', 'job-readiness platform', 'developer empowerment'],
    powerPhrases: [
      'Over eighty percent of interview rejections stem from communication bottlenecks, not lack of coding talent...',
      'LevelUpDev provides a structured, high-signal rehearsal environment that builds genuine verbal conviction...',
      'We bridge the gap between academic theory and high-stakes engineering interviews.',
    ],
    modelSpokenAnswer:
      'Over eighty percent of engineering graduates struggle during technical interviews not because they lack coding ability, but because they have never practiced spontaneous verbal communication. LevelUpDev transforms this dynamic by turning passive learning into active, high-intensity speaking rehearsal. As you see on the dashboard, candidates select from fifteen specialized career tracks—from Python concurrency to Generative AI architecture defense. Each track provides structured response blueprints, terminology checklists, and side-by-side Junior versus Senior script comparisons. Candidates can rehearse their answers using our in-browser audio studio, review model spoken responses, and track their confidence growth over time. Built with Next.js and resilient cloud persistence, LevelUpDev bridges the critical gap between academic theory and job-ready engineering communication.',
    commonPitfallsToAvoid: [
      'Do not get bogged down in tiny CSS details — keep the presentation focused on high-level value, architecture, and user transformation.',
    ],
    rehearsalChecklist: [
      'Did you start with an attention-grabbing hook?',
      'Did you project your voice with enthusiasm and executive confidence?',
    ],
  },
];

export function getDrillsByStage(stageId: CommunicationProgressionStageId): PersonalizedSpeakingDrill[] {
  return PERSONALIZED_SPEAKING_DRILLS.filter((d) => d.stageId === stageId);
}

export function getDrillsByCategory(category: PersonalizedSpeakingDrill['category']): PersonalizedSpeakingDrill[] {
  return PERSONALIZED_SPEAKING_DRILLS.filter((d) => d.category === category);
}

export function getDrillById(drillId: string): PersonalizedSpeakingDrill | undefined {
  return PERSONALIZED_SPEAKING_DRILLS.find((d) => d.id === drillId);
}
