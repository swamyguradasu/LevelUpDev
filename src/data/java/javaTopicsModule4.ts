import { JavaTopicDetail } from './javaTopicsData';

export const JAVA_TOPICS_MODULE_4: Record<string, JavaTopicDetail> = {
  'need-for-loops': {
    id: 'need-for-loops',
    moduleId: 'm4',
    topicNumber: 1,
    title: 'Need for Repetition in Programming',
    shortSummary: 'Understand why loops are essential for executing repetitive tasks efficiently without code duplication (DRY principle).',
    whatIsIt: 'Loops are control structures that execute a block of instructions repeatedly until a specified termination condition is met.',
    whyDoWeNeedIt: 'Without loops, processing 1,000 array items would require 1,000 duplicated lines of code. Loops eliminate redundancy, scale dynamically, and allow algorithms to process variable-length data streams.',
    syntax: `// Anatomy of any loop:
// 1. Initialization (start state)
// 2. Condition check (termination test)
// 3. Loop body (work execution)
// 4. Update step (counter progression)`,
    basicExample: {
      code: `public class LoopNeedDemo {
    public static void main(String[] args) {
        // With loop: Clean and dynamic
        for (int i = 1; i <= 3; i++) {
            System.out.println("Processing Batch #" + i);
        }
    }
}`,
      output: `Processing Batch #1
Processing Batch #2
Processing Batch #3`
    },
    detailedExample: {
      code: `public class AccumulatorPattern {
    public static void main(String[] args) {
        int sum = 0;
        int target = 5;
        
        for (int i = 1; i <= target; i++) {
            sum += i;
            System.out.printf("Step %d: Added %d, Total = %d%n", i, i, sum);
        }
        
        System.out.println("Final Sum: " + sum);
    }
}`,
      output: `Step 1: Added 1, Total = 1
Step 2: Added 2, Total = 3
Step 3: Added 3, Total = 6
Step 4: Added 4, Total = 10
Step 5: Added 5, Total = 15
Final Sum: 15`
    },
    codeExplanation: [
      'int i = 1: Initialization executed once before the loop starts.',
      'i <= target: Condition tested before each iteration. If true, loop body runs; if false, loop exits.',
      'sum += i: Accumulator pattern adds current index to cumulative sum.',
      'i++: Increments counter by 1 at the end of each iteration.'
    ],
    visualExplanation: {
      title: 'Loop Lifecycle & State Transition',
      description: 'The cyclic transition from Init -> Condition Check -> Body -> Increment -> Condition Check until false.',
      asciiDiagram: `┌───────────────┐
│ Init: i = 1   │
└───────┬───────┘
        ↓
    ┌───────┐      False (i > 5)
    │ i <= 5? ├───────────────────→ [ Exit Loop ]
    └───┬───┘
        │ True
        ↓
    ┌───────────────┐
    │ Execute Body  │
    └───────┬───────┘
            ↓
    ┌───────────────┐
    │ Update: i++   │
    └───────┬───────┘
            │
            └───────────→ (Jump back to Condition)`
    },
    visualizerType: 'loop-cycle',
    commonMistakes: [
      {
        mistake: 'Omitting the loop update step (e.g. forgetting `i++`), resulting in an infinite loop.',
        whyItIsWrong: 'The condition `i <= target` remains permanently true, causing the CPU to hang at 100% usage.',
        correction: 'Always ensure the loop control variable is updated towards the termination boundary.'
      }
    ],
    importantRules: [
      'Every loop must have a reachable termination condition.',
      'Loop counters declared in the header are scoped strictly inside the loop block.',
      'Use `for` when iteration count is known; use `while` when termination is event/condition driven.'
    ],
    interviewPerspective: {
      question: 'What is an off-by-one error (OBOE) in loop construction and how do you prevent it?',
      answer: 'An off-by-one error occurs when a loop iterates one time too many or one time too few (e.g., using `<=` instead of `<` on a 0-indexed array). It is prevented by adhering to standard indexing conventions (0 to length - 1) and rigorous boundary value testing.',
      trap: 'Array indices are 0 to length - 1. Using `i <= arr.length` causes `ArrayIndexOutOfBoundsException`.'
    },
    practiceQuestions: [
      {
        question: 'What happens if a loop condition is initially `false` in a `while` loop versus a `do-while` loop?',
        hint: 'Think about entry-controlled vs exit-controlled.',
        solution: 'In a `while` loop, the body executes 0 times. In a `do-while` loop, the body executes at least 1 time.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m4-t1-q1',
        type: 'mcq',
        prompt: 'What are the 3 mandatory components of every loop structure in Java?',
        options: [
          'Initialization, Condition Check, Update Step',
          'Declaration, Exception Block, Return Statement',
          'Import, Main Method, Semicolon',
          'Class, Interface, Constructor'
        ],
        correctAnswer: 0,
        explanation: 'All loops require state initialization, a conditional test for continuation, and an update step to advance towards termination.'
      }
    ]
  },

  'while-loop': {
    id: 'while-loop',
    moduleId: 'm4',
    topicNumber: 2,
    title: 'The while Loop',
    shortSummary: 'Master entry-controlled loops for scenarios where the number of iterations is not known in advance.',
    whatIsIt: 'The `while` loop repeatedly executes a block of code as long as a specified boolean condition evaluates to `true`.',
    whyDoWeNeedIt: 'When reading streaming data, processing user input until "exit", or dividing numbers until reaching 0, we do not know the exact iteration count in advance. The while loop handles dynamic conditions cleanly.',
    syntax: `while (booleanCondition) {
    // Body statements
    // Must update condition variable!
}`,
    basicExample: {
      code: `public class WhileCountdown {
    public static void main(String[] args) {
        int count = 3;
        while (count > 0) {
            System.out.println("T-minus " + count);
            count--;
        }
        System.out.println("Liftoff!");
    }
}`,
      output: `T-minus 3
T-minus 2
T-minus 1
Liftoff!`
    },
    detailedExample: {
      code: `public class DigitReverser {
    public static void main(String[] args) {
        int number = 12345;
        int reversed = 0;
        
        while (number > 0) {
            int lastDigit = number % 10;
            reversed = (reversed * 10) + lastDigit;
            number = number / 10; // Discard last digit
        }
        
        System.out.println("Reversed: " + reversed);
    }
}`,
      output: `Reversed: 54321`
    },
    codeExplanation: [
      'while (number > 0): Loop continues until all digits have been truncated.',
      'number % 10: Extracts the rightmost digit.',
      'reversed * 10 + lastDigit: Shifts existing digits left by 1 decimal place and appends the new digit.',
      'number = number / 10: Integer division strips the rightmost digit.'
    ],
    visualExplanation: {
      title: 'While Loop Entry-Control Check',
      description: 'Condition is evaluated BEFORE every iteration. If false initially, loop body runs 0 times.',
      asciiDiagram: `[ Entry Point ]
       ↓
( Evaluate Condition )
 ├── True  ──→ [ Run Loop Body ] ──→ ( Update Variable ) ──┐
 │                                                         │
 │                                    ▲                    │
 │                                    └────────────────────┘
 └── False ──→ [ Exit Loop ]`
    },
    visualizerType: 'loop-cycle',
    commonMistakes: [
      {
        mistake: 'Putting a semicolon immediately after the while statement: `while(x < 10); { x++; }`.',
        whyItIsWrong: 'The semicolon creates an empty body statement, trapping the program in an infinite loop without ever reaching `{ x++; }`.',
        correction: 'Never put a semicolon after `while(condition)` header.'
      }
    ],
    importantRules: [
      'The while loop is entry-controlled: if condition is false initially, body runs 0 times.',
      'The condition expression must evaluate to a `boolean` type.',
      'Always modify the state inside the body to prevent infinite execution.'
    ],
    interviewPerspective: {
      question: 'How do you reverse an integer in Java using a while loop and handle 32-bit overflow?',
      answer: 'Extract digits using `% 10` and `/ 10`. Before multiplying `reversed * 10`, check if `reversed > Integer.MAX_VALUE / 10` to guard against 32-bit integer overflow.',
      trap: 'Reversing `1534236469` overflows standard `int` bounds if unchecked.'
    },
    practiceQuestions: [
      {
        question: 'Count the number of digits in an integer `N` using a `while` loop.',
        hint: 'Repeatedly divide `N` by 10 until it reaches 0, incrementing a counter.',
        solution: `int count = 0; while(n > 0) { count++; n /= 10; }`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m4-t2-q1',
        type: 'mcq',
        prompt: 'If `int x = 5; while (x < 3) { x++; }` executes, how many times will the loop body run?',
        options: ['0 times', '1 time', '2 times', 'Infinite times'],
        correctAnswer: 0,
        explanation: 'Because `5 < 3` evaluates to `false` on the initial entry test, the while body is skipped entirely.'
      }
    ]
  },

  'do-while-loop': {
    id: 'do-while-loop',
    moduleId: 'm4',
    topicNumber: 3,
    title: 'The do-while Loop',
    shortSummary: 'Learn exit-controlled loops in Java that guarantee at least one execution of the body.',
    whatIsIt: 'A `do-while` loop is an exit-controlled loop where the body executes first, and the conditional expression is tested at the end of each cycle.',
    whyDoWeNeedIt: 'Ideal for interactive menu prompts, password validation, and CLI tools where the prompt must be presented to the user at least once before testing input.',
    syntax: `do {
    // Body executes at least once
} while (booleanCondition); // Note required semicolon!`,
    basicExample: {
      code: `public class DoWhileDemo {
    public static void main(String[] args) {
        int attempts = 1;
        do {
            System.out.println("Processing transaction attempt #" + attempts);
            attempts++;
        } while (attempts <= 2);
    }
}`,
      output: `Processing transaction attempt #1
Processing transaction attempt #2`
    },
    detailedExample: {
      code: `public class MenuValidator {
    public static void main(String[] args) {
        int selectedOption = 3; // Simulated user input: option 3 (Exit)
        
        do {
            System.out.println("--- MENU ---");
            System.out.println("1. Balance | 2. Transfer | 3. Exit");
            System.out.println("Option chosen: " + selectedOption);
        } while (selectedOption != 3);
        
        System.out.println("Session closed successfully.");
    }
}`,
      output: `--- MENU ---
1. Balance | 2. Transfer | 3. Exit
Option chosen: 3
Session closed successfully.`
    },
    codeExplanation: [
      'do { ... }: Immediately enters and executes menu render code.',
      'while (selectedOption != 3);: Tests condition at the exit. Since option is 3, condition evaluates to false and loop terminates after 1 run.'
    ],
    visualExplanation: {
      title: 'Exit-Controlled vs Entry-Controlled Execution',
      description: 'In do-while, body execution is guaranteed before any condition evaluation occurs.',
      asciiDiagram: `[ Entry Point ]
       ↓
[ Execute Loop Body ]  ← Always runs at least ONCE!
       ↓
( Evaluate Condition )
 ├── True  ──→ Jump back to Loop Body
 └── False ──→ [ Exit Loop ]`
    },
    visualizerType: 'loop-cycle',
    commonMistakes: [
      {
        mistake: 'Forgetting the semicolon `;` after the `while(condition)` at the end of a do-while loop.',
        whyItIsWrong: 'In Java syntax, `do { ... } while(cond);` requires a terminating semicolon.',
        correction: 'Always terminate `do-while` statements with a semicolon.'
      }
    ],
    importantRules: [
      'A do-while loop is guaranteed to execute at least 1 time.',
      'The terminating semicolon `;` after `while(condition)` is required.',
      'Variables declared inside the `do { }` block are not in scope inside the `while(...)` condition.'
    ],
    interviewPerspective: {
      question: 'When should you choose a `do-while` loop over a `while` loop?',
      answer: 'Choose `do-while` when the initial state is unknown until the first iteration runs, such as prompting a user for console input, polling a hardware sensor for an initial reading, or rendering an interactive CLI menu.',
      trap: 'Remember variable scope: variables tested in the `while` clause must be declared outside the `do` block.'
    },
    practiceQuestions: [
      {
        question: 'Write a `do-while` snippet that prints numbers from 10 down to 1.',
        hint: 'Initialize `int i = 10;`, print and decrement `i--`, test `while(i >= 1)`.',
        solution: `int i = 10; do { System.out.print(i + " "); i--; } while(i >= 1);`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m4-t3-q1',
        type: 'mcq',
        prompt: 'What is the minimum number of times a `do-while` loop body will execute?',
        options: ['1 time', '0 times', '2 times', 'Depends on condition'],
        correctAnswer: 0,
        explanation: 'Because condition testing occurs at the exit, a do-while loop always executes at least 1 time.'
      }
    ]
  },

  'for-loop': {
    id: 'for-loop',
    moduleId: 'm4',
    topicNumber: 4,
    title: 'The for Loop',
    shortSummary: 'Master the compact, canonical for-loop structure in Java with initialization, condition, and step updates.',
    whatIsIt: 'The `for` loop is a compact iteration structure combining initialization, condition checking, and counter update into a single unified header.',
    whyDoWeNeedIt: 'When the number of iterations or range boundaries are known in advance, the `for` loop provides clean, localized variable scoping and prevents infinite loop bugs.',
    syntax: `for (initialization; condition; update) {
    // Loop body
}`,
    basicExample: {
      code: `public class ForDemo {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
    }
}`,
      output: `1 2 3 4 5 `
    },
    detailedExample: {
      code: `public class MultiVariableFor {
    public static void main(String[] args) {
        // Multiple loop variables and step updates
        for (int i = 1, j = 10; i <= j; i += 2, j -= 2) {
            System.out.printf("i = %d, j = %d, Product = %d%n", i, j, (i * j));
        }
    }
}`,
      output: `i = 1, j = 10, Product = 10
i = 3, j = 8, Product = 24
i = 5, j = 6, Product = 30`
    },
    codeExplanation: [
      'int i = 1, j = 10: Declares and initializes two loop counters in the same statement.',
      'i <= j: Evaluates continuation condition before each step.',
      'i += 2, j -= 2: Updates both counters simultaneously at iteration end.'
    ],
    visualExplanation: {
      title: 'For Loop 4-Step Execution Cycle',
      description: '1. Init (once) -> 2. Condition -> 3. Body -> 4. Update -> repeat 2..4.',
      asciiDiagram: `for ( [1] init ; [2] condition ; [4] update ) {
         [3] body statements;
}`
    },
    visualizerType: 'loop-cycle',
    commonMistakes: [
      {
        mistake: 'Using the loop index variable outside the for loop after declaring it in the header.',
        whyItIsWrong: 'Variables declared in `for (int i = 0; ...)` are strictly block-scoped to the loop.',
        correction: 'Declare the variable before the loop if you need its value after loop termination.'
      }
    ],
    importantRules: [
      'All 3 parts of the for header are optional: `for (;;)` creates an intentional infinite loop.',
      'Multiple variables initialized in the header must share the same data type.',
      'Use for loops whenever traversing indexed arrays or fixed ranges.'
    ],
    interviewPerspective: {
      question: 'What is the difference between `for(int i=0; i<n; ++i)` and `for(int i=0; i<n; i++)` in Java?',
      answer: 'In Java, the bytecode generated by modern javac compilers for prefix `++i` and postfix `i++` in the loop update step is completely identical. There is zero performance difference.',
      trap: 'Do not claim `++i` is faster in Java; the JIT compiler optimizes both identically.'
    },
    practiceQuestions: [
      {
        question: 'Write a `for` loop that prints all even numbers from 2 to 20 on a single line.',
        hint: 'Start at `i = 2` and step with `i += 2`.',
        solution: `for(int i = 2; i <= 20; i += 2) System.out.print(i + " ");`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m4-t4-q1',
        type: 'mcq',
        prompt: 'What is the output of `for(int i = 0; i < 6; i += 2) System.out.print(i + " ");`?',
        options: ['0 2 4 ', '0 1 2 3 4 5 ', '2 4 6 ', '0 2 4 6 '],
        correctAnswer: 0,
        explanation: '`i` takes values 0, 2, 4. When `i` becomes 6, `6 < 6` evaluates to false, terminating the loop.'
      }
    ]
  },

  'nested-loops': {
    id: 'nested-loops',
    moduleId: 'm4',
    topicNumber: 5,
    title: 'Nested Loops',
    shortSummary: 'Understand outer and inner loop execution for 2D grids, matrices, and pattern printing.',
    whatIsIt: 'A nested loop is a loop placed inside the body of another loop.',
    whyDoWeNeedIt: 'Essential for processing multi-dimensional data (2D grids, tables, images, game boards) and comparing all pairs of elements ($O(N^2)$ algorithms).',
    syntax: `for (int row = 0; row < rows; row++) {
    for (int col = 0; col < cols; col++) {
        // Inner loop runs (rows * cols) total times
    }
}`,
    basicExample: {
      code: `public class GridDemo {
    public static void main(String[] args) {
        for (int r = 1; r <= 2; r++) {
            for (int c = 1; c <= 3; c++) {
                System.out.print("(" + r + "," + c + ") ");
            }
            System.out.println();
        }
    }
}`,
      output: `(1,1) (1,2) (1,3) 
(2,1) (2,2) (2,3) `
    },
    detailedExample: {
      code: `public class StarPattern {
    public static void main(String[] args) {
        int n = 4;
        for (int i = 1; i <= n; i++) {
            // Print leading spaces
            for (int s = 1; s <= n - i; s++) {
                System.out.print(" ");
            }
            // Print asterisks
            for (int j = 1; j <= (2 * i - 1); j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
      output: `   *
  ***
 *****
*******`
    },
    codeExplanation: [
      'Outer loop (i = 1 to n): Controls the current row level.',
      'First inner loop (s): Computes indentation spaces for pyramid alignment.',
      'Second inner loop (j): Prints `2*i - 1` odd asterisks per row.'
    ],
    visualExplanation: {
      title: '2D Coordinate Traversal Matrix',
      description: 'For each single tick of the outer loop, the inner loop completes all its iterations.',
      asciiDiagram: `Outer Row 1 ──→ Col 1, Col 2, Col 3
Outer Row 2 ──→ Col 1, Col 2, Col 3
Outer Row 3 ──→ Col 1, Col 2, Col 3
Total Iterations = Rows × Columns (3 × 3 = 9)`
    },
    visualizerType: 'array-index',
    commonMistakes: [
      {
        mistake: 'Reusing the outer loop variable name in the inner loop (e.g. `for(int i=0;... for(int i=0;...`).',
        whyItIsWrong: 'Causes variable shadowing compiler error or corrupts the outer loop counter.',
        correction: 'Use distinct variable names: `i` and `j`, or descriptive names like `row` and `col`.'
      }
    ],
    importantRules: [
      'Inner loop executes completely for each individual iteration of the outer loop.',
      'Time complexity multiplies: nested loops with limit N run in $O(N^2)$ time.',
      'Limit nesting depth to 2 levels when possible for maintainability.'
    ],
    interviewPerspective: {
      question: 'How do you optimize nested loop algorithms to avoid $O(N^2)$ time complexity?',
      answer: 'Use HashMaps/HashSets for $O(1)$ lookups (reducing to $O(N)$), two-pointer techniques on sorted arrays, or binary search ($O(N \\log N)$).',
      trap: 'Avoid 3+ levels of nested loops in performance-sensitive backend code.'
    },
    practiceQuestions: [
      {
        question: 'Print a multiplication table from 1x1 to 5x5 using nested loops.',
        hint: 'Outer loop `i = 1..5`, inner loop `j = 1..5`, print `i * j`.',
        solution: `for(int i=1;i<=5;i++){for(int j=1;j<=5;j++) System.out.printf("%4d", i*j); System.out.println();}`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m4-t5-q1',
        type: 'mcq',
        prompt: 'If an outer loop runs 4 times and an inner loop runs 5 times for each outer step, how many total times does the inner loop body run?',
        options: ['20 times', '9 times', '5 times', '1 time'],
        correctAnswer: 0,
        explanation: 'Total inner iterations = outer count × inner count = 4 × 5 = 20.'
      }
    ]
  },

  'break-continue-labeled': {
    id: 'break-continue-labeled',
    moduleId: 'm4',
    topicNumber: 6,
    title: 'Break, Continue & Labeled Statements',
    shortSummary: 'Master jump statements to exit loops, skip iterations, and break out of nested loops with labels.',
    whatIsIt: '`break` terminates the enclosing loop immediately; `continue` skips the remainder of the current iteration; labeled statements allow breaking out of multiple nested loops at once.',
    whyDoWeNeedIt: 'Crucial for early exit upon finding a target, filtering unwanted values, and escaping multi-layered nested searches.',
    syntax: `break;              // Exits innermost loop
continue;           // Skips to next iteration
break outerLabel;   // Breaks out of outer loop block`,
    basicExample: {
      code: `public class BreakContinueDemo {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            if (i == 2) continue; // Skip 2
            if (i == 4) break;    // Stop at 4
            System.out.print(i + " ");
        }
    }
}`,
      output: `1 3 `
    },
    detailedExample: {
      code: `public class LabeledBreakDemo {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 99, 6},
            {7, 8, 9}
        };
        int target = 99;
        boolean found = false;

        searchGrid:
        for (int r = 0; r < matrix.length; r++) {
            for (int c = 0; c < matrix[r].length; c++) {
                if (matrix[r][c] == target) {
                    System.out.printf("Found %d at [%d, %d]%n", target, r, c);
                    found = true;
                    break searchGrid; // Breaks out of BOTH loops!
                }
            }
        }
    }
}`,
      output: `Found 99 at [1, 1]`
    },
    codeExplanation: [
      'searchGrid: Label applied to the outer loop.',
      'break searchGrid: Terminates the entire nested structure instantly when target 99 is found, avoiding wasted iterations.'
    ],
    visualExplanation: {
      title: 'Break vs Continue Control Flow',
      description: 'Break jumps past the loop closing brace. Continue jumps to the loop update/condition step.',
      asciiDiagram: `┌── Loop Header
│
├── if (cond) continue; ──→ [ Jump directly to Loop Header Update ]
│
├── if (cond) break;    ──→ [ Jump directly OUTSIDE Loop closing brace ]
│
└── Loop Closing Brace
    ↓
[ Next statement outside loop ]`
    },
    visualizerType: 'decision-tree',
    commonMistakes: [
      {
        mistake: 'Placing statements immediately after an unconditional break or continue.',
        whyItIsWrong: 'Causes compiler error: "Unreachable code".',
        correction: 'Ensure jump statements are guarded inside conditional if blocks.'
      }
    ],
    importantRules: [
      '`break` exits only the nearest enclosing loop or switch statement.',
      '`continue` skips the rest of the body and triggers the update step.',
      'Java has no `goto` keyword; labeled break/continue is the structured alternative.'
    ],
    interviewPerspective: {
      question: 'How do labeled break statements differ from goto in C/C++?',
      answer: 'Java labeled breaks can only transfer control outward to the end of an enclosing labeled block or loop. Unlike unrestricted `goto`, they cannot jump backwards, into arbitrary blocks, or bypass initialization.',
      trap: 'Labels must precede a loop or block directly.'
    },
    practiceQuestions: [
      {
        question: 'Print all numbers from 1 to 20 except multiples of 3 using `continue`.',
        hint: 'Use `if (i % 3 == 0) continue;`.',
        solution: `for(int i=1;i<=20;i++){ if(i%3==0) continue; System.out.print(i + " "); }`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m4-t6-q1',
        type: 'mcq',
        prompt: 'What happens when `continue` executes inside a standard `for` loop in Java?',
        options: [
          'The remaining statements in current iteration are skipped and update step runs',
          'The loop terminates completely',
          'The program exits the main method',
          'The loop restarts from `i = 0`'
        ],
        correctAnswer: 0,
        explanation: '`continue` bypasses the rest of the body and immediately triggers the update expression and next condition check.'
      }
    ]
  },

  'infinite-loops-pitfalls': {
    id: 'infinite-loops-pitfalls',
    moduleId: 'm4',
    topicNumber: 7,
    title: 'Infinite Loops & Iteration Pitfalls',
    shortSummary: 'Diagnose infinite loops, floating-point drift, off-by-one errors, and implement safe event loops.',
    whatIsIt: 'An infinite loop is a loop whose termination condition is never satisfied, running indefinitely until process termination or resource exhaustion.',
    whyDoWeNeedIt: 'While unintentional infinite loops are critical bugs, intentional infinite loops (`while(true)`) power server request listeners, game frame engines, and background worker threads.',
    syntax: `// Intentional event loop pattern:
while (true) {
    // Process incoming event
    if (shouldShutdown) {
        break;
    }
}`,
    basicExample: {
      code: `public class SafeEventLoop {
    public static void main(String[] args) {
        int ticks = 0;
        while (true) {
            ticks++;
            System.out.println("Processing frame " + ticks);
            if (ticks >= 3) {
                System.out.println("Shutting down event loop.");
                break;
            }
        }
    }
}`,
      output: `Processing frame 1
Processing frame 2
Processing frame 3
Shutting down event loop.`
    },
    detailedExample: {
      code: `public class FloatingPointTrap {
    public static void main(String[] args) {
        // DANGEROUS: Floating point precision drift
        // for (double d = 0.0; d != 1.0; d += 0.1) -> May never equal exactly 1.0!
        
        // SAFE: Use inequality operator <= or integer counters
        int steps = 10;
        for (int i = 0; i <= steps; i++) {
            double d = i * 0.1;
            System.out.printf("Step %d = %.1f%n", i, d);
        }
    }
}`,
      output: `Step 0 = 0.0
Step 1 = 0.1
Step 2 = 0.2
Step 3 = 0.3
Step 4 = 0.4
Step 5 = 0.5
Step 6 = 0.6
Step 7 = 0.7
Step 8 = 0.8
Step 9 = 0.9
Step 10 = 1.0`
    },
    codeExplanation: [
      'd != 1.0 hazard: In IEEE 754 floating point arithmetic, 0.1 cannot be represented with exact binary precision, causing drift (0.9999999999 instead of 1.0).',
      'Step calculation: Using an integer counter `i` scaled by `0.1` guarantees deterministic termination.'
    ],
    visualExplanation: {
      title: 'Common Infinite Loop Traps',
      description: '1. Wrong update direction (i++ instead of i--) | 2. Floating-point != test | 3. Trailing semicolon.',
      asciiDiagram: `Trap 1: for (int i = 10; i > 0; i++)   ← i grows away from 0!
Trap 2: while (d != 1.0) { d += 0.1; } ← binary precision misses 1.0!
Trap 3: while (x < 10); { x++; }        ← semicolon creates empty infinite spin!`
    },
    visualizerType: 'loop-cycle',
    commonMistakes: [
      {
        mistake: 'Using `!=` with `double` or `float` variables as loop termination conditions.',
        whyItIsWrong: 'Microscopic binary rounding errors cause values like 0.9999999 to jump past 1.0 without exact match.',
        correction: 'Always use inequality operators (`<=` or `>=`) or integer loop counters.'
      }
    ],
    importantRules: [
      'Always use inequality operators (`<=`, `>=`) rather than exact equality (`==`, `!=`) for loop termination.',
      'Always include an exit break condition when designing `while(true)` loops.',
      'Check loop counter direction: positive steps require `<`, negative steps require `>`.'
    ],
    interviewPerspective: {
      question: 'How do you prevent CPU starvation in intentional infinite background worker loops in Java?',
      answer: 'Insert non-blocking sleep pauses (`Thread.sleep(ms)`) or use blocking queue operations (`queue.take()`) so the thread yields CPU resources while waiting for incoming tasks.',
      trap: 'An empty `while(true) {}` consumes 100% of an entire CPU core.'
    },
    practiceQuestions: [
      {
        question: 'Fix the bug in: `for (int i = 5; i > 0; i++) System.out.println(i);`',
        hint: 'Look at the update step.',
        solution: 'Change `i++` to `i--`.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m4-t7-q1',
        type: 'mcq',
        prompt: 'Why is `for (double d = 0.0; d != 1.0; d += 0.1)` unsafe in Java?',
        options: [
          'Floating-point rounding errors can cause `d` to skip exact equality with `1.0`, creating an infinite loop',
          'Java does not allow `double` in for loops',
          '`d += 0.1` throws a compilation error',
          'The loop will throw a NullPointerException'
        ],
        correctAnswer: 0,
        explanation: 'Binary floating-point arithmetic introduces microscopic precision drift, so `d` may skip past 1.0 without ever evaluating to exact equality.'
      }
    ]
  },

  'iterative-algorithms': {
    id: 'iterative-algorithms',
    moduleId: 'm4',
    topicNumber: 8,
    title: 'Iterative Algorithms: Prime, Factorial & Fibonacci',
    shortSummary: 'Implement foundational computational algorithms: Factorials, Fibonacci sequences, and O(sqrt(N)) Prime testing.',
    whatIsIt: 'Iterative algorithms solve complex mathematical and data problems through systematic step-by-step repetition.',
    whyDoWeNeedIt: 'Foundational for technical coding interviews, numerical analysis, cryptography, and algorithm complexity optimization.',
    syntax: `// Prime Check: test divisors up to sqrt(N)
for (int i = 2; i * i <= n; i++) {
    if (n % i == 0) { isPrime = false; break; }
}`,
    basicExample: {
      code: `public class FactorialDemo {
    public static void main(String[] args) {
        int n = 5;
        long fact = 1;
        for (int i = 2; i <= n; i++) {
            fact *= i;
        }
        System.out.println(n + "! = " + fact);
    }
}`,
      output: `5! = 120`
    },
    detailedExample: {
      code: `public class ClassicAlgorithms {
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }

    public static void printFibonacci(int count) {
        int a = 0, b = 1;
        for (int i = 0; i < count; i++) {
            System.out.print(a + " ");
            int next = a + b;
            a = b;
            b = next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        System.out.println("Is 29 prime? " + isPrime(29));
        System.out.print("First 7 Fibonacci numbers: ");
        printFibonacci(7);
    }
}`,
      output: `Is 29 prime? true
First 7 Fibonacci numbers: 0 1 1 2 3 5 8 `
    },
    codeExplanation: [
      'i * i <= n: Mathematically equivalent to `i <= sqrt(n)` without expensive floating point `Math.sqrt()` calls.',
      'isPrime early exit: Returns false the moment the first divisor is detected ($O(\\sqrt{N})$ efficiency).',
      'Fibonacci iteration: Updates two pointer variables `a` and `b` in $O(N)$ time and $O(1)$ space.'
    ],
    visualExplanation: {
      title: 'O(sqrt(N)) Prime Search Optimization',
      description: 'Factors always occur in pairs (a × b = N). If no factor exists <= sqrt(N), none exists > sqrt(N).',
      asciiDiagram: `For N = 36: (sqrt = 6)
Pairs: (1 × 36), (2 × 18), (3 × 12), (4 × 9), (6 × 6)
Checking up to 6 inspects all possible factor pairings!`
    },
    visualizerType: 'loop-cycle',
    commonMistakes: [
      {
        mistake: 'Checking all numbers from 2 to N-1 for primality instead of stopping at sqrt(N).',
        whyItIsWrong: 'Testing up to N takes $O(N)$ time, which is millions of operations slower on large primes than $O(\\sqrt{N})$.',
        correction: 'Use `i * i <= n` as loop termination bound.'
      },
      {
        mistake: 'Using `int` for Factorials with $N > 12$.',
        whyItIsWrong: '$13! = 6,227,020,800$, which exceeds 32-bit `Integer.MAX_VALUE` ($2.14 \\times 10^9$) and overflows into negative numbers.',
        correction: 'Use `long` for factorials up to $N = 20$, and `BigInteger` for $N > 20$.'
      }
    ],
    importantRules: [
      'Use `long` for cumulative product calculations to prevent overflow.',
      'Short-circuit with `break` or `return` as soon as the outcome is determined.',
      'Fibonacci iterative approach uses $O(N)$ time and $O(1)$ auxiliary memory.'
    ],
    interviewPerspective: {
      question: 'Why is the iterative Fibonacci algorithm superior to naive recursion?',
      answer: 'Naive recursion branches into $O(2^N)$ exponential calls with redundant overlapping subproblems. The iterative approach calculates in $O(N)$ linear time with $O(1)$ constant space.',
      trap: 'Iterative Fibonacci requires only 2 state variables (`a` and `b`).'
    },
    practiceQuestions: [
      {
        question: 'Write a loop to calculate the GCD (Greatest Common Divisor) of two numbers using the Euclidean algorithm.',
        hint: 'Repeatedly update `b = a % b` and `a = prevB` until `b == 0`.',
        solution: `while(b != 0) { int temp = b; b = a % b; a = temp; } return a;`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m4-t8-q1',
        type: 'mcq',
        prompt: 'Why is checking divisors up to `i * i <= N` sufficient to determine if $N$ is prime?',
        options: [
          'Any factor greater than $\\sqrt{N}$ must be paired with a factor smaller than $\\sqrt{N}$',
          'Java cannot loop beyond square roots',
          'All numbers above square roots are prime',
          'It is an approximation that only works on odd numbers'
        ],
        correctAnswer: 0,
        explanation: 'Factors occur in pairs $(a \\times b = N)$. If neither factor is $\\le \\sqrt{N}$, their product would exceed $N$. Thus, searching up to $\\sqrt{N}$ is mathematically exhaustive.'
      }
    ]
  }
};
