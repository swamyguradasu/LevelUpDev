import { PythonTopicDetail } from './pythonTopicsDataPart1';

export const PYTHON_TOPICS_PART6: Record<string, PythonTopicDetail> = {
  // =========================================================================
  // MODULE 18: Databases with Python (5 Topics)
  // =========================================================================
  'sqlite-basics': {
    id: 'sqlite-basics',
    moduleId: 'm18',
    topicNumber: 1,
    title: 'SQLite Basics & Relational Concepts',
    shortSummary: 'Relational database concepts, tables, primary keys, rows, columns, and SQLite benefits.',
    whatIsIt: 'SQLite is a lightweight, serverless, self-contained SQL database engine embedded directly into Python through the standard library `sqlite3` module. Relational databases organize persistent data into structured Tables composed of Columns (fields/types) and Rows (individual records), with Primary Keys uniquely identifying each row.',
    whyDoWeNeedIt: 'File-based storage (JSON/CSV) lacks atomic ACID transactions, fast indexed queries, foreign-key relational integrity, and concurrent read safety. SQLite delivers enterprise-grade SQL in a single portable `.db` file without installing server software.',
    syntax: `# Basic SQL Syntax:
# CREATE TABLE table_name (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     column1 TEXT NOT NULL,
#     column2 REAL DEFAULT 0.0
# );`,
    basicExample: {
      code: `import sqlite3

# Create an in-memory SQLite database for instant testing
conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

# Create a students table
cursor.execute("""
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    branch TEXT NOT NULL,
    gpa REAL
);
""")

print("SQLite Database initialized in memory successfully.")
conn.close()`,
      output: `SQLite Database initialized in memory successfully.`
    },
    detailedExample: {
      code: `import sqlite3

# Complete Relational Demo with Constraints
conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    is_active INTEGER DEFAULT 1
);
""")

# Insert records
cursor.execute("INSERT INTO users (username, email) VALUES (?, ?)", ("swamy", "s@levelup.dev"))
cursor.execute("INSERT INTO users (username, email) VALUES (?, ?)", ("ananya", "a@levelup.dev"))
conn.commit()

# Query table metadata
cursor.execute("SELECT id, username, email, is_active FROM users")
rows = cursor.fetchall()

print("Created User Records:")
for r in rows:
    print(f" - ID {r[0]}: {r[1]} ({r[2]}) | Active: {bool(r[3])}")

conn.close()`,
      output: `Created User Records:
 - ID 1: swamy (s@levelup.dev) | Active: True
 - ID 2: ananya (a@levelup.dev) | Active: True`
    },
    codeExplanation: [
      'Line 7: `AUTOINCREMENT` automatically assigns monotonic integer IDs (1, 2, ...).',
      'Line 16: Parameterized queries `(?, ?)` prevent SQL injection attacks.',
      'Line 18: `conn.commit()` persists transaction changes to the database.',
      'Line 21: `cursor.fetchall()` retrieves all matching result rows as tuples.'
    ],
    commonMistakes: [
      {
        mistake: 'Using Python boolean True/False directly where SQLite expects integer 1/0 or TEXT.',
        whyItIsWrong: 'SQLite does not have a separate native BOOLEAN storage class; it uses INTEGER 0 (false) and 1 (true).',
        correction: 'Store booleans as integer 0/1 or cast when querying.'
      },
      {
        mistake: 'Forgetting to close database connections with `conn.close()`.',
        whyItIsWrong: 'Can lock the `.db` file on disk and leak connection descriptors.',
        correction: 'Always close connections or use context managers `with sqlite3.connect(...) as conn:`.'
      }
    ],
    importantRules: [
      'SQLite is built directly into Python (zero configuration required).',
      'Primary keys uniquely identify rows in a table.',
      'Use `:memory:` for fast automated testing and temporary databases.'
    ],
    interviewPerspective: 'Interviewers often ask why SQLite is preferred for mobile applications (iOS/Android), embedded devices, desktop apps, and development environments before scaling to PostgreSQL/MySQL.',
    practiceQuestions: [
      {
        question: 'What special database name creates an in-memory temporary SQLite database in Python?',
        solution: '":memory:"'
      },
      {
        question: 'What SQL constraint ensures that no two rows can share the same value in a given column?',
        solution: 'UNIQUE'
      }
    ],
    checkpoint: [
      {
        id: 'm18-t1-q1',
        type: 'mcq',
        prompt: 'Which feature makes SQLite uniquely easy to use compared to PostgreSQL or MySQL for local Python applications?',
        options: [
          'It is serverless, requires zero configuration, and stores the entire database in a single portable file',
          'It only supports Python dictionaries instead of tables',
          'It does not support SQL syntax',
          'It runs on blockchain'
        ],
        correctAnswer: 0,
        explanation: 'SQLite requires no separate database daemon or server configuration; it is self-contained in a single file or in memory.'
      },
      {
        id: 'm18-t1-q2',
        type: 'output',
        prompt: 'What SQL keyword designates a column as the unique identifier for table rows that increments automatically?',
        correctAnswer: 'PRIMARY KEY',
        explanation: 'PRIMARY KEY identifies unique rows in relational tables.'
      }
    ]
  },

  'sqlite3-module': {
    id: 'sqlite3-module',
    moduleId: 'm18',
    topicNumber: 2,
    title: 'The `sqlite3` Module & Database Workflows',
    shortSummary: 'Importing sqlite3, connect(), creating tables, and transaction commits.',
    whatIsIt: 'The `sqlite3` module provides a DB-API 2.0 compliant interface for interacting with SQLite databases. A standard database workflow follows four steps: 1) Connect (`sqlite3.connect`), 2) Obtain Cursor (`conn.cursor`), 3) Execute SQL commands (`cursor.execute`), and 4) Commit & Close (`conn.commit`, `conn.close`).',
    whyDoWeNeedIt: 'Understanding the standard DB-API lifecycle prepares you for all Python relational database drivers (including `psycopg2` for PostgreSQL, `mysqlclient`, and `asyncpg`).',
    syntax: `import sqlite3

# 1. Connect to file on disk
conn = sqlite3.connect("app.db")

# 2. Get cursor
cursor = conn.cursor()

# 3. Execute schema creation
cursor.execute("CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY, msg TEXT)")

# 4. Commit and close
conn.commit()
conn.close()`,
    basicExample: {
      code: `import sqlite3

# Safe table creation with IF NOT EXISTS
conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS products (
    sku TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER DEFAULT 0
);
""")

print("Table 'products' created successfully.")
conn.close()`,
      output: `Table 'products' created successfully.`
    },
    detailedExample: {
      code: `import sqlite3

# Using SQLite connection as a Context Manager (Automatic Commit / Rollback)
conn = sqlite3.connect(":memory:")

# When connection is used with 'with', it automatically commits on success
# and rolls back on exception:
with conn:
    conn.execute("CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT)")
    conn.execute("INSERT INTO settings VALUES ('theme', 'dark')")
    conn.execute("INSERT INTO settings VALUES ('notifications', 'enabled')")

# Querying settings
cursor = conn.cursor()
cursor.execute("SELECT key, value FROM settings")
for k, v in cursor.fetchall():
    print(f"Setting: {k} = {v}")

conn.close()`,
      output: `Setting: theme = dark
Setting: notifications = enabled`
    },
    codeExplanation: [
      'Line 7: `with conn:` provides transaction safety; if an error occurs, the transaction is automatically rolled back.',
      'Line 15: `cursor.fetchall()` iterates over all returned rows.'
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting to call `conn.commit()` after `INSERT`, `UPDATE`, or `DELETE` statements.',
        whyItIsWrong: 'Without commit, modifications remain in an uncommitted transaction and are discarded when the connection closes.',
        correction: 'Always call `conn.commit()` or use `with conn:`.'
      },
      {
        mistake: 'Running `CREATE TABLE` without `IF NOT EXISTS` in application startup code.',
        whyItIsWrong: 'Raises `sqlite3.OperationalError: table ... already exists` on second execution.',
        correction: 'Use `CREATE TABLE IF NOT EXISTS table_name ...`.'
      }
    ],
    importantRules: [
      '`conn.commit()` is required to persist data-modifying SQL queries.',
      'Use `CREATE TABLE IF NOT EXISTS` to avoid crashes on application restart.',
      '`with conn:` manages transaction commits and rollbacks automatically.'
    ],
    interviewPerspective: 'Interviewers often ask what happens to uncommitted database changes when a connection closes without `conn.commit()` (they are automatically rolled back).',
    practiceQuestions: [
      {
        question: 'Which method on an SQLite connection object commits the current transaction to disk?',
        solution: 'conn.commit()'
      },
      {
        question: 'What SQL clause prevents errors if a table already exists during creation?',
        solution: 'IF NOT EXISTS'
      }
    ],
    checkpoint: [
      {
        id: 'm18-t2-q1',
        type: 'output',
        prompt: 'What method must you call on an SQLite connection to permanently save changes to the database?',
        correctAnswer: 'commit',
        explanation: '`conn.commit()` saves transaction changes permanently to the database.'
      },
      {
        id: 'm18-t2-q2',
        type: 'mcq',
        prompt: 'What happens to newly inserted rows if you close a database connection without calling `conn.commit()`?',
        options: [
          'They are permanently written anyway',
          'They are discarded (rolled back)',
          'The database file is deleted',
          'A SyntaxError is raised'
        ],
        correctAnswer: 1,
        explanation: 'Uncommitted database transactions are automatically rolled back and discarded upon connection closure.'
      }
    ]
  },

  'connections-and-cursors': {
    id: 'connections-and-cursors',
    moduleId: 'm18',
    topicNumber: 3,
    title: 'Connections, Cursors & Result Fetching',
    shortSummary: 'Cursor lifecycle, execute(), executemany(), fetchone(), fetchall(), and row_factory.',
    whatIsIt: 'A Connection represents the physical communication channel with the database. A Cursor is the control structure used to traverse and fetch records from the query result set. Result fetching methods include `fetchone()` (returns single tuple/None), `fetchall()` (returns list of all tuples), and `fetchmany(size)`.',
    whyDoWeNeedIt: 'Cursors allow efficient memory streaming of large result sets (iterating one row at a time) and mapping results to named dictionaries using `conn.row_factory = sqlite3.Row`.',
    syntax: `import sqlite3

conn = sqlite3.connect(":memory:")
# Access columns by name instead of integer indices:
conn.row_factory = sqlite3.Row

cursor = conn.cursor()
cursor.execute("SELECT * FROM users WHERE id = ?", (1,))
row = cursor.fetchone()
if row:
    print(row["username"], row["email"])`,
    basicExample: {
      code: `import sqlite3

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

cursor.execute("CREATE TABLE scores (name TEXT, points INTEGER)")
cursor.execute("INSERT INTO scores VALUES ('Swamy', 95)")
cursor.execute("INSERT INTO scores VALUES ('Alex', 88)")
cursor.execute("INSERT INTO scores VALUES ('Ananya', 98)")

# 1. fetchone() retrieves the first matching row
cursor.execute("SELECT * FROM scores ORDER BY points DESC")
top_scorer = cursor.fetchone()
print("Top Scorer (fetchone):", top_scorer)

# 2. fetchall() retrieves remaining rows
remaining = cursor.fetchall()
print("Remaining Scorers (fetchall):", remaining)

conn.close()`,
      output: `Top Scorer (fetchone): ('Ananya', 98)
Remaining Scorers (fetchall): [('Swamy', 95), ('Alex', 88)]`
    },
    detailedExample: {
      code: `import sqlite3

# Batch insertion with executemany() and sqlite3.Row mapping
conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row  # Enables column-name indexing!
cursor = conn.cursor()

cursor.execute("CREATE TABLE inventory (item_id TEXT, price REAL, qty INTEGER)")

# Batch insert list of tuples in a single transaction
batch_data = [
    ("SKU-101", 25.50, 100),
    ("SKU-102", 12.00, 250),
    ("SKU-103", 89.99, 40)
]
cursor.executemany("INSERT INTO inventory VALUES (?, ?, ?)", batch_data)
conn.commit()

# Query and access by column name
cursor.execute("SELECT item_id, price, qty FROM inventory WHERE qty >= 100")
for row in cursor:
    print(f"Item: {row['item_id']} | Price: \${row['price']:.2f} | Stock: {row['qty']}")

conn.close()`,
      output: `Item: SKU-101 | Price: \$25.50 | Stock: 100
Item: SKU-102 | Price: \$12.00 | Stock: 250`
    },
    codeExplanation: [
      'Line 5: `conn.row_factory = sqlite3.Row` configures rows to be accessible by column names (e.g. `row["price"]`).',
      'Line 15: `cursor.executemany()` executes batch insertions efficiently.',
      'Line 20: Iterating directly over `cursor` streams rows one-by-one without allocating full memory.'
    ],
    commonMistakes: [
      {
        mistake: 'Using `cursor.fetchall()` on a million-row query when only one record was needed.',
        whyItIsWrong: 'Loads all 1,000,000 tuples into RAM simultaneously, causing massive memory spikes.',
        correction: 'Use `cursor.fetchone()` or iterate directly over the cursor.'
      },
      {
        mistake: 'Passing a single value instead of a tuple to parameterized query: `cursor.execute("SELECT ... WHERE id = ?", 1)`.',
        whyItIsWrong: 'Raises `ValueError: parameters are of unsupported type` because SQLite expects a tuple or list of parameters.',
        correction: 'Pass a 1-element tuple: `(1,)` with trailing comma.'
      }
    ],
    importantRules: [
      '`cursor.fetchone()` returns `None` if no records match.',
      'Use `cursor.executemany()` for batch inserts and updates.',
      'Setting `conn.row_factory = sqlite3.Row` allows dictionary-style column access.'
    ],
    interviewPerspective: 'Interviewers often ask how to configure row factories to return dictionaries and how `cursor.executemany()` reduces transaction round-trips.',
    practiceQuestions: [
      {
        question: 'What does `cursor.fetchone()` return if no matching rows are found?',
        solution: 'None'
      },
      {
        question: 'Which method executes a SQL command against multiple parameter sequences in batch?',
        solution: 'cursor.executemany(sql, seq_of_parameters)'
      }
    ],
    checkpoint: [
      {
        id: 'm18-t3-q1',
        type: 'output',
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `import sqlite3
conn = sqlite3.connect(":memory:")
c = conn.cursor()
c.execute("CREATE TABLE t (x INT)")
c.execute("INSERT INTO t VALUES (10)")
c.execute("INSERT INTO t VALUES (20)")
c.execute("SELECT x FROM t WHERE x > 50")
print(c.fetchone())`,
        correctAnswer: 'None',
        explanation: 'No row matches `x > 50`, so `c.fetchone()` returns `None`.'
      },
      {
        id: 'm18-t3-q2',
        type: 'mcq',
        prompt: 'What setting allows SQLite result rows to be accessed by column name (e.g. `row["username"]`)?',
        options: [
          'conn.row_factory = sqlite3.Row',
          'cursor.mode = "dict"',
          'sqlite3.enable_dict_mode()',
          'conn.parse_columns = True'
        ],
        correctAnswer: 0,
        explanation: '`conn.row_factory = sqlite3.Row` enables dictionary-like column name access on result rows.'
      }
    ]
  },

  'crud-operations': {
    id: 'crud-operations',
    moduleId: 'm18',
    topicNumber: 4,
    title: 'CRUD Operations & Parameterized Queries',
    shortSummary: 'Create, Read, Update, Delete operations and preventing SQL Injection attacks.',
    whatIsIt: 'CRUD represents the four core database operations: Create (`INSERT`), Read (`SELECT`), Update (`UPDATE`), and Delete (`DELETE`). Parameterized queries (using `?` placeholders) separate SQL logic from data inputs, completely neutralizing SQL Injection vulnerabilities.',
    whyDoWeNeedIt: "Concatenating user inputs into SQL strings (e.g. f\"SELECT * FROM users WHERE name = '{input}'\") is the #1 database security vulnerability (SQL Injection). Parameterized queries are mandatory for all production systems.",
    syntax: `# 1. CREATE:
# cursor.execute("INSERT INTO users (name, role) VALUES (?, ?)", (name, role))

# 2. READ:
# cursor.execute("SELECT * FROM users WHERE role = ?", (role,))

# 3. UPDATE:
# cursor.execute("UPDATE users SET role = ? WHERE id = ?", (new_role, user_id))

# 4. DELETE:
# cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))`,
    basicExample: {
      code: `import sqlite3

conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row
cursor = conn.cursor()
cursor.execute("CREATE TABLE tasks (id INTEGER PRIMARY KEY, title TEXT, done INT)")

# 1. CREATE
cursor.execute("INSERT INTO tasks (title, done) VALUES (?, ?)", ("Build Python Trail", 0))
task_id = cursor.lastrowid

# 2. READ
cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
print("Read Task:", dict(cursor.fetchone()))

# 3. UPDATE
cursor.execute("UPDATE tasks SET done = 1 WHERE id = ?", (task_id,))
cursor.execute("SELECT done FROM tasks WHERE id = ?", (task_id,))
print("Updated Done Status:", cursor.fetchone()["done"])

# 4. DELETE
cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
print("After Delete:", cursor.fetchone())

conn.close()`,
      output: `Read Task: {'id': 1, 'title': 'Build Python Trail', 'done': 0}
Updated Done Status: 1
After Delete: None`
    },
    detailedExample: {
      code: `import sqlite3

# The SQL Injection Danger vs Parameterized Safety
conn = sqlite3.connect(":memory:")
cursor = conn.cursor()
cursor.execute("CREATE TABLE accounts (username TEXT, balance REAL)")
cursor.execute("INSERT INTO accounts VALUES ('admin', 5000.00)")
cursor.execute("INSERT INTO accounts VALUES ('swamy', 100.00)")

# Dangerous: String Formatting (Vulnerable to ' OR '1'='1)
malicious_input = "' OR '1'='1"
# f"SELECT * FROM accounts WHERE username = '{malicious_input}'"
# -> returns ALL ACCOUNTS to the hacker!

# Secure: Parameterized Query
cursor.execute("SELECT * FROM accounts WHERE username = ?", (malicious_input,))
safe_result = cursor.fetchall()

print("Secure query with malicious input found:", safe_result)
print("No accounts compromised!")

conn.close()`,
      output: `Secure query with malicious input found: []
No accounts compromised!`
    },
    codeExplanation: [
      'Line 14: Parameterized queries send SQL query structure and data values through separate database protocols.',
      'Line 15: The database engine treats the attacker\'s `\' OR \'1\'=\'1` strictly as literal string characters, not executable SQL syntax.'
    ],
    commonMistakes: [
      {
        mistake: 'Using Python string formatting (`f"SELECT ... {user_var}"`) for SQL queries.',
        whyItIsWrong: 'Leaves the application vulnerable to SQL Injection, allowing malicious users to read, drop, or alter database tables.',
        correction: 'Always use `?` placeholders: `cursor.execute("SELECT ... WHERE col = ?", (user_var,))`.'
      },
      {
        mistake: 'Writing `UPDATE` or `DELETE` statements without a `WHERE` clause.',
        whyItIsWrong: 'Modifies or wipes EVERY single row in the entire table.',
        correction: 'Always verify your `WHERE` condition when updating or deleting records.'
      }
    ],
    importantRules: [
      'Never use f-strings or `.format()` to build SQL statements.',
      'Always use `?` placeholders for parameter binding.',
      'Always test `cursor.rowcount` to verify how many rows were updated or deleted.'
    ],
    interviewPerspective: 'In interviews, demonstrating that you never concatenate user input into SQL and always use parameterized queries is a mandatory baseline for security.',
    practiceQuestions: [
      {
        question: 'Why should you never use Python string concatenation or f-strings to construct SQL queries?',
        solution: 'Because it exposes the database to SQL Injection attacks.'
      },
      {
        question: 'Which property on a cursor returns the auto-increment ID of the most recently inserted row?',
        solution: 'cursor.lastrowid'
      }
    ],
    checkpoint: [
      {
        id: 'm18-t4-q1',
        type: 'mcq',
        prompt: 'What is the primary security reason to always use parameterized queries (`?`) in database operations?',
        options: [
          'To prevent SQL Injection attacks by treating input values strictly as data literals rather than executable SQL syntax',
          'To format column names automatically',
          'To compress database files on disk',
          'To run queries asynchronously'
        ],
        correctAnswer: 0,
        explanation: 'Parameterized queries separate SQL commands from data values, eliminating SQL injection.'
      },
      {
        id: 'm18-t4-q2',
        type: 'output',
        prompt: 'What SQL keyword is used to modify existing rows in a database table?',
        correctAnswer: 'UPDATE',
        explanation: 'The `UPDATE` statement modifies existing rows in SQL tables.'
      }
    ]
  },

  'sqlalchemy-orm-overview': {
    id: 'sqlalchemy-orm-overview',
    moduleId: 'm18',
    topicNumber: 5,
    title: 'SQLAlchemy & ORM Overview',
    shortSummary: 'Object-Relational Mapping concepts, Declarative Models, and Sessions overview.',
    whatIsIt: 'An Object-Relational Mapper (ORM) maps database tables to Python classes and rows to Python object instances. SQLAlchemy is the industry-standard Python ORM toolkit, allowing developers to query and manipulate databases using native Python OOP instead of raw SQL strings.',
    whyDoWeNeedIt: 'ORMs provide database engine agnosticism (code works on SQLite, PostgreSQL, and MySQL without changes), automatic schema migrations, and clean object-oriented data models.',
    syntax: `# Basic SQLAlchemy Declarative Model Concept:
# from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session
# from sqlalchemy import create_engine

# class Base(DeclarativeBase): pass
# class User(Base):
#     __tablename__ = "users"
#     id: Mapped[int] = mapped_column(primary_key=True)
#     name: Mapped[str]

# engine = create_engine("sqlite:///app.db")
# with Session(engine) as session:
#     user = session.query(User).filter_by(name="Swamy").first()`,
    basicExample: {
      code: `# Simulating the ORM Concept in Python:
class SimulatedUserRecord:
    def __init__(self, id, name, email):
        self.id = id
        self.name = name
        self.email = email

    def save(self):
        return f"Emitting: INSERT INTO users VALUES ({self.id}, '{self.name}', '{self.email}')"

# Working with Python Objects instead of raw SQL strings:
user = SimulatedUserRecord(101, "Swamy", "swamy@levelup.dev")
print("User Object:", user.name, f"({user.email})")
print("ORM Query Generation:", user.save())`,
      output: `User Object: Swamy (swamy@levelup.dev)
ORM Query Generation: Emitting: INSERT INTO users VALUES (101, 'Swamy', 'swamy@levelup.dev')`
    },
    detailedExample: {
      code: `# Comparison: Raw SQL vs ORM Approaches
# ----------------------------------------------------
# 1. Raw SQL Approach:
# cursor.execute("SELECT * FROM employees WHERE dept = ? AND salary > ?", ("AI", 80000))
# rows = cursor.fetchall()
# emp_names = [r[1] for r in rows]

# 2. ORM Approach:
# employees = session.query(Employee).filter(Employee.dept == "AI", Employee.salary > 80000).all()
# emp_names = [e.name for e in employees]

print("Advantages of ORM:")
print(" - Type safety and IDE autocompletion")
print(" - Database engine portability (SQLite <-> Postgres <-> MySQL)")
print(" - Automatic relationship joins (e.g. user.orders)")`,
      output: `Advantages of ORM:
 - Type safety and IDE autocompletion
 - Database engine portability (SQLite <-> Postgres <-> MySQL)
 - Automatic relationship joins (e.g. user.orders)`
    },
    codeExplanation: [
      'Line 1: Demonstrates how ORMs allow querying database tables using Python object dot-notation and method chaining instead of manual SQL strings.'
    ],
    commonMistakes: [
      {
        mistake: 'Using an ORM for complex high-throughput batch analytics where raw SQL queries or bulk inserts are 100x faster.',
        whyItIsWrong: 'ORMs incur object instantiation overhead for millions of records.',
        correction: 'Use ORMs for application business logic; use bulk inserts or raw SQL for high-volume data pipelines.'
      },
      {
        mistake: 'Triggering the "N+1 Query Problem" in ORMs (querying a parent in a loop and loading children one-by-one).',
        whyItIsWrong: 'Fires hundreds of separate database queries, causing severe latency.',
        correction: 'Use eager loading (e.g. `joinedload` or `selectinload` in SQLAlchemy).'
      }
    ],
    importantRules: [
      'An ORM maps database tables to Python classes and rows to object instances.',
      'SQLAlchemy is the premier ORM toolkit for production Python applications.',
      'ORMs provide database engine agnosticism and relationship modeling.'
    ],
    interviewPerspective: 'A favourite full-stack interview question: "What is the N+1 query problem in ORMs and how do you resolve it with eager loading?"',
    practiceQuestions: [
      {
        question: 'What does the acronym ORM stand for in software engineering?',
        solution: 'Object-Relational Mapping (or Object-Relational Mapper)'
      },
      {
        question: 'What is the primary benefit of using an ORM over raw SQL in terms of database engines?',
        solution: 'Database portability (code can switch between SQLite, PostgreSQL, and MySQL without rewriting SQL syntax).'
      }
    ],
    checkpoint: [
      {
        id: 'm18-t5-q1',
        type: 'mcq',
        prompt: 'What is the primary purpose of an Object-Relational Mapper (ORM) like SQLAlchemy?',
        options: [
          'To map database tables to Python classes and rows to Python objects for clean OOP interaction',
          'To compile Python into HTML',
          'To replace the operating system filesystem',
          'To encrypt internet cables'
        ],
        correctAnswer: 0,
        explanation: 'ORMs map relational database tables to Python classes and records to object instances.'
      },
      {
        id: 'm18-t5-q2',
        type: 'output',
        prompt: 'What does ORM stand for? (Uppercase acronym only: 3 letters)',
        correctAnswer: 'ORM',
        explanation: 'ORM stands for Object-Relational Mapping.'
      }
    ]
  },

  // =========================================================================
  // MODULE 19: Virtual Environments & Project Structure (5 Topics)
  // =========================================================================
  'venv': {
    id: 'venv',
    moduleId: 'm19',
    topicNumber: 1,
    title: 'Virtual Environments with `venv`',
    shortSummary: 'Isolated Python environments, creating, activating, and deactivating environments.',
    whatIsIt: 'A Virtual Environment is an isolated directory tree that contains its own Python interpreter and independent set of installed libraries. The built-in `venv` module allows creating isolated environments per project.',
    whyDoWeNeedIt: 'Prevents "Dependency Hell" where Project A requires `Django 4.2` while Project B requires `Django 5.0`. Isolated environments prevent conflicts and protect system Python libraries.',
    syntax: `# 1. Create a virtual environment:
# python -m venv .venv

# 2. Activate virtual environment:
# Windows (PowerShell): .venv\\Scripts\\Activate.ps1
# Windows (CMD):        .venv\\Scripts\\activate.bat
# macOS / Linux:        source .venv/bin/activate

# 3. Deactivate:
# deactivate`,
    basicExample: {
      code: `import sys

# Inspecting whether the current Python process is running in a Virtual Environment:
def check_virtual_env():
    # In a virtualenv, sys.prefix differs from sys.base_prefix
    is_in_venv = getattr(sys, "base_prefix", sys.prefix) != sys.prefix
    print("Python Executable:", sys.executable)
    print("Running inside virtual environment:", is_in_venv)

check_virtual_env()`,
      output: `Python Executable: /usr/bin/python3
Running inside virtual environment: True`
    },
    detailedExample: {
      code: `# Standard Terminal Workflow Commands:
commands = [
    ("Step 1: Create virtual environment", "python -m venv .venv"),
    ("Step 2: Activate environment (Windows)", ".venv\\\\Scripts\\\\activate"),
    ("Step 2: Activate environment (Linux/Mac)", "source .venv/bin/activate"),
    ("Step 3: Upgrade pip installer", "python -m pip install --upgrade pip"),
    ("Step 4: Install project dependencies", "pip install -r requirements.txt"),
    ("Step 5: Deactivate when done", "deactivate")
]

for step, cmd in commands:
    print(f"{step:<45} -> {cmd}")`,
      output: `Step 1: Create virtual environment            -> python -m venv .venv
Step 2: Activate environment (Windows)        -> .venv\\Scripts\\activate
Step 2: Activate environment (Linux/Mac)      -> source .venv/bin/activate
Step 3: Upgrade pip installer                 -> python -m pip install --upgrade pip
Step 4: Install project dependencies          -> pip install -r requirements.txt
Step 5: Deactivate when done                  -> deactivate`
    },
    codeExplanation: [
      'Line 1: Summarizes the standard developer workflow for managing virtual environments across Windows, macOS, and Linux.'
    ],
    commonMistakes: [
      {
        mistake: 'Committing the `.venv` folder into Git repositories.',
        whyItIsWrong: 'The virtual environment folder contains hundreds of megabytes of binary executables tied to a single machine\'s OS architecture.',
        correction: 'Always add `.venv/` and `venv/` to `.gitignore`.'
      },
      {
        mistake: 'Running `pip install` before activating the virtual environment.',
        whyItIsWrong: 'Installs packages globally into the system Python or user home folder instead of the project.',
        correction: 'Verify your terminal prompt shows `(.venv)` before running `pip install`.'
      }
    ],
    importantRules: [
      'Always create a separate virtual environment for each Python project.',
      'Never commit virtual environment folders (`.venv/`) into Git.',
      'Use `deactivate` to exit a virtual environment.'
    ],
    interviewPerspective: 'Interviewers often ask how Python determines module search paths when a virtual environment is active (via `pyvenv.cfg` and `sys.prefix`).',
    practiceQuestions: [
      {
        question: 'Which terminal command creates a virtual environment named ".venv" using Python 3?',
        solution: 'python -m venv .venv'
      },
      {
        question: 'Which command deactivates the currently active virtual environment?',
        solution: 'deactivate'
      }
    ],
    checkpoint: [
      {
        id: 'm19-t1-q1',
        type: 'mcq',
        prompt: 'Why should the `.venv` directory NEVER be committed into a Git version control repository?',
        options: [
          'It contains machine-specific binaries and large dependencies that should be reinstalled via requirements.txt instead',
          'Git cannot commit folders that begin with a dot',
          'Python will refuse to run on other computers',
          'It exposes secret passwords'
        ],
        correctAnswer: 0,
        explanation: 'Virtual environment folders are platform-specific binaries and must be excluded from Git via `.gitignore`.'
      },
      {
        id: 'm19-t1-q2',
        type: 'output',
        prompt: 'What command is used on macOS/Linux to activate a virtual environment located in folder `venv`?',
        correctAnswer: 'source venv/bin/activate',
        explanation: '`source venv/bin/activate` activates the environment in Unix/Linux shells.'
      }
    ]
  },

  'requirements-txt': {
    id: 'requirements-txt',
    moduleId: 'm19',
    topicNumber: 2,
    title: '`requirements.txt` & Dependency Pinning',
    shortSummary: 'Generating dependency files, version specifiers (==, >=, ~=), and reproducible environments.',
    whatIsIt: 'A `requirements.txt` file is the standard text specification pinning all external library dependencies and version constraints for a Python project. It ensures that any team member or deployment server can recreate the exact same runtime environment.',
    whyDoWeNeedIt: 'Without pinned requirements, running `pip install requests` on a deployment server might install a breaking newer version, causing production outages.',
    syntax: `# requirements.txt syntax examples:
# fastapi==0.110.0      (Exact locked version)
# uvicorn>=0.29.0       (Minimum version)
# requests~=2.31.0      (Compatible release 2.31.x)
# pytest>=8.0.0,<9.0.0  (Version range)

# Export installed packages:
# pip freeze > requirements.txt

# Install from file:
# pip install -r requirements.txt`,
    basicExample: {
      code: `# Parsing a requirements.txt file programmatically:
sample_requirements = """
# Production API Dependencies
fastapi==0.110.0
pydantic>=2.6.0
uvicorn[standard]==0.29.0
python-dotenv~=1.0.0
"""

dependencies = []
for line in sample_requirements.strip().splitlines():
    line = line.strip()
    if line and not line.startswith("#"):
        pkg = line.split("=")[0].split(">")[0].split("<")[0].split("~")[0].strip()
        dependencies.append(pkg)

print("Parsed Dependencies:", dependencies)`,
      output: `Parsed Dependencies: ['fastapi', 'pydantic', 'uvicorn[standard]', 'python-dotenv']`
    },
    detailedExample: {
      code: `# Understanding Version Specifiers in Python:
# == 2.31.0  -> Strict match (Best for application deployment)
# >= 2.0.0   -> Any version greater than or equal to 2.0.0
# ~= 2.31.0  -> Compatible release: equivalent to >= 2.31.0, == 2.*
# != 2.30.0  -> Exclude specific buggy version

def check_compatibility(spec, installed):
    if spec.startswith("=="):
        target = spec.replace("==", "")
        return target == installed
    return True

print("Is '2.31.0' compatible with '==2.31.0'?", check_compatibility("==2.31.0", "2.31.0"))
print("Is '3.0.0' compatible with '==2.31.0'?", check_compatibility("==2.31.0", "3.0.0"))`,
      output: `Is '2.31.0' compatible with '==2.31.0'? True
Is '3.0.0' compatible with '==2.31.0'? False`
    },
    codeExplanation: [
      'Line 1: Outlines standard PEP 440 version specifier conventions in Python packaging.'
    ],
    commonMistakes: [
      {
        mistake: 'Leaving dependency versions completely unpinned in production repositories (`requests`, `pandas`).',
        whyItIsWrong: 'A future release of the library with breaking API changes will silently break production deployments.',
        correction: 'Pin exact versions with `==` or compatible ranges with `~=` in `requirements.txt`.'
      },
      {
        mistake: 'Editing `requirements.txt` manually and introducing invalid whitespace or syntax.',
        whyItIsWrong: 'Causes `pip install -r requirements.txt` to fail during deployment.',
        correction: 'Generate requirements cleanly using `pip freeze > requirements.txt`.'
      }
    ],
    importantRules: [
      'Use `pip freeze > requirements.txt` to capture installed dependencies.',
      'Use `pip install -r requirements.txt` to install listed packages.',
      'Pin exact versions for production applications.'
    ],
    interviewPerspective: 'Interviewers often ask how `requirements.txt` compares with modern package managers like Poetry (`pyproject.toml`) and `pip-tools`.',
    practiceQuestions: [
      {
        question: 'Which pip command installs all dependencies specified in requirements.txt?',
        solution: 'pip install -r requirements.txt'
      },
      {
        question: 'Which version operator in requirements.txt pins an exact locked version?',
        solution: '=='
      }
    ],
    checkpoint: [
      {
        id: 'm19-t2-q1',
        type: 'mcq',
        prompt: 'Which operator in `requirements.txt` locks an exact package version for reproducible builds?',
        options: ['==', '=', ':=', '->'],
        correctAnswer: 0,
        explanation: '`==` specifies an exact locked version (e.g. `requests==2.31.0`).'
      },
      {
        id: 'm19-t2-q2',
        type: 'output',
        prompt: 'What flag must be passed to `pip install` to read packages from a requirements file: `pip install ___ requirements.txt`?',
        correctAnswer: '-r',
        explanation: 'The `-r` flag instructs pip to read dependencies from a requirements file.'
      }
    ]
  },

  'python-project-structure': {
    id: 'python-project-structure',
    moduleId: 'm19',
    topicNumber: 3,
    title: 'Professional Python Project Structure',
    shortSummary: 'Standard production directory layouts: src/, tests/, docs/, README.md, and .gitignore.',
    whatIsIt: 'A professional Python project structure separates business logic, tests, configuration, documentation, and metadata into organized directories following the `src/` layout pattern recommended by the Python Packaging Authority (PyPA).',
    whyDoWeNeedIt: 'Placing all code in a single root directory leads to namespace collisions, makes automated testing difficult, and prevents packaging the application cleanly.',
    syntax: `my_project/
├── .venv/               # Virtual environment (ignored in Git)
├── .gitignore           # Git ignore list
├── README.md            # Project documentation & setup guide
├── requirements.txt     # Pinned external dependencies
├── setup.py / pyproject.toml
├── src/                 # Application source package
│   └── my_package/
│       ├── __init__.py
│       ├── main.py      # Entry point
│       ├── core.py      # Business logic
│       └── utils.py     # Reusable helpers
└── tests/               # Automated test suite
    ├── __init__.py
    ├── test_core.py
    └── test_utils.py`,
    basicExample: {
      code: `# Standard Production Python Directory Layout:
structure = """
levelup_app/
├── src/
│   └── levelup/
│       ├── __init__.py
│       ├── api.py
│       ├── models.py
│       └── config.py
├── tests/
│   └── test_api.py
├── .gitignore
├── requirements.txt
└── README.md
"""

print("Standard PyPA 'src' Layout Structure:")
print(structure.strip())`,
      output: `Standard PyPA 'src' Layout Structure:
levelup_app/
├── src/
│   └── levelup/
│       ├── __init__.py
│       ├── api.py
│       ├── models.py
│       └── config.py
├── tests/
│   └── test_api.py
├── .gitignore
├── requirements.txt
└── README.md`
    },
    detailedExample: {
      code: `# Essential entries for a Python .gitignore file:
gitignore_template = """
# Python Bytecode & Cache
__pycache__/
*.py[cod]
*$py.class

# Virtual Environments
.venv/
venv/
env/

# Environment Variables & Secrets
.env
.env.local
*.secret

# Testing & Coverage
.pytest_cache/
.coverage
htmlcov/

# IDE files
.vscode/
.idea/
"""

print("Recommended .gitignore Entries:")
print(gitignore_template.strip())`,
      output: `Recommended .gitignore Entries:
# Python Bytecode & Cache
__pycache__/
*.py[cod]
*$py.class

# Virtual Environments
.venv/
venv/
env/

# Environment Variables & Secrets
.env
.env.local
*.secret

# Testing & Coverage
.pytest_cache/
.coverage
htmlcov/

# IDE files
.vscode/
.idea/`
    },
    codeExplanation: [
      'Line 1: Outlines standard `.gitignore` rules that prevent polluting Git repositories with bytecode, secrets, and IDE settings.'
    ],
    commonMistakes: [
      {
        mistake: 'Putting source files directly in the project root without a package folder or `src/` directory.',
        whyItIsWrong: 'Causes test runners to accidentally import local files instead of the installed package and creates naming collisions.',
        correction: 'Adopt the `src/package_name/` layout pattern.'
      },
      {
        mistake: 'Forgetting to include a `README.md` explaining how to install dependencies and run the project.',
        whyItIsWrong: 'Collaborators and recruiters cannot run or evaluate your project without clear instructions.',
        correction: 'Always provide setup commands (`venv`, `pip install`, `python main.py`) in `README.md`.'
      }
    ],
    importantRules: [
      'Use the `src/` layout for clean separation of package code.',
      'Place automated test files in a dedicated `tests/` directory.',
      'Include `README.md`, `.gitignore`, and `requirements.txt` in the root folder.'
    ],
    interviewPerspective: 'In technical architecture interviews, presenting clean project directory structures demonstrates production experience and code maturity.',
    practiceQuestions: [
      {
        question: 'Which directory is traditionally used to store automated unit and integration tests in a Python project?',
        solution: 'tests/'
      },
      {
        question: 'What is the purpose of a .gitignore file in a Python project?',
        solution: 'To specify untracked files (bytecode, virtual environments, secrets) that Git should ignore.'
      }
    ],
    checkpoint: [
      {
        id: 'm19-t3-q1',
        type: 'mcq',
        prompt: 'Which file should be placed in the project root to instruct Git to ignore virtual environments, `__pycache__`, and `.env` secret files?',
        options: ['.gitignore', '.gitkeep', 'requirements.txt', 'setup.cfg'],
        correctAnswer: 0,
        explanation: '`.gitignore` defines patterns of files and directories to be excluded from version control.'
      },
      {
        id: 'm19-t3-q2',
        type: 'output',
        prompt: 'What standard markdown file in the project root provides project documentation, installation steps, and usage instructions?',
        correctAnswer: 'README.md',
        explanation: '`README.md` is the primary documentation file for open-source and professional repositories.'
      }
    ]
  },

  'organizing-python-projects': {
    id: 'organizing-python-projects',
    moduleId: 'm19',
    topicNumber: 4,
    title: 'Organizing Modules, Packages & Single Responsibility',
    shortSummary: 'Separation of concerns, modular design, configuration management, and clean architecture.',
    whatIsIt: 'Organizing Python projects involves applying the Single Responsibility Principle (SRP): separating routing/CLI entry points, domain business logic, database persistence, and external service clients into dedicated modules.',
    whyDoWeNeedIt: 'Monolithic single-file scripts ("god files") with 3,000+ lines are impossible to maintain, unit test, or collaborate on in engineering teams.',
    syntax: `# Clean Module Architecture:
# config.py  -> Environment variables & constants
# models.py  -> Data classes / ORM models
# db.py      -> Database connections & queries
# client.py  -> Third-party API integrations
# main.py    -> Entry point / CLI orchestrator`,
    basicExample: {
      code: `# Multi-module collaboration architecture simulation:

class AppConfig:
    DB_NAME = "levelup.db"
    API_URL = "https://api.levelup.dev"

class UserDatabase:
    @staticmethod
    def get_user_count():
        return 42

class ApplicationService:
    def __init__(self, db, config):
        self.db = db
        self.config = config

    def get_dashboard_summary(self):
        return f"Connected to {self.config.DB_NAME} | Active Users: {self.db.get_user_count()}"

app = ApplicationService(UserDatabase(), AppConfig())
print(app.get_dashboard_summary())`,
      output: `Connected to levelup.db | Active Users: 42`
    },
    detailedExample: {
      code: `# Principles of Clean Python Architecture:
principles = [
    ("Single Responsibility", "Each module/class should have one and only one reason to change."),
    ("Separation of Concerns", "Keep UI/CLI logic separate from database access and business math."),
    ("Dependency Injection", "Pass database handles and API clients as parameters for testability."),
    ("Configuration Isolation", "Load API keys and ports from environment variables, not hardcoded strings.")
]

for name, desc in principles:
    print(f"[{name}]\\n  -> {desc}\\n")`,
      output: `[Single Responsibility]
  -> Each module/class should have one and only one reason to change.

[Separation of Concerns]
  -> Keep UI/CLI logic separate from database access and business math.

[Dependency Injection]
  -> Pass database handles and API clients as parameters for testability.

[Configuration Isolation]
  -> Load API keys and ports from environment variables, not hardcoded strings.`
    },
    codeExplanation: [
      'Line 1: Outlines core clean architecture principles for building maintainable Python codebases.'
    ],
    commonMistakes: [
      {
        mistake: 'Mixing database SQL queries directly inside CLI print loops.',
        whyItIsWrong: 'Makes automated testing impossible without mocking terminal prints and causes tight coupling.',
        correction: 'Separate database queries into a repository/service module and call it from the CLI.'
      },
      {
        mistake: 'Creating circular import loops between sibling modules.',
        whyItIsWrong: 'Causes `ImportError: cannot import name ... from partially initialized module`.',
        correction: 'Refactor shared models and constants into a lower-level `common.py` or `models.py` module.'
      }
    ],
    importantRules: [
      'Separate CLI/HTTP handlers from business logic and database queries.',
      'Keep modules focused on a single domain area.',
      'Avoid circular dependencies by structuring hierarchical module dependencies.'
    ],
    interviewPerspective: 'Interviewers often ask how you would refactor a 2,000-line monolithic script into clean, modular, testable components.',
    practiceQuestions: [
      {
        question: 'Which software design principle states that a module or class should have only one reason to change?',
        solution: 'Single Responsibility Principle (SRP)'
      },
      {
        question: 'How do you fix circular import errors between two sibling modules in Python?',
        solution: 'Extract shared classes, constants, or types into a third common module (e.g. models.py or common.py).'
      }
    ],
    checkpoint: [
      {
        id: 'm19-t4-q1',
        type: 'mcq',
        prompt: 'Why should database access queries be separated from user interface (CLI / Web) code in distinct modules?',
        options: [
          'To enable unit testing without a UI and allow changing database logic without modifying the UI',
          'To increase download speeds on GitHub',
          'To convert SQLite to HTML automatically',
          'Because Python forbids having SQL and print in the same file'
        ],
        correctAnswer: 0,
        explanation: 'Separating concerns enables independent unit testing, modularity, and clean refactoring.'
      },
      {
        id: 'm19-t4-q2',
        type: 'output',
        prompt: 'What error is raised in Python when module A imports module B and module B simultaneously imports module A at the top level?',
        correctAnswer: 'ImportError',
        explanation: 'Circular imports raise `ImportError: cannot import name ... from partially initialized module`.'
      }
    ]
  },

  'intro-to-git': {
    id: 'intro-to-git',
    moduleId: 'm19',
    topicNumber: 5,
    title: 'Introduction to Git Version Control',
    shortSummary: 'git init, add, commit, status, log, branch, and remote push/pull workflows.',
    whatIsIt: 'Git is the world\'s standard distributed Version Control System (VCS) that records changes to files over time, allowing you to recall specific versions, collaborate on branches, and deploy software via platforms like GitHub and GitLab.',
    whyDoWeNeedIt: 'Git provides safety nets (undoing breaking changes), branching for feature development without disrupting production code, and collaborative team workflows.',
    syntax: `# Basic Git Commands:
# git init              # Initialize new local repo
# git status            # Inspect modified/staged files
# git add .             # Stage all modified files
# git commit -m "feat"  # Record snapshot with message
# git log --oneline     # View commit history
# git branch feature    # Create new branch
# git push origin main  # Upload to remote GitHub repo`,
    basicExample: {
      code: `# Simulating Git Staging and Commit Lifecycle:
class MockGitRepository:
    def __init__(self):
        self.working_directory = ["main.py", "utils.py"]
        self.staging_area = []
        self.commits = []

    def git_add(self, filename):
        if filename in self.working_directory:
            self.staging_area.append(filename)
            print(f"[git add] Staged: {filename}")

    def git_commit(self, message):
        if not self.staging_area:
            print("[git commit] Nothing to commit (working tree clean)")
            return
        commit_id = f"commit_{len(self.commits)+1:03d}"
        self.commits.append({"id": commit_id, "msg": message, "files": list(self.staging_area)})
        self.staging_area.clear()
        print(f"[git commit] [{commit_id}] {message}")

repo = MockGitRepository()
repo.git_add("main.py")
repo.git_commit("feat: initial project setup")`,
      output: `[git add] Staged: main.py
[git commit] [commit_001] feat: initial project setup`
    },
    detailedExample: {
      code: `# Standard Git Feature-Branch Workflow:
workflow = [
    ("1. Create and switch to new branch", "git checkout -b feat/api-integration"),
    ("2. Make changes and verify status", "git status"),
    ("3. Stage modified files", "git add src/api.py tests/test_api.py"),
    ("4. Commit with descriptive message", "git commit -m 'feat(api): add weather endpoint client'"),
    ("5. Push branch to GitHub remote", "git push -u origin feat/api-integration"),
    ("6. Switch back to main branch", "git checkout main"),
    ("7. Pull latest updates from team", "git pull origin main")
]

print("Standard Git Branching & Collaboration Workflow:")
for step, cmd in workflow:
    print(f"{step:<42} -> {cmd}")`,
      output: `Standard Git Branching & Collaboration Workflow:
1. Create and switch to new branch         -> git checkout -b feat/api-integration
2. Make changes and verify status          -> git status
3. Stage modified files                    -> git add src/api.py tests/test_api.py
4. Commit with descriptive message         -> git commit -m 'feat(api): add weather endpoint client'
5. Push branch to GitHub remote            -> git push -u origin feat/api-integration
6. Switch back to main branch              -> git checkout main
7. Pull latest updates from team           -> git pull origin main`
    },
    codeExplanation: [
      'Line 1: Demonstrates industry-standard feature branching workflows used across professional engineering teams.'
    ],
    commonMistakes: [
      {
        mistake: 'Writing vague, useless commit messages like `git commit -m "update"` or `git commit -m "fixed stuff"`.',
        whyItIsWrong: 'Makes project history incomprehensible when debugging regressions.',
        correction: 'Use Conventional Commits (e.g. `feat: add user authentication`, `fix: handle null API responses`).'
      },
      {
        mistake: 'Accidentally committing database passwords or API keys to Git.',
        whyItIsWrong: 'Once pushed to GitHub, secret keys remain in git history even if deleted in a later commit.',
        correction: 'Use `.gitignore` before creating your first commit.'
      }
    ],
    importantRules: [
      'Always check `git status` before committing.',
      'Write clear, concise commit messages in the imperative mood.',
      'Use feature branches to keep the `main` branch stable and deployable.'
    ],
    interviewPerspective: 'Interviewers expect every software engineer to know basic Git commands (`add`, `commit`, `push`, `pull`, `branch`, `merge`, and resolving merge conflicts).',
    practiceQuestions: [
      {
        question: 'Which Git command stages all modified and new files in the current directory for the next commit?',
        solution: 'git add .'
      },
      {
        question: 'Which Git command records staged changes into the repository history with a descriptive message?',
        solution: 'git commit -m "message"'
      }
    ],
    checkpoint: [
      {
        id: 'm19-t5-q1',
        type: 'mcq',
        prompt: 'Which Git command checks the state of the working directory and staging area, showing which files are untracked or modified?',
        options: ['git status', 'git check', 'git inspect', 'git log'],
        correctAnswer: 0,
        explanation: '`git status` displays modified, untracked, and staged files.'
      },
      {
        id: 'm19-t5-q2',
        type: 'output',
        prompt: 'What command is used to initialize a brand new empty Git repository in the current directory?',
        correctAnswer: 'git init',
        explanation: '`git init` initializes a new Git repository.'
      }
    ]
  },

  // =========================================================================
  // MODULE 20: Testing & Debugging (5 Topics)
  // =========================================================================
  'unittest-basics': {
    id: 'unittest-basics',
    moduleId: 'm20',
    topicNumber: 1,
    title: '`unittest` & Built-in Test Frameworks',
    shortSummary: 'TestCase classes, assertions (assertEqual, assertTrue, assertRaises), and test runners.',
    whatIsIt: '`unittest` is Python\'s built-in unit testing framework (inspired by JUnit). Tests are organized as methods inside classes that inherit from `unittest.TestCase`, using assertion methods like `self.assertEqual()` and `self.assertRaises()` to verify code behavior.',
    whyDoWeNeedIt: 'Automated testing guarantees that new features or bug fixes do not introduce regressions (breaking existing working code).',
    syntax: `import unittest

def add(a, b): return a + b

class TestMath(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)

# Run tests:
# if __name__ == '__main__':
#     unittest.main()`,
    basicExample: {
      code: `import unittest

def calculate_discount(price, discount_percent):
    if price < 0 or discount_percent < 0 or discount_percent > 100:
        raise ValueError("Invalid price or discount range")
    return price * (1 - discount_percent / 100.0)

class TestDiscount(unittest.TestCase):
    def test_standard_discount(self):
        self.assertAlmostEqual(calculate_discount(100, 20), 80.0)

    def test_zero_discount(self):
        self.assertEqual(calculate_discount(50, 0), 50.0)

    def test_invalid_discount_raises(self):
        with self.assertRaises(ValueError):
            calculate_discount(100, 150)

# Simulate test execution
suite = unittest.TestLoader().loadTestsFromTestCase(TestDiscount)
runner = unittest.TextTestRunner(verbosity=0)
result = runner.run(suite)

print("Tests Run:", result.testsRun)
print("Was Successful:", result.wasSuccessful())`,
      output: `Tests Run: 3
Was Successful: True`
    },
    detailedExample: {
      code: `# Standard unittest Assertion Methods:
# self.assertEqual(a, b)       -> a == b
# self.assertNotEqual(a, b)    -> a != b
# self.assertTrue(x)           -> bool(x) is True
# self.assertFalse(x)          -> bool(x) is False
# self.assertIs(a, b)          -> a is b
# self.assertIsNone(x)         -> x is None
# self.assertIn(a, b)          -> a in b
# self.assertRaises(Exception) -> with block raises Exception

print("Common unittest assertions table verified.")`,
      output: `Common unittest assertions table verified.`
    },
    codeExplanation: [
      'Line 10: `test_` prefix is mandatory for test methods in `unittest.TestCase`.',
      'Line 17: `with self.assertRaises(ValueError):` tests that invalid inputs correctly raise the expected exception.'
    ],
    commonMistakes: [
      {
        mistake: 'Naming test methods without the `test_` prefix: `def check_addition(self):`.',
        whyItIsWrong: '`unittest` discovers and runs ONLY methods that begin with `test_`. Non-prefixed methods are skipped.',
        correction: 'Always prefix test methods with `test_` (e.g. `def test_check_addition(self):`).'
      },
      {
        mistake: 'Using regular `assert a == b` inside `unittest.TestCase` instead of `self.assertEqual(a, b)`.',
        whyItIsWrong: '`self.assertEqual()` provides rich failure diffs showing exact expected vs actual mismatches.',
        correction: 'Use `self.assertEqual()`, `self.assertTrue()`, and `self.assertRaises()`.'
      }
    ],
    importantRules: [
      'Test classes must inherit from `unittest.TestCase`.',
      'All test methods must start with the `test_` prefix.',
      'Use `setUp()` and `tearDown()` methods for per-test fixture initialization and cleanup.'
    ],
    interviewPerspective: 'Interviewers often ask how to write unit tests for code that throws exceptions (`self.assertRaises` / `pytest.raises`).',
    practiceQuestions: [
      {
        question: 'What prefix must all test methods have in a `unittest.TestCase` class?',
        solution: 'test_ (e.g. def test_feature(self):)'
      },
      {
        question: 'Which assertion method verifies that a function raises a specific exception?',
        solution: 'self.assertRaises(ExceptionClass)'
      }
    ],
    checkpoint: [
      {
        id: 'm20-t1-q1',
        type: 'mcq',
        prompt: 'Why must test methods inside a `unittest.TestCase` class begin with the prefix `test_`?',
        options: [
          'Because the unittest test runner uses the `test_` naming convention to discover and execute test methods automatically',
          'It is required by the Python interpreter for compilation',
          'To encrypt the test results',
          'To run tests with root permissions'
        ],
        correctAnswer: 0,
        explanation: 'Test runners discover and execute only methods starting with `test_`.'
      },
      {
        id: 'm20-t1-q2',
        type: 'output',
        prompt: 'What built-in standard library module provides the `TestCase` class for unit testing in Python?',
        correctAnswer: 'unittest',
        explanation: 'The `unittest` module provides built-in testing capabilities.'
      }
    ]
  },

  'pytest-basics': {
    id: 'pytest-basics',
    moduleId: 'm20',
    topicNumber: 2,
    title: '`pytest` & Modern Python Testing',
    shortSummary: 'Why pytest is preferred, standard assert statements, test discovery, and fixtures intro.',
    whatIsIt: '`pytest` is the most popular, powerful third-party testing framework for Python. Unlike `unittest`, `pytest` requires zero boilerplate: you write simple functions (no classes required), use plain Python `assert` statements, and benefit from advanced fixtures and parameterized tests.',
    whyDoWeNeedIt: '`pytest` reduces boilerplate by 60%, produces detailed failure diffs, and provides powerful test filtering (`pytest -k "test_user"`).',
    syntax: `# Installing pytest:
# pip install pytest

# File: test_math.py
def add(a, b): return a + b

def test_add_positive():
    assert add(2, 3) == 5

def test_add_negative():
    assert add(-1, -1) == -2

# Running tests from terminal:
# pytest
# pytest -v (verbose mode)
# pytest -k "test_add"`,
    basicExample: {
      code: `# Simulating pytest plain assert evaluation:
def is_palindrome(s):
    cleaned = "".join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]

# In pytest, you write simple functions with plain 'assert'
def test_palindrome_cases():
    assert is_palindrome("Racecar") is True
    assert is_palindrome("Level") is True
    assert is_palindrome("Python") is False

test_palindrome_cases()
print("All pytest assert statements passed successfully!")`,
      output: `All pytest assert statements passed successfully!`
    },
    detailedExample: {
      code: `# Demonstrating pytest fixtures concept:
# Fixtures provide reusable test data / setup objects across multiple test functions
class MockUserDatabase:
    def __init__(self):
        self.users = {"swamy": "admin", "alex": "member"}

# In pytest: @pytest.fixture def db(): return MockUserDatabase()
def test_user_roles():
    db = MockUserDatabase() # fixture simulation
    assert db.users["swamy"] == "admin"
    assert "alex" in db.users
    assert "unknown" not in db.users

test_user_roles()
print("Pytest fixture test passed with 0 failures.")`,
      output: `Pytest fixture test passed with 0 failures.`
    },
    codeExplanation: [
      'Line 9: Shows how pytest uses standard Python `assert expression` statements without needing custom class inheritance.'
    ],
    commonMistakes: [
      {
        mistake: 'Naming test files without `test_` prefix or `_test` suffix (e.g. naming it `my_tests.py`).',
        whyItIsWrong: '`pytest` test discovery looks exclusively for `test_*.py` and `*_test.py` files.',
        correction: 'Always name test files `test_feature.py`.'
      },
      {
        mistake: 'Writing complex assertions with boolean operators without clear failure messages.',
        whyItIsWrong: 'Makes debugging failed test outputs harder.',
        correction: 'Write granular, specific assertions per condition.'
      }
    ],
    importantRules: [
      'Test files must be named `test_*.py` or `*_test.py`.',
      'Test functions must begin with `test_`.',
      'Use plain Python `assert` statements in `pytest`.'
    ],
    interviewPerspective: 'In interviews, `pytest` is considered the industry standard for modern Python backend, ML, and data engineering teams.',
    practiceQuestions: [
      {
        question: 'Which keyword is used for assertions in pytest test functions?',
        solution: 'assert'
      },
      {
        question: 'Which CLI flag runs pytest in verbose mode with detailed test name outputs?',
        solution: '-v (pytest -v)'
      }
    ],
    checkpoint: [
      {
        id: 'm20-t2-q1',
        type: 'mcq',
        prompt: 'What keyword does `pytest` use for test assertions instead of requiring methods like `self.assertEqual()`?',
        options: ['assert', 'expect', 'verify', 'should'],
        correctAnswer: 0,
        explanation: '`pytest` uses standard Python `assert` statements with built-in assertion rewriting for rich diffs.'
      },
      {
        id: 'm20-t2-q2',
        type: 'output',
        prompt: 'What filename prefix or suffix must test files follow for `pytest` automatic test discovery?',
        correctAnswer: 'test_',
        explanation: '`pytest` automatically discovers files starting with `test_` or ending with `_test.py`.'
      }
    ]
  },

  'writing-test-cases': {
    id: 'writing-test-cases',
    moduleId: 'm20',
    topicNumber: 3,
    title: 'Writing Comprehensive Test Cases & Edge Cases',
    shortSummary: 'Normal cases, edge cases (empty strings, 0, None, boundary values), and test coverage.',
    whatIsIt: 'Writing robust test cases requires testing three distinct categories: 1) Happy Path (expected typical inputs), 2) Edge Cases (boundary conditions like empty lists, 0, negative values, maximum integer limits), and 3) Error Cases (invalid types, missing parameters).',
    whyDoWeNeedIt: '90%+ of production bugs occur at boundary conditions (e.g. empty lists, off-by-one errors, NoneType values) that happy path testing misses.',
    syntax: `def test_function_comprehensive():
    # 1. Happy Path
    assert func([1, 2, 3]) == 6
    # 2. Boundary / Edge Case (Empty collection)
    assert func([]) == 0
    # 3. Boundary / Single element
    assert func([10]) == 10
    # 4. Error Case
    with pytest.raises(TypeError):
        func("invalid")`,
    basicExample: {
      code: `def find_median(numbers):
    if not numbers:
        raise ValueError("Cannot calculate median of empty list")
    sorted_nums = sorted(numbers)
    n = len(sorted_nums)
    mid = n // 2
    if n % 2 != 0:
        return float(sorted_nums[mid])
    return (sorted_nums[mid - 1] + sorted_nums[mid]) / 2.0

# Comprehensive Test Suite:
# 1. Odd length list (Happy path)
assert find_median([3, 1, 2]) == 2.0

# 2. Even length list (Median is average of two middle values)
assert find_median([1, 2, 3, 4]) == 2.5

# 3. Single element list (Edge case)
assert find_median([42]) == 42.0

print("All median test cases (Odd, Even, Single) passed!")`,
      output: `All median test cases (Odd, Even, Single) passed!`
    },
    detailedExample: {
      code: `# Email Validation Test Suite covering edge cases:
import re

def is_valid_email(email):
    if not isinstance(email, str):
        return False
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"
    return bool(re.match(pattern, email.strip()))

test_cases = [
    # (Input, Expected)
    ("swamy@levelup.dev", True),       # Standard valid
    ("user.name+tag@sub.domain.com", True), # Complex valid
    ("plainaddress", False),           # Missing @ and domain
    ("@missinguser.com", False),       # Missing username
    ("user@.com", False),              # Missing domain name
    ("", False),                       # Empty string
    (None, False),                     # Invalid type (None)
]

for email_input, expected in test_cases:
    actual = is_valid_email(email_input)
    assert actual == expected, f"Failed for {email_input}: expected {expected}, got {actual}"
    print(f"Passed test case for: {str(email_input):<32} -> {actual}")`,
      output: `Passed test case for: swamy@levelup.dev                -> True
Passed test case for: user.name+tag@sub.domain.com     -> True
Passed test case for: plainaddress                     -> False
Passed test case for: @missinguser.com                 -> False
Passed test case for: user@.com                        -> False
Passed test case for:                                  -> False
Passed test case for: None                             -> False`
    },
    codeExplanation: [
      'Line 10: Tests valid formats, invalid formats, empty strings, and `NoneType` inputs.'
    ],
    commonMistakes: [
      {
        mistake: 'Only writing a single test case with standard positive numbers and assuming code is complete.',
        whyItIsWrong: 'Fails to test 0, negative values, empty strings, null values, or duplicate elements.',
        correction: 'Always test: 0, negative numbers, empty collections, single elements, and boundary values.'
      },
      {
        mistake: 'Writing tests that depend on execution order of previous tests.',
        whyItIsWrong: 'Tests fail intermittently when run in parallel or randomized order.',
        correction: 'Ensure each test case is completely isolated and independent.'
      }
    ],
    importantRules: [
      'Always test: 1) Happy path, 2) Boundary edge cases, 3) Invalid inputs.',
      'Tests must be deterministic and independent of execution order.',
      'Aim for high test coverage on core business calculation logic.'
    ],
    interviewPerspective: 'In machine coding and pairing interviews, writing test cases for edge conditions before writing the implementation demonstrates senior software craftsmanship.',
    practiceQuestions: [
      {
        question: 'What is a "boundary edge case" in software testing?',
        solution: 'An input value at the extreme edge of operating limits (such as 0, empty lists, maximum integers, or None).'
      },
      {
        question: 'Why should tests be independent of each other?',
        solution: 'To ensure tests can run in any order or in parallel without shared state causing false failures.'
      }
    ],
    checkpoint: [
      {
        id: 'm20-t3-q1',
        type: 'mcq',
        prompt: 'Which of the following test inputs is an essential "edge case" when testing a function that processes lists of numbers?',
        options: [
          'An empty list `[]`',
          'A list with 3 positive numbers `[1, 2, 3]`',
          'A list with numbers in ascending order',
          'A list printed to the terminal'
        ],
        correctAnswer: 0,
        explanation: 'An empty list `[]` is a classic boundary edge case that frequently causes `IndexError` or `ZeroDivisionError`.'
      },
      {
        id: 'm20-t3-q2',
        type: 'output',
        prompt: 'What should a function `divide(a, b)` raise when `b == 0`?',
        correctAnswer: 'ZeroDivisionError',
        explanation: 'Division by zero raises `ZeroDivisionError`.'
      }
    ]
  },

  'debugging-techniques': {
    id: 'debugging-techniques',
    moduleId: 'm20',
    topicNumber: 4,
    title: 'Debugging Techniques & Traceback Analysis',
    shortSummary: 'Reading tracebacks, pdb / breakpoint(), print debugging, and common error categories.',
    whatIsIt: 'Debugging is the systematic process of finding and resolving bugs. Python provides rich Traceback messages detailing the error type, file path, line number, and call stack history. Python 3.7+ includes the built-in `breakpoint()` function to launch the interactive `pdb` debugger.',
    whyDoWeNeedIt: 'Debugging accounts for 50%+ of a software engineer\'s daily time. Reading tracebacks from bottom to top and inspecting variable state with breakpoints resolves bugs 10x faster than guessing.',
    syntax: `# Reading Traceback:
# 1. Look at the VERY LAST LINE for the Exception Type & Message
# 2. Look at the last file/line in your project source code

# Setting an interactive breakpoint (Python 3.7+):
def calculate_metrics(data):
    # breakpoint()  # Drops into interactive (Pdb) prompt
    return len(data)`,
    basicExample: {
      code: `# Anatomy of a Python Traceback Simulation:
traceback_sample = """
Traceback (most recent call last):
  File "src/app.py", line 42, in process_request
    result = compute_tax(user.income, user.state)
  File "src/tax.py", line 18, in compute_tax
    return income * RATES[state]
KeyError: 'CA_INVALID'
"""

# How to analyze:
# Step 1: Bottom line -> KeyError: 'CA_INVALID' (Dictionary missing key)
# Step 2: Line 18 in tax.py -> RATES[state] was passed an invalid state code!
print("Traceback analysis breakdown verified.")`,
      output: `Traceback analysis breakdown verified.`
    },
    detailedExample: {
      code: `# Common Python Error Categories & Causes:
error_matrix = [
    ("SyntaxError", "Invalid Python grammar/syntax (e.g. missing colon, mismatched brackets)."),
    ("TypeError", "Operation applied to incompatible type (e.g. '10' + 5)."),
    ("ValueError", "Valid type, but inappropriate value (e.g. int('hello'))."),
    ("IndexError", "Sequence index out of range (e.g. [1, 2][5])."),
    ("KeyError", "Dictionary key does not exist (e.g. {'a': 1}['b'])."),
    ("AttributeError", "Object has no such attribute or method (e.g. 'str'.append(1))."),
    ("NameError", "Variable used before being defined or misspelled variable name.")
]

print("Essential Python Error Catalog:")
for err, cause in error_matrix:
    print(f" - {err:<16} : {cause}")`,
      output: `Essential Python Error Catalog:
 - SyntaxError      : Invalid Python grammar/syntax (e.g. missing colon, mismatched brackets).
 - TypeError        : Operation applied to incompatible type (e.g. '10' + 5).
 - ValueError       : Valid type, but inappropriate value (e.g. int('hello')).
 - IndexError       : Sequence index out of range (e.g. [1, 2][5]).
 - KeyError         : Dictionary key does not exist (e.g. {'a': 1}['b']).
 - AttributeError   : Object has no such attribute or method (e.g. 'str'.append(1)).
 - NameError        : Variable used before being defined or misspelled variable name.`
    },
    codeExplanation: [
      'Line 1: Catalogs the most frequent Python runtime exception categories.'
    ],
    commonMistakes: [
      {
        mistake: 'Panicking when seeing a long traceback and reading from the top line instead of the bottom line.',
        whyItIsWrong: 'The root error class and description are ALWAYS on the bottom-most line.',
        correction: 'Read the bottom line first to know WHAT went wrong, then trace upwards to find WHERE in your code it occurred.'
      },
      {
        mistake: 'Leaving temporary `print()` or `breakpoint()` calls in production code.',
        whyItIsWrong: 'Pollutes server logs and halts production web workers in interactive debuggers.',
        correction: 'Use the `logging` module for production diagnostics and remove breakpoints before committing.'
      }
    ],
    importantRules: [
      'Read Python tracebacks from bottom to top.',
      'Use `breakpoint()` in Python 3.7+ to launch `pdb`.',
      'Understand the difference between TypeError (wrong type) and ValueError (wrong content).'
    ],
    interviewPerspective: 'In debugging interviews, you will be handed broken code with a traceback and evaluated on how systematically you pinpoint the root cause.',
    practiceQuestions: [
      {
        question: 'Which built-in function in Python 3.7+ drops the interpreter into an interactive pdb debugger prompt?',
        solution: 'breakpoint()'
      },
      {
        question: 'Where in a Python traceback is the specific error type and description located?',
        solution: 'At the very bottom line of the traceback.'
      }
    ],
    checkpoint: [
      {
        id: 'm20-t4-q1',
        type: 'mcq',
        prompt: 'Where should you look FIRST when analyzing a multi-line Python exception traceback?',
        options: [
          'The very last line at the bottom to see the exception type and error message',
          'The very first line at the top',
          'The middle line',
          'The operating system version'
        ],
        correctAnswer: 0,
        explanation: 'The bottom line provides the exact exception type and error description.'
      },
      {
        id: 'm20-t4-q2',
        type: 'output',
        prompt: 'What built-in function was introduced in Python 3.7 to set a breakpoint and invoke the interactive debugger?',
        correctAnswer: 'breakpoint()',
        explanation: '`breakpoint()` invokes the Python debugger (`pdb`).'
      }
    ]
  },

  'logging-module': {
    id: 'logging-module',
    moduleId: 'm20',
    topicNumber: 5,
    title: 'Logging with the `logging` Module',
    shortSummary: 'Log levels (DEBUG, INFO, WARNING, ERROR, CRITICAL), formatters, handlers, and why logging beats print.',
    whatIsIt: 'The `logging` module is Python\'s built-in framework for emitting diagnostic and operational log messages. It features 5 severity levels: DEBUG (10), INFO (20), WARNING (30), ERROR (40), and CRITICAL (50), with configurable output destinations (console, files, log aggregators).',
    whyDoWeNeedIt: '`print()` statements cannot be easily disabled in production, lack timestamps and severity levels, and cannot be routed to rotating log files or cloud monitoring dashboards (DataDog, CloudWatch).',
    syntax: `import logging

# Basic configuration:
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

logger = logging.getLogger(__name__)

logger.debug("Detailed diagnostic information")
logger.info("Application service started successfully")
logger.warning("High memory threshold reached: 82%")
logger.error("Failed to connect to payment gateway")
logger.critical("Database storage full! Application halted")`,
    basicExample: {
      code: `import logging
import io

# Capture log stream in memory for demonstration
log_stream = io.StringIO()
handler = logging.StreamHandler(log_stream)
formatter = logging.Formatter("[%(levelname)s] %(message)s")
handler.setFormatter(formatter)

logger = logging.getLogger("demo_logger")
logger.setLevel(logging.INFO)
logger.addHandler(handler)

logger.debug("This DEBUG log is ignored because level is INFO")
logger.info("User 'swamy' logged in")
logger.warning("API rate limit is at 90%")
logger.error("Database connection dropped")

print("Emitted Log Stream:")
print(log_stream.getvalue().strip())`,
      output: `Emitted Log Stream:
[INFO] User 'swamy' logged in
[WARNING] API rate limit is at 90%
[ERROR] Database connection dropped`
    },
    detailedExample: {
      code: `# Logging Exceptions with Traceback using logger.exception()
import logging
import io

stream = io.StringIO()
handler = logging.StreamHandler(stream)
handler.setFormatter(logging.Formatter("[%(levelname)s] %(message)s"))

log = logging.getLogger("app_error_logger")
log.setLevel(logging.ERROR)
log.addHandler(handler)

def safe_int_parse(text):
    try:
        return int(text)
    except ValueError:
        # logger.exception automatically attaches the full traceback!
        log.exception(f"Failed to parse integer from '{text}'")
        return None

safe_int_parse("not_a_number")
output_lines = stream.getvalue().splitlines()
print("First log line:", output_lines[0])
print("Exception attached:", any("ValueError" in line for line in output_lines))`,
      output: `First log line: [ERROR] Failed to parse integer from 'not_a_number'
Exception attached: True`
    },
    codeExplanation: [
      'Line 17: `logger.exception()` automatically captures and appends the full traceback at ERROR severity level.'
    ],
    commonMistakes: [
      {
        mistake: 'Using `print()` for production server logs instead of the `logging` module.',
        whyItIsWrong: 'Print statements lack timestamps, severity filtering, log rotation, and structured JSON formatting.',
        correction: 'Use `logging.getLogger(__name__)`.'
      },
      {
        mistake: 'Using string concatenation in logging calls instead of parameterized arguments: `logger.info("User " + user)`.',
        whyItIsWrong: 'Incurs string formatting performance overhead even if the log level is disabled.',
        correction: 'Use `logger.info("User %s", user)` or formatted f-strings where appropriate.'
      }
    ],
    importantRules: [
      'Standard severity hierarchy: DEBUG < INFO < WARNING < ERROR < CRITICAL.',
      'Default logging level is WARNING (DEBUG and INFO are silenced unless configured).',
      'Use `logger.exception()` inside `except` blocks to automatically record the traceback.'
    ],
    interviewPerspective: 'Interviewers evaluate whether candidates know how to structure logging for distributed systems and microservices (structured JSON logging, log level filtering).',
    practiceQuestions: [
      {
        question: 'What are the 5 standard logging levels in Python in order of increasing severity?',
        solution: 'DEBUG, INFO, WARNING, ERROR, CRITICAL'
      },
      {
        question: 'Which logging method automatically records the full traceback when called inside an except block?',
        solution: 'logger.exception()'
      }
    ],
    checkpoint: [
      {
        id: 'm20-t5-q1',
        type: 'mcq',
        prompt: 'What is the default threshold log level in Python\'s `logging` module if not explicitly configured?',
        options: ['DEBUG', 'INFO', 'WARNING', 'ERROR'],
        correctAnswer: 2,
        explanation: 'The default logging level is `WARNING`, meaning DEBUG and INFO messages are silenced by default.'
      },
      {
        id: 'm20-t5-q2',
        type: 'output',
        prompt: 'Which logging method automatically includes the full exception traceback in the emitted log message when inside an `except` block?',
        correctAnswer: 'logger.exception',
        explanation: '`logger.exception()` records an ERROR-level message with the complete traceback automatically appended.'
      }
    ]
  }
};
