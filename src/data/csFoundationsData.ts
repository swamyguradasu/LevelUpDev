export interface PracticeProblem {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  link?: string;
  tags?: string[];
}

export interface TopicDetail {
  id: string;
  title: string;
  summary: string;
  whatYouWillLearn: string;
  concept: string;
  whyItMatters: string;
  example: {
    language: string;
    code: string;
    explanation: string;
  };
  visualizerType?: 'two-pointers' | 'binary-search' | 'sliding-window' | 'stack' | 'big-o' | 'array-traversal' | 'none';
  keyTakeaways: string[];
  practiceProblems: PracticeProblem[];
}

export interface FoundationCategory {
  id: string;
  title: string;
  tagline: string;
  description: string;
  topics: TopicDetail[];
}

export interface FoundationLevel {
  id: string;
  levelNumber: string; // e.g. "01"
  title: string;
  iconName: string;
  shortDescription: string;
  longDescription: string;
  badge?: string;
  categories: FoundationCategory[];
}

export const CS_FOUNDATIONS_LEVELS: FoundationLevel[] = [
  {
    id: 'computer-fundamentals',
    levelNumber: '01',
    title: 'Computer Fundamentals',
    iconName: 'Cpu',
    shortDescription: 'Understand how computers work from the ground up.',
    longDescription: 'Understand how computers work at a basic hardware and systems level — from CPU registers and memory hierarchies to bit manipulation and program execution.',
    badge: 'Core Basics',
    categories: [
      {
        id: 'fundamentals',
        title: 'Computer Fundamentals',
        tagline: 'The architecture powering all digital computing.',
        description: 'Explore the fundamental components of computers, data representations, and how machine instructions run on bare metal.',
        topics: [
          {
            id: 'what-is-a-computer',
            title: 'What is a Computer?',
            summary: 'The universal programmable machine architecture.',
            whatYouWillLearn: 'Discover the von Neumann architecture, the input-process-output cycle, and how hardware collaborates to run software.',
            concept: 'A computer is a programmable electronic device that accepts data as input, processes it according to stored instructions, and produces output while retaining data in storage.',
            whyItMatters: 'All high-level programming ultimately compiles or interprets down to instructions executed by physical computer components.',
            example: {
              language: 'plaintext',
              code: `Input Device (Keyboard, Mouse, Network)
         │
         ▼
┌──────────────────────────────────────────────┐
│ CENTRAL PROCESSING UNIT (CPU)                │
│  - Control Unit (Fetch & Decode)             │
│  - Arithmetic Logic Unit (Execute math/logic)│
│  - Registers (Ultra-fast temporary storage)  │
└──────────────────────┬───────────────────────┘
                       │ High-speed Bus
                       ▼
┌──────────────────────────────────────────────┐
│ PRIMARY MEMORY (RAM)                         │
│ Holds active program code and working data   │
└──────────────────────────────────────────────┘`,
              explanation: 'The CPU continually executes the Fetch-Decode-Execute instruction cycle against instructions loaded into RAM.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Von Neumann architecture separates the processing unit (CPU) and storage (Memory).',
              'Programs must be loaded into memory (RAM) before the CPU can execute their instructions.',
              'The clock speed (GHz) determines how many instruction cycles the CPU can execute per second.'
            ],
            practiceProblems: [
              {
                title: 'Trace Instruction Execution',
                difficulty: 'Easy',
                description: 'Explain the 3 phases (Fetch, Decode, Execute) when a CPU runs a simple addition operation.'
              }
            ]
          },
          {
            id: 'cpu-basics',
            title: 'CPU Basics',
            summary: 'The brain of the computer: ALU, registers, and clock cycles.',
            whatYouWillLearn: 'Learn how CPU cores, cache hierarchies (L1, L2, L3), and instruction pipelines compute billions of operations per second.',
            concept: 'The Central Processing Unit (CPU) executes machine code instructions. It contains the Arithmetic Logic Unit (ALU), Control Unit, and high-speed registers.',
            whyItMatters: 'Understanding CPU caching and instruction pipelining helps write cache-friendly, performant software algorithms.',
            example: {
              language: 'c',
              code: `// C Example demonstrating cache-friendly sequential memory access
int sum_array(int arr[], int size) {
    int total = 0;
    for(int i = 0; i < size; i++) {
        total += arr[i]; // Sequential reads leverage CPU L1/L2 cache prefetching!
    }
    return total;
}`,
              explanation: 'When accessing contiguous memory, the CPU preloads cache lines (typically 64 bytes), dramatically reducing memory latency.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Registers provide single-cycle data access right on the CPU core.',
              'L1/L2/L3 caches bridge the speed gap between lightning-fast CPU cores and slower main RAM.',
              'Modern CPUs have multiple cores capable of true concurrent hardware parallelism.'
            ],
            practiceProblems: [
              {
                title: 'Analyze Cache Locality',
                difficulty: 'Medium',
                description: 'Compare row-major vs column-major matrix iteration in C/C++ in terms of CPU cache misses.'
              }
            ]
          },
          {
            id: 'ram-and-storage',
            title: 'RAM and Storage',
            summary: 'Volatile high-speed memory vs non-volatile persistent storage.',
            whatYouWillLearn: 'Understand the hierarchy between registers, SRAM, DRAM (RAM), NVMe SSDs, and hard drives.',
            concept: 'RAM (Random Access Memory) is fast, byte-addressable volatile memory lost on power down. Storage (SSDs/HDDs) is persistent block-based non-volatile media.',
            whyItMatters: 'Memory leaks exhaust available RAM and trigger operating system swapping or out-of-memory crashes.',
            example: {
              language: 'plaintext',
              code: `Speed Hierarchy & Latency Comparison:
CPU Register   : ~0.5 ns  (Ultra fast, ~1 KB)
L1 Cache       : ~1 ns    (~64 KB)
L2 Cache       : ~4 ns    (~512 KB)
L3 Cache       : ~10 ns   (~16-64 MB)
Main RAM (DDR5): ~50-100 ns (~16-64 GB)
NVMe SSD Read  : ~20,000 ns (20 µs) (~1-4 TB)
HDD Seek       : ~10,000,000 ns (10 ms) (~4-20 TB)`,
              explanation: 'Accessing RAM is roughly 200x faster than reading an SSD, and 100,000x faster than spinning magnetic disks.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'RAM provides random access (any memory address read in roughly uniform time).',
              'Virtual memory allows the OS to use SSD storage as temporary overflow (paging/swap).',
              'Data structures like B-Trees are optimized for disk block storage, while AVL/Red-Black trees fit in RAM.'
            ],
            practiceProblems: [
              {
                title: 'Memory vs Disk Performance Calculation',
                difficulty: 'Easy',
                description: 'Calculate the total latency difference when performing 10,000 lookups in RAM vs NVMe SSD.'
              }
            ]
          },
          {
            id: 'bits-and-bytes',
            title: 'Bits and Bytes',
            summary: 'Binary arithmetic, hexadecimal representation, and bitwise logic.',
            whatYouWillLearn: 'Master base-2 binary, base-16 hex, two\'s complement signed numbers, and bitwise operators (&, |, ^, ~, <<, >>).',
            concept: 'Computers represent all state using binary digits (bits: 0 or 1). 8 bits make 1 byte, capable of representing 256 distinct values ($2^8$).',
            whyItMatters: 'Bit manipulation enables ultra-fast flags, bitmask dynamic programming, cryptography, and network packet decoding.',
            example: {
              language: 'python',
              code: `# Bitwise operations in Python
a = 0b1100  # 12 in decimal
b = 0b1010  # 10 in decimal

print(bin(a & b))  # AND : 0b1000 (8)
print(bin(a | b))  # OR  : 0b1110 (14)
print(bin(a ^ b))  # XOR : 0b0110 (6)
print(bin(a << 1)) # Left Shift (multiply by 2): 0b11000 (24)`,
              explanation: 'Bitwise operations execute in a single CPU clock cycle, making them the fastest computational operations possible.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              '1 Byte = 8 bits. 1 Kilobyte (KB) = 1024 bytes ($2^{10}$).',
              'Negative integers are standardly stored using Two\'s Complement representation.',
              'Bitwise AND with a mask ($x \\& (1 \\ll k)$) checks if the $k$-th bit is active.'
            ],
            practiceProblems: [
              {
                title: 'Number of 1 Bits (Hamming Weight)',
                difficulty: 'Easy',
                description: 'Count the number of set bits (1s) in an integer using bitwise operations.'
              },
              {
                title: 'Single Number',
                difficulty: 'Easy',
                description: 'Given a non-empty array where every element appears twice except for one, find that single one using XOR.'
              }
            ]
          },
          {
            id: 'operating-systems-basics',
            title: 'Operating Systems Basics',
            summary: 'The software layer managing hardware, security, and multitasking.',
            whatYouWillLearn: 'Learn kernel vs user mode, system calls, device drivers, and core OS responsibilities.',
            concept: 'An Operating System (OS) is the foundational system software that manages hardware resources, isolates processes, and provides an abstraction API (system calls) to applications.',
            whyItMatters: 'Every program depends on OS services for memory allocation, file I/O, network sockets, and process management.',
            example: {
              language: 'c',
              code: `// System call transition from User Space to Kernel Space
#include <unistd.h>

int main() {
    // write() triggers a software interrupt / syscall instruction
    // Kernel takes over, verifies security, writes bytes to stdout file descriptor
    write(1, "Hello from syscall\\n", 19);
    return 0;
}`,
              explanation: 'User programs cannot directly access hardware; they request operations through secure syscall boundaries.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Dual-mode operation (User Mode vs Kernel Mode) protects system integrity.',
              'System calls allow user applications to safely request hardware operations from the kernel.',
              'The OS schedules multiple running tasks to create the seamless illusion of concurrency.'
            ],
            practiceProblems: [
              {
                title: 'Identify System Calls',
                difficulty: 'Easy',
                description: 'List 5 common system calls (e.g. open, read, fork, exec, socket) and their primary roles.'
              }
            ]
          },
          {
            id: 'processes-and-threads',
            title: 'Processes and Threads',
            summary: 'Isolated execution environments vs lightweight shared-memory threads.',
            whatYouWillLearn: 'Understand virtual address spaces, process isolation, multithreading, context switching, and concurrency safety.',
            concept: 'A Process is an executing instance of a program with its own private virtual memory space. A Thread is a lightweight unit of execution within a process that shares memory with other threads.',
            whyItMatters: 'Modern applications use multithreading and multi-processing to handle thousands of concurrent web requests and heavy background computations.',
            example: {
              language: 'python',
              code: `import threading
import time

def worker(thread_id):
    print(f"Thread {thread_id} starting task...")
    time.sleep(0.5)
    print(f"Thread {thread_id} finished!")

threads = [threading.Thread(target=worker, args=(i,)) for i in range(3)]
for t in threads: t.start()
for t in threads: t.join()`,
              explanation: 'Threads run concurrently and share memory, requiring synchronization primitives like mutexes to prevent race conditions.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Processes do not share memory by default, ensuring crash isolation.',
              'Threads share heap, global variables, and open file handles, making communication fast but prone to race conditions.',
              'A Context Switch saves the CPU state of one thread/process and loads another.'
            ],
            practiceProblems: [
              {
                title: 'Process vs Thread Comparison',
                difficulty: 'Easy',
                description: 'Explain 3 distinct advantages of using threads over separate processes, and 2 trade-offs.'
              }
            ]
          },
          {
            id: 'files-and-file-systems',
            title: 'Files and File Systems',
            summary: 'Inodes, directory trees, storage blocks, and file permissions.',
            whatYouWillLearn: 'Learn how files are indexed into blocks on disk, hierarchical directory trees, file descriptors, and buffered I/O.',
            concept: 'A file system (such as ext4, NTFS, APFS) structures raw storage blocks into named files, directories, metadata (inodes), and permission matrices.',
            whyItMatters: 'Efficient file reading and streaming avoids loading giant gigabyte datasets into limited server RAM.',
            example: {
              language: 'plaintext',
              code: `File System Inode Structure:
[ Inode: 40921 ] ──► Metadata:
                     - Owner / Permissions (chmod 644)
                     - File Size: 14.2 KB
                     - Timestamps (Created, Modified)
                     - Direct Block Pointers ──► [Block 102] [Block 103]
                     - Indirect Block Pointer ──► [Block 500] ──► [Blocks...]`,
              explanation: 'Directories are just special files mapping human filenames to numerical inode pointers.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'File Descriptors are integer handles used by processes to read/write open streams.',
              'Buffered I/O batches small reads/writes into large block operations to minimize disk latency.',
              'POSIX permissions (Read, Write, Execute for Owner, Group, Others) secure files.'
            ],
            practiceProblems: [
              {
                title: 'Calculate Inode Storage Capacity',
                difficulty: 'Medium',
                description: 'Explain how double-indirect block pointers allow file systems to store files larger than 1 Terabyte.'
              }
            ]
          },
          {
            id: 'how-programs-execute',
            title: 'How Programs Execute',
            summary: 'From high-level source code to binary compilation and execution.',
            whatYouWillLearn: 'Trace the lifecycle from source code → preprocessor → compiler → assembler → linker → loader → CPU execution.',
            concept: 'Source code is translated into machine instructions (0s and 1s) by a compiler/assembler or interpreted line-by-line by a virtual machine/runtime.',
            whyItMatters: 'Knowing the compilation and linking pipeline demystifies compiler errors, unresolved symbol linker bugs, and runtime memory crashes.',
            example: {
              language: 'plaintext',
              code: `Source Code (main.c)
       │ Preprocessor (expands #include, #define)
       ▼
Preprocessed Source
       │ Compiler (Lexical analysis, AST, Optimization, Codegen)
       ▼
Assembly Code (x86-64 / ARM64 assembly)
       │ Assembler
       ▼
Object File (.o / .obj machine code)
       │ Linker (combines object files + external libraries)
       ▼
Executable Binary (.exe / ELF binary)
       │ OS Loader (allocates memory pages, maps stack/heap)
       ▼
Active Running Process in RAM!`,
              explanation: 'The OS loader copies the machine code into memory, sets up the stack and heap, and points the CPU Instruction Pointer to the program entry point.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Compilers perform syntax parsing, semantic analysis, and optimization before generating machine code.',
              'Interpreted languages (Python, JS) use bytecode virtual machines or JIT (Just-In-Time) compilation.',
              'The Call Stack tracks active function execution frames and return addresses.'
            ],
            practiceProblems: [
              {
                title: 'Compiled vs Interpreted Trade-offs',
                difficulty: 'Easy',
                description: 'Compare C++ vs Python in terms of execution speed, portable distribution, and development agility.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'programming-fundamentals',
    levelNumber: '02',
    title: 'Programming Fundamentals',
    iconName: 'Code2',
    shortDescription: 'Build the core coding knowledge required before advanced DSA.',
    longDescription: 'Master variables, primitive and reference types, control flow, loops, scoping rules, modular functions, and recursive thinking.',
    badge: 'Coding Core',
    categories: [
      {
        id: 'programming-core',
        title: 'Programming Core',
        tagline: 'The universal syntax and semantics of software engineering.',
        description: 'Learn the foundational building blocks present in virtually every modern programming language.',
        topics: [
          {
            id: 'variables-and-data-types',
            title: 'Variables & Data Types',
            summary: 'Storing, classifying, and manipulating data in memory.',
            whatYouWillLearn: 'Explore primitives (integers, floats, booleans, characters) vs reference types (objects, arrays, strings).',
            concept: 'A variable is a named storage location in memory with an associated data type that dictates what operations can be performed on it.',
            whyItMatters: 'Choosing appropriate data types prevents overflow errors, reduces memory footprint, and enforces type safety.',
            example: {
              language: 'typescript',
              code: `// Strongly-typed variable definitions
let age: number = 21;
let developerName: string = "Alex";
let isEnrolled: boolean = true;
let scores: number[] = [95, 88, 100]; // Reference type (Array in Heap)`,
              explanation: 'Primitives are stored directly on the stack or in registers, while complex reference types live on the heap with memory pointers.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Static typing checks types at compile time (TypeScript, Java, C++), while dynamic typing checks at runtime (Python, JS).',
              'Integers have bounded bit widths (8-bit, 32-bit, 64-bit) which can overflow if exceeded.',
              'Floating point numbers follow IEEE 754 standards with precision considerations.'
            ],
            practiceProblems: [
              {
                title: 'Data Type Size Evaluation',
                difficulty: 'Easy',
                description: 'Determine the byte footprint of an array of 1,000,000 64-bit floating point numbers in memory.'
              }
            ]
          },
          {
            id: 'operators-and-expressions',
            title: 'Operators & Expressions',
            summary: 'Arithmetic, logical, relational, and assignment operations.',
            whatYouWillLearn: 'Understand operator precedence, short-circuit logical evaluation, and type coercion.',
            concept: 'Operators perform mathematical or logical evaluations on one or more operands to evaluate to a concrete result value.',
            whyItMatters: 'Short-circuit evaluation (\`&&\`, \`||\`) is widely used for null-checking and defensive programming.',
            example: {
              language: 'javascript',
              code: `// Short-circuit logical operator guard
const user = { profile: { name: "Sarah" } };

// Safely evaluate without TypeError:
const userName = user && user.profile && user.profile.name;
console.log(userName); // "Sarah"`,
              explanation: 'In \`A && B\`, if \`A\` evaluates to false, \`B\` is never evaluated, avoiding null reference exceptions.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Arithmetic operators follow standard mathematical precedence rules.',
              'Logical operators (\`&&\`, \`||\`, \`!\`) combine boolean predicates.',
              'Strict equality (\`===\`) checks both value and type without silent type coercion.'
            ],
            practiceProblems: [
              {
                title: 'Evaluate Expression Precedence',
                difficulty: 'Easy',
                description: 'Evaluate the exact result of complex boolean and arithmetic expressions without running code.'
              }
            ]
          },
          {
            id: 'conditional-statements',
            title: 'Conditional Statements',
            summary: 'Branching logic with if-else, switch-case, and ternary operators.',
            whatYouWillLearn: 'Direct program execution down distinct code paths based on dynamic runtime conditions.',
            concept: 'Conditionals evaluate boolean expressions to selectively execute blocks of code.',
            whyItMatters: 'Every business rule, authentication check, and algorithm base-case relies on conditional branches.',
            example: {
              language: 'python',
              code: `def get_ticket_price(age):
    if age < 5:
        return 0  # Free for toddlers
    elif age <= 18:
        return 12 # Student discount
    elif age >= 65:
        return 10 # Senior discount
    else:
        return 20 # Standard adult price`,
              explanation: 'Conditions evaluate sequentially from top to bottom; the first true branch executes and exits the chain.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              '\`if-else if-else\` structures handle multiple non-overlapping conditions.',
              '\`switch\` / pattern matching provides clean dispatching when comparing a single variable against many discrete values.',
              'Avoid deeply nested if-statements by using early return guards.'
            ],
            practiceProblems: [
              {
                title: 'FizzBuzz',
                difficulty: 'Easy',
                description: 'Write a program that prints numbers 1 to 100, substituting multiples of 3 with "Fizz", 5 with "Buzz", and both with "FizzBuzz".'
              }
            ]
          },
          {
            id: 'loops-and-iteration',
            title: 'Loops & Iteration',
            summary: 'for, while, do-while loops, and termination conditions.',
            whatYouWillLearn: 'Iterate over collections, execute repeating logic, and prevent catastrophic infinite loops.',
            concept: 'Loops repeatedly execute a code block as long as a specified continuation condition remains true.',
            whyItMatters: 'Iteration is the backbone of searching, data processing, transformations, and algorithmic traversals.',
            example: {
              language: 'python',
              code: `# Two-pointer loop pattern
arr = [10, 20, 30, 40, 50]

for i in range(len(arr)):
    print(f"Index {i} holds value {arr[i]}")

# While loop with explicit counter
left = 0
while left < len(arr):
    left += 1`,
              explanation: 'For-loops are best when the number of iterations is known, while while-loops shine when waiting on dynamic state.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Always ensure loop invariant progress towards the termination condition to prevent infinite loops.',
              '\`break\` exits the nearest enclosing loop immediately; \`continue\` skips to the next iteration.',
              'Nested loops multiply time complexity (O(N * M) or O(N^2)).'
            ],
            practiceProblems: [
              {
                title: 'Reverse an Integer',
                difficulty: 'Easy',
                description: 'Reverse digits of an integer using a while loop and modulo arithmetic.'
              }
            ]
          },
          {
            id: 'functions-and-scope',
            title: 'Functions & Scope',
            summary: 'Modular reusable code, parameters, return values, and variable lifetimes.',
            whatYouWillLearn: 'Structure code into pure functions, understand local vs global scope, and pass-by-value vs pass-by-reference.',
            concept: 'A function is a self-contained, parameterized block of code that performs a specific task and optionally returns a result.',
            whyItMatters: 'Functions eliminate duplicate code (DRY principle) and make software testable, readable, and maintainable.',
            example: {
              language: 'javascript',
              code: `function calculateTotal(price, taxRate = 0.08) {
    const tax = price * taxRate; // 'tax' is locally scoped to this function
    return price + tax;
}

const total = calculateTotal(100); // 108
// console.log(tax); // ReferenceError: tax is not defined outside!`,
              explanation: 'Variables declared inside a function have local scope and cannot be accessed from outside scopes.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Pure functions produce the same output for identical inputs and have no side effects.',
              'Scope defines where a variable is accessible; shadowing occurs when a local variable hides an outer variable.',
              'Parameters receive arguments by value (copies) or by reference (memory addresses).'
            ],
            practiceProblems: [
              {
                title: 'Design a Pure Transformation Pipeline',
                difficulty: 'Easy',
                description: 'Write modular functions to clean, filter, and aggregate a list of user transactions.'
              }
            ]
          },
          {
            id: 'recursion-basics',
            title: 'Recursion Basics',
            summary: 'Functions that call themselves, base cases, and call stacks.',
            whatYouWillLearn: 'Master the two essential rules of recursion: the Base Case and the Recursive Step.',
            concept: 'Recursion is a programming technique where a function solves a problem by calling itself with smaller sub-instances of the same problem.',
            whyItMatters: 'Tree traversals, graph searches (DFS), divide-and-conquer (Merge Sort), and dynamic programming depend heavily on recursion.',
            example: {
              language: 'python',
              code: `def factorial(n):
    # 1. Base Case (stops recursion)
    if n <= 1:
        return 1
    # 2. Recursive Case (breaks down problem)
    return n * factorial(n - 1)

print(factorial(5)) # 120 (5 * 4 * 3 * 2 * 1)`,
              explanation: 'Each recursive call pushes a new stack frame onto the Call Stack until the base case is reached, then bubbles back up.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'A missing or incorrect base case causes infinite recursion and Stack Overflow crashes.',
              'Recursion uses stack space proportional to the maximum recursion depth (O(D) auxiliary space).',
              'Any recursive algorithm can also be written iteratively using an explicit Stack data structure.'
            ],
            practiceProblems: [
              {
                title: 'Fibonacci Number',
                difficulty: 'Easy',
                description: 'Calculate the N-th Fibonacci number using recursion, then identify why naive recursion is O(2^N).'
              },
              {
                title: 'Power of Two',
                difficulty: 'Easy',
                description: 'Given an integer n, return true if it is a power of two using a recursive function.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'problem-solving',
    levelNumber: '03',
    title: 'Problem Solving & Logic',
    iconName: 'Brain',
    shortDescription: 'Learn how to think logically and convert requirements into algorithms.',
    longDescription: 'Master the systematic engineering methodology for decomposing complex problem statements into pseudocode, flowcharts, pattern recognition, and optimized algorithmic solutions.',
    badge: 'Algorithmic Thinking',
    categories: [
      {
        id: 'problem-solving-techniques',
        title: 'Problem Solving Techniques',
        tagline: 'Systematic approaches to crack coding interviews and complex bugs.',
        description: 'Develop structured logic to tackle unfamiliar technical problems with confidence.',
        topics: [
          {
            id: 'understanding-problems',
            title: 'Understanding Problems & Edge Cases',
            summary: 'Clarifying inputs, outputs, constraints, and boundary conditions.',
            whatYouWillLearn: 'Learn how to dissect problem prompts, identify implicit assumptions, and verify corner cases.',
            concept: 'Before writing any code, expert engineers thoroughly clarify input types, maximum bounds, empty sets, negative numbers, and duplicates.',
            whyItMatters: 'Rushing to code without understanding constraints leads to wrong algorithms and failed test suites.',
            example: {
              language: 'plaintext',
              code: `5-Step Problem Solving Framework:
1. Clarify Inputs & Outputs: (Types? Nullable? Sorted? Can negative values exist?)
2. Check Constraints: (N <= 10^5 means O(N) or O(N log N); O(N^2) will Time Out!)
3. Walkthrough Small Examples by Hand: (Trace normal case, empty array, single element)
4. State Brute Force Solution: (Establish working baseline before optimizing)
5. Optimize & Code: (Select optimal data structures, then write clean code)`,
              explanation: 'Walking through concrete input examples manually reveals the hidden patterns needed to design an optimal algorithm.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Always check constraint limits: N <= 10^5 requires an O(N) or O(N log N) solution.',
              'Edge cases to always consider: empty array, single item, all identical items, negatives, integer overflow.',
              'Communicate your mental thought process clearly before writing code.'
            ],
            practiceProblems: [
              {
                title: 'Two Sum Constraints Analysis',
                difficulty: 'Easy',
                description: 'Given an array of integers, analyze how unsorted vs sorted arrays change the optimal time complexity.'
              }
            ]
          },
          {
            id: 'pattern-recognition',
            title: 'Pattern Recognition & Brute Force',
            summary: 'Recognizing standard problem archetypes and starting with working brute force.',
            whatYouWillLearn: 'Map problems to proven patterns (Two Pointers, Hash Map lookup, Sliding Window, Monotonic Stack).',
            concept: 'Most algorithm problems fall into a dozen recurring patterns. Recognizing the underlying archetype immediately narrows down the optimal data structure.',
            whyItMatters: 'Coding interviews assess your ability to recognize patterns rather than invent novel math on the spot.',
            example: {
              language: 'plaintext',
              code: `Archetype Mapping:
• "Find pair summing to target in sorted array" ──► Two Pointers (Left/Right)
• "Find longest substring without repeating chars" ──► Sliding Window + Hash Set
• "Find next greater element in array" ──► Monotonic Stack
• "Find shortest path in unweighted grid" ──► Breadth-First Search (BFS)
• "Find maximum/minimum with overlapping choices" ──► Dynamic Programming`,
              explanation: 'Memorizing these archetypes lets you immediately select the correct algorithmic blueprint.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Always formulate the simple Brute Force solution first to prove correctness.',
              'Identify the bottleneck in your brute force (e.g. repeated O(N) linear scans) to apply the right optimization.',
              'Trading auxiliary space (O(N) Hash Table) often reduces time from O(N^2) to O(N).'
            ],
            practiceProblems: [
              {
                title: 'Valid Anagram',
                difficulty: 'Easy',
                description: 'Determine if two strings are anagrams using frequency counting pattern (O(N) time).'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dsa',
    levelNumber: '04',
    title: 'Data Structures & Algorithms',
    iconName: 'Layers',
    shortDescription: 'Learn how to organize data and design efficient solutions.',
    longDescription: 'The core pillar of computer science: arrays, strings, hash maps, linked lists, stacks, queues, trees, heaps, graphs, and dynamic programming.',
    badge: 'Core Pillar',
    categories: [
      {
        id: 'arrays',
        title: 'Arrays',
        tagline: 'Master the fundamentals of contiguous memory data structures.',
        description: 'Contiguous memory collections supporting O(1) random indexing, pointer techniques, prefix sums, and subarray window optimizations.',
        topics: [
          {
            id: 'traversal',
            title: 'Traversal',
            summary: 'Learn how to visit every element efficiently.',
            whatYouWillLearn: 'Understand direct linear memory traversal, cache prefetching, and multi-dimensional index mapping.',
            concept: 'Array traversal involves visiting each element stored in sequential contiguous memory locations exactly once.',
            whyItMatters: 'Traversal is the foundation for filtering, searching, transformations, and mathematical aggregations.',
            example: {
              language: 'python',
              code: `def find_maximum(nums):
    if not nums:
        return None
    max_val = nums[0]
    for num in nums:  # O(N) linear traversal
        if num > max_val:
            max_val = num
    return max_val

print(find_maximum([3, 7, 2, 9, 5])) # Output: 9`,
              explanation: 'Linear traversal visits each of the N elements in sequence, yielding an optimal O(N) time complexity.'
            },
            visualizerType: 'array-traversal',
            keyTakeaways: [
              'Array traversal operates in O(N) time and O(1) auxiliary space.',
              'Because array elements are stored in contiguous memory addresses, CPU caches preload adjacent items.',
              'Multi-dimensional arrays arr[r][c] in row-major order map to offset r * COLS + c.'
            ],
            practiceProblems: [
              {
                title: 'Find Maximum and Minimum in Array',
                difficulty: 'Easy',
                description: 'Find the minimum and maximum element in an array with minimum number of comparisons.'
              }
            ]
          },
          {
            id: 'searching',
            title: 'Searching',
            summary: 'Learn how to find elements in arrays.',
            whatYouWillLearn: 'Compare O(N) linear scan on unsorted arrays against O(log N) binary search on sorted collections.',
            concept: 'Searching locates the index of a target element or confirms its absence within the array.',
            whyItMatters: 'Efficient searching is essential when handling massive databases with millions of records.',
            example: {
              language: 'python',
              code: `def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

print(binary_search([2, 5, 8, 12, 16, 23, 38], 16)) # Output: 4`,
              explanation: 'Binary search halves the search space with every comparison, achieving lightning-fast O(log N) runtime.'
            },
            visualizerType: 'binary-search',
            keyTakeaways: [
              'Linear search works on any array in O(N) time.',
              'Binary search requires sorted data and runs in O(log N) time.',
              'Use mid = left + (right - left) // 2 to prevent potential integer overflow.'
            ],
            practiceProblems: [
              {
                title: 'Binary Search',
                difficulty: 'Easy',
                description: 'Given a sorted array of distinct integers and a target value, return the index if found, else -1.'
              }
            ]
          },
          {
            id: 'insertion',
            title: 'Insertion',
            summary: 'Understand how elements are added to arrays.',
            whatYouWillLearn: 'Understand end insertion O(1) amortized vs arbitrary position insertion O(N) due to element shifting.',
            concept: 'Inserting into the middle or beginning of a fixed array requires shifting all subsequent elements right by one position to make room.',
            whyItMatters: 'Understanding insertion costs clarifies why dynamic arrays occasionally double capacity and when linked lists might be preferred.',
            example: {
              language: 'python',
              code: `# Inserting element at index 2 requires shifting elements 2..N right
arr = [10, 20, 30, 40]
# To insert 25 at index 2:
# Step 1: Shift 40 to index 4, 30 to index 3
# Step 2: Write 25 into index 2
arr.insert(2, 25)
print(arr) # [10, 20, 25, 30, 40] - O(N) operation!`,
              explanation: 'Because array memory is contiguous, making room in the middle requires shifting downstream elements.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Appending to the end of a dynamic array is O(1) amortized.',
              'Inserting at index 0 or in the middle is O(N) because elements must shift.',
              'When capacity is exceeded, dynamic arrays allocate a new block (usually 2x size) and copy existing items.'
            ],
            practiceProblems: [
              {
                title: 'Insert into Sorted Array',
                difficulty: 'Easy',
                description: 'Insert an element into its correct sorted position in an array while maintaining order.'
              }
            ]
          },
          {
            id: 'deletion',
            title: 'Deletion',
            summary: 'Understand how elements are removed from arrays.',
            whatYouWillLearn: 'Understand pop from end O(1) vs arbitrary deletion O(N) with left shifting.',
            concept: 'Deleting an element from an array requires shifting all following elements to the left to preserve continuous storage.',
            whyItMatters: 'Frequent deletions from large array lists cause performance degradation due to memory copying.',
            example: {
              language: 'python',
              code: `def remove_element(nums, val):
    # Two-pointer in-place removal O(N) time, O(1) space
    write_idx = 0
    for read_idx in range(len(nums)):
        if nums[read_idx] != val:
            nums[write_idx] = nums[read_idx]
            write_idx += 1
    return write_idx # New length`,
              explanation: 'Instead of repeatedly shifting on every delete, an in-place two-pointer technique compacts elements in a single pass.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Deleting the last element is O(1).',
              'Deleting from the front or middle is O(N) due to left-shifting.',
              'In-place removal problems are best solved with a fast/slow two-pointer overwrite pattern.'
            ],
            practiceProblems: [
              {
                title: 'Remove Duplicates from Sorted Array',
                difficulty: 'Easy',
                description: 'Remove duplicates in-place from sorted array such that each unique element appears once.'
              }
            ]
          },
          {
            id: 'prefix-sum',
            title: 'Prefix Sum',
            summary: 'Learn how to answer range-sum problems efficiently.',
            whatYouWillLearn: 'Precompute cumulative sums to answer any subarray sum query [L, R] in instantaneous O(1) time.',
            concept: 'A prefix sum array stores the cumulative sum of elements from index 0 up to i. The range sum from L to R is simply Prefix[R] - Prefix[L-1].',
            whyItMatters: 'Turns repeated O(N) range sum queries into ultra-fast O(1) lookups, transforming O(Q * N) into O(Q + N).',
            example: {
              language: 'python',
              code: `class NumArray:
    def __init__(self, nums):
        self.prefix = [0] * (len(nums) + 1)
        for i in range(len(nums)):
            self.prefix[i + 1] = self.prefix[i] + nums[i]

    def sumRange(self, left: int, right: int) -> int:
        # Range sum in O(1) time!
        return self.prefix[right + 1] - self.prefix[left]

# Usage
obj = NumArray([-2, 0, 3, -5, 2, -1])
print(obj.sumRange(0, 2)) # 1 (-2 + 0 + 3)`,
              explanation: 'By spending O(N) preprocessing time upfront, every subsequent range query is answered in constant O(1) time.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Prefix Sum array allows O(1) subarray sum queries.',
              'Subarray sum between indices i and j is P[j] - P[i-1] (with 1-based indexing P[j+1] - P[i]).',
              'Combined with Hash Maps, prefix sums efficiently solve "Count subarrays with sum = K".'
            ],
            practiceProblems: [
              {
                title: 'Range Sum Query - Immutable',
                difficulty: 'Easy',
                description: 'Calculate the sum of the elements of an array between indices left and right inclusive.'
              },
              {
                title: 'Subarray Sum Equals K',
                difficulty: 'Medium',
                description: 'Find the total number of continuous subarrays whose sum equals k using Prefix Sum + Hash Map.'
              }
            ]
          },
          {
            id: 'two-pointers',
            title: 'Two Pointers',
            summary: 'Learn the two-pointer technique for linear optimization.',
            whatYouWillLearn: 'Master opposite-end pointers (left/right) and same-direction fast/slow pointers to eliminate quadratic loops.',
            concept: 'The Two Pointers technique maintains two index pointers that traverse an array toward each other or in parallel to find optimal pairs or partitions in a single O(N) pass.',
            whyItMatters: 'Replaces expensive O(N^2) nested brute-force loops with clean O(N) linear scans in sorted arrays.',
            example: {
              language: 'python',
              code: `def two_sum_sorted(numbers, target):
    left = 0
    right = len(numbers) - 1
    
    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return [left + 1, right + 1] # 1-based indices
        elif current_sum < target:
            left += 1  # Need a larger sum
        else:
            right -= 1 # Need a smaller sum
    return []

print(two_sum_sorted([2, 7, 11, 15], 9)) # Output: [1, 2]`,
              explanation: 'Because the array is sorted, if the sum is too small, we increment the left pointer; if too large, we decrement the right pointer.'
            },
            visualizerType: 'two-pointers',
            keyTakeaways: [
              'Opposite-direction pointers operate on sorted arrays to locate pairs or palindromes in O(N) time.',
              'Same-direction fast/slow pointers detect cycles or compact elements in-place.',
              'Provides optimal O(1) auxiliary memory usage.'
            ],
            practiceProblems: [
              {
                title: 'Two Sum II - Input Array Is Sorted',
                difficulty: 'Medium',
                description: 'Find two numbers such that they add up to a specific target number in a 1-indexed sorted array.'
              },
              {
                title: 'Container With Most Water',
                difficulty: 'Medium',
                description: 'Find two lines that together with the x-axis form a container containing the most water.'
              },
              {
                title: 'Valid Palindrome',
                difficulty: 'Easy',
                description: 'Check if a string is a palindrome using two inward-moving pointers.'
              }
            ]
          },
          {
            id: 'sliding-window',
            title: 'Sliding Window',
            summary: 'Learn how to solve subarray and substring problems efficiently.',
            whatYouWillLearn: 'Master fixed-size and dynamically expanding/shrinking variable-size windows to compute subarray metrics.',
            concept: 'The Sliding Window technique tracks a contiguous subsegment [L, R] of an array. As the right pointer expands the window, the left pointer shrinks it when constraints are violated.',
            whyItMatters: 'Reduces finding optimal subarrays/substrings from O(N^2) or O(N^3) down to linear O(N) time.',
            example: {
              language: 'python',
              code: `def max_sub_array_of_size_k(k, arr):
    max_sum = 0
    window_sum = 0
    window_start = 0

    for window_end in range(len(arr)):
        window_sum += arr[window_end] # Add the next element
        # Slide window once we reach size k
        if window_end >= k - 1:
            max_sum = max(max_sum, window_sum)
            window_sum -= arr[window_start] # Subtract element going out
            window_start += 1 # Slide ahead
            
    return max_sum

print(max_sub_array_of_size_k(3, [2, 1, 5, 1, 3, 2])) # Output: 9 (subarray [5, 1, 3])`,
              explanation: 'Instead of recalculating the sum of k elements from scratch on every step, we add the incoming item and subtract the outgoing item in O(1).'
            },
            visualizerType: 'sliding-window',
            keyTakeaways: [
              'Fixed window: keep window width constant while updating metrics incrementally.',
              'Variable window: expand right until invalid, then contract left until valid again.',
              'Each element enters and exits the window at most once, guaranteeing total O(N) time.'
            ],
            practiceProblems: [
              {
                title: 'Maximum Average Subarray I',
                difficulty: 'Easy',
                description: 'Find a contiguous subarray whose length is equal to k that has the maximum average value.'
              },
              {
                title: 'Longest Substring Without Repeating Characters',
                difficulty: 'Medium',
                description: 'Find the length of the longest substring without duplicate characters using a dynamic sliding window.'
              }
            ]
          },
          {
            id: 'kadanes-algorithm',
            title: 'Kadane\'s Algorithm',
            summary: 'Learn how to find the maximum subarray sum.',
            whatYouWillLearn: 'Master the dynamic programming principle: at each index, decide whether to extend the existing subarray or start fresh.',
            concept: 'Kadane\'s Algorithm finds the contiguous subarray with the largest sum in O(N) time and O(1) space by maintaining the maximum sum ending at the current position.',
            whyItMatters: 'Turns a naive O(N^3) or O(N^2) brute-force subarray search into a blisteringly fast single-pass O(N) solution.',
            example: {
              language: 'python',
              code: `def max_sub_array(nums):
    current_sum = nums[0]
    max_sum = nums[0]
    
    for x in nums[1:]:
        # Decide: extend previous subarray OR start fresh at x
        current_sum = max(x, current_sum + x)
        max_sum = max(max_sum, current_sum)
        
    return max_sum

print(max_sub_array([-2, 1, -3, 4, -1, 2, 1, -5, 4])) # Output: 6 ([4, -1, 2, 1])`,
              explanation: 'If the accumulated sum drops below the current number itself, starting fresh at the current number yields a better sum.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Recurrence: current_max = max(x, current_max + x).',
              'Operates in strict O(N) time and O(1) space.',
              'Can be adapted to handle circular arrays and maximum product subarrays.'
            ],
            practiceProblems: [
              {
                title: 'Maximum Subarray',
                difficulty: 'Medium',
                description: 'Find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.'
              },
              {
                title: 'Maximum Product Subarray',
                difficulty: 'Medium',
                description: 'Find the contiguous subarray within an array which has the largest product.'
              }
            ]
          }
        ]
      },
      {
        id: 'strings',
        title: 'Strings',
        tagline: 'Sequence of characters, ASCII/Unicode encoding, and manipulation.',
        description: 'String searching, character frequencies, palindromes, anagrams, and two-pointer substring parsing.',
        topics: [
          {
            id: 'character-frequency',
            title: 'Character Frequency & Hashing',
            summary: 'Counting character occurrences using frequency arrays.',
            whatYouWillLearn: 'Use fixed 26-size integer arrays for lowercase English characters to achieve O(N) time and O(1) space.',
            concept: 'Because the alphabet size is bounded (e.g. 26 lowercase English letters or 256 ASCII characters), a fixed array acts as an ultra-fast hash table.',
            whyItMatters: 'Essential for anagram detection, character permutations, and string compressions.',
            example: {
              language: 'python',
              code: `def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    counts = [0] * 26
    for char_s, char_t in zip(s, t):
        counts[ord(char_s) - ord('a')] += 1
        counts[ord(char_t) - ord('a')] -= 1
    return all(c == 0 for c in counts)

print(is_anagram("anagram", "nagaram")) # True`,
              explanation: 'Increments character counts for string s and decrements for string t; all zeros indicates an exact anagram.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Fixed arrays (int count[26]) avoid hash map memory allocation overhead.',
              'ord(char) - ord(\'a\') maps letters \'a\'-\'z\' to array indices 0..25.',
              'Strings are immutable in Python, Java, and JS; string concatenation in loops creates O(N^2) copies unless using arrays/StringBuilder.'
            ],
            practiceProblems: [
              {
                title: 'Valid Anagram',
                difficulty: 'Easy',
                description: 'Given two strings s and t, return true if t is an anagram of s.'
              }
            ]
          },
          {
            id: 'palindromes-and-anagrams',
            title: 'Palindromes & Anagrams',
            summary: 'Reversible strings and character rearrangement algorithms.',
            whatYouWillLearn: 'Check palindromes using two inward-moving pointers and generate palindrome substrings efficiently.',
            concept: 'A palindrome reads the same forwards and backwards. Two pointers moving inward from both ends verify palindromes in O(N) time and O(1) space.',
            whyItMatters: 'Frequent interview challenge and building block for dynamic programming problems (Longest Palindromic Substring).',
            example: {
              language: 'python',
              code: `def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True`,
              explanation: 'Skips non-alphanumeric characters and compares mirrored letters until pointers meet.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Two pointers moving inward check palindromes in O(N) time with O(1) memory.',
              'Expand Around Center technique finds all palindrome substrings in O(N^2) without DP matrix overhead.',
              'Manacher\'s Algorithm can find the longest palindrome substring in linear O(N) time.'
            ],
            practiceProblems: [
              {
                title: 'Longest Palindromic Substring',
                difficulty: 'Medium',
                description: 'Given a string s, return the longest palindromic substring in s.'
              }
            ]
          }
        ]
      },
      {
        id: 'hashing',
        title: 'Hashing & Hash Tables',
        tagline: 'Instant O(1) key-value lookups and set memberships.',
        description: 'Hash functions, collision resolution (chaining vs open addressing), hash maps, hash sets, and frequency counters.',
        topics: [
          {
            id: 'hash-tables-and-maps',
            title: 'Hash Tables & Hash Maps',
            summary: 'O(1) average time complexity for insertions, deletions, and lookups.',
            whatYouWillLearn: 'Understand hash functions, modulo bucket distribution, load factors, and rehashing.',
            concept: 'A Hash Table maps keys to bucket array indices using a hash function, providing O(1) average time complexity for insertions, lookups, and deletions.',
            whyItMatters: 'Hash Maps are the most versatile data structure in software engineering, powering database indexes, caching, and interview algorithms.',
            example: {
              language: 'python',
              code: `def two_sum_hash(nums, target):
    seen = {} # Map value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen: # O(1) average lookup
            return [seen[complement], i]
        seen[num] = i
    return []

print(two_sum_hash([2, 7, 11, 15], 9)) # [0, 1] in O(N) time!`,
              explanation: 'Trading O(N) auxiliary space to store seen values allows us to check complements in O(1) time.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Average case lookup/insert is O(1); worst case under severe hash collisions is O(N).',
              'Collisions are resolved via Separate Chaining (linked lists/red-black trees) or Open Addressing (linear probing).',
              'Keys in hash maps must be hashable and immutable (e.g. strings, numbers, tuples).'
            ],
            practiceProblems: [
              {
                title: 'Two Sum',
                difficulty: 'Easy',
                description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.'
              },
              {
                title: 'Group Anagrams',
                difficulty: 'Medium',
                description: 'Group an array of strings into anagrams using sorted string keys or character count tuples in a hash map.'
              }
            ]
          }
        ]
      },
      {
        id: 'linked-lists',
        title: 'Linked Lists',
        tagline: 'Non-contiguous pointer-connected node chains.',
        description: 'Singly linked lists, doubly linked lists, node insertions, deletions, in-place reversals, and fast/slow pointer cycle detection.',
        topics: [
          {
            id: 'singly-linked-lists',
            title: 'Singly & Doubly Linked Lists',
            summary: 'Pointer based dynamic node chains.',
            whatYouWillLearn: 'Master node pointers (next, prev), sentinel dummy nodes, and pointer manipulation without losing head references.',
            concept: 'A linked list is a sequence of nodes where each node contains data and a reference (pointer) to the next node in memory.',
            whyItMatters: 'Linked lists allow O(1) insertions and removals at the head/tail and form the basis of LRU caches and queue implementations.',
            example: {
              language: 'python',
              code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next  # Save next
        curr.next = prev # Reverse pointer
        prev = curr      # Move prev ahead
        curr = nxt       # Move curr ahead
    return prev # New head!`,
              explanation: 'By reversing pointers iteratively in a single pass, we achieve O(N) time with O(1) auxiliary space.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Accessing the k-th element requires O(N) sequential traversal.',
              'Inserting or deleting a known node requires O(1) pointer adjustments.',
              'Dummy head nodes (dummy = ListNode(0)) drastically simplify edge cases like deleting the head.'
            ],
            practiceProblems: [
              {
                title: 'Reverse Linked List',
                difficulty: 'Easy',
                description: 'Reverse a singly linked list iteratively and recursively.'
              },
              {
                title: 'Linked List Cycle (Floyd\'s Tortoise and Hare)',
                difficulty: 'Easy',
                description: 'Determine if a linked list has a cycle using fast and slow pointers.'
              }
            ]
          }
        ]
      },
      {
        id: 'stack',
        title: 'Stack',
        tagline: 'Last-In First-Out (LIFO) order of execution.',
        description: 'LIFO semantics, push/pop/peek operations, balanced parentheses validation, and monotonic stacks.',
        topics: [
          {
            id: 'lifo-concept-and-applications',
            title: 'Stack & Monotonic Stack',
            summary: 'LIFO data structure and monotonic optimization.',
            whatYouWillLearn: 'Understand call stack frames, parenthetical nesting, expression evaluation, and O(N) next greater element problems.',
            concept: 'A Stack follows the Last-In First-Out (LIFO) protocol. Elements can only be added (push) or removed (pop) from the top.',
            whyItMatters: 'Powers undo/redo mechanisms, browser history, recursive execution, and compiler syntax parsing.',
            example: {
              language: 'python',
              code: `def is_valid_parentheses(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return len(stack) == 0

print(is_valid_parentheses("()[]{}")) # True`,
              explanation: 'Closing brackets must match the most recently opened bracket on the top of the stack.'
            },
            visualizerType: 'stack',
            keyTakeaways: [
              'push, pop, and peek are all strict O(1) operations.',
              'Matching nested syntax structures is naturally solved with a stack.',
              'A Monotonic Stack maintains elements in sorted order to find the Next Greater/Smaller Element in O(N) time.'
            ],
            practiceProblems: [
              {
                title: 'Valid Parentheses',
                difficulty: 'Easy',
                description: 'Given a string containing just brackets, determine if the input string is valid.'
              },
              {
                title: 'Daily Temperatures (Monotonic Stack)',
                difficulty: 'Medium',
                description: 'Find how many days you have to wait until a warmer temperature using a monotonic decreasing stack.'
              }
            ]
          }
        ]
      },
      {
        id: 'queue',
        title: 'Queue',
        tagline: 'First-In First-Out (FIFO) sequential processing.',
        description: 'FIFO buffers, enqueue/dequeue, circular queues, double-ended queues (deque), and priority queues.',
        topics: [
          {
            id: 'fifo-and-bfs-queues',
            title: 'Queue & Double-Ended Queue (Deque)',
            summary: 'First-In First-Out processing and BFS traversal.',
            whatYouWillLearn: 'Master FIFO queuing, circular array buffers, and level-order tree / graph traversal using queues.',
            concept: 'A Queue adheres to First-In First-Out (FIFO) ordering. Items are inserted at the back (enqueue) and removed from the front (dequeue).',
            whyItMatters: 'Critical for breadth-first search (BFS), task scheduling, web server request buffers, and printer spooling.',
            example: {
              language: 'python',
              code: `from collections import deque

queue = deque()
queue.append("Customer 1") # Enqueue at rear
queue.append("Customer 2")
queue.append("Customer 3")

print(queue.popleft()) # Dequeue from front: "Customer 1" - O(1)
print(queue.popleft()) # "Customer 2"`,
              explanation: 'Using collections.deque provides true O(1) popping from the front, unlike standard Python lists which require O(N) shifts.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Standard array lists have O(N) pop(0) overhead; always use a double-ended queue (deque) or linked list for O(1) dequeue.',
              'Breadth-First Search (BFS) level-order traversal depends directly on queues.',
              'Circular queues reuse freed space at the front of fixed buffers.'
            ],
            practiceProblems: [
              {
                title: 'Implement Queue using Stacks',
                difficulty: 'Easy',
                description: 'Implement a FIFO queue using two LIFO stacks with amortized O(1) operations.'
              }
            ]
          }
        ]
      },
      {
        id: 'recursion',
        title: 'Recursion & Backtracking',
        tagline: 'Divide-and-conquer and combinatorial state exploration.',
        description: 'Recursive call stacks, permutations, combinations, subset generation, and pruning in backtracking trees.',
        topics: [
          {
            id: 'backtracking-and-permutations',
            title: 'Backtracking & Subset Generation',
            summary: 'Systematic exploration of decision trees with state pruning.',
            whatYouWillLearn: 'Master the Choose-Explore-Unchoose template for generating subsets, permutations, and solving N-Queens.',
            concept: 'Backtracking builds candidates incrementally and abandons a candidate ("backtracks") as soon as it is determined that it cannot lead to a valid solution.',
            whyItMatters: 'Solves complex combinatorial searches, puzzle solvers (Sudoku, N-Queens), and routing problems.',
            example: {
              language: 'python',
              code: `def subsets(nums):
    result = []
    def backtrack(start, path):
        result.append(path[:]) # Add copy of current subset
        for i in range(start, len(nums)):
            path.append(nums[i])      # 1. Choose
            backtrack(i + 1, path)    # 2. Explore
            path.pop()                # 3. Unchoose (Backtrack!)
    backtrack(0, [])
    return result

print(subsets([1, 2])) # [[], [1], [1, 2], [2]]`,
              explanation: 'After exploring all subsets that include nums[i], we pop() to restore state and explore branches without it.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'The Backtracking template: (1) Check base/goal, (2) Loop choices, (3) Apply choice, (4) Recurse, (5) Undo choice.',
              'Pruning invalid branches early avoids exploring massive exponential state spaces.',
              'State restoration (path.pop()) reuses a single list across all recursion frames.'
            ],
            practiceProblems: [
              {
                title: 'Subsets',
                difficulty: 'Medium',
                description: 'Given an integer array nums of unique elements, return all possible subsets (the power set).'
              },
              {
                title: 'Permutations',
                difficulty: 'Medium',
                description: 'Given an array nums of distinct integers, return all the possible permutations.'
              }
            ]
          }
        ]
      },
      {
        id: 'searching',
        title: 'Searching Algorithms',
        tagline: 'Linear search, binary search, and search on answer spaces.',
        description: 'Binary search variations, search in rotated arrays, finding first/last occurrences, and monotonic predicate searches.',
        topics: [
          {
            id: 'binary-search-variations',
            title: 'Binary Search & Search on Answer',
            summary: 'Logarithmic division of sorted arrays and monotonic solution spaces.',
            whatYouWillLearn: 'Learn boundary conditions, search in rotated sorted arrays, and minimizing maximum values with binary search on answer.',
            concept: 'Binary Search repeatedly divides a sorted search space in half. Beyond arrays, it applies to any monotonic function f(x) where outputs transition from False to True.',
            whyItMatters: 'Solves hard optimization problems (e.g. "Koko Eating Bananas", "Capacity to Ship Packages") in O(N log M) time.',
            example: {
              language: 'python',
              code: `def find_first_occurrence(nums, target):
    left, right = 0, len(nums) - 1
    result = -1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            result = mid
            right = mid - 1 # Keep searching left!
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return result`,
              explanation: 'When target is found, continuing the search on the left side locates the first occurrence.'
            },
            visualizerType: 'binary-search',
            keyTakeaways: [
              'Binary search condition: the search domain must be monotonic (sorted or binary predicate True/False).',
              'Always update pointers with mid + 1 or mid - 1 to prevent infinite loops.',
              'Binary Search on Answer turns optimization questions ("Find minimum capacity") into verification tests ("Can we ship with capacity X?").'
            ],
            practiceProblems: [
              {
                title: 'Find First and Last Position of Element in Sorted Array',
                difficulty: 'Medium',
                description: 'Find starting and ending position of a target value in an array of integers sorted in non-decreasing order.'
              },
              {
                title: 'Search in Rotated Sorted Array',
                difficulty: 'Medium',
                description: 'Search for target in sorted array rotated at an unknown pivot in O(log N) time.'
              }
            ]
          }
        ]
      },
      {
        id: 'sorting',
        title: 'Sorting Algorithms',
        tagline: 'Reordering elements efficiently: comparisons and non-comparison sorts.',
        description: 'Bubble sort, selection sort, insertion sort, merge sort, quicksort, heapsort, and counting sort complexities.',
        topics: [
          {
            id: 'efficient-sorting-algorithms',
            title: 'Merge Sort & Quick Sort',
            summary: 'O(N log N) divide-and-conquer sorting engines.',
            whatYouWillLearn: 'Master stable Merge Sort divide-and-conquer and in-place Quick Sort partitioning.',
            concept: 'Merge Sort divides the array into halves, recursively sorts them, and merges them in O(N) time. Quick Sort partitions around a pivot element in-place.',
            whyItMatters: 'Sorting is the precursor to efficient searching, deduplication, and computational geometry.',
            example: {
              language: 'python',
              code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i]); i += 1
        else:
            merged.append(right[j]); j += 1
    merged.extend(left[i:]); merged.extend(right[j:])
    return merged`,
              explanation: 'Guarantees O(N log N) worst-case time complexity and preserves stability for equal elements.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Comparison-based sorting has a mathematical lower bound of Omega(N log N).',
              'Merge Sort: O(N log N) time, O(N) space, stable.',
              'Quick Sort: O(N log N) average time, O(log N) space, in-place, unstable.'
            ],
            practiceProblems: [
              {
                title: 'Sort an Array (Merge Sort)',
                difficulty: 'Medium',
                description: 'Sort an array of integers in ascending order in O(N log N) time.'
              },
              {
                title: 'Kth Largest Element in an Array (QuickSelect)',
                difficulty: 'Medium',
                description: 'Find the kth largest element in an unsorted array in O(N) average time using QuickSelect.'
              }
            ]
          }
        ]
      },
      {
        id: 'trees',
        title: 'Trees & Binary Search Trees',
        tagline: 'Hierarchical node relationships and balanced traversals.',
        description: 'Binary trees, BST properties, tree traversals (Preorder, Inorder, Postorder, Level Order), and recursion on subtrees.',
        topics: [
          {
            id: 'tree-traversals-and-bst',
            title: 'Binary Trees & Traversals',
            summary: 'DFS (Pre/In/Post) and BFS Level-Order traversals on trees.',
            whatYouWillLearn: 'Understand tree height, lowest common ancestor, BST search/insertion, and recursive subtree validation.',
            concept: 'A Binary Tree is a hierarchical structure where each node has at most two children (left and right). A BST enforces: Left < Node < Right.',
            whyItMatters: 'Powers DOM trees, file directory structures, abstract syntax trees (ASTs), and balanced indexing structures (B-Trees in databases).',
            example: {
              language: 'python',
              code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root):
    if not root:
        return 0
    # Height = 1 + max(left height, right height)
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
              explanation: 'Recursive post-order traversal computes child heights before aggregating up to the root.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'In-order traversal of a Binary Search Tree produces elements in sorted ascending order.',
              'Level-order traversal uses a Queue to process nodes level by level.',
              'A balanced BST provides O(log N) search, insertion, and deletion.'
            ],
            practiceProblems: [
              {
                title: 'Maximum Depth of Binary Tree',
                difficulty: 'Easy',
                description: 'Find the maximum depth (number of nodes along the longest path from root to leaf).'
              },
              {
                title: 'Validate Binary Search Tree',
                difficulty: 'Medium',
                description: 'Determine if a given binary tree is a valid Binary Search Tree using (-inf, +inf) bounds.'
              },
              {
                title: 'Binary Tree Level Order Traversal',
                difficulty: 'Medium',
                description: 'Return the level order traversal of its nodes\' values using BFS and a queue.'
              }
            ]
          }
        ]
      },
      {
        id: 'heaps',
        title: 'Heaps & Priority Queues',
        tagline: 'Fast dynamic retrieval of extreme (minimum or maximum) elements.',
        description: 'Complete binary trees, array-backed min/max heaps, heapify in O(N), and Top-K streaming problems.',
        topics: [
          {
            id: 'min-heap-and-max-heap',
            title: 'Heaps & Priority Queue',
            summary: 'O(1) access to minimum/maximum with O(log N) updates.',
            whatYouWillLearn: 'Understand array indexing in binary heaps (children at 2i+1, 2i+2), push/pop bubbling, and finding Top-K elements.',
            concept: 'A Heap is a complete binary tree satisfying the heap property: in a Min-Heap, each parent is <= its children, ensuring the minimum element is always at the root (O(1)).',
            whyItMatters: 'Powers Dijkstra\'s shortest path algorithm, event-driven task schedulers, and streaming top-K ranking algorithms.',
            example: {
              language: 'python',
              code: `import heapq

# Find 3 smallest numbers in stream
nums = [7, 10, 4, 3, 20, 15]
heapq.heapify(nums) # O(N) linear build time

smallest1 = heapq.heappop(nums) # 3 (O(log N))
smallest2 = heapq.heappop(nums) # 4
print(smallest1, smallest2)`,
              explanation: 'Heapify builds the heap in O(N) time, and each extraction rebalances in O(log N) time.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Peek minimum/maximum in O(1) time; insert (heappush) and remove (heappop) in O(log N).',
              'Building a heap from an array takes O(N) time via bottom-up heapify.',
              'Keep a Min-Heap of size K to find the K-th Largest element in O(N log K) time.'
            ],
            practiceProblems: [
              {
                title: 'Kth Largest Element in a Stream',
                difficulty: 'Easy',
                description: 'Design a class to find the kth largest element in a stream using a Min-Heap.'
              },
              {
                title: 'Top K Frequent Elements',
                difficulty: 'Medium',
                description: 'Given an integer array nums and an integer k, return the k most frequent elements.'
              }
            ]
          }
        ]
      },
      {
        id: 'graphs',
        title: 'Graphs & Graph Algorithms',
        tagline: 'Networked nodes, connections, and pathfinding.',
        description: 'Vertices, edges, adjacency lists, BFS (shortest path), DFS (connected components), Dijkstra\'s, Topological Sort, and Disjoint Set Union (DSU).',
        topics: [
          {
            id: 'graph-traversals-and-shortest-path',
            title: 'Graph Traversals (BFS & DFS) & Dijkstra',
            summary: 'Traversing interconnected networks and finding shortest paths.',
            whatYouWillLearn: 'Master Adjacency Lists, cycle detection in directed graphs (Topological Sort), and Dijkstra\'s shortest path on weighted graphs.',
            concept: 'A Graph is a set of vertices (nodes) connected by edges. BFS finds the shortest path in unweighted graphs, while DFS explores connected components and cycles.',
            whyItMatters: 'Underlies Google Maps navigation, social network friend recommendations, dependency build systems, and network routing.',
            example: {
              language: 'python',
              code: `from collections import deque

def bfs_shortest_path(graph, start, target):
    queue = deque([(start, 0)]) # (node, distance)
    visited = {start}
    
    while queue:
        node, dist = queue.popleft()
        if node == target:
            return dist
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))
    return -1`,
              explanation: 'BFS explores layer by layer, guaranteeing that the first time the target node is reached, the path is shortest.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Adjacency List representation uses O(V + E) space and is preferred for sparse graphs.',
              'BFS explores level-by-level using a Queue; DFS explores branches deeply using Recursion/Stack.',
              'Always track a visited set to avoid infinite loops in cyclic graphs.'
            ],
            practiceProblems: [
              {
                title: 'Number of Islands',
                difficulty: 'Medium',
                description: 'Count the number of connected land masses in a 2D binary grid using DFS/BFS.'
              },
              {
                title: 'Course Schedule (Topological Sort / Cycle Detection)',
                difficulty: 'Medium',
                description: 'Determine if you can finish all courses given prerequisite dependencies (detect cycle in directed graph).'
              }
            ]
          }
        ]
      },
      {
        id: 'dynamic-programming',
        title: 'Dynamic Programming',
        tagline: 'Breaking complex problems into overlapping subproblems with memoization.',
        description: 'Overlapping subproblems, optimal substructure, Top-Down Memoization, Bottom-Up Tabulation, 1D/2D DP, Knapsack, and Grid DP.',
        topics: [
          {
            id: 'dp-concepts-and-patterns',
            title: 'DP Concept, Memoization & Tabulation',
            summary: 'Overlapping subproblems and caching optimal sub-solutions.',
            whatYouWillLearn: 'Identify overlapping subproblems, formulate state transitions DP[i], and transform exponential recursion into polynomial time.',
            concept: 'Dynamic Programming solves problems by combining solutions to overlapping subproblems. It caches results (memoization/tabulation) so no subproblem is computed twice.',
            whyItMatters: 'Solves complex optimization problems (shortest path, string alignment, resource allocation) in polynomial time.',
            example: {
              language: 'python',
              code: `def climb_stairs(n: int) -> int:
    if n <= 2:
        return n
    # Bottom-up Tabulation with O(1) space
    prev2, prev1 = 1, 2
    for _ in range(3, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    return prev1

print(climb_stairs(5)) # Output: 8`,
              explanation: 'The number of ways to reach step N is the sum of ways to reach step (N-1) and step (N-2).'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Two key characteristics: (1) Overlapping Subproblems and (2) Optimal Substructure.',
              'Top-Down: Recursion + Cache (Memoization). Bottom-Up: Iterative Array building (Tabulation).',
              'Space optimization: if DP[i] only depends on DP[i-1] and DP[i-2], store just 2 variables for O(1) space.'
            ],
            practiceProblems: [
              {
                title: 'Climbing Stairs',
                difficulty: 'Easy',
                description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.'
              },
              {
                title: 'Coin Change',
                difficulty: 'Medium',
                description: 'Find the fewest number of coins that you need to make up a given amount using Bottom-Up DP.'
              },
              {
                title: 'Longest Increasing Subsequence',
                difficulty: 'Medium',
                description: 'Find the length of the longest strictly increasing subsequence in an array in O(N^2) or O(N log N) time.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'algorithm-analysis',
    levelNumber: '05',
    title: 'Algorithm Analysis & Big-O',
    iconName: 'Activity',
    shortDescription: 'Learn how to measure and compare the efficiency of programs.',
    longDescription: 'Master asymptotic notation, time and space complexity analysis, Big-O classes (O(1), O(log N), O(N), O(N log N), O(N^2), O(2^N), O(N!)), and best/average/worst case bounds.',
    badge: 'Efficiency',
    categories: [
      {
        id: 'big-o-analysis',
        title: 'Algorithm Analysis & Big-O',
        tagline: 'Quantifying asymptotic computational resource consumption.',
        description: 'Understand how algorithms scale as input size N approaches infinity.',
        topics: [
          {
            id: 'time-and-space-complexity',
            title: 'Time & Space Complexity & Big-O Notation',
            summary: 'Measuring growth rates as input size N grows to infinity.',
            whatYouWillLearn: 'Master Big-O notation, constant dropping, dominant term rules, and auxiliary space calculations.',
            concept: 'Big-O notation describes the upper bound of an algorithm\'s growth rate in terms of operations or memory as the input size N increases.',
            whyItMatters: 'An O(N^2) algorithm with N = 1,000,000 takes 11 days, while an O(N log N) algorithm completes in 0.02 seconds.',
            example: {
              language: 'plaintext',
              code: `Common Big-O Complexities (from fastest to slowest):
• O(1)        : Constant Time     ──► Array index access, Hash map lookup
• O(log N)    : Logarithmic Time  ──► Binary Search, Balanced BST search
• O(N)        : Linear Time       ──► Single loop scan, Array traversal
• O(N log N)  : Linearithmic Time ──► Merge Sort, Quick Sort (average), Heapsort
• O(N^2)      : Quadratic Time    ──► Nested loops, Bubble Sort, Matrix comparisons
• O(2^N)      : Exponential Time  ──► Recursive subsets, Naive Fibonacci
• O(N!)       : Factorial Time    ──► Traveling Salesperson brute force, Permutations`,
              explanation: 'Big-O ignores constant coefficients (e.g. 3N becomes O(N)) and focuses on asymptotic scaling.'
            },
            visualizerType: 'big-o',
            keyTakeaways: [
              'Drop constants (O(2N + 5) -> O(N)) and non-dominant terms (O(N^2 + N) -> O(N^2)).',
              'Space complexity counts auxiliary memory allocated during execution (excluding inputs if requested).',
              'Recursive call stacks consume O(D) space where D is the maximum recursion call depth.'
            ],
            practiceProblems: [
              {
                title: 'Analyze Nested Loop Time Complexity',
                difficulty: 'Easy',
                description: 'Determine the exact Big-O runtime of loops with steps doubling (i *= 2) vs incrementing (i++).'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'oop',
    levelNumber: '06',
    title: 'Object-Oriented Programming',
    iconName: 'Boxes',
    shortDescription: 'Understand how real-world software is structured using objects and classes.',
    longDescription: 'Master the four pillars of OOP (Encapsulation, Abstraction, Inheritance, Polymorphism), class designs, constructors, methods, method overriding, and design principles (SOLID).',
    badge: 'Design Paradigm',
    categories: [
      {
        id: 'oop-fundamentals',
        title: 'OOP Principles',
        tagline: 'Modeling systems with encapsulated state and behaviors.',
        description: 'Learn how modern enterprise software structures maintainable codebases using classes and interfaces.',
        topics: [
          {
            id: 'classes-and-objects',
            title: 'Classes, Objects & Constructors',
            summary: 'Blueprints for state and behavior instantiation.',
            whatYouWillLearn: 'Understand classes as templates, memory allocation of object instances on the heap, and initialization via constructors.',
            concept: 'A Class is a blueprint that defines attributes (state) and methods (behavior). An Object is a concrete instance of that class created in memory.',
            whyItMatters: 'OOP allows developers to model real-world business domains (e.g. User, Account, Order, PaymentProcessor) cleanly.',
            example: {
              language: 'typescript',
              code: `class BankAccount {
    // Private encapsulated state
    private balance: number;
    public readonly accountNumber: string;

    constructor(accountNumber: string, initialBalance: number) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    public deposit(amount: number): void {
        if (amount <= 0) throw new Error("Deposit must be positive");
        this.balance += amount;
    }

    public getBalance(): number {
        return this.balance;
    }
}

const account = new BankAccount("ACC-9021", 500);
account.deposit(250);
console.log(account.getBalance()); // 750`,
              explanation: 'Encapsulating the balance variable prevents external code from setting negative balances or corrupting state.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Encapsulation bundles data and methods while restricting direct access to internal state.',
              'Constructors initialize state when a new object instance is allocated with new.',
              'The this / self keyword references the active object instance calling the method.'
            ],
            practiceProblems: [
              {
                title: 'Design a Parking Lot System',
                difficulty: 'Medium',
                description: 'Create object-oriented class hierarchies for Vehicles, ParkingSpots, and TicketGenerators.'
              }
            ]
          },
          {
            id: 'four-pillars-of-oop',
            title: 'The 4 Pillars: Inheritance & Polymorphism',
            summary: 'Encapsulation, Abstraction, Inheritance, and Polymorphism.',
            whatYouWillLearn: 'Master code reuse with inheritance and dynamic method dispatch with polymorphism and abstract interfaces.',
            concept: 'Inheritance allows a subclass to inherit attributes and methods from a parent class. Polymorphism allows subclasses to provide specific implementations of abstract parent methods.',
            whyItMatters: 'Enables extensible architectures where new plugins or payment processors can be added without modifying existing caller code.',
            example: {
              language: 'typescript',
              code: `// Polymorphic payment interface
interface PaymentMethod {
    pay(amount: number): boolean;
}

class CreditCardPayment implements PaymentMethod {
    pay(amount: number) {
        console.log(\`Charging \$\${amount} to Credit Card\`);
        return true;
    }
}

class UPIPayment implements PaymentMethod {
    pay(amount: number) {
        console.log(\`Transferring \$\${amount} via UPI\`);
        return true;
    }
}

function processCheckout(method: PaymentMethod, amount: number) {
    method.pay(amount); // Polymorphic call dispatched at runtime!
}`,
              explanation: 'processCheckout works with any PaymentMethod implementation without knowing specific class details.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Abstraction exposes essential interfaces while hiding internal complexity.',
              'Inheritance establishes "is-a" relationships (Dog is-a Animal).',
              'Polymorphism allows treating derived objects through a common base interface.'
            ],
            practiceProblems: [
              {
                title: 'Design a Notification Service',
                difficulty: 'Medium',
                description: 'Implement an abstract Notifier with Email, SMS, and PushNotification subclasses.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'databases-sql',
    levelNumber: '07',
    title: 'Databases & SQL',
    iconName: 'Database',
    shortDescription: 'Master relational data storage, queries, and database management principles.',
    longDescription: 'Learn relational database modeling, structured SQL querying (SELECT, JOIN, GROUP BY, subqueries), normalization, indexing, and ACID transaction guarantees.',
    badge: 'Data Systems',
    categories: [
      {
        id: 'sql',
        title: 'SQL (Structured Query Language)',
        tagline: 'Querying and manipulating structured relational datasets.',
        description: 'Master declarative SQL queries, filtering, aggregations, joins, and subqueries.',
        topics: [
          {
            id: 'sql-queries-and-joins',
            title: 'SELECT, WHERE, GROUP BY & JOINs',
            summary: 'Extracting and joining relational datasets.',
            whatYouWillLearn: 'Master SQL query execution order, INNER/LEFT/RIGHT JOINs, and aggregation with HAVING.',
            concept: 'SQL is a declarative language used to query, insert, update, and manage relational databases.',
            whyItMatters: 'Almost every backend application communicates with a relational database (PostgreSQL, MySQL, SQLite) to persist and query business records.',
            example: {
              language: 'sql',
              code: `-- Find total revenue per customer who spent over $500
SELECT 
    c.customer_name, 
    COUNT(o.order_id) AS total_orders,
    SUM(o.amount) AS total_spent
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
WHERE o.status = 'COMPLETED'
GROUP BY c.customer_name
HAVING SUM(o.amount) > 500
ORDER BY total_spent DESC;`,
              explanation: 'Joins customer and order records, filters by status, groups by customer, filters aggregated sums with HAVING, and sorts.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'SQL execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.',
              'INNER JOIN returns matching rows; LEFT JOIN returns all left rows plus matching right rows.',
              'WHERE filters individual rows before grouping; HAVING filters aggregated groups after GROUP BY.'
            ],
            practiceProblems: [
              {
                title: 'Second Highest Salary',
                difficulty: 'Medium',
                description: 'Write a SQL query to find the second highest salary from an Employee table.'
              },
              {
                title: 'Customers Who Never Order',
                difficulty: 'Easy',
                description: 'Find all customers who never ordered anything using a LEFT JOIN or NOT IN subquery.'
              }
            ]
          }
        ]
      },
      {
        id: 'dbms',
        title: 'DBMS & Database Architecture',
        tagline: 'Database design, schema normalization, ACID, and B-Tree indexing.',
        description: 'Learn internal database architecture, primary/foreign keys, schema normalization (1NF-3NF), transactions, and index optimizations.',
        topics: [
          {
            id: 'acid-and-indexing',
            title: 'ACID Properties & B-Tree Indexes',
            summary: 'Transaction reliability and high-speed B-Tree index lookups.',
            whatYouWillLearn: 'Understand Atomicity, Consistency, Isolation, Durability, and how B-Tree indexes transform full table scans into logarithmic searches.',
            concept: 'ACID transactions guarantee reliable database processing even during power failures or concurrent updates. Indexes store sorted pointer keys to avoid full table scans.',
            whyItMatters: 'Database bottlenecks are the #1 cause of slow web applications. Understanding indexing and transaction isolation prevents site outages and financial inconsistencies.',
            example: {
              language: 'sql',
              code: `-- ACID Transaction for money transfer
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- If any error occurs, ROLLBACK; otherwise:
COMMIT;

-- Create B-Tree index for instantaneous lookups
CREATE INDEX idx_users_email ON users(email);`,
              explanation: 'The transaction ensures money is never deducted from account 1 without crediting account 2 (Atomicity).'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent safety), Durability (persisted on disk).',
              'Indexes speed up SELECT queries from O(N) to O(log N), but add write overhead on INSERT/UPDATE.',
              'Database Normalization eliminates duplicate data and update anomalies.'
            ],
            practiceProblems: [
              {
                title: 'Design an E-Commerce Database Schema',
                difficulty: 'Medium',
                description: 'Design normalized tables (Users, Products, Orders, OrderItems) with appropriate primary and foreign keys.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'operating-systems',
    levelNumber: '08',
    title: 'Operating Systems',
    iconName: 'Terminal',
    shortDescription: 'Understand the core software layer that manages hardware and resources.',
    longDescription: 'Learn CPU scheduling algorithms, virtual memory and paging, synchronization primitives (mutexes, semaphores), deadlocks, and IPC.',
    badge: 'Systems Core',
    categories: [
      {
        id: 'os-core',
        title: 'Operating Systems Architecture',
        tagline: 'Memory virtualization, multitasking scheduling, and deadlocks.',
        description: 'Explore how the OS multiplexes hardware resources among hundreds of concurrent programs.',
        topics: [
          {
            id: 'cpu-scheduling-and-virtual-memory',
            title: 'CPU Scheduling & Virtual Memory',
            summary: 'Round-Robin scheduling, page tables, and virtual address translation.',
            whatYouWillLearn: 'Understand how the OS shares CPU cores across processes and maps isolated virtual memory addresses to physical RAM via Page Tables and the MMU.',
            concept: 'CPU scheduling decides which process runs on a CPU core when. Virtual memory provides each process with the illusion of a contiguous, private memory space.',
            whyItMatters: 'Explains performance throttling, memory thrashing, page faults, and multi-core thread scaling.',
            example: {
              language: 'plaintext',
              code: `Virtual Address Translation:
[ Process Virtual Address: 0x7FFF0040 ]
                 │
                 ▼
[ Hardware Memory Management Unit (MMU) & Page Table ]
                 │ (Checks permissions & translates virtual page to physical frame)
                 ▼
[ Physical RAM Address: 0x1A040 ]`,
              explanation: 'If a requested page is not currently in physical RAM, the OS triggers a Page Fault and loads the page from disk swap.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Scheduling algorithms: Round-Robin (fair time slices), Preemptive Priority, Multilevel Feedback Queues.',
              'Virtual Memory provides memory isolation: process A cannot read or corrupt process B\'s memory.',
              'Thrashing occurs when the OS spends more time swapping pages between RAM and disk than executing real work.'
            ],
            practiceProblems: [
              {
                title: 'Calculate Page Fault Penalties',
                difficulty: 'Medium',
                description: 'Compute effective memory access time given a 99% TLB hit rate and 10ms disk page fault latency.'
              }
            ]
          },
          {
            id: 'synchronization-and-deadlocks',
            title: 'Synchronization & Deadlocks',
            summary: 'Mutexes, semaphores, race conditions, and Coffman deadlock conditions.',
            whatYouWillLearn: 'Prevent race conditions using mutex locks and avoid deadlocks by breaking cyclical wait dependencies.',
            concept: 'When concurrent threads access shared data simultaneously, synchronization primitives (locks/mutexes) enforce mutual exclusion. A Deadlock occurs when processes are blocked forever waiting on resources held by each other.',
            whyItMatters: 'Concurrency bugs are notoriously difficult to reproduce and cause catastrophic system freezes.',
            example: {
              language: 'python',
              code: `import threading

balance = 100
lock = threading.Lock()

def safe_withdraw(amount):
    global balance
    with lock: # Acquires mutex lock before critical section
        if balance >= amount:
            balance -= amount
            print(f"Withdrawn {amount}, remaining: {balance}")`,
              explanation: 'The lock prevents two simultaneous withdraw calls from reading the same balance concurrently and causing a double-spend.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'A Race Condition occurs when output depends on the non-deterministic execution order of threads.',
              'Coffman Deadlock Conditions: (1) Mutual Exclusion, (2) Hold and Wait, (3) No Preemption, (4) Circular Wait.',
              'Always acquire multiple locks in a strict global alphabetical or numerical order to prevent circular waits.'
            ],
            practiceProblems: [
              {
                title: 'The Dining Philosophers Problem',
                difficulty: 'Medium',
                description: 'Explain how resource hierarchy prevents deadlock in the classic Dining Philosophers synchronization challenge.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'computer-networks',
    levelNumber: '09',
    title: 'Computer Networks',
    iconName: 'Globe',
    shortDescription: 'Learn how computers communicate across local networks and the global Internet.',
    longDescription: 'Explore the OSI and TCP/IP stack, IP routing, DNS resolution, TCP three-way handshake, UDP streaming, HTTP/HTTPS encryption, and web socket architectures.',
    badge: 'Networking',
    categories: [
      {
        id: 'networking-core',
        title: 'Networking Architecture',
        tagline: 'Protocols, packet routing, and client-server communication.',
        description: 'Understand how packets travel across the global Internet from browser to server.',
        topics: [
          {
            id: 'tcp-ip-and-dns',
            title: 'TCP vs UDP & DNS Resolution',
            summary: 'Reliable vs fast transport protocols and domain name resolution.',
            whatYouWillLearn: 'Learn the 3-way handshake (SYN, SYN-ACK, ACK), flow control, packet retransmissions in TCP, and how DNS converts domain names into IP addresses.',
            concept: 'TCP guarantees reliable, ordered byte delivery through acknowledgments and retransmissions. UDP is a lightweight, connectionless protocol prioritizing speed over reliability.',
            whyItMatters: 'Crucial for designing distributed backends, streaming video, web games, and configuring cloud DNS records.',
            example: {
              language: 'plaintext',
              code: `TCP 3-Way Handshake Connection Establishment:
Client ──────── SYN (Sequence = X) ─────────► Server
Client ◄──── SYN-ACK (Seq = Y, Ack = X+1) ─── Server
Client ──────── ACK (Ack = Y+1) ───────────► Server
[ Connection ESTABLISHED: Data transmission begins ]`,
              explanation: 'TCP guarantees both parties are synchronized and ready to exchange data before payloads are transmitted.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'TCP: reliable, ordered, error-checked, flow-controlled (used by HTTP, SSH, Email).',
              'UDP: fast, connectionless, no retransmission overhead (used by DNS, Video Streaming, Gaming, WebRTC).',
              'DNS resolves human URLs (google.com) to machine IP addresses (142.250.190.46) via recursive name servers.'
            ],
            practiceProblems: [
              {
                title: 'What Happens When You Type a URL in Browser?',
                difficulty: 'Medium',
                description: 'Trace all steps: DNS lookup, TCP handshake, TLS handshake, HTTP GET request, and DOM rendering.'
              }
            ]
          },
          {
            id: 'http-and-https',
            title: 'HTTP, HTTPS & TLS Encryption',
            summary: 'Stateless web protocols and public-key cryptography.',
            whatYouWillLearn: 'Understand HTTP request/response headers, status codes (200, 301, 400, 401, 404, 500), and TLS asymmetric key handshakes.',
            concept: 'HTTP (Hypertext Transfer Protocol) is the foundational application-layer protocol for the Web. HTTPS layers HTTP over TLS/SSL encryption to prevent eavesdropping and tampering.',
            whyItMatters: 'Every web API, mobile app backend, and microservice communicates using HTTP/HTTPS.',
            example: {
              language: 'plaintext',
              code: `HTTP/1.1 Request:
GET /api/v1/users/42 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOi...
Accept: application/json

HTTP/1.1 Response:
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 54

{ "id": 42, "name": "Elena", "role": "Software Engineer" }`,
              explanation: 'Stateless request-response protocol exchanging headers, authentication tokens, and structured JSON payloads.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'HTTP methods: GET (read), POST (create), PUT/PATCH (update), DELETE (remove).',
              'Status code ranges: 2xx (Success), 3xx (Redirect), 4xx (Client Error), 5xx (Server Error).',
              'HTTPS uses asymmetric public-key cryptography to negotiate a shared symmetric session key.'
            ],
            practiceProblems: [
              {
                title: 'Design RESTful HTTP Status Codes',
                difficulty: 'Easy',
                description: 'Assign correct HTTP status codes for creating a duplicate user, successful resource deletion, and expired JWT token.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'software-development',
    levelNumber: '10',
    title: 'Software Development & Architecture',
    iconName: 'FolderGit2',
    shortDescription: 'Understand end-to-end software engineering workflows and architectural building blocks.',
    longDescription: 'Explore the full engineering lifecycle: Frontend, Backend, Databases, REST APIs, JSON formatting, Authentication (JWT/OAuth), Testing (Unit/Integration), and CI/CD deployment pipelines.',
    badge: 'Engineering Lifecycle',
    categories: [
      {
        id: 'dev-architecture',
        title: 'Full-Stack Architecture',
        tagline: 'How modern web applications are engineered and deployed.',
        description: 'Connect frontend clients, backend application servers, databases, and microservices into a cohesive system.',
        topics: [
          {
            id: 'frontend-backend-apis',
            title: 'Frontend, Backend & RESTful APIs',
            summary: 'Client-server architecture, decoupled frontends, and API contracts.',
            whatYouWillLearn: 'Learn how single-page applications (React/Next.js) communicate asynchronously with backend servers (Node/Python/Go) via REST and JSON.',
            concept: 'Modern software separates the Presentation Layer (Frontend UI), Business Logic Layer (Backend API), and Persistence Layer (Database) to enable independent scaling and maintenance.',
            whyItMatters: 'Decoupled full-stack architecture is the industry standard for modern web and mobile applications.',
            example: {
              language: 'json',
              code: `// REST API JSON Resource Representation
{
  "status": "success",
  "data": {
    "userId": "usr_9912",
    "name": "Sarah Connor",
    "email": "sarah@example.com",
    "skills": ["Python", "Algorithms", "Next.js"],
    "createdAt": "2026-08-29T10:00:00Z"
  }
}`,
              explanation: 'JSON (JavaScript Object Notation) serves as the universal, lightweight data interchange format across all programming languages.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Separation of Concerns: Frontend handles rendering and UI state; Backend validates input and enforces business rules.',
              'REST APIs use standard HTTP verbs (GET, POST, PUT, DELETE) and noun-based endpoint paths (/api/users).',
              'JSON is human-readable, lightweight, and natively parseable across all major programming stacks.'
            ],
            practiceProblems: [
              {
                title: 'Design a RESTful API for a Task Manager',
                difficulty: 'Easy',
                description: 'Specify HTTP endpoints, request payloads, and status codes for creating, listing, updating, and deleting tasks.'
              }
            ]
          },
          {
            id: 'auth-and-testing',
            title: 'Authentication, Authorization & Testing',
            summary: 'JWT tokens, role-based access control, and automated testing suites.',
            whatYouWillLearn: 'Understand authentication (verifying identity) vs authorization (verifying permissions), JWT tokens, and unit/integration testing.',
            concept: 'Authentication verifies *who you are* (passwords, JWT, OAuth). Authorization determines *what you can do* (Admin vs Student). Automated tests ensure code quality and prevent regression bugs.',
            whyItMatters: 'Security vulnerabilities and untested code cause data breaches, financial loss, and catastrophic production downtime.',
            example: {
              language: 'python',
              code: `# Unit Test with Pytest
def test_calculate_discount():
    # Arrange
    price = 100
    discount_rate = 0.2
    # Act
    final_price = calculate_discount(price, discount_rate)
    # Assert
    assert final_price == 80.0`,
              explanation: 'Unit tests isolate and test individual functions in automated CI/CD pipelines before code is deployed.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Authentication = Identity verification; Authorization = Permissions & Role verification.',
              'JSON Web Tokens (JWT) are signed cryptographically to allow stateless authentication across distributed servers.',
              'Test Pyramid: High volume of fast Unit Tests, moderate Integration Tests, and focused End-to-End (E2E) tests.'
            ],
            practiceProblems: [
              {
                title: 'Compare Session Cookies vs JWT',
                difficulty: 'Medium',
                description: 'Explain when stateful session cookies are preferred over stateless JSON Web Tokens.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'git-github',
    levelNumber: '11',
    title: 'Git & GitHub Version Control',
    iconName: 'GitBranch',
    shortDescription: 'Master source control, collaboration, and modern software versioning workflows.',
    longDescription: 'Learn Git internals (commits, trees, blobs), branching strategies, merging vs rebasing, pull requests, resolving merge conflicts, and GitHub team workflows.',
    badge: 'Collaboration',
    categories: [
      {
        id: 'git-core',
        title: 'Git & Source Control',
        tagline: 'Tracking code history and collaborating across engineering teams.',
        description: 'Master distributed version control commands, branching models, and PR reviews.',
        topics: [
          {
            id: 'git-basics-and-commits',
            title: 'Git Basics: Repositories, Staging & Commits',
            summary: 'Working Directory, Staging Area (Index), and Commit snapshots.',
            whatYouWillLearn: 'Understand how Git models project history as an immutable Directed Acyclic Graph (DAG) of snapshot commits.',
            concept: 'Git is a distributed version control system that tracks changes in files over time, enabling developers to roll back bugs, branch experimental features, and collaborate globally.',
            whyItMatters: 'Git is used by 95%+ of all software engineering teams worldwide.',
            example: {
              language: 'bash',
              code: `# Standard Git Workflow
git init                    # Initialize a new local repository
git status                  # Check modified and untracked files
git add src/main.py         # Move modified file to Staging Area
git commit -m "feat: add user authentication endpoint" # Create snapshot
git push origin main        # Push local commits to remote GitHub repo`,
              explanation: 'Git records complete snapshots of file state in cryptographic commit objects (SHA-1 hashes).'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Three Stages of Git: Working Directory -> Staging Area (Index) -> Commit History.',
              'Every commit has a unique SHA hash, author metadata, timestamp, and pointer to its parent commit.',
              'Write concise, imperative commit messages (feat: add password hashing).'
            ],
            practiceProblems: [
              {
                title: 'Simulate Merge Conflict Resolution',
                difficulty: 'Easy',
                description: 'Explain what causes a merge conflict in Git and write out the steps to manually resolve conflict markers.'
              }
            ]
          },
          {
            id: 'branching-and-pull-requests',
            title: 'Branching, Merging & Pull Requests',
            summary: 'Feature branches, Pull Requests, and code review workflows.',
            whatYouWillLearn: 'Master git checkout -b, git merge, git rebase, and collaborating via GitHub Pull Requests (PRs).',
            concept: 'Branches are lightweight pointers to specific commits. Creating a branch allows developers to build isolated features without affecting the stable main production code.',
            whyItMatters: 'Pull Requests enable peer code reviews, continuous integration (CI) test checks, and maintain software reliability.',
            example: {
              language: 'bash',
              code: `# Branching & Pull Request flow
git checkout -b feature/dark-mode  # Create and switch to new branch
# ... write code ...
git add .
git commit -m "feat: add dark mode theme toggle"
git push origin feature/dark-mode  # Push branch to GitHub
# Open Pull Request on GitHub for team review and CI verification!`,
              explanation: 'Once approved by teammates and passing CI tests, the feature branch is merged into main.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Branches in Git are merely 41-byte pointer files referencing a commit hash, making branch creation instantaneous.',
              'git merge creates a merge commit preserving exact history; git rebase rewrites commits for a linear history.',
              'Pull Requests (PRs) facilitate code review, automated lint checks, and test runner validations before merging.'
            ],
            practiceProblems: [
              {
                title: 'Git Rebase vs Merge Trade-offs',
                difficulty: 'Medium',
                description: 'Explain why rebasing public shared branches is dangerous, while rebasing local feature branches creates clean history.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'web-api-fundamentals',
    levelNumber: '12',
    title: 'Web & API Fundamentals',
    iconName: 'Webhook',
    shortDescription: 'Learn the foundational protocols, formats, and architecture powering the modern web.',
    longDescription: 'Understand URLs, DNS resolution, HTTP request/response lifecycles, HTTP methods, status codes, RESTful API design principles, JSON serialization, and API key security.',
    badge: 'Web Architecture',
    categories: [
      {
        id: 'web-api-core',
        title: 'Web & API Architecture',
        tagline: 'Designing robust, secure, and scalable Web APIs.',
        description: 'Master the principles of web communication, REST APIs, JSON serialization, and API authentication.',
        topics: [
          {
            id: 'rest-api-design-and-json',
            title: 'REST API Design, Endpoints & HTTP Methods',
            summary: 'Resource-oriented URLs, CRUD mapping, and HTTP status codes.',
            whatYouWillLearn: 'Master REST conventions, resource hierarchy naming (/api/v1/posts/12/comments), idempotent HTTP methods, and error payload structuring.',
            concept: 'Representational State Transfer (REST) is an architectural style for designing networked APIs using standard HTTP verbs (GET, POST, PUT, DELETE) and resource-oriented endpoints.',
            whyItMatters: 'Clean REST API design ensures web, mobile, and third-party developers can seamlessly consume your backend services.',
            example: {
              language: 'plaintext',
              code: `RESTful Endpoint Convention Mapping:
• GET    /api/v1/products         ──► List products (200 OK)
• GET    /api/v1/products/42      ──► Get product 42 (200 OK or 404 Not Found)
• POST   /api/v1/products         ──► Create product (201 Created)
• PUT    /api/v1/products/42      ──► Replace product 42 (200 OK)
• DELETE /api/v1/products/42      ──► Remove product 42 (204 No Content)`,
              explanation: 'HTTP verbs define the action, while URL paths identify the nouns (resources).'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'GET and DELETE are idempotent (calling them multiple times produces the same server state).',
              'Use plural nouns for resource collections (/api/users, not /api/getUser).',
              'Always return consistent error objects with descriptive error messages and appropriate HTTP status codes.'
            ],
            practiceProblems: [
              {
                title: 'Design API for a Blogging Platform',
                difficulty: 'Easy',
                description: 'Write out the complete REST specification for Articles, Authors, and Comments including query parameter filtering.'
              }
            ]
          },
          {
            id: 'api-security-and-keys',
            title: 'API Authentication, CORS & Rate Limiting',
            summary: 'API keys, bearer tokens, Cross-Origin Resource Sharing, and rate limits.',
            whatYouWillLearn: 'Protect backend endpoints against unauthorized access, configure CORS headers, and prevent DDoS abuse with rate limiting.',
            concept: 'Web APIs must verify client identity via API Keys or OAuth Bearer tokens, enforce Cross-Origin Resource Sharing (CORS) rules in browsers, and throttle requests via Rate Limiting.',
            whyItMatters: 'Unsecured APIs expose sensitive customer data and allow malicious bots to drain server compute and cloud budgets.',
            example: {
              language: 'javascript',
              code: `// Express.js Middleware verifying API Key and Rate Limit
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: { error: "Too many requests, please try again later." }
});

function verifyApiKey(req, res, next) {
    const apiKey = req.header('X-API-Key');
    if (!apiKey || apiKey !== process.env.SECRET_API_KEY) {
        return res.status(401).json({ error: "Unauthorized: Invalid API Key" });
    }
    next(); // Pass to route handler
}`,
              explanation: 'Middleware intercepts incoming requests before reaching business logic, rejecting unauthorized or excessive traffic.'
            },
            visualizerType: 'none',
            keyTakeaways: [
              'Never commit API keys or database secrets to public Git repositories; use environment variables (.env).',
              'CORS (Cross-Origin Resource Sharing) prevents malicious websites from making unauthorized API calls on behalf of users.',
              'Rate limiting protects backend databases from Denial of Service (DoS) overload.'
            ],
            practiceProblems: [
              {
                title: 'Explain CORS Preflight Requests',
                difficulty: 'Medium',
                description: 'Explain why browsers send an OPTIONS HTTP preflight request before sending non-simple POST/PUT requests.'
              }
            ]
          }
        ]
      }
    ]
  }
];

// Helper Functions
export function getAllFoundationLevels(): FoundationLevel[] {
  return CS_FOUNDATIONS_LEVELS;
}

export function getFoundationLevelById(levelId: string): FoundationLevel | null {
  return CS_FOUNDATIONS_LEVELS.find((lvl) => lvl.id === levelId.toLowerCase()) || null;
}

export function getCategoryById(levelId: string, categoryId: string): FoundationCategory | null {
  const level = getFoundationLevelById(levelId);
  if (!level) return null;
  return level.categories.find((cat) => cat.id === categoryId.toLowerCase()) || null;
}

export function getTopicById(levelId: string, categoryId: string, topicId: string): TopicDetail | null {
  const category = getCategoryById(levelId, categoryId);
  if (!category) return null;
  return category.topics.find((top) => top.id === topicId.toLowerCase()) || null;
}

export function getTotalTopicsCount(level: FoundationLevel): number {
  return level.categories.reduce((total, cat) => total + cat.topics.length, 0);
}

export function getNextAndPrevTopic(levelId: string, categoryId: string, topicId: string) {
  const level = getFoundationLevelById(levelId);
  if (!level) return { prev: null, next: null };

  // Flatten all topics in the level for linear navigation
  const flatTopics: { level: FoundationLevel; category: FoundationCategory; topic: TopicDetail }[] = [];
  for (const cat of level.categories) {
    for (const top of cat.topics) {
      flatTopics.push({ level, category: cat, topic: top });
    }
  }

  const currentIndex = flatTopics.findIndex((t) => t.category.id === categoryId && t.topic.id === topicId);
  if (currentIndex === -1) return { prev: null, next: null };

  const prev = currentIndex > 0 ? flatTopics[currentIndex - 1] : null;
  const next = currentIndex < flatTopics.length - 1 ? flatTopics[currentIndex + 1] : null;

  return { prev, next };
}
