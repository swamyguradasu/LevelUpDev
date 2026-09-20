export interface CapstoneProjectOption {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
  recommendedTech: string[];
  suggestedArchitecture: string;
}

export interface CapstoneStage {
  stageNumber: number;
  title: string;
  description: string;
  deliverables: string[];
  tips: string;
}

export interface RubricCriterion {
  id: string;
  title: string;
  weight: number; // percentage (sum = 100)
  description: string;
  criteriaLevels: {
    level: 'Excellent (100%)' | 'Proficient (80%)' | 'Needs Improvement (50%)' | 'Incomplete (0%)';
    details: string;
  }[];
}

export interface VerificationChecklistItem {
  id: string;
  category: 'Structure' | 'Code Quality' | 'Database/API' | 'Testing' | 'Documentation';
  text: string;
  hint: string;
}

export const CAPSTONE_PROJECT_OPTIONS: CapstoneProjectOption[] = [
  {
    id: 'expense-tracker',
    title: 'Personal Finance & Expense Tracker',
    category: 'Finance & Data Persistence',
    tagline: 'A robust CLI and SQLite-backed expense tracking and budget analytics engine.',
    description: 'Build a full-featured CLI and analytical expense tracker. Users can record income and expenses with categories, set monthly budget thresholds, query spending summaries with SQL aggregations, generate automated visual ASCII/markdown reports, and export/import transactions via CSV and JSON.',
    keyFeatures: [
      'SQLite database with relational schema for Users, Categories, and Transactions',
      'Transaction CRUD operations with date filtering and regex validation',
      'Budget alerts and category-wise spending threshold monitoring',
      'Data export/import via CSV and JSON with error handling',
      'Custom decorators for execution logging and timing',
      'Comprehensive Pytest suite covering calculations and edge cases'
    ],
    recommendedTech: ['Python 3.10+', 'SQLite3', 're (Regex)', 'pytest', 'tabulate/rich'],
    suggestedArchitecture: 'Layered architecture: CLI Layer (argparse/rich) -> Service Layer (ExpenseService, ReportService) -> Data Access Layer (DatabaseManager, SQLite repository).'
  },
  {
    id: 'student-management',
    title: 'Student Academic Management System',
    category: 'Academic & Admin Systems',
    tagline: 'Enterprise-grade OOP student record, grading, and GPA calculation system.',
    description: 'A comprehensive academic record management system implementing deep OOP principles (Inheritance, Polymorphism, Encapsulation), SQLite persistence, CSV grade reports, and GPA computation algorithms with audit logging.',
    keyFeatures: [
      'OOP hierarchy: Person -> Student, Instructor, Administrator',
      'Course enrollment, credit hours tracking, and prerequisite enforcement',
      'Automated weighted GPA calculation with letter grade conversions',
      'Database persistence with foreign key constraints and transactional integrity',
      'Custom context manager for database connection pooling and transactions',
      'Detailed unit test coverage of grading logic and course capacity validation'
    ],
    recommendedTech: ['Python 3.10+', 'SQLite3', 'unittest / pytest', 'dataclasses'],
    suggestedArchitecture: 'Domain-Driven Design: Models (Student, Course, Grade) -> Repositories (StudentRepository, CourseRepository) -> Controller/Services -> Interactive CLI.'
  },
  {
    id: 'task-manager',
    title: 'Productivity & Task Management CLI',
    category: 'Productivity & Automation',
    tagline: 'High-performance task priority engine with due dates, tags, and automated backups.',
    description: 'A powerful CLI task manager supporting priority queues, recursion-based subtask trees, regex-based natural search, reminders, and automated JSON/SQLite synchronization.',
    keyFeatures: [
      'Hierarchical task trees with recursive subtask completion calculation',
      'Due date tracking with priority sorting algorithms',
      'Regex-driven full-text search across titles, descriptions, and tags',
      'Configurable user settings managed via JSON virtual environment configuration',
      'Timing and debug decorators measuring search and query performance',
      'Full test suite with mock data and fixtures'
    ],
    recommendedTech: ['Python 3.10+', 'SQLite3', 're', 'pytest', 'argparse'],
    suggestedArchitecture: 'Modular MVC: TaskModel & SubtaskTree -> TaskService -> CommandController -> StorageEngine (JSON/SQLite).'
  },
  {
    id: 'inventory-system',
    title: 'Warehouse & Inventory Management System',
    category: 'Logistics & Supply Chain',
    tagline: 'Real-time stock tracking, low-inventory alerts, and supplier management.',
    description: 'A complete inventory logistics solution with SKU generation, threshold alarms, supplier directory, purchase order simulation, and CSV audit reports.',
    keyFeatures: [
      'Stock tracking with atomic transactions preventing negative stock levels',
      'Automated SKU code validation using regex pattern matching',
      'Supplier entity mapping with contact details and supplier pricing history',
      'Database indexes for fast SKU lookups and category queries',
      'Context manager handling file locks and transactional database writes',
      'Pytest test suite verifying concurrent updates and stock replenishment logic'
    ],
    recommendedTech: ['Python 3.10+', 'SQLite3', 'dataclasses', 'pytest'],
    suggestedArchitecture: 'Service-Oriented CLI: InventoryManager -> DatabaseGateway -> AnalyticsEngine -> PresentationCLI.'
  },
  {
    id: 'api-cli-app',
    title: 'API-Powered Weather & Market Intelligence CLI',
    category: 'APIs & Web Integration',
    tagline: 'Real-time REST API aggregator combining live weather, currency, and news metrics.',
    description: 'A multi-service API client CLI that fetches live data from public REST APIs (e.g. Open-Meteo, Open Exchange Rates, or GitHub API), caches responses locally in SQLite, handles rate limits with retries, and formats rich output.',
    keyFeatures: [
      'HTTP requests with error handling for status codes (404, 429, 500) and timeouts',
      'Local SQLite caching layer with TTL expiration logic to minimize API calls',
      'Decorator for exponential backoff and retry on transient network failures',
      'Regex extraction of structured tokens and hashtags from API responses',
      'Virtual environment setup with requirements.txt and structured logging',
      'Mocked API unit tests using unittest.mock / pytest-mock'
    ],
    recommendedTech: ['Python 3.10+', 'requests / urllib.request', 'sqlite3', 'pytest', 'unittest.mock'],
    suggestedArchitecture: 'API Client Architecture: ApiConnector -> CacheManager -> TransformerEngine -> RichConsoleFormatter.'
  }
];

export const CAPSTONE_STAGES: CapstoneStage[] = [
  {
    stageNumber: 1,
    title: 'Project Selection & Problem Definition',
    description: 'Select one of the 5 capstone project options or define your custom project scope. Clearly outline user stories and core requirements.',
    deliverables: ['Selected project option', '1-page requirements specification document (or README.md draft)'],
    tips: 'Pick a project aligned with your career goals (e.g., API CLI for backend engineering, Expense Tracker for data & finance).'
  },
  {
    stageNumber: 2,
    title: 'System Architecture & Data Modeling',
    description: 'Design the class hierarchy (OOP) or entity relational diagram (ERD) for your SQLite database tables.',
    deliverables: ['Database schema diagram or SQL CREATE TABLE statements', 'UML class structure or module layout diagram'],
    tips: 'Define primary keys, foreign keys, and indexes early. Plan how models will interact.'
  },
  {
    stageNumber: 3,
    title: 'Environment Setup & Project Structure',
    description: 'Initialize a clean project repository with a Python virtual environment (.venv), .gitignore, requirements.txt, and standard src/ layout.',
    deliverables: ['Standard directory structure (src/, tests/, data/, docs/)', 'requirements.txt and .gitignore configured'],
    tips: 'Keep sensitive data like API keys in .env and never commit them to git.'
  },
  {
    stageNumber: 4,
    title: 'Core Data Models & OOP Classes',
    description: 'Implement domain models using Python classes, dataclasses, properties, and encapsulation.',
    deliverables: ['Python model classes with typed attributes', '__repr__, __str__, and custom equality or comparison dunder methods'],
    tips: 'Leverage dataclasses or standard classes with proper validation in @property setters.'
  },
  {
    stageNumber: 5,
    title: 'Database Persistence Layer',
    description: 'Build the SQLite database manager with table initialization, parameterized queries, and transactional safeguards.',
    deliverables: ['Database helper module with connect(), execute(), and fetch() helpers', 'Custom context manager for auto-commit/rollback'],
    tips: 'Always use parameterized queries (? placeholders) to completely prevent SQL injection.'
  },
  {
    stageNumber: 6,
    title: 'Business Logic & Services',
    description: 'Implement core algorithms (GPA calculation, budget aggregation, search algorithms, API caching).',
    deliverables: ['Service classes containing pure business logic separated from UI', 'Helper functions with *args, **kwargs, or lambda utilities'],
    tips: 'Keep business logic decoupled from CLI prints so it can be tested independently.'
  },
  {
    stageNumber: 7,
    title: 'Decorators & Utility Tooling',
    description: 'Incorporate custom decorators for timing, logging, validation, or retry logic across critical operations.',
    deliverables: ['At least 1 custom decorator (e.g. @timing_decorator, @log_execution, @retry)', 'Utility modules for string manipulation or regex parsing'],
    tips: 'Use functools.wraps inside your custom decorator to preserve function metadata.'
  },
  {
    stageNumber: 8,
    title: 'Regex & Data Validation',
    description: 'Add strict regex validation for email addresses, dates (YYYY-MM-DD), SKUs, currencies, or user inputs.',
    deliverables: ['Regex validation helpers using re.match / re.search / re.sub', 'Descriptive error messages on invalid input formats'],
    tips: 'Compile regex patterns with re.compile() if they are reused frequently for better performance.'
  },
  {
    stageNumber: 9,
    title: 'Interactive CLI / User Interface',
    description: 'Build a user-friendly CLI with menus, command arguments, tabular displays, and colored feedback.',
    deliverables: ['Main loop with menu options or argparse/click CLI commands', 'Clean formatted output with error recovery'],
    tips: 'Catch KeyboardInterrupt and ValueError gracefully so the application never crashes unexpectedly.'
  },
  {
    stageNumber: 10,
    title: 'Unit Testing & Test Suite',
    description: 'Write comprehensive automated tests with pytest or unittest covering models, database operations, and edge cases.',
    deliverables: ['tests/ folder with at least 8-10 meaningful unit test cases', 'Mocking for API calls or database fixtures using pytest fixtures'],
    tips: 'Aim for at least 80% coverage on core business logic functions.'
  },
  {
    stageNumber: 11,
    title: 'Documentation, README & Code Polish',
    description: 'Write professional project documentation including setup instructions, architectural overview, and usage examples.',
    deliverables: ['Comprehensive README.md with setup guide, screenshots/demo ASCII, and CLI commands', 'Clean PEP 8 compliant code with docstrings'],
    tips: 'A stellar README makes your project instantly attractive to recruiters and hiring managers.'
  },
  {
    stageNumber: 12,
    title: 'Final Verification & Capstone Submission',
    description: 'Execute the full verification checklist, run the entire test suite, push to GitHub, and submit your capstone repository for certification.',
    deliverables: ['Public GitHub repository link', 'Working code verification with all tests passing', 'Completed capstone submission form'],
    tips: 'Double check that your repo includes a clean requirements.txt and instructions for running tests.'
  }
];

export const CAPSTONE_RUBRIC: RubricCriterion[] = [
  {
    id: 'architecture-oop',
    title: 'Object-Oriented Design & Architecture',
    weight: 25,
    description: 'Effective use of classes, encapsulation, inheritance, modular separation of concerns, and clean project structure.',
    criteriaLevels: [
      {
        level: 'Excellent (100%)',
        details: 'Flawless separation of UI, business logic, and database layer. Clean OOP principles with dataclasses or robust class hierarchies.'
      },
      {
        level: 'Proficient (80%)',
        details: 'Good modular design with separated files. Classes are used effectively with minor mixing of concerns.'
      },
      {
        level: 'Needs Improvement (50%)',
        details: 'Monolithic files or basic procedural code wrapped inside unstructured classes.'
      },
      {
        level: 'Incomplete (0%)',
        details: 'No OOP structure or chaotic organization.'
      }
    ]
  },
  {
    id: 'data-persistence',
    title: 'Data Persistence & Advanced Python Features',
    weight: 25,
    description: 'Proper SQLite integration with parameterized queries, context managers, custom decorators, and regex validation.',
    criteriaLevels: [
      {
        level: 'Excellent (100%)',
        details: 'SQL injection-proof parameterized queries, custom context manager for DB connections, custom decorators, and regex input validation.'
      },
      {
        level: 'Proficient (80%)',
        details: 'Working SQLite database and regex validation. Decorators or context managers used with minor rough edges.'
      },
      {
        level: 'Needs Improvement (50%)',
        details: 'Insecure SQL queries or missing key advanced features (no decorators or context managers).'
      },
      {
        level: 'Incomplete (0%)',
        details: 'No persistence or completely non-functional database layer.'
      }
    ]
  },
  {
    id: 'testing-reliability',
    title: 'Automated Testing & Reliability',
    weight: 25,
    description: 'Pytest/unittest test suite covering critical paths, edge cases, and graceful exception handling across all inputs.',
    criteriaLevels: [
      {
        level: 'Excellent (100%)',
        details: '8+ automated unit tests passing reliably. Thorough error handling for user inputs, files, and database operations.'
      },
      {
        level: 'Proficient (80%)',
        details: '4-7 automated tests passing. Basic exception handling in place.'
      },
      {
        level: 'Needs Improvement (50%)',
        details: '1-3 trivial tests or code crashes on common invalid inputs.'
      },
      {
        level: 'Incomplete (0%)',
        details: 'Zero unit tests written.'
      }
    ]
  },
  {
    id: 'documentation-code-quality',
    title: 'Documentation, Code Quality & Polish',
    weight: 25,
    description: 'Professional README with setup instructions, PEP 8 compliance, clean docstrings, and virtual environment configs.',
    criteriaLevels: [
      {
        level: 'Excellent (100%)',
        details: 'Outstanding README.md with installation steps, CLI examples, architecture overview, clean PEP 8 code, and requirements.txt.'
      },
      {
        level: 'Proficient (80%)',
        details: 'Solid README.md with clear run instructions and good code formatting.'
      },
      {
        level: 'Needs Improvement (50%)',
        details: 'Minimal or unclear README. Inconsistent code formatting and missing requirements.txt.'
      },
      {
        level: 'Incomplete (0%)',
        details: 'No documentation provided.'
      }
    ]
  }
];

export const CAPSTONE_CHECKLIST: VerificationChecklistItem[] = [
  {
    id: 'chk-1',
    category: 'Structure',
    text: 'Project organized into a clean folder layout (src/, tests/, docs/)',
    hint: 'Ensure main entry point, modules, and tests are in separate directories.'
  },
  {
    id: 'chk-2',
    category: 'Structure',
    text: 'Virtual environment (.venv) and requirements.txt / pyproject.toml configured',
    hint: 'Generate dependencies using pip freeze > requirements.txt.'
  },
  {
    id: 'chk-3',
    category: 'Code Quality',
    text: 'Classes and OOP principles implemented (encapsulation, properties, dunder methods)',
    hint: 'Use @property getters/setters or __repr__ and __str__ where appropriate.'
  },
  {
    id: 'chk-4',
    category: 'Code Quality',
    text: 'At least 1 custom decorator implemented and applied in the codebase',
    hint: 'E.g., @timing_decorator measuring execution time or @log_call.'
  },
  {
    id: 'chk-5',
    category: 'Database/API',
    text: 'SQLite database with parameterized queries preventing SQL injection',
    hint: 'Use cursor.execute("SELECT ... WHERE id = ?", (id,)) syntax.'
  },
  {
    id: 'chk-6',
    category: 'Database/API',
    text: 'Custom context manager implemented for DB connections or file operations',
    hint: 'Implemented via class (__enter__/__exit__) or @contextmanager generator.'
  },
  {
    id: 'chk-7',
    category: 'Code Quality',
    text: 'Regex validation (re module) used for input parsing or format checks',
    hint: 'Validate emails, phone numbers, dates (YYYY-MM-DD), or command strings.'
  },
  {
    id: 'chk-8',
    category: 'Testing',
    text: 'Automated test suite (pytest or unittest) with 8+ test cases passing',
    hint: 'Run pytest from terminal and verify 100% tests pass.'
  },
  {
    id: 'chk-9',
    category: 'Documentation',
    text: 'Professional README.md with architecture overview and setup guide',
    hint: 'Include quickstart, features, dependencies, and test execution commands.'
  },
  {
    id: 'chk-10',
    category: 'Documentation',
    text: 'Public GitHub repository link ready for submission and review',
    hint: 'Verify repo is public and all required files are committed.'
  }
];
