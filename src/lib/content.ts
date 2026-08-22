import pythonSkill from '@/../content/skills/python.json';
import jsSkill from '@/../content/skills/javascript.json';
import dailyChallengesData from '@/../content/daily-challenges.json';
import projectsData from '@/../content/projects.json';
import allowedEmailsData from '@/../content/allowed-emails.json';
import adminEmailsData from '@/../content/admin-emails.json';

export interface Topic {
  name: string;
  summary: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Assessment {
  questions: Question[];
}

export interface Module {
  moduleId: string;
  title: string;
  topics: Topic[];
  assessment?: Assessment;
}

export interface Skill {
  skillId: string;
  title: string;
  icon?: string;
  description?: string;
  modules: Module[];
}

export interface DailyChallenge {
  date: string;
  title: string;
  leetcodeUrl: string;
  notes: string;
}

export interface ProjectIdea {
  projectId: string;
  title: string;
  description: string;
  suggestedTech: string[];
}

const SKILL_MAP: Record<string, Skill> = {
  python: pythonSkill as Skill,
  javascript: jsSkill as Skill,
};

export function getAllSkills(): Skill[] {
  return Object.values(SKILL_MAP);
}

export function getSkillById(skillId: string): Skill | null {
  return SKILL_MAP[skillId.toLowerCase()] || null;
}

export function getModuleById(skillId: string, moduleId: string): Module | null {
  const skill = getSkillById(skillId);
  if (!skill) return null;
  return skill.modules.find((m) => m.moduleId.toLowerCase() === moduleId.toLowerCase()) || null;
}

export function getDailyChallenge(targetDate?: string): DailyChallenge {
  const todayStr = targetDate || new Date().toISOString().split('T')[0];
  const found = (dailyChallengesData as DailyChallenge[]).find((c) => c.date === todayStr);
  return found || (dailyChallengesData[0] as DailyChallenge);
}

export function getAllDailyChallenges(): DailyChallenge[] {
  return dailyChallengesData as DailyChallenge[];
}

export function getAllProjects(): ProjectIdea[] {
  return projectsData as ProjectIdea[];
}

export function getProjectById(projectId: string): ProjectIdea | null {
  return (projectsData as ProjectIdea[]).find((p) => p.projectId === projectId) || null;
}

export function isEmailAllowed(email: string): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  const list = (allowedEmailsData as string[]) || [];
  return list.some((e) => e.trim().toLowerCase() === cleanEmail);
}

export function isAdminEmail(email: string): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  const list = (adminEmailsData as string[]) || [];
  return list.some((e) => e.trim().toLowerCase() === cleanEmail);
}



