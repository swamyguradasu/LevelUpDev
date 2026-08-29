export interface PortfolioAchievement {
  id: string;
  title: string;
  category: 'learning' | 'streak' | 'project' | 'mastery';
  description: string;
  icon: string;
  criteria: string;
  isUnlocked: boolean;
  earnedDate?: string;
  badgeColor: string;
}

export interface PortfolioCertificate {
  id: string;
  title: string;
  skillId: string;
  issuedBy: string;
  issueDate: string;
  credentialId: string;
  verificationUrl: string;
  skillsCovered: string[];
  gradeScore?: string;
  isUnlocked: boolean;
}

export interface PortfolioExperience {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'Internship' | 'Full-Time' | 'Open Source' | 'Club / Campus Lead';
  description: string[];
  technologies: string[];
}

export interface PortfolioEducation {
  id: string;
  degree: string;
  major: string;
  institution: string;
  period: string;
  gpaOrScore?: string;
  highlights: string[];
}

export const PLATFORM_ACHIEVEMENTS_LIST = [
  {
    id: 'python-mastery',
    title: 'Python Trail Master',
    category: 'mastery' as const,
    description: 'Completed all core Python learning modules and passed skill assessments.',
    icon: '🐍',
    criteria: 'Complete 100% of Python Skill Trail modules',
    badgeColor: 'from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-500/40',
  },
  {
    id: 'first-project',
    title: 'First Project Shipped',
    category: 'project' as const,
    description: 'Built, verified, and linked first production-ready portfolio project.',
    icon: '🚀',
    criteria: 'Submit a verified GitHub repository for a project',
    badgeColor: 'from-blue-500/20 to-indigo-500/20 text-blue-300 border-blue-500/40',
  },
  {
    id: 'streak-7',
    title: '7-Day Solve Streak',
    category: 'streak' as const,
    description: 'Maintained a 7-consecutive-day streak on daily engineering challenges.',
    icon: '🔥',
    criteria: 'Reach a 7-day daily solve streak',
    badgeColor: 'from-rose-500/20 to-orange-500/20 text-rose-300 border-rose-500/40',
  },
  {
    id: 'streak-30',
    title: '30-Day Dedication',
    category: 'streak' as const,
    description: 'Consistently learned and solved challenges for 30 consecutive days.',
    icon: '⚡',
    criteria: 'Reach a 30-day daily solve streak',
    badgeColor: 'from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/40',
  },
  {
    id: 'first-solve',
    title: 'Code Initiated',
    category: 'learning' as const,
    description: 'Solved your very first Daily DSA Challenge on LevelUpDev.',
    icon: '🎯',
    criteria: 'Complete 1 Daily Coding Challenge',
    badgeColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/40',
  },
  {
    id: 'dsa-grinder',
    title: 'Algorithm Practitioner',
    category: 'learning' as const,
    description: 'Successfully submitted and recorded 10+ Daily Engineering Challenges.',
    icon: '🧠',
    criteria: 'Solve 10+ Daily Challenges',
    badgeColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/40',
  },
  {
    id: 'perfect-module',
    title: 'Flawless Assessment',
    category: 'mastery' as const,
    description: 'Scored 100% on a module comprehension quiz.',
    icon: '💯',
    criteria: 'Achieve a perfect quiz score in any module',
    badgeColor: 'from-yellow-500/20 to-amber-500/20 text-yellow-300 border-yellow-500/40',
  },
  {
    id: 'recruiter-ready',
    title: 'Recruiter Ready',
    category: 'project' as const,
    description: 'Reached 80%+ profile completeness with skills, projects, and bio.',
    icon: '💼',
    criteria: 'Attain 80% Portfolio Strength rating',
    badgeColor: 'from-indigo-500/20 to-purple-500/20 text-indigo-300 border-indigo-500/40',
  },
];
