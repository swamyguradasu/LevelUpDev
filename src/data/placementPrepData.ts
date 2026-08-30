import { DSA_PLACEMENT_CATEGORY } from './placementPrepDsa';
import {
  CS_FUNDAMENTALS_CATEGORY,
  OOP_CATEGORY,
  DBMS_CATEGORY,
  SQL_CATEGORY,
  OS_CATEGORY,
  NETWORKS_CATEGORY,
  GIT_CATEGORY,
  DEV_BASICS_CATEGORY,
} from './placementPrepCoreTechnical';
import {
  SYSTEM_DESIGN_CATEGORY,
  AIML_SPECIALIZATION_CATEGORY,
} from './placementPrepAimlSystemDesign';
import {
  PROJECTS_CATEGORY,
  RESUME_PORTFOLIO_CATEGORY,
  COMMUNICATION_CATEGORY,
  TECHNICAL_INTERVIEW_CATEGORY,
  HR_INTERVIEW_CATEGORY,
  MANAGERIAL_ROUND_CATEGORY,
  COMPANY_SPECIFIC_PREP_CATEGORY,
} from './placementPrepCareerInterview';
import {
  MOCK_ASSESSMENTS_CATEGORY,
  MOCK_INTERVIEWS_CATEGORY,
  INTERVIEW_QUESTION_BANK_CATEGORY,
  PlacementPersonalNote,
} from './placementPrepPractice';

export type { PlacementPersonalNote };

export interface PlacementPracticeProblem {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  link?: string;
  tags?: string[];
  companyTags?: string[];
}

export interface PlacementInterviewQuestion {
  question: string;
  answerSummary: string;
  frequentlyAskedAt?: string[];
}

export interface PlacementTopic {
  id: string;
  title: string;
  summary: string;
  whatYouWillLearn: string;
  concept: string;
  whyItMatters: string;
  keyTakeaways: string[];
  practiceProblems?: PlacementPracticeProblem[];
  interviewQuestions?: PlacementInterviewQuestion[];
  codeSnippet?: {
    language: string;
    code: string;
    explanation: string;
  };
}

export interface PlacementConcept {
  id: string;
  title: string;
  tagline: string;
  description: string;
  topics: PlacementTopic[];
}

export interface PlacementLevel {
  id: string;
  levelNumber: string; // e.g. "01", "02"
  title: string;
  shortDescription: string;
  estimatedHours: string;
  concepts: PlacementConcept[];
}

export interface PlacementCategory {
  id: string;
  cardNumber: string; // e.g. "01", "02"
  title: string;
  shortTitle: string;
  tagline: string;
  phaseId: 'foundation' | 'core-technical' | 'development' | 'specialization' | 'career-prep' | 'interview-prep' | 'final-prep';
  phaseName: string;
  iconName: string;
  badge: string;
  estimatedHours: string;
  importance: 'Critical' | 'High' | 'Essential';
  description: string;
  targetMNCs: string[];
  levels: PlacementLevel[];
}

export interface PlacementPhase {
  id: 'foundation' | 'core-technical' | 'development' | 'specialization' | 'career-prep' | 'interview-prep' | 'final-prep';
  phaseNumber: string;
  title: string;
  subtitle: string;
  description: string;
  badgeColor: string;
  categoryIds: string[];
}

export const PLACEMENT_PHASES: PlacementPhase[] = [
  {
    id: 'foundation',
    phaseNumber: '01',
    title: 'FOUNDATION',
    subtitle: 'Programming, Aptitude, Reasoning & Verbal',
    description: 'Build the essential base tested in every MNC online assessment (Round 1 OT / Cognitive & Technical Test).',
    badgeColor: 'cyan',
    categoryIds: ['programming-fundamentals', 'quantitative-aptitude', 'logical-reasoning', 'english-verbal-ability'],
  },
  {
    id: 'core-technical',
    phaseNumber: '02',
    title: 'CORE TECHNICAL',
    subtitle: 'DSA, CS Fundamentals, DBMS, OS, Networks & OOP',
    description: 'Master the computer science core asked in technical interviews, live coding rounds, and technical MCQs.',
    badgeColor: 'blue',
    categoryIds: [
      'dsa',
      'cs-fundamentals',
      'oop',
      'dbms',
      'sql',
      'operating-systems',
      'computer-networks',
    ],
  },
  {
    id: 'development',
    phaseNumber: '03',
    title: 'DEVELOPMENT',
    subtitle: 'Git, Web Dev Basics, APIs & System Design',
    description: 'Understand modern software development workflows, version control, APIs, and scalable architectural fundamentals.',
    badgeColor: 'indigo',
    categoryIds: ['git-github', 'development-basics', 'system-design-basics'],
  },
  {
    id: 'specialization',
    phaseNumber: '04',
    title: 'SPECIALIZATION',
    subtitle: 'AIML & Artificial Intelligence Track',
    description: 'Targeted depth for AIML Engineer, Data Science, and GenAI roles in top-tier tech firms.',
    badgeColor: 'purple',
    categoryIds: ['aiml-specialization'],
  },
  {
    id: 'career-prep',
    phaseNumber: '05',
    title: 'CAREER PREPARATION',
    subtitle: 'Projects, Resume, Portfolio & Communication',
    description: 'Position your work for maximum recruiter impact with ATS-optimized resumes, live portfolio apps, and crisp communication.',
    badgeColor: 'emerald',
    categoryIds: ['projects', 'resume-portfolio', 'communication'],
  },
  {
    id: 'interview-prep',
    phaseNumber: '06',
    title: 'INTERVIEW PREPARATION',
    subtitle: 'Technical, HR, Managerial & Company Tracks',
    description: 'Prepare structured answers for live technical grillings, behavioral questions, managerial rounds, and company patterns.',
    badgeColor: 'amber',
    categoryIds: ['technical-interview', 'hr-interview', 'managerial-round', 'company-specific-prep'],
  },
  {
    id: 'final-prep',
    phaseNumber: '07',
    title: 'FINAL PREPARATION',
    subtitle: 'Mock Assessments & Live Mock Interviews',
    description: 'Timed full-length mock tests and peer interviews under high-pressure simulation conditions.',
    badgeColor: 'rose',
    categoryIds: ['mock-assessments', 'mock-interviews', 'interview-question-bank'],
  },
];

export const PLACEMENT_CATEGORIES: PlacementCategory[] = [
  // =========================================================================
  // 01 — PROGRAMMING FUNDAMENTALS
  // =========================================================================
  {
    id: 'programming-fundamentals',
    cardNumber: '01',
    title: 'Programming Fundamentals',
    shortTitle: 'Programming Basics',
    tagline: 'Variables, operators, I/O, control flow, functions, recursion, and core data structures in Python/C++.',
    phaseId: 'foundation',
    phaseName: 'Foundation',
    iconName: 'Code2',
    badge: 'Round 1 / Basics',
    estimatedHours: '30 Hours',
    importance: 'Critical',
    description: 'Solidify your core coding foundation. MNC assessments test edge cases, syntax nuances, memory scope, recursion, and data structures.',
    targetMNCs: ['TCS Digital', 'Infosys DSE', 'Wipro Turbo', 'Accenture', 'Cognizant GenC Next', 'Amazon'],
    levels: [
      {
        id: 'level-1-programming-basics',
        levelNumber: '01',
        title: 'Programming Basics',
        shortDescription: 'Syntax, memory types, operators, and basic I/O mechanics.',
        estimatedHours: '6 Hours',
        concepts: [
          {
            id: 'variables-data-types',
            title: 'Variables & Data Types',
            tagline: 'Memory storage and type systems in modern programming.',
            description: 'Master how variables store references, primitive scalar types, type conversions, and dynamic typing rules.',
            topics: [
              {
                id: 'variables',
                title: 'Variables & Memory Reference',
                summary: 'Named memory locations holding values or object references.',
                whatYouWillLearn: 'Variable declaration, memory allocation, and reference vs value mechanics.',
                concept: 'A variable is a symbolic name associated with a memory location. In Python, variables are references pointing to objects in heap memory.',
                whyItMatters: 'Understanding memory references prevents unintended in-place mutations in algorithms.',
                keyTakeaways: [
                  'Variables in Python are dynamically typed references to objects.',
                  'Reassigning a variable rebinds the reference to a new memory address.',
                ],
                codeSnippet: {
                  language: 'python',
                  code: `# Variable assignment and memory identity
x = [1, 2, 3]
y = x          # y references the same list object
y.append(4)
print(x)       # [1, 2, 3, 4] -> Both changed!
print(id(x) == id(y)) # True`,
                  explanation: 'Assigning a list copies the reference, not the underlying array data.',
                },
              },
              {
                id: 'naming-conventions',
                title: 'Naming Conventions & Identifiers',
                summary: 'PEP 8 snake_case, camelCase, PascalCase, and reserved keywords.',
                whatYouWillLearn: 'Rules for valid identifier names, snake_case vs camelCase, and avoiding reserved keyword collisions.',
                concept: 'Identifiers must begin with a letter or underscore, followed by letters, numbers, or underscores. Keywords (e.g. def, class, return) cannot be identifiers.',
                whyItMatters: 'Clean naming is evaluated during MNC code-quality and interview reviews.',
                keyTakeaways: [
                  'Use snake_case for Python functions and variables.',
                  'Use PascalCase for Classes and UPPER_CASE for constants.',
                ],
              },
              {
                id: 'integers-floats',
                title: 'Integers, Floats & Precision',
                summary: 'Arbitrary-precision integers and IEEE 754 floating point numbers.',
                whatYouWillLearn: 'Integer limits, floating point rounding errors, floor division (//), and modulo arithmetic (%).',
                concept: 'Python integers have arbitrary precision (they do not overflow 32/64 bits). Floats follow 64-bit IEEE 754 standards.',
                whyItMatters: 'Floating point rounding (0.1 + 0.2 != 0.3) is a classic MCQ interview trap.',
                keyTakeaways: [
                  'Use math.isclose(a, b) when comparing floating point values.',
                  'Use // for integer division and % for remainder.',
                ],
              },
              {
                id: 'strings',
                title: 'Strings & Character Encoding',
                summary: 'Immutable character sequences, Unicode, ASCII, and indexing.',
                whatYouWillLearn: 'String immutability, ASCII ord()/chr() methods, slicing, and string concatenation performance.',
                concept: 'Strings are immutable sequences of Unicode code points. Any modification creates a new string object.',
                whyItMatters: 'String manipulation is tested in 70%+ of initial technical assessments.',
                keyTakeaways: [
                  'Use ord(char) to get ASCII/Unicode number and chr(num) to get character.',
                  'String concatenation inside loops is O(N^2); use "".join(list) for O(N).',
                ],
              },
              {
                id: 'boolean',
                title: 'Boolean & Truth Value Testing',
                summary: 'True, False, and truthy/falsy evaluation of data structures.',
                whatYouWillLearn: 'Evaluating conditionals, boolean algebra, and truthy/falsy rules in conditionals.',
                concept: 'Empty sequences ([], "", ()), 0, 0.0, None, and False evaluate to False in boolean contexts. All other values evaluate to True.',
                whyItMatters: 'Writing idiomatic Python conditionals (e.g. `if not array:`).',
                keyTakeaways: [
                  'Use `if not collection:` instead of `if len(collection) == 0:`.',
                  '`bool(None)` is False, `bool([0])` is True because list is non-empty.',
                ],
              },
              {
                id: 'type-conversion',
                title: 'Type Conversion & Dynamic Typing',
                summary: 'Explicit type casting (int, float, str, list) vs implicit coercion.',
                whatYouWillLearn: 'Explicit casting functions and handling ValueError during parsing.',
                concept: 'Explicit conversion converts one data type into another using constructors like int(), float(), str(), and list().',
                whyItMatters: 'Parsing string input from stdin in online coding assessments.',
                keyTakeaways: [
                  'int("10") works; int("10.5") throws ValueError (use int(float("10.5"))).',
                  'Dynamic typing binds types to values at runtime, not to variable names.',
                ],
              },
            ],
          },
          {
            id: 'operators',
            title: 'Operators & Precedence',
            tagline: 'Arithmetic, logical, bitwise, membership, and identity operators.',
            description: 'Understand operator precedence, short-circuit evaluation, identity (`is`) vs equality (`==`), and bitwise tricks.',
            topics: [
              {
                id: 'arithmetic-operators',
                title: 'Arithmetic Operators & Modulo',
                summary: '+, -, *, /, // (floor division), % (modulo), ** (exponentiation).',
                whatYouWillLearn: 'Floor division behavior with negative numbers and exponentiation efficiency.',
                concept: 'Arithmetic operators perform mathematical calculations. Modulo operator (%) calculates remainder.',
                whyItMatters: 'Crucial for cyclic indexing and hash table bucket distribution.',
                keyTakeaways: [
                  'In Python: -7 // 3 is -3 (rounds towards negative infinity).',
                  'a % b is always non-negative when b > 0 in Python.',
                ],
              },
              {
                id: 'comparison-operators',
                title: 'Comparison & Logical Operators',
                summary: '==, !=, <, >, <=, >=, and, or, not with short-circuiting.',
                whatYouWillLearn: 'Chained comparisons (1 < x < 10) and short-circuit evaluation rules.',
                concept: 'Comparison returns True/False. `and` returns the first falsy value or the last truthy value; `or` returns the first truthy value.',
                whyItMatters: 'Optimizing condition evaluation in performance-critical code.',
                keyTakeaways: [
                  'Short-circuiting: in `A and B`, if A is False, B is never evaluated.',
                  'Chained comparisons `a < b < c` evaluate as `a < b and b < c`.',
                ],
              },
              {
                id: 'membership-identity-operators',
                title: 'Membership (in) & Identity (is) Operators',
                summary: 'in / not in vs is / is not (Value equality vs Memory identity).',
                whatYouWillLearn: 'Differences between `==` (value comparison) and `is` (memory reference identity).',
                concept: '`==` checks if two objects have equal values (`__eq__`). `is` checks if both variables point to the exact same object in memory (`id(a) == id(b)`).',
                whyItMatters: 'Classic interview trap: `a == b` vs `a is b`.',
                keyTakeaways: [
                  'Always use `if x is None:`, never `if x == None:`.',
                  '`[1, 2] == [1, 2]` is True, but `[1, 2] is [1, 2]` is False.',
                ],
              },
              {
                id: 'operator-precedence',
                title: 'Operator Precedence & Associativity',
                summary: 'Order of operations from parenthesis to arithmetic, bitwise, and logical.',
                whatYouWillLearn: 'PEMDAS / BODMAS precedence hierarchy and bitwise operator pitfalls.',
                concept: 'Parentheses () have highest priority. Bitwise operators (&, |, ^) have LOWER precedence than comparison operators (==, <).',
                whyItMatters: 'Common bug: `if x & 1 == 0:` evaluates as `if x & (1 == 0):`!',
                keyTakeaways: [
                  'Always use explicit parentheses around bitwise operations: `(x & 1) == 0`.',
                  'Logical `not` has higher precedence than `and`, which is higher than `or`.',
                ],
              },
            ],
          },
          {
            id: 'input-output',
            title: 'Input & Output Formatting',
            tagline: 'Standard I/O, fast I/O for competitive coding, and string formatting.',
            description: 'Reading multi-line inputs, sys.stdin.readline, and f-strings.',
            topics: [
              {
                id: 'user-input-fast-io',
                title: 'User Input & Fast I/O (sys.stdin)',
                summary: 'input() vs sys.stdin.read / sys.stdin.readline for online assessments.',
                whatYouWillLearn: 'Reading numbers, whitespace-separated arrays, and handling EOF in coding tests.',
                concept: '`input()` has high overhead because it strips newlines and prompts. `sys.stdin.readline()` is up to 5x faster for 10^5+ test cases.',
                whyItMatters: 'Prevents Time Limit Exceeded (TLE) errors on HackerRank/TCS platforms.',
                keyTakeaways: [
                  'Read space-separated integers: `arr = list(map(int, sys.stdin.readline().split()))`.',
                  'Always strip trailing newlines when reading strings with `sys.stdin.readline().strip()`.',
                ],
              },
              {
                id: 'output-formatting',
                title: 'Output Formatting & F-Strings',
                summary: 'Python f-strings, precision specifiers (.2f), padding, and alignment.',
                whatYouWillLearn: 'Formatted string literals (f"{val:.2f}"), zero-padding (f"{num:04d}"), and separators.',
                concept: 'F-strings allow embedded expressions inside string literals evaluated at runtime with custom formatting specs.',
                whyItMatters: 'Formatting required outputs (e.g. printing currency with 2 decimal places).',
                keyTakeaways: [
                  'Format float to 2 decimal places: `f"{val:.2f}"`.',
                  'Print without newline: `print(val, end=" ")`.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'level-2-control-flow',
        levelNumber: '02',
        title: 'Control Flow',
        shortDescription: 'Conditional branching, nested logic, while/for loops, and loop control keywords.',
        estimatedHours: '6 Hours',
        concepts: [
          {
            id: 'conditional-statements',
            title: 'Conditional Statements',
            tagline: 'if, elif, else branching and nested condition logic.',
            description: 'Write robust branching logic and handle multiple boundary conditions cleanly.',
            topics: [
              {
                id: 'if-elif-else',
                title: 'if, elif, else & Nested Conditions',
                summary: 'Sequential condition evaluation and mutually exclusive branches.',
                whatYouWillLearn: 'Structuring multi-way branching and nested decision trees.',
                concept: 'Python evaluates conditions from top to bottom. The first condition that evaluates to True executes its block; all subsequent elif/else blocks are skipped.',
                whyItMatters: 'Handling edge case classification (e.g. leap year rules, quadrant checks).',
                keyTakeaways: [
                  'Avoid deeply nested if-else ladders by using Guard Clauses (early return).',
                  'Order conditions from most specific to most general.',
                ],
              },
            ],
          },
          {
            id: 'loops',
            title: 'Loops & Iteration',
            tagline: 'for loops, while loops, range(), break, continue, pass, and loop-else.',
            description: 'Master loop mechanics, index-based vs item-based iteration, and loop control keywords.',
            topics: [
              {
                id: 'for-while-loops',
                title: 'for & while Loops with range()',
                summary: 'Definite vs indefinite iteration and range(start, stop, step).',
                whatYouWillLearn: 'Iterating over sequences, two-pointer loops, reverse iteration, and while condition invariants.',
                concept: '`for` loop iterates over items of any iterable. `while` loop executes as long as a condition remains True.',
                whyItMatters: 'Fundamental engine for traversing arrays, matrices, and linked structures.',
                keyTakeaways: [
                  'Reverse iteration: `range(n - 1, -1, -1)`.',
                  'Ensure loop termination variable updates inside `while` to prevent infinite loops.',
                ],
              },
              {
                id: 'break-continue-pass',
                title: 'break, continue, pass & loop-else',
                summary: 'Premature loop termination, skipping iterations, and loop-else clauses.',
                whatYouWillLearn: 'Using break to exit loops early, continue to skip iterations, and loop else block when no break triggered.',
                concept: '`break` immediately terminates the innermost loop. `continue` skips the rest of the current iteration. `else` on a loop executes ONLY if the loop completed without hitting a `break`.',
                whyItMatters: 'Writing clean search loops without extra boolean flags.',
                keyTakeaways: [
                  '`pass` is a null statement used as a placeholder.',
                  'Loop `else` is ideal for search algorithms: executes when element is NOT found.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'level-3-functions',
        levelNumber: '03',
        title: 'Functions & Recursion',
        shortDescription: 'Modular code design, parameter types, variable scope, call stacks, and recursion.',
        estimatedHours: '6 Hours',
        concepts: [
          {
            id: 'functions-concepts',
            title: 'Functions & Scope',
            tagline: 'Parameters, return values, *args, **kwargs, LEGB scope rules.',
            description: 'Write reusable, modular functions with clean parameter contracts and scope management.',
            topics: [
              {
                id: 'function-basics',
                title: 'Function Definition, Arguments & Return Values',
                summary: 'def syntax, positional arguments, keyword arguments, and default values.',
                whatYouWillLearn: 'Designing functions, returning multiple values (tuples), and default argument traps.',
                concept: 'Functions encapsulate reusable logic. Default argument values are evaluated ONCE at function definition time (avoid mutable defaults like `def fn(x=[])`).',
                whyItMatters: 'Modular design and clean code evaluation in technical interviews.',
                keyTakeaways: [
                  'Never use mutable default arguments (use `def fn(lst=None): if lst is None: lst = []`).',
                  'Functions can return multiple values as a tuple: `return a, b`.',
                ],
              },
              {
                id: 'var-args-scope',
                title: '*args, **kwargs & LEGB Scope',
                summary: 'Variable-length arguments and Local, Enclosing, Global, Built-in scope resolution.',
                whatYouWillLearn: 'Passing arbitrary positional (*args) and keyword (**kwargs) arguments and understanding closures.',
                concept: 'Python resolves variable names using LEGB rule: Local → Enclosing (closure) → Global (module) → Built-in.',
                whyItMatters: 'Decorators, higher-order functions, and avoiding global variable bugs.',
                keyTakeaways: [
                  '*args packs extra positional arguments into a tuple; **kwargs packs keyword arguments into a dict.',
                  'Use `nonlocal` to modify variables in enclosing scope, `global` for module scope.',
                ],
              },
            ],
          },
          {
            id: 'recursion-basics',
            title: 'Recursion Basics & Call Stack',
            tagline: 'Base conditions, recursive transitions, call stack unwinding, and tree recursion.',
            description: 'Master thinking recursively: breaking a problem into a base case and smaller subproblems.',
            topics: [
              {
                id: 'base-condition-call-stack',
                title: 'Base Condition & Call Stack Execution',
                summary: 'Stack frames, recursion depth, base cases, and stack overflow.',
                whatYouWillLearn: 'Tracing recursive call trees, memory cost per recursive frame, and factorial/Fibonacci recursion.',
                concept: 'Recursion requires: 1. Base Case (terminates recursion), 2. Recursive Step (reduces problem size towards base case). Every call pushes a frame onto the runtime stack.',
                whyItMatters: 'Foundational prerequisite for Trees, Graphs, Backtracking, and Dynamic Programming.',
                keyTakeaways: [
                  'Without a base case, recursion leads to `RecursionError: maximum recursion depth exceeded`.',
                  'Space complexity of recursion equals the maximum depth of the call stack.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'level-4-data-structures',
        levelNumber: '04',
        title: 'Python Data Structures',
        shortDescription: 'Lists, Tuples, Sets, and Dictionaries with built-in methods and time complexities.',
        estimatedHours: '7 Hours',
        concepts: [
          {
            id: 'lists-tuples',
            title: 'Lists & Tuples',
            tagline: 'Dynamic arrays (Lists) and immutable sequences (Tuples).',
            description: 'Indexing, slicing, list comprehensions, sorting, and tuple immutability.',
            topics: [
              {
                id: 'lists-operations',
                title: 'Lists: Creation, Slicing & Operations',
                summary: 'Dynamic arrays, O(1) append/pop, O(N) insert/delete, and slicing [start:stop:step].',
                whatYouWillLearn: 'List methods (append, extend, insert, pop, remove, sort, reverse) and list comprehensions.',
                concept: 'Python list is a dynamic contiguous array of pointers. Appending to end is amortized O(1); inserting at index 0 is O(N) due to shifting.',
                whyItMatters: 'Lists are the most frequently used data structure in coding assessments.',
                keyTakeaways: [
                  'Slicing `arr[::-1]` creates a reversed copy in O(N).',
                  '`list.sort()` is in-place (Timsort O(N log N)); `sorted(list)` returns a new list.',
                ],
              },
              {
                id: 'tuples-immutability',
                title: 'Tuples: Immutability & Hashability',
                summary: 'Immutable ordered collections used as dictionary keys and data records.',
                whatYouWillLearn: 'Tuple packing/unpacking, memory footprint comparison with lists, and immutability rules.',
                concept: 'Tuples cannot be modified after creation. Because they are immutable (if elements are hashable), tuples can be used as dictionary keys or set elements.',
                whyItMatters: 'Representing coordinates (x, y) or graph state tuples in BFS/DFS visited sets.',
                keyTakeaways: [
                  'A 1-element tuple requires a trailing comma: `t = (42,)`.',
                  'Tuples consume less memory and are faster to allocate than lists.',
                ],
              },
            ],
          },
          {
            id: 'sets-dictionaries',
            title: 'Sets & Dictionaries (Hash Tables)',
            tagline: 'O(1) average lookup, duplicate elimination, key-value mappings, and frequency counting.',
            description: 'Master hash-based collections: set theory operations, dict views, and collections.defaultdict/Counter.',
            topics: [
              {
                id: 'sets-operations',
                title: 'Sets: Unique Collections & Set Theory',
                summary: 'Hash set with O(1) membership test (in), union (|), intersection (&), difference (-).',
                whatYouWillLearn: 'Duplicate removal, set operations, and time complexity differences vs lists.',
                concept: 'Sets store unique, unordered, hashable elements using a hash table. Checking `x in my_set` is O(1) average vs O(N) in a list.',
                whyItMatters: 'Instant duplicate removal and O(1) visited lookups in graph traversals.',
                keyTakeaways: [
                  'Checking membership `item in set` is O(1); in list it is O(N).',
                  'Set elements must be immutable/hashable (lists cannot be set elements).',
                ],
              },
              {
                id: 'dictionaries-frequency',
                title: 'Dictionaries: Key-Value Hash Maps & Frequency Counting',
                summary: 'O(1) key lookups, dict comprehension, get(), setdefault(), and frequency counters.',
                whatYouWillLearn: 'Iterating over keys/values/items, handling missing keys with .get(k, 0), and frequency maps.',
                concept: 'Dictionaries map unique keys to values using open addressing hash tables. In Python 3.7+, dictionaries preserve insertion order.',
                whyItMatters: 'Essential for two-sum, anagram checks, frequency counting, and memoization caches.',
                keyTakeaways: [
                  'Use `dict.get(key, default)` to avoid KeyError when counting.',
                  '`collections.Counter(arr)` builds frequency map in O(N) time.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'level-5-programming-practice',
        levelNumber: '05',
        title: 'Programming Practice',
        shortDescription: 'Pattern problems, number theory, string manipulation, and edge case debugging.',
        estimatedHours: '5 Hours',
        concepts: [
          {
            id: 'problem-solving-patterns',
            title: 'Problem Solving & Pattern Problems',
            tagline: 'Pyramids, diamonds, number patterns, palindromes, and array manipulation.',
            description: 'Develop structured logic for matrix traversal, pattern printing, and edge case handling.',
            topics: [
              {
                id: 'pattern-problems',
                title: 'Pattern Printing (Pyramids, Diamonds & Spirals)',
                summary: 'Nested loop geometry, space-star relationships, and matrix coordinates.',
                whatYouWillLearn: 'Formulating row-column algebraic relationships for stars, spaces, and numbers.',
                concept: 'Pattern printing trains nested loop control: outer loop controls row index i; inner loop calculates count of spaces and characters for that row.',
                whyItMatters: 'Frequently asked in Round 1 coding tests (TCS, Capgemini, Infosys).',
                keyTakeaways: [
                  'Write out space/star counts in a table for i = 0 to n to deduce algebraic formula.',
                  'Use string multiplication `print(" " * spaces + "*" * stars)` in Python.',
                ],
              },
              {
                id: 'number-string-problems',
                title: 'Number Theory & String Problems',
                summary: 'Armstrong numbers, GCD/LCM, palindrome checks, anagram detection, and reverse words.',
                whatYouWillLearn: 'Digit extraction using % 10 and // 10, two-pointer string reversals, and prime checks.',
                concept: 'Standard algorithmic logic tests: extracting digits in reverse order, verifying prime numbers in O(sqrt(N)), and two-pointer character comparisons.',
                whyItMatters: 'Standard questions in initial MNC screening assessments.',
                keyTakeaways: [
                  'Check prime numbers up to sqrt(N) rather than N for O(sqrt(N)) efficiency.',
                  'Anagram check: compare frequency maps or sorted character arrays.',
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 02 — QUANTITATIVE APTITUDE
  // =========================================================================
  {
    id: 'quantitative-aptitude',
    cardNumber: '02',
    title: 'Quantitative Aptitude',
    shortTitle: 'Quantitative Aptitude',
    tagline: 'Arithmetic foundations, percentages, profit & loss, time-speed-distance, probability, and data interpretation.',
    phaseId: 'foundation',
    phaseName: 'Foundation',
    iconName: 'Calculator',
    badge: 'Round 1 / Cognitive',
    estimatedHours: '40 Hours',
    importance: 'Critical',
    description: 'Every MNC online assessment begins with a timed quantitative aptitude section. Speed shortcuts and formula mastery are essential to clear sectional cutoffs.',
    targetMNCs: ['TCS NQT', 'Capgemini', 'Cognizant', 'LTI Mindtree', 'Deloitte', 'HCL'],
    levels: [
      {
        id: 'level-1-arithmetic-foundations',
        levelNumber: '01',
        title: 'Arithmetic Foundations',
        shortDescription: 'Number system, divisibility rules, LCM/HCF, fractions, and percentage fundamentals.',
        estimatedHours: '8 Hours',
        concepts: [
          {
            id: 'number-system',
            title: 'Number System & Divisibility',
            tagline: 'Natural numbers, primes, factors, multiples, divisibility tests, and LCM/HCF.',
            description: 'Master number classifications, prime factorizations, remainder theorems, and rapid divisibility checks.',
            topics: [
              {
                id: 'divisibility-lcm-hcf',
                title: 'Divisibility Rules & LCM/HCF',
                summary: 'Divisibility tests for 2 to 13, prime factorization, and LCM * HCF = Product of Numbers.',
                whatYouWillLearn: 'Finding HCF using Euclidean division, LCM shortcuts, and cyclic remainders.',
                concept: 'HCF is the greatest common divisor; LCM is the smallest common multiple. For two numbers a and b: HCF(a, b) * LCM(a, b) = a * b.',
                whyItMatters: 'Appears in 100% of aptitude screening rounds.',
                keyTakeaways: [
                  'Divisibility by 3/9: sum of digits is divisible by 3/9.',
                  'Divisibility by 11: difference between sum of odd-placed and even-placed digits is 0 or multiple of 11.',
                  'HCF of fractions = (HCF of numerators) / (LCM of denominators).',
                ],
              },
            ],
          },
          {
            id: 'percentages-fractions',
            title: 'Percentages, Fractions & Decimals',
            tagline: 'Percentage multipliers, percentage changes, successive changes, and recurring decimals.',
            description: 'Convert fractions to percentages instantly and calculate successive percentage shifts.',
            topics: [
              {
                id: 'percentage-basics-successive',
                title: 'Percentage Basics & Successive Changes',
                summary: 'Fraction-to-percentage table, multiplier method, and formula: a + b + (ab)/100.',
                whatYouWillLearn: 'Using multipliers (e.g. 20% increase = x 1.2) and calculating net change after successive percentage shifts.',
                concept: 'Successive percentage changes of a% and b% yield net change = a + b + (a * b) / 100. If price increases by r%, consumption must decrease by (r / (100 + r)) * 100.',
                whyItMatters: 'Fundamental arithmetic skill used across profit-loss, DI, and interest problems.',
                keyTakeaways: [
                  'Memorize fractions: 1/6 = 16.66%, 1/7 = 14.28%, 1/8 = 12.5%, 1/12 = 8.33%.',
                  'A 25% increase followed by 20% decrease leaves the original value unchanged (1.25 * 0.8 = 1.0).',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'level-2-core-arithmetic',
        levelNumber: '02',
        title: 'Core Arithmetic',
        shortDescription: 'Ratio & proportion, averages, profit & loss, discount, and simple/compound interest.',
        estimatedHours: '12 Hours',
        concepts: [
          {
            id: 'ratio-proportion-average',
            title: 'Ratio, Proportion & Averages',
            tagline: 'Direct/inverse proportions, weighted averages, and alligations.',
            description: 'Solve combined ratios, proportional splits, and weighted average equations rapidly.',
            topics: [
              {
                id: 'ratio-proportion',
                title: 'Ratio & Proportion',
                summary: 'a:b = c:d, compound ratios, direct vs inverse variation, and partnerships.',
                whatYouWillLearn: 'Combining ratios (A:B and B:C to A:B:C) and dividing quantities proportionally.',
                concept: 'If A:B = 2:3 and B:C = 4:5, multiply first ratio by 4 and second by 3 to get A:B:C = 8:12:15.',
                whyItMatters: 'Standard quantitative aptitude questions in campus recruitment.',
                keyTakeaways: [
                  'Direct proportion: x / y = constant; Inverse proportion: x * y = constant.',
                  'Partnership profit ratio = (Investment1 * Time1) : (Investment2 * Time2).',
                ],
              },
              {
                id: 'averages-alligations',
                title: 'Averages & Weighted Averages',
                summary: 'Arithmetic mean, weighted mean, and rule of alligations for mixtures.',
                whatYouWillLearn: 'Deviation method for fast average calculation and mixture concentration formulas.',
                concept: 'Weighted Average = (w1*x1 + w2*x2) / (w1 + w2). Rule of alligation determines the ratio in which two ingredients at given prices must be mixed.',
                whyItMatters: 'Allows calculating complex mixture problems in under 30 seconds.',
                keyTakeaways: [
                  'When each element in a set increases by k, the average increases by k.',
                  'Alligation formula: (Quantity of Cheaper) / (Quantity of Dearer) = (Price of Dearer - Mean Price) / (Mean Price - Price of Cheaper).',
                ],
              },
            ],
          },
          {
            id: 'profit-loss-interest',
            title: 'Profit, Loss & Interest (SI & CI)',
            tagline: 'Cost price, selling price, markup, discounts, simple interest, and compound interest.',
            description: 'Master commercial math: profit %, discount %, effective interest rates, and SI-CI differences.',
            topics: [
              {
                id: 'profit-loss-discount',
                title: 'Profit, Loss, Marked Price & Discount',
                summary: 'CP, SP, MP, Profit% = (P/CP)*100, and successive discounts.',
                whatYouWillLearn: 'Calculating profit/loss percentages and relationships between CP, SP, MP, and Discount.',
                concept: 'Profit is always calculated on Cost Price (CP). Discount is always calculated on Marked Price (MP). SP = MP * (1 - d/100).',
                whyItMatters: 'High-frequency topic in TCS NQT and Capgemini aptitude rounds.',
                keyTakeaways: [
                  'Cost Price CP = SP * (100 / (100 + Profit%)).',
                  'Successive discounts d1 and d2 give single equivalent discount: d1 + d2 - (d1 * d2) / 100.',
                ],
              },
              {
                id: 'simple-compound-interest',
                title: 'Simple & Compound Interest',
                summary: 'SI = (P*R*T)/100, CI = P(1 + R/100)^T - P, and 2-year/3-year SI-CI differences.',
                whatYouWillLearn: 'Calculating interest compounded annually/half-yearly and using difference formulas.',
                concept: 'SI adds fixed interest per period on original principal. CI calculates interest on accumulated balance.',
                whyItMatters: 'Standard quantitative section problem in all MNC test patterns.',
                keyTakeaways: [
                  'Difference between CI and SI for 2 years = P * (R / 100)^2.',
                  'Rule of 72: money doubles in approximately 72 / R years under compound interest.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'level-3-time-based-problems',
        levelNumber: '03',
        title: 'Time-Based Problems',
        shortDescription: 'Time & work, pipes and cisterns, time speed distance, trains, boats & streams, and age problems.',
        estimatedHours: '10 Hours',
        concepts: [
          {
            id: 'time-work-pipes',
            title: 'Time & Work, Pipes & Cisterns',
            tagline: 'Unitary work efficiency, combined work, alternate day work, and filling/emptying pipes.',
            description: 'Use LCM method to assign total work units and solve complex multi-person work schedules.',
            topics: [
              {
                id: 'time-work-lcm-method',
                title: 'Time & Work (LCM Efficiency Method)',
                summary: 'Assigning Total Work = LCM of individual times, daily efficiency units, and wages.',
                whatYouWillLearn: 'Solving multi-person work schedules, men-women-boys equivalences, and alternate day problems.',
                concept: 'Assign Total Work = LCM(time_A, time_B). Efficiency of A = Total Work / time_A. Combined Efficiency = Eff_A + Eff_B.',
                whyItMatters: 'The LCM method solves 95% of time-and-work questions without messy fraction arithmetic.',
                keyTakeaways: [
                  'Formula: (M1 * D1 * H1) / W1 = (M2 * D2 * H2) / W2.',
                  'Wages are always distributed in the ratio of work done (or daily efficiency).',
                ],
              },
            ],
          },
          {
            id: 'time-speed-distance-ages',
            title: 'Time Speed Distance, Trains, Boats & Ages',
            tagline: 'Relative speed, train crossing platforms, upstream/downstream velocities, and age ratios.',
            description: 'Master kinematic word problems with relative velocity vectors and age linear equations.',
            topics: [
              {
                id: 'speed-trains-boats',
                title: 'Time Speed Distance, Trains & Boats',
                summary: 'km/h to m/s (x 5/18), relative speed, platform lengths, and upstream/downstream velocities.',
                whatYouWillLearn: 'Opposite vs same direction relative speeds, boat in still water vs stream velocity.',
                concept: 'Relative speed when moving in opposite directions = S1 + S2; same direction = |S1 - S2|. Downstream speed = Boat + Stream; Upstream speed = Boat - Stream.',
                whyItMatters: 'Extremely high weightage in Infosys, TCS, and Accenture aptitude tests.',
                keyTakeaways: [
                  'Train crossing a platform: Total Distance = Train Length + Platform Length.',
                  'Speed of boat in still water = (Downstream + Upstream) / 2; Speed of stream = (Downstream - Upstream) / 2.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'level-4-advanced-aptitude',
        levelNumber: '04',
        title: 'Advanced Aptitude & Data Interpretation',
        shortDescription: 'Permutations, combinations, probability, data interpretation charts, and data sufficiency.',
        estimatedHours: '10 Hours',
        concepts: [
          {
            id: 'pnc-probability',
            title: 'Permutations, Combinations & Probability',
            tagline: 'Counting principle, arrangements (nPr), selections (nCr), and conditional probability.',
            description: 'Solve selection, arrangement, dice, card, and coin probability questions with combinatorial math.',
            topics: [
              {
                id: 'pnc-principles',
                title: 'Permutations (Arrangement) & Combinations (Selection)',
                summary: 'nPr = n! / (n-r)!, nCr = n! / (r! * (n-r)!), circular permutations, and anagram counting.',
                whatYouWillLearn: 'When order matters (Permutations) vs when order does not matter (Combinations).',
                concept: 'Use Permutation (nPr) for ordered arrangements (words, seating, ranks). Use Combination (nCr) for unordered selections (teams, committee, handshakes).',
                whyItMatters: 'Frequent question in competitive placement screening rounds.',
                keyTakeaways: [
                  'Number of handshakes among n people = nC2 = n(n-1)/2.',
                  'Circular permutation of n objects = (n - 1)!.',
                ],
              },
              {
                id: 'probability-basics',
                title: 'Probability & Independent Events',
                summary: 'P(E) = Favorable Outcomes / Total Outcomes, cards, dice, and coins.',
                whatYouWillLearn: 'Calculating single and multiple event probabilities, mutually exclusive vs independent events.',
                concept: 'Probability P(E) is always between 0 and 1. P(A or B) = P(A) + P(B) - P(A and B). For independent events: P(A and B) = P(A) * P(B).',
                whyItMatters: 'Standard quantitative aptitude question in all major tests.',
                keyTakeaways: [
                  'Standard deck has 52 cards: 4 suits (13 each), 26 Red, 26 Black, 12 Face cards.',
                  'Rolling 2 dice has 36 total outcomes; Sum of 7 has maximum probability (6/36 = 1/6).',
                ],
              },
            ],
          },
          {
            id: 'data-interpretation-sufficiency',
            title: 'Data Interpretation & Data Sufficiency',
            tagline: 'Bar charts, pie charts, tables, line graphs, caselets, and statement sufficiency analysis.',
            description: 'Extract insights rapidly from complex data tables, percentage shares, and evaluate statement sufficiency.',
            topics: [
              {
                id: 'data-interpretation',
                title: 'Data Interpretation (Charts, Tables & Pie Graphs)',
                summary: 'Reading multi-variable charts, calculating percentage growth, ratios, and averages from visual data.',
                whatYouWillLearn: 'Rapid estimation techniques, degree-to-percentage conversion in pie charts (360° = 100%).',
                concept: 'Data Interpretation tests analytical calculation speed under time pressure using tabular matrices, stacked bar graphs, and line trends.',
                whyItMatters: 'Forms 25%+ of the cognitive aptitude section in TCS NQT and Capgemini.',
                keyTakeaways: [
                  'In pie charts: 1% = 3.6° (e.g. 90° = 25%).',
                  'Use approximation and option elimination to avoid long decimal divisions.',
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 03 — LOGICAL REASONING
  // =========================================================================
  {
    id: 'logical-reasoning',
    cardNumber: '03',
    title: 'Logical Reasoning',
    shortTitle: 'Logical Reasoning',
    tagline: 'Series, coding-decoding, blood relations, direction sense, syllogisms, seating arrangements, and logic puzzles.',
    phaseId: 'foundation',
    phaseName: 'Foundation',
    iconName: 'Brain',
    badge: 'Round 1 / Cognitive',
    estimatedHours: '30 Hours',
    importance: 'High',
    description: 'Master analytical logic puzzles, spatial series, directional sense, syllogisms, and linear/circular seating arrangements tested in MNC screening tests.',
    targetMNCs: ['Infosys', 'TCS', 'Wipro', 'Accenture', 'Tech Mahindra', 'DXC'],
    levels: [
      {
        id: 'level-1-basic-reasoning',
        levelNumber: '01',
        title: 'Basic Reasoning',
        shortDescription: 'Series completion, analogy, classification, coding-decoding, direction sense, blood relations, and ranking.',
        estimatedHours: '8 Hours',
        concepts: [
          {
            id: 'series-coding-relations',
            title: 'Series, Coding & Direction Sense',
            tagline: 'Number & alphabet series, cipher decoding, direction vectors, and family trees.',
            description: 'Deduce patterns in alphabetical ciphers, sequence progressions, and genealogical family trees.',
            topics: [
              {
                id: 'number-alphabet-series',
                title: 'Number & Alphabet Series, Analogy & Classification',
                summary: 'Arithmetic/geometric progression, alternate series, difference of differences, and letter positional values (A=1, Z=26).',
                whatYouWillLearn: 'Detecting pattern rules: squares/cubes (+/- 1), Fibonacci-like series, and reverse alphabetical positions (EJOTY rule).',
                concept: 'Series questions require finding the mathematical or positional transformation linking consecutive terms.',
                whyItMatters: 'Found in 100% of logical reasoning tests.',
                keyTakeaways: [
                  'Memorize EJOTY (5, 10, 15, 20, 25) for rapid letter-to-number mapping.',
                  'Opposite letters sum to 27: A(1) + Z(26) = 27, B(2) + Y(25) = 27.',
                ],
              },
              {
                id: 'coding-decoding-directions',
                title: 'Coding-Decoding & Direction Sense',
                summary: 'Letter shifting, substitution ciphers, compass directions (N, S, E, W), and Pythagoras theorem for displacement.',
                whatYouWillLearn: 'Tracking compass turns (clockwise 90°, shadow directions at sunrise/sunset) and calculating shortest distance.',
                concept: 'Direction problems track displacements on a 2D Cartesian plane. Total straight-line distance is computed using the hypotenuse: sqrt(dx^2 + dy^2).',
                whyItMatters: 'Standard questions in Infosys and Capgemini logical sections.',
                keyTakeaways: [
                  'At sunrise, shadows fall towards West; at sunset, shadows fall towards East.',
                  'Always draw a quick compass cross (N-S-E-W) to avoid left/right turn confusion.',
                ],
              },
              {
                id: 'blood-relations-ranking',
                title: 'Blood Relations & Ranking Tests',
                summary: 'Family tree notation (+ for male, - for female, = for spouse), generational levels, and position ranking formulas.',
                whatYouWillLearn: 'Decoding coded relations (e.g. A + B means A is father of B) and finding total count using rank from left/right.',
                concept: 'Total people in a row = (Rank from Left + Rank from Right) - 1. Blood relations map generational levels vertically and sibling ties horizontally.',
                whyItMatters: 'High-frequency questions in all technical and service MNC tests.',
                keyTakeaways: [
                  'Never assume gender from name; only assign gender if explicitly stated by relation.',
                  'Total = Left + Right - 1 (since the person is counted twice).',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'level-2-logical-statements',
        levelNumber: '02',
        title: 'Logical Statements',
        shortDescription: 'Syllogisms, Venn diagram deduction, statement-conclusion, statement-assumption, and cause-effect.',
        estimatedHours: '8 Hours',
        concepts: [
          {
            id: 'syllogisms-statement-analysis',
            title: 'Syllogisms & Statement Analysis',
            tagline: 'Venn diagrams, possibility cases, assumptions, and critical reasoning.',
            description: 'Evaluate categorical syllogisms with Venn diagrams and deduce valid inferences from given statements.',
            topics: [
              {
                id: 'syllogisms',
                title: 'Syllogisms & Venn Diagram Logic',
                summary: 'All A are B, Some A are B, No A is B, Some A are not B, and possibility cases.',
                whatYouWillLearn: 'Drawing minimum overlap Venn diagrams and evaluating definite vs possibility conclusions.',
                concept: 'A conclusion is valid ONLY if it holds true in ALL possible Venn diagram representations. If even one valid counter-diagram invalidates it, the conclusion is false.',
                whyItMatters: 'Accounts for 3 to 5 questions in every major placement assessment.',
                keyTakeaways: [
                  '"Some A are B" does NOT imply "Some A are not B".',
                  '"Only a few A are B" means: Some A are B AND Some A are NOT B.',
                  'Complementary pairs (Either I or II follows): One affirmative + One negative with same subject and predicate.',
                ],
              },
              {
                id: 'critical-statement-analysis',
                title: 'Statement & Assumptions, Conclusions, Cause & Effect',
                summary: 'Identifying implicit assumptions, strong vs weak arguments, and causal relationships.',
                whatYouWillLearn: 'Differentiating between explicit facts and underlying unstated assumptions.',
                concept: 'An assumption is something taken for granted without proof. A valid assumption must be directly necessary for the statement to hold true.',
                whyItMatters: 'Tested heavily in Deloitte, PwC, and advanced cognitive assessments.',
                keyTakeaways: [
                  'Assumptions cannot contain words like "only", "always", "never" (extreme words are usually invalid).',
                  'Cause must precede the effect chronologically and logically.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'level-3-arrangements',
        levelNumber: '03',
        title: 'Arrangements',
        shortDescription: 'Linear seating, circular seating (facing center/outward), and multi-variable scheduling/ordering.',
        estimatedHours: '7 Hours',
        concepts: [
          {
            id: 'seating-ordering',
            title: 'Seating Arrangements & Ordering',
            tagline: 'Linear, circular, parallel rows, ranking constraints, and schedule matrices.',
            description: 'Deduce spatial placements under complex relative orientation and positioning constraints.',
            topics: [
              {
                id: 'seating-arrangements',
                title: 'Linear & Circular Seating Arrangements',
                summary: 'Single row, double parallel rows, circular table facing center vs facing outward.',
                whatYouWillLearn: 'Drawing placement grids, fixing anchor clues first, and managing parallel possibility diagrams.',
                concept: 'In a circle facing center: Left is Clockwise, Right is Anti-Clockwise. Facing outward reverses left/right.',
                whyItMatters: 'Carries high weightage in Infosys and Capgemini logical sections.',
                keyTakeaways: [
                  'Always place the most definitive clue first before placing conditional entities.',
                  'Maintain 2 possible layout diagrams side-by-side to quickly prune invalid branches.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'level-4-advanced-puzzles',
        levelNumber: '04',
        title: 'Advanced Puzzles',
        shortDescription: 'Floor puzzles, box puzzles, distribution matrices, selection puzzles, and complex logic grids.',
        estimatedHours: '7 Hours',
        concepts: [
          {
            id: 'complex-puzzles',
            title: 'Advanced Logic Puzzles & Data Sufficiency',
            tagline: 'Floor & flat puzzles, multi-attribute grids, and data sufficiency analysis.',
            description: 'Master multi-variable constraint satisfaction problems tested in high-package recruitment tracks.',
            topics: [
              {
                id: 'floor-distribution-puzzles',
                title: 'Floor & Distribution Logic Puzzles',
                summary: 'People living on floors 1 to 8, attributes (colors, cities, professions), and grid matrices.',
                whatYouWillLearn: 'Constructing systematic 2D constraint tables and systematically applying elimination logic.',
                concept: 'Complex puzzles require linking multiple independent variables (Person, Floor, Department, Vehicle) using a structured elimination matrix.',
                whyItMatters: 'Differentiates top performers in TCS Digital, Infosys SP, and product firm screening tests.',
                keyTakeaways: [
                  'Use negative clues (e.g. "A does NOT like Red") to eliminate matrix cells with "X".',
                  'Never guess; every puzzle has a single deterministic solution.',
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 04 — ENGLISH & VERBAL ABILITY
  // =========================================================================
  {
    id: 'english-verbal-ability',
    cardNumber: '04',
    title: 'English & Verbal Ability',
    shortTitle: 'Verbal Ability',
    tagline: 'Grammar rules, sentence correction, active/passive voice, direct/indirect speech, vocabulary, and reading comprehension.',
    phaseId: 'foundation',
    phaseName: 'Foundation',
    iconName: 'BookOpen',
    badge: 'Round 1 / Verbal',
    estimatedHours: '25 Hours',
    importance: 'High',
    description: 'Clear the mandatory Verbal Ability cutoff in placement tests. Covers subject-verb agreement, tenses, active/passive voice, para-jumbles, and reading comprehension.',
    targetMNCs: ['TCS NQT', 'Accenture', 'Capgemini', 'Deloitte', 'EY', 'PwC'],
    levels: [
      {
        id: 'level-1-grammar',
        levelNumber: '01',
        title: 'Grammar Rules',
        shortDescription: 'Parts of speech, articles, pronouns, prepositions, conjunctions, tenses, and subject-verb agreement.',
        estimatedHours: '7 Hours',
        concepts: [
          {
            id: 'core-grammar',
            title: 'Parts of Speech & Subject-Verb Agreement',
            tagline: 'Subject-verb agreement rules, tenses, prepositional rules, and modifier placement.',
            description: 'Master the non-negotiable rules governing correct English sentence structure.',
            topics: [
              {
                id: 'subject-verb-agreement',
                title: 'Subject-Verb Agreement Rules',
                summary: 'Singular vs plural subjects, compound subjects (along with, as well as), and indefinite pronouns.',
                whatYouWillLearn: 'Identifying subject-verb traps with "neither/nor", "either/or", "each", and collective nouns.',
                concept: 'A singular subject requires a singular verb; a plural subject requires a plural verb. Intervening prepositional phrases do NOT alter subject number.',
                whyItMatters: 'Accounts for 40%+ of error spotting questions in MNC verbal tests.',
                keyTakeaways: [
                  'When subjects are joined by "as well as" or "along with", verb agrees with the FIRST subject.',
                  'When subjects are joined by "either...or" / "neither...nor", verb agrees with the CLOSER subject.',
                  '"Each", "Every", "Everyone", "Nobody" always take a SINGULAR verb.',
                ],
              },
              {
                id: 'tenses-prepositions',
                title: 'Tenses & Preposition Usage',
                summary: 'Present/past perfect, conditional sentences (If I were...), and tricky prepositions (since vs for, between vs among).',
                whatYouWillLearn: 'Correct tense sequencing in complex sentences and fixed prepositional idioms.',
                concept: 'Past Perfect (had + V3) denotes the EARLIER of two past actions. "Since" denotes a specific point in time; "for" denotes a duration.',
                whyItMatters: 'Frequent error detection test patterns.',
                keyTakeaways: [
                  'Conditional type 3: "If had + V3, would have + V3".',
                  '"Between" is used for two items; "Among" is used for three or more.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'level-2-sentence-skills',
        levelNumber: '02',
        title: 'Sentence Skills',
        shortDescription: 'Sentence correction, error detection, fill in the blanks, active/passive voice, and direct/indirect speech.',
        estimatedHours: '6 Hours',
        concepts: [
          {
            id: 'sentence-transformation',
            title: 'Voice, Speech & Sentence Correction',
            tagline: 'Active-passive transformations, reported speech rules, and structural parallelism.',
            description: 'Convert between active/passive voices, direct/indirect reported speech, and maintain sentence parallelism.',
            topics: [
              {
                id: 'active-passive-voice',
                title: 'Active & Passive Voice Transformation',
                summary: 'Subject-object swapping, auxiliary verb shifts (be + V3), and tense preservation rules.',
                whatYouWillLearn: 'Converting sentences to passive voice across all tenses without changing the core meaning.',
                concept: 'In Active voice, the subject performs the action. In Passive voice, the subject receives the action (Object + Auxiliary be + V3 + by + Subject).',
                whyItMatters: 'Direct transformation questions in Accenture and TCS verbal assessments.',
                keyTakeaways: [
                  'Present Continuous active (is writing) becomes passive (is being written).',
                  'Intransitive verbs (verbs without an object, like "sleep", "die") cannot be converted to passive voice.',
                ],
              },
              {
                id: 'direct-indirect-speech',
                title: 'Direct & Indirect (Reported) Speech',
                summary: 'Reporting verbs (said to → told), tense backshifts, and pronoun/time conversions (now → then, tomorrow → next day).',
                whatYouWillLearn: 'Converting statements, interrogatives, and imperatives into reported speech.',
                concept: 'When reporting verb is in the past tense, present tenses in direct speech shift to corresponding past tenses in indirect speech (Universal truths remain unchanged).',
                whyItMatters: 'Standard verbal ability section questions.',
                keyTakeaways: [
                  'Universal truths and scientific facts do NOT change tense in reported speech.',
                  'Questions convert to assertive statements: "Where are you going?" becomes "where I was going".',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'level-3-vocabulary',
        levelNumber: '03',
        title: 'Vocabulary & Word Usage',
        shortDescription: 'Synonyms, antonyms, contextual vocabulary, confusing words, idioms, and phrases.',
        estimatedHours: '6 Hours',
        concepts: [
          {
            id: 'vocab-idioms',
            title: 'Vocabulary, Idioms & Confusing Words',
            tagline: 'High-frequency GRE/placement root words, idioms, homophones, and contextual usage.',
            description: 'Expand high-frequency English vocabulary using Latin/Greek root words and master common idioms.',
            topics: [
              {
                id: 'synonyms-antonyms-roots',
                title: 'Root Words, Synonyms & Antonyms',
                summary: 'Prefixes, suffixes, Latin/Greek roots (bene, mal, chron, path, voc), and word connotations.',
                whatYouWillLearn: 'Deciphering unfamiliar words using root word etymology and eliminating incorrect antonym choices.',
                concept: 'Root words provide structural clues to word meanings (e.g. "bene" = good → beneficial, benevolent, benediction; "mal" = bad → malicious, malignant).',
                whyItMatters: 'Eliminates guesswork in vocabulary MCQ rounds.',
                keyTakeaways: [
                  'Identify the emotional tone/connotation of the word (positive, negative, neutral) to prune options.',
                  'Pay attention to commonly confused words: affect (verb) vs effect (noun), complement vs compliment.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'level-4-reading',
        levelNumber: '04',
        title: 'Reading & Paragraphs',
        shortDescription: 'Reading comprehension (inference, tone, central idea) and para-jumbles (sentence ordering).',
        estimatedHours: '6 Hours',
        concepts: [
          {
            id: 'rc-parajumbles',
            title: 'Reading Comprehension & Para Jumbles',
            tagline: 'Fast reading strategies, author tone identification, transition words, and logical paragraph sequence.',
            description: 'Extract central themes rapidly from passages and reconstruct scrambled paragraphs logically.',
            topics: [
              {
                id: 'reading-comprehension',
                title: 'Reading Comprehension Strategies',
                summary: 'Skimming & scanning, main idea identification, tone analysis, and answering fact vs inference questions.',
                whatYouWillLearn: 'Question-first reading strategy and identifying author stance (critical, optimistic, satirical, analytical).',
                concept: 'Read the question stems FIRST before diving into the passage to know what specific keywords and data to scan for.',
                whyItMatters: 'Reading comprehension carries 30%+ weightage in TCS NQT and Deloitte verbal sections.',
                keyTakeaways: [
                  'Avoid choosing options that introduce outside knowledge not mentioned in the passage.',
                  'Extreme words in options ("only", "entirely", "never") are almost always wrong.',
                ],
              },
              {
                id: 'para-jumbles',
                title: 'Para Jumbles & Sentence Ordering',
                summary: 'Mandatory pairs, pronoun-noun antecedents, chronologies, and transition keywords (However, Therefore).',
                whatYouWillLearn: 'Reordering scrambled sentences (A, B, C, D) by spotting opening sentences and mandatory pairs.',
                concept: '1. Identify the Opening Sentence (introduces the main noun/theme). 2. Find Mandatory Pairs (Noun followed by Pronoun, or Cause followed by "Therefore"). 3. Identify Closing Sentence.',
                whyItMatters: 'Appears in every online test pattern.',
                keyTakeaways: [
                  'An opening sentence rarely starts with pronouns ("he", "it", "they") or transitions ("However", "Moreover").',
                  'Look for chronological markers (e.g. 1990 → 2005 → Today).',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  DSA_PLACEMENT_CATEGORY,
  CS_FUNDAMENTALS_CATEGORY,
  OOP_CATEGORY,
  DBMS_CATEGORY,
  SQL_CATEGORY,
  OS_CATEGORY,
  NETWORKS_CATEGORY,
  GIT_CATEGORY,
  DEV_BASICS_CATEGORY,
  SYSTEM_DESIGN_CATEGORY,
  AIML_SPECIALIZATION_CATEGORY,
  PROJECTS_CATEGORY,
  RESUME_PORTFOLIO_CATEGORY,
  COMMUNICATION_CATEGORY,
  TECHNICAL_INTERVIEW_CATEGORY,
  HR_INTERVIEW_CATEGORY,
  MANAGERIAL_ROUND_CATEGORY,
  COMPANY_SPECIFIC_PREP_CATEGORY,
  MOCK_ASSESSMENTS_CATEGORY,
  MOCK_INTERVIEWS_CATEGORY,
  INTERVIEW_QUESTION_BANK_CATEGORY,
];

export function getPlacementCategoryById(categoryId: string): PlacementCategory | null {
  return PLACEMENT_CATEGORIES.find((c) => c.id.toLowerCase() === categoryId.toLowerCase()) || null;
}

export function getPlacementLevelById(categoryId: string, levelId: string): PlacementLevel | null {
  const cat = getPlacementCategoryById(categoryId);
  if (!cat) return null;
  return cat.levels.find((l) => l.id.toLowerCase() === levelId.toLowerCase()) || null;
}

export function getPlacementConceptById(categoryId: string, levelId: string, conceptId: string): PlacementConcept | null {
  const level = getPlacementLevelById(categoryId, levelId);
  if (!level) return null;
  return level.concepts.find((c) => c.id.toLowerCase() === conceptId.toLowerCase()) || null;
}

export function getPlacementTopicById(categoryId: string, topicId: string): { topic: PlacementTopic; level: PlacementLevel; concept: PlacementConcept } | null {
  const cat = getPlacementCategoryById(categoryId);
  if (!cat) return null;

  for (const level of cat.levels) {
    for (const concept of level.concepts) {
      const topic = concept.topics.find((t) => t.id.toLowerCase() === topicId.toLowerCase());
      if (topic) {
        return { topic, level, concept };
      }
    }
  }
  return null;
}

export function getTotalPlacementTopicsCount(): number {
  return PLACEMENT_CATEGORIES.reduce((acc, cat) => {
    return acc + cat.levels.reduce((lAcc, l) => {
      return lAcc + l.concepts.reduce((cAcc, c) => cAcc + c.topics.length, 0);
    }, 0);
  }, 0);
}
