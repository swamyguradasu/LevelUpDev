import { CareerPathId } from './types';

export interface CareerPathStage {
  stageNumber: number;
  title: string;
  focus: string;
  description: string;
  skills: string[];
  recommendedResourceIds: string[];
  resourceLabels?: Record<string, 'Recommended' | 'Relevant' | 'Beginner-friendly' | 'Practical' | 'Optional'>;
  suggestedProject: {
    title: string;
    description: string;
    tech: string[];
    projectId?: string;
  };
}

export interface DetailedCareerPath {
  careerId: CareerPathId;
  title: string;
  category: string;
  description: string;
  difficulty: 'Beginner → Intermediate' | 'Beginner → Advanced' | 'Intermediate → Advanced';
  estimatedDuration: string;
  skills: string[];
  prerequisites: string[];
  roadmapSlug?: string;
  stages: CareerPathStage[];
}

export const DETAILED_CAREER_PATHS: Record<CareerPathId, DetailedCareerPath> = {
  // 1. AI ENGINEER
  'ai-engineer': {
    careerId: 'ai-engineer',
    title: 'AI Engineer',
    category: 'Artificial Intelligence',
    description: 'Build production AI applications using large language models, prompt flow, autonomous agents, RAG, and cloud AI foundry services.',
    difficulty: 'Beginner → Advanced',
    estimatedDuration: '4–6 Months',
    skills: ['Python', 'Azure AI Foundry', 'LLMs', 'Prompt Engineering', 'RAG', 'AI Agents', 'Vector Databases', 'FastAPI'],
    prerequisites: ['Basic Python programming', 'REST API basics', 'Curiosity for intelligent systems'],
    roadmapSlug: 'ai-engineer',
    stages: [
      {
        stageNumber: 1,
        title: 'Programming & LLM Foundations',
        focus: 'Python, API calls, and foundational Generative AI principles',
        description: 'Build a rock-solid foundation in Python programming, learn how tokenization works, and write your first LLM API scripts.',
        skills: ['Python 3', 'Data Structures', 'REST APIs', 'Prompt Engineering', 'Generative AI Basics'],
        recommendedResourceIds: ['ms-learning-path-python-beginners', 'gcp-badge-genai-fundamentals', 'nvidia-course-generative-ai-explained'],
        resourceLabels: {
          'ms-learning-path-python-beginners': 'Beginner-friendly',
          'gcp-badge-genai-fundamentals': 'Recommended',
          'nvidia-course-generative-ai-explained': 'Relevant',
        },
        suggestedProject: {
          title: 'CLI Smart Assistant & Prompt Engine',
          description: 'Build a terminal assistant that takes user queries, constructs structured prompts, and queries LLM APIs with error retry logic.',
          tech: ['Python', 'LLM API', 'JSON'],
          projectId: 'expense-tracker-cli',
        },
      },
      {
        stageNumber: 2,
        title: 'Prompt Design & Multimodal AI',
        focus: 'System prompts, few-shot prompting, and vision/multimodal reasoning',
        description: 'Master zero-shot, few-shot, and chain-of-thought prompt engineering techniques across text and images.',
        skills: ['Vertex AI Studio', 'Gemini API', 'Prompt Design', 'Multimodal AI', 'Few-Shot Learning'],
        recommendedResourceIds: ['gcp-badge-prompt-design-vertex-ai', 'ms-cert-ai-fundamentals-ai900'],
        resourceLabels: {
          'gcp-badge-prompt-design-vertex-ai': 'Practical',
          'ms-cert-ai-fundamentals-ai900': 'Relevant',
        },
        suggestedProject: {
          title: 'Multimodal Document & Image Analyzer',
          description: 'Create an application that accepts PDF invoices or photos, extracts structured JSON data, and validates outputs.',
          tech: ['Python', 'Gemini API', 'Pydantic'],
        },
      },
      {
        stageNumber: 3,
        title: 'RAG & Vector Databases',
        focus: 'Grounding LLMs on enterprise data with vector search',
        description: 'Build dense vector embeddings, hybrid search indexes, and ground conversational agents on proprietary documents.',
        skills: ['RAG', 'Azure OpenAI', 'Azure AI Search', 'Vector Embeddings', 'Chunking'],
        recommendedResourceIds: ['ms-applied-skill-rag-azure-openai'],
        resourceLabels: {
          'ms-applied-skill-rag-azure-openai': 'Recommended',
        },
        suggestedProject: {
          title: 'Enterprise Knowledge Base Q&A System',
          description: 'Chunk and index technical documentation into a vector database and build a grounded RAG chatbot with source citations.',
          tech: ['Python', 'Vector DB', 'RAG', 'FastAPI'],
        },
      },
      {
        stageNumber: 4,
        title: 'Autonomous AI Agents',
        focus: 'Multi-turn agent reasoning, tool calling, and evaluation',
        description: 'Design autonomous multi-agent workflows with tool integrations, dynamic planning, and safety evaluation.',
        skills: ['Azure AI Foundry', 'AI Agents', 'Tool Calling', 'Safety Evaluation', 'LangGraph'],
        recommendedResourceIds: ['ms-applied-skill-ai-foundry-agents'],
        resourceLabels: {
          'ms-applied-skill-ai-foundry-agents': 'Recommended',
        },
        suggestedProject: {
          title: 'Autonomous Research & Code Review Agent',
          description: 'Develop an agent that searches external docs, generates unit test suites, and evaluates code pull requests automatically.',
          tech: ['Python', 'AI Foundry', 'Agents'],
        },
      },
      {
        stageNumber: 5,
        title: 'Production Deployment & Evaluation',
        focus: 'Serving AI backends with Docker, FastAPI, and automated CI/CD',
        description: 'Containerize AI applications, deploy serverless endpoints, monitor latency, and set up continuous integration.',
        skills: ['Docker', 'Azure Container Apps', 'GitHub Actions', 'FastAPI', 'CI/CD'],
        recommendedResourceIds: ['ms-applied-skill-deploy-containers-aca', 'github-skills-actions-cicd', 'ibm-badge-docker-essentials'],
        resourceLabels: {
          'ms-applied-skill-deploy-containers-aca': 'Practical',
          'github-skills-actions-cicd': 'Relevant',
          'ibm-badge-docker-essentials': 'Beginner-friendly',
        },
        suggestedProject: {
          title: 'Production AI Microservice with Monitoring',
          description: 'Package the complete AI agent into Docker containers, deploy to cloud hosting, and configure GitHub Actions for automated testing.',
          tech: ['Docker', 'FastAPI', 'GitHub Actions'],
        },
      },
    ],
  },

  // 2. ML ENGINEER
  'ml-engineer': {
    careerId: 'ml-engineer',
    title: 'ML Engineer',
    category: 'Machine Learning',
    description: 'Design, train, optimize, and serve production machine learning models and neural networks at scale.',
    difficulty: 'Beginner → Advanced',
    estimatedDuration: '4–6 Months',
    skills: ['Python', 'Scikit-learn', 'PyTorch', 'Vertex AI', 'Amazon SageMaker', 'Feature Engineering', 'MLOps', 'Docker'],
    prerequisites: ['Python basics', 'Linear algebra & statistics', 'Basic data structures'],
    roadmapSlug: 'ml-engineer',
    stages: [
      {
        stageNumber: 1,
        title: 'Python & Data Preprocessing',
        focus: 'NumPy, Pandas, data cleaning, and statistical transformations',
        description: 'Master data frame indexing, missing value imputation, aggregations, and exploratory analysis.',
        skills: ['Python', 'Pandas', 'NumPy', 'Data Cleaning', 'Jupyter'],
        recommendedResourceIds: ['ibm-badge-python-for-data-science', 'kaggle-course-pandas-data-manipulation'],
        resourceLabels: {
          'ibm-badge-python-for-data-science': 'Recommended',
          'kaggle-course-pandas-data-manipulation': 'Beginner-friendly',
        },
        suggestedProject: {
          title: 'Customer Churn Data Preprocessing Pipeline',
          description: 'Clean raw tabular datasets, handle skewed distributions, and generate descriptive statistical summaries.',
          tech: ['Python', 'Pandas', 'NumPy'],
        },
      },
      {
        stageNumber: 2,
        title: 'Feature Engineering & Classical ML',
        focus: 'Feature selection, supervised algorithms, and validation metrics',
        description: 'Implement classification and regression algorithms with Scikit-learn, evaluate cross-validation scores, and engineer high-signal features.',
        skills: ['Scikit-learn', 'Feature Engineering', 'Mutual Information', 'K-Means', 'Cross-Validation'],
        recommendedResourceIds: ['kaggle-course-feature-engineering'],
        resourceLabels: {
          'kaggle-course-feature-engineering': 'Practical',
        },
        suggestedProject: {
          title: 'Predictive Lead Scoring Engine',
          description: 'Engineer interaction features and train XGBoost/Random Forest models to score conversion probabilities.',
          tech: ['Python', 'Scikit-learn', 'XGBoost'],
        },
      },
      {
        stageNumber: 3,
        title: 'Deep Learning & Neural Networks',
        focus: 'PyTorch, CNNs, and GPU-accelerated computing',
        description: 'Construct multi-layer neural networks, train computer vision backbones with PyTorch, and optimize gradient descent.',
        skills: ['PyTorch', 'Deep Learning', 'CNNs', 'Keras', 'GPU Computing'],
        recommendedResourceIds: ['kaggle-course-intro-deep-learning', 'nvidia-course-fundamentals-deep-learning'],
        resourceLabels: {
          'kaggle-course-intro-deep-learning': 'Beginner-friendly',
          'nvidia-course-fundamentals-deep-learning': 'Recommended',
        },
        suggestedProject: {
          title: 'Image Defect Classifier with PyTorch',
          description: 'Train a convolutional neural network with transfer learning on GPU hardware to classify manufacturing anomalies.',
          tech: ['PyTorch', 'CUDA', 'Torchvision'],
        },
      },
      {
        stageNumber: 4,
        title: 'Cloud ML & Model Serving',
        focus: 'Deploying inference endpoints on Vertex AI and AWS SageMaker',
        description: 'Package trained models into custom Docker containers and deploy autoscaling REST endpoints on cloud ML platforms.',
        skills: ['Vertex AI', 'Amazon SageMaker', 'Model Serving', 'AutoML', 'Pipelines'],
        recommendedResourceIds: ['gcp-badge-build-deploy-ml-solutions', 'aws-learning-path-machine-learning-foundations'],
        resourceLabels: {
          'gcp-badge-build-deploy-ml-solutions': 'Recommended',
          'aws-learning-path-machine-learning-foundations': 'Relevant',
        },
        suggestedProject: {
          title: 'Autoscaling Cloud Prediction Service',
          description: 'Deploy a high-throughput prediction endpoint with traffic routing, input schema validation, and latency logging.',
          tech: ['Docker', 'Vertex AI', 'FastAPI'],
        },
      },
    ],
  },

  // 3. SOFTWARE ENGINEER
  'software-engineer': {
    careerId: 'software-engineer',
    title: 'Software Engineer',
    category: 'Software Engineering',
    description: 'End-to-end foundation: Computer Systems, DSA, Databases, OOP Design, Web Services, and DevOps.',
    difficulty: 'Beginner → Advanced',
    estimatedDuration: '4–6 Months',
    skills: ['Python', 'Java', 'Git', 'Linux', 'SQL', 'Computer Networks', 'Docker', 'REST APIs'],
    prerequisites: ['Basic logical aptitude', 'Comfort using command line'],
    roadmapSlug: 'software-engineer',
    stages: [
      {
        stageNumber: 1,
        title: 'Programming & System Basics',
        focus: 'Core syntax, Linux terminal, and Git version control',
        description: 'Master variables, data structures, Bash shell commands, and collaborative Git pull requests.',
        skills: ['Python 3', 'Linux CLI', 'Bash', 'Git', 'GitHub'],
        recommendedResourceIds: ['linux-foundation-lfs101x', 'linux-foundation-git-basics', 'github-skills-first-contribution'],
        resourceLabels: {
          'linux-foundation-lfs101x': 'Recommended',
          'linux-foundation-git-basics': 'Beginner-friendly',
          'github-skills-first-contribution': 'Practical',
        },
        suggestedProject: {
          title: 'CLI File Organizer & Automation Script',
          description: 'Write a modular Python tool that organizes directory files, parses arguments, and logs operations.',
          tech: ['Python', 'Bash', 'Git'],
        },
      },
      {
        stageNumber: 2,
        title: 'Relational Databases & Networking',
        focus: 'SQL queries, relational modeling, and TCP/IP networking',
        description: 'Design normalized database schemas, write multi-table JOINs, and understand how the internet transmits data.',
        skills: ['SQL', 'Relational Databases', 'JOINs', 'Computer Networks', 'TCP/IP', 'HTTP'],
        recommendedResourceIds: ['ibm-badge-sql-relational-databases', 'cisco-course-networking-basics'],
        resourceLabels: {
          'ibm-badge-sql-relational-databases': 'Recommended',
          'cisco-course-networking-basics': 'Relevant',
        },
        suggestedProject: {
          title: 'Multi-Tenant Database Schema & Query Engine',
          description: 'Design a normalized relational database schema with indexed queries and transaction rollback safety.',
          tech: ['PostgreSQL', 'SQL', 'Database Design'],
        },
      },
      {
        stageNumber: 3,
        title: 'OOP Design & Microservices',
        focus: 'Object-oriented architecture and RESTful APIs',
        description: 'Build robust object-oriented systems with Java/Python, configure REST endpoints, and implement automated tests.',
        skills: ['Java', 'OOP', 'FastAPI', 'REST APIs', 'Testing'],
        recommendedResourceIds: ['oracle-java-explorer', 'cisco-course-python-essentials-1'],
        resourceLabels: {
          'oracle-java-explorer': 'Practical',
          'cisco-course-python-essentials-1': 'Beginner-friendly',
        },
        suggestedProject: {
          title: 'RESTful E-Commerce Microservice',
          description: 'Develop a modular backend API with authentication, rate limiting, and automated pytest suites.',
          tech: ['Python/FastAPI', 'PostgreSQL', 'pytest'],
        },
      },
      {
        stageNumber: 4,
        title: 'Containers & Cloud CI/CD',
        focus: 'Docker containerization and automated GitHub Actions pipelines',
        description: 'Package services into Docker containers, orchestrate with Docker Compose, and build automated CI/CD deployment pipelines.',
        skills: ['Docker', 'Containers', 'GitHub Actions', 'CI/CD', 'Cloud'],
        recommendedResourceIds: ['ibm-badge-docker-essentials', 'github-skills-actions-cicd', 'ms-applied-skill-deploy-containers-aca'],
        resourceLabels: {
          'ibm-badge-docker-essentials': 'Recommended',
          'github-skills-actions-cicd': 'Practical',
          'ms-applied-skill-deploy-containers-aca': 'Relevant',
        },
        suggestedProject: {
          title: 'Containerized Microservice with CI/CD',
          description: 'Deploy your complete multi-service application with Docker Compose and automated GitHub Actions workflow testing.',
          tech: ['Docker', 'GitHub Actions', 'FastAPI'],
        },
      },
    ],
  },

  // 4. PYTHON DEVELOPER
  'python-developer': {
    careerId: 'python-developer',
    title: 'Python Developer',
    category: 'Software Engineering',
    description: 'Complete mastery: Core Python, Data Structures, OOP, Asynchronous APIs, FastAPI, and Docker.',
    difficulty: 'Beginner → Advanced',
    estimatedDuration: '3–5 Months',
    skills: ['Python 3.12', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'pytest', 'Docker', 'Asyncio'],
    prerequisites: ['Basic logical thinking'],
    roadmapSlug: 'python-developer',
    stages: [
      {
        stageNumber: 1,
        title: 'Python Fundamentals & PCEP Prep',
        focus: 'Syntax, control flow, functions, and OpenEDG exam readiness',
        description: 'Master Python fundamentals, bitwise operations, list comprehensions, and functional programming.',
        skills: ['Python 3', 'Control Flow', 'Functions', 'PCEP', 'Error Handling'],
        recommendedResourceIds: ['cisco-course-python-essentials-1', 'ms-learning-path-python-beginners'],
        resourceLabels: {
          'cisco-course-python-essentials-1': 'Recommended',
          'ms-learning-path-python-beginners': 'Beginner-friendly',
        },
        suggestedProject: {
          title: 'CLI Task & Budget Manager',
          description: 'Build an interactive command-line application with persistent JSON storage and input validation.',
          tech: ['Python 3', 'CLI'],
          projectId: 'expense-tracker-cli',
        },
      },
      {
        stageNumber: 2,
        title: 'Data Manipulation & Databases',
        focus: 'Pandas data operations and PostgreSQL relational modeling',
        description: 'Query relational databases, structure SQLAlchemy ORM models, and manipulate datasets with Pandas.',
        skills: ['Pandas', 'SQL', 'Relational Databases', 'SQLAlchemy', 'PostgreSQL'],
        recommendedResourceIds: ['kaggle-course-pandas-data-manipulation', 'ibm-badge-sql-relational-databases'],
        resourceLabels: {
          'kaggle-course-pandas-data-manipulation': 'Practical',
          'ibm-badge-sql-relational-databases': 'Recommended',
        },
        suggestedProject: {
          title: 'Database-Backed Analytics Engine',
          description: 'Connect a Python ORM service to PostgreSQL to compute transactional reporting aggregates.',
          tech: ['Python', 'PostgreSQL', 'SQLAlchemy'],
        },
      },
      {
        stageNumber: 3,
        title: 'FastAPI Microservices & Testing',
        focus: 'Async endpoints, Pydantic validation, and pytest suites',
        description: 'Build asynchronous REST APIs, define Pydantic schemas, and write automated unit/integration tests.',
        skills: ['FastAPI', 'Asyncio', 'Pydantic', 'pytest', 'REST APIs'],
        recommendedResourceIds: ['ms-applied-skill-deploy-containers-aca'],
        resourceLabels: {
          'ms-applied-skill-deploy-containers-aca': 'Practical',
        },
        suggestedProject: {
          title: 'High-Throughput Booking & Auth API',
          description: 'Construct an async FastAPI service with JWT authentication, rate limiting, and 90%+ pytest coverage.',
          tech: ['FastAPI', 'JWT', 'PostgreSQL', 'pytest'],
        },
      },
    ],
  },

  // 5. DATA ANALYST
  'data-analyst': {
    careerId: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    description: 'Transform raw data into strategic insights through SQL aggregation, Pandas cleaning, statistical analysis, and Power BI dashboards.',
    difficulty: 'Beginner → Advanced',
    estimatedDuration: '3–5 Months',
    skills: ['SQL', 'Excel', 'Python (Pandas)', 'Power BI', 'DAX', 'Statistics', 'EDA', 'Tableau'],
    prerequisites: ['Basic spreadsheet familiarity', 'Interest in data storytelling'],
    roadmapSlug: 'data-analyst',
    stages: [
      {
        stageNumber: 1,
        title: 'SQL & Relational Aggregations',
        focus: 'Multi-table JOINs, subqueries, and window functions',
        description: 'Master relational queries to calculate monthly retention, cohort analysis, and sales performance.',
        skills: ['SQL', 'Relational Databases', 'JOINs', 'GROUP BY', 'Window Functions'],
        recommendedResourceIds: ['ibm-badge-sql-relational-databases'],
        resourceLabels: {
          'ibm-badge-sql-relational-databases': 'Recommended',
        },
        suggestedProject: {
          title: 'E-Commerce SQL Metrics Audit',
          description: 'Analyze customer purchase datasets with multi-level JOINs and window functions to discover drop-off points.',
          tech: ['SQL', 'PostgreSQL'],
        },
      },
      {
        stageNumber: 2,
        title: 'Python for Data Cleaning & EDA',
        focus: 'Pandas, NumPy, and exploratory data analysis',
        description: 'Reshape untidy datasets, impute missing records, and generate visual distribution plots.',
        skills: ['Python', 'Pandas', 'NumPy', 'EDA', 'Matplotlib'],
        recommendedResourceIds: ['ibm-badge-python-for-data-science', 'kaggle-course-pandas-data-manipulation'],
        resourceLabels: {
          'ibm-badge-python-for-data-science': 'Recommended',
          'kaggle-course-pandas-data-manipulation': 'Practical',
        },
        suggestedProject: {
          title: 'Exploratory Customer Insights Notebook',
          description: 'Clean an unformatted survey dataset and produce executive distribution charts.',
          tech: ['Python', 'Pandas', 'Seaborn'],
        },
      },
      {
        stageNumber: 3,
        title: 'Power BI & Executive Dashboards',
        focus: 'Star schemas, DAX measures, and visual storytelling',
        description: 'Build interactive dashboards in Power BI with star schemas, YoY growth measures, and drill-through filters.',
        skills: ['Power BI', 'DAX', 'Star Schema', 'Data Modeling', 'KPIs'],
        recommendedResourceIds: ['ms-applied-skill-power-bi-data-model'],
        resourceLabels: {
          'ms-applied-skill-power-bi-data-model': 'Recommended',
        },
        suggestedProject: {
          title: 'Executive Financial & Sales Dashboard',
          description: 'Design a real-time Power BI dashboard tracking revenue KPIs, regional sales, and churn forecasts.',
          tech: ['Power BI', 'DAX', 'Power Query'],
        },
      },
    ],
  },

  // 6. DATA SCIENTIST
  'data-scientist': {
    careerId: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data & Analytics',
    description: 'Mathematics, probability, statistics, exploratory data analysis, machine learning, and predictive modeling.',
    difficulty: 'Beginner → Advanced',
    estimatedDuration: '4–6 Months',
    skills: ['Python', 'Math & Stats', 'SQL', 'Scikit-learn', 'Feature Engineering', 'Deep Learning', 'PyTorch'],
    prerequisites: ['Basic calculus and statistics', 'Python fundamentals'],
    roadmapSlug: 'data-scientist',
    stages: [
      {
        stageNumber: 1,
        title: 'Data Wrangling & Statistical Analysis',
        focus: 'Pandas, hypothesis testing, and exploratory analytics',
        description: 'Perform hypothesis testing, calculate confidence intervals, and analyze dataset correlations.',
        skills: ['Python', 'Pandas', 'Statistics', 'Hypothesis Testing', 'NumPy'],
        recommendedResourceIds: ['ibm-badge-python-for-data-science', 'kaggle-course-pandas-data-manipulation'],
        resourceLabels: {
          'ibm-badge-python-for-data-science': 'Recommended',
          'kaggle-course-pandas-data-manipulation': 'Practical',
        },
        suggestedProject: {
          title: 'A/B Testing Statistical Evaluation Engine',
          description: 'Evaluate conversion lift across web test variants using t-tests and p-value significance.',
          tech: ['Python', 'Scipy', 'Pandas'],
        },
      },
      {
        stageNumber: 2,
        title: 'Supervised & Unsupervised Modeling',
        focus: 'Scikit-learn, clustering, and feature engineering',
        description: 'Construct predictive regression and classification pipelines with cross-validation and hyperparameter tuning.',
        skills: ['Scikit-learn', 'Feature Engineering', 'Clustering', 'PCA', 'Model Evaluation'],
        recommendedResourceIds: ['kaggle-course-feature-engineering'],
        resourceLabels: {
          'kaggle-course-feature-engineering': 'Recommended',
        },
        suggestedProject: {
          title: 'Predictive Credit Risk Classifier',
          description: 'Train gradient-boosted decision trees to assess loan default probabilities with SHAP explainability.',
          tech: ['Python', 'Scikit-learn', 'XGBoost', 'SHAP'],
        },
      },
      {
        stageNumber: 3,
        title: 'Deep Learning & Neural Architectures',
        focus: 'Neural networks, PyTorch, and deep representations',
        description: 'Train deep neural networks for tabular, text, and image classification problems.',
        skills: ['PyTorch', 'Deep Learning', 'Neural Networks', 'Keras'],
        recommendedResourceIds: ['kaggle-course-intro-deep-learning', 'nvidia-course-fundamentals-deep-learning'],
        resourceLabels: {
          'kaggle-course-intro-deep-learning': 'Beginner-friendly',
          'nvidia-course-fundamentals-deep-learning': 'Practical',
        },
        suggestedProject: {
          title: 'Deep Neural Sentiment Classifier',
          description: 'Train a deep learning text classifier using embedding layers and regularization.',
          tech: ['PyTorch', 'TensorFlow', 'Python'],
        },
      },
    ],
  },

  // 7. DATA ENGINEER
  'data-engineer': {
    careerId: 'data-engineer',
    title: 'Data Engineer',
    category: 'Data Engineering',
    description: 'Scalable data platforms: SQL mastery, data modeling, ETL/ELT pipelines, Apache Spark, Airflow, and cloud data warehouses.',
    difficulty: 'Beginner → Advanced',
    estimatedDuration: '4–6 Months',
    skills: ['SQL', 'Python', 'BigQuery', 'Microsoft Fabric', 'ETL/ELT', 'Data Warehousing', 'Data Lakehouse', 'Docker'],
    prerequisites: ['SQL proficiency', 'Basic Python', 'Data structures'],
    roadmapSlug: 'data-engineer',
    stages: [
      {
        stageNumber: 1,
        title: 'Advanced SQL & Data Modeling',
        focus: 'Data warehousing schemas, partitioning, and query optimization',
        description: 'Master relational and dimensional data modeling with star/snowflake schemas and query optimization.',
        skills: ['SQL', 'Relational Databases', 'Data Modeling', 'Partitioning', 'BigQuery'],
        recommendedResourceIds: ['ibm-badge-sql-relational-databases', 'gcp-badge-engineer-data-in-bigquery'],
        resourceLabels: {
          'ibm-badge-sql-relational-databases': 'Recommended',
          'gcp-badge-engineer-data-in-bigquery': 'Practical',
        },
        suggestedProject: {
          title: 'Analytical Data Warehouse & Partitioned Schema',
          description: 'Design a BigQuery data warehouse schema with partitioning and clustering for petabyte query scaling.',
          tech: ['BigQuery', 'SQL', 'Data Modeling'],
        },
      },
      {
        stageNumber: 2,
        title: 'ETL Pipelines & Lakehouse Architecture',
        focus: 'Microsoft Fabric, Data Factory, and Delta Parquet pipelines',
        description: 'Build robust automated data integration pipelines ingesting streaming and batch records into Lakehouses.',
        skills: ['Microsoft Fabric', 'Data Factory', 'Lakehouse', 'ETL / ELT', 'Delta Parquet'],
        recommendedResourceIds: ['ms-applied-skill-data-pipeline-fabric'],
        resourceLabels: {
          'ms-applied-skill-data-pipeline-fabric': 'Recommended',
        },
        suggestedProject: {
          title: 'Automated ELT Lakehouse Ingestion Pipeline',
          description: 'Ingest raw API payloads into a Lakehouse, clean data with transformation notebooks, and store Delta tables.',
          tech: ['Microsoft Fabric', 'Python', 'SQL'],
        },
      },
      {
        stageNumber: 3,
        title: 'Containerization & Pipeline Orchestration',
        focus: 'Docker containerization and pipeline automation',
        description: 'Containerize data workers with Docker and orchestrate scheduled workflow pipelines.',
        skills: ['Docker', 'Containers', 'Linux CLI', 'CI/CD'],
        recommendedResourceIds: ['ibm-badge-docker-essentials', 'linux-foundation-lfs101x'],
        resourceLabels: {
          'ibm-badge-docker-essentials': 'Recommended',
          'linux-foundation-lfs101x': 'Relevant',
        },
        suggestedProject: {
          title: 'Containerized Batch ETL Worker',
          description: 'Package automated database sync workers into Docker containers with error retry queues.',
          tech: ['Docker', 'Python', 'PostgreSQL'],
        },
      },
    ],
  },

  // 8. CLOUD ENGINEER
  'cloud-engineer': {
    careerId: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Cloud Infrastructure',
    description: 'Architect, secure, and operate scalable multi-cloud infrastructure on AWS, Azure, and Google Cloud.',
    difficulty: 'Beginner → Advanced',
    estimatedDuration: '4–6 Months',
    skills: ['AWS', 'Azure', 'Google Cloud', 'Compute', 'Storage', 'VPC Networking', 'IAM', 'Docker'],
    prerequisites: ['Basic operating systems knowledge', 'Networking basics'],
    roadmapSlug: 'cloud-engineer',
    stages: [
      {
        stageNumber: 1,
        title: 'Cloud Foundations & Infrastructure',
        focus: 'Compute, storage, IAM, and networking across AWS and GCP',
        description: 'Understand cloud regions, virtual machines, IAM role permissions, and bucket storage options.',
        skills: ['AWS Services', 'Compute Engine', 'Cloud Storage', 'IAM', 'VPC'],
        recommendedResourceIds: ['aws-skill-builder-cloud-practitioner', 'gcp-badge-cloud-computing-foundations', 'oracle-oci-foundations-associate'],
        resourceLabels: {
          'aws-skill-builder-cloud-practitioner': 'Recommended',
          'gcp-badge-cloud-computing-foundations': 'Relevant',
          'oracle-oci-foundations-associate': 'Optional',
        },
        suggestedProject: {
          title: 'Secure Multi-Tier Cloud VPC Network',
          description: 'Provision virtual machines, private subnets, NAT gateways, and least-privilege IAM roles.',
          tech: ['AWS/GCP', 'VPC', 'IAM', 'Cloud Security'],
        },
      },
      {
        stageNumber: 2,
        title: 'Serverless & Cloud Containers',
        focus: 'AWS Lambda, Azure Container Apps, and microservices',
        description: 'Deploy serverless compute functions and manage scalable containerized apps in the cloud.',
        skills: ['AWS Lambda', 'Azure Container Apps', 'Serverless', 'Docker', 'API Gateway'],
        recommendedResourceIds: ['aws-badge-serverless-developer', 'ms-applied-skill-deploy-containers-aca'],
        resourceLabels: {
          'aws-badge-serverless-developer': 'Recommended',
          'ms-applied-skill-deploy-containers-aca': 'Practical',
        },
        suggestedProject: {
          title: 'Serverless Event-Driven Processing API',
          description: 'Build an AWS Lambda / Azure Container service that automatically processes image uploads asynchronously.',
          tech: ['AWS Lambda', 'S3', 'API Gateway'],
        },
      },
    ],
  },

  // 9. DEVOPS ENGINEER
  'devops-engineer': {
    careerId: 'devops-engineer',
    title: 'DevOps Engineer',
    category: 'DevOps & CI/CD',
    description: 'Automate CI/CD pipelines, container orchestration, Docker, Linux administration, and cloud deployment.',
    difficulty: 'Intermediate → Advanced',
    estimatedDuration: '4–6 Months',
    skills: ['Linux', 'Docker', 'GitHub Actions', 'CI/CD', 'YAML Workflows', 'Azure Container Apps', 'Git'],
    prerequisites: ['Linux terminal comfort', 'Git basics'],
    roadmapSlug: 'devops-engineer',
    stages: [
      {
        stageNumber: 1,
        title: 'Linux Systems & Version Control',
        focus: 'Shell scripting, file permissions, process monitoring, and Git',
        description: 'Master the Linux operating system, automate tasks with Bash, and manage Git release branches.',
        skills: ['Linux CLI', 'Bash', 'Git', 'GitHub', 'Shell Scripting'],
        recommendedResourceIds: ['linux-foundation-lfs101x', 'linux-foundation-git-basics'],
        resourceLabels: {
          'linux-foundation-lfs101x': 'Recommended',
          'linux-foundation-git-basics': 'Relevant',
        },
        suggestedProject: {
          title: 'Automated Server Health & Backup Daemon',
          description: 'Write Bash automation scripts that monitor disk usage, rotate logs, and trigger alert webhooks.',
          tech: ['Linux', 'Bash', 'Cron'],
        },
      },
      {
        stageNumber: 2,
        title: 'Docker Containerization',
        focus: 'Multi-stage Dockerfiles, caching, volumes, and Compose',
        description: 'Package backend applications and database services into lightweight Docker containers.',
        skills: ['Docker', 'Containers', 'Dockerfiles', 'Docker Compose'],
        recommendedResourceIds: ['ibm-badge-docker-essentials'],
        resourceLabels: {
          'ibm-badge-docker-essentials': 'Recommended',
        },
        suggestedProject: {
          title: 'Multi-Container Microservice Stack',
          description: 'Create a multi-container local stack with web API, Redis cache, and PostgreSQL database.',
          tech: ['Docker', 'Docker Compose'],
        },
      },
      {
        stageNumber: 3,
        title: 'CI/CD Pipelines & Cloud Deployment',
        focus: 'GitHub Actions, automated testing, and Azure Container Apps',
        description: 'Build continuous integration pipelines that test, build, and deploy containers on every commit.',
        skills: ['GitHub Actions', 'CI/CD', 'YAML Workflows', 'Azure Container Apps', 'Secrets'],
        recommendedResourceIds: ['github-skills-actions-cicd', 'ms-applied-skill-deploy-containers-aca'],
        resourceLabels: {
          'github-skills-actions-cicd': 'Recommended',
          'ms-applied-skill-deploy-containers-aca': 'Practical',
        },
        suggestedProject: {
          title: 'Automated Zero-Downtime CI/CD Pipeline',
          description: 'Configure a full GitHub Actions workflow that executes test suites and pushes containers to cloud registry.',
          tech: ['GitHub Actions', 'Docker', 'Azure Container Apps'],
        },
      },
    ],
  },

  // 10. CYBERSECURITY
  cybersecurity: {
    careerId: 'cybersecurity',
    title: 'Cybersecurity',
    category: 'Security',
    description: 'Safeguard networks, applications, and cloud assets through threat modeling, ethical hacking, and defense operations.',
    difficulty: 'Beginner → Advanced',
    estimatedDuration: '4–6 Months',
    skills: ['Cybersecurity', 'Threat Defense', 'Networking', 'Wireshark', 'Ethical Hacking', 'Cryptography', 'Linux'],
    prerequisites: ['Basic computing background', 'Curiosity for defense and forensics'],
    roadmapSlug: 'cybersecurity',
    stages: [
      {
        stageNumber: 1,
        title: 'Security Fundamentals & Networking',
        focus: 'The CIA triad, threat vectors, TCP/IP packets, and defense basics',
        description: 'Understand cybersecurity governance, common malware and phishing attacks, and network protocols.',
        skills: ['Cybersecurity', 'Threat Modeling', 'TCP/IP', 'Computer Networks', 'Cryptography'],
        recommendedResourceIds: ['ibm-badge-cybersecurity-fundamentals', 'cisco-course-networking-basics'],
        resourceLabels: {
          'ibm-badge-cybersecurity-fundamentals': 'Recommended',
          'cisco-course-networking-basics': 'Relevant',
        },
        suggestedProject: {
          title: 'Network Packet Inspection & Vulnerability Audit',
          description: 'Analyze network PCAP files with Wireshark to identify unencrypted credentials and anomalies.',
          tech: ['Wireshark', 'TCP/IP', 'Networking'],
        },
      },
      {
        stageNumber: 2,
        title: 'Ethical Hacking & Penetration Testing',
        focus: 'Reconnaissance, vulnerability scanning, and exploit prevention',
        description: 'Explore ethical hacking methodologies, web app security (OWASP Top 10), and port scanning.',
        skills: ['Ethical Hacking', 'Penetration Testing', 'Wireshark', 'Vulnerability Assessment', 'Linux'],
        recommendedResourceIds: ['cisco-course-ethical-hacker', 'linux-foundation-lfs101x'],
        resourceLabels: {
          'cisco-course-ethical-hacker': 'Recommended',
          'linux-foundation-lfs101x': 'Relevant',
        },
        suggestedProject: {
          title: 'Web Application Security Hardening Report',
          description: 'Audit a simulated web app against OWASP Top 10 vulnerabilities (SQLi, XSS) and implement mitigations.',
          tech: ['OWASP', 'Linux', 'Security Controls'],
        },
      },
    ],
  },

  // 11. GENERATIVE AI ENGINEER
  'generative-ai-engineer': {
    careerId: 'generative-ai-engineer',
    title: 'Generative AI Engineer',
    category: 'Artificial Intelligence',
    description: 'Specialize in large language models, prompt engineering, dense vector search, RAG architectures, and AI agent swarms.',
    difficulty: 'Beginner → Advanced',
    estimatedDuration: '4–6 Months',
    skills: ['Generative AI', 'Prompt Engineering', 'Azure AI Foundry', 'Vertex AI', 'RAG', 'AI Agents', 'Gemini API'],
    prerequisites: ['Python basics', 'Basic understanding of LLMs'],
    roadmapSlug: 'generative-ai-engineer',
    stages: [
      {
        stageNumber: 1,
        title: 'LLM Foundations & Prompt Design',
        focus: 'Tokenization, transformers, zero/few-shot prompts, and Vertex AI Studio',
        description: 'Master how generative models produce text and images, and build structured few-shot system prompts.',
        skills: ['Generative AI', 'Prompt Design', 'Vertex AI Studio', 'Gemini API', 'Transformers'],
        recommendedResourceIds: ['gcp-badge-genai-fundamentals', 'gcp-badge-prompt-design-vertex-ai', 'nvidia-course-generative-ai-explained'],
        resourceLabels: {
          'gcp-badge-genai-fundamentals': 'Recommended',
          'gcp-badge-prompt-design-vertex-ai': 'Practical',
          'nvidia-course-generative-ai-explained': 'Beginner-friendly',
        },
        suggestedProject: {
          title: 'Dynamic Prompt Templating & Evaluation Hub',
          description: 'Build a tool that evaluates response consistency across temperature, top-k, and system prompts.',
          tech: ['Python', 'Gemini API', 'Prompt Design'],
        },
      },
      {
        stageNumber: 2,
        title: 'Retrieval-Augmented Generation (RAG)',
        focus: 'Vector embeddings, chunking strategies, and grounded generation',
        description: 'Connect LLMs to custom documentation using dense vector embeddings and Azure OpenAI.',
        skills: ['RAG', 'Azure OpenAI', 'Azure AI Search', 'Vector Embeddings', 'Chunking'],
        recommendedResourceIds: ['ms-applied-skill-rag-azure-openai'],
        resourceLabels: {
          'ms-applied-skill-rag-azure-openai': 'Recommended',
        },
        suggestedProject: {
          title: 'Enterprise PDF RAG Chatbot',
          description: 'Ingest multi-page corporate PDF documents, compute vector embeddings, and ground chat responses.',
          tech: ['Python', 'Azure AI Search', 'FastAPI'],
        },
      },
      {
        stageNumber: 3,
        title: 'Autonomous Multi-Agent Architectures',
        focus: 'Azure AI Foundry, function calling, tool execution, and safety',
        description: 'Construct autonomous AI agents capable of planning, executing external APIs, and validating output safety.',
        skills: ['Azure AI Foundry', 'AI Agents', 'Tool Calling', 'Safety Evaluation'],
        recommendedResourceIds: ['ms-applied-skill-ai-foundry-agents'],
        resourceLabels: {
          'ms-applied-skill-ai-foundry-agents': 'Recommended',
        },
        suggestedProject: {
          title: 'Full Autonomous Support & Code Debugger Agent',
          description: 'Deploy an agent that connects to GitHub APIs, analyzes bug issues, and writes automated fix proposals.',
          tech: ['Python', 'Azure AI Foundry', 'AI Agents'],
        },
      },
    ],
  },

  // 12. FULL STACK DEVELOPER
  'full-stack-developer': {
    careerId: 'full-stack-developer',
    title: 'Full Stack Developer',
    category: 'Software Engineering',
    description: 'End-to-end product delivery: UI engineering, API architecture, authentication, database migrations, CI/CD and deployment.',
    difficulty: 'Beginner → Advanced',
    estimatedDuration: '4–6 Months',
    skills: ['TypeScript', 'React/Next.js', 'Python/FastAPI', 'PostgreSQL', 'Docker', 'AWS', 'GitHub Actions'],
    prerequisites: ['Basic HTML/CSS/JS or Python'],
    roadmapSlug: 'fullstack-developer',
    stages: [
      {
        stageNumber: 1,
        title: 'Backend Services & Database Design',
        focus: 'Relational schemas, SQL queries, and REST APIs',
        description: 'Design normalized SQL databases and build modular server endpoints with validation.',
        skills: ['SQL', 'Relational Databases', 'PostgreSQL', 'REST APIs', 'Java/Python'],
        recommendedResourceIds: ['ibm-badge-sql-relational-databases', 'oracle-java-explorer'],
        resourceLabels: {
          'ibm-badge-sql-relational-databases': 'Recommended',
          'oracle-java-explorer': 'Relevant',
        },
        suggestedProject: {
          title: 'Full-Stack Authentication & CRM API',
          description: 'Develop a PostgreSQL-backed REST API with user registration, password hashing, and JWT tokens.',
          tech: ['FastAPI/Node', 'PostgreSQL', 'JWT'],
        },
      },
      {
        stageNumber: 2,
        title: 'Serverless APIs & Cloud Containers',
        focus: 'AWS Lambda, Docker, and Azure Container Apps',
        description: 'Containerize web applications and deploy serverless event-driven microservices.',
        skills: ['Docker', 'AWS Lambda', 'Azure Container Apps', 'Serverless', 'GitHub Actions'],
        recommendedResourceIds: ['aws-badge-serverless-developer', 'ibm-badge-docker-essentials', 'ms-applied-skill-deploy-containers-aca'],
        resourceLabels: {
          'aws-badge-serverless-developer': 'Recommended',
          'ibm-badge-docker-essentials': 'Beginner-friendly',
          'ms-applied-skill-deploy-containers-aca': 'Practical',
        },
        suggestedProject: {
          title: 'Containerized SaaS Web Application',
          description: 'Deploy a complete full-stack web app with frontend, backend API, and automated GitHub Actions CI/CD.',
          tech: ['Next.js', 'FastAPI', 'Docker', 'PostgreSQL'],
        },
      },
    ],
  },

  // 13. MLOPS ENGINEER
  'mlops-engineer': {
    careerId: 'mlops-engineer',
    title: 'MLOps Engineer',
    category: 'Machine Learning',
    description: 'Production ML engineering: Automated pipelines, Docker, CI/CD, Vertex AI serving, Kubernetes, and model drift monitoring.',
    difficulty: 'Beginner → Advanced',
    estimatedDuration: '4–6 Months',
    skills: ['Python', 'Docker', 'Vertex AI', 'FastAPI', 'GitHub Actions', 'MLflow', 'Pipelines'],
    prerequisites: ['Python intermediate', 'Basic Machine Learning', 'Linux & Git'],
    roadmapSlug: 'mlops-engineer',
    stages: [
      {
        stageNumber: 1,
        title: 'Linux, Git & Containerization',
        focus: 'Bash scripting, version control, and multi-stage Docker builds',
        description: 'Master the Linux filesystem, write shell scripts, and package machine learning code into reproducible Docker images.',
        skills: ['Linux CLI', 'Bash', 'Docker', 'Git', 'GitHub'],
        recommendedResourceIds: ['linux-foundation-lfs101x', 'ibm-badge-docker-essentials', 'linux-foundation-git-basics'],
        resourceLabels: {
          'linux-foundation-lfs101x': 'Recommended',
          'ibm-badge-docker-essentials': 'Practical',
          'linux-foundation-git-basics': 'Beginner-friendly',
        },
        suggestedProject: {
          title: 'Reproducible ML Training Container',
          description: 'Package data preprocessing and Scikit-learn training scripts into a standalone Docker container.',
          tech: ['Docker', 'Python', 'Scikit-learn'],
        },
      },
      {
        stageNumber: 2,
        title: 'Automated CI/CD for Machine Learning',
        focus: 'GitHub Actions, automated model validation, and unit tests',
        description: 'Build CI/CD pipelines that run data validation tests, benchmark model metrics, and build deployable containers.',
        skills: ['GitHub Actions', 'CI/CD', 'Automated Testing', 'YAML Workflows'],
        recommendedResourceIds: ['github-skills-actions-cicd'],
        resourceLabels: {
          'github-skills-actions-cicd': 'Recommended',
        },
        suggestedProject: {
          title: 'Continuous Model Testing & Benchmark Pipeline',
          description: 'Configure GitHub Actions to evaluate regression loss thresholds on pull request triggers before merging.',
          tech: ['GitHub Actions', 'pytest', 'Python'],
        },
      },
      {
        stageNumber: 3,
        title: 'Cloud ML Pipelines & Model Serving',
        focus: 'Vertex AI Pipelines, model registries, and autoscaling endpoints',
        description: 'Orchestrate end-to-end ML workflows on Vertex AI, deploy live prediction endpoints, and monitor data drift.',
        skills: ['Vertex AI', 'Model Serving', 'Pipelines', 'AutoML', 'Monitoring'],
        recommendedResourceIds: ['gcp-badge-build-deploy-ml-solutions'],
        resourceLabels: {
          'gcp-badge-build-deploy-ml-solutions': 'Recommended',
        },
        suggestedProject: {
          title: 'End-to-End Cloud MLOps Pipeline',
          description: 'Deploy a complete Vertex AI pipeline that ingests data, trains models, registers artifacts, and serves endpoints.',
          tech: ['Vertex AI', 'Docker', 'Kubeflow'],
        },
      },
    ],
  },

  // 14. NLP ENGINEER
  'nlp-engineer': {
    careerId: 'nlp-engineer',
    title: 'NLP Engineer',
    category: 'Artificial Intelligence',
    description: 'Text processing & language intelligence: Tokenizers, embeddings, Transformers, Hugging Face, LLMs, and Azure AI Language.',
    difficulty: 'Beginner → Advanced',
    estimatedDuration: '4–6 Months',
    skills: ['Python', 'Azure AI Language', 'NER', 'Sentiment Analysis', 'Transformers', 'Prompt Design', 'Gemini API'],
    prerequisites: ['Python proficiency', 'Basic NLP concepts'],
    roadmapSlug: 'nlp-engineer',
    stages: [
      {
        stageNumber: 1,
        title: 'Text Analytics & Cloud NLP',
        focus: 'Named Entity Recognition (NER), sentiment classification, and key phrase extraction',
        description: 'Analyze unstructured text, extract entities, redact PII, and generate document summaries with Azure AI Language.',
        skills: ['Azure AI Language', 'NER', 'Sentiment Analysis', 'Text Analytics', 'Summarization'],
        recommendedResourceIds: ['ms-applied-skill-azure-ai-language'],
        resourceLabels: {
          'ms-applied-skill-azure-ai-language': 'Recommended',
        },
        suggestedProject: {
          title: 'Automated News Sentiment & Entity Extractor',
          description: 'Build a Python service that pulls live RSS feeds, extracts organizations and locations, and scores sentiment.',
          tech: ['Python', 'Azure AI Language', 'NLP'],
        },
      },
      {
        stageNumber: 2,
        title: 'Generative AI & Prompt Engineering for NLP',
        focus: 'Few-shot prompting, text synthesis, and Gemini models',
        description: 'Design zero-shot and few-shot prompts to extract complex structured JSON from messy text documents.',
        skills: ['Prompt Design', 'Gemini API', 'Vertex AI Studio', 'Generative AI', 'Few-Shot Learning'],
        recommendedResourceIds: ['gcp-badge-prompt-design-vertex-ai', 'gcp-badge-genai-fundamentals'],
        resourceLabels: {
          'gcp-badge-prompt-design-vertex-ai': 'Recommended',
          'gcp-badge-genai-fundamentals': 'Relevant',
        },
        suggestedProject: {
          title: 'Legal Contract Information Extractor',
          description: 'Extract clauses, parties, expiration dates, and liability amounts from contracts into structured schemas.',
          tech: ['Python', 'Gemini API', 'Pydantic'],
        },
      },
    ],
  },

  // 15. COMPUTER VISION ENGINEER
  'computer-vision-engineer': {
    careerId: 'computer-vision-engineer',
    title: 'Computer Vision Engineer',
    category: 'Artificial Intelligence',
    description: 'Visual intelligence: Image processing, OpenCV, deep learning, CNNs, YOLO object detection, and Vision Transformers.',
    difficulty: 'Beginner → Advanced',
    estimatedDuration: '4–6 Months',
    skills: ['Python', 'PyTorch', 'CNNs', 'Transfer Learning', 'Deep Learning', 'GPU Computing'],
    prerequisites: ['Python proficiency', 'Basic linear algebra'],
    roadmapSlug: 'computer-vision-engineer',
    stages: [
      {
        stageNumber: 1,
        title: 'Deep Learning & Convolutional Neural Networks',
        focus: 'PyTorch, CNN feature maps, data augmentation, and GPU training',
        description: 'Train deep neural networks on GPU clusters using PyTorch and apply transfer learning with pre-trained backbones.',
        skills: ['PyTorch', 'Deep Learning', 'CNNs', 'Transfer Learning', 'CUDA GPUs'],
        recommendedResourceIds: ['nvidia-course-fundamentals-deep-learning', 'kaggle-course-intro-deep-learning'],
        resourceLabels: {
          'nvidia-course-fundamentals-deep-learning': 'Recommended',
          'kaggle-course-intro-deep-learning': 'Beginner-friendly',
        },
        suggestedProject: {
          title: 'Automated Medical Image Classifier',
          description: 'Train a CNN in PyTorch using transfer learning (ResNet) to classify chest X-ray images with 92%+ precision.',
          tech: ['PyTorch', 'CUDA', 'Torchvision'],
        },
      },
      {
        stageNumber: 2,
        title: 'Multimodal Vision with Generative AI',
        focus: 'Vision Transformers, multimodal prompts, and object understanding',
        description: 'Combine visual perception with generative models to answer complex visual questions and process document images.',
        skills: ['Multimodal AI', 'Gemini API', 'Vertex AI Studio', 'Prompt Design'],
        recommendedResourceIds: ['gcp-badge-prompt-design-vertex-ai', 'nvidia-course-generative-ai-explained'],
        resourceLabels: {
          'gcp-badge-prompt-design-vertex-ai': 'Practical',
          'nvidia-course-generative-ai-explained': 'Relevant',
        },
        suggestedProject: {
          title: 'Visual Quality Inspection Assistant',
          description: 'Analyze real-time camera captures of assembled parts and output highlighted defect coordinates.',
          tech: ['Python', 'OpenCV', 'Gemini Multimodal API'],
        },
      },
    ],
  },

  // 16. BI ANALYST
  'bi-analyst': {
    careerId: 'bi-analyst',
    title: 'BI Analyst',
    category: 'Data & Analytics',
    description: 'Business intelligence & executive dashboards: Excel, SQL analytics, Power Query, Star schema modeling, DAX measures, and Power BI.',
    difficulty: 'Beginner → Advanced',
    estimatedDuration: '3–5 Months',
    skills: ['Power BI', 'DAX', 'SQL', 'Star Schema', 'Data Modeling', 'Power Query', 'KPIs', 'Microsoft Fabric'],
    prerequisites: ['Basic spreadsheet familiarity', 'Analytical aptitude'],
    roadmapSlug: 'bi-analyst',
    stages: [
      {
        stageNumber: 1,
        title: 'SQL Data Extraction & Relational Modeling',
        focus: 'Multi-table JOINs, aggregations, and dimensional star schemas',
        description: 'Write complex SQL queries to extract business metrics and design normalized fact and dimension tables.',
        skills: ['SQL', 'Relational Databases', 'JOINs', 'Aggregations', 'Database Design'],
        recommendedResourceIds: ['ibm-badge-sql-relational-databases'],
        resourceLabels: {
          'ibm-badge-sql-relational-databases': 'Recommended',
        },
        suggestedProject: {
          title: 'Multi-Store Retail SQL Analytics Model',
          description: 'Write optimized SQL queries across inventory, transaction, and customer tables to extract gross margins.',
          tech: ['PostgreSQL', 'SQL'],
        },
      },
      {
        stageNumber: 2,
        title: 'Power BI Modeling & DAX Measures',
        focus: 'Star schemas, relationship cardinalities, and time-intelligence DAX',
        description: 'Build enterprise data models in Power BI, author complex DAX calculation measures, and configure row-level security.',
        skills: ['Power BI', 'DAX', 'Star Schema', 'Data Modeling', 'Power Query'],
        recommendedResourceIds: ['ms-applied-skill-power-bi-data-model'],
        resourceLabels: {
          'ms-applied-skill-power-bi-data-model': 'Recommended',
        },
        suggestedProject: {
          title: 'Executive Financial Growth & KPI Dashboard',
          description: 'Create an interactive Power BI report with YoY revenue comparisons, customer cohort drill-throughs, and dynamic filters.',
          tech: ['Power BI', 'DAX', 'Power Query'],
        },
      },
      {
        stageNumber: 3,
        title: 'Cloud Lakehouses & Microsoft Fabric',
        focus: 'Microsoft Fabric, Data Factory, and Delta Lake reporting',
        description: 'Connect Power BI directly to Microsoft Fabric Lakehouses and create automated ETL refresh schedules.',
        skills: ['Microsoft Fabric', 'Data Factory', 'Lakehouse', 'ETL / ELT'],
        recommendedResourceIds: ['ms-applied-skill-data-pipeline-fabric'],
        resourceLabels: {
          'ms-applied-skill-data-pipeline-fabric': 'Recommended',
        },
        suggestedProject: {
          title: 'End-to-End Cloud BI Pipeline',
          description: 'Ingest raw data with Microsoft Fabric pipelines and build direct-lake Power BI executive reports.',
          tech: ['Microsoft Fabric', 'Power BI', 'Delta Lake'],
        },
      },
    ],
  },
};

export function getDetailedCareerPath(careerId: CareerPathId): DetailedCareerPath | undefined {
  return DETAILED_CAREER_PATHS[careerId];
}
