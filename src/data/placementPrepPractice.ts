import { PlacementCategory } from './placementPrepData';

// Data model interfaces for Personal Notes & Practice
export interface PlacementPersonalNote {
  id: string;
  topicId: string;
  userEmail: string; // Restricted to swamy@levelupdev.com
  noteText: string;
  keyInsights: string[];
  updatedAt: string;
}

export interface MockAssessmentStructure {
  id: string;
  title: string;
  category: 'Quant' | 'Logical' | 'Verbal' | 'Programming' | 'DSA' | 'SQL' | 'CS Core' | 'Mixed MNC';
  difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Hard';
  totalQuestions: number;
  timeLimitMinutes: number;
  hasCodingQuestions: boolean;
  scoreSchema: {
    correctPoints: number;
    negativePoints: number;
    passingPercentage: number;
  };
}

export interface MockInterviewStructure {
  id: string;
  title: string;
  category: 'HR' | 'Technical' | 'DSA' | 'SQL' | 'AIML' | 'Project' | 'Mixed MNC';
  rounds: {
    question: string;
    expectedConcepts: string[];
    userAnswerPlaceholder: string;
    evaluationCriteria: string[];
    sampleImprovementSuggestion: string;
  }[];
}

// =========================================================================
// 23 — MOCK ASSESSMENTS ARCHITECTURE
// =========================================================================
export const MOCK_ASSESSMENTS_CATEGORY: PlacementCategory = {
  id: 'mock-assessments',
  cardNumber: '23',
  title: 'Mock Assessments Engine',
  shortTitle: 'Mock Assessments',
  tagline: 'Timed online assessment simulation across Aptitude, Logical, Verbal, Programming, DSA, SQL, CS Core, and Full MNC Mock Tests.',
  phaseId: 'final-prep',
  phaseName: 'Final Prep',
  iconName: 'CheckSquare',
  badge: 'Simulation',
  estimatedHours: '30 Hours',
  importance: 'Critical',
  description: 'A structured assessment engine architecture supporting multiple-choice questions, live coding runners, countdown timers, negative marking, detailed score reports, and accuracy analytics.',
  targetMNCs: ['TCS NQT', 'Infosys Online Test', 'Accenture Cognitive', 'Cognizant GenC', 'Amazon Online Assessment', 'Wipro NLTH'],
  levels: [
    {
      id: 'level-1-assessment-engine',
      levelNumber: '01',
      title: 'Assessment Engine & Test Categories',
      shortDescription: 'Architecture supporting Aptitude, Logical, Verbal, Programming, DSA, SQL, and Mixed MNC exams with timers and analytics.',
      estimatedHours: '15 Hours',
      concepts: [
        {
          id: 'test-categories-engine',
          title: 'Assessment Categories & Difficulty Levels',
          tagline: 'Quantitative, Logical, Verbal, Programming, DSA, SQL, CS Fundamentals, and Full Mixed MNC Tests.',
          description: 'Modular exam tracks calibrated across Beginner, Easy, Medium, and Hard difficulty bands.',
          topics: [
            {
              id: 'assessment-categories-architecture',
              title: 'Assessment Categories & MNC Test DNA',
              summary: 'Supported tracks: Quant (Speed Math, Arithmetic), Logical (Puzzles, Series), Verbal (Grammar, RC), Programming (MCQ output tracing), DSA (Coding test), SQL (Query runner), CS Fundamentals, Mixed MNC.',
              whatYouWillLearn: 'Configuring test parameters: question counts, sectional time limits, intra-sectional navigation locks, and scoring matrices.',
              concept: 'The assessment engine models real recruitment tests (TCS NQT, AMCAT, HackerRank, Mettle) with sectional timers, negative marking, and automated accuracy calculation.',
              whyItMatters: 'Builds authentic exam stamina under realistic timed test conditions.',
              keyTakeaways: [
                'Difficulty bands: Beginner (Foundations) → Easy (Ninja/Genc) → Medium (Digital/DSE) → Hard (Prime/Amazon OA).',
                'Each test records: Total Score, Correct Answers, Explanations, Accuracy %, and Time Taken per question.',
              ],
            },
            {
              id: 'test-metrics-scoring-system',
              title: 'Scoring, Explanations & Analytics System',
              summary: 'Timer countdown, multiple choice evaluation, coding test harness, score breakdown, and step-by-step explanations.',
              whatYouWillLearn: 'The architectural data flow: User Answer Submission → Scoring Evaluator → Accuracy Analysis → Weak Area Diagnostic.',
              concept: 'Post-test analytics break down performance into time-per-question, accuracy percentage by concept, and step-by-step answer explanations.',
              whyItMatters: 'Identifies speed bottlenecks before appearing for actual on-campus placement tests.',
              keyTakeaways: [
                'Accuracy calculation: `(Correct Answers / Attempted Questions) * 100`.',
                'Explanations are displayed immediately after test submission with references to relevant study concepts.',
              ],
            },
          ],
        },
      ],
    },
  ],
};

// =========================================================================
// 24 — MOCK INTERVIEWS
// =========================================================================
export const MOCK_INTERVIEWS_CATEGORY: PlacementCategory = {
  id: 'mock-interviews',
  cardNumber: '24',
  title: 'Mock Interview Studio',
  shortTitle: 'Mock Interviews',
  tagline: 'Structured 4-stage interview studio: HR, Technical, DSA, SQL, AIML, Project, and Mixed MNC live interview simulations.',
  phaseId: 'final-prep',
  phaseName: 'Final Prep',
  iconName: 'Users',
  badge: 'Interactive Studio',
  estimatedHours: '25 Hours',
  importance: 'Critical',
  description: 'An interactive interview simulation architecture. Practice answering HR, Technical, DSA, SQL, AIML, and Project questions with structured evaluation rubrics and actionable improvement suggestions.',
  targetMNCs: ['All Product & Service MNCs'],
  levels: [
    {
      id: 'level-1-interview-studio',
      levelNumber: '01',
      title: 'Interview Studio Tracks & Rubrics',
      shortDescription: 'The 4-stage interview flow: Question → My Answer → Evaluation Rubric → Improvement Suggestion.',
      estimatedHours: '25 Hours',
      concepts: [
        {
          id: 'interview-tracks-framework',
          title: 'Specialized Interview Tracks & Rubrics',
          tagline: 'HR, Technical, DSA, SQL, AIML, Project, and Mixed MNC interview simulation studio.',
          description: 'Practice structured technical and behavioral answers against comprehensive evaluation rubrics.',
          topics: [
            {
              id: 'interview-4-stage-flow',
              title: 'The 4-Stage Mock Interview Framework',
              summary: 'Question Prompt → Candidate Recorded Answer → Evaluation Rubric Check → Actionable Improvement Suggestions.',
              whatYouWillLearn: 'Evaluating your answers against clear scoring rubrics: Technical Accuracy, Communication Clarity, Depth, and Real-World Application.',
              concept: 'The mock interview studio simulates live interviewer questioning across 7 dedicated tracks (HR, Technical, DSA, SQL, AIML, Project, Mixed MNC). It provides a structured workspace to record answers and review evaluation benchmarks.',
              whyItMatters: 'Eliminates stage fright and sharpens verbal articulation before live company rounds.',
              keyTakeaways: [
                'Structure: 1. Question → 2. My Answer (Drafted response) → 3. Evaluation Criteria → 4. Improvement Suggestion.',
                'Designed for self-review and mentor evaluation without simulated fake AI promises.',
              ],
            },
            {
              id: 'interview-tracks-coverage',
              title: 'Interview Tracks: HR, Tech, DSA, SQL, AIML & Projects',
              summary: 'HR behavioral scenarios, live DSA explanation, complex SQL queries, AIML trade-off defense, and project architecture grilling.',
              whatYouWillLearn: 'Mastering the specific expectations for each interview track (e.g. STAR for HR, optimal complexity proof for DSA, schema integrity for SQL).',
              concept: 'Each track focuses on distinct competencies: DSA emphasizes constraint analysis and trace tables; AIML emphasizes metric selection and data drift; Projects emphasize architectural ownership.',
              whyItMatters: 'Prepares you for the exact sequence of technical and managerial rounds.',
              keyTakeaways: [
                'DSA track requires explaining $O(N)$ time and $O(1)$ space proof before coding.',
                'AIML track requires defending why specific models and evaluation metrics were chosen.',
              ],
            },
          ],
        },
      ],
    },
  ],
};

// =========================================================================
// 25 — INTERVIEW QUESTION BANK
// =========================================================================
export const INTERVIEW_QUESTION_BANK_CATEGORY: PlacementCategory = {
  id: 'interview-question-bank',
  cardNumber: '25',
  title: 'Interview Question Bank',
  shortTitle: 'Question Bank',
  tagline: 'Curated repository of top interview questions across Programming, DSA, OOP, DBMS, SQL, OS, CN, AIML, Projects, HR, and Behavioral.',
  phaseId: 'final-prep',
  phaseName: 'Final Prep',
  iconName: 'BookOpen',
  badge: 'Question Vault',
  estimatedHours: '35 Hours',
  importance: 'Critical',
  description: 'An expandable question repository categorized by domain. Each question supports difficulty tags, expected core concepts, your personal drafted answer, and revision notes.',
  targetMNCs: ['All Product & Service MNCs'],
  levels: [
    {
      id: 'level-1-question-bank-vault',
      levelNumber: '01',
      title: 'Domain-Wise Question Repository',
      shortDescription: 'Programming, DSA, OOP, DBMS, SQL, OS, CN, AIML, Projects, HR, and Behavioral question archives.',
      estimatedHours: '35 Hours',
      concepts: [
        {
          id: 'technical-question-sections',
          title: 'Technical & CS Core Question Sections',
          tagline: 'Programming, DSA, OOP, DBMS, SQL, Operating Systems, Computer Networks, and AIML.',
          description: 'Comprehensive archives of the top technical questions asked across tech recruitment cycles.',
          topics: [
            {
              id: 'cs-core-dsa-question-vault',
              title: 'Programming, DSA, OOP, DBMS, SQL, OS & CN Question Vault',
              summary: 'Expandable question cards containing: Question Title, Difficulty (Easy/Med/Hard), Expected Core Concepts, Drafted Answer, and Personal Notes.',
              whatYouWillLearn: 'Accessing high-yield question archives with model answers and key technical keywords expected by interviewers.',
              concept: 'The question bank structure allows each question to be expanded into: Question Statement → Difficulty Tag → Expected Concepts Checklist → Candidate Answer Draft → Personal Revision Notes.',
              whyItMatters: 'The ultimate rapid-revision vault in the final 48 hours before an interview.',
              keyTakeaways: [
                'Each question includes an "Expected Concepts" checklist to ensure all key terms are covered.',
                'Integrates seamlessly with your personal private notes workspace.',
              ],
            },
          ],
        },
        {
          id: 'behavioral-projects-sections',
          title: 'Projects, HR & Behavioral Question Sections',
          tagline: 'Project architecture questions, STAR behavioral scenarios, conflict resolution, and leadership questions.',
          description: 'Master non-technical, project-defense, and behavioral interview questions.',
          topics: [
            {
              id: 'projects-hr-behavioral-vault',
              title: 'Projects, HR & Behavioral Question Vault',
              summary: 'Top project defense traps, behavioral conflict prompts, failure stories, and motivation questions.',
              whatYouWillLearn: 'Preparing structured draft responses using the STAR method for every standard HR and project question.',
              concept: 'Behavioral and project questions test consistency, leadership, and integrity. Having drafted answers prepared in your personal vault ensures polished, confident delivery.',
              whyItMatters: 'Guarantees comprehensive preparation across all recruitment stages.',
              keyTakeaways: [
                'Draft your personal STAR stories directly into each question card.',
                'Review personal notes and key metrics before every round.',
              ],
            },
          ],
        },
      ],
    },
  ],
};
