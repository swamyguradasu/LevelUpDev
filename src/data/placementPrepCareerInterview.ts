import { PlacementCategory } from './placementPrepData';

// =========================================================================
// 16 — PROJECTS
// =========================================================================
export const PROJECTS_CATEGORY: PlacementCategory = {
  id: 'projects',
  cardNumber: '16',
  title: 'Flagship Projects',
  shortTitle: 'Projects',
  tagline: 'Problem formulation, architecture, tech stack selection, DB design, API contracts, quality, and interview defense.',
  phaseId: 'career-prep',
  phaseName: 'Career Prep',
  iconName: 'FolderGit2',
  badge: 'Crucial for Resume',
  estimatedHours: '40 Hours',
  importance: 'Critical',
  description: 'A structured blueprint to conceptualize, architect, build, polish, and defend real-world software applications that stand out in recruiter screenings and technical interviews.',
  targetMNCs: ['All Product & Service MNCs'],
  levels: [
    {
      id: 'level-1-project-fundamentals',
      levelNumber: '01',
      title: 'Project Fundamentals',
      shortDescription: 'Finding a problem, defining requirements, choosing technology, architecture, DB design, API design, and testing.',
      estimatedHours: '10 Hours',
      concepts: [
        {
          id: 'ideation-architecture-design',
          title: 'Ideation, Architecture & Schema Design',
          tagline: 'Real-world problem scoping, tech stack trade-offs, ER modeling, REST API contracts.',
          description: 'Transition from basic tutorial cloning to engineering original, well-architected solutions.',
          topics: [
            {
              id: 'problem-scoping-tech-stack',
              title: 'Finding a Problem, Defining Requirements & Choosing Technology',
              summary: 'Identifying non-trivial real-world pain points, user persona definitions, functional vs non-functional requirements, choosing tech stacks.',
              whatYouWillLearn: 'How to avoid generic clone projects (e.g. basic to-do list) and pick problems with real technical depth (concurrency, caching, state machines).',
              concept: 'A strong portfolio project solves a specific domain problem with clear boundaries: User Roles → Functional Requirements (CRUD, auth, search) → Non-Functional Requirements (latency, consistency).',
              whyItMatters: 'The first filter interviewers apply when reviewing your resume.',
              keyTakeaways: [
                'Choose technologies based on problem requirements (e.g. PostgreSQL for relational transactions, Redis for fast cache, WebSockets for real-time chat).',
                'Document functional requirements in a structured specification before writing code.',
              ],
            },
            {
              id: 'architecture-db-api-design',
              title: 'System Architecture, Database Schema & API Contracts',
              summary: 'Component diagrams, normalized relational schemas, foreign keys, OpenAPI / REST endpoint specifications.',
              whatYouWillLearn: 'Creating clean entity-relationship (ER) diagrams, indexing foreign keys, and designing consistent REST API routes.',
              concept: 'Design databases by identifying core entities and relationships (1:1, 1:N, M:N). Document API contracts with expected request headers, JSON payloads, and response status codes.',
              whyItMatters: 'Shows interviewers that you follow systematic engineering processes rather than ad-hoc hacking.',
              keyTakeaways: [
                'Draw a clean high-level architecture diagram showing Client → API Gateway → Services → Database.',
                'Enforce DB foreign key constraints and define appropriate cascading rules.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-2-building-projects',
      levelNumber: '02',
      title: 'Building Projects & Developer Hygiene',
      shortDescription: 'Git workflows, branching, debugging, documentation, README writing, environment variables, and cloud deployment.',
      estimatedHours: '10 Hours',
      concepts: [
        {
          id: 'dev-workflow-deployment',
          title: 'Git Hygiene, Environment Secrets & Cloud Deployment',
          tagline: 'Feature branch workflows, .env security, professional markdown READMEs, Vercel/Render hosting.',
          description: 'Maintain production-grade code repositories with automated deployments and clear documentation.',
          topics: [
            {
              id: 'git-readme-env-deployment',
              title: 'Git Branching, Professional README, .env Secrets & Live Deployment',
              summary: 'Atomic commits, creating feature branches, writing markdown README with architecture diagrams and live demo links, `.env.example` templates.',
              whatYouWillLearn: 'Writing compelling README files with badges, architecture overview, installation steps, and deploying to Vercel/Render/Railway.',
              concept: 'A stellar GitHub repository features: 1. Live demo URL. 2. Clear architecture diagram. 3. Features checklist. 4. Tech stack breakdown. 5. Local setup instructions. 6. Environment variables guide.',
              whyItMatters: 'Recruiters and engineers look directly at your GitHub repo links.',
              keyTakeaways: [
                'Never commit secrets or API keys: always provide a sanitized `.env.example` file.',
                'Include GIF demo walkthroughs and screenshots in the README.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-3-project-quality',
      levelNumber: '03',
      title: 'Project Quality & Engineering Polish',
      shortDescription: 'Error handling, validation, security basics, performance, responsive UI, logging, and automated testing.',
      estimatedHours: '10 Hours',
      concepts: [
        {
          id: 'quality-security-testing',
          title: 'Security, Validation, Performance & Testing',
          tagline: 'Zod/Joi schema validation, rate limiting, SQL injection prevention, mobile responsiveness, Unit tests.',
          description: 'Elevate projects from amateur student scripts to resilient, production-ready applications.',
          topics: [
            {
              id: 'validation-security-performance-testing',
              title: 'Validation, Security Basics, Performance & Testing',
              summary: 'Input validation schemas, protecting against XSS and SQL injection, optimistic UI updates, unit testing API endpoints.',
              whatYouWillLearn: 'Implementing structured error middleware (try/catch with consistent JSON errors), sanitizing inputs, and writing integration tests.',
              concept: 'Production quality means handling failure gracefully: server crashes are caught by global error handlers, invalid user payloads return 400 Bad Request with field-specific errors, and UI displays helpful empty states.',
              whyItMatters: 'Answering: "How did you ensure security and performance in your project?" in technical rounds.',
              keyTakeaways: [
                'Validate all incoming request bodies with schema validators (Zod/Pydantic).',
                'Never concatenate raw user strings into SQL queries: always use parameterized queries or ORMs.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-4-project-explanation',
      levelNumber: '04',
      title: 'Project Defense & Explanation',
      shortDescription: 'Problem statement, architecture walkthrough, technology rationale, engineering challenges, solutions, and roadmap.',
      estimatedHours: '10 Hours',
      concepts: [
        {
          id: 'project-interview-defense',
          title: 'The 7-Step Project Defense Framework',
          tagline: 'Problem → Architecture → Tech choices → Hardest bug/challenge → Metrics & results → Future roadmap.',
          description: 'Articulate your project clearly in 3-5 minutes, demonstrating deep ownership and engineering maturity.',
          topics: [
            {
              id: 'project-storytelling-challenges',
              title: 'Problem Statement, Architecture Walkthrough & Overcoming Challenges',
              summary: 'Structuring your 3-minute project elevator pitch, defending trade-offs, and explaining the hardest technical bug you solved.',
              whatYouWillLearn: 'Using the STAR framework to explain complex technical hurdles (e.g. solving race conditions, query optimization).',
              concept: 'Interviewers ask about projects to gauge genuine ownership: "Walk me through your architecture", "Why MongoDB over PostgreSQL?", "What was the most difficult bug you encountered?".',
              whyItMatters: 'Carries 40%+ weightage in senior technical interview rounds.',
              keyTakeaways: [
                'Prepare a clear 2-minute elevator pitch summarizing problem, stack, and impact.',
                'Have 2 specific technical challenges ready to discuss with the exact root cause and solution.',
              ],
            },
          ],
        },
      ],
    },
  ],
};

// =========================================================================
// 17 — RESUME & PORTFOLIO
// =========================================================================
export const RESUME_PORTFOLIO_CATEGORY: PlacementCategory = {
  id: 'resume-portfolio',
  cardNumber: '17',
  title: 'Resume & Portfolio Building',
  shortTitle: 'Resume & Portfolio',
  tagline: 'ATS optimization, action verbs, quantified metrics, impact statements, and recruiter-focused portfolio design.',
  phaseId: 'career-prep',
  phaseName: 'Career Prep',
  iconName: 'UserCheck',
  badge: 'Screening Round',
  estimatedHours: '15 Hours',
  importance: 'Critical',
  description: 'Craft a high-converting, ATS-compliant 1-page engineering resume and a personal portfolio website that lands recruiter interview calls.',
  targetMNCs: ['All Product & Service MNCs'],
  levels: [
    {
      id: 'level-1-resume-structure',
      levelNumber: '01',
      title: 'Resume Structure & Layout',
      shortDescription: 'Single-page layout, summary, education, categorized technical skills, projects, experience, and achievements.',
      estimatedHours: '4 Hours',
      concepts: [
        {
          id: 'resume-sections-layout',
          title: 'Single-Page Engineering Resume Structure',
          tagline: 'Header (links), Education, Technical Skills (Languages, Frameworks, DBs, Tools), Projects, Experience, Achievements.',
          description: 'Format a clean, uncluttered, single-page resume tailored for software engineering roles.',
          topics: [
            {
              id: 'resume-layout-sections',
              title: 'Resume Sections, Ordering & Design Rules',
              summary: 'Strict 1-page limit for freshers, standard section hierarchy, standard fonts (Inter, Calibri, Arial), clickable GitHub/LinkedIn links.',
              whatYouWillLearn: 'Categorizing skills into Languages, Frameworks, Databases, Tools, and Core CS to avoid laundry-list clutter.',
              concept: 'Recruiters spend 6 seconds scanning a resume. Key information (Education, GPA, Tech Skills, Top 2 Projects with live links) must be immediately visible above the fold.',
              whyItMatters: 'Prevents automatic rejection during initial recruiter screening.',
              keyTakeaways: [
                'Always export resume as PDF named `FirstName_LastName_Resume.pdf`.',
                'Group technical skills cleanly: e.g. Languages (Python, Java), Databases (PostgreSQL, MongoDB), Tools (Git, Docker).',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-2-project-bullet-writing',
      levelNumber: '02',
      title: 'Writing Impactful Project Bullets',
      shortDescription: 'Action verbs, XYZ formula (Accomplished X, measured by Y, by doing Z), technical keywords, and avoiding generic fluff.',
      estimatedHours: '4 Hours',
      concepts: [
        {
          id: 'xyz-formula-action-verbs',
          title: 'Google XYZ Bullet Formula & Metric Quantification',
          tagline: 'Action Verb + Technical Tool + Specific Implementation + Quantified Impact/Metric.',
          description: 'Transform weak, passive project bullets into compelling engineering achievements.',
          topics: [
            {
              id: 'google-xyz-metrics-bullets',
              title: 'Action Verbs, Metrics & The Google XYZ Formula',
              summary: 'Weak: "Made a website with auth." Strong: "Architected secure JWT-based authentication system handling 500+ daily logins, reducing unauthorized access attempts by 99% using bcrypt and Redis rate limiting."',
              whatYouWillLearn: 'Applying strong action verbs (Engineered, Architected, Optimized, Deployed, Reduced, Accelerated) and embedding metrics.',
              concept: 'Google formula: "Accomplished [X] as measured by [Y], by doing [Z]". Every project bullet must demonstrate technical capability and tangible outcomes.',
              whyItMatters: 'Makes your resume instantly memorable to hiring managers.',
              keyTakeaways: [
                'Start every bullet with a strong past-tense action verb (Developed, Refactored, Integrated).',
                'Include performance numbers (e.g. reduced query latency by 40%, indexed 10,000 records).',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-3-ats-optimization',
      levelNumber: '03',
      title: 'Applicant Tracking Systems (ATS)',
      shortDescription: 'ATS parsers, keyword matching, formatting traps, and aligning resume with job descriptions.',
      estimatedHours: '3 Hours',
      concepts: [
        {
          id: 'ats-parsers-keywords',
          title: 'ATS Parser Compatibility & Keyword Optimization',
          tagline: 'Single-column text, standard section headings, keyword matching from job descriptions, 0-table layout.',
          description: 'Ensure your resume parses with 95%+ accuracy in Workday, Greenhouse, and Taleo ATS systems.',
          topics: [
            {
              id: 'ats-formatting-keywords',
              title: 'ATS Basics, Keyword Matching & Formatting Traps',
              summary: 'Avoiding multi-column tables, graphics, text boxes, and icons that break ATS parsers; matching role requirements.',
              whatYouWillLearn: 'Extracting keywords from target job descriptions (e.g. REST API, Docker, CI/CD) and weaving them organically into project bullets.',
              concept: 'ATS software extracts plain text into structured candidate profiles. Complex multi-column templates and icon bars garble text and result in instant automatic rejection.',
              whyItMatters: 'Over 75% of online applications are filtered out by ATS before a human recruiter sees them.',
              keyTakeaways: [
                'Use standard headings: "Education", "Technical Skills", "Projects", "Experience", "Certifications".',
                'Stick to clean single-column layouts with standard bullet points.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-4-portfolio-website',
      levelNumber: '04',
      title: 'Personal Developer Portfolio',
      shortDescription: 'Portfolio structure, about section, interactive projects, GitHub links, LinkedIn integration, and recruiter UX.',
      estimatedHours: '4 Hours',
      concepts: [
        {
          id: 'portfolio-ux-recruiter-view',
          title: 'Portfolio Architecture & Recruiter Experience',
          tagline: 'Hero introduction, skills grid, live project cards with GitHub/demo links, responsive design, fast load times.',
          description: 'Build a fast, responsive personal portfolio that establishes your digital engineering identity.',
          topics: [
            {
              id: 'portfolio-sections-recruiter-view',
              title: 'Portfolio Structure, Live Demos & Recruiter Experience',
              summary: 'Hero banner with elevator pitch, interactive skills trail, featured project cards with live demo buttons and GitHub repositories.',
              whatYouWillLearn: 'Designing for the recruiter: ensuring projects open immediately without login walls, fast load times (<1.5s), and mobile responsiveness.',
              concept: 'A portfolio provides visual proof of competence. It should allow an engineering manager to inspect your code quality and try your deployed app with a single click.',
              whyItMatters: 'Gives you an undeniable edge over candidates who only submit plain text resumes.',
              keyTakeaways: [
                'Ensure every project has BOTH a working Live Demo link and a clean GitHub Repository link.',
                'Keep the interface modern, fast, and free of broken links or placeholder text.',
              ],
            },
          ],
        },
      ],
    },
  ],
};

// =========================================================================
// 18 — COMMUNICATION
// =========================================================================
export const COMMUNICATION_CATEGORY: PlacementCategory = {
  id: 'communication',
  cardNumber: '18',
  title: 'Professional Communication',
  shortTitle: 'Communication',
  tagline: 'Self-introductions, technical concept explanations, structured answers, handling unknown questions, and active listening.',
  phaseId: 'career-prep',
  phaseName: 'Career Prep',
  iconName: 'MessageSquare',
  badge: 'Soft Skills',
  estimatedHours: '15 Hours',
  importance: 'High',
  description: 'Master interpersonal and technical communication. Learn to introduce yourself crisply, explain complex computer science concepts simply, structure responses under pressure, and navigate difficult or unknown questions.',
  targetMNCs: ['All Product & Service MNCs'],
  levels: [
    {
      id: 'level-1-verbal-fundamentals',
      levelNumber: '01',
      title: 'Verbal Fundamentals & Self Introduction',
      shortDescription: 'The 90-second elevator pitch, clear pronunciation, pacing, and ELI5 (Explain Like I’m 5) technical explanations.',
      estimatedHours: '5 Hours',
      concepts: [
        {
          id: 'self-intro-technical-clarity',
          title: 'Self-Introduction & Explaining Technical Concepts',
          tagline: 'Past-Present-Future self-introduction formula, tone modulation, eliminating filler words, simplifying complexity.',
          description: 'Deliver confident, polished verbal responses during opening interview minutes.',
          topics: [
            {
              id: 'self-intro-eli5-explanations',
              title: 'The 90-Second Self Introduction & Technical Clarity',
              summary: 'Structuring "Tell me about yourself": Present role/degree → Core technical strengths → Key project highlights → Future alignment with the company.',
              whatYouWillLearn: 'Eliminating filler words ("um", "like", "you know"), pacing speech at 130-150 words/min, and using real-world analogies to explain technical concepts.',
              concept: 'First impressions set the tone for the entire interview. A crisp, structured self-introduction establishes competence, enthusiasm, and articulate communication within the first 90 seconds.',
              whyItMatters: 'Asked as the opening question in 99% of interviews.',
              keyTakeaways: [
                'Formula: Present (Education/Focus) → Past (Key technical projects/skills built) → Future (Why this specific company/role).',
                'Use analogies when explaining technical topics (e.g. "An API is like a waiter taking your order to the kitchen and bringing back your meal").',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-2-technical-communication',
      levelNumber: '02',
      title: 'Technical Dialogue & Q&A Mastery',
      shortDescription: 'Project explanation, thinking out loud during live coding, asking clarifying questions, and two-way technical dialogue.',
      estimatedHours: '5 Hours',
      concepts: [
        {
          id: 'thinking-out-loud-asking-questions',
          title: 'Thinking Out Loud & Clarifying Questions',
          tagline: 'Verbalizing thought processes during problem solving, active listening, asking smart questions at the end.',
          description: 'Transform silent, awkward problem-solving sessions into collaborative pair-programming discussions.',
          topics: [
            {
              id: 'think-out-loud-clarifying-questions',
              title: 'Thinking Out Loud & Asking Clarifying Questions',
              summary: 'Stating assumptions before coding, explaining why you rejected brute force, active listening, and asking impactful closing questions.',
              whatYouWillLearn: 'How to communicate while writing code on a whiteboard or shared editor, inviting the interviewer into your thought process.',
              concept: 'Interviewers evaluate your thought process more than raw syntax. Thinking out loud allows the interviewer to provide gentle hints if you wander off track.',
              whyItMatters: 'Distinguishes collaborative team players from isolated coders.',
              keyTakeaways: [
                'Always ask clarifying questions before writing code (e.g. "Can the array contain negative numbers?", "Are all elements distinct?").',
                'At the end, ask thoughtful questions about engineering culture and tech stack challenges.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-3-confidence-handling-unknowns',
      levelNumber: '03',
      title: 'Confidence & Handling Unknown Questions',
      shortDescription: 'Structured answer frameworks, handling questions when you do not know the answer, and maintaining professional poise.',
      estimatedHours: '5 Hours',
      concepts: [
        {
          id: 'handling-unknown-questions-poise',
          title: 'Navigating Unknown Questions with Confidence',
          tagline: 'Saying "I don’t know" professionally, educated reasoning from first principles, body language, composure.',
          description: 'Maintain composure and problem-solve from first principles when confronted with unfamiliar topics.',
          topics: [
            {
              id: 'handle-unknown-questions-gracefully',
              title: 'How to Handle Questions When You Don’t Know the Answer',
              summary: 'Never bluff or invent false answers; acknowledge knowledge boundaries while demonstrating first-principles reasoning.',
              whatYouWillLearn: 'Phrasing: "I haven’t worked directly with technology X, but based on my understanding of Y, here is how I would reason about the problem..."',
              concept: 'Interviewers frequently push candidates to the edge of their knowledge to observe how they handle uncertainty. Honesty combined with logical reasoning demonstrates high integrity and intellectual curiosity.',
              whyItMatters: 'Bluffing on technical questions leads to instant disqualification.',
              keyTakeaways: [
                'Be honest: admit when you are unfamiliar with a specific tool, then reason about its underlying principles.',
                'Maintain calm, confident posture and steady eye contact.',
              ],
            },
          ],
        },
      ],
    },
  ],
};

// =========================================================================
// 19 — TECHNICAL INTERVIEW
// =========================================================================
export const TECHNICAL_INTERVIEW_CATEGORY: PlacementCategory = {
  id: 'technical-interview',
  cardNumber: '19',
  title: 'Technical Interview Mastery',
  shortTitle: 'Technical Interview',
  tagline: 'Live coding rounds, dry running code, CS core technical grillings, project deep dives, and output-tracing questions.',
  phaseId: 'interview-prep',
  phaseName: 'Interview Prep',
  iconName: 'Target',
  badge: 'Round 2 / Technical',
  estimatedHours: '30 Hours',
  importance: 'Critical',
  description: 'Master live technical rounds. Covers live whiteboard coding, dry running test cases with pointer tables, rapid-fire CS core theory (OOP, DBMS, OS, Networks), and in-depth project architectural defense.',
  targetMNCs: ['Amazon', 'Microsoft', 'TCS Digital', 'Infosys DSE', 'Accenture', 'Adobe'],
  levels: [
    {
      id: 'level-1-programming-output',
      levelNumber: '01',
      title: 'Language Fundamentals & Output Questions',
      shortDescription: 'Pointers/references, scope, closures, pass-by-value vs reference, debugging code snippets, and predicting outputs.',
      estimatedHours: '6 Hours',
      concepts: [
        {
          id: 'output-debugging-snags',
          title: 'Language Nuances & Output Prediction',
          tagline: 'Variable hoisting, pass by object reference, mutable vs immutable defaults, operator precedence traps.',
          description: 'Solve tricky output-prediction and code debugging questions across Python, Java, and C++.',
          topics: [
            {
              id: 'language-traps-output-questions',
              title: 'Output Prediction & Debugging Language Snags',
              summary: 'Common interview traps: mutable default arguments in Python (`def fn(x=[])`), string immutability, integer division, floating point precision.',
              whatYouWillLearn: 'Tracing execution flow line-by-line to predict exact console output without running a compiler.',
              concept: 'Technical rounds test fundamental language mechanics: how memory references behave, how scope resolution (LEGB) works, and how type conversions occur.',
              whyItMatters: 'Frequent format for Round 1 technical MCQs and live screening rounds.',
              keyTakeaways: [
                'In Python: default arguments are evaluated ONCE at function definition time, not at invocation.',
                'In Java: `==` compares object memory references; `.equals()` compares object content values.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-2-dsa-interview-execution',
      levelNumber: '02',
      title: 'Live DSA Interview Execution',
      shortDescription: 'Constraint reading, stating brute force, proposing optimal patterns, dry-running with pointer tables, and edge cases.',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'live-dsa-6-step-framework',
          title: 'The 6-Step Live Coding Framework',
          tagline: 'Understand → Brute Force → Optimize → Write Clean Code → Dry Run Table → Test Edge Cases.',
          description: 'Execute live coding rounds methodically without panicking or writing premature code.',
          topics: [
            {
              id: 'live-coding-framework-dry-run',
              title: 'The 6-Step Live Whiteboard / IDE Framework',
              summary: '1. Clarify constraints. 2. State brute force with time/space complexity. 3. Propose optimal algorithm. 4. Code cleanly with descriptive variable names. 5. Dry run with sample input. 6. Test edge cases.',
              whatYouWillLearn: 'Never jump straight into writing code without verbalizing your algorithmic approach to the interviewer first.',
              concept: 'Live coding is an assessment of your structured problem-solving discipline. A candidate who communicates clearly and writes clean, dry-run-tested code scores higher than a silent candidate who types fast.',
              whyItMatters: 'Standard format for all Tier-1 and product company technical rounds.',
              keyTakeaways: [
                'Always ask: "Is it okay if I proceed with this O(N) approach?" before writing code.',
                'Dry-run code using a small 4-column trace table tracking variable states.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-3-cs-core-grilling',
      levelNumber: '03',
      title: 'CS Core Technical Grilling',
      shortDescription: 'Rapid-fire questions across OOP, DBMS, SQL, Operating Systems, and Computer Networks.',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'cs-core-interview-grilling',
          title: 'High-Frequency CS Core Interview Questions',
          tagline: 'Overloading vs Overriding, ACID transactions, 3-way handshake, Deadlock Coffman conditions, Process vs Thread.',
          description: 'Rapidly answer fundamental computer science questions with precise technical terminology.',
          topics: [
            {
              id: 'top-cs-core-interview-questions',
              title: 'Mastering the Top 50 CS Core Interview Questions',
              summary: 'Curated rapid-fire answers for OOP (4 pillars), DBMS (Normalization & Indexes), OS (Virtual Memory & Scheduling), and Networks (TCP/IP & DNS).',
              whatYouWillLearn: 'Giving concise, 45-second high-impact answers using formal definitions followed by concrete real-world examples.',
              concept: 'CS Core questions test whether you understand the fundamental computer science principles underlying the software you write.',
              whyItMatters: 'Heavily evaluated across TCS Digital, Infosys SP, Cognizant, and Wipro Turbo rounds.',
              keyTakeaways: [
                'Structure answers: Definition → Key Properties → Real-World Example.',
                'Review the 4 Coffman conditions for deadlocks and 3-way TCP handshake steps before every interview.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-4-project-deep-dive',
      levelNumber: '04',
      title: 'Project Architecture & Defense',
      shortDescription: 'Explaining project architecture, technology choices, database trade-offs, scaling limits, and future roadmap.',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'project-deep-dive-defense',
          title: 'Live Project Architecture & Code Walkthrough',
          tagline: 'System diagrams, explaining your hardest technical bug, database choices, handling concurrency.',
          description: 'Confidently explain and defend every architectural decision in your major resume projects.',
          topics: [
            {
              id: 'project-grilling-defense-mastery',
              title: 'Answering Senior Engineer Project Questions',
              summary: 'Defending why you picked specific databases, explaining authentication flows, handling concurrency, and demonstrating deep ownership.',
              whatYouWillLearn: 'How to handle challenging interviewer questions: "How would your project handle 100,000 concurrent users?", "Why did you choose SQL over NoSQL?".',
              concept: 'Interviewers use your projects to test whether you were a passive team member or an active engineer who solved real technical challenges.',
              whyItMatters: 'Decides hiring recommendations in final technical rounds.',
              keyTakeaways: [
                'Know every line of code and every library in your resume projects.',
                'Be prepared to sketch your system architecture on a digital whiteboard.',
              ],
            },
          ],
        },
      ],
    },
  ],
};

// =========================================================================
// 20 — HR INTERVIEW
// =========================================================================
export const HR_INTERVIEW_CATEGORY: PlacementCategory = {
  id: 'hr-interview',
  cardNumber: '20',
  title: 'HR & Behavioral Interview (STAR Framework)',
  shortTitle: 'HR Interview',
  tagline: 'Tell me about yourself, strengths/weaknesses, why this company, behavioral conflict resolution, and the STAR framework.',
  phaseId: 'interview-prep',
  phaseName: 'Interview Prep',
  iconName: 'Users',
  badge: 'Final Round',
  estimatedHours: '15 Hours',
  importance: 'Critical',
  description: 'Master behavioral and HR interviews. Learn the STAR (Situation, Task, Action, Result) storytelling framework to deliver authentic, structured answers for strengths, weaknesses, failure, pressure, and career alignment.',
  targetMNCs: ['All Product & Service MNCs'],
  levels: [
    {
      id: 'level-1-star-framework-hr',
      levelNumber: '01',
      title: 'HR Questions & The STAR Framework',
      shortDescription: 'Situation, Task, Action, Result framework for answering behavioral and situational HR questions.',
      estimatedHours: '15 Hours',
      concepts: [
        {
          id: 'star-methodology',
          title: 'The STAR Behavioral Storytelling Framework',
          tagline: 'Situation (Context) → Task (Goal) → Action (What YOU did) → Result (Quantified Outcome).',
          description: 'Structure behavioral stories into concise, compelling 2-minute narratives.',
          topics: [
            {
              id: 'star-framework-mastery',
              title: 'The STAR Framework: Situation, Task, Action & Result',
              summary: 'Structuring behavioral responses: Situation (15% context), Task (15% objective), Action (50% specific steps you took), Result (20% positive outcome & learning).',
              whatYouWillLearn: 'Focusing heavily on "I" rather than "we" during the Action section to highlight your individual leadership and initiative.',
              concept: 'Past behavior predicts future performance. The STAR methodology ensures your story is structured, concise, and emphasizes your personal contribution and measurable results.',
              whyItMatters: 'Standard evaluation rubric used by Amazon (Leadership Principles), Google, and MNC HR teams.',
              keyTakeaways: [
                'Situation: Set the scene briefly (company/project, team size, timeline).',
                'Action: The meat of your answer—explain the specific technical and interpersonal actions YOU took.',
                'Result: Always end with a positive measurable outcome or key learning.',
              ],
            },
            {
              id: 'top-hr-questions-mastery',
              title: 'Mastering Classic HR Questions (Strengths, Weaknesses, Goals)',
              summary: 'Tell me about yourself, Strengths & genuine Weaknesses with growth actions, Why should we hire you?, Why our company?, 5-year career vision.',
              whatYouWillLearn: 'Structuring genuine weaknesses (e.g. "I used to struggle with delegation, so I implemented daily kanban task tracking") without giving disqualifying answers.',
              concept: 'HR questions assess cultural fit, coachability, self-awareness, and genuine enthusiasm for the company.',
              whyItMatters: 'Failing the HR round after clearing technical rounds is completely preventable with structured prep.',
              keyTakeaways: [
                'Research the company’s core values, recent news, and tech products before the interview.',
                'Weakness: always pick a genuine operational weakness followed by the concrete steps you took to improve it.',
              ],
            },
            {
              id: 'behavioral-conflict-failure-pressure',
              title: 'Handling Team Conflict, Failure, Pressure & Adaptability',
              summary: 'Tell me about a time you failed, handling team disagreement, working under tight deadlines, adapting to unfamiliar technologies.',
              whatYouWillLearn: 'Taking accountability for failures and highlighting constructive conflict resolution.',
              concept: 'Demonstrating emotional intelligence: disagreements should be resolved through data, respectful dialogue, and alignment with project goals.',
              whyItMatters: 'Crucial for passing behavioral bars at top tech firms.',
              keyTakeaways: [
                'Never badmouth past teammates, professors, or employers.',
                'Focus on what the failure taught you and how you altered your process moving forward.',
              ],
            },
          ],
        },
      ],
    },
  ],
};

// =========================================================================
// 21 — MANAGERIAL ROUND
// =========================================================================
export const MANAGERIAL_ROUND_CATEGORY: PlacementCategory = {
  id: 'managerial-round',
  cardNumber: '21',
  title: 'Managerial & Techno-Behavioral Round',
  shortTitle: 'Managerial Round',
  tagline: 'Teamwork, ownership, decision making, conflict resolution, prioritization, tight deadlines, and techno-behavioral scenarios.',
  phaseId: 'interview-prep',
  phaseName: 'Interview Prep',
  iconName: 'Briefcase',
  badge: 'Senior Evaluation',
  estimatedHours: '15 Hours',
  importance: 'High',
  description: 'Excel in techno-behavioral and managerial rounds conducted by Engineering Managers and Delivery Heads. Demonstrate ownership, prioritization trade-offs, and technical adaptability.',
  targetMNCs: ['TCS Digital / Prime', 'Infosys SP / DSE', 'Accenture FSE', 'Amazon', 'Cognizant'],
  levels: [
    {
      id: 'level-1-managerial-scenarios',
      levelNumber: '01',
      title: 'Managerial & Situational Scenarios',
      shortDescription: 'Ownership, handling tight deadlines, technology pivot decisions, and cross-functional team collaboration.',
      estimatedHours: '15 Hours',
      concepts: [
        {
          id: 'managerial-competencies',
          title: 'Core Managerial Competencies & Case Scenarios',
          tagline: 'Ownership mindset, prioritization (Urgent vs Important), technical debt trade-offs, handling ambiguous requirements.',
          description: 'Demonstrate mature engineering judgment and cross-functional leadership in team scenarios.',
          topics: [
            {
              id: 'ownership-prioritization-deadlines',
              title: 'Ownership Mindset, Prioritization & Meeting Deadlines',
              summary: 'Taking end-to-end accountability for features, triaging bugs vs features under tight deadlines, communicating delays early.',
              whatYouWillLearn: 'How to answer: "What do you do if you realize you cannot meet a delivery deadline?", "How do you prioritize between two urgent tasks?".',
              concept: 'Engineering managers look for engineers who take ownership: when something breaks, you investigate root causes, communicate transparently, and propose solutions rather than assigning blame.',
              whyItMatters: 'Assesses whether you can be trusted to deliver production code autonomously.',
              keyTakeaways: [
                'Communicate blockers and potential delays early with mitigation options; never wait until the deadline day.',
                'Prioritize tasks using impact vs effort matrices.',
              ],
            },
            {
              id: 'conflict-unfamiliar-tech-decisions',
              title: 'Conflict Resolution & Adapting to Unfamiliar Technologies',
              summary: 'Resolving technical disagreements using benchmarks, learning new frameworks in days, handling changing project requirements.',
              whatYouWillLearn: 'Answering: "How do you handle being assigned a technology stack you have never used before?".',
              concept: 'Technology stacks change rapidly. Managers value rapid learning agility, curiosity, and systematic research over static memorization.',
              whyItMatters: 'Tested heavily in service MNC differential hiring (TCS Prime, Infosys SP).',
              keyTakeaways: [
                'Explain your rapid learning framework: Official Docs → Quick Prototype → Building Core Module.',
                'Resolve team design disputes by building small proof-of-concept (PoC) benchmarks.',
              ],
            },
          ],
        },
      ],
    },
  ],
};

// =========================================================================
// 22 — COMPANY-SPECIFIC PREPARATION (REUSABLE TEMPLATE ARCHITECTURE)
// =========================================================================
export const COMPANY_SPECIFIC_PREP_CATEGORY: PlacementCategory = {
  id: 'company-specific-prep',
  cardNumber: '22',
  title: 'Company-Specific Preparation',
  shortTitle: 'Company Tracks',
  tagline: 'Reusable preparation blueprint: eligibility, selection workflow, test pattern, technical rounds, and previous year question archives.',
  phaseId: 'interview-prep',
  phaseName: 'Interview Prep',
  iconName: 'Award',
  badge: 'Company Patterns',
  estimatedHours: '25 Hours',
  importance: 'Critical',
  description: 'A modular, reusable company-specific preparation framework. Learn how to research target companies, decode their assessment patterns, practice high-frequency company archives, and customize your technical answers.',
  targetMNCs: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Amazon', 'Microsoft', 'Cognizant', 'Capgemini'],
  levels: [
    {
      id: 'level-1-company-prep-template',
      levelNumber: '01',
      title: 'Company Preparation Blueprint',
      shortDescription: 'The 10-step company preparation framework: Eligibility, Selection Process, Assessment Pattern, Coding, and Interviews.',
      estimatedHours: '25 Hours',
      concepts: [
        {
          id: 'company-blueprint-framework',
          title: 'The 10-Step Company Preparation Framework',
          tagline: 'Eligibility → Selection Workflow → Test Pattern → Aptitude → Coding → Tech Interview → HR → Previous Year Archives.',
          description: 'A structured, repeatable methodology to crack any tech company on-campus or off-campus recruitment drive.',
          topics: [
            {
              id: 'company-research-test-patterns',
              title: 'Decoding Selection Workflows & Assessment Patterns',
              summary: 'Analyzing Round 1 Online Test (Aptitude + Coding sections, sectional cutoffs, negative marking), Round 2 Technical, Round 3 HR.',
              whatYouWillLearn: 'How to research company hiring tiers (e.g. TCS Ninja vs Digital vs Prime; Infosys SE vs DSE vs SP) and target the highest package bracket.',
              concept: 'Every company follows a distinct assessment DNA: some prioritize speed aptitude (Accenture), others prioritize medium-hard DSA (Amazon, Infosys SP), while others emphasize CS Core MCQs (TCS). Customizing your preparation to the specific test pattern maximizes clearance rates.',
              whyItMatters: 'Ensures efficient, targeted preparation during high-volume campus placement season.',
              keyTakeaways: [
                'Understand sectional time limits and whether intra-section navigation is allowed.',
                'Identify whether the company uses external testing platforms (HackerRank, AMCAT, CoCubes, Mettle).',
              ],
            },
            {
              id: 'company-previous-questions-skills',
              title: 'Previous Year Archives & Required Skills Checklist',
              summary: 'Solving past 3 years of company-specific coding questions, standard technical interview themes, and final revision checklist.',
              whatYouWillLearn: 'Categorizing past questions by frequency and mastering the exact question patterns favored by the hiring team.',
              concept: 'Most tier-1 and service MNCs reuse problem templates across placement cycles. Solving authentic past questions builds pattern recognition and confidence under exam conditions.',
              whyItMatters: 'Directly boosts scores in company-specific assessment rounds.',
              keyTakeaways: [
                'Practice previous year coding questions on a timed editor without autocomplete.',
                'Align your project defense with the company’s primary business domain.',
              ],
            },
          ],
        },
      ],
    },
  ],
};
