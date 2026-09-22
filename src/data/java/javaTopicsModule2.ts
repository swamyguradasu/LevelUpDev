import { JavaTopicDetail } from './javaTopicsData';

export const JAVA_TOPICS_MODULE_2: Record<string, JavaTopicDetail> = {
  'arithmetic-operators': {
    id: 'arithmetic-operators',
    moduleId: 'm2',
    topicNumber: 1,
    title: 'Arithmetic Operators',
    shortSummary: 'Addition, Subtraction, Multiplication, Division (integer vs floating point), and Modulus (%).',
    whatIsIt: 'Arithmetic operators perform basic mathematical operations on numeric primitives (+, -, *, /, %).',
    whyDoWeNeedIt: 'Mathematical computations are fundamental to data calculations, score tallies, geometric algorithms, and index manipulations.',
    syntax: `int sum = a + b;
int diff = a - b;
int prod = a * b;
int intDiv = 10 / 3;     // 3 (integer division truncates decimal)
double realDiv = 10.0 / 3;// 3.3333333333333335
int remainder = 10 % 3; // 1 (modulus / remainder)`,
    basicExample: {
      code: `public class ArithmeticDemo {
    public static void main(String[] args) {
        int a = 15;
        int b = 4;
        
        System.out.println("a + b = " + (a + b));
        System.out.println("a - b = " + (a - b));
        System.out.println("a * b = " + (a * b));
        System.out.println("a / b = " + (a / b)); // 3
        System.out.println("a % b = " + (a % b)); // 3
    }
}`,
      output: `a + b = 19
a - b = 11
a * b = 60
a / b = 3
a % b = 3`
    },
    detailedExample: {
      code: `public class TimeConverter {
    public static void main(String[] args) {
        int totalSeconds = 3665;
        
        int hours = totalSeconds / 3600;
        int remainingSeconds = totalSeconds % 3600;
        int minutes = remainingSeconds / 60;
        int seconds = remainingSeconds % 60;
        
        System.out.printf("%d seconds = %d hrs, %d mins, %d secs%n", 
                          totalSeconds, hours, minutes, seconds);
    }
}`,
      output: `3665 seconds = 1 hrs, 1 mins, 5 secs`
    },
    codeExplanation: [
      'totalSeconds / 3600: Calculates complete hours by integer division.',
      'totalSeconds % 3600: Gets leftover seconds after taking out full hours.',
      'remainingSeconds / 60: Computes complete minutes.',
      'remainingSeconds % 60: Computes final remaining seconds.'
    ],
    visualExplanation: {
      title: 'Integer Division vs Modulus',
      description: 'Division yields the quotient; Modulus yields the leftover remainder.',
      asciiDiagram: `15 / 4 = 3 (Quotient)
     ───
  4 │ 15
    │ 12
     ───
       3 (Remainder -> 15 % 4 = 3)`
    },
    visualizerType: 'memory-box',
    commonMistakes: [
      {
        mistake: 'Dividing two integers expecting a decimal (e.g., `double d = 5 / 2;` results in `2.0`).',
        whyItIsWrong: '`5 / 2` evaluates as integer division (2) first, before being assigned to double.',
        correction: 'Cast at least one operand: `double d = 5.0 / 2;` or `(double) 5 / 2`.'
      },
      {
        mistake: 'Dividing by integer 0 (`x / 0`).',
        whyItIsWrong: 'Throws runtime `ArithmeticException: / by zero`.',
        correction: 'Check for non-zero denominator before dividing.'
      }
    ],
    importantRules: [
      'Integer division truncates towards zero (fractional parts discarded).',
      'Division by integer 0 throws `ArithmeticException`.',
      'Floating-point division by 0.0 results in `Infinity` or `NaN` (does not throw exception).'
    ],
    interviewPerspective: {
      question: 'What is the result of `-15 % 4` vs `15 % -4` in Java?',
      answer: '`-15 % 4 = -3` (sign of remainder matches numerator/dividend). `15 % -4 = 3` (sign of divisor is ignored in Java % operator).',
      trap: 'Remember the rule: In Java, the sign of the result of `%` always matches the left operand (dividend).'
    },
    practiceQuestions: [
      {
        question: 'Extract the last digit of an integer `n = 4879`.',
        hint: 'Use modulus 10.',
        solution: '`int lastDigit = n % 10;` (yields 9).'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m2-t1-q1',
        type: 'output',
        prompt: 'What will be printed by: `System.out.println(17 / 5 + " " + 17 % 5);`?',
        codeSnippet: `System.out.println(17 / 5 + " " + 17 % 5);`,
        correctAnswer: '3 2',
        explanation: '17 / 5 performs integer division giving 3. 17 % 5 gives the remainder 2.'
      }
    ]
  },

  'relational-operators': {
    id: 'relational-operators',
    moduleId: 'm2',
    topicNumber: 2,
    title: 'Relational Operators',
    shortSummary: 'Comparison operators (==, !=, >, <, >=, <=) returning boolean outcomes.',
    whatIsIt: 'Relational (comparison) operators compare two operand values and return a boolean result (`true` or `false`).',
    whyDoWeNeedIt: 'Used in conditional statements (`if`) and loop termination conditions to control branching based on value relationships.',
    syntax: `boolean isEqual = (a == b);
boolean isNotEqual = (a != b);
boolean isGreater = (a > b);
boolean isLesser = (a < b);
boolean isGreaterOrEqual = (a >= b);
boolean isLesserOrEqual = (a <= b);`,
    basicExample: {
      code: `public class RelationalDemo {
    public static void main(String[] args) {
        int age = 18;
        System.out.println("Eligible to vote (age >= 18): " + (age >= 18));
        System.out.println("Is minor (age < 18): " + (age < 18));
        System.out.println("Exact 18 (age == 18): " + (age == 18));
    }
}`,
      output: `Eligible to vote (age >= 18): true
Is minor (age < 18): false
Exact 18 (age == 18): true`
    },
    detailedExample: {
      code: `public class PassEligibility {
    public static void main(String[] args) {
        int marks = 75;
        int passingMarks = 40;
        int distinctionMarks = 75;
        
        boolean isPassed = marks >= passingMarks;
        boolean isDistinction = marks >= distinctionMarks;
        
        System.out.println("Passed: " + isPassed);
        System.out.println("Distinction: " + isDistinction);
    }
}`,
      output: `Passed: true
Distinction: true`
    },
    codeExplanation: [
      'marks >= passingMarks: Compares 75 >= 40, evaluates to boolean true.',
      'marks >= distinctionMarks: Compares 75 >= 75, evaluates to boolean true.'
    ],
    visualExplanation: {
      title: 'Relational Comparison Evaluation',
      description: 'Values enter comparison operator -> evaluates to true / false.',
      asciiDiagram: `  [ 75 ] >= [ 40 ]
         ↓
  Evaluates condition
         ↓
    [ true ]`
    },
    visualizerType: 'decision-tree',
    commonMistakes: [
      {
        mistake: 'Using assignment `=` instead of equality comparison `==` in conditions.',
        whyItIsWrong: '`=` assigns a value; `==` compares two values.',
        correction: 'Use `==` for comparison: `if (score == 100)`.'
      },
      {
        mistake: 'Comparing Strings with `==` instead of `.equals()`.',
        whyItIsWrong: '`==` on objects compares memory addresses (reference equality), not string text content.',
        correction: 'Always compare String contents with `str1.equals(str2)`.'
      }
    ],
    importantRules: [
      'Relational operators always return a `boolean` (`true` or `false`).',
      'Primitives are compared by value.',
      'Strings and Objects must be compared using `.equals()` method.'
    ],
    interviewPerspective: {
      question: 'What is the difference between `==` and `.equals()` in Java?',
      answer: '`==` compares primitive values or object memory reference addresses. `.equals()` is a method that evaluates whether the logical content of two objects is identical.',
      trap: 'String literal pool may make `==` return true for identical string literals, but for `new String("abc")` it will return false.'
    },
    practiceQuestions: [
      {
        question: 'What is the output of `System.out.println(10 >= 10);` and `System.out.println(10 > 10);`?',
        hint: 'Compare inclusive vs exclusive inequality.',
        solution: '`true` (since 10 is equal to 10) and `false` (since 10 is not strictly greater than 10).'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m2-t2-q1',
        type: 'mcq',
        prompt: 'Which operator checks if two primitive values are NOT equal in Java?',
        options: ['<>', '!=', '==!', '!=='],
        correctAnswer: 1,
        explanation: 'In Java, `!=` is the inequality operator.'
      }
    ]
  },

  'logical-operators': {
    id: 'logical-operators',
    moduleId: 'm2',
    topicNumber: 3,
    title: 'Logical Operators',
    shortSummary: 'Logical AND (&&), Logical OR (||), Logical NOT (!), and short-circuit evaluation.',
    whatIsIt: 'Logical operators combine multiple boolean expressions. Java supports short-circuit operators (`&&`, `||`) and the unary negation operator (`!`).',
    whyDoWeNeedIt: 'Enables complex real-world decision rules (e.g. "User must be logged in AND have admin rights OR be superuser").',
    syntax: `boolean andResult = (condition1 && condition2); // true if BOTH are true
boolean orResult  = (condition1 || condition2); // true if AT LEAST ONE is true
boolean notResult = !condition1;                // inverts boolean value`,
    basicExample: {
      code: `public class LogicalDemo {
    public static void main(String[] args) {
        int age = 22;
        boolean hasLicense = true;
        
        boolean canDrive = (age >= 18) && hasLicense;
        System.out.println("Can Drive: " + canDrive);
        
        boolean isWeekend = false;
        boolean isHoliday = true;
        boolean canRest = isWeekend || isHoliday;
        System.out.println("Can Rest: " + canRest);
    }
}`,
      output: `Can Drive: true
Can Rest: true`
    },
    detailedExample: {
      code: `public class ShortCircuitDemo {
    public static void main(String[] args) {
        int count = 0;
        int total = 100;
        
        // Short-circuit AND prevents division by zero!
        if (count != 0 && (total / count) > 10) {
            System.out.println("Average is high");
        } else {
            System.out.println("Safe execution: avoided division by zero!");
        }
    }
}`,
      output: `Safe execution: avoided division by zero!`
    },
    codeExplanation: [
      'count != 0 && (total / count) > 10: First condition (0 != 0) evaluates to false.',
      'Because `&&` requires both to be true, the JVM "short-circuits" and NEVER evaluates `(total / count)`, avoiding a crash.'
    ],
    visualExplanation: {
      title: 'Short-Circuit Evaluation Mechanism',
      description: '&& stops evaluating immediately when first operand is false; || stops when first operand is true.',
      asciiDiagram: `Condition A && Condition B:
[ False ] ──> (Short-circuit!) ──> Result: False (Condition B is NEVER evaluated)

Condition A || Condition B:
[ True  ] ──> (Short-circuit!) ──> Result: True  (Condition B is NEVER evaluated)`
    },
    visualizerType: 'decision-tree',
    commonMistakes: [
      {
        mistake: 'Using bitwise `&` or `|` instead of logical short-circuit `&&` or `||` in boolean conditions.',
        whyItIsWrong: '`&` and `|` always evaluate both sides even if the left side is already false/true, losing the safety of short-circuiting.',
        correction: 'Always use `&&` and `||` for conditional logic.'
      }
    ],
    importantRules: [
      '`&&` returns `true` only if both operands are true.',
      '`||` returns `true` if at least one operand is true.',
      '`!` inverts `true` to `false` and vice versa.',
      'Short-circuiting skips the right-hand expression if the outcome is already guaranteed.'
    ],
    interviewPerspective: {
      question: 'What is the difference between `&&` and `&` when used with boolean operands?',
      answer: '`&&` is a short-circuit logical operator that skips evaluating the second operand if the first is false. `&` is a non-short-circuit operator that strictly evaluates both operands regardless of the first operand\'s value.',
      trap: 'Using `&` when guarding against null checks like `obj != null & obj.method()` will throw a `NullPointerException`.'
    },
    practiceQuestions: [
      {
        question: 'Given `int x = 5, y = 10;`, what is the value of `(x > 3) && (y++ > 10)` and what is `y` after execution?',
        hint: 'Evaluate left side first, then right side.',
        solution: '`x > 3` is true. `y++ > 10` compares `10 > 10` (false), then increments `y` to 11. Final result is `false`, and `y = 11`.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m2-t3-q1',
        type: 'mcq',
        prompt: 'In the expression `false && (10 / 0 == 0)`, what happens during execution?',
        options: [
          'Throws ArithmeticException',
          'Returns false without error due to short-circuit evaluation',
          'Compilation error',
          'Returns true'
        ],
        correctAnswer: 1,
        explanation: 'Because the left operand of `&&` is `false`, Java short-circuits and does not evaluate `(10 / 0 == 0)`, safely returning `false`.'
      }
    ]
  },

  'assignment-operators': {
    id: 'assignment-operators',
    moduleId: 'm2',
    topicNumber: 4,
    title: 'Assignment Operators',
    shortSummary: 'Simple assignment (=) and compound shorthand operators (+=, -=, *=, /=, %=).',
    whatIsIt: 'Assignment operators assign values to variables. Compound assignment operators combine an arithmetic operation with assignment in a single concise step.',
    whyDoWeNeedIt: 'Reduces boilerplate code (`x += 5` vs `x = x + 5`) and includes implicit type casting in Java.',
    syntax: `x = 10;
x += 5;   // Equivalent to x = x + 5
x -= 3;   // Equivalent to x = x - 3
x *= 2;   // Equivalent to x = x * 2
x /= 4;   // Equivalent to x = x / 4
x %= 3;   // Equivalent to x = x % 3`,
    basicExample: {
      code: `public class AssignmentDemo {
    public static void main(String[] args) {
        int balance = 1000;
        
        balance += 250; // Deposit
        System.out.println("After Deposit: " + balance);
        
        balance -= 100; // Withdrawal
        System.out.println("After Withdrawal: " + balance);
    }
}`,
      output: `After Deposit: 1250
After Withdrawal: 1150`
    },
    detailedExample: {
      code: `public class CompoundImplicitCast {
    public static void main(String[] args) {
        byte b = 10;
        // b = b + 5; // Compilation Error! (b + 5 becomes int)
        b += 5;        // Legal! Implicitly casts to (byte)(b + 5)
        
        System.out.println("Byte value after compound +=: " + b);
    }
}`,
      output: `Byte value after compound +=: 15`
    },
    codeExplanation: [
      'b += 5: The compound operator performs an automatic cast under the hood: `b = (byte)(b + 5)`.',
      'This avoids explicit casting syntax for smaller primitive types.'
    ],
    visualExplanation: {
      title: 'Compound Assignment Pipeline',
      description: 'Read current value -> perform arithmetic -> write back to memory box.',
      asciiDiagram: `int count = 10;
count += 5;
[ Memory Box: 10 ] ──> + 5 ──> [ Memory Box: 15 ]`
    },
    visualizerType: 'memory-box',
    commonMistakes: [
      {
        mistake: 'Writing `=+` instead of `+=`.',
        whyItIsWrong: '`x =+ 5` assigns positive 5 (+5) to `x` instead of adding 5 to `x`.',
        correction: 'Always place operator before equal sign: `x += 5`.'
      }
    ],
    importantRules: [
      'Compound operators (`+=`, `-=`, etc.) perform implicit type casting.',
      'Assignment operator evaluates from right to left.'
    ],
    interviewPerspective: {
      question: 'Why does `short s = 5; s = s + 5;` fail to compile, but `s += 5;` compiles successfully?',
      answer: 'In Java, arithmetic operations on types smaller than int (byte, short, char) automatically promote operands to `int`. `s + 5` evaluates to `int`, which cannot be assigned to `short` without explicit casting. The compound operator `s += 5` automatically embeds an implicit cast: `s = (short)(s + 5)`.',
      trap: 'Always remember compound assignment has built-in type casting.'
    },
    practiceQuestions: [
      {
        question: 'What is the final value of `int a = 8; a *= 2 + 3;`?',
        hint: 'Evaluate the right-hand expression first.',
        solution: '`2 + 3 = 5`. Then `a *= 5` means `a = 8 * 5 = 40`.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m2-t4-q1',
        type: 'output',
        prompt: 'What is the output of: `int a = 12; a /= 3; System.out.println(a);`?',
        codeSnippet: `int a = 12;\na /= 3;\nSystem.out.println(a);`,
        correctAnswer: '4',
        explanation: '`a /= 3` evaluates `a = a / 3` which divides 12 by 3 giving 4.'
      }
    ]
  },

  'increment-decrement-operators': {
    id: 'increment-decrement-operators',
    moduleId: 'm2',
    topicNumber: 5,
    title: 'Increment and Decrement Operators',
    shortSummary: 'Prefix (++x, --x) vs Postfix (x++, x--) execution order and variable state changes.',
    whatIsIt: 'Unary operators that increase or decrease an integer variable by 1. Prefix (`++x`) modifies before evaluating; Postfix (`x++`) evaluates current value first and modifies after.',
    whyDoWeNeedIt: 'Used heavily in loop counters, sequence iterators, and pointer index advances.',
    syntax: `int a = 5;
int pre  = ++a; // a becomes 6, pre is assigned 6 (Increment then Use)

int b = 5;
int post = b++; // post is assigned 5, b becomes 6 (Use then Increment)`,
    basicExample: {
      code: `public class IncDecDemo {
    public static void main(String[] args) {
        int x = 10;
        System.out.println("Original x: " + x);
        System.out.println("Postfix x++: " + (x++)); // Prints 10, then x becomes 11
        System.out.println("After x++: " + x);       // Prints 11
        
        System.out.println("Prefix ++x: " + (++x));  // x becomes 12, prints 12
    }
}`,
      output: `Original x: 10
Postfix x++: 10
After x++: 11
Prefix ++x: 12`
    },
    detailedExample: {
      code: `public class ComplexIncDec {
    public static void main(String[] args) {
        int a = 5;
        int b = 10;
        int result = a++ + ++b - --a;
        // Step 1: a++ uses 5 (a becomes 6)
        // Step 2: ++b increments b to 11 and uses 11
        // Step 3: --a decrements a to 5 and uses 5
        // result = 5 + 11 - 5 = 11
        
        System.out.println("Result: " + result);
        System.out.println("Final a: " + a + ", Final b: " + b);
    }
}`,
      output: `Result: 11
Final a: 5, Final b: 11`
    },
    codeExplanation: [
      'a++: Yields current value 5 for the addition, then increments memory of a to 6.',
      '++b: Immediately increments memory of b to 11, yielding 11 for the addition.',
      '--a: Immediately decrements memory of a from 6 back to 5, yielding 5.'
    ],
    visualExplanation: {
      title: 'Prefix vs Postfix Order of Operations',
      description: 'Prefix: Increment -> Return. Postfix: Return -> Increment.',
      asciiDiagram: `Prefix (++x):
Step 1: x = x + 1
Step 2: Return new x

Postfix (x++):
Step 1: Save temp = x
Step 2: x = x + 1
Step 3: Return temp`
    },
    visualizerType: 'memory-box',
    commonMistakes: [
      {
        mistake: 'Assuming `x = x++` increments `x`.',
        whyItIsWrong: 'In Java, `x = x++` captures the old value of `x`, increments `x`, and then overwrites `x` with the old value, resulting in NO change.',
        correction: 'Use simply `x++;` or `x = x + 1;`.'
      }
    ],
    importantRules: [
      'Prefix increments/decrements first, then supplies value.',
      'Postfix supplies value first, then increments/decrements.',
      'Do not write multiple inc/dec on the same variable in a single expression in production code (unreadable).'
    ],
    interviewPerspective: {
      question: 'What is the output of `int i = 0; i = i++; System.out.println(i);`?',
      answer: 'The output is `0`. The postfix operator `i++` evaluates to the old value `0`. While `i` is momentarily incremented to `1`, the assignment operator `=` subsequently writes the evaluated value `0` back into `i`.',
      trap: 'Common interview trick question.'
    },
    practiceQuestions: [
      {
        question: 'Given `int m = 4; int n = 3 * m++;`, what are the values of `m` and `n`?',
        hint: 'Postfix evaluates `m` as 4 during multiplication.',
        solution: '`n = 3 * 4 = 12`, and `m` is incremented to `5`.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m2-t5-q1',
        type: 'output',
        prompt: 'What will this snippet print: `int x = 7; System.out.println(++x + x++);`?',
        codeSnippet: `int x = 7;\nSystem.out.println(++x + x++);`,
        correctAnswer: '16',
        explanation: '`++x` increments x to 8 and yields 8. Then `x++` yields 8 (before incrementing x to 9). 8 + 8 = 16.'
      }
    ]
  },

  'bitwise-operators-basics': {
    id: 'bitwise-operators-basics',
    moduleId: 'm2',
    topicNumber: 6,
    title: 'Bitwise Operators — Basics',
    shortSummary: 'Bitwise AND (&), OR (|), XOR (^), NOT (~), and Shift Operators (<<, >>, >>>).',
    whatIsIt: 'Bitwise operators manipulate individual binary bits (0s and 1s) of integer types at the hardware level.',
    whyDoWeNeedIt: 'Crucial for low-level device drivers, cryptography, fast multiplication/division by powers of 2, bitmask permissions, and competitive DSA problems.',
    syntax: `int and = a & b;   // 1 if both bits are 1
int or  = a | b;   // 1 if either bit is 1
int xor = a ^ b;   // 1 if bits are different
int not = ~a;      // Inverts all bits (2's complement)
int leftShift = a << 2;  // Multiplies a by 2^2 (4)
int rightShift = a >> 2; // Divides a by 2^2 (4) (preserves sign)
int unsignedRight = a >>> 2; // Shifts right filling with 0`,
    basicExample: {
      code: `public class BitwiseDemo {
    public static void main(String[] args) {
        int a = 5; // 0101 in binary
        int b = 3; // 0011 in binary
        
        System.out.println("a & b: " + (a & b)); // 0001 = 1
        System.out.println("a | b: " + (a | b)); // 0111 = 7
        System.out.println("a ^ b: " + (a ^ b)); // 0110 = 6
        System.out.println("5 << 1: " + (5 << 1)); // 1010 = 10 (5 * 2)
    }
}`,
      output: `a & b: 1
a | b: 7
a ^ b: 6
5 << 1: 10`
    },
    detailedExample: {
      code: `public class BitmaskFlags {
    public static void main(String[] args) {
        int READ = 1;    // 0001
        int WRITE = 2;   // 0010
        int EXECUTE = 4; // 0100
        
        int userPermissions = READ | WRITE; // 0011 (3)
        
        boolean canRead = (userPermissions & READ) != 0;
        boolean canExecute = (userPermissions & EXECUTE) != 0;
        
        System.out.println("Can Read: " + canRead);
        System.out.println("Can Execute: " + canExecute);
    }
}`,
      output: `Can Read: true
Can Execute: false`
    },
    codeExplanation: [
      'READ | WRITE: Combines binary flags into a single integer (0001 | 0010 = 0011).',
      'userPermissions & READ: Tests if the 1st bit is active.'
    ],
    visualExplanation: {
      title: 'Binary Bitwise Truth Table',
      description: 'Bitwise operations executed on matching bit columns.',
      asciiDiagram: `Bit A | Bit B | A & B | A | B | A ^ B
  0   |   0   |   0   |   0   |   0
  0   |   1   |   0   |   1   |   1
  1   |   0   |   0   |   1   |   1
  1   |   1   |   1   |   1   |   0`
    },
    visualizerType: 'memory-box',
    commonMistakes: [
      {
        mistake: 'Confusing logical `&&` with bitwise `&`.',
        whyItIsWrong: '`&&` operates on booleans with short-circuiting; `&` operates on integer bits or non-short-circuit booleans.',
        correction: 'Use `&&` for conditions and `&` for bit manipulation.'
      }
    ],
    importantRules: [
      'Bitwise operators work on `byte`, `short`, `int`, and `long`.',
      '`x << k` is equivalent to `x * 2^k`.',
      '`x >> k` is equivalent to `x / 2^k` (floor division).'
    ],
    interviewPerspective: {
      question: 'How do you check if an integer is even or odd using bitwise operators?',
      answer: 'Check the least significant bit: `(n & 1) == 0` is even; `(n & 1) != 0` is odd. This is faster than `n % 2 != 0`.',
      trap: 'Remember `n % 2 != 0` fails for negative numbers (e.g., -5 % 2 is -1), whereas `(n & 1) != 0` works correctly for all integers.'
    },
    practiceQuestions: [
      {
        question: 'Calculate `8 >> 2` and `3 << 3`.',
        hint: 'Shift right divides by 2^2; shift left multiplies by 2^3.',
        solution: '`8 >> 2 = 8 / 4 = 2`. `3 << 3 = 3 * 8 = 24`.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m2-t6-q1',
        type: 'output',
        prompt: 'What is the output of: `System.out.println(6 ^ 6);`?',
        codeSnippet: `System.out.println(6 ^ 6);`,
        correctAnswer: '0',
        explanation: 'XORing any number with itself results in 0 because all identical bits evaluate to 0 (1 ^ 1 = 0, 0 ^ 0 = 0).'
      }
    ]
  },

  'type-casting-conversion': {
    id: 'type-casting-conversion',
    moduleId: 'm2',
    topicNumber: 7,
    title: 'Type Casting and Type Conversion',
    shortSummary: 'Widening (implicit) vs Narrowing (explicit) casting and overflow consequences.',
    whatIsIt: 'Type casting is converting a value from one data type to another. Widening (small to large type) is automatic/safe; Narrowing (large to small type) requires manual casting `(targetType) value` and may cause data loss or overflow.',
    whyDoWeNeedIt: 'Ensures type compatibility when converting user inputs, floating averages, mathematical calculations, and object references.',
    syntax: `// Widening (Implicit / Automatic)
int myInt = 100;
double myDouble = myInt; // Automatically converted to 100.0

// Narrowing (Explicit / Manual)
double price = 99.99;
int roundedPrice = (int) price; // Truncated to 99 (fraction lost)`,
    basicExample: {
      code: `public class CastingDemo {
    public static void main(String[] args) {
        int a = 25;
        double b = a; // Widening (int to double)
        System.out.println("Widened Double: " + b);
        
        double pi = 3.14159;
        int intPi = (int) pi; // Narrowing (double to int)
        System.out.println("Narrowed Int: " + intPi);
    }
}`,
      output: `Widened Double: 25.0
Narrowed Int: 3`
    },
    detailedExample: {
      code: `public class OverflowCasting {
    public static void main(String[] args) {
        int largeVal = 130;
        byte b = (byte) largeVal; // Byte range is -128 to 127
        
        System.out.println("Original Int: " + largeVal);
        System.out.println("Overflowed Byte: " + b); // Wraps around to -126
    }
}`,
      output: `Original Int: 130
Overflowed Byte: -126`
    },
    codeExplanation: [
      '(byte) largeVal: Binary 130 is `00000000 00000000 00000000 10000010`.',
      'Truncating to 8 bits leaves `10000010`, which in 2\'s complement represents `-126`.'
    ],
    visualExplanation: {
      title: 'Widening vs Narrowing Casting Hierarchy',
      description: 'Widening moves right (safe); Narrowing moves left (requires cast syntax).',
      asciiDiagram: `byte ──> short ──> int ──> long ──> float ──> double
[──────── Widening (Automatic / Safe) ─────────>]
[<─────── Narrowing (Explicit Cast Required) ──]`
    },
    visualizerType: 'memory-box',
    commonMistakes: [
      {
        mistake: 'Expecting `(int) 7.9` to round to 8.',
        whyItIsWrong: 'Casting to int always truncates the decimal portion towards zero, resulting in 7.',
        correction: 'Use `Math.round(7.9)` if you need mathematical rounding.'
      }
    ],
    importantRules: [
      'Widening conversion is done automatically by Java compiler.',
      'Narrowing conversion requires explicit cast syntax: `(type) value`.',
      'Narrowing floating-point to integer truncates the decimal part (does not round).',
      '`boolean` CANNOT be cast to or from any other data type in Java.'
    ],
    interviewPerspective: {
      question: 'Can you cast a boolean to an integer in Java like in C/C++?',
      answer: 'No. In Java, `boolean` is a distinct type representing only `true` or `false`. It is strictly incompatible with numeric types (`int`, `byte`, etc.) and cannot be cast.',
      trap: 'Never attempt `(int) true` in Java; it causes a compilation error.'
    },
    practiceQuestions: [
      {
        question: 'Calculate the value of `double avg = (double) 15 / 2;` vs `double avg2 = (double) (15 / 2);`.',
        hint: 'Look at parentheses precedence.',
        solution: '`avg = 15.0 / 2 = 7.5`. `avg2 = (double)(7) = 7.0` (because integer division happened inside parentheses first).'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m2-t7-q1',
        type: 'output',
        prompt: 'What is the output of: `double d = 19.85; int x = (int) d; System.out.println(x);`?',
        codeSnippet: `double d = 19.85;\nint x = (int) d;\nSystem.out.println(x);`,
        correctAnswer: '19',
        explanation: 'Explicit narrowing cast `(int)` truncates the fractional portion (.85), leaving the integer 19.'
      }
    ]
  }
};
