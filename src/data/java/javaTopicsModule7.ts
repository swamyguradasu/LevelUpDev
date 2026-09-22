import { JavaTopicDetail } from './javaTopicsData';

export const JAVA_TOPICS_MODULE_7: Record<string, JavaTopicDetail> = {
  'exception-hierarchy-checked-unchecked': {
    id: 'exception-hierarchy-checked-unchecked',
    moduleId: 'm7',
    topicNumber: 1,
    title: 'The Java Exception Hierarchy',
    shortSummary: 'Explore Throwable, Error vs Exception, and the critical distinction between Checked (compile-time) and Unchecked (runtime) exceptions.',
    whatIsIt: 'Java models all exceptional events as objects inheriting from `java.lang.Throwable`.',
    whyDoWeNeedIt: 'Structured error handling prevents abrupt application crashes, isolates faults, and forces developers to handle recoverable environmental issues at compile time.',
    syntax: `// Throwable Hierarchy:
// Throwable -> Error (Fatal, do not catch)
// Throwable -> Exception -> RuntimeException (Unchecked)
// Throwable -> Exception (Checked -> Must handle or declare)`,
    basicExample: {
      code: `public class ExceptionDemo {
    public static void main(String[] args) {
        try {
            int result = 10 / 0; // Throws ArithmeticException (Unchecked)
        } catch (ArithmeticException e) {
            System.out.println("Handled Unchecked Exception: " + e.getMessage());
        }
    }
}`,
      output: `Handled Unchecked Exception: / by zero`
    },
    detailedExample: {
      code: `import java.io.FileReader;
import java.io.FileNotFoundException;

public class CheckedDemo {
    public static void main(String[] args) {
        // Checked exception: Compiler forces handling!
        try {
            FileReader fr = new FileReader("nonexistent_file.txt");
        } catch (FileNotFoundException e) {
            System.out.println("Caught Checked Exception: File does not exist!");
        }
    }
}`,
      output: `Caught Checked Exception: File does not exist!`
    },
    codeExplanation: [
      'Error: Fatal system crashes (OutOfMemoryError, StackOverflowError) that applications cannot recover from.',
      'Checked Exception (FileNotFoundException): Compiler requires explicit try-catch or throws declaration.',
      'Unchecked Exception (ArithmeticException): Subclasses of RuntimeException representing logic bugs.'
    ],
    visualExplanation: {
      title: 'Throwable Class Hierarchy Tree',
      description: 'The root Throwable splits into fatal Errors and recoverable Exceptions.',
      asciiDiagram: `                     java.lang.Throwable
                       /             \\
           java.lang.Error       java.lang.Exception
          (Fatal System)            /           \\
                           Checked Exceptions   RuntimeException
                          (Compile-time check)  (Unchecked Runtime)`
    },
    visualizerType: 'exception-flow',
    commonMistakes: [
      {
        mistake: 'Catching `Throwable` or `Error` in normal business code.',
        whyItIsWrong: 'Swallowing fatal JVM errors masks severe hardware or memory exhaustion problems.',
        correction: 'Catch specific `Exception` subclasses, never `Throwable` or `Error`.'
      }
    ],
    importantRules: [
      'Checked exceptions are enforced at compile time.',
      'Unchecked exceptions inherit from `RuntimeException`.',
      'Never leave catch blocks empty (swallowing exceptions).'
    ],
    interviewPerspective: {
      question: 'What is the architectural purpose of distinguishing Checked vs Unchecked exceptions in Java?',
      answer: 'Checked exceptions represent **recoverable environmental failures** that a well-written application can reasonably anticipate and handle (e.g. missing network file). Unchecked exceptions represent **programmer bugs or precondition violations** (e.g. `NullPointerException`, `IndexOutOfBounds`) that should be fixed in code logic.',
      trap: 'Checked = Recoverable conditions; Unchecked = Programming bugs.'
    },
    practiceQuestions: [
      {
        question: 'Name 3 checked exceptions and 3 unchecked exceptions in Java standard library.',
        hint: 'Think about I/O vs memory/math.',
        solution: 'Checked: `IOException`, `SQLException`, `ClassNotFoundException`. Unchecked: `NullPointerException`, `ArithmeticException`, `IllegalArgumentException`.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m7-t1-q1',
        type: 'mcq',
        prompt: 'Which of the following is an Unchecked (Runtime) Exception in Java?',
        options: ['NullPointerException', 'IOException', 'FileNotFoundException', 'SQLException'],
        correctAnswer: 0,
        explanation: '`NullPointerException` extends `RuntimeException`, making it an unchecked exception that is not checked at compile time.'
      }
    ]
  },

  'try-catch-finally-flow': {
    id: 'try-catch-finally-flow',
    moduleId: 'm7',
    topicNumber: 2,
    title: 'Try, Catch & Finally Flow Control',
    shortSummary: 'Master structured error handling with try-catch-finally, execution sequences, and guaranteed cleanup.',
    whatIsIt: '`try-catch-finally` is the core syntax structure for intercepting exceptions and guaranteeing resource cleanup.',
    whyDoWeNeedIt: 'Ensures programs degrade gracefully upon failure and guarantees resources (locks, files, sockets) are released even during exceptions.',
    syntax: `try {
    // Risky code that may throw exceptions
} catch (SpecificException e) {
    // Recovery code
} finally {
    // ALWAYS executes (Cleanup)
}`,
    basicExample: {
      code: `public class TryCatchDemo {
    public static void main(String[] args) {
        try {
            System.out.println("1. In Try Block");
            int val = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("2. In Catch Block: Handled!");
        } finally {
            System.out.println("3. In Finally Block: Always Runs!");
        }
    }
}`,
      output: `1. In Try Block
2. In Catch Block: Handled!
3. In Finally Block: Always Runs!`
    },
    detailedExample: {
      code: `public class FinallyReturnOrder {
    public static int testReturn() {
        try {
            System.out.println("Try executing...");
            return 10;
        } finally {
            System.out.println("Finally executing before return completes!");
        }
    }

    public static void main(String[] args) {
        int result = testReturn();
        System.out.println("Returned: " + result);
    }
}`,
      output: `Try executing...
Finally executing before return completes!
Returned: 10`
    },
    codeExplanation: [
      'try: Code executes sequentially until an exception occurs.',
      'catch: Intercepts matching exception object, providing access to `e.getMessage()` and `e.printStackTrace()`.',
      'finally: Guaranteed to execute even if `try` executes a `return` statement.'
    ],
    visualExplanation: {
      title: 'Try-Catch-Finally Execution Pipeline',
      description: 'Finally executes regardless of whether an exception occurs or return is executed.',
      asciiDiagram: `[ Enter try block ]
       ↓
( Exception thrown? )
 ├── YES ──→ [ Jump to matching catch block ] ──┐
 └── NO  ──→ [ Complete try block ] ────────────┤
                                                ↓
                                    [ Execute finally block ]
                                                ↓
                                    [ Continue normal program flow ]`
    },
    visualizerType: 'exception-flow',
    commonMistakes: [
      {
        mistake: 'Placing a `return` statement inside a `finally` block.',
        whyItIsWrong: 'A return inside finally overrides any return value or thrown exception from `try` and `catch`, swallowing exceptions silently.',
        correction: 'Never put return statements inside a finally block.'
      },
      {
        mistake: 'Catching general `Exception` before specific subclasses.',
        whyItIsWrong: 'Causes compiler error: unreachable catch block.',
        correction: 'Order catch blocks from most specific subclass to most general superclass.'
      }
    ],
    importantRules: [
      '`finally` block always executes (unless `System.exit(0)` is called).',
      'Catch subclasses must precede superclass catch blocks.',
      'A `try` block must be followed by at least one `catch` or a `finally`.'
    ],
    interviewPerspective: {
      question: 'Is there any scenario where a `finally` block in Java will NOT execute?',
      answer: 'Yes: 1) Calling `System.exit(0)` which halts the JVM immediately, 2) Fatal JVM crash / power loss, 3) An infinite loop or deadlock inside the `try` block preventing completion.',
      trap: '`System.exit()` is the standard programmatic answer.'
    },
    practiceQuestions: [
      {
        question: 'What is printed by `try { return 1; } finally { System.out.print("F "); }`?',
        hint: 'Finally executes before the return completes.',
        solution: 'Prints `"F "` and returns `1`.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m7-t2-q1',
        type: 'mcq',
        prompt: 'Under what circumstance will a `finally` block NOT execute in Java?',
        options: [
          'If `System.exit(0)` is invoked before the finally block is reached',
          'If an unchecked exception occurs in the try block',
          'If the try block executes a `return` statement',
          'If no catch block matches the thrown exception'
        ],
        correctAnswer: 0,
        explanation: '`System.exit(0)` halts the JVM process immediately, terminating thread execution before pending finally blocks can run.'
      }
    ]
  },

  'multi-catch-union-syntax': {
    id: 'multi-catch-union-syntax',
    moduleId: 'm7',
    topicNumber: 3,
    title: 'Multi-Catch & Union Catch Syntax',
    shortSummary: 'Write cleaner, concise error handlers using Java 7+ union multi-catch syntax without repeating handling code.',
    whatIsIt: 'Multi-Catch allows grouping multiple exception types into a single `catch` block separated by the pipe operator `|`.',
    whyDoWeNeedIt: 'Reduces boilerplate duplication when multiple distinct exceptions share identical recovery or logging logic.',
    syntax: `try {
    // Code throwing IOException or NumberFormatException
} catch (IOException | NumberFormatException e) {
    // Unified error handler
}`,
    basicExample: {
      code: `public class MultiCatchDemo {
    public static void process(String s, int idx) {
        try {
            int num = Integer.parseInt(s);
            int[] arr = {10, 20, 30};
            System.out.println("Result: " + (arr[idx] / num));
        } catch (NumberFormatException | ArrayIndexOutOfBoundsException | ArithmeticException e) {
            System.out.println("Handling error: " + e.getClass().getSimpleName() + " -> " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        process("abc", 0); // NumberFormatException
        process("5", 10);  // ArrayIndexOutOfBoundsException
        process("0", 1);   // ArithmeticException
    }
}`,
      output: `Handling error: NumberFormatException -> For input string: "abc"
Handling error: ArrayIndexOutOfBoundsException -> Index 10 out of bounds for length 3
Handling error: ArithmeticException -> / by zero`
    },
    detailedExample: {
      code: `public class ImplicitFinalDemo {
    public static void main(String[] args) {
        try {
            int x = Integer.parseInt("invalid");
        } catch (NumberFormatException | NullPointerException e) {
            // e is implicitly final!
            // e = new Exception(); // COMPILATION ERROR!
            System.out.println("Clean unified log: " + e.getMessage());
        }
    }
}`,
      output: `Clean unified log: For input string: "invalid"`
    },
    codeExplanation: [
      'catch (A | B e): Catches either exception type A or B.',
      'Implicitly final: The parameter `e` cannot be reassigned inside a multi-catch block.'
    ],
    visualExplanation: {
      title: 'Multi-Catch Union Pipeline',
      description: 'Multiple exception types are funneled into a single handler.',
      asciiDiagram: `ArithmeticException ─────────────┐
ArrayIndexOutOfBoundsException ──┼──→ [ Unified Catch Handler ]
NumberFormatException ───────────┘`
    },
    visualizerType: 'exception-flow',
    commonMistakes: [
      {
        mistake: 'Combining subclass and superclass in union: `catch (IOException | FileNotFoundException e)`.',
        whyItIsWrong: '`FileNotFoundException` is already a subclass of `IOException`, making the clause redundant and failing compilation.',
        correction: 'Specify only sibling/disjoint exception types in multi-catch unions.'
      }
    ],
    importantRules: [
      'Multi-catch exception types must be alternative (disjoint), not parent-child related.',
      'The multi-catch parameter `e` is implicitly `final`.',
      'Introduced in Java 7.'
    ],
    interviewPerspective: {
      question: 'Why does Java disallow `catch (ExceptionA | ExceptionB e)` if `ExceptionB` is a subclass of `ExceptionA`?',
      answer: 'Because if `ExceptionB` is a subclass of `ExceptionA`, `ExceptionA` already intercepts `ExceptionB`. Specifying both in a union clause is redundant and indicates programmer confusion, so the compiler rejects it.',
      trap: 'Union catches require disjoint exception hierarchies.'
    },
    practiceQuestions: [
      {
        question: 'Rewrite two separate catch blocks for `SQLException` and `IOException` into a single multi-catch block.',
        hint: 'Use the `|` pipe operator.',
        solution: `catch (SQLException | IOException e) { logger.error(e); }`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m7-t3-q1',
        type: 'mcq',
        prompt: 'Why does `catch (IOException | FileNotFoundException e)` fail to compile in Java?',
        options: [
          'Because `FileNotFoundException` is a subclass of `IOException`, making the clause redundant',
          'Java does not support checked exceptions in multi-catch',
          'You cannot specify more than one exception in catch',
          '`|` is not a valid operator'
        ],
        correctAnswer: 0,
        explanation: 'The compiler forbids specifying both a subclass and its superclass in the same multi-catch clause.'
      }
    ]
  },

  'throw-vs-throws-propagation': {
    id: 'throw-vs-throws-propagation',
    moduleId: 'm7',
    topicNumber: 4,
    title: 'Throw vs Throws & Exception Propagation',
    shortSummary: 'Master explicit exception triggering with throw and method signature propagation with throws.',
    whatIsIt: '`throw` explicitly triggers an exception in a method body; `throws` declares potential checked exceptions in the method header.',
    whyDoWeNeedIt: 'Enforces input contracts, fails fast upon invalid data, and allows exceptions to propagate up the Call Stack to higher-level orchestrators.',
    syntax: `// Method signature declaration:
public void readFile(String path) throws IOException {
    if (path == null) {
        throw new IllegalArgumentException("Path cannot be null!"); // Body trigger
    }
}`,
    basicExample: {
      code: `public class ThrowThrowsDemo {
    public static void validateAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative: " + age);
        }
        System.out.println("Valid age: " + age);
    }

    public static void main(String[] args) {
        try {
            validateAge(-5);
        } catch (IllegalArgumentException e) {
            System.out.println("Validation Caught: " + e.getMessage());
        }
    }
}`,
      output: `Validation Caught: Age cannot be negative: -5`
    },
    detailedExample: {
      code: `public class PropagationStack {
    public static void methodC() {
        throw new RuntimeException("Error originated in methodC!");
    }

    public static void methodB() {
        methodC(); // Ducks exception (propagates up)
    }

    public static void methodA() {
        try {
            methodB();
        } catch (RuntimeException e) {
            System.out.println("methodA caught: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        methodA();
    }
}`,
      output: `methodA caught: Error originated in methodC!`
    },
    codeExplanation: [
      'throw: Instantiates and fires the exception object immediately, aborting method flow.',
      'throws: Informs callers that checked exceptions might be thrown, requiring caller handling.',
      'Propagation: Unhandled exceptions bubble up call frames from C -> B -> A until caught.'
    ],
    visualExplanation: {
      title: 'Call Stack Propagation (Ducking)',
      description: 'Unhandled exceptions bubble up the call stack frames until a matching catch block intercepts them.',
      asciiDiagram: `methodC() throws RuntimeException
       ↑ (Uncaught -> Frame popped)
methodB() (Ducks exception -> Frame popped)
       ↑
methodA() [ Catches RuntimeException gracefully! ]`
    },
    visualizerType: 'exception-flow',
    commonMistakes: [
      {
        mistake: 'Confusing `throw` (action keyword) with `throws` (declaration keyword).',
        whyItIsWrong: '`throw` is an imperative statement in the method body; `throws` is a clause in the method signature.',
        correction: 'Remember: "throw an object" (body), "throws ExceptionType" (signature).'
      }
    ],
    importantRules: [
      '`throw` is followed by an instantiated object (`new Exception()`).',
      '`throws` is followed by exception class names in the method header.',
      'Unchecked exceptions can be thrown without `throws` declaration.'
    ],
    interviewPerspective: {
      question: 'What is exception ducking in Java?',
      answer: 'Exception ducking is when a method chooses not to handle a checked exception internally with `try-catch`, and instead declares `throws ExceptionClass` in its method header, passing the handling responsibility to the caller.',
      trap: 'Ducking checked exceptions requires `throws` in the signature.'
    },
    practiceQuestions: [
      {
        question: 'Write a method `withdraw(double amount)` that throws `IllegalArgumentException` if amount <= 0.',
        hint: 'Use `if (amount <= 0) throw new...`.',
        solution: `public void withdraw(double a) { if(a <= 0) throw new IllegalArgumentException("Invalid amount"); }`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m7-t4-q1',
        type: 'mcq',
        prompt: 'Which keyword is declared in a method signature to indicate checked exceptions passed to the caller?',
        options: ['throws', 'throw', 'catch', 'finally'],
        correctAnswer: 0,
        explanation: '`throws` is declared in the method header to specify exceptions that may propagate to the caller.'
      }
    ]
  },

  'custom-domain-exceptions': {
    id: 'custom-domain-exceptions',
    moduleId: 'm7',
    topicNumber: 5,
    title: 'Custom & Domain-Specific Exceptions',
    shortSummary: 'Design and implement custom Checked and Unchecked exception classes for domain business logic.',
    whatIsIt: 'Custom exceptions are user-defined classes extending `Exception` (Checked) or `RuntimeException` (Unchecked).',
    whyDoWeNeedIt: 'Expresses domain-specific error conditions (e.g. `InsufficientFundsException`, `InvalidTokenException`) with rich contextual metadata.',
    syntax: `// 1. Custom Checked Exception:
public class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String msg) { super(msg); }
}

// 2. Custom Unchecked Exception:
public class InvalidUserException extends RuntimeException {
    public InvalidUserException(String msg) { super(msg); }
}`,
    basicExample: {
      code: `class InsufficientFundsException extends Exception {
    private double deficit;
    public InsufficientFundsException(String msg, double deficit) {
        super(msg);
        this.deficit = deficit;
    }
    public double getDeficit() { return deficit; }
}

public class BankDemo {
    public static void withdraw(double balance, double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Overdraft denied!", amount - balance);
        }
        System.out.println("Withdrew: $" + amount);
    }

    public static void main(String[] args) {
        try {
            withdraw(100.0, 150.0);
        } catch (InsufficientFundsException e) {
            System.out.println("Error: " + e.getMessage() + " | Deficit: $" + e.getDeficit());
        }
    }
}`,
      output: `Error: Overdraft denied! | Deficit: $50.0`
    },
    detailedExample: {
      code: `class AccountLockedException extends RuntimeException {
    public AccountLockedException(String message, Throwable cause) {
        super(message, cause); // Exception chaining
    }
}

public class ChainedExceptionDemo {
    public static void main(String[] args) {
        try {
            try {
                throw new java.sql.SQLException("Database timeout");
            } catch (java.sql.SQLException ex) {
                throw new AccountLockedException("Auth failed due to DB error", ex);
            }
        } catch (AccountLockedException e) {
            System.out.println("Caught: " + e.getMessage());
            System.out.println("Root cause: " + e.getCause().getMessage());
        }
    }
}`,
      output: `Caught: Auth failed due to DB error
Root cause: Database timeout`
    },
    codeExplanation: [
      'extends Exception: Creates a Checked exception.',
      'extends RuntimeException: Creates an Unchecked exception.',
      'super(message, cause): Preserves original root-cause exception stack trace (Exception Chaining).'
    ],
    visualExplanation: {
      title: 'Custom Exception Class Architecture',
      description: 'Custom domain exceptions extend standard exception bases and carry custom fields.',
      asciiDiagram: `java.lang.Exception
        ↑
InsufficientFundsException
 ├── String message (inherited)
 ├── Throwable cause (inherited)
 └── double deficit (Custom domain field)`
    },
    visualizerType: 'exception-flow',
    commonMistakes: [
      {
        mistake: 'Extending `Throwable` directly instead of `Exception` or `RuntimeException`.',
        whyItIsWrong: 'Direct subclasses of Throwable cannot distinguish between application exceptions and system errors.',
        correction: 'Always extend `Exception` for checked or `RuntimeException` for unchecked exceptions.'
      }
    ],
    importantRules: [
      'Suffix class names with `Exception` (e.g. `PaymentFailedException`).',
      'Provide standard constructors: `()`, `(String)`, and `(String, Throwable)`.',
      'Store domain metadata in final instance fields with getters.'
    ],
    interviewPerspective: {
      question: 'What is Exception Chaining in Java and why is it important?',
      answer: 'Exception chaining wraps a lower-level technical exception (e.g. `SQLException`) inside a higher-level domain exception (e.g. `OrderProcessingException`) using `super(message, cause)`. This preserves the original root-cause stack trace for debugging while presenting clean domain errors to callers.',
      trap: 'Always pass the cause exception to `super(msg, cause)`.'
    },
    practiceQuestions: [
      {
        question: 'Create a custom unchecked exception `ProductNotFoundException`.',
        hint: 'Extend `RuntimeException`.',
        solution: `public class ProductNotFoundException extends RuntimeException { public ProductNotFoundException(String msg) { super(msg); } }`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m7-t5-q1',
        type: 'mcq',
        prompt: 'To create a custom Unchecked Exception in Java, which base class must your class extend?',
        options: ['java.lang.RuntimeException', 'java.lang.Exception', 'java.lang.Throwable', 'java.lang.Error'],
        correctAnswer: 0,
        explanation: 'Extending `RuntimeException` creates an unchecked exception that does not require mandatory try-catch handling at compile time.'
      }
    ]
  },

  'try-with-resources-autocloseable': {
    id: 'try-with-resources-autocloseable',
    moduleId: 'm7',
    topicNumber: 6,
    title: 'Try-With-Resources & AutoCloseable Interface',
    shortSummary: 'Master automatic resource management introduced in Java 7 to prevent memory and file descriptor leaks.',
    whatIsIt: 'Try-with-resources automatically closes all resources declared in the `try(...)` header when the block exits.',
    whyDoWeNeedIt: 'Eliminates error-prone nested `finally` blocks and guarantees file descriptors, database connections, and sockets are closed safely.',
    syntax: `// Any resource implementing AutoCloseable:
try (FileReader fr = new FileReader("data.txt");
     BufferedReader br = new BufferedReader(fr)) {
    // Read operations
} // br and fr closed automatically in reverse order!`,
    basicExample: {
      code: `class CustomResource implements AutoCloseable {
    public void doWork() {
        System.out.println("Working with resource...");
    }

    @Override
    public void close() {
        System.out.println("Resource closed automatically!");
    }
}

public class ArmDemo {
    public static void main(String[] args) {
        try (CustomResource res = new CustomResource()) {
            res.doWork();
        } // close() invoked automatically HERE
    }
}`,
      output: `Working with resource...
Resource closed automatically!`
    },
    detailedExample: {
      code: `import java.io.StringReader;
import java.io.BufferedReader;
import java.io.IOException;

public class MultiResourceArm {
    public static void main(String[] args) {
        try (StringReader sr = new StringReader("Java 21");
             BufferedReader br = new BufferedReader(sr)) {
            System.out.println("Read: " + br.readLine());
        } catch (IOException e) {
            System.out.println("I/O Error: " + e.getMessage());
        }
    }
}`,
      output: `Read: Java 21`
    },
    codeExplanation: [
      'try (Resource res = new Resource()): Declares managed resource.',
      'AutoCloseable: Core interface with a single `void close() throws Exception` method.',
      'Reverse Order: Multiple resources are closed in reverse order of creation.'
    ],
    visualExplanation: {
      title: 'Try-With-Resources Auto-Close Lifecycle',
      description: 'Java automatically invokes close() on AutoCloseable objects upon leaving the block.',
      asciiDiagram: `[ Enter try(Res1, Res2) ]
       ↓
[ Execute try block body ]
       ↓
[ Auto-invoke Res2.close() ]  (Reverse creation order)
       ↓
[ Auto-invoke Res1.close() ]
       ↓
[ Run catch/finally blocks if present ]`
    },
    visualizerType: 'exception-flow',
    commonMistakes: [
      {
        mistake: 'Using objects in try-with-resources that do not implement `AutoCloseable`.',
        whyItIsWrong: 'Compiler error: "The resource type must implement java.lang.AutoCloseable".',
        correction: 'Ensure resource classes implement `AutoCloseable` or `Closeable`.'
      }
    ],
    importantRules: [
      'Resources must implement `java.lang.AutoCloseable`.',
      'Resources are closed in reverse order of declaration.',
      'Resources are closed BEFORE any explicit `catch` or `finally` blocks execute.'
    ],
    interviewPerspective: {
      question: 'When do resources close in try-with-resources relative to catch and finally blocks?',
      answer: 'Resources declared in try-with-resources are closed **immediately upon exiting the try block body**, BEFORE any matching `catch` or `finally` blocks are executed.',
      trap: 'Resources close BEFORE `catch` and `finally` run, not after.'
    },
    practiceQuestions: [
      {
        question: 'What interface must a class implement to be used in try-with-resources?',
        hint: 'Single-method interface in `java.lang`.',
        solution: '`java.lang.AutoCloseable` (or `java.io.Closeable`).'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m7-t6-q1',
        type: 'mcq',
        prompt: 'What interface must a class implement to be eligible for use in Java try-with-resources?',
        options: ['java.lang.AutoCloseable', 'java.io.Serializable', 'java.lang.Runnable', 'java.lang.Cloneable'],
        correctAnswer: 0,
        explanation: 'Try-with-resources requires resources to implement `java.lang.AutoCloseable`.'
      }
    ]
  },

  'java-io-streams-architecture': {
    id: 'java-io-streams-architecture',
    moduleId: 'm7',
    topicNumber: 7,
    title: 'Java I/O Streams: Byte vs Character Streams',
    shortSummary: 'Deconstruct the Java I/O architecture: InputStream/OutputStream vs Reader/Writer and encoding mechanics.',
    whatIsIt: 'Java I/O processes data as sequential streams of bytes (8-bit) or characters (16-bit Unicode).',
    whyDoWeNeedIt: 'Provides unified abstraction for reading and writing to files, network sockets, memory buffers, and pipes.',
    syntax: `// Byte Streams (Binary data: images, pdf, zip)
InputStream is; OutputStream os;

// Character Streams (Text data: csv, json, txt)
Reader r; Writer w;`,
    basicExample: {
      code: `import java.io.ByteArrayInputStream;
import java.io.IOException;

public class ByteStreamDemo {
    public static void main(String[] args) throws IOException {
        byte[] data = {74, 97, 118, 97}; // ASCII for "Java"
        try (ByteArrayInputStream in = new ByteArrayInputStream(data)) {
            int b;
            while ((b = in.read()) != -1) {
                System.out.print((char) b);
            }
            System.out.println();
        }
    }
}`,
      output: `Java`
    },
    detailedExample: {
      code: `import java.io.StringReader;
import java.io.IOException;

public class CharStreamDemo {
    public static void main(String[] args) throws IOException {
        try (StringReader reader = new StringReader("LevelUpDev \u2764 Java")) {
            int ch;
            while ((ch = reader.read()) != -1) {
                System.out.print((char) ch);
            }
            System.out.println();
        }
    }
}`,
      output: `LevelUpDev ❤ Java`
    },
    codeExplanation: [
      'Byte Streams: `InputStream` / `OutputStream` process raw 8-bit bytes. Ideal for binary assets.',
      'Character Streams: `Reader` / `Writer` handle 16-bit Unicode characters with automatic charset decoding.',
      'read() == -1: Signals EOF (End of Stream).'
    ],
    visualExplanation: {
      title: 'Java I/O Stream Taxonomy',
      description: 'Byte streams handle raw binary; Character streams handle encoded Unicode text.',
      asciiDiagram: `┌──────────────────────────────────────────────┐
│                JAVA I/O STREAMS              │
├──────────────────────┬───────────────────────┤
│ BYTE STREAMS (8-bit) │ CHAR STREAMS (16-bit) │
│ • InputStream        │ • Reader              │
│ • OutputStream       │ • Writer              │
│ (Images, Video, Zip) │ (Text, CSV, JSON, Log)│
└──────────────────────┴───────────────────────┘`
    },
    visualizerType: 'memory-box',
    commonMistakes: [
      {
        mistake: 'Using `FileReader` to read binary files (like PNG or MP3).',
        whyItIsWrong: 'FileReader attempts to decode raw bytes into characters using charset encoding, corrupting binary payloads.',
        correction: 'Use `FileInputStream` / Byte Streams for binary files.'
      }
    ],
    importantRules: [
      'Use Byte Streams for images, audio, ZIP, and binary files.',
      'Use Character Streams for text and character files.',
      'All read() methods return `-1` upon reaching End of Stream (EOF).'
    ],
    interviewPerspective: {
      question: 'What is the role of `InputStreamReader` and `OutputStreamWriter` in Java I/O?',
      answer: 'They act as **Bridge Streams** that convert between raw 8-bit byte streams and 16-bit character streams using a specified character encoding (such as `StandardCharsets.UTF_8`).',
      trap: 'They bridge byte streams to character streams.'
    },
    practiceQuestions: [
      {
        question: 'Which stream class should you use to read raw bytes from a `.zip` file?',
        hint: 'Byte stream file reader.',
        solution: '`java.io.FileInputStream`.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m7-t7-q1',
        type: 'mcq',
        prompt: 'Which stream family must you choose to read a `.png` image file without corruption?',
        options: ['Byte Streams (InputStream)', 'Character Streams (Reader)', 'PrintWriter', 'Scanner with UTF-8'],
        correctAnswer: 0,
        explanation: 'Images are binary data and must be processed with Byte Streams (`InputStream`) to avoid character encoding corruption.'
      }
    ]
  },

  'reading-files-buffered-scanner': {
    id: 'reading-files-buffered-scanner',
    moduleId: 'm7',
    topicNumber: 8,
    title: 'Reading Files: FileReader, BufferedReader & Scanner',
    shortSummary: 'Master reading text files line-by-line, buffered chunking, and modern Java Files methods.',
    whatIsIt: 'Techniques for reading text file contents from disk into memory using buffered streams and token parsers.',
    whyDoWeNeedIt: 'File ingestion powers data processing pipelines, configuration loading, logs analysis, and database seeds.',
    syntax: `// 1. BufferedReader (Fast, line-by-line)
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    String line;
    while ((line = br.readLine()) != null) { ... }
}

// 2. Modern NIO.2 (Small to medium files)
List<String> lines = Files.readAllLines(Path.of("file.txt"));`,
    basicExample: {
      code: `import java.io.BufferedReader;
import java.io.StringReader;
import java.io.IOException;

public class BufferedReaderDemo {
    public static void main(String[] args) {
        String mockData = "Alice,100\\nBob,95\\nCharlie,88";

        try (BufferedReader br = new BufferedReader(new StringReader(mockData))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println("Record: " + line);
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
      output: `Record: Alice,100
Record: Bob,95
Record: Charlie,88`
    },
    detailedExample: {
      code: `import java.util.Scanner;
import java.io.StringReader;

public class ScannerTokenDemo {
    public static void main(String[] args) {
        String data = "10 20.5 true Hello";
        try (Scanner sc = new Scanner(new StringReader(data))) {
            int i = sc.nextInt();
            double d = sc.nextDouble();
            boolean b = sc.nextBoolean();
            String s = sc.next();

            System.out.printf("Parsed: %d, %.1f, %b, %s%n", i, d, b, s);
        }
    }
}`,
      output: `Parsed: 10, 20.5, true, Hello`
    },
    codeExplanation: [
      'BufferedReader: Reads large 8KB chunks from disk into RAM buffer, speeding up `readLine()` calls by 100x.',
      'readLine(): Returns complete string until newline, or `null` at EOF.',
      'Scanner: Parses primitive types directly with regex tokenization.'
    ],
    visualExplanation: {
      title: 'Buffered Reading Disk Cache Pipeline',
      description: 'BufferedReader caches 8192 bytes in RAM to minimize expensive physical disk read cycles.',
      asciiDiagram: `[ Physical Disk File ] ──(8KB Chunk)──→ [ BufferedReader RAM Cache ] ──(readLine)──→ [ Application ]`
    },
    visualizerType: 'exception-flow',
    commonMistakes: [
      {
        mistake: 'Using `Files.readAllLines()` on multi-gigabyte log files.',
        whyItIsWrong: 'Loads the entire file into Heap memory as a `List<String>`, instantly causing `OutOfMemoryError`.',
        correction: 'Use `BufferedReader` or `Files.lines()` (Stream) for large files.'
      }
    ],
    importantRules: [
      'Wrap `FileReader` in `BufferedReader` for performance.',
      '`br.readLine()` returns `null` at end of file.',
      'Always close readers inside try-with-resources blocks.'
    ],
    interviewPerspective: {
      question: 'Why is `BufferedReader` significantly faster than `FileReader` for reading files?',
      answer: '`FileReader.read()` makes a separate native OS system call for each individual character, causing high disk I/O latency. `BufferedReader` reads a large block (default 8,192 characters) in a single OS system call into memory and serves subsequent reads directly from RAM.',
      trap: 'System calls are expensive; buffering amortizes OS I/O cost.'
    },
    practiceQuestions: [
      {
        question: 'Write a loop that counts the total number of lines in a file using `BufferedReader`.',
        hint: 'Increment counter while `br.readLine() != null`.',
        solution: `int count = 0; while(br.readLine() != null) count++; return count;`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m7-t8-q1',
        type: 'mcq',
        prompt: 'What does `BufferedReader.readLine()` return when it reaches the end of the file?',
        options: ['null', '"" (empty string)', '-1', 'Throws EOFException'],
        correctAnswer: 0,
        explanation: '`readLine()` returns `null` to signal that the end of the stream (EOF) has been reached.'
      }
    ]
  },

  'writing-files-writer-printwriter': {
    id: 'writing-files-writer-printwriter',
    moduleId: 'm7',
    topicNumber: 9,
    title: 'Writing Files: FileWriter, BufferedWriter & PrintWriter',
    shortSummary: 'Master text output, append modes, buffered flushing, formatted printing, and modern NIO file writing.',
    whatIsIt: 'Tools for writing character streams to persistent storage on disk.',
    whyDoWeNeedIt: 'File output is required for report generation, transaction logging, CSV exports, and application state persistence.',
    syntax: `// 1. BufferedWriter (Buffered write)
try (BufferedWriter bw = new BufferedWriter(new FileWriter("out.txt", true))) { // true = Append mode
    bw.write("Line text");
    bw.newLine();
}

// 2. PrintWriter (Formatted write)
try (PrintWriter pw = new PrintWriter(new FileWriter("report.txt"))) {
    pw.printf("User: %s | Score: %d%n", "Alice", 95);
}`,
    basicExample: {
      code: `import java.io.StringWriter;
import java.io.PrintWriter;

public class PrintWriterDemo {
    public static void main(String[] args) {
        StringWriter sw = new StringWriter();
        try (PrintWriter pw = new PrintWriter(sw)) {
            pw.println("=== SYSTEM AUDIT LOG ===");
            pw.printf("Status: %s | Code: %d%n", "SUCCESS", 200);
        }
        System.out.println(sw.toString());
    }
}`,
      output: `=== SYSTEM AUDIT LOG ===
Status: SUCCESS | Code: 200`
    },
    detailedExample: {
      code: `import java.io.StringWriter;
import java.io.BufferedWriter;
import java.io.IOException;

public class BufferedAppendDemo {
    public static void main(String[] args) throws IOException {
        StringWriter sw = new StringWriter();
        try (BufferedWriter bw = new BufferedWriter(sw)) {
            bw.write("Entry 1: Initialized");
            bw.newLine();
            bw.write("Entry 2: Running");
            bw.flush(); // Force write to output stream
        }
        System.out.println(sw.toString());
    }
}`,
      output: `Entry 1: Initialized
Entry 2: Running`
    },
    codeExplanation: [
      'FileWriter("path", true): Second argument `true` activates append mode, preserving existing file contents.',
      'bw.newLine(): Writes platform-independent newline separator (`\\r\\n` on Windows, `\\n` on Linux/macOS).',
      'PrintWriter: Provides formatted `printf()` and `println()` methods without throwing checked `IOException`s.'
    ],
    visualExplanation: {
      title: 'Buffered File Output Pipeline',
      description: 'BufferedWriter queues characters in RAM and flushes to disk upon buffer fill or close().',
      asciiDiagram: `[ Application write() ] ──→ [ BufferedWriter RAM Queue ] ──(flush / close)──→ [ Physical Disk File ]`
    },
    visualizerType: 'exception-flow',
    commonMistakes: [
      {
        mistake: 'Forgetting to pass `true` to `FileWriter` when appending logs.',
        whyItIsWrong: 'Default constructor `new FileWriter("log.txt")` overwrites and truncates the entire existing file.',
        correction: 'Use `new FileWriter("log.txt", true)` for append mode.'
      }
    ],
    importantRules: [
      'Use `new FileWriter(file, true)` to append instead of overwriting.',
      'Use `bw.newLine()` for cross-platform newline compatibility.',
      'Always close writers via try-with-resources so data is flushed to disk.'
    ],
    interviewPerspective: {
      question: 'What is the difference between `flush()` and `close()` on a Java Writer?',
      answer: '`flush()` forces all buffered data currently in RAM to be written out to the physical destination stream while keeping the stream open for further writes. `close()` flushes any remaining buffered data and then permanently closes the underlying file descriptor and releases system handles.',
      trap: '`close()` automatically flushes before closing.'
    },
    practiceQuestions: [
      {
        question: 'How do you configure `FileWriter` to append to an existing file?',
        hint: 'Use the two-argument constructor.',
        solution: '`new FileWriter("filename.txt", true)`.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m7-t9-q1',
        type: 'mcq',
        prompt: 'How do you configure `FileWriter` to append new text to an existing file rather than overwriting it?',
        options: [
          'Pass `true` as second argument: `new FileWriter("log.txt", true)`',
          'Call `fileWriter.setAppend(true)`',
          'Use `new AppendFileWriter("log.txt")`',
          'Set system property `java.io.append=true`'
        ],
        correctAnswer: 0,
        explanation: 'The constructor `FileWriter(String name, boolean append)` accepts a boolean where `true` enables append mode.'
      }
    ]
  },

  'modern-java-nio2': {
    id: 'modern-java-nio2',
    moduleId: 'm7',
    topicNumber: 10,
    title: 'Modern Java NIO.2: Paths, Path & Files',
    shortSummary: 'Leverage the modern java.nio.file API for fast, expressive, and robust filesystem management in Java.',
    whatIsIt: 'NIO.2 (`java.nio.file`) is Java\'s modern file system API replacing legacy `java.io.File`.',
    whyDoWeNeedIt: 'Provides expressive path manipulation, proper exception handling (instead of boolean return codes), and high-performance file operations.',
    syntax: `import java.nio.file.Path;
import java.nio.file.Files;

Path path = Path.of("data", "users.csv");
boolean exists = Files.exists(path);
Files.createDirectories(path.getParent());
Files.writeString(path, "Hello NIO.2");
String text = Files.readString(path);`,
    basicExample: {
      code: `import java.nio.file.Path;

public class PathDemo {
    public static void main(String[] args) {
        Path p = Path.of("projects", "levelup", "src", "Main.java");

        System.out.println("File Name: " + p.getFileName());
        System.out.println("Parent: " + p.getParent());
        System.out.println("Name count: " + p.getNameCount());
        System.out.println("Is Absolute: " + p.isAbsolute());
    }
}`,
      output: `File Name: Main.java
Parent: projects/levelup/src
Name count: 4
Is Absolute: false`
    },
    detailedExample: {
      code: `import java.nio.file.Path;

public class PathResolutionDemo {
    public static void main(String[] args) {
        Path base = Path.of("C:", "workspace");
        Path child = base.resolve("app.log");
        Path relative = base.relativize(Path.of("C:", "workspace", "docs", "readme.txt"));

        System.out.println("Resolved: " + child);
        System.out.println("Relativized: " + relative);
    }
}`,
      output: `Resolved: C:\\workspace\\app.log
Relativized: docs\\readme.txt`
    },
    codeExplanation: [
      'Path.of("a", "b"): Constructs cross-platform filesystem path.',
      'base.resolve("app.log"): Joins child path to base path.',
      'Files utility: Static methods for creating, reading, writing, copying, and deleting files.'
    ],
    visualExplanation: {
      title: 'Java NIO.2 File Operations Hub',
      description: 'Path represents coordinates; Files executes operations on those coordinates.',
      asciiDiagram: `Path Coordinate: Path.of("reports", "2026", "q1.txt")
         ↓
Files.createDirectories(p.getParent()) ──→ Creates missing directory tree
Files.writeString(p, content)          ──→ Writes UTF-8 string to file
Files.copy(src, dest, REPLACE_EXISTING)──→ High-speed native OS copy`
    },
    visualizerType: 'exception-flow',
    commonMistakes: [
      {
        mistake: 'Using legacy `java.io.File` which fails silently by returning `false` instead of throwing informative exceptions.',
        whyItIsWrong: '`File.delete()` or `File.createNewFile()` returns false on failure without telling you why.',
        correction: 'Use `java.nio.file.Files.delete(path)` which throws specific `NoSuchFileException` or `AccessDeniedException`.'
      }
    ],
    importantRules: [
      'Use `Path.of()` and `java.nio.file.Files` for all modern file management.',
      'Use `StandardCopyOption.REPLACE_EXISTING` when overwriting during copy/move.',
      '`Files.createDirectories()` automatically builds entire missing parent folder hierarchies.'
    ],
    interviewPerspective: {
      question: 'Why was NIO.2 introduced to replace legacy `java.io.File`?',
      answer: '1) **Meaningful Exceptions**: Throws specific `IOException`s instead of silent boolean `false`. 2) **Symbolic Links**: Native support for symlinks and POSIX permissions. 3) **Performance**: Uses native OS kernel I/O channels. 4) **Expressiveness**: `Path` API provides rich immutable path arithmetic.',
      trap: 'NIO.2 was introduced in Java 7.'
    },
    practiceQuestions: [
      {
        question: 'Write a one-line NIO.2 statement to read an entire text file into a String.',
        hint: 'Use `Files.readString`.',
        solution: `String content = Files.readString(Path.of("file.txt"));`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m7-t10-q1',
        type: 'mcq',
        prompt: 'Which method in `java.nio.file.Files` is used to create nested parent directories if they do not already exist?',
        options: ['Files.createDirectories(path)', 'Files.createDirectory(path)', 'Files.makeDirs(path)', 'Files.touch(path)'],
        correctAnswer: 0,
        explanation: '`Files.createDirectories(path)` creates any missing parent directories along the entire path hierarchy without failing.'
      }
    ]
  },

  'capstone-student-record-manager': {
    id: 'capstone-student-record-manager',
    moduleId: 'm7',
    topicNumber: 11,
    title: 'Capstone: Student Record File Manager',
    shortSummary: 'Build a production-grade file-backed CRUD system with validation, custom exceptions, and CSV persistence.',
    whatIsIt: 'A comprehensive Capstone application synthesizing data types, loops, methods, custom exceptions, and file persistence.',
    whyDoWeNeedIt: 'Integrates all concepts from Modules 1 through 7 into a complete, working software architecture.',
    syntax: `// Domain Entity with CSV Serialization
class Student {
    int id; String name; double gpa;
    String toCsv() { return id + "," + name + "," + gpa; }
}`,
    basicExample: {
      code: `class StudentRecord {
    private int id;
    private String name;
    private double gpa;

    public StudentRecord(int id, String name, double gpa) {
        this.id = id;
        this.name = name;
        this.gpa = gpa;
    }

    public String toCsv() {
        return id + "," + name + "," + gpa;
    }

    @Override
    public String toString() {
        return String.format("Student #%d: %s (GPA: %.2f)", id, name, gpa);
    }
}

public class RecordDemo {
    public static void main(String[] args) {
        StudentRecord s = new StudentRecord(101, "Alice", 3.95);
        System.out.println(s);
        System.out.println("CSV export: " + s.toCsv());
    }
}`,
      output: `Student #101: Alice (GPA: 3.95)
CSV export: 101,Alice,3.95`
    },
    detailedExample: {
      code: `import java.util.List;
import java.util.ArrayList;

class InvalidStudentDataException extends Exception {
    public InvalidStudentDataException(String msg) { super(msg); }
}

public class StudentPersistenceEngine {
    public static StudentRecord parseLine(String line) throws InvalidStudentDataException {
        String[] parts = line.split(",");
        if (parts.length < 3) throw new InvalidStudentDataException("Malformed CSV line: " + line);

        try {
            int id = Integer.parseInt(parts[0].trim());
            String name = parts[1].trim();
            double gpa = Double.parseDouble(parts[2].trim());
            if (gpa < 0.0 || gpa > 4.0) throw new InvalidStudentDataException("GPA out of range [0.0 - 4.0]: " + gpa);
            return new StudentRecord(id, name, gpa);
        } catch (NumberFormatException e) {
            throw new InvalidStudentDataException("Invalid numeric data in line: " + line);
        }
    }

    public static void main(String[] args) {
        String[] records = {
            "101, Alice Smith, 3.95",
            "102, Bob Johnson, 3.70",
            "103, Charlie Brown, 5.50" // Invalid GPA!
        };

        List<StudentRecord> validStudents = new ArrayList<>();
        for (String r : records) {
            try {
                validStudents.add(parseLine(r));
            } catch (InvalidStudentDataException e) {
                System.out.println("Skipping bad row: " + e.getMessage());
            }
        }

        System.out.println("Successfully loaded " + validStudents.size() + " students.");
    }
}`,
      output: `Skipping bad row: GPA out of range [0.0 - 4.0]: 5.5
Successfully loaded 2 students.`
    },
    codeExplanation: [
      'parseLine(): Validates CSV format and enforces domain constraints (GPA bounds).',
      'Defensive Parsing: Catches custom `InvalidStudentDataException` to skip corrupted rows while processing valid records.',
      'Separation of Concerns: Decouples model representation from persistence parsing logic.'
    ],
    visualExplanation: {
      title: 'Student Record File Manager Architecture',
      description: 'End-to-end ingestion pipeline: CSV Disk File -> Validator -> Domain Model -> Memory Repository.',
      asciiDiagram: `[ CSV Records ]
       ↓
[ CSV Parser & Validator ] ──(Invalid)──→ [ Log & Skip Bad Row ]
       ↓ (Valid)
[ Student Model Instances ]
       ↓
[ Persistent Storage / Output ]`
    },
    visualizerType: 'exception-flow',
    commonMistakes: [
      {
        mistake: 'Crashing the whole file load on a single malformed row.',
        whyItIsWrong: 'Real-world batch processing systems must log and skip corrupt rows rather than failing entire workloads.',
        correction: 'Wrap individual row parsing in try-catch to allow processing to continue.'
      }
    ],
    importantRules: [
      'Validate field boundaries (IDs > 0, GPA between 0.0 and 4.0).',
      'Implement robust CSV escaping and whitespace trimming.',
      'Separate domain model logic from file serialization.'
    ],
    interviewPerspective: {
      question: 'How do you design a resilient file batch ingestion pipeline in Java?',
      answer: '1) Use `BufferedReader` for streaming without RAM overload, 2) Validate each record defensively, 3) Catch record-level validation exceptions and log to an error/dead-letter file without terminating the batch, 4) Use try-with-resources to prevent descriptor leaks.',
      trap: 'Resilient pipelines skip and log bad rows rather than crashing.'
    },
    practiceQuestions: [
      {
        question: 'Write a method to calculate the class average GPA from a `List<StudentRecord>`.',
        hint: 'Sum GPAs and divide by list size.',
        solution: `double sum = 0; for(StudentRecord s: list) sum += s.getGpa(); return list.isEmpty() ? 0 : sum / list.size();`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m7-t11-q1',
        type: 'mcq',
        prompt: 'Why is it important to separate the Student domain model from the File I/O persistence repository?',
        options: [
          'Separation of Concerns: It allows changing the storage format (CSV, JSON, SQL) without altering the domain model',
          'Java does not allow classes with methods to read files',
          'It improves compiler speed by 50%',
          'It prevents StackOverflowError'
        ],
        correctAnswer: 0,
        explanation: 'Separation of Concerns ensures core business entities remain clean and decoupled from external persistence technologies.'
      }
    ]
  }
};
