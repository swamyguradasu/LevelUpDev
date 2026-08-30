import { db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { isPlacementPrepAllowed } from '@/lib/content';
import {
  PlacementCategory,
  PlacementLevel,
  PlacementConcept,
  PlacementTopic,
  PLACEMENT_CATEGORIES,
  getTotalPlacementTopicsCount,
} from '@/data/placementPrepData';

export interface PlacementTopicProgress {
  topicId: string;
  categoryId: string;
  levelId: string;
  conceptId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completedAt?: string | null;
  lastStudiedAt: string;
  timeSpentSeconds?: number;
}

export interface PlacementTopicNote {
  topicId: string;
  noteText: string;
  updatedAt: string;
}

export interface PlacementMockTestResult {
  id: string;
  testId: string;
  category: string;
  difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Hard';
  score: number;
  totalQuestions: number;
  accuracy: number;
  timeTakenSeconds: number;
  completedAt: string;
}

export interface PlacementMockInterviewResult {
  id: string;
  interviewId: string;
  category: string;
  answers: Record<string, string>;
  completedAt: string;
}

export interface PlacementUserState {
  userId: string;
  email: string;
  topicProgress: Record<string, PlacementTopicProgress>; // topicId -> progress
  notes: Record<string, PlacementTopicNote>; // topicId -> note
  bookmarks: string[]; // topicIds
  mockTestResults: PlacementMockTestResult[];
  mockInterviewResults: PlacementMockInterviewResult[];
  currentFocusTopicId: string | null;
  currentFocusCategoryId: string | null;
  lastActiveTopicId: string | null;
  lastActiveCategoryId: string | null;
  updatedAt: string;
}

const LOCAL_STORAGE_KEY_PREFIX = 'levelup_placement_prep_state_';

export function normalizePlacementUserId(email: string): string {
  return `placement_${email.trim().toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
}

export function createEmptyPlacementState(email: string): PlacementUserState {
  const userId = normalizePlacementUserId(email);
  const nowIso = new Date().toISOString();

  return {
    userId,
    email: email.trim().toLowerCase(),
    topicProgress: {},
    notes: {},
    bookmarks: [],
    mockTestResults: [],
    mockInterviewResults: [],
    currentFocusTopicId: null,
    currentFocusCategoryId: null,
    lastActiveTopicId: null,
    lastActiveCategoryId: null,
    updatedAt: nowIso,
  };
}

/**
 * Loads the personal Placement Preparation state from Firestore (or LocalStorage cache).
 * Strictly guards against unauthorized email access.
 */
export async function getPlacementUserState(email?: string | null): Promise<PlacementUserState> {
  if (!email || !isPlacementPrepAllowed(email)) {
    throw new Error('Access denied: Unauthorized placement preparation access.');
  }

  const cleanEmail = email.trim().toLowerCase();
  const userId = normalizePlacementUserId(cleanEmail);
  const cacheKey = `${LOCAL_STORAGE_KEY_PREFIX}${cleanEmail}`;

  // 1. Check LocalStorage cache for instant load
  let cachedState: PlacementUserState | null = null;
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(cacheKey);
      if (raw) {
        cachedState = JSON.parse(raw);
      }
    } catch {
      // ignore
    }
  }

  // 2. Fetch from Firebase Firestore
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'placement_prep_users', userId);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        const firestoreData = snapshot.data() as PlacementUserState;
        // Update local cache
        if (typeof window !== 'undefined') {
          localStorage.setItem(cacheKey, JSON.stringify(firestoreData));
        }
        return firestoreData;
      } else {
        // Initialize empty state in Firestore
        const initialState = cachedState || createEmptyPlacementState(cleanEmail);
        await setDoc(docRef, initialState);
        if (typeof window !== 'undefined') {
          localStorage.setItem(cacheKey, JSON.stringify(initialState));
        }
        return initialState;
      }
    } catch (err) {
      console.warn('Firebase placement state fetch error, falling back to local storage:', err);
    }
  }

  return cachedState || createEmptyPlacementState(cleanEmail);
}

/**
 * Saves updated placement state to Firestore and updates the local cache.
 */
export async function savePlacementUserState(state: PlacementUserState): Promise<void> {
  if (!state.email || !isPlacementPrepAllowed(state.email)) {
    throw new Error('Access denied: Unauthorized placement preparation access.');
  }

  const cleanEmail = state.email.trim().toLowerCase();
  const userId = normalizePlacementUserId(cleanEmail);
  const cacheKey = `${LOCAL_STORAGE_KEY_PREFIX}${cleanEmail}`;

  state.updatedAt = new Date().toISOString();

  // 1. Update local cache immediately
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(cacheKey, JSON.stringify(state));
    } catch {
      // ignore
    }
  }

  // 2. Persist to Firebase Firestore
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'placement_prep_users', userId);
      await setDoc(docRef, state, { merge: true });
    } catch (err) {
      console.error('Failed to persist placement state to Firebase:', err);
    }
  }
}

/**
 * Updates a topic status (completed, in_progress, not_started) and sets active focus.
 */
export async function updateTopicStatus(
  currentState: PlacementUserState,
  categoryId: string,
  levelId: string,
  conceptId: string,
  topicId: string,
  status: 'not_started' | 'in_progress' | 'completed'
): Promise<PlacementUserState> {
  const nowIso = new Date().toISOString();

  const nextProgress: Record<string, PlacementTopicProgress> = {
    ...currentState.topicProgress,
    [topicId]: {
      topicId,
      categoryId,
      levelId,
      conceptId,
      status,
      completedAt: status === 'completed' ? nowIso : null,
      lastStudiedAt: nowIso,
    },
  };

  const nextState: PlacementUserState = {
    ...currentState,
    topicProgress: nextProgress,
    lastActiveTopicId: topicId,
    lastActiveCategoryId: categoryId,
    currentFocusTopicId: status === 'completed' ? currentState.currentFocusTopicId : topicId,
    currentFocusCategoryId: status === 'completed' ? currentState.currentFocusCategoryId : categoryId,
  };

  await savePlacementUserState(nextState);
  return nextState;
}

/**
 * Saves a personal note for a specific topic.
 */
export async function savePlacementTopicNote(
  currentState: PlacementUserState,
  topicId: string,
  noteText: string
): Promise<PlacementUserState> {
  const nowIso = new Date().toISOString();

  const nextNotes: Record<string, PlacementTopicNote> = {
    ...currentState.notes,
    [topicId]: {
      topicId,
      noteText,
      updatedAt: nowIso,
    },
  };

  const nextState: PlacementUserState = {
    ...currentState,
    notes: nextNotes,
  };

  await savePlacementUserState(nextState);
  return nextState;
}

/**
 * Toggles a bookmark for a specific topic.
 */
export async function togglePlacementBookmark(
  currentState: PlacementUserState,
  topicId: string
): Promise<PlacementUserState> {
  const exists = currentState.bookmarks.includes(topicId);
  const nextBookmarks = exists
    ? currentState.bookmarks.filter((id) => id !== topicId)
    : [...currentState.bookmarks, topicId];

  const nextState: PlacementUserState = {
    ...currentState,
    bookmarks: nextBookmarks,
  };

  await savePlacementUserState(nextState);
  return nextState;
}

// =========================================================================
// PROGRESS HIERARCHY CALCULATORS (Calculated dynamically from topic records)
// =========================================================================

export interface ConceptProgressMetric {
  conceptId: string;
  totalTopics: number;
  completedTopics: number;
  inProgressTopics: number;
  percentage: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

export interface LevelProgressMetric {
  levelId: string;
  totalTopics: number;
  completedTopics: number;
  inProgressTopics: number;
  percentage: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
  concepts: ConceptProgressMetric[];
}

export interface CategoryProgressMetric {
  categoryId: string;
  totalTopics: number;
  completedTopics: number;
  inProgressTopics: number;
  percentage: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
  levels: LevelProgressMetric[];
}

export interface OverallPlacementProgressMetric {
  totalTopics: number;
  completedTopics: number;
  inProgressTopics: number;
  percentage: number;
  categoriesStarted: number;
  categoriesCompleted: number;
  currentFocusTopic: { categoryId: string; topicId: string; title: string; categoryTitle: string } | null;
  continueLearningTopic: { categoryId: string; topicId: string; title: string; categoryTitle: string } | null;
  recentCompletedTopics: Array<{ topicId: string; categoryId: string; title: string; completedAt: string }>;
}

export function calculateConceptProgress(
  concept: PlacementConcept,
  topicProgress: Record<string, PlacementTopicProgress>
): ConceptProgressMetric {
  const totalTopics = concept.topics.length;
  let completedTopics = 0;
  let inProgressTopics = 0;

  concept.topics.forEach((t) => {
    const record = topicProgress[t.id];
    if (record?.status === 'completed') {
      completedTopics++;
    } else if (record?.status === 'in_progress') {
      inProgressTopics++;
    }
  });

  const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  let status: 'Not Started' | 'In Progress' | 'Completed' = 'Not Started';
  if (completedTopics === totalTopics && totalTopics > 0) {
    status = 'Completed';
  } else if (completedTopics > 0 || inProgressTopics > 0) {
    status = 'In Progress';
  }

  return {
    conceptId: concept.id,
    totalTopics,
    completedTopics,
    inProgressTopics,
    percentage,
    status,
  };
}

export function calculateLevelProgress(
  level: PlacementLevel,
  topicProgress: Record<string, PlacementTopicProgress>
): LevelProgressMetric {
  const concepts = level.concepts.map((c) => calculateConceptProgress(c, topicProgress));
  const totalTopics = concepts.reduce((acc, c) => acc + c.totalTopics, 0);
  const completedTopics = concepts.reduce((acc, c) => acc + c.completedTopics, 0);
  const inProgressTopics = concepts.reduce((acc, c) => acc + c.inProgressTopics, 0);

  const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  let status: 'Not Started' | 'In Progress' | 'Completed' = 'Not Started';
  if (completedTopics === totalTopics && totalTopics > 0) {
    status = 'Completed';
  } else if (completedTopics > 0 || inProgressTopics > 0) {
    status = 'In Progress';
  }

  return {
    levelId: level.id,
    totalTopics,
    completedTopics,
    inProgressTopics,
    percentage,
    status,
    concepts,
  };
}

export function calculateCategoryProgress(
  category: PlacementCategory,
  topicProgress: Record<string, PlacementTopicProgress>
): CategoryProgressMetric {
  const levels = category.levels.map((l) => calculateLevelProgress(l, topicProgress));
  const totalTopics = levels.reduce((acc, l) => acc + l.totalTopics, 0);
  const completedTopics = levels.reduce((acc, l) => acc + l.completedTopics, 0);
  const inProgressTopics = levels.reduce((acc, l) => acc + l.inProgressTopics, 0);

  const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  let status: 'Not Started' | 'In Progress' | 'Completed' = 'Not Started';
  if (completedTopics === totalTopics && totalTopics > 0) {
    status = 'Completed';
  } else if (completedTopics > 0 || inProgressTopics > 0) {
    status = 'In Progress';
  }

  return {
    categoryId: category.id,
    totalTopics,
    completedTopics,
    inProgressTopics,
    percentage,
    status,
    levels,
  };
}

export function calculateOverallPlacementProgress(
  state: PlacementUserState
): OverallPlacementProgressMetric {
  const totalTopics = getTotalPlacementTopicsCount();
  const topicProgress = state.topicProgress || {};

  let completedTopics = 0;
  let inProgressTopics = 0;

  Object.values(topicProgress).forEach((rec) => {
    if (rec.status === 'completed') {
      completedTopics++;
    } else if (rec.status === 'in_progress') {
      inProgressTopics++;
    }
  });

  const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  // Categories metrics
  let categoriesStarted = 0;
  let categoriesCompleted = 0;

  PLACEMENT_CATEGORIES.forEach((cat) => {
    const catMetric = calculateCategoryProgress(cat, topicProgress);
    if (catMetric.percentage === 100 && catMetric.totalTopics > 0) {
      categoriesCompleted++;
      categoriesStarted++;
    } else if (catMetric.completedTopics > 0 || catMetric.inProgressTopics > 0) {
      categoriesStarted++;
    }
  });

  // Find Current Focus Topic
  let currentFocusTopic: OverallPlacementProgressMetric['currentFocusTopic'] = null;
  if (state.currentFocusTopicId && state.currentFocusCategoryId) {
    const cat = PLACEMENT_CATEGORIES.find((c) => c.id === state.currentFocusCategoryId);
    if (cat) {
      for (const lvl of cat.levels) {
        for (const c of lvl.concepts) {
          const t = c.topics.find((top) => top.id === state.currentFocusTopicId);
          if (t) {
            currentFocusTopic = {
              categoryId: cat.id,
              topicId: t.id,
              title: t.title,
              categoryTitle: cat.shortTitle,
            };
            break;
          }
        }
      }
    }
  }

  // Find Next Incomplete Topic for "Continue Learning"
  let continueLearningTopic: OverallPlacementProgressMetric['continueLearningTopic'] = null;
  for (const cat of PLACEMENT_CATEGORIES) {
    for (const lvl of cat.levels) {
      for (const c of lvl.concepts) {
        for (const t of c.topics) {
          const rec = topicProgress[t.id];
          if (!rec || rec.status !== 'completed') {
            continueLearningTopic = {
              categoryId: cat.id,
              topicId: t.id,
              title: t.title,
              categoryTitle: cat.shortTitle,
            };
            break;
          }
        }
        if (continueLearningTopic) break;
      }
      if (continueLearningTopic) break;
    }
    if (continueLearningTopic) break;
  }

  // Recent Completed Topics
  const completedRecords = Object.values(topicProgress)
    .filter((r) => r.status === 'completed' && r.completedAt)
    .sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || ''))
    .slice(0, 4);

  const recentCompletedTopics = completedRecords.map((r) => {
    let topicTitle = r.topicId;
    const cat = PLACEMENT_CATEGORIES.find((c) => c.id === r.categoryId);
    if (cat) {
      for (const lvl of cat.levels) {
        for (const c of lvl.concepts) {
          const t = c.topics.find((top) => top.id === r.topicId);
          if (t) {
            topicTitle = t.title;
            break;
          }
        }
      }
    }
    return {
      topicId: r.topicId,
      categoryId: r.categoryId,
      title: topicTitle,
      completedAt: r.completedAt || '',
    };
  });

  return {
    totalTopics,
    completedTopics,
    inProgressTopics,
    percentage,
    categoriesStarted,
    categoriesCompleted,
    currentFocusTopic,
    continueLearningTopic,
    recentCompletedTopics,
  };
}
