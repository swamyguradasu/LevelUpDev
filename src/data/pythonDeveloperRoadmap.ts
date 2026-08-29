export interface PythonRoadmapStage {
  id: string;
  stageNumber: string;
  title: string;
  shortTitle: string;
  tagline: string;
  iconName: string;
  goal: string;
  whyItMatters: string;
  learningOutcome: string;
  recommendedApproach?: string;
  technologies: string[];
  topics: {
    category: string;
    items: string[];
  }[];
  keyConcepts: string[];
  practiceSuggestions: string[];
  projectSuggestions: {
    title: string;
    description: string;
    level: string;
  }[];
  commonMistakes: string[];
  nextStepPreview: string;
}

export interface PythonProjectProgression {
  id: string;
  stage: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Backend API' | 'Advanced' | 'Portfolio-Level';
  recommendedStack: string[];
  skillsLearned: string[];
  description: string;
  features: string[];
  databaseReqs: string;
  apiReqs: string;
  testingReqs: string;
  deploymentRecommendation: string;
}

export interface PythonSpecialization {
  title: string;
  description: string;
  coreTech: string[];
  focus: string;
  icon: string;
}

export interface TechStackCategory {
  category: string;
  items: string[];
}

export const PYTHON_ROADMAP_STAGES: PythonRoadmapStage[] = [
  {
    id: 'python-foundations',
    stageNumber: '01',
    title: 'Python Foundations',
    shortTitle: 'Foundations',
    tagline: 'Understand the Python language, runtime interpreter, syntax rules, and start writing programs confidently.',
    iconName: 'Code2',
    goal: 'Understand the Python language and learn how to write basic programs confidently.',
    whyItMatters:
      'Mastering Python syntax, dynamic typing, variable assignment, indentation rules, and basic I/O gives you the immediate confidence to code from scratch without getting blocked by simple syntax errors.',
    learningOutcome: 'Be able to write small Python programs from scratch without following tutorials.',
    technologies: ['Python 3.12+', 'Python REPL / IDLE', 'VS Code', 'Terminal / Bash'],
    topics: [
      {
        category: 'Language & Environment Basics',
        items: [
          'What Python is & why it is popular',
          'Python installation & path configuration',
          'Python interpreter & running .py scripts',
          'Python 2 vs Python 3 differences',
          'Using the interactive Python REPL',
        ],
      },
      {
        category: 'Variables & Data Types',
        items: [
          'Variables & naming conventions (snake_case)',
          'Primitive data types: int, float, str, bool, None',
          'Type casting (int(), float(), str(), bool())',
          'Type checking with type() and isinstance()',
        ],
      },
      {
        category: 'Operators & Basic I/O',
        items: [
          'Arithmetic (+, -, *, /, //, %, **)',
          'Comparison (==, !=, >, <, >=, <=) & Logical (and, or, not)',
          'User input with input()',
          'Formatted output with print() & sep/end arguments',
        ],
      },
      {
        category: 'Syntax & Code Hygiene',
        items: [
          'Python indentation rules (4 spaces standard)',
          'Single-line (#) and multi-line comments',
          'Basic syntax errors vs runtime errors',
          'Reading tracebacks and error messages',
        ],
      },
    ],
    keyConcepts: [
      'Indentation as Scope',
      'Dynamic Typing in Python',
      'Type Casting Rules',
      'Python REPL Execution',
      'Interactive Input & Type Parsing',
    ],
    practiceSuggestions: [
      'Write an interactive command-line Calculator supporting addition, subtraction, multiplication, and modulo.',
      'Build a Temperature Converter converting between Celsius, Fahrenheit, and Kelvin.',
      'Create an Age Calculator that takes a birth year input and computes the user’s exact age.',
      'Build a Unit Converter (km to miles, kg to lbs, liters to gallons).',
      'Build a Restaurant Bill & Tip Splitter calculating total share per person.',
    ],
    projectSuggestions: [
      {
        title: 'Interactive Multi-Tool CLI Utility',
        description: 'A console app combining a unit converter, tip calculator, and BMI calculator with clean user prompts.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Mixing tabs and spaces causing unexpected IndentationError.',
      'Forgetting that input() always returns a string and trying to do arithmetic without casting.',
    ],
    nextStepPreview: 'Now that you know Python basics, advance to Stage 02: Core Python Control Flow, Functions, and Collections.',
  },
  {
    id: 'core-python',
    stageNumber: '02',
    title: 'Core Python & Data Structures',
    shortTitle: 'Core Python',
    tagline: 'Become fully comfortable with Python control flow, functions, built-in collections, and comprehensions.',
    iconName: 'Braces',
    goal: "Become comfortable with Python's core programming constructs and built-in data structures.",
    whyItMatters:
      'Python’s native data structures (lists, tuples, sets, dicts) and comprehension expressions are the heart of writing idiomatic, fast, and elegant Python code.',
    learningOutcome: 'Ability to manipulate complex nested data structures and write modular, DRY Python functions.',
    recommendedApproach:
      'Master list and dictionary comprehensions early—they make your code concise, readable, and highly pythonic.',
    technologies: ['Python Collections', 'List Comprehensions', 'Built-in Functions', 'F-Strings'],
    topics: [
      {
        category: 'Control Flow',
        items: [
          'if, elif, else conditional branching',
          'for loops with range() & collections',
          'while loops & loop conditions',
          'break, continue, and pass statements',
          'Loop else clauses (for/else, while/else)',
        ],
      },
      {
        category: 'Functions & Scope',
        items: [
          'Defining functions with def & return values',
          'Positional vs Keyword arguments',
          'Default parameter values',
          '*args (variable positional) & **kwargs (variable keyword)',
          'Global vs Local scope & the nonlocal keyword',
        ],
      },
      {
        category: 'Built-in Collections',
        items: [
          'Lists: indexing, slicing, methods (append, pop, sort)',
          'Tuples: immutability, tuple packing & unpacking',
          'Sets: uniqueness, union, intersection, difference',
          'Dictionaries: key-value pairs, get(), items(), keys(), values()',
        ],
      },
      {
        category: 'Comprehensions & Built-in Helpers',
        items: [
          'List, Set, and Dictionary comprehensions',
          'enumerate() for indexed iteration',
          'zip() for parallel iteration',
          'map(), filter(), sorted(), all(), any()',
          'String methods & advanced f-strings formatting',
        ],
      },
    ],
    keyConcepts: [
      'Mutable (List/Dict/Set) vs Immutable (Tuple/Str)',
      'List & Dict Comprehensions',
      '*args and **kwargs Unpacking',
      'Tuple Packing & Multi-Variable Assignment',
      'Dictionary Hash Map Lookups (O(1))',
    ],
    practiceSuggestions: [
      'Build a Number Guessing Game with random number generation and attempt tracking.',
      'Create an in-memory Contact Book supporting add, search, update, and delete actions with dictionaries.',
      'Build a CLI To-Do List supporting task statuses, filters, and priority sorting.',
      'Create a Student Management System computing class averages and top-performing student leaderboards.',
    ],
    projectSuggestions: [
      {
        title: 'Console Student Grade & Attendance Tracker',
        description: 'A modular Python app managing student records, calculating grade point averages with dictionary comprehensions.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Using mutable default arguments like def add_item(item, items=[]): which leads to shared state bugs.',
      'Modifying a list while iterating over it using a standard for loop.',
    ],
    nextStepPreview: 'Structure your programs professionally in Stage 03: Object-Oriented Python & Algorithmic Problem Solving.',
  },
  {
    id: 'oop-problem-solving',
    stageNumber: '03',
    title: 'OOP & Problem Solving',
    shortTitle: 'Problem Solving',
    tagline: 'Learn to structure Python applications with clean object-oriented classes and solve algorithmic problems efficiently.',
    iconName: 'Brain',
    goal: 'Learn to structure Python applications and solve programming problems efficiently.',
    whyItMatters:
      'Object-Oriented Programming allows you to model real-world business domains clearly. Paired with algorithmic problem-solving, it turns you into an engineer who writes fast, structured, and scalable code.',
    learningOutcome: 'Ability to architect domain classes using OOP principles and analyze time/space complexities.',
    recommendedApproach: "Don't just memorize Python syntax. Learn how to think, break down complex logic, and solve problems.",
    technologies: ['Python OOP', 'LeetCode', 'HackerRank', 'Big-O Analysis', 'NeetCode'],
    topics: [
      {
        category: 'Object-Oriented Programming (OOP)',
        items: [
          'Classes, Objects, and the __init__ constructor',
          'Instance attributes vs Class attributes',
          'Instance methods, @classmethod, and @staticmethod',
          'Inheritance & super() method resolution order (MRO)',
          'Encapsulation & private attributes (_protected, __private)',
          'Polymorphism, method overriding & Duck Typing',
          'Abstraction with abc module (ABC, @abstractmethod)',
          'Composition over Inheritance',
        ],
      },
      {
        category: 'Algorithmic Thinking & Problem Solving',
        items: [
          'Breaking complex business logic into smaller sub-problems',
          'Time complexity & Space complexity (Big-O notation)',
          'Linear search vs Binary search',
          'Sorting algorithms (Bubble, Insertion, Merge, Quick, Timsort)',
          'Recursion & call stack fundamentals',
          'Basic two-pointer & sliding window patterns in Python',
        ],
      },
      {
        category: 'Special Dunder Methods',
        items: [
          '__str__ and __repr__ for clean object printing',
          '__len__, __getitem__, __setitem__ for custom collections',
          '__eq__, __lt__, __gt__ for object comparisons',
        ],
      },
    ],
    keyConcepts: [
      'Encapsulation & Data Hiding',
      'Python Duck Typing ("If it quacks like a duck...")',
      'Class Methods vs Static Methods',
      'Dunder / Magic Methods',
      'Big-O Asymptotic Complexity',
      'Recursion & Base Cases',
    ],
    practiceSuggestions: [
      'Solve 40-50 problems on LeetCode/HackerRank focused on Arrays, Strings, Hash Maps, and Binary Search.',
      'Implement a Bank Management System with Account, Customer, and Transaction classes.',
      'Build a Library Management System with Book, Member, and Loan classes.',
      'Create an Inventory & Warehouse Management System with automated re-stock alerts.',
    ],
    projectSuggestions: [
      {
        title: 'Object-Oriented Bank & Loan Management Engine',
        description: 'Complete OOP simulation featuring checking/savings accounts, interest calculations, transactions, and validation.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Creating god classes that handle too many responsibilities instead of breaking them down into cohesive domain models.',
      'Ignoring time complexity and writing nested O(n^2) loops over large data sets when an O(n) hash map lookup works.',
    ],
    nextStepPreview: 'Level up into professional Python features in Stage 04: Advanced Python & Pythonic Code.',
  },
  {
    id: 'advanced-python',
    stageNumber: '04',
    title: 'Advanced Python Mastery',
    shortTitle: 'Advanced Python',
    tagline: 'Move beyond basic Python and master generators, decorators, context managers, type hints, and internals.',
    iconName: 'Layers',
    goal: 'Move beyond basic Python and understand features used in professional applications.',
    whyItMatters:
      'Professional frameworks (like FastAPI and Django) heavily rely on decorators, generators, type hints, and context managers. Understanding these tools allows you to write high-performance, readable, and clean code.',
    learningOutcome: 'Write cleaner, more reusable, memory-efficient, and maintainable Python code.',
    technologies: ['Generators', 'Decorators', 'Context Managers', 'Type Hints / Mypy', 'Dataclasses', 'PEP 8'],
    topics: [
      {
        category: 'Functional & Metaprogramming Features',
        items: [
          'Iterators (__iter__, __next__) & Iterables',
          'Generators (yield) & Generator expressions for memory efficiency',
          'Function decorators & decorators with arguments',
          'Context managers (__enter__, __exit__) & contextlib',
          'Lambda expressions, closures & higher-order functions',
        ],
      },
      {
        category: 'Modern Python Standards & Typing',
        items: [
          'Type hints (typing module: Union, Optional, List, Dict, Callable)',
          'Dataclasses (@dataclass) & frozen instances',
          'Enums (enum.Enum) for constant states',
          'Custom Exception hierarchies with try / except / else / finally',
          'Modular packaging: __init__.py, relative imports, __name__ == "__main__"',
        ],
      },
      {
        category: 'Python Internals & Best Practices',
        items: [
          'PEP 8 style guide & Pythonic idioms',
          'Memory management: reference counting & garbage collection',
          'Mutable vs immutable memory addresses (id(), is vs ==)',
          'Shallow copy vs Deep copy (copy module)',
          'Logging module (logging.getLogger, levels, handlers)',
        ],
      },
    ],
    keyConcepts: [
      'Generator Lazy Evaluation & Memory Savings',
      'Decorator Wrapper Mechanics',
      'Resource Management with Context Managers',
      'Type Hints & Static Type Checking',
      'Python Garbage Collector & Reference Counts',
      'Custom Exception Trees',
    ],
    practiceSuggestions: [
      'Write a custom timing decorator (@timer) that measures execution time of functions.',
      'Write a file reading generator that streams millions of lines without crashing RAM.',
      'Create a database connection context manager that automatically handles commit and rollback.',
      'Refactor a legacy script to use @dataclass and comprehensive type hints.',
    ],
    projectSuggestions: [
      {
        title: 'Memory-Efficient Log Streaming & Analysis Engine',
        description: 'A Python tool that processes multi-gigabyte server logs using generators, regex, custom decorators, and structured logging.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Loading entire massive files into memory at once with f.read() instead of iterating lazily with generators.',
      'Using bare except: clauses without catching specific exception types.',
    ],
    nextStepPreview: 'Master developer workflows and professional tooling in Stage 05: Python Tools & Development Workflow.',
  },
  {
    id: 'python-tools',
    stageNumber: '05',
    title: 'Python Tools & Dev Workflow',
    shortTitle: 'Development Tools',
    tagline: 'Master the professional developer toolchain: virtual environments, Git, linters, formatters, and packaging.',
    iconName: 'Terminal',
    goal: 'Learn the professional tools Python developers use every day.',
    whyItMatters:
      'Writing Python in production requires strict dependency isolation, clean Git history, automated code formatters, linting, and proper environment configuration.',
    learningOutcome: 'Ability to set up isolated virtual environments, manage dependencies, format code to industry standards, and collaborate via Git.',
    technologies: ['Git & GitHub', 'venv / Poetry / uv', 'Ruff / Black / isort', 'pip & pyproject.toml', 'VS Code', 'python-dotenv'],
    topics: [
      {
        category: 'Environment & Dependency Management',
        items: [
          'Virtual environments (python -m venv .venv)',
          'pip package management & requirements.txt freeze',
          'Modern pyproject.toml & Poetry / uv dependency managers',
          'Managing environment variables with python-dotenv & .env files',
          '.gitignore best practices (excluding .venv, __pycache__, .env)',
        ],
      },
      {
        category: 'Code Quality & Linting',
        items: [
          'Ruff (blazing-fast Python linter and formatter)',
          'Black (uncompromising code formatter)',
          'isort (automatic import sorting)',
          'Flake8 & static analysis checks',
          'Pre-commit hooks for automated formatting',
        ],
      },
      {
        category: 'Git & Collaboration Workflow',
        items: [
          'Git fundamentals (init, branch, checkout, commit, push, pull)',
          'Feature branching & Git branching conventions',
          'Opening Pull Requests with clear descriptions',
          'Participating in team code reviews',
          'Writing comprehensive project READMEs & docstrings',
        ],
      },
    ],
    keyConcepts: [
      'Virtual Environment Isolation',
      'Deterministic Dependency Pinning',
      'Automated Linting & Formatting',
      'Feature Branching Workflow',
      'Secrets Management (.env)',
      'PEP 257 Docstring Standards',
    ],
    practiceSuggestions: [
      'Initialize a clean repository with a pyproject.toml, virtual environment, and Ruff pre-commit hook.',
      'Configure VS Code with Python extension, auto-formatting on save, and interactive debugger.',
      'Create a feature branch, make atomic commits, and open a Pull Request on GitHub.',
    ],
    projectSuggestions: [
      {
        title: 'Custom Python Package / CLI Template Repo',
        description: 'A production-ready Python starter template with automated linters, Ruff, pyproject.toml, and GitHub Actions CI.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Installing packages globally into the system Python instead of using an isolated virtual environment.',
      'Committing .env secrets or __pycache__ folders to GitHub.',
    ],
    nextStepPreview: 'Connect your Python applications to databases in Stage 06: Databases & SQL for Python.',
  },
  {
    id: 'databases-python',
    stageNumber: '06',
    title: 'Databases & SQL for Python',
    shortTitle: 'Databases',
    tagline: 'Learn relational database modeling, SQL querying, and Python ORM integration with SQLAlchemy.',
    iconName: 'Database',
    goal: 'Learn how Python applications store and work with real-world data.',
    whyItMatters:
      'Almost every commercial application relies on persistent data storage. Python developers must be adept with raw SQL, relational modeling, and Object-Relational Mappers (ORMs) like SQLAlchemy.',
    learningOutcome: 'Design relational schemas, execute complex SQL queries, and connect Python apps to PostgreSQL using SQLAlchemy.',
    technologies: ['PostgreSQL', 'SQLite', 'SQLAlchemy 2.0', 'Alembic Migrations', 'MongoDB', 'DBeaver'],
    topics: [
      {
        category: 'Relational Database Fundamentals',
        items: [
          'Tables, rows, columns, data types',
          'Primary keys, foreign keys & unique constraints',
          'Table relationships: 1-to-1, 1-to-Many, Many-to-Many',
          'Database normalization (1NF, 2NF, 3NF)',
          'Indexes, performance & database transactions (ACID)',
        ],
      },
      {
        category: 'SQL Querying Mastery',
        items: [
          'SELECT, INSERT, UPDATE, DELETE',
          'Filtering with WHERE, LIKE, IN, BETWEEN',
          'Aggregate functions (COUNT, SUM, AVG, MIN, MAX)',
          'GROUP BY & HAVING clauses',
          'JOIN operations (INNER, LEFT, RIGHT, FULL)',
          'Subqueries & ordering with ORDER BY',
        ],
      },
      {
        category: 'Python Database Integration & ORMs',
        items: [
          'Built-in sqlite3 module for lightweight storage',
          'SQLAlchemy 2.0: Declarative Base, Sessions, Engine',
          'Defining ORM models and relationship mappings',
          'Querying with SQLAlchemy select() and filter()',
          'Database migrations with Alembic (revisions, upgrade, downgrade)',
          'SQL vs NoSQL (MongoDB / PyMongo) trade-offs',
        ],
      },
    ],
    keyConcepts: [
      'ACID Properties of Transactions',
      'SQLAlchemy 2.0 Declarative Models',
      'Database Migrations Lifecycle (Alembic)',
      'Relational Joins & Foreign Keys',
      'Indexing for Fast Query Lookups',
      'Connection Pooling',
    ],
    practiceSuggestions: [
      'Install PostgreSQL and practice writing SQL queries with multi-table JOINs and aggregations.',
      'Define SQLAlchemy models for an e-commerce store with Users, Products, Orders, and OrderItems.',
      'Generate and apply automated database migrations using Alembic.',
    ],
    projectSuggestions: [
      {
        title: 'PostgreSQL-Backed Inventory & Sales Engine',
        description: 'A Python application with SQLAlchemy ORM, relationship mapping, transactions, and analytics queries over PostgreSQL.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Writing raw string-interpolated SQL queries that expose applications to SQL Injection attacks instead of parameterized queries.',
      'Forgetting database indexes on frequently queried foreign key columns.',
    ],
    nextStepPreview: 'Connect your applications to the web in Stage 07: Web Development & REST APIs.',
  },
  {
    id: 'web-apis',
    stageNumber: '07',
    title: 'Web Fundamentals & REST APIs',
    shortTitle: 'Web & APIs',
    tagline: 'Understand how modern web communication works and build robust, secure RESTful API endpoints.',
    iconName: 'Globe',
    goal: 'Learn how Python applications communicate over the web and build APIs.',
    whyItMatters:
      'Backend engineering is all about designing and serving APIs that mobile apps, frontend clients, and other microservices can consume reliably.',
    learningOutcome: 'Design, document, and test clean REST APIs with structured JSON request and response payloads.',
    technologies: ['HTTP / HTTPS', 'REST Architecture', 'JSON', 'Postman', 'Swagger / OpenAPI', 'curl'],
    topics: [
      {
        category: 'Web & HTTP Fundamentals',
        items: [
          'Client vs Server architecture',
          'HTTP & HTTPS protocols and request/response cycle',
          'HTTP methods: GET, POST, PUT, PATCH, DELETE',
          'HTTP status codes (200s, 300s, 400s, 500s)',
          'Request headers, response headers, cookies & sessions',
          'JSON data serialization and deserialization',
        ],
      },
      {
        category: 'REST API Design Principles',
        items: [
          'REST architecture constraints & resource naming conventions',
          'Path parameters (/users/{id}) vs Query parameters (/users?page=1)',
          'Request bodies & validation',
          'CRUD API design patterns',
          'Pagination, filtering & sorting strategies',
          'Authentication vs Authorization concepts',
        ],
      },
      {
        category: 'API Testing & Documentation Tools',
        items: [
          'Testing APIs with Postman & Thunder Client',
          'Interacting with endpoints via curl in terminal',
          'OpenAPI & Swagger interactive documentation',
        ],
      },
    ],
    keyConcepts: [
      'Stateless Request-Response Cycle',
      'REST Resource URI Conventions',
      'HTTP Status Code Semantics',
      'JSON Serialization',
      'Path vs Query Parameters',
      'OpenAPI / Swagger Contracts',
    ],
    practiceSuggestions: [
      'Design the complete REST API specification for a Task Management application with all HTTP methods.',
      'Use Postman to test public third-party APIs (e.g. GitHub API, Weather API) and inspect response headers.',
      'Use curl in your terminal to send GET and POST requests with custom authorization headers.',
    ],
    projectSuggestions: [
      {
        title: 'Curated Bookstore & Review REST API Spec',
        description: 'Complete API design with CRUD operations, search filters, pagination, and documented OpenAPI schema.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Using GET requests for operations that modify server state (like deleting a record).',
      'Returning 200 OK status codes when an error occurred instead of 400 Bad Request or 404 Not Found.',
    ],
    nextStepPreview: 'Build production-grade backend services with modern frameworks in Stage 08: Python Backend Development.',
  },
  {
    id: 'python-backend',
    stageNumber: '08',
    title: 'Python Backend Engineering',
    shortTitle: 'Backend Framework',
    tagline: 'Master modern backend development with FastAPI, Pydantic, dependency injection, and clean architecture.',
    iconName: 'Server',
    goal: 'Learn a Python backend framework and build production-style web applications.',
    whyItMatters:
      'FastAPI is currently the industry standard for high-performance Python backend APIs. It offers blazing speed, automatic data validation with Pydantic, auto-generated Swagger docs, and modern async support.',
    learningOutcome: 'Build, architect, and secure production-grade REST APIs with FastAPI, Pydantic, and PostgreSQL.',
    recommendedApproach:
      'Focus primarily on FastAPI for modern microservices and APIs. Understand where Django (batteries-included full-stack) and Flask (minimal microframework) fit.',
    technologies: ['FastAPI', 'Pydantic v2', 'Uvicorn ASGI', 'JWT (python-jose)', 'SQLAlchemy', 'Django', 'Flask'],
    topics: [
      {
        category: 'FastAPI Core Architecture',
        items: [
          'Project layout & APIRouter modular routing',
          'Path operations, path parameters & query parameters',
          'Pydantic request models, response models & data validation',
          'Dependency Injection system (Depends) for DB sessions and auth',
          'Automatic interactive API docs (/docs with Swagger UI)',
        ],
      },
      {
        category: 'Authentication & Security',
        items: [
          'Password hashing with bcrypt / passlib',
          'JSON Web Tokens (JWT) access token generation & validation',
          'OAuth2 password bearer flow implementation',
          'Protecting endpoints with user authentication middleware',
          'CORS (Cross-Origin Resource Sharing) middleware setup',
        ],
      },
      {
        category: 'Layered Backend Architecture',
        items: [
          'Separation of Concerns: Routes → Services → Repositories → Database',
          'Asynchronous endpoints with async def and await',
          'Global custom exception handlers & HTTPExceptions',
          'Background tasks in FastAPI for email and notifications',
        ],
      },
      {
        category: 'Framework Comparison Overview',
        items: [
          'FastAPI: High-performance modern APIs, async, type-hint driven',
          'Django: Monolithic batteries-included framework with Admin & ORM',
          'Flask: Lightweight and flexible for small applications',
        ],
      },
    ],
    keyConcepts: [
      'Pydantic Schema Validation',
      'Dependency Injection with Depends()',
      'Stateless JWT Authentication Flow',
      'Layered Architecture (Router → Service → Repo)',
      'Async / Await Non-Blocking Concurrency',
      'Middleware Request Interception',
    ],
    practiceSuggestions: [
      'Build a complete User Authentication API with signup, login, password hashing, and JWT token issuance.',
      'Implement an e-commerce Product Catalog API with pagination, category filtering, and Pydantic validation.',
      'Refactor an API to follow the 3-tier architecture (Routers, Services, Repositories).',
    ],
    projectSuggestions: [
      {
        title: 'Production-Ready Task & Project Management API',
        description: 'FastAPI backend with JWT authentication, PostgreSQL database, Pydantic validation, and Swagger documentation.',
        level: 'Backend API',
      },
    ],
    commonMistakes: [
      'Putting database queries and business logic directly inside router functions instead of using service layers.',
      'Storing secrets, database URLs, and JWT keys directly in code instead of environment variables.',
    ],
    nextStepPreview: 'Make your applications rock-solid and deployable in Stage 09: Testing, Deployment & Production.',
  },
  {
    id: 'testing-deployment',
    stageNumber: '09',
    title: 'Testing, Docker & Deployment',
    shortTitle: 'Testing & Deploy',
    tagline: 'Ensure application reliability with automated pytest suites, containerize with Docker, and deploy with CI/CD.',
    iconName: 'ShieldCheck',
    goal: 'Learn how to make Python applications reliable and deploy them for real users.',
    whyItMatters:
      'Code that isn’t tested and deployed is just a prototype. Professional Python developers write automated tests with pytest, package services into Docker containers, and automate deployments with CI/CD.',
    learningOutcome: 'Write unit/integration test suites, containerize Python services with Docker Compose, and deploy to cloud platforms.',
    technologies: ['pytest', 'TestClient', 'Docker', 'Docker Compose', 'GitHub Actions CI/CD', 'Nginx', 'Render / AWS / Fly.io'],
    topics: [
      {
        category: 'Automated Testing with pytest',
        items: [
          'Writing unit tests and assertions with pytest',
          'pytest fixtures (@pytest.fixture) for database setups',
          'Testing FastAPI endpoints with TestClient / httpx',
          'Mocking external dependencies with unittest.mock',
          'Measuring code coverage with pytest-cov',
        ],
      },
      {
        category: 'Containerization with Docker',
        items: [
          'Docker fundamentals: Images, Containers, Registries',
          'Writing a production-ready multi-stage Dockerfile for Python',
          'Docker Compose for multi-container apps (API + PostgreSQL + Redis)',
          'Managing volumes for persistent database storage',
          '.dockerignore best practices',
        ],
      },
      {
        category: 'Production Reliability & CI/CD',
        items: [
          'Structured logging and error tracking (Sentry basics)',
          'Configuring production ASGI servers (Gunicorn + Uvicorn workers)',
          'Reverse proxy setup with Nginx & SSL certificates',
          'GitHub Actions workflow: automated linting & pytest runs on PR',
          'Cloud deployment to Render, Railway, Fly.io, or AWS EC2',
        ],
      },
    ],
    keyConcepts: [
      'Pytest Fixture Dependency Injection',
      'Multi-Stage Docker Optimization',
      'Container Orchestration with Docker Compose',
      'Continuous Integration Testing with GitHub Actions',
      'Reverse Proxying with Nginx',
      'Production Process Management',
    ],
    practiceSuggestions: [
      'Write 15+ automated pytest tests covering user registration, login, and protected routes with a test database fixture.',
      'Containerize your FastAPI application and PostgreSQL database with Docker Compose.',
      'Create a GitHub Actions workflow that runs Ruff linter and pytest on every Git push.',
      'Deploy your containerized API to a live cloud platform like Render or Railway.',
    ],
    projectSuggestions: [
      {
        title: 'Fully Automated & Containerized Microservice',
        description: 'Dockerized Python backend with 90%+ pytest code coverage, GitHub Actions CI/CD pipeline, and live cloud deployment.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Running tests directly against production databases instead of using isolated test database fixtures.',
      'Creating heavy Docker images containing unnecessary build tools instead of using multi-stage slim builds.',
    ],
    nextStepPreview: 'Bring all your skills together into showcase portfolio software in Stage 10: Real-World Python Projects.',
  },
  {
    id: 'real-world-projects',
    stageNumber: '10',
    title: 'Real-World Projects & Job Readiness',
    shortTitle: 'Real Projects',
    tagline: 'Synthesize your Python skills into standout portfolio applications that prove your engineering capability to hiring teams.',
    iconName: 'Rocket',
    goal: 'Turn Python knowledge into a portfolio that demonstrates real development ability.',
    whyItMatters:
      'Hiring managers hire developers who build real, working software. A portfolio with 2-3 deployed, well-tested applications with clean architecture and clear documentation sets you apart from 95% of applicants.',
    learningOutcome: 'A complete developer portfolio with deployed applications, clean GitHub repositories, and interview readiness.',
    technologies: ['Full-Stack Python', 'PostgreSQL', 'Docker', 'Live Cloud URLs', 'Technical READMEs', 'STAR Method'],
    topics: [
      {
        category: 'Portfolio Project Standards',
        items: [
          'Building projects that solve real-world problems (not generic clones)',
          'Modular code architecture with separation of concerns',
          'Comprehensive READMEs with architecture diagrams, demo GIFs & setup guides',
          'Live deployed public URL with working guest credentials',
          'Automated test suites and clean Git commit history',
        ],
      },
      {
        category: 'Interview Preparation for Python Devs',
        items: [
          'Python core trivia: GIL, memory management, decorators, generators',
          'SQL & database interview challenges (JOINs, indexing, ACID)',
          'Live coding problem solving on whiteboard or CoderPad',
          'Explaining architecture choices and trade-offs under pressure',
          'STAR behavioral interview framework for project discussions',
        ],
      },
      {
        category: 'Professional Online Presence',
        items: [
          'Polished GitHub profile with pinned high-impact repositories',
          'Clean 1-page software developer resume focusing on measurable impact',
          'Active LinkedIn developer profile and networking strategy',
        ],
      },
    ],
    keyConcepts: [
      'Problem-Solving Software Architecture',
      'Production-Grade README Documentation',
      'Python Internals & GIL Knowledge',
      'Live Cloud Deployment Proof',
      'STAR Interview Storytelling',
    ],
    practiceSuggestions: [
      'Audit your GitHub repos: ensure every project has a clean README, setup instructions, and live link.',
      'Practice answering top 50 Python interview questions out loud.',
      'Record a 60-second video demo of your flagship project.',
    ],
    projectSuggestions: [
      {
        title: 'Flagship Full-Stack SaaS / Platform Project',
        description: 'Complete production platform with authentication, background processing, PostgreSQL, Docker, and frontend interface.',
        level: 'Production',
      },
    ],
    commonMistakes: [
      'Listing 10 copied tutorial projects that all look identical instead of 2-3 deep, unique applications.',
      'Failing to test your live deployed URL before sending resumes to hiring managers.',
    ],
    nextStepPreview: 'You have the full roadmap. Start coding today, build consistently, and welcome to Python development!',
  },
];

export const PYTHON_PROJECT_PROGRESSION: PythonProjectProgression[] = [
  {
    id: 'py-proj-1',
    stage: 'Stage 02 — Beginner',
    name: 'Python Personal Expense Tracker (CLI)',
    difficulty: 'Beginner',
    recommendedStack: ['Python 3', 'Functions', 'File I/O (JSON/CSV)', 'OOP'],
    skillsLearned: ['Control flow', 'Data structures (dicts/lists)', 'File persistence', 'Input validation', 'Error handling'],
    description: 'A modular console application that records daily expenses, categorizes spending, computes monthly totals, and saves data to JSON/CSV files.',
    features: ['Add, edit, delete, and list expenses', 'Filter spending by category & date range', 'Export monthly spending summaries to CSV'],
    databaseReqs: 'Local JSON/CSV file storage with robust parsing',
    apiReqs: 'N/A (Console Command-Line Interface)',
    testingReqs: 'Manual edge-case testing for negative numbers & invalid dates',
    deploymentRecommendation: 'GitHub repository with detailed usage README',
  },
  {
    id: 'py-proj-2',
    stage: 'Stage 06 — Intermediate',
    name: 'PostgreSQL Inventory & Sales Management System',
    difficulty: 'Intermediate',
    recommendedStack: ['Python', 'PostgreSQL', 'SQLAlchemy 2.0', 'Alembic', 'Tabulate'],
    skillsLearned: ['Relational schema design', 'Foreign keys', 'SQLAlchemy ORM', 'Database migrations', 'Transactions'],
    description: 'A database-backed business management system tracking product inventory, supplier details, customer orders, and low-stock alerts with automated transactions.',
    features: ['Normalized multi-table schema with constraints', 'Automated stock deduction on order creation', 'SQL reporting queries for top-selling products'],
    databaseReqs: 'PostgreSQL with 5+ normalized tables and foreign keys',
    apiReqs: 'N/A (Service Layer Architecture)',
    testingReqs: 'Pytest unit tests verifying inventory calculations',
    deploymentRecommendation: 'Docker Compose setup with local PostgreSQL instance',
  },
  {
    id: 'py-proj-3',
    stage: 'Stage 08 — Backend API',
    name: 'Task & Workspace Management REST API',
    difficulty: 'Backend API',
    recommendedStack: ['FastAPI', 'Pydantic v2', 'PostgreSQL', 'SQLAlchemy', 'JWT (passlib/jose)', 'Swagger UI'],
    skillsLearned: ['REST API design', 'JWT authentication', 'Pydantic validation', 'Layered architecture', 'Dependency injection'],
    description: 'A secure, scalable RESTful API with user authentication, organization workspaces, task assignment, due-date filtering, and role-based permissions.',
    features: ['JWT access token auth with password hashing', 'CRUD operations with Pydantic request/response schemas', 'Interactive Swagger documentation at /docs'],
    databaseReqs: 'PostgreSQL with Alembic version-controlled migrations',
    apiReqs: '12+ REST endpoints with proper HTTP status codes',
    testingReqs: '80%+ pytest test coverage using TestClient and SQLite/Postgres test fixtures',
    deploymentRecommendation: 'Live deployment on Render / Railway with cloud PostgreSQL',
  },
  {
    id: 'py-proj-4',
    stage: 'Stage 09 — Advanced',
    name: 'Containerized Background Worker & Webhook Notification Engine',
    difficulty: 'Advanced',
    recommendedStack: ['FastAPI', 'Redis', 'Celery / RQ', 'Docker', 'Docker Compose', 'GitHub Actions'],
    skillsLearned: ['Asynchronous background tasks', 'In-memory caching', 'Docker multi-stage builds', 'CI/CD automated testing'],
    description: 'A high-throughput API that ingests webhook events, queues asynchronous background email/Slack notifications via Redis, and provides delivery metrics.',
    features: ['Asynchronous task processing with worker queue', 'Redis caching for rate limiting and deduplication', 'GitHub Actions running automated linting and tests'],
    databaseReqs: 'PostgreSQL for logs + Redis for queue and caching',
    apiReqs: 'REST endpoints for webhook ingestion and status monitoring',
    testingReqs: 'Unit and integration tests with mocked Redis/Email services',
    deploymentRecommendation: 'Multi-container Docker Compose deployed to cloud server',
  },
  {
    id: 'py-proj-5',
    stage: 'Stage 10 — Portfolio Level',
    name: 'Production-Grade SaaS / Real-World Workflow Application',
    difficulty: 'Portfolio-Level',
    recommendedStack: ['FastAPI / Django', 'React / Next.js', 'PostgreSQL', 'Docker', 'AWS / Render', 'Tailwind CSS'],
    skillsLearned: ['Full-stack system architecture', 'Production security', 'Role-based access control', 'Cloud deployment', 'End-to-end UX'],
    description: 'A flagship full-stack application (e.g. Job Application Tracker, College Management Platform, or Finance Dashboard) solving a real problem with great polish.',
    features: ['Complete user lifecycle & authenticated workspaces', 'Interactive dashboard with analytics charts and filtering', 'Responsive modern UI with zero console errors', 'Live public URL with pre-populated guest demo account'],
    databaseReqs: 'Normalized cloud PostgreSQL with indexes & backups',
    apiReqs: 'Comprehensive REST API with Swagger documentation',
    testingReqs: 'Extensive pytest suite + frontend integration testing',
    deploymentRecommendation: 'Live cloud production deployment with automated CI/CD pipeline',
  },
];

export const PYTHON_SPECIALIZATIONS: PythonSpecialization[] = [
  {
    title: 'Backend & Web Engineering',
    description: 'Build robust web APIs, scalable microservices, authentication systems, and cloud-connected backends.',
    coreTech: ['FastAPI', 'Django', 'Flask', 'PostgreSQL', 'Redis', 'Docker'],
    focus: 'APIs, Business Logic, System Performance, Databases',
    icon: 'Server',
  },
  {
    title: 'Data Analysis & Science',
    description: 'Analyze large datasets, generate insights, build visual dashboards, and conduct statistical experiments.',
    coreTech: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SQL', 'Jupyter'],
    focus: 'Data Cleaning, Statistics, Insights, Visualization',
    icon: 'LineChart',
  },
  {
    title: 'AI & Machine Learning',
    description: 'Train machine learning models, neural networks, computer vision, natural language processing, and LLM apps.',
    coreTech: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Hugging Face', 'LangChain'],
    focus: 'Model Training, Deep Learning, Inference, Vector DBs',
    icon: 'Brain',
  },
  {
    title: 'Automation & Scripting',
    description: 'Automate repetitive workflows, scrape web data, process files, and interact with third-party web services.',
    coreTech: ['Playwright', 'BeautifulSoup', 'Selenium', 'Requests', 'CRON / Celery'],
    focus: 'Web Scraping, Workflow Automation, Task Scheduling',
    icon: 'Bot',
  },
  {
    title: 'Data Engineering',
    description: 'Architect scalable data pipelines, ETL workflows, data warehouses, and streaming infrastructure.',
    coreTech: ['Apache Spark', 'Airflow', 'Kafka', 'SQL', 'Snowflake / BigQuery'],
    focus: 'ETL Pipelines, Data Lakes, Streaming Data, Batch Jobs',
    icon: 'Database',
  },
  {
    title: 'DevOps & Cloud Automation',
    description: 'Automate cloud infrastructure, manage container fleets, and write custom deployment orchestration scripts.',
    coreTech: ['Docker', 'Kubernetes', 'Ansible', 'Terraform', 'AWS Boto3', 'Bash'],
    focus: 'CI/CD, Cloud APIs, Infrastructure as Code, Linux',
    icon: 'Cloud',
  },
];

export const TECH_STACK_CATEGORIES: TechStackCategory[] = [
  {
    category: 'LANGUAGE & RUNTIME',
    items: ['Python 3.12+', 'CPython', 'PyPy', 'Type Hints'],
  },
  {
    category: 'BACKEND FRAMEWORKS',
    items: ['FastAPI', 'Django', 'Flask', 'Uvicorn / Gunicorn'],
  },
  {
    category: 'DATABASES & CACHING',
    items: ['PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'MongoDB'],
  },
  {
    category: 'ORMS & MIGRATIONS',
    items: ['SQLAlchemy 2.0', 'Alembic', 'Django ORM', 'Pydantic v2'],
  },
  {
    category: 'TESTING & QUALITY',
    items: ['pytest', 'pytest-cov', 'unittest.mock', 'Ruff', 'Black', 'isort'],
  },
  {
    category: 'DEV TOOLS & PACKAGING',
    items: ['Git & GitHub', 'VS Code', 'Linux / Bash', 'Postman', 'Poetry', 'uv'],
  },
  {
    category: 'DEPLOYMENT & CLOUD',
    items: ['Docker', 'Docker Compose', 'GitHub Actions', 'Nginx', 'Render', 'AWS'],
  },
];

export const PYTHON_COMMON_MISTAKES = [
  {
    title: 'Learning Syntax Without Building Projects',
    solution: 'Build small programs immediately after learning a concept instead of staying stuck in tutorial loops.',
  },
  {
    title: 'Trying to Learn Every Python Library',
    solution: 'Master core Python, one backend framework (FastAPI/Django), and SQL first before branching into everything.',
  },
  {
    title: 'Copying Tutorial Code Mindlessly',
    solution: 'Close the video, write the code from scratch, deliberately break it, and debug the errors yourself.',
  },
  {
    title: 'Ignoring Git & Version Control',
    solution: 'Use Git from day 1 for every small project and write atomic, meaningful commit messages.',
  },
  {
    title: 'Neglecting SQL & Database Design',
    solution: 'Learn relational database modeling and write raw SQL before relying solely on high-level ORMs.',
  },
  {
    title: 'Avoiding Automated Testing',
    solution: 'Write unit tests with pytest early. It teaches you how to structure modular and testable code.',
  },
  {
    title: 'Learning Frameworks Before Python Fundamentals',
    solution: 'Ensure you understand classes, functions, decorators, and exceptions before jumping into FastAPI or Django.',
  },
  {
    title: 'Trying to Learn FastAPI, Django, & Flask Simultaneously',
    solution: 'Pick ONE primary framework (e.g. FastAPI), master it thoroughly, and build 2-3 deep applications.',
  },
  {
    title: 'Building Projects Without README Documentation',
    solution: 'Always write a thorough technical README with architecture overview, setup steps, and demo screenshots.',
  },
];

export const PYTHON_FOUR_PILLARS = [
  {
    title: 'Python Core Mastery',
    subtitle: 'Deep understanding of OOP, data structures, generators, decorators, and clean Pythonic code.',
    icon: 'Code2',
  },
  {
    title: 'Problem Solving & CS',
    subtitle: 'Algorithmic thinking, data structures, time & space complexity, and clean logic.',
    icon: 'Brain',
  },
  {
    title: 'Backend & System Skills',
    subtitle: 'REST APIs, databases, SQL, authentication, testing, Docker, and clean architecture.',
    icon: 'Server',
  },
  {
    title: 'Real-World Projects',
    subtitle: 'Deployed, tested, documented applications that demonstrate real engineering problem-solving.',
    icon: 'FolderGit2',
  },
];

export const PYTHON_DEV_WORKFLOW = [
  { step: '1', title: 'IDE & Venv', desc: 'Activate .venv & configure VS Code with Ruff linter' },
  { step: '2', title: 'Git Branch', desc: 'git checkout -b feature/auth-endpoints' },
  { step: '3', title: 'Write Code', desc: 'Implement modular Pydantic models, routes, & services' },
  { step: '4', title: 'Run Pytest', desc: 'pytest tests/ -v (ensure all tests pass locally)' },
  { step: '5', title: 'Git Commit', desc: 'git commit -m "feat(auth): add JWT login endpoint"' },
  { step: '6', title: 'Push & PR', desc: 'Push to GitHub and open Pull Request with test details' },
  { step: '7', title: 'Code Review', desc: 'Address feedback, format with Ruff, and refine code' },
  { step: '8', title: 'CI Pipeline', desc: 'GitHub Actions automatically runs linter & test suite' },
  { step: '9', title: 'Deploy', desc: 'Merge to main and trigger automated cloud deployment' },
];
