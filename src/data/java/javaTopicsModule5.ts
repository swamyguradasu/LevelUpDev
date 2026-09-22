import { JavaTopicDetail } from './javaTopicsData';

export const JAVA_TOPICS_MODULE_5: Record<string, JavaTopicDetail> = {
  'array-fundamentals-memory': {
    id: 'array-fundamentals-memory',
    moduleId: 'm5',
    topicNumber: 1,
    title: 'Array Fundamentals & Memory Allocation',
    shortSummary: 'Fixed-size indexed collections in Java, heap object allocation, and reference storage on the stack.',
    whatIsIt: 'An array is a fixed-length container holding elements of a single uniform data type stored consecutively in memory.',
    whyDoWeNeedIt: 'Arrays allow grouping hundreds or thousands of related items under a single variable name and accessing any item in $O(1)$ constant time via its index.',
    syntax: `// 1. Declaration & Instantiation:
int[] numbers = new int[5]; // Allocates 5 ints initialized to 0

// 2. Array Literal:
int[] primes = {2, 3, 5, 7, 11};

// 3. Length property (field, not method):
int size = numbers.length;`,
    basicExample: {
      code: `public class ArrayIntroDemo {
    public static void main(String[] args) {
        int[] scores = new int[3];
        scores[0] = 85;
        scores[1] = 92;
        scores[2] = 78;

        System.out.println("First element: " + scores[0]);
        System.out.println("Array length: " + scores.length);
        System.out.println("Last element: " + scores[scores.length - 1]);
    }
}`,
      output: `First element: 85
Array length: 3
Last element: 78`
    },
    detailedExample: {
      code: `public class ArrayDefaultsDemo {
    public static void main(String[] args) {
        int[] ints = new int[2];
        boolean[] flags = new boolean[2];
        String[] strings = new String[2];

        System.out.println("Default int: " + ints[0]);
        System.out.println("Default boolean: " + flags[0]);
        System.out.println("Default Object: " + strings[0]);
    }
}`,
      output: `Default int: 0
Default boolean: false
Default Object: null`
    },
    codeExplanation: [
      'int[] scores: Reference variable placed on the JVM Stack.',
      'new int[3]: Creates a contiguous array object on the Heap with 3 integer slots initialized to 0.',
      'scores.length: Read-only public field indicating total capacity.'
    ],
    visualExplanation: {
      title: 'Stack Reference to Heap Array Object',
      description: 'Stack holds the memory reference address pointer; Heap holds the actual element slots and length header.',
      asciiDiagram: `STACK MEMORY                          HEAP MEMORY
┌─────────────────────┐              ┌───────────────────────────┐
│ scores: [@0x4f2a]  ├─────────────→│ Address: @0x4f2a          │
└─────────────────────┘              │ Length: 3                 │
                                     │ [0]: 85 | [1]: 92 | [2]: 78│
                                     └───────────────────────────┘`
    },
    visualizerType: 'array-index',
    commonMistakes: [
      {
        mistake: 'Writing `scores.length()` with parentheses like a method.',
        whyItIsWrong: 'In Java, `.length` on arrays is a built-in property field, not a method.',
        correction: 'Use `arr.length` without parentheses.'
      },
      {
        mistake: 'Accessing index `arr[arr.length]`.',
        whyItIsWrong: 'Arrays are 0-indexed; valid indices are `0` to `arr.length - 1`. Accessing `arr.length` throws `ArrayIndexOutOfBoundsException`.',
        correction: 'Last valid element is always `arr[arr.length - 1]`.'
      }
    ],
    importantRules: [
      'Arrays have a fixed size once instantiated on the Heap.',
      'All elements are default-initialized (0, false, null).',
      'Prefer `int[] arr` style over `int arr[]` in Java.'
    ],
    interviewPerspective: {
      question: 'Where are Java arrays stored in memory, and what is the cost of index lookup?',
      answer: 'All Java arrays are objects stored on the Heap, while array reference variables reside on the Stack. Array element access via index is $O(1)$ constant time because the physical memory address is calculated directly via `baseAddress + (index * elementSize)`.',
      trap: 'Array lookup is $O(1)$ regardless of how large the array is.'
    },
    practiceQuestions: [
      {
        question: 'Declare and initialize a `String` array containing the names of the 7 days of the week.',
        hint: 'Use array literal syntax `{...}`.',
        solution: `String[] days = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m5-t1-q1',
        type: 'mcq',
        prompt: 'What is the default value of elements in a `boolean[]` array created with `new boolean[4]`?',
        options: ['false', 'true', 'null', '0'],
        correctAnswer: 0,
        explanation: 'In Java, all boolean array elements are automatically default-initialized to `false`.'
      }
    ]
  },

  'array-traversal-for-each': {
    id: 'array-traversal-for-each',
    moduleId: 'm5',
    topicNumber: 2,
    title: 'Array Traversal: Classic vs Enhanced For-Each',
    shortSummary: 'Master traditional index-based iteration and clean enhanced for-each loops for sequential processing.',
    whatIsIt: 'Array traversal is the systematic visitation of each element in an array using iteration loops.',
    whyDoWeNeedIt: 'Fundamental for computing aggregates (sums, averages), searching, filtering, transforming, and formatting collection data.',
    syntax: `// 1. Classic Indexed Loop (Read/Write, Custom Step)
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}

// 2. Enhanced For-Each Loop (Read-Only, Sequential)
for (int num : arr) {
    System.out.println(num);
}`,
    basicExample: {
      code: `public class TraversalDemo {
    public static void main(String[] args) {
        String[] fruits = {"Apple", "Banana", "Cherry"};

        // Enhanced for-each
        for (String fruit : fruits) {
            System.out.println("Fruit: " + fruit);
        }
    }
}`,
      output: `Fruit: Apple
Fruit: Banana
Fruit: Cherry`
    },
    detailedExample: {
      code: `public class LoopComparison {
    public static void main(String[] args) {
        int[] scores = {75, 88, 92, 60, 95};
        
        // 1. Double all scores (requires index to modify array)
        for (int i = 0; i < scores.length; i++) {
            scores[i] *= 2;
        }

        // 2. Compute sum (read-only using for-each)
        int sum = 0;
        for (int s : scores) {
            sum += s;
        }

        System.out.println("Doubled scores sum: " + sum);
    }
}`,
      output: `Doubled scores sum: 820`
    },
    codeExplanation: [
      'Classic for loop: Provides access to index `i`, allowing mutation `scores[i] *= 2`.',
      'Enhanced for-each: Iterates over values without exposing indices. Cleaner syntax for read-only aggregation.'
    ],
    visualExplanation: {
      title: 'Index Pointer vs Value Extraction',
      description: 'Classic loop uses an index cursor; Enhanced loop automatically unwraps each element value.',
      asciiDiagram: `Array: [ "Apple", "Banana", "Cherry" ]
           ▲
Classic:   i = 0  (Index cursor moves 0 -> 1 -> 2)
For-Each:  fruit = "Apple" (Local variable holds copied value)`
    },
    visualizerType: 'array-index',
    commonMistakes: [
      {
        mistake: 'Trying to modify array values inside an enhanced for-each loop on primitive arrays (`for(int x : arr) x = 0;`).',
        whyItIsWrong: '`x` is a local copy of the element value during that iteration. Modifying `x` does not update the underlying array.',
        correction: 'Use a classic indexed `for (int i = 0; i < arr.length; i++)` loop when mutating array elements.'
      }
    ],
    importantRules: [
      'Enhanced for-each is strictly forward and read-only regarding primitive array slots.',
      'Use classic indexed loop when you need index arithmetic, reverse order, or element mutation.',
      'Enhanced for-each avoids off-by-one errors completely.'
    ],
    interviewPerspective: {
      question: 'Can you traverse an array backwards using an enhanced for-each loop in Java?',
      answer: 'No. The enhanced for-each loop is compiled into standard forward index iteration (0 to length - 1). For reverse traversal, you must use a classic `for (int i = arr.length - 1; i >= 0; i--)` loop.',
      trap: 'For-each provides no reverse mechanism on raw arrays.'
    },
    practiceQuestions: [
      {
        question: 'Write a method to calculate and return the average of a `double[]` array using for-each.',
        hint: 'Sum all elements and divide by `arr.length`.',
        solution: `double sum = 0; for(double d : arr) sum += d; return arr.length == 0 ? 0 : sum / arr.length;`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m5-t2-q1',
        type: 'mcq',
        prompt: 'What happens when `for (int x : arr) { x = 100; }` is run on `int[] arr = {1, 2, 3};`?',
        options: [
          'The array `arr` remains unchanged: `{1, 2, 3}`',
          'The array `arr` becomes `{100, 100, 100}`',
          'Throws a CompilationError',
          'Throws an UnsupportedOperationException'
        ],
        correctAnswer: 0,
        explanation: '`x` is a local iteration copy. Assigning to `x` changes only the local variable, leaving the original array intact.'
      }
    ]
  },

  'core-array-operations': {
    id: 'core-array-operations',
    moduleId: 'm5',
    topicNumber: 3,
    title: 'Core Array Operations & Search Algorithms',
    shortSummary: 'Implement foundational array algorithms: Min/Max finding, in-place reversal, and Linear vs Binary Search.',
    whatIsIt: 'Core array operations manipulate elements in-place or search for target elements efficiently.',
    whyDoWeNeedIt: 'Array searching and transformation algorithms are the backbone of data querying, analytics, sorting, and algorithmic problem solving.',
    syntax: `// In-place two-pointer reversal:
int left = 0, right = arr.length - 1;
while (left < right) {
    int temp = arr[left];
    arr[left++] = arr[right];
    arr[right--] = temp;
}`,
    basicExample: {
      code: `public class MinMaxFinder {
    public static void main(String[] args) {
        int[] nums = {45, 12, 85, 32, 89, 39};
        int min = nums[0];
        int max = nums[0];

        for (int n : nums) {
            if (n < min) min = n;
            if (n > max) max = n;
        }

        System.out.println("Min: " + min + " | Max: " + max);
    }
}`,
      output: `Min: 12 | Max: 89`
    },
    detailedExample: {
      code: `public class BinarySearchDemo {
    public static int binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2; // Prevents overflow

            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1; // Not found
    }

    public static void main(String[] args) {
        int[] sorted = {10, 20, 30, 40, 50, 60};
        System.out.println("Index of 40: " + binarySearch(sorted, 40));
        System.out.println("Index of 99: " + binarySearch(sorted, 99));
    }
}`,
      output: `Index of 40: 3
Index of 99: -1`
    },
    codeExplanation: [
      'Min/Max: Initializes boundaries with `nums[0]` and inspects elements in $O(N)$ linear time.',
      'Binary Search: Halves search window on each iteration, achieving $O(\\log N)$ time.',
      'low + (high - low) / 2: Prevents integer overflow that occurs when `(low + high)` exceeds $2^{31} - 1$.'
    ],
    visualExplanation: {
      title: 'Binary Search Window Halving Pipeline',
      description: 'Search space reduces by 50% each step: 1024 -> 512 -> 256 -> 128 -> ... -> 1 in at most 10 steps.',
      asciiDiagram: `Array: [ 10, 20, 30, 40, 50, 60, 70 ]  Target = 60
Step 1: Low = 0, Mid = 3 (40), High = 6  (40 < 60 -> Low = Mid + 1 = 4)
Step 2: Low = 4, Mid = 5 (60), High = 6  (Match found at index 5!)`
    },
    visualizerType: 'array-index',
    commonMistakes: [
      {
        mistake: 'Running Binary Search on an unsorted array.',
        whyItIsWrong: 'Binary search assumes sorted order to eliminate half the array. On unsorted arrays it produces random incorrect results.',
        correction: 'Always sort the array first (`Arrays.sort(arr)`) or use Linear Search.'
      }
    ],
    importantRules: [
      'Linear Search works on unsorted arrays in $O(N)$ time.',
      'Binary Search requires a sorted array and executes in $O(\\log N)$ time.',
      'Calculate mid as `low + (high - low) / 2` to prevent integer overflow.'
    ],
    interviewPerspective: {
      question: 'Why can `(low + high) / 2` cause a bug in Java binary search on large arrays?',
      answer: 'If `low + high` exceeds `Integer.MAX_VALUE` (2,147,483,647), the sum wraps around into a negative number, causing `mid` to become negative and throwing `ArrayIndexOutOfBoundsException`. Using `low + (high - low) / 2` avoids overflow.',
      trap: 'This famous bug was present in the standard JDK `Arrays.binarySearch` for over 9 years.'
    },
    practiceQuestions: [
      {
        question: 'Implement a method to reverse an `int[]` array in place using two pointers.',
        hint: 'Swap `arr[left]` and `arr[right]` while `left < right`.',
        solution: `int l=0, r=arr.length-1; while(l<r){ int t=arr[l]; arr[l++]=arr[r]; arr[r--]=t; }`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m5-t3-q1',
        type: 'mcq',
        prompt: 'What is the maximum number of comparisons Binary Search takes on a sorted array of 1,024 elements?',
        options: ['11 comparisons', '1,024 comparisons', '512 comparisons', '1 comparison'],
        correctAnswer: 0,
        explanation: '$\\log_2(1024) + 1 = 10 + 1 = 11$ comparisons maximum in worst case.'
      }
    ]
  },

  'multidimensional-jagged-arrays': {
    id: 'multidimensional-jagged-arrays',
    moduleId: 'm5',
    topicNumber: 4,
    title: 'Multi-Dimensional & Jagged Arrays',
    shortSummary: 'Explore 2D matrices, grids, and non-rectangular (jagged) arrays in Java.',
    whatIsIt: 'In Java, multi-dimensional arrays are objects containing references to other 1D array objects.',
    whyDoWeNeedIt: 'Essential for representing matrices, spreadsheets, game boards (Chess, Tic-Tac-Toe), image pixels, and graph adjacency matrices.',
    syntax: `// 1. Rectangular 2D Matrix (3 rows, 4 cols)
int[][] matrix = new int[3][4];

// 2. Jagged / Ragged Array (rows with different lengths)
int[][] jagged = new int[3][];
jagged[0] = new int[2];
jagged[1] = new int[4];
jagged[2] = new int[1];`,
    basicExample: {
      code: `public class MatrixDemo {
    public static void main(String[] args) {
        int[][] grid = {
            {1, 2, 3},
            {4, 5, 6}
        };

        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[r].length; c++) {
                System.out.print(grid[r][c] + " ");
            }
            System.out.println();
        }
    }
}`,
      output: `1 2 3 
4 5 6 `
    },
    detailedExample: {
      code: `public class PascalsTriangle {
    public static void main(String[] args) {
        int n = 4;
        int[][] triangle = new int[n][];

        for (int i = 0; i < n; i++) {
            triangle[i] = new int[i + 1];
            triangle[i][0] = 1;
            triangle[i][i] = 1;

            for (int j = 1; j < i; j++) {
                triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
            }
        }

        for (int[] row : triangle) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
}`,
      output: `1 
1 1 
1 2 1 
1 3 3 1 `
    },
    codeExplanation: [
      'triangle[i] = new int[i + 1]: Dynamically allocates each row to its exact required geometric width.',
      'grid[r].length: Always use row-specific length to support jagged arrays safely.'
    ],
    visualExplanation: {
      title: 'Jagged Array Heap Architecture',
      description: 'In Java, a 2D array is an array of heap pointers pointing to independent 1D array objects.',
      asciiDiagram: `jagged (int[][])
┌─────────────┐
│ [0]  [@0x10]├───→ [ 10, 20 ] (Length 2)
│ [1]  [@0x20]├───→ [ 30, 40, 50, 60 ] (Length 4)
│ [2]  [@0x30]├───→ [ 70 ] (Length 1)
└─────────────┘`
    },
    visualizerType: 'array-index',
    commonMistakes: [
      {
        mistake: 'Assuming all rows in a 2D array have identical length (`matrix[0].length`).',
        whyItIsWrong: 'If an array is jagged, using `matrix[0].length` causes `ArrayIndexOutOfBoundsException` or misses elements.',
        correction: 'Always use `matrix[r].length` for the inner column loop bound.'
      }
    ],
    importantRules: [
      'Java multi-dimensional arrays are arrays of array objects on the Heap.',
      'Rows can have different lengths (Jagged arrays).',
      'Always use `matrix[r].length` in inner loop conditions.'
    ],
    interviewPerspective: {
      question: 'How does memory layout of 2D arrays in Java differ from C/C++?',
      answer: 'In C/C++, a 2D matrix is stored as a single contiguous block of memory in row-major order. In Java, a 2D array is an array of object references, where each row is an independently allocated object anywhere on the Heap.',
      trap: 'Java 2D arrays are not contiguous in physical RAM.'
    },
    practiceQuestions: [
      {
        question: 'Write a snippet to transpose an $N \\times N$ square matrix in place.',
        hint: 'Swap `matrix[i][j]` with `matrix[j][i]` for `j > i`.',
        solution: `for(int i=0;i<n;i++) for(int j=i+1;j<n;j++){ int t=m[i][j]; m[i][j]=m[j][i]; m[j][i]=t; }`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m5-t4-q1',
        type: 'mcq',
        prompt: 'In Java, how are 2D arrays represented in JVM Heap memory?',
        options: [
          'An array of references to other independent 1D array objects',
          'A single contiguous 1D memory strip (like C)',
          'A linked list of tree nodes',
          'A hash map of row-column coordinates'
        ],
        correctAnswer: 0,
        explanation: 'Java multi-dimensional arrays are arrays of object references to separate 1D array objects in heap memory.'
      }
    ]
  },

  'arrays-utility-toolkit': {
    id: 'arrays-utility-toolkit',
    moduleId: 'm5',
    topicNumber: 5,
    title: 'The java.util.Arrays Utility Toolkit',
    shortSummary: 'Leverage built-in methods for sorting, binary searching, copying, filling, and comparing arrays.',
    whatIsIt: '`java.util.Arrays` is a standard library class containing static utility algorithms for array manipulation.',
    whyDoWeNeedIt: 'Eliminates boilerplate code for sorting, searching, printing, array resizing, and element equality comparisons.',
    syntax: `import java.util.Arrays;

Arrays.toString(arr);               // "[1, 2, 3]"
Arrays.sort(arr);                   // Dual-Pivot Quicksort
Arrays.binarySearch(arr, key);      // O(log N) search
Arrays.copyOf(arr, newLength);      // Resizing / slicing
Arrays.fill(arr, val);              // Bulk initialization
Arrays.equals(arr1, arr2);          // Element comparison`,
    basicExample: {
      code: `import java.util.Arrays;

public class ArraysUtilDemo {
    public static void main(String[] args) {
        int[] nums = {45, 12, 85, 32, 89};

        Arrays.sort(nums);
        System.out.println("Sorted: " + Arrays.toString(nums));

        int idx = Arrays.binarySearch(nums, 45);
        System.out.println("Index of 45: " + idx);
    }
}`,
      output: `Sorted: [12, 32, 45, 85, 89]
Index of 45: 2`
    },
    detailedExample: {
      code: `import java.util.Arrays;

public class AdvancedArraysDemo {
    public static void main(String[] args) {
        int[] original = {10, 20, 30, 40, 50};

        // Slice sub-array
        int[] slice = Arrays.copyOfRange(original, 1, 4);
        System.out.println("Slice [1..4): " + Arrays.toString(slice));

        // 2D Array formatting
        int[][] matrix = {{1, 2}, {3, 4}};
        System.out.println("Deep toString: " + Arrays.deepToString(matrix));
    }
}`,
      output: `Slice [1..4): [20, 30, 40]
Deep toString: [[1, 2], [3, 4]]`
    },
    codeExplanation: [
      'Arrays.toString(): Formats 1D array into readable string format.',
      'Arrays.deepToString(): Recursively formats multi-dimensional arrays.',
      'Arrays.copyOfRange(arr, from, to): Slices elements from `from` (inclusive) to `to` (exclusive).'
    ],
    visualExplanation: {
      title: 'Arrays Utility Operations Hub',
      description: 'Static tools for high-speed sorting, binary searching, formatting, and copying.',
      asciiDiagram: `[ Raw Array: {45, 12, 85} ]
      ↓
Arrays.sort() ──────────→ [ Sorted Array: {12, 45, 85} ]
Arrays.toString() ──────→ "[12, 45, 85]"
Arrays.copyOf(arr, 5) ──→ [ {12, 45, 85, 0, 0} ]`
    },
    visualizerType: 'array-index',
    commonMistakes: [
      {
        mistake: 'Printing an array directly with `System.out.println(arr)`.',
        whyItIsWrong: 'Prints internal type tag and memory hashcode (e.g. `[I@15db9742`) instead of array elements.',
        correction: 'Use `Arrays.toString(arr)` or `Arrays.deepToString(arr)` for 2D arrays.'
      }
    ],
    importantRules: [
      'Always import `java.util.Arrays`.',
      'Use `Arrays.equals()` for 1D arrays and `Arrays.deepEquals()` for 2D arrays.',
      '`Arrays.sort()` uses Dual-Pivot Quicksort for primitives and TimSort for objects.'
    ],
    interviewPerspective: {
      question: 'What sorting algorithm does `Arrays.sort()` use for primitive types vs object reference types in Java?',
      answer: 'For primitive types, `Arrays.sort()` uses Vladimir Yaroslavskiy\'s Dual-Pivot Quicksort ($O(N \\log N)$). For Object arrays, it uses TimSort (adaptive merge sort) because object sorting requires a **stable** sort algorithm.',
      trap: 'Primitives use Quicksort; Objects use TimSort to guarantee stability.'
    },
    practiceQuestions: [
      {
        question: 'How do you fill an array of 100 integers with the value `-1` in a single line?',
        hint: 'Use `Arrays.fill`.',
        solution: `Arrays.fill(arr, -1);`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m5-t5-q1',
        type: 'mcq',
        prompt: 'What method should you use to print the contents of a 2D matrix in human-readable format?',
        options: ['Arrays.deepToString()', 'Arrays.toString()', 'matrix.print()', 'System.out.println(matrix)'],
        correctAnswer: 0,
        explanation: '`Arrays.deepToString()` recursively inspects multi-dimensional array structures for printing.'
      }
    ]
  },

  'string-fundamentals-pool': {
    id: 'string-fundamentals-pool',
    moduleId: 'm5',
    topicNumber: 6,
    title: 'String Fundamentals, Immutability & String Pool',
    shortSummary: 'Understand the String class, immutability, Heap String Constant Pool, and why String modification creates new objects.',
    whatIsIt: 'A `String` in Java is an immutable object representing an indexed sequence of characters.',
    whyDoWeNeedIt: 'Text processing is omnipresent. Immutability ensures thread safety, security for network/database parameters, and allows memory caching via the String Constant Pool.',
    syntax: `// 1. String Literal (Stored in String Constant Pool)
String s1 = "Java";
String s2 = "Java"; // Reuses same object (s1 == s2 is true)

// 2. String Object via new (Stored in Heap outside pool)
String s3 = new String("Java"); // (s1 == s3 is false, s1.equals(s3) is true)`,
    basicExample: {
      code: `public class StringPoolDemo {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = "Hello";
        String s3 = new String("Hello");

        System.out.println("s1 == s2: " + (s1 == s2));         // true
        System.out.println("s1 == s3: " + (s1 == s3));         // false
        System.out.println("s1.equals(s3): " + s1.equals(s3)); // true
    }
}`,
      output: `s1 == s2: true
s1 == s3: false
s1.equals(s3): true`
    },
    detailedExample: {
      code: `public class ImmutabilityDemo {
    public static void main(String[] args) {
        String original = "LevelUp";
        original.concat("Dev"); // Return value discarded!

        System.out.println("Original string: " + original);

        // Proper reassignment
        original = original.concat("Dev");
        System.out.println("After reassignment: " + original);
    }
}`,
      output: `Original string: LevelUp
After reassignment: LevelUpDev`
    },
    codeExplanation: [
      'original.concat("Dev"): Creates a NEW String object "LevelUpDev" in memory; it does NOT alter the original string.',
      's1 == s2: Evaluates to `true` because both literal references point to the identical cached instance in the String Constant Pool.',
      's1.equals(s3): Compares character contents, returning `true`.'
    ],
    visualExplanation: {
      title: 'String Constant Pool (SCP) vs Heap Allocation',
      description: 'Literal variables share the same pool address; new keyword forces a separate heap object.',
      asciiDiagram: `STACK                    HEAP MEMORY
┌──────┐                 ┌─────────────────────────────────┐
│  s1  ├────────────────→│ String Constant Pool (SCP)      │
├──────┤                 │  [@0x100]: "Hello"              │
│  s2  ├────────────────→│                                 │
├──────┤                 └─────────────────────────────────┘
│  s3  ├────────────────→ Heap Object [@0x200]: "Hello"
└──────┘`
    },
    visualizerType: 'memory-box',
    commonMistakes: [
      {
        mistake: 'Using `==` to compare String values in Java.',
        whyItIsWrong: '`==` compares memory reference addresses, not character text. Dynamically computed strings will return `false` even if text matches.',
        correction: 'Always use `.equals()` or `.equalsIgnoreCase()` for String content comparison.'
      }
    ],
    importantRules: [
      'Java Strings are strictly immutable; operations return new String instances.',
      'Always use `.equals()` to compare text content.',
      'String literals are automatically deduplicated in the String Constant Pool.'
    ],
    interviewPerspective: {
      question: 'Why are Strings immutable in Java?',
      answer: '1) **Security**: Sensitive parameters (passwords, socket URLs) cannot be modified after validation. 2) **Thread-Safety**: Safe across concurrent threads without locks. 3) **String Pool Caching**: Memory savings via literal sharing. 4) **Hashcode Caching**: Cached hash codes boost HashMap performance.',
      trap: 'Never forget to mention security and HashMap key stability.'
    },
    practiceQuestions: [
      {
        question: 'How many objects are created by `String s = new String("Java");`?',
        hint: 'Consider the literal and the `new` keyword.',
        solution: 'Two objects: one in the String Constant Pool (for the literal `"Java"` if not already present) and one on the general Heap.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m5-t6-q1',
        type: 'mcq',
        prompt: 'Why does `s1 == s2` return `true` for `String s1 = "Code"; String s2 = "Code";`?',
        options: [
          'Both references point to the same shared object in the String Constant Pool',
          'Java overrides `==` to check content for Strings',
          'Strings are primitive types in Java',
          'The JVM compiles them into integers'
        ],
        correctAnswer: 0,
        explanation: 'String literals are cached in the String Constant Pool, so identical literals share the same heap memory address.'
      }
    ]
  },

  'string-methods-api': {
    id: 'string-methods-api',
    moduleId: 'm5',
    topicNumber: 7,
    title: 'Essential String Methods & Text Manipulation',
    shortSummary: 'Master the comprehensive API of Java String methods for inspection, transformation, searching, and splitting.',
    whatIsIt: 'The `java.lang.String` class provides dozens of built-in methods for searching, slicing, transforming, and validating text.',
    whyDoWeNeedIt: 'Data parsing, user input validation, CSV handling, URL routing, and text search rely on these standard methods.',
    syntax: `s.length();                     // Character count
s.charAt(index);                // Character at index
s.substring(start, end);        // Slice [start, end)
s.indexOf("text");              // Find first index (-1 if missing)
s.trim() / s.strip();           // Remove surrounding whitespace
s.split(delimiter);             // Split into String[] array
s.replace(oldVal, newVal);      // Replace text`,
    basicExample: {
      code: `public class StringMethodsDemo {
    public static void main(String[] args) {
        String msg = "  Hello, Java World!  ";

        System.out.println("Length: " + msg.length());
        System.out.println("Trimmed: '" + msg.trim() + "'");
        System.out.println("Upper: " + msg.toUpperCase());
        System.out.println("Contains 'Java': " + msg.contains("Java"));
    }
}`,
      output: `Length: 22
Trimmed: 'Hello, Java World!'
Upper:   HELLO, JAVA WORLD!  
Contains 'Java': true`
    },
    detailedExample: {
      code: `public class CsvTokenizer {
    public static void main(String[] args) {
        String csvLine = "Alice,24,Computer Science,Seattle";
        String[] tokens = csvLine.split(",");

        for (int i = 0; i < tokens.length; i++) {
            System.out.printf("Token [%d]: %s%n", i, tokens[i].trim());
        }
    }
}`,
      output: `Token [0]: Alice
Token [1]: 24
Token [2]: Computer Science
Token [3]: Seattle`
    },
    codeExplanation: [
      's.substring(start, end): Extracts characters starting at `start` up to `end - 1` (end is exclusive).',
      's.split(","): Splits string into tokens based on comma delimiter regex.'
    ],
    visualExplanation: {
      title: 'String Substring Index Slicing',
      description: 'Substring [0, 5) extracts indices 0, 1, 2, 3, 4.',
      asciiDiagram: `Index:   0   1   2   3   4   5   6   7   8
Char:  [ L | E | V | E | L | U | P | D | V ]
         ▲                   ▲
       start=0             end=5
       Result: "LEVEL"`
    },
    visualizerType: 'array-index',
    commonMistakes: [
      {
        mistake: 'Assuming `s.substring(0, 4)` includes index 4.',
        whyItIsWrong: 'In Java, substring `endIndex` is exclusive. `(0, 4)` extracts indices 0, 1, 2, 3 (length = 4).',
        correction: 'If you need character at index 4, use `s.substring(0, 5)`.'
      }
    ],
    importantRules: [
      'String indices are 0-based, just like arrays.',
      '`substring(begin, end)` includes `begin` and excludes `end`.',
      'Use `s.isBlank()` in Java 11+ to check for empty or whitespace-only strings.'
    ],
    interviewPerspective: {
      question: 'What is the difference between `s.trim()` and `s.strip()` in Java?',
      answer: '`trim()` (Java 1.0) removes characters with ASCII codepoints <= `U+0020` (ASCII whitespace only). `strip()` (Java 11+) is Unicode-aware and strips all Unicode whitespace standard characters according to Character.isWhitespace().',
      trap: '`strip()` is modern and Unicode-compliant; `trim()` only handles ASCII.'
    },
    practiceQuestions: [
      {
        question: 'Extract the domain name from an email string `"developer@levelup.dev"`.',
        hint: 'Use `indexOf("@")` and `substring()`.',
        solution: `String domain = email.substring(email.indexOf("@") + 1);`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m5-t7-q1',
        type: 'mcq',
        prompt: 'What does `"Software".substring(0, 4)` return?',
        options: ['"Soft"', '"Softw"', '"oftw"', '"Software"'],
        correctAnswer: 0,
        explanation: 'Index range 0 to 4 extracts characters at indices 0, 1, 2, 3 -> \'S\', \'o\', \'f\', \'t\'.'
      }
    ]
  },

  'stringbuilder-performance': {
    id: 'stringbuilder-performance',
    moduleId: 'm5',
    topicNumber: 8,
    title: 'StringBuilder & StringBuffer vs Concatenation',
    shortSummary: 'Understand mutable string buffers, memory efficiency in loops, thread-safety trade-offs, and performance benchmarks.',
    whatIsIt: '`StringBuilder` is a mutable sequence of characters backed by a dynamic, resizable buffer.',
    whyDoWeNeedIt: 'Because String is immutable, repeated concatenation (`+=`) in loops creates $O(N^2)$ garbage objects. `StringBuilder` appends in $O(1)$ amortized time.',
    syntax: `StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(" ").append("World");
sb.reverse();
sb.delete(0, 5);
String result = sb.toString();`,
    basicExample: {
      code: `public class StringBuilderDemo {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Level");
        sb.append("Up");
        sb.append("Dev");
        
        System.out.println("Content: " + sb.toString());
        System.out.println("Reversed: " + sb.reverse().toString());
    }
}`,
      output: `Content: LevelUpDev
Reversed: veDUpLeveL`
    },
    detailedExample: {
      code: `public class BenchmarkComparison {
    public static void main(String[] args) {
        // StringBuilder: Fast O(N) append
        long start = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 50000; i++) {
            sb.append(i);
        }
        long duration = System.currentTimeMillis() - start;
        System.out.println("StringBuilder 50k appends took: " + duration + " ms");
    }
}`,
      output: `StringBuilder 50k appends took: 4 ms`
    },
    codeExplanation: [
      'new StringBuilder(): Allocates initial internal character buffer (default capacity 16).',
      'sb.append(): Appends characters in-place, doubling buffer capacity automatically when full.',
      'sb.toString(): Converts final buffer to an immutable String instance.'
    ],
    visualExplanation: {
      title: 'Dynamic Resizable Buffer Allocation',
      description: 'Mutations occur directly on the internal buffer without allocating separate String objects.',
      asciiDiagram: `StringBuilder Internal Buffer:
Capacity: 16 | Length: 8
[ 'L' | 'e' | 'v' | 'e' | 'l' | 'U' | 'p' | 'D' | _ | _ | _ | _ | _ | _ | _ | _ ]
Appends mutate buffer directly in RAM in O(1) amortized time!`
    },
    visualizerType: 'memory-box',
    commonMistakes: [
      {
        mistake: 'Using `StringBuffer` everywhere in single-threaded code.',
        whyItIsWrong: '`StringBuffer` synchronizes all methods for thread safety, introducing unnecessary locking performance overhead.',
        correction: 'Use `StringBuilder` for single-threaded code; use `StringBuffer` only when multi-threaded sharing is required.'
      }
    ],
    importantRules: [
      'Always use `StringBuilder` when concatenating strings inside loops.',
      '`StringBuilder` is faster and not thread-safe; `StringBuffer` is synchronized and thread-safe.',
      'Pre-allocate capacity `new StringBuilder(size)` if output size is predictable.'
    ],
    interviewPerspective: {
      question: 'What is the key difference between String, StringBuilder, and StringBuffer?',
      answer: '`String` is immutable. `StringBuilder` is mutable and not thread-safe (fastest for single thread). `StringBuffer` is mutable and thread-safe (all public methods synchronized).',
      trap: 'String concatenation in a loop is $O(N^2)$; StringBuilder is $O(N)$.'
    },
    practiceQuestions: [
      {
        question: 'Write a one-line snippet to reverse a String using StringBuilder.',
        hint: 'Chain `new StringBuilder(s).reverse().toString()`.',
        solution: `String reversed = new StringBuilder(s).reverse().toString();`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m5-t8-q1',
        type: 'mcq',
        prompt: 'Which class should you choose for high-performance string manipulation in single-threaded code?',
        options: ['StringBuilder', 'StringBuffer', 'String with `+`', 'Vector<String>'],
        correctAnswer: 0,
        explanation: '`StringBuilder` is non-synchronized and fastest for single-threaded mutable string operations.'
      }
    ]
  },

  'array-string-algorithms': {
    id: 'array-string-algorithms',
    moduleId: 'm5',
    topicNumber: 9,
    title: 'Array & String Problem Solving',
    shortSummary: 'Apply array and string techniques to solve classic problems: Palindromes, Anagrams, and Frequency arrays.',
    whatIsIt: 'Algorithmic problem solving synthesizing arrays and strings with two-pointer and frequency counting patterns.',
    whyDoWeNeedIt: 'These algorithmic patterns are standard core components of technical coding assessments and interview rounds.',
    syntax: `// Anagram Frequency Bucket Check (O(N) Time, O(1) Space)
int[] count = new int[26];
for (char c : s.toCharArray()) count[c - 'a']++;
for (char c : t.toCharArray()) count[c - 'a']--;`,
    basicExample: {
      code: `public class PalindromeChecker {
    public static boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left++) != s.charAt(right--)) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println("radar is palindrome? " + isPalindrome("radar"));
        System.out.println("java is palindrome? " + isPalindrome("java"));
    }
}`,
      output: `radar is palindrome? true
java is palindrome? false`
    },
    detailedExample: {
      code: `public class AnagramChecker {
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] counts = new int[26];

        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
            counts[t.charAt(i) - 'a']--;
        }

        for (int c : counts) {
            if (c != 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println("silent & listen: " + isAnagram("silent", "listen"));
        System.out.println("hello & world: " + isAnagram("hello", "world"));
    }
}`,
      output: `silent & listen: true
hello & world: false`
    },
    codeExplanation: [
      'Two-pointer Palindrome: Checks mirror symmetry inward in $O(N/2)$ time and $O(1)$ space.',
      'Frequency Array: Uses fixed 26-slot `int[]` array to count letter occurrences in $O(N)$ time with zero Map overhead.'
    ],
    visualExplanation: {
      title: 'Two-Pointer Mirror Convergence',
      description: 'Pointers start at outer boundaries and converge toward center, returning false on mismatch.',
      asciiDiagram: `[ r | a | d | a | r ]
  ▲               ▲
Left=0          Right=4  ('r' == 'r')
    ▲           ▲
  Left=1      Right=3    ('a' == 'a')
        ▲ (Center reached -> Palindrome verified!)`
    },
    visualizerType: 'array-index',
    commonMistakes: [
      {
        mistake: 'Sorting strings to check anagrams ($O(N \\log N)$) instead of using frequency counting ($O(N)$).',
        whyItIsWrong: 'Sorting is slower and creates unnecessary temporary arrays in memory.',
        correction: 'Use fixed 26-element integer frequency bucket arrays.'
      }
    ],
    importantRules: [
      'Two-pointer approach operates in $O(N)$ time and $O(1)$ space.',
      'Character frequency array `int[26]` operates in $O(N)$ time and constant memory.',
      'Always check length equality first as an $O(1)$ early return guard.'
    ],
    interviewPerspective: {
      question: 'How do you handle Unicode characters (not just ASCII a-z) in the Anagram problem?',
      answer: 'Use a `HashMap<Character, Integer>` or an `int[65536]` array for Unicode codepoints, or use `s.codePoints()` with a map to support full 32-bit supplementary Unicode characters (emojis).',
      trap: '`int[26]` only works for English lowercase letters.'
    },
    practiceQuestions: [
      {
        question: 'Count the frequency of each character in a string and print characters that appear more than once.',
        hint: 'Use frequency array or Map.',
        solution: `int[] f = new int[256]; for(char c: s.toCharArray()) f[c]++; for(int i=0;i<256;i++) if(f[i]>1) System.out.println((char)i + ": " + f[i]);`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m5-t9-q1',
        type: 'mcq',
        prompt: 'What is the time complexity of verifying if a string of length $N$ is a palindrome using two pointers?',
        options: ['$O(N)$', '$O(N^2)$', '$O(\\log N)$', '$O(1)$'],
        correctAnswer: 0,
        explanation: 'Each character is compared at most once as pointers converge, taking linear $O(N)$ time.'
      }
    ]
  }
};
