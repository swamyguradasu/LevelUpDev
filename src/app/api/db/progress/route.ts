import { NextRequest, NextResponse } from 'next/server';
import { getStaticProfileByEmail } from '@/lib/csvRoster';
import {
  fetchUserDynamicData,
  saveUserDynamicData,
  calculateStreakFromActivity,
  CalendarActivityRecord,
  ModuleProgressRecord,
} from '@/lib/dynamicDatabase';
import { getSkillById } from '@/lib/content';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, skillId, moduleId, status } = body;

    if (!email || !skillId || !moduleId) {
      return NextResponse.json(
        { error: 'Email, skillId, and moduleId are required.' },
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

    const normSkill = String(skillId).toLowerCase();
    const nowIso = new Date().toISOString();
    const todayStr = nowIso.split('T')[0];
    const isCompleted = status === 'completed' || status === true;

    // Load existing dynamic data
    const dynamicData = await fetchUserDynamicData(cleanEmail);

    // Update progress
    const skillProgress: Record<string, ModuleProgressRecord> = dynamicData.progress[normSkill] || {};
    const updatedRecord: ModuleProgressRecord = {
      skillId: normSkill,
      moduleId: String(moduleId),
      status: isCompleted ? 'completed' : 'in_progress',
      completedAt: isCompleted ? nowIso : skillProgress[moduleId]?.completedAt,
      lastAccessedAt: nowIso,
    };

    const newSkillProgress: Record<string, ModuleProgressRecord> = {
      ...skillProgress,
      [moduleId]: updatedRecord,
    };

    const newProgress = {
      ...dynamicData.progress,
      [normSkill]: newSkillProgress,
    };

    // Check if entire skill is completed
    const skillDef = getSkillById(normSkill);
    let updatedSkillsCompleted = [...(dynamicData.skillsCompleted || [])];
    if (skillDef && skillDef.modules.length > 0) {
      const allDone = skillDef.modules.every((m) => newSkillProgress[m.moduleId]?.status === 'completed');
      if (allDone) {
        if (!updatedSkillsCompleted.includes(normSkill)) {
          updatedSkillsCompleted.push(normSkill);
        }
      } else {
        updatedSkillsCompleted = updatedSkillsCompleted.filter((s) => s !== normSkill);
      }
    }

    // Add activity record
    const newActivity: CalendarActivityRecord = {
      activityDate: todayStr,
      activityType: 'module_completion',
      timestamp: nowIso,
    };
    const updatedActivities = [...dynamicData.calendarActivity, newActivity];
    const updatedStreak = calculateStreakFromActivity(updatedActivities);

    const modDef = skillDef?.modules.find((m) => m.moduleId === moduleId);
    const lastActiveModule = {
      skillId: normSkill,
      moduleId: String(moduleId),
      moduleTitle: modDef ? `${skillDef?.title || normSkill}: ${modDef.title}` : normSkill,
      updatedAt: nowIso,
    };

    await saveUserDynamicData(cleanEmail, {
      progress: newProgress,
      skillsCompleted: updatedSkillsCompleted,
      calendarActivity: updatedActivities,
      streak: updatedStreak,
      lastActiveModule,
    });

    return NextResponse.json({
      success: true,
      progress: newProgress,
      skillsCompleted: updatedSkillsCompleted,
      streak: updatedStreak,
    });
  } catch (err: any) {
    console.error('Progress API error:', err);
    return NextResponse.json(
      { error: 'Failed to update module progress.' },
      { status: 500 }
    );
  }
}
