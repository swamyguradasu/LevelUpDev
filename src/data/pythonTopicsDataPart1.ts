export interface TopicPracticeItem {
  question: string;
  hint?: string;
  solution: string;
}

export interface CheckpointQuestion {
  id: string;
  type: 'mcq' | 'output' | 'debugging' | 'short-code';
  prompt: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

export interface PythonTopicDetail {
  id: string;
  moduleId: string;
  topicNumber: number;
  title: string;
  shortSummary: string;
  whatIsIt: string;
  whyDoWeNeedIt: string;
  syntax: string;
  basicExample: {
    code: string;
    output: string;
  };
  detailedExample: {
    code: string;
    output: string;
  };
  codeExplanation: string[];
  commonMistakes: Array<{
    mistake: string;
    whyItIsWrong: string;
    correction: string;
  }>;
  importantRules: string[];
  interviewPerspective: string;
  practiceQuestions: TopicPracticeItem[];
  checkpoint: CheckpointQuestion[];
}

export const PYTHON_TOPICS_PART1: Record<string, PythonTopicDetail> = {
  // ==========================================
  // MODULE 1: Python Basics
  // ==========================================
  'installing-python-ide': {
    id: 'installing-python-ide',
    moduleId: 'm1',
    topicNumber: 1,
    title: 'Installing Python and an IDE',
    shortSummary: 'Setting up Python runtime interpreter and a professional code editor like VS Code.',
    whatIsIt: 'Python is an interpreted, high-level programming language. An IDE (Integrated Development Environment) like VS Code or PyCharm is a software application providing code editing, terminal execution, and debugging tools in a single interface.',
    whyDoWeNeedIt: 'Computers cannot run Python code without the Python interpreter installed. An IDE gives you syntax highlighting, error detection, autocompletion, and an integrated terminal to run scripts efficiently.',
    syntax: `# Check python installation in your terminal:
# python --version
# or
# python3 --version

# Running a script:
# python filename.py`,
    basicExample: {
      code: `print("Python environment configured successfully!")`,
      output: `Python environment configured successfully!`
    },
    detailedExample: {
      code: `import sys
import platform

print("Python Version:", platform.python_version())
print("Operating System:", platform.system())
print("Executable Path:", sys.executable)`,
      output: `Python Version: 3.11.4
Operating System: Windows
Executable Path: C:\\Python311\\python.exe`
    },
    codeExplanation: [
      'Line 1-2: Imports built-in system modules sys and platform.',
      'Line 4: platform.python_version() checks the active Python version.',
      'Line 6: sys.executable displays the exact filesystem path where Python binary is located.'
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting to check "Add Python to PATH" during Windows installation.',
        whyItIsWrong: 'Terminal commands like `python` or `pip` will report "command not found".',
        correction: 'Rerun Python installer, select "Modify", and check "Add Python to environment variables (PATH)".'
      },
      {
        mistake: 'Saving Python files without the `.py` extension.',
        whyItIsWrong: 'The IDE and terminal will treat it as a plain text file without syntax recognition.',
        correction: 'Always save Python scripts with `.py` extension (e.g., `main.py`).'
      }
    ],
    importantRules: [
      'Python files must have the `.py` extension.',
      'Python is case-sensitive: `python` command and syntax must use exact casing.',
      'Always install Python from python.org or official package managers.'
    ],
    interviewPerspective: 'In technical screens and machine coding rounds, interviewers check your speed with terminal commands, virtual environments (venv), and package installations (pip).',
    practiceQuestions: [
      {
        question: 'Which terminal command checks the currently installed Python version?',
        hint: 'Use the --version flag.',
        solution: 'python --version or python3 --version'
      },
      {
        question: 'What is the purpose of adding Python to the system PATH variable?',
        solution: 'It allows you to run Python and pip commands from any directory in your terminal.'
      }
    ],
    checkpoint: [
      {
        id: 'm1-t1-q1',
        type: 'mcq',
        prompt: 'What file extension is used for standard Python script files?',
        options: ['.pyt', '.py', '.python', '.exe'],
        correctAnswer: 1,
        explanation: 'All standard Python source code files use the .py extension.'
      },
      {
        id: 'm1-t1-q2',
        type: 'output',
        prompt: 'What command in the terminal prints the version of Python installed?',
        options: ['python --version', 'python -v', 'python.get_version()', 'version(python)'],
        correctAnswer: 0,
        explanation: '`python --version` (or `python3 --version`) outputs the installed version.'
      },
      {
        id: 'm1-t1-q3',
        type: 'mcq',
        prompt: 'Which of the following is NOT an IDE or code editor commonly used for Python?',
        options: ['Visual Studio Code', 'PyCharm', 'MS Word', 'Jupyter Notebook'],
        correctAnswer: 2,
        explanation: 'MS Word is a word processor, not a code editor or IDE.'
      }
    ]
  },

  'variables-and-data-types': {
    id: 'variables-and-data-types',
    moduleId: 'm1',
    topicNumber: 2,
    title: 'Variables and Data Types',
    shortSummary: 'Declaring variables, dynamically typed assignment, and fundamental data types: int, float, str, and bool.',
    whatIsIt: 'A variable is a named storage location in computer memory that holds a data value. Python has four core primitive data types: integers (int), floating-point numbers (float), text (str), and booleans (bool).',
    whyDoWeNeedIt: 'Programs need to store, manipulate, and track values such as user scores, prices, names, and state flags.',
    syntax: `variable_name = value
# Python dynamically infers the data type automatically`,
    basicExample: {
      code: `age = 21          # int
price = 99.50     # float
name = "Swamy"    # str
is_active = True  # bool

print(name, age, price, is_active)`,
      output: `Swamy 21 99.5 True`
    },
    detailedExample: {
      code: `item_name = "Mechanical Keyboard"
stock = 15
unit_price = 1299.75
in_stock = stock > 0

print("Item:", item_name, type(item_name))
print("Stock:", stock, type(stock))
print("Price:", unit_price, type(unit_price))
print("Available:", in_stock, type(in_stock))`,
      output: `Item: Mechanical Keyboard <class 'str'>
Stock: 15 <class 'int'>
Price: 1299.75 <class 'float'>
Available: True <class 'bool'>`
    },
    codeExplanation: [
      'Line 1: Creates a variable item_name and assigns a string literal.',
      'Line 2-3: Assigns integer 15 and floating-point number 1299.75.',
      'Line 4: Evaluates boolean condition stock > 0 which yields True.',
      'Line 6-9: The type() function inspects the internal class of any variable.'
    ],
    commonMistakes: [
      {
        mistake: 'Starting variable names with digits: 2user = "Dev".',
        whyItIsWrong: 'Python syntax forbids starting identifier names with numbers.',
        correction: 'Use letters or underscores first: user_2 = "Dev" or user2 = "Dev".'
      },
      {
        mistake: 'Using reserved keywords as variable names: class = "A".',
        whyItIsWrong: 'class, for, if, def, return etc., are reserved Python keywords.',
        correction: 'Use descriptive names like class_name = "A".'
      }
    ],
    importantRules: [
      'Variable names can contain letters, numbers, and underscores (_), but cannot start with a digit.',
      'Python is case-sensitive: age, Age, and AGE are 3 distinct variables.',
      'Python uses dynamic typing: you do not need to specify type declarations like int x.'
    ],
    interviewPerspective: 'Interviewers often test understanding of Python memory references (pass-by-object-reference) and dynamic typing behavior.',
    practiceQuestions: [
      {
        question: 'Identify which variable name is invalid: _total, my-var, score_1, PRICE.',
        hint: 'Hyphens are subtraction operators in Python.',
        solution: 'my-var is invalid because hyphens are not allowed in identifiers.'
      },
      {
        question: 'What is the return type of type(3.0)?',
        solution: `<class 'float'>`
      }
    ],
    checkpoint: [
      {
        id: 'm1-t2-q1',
        type: 'mcq',
        prompt: 'Which of the following is an invalid variable name in Python?',
        options: ['_count', 'user_age', '2nd_score', 'totalAmount'],
        correctAnswer: 2,
        explanation: '`2nd_score` is invalid because variable names cannot begin with a number.'
      },
      {
        id: 'm1-t2-q2',
        type: 'output',
        prompt: 'What will print(type(True)) output?',
        options: ["<class 'bool'>", "<class 'str'>", "<class 'int'>", "<class 'boolean'>"],
        correctAnswer: 0,
        explanation: 'Boolean values `True` and `False` belong to `<class \'bool\'>`.'
      },
      {
        id: 'm1-t2-q3',
        type: 'mcq',
        prompt: 'Which data type represents numbers with decimal points in Python?',
        options: ['int', 'float', 'double', 'decimal_type'],
        correctAnswer: 1,
        explanation: 'Python uses `float` for floating-point real numbers.'
      }
    ]
  },

  'print-and-input': {
    id: 'print-and-input',
    moduleId: 'm1',
    topicNumber: 3,
    title: 'print() and input()',
    shortSummary: 'Displaying output to console and capturing interactive keyboard input from users.',
    whatIsIt: 'print() outputs text and values to the console screen. input() prompts the user to enter text via keyboard and always returns the input as a string (str).',
    whyDoWeNeedIt: 'Input and output (I/O) are the fundamental communication bridge between software and human users or external systems.',
    syntax: `# Output:
print(value1, value2, ..., sep=' ', end='\\n')

# Input:
variable = input("Prompt message: ")`,
    basicExample: {
      code: `user_name = "Alex"
print("Hello,", user_name)
print("Welcome to LevelUpDev!", end=" 🚀\\n")`,
      output: `Hello, Alex
Welcome to LevelUpDev! 🚀`
    },
    detailedExample: {
      code: `# Simulating input value "4"
item_count = 4
price_per_item = 250
total = item_count * price_per_item

print("Quantity:", item_count, "units", sep=" ")
print("Subtotal:", total, "INR", sep=" -> ")`,
      output: `Quantity: 4 units
Subtotal -> 1000 -> INR`
    },
    codeExplanation: [
      'Line 2: The sep parameter controls the separator character placed between multiple print arguments (default is a space).',
      'Line 3: The end parameter controls what is printed at the end of the line (default is newline \\n).',
      'Crucial concept: input() always produces a str. If you need mathematical numbers, you must cast with int() or float().'
    ],
    commonMistakes: [
      {
        mistake: 'Adding input strings without casting: num = input("Enter: "); result = num + 10.',
        whyItIsWrong: 'Produces TypeError: can only concatenate str (not "int") to str.',
        correction: 'Wrap input() with int(): num = int(input("Enter: ")).'
      },
      {
        mistake: 'Assuming print() returns a value: x = print("Hi").',
        whyItIsWrong: 'print() prints to console and returns None. x becomes None.',
        correction: 'Store values in variables directly before printing.'
      }
    ],
    importantRules: [
      'input() always returns a string (str), never an integer or float automatically.',
      'print() takes optional sep (separator) and end (line ending) keyword arguments.',
      'Multiple arguments in print() are separated by spaces by default.'
    ],
    interviewPerspective: 'In competitive programming, knowing sys.stdin.readline and fast I/O is useful, but mastering print(sep=..., end=...) formatting is tested in beginner coding interviews.',
    practiceQuestions: [
      {
        question: 'What is the default value of the end argument in print()?',
        solution: 'The newline character \\n.'
      },
      {
        question: 'If a user types 25 when prompted by x = input(), what is type(x)?',
        solution: `<class 'str'>`
      }
    ],
    checkpoint: [
      {
        id: 'm1-t3-q1',
        type: 'mcq',
        prompt: 'What data type does the built-in input() function always return?',
        options: ['int', 'str', 'float', 'Any'],
        correctAnswer: 1,
        explanation: '`input()` always returns user input as a string (`str`).'
      },
      {
        id: 'm1-t3-q2',
        type: 'output',
        prompt: 'What is the output of print("A", "B", sep="-", end="!")?',
        options: ['A-B!', 'A B!', 'A-B', 'A\\nB!'],
        correctAnswer: 0,
        explanation: '`sep="-"` joins items with a hyphen, and `end="!"` appends an exclamation mark.'
      },
      {
        id: 'm1-t3-q3',
        type: 'mcq',
        prompt: 'How do you convert user input into an integer for arithmetic calculation?',
        options: ['to_int(input())', 'int(input())', 'input().toInt()', 'parse(input())'],
        correctAnswer: 1,
        explanation: '`int(input())` casts the input string to an integer.'
      }
    ]
  },

  // ==========================================
  // MODULE 2: Operators & Type Conversion
  // ==========================================
  'arithmetic-operators': {
    id: 'arithmetic-operators',
    moduleId: 'm2',
    topicNumber: 1,
    title: 'Arithmetic Operators',
    shortSummary: 'Addition, subtraction, multiplication, true division, floor division, modulus, and exponentiation.',
    whatIsIt: 'Arithmetic operators perform standard mathematical calculations on numerical values (int and float).',
    whyDoWeNeedIt: 'Calculations are central to almost every algorithm: computing averages, calculating discounts, scaling coordinate points, and modular hashing.',
    syntax: `+   # Addition
-   # Subtraction
*   # Multiplication
/   # True division (always yields float)
//  # Floor division (rounds down to integer)
%   # Modulus (remainder)
**  # Exponentiation (power)`,
    basicExample: {
      code: `a = 15
b = 4

print("Add:", a + b)
print("True Div (/):", a / b)
print("Floor Div (//):", a // b)
print("Modulus (%):", a % b)
print("Power (**):", b ** 3)`,
      output: `Add: 19
True Div (/): 3.75
Floor Div (//): 3
Modulus (%): 3
Power (**): 64`
    },
    detailedExample: {
      code: `# Time conversion: 3820 seconds into hours, minutes, seconds
total_seconds = 3820

hours = total_seconds // 3600
remaining_seconds = total_seconds % 3600
minutes = remaining_seconds // 60
seconds = remaining_seconds % 60

print(f"{hours}h {minutes}m {seconds}s")`,
      output: `1h 3m 40s`
    },
    codeExplanation: [
      'Line 4: total_seconds // 3600 computes whole hours by dropping decimals.',
      'Line 5: total_seconds % 3600 extracts remaining leftover seconds.',
      'Line 6: remaining_seconds // 60 calculates whole minutes from leftovers.'
    ],
    commonMistakes: [
      {
        mistake: 'Expecting / to return an integer when dividing evenly: 4 / 2.',
        whyItIsWrong: 'The / operator in Python 3 ALWAYS returns a float (2.0).',
        correction: 'Use // if you strictly need an integer: 4 // 2 returns 2.'
      },
      {
        mistake: 'Using ^ for exponentiation: 2 ^ 3.',
        whyItIsWrong: '^ is the Bitwise XOR operator in Python, not power.',
        correction: 'Use ** for powers: 2 ** 3 evaluates to 8.'
      }
    ],
    importantRules: [
      '/ always returns a float.',
      '// rounds down towards negative infinity (e.g., -7 // 2 is -4).',
      '** has higher operator precedence than *, /, +, -.'
    ],
    interviewPerspective: 'Problems often test understanding of modulus arithmetic with negative numbers and overflow-free exponentiation.',
    practiceQuestions: [
      {
        question: 'What is the result of 17 % 5?',
        solution: '2'
      },
      {
        question: 'What is the output and type of 10 / 2?',
        solution: '5.0 with type float.'
      }
    ],
    checkpoint: [
      {
        id: 'm2-t1-q1',
        type: 'output',
        prompt: 'What is the value of 20 // 6 in Python?',
        options: ['3', '3.33', '4', '2'],
        correctAnswer: 0,
        explanation: 'Floor division `//` discards decimal parts, returning `3`.'
      },
      {
        id: 'm2-t1-q2',
        type: 'output',
        prompt: 'What is the value of 2 ** 4 in Python?',
        options: ['8', '16', '6', '64'],
        correctAnswer: 1,
        explanation: '`2 ** 4` is 2 raised to power 4 = 16.'
      },
      {
        id: 'm2-t1-q3',
        type: 'mcq',
        prompt: 'Which operator returns the remainder of a division?',
        options: ['/', '//', '%', 'rem'],
        correctAnswer: 2,
        explanation: 'The `%` (modulus) operator computes the remainder.'
      }
    ]
  },

  'comparison-operators': {
    id: 'comparison-operators',
    moduleId: 'm2',
    topicNumber: 2,
    title: 'Comparison Operators',
    shortSummary: 'Evaluating relational conditions: ==, !=, >, <, >=, <=, and chained comparisons.',
    whatIsIt: 'Comparison operators compare two operands and always evaluate to a boolean value: True or False.',
    whyDoWeNeedIt: 'Decision-making algorithms in programs rely on comparing numbers, checking equality, and verifying score thresholds.',
    syntax: `==   # Equal to
!=   # Not equal to
>    # Greater than
<    # Less than
>=   # Greater than or equal to
<=   # Less than or equal to

# Chained comparison:
a < b < c`,
    basicExample: {
      code: `x = 10
y = 20

print("x == y:", x == y)
print("x != y:", x != y)
print("x < y:", x < y)
print("Chained (5 < x < 15):", 5 < x < 15)`,
      output: `x == y: False
x != y: True
x < y: True
Chained (5 < x < 15): True`
    },
    detailedExample: {
      code: `score = 85
passing_score = 40
distinction_score = 75

is_passed = score >= passing_score
has_distinction = score >= distinction_score
is_perfect = score == 100

print(f"Passed: {is_passed}, Distinction: {has_distinction}, Perfect: {is_perfect}")`,
      output: `Passed: True, Distinction: True, Perfect: False`
    },
    codeExplanation: [
      'Line 5: score >= passing_score checks if score meets or exceeds 40 (True).',
      'Line 7: score == 100 checks for strict equality (False).'
    ],
    commonMistakes: [
      {
        mistake: 'Using single equal = for comparison instead of ==: if x = 10:.',
        whyItIsWrong: '= is assignment; == is comparison. Causes a SyntaxError.',
        correction: 'Always use == when checking equality: if x == 10:.'
      },
      {
        mistake: 'Comparing incompatible types like "10" == 10.',
        whyItIsWrong: 'A string is never equal to an integer; returns False without warning.',
        correction: 'Cast values to identical types before comparing: int("10") == 10.'
      }
    ],
    importantRules: [
      'Comparison operators always yield boolean True or False.',
      'Python supports clean comparison chaining: 10 < x < 50 is evaluated as (10 < x) and (x < 50).',
      '== tests value equality; is tests memory object identity.'
    ],
    interviewPerspective: 'Interviewers look for understanding of the distinction between == (value equality) and is (identity), especially with cached small integers and strings.',
    practiceQuestions: [
      {
        question: 'What is the boolean evaluation of 3 < 5 < 8?',
        solution: 'True'
      },
      {
        question: 'What does "apple" == "Apple" evaluate to?',
        solution: 'False (string comparisons in Python are case-sensitive).'
      }
    ],
    checkpoint: [
      {
        id: 'm2-t2-q1',
        type: 'output',
        prompt: 'What does 10 >= 10 evaluate to?',
        options: ['True', 'False', '10', 'None'],
        correctAnswer: 0,
        explanation: 'Greater than or equal (`>=`) is True when the left operand equals the right operand.'
      },
      {
        id: 'm2-t2-q2',
        type: 'output',
        prompt: 'What is the result of expression 5 != 5?',
        options: ['True', 'False', '0', 'Error'],
        correctAnswer: 1,
        explanation: '`!=` means "not equal". Since 5 is equal to 5, the expression evaluates to `False`.'
      },
      {
        id: 'm2-t2-q3',
        type: 'output',
        prompt: 'What does Python evaluate 1 < 3 < 2 to?',
        options: ['True', 'False', '2', 'SyntaxError'],
        correctAnswer: 1,
        explanation: '`1 < 3` is True, but `3 < 2` is False. Chained comparisons require all parts to hold.'
      }
    ]
  },

  'logical-operators': {
    id: 'logical-operators',
    moduleId: 'm2',
    topicNumber: 3,
    title: 'Logical Operators',
    shortSummary: 'Combining conditional expressions using and, or, and not with short-circuit evaluation.',
    whatIsIt: 'Logical operators (and, or, not) allow you to combine or invert multiple boolean conditions.',
    whyDoWeNeedIt: 'Real world logic often requires multiple criteria (e.g., age >= 18 AND has_id == True).',
    syntax: `condition1 and condition2   # True only if BOTH are True
condition1 or condition2    # True if AT LEAST ONE is True
not condition                # Inverts boolean value`,
    basicExample: {
      code: `age = 22
has_license = True

can_drive = (age >= 18) and has_license
is_minor = not (age >= 18)

print("Can Drive:", can_drive)
print("Is Minor:", is_minor)`,
      output: `Can Drive: True
Is Minor: False`
    },
    detailedExample: {
      code: `is_student = False
has_coupon = True
cart_total = 1200

# Discount applies if user is a student OR has a coupon OR cart exceeds 2000
qualifies_for_discount = is_student or has_coupon or (cart_total > 2000)

print("Discount Qualified:", qualifies_for_discount)`,
      output: `Discount Qualified: True`
    },
    codeExplanation: [
      'Line 6: Python uses short-circuit evaluation: if the first operand in or is True, it skips evaluating the rest.'
    ],
    commonMistakes: [
      {
        mistake: 'Using symbols && and || instead of keywords.',
        whyItIsWrong: 'Python uses written English keywords and, or, not, not C-style symbols.',
        correction: 'Use and, or, not.'
      }
    ],
    importantRules: [
      'and returns the first falsy value or the last value if all are truthy.',
      'or returns the first truthy value or the last value if all are falsy.',
      'not always returns a boolean (True or False).'
    ],
    interviewPerspective: 'Understanding Python short-circuit evaluation is frequently asked in fundamental technical interviews.',
    practiceQuestions: [
      {
        question: 'What is True and False or True?',
        solution: 'True (and has higher precedence than or).'
      }
    ],
    checkpoint: [
      {
        id: 'm2-t3-q1',
        type: 'output',
        prompt: 'What does not (True and False) evaluate to?',
        options: ['True', 'False', 'None', 'Error'],
        correctAnswer: 0,
        explanation: '`True and False` is `False`. Inverting it with `not False` produces `True`.'
      },
      {
        id: 'm2-t3-q2',
        type: 'output',
        prompt: 'What is the output of False or False or True?',
        options: ['True', 'False', '0', '1'],
        correctAnswer: 0,
        explanation: '`or` evaluates to `True` if at least one condition is True.'
      },
      {
        id: 'm2-t3-q3',
        type: 'mcq',
        prompt: 'Which logical operator has the highest precedence among the three?',
        options: ['or', 'and', 'not', 'All equal'],
        correctAnswer: 2,
        explanation: '`not` has the highest precedence, followed by `and`, then `or`.'
      }
    ]
  },

  'assignment-operators': {
    id: 'assignment-operators',
    moduleId: 'm2',
    topicNumber: 4,
    title: 'Assignment Operators',
    shortSummary: 'Basic assignment and compound operators: +=, -=, *=, /=, //=, %=, **=.',
    whatIsIt: 'Assignment operators assign or update the value stored in a variable. Compound operators combine an arithmetic operation with assignment in one step.',
    whyDoWeNeedIt: 'Compound assignment makes code shorter, cleaner, and prevents repeating variable names when incrementing counters or accumulating totals.',
    syntax: `x = 5
x += 2   # Equivalent to x = x + 2
x -= 1   # Equivalent to x = x - 1
x *= 3   # Equivalent to x = x * 3
x /= 2   # Equivalent to x = x / 2`,
    basicExample: {
      code: `score = 100
score += 25   # Add 25
score -= 10   # Subtract 10
score *= 2    # Multiply by 2
print("Final Score:", score)`,
      output: `Final Score: 230`
    },
    detailedExample: {
      code: `balance = 5000.0
interest_rate = 0.05

balance += (balance * interest_rate)
print("Balance after interest:", balance)

balance -= 1200.0
print("Balance after withdrawal:", balance)`,
      output: `Balance after interest: 5250.0
Balance after withdrawal: 4050.0`
    },
    codeExplanation: [
      'Line 4: balance += (...) computes annual interest and accumulates it directly into balance.',
      'Line 7: balance -= 1200.0 deducts the withdrawal amount.'
    ],
    commonMistakes: [
      {
        mistake: 'Using ++ or -- like in C++ / Java (x++).',
        whyItIsWrong: 'Python does NOT have ++ or -- operators. ++x is parsed as unary positive +(+x).',
        correction: 'Use x += 1 or x -= 1 instead.'
      }
    ],
    importantRules: [
      'Python does NOT support increment (++) or decrement (--) operators.',
      'Assignment expressions evaluate right-to-left.',
      'The variable on the left side of += must already be initialized.'
    ],
    interviewPerspective: 'Candidates coming from C++ or Java often inadvertently write i++. Interviewers look for clean idiomatic Python i += 1.',
    practiceQuestions: [
      {
        question: 'If x = 10, what is x after x //= 3?',
        solution: '3'
      }
    ],
    checkpoint: [
      {
        id: 'm2-t4-q1',
        type: 'output',
        prompt: 'If a = 8, what is a after running a %= 3?',
        options: ['2', '2.66', '0', '3'],
        correctAnswer: 0,
        explanation: '`8 % 3` is 2, so `a %= 3` assigns 2 to `a`.'
      },
      {
        id: 'm2-t4-q2',
        type: 'mcq',
        prompt: 'How do you increment a variable count by 1 in Python?',
        options: ['count++', '++count', 'count += 1', 'count.inc()'],
        correctAnswer: 2,
        explanation: '`count += 1` is the correct syntax in Python.'
      },
      {
        id: 'm2-t4-q3',
        type: 'output',
        prompt: 'If n = 4, what is n after n **= 2?',
        options: ['8', '16', '6', '2'],
        correctAnswer: 1,
        explanation: '`4 ** 2` is 16, which is stored back into `n`.'
      }
    ]
  },

  'type-casting-conversion': {
    id: 'type-casting-conversion',
    moduleId: 'm2',
    topicNumber: 5,
    title: 'Type Casting / Type Conversion',
    shortSummary: 'Explicit casting with int(), float(), str(), bool(), and implicit type coercion.',
    whatIsIt: 'Type casting (or conversion) transforms a value from one data type into another. Implicit conversion is done automatically by Python (e.g. int + float -> float), while explicit casting is done using conversion functions (int(), float(), str(), bool()).',
    whyDoWeNeedIt: 'User input always arrives as str. To do math or conditional checks, strings must be explicitly converted to numeric or boolean types.',
    syntax: `int("123")     # 123
float("45.6")  # 45.6
str(100)       # "100"
bool(0)        # False
bool(1)        # True`,
    basicExample: {
      code: `raw_age = "20"
converted_age = int(raw_age)
next_year_age = converted_age + 1

print(f"Next year age: {next_year_age} (Type: {type(next_year_age)})")`,
      output: `Next year age: 21 (Type: <class 'int'>)`
    },
    detailedExample: {
      code: `# Truthy and Falsy conversions
print("bool(0):", bool(0))
print("bool(''):", bool(""))
print("bool([]):", bool([]))
print("bool('Hello'):", bool("Hello"))
print("bool(42):", bool(42))`,
      output: `bool(0): False
bool(''): False
bool([]): False
bool('Hello'): True
bool(42): True`
    },
    codeExplanation: [
      'Empty collections ("", [], {}) and zero values (0, 0.0) convert to False (falsy).',
      'Non-empty strings, non-zero numbers, and populated collections convert to True (truthy).'
    ],
    commonMistakes: [
      {
        mistake: 'Casting a floating point string directly to int: int("3.14").',
        whyItIsWrong: 'Causes ValueError: invalid literal for int() with base 10.',
        correction: 'First cast to float, then to int: int(float("3.14")).'
      }
    ],
    importantRules: [
      'int() truncates decimal points toward zero without rounding: int(9.99) is 9.',
      'Implicit type conversion promotes smaller types to larger types (int + float = float).',
      'Non-numeric strings throw ValueError when passed to int() or float().'
    ],
    interviewPerspective: 'Interviewers frequently test truthy/falsy edge cases (empty strings vs strings containing space " ", None, empty lists).',
    practiceQuestions: [
      {
        question: 'What is bool("False") in Python?',
        hint: 'Is the string non-empty?',
        solution: 'True because any non-empty string is truthy in Python.'
      },
      {
        question: 'What is int(7.85)?',
        solution: '7 (int truncates decimal values).'
      }
    ],
    checkpoint: [
      {
        id: 'm2-t5-q1',
        type: 'output',
        prompt: 'What will int(5.9) return?',
        options: ['6', '5', '5.0', 'ValueError'],
        correctAnswer: 1,
        explanation: '`int()` truncates floating numbers towards zero, so `5.9` becomes `5`.'
      },
      {
        id: 'm2-t5-q2',
        type: 'output',
        prompt: 'What does bool(" ") (string with a space) evaluate to?',
        options: ['False', 'True', 'None', 'Error'],
        correctAnswer: 1,
        explanation: 'A string with even a single whitespace character is non-empty and therefore `True`.'
      },
      {
        id: 'm2-t5-q3',
        type: 'mcq',
        prompt: 'Which conversion will raise a ValueError in Python?',
        options: ['int("42")', 'float("3.14")', 'int("45.8")', 'str(100)'],
        correctAnswer: 2,
        explanation: '`int("45.8")` fails because `"45.8"` is not a valid base-10 integer string.'
      }
    ]
  },

  // ==========================================
  // MODULE 3: Conditional Statements
  // ==========================================
  'if-statement': {
    id: 'if-statement',
    moduleId: 'm3',
    topicNumber: 1,
    title: 'if',
    shortSummary: 'Executing a block of code conditionally based on boolean truth evaluation.',
    whatIsIt: 'The if statement evaluates a condition. If the condition evaluates to True, the indented block of code beneath it is executed.',
    whyDoWeNeedIt: 'Programs need decision points to run specific instructions only when certain criteria are satisfied (e.g., verifying user authentication).',
    syntax: `if condition:
    # Indented code block executes if condition is True
    statement`,
    basicExample: {
      code: `temperature = 35

if temperature > 30:
    print("It's a hot day! Stay hydrated.")`,
      output: `It's a hot day! Stay hydrated.`
    },
    detailedExample: {
      code: `cart_value = 1500
free_shipping_threshold = 1000

if cart_value >= free_shipping_threshold:
    print("🎉 Congratulations! You have unlocked FREE Express Delivery.")

print("Proceeding to checkout...")`,
      output: `🎉 Congratulations! You have unlocked FREE Express Delivery.
Proceeding to checkout...`
    },
    codeExplanation: [
      'Line 4: Python tests if cart_value >= 1000. Since 1500 >= 1000 is True, line 5 executes.',
      'Line 7: Outdented code runs unconditionally regardless of the if condition.'
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting the colon : at the end of the if line.',
        whyItIsWrong: 'Python grammar requires a colon to begin any block.',
        correction: 'Always terminate header statements with : (if x > 0:).'
      },
      {
        mistake: 'Inconsistent indentation (mixing tabs and spaces).',
        whyItIsWrong: 'Produces an IndentationError.',
        correction: 'Use 4 spaces for every indentation level.'
      }
    ],
    importantRules: [
      'Indentation determines block hierarchy; standard convention is 4 spaces.',
      'The condition does not require enclosing parentheses in Python.',
      'Empty or zero values evaluate to False in conditions.'
    ],
    interviewPerspective: 'Clean condition writing avoiding redundant boolean comparisons (e.g. if is_valid: instead of if is_valid == True:) is a key indicator of Python proficiency.',
    practiceQuestions: [
      {
        question: 'Is if (x > 10): valid in Python?',
        solution: 'Yes, parentheses are allowed though considered unpythonic when redundant.'
      }
    ],
    checkpoint: [
      {
        id: 'm3-t1-q1',
        type: 'mcq',
        prompt: 'Which punctuation mark is mandatory at the end of an if condition header?',
        options: [';', ':', '{', '=>'],
        correctAnswer: 1,
        explanation: 'A colon `:` is required at the end of condition headers in Python.'
      },
      {
        id: 'm3-t1-q2',
        type: 'output',
        prompt: 'What is printed if x = 5 and code is: if x > 10: print("A"); print("B")?',
        options: ['A and B', 'A only', 'B only', 'Nothing'],
        correctAnswer: 2,
        explanation: '`x > 10` is False so `"A"` is skipped. `"B"` is outside the block and prints.'
      },
      {
        id: 'm3-t1-q3',
        type: 'mcq',
        prompt: 'How does Python define the body of an if statement block?',
        options: ['Curly braces {}', 'Indentation', 'begin ... end keywords', 'Parentheses ()'],
        correctAnswer: 1,
        explanation: 'Python uses indentation to define code blocks.'
      }
    ]
  },

  'elif-statement': {
    id: 'elif-statement',
    moduleId: 'm3',
    topicNumber: 2,
    title: 'elif',
    shortSummary: 'Evaluating sequential alternative conditions when previous checks evaluate to False.',
    whatIsIt: 'elif (short for else-if) lets you check multiple conditions in order. As soon as one condition evaluates to True, its block executes and the rest of the chain is skipped.',
    whyDoWeNeedIt: 'Without elif, checking multiple mutually exclusive options would require deeply nested if blocks or redundant independent checks.',
    syntax: `if condition1:
    statement1
elif condition2:
    statement2
elif condition3:
    statement3`,
    basicExample: {
      code: `score = 78

if score >= 90:
    print("Grade: A")
elif score >= 75:
    print("Grade: B")
elif score >= 60:
    print("Grade: C")`,
      output: `Grade: B`
    },
    detailedExample: {
      code: `traffic_light = "yellow"

if traffic_light == "red":
    print("🛑 Stop immediately!")
elif traffic_light == "yellow":
    print("⚠️ Caution: Prepare to stop.")
elif traffic_light == "green":
    print("🟢 Go safely.")`,
      output: `⚠️ Caution: Prepare to stop.`
    },
    codeExplanation: [
      'Line 3: Checks traffic_light == "red" -> False.',
      'Line 5: Moves to elif traffic_light == "yellow" -> True. Executes line 6.',
      'Line 7: The green branch is skipped entirely.'
    ],
    commonMistakes: [
      {
        mistake: 'Writing else if instead of elif.',
        whyItIsWrong: 'else if is invalid Python syntax and triggers a SyntaxError.',
        correction: 'Use the keyword elif.'
      }
    ],
    importantRules: [
      'Conditions in an if-elif chain are evaluated from top to bottom.',
      'Only the FIRST matching branch executes; all subsequent elif blocks are bypassed.',
      'You can have unlimited elif branches.'
    ],
    interviewPerspective: 'Ordering conditions correctly from most specific to least specific is frequently tested in grading and categorization problems.',
    practiceQuestions: [
      {
        question: 'If x = 85, and conditions are if x > 50: followed by elif x > 80:, which branch runs?',
        solution: 'The x > 50 branch runs first and the elif branch is skipped!'
      }
    ],
    checkpoint: [
      {
        id: 'm3-t2-q1',
        type: 'mcq',
        prompt: 'What is the correct Python keyword for "else if"?',
        options: ['elseif', 'else if', 'elif', 'elsif'],
        correctAnswer: 2,
        explanation: '`elif` is the exact Python keyword.'
      },
      {
        id: 'm3-t2-q2',
        type: 'output',
        prompt: 'What will print if n = 15: if n > 20: print("A") elif n > 10: print("B") elif n > 5: print("C")?',
        options: ['A', 'B', 'C', 'B and C'],
        correctAnswer: 1,
        explanation: '`n > 10` is the first True condition, so `"B"` prints and the rest of the chain exits.'
      },
      {
        id: 'm3-t2-q3',
        type: 'mcq',
        prompt: 'How many elif blocks can be attached to a single if statement?',
        options: ['Only 1', 'Up to 3', 'As many as needed', 'Maximum 255'],
        correctAnswer: 2,
        explanation: 'You can chain as many `elif` statements as required.'
      }
    ]
  },

  'else-statement': {
    id: 'else-statement',
    moduleId: 'm3',
    topicNumber: 3,
    title: 'else',
    shortSummary: 'Defining a fallback catch-all block when all previous conditions evaluate to False.',
    whatIsIt: 'The else block catches all cases where neither the if nor any preceding elif conditions evaluated to True.',
    whyDoWeNeedIt: 'Ensures our program provides a guaranteed fallback or default behavior for unhandled or invalid inputs.',
    syntax: `if condition:
    # Runs when condition is True
    statement1
else:
    # Runs when condition is False
    statement2`,
    basicExample: {
      code: `age = 16

if age >= 18:
    print("Eligible to vote.")
else:
    print("Not eligible to vote yet.")`,
      output: `Not eligible to vote yet.`
    },
    detailedExample: {
      code: `username = "admin"
password = "secret123"

entered_user = "admin"
entered_pass = "wrongpass"

if entered_user == username and entered_pass == password:
    print("✅ Login successful! Welcome.")
else:
    print("❌ Invalid credentials. Please try again.")`,
      output: `❌ Invalid credentials. Please try again.`
    },
    codeExplanation: [
      'Line 7: Tests both credentials. Because password did not match, condition is False.',
      'Line 9: Execution falls through to else:, printing the error message.'
    ],
    commonMistakes: [
      {
        mistake: 'Supplying a condition to else: else x > 0:.',
        whyItIsWrong: 'else cannot take conditions. It is strictly a fallback.',
        correction: 'Use elif x > 0: if a condition is required.'
      }
    ],
    importantRules: [
      'An else block cannot have a condition.',
      'There can only be at most ONE else block per if chain, and it must appear at the very end.',
      'else is optional.'
    ],
    interviewPerspective: 'Handling edge cases cleanly in fallback else blocks prevents unexpected silent failures in coding tests.',
    practiceQuestions: [
      {
        question: 'Can an else statement appear before an elif statement?',
        solution: 'No, else must always be the final block in a conditional chain.'
      }
    ],
    checkpoint: [
      {
        id: 'm3-t3-q1',
        type: 'mcq',
        prompt: 'Can an else block contain a condition check directly (e.g. else (x == 0):)?',
        options: ['Yes', 'No, else cannot take conditions', 'Only in Python 3.12+', 'Yes with parentheses'],
        correctAnswer: 1,
        explanation: '`else` cannot take conditions. If a condition is needed, use `elif`.'
      },
      {
        id: 'm3-t3-q2',
        type: 'output',
        prompt: 'What prints when x = 0: if x > 0: print("Positive") else: print("Non-positive")?',
        options: ['Positive', 'Non-positive', '0', 'Error'],
        correctAnswer: 1,
        explanation: '`0 > 0` is False, so the `else` branch executes printing `"Non-positive"`.'
      },
      {
        id: 'm3-t3-q3',
        type: 'mcq',
        prompt: 'Where must the else block be positioned in a conditional statement?',
        options: ['At the beginning', 'Between if and elif', 'At the very end of the chain', 'Anywhere'],
        correctAnswer: 2,
        explanation: '`else` must always be the final block in the conditional structure.'
      }
    ]
  },

  'nested-conditionals': {
    id: 'nested-conditionals',
    moduleId: 'm3',
    topicNumber: 4,
    title: 'Nested Conditionals',
    shortSummary: 'Placing conditional blocks inside other conditional blocks for multi-level decision logic.',
    whatIsIt: 'Nesting conditionals means putting an if, elif, or else statement inside the body of another if, elif, or else block.',
    whyDoWeNeedIt: 'Useful when a secondary check is only meaningful or valid if the primary check passes (e.g., check if account exists, then check if password is correct).',
    syntax: `if primary_condition:
    if secondary_condition:
        # Runs if both are True
        statement1
    else:
        # Runs if primary is True but secondary is False
        statement2
else:
    # Runs if primary is False
    statement3`,
    basicExample: {
      code: `num = 14

if num > 0:
    if num % 2 == 0:
        print("Positive Even Number")
    else:
        print("Positive Odd Number")
else:
    print("Negative Number or Zero")`,
      output: `Positive Even Number`
    },
    detailedExample: {
      code: `has_passport = True
visa_status = "Approved"

if has_passport:
    if visa_status == "Approved":
        print("🛫 Cleared for international departure.")
    elif visa_status == "Pending":
        print("⏳ Visa under processing. Cannot depart yet.")
    else:
        print("❌ Visa rejected or invalid.")
else:
    print("❌ Passport required before visa verification.")`,
      output: `🛫 Cleared for international departure.`
    },
    codeExplanation: [
      'Line 4: First checks has_passport. Since it is True, execution enters the outer block.',
      'Line 5: Evaluates inner condition visa_status == "Approved". Since True, line 6 executes.'
    ],
    commonMistakes: [
      {
        mistake: 'Over-nesting when logical and would be much clearer.',
        whyItIsWrong: 'Deep "arrow anti-pattern" code is hard to read and debug.',
        correction: 'Flatten shallow guards using if condition1 and condition2: or early returns.'
      }
    ],
    importantRules: [
      'Each level of nesting requires another level of indentation (4 additional spaces).',
      'An inner else matches the closest preceding if at the same indentation level.',
      'Keep nesting depth shallow (ideally <= 3 levels) for maintainability.'
    ],
    interviewPerspective: 'In interviews, refactoring deeply nested code into clean guard clauses and boolean expressions is a classic code quality indicator.',
    practiceQuestions: [
      {
        question: 'If x = -5, will the inner block of if x > 0: if x == 5: be evaluated?',
        solution: 'No, because the outer x > 0 is False, the inner check is skipped completely.'
      }
    ],
    checkpoint: [
      {
        id: 'm3-t4-q1',
        type: 'output',
        prompt: 'What prints if x = 10, y = 2: if x > 5: if y > 5: print("A") else: print("B")?',
        options: ['A', 'B', 'Nothing', 'A and B'],
        correctAnswer: 1,
        explanation: '`x > 5` is True, but inner `y > 5` is False, so the inner else prints `"B"`.'
      },
      {
        id: 'm3-t4-q2',
        type: 'mcq',
        prompt: 'How does Python know which if an else belongs to in nested code?',
        options: ['By line distance', 'By indentation level alignment', 'By variable names', 'By semicolons'],
        correctAnswer: 1,
        explanation: 'Python associates an `else` with the matching `if` at the exact same indentation level.'
      },
      {
        id: 'm3-t4-q3',
        type: 'output',
        prompt: 'What prints if a = False and b = True: if a: if b: print("1"); print("2")?',
        options: ['1', '2', '1 and 2', 'Nothing'],
        correctAnswer: 1,
        explanation: 'Because `print("2")` is outside the `if b:` statement but still follows sequential flow or if outside `if a:`, here `print("2")` runs if placed after `if a:`, but within `if a:`, 0 lines run.'
      }
    ]
  },

  // ==========================================
  // MODULE 4: Loops
  // ==========================================
  'for-loop': {
    id: 'for-loop',
    moduleId: 'm4',
    topicNumber: 1,
    title: 'for loop',
    shortSummary: 'Iterating over sequences such as lists, strings, tuples, and ranges.',
    whatIsIt: 'A for loop in Python iterates over the items of any sequence (a list, a string, a tuple, or a range) in order, executing the block once for each item.',
    whyDoWeNeedIt: 'Repeating actions across every element in a dataset (e.g., formatting 100 student records or searching items) without duplicating code.',
    syntax: `for item in sequence:
    # Code block executed for each item
    statement`,
    basicExample: {
      code: `languages = ["Python", "JavaScript", "C++"]

for lang in languages:
    print(f"I code in {lang}")`,
      output: `I code in Python
I code in JavaScript
I code in C++`
    },
    detailedExample: {
      code: `word = "PYTHON"
vowels = "AEIOU"
vowel_count = 0

for char in word:
    if char in vowels:
        vowel_count += 1
        print(f"Found vowel: {char}")

print(f"Total vowels in {word}: {vowel_count}")`,
      output: `Found vowel: O
Total vowels in PYTHON: 1`
    },
    codeExplanation: [
      'Line 5: for char in word extracts each character from "PYTHON" one by one.',
      'Line 6: if char in vowels checks membership.',
      'Line 7: Increments counter whenever a vowel is encountered.'
    ],
    commonMistakes: [
      {
        mistake: 'Modifying a list while iterating over it with a for loop.',
        whyItIsWrong: 'Causes skipped elements or unexpected iteration behavior.',
        correction: 'Iterate over a copy for item in list_name[:]: if you need to mutate in place.'
      }
    ],
    importantRules: [
      'Python for-loops are "for-each" iterators by default.',
      'The loop variable retains its last assigned value after the loop finishes.',
      'You can unpack multiple values per iteration: for key, value in dict.items():.'
    ],
    interviewPerspective: 'Iterating with enumerate() and zip() in for-loops is a frequent technical interview standard.',
    practiceQuestions: [
      {
        question: 'How many times will for x in "hello": execute?',
        solution: '5 times (once for each character).'
      }
    ],
    checkpoint: [
      {
        id: 'm4-t1-q1',
        type: 'output',
        prompt: 'What is the sum computed by total = 0; for x in [10, 20, 30]: total += x; print(total)?',
        options: ['60', '30', '50', '0'],
        correctAnswer: 0,
        explanation: '10 + 20 + 30 = 60.'
      },
      {
        id: 'm4-t1-q2',
        type: 'mcq',
        prompt: 'What type of loop construct does Python`s for loop primarily represent?',
        options: ['Counter-based loop', 'For-each iterator over sequences', 'Do-while loop', 'Conditional loop'],
        correctAnswer: 1,
        explanation: 'Python for-loops are for-each sequence iterators.'
      },
      {
        id: 'm4-t1-q3',
        type: 'output',
        prompt: 'How many lines of output does for c in "AI": print(c) produce?',
        options: ['1', '2', '3', '0'],
        correctAnswer: 1,
        explanation: 'String "AI" has 2 characters, so the print executes 2 times.'
      }
    ]
  },

  'range-function': {
    id: 'range-function',
    moduleId: 'm4',
    topicNumber: 2,
    title: 'range()',
    shortSummary: 'Generating arithmetic progressions: range(stop), range(start, stop), range(start, stop, step).',
    whatIsIt: 'The range() function generates an immutable sequence of integers. It is lazy (generates numbers on demand in O(1) memory).',
    whyDoWeNeedIt: 'Used with for loops to repeat actions a specific number of times or iterate through numerical indices.',
    syntax: `range(stop)               # 0 up to (stop - 1)
range(start, stop)        # start up to (stop - 1)
range(start, stop, step)  # start up to (stop - 1) incrementing by step`,
    basicExample: {
      code: `for i in range(1, 6):
    print(i, end=" ")
print()`,
      output: `1 2 3 4 5 `
    },
    detailedExample: {
      code: `# Counting down with negative step
for count in range(5, 0, -1):
    print(f"T-minus {count}...")
print("🚀 Blast off!")`,
      output: `T-minus 5...
T-minus 4...
T-minus 3...
T-minus 2...
T-minus 1...
🚀 Blast off!`
    },
    codeExplanation: [
      'Line 2: range(5, 0, -1) starts at 5, stops BEFORE 0, and decrements by -1 at each step.',
      'Notice that the stop bound is ALWAYS exclusive.'
    ],
    commonMistakes: [
      {
        mistake: 'Assuming range(1, 5) includes 5.',
        whyItIsWrong: 'The stop argument is EXCLUSIVE. range(1, 5) only yields 1, 2, 3, 4.',
        correction: 'Use range(1, 6) if you want 1 through 5 inclusive.'
      },
      {
        mistake: 'Providing a 0 step: range(1, 10, 0).',
        whyItIsWrong: 'Throws ValueError: range() arg 3 must not be zero.',
        correction: 'Step must be a non-zero integer.'
      }
    ],
    importantRules: [
      'The stop value is ALWAYS exclusive (never included).',
      'Default start is 0; default step is 1.',
      'range() returns a range object, not a list. Use list(range(3)) to get [0, 1, 2].'
    ],
    interviewPerspective: 'Interviewers frequently test step arithmetic and off-by-one boundary conditions with range().',
    practiceQuestions: [
      {
        question: 'What numbers are generated by list(range(2, 10, 3))?',
        solution: '[2, 5, 8]'
      }
    ],
    checkpoint: [
      {
        id: 'm4-t2-q1',
        type: 'output',
        prompt: 'What is list(range(1, 4)) in Python?',
        options: ['[1, 2, 3, 4]', '[1, 2, 3]', '[0, 1, 2, 3]', '[1, 4]'],
        correctAnswer: 1,
        explanation: '`range(1, 4)` generates 1, 2, 3 (stopping before 4).'
      },
      {
        id: 'm4-t2-q2',
        type: 'output',
        prompt: 'How many iterations run in for i in range(10):?',
        options: ['9', '10', '11', '0'],
        correctAnswer: 1,
        explanation: '`range(10)` yields 10 numbers: 0 through 9.'
      },
      {
        id: 'm4-t2-q3',
        type: 'output',
        prompt: 'What is the output of list(range(0, 10, 4))?',
        options: ['[0, 4, 8]', '[0, 4, 8, 10]', '[4, 8]', '[0, 4]'],
        correctAnswer: 0,
        explanation: 'Starts at 0, adds 4 (0, 4, 8), next is 12 which exceeds 10.'
      }
    ]
  },

  'while-loop': {
    id: 'while-loop',
    moduleId: 'm4',
    topicNumber: 3,
    title: 'while loop',
    shortSummary: 'Repeatedly executing code as long as a boolean condition remains True.',
    whatIsIt: 'A while loop continues executing its code block repeatedly as long as its test condition evaluates to True.',
    whyDoWeNeedIt: 'Used when the number of iterations is NOT known beforehand (e.g., waiting for valid user input, game loops, or convergence in numerical methods).',
    syntax: `while condition:
    # Block executes while condition is True
    # Make sure to update condition variables!
    statement`,
    basicExample: {
      code: `counter = 1

while counter <= 3:
    print("Attempt:", counter)
    counter += 1`,
      output: `Attempt: 1
Attempt: 2
Attempt: 3`
    },
    detailedExample: {
      code: `# Simulating binary division / bit counting
number = 27
steps = 0

while number > 1:
    if number % 2 == 0:
        number //= 2
    else:
        number = 3 * number + 1
    steps += 1

print(f"Reached 1 in {steps} Collatz steps.")`,
      output: `Reached 1 in 111 Collatz steps.`
    },
    codeExplanation: [
      'Line 5: Loop continues as long as number > 1.',
      'Line 6-9: Applies Collatz conjecture transformation.',
      'Line 10: Increments step count on each cycle.'
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting to update the loop variable inside the while loop.',
        whyItIsWrong: 'The condition never becomes False, creating an INFINITE LOOP that freezes the program.',
        correction: 'Always ensure variables in the condition are modified inside the loop (e.g. counter += 1).'
      }
    ],
    importantRules: [
      'If the condition is initially False, the loop body will NEVER execute.',
      'Every while loop must have a guaranteed termination path to avoid infinite loops.',
      'while True: creates an intentional infinite loop, usually exited with break.'
    ],
    interviewPerspective: 'Two-pointer problems, BFS queues, and sliding window algorithms in DSA frequently use while loops.',
    practiceQuestions: [
      {
        question: 'What happens if a while condition never becomes False and has no break?',
        solution: 'An infinite loop occurs until memory/time limits or process termination.'
      }
    ],
    checkpoint: [
      {
        id: 'm4-t3-q1',
        type: 'output',
        prompt: 'If x = 5, what will print: while x > 2: x -= 1; print(x)?',
        options: ['4, 3, 2', '2', '5, 4, 3', 'Infinite loop'],
        correctAnswer: 0,
        explanation: 'Loop runs for x=5 (prints 4), x=4 (prints 3), x=3 (prints 2). Then x=2 fails `x > 2`.'
      },
      {
        id: 'm4-t3-q2',
        type: 'mcq',
        prompt: 'What critical bug occurs if a loop variable is never updated inside a while loop?',
        options: ['SyntaxError', 'Infinite loop', 'IndentationError', 'RecursionError'],
        correctAnswer: 1,
        explanation: 'The condition stays True forever, creating an infinite loop.'
      },
      {
        id: 'm4-t3-q3',
        type: 'output',
        prompt: 'How many times does x = 10; while x < 5: print(x); x += 1 execute?',
        options: ['0 times', '5 times', '10 times', 'Infinite'],
        correctAnswer: 0,
        explanation: 'Since `10 < 5` is False from the start, the loop body runs 0 times.'
      }
    ]
  },

  'break-statement': {
    id: 'break-statement',
    moduleId: 'm4',
    topicNumber: 4,
    title: 'break',
    shortSummary: 'Immediately terminating and exiting the nearest enclosing loop.',
    whatIsIt: 'The break statement halts the execution of the loop immediately and jumps to the first statement outside the loop.',
    whyDoWeNeedIt: 'Used to stop searching as soon as a target item is found, saving computational time.',
    syntax: `for item in sequence:
    if condition:
        break  # Loop exits immediately`,
    basicExample: {
      code: `for num in [1, 3, 5, 8, 9, 11]:
    if num % 2 == 0:
        print(f"Found first even number: {num}")
        break
    print(f"Inspected {num}")`,
      output: `Inspected 1
Inspected 3
Inspected 5
Found first even number: 8`
    },
    detailedExample: {
      code: `items = ["pen", "notebook", "CORRUPTED_RECORD", "eraser", "ruler"]
clean_data = []

for item in items:
    if item == "CORRUPTED_RECORD":
        print("🚨 Corrupted entry encountered! Aborting import.")
        break
    clean_data.append(item)

print("Imported items:", clean_data)`,
      output: `🚨 Corrupted entry encountered! Aborting import.
Imported items: ['pen', 'notebook']`
    },
    codeExplanation: [
      'Line 5: When item == "CORRUPTED_RECORD", break triggers.',
      'Line 7: Execution immediately leaves the loop, skipping "eraser" and "ruler".'
    ],
    commonMistakes: [
      {
        mistake: 'Expecting break to exit nested loops simultaneously.',
        whyItIsWrong: 'break only exits the immediate innermost loop enclosing it.',
        correction: 'Use flags or functions with return to break out of multiple nested loops.'
      }
    ],
    importantRules: [
      'break only terminates the current innermost loop.',
      'If a loop finishes without hitting a break, its optional else: clause executes.',
      'Using break outside a loop causes a SyntaxError.'
    ],
    interviewPerspective: 'Linear search and early-exit optimizations in algorithms depend heavily on break.',
    practiceQuestions: [
      {
        question: 'Does break inside an inner loop exit the outer loop as well?',
        solution: 'No, only the inner loop is terminated.'
      }
    ],
    checkpoint: [
      {
        id: 'm4-t4-q1',
        type: 'output',
        prompt: 'What will print: for i in range(5): if i == 2: break; print(i, end=" ")?',
        options: ['0 1 2', '0 1', '0 1 2 3 4', '2'],
        correctAnswer: 1,
        explanation: 'At i=0 prints 0, i=1 prints 1. At i=2 `break` triggers before print, exiting the loop.'
      },
      {
        id: 'm4-t4-q2',
        type: 'mcq',
        prompt: 'What does the break statement do when executed inside a nested loop?',
        options: ['Terminates all loops', 'Terminates only the innermost loop', 'Restarts the loop', 'Skips one iteration'],
        correctAnswer: 1,
        explanation: '`break` terminates only the immediate innermost loop that contains it.'
      },
      {
        id: 'm4-t4-q3',
        type: 'mcq',
        prompt: 'What error is raised if break is written outside of any loop?',
        options: ['ValueError', 'SyntaxError', 'NameError', 'TypeError'],
        correctAnswer: 1,
        explanation: 'A `SyntaxError` is raised because `break` is only valid inside loop blocks.'
      }
    ]
  },

  'continue-statement': {
    id: 'continue-statement',
    moduleId: 'm4',
    topicNumber: 5,
    title: 'continue',
    shortSummary: 'Skipping the remainder of the current iteration and advancing to the next cycle.',
    whatIsIt: 'The continue statement stops execution of the current loop iteration and immediately jumps to the next cycle of the loop.',
    whyDoWeNeedIt: 'Useful for filtering out invalid or unneeded data points without writing deeply nested if-else structures.',
    syntax: `for item in sequence:
    if skip_condition:
        continue  # Skips rest of current iteration
    # Process valid item`,
    basicExample: {
      code: `for num in range(1, 6):
    if num == 3:
        continue  # Skip printing 3
    print(num, end=" ")
print()`,
      output: `1 2 4 5 `
    },
    detailedExample: {
      code: `scores = [85, -1, 92, -5, 78, 100]
valid_sum = 0
valid_count = 0

for s in scores:
    if s < 0:
        print(f"Skipping invalid negative score: {s}")
        continue
    valid_sum += s
    valid_count += 1

print(f"Average of valid scores: {valid_sum / valid_count:.2f}")`,
      output: `Skipping invalid negative score: -1
Skipping invalid negative score: -5
Average of valid scores: 88.75`
    },
    codeExplanation: [
      'Line 7: When s < 0, continue executes.',
      'Line 9-10: The accumulation lines are skipped for negative scores, moving directly to the next element.'
    ],
    commonMistakes: [
      {
        mistake: 'Putting continue in a while loop before incrementing the loop variable.',
        whyItIsWrong: 'The counter is never incremented, creating an infinite loop at that iteration.',
        correction: 'Update the while counter BEFORE calling continue.'
      }
    ],
    importantRules: [
      'continue skips only the current iteration; it does NOT terminate the loop.',
      'In a for loop, continue advances to the next item from the iterable.',
      'In a while loop, continue jumps directly back to evaluating the while condition.'
    ],
    interviewPerspective: 'Interviewers look for clean code that uses continue to avoid nested indentation when filtering records.',
    practiceQuestions: [
      {
        question: 'What is the difference between break and continue?',
        solution: 'break exits the entire loop; continue skips only the rest of the current iteration.'
      }
    ],
    checkpoint: [
      {
        id: 'm4-t5-q1',
        type: 'output',
        prompt: 'What will print: for i in range(4): if i % 2 == 0: continue; print(i, end=" ")?',
        options: ['0 2', '1 3', '0 1 2 3', '2 4'],
        correctAnswer: 1,
        explanation: 'For even numbers (0, 2), `continue` skips the print. Only odd numbers (1, 3) print.'
      },
      {
        id: 'm4-t5-q2',
        type: 'mcq',
        prompt: 'What happens when continue executes in a for loop?',
        options: ['The loop stops running', 'It skips to the next iteration', 'It restarts from index 0', 'It throws an exception'],
        correctAnswer: 1,
        explanation: '`continue` skips the rest of the current iteration and starts the next one.'
      },
      {
        id: 'm4-t5-q3',
        type: 'output',
        prompt: 'How many times does print("X") run in for i in range(3): continue; print("X")?',
        options: ['0', '3', '1', 'Error'],
        correctAnswer: 0,
        explanation: '`continue` is called unconditionally before `print("X")`, so the print never runs.'
      }
    ]
  }
};
