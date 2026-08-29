import { InternshipApplication, ApplicationStatus } from '@/data/internshipsData';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';

const STORAGE_KEY = 'levelupdev_internship_applications_v1';

// Seed applications list (empty for clean dynamic database architecture)
const SEED_APPLICATIONS: InternshipApplication[] = [];

// Helper to get from local storage
function getLocalApplications(): InternshipApplication[] {
  if (typeof window === 'undefined') return SEED_APPLICATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_APPLICATIONS));
      return SEED_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to parse internship applications from localStorage:', err);
    return SEED_APPLICATIONS;
  }
}

// Helper to save to local storage
function saveLocalApplications(apps: InternshipApplication[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
    window.dispatchEvent(new Event('internship_applications_updated'));
  } catch (err) {
    console.warn('Failed to save internship applications to localStorage:', err);
  }
}

/**
 * Fetch all internship applications (Firestore + LocalStorage fallback)
 */
export async function getInternshipApplications(): Promise<InternshipApplication[]> {
  if (isFirebaseConfigured) {
    try {
      const q = query(collection(db, 'internship_applications'));
      const snap = await getDocs(q);
      const list: InternshipApplication[] = [];
      snap.forEach((d) => {
        list.push(d.data() as InternshipApplication);
      });
      if (list.length > 0) {
        list.sort((a, b) => (b.submitted_at || '').localeCompare(a.submitted_at || ''));
        saveLocalApplications(list);
        return list;
      }
    } catch (err) {
      console.warn('Firestore fetch failed for internship applications, fallback to local:', err);
    }
  }

  const local = getLocalApplications();
  local.sort((a, b) => (b.submitted_at || '').localeCompare(a.submitted_at || ''));
  return local;
}

/**
 * Fetch applications submitted by a specific user or email
 */
export async function getApplicationsByUser(userIdentifier: string): Promise<InternshipApplication[]> {
  const all = await getInternshipApplications();
  if (!userIdentifier) return [];
  const normalized = userIdentifier.toLowerCase().trim();
  return all.filter(
    (app) =>
      (app.user_id && app.user_id.toLowerCase() === normalized) ||
      (app.email && app.email.toLowerCase() === normalized)
  );
}

/**
 * Submit a new internship application
 */
export async function submitInternshipApplication(
  data: Omit<InternshipApplication, 'id' | 'submitted_at' | 'status'> & {
    id?: string;
    status?: ApplicationStatus;
    submitted_at?: string;
  }
): Promise<InternshipApplication> {
  const newApp: InternshipApplication = {
    id: data.id || `app-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    user_id: data.user_id || 'guest',
    internship_id: data.internship_id,
    internship_title: data.internship_title,
    full_name: data.full_name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    education: data.education.trim(),
    skills: data.skills.trim(),
    status: data.status || 'Interested',
    submitted_at: data.submitted_at || new Date().toISOString(),
    admin_notes: data.admin_notes || '',
  };

  // 1. Save to local storage cache immediately
  const localList = getLocalApplications();
  // Check for duplicate by user + internship
  const existingIdx = localList.findIndex(
    (a) =>
      a.internship_id === newApp.internship_id &&
      ((a.user_id && a.user_id === newApp.user_id) || (a.email && a.email.toLowerCase() === newApp.email.toLowerCase()))
  );

  if (existingIdx >= 0) {
    // Update existing
    localList[existingIdx] = { ...localList[existingIdx], ...newApp, id: localList[existingIdx].id };
    saveLocalApplications(localList);
  } else {
    // Insert new
    localList.unshift(newApp);
    saveLocalApplications(localList);
  }

  // 2. Sync with Firestore if configured
  if (isFirebaseConfigured) {
    try {
      const docRef = doc(db, 'internship_applications', newApp.id);
      await setDoc(docRef, newApp, { merge: true });
    } catch (err) {
      console.warn('Failed to save internship application to Firestore:', err);
    }
  }

  return newApp;
}

/**
 * Update application status (Admin Action)
 */
export async function updateApplicationStatus(
  applicationId: string,
  newStatus: ApplicationStatus,
  adminNotes?: string
): Promise<boolean> {
  // 1. Update local storage
  const localList = getLocalApplications();
  const idx = localList.findIndex((a) => a.id === applicationId);
  if (idx >= 0) {
    localList[idx].status = newStatus;
    if (adminNotes !== undefined) {
      localList[idx].admin_notes = adminNotes;
    }
    saveLocalApplications(localList);
  }

  // 2. Update Firestore
  if (isFirebaseConfigured) {
    try {
      const docRef = doc(db, 'internship_applications', applicationId);
      await updateDoc(docRef, {
        status: newStatus,
        ...(adminNotes !== undefined ? { admin_notes: adminNotes } : {}),
      });
    } catch (err) {
      console.warn('Failed to update status in Firestore:', err);
    }
  }

  return true;
}

/**
 * Delete an application (Admin Action)
 */
export async function deleteApplication(applicationId: string): Promise<boolean> {
  // 1. Update local storage
  const localList = getLocalApplications();
  const filtered = localList.filter((a) => a.id !== applicationId);
  saveLocalApplications(filtered);

  // 2. Delete in Firestore
  if (isFirebaseConfigured) {
    try {
      const docRef = doc(db, 'internship_applications', applicationId);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn('Failed to delete application in Firestore:', err);
    }
  }

  return true;
}
