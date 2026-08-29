import { NextRequest, NextResponse } from 'next/server';
import { getStaticProfileByEmail } from '@/lib/csvRoster';
import {
  fetchUserDynamicData,
  saveUserDynamicData,
  calculateStreakFromActivity,
  UserProjectRecord,
  CalendarActivityRecord,
} from '@/lib/dynamicDatabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, project } = body;

    if (!email || !project || !project.projectId) {
      return NextResponse.json(
        { error: 'Email and project data with projectId are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const profile = getStaticProfileByEmail(cleanEmail);
    if (!profile) {
      return NextResponse.json(
        { error: 'User does not exist in member roster.' },
        { status: 404 }
      );
    }

    // Validate URLs
    const cleanGh = (project.githubUrl || '').trim();
    const cleanLive = (project.liveUrl || '').trim();

    if (cleanGh && !cleanGh.startsWith('http://') && !cleanGh.startsWith('https://')) {
      return NextResponse.json(
        { error: 'Invalid GitHub URL. Must begin with http:// or https://' },
        { status: 400 }
      );
    }

    if (cleanLive && !cleanLive.startsWith('http://') && !cleanLive.startsWith('https://')) {
      return NextResponse.json(
        { error: 'Invalid Live Demo URL. Must begin with http:// or https://' },
        { status: 400 }
      );
    }

    const nowIso = new Date().toISOString();
    const todayStr = nowIso.split('T')[0];

    const dynamicData = await fetchUserDynamicData(cleanEmail);
    const existingProjects = dynamicData.projects || [];
    const foundIndex = existingProjects.findIndex((p) => p.projectId === project.projectId);

    let updatedProjects: UserProjectRecord[];
    const isCompleted = project.status === 'Completed' || (cleanLive.length > 0 && cleanGh.length > 0);

    const projectEntry: UserProjectRecord = {
      projectId: project.projectId,
      title: project.title || project.projectId,
      description: project.description || '',
      category: project.category || 'General',
      difficulty: project.difficulty || 'Beginner',
      duration: project.duration || '7 Days',
      suggestedTech: project.suggestedTech || [],
      status: project.status || (isCompleted ? 'Completed' : 'In Progress'),
      selectedAt: project.selectedAt || (foundIndex >= 0 ? existingProjects[foundIndex].selectedAt : nowIso),
      githubUrl: cleanGh || null,
      liveUrl: cleanLive || null,
      completedAt: isCompleted ? (project.completedAt || nowIso) : null,
      updatedAt: nowIso,
    };

    if (foundIndex >= 0) {
      updatedProjects = [...existingProjects];
      updatedProjects[foundIndex] = {
        ...existingProjects[foundIndex],
        ...projectEntry,
      };
    } else {
      updatedProjects = [projectEntry, ...existingProjects];
    }

    // Record activity
    const newActivity: CalendarActivityRecord = {
      activityDate: todayStr,
      activityType: 'project_update',
      timestamp: nowIso,
    };
    const updatedActivities = [...dynamicData.calendarActivity, newActivity];
    const updatedStreak = calculateStreakFromActivity(updatedActivities);

    await saveUserDynamicData(cleanEmail, {
      projects: updatedProjects,
      selectedProjectId: project.projectId,
      projectGithubUrl: cleanGh || null,
      projectLiveUrl: cleanLive || null,
      calendarActivity: updatedActivities,
      streak: updatedStreak,
    });

    return NextResponse.json({
      success: true,
      projects: updatedProjects,
      selectedProjectId: project.projectId,
      projectGithubUrl: cleanGh || null,
      projectLiveUrl: cleanLive || null,
      streak: updatedStreak,
    });
  } catch (err: any) {
    console.error('Projects API error:', err);
    return NextResponse.json(
      { error: 'Failed to save project data.' },
      { status: 500 }
    );
  }
}
