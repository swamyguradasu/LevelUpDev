export interface DailyPillarGrammar {
  title: string;
  ruleSummary: string;
  learnContent: {
    rule: string;
    examples: Array<{ correct: string; incorrect: string; explanation: string }>;
    teluguPitfallNote?: string;
  };
  practiceQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface DailyPillarVocabulary {
  title: string;
  words: Array<{
    term: string;
    phonetic: string;
    partOfSpeech: string;
    definition: string;
    corporateContext: string;
    sampleSentence: string;
    professionalUpgrade?: { amateur: string; executive: string };
  }>;
  practiceDrill: {
    prompt: string;
    fillInBlankSentence: string;
    missingWord: string;
    hint: string;
  };
}

export interface DailyPillarSpeaking {
  title: string;
  prompt: string;
  category: string;
  targetDurationSeconds: number;
  preparationSeconds: number;
  rubric: string[];
  tips: string[];
  sampleAudioTranscript: string;
}

export interface DailyPillarListeningShadowing {
  title: string;
  scenario: string;
  audioTranscript: string;
  speakerRole: string;
  speedCategory: 'Normal (1.0x)' | 'Fast Corporate (1.2x)' | 'Technical Interview (1.0x)';
  keyPhrasesToShadow: string[];
  comprehensionQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface DailyPillarTechnicalComm {
  title: string;
  topic: string;
  formulaStep: string; // e.g. "Definition -> Explanation -> Example -> Use Case -> Conclusion"
  prompt: string;
  frameworkSteps: Array<{ stepName: string; content: string }>;
  sampleResponse: string;
  commonPitfallsToAvoid: string[];
}

export interface DailyPillarProfessionalInterview {
  title: string;
  type: 'interview' | 'meeting' | 'standup' | 'email_memo' | 'conflict_resolution';
  prompt: string;
  methodology: string; // e.g. "STAR Method" or "PREP Framework" or "3-Step Diplomatic Pivot"
  guidedTemplate: string;
  sampleExecutiveResponse: string;
  proTips: string[];
}

export interface DailyTrainingPlan {
  dayNumber: number;
  levelId: string;
  levelTitle: string;
  weekNumber: number;
  title: string;
  objective: string;
  estimatedMinutes: number;
  pillars: {
    grammar: DailyPillarGrammar;
    vocabulary: DailyPillarVocabulary;
    speaking: DailyPillarSpeaking;
    listeningShadowing: DailyPillarListeningShadowing;
    technicalComm: DailyPillarTechnicalComm;
    professionalInterview: DailyPillarProfessionalInterview;
  };
}

export const DAILY_TRAINING_PLANS: DailyTrainingPlan[] = [
  // =========================================================================
  // WEEK 1: FOUNDATIONS & SENTENCE ACCURACY (LEVEL 1)
  // =========================================================================
  {
    dayNumber: 1,
    levelId: 'level-1-speaking-foundation',
    levelTitle: 'Level 1: English Speaking Foundation',
    weekNumber: 1,
    title: 'Day 1: Subject-Verb-Object Precision & Impromptu Introductions',
    objective: 'Master direct Subject-Verb-Object sentence construction, eliminate the "Myself Swamy" regional habit, and deliver a clean 60-second professional elevator pitch.',
    estimatedMinutes: 75,
    pillars: {
      grammar: {
        title: 'Subject + Verb + Object (SVO) Rule',
        ruleSummary: 'English requires S-V-O word order. Avoid verb-at-end Telugu translation patterns.',
        learnContent: {
          rule: 'Every English declarative sentence begins with a clear Subject, followed immediately by the Action/Verb, and then the Object or modifier.',
          examples: [
            {
              incorrect: 'I yesterday Python script ran.',
              correct: 'I ran the Python script yesterday.',
              explanation: 'In English, the verb (ran) must precede the object (the Python script), with the time adverb (yesterday) at the end.',
            },
            {
              incorrect: 'Myself Swamy, I am working in frontend.',
              correct: 'My name is Swamy, and I work on frontend architecture.',
              explanation: '"Myself" is a reflexive pronoun and cannot be the subject of an introductory sentence.',
            },
          ],
          teluguPitfallNote: 'In Telugu, the verb is naturally placed at the very end ("Nenu ninna code rasanu"). When speaking English, consciously force the verb right after "I".',
        },
        practiceQuiz: {
          question: 'Which of the following sentences adheres to correct English SVO syntax?',
          options: [
            'We tomorrow morning the database migration will deploy.',
            'We will deploy the database migration tomorrow morning.',
            'The database migration we tomorrow will deploy.',
            'Deploying tomorrow morning the database migration we will do.',
          ],
          correctIndex: 1,
          explanation: 'Subject ("We") + Verb ("will deploy") + Object ("the database migration") + Time modifier ("tomorrow morning").',
        },
      },
      vocabulary: {
        title: 'Daily Action Verbs & Upgrades',
        words: [
          {
            term: 'Implement',
            phonetic: '/ˈɪm.plə.ment/',
            partOfSpeech: 'verb',
            definition: 'To put a decision, plan, or piece of code into effect.',
            corporateContext: 'Used to replace amateur "I did" or "I made".',
            sampleSentence: 'I implemented a token-based authentication mechanism using JWT.',
            professionalUpgrade: { amateur: 'I did the login feature', executive: 'I implemented the authentication flow' },
          },
          {
            term: 'Requirement',
            phonetic: '/rɪˈkwaɪər.mənt/',
            partOfSpeech: 'noun',
            definition: 'A documented specification of what a system or feature must accomplish.',
            corporateContext: 'Used in standups and sprint planning.',
            sampleSentence: 'The product manager clarified the latency requirements for the search API.',
            professionalUpgrade: { amateur: 'They told me to build this', executive: 'According to the client requirement' },
          },
          {
            term: 'Investigate',
            phonetic: '/ɪnˈves.tɪ.ɡeɪt/',
            partOfSpeech: 'verb',
            definition: 'To carry out a systematic or formal inquiry to discover facts or root causes.',
            corporateContext: 'Used when triaging bug reports or performance bottlenecks.',
            sampleSentence: 'I investigated the high memory consumption in the background worker.',
            professionalUpgrade: { amateur: 'I checked the bug', executive: 'I investigated the root cause of the regression' },
          },
        ],
        practiceDrill: {
          prompt: 'Fill in the blank with the most professional executive verb:',
          fillInBlankSentence: 'After the deployment alert triggered, our team immediately _____ the spike in API latency.',
          missingWord: 'investigated',
          hint: 'Begins with "invest..." and means to thoroughly research the root cause.',
        },
      },
      speaking: {
        title: '60-Second Executive Self-Introduction',
        prompt: 'Introduce yourself in exactly 60 seconds without using "Myself [Name]" or filler words ("umm", "basically"). Highlight your name, core technical stack, and recent project contribution.',
        category: 'Self-Introduction',
        targetDurationSeconds: 60,
        preparationSeconds: 15,
        rubric: [
          'Opened with "Hi everyone, my name is..." instead of "Myself...".',
          'Clearly highlighted technical stack (e.g. Python, Next.js, PostgreSQL).',
          'Maintained steady pacing between 120-140 words per minute.',
          'Zero instances of "basically" or "actually".',
        ],
        tips: [
          'Take a slow breath before starting.',
          'Pause silently for 1 second between ideas instead of saying "umm".',
          'End cleanly on a strong note rather than trailing off.',
        ],
        sampleAudioTranscript: 'Hello everyone, my name is Swamy. I am a software engineer specializing in backend systems, Python architecture, and scalable web applications. Over the past year, I have built production-ready platforms, optimized query pipelines, and solved over two hundred algorithmic challenges. I look forward to collaborating and delivering high-impact solutions.',
      },
      listeningShadowing: {
        title: 'Morning Standup Status Brief',
        scenario: 'A lead engineer gives a crisp 30-second standup status update in an agile scrum meeting.',
        speakerRole: 'Engineering Team Lead',
        speedCategory: 'Normal (1.0x)',
        audioTranscript: 'Good morning team. Yesterday I completed the database indexing optimization, which reduced search latency by thirty-five percent. Today, I am investigating the webhook retry logic and will sync with DevOps this afternoon. I have no blockers currently.',
        keyPhrasesToShadow: [
          'Yesterday I completed the database indexing optimization...',
          'which reduced search latency by thirty-five percent.',
          'Today, I am investigating the webhook retry logic...',
          'I have no blockers currently.',
        ],
        comprehensionQuestion: {
          question: 'What is the speaker working on today?',
          options: [
            'Database indexing optimization',
            'Webhook retry logic investigation',
            'DevOps regression testing',
            'Frontend search latency UI',
          ],
          correctIndex: 1,
          explanation: 'The speaker clearly stated: "Today, I am investigating the webhook retry logic".',
        },
      },
      technicalComm: {
        title: 'Explaining an API Endpoint (5-Step Formula)',
        topic: 'REST API Endpoint Definition',
        formulaStep: 'Definition -> Explanation -> Example -> Use Case -> Conclusion',
        prompt: 'Explain what a REST API endpoint is using the 5-step technical explanation formula.',
        frameworkSteps: [
          { stepName: '1. Definition', content: 'A REST API endpoint is a specific URL location through which an application accesses server resources.' },
          { stepName: '2. Explanation', content: 'It acts as the communication interface where clients send HTTP requests like GET, POST, or DELETE, and receive structured JSON responses.' },
          { stepName: '3. Example', content: 'For example, sending a GET request to `/api/v1/users/42` retrieves the profile data of user forty-two.' },
          { stepName: '4. Use Case', content: 'In our architecture, endpoints decouple the React frontend from the database layer, allowing independent scaling.' },
          { stepName: '5. Conclusion', content: 'In conclusion, well-designed endpoints provide clear, predictable contracts for distributed systems.' },
        ],
        sampleResponse: 'A REST API endpoint is a specific URL that allows client applications to interact with backend resources. It operates by listening for standardized HTTP methods such as GET or POST. For instance, `/api/v1/projects` returns a list of active repositories. This separation allows our frontend to remain agile while ensuring backend data integrity. To summarize, endpoints form the foundational contract of modern web architectures.',
        commonPitfallsToAvoid: [
          'Do not dive into technical jargon before giving a simple 1-sentence definition.',
          'Avoid vague phrases like "It is a thing that connects stuff".',
        ],
      },
      professionalInterview: {
        title: 'Daily Standup Update (Past - Present - Blockers)',
        type: 'standup',
        prompt: 'Deliver your daily standup update covering: (1) What you completed yesterday, (2) What you will do today, and (3) Any blockers.',
        methodology: '3-Part Standup Format: Yesterday -> Today -> Blockers',
        guidedTemplate: 'Yesterday I [Completed action + Metric]. Today I am [Current focus]. Currently, I have [Zero blockers / One dependency on Team X].',
        sampleExecutiveResponse: 'Good morning everyone. Yesterday, I completed the JWT authentication middleware and wrote unit test suites for all route handlers. Today, I am integrating the user profile endpoints with Firestore. I currently have no blockers and expect to have a PR ready for review by three PM.',
        proTips: [
          'Be concise; standup updates should take under 45 seconds.',
          'Mention business impact or completed tests rather than just "I wrote code".',
        ],
      },
    },
  },

  // =========================================================================
  // DAY 2: ESSENTIAL TENSES & VOCABULARY UPGRADES
  // =========================================================================
  {
    dayNumber: 2,
    levelId: 'level-1-speaking-foundation',
    levelTitle: 'Level 1: English Speaking Foundation',
    weekNumber: 1,
    title: 'Day 2: Past vs. Present Continuous & Problem Description',
    objective: 'Distinguish clearly between completed past actions and ongoing tasks, eliminate "I am having a doubt", and articulate technical bugs with precision.',
    estimatedMinutes: 75,
    pillars: {
      grammar: {
        title: 'Past Simple vs. Present Continuous in Standups',
        ruleSummary: 'Use Past Simple for finished sprint tasks; use Present Continuous for tasks in active progress right now.',
        learnContent: {
          rule: 'Use Past Simple (Subject + Verb-2) for completed milestones. Use Present Continuous (Subject + am/is/are + Verb-ing) for work currently underway.',
          examples: [
            {
              incorrect: 'Yesterday I am deploying the staging server.',
              correct: 'Yesterday I deployed the staging server.',
              explanation: 'Yesterday is a completed past time window, requiring simple past "deployed".',
            },
            {
              incorrect: 'I am having a doubt in this function.',
              correct: 'I have a question regarding this function.',
              explanation: '"Have" as possession or cognitive state is a stative verb and is rarely used in continuous "-ing" form.',
            },
          ],
          teluguPitfallNote: 'Do not say "I am having doubt" (direct translation of "Naaku doubt undi"). Use "I have a question regarding..." or "Could you clarify...".',
        },
        practiceQuiz: {
          question: 'Select the grammatically correct standup statement:',
          options: [
            'Yesterday I resolved the merge conflict, and today I am writing automated tests.',
            'Yesterday I was resolving the merge conflict and today I wrote automated tests.',
            'Yesterday I have resolved the conflict and today I write automated tests.',
            'Yesterday I am resolving the conflict and today I am writing automated tests.',
          ],
          correctIndex: 0,
          explanation: '"Yesterday I resolved" (Past Simple for completed) + "today I am writing" (Present Continuous for active work).',
        },
      },
      vocabulary: {
        title: 'Engineering Problem & Solution Collocations',
        words: [
          {
            term: 'Bottleneck',
            phonetic: '/ˈbɒt.əl.nek/',
            partOfSpeech: 'noun',
            definition: 'A point of congestion in a system that stops or slows progress.',
            corporateContext: 'Used when discussing database queries, network latency, or team bandwidth.',
            sampleSentence: 'Unindexed SQL queries are causing a severe performance bottleneck during peak traffic.',
            professionalUpgrade: { amateur: 'The system is slow here', executive: 'We identified a performance bottleneck in query execution' },
          },
          {
            term: 'Mitigate',
            phonetic: '/ˈmɪt.ɪ.ɡeɪt/',
            partOfSpeech: 'verb',
            definition: 'To make something less severe, harmful, or painful.',
            corporateContext: 'Used when discussing risk management and fallback strategies.',
            sampleSentence: 'We implemented caching to mitigate the risk of database overload.',
            professionalUpgrade: { amateur: 'We made the problem less', executive: 'We mitigated the latency risk by caching results' },
          },
          {
            term: 'Scalability',
            phonetic: '/ˌskeɪ.ləˈbɪl.ə.ti/',
            partOfSpeech: 'noun',
            definition: 'The capability of a system to handle a growing amount of work by adding resources.',
            corporateContext: 'Used in architecture design reviews.',
            sampleSentence: 'Stateless microservices enhance horizontal scalability.',
            professionalUpgrade: { amateur: 'It can handle many users', executive: 'The architecture ensures seamless horizontal scalability' },
          },
        ],
        practiceDrill: {
          prompt: 'Choose the correct technical term to complete the sentence:',
          fillInBlankSentence: 'To prevent service crashes on Black Friday, the engineering team added Redis caching to _____ database load.',
          missingWord: 'mitigate',
          hint: 'Begins with "mit..." and means to lessen the severity of a risk.',
        },
      },
      speaking: {
        title: 'Two-Minute Continuous Speaking: Your Favorite Tech Stack',
        prompt: 'Speak continuously for 120 seconds explaining why you chose your primary programming language or tech stack. Rule: Do not pause for more than 2 seconds; prioritize flow over absolute perfection.',
        category: 'Technical Passion & Fluency',
        targetDurationSeconds: 120,
        preparationSeconds: 20,
        rubric: [
          'Spoke continuously without breaking rhythm for at least 100 seconds.',
          'Explained 2-3 specific technical advantages (e.g. typing, ecosystem, concurrency).',
          'Used natural transition phrases ("Furthermore", "In addition", "For instance").',
          'Maintained enthusiastic and confident vocal resonance.',
        ],
        tips: [
          'If you make a minor grammatical slip, do not stop or restart; keep driving your argument forward.',
          'Use hand gestures while speaking to keep your natural speech tempo steady.',
        ],
        sampleAudioTranscript: 'I primary focus on Python and Next.js because this combination delivers both development velocity and architectural robustess. In the backend, Python offers an extensive ecosystem for algorithmic processing, API development via FastAPI, and seamless machine learning integrations. The syntax is clean and readable, which facilitates maintainability in team environments. On the frontend, Next.js provides server-side rendering and static optimization, ensuring sub-second page loads. Overall, this stack allows me to transform complex architectural ideas into scalable software efficiently.',
      },
      listeningShadowing: {
        title: 'Bug Triage Discussion',
        scenario: 'A senior QA engineer explains an edge case error discovered during staging regression testing.',
        speakerRole: 'Senior QA Engineer',
        speedCategory: 'Fast Corporate (1.2x)',
        audioTranscript: 'During our regression suite run on build two-forty, we noticed that when users submit the payment form with special characters, the validation layer throws an unhandled null pointer exception. We need to sanitize the payload before passing it to the billing service.',
        keyPhrasesToShadow: [
          'During our regression suite run on build two-forty...',
          'the validation layer throws an unhandled null pointer exception.',
          'We need to sanitize the payload before passing it to the billing service.',
        ],
        comprehensionQuestion: {
          question: 'What triggers the null pointer exception?',
          options: [
            'Submitting payment forms with special characters',
            'Exceeding server memory limits on build 240',
            'Network timeout in the billing service',
            'Missing database credentials in staging',
          ],
          correctIndex: 0,
          explanation: 'The QA engineer stated: "when users submit the payment form with special characters, the validation layer throws an unhandled null pointer exception".',
        },
      },
      technicalComm: {
        title: 'Explaining a Bug Root Cause & Resolution',
        topic: 'Memory Leak Investigation',
        formulaStep: 'Symptom -> Investigation -> Root Cause -> Fix -> Verification',
        prompt: 'Explain how you diagnosed and resolved a memory leak or infinite loop issue in your codebase.',
        frameworkSteps: [
          { stepName: '1. Symptom', content: 'Our production container pods were crashing every six hours due to Out-Of-Memory (OOM) errors.' },
          { stepName: '2. Investigation', content: 'I analyzed the heap dump using memory profiling tools and monitored garbage collection logs.' },
          { stepName: '3. Root Cause', content: 'I discovered an event listener that was repeatedly registered inside a loop without being unsubscribed.' },
          { stepName: '4. Fix', content: 'I refactored the component to clean up event listeners upon lifecycle unmount.' },
          { stepName: '5. Verification', content: 'Memory consumption remained flat at 45MB over a 48-hour load testing period.' },
        ],
        sampleResponse: 'Last month, we experienced an issue where our server memory steadily climbed until pods restarted. I investigated the issue by taking snapshot heap dumps under synthetic load. I identified the root cause: an asynchronous database connection pool was not properly releasing idle clients. I fixed the issue by implementing a strict connection lifecycle timeout and closing connections in a finally block. After running stress tests, memory stabilized at forty-five megabytes with zero memory leaks.',
        commonPitfallsToAvoid: [
          'Do not say "Some bug was there and I fixed it".',
          'Specify the exact diagnostic tool or methodology used (e.g. heap profiler, logs, metrics).',
        ],
      },
      professionalInterview: {
        title: 'Behavioral Question: "Tell Me About a Challenging Technical Problem"',
        type: 'interview',
        prompt: 'Answer the classic technical interview question: "Tell me about a challenging bug or technical problem you solved."',
        methodology: 'STAR Method (Situation, Task, Action, Result)',
        guidedTemplate: 'Situation: In my project [X], we faced [Y problem]. Task: My goal was to [Target outcome]. Action: I investigated by [Method], identified [Root cause], and implemented [Solution]. Result: As a result, [Measurable impact / percentage improvement].',
        sampleExecutiveResponse: 'During the development of our real-time analytics dashboard, our backend struggled to process five thousand concurrent WebSocket updates, resulting in severe message lag. My responsibility was to optimize the throughput without increasing infrastructure costs. I benchmarked the pipeline and discovered that JSON serialization was blocking the single-threaded event loop. To resolve this, I migrated the serialization layer to a high-performance C-extension library and introduced a Redis message buffer. As a result, latency dropped by seventy percent, and our system comfortably handled ten thousand concurrent connections.',
        proTips: [
          'Always include at least one concrete metric in the Result section (e.g., 70% latency drop).',
          'Focus on YOUR specific actions rather than just "we did this".',
        ],
      },
    },
  },

  // =========================================================================
  // DAY 3: THINKING IN ENGLISH & CONVERSATIONAL CONNECTORS (LEVEL 2)
  // =========================================================================
  {
    dayNumber: 3,
    levelId: 'level-2-thinking-in-english',
    levelTitle: 'Level 2: Thinking in English',
    weekNumber: 1,
    title: 'Day 3: Connectors for Instant Fluency & Polite Disagreement',
    objective: 'Use natural connectors ("From my experience...", "The main reason is...") to eliminate pauses and disagree diplomatically in architectural code reviews.',
    estimatedMinutes: 80,
    pillars: {
      grammar: {
        title: 'Polite Modals for Disagreement (Could, Would, Might)',
        ruleSummary: 'Use modal verbs ("Could we consider...", "Would it be better to...") to soften technical criticism and promote collaboration.',
        learnContent: {
          rule: 'Direct disagreement ("Your code is wrong", "This will fail") sounds abrasive. Use modal verbs to propose alternatives constructively.',
          examples: [
            {
              incorrect: 'This approach is wrong. We cannot use NoSQL here.',
              correct: 'I understand the speed benefit, but would it be safer to use PostgreSQL given our relational data model?',
              explanation: 'Uses "would it be safer" to highlight the constraint without attacking the person.',
            },
            {
              incorrect: 'Tell me one thing, why you wrote this loop?',
              correct: 'Could you walk me through the rationale behind this nested loop?',
              explanation: '"Tell me one thing" is an aggressive regional idiom. "Could you walk me through" is executive and collaborative.',
            },
          ],
          teluguPitfallNote: 'Never translate "Oka mata cheppu" to "Tell me one thing" in meetings. Use "Could you share more context on..." or "Help me understand...".',
        },
        practiceQuiz: {
          question: 'Which of the following phrases represents the most professional way to challenge an architectural decision in a design review?',
          options: [
            'Tell me one thing, why are we wasting time on microservices?',
            'You are wrong about Redis caching; it will not work.',
            'I understand the desire for low latency; however, could we evaluate whether an in-memory cache justifies the added deployment complexity?',
            'This architecture is completely invalid and will definitely crash.',
          ],
          correctIndex: 2,
          explanation: 'Validates the objective ("low latency") while diplomatically asking to evaluate the trade-off with modal "could we evaluate".',
        },
      },
      vocabulary: {
        title: 'Executive Transitions & Connectors',
        words: [
          {
            term: 'Consequently',
            phonetic: '/ˈkɒn.sɪ.kwənt.li/',
            partOfSpeech: 'adverb',
            definition: 'As a result or effect of something previously mentioned.',
            corporateContext: 'Used to explain cause and effect in project retrospectives.',
            sampleSentence: 'The background worker ran out of threads; consequently, incoming webhooks were queued.',
            professionalUpgrade: { amateur: 'So then this happened', executive: 'Consequently, the latency increased' },
          },
          {
            term: 'Trade-off',
            phonetic: '/ˈtreɪd.ɒf/',
            partOfSpeech: 'noun',
            definition: 'A balance achieved between two desirable but incompatible features; a compromise.',
            corporateContext: 'Standard terminology in system design interviews.',
            sampleSentence: 'We chose eventual consistency as a trade-off for higher write throughput.',
            professionalUpgrade: { amateur: 'Good and bad things', executive: 'The primary architectural trade-off' },
          },
          {
            term: 'Decouple',
            phonetic: '/diːˈkʌp.əl/',
            partOfSpeech: 'verb',
            definition: 'To separate or disengage components so they operate independently.',
            corporateContext: 'Used when refactoring monolithic systems.',
            sampleSentence: 'We decoupled the payment processing pipeline using an asynchronous message queue.',
            professionalUpgrade: { amateur: 'We separated the code', executive: 'We decoupled the services to isolate failure domains' },
          },
        ],
        practiceDrill: {
          prompt: 'Fill in the blank with the appropriate corporate noun:',
          fillInBlankSentence: 'In distributed systems design, choosing between strong consistency and high availability is a classic engineering _____.',
          missingWord: 'trade-off',
          hint: 'Means a deliberate compromise between two competing engineering constraints.',
        },
      },
      speaking: {
        title: 'Spontaneous Narration: Defending an Architectural Choice',
        prompt: 'Explain why you would choose a Relational Database (like PostgreSQL) over a NoSQL Database (like MongoDB) for an e-commerce checkout system. Use at least two connectors: "The main reason is..." and "Consequently...".',
        category: 'System Design Justification',
        targetDurationSeconds: 90,
        preparationSeconds: 15,
        rubric: [
          'Used "The main reason is..." and "Consequently..." smoothly.',
          'Explained ACID transactions and financial consistency.',
          'Maintained articulate, unhurried pacing.',
        ],
        tips: [
          'Structure your response: Conclusion first -> Technical Reason -> Concrete Example.',
        ],
        sampleAudioTranscript: 'For an e-commerce checkout engine, I would strongly advocate for a relational database like PostgreSQL. The main reason is that financial transactions require strict ACID compliance to prevent race conditions such as double-spending or inventory mismatch. Consequently, relational tables with foreign keys guarantee data integrity across orders, payments, and stock balances. While NoSQL offers flexible schemas, financial data demands strict relational structure.',
      },
      listeningShadowing: {
        title: 'Architectural Code Review Feedback',
        scenario: 'A staff software engineer provides constructive feedback on a pull request regarding API rate limiting.',
        speakerRole: 'Staff Software Engineer',
        speedCategory: 'Normal (1.0x)',
        audioTranscript: 'I looked through the pull request, and the implementation is very clean. My only recommendation is that instead of rate-limiting by IP address in the application container, we could offload this check to the API Gateway using a sliding-window token bucket algorithm. This would protect our downstream services from DDOS spikes without increasing CPU overhead.',
        keyPhrasesToShadow: [
          'I looked through the pull request, and the implementation is very clean.',
          'My only recommendation is that instead of rate-limiting by IP address...',
          'we could offload this check to the API Gateway...',
          'using a sliding-window token bucket algorithm.',
        ],
        comprehensionQuestion: {
          question: 'What is the reviewer recommending?',
          options: [
            'Reject the pull request due to dirty code',
            'Offload rate limiting to the API Gateway using a sliding-window algorithm',
            'Remove rate limiting entirely to save CPU cycles',
            'Switch to a fixed-window algorithm in the database',
          ],
          correctIndex: 1,
          explanation: 'The reviewer suggested offloading rate limiting to the API Gateway with a sliding-window algorithm.',
        },
      },
      technicalComm: {
        title: 'Explaining ACID Properties to a Non-Technical Stakeholder',
        topic: 'Database Reliability (ACID)',
        formulaStep: 'High-Level Analogy -> Technical Breakdown -> Real-World Example -> Impact',
        prompt: 'Explain what ACID transactions mean using a simple bank transfer analogy.',
        frameworkSteps: [
          { stepName: '1. Analogy', content: 'Imagine transferring $100 from Account A to Account B. Either both the debit and credit succeed, or neither happens.' },
          { stepName: '2. Atomicity', content: 'Atomicity means "all or nothing"—if the server crashes halfway, the system rolls back so money is never lost.' },
          { stepName: '3. Consistency & Isolation', content: 'Consistency enforces valid balances; Isolation ensures concurrent transfers do not corrupt each other.' },
          { stepName: '4. Durability', content: 'Durability guarantees that once confirmed, the update is permanently written to non-volatile disk.' },
        ],
        sampleResponse: 'ACID is a set of four guarantees that ensure database transactions are completely reliable. To understand this, consider a bank transfer of one hundred dollars: Atomicity guarantees that if money leaves Account A, it must reach Account B; if power fails halfway, the transaction rolls back completely. Consistency ensures rules like non-negative balances are respected. Isolation ensures multiple transfers happening simultaneously do not interfere. Finally, Durability ensures that once recorded, data survives system crashes. In short, ACID guarantees financial correctness.',
        commonPitfallsToAvoid: [
          'Do not rattle off the four acronym letters without explaining what they actually prevent in production.',
        ],
      },
      professionalInterview: {
        title: 'Handling an Unknown Question Gracefully',
        type: 'interview',
        prompt: 'In a technical interview, the interviewer asks about an obscure framework or algorithm you have never used. Demonstrate how to handle this with confidence rather than freezing or bluffing.',
        methodology: '3-Step Honest Response: Acknowledge -> Relate -> Reason from First Principles',
        guidedTemplate: 'I have not had hands-on production experience with [X] specifically; however, I have extensive experience with [Related Y]. Based on my understanding of [Core Principle], I would expect it works by [Logical reasoning]...',
        sampleExecutiveResponse: 'I have not worked directly with Apache Kafka in production yet; however, I am thoroughly familiar with message queues like RabbitMQ and Redis Pub/Sub. Based on event-driven principles, I understand Kafka uses distributed commit logs to guarantee high-throughput streaming. If given the requirement, I would leverage my background in asynchronous messaging to master its partitioning and consumer group semantics rapidly.',
        proTips: [
          'Never say "I don\'t know" and fall silent.',
          'Pivot to a related technology you DO know and demonstrate strong analytical reasoning.',
        ],
      },
    },
  },

  // =========================================================================
  // DAY 4: VOCABULARY MASTERY & CAPSTONE PROJECT STORYTELLING (LEVEL 3)
  // =========================================================================
  {
    dayNumber: 4,
    levelId: 'level-3-vocabulary',
    levelTitle: 'Level 3: Vocabulary for Tech & Career',
    weekNumber: 1,
    title: 'Day 4: Executive Vocabulary & 2-Minute Project Storytelling',
    objective: 'Replace amateur expressions with 10 executive power words, master project architecture narration, and practice the STAR framework for project contributions.',
    estimatedMinutes: 80,
    pillars: {
      grammar: {
        title: 'Active Voice vs. Passive Voice in Engineering Resumes & Interviews',
        ruleSummary: 'Use Active Voice ("I designed the caching layer") instead of Passive ("The caching layer was designed by me") for leadership impact.',
        learnContent: {
          rule: 'Active voice places you as the direct driver of action. Passive voice sounds detached and unconfident.',
          examples: [
            {
              incorrect: 'The API was optimized by me and latency was reduced.',
              correct: 'I optimized the API endpoints and reduced response latency by forty percent.',
              explanation: 'Active voice demonstrates ownership, initiative, and measurable impact.',
            },
            {
              incorrect: 'There is a feature that was built for notifications.',
              correct: 'I architected and shipped the real-time notification engine.',
              explanation: 'Uses strong action verbs ("architected", "shipped") rather than passive "was built".',
            },
          ],
          teluguPitfallNote: 'Avoid starting every sentence with "Actually there is...". Start directly with the action: "I developed...", "I benchmarked...", "I refactored...".',
        },
        practiceQuiz: {
          question: 'Which of the following demonstrates the strongest active voice for an interview answer?',
          options: [
            'A new search algorithm was researched and created by our team.',
            'I designed and implemented an inverted index search algorithm, reducing query lookup times by half.',
            'There was an implementation done by me for search.',
            'Search algorithm optimization was something I was involved in.',
          ],
          correctIndex: 1,
          explanation: 'Clear subject ("I") + strong active verbs ("designed and implemented") + concrete outcome ("reducing query lookup times by half").',
        },
      },
      vocabulary: {
        title: '10 High-Impact Executive Power Replacements',
        words: [
          {
            term: 'Architect',
            phonetic: '/ˈɑː.kɪ.tekt/',
            partOfSpeech: 'verb',
            definition: 'To design and configure the components of a complex software system.',
            corporateContext: 'Used to denote high-level engineering leadership.',
            sampleSentence: 'I architected a fault-tolerant microservice pipeline on AWS.',
            professionalUpgrade: { amateur: 'I made the system design', executive: 'I architected the distributed backend topology' },
          },
          {
            term: 'Leverage',
            phonetic: '/ˈliː.vər.ɪdʒ/',
            partOfSpeech: 'verb',
            definition: 'To use something to maximum advantage.',
            corporateContext: 'Used when discussing tools, libraries, or existing infrastructure.',
            sampleSentence: 'We leveraged Docker containers to ensure consistent staging and production environments.',
            professionalUpgrade: { amateur: 'We used Docker', executive: 'We leveraged Docker to eliminate environment drift' },
          },
          {
            term: 'Streamline',
            phonetic: '/ˈstriːm.laɪn/',
            partOfSpeech: 'verb',
            definition: 'To make an organization or process simpler, more efficient, and effective.',
            corporateContext: 'Used when discussing workflow improvements or CI/CD.',
            sampleSentence: 'We streamlined the pull request review process with automated GitHub Actions.',
            professionalUpgrade: { amateur: 'We made work faster', executive: 'We streamlined the deployment lifecycle' },
          },
        ],
        practiceDrill: {
          prompt: 'Fill in the blank with the appropriate executive verb:',
          fillInBlankSentence: 'By introducing automated unit tests and linting, we _____ our release cycle from three days to four hours.',
          missingWord: 'streamlined',
          hint: 'Means to make a process faster, simpler, and more efficient.',
        },
      },
      speaking: {
        title: '90-Second Project Pitch: Problem, Tech Stack & Impact',
        prompt: 'Present your primary capstone project in 90 seconds. Structure: (1) Problem statement, (2) Technology stack chosen & why, (3) Key technical challenge solved, (4) Measurable outcome.',
        category: 'Project Walkthrough',
        targetDurationSeconds: 90,
        preparationSeconds: 20,
        rubric: [
          'Followed the 4-part structure cleanly.',
          'Used active voice verbs ("I architected", "I implemented", "I optimized").',
          'Eliminated all filler words ("basically", "like", "actually").',
          'Concluded with a crisp summary of outcomes or metrics.',
        ],
        tips: [
          'Do not read a wall of code; explain the ARCHITECTURE and BUSINESS VALUE.',
        ],
        sampleAudioTranscript: 'I developed LevelUpDev, an AI-powered adaptive career acceleration platform engineered for software developers. The core problem we identified is that engineering students often lack structured, data-driven pathways to master industry-ready communication and technical skills. I architected the application using Next.js, TypeScript, and Tailwind CSS on the frontend, with Firebase Firestore and LocalStorage providing dual-layer persistence. A major engineering challenge was building a deterministic audio recording studio that operates entirely client-side without incurring high server overhead. As a result, the platform delivers instantaneous feedback with zero audio latency.',
      },
      listeningShadowing: {
        title: 'Sprint Retrospective Feedback',
        scenario: 'An agile product manager reviews the achievements and bottlenecks of the previous two-week sprint.',
        speakerRole: 'Technical Product Manager',
        speedCategory: 'Normal (1.0x)',
        audioTranscript: 'Looking at our sprint metrics, the team completed ninety percent of committed story points. Our velocity increased because we streamlined the code review process. However, our main bottleneck remains manual staging deployments, which we plan to automate in the upcoming sprint.',
        keyPhrasesToShadow: [
          'Looking at our sprint metrics...',
          'the team completed ninety percent of committed story points.',
          'Our velocity increased because we streamlined the code review process.',
          'However, our main bottleneck remains manual staging deployments...',
        ],
        comprehensionQuestion: {
          question: 'Why did team velocity increase during this sprint?',
          options: [
            'They worked over the weekend',
            'They streamlined the code review process',
            'They removed automated testing',
            'They reduced the number of features',
          ],
          correctIndex: 1,
          explanation: 'The PM stated: "Our velocity increased because we streamlined the code review process".',
        },
      },
      technicalComm: {
        title: 'Explaining Why Clean Code & Linting Matters to Business Stakeholders',
        topic: 'Technical Debt & Code Quality',
        formulaStep: 'Business Risk -> Engineering Reality -> Solution -> ROI',
        prompt: 'Explain to a non-technical product manager why investing time in automated linting and unit testing saves money.',
        frameworkSteps: [
          { stepName: '1. Business Risk', content: 'Shipping fast without tests leads to production bugs that break user trust and cost 10x more to fix.' },
          { stepName: '2. Engineering Reality', content: 'Without automated checks, senior engineers spend 30% of their day catching basic typos in manual code reviews.' },
          { stepName: '3. Solution', content: 'Integrating ESLint and pre-commit hooks enforces clean standards automatically before code is pushed.' },
          { stepName: '4. Return on Investment', content: 'This frees up senior engineers to focus on business features and prevents costly production outages.' },
        ],
        sampleResponse: 'Investing in automated linting and unit tests directly protects our release velocity and product stability. When developers write code without automated guardrails, subtle regressions escape into production, where fixing them costs ten times more engineering hours. By integrating automated testing into our CI pipeline, we catch eighty percent of bugs before code merges. This eliminates manual review friction and ensures we ship reliable features on schedule.',
        commonPitfallsToAvoid: [
          'Do not complain about messy teammates.',
          'Focus on business ROI: reduced production downtime and faster release velocity.',
        ],
      },
      professionalInterview: {
        title: 'STAR Question: "Tell Me About a Time You Disagreed With a Team Decision"',
        type: 'interview',
        prompt: 'Answer the behavioral interview question: "Tell me about a time you disagreed with a teammate or lead on a technical approach. How did you resolve it?"',
        methodology: 'STAR Method + Diplomatic Resolution',
        guidedTemplate: 'Situation: In project [X], our team proposed [Approach A]. Task: I believed [Approach B] was superior because of [Risk/Constraint]. Action: I created a quick prototype / benchmark to compare both objectively, presented data calmly, and invited team feedback. Result: We agreed on [Final resolution], which resulted in [Positive outcome].',
        sampleExecutiveResponse: 'During our database redesign, a senior peer proposed using MongoDB for our transactional order processing system to accelerate prototyping. However, my concern was that our data model required strict relational joins between users, orders, and inventory. Rather than debating theoretically, I built a small benchmark comparing PostgreSQL with MongoDB under multi-table queries. I presented the metrics to the team, demonstrating that PostgreSQL prevented orphaned records while maintaining identical write speeds. The team unanimously adopted PostgreSQL, and we completed our launch with zero data corruption issues.',
        proTips: [
          'Never portray yourself as angry or confrontational.',
          'Demonstrate that you rely on DATA and BENCHMARKS to resolve technical disputes.',
        ],
      },
    },
  },

  // =========================================================================
  // DAY 5: TECHNICAL DEEP DIVES & ADVANCED INTERVIEW READINESS (LEVELS 4–9)
  // =========================================================================
  {
    dayNumber: 5,
    levelId: 'level-6-technical-communication',
    levelTitle: 'Level 6: Technical Communication',
    weekNumber: 1,
    title: 'Day 5: 5-Minute Technical Deep Dive & Behavioral STAR Mastery',
    objective: 'Deliver structured technical explanations using the 5-step formula, master live coding communication ("thinking aloud"), and eliminate all filler words.',
    estimatedMinutes: 85,
    pillars: {
      grammar: {
        title: 'Precision Conditionals (If / Unless / Provided that)',
        ruleSummary: 'Use precise conditional clauses to articulate technical boundaries, SLAs, and error handling.',
        learnContent: {
          rule: 'Technical discussions require exact conditional logic. Use "Unless" (if not) and "Provided that" (only if) to state architecture constraints.',
          examples: [
            {
              incorrect: 'If database is not responding, then error.',
              correct: 'Unless the database responds within two hundred milliseconds, the gateway returns a fallback cached response.',
              explanation: 'Uses "Unless" with precise numerical SLA constraints.',
            },
            {
              incorrect: 'We can scale if servers are available.',
              correct: 'Our backend can scale horizontally, provided that the session state remains completely decoupled in Redis.',
              explanation: 'Uses "provided that" to declare the architectural prerequisite.',
            },
          ],
          teluguPitfallNote: 'Avoid loose phrasing like "Suppose if...". Choose either "Suppose" or "If", never both together.',
        },
        practiceQuiz: {
          question: 'Which sentence correctly specifies an architectural constraint using precise conditionals?',
          options: [
            'Suppose if the server crashes then we check.',
            'The payment webhook will automatically retry up to three times, provided that the endpoint returns a five-hundred status code.',
            'Unless the server is not crashing we are okay.',
            'If at all anything happens we will see.',
          ],
          correctIndex: 1,
          explanation: '"provided that" correctly states the specific condition under which retry logic triggers.',
        },
      },
      vocabulary: {
        title: 'Enterprise Architecture & Cloud Vocabulary',
        words: [
          {
            term: 'Idempotency',
            phonetic: '/ˌaɪ.dəmˈpoʊ.tən.si/',
            partOfSpeech: 'noun',
            definition: 'The property of certain operations in mathematics and computer science whereby they can be applied multiple times without changing the result beyond the initial application.',
            corporateContext: 'Critical in payment APIs and webhook processing.',
            sampleSentence: 'We included an idempotency key in the payment request to prevent duplicate charges upon network retry.',
            professionalUpgrade: { amateur: 'It does not charge twice', executive: 'The payment endpoint guarantees strict idempotency' },
          },
          {
            term: 'Throughput',
            phonetic: '/ˈθruː.pʊt/',
            partOfSpeech: 'noun',
            definition: 'The amount of material or items passing through a system or process.',
            corporateContext: 'Used in database, network, and queue performance metrics.',
            sampleSentence: 'Kafka partitioning increased our event ingestion throughput to fifty thousand messages per second.',
            professionalUpgrade: { amateur: 'It processes many things', executive: 'We achieved a peak throughput of 50,000 events per second' },
          },
          {
            term: 'Resilience',
            phonetic: '/rɪˈzɪl.jəns/',
            partOfSpeech: 'noun',
            definition: 'The capacity of a system to recover quickly from difficulties; toughness and fault tolerance.',
            corporateContext: 'Used in cloud infrastructure reviews.',
            sampleSentence: 'Multi-region failover enhances our system resilience against cloud provider outages.',
            professionalUpgrade: { amateur: 'The system does not go down', executive: 'Circuit breakers improve overall system resilience' },
          },
        ],
        practiceDrill: {
          prompt: 'Fill in the blank with the appropriate distributed systems term:',
          fillInBlankSentence: 'To prevent duplicate credit card charges during network timeouts, the billing API enforces request _____.',
          missingWord: 'idempotency',
          hint: 'Means an operation can be safely retried multiple times without producing duplicate side effects.',
        },
      },
      speaking: {
        title: 'Live Coding Thinking Aloud: Two-Sum or LRU Cache Walkthrough',
        prompt: 'Simulate a live coding technical interview. Speak aloud for 90 seconds explaining your approach to designing an LRU (Least Recently Used) Cache before writing any code.',
        category: 'Live Coding Communication',
        targetDurationSeconds: 90,
        preparationSeconds: 15,
        rubric: [
          'Clarified input constraints and edge cases first.',
          'Proposed data structures (HashMap + Doubly Linked List) with time complexity reasoning.',
          'Analyzed trade-offs clearly before implementation.',
          'Spoke with calm authority without vocalized hesitation.',
        ],
        tips: [
          'State $O(1)$ time complexity goals for `get()` and `put()` immediately.',
        ],
        sampleAudioTranscript: 'Before writing code, let me clarify the requirements for the LRU Cache. We need two primary operations: `get(key)` and `put(key, value)`, both running in $O(1)$ time complexity. When the cache exceeds its capacity, it must evict the least recently used item. To achieve $O(1)$ lookup, a standard Hash Map is ideal. However, a Hash Map alone does not maintain access order. Therefore, I will combine the Hash Map with a Doubly Linked List. The Hash Map stores keys mapping to list nodes, while the Doubly Linked List maintains temporal ordering, allowing constant-time insertion at the head and removal from the tail. Let me now outline the node structure.',
      },
      listeningShadowing: {
        title: 'Executive Architecture Review (CTO Presentation)',
        scenario: 'A Chief Technology Officer outlines the migration from monolithic architecture to event-driven microservices.',
        speakerRole: 'Chief Technology Officer',
        speedCategory: 'Normal (1.0x)',
        audioTranscript: 'Our primary objective for Q3 is to transition our core billing pipeline into an event-driven architecture. By decoupling order generation from payment fulfillment via Kafka, we eliminate single points of failure and ensure that peak holiday traffic does not degrade checkout availability.',
        keyPhrasesToShadow: [
          'Our primary objective for Q3 is to transition our core billing pipeline...',
          'into an event-driven architecture.',
          'By decoupling order generation from payment fulfillment via Kafka...',
          'we eliminate single points of failure...',
        ],
        comprehensionQuestion: {
          question: 'What is the main benefit of decoupling order generation from payment fulfillment?',
          options: [
            'It lowers employee salaries',
            'It eliminates single points of failure and protects checkout availability during peak traffic',
            'It removes the need for databases',
            'It replaces all backend code with Python',
          ],
          correctIndex: 1,
          explanation: 'The CTO explained: "we eliminate single points of failure and ensure that peak holiday traffic does not degrade checkout availability".',
        },
      },
      technicalComm: {
        title: 'Explaining Distributed Caching & Cache Invalidation',
        topic: 'Cache Invalidation Strategies',
        formulaStep: 'Definition -> Problem -> Strategies (Write-Through vs Cache-Aside) -> Conclusion',
        prompt: 'Explain why cache invalidation is difficult and how you manage cache consistency in production.',
        frameworkSteps: [
          { stepName: '1. Definition', content: 'Caching stores frequently accessed data in fast in-memory storage like Redis to avoid expensive database queries.' },
          { stepName: '2. The Invalidation Challenge', content: 'The primary challenge is keeping the cache synchronized when underlying database records are updated.' },
          { stepName: '3. Solution Strategies', content: 'We use the Cache-Aside pattern combined with strict TTLs (Time-To-Live) and explicit cache eviction on record updates.' },
          { stepName: '4. Conclusion', content: 'Setting appropriate TTLs provides a reliable safety net against stale data while keeping database load low.' },
        ],
        sampleResponse: 'Caching is an essential technique for reducing database load and delivering sub-millisecond response times. However, maintaining consistency between the cache and the primary database is a well-known challenge. In our architecture, we implement the Cache-Aside pattern: the application first checks Redis; upon a cache miss, it reads from PostgreSQL and populates the cache with a thirty-minute TTL. Whenever a user updates their profile, our service issues an explicit cache invalidation command. This strategy ensures users never see stale data while preserving ninety-five percent cache hit rates.',
        commonPitfallsToAvoid: [
          'Do not overlook the risk of stale cache reads.',
          'Mention concrete metrics like TTL durations and cache hit rates.',
        ],
      },
      professionalInterview: {
        title: 'Executive Closing: "Do You Have Any Questions for Us?"',
        type: 'interview',
        prompt: 'At the end of an interview, the hiring manager asks: "Do you have any questions for me?" Demonstrate how to ask high-impact, thoughtful questions that leave a memorable executive impression.',
        methodology: 'Strategic Inquiry Formula (Engineering Culture + Technical Roadmap + Team Success)',
        guidedTemplate: '1. "How does the engineering team balance shipping new features with paying down technical debt?" 2. "What does success look like for someone in this role over the first ninety days?"',
        sampleExecutiveResponse: 'Thank you for asking. I have two specific questions: First, looking at your technical roadmap, what is the biggest scalability challenge the engineering team is currently navigating as user adoption grows? Second, how does the team maintain engineering velocity while ensuring robust automated test coverage and documentation? I would love to hear your perspective on the team culture around code quality.',
        proTips: [
          'Never say "No, you answered everything" or ask about salary in round one.',
          'Asking about technical debt and scalability proves you think like a senior engineer.',
        ],
      },
    },
  },
];

/**
 * Deterministically retrieves a DailyTrainingPlan for a given day number (1 to 90).
 * If dayNumber exceeds predefined static blueprints, dynamically generates a structured plan
 * mapped to the appropriate level and module in the 10-level curriculum.
 */
export function getDailyTrainingPlan(dayNumber: number): DailyTrainingPlan {
  const safeDay = Math.max(1, Math.min(90, Math.floor(dayNumber)));
  const existing = DAILY_TRAINING_PLANS.find((p) => p.dayNumber === safeDay);
  if (existing) return existing;

  // Generate deterministic plan based on modulo cycle over curriculum themes
  const baseIndex = (safeDay - 1) % DAILY_TRAINING_PLANS.length;
  const base = DAILY_TRAINING_PLANS[baseIndex];
  const weekNum = Math.ceil(safeDay / 7);

  return {
    ...base,
    dayNumber: safeDay,
    weekNumber: weekNum,
    title: `Day ${safeDay}: Advanced Practice & Engineering Communication`,
    objective: `Consolidate communication fluency, master technical precision in architecture reviews, and deliver confident interview responses for Day ${safeDay}.`,
  };
}

/**
 * Returns today's active training plan for the user based on their completed days list.
 */
export function getTodayPlanForUser(completedDayNumbers: number[]): DailyTrainingPlan {
  const completedSet = new Set(completedDayNumbers);
  let targetDay = 1;
  while (completedSet.has(targetDay) && targetDay < 90) {
    targetDay++;
  }
  return getDailyTrainingPlan(targetDay);
}

/**
 * Returns a list of upcoming training plans after the current active day.
 */
export function getUpcomingTrainingPlans(currentDay: number, count: number = 5): DailyTrainingPlan[] {
  const list: DailyTrainingPlan[] = [];
  for (let i = 1; i <= count; i++) {
    const nextDay = currentDay + i;
    if (nextDay <= 90) {
      list.push(getDailyTrainingPlan(nextDay));
    }
  }
  return list;
}
