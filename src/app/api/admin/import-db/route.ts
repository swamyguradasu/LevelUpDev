import { NextRequest, NextResponse } from 'next/server';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getStaticProfilesFromCSV, getStaticProfileByEmail } from '@/lib/csvRoster';
import {
  fetchUserDynamicData,
  saveUserDynamicData,
  calculateStreakFromActivity,
  UserDynamicData,
  ModuleProgressRecord,
  UserProjectRecord,
  UserAchievementRecord,
  CalendarActivityRecord,
  normalizeUserId,
  DynamicBackupPackage,
} from '@/lib/dynamicDatabase';
import { InternshipApplication } from '@/data/internshipsData';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { adminEmail, backupPackage, validateOnly } = body;

    if (!adminEmail || !backupPackage) {
      return NextResponse.json(
        { error: 'adminEmail and backupPackage object are required.' },
        { status: 400 }
      );
    }

    const adminProfile = getStaticProfileByEmail(String(adminEmail).trim().toLowerCase());
    if (!adminProfile || adminProfile.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized: Only administrators can import or validate backups.' },
        { status: 403 }
      );
    }

    const datasets = backupPackage.datasets || backupPackage;
    const manifest = backupPackage.manifest || {
      formatVersion: 'legacy-json',
      appVersion: '1.0.0',
      exportedAt: backupPackage.metadata?.exportedAt || new Date().toISOString(),
      exportedBy: 'unknown',
    };

    // 1. Load static roster for validation
    const roster = getStaticProfilesFromCSV();
    const validEmails = new Set(roster.map((r) => r.levelupdevEmail.toLowerCase()));

    let validProgressCount = 0;
    let validProjectsCount = 0;
    let validInternshipsCount = 0;
    let validAchievementsCount = 0;
    let validCalendarCount = 0;

    const skippedUsers = new Set<string>();
    const warnings: string[] = [];
    const involvedUsers = new Set<string>();

    // 2. Validate Progress
    const progressMapByUser: Record<string, Record<string, Record<string, ModuleProgressRecord>>> = {};
    if (Array.isArray(datasets.students_progress)) {
      datasets.students_progress.forEach((row: any) => {
        const email = String(row.email || '').trim().toLowerCase();
        if (!email || !validEmails.has(email)) {
          if (email) skippedUsers.add(email);
          return;
        }

        involvedUsers.add(email);
        const skill = String(row.skill || 'python').toLowerCase();
        const moduleId = String(row.module_id || '').trim();
        if (!moduleId) return;

        if (!progressMapByUser[email]) progressMapByUser[email] = {};
        if (!progressMapByUser[email][skill]) progressMapByUser[email][skill] = {};

        progressMapByUser[email][skill][moduleId] = {
          skillId: skill,
          moduleId,
          status: row.status === 'completed' ? 'completed' : 'in_progress',
          completedAt: row.completed_at || undefined,
          lastAccessedAt: row.last_accessed_at || new Date().toISOString(),
        };
        validProgressCount++;
      });
    }

    // 3. Validate Projects
    const projectsMapByUser: Record<string, UserProjectRecord[]> = {};
    if (Array.isArray(datasets.projects)) {
      datasets.projects.forEach((row: any) => {
        const email = String(row.email || '').trim().toLowerCase();
        if (!email || !validEmails.has(email)) {
          if (email) skippedUsers.add(email);
          return;
        }

        const projectId = String(row.project_id || '').trim();
        if (!projectId) return;

        involvedUsers.add(email);
        if (!projectsMapByUser[email]) projectsMapByUser[email] = [];

        // Validate URLs if present
        let ghUrl: string | null = (row.github_url || '').trim() || null;
        let liveUrl: string | null = (row.live_url || '').trim() || null;

        if (ghUrl && !ghUrl.startsWith('http://') && !ghUrl.startsWith('https://')) {
          warnings.push(`Project "${projectId}" for ${email} had an invalid GitHub URL format: ${ghUrl}`);
          ghUrl = null;
        }
        if (liveUrl && !liveUrl.startsWith('http://') && !liveUrl.startsWith('https://')) {
          warnings.push(`Project "${projectId}" for ${email} had an invalid Live URL format: ${liveUrl}`);
          liveUrl = null;
        }

        projectsMapByUser[email].push({
          projectId,
          title: row.title || projectId,
          category: row.category || 'General',
          status: row.status || 'Selected',
          selectedAt: row.selected_at || row.updated_at || new Date().toISOString(),
          githubUrl: ghUrl,
          liveUrl: liveUrl,
          updatedAt: row.updated_at || new Date().toISOString(),
        });
        validProjectsCount++;
      });
    }

    // 4. Validate Achievements
    const achievementsMapByUser: Record<string, UserAchievementRecord[]> = {};
    if (Array.isArray(datasets.achievements)) {
      datasets.achievements.forEach((row: any) => {
        const email = String(row.email || '').trim().toLowerCase();
        if (!email || !validEmails.has(email)) {
          if (email) skippedUsers.add(email);
          return;
        }

        const achievementId = String(row.achievement_id || '').trim();
        if (!achievementId) return;

        involvedUsers.add(email);
        if (!achievementsMapByUser[email]) achievementsMapByUser[email] = [];

        achievementsMapByUser[email].push({
          achievementId,
          achievementTitle: row.achievement_title || achievementId,
          achievementType: row.achievement_type || 'Milestone',
          earnedAt: row.earned_at || new Date().toISOString(),
        });
        validAchievementsCount++;
      });
    }

    // 5. Validate Calendar
    const calendarMapByUser: Record<string, CalendarActivityRecord[]> = {};
    if (Array.isArray(datasets.calendar) || Array.isArray(datasets.calendar_activity)) {
      const calList = datasets.calendar || datasets.calendar_activity;
      calList.forEach((row: any) => {
        const email = String(row.email || '').trim().toLowerCase();
        if (!email || !validEmails.has(email)) {
          if (email) skippedUsers.add(email);
          return;
        }

        const activityDate = String(row.activity_date || '').trim();
        if (!activityDate) return;

        involvedUsers.add(email);
        if (!calendarMapByUser[email]) calendarMapByUser[email] = [];

        calendarMapByUser[email].push({
          activityDate,
          activityType: row.activity_type || 'module_completion',
          timestamp: row.timestamp || new Date().toISOString(),
        });
        validCalendarCount++;
      });
    }

    // 6. Validate Internships
    const validatedInternships: InternshipApplication[] = [];
    if (Array.isArray(datasets.internships)) {
      datasets.internships.forEach((app: any) => {
        const email = String(app.email || '').trim().toLowerCase();
        if (!email || !validEmails.has(email)) {
          if (email) skippedUsers.add(email);
          return;
        }

        const internshipId = String(app.internship_id || '').trim();
        if (!internshipId) return;

        involvedUsers.add(email);
        const userId = normalizeUserId(email);
        const appId = app.id || `app_${userId}_${internshipId}_${Date.now()}`;

        validatedInternships.push({
          id: appId,
          user_id: userId,
          internship_id: internshipId,
          internship_title: app.internship_title || internshipId,
          full_name: app.full_name || email,
          email,
          phone: app.phone || '',
          education: app.education || '',
          skills: app.skills || '',
          status: app.status || 'Interested',
          submitted_at: app.applied_at || app.submitted_at || new Date().toISOString(),
          admin_notes: app.admin_notes || undefined,
        });
        validInternshipsCount++;
      });
    }

    const previewSummary = {
      manifest,
      matchedStudentsCount: involvedUsers.size,
      recordCounts: {
        skillProgress: validProgressCount,
        projects: validProjectsCount,
        internships: validInternshipsCount,
        achievements: validAchievementsCount,
        calendar: validCalendarCount,
      },
      skippedUnknownUsers: Array.from(skippedUsers),
      warnings,
      isValid: true,
    };

    // If only preview/validation was requested, return early
    if (validateOnly) {
      return NextResponse.json({
        success: true,
        isValidationOnly: true,
        previewSummary,
      });
    }

    // 7. Commit Mode: Execute Idempotent Restoration
    for (const email of Array.from(involvedUsers)) {
      const existing = await fetchUserDynamicData(email);

      // Idempotent module merge
      const mergedProgress: Record<string, Record<string, ModuleProgressRecord>> = {
        ...(existing.progress || {}),
      };
      if (progressMapByUser[email]) {
        Object.keys(progressMapByUser[email]).forEach((skill) => {
          if (!mergedProgress[skill]) mergedProgress[skill] = {};
          Object.keys(progressMapByUser[email][skill]).forEach((modId) => {
            mergedProgress[skill][modId] = progressMapByUser[email][skill][modId];
          });
        });
      }

      // Idempotent projects merge (by projectId)
      const existingProjects = existing.projects || [];
      const incomingProjects = projectsMapByUser[email] || [];
      const mergedProjectsMap = new Map<string, UserProjectRecord>();
      existingProjects.forEach((p) => mergedProjectsMap.set(p.projectId, p));
      incomingProjects.forEach((p) => mergedProjectsMap.set(p.projectId, p));
      const mergedProjects = Array.from(mergedProjectsMap.values());

      // Idempotent achievements merge (by achievementId)
      const existingAch = existing.achievements || [];
      const incomingAch = achievementsMapByUser[email] || [];
      const mergedAchMap = new Map<string, UserAchievementRecord>();
      existingAch.forEach((a) => mergedAchMap.set(a.achievementId, a));
      incomingAch.forEach((a) => mergedAchMap.set(a.achievementId, a));
      const mergedAchievements = Array.from(mergedAchMap.values());

      // Idempotent calendar merge (by date + type)
      const existingCal = existing.calendarActivity || [];
      const incomingCal = calendarMapByUser[email] || [];
      const calKeySet = new Set<string>();
      const mergedCalendar: CalendarActivityRecord[] = [];

      [...existingCal, ...incomingCal].forEach((c) => {
        const key = `${c.activityDate}_${c.activityType}`;
        if (!calKeySet.has(key)) {
          calKeySet.add(key);
          mergedCalendar.push(c);
        }
      });

      const streak = calculateStreakFromActivity(mergedCalendar);

      const restorePayload: Partial<UserDynamicData> = {
        progress: mergedProgress,
        projects: mergedProjects,
        achievements: mergedAchievements,
        calendarActivity: mergedCalendar,
        streak,
        updatedAt: new Date().toISOString(),
      };

      await saveUserDynamicData(email, restorePayload);
    }

    // Commit Internships to Firestore
    if (isFirebaseConfigured && validatedInternships.length > 0) {
      for (const app of validatedInternships) {
        const docRef = doc(db, 'internship_applications', app.id);
        await setDoc(docRef, app, { merge: true });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Backup restored successfully. Student progress and activity have been re-established.',
      restoreSummary: {
        ...previewSummary,
        restoredAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    console.error('Import DB error:', err);
    return NextResponse.json(
      { error: 'Failed to restore database backup.' },
      { status: 500 }
    );
  }
}
