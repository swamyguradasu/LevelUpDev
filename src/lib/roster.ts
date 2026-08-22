import rosterData from '@/../content/registered-developers.json';

export interface RosterDeveloper {
  name: string;
  headline: string;
  registerNumber: string;
  college?: string;
  branch: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  leetcodeId?: string;
  leetcodeSolved?: number;
  email: string;
}

export function getAllRosterUsers(): RosterDeveloper[] {
  return rosterData as RosterDeveloper[];
}

export function getRosterUserByEmail(email: string): RosterDeveloper | null {
  if (!email) return null;
  const cleanEmail = email.trim().toLowerCase();
  return (
    (rosterData as RosterDeveloper[]).find(
      (u) => u.email.trim().toLowerCase() === cleanEmail
    ) || null
  );
}

export function validateRosterCredentials(
  email: string,
  pass: string
): RosterDeveloper | null {
  const user = getRosterUserByEmail(email);
  if (!user) return null;

  const cleanPass = pass.trim().toLowerCase();
  const expectedPass = user.registerNumber.trim().toLowerCase();

  if (cleanPass === expectedPass) {
    return user;
  }
  return null;
}
