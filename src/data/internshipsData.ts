export interface InternshipOpportunity {
  id: string;
  title: string;
  category: 'Software Development' | 'Data & Analytics' | 'Artificial Intelligence' | 'Web Development' | 'Generative AI';
  mode: 'Remote';
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
  description: string;
  learningOutcomes: string[];
  responsibilities: string[];
  prerequisites: string[];
  stipendOrCreditNote: string;
  iconName: string;
}

export type ApplicationStatus = 'Interested' | 'Under Review' | 'Selected' | 'Not Selected';

export interface InternshipApplication {
  id: string;
  user_id?: string;
  internship_id: string;
  internship_title: string;
  full_name: string;
  email: string;
  phone: string;
  education: string;
  skills: string;
  status: ApplicationStatus;
  submitted_at: string;
  admin_notes?: string;
}

export const INTERNSHIP_OPPORTUNITIES: InternshipOpportunity[] = [
  {
    id: 'python-developer-intern',
    title: 'Python Developer Intern',
    category: 'Software Development',
    mode: 'Remote',
    duration: '3 Months',
    level: 'Beginner',
    skills: ['Python', 'Git', 'Problem Solving', 'FastAPI', 'OOP'],
    description:
      'Experience building robust backend services, writing clean modular Python code, implementing REST APIs with FastAPI, and applying automated unit testing to real-world software modules.',
    learningOutcomes: [
      'Write production-grade object-oriented and asynchronous Python code.',
      'Develop, test, and document RESTful microservices with FastAPI and Pydantic.',
      'Implement Git workflows, branching strategies, and automated pytest suites.',
      'Understand database query optimization and clean API response structures.',
    ],
    responsibilities: [
      'Design modular Python utilities and background data processing tasks.',
      'Collaborate on REST API endpoint architecture and schema validation.',
      'Write comprehensive unit and integration tests using pytest.',
      'Participate in simulated sprint standups and code reviews.',
    ],
    prerequisites: [
      'Basic knowledge of Python syntax, functions, and data structures.',
      'Familiarity with version control using Git and GitHub.',
    ],
    stipendOrCreditNote: 'Educational Simulation & Project Experience Certificate upon module completion',
    iconName: 'Code2',
  },
  {
    id: 'data-analyst-intern',
    title: 'Data Analyst Intern',
    category: 'Data & Analytics',
    mode: 'Remote',
    duration: '3 Months',
    level: 'Beginner',
    skills: ['Python', 'SQL', 'Excel', 'Data Analysis', 'Power BI', 'Statistics'],
    description:
      'Transform raw business data into actionable strategic insights through exploratory data analysis, SQL aggregation queries, statistical modeling, and interactive dashboards.',
    learningOutcomes: [
      'Master advanced SQL queries, multi-table JOINs, and window functions.',
      'Clean, reshape, and analyze structured datasets using Python Pandas and NumPy.',
      'Build executive business intelligence dashboards using Power BI and Matplotlib.',
      'Formulate hypothesis testing and communicate analytical findings effectively.',
    ],
    responsibilities: [
      'Perform exploratory data analysis on real-world e-commerce and SaaS datasets.',
      'Write optimized SQL queries to extract metrics and cohort retention insights.',
      'Create visual storytelling reports with clear business recommendations.',
      'Validate data integrity and document analytical methodologies.',
    ],
    prerequisites: [
      'Foundational understanding of spreadsheets and basic SQL SELECT queries.',
      'Curiosity for uncovering patterns and trends in quantitative data.',
    ],
    stipendOrCreditNote: 'Educational Simulation & Project Experience Certificate upon module completion',
    iconName: 'LineChart',
  },
  {
    id: 'machine-learning-intern',
    title: 'Machine Learning Intern',
    category: 'Artificial Intelligence',
    mode: 'Remote',
    duration: '3 Months',
    level: 'Intermediate',
    skills: ['Python', 'Machine Learning', 'Pandas', 'Scikit-learn', 'PyTorch'],
    description:
      'Work with predictive modeling, feature engineering pipelines, supervised and unsupervised ML algorithms, and model evaluation metrics for real-world classification and regression problems.',
    learningOutcomes: [
      'Build end-to-end machine learning pipelines from preprocessing to evaluation.',
      'Train, tune, and regularize Scikit-learn models (Random Forest, Gradient Boosting).',
      'Understand the Bias-Variance tradeoff and implement rigorous cross-validation.',
      'Package trained machine learning models into containerized FastAPI microservices.',
    ],
    responsibilities: [
      'Implement feature scaling, categorical encoding, and outlier detection routines.',
      'Benchmark baseline models against tuned ensemble classifiers.',
      'Track model performance metrics (Precision, Recall, F1-Score, ROC-AUC).',
      'Document model limitations, data assumptions, and deployment requirements.',
    ],
    prerequisites: [
      'Strong Python programming skills and comfort with NumPy/Pandas.',
      'Foundational knowledge of linear algebra, calculus, and probability.',
    ],
    stipendOrCreditNote: 'Educational Simulation & Project Experience Certificate upon module completion',
    iconName: 'Brain',
  },
  {
    id: 'web-developer-intern',
    title: 'Web Developer Intern',
    category: 'Web Development',
    mode: 'Remote',
    duration: '3 Months',
    level: 'Beginner',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
    description:
      'Build responsive, accessible, and high-performance web user interfaces using modern React, Next.js, Tailwind CSS, and REST API client integration.',
    learningOutcomes: [
      'Master React component state management, hooks, and component lifecycle.',
      'Implement responsive mobile-first UI layouts with Tailwind CSS.',
      'Integrate asynchronous REST APIs and handle loading/error boundary states.',
      'Optimize web vitals, accessibility (a11y), and cross-browser compatibility.',
    ],
    responsibilities: [
      'Develop interactive frontend components matching modern UI design systems.',
      'Integrate backend API endpoints with clean error handling and loading indicators.',
      'Ensure pixel-perfect responsive layouts across mobile, tablet, and desktop screens.',
      'Write clean, maintainable, modular TypeScript/JavaScript code.',
    ],
    prerequisites: [
      'Knowledge of HTML5, CSS3, and modern JavaScript (ES6+).',
      'Basic experience with React components and JSX.',
    ],
    stipendOrCreditNote: 'Educational Simulation & Project Experience Certificate upon module completion',
    iconName: 'Globe',
  },
  {
    id: 'generative-ai-intern',
    title: 'Generative AI Intern',
    category: 'Generative AI',
    mode: 'Remote',
    duration: '3 Months',
    level: 'Intermediate',
    skills: ['Python', 'LangChain', 'RAG', 'Prompt Engineering', 'LLM APIs', 'ChromaDB'],
    description:
      'Develop cutting-edge Generative AI applications utilizing foundation model APIs, Retrieval Augmented Generation (RAG) pipelines, vector databases, and structured prompt engineering.',
    learningOutcomes: [
      'Build end-to-end RAG pipelines with document chunking, embeddings, and vector DBs.',
      'Design structured prompt templates with few-shot exemplars and Pydantic JSON validation.',
      'Implement token streaming via Server-Sent Events (SSE) and async FastAPI backends.',
      'Evaluate AI outputs for faithfulness, groundedness, and hallucination reduction.',
    ],
    responsibilities: [
      'Ingest enterprise documents and index vector embeddings into ChromaDB.',
      'Integrate commercial and open-source foundation models via unified APIs.',
      'Build interactive AI chatbots and semantic document search interfaces.',
      'Benchmark hallucination rates and optimize retrieval context precision.',
    ],
    prerequisites: [
      'Proficiency in Python and basic understanding of Transformer embeddings.',
      'Experience interacting with REST APIs.',
    ],
    stipendOrCreditNote: 'Educational Simulation & Project Experience Certificate upon module completion',
    iconName: 'Sparkles',
  },
];
