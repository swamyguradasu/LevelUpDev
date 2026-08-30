import { PlacementCategory } from './placementPrepData';

export const DSA_PLACEMENT_CATEGORY: PlacementCategory = {
  id: 'dsa',
  cardNumber: '05',
  title: 'Data Structures & Algorithms (DSA)',
  shortTitle: 'DSA Mastery',
  tagline: 'Complexity, arrays, strings, searching, sorting, hashing, linked lists, stacks, queues, trees, heaps, graphs, greedy, DP, and interview patterns.',
  phaseId: 'core-technical',
  phaseName: 'Core Technical',
  iconName: 'Cpu',
  badge: 'Top Priority',
  estimatedHours: '120 Hours',
  importance: 'Critical',
  description: 'The core benchmark for technical selection across product-based and service-based tech firms. Master problem patterns, complexity bounds, traversal algorithms, and optimal data structure trade-offs.',
  targetMNCs: ['Amazon', 'Microsoft', 'Google', 'Flipkart', 'TCS Digital', 'Infosys SP/DSE', 'Accenture FSE', 'Adobe', 'Goldman Sachs'],
  levels: [
    // ==========================================
    // LEVEL 1 — COMPLEXITY & PROBLEM SOLVING
    // ==========================================
    {
      id: 'level-1-complexity-problem-solving',
      levelNumber: '01',
      title: 'Complexity & Problem Solving',
      shortDescription: 'Asymptotic notation, Big O time/space analysis, input constraints, and structured problem solving.',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'time-complexity',
          title: 'Time Complexity & Big O Notation',
          tagline: 'Growth rates, upper bounds, O(1) to O(N!), best/average/worst case analysis.',
          description: 'Evaluate how execution time scales with input size N, identifying performance bottlenecks and upper bounds.',
          topics: [
            {
              id: 'what-is-complexity-big-o',
              title: 'What is Complexity & Big O Notation',
              summary: 'Asymptotic analysis measuring operations count as input size N grows towards infinity.',
              whatYouWillLearn: 'Formal definition of Big O (upper bound), Big Omega (lower bound), and Big Theta (tight bound).',
              concept: 'Big O notation characterizes functions according to their growth rate: f(N) = O(g(N)) means there exist positive constants c and n0 such that 0 <= f(N) <= c*g(N) for all N >= n0.',
              whyItMatters: 'Every technical interview requires stating and proving the exact time complexity of your solution.',
              keyTakeaways: [
                'Drop lower-order terms: O(N^2 + 5N + 100) simplifies to O(N^2).',
                'Drop multiplicative constants: O(3N) simplifies to O(N).',
                'Focus on the dominant operations inside loops and recursive branches.',
              ],
            },
            {
              id: 'common-time-complexities',
              title: 'Hierarchy of Time Complexities: O(1) to O(N!)',
              summary: 'O(1) Constant < O(log N) < O(N) < O(N log N) < O(N^2) < O(2^N) < O(N!).',
              whatYouWillLearn: 'Recognizing complexity classes from code patterns: halving (log N), single loops (N), nested loops (N^2), subsets (2^N), permutations (N!).',
              concept: '10^8 operations per second is the golden benchmark for online test platforms (1-second time limit). An O(N^2) algorithm with N=10^5 will TLE (10^10 operations).',
              whyItMatters: 'Input constraints tell you the required algorithm before you write code (N <= 10^5 requires O(N) or O(N log N); N <= 20 allows O(2^N)).',
              keyTakeaways: [
                'O(1): Array indexing, Hash table lookup, Stack push/pop.',
                'O(log N): Binary search, balanced BST search, Euclidean GCD.',
                'O(N log N): Merge sort, Heap sort, Quick sort average.',
                'O(2^N) and O(N!): Brute-force subsets and permutations.',
              ],
            },
            {
              id: 'best-average-worst-cases',
              title: 'Best, Average & Worst Case Analysis',
              summary: 'Evaluating algorithmic performance across lucky, typical, and pathological inputs.',
              whatYouWillLearn: 'Why Linear Search is Best: O(1), Worst: O(N); QuickSort Average: O(N log N), Worst: O(N^2); Hash table Worst: O(N) on collisions.',
              concept: 'Worst-case analysis guarantees the algorithm will never exceed that bound. Average-case assumes uniform random distribution of inputs.',
              whyItMatters: 'Interviewers often ask: "What input triggers the worst-case time complexity in your approach?"',
              keyTakeaways: [
                'Always state average and worst case (e.g. QuickSort is O(N log N) average, O(N^2) worst on sorted array with first pivot).',
                'Hash maps provide O(1) average lookup, but O(N) worst-case when all keys collide into the same bucket.',
              ],
            },
          ],
        },
        {
          id: 'space-complexity',
          title: 'Space Complexity & Memory Analysis',
          tagline: 'Auxiliary memory, input space, call stack recursion depth, and heap allocations.',
          description: 'Measure memory usage: distinguishing auxiliary working memory from input array memory.',
          topics: [
            {
              id: 'auxiliary-vs-input-space',
              title: 'Auxiliary Space vs Total Space Complexity',
              summary: 'Auxiliary space is temporary working memory allocated by the algorithm, excluding the input.',
              whatYouWillLearn: 'Calculating call stack frame memory, dynamic arrays, hash table storage, and in-place O(1) space algorithms.',
              concept: 'Total Space = Input Space + Auxiliary Space. When interviewers ask for space complexity, they typically refer to Auxiliary Space.',
              whyItMatters: 'In-place algorithms (e.g. reversing an array in O(1) space) are preferred in resource-constrained environments.',
              keyTakeaways: [
                'Recursion depth of N levels consumes O(N) auxiliary stack space.',
                'Variables and pointers (e.g. int left = 0) consume O(1) auxiliary space.',
              ],
            },
          ],
        },
        {
          id: 'problem-solving-methodology',
          title: 'Structured Problem Solving & Edge Cases',
          tagline: 'Constraints analysis, brute force to optimal, dry runs, and edge cases.',
          description: 'A bulletproof 6-step framework for tackling any unseen coding interview challenge.',
          topics: [
            {
              id: 'constraints-brute-force-dry-run',
              title: 'Constraint Analysis, Dry Runs & Edge Cases',
              summary: 'Input limits (N <= 10^5), integer ranges (-10^9 to 10^9), empty arrays, duplicates, and negative numbers.',
              whatYouWillLearn: 'How input constraints dictate time complexity, dry-running code with pointer tables, and testing edge cases.',
              concept: 'Before writing code: 1. Clarify constraints. 2. State brute force. 3. Optimize with appropriate data structure. 4. Code cleanly. 5. Dry run sample case. 6. Test edge cases.',
              whyItMatters: 'Prevents getting stuck or writing buggy code under interview pressure.',
              keyTakeaways: [
                'Always test: Empty input, 1-element input, all identical elements, sorted/reverse sorted, negative values.',
                'Dry-run using a small table tracking variable values across loop iterations.',
              ],
            },
          ],
        },
      ],
    },

    // ==========================================
    // LEVEL 2 — ARRAYS
    // ==========================================
    {
      id: 'level-2-arrays',
      levelNumber: '02',
      title: 'Arrays',
      shortDescription: 'Contiguous memory, prefix sums, two pointers, sliding window, and high-frequency array problems.',
      estimatedHours: '12 Hours',
      concepts: [
        {
          id: 'array-basics-operations',
          title: 'Array Basics & Memory Layout',
          tagline: 'Contiguous memory, O(1) access by index, O(N) insertion/deletion, min/max, frequency arrays.',
          description: 'Master memory mechanics of fixed-size and dynamic arrays, pointer arithmetic, and linear traversals.',
          topics: [
            {
              id: 'array-traversal-manipulation',
              title: 'Array Traversal, Insertion, Deletion & Searching',
              summary: 'Index access O(1), linear search O(N), shifting elements on insert/delete O(N).',
              whatYouWillLearn: 'Memory address computation formula: Base_Address + Index * Element_Size.',
              concept: 'Arrays store elements in contiguous memory blocks. Instant O(1) random access is possible because the CPU computes memory addresses using direct indexing.',
              whyItMatters: 'The foundation for 50%+ of all coding interview challenges.',
              keyTakeaways: [
                'Direct index lookup is O(1); search in unsorted array is O(N).',
                'Inserting or deleting at the beginning/middle requires shifting elements, taking O(N) time.',
              ],
            },
          ],
        },
        {
          id: 'prefix-sum-technique',
          title: 'Prefix Sum & Range Queries',
          tagline: 'O(1) range sum queries after O(N) precomputation: prefix[R] - prefix[L-1].',
          description: 'Precompute cumulative sums to answer subarray sum queries in constant time.',
          topics: [
            {
              id: 'prefix-sum-range-sum',
              title: 'Prefix Sum & Range Sum Optimization',
              summary: 'prefix[i] = prefix[i-1] + arr[i]. Sum of subarray [L...R] = prefix[R] - prefix[L-1].',
              whatYouWillLearn: 'Building 1D and 2D prefix sum arrays and combining prefix sums with hash maps to find subarrays summing to K in O(N).',
              concept: 'Prefix sum trades O(N) preprocessing space/time to convert O(N) range queries into O(1) instant subtractions.',
              whyItMatters: 'Frequently used in subarray sum problems (e.g. Subarray Sum Equals K).',
              keyTakeaways: [
                'Initialize prefix array with size N+1 (with prefix[0] = 0) to handle queries starting at index 0 cleanly.',
                'Subarray sum equals K: store prefix sum frequencies in a Hash Map to find count in O(N).',
              ],
            },
          ],
        },
        {
          id: 'two-pointers-technique',
          title: 'Two Pointers Technique',
          tagline: 'Opposite-direction and same-direction pointer traversals on sorted arrays.',
          description: 'Reduce O(N^2) nested loops to O(N) linear time using convergent or divergent pointer pairs.',
          topics: [
            {
              id: 'left-right-two-pointers',
              title: 'Two Pointers (Left/Right Convergent Pointers)',
              summary: 'left = 0, right = n - 1. Move left/right based on sum comparison vs target.',
              whatYouWillLearn: 'Two Sum on sorted arrays, Container With Most Water, 3Sum, Trapping Rain Water, and Dutch National Flag.',
              concept: 'When an array is sorted, comparing elements at left and right boundaries gives a directional monotonic signal: if sum < target, increment left; if sum > target, decrement right.',
              whyItMatters: 'The single most widely used technique in technical coding rounds.',
              keyTakeaways: [
                'Requires sorted data (or properties where boundary decisions eliminate search space).',
                'Solves Two Sum II in O(N) time and O(1) space without Hash Map overhead.',
              ],
            },
          ],
        },
        {
          id: 'sliding-window-technique',
          title: 'Sliding Window Technique',
          tagline: 'Fixed-size and dynamically expanding/shrinking variable windows on contiguous subarrays.',
          description: 'Maintain running subarray state (sum, distinct character frequencies) in O(N) time.',
          topics: [
            {
              id: 'fixed-variable-sliding-window',
              title: 'Fixed & Variable Sliding Window',
              summary: 'Expand right pointer; shrink left pointer when window condition is violated.',
              whatYouWillLearn: 'Max sum subarray of size K (fixed), Longest substring without repeating characters (variable), Minimum size subarray sum.',
              concept: 'Instead of re-computing subarray metrics from scratch in O(K), sliding window adds the incoming element at `right` and subtracts the outgoing element at `left` in O(1).',
              whyItMatters: 'Transforms O(N * K) brute-force into O(N) linear time.',
              keyTakeaways: [
                'Each element is added to window once and removed at most once: total time is O(2N) = O(N).',
                'Use a frequency Hash Map or array alongside the window pointers.',
              ],
            },
          ],
        },
        {
          id: 'classic-array-problems',
          title: 'High-Frequency Array Problem Patterns',
          tagline: 'Two Sum, Kadane algorithm (max subarray), Move zeroes, Merge intervals, Rotate array.',
          description: 'Master canonical array problems that appear repeatedly in online assessments.',
          topics: [
            {
              id: 'kadane-intervals-rotation',
              title: 'Kadane Algorithm, Merge Intervals & Array Rotations',
              summary: 'Kadane algorithm for maximum subarray sum in O(N) time and O(1) space; Interval sorting & merging.',
              whatYouWillLearn: 'Deciding whether to extend the current running sum or start fresh: `current_sum = max(num, current_sum + num)`.',
              concept: 'Kadane algorithm uses local optimal decisions at each index to find global maximum contiguous subarray sum in linear time.',
              whyItMatters: 'Asked in almost every initial coding assessment.',
              keyTakeaways: [
                'Kadane algorithm handles all-negative arrays by tracking max single element.',
                'Merge intervals: sort by start time first, then merge overlapping boundaries in O(N log N).',
              ],
            },
          ],
        },
      ],
    },

    // ==========================================
    // LEVEL 3 — STRINGS
    // ==========================================
    {
      id: 'level-3-strings',
      levelNumber: '03',
      title: 'Strings',
      shortDescription: 'Immutability, character frequencies, palindromes, anagrams, substrings, and string algorithms.',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'string-basics-patterns',
          title: 'String Basics & Pattern Recognition',
          tagline: 'ASCII/Unicode values, immutability, palindrome verification, and anagram frequency vectors.',
          description: 'Manipulate characters, substrings, and frequency vectors in linear time.',
          topics: [
            {
              id: 'palindrome-anagram-frequencies',
              title: 'Palindromes, Anagrams & Character Counting',
              summary: 'Two-pointer palindrome check, 26-element frequency vector for anagram checks.',
              whatYouWillLearn: 'Checking valid palindromes ignoring alphanumeric characters and comparing frequency vectors in O(N) time.',
              concept: 'Two strings are anagrams if and only if their character counts are identical. Use fixed-size integer array of size 26 (`freq[char - "a"]++`) instead of hash map for maximum speed.',
              whyItMatters: 'Standard screening question in TCS, Infosys, and Capgemini.',
              keyTakeaways: [
                'Fixed frequency array `int freq[26]` consumes O(1) space and has faster cache locality than Hash Maps.',
                'Valid palindrome: two pointers moving inward comparing `s[left].lower() == s[right].lower()`.',
              ],
            },
          ],
        },
        {
          id: 'string-algorithms',
          title: 'String Algorithms & Substring Search',
          tagline: 'Two pointers, sliding window on strings, longest palindromic substring, and string hashing.',
          description: 'Solve complex substring, subsequence, and string matching problems.',
          topics: [
            {
              id: 'sliding-window-strings-hashing',
              title: 'Sliding Window on Strings & String Hashing Basics',
              summary: 'Longest substring without repeating characters, minimum window substring, polynomial rolling hash.',
              whatYouWillLearn: 'Tracking character frequencies inside a dynamic sliding window and understanding rolling hash (Rabin-Karp).',
              concept: 'Rolling hash calculates hash value of consecutive substrings of length M in O(1) time using polynomial modulo math.',
              whyItMatters: 'Appears in Tier-1 technical rounds (Amazon, Microsoft).',
              keyTakeaways: [
                'Longest Substring Without Repeating Characters: track last seen index of each character.',
                'Minimum Window Substring: track `have` vs `need` distinct match count.',
              ],
            },
          ],
        },
      ],
    },

    // ==========================================
    // LEVEL 4 — SEARCHING & SORTING
    // ==========================================
    {
      id: 'level-4-searching-sorting',
      levelNumber: '04',
      title: 'Searching & Sorting',
      shortDescription: 'Binary search variants, search space reduction, Merge Sort, Quick Sort, and custom comparators.',
      estimatedHours: '10 Hours',
      concepts: [
        {
          id: 'binary-search-mastery',
          title: 'Binary Search & Search Space Reduction',
          tagline: 'O(log N) search on sorted arrays, lower/upper bounds, rotated arrays, and binary search on answer.',
          description: 'Master halving search spaces: finding exact values, first/last occurrences, and monotonic predicate functions.',
          topics: [
            {
              id: 'binary-search-boundaries-on-answer',
              title: 'Binary Search Boundaries & Binary Search on Answer',
              summary: 'low + (high - low) / 2 to prevent overflow; lower bound, upper bound, and monotonic condition functions.',
              whatYouWillLearn: 'Formulating binary search as a monotonic boolean function `isValid(mid)` across a range [min_ans, max_ans].',
              concept: 'Binary search applies whenever the search space exhibits monotonicity (e.g. FFFTTT). "Binary search on answer" finds the minimum/maximum valid threshold in O(log(Range) * checkTime).',
              whyItMatters: 'Binary search on answer is one of the highest-frequency patterns in high-package online tests (e.g. Koko Eating Bananas, Book Allocation).',
              keyTakeaways: [
                'Always use `mid = low + (high - low) // 2` to prevent 32-bit integer overflow.',
                'Search in Rotated Sorted Array: at least one half [low...mid] or [mid...high] is strictly sorted; use that to prune half the space.',
              ],
            },
          ],
        },
        {
          id: 'sorting-algorithms-applications',
          title: 'Sorting Algorithms & Applications',
          tagline: 'Merge Sort, Quick Sort, stability, custom comparators, interval sorting, and Greedy combinations.',
          description: 'Understand divide-and-conquer sorting, worst-case trade-offs, and custom sorting predicates.',
          topics: [
            {
              id: 'merge-quick-custom-sorting',
              title: 'Merge Sort, Quick Sort & Custom Comparators',
              summary: 'Merge sort O(N log N) stable; Quick sort O(N log N) in-place; custom comparator lambdas.',
              whatYouWillLearn: 'Merge sort recursion and merge step; QuickSort partition scheme; sorting objects by multiple criteria.',
              concept: 'Merge sort divides array in half recursively, then merges two sorted halves in O(N). Quick sort picks a pivot and partitions elements <= pivot to left and > pivot to right.',
              whyItMatters: 'Classic interview questions on algorithm stability, cache efficiency, and custom interval ordering.',
              keyTakeaways: [
                'Merge sort requires O(N) auxiliary space; Quick sort requires O(log N) stack space.',
                'Custom sort in Python: `arr.sort(key=lambda x: (x.start, -x.end))`.',
              ],
            },
          ],
        },
      ],
    },

    // ==========================================
    // LEVEL 5 — HASHING
    // ==========================================
    {
      id: 'level-5-hashing',
      levelNumber: '05',
      title: 'Hashing',
      shortDescription: 'Hash tables, collision resolution, frequency counting, duplicate detection, and subarray sum problems.',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'hash-maps-sets-mechanics',
          title: 'Hash Maps, Sets & Collision Mechanics',
          tagline: 'O(1) average lookup, hash functions, separate chaining vs open addressing, load factor.',
          description: 'Understand internal hash table mechanics, bucket arrays, and hash collisions.',
          topics: [
            {
              id: 'hash-map-internals-lookups',
              title: 'Hash Map Internals & Lookup Optimization',
              summary: 'Hash function maps keys to array index. Collision resolution: Chaining (linked lists/trees) vs Open Addressing.',
              whatYouWillLearn: 'Why hash map lookups are O(1) average but degrade to O(N) under heavy collisions.',
              concept: 'Hash tables calculate `bucket = hash(key) % capacity`. When two keys map to the same bucket, separate chaining stores them in a linked list or balanced red-black tree (Java 8+).',
              whyItMatters: 'Standard conceptual technical question asked in all MNC interviews.',
              keyTakeaways: [
                'Load factor = (Number of elements) / (Bucket count). Exceeding threshold (e.g. 0.75) triggers dynamic rehashing (resizing).',
                'Keys must be immutable to ensure their hash code never changes after insertion.',
              ],
            },
          ],
        },
        {
          id: 'hashing-problems-patterns',
          title: 'Classic Hashing Problems',
          tagline: 'Two Sum in O(N), Longest Consecutive Sequence, Subarray Sum Equals K, Group Anagrams.',
          description: 'Leverage hash lookups to trade O(N) space for dramatic time complexity reduction.',
          topics: [
            {
              id: 'two-sum-consecutive-sequence',
              title: 'Two Sum, Subarray Sums & Longest Consecutive Sequence',
              summary: 'Store complements in hash map; Longest consecutive sequence in O(N) using Hash Set.',
              whatYouWillLearn: 'Two Sum complement lookup `target - num` in O(1); finding sequence starts `if (num - 1) not in num_set`.',
              concept: 'Hash set checks allow verifying sequence continuity in O(N) total time by only starting iteration from the minimum element of each streak.',
              whyItMatters: 'Among the top 5 most frequently tested coding problems across all companies.',
              keyTakeaways: [
                'Two Sum: store `{num: index}` mapping as you iterate through array.',
                'Subarray sum equals K: store `{prefix_sum: frequency}` map; look for `prefix_sum - K`.',
              ],
            },
          ],
        },
      ],
    },

    // ==========================================
    // LEVEL 6 — LINKED LIST
    // ==========================================
    {
      id: 'level-6-linked-list',
      levelNumber: '06',
      title: 'Linked List',
      shortDescription: 'Node pointers, Singly & Doubly linked lists, pointer reversal, Floyd cycle detection, and merge operations.',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'singly-doubly-linked-list',
          title: 'Singly & Doubly Linked List Mechanics',
          tagline: 'Node memory allocations, pointer navigation, head/tail pointers, Sentinel Dummy nodes.',
          description: 'Construct node chains, perform pointer updates, and handle boundary conditions with dummy heads.',
          topics: [
            {
              id: 'linked-list-traversal-manipulation',
              title: 'Linked List Traversal, Insertion & Dummy Nodes',
              summary: 'Node(val, next). Using dummy head `dummy = ListNode(0, head)` to eliminate edge cases.',
              whatYouWillLearn: 'Why linked lists allow O(1) insertion/deletion at known nodes but require O(N) sequential search.',
              concept: 'Linked list nodes are non-contiguous objects in heap memory connected by pointer references. A Dummy node simplifies insertions and deletions at the head.',
              whyItMatters: 'Pointer manipulation tests candidate precision and memory hygiene.',
              keyTakeaways: [
                'Always use a Dummy Node when modifying the head of a linked list.',
                'Never lose the reference to `curr.next` before overwriting pointer links.',
              ],
            },
          ],
        },
        {
          id: 'linked-list-techniques',
          title: 'Core Linked List Techniques',
          tagline: 'Iterative & recursive reversal, Fast & Slow pointers (Floyd cycle detection), Middle node, Merge sorted lists.',
          description: 'Master standard two-pointer techniques on linked structures.',
          topics: [
            {
              id: 'reverse-fast-slow-cycle',
              title: 'Reverse Linked List & Fast/Slow Pointer (Tortoise & Hare)',
              summary: 'In-place pointer reversal: prev, curr, next_node; Floyd cycle detection (slow 1 step, fast 2 steps).',
              whatYouWillLearn: 'Reversing a linked list in O(N) time and O(1) space; finding the start of a cycle using math proof.',
              concept: 'Fast & Slow pointers: if a cycle exists, fast pointer will catch up to slow pointer inside the cycle loop. Meeting point + resetting one pointer to head gives cycle start.',
              whyItMatters: 'Asked in 90%+ of technical interviews involving linked structures.',
              keyTakeaways: [
                'Reversal: `next_temp = curr.next; curr.next = prev; prev = curr; curr = next_temp`.',
                'Find middle: when fast reaches end, slow is exactly at the middle node.',
              ],
            },
          ],
        },
      ],
    },

    // ==========================================
    // LEVEL 7 — STACK & QUEUE
    // ==========================================
    {
      id: 'level-7-stack-queue',
      levelNumber: '07',
      title: 'Stack & Queue',
      shortDescription: 'LIFO & FIFO mechanics, matching parentheses, monotonic stacks, circular queues, and priority queues.',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'stack-mechanics-monotonic',
          title: 'Stack & Monotonic Stack',
          tagline: 'Last-In-First-Out (LIFO), valid parentheses, Next Greater Element, Largest Rectangle in Histogram.',
          description: 'Master stack evaluation, expression parsing, and monotonic increasing/decreasing stacks.',
          topics: [
            {
              id: 'stack-parentheses-monotonic',
              title: 'Valid Parentheses & Monotonic Stack Pattern',
              summary: 'LIFO push/pop; Monotonic stack maintains elements in strictly increasing or decreasing order in O(N).',
              whatYouWillLearn: 'Solving Next Greater Element, Daily Temperatures, and Largest Rectangle in Histogram in linear time.',
              concept: 'Monotonic stack maintains elements in sorted order by popping smaller/larger elements before pushing. Each element is pushed and popped at most once: total time is O(N).',
              whyItMatters: 'Monotonic stack transforms O(N^2) span searches into O(N) linear time.',
              keyTakeaways: [
                'Matching parentheses: push opening brackets to stack; pop and match on closing bracket.',
                'Next Greater Element: maintain a monotonically decreasing stack of indices.',
              ],
            },
          ],
        },
        {
          id: 'queue-deque-priority',
          title: 'Queue, Deque & Priority Queue',
          tagline: 'First-In-First-Out (FIFO), BFS queue, double-ended queue, and heap-based priority queues.',
          description: 'Implement FIFO queues, circular buffers, sliding window max with Deque, and Min/Max heaps.',
          topics: [
            {
              id: 'queue-deque-sliding-window-max',
              title: 'Queue, Deque & Sliding Window Maximum',
              summary: 'Queue FIFO for BFS; collections.deque in Python; Monotonic Deque for Sliding Window Maximum in O(N).',
              whatYouWillLearn: 'Using Deques for O(1) push/pop at both ends and implementing Sliding Window Maximum.',
              concept: 'A Monotonic Deque stores candidate maximums in decreasing order, popping elements outside the current window from the front and smaller elements from the back.',
              whyItMatters: 'Standard hard interview problem (Sliding Window Maximum).',
              keyTakeaways: [
                'In Python: use `collections.deque` (O(1) append/popleft), never `list.pop(0)` (which is O(N)).',
                'Priority Queue orders elements by priority (implemented via Min/Max Binary Heap).',
              ],
            },
          ],
        },
      ],
    },

    // ==========================================
    // LEVEL 8 — RECURSION & BACKTRACKING
    // ==========================================
    {
      id: 'level-8-recursion-backtracking',
      levelNumber: '08',
      title: 'Recursion & Backtracking',
      shortDescription: 'State space trees, Choose-Explore-Undo paradigm, subsets, permutations, combinations, and N-Queens.',
      estimatedHours: '10 Hours',
      concepts: [
        {
          id: 'recursion-state-trees',
          title: 'Recursion & State Space Trees',
          tagline: 'Base cases, recursive transitions, call stack frames, and tracing decision trees.',
          description: 'Visualize recursive state trees and calculate time complexity using branch factor^depth.',
          topics: [
            {
              id: 'recursion-tree-analysis',
              title: 'Recursion State Space Trees & Branching Factor',
              summary: 'Time complexity = O(Branching_Factor ^ Depth). Tracing recursive execution paths.',
              whatYouWillLearn: 'Drawing decision trees for recursive calls and avoiding redundant state re-computations.',
              concept: 'Recursion breaks problems into smaller subproblems. Each recursive call represents a node in the state space tree; the call stack executes depth-first.',
              whyItMatters: 'Prerequisite for Backtracking, Tree traversals, and Dynamic Programming.',
              keyTakeaways: [
                'A recursive function without base cases crashes with StackOverflow.',
                'Binary branching with depth N takes O(2^N) time.',
              ],
            },
          ],
        },
        {
          id: 'backtracking-pattern',
          title: 'Backtracking (Choose-Explore-Undo)',
          tagline: 'Exhaustive combinatorial search: Subsets, Permutations, Combinations, Sudoku Solver, N-Queens.',
          description: 'Systematically explore all valid configurations by making a choice, exploring deeper, and reverting the choice.',
          topics: [
            {
              id: 'choose-explore-undo-framework',
              title: 'The Choose-Explore-Undo Backtracking Framework',
              summary: '1. Choose an option. 2. Recurse (explore). 3. Undo the choice (backtrack state).',
              whatYouWillLearn: 'Generating Subsets (2^N), Permutations (N!), Combination Sum, and pruning invalid branches early.',
              concept: 'Backtracking is depth-first search on a decision tree with pruning: when a branch violates constraints, it immediately backtracks without exploring invalid subtrees.',
              whyItMatters: 'Standard Tier-1 and product MNC interview round topic.',
              keyTakeaways: [
                'Always undo modifications to mutable state (e.g. `path.pop()`) after the recursive call returns.',
                'Sort input array first to handle duplicate elements cleanly (`if i > start and nums[i] == nums[i-1]: continue`).',
              ],
            },
          ],
        },
      ],
    },

    // ==========================================
    // LEVEL 9 — TREES
    // ==========================================
    {
      id: 'level-9-trees',
      levelNumber: '09',
      title: 'Trees',
      shortDescription: 'Binary trees, traversals (Pre/In/Post/Level), Binary Search Trees (BST), LCA, and balanced tree properties.',
      estimatedHours: '12 Hours',
      concepts: [
        {
          id: 'binary-tree-traversals',
          title: 'Binary Tree Structure & Traversals',
          tagline: 'Node(val, left, right), Preorder, Inorder, Postorder (DFS) and Level-order (BFS).',
          description: 'Master recursive and iterative tree traversals and structural properties (height, diameter).',
          topics: [
            {
              id: 'dfs-bfs-tree-traversals',
              title: 'DFS (Preorder, Inorder, Postorder) & BFS (Level-Order)',
              summary: 'Preorder: Root-L-R; Inorder: L-Root-R; Postorder: L-R-Root; Level-Order: Queue BFS.',
              whatYouWillLearn: 'Recursive and iterative tree traversals and computing tree height, max depth, and diameter.',
              concept: 'DFS uses the call stack or an explicit stack. BFS uses a FIFO Queue to visit nodes level-by-level.',
              whyItMatters: 'Trees are evaluated in 80%+ of technical whiteboard rounds.',
              keyTakeaways: [
                'Inorder traversal of a BST yields strictly sorted ascending order.',
                'Level-order traversal: process all nodes at `len(queue)` inside a loop per level.',
              ],
            },
          ],
        },
        {
          id: 'binary-search-tree-lca',
          title: 'Binary Search Tree (BST) & Tree Problems',
          tagline: 'BST property (left < root < right), O(log N) search/insert/delete, Lowest Common Ancestor (LCA).',
          description: 'Leverage sorted BST properties to achieve O(H) search, validation, and LCA lookups.',
          topics: [
            {
              id: 'bst-validation-lca',
              title: 'BST Properties, Validation & Lowest Common Ancestor (LCA)',
              summary: 'Validate BST with bounds (min_val < node.val < max_val); LCA in Binary Tree vs BST.',
              whatYouWillLearn: 'Finding Lowest Common Ancestor in O(N) time and validating BST invariants.',
              concept: 'In a BST: if both nodes p and q are smaller than root, LCA is in left subtree; if both are larger, LCA is in right subtree; otherwise root is the LCA split point.',
              whyItMatters: 'Top-tier interview question asked by Microsoft, Amazon, and Adobe.',
              keyTakeaways: [
                'Validating BST: pass valid range `(low, high)` down recursively, not just checking immediate children.',
                'LCA in Binary Tree: if current node is p or q, return current; if left and right both return non-null, current is LCA.',
              ],
            },
          ],
        },
      ],
    },

    // ==========================================
    // LEVEL 10 — HEAPS
    // ==========================================
    {
      id: 'level-10-heaps',
      levelNumber: '10',
      title: 'Heaps & Priority Queues',
      shortDescription: 'Min/Max binary heaps, heapify in O(N), Top K elements, Kth largest, and merging K sorted lists.',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'heap-mechanics-operations',
          title: 'Heap Mechanics & Operations',
          tagline: 'Complete binary tree, array representation (2i+1, 2i+2), O(log N) insert/delete, O(N) heapify.',
          description: 'Understand array-backed binary heaps, bubble-up/sift-down operations, and heapq in Python.',
          topics: [
            {
              id: 'min-max-heap-heapify',
              title: 'Min Heap, Max Heap & Heapify Mechanics',
              summary: 'Min heap root is smallest; Max heap root is largest. heapq in Python implements Min Heap by default.',
              whatYouWillLearn: 'Array indexing for parent `(i-1)//2` and children `2i+1, 2i+2`, building a heap in O(N) time.',
              concept: 'A Binary Heap is a complete binary tree where parent is always smaller than (or equal to) children. `heapq.heapify()` builds a heap in O(N) time using bottom-up sift-down.',
              whyItMatters: 'Essential data structure for continuous priority scheduling and streaming medians.',
              keyTakeaways: [
                'In Python, `heapq` is a Min Heap. For Max Heap, insert negated values `-x`.',
                '`heapq.heappush()` and `heapq.heappop()` are O(log N). Accessing min element `heap[0]` is O(1).',
              ],
            },
          ],
        },
        {
          id: 'heap-applications-top-k',
          title: 'Heap Applications & Top K Elements',
          tagline: 'Kth largest element in O(N log K), Top K Frequent Elements, Merge K Sorted Lists, Find Median from Data Stream.',
          description: 'Use fixed-size heaps of size K to solve streaming selection and ranking problems.',
          topics: [
            {
              id: 'top-k-merge-k-sorted',
              title: 'Top K Elements & Merge K Sorted Lists',
              summary: 'Maintain Min Heap of size K to find Kth largest in O(N log K) time and O(K) space.',
              whatYouWillLearn: 'Why a Min Heap of size K is superior to sorting the entire array in O(N log N).',
              concept: 'To find K largest elements: maintain a Min Heap of size K. Push new elements; if heap size > K, pop the smallest. At the end, the heap contains the K largest elements.',
              whyItMatters: 'Extremely popular interview question at Amazon, Google, and Goldman Sachs.',
              keyTakeaways: [
                'Kth Largest: use Min Heap of size K (root is Kth largest).',
                'Kth Smallest: use Max Heap of size K (root is Kth smallest).',
              ],
            },
          ],
        },
      ],
    },

    // ==========================================
    // LEVEL 11 — GRAPHS
    // ==========================================
    {
      id: 'level-11-graphs',
      levelNumber: '11',
      title: 'Graphs',
      shortDescription: 'Adjacency list, BFS, DFS, shortest path, Dijkstra, Topological Sort, cycle detection, and Union-Find.',
      estimatedHours: '14 Hours',
      concepts: [
        {
          id: 'graph-representations-traversals',
          title: 'Graph Representations, BFS & DFS',
          tagline: 'Adjacency list vs matrix, BFS (Queue) for shortest unweighted path, DFS (Recursion) for components.',
          description: 'Model real-world networks as vertices and edges; traverse graphs without infinite cycles.',
          topics: [
            {
              id: 'graph-representation-bfs-dfs',
              title: 'Graph Representations & BFS / DFS Traversals',
              summary: 'Adjacency list `adj = defaultdict(list)`, visited set to avoid cycles, connected components.',
              whatYouWillLearn: 'Building graphs from edge lists, BFS shortest path on unweighted graphs, and DFS connected component counting (Number of Islands).',
              concept: 'Graphs consist of Vertices (V) and Edges (E). BFS explores level-by-level using a Queue, guaranteeing shortest path in unweighted graphs. DFS explores deep along branches.',
              whyItMatters: 'High-frequency topic in advanced rounds of top tech MNCs.',
              keyTakeaways: [
                'Time complexity of BFS/DFS on adjacency list is O(V + E).',
                'Always mark a node as visited immediately when pushing to BFS queue to prevent duplicate entries.',
              ],
            },
          ],
        },
        {
          id: 'advanced-graph-algorithms',
          title: 'Advanced Graph Algorithms',
          tagline: 'Dijkstra (Shortest path with weights), Topological Sort (Kahn algorithm), Cycle Detection, Union-Find (DSU).',
          description: 'Solve weighted shortest paths, dependency resolution (DAGs), and dynamic network connectivity.',
          topics: [
            {
              id: 'dijkstra-toposort-unionfind',
              title: 'Dijkstra, Topological Sort & Disjoint Set Union (DSU)',
              summary: 'Dijkstra O((V + E) log V) with Min Heap; Kahn algorithm for Topo Sort (Course Schedule); DSU with path compression.',
              whatYouWillLearn: 'When to apply Dijkstra vs BFS, detecting cycles in directed graphs (in-degree 0 Kahn algorithm), and DSU for connected components.',
              concept: 'Topological Sort orders vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, u comes before v. DSU tracks disjoint sets with near O(1) find/union operations.',
              whyItMatters: 'Distinguishes high-package candidates in Tier-1 technical rounds.',
              keyTakeaways: [
                'Dijkstra does NOT work with negative edge weights (use Bellman-Ford for negative weights).',
                'Topological Sort fails (contains cycles) if the count of visited nodes < total vertices V.',
              ],
            },
          ],
        },
      ],
    },

    // ==========================================
    // LEVEL 12 — GREEDY
    // ==========================================
    {
      id: 'level-12-greedy',
      levelNumber: '12',
      title: 'Greedy Algorithms',
      shortDescription: 'Locally optimal choices, activity selection, interval scheduling, fractional knapsack, and jump game.',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'greedy-strategy-applications',
          title: 'Greedy Strategy & Interval Scheduling',
          tagline: 'Greedy choice property, optimal substructure, interval scheduling (sort by end time), Fractional Knapsack.',
          description: 'Make locally optimal choices at each step that lead to a globally optimal solution.',
          topics: [
            {
              id: 'interval-scheduling-jump-game',
              title: 'Interval Scheduling, Fractional Knapsack & Jump Game',
              summary: 'Activity selection: sort by end time; Fractional Knapsack: sort by value/weight ratio; Jump Game: track max reachable index.',
              whatYouWillLearn: 'Proving greedy correctness vs when greedy fails and requires Dynamic Programming (e.g. 0/1 Knapsack).',
              concept: 'A greedy algorithm makes the best choice available right now without reconsidering past decisions. It works only if the problem has optimal substructure and the greedy-choice property.',
              whyItMatters: 'Tests candidate intuition for optimization without full DP tables.',
              keyTakeaways: [
                'Activity Selection / Non-overlapping intervals: ALWAYS sort intervals by END time `x[1]`.',
                'If fractional splitting is allowed: Greedy works (Fractional Knapsack). If discrete binary choice: DP is required (0/1 Knapsack).',
              ],
            },
          ],
        },
      ],
    },

    // ==========================================
    // LEVEL 13 — DYNAMIC PROGRAMMING (ADVANCED)
    // ==========================================
    {
      id: 'level-13-dynamic-programming',
      levelNumber: '13',
      title: 'Dynamic Programming (Advanced)',
      shortDescription: 'Clearly marked as Advanced. Overlapping subproblems, memoization vs tabulation, 1D/2D DP, 0/1 Knapsack, and LCS/LIS.',
      estimatedHours: '16 Hours',
      concepts: [
        {
          id: 'dp-foundations-1d',
          title: 'DP Foundations & 1D State Transitions',
          tagline: 'Top-down memoization vs Bottom-up tabulation, Fibonacci, Climbing Stairs, House Robber, Coin Change.',
          description: 'Identify overlapping subproblems and optimal substructure; convert exponential recursion to linear DP.',
          topics: [
            {
              id: 'memoization-tabulation-1d',
              title: 'Memoization vs Tabulation & 1D DP Patterns',
              summary: 'Memoization (Top-down recursion + cache) vs Tabulation (Bottom-up iterative table). Space optimization to O(1).',
              whatYouWillLearn: 'Formulating recurrence relations: `dp[i] = max(dp[i-1], dp[i-2] + val)` in House Robber; Coin Change minimum coin counts.',
              concept: 'Dynamic Programming solves problems by combining solutions to subproblems. Overlapping subproblems mean the same state is visited repeatedly; caching state results reduces O(2^N) to O(N).',
              whyItMatters: 'Distinguishes standard developers from high-bracket Tier-1 candidates.',
              keyTakeaways: [
                'Step 1: Define state (e.g. `dp[i]` = max profit up to index i).',
                'Step 2: Derive transition formula from previous subproblems.',
                'Step 3: Identify base cases (e.g. `dp[0] = 0`).',
              ],
            },
          ],
        },
        {
          id: '2d-dp-knapsack-subsequences',
          title: '2D DP, Knapsack & Subsequence Problems',
          tagline: 'Grid unique paths, 0/1 Knapsack (weight vs value), Longest Common Subsequence (LCS), Longest Increasing Subsequence (LIS).',
          description: 'Solve multi-variable state spaces, string alignment matrices, and subset sum partitions.',
          topics: [
            {
              id: 'grid-knapsack-lcs-lis',
              title: '2D Grid Paths, 0/1 Knapsack & LCS / LIS',
              summary: 'Grid paths `dp[r][c] = dp[r-1][c] + dp[r][c-1]`; 0/1 Knapsack table; LCS string matrix comparison.',
              whatYouWillLearn: 'Constructing 2D DP matrices for string matching and subset sum feasibility.',
              concept: 'In 2D DP, state represents two independent dimensions (e.g. `dp[i][w]` = max value using first `i` items with capacity `w`). In LCS: if `s1[i] == s2[j]`, `dp[i][j] = 1 + dp[i-1][j-1]`.',
              whyItMatters: 'Standard hard DP problems asked in final rounds of top product firms.',
              keyTakeaways: [
                '0/1 Knapsack: decision at item i is either INCLUDE (gain value, reduce capacity) or EXCLUDE.',
                'Space optimize 2D DP to 1D when `dp[i]` only depends on previous row `dp[i-1]`.',
              ],
            },
          ],
        },
      ],
    },

    // ==========================================
    // LEVEL 14 — INTERVIEW PROBLEM PATTERNS
    // ==========================================
    {
      id: 'level-14-interview-problem-patterns',
      levelNumber: '14',
      title: 'Interview Problem Patterns',
      shortDescription: 'Master pattern recognition across Two Pointers, Sliding Window, Fast/Slow, Binary Search, Monotonic Stack, BFS/DFS, and DP.',
      estimatedHours: '12 Hours',
      concepts: [
        {
          id: 'pattern-recognition-framework',
          title: 'The 13 Core Coding Patterns Framework',
          tagline: 'What is the pattern? When should I recognize it? What type of problems use it?',
          description: 'A comprehensive pattern cheat sheet linking problem descriptions to optimal algorithmic templates.',
          topics: [
            {
              id: 'pointers-window-search-patterns',
              title: 'Two Pointers, Sliding Window & Binary Search Patterns',
              summary: 'Pattern recognition blueprints for linear, contiguous, and halving search problems.',
              whatYouWillLearn: 'Exact signals in problem statements that indicate Two Pointers, Sliding Window, or Binary Search.',
              concept: '1. Two Pointers: Sorted array + finding pairs/triplets or partitioning. 2. Sliding Window: Contiguous subarray/substring + min/max/distinct constraint. 3. Binary Search: Monotonic search space or finding min/max threshold ("Binary search on answer").',
              whyItMatters: 'Enables instant pattern identification during 45-minute live whiteboard interviews.',
              keyTakeaways: [
                'Keywords: "contiguous subarray of size K" -> Sliding Window.',
                'Keywords: "sorted array and find pair" -> Two Pointers.',
                'Keywords: "minimize the maximum value" -> Binary Search on Answer.',
              ],
            },
            {
              id: 'data-structure-graph-dp-patterns',
              title: 'Stack, Heap, BFS/DFS, Backtracking & DP Patterns',
              summary: 'Pattern blueprints for Monotonic Stacks, Top K Heaps, Shortest Path BFS, and Overlapping DP.',
              whatYouWillLearn: 'When to choose Monotonic Stack (next greater), Heap (Kth element in stream), BFS (shortest path), DFS (tree traversal), Backtracking (generate all), DP (count ways / min cost).',
              concept: '4. Fast/Slow Pointers: Cycle detection or middle of list. 5. Monotonic Stack: Next/previous greater element. 6. Top K (Heap): Streaming elements or K largest. 7. BFS: Shortest unweighted path or level order. 8. Backtracking: "Find all combinations/permutations". 9. DP: "Number of ways" or "Min/max cost to reach target".',
              whyItMatters: 'Transforms unstructured problem descriptions into deterministic solutions.',
              keyTakeaways: [
                'Keywords: "next greater element" -> Monotonic Stack.',
                'Keywords: "shortest path in matrix/unweighted graph" -> BFS Queue.',
                'Keywords: "find all possible subsets / permutations" -> Backtracking.',
                'Keywords: "count the total number of distinct ways to achieve X" -> Dynamic Programming.',
              ],
            },
          ],
        },
      ],
    },
  ],
};
