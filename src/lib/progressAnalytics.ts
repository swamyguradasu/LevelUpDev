import { UserProfileData } from '@/context/AuthContext';
import { Skill, DailyChallenge } from '@/lib/content';
import { FoundationLevel, getTotalTopicsCount } from '@/data/csFoundationsData';
import { InternshipApplication } from '@/data/internshipsData';

export interface DSAStatistics {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  topicStats: Array<{
    topicId: string;
    topicName: string;
    solvedCount: number;
    totalProblems: number;
    percentage: number;
    categorySlug?: string;
  }>;
  totalAvailableProblems: number;
}

export interface ReadinessCategory {
  id: string;
  name: string;
  percentage: number;
  description: string;
  status: 'Needs Focus' | 'In Progress' | 'Proficient' | 'Mastered';
  color: string;
  iconName: string;
}

export interface CareerReadinessReport {
  overallPercentage: number;
  statusHeadline: string;
  categories: {
    programming: ReadinessCategory;
    dsa: ReadinessCategory;
    csFundamentals: ReadinessCategory;
    projects: ReadinessCategory;
    gitGithub: ReadinessCategory;
    communication: ReadinessCategory;
    interview: ReadinessCategory;
  };
}

export interface RecommendedAction {
  id: string;
  title: string;
  category: 'DSA' | 'Programming' | 'CS Fundamentals' | 'Projects' | 'Git/GitHub' | 'Communication' | 'Interview';
  priority: 'High' | 'Medium' | 'Low';
  reason: string;
  actionText: string;
  href: string;
  iconName: string;
}

/**
 * Standard DSA topic definition mappings
 */
export const DSA_TOPIC_DEFINITIONS = [
  { id: 'arrays', name: 'Arrays', categorySlug: 'arrays', benchmarkCount: 15 },
  { id: 'strings', name: 'Strings', categorySlug: 'strings', benchmarkCount: 12 },
  { id: 'hashing', name: 'Hashing', categorySlug: 'hashing', benchmarkCount: 10 },
  { id: 'linked-lists', name: 'Linked List', categorySlug: 'linked-lists', benchmarkCount: 8 },
  { id: 'trees', name: 'Trees', categorySlug: 'trees', benchmarkCount: 10 },
  { id: 'stack', name: 'Stack & Monotonic Stack', categorySlug: 'stack', benchmarkCount: 8 },
  { id: 'queue', name: 'Queue & Deque', categorySlug: 'queue', benchmarkCount: 6 },
  { id: 'recursion', name: 'Recursion & Backtracking', categorySlug: 'recursion', benchmarkCount: 8 },
  { id: 'searching', name: 'Searching & Binary Search', categorySlug: 'searching', benchmarkCount: 8 },
  { id: 'sorting', name: 'Sorting Algorithms', categorySlug: 'sorting', benchmarkCount: 6 },
  { id: 'heaps', name: 'Heaps & Priority Queue', categorySlug: 'heaps', benchmarkCount: 6 },
  { id: 'graphs', name: 'Graphs & BFS/DFS', categorySlug: 'graphs', benchmarkCount: 10 },
  { id: 'dynamic-programming', name: 'Dynamic Programming', categorySlug: 'dynamic-programming', benchmarkCount: 12 },
];

/**
 * Calculate dynamic DSA statistics for the currently logged-in student.
 */
export function calculateDSAStats(
  userData: UserProfileData | null,
  foundationsLevels: FoundationLevel[],
  dailyChallenges: DailyChallenge[]
): DSAStatistics {
  if (!userData) {
    return {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      topicStats: DSA_TOPIC_DEFINITIONS.map((t) => ({
        topicId: t.id,
        topicName: t.name,
        solvedCount: 0,
        totalProblems: t.benchmarkCount,
        percentage: 0,
        categorySlug: t.categorySlug,
      })),
      totalAvailableProblems: 100,
    };
  }

  // 1. Daily challenges solved by user
  const solvedDates = userData.streak?.solvedDates || [];
  const solvedChallenges = dailyChallenges.filter((c) => solvedDates.includes(c.date));

  // 2. Foundation DSA progress
  const dsaLevel = foundationsLevels.find((lvl) => lvl.id === 'dsa');
  const dsaProgress = userData.progress?.['dsa'] || {};

  // Count topic-wise solved problems
  const topicCounts: Record<string, number> = {};
  DSA_TOPIC_DEFINITIONS.forEach((t) => {
    topicCounts[t.id] = 0;
  });

  // Calculate completions from CS foundations DSA categories
  if (dsaLevel) {
    dsaLevel.categories.forEach((cat) => {
      let catSolved = 0;
      cat.topics.forEach((top) => {
        // If topic or any submodules completed in progress
        const isCompleted = dsaProgress[top.id] || dsaProgress[`${cat.id}-${top.id}`];
        if (isCompleted) {
          catSolved += Math.max(1, top.practiceProblems?.length || 1);
        }
      });
      const targetTopic = DSA_TOPIC_DEFINITIONS.find((dt) => dt.categorySlug === cat.id || dt.id === cat.id);
      if (targetTopic) {
        topicCounts[targetTopic.id] = (topicCounts[targetTopic.id] || 0) + catSolved;
      }
    });
  }

  // Factor in daily challenges solved
  solvedChallenges.forEach((challenge) => {
    const titleLower = challenge.title.toLowerCase();
    if (titleLower.includes('two sum') || titleLower.includes('array') || titleLower.includes('water')) {
      topicCounts['arrays'] = (topicCounts['arrays'] || 0) + 1;
    } else if (titleLower.includes('anagram') || titleLower.includes('string') || titleLower.includes('palindrome')) {
      topicCounts['strings'] = (topicCounts['strings'] || 0) + 1;
    } else if (titleLower.includes('linked list') || titleLower.includes('node')) {
      topicCounts['linked-lists'] = (topicCounts['linked-lists'] || 0) + 1;
    } else if (titleLower.includes('tree') || titleLower.includes('bst')) {
      topicCounts['trees'] = (topicCounts['trees'] || 0) + 1;
    } else {
      topicCounts['hashing'] = (topicCounts['hashing'] || 0) + 1;
    }
  });

  // 3. LeetCode Stats integration
  const lc = userData.leetcodeStats;
  let totalSolved = 0;
  let easySolved = 0;
  let mediumSolved = 0;
  let hardSolved = 0;

  if (lc && lc.totalSolved > 0) {
    totalSolved = lc.totalSolved;
    easySolved = lc.easySolved;
    mediumSolved = lc.mediumSolved;
    hardSolved = lc.hardSolved;

    // Distribute LeetCode solved problems across topic buckets proportionally
    if (totalSolved > 0) {
      const distribution = [
        { id: 'arrays', ratio: 0.24 },
        { id: 'strings', ratio: 0.18 },
        { id: 'hashing', ratio: 0.15 },
        { id: 'linked-lists', ratio: 0.12 },
        { id: 'trees', ratio: 0.10 },
        { id: 'stack', ratio: 0.06 },
        { id: 'searching', ratio: 0.05 },
        { id: 'dynamic-programming', ratio: 0.05 },
        { id: 'graphs', ratio: 0.03 },
        { id: 'recursion', ratio: 0.02 },
      ];

      distribution.forEach((item) => {
        const computed = Math.round(totalSolved * item.ratio);
        topicCounts[item.id] = Math.max(topicCounts[item.id] || 0, computed);
      });
    }
  } else {
    // If LeetCode not synced, compute from platform daily challenges + module problem solves
    const platformSolves = solvedChallenges.length + Object.values(topicCounts).reduce((a, b) => a + b, 0);
    totalSolved = platformSolves;
    easySolved = Math.round(totalSolved * 0.55);
    mediumSolved = Math.round(totalSolved * 0.38);
    hardSolved = Math.max(0, totalSolved - easySolved - mediumSolved);
  }

  const topicStats = DSA_TOPIC_DEFINITIONS.map((def) => {
    const solved = topicCounts[def.id] || 0;
    const percentage = Math.min(100, Math.round((solved / def.benchmarkCount) * 100));
    return {
      topicId: def.id,
      topicName: def.name,
      solvedCount: solved,
      totalProblems: def.benchmarkCount,
      percentage,
      categorySlug: def.categorySlug,
    };
  });

  const totalAvailableProblems = topicStats.reduce((sum, t) => sum + t.totalProblems, 0);

  return {
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    topicStats,
    totalAvailableProblems,
  };
}

/**
 * Calculate dynamic Career Readiness score & 7 breakdown categories.
 */
export function calculateCareerReadiness(
  userData: UserProfileData | null,
  allSkills: Skill[],
  foundationsLevels: FoundationLevel[],
  userApplications: InternshipApplication[] = []
): CareerReadinessReport {
  if (!userData) {
    const emptyCategory = (id: string, name: string, desc: string, icon: string): ReadinessCategory => ({
      id,
      name,
      percentage: 0,
      description: desc,
      status: 'Needs Focus',
      color: 'from-rose-500 to-amber-500',
      iconName: icon,
    });

    return {
      overallPercentage: 0,
      statusHeadline: 'Profile Incomplete • Get Started',
      categories: {
        programming: emptyCategory('programming', 'Programming', 'Language fundamentals & syntax mastery', 'Code2'),
        dsa: emptyCategory('dsa', 'DSA', 'Algorithms, problem solving & Big-O', 'Layers'),
        csFundamentals: emptyCategory('csFundamentals', 'CS Fundamentals', 'OS, Networks, Databases & Architecture', 'Cpu'),
        projects: emptyCategory('projects', 'Projects', 'Hands-on full-stack development & deployments', 'FolderGit2'),
        gitGithub: emptyCategory('gitGithub', 'Git/GitHub', 'Version control, PRs & open source', 'GitBranch'),
        communication: emptyCategory('communication', 'Communication', 'Portfolio summary, writing & documentation', 'Share2'),
        interview: emptyCategory('interview', 'Interview', 'Mock interviews & technical readiness', 'Sparkles'),
      },
    };
  }

  // 1. PROGRAMMING SCORE
  let totalProgModules = 0;
  let completedProgModules = 0;
  allSkills.forEach((sk) => {
    const skProg = userData.progress?.[sk.skillId.toLowerCase()] || {};
    sk.modules.forEach((mod) => {
      totalProgModules++;
      if (skProg[mod.moduleId] === true) {
        completedProgModules++;
      }
    });
  });
  const progModuleRate = totalProgModules > 0 ? (completedProgModules / totalProgModules) * 100 : 0;
  const streakBonus = Math.min(20, (userData.streak?.currentStreak || 0) * 2);
  const programmingScore = Math.min(100, Math.round(progModuleRate * 0.8 + streakBonus));

  // 2. DSA SCORE
  const dsaLevel = foundationsLevels.find((l) => l.id === 'dsa');
  const dsaProgress = userData.progress?.['dsa'] || {};
  let totalDsaTopics = 0;
  let completedDsaTopics = 0;
  if (dsaLevel) {
    dsaLevel.categories.forEach((c) => {
      c.topics.forEach((t) => {
        totalDsaTopics++;
        if (dsaProgress[t.id] || dsaProgress[`${c.id}-${t.id}`]) {
          completedDsaTopics++;
        }
      });
    });
  }
  const dsaTopicRate = totalDsaTopics > 0 ? (completedDsaTopics / totalDsaTopics) * 100 : 0;
  const dsaSolveRate = Math.min(100, ((userData.leetcodeStats?.totalSolved || (userData.streak?.solvedDates?.length || 0) * 2) / 50) * 100);
  const dsaScore = Math.min(100, Math.round(dsaTopicRate * 0.5 + dsaSolveRate * 0.5));

  // 3. CS FUNDAMENTALS SCORE
  const coreLevels = foundationsLevels.filter((l) => l.id !== 'dsa' && l.id !== 'git-github');
  let totalCoreTopics = 0;
  let completedCoreTopics = 0;
  coreLevels.forEach((lvl) => {
    const lvlProg = userData.progress?.[lvl.id] || {};
    lvl.categories.forEach((cat) => {
      cat.topics.forEach((top) => {
        totalCoreTopics++;
        if (lvlProg[top.id] || lvlProg[`${cat.id}-${top.id}`]) {
          completedCoreTopics++;
        }
      });
    });
  });
  const csFundamentalsScore = totalCoreTopics > 0 ? Math.min(100, Math.round((completedCoreTopics / totalCoreTopics) * 100)) : 0;

  // 4. PROJECTS SCORE
  const projects = userData.portfolioProjects || [];
  let projectPoints = 0;
  if (projects.length > 0) {
    projects.forEach((proj) => {
      if (proj.status === 'Completed') projectPoints += 40;
      else if (proj.status === 'In Progress') projectPoints += 25;
      else projectPoints += 15;

      if (proj.githubUrl && proj.githubUrl.trim().startsWith('http')) projectPoints += 15;
      if (proj.liveUrl && proj.liveUrl.trim().startsWith('http')) projectPoints += 15;
    });
  } else if (userData.selectedProjectId) {
    projectPoints += 25;
    if (userData.projectGithubUrl) projectPoints += 15;
    if (userData.projectLiveUrl) projectPoints += 15;
  }
  const projectsScore = Math.min(100, projectPoints);

  // 5. GIT / GITHUB SCORE
  const gitLevel = foundationsLevels.find((l) => l.id === 'git-github');
  const gitProg = userData.progress?.['git-github'] || {};
  let gitTopicsTotal = 0;
  let gitTopicsCompleted = 0;
  if (gitLevel) {
    gitLevel.categories.forEach((c) => {
      c.topics.forEach((t) => {
        gitTopicsTotal++;
        if (gitProg[t.id] || gitProg[`${c.id}-${t.id}`]) gitTopicsCompleted++;
      });
    });
  }
  const gitModuleRate = gitTopicsTotal > 0 ? (gitTopicsCompleted / gitTopicsTotal) * 50 : 0;
  const githubProfilePoints = userData.githubUrl && userData.githubUrl.includes('github.com') ? 25 : 0;
  const githubRepoPoints = projects.some((p) => p.githubUrl) || userData.projectGithubUrl ? 25 : 0;
  const gitGithubScore = Math.min(100, Math.round(gitModuleRate + githubProfilePoints + githubRepoPoints));

  // 6. COMMUNICATION SCORE
  let commPoints = 0;
  if (userData.headline && userData.headline.trim().length > 10) commPoints += 20;
  if (userData.bio && userData.bio.trim().length > 15) commPoints += 20;
  if (userData.aboutMe && userData.aboutMe.trim().length > 20) commPoints += 20;
  if (userData.linkedinUrl && userData.linkedinUrl.includes('linkedin.com')) commPoints += 20;
  if (userData.isPortfolioPublic) commPoints += 20;
  const communicationScore = Math.min(100, commPoints);

  // 7. INTERVIEW SCORE
  let interviewPoints = 0;
  if (userApplications.length > 0) {
    interviewPoints += 30;
    const hasInterview = userApplications.some(
      (a) => a.status === 'Selected' || a.status === 'Under Review' || a.status === 'Interested'
    );
    if (hasInterview) interviewPoints += 30;
  }
  interviewPoints += Math.round((dsaScore * 0.2) + (csFundamentalsScore * 0.2));
  const interviewScore = Math.min(100, interviewPoints);

  // OVERALL WEIGHTED CAREER READINESS
  const overallPercentage = Math.round(
    programmingScore * 0.20 +
    dsaScore * 0.20 +
    csFundamentalsScore * 0.15 +
    projectsScore * 0.20 +
    gitGithubScore * 0.10 +
    communicationScore * 0.075 +
    interviewScore * 0.075
  );

  const getStatus = (score: number): 'Needs Focus' | 'In Progress' | 'Proficient' | 'Mastered' => {
    if (score >= 80) return 'Mastered';
    if (score >= 60) return 'Proficient';
    if (score >= 40) return 'In Progress';
    return 'Needs Focus';
  };

  const getHeadline = (score: number): string => {
    if (score >= 85) return 'Industry Ready • Top Recruiter Tier';
    if (score >= 70) return 'Strong Interview Candidate';
    if (score >= 50) return 'On Track • Solid Foundation';
    if (score >= 30) return 'Developing Competency • Keep Pushing';
    return 'Early Stage • Follow Recommended Actions';
  };

  return {
    overallPercentage,
    statusHeadline: getHeadline(overallPercentage),
    categories: {
      programming: {
        id: 'programming',
        name: 'Programming',
        percentage: programmingScore,
        description: 'Core language proficiency, clean syntax & problem solving logic',
        status: getStatus(programmingScore),
        color: 'from-blue-500 to-cyan-400',
        iconName: 'Code2',
      },
      dsa: {
        id: 'dsa',
        name: 'DSA',
        percentage: dsaScore,
        description: 'Data structures, algorithm complexity & technical problem solving',
        status: getStatus(dsaScore),
        color: 'from-cyan-500 to-teal-400',
        iconName: 'Layers',
      },
      csFundamentals: {
        id: 'csFundamentals',
        name: 'CS Fundamentals',
        percentage: csFundamentalsScore,
        description: 'Computer Systems, OS, Networking, OOP & Database architecture',
        status: getStatus(csFundamentalsScore),
        color: 'from-indigo-500 to-blue-400',
        iconName: 'Cpu',
      },
      projects: {
        id: 'projects',
        name: 'Projects',
        percentage: projectsScore,
        description: 'Real-world application building, architecture & live cloud deployments',
        status: getStatus(projectsScore),
        color: 'from-emerald-500 to-cyan-400',
        iconName: 'FolderGit2',
      },
      gitGithub: {
        id: 'gitGithub',
        name: 'Git/GitHub',
        percentage: gitGithubScore,
        description: 'Version control, Git workflows, branch strategies & open-source collaboration',
        status: getStatus(gitGithubScore),
        color: 'from-violet-500 to-purple-400',
        iconName: 'GitBranch',
      },
      communication: {
        id: 'communication',
        name: 'Communication',
        percentage: communicationScore,
        description: 'Engineering documentation, clear portfolio explanation & profile presence',
        status: getStatus(communicationScore),
        color: 'from-amber-500 to-orange-400',
        iconName: 'Share2',
      },
      interview: {
        id: 'interview',
        name: 'Interview',
        percentage: interviewScore,
        description: 'Live coding readiness, technical interview screenings & mock evaluations',
        status: getStatus(interviewScore),
        color: 'from-rose-500 to-pink-400',
        iconName: 'Sparkles',
      },
    },
  };
}

/**
 * Generate dynamically personalized Next Action recommendations based on the student's actual weaknesses.
 */
export function generateRecommendedActions(
  userData: UserProfileData | null,
  foundationsLevels: FoundationLevel[],
  dsaStats: DSAStatistics,
  readiness: CareerReadinessReport,
  userApplications: InternshipApplication[] = []
): RecommendedAction[] {
  if (!userData) return [];

  const actions: RecommendedAction[] = [];

  // 1. Weak DSA Topics Identification
  const sortedTopics = [...dsaStats.topicStats].sort((a, b) => a.percentage - b.percentage);
  const weakestTopics = sortedTopics.filter((t) => t.percentage < 60);

  if (weakestTopics.length > 0) {
    const primaryWeak = weakestTopics[0];
    actions.push({
      id: `improve-dsa-${primaryWeak.topicId}`,
      title: `Improve DSA ${primaryWeak.topicName}`,
      category: 'DSA',
      priority: 'High',
      reason: `You've solved ${primaryWeak.solvedCount}/${primaryWeak.totalProblems} problems in ${primaryWeak.topicName} (${primaryWeak.percentage}% mastery).`,
      actionText: `Practice ${primaryWeak.topicName}`,
      href: `/skills/foundations/dsa/${primaryWeak.categorySlug || primaryWeak.topicId}`,
      iconName: 'Layers',
    });

    if (weakestTopics.length > 1) {
      const secondaryWeak = weakestTopics[1];
      actions.push({
        id: `improve-dsa-${secondaryWeak.topicId}`,
        title: `Master DSA ${secondaryWeak.topicName}`,
        category: 'DSA',
        priority: 'Medium',
        reason: `Build confidence in ${secondaryWeak.topicName} patterns like traversal and boundary conditions.`,
        actionText: `Explore ${secondaryWeak.topicName}`,
        href: `/skills/foundations/dsa/${secondaryWeak.categorySlug || secondaryWeak.topicId}`,
        iconName: 'Layers',
      });
    }
  }

  // 2. Incomplete Git/GitHub Module
  const gitLevel = foundationsLevels.find((l) => l.id === 'git-github');
  const gitProg = userData.progress?.['git-github'] || {};
  let gitIncomplete = false;
  if (gitLevel) {
    gitIncomplete = gitLevel.categories.some((c) => c.topics.some((t) => !gitProg[t.id] && !gitProg[`${c.id}-${t.id}`]));
  }
  if (gitIncomplete || readiness.categories.gitGithub.percentage < 70) {
    actions.push({
      id: 'complete-git-module',
      title: 'Complete Git & GitHub Module',
      category: 'Git/GitHub',
      priority: 'High',
      reason: 'Master branching models, pull request reviews, and merge conflict resolution essential for team engineering.',
      actionText: 'Open Git/GitHub Module',
      href: '/skills/foundations/git-github',
      iconName: 'GitBranch',
    });
  }

  // 3. Projects & Practical Demonstrations
  const userProjects = userData.portfolioProjects || [];
  const inProgressProject = userProjects.find((p) => p.status === 'In Progress');
  const missingDemoProject = userProjects.find((p) => p.status === 'Completed' && (!p.liveUrl || !p.githubUrl));

  if (inProgressProject) {
    actions.push({
      id: `complete-project-${inProgressProject.projectId}`,
      title: `Finish & Deploy ${inProgressProject.title}`,
      category: 'Projects',
      priority: 'High',
      reason: `You've marked "${inProgressProject.title}" in progress. Finish implementation and link your live demo.`,
      actionText: 'Update Project Details',
      href: '/home',
      iconName: 'FolderGit2',
    });
  } else if (missingDemoProject) {
    actions.push({
      id: `link-demo-${missingDemoProject.projectId}`,
      title: `Practice Explaining ${missingDemoProject.title}`,
      category: 'Projects',
      priority: 'Medium',
      reason: `Add a live deployment URL and GitHub repository link to make "${missingDemoProject.title}" recruiter-ready.`,
      actionText: 'Add Deployment Link',
      href: '/home',
      iconName: 'FolderGit2',
    });
  } else if (userProjects.length === 0) {
    actions.push({
      id: 'select-mini-project',
      title: 'Build a 7-Day Mini Project',
      category: 'Projects',
      priority: 'High',
      reason: 'Choose and complete a production mini-project to build a standout software portfolio.',
      actionText: 'Browse Project Catalog',
      href: '/home',
      iconName: 'FolderGit2',
    });
  }

  // 4. Mock Interview / Internship Next Action
  const pendingInterviewApp = userApplications.find(
    (a) => a.status === 'Selected' || a.status === 'Under Review'
  );

  if (pendingInterviewApp) {
    actions.push({
      id: 'attend-mock-interview',
      title: 'Attend Next Mock Interview',
      category: 'Interview',
      priority: 'High',
      reason: `Your interview session for "${pendingInterviewApp.internship_title}" is scheduled. Review behavioral and technical questions.`,
      actionText: 'View Interview Details',
      href: '/internships',
      iconName: 'Sparkles',
    });
  } else if (userApplications.length === 0) {
    actions.push({
      id: 'apply-internship',
      title: 'Apply for Verified Internship Program',
      category: 'Interview',
      priority: 'Medium',
      reason: 'Submit an internship application to unlock technical interview screening and resume review.',
      actionText: 'Explore Internships',
      href: '/internships',
      iconName: 'Sparkles',
    });
  }

  // 5. Communication / Portfolio Polish
  if (!userData.aboutMe || userData.aboutMe.trim().length < 40) {
    actions.push({
      id: 'polish-portfolio-bio',
      title: 'Practice Explaining Your Technical Background',
      category: 'Communication',
      priority: 'Medium',
      reason: 'Write a compelling "About Me" summary highlighting your architectural interests and problem-solving mindset.',
      actionText: 'Edit Portfolio Bio',
      href: '/home',
      iconName: 'Share2',
    });
  }

  // 6. Daily Challenge Habit Check
  const todayStr = new Date().toISOString().split('T')[0];
  const solvedToday = userData.streak?.solvedDates?.includes(todayStr);
  if (!solvedToday) {
    actions.push({
      id: 'daily-dsa-solve',
      title: 'Solve Today’s Daily DSA Challenge',
      category: 'DSA',
      priority: 'High',
      reason: 'Maintain your problem-solving streak and build daily consistency before coding rounds.',
      actionText: 'Solve Daily Problem',
      href: '/daily',
      iconName: 'Zap',
    });
  }

  // Deduplicate and return top recommendations
  const seenIds = new Set<string>();
  return actions.filter((act) => {
    if (seenIds.has(act.id)) return false;
    seenIds.add(act.id);
    return true;
  });
}
