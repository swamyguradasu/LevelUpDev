export interface TopicPracticeItem {
  question: string;
  hint?: string;
  solution: string;
}

export interface CheckpointQuestion {
  id: string;
  type: 'mcq' | 'output' | 'debugging' | 'short-code';
  prompt: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

export type JavaVisualizerType =
  | 'memory-box'
  | 'decision-tree'
  | 'loop-cycle'
  | 'array-index'
  | 'method-stack'
  | 'exception-flow'
  | 'jvm-architecture'
  | 'none';

export interface JavaTopicDetail {
  id: string;
  moduleId: string;
  topicNumber: number;
  title: string;
  shortSummary: string;
  whatIsIt: string;
  whyDoWeNeedIt: string;
  syntax: string;
  basicExample: {
    code: string;
    output: string;
  };
  detailedExample: {
    code: string;
    output: string;
  };
  codeExplanation: string[];
  visualExplanation: {
    title: string;
    description: string;
    asciiDiagram?: string;
    steps?: string[];
  };
  visualizerType?: JavaVisualizerType;
  commonMistakes: Array<{
    mistake: string;
    whyItIsWrong: string;
    correction: string;
  }>;
  importantRules: string[];
  interviewPerspective: {
    question: string;
    answer: string;
    trap?: string;
  };
  practiceQuestions: TopicPracticeItem[];
  checkpoint: CheckpointQuestion[];
}

export const JAVA_TOPICS_CATALOG: Record<string, JavaTopicDetail> = {
  // ==========================================
  // MODULE 1: Java Basics (7 Topics)
  // ==========================================
  'what-is-java': {
    id: 'what-is-java',
    moduleId: 'm1',
    topicNumber: 1,
    title: 'What is Java?',
    shortSummary: 'Overview of Java: platform independence, Write Once Run Anywhere (WORA), and core object-oriented principles.',
    whatIsIt: 'Java is a robust, high-level, class-based, object-oriented programming language created by Sun Microsystems (now Oracle) in 1995. Its core philosophy is "Write Once, Run Anywhere" (WORA), meaning compiled Java code runs on all platforms that support Java without recompilation.',
    whyDoWeNeedIt: 'Java powers over 3 billion devices globally. It is the backbone of enterprise backends (Spring Boot), Android mobile development, high-frequency banking systems, big data engines (Apache Spark, Kafka), and cloud microservices due to its security, memory safety, and high performance.',
    syntax: `// Standard Java Class Boilerplate
public class Main {
    public static void main(String[] args) {
        // Your code starts executing here
    }
}`,
    basicExample: {
      code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java World!");
    }
}`,
      output: `Hello, Java World!`
    },
    detailedExample: {
      code: `public class JavaPhilosophy {
    public static void main(String[] args) {
        String language = "Java";
        String creator = "James Gosling";
        int releaseYear = 1995;
        
        System.out.println("Language: " + language);
        System.out.println("Created By: " + creator);
        System.out.println("Released In: " + releaseYear);
        System.out.println("Philosophy: Write Once, Run Anywhere (WORA)");
    }
}`,
      output: `Language: Java
Created By: James Gosling
Released In: 1995
Philosophy: Write Once, Run Anywhere (WORA)`
    },
    codeExplanation: [
      'public class JavaPhilosophy: Defines a public blueprint named JavaPhilosophy. In Java, all code lives inside classes.',
      'public static void main(String[] args): The entry point of every Java application executed by the JVM.',
      'System.out.println(): Standard output stream method that prints text followed by a new line.'
    ],
    visualExplanation: {
      title: 'Write Once, Run Anywhere (WORA) Pipeline',
      description: 'Java source code (.java) compiles into bytecode (.class), which runs on any JVM regardless of OS.',
      asciiDiagram: `[ Source Code: App.java ]
           ↓ (javac compiler)
[ Bytecode: App.class (Universal) ]
           ↓
   ┌───────┼───────┐
   ↓       ↓       ↓
[Windows] [macOS] [Linux]
 (JVM)     (JVM)   (JVM)`
    },
    visualizerType: 'jvm-architecture',
    commonMistakes: [
      {
        mistake: 'Naming the source file differently from the public class name.',
        whyItIsWrong: 'Java requires the filename to match the public class name exactly (case-sensitive).',
        correction: 'If class is \`public class App\`, file must be named \`App.java\`.'
      },
      {
        mistake: 'Confusing Java with JavaScript.',
        whyItIsWrong: 'Java is a compiled, statically typed OOP language for backends/systems. JavaScript is an interpreted, dynamically typed scripting language primarily for web browsers.',
        correction: 'Remember: Java is to JavaScript as Car is to Carpet.'
      }
    ],
    importantRules: [
      'Java is strictly case-sensitive.',
      'Every Java application must have at least one class and a main method to execute.',
      'The file name must match the name of the public class inside it.'
    ],
    interviewPerspective: {
      question: 'Why is Java platform independent, but the JVM is platform dependent?',
      answer: 'Java source compiles into universal bytecode (.class) which is identical on all operating systems. However, each operating system requires its own specific JVM implementation to translate that universal bytecode into native OS machine instructions.',
      trap: 'Do not claim JVM is platform independent. The bytecode is independent, but JVM binaries are OS-specific.'
    },
    practiceQuestions: [
      {
        question: 'State 3 key differences between Java and C++ regarding memory management and portability.',
        hint: 'Think about pointers, garbage collection, and compilation targets.',
        solution: '1) Java uses automatic Garbage Collection; C++ requires manual memory management (delete/free). 2) Java compiles to bytecode for JVM (platform-independent); C++ compiles directly to native OS machine code. 3) Java does not support direct memory pointers.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m1-t1-q1',
        type: 'mcq',
        prompt: 'What enables Java to achieve platform independence ("Write Once, Run Anywhere")?',
        options: [
          'Direct compilation to machine code',
          'Universal bytecode executed by platform-specific JVMs',
          'Automatic translation to JavaScript in browsers',
          'Running entirely inside the CPU cache'
        ],
        correctAnswer: 1,
        explanation: 'The Java compiler produces platform-independent bytecode (.class files), which the JVM on any specific operating system interprets or JIT-compiles into native machine code.'
      }
    ]
  },

  'jdk-jre-jvm': {
    id: 'jdk-jre-jvm',
    moduleId: 'm1',
    topicNumber: 2,
    title: 'JDK, JRE and JVM',
    shortSummary: 'Understand the three core pillars of Java runtime and development environment.',
    whatIsIt: 'Java execution is divided into three layers: JVM (Java Virtual Machine) executes bytecode, JRE (Java Runtime Environment) provides the JVM plus core standard libraries, and JDK (Java Development Kit) provides JRE plus development tools like the compiler (javac) and debugger.',
    whyDoWeNeedIt: 'Understanding the separation helps you know what to install: developers need the JDK to write and compile code, while end-user deployment servers only need the runtime environment to execute compiled programs.',
    syntax: `# Command line tools:
# javac App.java    -> Invokes the Java Compiler (JDK tool)
# java App          -> Launches the JVM to execute bytecode (JRE/JDK)`,
    basicExample: {
      code: `public class RuntimeInfo {
    public static void main(String[] args) {
        System.out.println("Java Vendor: " + System.getProperty("java.vendor"));
        System.out.println("Java Version: " + System.getProperty("java.version"));
        System.out.println("JVM Name: " + System.getProperty("java.vm.name"));
    }
}`,
      output: `Java Vendor: Oracle Corporation
Java Version: 21.0.2
JVM Name: OpenJDK 64-Bit Server VM`
    },
    detailedExample: {
      code: `public class MemoryInspector {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        long maxMemory = runtime.maxMemory() / (1024 * 1024);
        long totalMemory = runtime.totalMemory() / (1024 * 1024);
        long freeMemory = runtime.freeMemory() / (1024 * 1024);
        
        System.out.println("JVM Allocated Memory Details:");
        System.out.println("Max Memory: " + maxMemory + " MB");
        System.out.println("Total Allocated: " + totalMemory + " MB");
        System.out.println("Free Memory: " + freeMemory + " MB");
    }
}`,
      output: `JVM Allocated Memory Details:
Max Memory: 4096 MB
Total Allocated: 256 MB
Free Memory: 248 MB`
    },
    codeExplanation: [
      'Runtime.getRuntime(): Gives access to the current JVM runtime environment.',
      'runtime.maxMemory(): Maximum heap memory the JVM will attempt to use.',
      'System.getProperty(): Reads system properties configured by the JVM.'
    ],
    visualExplanation: {
      title: 'JDK ⊃ JRE ⊃ JVM Containment Hierarchy',
      description: 'JDK contains JRE and development tools; JRE contains JVM and runtime libraries.',
      asciiDiagram: `┌─────────────────── JDK (Java Development Kit) ───────────────────┐
│  Compiler (javac), Debugger (jdb), Archiver (jar), Javadoc       │
│                                                                  │
│  ┌───────────────── JRE (Java Runtime Environment) ────────────┐  │
│  │  Class Libraries (rt.jar / java.base), UI toolkits          │  │
│  │                                                             │  │
│  │  ┌─────────────── JVM (Java Virtual Machine) ─────────────┐ │  │
│  │  │ ClassLoader | Bytecode Verifier | JIT Compiler | GC    │ │  │
│  │  └────────────────────────────────────────────────────────┘ │  │
│  └─────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────┘`
    },
    visualizerType: 'jvm-architecture',
    commonMistakes: [
      {
        mistake: 'Installing only JRE when wanting to develop Java programs.',
        whyItIsWrong: 'The JRE does not contain the \`javac\` compiler needed to compile \`.java\` files.',
        correction: 'Always install the full JDK (e.g., OpenJDK 21 or Oracle JDK).'
      }
    ],
    importantRules: [
      'JDK = JRE + Development Tools (javac, jdb, jar).',
      'JRE = JVM + Core Class Libraries.',
      'JVM is the actual virtual processor that executes bytecode line by line or via JIT compilation.'
    ],
    interviewPerspective: {
      question: 'What is the role of the JIT (Just-In-Time) compiler inside the JVM?',
      answer: 'The JIT compiler analyzes frequently executed bytecode ("hot spots") at runtime and compiles them directly into native CPU machine instructions, dramatically boosting execution speed compared to pure interpretation.',
      trap: 'Do not say JIT compiles before program start; it compiles during execution dynamically.'
    },
    practiceQuestions: [
      {
        question: 'Which component is responsible for loading \`.class\` files into JVM memory?',
        hint: 'Part of JVM subsystem.',
        solution: 'The ClassLoader subsystem of the JVM loads, links, and initializes binary class files into the JVM method area.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m1-t2-q1',
        type: 'mcq',
        prompt: 'Which component contains the \`javac\` compiler?',
        options: ['JVM only', 'JRE only', 'JDK', 'Java Bytecode'],
        correctAnswer: 2,
        explanation: 'The Java Development Kit (JDK) contains the \`javac\` compiler and developer tools alongside the JRE.'
      }
    ]
  },

  'installing-java-ide': {
    id: 'installing-java-ide',
    moduleId: 'm1',
    topicNumber: 3,
    title: 'Installing Java and Setting Up an IDE',
    shortSummary: 'Setting up OpenJDK, configuring JAVA_HOME and PATH, and choosing an IDE like IntelliJ IDEA or VS Code.',
    whatIsIt: 'To develop in Java, you install a JDK distribution (such as OpenJDK, Amazon Corretto, or Eclipse Temurin) and configure system environment variables (\`JAVA_HOME\` and \`PATH\`), followed by setting up an IDE like IntelliJ IDEA, VS Code, or Eclipse.',
    whyDoWeNeedIt: 'Environment variables allow your operating system and build tools (Maven, Gradle) to find the Java compiler and runtime from any terminal folder.',
    syntax: `# Check your setup in terminal:
java --version
javac --version

# Environment variables check (Windows CMD):
echo %JAVA_HOME%

# Environment variables check (macOS/Linux):
echo $JAVA_HOME`,
    basicExample: {
      code: `public class SetupCheck {
    public static void main(String[] args) {
        System.out.println("Java Environment Configured Successfully!");
        System.out.println("Ready to write Java applications.");
    }
}`,
      output: `Java Environment Configured Successfully!
Ready to write Java applications.`
    },
    detailedExample: {
      code: `public class SystemProperties {
    public static void main(String[] args) {
        System.out.println("OS: " + System.getProperty("os.name"));
        System.out.println("User Home: " + System.getProperty("user.home"));
        System.out.println("Java Home: " + System.getProperty("java.home"));
    }
}`,
      output: `OS: Windows 11
User Home: C:\\Users\\Developer
Java Home: C:\\Program Files\\Java\\jdk-21`
    },
    codeExplanation: [
      'System.getProperty("java.home"): Reads the directory where the active JRE/JDK is installed.',
      'System.getProperty("os.name"): Detects host OS environment.'
    ],
    visualExplanation: {
      title: 'Environment Variable PATH & JAVA_HOME Flow',
      description: 'Terminal queries PATH -> finds JAVA_HOME/bin/java.exe -> executes command.',
      asciiDiagram: `[ Terminal: javac App.java ]
             ↓
[ System searches PATH variable ]
             ↓
[ PATH points to %JAVA_HOME%\\bin ]
             ↓
[ Executes javac.exe to compile ]`
    },
    visualizerType: 'memory-box',
    commonMistakes: [
      {
        mistake: 'Setting JAVA_HOME to the \`bin\` directory instead of the root JDK directory.',
        whyItIsWrong: 'Tools expect JAVA_HOME to be \`C:\\...\\jdk-21\`, and append \`/bin\` themselves.',
        correction: 'Set \`JAVA_HOME = C:\\Program Files\\Java\\jdk-21\` and \`PATH = %JAVA_HOME%\\bin\`.'
      }
    ],
    importantRules: [
      'JAVA_HOME must point to the root directory of the JDK installation.',
      'PATH should include \`%JAVA_HOME%\\bin\` (or \`$JAVA_HOME/bin\`).',
      'Always use an LTS (Long Term Support) release for stability (e.g., Java 17 or Java 21).'
    ],
    interviewPerspective: {
      question: 'What is an LTS version of Java and why do enterprise companies prefer it?',
      answer: 'LTS stands for Long-Term Support. Oracle and OpenJDK vendors provide multi-year security patches, bug fixes, and commercial stability for LTS releases (e.g., Java 8, 11, 17, 21), minimizing breaking changes in production.',
      trap: 'Non-LTS versions are released every 6 months and lose official support when the next version arrives.'
    },
    practiceQuestions: [
      {
        question: 'What command compiles a file named \`Calculator.java\` and what file is generated?',
        hint: 'Use the JDK compiler tool.',
        solution: 'Command: \`javac Calculator.java\`. It generates \`Calculator.class\` containing JVM bytecode.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m1-t3-q1',
        type: 'mcq',
        prompt: 'What file extension is produced when you compile a \`.java\` file with \`javac\`?',
        options: ['.exe', '.class', '.obj', '.bin'],
        correctAnswer: 1,
        explanation: 'The Java compiler produces \`.class\` files containing platform-independent bytecode.'
      }
    ]
  },

  'first-java-program': {
    id: 'first-java-program',
    moduleId: 'm1',
    topicNumber: 4,
    title: 'First Java Program',
    shortSummary: 'Deconstruct every keyword in \`public static void main(String[] args)\` and master console printing.',
    whatIsIt: 'A minimal Java program consists of a class definition containing the \`main\` method. The main method is the exact signature the JVM searches for to begin program execution.',
    whyDoWeNeedIt: 'Understanding the purpose of every keyword (\`public\`, \`static\`, \`void\`, \`main\`, \`String[] args\`) removes beginner confusion and lays the groundwork for OOP concepts.',
    syntax: `public class ClassName {
    public static void main(String[] args) {
        // System.out.println("Prints with newline");
        // System.out.print("Prints without newline");
    }
}`,
    basicExample: {
      code: `public class MyFirstProgram {
    public static void main(String[] args) {
        System.out.println("LevelUpDev: Mastering Java 2026!");
    }
}`,
      output: `LevelUpDev: Mastering Java 2026!`
    },
    detailedExample: {
      code: `public class AnatomyOfMain {
    public static void main(String[] args) {
        System.out.print("Step 1: Code compiles to bytecode. ");
        System.out.println("Step 2: JVM loads class.");
        System.out.println("Step 3: JVM invokes public static void main().");
        System.out.printf("Formatted output: Year = %d, Success = %b%n", 2026, true);
    }
}`,
      output: `Step 1: Code compiles to bytecode. Step 2: JVM loads class.
Step 3: JVM invokes public static void main().
Formatted output: Year = 2026, Success = true`
    },
    codeExplanation: [
      'public: Access modifier allowing the JVM to invoke this method from outside the class package.',
      'static: Allows the JVM to call the main method without creating an instance object of the class.',
      'void: Return type indicating the main method returns no value to the operating system.',
      'main: The predefined method name recognized by the JVM launcher as the starting point.',
      'String[] args: Command-line arguments passed to the program as an array of strings.'
    ],
    visualExplanation: {
      title: 'Execution Entry Point Anatomy',
      description: 'The JVM looks up the main signature and begins sequential line-by-line execution.',
      asciiDiagram: `JVM Launcher
     ↓
Searches for: public static void main(String[] args)
     ↓
┌───────────────── Memory Frame ─────────────────┐
│ Stack: [main() frame]                          │
│ Executes statements inside { ... } top to down │
└────────────────────────────────────────────────┘`
    },
    visualizerType: 'method-stack',
    commonMistakes: [
      {
        mistake: 'Writing \`public void main(String[] args)\` (missing static).',
        whyItIsWrong: 'The JVM cannot invoke non-static methods without an instantiated object, causing runtime error: "Main method not found in class".',
        correction: 'Always include \`static\`: \`public static void main(String[] args)\`.'
      },
      {
        mistake: 'Missing semicolon \`;\` at the end of statements.',
        whyItIsWrong: 'Java requires semicolons to terminate statements. Omitting it causes compilation error.',
        correction: 'Add a semicolon \`;\` after every complete statement.'
      }
    ],
    importantRules: [
      'Every executable Java application requires the exact signature \`public static void main(String[] args)\`.',
      '\`System.out.println()\` prints with a newline; \`System.out.print()\` prints without a newline.',
      'Statements must end with a semicolon \`;\`.'
    ],
    interviewPerspective: {
      question: 'Can we overload the main method in Java?',
      answer: 'Yes! You can have multiple \`main\` methods with different parameter types (e.g., \`main(int x)\`). However, the JVM will strictly execute only \`public static void main(String[] args)\` as the application entry point.',
      trap: 'Overloading main is legal in syntax, but JVM will not call your custom overloads automatically.'
    },
    practiceQuestions: [
      {
        question: 'What is the difference between \`System.out.print("Hi")\` and \`System.out.println("Hi")\`?',
        hint: 'Look at the "ln" suffix.',
        solution: '\`print()\` outputs text and keeps the cursor on the same line. \`println()\` outputs text and appends a line separator, moving the cursor to the next line.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m1-t4-q1',
        type: 'mcq',
        prompt: 'Why is the \`main\` method declared \`static\` in Java?',
        options: [
          'To prevent the method from being called',
          'So the JVM can call it without creating an object instance of the class',
          'To make the program execute asynchronously',
          'Because all Java methods must be static'
        ],
        correctAnswer: 1,
        explanation: '\`static\` enables the JVM to invoke \`ClassName.main()\` directly without needing to instantiate an object of the class first.'
      }
    ]
  },

  'variables': {
    id: 'variables',
    moduleId: 'm1',
    topicNumber: 5,
    title: 'Variables',
    shortSummary: 'Variable declaration, memory allocation, initialization, and Java naming conventions (camelCase).',
    whatIsIt: 'A variable is a named memory location used to store data values during program execution. In Java, every variable has a declared type, name, and value.',
    whyDoWeNeedIt: 'Programs must store, compute, modify, and retrieve state (such as user scores, bank balances, and configuration settings) in computer memory.',
    syntax: `// Declaration: dataType variableName;
// Initialization: variableName = value;
// Combined: dataType variableName = value;

int studentAge = 20;
double examScore = 95.5;
char grade = 'A';
boolean isPassed = true;`,
    basicExample: {
      code: `public class VariableDemo {
    public static void main(String[] args) {
        int score = 85;
        System.out.println("Initial Score: " + score);
        
        score = 92; // Reassigning value
        System.out.println("Updated Score: " + score);
    }
}`,
      output: `Initial Score: 85
Updated Score: 92`
    },
    detailedExample: {
      code: `public class MemorySwap {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        System.out.println("Before Swap: a = " + a + ", b = " + b);
        
        // Swap using temporary variable
        int temp = a;
        a = b;
        b = temp;
        
        System.out.println("After Swap: a = " + a + ", b = " + b);
    }
}`,
      output: `Before Swap: a = 10, b = 20
After Swap: a = 20, b = 10`
    },
    codeExplanation: [
      'int score = 85: Allocates 4 bytes in stack memory, labeled "score", holding binary 85.',
      'score = 92: Overwrites the value inside the memory location with 92.',
      'int temp = a: Copies the value from memory slot \`a\` into a new memory slot \`temp\`.'
    ],
    visualExplanation: {
      title: 'Variable Memory Box Concept',
      description: 'A variable creates a named box in Stack memory with fixed data type capacity.',
      asciiDiagram: `Declaration: int age = 21;

Stack Memory:
┌─────────────────┐
│ Name:  age      │
│ Type:  int      │
│ Size:  4 Bytes  │
│ Value: [ 21 ]   │
└─────────────────┘`
    },
    visualizerType: 'memory-box',
    commonMistakes: [
      {
        mistake: 'Using a local variable before initializing it.',
        whyItIsWrong: 'Java does not provide default values for local variables inside methods. It causes compilation error.',
        correction: 'Always initialize local variables: \`int count = 0;\`.'
      },
      {
        mistake: 'Using reserved keywords as variable names (e.g. \`int class = 5;\`).',
        whyItIsWrong: 'Keywords are reserved by the Java language grammar.',
        correction: 'Use descriptive camelCase names: \`int classNumber = 5;\`.'
      }
    ],
    importantRules: [
      'Variable names must start with a letter, \`$\`, or \`_\`. They cannot start with a digit.',
      'Variable names cannot contain spaces or reserved keywords.',
      'Follow lowerCamelCase for variables (e.g., \`studentGpa\`, \`totalAmount\`).',
      'Local variables must be initialized before they are read.'
    ],
    interviewPerspective: {
      question: 'What is the difference between instance variables and local variables in Java?',
      answer: 'Instance variables are declared inside a class but outside methods; they are created when an object is instantiated on Heap memory and receive default values (0, null, false). Local variables are declared inside methods/blocks on Stack memory and must be explicitly initialized before use.',
      trap: 'Local variables DO NOT get default values; only class and instance variables do.'
    },
    practiceQuestions: [
      {
        question: 'Swap two integer variables \`x\` and \`y\` without using a third temporary variable.',
        hint: 'Use addition and subtraction arithmetic.',
        solution: 'x = x + y; y = x - y; x = x - y;'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m1-t5-q1',
        type: 'mcq',
        prompt: 'Which of the following is an INVALID variable identifier in Java?',
        options: ['_totalAmount', '$price', '2ndUser', 'user_age_2'],
        correctAnswer: 2,
        explanation: 'Variable names in Java cannot start with a numeric digit (\`2ndUser\` is invalid).'
      }
    ]
  },

  'data-types': {
    id: 'data-types',
    moduleId: 'm1',
    topicNumber: 6,
    title: 'Data Types',
    shortSummary: '8 Primitive Data Types (byte, short, int, long, float, double, char, boolean) vs Reference Types.',
    whatIsIt: 'Java is strongly typed. Every variable must have a declared data type. Java has 8 Primitive types (storing raw values directly in stack memory) and Reference types (objects and arrays whose variables store memory addresses).',
    whyDoWeNeedIt: 'Choosing the correct data type ensures memory efficiency, numerical precision, and type safety, preventing overflow and runtime bugs.',
    syntax: `// 8 Primitive Data Types in Java:
byte b = 127;           // 1 byte  (-128 to 127)
short s = 32767;        // 2 bytes (-32,768 to 32,767)
int i = 2147483647;     // 4 bytes (standard integer)
long l = 9223372036854775807L; // 8 bytes (suffix L)

float f = 3.14f;        // 4 bytes (suffix f)
double d = 3.1415926535;// 8 bytes (standard decimal)

char c = 'A';           // 2 bytes (Unicode character)
boolean flag = true;    // 1 bit logical (true/false)`,
    basicExample: {
      code: `public class DataTypesDemo {
    public static void main(String[] args) {
        int students = 120;
        double averageGpa = 8.75;
        char section = 'B';
        boolean isEnrolled = true;
        
        System.out.println("Students: " + students);
        System.out.println("GPA: " + averageGpa);
        System.out.println("Section: " + section);
        System.out.println("Enrolled: " + isEnrolled);
    }
}`,
      output: `Students: 120
GPA: 8.75
Section: B
Enrolled: true`
    },
    detailedExample: {
      code: `public class PrimitiveLimits {
    public static void main(String[] args) {
        System.out.println("Byte Range: " + Byte.MIN_VALUE + " to " + Byte.MAX_VALUE);
        System.out.println("Int Range: " + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE);
        System.out.println("Long Range: " + Long.MIN_VALUE + " to " + Long.MAX_VALUE);
        System.out.println("Double Range: " + Double.MIN_VALUE + " to " + Double.MAX_VALUE);
    }
}`,
      output: `Byte Range: -128 to 127
Int Range: -2147483648 to 2147483647
Long Range: -9223372036854775808 to 9223372036854775807
Double Range: 4.9E-324 to 1.7976931348623157E308`
    },
    codeExplanation: [
      'byte: 8 bits. Good for raw streams and large binary buffers.',
      'long: 64 bits. Requires suffix \`L\` or \`l\` for literals exceeding 32-bit int bounds.',
      'float: 32 bits single precision. Requires suffix \`f\` or \`F\`.',
      'double: 64 bits double precision. Default for floating point literals in Java.'
    ],
    visualExplanation: {
      title: 'Java 8 Primitive Types Memory Sizes',
      description: 'Memory allocated on stack for each primitive data type.',
      asciiDiagram: `Primitive Data Types:
┌────────┬────────┬─────────────────────────────┐
│ Type   │ Size   │ Value Range                 │
├────────┼────────┼─────────────────────────────┤
│ byte   │ 1 Byte │ -128 to 127                 │
│ short  │ 2 Byte │ -32,768 to 32,767           │
│ int    │ 4 Byte │ -2^31 to 2^31-1 (~2.14 B)   │
│ long   │ 8 Byte │ -2^63 to 2^63-1             │
│ float  │ 4 Byte │ 6-7 decimal digits (suffix f)│
│ double │ 8 Byte │ 15-16 decimal digits        │
│ char   │ 2 Byte │ 0 to 65,535 (Unicode 16-bit)│
│ boolean│ 1 Bit  │ true or false               │
└────────┴────────┴─────────────────────────────┘`
    },
    visualizerType: 'memory-box',
    commonMistakes: [
      {
        mistake: 'Assigning a decimal literal to float without \`f\` suffix (e.g., \`float f = 3.14;\`).',
        whyItIsWrong: 'Java treats decimal literals as \`double\` by default. Assigning double to float causes precision loss compilation error.',
        correction: 'Add \`f\` suffix: \`float f = 3.14f;\` or use \`double d = 3.14;\`.'
      },
      {
        mistake: 'Using double for precise financial / currency calculations.',
        whyItIsWrong: 'Floating-point math in binary has rounding inaccuracies (e.g. 0.1 + 0.2 != 0.3).',
        correction: 'Use \`BigDecimal\` for currency and financial calculations.'
      }
    ],
    importantRules: [
      'Java has exactly 8 primitive types.',
      'Default integer literal is \`int\`; default floating-point literal is \`double\`.',
      '\`char\` in Java is 2 bytes because it supports Unicode UTF-16 characters.',
      'String is NOT a primitive type; it is a reference object class (\`java.lang.String\`).'
    ],
    interviewPerspective: {
      question: 'Why does char occupy 2 bytes in Java unlike 1 byte in C/C++?',
      answer: 'C/C++ originally used the 1-byte ASCII character set (supporting only 256 characters). Java was designed for global software and adopted the 16-bit Unicode character encoding system, allowing it to represent characters from all world languages.',
      trap: 'Do not confuse ASCII (8-bit) with Unicode (16-bit in standard Java char).'
    },
    practiceQuestions: [
      {
        question: 'What happens if you assign \`byte b = 130;\` in Java?',
        hint: 'Check byte max range.',
        solution: 'Compilation error: "possible loss of precision / incompatible types: possible lossy conversion from int to byte" because 130 exceeds byte maximum value of 127.'
      }
    ],
    checkpoint: [
      {
        id: 'chk-m1-t6-q1',
        type: 'mcq',
        prompt: 'Which data type is the default for floating-point numbers in Java?',
        options: ['float', 'double', 'BigDecimal', 'real'],
        correctAnswer: 1,
        explanation: 'In Java, floating-point literals (like \`3.14\`) are treated as \`double\` (64-bit) by default unless marked with suffix \`f\`.'
      }
    ]
  },

  'input-and-output': {
    id: 'input-and-output',
    moduleId: 'm1',
    topicNumber: 7,
    title: 'Input and Output',
    shortSummary: 'Console I/O using Scanner (nextInt, nextDouble, nextLine), System.out, and resolving the nextLine newline trap.',
    whatIsIt: 'Input and Output (I/O) is how a Java program receives data from the user (via \`java.util.Scanner\` and \`System.in\`) and displays results to the screen (via \`System.out.println\` and \`System.out.printf\`).',
    whyDoWeNeedIt: 'Interactive programs must accept dynamic user inputs at runtime (keyboard entries, command parameters) and display formatted results.',
    syntax: `import java.util.Scanner;

Scanner sc = new Scanner(System.in);
int age = sc.nextInt();
double salary = sc.nextDouble();
String word = sc.next();       // Reads next word (until space)
sc.nextLine();                 // Consume leftover newline buffer
String fullName = sc.nextLine();// Reads entire line until Enter`,
    basicExample: {
      code: `import java.util.Scanner;

public class UserGreeting {
    public static void main(String[] args) {
        Scanner sc = new Scanner("Alex\\n21"); // Simulated console input
        
        System.out.print("Enter your name: ");
        String name = sc.nextLine();
        
        System.out.print("Enter your age: ");
        int age = sc.nextInt();
        
        System.out.println("Welcome, " + name + "! You are " + age + " years old.");
        sc.close();
    }
}`,
      output: `Enter your name: Enter your age: Welcome, Alex! You are 21 years old.`
    },
    detailedExample: {
      code: `import java.util.Scanner;

public class StudentReportGenerator {
    public static void main(String[] args) {
        String mockInput = "Computer Science\\n92.5\\n3\\nRahul Sharma";
        Scanner sc = new Scanner(mockInput);
        
        String branch = sc.nextLine();
        double marks = sc.nextDouble();
        int year = sc.nextInt();
        sc.nextLine(); // CRITICAL: consume trailing newline
        String studentName = sc.nextLine();
        
        System.out.println("========== STUDENT REPORT ==========");
        System.out.printf("Name:   %-20s%n", studentName);
        System.out.printf("Branch: %-20s%n", branch);
        System.out.printf("Year:   %d%n", year);
        System.out.printf("Marks:  %.2f%%%n", marks);
        System.out.println("====================================");
        sc.close();
    }
}`,
      output: `========== STUDENT REPORT ==========
Name:   Rahul Sharma        
Branch: Computer Science    
Year:   3
Marks:  92.50%
====================================`
    },
    codeExplanation: [
      'new Scanner(System.in): Creates a scanner object hooked into the standard keyboard input stream.',
      'sc.nextInt(): Parses the next token as an integer, leaving the trailing newline character in the buffer.',
      'sc.nextLine(): Consumes the rest of the current line including the newline delimiter.',
      'System.out.printf(): Prints formatted text using format specifiers like \`%s\` (string), \`%d\` (integer), \`%.2f\` (2-decimal float).'
    ],
    visualExplanation: {
      title: 'The Scanner \`nextLine()\` Buffer Trap',
      description: 'Why calling nextLine() immediately after nextInt() reads an empty string if not cleared.',
      asciiDiagram: `User types: "25\\n"
sc.nextInt() reads: [ 25 ]
Buffer remaining:   [ \\n ]  ← Trailing newline!

Next call: sc.nextLine() immediately encounters [ \\n ] and returns ""!
Solution: Insert an extra sc.nextLine() to flush the newline buffer.`
    },
    visualizerType: 'memory-box',
    commonMistakes: [
      {
        mistake: 'Calling \`sc.nextLine()\` immediately after \`sc.nextInt()\` without consuming the leftover newline.',
        whyItIsWrong: '\`nextInt()\` leaves the Enter keystroke (\`\\n\`) in the input buffer, which \`nextLine()\` immediately consumes as an empty line.',
        correction: 'Add an extra \`sc.nextLine();\` right after \`nextInt()\` or \`nextDouble()\` to clear the buffer.'
      }
    ],
    importantRules: [
      'Always import \`java.util.Scanner\`.',
      'Remember to close Scanner with \`sc.close()\` to avoid resource leaks in real file/stream applications.',
      '\`next()\` reads only a single word (delimiters = whitespace); \`nextLine()\` reads the full line until newline.'
    ],
    interviewPerspective: {
      question: 'What is the performance difference between Scanner and BufferedReader?',
      answer: 'Scanner parses tokens and handles regex validation synchronously with a small internal buffer (1 KB), making it convenient but slower. BufferedReader simply reads raw character streams with a large buffer (8 KB), making it significantly faster for large competitive programming inputs.',
      trap: 'For high-throughput competitive coding inputs (>100k lines), always prefer BufferedReader over Scanner.'
    },
    practiceQuestions: [
      {
        question: 'Write a program snippet that reads a student\'s name, roll number, and GPA, and prints a formatted summary.',
        hint: 'Remember to flush the newline buffer between numeric input and string input.',
        solution: `Scanner sc = new Scanner(System.in);
int roll = sc.nextInt();
double gpa = sc.nextDouble();
sc.nextLine(); // flush
String name = sc.nextLine();
System.out.println("Roll: " + roll + ", GPA: " + gpa + ", Name: " + name);`
      }
    ],
    checkpoint: [
      {
        id: 'chk-m1-t7-q1',
        type: 'mcq',
        prompt: 'What happens if you call `sc.nextLine()` immediately after `sc.nextInt()` without flushing the buffer?',
        options: [
          'It throws a NoSuchElementException',
          'It consumes the leftover newline character and returns an empty string',
          'It automatically waits for the next user keystroke',
          'It terminates the program'
        ],
        correctAnswer: 1,
        explanation: '`nextInt()` reads only the numeric digits and leaves the `\\n` newline character in the input stream buffer. The subsequent `nextLine()` immediately reads that newline and returns an empty string.'
      }
    ]
  }
};

import { JAVA_TOPICS_MODULE_2 } from './javaTopicsModule2';
import { JAVA_TOPICS_MODULE_3 } from './javaTopicsModule3';
import { JAVA_TOPICS_MODULE_4 } from './javaTopicsModule4';
import { JAVA_TOPICS_MODULE_5 } from './javaTopicsModule5';
import { JAVA_TOPICS_MODULE_6 } from './javaTopicsModule6';
import { JAVA_TOPICS_MODULE_7 } from './javaTopicsModule7';

// Consolidated Global Catalog for all Java Topics (Modules 1 - 7)
export const ALL_JAVA_TOPICS: Record<string, JavaTopicDetail> = {
  ...JAVA_TOPICS_CATALOG,
  ...JAVA_TOPICS_MODULE_2,
  ...JAVA_TOPICS_MODULE_3,
  ...JAVA_TOPICS_MODULE_4,
  ...JAVA_TOPICS_MODULE_5,
  ...JAVA_TOPICS_MODULE_6,
  ...JAVA_TOPICS_MODULE_7,
};

// Aliased export
export { ALL_JAVA_TOPICS as FULL_JAVA_TOPICS_CATALOG };

export function getJavaTopic(topicId: string): JavaTopicDetail | undefined {
  return ALL_JAVA_TOPICS[topicId];
}

export function getJavaTopicsForModule(moduleId: string): JavaTopicDetail[] {
  const normModId = moduleId.toLowerCase().replace('module-', 'm');
  return Object.values(ALL_JAVA_TOPICS)
    .filter((t) => t.moduleId === normModId)
    .sort((a, b) => a.topicNumber - b.topicNumber);
}

export function getAdjacentJavaTopics(topicId: string): {
  prevTopic: JavaTopicDetail | null;
  nextTopic: JavaTopicDetail | null;
} {
  const current = getJavaTopic(topicId);
  if (!current) return { prevTopic: null, nextTopic: null };

  const moduleTopics = getJavaTopicsForModule(current.moduleId);
  const currentIndex = moduleTopics.findIndex((t) => t.id === topicId);

  if (currentIndex === -1) return { prevTopic: null, nextTopic: null };

  const prevTopic = currentIndex > 0 ? moduleTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < moduleTopics.length - 1 ? moduleTopics[currentIndex + 1] : null;

  return { prevTopic, nextTopic };
}
