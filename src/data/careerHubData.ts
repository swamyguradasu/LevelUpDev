export type ResourceType =
  | 'COURSE'
  | 'LEARNING PATH'
  | 'CERTIFICATE'
  | 'CERTIFICATION'
  | 'SKILL BADGE'
  | 'APPLIED SKILL'
  | 'HANDS-ON LAB'
  | 'PRACTICAL CREDENTIAL';

export type CostStatus =
  | 'FREE'
  | 'FREE TRAINING'
  | 'FREE CREDENTIAL'
  | 'FREE WITH ELIGIBILITY'
  | 'PAID EXAM'
  | 'PAID'
  | 'CHECK PROVIDER';

export type Provider =
  | 'Microsoft'
  | 'Google Cloud'
  | 'IBM'
  | 'AWS'
  | 'Oracle'
  | 'Cisco'
  | 'NVIDIA'
  | 'Linux Foundation'
  | 'GitHub'
  | 'Kaggle'
  | 'Meta'
  | 'Other';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface CareerHubResource {
  id: string;
  title: string;
  provider: Provider;
  resourceType: ResourceType;
  costStatus: CostStatus;
  difficulty: DifficultyLevel;
  careers: string[];
  skills: string[];
  description: string;
  duration?: string;
  officialUrl: string;
  credentialBadge?: string;
  learningOutcomes: string[];
  prerequisites: string[];
  whyItMatters: string;
  featured?: boolean;
  isFreeOpportunity?: boolean;
  providerBadgeColor?: string;
}

export const CAREER_CATEGORIES = [
  'All Careers',
  'AI Engineer',
  'ML Engineer',
  'Software Engineer',
  'Python Developer',
  'Full Stack Developer',
  'Data Analyst',
  'Data Scientist',
  'Data Engineer',
  'Cloud Engineer',
  'DevOps Engineer',
  'Cybersecurity',
  'MLOps Engineer',
  'Generative AI Engineer',
  'NLP Engineer',
  'Computer Vision Engineer',
  'BI Analyst',
] as const;

export const RESOURCE_TYPE_GLOSSARY = [
  {
    type: 'COURSE',
    label: 'Course',
    description: 'Learn a specific skill or technology through structured lessons, videos, and guided exercises.',
    badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  },
  {
    type: 'LEARNING PATH',
    label: 'Learning Path',
    description: 'A curated multi-module progression designed to build end-to-end domain proficiency.',
    badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  },
  {
    type: 'CERTIFICATE',
    label: 'Certificate',
    description: 'Proof of completing a learning program or course sequence from a recognized provider.',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  },
  {
    type: 'CERTIFICATION',
    label: 'Certification',
    description: 'Formal industry credential validating specialized knowledge & competency, usually via a proctored exam.',
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  },
  {
    type: 'SKILL BADGE',
    label: 'Skill Badge',
    description: 'Shareable verifiable digital badge demonstrating practical completion of a defined technical milestone.',
    badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  },
  {
    type: 'APPLIED SKILL',
    label: 'Applied Skill',
    description: 'Scenario-based, hands-on lab credential directly evaluated in realistic interactive cloud/code environments.',
    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  },
  {
    type: 'HANDS-ON LAB',
    label: 'Hands-on Lab',
    description: 'Practice and troubleshoot in interactive live cloud environments, sandbox consoles, or browser shells.',
    badge: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
  },
  {
    type: 'PRACTICAL CREDENTIAL',
    label: 'Practical Credential',
    description: 'Performance-tested assessment validating real-world project delivery and technical capabilities.',
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  },
];

export const CAREER_HUB_RESOURCES: CareerHubResource[] = [
  // ==========================================
  // MICROSOFT
  // ==========================================
  {
    id: 'ms-applied-skill-ai-foundry-agents',
    title: 'Develop AI Agents with Microsoft Azure AI Foundry',
    provider: 'Microsoft',
    resourceType: 'APPLIED SKILL',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Intermediate',
    careers: ['AI Engineer', 'Generative AI Engineer', 'Python Developer'],
    skills: ['Azure AI Foundry', 'AI Agents', 'Prompt Flow', 'LLM Integration', 'Python'],
    description:
      'Prove your ability to develop, test, and evaluate custom autonomous AI agents using Azure AI Foundry and prompt engineering.',
    duration: '2-3 Hours Lab Assessment',
    officialUrl: 'https://learn.microsoft.com/en-us/credentials/applied-skills/develop-ai-agents-with-azure-ai-foundry/',
    credentialBadge: 'Verified Microsoft Applied Skill',
    learningOutcomes: [
      'Create and configure custom AI agent solutions with Azure AI Foundry.',
      'Implement multi-turn agent reasoning and tool integrations.',
      'Evaluate agent output safety, grounding, and response accuracy.',
    ],
    prerequisites: ['Basic Python knowledge', 'Understanding of generative AI and LLM APIs'],
    whyItMatters:
      'Microsoft Applied Skills are verifiable, scenario-based credentials earned by completing live hands-on labs directly inside Azure environments.',
    featured: true,
    isFreeOpportunity: true,
  },
  {
    id: 'ms-applied-skill-rag-azure-openai',
    title: 'Implement Retrieval-Augmented Generation (RAG) with Azure OpenAI',
    provider: 'Microsoft',
    resourceType: 'APPLIED SKILL',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Intermediate',
    careers: ['AI Engineer', 'Generative AI Engineer', 'Data Scientist'],
    skills: ['Azure OpenAI', 'RAG', 'Azure AI Search', 'Vector Embeddings', 'Python'],
    description:
      'Demonstrate your ability to ground LLMs on proprietary data using Azure AI Search vector indexing and Azure OpenAI.',
    duration: '2 Hours Lab Assessment',
    officialUrl: 'https://learn.microsoft.com/en-us/credentials/applied-skills/build-a-rag-solution-with-azure-ai-search-and-azure-openai-service/',
    credentialBadge: 'Verified Microsoft Applied Skill',
    learningOutcomes: [
      'Set up Azure AI Search vector index with hybrid search and chunking.',
      'Generate dense vector embeddings using OpenAI embedding models.',
      'Integrate grounded search responses with conversational chat interfaces.',
    ],
    prerequisites: ['Python basics', 'Vector search concepts'],
    whyItMatters:
      'RAG is the standard production architecture for enterprise generative AI applications.',
    featured: true,
    isFreeOpportunity: true,
  },
  {
    id: 'ms-applied-skill-deploy-containers-aca',
    title: 'Deploy and Configure Cloud-Native Apps with Azure Container Apps',
    provider: 'Microsoft',
    resourceType: 'APPLIED SKILL',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Intermediate',
    careers: ['DevOps Engineer', 'Cloud Engineer', 'Software Engineer', 'Full Stack Developer'],
    skills: ['Docker', 'Azure Container Apps', 'Microservices', 'KEDA Scaling', 'CI/CD'],
    description:
      'Validate hands-on proficiency in building serverless containerized microservices with dynamic scaling and secure networking.',
    duration: '2 Hours Lab Assessment',
    officialUrl: 'https://learn.microsoft.com/en-us/credentials/applied-skills/deploy-and-configure-azure-container-apps/',
    credentialBadge: 'Verified Microsoft Applied Skill',
    learningOutcomes: [
      'Deploy container images from container registries to Azure Container Apps.',
      'Configure auto-scaling triggers using KEDA and HTTP traffic.',
      'Implement custom domain routing, HTTPS, and environment secrets.',
    ],
    prerequisites: ['Docker basics', 'Basic cloud hosting fundamentals'],
    whyItMatters:
      'Serverless containers are replacing heavy infrastructure management across modern cloud engineering teams.',
    featured: false,
    isFreeOpportunity: true,
  },
  {
    id: 'ms-cert-ai-fundamentals-ai900',
    title: 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
    provider: 'Microsoft',
    resourceType: 'CERTIFICATION',
    costStatus: 'FREE TRAINING',
    difficulty: 'Beginner',
    careers: ['AI Engineer', 'ML Engineer', 'Data Analyst', 'Data Scientist'],
    skills: ['Machine Learning', 'Computer Vision', 'Natural Language Processing', 'Generative AI', 'Responsible AI'],
    description:
      'Master fundamental AI and ML concepts including computer vision, conversational AI, generative AI, and responsible AI principles.',
    duration: '10-12 Hours Free Training',
    officialUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/',
    credentialBadge: 'Microsoft Certification',
    learningOutcomes: [
      'Understand core AI workloads and machine learning fundamentals.',
      'Identify computer vision, NLP, and document intelligence capabilities.',
      'Explore Azure OpenAI and responsible AI best practices.',
    ],
    prerequisites: ['No prior programming required; general tech curiosity.'],
    whyItMatters:
      'The foundational credential recognized globally for understanding modern enterprise AI capabilities.',
    featured: false,
    isFreeOpportunity: false,
  },
  {
    id: 'ms-learning-path-python-beginners',
    title: 'Python for Beginners: Step-by-Step Learning Path',
    provider: 'Microsoft',
    resourceType: 'LEARNING PATH',
    costStatus: 'FREE',
    difficulty: 'Beginner',
    careers: ['Python Developer', 'Software Engineer', 'Data Analyst', 'AI Engineer'],
    skills: ['Python 3', 'Data Structures', 'Functions', 'File I/O', 'OOP Basics'],
    description:
      'Complete interactive browser-based Python learning path covering strings, math, booleans, lists, loops, and modular code.',
    duration: '5 Hours Self-Paced',
    officialUrl: 'https://learn.microsoft.com/en-us/training/paths/python-language/',
    credentialBadge: 'Microsoft Learn Trophies',
    learningOutcomes: [
      'Write and execute Python scripts directly in sandbox notebooks.',
      'Manipulate complex nested dictionaries, lists, and string formatting.',
      'Build reusable functions, error handling, and file operations.',
    ],
    prerequisites: ['None - perfect starting point for absolute beginners.'],
    whyItMatters:
      '100% free with interactive sandbox execution and verifiable progress trophies.',
    featured: false,
    isFreeOpportunity: true,
  },

  // ==========================================
  // GOOGLE CLOUD & GOOGLE
  // ==========================================
  {
    id: 'gcp-badge-genai-fundamentals',
    title: 'Introduction to Generative AI Learning Path & Skill Badge',
    provider: 'Google Cloud',
    resourceType: 'SKILL BADGE',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Beginner',
    careers: ['Generative AI Engineer', 'AI Engineer', 'Data Scientist', 'Software Engineer'],
    skills: ['Generative AI', 'Large Language Models', 'Prompt Engineering', 'Gemini', 'Responsible AI'],
    description:
      'Earn an official Google Cloud digital skill badge by completing 5 foundational courses on GenAI, LLMs, and Responsible AI.',
    duration: '4-6 Hours Self-Paced',
    officialUrl: 'https://www.cloudskillsboost.google/course_templates/536',
    credentialBadge: 'Google Cloud Digital Skill Badge',
    learningOutcomes: [
      'Understand how LLMs work, tokenization, and transformer architectures.',
      'Master prompt engineering techniques and temperature parameters.',
      'Apply Google Cloud Responsible AI guidelines and evaluation metrics.',
    ],
    prerequisites: ['Basic understanding of software concepts.'],
    whyItMatters:
      'Verifiable badge on Google Cloud Skills Boost that can be shared directly on LinkedIn and developer portfolios.',
    featured: true,
    isFreeOpportunity: true,
  },
  {
    id: 'gcp-badge-build-deploy-ml-solutions',
    title: 'Build and Deploy Machine Learning Solutions on Vertex AI',
    provider: 'Google Cloud',
    resourceType: 'SKILL BADGE',
    costStatus: 'FREE TRAINING',
    difficulty: 'Intermediate',
    careers: ['ML Engineer', 'MLOps Engineer', 'Data Scientist', 'AI Engineer'],
    skills: ['Vertex AI', 'AutoML', 'Custom Training', 'Model Serving', 'Pipelines'],
    description:
      'Hands-on quest and assessment lab teaching model training, custom Docker containers on Vertex AI, and live endpoint deployment.',
    duration: '10 Hours Guided Labs',
    officialUrl: 'https://www.cloudskillsboost.google/quests/183',
    credentialBadge: 'Google Cloud Vertex AI Skill Badge',
    learningOutcomes: [
      'Train custom TensorFlow and PyTorch models on Vertex AI Workbench.',
      'Deploy scalable prediction endpoints with autoscaling and traffic splitting.',
      'Orchestrate end-to-end ML pipelines with Kubeflow on Vertex Pipelines.',
    ],
    prerequisites: ['Python intermediate', 'Basic Machine Learning with Scikit-learn'],
    whyItMatters:
      'Vertex AI is one of the premier enterprise ML platforms used by high-scale AI engineering teams.',
    featured: false,
    isFreeOpportunity: false,
  },
  {
    id: 'gcp-badge-cloud-computing-foundations',
    title: 'Google Cloud Computing Foundations Certificate',
    provider: 'Google Cloud',
    resourceType: 'CERTIFICATE',
    costStatus: 'FREE TRAINING',
    difficulty: 'Beginner',
    careers: ['Cloud Engineer', 'DevOps Engineer', 'Software Engineer', 'Data Engineer'],
    skills: ['Cloud Computing', 'Compute Engine', 'Cloud Storage', 'IAM', 'BigQuery'],
    description:
      'Foundational curriculum covering cloud architecture, virtual machines, networking, cloud database storage, and identity management.',
    duration: '16 Hours',
    officialUrl: 'https://www.cloudskillsboost.google/paths/11',
    credentialBadge: 'Google Cloud Completion Certificate',
    learningOutcomes: [
      'Provision and manage virtual machines and VPC networks.',
      'Configure bucket storage, permissions, and service accounts.',
      'Run SQL analytics with Google BigQuery.',
    ],
    prerequisites: ['Basic computer science literacy.'],
    whyItMatters:
      'Gives students hands-on familiarity with the Google Cloud Console and CLI without setup friction.',
    featured: false,
    isFreeOpportunity: false,
  },
  {
    id: 'gcp-badge-prompt-design-vertex-ai',
    title: 'Prompt Design in Vertex AI - Hands-on Skill Badge',
    provider: 'Google Cloud',
    resourceType: 'SKILL BADGE',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Intermediate',
    careers: ['Generative AI Engineer', 'AI Engineer', 'NLP Engineer'],
    skills: ['Gemini API', 'Prompt Design', 'Few-Shot Learning', 'Multimodal AI', 'Vertex AI Studio'],
    description:
      'Perform hands-on lab challenges using Vertex AI Studio and Gemini models to design, test, and optimize zero-shot and few-shot prompts.',
    duration: '3-4 Hours Assessment Labs',
    officialUrl: 'https://www.cloudskillsboost.google/course_templates/976',
    credentialBadge: 'Google Cloud Prompt Design Badge',
    learningOutcomes: [
      'Craft zero-shot, few-shot, and chain-of-thought system prompts.',
      'Tune temperature, top-k, and top-p sampling hyper-parameters.',
      'Process multimodal inputs (text + images) with Gemini 1.5 Pro.',
    ],
    prerequisites: ['Understanding of AI generation principles.'],
    whyItMatters:
      'Direct hands-on test inside real Google Cloud consoles demonstrating practical prompt optimization.',
    featured: true,
    isFreeOpportunity: true,
  },

  // ==========================================
  // AWS (AMAZON WEB SERVICES)
  // ==========================================
  {
    id: 'aws-skill-builder-cloud-practitioner',
    title: 'AWS Cloud Practitioner Essentials',
    provider: 'AWS',
    resourceType: 'COURSE',
    costStatus: 'FREE',
    difficulty: 'Beginner',
    careers: ['Cloud Engineer', 'Software Engineer', 'DevOps Engineer', 'Cybersecurity'],
    skills: ['AWS Services', 'EC2', 'S3', 'VPC', 'IAM', 'Cloud Security'],
    description:
      'Official introductory course from AWS experts covering core cloud infrastructure, security, architecture, pricing, and support models.',
    duration: '6 Hours Self-Paced',
    officialUrl: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials',
    credentialBadge: 'AWS Skill Builder Badge',
    learningOutcomes: [
      'Define what the cloud is and understand the global AWS infrastructure.',
      'Identify AWS Compute (EC2, Lambda), Storage (S3, EBS), and Database (RDS, DynamoDB) options.',
      'Understand the AWS Shared Responsibility Security Model.',
    ],
    prerequisites: ['General technical interest.'],
    whyItMatters:
      'The definitive free starting point for any engineer targeting AWS cloud certifications and architecture.',
    featured: false,
    isFreeOpportunity: true,
  },
  {
    id: 'aws-badge-serverless-developer',
    title: 'AWS Educate: Getting Started with Serverless',
    provider: 'AWS',
    resourceType: 'SKILL BADGE',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Intermediate',
    careers: ['Software Engineer', 'Full Stack Developer', 'Cloud Engineer', 'Python Developer'],
    skills: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Serverless', 'Node.js/Python'],
    description:
      'Build and deploy serverless event-driven microservices using AWS Lambda and Amazon API Gateway with no credit card required on AWS Educate.',
    duration: '4 Hours',
    officialUrl: 'https://aws.amazon.com/education/awseducate/',
    credentialBadge: 'Credly Digital Badge (AWS Educate)',
    learningOutcomes: [
      'Create and trigger serverless AWS Lambda functions.',
      'Connect REST APIs via Amazon API Gateway.',
      'Store and query non-relational document data in Amazon DynamoDB.',
    ],
    prerequisites: ['Basic JavaScript or Python.'],
    whyItMatters:
      'Free access for students via AWS Educate with verifiable Credly digital badges and zero cloud bill risk.',
    featured: true,
    isFreeOpportunity: true,
  },
  {
    id: 'aws-learning-path-machine-learning-foundations',
    title: 'AWS Machine Learning Foundations & SageMaker Overview',
    provider: 'AWS',
    resourceType: 'LEARNING PATH',
    costStatus: 'FREE',
    difficulty: 'Intermediate',
    careers: ['ML Engineer', 'Data Scientist', 'AI Engineer'],
    skills: ['Amazon SageMaker', 'Machine Learning', 'Data Preprocessing', 'Model Deployment'],
    description:
      'Comprehensive learning path covering the end-to-end ML lifecycle from exploratory analysis to building models with Amazon SageMaker.',
    duration: '8 Hours',
    officialUrl: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/10904/machine-learning-learning-plan',
    credentialBadge: 'AWS Skill Builder Learning Plan',
    learningOutcomes: [
      'Formulate business problems into supervised and unsupervised ML problems.',
      'Train, fine-tune, and host models on Amazon SageMaker.',
      'Monitor inference metrics and latency.',
    ],
    prerequisites: ['Basic Python and statistics.'],
    whyItMatters:
      'Provides high-level knowledge of AWS AI/ML services used extensively in enterprise deployments.',
    featured: false,
    isFreeOpportunity: true,
  },

  // ==========================================
  // IBM
  // ==========================================
  {
    id: 'ibm-badge-python-for-data-science',
    title: 'Python for Data Science and AI - IBM Credly Badge',
    provider: 'IBM',
    resourceType: 'SKILL BADGE',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Beginner',
    careers: ['Data Analyst', 'Data Scientist', 'Python Developer', 'AI Engineer'],
    skills: ['Python', 'Pandas', 'NumPy', 'Data Analysis', 'Jupyter Notebooks', 'REST APIs'],
    description:
      'Learn Python programming from fundamentals to real data analysis using Pandas and NumPy, earning a verifiable IBM Credly digital badge.',
    duration: '15-20 Hours',
    officialUrl: 'https://skillsbuild.org/students',
    credentialBadge: 'IBM Credly Digital Badge',
    learningOutcomes: [
      'Master Python syntax, logic branching, collections, and file operations.',
      'Load, clean, and transform data using Pandas DataFrames and Series.',
      'Perform high-performance numerical array operations with NumPy.',
    ],
    prerequisites: ['No prior programming background required.'],
    whyItMatters:
      'IBM SkillsBuild is completely free for students and issues verifiable badges indexed on Credly.',
    featured: true,
    isFreeOpportunity: true,
  },
  {
    id: 'ibm-badge-cybersecurity-fundamentals',
    title: 'IBM Cybersecurity Fundamentals & Threat Defense',
    provider: 'IBM',
    resourceType: 'SKILL BADGE',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Beginner',
    careers: ['Cybersecurity', 'DevOps Engineer', 'Cloud Engineer'],
    skills: ['Cybersecurity', 'Threat Modeling', 'Cryptography', 'Network Security', 'Incident Response'],
    description:
      'Explore core cybersecurity principles, the CIA triad, common attack vectors, security governance, and incident response tactics.',
    duration: '12 Hours',
    officialUrl: 'https://skillsbuild.org/students',
    credentialBadge: 'IBM Credly Digital Badge',
    learningOutcomes: [
      'Understand the CIA triad (Confidentiality, Integrity, Availability) and access control.',
      'Identify malware, phishing, denial of service, and injection threats.',
      'Analyze network defense concepts including firewalls, SIEM, and SOC operations.',
    ],
    prerequisites: ['Basic IT literacy.'],
    whyItMatters:
      'Widely recognized entry-level badge demonstrating baseline cybersecurity readiness.',
    featured: false,
    isFreeOpportunity: true,
  },
  {
    id: 'ibm-badge-sql-relational-databases',
    title: 'SQL and Relational Databases 101',
    provider: 'IBM',
    resourceType: 'SKILL BADGE',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Beginner',
    careers: ['Data Analyst', 'Data Engineer', 'Software Engineer', 'BI Analyst', 'Full Stack Developer'],
    skills: ['SQL', 'Relational Databases', 'JOINs', 'Aggregations', 'Database Design', 'PostgreSQL/MySQL'],
    description:
      'Master relational database fundamentals, SQL queries, DDL/DML, multi-table JOINs, subqueries, and table normalization.',
    duration: '8 Hours',
    officialUrl: 'https://cognitiveclass.ai/courses/learn-sql-relational-databases',
    credentialBadge: 'Cognitive Class / IBM Badge',
    learningOutcomes: [
      'Write complex SELECT statements with GROUP BY, HAVING, and WHERE clauses.',
      'Connect tables using INNER, LEFT, RIGHT, and FULL OUTER JOINs.',
      'Design relational schemas with primary and foreign key constraints.',
    ],
    prerequisites: ['None.'],
    whyItMatters:
      'SQL is the #1 mandatory skill required across Data Analysts, Backend Engineers, and Data Scientists.',
    featured: true,
    isFreeOpportunity: true,
  },

  // ==========================================
  // CISCO NETWORKING ACADEMY
  // ==========================================
  {
    id: 'cisco-course-python-essentials-1',
    title: 'Python Essentials 1: Fundamentals & OpenEDG Prep',
    provider: 'Cisco',
    resourceType: 'CERTIFICATE',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Beginner',
    careers: ['Python Developer', 'Software Engineer', 'Data Analyst', 'DevOps Engineer'],
    skills: ['Python 3', 'Control Flow', 'Lists', 'Functions', 'PCEP Exam Prep'],
    description:
      'Official Cisco Networking Academy course designed in partnership with the Python Institute, preparing students for the PCEP certification.',
    duration: '30 Hours Self-Paced',
    officialUrl: 'https://www.skillsforall.com/course/python-essentials-1',
    credentialBadge: 'Cisco Skills for All Digital Badge',
    learningOutcomes: [
      'Master data types, variables, input/output, and bitwise operations.',
      'Control program execution with loops, conditionals, and logical operators.',
      'Define modular reusable functions with parameter scoping.',
    ],
    prerequisites: ['None.'],
    whyItMatters:
      '100% free with lab environment, interactive quizzes, and downloadable certificate of completion + Credly badge.',
    featured: true,
    isFreeOpportunity: true,
  },
  {
    id: 'cisco-course-networking-basics',
    title: 'Networking Basics: Computer Communications & Protocols',
    provider: 'Cisco',
    resourceType: 'CERTIFICATE',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Beginner',
    careers: ['Software Engineer', 'DevOps Engineer', 'Cloud Engineer', 'Cybersecurity'],
    skills: ['Computer Networks', 'TCP/IP', 'OSI Model', 'IP Addressing', 'DNS', 'HTTP/HTTPS'],
    description:
      'Understand how devices communicate over local networks and the internet, OSI layer operations, subnetting, and network protocols.',
    duration: '22 Hours',
    officialUrl: 'https://www.skillsforall.com/course/networking-basics',
    credentialBadge: 'Cisco Digital Badge',
    learningOutcomes: [
      'Explain the 7 layers of the OSI model and 4 layers of TCP/IP.',
      'Understand IPv4/IPv6 addressing, subnet masks, and default gateways.',
      'Analyze routing, switches, routers, and application protocols like HTTP, DNS, DHCP.',
    ],
    prerequisites: ['None.'],
    whyItMatters:
      'Essential systems knowledge for backend developers, DevOps engineers, and placement technical interviews.',
    featured: false,
    isFreeOpportunity: true,
  },
  {
    id: 'cisco-course-ethical-hacker',
    title: 'Junior Cybersecurity Analyst / Ethical Hacker Path',
    provider: 'Cisco',
    resourceType: 'LEARNING PATH',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Intermediate',
    careers: ['Cybersecurity', 'Cloud Engineer', 'DevOps Engineer'],
    skills: ['Ethical Hacking', 'Penetration Testing', 'Wireshark', 'Vulnerability Assessment', 'Linux'],
    description:
      'Explore offensive and defensive security strategies, reconnaissance, scanning, vulnerability management, and exploit mitigation.',
    duration: '70 Hours',
    officialUrl: 'https://www.skillsforall.com/course/ethical-hacker',
    credentialBadge: 'Cisco Credly Badge',
    learningOutcomes: [
      'Perform network reconnaissance and traffic inspection with Wireshark.',
      'Identify common web application vulnerabilities (SQLi, XSS, CSRF).',
      'Understand security controls and ethical penetration testing methodologies.',
    ],
    prerequisites: ['Networking basics', 'Linux fundamentals'],
    whyItMatters:
      'High-rigor free training program that produces industry-ready security analyst skills.',
    featured: false,
    isFreeOpportunity: true,
  },

  // ==========================================
  // NVIDIA DEEP LEARNING INSTITUTE (DLI)
  // ==========================================
  {
    id: 'nvidia-course-fundamentals-deep-learning',
    title: 'Fundamentals of Deep Learning',
    provider: 'NVIDIA',
    resourceType: 'CERTIFICATE',
    costStatus: 'PAID',
    difficulty: 'Intermediate',
    careers: ['ML Engineer', 'Computer Vision Engineer', 'NLP Engineer', 'Data Scientist'],
    skills: ['Deep Learning', 'PyTorch', 'CNNs', 'Transfer Learning', 'CUDA GPUs'],
    description:
      'Hands-on course on GPU-accelerated computing using PyTorch to train computer vision and natural language deep neural networks.',
    duration: '8 Hours Hands-on Labs',
    officialUrl: 'https://www.nvidia.com/en-us/training/instructor-led-workshops/fundamentals-of-deep-learning/',
    credentialBadge: 'NVIDIA DLI Certificate of Competency',
    learningOutcomes: [
      'Train deep neural networks and evaluate loss curves.',
      'Build convolutional neural networks for image classification.',
      'Leverage pre-trained models with transfer learning on GPU clusters.',
    ],
    prerequisites: ['Python proficiency', 'Basic linear algebra and calculus'],
    whyItMatters:
      'The industry benchmark for GPU-accelerated AI engineering and deep learning competency.',
    featured: false,
    isFreeOpportunity: false,
  },
  {
    id: 'nvidia-course-generative-ai-explained',
    title: 'Generative AI Explained: Architecture & Foundations',
    provider: 'NVIDIA',
    resourceType: 'COURSE',
    costStatus: 'FREE',
    difficulty: 'Beginner',
    careers: ['AI Engineer', 'Generative AI Engineer', 'Data Scientist'],
    skills: ['Generative AI', 'Diffusion Models', 'Transformers', 'LLMs', 'GPU Computing'],
    description:
      'Official NVIDIA self-paced course breaking down the mechanics of Generative AI, GANs, diffusion models, and transformer architectures.',
    duration: '2 Hours Self-Paced',
    officialUrl: 'https://www.nvidia.com/en-us/training/online/',
    credentialBadge: 'NVIDIA Course Completion',
    learningOutcomes: [
      'Understand the evolutionary trajectory of generative AI architectures.',
      'Explain text generation, image diffusion, and audio synthesis pipelines.',
      'Identify enterprise applications and hardware acceleration requirements.',
    ],
    prerequisites: ['Basic understanding of machine learning concepts.'],
    whyItMatters:
      'Concise, expert overview directly from the pioneers of AI hardware acceleration.',
    featured: true,
    isFreeOpportunity: true,
  },

  // ==========================================
  // LINUX FOUNDATION
  // ==========================================
  {
    id: 'linux-foundation-lfs101x',
    title: 'Introduction to Linux (LFS101x)',
    provider: 'Linux Foundation',
    resourceType: 'COURSE',
    costStatus: 'FREE',
    difficulty: 'Beginner',
    careers: ['Software Engineer', 'DevOps Engineer', 'Cloud Engineer', 'MLOps Engineer', 'Python Developer', 'Cybersecurity'],
    skills: ['Linux CLI', 'Bash', 'File Permissions', 'Package Management', 'Process Management', 'Shell Scripting'],
    description:
      'The official introductory Linux course created by the Linux Foundation. Covers command line navigation, user administration, and shell scripting.',
    duration: '40 Hours Self-Paced',
    officialUrl: 'https://training.linuxfoundation.org/training/introduction-to-linux/',
    credentialBadge: 'Linux Foundation Audit Access',
    learningOutcomes: [
      'Navigate the Linux filesystem and manipulate files via Bash commands.',
      'Configure file permissions (chmod, chown) and process signals.',
      'Write automated Bash shell scripts for routine developer workflows.',
    ],
    prerequisites: ['None.'],
    whyItMatters:
      'Linux is the operating system powering 96% of the top 1M web servers and all cloud containers.',
    featured: true,
    isFreeOpportunity: true,
  },
  {
    id: 'linux-foundation-git-basics',
    title: 'Git and Distributed Version Control Basics',
    provider: 'Linux Foundation',
    resourceType: 'COURSE',
    costStatus: 'FREE',
    difficulty: 'Beginner',
    careers: ['Software Engineer', 'Full Stack Developer', 'Python Developer', 'DevOps Engineer', 'AI Engineer'],
    skills: ['Git', 'GitHub', 'Branching', 'Merge Conflicts', 'Rebase', 'Pull Requests'],
    description:
      'Understand internal Git mechanics, commit graphs, branch management, merge conflict resolution, and collaborative open-source workflows.',
    duration: '10 Hours',
    officialUrl: 'https://training.linuxfoundation.org/training/a-beginners-guide-to-open-source-software-development/',
    credentialBadge: 'Course Audit',
    learningOutcomes: [
      'Initialize repositories, stage changes, commit, and inspect git log.',
      'Create feature branches, perform fast-forward and 3-way merges.',
      'Open clean pull requests and participate in open-source code reviews.',
    ],
    prerequisites: ['Basic terminal comfort.'],
    whyItMatters:
      'Every software engineering job requires daily mastery of Git and distributed version control.',
    featured: false,
    isFreeOpportunity: true,
  },

  // ==========================================
  // GITHUB
  // ==========================================
  {
    id: 'github-skills-actions-cicd',
    title: 'Automate Workflows with GitHub Actions (GitHub Skills)',
    provider: 'GitHub',
    resourceType: 'HANDS-ON LAB',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Intermediate',
    careers: ['DevOps Engineer', 'Software Engineer', 'Full Stack Developer', 'MLOps Engineer'],
    skills: ['GitHub Actions', 'CI/CD', 'YAML Workflows', 'Automated Testing', 'Docker Deployment'],
    description:
      'Interactive bot-guided repository course where you write real YAML workflow files directly in a GitHub repo to build automated test pipelines.',
    duration: '1-2 Hours Interactive Lab',
    officialUrl: 'https://skills.github.com/',
    credentialBadge: 'GitHub Skills Completion',
    learningOutcomes: [
      'Write workflow triggers on push, pull request, and release tags.',
      'Execute multi-step matrix test runners across OS environments.',
      'Deploy container images to production hosting securely using secrets.',
    ],
    prerequisites: ['Git basics', 'Basic understanding of automated tests'],
    whyItMatters:
      'GitHub Actions is the industry standard CI/CD pipeline engine for open-source and enterprise repositories.',
    featured: true,
    isFreeOpportunity: true,
  },
  {
    id: 'github-skills-first-contribution',
    title: 'First Day on GitHub & Markdown Documentation',
    provider: 'GitHub',
    resourceType: 'HANDS-ON LAB',
    costStatus: 'FREE',
    difficulty: 'Beginner',
    careers: ['Software Engineer', 'Full Stack Developer', 'Python Developer', 'Data Analyst'],
    skills: ['GitHub', 'Markdown', 'Issues', 'Projects', 'README Engineering'],
    description:
      'Learn how to communicate effectively on GitHub, craft stellar README files, manage issues, and structure professional project boards.',
    duration: '1 Hour',
    officialUrl: 'https://skills.github.com/',
    credentialBadge: 'GitHub Skills Completed Repo',
    learningOutcomes: [
      'Format documentation using GitHub Flavored Markdown.',
      'Organize development tasks using GitHub Projects and Issue templates.',
      'Create clean release notes and contribution guides.',
    ],
    prerequisites: ['None.'],
    whyItMatters:
      'A great portfolio README is what recruiters and engineering managers evaluate first.',
    featured: false,
    isFreeOpportunity: true,
  },

  // ==========================================
  // ORACLE
  // ==========================================
  {
    id: 'oracle-oci-foundations-associate',
    title: 'Oracle Cloud Infrastructure (OCI) Foundations Associate',
    provider: 'Oracle',
    resourceType: 'CERTIFICATION',
    costStatus: 'FREE TRAINING',
    difficulty: 'Beginner',
    careers: ['Cloud Engineer', 'DevOps Engineer', 'Database Administrator', 'Software Engineer'],
    skills: ['Oracle Cloud', 'Autonomous Database', 'Compute', 'VCN Networking', 'IAM'],
    description:
      'Learn cloud fundamentals, Oracle autonomous databases, security architectures, cost management, and cloud billing concepts on Oracle University.',
    duration: '15 Hours Free Training',
    officialUrl: 'https://education.oracle.com/oracle-cloud-infrastructure-foundations-associate/pexam_1Z0-1085-23',
    credentialBadge: 'Oracle Certified Associate (Exam Required)',
    learningOutcomes: [
      'Understand core OCI architecture, regions, and availability domains.',
      'Deploy autonomous transaction processing and data warehouse databases.',
      'Configure Virtual Cloud Networks (VCNs) and security rules.',
    ],
    prerequisites: ['Basic computing background.'],
    whyItMatters:
      'Oracle provides free comprehensive video modules and practice assessments on Oracle University.',
    featured: false,
    isFreeOpportunity: false,
  },
  {
    id: 'oracle-java-explorer',
    title: 'Oracle Java Explorer: Object-Oriented Fundamentals',
    provider: 'Oracle',
    resourceType: 'LEARNING PATH',
    costStatus: 'FREE',
    difficulty: 'Beginner',
    careers: ['Software Engineer', 'Full Stack Developer'],
    skills: ['Java', 'OOP', 'Classes & Objects', 'Inheritance', 'Polymorphism', 'Collections'],
    description:
      'Official introductory learning path by Oracle teaching Java syntax, variables, conditionals, classes, encapsulation, and object modeling.',
    duration: '10 Hours',
    officialUrl: 'https://education.oracle.com/java-explorer/ls_64434',
    credentialBadge: 'Oracle University Explorer Badge',
    learningOutcomes: [
      'Write structured object-oriented Java applications.',
      'Implement polymorphism, interfaces, and inheritance hierarchy.',
      'Utilize Java Collections Framework (ArrayList, HashMap, HashSet).',
    ],
    prerequisites: ['None.'],
    whyItMatters:
      'Java remains one of the most in-demand languages in enterprise banking, fintech, and large-scale backend systems.',
    featured: false,
    isFreeOpportunity: true,
  },

  // ==========================================
  // KAGGLE
  // ==========================================
  {
    id: 'kaggle-course-pandas-data-manipulation',
    title: 'Pandas for Fast Data Manipulation',
    provider: 'Kaggle',
    resourceType: 'COURSE',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Beginner',
    careers: ['Data Analyst', 'Data Scientist', 'Data Engineer', 'Python Developer', 'AI Engineer'],
    skills: ['Python', 'Pandas', 'Data Cleaning', 'Grouping & Sorting', 'Handling Missing Values'],
    description:
      'Micro-course with hands-on live code exercises teaching how to slice, index, summarize, transform, and clean real-world datasets with Pandas.',
    duration: '4 Hours Hands-on',
    officialUrl: 'https://www.kaggle.com/learn/pandas',
    credentialBadge: 'Kaggle Certificate of Completion',
    learningOutcomes: [
      'Create Series and DataFrames and index with iloc/loc.',
      'Group data with groupby and calculate aggregate statistics.',
      'Rename columns, map values, and replace null entries.',
    ],
    prerequisites: ['Basic Python.'],
    whyItMatters:
      'Free, instantaneous browser-based execution with zero setup and a downloadable completion certificate.',
    featured: true,
    isFreeOpportunity: true,
  },
  {
    id: 'kaggle-course-intro-deep-learning',
    title: 'Intro to Deep Learning with Keras & TensorFlow',
    provider: 'Kaggle',
    resourceType: 'COURSE',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Intermediate',
    careers: ['ML Engineer', 'Data Scientist', 'AI Engineer', 'Computer Vision Engineer'],
    skills: ['Deep Learning', 'TensorFlow', 'Keras', 'Neural Networks', 'Overfitting & Dropout'],
    description:
      'Use TensorFlow and Keras to build dense neural networks, prevent overfitting with early stopping and dropout, and optimize binary/multiclass loss.',
    duration: '4 Hours Hands-on',
    officialUrl: 'https://www.kaggle.com/learn/intro-to-deep-learning',
    credentialBadge: 'Kaggle Certificate of Completion',
    learningOutcomes: [
      'Construct multi-layer perceptron (MLP) architectures.',
      'Add activation functions (ReLU, Sigmoid, Softmax) and loss functions.',
      'Apply batch normalization and dropout to prevent overfitting.',
    ],
    prerequisites: ['Python', 'Basic machine learning concepts'],
    whyItMatters:
      'Instant code execution in free GPU-backed Kaggle notebooks with immediate automated grading.',
    featured: false,
    isFreeOpportunity: true,
  },
  {
    id: 'kaggle-course-feature-engineering',
    title: 'Feature Engineering for Production ML',
    provider: 'Kaggle',
    resourceType: 'COURSE',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Intermediate',
    careers: ['Data Scientist', 'ML Engineer', 'Data Analyst'],
    skills: ['Feature Engineering', 'Mutual Information', 'K-Means Clustering', 'PCA', 'Target Encoding'],
    description:
      'Discover techniques to create high-leverage features that dramatically boost model predictive accuracy and benchmark standings.',
    duration: '5 Hours Hands-on',
    officialUrl: 'https://www.kaggle.com/learn/feature-engineering',
    credentialBadge: 'Kaggle Certificate of Completion',
    learningOutcomes: [
      'Calculate mutual information scores to isolate high-signal features.',
      'Create interaction terms and ratios tailored to business domain logic.',
      'Apply PCA and clustering to extract latent dimensional signals.',
    ],
    prerequisites: ['Pandas and basic machine learning.'],
    whyItMatters:
      'Feature engineering is often the difference between a mediocre model and winning competition accuracy.',
    featured: false,
    isFreeOpportunity: true,
  },

  // ==========================================
  // DATA & BI ANALYST SPECIFIC
  // ==========================================
  {
    id: 'ms-applied-skill-power-bi-data-model',
    title: 'Create and Manage Data Models in Power BI',
    provider: 'Microsoft',
    resourceType: 'APPLIED SKILL',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Intermediate',
    careers: ['BI Analyst', 'Data Analyst', 'Data Engineer'],
    skills: ['Power BI', 'DAX', 'Star Schema', 'Data Modeling', 'Power Query'],
    description:
      'Demonstrate your ability to build star schemas, define table relationships, and author DAX measures in an interactive 2-hour Power BI lab.',
    duration: '2 Hours Lab Assessment',
    officialUrl: 'https://learn.microsoft.com/en-us/credentials/applied-skills/create-and-manage-data-models-with-power-bi/',
    credentialBadge: 'Verified Microsoft Applied Skill',
    learningOutcomes: [
      'Design dimensional schemas with fact tables and dimension tables.',
      'Write DAX measures for YoY growth, running totals, and filtering.',
      'Configure row-level security and data model optimization.',
    ],
    prerequisites: ['Basic spreadsheet or Power BI experience.'],
    whyItMatters:
      'The definitive practical credential for BI Analysts to prove real Power BI modeling chops.',
    featured: true,
    isFreeOpportunity: true,
  },
  {
    id: 'google-data-analytics-professional-cert',
    title: 'Google Data Analytics Professional Certificate',
    provider: 'Google Cloud',
    resourceType: 'CERTIFICATE',
    costStatus: 'FREE WITH ELIGIBILITY',
    difficulty: 'Beginner',
    careers: ['Data Analyst', 'BI Analyst', 'Data Scientist'],
    skills: ['Spreadsheets', 'SQL', 'Tableau', 'R Programming', 'Data Cleaning', 'Data Storytelling'],
    description:
      'Comprehensive 8-course sequence teaching practical data analytics workflows from data collection and cleaning to visualization and case study presentation.',
    duration: '6 Months (10 hrs/week) or Fast-track',
    officialUrl: 'https://grow.google/certificates/data-analytics/',
    credentialBadge: 'Google Career Certificate (Coursera / Financial Aid)',
    learningOutcomes: [
      'Clean and verify structured data using SQL queries and spreadsheets.',
      'Build interactive dashboards and visualizations in Tableau.',
      'Conduct statistical data manipulation and plotting with R and RStudio.',
    ],
    prerequisites: ['None.'],
    whyItMatters:
      'One of the world’s most enrolled career transition certificates, with financial aid available for 100% free access.',
    featured: false,
    isFreeOpportunity: false,
  },

  // ==========================================
  // COMPUTER VISION & NLP
  // ==========================================
  {
    id: 'ms-applied-skill-azure-ai-vision',
    title: 'Process and Analyze Images with Azure AI Vision',
    provider: 'Microsoft',
    resourceType: 'APPLIED SKILL',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Intermediate',
    careers: ['Computer Vision Engineer', 'AI Engineer', 'Python Developer'],
    skills: ['Azure AI Vision', 'Image Classification', 'Object Detection', 'OCR', 'Face Analysis', 'Python SDK'],
    description:
      'Demonstrate practical skills in extracting visual features, recognizing text via OCR, and detecting objects with Azure AI Vision.',
    duration: '2 Hours Lab Assessment',
    officialUrl: 'https://learn.microsoft.com/en-us/credentials/applied-skills/process-and-translate-speech-with-azure-ai-speech/',
    credentialBadge: 'Verified Microsoft Applied Skill',
    learningOutcomes: [
      'Extract tags, captions, and objects from digital images using REST and Python.',
      'Perform Optical Character Recognition (OCR) on documents and street signs.',
      'Train custom image classification models with few labeled samples.',
    ],
    prerequisites: ['Python basics', 'REST API basics'],
    whyItMatters:
      'Hands-on laboratory credential proving computer vision implementation capabilities without heavy server infrastructure setup.',
    featured: false,
    isFreeOpportunity: true,
  },
  {
    id: 'ms-applied-skill-azure-ai-language',
    title: 'Extract Insights from Text with Azure AI Language (NLP)',
    provider: 'Microsoft',
    resourceType: 'APPLIED SKILL',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Intermediate',
    careers: ['NLP Engineer', 'AI Engineer', 'Data Scientist'],
    skills: ['Azure AI Language', 'NER', 'Sentiment Analysis', 'Key Phrase Extraction', 'Text Analytics'],
    description:
      'Prove your ability to analyze unstructured text, identify sentiment, extract entities and key phrases, and summarize documents.',
    duration: '2 Hours Lab Assessment',
    officialUrl: 'https://learn.microsoft.com/en-us/credentials/applied-skills/extract-insights-from-text-with-azure-ai-language/',
    credentialBadge: 'Verified Microsoft Applied Skill',
    learningOutcomes: [
      'Detect document language and analyze sentiment polarity.',
      'Extract Named Entities (persons, locations, organizations) and PII.',
      'Perform document extractive and abstractive summarization.',
    ],
    prerequisites: ['Basic Python.'],
    whyItMatters:
      'NLP is fundamental to search, intelligence gathering, customer support bots, and text mining.',
    featured: false,
    isFreeOpportunity: true,
  },

  // ==========================================
  // DATA ENGINEERING & MLOPS
  // ==========================================
  {
    id: 'gcp-badge-engineer-data-in-bigquery',
    title: 'Engineer Data in Google Cloud with BigQuery',
    provider: 'Google Cloud',
    resourceType: 'SKILL BADGE',
    costStatus: 'FREE TRAINING',
    difficulty: 'Intermediate',
    careers: ['Data Engineer', 'Data Analyst', 'Data Scientist', 'Cloud Engineer'],
    skills: ['BigQuery', 'Data Warehousing', 'Partitioning', 'Clustering', 'SQL Optimization'],
    description:
      'Hands-on quest covering large-scale SQL query optimization, table partitioning, clustering, and data ingestion into Google BigQuery.',
    duration: '8 Hours Guided Labs',
    officialUrl: 'https://www.cloudskillsboost.google/quests/132',
    credentialBadge: 'Google Cloud BigQuery Skill Badge',
    learningOutcomes: [
      'Design partitioned and clustered BigQuery tables for lower query cost.',
      'Ingest batch and streaming data from Cloud Storage and Pub/Sub.',
      'Execute high-volume analytical joins across billions of rows in seconds.',
    ],
    prerequisites: ['Solid SQL foundation.'],
    whyItMatters:
      'BigQuery is the backbone cloud data warehouse for thousands of top tech enterprises.',
    featured: false,
    isFreeOpportunity: false,
  },
  {
    id: 'ms-applied-skill-data-pipeline-fabric',
    title: 'Implement a Data Pipeline with Microsoft Fabric',
    provider: 'Microsoft',
    resourceType: 'APPLIED SKILL',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Intermediate',
    careers: ['Data Engineer', 'BI Analyst', 'Cloud Engineer'],
    skills: ['Microsoft Fabric', 'Data Factory', 'Data Lakehouse', 'ETL / ELT', 'Delta Parquet'],
    description:
      'Demonstrate hands-on proficiency in building lakehouses, creating automated ETL pipelines, and ingesting streaming data in Microsoft Fabric.',
    duration: '2 Hours Lab Assessment',
    officialUrl: 'https://learn.microsoft.com/en-us/credentials/applied-skills/implement-a-data-pipeline-with-microsoft-fabric/',
    credentialBadge: 'Verified Microsoft Applied Skill',
    learningOutcomes: [
      'Create and configure a Lakehouse in Microsoft Fabric.',
      'Build end-to-end data integration pipelines with Data Factory copy activities.',
      'Transform raw data into Delta Parquet tables for analytics.',
    ],
    prerequisites: ['SQL and basic data warehouse concepts.'],
    whyItMatters:
      'Microsoft Fabric is Microsoft’s flagship all-in-one data and analytics SaaS platform.',
    featured: true,
    isFreeOpportunity: true,
  },
  {
    id: 'ibm-badge-docker-essentials',
    title: 'Docker Essentials: A Developer Introduction',
    provider: 'IBM',
    resourceType: 'SKILL BADGE',
    costStatus: 'FREE CREDENTIAL',
    difficulty: 'Beginner',
    careers: ['DevOps Engineer', 'Software Engineer', 'Full Stack Developer', 'MLOps Engineer', 'Cloud Engineer'],
    skills: ['Docker', 'Containers', 'Dockerfiles', 'Container Registries', 'Docker Compose'],
    description:
      'Learn how to containerize applications, write multi-stage Dockerfiles, manage volume mounts, and network containers together with Docker Compose.',
    duration: '6 Hours',
    officialUrl: 'https://cognitiveclass.ai/courses/docker-essentials',
    credentialBadge: 'IBM Credly Digital Badge',
    learningOutcomes: [
      'Build, tag, and publish container images.',
      'Run interactive and detached containers with port forwarding.',
      'Compose multi-container applications with shared persistent storage.',
    ],
    prerequisites: ['Basic command line familiarity.'],
    whyItMatters:
      'Docker containerization is the absolute foundation for modern cloud deployments and DevOps.',
    featured: true,
    isFreeOpportunity: true,
  },
];

export const PROVIDER_LIST: Provider[] = [
  'Microsoft',
  'Google Cloud',
  'IBM',
  'AWS',
  'Oracle',
  'Cisco',
  'NVIDIA',
  'Linux Foundation',
  'GitHub',
  'Kaggle',
  'Meta',
  'Other',
];

export const PROVIDER_METADATA: Record<
  Provider,
  { name: string; color: string; bgColor: string; borderColor: string; iconLabel: string }
> = {
  Microsoft: {
    name: 'Microsoft',
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/30',
    iconLabel: 'MS',
  },
  'Google Cloud': {
    name: 'Google Cloud',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    iconLabel: 'GCP',
  },
  IBM: {
    name: 'IBM',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    iconLabel: 'IBM',
  },
  AWS: {
    name: 'AWS',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    iconLabel: 'AWS',
  },
  Oracle: {
    name: 'Oracle',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    iconLabel: 'ORA',
  },
  Cisco: {
    name: 'Cisco',
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30',
    iconLabel: 'CSCO',
  },
  NVIDIA: {
    name: 'NVIDIA',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    iconLabel: 'NVDA',
  },
  'Linux Foundation': {
    name: 'Linux Foundation',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    iconLabel: 'LF',
  },
  GitHub: {
    name: 'GitHub',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    iconLabel: 'GH',
  },
  Kaggle: {
    name: 'Kaggle',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    iconLabel: 'KAG',
  },
  Meta: {
    name: 'Meta',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    iconLabel: 'META',
  },
  Other: {
    name: 'Other',
    color: 'text-slate-400',
    bgColor: 'bg-slate-500/10',
    borderColor: 'border-slate-500/30',
    iconLabel: 'EXT',
  },
};

export const COST_STATUS_CONFIG: Record<
  CostStatus,
  { label: string; badgeClass: string; isFreeBadge: boolean }
> = {
  FREE: {
    label: 'FREE',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    isFreeBadge: true,
  },
  'FREE CREDENTIAL': {
    label: 'FREE CREDENTIAL',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 font-bold',
    isFreeBadge: true,
  },
  'FREE TRAINING': {
    label: 'FREE TRAINING',
    badgeClass: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
    isFreeBadge: true,
  },
  'FREE WITH ELIGIBILITY': {
    label: 'FREE W/ AID',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    isFreeBadge: true,
  },
  'PAID EXAM': {
    label: 'PAID EXAM',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    isFreeBadge: false,
  },
  PAID: {
    label: 'PAID',
    badgeClass: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    isFreeBadge: false,
  },
  'CHECK PROVIDER': {
    label: 'CHECK PROVIDER',
    badgeClass: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    isFreeBadge: false,
  },
};
