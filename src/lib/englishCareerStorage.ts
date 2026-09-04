import { db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { isEnglishCareerAllowed } from '@/lib/content';
import {
  GRAMMAR_TOPICS,
  VOCABULARY_LIST,
  PRONUNCIATION_LIST,
  SPEAKING_PROMPTS,
  LISTENING_SCENARIOS,
  TECHNICAL_ENGLISH_LESSONS,
  INTERVIEW_ENGLISH_LESSONS,
  PROFESSIONAL_EMAIL_TEMPLATES,
  ASSESSMENT_QUESTIONS,
} from '@/data/englishCareerData';

export interface SpeakingJournalEntry {
  id: string;
  title: string;
  modeId?: string;
  promptId?: string;
  promptCategory?: string;
  durationSeconds: number;
  selfRating: number; // 1-5
  confidenceScore?: number; // 1-5
  fillerWordCount: number;
  reflectionNotes: string;
  whatISaid?: string;
  whatIStruggledWith?: string;
  newWordsUsed?: string;
  mistakesNoticed?: string;
  audioBlobUrl?: string;
  dateStr: string;
  timestamp: string;
}

export interface AssessmentResultRecord {
  id: string;
  dateStr: string;
  scorePercent: number;
  totalQuestions: number;
  correctCount: number;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
  completedAt: string;
}

export interface DailyTrainingLog {
  dateStr: string;
  speechDone: boolean;
  grammarDone: boolean;
  vocabDone: boolean;
  completed: boolean;
  updatedAt: string;
}

export interface DailyPillarProgressState {
  completed: boolean;
  practiceAnswer?: any;
  practiceScore?: number;
  recordedAudioUrl?: string;
  recordDurationSeconds?: number;
  fillerWordCount?: number;
  selfRating?: number;
  notes?: string;
  completedAt?: string;
}

export interface DailyTrainingSessionState {
  dayNumber: number;
  currentPillarIndex: number; // 0 to 5 (0: Grammar, 1: Vocabulary, 2: Speaking, 3: Listening, 4: TechComm, 5: Professional)
  currentStepIndex: number; // 0 to 4 (0: Learn, 1: Practice, 2: Speak, 3: Review, 4: Complete)
  pillarProgress: {
    grammar?: DailyPillarProgressState;
    vocabulary?: DailyPillarProgressState;
    speaking?: DailyPillarProgressState;
    listeningShadowing?: DailyPillarProgressState;
    technicalComm?: DailyPillarProgressState;
    professionalInterview?: DailyPillarProgressState;
  };
  startedAt: string;
  lastUpdated: string;
  completedAt?: string;
  isDayComplete: boolean;
}

export interface CompletedDailyLessonRecord {
  id: string;
  dayNumber: number;
  dateStr: string;
  completedAt: string;
  timeSpentMinutes: number;
  pillarsCompletedCount: number;
  selfRating: number;
  journalSummary?: string;
}

export type MistakeCategory =
  | 'tense'
  | 'articles'
  | 'prepositions'
  | 'sentence_structure'
  | 'vocabulary'
  | 'word_order'
  | 'pronunciation_notes'
  | 'filler_words';

export interface TrackedMistakeRecord {
  id: string;
  category: MistakeCategory;
  categoryLabel?: string;
  originalSnippet: string;
  correctedSnippet: string;
  explanation: string;
  occurrenceCount: number;
  lastSeenAt: string;
  firstSeenAt: string;
  resolved?: boolean;
}

export interface QuestionPracticeRecord {
  id: string;
  questionId: string;
  category: string;
  difficulty: string;
  frameworkType: string;
  userAnswer: string;
  stepAnswers?: Record<string, string>;
  evaluation?: {
    clarityScore: number;
    structureScore: number;
    relevanceScore: number;
    confidenceScore: number;
    technicalAccuracyScore: number;
    concisenessScore: number;
    overallScore: number;
    strengths: string[];
    weakAreas: string[];
    recommendations: string[];
  };
  completedAt: string;
}

export interface MockInterviewSessionRecord {
  id: string;
  dateStr: string;
  category: string;
  difficulty: string;
  totalQuestions: number;
  overallScore: number;
  dimensionScores: {
    clarity: number;
    structure: number;
    relevance: number;
    confidence: number;
    technicalAccuracy: number;
    conciseness: number;
  };
  questionSummaries: Array<{
    questionId: string;
    questionText: string;
    category: string;
    score: number;
    userAnswer: string;
    feedback: string;
  }>;
  identifiedWeakAreas: string[];
  recommendedDrills: string[];
  completedAt: string;
}

export interface EnglishCareerUserState {
  userId: string;
  email: string;
  currentEnglishLevel: 'B2 Upper Intermediate' | 'C1 Advanced Professional' | 'C2 Executive Fluency';
  completedTopicIds: string[];
  masteredVocabIds: string[];
  bookmarkedIds: string[];
  notes: Record<string, { topicId: string; noteText: string; updatedAt: string }>;
  journalEntries: SpeakingJournalEntry[];
  trackedMistakes?: TrackedMistakeRecord[];
  assessmentHistory: AssessmentResultRecord[];
  dailyTrainingLogs: Record<string, DailyTrainingLog>; // dateStr -> Log
  activeDailySession?: DailyTrainingSessionState;
  completedDailyLessons?: CompletedDailyLessonRecord[];
  mockInterviewHistory?: MockInterviewSessionRecord[];
  questionPracticeHistory?: QuestionPracticeRecord[];
  lastActiveTab: string;
  updatedAt: string;
}

export interface SkillDimensionItem {
  id: string;
  name: string;
  score: number; // 0 - 100
  totalCompleted: number;
  totalTarget: number;
  description: string;
  category: string;
  targetTab: string;
  iconName: string;
  badge: string;
}

export interface NextBestActionRecommendation {
  skillId: string;
  skillName: string;
  score: number;
  activityTitle: string;
  activityDescription: string;
  targetTab: string;
  actionParam?: string;
  estimatedMinutes: number;
  badgeText: string;
}

export interface WeeklyCategoryProgress {
  category: string;
  completed: number;
  target: number;
  percent: number;
  isMet: boolean;
}

export interface EnglishCareerMetrics {
  currentLevel: 'B2 Upper Intermediate' | 'C1 Advanced Professional' | 'C2 Executive Fluency' | string;
  overallReadiness: number;
  trainingStreak: number;
  trainingDaysCompleted: number;
  totalSpeakingSessions: number;
  technicalExplanationsCompleted: number;
  mockInterviewsCompleted: number;
  grammarAccuracy: number;
  vocabularyLearned: number;
  totalVocabulary: number;
  commonMistakesCount: number;
  topMistakeCategory: string;

  // 10 Dimensions Breakdown
  tenDimensions: {
    englishFoundation: SkillDimensionItem;
    speaking: SkillDimensionItem;
    grammar: SkillDimensionItem;
    vocabulary: SkillDimensionItem;
    listening: SkillDimensionItem;
    technicalComm: SkillDimensionItem;
    professionalComm: SkillDimensionItem;
    interviewComm: SkillDimensionItem;
    presentation: SkillDimensionItem;
    confidence: SkillDimensionItem;
  };

  weakestSkill: SkillDimensionItem;
  strongestSkill: SkillDimensionItem;
  nextBestAction: NextBestActionRecommendation;

  // Weekly Progress (THIS WEEK)
  thisWeek: {
    grammar: WeeklyCategoryProgress;
    speaking: WeeklyCategoryProgress;
    listening: WeeklyCategoryProgress;
    technical: WeeklyCategoryProgress;
    interview: WeeklyCategoryProgress;
  };

  // Backward compatibility fields
  speakingConfidence: number;
  grammarProgress: number;
  vocabularyProgress: number;
  listeningProgress: number;
  technicalProgress: number;
  interviewProgress: number;
  professionalProgress: number;
  weeklyCompletion: {
    totalDays: number;
    completedDays: number;
    percent: number;
  };
  totalJournalEntries: number;
  averageFluencyRating: number;
}

const STORAGE_CACHE_KEY_PREFIX = 'levelup_english_career_state_';

export function normalizeEnglishUserId(email: string): string {
  return `english_career_${email.trim().toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
}

export function createEmptyEnglishCareerState(email: string): EnglishCareerUserState {
  const cleanEmail = email.trim().toLowerCase();
  const userId = normalizeEnglishUserId(cleanEmail);
  const nowIso = new Date().toISOString();

  return {
    userId,
    email: cleanEmail,
    currentEnglishLevel: 'C1 Advanced Professional',
    completedTopicIds: [],
    masteredVocabIds: [],
    bookmarkedIds: [],
    notes: {},
    journalEntries: [],
    trackedMistakes: [],
    assessmentHistory: [],
    dailyTrainingLogs: {},
    activeDailySession: undefined,
    completedDailyLessons: [],
    mockInterviewHistory: [],
    questionPracticeHistory: [],
    lastActiveTab: 'dashboard',
    updatedAt: nowIso,
  };
}

/**
 * Loads the user's English & Career Communication state.
 * Strictly guards against unauthorized access.
 */
export async function getEnglishCareerState(email?: string | null): Promise<EnglishCareerUserState> {
  if (!email || !isEnglishCareerAllowed(email)) {
    throw new Error('Access denied: Unauthorized English & Career Communication Trainer access.');
  }

  const cleanEmail = email.trim().toLowerCase();
  const userId = normalizeEnglishUserId(cleanEmail);
  const cacheKey = `${STORAGE_CACHE_KEY_PREFIX}${cleanEmail}`;

  // 1. Read LocalStorage cache first for immediate zero-latency render
  let cached: EnglishCareerUserState | null = null;
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(cacheKey);
      if (raw) {
        cached = JSON.parse(raw);
      }
    } catch {
      // ignore
    }
  }

  // 2. Sync with Cloud Firestore
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'english_career_users', userId);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        const firestoreData = snapshot.data() as EnglishCareerUserState;
        if (typeof window !== 'undefined') {
          localStorage.setItem(cacheKey, JSON.stringify(firestoreData));
        }
        return firestoreData;
      } else {
        const initialState = cached || createEmptyEnglishCareerState(cleanEmail);
        await setDoc(docRef, initialState);
        if (typeof window !== 'undefined') {
          localStorage.setItem(cacheKey, JSON.stringify(initialState));
        }
        return initialState;
      }
    } catch (err) {
      console.warn('Firestore fetch notice for english_career_users:', err);
    }
  }

  return cached || createEmptyEnglishCareerState(cleanEmail);
}

/**
 * Saves English Career state to Cloud Firestore and LocalStorage.
 */
export async function saveEnglishCareerState(state: EnglishCareerUserState): Promise<void> {
  if (!state.email || !isEnglishCareerAllowed(state.email)) {
    throw new Error('Access denied: Unauthorized English & Career Communication Trainer access.');
  }

  const cleanEmail = state.email.trim().toLowerCase();
  const userId = normalizeEnglishUserId(cleanEmail);
  const cacheKey = `${STORAGE_CACHE_KEY_PREFIX}${cleanEmail}`;

  state.updatedAt = new Date().toISOString();

  // 1. LocalStorage immediate update
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(cacheKey, JSON.stringify(state));
    } catch {
      // ignore
    }
  }

  // 2. Firestore Cloud Persist
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'english_career_users', userId);
      await setDoc(docRef, state, { merge: true });
    } catch (err) {
      console.error('Failed to persist English Career state to Firebase:', err);
    }
  }
}

/**
 * Calculate dynamic training streak from verified completed daily lessons, daily training logs & journal activity.
 */
export function calculateEnglishStreak(
  logs: Record<string, DailyTrainingLog>,
  journal: SpeakingJournalEntry[],
  completedDailyLessons: CompletedDailyLessonRecord[] = []
): number {
  const activeDates = new Set<string>();

  completedDailyLessons.forEach((l) => {
    if (l.dateStr) activeDates.add(l.dateStr);
  });

  Object.values(logs).forEach((log) => {
    if (log.completed || log.speechDone || log.grammarDone || log.vocabDone) {
      activeDates.add(log.dateStr);
    }
  });

  journal.forEach((j) => {
    if (j.dateStr) activeDates.add(j.dateStr);
  });

  const sorted = Array.from(activeDates).filter(Boolean).sort();
  if (sorted.length === 0) return 0;

  let currentStreak = 0;
  let tempStreak = 0;
  let prevDate: Date | null = null;

  for (const dateStr of sorted) {
    const currDate = new Date(dateStr);
    if (!prevDate) {
      tempStreak = 1;
    } else {
      const diffDays = Math.round((currDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else if (diffDays > 1) {
        tempStreak = 1;
      }
    }
    prevDate = currDate;
  }

  const now = new Date();
  let todayStr = now.toISOString().split('T')[0];
  let yesterdayStr = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  try {
    todayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now);
    yesterdayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(
      new Date(now.getTime() - 24 * 60 * 60 * 1000)
    );
  } catch {}

  const lastDate = sorted[sorted.length - 1];
  if (lastDate === todayStr || lastDate === yesterdayStr) {
    currentStreak = tempStreak;
  } else {
    currentStreak = 0;
  }

  return currentStreak;
}

export function calculateEnglishCareerMetrics(state: EnglishCareerUserState): EnglishCareerMetrics {
  const completedLessons = state.completedDailyLessons || [];
  const journalEntries = state.journalEntries || [];
  const trackedMistakes = state.trackedMistakes || [];
  const mockInterviews = state.mockInterviewHistory || [];
  const questionPractices = state.questionPracticeHistory || [];
  const assessments = state.assessmentHistory || [];
  const completedTopicIds = state.completedTopicIds || [];
  const masteredVocabIds = state.masteredVocabIds || [];

  // =========================================================================
  // 1. 10 INDEPENDENT SKILL DIMENSIONS (0 - 100%)
  // =========================================================================

  // Dimension 1: English Foundation (Core sentence structure & grammar rules)
  const foundationCompleted = completedTopicIds.filter((id) =>
    id.startsWith('mod_1') ||
    id.startsWith('mod_2') ||
    id.startsWith('mod_3') ||
    id.startsWith('l1_') ||
    id.startsWith('l2_') ||
    id.startsWith('g_') ||
    id.includes('foundation')
  ).length;
  const foundationTarget = 15;
  const foundationScore = Math.min(100, Math.round((foundationCompleted / foundationTarget) * 100));

  // Dimension 2: Speaking (Spontaneous speaking, journal entries, fluency)
  const totalSpeakingPrompts = SPEAKING_PROMPTS.length;
  const completedSpeakingPrompts = SPEAKING_PROMPTS.filter((s) => completedTopicIds.includes(s.id)).length;
  const totalSpeakingSessions = journalEntries.length;
  const speakingCompleted = completedSpeakingPrompts + totalSpeakingSessions;
  const speakingTarget = totalSpeakingPrompts + 5;
  const speakingScore = Math.min(100, Math.round((speakingCompleted / speakingTarget) * 100));

  // Dimension 3: Technical Grammar
  const totalGrammar = GRAMMAR_TOPICS.length;
  const completedGrammar = GRAMMAR_TOPICS.filter((g) => completedTopicIds.includes(g.id)).length;
  const grammarScore = totalGrammar > 0 ? Math.min(100, Math.round((completedGrammar / totalGrammar) * 100)) : 0;

  // Dimension 4: Executive Vocabulary
  const totalVocab = VOCABULARY_LIST.length;
  const vocabularyLearned = masteredVocabIds.length;
  const vocabularyScore = totalVocab > 0 ? Math.min(100, Math.round((vocabularyLearned / totalVocab) * 100)) : 0;

  // Dimension 5: Stakeholder Listening & Shadowing
  const totalListening = LISTENING_SCENARIOS.length;
  const completedListening = LISTENING_SCENARIOS.filter((l) => completedTopicIds.includes(l.id)).length;
  const listeningScore = totalListening > 0 ? Math.min(100, Math.round((completedListening / totalListening) * 100)) : 0;

  // Dimension 6: Technical Communication (Architecture, code reviews, technical explanations)
  const completedTechLessons = TECHNICAL_ENGLISH_LESSONS.filter((t) => completedTopicIds.includes(t.id)).length;
  const techQuestionPractices = questionPractices.filter((q) =>
    ['technical', 'dsa', 'aiml', 'project'].includes(q.category?.toLowerCase() || '')
  ).length;
  const techJournalPractices = journalEntries.filter((j) =>
    ['five_minute_tech', 'project_explanation'].includes(j.modeId || '')
  ).length;
  const technicalExplanationsCompleted = completedTechLessons + techQuestionPractices + techJournalPractices;
  const technicalTarget = TECHNICAL_ENGLISH_LESSONS.length + 8;
  const technicalScore = Math.min(100, Math.round((technicalExplanationsCompleted / technicalTarget) * 100));

  // Dimension 7: Professional Communication (Email memos, diplomacy, standups)
  const completedProfEmails = PROFESSIONAL_EMAIL_TEMPLATES.filter((p) => completedTopicIds.includes(p.id)).length;
  const profQuestionPractices = questionPractices.filter((q) =>
    ['workplace', 'situational', 'recruiter'].includes(q.category?.toLowerCase() || '')
  ).length;
  const profJournalPractices = journalEntries.filter((j) =>
    j.modeId === 'workplace_scenario'
  ).length;
  const professionalCompleted = completedProfEmails + profQuestionPractices + profJournalPractices;
  const professionalTarget = PROFESSIONAL_EMAIL_TEMPLATES.length + 5;
  const professionalScore = Math.min(100, Math.round((professionalCompleted / professionalTarget) * 100));

  // Dimension 8: Interview Communication (STAR behavioral, system design, mock interviews)
  const completedInterviewLessons = INTERVIEW_ENGLISH_LESSONS.filter((i) => completedTopicIds.includes(i.id)).length;
  const mockInterviewsCompleted = mockInterviews.length;
  const interviewQuestionsDone = questionPractices.length;
  const interviewCompleted = completedInterviewLessons + mockInterviewsCompleted * 2 + interviewQuestionsDone;
  const interviewTarget = INTERVIEW_ENGLISH_LESSONS.length + 10;
  const interviewScore = Math.min(100, Math.round((interviewCompleted / interviewTarget) * 100));

  // Dimension 9: Presentation & Tech Talks
  const presentationJournal = journalEntries.filter((j) =>
    ['presentation_practice', 'five_minute_tech', 'project_explanation'].includes(j.modeId || '')
  ).length;
  const presentationLessons = completedTopicIds.filter((id) => id.includes('presentation') || id.includes('mod_8') || id.includes('mod_9')).length;
  const presentationCompleted = presentationJournal + presentationLessons;
  const presentationTarget = 6;
  const presentationScore = Math.min(100, Math.round((presentationCompleted / presentationTarget) * 100));

  // Dimension 10: Delivery & Confidence
  let confidenceScore = 0;
  if (journalEntries.length > 0 || mockInterviews.length > 0) {
    const journalConfidenceRatings = journalEntries.map((j) => (j.confidenceScore || j.selfRating || 4) * 20);
    const mockConfidenceRatings = mockInterviews.map((m) => (m.dimensionScores?.confidence || 75));
    const allRatings = [...journalConfidenceRatings, ...mockConfidenceRatings];
    const avgRating = allRatings.reduce((acc, v) => acc + v, 0) / (allRatings.length || 1);
    const totalFillers = journalEntries.reduce((acc, j) => acc + (j.fillerWordCount || 0), 0);
    const avgFillers = journalEntries.length > 0 ? totalFillers / journalEntries.length : 0;
    const fillerPenalty = Math.min(20, Math.round(avgFillers * 3));
    confidenceScore = Math.min(100, Math.max(10, Math.round(avgRating - fillerPenalty)));
  } else if (completedLessons.length > 0) {
    confidenceScore = Math.min(80, 30 + completedLessons.length * 8);
  } else {
    confidenceScore = 0;
  }

  // Build 10 dimensions map
  const tenDimensions = {
    englishFoundation: {
      id: 'englishFoundation',
      name: 'English Foundation',
      score: foundationScore,
      totalCompleted: foundationCompleted,
      totalTarget: foundationTarget,
      description: 'Sentence structures, subject-verb agreement, and basic clauses',
      category: 'Core Language',
      targetTab: 'daily',
      iconName: 'Layers',
      badge: foundationScore >= 80 ? 'Mastered' : foundationScore >= 40 ? 'Developing' : 'Needs Practice',
    },
    speaking: {
      id: 'speaking',
      name: 'Speaking & Fluency',
      score: speakingScore,
      totalCompleted: speakingCompleted,
      totalTarget: speakingTarget,
      description: 'Spontaneous oral delivery, pacing, and filler word suppression',
      category: 'Oral Delivery',
      targetTab: 'speaking',
      iconName: 'Mic',
      badge: speakingScore >= 80 ? 'Fluent' : speakingScore >= 40 ? 'Practicing' : 'Needs Practice',
    },
    grammar: {
      id: 'grammar',
      name: 'Technical Grammar',
      score: grammarScore,
      totalCompleted: completedGrammar,
      totalTarget: totalGrammar,
      description: 'Tenses, active voice, RFC 2119 imperatives, and conditionals',
      category: 'Accuracy',
      targetTab: 'grammar',
      iconName: 'CheckCircle2',
      badge: grammarScore >= 80 ? 'Precise' : grammarScore >= 40 ? 'Developing' : 'Needs Practice',
    },
    vocabulary: {
      id: 'vocabulary',
      name: 'Executive Vocabulary',
      score: vocabularyScore,
      totalCompleted: vocabularyLearned,
      totalTarget: totalVocab,
      description: 'High-impact corporate collocations and engineering verbs',
      category: 'Precision',
      targetTab: 'vocabulary',
      iconName: 'BookOpen',
      badge: vocabularyScore >= 80 ? 'Advanced' : vocabularyScore >= 40 ? 'Expanding' : 'Needs Practice',
    },
    listening: {
      id: 'listening',
      name: 'Stakeholder Listening',
      score: listeningScore,
      totalCompleted: completedListening,
      totalTarget: totalListening,
      description: 'Active listening, speech shadowing, and stakeholder brief decoding',
      category: 'Comprehension',
      targetTab: 'listening',
      iconName: 'Headphones',
      badge: listeningScore >= 80 ? 'Attuned' : listeningScore >= 40 ? 'Active' : 'Needs Practice',
    },
    technicalComm: {
      id: 'technicalComm',
      name: 'Technical Communication',
      score: technicalScore,
      totalCompleted: technicalExplanationsCompleted,
      totalTarget: technicalTarget,
      description: 'System architecture walkthroughs, trade-off defense, and code reviews',
      category: 'Engineering',
      targetTab: 'technical',
      iconName: 'Cpu',
      badge: technicalScore >= 80 ? 'Lead Level' : technicalScore >= 40 ? 'Articulate' : 'Needs Practice',
    },
    professionalComm: {
      id: 'professionalComm',
      name: 'Professional Communication',
      score: professionalScore,
      totalCompleted: professionalCompleted,
      totalTarget: professionalTarget,
      description: 'Executive email memos, diplomatic pushback, and standup updates',
      category: 'Workplace',
      targetTab: 'professional',
      iconName: 'Briefcase',
      badge: professionalScore >= 80 ? 'Executive' : professionalScore >= 40 ? 'Diplomatic' : 'Needs Practice',
    },
    interviewComm: {
      id: 'interviewComm',
      name: 'Interview Communication',
      score: interviewScore,
      totalCompleted: interviewCompleted,
      totalTarget: interviewTarget,
      description: 'STAR behavioral answers, system design defense, and recruiter pitch',
      category: 'Career',
      targetTab: 'interview',
      iconName: 'Award',
      badge: interviewScore >= 80 ? 'Offer Ready' : interviewScore >= 40 ? 'In Training' : 'Needs Practice',
    },
    presentation: {
      id: 'presentation',
      name: 'Presentation & Tech Talks',
      score: presentationScore,
      totalCompleted: presentationCompleted,
      totalTarget: presentationTarget,
      description: 'Slide signposting, audience engagement, and vocal projection',
      category: 'Influence',
      targetTab: 'speaking',
      iconName: 'Sparkles',
      badge: presentationScore >= 80 ? 'Captivating' : presentationScore >= 40 ? 'Practicing' : 'Needs Practice',
    },
    confidence: {
      id: 'confidence',
      name: 'Delivery & Confidence',
      score: confidenceScore,
      totalCompleted: journalEntries.length + mockInterviews.length,
      totalTarget: 10,
      description: 'Self-assurance, authoritative pauses, and anxiety management',
      category: 'Mindset',
      targetTab: 'speaking',
      iconName: 'Flame',
      badge: confidenceScore >= 80 ? 'Unshakable' : confidenceScore >= 40 ? 'Steadily Rising' : 'Needs Practice',
    },
  };

  // =========================================================================
  // 2. WEAKEST & STRONGEST SKILL DETERMINATION
  // =========================================================================
  const dimensionList: SkillDimensionItem[] = Object.values(tenDimensions);
  const sortedByScore = [...dimensionList].sort((a, b) => a.score - b.score);
  const weakestSkill = sortedByScore[0];
  const strongestSkill = sortedByScore[sortedByScore.length - 1];

  // =========================================================================
  // 3. NEXT BEST ACTION RECOMMENDATION ENGINE
  // =========================================================================
  let nextBestAction: NextBestActionRecommendation;
  switch (weakestSkill.id) {
    case 'interviewComm':
      nextBestAction = {
        skillId: 'interviewComm',
        skillName: 'Interview Communication',
        score: weakestSkill.score,
        activityTitle: 'Complete: "Tell me about yourself" practice',
        activityDescription: 'Master the 90-second elevator pitch using the 4-part formula: Current Role, Key Achievement, Tech Superpower, and Target Value.',
        targetTab: 'interview',
        actionParam: 'self_01',
        estimatedMinutes: 10,
        badgeText: 'RECOMMENDED PRACTICE',
      };
      break;
    case 'speaking':
      nextBestAction = {
        skillId: 'speaking',
        skillName: 'Speaking & Fluency',
        score: weakestSkill.score,
        activityTitle: 'Record: 2-Minute Daily Self-Talk',
        activityDescription: 'Speak spontaneously on an unscripted engineering challenge to build oral fluency and eliminate hesitations.',
        targetTab: 'speaking',
        actionParam: 'daily_self_talk',
        estimatedMinutes: 5,
        badgeText: 'FLUENCY DRILL',
      };
      break;
    case 'technicalComm':
      nextBestAction = {
        skillId: 'technicalComm',
        skillName: 'Technical Communication',
        score: weakestSkill.score,
        activityTitle: 'Complete: 5-Minute Technical Project Walkthrough',
        activityDescription: 'Articulate your distributed architecture, throughput bottlenecks, and scaling trade-offs with structured signposting.',
        targetTab: 'speaking',
        actionParam: 'five_minute_tech',
        estimatedMinutes: 8,
        badgeText: 'TECHNICAL DRILL',
      };
      break;
    case 'grammar':
      nextBestAction = {
        skillId: 'grammar',
        skillName: 'Technical Grammar',
        score: weakestSkill.score,
        activityTitle: 'Practice: Past vs Present Perfect Tense Rules',
        activityDescription: 'Eliminate tense shifting when articulating past architectural decisions vs current system capabilities.',
        targetTab: 'grammar',
        actionParam: 'g_past_vs_perfect',
        estimatedMinutes: 6,
        badgeText: 'GRAMMAR ACCURACY',
      };
      break;
    case 'vocabulary':
      nextBestAction = {
        skillId: 'vocabulary',
        skillName: 'Executive Vocabulary',
        score: weakestSkill.score,
        activityTitle: 'Master: 10 High-Precision Engineering Verbs',
        activityDescription: 'Upgrade simple verbs with executive verbs like "orchestrated", "decoupled", "benchmarked", and "streamlined".',
        targetTab: 'vocabulary',
        estimatedMinutes: 5,
        badgeText: 'VOCAB EXPANSION',
      };
      break;
    case 'listening':
      nextBestAction = {
        skillId: 'listening',
        skillName: 'Stakeholder Listening',
        score: weakestSkill.score,
        activityTitle: 'Complete: Active Listening & Speech Shadowing Drill',
        activityDescription: 'Listen to a fast-paced incident post-mortem recording and shadow native cadence and stress patterns.',
        targetTab: 'listening',
        estimatedMinutes: 7,
        badgeText: 'COMPREHENSION & CADENCE',
      };
      break;
    case 'professionalComm':
      nextBestAction = {
        skillId: 'professionalComm',
        skillName: 'Professional Communication',
        score: weakestSkill.score,
        activityTitle: 'Draft: Executive Incident Post-Mortem Memo',
        activityDescription: 'Apply the BLUF (Bottom Line Up Front) model to summarize root cause, customer impact, and remediation steps diplomatically.',
        targetTab: 'professional',
        estimatedMinutes: 8,
        badgeText: 'EXECUTIVE WRITING',
      };
      break;
    case 'presentation':
      nextBestAction = {
        skillId: 'presentation',
        skillName: 'Presentation & Tech Talks',
        score: weakestSkill.score,
        activityTitle: 'Rehearse: Tech Talk Slide Signposting & Transitions',
        activityDescription: 'Practice vocal projection, opening hooks, and slide transition phrasing for your upcoming engineering presentation.',
        targetTab: 'speaking',
        actionParam: 'presentation_practice',
        estimatedMinutes: 10,
        badgeText: 'PRESENTATION DRILL',
      };
      break;
    case 'confidence':
      nextBestAction = {
        skillId: 'confidence',
        skillName: 'Delivery & Confidence',
        score: weakestSkill.score,
        activityTitle: 'Complete: Filler Word Reduction & Pause Replacement Drill',
        activityDescription: 'Replace verbal fillers ("um", "like", "you know") with calm 1-second pauses to command authoritative room presence.',
        targetTab: 'speaking',
        actionParam: 'two_minute_challenge',
        estimatedMinutes: 5,
        badgeText: 'CONFIDENCE & PRESENCE',
      };
      break;
    default:
      nextBestAction = {
        skillId: 'englishFoundation',
        skillName: 'English Foundation',
        score: weakestSkill.score,
        activityTitle: 'Complete: Day 1 Foundation Training Drill',
        activityDescription: 'Solidify foundational sentence structures, compound clause connectors, and core technical phrasing.',
        targetTab: 'daily',
        estimatedMinutes: 15,
        badgeText: 'FOUNDATION ESSENTIALS',
      };
      break;
  }

  // =========================================================================
  // 4. ACCURACY & MISTAKES COMPUTATION
  // =========================================================================
  let grammarAccuracy = 100;
  if (assessments.length > 0) {
    const totalScore = assessments.reduce((acc, a) => acc + (a.scorePercent || 0), 0);
    grammarAccuracy = Math.round(totalScore / assessments.length);
  } else if (trackedMistakes.length > 0) {
    const unresolved = trackedMistakes.filter((m) => !m.resolved).length;
    grammarAccuracy = Math.max(65, Math.min(100, 100 - unresolved * 5));
  } else if (completedGrammar > 0) {
    grammarAccuracy = 95;
  }

  const unresolvedMistakes = trackedMistakes.filter((m) => !m.resolved);
  const commonMistakesCount = unresolvedMistakes.length;
  let topMistakeCategory = 'None Detected';
  if (unresolvedMistakes.length > 0) {
    const categoryCounts: Record<string, number> = {};
    for (const m of unresolvedMistakes) {
      const cat = m.categoryLabel || m.category || 'General';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + (m.occurrenceCount || 1);
    }
    const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
    if (sortedCategories.length > 0) {
      topMistakeCategory = sortedCategories[0][0];
    }
  }

  // =========================================================================
  // 5. THIS WEEK PROGRESS (ACTUAL 7-DAY COMPLETION)
  // =========================================================================
  const now = new Date();
  const past7DaysDateKeys: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    past7DaysDateKeys.push(d.toISOString().split('T')[0]);
  }

  // Grammar done this week
  let weekGrammarDone = 0;
  for (const dateKey of past7DaysDateKeys) {
    if (state.dailyTrainingLogs[dateKey]?.grammarDone) weekGrammarDone++;
  }
  const weekAssessments = assessments.filter((a) =>
    past7DaysDateKeys.includes(a.dateStr || a.completedAt?.split('T')[0])
  );
  weekGrammarDone += weekAssessments.length;
  const weekDailyLessons = completedLessons.filter((l) =>
    past7DaysDateKeys.includes(l.dateStr || l.completedAt?.split('T')[0])
  );

  // Speaking done this week
  const weekSpeakingEntries = journalEntries.filter((j) =>
    past7DaysDateKeys.includes(j.dateStr || j.timestamp?.split('T')[0])
  ).length;
  let weekSpeakingLogs = 0;
  for (const dateKey of past7DaysDateKeys) {
    if (state.dailyTrainingLogs[dateKey]?.speechDone) weekSpeakingLogs++;
  }
  const weekSpeakingDone = Math.max(weekSpeakingEntries, weekSpeakingLogs);

  // Listening done this week
  let weekListeningDone = 0;
  for (const dateKey of past7DaysDateKeys) {
    if (state.dailyTrainingLogs[dateKey]?.completed) weekListeningDone++;
  }
  weekListeningDone = Math.max(weekListeningDone, weekDailyLessons.length);

  // Technical done this week
  const weekTechQuestions = questionPractices.filter((q) =>
    past7DaysDateKeys.includes(q.completedAt?.split('T')[0]) &&
    ['technical', 'dsa', 'aiml', 'project'].includes(q.category?.toLowerCase() || '')
  ).length;
  const weekTechJournal = journalEntries.filter((j) =>
    past7DaysDateKeys.includes(j.dateStr || j.timestamp?.split('T')[0]) &&
    ['five_minute_tech', 'project_explanation'].includes(j.modeId || '')
  ).length;
  const weekTechDone = weekTechQuestions + weekTechJournal + weekDailyLessons.length;

  // Interview done this week
  const weekMockInterviews = mockInterviews.filter((m) =>
    past7DaysDateKeys.includes(m.dateStr || m.completedAt?.split('T')[0])
  ).length;
  const weekInterviewQuestions = questionPractices.filter((q) =>
    past7DaysDateKeys.includes(q.completedAt?.split('T')[0]) &&
    ['self_introduction', 'hr', 'behavioral', 'situational', 'recruiter'].includes(q.category?.toLowerCase() || '')
  ).length;
  const weekInterviewDone = weekMockInterviews + weekInterviewQuestions + (weekDailyLessons.length > 0 ? 1 : 0);

  const thisWeek = {
    grammar: {
      category: 'Grammar',
      completed: Math.min(5, weekGrammarDone),
      target: 5,
      percent: Math.min(100, Math.round((Math.min(5, weekGrammarDone) / 5) * 100)),
      isMet: weekGrammarDone >= 5,
    },
    speaking: {
      category: 'Speaking',
      completed: Math.min(5, weekSpeakingDone),
      target: 5,
      percent: Math.min(100, Math.round((Math.min(5, weekSpeakingDone) / 5) * 100)),
      isMet: weekSpeakingDone >= 5,
    },
    listening: {
      category: 'Listening',
      completed: Math.min(5, weekListeningDone),
      target: 5,
      percent: Math.min(100, Math.round((Math.min(5, weekListeningDone) / 5) * 100)),
      isMet: weekListeningDone >= 5,
    },
    technical: {
      category: 'Technical',
      completed: Math.min(5, weekTechDone),
      target: 5,
      percent: Math.min(100, Math.round((Math.min(5, weekTechDone) / 5) * 100)),
      isMet: weekTechDone >= 5,
    },
    interview: {
      category: 'Interview',
      completed: Math.min(3, weekInterviewDone),
      target: 3,
      percent: Math.min(100, Math.round((Math.min(3, weekInterviewDone) / 3) * 100)),
      isMet: weekInterviewDone >= 3,
    },
  };

  // =========================================================================
  // 6. OVERALL READINESS & STREAK
  // =========================================================================
  const streak = calculateEnglishStreak(state.dailyTrainingLogs, state.journalEntries, completedLessons);

  const overallReadiness = Math.min(
    100,
    Math.round(
      foundationScore * 0.10 +
      speakingScore * 0.15 +
      grammarScore * 0.10 +
      vocabularyScore * 0.10 +
      listeningScore * 0.05 +
      technicalScore * 0.15 +
      professionalScore * 0.10 +
      interviewScore * 0.15 +
      presentationScore * 0.05 +
      confidenceScore * 0.05
    )
  );

  // CEFR Level Mapping
  let currentLevel: 'B2 Upper Intermediate' | 'C1 Advanced Professional' | 'C2 Executive Fluency' = 'C1 Advanced Professional';
  if (overallReadiness >= 85) {
    currentLevel = 'C2 Executive Fluency';
  } else if (overallReadiness < 40) {
    currentLevel = 'B2 Upper Intermediate';
  }

  // Weekly Completion Summary
  let past7DaysActive = 0;
  for (const dateKey of past7DaysDateKeys) {
    const isCompletedLesson = completedLessons.some((l) => l.dateStr === dateKey);
    if (
      isCompletedLesson ||
      state.dailyTrainingLogs[dateKey]?.completed ||
      state.journalEntries.some((j) => j.dateStr === dateKey)
    ) {
      past7DaysActive++;
    }
  }

  const weeklyCompletion = {
    totalDays: 7,
    completedDays: past7DaysActive,
    percent: Math.round((past7DaysActive / 7) * 100),
  };

  const avgFluency =
    journalEntries.length > 0
      ? Number((journalEntries.reduce((acc, j) => acc + (j.selfRating || 4), 0) / journalEntries.length).toFixed(1))
      : 4.5;

  return {
    currentLevel,
    overallReadiness,
    trainingStreak: streak,
    trainingDaysCompleted: completedLessons.length,
    totalSpeakingSessions,
    technicalExplanationsCompleted,
    mockInterviewsCompleted,
    grammarAccuracy,
    vocabularyLearned,
    totalVocabulary: totalVocab,
    commonMistakesCount,
    topMistakeCategory,
    tenDimensions,
    weakestSkill,
    strongestSkill,
    nextBestAction,
    thisWeek,
    speakingConfidence: confidenceScore,
    grammarProgress: grammarScore,
    vocabularyProgress: vocabularyScore,
    listeningProgress: listeningScore,
    technicalProgress: technicalScore,
    interviewProgress: interviewScore,
    professionalProgress: professionalScore,
    weeklyCompletion,
    totalJournalEntries: journalEntries.length,
    averageFluencyRating: avgFluency,
  };
}

/**
 * Toggle topic completion status.
 */
export async function toggleTopicCompletion(
  currentState: EnglishCareerUserState,
  topicId: string
): Promise<EnglishCareerUserState> {
  const exists = currentState.completedTopicIds.includes(topicId);
  const nextCompleted = exists
    ? currentState.completedTopicIds.filter((id) => id !== topicId)
    : [...currentState.completedTopicIds, topicId];

  const nextState: EnglishCareerUserState = {
    ...currentState,
    completedTopicIds: nextCompleted,
  };

  await saveEnglishCareerState(nextState);
  return nextState;
}

/**
 * Toggle mastery of a vocabulary flashcard.
 */
export async function toggleFlashcardMastery(
  currentState: EnglishCareerUserState,
  vocabId: string
): Promise<EnglishCareerUserState> {
  const exists = currentState.masteredVocabIds.includes(vocabId);
  const nextMastered = exists
    ? currentState.masteredVocabIds.filter((id) => id !== vocabId)
    : [...currentState.masteredVocabIds, vocabId];

  const nextState: EnglishCareerUserState = {
    ...currentState,
    masteredVocabIds: nextMastered,
  };

  await saveEnglishCareerState(nextState);
  return nextState;
}

/**
 * Save a speaking journal entry.
 */
export async function saveSpeakingJournalEntry(
  currentState: EnglishCareerUserState,
  entry: Omit<SpeakingJournalEntry, 'id' | 'timestamp'>
): Promise<EnglishCareerUserState> {
  const id = `entry_${Date.now()}`;
  const newEntry: SpeakingJournalEntry = {
    ...entry,
    id,
    timestamp: new Date().toISOString(),
  };

  const nextJournal = [newEntry, ...currentState.journalEntries];

  // Also log daily speech practice
  const dateKey = entry.dateStr || new Date().toISOString().split('T')[0];
  const existingLog = currentState.dailyTrainingLogs[dateKey] || {
    dateStr: dateKey,
    speechDone: false,
    grammarDone: false,
    vocabDone: false,
    completed: false,
    updatedAt: new Date().toISOString(),
  };

  const updatedLog: DailyTrainingLog = {
    ...existingLog,
    speechDone: true,
    completed: existingLog.grammarDone && existingLog.vocabDone,
    updatedAt: new Date().toISOString(),
  };

  const nextState: EnglishCareerUserState = {
    ...currentState,
    journalEntries: nextJournal,
    dailyTrainingLogs: {
      ...currentState.dailyTrainingLogs,
      [dateKey]: updatedLog,
    },
  };

  await saveEnglishCareerState(nextState);
  return nextState;
}

/**
 * Delete a speaking journal entry.
 */
export async function deleteSpeakingJournalEntry(
  currentState: EnglishCareerUserState,
  entryId: string
): Promise<EnglishCareerUserState> {
  const nextJournal = currentState.journalEntries.filter((j) => j.id !== entryId);

  const nextState: EnglishCareerUserState = {
    ...currentState,
    journalEntries: nextJournal,
  };

  await saveEnglishCareerState(nextState);
  return nextState;
}

/**
 * Log completion of a daily micro-training part.
 */
export async function logDailyTrainingPart(
  currentState: EnglishCareerUserState,
  dateStr: string,
  part: 'speech' | 'grammar' | 'vocab'
): Promise<EnglishCareerUserState> {
  const existingLog = currentState.dailyTrainingLogs[dateStr] || {
    dateStr,
    speechDone: false,
    grammarDone: false,
    vocabDone: false,
    completed: false,
    updatedAt: new Date().toISOString(),
  };

  const updatedLog: DailyTrainingLog = {
    ...existingLog,
    speechDone: part === 'speech' ? true : existingLog.speechDone,
    grammarDone: part === 'grammar' ? true : existingLog.grammarDone,
    vocabDone: part === 'vocab' ? true : existingLog.vocabDone,
    updatedAt: new Date().toISOString(),
  };
  updatedLog.completed = updatedLog.speechDone && updatedLog.grammarDone && updatedLog.vocabDone;

  const nextState: EnglishCareerUserState = {
    ...currentState,
    dailyTrainingLogs: {
      ...currentState.dailyTrainingLogs,
      [dateStr]: updatedLog,
    },
  };

  await saveEnglishCareerState(nextState);
  return nextState;
}

/**
 * Save an assessment test result.
 */
export async function saveAssessmentResult(
  currentState: EnglishCareerUserState,
  result: Omit<AssessmentResultRecord, 'id' | 'completedAt'>
): Promise<EnglishCareerUserState> {
  const id = `assessment_${Date.now()}`;
  const record: AssessmentResultRecord = {
    ...result,
    id,
    completedAt: new Date().toISOString(),
  };

  const nextState: EnglishCareerUserState = {
    ...currentState,
    assessmentHistory: [record, ...currentState.assessmentHistory],
  };

  await saveEnglishCareerState(nextState);
  return nextState;
}

/**
 * Save or update topic note.
 */
export async function saveTopicNote(
  currentState: EnglishCareerUserState,
  topicId: string,
  noteText: string
): Promise<EnglishCareerUserState> {
  const nextNotes = {
    ...currentState.notes,
    [topicId]: {
      topicId,
      noteText,
      updatedAt: new Date().toISOString(),
    },
  };

  const nextState: EnglishCareerUserState = {
    ...currentState,
    notes: nextNotes,
  };

  await saveEnglishCareerState(nextState);
  return nextState;
}

/**
 * Toggle bookmark for a topic.
 */
export async function toggleBookmark(
  currentState: EnglishCareerUserState,
  topicId: string
): Promise<EnglishCareerUserState> {
  const exists = currentState.bookmarkedIds.includes(topicId);
  const nextBookmarks = exists
    ? currentState.bookmarkedIds.filter((id) => id !== topicId)
    : [...currentState.bookmarkedIds, topicId];

  const nextState: EnglishCareerUserState = {
    ...currentState,
    bookmarkedIds: nextBookmarks,
  };

  await saveEnglishCareerState(nextState);
  return nextState;
}

/**
 * Saves or updates in-progress Daily Training Session state.
 * Allows seamless restoration if user refreshes or leaves halfway.
 */
export async function saveActiveDailySession(
  currentState: EnglishCareerUserState,
  session: DailyTrainingSessionState
): Promise<EnglishCareerUserState> {
  const nextSession = {
    ...session,
    lastUpdated: new Date().toISOString(),
  };

  const nextState: EnglishCareerUserState = {
    ...currentState,
    activeDailySession: nextSession,
  };

  await saveEnglishCareerState(nextState);
  return nextState;
}

/**
 * Marks an entire Daily Training Day as fully completed.
 * Updates streak, appends to completedDailyLessons, marks daily log, and clears active session.
 */
export async function completeDailyTrainingDay(
  currentState: EnglishCareerUserState,
  dayNumber: number,
  timeSpentMinutes: number,
  selfRating: number,
  journalSummary?: string
): Promise<EnglishCareerUserState> {
  const now = new Date();
  let todayStr = now.toISOString().split('T')[0];
  try {
    todayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now);
  } catch {}

  const completedRecord: CompletedDailyLessonRecord = {
    id: `daily_day_${dayNumber}_${Date.now()}`,
    dayNumber,
    dateStr: todayStr,
    completedAt: now.toISOString(),
    timeSpentMinutes,
    pillarsCompletedCount: 6,
    selfRating,
    journalSummary,
  };

  const existingCompleted = currentState.completedDailyLessons || [];
  // Avoid duplicate records for the same day
  const filteredCompleted = existingCompleted.filter((l) => l.dayNumber !== dayNumber);
  const nextCompletedList = [completedRecord, ...filteredCompleted];

  // Update dailyTrainingLogs for today
  const existingLog = currentState.dailyTrainingLogs[todayStr] || {
    dateStr: todayStr,
    speechDone: false,
    grammarDone: false,
    vocabDone: false,
    completed: false,
    updatedAt: now.toISOString(),
  };

  const updatedLog: DailyTrainingLog = {
    ...existingLog,
    speechDone: true,
    grammarDone: true,
    vocabDone: true,
    completed: true,
    updatedAt: now.toISOString(),
  };

  const nextState: EnglishCareerUserState = {
    ...currentState,
    completedDailyLessons: nextCompletedList,
    dailyTrainingLogs: {
      ...currentState.dailyTrainingLogs,
      [todayStr]: updatedLog,
    },
    activeDailySession: currentState.activeDailySession
      ? {
          ...currentState.activeDailySession,
          isDayComplete: true,
          completedAt: now.toISOString(),
          lastUpdated: now.toISOString(),
        }
      : undefined,
  };

  await saveEnglishCareerState(nextState);
  return nextState;
}

/**
 * Record or increment occurrence count for detected mistakes.
 */
export async function recordDetectedMistakes(
  currentState: EnglishCareerUserState,
  detectedList: Array<{
    category: MistakeCategory;
    categoryLabel?: string;
    originalSnippet: string;
    correctedSnippet: string;
    explanation: string;
  }>
): Promise<EnglishCareerUserState> {
  const existing = [...(currentState.trackedMistakes || [])];
  const now = new Date().toISOString();

  for (const item of detectedList) {
    const cleanOrig = item.originalSnippet.trim().toLowerCase();
    const foundIdx = existing.findIndex(
      (m) =>
        m.category === item.category &&
        (m.originalSnippet.trim().toLowerCase() === cleanOrig || m.explanation === item.explanation)
    );

    if (foundIdx >= 0) {
      existing[foundIdx] = {
        ...existing[foundIdx],
        occurrenceCount: existing[foundIdx].occurrenceCount + 1,
        lastSeenAt: now,
        correctedSnippet: item.correctedSnippet,
        resolved: false,
      };
    } else {
      existing.unshift({
        id: `mstk_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        category: item.category,
        categoryLabel: item.categoryLabel,
        originalSnippet: item.originalSnippet,
        correctedSnippet: item.correctedSnippet,
        explanation: item.explanation,
        occurrenceCount: 1,
        firstSeenAt: now,
        lastSeenAt: now,
        resolved: false,
      });
    }
  }

  const nextState: EnglishCareerUserState = {
    ...currentState,
    trackedMistakes: existing,
    updatedAt: now,
  };

  await saveEnglishCareerState(nextState);
  return nextState;
}

/**
 * Toggle resolved status of a tracked mistake.
 */
export async function toggleMistakeResolved(
  currentState: EnglishCareerUserState,
  mistakeId: string
): Promise<EnglishCareerUserState> {
  const existing = [...(currentState.trackedMistakes || [])];
  const idx = existing.findIndex((m) => m.id === mistakeId);
  if (idx >= 0) {
    existing[idx] = {
      ...existing[idx],
      resolved: !existing[idx].resolved,
    };
  }

  const nextState: EnglishCareerUserState = {
    ...currentState,
    trackedMistakes: existing,
    updatedAt: new Date().toISOString(),
  };

  await saveEnglishCareerState(nextState);
  return nextState;
}

/**
 * Delete a tracked mistake record.
 */
export async function deleteTrackedMistake(
  currentState: EnglishCareerUserState,
  mistakeId: string
): Promise<EnglishCareerUserState> {
  const existing = (currentState.trackedMistakes || []).filter((m) => m.id !== mistakeId);
  const nextState: EnglishCareerUserState = {
    ...currentState,
    trackedMistakes: existing,
    updatedAt: new Date().toISOString(),
  };

  await saveEnglishCareerState(nextState);
  return nextState;
}

/**
 * Save a completed mock interview session record.
 */
export async function saveMockInterviewSession(
  currentState: EnglishCareerUserState,
  session: MockInterviewSessionRecord
): Promise<EnglishCareerUserState> {
  const existing = [session, ...(currentState.mockInterviewHistory || [])];
  // Keep up to 50 sessions
  const trimmed = existing.slice(0, 50);

  const nextState: EnglishCareerUserState = {
    ...currentState,
    mockInterviewHistory: trimmed,
    updatedAt: new Date().toISOString(),
  };

  await saveEnglishCareerState(nextState);
  return nextState;
}

/**
 * Delete a mock interview session record from history.
 */
export async function deleteMockInterviewSession(
  currentState: EnglishCareerUserState,
  sessionId: string
): Promise<EnglishCareerUserState> {
  const existing = (currentState.mockInterviewHistory || []).filter((s) => s.id !== sessionId);

  const nextState: EnglishCareerUserState = {
    ...currentState,
    mockInterviewHistory: existing,
    updatedAt: new Date().toISOString(),
  };

  await saveEnglishCareerState(nextState);
  return nextState;
}

/**
 * Save a question practice response log.
 */
export async function saveQuestionPracticeLog(
  currentState: EnglishCareerUserState,
  practiceRecord: QuestionPracticeRecord
): Promise<EnglishCareerUserState> {
  const existing = [practiceRecord, ...(currentState.questionPracticeHistory || [])];
  const trimmed = existing.slice(0, 100);

  // Mark the question / topic as practiced/completed if not already present
  const completedTopicIds = Array.from(
    new Set([...currentState.completedTopicIds, `interview_q_${practiceRecord.questionId}`])
  );

  const nextState: EnglishCareerUserState = {
    ...currentState,
    completedTopicIds,
    questionPracticeHistory: trimmed,
    updatedAt: new Date().toISOString(),
  };

  await saveEnglishCareerState(nextState);
  return nextState;
}



