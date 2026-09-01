import { PYTHON_TOPICS_PART1, PythonTopicDetail, TopicPracticeItem, CheckpointQuestion } from './pythonTopicsDataPart1';
import { PYTHON_TOPICS_PART2 } from './pythonTopicsDataPart2';
import { PYTHON_QUESTION_BANKS, AssignmentQuestion, AssignmentTestCase, ModuleAssignmentConfig } from './pythonQuestionBanks';

export type {
  PythonTopicDetail,
  TopicPracticeItem,
  CheckpointQuestion,
  AssignmentQuestion,
  AssignmentTestCase,
  ModuleAssignmentConfig,
};

export interface PythonModuleMetadata {
  id: string; // 'm1', 'm2', etc.
  moduleNumber: number; // 1 to 7
  title: string;
  shortDescription: string;
  longDescription: string;
  topicIds: string[];
}

export const PYTHON_MODULES: PythonModuleMetadata[] = [
  {
    id: 'm1',
    moduleNumber: 1,
    title: 'Python Basics',
    shortDescription: 'Installing Python & IDE, variables, data types, and console I/O.',
    longDescription: 'Learn how Python works, set up the development environment, understand variables and data types, and interact with users through input and output.',
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
    topicIds: [
      'dictionaries',
      'dictionary-methods-traversal',
      'sets',
      'set-operations',
      'defining-functions',
      'parameters-and-arguments',
      'return-values'
    ]
  }
];

// Unified Topic Dictionary (all 33 topics)
export const PYTHON_TOPICS_MAP: Record<string, PythonTopicDetail> = {
  ...PYTHON_TOPICS_PART1,
  ...PYTHON_TOPICS_PART2,
};

// Sequential array of all 33 topics for global linear navigation
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
// FINAL PYTHON BEGINNER CHALLENGE
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
  title: 'Python Beginner Final Capstone Challenge',
  subtitle: 'Student Performance & Analytics System',
  description:
    'Build a comprehensive, modular Student Performance and Course Analytics CLI program. This challenge synthesizes all 7 modules: Variables & I/O, Operators, Conditionals, Loops, Strings, Lists, Tuples, Dictionaries, Sets, and Functions.',
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
