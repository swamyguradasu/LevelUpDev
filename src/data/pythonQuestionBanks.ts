export interface AssignmentTestCase {
  input: string;
  expectedOutput: string;
  description?: string;
  hidden?: boolean;
}

export type AssignmentQuestionType =
  | 'mcq'
  | 'multiple-select'
  | 'output'
  | 'debugging'
  | 'code-writing'
  | 'code-completion'
  | 'code-tracing'
  | 'scenario'
  | 'short-answer';

export interface AssignmentQuestion {
  id: string;
  moduleId: string;
  topicId: string;
  topicTitle: string;
  type: AssignmentQuestionType;
  points?: number;
  prompt: string;
  codeSnippet?: string;
  options?: string[]; // for mcq and multiple-select
  correctAnswer?: number | number[] | string; // index for mcq, array of indices for multiple-select, string for output/tracing/short-answer
  starterCode?: string; // for debugging, code-writing, code-completion, scenario
  solutionCode?: string;
  testCases?: AssignmentTestCase[];
  explanation: string;
  hint?: string;
}

export interface ModuleAssignmentConfig {
  moduleId: string;
  title: string;
  timeLimitMinutes: number;
  sampleCount: number;
  passingScorePercent: number;
  questionBank: AssignmentQuestion[];
}

export const PYTHON_QUESTION_BANKS: Record<string, ModuleAssignmentConfig> = {
  // ==========================================
  // MODULE 1 ASSIGNMENT BANK (Python Basics)
  // ==========================================
  m1: {
    moduleId: 'm1',
    title: 'Module 1 Assignment: Python Basics',
    timeLimitMinutes: 25,
    sampleCount: 14,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm1-q01',
        moduleId: 'm1',
        topicId: 'print-and-input',
        topicTitle: 'print() and input()',
        type: 'mcq',
        points: 1,
        prompt: 'What data type is returned by the built-in input() function in Python 3?',
        options: ['int', 'str', 'float', 'NoneType'],
        correctAnswer: 1,
        explanation: 'The input() function always reads keyboard input as a string (str).'
      },
      {
        id: 'm1-q02',
        moduleId: 'm1',
        topicId: 'variables-and-data-types',
        topicTitle: 'Variables and Data Types',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which of the following are VALID variable names in Python? (Select all that apply)',
        options: ['_user_count', '2nd_score', 'studentName', 'class', 'MAX_LIMIT'],
        correctAnswer: [0, 2, 4],
        explanation: '`2nd_score` is invalid (starts with digit) and `class` is a reserved keyword.'
      },
      {
        id: 'm1-q03',
        moduleId: 'm1',
        topicId: 'variables-and-data-types',
        topicTitle: 'Variables and Data Types',
        type: 'output',
        points: 2,
        prompt: 'What will this Python code output?',
        codeSnippet: `a = 10
b = "20"
print(type(a) == type(b))`,
        correctAnswer: 'False',
        explanation: 'type(a) is int while type(b) is str. They are not equal, evaluating to False.'
      },
      {
        id: 'm1-q04',
        moduleId: 'm1',
        topicId: 'print-and-input',
        topicTitle: 'print() and input()',
        type: 'output',
        points: 2,
        prompt: 'What will be printed to the console?',
        codeSnippet: `print("Python", "3", sep="*", end="!")`,
        correctAnswer: 'Python*3!',
        explanation: 'sep="*" puts an asterisk between arguments, and end="!" finishes with an exclamation mark.'
      },
      {
        id: 'm1-q05',
        moduleId: 'm1',
        topicId: 'variables-and-data-types',
        topicTitle: 'Variables and Data Types',
        type: 'code-tracing',
        points: 2,
        prompt: 'What is the value of variable `x` after this code executes?',
        codeSnippet: `x = 5
y = x
x = "Hello"
y = 20`,
        correctAnswer: 'Hello',
        explanation: '`x` was reassigned string "Hello". Variables in Python hold independent object references.'
      },
      {
        id: 'm1-q06',
        moduleId: 'm1',
        topicId: 'print-and-input',
        topicTitle: 'print() and input()',
        type: 'debugging',
        points: 3,
        prompt: 'Fix the bug in this program so that it correctly computes the user\'s age next year from input.',
        starterCode: `# Buggy code:
age = input()
next_age = age + 1
print(next_age)`,
        solutionCode: `age = int(input())
next_age = age + 1
print(next_age)`,
        testCases: [
          { input: '20', expectedOutput: '21', description: 'Standard integer input' },
          { input: '15', expectedOutput: '16', description: 'Teen age input' }
        ],
        explanation: '`input()` returns a string. You must convert `age` to an integer using `int(input())` before adding 1.'
      },
      {
        id: 'm1-q07',
        moduleId: 'm1',
        topicId: 'variables-and-data-types',
        topicTitle: 'Variables and Data Types',
        type: 'code-completion',
        points: 3,
        prompt: 'Complete the missing portion of code to check if variable `val` is a boolean.',
        starterCode: `val = False
# Fill in the condition:
if type(val) == ___:
    print("Boolean confirmed")`,
        solutionCode: `val = False
if type(val) == bool:
    print("Boolean confirmed")`,
        testCases: [
          { input: '', expectedOutput: 'Boolean confirmed', description: 'Check bool type comparison' }
        ],
        explanation: 'In Python, the boolean data type is represented by the built-in type `bool`.'
      },
      {
        id: 'm1-q08',
        moduleId: 'm1',
        topicId: 'print-and-input',
        topicTitle: 'print() and input()',
        type: 'code-writing',
        points: 5,
        prompt: 'Write a Python program that accepts two string inputs: `name` and `role`, and prints: `User: <name> | Role: <role>`',
        starterCode: `# Read name and role from input and print formatted string
name = input()
role = input()
# Write your code below:
`,
        solutionCode: `name = input()
role = input()
print(f"User: {name} | Role: {role}")`,
        testCases: [
          { input: 'Swamy\nDeveloper', expectedOutput: 'User: Swamy | Role: Developer', description: 'Developer user' },
          { input: 'Alex\nAdmin', expectedOutput: 'User: Alex | Role: Admin', description: 'Admin user' }
        ],
        explanation: 'Read two lines with input() and output the formatted string using f-string or string concatenation.'
      },
      {
        id: 'm1-q09',
        moduleId: 'm1',
        topicId: 'variables-and-data-types',
        topicTitle: 'Variables and Data Types',
        type: 'scenario',
        points: 5,
        prompt: 'Scenario: A student registration portal accepts a student name, age, and marks percentage (e.g. 94.5). Write a program to read these three inputs and print a formatted summary with their respective types: `<name> (<str>), Age: <age> (<int>), Marks: <marks> (<float>)`',
        starterCode: `name = input()
age = int(input())
marks = float(input())

# Print output in exact format:
`,
        solutionCode: `name = input()
age = int(input())
marks = float(input())
print(f"{name} (str), Age: {age} (int), Marks: {marks} (float)")`,
        testCases: [
          { input: 'Kiran\n21\n88.5', expectedOutput: 'Kiran (str), Age: 21 (int), Marks: 88.5 (float)' },
          { input: 'Divya\n19\n92.0', expectedOutput: 'Divya (str), Age: 19 (int), Marks: 92.0 (float)' }
        ],
        explanation: 'Cast `age` to `int` and `marks` to `float`, then format using an f-string.'
      },
      {
        id: 'm1-q10',
        moduleId: 'm1',
        topicId: 'installing-python-ide',
        topicTitle: 'Installing Python and an IDE',
        type: 'short-answer',
        points: 2,
        prompt: 'Explain what happens during runtime when you run `python main.py` in the terminal.',
        options: [
          'The Python interpreter reads, compiles source code to bytecode (.pyc), and executes it line-by-line via Python Virtual Machine (PVM).',
          'The CPU directly compiles Python code to bare-metal assembly binary machine code before saving to disk.',
          'The browser executes Python scripts via JavaScript V8 engine.',
          'The OS converts Python syntax directly to C++ source code.'
        ],
        correctAnswer: 0,
        explanation: 'Python is an interpreted language where the interpreter compiles to bytecode and executes on the PVM.'
      },
      {
        id: 'm1-q11',
        moduleId: 'm1',
        topicId: 'installing-python-ide',
        topicTitle: 'Installing Python and an IDE',
        type: 'mcq',
        points: 1,
        prompt: 'Which tool is the standard package installer for Python libraries?',
        options: ['pip', 'npm', 'cargo', 'gem'],
        correctAnswer: 0,
        explanation: '`pip` is the default package manager and installer for Python.'
      },
      {
        id: 'm1-q12',
        moduleId: 'm1',
        topicId: 'variables-and-data-types',
        topicTitle: 'Variables and Data Types',
        type: 'output',
        prompt: 'What is the output of this Python code snippet?',
        codeSnippet: `x = 100
print(type(x) is int)`,
        correctAnswer: 'True',
        explanation: '`type(100)` is `<class \'int\'>`, which matches `int`, evaluating to True.'
      },
      {
        id: 'm1-q13',
        moduleId: 'm1',
        topicId: 'print-and-input',
        topicTitle: 'print() and input()',
        type: 'output',
        prompt: 'What is printed by this multiple-assignment code?',
        codeSnippet: `x, y, z = 1, 2, 3
print(x + y * z)`,
        correctAnswer: '7',
        explanation: 'Multiplication has higher precedence than addition: `2 * 3 = 6`, then `1 + 6 = 7`.'
      },
      {
        id: 'm1-q14',
        moduleId: 'm1',
        topicId: 'variables-and-data-types',
        topicTitle: 'Variables and Data Types',
        type: 'code-writing',
        points: 5,
        prompt: 'Write a Python program that accepts a user\'s birth year as an input string, converts it to an integer, and calculates their age in the year 2026. Print: `Age in 2026: <age>`',
        starterCode: `birth_year_str = input()
# Write your code below:
`,
        solutionCode: `birth_year_str = input()
birth_year = int(birth_year_str)
age = 2026 - birth_year
print(f"Age in 2026: {age}")`,
        testCases: [
          { input: '2004', expectedOutput: 'Age in 2026: 22', description: 'Born in 2004' },
          { input: '2000', expectedOutput: 'Age in 2026: 26', description: 'Born in 2000' }
        ],
        explanation: 'Convert input string to int using `int()`, subtract from 2026, and print formatted result.'
      },
      {
        id: 'm1-q15',
        moduleId: 'm1',
        topicId: 'installing-python-ide',
        topicTitle: 'Installing Python and an IDE',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which of the following are valid ways to run Python code? (Select all that apply)',
        options: ['Running `python script.py` in terminal', 'Interactive REPL prompt in terminal', 'Running via Jupyter Notebook cells', 'Executing inside a CSS file'],
        correctAnswer: [0, 1, 2],
        explanation: 'Terminal scripts, REPL, and Jupyter are standard Python run environments. CSS files cannot run Python.'
      }
    ]
  },

  // ==========================================
  // MODULE 2 ASSIGNMENT BANK (Operators & Casting)
  // ==========================================
  m2: {
    moduleId: 'm2',
    title: 'Module 2 Assignment: Operators & Type Conversion',
    timeLimitMinutes: 30,
    sampleCount: 15,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm2-q01',
        moduleId: 'm2',
        topicId: 'arithmetic-operators',
        topicTitle: 'Arithmetic Operators',
        type: 'output',
        points: 2,
        prompt: 'What is the output of this floor division with negative numbers?',
        codeSnippet: `print(-7 // 2)`,
        correctAnswer: '-4',
        explanation: 'Floor division rounds down towards negative infinity. -3.5 rounded down is -4.'
      },
      {
        id: 'm2-q02',
        moduleId: 'm2',
        topicId: 'arithmetic-operators',
        topicTitle: 'Arithmetic Operators',
        type: 'output',
        points: 2,
        prompt: 'What is the evaluated output of this expression?',
        codeSnippet: `print(2 + 3 * 4 ** 2)`,
        correctAnswer: '50',
        explanation: 'Exponentiation first: `4 ** 2 = 16`. Then multiplication: `3 * 16 = 48`. Addition last: `2 + 48 = 50`.'
      },
      {
        id: 'm2-q03',
        moduleId: 'm2',
        topicId: 'comparison-operators',
        topicTitle: 'Comparison Operators',
        type: 'output',
        points: 2,
        prompt: 'What does this chained comparison evaluate to?',
        codeSnippet: `x = 15
print(10 < x <= 20 != 25)`,
        correctAnswer: 'True',
        explanation: 'All parts hold: `10 < 15` (True), `15 <= 20` (True), and `20 != 25` (True).'
      },
      {
        id: 'm2-q04',
        moduleId: 'm2',
        topicId: 'logical-operators',
        topicTitle: 'Logical Operators',
        type: 'output',
        points: 2,
        prompt: 'What is returned by this short-circuit boolean evaluation?',
        codeSnippet: `print("Python" or "Java")
print("" and "SQL")`,
        correctAnswer: 'Python\n',
        explanation: '`"Python" or "Java"` returns first truthy value `"Python"`. `"" and "SQL"` returns first falsy value `""` (empty line).'
      },
      {
        id: 'm2-q05',
        moduleId: 'm2',
        topicId: 'type-casting-conversion',
        topicTitle: 'Type Casting / Type Conversion',
        type: 'output',
        points: 2,
        prompt: 'What is the output of `bool("False")`?',
        correctAnswer: 'True',
        explanation: 'Any non-empty string in Python evaluates to True when passed to `bool()`.'
      },
      {
        id: 'm2-q06',
        moduleId: 'm2',
        topicId: 'type-casting-conversion',
        topicTitle: 'Type Casting / Type Conversion',
        type: 'debugging',
        points: 3,
        prompt: 'Fix the bug in this program to properly convert a floating string representation into an integer.',
        starterCode: `# Buggy conversion:
raw = "49.99"
val = int(raw)
print(val)`,
        solutionCode: `raw = "49.99"
val = int(float(raw))
print(val)`,
        testCases: [
          { input: '', expectedOutput: '49', description: 'Convert float string to truncated integer' }
        ],
        explanation: '`int("49.99")` throws ValueError. You must first convert to float `float(raw)` then to `int()`.'
      },
      {
        id: 'm2-q07',
        moduleId: 'm2',
        topicId: 'assignment-operators',
        topicTitle: 'Assignment Operators',
        type: 'code-tracing',
        points: 2,
        prompt: 'What is the final value of `score` after these operations?',
        codeSnippet: `score = 20
score += 10
score //= 4
score **= 2`,
        correctAnswer: '49',
        explanation: '20 + 10 = 30; 30 // 4 = 7; 7 ** 2 = 49.'
      },
      {
        id: 'm2-q08',
        moduleId: 'm2',
        topicId: 'arithmetic-operators',
        topicTitle: 'Arithmetic Operators',
        type: 'code-writing',
        points: 5,
        prompt: 'Accept two integer numbers `a` and `b` from input. Calculate and print 4 lines: 1) Sum, 2) Difference (a - b), 3) Product, 4) Floor Division (a // b).',
        starterCode: `a = int(input())
b = int(input())
# Write calculation lines:
`,
        solutionCode: `a = int(input())
b = int(input())
print(a + b)
print(a - b)
print(a * b)
print(a // b)`,
        testCases: [
          { input: '20\n6', expectedOutput: '26\n14\n120\n3', description: 'Positive numbers' },
          { input: '15\n4', expectedOutput: '19\n11\n60\n3', description: '15 and 4' }
        ],
        explanation: 'Perform standard arithmetic operators `+`, `-`, `*`, and `//` sequentially.'
      },
      {
        id: 'm2-q09',
        moduleId: 'm2',
        topicId: 'logical-operators',
        topicTitle: 'Logical Operators',
        type: 'code-writing',
        points: 5,
        prompt: 'Write a program that takes an integer `num` from input and prints `True` if the number is between 10 and 50 (inclusive) AND is an even number; otherwise print `False`.',
        starterCode: `num = int(input())
# Write your boolean condition check:
`,
        solutionCode: `num = int(input())
result = (10 <= num <= 50) and (num % 2 == 0)
print(result)`,
        testCases: [
          { input: '24', expectedOutput: 'True', description: '24 is within range and even' },
          { input: '25', expectedOutput: 'False', description: '25 is odd' },
          { input: '8', expectedOutput: 'False', description: '8 is out of range' }
        ],
        explanation: 'Combine range check `(10 <= num <= 50)` with even check `(num % 2 == 0)` using `and`.'
      },
      {
        id: 'm2-q10',
        moduleId: 'm2',
        topicId: 'type-casting-conversion',
        topicTitle: 'Type Casting / Type Conversion',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which of the following expressions evaluate to boolean False in Python? (Select all that apply)',
        options: ['bool(0)', 'bool("0")', 'bool([])', 'bool(None)', 'bool([0])'],
        correctAnswer: [0, 2, 3],
        explanation: '`0`, empty list `[]`, and `None` are falsy. `"0"` and `[0]` are non-empty and therefore truthy.'
      },
      {
        id: 'm2-q11',
        moduleId: 'm2',
        topicId: 'assignment-operators',
        topicTitle: 'Assignment Operators',
        type: 'mcq',
        points: 1,
        prompt: 'What does the operator `//=` do in Python?',
        options: ['Performs true division and assigns', 'Performs floor division and assigns in place', 'Calculates remainder', 'Raises syntax error'],
        correctAnswer: 1,
        explanation: '`x //= y` is equivalent to `x = x // y` (floor division compound assignment).'
      },
      {
        id: 'm2-q12',
        moduleId: 'm2',
        topicId: 'comparison-operators',
        topicTitle: 'Comparison Operators',
        type: 'output',
        prompt: 'What is the output of `print(10 == 10.0)`?',
        correctAnswer: 'True',
        explanation: 'In Python, numeric value equality `==` checks mathematical equivalence across int and float.'
      },
      {
        id: 'm2-q13',
        moduleId: 'm2',
        topicId: 'arithmetic-operators',
        topicTitle: 'Arithmetic Operators',
        type: 'scenario',
        points: 5,
        prompt: 'Scenario: Convert total seconds into a clock string formatted as `HH:MM:SS`. Read integer `total_seconds` and print the formatted clock time with 2-digit zero padding (e.g. `01:05:08`).',
        starterCode: `total_seconds = int(input())
# Compute hours, minutes, seconds:
`,
        solutionCode: `total_seconds = int(input())
hours = total_seconds // 3600
rem = total_seconds % 3600
minutes = rem // 60
seconds = rem % 60
print(f"{hours:02d}:{minutes:02d}:{seconds:02d}")`,
        testCases: [
          { input: '3908', expectedOutput: '01:05:08', description: '3908 seconds' },
          { input: '7200', expectedOutput: '02:00:00', description: 'Exactly 2 hours' }
        ],
        explanation: 'Compute `// 3600`, `% 3600 // 60`, and `% 60`, formatting with `:02d`.'
      },
      {
        id: 'm2-q14',
        moduleId: 'm2',
        topicId: 'type-casting-conversion',
        topicTitle: 'Type Casting / Type Conversion',
        type: 'output',
        prompt: 'What is the output of `int(True) + int(False)`?',
        correctAnswer: '1',
        explanation: '`int(True)` is 1 and `int(False)` is 0. 1 + 0 = 1.'
      },
      {
        id: 'm2-q15',
        moduleId: 'm2',
        topicId: 'logical-operators',
        topicTitle: 'Logical Operators',
        type: 'mcq',
        points: 1,
        prompt: 'In the expression `A and B or C`, which operation is evaluated first according to Python operator precedence?',
        options: ['and', 'or', 'Left to right strictly', 'Parentheses required'],
        correctAnswer: 0,
        explanation: '`and` has higher operator precedence than `or`.'
      }
    ]
  },

  // ==========================================
  // MODULE 3 ASSIGNMENT BANK (Conditionals)
  // ==========================================
  m3: {
    moduleId: 'm3',
    title: 'Module 3 Assignment: Conditional Statements',
    timeLimitMinutes: 30,
    sampleCount: 15,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm3-q01',
        moduleId: 'm3',
        topicId: 'if-statement',
        topicTitle: 'if',
        type: 'output',
        points: 2,
        prompt: 'What is printed by this code?',
        codeSnippet: `x = 0
if x:
    print("Yes")
else:
    print("No")`,
        correctAnswer: 'No',
        explanation: '0 evaluates to False in boolean context, so the else branch executes.'
      },
      {
        id: 'm3-q02',
        moduleId: 'm3',
        topicId: 'elif-statement',
        topicTitle: 'elif',
        type: 'output',
        points: 2,
        prompt: 'What will be printed when `score = 75`?',
        codeSnippet: `score = 75
if score >= 90:
    print("A")
elif score >= 75:
    print("B")
elif score >= 60:
    print("C")
else:
    print("F")`,
        correctAnswer: 'B',
        explanation: '`75 >= 75` is the first True branch, printing "B" and exiting the chain.'
      },
      {
        id: 'm3-q03',
        moduleId: 'm3',
        topicId: 'nested-conditionals',
        topicTitle: 'Nested Conditionals',
        type: 'output',
        points: 2,
        prompt: 'What is printed by this nested conditional code?',
        codeSnippet: `age = 20
has_id = False
if age >= 18:
    if has_id:
        print("Admitted")
    else:
        print("ID Required")
else:
    print("Underage")`,
        correctAnswer: 'ID Required',
        explanation: '`age >= 18` is True, but inner `has_id` is False, printing "ID Required".'
      },
      {
        id: 'm3-q04',
        moduleId: 'm3',
        topicId: 'nested-conditionals',
        topicTitle: 'Nested Conditionals',
        type: 'debugging',
        points: 3,
        prompt: 'Fix the indentation bug in this nested conditional code so that "Access Granted" prints only when both authenticated and authorized.',
        starterCode: `auth = True
role = "Admin"
if auth:
if role == "Admin":
print("Access Granted")`,
        solutionCode: `auth = True
role = "Admin"
if auth:
    if role == "Admin":
        print("Access Granted")`,
        testCases: [
          { input: '', expectedOutput: 'Access Granted', description: 'Nested indentation fix' }
        ],
        explanation: 'Python requires indented blocks (4 spaces) for each nested statement body.'
      },
      {
        id: 'm3-q05',
        moduleId: 'm3',
        topicId: 'elif-statement',
        topicTitle: 'elif',
        type: 'code-writing',
        points: 5,
        prompt: 'Build a student grading program. Read integer `marks` (0 to 100). Print: "Distinction" if >= 75, "First Class" if >= 60, "Pass" if >= 40, and "Fail" if < 40.',
        starterCode: `marks = int(input())
# Write your grading if-elif-else logic:
`,
        solutionCode: `marks = int(input())
if marks >= 75:
    print("Distinction")
elif marks >= 60:
    print("First Class")
elif marks >= 40:
    print("Pass")
else:
    print("Fail")`,
        testCases: [
          { input: '82', expectedOutput: 'Distinction' },
          { input: '75', expectedOutput: 'Distinction' },
          { input: '60', expectedOutput: 'First Class' },
          { input: '40', expectedOutput: 'Pass' },
          { input: '39', expectedOutput: 'Fail' }
        ],
        explanation: 'Check boundaries in descending order: >= 75, >= 60, >= 40, else Fail.'
      },
      {
        id: 'm3-q06',
        moduleId: 'm3',
        topicId: 'nested-conditionals',
        topicTitle: 'Nested Conditionals',
        type: 'scenario',
        points: 5,
        prompt: 'Scenario: ATM Withdrawal. Accept two inputs: `account_balance` (int) and `withdraw_amount` (int). If withdraw_amount is not a multiple of 100, print "Invalid Denomination". Otherwise, if withdraw_amount > account_balance, print "Insufficient Funds". Otherwise, print "Success: Remaining Balance: <balance - withdraw_amount>".',
        starterCode: `balance = int(input())
withdraw = int(input())
# Write your ATM validation logic:
`,
        solutionCode: `balance = int(input())
withdraw = int(input())
if withdraw % 100 != 0:
    print("Invalid Denomination")
elif withdraw > balance:
    print("Insufficient Funds")
else:
    print(f"Success: Remaining Balance: {balance - withdraw}")`,
        testCases: [
          { input: '5000\n1500', expectedOutput: 'Success: Remaining Balance: 3500' },
          { input: '2000\n2500', expectedOutput: 'Insufficient Funds' },
          { input: '5000\n1250', expectedOutput: 'Invalid Denomination' }
        ],
        explanation: 'First check multiple of 100 via `% 100 != 0`, then check balance threshold.'
      },
      {
        id: 'm3-q07',
        moduleId: 'm3',
        topicId: 'if-statement',
        topicTitle: 'if',
        type: 'output',
        prompt: 'What does this code snippet print?',
        codeSnippet: `val = 10
if val > 5:
    res = "A"
if val > 8:
    res = "B"
print(res)`,
        correctAnswer: 'B',
        explanation: 'Because these are two independent `if` statements (not `elif`), both execute, setting `res` to "B".'
      },
      {
        id: 'm3-q08',
        moduleId: 'm3',
        topicId: 'elif-statement',
        topicTitle: 'elif',
        type: 'code-completion',
        points: 3,
        prompt: 'Complete the condition to test if a number `n` is positive, negative, or zero.',
        starterCode: `n = int(input())
if n > 0:
    print("Positive")
elif ___:
    print("Negative")
else:
    print("Zero")`,
        solutionCode: `n = int(input())
if n > 0:
    print("Positive")
elif n < 0:
    print("Negative")
else:
    print("Zero")`,
        testCases: [
          { input: '-5', expectedOutput: 'Negative' },
          { input: '0', expectedOutput: 'Zero' },
          { input: '12', expectedOutput: 'Positive' }
        ],
        explanation: 'Fill with `n < 0` for the negative branch.'
      },
      {
        id: 'm3-q09',
        moduleId: 'm3',
        topicId: 'else-statement',
        topicTitle: 'else',
        type: 'mcq',
        points: 1,
        prompt: 'Is an `else` block mandatory in an if-elif statement in Python?',
        options: ['No, else is completely optional', 'Yes, every if must have an else', 'Only if there are more than 2 elifs', 'Yes in Python 3'],
        correctAnswer: 0,
        explanation: 'The `else` clause is optional.'
      },
      {
        id: 'm3-q10',
        moduleId: 'm3',
        topicId: 'nested-conditionals',
        topicTitle: 'Nested Conditionals',
        type: 'code-tracing',
        points: 2,
        prompt: 'What is the value of `tag` after execution?',
        codeSnippet: `x = 50
y = 100
tag = "None"
if x < 100:
    if y > 50:
        tag = "Alpha"
    tag = "Beta"`,
        correctAnswer: 'Beta',
        explanation: '`tag` was set to "Alpha", then immediately overwritten by `tag = "Beta"` at outer indentation.'
      },
      {
        id: 'm3-q11',
        moduleId: 'm3',
        topicId: 'if-statement',
        topicTitle: 'if',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which of the following will evaluate to True in an `if` condition? (Select all that apply)',
        options: ['if 1:', 'if -1:', 'if " ":', 'if None:', 'if "":'],
        correctAnswer: [0, 1, 2],
        explanation: 'Non-zero integers (`1`, `-1`) and non-empty string `" "` are truthy.'
      },
      {
        id: 'm3-q12',
        moduleId: 'm3',
        topicId: 'elif-statement',
        topicTitle: 'elif',
        type: 'mcq',
        points: 1,
        prompt: 'In an `if-elif-elif-else` chain, how many blocks can execute at most?',
        options: ['At most 1', 'All matching blocks', 'At least 2', 'Unlimited'],
        correctAnswer: 0,
        explanation: 'In an if-elif chain, execution halts after the FIRST matching branch is executed.'
      },
      {
        id: 'm3-q13',
        moduleId: 'm3',
        topicId: 'nested-conditionals',
        topicTitle: 'Nested Conditionals',
        type: 'code-writing',
        points: 5,
        prompt: 'Write a program to determine if a year is a Leap Year. A year is a leap year if it is divisible by 400, OR (divisible by 4 AND NOT divisible by 100). Print "Leap Year" or "Not Leap Year".',
        starterCode: `year = int(input())
# Write leap year logic:
`,
        solutionCode: `year = int(input())
if (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0):
    print("Leap Year")
else:
    print("Not Leap Year")`,
        testCases: [
          { input: '2024', expectedOutput: 'Leap Year' },
          { input: '1900', expectedOutput: 'Not Leap Year' },
          { input: '2000', expectedOutput: 'Leap Year' },
          { input: '2023', expectedOutput: 'Not Leap Year' }
        ],
        explanation: 'Use standard leap year rule: `(year % 400 == 0) or (year % 4 == 0 and year % 100 != 0)`.'
      },
      {
        id: 'm3-q14',
        moduleId: 'm3',
        topicId: 'else-statement',
        topicTitle: 'else',
        type: 'output',
        prompt: 'What does this ternary / conditional expression evaluate to?',
        codeSnippet: `age = 17
status = "Adult" if age >= 18 else "Minor"
print(status)`,
        correctAnswer: 'Minor',
        explanation: 'Because `17 >= 18` is False, the conditional expression evaluates to "Minor".'
      },
      {
        id: 'm3-q15',
        moduleId: 'm3',
        topicId: 'if-statement',
        topicTitle: 'if',
        type: 'short-answer',
        points: 2,
        prompt: 'Why is `if x == True:` considered bad practice (unpythonic) in Python?',
        options: [
          'Because `if x:` directly checks truthiness and is more readable, concise, and handles truthy objects properly.',
          'Because `True` is deprecated in Python 3.',
          'Because `==` cannot compare boolean variables.',
          'Because it causes a memory leak.'
        ],
        correctAnswer: 0,
        explanation: '`if x:` is idiomatic Python, checking truthiness cleanly without redundant equality tests.'
      }
    ]
  },

  // ==========================================
  // MODULE 4 ASSIGNMENT BANK (Loops)
  // ==========================================
  m4: {
    moduleId: 'm4',
    title: 'Module 4 Assignment: Loops',
    timeLimitMinutes: 35,
    sampleCount: 15,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm4-q01',
        moduleId: 'm4',
        topicId: 'range-function',
        topicTitle: 'range()',
        type: 'output',
        points: 2,
        prompt: 'What will this loop output?',
        codeSnippet: `for i in range(2, 9, 3):
    print(i, end=" ")`,
        correctAnswer: '2 5 8 ',
        explanation: 'Starts at 2, step is 3: 2, 5, 8. Next is 11 which exceeds stop 9.'
      },
      {
        id: 'm4-q02',
        moduleId: 'm4',
        topicId: 'break-statement',
        topicTitle: 'break',
        type: 'output',
        points: 2,
        prompt: 'What is printed by this loop with break and else?',
        codeSnippet: `for n in [2, 4, 6, 7, 8]:
    if n % 2 != 0:
        print(f"Odd: {n}")
        break
else:
    print("All even")`,
        correctAnswer: 'Odd: 7',
        explanation: 'At 7, `break` terminates the loop, so the loop\'s `else:` clause does NOT run.'
      },
      {
        id: 'm4-q03',
        moduleId: 'm4',
        topicId: 'continue-statement',
        topicTitle: 'continue',
        type: 'output',
        points: 2,
        prompt: 'What is the sum calculated by this code?',
        codeSnippet: `total = 0
for i in range(1, 6):
    if i == 3:
        continue
    total += i
print(total)`,
        correctAnswer: '12',
        explanation: '1 + 2 + 4 + 5 = 12 (3 is skipped by continue).'
      },
      {
        id: 'm4-q04',
        moduleId: 'm4',
        topicId: 'while-loop',
        topicTitle: 'while loop',
        type: 'code-tracing',
        points: 2,
        prompt: 'How many times does this while loop execute?',
        codeSnippet: `count = 1
while count < 10:
    count *= 2`,
        correctAnswer: '4',
        explanation: 'Iterations: 1) count=2; 2) count=4; 3) count=8; 4) count=16 (exits). Total 4 executions.'
      },
      {
        id: 'm4-q05',
        moduleId: 'm4',
        topicId: 'while-loop',
        topicTitle: 'while loop',
        type: 'debugging',
        points: 3,
        prompt: 'Fix the infinite loop bug in this countdown program.',
        starterCode: `n = 5
while n > 0:
    print(n, end=" ")
# Fix missing decrement`,
        solutionCode: `n = 5
while n > 0:
    print(n, end=" ")
    n -= 1`,
        testCases: [
          { input: '', expectedOutput: '5 4 3 2 1 ', description: 'Countdown from 5' }
        ],
        explanation: 'Add `n -= 1` inside the loop so the condition `n > 0` eventually becomes False.'
      },
      {
        id: 'm4-q06',
        moduleId: 'm4',
        topicId: 'for-loop',
        topicTitle: 'for loop',
        type: 'code-writing',
        points: 5,
        prompt: 'Write a program that takes an integer `n` from input and computes the factorial of `n` (n!). E.g., 5! = 5 * 4 * 3 * 2 * 1 = 120. (0! = 1).',
        starterCode: `n = int(input())
# Compute factorial:
`,
        solutionCode: `n = int(input())
fact = 1
for i in range(1, n + 1):
    fact *= i
print(fact)`,
        testCases: [
          { input: '5', expectedOutput: '120' },
          { input: '0', expectedOutput: '1' },
          { input: '6', expectedOutput: '720' }
        ],
        explanation: 'Accumulate product in a for loop from 1 through `n + 1`.'
      },
      {
        id: 'm4-q07',
        moduleId: 'm4',
        topicId: 'for-loop',
        topicTitle: 'for loop',
        type: 'scenario',
        points: 5,
        prompt: 'Scenario: Pattern Printing. Accept integer `rows` from input and print a right-angled triangle pattern of asterisks with `rows` height. Example for rows=3:\n*\n**\n***',
        starterCode: `rows = int(input())
# Print triangle pattern:
`,
        solutionCode: `rows = int(input())
for i in range(1, rows + 1):
    print("*" * i)`,
        testCases: [
          { input: '3', expectedOutput: '*\n**\n***' },
          { input: '4', expectedOutput: '*\n**\n***\n****' }
        ],
        explanation: 'In each iteration `i`, print `"*" * i`.'
      },
      {
        id: 'm4-q08',
        moduleId: 'm4',
        topicId: 'range-function',
        topicTitle: 'range()',
        type: 'output',
        prompt: 'What is `list(range(5, 0, -2))`?',
        correctAnswer: '[5, 3, 1]',
        explanation: 'Starts at 5, decrements by 2: 5, 3, 1 (stops before 0).'
      },
      {
        id: 'm4-q09',
        moduleId: 'm4',
        topicId: 'for-loop',
        topicTitle: 'for loop',
        type: 'code-completion',
        points: 3,
        prompt: 'Fill in the blank to print each item along with its 0-based index using `enumerate()`.',
        starterCode: `items = ["A", "B", "C"]
for index, item in ___(items):
    print(f"{index}:{item}")`,
        solutionCode: `items = ["A", "B", "C"]
for index, item in enumerate(items):
    print(f"{index}:{item}")`,
        testCases: [
          { input: '', expectedOutput: '0:A\n1:B\n2:C', description: 'Enumerate iteration' }
        ],
        explanation: '`enumerate()` yields `(index, item)` pairs.'
      },
      {
        id: 'm4-q10',
        moduleId: 'm4',
        topicId: 'break-statement',
        topicTitle: 'break',
        type: 'mcq',
        points: 1,
        prompt: 'When does the `else` block attached to a `for` or `while` loop execute?',
        options: [
          'When the loop completes normally without encountering a break',
          'Only when the loop encounters a break',
          'Every time the loop finishes an iteration',
          'Never'
        ],
        correctAnswer: 0,
        explanation: 'A loop\'s `else` clause runs if the loop finished iterating without hitting a `break`.'
      },
      {
        id: 'm4-q11',
        moduleId: 'm4',
        topicId: 'while-loop',
        topicTitle: 'while loop',
        type: 'output',
        prompt: 'What is printed by this while loop?',
        codeSnippet: `x = 3
while x:
    print(x, end="")
    x -= 1`,
        correctAnswer: '321',
        explanation: '3, 2, 1 print. When x becomes 0, `while 0` evaluates to False and halts.'
      },
      {
        id: 'm4-q12',
        moduleId: 'm4',
        topicId: 'for-loop',
        topicTitle: 'for loop',
        type: 'code-writing',
        points: 5,
        prompt: 'Write a program to find the sum of all digits of an input integer `num` (e.g. 1234 -> 1+2+3+4 = 10).',
        starterCode: `num_str = input()
# Calculate sum of digits:
`,
        solutionCode: `num_str = input()
total = 0
for char in num_str:
    if char.isdigit():
        total += int(char)
print(total)`,
        testCases: [
          { input: '1234', expectedOutput: '10' },
          { input: '905', expectedOutput: '14' }
        ],
        explanation: 'Iterate over characters in string, cast each to int, and accumulate.'
      },
      {
        id: 'm4-q13',
        moduleId: 'm4',
        topicId: 'continue-statement',
        topicTitle: 'continue',
        type: 'mcq',
        points: 1,
        prompt: 'What happens when `continue` is reached inside an inner loop of a nested loop system?',
        options: [
          'Only the current iteration of the inner loop is skipped',
          'Both inner and outer loops skip iteration',
          'The outer loop terminates',
          'All loops are restarted'
        ],
        correctAnswer: 0,
        explanation: '`continue` affects only the immediate inner loop containing it.'
      },
      {
        id: 'm4-q14',
        moduleId: 'm4',
        topicId: 'range-function',
        topicTitle: 'range()',
        type: 'output',
        prompt: 'What is `len(range(10, 100, 10))`?',
        correctAnswer: '9',
        explanation: 'Values: 10, 20, 30, 40, 50, 60, 70, 80, 90 (total 9 numbers).'
      },
      {
        id: 'm4-q15',
        moduleId: 'm4',
        topicId: 'for-loop',
        topicTitle: 'for loop',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which of the following objects can be directly iterated over in a Python for-loop? (Select all that apply)',
        options: ['String ("Hello")', 'List ([1, 2, 3])', 'range(5)', 'Integer number (100)'],
        correctAnswer: [0, 1, 2],
        explanation: 'Strings, lists, and ranges are iterables. Integers are not iterable.'
      }
    ]
  },

  // ==========================================
  // MODULE 5 ASSIGNMENT BANK (Strings)
  // ==========================================
  m5: {
    moduleId: 'm5',
    title: 'Module 5 Assignment: Strings',
    timeLimitMinutes: 30,
    sampleCount: 15,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm5-q01',
        moduleId: 'm5',
        topicId: 'string-indexing',
        topicTitle: 'String Indexing',
        type: 'output',
        points: 2,
        prompt: 'What is the output of `print("LevelUpDev"[-4])`?',
        correctAnswer: 'p',
        explanation: 'Negative indexing from right: v(-1), e(-2), D(-3), p(-4).'
      },
      {
        id: 'm5-q02',
        moduleId: 'm5',
        topicId: 'string-slicing',
        topicTitle: 'String Slicing',
        type: 'output',
        points: 2,
        prompt: 'What does `"ENGINEERING"[2:8:2]` evaluate to?',
        correctAnswer: 'GIN',
        explanation: 'Indices: 2 (\'G\'), 4 (\'I\'), 6 (\'E\') -> G I E or index 2=\'G\', 4=\'I\', 6=\'E\'.'
      },
      {
        id: 'm5-q03',
        moduleId: 'm5',
        topicId: 'string-methods',
        topicTitle: 'String Methods',
        type: 'output',
        points: 2,
        prompt: 'What does `"  swamy@dev.com  ".strip().upper()` output?',
        correctAnswer: 'SWAMY@DEV.COM',
        explanation: '`strip()` trims surrounding spaces, and `upper()` converts to uppercase.'
      },
      {
        id: 'm5-q04',
        moduleId: 'm5',
        topicId: 'f-strings',
        topicTitle: 'f-strings',
        type: 'output',
        points: 2,
        prompt: 'What is output by `val = 14.5678; print(f"{val:.2f}")`?',
        correctAnswer: '14.57',
        explanation: '`:.2f` formats to 2 decimal places with standard rounding (14.57).'
      },
      {
        id: 'm5-q05',
        moduleId: 'm5',
        topicId: 'string-methods',
        topicTitle: 'String Methods',
        type: 'code-tracing',
        points: 2,
        prompt: 'What is printed by this string replace chain?',
        codeSnippet: `s = "banana"
s = s.replace("a", "o")
print(s.count("o"))`,
        correctAnswer: '3',
        explanation: 'All 3 "a"s are replaced by "o" to make "bonono", so count of "o" is 3.'
      },
      {
        id: 'm5-q06',
        moduleId: 'm5',
        topicId: 'string-indexing',
        topicTitle: 'String Indexing',
        type: 'debugging',
        points: 3,
        prompt: 'Fix this code so it creates a modified string with the first letter replaced by "J" without throwing a TypeError.',
        starterCode: `word = "Python"
# Buggy line:
# word[0] = "J"
# Fix below:
`,
        solutionCode: `word = "Python"
word = "J" + word[1:]
print(word)`,
        testCases: [
          { input: '', expectedOutput: 'Jython', description: 'Replace first letter' }
        ],
        explanation: 'Because strings are immutable, slice `word[1:]` and concatenate `"J"`.'
      },
      {
        id: 'm5-q07',
        moduleId: 'm5',
        topicId: 'string-methods',
        topicTitle: 'String Methods',
        type: 'code-writing',
        points: 5,
        prompt: 'Given a string `s` from input, write a program that checks if `s` is a Palindrome (reads same forwards and backwards, ignoring case). Print `True` or `False`.',
        starterCode: `s = input()
# Palindrome check:
`,
        solutionCode: `s = input()
clean = s.lower()
print(clean == clean[::-1])`,
        testCases: [
          { input: 'Radar', expectedOutput: 'True' },
          { input: 'Python', expectedOutput: 'False' },
          { input: 'Madam', expectedOutput: 'True' }
        ],
        explanation: 'Convert to lowercase with `.lower()` and check `clean == clean[::-1]`.'
      },
      {
        id: 'm5-q08',
        moduleId: 'm5',
        topicId: 'string-slicing',
        topicTitle: 'String Slicing',
        type: 'scenario',
        points: 5,
        prompt: 'Scenario: Given an email address input like `alex.rivera@levelupdev.com`, extract and print two lines: 1) Username (`alex.rivera`), 2) Domain (`levelupdev.com`).',
        starterCode: `email = input()
# Extract username and domain:
`,
        solutionCode: `email = input()
parts = email.split("@")
print(f"Username: {parts[0]}")
print(f"Domain: {parts[1]}")`,
        testCases: [
          { input: 'swamy@levelupdev.com', expectedOutput: 'Username: swamy\nDomain: levelupdev.com' },
          { input: 'john.doe@company.org', expectedOutput: 'Username: john.doe\nDomain: company.org' }
        ],
        explanation: 'Use `email.split("@")` to extract username and domain parts.'
      },
      {
        id: 'm5-q09',
        moduleId: 'm5',
        topicId: 'string-methods',
        topicTitle: 'String Methods',
        type: 'output',
        prompt: 'What is `"-".join(["AI", "ML", "DL"])`?',
        correctAnswer: 'AI-ML-DL',
        explanation: '`join()` joins elements of an iterable with the specified delimiter.'
      },
      {
        id: 'm5-q10',
        moduleId: 'm5',
        topicId: 'f-strings',
        topicTitle: 'f-strings',
        type: 'code-completion',
        points: 3,
        prompt: 'Complete the f-string formatting to print the percentage with 1 decimal place (e.g. 85.0%).',
        starterCode: `ratio = 0.85
print(f"Accuracy: {ratio:___}")`,
        solutionCode: `ratio = 0.85
print(f"Accuracy: {ratio:.1%}")`,
        testCases: [
          { input: '', expectedOutput: 'Accuracy: 85.0%', description: 'Percentage format' }
        ],
        explanation: '`:.1%` multiplies by 100 and formats as percentage with 1 decimal digit.'
      },
      {
        id: 'm5-q11',
        moduleId: 'm5',
        topicId: 'string-indexing',
        topicTitle: 'String Indexing',
        type: 'mcq',
        points: 1,
        prompt: 'What exception is raised when executing `"abc"[10]`?',
        options: ['IndexError', 'ValueError', 'KeyError', 'TypeError'],
        correctAnswer: 0,
        explanation: 'Accessing an index beyond string bounds raises `IndexError: string index out of range`.'
      },
      {
        id: 'm5-q12',
        moduleId: 'm5',
        topicId: 'string-slicing',
        topicTitle: 'String Slicing',
        type: 'output',
        prompt: 'What is the output of `"LevelUp"[::-1]`?',
        correctAnswer: 'pUleveL',
        explanation: 'Reverses the string.'
      },
      {
        id: 'm5-q13',
        moduleId: 'm5',
        topicId: 'string-methods',
        topicTitle: 'String Methods',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which of the following string methods do NOT modify the original string in place? (Select all that apply)',
        options: ['upper()', 'lower()', 'strip()', 'replace()'],
        correctAnswer: [0, 1, 2, 3],
        explanation: 'Strings are immutable in Python; ALL string methods return new strings without modifying the original in place.'
      },
      {
        id: 'm5-q14',
        moduleId: 'm5',
        topicId: 'string-methods',
        topicTitle: 'String Methods',
        type: 'code-writing',
        points: 5,
        prompt: 'Write a program to count the number of vowels (A, E, I, O, U) in an input string, case-insensitive. Print the integer count.',
        starterCode: `text = input()
# Count vowels:
`,
        solutionCode: `text = input()
vowels = "aeiou"
count = sum(1 for c in text.lower() if c in vowels)
print(count)`,
        testCases: [
          { input: 'LevelUpDev', expectedOutput: '4' },
          { input: 'Python Programming', expectedOutput: '4' },
          { input: 'rhythm', expectedOutput: '0' }
        ],
        explanation: 'Iterate through lowercase characters and count occurrences matching vowel characters.'
      },
      {
        id: 'm5-q15',
        moduleId: 'm5',
        topicId: 'f-strings',
        topicTitle: 'f-strings',
        type: 'mcq',
        points: 1,
        prompt: 'Which Python version introduced formatted string literals (f-strings)?',
        options: ['Python 3.6', 'Python 3.0', 'Python 2.7', 'Python 3.10'],
        correctAnswer: 0,
        explanation: 'F-strings were introduced in PEP 498 with Python 3.6.'
      }
    ]
  },

  // ==========================================
  // MODULE 6 ASSIGNMENT BANK (Lists & Tuples)
  // ==========================================
  m6: {
    moduleId: 'm6',
    title: 'Module 6 Assignment: Lists & Tuples',
    timeLimitMinutes: 40,
    sampleCount: 16,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm6-q01',
        moduleId: 'm6',
        topicId: 'list-methods',
        topicTitle: 'List Methods',
        type: 'output',
        points: 2,
        prompt: 'What is the output of this list mutation code?',
        codeSnippet: `nums = [1, 2, 3]
nums.append([4, 5])
print(len(nums))`,
        correctAnswer: '4',
        explanation: '`append([4, 5])` adds the list as a single nested element, giving `[1, 2, 3, [4, 5]]` with length 4.'
      },
      {
        id: 'm6-q02',
        moduleId: 'm6',
        topicId: 'list-methods',
        topicTitle: 'List Methods',
        type: 'output',
        points: 2,
        prompt: 'What is printed after extend is called?',
        codeSnippet: `a = [1, 2]
a.extend([3, 4])
print(a)`,
        correctAnswer: '[1, 2, 3, 4]',
        explanation: '`extend()` unpacks the iterable and appends each element individually.'
      },
      {
        id: 'm6-q03',
        moduleId: 'm6',
        topicId: 'tuples',
        topicTitle: 'Tuples',
        type: 'output',
        points: 2,
        prompt: 'What does `type((42,))` evaluate to in Python?',
        options: ["<class 'tuple'>", "<class 'int'>", "<class 'list'>", "SyntaxError"],
        correctAnswer: 0,
        explanation: 'With a trailing comma, `(42,)` is recognized as a tuple.'
      },
      {
        id: 'm6-q04',
        moduleId: 'm6',
        topicId: 'tuple-immutability',
        topicTitle: 'Tuple Immutability',
        type: 'output',
        points: 2,
        prompt: 'What is printed by this code modifying a list inside a tuple?',
        codeSnippet: `t = (1, [10, 20])
t[1].append(30)
print(t[1])`,
        correctAnswer: '[10, 20, 30]',
        explanation: 'The list object inside the tuple is mutable, so `append()` succeeds.'
      },
      {
        id: 'm6-q05',
        moduleId: 'm6',
        topicId: 'list-indexing-slicing',
        topicTitle: 'List Indexing and Slicing',
        type: 'code-tracing',
        points: 2,
        prompt: 'What is the final state of list `a`?',
        codeSnippet: `a = [10, 20, 30, 40]
b = a
b[0] = 99
print(a[0])`,
        correctAnswer: '99',
        explanation: '`b = a` creates a reference to the same list in memory. Mutating `b` mutates `a`.'
      },
      {
        id: 'm6-q06',
        moduleId: 'm6',
        topicId: 'list-methods',
        topicTitle: 'List Methods',
        type: 'debugging',
        points: 3,
        prompt: 'Fix the bug: the function should return a sorted copy of list without destroying the original list.',
        starterCode: `def get_sorted(items):
    # Buggy in-place sort:
    return items.sort()`,
        solutionCode: `def get_sorted(items):
    return sorted(items)`,
        testCases: [
          { input: '', expectedOutput: '', description: 'Return sorted list copy' }
        ],
        explanation: '`items.sort()` sorts in-place and returns `None`. Use `sorted(items)` to return a new sorted list.'
      },
      {
        id: 'm6-q07',
        moduleId: 'm6',
        topicId: 'list-methods',
        topicTitle: 'List Methods',
        type: 'code-writing',
        points: 5,
        prompt: 'Given a space-separated string of numbers from input (e.g. "72 45 89 34 67 91 56"), parse them into a list of integers. Calculate and print 4 lines: 1) Highest mark, 2) Lowest mark, 3) Average (rounded to 2 decimals), 4) Count of passing marks (>= 40).',
        starterCode: `raw = input()
# Process marks list:
`,
        solutionCode: `raw = input()
marks = [int(x) for x in raw.split()]
print(f"Highest: {max(marks)}")
print(f"Lowest: {min(marks)}")
print(f"Average: {sum(marks)/len(marks):.2f}")
print(f"Passed: {sum(1 for m in marks if m >= 40)}")`,
        testCases: [
          { input: '72 45 89 34 67 91 56', expectedOutput: 'Highest: 91\nLowest: 34\nAverage: 64.86\nPassed: 6' },
          { input: '90 85 95', expectedOutput: 'Highest: 95\nLowest: 85\nAverage: 90.00\nPassed: 3' }
        ],
        explanation: 'Use list comprehension `[int(x) for x in raw.split()]` and calculate `max`, `min`, `sum/len`, and pass count.'
      },
      {
        id: 'm6-q08',
        moduleId: 'm6',
        topicId: 'list-creation',
        topicTitle: 'List Creation',
        type: 'code-writing',
        points: 5,
        prompt: 'Write a program to remove duplicate consecutive integers from a list input (e.g. [1, 2, 2, 3, 3, 3, 2, 2] -> [1, 2, 3, 2]). Print the resulting list.',
        starterCode: `nums = [int(x) for x in input().split()]
# Filter consecutive duplicates:
`,
        solutionCode: `nums = [int(x) for x in input().split()]
res = []
for n in nums:
    if not res or res[-1] != n:
        res.append(n)
print(res)`,
        testCases: [
          { input: '1 2 2 3 3 3 2 2', expectedOutput: '[1, 2, 3, 2]' },
          { input: '5 5 5 5', expectedOutput: '[5]' }
        ],
        explanation: 'Iterate through items and append only if the result list is empty or `res[-1] != n`.'
      },
      {
        id: 'm6-q09',
        moduleId: 'm6',
        topicId: 'tuples',
        topicTitle: 'Tuples',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which of the following are valid operations on a Python tuple? (Select all that apply)',
        options: ['Indexing: `t[0]`', 'Slicing: `t[1:3]`', 'Item assignment: `t[0] = 5`', 'Finding length: `len(t)`', 'Unpacking: `a, b = t`'],
        correctAnswer: [0, 1, 3, 4],
        explanation: 'Tuples support indexing, slicing, len, and unpacking. Reassigning `t[0] = 5` raises TypeError.'
      },
      {
        id: 'm6-q10',
        moduleId: 'm6',
        topicId: 'list-methods',
        topicTitle: 'List Methods',
        type: 'output',
        prompt: 'What will this list comprehension produce?',
        codeSnippet: `res = [x * x for x in range(5) if x % 2 != 0]
print(res)`,
        correctAnswer: '[1, 9]',
        explanation: 'Odd numbers in range(5) are 1 and 3. `1*1 = 1`, `3*3 = 9`.'
      },
      {
        id: 'm6-q11',
        moduleId: 'm6',
        topicId: 'tuple-immutability',
        topicTitle: 'Tuple Immutability',
        type: 'mcq',
        points: 1,
        prompt: 'Can a tuple `(1, [2, 3])` be used as a key in a Python dictionary?',
        options: ['No, because it contains an unhashable list', 'Yes, all tuples can be keys', 'Only if converted to string', 'Yes in Python 3.12'],
        correctAnswer: 0,
        explanation: 'A tuple is only hashable if ALL its elements are hashable. Mutable lists make the tuple unhashable.'
      },
      {
        id: 'm6-q12',
        moduleId: 'm6',
        topicId: 'list-indexing-slicing',
        topicTitle: 'List Indexing and Slicing',
        type: 'output',
        prompt: 'What does `[10, 20, 30, 40, 50][::-2]` evaluate to?',
        correctAnswer: '[50, 30, 10]',
        explanation: 'Starts from the end (50) and steps backwards by 2: 50, 30, 10.'
      },
      {
        id: 'm6-q13',
        moduleId: 'm6',
        topicId: 'list-methods',
        topicTitle: 'List Methods',
        type: 'code-completion',
        points: 3,
        prompt: 'Fill in the blank to remove and retrieve the second element (index 1) from list `items`.',
        starterCode: `items = ["A", "B", "C", "D"]
removed = items.___(1)
print(removed)`,
        solutionCode: `items = ["A", "B", "C", "D"]
removed = items.pop(1)
print(removed)`,
        testCases: [
          { input: '', expectedOutput: 'B', description: 'Pop index 1' }
        ],
        explanation: '`items.pop(1)` removes and returns the item at index 1.'
      },
      {
        id: 'm6-q14',
        moduleId: 'm6',
        topicId: 'list-creation',
        topicTitle: 'List Creation',
        type: 'scenario',
        points: 5,
        prompt: 'Scenario: Rotate List. Accept space-separated integers on line 1, and an integer `k` on line 2. Rotate the list to the right by `k` steps. Example: [1, 2, 3, 4, 5] with k=2 becomes [4, 5, 1, 2, 3]. Print the rotated list.',
        starterCode: `nums = [int(x) for x in input().split()]
k = int(input())
# Rotate list:
`,
        solutionCode: `nums = [int(x) for x in input().split()]
k = int(input())
if nums:
    k = k % len(nums)
    nums = nums[-k:] + nums[:-k] if k != 0 else nums
print(nums)`,
        testCases: [
          { input: '1 2 3 4 5\n2', expectedOutput: '[4, 5, 1, 2, 3]' },
          { input: '10 20 30\n1', expectedOutput: '[30, 10, 20]' }
        ],
        explanation: 'Compute `k % len` and slice `nums[-k:] + nums[:-k]`.'
      },
      {
        id: 'm6-q15',
        moduleId: 'm6',
        topicId: 'tuples',
        topicTitle: 'Tuples',
        type: 'output',
        prompt: 'What does `print((1, 2) + (3, 4))` output?',
        correctAnswer: '(1, 2, 3, 4)',
        explanation: 'The `+` operator concatenates two tuples into a new tuple.'
      },
      {
        id: 'm6-q16',
        moduleId: 'm6',
        topicId: 'list-methods',
        topicTitle: 'List Methods',
        type: 'mcq',
        points: 1,
        prompt: 'What is the time complexity of appending an item to the end of a Python list using `append()`?',
        options: ['O(1) amortized', 'O(n)', 'O(log n)', 'O(n^2)'],
        correctAnswer: 0,
        explanation: '`append()` runs in O(1) amortized time because Python lists are dynamic arrays with over-allocation.'
      }
    ]
  },

  // ==========================================
  // MODULE 7 ASSIGNMENT BANK (Dicts, Sets, Functions)
  // ==========================================
  m7: {
    moduleId: 'm7',
    title: 'Module 7 Assignment: Dictionaries, Sets & Intro to Functions',
    timeLimitMinutes: 45,
    sampleCount: 18,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm7-q01',
        moduleId: 'm7',
        topicId: 'dictionaries',
        topicTitle: 'Dictionaries',
        type: 'output',
        points: 2,
        prompt: 'What does `d = {"a": 1, "b": 2}; print(d.get("c", 99))` output?',
        correctAnswer: '99',
        explanation: '`.get("c", 99)` returns the fallback default 99 when "c" is not in the dictionary.'
      },
      {
        id: 'm7-q02',
        moduleId: 'm7',
        topicId: 'sets',
        topicTitle: 'Sets',
        type: 'output',
        points: 2,
        prompt: 'What is the output of this set operation?',
        codeSnippet: `a = {1, 2, 3}
b = {2, 3, 4}
print(a & b)`,
        correctAnswer: '{2, 3}',
        explanation: '`&` is the set intersection operator, extracting common elements {2, 3}.'
      },
      {
        id: 'm7-q03',
        moduleId: 'm7',
        topicId: 'defining-functions',
        topicTitle: 'Defining Functions',
        type: 'output',
        points: 2,
        prompt: 'What does this function call output?',
        codeSnippet: `def greet(name):
    return f"Hi, {name}!"

res = greet("Dev")
print(res)`,
        correctAnswer: 'Hi, Dev!',
        explanation: 'The function returns `"Hi, Dev!"` which is printed.'
      },
      {
        id: 'm7-q04',
        moduleId: 'm7',
        topicId: 'parameters-and-arguments',
        topicTitle: 'Parameters and Arguments',
        type: 'output',
        points: 2,
        prompt: 'What is printed by this function with default arguments?',
        codeSnippet: `def calc(x, y=5, z=2):
    return x * y + z

print(calc(3, z=4))`,
        correctAnswer: '19',
        explanation: '`x=3`, `y` uses default 5, and `z=4`. `3 * 5 + 4 = 19`.'
      },
      {
        id: 'm7-q05',
        moduleId: 'm7',
        topicId: 'return-values',
        topicTitle: 'Return Values',
        type: 'code-tracing',
        points: 2,
        prompt: 'What is the return value of `process([1, 2, 3, 4, 5])`?',
        codeSnippet: `def process(nums):
    for n in nums:
        if n % 2 == 0:
            return n
    return -1`,
        correctAnswer: '2',
        explanation: 'The function immediately returns the first even number 2 upon hitting `return n`.'
      },
      {
        id: 'm7-q06',
        moduleId: 'm7',
        topicId: 'dictionary-methods-traversal',
        topicTitle: 'Dictionary Methods and Traversal',
        type: 'code-writing',
        points: 5,
        prompt: 'Write a function `char_frequency(text)` that takes a string and returns a dictionary with character frequencies (ignoring spaces). E.g. "a b a" -> {"a": 2, "b": 1}.',
        starterCode: `def char_frequency(text):
    # Return dictionary of character frequencies:
    pass
`,
        solutionCode: `def char_frequency(text):
    freq = {}
    for c in text:
        if c != ' ':
            freq[c] = freq.get(c, 0) + 1
    return freq`,
        testCases: [
          { input: '', expectedOutput: '', description: 'Frequency counting function' }
        ],
        explanation: 'Use `freq[c] = freq.get(c, 0) + 1` for each non-space character.'
      },
      {
        id: 'm7-q07',
        moduleId: 'm7',
        topicId: 'set-operations',
        topicTitle: 'Set Operations',
        type: 'output',
        points: 2,
        prompt: 'What is the output of `{1, 2, 3} - {2, 4}`?',
        correctAnswer: '{1, 3}',
        explanation: 'Set difference removes items present in the second set from the first set.'
      },
      {
        id: 'm7-q08',
        moduleId: 'm7',
        topicId: 'defining-functions',
        topicTitle: 'Defining Functions',
        type: 'debugging',
        points: 3,
        prompt: 'Fix the bug: the function should calculate the average of a list of numbers. Handle empty lists by returning 0.',
        starterCode: `def calculate_average(nums):
    # Fix division by zero on empty list:
    return sum(nums) / len(nums)`,
        solutionCode: `def calculate_average(nums):
    if not nums:
        return 0
    return sum(nums) / len(nums)`,
        testCases: [
          { input: '', expectedOutput: '', description: 'Safe average function' }
        ],
        explanation: 'Check `if not nums: return 0` before dividing by `len(nums)`.'
      },
      {
        id: 'm7-q09',
        moduleId: 'm7',
        topicId: 'parameters-and-arguments',
        topicTitle: 'Parameters and Arguments',
        type: 'mcq',
        points: 1,
        prompt: 'Why is using a mutable default argument like `def add_item(item, target_list=[]):` dangerous in Python?',
        options: [
          'Because the list is created once at function definition time and mutated across all subsequent calls',
          'Because it causes a SyntaxError',
          'Because lists cannot be parameters',
          'Because it runs slowly'
        ],
        correctAnswer: 0,
        explanation: 'Default arguments in Python are evaluated once at definition time, sharing the same list object across calls.'
      },
      {
        id: 'm7-q10',
        moduleId: 'm7',
        topicId: 'return-values',
        topicTitle: 'Return Values',
        type: 'output',
        points: 2,
        prompt: 'What is the type of variable `res` in `def f(): return 1, 2, 3; res = f()`?',
        options: ["<class 'tuple'>", "<class 'list'>", "<class 'int'>", "<class 'set'>"],
        correctAnswer: 0,
        explanation: 'Comma-separated return values are packed into a tuple.'
      },
      {
        id: 'm7-q11',
        moduleId: 'm7',
        topicId: 'dictionaries',
        topicTitle: 'Dictionaries',
        type: 'scenario',
        points: 5,
        prompt: 'Scenario: Student Result System. Write a program that reads 3 student marks for "Math", "Physics", "CS" as integers, stores them in a dictionary, calculates the total and average, and prints: `Total: <total>, Average: <average:.2f>, Status: <PASS/FAIL>` (Pass if average >= 40).',
        starterCode: `m = int(input())
p = int(input())
c = int(input())
# Process student results:
`,
        solutionCode: `m = int(input())
p = int(input())
c = int(input())
marks = {"Math": m, "Physics": p, "CS": c}
total = sum(marks.values())
avg = total / len(marks)
status = "PASS" if avg >= 40 else "FAIL"
print(f"Total: {total}, Average: {avg:.2f}, Status: {status}")`,
        testCases: [
          { input: '80\n90\n85', expectedOutput: 'Total: 255, Average: 85.00, Status: PASS' },
          { input: '30\n35\n40', expectedOutput: 'Total: 105, Average: 35.00, Status: FAIL' }
        ],
        explanation: 'Store in dictionary, compute `sum(marks.values()) / len(marks)`, and print formatted result.'
      },
      {
        id: 'm7-q12',
        moduleId: 'm7',
        topicId: 'sets',
        topicTitle: 'Sets',
        type: 'code-writing',
        points: 5,
        prompt: 'Write a function `unique_words(sentence)` that takes a sentence string and returns a set containing all unique words in lowercase.',
        starterCode: `def unique_words(sentence):
    # Return set of lowercase words:
    pass
`,
        solutionCode: `def unique_words(sentence):
    return set(sentence.lower().split())`,
        testCases: [
          { input: '', expectedOutput: '', description: 'Unique words set function' }
        ],
        explanation: 'Split lowercase sentence into words and pass to `set()` constructor.'
      },
      {
        id: 'm7-q13',
        moduleId: 'm7',
        topicId: 'dictionary-methods-traversal',
        topicTitle: 'Dictionary Methods and Traversal',
        type: 'output',
        prompt: 'What does `print(list({"x": 10, "y": 20}.keys()))` output?',
        correctAnswer: "['x', 'y']",
        explanation: '`.keys()` returns a dict_keys view, which converts to a list of keys.'
      },
      {
        id: 'm7-q14',
        moduleId: 'm7',
        topicId: 'set-operations',
        topicTitle: 'Set Operations',
        type: 'output',
        prompt: 'What does `{1, 2} ^ {2, 3}` (symmetric difference) evaluate to?',
        correctAnswer: '{1, 3}',
        explanation: 'Symmetric difference `^` returns elements in either set but NOT in both.'
      },
      {
        id: 'm7-q15',
        moduleId: 'm7',
        topicId: 'defining-functions',
        topicTitle: 'Defining Functions',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which of the following are valid ways to define or call a Python function? (Select all that apply)',
        options: [
          'def my_func(): pass',
          'def add(a, b=0): return a + b',
          'add(b=10, a=5)',
          'def calc(a=1, b): pass'
        ],
        correctAnswer: [0, 1, 2],
        explanation: '`def calc(a=1, b):` is invalid because non-default parameter `b` cannot follow default parameter `a`.'
      },
      {
        id: 'm7-q16',
        moduleId: 'm7',
        topicId: 'parameters-and-arguments',
        topicTitle: 'Parameters and Arguments',
        type: 'output',
        prompt: 'What is the output of this keyword argument call?',
        codeSnippet: `def show(a, b, c):
    return f"{a}-{b}-{c}"

print(show(c=3, a=1, b=2))`,
        correctAnswer: '1-2-3',
        explanation: 'Keyword arguments match parameter names explicitly regardless of call order.'
      },
      {
        id: 'm7-q17',
        moduleId: 'm7',
        topicId: 'return-values',
        topicTitle: 'Return Values',
        type: 'code-completion',
        points: 3,
        prompt: 'Complete the function to return both the maximum and minimum numbers from a list as a tuple `(max, min)`.',
        starterCode: `def get_bounds(numbers):
    return ___(numbers), ___(numbers)`,
        solutionCode: `def get_bounds(numbers):
    return max(numbers), min(numbers)`,
        testCases: [
          { input: '', expectedOutput: '', description: 'Return max, min tuple' }
        ],
        explanation: 'Fill with `max` and `min` built-in functions.'
      },
      {
        id: 'm7-q18',
        moduleId: 'm7',
        topicId: 'dictionaries',
        topicTitle: 'Dictionaries',
        type: 'output',
        prompt: 'What is the length of `d` after running `d = {"a": 1}; d.update({"b": 2, "a": 3})`?',
        correctAnswer: '2',
        explanation: 'Key `"a"` is updated to 3, and `"b"` is added. Total 2 keys.'
      }
    ]
  }
};
