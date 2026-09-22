import { db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { CareerHubResource, ResourceType, ProviderId, CareerPathId } from '@/data/careerHub/types';

export type ResourcePlanStatus = 'planned' | 'in_progress' | 'completed';

export interface UserCareerHubResourceRecord {
  id: string; // unique key: `${userId}_${resourceId}`
  userId: string;
  resourceId: string;
  resourceName: string;
  provider: ProviderId;
  resourceType: ResourceType;
  careerPaths: CareerPathId[];
  isSaved: boolean;
  planStatus: ResourcePlanStatus | null;
  savedAt?: string;
  plannedAt?: string;
  startedAt?: string;
  completedAt?: string;
  credentialUrl?: string;
  verificationUrl?: string;
  studentNotes?: string;
  updatedAt: string;
}

const LOCAL_STORAGE_KEY = 'levelupdev_user_career_resources_v1';

function normalizeUserId(userId: string): string {
  return userId.toLowerCase().trim().replace(/[@.]/g, '_');
}

function getLocalRecords(): UserCareerHubResourceRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Failed to parse career resource records from localStorage:', err);
    return [];
  }
}

function saveLocalRecords(records: UserCareerHubResourceRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
    window.dispatchEvent(new Event('career_resources_updated'));
  } catch (err) {
    console.warn('Failed to save career resource records to localStorage:', err);
  }
}

/**
 * Fetch all resource tracking records for a specific user.
 */
export async function getUserResourceRecords(userId: string): Promise<UserCareerHubResourceRecord[]> {
  if (!userId) return [];
  const normalizedId = normalizeUserId(userId);
  const localList = getLocalRecords().filter(
    (r) => r.userId === userId || r.userId === normalizedId
  );

  if (!isFirebaseConfigured || !db) {
    return localList;
  }

  try {
    const q = query(
      collection(db, 'user_career_resources'),
      where('userId', 'in', [userId, normalizedId])
    );
    const snapshot = await getDocs(q);
    const firestoreList: UserCareerHubResourceRecord[] = [];
    snapshot.forEach((d) => {
      firestoreList.push(d.data() as UserCareerHubResourceRecord);
    });

    // Merge Firestore + Local (keyed by id)
    const map = new Map<string, UserCareerHubResourceRecord>();
    localList.forEach((r) => map.set(r.id, r));
    firestoreList.forEach((r) => map.set(r.id, r));

    const merged = Array.from(map.values());
    saveLocalRecords(merged);
    return merged;
  } catch (err: any) {
    console.warn('Firestore fetch notice for career resources:', err?.message || err);
    return localList;
  }
}

/**
 * Toggle or set save/bookmark status for a resource.
 */
export async function toggleSaveResource(
  userId: string,
  resource: CareerHubResource,
  explicitState?: boolean
): Promise<UserCareerHubResourceRecord> {
  const normalizedId = normalizeUserId(userId);
  const recordId = `${normalizedId}_${resource.id}`;
  const allRecords = getLocalRecords();
  const existing = allRecords.find((r) => r.id === recordId);

  const newSavedState = explicitState !== undefined ? explicitState : !existing?.isSaved;
  const now = new Date().toISOString();

  const record: UserCareerHubResourceRecord = {
    id: recordId,
    userId: normalizedId,
    resourceId: resource.id,
    resourceName: resource.name,
    provider: resource.provider,
    resourceType: resource.resourceType,
    careerPaths: resource.careerPaths,
    isSaved: newSavedState,
    planStatus: existing?.planStatus || null,
    savedAt: newSavedState ? existing?.savedAt || now : undefined,
    plannedAt: existing?.plannedAt,
    startedAt: existing?.startedAt,
    completedAt: existing?.completedAt,
    credentialUrl: existing?.credentialUrl,
    verificationUrl: existing?.verificationUrl,
    studentNotes: existing?.studentNotes,
    updatedAt: now,
  };

  // Update local
  const updatedList = allRecords.filter((r) => r.id !== recordId);
  updatedList.push(record);
  saveLocalRecords(updatedList);

  // Sync to Firestore
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'user_career_resources', recordId);
      await setDoc(docRef, record, { merge: true });
    } catch (err: any) {
      console.warn('Firestore notice for saving career resource:', err?.message || err);
    }
  }

  return record;
}

/**
 * Update plan tracking status (Planned, In Progress, Completed, or remove).
 */
export async function updateResourcePlanStatus(
  userId: string,
  resource: CareerHubResource,
  status: ResourcePlanStatus | null,
  details?: {
    completedAt?: string;
    credentialUrl?: string;
    verificationUrl?: string;
    studentNotes?: string;
  }
): Promise<UserCareerHubResourceRecord> {
  const normalizedId = normalizeUserId(userId);
  const recordId = `${normalizedId}_${resource.id}`;
  const allRecords = getLocalRecords();
  const existing = allRecords.find((r) => r.id === recordId);
  const now = new Date().toISOString();

  const record: UserCareerHubResourceRecord = {
    id: recordId,
    userId: normalizedId,
    resourceId: resource.id,
    resourceName: resource.name,
    provider: resource.provider,
    resourceType: resource.resourceType,
    careerPaths: resource.careerPaths,
    isSaved: existing?.isSaved || false,
    planStatus: status,
    savedAt: existing?.savedAt,
    plannedAt: status === 'planned' ? now : existing?.plannedAt,
    startedAt: status === 'in_progress' ? existing?.startedAt || now : existing?.startedAt,
    completedAt:
      status === 'completed'
        ? details?.completedAt || existing?.completedAt || now
        : existing?.completedAt,
    credentialUrl: details?.credentialUrl ?? existing?.credentialUrl,
    verificationUrl: details?.verificationUrl ?? existing?.verificationUrl,
    studentNotes: details?.studentNotes ?? existing?.studentNotes,
    updatedAt: now,
  };

  // Update local
  const updatedList = allRecords.filter((r) => r.id !== recordId);
  updatedList.push(record);
  saveLocalRecords(updatedList);

  // Sync to Firestore
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'user_career_resources', recordId);
      await setDoc(docRef, record, { merge: true });
    } catch (err: any) {
      console.warn('Firestore notice for updating career resource plan:', err?.message || err);
    }
  }

  return record;
}

// ---------------------------------------------------------------------------
// RECENTLY VIEWED RESOURCES (Max 10)
// ---------------------------------------------------------------------------
const RECENTLY_VIEWED_KEY = 'levelupdev_recently_viewed_resources_v1';

export function getRecentlyViewedResourceIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

export function addRecentlyViewedResourceId(resourceId: string): string[] {
  if (typeof window === 'undefined' || !resourceId) return [];
  try {
    const current = getRecentlyViewedResourceIds();
    const filtered = current.filter((id) => id !== resourceId);
    const updated = [resourceId, ...filtered].slice(0, 10);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('career_recent_updated'));
    return updated;
  } catch (err) {
    return [];
  }
}

// ---------------------------------------------------------------------------
// ANONYMOUS / PRODUCT ANALYTICS
// ---------------------------------------------------------------------------
export type CareerHubMetricEvent =
  | 'resource_viewed'
  | 'resource_saved'
  | 'resource_unsaved'
  | 'resource_added_to_plan'
  | 'resource_status_updated'
  | 'resource_completed'
  | 'external_link_clicked'
  | 'compare_opened'
  | 'career_switched';

export function trackCareerHubMetric(event: CareerHubMetricEvent, data?: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  try {
    // Dispatch standard custom event for app analytics listener
    window.dispatchEvent(
      new CustomEvent('career_hub_analytics', {
        detail: { event, timestamp: new Date().toISOString(), ...data },
      })
    );
  } catch (e) {
    // ignore
  }
}

