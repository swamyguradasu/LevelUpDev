import { NextRequest, NextResponse } from 'next/server';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getStaticProfilesFromCSV, getStaticProfileByEmail } from '@/lib/csvRoster';
import { UserDynamicData } from '@/lib/dynamicDatabase';
import { InternshipApplication } from '@/data/internshipsData';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const adminEmail = searchParams.get('adminEmail');

    if (!adminEmail) {
      return NextResponse.json(
        { error: 'Administrator email is required for export.' },
        { status: 400 }
      );
    }

    const cleanAdmin = String(adminEmail).trim().toLowerCase();
    const adminProfile = getStaticProfileByEmail(cleanAdmin);
    if (!adminProfile || adminProfile.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized: Only platform administrators can export database data.' },
        { status: 403 }
      );
    }

    // 1. Load all static profiles for reference
    const staticProfiles = getStaticProfilesFromCSV();
    const emailToUserIdMap: Record<string, string> = {};
    staticProfiles.forEach((p) => {
      emailToUserIdMap[p.levelupdevEmail] = `user_${p.levelupdevEmail.replace(/[^a-z0-9]/g, '_')}`;
    });

    // 2. Fetch all dynamic activity docs
    const dynamicDocs: UserDynamicData[] = [];
    if (isFirebaseConfigured) {
      try {
        const snap = await getDocs(collection(db, 'user_activity'));
        snap.forEach((docSnap) => {
          dynamicDocs.push(docSnap.data() as UserDynamicData);
        });
      } catch (err: any) {
        console.warn('Notice: Firestore user_activity export fallback:', err?.code || err?.message);
      }
    }

    // 3. Fetch all internship applications
    const applications: InternshipApplication[] = [];
    if (isFirebaseConfigured) {
      try {
        const snap = await getDocs(collection(db, 'internship_applications'));
        snap.forEach((docSnap) => {
          applications.push(docSnap.data() as InternshipApplication);
        });
      } catch (err: any) {
        console.warn('Notice: Firestore internship_applications export fallback:', err?.code || err?.message);
      }
    }

    // 4. Flatten into structured datasets for CSV & JSON export
    const progressList: Array<{
      user_id: string;
      email: string;
      skill: string;
      module_id: string;
      status: string;
      completed_at: string;
      last_accessed_at: string;
    }> = [];

    const projectsList: Array<{
      user_id: string;
      email: string;
      project_id: string;
      title: string;
      category: string;
      status: string;
      github_url: string;
      live_url: string;
      updated_at: string;
    }> = [];

    const achievementsList: Array<{
      user_id: string;
      email: string;
      achievement_id: string;
      achievement_title: string;
      achievement_type: string;
      earned_at: string;
    }> = [];

    const calendarList: Array<{
      user_id: string;
      email: string;
      activity_date: string;
      activity_type: string;
      timestamp: string;
    }> = [];

    dynamicDocs.forEach((u) => {
      const email = u.email || '';
      const userId = u.userId || emailToUserIdMap[email] || email;

      // Progress
      if (u.progress) {
        Object.keys(u.progress).forEach((skill) => {
          const modMap = u.progress[skill] || {};
          Object.keys(modMap).forEach((modId) => {
            const rec = modMap[modId];
            const isDone = typeof rec === 'object' ? rec.status === 'completed' : Boolean(rec);
            progressList.push({
              user_id: userId,
              email,
              skill,
              module_id: modId,
              status: isDone ? 'completed' : 'in_progress',
              completed_at: typeof rec === 'object' && rec.completedAt ? rec.completedAt : '',
              last_accessed_at: typeof rec === 'object' && rec.lastAccessedAt ? rec.lastAccessedAt : '',
            });
          });
        });
      }

      // Projects
      if (u.projects) {
        u.projects.forEach((p) => {
          projectsList.push({
            user_id: userId,
            email,
            project_id: p.projectId,
            title: p.title || p.projectId,
            category: p.category || 'General',
            status: p.status || 'Selected',
            github_url: p.githubUrl || '',
            live_url: p.liveUrl || '',
            updated_at: p.updatedAt || '',
          });
        });
      }

      // Achievements
      if (u.achievements) {
        u.achievements.forEach((a) => {
          achievementsList.push({
            user_id: userId,
            email,
            achievement_id: a.achievementId,
            achievement_title: a.achievementTitle,
            achievement_type: a.achievementType,
            earned_at: a.earnedAt || '',
          });
        });
      }

      // Calendar Activity
      if (u.calendarActivity) {
        u.calendarActivity.forEach((c) => {
          calendarList.push({
            user_id: userId,
            email,
            activity_date: c.activityDate,
            activity_type: c.activityType,
            timestamp: c.timestamp || '',
          });
        });
      }
    });

    const internshipsList = applications.map((app) => ({
      id: app.id,
      user_id: app.user_id || '',
      email: app.email || '',
      internship_id: app.internship_id,
      internship_title: app.internship_title,
      status: app.status,
      applied_at: app.submitted_at,
      full_name: app.full_name,
      phone: app.phone || '',
      education: app.education || '',
      skills: app.skills || '',
      admin_notes: app.admin_notes || '',
    }));

    const manifest = {
      formatVersion: 'levelupdev-backup-v1.0' as const,
      appVersion: '1.0.0',
      exportedAt: new Date().toISOString(),
      exportedBy: cleanAdmin,
      recordCounts: {
        students: staticProfiles.length,
        skillProgress: progressList.length,
        projects: projectsList.length,
        internships: internshipsList.length,
        achievements: achievementsList.length,
        calendar: calendarList.length,
      },
      datasets: ['students_progress', 'projects', 'internships', 'achievements', 'calendar'],
    };

    return NextResponse.json({
      success: true,
      manifest,
      metadata: {
        ...manifest,
        totalStudentsInRoster: staticProfiles.length,
        totalActiveDynamicUsers: dynamicDocs.length,
      },
      datasets: {
        students_progress: progressList,
        projects: projectsList,
        internships: internshipsList,
        achievements: achievementsList,
        calendar: calendarList,
      },
    });
  } catch (err: any) {
    console.error('Export DB API error:', err);
    return NextResponse.json(
      { error: 'Failed to export dynamic database.' },
      { status: 500 }
    );
  }
}
