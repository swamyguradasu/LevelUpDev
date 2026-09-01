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
import { getPythonModuleById } from '@/data/pythonSkillsData';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      skillId,
      moduleId,
      status,
      topicId,
      topicCompleted,
      assignmentScore,
      assignmentPassed,
      assignmentAttempt,
      weakTopics,
      finalChallenge,
    } = body;

    if (!email || !skillId) {
      return NextResponse.json(
        { error: 'Email and skillId are required.' },
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

    // Load existing dynamic data
    const dynamicData = await fetchUserDynamicData(cleanEmail);

    // Handle Final Challenge submission
    if (finalChallenge) {
      await saveUserDynamicData(cleanEmail, {
        finalChallenge: {
          completed: Boolean(finalChallenge.completed),
          score: finalChallenge.score,
          completedAt: nowIso,
        },
      });

      return NextResponse.json({
        success: true,
        finalChallenge: {
          completed: Boolean(finalChallenge.completed),
          score: finalChallenge.score,
          completedAt: nowIso,
        },
      });
    }

    if (!moduleId) {
      return NextResponse.json(
        { error: 'ModuleId is required.' },
        { status: 400 }
      );
    }

    const skillProgress: Record<string, ModuleProgressRecord> = dynamicData.progress[normSkill] || {};
    const currentModRecord: ModuleProgressRecord = skillProgress[moduleId] || {
      skillId: normSkill,
      moduleId: String(moduleId),
      status: 'in_progress',
      lastAccessedAt: nowIso,
      topicsCompleted: [],
    };

    // Update topics completed
    let updatedTopicsCompleted = [...(currentModRecord.topicsCompleted || [])];
    if (topicId) {
      if (topicCompleted !== false) {
        if (!updatedTopicsCompleted.includes(topicId)) {
          updatedTopicsCompleted.push(topicId);
        }
      } else {
        updatedTopicsCompleted = updatedTopicsCompleted.filter((t) => t !== topicId);
      }
    }

    // Determine module status
    let modStatus = currentModRecord.status;
    if (status !== undefined) {
      modStatus = status === 'completed' || status === true ? 'completed' : 'in_progress';
    }

    if (assignmentPassed === true) {
      modStatus = 'completed';
    }

    // Update assignment attempt history
    const existingAttempts = currentModRecord.assignmentAttempts || [];
    let updatedAttempts = [...existingAttempts];
    if (assignmentAttempt) {
      updatedAttempts.push(assignmentAttempt);
    }

    const updatedRecord: ModuleProgressRecord = {
      ...currentModRecord,
      status: modStatus,
      completedAt: modStatus === 'completed' ? (currentModRecord.completedAt || nowIso) : undefined,
      lastAccessedAt: nowIso,
      topicsCompleted: updatedTopicsCompleted,
      assignmentPassed: assignmentPassed !== undefined ? assignmentPassed : currentModRecord.assignmentPassed,
      assignmentScore: assignmentScore !== undefined ? assignmentScore : currentModRecord.assignmentScore,
      assignmentAttempts: updatedAttempts,
      weakTopics: weakTopics !== undefined ? weakTopics : currentModRecord.weakTopics,
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

    // Add calendar activity record
    const newActivity: CalendarActivityRecord = {
      activityDate: todayStr,
      activityType: 'module_completion',
      timestamp: nowIso,
    };
    const updatedActivities = [...dynamicData.calendarActivity, newActivity];
    const updatedStreak = calculateStreakFromActivity(updatedActivities);

    const pythonModDef = normSkill === 'python' ? getPythonModuleById(moduleId) : null;
    const modDef = skillDef?.modules.find((m) => m.moduleId === moduleId);
    const modTitle = pythonModDef ? `Module ${pythonModDef.moduleNumber}: ${pythonModDef.title}` : (modDef?.title || moduleId);

    const lastActiveModule = {
      skillId: normSkill,
      moduleId: String(moduleId),
      moduleTitle: `${skillDef?.title || normSkill}: ${modTitle}`,
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
