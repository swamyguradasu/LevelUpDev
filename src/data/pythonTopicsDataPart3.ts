import { PythonTopicDetail } from './pythonTopicsDataPart1';

export const PYTHON_TOPICS_PART3: Record<string, PythonTopicDetail> = {
  // =========================================================================
  // MODULE 8: Functions Advanced (6 Topics)
  // =========================================================================
  'default-arguments': {
    id: 'default-arguments',
    moduleId: 'm8',
    topicNumber: 1,
    title: 'Default Arguments',
    shortSummary: 'Defining optional parameters with default values and avoiding mutable default traps.',
    whatIsIt: 'Default arguments in Python allow function parameters to have pre-assigned fallback values if the caller does not supply an argument during the function invocation. Default arguments must always follow positional arguments without default values in the parameter list.',
    whyDoWeNeedIt: 'Default arguments make functions flexible and easy to call. They eliminate the need for function overloading and allow common configuration options (such as log levels, connection timeouts, or separator characters) to be used without forcing the caller to specify them every time.',
    syntax: `def function_name(param1, param2=default_val):
    # param2 is optional; defaults to default_val
    return ...

# Valid definition
def connect(host, port=8080, timeout=30):
    pass

# SyntaxError: non-default argument follows default argument
# def invalid(port=8080, host):
#     pass`,
    basicExample: {
      code: `def greet(name, greeting="Hello", punctuation="!"):
    return f"{greeting}, {name}{punctuation}"

print(greet("Alice"))
print(greet("Bob", greeting="Good morning"))
print(greet("Charlie", "Hi", " :)"))`,
      output: `Hello, Alice!
Good morning, Bob!
Hi, Charlie :)`
    },
    detailedExample: {
      code: `# DANGEROUS: Mutable default argument pitfall
def bad_append(item, target_list=[]):
    target_list.append(item)
    return target_list

print("Bad append 1:", bad_append("A"))
print("Bad append 2:", bad_append("B"))  # Unexpectedly shares previous list!

# CORRECT: Use None as default sentinel for mutables
def safe_append(item, target_list=None):
    if target_list is None:
        target_list = []
    target_list.append(item)
    return target_list

print("Safe append 1:", safe_append("A"))
print("Safe append 2:", safe_append("B"))`,
      output: `Bad append 1: ['A']
Bad append 2: ['A', 'B']
Safe append 1: ['A']
Safe append 2: ['B']`
    },
    codeExplanation: [
      'Line 2: `target_list=[]` is evaluated ONLY ONCE when the function definition is executed, creating a shared static list in memory.',
      'Line 6: Second call mutates the exact same list instance from the previous call.',
      'Line 10: `target_list=None` avoids this bug because a fresh `[]` is created inside the function body on every individual call.'
    ],
    commonMistakes: [
      {
        mistake: 'Using mutable default arguments like `def func(val, items=[]):`.',
        whyItIsWrong: 'Default parameter values are created once at module load time. Subsequent calls mutate the same shared object.',
        correction: 'Use `items=None` and initialize `if items is None: items = []` inside the function.'
      },
      {
        mistake: 'Placing positional parameters after default parameters: `def calculate(tax=0.05, amount):`.',
        whyItIsWrong: 'Python raises `SyntaxError: non-default argument follows default argument`.',
        correction: 'Always place required positional arguments before default arguments: `def calculate(amount, tax=0.05):`.'
      }
    ],
    importantRules: [
      'Non-default arguments must always precede default arguments in function definitions.',
      'Never use mutable objects (list, dict, set) as default parameter values.',
      'Default arguments are evaluated only once at definition time, not at invocation time.'
    ],
    interviewPerspective: 'The "Mutable Default Argument" question is a classic Python interview test for Junior to Senior developers. Interviewers expect you to explain Python bytecode evaluation and the `None` sentinel pattern.',
    practiceQuestions: [
      {
        question: 'What is the output of calling `def f(a, b=2): return a ** b` with `f(3)`?',
        hint: 'b will use its default value of 2.',
        solution: '9 (3 ** 2)'
      },
      {
        question: 'Why should `None` be used instead of `[]` for default list parameters?',
        solution: 'Because default values are evaluated once at definition time; using a mutable list shares state across all function calls.'
      }
    ],
    checkpoint: [
      {
        id: 'm8-t1-q1',
        type: 'mcq',
        prompt: 'Which of the following function headers is syntactically VALID in Python?',
        options: [
          'def setup(port=8000, host): pass',
          'def setup(host, port=8000, secure=True): pass',
          'def setup(host="localhost", port, secure=True): pass',
          'def setup(host=None, port, secure): pass'
        ],
        correctAnswer: 1,
        explanation: 'All non-default parameters must strictly precede parameters with default values.'
      },
      {
        id: 'm8-t1-q2',
        type: 'output',
        prompt: 'What will be the output of this Python code snippet?',
        codeSnippet: `def add_tag(tag, tags=[]):
    tags.append(tag)
    return tags

print(add_tag("python"))
print(add_tag("react"))`,
        correctAnswer: "['python']\n['python', 'react']",
        explanation: 'The default list is instantiated once at function definition time, so both calls modify the exact same list instance.'
      },
      {
        id: 'm8-t1-q3',
        type: 'debugging',
        prompt: 'Fix the function so each call that omits the second argument gets a fresh independent list.',
        codeSnippet: `def collect_data(item, bucket=[]):
    bucket.append(item)
    return bucket`,
        options: [
          'def collect_data(item, bucket=None):\n    if bucket is None:\n        bucket = []\n    bucket.append(item)\n    return bucket',
          'def collect_data(bucket=[], item):\n    bucket.append(item)\n    return bucket',
          'def collect_data(item, bucket=list):\n    bucket.append(item)\n    return bucket',
          'def collect_data(item, bucket=[None]):\n    bucket.append(item)\n    return bucket'
        ],
        correctAnswer: 0,
        explanation: 'Using `bucket=None` and initializing `bucket = []` inside the function creates a new list per invocation.'
      }
    ]
  },

  'keyword-arguments': {
    id: 'keyword-arguments',
    moduleId: 'm8',
    topicNumber: 2,
    title: 'Keyword Arguments',
    shortSummary: 'Passing arguments by parameter name for clarity, flexibility, and order independence.',
    whatIsIt: 'Keyword arguments (named arguments) allow you to pass values to a function using the syntax `parameter_name=value`. Unlike positional arguments which depend on order, keyword arguments match directly by name.',
    whyDoWeNeedIt: 'Keyword arguments drastically improve code readability, self-document the code at call sites, and allow you to supply optional arguments in any order while skipping defaults you do not wish to change.',
    syntax: `def create_user(username, email, role="user", is_active=True):
    return {"user": username, "email": email, "role": role, "active": is_active}

# Positional call:
create_user("swamy", "s@example.com")

# Keyword call:
create_user(email="s@example.com", username="swamy", role="admin")

# Mixed call (positional MUST come before keyword arguments):
create_user("swamy", "s@example.com", is_active=False)`,
    basicExample: {
      code: `def build_query(table, limit=10, order_by="id", ascending=True):
    direction = "ASC" if ascending else "DESC"
    return f"SELECT * FROM {table} ORDER BY {order_by} {direction} LIMIT {limit}"

# Call specifying only non-consecutive arguments
print(build_query("users", ascending=False))
print(build_query("orders", limit=50, order_by="created_at"))`,
      output: `SELECT * FROM users ORDER BY id DESC LIMIT 10
SELECT * FROM orders ORDER BY created_at ASC LIMIT 50`
    },
    detailedExample: {
      code: `def configure_server(host, port, ssl=False, timeout=30, debug=False):
    return {
        "endpoint": f"{'https' if ssl else 'http'}://{host}:{port}",
        "timeout": timeout,
        "debug": debug
    }

# Mixed positional and keyword arguments
config1 = configure_server("127.0.0.1", 8000, debug=True)
# Pure keyword arguments in custom order
config2 = configure_server(port=443, host="api.levelup.dev", ssl=True)

print("Config 1:", config1)
print("Config 2:", config2)`,
      output: `Config 1: {'endpoint': 'http://127.0.0.1:8000', 'timeout': 30, 'debug': True}
Config 2: {'endpoint': 'https://api.levelup.dev:443', 'timeout': 30, 'debug': False}`
    },
    codeExplanation: [
      'Line 9: `"127.0.0.1"` and `8000` are positional. `debug=True` is a keyword argument overriding the default.',
      'Line 11: All arguments are passed as keywords, meaning parameter order does not matter at all.'
    ],
    commonMistakes: [
      {
        mistake: 'Putting positional arguments after keyword arguments: `func(a=1, 2)`.',
        whyItIsWrong: 'Python syntax forbids positional arguments after keyword arguments (`SyntaxError: positional argument follows keyword argument`).',
        correction: 'Ensure all positional arguments appear before keyword arguments: `func(2, a=1)`.'
      },
      {
        mistake: 'Passing multiple values for the same parameter: `func(10, a=20)`.',
        whyItIsWrong: 'Throws `TypeError: func() got multiple values for argument \'a\'`.',
        correction: 'Do not supply both a positional and a keyword value for the same parameter.'
      }
    ],
    importantRules: [
      'Positional arguments MUST ALWAYS appear before keyword arguments at the call site.',
      'You cannot pass multiple values for the same argument name.',
      'Keyword arguments allow skipping middle default arguments without passing placeholder values.'
    ],
    interviewPerspective: 'Interviewers look for clean API design: positional arguments for essential operands, keyword arguments for optional configuration flags.',
    practiceQuestions: [
      {
        question: 'What error is raised by `print(sep="-", "hello", "world")`?',
        hint: 'Check the position of keyword argument sep.',
        solution: 'SyntaxError: positional argument follows keyword argument'
      },
      {
        question: 'Given `def calc(x, y=5, z=10): return x + y + z`, what is `calc(1, z=20)`?',
        solution: '26 (1 + 5 + 20)'
      }
    ],
    checkpoint: [
      {
        id: 'm8-t2-q1',
        type: 'mcq',
        prompt: 'Which function call will result in a SyntaxError in Python?',
        options: [
          'func(10, b=20, c=30)',
          'func(a=10, b=20, 30)',
          'func(10, 20, c=30)',
          'func(c=30, b=20, a=10)'
        ],
        correctAnswer: 1,
        explanation: 'In Python call syntax, positional arguments cannot follow keyword arguments.'
      },
      {
        id: 'm8-t2-q2',
        type: 'output',
        prompt: 'What is the output of the following code snippet?',
        codeSnippet: `def compute(base, factor=2, offset=0):
    return base * factor + offset

print(compute(10, offset=5))`,
        correctAnswer: '25',
        explanation: 'base=10, factor defaults to 2, offset=5. (10 * 2) + 5 = 25.'
      }
    ]
  },

  'args': {
    id: 'args',
    moduleId: 'm8',
    topicNumber: 3,
    title: '*args (Variable-Length Positional Arguments)',
    shortSummary: 'Accepting an arbitrary number of positional arguments bundled into a tuple.',
    whatIsIt: 'The `*args` syntax in a function definition allows a function to accept any number of positional arguments. Inside the function, `args` is received as a tuple containing all extra positional arguments passed.',
    whyDoWeNeedIt: 'When designing utility functions like sum, average, logging, or decorators, you cannot predict how many arguments the caller will pass. `*args` handles 0, 1, or 100 arguments cleanly.',
    syntax: `def function_name(*args):
    # args is a tuple of all positional arguments
    for item in args:
        print(item)

# Unpacking a list or tuple into arguments:
numbers = [1, 2, 3]
function_name(*numbers)  # Passes 1, 2, 3 as individual arguments`,
    basicExample: {
      code: `def sum_all(*args):
    print("Received tuple:", args, "Type:", type(args))
    return sum(args)

print("Total 1:", sum_all(10, 20))
print("Total 2:", sum_all(1, 2, 3, 4, 5))
print("Total 3:", sum_all())  # 0 arguments works gracefully`,
      output: `Received tuple: (10, 20) Type: <class 'tuple'>
Total 1: 30
Received tuple: (1, 2, 3, 4, 5) Type: <class 'tuple'>
Total 2: 15
Received tuple: () Type: <class 'tuple'>
Total 3: 0`
    },
    detailedExample: {
      code: `def build_path(root, *segments):
    cleaned = [seg.strip("/\\\\") for seg in segments if seg]
    return f"/{root.strip('/')}/" + "/".join(cleaned)

# Mixing standard positional arguments with *args
p1 = build_path("api", "v1", "users", "profile")
p2 = build_path("app")  # segments is empty tuple ()

print("Path 1:", p1)
print("Path 2:", p2)

# Unpacking an iterable into *args
folder_list = ["static", "images", "avatar.png"]
print("Unpacked Path:", build_path("cdn", *folder_list))`,
      output: `Path 1: /api/v1/users/profile
Path 2: /app/
Unpacked Path: /cdn/static/images/avatar.png`
    },
    codeExplanation: [
      'Line 1: `root` captures the first required positional argument. `*segments` gathers all remaining positional arguments into a tuple.',
      'Line 7: Calling `build_path("app")` leaves `segments` as an empty tuple `()`.',
      'Line 12: `*folder_list` unpacks each element of `folder_list` as an individual argument.'
    ],
    commonMistakes: [
      {
        mistake: 'Assuming `args` is a mutable list inside the function.',
        whyItIsWrong: '`args` is always a `tuple`, which is immutable. You cannot `args.append()` or modify items.',
        correction: 'Convert to list first if mutation is needed: `items = list(args)`.'
      },
      {
        mistake: 'Passing a list directly without unpacking: `sum_all([1, 2, 3])`.',
        whyItIsWrong: '`args` becomes `([1, 2, 3],)`, a tuple containing one list, which will break arithmetic operations.',
        correction: 'Unpack the list using the asterisk: `sum_all(*[1, 2, 3])`.'
      }
    ],
    importantRules: [
      '`*args` bundles variable positional arguments into an immutable `tuple`.',
      'Only one `*args` parameter is allowed in a function signature.',
      'The asterisk prefix `*` is also used as an unpacking operator when calling functions.'
    ],
    interviewPerspective: 'In interviews, `*args` is frequently tested in questions about writing wrapper functions, logging decorators, and variadic math functions.',
    practiceQuestions: [
      {
        question: 'What is the type of `args` inside `def f(*args): return args`?',
        solution: 'tuple'
      },
      {
        question: 'Write a function `multiply_all(*nums)` that multiplies all passed numbers, returning 1 if no arguments are passed.',
        solution: 'def multiply_all(*nums):\n    res = 1\n    for n in nums:\n        res *= n\n    return res'
      }
    ],
    checkpoint: [
      {
        id: 'm8-t3-q1',
        type: 'output',
        prompt: 'What will be the output of this Python code snippet?',
        codeSnippet: `def count_items(label, *items):
    return f"{label}: {len(items)} items"

print(count_items("Cart", "Apple", "Banana", "Orange"))`,
        correctAnswer: 'Cart: 3 items',
        explanation: '`label` receives "Cart", and `items` receives the tuple ("Apple", "Banana", "Orange") with length 3.'
      },
      {
        id: 'm8-t3-q2',
        type: 'mcq',
        prompt: 'What happens when you pass a list to a `*args` function without the `*` unpacking operator: `sum_all([1, 2, 3])`?',
        options: [
          'Python automatically unpacks the list into 3 separate numbers',
          '`args` receives a tuple containing 1 element: the entire list `([1, 2, 3],)`',
          'A TypeError is immediately raised at compile time',
          'The list is converted into a dictionary'
        ],
        correctAnswer: 1,
        explanation: 'Without `*` unpacking, the list is treated as a single positional argument bundled into `args`.'
      }
    ]
  },

  'kwargs': {
    id: 'kwargs',
    moduleId: 'm8',
    topicNumber: 4,
    title: '**kwargs (Variable-Length Keyword Arguments)',
    shortSummary: 'Accepting arbitrary named keyword arguments bundled into a dictionary.',
    whatIsIt: 'The `**kwargs` syntax allows a function to accept any number of keyword (named) arguments. Inside the function, `kwargs` is accessible as a standard Python dictionary where keys are parameter names (strings) and values are the argument values.',
    whyDoWeNeedIt: '`**kwargs` is crucial for flexible APIs, configuration dictionaries, database query filters, factory patterns, and passing arbitrary extra options down to lower-level functions.',
    syntax: `def function_name(**kwargs):
    # kwargs is a dictionary
    for key, value in kwargs.items():
        print(f"{key} = {value}")

# Unpacking a dictionary into keyword arguments:
params = {"host": "localhost", "port": 5432}
function_name(**params)  # equivalent to function_name(host="localhost", port=5432)`,
    basicExample: {
      code: `def print_profile(**kwargs):
    print("Type of kwargs:", type(kwargs))
    for key, val in kwargs.items():
        print(f" - {key}: {val}")

print_profile(name="Swamy", role="Engineer", city="Bengaluru", active=True)`,
      output: `Type of kwargs: <class 'dict'>
 - name: Swamy
 - role: Engineer
 - city: Bengaluru
 - active: True`
    },
    detailedExample: {
      code: `# Combining Positional, *args, and **kwargs
def full_logger(level, *messages, **metadata):
    combined_msg = " ".join(str(m) for m in messages)
    tag_str = " | ".join(f"{k}={v}" for k, v in metadata.items())
    return f"[{level.upper()}] {combined_msg}" + (f" ({tag_str})" if tag_str else "")

print(full_logger("info", "User", "login", "successful", user_id=42, ip="192.168.1.1"))
print(full_logger("warn", "High memory usage", threshold="85%"))`,
      output: `[INFO] User login successful (user_id=42 | ip=192.168.1.1)
[WARN] High memory usage (threshold=85%)`
    },
    codeExplanation: [
      'Line 2: `level` is positional, `*messages` captures all extra positional words into a tuple, and `**metadata` captures all keyword arguments into a dictionary.',
      'Line 6: `user_id=42` and `ip="192.168.1.1"` are stored in `metadata` as `{"user_id": 42, "ip": "192.168.1.1"}`.'
    ],
    commonMistakes: [
      {
        mistake: 'Putting `**kwargs` before `*args` or positional arguments: `def func(**kwargs, *args):`.',
        whyItIsWrong: '`**kwargs` MUST always be the last parameter in the function signature (`SyntaxError: invalid syntax`).',
        correction: 'Follow the strict ordering: `def func(pos1, pos2, *args, kw_only=None, **kwargs):`.'
      },
      {
        mistake: 'Passing non-string keys when unpacking dictionary: `d = {1: "a"}; func(**d)`.',
        whyItIsWrong: 'Raises `TypeError: func() keywords must be strings`.',
        correction: 'Ensure dictionary keys are valid Python identifier strings.'
      }
    ],
    importantRules: [
      '`**kwargs` collects variable keyword arguments into a standard `dict`.',
      '`**kwargs` MUST be the final parameter in the function signature.',
      'The double-asterisk `**` operator unpacks a dictionary into keyword arguments at call time.'
    ],
    interviewPerspective: 'A favourite interview question: "What is the correct parameter ordering in Python function signatures?" (Positional -> Default -> *args -> Keyword-only -> **kwargs).',
    practiceQuestions: [
      {
        question: 'What is the type of `kwargs` inside `def f(**kwargs): pass`?',
        solution: 'dict'
      },
      {
        question: 'What is the result of `def test(**kwargs): return len(kwargs)` called with `test(a=1, b=2, c=3)`?',
        solution: '3'
      }
    ],
    checkpoint: [
      {
        id: 'm8-t4-q1',
        type: 'output',
        prompt: 'What will be the output of this Python code snippet?',
        codeSnippet: `def get_val(key, **data):
    return data.get(key, "Not Found")

print(get_val("age", name="Kiran", score=95))
print(get_val("score", name="Kiran", score=95))`,
        correctAnswer: 'Not Found\n95',
        explanation: '`key` is matched positionally ("age", then "score"). `data` contains {"name": "Kiran", "score": 95}.'
      },
      {
        id: 'm8-t4-q2',
        type: 'mcq',
        prompt: 'What is the correct order of parameters in a Python function definition?',
        options: [
          'def f(**kwargs, *args, regular, default=1):',
          'def f(regular, default=1, *args, **kwargs):',
          'def f(*args, regular, **kwargs, default=1):',
          'def f(default=1, regular, **kwargs, *args):'
        ],
        correctAnswer: 1,
        explanation: 'Standard positional parameters come first, followed by default arguments, `*args`, keyword-only arguments, and finally `**kwargs`.'
      }
    ]
  },

  'lambda-functions': {
    id: 'lambda-functions',
    moduleId: 'm8',
    topicNumber: 5,
    title: 'Lambda Functions',
    shortSummary: 'Anonymous, single-expression inline functions in Python.',
    whatIsIt: 'A lambda function is a small, anonymous function defined with the `lambda` keyword. It can take any number of parameters, but its body can only consist of a single expression whose evaluated value is automatically returned.',
    whyDoWeNeedIt: 'Lambda functions are ideal for short, one-time callbacks passed to higher-order functions like `map()`, `filter()`, and `sorted()`, where defining a full `def` function would introduce unnecessary clutter.',
    syntax: `# Syntax:
# lambda arg1, arg2, ... : expression

square = lambda x: x ** 2
print(square(5))  # 25

# Equivalent def function:
# def square(x):
#     return x ** 2`,
    basicExample: {
      code: `# Basic lambda usage
add = lambda a, b: a + b
is_even = lambda n: n % 2 == 0

print("Add 10 + 20:", add(10, 20))
print("Is 4 even?", is_even(4))
print("Is 7 even?", is_even(7))`,
      output: `Add 10 + 20: 30
Is 4 even? True
Is 7 even? False`
    },
    detailedExample: {
      code: `students = [
    {"name": "Swamy", "score": 88, "age": 22},
    {"name": "Ananya", "score": 95, "age": 20},
    {"name": "Kiran", "score": 74, "age": 23},
    {"name": "Divya", "score": 95, "age": 21}
]

# 1. Custom sorting with lambda key (sort by score desc, then age asc)
sorted_students = sorted(students, key=lambda s: (-s["score"], s["age"]))
print("Top students:", [s["name"] for s in sorted_students])

# 2. Filtering with filter + lambda
top_scorers = list(filter(lambda s: s["score"] >= 90, students))
print("Scorers >= 90:", [s["name"] for s in top_scorers])

# 3. Transforming with map + lambda
formatted_names = list(map(lambda s: f"{s['name']} ({s['score']}%)", students))
print("Formatted:", formatted_names[:2])`,
      output: `Top students: ['Ananya', 'Divya', 'Swamy', 'Kiran']
Scorers >= 90: ['Ananya', 'Divya']
Formatted: ['Swamy (88%)', 'Ananya (95%)']`
    },
    codeExplanation: [
      'Line 8: `key=lambda s: (-s["score"], s["age"])` allows multi-criteria sorting without writing a standalone comparator.',
      'Line 12: `filter(lambda s: ..., students)` tests each student against the boolean condition.',
      'Line 16: `map(lambda s: ..., students)` transforms each element into a formatted string.'
    ],
    commonMistakes: [
      {
        mistake: 'Putting statements (like `return`, `for`, `print = ...`, `raise`) inside a lambda.',
        whyItIsWrong: 'Lambda bodies can ONLY contain a single expression, not statements (`SyntaxError`).',
        correction: 'Use a standard `def` block whenever multiple lines, control flow, or statements are needed.'
      },
      {
        mistake: 'Assigning a lambda to a variable when a named function is clearer (PEP 8 anti-pattern): `f = lambda x: x + 1`.',
        whyItIsWrong: 'Reduces debuggability and traceback readability because the function name shows as `<lambda>` instead of a named function.',
        correction: 'Use `def f(x): return x + 1` for named functions; reserve lambda for inline callbacks.'
      }
    ],
    importantRules: [
      'Lambda functions can take multiple parameters but can contain only ONE expression.',
      'The expression in a lambda is automatically returned; you do not use the `return` keyword.',
      'Do not overuse lambdas for complex logic; PEP 8 strongly prefers `def` for multi-step logic.'
    ],
    interviewPerspective: 'Expect questions on sorting complex nested data structures with `key=lambda x: ...` and understanding closure capture in lambdas inside loops.',
    practiceQuestions: [
      {
        question: 'Write a lambda function that takes a string and returns it in reverse.',
        solution: 'lambda s: s[::-1]'
      },
      {
        question: 'Sort the list of tuples `[("a", 3), ("b", 1), ("c", 2)]` by the second element using `sorted()` and `lambda`.',
        solution: 'sorted([("a", 3), ("b", 1), ("c", 2)], key=lambda x: x[1])'
      }
    ],
    checkpoint: [
      {
        id: 'm8-t5-q1',
        type: 'output',
        prompt: 'What will be the output of this Python code snippet?',
        codeSnippet: `nums = [1, 2, 3, 4, 5, 6]
evens_squared = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, nums)))
print(evens_squared)`,
        correctAnswer: '[4, 16, 36]',
        explanation: 'The filter selects [2, 4, 6], and the map squares each element to produce [4, 16, 36].'
      },
      {
        id: 'm8-t5-q2',
        type: 'mcq',
        prompt: 'Which of the following statements about Python lambda functions is TRUE?',
        options: [
          'A lambda function can contain multiple return statements',
          'A lambda function cannot accept parameters with default values',
          'A lambda function implicitly returns the evaluated result of its single expression',
          'A lambda function can contain while loops and try-except blocks'
        ],
        correctAnswer: 2,
        explanation: 'Lambda functions evaluate and implicitly return their single expression without using the return keyword.'
      }
    ]
  },

  'recursion': {
    id: 'recursion',
    moduleId: 'm8',
    topicNumber: 6,
    title: 'Recursion',
    shortSummary: 'Solving problems by dividing them into self-similar subproblems with base and recursive cases.',
    whatIsIt: 'Recursion is a programming technique where a function calls itself directly or indirectly to solve smaller instances of the same problem. Every recursive function requires at least one Base Case (halting condition) and a Recursive Case (reduction step).',
    whyDoWeNeedIt: 'Recursion is the natural paradigm for traversing hierarchical data structures (trees, graphs, nested JSON, directory trees) and implementing divide-and-conquer algorithms (Merge Sort, Quick Sort, Binary Search).',
    syntax: `def recursive_func(parameters):
    # 1. Base Case (Stop condition)
    if condition:
        return base_result
    
    # 2. Recursive Case (Divide and conquer)
    return recursive_func(smaller_parameters)`,
    basicExample: {
      code: `def factorial(n):
    # Base Case
    if n <= 1:
        return 1
    # Recursive Case
    return n * factorial(n - 1)

print("5! =", factorial(5))
print("0! =", factorial(0))`,
      output: `5! = 120
0! = 1`
    },
    detailedExample: {
      code: `# Recursive Flattening of deeply nested lists
def flatten(nested_list):
    result = []
    for item in nested_list:
        if isinstance(item, list):
            # Recursively flatten inner list
            result.extend(flatten(item))
        else:
            result.append(item)
    return result

nested = [1, [2, [3, 4], 5], [6, [7, [8, [9]]]]]
print("Original:", nested)
print("Flattened:", flatten(nested))`,
      output: `Original: [1, [2, [3, 4], 5], [6, [7, [8, [9]]]]]
Flattened: [1, 2, 3, 4, 5, 6, 7, 8, 9]`
    },
    codeExplanation: [
      'Line 5: Checks if the item is a sublist (`isinstance(item, list)`).',
      'Line 7: If it is a list, recursively calls `flatten(item)` and extends the current accumulator.',
      'Line 9: If it is a scalar element (base case), appends it directly to `result`.'
    ],
    commonMistakes: [
      {
        mistake: 'Omitting or improperly writing the base case.',
        whyItIsWrong: 'The function enters infinite recursion, consuming memory until Python raises `RecursionError: maximum recursion depth exceeded`.',
        correction: 'Always verify your base case is guaranteed to be reached for all possible inputs.'
      },
      {
        mistake: 'Using naive exponential recursion for Fibonacci without memoization.',
        whyItIsWrong: '`fib(40)` takes billions of redundant calls, taking minutes to complete.',
        correction: 'Use memoization (e.g. `@functools.lru_cache`) or an iterative approach for linear runtime.'
      }
    ],
    importantRules: [
      'Every recursive function MUST have at least one base case that terminates without further recursion.',
      'The recursive step must strictly move closer to the base case on every invocation.',
      'Python has a default recursion limit (usually 1000 frames, checked with `sys.getrecursionlimit()`).'
    ],
    interviewPerspective: 'Recursion is the cornerstone of DSA interviews (Trees, Graphs, Backtracking, Dynamic Programming). Interviewers evaluate whether you can trace call stacks and compute space complexity (O(N) stack frames).',
    practiceQuestions: [
      {
        question: 'Write a recursive function `sum_digits(n)` that returns the sum of digits of a non-negative integer n.',
        solution: 'def sum_digits(n):\n    if n < 10:\n        return n\n    return (n % 10) + sum_digits(n // 10)'
      },
      {
        question: 'What error does Python throw when recursion has no base case?',
        solution: 'RecursionError: maximum recursion depth exceeded'
      }
    ],
    checkpoint: [
      {
        id: 'm8-t6-q1',
        type: 'output',
        prompt: 'What will be the output of this recursive function call?',
        codeSnippet: `def countdown(n):
    if n <= 0:
        return "Done"
    return f"{n} -> " + countdown(n - 1)

print(countdown(3))`,
        correctAnswer: '3 -> 2 -> 1 -> Done',
        explanation: 'countdown(3) resolves to "3 -> " + countdown(2), expanding sequentially until the base case returns "Done".'
      },
      {
        id: 'm8-t6-q2',
        type: 'mcq',
        prompt: 'What is the primary risk of a recursive function that fails to reach its base case?',
        options: [
          'It silently converts into an infinite while loop without error',
          'It raises `RecursionError: maximum recursion depth exceeded` when the call stack exhausts memory',
          'It resets all variables to None and exits cleanly',
          'It creates a syntax error before execution starts'
        ],
        correctAnswer: 1,
        explanation: 'Python raises `RecursionError` when call stack frames exceed the recursion limit (default 1000).'
      }
    ]
  },

  // =========================================================================
  // MODULE 9: Modules & Packages (4 Topics)
  // =========================================================================
  'importing-modules': {
    id: 'importing-modules',
    moduleId: 'm9',
    topicNumber: 1,
    title: 'Importing Modules',
    shortSummary: 'Import syntax, namespaces, from...import, aliases, and module caching.',
    whatIsIt: 'A module in Python is simply a `.py` file containing functions, classes, and variable definitions. The `import` statement allows you to access code defined in other files or libraries within your current namespace.',
    whyDoWeNeedIt: 'Importing prevents code duplication, allows large codebases to be organized into clean modular components, and provides immediate access to thousands of Python standard library utilities.',
    syntax: `# 1. Import entire module
import math
print(math.sqrt(16))

# 2. Import specific objects
from math import sqrt, pi
print(sqrt(25))

# 3. Import with alias
import numpy as np
from datetime import datetime as dt`,
    basicExample: {
      code: `import math
from random import randint, choice

print("Square root of 64:", math.sqrt(64))
print("Pi constant:", round(math.pi, 4))
print("Random roll (1-6):", randint(1, 6))
print("Random choice:", choice(["Python", "Java", "Go", "Rust"]))`,
      output: `Square root of 64: 8.0
Pi constant: 3.1416
Random roll (1-6): 4
Random choice: Python`
    },
    detailedExample: {
      code: `import sys

# Inspect where Python looks for modules
print("Number of search paths in sys.path:", len(sys.path))
print("Active Python executable:", sys.executable)
print("Loaded modules count in sys.modules:", len(sys.modules))

# Modules are cached in sys.modules after first import
import math
import math  # Instantaneous: retrieved directly from sys.modules cache
print("math module path:", getattr(math, "__file__", "built-in"))`,
      output: `Number of search paths in sys.path: 8
Active Python executable: /usr/bin/python3
Loaded modules count in sys.modules: 120
math module path: built-in`
    },
    codeExplanation: [
      'Line 1: `import sys` gives access to Python runtime environment variables.',
      'Line 4: `sys.path` is the list of directory paths searched in order when an `import` statement runs.',
      'Line 10: Python caches imported modules in `sys.modules`; importing the same module twice executes the module file only once.'
    ],
    commonMistakes: [
      {
        mistake: 'Using wildcard imports: `from math import *`.',
        whyItIsWrong: 'Pollutes the current namespace, causes silent variable name collisions, and obscures where functions originated.',
        correction: 'Import specific functions (`from math import sqrt`) or import the module with namespace (`import math`).'
      },
      {
        mistake: 'Naming your custom script after standard library modules: creating a file named `random.py` or `math.py`.',
        whyItIsWrong: 'Python finds your local file first via `sys.path`, shadowing the standard library and causing cryptic `AttributeError` crashes.',
        correction: 'Never name your files the same as built-in or standard library modules.'
      }
    ],
    importantRules: [
      'Standard library imports should come first, third-party imports second, and local imports last (PEP 8).',
      'Avoid wildcard `from module import *` imports.',
      'Modules are executed only once upon the first import and cached in `sys.modules`.'
    ],
    interviewPerspective: 'Interviewers often ask how Python resolves imports (`sys.path` precedence: current directory -> PYTHONPATH -> standard library -> site-packages) and how to handle circular import issues.',
    practiceQuestions: [
      {
        question: 'Which built-in list contains the directories Python searches when importing a module?',
        hint: 'It is a list in the sys module.',
        solution: 'sys.path'
      },
      {
        question: 'What is the advantage of `import math` over `from math import *`?',
        solution: '`import math` keeps the namespace clean by requiring `math.function()` and avoids accidental variable shadowing.'
      }
    ],
    checkpoint: [
      {
        id: 'm9-t1-q1',
        type: 'mcq',
        prompt: 'Why is `from module import *` considered bad practice in professional Python development?',
        options: [
          'It slows down mathematical calculations by 50%',
          'It pollutes the current namespace and can silently overwrite existing variables and functions',
          'It causes Python to uninstall the library',
          'It prevents functions from accepting default arguments'
        ],
        correctAnswer: 1,
        explanation: 'Wildcard imports pull all module symbols into the global namespace, making code hard to maintain and prone to name collision bugs.'
      },
      {
        id: 'm9-t1-q2',
        type: 'output',
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `import math as m
print(m.floor(7.8), m.ceil(7.2))`,
        correctAnswer: '7 8',
        explanation: '`m.floor(7.8)` rounds down to 7, and `m.ceil(7.2)` rounds up to 8.'
      }
    ]
  },

  'python-pip': {
    id: 'python-pip',
    moduleId: 'm9',
    topicNumber: 2,
    title: 'Python pip',
    shortSummary: 'Package management, PyPI, requirements.txt, and virtual environment relationships.',
    whatIsIt: '`pip` (Pip Installs Packages) is the official package installer for Python. It downloads, installs, updates, and manages third-party libraries and dependencies hosted on the Python Package Index (PyPI).',
    whyDoWeNeedIt: 'Pip unlocks Python\'s massive open-source ecosystem, allowing you to install web frameworks (Django, FastAPI, Flask), data science suites (NumPy, Pandas, PyTorch), and automation tools with a single command.',
    syntax: `# Install a package
# pip install package_name

# Install specific version
# pip install requests==2.31.0

# Install all project dependencies
# pip install -r requirements.txt

# Export installed dependencies
# pip freeze > requirements.txt

# Upgrade or uninstall
# pip install --upgrade requests
# pip uninstall requests -y`,
    basicExample: {
      code: `# Example terminal command workflow:
# 1. Create a virtual environment:
#    python -m venv myenv
# 2. Activate virtual environment (Windows):
#    myenv\\Scripts\\activate
# 3. Install packages:
#    pip install requests pandas
# 4. Generate requirements file:
#    pip freeze > requirements.txt`,
      output: `Successfully installed certifi-2024.2.2 charset-normalizer-3.3.2 idna-3.6 numpy-1.26.4 pandas-2.2.1 requests-2.31.0 urllib3-2.2.1`
    },
    detailedExample: {
      code: `# Standard requirements.txt file structure:
requirements_content = """
requests>=2.31.0,<3.0.0
fastapi==0.110.0
uvicorn[standard]==0.29.0
pydantic>=2.6.0
python-dotenv~=1.0.0
pytest>=8.1.0
"""

# Parsing requirements lines in Python
packages = []
for line in requirements_content.strip().splitlines():
    if line and not line.startswith("#"):
        pkg_name = line.split("=")[0].split(">")[0].split("<")[0].split("~")[0].strip()
        packages.append(pkg_name)

print("Parsed project dependencies:", packages)`,
      output: `Parsed project dependencies: ['requests', 'fastapi', 'uvicorn[standard]', 'pydantic', 'python-dotenv', 'pytest']`
    },
    codeExplanation: [
      'Line 2: `requests>=2.31.0` specifies minimum acceptable version constraints.',
      'Line 3: `fastapi==0.110.0` locks the exact version for reproducible deployments.',
      'Line 13: `pip freeze` outputs this exact format to replicate environments across dev, staging, and production servers.'
    ],
    commonMistakes: [
      {
        mistake: 'Installing packages globally without a virtual environment.',
        whyItIsWrong: 'Causes dependency version conflicts between different Python projects on the same machine.',
        correction: 'Always create and activate a project-specific virtual environment (`python -m venv venv`) before running `pip install`.'
      },
      {
        mistake: 'Forgetting to include a `requirements.txt` file when sharing a project repository.',
        whyItIsWrong: 'Teammates and deployment servers won\'t know which library versions are needed to run the app.',
        correction: 'Always generate and commit `requirements.txt` with `pip freeze > requirements.txt`.'
      }
    ],
    importantRules: [
      '`pip` downloads packages from PyPI (pypi.org).',
      '`requirements.txt` pins project dependencies for consistent environments.',
      'Virtual environments isolate package installations per project.'
    ],
    interviewPerspective: 'Interviewers often ask how to resolve package dependency conflicts, how `pip freeze` differs from `pip list`, and why virtual environments (`venv`) are mandatory for production workflows.',
    practiceQuestions: [
      {
        question: 'Which command exports the list of all installed packages in the active environment to a file named requirements.txt?',
        solution: 'pip freeze > requirements.txt'
      },
      {
        question: 'Which command installs all packages listed in requirements.txt?',
        solution: 'pip install -r requirements.txt'
      }
    ],
    checkpoint: [
      {
        id: 'm9-t2-q1',
        type: 'mcq',
        prompt: 'What is the primary purpose of creating a Python virtual environment (`venv`) before using `pip`?',
        options: [
          'To increase Python script execution speed by compiling to C',
          'To isolate package dependencies and prevent version conflicts between projects',
          'To encrypt project source code',
          'To disable syntax errors in Python scripts'
        ],
        correctAnswer: 1,
        explanation: 'Virtual environments create isolated directories with their own Python interpreter and site-packages, preventing conflicting library versions.'
      },
      {
        id: 'm9-t2-q2',
        type: 'mcq',
        prompt: 'Which terminal command installs a specific version 2.31.0 of the `requests` library?',
        options: [
          'pip install requests:2.31.0',
          'pip install requests==2.31.0',
          'pip download requests@2.31.0',
          'pip get requests v2.31.0'
        ],
        correctAnswer: 1,
        explanation: 'In pip, exact version constraints use the `==` operator (e.g. `requests==2.31.0`).'
      }
    ]
  },

  'creating-your-own-module': {
    id: 'creating-your-own-module',
    moduleId: 'm9',
    topicNumber: 3,
    title: 'Creating Your Own Module',
    shortSummary: 'Structuring multi-file Python projects, reusability, and __name__ == "__main__".',
    whatIsIt: 'Any Python file (`.py`) is automatically a module that can be imported by other files in the same directory or Python path. The special variable `__name__` holds `"__main__"` when a file is executed directly, and the module\'s name when imported.',
    whyDoWeNeedIt: 'Organizing code into custom modules enables clean separation of concerns: separating business logic, database helpers, utilities, and API routes into distinct reusable files.',
    syntax: `# File: utils.py
def calculate_tax(price, rate=0.08):
    return price * rate

# Test block executed only when utils.py is run directly
if __name__ == "__main__":
    print("Testing utils.py:", calculate_tax(100))

# File: main.py
import utils
tax = utils.calculate_tax(250)
print(tax)`,
    basicExample: {
      code: `# Simulating module behavior:
# When a module is imported, Python sets its __name__ to the module name
module_name_when_imported = "my_module"
# When run directly in terminal (python my_module.py), Python sets __name__ = "__main__"
module_name_when_run_directly = "__main__"

def is_entry_point(current_name):
    if current_name == "__main__":
        return "Executing top-level script logic (CLI / Tests)"
    return f"Imported as module '{current_name}' — skipping test driver"

print("Direct run:", is_entry_point(module_name_when_run_directly))
print("Imported run:", is_entry_point(module_name_when_imported))`,
      output: `Direct run: Executing top-level script logic (CLI / Tests)
Imported run: Imported as module 'my_module' — skipping test driver`
    },
    detailedExample: {
      code: `# Structure of a multi-file Python application:
# -----------------------------------------------
# project/
# ├── math_utils.py
# ├── string_utils.py
# └── app.py

# Simulated math_utils.py
class MathUtils:
    @staticmethod
    def add(a, b): return a + b
    @staticmethod
    def mean(numbers): return sum(numbers) / len(numbers) if numbers else 0

# Simulated string_utils.py
class StringUtils:
    @staticmethod
    def slugify(text): return text.lower().replace(" ", "-")

# Simulated app.py (main entry point)
nums = [10, 20, 30, 40]
avg = MathUtils.mean(nums)
slug = StringUtils.slugify("Python Skills Trail Module 9")

print(f"Calculated Average: {avg}")
print(f"Generated URL Slug: {slug}")`,
      output: `Calculated Average: 25.0
Generated URL Slug: python-skills-trail-module-9`
    },
    codeExplanation: [
      'Line 10-13: `MathUtils` encapsulates reusable mathematical functions.',
      'Line 17-18: `StringUtils` encapsulates text formatting helpers.',
      'Line 21-25: `app.py` acts as the coordinator importing and utilizing the modules.'
    ],
    commonMistakes: [
      {
        mistake: 'Putting executable script logic outside of `if __name__ == "__main__":` in module files.',
        whyItIsWrong: 'Whenever another file imports your module, all top-level statements run immediately, causing unexpected prints, API calls, or database writes.',
        correction: 'Wrap test code, CLI argument parsing, and top-level execution inside `if __name__ == "__main__":`.'
      },
      {
        mistake: 'Circular imports: `a.py` imports `b.py` while `b.py` imports `a.py` at the top level.',
        whyItIsWrong: 'Throws `ImportError: cannot import name ... from partially initialized module`.',
        correction: 'Refactor shared models/constants into a separate module (e.g. `common.py`) or import inside functions when necessary.'
      }
    ],
    importantRules: [
      'Any Python `.py` file is importable as a module.',
      '`__name__` equals `"__main__"` only when the script is executed directly as the entry point.',
      'Use `__init__.py` inside a folder to declare it as a Python package.'
    ],
    interviewPerspective: 'Interviewers frequently ask candidates to explain the exact mechanics of `if __name__ == "__main__":` and how Python handles package structure with `__init__.py`.',
    practiceQuestions: [
      {
        question: 'What is the value of `__name__` inside a script executed with `python app.py`?',
        solution: '"__main__"'
      },
      {
        question: 'Why do we place module testing code inside `if __name__ == "__main__":`?',
        solution: 'To prevent the test code from executing whenever the module is imported into another file.'
      }
    ],
    checkpoint: [
      {
        id: 'm9-t3-q1',
        type: 'mcq',
        prompt: 'What happens when a Python file containing `if __name__ == "__main__":` is imported by another script?',
        options: [
          'The code inside the block executes automatically',
          'The code inside the block is skipped and does NOT execute',
          'Python raises an ImportError',
          'The file is deleted from disk'
        ],
        correctAnswer: 1,
        explanation: 'When imported, `__name__` is set to the module\'s name (not `"__main__"`), so the conditional block does not execute.'
      },
      {
        id: 'm9-t3-q2',
        type: 'output',
        prompt: 'What is the value of `__name__` inside a module named `helpers.py` when it is imported into `main.py`?',
        correctAnswer: 'helpers',
        explanation: 'When imported, a module\'s `__name__` attribute equals its filename without the `.py` extension.'
      }
    ]
  },

  'standard-library-overview': {
    id: 'standard-library-overview',
    moduleId: 'm9',
    topicNumber: 4,
    title: 'Python Standard Library Overview',
    shortSummary: 'Exploring essential built-in modules: math, random, datetime, os, sys, json, csv, and collections.',
    whatIsIt: 'Python\'s "Batteries Included" philosophy means it ships with an extensive Standard Library. Essential modules include `math` (advanced calculations), `random` (stochastic sampling), `datetime` (timestamps & intervals), `os` / `pathlib` (filesystem), `sys` (interpreter internals), `json` (serialization), `csv` (tabular data), and `collections` (specialized data structures).',
    whyDoWeNeedIt: 'Knowing the standard library saves countless hours. You do not need to install external packages for hashing, date math, counting frequencies, or file path manipulation.',
    syntax: `import math
import random
import datetime
import os
import sys
import collections

# Counter from collections
counts = collections.Counter(["a", "b", "a", "c", "a", "b"])
print(counts.most_common(1))  # [('a', 3)]`,
    basicExample: {
      code: `import datetime
from collections import Counter, defaultdict

# 1. datetime manipulation
now = datetime.datetime(2026, 9, 20, 10, 30)
delta = datetime.timedelta(days=7, hours=2)
future = now + delta
print("Future date (+7d 2h):", future.strftime("%Y-%m-%d %H:%M"))

# 2. collections.Counter
votes = ["Python", "JavaScript", "Python", "Go", "Python", "Rust", "Go"]
tally = Counter(votes)
print("Vote Counts:", dict(tally))
print("Winner:", tally.most_common(1)[0])`,
      output: `Future date (+7d 2h): 2026-09-27 12:30
Vote Counts: {'Python': 3, 'JavaScript': 1, 'Go': 2, 'Rust': 1}
Winner: ('Python', 3)`
    },
    detailedExample: {
      code: `import os
import sys
from collections import defaultdict

# 1. defaultdict to group items without KeyError
department_employees = defaultdict(list)
data = [("Engineering", "Swamy"), ("Engineering", "Alex"), ("Marketing", "Sarah")]

for dept, emp in data:
    department_employees[dept].append(emp)

print("Grouped Employees:", dict(department_employees))

# 2. System and Environment
print("Platform:", sys.platform)
print("Path separator:", os.sep)
print("Current Working Directory (basename):", os.path.basename(os.getcwd()) or "root")`,
      output: `Grouped Employees: {'Engineering': ['Swamy', 'Alex'], 'Marketing': ['Sarah']}
Platform: linux
Path separator: /
Current Working Directory (basename): root`
    },
    codeExplanation: [
      'Line 5: `defaultdict(list)` automatically initializes missing keys with an empty list `[]`, avoiding `if key not in dict:` boilerplate.',
      'Line 13: `sys.platform` identifies the host OS runtime.',
      'Line 14: `os.sep` is `/` on Unix/macOS and `\\` on Windows.'
    ],
    commonMistakes: [
      {
        mistake: 'Re-implementing frequency counting with manual dict loops instead of `collections.Counter`.',
        whyItIsWrong: 'Manual counting requires more lines of code and is slower than the C-optimized `Counter`.',
        correction: 'Use `from collections import Counter; counts = Counter(data)`.'
      },
      {
        mistake: 'Using string concatenation for file paths: `path = folder + "/" + filename`.',
        whyItIsWrong: 'Breaks cross-platform compatibility across Windows and Linux.',
        correction: 'Use `os.path.join(folder, filename)` or the modern `pathlib.Path(folder) / filename`.'
      }
    ],
    importantRules: [
      'The Python Standard Library is built-in and requires zero installation via pip.',
      'Use `collections.defaultdict` and `collections.Counter` for cleaner data processing.',
      'Use `datetime.timedelta` for adding and subtracting dates.'
    ],
    interviewPerspective: 'In coding interviews, demonstrating proficiency with `collections.Counter`, `collections.deque`, and `heapq` distinguishes strong Python engineers from beginners.',
    practiceQuestions: [
      {
        question: 'Which class from the collections module counts frequency of elements in an iterable?',
        solution: 'collections.Counter'
      },
      {
        question: 'How do you add 10 days to a datetime object in Python?',
        solution: 'date_obj + datetime.timedelta(days=10)'
      }
    ],
    checkpoint: [
      {
        id: 'm9-t4-q1',
        type: 'output',
        prompt: 'What will be the output of this Python code snippet?',
        codeSnippet: `from collections import Counter
c = Counter("abracadabra")
print(c["a"], c["z"])`,
        correctAnswer: '5 0',
        explanation: 'Letter "a" appears 5 times. Accessing a non-existent key in `Counter` returns 0 instead of raising a KeyError.'
      },
      {
        id: 'm9-t4-q2',
        type: 'mcq',
        prompt: 'Which standard library module provides cross-platform tools for interacting with the operating system and file paths?',
        options: ['sys', 'os', 'math', 'platform'],
        correctAnswer: 1,
        explanation: 'The `os` module (and `pathlib`) provides operating system interaction, directory operations, and path manipulation.'
      }
    ]
  },

  // =========================================================================
  // MODULE 10: File Handling (5 Topics)
  // =========================================================================
  'reading-text-files': {
    id: 'reading-text-files',
    moduleId: 'm10',
    topicNumber: 1,
    title: 'Reading Text Files',
    shortSummary: 'Opening files in read mode, read(), readline(), readlines(), and file pointer movement.',
    whatIsIt: 'Reading files in Python involves using the built-in `open(filename, mode)` function with mode `"r"` (read). You can read the full content at once with `.read()`, read line-by-line with `.readline()`, or retrieve all lines as a list with `.readlines()`.',
    whyDoWeNeedIt: 'Real-world software constantly ingests external data: configuration files, server log streams, input datasets, and document files.',
    syntax: `# Basic open and close (manual)
file = open("data.txt", "r", encoding="utf-8")
content = file.read()
file.close()

# Iterating over file lines directly (memory efficient):
# for line in file:
#     print(line.strip())`,
    basicExample: {
      code: `# Simulating reading file content in memory
file_content = """Alpha
Beta
Gamma
Delta"""

# Method 1: .read() gets full text string
print("Full length in chars:", len(file_content))

# Method 2: .splitlines() mimics .readlines()
lines = file_content.splitlines()
print("Total lines:", len(lines))
print("First line:", lines[0])
print("Last line:", lines[-1])`,
      output: `Full length in chars: 22
Total lines: 4
First line: Alpha
Last line: Delta`
    },
    detailedExample: {
      code: `# Demonstration of reading methods and line stripping
mock_log = """[INFO] 10:00:01 Server started\\n[WARN] 10:00:15 High memory\\n[ERROR] 10:01:00 Connection dropped"""

# Process lines efficiently
error_count = 0
log_entries = []

for line in mock_log.split("\\n"):
    clean_line = line.strip()
    if clean_line.startswith("[ERROR]"):
        error_count += 1
    log_entries.append(clean_line)

print(f"Processed {len(log_entries)} logs. Found {error_count} errors.")
print("Recent logs:", log_entries)`,
      output: `Processed 3 logs. Found 1 errors.
Recent logs: ['[INFO] 10:00:01 Server started', '[WARN] 10:00:15 High memory', '[ERROR] 10:01:00 Connection dropped']`
    },
    codeExplanation: [
      'Line 8: `.strip()` removes trailing whitespace and newline characters (`\\n`, `\\r`).',
      'Line 9: `.startswith("[ERROR]")` filters log events.',
      'Line 10: Increments the counter for critical occurrences.'
    ],
    commonMistakes: [
      {
        mistake: 'Calling `.read()` on multi-gigabyte log files.',
        whyItIsWrong: 'Loads the entire file into RAM simultaneously, leading to `MemoryError` and system lockup.',
        correction: 'Iterate line-by-line using `for line in file:` which streams the file in chunks with O(1) memory.'
      },
      {
        mistake: 'Forgetting to specify `encoding="utf-8"` when reading text files.',
        whyItIsWrong: 'On Windows, defaults to system code page (like `cp1252`), crashing on Unicode / emojis with `UnicodeDecodeError`.',
        correction: 'Always pass `encoding="utf-8"` to `open()`.'
      }
    ],
    importantRules: [
      'The default file mode in `open()` is `"r"` (read).',
      'Always specify `encoding="utf-8"` for portable cross-platform text processing.',
      'Iterating directly over a file object (`for line in file:`) is memory efficient.'
    ],
    interviewPerspective: 'A standard interview question: "How would you process a 50GB file on a machine with 4GB RAM in Python?" (Answer: Stream line-by-line or in fixed chunks via generator without `.read()`).',
    practiceQuestions: [
      {
        question: 'What is the return type of `file.readlines()`?',
        solution: 'A list of strings, where each string represents a line including its newline character.'
      },
      {
        question: 'What error occurs if you try to open a non-existent file in "r" mode?',
        solution: 'FileNotFoundError'
      }
    ],
    checkpoint: [
      {
        id: 'm10-t1-q1',
        type: 'mcq',
        prompt: 'Which method reads the entire remaining file content into a single string?',
        options: ['file.readline()', 'file.readlines()', 'file.read()', 'file.scan()'],
        correctAnswer: 2,
        explanation: '`file.read()` returns the complete contents of the file as a single string.'
      },
      {
        id: 'm10-t1-q2',
        type: 'output',
        prompt: 'What will be the output of running `len(text.splitlines())` on `"Line1\\nLine2\\nLine3"`?',
        correctAnswer: '3',
        explanation: 'There are 3 lines separated by newline characters.'
      }
    ]
  },

  'writing-text-files': {
    id: 'writing-text-files',
    moduleId: 'm10',
    topicNumber: 2,
    title: 'Writing Text Files',
    shortSummary: 'Write mode ("w"), append mode ("a"), write(), writelines(), and flushing data.',
    whatIsIt: 'Writing files in Python is done using `open()` with mode `"w"` (write / overwrite) or `"a"` (append). Mode `"w"` creates a new file or completely wipes an existing file, while mode `"a"` preserves existing contents and appends new text at the end.',
    whyDoWeNeedIt: 'Persisting application outputs, saving user reports, generating export files, and logging execution telemetry all require reliable file writing.',
    syntax: `# 1. Write mode (Overwrites existing content!)
# f = open("output.txt", "w", encoding="utf-8")
# f.write("Hello World\\n")
# f.close()

# 2. Append mode (Adds to existing content)
# f = open("log.txt", "a", encoding="utf-8")
# f.write("New event logged\\n")
# f.close()`,
    basicExample: {
      code: `# Demonstration of overwriting vs appending behavior
storage = []

def mock_write(mode, content):
    global storage
    if mode == "w":
        storage = [content]  # Overwrites
    elif mode == "a":
        storage.append(content)  # Appends

mock_write("w", "Initial Header")
print("After write 'w':", storage)

mock_write("a", "Log Line 1")
mock_write("a", "Log Line 2")
print("After 2 appends 'a':", storage)

mock_write("w", "Fresh Start")
print("After second write 'w':", storage)`,
      output: `After write 'w': ['Initial Header']
After 2 appends 'a': ['Initial Header', 'Log Line 1', 'Log Line 2']
After second write 'w': ['Fresh Start']`
    },
    detailedExample: {
      code: `# Formatting and writing multiple lines
records = [
    {"id": 101, "name": "Swamy", "role": "FullStack"},
    {"id": 102, "name": "Ananya", "role": "Data Scientist"},
    {"id": 103, "name": "Kiran", "role": "DevOps"}
]

# Constructing formatted report lines
report_lines = ["ID\\tNAME\\t\\tROLE\\n", "-" * 35 + "\\n"]
for r in records:
    report_lines.append(f"{r['id']}\\t{r['name']:<12}\\t{r['role']}\\n")

print("Generated Report Preview:")
print("".join(report_lines).strip())`,
      output: `Generated Report Preview:
ID\tNAME\t\tROLE
-----------------------------------
101\tSwamy       \tFullStack
102\tAnanya      \tData Scientist
103\tKiran       \tDevOps`
    },
    codeExplanation: [
      'Line 9: Prepares header and separator rows.',
      'Line 11: Uses f-string formatting (`{r["name"]:<12}`) for aligned column tabular output.',
      'Line 14: `.join(report_lines)` simulates `.writelines()` in a single clean buffer.'
    ],
    commonMistakes: [
      {
        mistake: 'Using mode `"w"` when intending to append to a log file.',
        whyItIsWrong: 'Mode `"w"` immediately truncates (erases) the entire existing file without confirmation.',
        correction: 'Always use mode `"a"` to append to existing files.'
      },
      {
        mistake: 'Expecting `file.write(line)` to automatically insert a newline character.',
        whyItIsWrong: 'Unlike `print()`, `file.write()` does NOT add a newline. Consecutive writes will be glued together on the same line.',
        correction: 'Explicitly include `\\n` at the end of written strings (`file.write(line + "\\n")`).'
      }
    ],
    importantRules: [
      'Mode `"w"` creates a new file or completely wipes an existing file upon opening.',
      'Mode `"a"` creates a new file if it does not exist or appends to the end of an existing file.',
      '`file.write()` does not automatically append newline characters.'
    ],
    interviewPerspective: 'Interviewers often ask about buffering and data loss if a process crashes before calling `.close()` or `.flush()`.',
    practiceQuestions: [
      {
        question: 'Which file mode opens a file for writing without truncating existing content?',
        solution: '"a" (append mode)'
      },
      {
        question: 'What happens if you open a non-existent file in "w" mode?',
        solution: 'Python creates a new empty file with that name.'
      }
    ],
    checkpoint: [
      {
        id: 'm10-t2-q1',
        type: 'mcq',
        prompt: 'What happens if you open an existing file containing 500 lines using `open("data.txt", "w")`?',
        options: [
          'The existing 500 lines are preserved and new text is added at the bottom',
          'The existing file content is immediately erased (truncated to 0 bytes)',
          'A FileExistsError is raised',
          'The file is opened in read-only mode'
        ],
        correctAnswer: 1,
        explanation: 'Write mode `"w"` truncates existing files immediately upon opening.'
      },
      {
        id: 'm10-t2-q2',
        type: 'output',
        prompt: 'If you run `f.write("A"); f.write("B")`, what will the file contain?',
        correctAnswer: 'AB',
        explanation: '`f.write()` does not append newline characters automatically, resulting in "AB".'
      }
    ]
  },

  'with-statement': {
    id: 'with-statement',
    moduleId: 'm10',
    topicNumber: 3,
    title: 'The with Statement (Context Managers)',
    shortSummary: 'Automatic resource management, guaranteed file closure, and context manager protocol.',
    whatIsIt: 'The `with` statement in Python establishes a runtime context for resource management. When working with files, wrapping operations inside a `with` block guarantees that the file descriptor is closed automatically when execution leaves the block, even if an unhandled exception occurs.',
    whyDoWeNeedIt: 'Without `with`, forgetting to close files or encountering an exception before `file.close()` can cause resource leaks, locked file handles in the OS, and corrupted output buffers.',
    syntax: `# The Pythonic standard for file handling:
with open("filename.txt", "r", encoding="utf-8") as file:
    content = file.read()
# File is automatically closed here!

# Opening multiple files simultaneously:
with open("source.txt", "r") as src, open("dest.txt", "w") as dst:
    for line in src:
        dst.write(line)`,
    basicExample: {
      code: `# Context Manager Simulation
class MockFileManager:
    def __init__(self, filename):
        self.filename = filename
        self.is_closed = False

    def __enter__(self):
        print(f"1. Opening '{self.filename}' and acquiring resource handle")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.is_closed = True
        print(f"3. Automatically closing '{self.filename}' (is_closed={self.is_closed})")

with MockFileManager("app.log") as fm:
    print("2. Inside with-block: performing file I/O operations")`,
      output: `1. Opening 'app.log' and acquiring resource handle
2. Inside with-block: performing file I/O operations
3. Automatically closing 'app.log' (is_closed=True)`
    },
    detailedExample: {
      code: `# Demonstrating safety during exceptions
class SafeResource:
    def __enter__(self):
        print("Resource acquired.")
        return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"Resource safely cleaned up! Exception caught: {exc_type.__name__ if exc_type else None}")
        return True # Suppress exception for clean demo

with SafeResource():
    print("Doing risky calculation...")
    val = 10 / 0 # ZeroDivisionError!
    print("This line never runs.")

print("Program continued safely outside with-block.")`,
      output: `Resource acquired.
Doing risky calculation...
Resource safely cleaned up! Exception caught: ZeroDivisionError
Program continued safely outside with-block.`
    },
    codeExplanation: [
      'Line 2: `__enter__` is invoked when entering the `with` block.',
      'Line 5: `__exit__` is GUARANTEED to execute when exiting the block, even after `ZeroDivisionError` on line 11.',
      'Line 6: Returning `True` from `__exit__` suppresses the exception; in standard file context managers, the file closes and the error propagates.'
    ],
    commonMistakes: [
      {
        mistake: 'Trying to read from a file variable after the `with` block has finished.',
        whyItIsWrong: 'Raises `ValueError: I/O operation on closed file`.',
        correction: 'Perform all reading and writing operations inside the indented `with` block.'
      },
      {
        mistake: 'Using manual `open()` and `close()` instead of `with`.',
        whyItIsWrong: 'If any line throws an error before `close()`, the file remains open indefinitely in OS memory.',
        correction: 'Always use `with open(...) as f:`.'
      }
    ],
    importantRules: [
      'Always use the `with` statement for file operations in Python.',
      'The file is automatically closed immediately when exiting the `with` block.',
      'Objects that support `with` implement the context manager protocol (`__enter__` and `__exit__`).'
    ],
    interviewPerspective: 'A top Python interview question: "What dunder methods power the with statement?" (`__enter__` and `__exit__`). Be ready to write a custom context manager class or generator using `@contextlib.contextmanager`.',
    practiceQuestions: [
      {
        question: 'What are the two magic methods required to implement a custom context manager?',
        solution: '__enter__ and __exit__'
      },
      {
        question: 'What happens to the file object when an unhandled exception occurs inside a `with open(...) as f:` block?',
        solution: 'Python automatically closes the file before propagating the exception up the call stack.'
      }
    ],
    checkpoint: [
      {
        id: 'm10-t3-q1',
        type: 'mcq',
        prompt: 'Why is using `with open(...) as f:` preferred over `f = open(...)` and `f.close()` in Python?',
        options: [
          'It runs file I/O on a background GPU thread',
          'It guarantees the file is properly closed even if an unexpected exception occurs',
          'It automatically converts plain text files into binary files',
          'It prevents other operating system users from viewing the file name'
        ],
        correctAnswer: 1,
        explanation: 'Context managers guarantee `__exit__` execution and automatic resource cleanup regardless of errors.'
      },
      {
        id: 'm10-t3-q2',
        type: 'output',
        prompt: 'What error is raised if you try to execute `f.read()` on a file object `f` after exiting its `with` block?',
        correctAnswer: 'ValueError',
        explanation: 'Attempting I/O on a closed file descriptor raises `ValueError: I/O operation on closed file`.'
      }
    ]
  },

  'csv-files': {
    id: 'csv-files',
    moduleId: 'm10',
    topicNumber: 4,
    title: 'CSV Files (Comma-Separated Values)',
    shortSummary: 'Reading and writing tabular data with csv.reader, csv.writer, DictReader, and DictWriter.',
    whatIsIt: 'CSV (Comma-Separated Values) is a ubiquitous plain-text format for tabular data. Python\'s built-in `csv` module provides `csv.reader` / `csv.writer` for list-based row processing and `csv.DictReader` / `csv.DictWriter` for mapping rows directly into dictionaries using header column names.',
    whyDoWeNeedIt: 'Data analysts, backend developers, and ML engineers constantly ingest and export spreadsheets, transaction logs, and datasets using CSV files.',
    syntax: `import csv

# 1. Reading as Dictionaries
# with open("users.csv", "r", encoding="utf-8") as f:
#     reader = csv.DictReader(f)
#     for row in reader:
#         print(row["name"], row["email"])

# 2. Writing Dictionaries
# with open("out.csv", "w", newline="", encoding="utf-8") as f:
#     writer = csv.DictWriter(f, fieldnames=["id", "name", "score"])
#     writer.writeheader()
#     writer.writerow({"id": 1, "name": "Swamy", "score": 95})`,
    basicExample: {
      code: `import csv
import io

# Simulated CSV file in memory
raw_csv = """name,subject,marks
Swamy,Python,95
Ananya,AI,98
Kiran,DevOps,82"""

f = io.StringIO(raw_csv)
reader = csv.DictReader(f)

for row in reader:
    print(f"Student: {row['name']} | Subject: {row['subject']} | Marks: {int(row['marks'])}")`,
      output: `Student: Swamy | Subject: Python | Marks: 95
Student: Ananya | Subject: AI | Marks: 98
Student: Kiran | Subject: DevOps | Marks: 82`
    },
    detailedExample: {
      code: `import csv
import io

# Processing & calculating summary stats from CSV
raw_sales = """transaction_id,product,quantity,price_per_unit
TX101,Keyboard,5,45.00
TX102,Mouse,12,20.00
TX103,Monitor,3,180.00
TX104,USB Cable,25,8.50"""

input_buffer = io.StringIO(raw_sales)
reader = csv.DictReader(input_buffer)

total_revenue = 0.0
items_sold = 0

for row in reader:
    qty = int(row["quantity"])
    price = float(row["price_per_unit"])
    total_revenue += qty * price
    items_sold += qty

print(f"Total Items Sold: {items_sold}")
print(f"Total Revenue: \${total_revenue:.2f}")`,
      output: `Total Items Sold: 45
Total Revenue: \$1217.50`
    },
    codeExplanation: [
      'Line 11: `csv.DictReader` automatically parses the first row (`fieldnames`) as dictionary keys.',
      'Line 18: Casts numeric strings into `int` and `float` because CSV readers parse all fields as strings (`str`).',
      'Line 20: Aggregates revenue calculation across all transaction rows.'
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting `newline=""` when opening a file for `csv.writer` on Windows.',
        whyItIsWrong: 'Causes blank extra empty lines between every single row in the output CSV file.',
        correction: 'Always open CSV write files with `open(..., "w", newline="", encoding="utf-8")`.'
      },
      {
        mistake: 'Assuming numeric CSV values are automatically parsed as integers or floats.',
        whyItIsWrong: '`csv.reader` and `DictReader` treat every value as `str`. Adding them performs string concatenation (`"5" + "12" = "512"`).',
        correction: 'Explicitly cast numeric fields with `int(row["col"])` or `float(row["col"])`.'
      }
    ],
    importantRules: [
      'Always use `newline=""` when opening files for writing with the `csv` module.',
      '`csv.DictReader` reads rows into dictionaries keyed by column headers.',
      'All values read by the `csv` module are strings; explicit type casting is mandatory for arithmetic.'
    ],
    interviewPerspective: 'Common interview tasks involve processing messy CSV data: handling missing fields, parsing quotes/commas inside cells, and calculating aggregations.',
    practiceQuestions: [
      {
        question: 'Why is `newline=""` passed to `open()` when creating CSV files with `csv.writer`?',
        solution: 'To prevent the csv writer from producing unwanted blank lines between rows on Windows platforms.'
      },
      {
        question: 'What data type is returned for cell values by `csv.reader`?',
        solution: 'str (string)'
      }
    ],
    checkpoint: [
      {
        id: 'm10-t4-q1',
        type: 'mcq',
        prompt: 'Which class from Python\'s built-in `csv` module allows accessing row values by column header names instead of integer indexes?',
        options: ['csv.reader', 'csv.DictReader', 'csv.MapReader', 'csv.DataFrame'],
        correctAnswer: 1,
        explanation: '`csv.DictReader` maps each row to a dictionary using header names from the first row.'
      },
      {
        id: 'm10-t4-q2',
        type: 'output',
        prompt: 'If a CSV cell contains the text `"40"`, what is the result of `row["marks"] * 2` without type casting?',
        correctAnswer: '4040',
        explanation: 'Because CSV values are strings, `"40" * 2` performs string repetition to yield `"4040"`.'
      }
    ]
  },

  'json-files': {
    id: 'json-files',
    moduleId: 'm10',
    topicNumber: 5,
    title: 'JSON Files (JavaScript Object Notation)',
    shortSummary: 'Serialization and deserialization with json.load, json.dump, json.loads, and json.dumps.',
    whatIsIt: 'JSON (JavaScript Object Notation) is the standard format for web APIs, configuration files, and document storage. Python\'s built-in `json` module provides four primary functions: `loads()` (load from string), `dumps()` (dump to string), `load()` (load from file), and `dump()` (dump to file).',
    whyDoWeNeedIt: 'JSON is the language of modern web development, REST APIs, cloud configurations, and database interchange. Understanding serialization (Python -> JSON) and deserialization (JSON -> Python) is essential.',
    syntax: `import json

# 1. String conversion
# Python Dict -> JSON String (Serialization)
json_str = json.dumps({"name": "Swamy", "age": 22}, indent=2)

# JSON String -> Python Dict (Deserialization)
data = json.loads(json_str)

# 2. File conversion
# with open("data.json", "w", encoding="utf-8") as f:
#     json.dump(data, f, indent=4)
# with open("data.json", "r", encoding="utf-8") as f:
#     loaded_data = json.load(f)`,
    basicExample: {
      code: `import json

# Python Dictionary with nested structures
user_profile = {
    "id": 1001,
    "name": "Swamy",
    "skills": ["Python", "React", "Docker"],
    "is_verified": True,
    "settings": {
        "theme": "dark",
        "notifications": False
    }
}

# Serialize to formatted JSON string
json_text = json.dumps(user_profile, indent=2)
print("JSON Output:\\n", json_text)

# Deserialize back to Python dict
parsed = json.loads(json_text)
print("\\nParsed Skill #1:", parsed["skills"][0])
print("Is Verified (Python bool):", parsed["is_verified"], type(parsed["is_verified"]))`,
      output: `JSON Output:
{
  "id": 1001,
  "name": "Swamy",
  "skills": [
    "Python",
    "React",
    "Docker"
  ],
  "is_verified": true,
  "settings": {
    "theme": "dark",
    "notifications": false
  }
}

Parsed Skill #1: Python
Is Verified (Python bool): True <class 'bool'>`
    },
    detailedExample: {
      code: `import json

# Python type mapping rules in JSON:
# Python None   <-> JSON null
# Python True   <-> JSON true
# Python False  <-> JSON false
# Python dict   <-> JSON object
# Python list   <-> JSON array
# Python tuple  <-> JSON array

python_data = {
    "scores": (90, 85, 92),  # tuple becomes JSON array []
    "metadata": None         # None becomes JSON null
}

serialized = json.dumps(python_data)
print("Serialized:", serialized)

deserialized = json.loads(serialized)
print("Deserialized tuple returned as:", type(deserialized["scores"]), deserialized["scores"])
print("Deserialized null returned as:", deserialized["metadata"])`,
      output: `Serialized: {"scores": [90, 85, 92], "metadata": null}
Deserialized tuple returned as: <class 'list'> [90, 85, 92]
Deserialized null returned as: None`
    },
    codeExplanation: [
      'Line 15: `json.dumps()` serializes the tuple into a JSON array `[90, 85, 92]`.',
      'Line 19: When deserialized back via `json.loads()`, JSON arrays are always parsed as Python `list` objects (not tuples).',
      'Line 20: JSON `null` is automatically converted back into Python `None`.'
    ],
    commonMistakes: [
      {
        mistake: 'Confusing `json.load()` (from file stream) with `json.loads()` (from string).',
        whyItIsWrong: 'Passing a file object to `json.loads(f)` raises `TypeError: the JSON object must be str, bytes or bytearray, not TextIOWrapper`.',
        correction: 'Use `json.load(file)` for file objects, and `json.loads(string_data)` for strings (remember the "s" stands for "string").'
      },
      {
        mistake: 'Attempting to serialize non-JSON serializable types like `datetime`, `set`, or custom class instances without a custom encoder.',
        whyItIsWrong: 'Raises `TypeError: Object of type set is not JSON serializable`.',
        correction: 'Convert sets to lists (`list(my_set)`) or dates to ISO strings (`dt.isoformat()`) before dumping.'
      }
    ],
    importantRules: [
      '`load()` and `dump()` operate on file objects.',
      '`loads()` and `dumps()` operate on string objects ("s" = string).',
      'JSON keys must always be strings; Python dictionary non-string keys will be converted to string or raise TypeError.'
    ],
    interviewPerspective: 'In full-stack and backend interviews, writing clean API response serializers, handling nested JSON payloads, and writing custom `json.JSONEncoder` classes are standard evaluation topics.',
    practiceQuestions: [
      {
        question: 'What is the difference between `json.dump()` and `json.dumps()`?',
        solution: '`json.dump()` writes JSON directly to a file object, while `json.dumps()` returns a serialized JSON string.'
      },
      {
        question: 'What does JSON `null` convert to when parsed with `json.loads()` in Python?',
        solution: 'None'
      }
    ],
    checkpoint: [
      {
        id: 'm10-t5-q1',
        type: 'mcq',
        prompt: 'Which function should you call to parse a JSON formatted string stored in a Python variable `raw_json`?',
        options: ['json.load(raw_json)', 'json.loads(raw_json)', 'json.parse(raw_json)', 'json.decode(raw_json)'],
        correctAnswer: 1,
        explanation: '`json.loads()` parses JSON directly from a string (the trailing "s" stands for string).'
      },
      {
        id: 'm10-t5-q2',
        type: 'output',
        prompt: 'What will `print(json.dumps({"active": True, "data": None}))` output?',
        correctAnswer: '{"active": true, "data": null}',
        explanation: 'Python `True` and `None` serialize to JSON lowercase `true` and `null`.'
      }
    ]
  }
};
