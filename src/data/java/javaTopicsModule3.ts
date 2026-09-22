import { JavaTopicDetail } from './javaTopicsData';

export const JAVA_TOPICS_MODULE_3: Record<string, JavaTopicDetail> = {
  'decision-making-in-java': {
    id: 'decision-making-in-java',
    moduleId: 'm3',
    topicNumber: 1,
    title: 'Decision Making in Java',
    shortSummary: 'Control flow fundamentals: how Java programs branch execution based on boolean conditions.',
    whatIsIt: 'Decision making in Java allows a program to evaluate boolean expressions at runtime and select different execution paths based on whether the condition evaluates to `true` or `false`.',
    whyDoWeNeedIt: 'Without decision making, software could only execute sequentially from top to bottom. Branching enables validation, authentication, business logic, game state changes, and error handling.',
    syntax: `// Flow of Decision Making:
// if (condition) { ... }
// else if (condition2) { ... }
// else { ... }
// switch (variable) { case value: ... }`,
    basicExample: {
      code: `public class DecisionFlow {
    public static void main(String[] args) {
        int batteryLevel = 15;
        
        if (batteryLevel < 20) {
            System.out.println("Low Battery: Enable Power Saving Mode.");
        }
    }
}`,
      output: `Low Battery: Enable Power Saving Mode.`
    },
    detailedExample: {
      code: `public class AccessGate {
    public static void main(String[] args) {
        boolean hasCard = true;
        boolean isPinCorrect = true;
        
        if (hasCard && isPinCorrect) {
            System.out.println("Gate Unlocked: Access Granted.");
        } else {
            System.out.println("Access Denied: Please check your card or PIN.");
        }
    }
}`,
      output: `Gate Unlocked: Access Granted.`
    },
    codeExplanation: [
      'if (condition): Evaluates the boolean expression inside parentheses.',
      'If true, the enclosed block `{ ... }` executes.',
      'If false, execution skips the block and continues to the `else` or subsequent statements.'
    ],
    visualExplanation: {
      title: 'Control Flow Decision Tree',
      description: 'Program execution branches depending on condition boolean evaluation.',
      asciiDiagram: `      [ Start ]
          ↓
  [ Is Battery < 20? ]
     /          \\
 (true)        (false)
   ↓              ↓
[ Low Battery ]  [ Normal Mode ]
   \\            /
      [ Continue ]`
    },
    visualizerType: 'decision-tree',
    commonMistakes: [
      {
        mistake: 'Putting a semicolon right after the if condition: `if (x > 10); { ... }`.',
        whyItIsWrong: 'The semicolon creates an empty statement, causing the following block to ALWAYS execute regardless of the condition.',
        correction: 'Do not place a semicolon after `if (condition)`.'
      }
    ],
    importantRules: [
      'The condition in an `if` statement MUST evaluate to a `boolean` in Java (cannot use integers like 0 or 1).',
      'Always use braces `{ ... }` even for single-line statements for clean and safe code.'
    ],
    interviewPerspective: {
      question: 'Why does `if (1)` fail in Java when it is valid in C/C++?',
      answer: 'Java is strictly type-safe. In C/C++, non-zero integers are implicitly treated as truthy values. Java does not allow implicit conversion between integers and booleans; conditions must explicitly be boolean expressions.',
      trap: 'Never try using integer expressions directly inside Java if statements.'
    },
    practiceQuestions: [
      {
        question: 'Write an if check to see if temperature is greater than 37.5 Celsius.',
        hint: 'Use relational greater-than operator.',
        solution: '`if (temperature > 37.5) { System.out.println("Fever detected"); }`'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m3-t1-q1',
        type: 'mcq',
        prompt: 'Which statement is required inside an `if (...)` condition in Java?',
        options: [
          'Any integer value (0 for false, non-zero for true)',
          'An expression that strictly evaluates to a boolean type',
          'A non-null object reference',
          'A string'
        ],
        correctAnswer: 1,
        explanation: 'Java requires the expression inside `if(...)` to be strictly of type `boolean`.'
      }
    ]
  },

  'if-statement': {
    id: 'if-statement',
    moduleId: 'm3',
    topicNumber: 2,
    title: 'if Statement',
    shortSummary: 'One-way conditional execution: executing a block of code only when a condition is met.',
    whatIsIt: 'The simple `if` statement is the most basic decision-making construct in Java. It executes a block of code if and only if the specified condition evaluates to `true`.',
    whyDoWeNeedIt: 'Used for optional actions, guard clauses, filter checks, and triggering alerts.',
    syntax: `if (booleanCondition) {
    // Code executes only when condition is true
}`,
    basicExample: {
      code: `public class IfDemo {
    public static void main(String[] args) {
        int temperature = 38;
        
        if (temperature > 35) {
            System.out.println("It's a hot day! Stay hydrated.");
        }
        System.out.println("Program finished.");
    }
}`,
      output: `It's a hot day! Stay hydrated.
Program finished.`
    },
    detailedExample: {
      code: `public class DiscountCheck {
    public static void main(String[] args) {
        double cartTotal = 120.0;
        double discount = 0.0;
        
        if (cartTotal > 100.0) {
            discount = cartTotal * 0.10; // 10% discount
            System.out.println("Special Offer Applied: $10% OFF!");
        }
        
        double finalPrice = cartTotal - discount;
        System.out.printf("Final Total: $%.2f%n", finalPrice);
    }
}`,
      output: `Special Offer Applied: $10% OFF!
Final Total: $108.00`
    },
    codeExplanation: [
      'if (cartTotal > 100.0): Compares 120.0 > 100.0, evaluating to true.',
      'The block inside `{}` runs, calculating the discount of $12.00.',
      'If cartTotal had been $80.0, the if block would be skipped and discount would remain 0.0.'
    ],
    visualExplanation: {
      title: 'One-Way Conditional Branch',
      description: 'True branches into block; False bypasses block straight to next statement.',
      asciiDiagram: `[ cartTotal > 100 ]
     │
   True ──> [ Calculate Discount ]
     │              │
     └──────┬───────┘
            ↓
      [ Final Total ]`
    },
    visualizerType: 'decision-tree',
    commonMistakes: [
      {
        mistake: 'Omitting curly braces `{}` and adding multiple lines expecting all to be conditional.',
        whyItIsWrong: 'Without `{}` only the immediately following single statement belongs to the `if`.',
        correction: 'Always wrap multi-line or single-line if blocks with `{ ... }`.'
      }
    ],
    importantRules: [
      'If the condition is false, execution skips the block entirely.',
      'Always use block braces `{}` to avoid dangling logic bugs.'
    ],
    interviewPerspective: {
      question: 'What is a "guard clause" in professional Java coding?',
      answer: 'A guard clause is an early `if` statement at the top of a method that checks for invalid inputs or edge cases and returns immediately, preventing deep nested if-else structures.',
      trap: 'Good code uses guard clauses to keep methods flat and clean.'
    },
    practiceQuestions: [
      {
        question: 'Write an `if` statement that checks if an integer `score` is negative, and if so, prints "Invalid Score".',
        hint: 'Compare score < 0.',
        solution: '`if (score < 0) { System.out.println("Invalid Score"); }`'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m3-t2-q1',
        type: 'output',
        prompt: 'What will print: `int x = 5; if (x > 10) System.out.print("A"); System.out.print("B");`?',
        codeSnippet: `int x = 5;\nif (x > 10) System.out.print("A");\nSystem.out.print("B");`,
        correctAnswer: 'B',
        explanation: 'Because `x > 10` is false, `System.out.print("A")` is skipped. `System.out.print("B")` is outside the if and executes normally.'
      }
    ]
  },

  'if-else-statement': {
    id: 'if-else-statement',
    moduleId: 'm3',
    topicNumber: 3,
    title: 'if-else Statement',
    shortSummary: 'Two-way conditional execution: choosing between two mutually exclusive code blocks.',
    whatIsIt: 'The `if-else` construct provides two mutually exclusive execution paths: the `if` block executes if the condition is true; otherwise, the `else` block executes.',
    whyDoWeNeedIt: 'Used whenever a program must take an alternative action when a condition is not met (e.g., Pass vs Fail, Valid vs Invalid, Logged In vs Logged Out).',
    syntax: `if (booleanCondition) {
    // Executes when condition is true
} else {
    // Executes when condition is false
}`,
    basicExample: {
      code: `public class EvenOdd {
    public static void main(String[] args) {
        int number = 17;
        
        if (number % 2 == 0) {
            System.out.println(number + " is Even.");
        } else {
            System.out.println(number + " is Odd.");
        }
    }
}`,
      output: `17 is Odd.`
    },
    detailedExample: {
      code: `public class LoginAuthenticator {
    public static void main(String[] args) {
        String correctPassword = "SecurePass2026";
        String enteredPassword = "WrongPassword";
        
        if (enteredPassword.equals(correctPassword)) {
            System.out.println("Authentication Successful: Welcome back!");
        } else {
            System.out.println("Authentication Failed: Invalid password. Try again.");
        }
    }
}`,
      output: `Authentication Failed: Invalid password. Try again.`
    },
    codeExplanation: [
      'enteredPassword.equals(correctPassword): Compares string values, returning false.',
      'Since condition is false, execution jumps directly to the `else` block.'
    ],
    visualExplanation: {
      title: 'Two-Way Conditional Fork',
      description: 'Guaranteed execution of exactly one of the two blocks.',
      asciiDiagram: `      [ Condition Check ]
           /         \\
       True           False
        ↓               ↓
   [ IF Block ]    [ ELSE Block ]
        \\               /
         └──────┬──────┘
                ↓
           [ Continue ]`
    },
    visualizerType: 'decision-tree',
    commonMistakes: [
      {
        mistake: 'Writing a condition after `else` without `if` (e.g., `else (x < 0)`).',
        whyItIsWrong: '`else` cannot take a condition. If you need a condition, use `else if (condition)`.',
        correction: 'Use `else` alone as the default fallback, or `else if (condition)`.'
      }
    ],
    importantRules: [
      'Exactly ONE of the two blocks (`if` or `else`) will execute; never both and never neither.',
      'An `else` must always be paired with a preceding `if`.'
    ],
    interviewPerspective: {
      question: 'Can an if-else statement be replaced by the ternary operator `? :`?',
      answer: 'Yes! For simple expressions that return a value, the ternary operator `condition ? valueIfTrue : valueIfFalse` provides a clean, concise inline alternative to if-else.',
      trap: 'Do not use nested ternary operators for complex multi-line logic as it hurts readability.'
    },
    practiceQuestions: [
      {
        question: 'Write an if-else check that determines if a student passed (score >= 50) or failed.',
        hint: 'Use if (score >= 50) ... else ...',
        solution: '`if (score >= 50) { System.out.println("Passed"); } else { System.out.println("Failed"); }`'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m3-t3-q1',
        type: 'output',
        prompt: 'What will print: `int n = -4; if (n > 0) System.out.print("Pos"); else System.out.print("Neg");`?',
        codeSnippet: `int n = -4;\nif (n > 0) System.out.print("Pos");\nelse System.out.print("Neg");`,
        correctAnswer: 'Neg',
        explanation: 'Because `-4 > 0` is false, the `else` block executes and prints "Neg".'
      }
    ]
  },

  'else-if-ladder': {
    id: 'else-if-ladder',
    moduleId: 'm3',
    topicNumber: 4,
    title: 'else-if Ladder',
    shortSummary: 'Multi-way conditional branching for evaluating multiple sequential conditions.',
    whatIsIt: 'The `else-if` ladder is used when you need to test multiple sequential conditions. Java evaluates each condition from top to bottom. The first condition that evaluates to `true` has its block executed, and the rest of the ladder is skipped.',
    whyDoWeNeedIt: 'Used for grading scales (A, B, C, D, F), tax brackets, traffic lights, and role-based access levels.',
    syntax: `if (condition1) {
    // block 1
} else if (condition2) {
    // block 2
} else if (condition3) {
    // block 3
} else {
    // default fallback block
}`,
    basicExample: {
      code: `public class GradeCalculator {
    public static void main(String[] args) {
        int score = 84;
        
        if (score >= 90) {
            System.out.println("Grade: A+");
        } else if (score >= 80) {
            System.out.println("Grade: A");
        } else if (score >= 70) {
            System.out.println("Grade: B");
        } else if (score >= 60) {
            System.out.println("Grade: C");
        } else {
            System.out.println("Grade: F (Fail)");
        }
    }
}`,
      output: `Grade: A`
    },
    detailedExample: {
      code: `public class ElectricityTariff {
    public static void main(String[] args) {
        int units = 250;
        double billAmount;
        
        if (units <= 100) {
            billAmount = units * 1.50;
        } else if (units <= 200) {
            billAmount = (100 * 1.50) + ((units - 100) * 2.50);
        } else if (units <= 300) {
            billAmount = (100 * 1.50) + (100 * 2.50) + ((units - 200) * 4.00);
        } else {
            billAmount = (100 * 1.50) + (100 * 2.50) + (100 * 4.00) + ((units - 300) * 6.00);
        }
        
        System.out.printf("Units Consumed: %d, Total Bill: $%.2f%n", units, billAmount);
    }
}`,
      output: `Units Consumed: 250, Total Bill: $600.00`
    },
    codeExplanation: [
      'Java tests score >= 90 (false) -> moves to score >= 80 (true).',
      'Executes "Grade: A" and immediately exits the ladder without checking >= 70 or >= 60.'
    ],
    visualExplanation: {
      title: 'Sequential Ladder Evaluation',
      description: 'Top-down evaluation; first true condition wins, skipping remaining conditions.',
      asciiDiagram: `[ Check Condition 1 ] ──(True)──> [ Execute Block 1 ] ──> Exit
        │ (False)
[ Check Condition 2 ] ──(True)──> [ Execute Block 2 ] ──> Exit
        │ (False)
[ Check Condition 3 ] ──(True)──> [ Execute Block 3 ] ──> Exit
        │ (False)
   [ ELSE Fallback ] ────────────> [ Execute Else ]    ──> Exit`
    },
    visualizerType: 'decision-tree',
    commonMistakes: [
      {
        mistake: 'Placing general/loose conditions before specific conditions.',
        whyItIsWrong: 'If `score >= 50` is placed before `score >= 90`, a score of 95 will trigger the 50 block first.',
        correction: 'Order conditions logically from most restrictive to least restrictive.'
      }
    ],
    importantRules: [
      'Conditions are evaluated sequentially from top to bottom.',
      'Only the FIRST matching block executes; once executed, the entire ladder terminates.',
      'The final `else` is optional but serves as a catch-all default.'
    ],
    interviewPerspective: {
      question: 'What happens if multiple conditions in an else-if ladder are true?',
      answer: 'Only the block corresponding to the FIRST true condition will execute. All subsequent `else if` conditions are completely ignored.',
      trap: 'If you need multiple independent conditions to execute simultaneously, use separate `if` statements instead of an `else-if` ladder.'
    },
    practiceQuestions: [
      {
        question: 'Write an else-if ladder for a traffic light signal ("RED" -> Stop, "YELLOW" -> Slow Down, "GREEN" -> Go).',
        hint: 'Use signal.equals("RED")...',
        solution: `if (signal.equals("RED")) System.out.println("Stop");
else if (signal.equals("YELLOW")) System.out.println("Slow Down");
else if (signal.equals("GREEN")) System.out.println("Go");
else System.out.println("Invalid Signal");`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m3-t4-q1',
        type: 'output',
        prompt: 'What will print: `int x = 15; if (x > 20) System.out.print("A"); else if (x > 10) System.out.print("B"); else if (x > 5) System.out.print("C");`?',
        codeSnippet: `int x = 15;\nif (x > 20) System.out.print("A");\nelse if (x > 10) System.out.print("B");\nelse if (x > 5) System.out.print("C");`,
        correctAnswer: 'B',
        explanation: '`x > 20` is false. `x > 10` is true (15 > 10), so "B" prints and the ladder terminates before checking `x > 5`.'
      }
    ]
  },

  'nested-if': {
    id: 'nested-if',
    moduleId: 'm3',
    topicNumber: 5,
    title: 'Nested if',
    shortSummary: 'Placing if statements inside other if statements for hierarchical validation.',
    whatIsIt: 'A nested `if` is an `if` statement located inside the body of another `if` or `else` block. The inner condition is only tested if the outer condition evaluates to `true`.',
    whyDoWeNeedIt: 'Used for hierarchical decision making (e.g., Blood donation: age >= 18 -> weight >= 50 -> hemoglobin >= 12.5).',
    syntax: `if (outerCondition) {
    if (innerCondition) {
        // Executes only if BOTH outer and inner conditions are true
    } else {
        // Executes if outer is true but inner is false
    }
}`,
    basicExample: {
      code: `public class BloodDonation {
    public static void main(String[] args) {
        int age = 22;
        int weight = 55;
        
        if (age >= 18) {
            if (weight >= 50) {
                System.out.println("Eligible to donate blood.");
            } else {
                System.out.println("Not eligible: Weight must be >= 50 kg.");
            }
        } else {
            System.out.println("Not eligible: Must be at least 18 years old.");
        }
    }
}`,
      output: `Eligible to donate blood.`
    },
    detailedExample: {
      code: `public class LoanApproval {
    public static void main(String[] args) {
        double monthlySalary = 65000;
        int creditScore = 780;
        
        if (monthlySalary >= 40000) {
            if (creditScore >= 750) {
                System.out.println("Loan Approved: Low Interest Rate (7.5%).");
            } else if (creditScore >= 650) {
                System.out.println("Loan Approved: Standard Interest Rate (9.5%).");
            } else {
                System.out.println("Loan Rejected: Insufficient credit score.");
            }
        } else {
            System.out.println("Loan Rejected: Minimum monthly income of $40,000 required.");
        }
    }
}`,
      output: `Loan Approved: Low Interest Rate (7.5%).`
    },
    codeExplanation: [
      'Outer if: checks if `monthlySalary >= 40000`. Since 65000 >= 40000 is true, it enters the inner block.',
      'Inner if: checks `creditScore >= 750`. Since 780 >= 750 is true, it prints low interest approval.'
    ],
    visualExplanation: {
      title: 'Hierarchical Nested Decision Flow',
      description: 'Inner checks are unlocked only when parent check passes.',
      asciiDiagram: `[ Check: Age >= 18 ]
       /          \\
   (True)        (False) ──> "Too young"
     ↓
[ Check: Weight >= 50 ]
   /          \\
(True)       (False) ──> "Underweight"
  ↓
"Eligible Donor"`
    },
    visualizerType: 'decision-tree',
    commonMistakes: [
      {
        mistake: 'Creating deeply nested "pyramid of doom" code (5+ levels of nesting).',
        whyItIsWrong: 'Makes code extremely difficult to read, debug, and test.',
        correction: 'Refactor using logical `&&` or early return guard clauses.'
      }
    ],
    importantRules: [
      'Each `else` matches the closest preceding unmatched `if` within the same block scope (the dangling-else rule).',
      'Always use `{}` to make nesting hierarchy explicit.'
    ],
    interviewPerspective: {
      question: 'What is the "Dangling Else" problem in programming languages?',
      answer: 'When nested `if` statements are written without braces, an `else` statement could syntactically attach to either the inner or outer `if`. In Java, the compiler resolves this by always associating the `else` with the nearest preceding `if` in the same block.',
      trap: 'Always use curly braces to eliminate ambiguity.'
    },
    practiceQuestions: [
      {
        question: 'Check if a year is a Leap Year using nested if statements.',
        hint: 'Divisible by 4 -> not divisible by 100 OR divisible by 400.',
        solution: `if (year % 4 == 0) {
    if (year % 100 == 0) {
        if (year % 400 == 0) System.out.println("Leap Year");
        else System.out.println("Not a Leap Year");
    } else {
        System.out.println("Leap Year");
    }
} else {
    System.out.println("Not a Leap Year");
}`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m3-t5-q1',
        type: 'output',
        prompt: 'What will print: `int a = 10, b = 5; if (a > 5) if (b > 10) System.out.print("X"); else System.out.print("Y");`?',
        codeSnippet: `int a = 10, b = 5;\nif (a > 5)\n    if (b > 10)\n        System.out.print("X");\n    else\n        System.out.print("Y");`,
        correctAnswer: 'Y',
        explanation: '`a > 5` is true, so execution enters the inner if. `b > 10` is false (5 > 10 is false), so the matching inner else executes and prints "Y".'
      }
    ]
  },

  'switch-statement': {
    id: 'switch-statement',
    moduleId: 'm3',
    topicNumber: 6,
    title: 'switch Statement',
    shortSummary: 'Multi-branch value matching with case, break, default, and modern arrow syntax.',
    whatIsIt: 'The `switch` statement selects one of many code blocks to execute based on the value of a single variable or expression. Java supports `byte`, `short`, `char`, `int`, `String`, and `enum` in switch expressions.',
    whyDoWeNeedIt: 'Cleaner, faster, and more readable than long chains of `else-if` when matching a single variable against discrete constant values.',
    syntax: `switch (expression) {
    case value1:
        // code
        break;
    case value2:
        // code
        break;
    default:
        // fallback code
}`,
    basicExample: {
      code: `public class DayOfWeek {
    public static void main(String[] args) {
        int day = 3;
        
        switch (day) {
            case 1: System.out.println("Monday"); break;
            case 2: System.out.println("Tuesday"); break;
            case 3: System.out.println("Wednesday"); break;
            case 4: System.out.println("Thursday"); break;
            case 5: System.out.println("Friday"); break;
            case 6: System.out.println("Saturday"); break;
            case 7: System.out.println("Sunday"); break;
            default: System.out.println("Invalid day number");
        }
    }
}`,
      output: `Wednesday`
    },
    detailedExample: {
      code: `public class CalculatorSwitch {
    public static void main(String[] args) {
        char operator = '*';
        int num1 = 12;
        int num2 = 4;
        
        switch (operator) {
            case '+':
                System.out.println("Sum: " + (num1 + num2));
                break;
            case '-':
                System.out.println("Difference: " + (num1 - num2));
                break;
            case '*':
                System.out.println("Product: " + (num1 * num2));
                break;
            case '/':
                System.out.println("Quotient: " + (num1 / num2));
                break;
            default:
                System.out.println("Error: Unknown operator");
        }
    }
}`,
      output: `Product: 48`
    },
    codeExplanation: [
      'switch (operator): Compares `operator` character with case constants.',
      'case \'*\': Matches `*`, computes and prints product.',
      'break: Prevents "fall-through" into subsequent cases.'
    ],
    visualExplanation: {
      title: 'Switch Jump Table & Fall-Through Mechanism',
      description: 'Switch jumps directly to matching case. Missing break causes execution to fall through.',
      asciiDiagram: `switch(val)
    │
    ├── case 1 ──> [ Execute ] ──(break)──> Exit
    ├── case 2 ──> [ Execute ] ──(no break)──┐ (Falls through!)
    ├── case 3 ──> [ Execute ] <─────────────┘
    └── default ─> [ Fallback ]`
    },
    visualizerType: 'decision-tree',
    commonMistakes: [
      {
        mistake: 'Forgetting `break;` statement in a case block.',
        whyItIsWrong: 'Causes "fall-through": execution continues into subsequent cases regardless of their condition.',
        correction: 'Add `break;` at the end of every case block unless intentional fall-through is required.'
      },
      {
        mistake: 'Attempting to use `float`, `double`, or `boolean` in a switch.',
        whyItIsWrong: 'Java switch only supports integer types (byte, short, char, int), String, and Enum.',
        correction: 'Use `if-else` for floating-point and boolean comparisons.'
      }
    ],
    importantRules: [
      'Case values must be compile-time constants or literals.',
      'Duplicate case values are illegal.',
      'Supported types: `byte`, `short`, `char`, `int`, `String`, `enum` (wrapper classes Byte, Short, Character, Integer).',
      '`default` is executed when no case matches.'
    ],
    interviewPerspective: {
      question: 'How is a switch statement optimized internally by the JVM compared to else-if ladders?',
      answer: 'The JVM compiles switch statements into specialized bytecode instructions (`tableswitch` for contiguous cases or `lookupswitch` for sparse cases) which use jump tables operating in O(1) time complexity, whereas `else-if` chains require sequential O(N) comparisons.',
      trap: 'Switch is significantly faster for large sets of discrete constant lookups.'
    },
    practiceQuestions: [
      {
        question: 'What is the output if `int x = 2; switch(x) { case 1: System.out.print("1"); case 2: System.out.print("2"); case 3: System.out.print("3"); }` (no breaks)?',
        hint: 'Observe fall-through behavior.',
        solution: '`23` (jumps to case 2, prints "2", falls through to case 3 and prints "3").'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m3-t6-q1',
        type: 'mcq',
        prompt: 'Which of the following data types CANNOT be used in a Java switch statement?',
        options: ['int', 'String', 'double', 'char'],
        correctAnswer: 2,
        explanation: '`double` (and `float`) cannot be used in a switch expression due to floating-point rounding precision issues.'
      }
    ]
  },

  'conditional-logic-practice': {
    id: 'conditional-logic-practice',
    moduleId: 'm3',
    topicNumber: 7,
    title: 'Conditional Logic Practice',
    shortSummary: 'Comprehensive problem solving combining logical operators, if-else ladders, and switch structures.',
    whatIsIt: 'Hands-on synthesis of all conditional structures to solve real-world algorithms: leap year checks, quadratic equation roots, tax calculators, and menu-driven command systems.',
    whyDoWeNeedIt: 'Solidifies logical thinking and builds the intuition needed to select the optimal conditional construct for any software problem.',
    syntax: `// Combining complex conditions:
if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
    // Leap year logic
}`,
    basicExample: {
      code: `public class LeapYearChecker {
    public static void main(String[] args) {
        int year = 2024;
        
        boolean isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
        
        if (isLeap) {
            System.out.println(year + " is a Leap Year!");
        } else {
            System.out.println(year + " is NOT a Leap Year.");
        }
    }
}`,
      output: `2024 is a Leap Year!`
    },
    detailedExample: {
      code: `public class TriangleClassifier {
    public static void main(String[] args) {
        int a = 5, b = 5, c = 5;
        
        // Triangle Validity Check: sum of any 2 sides must be greater than 3rd
        if (a + b > c && a + c > b && b + c > a) {
            if (a == b && b == c) {
                System.out.println("Equilateral Triangle (All sides equal)");
            } else if (a == b || b == c || a == c) {
                System.out.println("Isosceles Triangle (Two sides equal)");
            } else {
                System.out.println("Scalene Triangle (All sides different)");
            }
        } else {
            System.out.println("Invalid Triangle: Side lengths cannot form a triangle.");
        }
    }
}`,
      output: `Equilateral Triangle (All sides equal)`
    },
    codeExplanation: [
      'Outer if: Validates geometry rule that the sum of any two sides must exceed the third.',
      'Inner else-if: Accurately classifies the triangle based on side equality.'
    ],
    visualExplanation: {
      title: 'Validation & Classification Pipeline',
      description: 'Step 1: Validate input integrity -> Step 2: Classify subtype.',
      asciiDiagram: `[ Input Sides: a, b, c ]
           ↓
[ Valid Triangle Check? ] ──(No)──> "Invalid Triangle"
           ↓ (Yes)
  [ a==b && b==c ? ] ──(Yes)──> "Equilateral"
           ↓ (No)
  [ a==b || b==c || a==c ? ] ──(Yes)──> "Isosceles"
           ↓ (No)
     "Scalene"`
    },
    visualizerType: 'decision-tree',
    commonMistakes: [
      {
        mistake: 'Checking `a == b == c` in Java.',
        whyItIsWrong: '`a == b` evaluates to boolean `true`, then `true == c` causes compilation error (cannot compare boolean with int).',
        correction: 'Use logical AND: `a == b && b == c`.'
      }
    ],
    importantRules: [
      'Break complex requirements into: 1) Input validation, 2) Core calculation, 3) Edge case handling.',
      'Always test edge cases (zeros, negatives, boundary threshold values).'
    ],
    interviewPerspective: {
      question: 'How do you check if three line segments can form a valid triangle?',
      answer: 'By the Triangle Inequality Theorem: `a + b > c && a + c > b && b + c > a`. All three sub-conditions must be strictly true.',
      trap: 'Using `>=` instead of `>` is a bug because degenerate flat lines cannot form a triangle.'
    },
    practiceQuestions: [
      {
        question: 'Write code to find the largest of three numbers `a = 12, b = 45, c = 27`.',
        hint: 'Use if (a >= b && a >= c) ...',
        solution: `int max = a;
if (b > max) max = b;
if (c > max) max = c;
System.out.println("Largest: " + max);`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m3-t7-q1',
        type: 'mcq',
        prompt: 'Which condition correctly checks if a year is a leap year in the Gregorian calendar?',
        options: [
          'year % 4 == 0',
          '(year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)',
          'year % 400 == 0 && year % 100 == 0',
          'year % 4 == 0 || year % 100 == 0'
        ],
        correctAnswer: 1,
        explanation: 'A leap year is divisible by 4 but not by 100, UNLESS it is also divisible by 400.'
      }
    ]
  }
};
