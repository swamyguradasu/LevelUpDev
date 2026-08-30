import { PlacementCategory } from './placementPrepData';

// =========================================================================
// 06 — CS FUNDAMENTALS
// =========================================================================
export const CS_FUNDAMENTALS_CATEGORY: PlacementCategory = {
  id: 'cs-fundamentals',
  cardNumber: '06',
  title: 'CS Fundamentals',
  shortTitle: 'CS Fundamentals',
  tagline: 'Computer architecture, CPU registers, RAM, storage, compilers, interpreters, runtimes, and processes.',
  phaseId: 'core-technical',
  phaseName: 'Core Technical',
  iconName: 'Layers',
  badge: 'Core Subject',
  estimatedHours: '20 Hours',
  importance: 'High',
  description: 'Understand the hardware-software bridge: how machine instructions execute on silicon, memory hierarchies, compilation vs interpretation, and process lifecycles.',
  targetMNCs: ['TCS', 'Infosys', 'Wipro', 'Capgemini', 'Amazon', 'Oracle'],
  levels: [
    {
      id: 'level-1-cs-basics',
      levelNumber: '01',
      title: 'Computer Science Basics',
      shortDescription: 'Computer architecture, CPU, RAM, storage, compilers, interpreters, and runtime environments.',
      estimatedHours: '20 Hours',
      concepts: [
        {
          id: 'computer-architecture',
          title: 'Computer Architecture & Systems',
          tagline: 'Von Neumann model, CPU registers, ALU, RAM, storage, and I/O bus communication.',
          description: 'Explore the physical foundations of computing: how CPUs fetch, decode, and execute instructions.',
          topics: [
            {
              id: 'computer-architecture-basics',
              title: 'Computer Architecture Basics',
              summary: 'Von Neumann model: CPU, Control Unit, ALU, Primary Memory, and I/O bus interconnects.',
              whatYouWillLearn: 'The Fetch-Decode-Execute instruction cycle and how programs run on bare metal.',
              concept: 'The Von Neumann architecture separates the central processing unit (CPU) from memory. Instructions and data reside in the same memory space.',
              whyItMatters: 'Foundational baseline for low-level performance optimization and OS concepts.',
              keyTakeaways: [
                'Clock speed (GHz) determines how many billion instruction cycles the CPU can execute per second.',
                'The system bus connects CPU, RAM, and I/O devices.',
              ],
            },
            {
              id: 'cpu-registers-alu',
              title: 'CPU, Registers & ALU',
              summary: 'Control Unit, Arithmetic Logic Unit, Program Counter, and CPU register file.',
              whatYouWillLearn: 'Role of ultra-fast temporary registers (L1/L2/L3 caches) vs main memory access latency.',
              concept: 'Registers reside directly inside the CPU core and operate in <1 nanosecond. The Program Counter (PC) stores the memory address of the next instruction to execute.',
              whyItMatters: 'Explains cache locality and why sequential array access is faster than linked list pointer chasing.',
              keyTakeaways: [
                'Memory hierarchy: Registers (fastest, smallest) → L1/L2/L3 Cache → RAM → SSD/HDD (slowest, largest).',
                'ALU performs integer arithmetic and bitwise boolean operations.',
              ],
            },
            {
              id: 'ram-vs-storage',
              title: 'RAM vs Persistent Storage',
              summary: 'Volatile primary memory (DRAM) vs non-volatile storage (SSD/NVMe).',
              whatYouWillLearn: 'Why programs must be loaded from disk into RAM before CPU execution.',
              concept: 'RAM provides fast, byte-addressable volatile storage wiped upon power loss. SSDs store persistent files via NAND flash blocks.',
              whyItMatters: 'Understanding memory bottlenecks and swap memory / paging.',
              keyTakeaways: [
                'RAM access latency is ~50-100 nanoseconds; SSD access is ~50-100 microseconds (1000x slower).',
                'Programs execute entirely out of RAM address spaces managed by the OS.',
              ],
            },
            {
              id: 'input-output-systems',
              title: 'Input & Output (I/O) Systems',
              summary: 'Device drivers, interrupts, DMA (Direct Memory Access), and I/O controllers.',
              whatYouWillLearn: 'How the CPU communicates with keyboards, disks, and network cards without blocking computation.',
              concept: 'I/O hardware communicates via Interrupts: when data arrives (e.g. network packet), the controller signals the CPU to invoke an Interrupt Service Routine (ISR).',
              whyItMatters: 'Explains non-blocking I/O, event loops (Node.js), and system call overhead.',
              keyTakeaways: [
                'Direct Memory Access (DMA) allows network cards and disks to transfer data directly to RAM without CPU intervention.',
                'Interrupt-driven I/O is vastly more efficient than polling.',
              ],
            },
          ],
        },
        {
          id: 'compilation-runtime',
          title: 'Compilation, Interpretation & Process Basics',
          tagline: 'Source code compilation pipeline, bytecode interpreters, JIT, runtimes, and processes.',
          description: 'Understand how human-readable code transforms into machine binaries and runs as OS processes.',
          topics: [
            {
              id: 'compiler-vs-interpreter',
              title: 'Compilers vs Interpreters',
              summary: 'Ahead-Of-Time (AOT) compilation (C/C++) vs Interpreted Bytecode (Python) vs JIT (Java/V8).',
              whatYouWillLearn: 'The 4 compilation stages (Preprocessing → Compilation → Assembly → Linking) and bytecode execution.',
              concept: 'A compiler translates entire source code into native machine code before execution. An interpreter executes source or bytecode instruction-by-instruction at runtime.',
              whyItMatters: 'Frequently asked in Round 1 technical interviews.',
              keyTakeaways: [
                'Compiled code (C++) is fast and platform-specific; Interpreted code (Python) is portable but has runtime overhead.',
                'Java uses both: javac compiles to Bytecode (.class), and the JVM JIT compiler translates hot bytecode to machine instructions.',
              ],
            },
            {
              id: 'runtime-environment',
              title: 'Runtime Environment & Garbage Collection',
              summary: 'Virtual machines (JVM, V8, CPython), memory managers, and automatic garbage collection.',
              whatYouWillLearn: 'How runtimes allocate heap memory, manage execution stacks, and free unreferenced objects.',
              concept: 'The runtime environment provides system services (memory allocation, thread management, I/O libraries) while the program executes.',
              whyItMatters: 'Memory leak prevention and understanding performance profiles in Java/Python/Node.',
              keyTakeaways: [
                'Reference counting (Python) and Tracing Mark-and-Sweep (Java) are primary Garbage Collection strategies.',
                'Circular references require cycle detectors to prevent memory leaks.',
              ],
            },
            {
              id: 'process-basics',
              title: 'Process Basics & Memory Layout',
              summary: 'Process Control Block (PCB), Text (Code), Data, Heap, and Stack memory segments.',
              whatYouWillLearn: 'How an executable binary becomes an active OS process with isolated virtual address space.',
              concept: 'A process is a program in execution. The OS allocates a dedicated virtual address space containing: Text (code), Data (globals), Heap (dynamic allocations), and Stack (local variables).',
              whyItMatters: 'The core foundation for Operating Systems and concurrent programming.',
              keyTakeaways: [
                'Stack grows downwards towards lower memory; Heap grows upwards.',
                'Processes are fully isolated by memory management units (MMU); one process crash cannot corrupt another.',
              ],
            },
          ],
        },
      ],
    },
  ],
};

// =========================================================================
// 07 — OOP (OBJECT-ORIENTED PROGRAMMING)
// =========================================================================
export const OOP_CATEGORY: PlacementCategory = {
  id: 'oop',
  cardNumber: '07',
  title: 'Object-Oriented Programming (OOP)',
  shortTitle: 'OOP Concepts',
  tagline: 'Classes, objects, constructors, encapsulation, inheritance, polymorphism, abstraction, and interfaces.',
  phaseId: 'core-technical',
  phaseName: 'Core Technical',
  iconName: 'Boxes',
  badge: 'Must-Know',
  estimatedHours: '25 Hours',
  importance: 'Critical',
  description: 'Master object-oriented design evaluated in both coding and system design rounds. Implement classes, encapsulation, method overloading/overriding, abstract classes, and interfaces.',
  targetMNCs: ['TCS Digital', 'Infosys', 'Amazon', 'Capgemini', 'Wipro', 'Adobe'],
  levels: [
    {
      id: 'level-1-oop-basics',
      levelNumber: '01',
      title: 'OOP Basics',
      shortDescription: 'The 4 pillars of OOP: Classes, Encapsulation, Inheritance, Polymorphism, and Abstraction.',
      estimatedHours: '25 Hours',
      concepts: [
        {
          id: 'classes-objects',
          title: 'Classes & Objects',
          tagline: 'Blueprints (classes), runtime instances (objects), state (attributes), behavior (methods), constructors.',
          description: 'Model real-world entities using object-oriented abstractions.',
          topics: [
            {
              id: 'class-object-attributes-methods',
              title: 'Classes, Objects, Attributes & Methods',
              summary: 'Class is a user-defined blueprint; Object is an instantiated instance occupying memory.',
              whatYouWillLearn: 'Defining instance variables, class/static variables, instance methods, and `self`/`this` reference.',
              concept: 'A class bundles data attributes and operating methods into a single coherent type. An object is an active instance with its own state allocated in heap memory.',
              whyItMatters: 'Every software engineering technical round requires OOP class design.',
              keyTakeaways: [
                '`self` (Python) or `this` (Java/C++) refers to the current invoking instance of the class.',
                'Class variables are shared among all instances; Instance variables are unique per object.',
              ],
            },
            {
              id: 'constructors-destructors',
              title: 'Constructors & Destructors',
              summary: 'Default, parameterized, and copy constructors; `__init__` in Python; object lifecycle.',
              whatYouWillLearn: 'Initializing object state automatically on creation and cleaning up resources upon destruction.',
              concept: 'A constructor is a special member function invoked automatically when an object is instantiated. Destructors (`__del__`) release file handles and unmanaged resources.',
              whyItMatters: 'Standard interview question on constructor overloading and object lifecycle.',
              keyTakeaways: [
                'Constructors have no return type and share the class name in Java/C++.',
                'In Python, `__init__` is the constructor method initializing instance attributes.',
              ],
            },
          ],
        },
        {
          id: 'encapsulation',
          title: 'Encapsulation & Access Control',
          tagline: 'Data hiding, private/protected/public access modifiers, getters, and setters.',
          description: 'Protect object internal state from unauthorized external mutation.',
          topics: [
            {
              id: 'data-hiding-access-control',
              title: 'Data Hiding, Access Modifiers & Getters/Setters',
              summary: 'Public, Private (`__private`), Protected (`_protected`), and getter/setter property decorators.',
              whatYouWillLearn: 'Preventing external corruption of object state by restricting direct field access.',
              concept: 'Encapsulation binds data attributes with the methods that operate on that data, hiding internal state details from outside code via private access and controlled getters/setters.',
              whyItMatters: 'Core pillar for writing secure, maintainable software architectures.',
              keyTakeaways: [
                'Private attributes (`private` in Java, `__var` in Python) cannot be accessed directly outside the class.',
                'Getters and setters allow validating data before updating state (e.g. `set_age(age)` checks `age > 0`).',
              ],
            },
          ],
        },
        {
          id: 'inheritance',
          title: 'Inheritance & Code Reusability',
          tagline: 'Parent (super/base) class, child (sub/derived) class, single, multiple, multilevel, and hierarchical inheritance.',
          description: 'Establish IS-A relationships and reuse attributes and methods across class hierarchies.',
          topics: [
            {
              id: 'parent-child-inheritance-types',
              title: 'Parent & Child Classes & Types of Inheritance',
              summary: 'Single, Multilevel, Multiple, Hierarchical, and Hybrid inheritance; `super()` method.',
              whatYouWillLearn: 'Deriving child classes, calling superclass constructors with `super()`, and method resolution order (MRO).',
              concept: 'Inheritance enables a derived class to inherit fields and methods from a base class, promoting DRY (Don’t Repeat Yourself) code architecture.',
              whyItMatters: 'Heavily tested in technical interview MCQs and coding design rounds.',
              keyTakeaways: [
                'The Diamond Problem in multiple inheritance: Python resolves it using C3 Linearization Method Resolution Order (MRO).',
                '`super().__init__()` invokes the parent class constructor to initialize base state.',
              ],
            },
          ],
        },
        {
          id: 'polymorphism',
          title: 'Polymorphism',
          tagline: 'Compile-time (Overloading) vs Run-time Polymorphism (Overriding), virtual functions, dynamic dispatch.',
          description: 'Allow different classes to be treated through the same common interface.',
          topics: [
            {
              id: 'method-overloading-overriding',
              title: 'Method Overloading vs Method Overriding',
              summary: 'Compile-time polymorphism (same name, different signature) vs Runtime polymorphism (subclass overrides parent method).',
              whatYouWillLearn: 'Dynamic method dispatch, virtual method tables (vtable), and polymorphism in duck-typed languages.',
              concept: 'Polymorphism means "many forms". Method Overriding allows a subclass to provide a specific implementation of a method already defined in its superclass.',
              whyItMatters: 'Top 3 most asked OOP interview questions in every company.',
              keyTakeaways: [
                'Overloading occurs within the same class (compile-time); Overriding occurs across inheritance hierarchy (runtime).',
                'In Python, method overloading is achieved via default arguments or `*args` (since Python does not support classic C++ signature overloading).',
              ],
            },
          ],
        },
        {
          id: 'abstraction',
          title: 'Abstraction & Interfaces',
          tagline: 'Hiding implementation details, Abstract Base Classes (ABC), `@abstractmethod`, Interfaces.',
          description: 'Define clear contractual interfaces without exposing low-level implementation details.',
          topics: [
            {
              id: 'abstract-classes-interfaces',
              title: 'Abstract Classes vs Interfaces',
              summary: 'Abstract class can have concrete and abstract methods; Interface contains ONLY method signatures.',
              whatYouWillLearn: 'Using `abc.ABC` in Python, forcing subclasses to implement abstract methods, and interface contracts.',
              concept: 'Abstraction hides complex implementation details and exposes only essential features to the user. An Abstract Class cannot be instantiated directly.',
              whyItMatters: 'Essential for clean software architecture and design patterns (Factory, Strategy).',
              keyTakeaways: [
                'You cannot create objects of an Abstract Class (e.g. `s = Shape()` fails if `Shape` is abstract).',
                'A class implementing an interface MUST provide concrete implementations for ALL abstract methods.',
              ],
            },
          ],
        },
      ],
    },
  ],
};

// =========================================================================
// 08 — DBMS (DATABASE MANAGEMENT SYSTEMS)
// =========================================================================
export const DBMS_CATEGORY: PlacementCategory = {
  id: 'dbms',
  cardNumber: '08',
  title: 'Database Management Systems (DBMS)',
  shortTitle: 'DBMS',
  tagline: 'Relational databases, keys, constraints, normalization (1NF to BCNF), ACID transactions, indexing, and joins.',
  phaseId: 'core-technical',
  phaseName: 'Core Technical',
  iconName: 'Database',
  badge: 'Core Subject',
  estimatedHours: '30 Hours',
  importance: 'Critical',
  description: 'Master relational data modeling, primary/foreign keys, Normalization to eliminate anomalies, ACID transaction isolation, B-Tree indexes, and database design.',
  targetMNCs: ['Oracle', 'Accenture', 'TCS', 'Amazon', 'Cognizant', 'Deloitte'],
  levels: [
    {
      id: 'level-1-dbms-basics',
      levelNumber: '01',
      title: 'Database Basics',
      shortDescription: 'Database, DBMS, RDBMS, tables, rows, columns, and data abstraction levels.',
      estimatedHours: '6 Hours',
      concepts: [
        {
          id: 'dbms-rdbms-tables',
          title: 'Database & Relational Model',
          tagline: 'DBMS vs RDBMS, tables (relations), rows (tuples), columns (attributes), schemas.',
          description: 'Understand the relational model formulated by Edgar F. Codd and data persistence.',
          topics: [
            {
              id: 'database-rdbms-tables-tuples',
              title: 'Database, DBMS, RDBMS, Tables, Rows & Columns',
              summary: 'DBMS software manages data storage; RDBMS organizes data into 2D tabular relations with keys.',
              whatYouWillLearn: 'Differences between flat file systems, DBMS, and relational RDBMS (PostgreSQL, MySQL, Oracle).',
              concept: 'A Relational Database stores structured data in Tables (Relations), where each Row (Tuple) represents a unique entity record, and each Column (Attribute) represents a field property.',
              whyItMatters: 'Fundamental concepts tested in database technical screening rounds.',
              keyTakeaways: [
                'RDBMS enforces integrity constraints, prevents data redundancy, and supports ACID transactions.',
                'The 3-tier ANSI-SPARC architecture: External Level (Views) → Conceptual Level (Schema) → Internal Level (Physical Storage).',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-2-keys-constraints',
      levelNumber: '02',
      title: 'Keys & Constraints',
      shortDescription: 'Primary key, Foreign key, Candidate key, Composite key, and Integrity Constraints.',
      estimatedHours: '6 Hours',
      concepts: [
        {
          id: 'keys-constraints-concept',
          title: 'Database Keys & Integrity Constraints',
          tagline: 'Primary keys, candidate keys, super keys, foreign keys, composite keys, NOT NULL, UNIQUE, CHECK.',
          description: 'Enforce entity integrity and referential integrity across relational schemas.',
          topics: [
            {
              id: 'primary-foreign-candidate-keys',
              title: 'Primary, Foreign, Candidate & Composite Keys',
              summary: 'Primary Key (unique + non-null), Candidate Key (minimal super key), Foreign Key (referential link).',
              whatYouWillLearn: 'Selecting primary keys from candidate keys, composite multi-column keys, and ON DELETE CASCADE.',
              concept: 'A Primary Key uniquely identifies each row in a table and cannot contain NULL values. A Foreign Key references the Primary Key of another table, establishing referential integrity.',
              whyItMatters: 'Standard interview question asked in 100% of DBMS interviews.',
              keyTakeaways: [
                'A table can have multiple Candidate Keys, but only ONE chosen Primary Key.',
                'A Composite Key consists of two or more columns combined to form a unique identifier.',
                'Referential Integrity guarantees a foreign key must either match a valid primary key value or be NULL.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-3-normalization-transactions',
      levelNumber: '03',
      title: 'Normalization & Transactions',
      shortDescription: '1NF, 2NF, 3NF, BCNF, ACID properties, commit, rollback, and transaction isolation.',
      estimatedHours: '10 Hours',
      concepts: [
        {
          id: 'normalization-concept',
          title: 'Database Normalization (1NF to BCNF)',
          tagline: 'Eliminating insertion, update, and deletion anomalies via functional dependencies.',
          description: 'Systematically decompose schemas into 1NF, 2NF, 3NF, and Boyce-Codd Normal Form.',
          topics: [
            {
              id: 'normal-forms-1nf-bcnf',
              title: '1NF, 2NF, 3NF & BCNF Normal Forms',
              summary: '1NF (atomic values); 2NF (no partial dependency); 3NF (no transitive dependency); BCNF (LHS is super key).',
              whatYouWillLearn: 'Detecting data anomalies and decomposing tables to ensure lossless join and dependency preservation.',
              concept: 'Normalization minimizes redundancy and prevents insertion, update, and deletion anomalies through functional dependency analysis.',
              whyItMatters: 'The #1 most frequently asked theoretical DBMS interview question.',
              keyTakeaways: [
                '1NF: Each cell must contain a single atomic (indivisible) scalar value.',
                '2NF: Must be in 1NF + no non-prime attribute is partially dependent on any candidate key.',
                '3NF: Must be in 2NF + no non-prime attribute is transitively dependent on the primary key.',
                'BCNF: For every functional dependency X -> Y, X MUST be a Super Key.',
              ],
            },
          ],
        },
        {
          id: 'transactions-acid-concept',
          title: 'Transactions & ACID Properties',
          tagline: 'Atomicity, Consistency, Isolation, Durability, Commit, Rollback, and Isolation Levels.',
          description: 'Guarantee data integrity during concurrent transactions and hardware crashes.',
          topics: [
            {
              id: 'acid-properties-commit-rollback',
              title: 'Transactions, ACID Properties, Commit & Rollback',
              summary: 'Atomicity (all-or-nothing), Consistency, Isolation (concurrency), Durability (persistence).',
              whatYouWillLearn: 'Explaining ACID with banking transfer examples, Write-Ahead Logging (WAL), and transaction rollback.',
              concept: 'A Transaction is a single logical unit of work. ACID guarantees: Atomicity (WAL undo logs), Consistency (constraints), Isolation (locks/MVCC), Durability (disk write).',
              whyItMatters: 'Mandatory technical round question for all backend and database candidates.',
              keyTakeaways: [
                'Commit permanently writes transaction changes to disk; Rollback undoes uncommitted modifications.',
                'Isolation anomalies: Dirty Read (reading uncommitted data), Non-repeatable Read, Phantom Read.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-4-schema-optimization',
      levelNumber: '04',
      title: 'Indexing & Database Design',
      shortDescription: 'B-Tree & Hash indexing, Views, Relational Joins, and Schema Design.',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'indexing-views-design',
          title: 'Indexing, Views & Database Design',
          tagline: 'Clustered vs Non-clustered B-Tree indexes, Virtual Views, Cardinalities (1:1, 1:N, M:N).',
          description: 'Accelerate query performance with indexes and design normalized production schemas.',
          topics: [
            {
              id: 'indexes-views-joins-design',
              title: 'B-Tree Indexing, Views, Relationships & Joins',
              summary: 'Clustered index orders physical data rows; Non-clustered index creates separate pointer tree; Views.',
              whatYouWillLearn: 'Why indexes accelerate SELECT queries from O(N) to O(log N) but add write overhead to INSERT/UPDATE.',
              concept: 'B-Tree indexes maintain sorted search trees for fast lookup. A View is a virtual table defined by a saved SQL query without duplicating data on disk.',
              whyItMatters: 'Evaluated in system design and query optimization rounds.',
              keyTakeaways: [
                'A table can have only ONE Clustered Index (physical row order), but MULTIPLE Non-Clustered Indexes.',
                'Relationships: 1-to-1 (unique FK), 1-to-Many (FK on many side), Many-to-Many (Junction table).',
              ],
            },
          ],
        },
      ],
    },
  ],
};

// =========================================================================
// 09 — SQL (STRUCTURED QUERY LANGUAGE)
// =========================================================================
export const SQL_CATEGORY: PlacementCategory = {
  id: 'sql',
  cardNumber: '09',
  title: 'SQL (Structured Query Language)',
  shortTitle: 'SQL Mastery',
  tagline: 'DML, DDL, Aggregations, GROUP BY, Joins, Subqueries, CTEs, Window functions, and Top Interview SQL queries.',
  phaseId: 'core-technical',
  phaseName: 'Core Technical',
  iconName: 'Database',
  badge: 'Must-Know',
  estimatedHours: '25 Hours',
  importance: 'Critical',
  description: 'Master writing complex production SQL queries. Covers SELECT filters, aggregations, multi-table joins, CTEs, window ranking functions, and high-frequency interview queries.',
  targetMNCs: ['Amazon', 'Accenture', 'TCS Digital', 'Oracle', 'Deloitte', 'Cognizant', 'Capgemini'],
  levels: [
    {
      id: 'level-1-basic-querying',
      levelNumber: '01',
      title: 'Basic Querying',
      shortDescription: 'SELECT, WHERE filters, DISTINCT values, ORDER BY sorting, and LIMIT pagination.',
      estimatedHours: '4 Hours',
      concepts: [
        {
          id: 'select-where-order-limit',
          title: 'SELECT, WHERE, DISTINCT, ORDER BY & LIMIT',
          tagline: 'Basic DQL query structure, conditional filtering, deduplication, sorting, and pagination.',
          description: 'Retrieve and filter tabular records using fundamental SQL statements.',
          topics: [
            {
              id: 'sql-select-filtering',
              title: 'SELECT, WHERE, DISTINCT, ORDER BY & LIMIT',
              summary: 'Retrieving columns, filtering records with WHERE (AND, OR, NOT, IN, LIKE, BETWEEN), sorting, and row limits.',
              whatYouWillLearn: 'SQL query execution order (FROM → WHERE → SELECT → ORDER BY → LIMIT) and pattern matching with LIKE (`%` and `_`).',
              concept: 'SQL is a declarative language: you specify WHAT data you want, and the database query planner determines HOW to execute it.',
              whyItMatters: 'Foundational baseline for every SQL assessment.',
              keyTakeaways: [
                'Query execution order is NOT the same as written syntax: FROM and WHERE execute BEFORE SELECT.',
                '`SELECT DISTINCT` eliminates duplicate rows across all projected columns.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-2-aggregations-grouping',
      levelNumber: '02',
      title: 'Aggregations & Grouping',
      shortDescription: 'COUNT, SUM, AVG, MIN, MAX, GROUP BY categories, and HAVING group filters.',
      estimatedHours: '5 Hours',
      concepts: [
        {
          id: 'aggregate-functions-having',
          title: 'Aggregate Functions, GROUP BY & HAVING',
          tagline: 'COUNT, SUM, AVG, MIN, MAX, grouping rows, and WHERE vs HAVING filter rules.',
          description: 'Summarize large datasets and filter grouped buckets.',
          topics: [
            {
              id: 'sql-aggregates-group-by-having',
              title: 'COUNT, SUM, AVG, MIN, MAX, GROUP BY & HAVING',
              summary: 'Aggregating metric columns per group category; filtering groups using HAVING.',
              whatYouWillLearn: 'Why `WHERE` filters individual rows BEFORE grouping, while `HAVING` filters aggregated groups AFTER grouping.',
              concept: '`GROUP BY` collapses multiple rows sharing identical key values into a single summary row. Aggregate functions operate on each group independently.',
              whyItMatters: 'Classic interview trap: "Can we use aggregate functions in the WHERE clause?" (No, use HAVING).',
              keyTakeaways: [
                '`COUNT(*)` counts all rows including NULLs; `COUNT(column)` counts only non-null values.',
                '`WHERE` filters rows before aggregation; `HAVING` filters groups after aggregation.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-3-sql-joins',
      levelNumber: '03',
      title: 'SQL Joins',
      shortDescription: 'INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, and SELF JOIN.',
      estimatedHours: '5 Hours',
      concepts: [
        {
          id: 'sql-joins-concept',
          title: 'Multi-Table Joins & Self Joins',
          tagline: 'Inner, left, right, outer, and self joins linking primary and foreign keys.',
          description: 'Combine rows from two or more tables based on related common columns.',
          topics: [
            {
              id: 'inner-left-right-self-joins',
              title: 'INNER JOIN, LEFT JOIN, RIGHT JOIN & SELF JOIN',
              summary: 'Matching rows (INNER), retaining all left rows with NULL matches (LEFT), joining table to itself (SELF).',
              whatYouWillLearn: 'Writing multi-table joins, self joins (e.g. Employee-Manager hierarchy), and cross joins.',
              concept: 'An INNER JOIN returns only records matching on join condition. A LEFT JOIN returns all rows from left table, filling non-matching right columns with NULL.',
              whyItMatters: 'Tested in 100% of live SQL coding rounds.',
              keyTakeaways: [
                'SELF JOIN: join a table to itself using aliases (e.g. `FROM Employee e LEFT JOIN Employee m ON e.manager_id = m.emp_id`).',
                'Always index foreign key columns used in `ON` join predicates for optimal query performance.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-4-advanced-sql',
      levelNumber: '04',
      title: 'Advanced SQL',
      shortDescription: 'Subqueries, CASE statements, CTEs (Common Table Expressions), Window Functions, and Ranking.',
      estimatedHours: '6 Hours',
      concepts: [
        {
          id: 'subqueries-cte-window-functions',
          title: 'Subqueries, CTEs & Window Functions',
          tagline: 'Correlated subqueries, WITH cte AS (...), ROW_NUMBER, RANK, DENSE_RANK, OVER (PARTITION BY).',
          description: 'Perform advanced calculations across row windows without collapsing rows.',
          topics: [
            {
              id: 'cte-window-functions-ranking',
              title: 'CTEs & Window Functions (ROW_NUMBER, RANK, DENSE_RANK)',
              summary: '`WITH` modular subqueries; Window functions with `OVER (PARTITION BY ... ORDER BY ...)` without grouping.',
              whatYouWillLearn: 'Differences between ROW_NUMBER (unique 1,2,3), RANK (gaps 1,2,2,4), and DENSE_RANK (no gaps 1,2,2,3).',
              concept: 'Window functions perform calculations across a set of table rows related to the current row without collapsing the individual rows into a single summary output.',
              whyItMatters: 'Mandatory for clearing Tier-1 MNC SQL coding rounds.',
              keyTakeaways: [
                '`DENSE_RANK() OVER (ORDER BY salary DESC)` is the golden pattern for Nth highest salary.',
                'Common Table Expressions (`WITH cte AS (...)`) make complex nested queries readable and reusable.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-5-interview-sql',
      levelNumber: '05',
      title: 'Interview SQL (Top Problems)',
      shortDescription: 'Second highest salary, duplicate records, Top N per department, running totals, and consecutive records.',
      estimatedHours: '5 Hours',
      concepts: [
        {
          id: 'high-frequency-interview-sql',
          title: 'Top High-Frequency Interview SQL Queries',
          tagline: 'Nth Highest Salary, Find/Delete Duplicates, Running Totals, Consecutive Active Records.',
          description: 'Master canonical interview queries that appear repeatedly in placement screening tests.',
          topics: [
            {
              id: 'nth-highest-salary-duplicates',
              title: 'Second Highest Salary, Duplicates & Running Totals',
              summary: 'Solving 2nd highest salary using DENSE_RANK or subquery; Finding duplicates with GROUP BY HAVING count > 1; Running totals with SUM() OVER.',
              whatYouWillLearn: 'Handling NULL edge cases (if no 2nd highest salary exists, return NULL), and window running sums.',
              concept: 'Top interview SQL patterns: 1. Nth Highest Salary using DENSE_RANK. 2. Delete duplicates using `ROW_NUMBER() > 1`. 3. Running total using `SUM(amount) OVER (ORDER BY date)`.',
              whyItMatters: 'Appears in almost every product and service MNC interview.',
              keyTakeaways: [
                'Second Highest Salary: `SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee)`.',
                'Department Top 3 Earners: `WITH Ranked AS (SELECT *, DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as rnk FROM Emp) SELECT * FROM Ranked WHERE rnk <= 3`.',
              ],
            },
          ],
        },
      ],
    },
  ],
};

// =========================================================================
// 10 — OPERATING SYSTEMS
// =========================================================================
export const OS_CATEGORY: PlacementCategory = {
  id: 'operating-systems',
  cardNumber: '10',
  title: 'Operating Systems',
  shortTitle: 'Operating Systems',
  tagline: 'Kernel, processes, threads, CPU scheduling, deadlocks, semaphores, mutex, virtual memory, paging, and stack vs heap.',
  phaseId: 'core-technical',
  phaseName: 'Core Technical',
  iconName: 'Terminal',
  badge: 'Core Subject',
  estimatedHours: '30 Hours',
  importance: 'Critical',
  description: 'Understand how the operating system coordinates compute hardware, schedules tasks, synchronizes concurrent threads, manages virtual memory, and prevents deadlocks.',
  targetMNCs: ['Amazon', 'Microsoft', 'Qualcomm', 'Cisco', 'TCS', 'Wipro'],
  levels: [
    {
      id: 'level-1-os-basics',
      levelNumber: '01',
      title: 'OS Basics & Architecture',
      shortDescription: 'OS fundamentals, Kernel modes (User vs Kernel), Process, Thread, and Program definitions.',
      estimatedHours: '6 Hours',
      concepts: [
        {
          id: 'os-kernel-process-thread',
          title: 'Kernel & Execution Modes',
          tagline: 'Kernel space vs User space, system calls, interrupt handlers, program vs process.',
          description: 'Understand how the OS kernel acts as the master resource manager.',
          topics: [
            {
              id: 'os-basics-kernel-modes',
              title: 'OS Basics, Kernel Architecture & System Calls',
              summary: 'Monolithic vs Microkernel; Dual-mode operation (Ring 0 Kernel Mode vs Ring 3 User Mode); System calls.',
              whatYouWillLearn: 'How user programs switch from User Mode to Kernel Mode via software traps / system calls (e.g. read, write, fork).',
              concept: 'The Kernel is the core program that controls all hardware resources. Dual-mode operation protects hardware from errant or malicious user programs.',
              whyItMatters: 'Classic interview questions on kernel protection rings and context switching.',
              keyTakeaways: [
                'Program is a passive binary file stored on disk; Process is an active executing instance in memory.',
                'System call is the programmatic interface user apps use to request OS kernel services.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-2-processes-scheduling',
      levelNumber: '02',
      title: 'Process Management & CPU Scheduling',
      shortDescription: 'Process vs Thread, Context Switching, CPU Scheduling algorithms, and Multithreading.',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'process-thread-scheduling',
          title: 'Process vs Thread & CPU Scheduling',
          tagline: 'Shared memory vs isolated spaces, context switch overhead, FCFS, SJF, Round Robin, Priority.',
          description: 'Analyze scheduling algorithms, Gantt charts, waiting times, and thread concurrency.',
          topics: [
            {
              id: 'process-vs-thread-context-switch',
              title: 'Process vs Thread, Context Switching & Multithreading',
              summary: 'Processes have isolated memory; Threads share the same heap, globals, and code but have private stacks and registers.',
              whatYouWillLearn: 'Why thread context switching is faster than process context switching (no TLB cache flush required).',
              concept: 'A Thread is a lightweight execution unit within a process. Threads share the address space of their parent process, making IPC and communication instant.',
              whyItMatters: 'Asked in 90%+ of technical interviews.',
              keyTakeaways: [
                'Process context switch: save registers, update PCB, flush TLB cache (expensive).',
                'Thread context switch: save registers and program counter (lightweight).',
              ],
            },
            {
              id: 'cpu-scheduling-algorithms',
              title: 'CPU Scheduling: FCFS, SJF, Round Robin & Priority',
              summary: 'Preemptive vs Non-preemptive scheduling, Turnaround Time, Waiting Time, Time Quantum.',
              whatYouWillLearn: 'Calculating average waiting time, Convoy Effect in FCFS, and starvation in Priority scheduling.',
              concept: 'The CPU scheduler selects which ready process executes on the CPU core. Round Robin uses time slicing to ensure interactive responsiveness.',
              whyItMatters: 'Solving scheduling numericals and Gantt chart calculations in placement tests.',
              keyTakeaways: [
                'Shortest Job First (SJF) provides the mathematically minimum average waiting time.',
                'Round Robin with small time quantum causes excessive context switching; large quantum degrades to FCFS.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-3-synchronization-deadlocks',
      levelNumber: '03',
      title: 'Concurrency, Synchronization & Deadlocks',
      shortDescription: 'Deadlock conditions, Bankers algorithm, Race conditions, Mutex, Semaphores, and Critical Section.',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'synchronization-deadlocks-concept',
          title: 'Deadlocks, Mutex & Semaphores',
          tagline: 'Race conditions, Critical section problem, Mutex vs Semaphore, 4 Coffman deadlock conditions.',
          description: 'Prevent data races in concurrent systems and resolve deadlock resource allocation graphs.',
          topics: [
            {
              id: 'deadlock-mutex-semaphore-sync',
              title: 'Deadlock, Race Condition, Mutex & Semaphores',
              summary: 'Critical section (Mutual Exclusion, Progress, Bounded Waiting); Mutex (locking) vs Semaphore (signaling); 4 Coffman conditions.',
              whatYouWillLearn: 'How race conditions corrupt shared data and how semaphores/mutexes guarantee atomic execution.',
              concept: 'A Deadlock occurs when processes are permanently blocked waiting for resources held by each other. 4 Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.',
              whyItMatters: 'The single most critical systems and concurrency interview topic.',
              keyTakeaways: [
                'Mutex is an ownership lock (only the thread that locked can unlock); Semaphore is a signaling counter.',
                'Deadlock Prevention: break any ONE of the 4 Coffman conditions (e.g. acquire locks in global sorted order).',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-4-memory-management',
      levelNumber: '04',
      title: 'Memory Management & Paging',
      shortDescription: 'RAM, Virtual memory, Paging, Segmentation, Page Replacement (FIFO, LRU, Optimal), and Stack vs Heap.',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'virtual-memory-paging-concept',
          title: 'Virtual Memory, Paging & Page Replacement',
          tagline: 'Logical vs physical address translation (MMU), Page tables, TLB, Thrashing, LRU replacement.',
          description: 'Understand how virtual memory provides processes with the illusion of vast private memory spaces.',
          topics: [
            {
              id: 'virtual-memory-paging-lru-stack-heap',
              title: 'Virtual Memory, Paging, LRU Page Replacement & Stack vs Heap',
              summary: 'Address translation via Page Table; Page faults; Thrashing; LRU page replacement algorithm; Stack vs Heap allocation.',
              whatYouWillLearn: 'How the Memory Management Unit (MMU) translates virtual addresses to physical frames and handles page faults.',
              concept: 'Paging divides virtual memory into fixed-size Pages and physical RAM into Frames. When a page is not present in RAM, a Page Fault occurs, prompting the OS to swap it from disk.',
              whyItMatters: 'High-frequency systems question asked by Amazon, Microsoft, and Qualcomm.',
              keyTakeaways: [
                'Thrashing occurs when the OS spends more time swapping pages than executing instructions.',
                'Stack: fast, automated, fixed-size memory for local variables. Heap: dynamic, manually allocated, larger memory.',
              ],
            },
          ],
        },
      ],
    },
  ],
};

// =========================================================================
// 11 — COMPUTER NETWORKS
// =========================================================================
export const NETWORKS_CATEGORY: PlacementCategory = {
  id: 'computer-networks',
  cardNumber: '11',
  title: 'Computer Networks',
  shortTitle: 'Computer Networks',
  tagline: 'OSI 7 layers, TCP/IP, IP, MAC, ports, DNS, HTTP/HTTPS, TCP 3-way handshake, client-server models, and REST APIs.',
  phaseId: 'core-technical',
  phaseName: 'Core Technical',
  iconName: 'Globe',
  badge: 'Core Subject',
  estimatedHours: '25 Hours',
  importance: 'High',
  description: 'Master networking protocols powering the modern web. Covers IP/MAC addressing, TCP 3-way handshakes, HTTP request/response lifecycles, and REST API design.',
  targetMNCs: ['Cisco', 'Amazon', 'Accenture', 'Infosys', 'Cognizant', 'Airtel'],
  levels: [
    {
      id: 'level-1-network-basics',
      levelNumber: '01',
      title: 'Network Fundamentals',
      shortDescription: 'Network basics, LAN, WAN, IP addresses (IPv4 vs IPv6), MAC addresses, and Port numbers.',
      estimatedHours: '5 Hours',
      concepts: [
        {
          id: 'lan-wan-ip-mac-ports',
          title: 'IP, MAC & Port Addressing',
          tagline: 'Logical IP vs Physical MAC, Subnetting, Default Gateway, Well-known ports (80, 443, 22).',
          description: 'Understand network addressing across the OSI physical, data link, and network layers.',
          topics: [
            {
              id: 'network-basics-ip-mac-ports',
              title: 'Network Basics, LAN, WAN, IP, MAC & Ports',
              summary: 'LAN vs WAN; IPv4 (32-bit) vs IPv6 (128-bit); MAC address (48-bit hardware identifier); Port multiplexing.',
              whatYouWillLearn: 'How data routes from source MAC/IP to destination IP and specific application port (e.g. port 80 HTTP).',
              concept: 'IP address identifies a host on a network logically; MAC address identifies physical network interface card (NIC); Port number identifies the specific running process/application.',
              whyItMatters: 'Fundamental networking baseline questions.',
              keyTakeaways: [
                'ARP (Address Resolution Protocol) resolves IP addresses into physical MAC addresses.',
                'Well-known ports: HTTP (80), HTTPS (443), SSH (22), DNS (53), FTP (21).',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-2-protocols-transport',
      levelNumber: '02',
      title: 'Protocols & Transport Layer',
      shortDescription: 'DNS resolution, HTTP, HTTPS, SSL/TLS, TCP reliability, 3-way handshake, and UDP.',
      estimatedHours: '7 Hours',
      concepts: [
        {
          id: 'dns-http-tcp-udp',
          title: 'DNS, HTTPS & TCP vs UDP',
          tagline: 'Domain Name System, TLS handshake, TCP connection establishment, sequence numbers, UDP streaming.',
          description: 'Trace packet lifecycles from DNS lookup to encrypted HTTPS byte streams.',
          topics: [
            {
              id: 'dns-https-tcp-three-way',
              title: 'DNS, HTTP/HTTPS, TCP 3-Way Handshake & UDP',
              summary: 'DNS hierarchical lookup; HTTPS TLS encryption; TCP 3-Way Handshake (SYN, SYN-ACK, ACK); TCP vs UDP.',
              whatYouWillLearn: 'What happens when you type `https://google.com` in a browser and press Enter.',
              concept: 'TCP is connection-oriented, reliable (acknowledgments, retransmissions), and in-order. UDP is connectionless, lightweight, and fast (used in live video/gaming).',
              whyItMatters: 'The #1 most asked networking interview question in tech companies.',
              keyTakeaways: [
                'TCP Handshake: Client sends SYN → Server replies SYN-ACK → Client acknowledges with ACK.',
                'HTTPS encrypts HTTP traffic using TLS/SSL asymmetric handshake + symmetric session encryption.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-3-web-architecture',
      levelNumber: '03',
      title: 'Web Architecture & HTTP',
      shortDescription: 'Client-server architecture, HTTP request/response headers, HTTP methods, Status codes, Cookies, and Sessions.',
      estimatedHours: '6 Hours',
      concepts: [
        {
          id: 'client-server-http-methods-cookies',
          title: 'Client-Server, HTTP Methods & Cookies/Sessions',
          tagline: 'GET, POST, PUT, DELETE, 200/404/500 status codes, Stateless HTTP, Cookies, Sessions.',
          description: 'Master web protocols, status code categories, and session state persistence.',
          topics: [
            {
              id: 'http-methods-status-codes-sessions',
              title: 'HTTP Methods, Status Codes, Cookies & Sessions',
              summary: 'Idempotency of GET/PUT/DELETE; Status codes (2xx Success, 3xx Redirect, 4xx Client Error, 5xx Server Error); Cookies vs Sessions.',
              whatYouWillLearn: 'Differences between client-side cookies and server-side session stores for maintaining state.',
              concept: 'HTTP is a stateless protocol. Cookies (stored in browser) and Sessions (stored on server) allow web applications to track user identity across multiple requests.',
              whyItMatters: 'Essential for web development and API design rounds.',
              keyTakeaways: [
                'Status code 401 = Unauthorized (unauthenticated); 403 = Forbidden (unauthorized); 404 = Not Found; 500 = Internal Server Error.',
                'GET requests are idempotent and safe; POST requests create new resources.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-4-apis-security',
      levelNumber: '04',
      title: 'REST APIs & Security',
      shortDescription: 'REST APIs, JSON payloads, Authentication (JWT), Authorization, and API best practices.',
      estimatedHours: '7 Hours',
      concepts: [
        {
          id: 'rest-json-auth-concept',
          title: 'RESTful API Architecture & Authentication',
          tagline: 'Resource URIs, JSON serialization, Stateless endpoints, JWT tokens, Bearer auth.',
          description: 'Design production-grade REST APIs and secure endpoints with token-based authentication.',
          topics: [
            {
              id: 'rest-apis-json-jwt-auth',
              title: 'REST APIs, JSON, Authentication & Authorization',
              summary: 'REST constraints (Stateless, Client-Server, Cacheable); JSON data exchange; JWT (Header.Payload.Signature).',
              whatYouWillLearn: 'Designing clean REST endpoint paths, JSON contracts, and verifying signed JWT tokens.',
              concept: 'REST APIs represent resources with nouns (e.g. `/api/users`) and actions with HTTP verbs (GET, POST). JWT enables stateless authentication where the client holds a cryptographically signed token.',
              whyItMatters: 'Tested when discussing projects and backend system architecture.',
              keyTakeaways: [
                'Authentication confirms WHO you are; Authorization determines WHAT you have permission to access.',
                'JWT tokens consist of 3 Base64-encoded parts: Header, Payload, and cryptographic Signature.',
              ],
            },
          ],
        },
      ],
    },
  ],
};

// =========================================================================
// 12 — GIT & GITHUB
// =========================================================================
export const GIT_CATEGORY: PlacementCategory = {
  id: 'git-github',
  cardNumber: '12',
  title: 'Git & GitHub',
  shortTitle: 'Git & GitHub',
  tagline: 'Version control, repositories, commits, branches, clone/add/commit/push/pull, pull requests, merge conflicts, and .gitignore.',
  phaseId: 'development',
  phaseName: 'Development',
  iconName: 'FolderGit2',
  badge: 'Practical Skill',
  estimatedHours: '15 Hours',
  importance: 'High',
  description: 'Demonstrate professional developer hygiene. Master Git distributed version control, branch management, merge conflict resolution, and collaborative pull requests.',
  targetMNCs: ['All Product & Service MNCs'],
  levels: [
    {
      id: 'level-1-git-basics',
      levelNumber: '01',
      title: 'Version Control Basics',
      shortDescription: 'Git vs GitHub, distributed version control, repositories, commits, and branches.',
      estimatedHours: '4 Hours',
      concepts: [
        {
          id: 'git-architecture-concept',
          title: 'Git Architecture & Core Concepts',
          tagline: 'Working Directory, Staging Index, Local Repository, Remote Repository, SHA-1 commits.',
          description: 'Understand how Git tracks immutable snapshots of your project history.',
          topics: [
            {
              id: 'git-github-repos-commits',
              title: 'Git, GitHub, Repositories, Commits & Branches',
              summary: 'Git is local distributed CLI tool; GitHub is cloud remote hosting platform. Snapshots vs diffs.',
              whatYouWillLearn: 'The 3 Git states: Modified (Working Directory) → Staged (Index) → Committed (Repository).',
              concept: 'Git stores snapshots of files at each commit, identified by a cryptographic SHA-1 hash. A branch is simply a lightweight movable pointer to a specific commit.',
              whyItMatters: 'Mandatory technical skill for all software engineering roles.',
              keyTakeaways: [
                'Git is a local distributed VCS; GitHub is a cloud-hosted collaboration platform.',
                'A commit is an immutable snapshot of staged changes with author, message, and parent commit reference.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-2-git-commands',
      levelNumber: '02',
      title: 'Essential Git Commands',
      shortDescription: 'git clone, git status, git add, git commit, git push, and git pull.',
      estimatedHours: '5 Hours',
      concepts: [
        {
          id: 'daily-git-commands',
          title: 'Daily Git CLI Workflow',
          tagline: 'git clone, git status, git add ., git commit -m, git push origin, git pull.',
          description: 'Master the standard day-to-day command sequence for tracking and syncing code.',
          topics: [
            {
              id: 'git-daily-commands-workflow',
              title: 'git clone, status, add, commit, push & pull',
              summary: 'Cloning remote repos, staging files (`git add .`), committing with descriptive messages, syncing with remote.',
              whatYouWillLearn: 'Executing the full developer lifecycle: edit code → check status → stage changes → commit → pull upstream → push.',
              concept: '`git push` uploads local commits to remote branch. `git pull` fetches remote commits and automatically merges them into local working branch (`git fetch` + `git merge`).',
              whyItMatters: 'Evaluated in project defense and live coding pair-programming sessions.',
              keyTakeaways: [
                'Write clear atomic commit messages in present imperative tense (e.g. "Fix user authentication bug").',
                'Always run `git pull` before pushing to avoid non-fast-forward rejection.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-3-collaboration-workflows',
      levelNumber: '03',
      title: 'Collaboration & Merge Conflicts',
      shortDescription: 'Branching strategies, Merging, Pull Requests (PRs), Merge Conflicts, Stash, and .gitignore.',
      estimatedHours: '6 Hours',
      concepts: [
        {
          id: 'branching-merging-conflicts',
          title: 'Branching, PRs, Merge Conflicts & Stash',
          tagline: 'git checkout -b, git merge, resolving <<<<<<< HEAD conflicts, git stash, .gitignore patterns.',
          description: 'Collaborate in team environments without overwriting teammates code or leaking secrets.',
          topics: [
            {
              id: 'branching-merge-conflicts-stash',
              title: 'Branching, Merging, Pull Requests, Merge Conflicts, Stash & .gitignore',
              summary: 'Feature branch workflows, resolving merge conflict markers, saving uncommitted work with git stash, ignoring node_modules/.env.',
              whatYouWillLearn: 'Step-by-step merge conflict resolution: locate conflict markers (`<<<<<<< HEAD`), edit clean resolution, stage, and commit.',
              concept: 'A merge conflict occurs when two branches modify the same line of code in different ways. Git cannot automatically decide which version is correct and pauses the merge.',
              whyItMatters: 'Standard practical developer question asked in team engineering rounds.',
              keyTakeaways: [
                'Never commit `.env` files with secret API keys or `node_modules` (always include them in `.gitignore`).',
                '`git stash` temporarily shelves uncommitted changes so you can pull or switch branches on a clean working tree.',
              ],
            },
          ],
        },
      ],
    },
  ],
};

// =========================================================================
// 13 — DEVELOPMENT BASICS
// =========================================================================
export const DEV_BASICS_CATEGORY: PlacementCategory = {
  id: 'development-basics',
  cardNumber: '13',
  title: 'Development Basics',
  shortTitle: 'Development Basics',
  tagline: 'HTML, CSS, JavaScript, Frontend/Backend, REST APIs, JSON, DB connectivity, environment variables, and deployment.',
  phaseId: 'development',
  phaseName: 'Development',
  iconName: 'Webhook',
  badge: 'Practical Skill',
  estimatedHours: '30 Hours',
  importance: 'High',
  description: 'Connect software theory with real-world full-stack applications. Understand frontend/backend separation, RESTful HTTP APIs, database connectivity, environment secrets, and deployment pipelines.',
  targetMNCs: ['TCS Digital', 'Infosys DSE', 'Accenture FSE', 'Amazon', 'Cognizant'],
  levels: [
    {
      id: 'level-1-web-fundamentals',
      levelNumber: '01',
      title: 'Web Fundamentals',
      shortDescription: 'HTML structure, CSS styling, JavaScript interactivity, Frontend vs Backend, and Client/Server architecture.',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'html-css-js-client-server',
          title: 'HTML, CSS, JS & Client-Server Model',
          tagline: 'Semantic HTML, CSS box model/flexbox, JavaScript DOM/async, Frontend/Backend separation.',
          description: 'Understand the three core pillars of web interfaces and how browsers interact with backend servers.',
          topics: [
            {
              id: 'web-fundamentals-html-css-js',
              title: 'HTML, CSS, JavaScript Basics & Frontend/Backend Architecture',
              summary: 'HTML provides content structure; CSS styles layout & responsive UI; JS adds dynamic behavior; Client sends requests, Server responds.',
              whatYouWillLearn: 'DOM tree manipulation, CSS flexbox/grid layouts, JavaScript async/await promises, and client-server request lifecycles.',
              concept: 'Frontend (Client) runs in the user browser executing HTML/CSS/JS. Backend (Server) runs on remote infrastructure executing business logic, authenticating users, and querying databases.',
              whyItMatters: 'Foundational baseline for full-stack and web development positions.',
              keyTakeaways: [
                'JavaScript is single-threaded with an Event Loop handling non-blocking asynchronous operations.',
                'The CSS Box Model: Content → Padding → Border → Margin.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-2-apis-http',
      levelNumber: '02',
      title: 'APIs & HTTP Communication',
      shortDescription: 'REST APIs, JSON payloads, HTTP request-response cycles, Authentication, and Authorization.',
      estimatedHours: '10 Hours',
      concepts: [
        {
          id: 'rest-api-http-requests',
          title: 'REST API, JSON & HTTP Requests',
          tagline: 'GET/POST/PUT/DELETE requests, JSON parsing, HTTP headers, Authentication tokens, Authorization roles.',
          description: 'Build and consume REST APIs using structured JSON payloads and standard HTTP headers.',
          topics: [
            {
              id: 'rest-api-json-http-auth',
              title: 'REST API, JSON, HTTP Requests, Authentication & Authorization',
              summary: 'RESTful endpoint design, serialization of JSON data, HTTP request methods, bearer tokens, role-based access.',
              whatYouWillLearn: 'Creating CRUD endpoints, inspecting network payloads in browser DevTools, and securing routes.',
              concept: 'REST APIs allow decoupled frontends (React, Mobile apps) to communicate with backend microservices over standard HTTP protocols exchanging JSON strings.',
              whyItMatters: 'Evaluated when explaining your flagship portfolio projects in technical rounds.',
              keyTakeaways: [
                'JSON (JavaScript Object Notation) is a lightweight text-based data interchange format.',
                'Use proper HTTP verbs: GET (read), POST (create), PUT (update entire resource), PATCH (partial update), DELETE (remove).',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-3-production-deployment',
      levelNumber: '03',
      title: 'Production & Deployment',
      shortDescription: 'Database connectivity, Environment variables (.env), Deployment, Production vs Development, and Basic debugging.',
      estimatedHours: '12 Hours',
      concepts: [
        {
          id: 'db-connection-env-deployment',
          title: 'DB Connectivity, Environment Variables & Cloud Deployment',
          tagline: 'Database connection pools, .env secrets, Vercel/Render hosting, Dev vs Prod environments, error logging.',
          description: 'Deploy software projects to live cloud servers with production database configurations.',
          topics: [
            {
              id: 'db-connectivity-env-deploy-debug',
              title: 'Database Connectivity, Environment Variables, Deployment & Debugging',
              summary: 'Connection strings (DATABASE_URL), managing secrets via .env, continuous deployment (CI/CD), debugging logs.',
              whatYouWillLearn: 'Setting up PostgreSQL/MongoDB connections with ORMs, configuring environment variables in cloud dashboards (Vercel/Render), and reading production stack traces.',
              concept: 'Development environments run locally with hot-reloading and debug logs. Production environments run optimized builds on cloud servers with secure environment secrets, SSL certificates, and connection pooling.',
              whyItMatters: 'Distinguishes candidates who have shipped live applications from those with only local tutorial code.',
              keyTakeaways: [
                'Never hardcode database passwords or API keys in source code (always load from `process.env` or `os.environ`).',
                'Connection pooling reuses database connections rather than opening a new TCP socket per user request.',
              ],
            },
          ],
        },
      ],
    },
  ],
};
