import { JavaTopicDetail } from './javaTopicsData';

export const JAVA_TOPICS_MODULE_6: Record<string, JavaTopicDetail> = {
  'method-declaration-parameters': {
    id: 'method-declaration-parameters',
    moduleId: 'm6',
    topicNumber: 1,
    title: 'Method Declaration, Parameters & Return Types',
    shortSummary: 'Master modular code organization in Java with methods, parameter lists, return types, and clean signature design.',
    whatIsIt: 'A method in Java is a named block of code grouped together to perform a specific function and promote code reusability.',
    whyDoWeNeedIt: 'Methods modularize programs, adhere to DRY (Don\'t Repeat Yourself), improve readability, and isolate functionality for automated unit testing.',
    syntax: `// Method Signature:
modifier returnType methodName(parameterList) {
    // Body
    return value; // (If returnType is not void)
}`,
    basicExample: {
      code: `public class MethodBasicsDemo {
    public static double calculateTotal(double price, double taxRate) {
        return price + (price * taxRate);
    }

    public static void main(String[] args) {
        double total = calculateTotal(100.0, 0.08);
        System.out.println("Total Amount: $" + total);
    }
}`,
      output: `Total Amount: $108.0`
    },
    detailedExample: {
      code: `public class ValidationMethods {
    public static boolean isValidAge(int age) {
        return age >= 18 && age <= 120;
    }

    public static void printUserStatus(String name, int age) {
        if (isValidAge(age)) {
            System.out.println(name + " is eligible for account creation.");
        } else {
            System.out.println(name + " does not meet age requirements.");
        }
    }

    public static void main(String[] args) {
        printUserStatus("Alice", 22);
        printUserStatus("Bob", 15);
    }
}`,
      output: `Alice is eligible for account creation.
Bob does not meet age requirements.`
    },
    codeExplanation: [
      'public static: Access modifier and static modifier allowing direct class-level invocation.',
      'double calculateTotal(double price, double taxRate): Declares parameter names and required data types.',
      'return: Delivers computed value back to caller and immediately exits method frame.'
    ],
    visualExplanation: {
      title: 'Method Call Stack Frame',
      description: 'Calling a method pushes a new stack frame; returning pops the frame and passes the result back.',
      asciiDiagram: `STACK FRAME LIFECYCLE
┌──────────────────────────────────────┐
│ calculateTotal(100.0, 0.08) Frame    │  ← Pushed on invocation
│ local: price=100.0, taxRate=0.08     │
│ returns: 108.0                       │  ← Popped upon return
└──────────────────┬───────────────────┘
                   ↓
┌──────────────────┴───────────────────┐
│ main() Frame                         │
│ total = 108.0                        │
└──────────────────────────────────────┘`
    },
    visualizerType: 'method-stack',
    commonMistakes: [
      {
        mistake: 'Forgetting return statements on conditional branches in non-void methods.',
        whyItIsWrong: 'Java compiler checks all execution paths; missing a return on any path causes compilation error.',
        correction: 'Ensure every branch (`if`, `else`, etc.) returns a value or throws an exception.'
      }
    ],
    importantRules: [
      'Methods with non-void return types must return a matching value on all paths.',
      'Follow lowerCamelCase for method names (`calculateGpa`, `findUserById`).',
      'Keep methods focused on a single responsibility.'
    ],
    interviewPerspective: {
      question: 'What constitutes a Method Signature in Java?',
      answer: 'In Java, a method signature consists strictly of the **Method Name** and the **Parameter Type List** (order, count, and types of parameters). The return type, access modifiers, and exceptions are NOT part of the signature.',
      trap: 'Return type is NOT part of the method signature in Java.'
    },
    practiceQuestions: [
      {
        question: 'Write a helper method `isEven(int num)` that returns `true` if a number is even, without using `if/else`.',
        hint: 'Return the boolean expression directly.',
        solution: `public static boolean isEven(int num) { return num % 2 == 0; }`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m6-t1-q1',
        type: 'mcq',
        prompt: 'What return type is used when a Java method performs an action but returns no value?',
        options: ['void', 'null', 'empty', 'undefined'],
        correctAnswer: 0,
        explanation: 'The `void` keyword declares that a method does not return a value to the caller.'
      }
    ]
  },

  'call-by-value-memory': {
    id: 'call-by-value-memory',
    moduleId: 'm6',
    topicNumber: 2,
    title: 'Call-by-Value in Java (Primitives vs References)',
    shortSummary: 'Deconstruct Java\'s strictly pass-by-value evaluation model for both primitive variables and object memory references.',
    whatIsIt: 'Java is strictly 100% Pass-by-Value. Whenever an argument is passed to a method, a copy of the bit-pattern value is passed.',
    whyDoWeNeedIt: 'Prevents unintended side effects when passing primitives and explains why object mutations persist while reference reassignments do not.',
    syntax: `// Primitives: Copies literal value (Original unchanged)
void modifyInt(int x) { x = 999; }

// Object References: Copies memory reference address
void modifyArray(int[] arr) { arr[0] = 999; } // Mutates heap data
void reassignArray(int[] arr) { arr = new int[5]; } // Only alters local pointer!`,
    basicExample: {
      code: `public class PassByValueDemo {
    public static void modifyPrimitive(int x) {
        x = 999;
    }

    public static void main(String[] args) {
        int a = 10;
        modifyPrimitive(a);
        System.out.println("a after method: " + a);
    }
}`,
      output: `a after method: 10`
    },
    detailedExample: {
      code: `public class ObjectPassDemo {
    public static void mutateArray(int[] arr) {
        arr[0] = 999; // Modifies shared heap memory
    }

    public static void reassignArray(int[] arr) {
        arr = new int[]{50, 60}; // Reassigns local parameter copy only
    }

    public static void main(String[] args) {
        int[] scores = {10, 20};

        mutateArray(scores);
        System.out.println("scores[0] after mutate: " + scores[0]);

        reassignArray(scores);
        System.out.println("scores[0] after reassign: " + scores[0]);
    }
}`,
      output: `scores[0] after mutate: 999
scores[0] after reassign: 999`
    },
    codeExplanation: [
      'modifyPrimitive: Receives a copy of the integer 10. Modifying parameter variable `x` has zero effect on caller variable `a`.',
      'mutateArray: Receives a copy of the memory pointer `@0x100`. Modifying `arr[0]` changes the shared heap object at `@0x100`.',
      'reassignArray: Overwrites the local parameter pointer to point to a new object. The caller\'s pointer remains unchanged.'
    ],
    visualExplanation: {
      title: 'Pass-by-Value: Primitive Copy vs Reference Pointer Copy',
      description: 'Both pass values by copy. With objects, the copied value is the memory address pointer.',
      asciiDiagram: `CALLER STACK                     METHOD PARAMETER STACK
[ a: 10 ]                  ──→   [ x: 10 ] (Independent copy)
[ scores: @0x100 ]         ──→   [ arr: @0x100 ] (Copied pointer)
                                         ↓
                                HEAP OBJECT [@0x100]: [ 999, 20 ]`
    },
    visualizerType: 'memory-box',
    commonMistakes: [
      {
        mistake: 'Believing Java is "Pass-by-Reference" for objects.',
        whyItIsWrong: 'Java NEVER passes by reference. The object\'s reference pointer itself is copied by value.',
        correction: 'Remember: In Java, everything is strictly Pass-by-Value.'
      }
    ],
    importantRules: [
      'Java is strictly Pass-by-Value in all cases.',
      'Primitives: value is copied directly.',
      'Objects: memory address pointer is copied by value.',
      'Reassigning object parameters inside methods does not change caller references.'
    ],
    interviewPerspective: {
      question: 'Can you write a `swap(int a, int b)` method in Java that swaps two primitive integers in the caller\'s scope?',
      answer: 'No. Because Java is pass-by-value, the method receives copies of the integer values. Swapping the copies inside the method has zero effect on the caller\'s original variables.',
      trap: 'To swap values in Java, you must wrap them in an object, use an array, or perform the swap inline.'
    },
    practiceQuestions: [
      {
        question: 'If `StringBuilder sb = new StringBuilder("A");` is passed to `void foo(StringBuilder s) { s.append("B"); s = new StringBuilder("C"); }`, what does `sb` contain after `foo(sb)`?',
        hint: 'Mutation persists, reassignment does not.',
        solution: '`"AB"`. The `append("B")` mutates the original object on the heap, while `s = new...` only reassigns the local parameter copy.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m6-t2-q1',
        type: 'mcq',
        prompt: 'If you reassign an array parameter inside a method (`arr = new int[10];`), what happens to the caller\'s array?',
        options: [
          'The caller\'s array reference remains completely unchanged',
          'The caller\'s array is resized to length 10',
          'The caller\'s array is wiped to zeros',
          'A NullPointerException is thrown'
        ],
        correctAnswer: 0,
        explanation: 'Because Java passes references by value, reassigning `arr` only modifies the local parameter copy.'
      }
    ]
  },

  'method-overloading-polymorphism': {
    id: 'method-overloading-polymorphism',
    moduleId: 'm6',
    topicNumber: 3,
    title: 'Method Overloading & Compile-Time Polymorphism',
    shortSummary: 'Define multiple methods with the same name but distinct parameter signatures to build clean, intuitive APIs.',
    whatIsIt: 'Method Overloading allows multiple methods in the same class to share the same name with different parameter lists.',
    whyDoWeNeedIt: 'Provides intuitive, clean APIs (like `System.out.println()` which accepts `int`, `String`, `double`, `boolean`, etc.).',
    syntax: `int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
int add(int a, int b, int c) { return a + b + c; }`,
    basicExample: {
      code: `public class OverloadDemo {
    public static int add(int a, int b) { return a + b; }
    public static double add(double a, double b) { return a + b; }

    public static void main(String[] args) {
        System.out.println("int sum: " + add(5, 10));
        System.out.println("double sum: " + add(4.5, 2.5));
    }
}`,
      output: `int sum: 15
double sum: 7.0`
    },
    detailedExample: {
      code: `public class TypePromotionOverload {
    public static void display(double d) {
        System.out.println("display(double) invoked: " + d);
    }

    public static void display(String s) {
        System.out.println("display(String) invoked: " + s);
    }

    public static void main(String[] args) {
        display(42); // int promoted to double automatically!
        display("Java");
    }
}`,
      output: `display(double) invoked: 42.0
display(String) invoked: Java`
    },
    codeExplanation: [
      'add(int, int) vs add(double, double): Compiler resolves method call at compile time based on argument types.',
      'Type Promotion: If no exact `display(int)` exists, Java automatically widens `int` to `double`.'
    ],
    visualExplanation: {
      title: 'Compiler Overload Resolution Decision Tree',
      description: 'The compiler inspects argument types to bind the exact matching signature at compile-time.',
      asciiDiagram: `Call: add(10, 20)
       ↓
[ Compiler inspects arguments: (int, int) ]
       ↓
Matches exact signature: add(int a, int b)
       ↓
Binds call directly in bytecode (Compile-time Polymorphism)`
    },
    visualizerType: 'decision-tree',
    commonMistakes: [
      {
        mistake: 'Attempting to overload methods by changing ONLY the return type (`int compute()` vs `double compute()`).',
        whyItIsWrong: 'Return type is not part of the method signature. Compiler cannot determine which method to invoke if caller ignores the return value.',
        correction: 'Differentiate overloaded methods by changing parameter count, types, or order.'
      }
    ],
    importantRules: [
      'Overloading requires different parameter types, count, or sequence.',
      'Return type alone cannot differentiate overloaded methods.',
      'Overload resolution happens strictly at compile time (Static Binding).'
    ],
    interviewPerspective: {
      question: 'What is the exact search priority order the Java compiler uses for method overload resolution?',
      answer: '1) Exact type match -> 2) Primitive widening / promotion (`int` -> `long` -> `double`) -> 3) Autoboxing / Unboxing (`int` -> `Integer`) -> 4) Varargs (`int...`).',
      trap: 'Varargs has the lowest priority during overload resolution.'
    },
    practiceQuestions: [
      {
        question: 'Can you overload `static` methods in Java?',
        hint: 'Think about compile-time resolution.',
        solution: 'Yes! Static methods can be overloaded just like instance methods as long as parameter signatures differ.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m6-t3-q1',
        type: 'mcq',
        prompt: 'Can you overload a method in Java by changing ONLY its return type?',
        options: [
          'No, return type alone is not part of the method signature',
          'Yes, if the return type is a reference type',
          'Yes, if both methods are public',
          'Yes, in Java 17 and above'
        ],
        correctAnswer: 0,
        explanation: 'The method signature consists strictly of method name and parameter types. Return type is not used for overload resolution.'
      }
    ]
  },

  'variable-scope-shadowing': {
    id: 'variable-scope-shadowing',
    moduleId: 'm6',
    topicNumber: 4,
    title: 'Variable Scope, Lifetime & Shadowing',
    shortSummary: 'Understand block scope, method scope, class scope, and how local variables shadow instance variables.',
    whatIsIt: 'Scope determines where a variable is accessible; Lifetime determines how long it occupies memory.',
    whyDoWeNeedIt: 'Ensures data encapsulation, avoids accidental state corruption, and manages JVM memory efficiently.',
    syntax: `public class Example {
    static int classVar = 1;     // Class scope (Entire app lifetime)
    int instanceVar = 2;         // Instance scope (Object lifetime on Heap)

    void method(int param) {     // Method scope
        int localVar = 3;        // Block scope (Stack frame lifetime)
    }
}`,
    basicExample: {
      code: `public class ScopeDemo {
    public static void main(String[] args) {
        int x = 10;
        if (x > 5) {
            int y = 20; // Block scope
            System.out.println("x + y = " + (x + y));
        }
        // y is destroyed here
        System.out.println("x = " + x);
    }
}`,
      output: `x + y = 30
x = 10`
    },
    detailedExample: {
      code: `public class ShadowingDemo {
    private int count = 100; // Instance variable

    public void updateCount(int count) { // Parameter shadows instance field
        System.out.println("Parameter count: " + count);
        System.out.println("Instance field count: " + this.count);
        this.count = count; // 'this' resolves ambiguity
    }

    public static void main(String[] args) {
        ShadowingDemo demo = new ShadowingDemo();
        demo.updateCount(500);
    }
}`,
      output: `Parameter count: 500
Instance field count: 100`
    },
    codeExplanation: [
      'Block scope: Variables declared inside `{ ... }` are popped from the stack as soon as the block exits.',
      'Shadowing: Parameter `count` hides the field `count`. `this.count` explicitly references the object instance field.'
    ],
    visualExplanation: {
      title: 'Variable Scope Boundaries & Visibility',
      description: 'Inner scopes can access outer variables, but outer scopes cannot access inner variables.',
      asciiDiagram: `┌── Class Scope (static / instance fields)
│   ┌── Method Scope (parameters & method variables)
│   │   ┌── Block Scope (if / for / while blocks)
│   │   │   [ Local block variables live only here ]
│   │   └── Block variables destroyed upon exiting }
│   └── Method variables destroyed upon method return
└── Class variables unloaded when class is unloaded by JVM`
    },
    visualizerType: 'memory-box',
    commonMistakes: [
      {
        mistake: 'Using a local variable before explicit initialization.',
        whyItIsWrong: 'Local variables on the stack do NOT receive default values, causing compilation errors.',
        correction: 'Always initialize local variables before reading them.'
      }
    ],
    importantRules: [
      'Local variables must be explicitly initialized before use.',
      'Variables declared inside a block `{}` are destroyed when the block closes.',
      'Use `this.fieldName` to access instance variables shadowed by parameters.'
    ],
    interviewPerspective: {
      question: 'Where are local variables vs instance variables stored in JVM memory?',
      answer: 'Local variables and method parameters reside in **Stack Frames** allocated per thread. Instance variables reside inside object headers on the **Heap**. Static variables reside in the **Metaspace / Method Area**.',
      trap: 'Primitives inside objects on the heap are stored on the heap, not the stack.'
    },
    practiceQuestions: [
      {
        question: 'What is the default value of an uninitialized instance `boolean` field vs a local `boolean` variable?',
        hint: 'Fields get defaults; local variables do not.',
        solution: 'Instance field defaults to `false`. Local variable has no default and fails compilation if read uninitialized.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m6-t4-q1',
        type: 'mcq',
        prompt: 'What happens if you try to read an uninitialized local variable inside a Java method?',
        options: [
          'It causes a compilation error',
          'It returns 0 or null',
          'It returns random garbage bits',
          'It throws a NullPointerException'
        ],
        correctAnswer: 0,
        explanation: 'Local variables in Java are never assigned default values and must be initialized before they are read.'
      }
    ]
  },

  'recursion-call-stack': {
    id: 'recursion-call-stack',
    moduleId: 'm6',
    topicNumber: 5,
    title: 'Recursion & The Call Stack',
    shortSummary: 'Deconstruct recursive problem solving, execution call frames on the JVM stack, base cases, and StackOverflowError prevention.',
    whatIsIt: 'Recursion is a programming technique where a method solves a problem by invoking smaller instances of itself.',
    whyDoWeNeedIt: 'Natural, elegant solution for tree traversals, graph algorithms (DFS), Divide-and-Conquer (MergeSort, QuickSort), and mathematical series.',
    syntax: `returnType recursiveMethod(params) {
    if (baseCaseCondition) {
        return baseCaseResult; // Mandatory stopping condition!
    }
    return recursiveStep(reducedParams);
}`,
    basicExample: {
      code: `public class FactorialRecursion {
    public static long factorial(int n) {
        if (n <= 1) return 1; // Base Case
        return n * factorial(n - 1); // Recursive Step
    }

    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5));
    }
}`,
      output: `5! = 120`
    },
    detailedExample: {
      code: `public class CallStackTracer {
    public static void countdown(int n) {
        if (n == 0) {
            System.out.println("Base case reached: Blastoff!");
            return;
        }
        System.out.println("Push frame: " + n);
        countdown(n - 1);
        System.out.println("Pop frame: " + n);
    }

    public static void main(String[] args) {
        countdown(3);
    }
}`,
      output: `Push frame: 3
Push frame: 2
Push frame: 1
Base case reached: Blastoff!
Pop frame: 1
Pop frame: 2
Pop frame: 3`
    },
    codeExplanation: [
      'Base Case (n <= 1): Halts recursion and begins unwinding the Call Stack.',
      'Stack Frames: Each recursive invocation allocates a new frame on the thread Call Stack until base case is reached.'
    ],
    visualExplanation: {
      title: 'Call Stack Unwinding Pipeline',
      description: 'Frames stack up in LIFO order during descent and unwrap during return.',
      asciiDiagram: `DESCENT (Push Frames)            ASCENT (Pop & Return)
┌───────────────────────┐        ┌───────────────────────┐
│ factorial(1) = 1      │ ─────→ │ Returns 1             │
├───────────────────────┤        ├───────────────────────┤
│ factorial(2) = 2 * (1)│ ─────→ │ Returns 2             │
├───────────────────────┤        ├───────────────────────┤
│ factorial(3) = 3 * (2)│ ─────→ │ Returns 6             │
└───────────────────────┘        └───────────────────────┘`
    },
    visualizerType: 'method-stack',
    commonMistakes: [
      {
        mistake: 'Missing or incorrect base case.',
        whyItIsWrong: 'Recursion never stops, rapidly pushing frames until thread stack memory is exhausted and JVM throws `StackOverflowError`.',
        correction: 'Always write and test the base case first.'
      }
    ],
    importantRules: [
      'Every recursive method must have at least one valid base case.',
      'The recursive step must strictly move closer to the base case.',
      'For deep iterations (>10,000 steps), prefer iterative loops to avoid `StackOverflowError`.'
    ],
    interviewPerspective: {
      question: 'What is Tail Recursion and does the Java HotSpot JVM optimize it (Tail Call Optimization)?',
      answer: 'Tail recursion is when the recursive call is the absolute final statement executed in the method. Unlike Scala or C compilers, the standard Java JVM does NOT support Tail Call Optimization (TCO) because Java preserves the full stack trace for security inspection.',
      trap: 'Java does not perform automatic tail-call optimization.'
    },
    practiceQuestions: [
      {
        question: 'Write a recursive method `sumDigits(int n)` to sum all digits of an integer.',
        hint: 'Base case `n == 0`, recursive step `(n % 10) + sumDigits(n / 10)`.',
        solution: `public static int sumDigits(int n) { return n == 0 ? 0 : (n % 10) + sumDigits(n / 10); }`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m6-t5-q1',
        type: 'mcq',
        prompt: 'What error is thrown when a recursive method in Java fails to terminate and exhausts thread stack memory?',
        options: [
          'StackOverflowError',
          'OutOfMemoryError',
          'NullPointerException',
          'ArithmeticException'
        ],
        correctAnswer: 0,
        explanation: 'When call frames exceed the thread stack size, the JVM throws `java.lang.StackOverflowError`.'
      }
    ]
  },

  'varargs-variable-arguments': {
    id: 'varargs-variable-arguments',
    moduleId: 'm6',
    topicNumber: 6,
    title: 'Variable Arguments (Varargs ...)',
    shortSummary: 'Create flexible methods that accept arbitrary numbers of arguments using Java\'s Varargs syntax.',
    whatIsIt: 'Varargs (`Type... varName`) allows a method to accept zero, one, or multiple arguments of a given type.',
    whyDoWeNeedIt: 'Eliminates the need for callers to manually wrap arguments into arrays when invoking flexible utilities (like `String.format()` or math aggregates).',
    syntax: `public static void printAll(String... items) {
    // Inside method, 'items' is treated as a String[] array
    for (String item : items) {
        System.out.println(item);
    }
}`,
    basicExample: {
      code: `public class VarargsDemo {
    public static int sum(int... numbers) {
        int total = 0;
        for (int n : numbers) total += n;
        return total;
    }

    public static void main(String[] args) {
        System.out.println("Sum of 0 items: " + sum());
        System.out.println("Sum of 2 items: " + sum(10, 20));
        System.out.println("Sum of 4 items: " + sum(1, 2, 3, 4));
    }
}`,
      output: `Sum of 0 items: 0
Sum of 2 items: 30
Sum of 4 items: 10`
    },
    detailedExample: {
      code: `public class FormattedLogger {
    public static void log(String level, String format, Object... args) {
        System.out.printf("[%s] " + format + "%n", level, args);
    }

    public static void main(String[] args) {
        log("INFO", "Server started on port %d", 8080);
        log("WARN", "Disk usage at %.1f%% on drive %s", 87.5, "C:");
    }
}`,
      output: `[INFO] Server started on port 8080
[WARN] Disk usage at 87.5% on drive C:`
    },
    codeExplanation: [
      'int... numbers: Compiler translates arguments into a new `new int[]{...}` array automatically.',
      'Rule: Varargs parameter must be the last parameter in the argument list.'
    ],
    visualExplanation: {
      title: 'Varargs Compiler Translation',
      description: 'The compiler rewrites varargs calls into array instantiations behind the scenes.',
      asciiDiagram: `Caller: sum(10, 20, 30)
         ↓
Compiler rewrites to: sum(new int[]{ 10, 20, 30 })
         ↓
Method receives: int[] array parameter`
    },
    visualizerType: 'array-index',
    commonMistakes: [
      {
        mistake: 'Declaring a parameter after the varargs parameter (`void log(String... msg, int code)`).',
        whyItIsWrong: 'Java requires the varargs parameter to always be the last parameter in the method signature.',
        correction: 'Place regular parameters first: `void log(int code, String... msg)`.'
      }
    ],
    importantRules: [
      'A method can have at most ONE varargs parameter.',
      'The varargs parameter must be the LAST parameter in the declaration.',
      'Inside the method body, varargs is treated as a standard 1D array.'
    ],
    interviewPerspective: {
      question: 'Can you pass an existing array directly to a Varargs method in Java?',
      answer: 'Yes! If a method takes `int... nums`, you can pass comma-separated values `sum(1, 2, 3)` OR an existing array `sum(new int[]{1, 2, 3})`. The compiler accepts both seamlessly.',
      trap: 'Varargs is backward-compatible with array arguments.'
    },
    practiceQuestions: [
      {
        question: 'Write a varargs method `min(int first, int... rest)` that finds the minimum value, ensuring at least one argument is provided.',
        hint: 'Initialize `min = first` and loop through `rest`.',
        solution: `public static int min(int first, int... rest) { int m = first; for(int x: rest) if(x < m) m = x; return m; }`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m6-t6-q1',
        type: 'mcq',
        prompt: 'Where must a varargs parameter (`int... nums`) appear in a method signature?',
        options: [
          'It must be the last parameter in the parameter list',
          'It must be the first parameter in the parameter list',
          'It can appear anywhere in the parameter list',
          'It can only be used if there are no other parameters'
        ],
        correctAnswer: 0,
        explanation: 'Java requires varargs parameters to always be placed last so the compiler can unambiguously group trailing arguments.'
      }
    ]
  },

  'packages-access-modifiers': {
    id: 'packages-access-modifiers',
    moduleId: 'm6',
    topicNumber: 7,
    title: 'Packages, Imports & Access Modifiers',
    shortSummary: 'Organize code into namespaces with packages, manage imports, and enforce encapsulation using Java\'s 4 access levels.',
    whatIsIt: 'Packages provide hierarchical namespaces; Access Modifiers (`public`, `protected`, default, `private`) control visibility and enforce object encapsulation.',
    whyDoWeNeedIt: 'Prevents class naming collisions, organizes large enterprise codebases, and prevents external code from corrupting internal class state.',
    syntax: `package com.levelup.bank; // Package declaration

import java.util.List;          // Explicit import
import static java.lang.Math.PI;// Static import

// 4 Access Modifiers:
public class Account {
    public String id;          // Visible everywhere
    protected double balance;  // Visible in pkg + subclasses
    String branch;             // Package-private (default)
    private String pin;        // Visible ONLY inside this class
}`,
    basicExample: {
      code: `public class EncapsulationDemo {
    private double balance = 1000.0; // Encapsulated private field

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        }
    }

    public static void main(String[] args) {
        EncapsulationDemo acc = new EncapsulationDemo();
        acc.deposit(250.0);
        System.out.println("Current Balance: $" + acc.getBalance());
    }
}`,
      output: `Deposited: $250.0
Current Balance: $1250.0`
    },
    detailedExample: {
      code: `import static java.lang.Math.sqrt;
import static java.lang.Math.pow;

public class StaticImportDemo {
    public static double calculateHypotenuse(double a, double b) {
        // Static import allows direct method calls without Math. prefix
        return sqrt(pow(a, 2) + pow(b, 2));
    }

    public static void main(String[] args) {
        System.out.println("Hypotenuse (3, 4) = " + calculateHypotenuse(3, 4));
    }
}`,
      output: `Hypotenuse (3, 4) = 5.0`
    },
    codeExplanation: [
      'private field: Direct modification is blocked from outside the class.',
      'public getter/setter: Provides controlled, validated access.',
      'import static: Brings static functions into namespace for concise math formulas.'
    ],
    visualExplanation: {
      title: 'Java 4 Access Modifiers Visibility Matrix',
      description: 'Visibility boundaries from most permissive (public) to most restrictive (private).',
      asciiDiagram: `┌────────────┬────────────┬──────────────┬─────────────┬───────────┐
│ Modifier   │ Same Class │ Same Package │ Subclasses  │ World     │
├────────────┼────────────┼──────────────┼─────────────┼───────────┤
│ public     │    YES     │     YES      │     YES     │    YES    │
│ protected  │    YES     │     YES      │     YES     │    NO     │
│ default    │    YES     │     YES      │     NO      │    NO     │
│ private    │    YES     │     NO       │     NO      │    NO     │
└────────────┴────────────┴──────────────┴─────────────┴───────────┘`
    },
    visualizerType: 'decision-tree',
    commonMistakes: [
      {
        mistake: 'Assuming default (package-private) is more permissive than protected.',
        whyItIsWrong: '`protected` is MORE permissive than default because `protected` allows subclasses in OTHER packages to access the member.',
        correction: 'Remember: public > protected > default > private.'
      }
    ],
    importantRules: [
      'At most one `public` class per `.java` file.',
      'Package statement must be the very first non-comment line in a file.',
      'Keep instance fields `private` to enforce encapsulation.'
    ],
    interviewPerspective: {
      question: 'What is the difference between package-private (default) and protected access in Java?',
      answer: 'Default access (no keyword) allows access ONLY within the declaring package. `protected` allows access within the declaring package PLUS subclasses located in different external packages via inheritance.',
      trap: 'Subclasses in different packages can access protected members, but not default members.'
    },
    practiceQuestions: [
      {
        question: 'What is the package naming convention in professional Java development?',
        hint: 'Think about internet domain names.',
        solution: 'Reversed internet domain name in lowercase (e.g., `com.company.project.module`).'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m6-t7-q1',
        type: 'mcq',
        prompt: 'Which access modifier allows access within the same class, package, and to external subclasses, but not to unrelated external classes?',
        options: ['protected', 'public', 'default (package-private)', 'private'],
        correctAnswer: 0,
        explanation: '`protected` grants access within the same package and to subclasses across packages via inheritance.'
      }
    ]
  },

  'modular-math-utility-toolkit': {
    id: 'modular-math-utility-toolkit',
    moduleId: 'm6',
    topicNumber: 8,
    title: 'Capstone Project: Modular Utility Toolkit',
    shortSummary: 'Synthesize methods, overloading, recursion, array processing, and encapsulation into a production-grade utility toolkit.',
    whatIsIt: 'A cohesive utility library implementing statistics, Euclidean recursion, array defensive copying, and validation.',
    whyDoWeNeedIt: 'Demonstrates professional software design patterns: non-instantiable utility classes, static dispatch, defensive array copies, and robust input validation.',
    syntax: `public final class MathToolkit {
    private MathToolkit() {} // Prevents instantiation
    public static double mean(double... vals) { ... }
    public static double median(double... vals) { ... }
    public static int gcd(int a, int b) { ... }
}`,
    basicExample: {
      code: `import java.util.Arrays;

public final class SimpleToolkit {
    private SimpleToolkit() {}

    public static double mean(double... values) {
        if (values == null || values.length == 0) return 0.0;
        double sum = 0;
        for (double v : values) sum += v;
        return sum / values.length;
    }

    public static void main(String[] args) {
        System.out.println("Mean: " + mean(10.0, 20.0, 30.0, 40.0));
    }
}`,
      output: `Mean: 25.0`
    },
    detailedExample: {
      code: `import java.util.Arrays;

public final class MathToolkit {
    private MathToolkit() {}

    public static double mean(double... values) {
        if (values == null || values.length == 0) return 0.0;
        double sum = 0;
        for (double v : values) sum += v;
        return sum / values.length;
    }

    public static double median(double... values) {
        if (values == null || values.length == 0) return 0.0;
        double[] copy = Arrays.copyOf(values, values.length);
        Arrays.sort(copy);
        int mid = copy.length / 2;
        return (copy.length % 2 == 0) ? (copy[mid - 1] + copy[mid]) / 2.0 : copy[mid];
    }

    public static int gcd(int a, int b) {
        return (b == 0) ? Math.abs(a) : gcd(b, a % b);
    }

    public static void main(String[] args) {
        System.out.println("Mean: " + mean(10, 20, 30, 40));
        System.out.println("Median: " + median(5, 2, 8, 1, 9));
        System.out.println("GCD(48, 18): " + gcd(48, 18));
    }
}`,
      output: `Mean: 25.0
Median: 5.0
GCD(48, 18): 6`
    },
    codeExplanation: [
      'private MathToolkit(): Utility Class Pattern blocks caller instantiation (`new MathToolkit()`).',
      'Arrays.copyOf(values, values.length): Defensive copying prevents mutating caller array order during sorting.',
      'gcd Euclidean recursion: Calculates greatest common divisor in logarithmic $O(\\log(\\min(a, b)))$ time.'
    ],
    visualExplanation: {
      title: 'Modular Utility Toolkit Architecture',
      description: 'Encapsulated static functions operating on defensive data copies with robust edge-case validation.',
      asciiDiagram: `┌──────────────────────────────────────────────┐
│  MathToolkit (final, private constructor)    │
├──────────────────────────────────────────────┤
│  + mean(double... vals)   -> double          │
│  + median(double... vals) -> double          │
│  + gcd(int a, int b)      -> int (Recursive) │
│  + clamp(val, min, max)   -> double          │
└──────────────────────────────────────────────┘`
    },
    visualizerType: 'method-stack',
    commonMistakes: [
      {
        mistake: 'Sorting the input array directly inside the utility method without making a copy.',
        whyItIsWrong: 'Mutates the caller\'s original array in-place, introducing subtle data bugs.',
        correction: 'Always make a defensive copy with `Arrays.copyOf()` before sorting.'
      }
    ],
    importantRules: [
      'Make utility classes `final` with a `private` constructor.',
      'Always make defensive copies of arrays before reordering or sorting.',
      'Validate null or empty parameters at the top of utility methods.'
    ],
    interviewPerspective: {
      question: 'Why does `java.lang.Math` declare a private constructor?',
      answer: '`java.lang.Math` is a pure utility class containing only static constants (`PI`, `E`) and static methods (`sqrt`, `abs`). Creating an object instance of `Math` would waste memory and serve no purpose, so the private constructor blocks instantiation.',
      trap: 'Private constructors prevent subclassing and instantiation.'
    },
    practiceQuestions: [
      {
        question: 'Add a `clamp(double val, double min, double max)` method to the toolkit.',
        hint: 'Return `Math.max(min, Math.min(max, val))`.',
        solution: `public static double clamp(double v, double min, double max) { return Math.max(min, Math.min(max, v)); }`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m6-t8-q1',
        type: 'mcq',
        prompt: 'Why should utility classes with only static methods declare a private constructor?',
        options: [
          'To prevent unnecessary object instantiation since all methods are static',
          'To make the JVM run faster',
          'Because Java requires all classes to have private constructors',
          'To allow other classes to inherit from it'
        ],
        correctAnswer: 0,
        explanation: 'Utility classes provide static operations and do not maintain instance state, so instantiating them is blocked via private constructors.'
      }
    ]
  }
};
