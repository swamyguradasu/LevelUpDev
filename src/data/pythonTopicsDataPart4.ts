import { PythonTopicDetail } from './pythonTopicsDataPart1';

export const PYTHON_TOPICS_PART4: Record<string, PythonTopicDetail> = {
  // =========================================================================
  // MODULE 11: Exception Handling (5 Topics)
  // =========================================================================
  'try-block': {
    id: 'try-block',
    moduleId: 'm11',
    topicNumber: 1,
    title: 'The try Block',
    shortSummary: 'Detecting and wrapping risky runtime operations to prevent unexpected script crashes.',
    whatIsIt: 'In Python, a `try` block is used to enclose code statements that might potentially trigger a runtime error (an exception). When an exception occurs inside a `try` block, Python immediately halts execution of that block and jumps to the matching `except` handler.',
    whyDoWeNeedIt: 'Real-world applications face unpredictable conditions: missing files, network dropouts, invalid user inputs, database connection failures, and division by zero. `try` blocks prevent programs from terminating abruptly with unhandled tracebacks.',
    syntax: `try:
    # Risky code statements
    result = 10 / 0
except ZeroDivisionError:
    # Error recovery handling
    print("Cannot divide by zero!")`,
    basicExample: {
      code: `def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Division by zero is undefined"

print("10 / 2 =", safe_divide(10, 2))
print("10 / 0 =", safe_divide(10, 0))`,
      output: `10 / 2 = 5.0
10 / 0 = Division by zero is undefined`
    },
    detailedExample: {
      code: `def parse_user_age(age_input):
    try:
        age = int(age_input)
        if age < 0 or age > 120:
            return "Invalid age range (0-120)"
        return f"Age recorded: {age}"
    except ValueError:
        return f"Error: '{age_input}' is not a valid integer number"

print(parse_user_age("25"))
print(parse_user_age("twenty-five"))
print(parse_user_age("-5"))`,
      output: `Age recorded: 25
Error: 'twenty-five' is not a valid integer number
Invalid age range (0-120)`
    },
    codeExplanation: [
      'Line 2: `try` monitors the `int(age_input)` conversion.',
      'Line 7: When given `"twenty-five"`, Python raises a `ValueError`, which jumps directly to line 7 instead of crashing the program.',
      'Line 5: Standard range validation is performed when casting succeeds.'
    ],
    commonMistakes: [
      {
        mistake: 'Putting hundreds of unrelated lines inside a single giant `try` block.',
        whyItIsWrong: 'Obscures which exact operation failed and can mask unrelated bugs elsewhere in the codebase.',
        correction: 'Keep `try` blocks narrow and focused only on the specific statements capable of throwing expected exceptions.'
      },
      {
        mistake: 'Writing a `try` block without at least one `except` or `finally` clause.',
        whyItIsWrong: 'Python raises `SyntaxError: expected \'except\' or \'finally\' block`.',
        correction: 'Every `try` block must be accompanied by at least one `except` or `finally` block.'
      }
    ],
    importantRules: [
      'A `try` block must be followed by at least one `except` block or a `finally` block.',
      'Statements inside the `try` block after the failing line are skipped immediately when an exception occurs.',
      'Keep `try` blocks as concise as possible.'
    ],
    interviewPerspective: 'Interviewers look for clean defensive programming and error boundaries. They will ask how unhandled exceptions propagate up the call stack until caught or terminated.',
    practiceQuestions: [
      {
        question: 'What happens to lines of code inside a try block after the line that raised an exception?',
        solution: 'They are skipped immediately; execution jumps directly to the matching except block.'
      },
      {
        question: 'Can a try block exist without an except clause?',
        solution: 'Yes, but only if a finally block is provided instead.'
      }
    ],
    checkpoint: [
      {
        id: 'm11-t1-q1',
        type: 'output',
        prompt: 'What will be the output of this Python code snippet?',
        codeSnippet: `result = "A"
try:
    result += "B"
    x = int("invalid")
    result += "C"
except ValueError:
    result += "D"
print(result)`,
        correctAnswer: 'ABD',
        explanation: '"A" and "B" are appended. `int("invalid")` raises `ValueError`, skipping `"C"` and jumping to append `"D"`.'
      },
      {
        id: 'm11-t1-q2',
        type: 'mcq',
        prompt: 'Which statement about Python `try` blocks is FALSE?',
        options: [
          'A try block can have multiple except clauses',
          'A try block can be paired with an else clause',
          'A try block can exist completely on its own without except or finally',
          'Execution exits the try block as soon as an exception is thrown'
        ],
        correctAnswer: 2,
        explanation: 'A `try` block requires at least one `except` or `finally` block; a bare `try` without either is a SyntaxError.'
      }
    ]
  },

  'except-block': {
    id: 'except-block',
    moduleId: 'm11',
    topicNumber: 2,
    title: 'The except Block & Exception Hierarchy',
    shortSummary: 'Catching specific exceptions, multiple handlers, exception objects, and avoiding bare except.',
    whatIsIt: 'The `except` block catches and handles exceptions raised inside a `try` block. Python allows catching specific exception types (e.g. `except KeyError:`, `except (ValueError, TypeError):`), inspecting the exception instance with `as err`, and handling multiple error types with dedicated branches.',
    whyDoWeNeedIt: 'Specific exception handling enables targeted recovery strategies: retrying a network timeout differently from an authentication error or reporting a missing config key without crashing.',
    syntax: `try:
    # risky operations
    pass
except ValueError as e:
    print("Value error occurred:", e)
except (KeyError, IndexError) as e:
    print("Lookup failed:", e)
except Exception as e:
    print("Unexpected error:", e)`,
    basicExample: {
      code: `def process_lookup(data_dict, key, index):
    try:
        val = data_dict[key][index]
        return f"Found: {val}"
    except KeyError:
        return f"Error: Dictionary has no key '{key}'"
    except IndexError:
        return f"Error: List index {index} out of range"
    except TypeError:
        return "Error: Value is not indexable"

data = {"items": [10, 20, 30]}
print(process_lookup(data, "items", 1))
print(process_lookup(data, "missing", 0))
print(process_lookup(data, "items", 99))`,
      output: `Found: 20
Error: Dictionary has no key 'missing'
Error: List index 99 out of range`
    },
    detailedExample: {
      code: `# Python Built-in Exception Hierarchy (excerpt):
# BaseException
#  ├── SystemExit, KeyboardInterrupt
#  └── Exception (all standard application errors)
#       ├── ArithmeticError -> ZeroDivisionError, OverflowError
#       ├── LookupError     -> IndexError, KeyError
#       └── ValueError, TypeError, FileNotFoundError

def handle_lookup(container, key):
    try:
        return container[key]
    except LookupError as err:
        # Catches BOTH IndexError and KeyError because LookupError is their parent!
        return f"Caught LookupError: {type(err).__name__} -> {err}"

print(handle_lookup([1, 2, 3], 10))       # IndexError is a LookupError
print(handle_lookup({"a": 1}, "missing")) # KeyError is a LookupError`,
      output: `Caught LookupError: IndexError -> list index out of range
Caught LookupError: KeyError -> 'missing'`
    },
    codeExplanation: [
      'Line 13: `except LookupError as err:` catches both `IndexError` and `KeyError` due to inheritance hierarchy in Python.',
      'Line 15: `type(err).__name__` reveals the exact runtime class of the caught error.'
    ],
    commonMistakes: [
      {
        mistake: 'Using a bare `except:` or `except BaseException:`.',
        whyItIsWrong: 'Catches system exit signals (`SystemExit`, `KeyboardInterrupt`), preventing users from stopping the script with Ctrl+C.',
        correction: 'Always catch specific exception types or use `except Exception as e:` if a broad handler is truly required.'
      },
      {
        mistake: 'Placing parent exceptions before child exceptions: `except Exception:` before `except ValueError:`.',
        whyItIsWrong: 'The first matching handler executes, making the specific `ValueError` block unreachable dead code.',
        correction: 'Always place more specific child exceptions before generic parent exceptions.'
      }
    ],
    importantRules: [
      'Order `except` clauses from most specific child classes to most general parent classes.',
      'Never use bare `except:` without an exception class.',
      'Use `as variable_name` to inspect the error message and traceback metadata.'
    ],
    interviewPerspective: 'Interviewers often test understanding of Python\'s Exception class hierarchy (BaseException vs Exception) and the consequences of catching KeyboardInterrupt.',
    practiceQuestions: [
      {
        question: 'Which parent exception class can catch both IndexError and KeyError?',
        solution: 'LookupError'
      },
      {
        question: 'Why is `except Exception:` preferred over bare `except:`?',
        solution: 'Because bare `except:` catches `KeyboardInterrupt` and `SystemExit`, preventing clean process termination.'
      }
    ],
    checkpoint: [
      {
        id: 'm11-t2-q1',
        type: 'mcq',
        prompt: 'Why should you avoid using a bare `except:` statement with no exception type specified?',
        options: [
          'It slows down Python by disabling bytecode compilation',
          'It intercepts Ctrl+C (KeyboardInterrupt) and SystemExit, preventing normal program interruption',
          'It causes all integer variables to convert to strings',
          'It deletes the active virtual environment'
        ],
        correctAnswer: 1,
        explanation: 'A bare `except:` catches `BaseException`, intercepting `KeyboardInterrupt` and `SystemExit`.'
      },
      {
        id: 'm11-t2-q2',
        type: 'output',
        prompt: 'What will be printed when running this code?',
        codeSnippet: `try:
    d = {"x": 10}
    val = d["y"]
except KeyError:
    print("Caught KeyError")
except LookupError:
    print("Caught LookupError")`,
        correctAnswer: 'Caught KeyError',
        explanation: 'Python matches the first compatible `except` branch from top to bottom, which is `KeyError`.'
      }
    ]
  },

  'else-block': {
    id: 'else-block',
    moduleId: 'm11',
    topicNumber: 3,
    title: 'The else Block in Exception Handling',
    shortSummary: 'Running code exclusively when no exceptions were raised inside the try block.',
    whatIsIt: 'In Python `try-except` statements, the `else` block is an optional clause that executes ONLY IF the `try` block ran successfully to completion without raising any exceptions.',
    whyDoWeNeedIt: 'Using `else` keeps the `try` block minimal and protects against accidentally catching exceptions from code that was not supposed to be guarded.',
    syntax: `try:
    # Only the risky operation
    file = open("data.txt", "r")
except FileNotFoundError:
    print("File missing")
else:
    # Runs ONLY if open succeeded
    content = file.read()
    file.close()
    print("File read successfully")`,
    basicExample: {
      code: `def divide_and_format(a, b):
    try:
        val = a / b
    except ZeroDivisionError:
        print("Cannot divide by zero.")
    else:
        # Executes only when division succeeded
        print(f"Success: {a} / {b} = {val:.2f}")

divide_and_format(10, 4)
divide_and_format(10, 0)`,
      output: `Success: 10 / 4 = 2.50
Cannot divide by zero.`
    },
    detailedExample: {
      code: `def register_user(username, age_str):
    try:
        age = int(age_str)
    except ValueError:
        print(f"Failed to register '{username}': Age must be a valid integer.")
    else:
        # This code runs only when int() conversion succeeded
        # If an error happens HERE, it is NOT caught by the ValueError above
        status = "Adult" if age >= 18 else "Minor"
        print(f"User '{username}' registered successfully as {status} (Age {age}).")

register_user("Swamy", "24")
register_user("Bot", "not_a_number")`,
      output: `User 'Swamy' registered successfully as Adult (Age 24).
Failed to register 'Bot': Age must be a valid integer.`
    },
    codeExplanation: [
      'Line 3: `try` only guards the single type casting statement `int(age_str)`.',
      'Line 7: `else` runs exclusively when no `ValueError` occurred.',
      'Line 10: Prevents mask bugs by ensuring logic errors in registration are not mistaken for `ValueError`.'
    ],
    commonMistakes: [
      {
        mistake: 'Confusing `else` with `finally`.',
        whyItIsWrong: '`else` runs ONLY when NO exception occurred; `finally` runs ALWAYS (whether an exception occurred or not).',
        correction: 'Use `else` for success-only logic; use `finally` for mandatory cleanup.'
      },
      {
        mistake: 'Putting `else` before `except`.',
        whyItIsWrong: 'Python syntax requires `else` to come AFTER all `except` clauses and BEFORE `finally`.',
        correction: 'Order clauses as: `try` -> `except` -> `else` -> `finally`.'
      }
    ],
    importantRules: [
      'The `else` block executes only when zero exceptions were raised in the `try` block.',
      '`else` must appear after all `except` blocks and before `finally` (if present).',
      'Exceptions raised inside the `else` block are NOT caught by preceding `except` clauses in the same statement.'
    ],
    interviewPerspective: 'Interviewers ask why PEP 8 recommends using `try-except-else` (to avoid accidentally catching exceptions in secondary code that were intended for the primary operation).',
    practiceQuestions: [
      {
        question: 'Under what condition does the else block of a try-except statement execute?',
        solution: 'Only when the try block executes successfully without raising any exceptions.'
      },
      {
        question: 'What is the correct ordering of try, else, except, and finally?',
        solution: 'try -> except -> else -> finally'
      }
    ],
    checkpoint: [
      {
        id: 'm11-t3-q1',
        type: 'output',
        prompt: 'What will be printed by this Python code snippet?',
        codeSnippet: `try:
    x = 10 + 5
except TypeError:
    print("Error")
else:
    print("No Error, Sum is", x)`,
        correctAnswer: 'No Error, Sum is 15',
        explanation: 'Because no exception occurred in the `try` block, the `else` block executed successfully.'
      },
      {
        id: 'm11-t3-q2',
        type: 'mcq',
        prompt: 'If an exception is raised inside the `else` block of a try statement, what happens?',
        options: [
          'It is caught by the except blocks in the same try statement',
          'It propagates up the call stack to the outer scope because the except blocks only guard the try block',
          'Python silences the error and prints a warning',
          'The try block restarts automatically from the beginning'
        ],
        correctAnswer: 1,
        explanation: '`except` clauses only guard the `try` block; unhandled errors in `else` propagate outwards.'
      }
    ]
  },

  'finally-block': {
    id: 'finally-block',
    moduleId: 'm11',
    topicNumber: 4,
    title: 'The finally Block',
    shortSummary: 'Guaranteed execution for cleanup, closing resources, and teardown logic.',
    whatIsIt: 'The `finally` block is the final clause in an exception handling construct. Its contents are GUARANTEED to execute under all circumstances: whether an exception occurred, whether it was caught, whether an uncaught exception was raised, or even if `return` or `break` was executed in `try` or `except`.',
    whyDoWeNeedIt: '`finally` is vital for mandatory cleanup: closing database connections, releasing locks, terminating network sockets, or deleting temporary files.',
    syntax: `try:
    # acquire resource
    pass
except SpecificError:
    # handle error
    pass
finally:
    # GUARANTEED to run under all conditions
    # release resource / cleanup
    pass`,
    basicExample: {
      code: `def run_cleanup_demo(should_fail):
    print("--- Test should_fail =", should_fail, "---")
    try:
        print("1. Trying operation")
        if should_fail:
            raise ValueError("Something went wrong")
        print("2. Operation succeeded")
    except ValueError as e:
        print(f"3. Caught error: {e}")
    finally:
        print("4. FINALLY block executed: Cleanup complete!")

run_cleanup_demo(False)
print()
run_cleanup_demo(True)`,
      output: `--- Test should_fail = False ---
1. Trying operation
2. Operation succeeded
4. FINALLY block executed: Cleanup complete!

--- Test should_fail = True ---
1. Trying operation
3. Caught error: Something went wrong
4. FINALLY block executed: Cleanup complete!`
    },
    detailedExample: {
      code: `# Interaction between return statements and finally:
def return_demo():
    try:
        print("Try block executing...")
        return "RETURN_FROM_TRY"
    finally:
        print("Finally block executes BEFORE return finishes!")

result = return_demo()
print("Received result:", result)`,
      output: `Try block executing...
Finally block executes BEFORE return finishes!
Received result: RETURN_FROM_TRY`
    },
    codeExplanation: [
      'Line 4: Even though the function encounters `return "RETURN_FROM_TRY"` in the `try` block, Python pauses return dispatch.',
      'Line 6: Executes the `finally` block completely.',
      'Line 8: Resumes and delivers the returned value to the caller.'
    ],
    commonMistakes: [
      {
        mistake: 'Putting an explicit `return` statement inside the `finally` block.',
        whyItIsWrong: 'A `return` in `finally` silently suppresses any unhandled exception that was currently being propagated!',
        correction: 'Avoid putting `return` statements in `finally` blocks.'
      },
      {
        mistake: 'Assuming `finally` will not run if the function returns early.',
        whyItIsWrong: '`finally` ALWAYS executes before early returns or loop breaks.',
        correction: 'Rely on `finally` specifically for guaranteed cleanup.'
      }
    ],
    importantRules: [
      'The `finally` block always executes, even after `return`, `continue`, or unhandled exceptions.',
      '`finally` must be the very last clause in a `try` construct.',
      'Avoid placing `return` statements inside `finally` blocks.'
    ],
    interviewPerspective: 'A tricky interview brainteaser: "What happens if a try block returns a value but the finally block also returns a value?" (The return in `finally` overrides the return in `try`).',
    practiceQuestions: [
      {
        question: 'Does the finally block execute if a return statement is encountered inside the try block?',
        solution: 'Yes, the finally block is guaranteed to execute before the function actually returns.'
      },
      {
        question: 'What is the primary use case for the finally block?',
        solution: 'Releasing resources and performing mandatory cleanup (closing files, releasing database connections/locks).'
      }
    ],
    checkpoint: [
      {
        id: 'm11-t4-q1',
        type: 'output',
        prompt: 'What will be the output of running `test()`?',
        codeSnippet: `def test():
    out = []
    try:
        out.append("A")
        return out
    finally:
        out.append("B")

print(test())`,
        correctAnswer: "['A', 'B']",
        explanation: 'Before returning `out`, the `finally` block appends "B" to the mutable list, resulting in `[\'A\', \'B\']`.'
      },
      {
        id: 'm11-t4-q2',
        type: 'mcq',
        prompt: 'Which block in Python is GUARANTEED to execute regardless of whether an exception was raised, caught, or missed?',
        options: ['except', 'else', 'finally', 'catch'],
        correctAnswer: 2,
        explanation: '`finally` always executes under all conditions for resource cleanup.'
      }
    ]
  },

  'custom-exceptions': {
    id: 'custom-exceptions',
    moduleId: 'm11',
    topicNumber: 5,
    title: 'Custom Exceptions & the raise Statement',
    shortSummary: 'Defining domain-specific exception classes inheriting from Exception and raising errors.',
    whatIsIt: 'Python allows you to trigger exceptions deliberately using the `raise` keyword and create custom domain-specific exception classes by inheriting from Python\'s built-in `Exception` class.',
    whyDoWeNeedIt: 'Standard exceptions like `ValueError` are too generic for business domain logic. Custom exceptions like `InsufficientFundsError`, `UserNotAuthorizedError`, or `InvalidCouponError` make code self-documenting, easier to debug, and provide clean error hierarchies for API consumers.',
    syntax: `# 1. Define custom exception class
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        super().__init__(f"Cannot withdraw \${amount}; current balance is \${balance}")
        self.balance = balance
        self.amount = amount

# 2. Raise the custom exception
# raise InsufficientFundsError(100, 250)`,
    basicExample: {
      code: `class InvalidAgeError(Exception):
    """Raised when an age is negative or exceeds realistic human limits."""
    pass

def verify_voter_eligibility(age):
    if age < 0:
        raise InvalidAgeError(f"Age cannot be negative: {age}")
    if age < 18:
        return "Not eligible to vote (Minor)"
    return "Eligible to vote!"

try:
    print(verify_voter_eligibility(21))
    print(verify_voter_eligibility(-5))
except InvalidAgeError as err:
    print("Validation Error:", err)`,
      output: `Eligible to vote!
Validation Error: Age cannot be negative: -5`
    },
    detailedExample: {
      code: `# Real-world Banking Domain Exception Hierarchy
class BankingError(Exception):
    """Base exception for all banking operations."""
    pass

class InsufficientBalanceError(BankingError):
    def __init__(self, current_balance, attempted_withdrawal):
        msg = f"Insufficient funds: Attempted \${attempted_withdrawal:.2f}, balance is \${current_balance:.2f}"
        super().__init__(msg)
        self.shortage = attempted_withdrawal - current_balance

class AccountInactiveError(BankingError):
    pass

class BankAccount:
    def __init__(self, owner, balance, is_active=True):
        self.owner = owner
        self.balance = balance
        self.is_active = is_active

    def withdraw(self, amount):
        if not self.is_active:
            raise AccountInactiveError(f"Account for {self.owner} is frozen.")
        if amount > self.balance:
            raise InsufficientBalanceError(self.balance, amount)
        self.balance -= amount
        return self.balance

account = BankAccount("Swamy", 150.00)
try:
    account.withdraw(200.00)
except InsufficientBalanceError as err:
    print(f"Transaction Declined: {err}")
    print(f"Shortage Amount: \${err.shortage:.2f}")`,
      output: `Transaction Declined: Insufficient funds: Attempted \$200.00, balance is \$150.00
Shortage Amount: \$50.00`
    },
    codeExplanation: [
      'Line 2: `BankingError` acts as the domain parent exception inheriting from `Exception`.',
      'Line 6: `InsufficientBalanceError` stores domain metadata (`self.shortage`) for rich error handling.',
      'Line 28: Catching `InsufficientBalanceError` provides typed structured access to `err.shortage`.'
    ],
    commonMistakes: [
      {
        mistake: 'Inheriting custom exceptions directly from `BaseException` instead of `Exception`.',
        whyItIsWrong: 'Exceptions inheriting `BaseException` bypass standard `except Exception:` handlers and behave like system aborts.',
        correction: 'Always inherit application exceptions from `Exception` (or a subclass of `Exception`).'
      },
      {
        mistake: 'Writing `raise Exception` without creating a meaningful custom exception class.',
        whyItIsWrong: 'Makes it impossible for callers to catch this specific error without catching all other unrelated errors.',
        correction: 'Define a dedicated custom exception class for your specific domain condition.'
      }
    ],
    importantRules: [
      'Custom exceptions should inherit from `Exception` (or a domain base exception class).',
      'Use the `raise` keyword to throw an exception.',
      'You can re-raise an active exception using a bare `raise` inside an `except` block.'
    ],
    interviewPerspective: 'In senior interviews, you will be asked to design an error architecture for a microservice or payment system using exception hierarchy patterns.',
    practiceQuestions: [
      {
        question: 'Which base class should all standard custom user exceptions inherit from?',
        solution: 'Exception'
      },
      {
        question: 'How do you re-raise the currently active exception inside an except block?',
        solution: 'Use a bare `raise` statement with no arguments.'
      }
    ],
    checkpoint: [
      {
        id: 'm11-t5-q1',
        type: 'mcq',
        prompt: 'What is the recommended parent class when creating a custom exception class in Python?',
        options: ['BaseException', 'Exception', 'Error', 'object'],
        correctAnswer: 1,
        explanation: 'Custom application exceptions should inherit from `Exception`.'
      },
      {
        id: 'm11-t5-q2',
        type: 'output',
        prompt: 'What keyword in Python is used to explicitly trigger an exception?',
        correctAnswer: 'raise',
        explanation: 'The `raise` keyword is used to raise an exception instance or class.'
      }
    ]
  },

  // =========================================================================
  // MODULE 12: Object-Oriented Programming I (5 Topics)
  // =========================================================================
  'classes': {
    id: 'classes',
    moduleId: 'm12',
    topicNumber: 1,
    title: 'Classes in Python',
    shortSummary: 'Defining blueprints, encapsulation, attributes, and methods in Python.',
    whatIsIt: 'A Class in Python is a user-defined blueprint or prototype from which individual objects are created. Classes bundle data state (attributes) and behavior (methods) into a cohesive unit representing real-world or computational entities.',
    whyDoWeNeedIt: 'Classes provide structured modeling for complex real-world entities (users, products, shopping carts, game entities, neural network layers) that cannot be cleanly represented by primitive dictionaries and tuples alone.',
    syntax: `class ClassName:
    # Class body
    def method_name(self):
        return "Method executed"`,
    basicExample: {
      code: `class Developer:
    role = "Software Engineer"  # Class attribute
    
    def introduce(self, name, language):
        return f"Hi, I'm {name}, a {self.role} specializing in {language}."

dev = Developer()
print(dev.introduce("Swamy", "Python"))`,
      output: `Hi, I'm Swamy, a Software Engineer specializing in Python.`
    },
    detailedExample: {
      code: `class SimpleCalculator:
    """A clean calculator class demonstrating methods and state."""
    
    def add(self, a, b):
        return a + b
        
    def subtract(self, a, b):
        return a - b

    def power(self, base, exp=2):
        return base ** exp

calc = SimpleCalculator()
print("10 + 5 =", calc.add(10, 5))
print("10 - 3 =", calc.subtract(10, 3))
print("2 ^ 8 =", calc.power(2, 8))`,
      output: `10 + 5 = 15
10 - 3 = 7
2 ^ 8 = 256`
    },
    codeExplanation: [
      'Line 1: `class SimpleCalculator:` defines the class blueprint using CamelCase naming convention (PEP 8).',
      'Line 4, 7, 10: Methods are functions defined inside a class that take `self` as their first parameter.',
      'Line 13: `calc = SimpleCalculator()` instantiates an object from the class.'
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting the `self` parameter in method definitions: `def add(a, b):`.',
        whyItIsWrong: 'Calling `calc.add(10, 5)` passes the object instance implicitly as the 1st argument, causing `TypeError: add() takes 2 positional arguments but 3 were given`.',
        correction: 'Always include `self` as the first parameter for all instance methods: `def add(self, a, b):`.'
      },
      {
        mistake: 'Using snake_case instead of PascalCase (CamelCase) for class names.',
        whyItIsWrong: 'Violates PEP 8 naming conventions, making classes indistinguishable from functions and variables.',
        correction: 'Always name classes using PascalCase (e.g., `BankAccount`, `UserProfile`).'
      }
    ],
    importantRules: [
      'Class names should follow PascalCase (CamelCase) according to PEP 8.',
      'Instance methods must always accept `self` as their first parameter.',
      'Classes act as blueprints; objects are the actual instances in memory.'
    ],
    interviewPerspective: 'Interviewers test fundamental OOP concepts: Abstraction, Encapsulation, and how Python class definitions execute as code blocks at runtime.',
    practiceQuestions: [
      {
        question: 'What is the required first parameter of every instance method in Python?',
        solution: 'self'
      },
      {
        question: 'Which PEP 8 naming convention is used for Python class names?',
        solution: 'PascalCase (CamelCase)'
      }
    ],
    checkpoint: [
      {
        id: 'm12-t1-q1',
        type: 'mcq',
        prompt: 'What happens if you define an instance method inside a class without the `self` parameter and then call it via an instance `obj.method(10)`?',
        options: [
          'Python creates a global variable named self automatically',
          'A TypeError is raised because the instance is automatically passed as the first argument',
          'The method converts into a static variable',
          'The method runs without any errors'
        ],
        correctAnswer: 1,
        explanation: 'Python automatically passes the caller instance as the first argument; if `self` is missing, a `TypeError` occurs.'
      },
      {
        id: 'm12-t1-q2',
        type: 'output',
        prompt: 'What is the type of `class Car: pass; c = Car(); type(c).__name__`?',
        correctAnswer: 'Car',
        explanation: '`type(c).__name__` returns the name of the class from which instance `c` was created.'
      }
    ]
  },

  'objects': {
    id: 'objects',
    moduleId: 'm12',
    topicNumber: 2,
    title: 'Objects (Instances)',
    shortSummary: 'Instantiating objects, identity (id), state isolation, and object references.',
    whatIsIt: 'An Object is a concrete instance of a class allocated in computer memory. Every object has its own unique memory address (`id(obj)`), its own state dictionary (`obj.__dict__`), and access to the shared methods defined in its class.',
    whyDoWeNeedIt: 'Multiple independent objects can be instantiated from a single class blueprint, each holding distinct data without interfering with other instances.',
    syntax: `# Instantiation:
obj1 = ClassName()
obj2 = ClassName()

# Checking object identity and class type:
print(id(obj1) != id(obj2))  # True (distinct instances)
print(isinstance(obj1, ClassName))  # True`,
    basicExample: {
      code: `class Counter:
    def __init__(self):
        self.count = 0
    def increment(self):
        self.count += 1

c1 = Counter()
c2 = Counter()

c1.increment()
c1.increment()
c2.increment()

print("Counter 1 value:", c1.count)
print("Counter 2 value:", c2.count)
print("Are c1 and c2 identical objects?", c1 is c2)`,
      output: `Counter 1 value: 2
Counter 2 value: 1
Are c1 and c2 identical objects? False`
    },
    detailedExample: {
      code: `class Device:
    def __init__(self, name, ip):
        self.name = name
        self.ip = ip

d1 = Device("Gateway-Router", "192.168.1.1")
d2 = Device("Dev-Server", "192.168.1.50")
d3 = d1 # Reference assignment (aliases the exact same object!)

print("d1 ID:", id(d1))
print("d2 ID:", id(d2))
print("d3 ID:", id(d3))
print("d1 is d3:", d1 is d3)
print("d1 is d2:", d1 is d2)

# Modifying through reference d3 affects d1
d3.name = "Core-Router-V2"
print("d1 name after modifying d3:", d1.name)`,
      output: `d1 ID: 140234
d2 ID: 140288
d3 ID: 140234
d1 is d3: True
d1 is d2: False
d1 name after modifying d3: Core-Router-V2`
    },
    codeExplanation: [
      'Line 7-8: `d1` and `d2` are two distinct object instances with unique memory IDs.',
      'Line 9: `d3 = d1` creates a new variable reference pointing to the SAME object in memory.',
      'Line 18: Modifying `d3.name` mutates the underlying object, visible via `d1.name`.'
    ],
    commonMistakes: [
      {
        mistake: 'Assuming `obj2 = obj1` clones the object.',
        whyItIsWrong: 'Variable assignment copies the reference, not the underlying object data.',
        correction: 'Use `copy.copy()` or `copy.deepcopy()` to create an independent clone.'
      },
      {
        mistake: 'Using `==` when checking if two variables reference the exact same memory instance.',
        whyItIsWrong: '`==` compares value equality; `is` checks memory identity.',
        correction: 'Use the `is` keyword to check object identity.'
      }
    ],
    importantRules: [
      'Each instantiated object has its own unique memory address returned by `id(obj)`.',
      'Variable assignment copies object references, not the object itself.',
      'Use `isinstance(obj, ClassName)` to check if an object belongs to a class.'
    ],
    interviewPerspective: 'Interviewers often test object reference semantics, shallow vs deep copying (`copy` module), and Python garbage collection (reference counting & cyclic GC).',
    practiceQuestions: [
      {
        question: 'Which built-in function checks if an object is an instance of a given class or tuple of classes?',
        solution: 'isinstance(object, classinfo)'
      },
      {
        question: 'What is the difference between `obj1 == obj2` and `obj1 is obj2`?',
        solution: '`==` checks value equality (via `__eq__`), while `is` checks whether both references point to the exact same memory address.'
      }
    ],
    checkpoint: [
      {
        id: 'm12-t2-q1',
        type: 'mcq',
        prompt: 'Which operator checks whether two variables point to the EXACT same object in computer memory?',
        options: ['==', 'is', 'equals()', '==='],
        correctAnswer: 1,
        explanation: 'The `is` keyword checks memory identity (`id(a) == id(b)`).'
      },
      {
        id: 'm12-t2-q2',
        type: 'output',
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `class Box:
    def __init__(self, val):
        self.val = val

b1 = Box(10)
b2 = Box(10)
print(b1 is b2)`,
        correctAnswer: 'False',
        explanation: '`b1` and `b2` are two distinct object instances created separately in memory.'
      }
    ]
  },

  'init-method': {
    id: 'init-method',
    moduleId: 'm12',
    topicNumber: 3,
    title: 'The __init__ Constructor & self',
    shortSummary: 'Initializing instance state, constructor parameters, and understanding self.',
    whatIsIt: 'The `__init__` method is Python\'s instance initializer (commonly referred to as the constructor). When a new object is created like `user = User("Swamy")`, Python automatically calls `__init__`, passing the newly created instance as the first argument (`self`).',
    whyDoWeNeedIt: '`__init__` ensures that an object is created with all required initial state and validation, eliminating the need to manually set attributes after creation.',
    syntax: `class User:
    def __init__(self, username, email, active=True):
        self.username = username
        self.email = email
        self.active = active
        self.created_at = "2026-09-20"`,
    basicExample: {
      code: `class Product:
    def __init__(self, name, price, stock=0):
        self.name = name
        self.price = price
        self.stock = stock

    def get_inventory_value(self):
        return self.price * self.stock

p1 = Product("Mechanical Keyboard", 120.00, 15)
p2 = Product("Wireless Mouse", 45.00, 30)

print(f"{p1.name} inventory: \${p1.get_inventory_value():.2f}")
print(f"{p2.name} inventory: \${p2.get_inventory_value():.2f}")`,
      output: `Mechanical Keyboard inventory: \$1800.00
Wireless Mouse inventory: \$1350.00`
    },
    detailedExample: {
      code: `class Student:
    def __init__(self, name, roll_no, marks_dict):
        # Validate input at instantiation time
        if not name or not isinstance(name, str):
            raise ValueError("Student name must be a non-empty string.")
        self.name = name
        self.roll_no = roll_no
        self.marks = marks_dict

    def calculate_average(self):
        if not self.marks:
            return 0.0
        return sum(self.marks.values()) / len(self.marks)

s = Student("Swamy", 101, {"Math": 95, "Physics": 92, "CS": 98})
print(f"Student: {s.name} (Roll #{s.roll_no})")
print(f"GPA Average: {s.calculate_average():.2f}")`,
      output: `Student: Swamy (Roll #101)
GPA Average: 95.00`
    },
    codeExplanation: [
      'Line 2: `__init__` receives constructor arguments upon instantiation.',
      'Line 4: Input validation protects against creating invalid object state.',
      'Line 6-8: Attributes attached to `self.attribute_name` become persistent properties of the instance.'
    ],
    commonMistakes: [
      {
        mistake: 'Trying to return a value from `__init__`: `return self.name`.',
        whyItIsWrong: '`__init__` MUST return `None`. Returning any non-None value raises `TypeError: __init__() should return None`.',
        correction: 'Never return values from `__init__`; only initialize attributes on `self`.'
      },
      {
        mistake: 'Typing `_init_` with single underscores instead of double underscores `__init__`.',
        whyItIsWrong: 'Python treats `_init_` as a normal method; it will NOT be called automatically when creating instances.',
        correction: 'Always use two leading and two trailing underscores: `__init__`.'
      }
    ],
    importantRules: [
      '`__init__` is automatically called upon instance creation.',
      '`__init__` must always return `None`.',
      '`self` represents the specific instance being initialized.'
    ],
    interviewPerspective: 'Interviewers often ask: "What is the difference between `__new__` and `__init__` in Python?" (`__new__` creates and returns the raw instance; `__init__` initializes its attributes).',
    practiceQuestions: [
      {
        question: 'What return type is mandated for the `__init__` method in Python?',
        solution: 'None (returning anything else raises a TypeError)'
      },
      {
        question: 'What is the role of `__new__` versus `__init__`?',
        solution: '`__new__` is the actual constructor that allocates the object in memory, while `__init__` is the initializer that sets up instance attributes.'
      }
    ],
    checkpoint: [
      {
        id: 'm12-t3-q1',
        type: 'mcq',
        prompt: 'What happens if you write `return "success"` inside an `__init__` method?',
        options: [
          'The constructor returns the string "success" instead of the instance',
          'Python raises a TypeError: __init__() should return None',
          'The string is stored in a special __return__ attribute',
          'The class definition fails at import time'
        ],
        correctAnswer: 1,
        explanation: '`__init__` is strictly required to return `None`; returning any other value causes a `TypeError`.'
      },
      {
        id: 'm12-t3-q2',
        type: 'output',
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `class Item:
    def __init__(self, price, tax=0.1):
        self.total = price + (price * tax)

item = Item(100)
print(int(item.total))`,
        correctAnswer: '110',
        explanation: '`100 + (100 * 0.1) = 110.0`, which casts to integer `110`.'
      }
    ]
  },

  'instance-attributes': {
    id: 'instance-attributes',
    moduleId: 'm12',
    topicNumber: 4,
    title: 'Instance Attributes',
    shortSummary: 'Object-specific data, __dict__ inspection, dynamic attribute addition, and encapsulation.',
    whatIsIt: 'Instance attributes are variables that belong exclusively to a specific object instance. They are usually defined inside `__init__` via `self.attribute = value` and are stored in the instance\'s internal `__dict__` mapping.',
    whyDoWeNeedIt: 'Instance attributes allow each object in your program to maintain its own unique state (e.g. user ID, account balance, current coordinate position).',
    syntax: `class User:
    def __init__(self, name):
        self.name = name  # Instance attribute

u1 = User("Alice")
u2 = User("Bob")
u1.name = "Alicia"  # Mutating u1 does NOT affect u2`,
    basicExample: {
      code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p1 = Point(3, 4)
p2 = Point(10, 20)

print(f"p1: ({p1.x}, {p1.y})")
print(f"p2: ({p2.x}, {p2.y})")
print("p1 internal dict:", p1.__dict__)`,
      output: `p1: (3, 4)
p2: (10, 20)
p1 internal dict: {'x': 3, 'y': 4}`
    },
    detailedExample: {
      code: `class Employee:
    def __init__(self, emp_id, name, base_salary):
        self.emp_id = emp_id
        self.name = name
        self.base_salary = base_salary
        self.bonus = 0.0

    def award_bonus(self, percentage):
        self.bonus = self.base_salary * (percentage / 100.0)

    def get_total_compensation(self):
        return self.base_salary + self.bonus

e1 = Employee(101, "Swamy", 80000)
e2 = Employee(102, "Sarah", 95000)

e1.award_bonus(15)  # Only e1 gets bonus!

print(f"{e1.name} Total: \${e1.get_total_compensation():.2f}")
print(f"{e2.name} Total: \${e2.get_total_compensation():.2f}")`,
      output: `Swamy Total: \$92000.00
Sarah Total: \$95000.00`
    },
    codeExplanation: [
      'Line 6: `self.bonus = 0.0` initializes instance attribute for each new employee.',
      'Line 9: `self.award_bonus` mutates only the caller instance\'s `bonus` attribute.',
      'Line 19: `e2.bonus` remains untouched at `0.0`.'
    ],
    commonMistakes: [
      {
        mistake: 'Trying to access an instance attribute via the class name: `Employee.emp_id`.',
        whyItIsWrong: 'Raises `AttributeError: type object \'Employee\' has no attribute \'emp_id\'` because instance attributes only exist on object instances.',
        correction: 'Access instance attributes on instance objects (`e1.emp_id`).'
      },
      {
        mistake: 'Dynamically adding attributes outside `__init__` in random places across the codebase.',
        whyItIsWrong: 'Makes code unpredictable and difficult to maintain because objects have inconsistent shapes.',
        correction: 'Always initialize all expected attributes inside `__init__` (even if set to `None`).'
      }
    ],
    importantRules: [
      'Instance attributes are stored in `instance.__dict__`.',
      'Mutations to one instance attribute never affect other instances.',
      'Always initialize instance attributes inside `__init__` for consistency.'
    ],
    interviewPerspective: 'Expect questions comparing memory footprint (`__dict__` vs `__slots__`) for high-scale Python applications with millions of object instances.',
    practiceQuestions: [
      {
        question: 'Where are instance attributes stored internally in standard Python objects?',
        solution: 'In the instance\'s `__dict__` dictionary attribute.'
      },
      {
        question: 'How can you prevent dynamic `__dict__` creation to save memory in Python classes with millions of instances?',
        solution: 'By defining `__slots__ = ("attr1", "attr2")` in the class.'
      }
    ],
    checkpoint: [
      {
        id: 'm12-t4-q1',
        type: 'output',
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `class Car:
    def __init__(self, brand):
        self.brand = brand

c1 = Car("Tesla")
c2 = Car("BMW")
c1.brand = "Lucid"
print(c1.brand, c2.brand)`,
        correctAnswer: 'Lucid BMW',
        explanation: '`c1.brand` and `c2.brand` are separate instance attributes; modifying `c1` does not affect `c2`.'
      },
      {
        id: 'm12-t4-q2',
        type: 'mcq',
        prompt: 'Which attribute provides access to an object\'s dictionary of instance variables?',
        options: ['__vars__', '__dict__', '__state__', '__slots__'],
        correctAnswer: 1,
        explanation: 'The `__dict__` attribute contains the dictionary of instance attributes for an object.'
      }
    ]
  },

  'class-attributes': {
    id: 'class-attributes',
    moduleId: 'm12',
    topicNumber: 5,
    title: 'Class Attributes vs Instance Attributes',
    shortSummary: 'Shared class-level state, class attribute mutation, shadowing, and best practices.',
    whatIsIt: 'A Class Attribute is a variable defined directly inside the class body outside of any methods. It is shared by ALL instances created from that class. In contrast, an Instance Attribute is tied to a single object instance.',
    whyDoWeNeedIt: 'Class attributes store shared constants, instance counters, configuration defaults, and shared lookup tables across all objects of that class type.',
    syntax: `class BankAccount:
    bank_name = "Global Apex Bank"  # Class attribute (shared by all accounts)
    interest_rate = 0.04           # Class attribute

    def __init__(self, owner, balance):
        self.owner = owner          # Instance attribute (unique per account)
        self.balance = balance      # Instance attribute`,
    basicExample: {
      code: `class User:
    total_users = 0  # Class attribute shared across all instances

    def __init__(self, username):
        self.username = username
        User.total_users += 1  # Increments shared class counter

u1 = User("Alice")
u2 = User("Bob")
u3 = User("Charlie")

print("User 1:", u1.username)
print("User 3:", u3.username)
print("Total Users Created (via class):", User.total_users)
print("Total Users Created (via u1):", u1.total_users)`,
      output: `User 1: Alice
User 3: Charlie
Total Users Created (via class): 3
Total Users Created (via u1): 3`
    },
    detailedExample: {
      code: `# The Class Attribute Shadowing Trap:
class ServiceConfig:
    timeout = 30  # Class attribute

s1 = ServiceConfig()
s2 = ServiceConfig()

print("Initial timeouts -> s1:", s1.timeout, "s2:", s2.timeout, "Class:", ServiceConfig.timeout)

# Modifying class attribute via class name updates all instances:
ServiceConfig.timeout = 45
print("After class update -> s1:", s1.timeout, "s2:", s2.timeout)

# DANGER: Modifying via instance CREATES an instance attribute SHADOWING the class attribute!
s1.timeout = 60
print("\\nAfter s1.timeout = 60:")
print("s1:", s1.timeout, "(instance attribute created in s1.__dict__)")
print("s2:", s2.timeout, "(still points to class attribute)")
print("Class:", ServiceConfig.timeout)`,
      output: `Initial timeouts -> s1: 30 s2: 30 Class: 30
After class update -> s1: 45 s2: 45

After s1.timeout = 60:
s1: 60 (instance attribute created in s1.__dict__)
s2: 45 (still points to class attribute)
Class: 45`
    },
    codeExplanation: [
      'Line 2: `timeout = 30` is a class attribute shared across all instances.',
      'Line 10: Changing `ServiceConfig.timeout = 45` affects all instances that do not have their own `timeout` attribute.',
      'Line 14: `s1.timeout = 60` does NOT change the class attribute; it creates a new instance attribute on `s1` that shadows the class attribute.'
    ],
    commonMistakes: [
      {
        mistake: 'Using a mutable object as a class attribute: `class Student: grades = []`.',
        whyItIsWrong: 'All student instances share the exact same list; adding a grade to student 1 adds it to every student in the system!',
        correction: 'Initialize mutable lists and dicts inside `__init__` as instance attributes: `self.grades = []`.'
      },
      {
        mistake: 'Modifying class variables through `self.class_var = new_val` thinking it updates all instances.',
        whyItIsWrong: 'It creates a local instance variable shadowing the class variable.',
        correction: 'Mutate class attributes via the class name directly: `ClassName.class_var = new_val`.'
      }
    ],
    importantRules: [
      'Class attributes are defined directly in the class body; instance attributes are bound to `self`.',
      'Mutate class attributes using `ClassName.attr = val` to affect all instances.',
      'Never use mutable default collections (lists, dicts) as class attributes unless intended as a global cache.'
    ],
    interviewPerspective: 'This is one of the most frequently asked Python OOP interview topics. Interviewers check if you understand attribute lookup order (`instance.__dict__` -> `Class.__dict__` -> Base classes).'
    ,
    practiceQuestions: [
      {
        question: 'What happens when you execute `instance.class_attr = 50` where `class_attr` was originally a class attribute?',
        solution: 'It creates a new instance attribute named `class_attr` on `instance`, shadowing the class attribute for that instance without modifying the class attribute for other instances.'
      },
      {
        question: 'Why should mutable collections like lists rarely be used as class attributes?',
        solution: 'Because all instances share the exact same list in memory, causing unexpected side effects across instances.'
      }
    ],
    checkpoint: [
      {
        id: 'm12-t5-q1',
        type: 'output',
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `class Team:
    members = []

t1 = Team()
t2 = Team()
t1.members.append("Alice")
print(t2.members)`,
        correctAnswer: "['Alice']",
        explanation: '`members` is a mutable class attribute shared by all instances, so mutating it via `t1` affects `t2`.'
      },
      {
        id: 'm12-t5-q2',
        type: 'mcq',
        prompt: 'How should you update a class attribute so that the change is reflected across all instances that have not shadowed it?',
        options: [
          'self.attribute_name = new_value',
          'ClassName.attribute_name = new_value',
          'update(attribute_name, new_value)',
          'super().attribute_name = new_value'
        ],
        correctAnswer: 1,
        explanation: 'Modifying the attribute via `ClassName.attribute_name = new_value` updates the shared class attribute.'
      }
    ]
  },

  // =========================================================================
  // MODULE 13: Object-Oriented Programming II (4 Topics)
  // =========================================================================
  'inheritance': {
    id: 'inheritance',
    moduleId: 'm13',
    topicNumber: 1,
    title: 'Inheritance & super()',
    shortSummary: 'Parent/child classes, method overriding, super() delegation, and inheritance hierarchies.',
    whatIsIt: 'Inheritance is a fundamental OOP principle where a child class (derived class) inherits attributes and methods from a parent class (base class). Python supports Single, Multiple, and Multilevel inheritance along with `super()` to delegate method execution to parent classes.',
    whyDoWeNeedIt: 'Inheritance promotes code reuse (DRY - Don\'t Repeat Yourself), models "is-a" relationships (e.g., `Dog` is an `Animal`, `Manager` is an `Employee`), and allows extensible system design.',
    syntax: `class BaseClass:
    def __init__(self, name):
        self.name = name

class DerivedClass(BaseClass):
    def __init__(self, name, extra_feature):
        super().__init__(name)  # Delegate to parent constructor
        self.extra = extra_feature`,
    basicExample: {
      code: `class Vehicle:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    def get_specs(self):
        return f"{self.brand} {self.model}"

class ElectricCar(Vehicle):
    def __init__(self, brand, model, battery_kwh):
        super().__init__(brand, model)
        self.battery_kwh = battery_kwh

    def get_specs(self):  # Method overriding
        return f"{super().get_specs()} ({self.battery_kwh} kWh Battery)"

tesla = ElectricCar("Tesla", "Model S", 100)
print(tesla.get_specs())`,
      output: `Tesla Model S (100 kWh Battery)`
    },
    detailedExample: {
      code: `# Multi-level inheritance & Method Resolution Order (MRO)
class User:
    def __init__(self, email):
        self.email = email
    def get_permissions(self):
        return ["read"]

class Staff(User):
    def get_permissions(self):
        return super().get_permissions() + ["write", "edit"]

class Admin(Staff):
    def get_permissions(self):
        return super().get_permissions() + ["delete", "manage_users"]

admin = Admin("admin@levelup.dev")
print("Admin Permissions:", admin.get_permissions())
print("Admin MRO:", [cls.__name__ for cls in Admin.mro()])`,
      output: `Admin Permissions: ['read', 'write', 'edit', 'delete', 'manage_users']
Admin MRO: ['Admin', 'Staff', 'User', 'object']`
    },
    codeExplanation: [
      'Line 7, 11: `super().get_permissions()` chains method calls up the inheritance tree.',
      'Line 15: `Admin.mro()` returns the C3 Linearization Method Resolution Order used by Python to search for methods.'
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting to call `super().__init__(...)` in child class `__init__`.',
        whyItIsWrong: 'Parent attributes are never initialized, causing `AttributeError` when accessing parent variables.',
        correction: 'Always call `super().__init__(...)` when extending parent initializers.'
      },
      {
        mistake: 'Overusing deep inheritance trees when composition ("has-a") is cleaner.',
        whyItIsWrong: 'Leads to tight coupling, fragile base class problems, and confusing MRO resolution.',
        correction: 'Prefer composition over inheritance where appropriate.'
      }
    ],
    importantRules: [
      'Use `super().__init__()` to initialize parent class state.',
      'Method overriding occurs when a child class defines a method with the exact same name as its parent.',
      'Check inheritance hierarchy with `issubclass(Child, Parent)` and method search order with `ClassName.mro()`.'
    ],
    interviewPerspective: 'In technical interviews, you will be tested on Multiple Inheritance and the Diamond Problem resolved by Python\'s C3 Linearization algorithm (`__mro__`).',
    practiceQuestions: [
      {
        question: 'Which built-in function returns the Method Resolution Order list for a class?',
        solution: 'ClassName.mro() or ClassName.__mro__'
      },
      {
        question: 'What is the purpose of calling `super().__init__()` in a subclass?',
        solution: 'To execute the parent class constructor and ensure all base class attributes are properly initialized.'
      }
    ],
    checkpoint: [
      {
        id: 'm13-t1-q1',
        type: 'output',
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `class A:
    def ping(self): return "A"

class B(A):
    def ping(self): return super().ping() + "B"

class C(B):
    def ping(self): return super().ping() + "C"

print(C().ping())`,
        correctAnswer: 'ABC',
        explanation: '`C().ping()` chains calls to `B.ping()` and `A.ping()`, concatenating "A" + "B" + "C" = "ABC".'
      },
      {
        id: 'm13-t1-q2',
        type: 'mcq',
        prompt: 'Which built-in function checks if a class is a subclass of another class in Python?',
        options: ['isinstance()', 'issubclass()', 'hasparent()', 'is_child_of()'],
        correctAnswer: 1,
        explanation: '`issubclass(SubClass, ParentClass)` returns True if `SubClass` is derived from `ParentClass`.'
      }
    ]
  },

  'polymorphism': {
    id: 'polymorphism',
    moduleId: 'm13',
    topicNumber: 2,
    title: 'Polymorphism & Duck Typing',
    shortSummary: 'Uniform interfaces, method overriding, duck typing, and dynamic dispatch.',
    whatIsIt: 'Polymorphism ("many forms") is the ability to treat different objects through a common interface. Python implements dynamic polymorphism through Duck Typing ("If it walks like a duck and quacks like a duck, it\'s a duck"), where an object\'s suitability is determined by the presence of specific methods and properties rather than its explicit class hierarchy.',
    whyDoWeNeedIt: 'Polymorphism allows you to write generic, loosely coupled functions that can operate on any object that adheres to a required protocol (such as iterables, file-like objects, or database drivers).',
    syntax: `def render_shape(shape):
    # Works for ANY class that implements .area() and .draw()
    print(f"Area: {shape.area()}")
    shape.draw()`,
    basicExample: {
      code: `class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h
    def area(self):
        return self.w * self.h

class Circle:
    def __init__(self, r):
        self.r = r
    def area(self):
        return 3.14159 * (self.r ** 2)

shapes = [Rectangle(10, 5), Circle(7), Rectangle(4, 4)]
for s in shapes:
    print(f"Shape: {s.__class__.__name__:<10} | Area: {s.area():.2f}")`,
      output: `Shape: Rectangle  | Area: 50.00
Shape: Circle     | Area: 153.94
Shape: Rectangle  | Area: 16.00`
    },
    detailedExample: {
      code: `# Duck Typing in Action: Custom Notification Channels
class EmailNotifier:
    def send(self, recipient, msg):
        return f"Email sent to {recipient}: '{msg}'"

class SMSNotifier:
    def send(self, recipient, msg):
        return f"SMS sent to {recipient}: '{msg}'"

class SlackNotifier:
    def send(self, recipient, msg):
        return f"Slack notification posted to #{recipient}: '{msg}'"

def broadcast_alert(notifiers, recipient, message):
    results = []
    for n in notifiers:
        # Python doesn't care about their inheritance, only that they have .send()!
        results.append(n.send(recipient, message))
    return results

channels = [EmailNotifier(), SMSNotifier(), SlackNotifier()]
alerts = broadcast_alert(channels, "dev-team", "Deployment Successful!")
for a in alerts:
    print(a)`,
      output: `Email sent to dev-team: 'Deployment Successful!'
SMS sent to dev-team: 'Deployment Successful!'
Slack notification posted to #dev-team: 'Deployment Successful!'`
    },
    codeExplanation: [
      'Line 13: `broadcast_alert` accepts any iterable of objects as long as each object implements a `.send(recipient, msg)` method.',
      'Line 16: Dynamic dispatch resolves the appropriate method implementation at runtime.'
    ],
    commonMistakes: [
      {
        mistake: 'Using rigid `type(obj) == SpecificClass` checks instead of relying on duck typing or `isinstance()`.',
        whyItIsWrong: 'Breaks polymorphism and prevents passing valid subclasses or compatible objects.',
        correction: 'Rely on duck typing (EAFP - Easier to Ask for Forgiveness than Permission) or `isinstance()`.'
      },
      {
        mistake: 'Inconsistent method signatures across polymorphic classes (e.g. one class taking 1 arg, another taking 3).',
        whyItIsWrong: 'Throws `TypeError` when called uniformly.',
        correction: 'Maintain uniform parameter signatures across polymorphic interface methods.'
      }
    ],
    importantRules: [
      'Duck typing prioritizes object behavior (methods) over explicit type checks.',
      'Polymorphism allows distinct classes to share identical method signatures with custom implementations.',
      'Python uses dynamic dispatch to resolve method calls at runtime.'
    ],
    interviewPerspective: 'Interviewers often ask: "Explain Duck Typing in Python and how it differs from statically typed languages like Java or C++."',
    practiceQuestions: [
      {
        question: 'What Python philosophy is summarized by "If it walks like a duck and quacks like a duck, it\'s a duck"?',
        solution: 'Duck Typing (focusing on object methods and behavior rather than explicit class type)'
      },
      {
        question: 'How does EAFP relate to duck typing in Python?',
        solution: 'EAFP ("Easier to Ask for Forgiveness than Permission") encourages executing methods directly inside try-except blocks rather than doing defensive type-checking.'
      }
    ],
    checkpoint: [
      {
        id: 'm13-t2-q1',
        type: 'mcq',
        prompt: 'What is "Duck Typing" in Python?',
        options: [
          'A typing module that allows birds to be modeled in OOP',
          'Determining whether an object can be used based on the presence of specific methods rather than its explicit class hierarchy',
          'A compile-time type checking system',
          'An algorithm to convert Python code to C++'
        ],
        correctAnswer: 1,
        explanation: 'Duck typing means Python checks whether an object supports required behavior (methods) at runtime.'
      },
      {
        id: 'm13-t2-q2',
        type: 'output',
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `class Cat:
    def sound(self): return "Meow"
class Dog:
    def sound(self): return "Woof"

def make_sound(animal):
    return animal.sound()

print(make_sound(Cat()), make_sound(Dog()))`,
        correctAnswer: 'Meow Woof',
        explanation: 'Polymorphic dispatch calls the respective `sound()` implementation for both `Cat` and `Dog`.'
      }
    ]
  },

  'encapsulation': {
    id: 'encapsulation',
    moduleId: 'm13',
    topicNumber: 3,
    title: 'Encapsulation & Private Attributes',
    shortSummary: 'Public attributes, protected convention (_var), private name mangling (__var), and @property.',
    whatIsIt: 'Encapsulation is the OOP mechanism of bundling data and methods together while restricting direct external access to internal state. In Python, encapsulation is achieved through naming conventions: public (`var`), protected (`_var`), private with name mangling (`__var`), and the `@property` decorator for managed getters/setters.',
    whyDoWeNeedIt: 'Encapsulation prevents unauthorized state modification, validates data before setting, hides implementation complexity, and allows internal refactoring without breaking public API contracts.',
    syntax: `class BankAccount:
    def __init__(self, balance):
        self._protected = "internal convention"
        self.__balance = balance  # Private (name-mangled to _BankAccount__balance)

    @property
    def balance(self):
        """Getter for managed access"""
        return self.__balance

    @balance.setter
    def balance(self, value):
        """Setter with validation"""
        if value < 0:
            raise ValueError("Balance cannot be negative")
        self.__balance = value`,
    basicExample: {
      code: `class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.__salary = salary  # Private attribute

    def get_salary(self):
        return self.__salary

    def set_salary(self, amount):
        if amount > 0:
            self.__salary = amount

emp = Employee("Swamy", 75000)
print("Public name:", emp.name)
print("Salary via getter:", emp.get_salary())

# Trying to access private __salary directly:
try:
    print(emp.__salary)
except AttributeError as err:
    print("Direct private access failed:", err)`,
      output: `Public name: Swamy
Salary via getter: 75000
Direct private access failed: 'Employee' object has no attribute '__salary'`
    },
    detailedExample: {
      code: `# Professional Encapsulation using @property and @setter
class TemperatureSensor:
    def __init__(self, celsius=0.0):
        self._celsius = celsius  # Protected backing variable

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero is impossible!")
        self._celsius = value

    @property
    def fahrenheit(self):
        # Computed property (read-only)
        return (self._celsius * 9 / 5) + 32

sensor = TemperatureSensor(25.0)
print(f"Reading: {sensor.celsius}°C | {sensor.fahrenheit}°F")

sensor.celsius = 100.0  # Uses setter validation
print(f"Boiling: {sensor.celsius}°C | {sensor.fahrenheit}°F")`,
      output: `Reading: 25.0°C | 77.0°F
Boiling: 100.0°C | 212.0°F`
    },
    codeExplanation: [
      'Line 6: `@property` turns the `celsius` method into a getter accessed like a normal attribute.',
      'Line 10: `@celsius.setter` enforces validation logic whenever `sensor.celsius = val` is executed.',
      'Line 16: `fahrenheit` is a computed read-only property without a setter.'
    ],
    commonMistakes: [
      {
        mistake: 'Believing double-underscore `__var` makes an attribute truly private and security-hardened.',
        whyItIsWrong: 'Python performs name mangling: `__var` is simply renamed to `_ClassName__var` and is still accessible in memory.',
        correction: 'Use `__var` to prevent accidental subclass overriding, and `@property` for clean validation APIs.'
      },
      {
        mistake: 'Forgetting the `@property` getter before defining the `@prop.setter`.',
        whyItIsWrong: 'The setter decorator is created by the property object; writing `@val.setter` before `@property` raises `NameError`.',
        correction: 'Always define the `@property` getter method first.'
      }
    ],
    importantRules: [
      'Single leading underscore `_var` indicates an internal/protected attribute by convention.',
      'Double leading underscore `__var` triggers name mangling to `_ClassName__var`.',
      'Use `@property` and `@prop.setter` for Pythonic getters and setters.'
    ],
    interviewPerspective: 'Expect deep-dive questions on Python name mangling mechanics and how `@property` uses the Descriptor protocol (`__get__`, `__set__`).',
    practiceQuestions: [
      {
        question: 'What is name mangling in Python?',
        solution: 'Python automatically transforms identifiers with two leading underscores like `__var` inside a class `MyClass` to `_MyClass__var` to avoid namespace collisions in subclasses.'
      },
      {
        question: 'Which decorator is used to define a getter property in Python?',
        solution: '@property'
      }
    ],
    checkpoint: [
      {
        id: 'm13-t3-q1',
        type: 'output',
        prompt: 'What will be printed when inspecting the mangled name of `__secret` on an instance of class `Vault`?',
        codeSnippet: `class Vault:
    def __init__(self):
        self.__secret = 42

v = Vault()
print(getattr(v, "_Vault__secret"))`,
        correctAnswer: '42',
        explanation: 'Python mangles double underscore `__secret` on class `Vault` to `_Vault__secret`.'
      },
      {
        id: 'm13-t3-q2',
        type: 'mcq',
        prompt: 'Which naming convention in Python signals to other developers that an attribute is protected/internal for use within the class and its subclasses?',
        options: ['__var__', '_var', 'var$', 'private_var'],
        correctAnswer: 1,
        explanation: 'A single leading underscore `_var` is the standard Python convention for protected/internal attributes.'
      }
    ]
  },

  'magic-dunder-methods': {
    id: 'magic-dunder-methods',
    moduleId: 'm13',
    topicNumber: 4,
    title: 'Magic / Dunder Methods',
    shortSummary: 'Operator overloading, __str__, __repr__, __len__, __eq__, __add__, and rich comparisons.',
    whatIsIt: 'Dunder methods ("Double Underscore" methods, or magic methods) are special built-in hooks in Python prefixed and suffixed with double underscores (e.g. `__str__`, `__len__`, `__add__`). They allow custom classes to integrate seamlessly with Python\'s built-in functions and operators.',
    whyDoWeNeedIt: 'Dunder methods enable Operator Overloading (e.g. using `+`, `<`, `len()`, `print()`, `in` on custom objects), making your classes feel like first-class native Python types.',
    syntax: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    def __len__(self):
        return int((self.x**2 + self.y**2)**0.5)

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y`,
    basicExample: {
      code: `class Point2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Point2D(x={self.x}, y={self.y})"

    def __add__(self, other):
        return Point2D(self.x + other.x, self.y + other.y)

    def __eq__(self, other):
        if not isinstance(other, Point2D):
            return False
        return self.x == other.x and self.y == other.y

p1 = Point2D(2, 3)
p2 = Point2D(5, 7)
p3 = p1 + p2

print("p1 + p2 =", p3)
print("p1 == Point2D(2, 3):", p1 == Point2D(2, 3))
print("p1 == p2:", p1 == p2)`,
      output: `p1 + p2 = Point2D(x=7, y=10)
p1 == Point2D(2, 3): True
p1 == p2: False`
    },
    detailedExample: {
      code: `# Complete Shopping Cart with __len__, __getitem__, __str__, and __contains__
class ShoppingCart:
    def __init__(self):
        self._items = []

    def add(self, item, price):
        self._items.append({"item": item, "price": price})

    def __len__(self):
        return len(self._items)

    def __getitem__(self, index):
        return self._items[index]

    def __contains__(self, item_name):
        return any(i["item"] == item_name for i in self._items)

    def __str__(self):
        total = sum(i["price"] for i in self._items)
        return f"Cart({len(self)} items, Total: \${total:.2f})"

cart = ShoppingCart()
cart.add("Laptop", 1200.00)
cart.add("Headphones", 150.00)

print(cart)
print("Cart item count (len):", len(cart))
print("First item ([0]):", cart[0]["item"])
print("Is Laptop in cart?", "Laptop" in cart)
print("Is Keyboard in cart?", "Keyboard" in cart)`,
      output: `Cart(2 items, Total: \$1350.00)
Cart item count (len): 2
First item ([0]): Laptop
Is Laptop in cart? True
Is Keyboard in cart? False`
    },
    codeExplanation: [
      'Line 9: `__len__` enables `len(cart)`.',
      'Line 12: `__getitem__` enables square bracket indexing `cart[0]`.',
      'Line 15: `__contains__` enables the `in` membership operator (`"Laptop" in cart`).',
      'Line 18: `__str__` returns the human-readable string representation used by `print()`.'
    ],
    commonMistakes: [
      {
        mistake: 'Returning non-string objects from `__str__` or `__repr__`.',
        whyItIsWrong: 'Raises `TypeError: __str__ returned non-string (type int/dict)`.',
        correction: 'Always return a `str` from `__str__` and `__repr__`.'
      },
      {
        mistake: 'Confusing `__str__` (user-facing readable display) with `__repr__` (unambiguous developer representation).',
        whyItIsWrong: 'Makes debugging in REPLs and logs ambiguous.',
        correction: 'Implement `__repr__` first (e.g. `ClassName(args)`); add `__str__` when user-friendly display differs.'
      }
    ],
    importantRules: [
      '`__str__` is intended for readable user presentation (`str(obj)`, `print(obj)`).',
      '`__repr__` is intended for unambiguous developer debugging representation.',
      '`__eq__` overloads `==`, `__add__` overloads `+`, `__len__` overloads `len()`, `__getitem__` overloads `[]`.'
    ],
    interviewPerspective: 'Interviewers frequently test the difference between `__str__` and `__repr__` (fallback behavior: if `__str__` is missing, Python uses `__repr__`).',
    practiceQuestions: [
      {
        question: 'Which dunder method is invoked when the built-in `len(obj)` function is called?',
        solution: '__len__'
      },
      {
        question: 'If a class implements `__repr__` but not `__str__`, what does `print(obj)` output?',
        solution: 'It falls back to calling `__repr__`.'
      }
    ],
    checkpoint: [
      {
        id: 'm13-t4-q1',
        type: 'output',
        prompt: 'What will be the output of this Python code snippet?',
        codeSnippet: `class Word:
    def __init__(self, text): self.text = text
    def __len__(self): return len(self.text)
    def __add__(self, other): return Word(self.text + " " + other.text)
    def __str__(self): return self.text

w1 = Word("LevelUp")
w2 = Word("Dev")
w3 = w1 + w2
print(str(w3), len(w3))`,
        correctAnswer: 'LevelUp Dev 11',
        explanation: '`w1 + w2` calls `__add__` producing Word("LevelUp Dev") with string representation "LevelUp Dev" and length 11.'
      },
      {
        id: 'm13-t4-q2',
        type: 'mcq',
        prompt: 'Which dunder method must you implement to enable the `in` membership test operator (`item in custom_container`)?',
        options: ['__includes__', '__contains__', '__has__', '__in__'],
        correctAnswer: 1,
        explanation: '`__contains__(self, item)` powers the `in` operator in Python.'
      }
    ]
  },

  // =========================================================================
  // MODULE 14: Comprehensions, Iterators & Generators (6 Topics)
  // =========================================================================
  'list-comprehensions': {
    id: 'list-comprehensions',
    moduleId: 'm14',
    topicNumber: 1,
    title: 'List Comprehensions',
    shortSummary: 'Concise sequence transformation, conditional filtering, and nested list flattening.',
    whatIsIt: 'A List Comprehension is a concise, expressive syntax for creating new lists by transforming and filtering elements from an existing iterable in a single readable line.',
    whyDoWeNeedIt: 'List comprehensions are faster (optimized in C bytecode) and significantly more readable than equivalent multi-line `for` loops with `.append()` calls.',
    syntax: `# Basic Syntax:
# [expression for item in iterable]

# With Filtering Condition:
# [expression for item in iterable if condition]

# With If-Else Transformation:
# [true_expr if condition else false_expr for item in iterable]

# Nested Comprehension (Flattening):
# [item for sublist in matrix for item in sublist]`,
    basicExample: {
      code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 1. Transform: squares of all numbers
squares = [x ** 2 for x in numbers]

# 2. Filter: even numbers only
evens = [x for x in numbers if x % 2 == 0]

# 3. Transform with If-Else label
labels = ["EVEN" if x % 2 == 0 else "ODD" for x in numbers[:5]]

print("Squares:", squares[:5])
print("Evens:", evens)
print("Labels:", labels)`,
      output: `Squares: [1, 4, 9, 16, 25]
Evens: [2, 4, 6, 8, 10]
Labels: ['ODD', 'EVEN', 'ODD', 'EVEN', 'ODD']`
    },
    detailedExample: {
      code: `# Real-world data processing: Extracting & normalizing log tokens
raw_logs = [
    "  USER_LOGIN: swamy  ",
    "  PAGE_VIEW: /skills ",
    "",
    "  USER_LOGIN: ananya ",
    "  PAGE_VIEW: /home   "
]

# Clean, filter empty lines, and extract user logins
active_logins = [
    line.strip().split(": ")[1]
    for line in raw_logs
    if line.strip().startswith("USER_LOGIN:")
]

# Nested matrix transpose (flattening a 2D grid)
grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [val for row in grid for val in row]

print("Extracted Logins:", active_logins)
print("Flattened Matrix:", flattened)`,
      output: `Extracted Logins: ['swamy', 'ananya']
Flattened Matrix: [1, 2, 3, 4, 5, 6, 7, 8, 9]`
    },
    codeExplanation: [
      'Line 11-15: Filters empty lines and parses user logins in a declarative one-liner.',
      'Line 18: `[val for row in grid for val in row]` unrolls nested loops in the same order as standard indented `for` loops.'
    ],
    commonMistakes: [
      {
        mistake: 'Putting the `if-else` ternary operator at the end: `[x for x in nums if x % 2 == 0 else 0]`.',
        whyItIsWrong: 'Raises `SyntaxError`. Trailing `if` is for filtering; if-else ternary expression MUST go before `for`.',
        correction: 'Use `[x if x % 2 == 0 else 0 for x in nums]`.'
      },
      {
        mistake: 'Writing overly dense 4-level nested comprehensions.',
        whyItIsWrong: 'Violates "Readability counts" (The Zen of Python), making code unmaintainable.',
        correction: 'If a comprehension spans multiple lines with multiple conditions, refactor into a standard `for` loop or helper function.'
      }
    ],
    importantRules: [
      'Filtering `if` goes at the end: `[expr for x in seq if cond]`.',
      'Ternary `if-else` goes at the start: `[a if cond else b for x in seq]`.',
      'Comprehensions construct the entire list in memory immediately (eager evaluation).'
    ],
    interviewPerspective: 'In interviews, transforming, filtering, and flattening matrix grids using list comprehensions is an expected fundamental skill.',
    practiceQuestions: [
      {
        question: 'Write a list comprehension that extracts all words with length > 3 from `["a", "cat", "elephant", "dog", "python"]`.',
        solution: '[w for w in words if len(w) > 3]'
      },
      {
        question: 'Where does the if-else expression go in a list comprehension when providing a fallback value for failed conditions?',
        solution: 'At the beginning, before the `for` keyword (e.g. `[x if cond else y for x in seq]`).'
      }
    ],
    checkpoint: [
      {
        id: 'm14-t1-q1',
        type: 'output',
        prompt: 'What will be the output of this Python code snippet?',
        codeSnippet: `matrix = [[1, 2], [3, 4]]
flat_evens = [x for row in matrix for x in row if x % 2 == 0]
print(flat_evens)`,
        correctAnswer: '[2, 4]',
        explanation: 'The nested comprehension flattens `[1, 2, 3, 4]` and filters to keep only even numbers `[2, 4]`.'
      },
      {
        id: 'm14-t1-q2',
        type: 'mcq',
        prompt: 'Which syntax correctly uses an `if-else` condition to replace odd numbers with 0 in a list comprehension?',
        options: [
          '[x for x in nums if x % 2 == 0 else 0]',
          '[x if x % 2 == 0 else 0 for x in nums]',
          '[if x % 2 == 0: x else: 0 for x in nums]',
          '[x for x in nums (x % 2 == 0 ? x : 0)]'
        ],
        correctAnswer: 1,
        explanation: 'Ternary expressions `val if cond else fallback` must be placed before the `for` clause.'
      }
    ]
  },

  'dictionary-comprehensions': {
    id: 'dictionary-comprehensions',
    moduleId: 'm14',
    topicNumber: 2,
    title: 'Dictionary Comprehensions',
    shortSummary: 'Constructing and transforming dictionaries with {key_expr: val_expr for ...}.',
    whatIsIt: 'A Dictionary Comprehension is an elegant syntax for constructing new dictionaries by iterating over an iterable, evaluating key-value pair expressions, and optionally filtering items with conditional clauses.',
    whyDoWeNeedIt: 'Dictionary comprehensions allow transforming mappings, inverting keys and values, indexing lists by ID, and filtering dictionary items without verbose dictionary population loops.',
    syntax: `# Basic Syntax:
# {key_expr: value_expr for item in iterable}

# With Filtering:
# {key_expr: value_expr for item in iterable if condition}`,
    basicExample: {
      code: `users = [("u1", "Swamy"), ("u2", "Ananya"), ("u3", "Kiran")]

# 1. List of tuples to dictionary
user_map = {uid: name for uid, name in users}
print("User Map:", user_map)

# 2. Key-value computation: number -> square
squares = {n: n**2 for n in range(1, 6)}
print("Squares Dict:", squares)`,
      output: `User Map: {'u1': 'Swamy', 'u2': 'Ananya', 'u3': 'Kiran'}
Squares Dict: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}`
    },
    detailedExample: {
      code: `scores = {
    "Swamy": 94,
    "Alex": 65,
    "Sarah": 88,
    "Kiran": 42,
    "Divya": 91
}

# 1. Filter high scorers (>= 80) and normalize scores
distinction_students = {
    name.upper(): score
    for name, score in scores.items()
    if score >= 80
}

# 2. Invert a dictionary (Swap Keys and Values)
code_to_status = {200: "OK", 404: "Not Found", 500: "Internal Error"}
status_to_code = {status: code for code, status in code_to_status.items()}

print("Distinction Students:", distinction_students)
print("Inverted Status Map:", status_to_code)`,
      output: `Distinction Students: {'SWAMY': 94, 'SARAH': 88, 'DIVYA': 91}
Inverted Status Map: {'OK': 200, 'Not Found': 404, 'Internal Error': 500}`
    },
    codeExplanation: [
      'Line 10: `name.upper(): score` constructs the new key-value pair from filtered entries.',
      'Line 17: `{status: code for code, status in ...}` swaps keys and values in O(N) time.'
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting `.items()` when iterating over a dictionary: `{k: v for k, v in dict_obj}`.',
        whyItIsWrong: 'Iterating directly over a dict yields only keys, causing `ValueError: not enough values to unpack`.',
        correction: 'Always use `.items()` when you need both keys and values: `{k: v for k, v in dict_obj.items()}`.'
      },
      {
        mistake: 'Inverting a dictionary that contains duplicate values without handling collisions.',
        whyItIsWrong: 'Duplicate values will overwrite previous keys, resulting in lost data.',
        correction: 'Group duplicate keys into lists using `collections.defaultdict` if values are not unique.'
      }
    ],
    importantRules: [
      'Dictionary comprehensions use curly braces `{key: value for ...}`.',
      'Always call `.items()` when iterating over key-value pairs of an existing dictionary.',
      'Dictionary keys must be hashable immutable types (strings, numbers, tuples).'
    ],
    interviewPerspective: 'A classic interview question: "Invert a dictionary in one line" (`{v: k for k, v in d.items()}`).',
    practiceQuestions: [
      {
        question: 'Write a dict comprehension that squares the numbers from 1 to 5 as values with their string representations as keys.',
        solution: '{str(x): x**2 for x in range(1, 6)}'
      },
      {
        question: 'How do you swap keys and values in a dictionary `d` using a dictionary comprehension?',
        solution: '{v: k for k, v in d.items()}'
      }
    ],
    checkpoint: [
      {
        id: 'm14-t2-q1',
        type: 'output',
        prompt: 'What will be the output of this Python code snippet?',
        codeSnippet: `words = ["cat", "elephant", "dog"]
len_map = {w: len(w) for w in words if len(w) <= 3}
print(len_map)`,
        correctAnswer: "{'cat': 3, 'dog': 3}",
        explanation: 'Filters words with length <= 3 ("cat" and "dog") and maps word -> length.'
      },
      {
        id: 'm14-t2-q2',
        type: 'mcq',
        prompt: 'What happens if you run `{v: k for k, v in {"a": 1, "b": 1}.items()}`?',
        options: [
          'A ValueError is raised due to duplicate keys',
          'A dictionary with one entry `{1: "b"}` is produced because duplicate keys overwrite previous values',
          'Both keys are converted into a tuple `{1: ("a", "b")}`',
          'The program enters an infinite loop'
        ],
        correctAnswer: 1,
        explanation: 'Dictionary keys are unique; when key 1 is inserted a second time with value "b", it overwrites "a".'
      }
    ]
  },

  'set-comprehensions': {
    id: 'set-comprehensions',
    moduleId: 'm14',
    topicNumber: 3,
    title: 'Set Comprehensions',
    shortSummary: 'Generating unique deduplicated sets with {expression for ...}.',
    whatIsIt: 'A Set Comprehension constructs a new `set` by evaluating an expression over an iterable, automatically discarding duplicate elements and providing O(1) membership lookup efficiency.',
    whyDoWeNeedIt: 'Set comprehensions make deduplicating, filtering, and normalizing collections (like extracting unique email domains, unique tags, or distinct status codes) clean and concise.',
    syntax: `# Set Comprehension Syntax:
# {expression for item in iterable if condition}

# Note: Curly braces without a colon produce a Set (with a colon produces a Dict)`,
    basicExample: {
      code: `numbers = [1, 2, 2, 3, 4, 4, 4, 5, 1, 6]

# Set comprehension removes all duplicates automatically
unique_squares = {x ** 2 for x in numbers}

print("Original length:", len(numbers))
print("Unique squares set:", sorted(list(unique_squares)))`,
      output: `Original length: 10
Unique squares set: [1, 4, 9, 16, 25, 36]`
    },
    detailedExample: {
      code: `emails = [
    "swamy@gmail.com",
    "alex@yahoo.com",
    "admin@levelup.dev",
    "kiran@gmail.com",
    "sarah@levelup.dev",
    "support@gmail.com"
]

# Extract unique email provider domains
domains = {email.split("@")[1].lower() for email in emails if "@" in email}

print("Unique Domains Found:", sorted(list(domains)))`,
      output: `Unique Domains Found: ['gmail.com', 'levelup.dev', 'yahoo.com']`
    },
    codeExplanation: [
      'Line 11: `email.split("@")[1].lower()` extracts the domain part.',
      'Line 11: The `{...}` set comprehension automatically deduplicates repeated `"gmail.com"` and `"levelup.dev"` entries.'
    ],
    commonMistakes: [
      {
        mistake: 'Confusing empty set literal `{}` with an empty set.',
        whyItIsWrong: '`{}` in Python creates an empty `dict`, NOT an empty `set`.',
        correction: 'Use `set()` to create an empty set.'
      },
      {
        mistake: 'Attempting to put mutable unhashable items (like lists or dicts) into a set comprehension.',
        whyItIsWrong: 'Raises `TypeError: unhashable type: \'list\'`.',
        correction: 'Convert inner items to immutable tuples: `{tuple(x) for x in list_of_lists}`.'
      }
    ],
    importantRules: [
      'Set comprehensions use `{x for x in iterable}` without colons.',
      'All items in a set must be immutable and hashable.',
      'Sets are unordered collections with zero duplicate values.'
    ],
    interviewPerspective: 'Interviewers look for set comprehensions when testing data cleansing, graph visited node tracking, and vocabulary extraction tasks.',
    practiceQuestions: [
      {
        question: 'Write a set comprehension to extract the first letter of each word in `["apple", "banana", "avocado", "cherry", "blueberry"]`.',
        solution: '{w[0] for w in words}'
      },
      {
        question: 'What is the type of `{x for x in [1, 2, 3]}` versus `{x: x for x in [1, 2, 3]}`?',
        solution: 'The first is a `set`; the second (with colon) is a `dict`.'
      }
    ],
    checkpoint: [
      {
        id: 'm14-t3-q1',
        type: 'output',
        prompt: 'What is the length of the resulting set: `len({w[0].lower() for w in ["Python", "panda", "PyTorch", "Perl", "php"]})`?',
        correctAnswer: '1',
        explanation: 'All words start with "p"/"P", so after `.lower()` the set contains only one element `{\'p\'}`, with length 1.'
      },
      {
        id: 'm14-t3-q2',
        type: 'mcq',
        prompt: 'Which data types CANNOT be contained within a set produced by a set comprehension?',
        options: ['tuples and integers', 'strings and floats', 'lists and dictionaries', 'booleans and None'],
        correctAnswer: 2,
        explanation: 'Lists and dictionaries are mutable (unhashable) and cannot be added to a set.'
      }
    ]
  },

  'iterators': {
    id: 'iterators',
    moduleId: 'm14',
    topicNumber: 4,
    title: 'Iterators & The Iterator Protocol',
    shortSummary: 'Iterable vs Iterator, iter(), next(), StopIteration, and how loops work under the hood.',
    whatIsIt: 'In Python, an Iterable is any object capable of returning its members one at a time (e.g. lists, strings, dicts). An Iterator is the stateful stream object that produces the next value via `next(iterator)` and implements the Iterator Protocol (`__iter__()` and `__next__()`). When no more items remain, it raises `StopIteration`.',
    whyDoWeNeedIt: 'Iterators power all iteration in Python: `for` loops, comprehensions, unpacking, `map()`, and `zip()`. Understanding iterators reveals how Python processes sequences efficiently.',
    syntax: `# Getting an iterator from an iterable:
my_list = [10, 20, 30]
it = iter(my_list)

# Fetching elements one by one:
print(next(it))  # 10
print(next(it))  # 20
print(next(it))  # 30
# next(it) -> raises StopIteration!`,
    basicExample: {
      code: `fruits = ["Apple", "Banana", "Cherry"]
iterator = iter(fruits)

print("First item:", next(iterator))
print("Second item:", next(iterator))
print("Third item:", next(iterator))

# Next call raises StopIteration or returns default fallback
print("Safe next with default:", next(iterator, "End of Stream"))`,
      output: `First item: Apple
Second item: Banana
Third item: Cherry
Safe next with default: End of Stream`
    },
    detailedExample: {
      code: `# How Python's 'for' loop works under the hood:
def simulate_for_loop(iterable):
    print(f"--- Simulating for-loop on {type(iterable).__name__} ---")
    # 1. Obtain iterator
    it = iter(iterable)
    while True:
        try:
            # 2. Fetch next item
            item = next(it)
            print("Loop body received:", item)
        except StopIteration:
            # 3. Clean loop termination
            print("StopIteration caught: loop exited cleanly.")
            break

simulate_for_loop(["Alpha", "Beta", "Gamma"])`,
      output: `--- Simulating for-loop on list ---
Loop body received: Alpha
Loop body received: Beta
Loop body received: Gamma
StopIteration caught: loop exited cleanly.`
    },
    codeExplanation: [
      'Line 5: `iter(iterable)` calls `iterable.__iter__()` to produce a fresh iterator.',
      'Line 9: `next(it)` calls `it.__next__()` to retrieve elements sequentially.',
      'Line 11-14: `for` loops silently catch `StopIteration` and terminate cleanly.'
    ],
    commonMistakes: [
      {
        mistake: 'Assuming an iterator can be reset or rewound backwards.',
        whyItIsWrong: 'Iterators are forward-only streams. Once consumed, calling `next()` continues raising `StopIteration`.',
        correction: 'Create a fresh iterator via `iter(collection)` if you need to iterate again.'
      },
      {
        mistake: 'Passing an iterator to `len()`: `len(iter([1, 2, 3]))`.',
        whyItIsWrong: 'Iterators do not know their total length in advance; raises `TypeError: object of type \'list_iterator\' has no len()`.',
        correction: 'Check length on the underlying collection, or consume it with `len(list(iterator))`.'
      }
    ],
    importantRules: [
      'An Iterable implements `__iter__()`.',
      'An Iterator implements both `__iter__()` (returns self) and `__next__()`.',
      'Exhausted iterators raise `StopIteration` on subsequent `next()` calls.'
    ],
    interviewPerspective: 'A standard interview question: "What is the difference between an Iterable and an Iterator in Python? Explain the Iterator Protocol."'
    ,
    practiceQuestions: [
      {
        question: 'What exception is raised by an iterator when there are no further items to produce?',
        solution: 'StopIteration'
      },
      {
        question: 'What two methods make up the Python Iterator Protocol?',
        solution: '__iter__() and __next__()'
      }
    ],
    checkpoint: [
      {
        id: 'm14-t4-q1',
        type: 'output',
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `it = iter([10, 20])
next(it)
next(it)
print(next(it, "DONE"))`,
        correctAnswer: 'DONE',
        explanation: 'After consuming 10 and 20, the second argument to `next(it, "DONE")` acts as the default fallback instead of raising StopIteration.'
      },
      {
        id: 'm14-t4-q2',
        type: 'mcq',
        prompt: 'Which method must an iterator object implement to fetch the next element?',
        options: ['__get__()', '__next__()', '__forward__()', '__step__()'],
        correctAnswer: 1,
        explanation: 'The `__next__()` method is invoked by the `next()` built-in function to advance the iterator.'
      }
    ]
  },

  'generators': {
    id: 'generators',
    moduleId: 'm14',
    topicNumber: 5,
    title: 'Generators & Generator Expressions',
    shortSummary: 'Lazy evaluation, memory-efficient streams, and (x for x in seq) expressions.',
    whatIsIt: 'A Generator is a special type of iterator that generates values on-the-fly (lazy evaluation) rather than computing and storing them all in memory at once. Generators can be created using generator functions containing `yield` or Generator Expressions `(expression for item in iterable)`.',
    whyDoWeNeedIt: 'Generators have an O(1) memory footprint regardless of dataset size. Generating 100,000,000 numbers in a generator consumes bytes of RAM, whereas creating a 100,000,000 element list requires gigabytes and crashes memory.',
    syntax: `# 1. Generator Expression:
gen_exp = (x ** 2 for x in range(1000000))

# 2. Inspect memory:
import sys
# sys.getsizeof(gen_exp) is ~100-200 bytes regardless of range size!`,
    basicExample: {
      code: `import sys

# List: Eager evaluation (allocates full memory immediately)
num_list = [x for x in range(10000)]

# Generator Expression: Lazy evaluation (computes next on demand)
num_gen = (x for x in range(10000))

print("List memory size (bytes):", sys.getsizeof(num_list))
print("Generator memory size (bytes):", sys.getsizeof(num_gen))
print("First 3 items from generator:", next(num_gen), next(num_gen), next(num_gen))`,
      output: `List memory size (bytes): 85176
Generator memory size (bytes): 112
First 3 items from generator: 0 1 2`
    },
    detailedExample: {
      code: `# Streaming Data Pipeline with Generators
def parse_access_logs(logs):
    for line in logs:
        parts = line.strip().split()
        if len(parts) == 3:
            ip, status, bytes_sent = parts[0], int(parts[1]), int(parts[2])
            yield {"ip": ip, "status": status, "bytes": bytes_sent}

mock_log_stream = [
    "192.168.1.10 200 4500",
    "10.0.0.5 404 120",
    "192.168.1.10 200 8900",
    "172.16.0.2 500 0"
]

# Pipeline: Parse -> Filter 200s -> Sum bytes (Streamed with 0 wasted memory!)
parsed_stream = parse_access_logs(mock_log_stream)
success_bytes = sum(entry["bytes"] for entry in parsed_stream if entry["status"] == 200)

print(f"Total Bytes Transferred on 200 OK: {success_bytes} bytes")`,
      output: `Total Bytes Transferred on 200 OK: 13400 bytes`
    },
    codeExplanation: [
      'Line 6: `yield` turns `parse_access_logs` into a generator function.',
      'Line 18: `sum(...)` consumes the generator pipeline item-by-item without materializing intermediate lists in memory.'
    ],
    commonMistakes: [
      {
        mistake: 'Indexing a generator: `gen[0]` or `gen[2:5]`.',
        whyItIsWrong: 'Generators do not support indexing or slicing; raises `TypeError: \'generator\' object is not subscriptable`.',
        correction: 'Use `itertools.islice()` or advance with `next()`.'
      },
      {
        mistake: 'Trying to iterate over a generator a second time.',
        whyItIsWrong: 'Generators are single-use streams. Once exhausted, a second loop will yield 0 items.',
        correction: 'Re-create the generator or convert to a list (`list(gen)`) if repeated iteration is required.'
      }
    ],
    importantRules: [
      'Generators evaluate lazily on-demand.',
      'Generators have O(1) auxiliary memory consumption.',
      'Generators can only be consumed once from start to finish.'
    ],
    interviewPerspective: 'A top-tier Python interview topic: "When would you choose a list comprehension over a generator expression?" (List: when you need indexing, len(), or multiple iterations. Generator: for large datasets, file streams, or infinite sequences).',
    practiceQuestions: [
      {
        question: 'What is the syntax for creating a generator expression?',
        solution: 'Use parentheses instead of brackets: `(expression for item in iterable)`'
      },
      {
        question: 'Why are generators preferred for processing multi-gigabyte log files?',
        solution: 'Because they yield one line at a time with O(1) memory instead of loading the entire multi-gigabyte file into RAM.'
      }
    ],
    checkpoint: [
      {
        id: 'm14-t5-q1',
        type: 'output',
        prompt: 'What will be printed by this code snippet?',
        codeSnippet: `gen = (x * 2 for x in range(3))
print(type(gen).__name__, list(gen))`,
        correctAnswer: 'generator [0, 2, 4]',
        explanation: '`(x * 2 ...)` creates a generator object that produces `[0, 2, 4]` when converted to a list.'
      },
      {
        id: 'm14-t5-q2',
        type: 'mcq',
        prompt: 'What happens if you attempt to access an element of a generator using an index `gen[0]`?',
        options: [
          'It returns the first element without advancing the generator',
          'It raises a TypeError because generators are not subscriptable',
          'It converts the generator into a list automatically',
          'It resets the generator'
        ],
        correctAnswer: 1,
        explanation: 'Generators are lazy streams without random access, raising `TypeError: \'generator\' object is not subscriptable`.'
      }
    ]
  },

  'yield-statement': {
    id: 'yield-statement',
    moduleId: 'm14',
    topicNumber: 6,
    title: 'The yield Statement',
    shortSummary: 'Difference between return and yield, state preservation, infinite generators, and pipelines.',
    whatIsIt: 'The `yield` statement is what converts a normal Python function into a Generator Function. When a function executes `yield value`, it produces `value` to the caller, pauses its execution state, and preserves all local variables in memory so execution can resume immediately after the `yield` on the next `next()` call.',
    whyDoWeNeedIt: '`yield` enables custom iterative workflows: generating infinite sequences (Fibonacci, ID counters), streaming large database query cursors, implementing coroutines, and building modular data processing pipelines.',
    syntax: `def count_up_to(max_val):
    count = 1
    while count <= max_val:
        yield count  # Pauses execution and returns count
        count += 1   # Resumes here on next() call`,
    basicExample: {
      code: `def simple_sequence():
    print("-> State 1: Yielding 100")
    yield 100
    print("-> State 2: Yielding 200")
    yield 200
    print("-> State 3: Yielding 300")
    yield 300
    print("-> Function finished")

seq = simple_sequence()
print("Call 1:", next(seq))
print("Call 2:", next(seq))
print("Call 3:", next(seq))`,
      output: `-> State 1: Yielding 100
Call 1: 100
-> State 2: Yielding 200
Call 2: 200
-> State 3: Yielding 300
Call 3: 300`
    },
    detailedExample: {
      code: `# Infinite Fibonacci Generator with yield
def fibonacci_stream():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Generate first 10 Fibonacci numbers safely
fib_gen = fibonacci_stream()
first_10_fib = [next(fib_gen) for _ in range(10)]

print("First 10 Fibonacci numbers:", first_10_fib)

# yield from delegator syntax
def combined_stream():
    yield from ["Step A", "Step B"]
    yield from range(1, 4)

print("Combined stream:", list(combined_stream()))`,
      output: `First 10 Fibonacci numbers: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
Combined stream: ['Step A', 'Step B', 1, 2, 3]`
    },
    codeExplanation: [
      'Line 5: `yield a` emits the current Fibonacci term and pauses while maintaining variables `a` and `b`.',
      'Line 16: `yield from` delegates iteration directly to a sub-iterable or sub-generator.'
    ],
    commonMistakes: [
      {
        mistake: 'Mixing `return with_value` and `yield` expecting `return` to emit an extra value.',
        whyItIsWrong: 'In Python 3.3+, `return value` in a generator function sets the value of the `StopIteration(value)` exception, not yielding a value to normal loops.',
        correction: 'Use `yield` to emit all sequence values.'
      },
      {
        mistake: 'Forgetting that calling a generator function `f()` returns a generator object without executing the first line of code.',
        whyItIsWrong: 'Code inside the function body does not run until the first `next()` or `for` loop step.',
        correction: 'Remember that calling `my_gen_func()` instantiates the generator iterator.'
      }
    ],
    importantRules: [
      '`yield` pauses function execution and saves all local state.',
      '`return` inside a generator terminates the generator with `StopIteration`.',
      '`yield from iterable` delegates iteration directly to a sub-iterable.'
    ],
    interviewPerspective: 'Interviewers often ask: "Explain the internal difference between return and yield in terms of the execution stack frame" (`return` destroys the frame; `yield` freezes and preserves the frame on the heap).',
    practiceQuestions: [
      {
        question: 'What happens to the local variables of a generator function when it reaches a yield statement?',
        solution: 'They are preserved in memory (frozen on the heap) until the next `next()` call resumes execution.'
      },
      {
        question: 'What syntax is used in Python to delegate yielding to another iterable or sub-generator?',
        solution: 'yield from'
      }
    ],
    checkpoint: [
      {
        id: 'm14-t6-q1',
        type: 'output',
        prompt: 'What will be the output of this Python code snippet?',
        codeSnippet: `def countdown(n):
    while n > 0:
        yield n
        n -= 1

print(list(countdown(3)))`,
        correctAnswer: '[3, 2, 1]',
        explanation: 'The generator yields 3, 2, and 1 before terminating when `n > 0` becomes False.'
      },
      {
        id: 'm14-t6-q2',
        type: 'mcq',
        prompt: 'What is the primary operational difference between `return` and `yield` in Python?',
        options: [
          'yield terminates the function and frees all memory; return pauses execution',
          'yield pauses execution and preserves local variable state; return terminates the function',
          'yield can only be used with numbers; return can be used with all types',
          'yield runs code asynchronously on another thread'
        ],
        correctAnswer: 1,
        explanation: '`yield` pauses execution and preserves state for subsequent resumption, whereas `return` terminates execution.'
      }
    ]
  }
};
