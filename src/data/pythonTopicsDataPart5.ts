import { PythonTopicDetail } from './pythonTopicsDataPart1';

export const PYTHON_TOPICS_PART5: Record<string, PythonTopicDetail> = {
  // =========================================================================
  // MODULE 15: Regular Expressions (5 Topics)
  // =========================================================================
  're-module-basics': {
    id: 're-module-basics',
    moduleId: 'm15',
    topicNumber: 1,
    title: '`re` Module Basics & Raw Strings',
    shortSummary: 'Understanding regex concepts, raw strings r"...", literal matching, and importing the re module.',
    whatIsIt: 'Regular Expressions (regex) provide a standardized pattern-matching syntax for searching, extracting, validating, and replacing complex text patterns. Python provides the built-in `re` module for regular expressions.',
    whyDoWeNeedIt: 'Standard string methods (`.find()`, `.replace()`) only handle exact string matches. Regex allows you to match variable patterns like email addresses, phone numbers, postal codes, timestamps, and unstructured log formats with a single pattern.',
    syntax: `import re

# Always use raw strings r"..." to prevent Python escape character conflicts
pattern = r"hello"
text = "hello world"

# Check if pattern matches text
match = re.search(pattern, text)
if match:
    print("Found match:", match.group())`,
    basicExample: {
      code: `import re

text = "Welcome to LevelUpDev Python Skills Trail 2026!"

# Literal pattern matching
pattern = r"LevelUpDev"
match = re.search(pattern, text)

if match:
    print("Pattern found:", match.group())
    print("Start index:", match.start())
    print("End index:", match.end())
    print("Span tuple:", match.span())`,
      output: `Pattern found: LevelUpDev
Start index: 11
End index: 21
Span tuple: (11, 21)`
    },
    detailedExample: {
      code: `import re

# Why Raw Strings r"..." are MANDATORY in Python regex:
# In regular Python strings, "\\n" is a newline and "\\b" is a backspace.
# In regex, "\\b" represents a word boundary.
# Raw strings tell Python not to interpret backslashes as escape characters.

text = "cat category bobcat cat"

# Match "cat" as a standalone whole word using word boundaries \\b
word_pattern = r"\\bcat\\b"
matches = re.findall(word_pattern, text)

print("Text:", text)
print("Exact word matches for 'cat':", matches)
print("Match count:", len(matches))`,
      output: `Text: cat category bobcat cat
Exact word matches for 'cat': ['cat', 'cat']
Match count: 2`
    },
    codeExplanation: [
      'Line 1: Imports Python\'s built-in `re` module.',
      'Line 9: Uses `r"\\bcat\\b"` where `r` denotes a raw string, preserving literal backslashes for regex word boundary anchors.',
      'Line 10: `re.findall()` extracts all occurrences matching the standalone word condition, ignoring "category" and "bobcat".'
    ],
    commonMistakes: [
      {
        mistake: 'Using standard strings without the raw string prefix: `"\\bword\\b"`.',
        whyItIsWrong: 'Python interprets `\\b` as the ASCII backspace character (code 8), breaking the regex word boundary pattern.',
        correction: 'Always prefix regex string literals with `r`, e.g., `r"\\bword\\b"`.'
      },
      {
        mistake: 'Assuming `re.match()` searches anywhere in the string.',
        whyItIsWrong: '`re.match()` ONLY matches from the start of the string (index 0). If the pattern appears in the middle, it returns `None`.',
        correction: 'Use `re.search()` to search anywhere within the string.'
      }
    ],
    importantRules: [
      'Always use raw strings `r"pattern"` for regex in Python.',
      '`re` is part of Python\'s Standard Library (no pip install needed).',
      '`re.search()` returns a `Match` object if found, or `None` if no match exists.'
    ],
    interviewPerspective: 'Interviewers often ask why raw strings `r"..."` are used in Python regex and the difference between `re.match()`, `re.search()`, and `re.findall()`.',
    practiceQuestions: [
      {
        question: 'What prefix is placed before a string literal in Python to make it a raw string for regex?',
        solution: 'r (e.g. r"pattern")'
      },
      {
        question: 'What does `re.search(pattern, text)` return if no match is found?',
        solution: 'None'
      }
    ],
    checkpoint: [
      {
        id: 'm15-t1-q1',
        type: 'mcq',
        prompt: 'Why should you use raw string notation (`r"..."`) when defining regular expression patterns in Python?',
        options: [
          'It makes the regular expression run in C++ mode',
          'It prevents Python from interpreting backslashes as string escape sequences',
          'It forces the regex to be case-insensitive',
          'It converts text strings into binary bytes'
        ],
        correctAnswer: 1,
        explanation: 'Raw strings treat backslashes as literal characters, preventing Python from converting sequences like `\\n` or `\\b` into ASCII control codes.'
      },
      {
        id: 'm15-t1-q2',
        type: 'output',
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `import re
text = "The price is $50 USD"
m = re.search(r"price", text)
print(type(m).__name__, m.group())`,
        correctAnswer: 'Match price',
        explanation: '`re.search` returns a `Match` object, and `.group()` returns the matched text ("price").'
      }
    ]
  },

  'pattern-matching': {
    id: 'pattern-matching',
    moduleId: 'm15',
    topicNumber: 2,
    title: 'Pattern Matching, Character Classes & Quantifiers',
    shortSummary: 'Special sequences (\\d, \\w, \\s), custom brackets [], and quantifiers (+, *, ?, {m,n}).',
    whatIsIt: 'Character classes and quantifiers form the foundation of regex patterns. Character classes (`\\d` for digits, `\\w` for word characters, `\\s` for whitespace, `[a-z]` for custom ranges) specify WHAT characters to match. Quantifiers (`+`, `*`, `?`, `{m,n}`) specify HOW MANY times they must appear.',
    whyDoWeNeedIt: 'Allows matching dynamic data formats like IP addresses, zip codes, product IDs, and usernames with variable lengths and character sets.',
    syntax: `# Character Classes:
# \\d  -> Digits [0-9]
# \\D  -> Non-digits
# \\w  -> Word characters [a-zA-Z0-9_]
# \\W  -> Non-word characters
# \\s  -> Whitespace [ \\t\\n\\r]
# [aeiou] -> Custom set (vowels)
# [^0-9]  -> Negated set (not a digit)

# Quantifiers:
# +      -> 1 or more
# *      -> 0 or more
# ?      -> 0 or 1 (optional)
# {n}    -> Exactly n times
# {min,max} -> Between min and max times`,
    basicExample: {
      code: `import re

# Matching phone numbers in format: 3 digits - 3 digits - 4 digits
text = "Call office at 800-555-0199 or mobile at 415-555-2671."
pattern = r"\\d{3}-\\d{3}-\\d{4}"

phones = re.findall(pattern, text)
print("Found phone numbers:", phones)`,
      output: `Found phone numbers: ['800-555-0199', '415-555-2671']`
    },
    detailedExample: {
      code: `import re

# Validating user account tokens (e.g. USR_ followed by 4-6 alphanumeric characters)
tokens = ["USR_a9B2", "USR_123456", "INVALID_1", "USR_x", "USR_9999999"]
pattern = r"^USR_[a-zA-Z0-9]{4,6}$"

for token in tokens:
    is_valid = bool(re.search(pattern, token))
    print(f"{token:<12} -> Valid: {is_valid}")`,
      output: `USR_a9B2     -> Valid: True
USR_123456   -> Valid: True
INVALID_1    -> Valid: False
USR_x        -> Valid: False
USR_9999999  -> Valid: False`
    },
    codeExplanation: [
      'Line 5: `^` anchors match to start of string, `$` anchors to end of string.',
      'Line 5: `USR_` matches literal prefix.',
      'Line 5: `[a-zA-Z0-9]{4,6}` matches between 4 and 6 alphanumeric characters.'
    ],
    commonMistakes: [
      {
        mistake: 'Confusing `+` (1 or more) with `*` (0 or more).',
        whyItIsWrong: 'Using `*` allows empty matches where characters are completely absent.',
        correction: 'Use `+` when at least one character is strictly required.'
      },
      {
        mistake: 'Putting spaces inside quantifier brackets: `\\d{3, 4}`.',
        whyItIsWrong: 'Spaces inside `{}` invalidate the quantifier syntax and make it match literal spaces.',
        correction: 'Never add spaces inside quantifiers: `\\d{3,4}`.'
      }
    ],
    importantRules: [
      '`\\d` matches `[0-9]`; uppercase `\\D` matches anything that is NOT a digit.',
      '`\\w` matches letters, digits, and underscores `[a-zA-Z0-9_]`.',
      '`^` anchors to start of string/line; `$` anchors to end of string/line.'
    ],
    interviewPerspective: 'In interviews, you will frequently be asked to write regex patterns for email validation, password strength rules, and extracting specific log timestamps.',
    practiceQuestions: [
      {
        question: 'Which regex character class matches any decimal digit from 0 to 9?',
        solution: '\\d'
      },
      {
        question: 'What quantifier matches a pattern between 2 and 5 times?',
        solution: '{2,5}'
      }
    ],
    checkpoint: [
      {
        id: 'm15-t2-q1',
        type: 'output',
        prompt: 'What will `len(re.findall(r"\\d+", "Order 42 has 15 items and 3 refunds"))` output?',
        codeSnippet: `import re
text = "Order 42 has 15 items and 3 refunds"
print(len(re.findall(r"\\d+", text)))`,
        correctAnswer: '3',
        explanation: '`re.findall(r"\\d+", ...)` finds all sequences of digits: ["42", "15", "3"], which has length 3.'
      },
      {
        id: 'm15-t2-q2',
        type: 'mcq',
        prompt: 'Which regex quantifier matches 0 or 1 occurrence of the preceding element (making it optional)?',
        options: ['*', '+', '?', '{1}'],
        correctAnswer: 2,
        explanation: '`?` specifies 0 or 1 occurrence (optional match).'
      }
    ]
  },

  'search-method': {
    id: 'search-method',
    moduleId: 'm15',
    topicNumber: 3,
    title: 'The search() Method & Match Groups',
    shortSummary: 'Extracting matched text, match objects, start/end positions, and capturing groups with ().',
    whatIsIt: '`re.search(pattern, text)` scans through a string looking for the FIRST location where the regex pattern produces a match. If successful, it returns a `Match` object. Capturing parentheses `()` inside the pattern allow extracting specific sub-components into groups via `match.group(1)`, `match.group(2)`, etc.',
    whyDoWeNeedIt: '`re.search()` is used for structured entity extraction: splitting URLs into protocol and domain, parsing log timestamps and severity levels, or extracting name and score pairs.',
    syntax: `import re

# Capturing groups with parentheses ()
pattern = r"(\\w+)@([\\w\\.]+)"
text = "Contact support@levelup.dev for assistance"

match = re.search(pattern, text)
if match:
    full_email = match.group(0)  # Complete match: "support@levelup.dev"
    username   = match.group(1)  # Group 1: "support"
    domain     = match.group(2)  # Group 2: "levelup.dev"`,
    basicExample: {
      code: `import re

log_line = "2026-09-20 [ERROR] Connection timeout on port 8080"
pattern = r"(\\d{4}-\\d{2}-\\d{2}) \\[(\\w+)\\] (.+)"

m = re.search(pattern, log_line)
if m:
    print("Full Match:", m.group(0))
    print("Date Group 1:", m.group(1))
    print("Level Group 2:", m.group(2))
    print("Message Group 3:", m.group(3))`,
      output: `Full Match: 2026-09-20 [ERROR] Connection timeout on port 8080
Date Group 1: 2026-09-20
Level Group 2: ERROR
Message Group 3: Connection timeout on port 8080`
    },
    detailedExample: {
      code: `import re

# Named Capturing Groups using (?P<name>pattern)
url = "https://api.levelup.dev:8443/v1/users?limit=10"
pattern = r"(?P<protocol>https?)://(?P<host>[^:/]+)(?::(?P<port>\\d+))?(?P<path>/.*)?"

match = re.search(pattern, url)
if match:
    # Access groups by name dictionary
    info = match.groupdict()
    print("Parsed URL Dictionary:")
    for k, v in info.items():
        print(f"  {k}: {v}")`,
      output: `Parsed URL Dictionary:
  protocol: https
  host: api.levelup.dev
  port: 8443
  path: /v1/users?limit=10`
    },
    codeExplanation: [
      'Line 4: Uses named capturing groups `(?P<protocol>...)` and optional non-capturing port port group.',
      'Line 9: `match.groupdict()` extracts all named groups directly into a clean Python dictionary.'
    ],
    commonMistakes: [
      {
        mistake: 'Calling `.group()` on `None` when `re.search()` finds no match.',
        whyItIsWrong: 'Raises `AttributeError: \'NoneType\' object has no attribute \'group\'`.',
        correction: 'Always verify `if match:` or `if match is not None:` before accessing `.group()`.'
      },
      {
        mistake: 'Assuming `group(1)` returns the entire match.',
        whyItIsWrong: '`group(0)` returns the entire match; `group(1)` returns the first captured parenthesis group.',
        correction: 'Use `group(0)` for full match, `group(1)` for the first capturing group.'
      }
    ],
    importantRules: [
      '`re.search()` finds the FIRST matching substring anywhere in the text.',
      '`group(0)` or `group()` returns the entire matched text.',
      '`group(1..n)` returns the text captured by the corresponding `()` parentheses group.'
    ],
    interviewPerspective: 'A favourite interview question: "How do you extract domain names from URLs using named groups in Python regex?"',
    practiceQuestions: [
      {
        question: 'Which method on a Match object returns a dictionary of all named groups?',
        solution: 'match.groupdict()'
      },
      {
        question: 'What does `match.group(0)` return?',
        solution: 'The entire substring that matched the regular expression pattern.'
      }
    ],
    checkpoint: [
      {
        id: 'm15-t3-q1',
        type: 'output',
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `import re
text = "User: Swamy | Score: 98"
m = re.search(r"Score: (\\d+)", text)
print(m.group(1))`,
        correctAnswer: '98',
        explanation: '`(\\d+)` is capturing group 1, which captures "98".'
      },
      {
        id: 'm15-t3-q2',
        type: 'mcq',
        prompt: 'What happens if you execute `re.search(pattern, text).group()` when no match is found in `text`?',
        options: [
          'It returns an empty string ""',
          'It raises an AttributeError because re.search returned None',
          'It returns False',
          'It restarts the search'
        ],
        correctAnswer: 1,
        explanation: 'When no match is found, `re.search()` returns `None`, so calling `.group()` raises `AttributeError`.'
      }
    ]
  },

  'findall-method': {
    id: 'findall-method',
    moduleId: 'm15',
    topicNumber: 4,
    title: 'The findall() & finditer() Methods',
    shortSummary: 'Extracting all non-overlapping matches as lists or iterators.',
    whatIsIt: '`re.findall(pattern, text)` returns a list of all non-overlapping matches of the pattern in the string. If the pattern contains capturing groups, it returns a list of tuples containing the group values. `re.finditer()` returns an iterator yielding `Match` objects for each match.',
    whyDoWeNeedIt: 'Extracting all email addresses from a page, scraping all currency amounts from a document, or parsing CSV tokens in bulk.',
    syntax: `import re

# 1. Without groups: returns list of matching strings
emails = re.findall(r"[\\w\\.-]+@[\\w\\.-]+\\.\\w+", text)

# 2. With groups: returns list of tuples
pairs = re.findall(r"(\\w+)=(\\d+)", "a=10 b=20 c=30")
# [('a', '10'), ('b', '20'), ('c', '30')]`,
    basicExample: {
      code: `import re

text = "Prices: Apple is \$1.50, Banana is \$0.75, Mango is \$2.25."
# Match dollar sign followed by digits, dot, digits
prices = re.findall(r"\\$\\d+\\.\\d{2}", text)

print("Found prices:", prices)
print("Count:", len(prices))`,
      output: `Found prices: ['\$1.50', '\$0.75', '\$2.25']
Count: 3`
    },
    detailedExample: {
      code: `import re

html = """
<a href="https://google.com">Google</a>
<a href="https://github.com">GitHub</a>
<a href="https://levelup.dev">LevelUpDev</a>
"""

# Extract both link URL and link text using capturing groups
pattern = r'<a href="([^"]+)">([^<]+)</a>'
links = re.findall(pattern, html)

print("Extracted Links (URL, Text):")
for url, title in links:
    print(f" - {title}: {url}")`,
      output: `Extracted Links (URL, Text):
 - Google: https://google.com
 - GitHub: https://github.com
 - LevelUpDev: https://levelup.dev`
    },
    codeExplanation: [
      'Line 10: `([^"]+)` captures the URL in group 1, and `([^<]+)` captures link text in group 2.',
      'Line 11: When pattern has multiple groups, `re.findall()` returns a list of tuples `[(url1, text1), (url2, text2)]`.'
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting that adding parentheses inside a `findall()` pattern changes the return shape from strings to tuples.',
        whyItIsWrong: '`re.findall(r"(\\d+)-(\\d+)", "1-2 3-4")` returns `[(\'1\', \'2\'), (\'3\', \'4\')]` instead of `[\'1-2\', \'3-4\']`.',
        correction: 'Use non-capturing groups `(?:pattern)` if you want grouping without changing `findall` output shape.'
      },
      {
        mistake: 'Using `re.findall()` on massive 1GB text files when `re.finditer()` is memory efficient.',
        whyItIsWrong: '`re.findall()` constructs the full list in memory simultaneously.',
        correction: 'Use `re.finditer()` to stream match objects lazily with O(1) memory.'
      }
    ],
    importantRules: [
      '`re.findall()` returns an empty list `[]` if no matches are found (never `None`).',
      'If 1 group is present, returns a list of strings for that group.',
      'If 2+ groups are present, returns a list of tuples of groups.'
    ],
    interviewPerspective: 'Interviewers often ask how to use non-capturing groups `(?:...)` with `re.findall()` to prevent unintended tuple unpacking.',
    practiceQuestions: [
      {
        question: 'What does `re.findall()` return if no matches are found in the target string?',
        solution: 'An empty list: []'
      },
      {
        question: 'How do you create a non-capturing group in Python regex?',
        solution: '(?:pattern)'
      }
    ],
    checkpoint: [
      {
        id: 'm15-t4-q1',
        type: 'output',
        prompt: 'What will be printed by `len(re.findall(r"[A-Z]", "LevelUpDev 2026"))`?',
        correctAnswer: '3',
        explanation: 'There are 3 uppercase letters: "L", "U", "D".'
      },
      {
        id: 'm15-t4-q2',
        type: 'mcq',
        prompt: 'What does `re.findall()` return when the pattern contains multiple capturing groups `r"(\\w+):(\\d+)"`?',
        options: [
          'A single dictionary mapping keys to values',
          'A list of tuples, where each tuple contains the captured groups for each match',
          'A single concatenated string',
          'A generator object'
        ],
        correctAnswer: 1,
        explanation: 'When 2 or more groups are present, `re.findall()` returns a list of group tuples.'
      }
    ]
  },

  'sub-method': {
    id: 'sub-method',
    moduleId: 'm15',
    topicNumber: 5,
    title: 'The sub() Method (Search & Replace)',
    shortSummary: 'Text substitution, data sanitization, masking sensitive data, and replacement callbacks.',
    whatIsIt: '`re.sub(pattern, replacement, text, count=0)` replaces occurrences of the regex pattern in `text` with `replacement`. The replacement can be a string (which can reference captured groups with `\\1`, `\\2`) or a callable function for dynamic transformation.',
    whyDoWeNeedIt: '`re.sub()` is essential for data cleaning: normalizing whitespace, stripping HTML tags, masking sensitive credit card/phone numbers, slugifying text, and formatting phone numbers.',
    syntax: `import re

# 1. Simple replacement
cleaned = re.sub(r"\\s+", " ", "Too   many    spaces")

# 2. Backreference to captured groups (\\1, \\2)
# Convert YYYY-MM-DD to DD/MM/YYYY
formatted = re.sub(r"(\\d{4})-(\\d{2})-(\\d{2})", r"\\3/\\2/\\1", "2026-09-20")

# 3. Dynamic replacement using callback function
def censor_card(match):
    return "XXXX-XXXX-XXXX-" + match.group(1)`,
    basicExample: {
      code: `import re

raw_text = "Contact info: email is john.doe@secret.org and phone is 555-123-4567."

# 1. Mask email addresses
masked_emails = re.sub(r"[\\w\\.-]+@[\\w\\.-]+", "[REDACTED_EMAIL]", raw_text)

# 2. Clean multiple consecutive punctuation / spaces
cleaned = re.sub(r"\\s+", " ", masked_emails)

print("Original:", raw_text)
print("Sanitized:", cleaned)`,
      output: `Original: Contact info: email is john.doe@secret.org and phone is 555-123-4567.
Sanitized: Contact info: email is [REDACTED_EMAIL] and phone is 555-123-4567.`
    },
    detailedExample: {
      code: `import re

# Dynamic replacement with callback function: Uppercase all hashtags
post = "Welcome to #python and #levelupdev for #fullstack coding!"

def uppercase_tag(match):
    tag_name = match.group(1)
    return "#" + tag_name.upper()

transformed = re.sub(r"#(\\w+)", uppercase_tag, post)
print("Transformed:", transformed)

# Reordering date components via backreferences:
date_str = "Release date: 2026-12-31"
uk_date = re.sub(r"(\\d{4})-(\\d{2})-(\\d{2})", r"\\3-\\2-\\1", date_str)
print("UK Date Format:", uk_date)`,
      output: `Transformed: Welcome to #PYTHON and #LEVELUPDEV for #FULLSTACK coding!
UK Date Format: Release date: 31-12-2026`
    },
    codeExplanation: [
      'Line 7: `uppercase_tag` receives each `Match` object and dynamically transforms the matched group.',
      'Line 14: `\\3-\\2-\\1` reorders captured groups 3 (day), 2 (month), and 1 (year).'
    ],
    commonMistakes: [
      {
        mistake: 'Using `$1` instead of `\\1` or `\\g<1>` for group backreferences in `re.sub()`.',
        whyItIsWrong: 'Python regex uses `\\1` (or `\\g<name>`), unlike JavaScript which uses `$1`. Writing `$1` inserts literal "$1".',
        correction: 'Use `\\1` or `r"\\g<1>"` in Python replacement strings.'
      },
      {
        mistake: 'Assuming `re.sub()` modifies the string in place.',
        whyItIsWrong: 'Python strings are immutable; `re.sub()` returns a new string.',
        correction: 'Assign the returned result: `text = re.sub(...)`.'
      }
    ],
    importantRules: [
      '`re.sub()` returns a new string with replacements applied.',
      'Use `\\1`, `\\2` or `\\g<name>` in the replacement string to reference captured groups.',
      'A function can be passed as the replacement argument for dynamic evaluation.'
    ],
    interviewPerspective: 'Interviewers often ask how to implement a markdown-to-HTML parser or sensitive PII anonymizer using `re.sub()` with callback functions.',
    practiceQuestions: [
      {
        question: 'How do you refer to captured group 1 in a `re.sub()` replacement string?',
        solution: '\\1 or \\g<1>'
      },
      {
        question: 'What is returned by `re.sub(r"\\d", "#", "A1B2C3")`?',
        solution: '"A#B#C#"'
      }
    ],
    checkpoint: [
      {
        id: 'm15-t5-q1',
        type: 'output',
        prompt: 'What will be printed by this Python code snippet?',
        codeSnippet: `import re
text = "Hello    World!   Python   Trail"
clean = re.sub(r"\\s+", " ", text)
print(clean)`,
        correctAnswer: 'Hello World! Python Trail',
        explanation: '`re.sub(r"\\s+", " ", ...)` condenses all sequences of whitespace down to single spaces.'
      },
      {
        id: 'm15-t5-q2',
        type: 'mcq',
        prompt: 'Which syntax correctly references the second captured group in a `re.sub()` replacement string in Python?',
        options: ['$2', '\\2', '%2', '{group2}'],
        correctAnswer: 1,
        explanation: 'Python regex uses `\\2` or `\\g<2>` to reference captured groups in replacement strings.'
      }
    ]
  },

  // =========================================================================
  // MODULE 16: Decorators & Context Managers (5 Topics)
  // =========================================================================
  'function-decorators': {
    id: 'function-decorators',
    moduleId: 'm16',
    topicNumber: 1,
    title: 'Function Decorators & First-Class Functions',
    shortSummary: 'Functions as first-class objects, closures, higher-order functions, and @decorator syntax.',
    whatIsIt: 'In Python, functions are First-Class Objects (they can be assigned to variables, passed as arguments, and returned from other functions). A Decorator is a higher-order function that takes another function as an argument, extends or modifies its behavior without modifying its source code, and returns a new callable.',
    whyDoWeNeedIt: 'Decorators implement cross-cutting concerns (logging, authentication, caching, rate limiting, execution timing) in a clean, reusable, and DRY manner.',
    syntax: `# Manual Decoration:
# def my_func(): pass
# my_func = decorator(my_func)

# Syntactic Sugar with @:
@decorator
def my_func():
    pass`,
    basicExample: {
      code: `def shout_decorator(func):
    def wrapper():
        original_result = func()
        return original_result.upper() + "!!!"
    return wrapper

@shout_decorator
def greet():
    return "hello levelupdev"

print(greet())`,
      output: `HELLO LEVELUPDEV!!!`
    },
    detailedExample: {
      code: `import time

# Execution Timing Decorator
def measure_time(func):
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start
        print(f"[TIMING] {func.__name__} took {duration:.6f}s")
        return result
    return wrapper

@measure_time
def compute_sum(n):
    return sum(i * 2 for i in range(n))

print("Result:", compute_sum(100000))`,
      output: `[TIMING] compute_sum took 0.004200s
Result: 9999900000`
    },
    codeExplanation: [
      'Line 5: `wrapper(*args, **kwargs)` accepts arbitrary positional and keyword arguments passed to the target function.',
      'Line 8: Executes the original target function and calculates execution time.',
      'Line 10: Returns the original function\'s computed output.'
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting `*args, **kwargs` in the wrapper function signature.',
        whyItIsWrong: 'The decorated function will crash with `TypeError` whenever arguments are passed to it.',
        correction: 'Always define the inner wrapper as `def wrapper(*args, **kwargs):` and call `func(*args, **kwargs)`.'
      },
      {
        mistake: 'Forgetting to return the inner wrapper from the outer decorator function.',
        whyItIsWrong: 'The decorated function is replaced with `None`, raising `TypeError: \'NoneType\' object is not callable`.',
        correction: 'Always end your decorator with `return wrapper`.'
      }
    ],
    importantRules: [
      'Decorators take a function as input and return a replacement callable.',
      'The `@decorator` syntax is applied at function definition time.',
      'Always accept `*args, **kwargs` in wrappers to support any parameter signature.'
    ],
    interviewPerspective: 'One of the top 3 most common Python interview topics: "Explain how decorators work in Python and write a timer or logging decorator from scratch."',
    practiceQuestions: [
      {
        question: 'What does `@my_decorator` placed above `def func():` desugar to in Python?',
        solution: 'func = my_decorator(func)'
      },
      {
        question: 'Why should wrapper functions accept `*args, **kwargs`?',
        solution: 'To ensure the decorator works with any function regardless of its parameter signature.'
      }
    ],
    checkpoint: [
      {
        id: 'm16-t1-q1',
        type: 'output',
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `def double_result(f):
    def wrapper(x):
        return f(x) * 2
    return wrapper

@double_result
def add_ten(n):
    return n + 10

print(add_ten(5))`,
        correctAnswer: '30',
        explanation: '`add_ten(5)` returns 15, which the wrapper doubles to 30.'
      },
      {
        id: 'm16-t1-q2',
        type: 'mcq',
        prompt: 'What happens if a decorator forgets to return its inner wrapper function (`return wrapper`)?',
        options: [
          'Python uses the original function unchanged',
          'The decorated function becomes `None`, causing a TypeError when called',
          'A SyntaxError is raised at compile time',
          'The function runs twice'
        ],
        correctAnswer: 1,
        explanation: 'Because the decorator returns `None`, the function name is bound to `None`, causing a TypeError upon invocation.'
      }
    ]
  },

  'custom-decorators': {
    id: 'custom-decorators',
    moduleId: 'm16',
    topicNumber: 2,
    title: 'Creating Custom Decorators & functools.wraps',
    shortSummary: 'Preserving metadata with @wraps, parameterized decorators, and stacking multiple decorators.',
    whatIsIt: 'When a function is decorated, its identity (`__name__`, `__doc__`, signature) is overwritten by the inner wrapper. The `@functools.wraps` decorator copies original metadata back to the wrapper. Furthermore, Decorators with Arguments (3-level closures) allow configuring decorator parameters (e.g. `@retry(attempts=3)`).',
    whyDoWeNeedIt: '`@wraps` is mandatory for production libraries, documentation generators (Sphinx), and debuggers. Parameterized decorators provide configurable tools like role-based authentication (`@require_role("admin")`).',
    syntax: `import functools

def repeat(num_times):
    """Decorator factory with argument"""
    def decorator_repeat(func):
        @functools.wraps(func)  # Preserves func metadata
        def wrapper(*args, **kwargs):
            for _ in range(num_times - 1):
                func(*args, **kwargs)
            return func(*args, **kwargs)
        return wrapper
    return decorator_repeat`,
    basicExample: {
      code: `import functools

def debug_logger(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"[CALL] {func.__name__} with args={args}")
        return func(*args, **kwargs)
    return wrapper

@debug_logger
def multiply(a, b):
    """Multiplies two numbers."""
    return a * b

print(multiply(6, 7))
print("Function Name:", multiply.__name__)
print("Docstring:", multiply.__doc__)`,
      output: `[CALL] multiply with args=(6, 7)
42
Function Name: multiply
Docstring: Multiplies two numbers.`
    },
    detailedExample: {
      code: `import functools

# Parameterized Decorator: Role-Based Authorization
def require_role(allowed_role):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(user, *args, **kwargs):
            if user.get("role") != allowed_role:
                raise PermissionError(f"Access denied: {user.get('name')} is not {allowed_role}")
            return func(user, *args, **kwargs)
        return wrapper
    return decorator

@require_role("admin")
def delete_database(user, db_name):
    return f"Database '{db_name}' deleted by {user['name']}."

admin_user = {"name": "Swamy", "role": "admin"}
guest_user = {"name": "Guest", "role": "visitor"}

print(delete_database(admin_user, "staging_db"))

try:
    delete_database(guest_user, "prod_db")
except PermissionError as err:
    print("Security Alert:", err)`,
      output: `Database 'staging_db' deleted by Swamy.
Security Alert: Access denied: Guest is not admin`
    },
    codeExplanation: [
      'Line 2: `require_role("admin")` is a 3-level closure accepting configuration arguments.',
      'Line 4: `@functools.wraps(func)` preserves function introspection attributes.',
      'Line 7: Intercepts and validates `user["role"]` before allowing execution.'
    ],
    commonMistakes: [
      {
        mistake: 'Omitting `@functools.wraps(func)` in custom decorators.',
        whyItIsWrong: '`func.__name__` becomes `"wrapper"` and docstrings are erased, breaking test runners and introspection tools.',
        correction: 'Always add `@functools.wraps(func)` above your inner `wrapper` definition.'
      },
      {
        mistake: 'Confusing 2-level decorators with 3-level parameterized decorators.',
        whyItIsWrong: 'If `@decorator(arg)` is used without an outer factory function, Python passes `arg` instead of the decorated function.',
        correction: 'Use 3 nested functions when your decorator accepts parameters.'
      }
    ],
    importantRules: [
      'Always use `@functools.wraps(func)` to preserve function metadata.',
      'Decorators with arguments require 3 levels of nested functions (factory -> decorator -> wrapper).',
      'Multiple decorators are executed in bottom-up (inside-out) order: `@dec1 @dec2 def f():` equals `dec1(dec2(f))`.'
    ],
    interviewPerspective: 'Senior interviewers test your understanding of stacking multiple decorators and writing parameterized decorators with `@functools.wraps`.',
    practiceQuestions: [
      {
        question: 'Which module and decorator is used in Python to preserve the original function\'s name and docstring inside a wrapper?',
        solution: 'functools.wraps'
      },
      {
        question: 'If two decorators `@dec1` and `@dec2` are stacked above `func`, which one executes first when `func()` is called?',
        solution: '`dec1` executes its outer wrapper first, which then calls `dec2`\'s wrapper.'
      }
    ],
    checkpoint: [
      {
        id: 'm16-t2-q1',
        type: 'output',
        prompt: 'What is the output of `f.__name__` if `@functools.wraps` is properly used?',
        codeSnippet: `import functools
def my_dec(fn):
    @functools.wraps(fn)
    def wrapper(): return fn()
    return wrapper

@my_dec
def calculate(): pass
print(calculate.__name__)`,
        correctAnswer: 'calculate',
        explanation: '`@functools.wraps` preserves `calculate.__name__` instead of replacing it with "wrapper".'
      },
      {
        id: 'm16-t2-q2',
        type: 'mcq',
        prompt: 'How many levels of nested functions are required to create a decorator that accepts configuration arguments (like `@repeat(3)`)?',
        options: ['1 level', '2 levels', '3 levels', '4 levels'],
        correctAnswer: 2,
        explanation: '3 levels: Outer factory function (takes decorator args) -> Decorator function (takes target func) -> Wrapper function (takes runtime args).'
      }
    ]
  },

  'custom-context-managers': {
    id: 'custom-context-managers',
    moduleId: 'm16',
    topicNumber: 3,
    title: 'Custom Context Managers & contextlib',
    shortSummary: 'Resource management lifecycle, why context managers matter, and @contextlib.contextmanager.',
    whatIsIt: 'A Context Manager is a Python object that defines the runtime context for execution inside a `with` statement. You can create custom context managers using either a Class (implementing `__enter__` and `__exit__`) or a Generator function decorated with `@contextlib.contextmanager`.',
    whyDoWeNeedIt: 'Guarantees reliable resource allocation and de-allocation: acquiring/releasing locks, establishing/closing database sessions, temporary file handling, and measuring execution blocks.',
    syntax: `from contextlib import contextmanager

@contextmanager
def managed_resource():
    # 1. Setup (Runs on entering with)
    resource = acquire_resource()
    try:
        yield resource  # Passed to 'as' variable
    finally:
        # 2. Teardown (Guaranteed cleanup on exiting with)
        resource.release()`,
    basicExample: {
      code: `from contextlib import contextmanager
import time

@contextmanager
def timer_block(label):
    print(f"--- Starting: {label} ---")
    start = time.perf_counter()
    try:
        yield
    finally:
        elapsed = time.perf_counter() - start
        print(f"--- Completed: {label} in {elapsed:.4f}s ---")

with timer_block("Data Aggregation"):
    total = sum(i**2 for i in range(50000))
    print("Computed total sum:", total)`,
      output: `--- Starting: Data Aggregation ---
Computed total sum: 41665416675000
--- Completed: Data Aggregation in 0.0035s ---`
    },
    detailedExample: {
      code: `from contextlib import contextmanager

# Temporary Working Directory or State Switcher
class MockDatabaseSession:
    def __init__(self, db_name):
        self.db_name = db_name
        self.is_connected = False

    def query(self, sql):
        return f"Results from {self.db_name} for '{sql}'"

@contextmanager
def db_session(db_name):
    session = MockDatabaseSession(db_name)
    session.is_connected = True
    print(f"[DB] Session opened for '{db_name}'")
    try:
        yield session
    except Exception as err:
        print(f"[DB] Rolling back transaction due to error: {err}")
        raise
    finally:
        session.is_connected = False
        print(f"[DB] Session closed safely for '{db_name}'")

with db_session("users_db") as db:
    print(db.query("SELECT * FROM users LIMIT 5"))`,
      output: `[DB] Session opened for 'users_db'
Results from users_db for 'SELECT * FROM users LIMIT 5'
[DB] Session closed safely for 'users_db'`
    },
    codeExplanation: [
      'Line 11: `@contextmanager` converts the generator into a context manager.',
      'Line 15: `yield session` exposes `session` to the `as db` variable.',
      'Line 20: The `finally` block executes automatically upon block exit.'
    ],
    commonMistakes: [
      {
        mistake: 'Omitting the `try-finally` block inside a `@contextmanager` generator function.',
        whyItIsWrong: 'If an exception occurs inside the `with` block, the code after `yield` is never reached, leaking resources.',
        correction: 'Always wrap code around `yield` inside a `try ... finally:` construct.'
      },
      {
        mistake: 'Yielding multiple times inside a `@contextmanager` generator.',
        whyItIsWrong: 'Raises `RuntimeError: generator didn\'t stop` because context managers must yield exactly once.',
        correction: 'Ensure your generator yields exactly once.'
      }
    ],
    importantRules: [
      'Code before `yield` runs on `__enter__`; code after `yield` runs on `__exit__`.',
      'Always wrap the `yield` statement inside `try ... finally:` for guaranteed cleanup.',
      '`contextlib.contextmanager` is the standard Python utility for generator-based context managers.'
    ],
    interviewPerspective: 'Interviewers often ask candidates to contrast Class-based context managers (`__enter__`/`__exit__`) with Generator-based context managers (`@contextlib.contextmanager`).',
    practiceQuestions: [
      {
        question: 'Which standard library decorator allows creating a context manager from a generator function?',
        solution: 'contextlib.contextmanager'
      },
      {
        question: 'How many times must a `@contextmanager` generator function yield?',
        solution: 'Exactly once'
      }
    ],
    checkpoint: [
      {
        id: 'm16-t3-q1',
        type: 'output',
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `from contextlib import contextmanager
@contextmanager
def tag(name):
    print(f"<{name}>", end="")
    yield
    print(f"</{name}>")

with tag("b"):
    print("Bold Text", end="")`,
        correctAnswer: '<b>Bold Text</b>',
        explanation: 'Before yield prints `<b>`, the block prints "Bold Text", and after yield prints `</b>`.'
      },
      {
        id: 'm16-t3-q2',
        type: 'mcq',
        prompt: 'Why is `try...finally` essential when creating context managers with `@contextlib.contextmanager`?',
        options: [
          'To ensure cleanup code after `yield` executes even if an unhandled exception occurs inside the `with` block',
          'To speed up CPU execution',
          'To allow yielding more than once',
          'To format SQL queries'
        ],
        correctAnswer: 0,
        explanation: '`try...finally` guarantees cleanup execution even when the `with` block raises an exception.'
      }
    ]
  },

  'enter-method': {
    id: 'enter-method',
    moduleId: 'm16',
    topicNumber: 4,
    title: 'The `__enter__` Method',
    shortSummary: 'Acquiring resources, returning values to the "as" target, and context initialization.',
    whatIsIt: 'The `__enter__(self)` method is the first lifecycle hook called when entering a `with` statement. Its return value is bound to the variable specified in the `as target` clause of the `with` statement.',
    whyDoWeNeedIt: '`__enter__` initializes state, connects to external resources, acquires system locks, and returns the active handle to the caller.',
    syntax: `class CustomResource:
    def __enter__(self):
        # 1. Acquire resource
        self.handle = open_resource()
        # 2. Return object to 'as' target
        return self.handle`,
    basicExample: {
      code: `class ManagedList:
    def __init__(self):
        self.data = []

    def __enter__(self):
        print("1. [__enter__] Initializing temporary buffer")
        return self.data  # Bound to 'as' variable

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"3. [__exit__] Final buffer size: {len(self.data)} items")

with ManagedList() as buffer:
    print("2. Inside with block: adding items to buffer")
    buffer.append("Item A")
    buffer.append("Item B")`,
      output: `1. [__enter__] Initializing temporary buffer
2. Inside with block: adding items to buffer
3. [__exit__] Final buffer size: 2 items`
    },
    detailedExample: {
      code: `class HTMLBuilder:
    def __init__(self, tag_name):
        self.tag = tag_name
        self.content = []

    def __enter__(self):
        print(f"<{self.tag}>")
        return self  # Return self so caller can invoke methods

    def add_line(self, text):
        self.content.append(f"  {text}")

    def __exit__(self, exc_type, exc_val, exc_tb):
        for line in self.content:
            print(line)
        print(f"</{self.tag}>")

with HTMLBuilder("div") as builder:
    builder.add_line("<p>Hello World</p>")
    builder.add_line("<span>Skills Trail</span>")`,
      output: `<div>
  <p>Hello World</p>
  <span>Skills Trail</span>
</div>`
    },
    codeExplanation: [
      'Line 6: `__enter__` prints the opening HTML tag and returns `self`.',
      'Line 17: `as builder` receives `self`, allowing calls to `builder.add_line(...)`.',
      'Line 12: `__exit__` prints buffered lines and the closing HTML tag.'
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting to return a value from `__enter__` when using `with Resource() as target:`.',
        whyItIsWrong: '`target` is assigned `None` because methods in Python implicitly return `None` if no `return` is written.',
        correction: 'Explicitly `return self` or the acquired resource object from `__enter__`.'
      },
      {
        mistake: 'Assuming `__enter__` receives exception information.',
        whyItIsWrong: '`__enter__` only takes `self`; exception parameters are passed to `__exit__`.',
        correction: 'Only pass `self` to `__enter__`.'
      }
    ],
    importantRules: [
      '`__enter__` is executed immediately upon entering the `with` statement.',
      'The value returned by `__enter__` is assigned to the `as <variable>` identifier.',
      'If no `as` clause is present, the return value of `__enter__` is ignored.'
    ],
    interviewPerspective: 'Interviewers often check whether you know what determines the value of the `as variable` identifier in a `with` statement (the return value of `__enter__`).',
    practiceQuestions: [
      {
        question: 'What is assigned to `x` in `with MyContext() as x:`?',
        solution: 'The return value of `MyContext().__enter__()`'
      },
      {
        question: 'Does `__enter__` execute before or after the code inside the with block?',
        solution: 'Before'
      }
    ],
    checkpoint: [
      {
        id: 'm16-t4-q1',
        type: 'output',
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `class Greeter:
    def __enter__(self):
        return "Hello World"
    def __exit__(self, a, b, c):
        pass

with Greeter() as msg:
    print(msg.upper())`,
        correctAnswer: 'HELLO WORLD',
        explanation: '`__enter__` returns "Hello World", which is bound to `msg` and printed in uppercase.'
      },
      {
        id: 'm16-t4-q2',
        type: 'mcq',
        prompt: 'If `__enter__` does not have an explicit `return` statement, what value will `var` have in `with MyClass() as var:`?',
        options: ['None', 'True', 'MyClass instance', 'An empty dict'],
        correctAnswer: 0,
        explanation: 'Functions and methods in Python return `None` by default if no return statement is specified.'
      }
    ]
  },

  'exit-method': {
    id: 'exit-method',
    moduleId: 'm16',
    topicNumber: 5,
    title: 'The `__exit__` Method & Exception Suppression',
    shortSummary: 'Cleanup teardown, parameters (exc_type, exc_val, exc_tb), and suppressing exceptions with return True.',
    whatIsIt: 'The `__exit__(self, exc_type, exc_val, exc_tb)` method is called when execution leaves the `with` block. It receives 3 exception arguments (or `None, None, None` if no exception occurred). If an exception occurred and `__exit__` returns `True`, Python suppresses the exception and continues execution outside the `with` block.',
    whyDoWeNeedIt: '`__exit__` guarantees resource release, logs error diagnostics, performs database rollback on errors, and selectively suppresses expected transient exceptions.',
    syntax: `class SafeContext:
    def __exit__(self, exc_type, exc_val, exc_tb):
        # Guaranteed cleanup:
        self.cleanup()
        
        # If an error occurred and we want to suppress it:
        if exc_type is not None:
            print(f"Handled exception: {exc_val}")
            return True  # Suppress exception from propagating!
        return False`,
    basicExample: {
      code: `class SuppressErrors:
    def __init__(self, *error_types):
        self.error_types = error_types

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type and issubclass(exc_type, self.error_types):
            print(f"Safely suppressed: {exc_type.__name__} ('{exc_val}')")
            return True  # Suppress exception!
        return False  # Let other exceptions propagate

with SuppressErrors(ZeroDivisionError, ValueError):
    print("1. Dividing by zero...")
    x = 10 / 0  # ZeroDivisionError suppressed
    print("This line skipped.")

print("2. Program continued execution safely outside with-block!")`,
      output: `1. Dividing by zero...
Safely suppressed: ZeroDivisionError ('division by zero')
2. Program continued execution safely outside with-block!`
    },
    detailedExample: {
      code: `class DatabaseTransaction:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        print(f"[TX] Begin transaction '{self.name}'")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None:
            print(f"[TX] ERROR: {exc_val} -> Rolling back transaction '{self.name}'")
            return False  # Do NOT suppress; re-raise to caller
        print(f"[TX] Success -> Committing transaction '{self.name}'")
        return True

try:
    with DatabaseTransaction("transfer_funds"):
        print("  Executing: Debit Account A \$100")
        print("  Executing: Credit Account B \$100")
        raise RuntimeError("Network timeout during credit")
except RuntimeError as err:
    print(f"Caught outside transaction: {err}")`,
      output: `[TX] Begin transaction 'transfer_funds'
  Executing: Debit Account A \$100
  Executing: Credit Account B \$100
[TX] ERROR: Network timeout during credit -> Rolling back transaction 'transfer_funds'
Caught outside transaction: Network timeout during credit`
    },
    codeExplanation: [
      'Line 8: `__exit__` receives `exc_type=RuntimeError`, `exc_val`, and traceback.',
      'Line 10: Rolls back transaction.',
      'Line 11: `return False` allows the `RuntimeError` to propagate to the outer `try-except` block.'
    ],
    commonMistakes: [
      {
        mistake: 'Returning `True` unintentionally from `__exit__`.',
        whyItIsWrong: 'Silently suppresses ALL exceptions (including `NameError`, `SyntaxError`, `TypeError`), hiding critical bugs.',
        correction: 'Only return `True` when explicitly intending to suppress specific expected exception classes.'
      },
      {
        mistake: 'Missing the 3 exception parameters in `def __exit__(self):`.',
        whyItIsWrong: 'Python passes `exc_type, exc_val, exc_tb`, raising `TypeError: __exit__() takes 1 positional argument but 4 were given`.',
        correction: 'Always define `def __exit__(self, exc_type, exc_val, exc_tb):`.'
      }
    ],
    importantRules: [
      '`__exit__` must accept 4 parameters: `self, exc_type, exc_val, exc_tb`.',
      'Returning `True` suppresses the exception; returning `False` (or `None`) allows it to propagate.',
      '`__exit__` is always executed, even if the `with` block raises an exception.'
    ],
    interviewPerspective: 'A classic Python interview question: "How can a context manager suppress an exception raised inside a with block?" (By returning `True` from `__exit__`).',
    practiceQuestions: [
      {
        question: 'What are the 4 arguments accepted by the `__exit__` method of a context manager class?',
        solution: 'self, exc_type, exc_val, exc_tb'
      },
      {
        question: 'What boolean return value from `__exit__` instructs Python to suppress an exception?',
        solution: 'True'
      }
    ],
    checkpoint: [
      {
        id: 'm16-t5-q1',
        type: 'output',
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `class MuteError:
    def __enter__(self): return self
    def __exit__(self, a, b, c): return True

with MuteError():
    int("invalid_integer")
print("SURVIVED")`,
        correctAnswer: 'SURVIVED',
        explanation: 'Because `__exit__` returns `True`, the `ValueError` from `int("invalid_integer")` is suppressed, and "SURVIVED" is printed.'
      },
      {
        id: 'm16-t5-q2',
        type: 'mcq',
        prompt: 'What values are passed to `(exc_type, exc_val, exc_tb)` in `__exit__` when the `with` block finishes without any errors?',
        options: [
          '(None, None, None)',
          '(True, True, True)',
          '(0, 0, 0)',
          '(StopIteration, None, None)'
        ],
        correctAnswer: 0,
        explanation: 'When no exceptions occur, Python passes `(None, None, None)` to `__exit__`.'
      }
    ]
  },

  // =========================================================================
  // MODULE 17: Working with APIs (5 Topics)
  // =========================================================================
  'requests-library': {
    id: 'requests-library',
    moduleId: 'm17',
    topicNumber: 1,
    title: 'The `requests` Library & HTTP Basics',
    shortSummary: 'HTTP protocol, client-server model, HTTP status codes, and the requests library.',
    whatIsIt: 'The `requests` library is the de-facto standard Python library for making HTTP requests ("HTTP for Humans"). It abstracts complex networking operations, handling SSL verification, connection pooling, cookie persistence, and header management seamlessly.',
    whyDoWeNeedIt: 'Modern applications consume third-party Web APIs (weather feeds, payment processors like Stripe, AI models like OpenAI/Gemini, and database APIs) using standard HTTP requests.',
    syntax: `# Installing requests:
# pip install requests

import requests

# Basic request:
# response = requests.get("https://api.example.com/data")
# print(response.status_code)
# print(response.json())`,
    basicExample: {
      code: `import json

# Simulating a Response object architecture:
class MockHTTPResponse:
    def __init__(self, status_code, data):
        self.status_code = status_code
        self._data = data

    @property
    def ok(self):
        return 200 <= self.status_code < 300

    def json(self):
        return json.loads(self._data)

# Simulating response from GET https://api.github.com/users/octocat
raw_json = '{"login": "octocat", "id": 583231, "public_repos": 8}'
resp = MockHTTPResponse(200, raw_json)

print("HTTP Status Code:", resp.status_code)
print("Request Successful (ok):", resp.ok)
print("Parsed JSON login:", resp.json()["login"])`,
      output: `HTTP Status Code: 200
Request Successful (ok): True
Parsed JSON login: octocat`
    },
    detailedExample: {
      code: `# HTTP Status Code Categories:
# 2xx Success: 200 OK, 201 Created, 204 No Content
# 3xx Redirection: 301 Moved Permanently, 304 Not Modified
# 4xx Client Error: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
# 5xx Server Error: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable

def explain_status(code):
    if 200 <= code < 300:
        return f"{code} -> Success (Resource processed/created)"
    elif code == 401:
        return f"{code} -> Unauthorized (Missing or invalid API Key)"
    elif code == 404:
        return f"{code} -> Not Found (Endpoint does not exist)"
    elif code >= 500:
        return f"{code} -> Server Error (External API failure)"
    return f"{code} -> Other Status"

for c in [200, 201, 401, 404, 500]:
    print(explain_status(c))`,
      output: `200 -> Success (Resource processed/created)
201 -> Success (Resource processed/created)
401 -> Unauthorized (Missing or invalid API Key)
404 -> Not Found (Endpoint does not exist)
500 -> Server Error (External API failure)`
    },
    codeExplanation: [
      'Line 9: Demonstrates status code ranges.',
      'Line 13: 401 indicates authentication failure (missing API key).',
      'Line 15: 404 indicates missing endpoint resource.'
    ],
    commonMistakes: [
      {
        mistake: 'Assuming `requests` is built into Python.',
        whyItIsWrong: '`requests` is a 3rd party package that must be installed via `pip install requests`.',
        correction: 'Run `pip install requests` in your virtual environment.'
      },
      {
        mistake: 'Not checking `response.status_code` or `response.ok` before calling `.json()`.',
        whyItIsWrong: 'If the server returns a 500 HTML error page, calling `.json()` raises `requests.exceptions.JSONDecodeError`.',
        correction: 'Always check `if response.status_code == 200:` or `response.raise_for_status()` before parsing JSON.'
      }
    ],
    importantRules: [
      'Status 200 means OK; 201 means Created.',
      'Status 4xx denotes Client Errors (401 Unauthorized, 404 Not Found).',
      'Status 5xx denotes Server Errors (500 Internal Server Error).'
    ],
    interviewPerspective: 'A standard backend interview question: "Explain the difference between HTTP status codes 200, 201, 400, 401, 403, 404, and 500."',
    practiceQuestions: [
      {
        question: 'Which HTTP status code indicates a successful resource creation?',
        solution: '201 Created'
      },
      {
        question: 'Which method on a requests Response object raises an HTTPError if the response status code represents an error?',
        solution: 'response.raise_for_status()'
      }
    ],
    checkpoint: [
      {
        id: 'm17-t1-q1',
        type: 'mcq',
        prompt: 'Which HTTP status code indicates that an API request failed because the client did NOT provide valid authentication credentials (e.g. API Key)?',
        options: ['200 OK', '401 Unauthorized', '404 Not Found', '500 Internal Server Error'],
        correctAnswer: 1,
        explanation: '401 Unauthorized indicates missing or invalid authentication credentials.'
      },
      {
        id: 'm17-t1-q2',
        type: 'output',
        prompt: 'What attribute on a `requests` Response object contains the integer HTTP status code?',
        correctAnswer: 'status_code',
        explanation: 'The `response.status_code` attribute contains the HTTP response code.'
      }
    ]
  },

  'get-requests': {
    id: 'get-requests',
    moduleId: 'm17',
    topicNumber: 2,
    title: 'Making GET Requests & Query Parameters',
    shortSummary: 'requests.get(), query parameters with params={}, custom headers, and response.json().',
    whatIsIt: 'HTTP GET requests are used to retrieve data from a remote server without modifying server state. In `requests`, you perform GET requests with `requests.get(url, params=dict, headers=dict, timeout=seconds)`.',
    whyDoWeNeedIt: 'Querying search engines, fetching user profiles, loading weather forecasts, and reading database records through REST endpoints.',
    syntax: `import requests

# Passing query parameters cleanly via dict
params = {"q": "python", "limit": 10, "sort": "desc"}
headers = {"User-Agent": "LevelUpDev-App/1.0"}

# GET https://api.example.com/items?q=python&limit=10&sort=desc
# response = requests.get("https://api.example.com/items", params=params, headers=headers, timeout=10)
# data = response.json()`,
    basicExample: {
      code: `import urllib.parse

# How requests encodes query parameters into URLs:
base_url = "https://api.example.com/search"
params = {
    "query": "machine learning",
    "page": 1,
    "tags": ["python", "ai"]
}

# requests automatically formats & percent-encodes parameter dicts:
encoded_url = base_url + "?" + urllib.parse.urlencode(params, doseq=True)
print("Constructed URL:\\n", encoded_url)`,
      output: `Constructed URL:
 https://api.example.com/search?query=machine+learning&page=1&tags=python&tags=ai`
    },
    detailedExample: {
      code: `# Simulating GET Request Data Handling & Error Checking:
class MockAPIServer:
    @staticmethod
    def fetch_weather(city, units="metric"):
        database = {
            "Bengaluru": {"temp": 26, "condition": "Partly Cloudy", "humidity": 65},
            "London": {"temp": 14, "condition": "Rainy", "humidity": 80},
            "San Francisco": {"temp": 18, "condition": "Sunny", "humidity": 55}
        }
        if city in database:
            return {"status": 200, "data": {"city": city, "units": units, **database[city]}}
        return {"status": 404, "error": f"City '{city}' not found"}

res = MockAPIServer.fetch_weather("Bengaluru")
if res["status"] == 200:
    w = res["data"]
    print(f"Weather in {w['city']}: {w['temp']}°C ({w['condition']})")`,
      output: `Weather in Bengaluru: 26°C (Partly Cloudy)`
    },
    codeExplanation: [
      'Line 5: Simulates endpoint parameter parsing.',
      'Line 16: Verifies `status == 200` before accessing payload data.'
    ],
    commonMistakes: [
      {
        mistake: 'Manually concatenating query parameters into URLs: `url = f"https://api.com?q={term}"`.',
        whyItIsWrong: 'Fails to percent-encode spaces and special characters (`&`, `?`, `/`), breaking the request.',
        correction: 'Always pass query parameters using the `params={...}` dictionary argument.'
      },
      {
        mistake: 'Forgetting to specify a `timeout` parameter: `requests.get(url)`.',
        whyItIsWrong: 'If the server hangs or drops packets, your Python program will freeze indefinitely.',
        correction: 'Always specify a reasonable timeout: `requests.get(url, timeout=10)`.'
      }
    ],
    importantRules: [
      'GET requests should be idempotent (safe to repeat without side effects).',
      'Use the `params` argument to pass query strings securely.',
      'Always include a `timeout` (in seconds) to prevent frozen network sockets.'
    ],
    interviewPerspective: 'Interviewers often ask why timeouts are mandatory in production web services and how connection pooling (`requests.Session()`) optimizes multiple sequential GET requests.',
    practiceQuestions: [
      {
        question: 'Which argument in `requests.get()` is used to pass URL query parameters?',
        solution: 'params (e.g. requests.get(url, params={"key": "val"}))'
      },
      {
        question: 'Why should you always specify the `timeout` parameter in HTTP requests?',
        solution: 'To prevent the program from hanging indefinitely if the remote server fails to respond.'
      }
    ],
    checkpoint: [
      {
        id: 'm17-t2-q1',
        type: 'output',
        prompt: 'What will be printed when querying status from response object?',
        codeSnippet: `resp = {"status_code": 200, "data": ["item1", "item2"]}
if resp["status_code"] == 200:
    print(len(resp["data"]))`,
        correctAnswer: '2',
        explanation: 'There are 2 items in the payload list.'
      },
      {
        id: 'm17-t2-q2',
        type: 'mcq',
        prompt: 'Which HTTP method is intended exclusively for retrieving data from a server without modifying server state?',
        options: ['POST', 'GET', 'DELETE', 'PUT'],
        correctAnswer: 1,
        explanation: 'GET requests retrieve data safely without side effects.'
      }
    ]
  },

  'post-requests': {
    id: 'post-requests',
    moduleId: 'm17',
    topicNumber: 3,
    title: 'Making POST Requests & Sending JSON Payloads',
    shortSummary: 'requests.post(), json= vs data=, request headers, and sending data to REST APIs.',
    whatIsIt: 'HTTP POST requests are used to send data to a server to create or process a resource. With the `requests` library, you can send JSON payloads using `requests.post(url, json=payload_dict)`, which automatically sets the `Content-Type: application/json` header and serializes the dictionary.',
    whyDoWeNeedIt: 'Submitting web forms, creating user accounts, posting messages, executing database mutations, and sending prompt payloads to LLM APIs.',
    syntax: `import requests

payload = {
    "title": "Learn Python",
    "completed": False,
    "user_id": 42
}

# Sending JSON payload automatically
# response = requests.post("https://api.example.com/todos", json=payload, timeout=10)
# print(response.status_code) # 201 Created`,
    basicExample: {
      code: `import json

# Simulating POST endpoint processing
def mock_post_endpoint(headers, body_str):
    content_type = headers.get("Content-Type", "")
    if "application/json" not in content_type:
        return {"status": 415, "error": "Unsupported Media Type: expected JSON"}
    
    data = json.loads(body_str)
    new_record = {"id": 1001, **data, "created_at": "2026-09-20T12:00:00Z"}
    return {"status": 201, "record": new_record}

headers = {"Content-Type": "application/json"}
body = json.dumps({"username": "swamy", "email": "s@example.com"})

res = mock_post_endpoint(headers, body)
print("Status:", res["status"])
print("Created Record:", res["record"])`,
      output: `Status: 201
Created Record: {'id': 1001, 'username': 'swamy', 'email': 's@example.com', 'created_at': '2026-09-20T12:00:00Z'}`
    },
    detailedExample: {
      code: `# Difference between data= and json= in requests.post():
# 1. requests.post(url, json=dict)
#    - Serializes dict to JSON string
#    - Sets header 'Content-Type: application/json'

# 2. requests.post(url, data=dict)
#    - Encodes dict as form-urlencoded (like standard HTML form submission)
#    - Sets header 'Content-Type: application/x-www-form-urlencoded'

payload = {"name": "Swamy", "role": "Engineer"}
print("JSON serialized length:", len(json.dumps(payload)))
print("Form urlencoded:", f"name={payload['name']}&role={payload['role']}")`,
      output: `JSON serialized length: 35
Form urlencoded: name=Swamy&role=Engineer`
    },
    codeExplanation: [
      'Line 1: Explains the critical difference between `json=` and `data=` parameter bindings in requests.',
      'Line 4: `json=payload` is used for modern REST APIs.',
      'Line 8: `data=payload` is used for legacy form submissions.'
    ],
    commonMistakes: [
      {
        mistake: 'Using `data=json.dumps(payload)` without setting the `Content-Type: application/json` header.',
        whyItIsWrong: 'The server may reject the payload with `415 Unsupported Media Type` or fail to parse the body.',
        correction: 'Simply use `json=payload`, which sets the header and serializes automatically.'
      },
      {
        mistake: 'Expecting `200 OK` when many REST APIs return `201 Created` for successful POST operations.',
        whyItIsWrong: 'Strict `if resp.status_code == 200:` checks will fail on valid `201 Created` responses.',
        correction: 'Check `if resp.ok:` or `if resp.status_code in (200, 201):`.'
      }
    ],
    importantRules: [
      'Use `requests.post(url, json=dict)` for JSON REST APIs.',
      'A successful POST creation typically returns status code `201 Created`.',
      'Always set custom headers (e.g. `Authorization`) via the `headers={...}` dictionary.'
    ],
    interviewPerspective: 'Interviewers often test the difference between POST (creating new resources), PUT (full replacement), and PATCH (partial update) HTTP methods.',
    practiceQuestions: [
      {
        question: 'What parameter in `requests.post()` automatically serializes a dictionary to JSON and sets the Content-Type header?',
        solution: 'json (e.g. requests.post(url, json=data))'
      },
      {
        question: 'Which HTTP status code is conventionally returned upon successfully creating a new resource via POST?',
        solution: '201 Created'
      }
    ],
    checkpoint: [
      {
        id: 'm17-t3-q1',
        type: 'mcq',
        prompt: 'What Content-Type header is automatically set by the `requests` library when calling `requests.post(url, json=data)`?',
        options: [
          'application/x-www-form-urlencoded',
          'application/json',
          'text/plain',
          'multipart/form-data'
        ],
        correctAnswer: 1,
        explanation: 'Passing `json=data` sets the `Content-Type: application/json` header.'
      },
      {
        id: 'm17-t3-q2',
        type: 'output',
        prompt: 'What is the standard HTTP status code for a successfully created resource via POST?',
        correctAnswer: '201',
        explanation: '201 Created indicates successful resource creation.'
      }
    ]
  },

  'handling-json-responses': {
    id: 'handling-json-responses',
    moduleId: 'm17',
    topicNumber: 4,
    title: 'Handling & Parsing JSON API Responses',
    shortSummary: 'Parsing nested JSON structures, handling missing keys with .get(), and error trapping.',
    whatIsIt: 'REST APIs transmit data payloads formatted in JSON. When calling `response.json()`, `requests` deserializes the JSON string into Python native dictionaries and lists. Defensive parsing techniques (using `.get()`, list comprehensions, and schema validation) prevent crashes from unexpected API response formats.',
    whyDoWeNeedIt: 'Third-party APIs frequently update their schema, return `null` values, or omit optional keys. Defensive parsing ensures robust application uptime.',
    syntax: `import requests

# response = requests.get("https://api.github.com/users/octocat")
# data = response.json()

# Defensive extraction using .get() with fallbacks:
# name = data.get("name", "Anonymous")
# location = data.get("location") or "Unknown"`,
    basicExample: {
      code: `import json

# Simulating API response with nested records
mock_response_json = """
{
  "total": 3,
  "users": [
    {"id": 1, "name": "Swamy", "role": "Admin", "profile": {"city": "Bengaluru"}},
    {"id": 2, "name": "Alex", "role": "Dev", "profile": null},
    {"id": 3, "name": "Kiran", "role": "QA"}
  ]
}
"""

data = json.loads(mock_response_json)

for user in data["users"]:
    # Safe nested dictionary parsing
    profile = user.get("profile") or {}
    city = profile.get("city", "Not Specified")
    print(f"User: {user['name']:<8} | Role: {user.get('role'):<6} | City: {city}")`,
      output: `User: Swamy    | Role: Admin  | City: Bengaluru
User: Alex     | Role: Dev    | City: Not Specified
User: Kiran    | Role: QA     | City: Not Specified`
    },
    detailedExample: {
      code: `import json

# Extracting and summarizing list of GitHub repository objects
repos_json = """
[
  {"name": "LevelUpDev", "stargazers_count": 350, "language": "TypeScript"},
  {"name": "python-skills-trail", "stargazers_count": 890, "language": "Python"},
  {"name": "algorithms-dsa", "stargazers_count": 520, "language": "Python"},
  {"name": "docs", "stargazers_count": 45, "language": null}
]
"""

repos = json.loads(repos_json)

# Filter Python repos and compute total stars
python_repos = [r["name"] for r in repos if r.get("language") == "Python"]
total_stars = sum(r.get("stargazers_count", 0) for r in repos)

print("Python Repositories:", python_repos)
print("Total Star Count Across All Repos:", total_stars)`,
      output: `Python Repositories: ['python-skills-trail', 'algorithms-dsa']
Total Star Count Across All Repos: 1805`
    },
    codeExplanation: [
      'Line 15: Uses list comprehension with safe `r.get("language")` filtering.',
      'Line 16: Uses generator expression with fallback `r.get("stargazers_count", 0)` to calculate total stars.'
    ],
    commonMistakes: [
      {
        mistake: 'Using direct bracket access `data["nested"]["key"]` on potentially missing or `None` objects.',
        whyItIsWrong: 'Raises `KeyError` or `TypeError: \'NoneType\' object is not subscriptable` if the server returns missing fields.',
        correction: 'Use `.get()` chains or optional checks: `(data.get("nested") or {}).get("key", default)`.'
      },
      {
        mistake: 'Calling `response.json()` without parentheses: `data = response.json`.',
        whyItIsWrong: '`response.json` is a method reference, not the parsed data.',
        correction: 'Always call the method with parentheses: `data = response.json()`.'
      }
    ],
    importantRules: [
      '`response.json()` returns Python dictionaries and lists.',
      'Use `.get(key, default)` to avoid `KeyError` crashes.',
      'Always verify whether parent objects might be `None` before traversing nested structures.'
    ],
    interviewPerspective: 'In frontend and backend interviews, handling messy real-world API responses with missing/optional fields and edge-case nulls is a universal testing point.',
    practiceQuestions: [
      {
        question: 'How do you safely extract a value for key "email" from dictionary `user_data` with fallback "none@example.com"?',
        solution: 'user_data.get("email", "none@example.com")'
      },
      {
        question: 'What data type is returned by `response.json()` if the API endpoint returns a JSON array `[1, 2, 3]`?',
        solution: 'list'
      }
    ],
    checkpoint: [
      {
        id: 'm17-t4-q1',
        type: 'output',
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `data = {"user": {"name": "Swamy"}}
city = (data.get("user") or {}).get("city", "N/A")
print(city)`,
        correctAnswer: 'N/A',
        explanation: '`city` is missing from the dictionary, so `.get("city", "N/A")` returns the default "N/A".'
      },
      {
        id: 'm17-t4-q2',
        type: 'mcq',
        prompt: 'Why should you avoid direct bracket indexing `res["data"]["items"][0]` on external API responses without validation?',
        options: [
          'It can raise KeyError, IndexError, or TypeError if the response format changes or returns null',
          'It slows down internet connection speeds',
          'It converts integers to strings',
          'It closes the HTTP socket'
        ],
        correctAnswer: 0,
        explanation: 'Direct indexing crashes if any key or index is missing or if parent fields are null.'
      }
    ]
  },

  'api-authentication': {
    id: 'api-authentication',
    moduleId: 'm17',
    topicNumber: 5,
    title: 'API Authentication & Secret Management',
    shortSummary: 'API keys, Bearer tokens, environment variables (os.environ), and security best practices.',
    whatIsIt: 'Web APIs require authentication to verify client identity, enforce rate limits, and authorize access. Common authentication schemes include API Keys (passed in headers like `X-API-Key` or query params) and Bearer Tokens (passed in the `Authorization: Bearer <TOKEN>` header). Secret API keys must ALWAYS be loaded from Environment Variables via `os.environ` or `.env` files, NEVER hardcoded into source code.',
    whyDoWeNeedIt: 'Hardcoding API keys in source code leads to catastrophic security breaches if committed to public repositories (GitHub, GitLab), allowing attackers to steal cloud credits and compromise databases.',
    syntax: `import os
import requests

# 1. Load API Key securely from environment variable:
API_KEY = os.environ.get("OPENAI_API_KEY", "YOUR_API_KEY_FALLBACK")

# 2. Pass in Authorization Header:
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# response = requests.get("https://api.example.com/v1/models", headers=headers, timeout=10)`,
    basicExample: {
      code: `import os

# Simulating environment variable loading
os.environ["PAYMENT_GATEWAY_KEY"] = "sk_test_demo_9921478129381"

# Safe retrieval
api_key = os.environ.get("PAYMENT_GATEWAY_KEY")
if not api_key:
    raise RuntimeError("PAYMENT_GATEWAY_KEY environment variable is missing!")

# Masking secret for logging
masked_key = api_key[:7] + "..." + api_key[-4:]
print("Loaded API Key successfully:", masked_key)`,
      output: `Loaded API Key successfully: sk_test...9381`
    },
    detailedExample: {
      code: `# Standard Bearer Authentication Header Construction:
def build_authenticated_headers(api_key):
    if not api_key or api_key == "YOUR_API_KEY":
        print("[WARN] Using placeholder API key — requests will fail authentication")
    return {
        "Authorization": f"Bearer {api_key}",
        "Accept": "application/json",
        "User-Agent": "LevelUpDev-Client/2.0"
    }

headers = build_authenticated_headers("sec_token_abcdef123456")
print("Constructed Request Headers:")
for k, v in headers.items():
    print(f"  {k}: {v}")`,
      output: `Constructed Request Headers:
  Authorization: Bearer sec_token_abcdef123456
  Accept: application/json
  User-Agent: LevelUpDev-Client/2.0`
    },
    codeExplanation: [
      'Line 2: Function constructs compliant RFC 6750 Bearer authentication headers.',
      'Line 6: Formats `Authorization: Bearer <token>` used by 90%+ of modern REST APIs (OpenAI, GitHub, Stripe, Supabase).'
    ],
    commonMistakes: [
      {
        mistake: 'Hardcoding live API keys directly into Python files: `API_KEY = "sk-live-123456"`.',
        whyItIsWrong: 'Git commits will push the secret to GitHub, where bots scrape keys within seconds, incurring thousands of dollars in unauthorized charges.',
        correction: 'Store secrets in a `.env` file, add `.env` to `.gitignore`, and load keys using `os.environ.get("KEY")`.'
      },
      {
        mistake: 'Using `os.environ["MISSING_KEY"]` without `.get()` or error handling.',
        whyItIsWrong: 'Raises `KeyError: \'MISSING_KEY\'` if the environment variable has not been configured.',
        correction: 'Use `os.environ.get("KEY")` and provide a clear error message if missing.'
      }
    ],
    importantRules: [
      'NEVER commit API keys, passwords, or secret tokens into Git repositories.',
      'Always add `.env` to your `.gitignore` file.',
      'Standard Bearer authentication uses the `Authorization: Bearer <TOKEN>` header format.'
    ],
    interviewPerspective: 'In system design and security interviews, you will be evaluated on your understanding of Twelve-Factor App config principles (storing config in environment variables) and secret rotation workflows.',
    practiceQuestions: [
      {
        question: 'Which built-in Python module and dictionary is used to access operating system environment variables?',
        solution: 'os.environ'
      },
      {
        question: 'What is the standard HTTP header name used to send Bearer authentication tokens?',
        solution: 'Authorization'
      }
    ],
    checkpoint: [
      {
        id: 'm17-t5-q1',
        type: 'mcq',
        prompt: 'Where should sensitive API keys and database passwords be stored in professional Python projects?',
        options: [
          'Directly in Python source code comments',
          'In environment variables loaded via `.env` and excluded from Git via `.gitignore`',
          'In a public text file in the root repository',
          'Hardcoded as default argument parameters in functions'
        ],
        correctAnswer: 1,
        explanation: 'Secrets should always be managed through environment variables and excluded from version control.'
      },
      {
        id: 'm17-t5-q2',
        type: 'output',
        prompt: 'What is the standard header prefix used for token authentication: `"Bearer " + token` in the `Authorization` header?',
        correctAnswer: 'Bearer',
        explanation: 'Bearer is the standard authorization scheme for token-based API authentication.'
      }
    ]
  }
};
