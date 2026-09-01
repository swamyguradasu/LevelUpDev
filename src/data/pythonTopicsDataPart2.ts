import { PythonTopicDetail } from './pythonTopicsDataPart1';

export const PYTHON_TOPICS_PART2: Record<string, PythonTopicDetail> = {
  // ==========================================
  // MODULE 5: Strings
  // ==========================================
  'string-indexing': {
    id: 'string-indexing',
    moduleId: 'm5',
    topicNumber: 1,
    title: 'String Indexing',
    shortSummary: 'Zero-based positive indexing and negative indexing from the end of a string.',
    whatIsIt: 'String indexing allows you to access individual characters within a string using integer position indices in square brackets `[index]`. Positive indices start at `0` from the front; negative indices start at `-1` from the back.',
    whyDoWeNeedIt: 'Accessing specific characters is essential for parsing tokens, checking prefixes, analyzing DNA sequences, and verifying character rules.',
    syntax: `text = "PYTHON"
text[0]    # First character: 'P'
text[-1]   # Last character: 'N'
text[-2]   # Second to last: 'O'`,
    basicExample: {
      code: `lang = "PYTHON"
print("First char (index 0):", lang[0])
print("Third char (index 2):", lang[2])
print("Last char (index -1):", lang[-1])
print("Second to last (index -2):", lang[-2])`,
      output: `First char (index 0): P
Third char (index 2): T
Last char (index -1): N
Second to last (index -2): O`
    },
    detailedExample: {
      code: `order_id = "SCET-2026-X99"
prefix = order_id[0]
code_type = order_id[5]
last_flag = order_id[-1]

print(f"Prefix: {prefix}, Type: {code_type}, Flag: {last_flag}")`,
      output: `Prefix: S, Type: 2, Flag: 9`
    },
    codeExplanation: [
      'Line 1: `"SCET-2026-X99"` has 13 characters (indices 0 to 12).',
      'Line 2: `order_id[0]` accesses the first character `S`.',
      'Line 4: `order_id[-1]` accesses the last character `9`.'
    ],
    commonMistakes: [
      {
        mistake: 'Using an out-of-range index: `"abc"[5]`.',
        whyItIsWrong: 'Throws `IndexError: string index out of range`.',
        correction: 'Ensure index is strictly between `-len(s)` and `len(s) - 1`.'
      },
      {
        mistake: 'Trying to mutate a character: `s = "Cat"; s[0] = "B"`.',
        whyItIsWrong: 'Strings in Python are IMMUTABLE; throws `TypeError`.',
        correction: 'Create a new string instead: `s = "B" + s[1:]`.'
      }
    ],
    importantRules: [
      'Strings are 0-indexed in Python.',
      'Negative indexing starts at `-1` (rightmost character).',
      'Strings are immutable; you cannot reassign items at index positions.'
    ],
    interviewPerspective: 'Understanding zero-indexing and string immutability in memory is a fundamental interview checkpoint.',
    practiceQuestions: [
      {
        question: 'What is `"LevelUpDev"[-3]`?',
        solution: `'D'`
      }
    ],
    checkpoint: [
      {
        id: 'm5-t1-q1',
        type: 'output',
        prompt: 'What does "Coding"[0] return?',
        options: ["'C'", "'o'", "'Coding'", "0"],
        correctAnswer: 0,
        explanation: 'Index 0 accesses the first character, which is `C`.'
      },
      {
        id: 'm5-t1-q2',
        type: 'output',
        prompt: 'What is the value of "Python"[-1]?',
        options: ["'P'", "'n'", "'o'", "IndexError"],
        correctAnswer: 1,
        explanation: 'Index -1 refers to the last character, `n`.'
      },
      {
        id: 'm5-t1-q3',
        type: 'mcq',
        prompt: 'What happens if you try to execute: `s = "Hello"; s[0] = "Y"`?',
        options: ['s becomes "Yello"', 'TypeError (Strings are immutable)', 'ValueError', 'IndexError'],
        correctAnswer: 1,
        explanation: 'Strings are immutable in Python; individual characters cannot be reassigned.'
      }
    ]
  },

  'string-slicing': {
    id: 'string-slicing',
    moduleId: 'm5',
    topicNumber: 2,
    title: 'String Slicing',
    shortSummary: 'Extracting substrings with start, stop, and step: [start:stop:step].',
    whatIsIt: 'String slicing creates a new substring from an existing string using the slice syntax `[start:stop:step]`. The `start` is inclusive, while `stop` is exclusive.',
    whyDoWeNeedIt: 'Extracting substrings, reversing text (`[::-1]`), extracting file extensions, and skipping every Nth character.',
    syntax: `text[start:stop]       # Substring from start to (stop - 1)
text[:stop]            # From beginning up to (stop - 1)
text[start:]           # From start to the end
text[start:stop:step]  # With step stride
text[::-1]             # Reverse the entire string`,
    basicExample: {
      code: `word = "DEVELOPER"
print("First 3 chars:", word[:3])
print("Middle chars:", word[3:7])
print("Last 3 chars:", word[-3:])
print("Reversed:", word[::-1])`,
      output: `First 3 chars: DEV
Middle chars: ELOP
Last 3 chars: PER
Reversed: REPOLEVED`
    },
    detailedExample: {
      code: `filename = "profile_photo.final.png"

# Extract extension
ext = filename[filename.rfind(".") + 1:]

# Every second character
even_chars = "0123456789"[::2]

print("Extension:", ext)
print("Even digits:", even_chars)`,
      output: `Extension: png
Even digits: 02468`
    },
    codeExplanation: [
      'Line 4: Extracts substring after the last dot.',
      'Line 7: `[::2]` takes characters at indices 0, 2, 4, 6, 8.'
    ],
    commonMistakes: [
      {
        mistake: 'Expecting `s[1:4]` to include index 4.',
        whyItIsWrong: 'The `stop` index is always exclusive (stops at index 3).',
        correction: 'Use `s[1:5]` to include index 4.'
      }
    ],
    importantRules: [
      'Slicing never raises an `IndexError` even if indices are out of bounds; it gracefully clamps.',
      'Negative step strides iterate backwards.',
      'Slicing produces a NEW string object.'
    ],
    interviewPerspective: 'Palindrome checks (`s == s[::-1]`) and substring partitioning are standard string interview questions.',
    practiceQuestions: [
      {
        question: 'How do you reverse a string `s` using slicing?',
        solution: '`s[::-1]`'
      }
    ],
    checkpoint: [
      {
        id: 'm5-t2-q1',
        type: 'output',
        prompt: 'What does "Python"[1:4] evaluate to?',
        options: ["'yth'", "'pyt'", "'ytho'", "'ythn'"],
        correctAnswer: 0,
        explanation: 'Indices 1, 2, 3 correspond to `y`, `t`, `h`.'
      },
      {
        id: 'm5-t2-q2',
        type: 'output',
        prompt: 'What is the output of "abcde"[::-1]?',
        options: ["'edcba'", "'abcde'", "'e'", "IndexError"],
        correctAnswer: 0,
        explanation: 'A step of -1 reverses the sequence to `edcba`.'
      },
      {
        id: 'm5-t2-q3',
        type: 'mcq',
        prompt: 'Does slice notation `text[0:100]` throw an IndexError if `text` is only 5 characters long?',
        options: ['Yes', 'No, it gracefully returns all available characters', 'Only if text is empty', 'Raises ValueError'],
        correctAnswer: 1,
        explanation: 'Slicing in Python never throws IndexError; out-of-bounds indices clamp gracefully.'
      }
    ]
  },

  'string-methods': {
    id: 'string-methods',
    moduleId: 'm5',
    topicNumber: 3,
    title: 'String Methods',
    shortSummary: 'upper(), lower(), strip(), split(), replace(), find(), count(), and startswith().',
    whatIsIt: 'Python provides a rich set of built-in methods on string objects to transform casing, clean whitespace, find patterns, and split into lists.',
    whyDoWeNeedIt: 'Sanitizing user input (trimming spaces), standardizing search queries (case normalization), and parsing CSV data.',
    syntax: `text.upper()
text.lower()
text.strip()
text.split(delimiter)
text.replace(old, new)
text.find(sub)
text.count(sub)
text.startswith(prefix)`,
    basicExample: {
      code: `raw = "   swamy@LevelUpDev.com   "
clean = raw.strip().lower()
print("Cleaned:", clean)

words = "Python,React,SQL".split(",")
print("List:", words)`,
      output: `Cleaned: swamy@levelupdev.com
List: ['Python', 'React', 'SQL']`
    },
    detailedExample: {
      code: `message = "Learning Java with Java guide"
updated = message.replace("Java", "Python")
first_pos = updated.find("Python")
occurrences = updated.count("Python")

print("Updated:", updated)
print(f"First found at index: {first_pos}, Total count: {occurrences}")`,
      output: `Updated: Learning Python with Python guide
First found at index: 9, Total count: 2`
    },
    codeExplanation: [
      'Line 2: `replace()` replaces all occurrences of `"Java"` with `"Python"`.',
      'Line 3: `find()` returns the first 0-based index or `-1` if not found.',
      'Line 4: `count()` calculates total non-overlapping occurrences.'
    ],
    commonMistakes: [
      {
        mistake: 'Assuming string methods mutate the string in place: `s = "hello"; s.upper(); print(s)`.',
        whyItIsWrong: '`s.upper()` returns a new string; `s` remains `"hello"`.',
        correction: 'Reassign: `s = s.upper()`.'
      }
    ],
    importantRules: [
      'All string methods return a new string (or value); they never modify the original string.',
      '`find()` returns `-1` on failure; `index()` raises `ValueError` on failure.',
      '`split()` without arguments splits by any consecutive whitespace.'
    ],
    interviewPerspective: 'String tokenization with `.split()`, `.join()`, and normalization is tested in string parsing problems.',
    practiceQuestions: [
      {
        question: 'What does `"hello world".split()` return?',
        solution: `['hello', 'world']`
      }
    ],
    checkpoint: [
      {
        id: 'm5-t3-q1',
        type: 'output',
        prompt: 'What does "  python  ".strip() return?',
        options: ["'python'", "'  python  '", "'PYTHON'", "['python']"],
        correctAnswer: 0,
        explanation: '`strip()` removes all leading and trailing whitespace.'
      },
      {
        id: 'm5-t3-q2',
        type: 'output',
        prompt: 'What is returned by "banana".count("a")?',
        options: ['3', '2', '1', '6'],
        correctAnswer: 0,
        explanation: 'The letter "a" appears 3 times in "banana".'
      },
      {
        id: 'm5-t3-q3',
        type: 'mcq',
        prompt: 'What does `text.find("xyz")` return if "xyz" is NOT present in text?',
        options: ['None', 'False', '-1', 'ValueError'],
        correctAnswer: 2,
        explanation: '`find()` returns `-1` when the substring is not found.'
      }
    ]
  },

  'f-strings': {
    id: 'f-strings',
    moduleId: 'm5',
    topicNumber: 4,
    title: 'f-strings',
    shortSummary: 'Formatted string literals with expressions, precision formatting, and debugging specifiers.',
    whatIsIt: 'Introduced in Python 3.6, formatted string literals (f-strings) prefix strings with `f` or `F` and use `{expression}` to evaluate variables and expressions directly inside text.',
    whyDoWeNeedIt: 'F-strings provide the most readable, concise, and fastest string interpolation mechanism in Python.',
    syntax: `name = "Alex"
age = 22
f"Hello, {name}! Next year you will be {age + 1}."

# Number formatting:
f"Price: {price:.2f}"
f"Percentage: {ratio:.1%}"`,
    basicExample: {
      code: `user = "Swamy"
role = "Admin"
solved = 45

print(f"Developer: {user} | Role: {role} | Solved: {solved} challenges")`,
      output: `Developer: Swamy | Role: Admin | Solved: 45 challenges`
    },
    detailedExample: {
      code: `item = "Mechanical Keyboard"
price = 1299.857
discount = 0.15

final_price = price * (1 - discount)

print(f"Item: {item.upper()}")
print(f"Base: ₹{price:.2f}")
print(f"Discount: {discount:.0%}")
print(f"Total: ₹{final_price:.2f}")`,
      output: `Item: MECHANICAL KEYBOARD
Base: ₹1299.86
Discount: 15%
Total: ₹1104.88`
    },
    codeExplanation: [
      'Line 7: Calls `.upper()` dynamically inside the f-string interpolation.',
      'Line 8: `{price:.2f}` rounds to 2 decimal places with trailing zeros.',
      'Line 9: `{discount:.0%}` formats decimal 0.15 as percentage `15%`.'
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting the leading `f` before the quotes: `"Hello {name}"`.',
        whyItIsWrong: 'Without `f`, `{name}` is printed literally as text.',
        correction: 'Always prefix with `f`: `f"Hello {name}"`.'
      }
    ],
    importantRules: [
      'Expressions inside `{}` are evaluated at runtime in the caller scope.',
      'Backslashes cannot be placed directly inside `{}` expressions in older Python versions.',
      'To include literal curly braces in an f-string, double them: `f"{{Literal}}"`.'
    ],
    interviewPerspective: 'Clean f-string formatting demonstrates modern Python best practices over legacy `%` or `.format()` formatting.',
    practiceQuestions: [
      {
        question: 'How do you format a floating point number `pi = 3.14159` to 2 decimal places using an f-string?',
        solution: '`f"{pi:.2f}"`'
      }
    ],
    checkpoint: [
      {
        id: 'm5-t4-q1',
        type: 'output',
        prompt: 'What will `x = 5; print(f"Double: {x * 2}")` output?',
        options: ['Double: 10', 'Double: {x * 2}', 'Double: 52', 'Error'],
        correctAnswer: 0,
        explanation: 'Expressions inside `{}` are evaluated; `5 * 2` is 10.'
      },
      {
        id: 'm5-t4-q2',
        type: 'output',
        prompt: 'What does `f"{3.14159:.2f}"` output?',
        options: ['3.14', '3.141', '3.1', '3.00'],
        correctAnswer: 0,
        explanation: '`:.2f` formats floating numbers to exactly 2 decimal places.'
      },
      {
        id: 'm5-t4-q3',
        type: 'mcq',
        prompt: 'How do you escape and print a literal curly brace `{` inside an f-string?',
        options: ['\\{', '{{', '[{]', '&lbrace;'],
        correctAnswer: 1,
        explanation: 'Doubling the braces `{{` outputs a single literal `{`.'
      }
    ]
  },

  // ==========================================
  // MODULE 6: Lists & Tuples
  // ==========================================
  'list-creation': {
    id: 'list-creation',
    moduleId: 'm6',
    topicNumber: 1,
    title: 'List Creation',
    shortSummary: 'Defining mutable ordered collections with square brackets [] or list() constructor.',
    whatIsIt: 'A list in Python is an ordered, mutable (modifiable) sequence of items. Lists can contain heterogeneous data types (integers, strings, booleans, or nested lists).',
    whyDoWeNeedIt: 'Lists are the most common collection data structure in Python, used for storing lists of users, scores, tasks, and matrices.',
    syntax: `empty_list = []
numbers = [10, 20, 30, 40]
mixed = [1, "Python", True, 3.14]
from_iterable = list("ABC")  # ['A', 'B', 'C']`,
    basicExample: {
      code: `fruits = ["Apple", "Banana", "Cherry"]
print("Fruits:", fruits)
print("Length:", len(fruits))
print("Type:", type(fruits))`,
      output: `Fruits: ['Apple', 'Banana', 'Cherry']
Length: 3
Type: <class 'list'>`
    },
    detailedExample: {
      code: `grades = [90, 85, 78, 92, 88]
total = sum(grades)
average = total / len(grades)
highest = max(grades)
lowest = min(grades)

print(f"Avg: {average:.1f}, High: {highest}, Low: {lowest}")`,
      output: `Avg: 86.6, High: 92, Low: 78`
    },
    codeExplanation: [
      'Line 1: Creates list `grades` of 5 integers.',
      'Line 2-5: Python built-in functions `sum()`, `len()`, `max()`, `min()` operate directly on lists.'
    ],
    commonMistakes: [
      {
        mistake: 'Using `list = [1, 2]` as a variable name.',
        whyItIsWrong: 'Shadows the built-in `list` constructor function.',
        correction: 'Use descriptive variable names like `my_list` or `items`.'
      }
    ],
    importantRules: [
      'Lists are ordered (items retain their insertion order).',
      'Lists are mutable (can be altered in place).',
      'Lists can contain duplicate values and mixed types.'
    ],
    interviewPerspective: 'Understanding Python list dynamic array resizing and time complexities (O(1) append, O(n) insert/delete) is essential in DSA.',
    practiceQuestions: [
      {
        question: 'What is `len([1, [2, 3], 4])`?',
        solution: '3 (the nested list `[2, 3]` counts as a single element).'
      }
    ],
    checkpoint: [
      {
        id: 'm6-t1-q1',
        type: 'output',
        prompt: 'What does `len(["a", "b", "c", "d"])` evaluate to?',
        options: ['4', '3', '5', '0'],
        correctAnswer: 0,
        explanation: 'There are 4 elements in the list.'
      },
      {
        id: 'm6-t1-q2',
        type: 'mcq',
        prompt: 'Are Python lists mutable or immutable?',
        options: ['Mutable (can be modified)', 'Immutable (cannot be modified)', 'Depends on contents', 'Constant'],
        correctAnswer: 0,
        explanation: 'Lists are mutable; elements can be added, updated, or removed.'
      },
      {
        id: 'm6-t1-q3',
        type: 'output',
        prompt: 'What is `list("AI")` in Python?',
        options: ["['A', 'I']", "['AI']", "'AI'", "Error"],
        correctAnswer: 0,
        explanation: 'The `list()` constructor splits string characters into a list `[\'A\', \'I\']`.'
      }
    ]
  },

  'list-indexing-slicing': {
    id: 'list-indexing-slicing',
    moduleId: 'm6',
    topicNumber: 2,
    title: 'List Indexing and Slicing',
    shortSummary: 'Zero-based indexing, negative indexing, slicing ranges, and mutating elements by index.',
    whatIsIt: 'Just like strings, list elements are accessed using zero-based indexing and sliced using `[start:stop:step]`. Unlike strings, lists are mutable so you can reassign slices or individual items.',
    whyDoWeNeedIt: 'Updating specific records, extracting sub-lists, splitting datasets into batches, and reordering elements.',
    syntax: `nums = [10, 20, 30, 40, 50]
nums[0] = 99        # Mutate first item
sub = nums[1:4]     # [20, 30, 40]
reversed_nums = nums[::-1]`,
    basicExample: {
      code: `scores = [10, 20, 30, 40, 50]
scores[0] = 100     # Update item in place
print("Updated list:", scores)
print("Sub-list [1:4]:", scores[1:4])`,
      output: `Updated list: [100, 20, 30, 40, 50]
Sub-list [1:4]: [20, 30, 40]`
    },
    detailedExample: {
      code: `matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Access row 1, col 2 (value 6)
val = matrix[1][2]
print("Matrix element [1][2]:", val)

# Extract center row
center_row = matrix[1]
print("Center row:", center_row)`,
      output: `Matrix element [1][2]: 6
Center row: [4, 5, 6]`
    },
    codeExplanation: [
      'Line 7: In 2D lists (matrices), `matrix[row][col]` selects row 1 (`[4, 5, 6]`), then index 2 (`6`).'
    ],
    commonMistakes: [
      {
        mistake: 'Assigning a single item to a slice without an iterable: `nums[1:3] = 99`.',
        whyItIsWrong: 'Throws `TypeError: can only assign an iterable`.',
        correction: 'Assign an iterable: `nums[1:3] = [99, 100]`.'
      }
    ],
    importantRules: [
      'Reassigning by index (`nums[0] = x`) modifies the existing list in memory.',
      'Slicing (`nums[1:3]`) returns a SHALLOW COPY of that sub-list.',
      'Negative indexing starts at `-1` from the end.'
    ],
    interviewPerspective: 'In-place array manipulation (e.g. reverse an array, rotate array by K steps) is a classic DSA interview topic.',
    practiceQuestions: [
      {
        question: 'If `a = [1, 2, 3, 4]`, what is `a[-2]`?',
        solution: '3'
      }
    ],
    checkpoint: [
      {
        id: 'm6-t2-q1',
        type: 'output',
        prompt: 'If `nums = [10, 20, 30]`, what is `nums` after `nums[1] = 99`?',
        options: ['[10, 99, 30]', '[99, 20, 30]', '[10, 20, 99]', 'Error'],
        correctAnswer: 0,
        explanation: 'Index 1 is the second element, so 20 is replaced with 99.'
      },
      {
        id: 'm6-t2-q2',
        type: 'output',
        prompt: 'What does `[1, 2, 3, 4, 5][1:3]` evaluate to?',
        options: ['[2, 3]', '[1, 2, 3]', '[2, 3, 4]', '[1, 2]'],
        correctAnswer: 0,
        explanation: 'Indices 1 and 2 are elements 2 and 3.'
      },
      {
        id: 'm6-t2-q3',
        type: 'output',
        prompt: 'If `grid = [[1, 2], [3, 4]]`, what is `grid[0][1]`?',
        options: ['2', '1', '3', '4'],
        correctAnswer: 0,
        explanation: 'Row 0 is `[1, 2]`, column index 1 is `2`.'
      }
    ]
  },

  'list-methods': {
    id: 'list-methods',
    moduleId: 'm6',
    topicNumber: 3,
    title: 'List Methods',
    shortSummary: 'append(), extend(), insert(), remove(), pop(), sort(), reverse(), and clear().',
    whatIsIt: 'List methods allow modifying and maintaining list contents in place by adding, removing, and sorting elements.',
    whyDoWeNeedIt: 'Dynamic collection operations like queuing tasks, managing shopping carts, and sorting rank leaderboards.',
    syntax: `lst.append(item)       # Adds item to end (O(1))
lst.extend(iterable)   # Appends all items from iterable
lst.insert(index, item)# Inserts item at index
lst.remove(value)      # Removes first occurrence of value
lst.pop(index=-1)      # Removes and returns item at index
lst.sort()             # Sorts in-place
lst.reverse()          # Reverses in-place`,
    basicExample: {
      code: `tasks = ["Email", "Code"]
tasks.append("Deploy")
tasks.insert(1, "Review PR")
print("Tasks:", tasks)

finished = tasks.pop()
print("Finished:", finished)
print("Remaining:", tasks)`,
      output: `Tasks: ['Email', 'Review PR', 'Code', 'Deploy']
Finished: Deploy
Remaining: ['Email', 'Review PR', 'Code']`
    },
    detailedExample: {
      code: `scores = [88, 42, 95, 71, 60]
scores.sort()          # In-place ascending sort
print("Sorted:", scores)

scores.sort(reverse=True) # Descending sort
print("Descending:", scores)

scores.remove(42)      # Remove specific value
print("After remove:", scores)`,
      output: `Sorted: [42, 60, 71, 88, 95]
Descending: [95, 88, 71, 60, 42]
After remove: [95, 88, 71, 60]`
    },
    codeExplanation: [
      'Line 2: `sort()` modifies the list directly in place and returns `None`.',
      'Line 8: `remove(42)` searches for value 42 and deletes its first occurrence.'
    ],
    commonMistakes: [
      {
        mistake: 'Assigning the result of in-place methods: `nums = nums.sort()`.',
        whyItIsWrong: '`sort()`, `append()`, `reverse()` return `None`. `nums` becomes `None`!',
        correction: 'Call `nums.sort()` directly without reassigning, or use `sorted(nums)`.'
      },
      {
        mistake: 'Confusing `append()` and `extend()`: `[1, 2].append([3, 4])`.',
        whyItIsWrong: 'Produces nested `[1, 2, [3, 4]]` instead of flat `[1, 2, 3, 4]`.',
        correction: 'Use `extend([3, 4])` to append individual elements.'
      }
    ],
    importantRules: [
      '`append()`, `extend()`, `sort()`, `reverse()` mutate in-place and return `None`.',
      '`pop()` removes AND returns the element (defaults to the last element).',
      '`remove(x)` raises `ValueError` if `x` is not present in the list.'
    ],
    interviewPerspective: 'Stack and Queue implementations in Python using `append()` and `pop()` are frequently evaluated in interviews.',
    practiceQuestions: [
      {
        question: 'What is the difference between `list.sort()` and `sorted(list)`?',
        solution: '`list.sort()` modifies the list in place and returns None; `sorted()` returns a new sorted list.'
      }
    ],
    checkpoint: [
      {
        id: 'm6-t3-q1',
        type: 'output',
        prompt: 'If `items = [1, 2]`, what is `items` after `items.append(3)`?',
        options: ['[1, 2, 3]', '[3, 1, 2]', 'None', '[1, 2, [3]]'],
        correctAnswer: 0,
        explanation: '`append(3)` adds 3 to the end of the list.'
      },
      {
        id: 'm6-t3-q2',
        type: 'output',
        prompt: 'What does `[10, 20, 30].pop()` return?',
        options: ['30', '10', '[10, 20]', 'None'],
        correctAnswer: 0,
        explanation: '`pop()` without arguments removes and returns the last element, which is 30.'
      },
      {
        id: 'm6-t3-q3',
        type: 'output',
        prompt: 'What is the value of `x` after `x = [3, 1, 2].sort()`?',
        options: ['None', '[1, 2, 3]', '[3, 2, 1]', 'Error'],
        correctAnswer: 0,
        explanation: '`sort()` sorts in-place and returns `None`.'
      }
    ]
  },

  'tuples': {
    id: 'tuples',
    moduleId: 'm6',
    topicNumber: 4,
    title: 'Tuples',
    shortSummary: 'Defining ordered immutable collections with parentheses () and tuple unpacking.',
    whatIsIt: 'A tuple is an ordered, immutable collection of elements defined using parentheses `()`. Once created, its items cannot be added, removed, or changed.',
    whyDoWeNeedIt: 'Tuples guarantee data integrity, are faster than lists, and can be used as dictionary keys and set elements because they are hashable.',
    syntax: `point = (10, 20)
single_item = (42,)   # Note trailing comma!
rgb = (255, 128, 0)

# Unpacking:
x, y = point`,
    basicExample: {
      code: `coordinates = (12.9716, 77.5946) # Bangalore GPS
lat, lon = coordinates           # Tuple unpacking

print(f"Latitude: {lat}, Longitude: {lon}")
print("Length:", len(coordinates))`,
      output: `Latitude: 12.9716, Longitude: 77.5946
Length: 2`
    },
    detailedExample: {
      code: `def get_min_max(numbers):
    return min(numbers), max(numbers) # Returns tuple

low, high = get_min_max([45, 12, 89, 34, 99, 23])
print(f"Lowest: {low}, Highest: {high}")`,
      output: `Lowest: 12, Highest: 99`
    },
    codeExplanation: [
      'Line 2: Functions returning comma-separated values return a tuple automatically.',
      'Line 4: Unpacks the tuple returned by `get_min_max()` into variables `low` and `high`.'
    ],
    commonMistakes: [
      {
        mistake: 'Creating a single-element tuple without a trailing comma: `t = (5)`.',
        whyItIsWrong: '`(5)` is evaluated as integer 5 inside math parentheses, not a tuple.',
        correction: 'Add a trailing comma: `t = (5,)`.'
      }
    ],
    importantRules: [
      'Tuples are immutable; attempting to reassign items raises a `TypeError`.',
      'A single-item tuple MUST have a trailing comma: `(item,)`.',
      'Tuples support indexing, slicing, `len()`, `count()`, and `index()`.'
    ],
    interviewPerspective: 'Interviewers often ask why tuples exist alongside lists (immutability, hashability, memory optimization, dictionary keys).',
    practiceQuestions: [
      {
        question: 'What is the data type of `x = (10)` vs `y = (10,)`?',
        solution: '`x` is an `int`, while `y` is a `tuple`.'
      }
    ],
    checkpoint: [
      {
        id: 'm6-t4-q1',
        type: 'output',
        prompt: 'What is `type((5))` in Python?',
        options: ["<class 'int'>", "<class 'tuple'>", "<class 'list'>", "SyntaxError"],
        correctAnswer: 0,
        explanation: 'Without a trailing comma, `(5)` is just an integer in parentheses.'
      },
      {
        id: 'm6-t4-q2',
        type: 'output',
        prompt: 'What is the output of `a, b = (10, 20); print(a + b)`?',
        options: ['30', '(10, 20)', '1020', 'Error'],
        correctAnswer: 0,
        explanation: 'Tuple unpacking assigns `a=10` and `b=20`. 10 + 20 = 30.'
      },
      {
        id: 'm6-t4-q3',
        type: 'mcq',
        prompt: 'Which syntax correctly defines a single-element tuple containing string "Dev"?',
        options: ['("Dev")', '("Dev",)', 'tuple["Dev"]', '{"Dev"}'],
        correctAnswer: 1,
        explanation: 'A trailing comma `("Dev",)` is required for single-element tuples.'
      }
    ]
  },

  'tuple-immutability': {
    id: 'tuple-immutability',
    moduleId: 'm6',
    topicNumber: 5,
    title: 'Tuple Immutability',
    shortSummary: 'Understanding read-only integrity, memory efficiency, and mutable items inside tuples.',
    whatIsIt: 'Tuple immutability means once a tuple object is allocated in memory, its references cannot be changed, added, or removed.',
    whyDoWeNeedIt: 'Protects constants from accidental modification and allows tuples containing hashable items to be used as dictionary keys.',
    syntax: `t = (1, 2, 3)
# t[0] = 10  # Raises TypeError: 'tuple' object does not support item assignment`,
    basicExample: {
      code: `CONFIG = ("localhost", 8080, "v1")
# CONFIG[1] = 9000  # Will throw TypeError

print("Host:", CONFIG[0])
print("Port:", CONFIG[1])`,
      output: `Host: localhost
Port: 8080`
    },
    detailedExample: {
      code: `# Tuples containing mutable elements (like lists)
mixed_tuple = (1, 2, ["A", "B"])

# We cannot replace the list:
# mixed_tuple[2] = ["C", "D"] # Error!

# But we CAN modify the internal mutable list contents:
mixed_tuple[2].append("C")
print("Modified internal list in tuple:", mixed_tuple)`,
      output: `Modified internal list in tuple: (1, 2, ['A', 'B', 'C'])`
    },
    codeExplanation: [
      'Line 8: The tuple holds a reference to a list object. The reference is immutable, but the list itself can mutate.'
    ],
    commonMistakes: [
      {
        mistake: 'Assuming all tuples can be dictionary keys even if they contain lists.',
        whyItIsWrong: 'A tuple containing mutable objects (like lists) is NOT hashable and raises `TypeError: unhashable type: list`.',
        correction: 'Ensure all items inside the tuple are themselves immutable.'
      }
    ],
    importantRules: [
      'Tuples cannot be modified after creation.',
      'A tuple is hashable ONLY if all of its elements are hashable.',
      'Tuples use less memory than lists of the same size.'
    ],
    interviewPerspective: 'Tricky interview questions often ask what happens when modifying a list nested inside a tuple (`t = (1, [2]); t[1].append(3)` vs `t[1] += [3]`).',
    practiceQuestions: [
      {
        question: 'Can a tuple `(1, [2, 3])` be used as a dictionary key?',
        solution: 'No, because it contains a mutable (unhashable) list.'
      }
    ],
    checkpoint: [
      {
        id: 'm6-t5-q1',
        type: 'mcq',
        prompt: 'What exception is raised when executing `t = (1, 2); t[0] = 99`?',
        options: ['TypeError', 'ValueError', 'IndexError', 'AttributeError'],
        correctAnswer: 0,
        explanation: '`TypeError: \'tuple\' object does not support item assignment` is raised.'
      },
      {
        id: 'm6-t5-q2',
        type: 'output',
        prompt: 'If `t = (1, [10, 20])` and we run `t[1].append(30)`, what is `t`?',
        options: ['(1, [10, 20, 30])', 'TypeError', '(1, [10, 20])', 'None'],
        correctAnswer: 0,
        explanation: 'The list inside the tuple is mutable, so `append()` succeeds.'
      },
      {
        id: 'm6-t5-q3',
        type: 'mcq',
        prompt: 'Why are tuples preferred over lists for fixed coordinate pairs or database records?',
        options: ['They are faster and guarantee immutability', 'They can hold more data', 'They support sorting', 'They have more methods'],
        correctAnswer: 0,
        explanation: 'Tuples offer faster memory access and guarantee data integrity.'
      }
    ]
  },

  // ==========================================
  // MODULE 7: Dictionaries, Sets & Intro to Functions
  // ==========================================
  'dictionaries': {
    id: 'dictionaries',
    moduleId: 'm7',
    topicNumber: 1,
    title: 'Dictionaries',
    shortSummary: 'Storing key-value pairs with curly braces {}, accessing, updating, and deleting entries.',
    whatIsIt: 'A dictionary (`dict`) is an unordered (insertion-ordered in Python 3.7+), mutable collection of key-value pairs. Keys must be unique and immutable (hashable).',
    whyDoWeNeedIt: 'High-speed O(1) lookups by identifier (e.g. user ID to profile, word to definition, product SKU to inventory).',
    syntax: `student = {
    "name": "Swamy",
    "branch": "AIML",
    "score": 95
}

student["score"] = 98     # Update
student["college"] = "SCET" # Add new key
del student["branch"]     # Delete key`,
    basicExample: {
      code: `user = {"id": 101, "username": "swamy_dev", "role": "admin"}
print("Username:", user["username"])
print("Role:", user["role"])

user["role"] = "superadmin" # Update
user["verified"] = True     # Add
print("Updated dict:", user)`,
      output: `Username: swamy_dev
Role: admin
Updated dict: {'id': 101, 'username': 'swamy_dev', 'role': 'superadmin', 'verified': True}`
    },
    detailedExample: {
      code: `inventory = {"apple": 50, "banana": 20, "orange": 35}

# Safe lookup with get() avoiding KeyError
mango_stock = inventory.get("mango", 0) # Default 0 if not found
print("Mango Stock:", mango_stock)

# Membership check
has_apples = "apple" in inventory
print("Has apples in stock?", has_apples)`,
      output: `Mango Stock: 0
Has apples in stock? True`
    },
    codeExplanation: [
      'Line 4: `.get(key, default)` returns the default value if the key does not exist instead of crashing with `KeyError`.',
      'Line 7: The `in` operator checks for the presence of a KEY in O(1) time.'
    ],
    commonMistakes: [
      {
        mistake: 'Using unhashable types (like lists) as dictionary keys: `{ [1, 2]: "val" }`.',
        whyItIsWrong: 'Raises `TypeError: unhashable type: \'list\'`.',
        correction: 'Use immutable tuples as keys: `{ (1, 2): "val" }`.'
      },
      {
        mistake: 'Accessing non-existent key with bracket notation: `user["missing"]`.',
        whyItIsWrong: 'Raises a `KeyError`.',
        correction: 'Use `user.get("missing", default_value)` or check with `if "missing" in user:`.'
      }
    ],
    importantRules: [
      'Dictionary keys must be unique and hashable (strings, numbers, tuples).',
      'Values can be of any data type, including lists and nested dictionaries.',
      'Key lookup and insertion are average O(1) time complexity.'
    ],
    interviewPerspective: 'Hash maps (dictionaries) are the single most frequently used data structure in LeetCode and technical coding rounds (Two Sum, Frequency Counting, Caching).',
    practiceQuestions: [
      {
        question: 'How do you safely retrieve a value from dictionary `d` with key `"age"` without throwing an error if missing?',
        solution: '`d.get("age", None)`'
      }
    ],
    checkpoint: [
      {
        id: 'm7-t1-q1',
        type: 'output',
        prompt: 'What does `{"a": 1, "b": 2}.get("c", 0)` return?',
        options: ['0', 'None', 'KeyError', '2'],
        correctAnswer: 0,
        explanation: 'Since `"c"` is missing, `.get()` returns the provided default value `0`.'
      },
      {
        id: 'm7-t1-q2',
        type: 'mcq',
        prompt: 'Which of the following can NOT be used as a dictionary key in Python?',
        options: ['String ("name")', 'Integer (42)', 'List ([1, 2])', 'Tuple ((1, 2))'],
        correctAnswer: 2,
        explanation: 'Lists are mutable and therefore unhashable, so they cannot be used as dictionary keys.'
      },
      {
        id: 'm7-t1-q3',
        type: 'output',
        prompt: 'What happens when you run `d = {"x": 10}; d["x"] = 20; print(d["x"])`?',
        options: ['20', '10', '{10, 20}', 'Error'],
        correctAnswer: 0,
        explanation: 'Assigning to an existing key updates its value in place to 20.'
      }
    ]
  },

  'dictionary-methods-traversal': {
    id: 'dictionary-methods-traversal',
    moduleId: 'm7',
    topicNumber: 2,
    title: 'Dictionary Methods and Traversal',
    shortSummary: 'Iterating over keys(), values(), items(), and frequency counting.',
    whatIsIt: 'Dictionary traversal allows looping through keys, values, or key-value pairs simultaneously using `.items()`.',
    whyDoWeNeedIt: 'Counting frequency of words/elements, aggregating financial records, and transforming JSON API payloads.',
    syntax: `d = {"a": 1, "b": 2}

for key in d.keys():
    print(key)

for val in d.values():
    print(val)

for key, val in d.items():
    print(f"{key} -> {val}")`,
    basicExample: {
      code: `student_marks = {"Math": 95, "Physics": 88, "CS": 99}

for subject, marks in student_marks.items():
    print(f"{subject}: {marks}/100")`,
      output: `Math: 95/100
Physics: 88/100
CS: 99/100`
    },
    detailedExample: {
      code: `# Word frequency counter algorithm
text = "python is fast and python is clean"
words = text.split()
freq = {}

for w in words:
    freq[w] = freq.get(w, 0) + 1

print("Word Frequencies:", freq)`,
      output: `Word Frequencies: {'python': 2, 'is': 2, 'fast': 1, 'and': 1, 'clean': 1}`
    },
    codeExplanation: [
      'Line 6: `freq.get(w, 0) + 1` retrieves the existing count (or 0 if first seen) and adds 1.',
      'This is the classic idiomatic frequency counter pattern in Python.'
    ],
    commonMistakes: [
      {
        mistake: 'Modifying dictionary size during iteration: `for k in d: del d[k]`.',
        whyItIsWrong: 'Throws `RuntimeError: dictionary changed size during iteration`.',
        correction: 'Iterate over a list copy of keys: `for k in list(d.keys()): del d[k]`.'
      }
    ],
    importantRules: [
      '`for k in dict:` iterates over KEYS by default.',
      '`dict.items()` yields `(key, value)` tuples.',
      '`dict.update(other_dict)` merges another dictionary in place.'
    ],
    interviewPerspective: 'Frequency counting with dictionaries (or `collections.Counter`) is foundational in Top K Frequent Elements and Anagrams.',
    practiceQuestions: [
      {
        question: 'What method returns both key and value during iteration?',
        solution: '`.items()`'
      }
    ],
    checkpoint: [
      {
        id: 'm7-t2-q1',
        type: 'output',
        prompt: 'What will `for k, v in {"a": 1, "b": 2}.items(): print(v, end=" ")` output?',
        options: ['1 2', 'a b', 'a 1 b 2', 'Error'],
        correctAnswer: 0,
        explanation: 'Loop variable `v` captures the values 1 and 2.'
      },
      {
        id: 'm7-t2-q2',
        type: 'mcq',
        prompt: 'What does a simple `for x in my_dict:` loop iterate over by default?',
        options: ['Keys only', 'Values only', 'Key-Value tuples', 'Indices'],
        correctAnswer: 0,
        explanation: 'Directly iterating over a dictionary iterates over its keys.'
      },
      {
        id: 'm7-t2-q3',
        type: 'output',
        prompt: 'What is the length of `d` after `d = {}; for c in "aba": d[c] = d.get(c, 0) + 1`?',
        options: ['2', '3', '1', '4'],
        correctAnswer: 0,
        explanation: 'There are 2 unique keys: `"a"` (count 2) and `"b"` (count 1).'
      }
    ]
  },

  'sets': {
    id: 'sets',
    moduleId: 'm7',
    topicNumber: 3,
    title: 'Sets',
    shortSummary: 'Unordered collections of unique elements with set() and curly braces {}.',
    whatIsIt: 'A `set` in Python is an unordered, mutable collection of unique, hashable elements. Duplicate values are automatically discarded.',
    whyDoWeNeedIt: 'Removing duplicates from lists in O(n) time, and checking element membership in O(1) average time.',
    syntax: `empty_set = set() # Note: {} creates an empty dict, NOT a set!
numbers = {1, 2, 3, 4, 4, 2} # Becomes {1, 2, 3, 4}
from_list = set([10, 20, 10, 30])`,
    basicExample: {
      code: `raw_ids = [101, 102, 101, 103, 102, 104]
unique_ids = set(raw_ids)

print("Original list:", raw_ids)
print("Unique set:", unique_ids)
print("Count of unique users:", len(unique_ids))`,
      output: `Original list: [101, 102, 101, 103, 102, 104]
Unique set: {101, 102, 103, 104}
Count of unique users: 4`
    },
    detailedExample: {
      code: `allowed_roles = {"admin", "editor", "moderator"}
user_role = "viewer"

if user_role in allowed_roles: # O(1) membership lookup
    print("Access granted to dashboard.")
else:
    print("❌ Access denied: Unauthorized role.")`,
      output: `❌ Access denied: Unauthorized role.`
    },
    codeExplanation: [
      'Line 1: Sets are defined using curly braces `{}` with comma-separated values (no colons).',
      'Line 4: Checking `in allowed_roles` runs in O(1) constant time because sets use a hash table.'
    ],
    commonMistakes: [
      {
        mistake: 'Using `{}` to initialize an empty set.',
        whyItIsWrong: '`{}` creates an empty dictionary (`dict`), NOT a set.',
        correction: 'Use `set()` to create an empty set.'
      },
      {
        mistake: 'Trying to access items by index: `my_set[0]`.',
        whyItIsWrong: 'Sets are UNORDERED and do NOT support indexing; throws `TypeError`.',
        correction: 'Iterate with a `for` loop or convert to a list: `list(my_set)[0]`.'
      }
    ],
    importantRules: [
      'Sets cannot contain duplicates.',
      'Sets are unordered: elements have no positional index.',
      'Elements inside a set must be immutable and hashable.'
    ],
    interviewPerspective: 'Deduplicating lists and using hash sets for O(1) lookup in problems like Two Sum or Contains Duplicate are interview essentials.',
    practiceQuestions: [
      {
        question: 'How do you create an empty set in Python?',
        solution: '`s = set()`'
      }
    ],
    checkpoint: [
      {
        id: 'm7-t3-q1',
        type: 'output',
        prompt: 'What is `len(set([1, 2, 2, 3, 3, 3]))`?',
        options: ['3', '6', '1', 'TypeError'],
        correctAnswer: 0,
        explanation: 'Duplicates are discarded, leaving `{1, 2, 3}`, which has length 3.'
      },
      {
        id: 'm7-t3-q2',
        type: 'mcq',
        prompt: 'What data type is created by the literal `{}` in Python?',
        options: ['dict (empty dictionary)', 'set (empty set)', 'list', 'tuple'],
        correctAnswer: 0,
        explanation: '`{}` creates an empty dictionary. To create an empty set, use `set()`.'
      },
      {
        id: 'm7-t3-q3',
        type: 'mcq',
        prompt: 'Can you access set elements using index notation like `my_set[0]`?',
        options: ['No, sets are unordered and not subscriptable', 'Yes', 'Only if set contains numbers', 'Only in Python 3.10+'],
        correctAnswer: 0,
        explanation: 'Sets do not support indexing because they are unordered.'
      }
    ]
  },

  'set-operations': {
    id: 'set-operations',
    moduleId: 'm7',
    topicNumber: 4,
    title: 'Set Operations',
    shortSummary: 'Union (|), Intersection (&), Difference (-), Symmetric Difference (^), and subset checks.',
    whatIsIt: 'Python sets support mathematical set operations to compare, merge, and filter groups of unique items.',
    whyDoWeNeedIt: 'Finding mutual friends in social networks, comparing skill requirements vs applicant skills, and tracking delta differences.',
    syntax: `A | B   # Union: All items from both sets
A & B   # Intersection: Items present in BOTH sets
A - B   # Difference: Items in A but NOT in B
A ^ B   # Symmetric Difference: Items in A or B, but NOT both
A.issubset(B) # True if all items of A are in B`,
    basicExample: {
      code: `backend = {"Python", "SQL", "Docker", "Git"}
frontend = {"JavaScript", "React", "CSS", "Git"}

print("Union (All skills):", backend | frontend)
print("Intersection (Shared skills):", backend & frontend)
print("Backend only:", backend - frontend)`,
      output: `Union (All skills): {'Python', 'SQL', 'Docker', 'Git', 'JavaScript', 'React', 'CSS'}
Intersection (Shared skills): {'Git'}
Backend only: {'Python', 'SQL', 'Docker'}`
    },
    detailedExample: {
      code: `required_skills = {"Python", "SQL", "FastAPI"}
candidate_skills = {"Python", "SQL", "FastAPI", "Docker", "AWS"}

is_qualified = required_skills.issubset(candidate_skills)
missing_skills = required_skills - candidate_skills

print(f"Qualified: {is_qualified}, Missing: {missing_skills}")`,
      output: `Qualified: True, Missing: set()`
    },
    codeExplanation: [
      'Line 4: `required_skills.issubset(candidate_skills)` checks if the candidate has all required skills.',
      'Line 5: `required_skills - candidate_skills` calculates missing prerequisites (empty set if none).'
    ],
    commonMistakes: [
      {
        mistake: 'Using `+` to combine two sets: `set1 + set2`.',
        whyItIsWrong: 'Sets do NOT support the `+` operator; raises `TypeError`.',
        correction: 'Use the union operator `set1 | set2` or `set1.union(set2)`.'
      }
    ],
    importantRules: [
      'Union (`|`): elements in A or B or both.',
      'Intersection (`&`): elements in both A and B.',
      'Difference (`A - B`): elements in A that are not in B.'
    ],
    interviewPerspective: 'Set intersection and differences are used in recommendation systems, graph neighbor comparisons, and common ancestor algorithms.',
    practiceQuestions: [
      {
        question: 'What is `{1, 2, 3} & {2, 3, 4}`?',
        solution: '`{2, 3}`'
      }
    ],
    checkpoint: [
      {
        id: 'm7-t4-q1',
        type: 'output',
        prompt: 'What is `{1, 2} | {2, 3}` in Python?',
        options: ['{1, 2, 3}', '{2}', '{1, 3}', '{1, 2, 2, 3}'],
        correctAnswer: 0,
        explanation: 'Union (`|`) combines elements from both sets, eliminating duplicates.'
      },
      {
        id: 'm7-t4-q2',
        type: 'output',
        prompt: 'What is `{1, 2, 3} - {2, 3, 4}`?',
        options: ['{1}', '{4}', '{1, 4}', '{}'],
        correctAnswer: 0,
        explanation: 'Difference (`-`) returns items in the first set not present in the second set (`{1}`).'
      },
      {
        id: 'm7-t4-q3',
        type: 'mcq',
        prompt: 'Which operator computes the set intersection (common items) in Python?',
        options: ['&', '|', '^', '%'],
        correctAnswer: 0,
        explanation: 'The ampersand `&` operator computes set intersection.'
      }
    ]
  },

  'defining-functions': {
    id: 'defining-functions',
    moduleId: 'm7',
    topicNumber: 5,
    title: 'Defining Functions',
    shortSummary: 'Declaring reusable functions with the def keyword, calling functions, and docstrings.',
    whatIsIt: 'A function is a named block of reusable code that runs only when called. Functions are defined with the `def` keyword followed by a function name, parentheses, and a colon.',
    whyDoWeNeedIt: 'Avoid code duplication (DRY principle: Don\'t Repeat Yourself), break complex software into modular components, and improve testability.',
    syntax: `def function_name():
    """Optional docstring explanation."""
    # Function body
    statement

# Function call:
function_name()`,
    basicExample: {
      code: `def greet():
    print("Welcome to LevelUpDev Python Track! 🚀")

greet() # Calling the function
greet() # Reusable invocation`,
      output: `Welcome to LevelUpDev Python Track! 🚀
Welcome to LevelUpDev Python Track! 🚀`
    },
    detailedExample: {
      code: `def display_app_banner(app_name, version):
    """Displays a standardized ASCII header."""
    separator = "=" * 30
    print(separator)
    print(f"🚀 {app_name.upper()} v{version}")
    print(separator)

display_app_banner("LevelUpDev CLI", "1.4.0")`,
      output: `==============================
🚀 LEVELUPDEV CLI v1.4.0
==============================`
    },
    codeExplanation: [
      'Line 1: `def display_app_banner(app_name, version):` defines function with two parameters.',
      'Line 2: Multi-line string `"""..."""` serves as documentation (docstring).',
      'Line 8: Executes the function with actual arguments.'
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting parentheses when calling a function: `greet` instead of `greet()`.',
        whyItIsWrong: '`greet` refers to the function object itself without executing it.',
        correction: 'Always include parentheses to execute: `greet()`.'
      }
    ],
    importantRules: [
      'Function definitions must precede function calls in script execution order.',
      'Functions create their own local scope for variables defined inside them.',
      'Functions without an explicit return statement return `None` by default.'
    ],
    interviewPerspective: 'Modular coding, clean function naming, and single-responsibility functions are strictly evaluated during technical coding interviews.',
    practiceQuestions: [
      {
        question: 'Which keyword defines a custom function in Python?',
        solution: '`def`'
      }
    ],
    checkpoint: [
      {
        id: 'm7-t5-q1',
        type: 'mcq',
        prompt: 'Which keyword is used to declare a function in Python?',
        options: ['def', 'function', 'fn', 'define'],
        correctAnswer: 0,
        explanation: '`def` is the standard Python keyword to define functions.'
      },
      {
        id: 'm7-t5-q2',
        type: 'output',
        prompt: 'What does a Python function return by default if it contains no `return` statement?',
        options: ['None', '0', 'False', 'void'],
        correctAnswer: 0,
        explanation: 'Functions without an explicit return value return `None`.'
      },
      {
        id: 'm7-t5-q3',
        type: 'mcq',
        prompt: 'What is a docstring in a Python function?',
        options: ['A documentation string placed immediately below the function header', 'A compiler directive', 'A special string variable', 'An external API'],
        correctAnswer: 0,
        explanation: 'A docstring is a string literal placed as the first statement in a function to document its behavior.'
      }
    ]
  },

  'parameters-and-arguments': {
    id: 'parameters-and-arguments',
    moduleId: 'm7',
    topicNumber: 6,
    title: 'Parameters and Arguments',
    shortSummary: 'Positional arguments, keyword arguments, default parameter values, and *args / **kwargs.',
    whatIsIt: 'Parameters are the variable names listed in the function definition header. Arguments are the actual values passed into the function when called.',
    whyDoWeNeedIt: 'Makes functions flexible and configurable for different inputs and use cases.',
    syntax: `def calculate(price, tax_rate=0.05): # default parameter
    return price + (price * tax_rate)

# Positional call:
calculate(100, 0.10)

# Keyword call:
calculate(price=100, tax_rate=0.08)`,
    basicExample: {
      code: `def greet_user(name, title="Student"):
    print(f"Hello, {title} {name}!")

greet_user("Swamy")                # Uses default title
greet_user("Dr. Rao", title="Prof") # Overrides default`,
      output: `Hello, Student Swamy!
Hello, Prof Dr. Rao!`
    },
    detailedExample: {
      code: `def calculate_bill(subtotal, tax=0.05, discount=0.0):
    tax_amount = subtotal * tax
    discount_amount = subtotal * discount
    total = subtotal + tax_amount - discount_amount
    return round(total, 2)

bill1 = calculate_bill(1000)
bill2 = calculate_bill(1000, discount=0.10) # Keyword arg

print(f"Bill 1: ₹{bill1}, Bill 2: ₹{bill2}")`,
      output: `Bill 1: ₹1050.0, Bill 2: ₹1050.0`
    },
    codeExplanation: [
      'Line 1: `tax=0.05` and `discount=0.0` provide default fallback arguments.',
      'Line 8: Uses keyword argument `discount=0.10` to override discount while keeping default tax.'
    ],
    commonMistakes: [
      {
        mistake: 'Placing non-default parameters AFTER default parameters: `def func(a=1, b):`.',
        whyItIsWrong: 'Raises `SyntaxError: non-default argument follows default argument`.',
        correction: 'Always place positional/non-default parameters first: `def func(b, a=1):`.'
      }
    ],
    importantRules: [
      'Positional arguments must be supplied before keyword arguments in function calls.',
      'Default arguments are evaluated once when the function is defined.',
      'Avoid using mutable default arguments like `def append_to(item, target_list=[]):`.'
    ],
    interviewPerspective: 'The "mutable default argument trap" in Python is one of the most famous trick questions asked in Python engineering interviews.',
    practiceQuestions: [
      {
        question: 'Why should you use `target_list=None` instead of `target_list=[]` in default parameters?',
        solution: 'Because default parameter objects are shared across all calls, mutating a list default persists across subsequent calls.'
      }
    ],
    checkpoint: [
      {
        id: 'm7-t6-q1',
        type: 'output',
        prompt: 'What does `def add(a, b=5): return a + b; print(add(10))` output?',
        options: ['15', '10', '5', 'TypeError'],
        correctAnswer: 0,
        explanation: '`a=10`, `b` defaults to 5. 10 + 5 = 15.'
      },
      {
        id: 'm7-t6-q2',
        type: 'mcq',
        prompt: 'Can a non-default parameter appear after a default parameter in a function definition header?',
        options: ['No, raises SyntaxError', 'Yes', 'Only with keyword arguments', 'Yes in Python 3.11+'],
        correctAnswer: 0,
        explanation: 'Non-default parameters must always precede default parameters.'
      },
      {
        id: 'm7-t6-q3',
        type: 'output',
        prompt: 'What is printed by `def fn(x, y): return x - y; print(fn(y=2, x=10))`?',
        options: ['8', '-8', '10', 'Error'],
        correctAnswer: 0,
        explanation: 'Named keyword arguments map explicitly regardless of order: `10 - 2 = 8`.'
      }
    ]
  },

  'return-values': {
    id: 'return-values',
    moduleId: 'm7',
    topicNumber: 7,
    title: 'Return Values',
    shortSummary: 'Passing calculated results back to callers, multiple return values, and early exit.',
    whatIsIt: 'The `return` statement terminates function execution immediately and sends a computed result back to the code that called the function.',
    whyDoWeNeedIt: 'Allows functions to compute data transformations that can be stored in variables, passed into other functions, or used in expressions.',
    syntax: `def add(a, b):
    return a + b

result = add(5, 3)

# Multiple return values (packed as tuple):
def get_dimensions():
    return 1920, 1080

w, h = get_dimensions()`,
    basicExample: {
      code: `def is_even(num):
    return num % 2 == 0

print("Is 14 even?", is_even(14))
print("Is 9 even?", is_even(9))`,
      output: `Is 14 even? True
Is 9 even? False`
    },
    detailedExample: {
      code: `def process_student_result(name, marks_list):
    total = sum(marks_list)
    avg = total / len(marks_list)
    passed = avg >= 40
    
    return {
        "name": name,
        "total": total,
        "average": round(avg, 2),
        "status": "PASS" if passed else "FAIL"
    }

report = process_student_result("Swamy", [85, 92, 78, 90])
print("Report Card:", report)`,
      output: `Report Card: {'name': 'Swamy', 'total': 345, 'average': 86.25, 'status': 'PASS'}`
    },
    codeExplanation: [
      'Line 6-11: Bundles calculation results into a structured dictionary and returns it.',
      'Line 13: The caller captures the returned dictionary into variable `report`.'
    ],
    commonMistakes: [
      {
        mistake: 'Confusing `print()` with `return`: `def calc(): print(5); x = calc(); print(x + 2)`.',
        whyItIsWrong: '`print()` outputs to screen but returns `None`. `x + 2` throws `TypeError: unsupported operand type for +: NoneType and int`.',
        correction: 'Use `return 5` so the value can be captured and used mathematically.'
      },
      {
        mistake: 'Writing code after a `return` statement in the same block.',
        whyItIsWrong: 'Any code following an unconditional `return` is unreachable dead code.',
        correction: 'Ensure return statements represent the intended exit point.'
      }
    ],
    importantRules: [
      '`return` immediately exits the function.',
      'Returning multiple comma-separated values returns a single tuple.',
      '`return` without an expression returns `None`.'
    ],
    interviewPerspective: 'Writing pure functions (functions with deterministic return values and no side effects) is a core software engineering design skill.',
    practiceQuestions: [
      {
        question: 'What is the return type of `def f(): return 1, 2, 3`?',
        solution: `<class 'tuple'>`
      }
    ],
    checkpoint: [
      {
        id: 'm7-t7-q1',
        type: 'output',
        prompt: 'What does `def f(x): return x * 3; print(f(4))` print?',
        options: ['12', '4', 'None', 'Error'],
        correctAnswer: 0,
        explanation: '`f(4)` returns `4 * 3 = 12`, which is printed.'
      },
      {
        id: 'm7-t7-q2',
        type: 'output',
        prompt: 'What is the type of result in `def f(): return 10, 20; res = f()`?',
        options: ["<class 'tuple'>", "<class 'list'>", "<class 'int'>", "<class 'dict'>"],
        correctAnswer: 0,
        explanation: 'Multiple comma-separated return values are automatically bundled into a tuple.'
      },
      {
        id: 'm7-t7-q3',
        type: 'mcq',
        prompt: 'What happens to any statements written in a function body after an unconditional `return`?',
        options: ['They are ignored and never executed', 'They run when the function is called again', 'They raise a compiler error', 'They run in the background'],
        correctAnswer: 0,
        explanation: '`return` exits the function immediately, making subsequent statements unreachable.'
      }
    ]
  }
};
