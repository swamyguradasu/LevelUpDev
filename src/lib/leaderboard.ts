import { UserProfileData } from '@/context/AuthContext';
import type { StaticUserProfile } from '@/lib/csvRoster';

export async function fetchLeaderboardUsers(
  currentUser: UserProfileData | null
): Promise<UserProfileData[]> {
  let staticProfiles: StaticUserProfile[] = [];

  try {
    if (typeof window !== 'undefined') {
      const res = await fetch('/api/auth/profile');
      if (res.ok) {
        const data = await res.json();
        staticProfiles = data.profiles || [];
      }
    }
  } catch (err) {
    console.warn('Leaderboard profile fetch notice:', err);
  }

  const allUsers: UserProfileData[] = staticProfiles.map((p) => {
    if (currentUser && currentUser.email.trim().toLowerCase() === p.levelupdevEmail.trim().toLowerCase()) {
      return currentUser;
    }
    return {
      uid: `user_${p.levelupdevEmail.replace(/[^a-z0-9]/g, '_')}`,
      email: p.levelupdevEmail,
      levelupdevEmail: p.levelupdevEmail,
      role: p.role,
      name: p.fullName || p.username || 'Developer',
      username: p.username || '',
      personalEmail: p.personalEmail || '',
      photoUrl: p.photoUrl || '',
      headline: p.headline || 'Aspiring Software Developer',
      college: p.college || 'Swarnandhra College of Engineering and Technology',
      degree: p.degree || 'BTech',
      registerNumber: p.registerNumber || '',
      branch: p.branch || 'AIML',
      currentYear: p.currentYear || '',
      graduationYear: p.graduationYear || '',
      city: p.city || '',
      state: p.state || '',
      country: p.country || 'India',
      currentRole: p.currentRole || 'Student',
      careerInterest: p.careerInterest || '',
      bio: p.shortBio || p.aboutMe || '',
      shortBio: p.shortBio || '',
      aboutMe: p.aboutMe || '',
      githubUrl: p.githubUrl || '',
      linkedinUrl: p.linkedinUrl || '',
      websiteUrl: p.websiteUrl || '',
      otherUrl: p.otherUrl || '',
      contactEmail: p.contactEmail || '',
      phone: p.phone || '',
      isPortfolioPublic: p.isPortfolioPublic,
      showEmailPublicly: p.showEmailPublicly,
      showPhonePublicly: p.showPhonePublicly,
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

  // If currentUser is not in list (e.g. demo mode), prepend it
  if (currentUser && !allUsers.some((u) => u.email.toLowerCase() === currentUser.email.toLowerCase())) {
    allUsers.unshift(currentUser);
  }

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
