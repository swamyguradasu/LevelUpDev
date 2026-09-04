export interface PracticeExercise {
  id: string;
  type: 'speech' | 'quiz' | 'shadowing' | 'rewrite' | 'explanation' | 'star-builder';
  prompt: string;
  targetDurationSeconds?: number;
  sampleAnswer?: string;
  rubricOrTips: string[];
  options?: string[];
  correctIndex?: number;
  explanation?: string;
  listenScript?: string;
  badVsGoodPair?: {
    bad: string;
    good: string;
    why: string;
  };
}

export interface CurriculumTopic {
  id: string;
  title: string;
  summary: string;
  coreConcept: string;
  whyItMatters: string;
  lessonContent: {
    overview: string;
    keyPoints: string[];
    templatesOrPatterns?: Array<{
      pattern: string;
      example: string;
      usageTip: string;
    }>;
    dosAndDonts?: Array<{
      do: string;
      dont: string;
      context: string;
    }>;
    teluguPitfallNote?: string;
  };
  practice: PracticeExercise;
}

export interface CurriculumModule {
  id: string;
  moduleNumber: number; // 1 to 30
  title: string;
  description: string;
  estimatedMinutes: number;
  topics: CurriculumTopic[];
}

export interface CurriculumLevel {
  id: string;
  levelNumber: number; // 0 to 9
  levelCode: string; // "LEVEL 0", "LEVEL 1", etc.
  title: string;
  weeks: string; // e.g. "Weeks 1–3" or "Initial Assessment"
  objective: string;
  badge: string;
  iconName: string;
  modules: CurriculumModule[];
}

// =========================================================================
// LEVEL 0: INITIAL ASSESSMENT (BASELINE DIAGNOSTIC)
// =========================================================================
export const LEVEL_0_ASSESSMENT: CurriculumLevel = {
  id: 'level-0-assessment',
  levelNumber: 0,
  levelCode: 'LEVEL 0',
  title: 'Initial Assessment & Baseline Diagnostic',
  weeks: 'Day 1 — Baseline Evaluation',
  objective: 'Evaluate current baseline speaking confidence, grammar accuracy, vocabulary precision, listening comprehension, technical explanation, and interview readiness before structured training.',
  badge: 'Diagnostic Baseline',
  iconName: 'Target',
  modules: [
    {
      id: 'module-0-baseline',
      moduleNumber: 0,
      title: 'Comprehensive Diagnostic Benchmark',
      description: 'Seven multi-dimensional assessments to establish your starting proficiency radar.',
      estimatedMinutes: 45,
      topics: [
        {
          id: 'topic-0-speaking-assessment',
          title: 'Basic Speaking Assessment',
          summary: 'Assess vocal projection, hesitation rate, and continuous speech flow.',
          coreConcept: 'Fluency is the ability to speak continuously without long silent freezes or repetitive filler words.',
          whyItMatters: 'Identifies whether hesitation is caused by vocabulary search, grammar insecurity, or anxiety.',
          lessonContent: {
            overview: 'You will speak for 90 seconds answering a prompt about your background and motivation. Do not stop to correct minor grammar slips.',
            keyPoints: [
              'Focus on forward momentum over perfection.',
              'Observe where you pause: between words (hesitation) or between thoughts (natural pacing).',
              'Aim for 120-140 words per minute for clear international listener comprehension.',
            ],
            teluguPitfallNote: 'Avoid long "Aaah... Mmm..." sounds while searching for Telugu words in your head.',
          },
          practice: {
            id: 'prac-0-speaking',
            type: 'speech',
            prompt: 'Introduce yourself, summarize what you are currently studying, and explain what kind of software or AI role you want to pursue.',
            targetDurationSeconds: 90,
            sampleAnswer: 'Hello, my name is Swamy. I am currently deepening my skills in full-stack engineering, Python, and data structures. I enjoy building backend APIs and scalable systems. My goal is to work as a Software or AI Engineer at a fast-growing tech company where I can solve complex technical challenges.',
            rubricOrTips: [
              'Spoke for at least 60 seconds without stopping.',
              'Maintained consistent volume and steady breathing.',
              'Used under 3 filler words (um, ah, like).',
            ],
          },
        },
        {
          id: 'topic-0-grammar-assessment',
          title: 'Grammar Accuracy Assessment',
          summary: 'Evaluate verb tenses, subject-verb agreement, and prepositions.',
          coreConcept: 'Accurate tenses prevent miscommunication in daily standups and bug reports.',
          whyItMatters: 'Clear tense usage ensures recruiters and leads understand when events happened (past, ongoing, future).',
          lessonContent: {
            overview: 'Review common tense pairings and test your baseline diagnostic accuracy.',
            keyPoints: [
              'Past Simple vs Present Perfect confusion.',
              'Third-person singular -s endings (He runs, It fails).',
              'Preposition precision (in Python, on AWS, at 10 AM).',
            ],
          },
          practice: {
            id: 'prac-0-grammar',
            type: 'quiz',
            prompt: 'Which sentence correctly describes a completed action with a specific past time?',
            options: [
              'I have deployed the service yesterday morning.',
              'I deployed the service yesterday morning, and telemetry has remained stable since.',
              'I am deploying the service yesterday.',
              'I have been deployed the service yesterday.',
            ],
            correctIndex: 1,
            explanation: '"Deployed" is correct for the specific past time ("yesterday morning"), paired with Present Perfect ("has remained") for the ongoing result.',
            rubricOrTips: ['Look for specific time adverbs (yesterday, last week, in 2024).'],
          },
        },
        {
          id: 'topic-0-vocab-assessment',
          title: 'Vocabulary & Word Choice Assessment',
          summary: 'Determine whether you rely on simplistic words or professional technical vocabulary.',
          coreConcept: 'Replacing weak words ("did", "made", "bad thing") with strong technical action verbs ("implemented", "architected", "bottleneck") elevates your authority.',
          whyItMatters: 'Interviewers immediately perceive engineering maturity from your word choices.',
          lessonContent: {
            overview: 'Evaluate your active vs passive vocabulary repertoire.',
            keyPoints: [
              'Use precise verbs: "optimized", "refactored", "debugged", "provisioned".',
              'Use precise nouns: "latency", "throughput", "concurrency", "constraint".',
            ],
          },
          practice: {
            id: 'prac-0-vocab',
            type: 'quiz',
            prompt: 'Which alternative best replaces: "We had a problem with the database speed so I made it faster"?',
            options: [
              'We had a big speed issue so I changed the database to be good.',
              'We encountered high query latency, which I resolved by indexing foreign keys and optimizing the execution plan.',
              'The database was not working nicely so I did some fast code.',
              'There was a slow thing in data so I accelerated it.',
            ],
            correctIndex: 1,
            explanation: '"High query latency" and "indexing foreign keys" provide exact technical credibility.',
            rubricOrTips: ['State the specific technical symptom and the exact remediation.'],
          },
        },
        {
          id: 'topic-0-listening-assessment',
          title: 'Listening & Keyword Extraction Assessment',
          summary: 'Assess your ability to capture key requirements from rapid speech.',
          coreConcept: 'Listening requires filtering filler speech to extract the exact action item and SLA constraint.',
          whyItMatters: 'Misinterpreting a requirement leads to wasted sprint cycles and incorrect code.',
          lessonContent: {
            overview: 'Listen to/read a realistic engineering prompt and identify the explicit deadline and constraint.',
            keyPoints: [
              'Listen for modal words: MUST (mandatory) vs MAY (optional).',
              'Extract the 3 Ws: What is broken, Who owns it, When is it due.',
            ],
          },
          practice: {
            id: 'prac-0-listening',
            type: 'quiz',
            prompt: 'Brief: "We need the OAuth endpoint secured with rate limiting by 5 PM Thursday before staging deployment. Frontend styling can wait until Friday." What is the critical blocker?',
            options: [
              'Frontend styling for OAuth',
              'Rate limiting on OAuth endpoint before 5 PM Thursday',
              'Full database migration on Friday',
              'Staging server hardware replacement',
            ],
            correctIndex: 1,
            explanation: 'Rate limiting on the OAuth endpoint is the strict pre-condition due Thursday at 5 PM.',
            rubricOrTips: ['Distinguish between mandatory blockers and deferred polish tasks.'],
          },
        },
        {
          id: 'topic-0-tech-explanation-assessment',
          title: 'Technical Explanation Assessment',
          summary: 'Assess your ability to explain a technical concept clearly to both engineers and non-engineers.',
          coreConcept: 'Use the 5-step framework: Definition -> Mechanics -> Example -> Trade-off -> Summary.',
          whyItMatters: 'Senior engineers are evaluated on how cleanly they teach and communicate architectural concepts.',
          lessonContent: {
            overview: 'Explain an API (Application Programming Interface) in 60 seconds without using confusing jargon.',
            keyPoints: [
              'Start with a real-world analogy (restaurant menu / waiter).',
              'Transition to software mechanics (request, response, endpoints, JSON).',
              'Give a concrete example (weather app fetching data from a server).',
            ],
          },
          practice: {
            id: 'prac-0-tech-explain',
            type: 'speech',
            prompt: 'Explain what an API is in 60 seconds to someone with no computer science background.',
            targetDurationSeconds: 60,
            sampleAnswer: 'An API, or Application Programming Interface, is like a waiter in a restaurant. You, the customer, look at a menu and tell the waiter your order. The waiter goes to the kitchen, gets your food, and brings it back to your table. In software, an API allows two different apps to talk to each other—like your weather app asking a remote server for today temperature and displaying it on your screen.',
            rubricOrTips: [
              'Clear opening analogy.',
              'Smooth transition to software context.',
              'No confusing acronyms left unexplained.',
            ],
          },
        },
        {
          id: 'topic-0-interview-assessment',
          title: 'Interview Communication Assessment',
          summary: 'Assess your poise, structure, and answer conciseness for common interview questions.',
          coreConcept: 'Answers must follow a clear structure (Past -> Present -> Future or STAR) rather than wandering rambling.',
          whyItMatters: 'Interviewers form 80% of their impression within the first 2 minutes.',
          lessonContent: {
            overview: 'Review your elevator pitch and identify unnecessary background details that dilute your message.',
            keyPoints: [
              'Do not narrate your entire life story starting from school.',
              'Focus on recent projects, tech stack, and what value you bring.',
            ],
          },
          practice: {
            id: 'prac-0-interview',
            type: 'speech',
            prompt: 'Deliver your 60-second elevator pitch answering: "Why are you interested in software engineering?"',
            targetDurationSeconds: 60,
            sampleAnswer: 'I have always been fascinated by building tools that solve tangible problems. What draws me to software engineering is the ability to design an algorithm or backend service and see it immediately handle real user interactions. Over the past year, I have built full-stack applications and solved hundreds of data structure challenges. I want to bring this problem-solving mindset and passion for scalable engineering to a high-impact team.',
            rubricOrTips: [
              'Stayed under 60 seconds.',
              'Highlighted passion and concrete recent effort.',
              'Ended on forward-looking value proposition.',
            ],
          },
        },
        {
          id: 'topic-0-confidence-assessment',
          title: 'Confidence & Voice Assessment',
          summary: 'Assess your vocal projection, tone inflection, eye contact posture, and hesitation rate.',
          coreConcept: 'Confidence is conveyed through calm breathing, steady pace, and ending sentences with falling intonation rather than questioning tone.',
          whyItMatters: 'Even correct technical answers sound unconvincing if delivered with rising question tones or shaky volume.',
          lessonContent: {
            overview: 'Practice affirmative statement delivery and posture alignment.',
            keyPoints: [
              'Avoid uptalk (ending declarative statements like questions?).',
              'Keep your chin level and shoulders relaxed.',
              'Pause intentionally for 1 second instead of saying "like... um".',
            ],
          },
          practice: {
            id: 'prac-0-confidence',
            type: 'speech',
            prompt: 'Read this affirmative statement with strong, calm, assertive tone: "I am confident in my problem-solving ability, I communicate clearly with my team, and I continuously improve my engineering craft."',
            targetDurationSeconds: 20,
            sampleAnswer: 'I am confident in my problem-solving ability, I communicate clearly with my team, and I continuously improve my engineering craft.',
            rubricOrTips: [
              'Full vocal resonance.',
              'Definitive downward inflection at the end of each clause.',
              'Zero nervous giggles or hesitations.',
            ],
          },
        },
      ],
    },
  ],
};

// =========================================================================
// LEVEL 1: ENGLISH SPEAKING FOUNDATION (WEEKS 1–3)
// =========================================================================
export const LEVEL_1_FOUNDATION: CurriculumLevel = {
  id: 'level-1-foundation',
  levelNumber: 1,
  levelCode: 'LEVEL 1',
  title: 'English Speaking Foundation',
  weeks: 'Weeks 1–3',
  objective: 'Master clear sentence building, foundational tenses, everyday conversational competence, and eliminate common Telugu-to-English translation habits.',
  badge: 'Foundation Builder',
  iconName: 'Sparkles',
  modules: [
    {
      id: 'module-1-sentence-building',
      moduleNumber: 1,
      title: 'Sentence Building Fundamentals',
      description: 'Master core English word order: Subject + Verb + Object, questions, negations, and WH patterns.',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-1-1-svo',
          title: 'Subject + Verb + Object (SVO)',
          summary: 'The universal structural foundation of English sentences.',
          coreConcept: 'In English, the Subject ALWAYS comes first, followed by the Verb, then the Object (S-V-O), unlike Telugu where the verb is often placed at the very end.',
          whyItMatters: 'Telugu speakers often place verbs at the end of English sentences, creating disjointed phrasing.',
          lessonContent: {
            overview: 'Understand English sentence architecture and compare directly with regional language patterns.',
            keyPoints: [
              'Subject (Who/What does the action) -> Verb (The action) -> Object (The receiver).',
              'English: "I (S) write (V) Python code (O)."',
              'Avoid Telugu syntax direct translation: "I Python code write."',
            ],
            teluguPitfallNote: 'In Telugu: "Nenu Python nerchukunnanu" (I Python learned). In English: "I learned Python" (Verb must follow Subject directly).',
            dosAndDonts: [
              { do: 'I tested the API yesterday.', dont: 'I yesterday the API tested.', context: 'SVO word order' },
            ],
          },
          practice: {
            id: 'prac-1-1',
            type: 'rewrite',
            prompt: 'Rearrange into natural SVO English order: "The database query (O) optimized (V) the engineer (S)."',
            sampleAnswer: 'The engineer optimized the database query.',
            rubricOrTips: ['Place the actor (Subject) first, then action (Verb), then the target (Object).'],
          },
        },
        {
          id: 'topic-1-2-pos-neg',
          title: 'Positive & Negative Sentences',
          summary: 'Form clean affirmative and negated statements using auxiliary verbs (do not, does not, did not).',
          coreConcept: 'Negative sentences in present simple require "do not" (I/You/We/They) or "does not" (He/She/It) + base verb form.',
          whyItMatters: 'Saying "He not write code" or "I no understand" sounds unprofessional in workplace chats.',
          lessonContent: {
            overview: 'Master auxiliary negation across singular and plural engineering subjects.',
            keyPoints: [
              'I / You / We / They + DO NOT + base verb: "They do not maintain the legacy service."',
              'He / She / It + DOES NOT + base verb: "The script does not throw errors."',
              'Past: DID NOT + base verb: "I did not notice the typo."',
            ],
            teluguPitfallNote: 'Never say "I am not knowing". Say "I do not know."',
          },
          practice: {
            id: 'prac-1-2',
            type: 'quiz',
            prompt: 'Select the grammatically correct negative statement:',
            options: [
              'The server does not responds to health checks.',
              'The server does not respond to health checks.',
              'The server not responding to health checks yesterday.',
              'The server is not respond.',
            ],
            correctIndex: 1,
            explanation: '"Does not" must always be followed by the base form of the verb ("respond", not "responds").',
            rubricOrTips: ['Base verb follows "does not".'],
          },
        },
        {
          id: 'topic-1-3-questions-wh',
          title: 'Questions & WH Inversions',
          summary: 'Form yes/no questions and WH-questions (Who, What, Where, When, Why, How).',
          coreConcept: 'English questions require inverting the auxiliary verb before the subject: Auxiliary + Subject + Main Verb.',
          whyItMatters: 'Asking clear questions during requirements gathering prevents building the wrong feature.',
          lessonContent: {
            overview: 'Learn how to form questions naturally without relying on question intonation alone ("You are working?").',
            keyPoints: [
              'Yes/No: "Do you have the API credentials?" (Not: "You have credentials?")',
              'WH Questions: WH-Word + Auxiliary + Subject + Verb: "Why did the test fail?"',
            ],
            templatesOrPatterns: [
              { pattern: 'How does [System/Function] handle [Scenario]?', example: 'How does the gateway handle token expiry?', usageTip: 'System design discovery' },
              { pattern: 'When should we schedule [Meeting/Release]?', example: 'When should we schedule the sprint retrospective?', usageTip: 'Agile team alignment' },
            ],
          },
          practice: {
            id: 'prac-1-3',
            type: 'speech',
            prompt: 'Form three clear WH questions you would ask a client about their new mobile app requirements.',
            targetDurationSeconds: 45,
            sampleAnswer: '1. What are the primary user roles in this application? 2. When do you plan to launch the beta release? 3. How should the app handle offline data synchronization?',
            rubricOrTips: ['Used proper WH inversion.', 'Clear intonation.', 'No trailing question tags.'],
          },
        },
      ],
    },
    {
      id: 'module-2-essential-grammar',
      moduleNumber: 2,
      title: 'Essential Grammar for Tech Professionals',
      description: 'Master present simple, continuous, past, future, present perfect, and modal auxiliaries.',
      estimatedMinutes: 75,
      topics: [
        {
          id: 'topic-2-1-tenses-overview',
          title: 'Present Simple vs. Continuous vs. Perfect',
          summary: 'Understand which tense to use for routines, live tasks, and finished deliverables with present impact.',
          coreConcept: 'Present Simple = Habits/Truths; Present Continuous = Happening right now; Present Perfect = Finished action connected to now.',
          whyItMatters: 'Daily standup communication hinges on choosing the right tense for sprint updates.',
          lessonContent: {
            overview: 'Master the 3 core present tenses used in engineering teams.',
            keyPoints: [
              'Present Simple: "I write Python code daily." (Habit/Role)',
              'Present Continuous: "I am currently refactoring the auth middleware." (Happening right now in this sprint)',
              'Present Perfect: "I have deployed the patch and verified logs." (Finished, result is live now)',
            ],
            teluguPitfallNote: 'Do not use Present Continuous for static states: Say "I have two years of experience", NOT "I am having two years experience".',
          },
          practice: {
            id: 'prac-2-1',
            type: 'speech',
            prompt: 'Deliver a 45-second standup update using Present Simple (your role), Present Continuous (current task), and Present Perfect (completed fix).',
            targetDurationSeconds: 45,
            sampleAnswer: 'In our squad, I maintain the backend data ingestion pipelines. Right now, I am refactoring the event consumer to handle batch payloads. Earlier this morning, I have pushed the bug fix to staging and verified all integration tests.',
            rubricOrTips: ['Used all 3 tenses correctly.', 'Smooth transitions.', 'No "am having" errors.'],
          },
        },
        {
          id: 'topic-2-2-modals',
          title: 'Modal Verbs (Can, Could, Should, Would, Must, Might)',
          summary: 'Use modal auxiliaries for capability, polite requests, recommendations, and architectural certainty.',
          coreConcept: 'Modals modulate the strength and tone of your statements from polite suggestions to non-negotiable mandates.',
          whyItMatters: 'Sounding too aggressive ("You must change your code") damages teamwork; sounding too timid ("Maybe we can try") undermines authority.',
          lessonContent: {
            overview: 'Learn the exact nuance spectrum of modal verbs.',
            keyPoints: [
              'Could / Would: Polite requests & hypothetical scenarios ("Could you review this PR?", "Would that scale?")',
              'Should: Best practice recommendation ("We should add index constraints.")',
              'Must / Have to: Strict requirement ("We must comply with GDPR.")',
              'Might / May: Possibility ("This query might cause high CPU under peak traffic.")',
            ],
          },
          practice: {
            id: 'prac-2-2',
            type: 'quiz',
            prompt: 'Which sentence is the most professional way to suggest an alternative approach during a code review?',
            options: [
              'You must delete this and write it like me.',
              'Could we consider using a hash map here to reduce time complexity to O(N)?',
              'Why you wrote this bad loop?',
              'Maybe it is ok, maybe not.',
            ],
            correctIndex: 1,
            explanation: '"Could we consider using..." frames the optimization as a collaborative inquiry.',
            rubricOrTips: ['Use polite modal framing in reviews.'],
          },
        },
      ],
    },
    {
      id: 'module-3-everyday-english',
      moduleNumber: 3,
      title: 'Everyday English & Self-Expression',
      description: 'Introduce yourself, discuss your day, college background, technical interests, and ask for clarification.',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-3-1-introduce-yourself',
          title: 'Introducing Yourself Confidently',
          summary: 'A clean 4-part structure for professional self-introductions.',
          coreConcept: 'Name + Current Role/Study + Flagship Specialization + Goal.',
          whyItMatters: 'Every meeting, interview, and networking event starts with a self-introduction.',
          lessonContent: {
            overview: 'Structure your introduction to sound focused, articulate, and engineering-driven.',
            keyPoints: [
              'Start strong: "Hi, I am Swamy..." (Avoid: "Myself Swamy").',
              'State your technical domain: "I specialize in backend engineering and distributed systems."',
              'Highlight recent achievement: "Recently, I developed a full-stack placement portal with real-time analytics."',
            ],
            teluguPitfallNote: 'Never start with "Myself [Name]". Always say "I am [Name]" or "My name is [Name]".',
          },
          practice: {
            id: 'prac-3-1',
            type: 'speech',
            prompt: 'Deliver your complete 60-second professional self-introduction.',
            targetDurationSeconds: 60,
            sampleAnswer: 'Hi everyone, my name is Swamy. I am a software engineer with a strong focus on backend architecture, Python development, and algorithmic problem solving. Over the past year, I have built production-ready applications, optimized database query pipelines, and solved over two hundred algorithmic challenges. I am passionate about clean code, scalable system design, and continuous learning.',
            rubricOrTips: ['Clear greeting.', 'No "myself" habit.', 'Fluent delivery under 60 seconds.'],
          },
        },
        {
          id: 'topic-3-2-asking-clarification',
          title: 'Asking for Clarification Professionally',
          summary: 'Phrases to clarify audio issues, ambiguous requirements, or fast speech without sounding unconfident.',
          coreConcept: 'Asking for clarification is a sign of engineering diligence, not weakness.',
          whyItMatters: 'Guessing when you did not hear properly leads to building the wrong solution.',
          lessonContent: {
            overview: 'Replace blunt phrases like "What?" or "I don not understand" with executive clarification phrases.',
            keyPoints: [
              'Never pretend you understood when you did not; asking targeted clarification saves hours of wrong work.',
              'Mirror the speaker keyword to prove active listening before asking your question.',
              'Use polite modals like "Could you clarify...", "Would you mind repeating...", or "Just to confirm...".',
            ],
            templatesOrPatterns: [
              { pattern: 'Could you please clarify [Specific Point]?', example: 'Could you please clarify the target SLA for the webhook response?', usageTip: 'Requirements' },
              { pattern: 'Just to confirm, are we prioritizing [Option A] over [Option B]?', example: 'Just to confirm, are we prioritizing lower latency over zero-downtime deployment?', usageTip: 'Trade-off validation' },
              { pattern: 'I missed the last sentence due to audio lag, could you repeat that?', example: 'I missed the last metric, could you please repeat the throughput target?', usageTip: 'Network glitch' },
            ],
          },
          practice: {
            id: 'prac-3-2',
            type: 'speech',
            prompt: 'Practice asking for clarification when a product manager speaks too fast about a database migration deadline.',
            targetDurationSeconds: 30,
            sampleAnswer: 'Thanks for the overview, Sarah. Just to make sure we are aligned on the timeline, could you please confirm whether the database migration must be completed before or after the staging regression run?',
            rubricOrTips: ['Calm tone.', 'Specific question.', 'Professional phrasing.'],
          },
        },
      ],
    },
    {
      id: 'module-4-common-mistakes',
      moduleNumber: 4,
      title: 'Eliminating Common ESL & Telugu-to-English Habits',
      description: 'Fix subject-verb agreement, missing articles, wrong prepositions, and direct translation patterns.',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-4-1-telugu-pitfalls',
          title: 'Direct Telugu-to-English Translation Pitfalls',
          summary: 'Correct the top 8 direct translation errors common among South Indian engineering graduates.',
          coreConcept: 'English uses prepositions and articles differently from Telugu agglutinative suffixes.',
          whyItMatters: 'Fixing these specific habits instantly elevates your communication to professional standards.',
          lessonContent: {
            overview: 'Direct comparison table of common regional translation habits and their clean English equivalents.',
            keyPoints: [
              'Habit: "I am having a doubt." -> Fix: "I have a question."',
              'Habit: "Tell me one thing..." -> Fix: "Could you clarify something?"',
              'Habit: "He told like that only." -> Fix: "He mentioned that earlier."',
              'Habit: "I am staying in hostel." -> Fix: "I live in the hostel."',
              'Habit: "Open the lights / Close the fan." -> Fix: "Turn on the lights / Turn off the fan."',
              'Habit: "Today morning I came." -> Fix: "I arrived this morning."',
              'Habit: "Revert back." -> Fix: "Reply" or "Respond" (Revert means return to a previous state).',
            ],
          },
          practice: {
            id: 'prac-4-1',
            type: 'quiz',
            prompt: 'Which phrase is the professional English replacement for "I am having a small doubt regarding this requirement"?',
            options: [
              'I am having one doubt on this.',
              'I have a question regarding this requirement.',
              'Doubt is there in my mind.',
              'I will ask one small doubt.',
            ],
            correctIndex: 1,
            explanation: 'In corporate English, use "I have a question" rather than "I have a doubt".',
            rubricOrTips: ['Replace "doubt" with "question".'],
          },
        },
      ],
    },
  ],
};

// =========================================================================
// LEVEL 2: THINKING IN ENGLISH (WEEKS 4–6)
// =========================================================================
export const LEVEL_2_THINKING: CurriculumLevel = {
  id: 'level-2-thinking',
  levelNumber: 2,
  levelCode: 'LEVEL 2',
  title: 'Thinking in English',
  weeks: 'Weeks 4–6',
  objective: 'Eliminate internal translation delay from Telugu to English, cultivate continuous internal English narration, and internalize natural conversational sentence patterns.',
  badge: 'Direct Fluency',
  iconName: 'Brain',
  modules: [
    {
      id: 'module-5-english-thinking',
      moduleNumber: 5,
      title: 'Direct English Thought Formation',
      description: 'Practice describing your environment, internal monologue in English, and eliminating mental translation buffers.',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-5-1-internal-monologue',
          title: 'Internal English Narration & Thought Streaming',
          summary: 'Form thoughts directly in English by narrating your actions and environment throughout the day.',
          coreConcept: 'Fluency occurs when English words attach directly to visual concepts rather than translating through native language first.',
          whyItMatters: 'Translating in your head causes a 2-3 second hesitation pause before every sentence.',
          lessonContent: {
            overview: 'Practice the 3-level thinking exercise: Naming objects -> Describing actions -> Expressing opinions.',
            keyPoints: [
              'Level 1: Label objects in your room directly in English (monitor, keyboard, compiler, terminal).',
              'Level 2: Narrate what you are doing in real time ("I am opening VS Code, creating a virtual environment...").',
              'Level 3: Articulate why you made a choice ("I chose a set instead of a list because I need O(1) lookups.").',
            ],
          },
          practice: {
            id: 'prac-5-1',
            type: 'speech',
            prompt: 'Narrate what you are doing right now on your computer for 60 seconds without translating from Telugu.',
            targetDurationSeconds: 60,
            sampleAnswer: 'Right now, I am sitting at my desk reviewing my learning roadmap. I have my browser open on LevelUpDev, and I am practicing technical English. In my editor, I have a Python project with test files. My goal today is to complete this communication module and then solve two algorithm problems.',
            rubricOrTips: ['Continuous stream of speech.', 'Zero Telugu translation pauses.'],
          },
        },
      ],
    },
    {
      id: 'module-6-sentence-patterns',
      moduleNumber: 6,
      title: 'Natural Sentence Connectors & Opinion Patterns',
      description: 'Master conversational connectors: I think, In my opinion, From my experience, The main reason is, As a result.',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-6-1-connectors',
          title: 'Top 10 Conversational & Analytical Connectors',
          summary: 'Sentence starters that give your brain 1 second of thinking time while sounding articulate.',
          coreConcept: 'Using professional connectors bridges the gap between thoughts smoothly.',
          whyItMatters: 'Connectors eliminate awkward silence while you formulate complex technical arguments.',
          lessonContent: {
            overview: 'Study and practice the 10 core connectors used in technical discussions.',
            keyPoints: [
              'Connectors act as neurological stepping stones, reducing vocalized pauses like "umm" and "like".',
              'Use causal connectors ("The main reason is...", "Consequently...") to establish authority in architectural debates.',
              'Use nuance connectors ("What I mean is...", "Specifically...") to refine technical precision.',
            ],
            templatesOrPatterns: [
              { pattern: 'From my experience with [Technology]...', example: 'From my experience with PostgreSQL, indexing JSONB columns yields massive speedups.', usageTip: 'Sharing background' },
              { pattern: 'The main reason is that [Causation]...', example: 'The main reason is that Redis keeps all data in memory, avoiding disk I/O.', usageTip: 'Explaining causality' },
              { pattern: 'As a result, [Outcome]...', example: 'As a result, our API response time dropped from 300ms to 45ms.', usageTip: 'Stating metrics' },
              { pattern: 'What I mean is that [Clarification]...', example: 'What I mean is that we should decouple the auth service first.', usageTip: 'Nuanced refinement' },
            ],
          },
          practice: {
            id: 'prac-6-1',
            type: 'speech',
            prompt: 'Explain why automated unit tests are essential using at least three connectors: "From my experience", "The main reason is", and "As a result".',
            targetDurationSeconds: 60,
            sampleAnswer: 'From my experience, writing automated unit tests saves substantial engineering time during refactoring. The main reason is that tests immediately catch regressions before code reaches staging. As a result, our team can ship features with high confidence and minimal production bugs.',
            rubricOrTips: ['Used all 3 connectors naturally.', 'Strong technical conviction.'],
          },
        },
      ],
    },
    {
      id: 'module-7-conversation-practice',
      moduleNumber: 7,
      title: 'Conversational Agility & Polite Disagreement',
      description: 'Start conversations, maintain rapport, ask follow-up questions, agree warmly, and disagree diplomatically.',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-7-1-polite-disagreement',
          title: 'Diplomatic Disagreement in Technical Reviews',
          summary: 'How to disagree with a teammate or manager without sounding confrontational or disrespectful.',
          coreConcept: 'Acknowledge the other person perspective first, state the technical constraint, and propose a collaborative alternative.',
          whyItMatters: 'Software engineering is highly collaborative; abrasive disagreement destroys team trust.',
          lessonContent: {
            overview: 'The 3-Step Disagreement Formula: Validate -> Pivot -> Offer Solution.',
            keyPoints: [
              'Step 1 (Validate): "I see your perspective on speed..."',
              'Step 2 (Pivot with constraint): "However, my concern is data integrity..."',
              'Step 3 (Offer alternative): "What if we run an asynchronous background job instead?"',
            ],
            templatesOrPatterns: [
              { pattern: 'I understand your point regarding [X], however my concern is [Y]. What if we [Z]?', example: 'I understand your point regarding fast delivery; however, my concern is that skipping database migrations will corrupt user state. What if we run an automated migration script during off-peak hours?', usageTip: 'High-impact diplomacy' },
            ],
          },
          practice: {
            id: 'prac-7-1',
            type: 'speech',
            prompt: 'Practice politely disagreeing with a colleague who wants to disable input validation to speed up testing.',
            targetDurationSeconds: 45,
            sampleAnswer: 'I understand why you want to disable validation to speed up test execution. However, my concern is that tests running without validation might mask critical security edge cases. What if we create a mock helper that generates pre-validated dummy objects instead?',
            rubricOrTips: ['Validated intent.', 'Explained risk.', 'Offered constructive alternative.'],
          },
        },
      ],
    },
  ],
};

// =========================================================================
// LEVEL 3: VOCABULARY EXPANSION (WEEKS 4–8)
// =========================================================================
export const LEVEL_3_VOCABULARY: CurriculumLevel = {
  id: 'level-3-vocabulary',
  levelNumber: 3,
  levelCode: 'LEVEL 3',
  title: 'Vocabulary & Professional Word Choice',
  weeks: 'Weeks 4–8',
  objective: 'Transition from basic colloquial words to precise technical and corporate vocabulary used in high-growth software and AI companies.',
  badge: 'Vocabulary Master',
  iconName: 'BookOpen',
  modules: [
    {
      id: 'module-8-everyday-vocab',
      moduleNumber: 8,
      title: 'Everyday Life & Campus Vocabulary',
      description: 'Fluency terms for college, hostel, travel, food, friends, emotions, and personal aspirations.',
      estimatedMinutes: 45,
      topics: [
        {
          id: 'topic-8-1-campus-life',
          title: 'College & Daily Life Expressions',
          summary: 'Natural expressions for campus projects, hostel life, exam preparation, and collaborative study.',
          coreConcept: 'Expressing personal experiences with rich descriptive adjectives rather than repetitive "good" or "bad".',
          whyItMatters: 'Warm-up small talk during interviews often revolves around your college background and hobbies.',
          lessonContent: {
            overview: 'Learn natural conversational collocations for daily life.',
            keyPoints: [
              'Replace "I studied hard" with "I dedicated focused study blocks to algorithms."',
              'Replace "My hostel is far" with "I commute daily from campus accommodations."',
              'Replace "I am doing project" with "I am actively collaborating on a capstone project."',
            ],
          },
          practice: {
            id: 'prac-8-1',
            type: 'speech',
            prompt: 'Describe a typical productive day in your college routine in 60 seconds.',
            targetDurationSeconds: 60,
            sampleAnswer: 'A typical productive day starts early with a morning coding session where I tackle one algorithmic problem. After my lectures, I head to the computer lab to work on our team capstone project. In the evening, I review technical concepts, read engineering articles, and practice English communication.',
            rubricOrTips: ['Rich vocabulary.', 'Natural flow.'],
          },
        },
      ],
    },
    {
      id: 'module-9-professional-vocab',
      moduleNumber: 9,
      title: 'Professional Corporate Vocabulary',
      description: 'Master 15 foundational corporate nouns and verbs: task, requirement, bottleneck, approach, contribution, priority.',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-9-1-core-corporate-terms',
          title: '15 High-Yield Corporate Action Terms',
          summary: 'The standard terminology used in agile sprints, performance reviews, and team standups.',
          coreConcept: 'Corporate vocabulary provides precise shorthand for project stages and challenges.',
          whyItMatters: 'Using words like "bottleneck", "trade-off", and "deliverable" demonstrates industry readiness.',
          lessonContent: {
            overview: 'Study definitions and sample sentence usages for the 15 core corporate terms.',
            keyPoints: [
              'Requirement: A documented need or feature specification.',
              'Bottleneck: A point of congestion that impedes system throughput.',
              'Approach: The specific method or strategy chosen to solve a problem.',
              'Contribution: Your specific individual impact on a team project.',
              'Priority: The relative urgency or importance of a deliverable.',
              'Feedback: Constructive input to improve code or performance.',
            ],
          },
          practice: {
            id: 'prac-9-1',
            type: 'quiz',
            prompt: 'Which word best fills the blank: "The memory leak in the image processor created a severe __________ in our rendering pipeline."?',
            options: ['bottleneck', 'feedback', 'contribution', 'deadline'],
            correctIndex: 0,
            explanation: '"Bottleneck" specifically describes a constraint that throttles overall throughput.',
            rubricOrTips: ['Select the term representing congestion.'],
          },
        },
      ],
    },
    {
      id: 'module-10-technical-vocab',
      moduleNumber: 10,
      title: 'Technical & Engineering Vocabulary',
      description: 'Master core technical nouns: algorithm, architecture, database, deployment, debugging, scalability, latency.',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-10-1-tech-lexicon',
          title: 'Core System & Software Architecture Terms',
          summary: 'Precision terminology for distributed computing, databases, and DevOps.',
          coreConcept: 'Distinguish clearly between related technical concepts (e.g. Scalability vs Performance, Authentication vs Authorization).',
          whyItMatters: 'Precision distinguishes junior candidates from mature engineers.',
          lessonContent: {
            overview: 'Explore key technical vocabulary pairings with concrete definitions.',
            keyPoints: [
              'Scalability: The ability of a system to handle increased load without proportional increase in cost.',
              'Latency: The time delay between a client request and the server response.',
              'Throughput: The number of requests processed per unit of time (e.g. 5,000 QPS).',
              'Idempotency: An operation that produces the same result even if executed multiple times.',
            ],
          },
          practice: {
            id: 'prac-10-1',
            type: 'speech',
            prompt: 'Explain the difference between Latency and Throughput in 45 seconds using an everyday analogy.',
            targetDurationSeconds: 45,
            sampleAnswer: 'Latency is how long it takes for a single car to travel from point A to point B on a highway—representing response time. Throughput is how many total cars can cross the highway per hour—representing system capacity. A system can have low latency for individual requests while still reaching max throughput under heavy traffic.',
            rubricOrTips: ['Clear analogy.', 'Clean distinction.', 'Fluent pacing.'],
          },
        },
      ],
    },
    {
      id: 'module-11-professional-alternatives',
      moduleNumber: 11,
      title: 'Professional Alternatives & Upgrades',
      description: 'Replace simplistic phrases with polished engineering equivalents.',
      estimatedMinutes: 60,
      topics: [
        {
          id: 'topic-11-1-phrase-upgrades',
          title: 'Top 10 Executive Phrase Upgrades',
          summary: 'Instant phrase upgrades that make you sound experienced and articulate.',
          coreConcept: 'Upgrade passive and weak phrasing into active, confident professional language.',
          whyItMatters: 'Transforms how recruiters and senior leads perceive your capability.',
          lessonContent: {
            overview: 'Direct transformation table of basic phrases into high-impact professional alternatives.',
            keyPoints: [
              '"I did it" -> "I implemented the solution."',
              '"I know Python" -> "I am proficient in Python."',
              '"There is a problem" -> "I identified an issue in the auth flow."',
              '"I don not know" -> "I am not familiar with that specific tool yet, but I can ramp up quickly."',
              '"I think maybe" -> "I believe the optimal approach is..."',
              '"It is fast" -> "It achieves sub-50ms latency with O(1) lookups."',
            ],
          },
          practice: {
            id: 'prac-11-1',
            type: 'quiz',
            prompt: 'How should you answer in an interview if asked about a technology you have never used (e.g. GraphQL)?',
            options: [
              'I don not know anything about GraphQL.',
              'While I have not used GraphQL in production yet, I am deeply familiar with REST APIs and can ramp up on GraphQL schemas quickly.',
              'Why are you asking GraphQL? I only know REST.',
              'No, sorry.',
            ],
            correctIndex: 1,
            explanation: 'Acknowledges current baseline, anchors to relevant adjacent knowledge (REST), and demonstrates rapid learning agility.',
            rubricOrTips: ['Anchor to adjacent knowledge and highlight ramp-up agility.'],
          },
        },
      ],
    },
  ],
};
