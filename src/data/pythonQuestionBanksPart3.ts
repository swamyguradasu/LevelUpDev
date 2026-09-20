import { ModuleAssignmentConfig, AssignmentQuestion } from './pythonQuestionBanks';

export const PYTHON_QUESTION_BANKS_PART3: Record<string, ModuleAssignmentConfig> = {
  // =========================================================================
  // MODULE 15 ASSIGNMENT BANK (Regular Expressions)
  // =========================================================================
  m15: {
    moduleId: 'm15',
    title: 'Module 15 Assignment: Regular Expressions',
    timeLimitMinutes: 30,
    sampleCount: 14,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm15-q01',
        moduleId: 'm15',
        topicId: 're-module-basics',
        topicTitle: 're Module Basics',
        type: 'mcq',
        points: 1,
        prompt: 'Why should regular expressions in Python always be written using raw string literals `r"..."`?',
        options: [
          'To make the regex execute on the GPU',
          'To prevent Python from converting backslashes into string escape sequences (e.g. \\b into backspace)',
          'To force the regex to match case-insensitively',
          'To enable automatic multithreading'
        ],
        correctAnswer: 1,
        explanation: 'Raw strings treat backslashes literally, preserving regex escape codes like `\\b`, `\\d`, and `\\s`.'
      },
      {
        id: 'm15-q02',
        moduleId: 'm15',
        topicId: 'pattern-matching',
        topicTitle: 'Pattern Matching',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this Python code snippet?',
        codeSnippet: `import re
text = "The event is on 2026-09-20 and backup is 2026-10-15"
dates = re.findall(r"\\d{4}-\\d{2}-\\d{2}", text)
print(len(dates), dates[0])`,
        correctAnswer: '2 2026-09-20',
        explanation: 'Finds both dates: length is 2 and the first match is "2026-09-20".'
      },
      {
        id: 'm15-q03',
        moduleId: 'm15',
        topicId: 'search-method',
        topicTitle: 'search() Method',
        type: 'output',
        points: 2,
        prompt: 'What is the output of extracting capturing group 2 from this match?',
        codeSnippet: `import re
text = "Invoice #INV-84920 for client ABC"
m = re.search(r"#(INV)-(\\d+)", text)
print(m.group(2))`,
        correctAnswer: '84920',
        explanation: 'Group 1 is "INV"; Group 2 is "84920".'
      },
      {
        id: 'm15-q04',
        moduleId: 'm15',
        topicId: 'sub-method',
        topicTitle: 'sub() Method',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this data sanitization replacement?',
        codeSnippet: `import re
text = "Call 555-123-4567 or 555-987-6543"
masked = re.sub(r"\\d{3}-\\d{3}-\\d{4}", "[PHONE]", text)
print(masked)`,
        correctAnswer: 'Call [PHONE] or [PHONE]',
        explanation: 'Replaces all phone number matches with "[PHONE]".'
      },
      {
        id: 'm15-q05',
        moduleId: 'm15',
        topicId: 'pattern-matching',
        topicTitle: 'Pattern Matching',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which regex character classes correspond to their definitions? (Select all that apply)',
        options: [
          '`\\d` matches any decimal digit [0-9]',
          '`\\w` matches any alphanumeric word character [a-zA-Z0-9_]',
          '`\\s` matches any whitespace character (spaces, tabs, newlines)',
          '`\\D` matches only digits'
        ],
        correctAnswer: [0, 1, 2],
        explanation: '`\\D` matches non-digits, not digits.'
      },
      {
        id: 'm15-q06',
        moduleId: 'm15',
        topicId: 'findall-method',
        topicTitle: 'findall() Method',
        type: 'output',
        points: 2,
        prompt: 'What is the output of `re.findall()` on a string with no matches?',
        codeSnippet: `import re
print(re.findall(r"\\d+", "No numbers here!"))`,
        correctAnswer: '[]',
        explanation: '`re.findall()` returns an empty list `[]` if no matches are found.'
      },
      {
        id: 'm15-q07',
        moduleId: 'm15',
        topicId: 'search-method',
        topicTitle: 'search() Method',
        type: 'debugging',
        points: 2,
        prompt: 'Why does `re.search(r"\\d+", "abc").group()` throw an `AttributeError`?',
        options: [
          'Because `re.search()` returned `None`, which has no `.group()` method',
          'Because the pattern syntax is invalid',
          'Because `re` was not imported',
          'Because regex requires compiled patterns'
        ],
        correctAnswer: 0,
        explanation: 'When no match is found, `re.search()` returns `None`, so calling `.group()` raises AttributeError.'
      },
      {
        id: 'm15-q08',
        moduleId: 'm15',
        topicId: 'sub-method',
        topicTitle: 'sub() Method',
        type: 'code-tracing',
        points: 2,
        prompt: 'Trace the regex substitution backreference. What is the output?',
        codeSnippet: `import re
date_text = "2026-12-31"
reordered = re.sub(r"(\\d{4})-(\\d{2})-(\\d{2})", r"\\3/\\2/\\1", date_text)
print(reordered)`,
        correctAnswer: '31/12/2026',
        explanation: 'Reorders group 3 (31), group 2 (12), and group 1 (2026) with slashes.'
      },
      {
        id: 'm15-q09',
        moduleId: 'm15',
        topicId: 'pattern-matching',
        topicTitle: 'Pattern Matching',
        type: 'mcq',
        points: 1,
        prompt: 'Which quantifier matches 1 or more occurrences of the preceding token?',
        options: ['*', '+', '?', '{0,1}'],
        correctAnswer: 1,
        explanation: '`+` matches 1 or more occurrences.'
      },
      {
        id: 'm15-q10',
        moduleId: 'm15',
        topicId: 'pattern-matching',
        topicTitle: 'Pattern Matching',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this code checking word boundaries?',
        codeSnippet: `import re
text = "cat catalog bobcat cat"
print(len(re.findall(r"\\bcat\\b", text)))`,
        correctAnswer: '2',
        explanation: 'Word boundary `\\bcat\\b` matches only standalone words ("cat"), matching twice.'
      },
      {
        id: 'm15-q11',
        moduleId: 'm15',
        topicId: 'findall-method',
        topicTitle: 'findall() Method',
        type: 'code-writing',
        points: 4,
        prompt: 'Write a function `extract_emails(text)` that uses `re.findall()` to find and return all email addresses matching `[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+`.',
        starterCode: `import re

def extract_emails(text):
    # Return list of emails
    pass

import sys
if __name__ == "__main__":
    content = sys.stdin.read().strip()
    if content:
        print(extract_emails(content))`,
        solutionCode: `import re

def extract_emails(text):
    pattern = r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+"
    return re.findall(pattern, text)

import sys
if __name__ == "__main__":
    content = sys.stdin.read().strip()
    if content:
        print(extract_emails(content))`,
        testCases: [
          {
            input: "Contact swamy@levelup.dev or alex.99@gmail.com for details.",
            expectedOutput: "['swamy@levelup.dev', 'alex.99@gmail.com']"
          },
          {
            input: "No emails here, only hello world.",
            expectedOutput: "[]"
          }
        ],
        explanation: 'Uses character class regex to find and return email addresses.'
      },
      {
        id: 'm15-q12',
        moduleId: 'm15',
        topicId: 'sub-method',
        topicTitle: 'sub() Method',
        type: 'code-writing',
        points: 4,
        prompt: 'Write a function `sanitize_html(html_text)` that removes all HTML tags (e.g. `<p>`, `</div>`, `<span>`) using `re.sub()` and replaces them with an empty string, then condenses multiple spaces into a single space.',
        starterCode: `import re

def sanitize_html(html_text):
    # Remove HTML tags and condense whitespace
    pass

import sys
if __name__ == "__main__":
    raw = sys.stdin.read().strip()
    if raw:
        print(sanitize_html(raw))`,
        solutionCode: `import re

def sanitize_html(html_text):
    no_tags = re.sub(r"<[^>]+>", "", html_text)
    clean_spaces = re.sub(r"\\s+", " ", no_tags).strip()
    return clean_spaces

import sys
if __name__ == "__main__":
    raw = sys.stdin.read().strip()
    if raw:
        print(sanitize_html(raw))`,
        testCases: [
          {
            input: "<h1>Welcome</h1> <p>This is   a <b>test</b>.</p>",
            expectedOutput: "Welcome This is a test."
          },
          {
            input: "<div><span class='highlight'>Python Trail</span></div>",
            expectedOutput: "Python Trail"
          }
        ],
        explanation: 'Strips `<[^>]+>` and normalizes whitespace.'
      },
      {
        id: 'm15-q13',
        moduleId: 'm15',
        topicId: 'pattern-matching',
        topicTitle: 'Pattern Matching',
        type: 'code-writing',
        points: 4,
        prompt: 'Write a function `validate_postal_code(code)` that returns `True` if `code` matches exactly 5 digits or 5 digits followed by a hyphen and 4 digits (e.g. `"90210"` or `"90210-1234"`), otherwise `False`.',
        starterCode: `import re

def validate_postal_code(code):
    # Return bool
    pass

import sys
if __name__ == "__main__":
    c = sys.stdin.read().strip()
    if c:
        print(validate_postal_code(c))`,
        solutionCode: `import re

def validate_postal_code(code):
    pattern = r"^\\d{5}(-\\d{4})?$"
    return bool(re.match(pattern, code.strip()))

import sys
if __name__ == "__main__":
    c = sys.stdin.read().strip()
    if c:
        print(validate_postal_code(c))`,
        testCases: [
          { input: "90210", expectedOutput: "True" },
          { input: "90210-1234", expectedOutput: "True" },
          { input: "9021", expectedOutput: "False" },
          { input: "ABCDE", expectedOutput: "False" }
        ],
        explanation: 'Uses anchors `^...$` with optional hyphen group `(-\\d{4})?`.'
      },
      {
        id: 'm15-q14',
        moduleId: 'm15',
        topicId: 're-module-basics',
        topicTitle: 're Module Basics',
        type: 'output',
        points: 2,
        prompt: 'What is the output of `re.search(r"^Hello", "Say Hello")`?',
        correctAnswer: 'None',
        explanation: '`^Hello` requires "Hello" at the beginning (index 0); since it appears later, it returns `None`.'
      },
      {
        id: 'm15-q15',
        moduleId: 'm15',
        topicId: 'search-method',
        topicTitle: 'search() Method',
        type: 'output',
        points: 2,
        prompt: 'What does `match.span()` return for a match starting at index 3 and ending at index 7?',
        correctAnswer: '(3, 7)',
        explanation: '`span()` returns a tuple `(start, end)`.'
      },
      {
        id: 'm15-q16',
        moduleId: 'm15',
        topicId: 'sub-method',
        topicTitle: 'sub() Method',
        type: 'output',
        points: 2,
        prompt: 'What will `re.sub(r"\\d", "X", "Room 404", count=2)` output?',
        correctAnswer: 'Room XX4',
        explanation: '`count=2` limits substitutions to the first 2 occurrences, leaving the last "4" untouched.'
      }
    ]
  },

  // =========================================================================
  // MODULE 16 ASSIGNMENT BANK (Decorators & Context Managers)
  // =========================================================================
  m16: {
    moduleId: 'm16',
    title: 'Module 16 Assignment: Decorators & Context Managers',
    timeLimitMinutes: 30,
    sampleCount: 14,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm16-q01',
        moduleId: 'm16',
        topicId: 'function-decorators',
        topicTitle: 'Function Decorators',
        type: 'code-tracing',
        points: 3,
        prompt: 'Trace the decorator execution order. What is printed?',
        codeSnippet: `def tag_b(f):
    def w(): return f"<b>{f()}</b>"
    return w

def tag_i(f):
    def w(): return f"<i>{f()}</i>"
    return w

@tag_b
@tag_i
def greet():
    return "Hello"

print(greet())`,
        correctAnswer: '<b><i>Hello</i></b>',
        explanation: 'Decorators are evaluated inside-out: `@tag_i` wraps greet first (`<i>Hello</i>`), then `@tag_b` wraps that (`<b><i>Hello</i></b>`).'
      },
      {
        id: 'm16-q02',
        moduleId: 'm16',
        topicId: 'custom-decorators',
        topicTitle: 'Custom Decorators',
        type: 'code-tracing',
        points: 3,
        prompt: 'Trace this call-counter decorator. What is the value printed?',
        codeSnippet: `def count_calls(fn):
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return fn(*args, **kwargs)
    wrapper.calls = 0
    return wrapper

@count_calls
def ping(): pass

ping(); ping(); ping()
print(ping.calls)`,
        correctAnswer: '3',
        explanation: '`ping` was called 3 times, incrementing `wrapper.calls` to 3.'
      },
      {
        id: 'm16-q03',
        moduleId: 'm16',
        topicId: 'custom-decorators',
        topicTitle: 'Custom Decorators',
        type: 'mcq',
        points: 1,
        prompt: 'Why should `@functools.wraps(func)` always be used when writing custom decorators?',
        options: [
          'To preserve the original function\'s `__name__`, `__doc__`, and metadata',
          'To convert functions to asynchronous coroutines',
          'To make the function run in parallel',
          'To prevent the function from raising exceptions'
        ],
        correctAnswer: 0,
        explanation: '`@functools.wraps` copies original function attributes to the wrapper.'
      },
      {
        id: 'm16-q04',
        moduleId: 'm16',
        topicId: 'exit-method',
        topicTitle: 'The __exit__ Method',
        type: 'output',
        points: 2,
        prompt: 'What will be printed when `__exit__` returns `True` upon catching an error?',
        codeSnippet: `class SafeDivide:
    def __enter__(self): return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is ZeroDivisionError:
            print("Suppressed 0-division")
            return True
        return False

with SafeDivide():
    x = 10 / 0
print("COMPLETED")`,
        correctAnswer: 'Suppressed 0-division\nCOMPLETED',
        explanation: 'Returning `True` suppresses `ZeroDivisionError` so "COMPLETED" executes.'
      },
      {
        id: 'm16-q05',
        moduleId: 'm16',
        topicId: 'enter-method',
        topicTitle: 'The __enter__ Method',
        type: 'output',
        points: 2,
        prompt: 'What is assigned to `val` in `with Manager() as val:` if `__enter__` returns `42`?',
        codeSnippet: `class Manager:
    def __enter__(self): return 42
    def __exit__(self, a, b, c): pass

with Manager() as val:
    print(val * 2)`,
        correctAnswer: '84',
        explanation: '`val` is bound to the return value of `__enter__` (42), so 42 * 2 = 84.'
      },
      {
        id: 'm16-q06',
        moduleId: 'm16',
        topicId: 'custom-context-managers',
        topicTitle: 'Custom Context Managers',
        type: 'mcq',
        points: 1,
        prompt: 'Which decorator from the standard library creates a context manager from a generator function using `yield`?',
        options: ['@contextlib.contextmanager', '@functools.context', '@contextlib.managed', '@context.decorator'],
        correctAnswer: 0,
        explanation: '`@contextlib.contextmanager` is the standard library utility.'
      },
      {
        id: 'm16-q07',
        moduleId: 'm16',
        topicId: 'function-decorators',
        topicTitle: 'Function Decorators',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `def prefix_log(f):
    def wrapper(*args):
        return f"LOG: {f(*args)}"
    return wrapper

@prefix_log
def add(a, b): return a + b

print(add(10, 20))`,
        correctAnswer: 'LOG: 30',
        explanation: 'Wrapper prefixes "LOG: " to the sum result 30.'
      },
      {
        id: 'm16-q08',
        moduleId: 'm16',
        topicId: 'exit-method',
        topicTitle: 'The __exit__ Method',
        type: 'output',
        points: 2,
        prompt: 'What are the values of `(exc_type, exc_val, exc_tb)` passed to `__exit__` when no exception occurs?',
        correctAnswer: 'None None None',
        explanation: 'When no error occurs, Python passes `None, None, None` to `__exit__`.'
      },
      {
        id: 'm16-q09',
        moduleId: 'm16',
        topicId: 'custom-decorators',
        topicTitle: 'Custom Decorators',
        type: 'debugging',
        points: 2,
        prompt: 'A parameterized decorator `@repeat(num=3)` fails with `TypeError: decorator takes 1 argument but 0 were given`. What is the fix?',
        options: [
          'Add a third level outer factory function that accepts `num` and returns the decorator',
          'Use a while loop inside the target function',
          'Remove functools.wraps',
          'Convert the decorator to a class'
        ],
        correctAnswer: 0,
        explanation: 'Parameterized decorators require 3 levels of nested functions: factory -> decorator -> wrapper.'
      },
      {
        id: 'm16-q10',
        moduleId: 'm16',
        topicId: 'custom-decorators',
        topicTitle: 'Custom Decorators',
        type: 'code-writing',
        points: 4,
        prompt: 'Write a decorator `@uppercase_return` that converts any string returned by the decorated function to uppercase. Preserve original metadata with `@functools.wraps`.',
        starterCode: `import functools

def uppercase_return(func):
    # Implement decorator
    pass

@uppercase_return
def get_message(name):
    return f"hello {name}"

import sys
if __name__ == "__main__":
    n = sys.stdin.read().strip()
    if n:
        print(get_message(n))`,
        solutionCode: `import functools

def uppercase_return(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        res = func(*args, **kwargs)
        return res.upper() if isinstance(res, str) else res
    return wrapper

@uppercase_return
def get_message(name):
    return f"hello {name}"

import sys
if __name__ == "__main__":
    n = sys.stdin.read().strip()
    if n:
        print(get_message(n))`,
        testCases: [
          { input: "swamy", expectedOutput: "HELLO SWAMY" },
          { input: "levelupdev", expectedOutput: "HELLO LEVELUPDEV" }
        ],
        explanation: 'Wraps function call and applies `.upper()` to string output.'
      },
      {
        id: 'm16-q11',
        moduleId: 'm16',
        topicId: 'custom-context-managers',
        topicTitle: 'Custom Context Managers',
        type: 'code-writing',
        points: 5,
        prompt: 'Create a custom Context Manager class `TempListManager`:\n- `__init__(self, initial_list)`\n- `__enter__(self)` creates and returns a shallow copy of `initial_list`\n- `__exit__(self, exc_type, exc_val, exc_tb)` if an error occurred, prints `"ERROR: Transaction aborted"`; otherwise prints `"SUCCESS: " + str(buffer)`. (Do NOT suppress errors).',
        starterCode: `class TempListManager:
    # Implement context manager class
    pass

import sys
if __name__ == "__main__":
    items = sys.stdin.read().split()
    with TempListManager(items) as buf:
        buf.append("EXTRA")`,
        solutionCode: `class TempListManager:
    def __init__(self, initial_list):
        self.initial_list = initial_list
        self.buffer = None

    def __enter__(self):
        self.buffer = list(self.initial_list)
        return self.buffer

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None:
            print("ERROR: Transaction aborted")
            return False
        print("SUCCESS: " + str(self.buffer))
        return False

import sys
if __name__ == "__main__":
    items = sys.stdin.read().split()
    with TempListManager(items) as buf:
        buf.append("EXTRA")`,
        testCases: [
          {
            input: "A B C",
            expectedOutput: "SUCCESS: ['A', 'B', 'C', 'EXTRA']"
          }
        ],
        explanation: 'Implements `__enter__` and `__exit__` with success/error condition handling.'
      },
      {
        id: 'm16-q12',
        moduleId: 'm16',
        topicId: 'function-decorators',
        topicTitle: 'Function Decorators',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `def negate(f):
    return lambda x: -f(x)

@negate
def double(n): return n * 2

print(double(5))`,
        correctAnswer: '-10',
        explanation: '`double(5)` computes 10, which the lambda negates to -10.'
      },
      {
        id: 'm16-q13',
        moduleId: 'm16',
        topicId: 'custom-decorators',
        topicTitle: 'Custom Decorators',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which use cases are well-suited for Python Decorators? (Select all that apply)',
        options: [
          'Logging execution details and timing performance',
          'Role-based access control and user authentication',
          'Caching / Memoizing expensive function outputs',
          'Declaring database table schemas'
        ],
        correctAnswer: [0, 1, 2],
        explanation: 'Logging, auth, and caching are classic decorator applications.'
      },
      {
        id: 'm16-q14',
        moduleId: 'm16',
        topicId: 'exit-method',
        topicTitle: 'The __exit__ Method',
        type: 'mcq',
        points: 1,
        prompt: 'How does an `__exit__` method tell Python NOT to suppress an exception raised in a `with` block?',
        options: [
          'By returning False (or None)',
          'By returning True',
          'By raising StopIteration',
          'By calling exit(0)'
        ],
        correctAnswer: 0,
        explanation: 'Returning `False` or `None` allows exceptions to propagate normally.'
      },
      {
        id: 'm16-q15',
        moduleId: 'm16',
        topicId: 'enter-method',
        topicTitle: 'The __enter__ Method',
        type: 'output',
        points: 2,
        prompt: 'What will `print(f"{res}")` output?',
        codeSnippet: `class Box:
    def __enter__(self): return ["alpha"]
    def __exit__(self, a, b, c): pass

with Box() as items:
    items.append("beta")
    res = "-".join(items)
print(res)`,
        correctAnswer: 'alpha-beta',
        explanation: '`items` is `["alpha", "beta"]`, joined by hyphens.'
      },
      {
        id: 'm16-q16',
        moduleId: 'm16',
        topicId: 'custom-context-managers',
        topicTitle: 'Custom Context Managers',
        type: 'output',
        points: 2,
        prompt: 'What is the output of `contextlib.contextmanager` lifecycle?',
        codeSnippet: `from contextlib import contextmanager
@contextmanager
def flow():
    print("START", end="->")
    yield "DATA"
    print("END")

with flow() as d:
    print(d, end="->")`,
        correctAnswer: 'START->DATA->END',
        explanation: 'Prints START before yield, DATA inside block, and END after yield.'
      }
    ]
  },

  // =========================================================================
  // MODULE 17 ASSIGNMENT BANK (Working with APIs)
  // =========================================================================
  m17: {
    moduleId: 'm17',
    title: 'Module 17 Assignment: Working with APIs',
    timeLimitMinutes: 30,
    sampleCount: 14,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm17-q01',
        moduleId: 'm17',
        topicId: 'requests-library',
        topicTitle: 'requests Library',
        type: 'mcq',
        points: 1,
        prompt: 'Which HTTP status code signifies that a resource was successfully created on the server?',
        options: ['200 OK', '201 Created', '204 No Content', '301 Moved'],
        correctAnswer: 1,
        explanation: '201 Created is the standard status code for successful creation.'
      },
      {
        id: 'm17-q02',
        moduleId: 'm17',
        topicId: 'get-requests',
        topicTitle: 'GET Requests',
        type: 'output',
        points: 2,
        prompt: 'What is the output of parsing a mock API response containing items?',
        codeSnippet: `resp = {"status": 200, "items": [{"id": 1}, {"id": 2}, {"id": 3}]}
if resp["status"] == 200:
    print(sum(item["id"] for item in resp["items"]))`,
        correctAnswer: '6',
        explanation: '1 + 2 + 3 = 6.'
      },
      {
        id: 'm17-q03',
        moduleId: 'm17',
        topicId: 'post-requests',
        topicTitle: 'POST Requests',
        type: 'mcq',
        points: 1,
        prompt: 'What parameter in `requests.post()` automatically sets `Content-Type: application/json` and serializes the dictionary argument?',
        options: ['data', 'json', 'body', 'params'],
        correctAnswer: 1,
        explanation: '`json=payload` automatically sets JSON headers and serializes the dictionary.'
      },
      {
        id: 'm17-q04',
        moduleId: 'm17',
        topicId: 'handling-json-responses',
        topicTitle: 'Handling JSON Responses',
        type: 'output',
        points: 2,
        prompt: 'What will be printed when safely accessing a missing nested key?',
        codeSnippet: `payload = {"user": {"name": "Swamy"}}
role = payload.get("user", {}).get("role", "developer")
print(role)`,
        correctAnswer: 'developer',
        explanation: '`role` is missing, returning the fallback "developer".'
      },
      {
        id: 'm17-q05',
        moduleId: 'm17',
        topicId: 'api-authentication',
        topicTitle: 'API Authentication',
        type: 'output',
        points: 2,
        prompt: 'What is the standard HTTP header used to pass authentication Bearer tokens in REST APIs?',
        correctAnswer: 'Authorization',
        explanation: '`Authorization: Bearer <token>` is the standard header.'
      },
      {
        id: 'm17-q06',
        moduleId: 'm17',
        topicId: 'requests-library',
        topicTitle: 'requests Library',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which HTTP status codes indicate Client Errors (4xx)? (Select all that apply)',
        options: ['400 Bad Request', '401 Unauthorized', '404 Not Found', '500 Internal Server Error'],
        correctAnswer: [0, 1, 2],
        explanation: '500 is a Server Error (5xx), not a Client Error.'
      },
      {
        id: 'm17-q07',
        moduleId: 'm17',
        topicId: 'get-requests',
        topicTitle: 'GET Requests',
        type: 'debugging',
        points: 2,
        prompt: 'Why should `requests.get("https://api.com", timeout=10)` always include the `timeout` parameter?',
        options: [
          'To prevent the script from hanging indefinitely if the remote server drops the connection or fails to respond',
          'To encrypt the network packets',
          'To compress the response body',
          'To force IPv6'
        ],
        correctAnswer: 0,
        explanation: 'Without a timeout, socket operations can block indefinitely on unresponsive servers.'
      },
      {
        id: 'm17-q08',
        moduleId: 'm17',
        topicId: 'api-authentication',
        topicTitle: 'API Authentication',
        type: 'mcq',
        points: 1,
        prompt: 'Why is committing live API keys into public GitHub repositories dangerous?',
        options: [
          'Automated scrapers can steal the keys within seconds to incur financial costs or compromise private data',
          'Git will corrupt the repository',
          'Python will refuse to execute the file',
          'It deletes the virtual environment'
        ],
        correctAnswer: 0,
        explanation: 'Publicly committed API keys are rapidly harvested by automated bots for unauthorized use.'
      },
      {
        id: 'm17-q09',
        moduleId: 'm17',
        topicId: 'handling-json-responses',
        topicTitle: 'Handling JSON Responses',
        type: 'output',
        points: 2,
        prompt: 'What will be printed when filtering a list of user objects from a JSON response?',
        codeSnippet: `users = [
    {"name": "Alice", "active": True},
    {"name": "Bob", "active": False},
    {"name": "Charlie", "active": True}
]
active_names = [u["name"] for u in users if u["active"]]
print(", ".join(active_names))`,
        correctAnswer: 'Alice, Charlie',
        explanation: 'Filters active users Alice and Charlie.'
      },
      {
        id: 'm17-q10',
        moduleId: 'm17',
        topicId: 'post-requests',
        topicTitle: 'POST Requests',
        type: 'output',
        points: 2,
        prompt: 'What is the output of `response.ok` if `status_code` is 201?',
        correctAnswer: 'True',
        explanation: '`response.ok` is True for all 2xx success status codes.'
      },
      {
        id: 'm17-q11',
        moduleId: 'm17',
        topicId: 'handling-json-responses',
        topicTitle: 'Handling JSON Responses',
        type: 'code-writing',
        points: 4,
        prompt: 'Write a function `parse_github_repos(json_string)` that parses a JSON list of repository objects and returns a dictionary mapping `language` -> `total_stars_in_that_language`. (Ignore repos where language is null).',
        starterCode: `import json
from collections import defaultdict

def parse_github_repos(json_string):
    # Return dict mapping language -> sum of stars
    pass

import sys
if __name__ == "__main__":
    raw = sys.stdin.read().strip()
    if raw:
        print(dict(sorted(parse_github_repos(raw).items())))`,
        solutionCode: `import json
from collections import defaultdict

def parse_github_repos(json_string):
    repos = json.loads(json_string)
    lang_stars = defaultdict(int)
    for r in repos:
        lang = r.get("language")
        if lang:
            lang_stars[lang] += r.get("stargazers_count", 0)
    return dict(lang_stars)

import sys
if __name__ == "__main__":
    raw = sys.stdin.read().strip()
    if raw:
        print(dict(sorted(parse_github_repos(raw).items())))`,
        testCases: [
          {
            input: '[{"name": "app1", "language": "Python", "stargazers_count": 100}, {"name": "app2", "language": "TypeScript", "stargazers_count": 50}, {"name": "app3", "language": "Python", "stargazers_count": 150}, {"name": "docs", "language": null, "stargazers_count": 10}]',
            expectedOutput: "{'Python': 250, 'TypeScript': 50}"
          }
        ],
        explanation: 'Parses JSON, filters null languages, and aggregates stars by language.'
      },
      {
        id: 'm17-q12',
        moduleId: 'm17',
        topicId: 'api-authentication',
        topicTitle: 'API Authentication',
        type: 'code-writing',
        points: 4,
        prompt: 'Write a function `build_auth_header(api_token)` that takes a string token and returns a dictionary header: `{"Authorization": "Bearer <api_token>", "Accept": "application/json"}`. If `api_token` is empty or None, raise `ValueError("API token is required")`.',
        starterCode: `def build_auth_header(api_token):
    # Return header dictionary or raise ValueError
    pass

import sys
if __name__ == "__main__":
    tok = sys.stdin.read().strip()
    try:
        print(build_auth_header(tok if tok != "EMPTY" else None))
    except ValueError as e:
        print("ERROR:", e)`,
        solutionCode: `def build_auth_header(api_token):
    if not api_token:
        raise ValueError("API token is required")
    return {
        "Authorization": f"Bearer {api_token}",
        "Accept": "application/json"
    }

import sys
if __name__ == "__main__":
    tok = sys.stdin.read().strip()
    try:
        print(build_auth_header(tok if tok != "EMPTY" else None))
    except ValueError as e:
        print("ERROR:", e)`,
        testCases: [
          {
            input: "secret_token_123",
            expectedOutput: "{'Authorization': 'Bearer secret_token_123', 'Accept': 'application/json'}"
          },
          {
            input: "EMPTY",
            expectedOutput: "ERROR: API token is required"
          }
        ],
        explanation: 'Constructs Bearer authorization headers with input validation.'
      },
      {
        id: 'm17-q13',
        moduleId: 'm17',
        topicId: 'requests-library',
        topicTitle: 'requests Library',
        type: 'output',
        points: 2,
        prompt: 'What method on a `requests` Response object raises an `HTTPError` if the response was a 4xx or 5xx status code?',
        correctAnswer: 'raise_for_status()',
        explanation: '`response.raise_for_status()` raises an HTTPError for failure status codes.'
      },
      {
        id: 'm17-q14',
        moduleId: 'm17',
        topicId: 'get-requests',
        topicTitle: 'GET Requests',
        type: 'output',
        points: 2,
        prompt: 'What is the output of `urllib.parse.urlencode({"q": "python"})`?',
        correctAnswer: 'q=python',
        explanation: 'Encodes dictionary to URL query parameter string "q=python".'
      },
      {
        id: 'm17-q15',
        moduleId: 'm17',
        topicId: 'api-authentication',
        topicTitle: 'API Authentication',
        type: 'output',
        points: 2,
        prompt: 'What dictionary in the built-in `os` module contains operating system environment variables?',
        correctAnswer: 'os.environ',
        explanation: '`os.environ` provides access to environment variables.'
      },
      {
        id: 'm17-q16',
        moduleId: 'm17',
        topicId: 'post-requests',
        topicTitle: 'POST Requests',
        type: 'mcq',
        points: 1,
        prompt: 'Which HTTP method is typically used to create a new resource on a REST API server?',
        options: ['GET', 'POST', 'HEAD', 'OPTIONS'],
        correctAnswer: 1,
        explanation: 'POST is the standard HTTP method for creating new resources.'
      }
    ]
  },

  // =========================================================================
  // MODULE 18 ASSIGNMENT BANK (Databases with Python)
  // =========================================================================
  m18: {
    moduleId: 'm18',
    title: 'Module 18 Assignment: Databases with Python',
    timeLimitMinutes: 35,
    sampleCount: 15,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm18-q01',
        moduleId: 'm18',
        topicId: 'sqlite-basics',
        topicTitle: 'SQLite Basics',
        type: 'mcq',
        points: 1,
        prompt: 'What is the primary architectural characteristic of SQLite compared to client-server databases like PostgreSQL?',
        options: [
          'SQLite is serverless, embedded directly into the application process, and self-contained in a single file',
          'SQLite requires a dedicated cloud daemon running on port 5432',
          'SQLite only supports NoSQL documents',
          'SQLite cannot run on desktop computers'
        ],
        correctAnswer: 0,
        explanation: 'SQLite is serverless, storing the entire database in a single disk file or memory.'
      },
      {
        id: 'm18-q02',
        moduleId: 'm18',
        topicId: 'crud-operations',
        topicTitle: 'CRUD Operations',
        type: 'code-tracing',
        points: 3,
        prompt: 'Trace the database operations in this in-memory SQLite script. What is printed?',
        codeSnippet: `import sqlite3
conn = sqlite3.connect(":memory:")
c = conn.cursor()
c.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)")
c.execute("INSERT INTO users (name) VALUES ('Swamy')")
c.execute("INSERT INTO users (name) VALUES ('Alex')")
c.execute("UPDATE users SET name = 'Swamy Guradasu' WHERE id = 1")
c.execute("DELETE FROM users WHERE id = 2")
c.execute("SELECT COUNT(*) FROM users")
print(c.fetchone()[0])`,
        correctAnswer: '1',
        explanation: 'Inserted 2 users, updated 1, deleted 1: total remaining is 1.'
      },
      {
        id: 'm18-q03',
        moduleId: 'm18',
        topicId: 'crud-operations',
        topicTitle: 'CRUD Operations',
        type: 'mcq',
        points: 1,
        prompt: 'Why should you ALWAYS use parameterized queries `(?, ?)` instead of string concatenation `f"SELECT ... {user_input}"`?',
        options: [
          'To completely prevent SQL Injection attacks by separating SQL query structure from data values',
          'To make the database file smaller',
          'To convert text to numbers',
          'To sort rows automatically'
        ],
        correctAnswer: 0,
        explanation: 'Parameterized queries eliminate SQL injection by passing data through typed parameters.'
      },
      {
        id: 'm18-q04',
        moduleId: 'm18',
        topicId: 'connections-and-cursors',
        topicTitle: 'Connections and Cursors',
        type: 'output',
        points: 2,
        prompt: 'What will be printed when accessing columns by name with `sqlite3.Row`?',
        codeSnippet: `import sqlite3
conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row
c = conn.cursor()
c.execute("CREATE TABLE t (score INT)")
c.execute("INSERT INTO t VALUES (95)")
c.execute("SELECT score FROM t")
print(c.fetchone()["score"])`,
        correctAnswer: '95',
        explanation: '`conn.row_factory = sqlite3.Row` enables column-name dictionary access.'
      },
      {
        id: 'm18-q05',
        moduleId: 'm18',
        topicId: 'sqlite3-module',
        topicTitle: 'sqlite3 Module',
        type: 'output',
        points: 2,
        prompt: 'What method must be called to save changes to an SQLite database permanently?',
        correctAnswer: 'conn.commit()',
        explanation: '`conn.commit()` commits the active transaction.'
      },
      {
        id: 'm18-q06',
        moduleId: 'm18',
        topicId: 'sqlalchemy-orm-overview',
        topicTitle: 'SQLAlchemy / ORM Overview',
        type: 'mcq',
        points: 1,
        prompt: 'What is the role of an Object-Relational Mapper (ORM) in Python backend development?',
        options: [
          'To map database tables to Python classes and rows to Python object instances',
          'To convert Python scripts to JavaScript',
          'To compress video files',
          'To replace web browsers'
        ],
        correctAnswer: 0,
        explanation: 'ORMs bridge the gap between relational tables and object-oriented Python code.'
      },
      {
        id: 'm18-q07',
        moduleId: 'm18',
        topicId: 'connections-and-cursors',
        topicTitle: 'Connections and Cursors',
        type: 'output',
        points: 2,
        prompt: 'What will `len(cursor.fetchall())` return after executing `SELECT * FROM items` on an empty table?',
        correctAnswer: '0',
        explanation: '`fetchall()` returns an empty list `[]` with length 0.'
      },
      {
        id: 'm18-q08',
        moduleId: 'm18',
        topicId: 'sqlite3-module',
        topicTitle: 'sqlite3 Module',
        type: 'debugging',
        points: 2,
        prompt: 'A Python script inserts records into a local `app.db` file without calling `conn.commit()`. When reopened, the table is empty. Why?',
        options: [
          'Uncommitted transactions are rolled back when the connection closes',
          'SQLite deletes files on exit',
          'The table names were in lowercase',
          'Python cannot write to files'
        ],
        correctAnswer: 0,
        explanation: 'Without `conn.commit()`, uncommitted transactions are automatically discarded upon connection closure.'
      },
      {
        id: 'm18-q09',
        moduleId: 'm18',
        topicId: 'crud-operations',
        topicTitle: 'CRUD Operations',
        type: 'output',
        points: 2,
        prompt: 'What will be printed by this aggregate query?',
        codeSnippet: `import sqlite3
conn = sqlite3.connect(":memory:")
c = conn.cursor()
c.execute("CREATE TABLE products (price REAL)")
c.executemany("INSERT INTO products VALUES (?)", [(10.0,), (20.0,), (30.0,)])
c.execute("SELECT AVG(price) FROM products")
print(int(c.fetchone()[0]))`,
        correctAnswer: '20',
        explanation: 'Average of 10, 20, 30 is 20.0.'
      },
      {
        id: 'm18-q10',
        moduleId: 'm18',
        topicId: 'connections-and-cursors',
        topicTitle: 'Connections and Cursors',
        type: 'output',
        points: 2,
        prompt: 'What property on a cursor returns the auto-increment integer ID of the most recently inserted row?',
        correctAnswer: 'lastrowid',
        explanation: '`cursor.lastrowid` provides the ID of the last inserted row.'
      },
      {
        id: 'm18-q11',
        moduleId: 'm18',
        topicId: 'crud-operations',
        topicTitle: 'CRUD Operations',
        type: 'code-writing',
        points: 5,
        prompt: 'Implement a `StudentDatabaseManager` class backed by an in-memory SQLite database:\n- `__init__(self)` initializes table `students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, branch TEXT, marks REAL)`\n- `add_student(self, name, branch, marks)` -> returns new student `id`\n- `get_top_student(self)` -> returns `(name, branch, marks)` of student with highest marks\n- `delete_student(self, student_id)` -> deletes student by ID.',
        starterCode: `import sqlite3

class StudentDatabaseManager:
    # Implement database manager
    pass

import sys
if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if lines:
        mgr = StudentDatabaseManager()
        for line in lines:
            parts = line.split()
            mgr.add_student(parts[0], parts[1], float(parts[2]))
        top = mgr.get_top_student()
        print(f"Top: {top[0]} ({top[1]}) - {top[2]:.1f}")`,
        solutionCode: `import sqlite3

class StudentDatabaseManager:
    def __init__(self):
        self.conn = sqlite3.connect(":memory:")
        self.cursor = self.conn.cursor()
        self.cursor.execute("""
        CREATE TABLE students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            branch TEXT,
            marks REAL
        )
        """)
        self.conn.commit()

    def add_student(self, name, branch, marks):
        self.cursor.execute(
            "INSERT INTO students (name, branch, marks) VALUES (?, ?, ?)",
            (name, branch, marks)
        )
        self.conn.commit()
        return self.cursor.lastrowid

    def get_top_student(self):
        self.cursor.execute("SELECT name, branch, marks FROM students ORDER BY marks DESC LIMIT 1")
        return self.cursor.fetchone()

    def delete_student(self, student_id):
        self.cursor.execute("DELETE FROM students WHERE id = ?", (student_id,))
        self.conn.commit()

import sys
if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if lines:
        mgr = StudentDatabaseManager()
        for line in lines:
            parts = line.split()
            mgr.add_student(parts[0], parts[1], float(parts[2]))
        top = mgr.get_top_student()
        print(f"Top: {top[0]} ({top[1]}) - {top[2]:.1f}")`,
        testCases: [
          {
            input: "Swamy CS 95.5\nAlex AI 88.0\nAnanya ML 98.2",
            expectedOutput: "Top: Ananya (ML) - 98.2"
          }
        ],
        explanation: 'Implements full SQLite CRUD operations and query ordering in Python.'
      },
      {
        id: 'm18-q12',
        moduleId: 'm18',
        topicId: 'sqlite-basics',
        topicTitle: 'SQLite Basics',
        type: 'output',
        points: 2,
        prompt: 'What special database path connects to an in-memory SQLite database?',
        correctAnswer: ':memory:',
        explanation: '`:memory:` connects to a temporary in-memory database.'
      },
      {
        id: 'm18-q13',
        moduleId: 'm18',
        topicId: 'crud-operations',
        topicTitle: 'CRUD Operations',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which four operations constitute the CRUD database paradigm? (Select all 4)',
        options: ['Create (INSERT)', 'Read (SELECT)', 'Update (UPDATE)', 'Delete (DELETE)'],
        correctAnswer: [0, 1, 2, 3],
        explanation: 'CRUD stands for Create, Read, Update, Delete.'
      },
      {
        id: 'm18-q14',
        moduleId: 'm18',
        topicId: 'connections-and-cursors',
        topicTitle: 'Connections and Cursors',
        type: 'output',
        points: 2,
        prompt: 'What method executes a SQL command against a batch sequence of parameters in SQLite?',
        correctAnswer: 'executemany',
        explanation: '`cursor.executemany()` performs batch SQL execution.'
      },
      {
        id: 'm18-q15',
        moduleId: 'm18',
        topicId: 'sqlalchemy-orm-overview',
        topicTitle: 'SQLAlchemy / ORM Overview',
        type: 'output',
        points: 2,
        prompt: 'What is the premier industry-standard ORM toolkit for Python?',
        correctAnswer: 'SQLAlchemy',
        explanation: 'SQLAlchemy is the leading Python ORM library.'
      },
      {
        id: 'm18-q16',
        moduleId: 'm18',
        topicId: 'sqlite3-module',
        topicTitle: 'sqlite3 Module',
        type: 'output',
        points: 2,
        prompt: 'What SQL clause prevents table creation errors if the table already exists?',
        correctAnswer: 'IF NOT EXISTS',
        explanation: '`CREATE TABLE IF NOT EXISTS` prevents duplicate table errors.'
      },
      {
        id: 'm18-q17',
        moduleId: 'm18',
        topicId: 'crud-operations',
        topicTitle: 'CRUD Operations',
        type: 'output',
        points: 2,
        prompt: 'What will `DELETE FROM users` do if NO `WHERE` clause is provided?',
        correctAnswer: 'Deletes all rows in the users table',
        explanation: '`DELETE` without a `WHERE` clause deletes every row in the table.'
      },
      {
        id: 'm18-q18',
        moduleId: 'm18',
        topicId: 'sqlite-basics',
        topicTitle: 'SQLite Basics',
        type: 'mcq',
        points: 1,
        prompt: 'What data type in SQLite is used to store text strings?',
        options: ['TEXT', 'VARCHAR2', 'STRING', 'CHAR_ARRAY'],
        correctAnswer: 0,
        explanation: 'SQLite uses the `TEXT` storage class for text strings.'
      }
    ]
  },

  // =========================================================================
  // MODULE 19 ASSIGNMENT BANK (Virtual Environments & Project Structure)
  // =========================================================================
  m19: {
    moduleId: 'm19',
    title: 'Module 19 Assignment: Virtual Environments & Project Structure',
    timeLimitMinutes: 25,
    sampleCount: 12,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm19-q01',
        moduleId: 'm19',
        topicId: 'venv',
        topicTitle: 'venv',
        type: 'mcq',
        points: 1,
        prompt: 'Which command creates an isolated virtual environment directory named `.venv` in Python 3?',
        options: ['python -m venv .venv', 'pip create venv', 'python make venv', 'venv init .venv'],
        correctAnswer: 0,
        explanation: '`python -m venv .venv` creates a virtual environment.'
      },
      {
        id: 'm19-q02',
        moduleId: 'm19',
        topicId: 'requirements-txt',
        topicTitle: 'requirements.txt',
        type: 'output',
        points: 2,
        prompt: 'Which CLI command exports all installed packages in the active virtual environment to requirements.txt?',
        correctAnswer: 'pip freeze > requirements.txt',
        explanation: '`pip freeze > requirements.txt` exports dependencies.'
      },
      {
        id: 'm19-q03',
        moduleId: 'm19',
        topicId: 'python-project-structure',
        topicTitle: 'Python Project Structure',
        type: 'mcq',
        points: 1,
        prompt: 'Which directory layout pattern is recommended by the Python Packaging Authority (PyPA) for organizing application code?',
        options: ['The `src/` layout', 'Putting everything in Desktop', 'A single 5,000 line main.py', 'The node_modules folder'],
        correctAnswer: 0,
        explanation: 'The `src/` layout isolates the package from the root project directory.'
      },
      {
        id: 'm19-q04',
        moduleId: 'm19',
        topicId: 'intro-to-git',
        topicTitle: 'Intro to Git',
        type: 'output',
        points: 2,
        prompt: 'What command stages all modified and new files for the next Git commit?',
        correctAnswer: 'git add .',
        explanation: '`git add .` stages all files in the current working directory.'
      },
      {
        id: 'm19-q05',
        moduleId: 'm19',
        topicId: 'python-project-structure',
        topicTitle: 'Python Project Structure',
        type: 'multiple-select',
        points: 2,
        prompt: 'Which entries should typically be included in a Python `.gitignore` file? (Select all that apply)',
        options: ['.venv/ or venv/', '__pycache__/', '.env and *.secret', 'src/'],
        correctAnswer: [0, 1, 2],
        explanation: '`src/` contains project source code and must be tracked in Git.'
      },
      {
        id: 'm19-q06',
        moduleId: 'm19',
        topicId: 'venv',
        topicTitle: 'venv',
        type: 'output',
        points: 2,
        prompt: 'What command is used in the terminal to exit an active Python virtual environment?',
        correctAnswer: 'deactivate',
        explanation: '`deactivate` exits the virtual environment.'
      },
      {
        id: 'm19-q07',
        moduleId: 'm19',
        topicId: 'organizing-python-projects',
        topicTitle: 'Organizing Python Projects',
        type: 'mcq',
        points: 1,
        prompt: 'What software architecture principle states that each module should have only one responsibility and reason to change?',
        options: ['Single Responsibility Principle (SRP)', 'Open-Close Inversion', 'Monolithic Scaling', 'Global State Rule'],
        correctAnswer: 0,
        explanation: 'The Single Responsibility Principle (SRP) mandates focused module responsibilities.'
      },
      {
        id: 'm19-q08',
        moduleId: 'm19',
        topicId: 'intro-to-git',
        topicTitle: 'Intro to Git',
        type: 'output',
        points: 2,
        prompt: 'What command creates and immediately switches to a new Git branch named `feature-api`?',
        correctAnswer: 'git checkout -b feature-api',
        explanation: '`git checkout -b <branch>` (or `git switch -c`) creates and switches to a new branch.'
      },
      {
        id: 'm19-q09',
        moduleId: 'm19',
        topicId: 'requirements-txt',
        topicTitle: 'requirements.txt',
        type: 'mcq',
        points: 1,
        prompt: 'What does `fastapi==0.110.0` mean in a `requirements.txt` file?',
        options: [
          'Locks the exact package version to 0.110.0',
          'Installs any version greater than 0.110.0',
          'Uninstalls version 0.110.0',
          'Renames the package'
        ],
        correctAnswer: 0,
        explanation: '`==` pins an exact locked version.'
      },
      {
        id: 'm19-q10',
        moduleId: 'm19',
        topicId: 'organizing-python-projects',
        topicTitle: 'Organizing Python Projects',
        type: 'output',
        points: 2,
        prompt: 'What standard markdown file in the project root describes how to install and run the application?',
        correctAnswer: 'README.md',
        explanation: '`README.md` is the primary documentation file.'
      },
      {
        id: 'm19-q11',
        moduleId: 'm19',
        topicId: 'python-project-structure',
        topicTitle: 'Python Project Structure',
        type: 'code-writing',
        points: 4,
        prompt: 'Write a function `validate_project_layout(file_paths_list)` that takes a list of relative file paths and verifies that ALL 4 required files exist: `["README.md", "requirements.txt", ".gitignore", "src/__init__.py"]`. Return `True` if all exist, otherwise `False`.',
        starterCode: `def validate_project_layout(file_paths_list):
    # Return True if all 4 required files exist
    pass

import sys
if __name__ == "__main__":
    paths = sys.stdin.read().splitlines()
    print(validate_project_layout(paths))`,
        solutionCode: `def validate_project_layout(file_paths_list):
    required = {"README.md", "requirements.txt", ".gitignore", "src/__init__.py"}
    existing = {p.strip().replace("\\\\", "/") for p in file_paths_list if p.strip()}
    return required.issubset(existing)

import sys
if __name__ == "__main__":
    paths = sys.stdin.read().splitlines()
    print(validate_project_layout(paths))`,
        testCases: [
          {
            input: "README.md\nrequirements.txt\n.gitignore\nsrc/__init__.py\nsrc/main.py",
            expectedOutput: "True"
          },
          {
            input: "README.md\nmain.py",
            expectedOutput: "False"
          }
        ],
        explanation: 'Verifies standard project structure compliance.'
      },
      {
        id: 'm19-q12',
        moduleId: 'm19',
        topicId: 'intro-to-git',
        topicTitle: 'Intro to Git',
        type: 'mcq',
        points: 1,
        prompt: 'Which Git command displays the repository commit history in reverse chronological order?',
        options: ['git log', 'git history', 'git timeline', 'git commits'],
        correctAnswer: 0,
        explanation: '`git log` displays commit history.'
      },
      {
        id: 'm19-q13',
        moduleId: 'm19',
        topicId: 'requirements-txt',
        topicTitle: 'requirements.txt',
        type: 'output',
        points: 2,
        prompt: 'What command installs all packages listed in `requirements.txt`?',
        correctAnswer: 'pip install -r requirements.txt',
        explanation: '`pip install -r requirements.txt` installs dependencies.'
      },
      {
        id: 'm19-q14',
        moduleId: 'm19',
        topicId: 'venv',
        topicTitle: 'venv',
        type: 'output',
        points: 2,
        prompt: 'What is the primary benefit of Python virtual environments in one word?',
        correctAnswer: 'Isolation',
        explanation: 'Virtual environments provide dependency isolation.'
      },
      {
        id: 'm19-q15',
        moduleId: 'm19',
        topicId: 'intro-to-git',
        topicTitle: 'Intro to Git',
        type: 'output',
        points: 2,
        prompt: 'What Git command is used to download new changes from a remote repository into the active local branch?',
        correctAnswer: 'git pull',
        explanation: '`git pull` fetches and merges remote changes.'
      }
    ]
  },

  // =========================================================================
  // MODULE 20 ASSIGNMENT BANK (Testing & Debugging)
  // =========================================================================
  m20: {
    moduleId: 'm20',
    title: 'Module 20 Assignment: Testing & Debugging',
    timeLimitMinutes: 35,
    sampleCount: 15,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'm20-q01',
        moduleId: 'm20',
        topicId: 'unittest-basics',
        topicTitle: 'unittest Basics',
        type: 'mcq',
        points: 1,
        prompt: 'Which base class must be inherited to create unit tests using Python\'s built-in `unittest` module?',
        options: ['unittest.TestCase', 'unittest.Suite', 'unittest.Runner', 'unittest.BaseTest'],
        correctAnswer: 0,
        explanation: '`unittest.TestCase` is the base class for unittest test suites.'
      },
      {
        id: 'm20-q02',
        moduleId: 'm20',
        topicId: 'pytest-basics',
        topicTitle: 'pytest Basics',
        type: 'output',
        points: 2,
        prompt: 'What keyword does `pytest` use for all test assertions?',
        correctAnswer: 'assert',
        explanation: '`pytest` uses standard Python `assert` statements.'
      },
      {
        id: 'm20-q03',
        moduleId: 'm20',
        topicId: 'debugging-techniques',
        topicTitle: 'Debugging Techniques',
        type: 'debugging',
        points: 3,
        prompt: 'Debug this function that crashes with `IndexError: list index out of range` on empty lists. Select the fix.',
        codeSnippet: `def get_first_element(items):
    return items[0]  # Crashes when items = []`,
        options: [
          'def get_first_element(items, default=None):\n    return items[0] if items else default',
          'def get_first_element(items):\n    return items[1]',
          'def get_first_element(items):\n    return items[-1]',
          'def get_first_element(items):\n    return str(items)'
        ],
        correctAnswer: 0,
        explanation: 'Checking `if items:` protects against indexing empty collections.'
      },
      {
        id: 'm20-q04',
        moduleId: 'm20',
        topicId: 'debugging-techniques',
        topicTitle: 'Debugging Techniques',
        type: 'debugging',
        points: 3,
        prompt: 'Debug this function that calculates an average score. It crashes with `ZeroDivisionError` when no scores are passed. Select the fix.',
        codeSnippet: `def average_score(scores):
    return sum(scores) / len(scores)`,
        options: [
          'def average_score(scores):\n    return sum(scores) / len(scores) if scores else 0.0',
          'def average_score(scores):\n    return sum(scores) / (len(scores) + 1)',
          'def average_score(scores):\n    return len(scores) / sum(scores)',
          'def average_score(scores):\n    return 0'
        ],
        correctAnswer: 0,
        explanation: 'Guards against division by zero by returning `0.0` when `scores` is empty.'
      },
      {
        id: 'm20-q05',
        moduleId: 'm20',
        topicId: 'debugging-techniques',
        topicTitle: 'Debugging Techniques',
        type: 'debugging',
        points: 3,
        prompt: 'A function crashes with `TypeError: can only concatenate str (not "int") to str`. Select the correct fix.',
        codeSnippet: `def format_user_badge(username, points):
    return "User: " + username + " | Points: " + points`,
        options: [
          'def format_user_badge(username, points):\n    return f"User: {username} | Points: {points}"',
          'def format_user_badge(username, points):\n    return username + points',
          'def format_user_badge(username, points):\n    return int(username) + points',
          'def format_user_badge(username, points):\n    return points'
        ],
        correctAnswer: 0,
        explanation: 'Using an f-string handles string interpolation across mixed types safely.'
      },
      {
        id: 'm20-q06',
        moduleId: 'm20',
        topicId: 'logging-module',
        topicTitle: 'Logging Module',
        type: 'output',
        points: 2,
        prompt: 'List the 5 standard logging levels in Python in order from lowest severity to highest severity (separated by commas).',
        correctAnswer: 'DEBUG, INFO, WARNING, ERROR, CRITICAL',
        explanation: 'DEBUG, INFO, WARNING, ERROR, CRITICAL.'
      },
      {
        id: 'm20-q07',
        moduleId: 'm20',
        topicId: 'logging-module',
        topicTitle: 'Logging Module',
        type: 'mcq',
        points: 1,
        prompt: 'Which method on a logger instance automatically captures and records the full exception traceback inside an `except` block?',
        options: ['logger.exception()', 'logger.traceback()', 'logger.error_full()', 'logger.catch()'],
        correctAnswer: 0,
        explanation: '`logger.exception()` logs at ERROR level with the full traceback automatically attached.'
      },
      {
        id: 'm20-q08',
        moduleId: 'm20',
        topicId: 'writing-test-cases',
        topicTitle: 'Writing Test Cases',
        type: 'mcq',
        points: 1,
        prompt: 'What are "boundary edge cases" in software test suites?',
        options: [
          'Test inputs at the extreme limits of valid operating values (e.g. 0, empty collections, negative numbers, None)',
          'Tests written in another language',
          'Tests that test CSS styles',
          'Tests that only run on weekends'
        ],
        correctAnswer: 0,
        explanation: 'Edge cases test boundary limits where bugs occur most frequently.'
      },
      {
        id: 'm20-q09',
        moduleId: 'm20',
        topicId: 'debugging-techniques',
        topicTitle: 'Debugging Techniques',
        type: 'output',
        points: 2,
        prompt: 'What built-in function in Python 3.7+ drops execution into an interactive `pdb` debugger prompt?',
        correctAnswer: 'breakpoint()',
        explanation: '`breakpoint()` invokes `pdb`.'
      },
      {
        id: 'm20-q10',
        moduleId: 'm20',
        topicId: 'unittest-basics',
        topicTitle: 'unittest Basics',
        type: 'output',
        points: 2,
        prompt: 'What prefix must test methods have in a `unittest.TestCase` class?',
        correctAnswer: 'test_',
        explanation: 'Test methods must start with `test_`.'
      },
      {
        id: 'm20-q11',
        moduleId: 'm20',
        topicId: 'writing-test-cases',
        topicTitle: 'Writing Test Cases',
        type: 'code-writing',
        points: 4,
        prompt: 'Write a unit test function `test_calculator_suite()` that tests a `divide(a, b)` function with 3 assertions:\n1. `divide(10, 2) == 5.0`\n2. `divide(7, 2) == 3.5`\n3. Verifies that `divide(10, 0)` raises `ZeroDivisionError` using `try-except`.',
        starterCode: `def divide(a, b):
    if b == 0: raise ZeroDivisionError("division by zero")
    return a / b

def test_calculator_suite():
    # Write assertions
    pass

if __name__ == "__main__":
    test_calculator_suite()
    print("ALL TESTS PASSED")`,
        solutionCode: `def divide(a, b):
    if b == 0: raise ZeroDivisionError("division by zero")
    return a / b

def test_calculator_suite():
    assert divide(10, 2) == 5.0
    assert divide(7, 2) == 3.5
    raised = False
    try:
        divide(10, 0)
    except ZeroDivisionError:
        raised = True
    assert raised is True

if __name__ == "__main__":
    test_calculator_suite()
    print("ALL TESTS PASSED")`,
        testCases: [
          { input: "", expectedOutput: "ALL TESTS PASSED" }
        ],
        explanation: 'Tests happy path and exception cases.'
      },
      {
        id: 'm20-q12',
        moduleId: 'm20',
        topicId: 'logging-module',
        topicTitle: 'Logging Module',
        type: 'code-writing',
        points: 4,
        prompt: 'Write a function `format_log_entry(level, message)` that returns a formatted log string: `"[LEVEL] message"`. If level is not one of `["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]`, raise `ValueError("Invalid log level")`.',
        starterCode: `def format_log_entry(level, message):
    # Format log entry or raise ValueError
    pass

import sys
if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        try:
            print(format_log_entry(lines[0], lines[1]))
        except ValueError as e:
            print("ERROR:", e)`,
        solutionCode: `def format_log_entry(level, message):
    valid_levels = {"DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"}
    lvl = level.upper().strip()
    if lvl not in valid_levels:
        raise ValueError("Invalid log level")
    return f"[{lvl}] {message}"

import sys
if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        try:
            print(format_log_entry(lines[0], lines[1]))
        except ValueError as e:
            print("ERROR:", e)`,
        testCases: [
          {
            input: "INFO\nServer started on port 8000",
            expectedOutput: "[INFO] Server started on port 8000"
          },
          {
            input: "INVALID_LVL\nTest message",
            expectedOutput: "ERROR: Invalid log level"
          }
        ],
        explanation: 'Enforces standard logging severity levels and message formatting.'
      },
      {
        id: 'm20-q13',
        moduleId: 'm20',
        topicId: 'debugging-techniques',
        topicTitle: 'Debugging Techniques',
        type: 'output',
        points: 2,
        prompt: 'What error is raised when accessing an undefined variable `print(my_secret_var)`?',
        correctAnswer: 'NameError',
        explanation: '`NameError` is raised when referencing undefined variables.'
      },
      {
        id: 'm20-q14',
        moduleId: 'm20',
        topicId: 'logging-module',
        topicTitle: 'Logging Module',
        type: 'mcq',
        points: 1,
        prompt: 'Why is using `logging` preferred over `print()` statements in production services?',
        options: [
          'Logging supports severity levels, timestamps, formatting, and output routing to rotating log files and monitoring services',
          'Logging compiles Python to machine code',
          'Print statements delete variable contents',
          'Logging uses less electricity'
        ],
        correctAnswer: 0,
        explanation: 'The `logging` module provides structured levels, formatting, and file routing.'
      },
      {
        id: 'm20-q15',
        moduleId: 'm20',
        topicId: 'pytest-basics',
        topicTitle: 'pytest Basics',
        type: 'output',
        points: 2,
        prompt: 'What CLI flag filters and runs pytest tests matching a keyword: `pytest ___ "test_user"`?',
        correctAnswer: '-k',
        explanation: '`-k` filters tests by keyword expression in pytest.'
      },
      {
        id: 'm20-q16',
        moduleId: 'm20',
        topicId: 'unittest-basics',
        topicTitle: 'unittest Basics',
        type: 'output',
        points: 2,
        prompt: 'What method in `unittest.TestCase` runs setup code BEFORE each individual test method executes?',
        correctAnswer: 'setUp()',
        explanation: '`setUp()` executes before each test method in `unittest.TestCase`.'
      },
      {
        id: 'm20-q17',
        moduleId: 'm20',
        topicId: 'writing-test-cases',
        topicTitle: 'Writing Test Cases',
        type: 'output',
        points: 2,
        prompt: 'What metric measures the percentage of source code executed during automated test runs?',
        correctAnswer: 'Code Coverage',
        explanation: 'Code Coverage measures test execution coverage.'
      },
      {
        id: 'm20-q18',
        moduleId: 'm20',
        topicId: 'debugging-techniques',
        topicTitle: 'Debugging Techniques',
        type: 'output',
        points: 2,
        prompt: 'What error is raised when attempting to mutate an immutable tuple: `(1, 2)[0] = 5`?',
        correctAnswer: 'TypeError',
        explanation: 'Tuples are immutable; assignment raises `TypeError: \'tuple\' object does not support item assignment`.'
      }
    ]
  }
};
