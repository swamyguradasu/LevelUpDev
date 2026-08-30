/**
 * Historical Data Snapshot Access Layer (Read-Only)
 * 
 * Provides typed, immutable access to static historical activity records.
 * Historical records represent student activity prior to database quota resets.
 */

import manifestData from '@/data/historical/historical-manifest.json';
import skillProgressData from '@/data/historical/historical-skill-progress.json';
import projectsData from '@/data/historical/historical-projects.json';
import internshipsData from '@/data/historical/historical-internships.json';
import achievementsData from '@/data/historical/historical-achievements.json';
import calendarData from '@/data/historical/historical-calendar.json';

import {
  ModuleProgressRecord,
  UserProjectRecord,
  UserAchievementRecord,
  CalendarActivityRecord,
} from '@/lib/dynamicDatabase';
import { InternshipApplication } from '@/data/internshipsData';

export interface HistoricalManifest {
  snapshotVersion: string;
  createdAt: string;
  sourceExportDate: string;
  description: string;
  recordCounts: {
    students: number;
    skillProgressRecords: number;
    projectRecords: number;
    internshipRecords: number;
    achievementRecords: number;
    calendarRecords: number;
  };
}

export function getHistoricalManifest(): HistoricalManifest {
  return manifestData as HistoricalManifest;
}

/**
 * Returns historical module progress for a specific user.
 * Structure: skillId -> moduleId -> ModuleProgressRecord
 */
export function getHistoricalProgressForUser(email: string): Record<string, Record<string, ModuleProgressRecord>> {
  const cleanEmail = email.trim().toLowerCase();
  const result: Record<string, Record<string, ModuleProgressRecord>> = {};

  (skillProgressData as any[]).forEach((item) => {
    if (item.email?.toLowerCase() === cleanEmail) {
      const skill = item.skillId || 'python';
      const modId = item.moduleId;
      if (!result[skill]) result[skill] = {};
      result[skill][modId] = {
        skillId: skill,
        moduleId: modId,
        status: item.status || 'completed',
        completedAt: item.completedAt,
        lastAccessedAt: item.lastAccessedAt || item.completedAt || new Date().toISOString(),
      };
    }
  });

  return result;
}

/**
 * Returns historical projects selected/completed by a specific user.
 */
export function getHistoricalProjectsForUser(email: string): UserProjectRecord[] {
  const cleanEmail = email.trim().toLowerCase();
  const list: UserProjectRecord[] = [];

  (projectsData as any[]).forEach((item) => {
    if (item.email?.toLowerCase() === cleanEmail) {
      list.push({
        projectId: item.projectId,
        title: item.title,
        category: item.category || 'General',
        status: item.status || 'Completed',
        selectedAt: item.selectedAt || new Date().toISOString(),
        githubUrl: item.githubUrl || null,
        liveUrl: item.liveUrl || null,
        updatedAt: item.updatedAt || item.selectedAt || new Date().toISOString(),
      });
    }
  });

  return list;
}

/**
 * Returns historical internship applications submitted by a specific user.
 */
export function getHistoricalInternshipsForUser(email: string): InternshipApplication[] {
  const cleanEmail = email.trim().toLowerCase();
  const list: InternshipApplication[] = [];

  (internshipsData as any[]).forEach((item) => {
    if (item.email?.toLowerCase() === cleanEmail) {
      list.push({
        id: item.id || `hist_app_${item.userId}_${item.internshipId}`,
        user_id: item.userId,
        internship_id: item.internshipId,
        internship_title: item.internshipTitle || item.internshipId,
        full_name: item.fullName || item.email,
        email: item.email,
        phone: item.phone || '',
        education: item.education || '',
        skills: item.skills || '',
        status: item.status || 'Interested',
        submitted_at: item.submittedAt || new Date().toISOString(),
        admin_notes: item.adminNotes || '',
      });
    }
  });

  return list;
}

/**
 * Returns all historical internship applications (for admin view and aggregate lists).
 */
export function getAllHistoricalInternships(): InternshipApplication[] {
  return (internshipsData as any[]).map((item) => ({
    id: item.id || `hist_app_${item.userId}_${item.internshipId}`,
    user_id: item.userId,
    internship_id: item.internshipId,
    internship_title: item.internshipTitle || item.internshipId,
    full_name: item.fullName || item.email,
    email: item.email,
    phone: item.phone || '',
    education: item.education || '',
    skills: item.skills || '',
    status: item.status || 'Interested',
    submitted_at: item.submittedAt || new Date().toISOString(),
    admin_notes: item.adminNotes || '',
  }));
}

/**
 * Returns historical achievements for a specific user.
 */
export function getHistoricalAchievementsForUser(email: string): UserAchievementRecord[] {
  const cleanEmail = email.trim().toLowerCase();
  const list: UserAchievementRecord[] = [];

  (achievementsData as any[]).forEach((item) => {
    if (item.email?.toLowerCase() === cleanEmail) {
      list.push({
        achievementId: item.achievementId,
        achievementTitle: item.achievementTitle || item.achievementId,
        achievementType: item.achievementType || 'Milestone',
        earnedAt: item.earnedAt || new Date().toISOString(),
        metadata: item.metadata,
      });
    }
  });

  return list;
}

/**
 * Returns historical calendar activity records for a specific user.
 */
export function getHistoricalCalendarForUser(email: string): CalendarActivityRecord[] {
  const cleanEmail = email.trim().toLowerCase();
  const list: CalendarActivityRecord[] = [];

  (calendarData as any[]).forEach((item) => {
    if (item.email?.toLowerCase() === cleanEmail) {
      list.push({
        activityDate: item.activityDate,
        activityType: item.activityType || 'module_completion',
        timestamp: item.timestamp || new Date().toISOString(),
      });
    }
  });

  return list;
}
