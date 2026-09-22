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
  options?: string[];
  correctAnswer?: number | number[] | string;
  starterCode?: string;
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

export const JAVA_QUESTION_BANKS: Record<string, ModuleAssignmentConfig> = {
  // ==========================================
  // MODULE 1 ASSIGNMENT BANK: Java Basics
  // ==========================================
  m1: {
    moduleId: 'm1',
    title: 'Module 1 Assignment: Java Basics & Environment',
    timeLimitMinutes: 25,
    sampleCount: 12,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'java-m1-q01',
        moduleId: 'm1',
        topicId: 'what-is-java',
        topicTitle: 'What is Java?',
        type: 'mcq',
        points: 5,
        prompt: 'What core feature allows Java to be platform-independent?',
        options: [
          'Java compiles directly to native OS assembly binaries',
          'Java source code compiles into universal bytecode (.class) executed by OS-specific JVMs',
          'Java programs execute inside web browsers only',
          'Java translates source files into C++ header files'
        ],
        correctAnswer: 1,
        explanation: 'Universal bytecode executed by host-specific JVMs enables the Write Once, Run Anywhere (WORA) paradigm.'
      },
      {
        id: 'java-m1-q02',
        moduleId: 'm1',
        topicId: 'jdk-jre-jvm',
        topicTitle: 'JDK, JRE and JVM',
        type: 'mcq',
        points: 5,
        prompt: 'Which component of the Java platform contains the `javac` compiler?',
        options: ['JVM only', 'JRE only', 'JDK (Java Development Kit)', 'Java ClassLoader'],
        correctAnswer: 2,
        explanation: 'The JDK contains the compiler (`javac`), debugger (`jdb`), and packaging tools alongside the JRE.'
      },
      {
        id: 'java-m1-q03',
        moduleId: 'm1',
        topicId: 'first-java-program',
        topicTitle: 'First Java Program',
        type: 'output',
        points: 5,
        prompt: 'What is the exact output of this Java program?',
        codeSnippet: `public class Quiz {
    public static void main(String[] args) {
        System.out.print("Level");
        System.out.println("Up");
        System.out.print("Dev");
    }
}`,
        correctAnswer: 'LevelUp\nDev',
        explanation: '`print("Level")` outputs without newline, `println("Up")` appends "Up" and adds a newline, and `print("Dev")` prints on the next line.'
      },
      {
        id: 'java-m1-q04',
        moduleId: 'm1',
        topicId: 'data-types',
        topicTitle: 'Data Types',
        type: 'mcq',
        points: 5,
        prompt: 'How many bytes does a `double` primitive variable occupy in Java memory?',
        options: ['4 bytes', '8 bytes', '2 bytes', '16 bytes'],
        correctAnswer: 1,
        explanation: 'In Java, `double` is a 64-bit (8-byte) IEEE 754 floating-point primitive.'
      },
      {
        id: 'java-m1-q05',
        moduleId: 'm1',
        topicId: 'data-types',
        topicTitle: 'Data Types',
        type: 'debugging',
        points: 5,
        prompt: 'Identify why this Java line fails to compile: `float rate = 3.14;`',
        options: [
          'Floating-point literals are double by default and require an `f` suffix for float assignment',
          'float is not a primitive type in Java',
          '3.14 exceeds the maximum value of float',
          'Semicolon is not permitted here'
        ],
        correctAnswer: 0,
        explanation: 'Literal `3.14` is a 64-bit `double`. Assigning to a 32-bit `float` requires `3.14f` or explicit type casting.'
      },
      {
        id: 'java-m1-q06',
        moduleId: 'm1',
        topicId: 'input-and-output',
        topicTitle: 'Input and Output',
        type: 'mcq',
        points: 5,
        prompt: 'Why does `sc.nextLine()` immediately return an empty string when called after `sc.nextInt()`?',
        options: [
          'Because nextInt() leaves the trailing newline character in the input stream buffer',
          'Because Scanner closes after nextInt()',
          'Because nextLine() only works with strings',
          'Because of a JVM garbage collection cycle'
        ],
        correctAnswer: 0,
        explanation: '`nextInt()` consumes only numeric digits, leaving `\\n` in the buffer which `nextLine()` consumes as an empty line.'
      },
      {
        id: 'java-m1-q07',
        moduleId: 'm1',
        topicId: 'variables',
        topicTitle: 'Variables',
        type: 'code-tracing',
        points: 5,
        prompt: 'What are the final values of `a` and `b` after this swap logic executes?',
        codeSnippet: `int a = 15;
int b = 30;
a = a + b;
b = a - b;
a = a - b;`,
        correctAnswer: 'a = 30, b = 15',
        explanation: 'Arithmetic swap swaps `a` (becomes 30) and `b` (becomes 15) without a third variable.'
      },
      {
        id: 'java-m1-q08',
        moduleId: 'm1',
        topicId: 'first-java-program',
        topicTitle: 'First Java Program',
        type: 'mcq',
        points: 5,
        prompt: 'Why must the `main` method in Java be declared `static`?',
        options: [
          'So the JVM can invoke it directly without instantiating an object of the class',
          'To make the program execute asynchronously in parallel',
          'Because static methods cannot throw exceptions',
          'To prevent memory garbage collection'
        ],
        correctAnswer: 0,
        explanation: '`static` enables JVM runtime to call `ClassName.main()` before any object instance exists.'
      },
      {
        id: 'java-m1-q09',
        moduleId: 'm1',
        topicId: 'data-types',
        topicTitle: 'Data Types',
        type: 'mcq',
        points: 5,
        prompt: 'What is the value range of a standard `byte` in Java?',
        options: ['-128 to 127', '0 to 255', '-32768 to 32767', '-2147483648 to 2147483647'],
        correctAnswer: 0,
        explanation: 'Java `byte` is an 8-bit signed two\'s complement integer ranging from -128 to 127.'
      },
      {
        id: 'java-m1-q10',
        moduleId: 'm1',
        topicId: 'first-java-program',
        topicTitle: 'First Java Program',
        type: 'code-writing',
        points: 15,
        prompt: 'Write a complete Java class `StudentProfile` that prints a student report with formatted details.',
        starterCode: `public class StudentProfile {
    public static void main(String[] args) {
        String name = "Alex";
        int rollNumber = 101;
        double gpa = 3.85;
        
        // Print formatted summary:
        // Name: Alex | Roll: 101 | GPA: 3.85
    }
}`,
        solutionCode: `public class StudentProfile {
    public static void main(String[] args) {
        String name = "Alex";
        int rollNumber = 101;
        double gpa = 3.85;
        System.out.printf("Name: %s | Roll: %d | GPA: %.2f%n", name, rollNumber, gpa);
    }
}`,
        testCases: [
          {
            input: '',
            expectedOutput: 'Name: Alex | Roll: 101 | GPA: 3.85',
            description: 'Formatted student summary'
          }
        ],
        explanation: 'Demonstrates variable usage and formatted console printing with `printf`.'
      }
    ]
  },

  // ==========================================
  // MODULE 2 ASSIGNMENT BANK: Operators & Conversion
  // ==========================================
  m2: {
    moduleId: 'm2',
    title: 'Module 2 Assignment: Operators & Type Conversion',
    timeLimitMinutes: 25,
    sampleCount: 12,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'java-m2-q01',
        moduleId: 'm2',
        topicId: 'arithmetic-operators',
        topicTitle: 'Arithmetic Operators',
        type: 'output',
        points: 5,
        prompt: 'What is the output of `System.out.println(10 / 4);` in Java?',
        correctAnswer: '2',
        explanation: 'In Java, integer division `10 / 4` truncates the decimal portion, resulting in integer 2.'
      },
      {
        id: 'java-m2-q02',
        moduleId: 'm2',
        topicId: 'type-conversion-casting',
        topicTitle: 'Type Conversion & Casting',
        type: 'mcq',
        points: 5,
        prompt: 'What occurs during narrowing type casting `int x = (int) 3.99;`?',
        options: [
          'The fractional part is truncated, leaving `x = 3`',
          '`x` rounds up to 4',
          'Throws a LossOfPrecisionException',
          '`x` becomes 0'
        ],
        correctAnswer: 0,
        explanation: 'Explicit cast `(int)` to integer truncates the decimal fraction towards zero.'
      },
      {
        id: 'java-m2-q03',
        moduleId: 'm2',
        topicId: 'unary-increment-decrement',
        topicTitle: 'Unary & Increment/Decrement Operators',
        type: 'code-tracing',
        points: 5,
        prompt: 'What is the value of `result` after executing: `int x = 5; int result = x++ + ++x;`?',
        correctAnswer: '12',
        explanation: '`x++` uses 5 (x becomes 6). `++x` increments x to 7 and uses 7. 5 + 7 = 12.'
      },
      {
        id: 'java-m2-q04',
        moduleId: 'm2',
        topicId: 'short-circuit-evaluation',
        topicTitle: 'Short-Circuit Evaluation',
        type: 'mcq',
        points: 5,
        prompt: 'In `if (str != null && str.length() > 0)`, what prevents a `NullPointerException` if `str` is null?',
        options: [
          'Short-circuit `&&` stops evaluating immediately when the left condition is false',
          'Java automatically allocates a dummy string',
          'The JVM wraps string calls in try-catch',
          'Compiler ignores the right side'
        ],
        correctAnswer: 0,
        explanation: 'Because `str != null` evaluates to false, the short-circuit AND operator `&&` skips the right operand.'
      },
      {
        id: 'java-m2-q05',
        moduleId: 'm2',
        topicId: 'operator-precedence-associativity',
        topicTitle: 'Operator Precedence & Associativity',
        type: 'output',
        points: 5,
        prompt: 'What is the output of `System.out.println(10 + 20 + "Java" + 10 + 20);`?',
        correctAnswer: '30Java1020',
        explanation: '`10 + 20` evaluates first to `30`. Then `30 + "Java"` becomes `"30Java"`. Subsequent `+` acts as string concatenation.'
      },
      {
        id: 'java-m2-q06',
        moduleId: 'm2',
        topicId: 'bitwise-shift-operators',
        topicTitle: 'Bitwise & Bit Shift Operators',
        type: 'mcq',
        points: 5,
        prompt: 'What is the result of bitwise shifting `8 >> 2` in Java?',
        options: ['2', '32', '4', '16'],
        correctAnswer: 0,
        explanation: 'Right shift by 2 is equivalent to integer division by $2^2 = 4$. $8 / 4 = 2$.'
      },
      {
        id: 'java-m2-q07',
        moduleId: 'm2',
        topicId: 'relational-logical-operators',
        topicTitle: 'Relational & Logical Operators',
        type: 'mcq',
        points: 5,
        prompt: 'Which operator checks logical XOR (Exclusive OR) between two booleans in Java?',
        options: ['^', '||', '&&', '!='],
        correctAnswer: 0,
        explanation: '`^` is the logical XOR operator in Java, returning true if exactly one operand is true.'
      },
      {
        id: 'java-m2-q08',
        moduleId: 'm2',
        topicId: 'arithmetic-operators',
        topicTitle: 'Arithmetic Operators',
        type: 'code-writing',
        points: 15,
        prompt: 'Write a Java method `calculateSeconds` that takes total seconds and prints hours, minutes, and remaining seconds.',
        starterCode: `public class TimeConverter {
    public static void printTime(int totalSeconds) {
        // Output format: X hrs, Y mins, Z secs
    }
}`,
        solutionCode: `public class TimeConverter {
    public static void printTime(int totalSeconds) {
        int hours = totalSeconds / 3600;
        int remaining = totalSeconds % 3600;
        int minutes = remaining / 60;
        int seconds = remaining % 60;
        System.out.printf("%d hrs, %d mins, %d secs%n", hours, minutes, seconds);
    }
}`,
        testCases: [
          {
            input: '3665',
            expectedOutput: '1 hrs, 1 mins, 5 secs',
            description: '3665 seconds conversion'
          }
        ],
        explanation: 'Uses `/` for quotient units and `%` for remainder extraction.'
      }
    ]
  },

  // ==========================================
  // MODULE 3 ASSIGNMENT BANK: Conditional Statements
  // ==========================================
  m3: {
    moduleId: 'm3',
    title: 'Module 3 Assignment: Conditional Statements & Control Flow',
    timeLimitMinutes: 25,
    sampleCount: 12,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'java-m3-q01',
        moduleId: 'm3',
        topicId: 'if-else-statements',
        topicTitle: 'if, else if, else Structures',
        type: 'output',
        points: 5,
        prompt: 'What is printed by this conditional code?',
        codeSnippet: `int score = 75;
if (score >= 90) System.out.print("A");
else if (score >= 70) System.out.print("B");
else if (score >= 50) System.out.print("C");
else System.out.print("F");`,
        correctAnswer: 'B',
        explanation: '`score >= 70` is the first branch that evaluates to true, so "B" is printed.'
      },
      {
        id: 'java-m3-q02',
        moduleId: 'm3',
        topicId: 'switch-statement',
        topicTitle: 'The switch Statement & Switch Expressions',
        type: 'mcq',
        points: 5,
        prompt: 'What happens in a classic `switch` block if a `case` matches but lacks a `break` statement?',
        options: [
          'Fall-through occurs: execution continues into subsequent cases regardless of their values',
          'Compilation error is thrown',
          'The JVM automatically stops at the next case',
          'A NullPointerException is thrown'
        ],
        correctAnswer: 0,
        explanation: 'Without `break`, execution cascades through following case blocks (fall-through).'
      },
      {
        id: 'java-m3-q03',
        moduleId: 'm3',
        topicId: 'ternary-operator',
        topicTitle: 'The Ternary Operator (?:)',
        type: 'code-tracing',
        points: 5,
        prompt: 'What is the value of `status` after executing: `int score = 45; String status = score >= 50 ? "PASS" : "FAIL";`?',
        correctAnswer: 'FAIL',
        explanation: 'Because `45 >= 50` is false, the expression evaluates to the false branch "FAIL".'
      },
      {
        id: 'java-m3-q04',
        moduleId: 'm3',
        topicId: 'conditional-anti-patterns',
        topicTitle: 'Conditional Pitfalls & Anti-Patterns',
        type: 'debugging',
        points: 5,
        prompt: 'What is the bug in: `String role = "ADMIN"; if (role == "ADMIN") { ... }`?',
        options: [
          'Using `==` compares object references instead of text content; use `role.equals("ADMIN")`',
          'Strings cannot be used in if statements',
          'ADMIN must be lowercase',
          'Semicolon is missing'
        ],
        correctAnswer: 0,
        explanation: 'Always use `.equals()` to compare String contents in Java, as `==` tests memory address identity.'
      },
      {
        id: 'java-m3-q05',
        moduleId: 'm3',
        topicId: 'switch-statement',
        topicTitle: 'The switch Statement & Switch Expressions',
        type: 'mcq',
        points: 5,
        prompt: 'Which Java 14+ feature eliminates the need for `break` statements in switch blocks?',
        options: ['Arrow syntax `case VALUE -> ...`', 'Goto statements', 'Ternary switch', 'Inline functions'],
        correctAnswer: 0,
        explanation: 'Switch arrow syntax `case X -> Y;` executes only the matching branch with zero fall-through.'
      },
      {
        id: 'java-m3-q06',
        moduleId: 'm3',
        topicId: 'if-else-statements',
        topicTitle: 'if, else if, else Structures',
        type: 'code-writing',
        points: 15,
        prompt: 'Write a Java method `calculateElectricityBill` that computes bills based on unit slabs: First 100 units @ $1.50/unit, next 100 units @ $2.50/unit, units above 200 @ $4.00/unit.',
        starterCode: `public class BillCalculator {
    public static double calculateBill(int units) {
        // Compute slab bill
        return 0.0;
    }
}`,
        solutionCode: `public class BillCalculator {
    public static double calculateBill(int units) {
        double bill = 0.0;
        if (units <= 100) {
            bill = units * 1.50;
        } else if (units <= 200) {
            bill = (100 * 1.50) + ((units - 100) * 2.50);
        } else {
            bill = (100 * 1.50) + (100 * 2.50) + ((units - 200) * 4.00);
        }
        return bill;
    }
}`,
        testCases: [
          {
            input: '250',
            expectedOutput: '600.0',
            description: '250 units: (100*1.5) + (100*2.5) + (50*4.0) = 150 + 250 + 200 = 600.0'
          }
        ],
        explanation: 'Demonstrates tiered slab calculation with conditional branches.'
      }
    ]
  },

  // ==========================================
  // MODULE 4 ASSIGNMENT BANK: Loops & Iterations
  // ==========================================
  m4: {
    moduleId: 'm4',
    title: 'Module 4 Assignment: Loops & Iterations',
    timeLimitMinutes: 30,
    sampleCount: 12,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'java-m4-q01',
        moduleId: 'm4',
        topicId: 'for-loop',
        topicTitle: 'The for Loop',
        type: 'output',
        points: 5,
        prompt: 'What is the output of this loop?',
        codeSnippet: `for (int i = 0; i < 5; i += 2) {
    System.out.print(i + " ");
}`,
        correctAnswer: '0 2 4 ',
        explanation: '`i` takes values 0, 2, 4 and terminates when `i` becomes 6.'
      },
      {
        id: 'java-m4-q02',
        moduleId: 'm4',
        topicId: 'do-while-loop',
        topicTitle: 'The do-while Loop',
        type: 'mcq',
        points: 5,
        prompt: 'What is the minimum number of times a `do-while` loop executes?',
        options: ['1 time', '0 times', '2 times', 'Infinite times'],
        correctAnswer: 0,
        explanation: 'Condition is evaluated at loop exit, guaranteeing at least one execution of the body.'
      },
      {
        id: 'java-m4-q03',
        moduleId: 'm4',
        topicId: 'break-continue-labeled',
        topicTitle: 'Break, Continue & Labeled Statements',
        type: 'code-tracing',
        points: 5,
        prompt: 'What is the output of this code?',
        codeSnippet: `for (int i = 1; i <= 5; i++) {
    if (i == 2) continue;
    if (i == 4) break;
    System.out.print(i + " ");
}`,
        correctAnswer: '1 3 ',
        explanation: '`continue` skips 2, prints 1 and 3, and `break` terminates loop at 4.'
      },
      {
        id: 'java-m4-q04',
        moduleId: 'm4',
        topicId: 'nested-loops',
        topicTitle: 'Nested Loops',
        type: 'output',
        points: 5,
        prompt: 'How many times does the print statement execute in `for(int i=0;i<3;i++) for(int j=0;j<4;j++) count++;`?',
        correctAnswer: '12',
        explanation: 'Nested iteration count = outer (3) * inner (4) = 12 times.'
      },
      {
        id: 'java-m4-q05',
        moduleId: 'm4',
        topicId: 'iterative-algorithms',
        topicTitle: 'Iterative Algorithms',
        type: 'mcq',
        points: 5,
        prompt: 'Why is checking divisors up to `i * i <= N` sufficient for primality testing?',
        options: [
          'Any factor greater than sqrt(N) must have a paired factor smaller than sqrt(N)',
          'Java cannot iterate beyond square root',
          'Square roots of primes are always integers',
          'It is an approximation for odd numbers'
        ],
        correctAnswer: 0,
        explanation: 'Factors occur in pairs $(a \\times b = N)$. If no factor exists $\\le \\sqrt{N}$, no factor exists $> \\sqrt{N}$.'
      },
      {
        id: 'java-m4-q06',
        moduleId: 'm4',
        topicId: 'iterative-algorithms',
        topicTitle: 'Iterative Algorithms',
        type: 'code-writing',
        points: 15,
        prompt: 'Write a Java method `isPrime` that returns true if `n` is prime in $O(\\sqrt{N})$ time.',
        starterCode: `public class PrimeCheck {
    public static boolean isPrime(int n) {
        // Implement O(sqrt(N)) primality check
        return false;
    }
}`,
        solutionCode: `public class PrimeCheck {
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
}`,
        testCases: [
          { input: '29', expectedOutput: 'true', description: '29 is prime' },
          { input: '15', expectedOutput: 'false', description: '15 is composite' }
        ],
        explanation: 'Checks divisors up to `i * i <= n`.'
      }
    ]
  },

  // ==========================================
  // MODULE 5 ASSIGNMENT BANK: Arrays & Strings
  // ==========================================
  m5: {
    moduleId: 'm5',
    title: 'Module 5 Assignment: Arrays & String Handling',
    timeLimitMinutes: 30,
    sampleCount: 12,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'java-m5-q01',
        moduleId: 'm5',
        topicId: 'string-fundamentals-pool',
        topicTitle: 'String Fundamentals & Immutability',
        type: 'mcq',
        points: 5,
        prompt: 'Why does `s1 == s2` evaluate to `true` for `String s1 = "Java"; String s2 = "Java";`?',
        options: [
          'Both references point to the same shared object in the String Constant Pool',
          'Java overrides `==` for String classes',
          'Strings are primitive value types',
          'The compiler turns strings into integers'
        ],
        correctAnswer: 0,
        explanation: 'String literals are cached and reused inside the String Constant Pool in Heap memory.'
      },
      {
        id: 'java-m5-q02',
        moduleId: 'm5',
        topicId: 'core-array-operations',
        topicTitle: 'Core Array Operations & Search',
        type: 'mcq',
        points: 5,
        prompt: 'What is the prerequisite for executing Binary Search on an array?',
        options: [
          'The array elements must be in sorted order',
          'The array must contain unique numbers only',
          'The array length must be a power of 2',
          'The array must be dynamically resizable'
        ],
        correctAnswer: 0,
        explanation: 'Binary Search relies on ordered elements to halve the search window at each step.'
      },
      {
        id: 'java-m5-q03',
        moduleId: 'm5',
        topicId: 'stringbuilder-performance',
        topicTitle: 'StringBuilder vs Concatenation',
        type: 'mcq',
        points: 5,
        prompt: 'Why should you prefer `StringBuilder` over `+` string concatenation inside loops?',
        options: [
          'StringBuilder mutates an internal buffer in O(N) time, avoiding O(N^2) garbage object creations',
          'StringBuilder is automatically multi-threaded',
          'String concatenation throws NullPointerException in loops',
          'StringBuilder uses zero memory'
        ],
        correctAnswer: 0,
        explanation: 'Because String is immutable, `+` inside a loop copies characters repeatedly, creating $O(N^2)$ intermediate garbage objects.'
      },
      {
        id: 'java-m5-q04',
        moduleId: 'm5',
        topicId: 'string-methods-api',
        topicTitle: 'Essential String Methods',
        type: 'output',
        points: 5,
        prompt: 'What is the output of `"LevelUpDev".substring(0, 5)`?',
        correctAnswer: 'Level',
        explanation: '`substring(0, 5)` extracts characters from index 0 up to index 4 (5 is exclusive).'
      },
      {
        id: 'java-m5-q05',
        moduleId: 'm5',
        topicId: 'array-string-algorithms',
        topicTitle: 'Array & String Problem Solving',
        type: 'code-writing',
        points: 15,
        prompt: 'Write a Java method `isPalindrome` that checks if a string is a palindrome using two pointers in $O(N)$ time and $O(1)$ space.',
        starterCode: `public class PalindromeCheck {
    public static boolean isPalindrome(String s) {
        // Two-pointer palindrome check
        return false;
    }
}`,
        solutionCode: `public class PalindromeCheck {
    public static boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left++) != s.charAt(right--)) return false;
        }
        return true;
    }
}`,
        testCases: [
          { input: 'radar', expectedOutput: 'true', description: 'radar is palindrome' },
          { input: 'hello', expectedOutput: 'false', description: 'hello is not palindrome' }
        ],
        explanation: 'Two-pointer palindrome verification.'
      }
    ]
  },

  // ==========================================
  // MODULE 6 ASSIGNMENT BANK: Methods & Structure
  // ==========================================
  m6: {
    moduleId: 'm6',
    title: 'Module 6 Assignment: Methods & Program Structure',
    timeLimitMinutes: 30,
    sampleCount: 12,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'java-m6-q01',
        moduleId: 'm6',
        topicId: 'call-by-value-memory',
        topicTitle: 'Call-by-Value in Java',
        type: 'mcq',
        points: 5,
        prompt: 'What happens if you reassign an array parameter inside a Java method (`arr = new int[5];`)?',
        options: [
          'The caller\'s array reference remains completely unchanged',
          'The caller\'s array is wiped to zeros',
          'The caller\'s array is resized to length 5',
          'A NullPointerException is thrown'
        ],
        correctAnswer: 0,
        explanation: 'Because Java passes references by value, reassigning `arr` only modifies the local parameter copy.'
      },
      {
        id: 'java-m6-q02',
        moduleId: 'm6',
        topicId: 'method-overloading-polymorphism',
        topicTitle: 'Method Overloading',
        type: 'mcq',
        points: 5,
        prompt: 'Can you overload a method in Java by changing ONLY its return type?',
        options: [
          'No, return type alone is not part of the method signature',
          'Yes, if the return type is a reference type',
          'Yes, in Java 17+',
          'Yes, if the method is static'
        ],
        correctAnswer: 0,
        explanation: 'Method signature consists only of method name and parameter types. Return type is not considered.'
      },
      {
        id: 'java-m6-q03',
        moduleId: 'm6',
        topicId: 'recursion-call-stack',
        topicTitle: 'Recursion & The Call Stack',
        type: 'output',
        points: 5,
        prompt: 'What error is thrown when a recursive method lacks a base case and exhausts stack memory?',
        correctAnswer: 'StackOverflowError',
        explanation: 'When call frames exceed maximum thread stack capacity, JVM throws `java.lang.StackOverflowError`.'
      },
      {
        id: 'java-m6-q04',
        moduleId: 'm6',
        topicId: 'packages-access-modifiers',
        topicTitle: 'Packages & Access Modifiers',
        type: 'mcq',
        points: 5,
        prompt: 'Which access modifier allows access within package + subclasses in other packages, but not unrelated external classes?',
        options: ['protected', 'public', 'default (package-private)', 'private'],
        correctAnswer: 0,
        explanation: '`protected` grants access within package plus inheritance access to external subclasses.'
      },
      {
        id: 'java-m6-q05',
        moduleId: 'm6',
        topicId: 'modular-math-utility-toolkit',
        topicTitle: 'Modular Utility Toolkit',
        type: 'code-writing',
        points: 15,
        prompt: 'Write a recursive method `gcd(int a, int b)` implementing the Euclidean algorithm for greatest common divisor.',
        starterCode: `public class MathUtils {
    public static int gcd(int a, int b) {
        // Recursive Euclidean GCD
        return 0;
    }
}`,
        solutionCode: `public class MathUtils {
    public static int gcd(int a, int b) {
        return (b == 0) ? Math.abs(a) : gcd(b, a % b);
    }
}`,
        testCases: [
          { input: '48, 18', expectedOutput: '6', description: 'GCD of 48 and 18 is 6' }
        ],
        explanation: 'Recursive Euclidean GCD algorithm.'
      }
    ]
  },

  // ==========================================
  // MODULE 7 ASSIGNMENT BANK: Exception & File Handling
  // ==========================================
  m7: {
    moduleId: 'm7',
    title: 'Module 7 Assignment: Exception & File Handling',
    timeLimitMinutes: 30,
    sampleCount: 12,
    passingScorePercent: 70,
    questionBank: [
      {
        id: 'java-m7-q01',
        moduleId: 'm7',
        topicId: 'exception-hierarchy-checked-unchecked',
        topicTitle: 'The Exception Hierarchy',
        type: 'mcq',
        points: 5,
        prompt: 'Which of the following is an Unchecked (Runtime) Exception in Java?',
        options: ['NullPointerException', 'IOException', 'FileNotFoundException', 'SQLException'],
        correctAnswer: 0,
        explanation: '`NullPointerException` inherits from `RuntimeException`, making it an unchecked exception.'
      },
      {
        id: 'java-m7-q02',
        moduleId: 'm7',
        topicId: 'try-with-resources-autocloseable',
        topicTitle: 'Try-With-Resources',
        type: 'mcq',
        points: 5,
        prompt: 'What interface must an object implement to be declared inside a try-with-resources header?',
        options: ['java.lang.AutoCloseable', 'java.io.Serializable', 'java.lang.Runnable', 'java.lang.Cloneable'],
        correctAnswer: 0,
        explanation: 'Try-with-resources requires resources to implement `java.lang.AutoCloseable`.'
      },
      {
        id: 'java-m7-q03',
        moduleId: 'm7',
        topicId: 'writing-files-writer-printwriter',
        topicTitle: 'Writing Files',
        type: 'mcq',
        points: 5,
        prompt: 'How do you enable append mode in `FileWriter` so it preserves existing file data?',
        options: [
          'Pass `true` as second argument: `new FileWriter("file.txt", true)`',
          'Call `fileWriter.setAppend(true)`',
          'Use `AppendFileWriter`',
          'Set system property `java.io.append=true`'
        ],
        correctAnswer: 0,
        explanation: 'Constructor `FileWriter(String filename, boolean append)` enables append mode when `true` is passed.'
      },
      {
        id: 'java-m7-q04',
        moduleId: 'm7',
        topicId: 'reading-files-buffered-scanner',
        topicTitle: 'Reading Files',
        type: 'output',
        points: 5,
        prompt: 'What value does `BufferedReader.readLine()` return when EOF (End of File) is reached?',
        correctAnswer: 'null',
        explanation: '`readLine()` returns `null` to signal end of stream.'
      },
      {
        id: 'java-m7-q05',
        moduleId: 'm7',
        topicId: 'capstone-student-record-manager',
        topicTitle: 'Capstone Student Record Manager',
        type: 'code-writing',
        points: 15,
        prompt: 'Write a Java method `parseStudentRecord` that parses a CSV line "101,Alice,3.95" and returns a formatted string "Student #101: Alice (GPA: 3.95)".',
        starterCode: `public class RecordParser {
    public static String parseStudentRecord(String csvLine) {
        // Parse CSV and return formatted record
        return "";
    }
}`,
        solutionCode: `public class RecordParser {
    public static String parseStudentRecord(String csvLine) {
        String[] parts = csvLine.split(",");
        int id = Integer.parseInt(parts[0].trim());
        String name = parts[1].trim();
        double gpa = Double.parseDouble(parts[2].trim());
        return String.format("Student #%d: %s (GPA: %.2f)", id, name, gpa);
    }
}`,
        testCases: [
          {
            input: '101,Alice,3.95',
            expectedOutput: 'Student #101: Alice (GPA: 3.95)',
            description: 'Parse valid CSV row'
          }
        ],
        explanation: 'Demonstrates CSV string parsing and formatted output.'
      }
    ]
  }
};
