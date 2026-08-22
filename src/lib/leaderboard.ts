import { getAllRosterUsers } from '@/lib/roster';
import { UserProfileData } from '@/context/AuthContext';

export async function fetchLeaderboardUsers(
  currentUser: UserProfileData | null
): Promise<UserProfileData[]> {
  const roster = getAllRosterUsers();
  
  const allUsers: UserProfileData[] = roster.map((dev) => {
    if (currentUser && currentUser.email.trim().toLowerCase() === dev.email.trim().toLowerCase()) {
      return currentUser;
    }
    return {
      uid: `user-${dev.registerNumber}`,
      name: dev.name,
      email: dev.email,
      photoUrl: '',
      headline: dev.headline || 'Learning Developer',
      college: 'Engineering Institute',
      branch: dev.branch || 'AIML',
      bio: dev.bio || '',
      githubUrl: dev.githubUrl || '',
      linkedinUrl: dev.linkedinUrl || '',
      leetcodeId: dev.leetcodeId || '',
      leetcodeStats: dev.leetcodeSolved !== undefined
        ? {
            totalSolved: dev.leetcodeSolved,
            easySolved: Math.round(dev.leetcodeSolved * 0.6),
            mediumSolved: Math.round(dev.leetcodeSolved * 0.3),
            hardSolved: Math.round(dev.leetcodeSolved * 0.1),
            lastSyncedAt: new Date().toISOString(),
          }
        : { totalSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0 },
      joinedDate: new Date().toISOString(),
      skillsCompleted: [],
      progress: {},
      unlockedSkills: ['python'],
      streak: {
        currentStreak: 0,
        lastSolvedDate: '',
        solvedDates: [],
      },
      selectedProjectId: null,
      projectGithubUrl: null,
      projectLiveUrl: null,
    };
  });

  // Sort descending by currentStreak, then by leetcode total solved count
  allUsers.sort((a, b) => {
    const streakA = a.streak?.currentStreak || 0;
    const streakB = b.streak?.currentStreak || 0;
    if (streakB !== streakA) return streakB - streakA;

    const solvedA = a.leetcodeStats?.totalSolved || 0;
    const solvedB = b.leetcodeStats?.totalSolved || 0;
    return solvedB - solvedA;
  });

  return allUsers;
}
