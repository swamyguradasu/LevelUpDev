export interface CmdCommand {
  id: string;
  number: number;
  name: string;
  command: string;
  category: string;
  categoryId: string;
  description: string;
  whatHappens?: string;
  before: string;
  runCommand: string;
  after: string;
  warning?: string;
  tip?: string;
  secondaryExample?: {
    title: string;
    command: string;
    description: string;
    before?: string;
    after?: string;
  };
}

export interface CmdCategory {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  badgeColor: string;
  description: string;
  commandIds: string[];
}

export const CMD_CATEGORIES: CmdCategory[] = [
  {
    id: 'navigation-files',
    title: 'Navigation & File System',
    shortTitle: 'Navigation',
    icon: '📁',
    badgeColor: 'from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30',
    description: 'Traverse directories, inspect folders, create directories, and clear screen in Windows.',
    commandIds: ['cmd-1', 'cmd-2', 'cmd-3', 'cmd-4', 'cmd-5', 'cmd-6', 'cmd-7'],
  },
  {
    id: 'files-folders',
    title: 'Files & Folders Management',
    shortTitle: 'Files & Folders',
    icon: '📄',
    badgeColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    description: 'Read file contents, copy, move, rename, and delete files and directories safely.',
    commandIds: ['cmd-8', 'cmd-9', 'cmd-10', 'cmd-11', 'cmd-12', 'cmd-13'],
  },
  {
    id: 'python',
    title: 'Python Development',
    shortTitle: 'Python',
    icon: '🐍',
    badgeColor: 'from-yellow-500/20 to-amber-500/20 text-amber-400 border-amber-500/30',
    description: 'Verify Python version, start the REPL, execute scripts, and manage pip packages.',
    commandIds: ['cmd-14', 'cmd-15', 'cmd-16', 'cmd-17', 'cmd-18', 'cmd-19'],
  },
  {
    id: 'node-npm',
    title: 'Node.js & npm',
    shortTitle: 'Node.js & npm',
    icon: '⚡',
    badgeColor: 'from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30',
    description: 'Manage Node.js versions, project dependencies, development servers, and production builds.',
    commandIds: ['cmd-20', 'cmd-21', 'cmd-22', 'cmd-23', 'cmd-24', 'cmd-25', 'cmd-26', 'cmd-27', 'cmd-28'],
  },
  {
    id: 'git-github',
    title: 'Git & GitHub',
    shortTitle: 'Git & GitHub',
    icon: '🐙',
    badgeColor: 'from-orange-500/20 to-red-500/20 text-orange-400 border-orange-500/30',
    description: 'Initialize repositories, track changes, branch, commit, push, pull, and clone code.',
    commandIds: ['cmd-29', 'cmd-30', 'cmd-31', 'cmd-32', 'cmd-33', 'cmd-34', 'cmd-35', 'cmd-36', 'cmd-37', 'cmd-38', 'cmd-39', 'cmd-40'],
  },
  {
    id: 'networking',
    title: 'Networking & API Testing',
    shortTitle: 'Networking',
    icon: '🌐',
    badgeColor: 'from-sky-500/20 to-blue-500/20 text-sky-400 border-sky-500/30',
    description: 'Test connectivity, check IP and DNS configurations, and make HTTP/API curl requests.',
    commandIds: ['cmd-41', 'cmd-42', 'cmd-43', 'cmd-44', 'cmd-45'],
  },
  {
    id: 'processes-ports',
    title: 'Processes & Ports',
    shortTitle: 'Processes & Ports',
    icon: '⚙️',
    badgeColor: 'from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30',
    description: 'Inspect running system processes, find open ports (e.g. 5173, 3000), and terminate frozen tasks.',
    commandIds: ['cmd-46', 'cmd-47', 'cmd-48', 'cmd-49', 'cmd-50'],
  },
  {
    id: 'search-info',
    title: 'Search & Information',
    shortTitle: 'Search & Info',
    icon: '🔍',
    badgeColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30',
    description: 'Search file contents with findstr, view username, print current path, and inspect system specs.',
    commandIds: ['cmd-51', 'cmd-52', 'cmd-53', 'cmd-54', 'cmd-55'],
  },
  {
    id: 'env-vars',
    title: 'Environment Variables',
    shortTitle: 'Environment Vars',
    icon: '🗝️',
    badgeColor: 'from-violet-500/20 to-fuchsia-500/20 text-violet-400 border-violet-500/30',
    description: 'Set temporary session environment variables and inspect their values in CMD.',
    commandIds: ['cmd-56', 'cmd-57'],
  },
  {
    id: 'help-discovery',
    title: 'Help & Command Discovery',
    shortTitle: 'Help & Discovery',
    icon: '💡',
    badgeColor: 'from-indigo-500/20 to-blue-500/20 text-indigo-400 border-indigo-500/30',
    description: 'Discover available commands and inspect parameters for any Windows CMD tool.',
    commandIds: ['cmd-58', 'cmd-59'],
  },
  {
    id: 'cmd-operators',
    title: 'Useful CMD Operators',
    shortTitle: 'CMD Operators',
    icon: '🔗',
    badgeColor: 'from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30',
    description: 'Chain commands with &&, pipe output with |, and redirect output into files with > and >>.',
    commandIds: ['cmd-60', 'cmd-61', 'cmd-62', 'cmd-63'],
  },
  {
    id: 'troubleshooting',
    title: 'Developer Troubleshooting',
    shortTitle: 'Troubleshooting',
    icon: '🛠️',
    badgeColor: 'from-red-500/20 to-amber-500/20 text-red-400 border-red-500/30',
    description: 'Essential quick-triage commands for diagnosing build failures, port conflicts, and broken setups.',
    commandIds: ['cmd-28', 'cmd-14', 'cmd-20', 'cmd-29', 'cmd-49', 'cmd-46', 'cmd-48', 'cmd-41', 'cmd-42', 'cmd-45'],
  },
];

export const CMD_COMMANDS: CmdCommand[] = [
  // CATEGORY 1: Navigation & File System
  {
    id: 'cmd-1',
    number: 1,
    name: 'DIR',
    command: 'dir',
    category: 'Navigation & File System',
    categoryId: 'navigation-files',
    description: 'Shows the files and folders inside the current directory.',
    whatHappens: 'Lists all items, file sizes, creation timestamps, and subfolders inside the current working folder.',
    before: `C:\\LevelUpDev>

dir`,
    runCommand: 'dir',
    after: `C:\\LevelUpDev>

src
public
package.json
README.md`,
  },
  {
    id: 'cmd-2',
    number: 2,
    name: 'CD',
    command: 'cd foldername',
    category: 'Navigation & File System',
    categoryId: 'navigation-files',
    description: 'Moves into another folder.',
    whatHappens: 'Changes the active working directory to the specified child folder.',
    before: `C:\\LevelUpDev>`,
    runCommand: 'cd src',
    after: `C:\\LevelUpDev\\src>`,
  },
  {
    id: 'cmd-3',
    number: 3,
    name: 'CD ..',
    command: 'cd ..',
    category: 'Navigation & File System',
    categoryId: 'navigation-files',
    description: 'Moves back to the parent folder.',
    whatHappens: 'Steps back up one level in the folder directory tree.',
    before: `C:\\LevelUpDev\\src>`,
    runCommand: 'cd ..',
    after: `C:\\LevelUpDev>`,
  },
  {
    id: 'cmd-4',
    number: 4,
    name: 'CD PATH',
    command: 'cd C:\\path\\to\\folder',
    category: 'Navigation & File System',
    categoryId: 'navigation-files',
    description: 'Moves directly to a specific folder.',
    whatHappens: 'Jumps directly to any target folder path without stepping directory by directory.',
    before: `C:\\Users\\Student>`,
    runCommand: 'cd C:\\Projects\\LevelUpDev',
    after: `C:\\Projects\\LevelUpDev>`,
    tip: 'If jumping to a different drive letter like D:, type "cd /d D:\\Projects" to switch drive and folder at once.',
  },
  {
    id: 'cmd-5',
    number: 5,
    name: 'MKDIR',
    command: 'mkdir projects',
    category: 'Navigation & File System',
    categoryId: 'navigation-files',
    description: 'Creates a new folder/directory.',
    whatHappens: 'A brand new folder named "projects" is created in the current working directory.',
    before: `LevelUpDev/
├── src/
└── public/`,
    runCommand: 'mkdir projects',
    after: `LevelUpDev/
├── src/
├── public/
└── projects/   ← NEW`,
  },
  {
    id: 'cmd-6',
    number: 6,
    name: 'CLS',
    command: 'cls',
    category: 'Navigation & File System',
    categoryId: 'navigation-files',
    description: 'Clears the Command Prompt screen.',
    whatHappens: 'Wipes all previous command output and text from the CMD terminal window, giving you a fresh clean screen.',
    before: `C:\\LevelUpDev>dir
src
public
package.json
...

C:\\LevelUpDev>cls`,
    runCommand: 'cls',
    after: `C:\\LevelUpDev>`,
  },
  {
    id: 'cmd-7',
    number: 7,
    name: 'TREE',
    command: 'tree',
    category: 'Navigation & File System',
    categoryId: 'navigation-files',
    description: 'Shows the folder structure as a visual tree.',
    whatHappens: 'Draws a hierarchical visual branch diagram of all subfolders inside the current directory.',
    before: `C:\\LevelUpDev>

tree`,
    runCommand: 'tree',
    after: `LevelUpDev
├── src
├── public
└── package.json`,
    tip: 'Use "tree /f" to show both folders AND files in the tree view structure.',
    secondaryExample: {
      title: 'tree /f (Show Folders + Files)',
      command: 'tree /f',
      description: 'Displays the full tree structure including all files inside every folder.',
      before: `C:\\LevelUpDev> tree /f`,
      after: `LevelUpDev
├── src
│   ├── App.tsx
│   └── main.tsx
├── public
│   └── favicon.ico
└── package.json`,
    },
  },

  // CATEGORY 2: Files & Folders
  {
    id: 'cmd-8',
    number: 8,
    name: 'TYPE',
    command: 'type README.md',
    category: 'Files & Folders',
    categoryId: 'files-folders',
    description: 'Displays the contents of a text file in CMD.',
    whatHappens: 'Reads and prints the exact text contents of the specified file directly in your terminal.',
    before: `C:\\LevelUpDev>

type README.md`,
    runCommand: 'type README.md',
    after: `# LevelUpDev

Student Career Development Platform`,
  },
  {
    id: 'cmd-9',
    number: 9,
    name: 'COPY',
    command: 'copy file.txt backup.txt',
    category: 'Files & Folders',
    categoryId: 'files-folders',
    description: 'Copies a file and creates another copy.',
    whatHappens: 'Duplicates the source file with the new target filename while keeping the original intact.',
    before: `project/
└── data.txt`,
    runCommand: 'copy data.txt backup.txt',
    after: `project/
├── data.txt
└── backup.txt   ← NEW COPY`,
  },
  {
    id: 'cmd-10',
    number: 10,
    name: 'MOVE',
    command: 'move test.txt src\\',
    category: 'Files & Folders',
    categoryId: 'files-folders',
    description: 'Moves a file from one folder to another.',
    whatHappens: 'Relocates the file to the destination folder and removes it from the source location.',
    before: `project/
├── test.txt
└── src/`,
    runCommand: 'move test.txt src\\',
    after: `project/
└── src/
    └── test.txt   ← MOVED`,
  },
  {
    id: 'cmd-11',
    number: 11,
    name: 'REN',
    command: 'ren old.txt new.txt',
    category: 'Files & Folders',
    categoryId: 'files-folders',
    description: 'Renames a file or folder.',
    whatHappens: 'Changes the file or folder name in place without modifying its contents.',
    before: `old.txt`,
    runCommand: 'ren old.txt new.txt',
    after: `new.txt   ← RENAMED`,
  },
  {
    id: 'cmd-12',
    number: 12,
    name: 'DEL',
    command: 'del test.txt',
    category: 'Files & Folders',
    categoryId: 'files-folders',
    description: 'Deletes a file.',
    whatHappens: 'Permanently removes the specified file from the disk.',
    before: `project/
├── test.txt
└── app.js`,
    runCommand: 'del test.txt',
    after: `project/
└── app.js`,
    warning: '⚠️ Be careful — deleted files may not be recoverable through CMD (bypasses Windows Recycle Bin).',
  },
  {
    id: 'cmd-13',
    number: 13,
    name: 'RMDIR',
    command: 'rmdir foldername',
    category: 'Files & Folders',
    categoryId: 'files-folders',
    description: 'Removes an empty folder.',
    whatHappens: 'Deletes the specified folder if it contains no files or subfolders.',
    before: `project/
└── old-folder/`,
    runCommand: 'rmdir old-folder',
    after: `project/`,
    warning: '⚠️ Use "rmdir /s foldername" to remove a folder and all its contents. Always double-check folder name before running /s!',
    secondaryExample: {
      title: 'rmdir /s (Recursive Directory Removal)',
      command: 'rmdir /s /q build',
      description: 'Removes the folder and all nested files and subdirectories without prompting for confirmation.',
      before: `project/\n└── build/\n    ├── index.html\n    └── bundle.js`,
      after: `project/   ← 'build' directory and all contents deleted`,
    },
  },

  // CATEGORY 3: Python
  {
    id: 'cmd-14',
    number: 14,
    name: 'PYTHON --VERSION',
    command: 'python --version',
    category: 'Python',
    categoryId: 'python',
    description: 'Checks which Python version is installed.',
    whatHappens: 'Queries the Python executable in your PATH and outputs the exact version number.',
    before: `C:\\LevelUpDev>

python --version`,
    runCommand: 'python --version',
    after: `Python 3.12.2`,
  },
  {
    id: 'cmd-15',
    number: 15,
    name: 'PYTHON',
    command: 'python',
    category: 'Python',
    categoryId: 'python',
    description: 'Opens the Python interactive interpreter (REPL).',
    whatHappens: 'Launches the interactive Python prompt (>>>) where you can type and execute Python code line by line.',
    before: `C:\\LevelUpDev>python`,
    runCommand: 'python',
    after: `>>> print("Hello LevelUpDev")
Hello LevelUpDev`,
    tip: 'Type "exit()" or press Ctrl+Z followed by Enter to exit the Python interpreter.',
  },
  {
    id: 'cmd-16',
    number: 16,
    name: 'PYTHON FILE',
    command: 'python app.py',
    category: 'Python',
    categoryId: 'python',
    description: 'Runs a Python file.',
    whatHappens: 'Executes the Python script located in the current directory and prints output to CMD.',
    before: `app.py (containing: print("Hello LevelUpDev!"))`,
    runCommand: 'python app.py',
    after: `Hello LevelUpDev!`,
  },
  {
    id: 'cmd-17',
    number: 17,
    name: 'PIP INSTALL',
    command: 'pip install pandas',
    category: 'Python',
    categoryId: 'python',
    description: 'Installs a Python package/library from PyPI.',
    whatHappens: 'Downloads the package and its dependencies and installs them into your Python environment.',
    before: `Python Project
        ↓
pip install pandas`,
    runCommand: 'pip install pandas',
    after: `Collecting pandas
Installing collected packages: pytz, numpy, pandas
Successfully installed pandas-2.2.1`,
  },
  {
    id: 'cmd-18',
    number: 18,
    name: 'PIP LIST',
    command: 'pip list',
    category: 'Python',
    categoryId: 'python',
    description: 'Shows the Python packages currently installed.',
    whatHappens: 'Outputs a table of all Python libraries and their installed version numbers.',
    before: `C:\\LevelUpDev>

pip list`,
    runCommand: 'pip list',
    after: `Package       Version
------------  -------
numpy         1.26.4
pandas        2.2.1
requests      2.31.0
scipy         1.12.0`,
  },
  {
    id: 'cmd-19',
    number: 19,
    name: 'PIP UNINSTALL',
    command: 'pip uninstall pandas',
    category: 'Python',
    categoryId: 'python',
    description: 'Removes an installed Python package.',
    whatHappens: 'Deletes the specified package and files from your Python site-packages directory.',
    before: `pandas installed
        ↓
pip uninstall pandas`,
    runCommand: 'pip uninstall -y pandas',
    after: `Uninstalling pandas-2.2.1:
Successfully uninstalled pandas-2.2.1`,
  },

  // CATEGORY 4: Node.js & npm
  {
    id: 'cmd-20',
    number: 20,
    name: 'NODE --VERSION',
    command: 'node --version',
    category: 'Node.js & npm',
    categoryId: 'node-npm',
    description: 'Checks the installed Node.js version.',
    whatHappens: 'Outputs the installed version of the Node.js runtime (e.g. v20.11.0).',
    before: `C:\\LevelUpDev>

node --version`,
    runCommand: 'node --version',
    after: `v20.11.0`,
  },
  {
    id: 'cmd-21',
    number: 21,
    name: 'NPM --VERSION',
    command: 'npm --version',
    category: 'Node.js & npm',
    categoryId: 'node-npm',
    description: 'Checks the installed npm version.',
    whatHappens: 'Outputs the version number of the Node Package Manager.',
    before: `C:\\LevelUpDev>

npm --version`,
    runCommand: 'npm --version',
    after: `10.2.4`,
  },
  {
    id: 'cmd-22',
    number: 22,
    name: 'NPM INSTALL',
    command: 'npm install',
    category: 'Node.js & npm',
    categoryId: 'node-npm',
    description: 'Installs all dependencies listed in package.json.',
    whatHappens: 'Reads package.json, downloads required libraries from npm registry, and places them into node_modules/.',
    before: `package.json
      ↓
npm install`,
    runCommand: 'npm install',
    after: `added 428 packages in 4s
node_modules/   ← CREATED / UPDATED`,
  },
  {
    id: 'cmd-23',
    number: 23,
    name: 'NPM INSTALL PACKAGE',
    command: 'npm install axios',
    category: 'Node.js & npm',
    categoryId: 'node-npm',
    description: 'Installs a specific npm package into the project.',
    whatHappens: 'Downloads the package, adds it to node_modules/, and updates dependencies in package.json.',
    before: `Project
   ↓
npm install axios`,
    runCommand: 'npm install axios',
    after: `package.json updated:
"dependencies": {
  "axios": "^1.6.8"
}
axios installed`,
  },
  {
    id: 'cmd-24',
    number: 24,
    name: 'NPM UNINSTALL',
    command: 'npm uninstall axios',
    category: 'Node.js & npm',
    categoryId: 'node-npm',
    description: 'Removes an npm package from the project.',
    whatHappens: 'Removes the package from node_modules and removes it from package.json dependencies.',
    before: `axios installed
      ↓
npm uninstall axios`,
    runCommand: 'npm uninstall axios',
    after: `removed 1 package in 0.8s
axios removed from package.json`,
  },
  {
    id: 'cmd-25',
    number: 25,
    name: 'NPM RUN DEV',
    command: 'npm run dev',
    category: 'Node.js & npm',
    categoryId: 'node-npm',
    description: 'Starts the development server for projects such as React/Vite.',
    whatHappens: 'Starts a hot-reloading local web server so you can view and test your web app live in the browser.',
    before: `LevelUpDev Project
        ↓
npm run dev`,
    runCommand: 'npm run dev',
    after: `  VITE v5.1.4  ready in 240 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose`,
  },
  {
    id: 'cmd-26',
    number: 26,
    name: 'NPM RUN BUILD',
    command: 'npm run build',
    category: 'Node.js & npm',
    categoryId: 'node-npm',
    description: 'Creates a production build of the project.',
    whatHappens: 'Bundles, minifies, and optimizes TypeScript/JavaScript/CSS files into the dist/ or .next/ build folder.',
    before: `Source Code
     ↓
npm run build`,
    runCommand: 'npm run build',
    after: `dist/
├── assets/index-b4f1.js
├── assets/index-9c2e.css
└── index.html
✓ built in 1.42s (Production Build Ready)`,
  },
  {
    id: 'cmd-27',
    number: 27,
    name: 'NPM RUN PREVIEW',
    command: 'npm run preview',
    category: 'Node.js & npm',
    categoryId: 'node-npm',
    description: 'Previews the production build locally.',
    whatHappens: 'Spins up a lightweight local server serving the built dist/ folder to verify production behavior before deploying.',
    before: `dist/ (Production Build)
 ↓
npm run preview`,
    runCommand: 'npm run preview',
    after: `  ➜  Local:   http://localhost:4173/
  Local preview running from dist/`,
  },
  {
    id: 'cmd-28',
    number: 28,
    name: 'NPM LIST',
    command: 'npm list',
    category: 'Node.js & npm',
    categoryId: 'node-npm',
    description: 'Shows the installed npm dependencies of the project.',
    whatHappens: 'Prints the tree of installed packages and versions in your local project.',
    before: `C:\\LevelUpDev>

npm list --depth=0`,
    runCommand: 'npm list --depth=0',
    after: `levelupdev@0.1.0 C:\\LevelUpDev
├── lucide-react@0.344.0
├── next@15.1.0
├── react@19.0.0
└── tailwindcss@3.4.1`,
  },

  // CATEGORY 5: Git & GitHub
  {
    id: 'cmd-29',
    number: 29,
    name: 'GIT --VERSION',
    command: 'git --version',
    category: 'Git & GitHub',
    categoryId: 'git-github',
    description: 'Checks whether Git is installed and shows its version.',
    whatHappens: 'Confirms that Git CLI is available in your PATH and prints the active version.',
    before: `C:\\LevelUpDev>

git --version`,
    runCommand: 'git --version',
    after: `git version 2.43.0.windows.1`,
  },
  {
    id: 'cmd-30',
    number: 30,
    name: 'GIT INIT',
    command: 'git init',
    category: 'Git & GitHub',
    categoryId: 'git-github',
    description: 'Creates a new Git repository in the current project.',
    whatHappens: 'Initializes a hidden .git/ folder to track version control and history for your files.',
    before: `LevelUpDev/
├── src/
├── package.json
└── README.md`,
    runCommand: 'git init',
    after: `Initialized empty Git repository in C:/LevelUpDev/.git/

LevelUpDev/
├── .git/   ← NEW GIT DATABASE
├── src/
├── package.json
└── README.md`,
  },
  {
    id: 'cmd-31',
    number: 31,
    name: 'GIT STATUS',
    command: 'git status',
    category: 'Git & GitHub',
    categoryId: 'git-github',
    description: 'Shows which files have changed, been added, or are untracked.',
    whatHappens: 'Inspects your working directory and reports staged, modified, and untracked files.',
    before: `C:\\LevelUpDev>

git status`,
    runCommand: 'git status',
    after: `On branch main
Changes not staged for commit:
  modified:   src/App.tsx

Untracked files:
  new-feature.tsx`,
  },
  {
    id: 'cmd-32',
    number: 32,
    name: 'GIT ADD',
    command: 'git add .',
    category: 'Git & GitHub',
    categoryId: 'git-github',
    description: 'Stages all changed files so they can be committed.',
    whatHappens: 'Moves all modified and newly created files in the current folder into the Git staging area.',
    before: `Changed Files (Unstaged)
      ↓
git add .`,
    runCommand: 'git add .',
    after: `Staged Files
      ↓
Ready to Commit (git commit)`,
  },
  {
    id: 'cmd-33',
    number: 33,
    name: 'GIT COMMIT',
    command: 'git commit -m "Add dashboard"',
    category: 'Git & GitHub',
    categoryId: 'git-github',
    description: 'Saves a snapshot of staged changes with a message.',
    whatHappens: 'Creates a permanent commit record with an SHA hash and your descriptive commit message.',
    before: `Staged Changes
      ↓
git commit -m "Add dashboard"`,
    runCommand: 'git commit -m "Add dashboard"',
    after: `[main a83f21a] Add dashboard
 3 files changed, 142 insertions(+)
Git History Updated!`,
  },
  {
    id: 'cmd-34',
    number: 34,
    name: 'GIT LOG',
    command: 'git log --oneline',
    category: 'Git & GitHub',
    categoryId: 'git-github',
    description: 'Shows previous commits in a compact format.',
    whatHappens: 'Prints a chronological list of recent commits with their shortened hash and commit message.',
    before: `C:\\LevelUpDev>

git log --oneline`,
    runCommand: 'git log --oneline',
    after: `a83f21a Add dashboard
91bd72f Fix login authentication
72cd310 Initial commit`,
  },
  {
    id: 'cmd-35',
    number: 35,
    name: 'GIT CLONE',
    command: 'git clone REPOSITORY_URL',
    category: 'Git & GitHub',
    categoryId: 'git-github',
    description: 'Downloads a Git repository from GitHub or another Git server.',
    whatHappens: 'Copies the complete repository, branch history, and files from GitHub into a new local folder on your computer.',
    before: `GitHub Repository (https://github.com/user/project.git)
       ↓
git clone https://github.com/user/project.git`,
    runCommand: 'git clone https://github.com/user/project.git',
    after: `Cloning into 'project'...
remote: Enumerating objects: 85, done.
Your Computer
       ↓
Project Folder Created with all code!`,
  },
  {
    id: 'cmd-36',
    number: 36,
    name: 'GIT PULL',
    command: 'git pull',
    category: 'Git & GitHub',
    categoryId: 'git-github',
    description: 'Downloads the latest changes from the remote repository and updates your local project.',
    whatHappens: 'Fetches commits from GitHub and merges them directly into your current local branch.',
    before: `GitHub (New teammate commits)
  ↓
git pull`,
    runCommand: 'git pull origin main',
    after: `Updating 72cd310..a83f21a
Fast-forward
 src/App.tsx | 24 ++++++++--
Local Project Updated!`,
  },
  {
    id: 'cmd-37',
    number: 37,
    name: 'GIT PUSH',
    command: 'git push',
    category: 'Git & GitHub',
    categoryId: 'git-github',
    description: 'Uploads your local commits to the remote repository (GitHub).',
    whatHappens: 'Sends your committed changes up to GitHub so teammates can see and review them.',
    before: `Local Project (1 commit ahead)
     ↓
git push`,
    runCommand: 'git push origin main',
    after: `Enumerating objects: 5, done.
To https://github.com/user/project.git
   91bd72f..a83f21a  main -> main
GitHub Updated!`,
  },
  {
    id: 'cmd-38',
    number: 38,
    name: 'GIT BRANCH',
    command: 'git branch',
    category: 'Git & GitHub',
    categoryId: 'git-github',
    description: 'Shows the Git branches in the project.',
    whatHappens: 'Lists all local branches with an asterisk (*) marking your currently active branch.',
    before: `C:\\LevelUpDev>

git branch`,
    runCommand: 'git branch',
    after: `* main
  feature-dashboard
  feature-login`,
  },
  {
    id: 'cmd-39',
    number: 39,
    name: 'GIT SWITCH',
    command: 'git switch feature-dashboard',
    category: 'Git & GitHub',
    categoryId: 'git-github',
    description: 'Switches to another Git branch.',
    whatHappens: 'Changes your working directory files to match the selected branch.',
    before: `main (Active branch)
  ↓
git switch feature-dashboard`,
    runCommand: 'git switch feature-dashboard',
    after: `Switched to branch 'feature-dashboard'
feature-dashboard (Active)`,
  },
  {
    id: 'cmd-40',
    number: 40,
    name: 'GIT SWITCH -C',
    command: 'git switch -c feature-dashboard',
    category: 'Git & GitHub',
    categoryId: 'git-github',
    description: 'Creates a new branch and switches to it immediately.',
    whatHappens: 'Forks a new branch from your current commit and sets it as your active working branch.',
    before: `main
  ↓
git switch -c feature-dashboard`,
    runCommand: 'git switch -c feature-dashboard',
    after: `Switched to a new branch 'feature-dashboard'
New Branch Created & Checked Out!`,
  },

  // CATEGORY 6: Networking & API Testing
  {
    id: 'cmd-41',
    number: 41,
    name: 'PING',
    command: 'ping google.com',
    category: 'Networking & API Testing',
    categoryId: 'networking',
    description: 'Checks whether a server or website can be reached over the network.',
    whatHappens: 'Sends ICMP echo packets to the destination address and measures the round-trip latency in milliseconds.',
    before: `Your Computer
      ↓
    ping google.com`,
    runCommand: 'ping google.com',
    after: `Pinging google.com [142.250.190.46] with 32 bytes of data:
Reply from 142.250.190.46: bytes=32 time=14ms TTL=117
Reply received (Network connected!)`,
  },
  {
    id: 'cmd-42',
    number: 42,
    name: 'IPCONFIG',
    command: 'ipconfig',
    category: 'Networking & API Testing',
    categoryId: 'networking',
    description: 'Shows basic network configuration such as your IP address.',
    whatHappens: 'Outputs the IPv4 address, Subnet Mask, and Default Gateway for all active network adapters.',
    before: `C:\\LevelUpDev>

ipconfig`,
    runCommand: 'ipconfig',
    after: `Wireless LAN adapter Wi-Fi:
   IPv4 Address. . . . . . . . . . . : 192.168.1.45
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1`,
  },
  {
    id: 'cmd-43',
    number: 43,
    name: 'IPCONFIG /ALL',
    command: 'ipconfig /all',
    category: 'Networking & API Testing',
    categoryId: 'networking',
    description: 'Shows detailed network configuration information.',
    whatHappens: 'Prints comprehensive adapter details including MAC physical address, DHCP server, DNS servers, and lease times.',
    before: `C:\\LevelUpDev>

ipconfig /all`,
    runCommand: 'ipconfig /all',
    after: `Host Name . . . . . . . . . . . . : LEVELUP-LAPTOP
Physical Address. . . . . . . . . : 00-1A-2B-3C-4D-5E
DHCP Enabled. . . . . . . . . . . : Yes
IPv4 Address. . . . . . . . . . . : 192.168.1.45 (Preferred)
DNS Servers . . . . . . . . . . . : 8.8.8.8, 1.1.1.1`,
  },
  {
    id: 'cmd-44',
    number: 44,
    name: 'IPCONFIG /FLUSHDNS',
    command: 'ipconfig /flushdns',
    category: 'Networking & API Testing',
    categoryId: 'networking',
    description: 'Clears the computer\'s DNS cache.',
    whatHappens: 'Wipes the cached domain-to-IP lookup table, forcing Windows to query fresh DNS records on the next connection.',
    before: `Old DNS Cache
      ↓
ipconfig /flushdns`,
    runCommand: 'ipconfig /flushdns',
    after: `Windows IP Configuration

Successfully flushed the DNS Resolver Cache.`,
  },
  {
    id: 'cmd-45',
    number: 45,
    name: 'CURL',
    command: 'curl https://example.com',
    category: 'Networking & API Testing',
    categoryId: 'networking',
    description: 'Sends a request to a URL and displays the response.',
    whatHappens: 'Performs an HTTP GET request to the target web address and outputs the response body directly in CMD.',
    before: `CMD
 ↓
curl URL
 ↓
Server`,
    runCommand: 'curl https://example.com',
    after: `<!doctype html>
<html>
<head><title>Example Domain</title></head>
<body><h1>Example Domain</h1></body>
</html>`,
    secondaryExample: {
      title: 'Testing Local API Endpoints',
      command: 'curl http://localhost:3000/api/users',
      description: 'Useful for testing APIs from CMD without opening Postman or a browser.',
      before: `curl http://localhost:3000/api/users`,
      after: `[{"id":1,"name":"Alex","role":"Developer"},{"id":2,"name":"Sam","role":"Designer"}]`,
    },
  },

  // CATEGORY 7: Processes & Ports
  {
    id: 'cmd-46',
    number: 46,
    name: 'TASKLIST',
    command: 'tasklist',
    category: 'Processes & Ports',
    categoryId: 'processes-ports',
    description: 'Shows currently running processes on Windows.',
    whatHappens: 'Outputs a table of every running task, executable image name, and its unique Process ID (PID).',
    before: `C:\\LevelUpDev>

tasklist`,
    runCommand: 'tasklist',
    after: `Image Name                     PID Session Name        Mem Usage
========================= ======== ================ ============
node.exe                      5420 Console              85,420 K
chrome.exe                    8124 Console             142,310 K
Code.exe                      9230 Console             210,500 K`,
  },
  {
    id: 'cmd-47',
    number: 47,
    name: 'TASKLIST + FINDSTR',
    command: 'tasklist | findstr node',
    category: 'Processes & Ports',
    categoryId: 'processes-ports',
    description: 'Searches the running processes for a specific program.',
    whatHappens: 'Filters tasklist output and only displays lines matching the program name "node".',
    before: `All Processes (Hundreds of background tasks)
      ↓
tasklist | findstr node`,
    runCommand: 'tasklist | findstr node',
    after: `node.exe                      5420 Console              85,420 K
node.exe                     11480 Console              92,100 K`,
  },
  {
    id: 'cmd-48',
    number: 48,
    name: 'TASKKILL',
    command: 'taskkill /PID 5420 /F',
    category: 'Processes & Ports',
    categoryId: 'processes-ports',
    description: 'Stops a running process using its process ID (PID).',
    whatHappens: 'Forcefully terminates (/F) the process associated with the specified PID number.',
    before: `node.exe
PID: 5420 (Stuck or hanging process)
      ↓
taskkill /PID 5420 /F`,
    runCommand: 'taskkill /PID 5420 /F',
    after: `SUCCESS: The process with PID 5420 has been terminated.`,
    warning: '⚠️ Only stop a process when you know what it is (e.g. your local node dev server, not Windows system processes).',
  },
  {
    id: 'cmd-49',
    number: 49,
    name: 'NETSTAT',
    command: 'netstat -ano',
    category: 'Processes & Ports',
    categoryId: 'processes-ports',
    description: 'Shows active network connections and their process IDs.',
    whatHappens: 'Lists all listening ports, established network connections, protocols, IP addresses, and owning PIDs.',
    before: `C:\\LevelUpDev>

netstat -ano`,
    runCommand: 'netstat -ano',
    after: `  Proto  Local Address          Foreign Address        State           PID
  TCP    0.0.0.0:5173           0.0.0.0:0              LISTENING       5420
  TCP    127.0.0.1:3000         0.0.0.0:0              LISTENING       8840`,
  },
  {
    id: 'cmd-50',
    number: 50,
    name: 'NETSTAT + FINDSTR',
    command: 'netstat -ano | findstr :5173',
    category: 'Processes & Ports',
    categoryId: 'processes-ports',
    description: 'Checks which process is using a specific port (e.g. 5173).',
    whatHappens: 'Finds the exact Process ID (PID) occupying the specified port so you can free it up if blocked.',
    before: `Port 5173 (Port already in use error)
    ↓
netstat -ano | findstr :5173`,
    runCommand: 'netstat -ano | findstr :5173',
    after: `  TCP    0.0.0.0:5173           0.0.0.0:0              LISTENING       5420
PID found: 5420 (Now you can kill it with taskkill /PID 5420 /F)`,
  },

  // CATEGORY 8: Search & Information
  {
    id: 'cmd-51',
    number: 51,
    name: 'FINDSTR',
    command: 'findstr "firebase" package.json',
    category: 'Search & Information',
    categoryId: 'search-info',
    description: 'Searches for specific text inside a file.',
    whatHappens: 'Scans the specified file and prints every line that contains the matched search string.',
    before: `package.json
      ↓
findstr "firebase" package.json`,
    runCommand: 'findstr "firebase" package.json',
    after: `    "firebase": "^10.8.0",
    "firebase-admin": "^12.0.0"`,
    secondaryExample: {
      title: 'Recursive Search Across All Files',
      command: 'findstr /s /i "firebase" *.ts',
      description: 'Searches for text case-insensitively (/i) across all matching files and subfolders (/s).',
      before: `findstr /s /i "firebase" *.ts`,
      after: `src\\lib\\firebase.ts: import { initializeApp } from 'firebase/app';\nsrc\\context\\AuthContext.tsx: import { auth } from '@/lib/firebase';`,
    },
  },
  {
    id: 'cmd-52',
    number: 52,
    name: 'WHOAMI',
    command: 'whoami',
    category: 'Search & Information',
    categoryId: 'search-info',
    description: 'Shows the currently logged-in Windows user.',
    whatHappens: 'Outputs your computer name and active user account name.',
    before: `C:\\LevelUpDev>

whoami`,
    runCommand: 'whoami',
    after: `DESKTOP-STUDENT\\Developer`,
  },
  {
    id: 'cmd-53',
    number: 53,
    name: 'ECHO %CD%',
    command: 'echo %cd%',
    category: 'Search & Information',
    categoryId: 'search-info',
    description: 'Shows the current directory path.',
    whatHappens: 'Evaluates the built-in %cd% environment variable and prints the absolute current working folder path.',
    before: `C:\\LevelUpDev>

echo %cd%`,
    runCommand: 'echo %cd%',
    after: `C:\\Projects\\LevelUpDev`,
  },
  {
    id: 'cmd-54',
    number: 54,
    name: 'ECHO %PATH%',
    command: 'echo %PATH%',
    category: 'Search & Information',
    categoryId: 'search-info',
    description: 'Shows the directories Windows searches when running commands.',
    whatHappens: 'Prints the entire system PATH variable containing directory paths for node, python, git, etc.',
    before: `C:\\LevelUpDev>

echo %PATH%`,
    runCommand: 'echo %PATH%',
    after: `C:\\Windows\\System32;C:\\Program Files\\nodejs;C:\\Python312;C:\\Program Files\\Git\\cmd`,
  },
  {
    id: 'cmd-55',
    number: 55,
    name: 'SYSTEMINFO',
    command: 'systeminfo',
    category: 'Search & Information',
    categoryId: 'search-info',
    description: 'Displays detailed Windows system information.',
    whatHappens: 'Scans the OS hardware and software and displays RAM, processor type, OS version, BIOS, and network adapters.',
    before: `C:\\LevelUpDev>

systeminfo`,
    runCommand: 'systeminfo',
    after: `OS Name:                   Microsoft Windows 11 Pro
OS Version:                10.0.22631 N/A Build 22631
System Manufacturer:       Lenovo / Dell / HP
Total Physical Memory:     16,240 MB`,
  },

  // CATEGORY 9: Environment Variables
  {
    id: 'cmd-56',
    number: 56,
    name: 'SET',
    command: 'set NODE_ENV=development',
    category: 'Environment Variables',
    categoryId: 'env-vars',
    description: 'Creates or changes an environment variable for the current CMD session.',
    whatHappens: 'Assigns a key-value environment variable accessible by child programs in the active CMD window.',
    before: `NODE_ENV (Not set)
   ↓
set NODE_ENV=development`,
    runCommand: 'set NODE_ENV=development',
    after: `NODE_ENV = development (Active in this CMD session)`,
  },
  {
    id: 'cmd-57',
    number: 57,
    name: 'ECHO ENVIRONMENT VARIABLE',
    command: 'echo %NODE_ENV%',
    category: 'Environment Variables',
    categoryId: 'env-vars',
    description: 'Displays the value of an environment variable.',
    whatHappens: 'Reads the variable wrapped in percent signs (%) and prints its assigned string value.',
    before: `C:\\LevelUpDev>

echo %NODE_ENV%`,
    runCommand: 'echo %NODE_ENV%',
    after: `development`,
  },

  // CATEGORY 10: Help & Command Discovery
  {
    id: 'cmd-58',
    number: 58,
    name: 'COMMAND /?',
    command: 'dir /?',
    category: 'Help & Command Discovery',
    categoryId: 'help-discovery',
    description: 'Shows help and available options/flags for a command.',
    whatHappens: 'Displays full documentation, syntax parameters, and switch explanations for the command.',
    before: `Unknown command options / flags
        ↓
dir /?`,
    runCommand: 'dir /?',
    after: `Displays a list of files and subdirectories in a directory.

DIR [drive:][path][filename] [/A[[:]attributes]] [/B] [/C] [/D] [/L] [/N]
  /A          Displays files with specified attributes.
  /B          Uses bare format (no heading information or summary).
  /S          Displays files in specified directory and all subdirectories.`,
    tip: 'Try also "ipconfig /?" or "taskkill /?" to discover all switches for any command.',
  },
  {
    id: 'cmd-59',
    number: 59,
    name: 'HELP',
    command: 'help',
    category: 'Help & Command Discovery',
    categoryId: 'help-discovery',
    description: 'Shows a list of CMD commands and basic help information.',
    whatHappens: 'Prints a glossary of standard Windows Command Prompt commands with 1-line summaries.',
    before: `C:\\LevelUpDev>

help`,
    runCommand: 'help',
    after: `For more information on a specific command, type HELP command-name
ASSOC          Displays or modifies file extension associations.
ATTRIB         Displays or changes file attributes.
CD             Displays the name of or changes the current directory.
CLS            Clears the screen.
COPY           Copies one or more files to another location.
DEL            Deletes one or more files.
DIR            Displays a list of files and subdirectories in a directory.`,
  },

  // CATEGORY 11: Useful CMD Operators
  {
    id: 'cmd-60',
    number: 60,
    name: '&& (AND OPERATOR)',
    command: 'npm install && npm run dev',
    category: 'Useful CMD Operators',
    categoryId: 'cmd-operators',
    description: 'Runs the second command only if the first command succeeds.',
    whatHappens: 'Executes command 1. If error code is 0 (success), it automatically runs command 2. If command 1 fails, command 2 is skipped.',
    before: `npm install
     ↓
SUCCESS? (Exit Code: 0)
     ↓
npm run dev`,
    runCommand: 'npm install && npm run dev',
    after: `added 428 packages in 4s
  ➜  Local:   http://localhost:5173/`,
  },
  {
    id: 'cmd-61',
    number: 61,
    name: '| (PIPE OPERATOR)',
    command: 'tasklist | findstr node',
    category: 'Useful CMD Operators',
    categoryId: 'cmd-operators',
    description: 'Passes the output of one command into another command.',
    whatHappens: 'Redirects standard output of the left command as the input stream for the right command.',
    before: `tasklist (produces text list)
   ↓
   | (Pipe)
   ↓
findstr node (filters text)`,
    runCommand: 'tasklist | findstr node',
    after: `node.exe                      5420 Console              85,420 K`,
  },
  {
    id: 'cmd-62',
    number: 62,
    name: '> (REDIRECT OUTPUT)',
    command: 'dir > files.txt',
    category: 'Useful CMD Operators',
    categoryId: 'cmd-operators',
    description: 'Saves command output into a file (overwrites existing).',
    whatHappens: 'Redirects terminal output and creates or overwrites the target file with the result.',
    before: `dir output
    ↓
    >
    ↓
files.txt (created / overwritten)`,
    runCommand: 'dir > files.txt',
    after: `files.txt created containing the directory listing.`,
  },
  {
    id: 'cmd-63',
    number: 63,
    name: '>> (APPEND OUTPUT)',
    command: 'dir >> files.txt',
    category: 'Useful CMD Operators',
    categoryId: 'cmd-operators',
    description: 'Adds command output to the end of an existing file.',
    whatHappens: 'Appends output to the bottom of the target file without erasing previous lines.',
    before: `Existing files.txt
        +
New command output
        ↓
files.txt (Appended)`,
    runCommand: 'dir >> files.txt',
    after: `files.txt updated with new lines appended at the end.`,
  },
];

export const TROUBLESHOOTING_COMMANDS = [
  {
    command: 'npm list',
    title: 'Check installed npm dependencies',
    desc: 'Verify if required packages are missing or duplicated in node_modules.',
    refId: 'cmd-28',
  },
  {
    command: 'python --version',
    title: 'Check Python installation',
    desc: 'Confirm Python is added to Windows PATH and verify active interpreter version.',
    refId: 'cmd-14',
  },
  {
    command: 'node --version',
    title: 'Check Node.js installation',
    desc: 'Verify Node.js runtime availability before starting modern web tooling.',
    refId: 'cmd-20',
  },
  {
    command: 'git --version',
    title: 'Check Git installation',
    desc: 'Verify Git CLI tools are installed for version control operations.',
    refId: 'cmd-29',
  },
  {
    command: 'netstat -ano',
    title: 'Check active ports & connections',
    desc: 'Diagnose "Port 5173 / 3000 already in use" errors and find the locking PID.',
    refId: 'cmd-49',
  },
  {
    command: 'tasklist',
    title: 'Check running processes',
    desc: 'Inspect frozen Node, Python, or Chrome processes consuming CPU/RAM.',
    refId: 'cmd-46',
  },
  {
    command: 'taskkill /PID 12345 /F',
    title: 'Stop a process using its PID',
    desc: 'Force close a hung development server or background daemon.',
    refId: 'cmd-48',
  },
  {
    command: 'ping google.com',
    title: 'Check network connectivity',
    desc: 'Verify whether package registries (npm/PyPI/GitHub) can be reached.',
    refId: 'cmd-41',
  },
  {
    command: 'ipconfig',
    title: 'Check network configuration',
    desc: 'Find your local machine IP address for testing web apps across local mobile devices.',
    refId: 'cmd-42',
  },
  {
    command: 'curl http://localhost:3000',
    title: 'Test a local web/API endpoint',
    desc: 'Validate if your backend server is responding to HTTP requests from terminal.',
    refId: 'cmd-45',
  },
];
