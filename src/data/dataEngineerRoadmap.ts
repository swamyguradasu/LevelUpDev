export interface DERoadmapStage {
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
  visualIntuition?: {
    label: string;
    steps: string[];
  };
}

export interface DEProjectProgression {
  id: string;
  stage: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Portfolio-Level';
  problem: string;
  description: string;
  architecture: string;
  technologies: string[];
  dataFlow: string;
  storage: string;
  transformation: string;
  testing: string;
  deployment: string;
  githubReqs: string;
  skillsLearned: string[];
}

export interface DEMajorPipelineStage {
  id: string;
  stageName: string;
  whatHappens: string;
  whyItMatters: string;
  commonTools: string[];
  example: string;
  productionConsiderations: string;
  icon: string;
}

export interface DESpecialization {
  title: string;
  description: string;
  coreTech: string[];
  focus: string;
  icon: string;
}

export interface DEToolkitCategory {
  category: string;
  coreItems: string[];
  advancedItems: string[];
}

export interface DECommonMistake {
  title: string;
  solution: string;
}

export interface DEChecklistCategory {
  category: string;
  items: {
    name: string;
    desc: string;
  }[];
}

export interface DEFourPillars {
  title: string;
  subtitle: string;
  icon: string;
}

export const DE_ROADMAP_STAGES: DERoadmapStage[] = [
  {
    id: 'python-programming',
    stageNumber: '01',
    title: 'Python & Programming for Data Engineering',
    shortTitle: 'Python & Programming',
    tagline: 'Build the foundational programming skills to automate workflows, ingest raw files, interact with REST APIs, and build modular pipelines.',
    iconName: 'Code2',
    goal: 'Build the programming foundation required to automate data workflows and create reliable data systems.',
    whyItMatters:
      'Python is the lingua franca of data engineering. It powers pipeline scripts, cloud functions, workflow orchestrators (Airflow), data manipulation (Pandas/Polars), and big data frameworks (PySpark). Clean, modular code prevents costly pipeline outages.',
    learningOutcome: 'Write Python programs capable of automating real-world data workflows.',
    recommendedApproach:
      'Focus on practical data manipulation: reading nested JSON from APIs, handling large CSVs via streaming generators, working with dates/times, and structuring code with classes, type hints, and automated pytest suites.',
    technologies: ['Python 3.12', 'Pandas', 'Requests', 'Pydantic v2', 'PyArrow', 'pytest'],
    visualIntuition: {
      label: 'Python Data Extraction & Ingestion Flow',
      steps: [
        'REST API / JSON / CSV (Raw external source)',
        'REQUESTS / HTTP (Ingests payload with retry logic & timeouts)',
        'PYDANTIC VALIDATION (Enforces schema types & data contracts)',
        'PANDAS / POLARS (Transforms, normalizes, & cleans records)',
        'STRUCTURED OUTPUT (Writes partitioned Parquet / database rows)',
      ],
    },
    topics: [
      {
        category: 'Core Python Syntax & Data Structures',
        items: [
          'Variables, primitive types (int, float, str, bool), and type casting',
          'Collections: Lists, tuples (immutability), sets (deduplication), dictionaries, comprehensions',
          'Control flow: Conditionals, loops (for/while), enumerate, zip, and break/continue logic',
          'Functions: Positional/keyword arguments, *args, **kwargs, lambda functions, docstrings',
          'Robust exception handling: try/except/else/finally, custom domain exceptions, structured traceback logging',
        ],
      },
      {
        category: 'Intermediate Python for Data Engineering',
        items: [
          'Object-Oriented Programming (OOP): Classes, inheritance, encapsulation, dataclasses',
          'Generators and Iterators (yield): Streaming gigabyte-scale logs without memory exhaustion',
          'Decorators: Creating reusable timing decorators, retry handlers, and logging wrappers',
          'Context Managers (__enter__ / __exit__): Safe database connections and file locks',
          'Type hints (typing module) and runtime schema validation with Pydantic v2',
          'Virtual environments (venv, poetry, uv) and strict dependency pinning',
        ],
      },
      {
        category: 'Data Ingestion & File Formats',
        items: [
          'File I/O: Reading and writing CSV, JSON, NDJSON (Newline Delimited JSON), XML, and YAML',
          'HTTP & REST APIs: Fetching paginated endpoints with requests / httpx, authentication tokens, rate limits',
          'Regular expressions (re module): Cleaning dirty text fields, phone numbers, and extracting patterns',
          'Date & Time manipulation (datetime, zoneinfo): UTC standardization, ISO-8601 parsing, timezone offsets',
          'Working with columnar binary formats: PyArrow and fast Parquet file serialization',
        ],
      },
      {
        category: 'Software Engineering Best Practices',
        items: [
          'Standard project structure: src/, tests/, configs/, scripts/, .env, pyproject.toml',
          'Structured logging (structlog, loguru) vs unstructured print statements',
          'Configuration management: Managing environment variables, .env files, and YAML configs',
          'Automated testing with pytest: Unit testing transformation logic, mocking API responses, parameterized tests',
        ],
      },
    ],
    keyConcepts: [
      'Memory-Safe File Streaming with Generators (yield)',
      'Schema Validation with Pydantic Data Models',
      'Paginated REST API Data Extraction with Retries',
      'UTC Datetime Standardization & Parsing',
      'Automated Unit Testing with Pytest & Mocking',
    ],
    practiceSuggestions: [
      'Write a Python script that fetches 10 pages of paginated data from a public REST API (e.g. GitHub or OpenWeather), validates each record against a Pydantic schema, and saves it as a compressed Parquet file.',
      'Build a generator function that streams a 2GB CSV file line-by-line, filters out invalid rows, and calculates rolling statistics without exceeding 100MB of RAM.',
      'Write a comprehensive pytest test suite testing currency conversion and null-handling functions with edge case fixtures.',
    ],
    projectSuggestions: [
      {
        title: 'Robust REST API Ingestion & Validation Engine',
        description: 'A modular Python CLI utility that ingests paginated data from third-party REST APIs, enforces Pydantic schema contracts, logs structured metrics, and writes partitioned Parquet files with 90%+ pytest coverage.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Loading multi-gigabyte files entirely into memory with a single read() call, causing Out-Of-Memory (OOM) crashes.',
      'Hardcoding API keys or database passwords directly inside Python code instead of using environment variables.',
      'Ignoring timezone conversions and saving local timestamps into databases without UTC standardization.',
    ],
    nextStepPreview: 'Master relational databases, querying, indexing, and complex analytical SQL in Stage 02: SQL & Databases.',
  },
  {
    id: 'sql-databases',
    stageNumber: '02',
    title: 'SQL & Relational Databases',
    shortTitle: 'SQL & Databases',
    tagline: 'Master SQL querying, window functions, complex joins, relational database internals, and query optimization.',
    iconName: 'Database',
    goal: 'Become highly proficient in SQL because SQL is one of the most important skills for Data Engineers.',
    whyItMatters:
      'SQL is the universal language of data systems. Data engineers write complex analytical queries, design relational schemas, optimize slow queries using EXPLAIN plans, and build performant data pipelines across PostgreSQL, Snowflake, BigQuery, and Databricks.',
    learningOutcome: 'Write production-quality SQL and understand how relational databases work.',
    recommendedApproach:
      'Practice advanced SQL patterns: Common Table Expressions (CTEs), Window Functions (ROW_NUMBER, RANK, LAG/LEAD), subqueries, and analyze execution plans using EXPLAIN ANALYZE in PostgreSQL.',
    technologies: ['PostgreSQL', 'MySQL', 'DBeaver / DataGrip', 'SQLAlchemy', 'pgAdmin'],
    visualIntuition: {
      label: 'SQL Execution & Query Optimization Flow',
      steps: [
        'SQL QUERY (Declarative user query with CTEs & Joins)',
        'PARSER & PLANNER (Generates abstract syntax tree & cost estimates)',
        'QUERY OPTIMIZER (Selects sequential scan vs B-Tree index scan)',
        'EXECUTION ENGINE (Executes hash joins, sorting, & aggregation)',
        'ANALYTICS RESULT (Returns optimized business dataset)',
      ],
    },
    topics: [
      {
        category: 'SQL Query Fundamentals',
        items: [
          'Core Clauses: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, DISTINCT, LIMIT / OFFSET',
          'Conditional Logic: CASE WHEN ... THEN ... ELSE ... END statements',
          'Aggregation functions: COUNT, SUM, AVG, MIN, MAX, ARRAY_AGG, STRING_AGG',
          'Data types: VARCHAR, TEXT, INTEGER, BIGINT, NUMERIC, TIMESTAMP WITH TIME ZONE, JSONB, BOOLEAN',
          'String & Date Functions: DATE_TRUNC, EXTRACT, INTERVAL arithmetic, CONCAT, COALESCE, NULLIF',
        ],
      },
      {
        category: 'Relational Joins & Set Operations',
        items: [
          'Join mechanics: INNER JOIN, LEFT OUTER JOIN, RIGHT OUTER JOIN, FULL OUTER JOIN',
          'Advanced Joins: CROSS JOIN (Cartesian product), Self-Joins (hierarchical data), Anti-Joins (WHERE right.id IS NULL)',
          'Join algorithms: Nested Loop Join, Hash Join, Merge Join (how the database executes joins internally)',
          'Set operations: UNION, UNION ALL (performance difference), INTERSECT, EXCEPT',
        ],
      },
      {
        category: 'Advanced Analytical SQL',
        items: [
          'Common Table Expressions (CTEs): WITH cte_name AS (...) and Recursive CTEs',
          'Subqueries: Scalar subqueries, correlated subqueries, and EXISTS / NOT EXISTS clauses',
          'Window Functions: OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN ...)',
          'Ranking functions: ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE()',
          'Value window functions: LAG() and LEAD() for period-over-period delta calculations, FIRST_VALUE(), LAST_VALUE()',
          'Cumulative aggregations: Running sums and moving averages across time windows',
        ],
      },
      {
        category: 'Database Internals & Performance Optimization',
        items: [
          'Schema Constraints: PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK constraints',
          'Indexing strategies: B-Tree indexes, Composite indexes, Partial indexes, GIN indexes for JSONB',
          'Query Profiling: Reading EXPLAIN and EXPLAIN ANALYZE execution plans (Cost, Seq Scan, Index Scan)',
          'Transactions & ACID properties: Atomicity, Consistency, Isolation, Durability (BEGIN, COMMIT, ROLLBACK)',
          'Database Views and Materialized Views (refreshing materialized views for analytics acceleration)',
        ],
      },
    ],
    keyConcepts: [
      'Window Functions (PARTITION BY & LAG/LEAD)',
      'Common Table Expressions (CTEs) vs Subqueries',
      'EXPLAIN ANALYZE Execution Plans & Index Utilization',
      'ACID Transaction Guarantees & Lock Management',
      'Materialized Views & Analytical Query Caching',
    ],
    practiceSuggestions: [
      'Write a SQL query using LAG() to calculate month-over-month revenue growth percentage for each product category.',
      'Use ROW_NUMBER() inside a CTE to deduplicate an event table containing duplicate customer actions, keeping only the latest event.',
      'Profile a slow query on a 1,000,000-row table using EXPLAIN ANALYZE, add an appropriate composite B-Tree index, and demonstrate an 80%+ execution time reduction.',
    ],
    projectSuggestions: [
      {
        title: 'Complete E-Commerce Analytics Database & Query Suite',
        description: 'A PostgreSQL schema with tables, foreign key constraints, indexes, and a collection of complex analytical queries computing cohort retention, churn rates, and running revenue totals.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Using SELECT * in production queries, causing unnecessary network I/O and breaking downstream schema contracts.',
      'Using UNION instead of UNION ALL when duplicate deduplication is not required, forcing expensive sorting operations.',
      'Applying functions to indexed columns in WHERE clauses (e.g. WHERE DATE(created_at) = ...), invalidating the index and forcing full table scans.',
    ],
    nextStepPreview: 'Learn Linux environments, shell automation, and Git collaboration workflows in Stage 03: Linux, Git & Development Workflow.',
  },
  {
    id: 'linux-git-workflow',
    stageNumber: '03',
    title: 'Linux, Git & Development Workflow',
    shortTitle: 'Linux & Git',
    tagline: 'Master Linux server administration, Bash shell automation, SSH keys, cron scheduling, and Git collaboration.',
    iconName: 'Terminal',
    goal: 'Become comfortable working in development environments, servers, and collaborative codebases.',
    whyItMatters:
      'Data engineering systems run on Linux servers, cloud VMs, and containerized clusters. A data engineer must navigate server filesystems, write Bash automation scripts, manage background pipeline processes, and use Git branch workflows for team collaboration.',
    learningOutcome: 'Work confidently with Linux environments and professional Git workflows.',
    recommendedApproach:
      'Use Linux or WSL2 daily. Write Bash scripts to automate file downloads and pipeline executions, configure cron jobs, and practice Git feature branch, PR, and rebase workflows.',
    technologies: ['Ubuntu Linux', 'Bash', 'Git & GitHub', 'SSH', 'tmux / htop', 'cron'],
    topics: [
      {
        category: 'Linux Operating System & Navigation',
        items: [
          'Linux directory hierarchy (/var, /etc, /opt, /home, /tmp, /usr)',
          'File operations: cd, ls -la, mkdir -p, cp -r, mv, rm -rf, touch',
          'File viewing & searching: cat, less, head, tail -f (streaming logs), grep -rn, find',
          'Permissions and ownership: chmod (755, 644, rwx), chown, user groups',
          'Process management: ps aux, top, htop, kill, pkill, backgrounding jobs (nohup, &)',
          'System metrics inspection: df -h (disk space), free -m (RAM), du -sh (directory sizes)',
        ],
      },
      {
        category: 'Shell Scripting & Command-Line Automation',
        items: [
          'Bash fundamentals: Variables, conditionals (if/else), loops (for/while), arguments ($1, $2, $#)',
          'Pipes (|) and Redirection (>, >>, 2>&1) for chaining command outputs and capturing logs',
          'Text processing utilities: awk, sed, cut, sort, uniq -c for fast log file analysis',
          'Environment variables: export, ~/.bashrc, env, /etc/environment',
          'Task scheduling with cron: Crontab syntax (minute hour day month weekday) for scheduled jobs',
        ],
      },
      {
        category: 'Networking & Remote Server Access',
        items: [
          'SSH: Generating keypairs (ssh-keygen), ~/.ssh/authorized_keys, ~/.ssh/config, passwordless login',
          'File transfer: scp and rsync (differential synchronization) across remote servers',
          'Network utilities: curl, wget, netstat, lsof -i (checking port availability), ping',
          'Terminal multiplexers: tmux for persistent remote server sessions that survive SSH disconnects',
        ],
      },
      {
        category: 'Professional Git & GitHub Workflows',
        items: [
          'Git fundamentals: init, status, add, commit, diff, log --oneline --graph',
          'Branch management: branch, checkout -b, merge, rebase vs merge trade-offs, stash',
          'GitHub collaboration: Pull requests, branch protection rules, code reviews, resolving merge conflicts',
          'Managing .gitignore for data projects (ignoring large datasets, virtualenvs, .env credentials, logs)',
        ],
      },
    ],
    keyConcepts: [
      'Linux Permissions & Process Management (htop/ps)',
      'Bash Pipelines, Text Stream Processing (awk/sed) & Redirection',
      'SSH Keypair Authentication & Rsync File Synchronization',
      'Automated Cron Job Scheduling & Log Rotation',
      'Git Feature Branching, Pull Requests & Merge Conflict Resolution',
    ],
    practiceSuggestions: [
      'Write a Bash script that downloads a daily CSV dataset using curl, checks its file size, moves it to an archive directory, and logs execution timestamps to /var/log/pipeline.log.',
      'Set up a cron job that runs a Python data extraction script every morning at 6:00 AM UTC and redirects stdout/stderr to a timestamped log file.',
      'Use awk, grep, and sort to parse a 500,000-line server access log and find the top 10 IP addresses with the highest number of 500 Internal Server Errors.',
    ],
    projectSuggestions: [
      {
        title: 'Automated Data Extraction & Server Maintenance Script Suite',
        description: 'A modular Bash automation suite featuring automated remote data downloads via curl, disk space threshold health checks, cron scheduling, and Git-versioned deployment scripts.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Committing raw CSV/Parquet data files or sensitive credentials into Git repositories instead of using .gitignore.',
      'Running daily scripts as root (sudo) rather than configuring dedicated service accounts with least-privilege permissions.',
      'Writing Bash scripts without set -e or error checking, allowing pipelines to silently proceed after intermediate step failures.',
    ],
    nextStepPreview: 'Learn how to structure databases for analytics and operational systems in Stage 04: Data Modeling.',
  },
  {
    id: 'data-modeling',
    stageNumber: '04',
    title: 'Data Modeling (Star Schema & Normalization)',
    shortTitle: 'Data Modeling',
    tagline: 'Learn how to structure operational and analytical databases using 3NF normalization, Star schemas, and Slowly Changing Dimensions.',
    iconName: 'Layers',
    goal: 'Learn how to structure data efficiently for operational systems and analytics.',
    whyItMatters:
      'Poor data modeling causes slow query performance, redundant data, pipeline fragility, and incorrect business reporting. A data engineer must know when to normalize (OLTP) and when to denormalize into dimensional Star/Snowflake schemas (OLAP).',
    learningOutcome: 'Design data structures that are reliable, scalable, and optimized for analytics.',
    recommendedApproach:
      'Master Kimball Dimensional Modeling. Understand the core building blocks: Fact tables (metrics), Dimension tables (context), Star Schema vs Snowflake Schema, and Slowly Changing Dimensions (SCD Type 1 & Type 2).',
    technologies: ['PostgreSQL', 'dbdiagram.io', 'DBeaver', 'SQL', 'Kimball Methodology'],
    visualIntuition: {
      label: 'The Star Schema Analytical Architecture',
      steps: [
        'DIM_CUSTOMERS (Customer demographic & address context)',
        'DIM_PRODUCTS (Product categories, pricing, & SKU attributes)',
        'DIM_DATE (Calendar dates, quarters, holidays, & fiscal periods)',
        'FACT_SALES (Central fact table: quantity, revenue, discount metrics)',
        'DIM_STORES (Store locations, regions, & manager details)',
      ],
    },
    topics: [
      {
        category: 'Relational Data Modeling & Normalization (OLTP)',
        items: [
          'Entity-Relationship Diagrams (ERD): Entities, attributes, relationships, cardinality (1:1, 1:N, N:M)',
          'Normalization principles: Eliminating insertion, update, and deletion anomalies',
          'Normal Forms: First Normal Form (1NF: atomic values), Second Normal Form (2NF: full functional dependency), Third Normal Form (3NF: no transitive dependency)',
          'OLTP vs OLAP modeling trade-offs: Write-heavy transactional normalization vs read-heavy analytical denormalization',
        ],
      },
      {
        category: 'Dimensional Modeling (Kimball Methodology / OLAP)',
        items: [
          'Fact Tables: Quantitative numerical measurements, metrics, and foreign keys (e.g. Sales, Orders, Clicks)',
          'Dimension Tables: Descriptive textual context used for filtering, grouping, and slicing (e.g. Customer, Date, Product)',
          'Star Schema: Denormalized dimension tables directly surrounding a central fact table (simple queries, ultra-fast joins)',
          'Snowflake Schema: Normalized dimension tables creating sub-dimensions (less storage redundancy, more complex joins)',
          'Fact Table Types: Transaction facts (single point in time), Periodic Snapshot facts (monthly balances), Accumulating Snapshot facts (order fulfillment lifecycle)',
        ],
      },
      {
        category: 'Slowly Changing Dimensions (SCD)',
        items: [
          'Why SCD matters: Tracking how customer addresses, product prices, or employee titles change over time',
          'SCD Type 0: Retain original value (never overwrite)',
          'SCD Type 1: Overwrite existing record (no historical tracking)',
          'SCD Type 2: Add new row with surrogate key, start_date, end_date, and is_current active flag (full history tracking)',
          'SCD Type 3: Add new column to store previous value (limited history)',
        ],
      },
      {
        category: 'Keys, Grain & Data Warehouse Design',
        items: [
          'Defining the Grain: The exact level of detail represented by a single row in the fact table (critical first step)',
          'Natural Keys / Business Keys vs Surrogate Keys (auto-incrementing or UUID keys generated for warehouse dimensions)',
          'Conformed Dimensions: Shared dimension tables used across multiple fact tables (e.g. shared Dim_Date across Sales and Inventory)',
          'Junk Dimensions (combining low-cardinality flags/statuses) and Degenerate Dimensions (order numbers kept in fact table)',
        ],
      },
    ],
    keyConcepts: [
      'Kimball Dimensional Modeling & Fact/Dimension Tables',
      'Star Schema vs Snowflake Schema Trade-offs',
      'Fact Table Grain Definition (Transactional vs Snapshot)',
      'Slowly Changing Dimensions (SCD Type 1 vs Type 2)',
      'Surrogate Keys vs Natural Business Keys',
    ],
    practiceSuggestions: [
      'Design an ER diagram on dbdiagram.io for an e-commerce platform normalizing raw transactions into 3NF for operational use.',
      'Convert the 3NF e-commerce schema into a Star Schema with a central Fact_Orders table surrounded by Dim_Users, Dim_Products, Dim_Date, and Dim_PaymentMethod.',
      'Write a SQL transformation script that implements SCD Type 2 logic for a Dim_Customer table, expiring old addresses and inserting new active rows.',
    ],
    projectSuggestions: [
      {
        title: 'E-Commerce Enterprise Dimensional Data Warehouse Model',
        description: 'A complete dimensional data warehouse design and DDL implementation featuring Star Schemas, conformed Date and Customer dimensions, SCD Type 2 tracking, and automated analytical view queries.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Failing to explicitly define the Grain of a fact table before building schemas, leading to double-counting and aggregation errors.',
      'Applying strict 3NF normalization to analytical data warehouses, forcing analysts to write 12-table joins for simple dashboards.',
      'Using natural business keys (like email or national ID) as primary keys in dimension tables instead of surrogate integer/UUID keys.',
    ],
    nextStepPreview: 'Build automated data extraction, transformation, and loading pipelines in Stage 05: ETL & ELT Pipelines.',
  },
  {
    id: 'etl-elt-pipelines',
    stageNumber: '05',
    title: 'ETL & ELT Pipelines',
    shortTitle: 'ETL / ELT Pipelines',
    tagline: 'Transform raw, messy data from APIs, logs, and databases into clean, reliable, structured datasets using modern ETL and ELT patterns.',
    iconName: 'Workflow',
    goal: 'Learn how raw data becomes clean, structured, usable data.',
    whyItMatters:
      'Data pipelines are the plumbing of the data ecosystem. Data engineers must design resilient extraction, transformation, and loading workflows that handle network failures, schema changes, incremental batches, and ensure idempotency (running twice produces identical results).',
    learningOutcome: 'Build reliable automated pipelines instead of manually moving data.',
    recommendedApproach:
      'Master the distinction between ETL (transform before loading) and ELT (load raw data into cloud warehouse, then transform with SQL/dbt). Focus on idempotency, incremental loading, and error handling.',
    technologies: ['Python', 'SQL', 'dbt (Data Build Tool)', 'PostgreSQL', 'DuckDB', 'Pandas / Polars'],
    visualIntuition: {
      label: 'ETL vs ELT Architecture Flow',
      steps: [
        'ETL: SOURCE → EXTRACT → TRANSFORM (Python server) → LOAD → TARGET WAREHOUSE',
        'ELT: SOURCE → EXTRACT → LOAD RAW DATA → TARGET WAREHOUSE → TRANSFORM (SQL/dbt)',
        'INCREMENTAL: EXTRACT WHERE updated_at > last_watermark → UPSERT INTO TARGET',
        'IDEMPOTENCY: Re-running pipeline for date T always produces exact same final state',
      ],
    },
    topics: [
      {
        category: 'ETL vs ELT Paradigms',
        items: [
          'ETL (Extract, Transform, Load): Traditional approach where dedicated compute servers transform data before warehouse loading',
          'ELT (Extract, Load, Transform): Modern cloud approach where raw data is loaded directly into scalable cloud warehouses and transformed in-place using SQL',
          'When to use ETL vs ELT: Privacy/masking requirements, cloud compute costs, and transformation complexity',
          'Data transformation with dbt (data build tool): SQL-based declarative transformations, version control, and automated documentation',
        ],
      },
      {
        category: 'Data Sources & Extraction Strategies',
        items: [
          'Ingesting from diverse sources: REST APIs, relational databases (PostgreSQL/MySQL), CSV/Parquet files, object storage, webhooks',
          'Full Refresh vs Incremental Loading: Ingesting entire tables vs ingesting only new/updated rows',
          'Watermarking: Tracking high-watermark timestamps (e.g. updated_at >= last_sync_time) to filter incremental changes',
          'Change Data Capture (CDC) concepts: Streaming row-level inserts, updates, and deletes from database write-ahead logs (WAL/Binlog)',
        ],
      },
      {
        category: 'Transformation, Cleaning & Data Structuring',
        items: [
          'Data type casting and standardizing date/timestamp formats',
          'Handling missing data: Imputation, dropping invalid records, tagging with default null indicators',
          'Deduplication: Removing duplicate records using unique business keys and timestamps',
          'Data normalization, string stripping, and flattening nested JSON arrays into relational rows',
        ],
      },
      {
        category: 'Pipeline Reliability & Idempotency',
        items: [
          'What is Idempotency? Designing pipelines such that running a job multiple times with identical inputs produces the exact same output',
          'Upsert operations: INSERT ON CONFLICT DO UPDATE (Merge / Upsert) to prevent duplicate records on pipeline reruns',
          'Staging tables: Writing raw data into temporary staging tables before committing transactions to production tables',
          'Retry mechanisms: Exponential backoff with jitter for handling transient network and API rate-limit errors',
        ],
      },
    ],
    keyConcepts: [
      'ETL vs ELT Architecture & dbt Transformation Modeling',
      'Idempotent Pipeline Design & UPSERT / Merge Logic',
      'Incremental Loading with High-Watermark Timestamps',
      'Change Data Capture (CDC) Fundamentals',
      'Staging Table Isolation & Transaction Atomicity',
    ],
    practiceSuggestions: [
      'Build a Python ETL pipeline that extracts user activity records from a REST API, cleans null values, deduplicates rows, and loads them into a PostgreSQL database using an UPSERT pattern.',
      'Implement high-watermark incremental loading: record the last processed timestamp in a control table, and ensure subsequent pipeline runs only extract newly updated rows.',
      'Use dbt (or SQL CTEs) to build an ELT pipeline transforming raw event data in a staging table into an analytics-ready daily active users metric table.',
    ],
    projectSuggestions: [
      {
        title: 'Automated Incremental ELT Pipeline with PostgreSQL & dbt',
        description: 'An end-to-end ELT pipeline extracting API transactional data, loading raw JSON into PostgreSQL staging tables, and using dbt models to clean, deduplicate, and build star-schema analytics marts.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Building non-idempotent pipelines that blindly APPEND data, resulting in duplicate records every time a failed pipeline is re-run.',
      'Performing full table refreshes on multi-million row tables daily instead of designing incremental watermark syncs.',
      'Failing to implement exponential backoff retries on external API requests, causing pipelines to crash on temporary network blips.',
    ],
    nextStepPreview: 'Scale analytical storage from single databases to enterprise data warehouses and lakehouses in Stage 06: Data Warehousing.',
  },
  {
    id: 'data-warehousing',
    stageNumber: '06',
    title: 'Data Warehousing & Lakehouse Architecture',
    shortTitle: 'Data Warehousing',
    tagline: 'Learn how organizations store, partition, and query terabytes of analytical data using Snowflake, BigQuery, and Lakehouse platforms.',
    iconName: 'Warehouse',
    goal: 'Learn how organizations store large amounts of analytical data.',
    whyItMatters:
      'Traditional relational databases choke on massive analytical queries. Modern cloud data warehouses (Snowflake, BigQuery, Redshift) and Lakehouses separate compute from storage, use columnar compression, and scale across distributed clusters to query billions of rows in seconds.',
    learningOutcome: 'Understand how modern organizations build analytical data platforms.',
    recommendedApproach:
      'Understand the architecture of Columnar Storage (Parquet, ORC), Partitioning, Clustering, and the evolution from Data Warehouses and Data Lakes to modern unified Data Lakehouses (Delta Lake, Apache Iceberg).',
    technologies: ['Snowflake', 'Google BigQuery', 'Amazon Redshift', 'Databricks', 'Apache Iceberg / Delta Lake'],
    visualIntuition: {
      label: 'The Modern Data Platform Architecture',
      steps: [
        'DATA SOURCES (APIs, transactional DBs, application logs, telemetry)',
        'DATA LAKE (Raw unstructured & semi-structured storage in S3/GCS)',
        'LAKEHOUSE LAYER (ACID transactions on open table formats: Iceberg / Delta)',
        'DATA WAREHOUSE (Curated dimensional tables with columnar clustering)',
        'DATA MARTS / BI (Business-specific models for Tableau, Looker, & ML)',
      ],
    },
    topics: [
      {
        category: 'Data Warehouse Internals & Columnar Storage',
        items: [
          'Row-oriented storage (PostgreSQL/MySQL - fast single row writes) vs Columnar storage (Snowflake/BigQuery - fast analytical aggregations)',
          'Columnar compression techniques: Run-Length Encoding (RLE), Dictionary encoding, Bit packing',
          'Separation of Compute and Storage: Scaling compute clusters on-demand without migrating underlying disk storage',
          'Massively Parallel Processing (MPP): Distributing query execution across hundreds of compute nodes',
        ],
      },
      {
        category: 'Data Warehouse Platforms Comparison',
        items: [
          'Snowflake: Virtual Warehouses, Time Travel, Zero-Copy Cloning, Micro-partitions',
          'Google BigQuery: Serverless architecture, slot allocation, federated queries, BI Engine',
          'Amazon Redshift: Provisioned clusters vs Redshift Serverless, RA3 nodes, Redshift Spectrum',
          'Databricks: Spark-powered unified analytics, Delta Lake, Unity Catalog governance',
        ],
      },
      {
        category: 'Partitioning & Clustering Strategies',
        items: [
          'Table Partitioning: Dividing large tables by date or region to enable partition pruning (scanning only relevant partitions)',
          'Clustering Keys: Sorting data within partitions to speed up range filters and join operations',
          'Impact on query cost and performance: Reducing scanned bytes from terabytes down to megabytes',
          'Materialized Views and Query Caching in cloud warehouses',
        ],
      },
      {
        category: 'Data Lake & Lakehouse Architecture',
        items: [
          'What is a Data Lake? Object storage (S3/GCS/Blob) storing raw unstructured, semi-structured, and structured data cheaply',
          'The Data Swamp problem: Ungoverned data lakes without schemas, metadata, or quality controls',
          'The Data Lakehouse: Bringing ACID transactions, time travel, schema enforcement, and SQL performance to data lakes',
          'Open Table Formats: Apache Iceberg, Delta Lake, and Apache Hudi',
        ],
      },
    ],
    keyConcepts: [
      'Columnar Storage vs Row-Oriented Storage Mechanics',
      'Separation of Compute and Storage in Cloud Warehouses',
      'Table Partitioning & Clustering for Query Pruning',
      'Data Lakehouse Architecture with Apache Iceberg / Delta Lake',
      'Snowflake Virtual Warehouses & BigQuery Serverless Slots',
    ],
    practiceSuggestions: [
      'Create a partitioned and clustered table in BigQuery or Snowflake loaded with a 10-million row public dataset (e.g. NYC Taxi data) and compare query latency and scanned bytes before and after partitioning.',
      'Use Snowflake Time Travel or Delta Lake Time Travel to query historical data from 1 hour ago and restore an accidentally overwritten table.',
      'Build a dimensional data mart in a cloud data warehouse that aggregates raw clickstream events into daily executive KPI metrics.',
    ],
    projectSuggestions: [
      {
        title: 'Cloud Data Warehouse & Analytics Mart on BigQuery / Snowflake',
        description: 'A complete analytical warehouse solution featuring partitioned tables, clustering keys, materialized views, role-based access control, and automated daily dbt transformation models.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Running queries with SELECT * on unpartitioned cloud data warehouse tables, scanning terabytes of unnecessary data and running up massive cloud bills.',
      'Over-partitioning tables into thousands of tiny files (the "small files problem"), degrading query performance.',
      'Treating a Data Lake as an unorganized dump without schema governance, creating an unmaintainable data swamp.',
    ],
    nextStepPreview: 'Process massive distributed datasets across computing clusters in Stage 07: Big Data & Apache Spark.',
  },
  {
    id: 'big-data-spark',
    stageNumber: '07',
    title: 'Big Data & Distributed Computing with Apache Spark',
    shortTitle: 'Big Data & Spark',
    tagline: 'Master distributed data processing, memory management, PySpark DataFrames, shuffling optimization, and Parquet storage.',
    iconName: 'Sparkles',
    goal: 'Learn how to process datasets that are too large or expensive to process using traditional single-machine tools.',
    whyItMatters:
      'When datasets grow to hundreds of gigabytes or terabytes, single-machine libraries like Pandas run out of memory. Apache Spark is the industry standard distributed computing engine that splits computations across worker nodes, enabling high-throughput parallel data processing.',
    learningOutcome: 'Understand distributed data processing and work with large-scale datasets.',
    recommendedApproach:
      'Master PySpark. Understand the Spark Execution Model (Driver, Executors, Jobs, Stages, Tasks), Lazy Evaluation, Transformations vs Actions, and optimize Spark jobs by minimizing expensive Shuffles and Broadcast Joins.',
    technologies: ['Apache Spark', 'PySpark', 'Parquet', 'Delta Lake', 'Hadoop HDFS concepts'],
    visualIntuition: {
      label: 'Apache Spark Distributed Execution Architecture',
      steps: [
        'SPARK DRIVER (Converts PySpark code into DAG execution plan)',
        'DAG SCHEDULER (Splits job into Stages based on shuffle boundaries)',
        'TASK SCHEDULER (Launches parallel tasks across Worker Nodes)',
        'EXECUTORS (Worker processes compute tasks in parallel on data partitions)',
        'DISTRIBUTED STORAGE (Reads & writes partitioned Parquet files in S3/HDFS)',
      ],
    },
    topics: [
      {
        category: 'Distributed Computing Core Concepts',
        items: [
          'Why distributed computing? Horizontal scaling (adding nodes) vs Vertical scaling (adding RAM)',
          'Parallel processing, data partitioning, and worker node failure handling',
          'The concept of Shuffling: Data movement across the network between nodes (the #1 performance bottleneck)',
          'Distributed storage systems: Hadoop Distributed File System (HDFS) and Cloud Object Storage (S3/GCS)',
        ],
      },
      {
        category: 'Apache Spark Architecture & Execution',
        items: [
          'Spark Cluster Architecture: Driver Program, Cluster Manager (YARN, K8s, Standalone), Worker Nodes, Executors',
          'Spark Applications: Jobs, Stages (separated by shuffle boundaries), and Tasks (unit of execution per partition)',
          'Lazy Evaluation: Spark builds an execution plan and only executes computations when an Action is called',
          'Transformations (map, filter, join, groupBy - return new DataFrame) vs Actions (count, show, collect, write - trigger execution)',
          'Narrow Transformations (filter, select - no shuffle) vs Wide Transformations (groupBy, join - requires network shuffle)',
        ],
      },
      {
        category: 'PySpark DataFrames & SQL',
        items: [
          'Creating PySpark DataFrames from CSV, JSON, and Parquet files',
          'DataFrame API: select(), filter(), withColumn(), groupBy(), agg(), join(), orderBy()',
          'PySpark SQL: spark.sql("SELECT ...") querying temporary registered views',
          'User Defined Functions (UDFs) vs native Spark SQL built-in functions (performance comparison)',
          'PySpark Window Functions for distributed ranking and rolling aggregations',
        ],
      },
      {
        category: 'Spark Optimization & Best Practices',
        items: [
          'Broadcast Joins (broadcast()): Broadcasting small lookup tables to all executors to eliminate large shuffles',
          'Partition tuning: repartition() vs coalesce(), tuning spark.sql.shuffle.partitions',
          'Caching and Persistence: df.cache() and df.persist(StorageLevel) for reusable intermediate DataFrames',
          'Catalyst Optimizer & Tungsten Engine: Whole-stage code generation and query optimization',
          'Inspecting execution plans: df.explain(True) and debugging Spark UI (stages, task skew, spill to disk)',
        ],
      },
    ],
    keyConcepts: [
      'Spark Driver, Executor & Task Cluster Architecture',
      'Lazy Evaluation & DAG Computation Graphs',
      'Narrow vs Wide Transformations & Network Shuffles',
      'Broadcast Hash Joins for Large-to-Small Table Joins',
      'Partition Management (repartition vs coalesce)',
    ],
    practiceSuggestions: [
      'Load a 5GB dataset in PySpark, apply filtering and aggregations, and compare execution times using native functions vs Python UDFs.',
      'Optimize a slow distributed join between a 10-million row fact DataFrame and a 5,000-row dimension DataFrame using broadcast().',
      'Inspect the Spark UI to identify data skew in a stage, and tune spark.sql.shuffle.partitions to eliminate task spill to disk.',
    ],
    projectSuggestions: [
      {
        title: 'Distributed Big Data Processing Engine with PySpark & Parquet',
        description: 'A distributed data processing pipeline using PySpark that ingests multi-gigabyte raw event logs, cleans text records, performs optimized broadcast joins, and writes partitioned columnar Parquet datasets.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Calling df.collect() on massive distributed DataFrames, attempting to pull terabytes of data into the single Driver node and causing Driver OOM crashes.',
      'Using slow Python User Defined Functions (UDFs) instead of native PySpark built-in functions, disabling Catalyst optimizer optimizations.',
      'Ignoring data skew, where 99% of tasks finish in seconds while 1 executor stalls for 30 minutes on a massive skewed partition.',
    ],
    nextStepPreview: 'Automate, schedule, and orchestrate multi-step data pipelines in Stage 08: Workflow Orchestration.',
  },
  {
    id: 'workflow-orchestration-airflow',
    stageNumber: '08',
    title: 'Workflow Orchestration with Apache Airflow',
    shortTitle: 'Workflow Orchestration',
    tagline: 'Schedule, monitor, automate, and manage dependencies across complex enterprise data pipelines with Apache Airflow.',
    iconName: 'GitFork',
    goal: 'Automate, schedule, monitor, and manage complex data pipelines.',
    whyItMatters:
      'Production data engineering is not a collection of disconnected scripts running on cron. It requires a workflow orchestrator to manage task dependencies, automatically retry on failure, handle backfills, send alerts, and provide a centralized monitoring UI.',
    learningOutcome: 'Build and manage scheduled production data workflows.',
    recommendedApproach:
      'Master Apache Airflow. Understand Directed Acyclic Graphs (DAGs), Operators, Tasks, Sensors, the TaskFlow API (@task), and design idempotent tasks with clean parameterization and failure alerting.',
    technologies: ['Apache Airflow', 'Docker', 'PostgreSQL', 'Prefect concepts', 'Dagster concepts'],
    visualIntuition: {
      label: 'The Airflow Directed Acyclic Graph (DAG) Pipeline',
      steps: [
        'START TRIGGER (Scheduled cron trigger / event webhook)',
        'EXTRACT TASK (PythonOperator pulls raw data from source API)',
        'DATA VALIDATION SENSOR (Waits for raw file landing & validates schema)',
        'SPARK TRANSFORM TASK (Submits distributed Spark transformation job)',
        'DBT RUN TASK (Executes SQL data models inside cloud warehouse)',
        'QUALITY TEST & ALERT (Runs dbt tests & sends Slack notification on success/fail)',
      ],
    },
    topics: [
      {
        category: 'Workflow Orchestration Fundamentals',
        items: [
          'Why workflow orchestrators? Overcoming cron limitations (dependency management, visual UI, retry logic, historical backfills)',
          'Directed Acyclic Graphs (DAGs): Nodes (tasks), directed edges (dependencies), and topological sorting',
          'Orchestrator landscape: Apache Airflow (industry standard), Prefect (modern Pythonic flows), Dagster (data-asset centric)',
        ],
      },
      {
        category: 'Apache Airflow Architecture & Core Components',
        items: [
          'Airflow Architecture: Webserver (UI), Scheduler (DAG parser & trigger), Metadata Database (PostgreSQL), Executor (Celery / Kubernetes / Local)',
          'Airflow Workers: Distributed worker nodes executing tasks from message queues (Redis / RabbitMQ)',
          'Core Primitives: DAGs, Operators, Tasks, Task Instances, Execution Dates, Data Intervals',
        ],
      },
      {
        category: 'Building DAGs with Modern Airflow',
        items: [
          'Airflow Operators: PythonOperator, BashOperator, SQLExecuteQueryOperator, DockerOperator',
          'Airflow TaskFlow API: Using @dag and @task decorators for clean, Pythonic DAG authoring',
          'Task Dependencies: Setting linear (task1 >> task2 >> task3) and branching (BranchPythonOperator) dependencies',
          'Passing metadata with XComs (Cross-Communication) vs writing large data to cloud object storage',
          'Sensors: FileSensor, ExternalTaskSensor, S3KeySensor for waiting on external events',
        ],
      },
      {
        category: 'Production Pipeline Design & Operations',
        items: [
          'Idempotency in DAGs: Ensuring historical re-runs and backfills produce deterministic results without duplicates',
          'Scheduling and Catchup: schedule_interval (cron/timedelta), catchup=False vs catchup=True for backfilling historical dates',
          'Retries & Timeouts: retries, retry_delay, execution_timeout, exponential backoff',
          'Connection & Secrets Management: Airflow Connections, Variables, and environment secrets',
          'Alerting & Callbacks: on_failure_callback and on_success_callback sending Slack/Email webhook alerts',
        ],
      },
    ],
    keyConcepts: [
      'Directed Acyclic Graph (DAG) Task Dependency Modeling',
      'Airflow Webserver, Scheduler, Database & Executor Architecture',
      'Airflow TaskFlow API (@dag & @task decorators)',
      'Idempotent Historical Backfills & Execution Date Intervals',
      'Automated Retries, Sensors & Slack Failure Webhook Callbacks',
    ],
    practiceSuggestions: [
      'Write an Airflow DAG with 4 dependent tasks: extract_api_data >> validate_schema >> transform_data >> load_to_postgres.',
      'Configure task retry parameters with 3 retries and 2-minute exponential backoffs, and attach an on_failure_callback that logs alert details.',
      'Perform a historical backfill in Airflow using the CLI (airflow dags backfill) to reprocess 30 days of data deterministically.',
    ],
    projectSuggestions: [
      {
        title: 'Production Automated Daily ETL Orchestrator with Airflow & Docker',
        description: 'A fully containerized Apache Airflow deployment orchestrating a daily multi-stage pipeline that ingests external data, runs quality checks, updates warehouse tables, and triggers Slack alerts.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Passing heavy DataFrames directly through Airflow XComs, overloading the metadata PostgreSQL database (XComs are only for lightweight metadata).',
      'Writing top-level database queries or heavy computations directly in the DAG definition file, running on every scheduler heartbeat parse.',
      'Setting catchup=True on unparameterized DAGs, accidentally launching hundreds of simultaneous concurrent runs on initial DAG activation.',
    ],
    nextStepPreview: 'Deploy and operate data platforms using managed cloud infrastructure in Stage 09: Cloud Data Engineering.',
  },
  {
    id: 'cloud-data-engineering',
    stageNumber: '09',
    title: 'Cloud Data Engineering (AWS / GCP / Azure)',
    shortTitle: 'Cloud Data Engineering',
    tagline: 'Understand cloud compute, object storage, serverless processing, IAM security, and managed data services across AWS, GCP, and Azure.',
    iconName: 'Cloud',
    goal: 'Learn how modern data platforms are deployed and operated in the cloud.',
    whyItMatters:
      'Modern data engineering happens in the cloud. Data engineers must understand cloud storage buckets (S3/GCS), serverless compute (Lambda/Cloud Functions), managed warehouses (BigQuery/Redshift), IAM permissions, and cloud cost management.',
    learningOutcome: 'Understand how modern cloud data platforms are designed.',
    recommendedApproach:
      'Do not try to master every cloud provider at once. Master core cloud patterns first (Compute, Object Storage, IAM, Managed Warehouse, Networking), then specialize in one major provider (AWS or GCP).',
    technologies: ['AWS (S3, Lambda, Glue, Redshift, Athena, EMR)', 'GCP (GCS, BigQuery, Cloud Functions, Pub/Sub)', 'Azure', 'Terraform Basics'],
    visualIntuition: {
      label: 'Cloud Data Engineering Architecture Flow',
      steps: [
        'DATA SOURCE (External API / on-premise transactional database)',
        'OBJECT STORAGE (AWS S3 / Google Cloud Storage raw landing bucket)',
        'SERVERLESS PROCESSING (AWS Lambda / Glue / GCP Cloud Functions)',
        'CLOUD WAREHOUSE (BigQuery / Snowflake / Amazon Redshift)',
        'IAM & SECURITY (Least-privilege roles & encrypted data at rest)',
      ],
    },
    topics: [
      {
        category: 'Cloud Fundamentals for Data Engineers',
        items: [
          'Core cloud primitives: Compute (VMs, serverless, containers), Storage, Networking, Databases',
          'Cloud Object Storage: AWS S3, Google Cloud Storage, Azure Blob Storage (bucket policies, lifecycle rules, storage classes)',
          'Identity & Access Management (IAM): Users, Roles, Policies, Service Accounts, and Least-Privilege access principles',
          'Cloud networking basics: VPCs, subnets, security groups, private endpoints for database isolation',
        ],
      },
      {
        category: 'AWS Data Ecosystem',
        items: [
          'Storage: Amazon S3 (landing, raw, curated tiers), S3 Glacier (archival)',
          'Compute & Serverless: AWS Lambda (event-driven ETL), AWS Glue (serverless Spark ETL & Data Catalog)',
          'Querying & Warehousing: Amazon Athena (serverless SQL on S3 files), Amazon Redshift, Amazon EMR (managed Spark/Hadoop)',
          'Event Streaming: Amazon Kinesis Data Streams and Managed Streaming for Kafka (MSK)',
        ],
      },
      {
        category: 'Google Cloud Platform (GCP) Data Ecosystem',
        items: [
          'Storage: Google Cloud Storage (GCS)',
          'Analytics & Warehousing: Google BigQuery (serverless SQL warehouse, partitioning, federated storage)',
          'Processing & Orchestration: Cloud Dataflow (Apache Beam), Cloud Dataproc (managed Spark), Cloud Composer (managed Airflow)',
          'Messaging: Google Cloud Pub/Sub (scalable event ingestion)',
        ],
      },
      {
        category: 'Cloud Cost Optimization & Security',
        items: [
          'Storage optimization: Configuring S3 lifecycle rules to transition old raw files to cold storage',
          'Compute right-sizing: Spot / Preemptible instances for batch Spark workloads',
          'Data security: Encryption at rest (KMS / customer-managed keys) and in transit (TLS/SSL)',
          'Infrastructure as Code (IaC) basics with Terraform to provision reproducible cloud resources',
        ],
      },
    ],
    keyConcepts: [
      'Cloud Object Storage (S3 / GCS) Landing & Curated Zones',
      'IAM Roles, Service Accounts & Least-Privilege Policies',
      'Serverless Data Processing (AWS Lambda / GCP Functions)',
      'Serverless SQL Querying on Data Lakes (Athena / BigQuery)',
      'Infrastructure as Code (IaC) with Terraform for Data Stacks',
    ],
    practiceSuggestions: [
      'Create an AWS S3 bucket (or GCS bucket), upload raw CSV files using Python (boto3 / google-cloud-storage), and query the files directly using Amazon Athena or BigQuery External Tables.',
      'Build a serverless Lambda / Cloud Function triggered whenever a new JSON file lands in an object storage bucket, transforming and loading records into a database.',
      'Write a simple Terraform script to automatically provision an S3 storage bucket and an IAM service role with read-only access.',
    ],
    projectSuggestions: [
      {
        title: 'Serverless Cloud Data Lake & Analytics Pipeline on AWS / GCP',
        description: 'An automated cloud pipeline where file uploads to S3/GCS trigger serverless functions, catalog schemas in AWS Glue / BigQuery, and generate queryable analytical tables.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Using root cloud credentials or hardcoding AWS access keys in application code instead of attaching IAM roles.',
      'Configuring public read/write permissions on S3 buckets containing sensitive company data.',
      'Leaving high-cost cloud compute clusters running 24/7 after batch processing completes.',
    ],
    nextStepPreview: 'Process real-time continuous event streams in Stage 10: Streaming Data Engineering.',
  },
  {
    id: 'streaming-data-kafka',
    stageNumber: '10',
    title: 'Streaming Data Engineering with Apache Kafka',
    shortTitle: 'Streaming Data & Kafka',
    tagline: 'Learn how to ingest, process, and analyze continuous real-time event streams using Apache Kafka and streaming engines.',
    iconName: 'Zap',
    goal: 'Learn how to process data continuously as it is generated.',
    whyItMatters:
      'Batch pipelines run on hourly or daily schedules. Real-world systems—fraud detection, live order tracking, financial trading, sensor telemetry—require sub-second event processing. Apache Kafka is the backbone of distributed real-time streaming architectures.',
    learningOutcome: 'Understand how modern systems process continuously arriving data.',
    recommendedApproach:
      'Understand core Kafka primitives: Producers, Consumers, Topics, Partitions, Brokers, and Consumer Groups. Master the difference between Batch and Streaming processing.',
    technologies: ['Apache Kafka', 'Kafka Streams', 'PySpark Structured Streaming', 'Apache Flink concepts', 'Docker'],
    visualIntuition: {
      label: 'Real-Time Event Streaming Pipeline',
      steps: [
        'EVENT PRODUCER (Web app user click / IoT sensor emit)',
        'KAFKA BROKER (Distributed append-only commit log)',
        'TOPIC PARTITIONS (Parallel event partitions distributed across cluster)',
        'STREAM PROCESSOR (Kafka Streams / Flink / Spark Streaming aggregation)',
        'REAL-TIME SINK (Low-latency cache Redis / analytics database / alerts)',
      ],
    },
    topics: [
      {
        category: 'Batch vs Streaming Fundamentals',
        items: [
          'Batch Processing (bounded data, high throughput, high latency) vs Stream Processing (unbounded data, continuous, low latency)',
          'Event-driven architectures: Decoupling producers and consumers through asynchronous message brokers',
          'Message delivery semantics: At-most-once, At-least-once (with deduplication), Exactly-once processing (EOS)',
        ],
      },
      {
        category: 'Apache Kafka Architecture & Core Concepts',
        items: [
          'The Distributed Commit Log: Immutable, append-only, ordered sequence of records',
          'Kafka Core Primitives: Producers (send events), Consumers (read events), Brokers (servers), Clusters',
          'Topics & Partitions: Splitting topics across partitions for horizontal parallel throughput',
          'Consumer Groups: Load balancing partition consumption across multiple worker instances',
          'Offsets and Commit Management: Tracking the last read position of each consumer group',
          'Kafka Retention Policies: Time-based and size-based data retention on disk',
        ],
      },
      {
        category: 'Kafka with Python & Schema Governance',
        items: [
          'Writing Kafka Producers in Python (confluent-kafka, kafka-python): Serializing JSON and Avro payloads',
          'Writing Kafka Consumers in Python: Polling loops, error handling, manual offset commits',
          'Schema Registry (Confluent Schema Registry): Enforcing Avro/Protobuf schema contracts to prevent corrupt messages',
        ],
      },
      {
        category: 'Stream Processing Engines & Windowing',
        items: [
          'Stream processing concepts: Filtering, mapping, stateful transformations, stream-table duality',
          'Windowing: Tumbling windows (fixed non-overlapping), Sliding/Hopping windows (overlapping), Session windows (inactivity gap)',
          'Watermarking: Handling late-arriving out-of-order events in streaming data',
          'Stream processing tools: Kafka Streams, Apache Flink (low-latency stateful stream processing), Spark Structured Streaming',
        ],
      },
    ],
    keyConcepts: [
      'Distributed Immutable Commit Log Architecture',
      'Kafka Topics, Partitions & Consumer Group Scaling',
      'Consumer Offset Commit Management & Rebalance',
      'Tumbling, Sliding & Session Time Windowing',
      'Handling Out-of-Order Events with Watermarks',
    ],
    practiceSuggestions: [
      'Spin up a single-node Kafka cluster using Docker Compose, create a user-clicks topic with 3 partitions, and write a Python producer to emit simulated clickstream events.',
      'Build a Python consumer belonging to a consumer group that reads messages from the topic, parses JSON payloads, and prints running event counts.',
      'Implement a Spark Structured Streaming application that reads from a Kafka topic in real-time, calculates 5-minute tumbling window event counts, and writes output to console.',
    ],
    projectSuggestions: [
      {
        title: 'Real-Time Financial Transaction Anomaly Detection with Kafka',
        description: 'A streaming data pipeline where Python producers emit continuous simulated credit card transactions to a multi-partition Kafka topic, processed in real-time to detect anomalous high-velocity spending.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Creating a Kafka topic with only 1 partition and running 10 consumers in a consumer group (9 consumers will sit idle because only 1 consumer can read from 1 partition).',
      'Failing to handle duplicate messages under at-least-once delivery semantics (downstream consumers must be idempotent).',
      'Committing offsets before processing the message, causing data loss if the consumer crashes during processing.',
    ],
    nextStepPreview: 'Ensure data accuracy, testing, and governance across all pipelines in Stage 11: Data Quality, Testing & Governance.',
  },
  {
    id: 'data-quality-governance',
    stageNumber: '11',
    title: 'Data Quality, Testing & Data Governance',
    shortTitle: 'Data Quality & Governance',
    tagline: 'Build trustworthy data platforms using automated data quality testing, schema contracts, Great Expectations, and data lineage.',
    iconName: 'ShieldCheck',
    goal: 'Build data pipelines that can be trusted.',
    whyItMatters:
      'Bad data is worse than no data. If silent data corruption enters an analytics warehouse, executive decisions, financial reports, and ML models become flawed. Data engineers must enforce data contracts, automate quality tests, and maintain end-to-end data lineage.',
    learningOutcome: 'Build trustworthy and maintainable data platforms.',
    recommendedApproach:
      'Implement automated data quality checks at every pipeline stage using dbt tests and Great Expectations. Understand the 6 core dimensions of data quality and track data lineage.',
    technologies: ['Great Expectations', 'dbt tests', 'Soda Core', 'OpenLineage / Marquez', 'Pandera'],
    visualIntuition: {
      label: 'The Data Quality & Testing Gate Flow',
      steps: [
        'RAW DATA (Extracted from source)',
        'DATA VALIDATION GATE (Checks nulls, types, & schema contracts)',
        'TRANSFORMATION (Executes dbt / SQL transformation logic)',
        'ASSERTION TESTS (Validates uniqueness, foreign keys, & ranges)',
        'DATA LINEAGE GRAPH (Tracks provenance from source to dashboard)',
        'TRUSTED DATA MARTS (Delivered to business consumers with quality badge)',
      ],
    },
    topics: [
      {
        category: 'The 6 Dimensions of Data Quality',
        items: [
          'Accuracy: Does the data correctly reflect real-world values?',
          'Completeness: Are expected values missing (null rates, missing rows)?',
          'Consistency: Do values match across different database systems?',
          'Validity: Does data conform to specified formats, ranges, and schemas (e.g. valid emails, postal codes)?',
          'Uniqueness: Are there duplicate records violating business primary keys?',
          'Timeliness / Freshness: Is data available within expected SLA latency thresholds?',
        ],
      },
      {
        category: 'Automated Data Testing & Frameworks',
        items: [
          'Unit testing transformation code with pytest (testing business logic in isolation)',
          'Data testing with dbt: Built-in tests (unique, not_null, accepted_values, relationships)',
          'Custom singular and generic dbt tests for business logic rules',
          'Data assertion frameworks: Great Expectations (Expectation Suites, Checkpoints, Data Docs) and Soda Core',
          'Python DataFrame validation with Pandera (validating schemas and column distributions)',
        ],
      },
      {
        category: 'Data Contracts & Schema Evolution',
        items: [
          'What are Data Contracts? Formal agreements between data producers (software engineers) and data consumers (data engineers) defining schemas and SLAs',
          'Schema Evolution: Handling added columns, deprecated columns, and type changes without breaking downstream pipelines',
          'Backward vs Forward schema compatibility in Avro / JSON schemas',
        ],
      },
      {
        category: 'Data Governance, Lineage & Metadata',
        items: [
          'Data Lineage: Tracing data provenance from raw source API → ingestion pipeline → staging table → warehouse mart → BI dashboard',
          'OpenLineage and metadata cataloging platforms (DataHub, Marquez, Amundsen)',
          'Data Governance & Compliance: Role-Based Access Control (RBAC), column-level masking (PII data), GDPR / HIPAA compliance',
          'Data retention policies and automated compliance auditing',
        ],
      },
    ],
    keyConcepts: [
      'The 6 Dimensions of Enterprise Data Quality',
      'Automated Testing with Great Expectations & dbt Tests',
      'Data Contracts Between Producers & Consumers',
      'End-to-End Data Lineage & Metadata Tracking',
      'PII Data Masking, RBAC Security & Compliance',
    ],
    practiceSuggestions: [
      'Write a Great Expectations suite that tests an incoming customer dataset: asserts customer_id is not null and unique, age is between 18 and 120, and signup_date is valid.',
      'Configure dbt tests (unique, not_null, relationships) across staging and mart models, and configure the pipeline to fail and alert if any test fails.',
      'Build a data lineage diagram tracing how raw transactional data flows through transformation models into a final executive dashboard.',
    ],
    projectSuggestions: [
      {
        title: 'Automated Data Quality & Observability Framework',
        description: 'An enterprise data validation framework integrating Great Expectations and dbt tests into a CI/CD pipeline, automatically generating HTML Data Docs and triggering Slack alerts on schema contract violations.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Allowing dirty data to pass silently through pipelines without validation gates, corrupting production warehouse tables.',
      'Testing only transformation code logic while never testing the actual data flowing through the pipeline.',
      'Storing unmasked Personally Identifiable Information (PII) like plaintext social security numbers in analytics tables.',
    ],
    nextStepPreview: 'Scale, secure, monitor, and maintain enterprise production data platforms in Stage 12: Production Data Engineering & Advanced Systems.',
  },
  {
    id: 'production-data-engineering',
    stageNumber: '12',
    title: 'Production Data Engineering & Advanced Systems',
    shortTitle: 'Production & Systems',
    tagline: 'Design, scale, secure, and maintain enterprise-grade production data platforms with Docker, Terraform, Observability, and FinOps cost optimization.',
    iconName: 'Server',
    goal: 'Understand how production-grade data platforms are designed, scaled, secured, and maintained.',
    whyItMatters:
      'A data pipeline in a development environment is just the beginning. Production data engineering requires high availability, automated Disaster Recovery, Infrastructure as Code (Terraform), Docker containerization, full-stack observability, and FinOps cloud cost optimization.',
    learningOutcome: 'Design and maintain reliable, scalable production data platforms.',
    recommendedApproach:
      'Containerize your entire data stack with Docker. Provision cloud infrastructure using Terraform, implement Prometheus/Grafana pipeline monitoring, and apply modern architectural paradigms (Data Mesh, Lakehouse).',
    technologies: ['Docker', 'Terraform (IaC)', 'Kubernetes concepts', 'Prometheus & Grafana', 'Data Mesh concepts', 'FinOps'],
    visualIntuition: {
      label: 'Enterprise Production Data Platform Architecture',
      steps: [
        'INFRASTRUCTURE AS CODE (Terraform provisions S3, Warehouse, & IAM)',
        'CONTAINERIZATION (Docker packages Airflow, dbt, & Spark workers)',
        'OBSERVABILITY (Prometheus tracks pipeline runtimes & SLA freshness)',
        'SECURITY & SECRETS (HashiCorp Vault / Cloud Secret Manager)',
        'GOVERNANCE & FINOPS (Unity Catalog / DataHub + Cloud cost optimization)',
      ],
    },
    topics: [
      {
        category: 'Production Infrastructure & Containerization',
        items: [
          'Docker for Data Engineering: Multi-stage Dockerfiles for Airflow, dbt, and custom Python ingestion microservices',
          'Docker Compose: Orchestrating local multi-service clusters (Airflow, PostgreSQL, Redis, Kafka)',
          'Kubernetes concepts for Data: Running Spark on Kubernetes, Airflow KubernetesExecutor, and pod resource limits',
          'Infrastructure as Code (IaC) with Terraform: Declarative provisioning of S3 buckets, Snowflake databases, and IAM roles',
        ],
      },
      {
        category: 'Data Platform Observability & Telemetry',
        items: [
          'The 3 Pillars of Data Observability: Logs, Metrics, and Traces for data pipelines',
          'Data Freshness SLAs: Monitoring time since last successful pipeline execution',
          'Pipeline Telemetry: Tracking job runtimes, row volume anomalies, and task failure rates with Prometheus and Grafana',
          'Automated alerting on SLA breaches via PagerDuty and Slack webhooks',
        ],
      },
      {
        category: 'Advanced Data Architecture Paradigms',
        items: [
          'Data Mesh: Decentralized domain-driven data ownership, data-as-a-product, self-serve data platform infrastructure',
          'Data Fabric: Automated metadata-driven data discovery, integration, and orchestration across hybrid clouds',
          'Feature Stores (Feast / Hopsworks): Serving consistent features for offline batch ML training and online low-latency inference',
        ],
      },
      {
        category: 'FinOps & Cloud Cost Optimization',
        items: [
          'Understanding cloud data costs: Storage costs, compute instance runtimes, data egress bandwidth, warehouse query slot usage',
          'Query optimization: Pruning partitions, clustering keys, and eliminating runaway Cartesian product queries',
          'Auto-scaling and auto-suspension policies on Snowflake virtual warehouses and Spark clusters',
          'Setting up cloud budget alerts and cost anomaly detection',
        ],
      },
    ],
    keyConcepts: [
      'Infrastructure as Code (IaC) with Terraform for Data Stacks',
      'Docker Containerization & KubernetesExecutor Scaling',
      'Data Observability (Freshness, Volume, Schema, Distribution)',
      'Data Mesh Domain-Driven Data Architecture',
      'Cloud FinOps & Warehouse Compute Cost Optimization',
    ],
    practiceSuggestions: [
      'Write a complete Terraform configuration that provisions a cloud storage bucket, an IAM service account, and a cloud data warehouse database.',
      'Build a Docker Compose file that spins up an entire local data stack: Apache Airflow, PostgreSQL database, Kafka broker, and Grafana dashboard.',
      'Configure a Prometheus metric scraping endpoint for your data pipeline that tracks total rows ingested, processing duration, and error counts.',
    ],
    projectSuggestions: [
      {
        title: 'Enterprise Production Modern Data Platform',
        description: 'A complete end-to-end data platform orchestrated with Airflow, transformed via dbt, stored in Snowflake/BigQuery, provisioned with Terraform, containerized in Docker, and monitored via Grafana.',
        level: 'Portfolio-Level',
      },
    ],
    commonMistakes: [
      'Manually clicking through cloud provider web consoles to set up production infrastructure instead of using declarative Terraform code.',
      'Ignoring data freshness monitoring, allowing broken pipelines to go unnoticed until business executives report empty dashboards.',
      'Failing to configure warehouse auto-suspend timeouts, running up thousands of dollars in idle cloud compute fees.',
    ],
    nextStepPreview: 'You have mastered the complete Data Engineering curriculum! Build your flagship portfolio project and prepare for technical interviews.',
  },
];

export const DE_PROJECT_PROGRESSION: DEProjectProgression[] = [
  {
    id: 'api-postgres-etl',
    stage: 'Project 01 — Beginner',
    name: 'API to PostgreSQL Automated ETL Pipeline',
    difficulty: 'Beginner',
    problem: 'Business teams need fresh daily market/weather/sales data from external REST APIs loaded automatically into a relational SQL database.',
    description: 'A modular Python ETL pipeline that fetches paginated JSON from a public REST API, validates data schemas with Pydantic, cleans nulls, and loads records into PostgreSQL using an idempotent UPSERT pattern.',
    architecture: 'REST API → Requests with Retries → Pydantic Schema Validation → Pandas Cleaning → PostgreSQL Staging & Upsert',
    technologies: ['Python 3.12', 'PostgreSQL', 'Pydantic v2', 'Pandas', 'pytest', 'SQLAlchemy'],
    dataFlow: 'External REST API → Extraction Script → Staging Table → Target Table',
    storage: 'PostgreSQL relational database with B-Tree indexes and constraints',
    transformation: 'Timestamp normalization, deduplication, null imputation, currency formatting',
    testing: 'Pytest unit tests for transformation functions and mocked API response fixtures',
    deployment: 'Automated Python script with logging and cron scheduling',
    githubReqs: 'Clean src/ layout, requirements.txt, sample output table screenshots, pytest test suite, README documentation.',
    skillsLearned: ['REST API Ingestion', 'Pydantic Validation', 'PostgreSQL UPSERT', 'Unit Testing', 'Clean Architecture'],
  },
  {
    id: 'ecommerce-data-warehouse',
    stage: 'Project 02 — Beginner / Intermediate',
    name: 'E-Commerce Dimensional Data Warehouse',
    difficulty: 'Intermediate',
    problem: 'Transactional databases are too slow for complex multi-table analytical reporting across users, orders, products, and shipments.',
    description: 'A complete dimensional data warehouse modeling an e-commerce platform using Star Schema design (Fact_Sales, Dim_Customers, Dim_Products, Dim_Date) with SCD Type 2 historical tracking and analytical SQL queries.',
    architecture: 'Transactional OLTP Data → Staging Tables → Dimensional Modeling Transformation → Star Schema Warehouse → Business KPI Views',
    technologies: ['PostgreSQL / BigQuery', 'SQL', 'dbdiagram.io', 'DBeaver', 'Kimball Modeling'],
    dataFlow: 'Raw Normalized Tables → SQL Dimensional Transformations → Fact & Dimension Tables',
    storage: 'Star Schema Data Warehouse with surrogate keys and composite indexes',
    transformation: 'SCD Type 2 tracking, surrogate key generation, fact table metric calculations',
    testing: 'SQL assertion scripts validating primary key uniqueness and foreign key integrity',
    deployment: 'SQL DDL scripts and automated view creation queries',
    githubReqs: 'ER diagrams, complete SQL DDL schema files, dimensional transformation queries, business KPI reports.',
    skillsLearned: ['Kimball Dimensional Modeling', 'Star Schema Design', 'Slowly Changing Dimensions (SCD)', 'Complex SQL Analytics'],
  },
  {
    id: 'automated-airflow-pipeline',
    stage: 'Project 03 — Intermediate',
    name: 'Automated Daily Data Pipeline with Apache Airflow',
    difficulty: 'Intermediate',
    problem: 'Data pipelines must run reliably on a daily schedule with automatic retries, dependency management, failure alerts, and backfill capabilities.',
    description: 'A containerized Apache Airflow DAG orchestrating an end-to-end data pipeline that extracts daily source data, runs validation sensors, transforms tables in PostgreSQL, and sends Slack webhook alerts on completion.',
    architecture: 'Airflow Scheduler → TaskFlow DAG → Extract API Task → Validation Sensor → SQL Transform Task → Quality Check Task → Slack Alert Callback',
    technologies: ['Apache Airflow', 'Docker', 'Docker Compose', 'PostgreSQL', 'Python', 'Slack Webhooks'],
    dataFlow: 'Source API → Airflow Workers → PostgreSQL Staging → Analytics Mart → Slack Notification',
    storage: 'PostgreSQL database with Docker volume persistence',
    transformation: 'SQL aggregation models, customer cohort calculations, data quality assertions',
    testing: 'Airflow DAG integrity tests and pytest task execution tests',
    deployment: 'Docker Compose cluster running Airflow Webserver, Scheduler, and PostgreSQL',
    githubReqs: 'Docker Compose file, Airflow DAG definition files, environment templates, execution logs, Slack alert screenshots.',
    skillsLearned: ['Apache Airflow DAGs', 'TaskFlow API', 'Docker Compose', 'Idempotent Backfills', 'Automated Alerting'],
  },
  {
    id: 'spark-big-data-pipeline',
    stage: 'Project 04 — Intermediate / Advanced',
    name: 'Distributed Big Data Pipeline with PySpark & Parquet',
    difficulty: 'Advanced',
    problem: 'Single-machine data tools crash when processing multi-gigabyte clickstream and transaction logs that exceed available RAM.',
    description: 'A high-throughput distributed data processing pipeline built with Apache Spark and PySpark that ingests millions of raw log events, performs broadcast joins, optimizes partitions, and writes compressed Parquet datasets.',
    architecture: 'Raw Event Files (CSV/JSON) → PySpark Cluster → Broadcast Dimension Join → Aggregation & Windowing → Partitioned Parquet Storage',
    technologies: ['Apache Spark', 'PySpark', 'Parquet', 'Python', 'Delta Lake concepts'],
    dataFlow: 'Raw Distributed Storage → Spark Distributed RDDs/DataFrames → Partitioned Parquet Lake',
    storage: 'Partitioned columnar Parquet files organized by year/month/day',
    transformation: 'Windowed user session duration, clickstream path analysis, broadcast joins',
    testing: 'PySpark DataFrame unit tests using chispa testing library',
    deployment: 'PySpark standalone job script configurable with spark-submit arguments',
    githubReqs: 'PySpark job code, Spark UI execution plan screenshots, optimization benchmarks, sample dataset links.',
    skillsLearned: ['Distributed Computing', 'PySpark DataFrame API', 'Broadcast Joins', 'Parquet Partitioning', 'Spark Optimization'],
  },
  {
    id: 'realtime-kafka-platform',
    stage: 'Project 05 — Advanced',
    name: 'Real-Time Streaming Event Platform with Apache Kafka',
    difficulty: 'Advanced',
    problem: 'Batch pipelines cannot support real-time use cases like live fraud detection, operational monitoring, or dynamic pricing.',
    description: 'A real-time event streaming pipeline powered by Apache Kafka where simulated transaction producers stream events to multi-partition topics, consumed and processed with sliding window aggregations.',
    architecture: 'Python Event Producer → Kafka Broker & Topics (3 Partitions) → Stream Processor / Consumer Group → Sliding Window Anomaly Detection → Real-Time Database Sink',
    technologies: ['Apache Kafka', 'Docker Compose', 'Python (confluent-kafka)', 'PostgreSQL / Redis', 'PySpark Streaming'],
    dataFlow: 'Live Event Emitters → Kafka Topic Partitions → Real-Time Consumer Workers → Analytical Sink',
    storage: 'Kafka immutable commit log + PostgreSQL/Redis for aggregated metrics',
    transformation: 'Tumbling and sliding window aggregations, velocity spike anomaly detection',
    testing: 'Integration tests with mock Kafka producers and consumer assertion assertions',
    deployment: 'Multi-container Docker Compose cluster running Kafka, Zookeeper, and Consumer microservices',
    githubReqs: 'Docker Compose YAML, Producer/Consumer scripts, architecture diagram, live throughput metrics.',
    skillsLearned: ['Apache Kafka', 'Event-Driven Architecture', 'Consumer Group Scaling', 'Stream Windowing', 'Real-Time Pipelines'],
  },
  {
    id: 'end-to-end-modern-data-platform',
    stage: 'Project 06 — Portfolio Level',
    name: 'Enterprise Modern Data Platform with Airflow, dbt & Snowflake',
    difficulty: 'Portfolio-Level',
    problem: 'Enterprises require an integrated, production-grade data platform connecting data ingestion, cloud storage, dbt transformations, automated quality tests, and CI/CD.',
    description: 'A flagship modern data engineering platform orchestrated with Airflow, transformed using dbt models, stored in a cloud data warehouse (Snowflake / BigQuery), provisioned via Terraform, and monitored with Great Expectations.',
    architecture: 'Data Sources → Cloud Storage (S3/GCS) → Airflow Orchestration → dbt Staging & Mart Models → Cloud Warehouse (Snowflake/BigQuery) → Great Expectations Quality Gate → BI Dashboard',
    technologies: ['Apache Airflow', 'dbt (Data Build Tool)', 'Snowflake / BigQuery', 'Terraform', 'Docker', 'Great Expectations', 'GitHub Actions'],
    dataFlow: 'Source APIs/DBs → Raw Cloud Landing → dbt Bronze/Silver/Gold Models → Analytics Marts → BI / ML Consumers',
    storage: 'Cloud Data Warehouse with partitioned tables, clustering keys, and role-based access',
    transformation: 'Modular dbt models (Staging, Intermediate, Marts) with lineage documentation',
    testing: 'Automated dbt schema tests, Great Expectations checkpoints, and CI/CD pull request tests',
    deployment: 'Terraform Infrastructure as Code + Docker containerization + GitHub Actions CI/CD',
    githubReqs: 'Complete architecture blueprint, Terraform scripts, dbt project repository, Airflow DAGs, Data Docs export.',
    skillsLearned: ['Modern Data Stack (MDS)', 'dbt Modeling & Lineage', 'Cloud Data Warehousing', 'Terraform IaC', 'Full-Stack Data Engineering'],
  },
];

export const DE_MAJOR_PIPELINE_STAGES: DEMajorPipelineStage[] = [
  {
    id: 'data-sources',
    stageName: '01. Data Sources',
    whatHappens: 'Raw transactional data, event streams, application logs, third-party APIs, and external files are generated continuously.',
    whyItMatters: 'Data engineering begins with understanding the variety, volume, velocity, and schema structure of source systems.',
    commonTools: ['PostgreSQL', 'MongoDB', 'REST APIs', 'Stripe / Salesforce', 'IoT Sensors'],
    example: 'Ingesting daily e-commerce order logs, customer mobile clickstream events, and payment gateway webhooks.',
    productionConsiderations: 'Handling rate limits, authentication credentials, and database connection connection pool limits.',
    icon: 'Database',
  },
  {
    id: 'ingestion-layer',
    stageName: '02. Ingestion Layer',
    whatHappens: 'Data is extracted from source systems using batch extraction scripts, streaming message brokers, or Change Data Capture (CDC).',
    whyItMatters: 'Decouples source systems from downstream analytics to prevent analytical queries from slowing down production databases.',
    commonTools: ['Python', 'Apache Kafka', 'Airbyte', 'Fivetran', 'AWS Kinesis'],
    example: 'Streaming database changes into Kafka topics using Debezium CDC without locking production tables.',
    productionConsiderations: 'Ensuring at-least-once delivery, retry exponential backoff, and network timeout handling.',
    icon: 'Workflow',
  },
  {
    id: 'raw-storage',
    stageName: '03. Raw Storage (Data Lake)',
    whatHappens: 'Unmodified raw source files (JSON, CSV, Parquet) are saved into durable, low-cost cloud object storage buckets.',
    whyItMatters: 'Provides an immutable source of truth and allows reprocessing historical data if downstream transformation logic changes.',
    commonTools: ['AWS S3', 'Google Cloud Storage', 'Azure Blob Storage', 'MinIO'],
    example: 'Organizing raw data into partitioned directories: s3://company-lake/raw/orders/year=2024/month=08/day=30/.',
    productionConsiderations: 'Enforcing lifecycle transition policies to cold storage, encryption at rest, and access controls.',
    icon: 'Layers',
  },
  {
    id: 'data-validation-gate',
    stageName: '04. Data Validation Gate',
    whatHappens: 'Automated quality suites check incoming datasets for null percentages, schema modifications, and unexpected value ranges.',
    whyItMatters: 'Blocks corrupt, malformed, or dirty data before it enters analytical warehouses and breaks downstream dashboards.',
    commonTools: ['Great Expectations', 'Pydantic', 'Soda Core', 'Pandera'],
    example: 'Asserting that order_amount is strictly positive and user_id foreign keys exist in customer tables.',
    productionConsiderations: 'Halting pipeline execution and triggering Slack/PagerDuty alerts when validation gates fail.',
    icon: 'ShieldCheck',
  },
  {
    id: 'transformation-layer',
    stageName: '05. Transformation Layer',
    whatHappens: 'Raw data is cleaned, typed, deduplicated, enriched, joined, and modeled into analytical tables using SQL and dbt.',
    whyItMatters: 'Converts unstandardized raw data into clean, business-ready tables aligned with business domain logic.',
    commonTools: ['dbt (Data Build Tool)', 'SQL', 'Apache Spark', 'Python / Pandas'],
    example: 'Transforming raw order records and customer profiles into a clean, unified Fact_Orders table in dbt.',
    productionConsiderations: 'Writing modular, idempotent transformations with automated dbt documentation and data lineage.',
    icon: 'Sparkles',
  },
  {
    id: 'data-warehouse-lakehouse',
    stageName: '06. Data Warehouse / Lakehouse',
    whatHappens: 'Curated dimensional tables and facts are stored in high-performance columnar storage with partitioning and clustering.',
    whyItMatters: 'Enables business analysts, data scientists, and applications to execute sub-second SQL queries across terabytes of data.',
    commonTools: ['Snowflake', 'Google BigQuery', 'Amazon Redshift', 'Databricks (Delta Lake)'],
    example: 'A Snowflake cluster executing multi-million row aggregation queries in under 500ms using columnar micro-partitions.',
    productionConsiderations: 'Configuring auto-suspension to prevent idle compute costs, clustering keys, and Role-Based Access Control.',
    icon: 'Warehouse',
  },
  {
    id: 'data-marts',
    stageName: '07. Data Marts & Semantic Layer',
    whatHappens: 'Specific departmental subsets (Marketing Mart, Finance Mart, Operations Mart) and semantic metrics are exposed for reporting.',
    whyItMatters: 'Provides business users and BI tools with pre-aggregated, easy-to-understand views with standardized metric definitions.',
    commonTools: ['dbt Semantic Layer', 'Cube.js', 'Looker / Power BI Models'],
    example: 'A Sales Data Mart providing pre-calculated monthly recurring revenue (MRR) and customer churn rate metrics.',
    productionConsiderations: 'Maintaining unified metric definitions to prevent different departments from calculating KPIs differently.',
    icon: 'Grid',
  },
  {
    id: 'bi-analytics-serving',
    stageName: '08. BI, Analytics & ML Serving',
    whatHappens: 'Clean, validated data is consumed by BI dashboards, executive reports, ad-hoc analyst queries, and machine learning pipelines.',
    whyItMatters: 'The ultimate business purpose of data engineering: empowering organizations with accurate, timely, data-driven decisions.',
    commonTools: ['Tableau', 'Power BI', 'Looker / Superset', 'Feature Stores (Feast)', 'Jupyter'],
    example: 'Executive dashboards updating automatically every morning at 7:00 AM with 99.9% data freshness SLA compliance.',
    productionConsiderations: 'Monitoring query performance, caching frequently accessed dashboards, and tracking data freshness SLAs.',
    icon: 'LineChart',
  },
];

export const DE_SPECIALIZATIONS: DESpecialization[] = [
  {
    title: 'Analytics Engineer',
    description: 'Bridges the gap between data engineering and data analysis: masters SQL, dbt, data modeling, semantic layers, and warehouse governance.',
    coreTech: ['SQL', 'dbt', 'Snowflake / BigQuery', 'Data Modeling', 'Looker / Tableau'],
    focus: 'Data transformation modeling, clean data marts, metric consistency, and business stakeholder collaboration.',
    icon: 'LineChart',
  },
  {
    title: 'Big Data Engineer',
    description: 'Specializes in massive-scale distributed data processing, cluster memory tuning, Apache Spark, and petabyte-scale data lakes.',
    coreTech: ['Apache Spark', 'PySpark', 'Parquet', 'Delta Lake', 'Hadoop / HDFS', 'AWS EMR'],
    focus: 'Distributed computing, shuffle optimization, large-scale data transformations, and storage efficiency.',
    icon: 'Sparkles',
  },
  {
    title: 'Data Platform Engineer',
    description: 'Builds and maintains internal self-service data platforms, orchestrators, ingestion frameworks, and infrastructure for all data teams.',
    coreTech: ['Kubernetes', 'Apache Airflow', 'Docker', 'Terraform', 'Python', 'AWS / GCP'],
    focus: 'Developer experience, data platform infrastructure, CI/CD, and platform reliability.',
    icon: 'Server',
  },
  {
    title: 'Streaming & Real-Time Data Engineer',
    description: 'Focuses on low-latency event-driven architectures, distributed message queues, real-time analytics, and streaming stream processors.',
    coreTech: ['Apache Kafka', 'Kafka Streams', 'Apache Flink', 'Spark Streaming', 'Redis'],
    focus: 'Real-time telemetry, sub-second latency, event windowing, and distributed messaging.',
    icon: 'Zap',
  },
  {
    title: 'Cloud Data Engineer',
    description: 'Architects cloud-native data platforms utilizing managed cloud storage, serverless compute, IAM security, and managed cloud warehouses.',
    coreTech: ['AWS (S3, Glue, Redshift)', 'GCP (BigQuery, Pub/Sub)', 'Azure Data Factory', 'Terraform'],
    focus: 'Cloud architecture, serverless pipelines, security compliance, and cloud FinOps cost optimization.',
    icon: 'Cloud',
  },
  {
    title: 'Data Architect',
    description: 'Designs enterprise-wide data strategy, system topologies, Lakehouse architectures, governance standards, and Data Mesh domain boundaries.',
    coreTech: ['System Design', 'Data Mesh', 'Lakehouse Architecture', 'Data Governance', 'Enterprise Modeling'],
    focus: 'High-level system design, enterprise data strategy, governance, and long-term scalability.',
    icon: 'Compass',
  },
];

export const DE_TOOLKIT: DEToolkitCategory[] = [
  {
    category: 'Programming & Languages',
    coreItems: ['Python 3.12', 'SQL (ANSI & Modern)', 'Bash / Shell Scripting'],
    advancedItems: ['Scala (Spark Internals)', 'Java (Kafka / Flink)', 'Rust Basics'],
  },
  {
    category: 'Relational Databases',
    coreItems: ['PostgreSQL', 'MySQL', 'SQLite'],
    advancedItems: ['DuckDB (Fast Analytical In-Memory SQL)', 'Oracle / SQL Server'],
  },
  {
    category: 'Data Processing & Big Data',
    coreItems: ['Pandas / Polars', 'Apache Spark / PySpark', 'PyArrow'],
    advancedItems: ['Apache Flink', 'Ray Data', 'Dask'],
  },
  {
    category: 'Data Transformation & Modeling',
    coreItems: ['dbt (Data Build Tool)', 'SQL CTEs & Window Functions', 'Kimball Dimensional Modeling'],
    advancedItems: ['dbt Semantic Layer', 'SQLMesh', 'Dataform'],
  },
  {
    category: 'Workflow Orchestration',
    coreItems: ['Apache Airflow', 'Cron Scheduling'],
    advancedItems: ['Prefect', 'Dagster', 'Mage.ai', 'Temporal'],
  },
  {
    category: 'Cloud Data Warehouses & Lakehouses',
    coreItems: ['Google BigQuery', 'Snowflake', 'Amazon Redshift'],
    advancedItems: ['Databricks (Delta Lake)', 'Apache Iceberg', 'Apache Hudi'],
  },
  {
    category: 'Streaming & Message Brokers',
    coreItems: ['Apache Kafka', 'Kafka Python Producers/Consumers'],
    advancedItems: ['Kafka Streams', 'Apache Pulsar', 'Redpanda', 'RabbitMQ'],
  },
  {
    category: 'Cloud Infrastructure & Storage',
    coreItems: ['AWS S3', 'Google Cloud Storage (GCS)', 'Azure Blob Storage', 'AWS IAM'],
    advancedItems: ['AWS Glue / Athena', 'GCP Dataflow / Cloud Functions', 'Azure Data Factory'],
  },
  {
    category: 'Containerization & Infrastructure',
    coreItems: ['Docker', 'Docker Compose'],
    advancedItems: ['Kubernetes (K8s)', 'Terraform (IaC)', 'Helm Charts'],
  },
  {
    category: 'Data Quality & Governance',
    coreItems: ['Great Expectations', 'dbt Tests', 'Schema Contracts'],
    advancedItems: ['Soda Core', 'OpenLineage / Marquez', 'DataHub / Amundsen'],
  },
];

export const DE_THINKING_LADDER = [
  { step: '01', label: 'Data Source', question: 'Where does the data originate (API, DB, logs, events) and what is its schema format?' },
  { step: '02', label: 'Velocity & Frequency', question: 'How frequently does data arrive (real-time stream, hourly batch, or daily sync)?' },
  { step: '03', label: 'Ingestion Strategy', question: 'Should we use batch extraction, streaming Kafka, or Change Data Capture (CDC)?' },
  { step: '04', label: 'Storage & Raw Lake', question: 'Where should raw data be stored immutably before processing (S3/GCS bucket layout)?' },
  { step: '05', label: 'Transformation Paradigm', question: 'Should we transform with ETL before loading or ELT in-warehouse using SQL/dbt?' },
  { step: '06', label: 'Data Validation', question: 'What validation checks (nulls, types, referential integrity) guarantee data trust?' },
  { step: '07', label: 'Failure & Idempotency', question: 'How will the pipeline handle network retries, and is it 100% idempotent on re-runs?' },
  { step: '08', label: 'Scaling & Partitions', question: 'How is data partitioned and clustered to prevent expensive full table scans?' },
  { step: '09', label: 'Freshness & Observability', question: 'How do we track pipeline runtimes, SLA freshness, and trigger alerts on failure?' },
  { step: '10', label: 'Consumer Access', question: 'Who needs the data (analysts, executives, ML models) and in what schema format?' },
  { step: '11', label: 'Security & Governance', question: 'How is PII data masked, and are access controls configured with least privilege?' },
  { step: '12', label: 'Cloud Cost (FinOps)', question: 'How much cloud compute/storage will this consume, and is auto-suspend configured?' },
];

export const DE_COMMON_MISTAKES: DECommonMistake[] = [
  {
    title: 'Learning only Pandas and ignoring SQL and Databases',
    solution: 'Master advanced SQL (CTEs, Window Functions, Joins) and relational modeling; SQL is used in 90%+ of data engineering tasks.',
  },
  {
    title: 'Jumping into Spark too early on small datasets',
    solution: 'Use standard SQL or DuckDB for gigabyte-scale data; reserve distributed Spark clusters for genuinely large multi-node datasets.',
  },
  {
    title: 'Building non-idempotent pipelines that create duplicate rows',
    solution: 'Design all pipelines using UPSERT / MERGE patterns or partition overwrites so re-running a job produces identical clean state.',
  },
  {
    title: 'Hard-coding passwords and API keys in source code',
    solution: 'Always use environment variables, .env files (git-ignored), and cloud Secret Managers.',
  },
  {
    title: 'Ignoring data quality validation and schema checks',
    solution: 'Implement automated data quality gates using dbt tests and Great Expectations before data reaches analytical tables.',
  },
  {
    title: 'Applying 3NF normalization to analytical data warehouses',
    solution: 'Use dimensional Star Schemas (Fact and Dimension tables) in analytical warehouses to optimize read performance and simplify joins.',
  },
  {
    title: 'Running SELECT * on unpartitioned cloud data warehouses',
    solution: 'Select only required columns and query on partitioned/clustered date columns to minimize scanned bytes and cloud costs.',
  },
  {
    title: 'Passing massive DataFrames through Airflow XComs',
    solution: 'Use Airflow XComs only for lightweight metadata (IDs, counts, filepaths); write large data payloads to S3/GCS.',
  },
  {
    title: 'Attempting to learn all cloud providers simultaneously',
    solution: 'Master fundamental cloud patterns (Storage, Compute, IAM) on one cloud provider (AWS or GCP) first, then transfer concepts.',
  },
  {
    title: 'Failing to implement incremental watermark loading',
    solution: 'Track updated_at high-watermark timestamps to process only newly modified records instead of full table re-extracts.',
  },
  {
    title: 'Ignoring data freshness monitoring and alerting',
    solution: 'Configure automated pipeline monitoring with Prometheus/Grafana or Slack webhooks to alert on SLA breaches.',
  },
  {
    title: 'Creating an unorganized data lake without governance (Data Swamp)',
    solution: 'Establish strict folder structures, table partitioning, metadata catalogs, and schema contracts on object storage.',
  },
];

export const DE_CHECKLIST: DEChecklistCategory[] = [
  {
    category: 'Code & Software Engineering',
    items: [
      { name: 'Version Controlled', desc: 'Code is tracked in Git with clean branching and pull request reviews.' },
      { name: 'Automated Testing', desc: 'Unit and integration test suites running with pytest achieving >80% coverage.' },
      { name: 'Modular Layout', desc: 'Code organized in standard src/ package structure, separated from scratch notebooks.' },
      { name: 'Configuration Isolation', desc: 'All credentials and database URIs managed via environment variables.' },
    ],
  },
  {
    category: 'Data Quality & Contracts',
    items: [
      { name: 'Data Validation Gates', desc: 'Incoming datasets validated with Great Expectations or Pydantic before loading.' },
      { name: 'dbt Assertion Tests', desc: 'Unique, not_null, accepted_values, and relationship tests enforced on all models.' },
      { name: 'Schema Contracts', desc: 'Formal data contracts defined between software producers and data consumers.' },
      { name: 'Deduplication Logic', desc: 'Pipelines cleanly remove duplicate records based on business primary keys.' },
    ],
  },
  {
    category: 'Pipeline & Orchestration',
    items: [
      { name: 'Idempotency Guaranteed', desc: 'Re-running pipelines on historical dates produces exact deterministic state.' },
      { name: 'Incremental Syncing', desc: 'Pipelines use high-watermark timestamps to process only delta changes.' },
      { name: 'Automated Retries', desc: 'Tasks configured with exponential backoff retries for transient failure recovery.' },
      { name: 'Historical Backfills', desc: 'DAGs support historical backfilling without manual code modifications.' },
    ],
  },
  {
    category: 'Storage & Data Warehouse',
    items: [
      { name: 'Partitioning & Clustering', desc: 'Large warehouse tables partitioned by date/region to prune scanned bytes.' },
      { name: 'Dimensional Modeling', desc: 'Star Schema fact and dimension tables clearly modeled with defined grain.' },
      { name: 'SCD Type 2 History', desc: 'Historical dimension attribute changes tracked with valid_from/valid_to timestamps.' },
      { name: 'Columnar Compression', desc: 'Parquet / Delta formats utilized for high-compression analytical queries.' },
    ],
  },
  {
    category: 'Observability & Monitoring',
    items: [
      { name: 'Data Freshness Tracking', desc: 'Automated monitoring tracks SLA latency since last successful pipeline sync.' },
      { name: 'Pipeline Failure Alerts', desc: 'Slack / PagerDuty webhook notifications triggered immediately on job failure.' },
      { name: 'End-to-End Lineage', desc: 'Data provenance documented from raw source API to final BI dashboard.' },
      { name: 'Structured Logging', desc: 'Logs capture timestamps, processed row counts, and error stack traces.' },
    ],
  },
  {
    category: 'Security & Cost Management (FinOps)',
    items: [
      { name: 'Least Privilege IAM', desc: 'Service accounts granted only minimum required read/write permissions.' },
      { name: 'PII Data Protection', desc: 'Customer personal data masked or encrypted at rest and in transit.' },
      { name: 'Auto-Suspend Configured', desc: 'Cloud data warehouse compute clusters configured to auto-suspend when idle.' },
      { name: 'Lifecycle Storage Rules', desc: 'Old raw data files automatically transitioned to cold/archive tiers.' },
    ],
  },
];

export const DE_FOUR_PILLARS: DEFourPillars[] = [
  {
    title: 'Programming & SQL Mastery',
    subtitle: 'Deep proficiency in Python, advanced analytical SQL (Window functions, CTEs), and relational database internals.',
    icon: 'Database',
  },
  {
    title: 'Data Systems & Modeling',
    subtitle: 'Kimball dimensional modeling, Star schemas, dbt transformations, and cloud data warehouse architectures.',
    icon: 'Layers',
  },
  {
    title: 'Cloud & Distributed Processing',
    subtitle: 'Apache Spark parallel computing, Apache Kafka event streaming, and managed cloud data services (AWS/GCP).',
    icon: 'Cloud',
  },
  {
    title: 'Reliability & Data Quality',
    subtitle: 'Apache Airflow orchestration, Great Expectations validation, idempotent pipelines, and observability telemetry.',
    icon: 'ShieldCheck',
  },
];

export const MODERN_DATA_ARCHITECTURE_STEPS = [
  { step: '01', title: 'Data Sources', desc: 'APIs, transactional DBs, application logs, events, & files' },
  { step: '02', title: 'Ingestion Layer', desc: 'Batch scripts, streaming Kafka, & Change Data Capture (CDC)' },
  { step: '03', title: 'Raw Data Lake', desc: 'Immutable S3/GCS object storage bucket zones' },
  { step: '04', title: 'Data Validation', desc: 'Great Expectations & schema contract verification gates' },
  { step: '05', title: 'Distributed Processing', desc: 'Apache Spark / PySpark large-scale batch transformations' },
  { step: '06', title: 'Data Transformation', desc: 'Modular SQL data modeling & testing with dbt' },
  { step: '07', title: 'Warehouse / Lakehouse', desc: 'Snowflake / BigQuery / Delta Lake columnar storage' },
  { step: '08', title: 'Data Marts', desc: 'Curated dimensional models for specific business departments' },
  { step: '09', title: 'Orchestration & Lineage', desc: 'Airflow scheduling & OpenLineage metadata tracking' },
  { step: '10', title: 'BI & ML Consumers', desc: 'Tableau, Power BI, data analysts, & production ML models' },
];
