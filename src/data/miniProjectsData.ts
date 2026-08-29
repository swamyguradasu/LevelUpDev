export interface DayPlan {
  day: number;
  title: string;
  tasks: string[];
}

export interface MiniProject {
  projectId: string;
  title: string;
  category: 'Python' | 'Web Development' | 'SQL / Database' | 'DSA' | 'AI / ML';
  difficulty: 'Beginner' | 'Intermediate';
  duration: string; // "7 Days"
  description: string;
  icon: string;
  suggestedTech: string[];
  learnSkills: string[];
  overview: string;
  problemStatement: string;
  coreFeatures: string[];
  optionalFeatures: string[];
  sevenDayPlan: DayPlan[];
  expectedResult: string;
  portfolioValue: string;
}

export const MINI_PROJECTS_LIST: MiniProject[] = [
  // ==========================================
  // PYTHON
  // ==========================================
  {
    projectId: 'expense-tracker-cli',
    title: 'Expense Tracker CLI',
    category: 'Python',
    difficulty: 'Beginner',
    duration: '7 Days',
    icon: 'DollarSign',
    description: 'Build a command-line application to add, edit, delete, and view categorized expenses with persistent file storage.',
    suggestedTech: ['Python', 'JSON / CSV', 'Argparse', 'Tabulate'],
    learnSkills: [
      'Variables & Data Types',
      'Functions & Modular Architecture',
      'Lists & Dictionaries',
      'File Handling (JSON/CSV)',
      'Input Validation & Defensive Coding',
    ],
    overview:
      'A practical Python CLI application that allows users to record daily expenses, categorize them (Food, Travel, Utilities), filter by date ranges, and view summary statistics right from their terminal.',
    problemStatement:
      'Tracking personal daily spending manually in spreadsheets is tedious. This CLI tool provides an instant, keyboard-driven interface to log expenses and analyze budget consumption without heavy software overhead.',
    coreFeatures: [
      'Add expense with amount, category, date, and description',
      'View all expenses in a formatted terminal table',
      'Edit or delete existing expense records by ID',
      'Filter expenses by category and date range',
      'Persistent data storage in JSON/CSV format',
    ],
    optionalFeatures: [
      'Monthly budget limit alerts when spending exceeds 80%',
      'Export expense reports to CSV or summary text files',
      'CLI bar chart visualization for category spending',
    ],
    sevenDayPlan: [
      {
        day: 1,
        title: 'Planning & Environment Setup',
        tasks: [
          'Design expense data schema (id, amount, category, date, note)',
          'Set up project directory and Python virtual environment',
          'Create main.py CLI entry point and menu prompt structure',
        ],
      },
      {
        day: 2,
        title: 'Core Add & View Logic',
        tasks: [
          'Implement add_expense() with input validation (positive numbers, valid dates)',
          'Implement in-memory storage using lists of dictionaries',
          'Build view_expenses() to display recorded items in a clean format',
        ],
      },
      {
        day: 3,
        title: 'Persistent File Storage',
        tasks: [
          'Build storage.py module for reading/writing JSON or CSV files',
          'Ensure data loads automatically on startup and saves on mutation',
          'Handle missing or corrupted file edge cases gracefully',
        ],
      },
      {
        day: 4,
        title: 'Edit, Delete & Filter Features',
        tasks: [
          'Implement delete_expense(id) and update_expense(id)',
          'Add category filtering and total spending aggregation',
          'Add search by keyword in expense description',
        ],
      },
      {
        day: 5,
        title: 'Input Validation & Error Handling',
        tasks: [
          'Defensive checks for invalid dates, non-numeric inputs, and empty fields',
          'Improve CLI UX using colorama or rich terminal formatting',
          'Add confirmation prompts before deleting records',
        ],
      },
      {
        day: 6,
        title: 'Testing & Documentation',
        tasks: [
          'Write pytest unit tests for calculation and filtering functions',
          'Write a clean README.md with installation steps and CLI usage examples',
          'Include demo ASCII terminal screenshots',
        ],
      },
      {
        day: 7,
        title: 'Deployment & Portfolio Integration',
        tasks: [
          'Push code to GitHub with clean commits and MIT license',
          'Record a 30-second terminal walkthrough GIF / video demo',
          'Add GitHub repository link to your LevelUpDev Portfolio',
        ],
      },
    ],
    expectedResult:
      'A standalone Python CLI tool that can be installed via pip or run directly, persisting user expenses in JSON/CSV and generating structured terminal summary tables.',
    portfolioValue:
      'Demonstrates mastery of core Python fundamentals, file I/O, error handling, CLI user experience, and unit testing.',
  },
  {
    projectId: 'python-quiz-app',
    title: 'Python Quiz Application',
    category: 'Python',
    difficulty: 'Beginner',
    duration: '7 Days',
    icon: 'HelpCircle',
    description: 'Create a Python quiz application that loads topic questions, accepts timed answers, calculates scores, and shows detailed performance analytics.',
    suggestedTech: ['Python', 'JSON', 'Random Module', 'Rich / Colorama'],
    learnSkills: [
      'Functions & Modularity',
      'Lists, Tuples & Dictionaries',
      'Conditional Logic & Score Tracking',
      'Loops & Iteration Controls',
      'JSON File Parsing & Question Banks',
    ],
    overview:
      'An interactive terminal quiz platform where learners can select technical topics (Python, DSA, Web Basics), take timed multiple-choice assessments, and receive immediate answer explanations and score cards.',
    problemStatement:
      'Active recall testing is the most effective way to retain engineering concepts. This quiz application provides a customizable test runner for CS students to practice coding interview trivia.',
    coreFeatures: [
      'Load categorized multiple-choice questions from external JSON files',
      'Shuffle questions and options randomly each session',
      'Track user score, correct answers, and incorrect selections',
      'Detailed review screen showing correct answers with explanations',
      'High score leaderboard saved to local disk',
    ],
    optionalFeatures: [
      'Timer countdown per question (e.g. 15 seconds limit)',
      'Custom quiz builder mode where users can add their own questions',
      'Sound effects or terminal animations on streak answers',
    ],
    sevenDayPlan: [
      {
        day: 1,
        title: 'Planning & Schema Design',
        tasks: [
          'Design JSON schema for questions (id, question, options, answer_index, explanation)',
          'Create sample question bank files for Python & CS Basics',
          'Initialize repository and project folder structure',
        ],
      },
      {
        day: 2,
        title: 'Question Loader & Core Engine',
        tasks: [
          'Implement question loading from JSON files with validation',
          'Build quiz session manager to track score and current question index',
          'Format and print questions with numbered options (A, B, C, D)',
        ],
      },
      {
        day: 3,
        title: 'User Input & Evaluation',
        tasks: [
          'Capture user selection with case-insensitive validation (A/B/C/D)',
          'Verify answer accuracy, update score, and provide immediate feedback',
          'Shuffle options while maintaining correct answer reference',
        ],
      },
      {
        day: 4,
        title: 'Score Analytics & Review Mode',
        tasks: [
          'Calculate final percentage, accuracy grade, and time taken',
          'Generate post-quiz review table detailing mistakes and explanations',
          'Save best scores to highscores.json',
        ],
      },
      {
        day: 5,
        title: 'Rich Terminal Styling & Polish',
        tasks: [
          'Add color styling for correct (green) and incorrect (red) responses',
          'Add category selection menu at startup',
          'Handle unexpected Ctrl+C exits gracefully',
        ],
      },
      {
        day: 6,
        title: 'Testing & Refactoring',
        tasks: [
          'Test question bank parsing with various file formats',
          'Add unit tests for score calculation logic',
          'Write comprehensive documentation in README.md',
        ],
      },
      {
        day: 7,
        title: 'GitHub & Portfolio Showcase',
        tasks: [
          'Push repository to GitHub with sample quiz runs in README',
          'Add demo GIFs and setup instructions',
          'Link GitHub repo to your LevelUpDev profile',
        ],
      },
    ],
    expectedResult:
      'A robust terminal quiz application capable of loading any JSON question dataset, conducting randomized interactive quizzes, and displaying detailed performance summaries.',
    portfolioValue:
      'Shows strong logic structuring, collection manipulation, data serialization with JSON, and interactive CLI design.',
  },
  {
    projectId: 'student-grade-analyzer',
    title: 'Student Grade Analyzer',
    category: 'Python',
    difficulty: 'Intermediate',
    duration: '7 Days',
    icon: 'BarChart2',
    description: 'Create a data analytics application that ingests student test scores, computes statistical metrics, and generates visual performance reports.',
    suggestedTech: ['Python', 'Pandas', 'Matplotlib / Seaborn', 'NumPy'],
    learnSkills: [
      'Data Manipulation with Pandas DataFrames',
      'Statistical Metrics (Mean, Median, Std Dev)',
      'Data Cleaning & Handling Missing Values',
      'Data Visualization (Histograms, Grade Distribution)',
      'Exporting Analytical Reports',
    ],
    overview:
      'An analytical Python tool that processes student assessment CSVs, calculates subject-wise averages, percentile distributions, top performers, and produces chart visualizations for teachers and academic advisors.',
    problemStatement:
      'Educators often spend hours manually aggregating spreadsheet scores. This tool automates data ingestion, standard deviation analysis, grade threshold mapping, and report generation in seconds.',
    coreFeatures: [
      'Import student grades from CSV files with column mapping',
      'Compute mean, median, highest/lowest scores, and pass percentages',
      'Assign letter grades (A+, A, B, C, F) based on customizable curves',
      'Generate visual grade distribution histograms and subject comparisons',
      'Export summary reports to clean markdown or formatted CSV',
    ],
    optionalFeatures: [
      'Interactive CLI or basic Streamlit dashboard view',
      'Identify at-risk students who need academic intervention',
      'Compare performance trends across multiple exam semesters',
    ],
    sevenDayPlan: [
      {
        day: 1,
        title: 'Data Ingestion & Pandas Setup',
        tasks: [
          'Create realistic sample CSV datasets with student grades and subjects',
          'Install pandas, matplotlib, and setup analysis script',
          'Implement CSV loader with missing value detection',
        ],
      },
      {
        day: 2,
        title: 'Statistical Calculations',
        tasks: [
          'Calculate aggregate stats: mean, median, min, max, standard deviation',
          'Compute per-student total marks and GPA rankings',
          'Implement custom grading rubric functions (90+ = A, etc.)',
        ],
      },
      {
        day: 3,
        title: 'Subject-Wise Deep Dive',
        tasks: [
          'Group performance by subject, branch, and section',
          'Identify highest and lowest scoring subjects',
          'Find top 5 overall rankers across categories',
        ],
      },
      {
        day: 4,
        title: 'Data Visualizations',
        tasks: [
          'Plot grade distribution histograms using Matplotlib',
          'Create subject comparison bar charts',
          'Save generated charts as high-resolution PNG images',
        ],
      },
      {
        day: 5,
        title: 'Report Generation',
        tasks: [
          'Format results into clean text/markdown summary tables',
          'Export processed student ranks to final_grades.csv',
          'Add command-line flags to analyze different files',
        ],
      },
      {
        day: 6,
        title: 'Code Modularization & Testing',
        tasks: [
          'Refactor into modular classes (DataLoader, Analyzer, Visualizer)',
          'Write unit tests for GPA calculations and edge case scores (0, 100, null)',
          'Write comprehensive documentation with example outputs',
        ],
      },
      {
        day: 7,
        title: 'Publish & Showcase',
        tasks: [
          'Push repository to GitHub with sample charts embedded in README',
          'Link GitHub repo to your LevelUpDev Portfolio',
        ],
      },
    ],
    expectedResult:
      'A command-line or scriptable data analysis toolkit that takes raw score CSVs and automatically outputs statistical summaries, student rankings, and grade distribution charts.',
    portfolioValue:
      'Demonstrates practical data science fundamentals, Pandas DataFrame manipulation, statistical reasoning, and data visualization.',
  },

  // ==========================================
  // WEB DEVELOPMENT
  // ==========================================
  {
    projectId: 'personal-expense-dashboard',
    title: 'Personal Expense Dashboard',
    category: 'Web Development',
    difficulty: 'Beginner',
    duration: '7 Days',
    icon: 'PieChart',
    description: 'Create a responsive web dashboard for tracking expenses by category with interactive charts and LocalStorage persistence.',
    suggestedTech: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Chart.js', 'LocalStorage'],
    learnSkills: [
      'DOM Manipulation & Event Listeners',
      'Form Validation & State Handling',
      'Client-Side Persistence with LocalStorage',
      'Integrating 3rd-party libraries (Chart.js)',
      'Mobile-First Responsive Layouts (CSS Grid & Flexbox)',
    ],
    overview:
      'A modern, responsive single-page web app where users can track incomes and expenses, visualize their spending breakdown with donut charts, and monitor their balance without needing a backend server.',
    problemStatement:
      'Users need an accessible, visually appealing tool to manage daily personal finances on desktop and mobile that requires zero login setup and saves data locally.',
    coreFeatures: [
      'Interactive transaction form with category, amount, date, and description',
      'Dynamic balance, total income, and total expense calculation cards',
      'Live category breakdown donut/pie chart powered by Chart.js',
      'Filterable transaction history with delete actions',
      'LocalStorage persistence so data remains after refreshing',
    ],
    optionalFeatures: [
      'Dark mode / Light mode theme toggle',
      'Export and import data as JSON backup files',
      'Monthly budget limit indicator bar with warning colors',
    ],
    sevenDayPlan: [
      {
        day: 1,
        title: 'UI Wireframing & HTML Structure',
        tasks: [
          'Design semantic HTML layout: header, metric cards, chart container, transaction list',
          'Create responsive container grids and modal structures',
          'Set up CSS custom properties (color tokens, fonts, spacing)',
        ],
      },
      {
        day: 2,
        title: 'CSS Styling & Responsive Design',
        tasks: [
          'Style modern card components with soft shadows and rounded corners',
          'Ensure responsive layout adapts seamlessly to mobile screens',
          'Style form inputs, select dropdowns, and action buttons',
        ],
      },
      {
        day: 3,
        title: 'State & LocalStorage Management',
        tasks: [
          'Define transaction data model and state array in JavaScript',
          'Implement LocalStorage sync (saveTransactions, loadTransactions)',
          'Render transaction items dynamically into the DOM',
        ],
      },
      {
        day: 4,
        title: 'Form Handling & Financial Metrics',
        tasks: [
          'Add form submit listener with validation for positive numbers',
          'Compute live Total Balance, Income, and Expense summaries',
          'Implement delete transaction functionality with fade-out animations',
        ],
      },
      {
        day: 5,
        title: 'Chart.js Visualizations',
        tasks: [
          'Include Chart.js via CDN and initialize doughnut chart',
          'Dynamically group expenses by category and update chart data',
          'Add smooth transition animations on transaction additions',
        ],
      },
      {
        day: 6,
        title: 'Filtering, Search & Edge Cases',
        tasks: [
          'Add search by keyword and category filter dropdown',
          'Handle empty states with friendly onboarding illustrations',
          'Validate cross-browser compatibility (Chrome, Firefox, Safari)',
        ],
      },
      {
        day: 7,
        title: 'Deployment & Portfolio Showcase',
        tasks: [
          'Deploy live to GitHub Pages / Vercel / Netlify',
          'Write a clean README with live demo link and screenshots',
          'Link GitHub repo and Live Demo in your LevelUpDev Portfolio',
        ],
      },
    ],
    expectedResult:
      'A deployed, responsive personal finance web app featuring dynamic chart visualizations, instant balance calculations, and local browser persistence.',
    portfolioValue:
      'Proves core frontend proficiency in JavaScript, DOM events, UI responsiveness, charting integrations, and client-side storage.',
  },
  {
    projectId: 'task-management-app',
    title: 'Task Management App',
    category: 'Web Development',
    difficulty: 'Beginner',
    duration: '7 Days',
    icon: 'CheckSquare',
    description: 'Build a task management application featuring task creation, inline editing, completion toggles, category filtering, and drag/order support.',
    suggestedTech: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage'],
    learnSkills: [
      'Advanced DOM Manipulation',
      'CRUD Operations in Frontend JavaScript',
      'Event Delegation & Keyboard Shortcuts',
      'Filter & Sort Algorithms (Status, Priority, Date)',
      'Responsive Mobile UI & Touch Targets',
    ],
    overview:
      'A sleek productivity application that lets users organize daily work into priority categories (High, Medium, Low), mark tasks complete, filter by status, and track productivity completion rates.',
    problemStatement:
      'Staying organized requires a frictionless task board that loads instantaneously, works offline, and allows quick keyboard-based task entry.',
    coreFeatures: [
      'Create tasks with title, priority badge, due date, and tags',
      'Toggle task completion status with strike-through animations',
      'Filter tasks by All, Active, Completed, or Priority level',
      'Inline task title editing and deletion with undo toast',
      'LocalStorage persistence and task counter metrics',
    ],
    optionalFeatures: [
      'Due date countdown reminders (e.g. "Due in 2 hours")',
      'Drag and drop reordering of tasks',
      'Confetti animation on completing all daily tasks',
    ],
    sevenDayPlan: [
      {
        day: 1,
        title: 'Layout & Component Design',
        tasks: [
          'Structure HTML: task input header, filter tabs, task list container, stats bar',
          'Establish CSS theme with modern dark/light styling and status badges',
          'Create responsive layout for desktop and smartphone viewports',
        ],
      },
      {
        day: 2,
        title: 'Task Model & Creation Logic',
        tasks: [
          'Define task data object (id, title, priority, isCompleted, createdAt)',
          'Implement form submit listener with trim validation',
          'Render task cards into DOM with priority colored chips',
        ],
      },
      {
        day: 3,
        title: 'Completion & Deletion Actions',
        tasks: [
          'Use event delegation for checkbox toggles and delete buttons',
          'Add smooth CSS transition animations for completed tasks',
          'Implement delete task action with confirmation or undo prompt',
        ],
      },
      {
        day: 4,
        title: 'Filter & Search Engine',
        tasks: [
          'Implement filter buttons: All, Active, Completed, Priority',
          'Add live search input that filters tasks as you type',
          'Update task count statistics dynamically',
        ],
      },
      {
        day: 5,
        title: 'Inline Editing & LocalStorage',
        tasks: [
          'Add double-click or edit button for inline task title modification',
          'Save all changes automatically to LocalStorage',
          'Add "Clear Completed Tasks" bulk operation',
        ],
      },
      {
        day: 6,
        title: 'Polish & Accessibility',
        tasks: [
          'Add full keyboard navigation support (Enter to add, Esc to cancel edit)',
          'Test responsive touch target sizes on mobile screens',
          'Empty state graphics when no tasks match current filter',
        ],
      },
      {
        day: 7,
        title: 'Hosting & Portfolio Integration',
        tasks: [
          'Deploy application to Vercel / GitHub Pages',
          'Push clean codebase to GitHub with animated demo GIF in README',
          'Add repository and live demo URLs to your LevelUpDev Portfolio',
        ],
      },
    ],
    expectedResult:
      'A hosted task management web application with smooth state transitions, category filtering, search, and persistent local storage.',
    portfolioValue:
      'Demonstrates clean JavaScript event handling, UI state management, accessible form design, and frontend CRUD architecture.',
  },
  {
    projectId: 'weather-dashboard',
    title: 'Real-time Weather Dashboard',
    category: 'Web Development',
    difficulty: 'Intermediate',
    duration: '7 Days',
    icon: 'CloudRain',
    description: 'Create a weather dashboard using a public weather API featuring city search, current weather conditions, humidity, wind, and 5-day forecasts.',
    suggestedTech: ['HTML5', 'CSS3', 'JavaScript', 'OpenWeather / WeatherAPI', 'Async/Await'],
    learnSkills: [
      'REST API Integration with fetch()',
      'Async / Await & Promise Handling',
      'Parsing Complex JSON API Payloads',
      'Handling Loading & Network Error States',
      'Dynamic Weather Icon & Background Theming',
    ],
    overview:
      'A meteorological dashboard that connects to live weather APIs to provide current temperatures, atmospheric conditions, air quality indicators, and multi-day forecasts for any city worldwide.',
    problemStatement:
      'Developers must know how to communicate asynchronously with external cloud APIs, handle network latencies and rate limits, and present live JSON data cleanly to users.',
    coreFeatures: [
      'City search with autocomplete or instant submit',
      'Current weather metrics (Temperature, Feels Like, Humidity, Wind Speed, UV Index)',
      '5-Day forecast cards with high/low temperature ranges',
      'Dynamic weather condition icons (Sunny, Rainy, Snowy, Thunderstorm)',
      'Recent search history pills saved in LocalStorage for quick recall',
    ],
    optionalFeatures: [
      'Browser Geolocation API to detect user current location on load',
      'Celsius / Fahrenheit temperature unit toggle',
      'Dynamic animated background gradient changing with weather conditions',
    ],
    sevenDayPlan: [
      {
        day: 1,
        title: 'API Setup & Layout Scaffolding',
        tasks: [
          'Sign up for OpenWeatherMap / WeatherAPI free API key',
          'Test endpoints using Postman or browser fetch to inspect JSON responses',
          'Scaffold HTML layout: search bar, current weather hero card, forecast grid',
        ],
      },
      {
        day: 2,
        title: 'CSS Grid & Glassmorphism Styling',
        tasks: [
          'Style modern atmospheric weather dashboard with glassmorphism effects',
          'Design 5-day forecast card grid with responsive wrapping',
          'Create loading skeleton pulse animations',
        ],
      },
      {
        day: 3,
        title: 'Async Fetch & Data Binding',
        tasks: [
          'Write async function fetchWeatherData(city) using fetch() and async/await',
          'Parse JSON response and bind temperature, humidity, and wind into DOM',
          'Map weather condition codes to corresponding weather icons',
        ],
      },
      {
        day: 4,
        title: '5-Day Forecast & Geolocation',
        tasks: [
          'Fetch and render 5-day forecast timestamps and daily trends',
          'Integrate navigator.geolocation to load user local weather on initial visit',
          'Format dates and day names (Mon, Tue, Wed) cleanly',
        ],
      },
      {
        day: 5,
        title: 'Error Handling & Recent Searches',
        tasks: [
          'Handle 404 (City Not Found) and network offline errors with user alerts',
          'Save successfully searched cities in LocalStorage',
          'Render clickable recent search chips for instant reloading',
        ],
      },
      {
        day: 6,
        title: 'Unit Toggle & Performance Polish',
        tasks: [
          'Implement °C / °F toggle that recalculates displayed temperatures',
          'Debounce input searches and optimize asset requests',
          'Test mobile responsiveness on varying device widths',
        ],
      },
      {
        day: 7,
        title: 'Deployment & Portfolio Showcase',
        tasks: [
          'Deploy application to Vercel / Netlify with environment variables configured',
          'Push documented repository to GitHub with live URL and API setup guide',
          'Link GitHub repo and Live Demo to your LevelUpDev Portfolio',
        ],
      },
    ],
    expectedResult:
      'A hosted live weather application fetching real-time data from external APIs, displaying current metrics and 5-day forecasts with clean error handling.',
    portfolioValue:
      'Demonstrates mastery of asynchronous JavaScript, REST API integration, JSON processing, defensive error states, and responsive web design.',
  },

  // ==========================================
  // SQL / DATABASE
  // ==========================================
  {
    projectId: 'student-management-system',
    title: 'Student Management System',
    category: 'SQL / Database',
    difficulty: 'Beginner',
    duration: '7 Days',
    icon: 'Database',
    description: 'Create a full CRUD database application for managing student academic records, course enrollments, and department relationships.',
    suggestedTech: ['Python / Node.js', 'SQLite / PostgreSQL', 'SQL', 'CLI / Web UI'],
    learnSkills: [
      'Relational Database Schema Design (DDL)',
      'Primary Keys, Foreign Keys & Constraints',
      'SQL CRUD (INSERT, SELECT, UPDATE, DELETE)',
      'Parameterized Queries to Prevent SQL Injection',
      'Database Connection Lifecycle Management',
    ],
    overview:
      'A relational database application for educational institutes to manage student profiles, enrollments, course assignments, and generate academic reports using pure SQL.',
    problemStatement:
      'Organizations require structured relational schemas to prevent data duplication and maintain referential integrity across students, courses, and instructors.',
    coreFeatures: [
      'Create and manage student records (ID, name, email, department, enrollment year)',
      'Course catalog table with credits and instructor assignments',
      'Enrollment junction table managing student-course relationships',
      'SQL search and filtering by department and GPA threshold',
      'Parameterized query execution ensuring zero SQL injection vulnerability',
    ],
    optionalFeatures: [
      'Calculate student GPA dynamically using SQL Aggregate functions (AVG, SUM)',
      'Export student rosters to CSV or PDF transcripts',
      'Simple web UI or interactive terminal menu',
    ],
    sevenDayPlan: [
      {
        day: 1,
        title: 'Database Schema Design (ERD)',
        tasks: [
          'Design Entity-Relationship Diagram: Students, Courses, Enrollments',
          'Define primary keys, foreign keys, UNIQUE constraints, and data types',
          'Write schema.sql creation script with DROP TABLE and CREATE TABLE statements',
        ],
      },
      {
        day: 2,
        title: 'Database Initialization & Seeding',
        tasks: [
          'Connect to SQLite / PostgreSQL database programmatically',
          'Execute schema migration scripts on initialization',
          'Seed mock data for 20+ students and 5 courses to test queries',
        ],
      },
      {
        day: 3,
        title: 'CRUD Operations Implementation',
        tasks: [
          'Implement insert_student() with input sanitization and parameterized queries',
          'Implement get_all_students() and get_student_by_id()',
          'Implement update_student() and delete_student()',
        ],
      },
      {
        day: 4,
        title: 'Relational Queries & JOINs',
        tasks: [
          'Implement enroll_student_in_course(student_id, course_id)',
          'Write INNER JOIN query to list all courses taken by a specific student',
          'Write aggregation queries (e.g. count of students per department)',
        ],
      },
      {
        day: 5,
        title: 'User Interface / CLI Menu',
        tasks: [
          'Build an interactive menu allowing users to perform all database operations',
          'Format query results into clean tabular views',
          'Handle foreign key violation and duplicate email errors gracefully',
        ],
      },
      {
        day: 6,
        title: 'Testing & Transaction Safety',
        tasks: [
          'Test rollback scenarios when an enrollment query fails',
          'Verify parameterized queries protect against SQL injection inputs',
          'Write automated tests for database helper functions',
        ],
      },
      {
        day: 7,
        title: 'Documentation & Portfolio Showcase',
        tasks: [
          'Push repository to GitHub with schema diagrams and SQL queries in README',
          'Add setup guide and sample execution screenshots',
          'Link GitHub repository to your LevelUpDev Portfolio',
        ],
      },
    ],
    expectedResult:
      'A structured relational database project with complete schema definitions, parameterized CRUD operations, and multi-table relational JOIN queries.',
    portfolioValue:
      'Proves essential database competence: relational modeling, SQL proficiency, data normalization, and safe query execution.',
  },
  {
    projectId: 'library-management-system',
    title: 'Library Management System',
    category: 'SQL / Database',
    difficulty: 'Intermediate',
    duration: '7 Days',
    icon: 'Book',
    description: 'Create a library database application to catalog books, manage member accounts, and track borrowing transactions with overdue fee calculations.',
    suggestedTech: ['Python / TypeScript', 'SQLite / PostgreSQL', 'SQL', 'CLI / Express'],
    learnSkills: [
      'Multi-Table Relational Schema Architecture',
      'SQL Transactions (BEGIN, COMMIT, ROLLBACK)',
      'Complex SQL JOINs & Subqueries',
      'Date Arithmetic & Overdue Fine Calculations',
      'Database Indexing for High-Speed Lookups',
    ],
    overview:
      'A full-featured library management system that tracks book inventory, member borrowing limits, return deadlines, and calculates overdue penalties with transactional consistency.',
    problemStatement:
      'Library inventory systems must guarantee that a book cannot be issued to two members simultaneously, requiring strict ACID transaction locks and relational constraints.',
    coreFeatures: [
      'Books table tracking ISBN, title, author, genre, total copies, and available copies',
      'Members table tracking membership status, active loans, and contact info',
      'Borrow transaction workflow: verify availability, decrement stock, record issue date',
      'Return book workflow: increment stock, calculate overdue days and penalty fees',
      'Advanced SQL queries for most borrowed books and active overdue loans',
    ],
    optionalFeatures: [
      'Database triggers to automatically update book availability count',
      'Search books by partial title or author matching (SQL LIKE / ILIKE)',
      'Export monthly circulation statistics to CSV',
    ],
    sevenDayPlan: [
      {
        day: 1,
        title: 'Schema & Architecture Design',
        tasks: [
          'Design ER diagram: Books, Members, Loans, Fines',
          'Write DDL SQL script defining tables, foreign keys, and indexes',
          'Set up project repository and database connection pool',
        ],
      },
      {
        day: 2,
        title: 'Inventory & Member CRUD',
        tasks: [
          'Implement add_book(), update_book_copies(), and search_books()',
          'Implement register_member() and get_member_loan_history()',
          'Add unique constraints on ISBN and Member email',
        ],
      },
      {
        day: 3,
        title: 'Transaction-Safe Borrow Workflow',
        tasks: [
          'Implement issue_book() inside an ACID SQL transaction',
          'Verify available_copies > 0 before proceeding; rollback if unavailable',
          'Create Loan record with due_date (e.g. issue_date + 14 days)',
        ],
      },
      {
        day: 4,
        title: 'Return & Overdue Penalty Engine',
        tasks: [
          'Implement return_book() to mark loan completed and increment inventory',
          'Calculate days overdue using SQL date difference functions',
          'Calculate and record fine amount ($0.50 per overdue day)',
        ],
      },
      {
        day: 5,
        title: 'Reporting Queries & Analytics',
        tasks: [
          'Write SQL query to find top 5 most borrowed books using GROUP BY & COUNT',
          'Write query to list all members with active overdue loans',
          'Create database view for quick library metrics overview',
        ],
      },
      {
        day: 6,
        title: 'Edge Case Testing & Security',
        tasks: [
          'Test concurrent borrow attempts when only 1 copy remains',
          'Ensure all queries use parameterized statements against SQL injection',
          'Refactor codebase with clean error handling and logging',
        ],
      },
      {
        day: 7,
        title: 'Publish & Portfolio Link',
        tasks: [
          'Push repository to GitHub with schema diagrams and SQL query walk-throughs',
          'Link GitHub repository to your LevelUpDev Portfolio',
        ],
      },
    ],
    expectedResult:
      'A complete database management system with ACID transaction handling for book lending, relational query aggregation, and fine calculations.',
    portfolioValue:
      'Demonstrates advanced SQL expertise, transaction management, multi-table relationships, and business logic implementation.',
  },

  // ==========================================
  // DATA STRUCTURES & ALGORITHMS
  // ==========================================
  {
    projectId: 'algorithm-visualizer',
    title: 'Algorithm Visualizer',
    category: 'DSA',
    difficulty: 'Intermediate',
    duration: '7 Days',
    icon: 'Layers',
    description: 'Create an interactive web visualization tool for sorting and searching algorithms with step-by-step playback controls.',
    suggestedTech: ['HTML5', 'CSS3', 'JavaScript', 'Async/Await / Timers'],
    learnSkills: [
      'Algorithm Implementation (Bubble, Selection, Insertion, Binary Search)',
      'Visual State Mapping (Active comparisons, Swaps, Sorted elements)',
      'Async Animation Timing using Promises & setTimeout',
      'Interactive User Controls (Play, Pause, Step, Speed slider)',
      'DOM Element Transitions & Audio/Visual Feedback',
    ],
    overview:
      'An interactive educational web application that renders algorithmic processes visually in real-time, allowing users to watch how array elements are compared, swapped, and partitioned step-by-step.',
    problemStatement:
      'Understanding sorting and searching algorithms from static text is difficult. Visual animations help students intuitively grasp time complexity and pointer mechanics.',
    coreFeatures: [
      'Visual sorting algorithms: Bubble Sort, Selection Sort, Insertion Sort',
      'Visual searching algorithms: Linear Search, Binary Search',
      'Generate randomized or customized array bars',
      'Playback controls: Play, Pause, Step Forward, Reset, and Speed Slider',
      'Color-coded comparison, swap, and finalized states',
    ],
    optionalFeatures: [
      'Merge Sort and Quick Sort recursion tree visualization',
      'Sound frequency synthesizer matching bar heights on comparison',
      'Live operation comparison counter and time complexity display',
    ],
    sevenDayPlan: [
      {
        day: 1,
        title: 'UI Architecture & Canvas/Bar Layout',
        tasks: [
          'Design visual dashboard: algorithm selector, speed slider, control buttons, canvas',
          'Implement array generator that renders vertical colored bars proportional to values',
          'Setup CSS variables for active, comparing, swapping, and sorted states',
        ],
      },
      {
        day: 2,
        title: 'Async Sleep & State Architecture',
        tasks: [
          'Create async sleep(ms) helper utility to control animation delays',
          'Implement state controller managing isPlaying, isPaused, and currentStep flags',
          'Implement array reset and random generation functions',
        ],
      },
      {
        day: 3,
        title: 'Bubble Sort & Selection Sort Visualizer',
        tasks: [
          'Implement Bubble Sort with visual bar highlights during adjacent comparisons',
          'Animate bar height swaps when elements are out of order',
          'Implement Selection Sort highlighting the minimum element in each pass',
        ],
      },
      {
        day: 4,
        title: 'Insertion Sort & Linear Search',
        tasks: [
          'Implement Insertion Sort animating shifted elements into correct position',
          'Implement Linear Search highlighting each bar until target is found or missed',
          'Mark final elements with green "sorted" color transitions',
        ],
      },
      {
        day: 5,
        title: 'Binary Search Visualizer',
        tasks: [
          'Sort array automatically before running Binary Search',
          'Visually mark Left, Right, and Mid pointers with distinct colors',
          'Dim out discarded halves of the array on each step',
        ],
      },
      {
        day: 6,
        title: 'Speed Controls, Counters & Polish',
        tasks: [
          'Connect speed slider dynamically to animation delay time',
          'Display live comparison count and array access metrics',
          'Ensure responsive layout scales appropriately on mobile devices',
        ],
      },
      {
        day: 7,
        title: 'Deployment & Portfolio Showcase',
        tasks: [
          'Deploy application live to GitHub Pages / Vercel',
          'Push repository to GitHub with animated demo GIF in README',
          'Link GitHub repo and Live Demo to your LevelUpDev Portfolio',
        ],
      },
    ],
    expectedResult:
      'A hosted interactive algorithm visualizer enabling learners to adjust speed, generate arrays, and observe sorting and searching algorithms in action.',
    portfolioValue:
      'Showcases deep algorithmic understanding, asynchronous JavaScript programming, dynamic DOM rendering, and visual instructional design.',
  },
  {
    projectId: 'dsa-problem-tracker',
    title: 'DSA Problem Tracker',
    category: 'DSA',
    difficulty: 'Beginner',
    duration: '7 Days',
    icon: 'Target',
    description: 'Create an application where students can log coding problems they have solved with difficulty, topic, platform, notes, and revision reminders.',
    suggestedTech: ['React / JavaScript', 'CSS3 / TailwindCSS', 'LocalStorage'],
    learnSkills: [
      'State Management & Data Filtering',
      'CRUD Operations on Structured Objects',
      'Dynamic Search & Multi-Criteria Filtering',
      'Statistics Aggregation (Easy/Medium/Hard breakdown)',
      'Client-Side Persistence & JSON Export',
    ],
    overview:
      'A dedicated productivity tracker for coding interview preparation that helps students track solved LeetCode/CodeChef problems, store approach notes, and flag questions for spaced repetition.',
    problemStatement:
      'Students solve hundreds of DSA problems but forget the core patterns when interviews arrive. This tracker organizes problems by topic and tracks revision readiness.',
    coreFeatures: [
      'Log problems with title, URL, platform (LeetCode/HackerRank), difficulty, and topic (Arrays, DP, Graphs)',
      'Store key approach notes and time/space complexity',
      'Flag problems for "Needs Revision" with revision date tracking',
      'Filter and search by topic, difficulty, or platform',
      'Visual progress breakdown bar showing Easy, Medium, and Hard counts',
    ],
    optionalFeatures: [
      'Export problem list to CSV or JSON backup',
      'Streak tracker for daily problem solving consistency',
      'One-click "Random Problem from Revision List" generator',
    ],
    sevenDayPlan: [
      {
        day: 1,
        title: 'UI Design & Form Structure',
        tasks: [
          'Design dashboard layout: summary stats header, add problem modal, filter bar, table',
          'Create data model: id, title, url, platform, difficulty, topic, notes, needsRevision',
          'Set up styling tokens and responsive container grids',
        ],
      },
      {
        day: 2,
        title: 'Add & Render Problem Cards',
        tasks: [
          'Build "Add Problem" form with validation for URL and required fields',
          'Render problem table with difficulty badges (Easy: green, Medium: amber, Hard: red)',
          'Store and retrieve items from LocalStorage',
        ],
      },
      {
        day: 3,
        title: 'Filtering & Search Engine',
        tasks: [
          'Implement multi-criteria filtering: by Topic (Arrays, Trees, etc.) and Difficulty',
          'Add instant keyword search matching problem title and notes',
          'Add "Needs Revision" toggle filter',
        ],
      },
      {
        day: 4,
        title: 'Edit, Delete & Detailed Notes Modal',
        tasks: [
          'Implement modal to view/edit approach notes and time complexity',
          'Implement delete action with confirmation prompt',
          'Allow toggling revision status directly from the list',
        ],
      },
      {
        day: 5,
        title: 'Progress Statistics & Charts',
        tasks: [
          'Compute live counts for total solved, Easy, Medium, and Hard problems',
          'Render visual distribution progress bar',
          'Calculate top practiced topics',
        ],
      },
      {
        day: 6,
        title: 'Import/Export & Polish',
        tasks: [
          'Implement JSON export and import for seamless data backups',
          'Improve mobile responsive card view for smaller screens',
          'Add sample initial dataset for first-time visitors',
        ],
      },
      {
        day: 7,
        title: 'Hosting & Portfolio Integration',
        tasks: [
          'Deploy application live to Vercel / GitHub Pages',
          'Push repository to GitHub with documentation and screenshots',
          'Link GitHub repo and Live Demo in your LevelUpDev Portfolio',
        ],
      },
    ],
    expectedResult:
      'A hosted developer tool for tracking coding interview progress, categorizing DSA patterns, and maintaining spaced repetition notes.',
    portfolioValue:
      'Demonstrates clean frontend architecture, user-centric tooling, state filtering algorithms, and local data persistence.',
  },

  // ==========================================
  // AI / ML
  // ==========================================
  {
    projectId: 'student-score-predictor',
    title: 'Student Score Predictor',
    category: 'AI / ML',
    difficulty: 'Beginner',
    duration: '7 Days',
    icon: 'Cpu',
    description: 'Build a machine learning application that predicts student exam scores based on study hours, attendance, and past performance with a Streamlit interface.',
    suggestedTech: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit', 'Joblib'],
    learnSkills: [
      'Data Preprocessing & Feature Engineering',
      'Train/Test Dataset Splitting',
      'Linear Regression & Random Forest Regressor',
      'Model Evaluation (MSE, RMSE, R² Score)',
      'Model Serialization with Joblib & Streamlit Deployment',
    ],
    overview:
      'An end-to-end Machine Learning web application where users input study hours, sleep duration, attendance percentage, and prior exam scores to receive an instant predicted final score with feature importance insights.',
    problemStatement:
      'Understanding how different academic and lifestyle habits impact final exam scores helps students allocate study time effectively using predictive modeling.',
    coreFeatures: [
      'Exploratory Data Analysis (EDA) on student performance datasets',
      'Data normalization, missing value handling, and feature selection',
      'Trained Scikit-learn Linear Regression / Random Forest model',
      'Interactive Streamlit UI with input sliders for study hours, attendance, etc.',
      'Instant prediction output with model confidence metrics ($R^2$ score)',
    ],
    optionalFeatures: [
      'Interactive feature correlation heatmap displayed in Streamlit',
      'Provide personalized study recommendations based on predicted score',
      'Compare multiple regression models (Ridge, Lasso, Random Forest)',
    ],
    sevenDayPlan: [
      {
        day: 1,
        title: 'Dataset Acquisition & EDA',
        tasks: [
          'Obtain student performance dataset (e.g. Kaggle Student Performance Dataset)',
          'Perform Exploratory Data Analysis (EDA) using Pandas and Seaborn in Jupyter Notebook',
          'Analyze correlations between study hours, attendance, and final marks',
        ],
      },
      {
        day: 2,
        title: 'Data Preprocessing & Feature Engineering',
        tasks: [
          'Handle missing values and encode categorical variables',
          'Split dataset into features (X) and target (y)',
          'Perform train_test_split (80% training, 20% testing)',
        ],
      },
      {
        day: 3,
        title: 'Model Training & Evaluation',
        tasks: [
          'Train LinearRegression and RandomForestRegressor models',
          'Evaluate models using Mean Squared Error (MSE) and R² Score',
          'Select the best performing model and tune hyperparameters',
        ],
      },
      {
        day: 4,
        title: 'Model Serialization & Pipeline',
        tasks: [
          'Serialize trained model and feature scalers to model.joblib',
          'Write a clean inference function predict_score(input_data)',
          'Verify standalone prediction accuracy on test samples',
        ],
      },
      {
        day: 5,
        title: 'Streamlit Web UI Development',
        tasks: [
          'Build Streamlit app (app.py) with sidebar sliders for study hours, sleep, and attendance',
          'Connect user inputs to predict_score() function',
          'Display predicted grade with visual progress meters and color-coded feedback',
        ],
      },
      {
        day: 6,
        title: 'Visualizations & Code Refactoring',
        tasks: [
          'Embed interactive feature importance bar chart in the Streamlit app',
          'Add friendly explanatory text for non-technical users',
          'Organize project into clean modular structure (data/, models/, app.py)',
        ],
      },
      {
        day: 7,
        title: 'Cloud Deployment & Portfolio Showcase',
        tasks: [
          'Deploy application live on Streamlit Cloud (share.streamlit.io) or HuggingFace Spaces',
          'Push repository to GitHub with complete model metrics in README',
          'Link GitHub repo and Live Streamlit Demo to your LevelUpDev Portfolio',
        ],
      },
    ],
    expectedResult:
      'A live hosted Streamlit machine learning application that takes student lifestyle inputs and outputs instant, data-backed exam score predictions.',
    portfolioValue:
      'Demonstrates end-to-end ML engineering: EDA, feature engineering, regression modeling, metrics evaluation, model serialization, and cloud deployment.',
  },
  {
    projectId: 'spam-message-detector',
    title: 'Spam Message Detector',
    category: 'AI / ML',
    difficulty: 'Intermediate',
    duration: '7 Days',
    icon: 'ShieldCheck',
    description: 'Create a Natural Language Processing (NLP) machine learning application that classifies messages as spam or ham using TF-IDF and Naive Bayes.',
    suggestedTech: ['Python', 'Scikit-learn', 'NLTK / RegEx', 'Streamlit', 'Joblib'],
    learnSkills: [
      'NLP Text Preprocessing (Tokenization, Stopwords, Stemming)',
      'TF-IDF Vectorization & Bag-of-Words',
      'Multinomial Naive Bayes & Logistic Regression Classification',
      'Classification Metrics (Precision, Recall, F1-Score, Confusion Matrix)',
      'Building Interactive ML Inference Web Apps',
    ],
    overview:
      'An NLP classification application that scans incoming text messages or emails, extracts semantic word features, and predicts whether the message is legitimate (Ham) or Spam/Phishing with probability scores.',
    problemStatement:
      'Spam messages waste time and pose cybersecurity risks. Building text classifiers demonstrates how machine learning parses unstructured human language into mathematical vectors.',
    coreFeatures: [
      'Text cleaning pipeline: lowercase, remove punctuation/stopwords, apply stemming',
      'TF-IDF Vectorizer converting text tokens to numerical feature matrices',
      'Trained Multinomial Naive Bayes classification model (98%+ accuracy)',
      'Interactive Streamlit UI allowing users to paste any message for instant analysis',
      'Displays classification verdict (Spam vs Ham) and prediction confidence percentage',
    ],
    optionalFeatures: [
      'Highlight spam trigger keywords (e.g. "free", "win", "urgent", "cash") in text',
      'Confusion matrix visualization and ROC-AUC curve display',
      'REST API endpoint using FastAPI for programmatic message screening',
    ],
    sevenDayPlan: [
      {
        day: 1,
        title: 'Dataset Ingestion & Text Exploration',
        tasks: [
          'Load SMS Spam Collection dataset (5,500+ labeled messages)',
          'Analyze class balance (Spam vs Ham ratio)',
          'Identify most common words in spam vs legitimate messages',
        ],
      },
      {
        day: 2,
        title: 'NLP Preprocessing Pipeline',
        tasks: [
          'Implement clean_text() function: remove URLs, numbers, special characters',
          'Tokenize words, remove English stopwords, and apply PorterStemmer',
          'Create transformed cleaned_text column in DataFrame',
        ],
      },
      {
        day: 3,
        title: 'Feature Extraction & Vectorization',
        tasks: [
          'Initialize TfidfVectorizer(max_features=3000)',
          'Fit vectorizer on training text and transform into sparse matrix',
          'Split into 80/20 train/test sets with stratification',
        ],
      },
      {
        day: 4,
        title: 'Model Training & Evaluation',
        tasks: [
          'Train MultinomialNB and LogisticRegression models',
          'Evaluate Accuracy, Precision, Recall, and F1-Score (prioritize high Precision to avoid false alarms)',
          'Generate and visualize confusion matrix',
        ],
      },
      {
        day: 5,
        title: 'Pipeline Export & Verification',
        tasks: [
          'Save trained vectorizer.joblib and model.joblib',
          'Write a standalone predict_spam(message) function that executes the full pipeline',
          'Test with tricky edge cases (short messages, URLs, numbers)',
        ],
      },
      {
        day: 6,
        title: 'Streamlit Interface Development',
        tasks: [
          'Build Streamlit app with large text area and sample spam/ham prefill buttons',
          'Display animated banner (🚨 SPAM DETECTED vs ✅ LEGITIMATE MESSAGE)',
          'Show confidence probability meter and highlighted trigger words',
        ],
      },
      {
        day: 7,
        title: 'Deployment & Portfolio Integration',
        tasks: [
          'Deploy application to Streamlit Community Cloud / HuggingFace Spaces',
          'Push repository to GitHub with model metrics and demo screenshots in README',
          'Link GitHub repo and Live Streamlit Demo to your LevelUpDev Portfolio',
        ],
      },
    ],
    expectedResult:
      'A deployed Natural Language Processing web application that classifies user-submitted messages as spam or ham with high precision and probability metrics.',
    portfolioValue:
      'Demonstrates real-world NLP capabilities: text preprocessing, TF-IDF vectorization, probabilistic classification, metric evaluation, and cloud deployment.',
  },
];

// Helper Functions
export function getAllMiniProjects(): MiniProject[] {
  return MINI_PROJECTS_LIST;
}

export function getMiniProjectById(id: string): MiniProject | null {
  return MINI_PROJECTS_LIST.find((p) => p.projectId.toLowerCase() === id.toLowerCase()) || null;
}

export function getMiniProjectsByCategory(category: string): MiniProject[] {
  if (!category || category === 'All') return MINI_PROJECTS_LIST;
  return MINI_PROJECTS_LIST.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}
