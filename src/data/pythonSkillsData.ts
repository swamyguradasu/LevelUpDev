import { PYTHON_TOPICS_PART1, PythonTopicDetail, TopicPracticeItem, CheckpointQuestion } from './pythonTopicsDataPart1';
import { PYTHON_TOPICS_PART2 } from './pythonTopicsDataPart2';
import { PYTHON_TOPICS_PART3 } from './pythonTopicsDataPart3';
import { PYTHON_TOPICS_PART4 } from './pythonTopicsDataPart4';
import { PYTHON_TOPICS_PART5 } from './pythonTopicsDataPart5';
import { PYTHON_TOPICS_PART6 } from './pythonTopicsDataPart6';
import { PYTHON_QUESTION_BANKS as PYTHON_QUESTION_BANKS_PART1, AssignmentQuestion, AssignmentTestCase, ModuleAssignmentConfig } from './pythonQuestionBanks';
import { PYTHON_QUESTION_BANKS_PART2 } from './pythonQuestionBanksPart2';
import { PYTHON_QUESTION_BANKS_PART3 } from './pythonQuestionBanksPart3';
import { CAPSTONE_PROJECT_OPTIONS, CAPSTONE_STAGES, CAPSTONE_RUBRIC, CAPSTONE_CHECKLIST } from './pythonCapstoneData';

export type {
  PythonTopicDetail,
  TopicPracticeItem,
  CheckpointQuestion,
  AssignmentQuestion,
  AssignmentTestCase,
  ModuleAssignmentConfig,
};

export interface PythonModuleMetadata {
  id: string; // 'm1', 'm2', ... 'm21'
  moduleNumber: number; // 1 to 21
  title: string;
  shortDescription: string;
  longDescription: string;
  topicIds: string[];
  track?: 'foundation' | 'core' | 'real-world' | 'capstone';
  isCapstone?: boolean;
}

export const PYTHON_MODULES: PythonModuleMetadata[] = [
  // ==========================================
  // TRACK 1: FOUNDATION PYTHON (Modules 1–7)
  // ==========================================
  {
    id: 'm1',
    moduleNumber: 1,
    title: 'Python Basics',
    shortDescription: 'Installing Python & IDE, variables, data types, and console I/O.',
    longDescription: 'Learn how Python works, set up the development environment, understand variables and data types, and interact with users through input and output.',
    track: 'foundation',
    topicIds: [
      'installing-python-ide',
      'variables-and-data-types',
      'print-and-input'
    ]
  },
  {
    id: 'm2',
    moduleNumber: 2,
    title: 'Operators & Type Conversion',
    shortDescription: 'Arithmetic, comparison, logical, assignment operators, and type casting.',
    longDescription: 'Master mathematical calculations, relational comparisons, boolean logic evaluation, assignment operators, and explicit type casting in Python.',
    track: 'foundation',
    topicIds: [
      'arithmetic-operators',
      'comparison-operators',
      'logical-operators',
      'assignment-operators',
      'type-casting-conversion'
    ]
  },
  {
    id: 'm3',
    moduleNumber: 3,
    title: 'Conditional Statements',
    shortDescription: 'Decision making with if, elif, else, and nested conditionals.',
    longDescription: 'Build branching decision logic using if, elif, and else statements, explore truthy and falsy values, and master multi-level nested conditionals.',
    track: 'foundation',
    topicIds: [
      'if-statement',
      'elif-statement',
      'else-statement',
      'nested-conditionals'
    ]
  },
  {
    id: 'm4',
    moduleNumber: 4,
    title: 'Loops',
    shortDescription: 'Iterating with for loop, range(), while loop, break, and continue.',
    longDescription: 'Master repetitive execution with for and while loops, sequence generation with range(), and flow control with break and continue statements.',
    track: 'foundation',
    topicIds: [
      'for-loop',
      'range-function',
      'while-loop',
      'break-statement',
      'continue-statement'
    ]
  },
  {
    id: 'm5',
    moduleNumber: 5,
    title: 'Strings',
    shortDescription: 'String indexing, slicing, built-in string methods, and f-strings.',
    longDescription: 'Master text processing: zero-based indexing, substring slicing, built-in transformation methods, and modern formatted string literals (f-strings).',
    track: 'foundation',
    topicIds: [
      'string-indexing',
      'string-slicing',
      'string-methods',
      'f-strings'
    ]
  },
  {
    id: 'm6',
    moduleNumber: 6,
    title: 'Lists & Tuples',
    shortDescription: 'Lists creation, methods, slicing, and tuple immutability.',
    longDescription: 'Explore ordered sequence data structures: mutable lists with in-place methods, indexing, slicing, and immutable tuples with data integrity guarantees.',
    track: 'foundation',
    topicIds: [
      'list-creation',
      'list-indexing-slicing',
      'list-methods',
      'tuples',
      'tuple-immutability'
    ]
  },
  {
    id: 'm7',
    moduleNumber: 7,
    title: 'Dictionaries, Sets & Intro to Functions',
    shortDescription: 'Key-value maps, unique sets, and reusable functions with parameters & returns.',
    longDescription: 'Master high-performance hash maps (dictionaries), mathematical unique sets, and modular function definitions with parameters and return values.',
    track: 'foundation',
    topicIds: [
      'dictionaries',
      'dictionary-methods-traversal',
      'sets',
      'set-operations',
      'defining-functions',
      'parameters-and-arguments',
      'return-values'
    ]
  },

  // ==========================================
  // TRACK 2: CORE PYTHON (Modules 8–14)
  // ==========================================
  {
    id: 'm8',
    moduleNumber: 8,
    title: 'Functions Advanced',
    shortDescription: 'Default arguments, keyword arguments, *args, **kwargs, lambda functions, and recursion.',
    longDescription: 'Build a deeper understanding of Python functions by learning flexible arguments, lambda expressions, and recursion.',
    track: 'core',
    topicIds: [
      'default-arguments',
      'keyword-arguments',
      'args',
      'kwargs',
      'lambda-functions',
      'recursion'
    ]
  },
  {
    id: 'm9',
    moduleNumber: 9,
    title: 'Modules & Packages',
    shortDescription: 'Importing modules, Python pip, custom modules, and standard library overview.',
    longDescription: 'Learn how Python programs are organized into reusable modules and packages and understand how external libraries are installed and used.',
    track: 'core',
    topicIds: [
      'importing-modules',
      'python-pip',
      'creating-your-own-module',
      'standard-library-overview'
    ]
  },
  {
    id: 'm10',
    moduleNumber: 10,
    title: 'File Handling',
    shortDescription: 'Reading and writing text files, context managers (with), CSV files, and JSON serialization.',
    longDescription: 'Learn how Python programs read, write, and process external data using files.',
    track: 'core',
    topicIds: [
      'reading-text-files',
      'writing-text-files',
      'with-statement',
      'csv-files',
      'json-files'
    ]
  },
  {
    id: 'm11',
    moduleNumber: 11,
    title: 'Exception Handling',
    shortDescription: 'try, except, else, finally blocks, and custom exception classes with raise.',
    longDescription: 'Learn how to build reliable Python programs that handle unexpected situations without crashing unnecessarily.',
    track: 'core',
    topicIds: [
      'try-block',
      'except-block',
      'else-block',
      'finally-block',
      'custom-exceptions'
    ]
  },
  {
    id: 'm12',
    moduleNumber: 12,
    title: 'Object-Oriented Programming I',
    shortDescription: 'Classes, objects, __init__ constructor, self, instance vs class attributes.',
    longDescription: 'Learn the fundamental building blocks of object-oriented programming in Python.',
    track: 'core',
    topicIds: [
      'classes',
      'objects',
      'init-method',
      'instance-attributes',
      'class-attributes'
    ]
  },
  {
    id: 'm13',
    moduleNumber: 13,
    title: 'Object-Oriented Programming II',
    shortDescription: 'Inheritance, super(), polymorphism, duck typing, encapsulation, and magic dunder methods.',
    longDescription: 'Move from basic classes and objects into the major OOP concepts used in real Python applications and interviews.',
    track: 'core',
    topicIds: [
      'inheritance',
      'polymorphism',
      'encapsulation',
      'magic-dunder-methods'
    ]
  },
  {
    id: 'm14',
    moduleNumber: 14,
    title: 'Comprehensions, Iterators & Generators',
    shortDescription: 'List/dict/set comprehensions, iterators, generators, and the yield statement.',
    longDescription: 'Learn Python\'s powerful techniques for writing concise data-processing code and working efficiently with iterable data.',
    track: 'core',
    topicIds: [
      'list-comprehensions',
      'dictionary-comprehensions',
      'set-comprehensions',
      'iterators',
      'generators',
      'yield-statement'
    ]
  },

  // ==========================================
  // TRACK 3: REAL-WORLD PYTHON (Modules 15–20)
  // ==========================================
  {
    id: 'm15',
    moduleNumber: 15,
    title: 'Regular Expressions',
    shortDescription: 're module basics, pattern matching, search, findall, and sub functions.',
    longDescription: 'Master pattern matching, text search, token extraction, and data cleaning using Python\'s powerful re regular expressions engine.',
    track: 'real-world',
    topicIds: [
      're-module-basics',
      'pattern-matching',
      'search-method',
      'findall-method',
      'sub-method'
    ]
  },
  {
    id: 'm16',
    moduleNumber: 16,
    title: 'Decorators & Context Managers',
    shortDescription: 'Higher-order functions, function decorators, custom decorators, and custom context managers.',
    longDescription: 'Understand advanced Python metaprogramming and resource safety using decorators and context managers.',
    track: 'real-world',
    topicIds: [
      'function-decorators',
      'custom-decorators',
      'custom-context-managers',
      'enter-method',
      'exit-method'
    ]
  },
  {
    id: 'm17',
    moduleNumber: 17,
    title: 'Working with APIs',
    shortDescription: 'requests library, HTTP GET/POST, JSON response handling, and API authentication.',
    longDescription: 'Connect Python applications to real-world web services and REST APIs using modern HTTP protocols and resilient error handling.',
    track: 'real-world',
    topicIds: [
      'requests-library',
      'get-requests',
      'post-requests',
      'handling-json-responses',
      'api-authentication'
    ]
  },
  {
    id: 'm18',
    moduleNumber: 18,
    title: 'Databases with Python',
    shortDescription: 'SQLite basics, sqlite3 module, connections & cursors, CRUD operations, and SQLAlchemy ORM overview.',
    longDescription: 'Store, query, and manage structured application data using relational database systems and SQL in Python.',
    track: 'real-world',
    topicIds: [
      'sqlite-basics',
      'sqlite3-module',
      'connections-and-cursors',
      'crud-operations',
      'sqlalchemy-orm-overview'
    ]
  },
  {
    id: 'm19',
    moduleNumber: 19,
    title: 'Virtual Environments & Project Structure',
    shortDescription: 'venv, requirements.txt, project structure, project organization, and Git fundamentals.',
    longDescription: 'Organize professional Python repositories, isolate dependencies, and configure production-ready environments.',
    track: 'real-world',
    topicIds: [
      'venv',
      'requirements-txt',
      'python-project-structure',
      'organizing-python-projects',
      'intro-to-git'
    ]
  },
  {
    id: 'm20',
    moduleNumber: 20,
    title: 'Testing & Debugging',
    shortDescription: 'unittest basics, pytest essentials, writing test cases, debugging techniques, and logging.',
    longDescription: 'Write robust, maintainable Python code with automated unit testing suites and modern debugging techniques.',
    track: 'real-world',
    topicIds: [
      'unittest-basics',
      'pytest-basics',
      'writing-test-cases',
      'debugging-techniques',
      'logging-module'
    ]
  },

  // ==========================================
  // TRACK 4: PYTHON CAPSTONE PROJECT (Module 21)
  // ==========================================
  {
    id: 'm21',
    moduleNumber: 21,
    title: 'Python Capstone Project',
    shortDescription: 'Full-scale Python capstone project with database persistence, OOP architecture, testing, and production packaging.',
    longDescription: 'Build an end-to-end, production-grade Python application integrating all 20 modules: OOP architecture, SQLite database, custom decorators, regex parsing, automated testing with pytest, and professional packaging.',
    track: 'capstone',
    isCapstone: true,
    topicIds: [
      'capstone-project-selection',
      'capstone-architecture-design',
      'capstone-implementation-testing',
      'capstone-final-submission'
    ]
  }
];

// Capstone topic milestones to complete topic mapping for M21
const CAPSTONE_TOPICS: Record<string, PythonTopicDetail> = {
  'capstone-project-selection': {
    id: 'capstone-project-selection',
    moduleId: 'm21',
    topicNumber: 1,
    title: 'Capstone Selection & Scope',
    shortSummary: 'Choose from 5 industry-grade project tracks or define a custom scope.',
    whatIsIt: 'The Python Capstone Project is the culminating milestone of the Python Skills Trail. In this stage, you select one of the 5 industry-relevant project options (Expense Tracker, Student Record Management, Task CLI, Inventory System, or API Aggregator Client) and establish the project user stories, entity requirements, and functional scope.',
    whyDoWeNeedIt: 'Building a portfolio-ready project proves your ability to translate Python fundamentals into real-world software engineering solutions that impress technical interviewers.',
    syntax: `# Recommended Project Layout
my_capstone_project/
├── .venv/
├── src/
│   ├── __init__.py
│   ├── models/
│   ├── database/
│   ├── services/
│   └── cli.py
├── tests/
│   ├── test_models.py
│   └── test_services.py
├── .gitignore
├── requirements.txt
└── README.md`,
    basicExample: {
      code: `// Capstone Project Options
1. Personal Finance & Expense Tracker (SQLite + Regex + Pytest)
2. Student Academic Management System (Deep OOP + Reports)
3. Productivity & Task Management CLI (Recursion + Caching)
4. Warehouse & Inventory Management System (Transactions)
5. API-Powered Intelligence CLI (REST + Resilient Retries)`,
      output: `5 production tracks available.`
    },
    detailedExample: {
      code: `class ProjectSpecification:
    def __init__(self, title: str, domain: str, tech_stack: list[str]):
        self.title = title
        self.domain = domain
        self.tech_stack = tech_stack

capstone = ProjectSpecification(
    title="Expense Tracker CLI",
    domain="Personal Finance",
    tech_stack=["Python 3.10+", "SQLite3", "Pytest", "Regex"]
)
print(f"Initialized Capstone: {capstone.title}")`,
      output: `Initialized Capstone: Expense Tracker CLI`
    },
    codeExplanation: [
      'Line 1: Defines a structured class for the project specifications.',
      'Line 7: Instantiates the domain configuration with required dependencies.'
    ],
    commonMistakes: [
      {
        mistake: 'Writing implementation code before sketching out the schema or class hierarchy.',
        whyItIsWrong: 'Lack of initial data modeling leads to architectural churn and extensive refactoring.',
        correction: 'Map out your entities, database tables, and service layers before coding.'
      },
      {
        mistake: 'Over-scoping features beyond the 12 key project deliverables.',
        whyItIsWrong: 'Trying to build too many features at once leads to unfinished, buggy projects.',
        correction: 'Focus on shipping the 12 core roadmap deliverables first.'
      }
    ],
    importantRules: [
      'Choose a project aligned with your career goals.',
      'Keep code organized into src/, tests/, and docs/ from day one.'
    ],
    interviewPerspective: 'Recruiters look for clear problem statements, clean git commits, and well-structured README files.',
    practiceQuestions: [
      {
        question: 'What command creates a clean virtual environment in Python?',
        solution: 'python -m venv .venv'
      }
    ],
    checkpoint: [
      {
        id: 'chk-cap-1',
        type: 'mcq',
        prompt: 'What is the primary objective of the Python Capstone Project milestone?',
        options: [
          'To memorize syntax definitions',
          'To synthesize all 20 Python modules into a production-grade, tested, and documented application',
          'To write a single 10-line script without functions',
          'To avoid using virtual environments'
        ],
        correctAnswer: 1,
        explanation: 'The Capstone synthesizes OOP, SQLite, testing, decorators, regex, and project packaging into a complete portfolio application.'
      }
    ]
  },
  'capstone-architecture-design': {
    id: 'capstone-architecture-design',
    moduleId: 'm21',
    topicNumber: 2,
    title: 'Architecture & Data Modeling',
    shortSummary: 'Design SQLite relational schema and OOP class structures.',
    whatIsIt: 'Architecture and data modeling is where you specify your domain models (e.g. User, Expense, Category, Task) using Python classes and dataclasses, and map them to SQLite tables with relational foreign keys.',
    whyDoWeNeedIt: 'A strong architectural boundary separating presentation (CLI), business logic (services), and data persistence (SQLite) prevents tight coupling and makes code effortlessly testable.',
    syntax: `from dataclasses import dataclass
from datetime import datetime

@dataclass
class Transaction:
    id: int | None
    category: str
    amount: float
    description: str
    created_at: str = datetime.now().isoformat()`,
    basicExample: {
      code: `import sqlite3

def init_db(db_path="app.db"):
    with sqlite3.connect(db_path) as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                category TEXT NOT NULL,
                amount REAL NOT NULL,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
    print("Database initialized successfully.")

init_db(":memory:")`,
      output: `Database initialized successfully.`
    },
    detailedExample: {
      code: `import sqlite3
from contextlib import contextmanager

class DatabaseManager:
    def __init__(self, db_path: str = ":memory:"):
        self.db_path = db_path

    @contextmanager
    def get_connection(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        try:
            yield conn
            conn.commit()
        except Exception:
            conn.rollback()
            raise
        finally:
            conn.close()

db = DatabaseManager()
with db.get_connection() as conn:
    print("Context manager connection opened safely.")`,
      output: `Context manager connection opened safely.`
    },
    codeExplanation: [
      'Line 4: DatabaseManager encapsulates connection handling.',
      'Line 8: @contextmanager decorator ensures auto-commit on success and rollback on exceptions.'
    ],
    commonMistakes: [
      {
        mistake: 'Using string concatenation for SQL queries instead of parameterized ? placeholders.',
        whyItIsWrong: 'String concatenation opens catastrophic SQL injection vulnerabilities.',
        correction: 'Always use cursor.execute("SELECT ... WHERE id = ?", (val,)) syntax.'
      },
      {
        mistake: 'Putting database queries directly inside CLI display functions.',
        whyItIsWrong: 'Tightly couples storage to terminal I/O, making testing impossible.',
        correction: 'Isolate database calls in a Repository or DatabaseManager service.'
      }
    ],
    importantRules: [
      'Always use parameterized SQL queries with ? placeholders.',
      'Wrap database operations in transaction context managers.'
    ],
    interviewPerspective: 'Explain how you used Context Managers to ensure ACID transaction safety and prevent leaked connections.',
    practiceQuestions: [
      {
        question: 'Which method sets sqlite3 to return dictionary-like row objects?',
        solution: 'conn.row_factory = sqlite3.Row'
      }
    ],
    checkpoint: [
      {
        id: 'chk-cap-2',
        type: 'mcq',
        prompt: 'Why should database operations be encapsulated inside dedicated service or repository classes?',
        options: [
          'To make the code run 10x slower',
          'To decouple business logic from storage mechanics, making unit testing and maintenance easier',
          'Because Python forbids writing SQL in main files',
          'To avoid using functions'
        ],
        correctAnswer: 1,
        explanation: 'Decoupling storage from business logic allows you to test logic independently with mocks and swap database engines easily.'
      }
    ]
  },
  'capstone-implementation-testing': {
    id: 'capstone-implementation-testing',
    moduleId: 'm21',
    topicNumber: 3,
    title: 'Implementation & Automated Testing',
    shortSummary: 'Implement business logic, regex validation, custom decorators, and pytest test suites.',
    whatIsIt: 'In this stage, you build out your service logic, apply custom decorators (for timing, logging, or caching), enforce regex validation on user inputs, and write a thorough automated test suite using pytest.',
    whyDoWeNeedIt: 'Automated tests guarantee that edge cases (like zero amounts, invalid email formats, or nonexistent records) are handled gracefully without regressions.',
    syntax: `import functools
import time

def timing_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start
        print(f"[{func.__name__}] executed in {duration:.4f}s")
        return result
    return wrapper`,
    basicExample: {
      code: `def test_transaction_creation():
    tx = {"id": 1, "category": "Food", "amount": 25.50}
    assert tx["amount"] == 25.50
    assert tx["category"] == "Food"
    print("Assertion passed.")

test_transaction_creation()`,
      output: `Assertion passed.`
    },
    detailedExample: {
      code: `import re

def validate_email(email: str) -> bool:
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return bool(re.match(pattern, email))

print("Valid email:", validate_email("swamy@levelupdev.com"))
print("Invalid email:", validate_email("invalid-address"))`,
      output: `Valid email: True\nInvalid email: False`
    },
    codeExplanation: [
      'Line 3: Validates email format using re.match with anchored regex pattern.',
      'Line 6: Returns boolean match result.'
    ],
    commonMistakes: [
      {
        mistake: 'Writing tests that depend on live internet connections or unseeded database states.',
        whyItIsWrong: 'Tests become flaky and fail unpredictably when network or DB changes.',
        correction: 'Use pytest fixtures or in-memory sqlite3 databases (:memory:) for isolated testing.'
      },
      {
        mistake: 'Forgetting functools.wraps when writing custom decorators.',
        whyItIsWrong: 'Erases the decorated function original __name__ and __doc__ metadata.',
        correction: 'Always wrap inner functions with @functools.wraps(func).'
      }
    ],
    importantRules: [
      'Aim for 8+ automated tests covering edge cases and normal workflows.',
      'Use functools.wraps on all custom decorators.'
    ],
    interviewPerspective: 'Explain how you structured your test fixtures and mocks to achieve high test reliability.',
    practiceQuestions: [
      {
        question: 'Which pytest helper asserts that a specific exception is raised?',
        solution: 'pytest.raises(ExpectedException)'
      }
    ],
    checkpoint: [
      {
        id: 'chk-cap-3',
        type: 'mcq',
        prompt: 'Which tool is recommended to run the capstone automated test suite?',
        options: [
          'pytest',
          'pip install',
          'git push',
          're.compile'
        ],
        correctAnswer: 0,
        explanation: 'pytest is the industry standard test runner for executing automated Python test suites.'
      }
    ]
  },
  'capstone-final-submission': {
    id: 'capstone-final-submission',
    moduleId: 'm21',
    topicNumber: 4,
    title: 'Verification & Capstone Certification',
    shortSummary: 'Complete the 10-point checklist, push to GitHub, and submit for evaluation.',
    whatIsIt: 'The final step of the Python Skills Trail! Verify your repository against the 10-point verification checklist, confirm all tests pass, ensure your README is complete with setup instructions, and submit your project to unlock the Master Python Certification.',
    whyDoWeNeedIt: 'Submitting a verified, complete capstone repository concludes all 21 modules of your Python journey, granting you full mastery credentials on LevelUpDev.',
    syntax: `# Verification Checklist:
- [x] Clean folder structure (src/, tests/, docs/)
- [x] Virtual environment & requirements.txt
- [x] OOP classes and data models
- [x] SQLite persistence with parameterized queries
- [x] Custom decorators & context managers
- [x] Regex input validation
- [x] Automated pytest test suite (8+ passing tests)
- [x] Comprehensive README.md
- [x] Public GitHub Repository Link`,
    basicExample: {
      code: `# Submitting your repository:
# 1. git init
# 2. git add . && git commit -m "feat: complete python capstone"
# 3. git push origin main
# 4. Paste repo URL into Capstone submission form.
print("Capstone ready for verification.")`,
      output: `Capstone ready for verification.`
    },
    detailedExample: {
      code: `def verify_capstone_readiness(checklist: dict[str, bool]) -> bool:
    completed = sum(1 for v in checklist.values() if v)
    total = len(checklist)
    print(f"Verified {completed}/{total} checklist criteria.")
    return completed >= 8

sample_checklist = {"src_layout": True, "venv": True, "tests": True, "db": True, "docs": True, "regex": True, "decorators": True, "git": True}
print("Submission allowed:", verify_capstone_readiness(sample_checklist))`,
      output: `Verified 8/8 checklist criteria.\nSubmission allowed: True`
    },
    codeExplanation: [
      'Line 1: Function validates that at least 8 checklist criteria are verified.',
      'Line 7: Evaluates readiness and enables project certification.'
    ],
    commonMistakes: [
      {
        mistake: 'Submitting a private repository that cannot be viewed by reviewers.',
        whyItIsWrong: 'Reviewers will get a 404 error and cannot grade the project.',
        correction: 'Set repository visibility to Public in GitHub repository settings.'
      },
      {
        mistake: 'Forgetting to commit requirements.txt or tests folder.',
        whyItIsWrong: 'Without requirements and tests, the application cannot be executed or verified.',
        correction: 'Run pip freeze > requirements.txt and git status before final push.'
      }
    ],
    importantRules: [
      'Repository must be public on GitHub.',
      'All automated tests must pass with zero failures.'
    ],
    interviewPerspective: 'Add a GIF or ASCII recording of your CLI in action to your GitHub repository README to make it stand out immediately.',
    practiceQuestions: [
      {
        question: 'What file lists project Python package dependencies?',
        solution: 'requirements.txt (or pyproject.toml)'
      }
    ],
    checkpoint: [
      {
        id: 'chk-cap-4',
        type: 'mcq',
        prompt: 'What is required before submitting your Capstone project?',
        options: [
          'Ensuring all tests pass, requirements.txt is included, and code is committed to a public repository',
          'Deleting the tests folder',
          'Hardcoding API secrets in plaintext',
          'Removing the README file'
        ],
        correctAnswer: 0,
        explanation: 'A production-grade submission requires a complete README, passing tests, requirements.txt, and a public repository.'
      }
    ]
  }
};

// Unified Topic Dictionary (all 98 topics across Modules 1–21)
export const PYTHON_TOPICS_MAP: Record<string, PythonTopicDetail> = {
  ...PYTHON_TOPICS_PART1,
  ...PYTHON_TOPICS_PART2,
  ...PYTHON_TOPICS_PART3,
  ...PYTHON_TOPICS_PART4,
  ...PYTHON_TOPICS_PART5,
  ...PYTHON_TOPICS_PART6,
  ...CAPSTONE_TOPICS,
};

// Unified Question Banks (Modules 1–20)
export const PYTHON_QUESTION_BANKS: Record<string, ModuleAssignmentConfig> = {
  ...PYTHON_QUESTION_BANKS_PART1,
  ...PYTHON_QUESTION_BANKS_PART2,
  ...PYTHON_QUESTION_BANKS_PART3,
};

// Sequential array of all topics for global linear navigation
export const ALL_PYTHON_TOPICS: PythonTopicDetail[] = PYTHON_MODULES.flatMap((mod) =>
  mod.topicIds.map((tid) => PYTHON_TOPICS_MAP[tid]).filter(Boolean)
);

// Helper Functions
export function getAllPythonModules(): PythonModuleMetadata[] {
  return PYTHON_MODULES;
}

export function getPythonModuleById(moduleId: string): PythonModuleMetadata | null {
  const norm = moduleId.toLowerCase().trim();
  return (
    PYTHON_MODULES.find(
      (m) =>
        m.id.toLowerCase() === norm ||
        `module-${m.moduleNumber}` === norm ||
        `m${m.moduleNumber}` === norm
    ) || null
  );
}

export function getPythonTopicById(topicId: string): PythonTopicDetail | null {
  return PYTHON_TOPICS_MAP[topicId] || null;
}

export function getModuleTopics(moduleId: string): PythonTopicDetail[] {
  const mod = getPythonModuleById(moduleId);
  if (!mod) return [];
  return mod.topicIds.map((tid) => PYTHON_TOPICS_MAP[tid]).filter(Boolean);
}

export function getPreviousAndNextTopic(topicId: string): {
  prev: PythonTopicDetail | null;
  next: PythonTopicDetail | null;
  module: PythonModuleMetadata | null;
} {
  const index = ALL_PYTHON_TOPICS.findIndex((t) => t.id === topicId);
  if (index === -1) {
    return { prev: null, next: null, module: null };
  }

  const currentTopic = ALL_PYTHON_TOPICS[index];
  const mod = getPythonModuleById(currentTopic.moduleId);
  const prev = index > 0 ? ALL_PYTHON_TOPICS[index - 1] : null;
  const next = index < ALL_PYTHON_TOPICS.length - 1 ? ALL_PYTHON_TOPICS[index + 1] : null;

  return { prev, next, module: mod };
}

// Track Visual Groups
export interface PythonTrackSection {
  track: 'foundation' | 'core' | 'real-world' | 'capstone';
  title: string;
  badge: string;
  description: string;
  moduleRange: string;
  accentColor: string;
  modules: PythonModuleMetadata[];
}

export function getPythonTrackSections(): PythonTrackSection[] {
  return [
    {
      track: 'foundation',
      title: 'Foundation Python',
      badge: 'Modules 1 – 7',
      description: 'Master variables, conditionals, loops, strings, lists, tuples, dictionaries, sets, and essential functions.',
      moduleRange: '1–7',
      accentColor: 'from-blue-500/20 via-cyan-500/10 to-transparent',
      modules: PYTHON_MODULES.filter((m) => m.moduleNumber >= 1 && m.moduleNumber <= 7)
    },
    {
      track: 'core',
      title: 'Core Python',
      badge: 'Modules 8 – 14',
      description: 'Advanced function arguments, modular architecture, file handling, exceptions, OOP design, and generators.',
      moduleRange: '8–14',
      accentColor: 'from-amber-500/20 via-orange-500/10 to-transparent',
      modules: PYTHON_MODULES.filter((m) => m.moduleNumber >= 8 && m.moduleNumber <= 14)
    },
    {
      track: 'real-world',
      title: 'Real-World Python',
      badge: 'Modules 15 – 20',
      description: 'Regular expressions, custom decorators & context managers, REST APIs, SQLite databases, virtual environments, and Pytest.',
      moduleRange: '15–20',
      accentColor: 'from-purple-500/20 via-indigo-500/10 to-transparent',
      modules: PYTHON_MODULES.filter((m) => m.moduleNumber >= 15 && m.moduleNumber <= 20)
    },
    {
      track: 'capstone',
      title: 'Python Capstone Project',
      badge: 'Module 21 • Culminating Milestone',
      description: 'Architect, test, and ship a production-grade application across 12 development stages with automated verification.',
      moduleRange: '21',
      accentColor: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      modules: PYTHON_MODULES.filter((m) => m.moduleNumber === 21)
    }
  ];
}

// Anti-Cheating: Randomized Question Sampler with Option Shuffling
export function generateRandomizedAssignment(moduleId: string): {
  config: ModuleAssignmentConfig;
  questions: AssignmentQuestion[];
} {
  const modKey = moduleId.toLowerCase().replace('module-', 'm');
  const config = PYTHON_QUESTION_BANKS[modKey] || PYTHON_QUESTION_BANKS['m1'];
  const pool = [...config.questionBank];

  // Fisher-Yates shuffle array
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Select sampleCount questions
  const selected = pool.slice(0, Math.min(config.sampleCount, pool.length));

  // Option shuffling for MCQs
  const preparedQuestions = selected.map((q) => {
    if (q.type === 'mcq' && q.options && typeof q.correctAnswer === 'number') {
      const originalOptions = q.options.map((opt, idx) => ({
        text: opt,
        isCorrect: idx === q.correctAnswer,
      }));

      // Shuffle options
      for (let i = originalOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [originalOptions[i], originalOptions[j]] = [originalOptions[j], originalOptions[i]];
      }

      const newOptions = originalOptions.map((o) => o.text);
      const newCorrectIndex = originalOptions.findIndex((o) => o.isCorrect);

      return {
        ...q,
        options: newOptions,
        correctAnswer: newCorrectIndex,
      };
    }
    return q;
  });

  return {
    config,
    questions: preparedQuestions,
  };
}

// ==========================================
// PYTHON CAPSTONE & FINAL CHALLENGE EXPORTS
// ==========================================
export interface FinalChallengeSpec {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  estimatedTime: string;
  requirements: string[];
  inputExpectations: string[];
  constraints: string[];
  sampleInput: string;
  sampleOutput: string;
  starterCode: string;
  solutionCode: string;
  testCases: AssignmentTestCase[];
}

export const PYTHON_FINAL_CHALLENGE: FinalChallengeSpec = {
  id: 'python-final-beginner-challenge',
  title: 'Python Comprehensive Final Capstone Challenge',
  subtitle: 'Student Performance & Analytics System',
  description:
    'Build a comprehensive, modular Student Performance and Course Analytics CLI program synthesizing all Python modules: Variables & I/O, Operators, Conditionals, Loops, Strings, Lists, Tuples, Dictionaries, Sets, Functions, Modules, File Handling, Exceptions, OOP, and Comprehensions/Generators.',
  estimatedTime: '45–60 mins',
  requirements: [
    'Define a function `process_student_data(student_name, subject_scores)` that calculates total score, average, highest subject mark, lowest subject mark, and pass status (average >= 40).',
    'Define a function `get_unique_courses(courses_list)` that takes a list of course names with duplicates and returns a sorted list of unique courses using a Set.',
    'Store student profile records in a Dictionary with keys: `name`, `total`, `average`, `highest`, `lowest`, `status`.',
    'Format all numeric averages to exactly 2 decimal places using f-strings (e.g. `85.50`).',
    'Process multiple students in a loop and determine the class top ranker.'
  ],
  inputExpectations: [
    'Line 1: Integer `N` representing number of students.',
    'Next `N` lines: Each line has student name followed by 4 subject marks separated by spaces (e.g. `Swamy 85 92 78 90`).',
    'Final line: Comma-separated list of course enrollments (e.g. `Python,SQL,Python,DSA,Web,SQL`).'
  ],
  constraints: [
    '1 <= N <= 50',
    '0 <= marks <= 100',
    'Must use functions with explicit return values',
    'Must use sets for deduplicating course list'
  ],
  sampleInput: `3
Swamy 85 92 78 90
Alex 95 88 92 96
Kiran 35 40 38 42
Python,SQL,Python,DSA,Web,SQL`,
  sampleOutput: `=== CLASS PERFORMANCE REPORT ===
Swamy | Total: 345 | Avg: 86.25 | Status: PASS
Alex | Total: 371 | Avg: 92.75 | Status: PASS
Kiran | Total: 155 | Avg: 38.75 | Status: FAIL
--------------------------------
Class Top Ranker: Alex (Avg: 92.75)
Unique Courses: DSA, Python, SQL, Web`,
  starterCode: `# Write your Student Performance & Analytics System solution below:

def process_student(name, marks):
    # Calculate total, average, status, return dict
    pass

def get_unique_courses(courses_str):
    # Return sorted unique courses using a set
    pass

# Main program driver
`,
  solutionCode: `def process_student(name, marks):
    total = sum(marks)
    avg = total / len(marks)
    status = "PASS" if avg >= 40 else "FAIL"
    return {
        "name": name,
        "total": total,
        "average": avg,
        "highest": max(marks),
        "lowest": min(marks),
        "status": status
    }

def get_unique_courses(courses_str):
    courses = [c.strip() for c in courses_str.split(",") if c.strip()]
    unique_set = set(courses)
    return sorted(list(unique_set))

def main():
    import sys
    lines = sys.stdin.read().strip().splitlines()
    if not lines:
        return
    n = int(lines[0].strip())
    students = []
    for i in range(1, n + 1):
        parts = lines[i].strip().split()
        name = parts[0]
        marks = [float(x) for x in parts[1:]]
        students.append(process_student(name, marks))
    
    courses_line = lines[n + 1] if len(lines) > n + 1 else ""
    unique_courses = get_unique_courses(courses_line)
    
    print("=== CLASS PERFORMANCE REPORT ===")
    for s in students:
        print(f"{s['name']} | Total: {int(s['total'])} | Avg: {s['average']:.2f} | Status: {s['status']}")
    print("--------------------------------")
    top_student = max(students, key=lambda s: s['average'])
    print(f"Class Top Ranker: {top_student['name']} (Avg: {top_student['average']:.2f})")
    print(f"Unique Courses: {', '.join(unique_courses)}")

if __name__ == "__main__":
    main()`,
  testCases: [
    {
      input: `3\nSwamy 85 92 78 90\nAlex 95 88 92 96\nKiran 35 40 38 42\nPython,SQL,Python,DSA,Web,SQL`,
      expectedOutput: `=== CLASS PERFORMANCE REPORT ===\nSwamy | Total: 345 | Avg: 86.25 | Status: PASS\nAlex | Total: 371 | Avg: 92.75 | Status: PASS\nKiran | Total: 155 | Avg: 38.75 | Status: FAIL\n--------------------------------\nClass Top Ranker: Alex (Avg: 92.75)\nUnique Courses: DSA, Python, SQL, Web`,
      description: '3 students and duplicate courses'
    },
    {
      input: `2\nDivya 90 95 92 88\nRahul 70 65 80 75\nAI,ML,DL,AI,Python`,
      expectedOutput: `=== CLASS PERFORMANCE REPORT ===\nDivya | Total: 365 | Avg: 91.25 | Status: PASS\nRahul | Total: 290 | Avg: 72.50 | Status: PASS\n--------------------------------\nClass Top Ranker: Divya (Avg: 91.25)\nUnique Courses: AI, DL, ML, Python`,
      description: '2 students and unique courses'
    }
  ]
};

// Export Capstone Data
export { CAPSTONE_PROJECT_OPTIONS, CAPSTONE_STAGES, CAPSTONE_RUBRIC, CAPSTONE_CHECKLIST };

