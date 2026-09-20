import { ModuleAssignmentConfig, AssignmentQuestion } from './pythonQuestionBanks';

export const PYTHON_QUESTION_BANKS_PART2: Record<string, ModuleAssignmentConfig> = {
  // =========================================================================
  // MODULE 8 ASSIGNMENT BANK (Functions Advanced)
  // =========================================================================
  m8: {
    moduleId: 'm8',
    title: 'Module 8 Assignment: Functions Advanced',
    timeLimitMinutes: 30,
    sampleCount: 14,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm8-q01',
        moduleId: 'm8',
        topicId: 'default-arguments',
        topicTitle: 'Default Arguments',
        type: 'mcq',
        points: 1,
        prompt: 'What happens when a mutable object like a list is used as a default argument in a function definition?',
        options: [
          'Python creates a new list every time the function is called',
          'The same list object is shared across all function calls that omit the argument',
          'A TypeError is raised when compiling the function',
          'The default argument is automatically converted to an immutable tuple'
        ],
        correctAnswer: 1,
        explanation: 'Default arguments are evaluated once at definition time, so mutable default values share state across invocations.'
      },
      {
        id: 'm8-q02',
        moduleId: 'm8',
        topicId: 'keyword-arguments',
        topicTitle: 'Keyword Arguments',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this Python code snippet?',
        codeSnippet: `def compute_discount(price, discount=0.1, coupon=0):
    return (price * (1 - discount)) - coupon

print(int(compute_discount(200, coupon=10)))`,
        correctAnswer: '170',
        explanation: 'price=200, discount defaults to 0.1, coupon=10. (200 * 0.9) - 10 = 180 - 10 = 170.'
      },
      {
        id: 'm8-q03',
        moduleId: 'm8',
        topicId: 'args',
        topicTitle: '*args',
        type: 'output',
        points: 2,
        prompt: 'What will this Python code output?',
        codeSnippet: `def stats(*values):
    return len(values), sum(values)

print(stats(10, 20, 30))`,
        correctAnswer: '(3, 60)',
        explanation: '`values` receives the tuple `(10, 20, 30)` with length 3 and sum 60.'
      },
      {
        id: 'm8-q04',
        moduleId: 'm8',
        topicId: 'kwargs',
        topicTitle: '**kwargs',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which statements about `**kwargs` in Python are TRUE? (Select all that apply)',
        options: [
          '`kwargs` is received inside the function as a standard Python dictionary',
          '`**kwargs` must appear after `*args` and standard positional parameters in the function definition',
          '`**kwargs` only accepts numeric integer values',
          'You can unpack a dictionary into keyword arguments at call time using the `**` operator'
        ],
        correctAnswer: [0, 1, 3],
        explanation: '`**kwargs` collects keyword arguments into a dict, must appear last, and can be unpacked with `**`.'
      },
      {
        id: 'm8-q05',
        moduleId: 'm8',
        topicId: 'lambda-functions',
        topicTitle: 'Lambda Functions',
        type: 'output',
        points: 2,
        prompt: 'What is the output of this code snippet?',
        codeSnippet: `pairs = [(1, 'one'), (3, 'three'), (2, 'two'), (4, 'four')]
pairs.sort(key=lambda p: p[1])
print([p[0] for p in pairs])`,
        correctAnswer: '[4, 1, 3, 2]',
        explanation: 'Sorted alphabetically by string name: "four" (4), "one" (1), "three" (3), "two" (2).'
      },
      {
        id: 'm8-q06',
        moduleId: 'm8',
        topicId: 'recursion',
        topicTitle: 'Recursion',
        type: 'code-tracing',
        points: 2,
        prompt: 'Trace the recursive execution of `f(4)` and enter the final return value.',
        codeSnippet: `def f(n):
    if n <= 1:
        return 1
    return n + f(n - 2)

print(f(4))`,
        correctAnswer: '7',
        explanation: 'f(4) = 4 + f(2) = 4 + (2 + f(0)) = 4 + 2 + 1 = 7.'
      },
      {
        id: 'm8-q07',
        moduleId: 'm8',
        topicId: 'default-arguments',
        topicTitle: 'Default Arguments',
        type: 'debugging',
        points: 2,
        prompt: 'Identify the bug in this function signature and select the correct fix.',
        codeSnippet: `def create_user(role="developer", username, email):
    return {"role": role, "username": username, "email": email}`,
        options: [
          'def create_user(username, email, role="developer"):',
          'def create_user(*role="developer", username, email):',
          'def create_user(role="developer", username="", email=""):',
          'def create_user(username, email, **role="developer"):'
        ],
        correctAnswer: 0,
        explanation: 'Parameters with default values must come after all required positional parameters.'
      },
      {
        id: 'm8-q08',
        moduleId: 'm8',
        topicId: 'args',
        topicTitle: '*args',
        type: 'output',
        points: 2,
        prompt: 'What will be printed when running this code?',
        codeSnippet: `def product(initial, *nums):
    result = initial
    for n in nums:
        result *= n
    return result

print(product(2, 3, 4, 5))`,
        correctAnswer: '120',
        explanation: '`initial` is 2, `nums` is `(3, 4, 5)`. 2 * 3 * 4 * 5 = 120.'
      },
      {
        id: 'm8-q09',
        moduleId: 'm8',
        topicId: 'kwargs',
        topicTitle: '**kwargs',
        type: 'output',
        points: 2,
        prompt: 'What is the output of the following function call?',
        codeSnippet: `def build_tag(tag, **attrs):
    attr_str = " ".join(f'{k}="{v}"' for k, v in sorted(attrs.items()))
    return f"<{tag} {attr_str}>" if attr_str else f"<{tag}>"

print(build_tag("a", href="https://levelup.dev", target="_blank"))`,
        correctAnswer: '<a href="https://levelup.dev" target="_blank">',
        explanation: 'Constructs the HTML anchor tag with sorted attribute key-value pairs.'
      },
      {
        id: 'm8-q10',
        moduleId: 'm8',
        topicId: 'lambda-functions',
        topicTitle: 'Lambda Functions',
        type: 'mcq',
        points: 1,
        prompt: 'Which of the following operations CANNOT be performed inside a Python lambda expression?',
        options: [
          'Ternary conditional expression `x if cond else y`',
          'Calling another function `func(x)`',
          'Multiple statements or assignment operations `x = 5; return x`',
          'Arithmetic calculation `x * y + z`'
        ],
        correctAnswer: 2,
        explanation: 'Lambda functions can only contain a single expression; assignment statements and multiple lines are illegal.'
      },
      {
        id: 'm8-q11',
        moduleId: 'm8',
        topicId: 'recursion',
        topicTitle: 'Recursion',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this recursive string function?',
        codeSnippet: `def reverse_str(s):
    if len(s) <= 1:
        return s
    return reverse_str(s[1:]) + s[0]

print(reverse_str("PYTHON"))`,
        correctAnswer: 'NOHTYP',
        explanation: 'Recursively peels the first character and appends it at the end of the reversed tail, producing "NOHTYP".'
      },
      {
        id: 'm8-q12',
        moduleId: 'm8',
        topicId: 'keyword-arguments',
        topicTitle: 'Keyword Arguments',
        type: 'mcq',
        points: 1,
        prompt: 'Given `def func(a, b, c=10, d=20): pass`, which of the following calls is INVALID?',
        options: [
          'func(1, 2, d=50)',
          'func(a=1, b=2, c=3, d=4)',
          'func(1, 2, 3, 4)',
          'func(a=1, 2, c=3)'
        ],
        correctAnswer: 3,
        explanation: 'Positional arguments cannot follow keyword arguments (`func(a=1, 2, ...)` raises SyntaxError).'
      },
      {
        id: 'm8-q13',
        moduleId: 'm8',
        topicId: 'recursion',
        topicTitle: 'Recursion',
        type: 'code-writing',
        points: 4,
        prompt: 'Write a recursive function `sum_digits(n)` that calculates the sum of all digits of a non-negative integer `n`. (Do NOT convert n to a string).',
        starterCode: `def sum_digits(n):
    # Write recursive logic here
    pass

import sys
if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        print(sum_digits(int(line)))`,
        solutionCode: `def sum_digits(n):
    if n < 10:
        return n
    return (n % 10) + sum_digits(n // 10)

import sys
if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        print(sum_digits(int(line)))`,
        testCases: [
          { input: '12345', expectedOutput: '15' },
          { input: '908', expectedOutput: '17' },
          { input: '0', expectedOutput: '0' }
        ],
        explanation: 'Base case: `n < 10` returns `n`. Recursive case: `(n % 10) + sum_digits(n // 10)`.'
      },
      {
        id: 'm8-q14',
        moduleId: 'm8',
        topicId: 'args',
        topicTitle: '*args',
        type: 'code-writing',
        points: 3,
        prompt: 'Write a function `filter_positives(*numbers)` that takes variable numeric arguments and returns a list containing only the positive numbers (> 0).',
        starterCode: `def filter_positives(*numbers):
    # Return list of numbers > 0
    pass

import sys
if __name__ == "__main__":
    nums = [int(x) for x in sys.stdin.read().split() if x.strip()]
    print(filter_positives(*nums))`,
        solutionCode: `def filter_positives(*numbers):
    return [n for n in numbers if n > 0]

import sys
if __name__ == "__main__":
    nums = [int(x) for x in sys.stdin.read().split() if x.strip()]
    print(filter_positives(*nums))`,
        testCases: [
          { input: '-5 10 -2 3 0 8', expectedOutput: '[10, 3, 8]' },
          { input: '-1 -2 -3', expectedOutput: '[]' },
          { input: '1 2 3', expectedOutput: '[1, 2, 3]' }
        ],
        explanation: 'Collects variable arguments into a tuple `numbers` and filters with `n > 0`.'
      },
      {
        id: 'm8-q15',
        moduleId: 'm8',
        topicId: 'lambda-functions',
        topicTitle: 'Lambda Functions',
        type: 'code-writing',
        points: 3,
        prompt: 'Write a function `sort_by_last_name(names_list)` that takes a list of full name strings (e.g. `["John Doe", "Jane Smith"]`) and sorts them alphabetically by their LAST name using `sorted()` with a lambda key.',
        starterCode: `def sort_by_last_name(names_list):
    # Sort names by last name using lambda
    pass

import sys
if __name__ == "__main__":
    lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    print(sort_by_last_name(lines))`,
        solutionCode: `def sort_by_last_name(names_list):
    return sorted(names_list, key=lambda name: name.split()[-1])

import sys
if __name__ == "__main__":
    lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    print(sort_by_last_name(lines))`,
        testCases: [
          {
            input: "Swamy Guradasu\nAlex Rivera\nAnanya Sharma",
            expectedOutput: "['Swamy Guradasu', 'Alex Rivera', 'Ananya Sharma']"
          },
          {
            input: "John Doe\nJane Smith\nAlan Turing",
            expectedOutput: "['John Doe', 'Jane Smith', 'Alan Turing']"
          }
        ],
        explanation: '`lambda name: name.split()[-1]` extracts the last name as the sort key.'
      },
      {
        id: 'm8-q16',
        moduleId: 'm8',
        topicId: 'recursion',
        topicTitle: 'Recursion',
        type: 'output',
        points: 2,
        prompt: 'What is the output of `power(2, 4)`?',
        codeSnippet: `def power(base, exp):
    if exp == 0:
        return 1
    return base * power(base, exp - 1)

print(power(2, 4))`,
        correctAnswer: '16',
        explanation: '2^4 = 2 * 2 * 2 * 2 = 16.'
      },
      {
        id: 'm8-q17',
        moduleId: 'm8',
        topicId: 'kwargs',
        topicTitle: '**kwargs',
        type: 'output',
        points: 2,
        prompt: 'What will be the output of this Python code snippet?',
        codeSnippet: `def count_roles(**users):
    counts = {}
    for user, role in users.items():
        counts[role] = counts.get(role, 0) + 1
    return counts

print(count_roles(u1="dev", u2="qa", u3="dev", u4="dev"))`,
        correctAnswer: "{'dev': 3, 'qa': 1}",
        explanation: 'Tallies user roles: "dev" appears 3 times and "qa" appears 1 time.'
      },
      {
        id: 'm8-q18',
        moduleId: 'm8',
        topicId: 'default-arguments',
        topicTitle: 'Default Arguments',
        type: 'output',
        points: 2,
        prompt: 'What will be printed when running this code?',
        codeSnippet: `def append_item(x, l=None):
    if l is None:
        l = []
    l.append(x)
    return l

a = append_item(1)
b = append_item(2)
print(a, b)`,
        correctAnswer: '[1] [2]',
        explanation: 'Using `None` as the default sentinel ensures a fresh independent list is created on each call.'
      }
    ]
  },

  // =========================================================================
  // MODULE 9 ASSIGNMENT BANK (Modules & Packages)
  // =========================================================================
  m9: {
    moduleId: 'm9',
    title: 'Module 9 Assignment: Modules & Packages',
    timeLimitMinutes: 25,
    sampleCount: 12,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm9-q01',
        moduleId: 'm9',
        topicId: 'importing-modules',
        topicTitle: 'Importing Modules',
        type: 'mcq',
        points: 1,
        prompt: 'What happens the second time a module is imported in the same Python process?',
        options: [
          'Python re-executes all top-level statements in the module file',
          'Python retrieves the already compiled module from `sys.modules` without re-executing it',
          'A ModuleReimportWarning is raised',
          'The module is re-downloaded from PyPI'
        ],
        correctAnswer: 1,
        explanation: 'Python caches imported modules in `sys.modules`; subsequent imports retrieve the cached instance.'
      },
      {
        id: 'm9-q02',
        moduleId: 'm9',
        topicId: 'python-pip',
        topicTitle: 'Python pip',
        type: 'mcq',
        points: 1,
        prompt: 'Which terminal command installs all packages listed in a project `requirements.txt` file?',
        options: [
          'pip install -r requirements.txt',
          'pip get requirements.txt',
          'pip sync requirements.txt',
          'pip run requirements.txt'
        ],
        correctAnswer: 0,
        explanation: 'The `-r` flag instructs pip to read package requirements from the specified file.'
      },
      {
        id: 'm9-q03',
        moduleId: 'm9',
        topicId: 'creating-your-own-module',
        topicTitle: 'Creating Your Own Module',
        type: 'output',
        points: 2,
        prompt: 'If a script named `math_ops.py` is imported into `main.py`, what will `print(__name__)` output when executed inside `math_ops.py`?',
        correctAnswer: 'math_ops',
        explanation: 'When imported as a module, `__name__` equals the module name ("math_ops").'
      },
      {
        id: 'm9-q04',
        moduleId: 'm9',
        topicId: 'standard-library-overview',
        topicTitle: 'Standard Library Overview',
        type: 'output',
        points: 2,
        prompt: 'What will be the output of this Python code snippet?',
        codeSnippet: `from collections import Counter
data = ["cat", "dog", "cat", "bird", "dog", "cat"]
c = Counter(data)
print(c.most_common(1)[0])`,
        correctAnswer: "('cat', 3)",
        explanation: '"cat" is the most common element with a count of 3.'
      },
      {
        id: 'm9-q05',
        moduleId: 'm9',
        topicId: 'importing-modules',
        topicTitle: 'Importing Modules',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which of the following are VALID Python import statements? (Select all that apply)',
        options: [
          'import datetime as dt',
          'from math import sqrt, pi',
          'import sqrt from math',
          'from collections import defaultdict as ddict'
        ],
        correctAnswer: [0, 1, 3],
        explanation: '`import sqrt from math` is invalid syntax (correct syntax is `from math import sqrt`).'
      },
      {
        id: 'm9-q06',
        moduleId: 'm9',
        topicId: 'creating-your-own-module',
        topicTitle: 'Creating Your Own Module',
        type: 'mcq',
        points: 1,
        prompt: 'What is the primary reason for using the `if __name__ == "__main__":` idiom?',
        options: [
          'To make the script run with administrator privileges',
          'To ensure certain code only runs when the script is executed directly and not when imported',
          'To automatically compile the file to C language',
          'To prevent the file from being edited'
        ],
        correctAnswer: 1,
        explanation: 'It guards entry-point code from executing when the file is imported into other modules.'
      },
      {
        id: 'm9-q07',
        moduleId: 'm9',
        topicId: 'standard-library-overview',
        topicTitle: 'Standard Library Overview',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `import os
path = os.path.join("users", "levelup", "profile.py")
print(path.replace("\\\\", "/"))`,
        correctAnswer: 'users/levelup/profile.py',
        explanation: '`os.path.join` joins path segments with the appropriate OS separator.'
      },
      {
        id: 'm9-q08',
        moduleId: 'm9',
        topicId: 'importing-modules',
        topicTitle: 'Importing Modules',
        type: 'debugging',
        points: 2,
        prompt: 'A developer created a file named `random.py` in their project directory. Now `import random; random.randint(1, 10)` throws `AttributeError: module \'random\' has no attribute \'randint\'`. What is the root cause?',
        options: [
          'The Python interpreter needs to be reinstalled',
          'The local file `random.py` shadows the standard library module because the current directory is searched first in `sys.path`',
          'pip uninstalled the random library',
          'randint was deprecated in Python 3'
        ],
        correctAnswer: 1,
        explanation: 'Local files matching standard library names shadow the built-in modules due to `sys.path` precedence.'
      },
      {
        id: 'm9-q09',
        moduleId: 'm9',
        topicId: 'python-pip',
        topicTitle: 'Python pip',
        type: 'output',
        points: 2,
        prompt: 'Which CLI command exports all currently installed packages and their exact versions into requirements.txt?',
        correctAnswer: 'pip freeze > requirements.txt',
        explanation: '`pip freeze > requirements.txt` dumps installed package versions to requirements.txt.'
      },
      {
        id: 'm9-q10',
        moduleId: 'm9',
        topicId: 'standard-library-overview',
        topicTitle: 'Standard Library Overview',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this code snippet using `collections.defaultdict`?',
        codeSnippet: `from collections import defaultdict
d = defaultdict(int)
d["a"] += 5
print(d["a"], d["b"])`,
        correctAnswer: '5 0',
        explanation: '`defaultdict(int)` defaults missing keys to 0, so accessing `d["b"]` returns 0 without raising KeyError.'
      },
      {
        id: 'm9-q11',
        moduleId: 'm9',
        topicId: 'creating-your-own-module',
        topicTitle: 'Creating Your Own Module',
        type: 'code-writing',
        points: 4,
        prompt: 'Create a custom module function `parse_csv_header(header_line)` that takes a comma-separated string (e.g. `"id, name , age ,score"`) and returns a list of cleaned, stripped lowercase column names: `[\'id\', \'name\', \'age\', \'score\']`.',
        starterCode: `def parse_csv_header(header_line):
    # Return cleaned lowercase header list
    pass

import sys
if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        print(parse_csv_header(line))`,
        solutionCode: `def parse_csv_header(header_line):
    return [col.strip().lower() for col in header_line.split(",") if col.strip()]

import sys
if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        print(parse_csv_header(line))`,
        testCases: [
          {
            input: 'id, NAME , Age , Score ',
            expectedOutput: "['id', 'name', 'age', 'score']"
          },
          {
            input: 'item_id,price,QUANTITY',
            expectedOutput: "['item_id', 'price', 'quantity']"
          }
        ],
        explanation: 'Splits by comma, strips whitespace, and converts to lowercase.'
      },
      {
        id: 'm9-q12',
        moduleId: 'm9',
        topicId: 'standard-library-overview',
        topicTitle: 'Standard Library Overview',
        type: 'code-writing',
        points: 4,
        prompt: 'Write a function `group_anagrams(words)` using `collections.defaultdict` that groups a list of words into anagram buckets, returning a list of grouped word lists.',
        starterCode: `from collections import defaultdict

def group_anagrams(words):
    # Group words by sorted characters
    pass

import sys
if __name__ == "__main__":
    words_input = sys.stdin.read().split()
    groups = group_anagrams(words_input)
    print(sorted([sorted(g) for g in groups]))`,
        solutionCode: `from collections import defaultdict

def group_anagrams(words):
    buckets = defaultdict(list)
    for w in words:
        key = "".join(sorted(w))
        buckets[key].append(w)
    return list(buckets.values())

import sys
if __name__ == "__main__":
    words_input = sys.stdin.read().split()
    groups = group_anagrams(words_input)
    print(sorted([sorted(g) for g in groups]))`,
        testCases: [
          {
            input: 'eat tea tan ate nat bat',
            expectedOutput: "[['ate', 'eat', 'tea'], ['bat'], ['nat', 'tan']]"
          },
          {
            input: 'listen silent apple',
            expectedOutput: "[['apple'], ['listen', 'silent']]"
          }
        ],
        explanation: 'Uses `"".join(sorted(w))` as the anagram dictionary key to group words.'
      },
      {
        id: 'm9-q13',
        moduleId: 'm9',
        topicId: 'standard-library-overview',
        topicTitle: 'Standard Library Overview',
        type: 'mcq',
        points: 1,
        prompt: 'Which standard library module provides mathematical constants like pi and functions like sqrt, floor, and ceil?',
        options: ['sys', 'math', 'calc', 'numbers'],
        correctAnswer: 1,
        explanation: 'The `math` module provides standard mathematical constants and functions.'
      },
      {
        id: 'm9-q14',
        moduleId: 'm9',
        topicId: 'importing-modules',
        topicTitle: 'Importing Modules',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by `import math; print(math.ceil(4.1))`?',
        correctAnswer: '5',
        explanation: '`math.ceil(4.1)` rounds up to the smallest integer >= 4.1, which is 5.'
      },
      {
        id: 'm9-q15',
        moduleId: 'm9',
        topicId: 'creating-your-own-module',
        topicTitle: 'Creating Your Own Module',
        type: 'mcq',
        points: 1,
        prompt: 'What special file must be placed inside a folder to instruct Python to treat the folder as a package?',
        options: ['__package__.py', '__init__.py', '__main__.py', '__module__.py'],
        correctAnswer: 1,
        explanation: '`__init__.py` marks a directory as a Python package.'
      },
      {
        id: 'm9-q16',
        moduleId: 'm9',
        topicId: 'standard-library-overview',
        topicTitle: 'Standard Library Overview',
        type: 'output',
        points: 2,
        prompt: 'What is the output of `from datetime import timedelta; print(timedelta(days=2).total_seconds())`?',
        correctAnswer: '172800.0',
        explanation: '2 days = 2 * 24 * 3600 = 172800.0 seconds.'
      }
    ]
  },

  // =========================================================================
  // MODULE 10 ASSIGNMENT BANK (File Handling)
  // =========================================================================
  m10: {
    moduleId: 'm10',
    title: 'Module 10 Assignment: File Handling',
    timeLimitMinutes: 30,
    sampleCount: 14,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm10-q01',
        moduleId: 'm10',
        topicId: 'reading-text-files',
        topicTitle: 'Reading Text Files',
        type: 'mcq',
        points: 1,
        prompt: 'What is the default mode when calling `open("file.txt")` without a second argument?',
        options: ['"w" (write)', '"r" (read text)', '"a" (append)', '"rb" (read binary)'],
        correctAnswer: 1,
        explanation: 'The default mode for `open()` is `"r"` (read text mode).'
      },
      {
        id: 'm10-q02',
        moduleId: 'm10',
        topicId: 'with-statement',
        topicTitle: 'The with Statement',
        type: 'mcq',
        points: 1,
        prompt: 'Why is using `with open(...) as f:` the recommended Python best practice for file I/O?',
        options: [
          'It automatically compresses file content on disk',
          'It guarantees the file is properly closed even if an exception occurs inside the block',
          'It increases hard drive read speed by 10x',
          'It deletes the file when execution completes'
        ],
        correctAnswer: 1,
        explanation: 'Context managers guarantee `__exit__` execution and automatic file descriptor cleanup.'
      },
      {
        id: 'm10-q03',
        moduleId: 'm10',
        topicId: 'writing-text-files',
        topicTitle: 'Writing Text Files',
        type: 'output',
        points: 2,
        prompt: 'What will be stored in a file after executing: `f.write("Line1\\n"); f.write("Line2")`?',
        correctAnswer: 'Line1\nLine2',
        explanation: '`f.write("Line1\\n")` writes "Line1\\n" followed immediately by "Line2".'
      },
      {
        id: 'm10-q04',
        moduleId: 'm10',
        topicId: 'csv-files',
        topicTitle: 'CSV Files',
        type: 'output',
        points: 2,
        prompt: 'What is the output of this Python code snippet parsing CSV lines?',
        codeSnippet: `import csv, io
raw = "id,score\\n1,85\\n2,92"
reader = csv.DictReader(io.StringIO(raw))
total = sum(int(row["score"]) for row in reader)
print(total)`,
        correctAnswer: '177',
        explanation: '85 + 92 = 177.'
      },
      {
        id: 'm10-q05',
        moduleId: 'm10',
        topicId: 'json-files',
        topicTitle: 'JSON Files',
        type: 'output',
        points: 2,
        prompt: 'What will `print(json.loads(\'{"active": true, "count": 5}\')["active"])` output in Python?',
        correctAnswer: 'True',
        explanation: 'JSON `true` deserializes to Python boolean `True`.'
      },
      {
        id: 'm10-q06',
        moduleId: 'm10',
        topicId: 'writing-text-files',
        topicTitle: 'Writing Text Files',
        type: 'mcq',
        points: 1,
        prompt: 'What is the difference between opening a file in `"w"` mode versus `"a"` mode?',
        options: [
          '"w" mode overwrites existing content; "a" mode appends to the end of the file',
          '"w" mode is read-only; "a" mode is write-only',
          '"w" mode creates a binary file; "a" mode creates a text file',
          'There is no difference'
        ],
        correctAnswer: 0,
        explanation: '"w" mode truncates existing files to 0 bytes; "a" mode appends without deleting existing content.'
      },
      {
        id: 'm10-q07',
        moduleId: 'm10',
        topicId: 'json-files',
        topicTitle: 'JSON Files',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which statements regarding Python `json` module functions are TRUE? (Select all that apply)',
        options: [
          '`json.dumps()` converts a Python object into a JSON formatted string',
          '`json.loads()` parses JSON from a string into Python data structures',
          '`json.load()` reads and parses JSON directly from a file object',
          'Python `tuple` serializes to a JSON array `[]`'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: 'All statements correctly describe the Python `json` module APIs and type mapping.'
      },
      {
        id: 'm10-q08',
        moduleId: 'm10',
        topicId: 'reading-text-files',
        topicTitle: 'Reading Text Files',
        type: 'output',
        points: 2,
        prompt: 'What will be printed when reading lines using `.splitlines()`?',
        codeSnippet: `content = "Apple\\nBanana\\nCherry"
lines = [line.upper() for line in content.splitlines()]
print(", ".join(lines))`,
        correctAnswer: 'APPLE, BANANA, CHERRY',
        explanation: 'Upper-cases and joins the 3 lines with comma separator.'
      },
      {
        id: 'm10-q09',
        moduleId: 'm10',
        topicId: 'with-statement',
        topicTitle: 'The with Statement',
        type: 'output',
        points: 2,
        prompt: 'What error is raised if you try to perform `f.read()` after exiting the `with` block?',
        correctAnswer: 'ValueError',
        explanation: 'Attempting I/O on a closed file descriptor raises `ValueError: I/O operation on closed file`.'
      },
      {
        id: 'm10-q10',
        moduleId: 'm10',
        topicId: 'csv-files',
        topicTitle: 'CSV Files',
        type: 'debugging',
        points: 2,
        prompt: 'When writing CSV files on Windows, why should `open(..., newline="")` always be specified?',
        options: [
          'To prevent the CSV writer from producing unwanted blank lines between rows',
          'To encrypt the output CSV file',
          'To sort rows alphabetically',
          'To force UTF-16 encoding'
        ],
        correctAnswer: 0,
        explanation: 'Windows translates `\\n` to `\\r\\n`; passing `newline=""` prevents double newline blank rows.'
      },
      {
        id: 'm10-q11',
        moduleId: 'm10',
        topicId: 'json-files',
        topicTitle: 'JSON Files',
        type: 'code-tracing',
        points: 2,
        prompt: 'Trace the JSON serialization and deserialization in this snippet. What is the value of `data["scores"][1]`?',
        codeSnippet: `import json
raw = '{"name": "Swamy", "scores": [88, 92, 95]}'
data = json.loads(raw)
print(data["scores"][1])`,
        correctAnswer: '92',
        explanation: '`scores` array is parsed as a Python list; index 1 is 92.'
      },
      {
        id: 'm10-q12',
        moduleId: 'm10',
        topicId: 'csv-files',
        topicTitle: 'CSV Files',
        type: 'code-writing',
        points: 4,
        prompt: 'Write a function `process_student_csv(csv_text)` that parses CSV student records (`name,math,science,english`), calculates each student\'s total marks, and returns the name of the top-ranking student.',
        starterCode: `import csv, io

def process_student_csv(csv_text):
    # Return name of top ranking student
    pass

import sys
if __name__ == "__main__":
    text = sys.stdin.read().strip()
    if text:
        print(process_student_csv(text))`,
        solutionCode: `import csv, io

def process_student_csv(csv_text):
    reader = csv.DictReader(io.StringIO(csv_text.strip()))
    top_name = None
    top_total = -1
    for row in reader:
        total = int(row["math"]) + int(row["science"]) + int(row["english"])
        if total > top_total:
            top_total = total
            top_name = row["name"]
    return top_name

import sys
if __name__ == "__main__":
    text = sys.stdin.read().strip()
    if text:
        print(process_student_csv(text))`,
        testCases: [
          {
            input: "name,math,science,english\nSwamy,90,95,85\nAlex,92,88,89\nAnanya,95,98,96",
            expectedOutput: 'Ananya'
          },
          {
            input: "name,math,science,english\nKiran,70,65,80\nDivya,85,90,88",
            expectedOutput: 'Divya'
          }
        ],
        explanation: 'Parses rows with DictReader, calculates total sum of subject marks, and identifies highest scorer.'
      },
      {
        id: 'm10-q13',
        moduleId: 'm10',
        topicId: 'json-files',
        topicTitle: 'JSON Files',
        type: 'code-writing',
        points: 4,
        prompt: 'Write a function `filter_active_users(json_string)` that parses a JSON array of user objects (`[{"id": 1, "name": "Swamy", "active": true}, ...]`) and returns a sorted list of names of all ACTIVE users.',
        starterCode: `import json

def filter_active_users(json_string):
    # Return sorted list of active user names
    pass

import sys
if __name__ == "__main__":
    text = sys.stdin.read().strip()
    if text:
        print(filter_active_users(text))`,
        solutionCode: `import json

def filter_active_users(json_string):
    users = json.loads(json_string)
    active_names = [u["name"] for u in users if u.get("active") is True]
    return sorted(active_names)

import sys
if __name__ == "__main__":
    text = sys.stdin.read().strip()
    if text:
        print(filter_active_users(text))`,
        testCases: [
          {
            input: '[{"name": "Swamy", "active": true}, {"name": "Bot", "active": false}, {"name": "Alex", "active": true}]',
            expectedOutput: "['Alex', 'Swamy']"
          },
          {
            input: '[{"name": "Zara", "active": false}, {"name": "Liam", "active": false}]',
            expectedOutput: '[]'
          }
        ],
        explanation: 'Parses JSON with `json.loads` and filters names where `active is True`.'
      },
      {
        id: 'm10-q14',
        moduleId: 'm10',
        topicId: 'reading-text-files',
        topicTitle: 'Reading Text Files',
        type: 'output',
        points: 2,
        prompt: 'What will be printed when counting word frequencies from a text stream?',
        codeSnippet: `text = "python is great and python is fast"
words = text.split()
print(words.count("python"), words.count("is"))`,
        correctAnswer: '2 2',
        explanation: '"python" occurs twice and "is" occurs twice.'
      },
      {
        id: 'm10-q15',
        moduleId: 'm10',
        topicId: 'writing-text-files',
        topicTitle: 'Writing Text Files',
        type: 'output',
        points: 2,
        prompt: 'What is the length of `"Hello\\nWorld".splitlines()`?',
        correctAnswer: '2',
        explanation: 'There are two lines: "Hello" and "World".'
      },
      {
        id: 'm10-q16',
        moduleId: 'm10',
        topicId: 'json-files',
        topicTitle: 'JSON Files',
        type: 'mcq',
        points: 1,
        prompt: 'What does Python\'s `None` value convert to in a JSON string serialized via `json.dumps()`?',
        options: ['"None"', 'null', 'undefined', 'nil'],
        correctAnswer: 1,
        explanation: 'Python `None` maps to JSON `null`.'
      },
      {
        id: 'm10-q17',
        moduleId: 'm10',
        topicId: 'csv-files',
        topicTitle: 'CSV Files',
        type: 'output',
        points: 2,
        prompt: 'What is the output of `len(csv.fieldnames)` if a CSV header line is `"a,b,c,d"`?',
        codeSnippet: `import csv, io
reader = csv.DictReader(io.StringIO("a,b,c,d\\n1,2,3,4"))
print(len(reader.fieldnames))`,
        correctAnswer: '4',
        explanation: 'There are 4 fieldnames ("a", "b", "c", "d").'
      },
      {
        id: 'm10-q18',
        moduleId: 'm10',
        topicId: 'reading-text-files',
        topicTitle: 'Reading Text Files',
        type: 'mcq',
        points: 1,
        prompt: 'Which encoding should always be specified when opening text files in modern Python applications for portability?',
        options: ['ascii', 'utf-8', 'latin-1', 'cp1252'],
        correctAnswer: 1,
        explanation: '`utf-8` is the standard encoding for modern text files across all operating systems.'
      }
    ]
  },

  // =========================================================================
  // MODULE 11 ASSIGNMENT BANK (Exception Handling)
  // =========================================================================
  m11: {
    moduleId: 'm11',
    title: 'Module 11 Assignment: Exception Handling',
    timeLimitMinutes: 30,
    sampleCount: 14,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm11-q01',
        moduleId: 'm11',
        topicId: 'try-block',
        topicTitle: 'The try Block',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `log = []
try:
    log.append("T1")
    val = 10 / 0
    log.append("T2")
except ZeroDivisionError:
    log.append("E1")
print("-".join(log))`,
        correctAnswer: 'T1-E1',
        explanation: 'Division by zero on line 4 halts the try block (skipping "T2") and jumps immediately to append "E1".'
      },
      {
        id: 'm11-q02',
        moduleId: 'm11',
        topicId: 'except-block',
        topicTitle: 'The except Block',
        type: 'mcq',
        points: 1,
        prompt: 'Why should specific exception classes be caught instead of using a bare `except:`?',
        options: [
          'Bare except reduces execution speed by 80%',
          'Bare except intercepts KeyboardInterrupt and SystemExit, preventing normal program termination',
          'Bare except is not supported in Python 3',
          'Bare except deletes local variables'
        ],
        correctAnswer: 1,
        explanation: 'Bare `except:` catches `BaseException`, intercepting Ctrl+C and exit signals.'
      },
      {
        id: 'm11-q03',
        moduleId: 'm11',
        topicId: 'else-block',
        topicTitle: 'The else Block',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `try:
    x = int("100")
except ValueError:
    print("Caught ValueError")
else:
    print("Parsed successfully:", x)`,
        correctAnswer: 'Parsed successfully: 100',
        explanation: 'Because `int("100")` succeeded without raising an exception, the `else` block executes.'
      },
      {
        id: 'm11-q04',
        moduleId: 'm11',
        topicId: 'finally-block',
        topicTitle: 'The finally Block',
        type: 'output',
        points: 2,
        prompt: 'What will this Python function return?',
        codeSnippet: `def compute():
    try:
        return "TRY_VAL"
    finally:
        print("CLEANUP")

res = compute()
print("RES:", res)`,
        correctAnswer: 'CLEANUP\nRES: TRY_VAL',
        explanation: 'The `finally` block executes before the function return finishes dispatching.'
      },
      {
        id: 'm11-q05',
        moduleId: 'm11',
        topicId: 'custom-exceptions',
        topicTitle: 'Custom Exceptions',
        type: 'mcq',
        points: 1,
        prompt: 'Which base class should custom application exceptions inherit from in Python?',
        options: ['BaseException', 'Exception', 'RuntimeError', 'Object'],
        correctAnswer: 1,
        explanation: 'Custom application exceptions should inherit from `Exception`.'
      },
      {
        id: 'm11-q06',
        moduleId: 'm11',
        topicId: 'except-block',
        topicTitle: 'The except Block',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this code handling multiple exception types?',
        codeSnippet: `def test_lookup(container, key):
    try:
        return container[key]
    except KeyError:
        return "KEY_ERROR"
    except IndexError:
        return "INDEX_ERROR"

print(test_lookup([10, 20], 5), test_lookup({"a": 1}, "b"))`,
        correctAnswer: 'INDEX_ERROR KEY_ERROR',
        explanation: 'List lookup on index 5 raises IndexError; dictionary lookup on "b" raises KeyError.'
      },
      {
        id: 'm11-q07',
        moduleId: 'm11',
        topicId: 'custom-exceptions',
        topicTitle: 'Custom Exceptions',
        type: 'code-tracing',
        points: 2,
        prompt: 'Trace the execution of this custom banking exception code. What is the output?',
        codeSnippet: `class InsufficientFunds(Exception):
    def __init__(self, deficit):
        self.deficit = deficit

try:
    raise InsufficientFunds(45)
except InsufficientFunds as e:
    print(f"Deficit: \${e.deficit}")`,
        correctAnswer: 'Deficit: \$45',
        explanation: 'Custom exception attributes are accessible on the caught exception object `e`.'
      },
      {
        id: 'm11-q08',
        moduleId: 'm11',
        topicId: 'else-block',
        topicTitle: 'The else Block',
        type: 'mcq',
        points: 1,
        prompt: 'When does the `else` block in a `try-except-else-finally` construct execute?',
        options: [
          'Whenever an exception is caught and handled',
          'Only when the `try` block executes without raising any exceptions',
          'Every time the program runs, before `try`',
          'Only if the `finally` block fails'
        ],
        correctAnswer: 1,
        explanation: '`else` runs only when zero exceptions occur in `try`.'
      },
      {
        id: 'm11-q09',
        moduleId: 'm11',
        topicId: 'finally-block',
        topicTitle: 'The finally Block',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which statements about the `finally` block are TRUE? (Select all that apply)',
        options: [
          '`finally` executes even if an unhandled exception occurs in the try block',
          '`finally` executes even if a `return` statement is encountered in the try block',
          '`finally` must appear after all `except` and `else` blocks',
          '`finally` only runs when an error occurred'
        ],
        correctAnswer: [0, 1, 2],
        explanation: '`finally` always executes under all circumstances and must be placed last.'
      },
      {
        id: 'm11-q10',
        moduleId: 'm11',
        topicId: 'custom-exceptions',
        topicTitle: 'Custom Exceptions',
        type: 'output',
        points: 2,
        prompt: 'What keyword is used in Python to trigger an exception deliberately?',
        correctAnswer: 'raise',
        explanation: 'The `raise` statement triggers an exception.'
      },
      {
        id: 'm11-q11',
        moduleId: 'm11',
        topicId: 'except-block',
        topicTitle: 'The except Block',
        type: 'debugging',
        points: 2,
        prompt: 'Why is `except Exception:` placed before `except ValueError:` considered a logical bug?',
        options: [
          'It causes a SyntaxError at compile time',
          'Because `ValueError` is a subclass of `Exception`, `except Exception:` catches all errors first, making the `ValueError` block unreachable dead code',
          'It causes Python to uninstall the module',
          'It converts ValueErrors into ZeroDivisionErrors'
        ],
        correctAnswer: 1,
        explanation: 'Handlers are evaluated from top to bottom; parent exceptions shadow specific child exceptions.'
      },
      {
        id: 'm11-q12',
        moduleId: 'm11',
        topicId: 'custom-exceptions',
        topicTitle: 'Custom Exceptions',
        type: 'code-writing',
        points: 4,
        prompt: 'Create a bank withdrawal system with custom exceptions:\n1. Define `NegativeAmountError(Exception)` and `InsufficientFundsError(Exception)`.\n2. Write a function `withdraw(balance, amount)` that:\n   - Raises `NegativeAmountError` if `amount <= 0`\n   - Raises `InsufficientFundsError` if `amount > balance`\n   - Otherwise returns the updated balance (`balance - amount`).',
        starterCode: `# Define custom exceptions and withdraw function:
class NegativeAmountError(Exception): pass
class InsufficientFundsError(Exception): pass

def withdraw(balance, amount):
    # Implement validation and balance deduction
    pass

import sys
if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if len(lines) >= 2:
        bal, amt = float(lines[0]), float(lines[1])
        try:
            print(f"Remaining: {withdraw(bal, amt):.2f}")
        except NegativeAmountError:
            print("ERROR: NegativeAmountError")
        except InsufficientFundsError:
            print("ERROR: InsufficientFundsError")`,
        solutionCode: `class NegativeAmountError(Exception): pass
class InsufficientFundsError(Exception): pass

def withdraw(balance, amount):
    if amount <= 0:
        raise NegativeAmountError("Amount must be positive")
    if amount > balance:
        raise InsufficientFundsError("Insufficient funds")
    return balance - amount

import sys
if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if len(lines) >= 2:
        bal, amt = float(lines[0]), float(lines[1])
        try:
            print(f"Remaining: {withdraw(bal, amt):.2f}")
        except NegativeAmountError:
            print("ERROR: NegativeAmountError")
        except InsufficientFundsError:
            print("ERROR: InsufficientFundsError")`,
        testCases: [
          { input: '100.00 40.00', expectedOutput: 'Remaining: 60.00' },
          { input: '50.00 80.00', expectedOutput: 'ERROR: InsufficientFundsError' },
          { input: '100.00 -10.00', expectedOutput: 'ERROR: NegativeAmountError' }
        ],
        explanation: 'Enforces business rule validation and throws domain-specific custom exception classes.'
      },
      {
        id: 'm11-q13',
        moduleId: 'm11',
        topicId: 'try-block',
        topicTitle: 'The try Block',
        type: 'code-writing',
        points: 4,
        prompt: 'Write a function `safe_int_conversion(items_list)` that takes a list of strings and returns a list containing only the successfully converted integers (skipping items that raise `ValueError`).',
        starterCode: `def safe_int_conversion(items_list):
    # Convert valid strings to ints, skip invalids
    pass

import sys
if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    print(safe_int_conversion(tokens))`,
        solutionCode: `def safe_int_conversion(items_list):
    result = []
    for item in items_list:
        try:
            result.append(int(item))
        except ValueError:
            pass
    return result

import sys
if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    print(safe_int_conversion(tokens))`,
        testCases: [
          { input: '10 abc 25 3.14 99 test', expectedOutput: '[10, 25, 99]' },
          { input: 'hello world', expectedOutput: '[]' },
          { input: '1 2 3', expectedOutput: '[1, 2, 3]' }
        ],
        explanation: 'Uses try-except inside loop to catch ValueError on invalid conversions.'
      },
      {
        id: 'm11-q14',
        moduleId: 'm11',
        topicId: 'except-block',
        topicTitle: 'The except Block',
        type: 'output',
        points: 2,
        prompt: 'What will be printed when inspecting the error message with `as err`?',
        codeSnippet: `try:
    int("hello")
except ValueError as err:
    print("Caught:", type(err).__name__)`,
        correctAnswer: 'Caught: ValueError',
        explanation: '`type(err).__name__` prints the name of the caught exception class ("ValueError").'
      },
      {
        id: 'm11-q15',
        moduleId: 'm11',
        topicId: 'finally-block',
        topicTitle: 'The finally Block',
        type: 'output',
        points: 2,
        prompt: 'What is printed by `try: pass \nfinally: print("DONE")`?',
        correctAnswer: 'DONE',
        explanation: '`finally` executes even when the `try` block is empty or finishes without error.'
      },
      {
        id: 'm11-q16',
        moduleId: 'm11',
        topicId: 'custom-exceptions',
        topicTitle: 'Custom Exceptions',
        type: 'mcq',
        points: 1,
        prompt: 'How do you re-raise the currently active exception inside an `except` block in Python?',
        options: ['raise current', 'raise', 'throw', 'rethrow()'],
        correctAnswer: 1,
        explanation: 'A bare `raise` statement re-raises the active exception.'
      }
    ]
  },

  // =========================================================================
  // MODULE 12 ASSIGNMENT BANK (Object-Oriented Programming I)
  // =========================================================================
  m12: {
    moduleId: 'm12',
    title: 'Module 12 Assignment: Object-Oriented Programming I',
    timeLimitMinutes: 30,
    sampleCount: 14,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm12-q01',
        moduleId: 'm12',
        topicId: 'classes',
        topicTitle: 'Classes',
        type: 'mcq',
        points: 1,
        prompt: 'What is the role of the `self` parameter in Python instance methods?',
        options: [
          'It is a global variable holding the Python version',
          'It represents the specific instance of the class upon which the method is called',
          'It creates a new thread for executing the method',
          'It is used to import external packages'
        ],
        correctAnswer: 1,
        explanation: '`self` is a reference to the current instance of the class.'
      },
      {
        id: 'm12-q02',
        moduleId: 'm12',
        topicId: 'init-method',
        topicTitle: 'The __init__ Constructor',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this Python code snippet?',
        codeSnippet: `class User:
    def __init__(self, username, role="student"):
        self.username = username
        self.role = role

u1 = User("Swamy")
u2 = User("Admin", role="superuser")
print(u1.username, u1.role, "|", u2.username, u2.role)`,
        correctAnswer: 'Swamy student | Admin superuser',
        explanation: '`u1` uses the default role "student"; `u2` overrides it with "superuser".'
      },
      {
        id: 'm12-q03',
        moduleId: 'm12',
        topicId: 'class-attributes',
        topicTitle: 'Class Attributes',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this code snippet tracking instances?',
        codeSnippet: `class Counter:
    total = 0
    def __init__(self):
        Counter.total += 1

c1 = Counter()
c2 = Counter()
c3 = Counter()
print(Counter.total)`,
        correctAnswer: '3',
        explanation: 'Each constructor invocation increments the shared `Counter.total` class attribute.'
      },
      {
        id: 'm12-q04',
        moduleId: 'm12',
        topicId: 'instance-attributes',
        topicTitle: 'Instance Attributes',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `class Item:
    def __init__(self, price):
        self.price = price

i1 = Item(100)
i2 = Item(200)
i1.price = 150
print(i1.price, i2.price)`,
        correctAnswer: '150 200',
        explanation: 'Modifying `i1.price` alters only instance `i1`; `i2.price` remains 200.'
      },
      {
        id: 'm12-q05',
        moduleId: 'm12',
        topicId: 'class-attributes',
        topicTitle: 'Class Attributes',
        type: 'output',
        points: 2,
        prompt: 'What is the dangerous result of class attribute mutation in this snippet?',
        codeSnippet: `class Cart:
    items = []
    def add(self, item):
        self.items.append(item)

c1 = Cart()
c2 = Cart()
c1.add("Laptop")
print(c2.items)`,
        correctAnswer: "['Laptop']",
        explanation: '`items` is a mutable class variable shared by all instances, so `c2` sees `c1`\'s added item.'
      },
      {
        id: 'm12-q06',
        moduleId: 'm12',
        topicId: 'objects',
        topicTitle: 'Objects',
        type: 'mcq',
        points: 1,
        prompt: 'Given `a = MyClass()` and `b = a`, what does `a is b` evaluate to?',
        options: ['True', 'False', 'None', 'TypeError'],
        correctAnswer: 0,
        explanation: '`b = a` creates an alias pointing to the exact same memory instance, so `a is b` is True.'
      },
      {
        id: 'm12-q07',
        moduleId: 'm12',
        topicId: 'init-method',
        topicTitle: 'The __init__ Constructor',
        type: 'mcq',
        points: 1,
        prompt: 'What return value is mandated for `__init__` in Python?',
        options: ['self', 'None', 'dict', 'boolean True'],
        correctAnswer: 1,
        explanation: '`__init__` must always return `None`.'
      },
      {
        id: 'm12-q08',
        moduleId: 'm12',
        topicId: 'instance-attributes',
        topicTitle: 'Instance Attributes',
        type: 'output',
        points: 2,
        prompt: 'What will be printed when inspecting the instance dictionary `__dict__`?',
        codeSnippet: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(5, 10)
print(p.__dict__["x"], p.__dict__["y"])`,
        correctAnswer: '5 10',
        explanation: 'Instance attributes are stored internally in `p.__dict__`.'
      },
      {
        id: 'm12-q09',
        moduleId: 'm12',
        topicId: 'class-attributes',
        topicTitle: 'Class Attributes',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which statements about Class Attributes vs Instance Attributes are TRUE? (Select all that apply)',
        options: [
          'Class attributes are defined inside the class body outside of methods and shared by all instances',
          'Instance attributes are assigned to `self` and unique to each object instance',
          'Assigning `self.class_attr = val` creates an instance variable that shadows the class variable on that instance',
          'Class attributes cannot be accessed using the class name'
        ],
        correctAnswer: [0, 1, 2],
        explanation: 'Class attributes are shared, instance attributes are unique, and assigning via `self.` shadows class attributes.'
      },
      {
        id: 'm12-q10',
        moduleId: 'm12',
        topicId: 'objects',
        topicTitle: 'Objects',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by `isinstance(10, (str, int, float))`?',
        correctAnswer: 'True',
        explanation: '10 is an instance of `int`, which is part of the tuple of allowed types.'
      },
      {
        id: 'm12-q11',
        moduleId: 'm12',
        topicId: 'classes',
        topicTitle: 'Classes',
        type: 'debugging',
        points: 2,
        prompt: 'Identify the error in this method definition: `def get_name(): return self.name`.',
        options: [
          'The method is missing the `self` parameter in its parameter list',
          'The return keyword cannot be used in a class',
          'Method names must begin with uppercase letters',
          'Classes cannot have functions'
        ],
        correctAnswer: 0,
        explanation: 'Instance methods must accept `self` as their first parameter (`def get_name(self):`).'
      },
      {
        id: 'm12-q12',
        moduleId: 'm12',
        topicId: 'classes',
        topicTitle: 'Classes',
        type: 'code-writing',
        points: 4,
        prompt: 'Create a `Student` class with:\n- `__init__(self, name, roll_no, marks_list)`\n- `get_total(self)` returning total marks\n- `get_average(self)` returning average marks (as float)\n- `get_status(self)` returning `"PASS"` if average >= 40.0 else `"FAIL"`.',
        starterCode: `class Student:
    # Implement Student class
    pass

import sys
if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if lines:
        name = lines[0].strip()
        roll_no = int(lines[1].strip())
        marks = [float(x) for x in lines[2].strip().split()]
        s = Student(name, roll_no, marks)
        print(f"{s.name} | Total: {int(s.get_total())} | Avg: {s.get_average():.2f} | Status: {s.get_status()}")`,
        solutionCode: `class Student:
    def __init__(self, name, roll_no, marks_list):
        self.name = name
        self.roll_no = roll_no
        self.marks = marks_list

    def get_total(self):
        return sum(self.marks)

    def get_average(self):
        return sum(self.marks) / len(self.marks) if self.marks else 0.0

    def get_status(self):
        return "PASS" if self.get_average() >= 40.0 else "FAIL"

import sys
if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if lines:
        name = lines[0].strip()
        roll_no = int(lines[1].strip())
        marks = [float(x) for x in lines[2].strip().split()]
        s = Student(name, roll_no, marks)
        print(f"{s.name} | Total: {int(s.get_total())} | Avg: {s.get_average():.2f} | Status: {s.get_status()}")`,
        testCases: [
          {
            input: "Swamy\n101\n85 92 78 90",
            expectedOutput: "Swamy | Total: 345 | Avg: 86.25 | Status: PASS"
          },
          {
            input: "Kiran\n102\n35 30 40 38",
            expectedOutput: "Kiran | Total: 143 | Avg: 35.75 | Status: FAIL"
          }
        ],
        explanation: 'Implements OOP class encapsulation with attributes and calculation methods.'
      },
      {
        id: 'm12-q13',
        moduleId: 'm12',
        topicId: 'class-attributes',
        topicTitle: 'Class Attributes',
        type: 'code-writing',
        points: 4,
        prompt: 'Create a `BankAccount` class where:\n- Class attribute `interest_rate = 0.05`\n- `__init__(self, owner, balance)`\n- `apply_interest(self)` adds `balance * interest_rate` to the balance\n- Class method `set_interest_rate(cls, new_rate)` updates `interest_rate` across the class.',
        starterCode: `class BankAccount:
    interest_rate = 0.05

    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def apply_interest(self):
        # Add interest
        pass

    @classmethod
    def set_interest_rate(cls, new_rate):
        # Update class interest rate
        pass

import sys
if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        b1 = BankAccount("Swamy", float(lines[0]))
        BankAccount.set_interest_rate(float(lines[1]))
        b1.apply_interest()
        print(f"{b1.owner}: {b1.balance:.2f}")`,
        solutionCode: `class BankAccount:
    interest_rate = 0.05

    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def apply_interest(self):
        self.balance += self.balance * BankAccount.interest_rate

    @classmethod
    def set_interest_rate(cls, new_rate):
        cls.interest_rate = new_rate

import sys
if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        b1 = BankAccount("Swamy", float(lines[0]))
        BankAccount.set_interest_rate(float(lines[1]))
        b1.apply_interest()
        print(f"{b1.owner}: {b1.balance:.2f}")`,
        testCases: [
          { input: "1000\n0.10", expectedOutput: "Swamy: 1100.00" },
          { input: "500\n0.04", expectedOutput: "Swamy: 520.00" }
        ],
        explanation: 'Demonstrates `@classmethod` and class attribute mutation.'
      },
      {
        id: 'm12-q14',
        moduleId: 'm12',
        topicId: 'objects',
        topicTitle: 'Objects',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by `class A: pass; print(type(A()).__name__)`?',
        correctAnswer: 'A',
        explanation: '`type(A()).__name__` returns "A".'
      },
      {
        id: 'm12-q15',
        moduleId: 'm12',
        topicId: 'init-method',
        topicTitle: 'The __init__ Constructor',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `class Box:
    def __init__(self, w, h):
        self.area = w * h

b = Box(4, 5)
print(b.area)`,
        correctAnswer: '20',
        explanation: '4 * 5 = 20.'
      },
      {
        id: 'm12-q16',
        moduleId: 'm12',
        topicId: 'classes',
        topicTitle: 'Classes',
        type: 'mcq',
        points: 1,
        prompt: 'What naming convention does PEP 8 recommend for Python class names?',
        options: ['snake_case', 'PascalCase (CamelCase)', 'kebab-case', 'SCREAMING_SNAKE_CASE'],
        correctAnswer: 1,
        explanation: 'Classes in Python should be named using PascalCase (e.g. `BankAccount`).'
      },
      {
        id: 'm12-q17',
        moduleId: 'm12',
        topicId: 'instance-attributes',
        topicTitle: 'Instance Attributes',
        type: 'output',
        points: 2,
        prompt: 'What is the output of `hasattr(Point(1, 2), "x")`?',
        codeSnippet: `class Point:
    def __init__(self, x, y): self.x = x; self.y = y
print(hasattr(Point(1, 2), "x"))`,
        correctAnswer: 'True',
        explanation: '`hasattr` checks if the object possesses the given attribute name.'
      },
      {
        id: 'm12-q18',
        moduleId: 'm12',
        topicId: 'class-attributes',
        topicTitle: 'Class Attributes',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `class Config:
    env = "dev"

c1 = Config()
c2 = Config()
Config.env = "prod"
print(c1.env, c2.env)`,
        correctAnswer: 'prod prod',
        explanation: 'Mutating `Config.env` updates the class attribute shared by `c1` and `c2`.'
      }
    ]
  },

  // =========================================================================
  // MODULE 13 ASSIGNMENT BANK (Object-Oriented Programming II - Hard)
  // =========================================================================
  m13: {
    moduleId: 'm13',
    title: 'Module 13 Assignment: Object-Oriented Programming II',
    timeLimitMinutes: 35,
    sampleCount: 15,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm13-q01',
        moduleId: 'm13',
        topicId: 'inheritance',
        topicTitle: 'Inheritance',
        type: 'code-tracing',
        points: 3,
        prompt: 'Trace the Method Resolution Order and multi-level super() execution. What is the output?',
        codeSnippet: `class A:
    def process(self):
        return ["A"]

class B(A):
    def process(self):
        return super().process() + ["B"]

class C(B):
    def process(self):
        return super().process() + ["C"]

print("->".join(C().process()))`,
        correctAnswer: 'A->B->C',
        explanation: '`C().process()` calls `B().process()` which calls `A().process()`, accumulating `["A", "B", "C"]`.'
      },
      {
        id: 'm13-q02',
        moduleId: 'm13',
        topicId: 'magic-dunder-methods',
        topicTitle: 'Magic / Dunder Methods',
        type: 'code-tracing',
        points: 3,
        prompt: 'Trace the operator overloading in this custom 2D Vector class. What is the printed result?',
        codeSnippet: `class Vec2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __add__(self, other):
        return Vec2D(self.x + other.x, self.y + other.y)
    def __str__(self):
        return f"({self.x},{self.y})"

v1 = Vec2D(3, 4)
v2 = Vec2D(1, 2)
v3 = v1 + v2
print(str(v3))`,
        correctAnswer: '(4,6)',
        explanation: '`v1 + v2` invokes `__add__`, creating `Vec2D(3+1, 4+2)` = (4,6).'
      },
      {
        id: 'm13-q03',
        moduleId: 'm13',
        topicId: 'encapsulation',
        topicTitle: 'Encapsulation',
        type: 'output',
        points: 2,
        prompt: 'What will be printed when accessing the name-mangled private attribute `__secret` of class `Safe`?',
        codeSnippet: `class Safe:
    def __init__(self):
        self.__secret = 999

s = Safe()
print(getattr(s, "_Safe__secret"))`,
        correctAnswer: '999',
        explanation: 'Python mangles double leading underscore `__secret` on class `Safe` to `_Safe__secret`.'
      },
      {
        id: 'm13-q04',
        moduleId: 'm13',
        topicId: 'polymorphism',
        topicTitle: 'Polymorphism',
        type: 'output',
        points: 2,
        prompt: 'What is the output of polymorphic dispatch across different payment gateways?',
        codeSnippet: `class Stripe:
    def pay(self, amt): return f"Stripe:\${amt}"
class PayPal:
    def pay(self, amt): return f"PayPal:\${amt}"

gateways = [Stripe(), PayPal()]
print([g.pay(50) for g in gateways])`,
        correctAnswer: "['Stripe:$50', 'PayPal:$50']",
        explanation: 'Duck typing allows calling `.pay()` on both Stripe and PayPal uniformly.'
      },
      {
        id: 'm13-q05',
        moduleId: 'm13',
        topicId: 'encapsulation',
        topicTitle: 'Encapsulation',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this code using the `@property` getter and setter?',
        codeSnippet: `class Account:
    def __init__(self, balance):
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, val):
        if val >= 0:
            self._balance = val

acc = Account(100)
acc.balance = 250
acc.balance = -50  # Setter rejects negative value
print(acc.balance)`,
        correctAnswer: '250',
        explanation: 'The setter validation rejects `-50`, preserving the balance of 250.'
      },
      {
        id: 'm13-q06',
        moduleId: 'm13',
        topicId: 'magic-dunder-methods',
        topicTitle: 'Magic / Dunder Methods',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by `len()` on this custom container class?',
        codeSnippet: `class Deck:
    def __init__(self, cards):
        self.cards = cards
    def __len__(self):
        return len(self.cards)

d = Deck(["A", "K", "Q", "J", "10"])
print(len(d))`,
        correctAnswer: '5',
        explanation: '`__len__` powers the built-in `len()` function on custom objects.'
      },
      {
        id: 'm13-q07',
        moduleId: 'm13',
        topicId: 'inheritance',
        topicTitle: 'Inheritance',
        type: 'debugging',
        points: 2,
        prompt: 'Identify why `Dog("Buddy", "Golden")` throws `AttributeError: \'Dog\' object has no attribute \'name\'`.',
        codeSnippet: `class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        self.breed = breed  # Missing super().__init__(name)!`,
        options: [
          'Dog did not call `super().__init__(name)` to initialize the parent Animal attributes',
          'Animal cannot be inherited in Python',
          'Dog needs to define a __repr__ method',
          'Dog should inherit from object instead'
        ],
        correctAnswer: 0,
        explanation: 'Subclasses must call `super().__init__(name)` to initialize parent state.'
      },
      {
        id: 'm13-q08',
        moduleId: 'm13',
        topicId: 'magic-dunder-methods',
        topicTitle: 'Magic / Dunder Methods',
        type: 'debugging',
        points: 2,
        prompt: 'A developer wrote `def __str__(self): return 42`. Running `print(obj)` raises `TypeError: __str__ returned non-string (type int)`. How to fix it?',
        options: [
          'Convert the return value to string: `return str(42)`',
          'Rename __str__ to __int__',
          'Return a list instead',
          'Delete the __str__ method'
        ],
        correctAnswer: 0,
        explanation: '`__str__` and `__repr__` are strictly required to return string objects.'
      },
      {
        id: 'm13-q09',
        moduleId: 'm13',
        topicId: 'inheritance',
        topicTitle: 'Inheritance',
        type: 'output',
        points: 2,
        prompt: 'What will `issubclass(bool, int)` evaluate to in Python?',
        correctAnswer: 'True',
        explanation: 'In Python, `bool` is an explicit subclass of `int` (where True==1, False==0).'
      },
      {
        id: 'm13-q10',
        moduleId: 'm13',
        topicId: 'magic-dunder-methods',
        topicTitle: 'Magic / Dunder Methods',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which dunder methods correspond to their respective Python operators? (Select all that apply)',
        options: [
          '`__eq__` overloads `==`',
          '`__lt__` overloads `<`',
          '`__add__` overloads `+`',
          '`__len__` overloads `len()`'
        ],
        correctAnswer: [0, 1, 2, 3],
        explanation: 'All four dunder mappings are standard Python operator hooks.'
      },
      {
        id: 'm13-q11',
        moduleId: 'm13',
        topicId: 'encapsulation',
        topicTitle: 'Encapsulation',
        type: 'mcq',
        points: 1,
        prompt: 'What does a single leading underscore `_attr` signify in Python code?',
        options: [
          'The attribute is private and cannot be accessed from outside the file',
          'It is a convention indicating the attribute is protected/internal and not part of the public API',
          'The attribute is read-only',
          'It tells Python to compile the attribute in C'
        ],
        correctAnswer: 1,
        explanation: '`_attr` is the standard PEP 8 convention for internal/protected attributes.'
      },
      {
        id: 'm13-q12',
        moduleId: 'm13',
        topicId: 'magic-dunder-methods',
        topicTitle: 'Magic / Dunder Methods',
        type: 'code-writing',
        points: 4,
        prompt: 'Create a `Book` class with:\n- `__init__(self, title, author, pages)`\n- `__str__(self)` returning `"{title}" by {author}`\n- `__len__(self)` returning `pages`\n- `__eq__(self, other)` returning `True` if both title and author match.',
        starterCode: `class Book:
    # Implement Book class with __str__, __len__, __eq__
    pass

import sys
if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 3:
        b1 = Book(lines[0], lines[1], int(lines[2]))
        b2 = Book(lines[0], lines[1], 500)
        print(str(b1))
        print(f"Pages: {len(b1)}")
        print(f"Equal: {b1 == b2}")`,
        solutionCode: `class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def __str__(self):
        return f'"{self.title}" by {self.author}'

    def __len__(self):
        return self.pages

    def __eq__(self, other):
        if not isinstance(other, Book):
            return False
        return self.title == other.title and self.author == other.author

import sys
if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 3:
        b1 = Book(lines[0], lines[1], int(lines[2]))
        b2 = Book(lines[0], lines[1], 500)
        print(str(b1))
        print(f"Pages: {len(b1)}")
        print(f"Equal: {b1 == b2}")`,
        testCases: [
          {
            input: "Fluent Python\nLuciano Ramalho\n792",
            expectedOutput: "\"Fluent Python\" by Luciano Ramalho\nPages: 792\nEqual: True"
          }
        ],
        explanation: 'Implements dunder hooks for string formatting, length inspection, and value equality.'
      },
      {
        id: 'm13-q13',
        moduleId: 'm13',
        topicId: 'inheritance',
        topicTitle: 'Inheritance',
        type: 'code-writing',
        points: 5,
        prompt: 'Build an Employee Management OOP hierarchy:\n1. Base class `Employee(name, base_salary)` with method `get_total_salary()` returning `base_salary` and `__str__()` returning `"{name} (Employee): ${total_salary:.2f}"`.\n2. Subclass `Manager(Employee)` with `__init__(name, base_salary, bonus)` that overrides `get_total_salary()` to return `base_salary + bonus` and `__str__()` returning `"{name} (Manager): ${total_salary:.2f}"`.\n3. Subclass `Developer(Employee)` with `__init__(name, base_salary, stock_options)` that overrides `get_total_salary()` to return `base_salary + stock_options` and `__str__()` returning `"{name} (Developer): ${total_salary:.2f}"`.',
        starterCode: `class Employee:
    # Base employee class
    pass

class Manager(Employee):
    pass

class Developer(Employee):
    pass

import sys
if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 3:
        e = Employee("Alex", float(lines[0]))
        m = Manager("Sarah", float(lines[1]), float(lines[2]))
        d = Developer("Swamy", float(lines[3]), float(lines[4]))
        print(str(e))
        print(str(m))
        print(str(d))`,
        solutionCode: `class Employee:
    def __init__(self, name, base_salary):
        self.name = name
        self.base_salary = base_salary

    def get_total_salary(self):
        return self.base_salary

    def __str__(self):
        return f"{self.name} (Employee): \${self.get_total_salary():.2f}"

class Manager(Employee):
    def __init__(self, name, base_salary, bonus):
        super().__init__(name, base_salary)
        self.bonus = bonus

    def get_total_salary(self):
        return self.base_salary + self.bonus

    def __str__(self):
        return f"{self.name} (Manager): \${self.get_total_salary():.2f}"

class Developer(Employee):
    def __init__(self, name, base_salary, stock_options):
        super().__init__(name, base_salary)
        self.stock_options = stock_options

    def get_total_salary(self):
        return self.base_salary + self.stock_options

    def __str__(self):
        return f"{self.name} (Developer): \${self.get_total_salary():.2f}"

import sys
if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 5:
        e = Employee("Alex", float(lines[0]))
        m = Manager("Sarah", float(lines[1]), float(lines[2]))
        d = Developer("Swamy", float(lines[3]), float(lines[4]))
        print(str(e))
        print(str(m))
        print(str(d))`,
        testCases: [
          {
            input: "60000\n90000\n15000\n80000\n20000",
            expectedOutput: "Alex (Employee): $60000.00\nSarah (Manager): $105000.00\nSwamy (Developer): $100000.00"
          }
        ],
        explanation: 'Models inheritance, constructor chaining with `super()`, method overriding, and polymorphic `__str__` formatting.'
      },
      {
        id: 'm13-q14',
        moduleId: 'm13',
        topicId: 'inheritance',
        topicTitle: 'Inheritance',
        type: 'output',
        points: 2,
        prompt: 'What will be the output of this code snippet testing Method Resolution Order?',
        codeSnippet: `class Base:
    def tag(self): return "Base"
class Child(Base):
    def tag(self): return "Child"

c = Child()
print(c.tag(), Base.tag(c))`,
        correctAnswer: 'Child Base',
        explanation: '`c.tag()` uses overridden method on Child; `Base.tag(c)` explicitly calls the base method.'
      },
      {
        id: 'm13-q15',
        moduleId: 'm13',
        topicId: 'polymorphism',
        topicTitle: 'Polymorphism',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this duck typing demo?',
        codeSnippet: `class HTMLRenderer:
    def render(self, content): return f"<h1>{content}</h1>"
class MarkdownRenderer:
    def render(self, content): return f"# {content}"

def display(renderer, text):
    return renderer.render(text)

print(display(HTMLRenderer(), "Hi"), "|", display(MarkdownRenderer(), "Hi"))`,
        correctAnswer: '<h1>Hi</h1> | # Hi',
        explanation: 'Dynamic polymorphism invokes the appropriate `render` method on each renderer.'
      },
      {
        id: 'm13-q16',
        moduleId: 'm13',
        topicId: 'magic-dunder-methods',
        topicTitle: 'Magic / Dunder Methods',
        type: 'mcq',
        points: 1,
        prompt: 'Which dunder method is called when evaluating the boolean truth value of an object in an `if obj:` conditional check?',
        options: ['__truth__', '__bool__', '__is_true__', '__condition__'],
        correctAnswer: 1,
        explanation: '`__bool__(self)` (or fallback `__len__`) determines the truth value of an object.'
      },
      {
        id: 'm13-q17',
        moduleId: 'm13',
        topicId: 'encapsulation',
        topicTitle: 'Encapsulation',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this property calculation?',
        codeSnippet: `class Circle:
    def __init__(self, radius):
        self._radius = radius
    @property
    def diameter(self):
        return self._radius * 2

c = Circle(7)
print(c.diameter)`,
        correctAnswer: '14',
        explanation: '`diameter` is computed on-the-fly via the `@property` getter: 7 * 2 = 14.'
      },
      {
        id: 'm13-q18',
        moduleId: 'm13',
        topicId: 'inheritance',
        topicTitle: 'Inheritance',
        type: 'output',
        points: 2,
        prompt: 'What is `[c.__name__ for c in bool.mro()]`?',
        correctAnswer: "['bool', 'int', 'object']",
        explanation: 'In Python, `bool` inherits from `int`, which inherits from `object`.'
      },
      {
        id: 'm13-q19',
        moduleId: 'm13',
        topicId: 'magic-dunder-methods',
        topicTitle: 'Magic / Dunder Methods',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by `Point(1, 2) < Point(3, 4)` if `__lt__` compares distance from origin `(x**2 + y**2)`?',
        codeSnippet: `class Point:
    def __init__(self, x, y): self.x = x; self.y = y
    def __lt__(self, other):
        return (self.x**2 + self.y**2) < (other.x**2 + other.y**2)

print(Point(1, 2) < Point(3, 4))`,
        correctAnswer: 'True',
        explanation: '1^2 + 2^2 = 5 < 3^2 + 4^2 = 25, evaluating to True.'
      },
      {
        id: 'm13-q20',
        moduleId: 'm13',
        topicId: 'encapsulation',
        topicTitle: 'Encapsulation',
        type: 'mcq',
        points: 1,
        prompt: 'What decorator defines a setter method for a property named `score`?',
        options: ['@setter.score', '@score.setter', '@set_score', '@property.setter'],
        correctAnswer: 1,
        explanation: 'The syntax for defining a property setter is `@property_name.setter`.'
      }
    ]
  },

  // =========================================================================
  // MODULE 14 ASSIGNMENT BANK (Comprehensions, Iterators & Generators - Hard)
  // =========================================================================
  m14: {
    moduleId: 'm14',
    title: 'Module 14 Assignment: Comprehensions, Iterators & Generators',
    timeLimitMinutes: 35,
    sampleCount: 15,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm14-q01',
        moduleId: 'm14',
        topicId: 'list-comprehensions',
        topicTitle: 'List Comprehensions',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this nested list comprehension?',
        codeSnippet: `matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
evens_flattened = [x for row in matrix for x in row if x % 2 == 0]
print(evens_flattened)`,
        correctAnswer: '[2, 4, 6, 8]',
        explanation: 'Flattens the 2D grid and filters for even integers.'
      },
      {
        id: 'm14-q02',
        moduleId: 'm14',
        topicId: 'yield-statement',
        topicTitle: 'The yield Statement',
        type: 'code-tracing',
        points: 3,
        prompt: 'Determine the exact sequence of values produced by consecutive `next()` calls on this generator function.',
        codeSnippet: `def custom_counter():
    n = 1
    while n <= 5:
        if n % 2 != 0:
            yield n * 10
        n += 1

gen = custom_counter()
print([next(gen), next(gen), next(gen)])`,
        correctAnswer: '[10, 30, 50]',
        explanation: 'Yields when `n` is odd: for n=1 (10), n=3 (30), n=5 (50).'
      },
      {
        id: 'm14-q03',
        moduleId: 'm14',
        topicId: 'dictionary-comprehensions',
        topicTitle: 'Dictionary Comprehensions',
        type: 'output',
        points: 2,
        prompt: 'What is the output of inverting this dictionary using a dictionary comprehension?',
        codeSnippet: `d = {"a": 1, "b": 2, "c": 3}
inv = {v: k for k, v in d.items()}
print(inv[2])`,
        correctAnswer: 'b',
        explanation: 'Inverted mapping maps value 2 back to key "b".'
      },
      {
        id: 'm14-q04',
        moduleId: 'm14',
        topicId: 'set-comprehensions',
        topicTitle: 'Set Comprehensions',
        type: 'output',
        points: 2,
        prompt: 'What is the length of this set created via set comprehension?',
        codeSnippet: `words = ["code", "node", "mode", "code", "mode"]
lengths = {len(w) for w in words}
print(sorted(list(lengths)))`,
        correctAnswer: '[4]',
        explanation: 'All words have length 4; the set deduplicates to `{4}`.'
      },
      {
        id: 'm14-q05',
        moduleId: 'm14',
        topicId: 'iterators',
        topicTitle: 'Iterators',
        type: 'code-tracing',
        points: 3,
        prompt: 'Trace iterator consumption across two different operations on the same iterator instance.',
        codeSnippet: `it = iter([1, 2, 3, 4, 5])
first = next(it)
second = next(it)
remaining = list(it)
print(first, second, remaining)`,
        correctAnswer: '1 2 [3, 4, 5]',
        explanation: '`next()` consumes 1 and 2; `list(it)` consumes the remaining items `[3, 4, 5]`.'
      },
      {
        id: 'm14-q06',
        moduleId: 'm14',
        topicId: 'generators',
        topicTitle: 'Generators',
        type: 'mcq',
        points: 1,
        prompt: 'Why do Generator Expressions consume dramatically less memory than List Comprehensions for large datasets?',
        options: [
          'Generators compress data into zip files on disk',
          'Generators compute values on-demand one at a time (lazy evaluation) rather than allocating the full sequence in memory',
          'Generators run in C++ mode',
          'Generators discard duplicate values automatically'
        ],
        correctAnswer: 1,
        explanation: 'Generators use lazy evaluation, maintaining an O(1) auxiliary memory footprint.'
      },
      {
        id: 'm14-q07',
        moduleId: 'm14',
        topicId: 'list-comprehensions',
        topicTitle: 'List Comprehensions',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this list comprehension using ternary if-else transformation?',
        codeSnippet: `nums = [1, 2, 3, 4, 5]
res = [x * 2 if x % 2 == 0 else -x for x in nums]
print(res)`,
        correctAnswer: '[-1, 4, -3, 8, -5]',
        explanation: 'Evens are doubled (2*2=4, 4*2=8); odds are negated (-1, -3, -5).'
      },
      {
        id: 'm14-q08',
        moduleId: 'm14',
        topicId: 'yield-statement',
        topicTitle: 'The yield Statement',
        type: 'debugging',
        points: 2,
        prompt: 'A developer calls `gen = my_generator()` and wonders why the print statements inside the function haven\'t run yet. What is the reason?',
        options: [
          'The function has a syntax error',
          'Calling a generator function returns a generator iterator; code does not execute until `next()` or iteration begins',
          'The generator needs to be imported first',
          'Generators only run on secondary CPU cores'
        ],
        correctAnswer: 1,
        explanation: 'Generator functions execute lazily upon `next()` invocation.'
      },
      {
        id: 'm14-q09',
        moduleId: 'm14',
        topicId: 'iterators',
        topicTitle: 'Iterators',
        type: 'output',
        points: 2,
        prompt: 'What exception is raised when calling `next()` on an exhausted iterator with no default value?',
        correctAnswer: 'StopIteration',
        explanation: 'Iterators signal completion by raising `StopIteration`.'
      },
      {
        id: 'm14-q10',
        moduleId: 'm14',
        topicId: 'generators',
        topicTitle: 'Generators',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by `sum(x for x in range(1, 6))`?',
        correctAnswer: '15',
        explanation: '1 + 2 + 3 + 4 + 5 = 15.'
      },
      {
        id: 'm14-q11',
        moduleId: 'm14',
        topicId: 'yield-statement',
        topicTitle: 'The yield Statement',
        type: 'mcq',
        points: 1,
        prompt: 'Which syntax in Python delegates yielding directly from a sub-generator or iterable?',
        options: ['yield to', 'yield from', 'yield with', 'delegate yield'],
        correctAnswer: 1,
        explanation: '`yield from <iterable>` delegates iteration directly to the sub-generator.'
      },
      {
        id: 'm14-q12',
        moduleId: 'm14',
        topicId: 'generators',
        topicTitle: 'Generators',
        type: 'code-writing',
        points: 4,
        prompt: 'Write a generator function `fibonacci_gen(limit)` that yields Fibonacci numbers `(0, 1, 1, 2, 3, 5, ...)` while the value is strictly less than or equal to `limit`.',
        starterCode: `def fibonacci_gen(limit):
    # Yield fibonacci numbers <= limit
    pass

import sys
if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        print(list(fibonacci_gen(int(line))))`,
        solutionCode: `def fibonacci_gen(limit):
    a, b = 0, 1
    while a <= limit:
        yield a
        a, b = b, a + b

import sys
if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        print(list(fibonacci_gen(int(line))))`,
        testCases: [
          { input: '20', expectedOutput: '[0, 1, 1, 2, 3, 5, 8, 13]' },
          { input: '1', expectedOutput: '[0, 1, 1]' },
          { input: '0', expectedOutput: '[0]' }
        ],
        explanation: 'Generates Fibonacci numbers lazily up to limit.'
      },
      {
        id: 'm14-q13',
        moduleId: 'm14',
        topicId: 'dictionary-comprehensions',
        topicTitle: 'Dictionary Comprehensions',
        type: 'code-writing',
        points: 4,
        prompt: 'Write a function `filter_even_square_map(nums)` using a dictionary comprehension that maps each even number in `nums` to its square (e.g. `[1, 2, 3, 4]` -> `{2: 4, 4: 16}`).',
        starterCode: `def filter_even_square_map(nums):
    # Return dict comprehension mapping even_num -> square
    pass

import sys
if __name__ == "__main__":
    tokens = [int(x) for x in sys.stdin.read().split() if x.strip()]
    print(filter_even_square_map(tokens))`,
        solutionCode: `def filter_even_square_map(nums):
    return {x: x**2 for x in nums if x % 2 == 0}

import sys
if __name__ == "__main__":
    tokens = [int(x) for x in sys.stdin.read().split() if x.strip()]
    print(filter_even_square_map(tokens))`,
        testCases: [
          { input: '1 2 3 4 5 6', expectedOutput: '{2: 4, 4: 16, 6: 36}' },
          { input: '1 3 5', expectedOutput: '{}' }
        ],
        explanation: 'Constructs `{x: x**2 for x in nums if x % 2 == 0}`.'
      },
      {
        id: 'm14-q14',
        moduleId: 'm14',
        topicId: 'iterators',
        topicTitle: 'Iterators',
        type: 'code-writing',
        points: 5,
        prompt: 'Create a custom iterator class `CycleIterator` that takes a list of items and cycles through them infinitely when `next()` is called.\n- `__init__(self, items)`\n- `__iter__(self)` returning `self`\n- `__next__(self)` cycling continuously through elements.',
        starterCode: `class CycleIterator:
    def __init__(self, items):
        self.items = items
        self.index = 0

    def __iter__(self):
        return self

    def __next__(self):
        # Return next element in cycle
        pass

import sys
if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        items = lines[0].split()
        count = int(lines[1])
        cyc = CycleIterator(items)
        print([next(cyc) for _ in range(count)])`,
        solutionCode: `class CycleIterator:
    def __init__(self, items):
        self.items = items
        self.index = 0

    def __iter__(self):
        return self

    def __next__(self):
        if not self.items:
            raise StopIteration
        val = self.items[self.index]
        self.index = (self.index + 1) % len(self.items)
        return val

import sys
if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        items = lines[0].split()
        count = int(lines[1])
        cyc = CycleIterator(items)
        print([next(cyc) for _ in range(count)])`,
        testCases: [
          {
            input: "A B C\n7",
            expectedOutput: "['A', 'B', 'C', 'A', 'B', 'C', 'A']"
          },
          {
            input: "1 2\n4",
            expectedOutput: "['1', '2', '1', '2']"
          }
        ],
        explanation: 'Implements the Python Iterator protocol (`__iter__` and `__next__`) with modular index cycling.'
      },
      {
        id: 'm14-q15',
        moduleId: 'm14',
        topicId: 'yield-statement',
        topicTitle: 'The yield Statement',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this generator pipeline?',
        codeSnippet: `def gen_nums():
    for i in range(1, 4):
        yield i

def double_gen(g):
    for x in g:
        yield x * 2

print(list(double_gen(gen_nums())))`,
        correctAnswer: '[2, 4, 6]',
        explanation: 'Streams values 1, 2, 3 through the doubling generator, yielding `[2, 4, 6]`.'
      },
      {
        id: 'm14-q16',
        moduleId: 'm14',
        topicId: 'list-comprehensions',
        topicTitle: 'List Comprehensions',
        type: 'output',
        points: 2,
        prompt: 'What is the output of `[c for c in "PYTHON" if c not in "AEIOU"]`?',
        correctAnswer: "['P', 'Y', 'T', 'H', 'N']",
        explanation: 'Filters out vowel \'O\', keeping consonants.'
      },
      {
        id: 'm14-q17',
        moduleId: 'm14',
        topicId: 'set-comprehensions',
        topicTitle: 'Set Comprehensions',
        type: 'mcq',
        points: 1,
        prompt: 'What is the difference in syntax between a set comprehension and a dictionary comprehension?',
        options: [
          'Set comprehensions use parentheses `()`; dict comprehensions use curly braces `{}`',
          'Set comprehensions use `{x for x in seq}`; dict comprehensions use `{k: v for k, v in seq}` with a colon separator',
          'Dict comprehensions require the `dict` keyword',
          'There is no syntax difference'
        ],
        correctAnswer: 1,
        explanation: 'Dictionary comprehensions contain a key-value colon `:` separator.'
      },
      {
        id: 'm14-q18',
        moduleId: 'm14',
        topicId: 'iterators',
        topicTitle: 'Iterators',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by `iter(iter([1, 2])) is iter([1, 2])`?',
        correctAnswer: 'False',
        explanation: 'Calling `iter([1, 2])` twice on the list creates two distinct iterator objects in memory.'
      },
      {
        id: 'm14-q19',
        moduleId: 'm14',
        topicId: 'generators',
        topicTitle: 'Generators',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by `next((x for x in [10, 20, 30] if x > 15))`?',
        correctAnswer: '20',
        explanation: 'The generator expression produces 20 as the first element matching `x > 15`.'
      },
      {
        id: 'm14-q20',
        moduleId: 'm14',
        topicId: 'yield-statement',
        topicTitle: 'The yield Statement',
        type: 'mcq',
        points: 1,
        prompt: 'What happens to the local variables of a generator function when execution reaches a `yield` statement?',
        options: [
          'They are deleted to free system memory',
          'They are frozen in memory on the heap and preserved until execution resumes',
          'They are converted to global variables',
          'They are saved to a temporary file on disk'
        ],
        correctAnswer: 1,
        explanation: 'The stack frame is preserved on the heap, allowing execution to resume with intact local state.'
      }
    ]
  }
};
