export interface RoadmapStage {
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
  codeSnippet?: {
    language: string;
    title: string;
    code: string;
  };
  workflowSteps?: string[];
}

export interface ProjectProgressionItem {
  id: string;
  stage: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Full Stack' | 'Advanced' | 'Portfolio-Level';
  recommendedStack: string[];
  skillsLearned: string[];
  description: string;
  mustInclude: string[];
}

export const ROADMAP_STAGES: RoadmapStage[] = [
  {
    id: 'foundation',
    stageNumber: '01',
    title: 'Computer & Internet Foundations',
    shortTitle: 'Foundations',
    tagline: 'Understand how computers, operating systems, and the internet work before writing complex code.',
    iconName: 'Cpu',
    goal: 'Understand how computers, software, and the internet work before becoming deeply focused on coding.',
    whyItMatters:
      'Writing effective code requires knowing how the underlying hardware and network protocols execute it. Without computer fundamentals, diagnosing bugs, memory issues, latency, and networking errors becomes guesswork.',
    learningOutcome: 'After this stage, you should understand what happens underneath the software you write.',
    technologies: ['Terminal / Bash', 'Git', 'Linux / POSIX', 'DNS', 'HTTP / HTTPS'],
    topics: [
      {
        category: 'Computer Hardware & Execution',
        items: ['How computers work', 'CPU architecture & clock cycles', 'RAM & memory hierarchy', 'Persistent storage (SSD vs HDD)', 'Von Neumann architecture'],
      },
      {
        category: 'Operating Systems Basics',
        items: ['Operating systems role', 'Files & file systems', 'Processes vs threads', 'Input/Output (I/O) basics', 'Memory allocation fundamentals'],
      },
      {
        category: 'Internet & Web Protocols',
        items: ['Client vs Server model', 'HTTP & HTTPS fundamentals', 'Domain names & DNS resolution', 'IP addresses & routing basics', 'Basic networking (TCP/IP model)'],
      },
      {
        category: 'Developer Environment Foundations',
        items: ['Command line basics (cd, ls, grep, curl)', 'File permissions & environment variables', 'Git version control fundamentals (init, commit, push)'],
      },
    ],
    keyConcepts: [
      'Client-Server Architecture',
      'DNS Lookup Lifecycle',
      'Process vs Thread',
      'Stateless HTTP Protocol',
      'Virtual Memory & RAM',
      'Command Line Piping',
    ],
    practiceSuggestions: [
      'Open your terminal and navigate directories, search files using grep, and inspect environment variables.',
      'Use curl or your browser DevTools to inspect HTTP headers, status codes, and request payloads for top websites.',
      'Initialize a local Git repository, track changes, make commits, and push to GitHub using the CLI.',
    ],
    projectSuggestions: [
      {
        title: 'CLI System Info Inspector',
        description: 'A shell script or small utility that prints CPU usage, active network interfaces, and disk storage stats.',
        level: 'Beginner',
      },
      {
        title: 'Local HTTP Request Tracer',
        description: 'Use curl & dig to trace the DNS resolution and HTTP response time for various domain names.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Jumping into React or complex frameworks before understanding what an HTTP request or JSON payload is.',
      'Relying solely on GUI Git tools without understanding basic Git commands and branching models.',
    ],
    nextStepPreview: 'Now that you understand the underlying runtime, pick your primary programming language in Stage 02.',
  },
  {
    id: 'programming-fundamentals',
    stageNumber: '02',
    title: 'Programming Fundamentals',
    shortTitle: 'Programming',
    tagline: 'Learn one programming language deeply enough to solve algorithmic and real-world problems independently.',
    iconName: 'Code2',
    goal: 'Learn one programming language deeply enough to solve problems independently.',
    whyItMatters:
      'Syntax is easy, but algorithmic thinking, structuring control flow, error handling, and debugging take deliberate practice. Mastering one language gives you a solid anchor for all future technologies.',
    learningOutcome: 'Ability to translate algorithmic ideas and business requirements into clean, bug-free, and modular code.',
    recommendedApproach:
      'Choose ONE primary language for DSA and interviews (Python, Java, or C++) instead of trying to learn multiple languages simultaneously.',
    technologies: ['Python', 'Java', 'C++', 'VS Code', 'Debugger Tools'],
    topics: [
      {
        category: 'Language Core Syntax',
        items: ['Variables & primitives', 'Data types & type casting', 'Arithmetic & logical operators', 'Conditions (if/else, switch)', 'Loops (for, while, range)'],
      },
      {
        category: 'Functions & Execution Scope',
        items: ['Function signatures & parameters', 'Return values & recursion basics', 'Variable scope & closures', 'Pass by value vs reference'],
      },
      {
        category: 'Data Collections & Strings',
        items: ['Lists / Arrays', 'Dictionaries / Hash Maps', 'Tuples & Sets', 'String manipulation & regex', 'Array slicing & transformations'],
      },
      {
        category: 'Error Handling & Reliability',
        items: ['Exception handling (try/catch/finally)', 'File I/O operations (read/write)', 'Modules & package management', 'Step-by-step debugger usage', 'Writing clean code & PEP8/Google Style'],
      },
    ],
    keyConcepts: [
      'Pass by Value vs Reference',
      'Stack vs Heap Memory',
      'Pure Functions',
      'Exception Propagation',
      'Immutable vs Mutable Types',
      'Clean Code Principles',
    ],
    practiceSuggestions: [
      'Solve 50+ basic logic problems: palindrome checkers, matrix rotations, prime number generators, and Fibonacci memoization.',
      'Practice building command-line utilities without relying on external packages or AI auto-completers.',
      'Learn to use a debugger with breakpoints and variable watches instead of solely relying on print statements.',
    ],
    projectSuggestions: [
      {
        title: 'Interactive CLI Task Manager',
        description: 'A terminal task manager with JSON file persistence, priority queues, and deadline search filtering.',
        level: 'Beginner',
      },
      {
        title: 'Expense & Budget Tracker',
        description: 'A modular console application that categorizes spending, parses CSV logs, and outputs spending analytics.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Language hopping: spending two weeks in Python, switching to Java, then jumping to Go before mastering any.',
      'Neglecting proper error handling and edge-case testing (e.g., null inputs, empty lists, division by zero).',
    ],
    nextStepPreview: 'With programming fundamentals secured, dive into Data Structures & Algorithms in Stage 03.',
  },
  {
    id: 'dsa',
    stageNumber: '03',
    title: 'Data Structures & Algorithms',
    shortTitle: 'DSA',
    tagline: 'Develop strong problem-solving skills and learn how to choose optimal time & space solutions.',
    iconName: 'Binary',
    goal: 'Develop strong problem-solving skills and learn how to choose efficient solutions.',
    whyItMatters:
      'DSA is the foundation of high-performance software and technical interviews. It teaches you how to think in terms of asymptotic complexity and scale from thousands to millions of operations efficiently.',
    learningOutcome: 'Understand algorithmic patterns → solve problems → analyze complexity → optimize solutions.',
    recommendedApproach:
      'Focus on internalizing fundamental algorithmic patterns (Two Pointers, Sliding Window, BFS/DFS, Top-K) rather than rote memorization.',
    technologies: ['LeetCode', 'HackerRank', 'Codeforces', 'NeetCode 150', 'Big-O Analysis'],
    topics: [
      {
        category: 'Complexity Analysis',
        items: ['Time complexity analysis', 'Space complexity analysis', 'Big-O, Big-Theta, Big-Omega notation', 'Amortized time complexity'],
      },
      {
        category: 'Linear Data Structures',
        items: ['Dynamic Arrays & Strings', 'Singly & Doubly Linked Lists', 'Stacks (LIFO) & Queues (FIFO)', 'Hash Tables & Hash Sets (Collisions)'],
      },
      {
        category: 'Non-Linear Data Structures',
        items: ['Binary Trees & Traversals', 'Binary Search Trees (BST)', 'Heaps & Priority Queues', 'Graphs (Adjacency List/Matrix, DAG)'],
      },
      {
        category: 'Algorithmic Paradigms',
        items: ['Two Pointers & Sliding Window', 'Binary Search & Monotonic Conditions', 'Recursion & Backtracking', 'Breadth-First Search (BFS) & Depth-First Search (DFS)', 'Greedy Algorithms', 'Dynamic Programming (1D & 2D memoization/tabulation)'],
      },
    ],
    keyConcepts: [
      'Big-O Asymptotic Notation',
      'Hash Table Collision Resolution',
      'Tree & Graph Traversal (DFS/BFS)',
      'Divide and Conquer',
      'Optimal Substructure in DP',
      'Topological Sort',
    ],
    practiceSuggestions: [
      'Solve 150-200 curated problems across all major patterns (e.g., NeetCode 150 or Blind 75).',
      'Always state your Time and Space complexity before writing code.',
      'Conduct dry runs on paper with edge cases (empty arrays, duplicate values, extreme bounds) before submitting.',
    ],
    projectSuggestions: [
      {
        title: 'Custom In-Memory Cache (LRU/LFU)',
        description: 'Implement a Least Recently Used (LRU) Cache from scratch using a Doubly Linked List and Hash Map with O(1) ops.',
        level: 'Intermediate',
      },
      {
        title: 'Graph Maze Solver & Visualizer',
        description: 'A console or web graph pathfinding tool demonstrating Dijkstra and A* algorithms across randomized 2D grids.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Memorizing LeetCode solutions instead of identifying the underlying algorithmic pattern.',
      'Ignoring space complexity or the cost of recursive call stacks in memory.',
    ],
    nextStepPreview: 'Now learn how real-world applications store and query persistent data in Stage 04: Databases & SQL.',
  },
  {
    id: 'databases-sql',
    stageNumber: '04',
    title: 'Databases & SQL',
    shortTitle: 'Databases',
    tagline: 'Learn how real applications model, store, query, index, and manage data at scale.',
    iconName: 'Database',
    goal: 'Learn how real applications store, query, and manage data.',
    whyItMatters:
      'Data is the core asset of every production system. Knowing relational modeling, indexing strategies, transactions, and SQL query optimization distinguishes amateur coders from professional software engineers.',
    learningOutcome: 'Ability to design normalized database schemas, write complex analytical SQL queries, and optimize query bottlenecks.',
    technologies: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis', 'DBeaver / pgAdmin'],
    topics: [
      {
        category: 'Relational Database Fundamentals',
        items: ['Tables, rows, columns & data types', 'Primary keys, foreign keys & unique constraints', 'Database normalization (1NF, 2NF, 3NF)', 'Entity Relationship Diagrams (ERD)'],
      },
      {
        category: 'SQL Querying Mastery',
        items: ['SELECT, INSERT, UPDATE, DELETE', 'Filtering with WHERE, LIKE, IN, BETWEEN', 'Aggregate functions (COUNT, SUM, AVG, MIN, MAX)', 'GROUP BY & HAVING clauses', 'ORDER BY, LIMIT, OFFSET pagination'],
      },
      {
        category: 'Advanced Joins & Queries',
        items: ['INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN', 'Self Joins & Cross Joins', 'Subqueries (Correlated & Scalar)', 'Common Table Expressions (CTEs & WITH)', 'Window functions (ROW_NUMBER, RANK, OVER)'],
      },
      {
        category: 'Performance & Integrity',
        items: ['B-Tree Indexing & Composite Indexes', 'EXPLAIN ANALYZE & Query execution plans', 'ACID properties (Atomicity, Consistency, Isolation, Durability)', 'Transactions & Locking mechanisms', 'SQL vs NoSQL (MongoDB/Document stores tradeoffs)'],
      },
    ],
    keyConcepts: [
      'ACID Compliance',
      'Database Normalization vs Denormalization',
      'B-Tree Index Lookup Mechanics',
      'Relational Joins & Set Theory',
      'Transaction Isolation Levels',
      'CAP Theorem in Distributed Data',
    ],
    practiceSuggestions: [
      'Install PostgreSQL locally or run via Docker, then load a realistic e-commerce or university schema.',
      'Practice writing multi-table JOINs, subqueries, and window functions to compute metrics like monthly customer cohort retention.',
      'Benchmark slow queries without indexes vs indexed queries using EXPLAIN ANALYZE.',
    ],
    projectSuggestions: [
      {
        title: 'E-Commerce Database Schema & Analytics',
        description: 'Design a normalized 8-table database with orders, inventory, customers, and payments, with 20 complex SQL reporting queries.',
        level: 'Intermediate',
      },
      {
        title: 'Fast Key-Value Session Store with Redis',
        description: 'A caching layer integration testing read-through caching patterns against a relational database.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Putting every column into a single unnormalized table or prematurely denormalizing without indexing.',
      'Using SELECT * in production queries instead of projecting only required columns.',
    ],
    nextStepPreview: 'In Stage 05, discover how to architect maintainable code with Object-Oriented Programming & Clean Software Design.',
  },
  {
    id: 'oop-design',
    stageNumber: '05',
    title: 'OOP & Software Design',
    shortTitle: 'OOP & Design',
    tagline: 'Learn how to structure large, complex software systems using clean, maintainable, and modular code.',
    iconName: 'Layers',
    goal: 'Learn how to structure large software systems using clean and maintainable code.',
    whyItMatters:
      'Software is read and maintained far more often than it is written. Clean architecture and design patterns prevent codebases from decaying into unmaintainable spaghetti code as teams and features grow.',
    learningOutcome: 'Understand how to write modular, testable, decoupled, and extensible software using SOLID design principles.',
    technologies: ['Design Patterns', 'UML Diagrams', 'Refactoring Tools', 'Clean Architecture', 'Linter & Formatter Rules'],
    topics: [
      {
        category: 'Core OOP Pillars',
        items: ['Classes & Objects (State & Behavior)', 'Encapsulation & Access Modifiers', 'Inheritance & Code Reuse', 'Polymorphism (Runtime vs Compile-time)', 'Abstraction & Interfaces'],
      },
      {
        category: 'SOLID Principles',
        items: ['Single Responsibility Principle (SRP)', 'Open/Closed Principle (OCP)', 'Liskov Substitution Principle (LSP)', 'Interface Segregation Principle (ISP)', 'Dependency Inversion Principle (DIP)'],
      },
      {
        category: 'Essential Design Patterns',
        items: ['Creational: Factory Method, Singleton, Builder', 'Structural: Adapter, Decorator, Facade', 'Behavioral: Observer, Strategy, Command', 'Dependency Injection & Inversion of Control (IoC)'],
      },
      {
        category: 'Clean Code & Architecture',
        items: ['Separation of Concerns', 'DRY (Don’t Repeat Yourself) & KISS principles', 'Composition over Inheritance', 'Modular domain modeling'],
      },
    ],
    keyConcepts: [
      'Composition over Inheritance',
      'Dependency Inversion',
      'Encapsulation & Information Hiding',
      'Strategy Pattern for Pluggable Logic',
      'Decoupled Service Layers',
      'Testable Architecture',
    ],
    practiceSuggestions: [
      'Refactor a monolithic 500-line script into clean classes with single responsibilities and dependency injection.',
      'Implement the Strategy Pattern to support multiple payment processors (Stripe, PayPal, Crypto) without modifying client code.',
      'Review open-source libraries in your primary language to see how professional teams structure classes and interfaces.',
    ],
    projectSuggestions: [
      {
        title: 'Pluggable Notification Dispatcher',
        description: 'An extensible notification engine using the Observer & Strategy patterns supporting Email, SMS, Slack, and Discord.',
        level: 'Intermediate',
      },
      {
        title: 'Ride-Hailing Fare & Matching Engine',
        description: 'An object-oriented simulation using Factory & State patterns to calculate dynamic pricing and driver dispatching.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Creating deep inheritance hierarchies (e.g. 5+ levels) when simple object composition would be far cleaner.',
      'Applying design patterns where a simple 5-line helper function would suffice (over-engineering).',
    ],
    nextStepPreview: 'Take your architecture skills to the web in Stage 06: Full-Stack Web Development & APIs.',
  },
  {
    id: 'web-development',
    stageNumber: '06',
    title: 'Full-Stack Web Development',
    shortTitle: 'Web Development',
    tagline: 'Understand how modern web applications communicate and build end-to-end full-stack systems.',
    iconName: 'Globe',
    goal: 'Understand how modern software applications communicate and how full-stack applications are built.',
    whyItMatters:
      'Most software is delivered across the web. Knowing how frontends render UI, how backend servers process requests, how APIs serialize JSON, and how authentication works connects code to user value.',
    learningOutcome: 'Ability to build, test, and integrate secure RESTful APIs with database storage and modern web client interfaces.',
    recommendedApproach:
      'Choose one backend stack: Python (FastAPI/Django), Java (Spring Boot), or TypeScript (Node.js/Express) and connect it to a database and frontend.',
    technologies: ['HTML5 & CSS3', 'JavaScript / TypeScript', 'React / Next.js', 'FastAPI / Django', 'Node.js / Express', 'Spring Boot', 'REST APIs', 'JWT & OAuth'],
    topics: [
      {
        category: 'Frontend Foundations',
        items: ['Semantic HTML & responsive CSS', 'JavaScript ES6+ & TypeScript fundamentals', 'DOM manipulation & browser rendering cycle', 'React component architecture, props & state management', 'Fetch API & asynchronous async/await'],
      },
      {
        category: 'Backend & RESTful API Engineering',
        items: ['REST API design conventions & HTTP status codes', 'Request routing, middleware & controllers', 'Request validation & serialization (JSON)', 'CRUD operations with database ORMs (SQLAlchemy, Prisma, Hibernate)', 'File uploads & multipart forms'],
      },
      {
        category: 'Authentication & Security',
        items: ['Session cookies vs Stateless JWT (JSON Web Tokens)', 'Password hashing with bcrypt / Argon2', 'Role-Based Access Control (RBAC)', 'CORS, CSRF, XSS prevention & security headers'],
      },
      {
        category: 'Full-Stack Integration',
        items: ['Connecting React/Next.js client to backend APIs', 'Handling loading, error & empty states gracefully', 'Client-side vs Server-side rendering (SSR/SSG)'],
      },
    ],
    keyConcepts: [
      'Stateless REST Architecture',
      'JWT Authentication Lifecycle',
      'CORS (Cross-Origin Resource Sharing)',
      'Database ORM vs Raw Queries',
      'State Management & Re-rendering',
      'Asynchronous Event Loop',
    ],
    practiceSuggestions: [
      'Build a complete REST API with at least 5 CRUD endpoints, input validation, and JWT protected routes.',
      'Create a React interface that consumes the API, handles authentication tokens, and manages dynamic state.',
      'Write API tests using Postman or automated test suites checking status codes and response bodies.',
    ],
    projectSuggestions: [
      {
        title: 'Full-Stack Collaborative Issue Tracker',
        description: 'A complete Kanban/Jira clone with user authentication, project workspaces, drag-and-drop ticket boards, and comments.',
        level: 'Full Stack',
      },
      {
        title: 'Developer Blog & Documentation Platform',
        description: 'Markdown-powered blogging engine with authentication, tag search, view analytics, and REST API endpoints.',
        level: 'Full Stack',
      },
    ],
    commonMistakes: [
      'Storing unhashed plain-text passwords in databases instead of using secure hashing algorithms like bcrypt.',
      'Putting sensitive API keys or database secrets directly into frontend client code.',
    ],
    nextStepPreview: 'Deepen your foundational engineering depth in Stage 07: Advanced Computer Science & Systems.',
  },
  {
    id: 'advanced-cs',
    stageNumber: '07',
    title: 'Advanced Computer Science & Systems',
    shortTitle: 'Computer Science',
    tagline: 'Understand the core systems engineering concepts behind high-performance, resilient, and scalable software.',
    iconName: 'Server',
    goal: 'Understand the engineering concepts behind high-performance and scalable software.',
    whyItMatters:
      'Senior engineers do not just write code—they understand thread safety, network latency, cache invalidation, and distributed architecture trade-offs that keep high-traffic systems alive under heavy load.',
    learningOutcome: 'Ability to evaluate scalability bottlenecks, concurrency pitfalls, network latency, and high-level system designs.',
    technologies: ['Linux Internals', 'TCP / IP', 'WebSockets', 'Redis Caching', 'Nginx Load Balancer', 'RabbitMQ / Kafka', 'System Design'],
    topics: [
      {
        category: 'Operating Systems Internals',
        items: ['Process scheduling & context switching', 'Multithreading, concurrency & race conditions', 'Deadlocks, mutexes & semaphores', 'Virtual memory, paging & page faults', 'I/O multiplexing & non-blocking sockets'],
      },
      {
        category: 'Computer Networks & Real-Time Comms',
        items: ['TCP 3-way handshake & flow control', 'UDP vs TCP trade-offs', 'TLS/SSL encryption & certificate authorities', 'WebSockets & real-time bidirectional messaging', 'Network latency & bandwidth constraints'],
      },
      {
        category: 'System Design & Scalability Principles',
        items: ['Horizontal vs Vertical scaling', 'Load balancers (Reverse proxies, Nginx, round-robin)', 'In-memory caching strategies (Redis, Cache-aside, Write-through)', 'Database replication & read replicas vs sharding', 'Message brokers & asynchronous queues (RabbitMQ, Kafka)'],
      },
      {
        category: 'Distributed Systems Foundations',
        items: ['Monolithic vs Microservices architecture', 'CAP Theorem (Consistency, Availability, Partition tolerance)', 'Eventual consistency vs Strong consistency', 'Rate limiting & Circuit breakers'],
      },
    ],
    keyConcepts: [
      'Race Conditions & Mutex Locks',
      'TCP Handshake & Packet Loss',
      'Cache Invalidation Strategies',
      'Load Balancer Reverse Proxying',
      'CAP Theorem Trade-Offs',
      'Asynchronous Message Queues',
    ],
    practiceSuggestions: [
      'Write a multi-threaded program demonstrating a race condition, and then fix it using a mutex lock or thread-safe atomic primitive.',
      'Set up Nginx as a reverse proxy load balancer distributing traffic across two local backend server instances.',
      'Sketch high-level system architecture diagrams for popular services (e.g., URL Shortener, Pastebin, Twitter Feed).',
    ],
    projectSuggestions: [
      {
        title: 'Scalable URL Shortener with Analytics & Redis',
        description: 'High-throughput URL shortener with Base62 encoding, Redis caching, click analytics, and rate-limiting middleware.',
        level: 'Advanced',
      },
      {
        title: 'Real-Time Chat & Notification Server',
        description: 'Multi-room WebSocket chat server with connection pooling, message persistence, and Redis pub/sub broadcasting.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Throwing microservices at small projects when a clean modular monolith is simpler, faster, and easier to maintain.',
      'Neglecting caching and database query optimization before prematurely scaling hardware.',
    ],
    nextStepPreview: 'Master the professional engineering tooling and DevOps workflow in Stage 08.',
  },
  {
    id: 'developer-tools',
    stageNumber: '08',
    title: 'Developer Tools & Professional Workflows',
    shortTitle: 'Developer Tools',
    tagline: 'Master the professional tooling, automated testing, containerization, and CI/CD workflows used by top engineering teams.',
    iconName: 'Wrench',
    goal: 'Learn the tools and practices used by professional development teams.',
    whyItMatters:
      'Coding is only half the job. Professional engineers collaborate through Git branching, automated unit/integration testing, Docker containers, pull request reviews, and automated CI/CD pipelines.',
    learningOutcome: 'Comfort collaborating on real teams, writing automated tests, containerizing services, and deploying via automated CI/CD pipelines.',
    technologies: ['Git & GitHub', 'Docker & Docker Compose', 'GitHub Actions / CI/CD', 'Jest / PyTest / JUnit', 'Postman', 'Linux / Bash', 'VS Code'],
    topics: [
      {
        category: 'Advanced Git Collaboration',
        items: ['Feature branching & Git Flow', 'Rebase vs Merge & interactive rebasing', 'Resolving merge conflicts cleanly', 'Pull requests, drafting clear descriptions & code reviews', 'Git stash, cherry-pick & revert'],
      },
      {
        category: 'Automated Testing & Quality',
        items: ['Unit testing fundamentals (PyTest, Jest, JUnit)', 'Integration testing & database fixtures', 'Test-Driven Development (TDD) concepts', 'Mocking external dependencies & API calls', 'Code coverage metrics'],
      },
      {
        category: 'Containerization & Environments',
        items: ['Docker fundamentals (Dockerfile, Images, Containers)', 'Multi-stage Docker builds for minimal footprints', 'Docker Compose for multi-container apps (App + DB + Redis)', 'Environment variables & secrets management (.env, .gitignore)'],
      },
      {
        category: 'CI/CD & Cloud Deployment',
        items: ['CI/CD concepts (Continuous Integration & Continuous Deployment)', 'GitHub Actions workflows for automated test runs', 'Linting & static code analysis in pipelines', 'Cloud hosting deployment (Vercel, Render, AWS, Railway)'],
      },
    ],
    keyConcepts: [
      'Git Feature Branching Workflow',
      'Containerization vs Virtual Machines',
      'Unit vs Integration Testing',
      'Automated CI/CD Test Pipelines',
      'Multi-Stage Docker Builds',
      'Code Review Best Practices',
    ],
    practiceSuggestions: [
      'Write a Dockerfile and docker-compose.yml file that starts your backend API and a PostgreSQL database with a single command.',
      'Write automated unit tests covering happy paths and edge cases for your core business logic.',
      'Set up a GitHub Actions workflow that automatically runs tests and linter checks on every pull request.',
    ],
    projectSuggestions: [
      {
        title: 'Containerized Micro-Service with CI/CD',
        description: 'A Dockerized REST service with GitHub Actions running automated linting, test suites, and automated deployment.',
        level: 'Advanced',
      },
      {
        title: 'Automated API Health & Latency Monitor',
        description: 'A scheduled background worker that pings endpoints, logs response times, and sends Discord/Slack alerts on downtime.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Pushing directly to the main branch without code review, branch protection, or automated testing.',
      'Committing secrets, API keys, or .env files directly into public Git repositories.',
    ],
    nextStepPreview: 'Synthesize your skills into standout, portfolio-grade projects in Stage 09.',
  },
  {
    id: 'projects',
    stageNumber: '09',
    title: 'Projects & Real-World Development',
    shortTitle: 'Projects',
    tagline: 'Convert everything you learned into real, deployed software that proves your engineering capabilities to recruiters.',
    iconName: 'FolderGit2',
    goal: 'Convert everything you learned into real software that demonstrates your engineering ability.',
    whyItMatters:
      'Recruiters and hiring managers judge candidates by what they have built. A portfolio of 2-3 deep, deployed, well-architected applications with clean READMEs stands out far above generic tutorial clones.',
    learningOutcome: 'A compelling portfolio with deployed, robust software demonstrating full-stack engineering, clean code, and real utility.',
    recommendedApproach:
      'Do not build 20 copied tutorial projects. Build fewer projects that demonstrate real engineering skills and solve genuine user problems.',
    technologies: ['Vercel / Railway / Render', 'AWS / Cloudflare', 'PostgreSQL', 'Docker', 'Swagger / OpenAPI', 'README & Architecture Docs'],
    topics: [
      {
        category: 'Project Progression Strategy',
        items: ['Project 1: Command-line logic tool (CLI / Algorithm)', 'Project 2: Database-driven management application', 'Project 3: Full-stack application with Auth & REST API', 'Project 4: Advanced application with background workers & caching', 'Project 5: Production portfolio-grade software solving a real problem'],
      },
      {
        category: 'Engineering Standards for Projects',
        items: ['Clean architectural folder structure', 'Input validation, sanitize queries & robust error handling', 'Comprehensive README with demo GIF, architecture diagram & setup instructions', 'Live deployed demo URL with sample credentials', 'Interactive API documentation (Swagger/OpenAPI)'],
      },
      {
        category: 'Real-World Production Polish',
        items: ['Responsive mobile & desktop UI design', 'Database migrations & seed scripts', 'Proper logging and monitoring', 'Performance optimization (lazy loading, indexing)'],
      },
    ],
    keyConcepts: [
      'Problem-Driven Engineering',
      'Comprehensive Technical READMEs',
      'Live Production Deployment',
      'Database Migration Versioning',
      'Defensive Error Boundaries',
      'Architectural Documentation',
    ],
    practiceSuggestions: [
      'Choose a real-world workflow in your daily life (e.g., student grading, gym tracking, developer tools) and engineer a customized solution.',
      'Record a 60-second video demo or GIF showing the key user flows and embed it at the top of your GitHub repository.',
      'Deploy the application to the cloud and write a thorough technical README explaining architecture decisions and trade-offs.',
    ],
    projectSuggestions: [
      {
        title: 'Full-Stack Developer Community & Code Showcase',
        description: 'Production platform with OAuth, markdown code snippet runner, upvoting, tag filtering, and PostgreSQL storage.',
        level: 'Portfolio-Level',
      },
      {
        title: 'Distributed File Storage & Sharing Service',
        description: 'Cloud storage clone with chunked file uploads, pre-signed S3 URLs, password-protected links, and download quotas.',
        level: 'Portfolio-Level',
      },
    ],
    commonMistakes: [
      'Building identical clones of To-Do apps, Netflix, or Weather apps with zero unique features or architectural depth.',
      'Submitting projects that only run locally on localhost without a working live URL or clear setup documentation.',
    ],
    nextStepPreview: 'Prepare to showcase your knowledge and land software engineering offers in Stage 10: Interview Preparation.',
  },
  {
    id: 'interview-prep',
    stageNumber: '10',
    title: 'Interview & Job Preparation',
    shortTitle: 'Interview Preparation',
    tagline: 'Transform your technical expertise and project portfolio into interview readiness and job offers.',
    iconName: 'GraduationCap',
    goal: 'Turn your technical skills into interview readiness.',
    whyItMatters:
      'Technical brilliance alone is not enough. Passing engineering hiring loops requires clear communication, structured problem-solving under pressure, CS fundamentals mastery, and strong behavioral presence.',
    learningOutcome: 'Confidence across live coding interviews, technical deep-dives, CS fundamentals rounds, and behavioral hiring manager evaluations.',
    technologies: ['LeetCode', 'System Design Primer', 'STAR Method', 'Pramp / Interviewing.io', 'LinkedIn & Resume Crafting'],
    topics: [
      {
        category: 'Live Coding & DSA Interviews',
        items: ['Clarifying problem statements & constraints before coding', 'Thinking out loud & communicating trade-offs', 'Writing clean, modular code on whiteboard/coderpad', 'Testing code with edge cases systematically', 'Explaining Time & Space complexity confidently'],
      },
      {
        category: 'CS Fundamentals & Technical Trivia',
        items: ['Operating Systems core questions (Processes, Threads, Deadlocks)', 'DBMS & SQL query challenges (JOINs, Indexes, ACID)', 'Computer Networks questions (TCP, HTTP, DNS, WebSockets)', 'OOP principles & Design pattern scenarios'],
      },
      {
        category: 'System Design & Architecture Rounds',
        items: ['High-level architecture sketching for junior/mid roles', 'Requirements clarification (Functional vs Non-functional)', 'API design, database schema, caching & load balancing trade-offs'],
      },
      {
        category: 'Resume & Behavioral Interviews (STAR Method)',
        items: ['1-page developer resume highlighting measurable impact & tech stacks', 'Optimized LinkedIn & GitHub portfolio profiles', 'STAR framework (Situation, Task, Action, Result) for behavioral questions', 'Reverse interviewing: asking insightful questions to interviewers'],
      },
    ],
    keyConcepts: [
      'Think-Aloud Interview Technique',
      'STAR Behavioral Framework',
      'Action-Driven Resume Bullets',
      'Clarifying Questions Upfront',
      'Systematic Edge-Case Verification',
      'Reverse-Engineering Job Postings',
    ],
    practiceSuggestions: [
      'Conduct at least 5-10 peer mock interviews with a 45-minute timer and live coding platform.',
      'Write down 5-7 core project stories formatted with the STAR method (Conflict, Challenge, Architecture Choice, Result).',
      'Review top 100 core CS trivia questions across OS, DBMS, Networks, and your primary language.',
    ],
    projectSuggestions: [
      {
        title: 'Polished Engineering Portfolio Site',
        description: 'A clean, high-performance developer portfolio showcasing your story, GitHub repos, live projects, and technical articles.',
        level: 'Portfolio-Level',
      },
      {
        title: 'Interactive Technical Cheat-Sheet & Guide',
        description: 'A personal revision repository documenting your curated notes on DSA patterns, SQL queries, and CS topics.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Remaining silent during coding interviews instead of explaining your thought process to the interviewer.',
      'Filling your resume with buzzwords you cannot explain in-depth when probed by an engineering interviewer.',
    ],
    nextStepPreview: 'You have the complete roadmap. Start with Stage 01, build consistently, and welcome to software engineering!',
  },
];

export const PROJECT_PROGRESSION: ProjectProgressionItem[] = [
  {
    id: 'proj-1',
    stage: 'Stage 02 — Beginner',
    name: 'Interactive CLI Problem Solver / Task Engine',
    difficulty: 'Beginner',
    recommendedStack: ['Python', 'Java', 'C++', 'File I/O'],
    skillsLearned: ['Control flow', 'Data structures', 'JSON file persistence', 'Clean command line UX', 'Error handling'],
    description: 'A modular command-line application that manages structured records, performs search queries, and validates user inputs.',
    mustInclude: ['Input validation for all commands', 'File read/write persistence', 'Clear help menu & modular function design'],
  },
  {
    id: 'proj-2',
    stage: 'Stage 04 — Database Driven',
    name: 'Relational Database Management & Analytics API',
    difficulty: 'Intermediate',
    recommendedStack: ['PostgreSQL', 'Python / Node.js', 'SQLAlchemy / Prisma', 'DBeaver'],
    skillsLearned: ['Database schema modeling', 'Foreign keys', 'Complex SQL JOINs', 'Aggregations', 'Indexes'],
    description: 'A business domain application (e.g. university registrar or inventory) with normalized tables, seed scripts, and complex reporting queries.',
    mustInclude: ['Normalized 3NF schema (at least 5 tables)', 'Composite indexes & foreign keys', 'Automated seed script with sample data'],
  },
  {
    id: 'proj-3',
    stage: 'Stage 06 — Full Stack',
    name: 'Collaborative Project Workspace & Kanban App',
    difficulty: 'Full Stack',
    recommendedStack: ['React / Next.js', 'FastAPI / Express', 'PostgreSQL', 'JWT Auth', 'Tailwind CSS'],
    skillsLearned: ['REST API design', 'JWT authentication & sessions', 'Full-stack CRUD', 'State management', 'Responsive web UI'],
    description: 'An end-to-end full-stack web application with user registration, authenticated workspaces, task boards, and activity logs.',
    mustInclude: ['Secure password hashing & JWT auth', 'Protected API endpoints with middleware', 'Responsive UI with optimistic state updates'],
  },
  {
    id: 'proj-4',
    stage: 'Stage 07 & 08 — Advanced',
    name: 'High-Throughput URL Shortener with Caching & Rate Limiting',
    difficulty: 'Advanced',
    recommendedStack: ['FastAPI / Go / Node', 'Redis Cache', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    skillsLearned: ['In-memory caching', 'Base62 encoding', 'Rate limiting', 'Docker containerization', 'CI/CD pipeline'],
    description: 'A high-performance URL shortening service with analytics tracking, Redis cache-aside reads, rate limiting, and full Docker deployment.',
    mustInclude: ['Redis caching layer for O(1) redirection', 'Docker & Docker Compose setup', 'GitHub Actions running automated unit tests'],
  },
  {
    id: 'proj-5',
    stage: 'Stage 09 — Portfolio Level',
    name: 'Production-Grade SaaS / Real-World Workflow Application',
    difficulty: 'Portfolio-Level',
    recommendedStack: ['Next.js (App Router)', 'TypeScript', 'PostgreSQL / Prisma', 'Redis', 'Tailwind CSS', 'Vercel / Render'],
    skillsLearned: ['Production software architecture', 'End-to-end testing', 'Role-based access', 'Interactive analytics', 'Cloud deployment'],
    description: 'A flagship portfolio software solving a genuine real-world problem with rich features, clean documentation, live URL, and exceptional UX.',
    mustInclude: ['Live public demo URL with guest credentials', 'Comprehensive technical README with architecture diagram', 'Polished UI with zero console errors or broken states'],
  },
];

export const FOUR_PILLARS = [
  {
    title: 'Coding & Problem Solving',
    subtitle: 'Data structures, algorithms, time & space efficiency, and clean implementation.',
    icon: 'Code2',
  },
  {
    title: 'CS Fundamentals',
    subtitle: 'Operating systems, databases, SQL, computer networks, and OOP design.',
    icon: 'Cpu',
  },
  {
    title: 'Real-World Projects',
    subtitle: 'Demonstrated ability to build, deploy, and document production-quality software.',
    icon: 'FolderGit2',
  },
  {
    title: 'Communication & Presence',
    subtitle: 'Thinking out loud, explaining trade-offs, collaboration, and behavioral fitness.',
    icon: 'Users',
  },
];

export const DEV_WORKFLOW_STEPS = [
  { step: '1', title: 'IDE Setup', desc: 'Configure VS Code, linter, formatting rules' },
  { step: '2', title: 'Git Branch', desc: 'git checkout -b feature/user-auth' },
  { step: '3', title: 'Code & Build', desc: 'Implement modular classes and functions' },
  { step: '4', title: 'Unit Tests', desc: 'Write & verify tests pass locally' },
  { step: '5', title: 'Git Commit', desc: 'Write descriptive atomic commit message' },
  { step: '6', title: 'Pull Request', desc: 'Open PR with screenshot & test details' },
  { step: '7', title: 'Code Review', desc: 'Address feedback and team suggestions' },
  { step: '8', title: 'CI/CD Pipeline', desc: 'Automated test suite and lint checks' },
  { step: '9', title: 'Production Merge', desc: 'Merge to main and trigger auto-deploy' },
];
