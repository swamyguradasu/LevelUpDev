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

export interface EnglishCareerMetrics {
  currentLevel: string;
  overallReadiness: number;
  speakingConfidence: number;
  grammarProgress: number;
  vocabularyProgress: number;
  listeningProgress: number;
  technicalProgress: number;
  interviewProgress: number;
  professionalProgress: number;
  trainingStreak: number;
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

/**
 * Computes all dashboard metrics dynamically.
 */
export function calculateEnglishCareerMetrics(state: EnglishCareerUserState): EnglishCareerMetrics {
  const completedLessons = state.completedDailyLessons || [];
  const totalGrammar = GRAMMAR_TOPICS.length;
  const completedGrammar = GRAMMAR_TOPICS.filter((g) => state.completedTopicIds.includes(g.id)).length;
  const grammarProgress = totalGrammar > 0 ? Math.round((completedGrammar / totalGrammar) * 100) : 0;

  const totalVocab = VOCABULARY_LIST.length;
  const completedVocab = state.masteredVocabIds.length;
  const vocabularyProgress = totalVocab > 0 ? Math.min(100, Math.round((completedVocab / totalVocab) * 100)) : 0;

  const totalListening = LISTENING_SCENARIOS.length;
  const completedListening = LISTENING_SCENARIOS.filter((l) => state.completedTopicIds.includes(l.id)).length;
  const listeningProgress = totalListening > 0 ? Math.round((completedListening / totalListening) * 100) : 0;

  const totalTech = TECHNICAL_ENGLISH_LESSONS.length;
  const completedTech = TECHNICAL_ENGLISH_LESSONS.filter((t) => state.completedTopicIds.includes(t.id)).length;
  const technicalProgress = totalTech > 0 ? Math.round((completedTech / totalTech) * 100) : 0;

  const totalInterview = INTERVIEW_ENGLISH_LESSONS.length;
  const completedInterview = INTERVIEW_ENGLISH_LESSONS.filter((i) => state.completedTopicIds.includes(i.id)).length;
  const interviewProgress = totalInterview > 0 ? Math.round((completedInterview / totalInterview) * 100) : 0;

  const totalProf = PROFESSIONAL_EMAIL_TEMPLATES.length;
  const completedProf = PROFESSIONAL_EMAIL_TEMPLATES.filter((p) => state.completedTopicIds.includes(p.id)).length;
  const professionalProgress = totalProf > 0 ? Math.round((completedProf / totalProf) * 100) : 0;

  // Speaking confidence based on completed speaking prompts, completed daily lessons, and journal ratings
  const totalSpeakingPrompts = SPEAKING_PROMPTS.length;
  const completedSpeaking = SPEAKING_PROMPTS.filter((s) => state.completedTopicIds.includes(s.id)).length;
  const journalCount = state.journalEntries.length;
  const speakingConfidence = Math.min(
    100,
    Math.round(
      (completedSpeaking / totalSpeakingPrompts) * 40 +
      Math.min(30, journalCount * 8) +
      Math.min(30, completedLessons.length * 6)
    )
  );

  // Training streak
  const streak = calculateEnglishStreak(state.dailyTrainingLogs, state.journalEntries, completedLessons);

  // Weekly completion (past 7 days)
  const now = new Date();
  let past7DaysCompleted = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateKey = d.toISOString().split('T')[0];
    const isCompletedLesson = completedLessons.some((l) => l.dateStr === dateKey);
    if (isCompletedLesson || state.dailyTrainingLogs[dateKey]?.completed || state.journalEntries.some((j) => j.dateStr === dateKey)) {
      past7DaysCompleted++;
    }
  }
  const weeklyCompletion = {
    totalDays: 7,
    completedDays: past7DaysCompleted,
    percent: Math.round((past7DaysCompleted / 7) * 100),
  };

  // Overall readiness index (weighted aggregate)
  const weightedScore =
    speakingConfidence * 0.25 +
    interviewProgress * 0.2 +
    technicalProgress * 0.15 +
    professionalProgress * 0.15 +
    vocabularyProgress * 0.1 +
    grammarProgress * 0.1 +
    listeningProgress * 0.05;

  const overallReadiness = Math.min(100, Math.round(weightedScore));

  // Determine English CEFR level
  let currentLevel = 'C1 Advanced Professional';
  if (overallReadiness >= 85) {
    currentLevel = 'C2 Executive Fluency';
  } else if (overallReadiness < 40) {
    currentLevel = 'B2 Upper Intermediate';
  }

  // Average journal rating
  const avgRating =
    state.journalEntries.length > 0
      ? Number((state.journalEntries.reduce((acc, j) => acc + j.selfRating, 0) / state.journalEntries.length).toFixed(1))
      : 4.5;

  return {
    currentLevel,
    overallReadiness,
    speakingConfidence,
    grammarProgress,
    vocabularyProgress,
    listeningProgress,
    technicalProgress,
    interviewProgress,
    professionalProgress,
    trainingStreak: streak,
    weeklyCompletion,
    totalJournalEntries: journalCount,
    averageFluencyRating: avgRating,
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



