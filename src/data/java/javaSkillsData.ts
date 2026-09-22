import {
  JavaTopicDetail,
  TopicPracticeItem,
  CheckpointQuestion,
  JAVA_TOPICS_CATALOG,
  ALL_JAVA_TOPICS,
  FULL_JAVA_TOPICS_CATALOG,
  getJavaTopic,
  getJavaTopicsForModule,
  getAdjacentJavaTopics
} from './javaTopicsData';

import {
  JAVA_QUESTION_BANKS,
  AssignmentQuestion,
  AssignmentTestCase,
  ModuleAssignmentConfig
} from './javaQuestionBanks';

export type {
  JavaTopicDetail,
  TopicPracticeItem,
  CheckpointQuestion,
  AssignmentQuestion,
  AssignmentTestCase,
  ModuleAssignmentConfig
};

export {
  JAVA_TOPICS_CATALOG,
  ALL_JAVA_TOPICS,
  FULL_JAVA_TOPICS_CATALOG,
  getJavaTopic,
  getJavaTopicsForModule,
  getAdjacentJavaTopics,
  JAVA_QUESTION_BANKS
};

export interface JavaModuleMetadata {
  id: string; // 'm1', 'm2', ... 'm21'
  moduleNumber: number; // 1 to 21
  title: string;
  shortDescription: string;
  longDescription: string;
  topicIds: string[];
  track?: 'foundation' | 'core' | 'enterprise' | 'capstone';
  isCapstone?: boolean;
  isUpcoming?: boolean;
}

export const JAVA_MODULES: JavaModuleMetadata[] = [
  // ==========================================
  // TRACK 1: FOUNDATION JAVA (Modules 1–7) - ACTIVE
  // ==========================================
  {
    id: 'm1',
    moduleNumber: 1,
    title: 'Java Basics',
    shortDescription: 'Installing Java & IDE, JDK vs JRE vs JVM, Variables, 8 Primitive Data Types, and Scanner Console I/O.',
    longDescription: 'Master the core architecture of Java, configure your development environment, understand memory allocation for primitives, and manage console I/O streams.',
    track: 'foundation',
    topicIds: [
      'what-is-java',
      'jdk-jre-jvm',
      'installing-java-ide',
      'first-java-program',
      'variables',
      'data-types',
      'input-and-output'
    ]
  },
  {
    id: 'm2',
    moduleNumber: 2,
    title: 'Operators & Type Conversion',
    shortDescription: 'Arithmetic, comparison, logical, bitwise operators, and widening/narrowing type casting.',
    longDescription: 'Explore mathematical division quirks, relational operators, short-circuit boolean evaluation, bit manipulation, and explicit type casting in Java.',
    track: 'foundation',
    topicIds: [
      'arithmetic-operators',
      'relational-logical-operators',
      'assignment-compound-operators',
      'unary-increment-decrement',
      'bitwise-shift-operators',
      'type-conversion-casting',
      'short-circuit-evaluation',
      'operator-precedence-associativity'
    ]
  },
  {
    id: 'm3',
    moduleNumber: 3,
    title: 'Conditional Statements',
    shortDescription: 'Decision making with if, else if, else, switch expressions, and ternary operators.',
    longDescription: 'Build branching logic, explore Java 14+ switch expressions with arrow syntax, master ternary operators, and eliminate common branching anti-patterns.',
    track: 'foundation',
    topicIds: [
      'decision-making-in-java',
      'if-else-statements',
      'nested-if-else',
      'switch-statement',
      'ternary-operator',
      'string-comparison-equals',
      'conditional-anti-patterns'
    ]
  },
  {
    id: 'm4',
    moduleNumber: 4,
    title: 'Loops & Iterations',
    shortDescription: 'while, do-while, for loops, nested loops, labeled jump statements, and iterative algorithms.',
    longDescription: 'Master entry-controlled and exit-controlled loops, 2D grid matrix traversals, labeled break/continue statements, and classic algorithmic series (Prime, Factorial, Fibonacci).',
    track: 'foundation',
    topicIds: [
      'need-for-loops',
      'while-loop',
      'do-while-loop',
      'for-loop',
      'nested-loops',
      'break-continue-labeled',
      'infinite-loops-pitfalls',
      'iterative-algorithms'
    ]
  },
  {
    id: 'm5',
    moduleNumber: 5,
    title: 'Arrays & String Handling',
    shortDescription: 'Stack vs Heap memory, 1D & 2D Jagged arrays, String Pool immutability, StringBuilder, and Binary Search.',
    longDescription: 'Deconstruct array memory layout on JVM Stack and Heap, traverse multi-dimensional arrays, master String immutability and the String Constant Pool, and solve classic string/array challenges.',
    track: 'foundation',
    topicIds: [
      'array-fundamentals-memory',
      'array-traversal-for-each',
      'core-array-operations',
      'multidimensional-jagged-arrays',
      'arrays-utility-toolkit',
      'string-fundamentals-pool',
      'string-methods-api',
      'stringbuilder-performance',
      'array-string-algorithms'
    ]
  },
  {
    id: 'm6',
    moduleNumber: 6,
    title: 'Methods & Program Structure',
    shortDescription: 'Method signatures, strict Call-by-Value, overloading, Call Stack recursion, Varargs, and encapsulation.',
    longDescription: 'Architect modular Java programs, understand why Java is 100% Pass-by-Value, master compile-time method overloading, diagnose Call Stack frames in recursion, and build utility engines.',
    track: 'foundation',
    topicIds: [
      'method-declaration-parameters',
      'call-by-value-memory',
      'method-overloading-polymorphism',
      'variable-scope-shadowing',
      'recursion-call-stack',
      'varargs-variable-arguments',
      'packages-access-modifiers',
      'modular-math-utility-toolkit'
    ]
  },
  {
    id: 'm7',
    moduleNumber: 7,
    title: 'Exception & File Handling',
    shortDescription: 'Throwable hierarchy, Checked vs Unchecked, Try-With-Resources, Custom Exceptions, and NIO.2.',
    longDescription: 'Build fault-tolerant Java applications with structured exception handling, custom domain exceptions, automatic resource management (AutoCloseable), and modern NIO.2 file persistence.',
    track: 'foundation',
    topicIds: [
      'exception-hierarchy-checked-unchecked',
      'try-catch-finally-flow',
      'multi-catch-union-syntax',
      'throw-vs-throws-propagation',
      'custom-domain-exceptions',
      'try-with-resources-autocloseable',
      'java-io-streams-architecture',
      'reading-files-buffered-scanner',
      'writing-files-writer-printwriter',
      'modern-java-nio2',
      'capstone-student-record-manager'
    ]
  },

  // ==========================================
  // TRACK 2: CORE JAVA & OOP (Modules 8–14) - UPCOMING
  // ==========================================
  {
    id: 'm8',
    moduleNumber: 8,
    title: 'Object-Oriented Programming: Classes & Objects',
    shortDescription: 'Classes, constructors, the `this` keyword, object lifecycle, and Garbage Collection.',
    longDescription: 'Construct object blueprints, instantiate objects on the JVM Heap, master constructor chaining, and explore Java Garbage Collection.',
    track: 'core',
    isUpcoming: true,
    topicIds: []
  },
  {
    id: 'm9',
    moduleNumber: 9,
    title: 'Inheritance & Polymorphism',
    shortDescription: 'Class hierarchies, method overriding (`@Override`), runtime polymorphism, and `super`.',
    longDescription: 'Design extensible class hierarchies, utilize method overriding, understand dynamic method dispatch, and prevent inheritance with `final`.',
    track: 'core',
    isUpcoming: true,
    topicIds: []
  },
  {
    id: 'm10',
    moduleNumber: 10,
    title: 'Abstraction & Interfaces',
    shortDescription: 'Abstract classes, interface contracts, default/static methods, and multiple inheritance.',
    longDescription: 'Decouple software components using abstract classes and interfaces, explore functional interfaces, and master interface evolution in modern Java.',
    track: 'core',
    isUpcoming: true,
    topicIds: []
  },
  {
    id: 'm11',
    moduleNumber: 11,
    title: 'Generics & Type Safety',
    shortDescription: 'Generic classes, type parameters (`<T>`), bounded wildcards (`<? extends T>`), and type erasure.',
    longDescription: 'Build type-safe reusable components with Generics, understand compile-time type verification, and analyze JVM type erasure.',
    track: 'core',
    isUpcoming: true,
    topicIds: []
  },
  {
    id: 'm12',
    moduleNumber: 12,
    title: 'Java Collections Framework',
    shortDescription: 'List (ArrayList, LinkedList), Set (HashSet, TreeSet), Map (HashMap, TreeMap), and Queue.',
    longDescription: 'Master the high-performance data structures of the `java.util` package, analyze time complexities, and learn hashing mechanics.',
    track: 'core',
    isUpcoming: true,
    topicIds: []
  },
  {
    id: 'm13',
    moduleNumber: 13,
    title: 'Lambda Expressions & Stream API',
    shortDescription: 'Functional programming in Java: Lambdas, method references, Stream pipelines, map, filter, reduce.',
    longDescription: 'Embrace functional paradigms with concise lambda expressions, Stream lazy evaluation, parallel streams, and Collectors.',
    track: 'core',
    isUpcoming: true,
    topicIds: []
  },
  {
    id: 'm14',
    moduleNumber: 14,
    title: 'Multithreading & Concurrency',
    shortDescription: 'Threads, Runnable, synchronization, locks, ThreadPools, and ExecutorService.',
    longDescription: 'Harness multi-core processors with concurrent Java threads, prevent race conditions and deadlocks, and use modern `java.util.concurrent` utilities.',
    track: 'core',
    isUpcoming: true,
    topicIds: []
  },

  // ==========================================
  // TRACK 3: ENTERPRISE JAVA & BACKEND (Modules 15–20) - UPCOMING
  // ==========================================
  {
    id: 'm15',
    moduleNumber: 15,
    title: 'Java Database Connectivity (JDBC)',
    shortDescription: 'Relational DB connections, PreparedStatement, SQL injection prevention, and transactions.',
    longDescription: 'Connect Java backends to PostgreSQL and MySQL databases, execute parameterized SQL queries securely, and manage ACID transactions.',
    track: 'enterprise',
    isUpcoming: true,
    topicIds: []
  },
  {
    id: 'm16',
    moduleNumber: 16,
    title: 'Java Design Patterns & Clean Code',
    shortDescription: 'Creational, Structural, and Behavioral patterns: Singleton, Factory, Builder, Observer, Strategy.',
    longDescription: 'Implement enterprise-proven Gang of Four (GoF) design patterns to create maintainable, decoupled, and scalable Java architectures.',
    track: 'enterprise',
    isUpcoming: true,
    topicIds: []
  },
  {
    id: 'm17',
    moduleNumber: 17,
    title: 'Spring Framework Core & Inversion of Control',
    shortDescription: 'Spring IoC Container, Dependency Injection (@Autowired), Beans, and Component Scanning.',
    longDescription: 'Master the foundation of modern enterprise Java backends: Dependency Injection, Spring Bean lifecycles, and configuration metadata.',
    track: 'enterprise',
    isUpcoming: true,
    topicIds: []
  },
  {
    id: 'm18',
    moduleNumber: 18,
    title: 'Spring Boot REST APIs & JPA/Hibernate',
    shortDescription: 'Building microservice endpoints, Spring Data JPA entities, repositories, and DTO validations.',
    longDescription: 'Develop production-ready RESTful web services with Spring Boot, map ORM entities with Hibernate, and configure Swagger/OpenAPI documentation.',
    track: 'enterprise',
    isUpcoming: true,
    topicIds: []
  },
  {
    id: 'm19',
    moduleNumber: 19,
    title: 'Spring Security & JWT Authentication',
    shortDescription: 'Securing endpoints, password hashing (BCrypt), JWT token issuance, and role-based authorization.',
    longDescription: 'Protect enterprise APIs with stateless token authentication, OAuth2 integrations, and role-based access control filters.',
    track: 'enterprise',
    isUpcoming: true,
    topicIds: []
  },
  {
    id: 'm20',
    moduleNumber: 20,
    title: 'Testing with JUnit 5, Mockito & CI/CD',
    shortDescription: 'Unit testing, Mockito mocks, integration testing with Testcontainers, and automated pipelines.',
    longDescription: 'Write robust automated test suites with JUnit 5 assertions, mock external services with Mockito, and automate testing in GitHub Actions.',
    track: 'enterprise',
    isUpcoming: true,
    topicIds: []
  },

  // ==========================================
  // TRACK 4: ENTERPRISE CAPSTONE (Module 21) - UPCOMING
  // ==========================================
  {
    id: 'm21',
    moduleNumber: 21,
    title: 'Java Enterprise Capstone Milestone',
    shortDescription: 'Architect, containerize, and deploy a full-featured microservices backend with Spring Boot.',
    longDescription: 'Culminating portfolio project synthesizing all 20 modules: Event-driven architecture, distributed caching with Redis, Docker containerization, and cloud deployment.',
    track: 'capstone',
    isCapstone: true,
    isUpcoming: true,
    topicIds: []
  }
];

export interface JavaTrackSection {
  track: 'foundation' | 'core' | 'enterprise' | 'capstone';
  title: string;
  badge: string;
  description: string;
  moduleRange: string;
  accentColor: string;
  modules: JavaModuleMetadata[];
}

export function getJavaTrackSections(): JavaTrackSection[] {
  return [
    {
      track: 'foundation',
      title: 'Foundation Java',
      badge: 'Modules 1 – 7 • Active & Fully Available',
      description: 'Master JVM fundamentals, primitive memory, operators, loops, arrays, String Constant Pool, recursion, methods, and file persistence.',
      moduleRange: '1–7',
      accentColor: 'from-amber-500/20 via-orange-500/10 to-transparent',
      modules: JAVA_MODULES.filter((m) => m.moduleNumber >= 1 && m.moduleNumber <= 7)
    },
    {
      track: 'core',
      title: 'Core Java & OOP',
      badge: 'Modules 8 – 14 • Advanced Track',
      description: 'OOP design, inheritance, polymorphism, interfaces, generics, Collections framework, Lambdas, Streams, and Multithreading.',
      moduleRange: '8–14',
      accentColor: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      modules: JAVA_MODULES.filter((m) => m.moduleNumber >= 8 && m.moduleNumber <= 14)
    },
    {
      track: 'enterprise',
      title: 'Enterprise Backend & Spring Boot',
      badge: 'Modules 15 – 20 • Industry Standard',
      description: 'JDBC databases, Design Patterns, Spring Framework IoC, Spring Boot REST APIs, JPA/Hibernate, Spring Security, and JUnit 5.',
      moduleRange: '15–20',
      accentColor: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      modules: JAVA_MODULES.filter((m) => m.moduleNumber >= 15 && m.moduleNumber <= 20)
    },
    {
      track: 'capstone',
      title: 'Enterprise Java Capstone Project',
      badge: 'Module 21 • Culminating Milestone',
      description: 'Architect, containerize, test, and ship a production-grade distributed microservices backend with automated verification.',
      moduleRange: '21',
      accentColor: 'from-purple-500/20 via-violet-500/10 to-transparent',
      modules: JAVA_MODULES.filter((m) => m.moduleNumber === 21)
    }
  ];
}

export function getAllJavaModules(): JavaModuleMetadata[] {
  return JAVA_MODULES;
}

export function getJavaModule(moduleId: string): JavaModuleMetadata | undefined {
  const normId = moduleId.toLowerCase().replace('module-', 'm');
  return JAVA_MODULES.find((m) => m.id === normId || `module-${m.moduleNumber}` === moduleId.toLowerCase());
}

export function getJavaModuleById(moduleId: string): JavaModuleMetadata | undefined {
  return getJavaModule(moduleId);
}

export function getJavaModuleTopics(moduleId: string): JavaTopicDetail[] {
  return getJavaTopicsForModule(moduleId);
}

// Anti-Cheating: Randomized Question Sampler with Option Shuffling
export function generateRandomizedJavaAssignment(moduleId: string): {
  config: ModuleAssignmentConfig;
  questions: AssignmentQuestion[];
} {
  const modKey = moduleId.toLowerCase().replace('module-', 'm');
  const config = JAVA_QUESTION_BANKS[modKey] || JAVA_QUESTION_BANKS['m1'];
  const pool = [...config.questionBank];

  // Fisher-Yates shuffle array
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Select sampleCount questions
  const selected = pool.slice(0, Math.min(config.sampleCount, pool.length));

  // Option shuffling for MCQs
  const preparedQuestions = selected.map((q) => {
    if (q.type === 'mcq' && q.options && typeof q.correctAnswer === 'number') {
      const originalOptions = q.options.map((opt, idx) => ({
        text: opt,
        isCorrect: idx === q.correctAnswer,
      }));

      // Shuffle options
      for (let i = originalOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [originalOptions[i], originalOptions[j]] = [originalOptions[j], originalOptions[i]];
      }

      const newOptions = originalOptions.map((o) => o.text);
      const newCorrectIndex = originalOptions.findIndex((o) => o.isCorrect);

      return {
        ...q,
        options: newOptions,
        correctAnswer: newCorrectIndex,
      };
    }
    return q;
  });

  return {
    config,
    questions: preparedQuestions,
  };
}
