# LevelUpDev Firestore Schema

Database model for **LevelUpDev** private group learning platform.

## `users` Collection

Path: `/users/{uid}`
Document ID: Firebase Auth `uid` (string)

### Fields

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `uid` | `string` | Firebase Auth unique user identifier |
| `name` | `string` | Display name of the user (editable) |
| `photoUrl` | `string` | URL or data URI for the profile picture (editable) |
| `bio` | `string` | Short personal bio or tag line (editable) |
| `headline` | `string` | Short aspiration line, e.g. "Aspiring SDE" (editable) |
| `college` | `string` | College/University name (editable) |
| `branch` | `string` | Degree & branch name, e.g. "B.Tech, CSE" (editable) |
| `githubUrl` | `string` | GitHub profile URL (editable) |
| `linkedinUrl` | `string` | LinkedIn profile URL (editable) |
| `joinedDate` | `string` | ISO timestamp auto-set on signup ("On the trail since ...") |
| `lastActiveModule` | `map` | Auto-derived object storing most recent module worked on for `currentFocus` |
| `skillsCompleted` | `string[]` | Array of `skillId` strings where 100% of modules are complete |
| `progress` | `map` | Nested object mapping `skillId` to completed module booleans |
| `streak` | `map` | User activity & daily streak tracking object |
| `createdAt` | `string` | ISO timestamp of profile creation |
| `updatedAt` | `string` | ISO timestamp of last profile or progress update |

### Progress Structure Details
```json
{
  "progress": {
    "python": {
      "m1": true,
      "m2": false
    },
    "javascript": {
      "m1": true
    }
  }
}
```

### Streak Structure Details
```json
{
  "streak": {
    "currentStreak": 3,
    "lastSolvedDate": "2026-08-22",
    "solvedDates": ["2026-08-20", "2026-08-21", "2026-08-22"]
  }
}
```

## Unlock Policy
- Every user starts with the `"python"` skill unlocked by default upon signup.
- Additional skills become visible in the user's portfolio when progress is initialized for that `skillId` in Firestore `progress`.
