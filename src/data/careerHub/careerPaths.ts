import { CareerPathId, CareerPathDefinition } from './types';

export const CAREER_PATHS_CATALOG: Record<CareerPathId, CareerPathDefinition> = {
  'ai-engineer': {
    id: 'ai-engineer',
    name: 'AI Engineer',
    slug: 'ai-engineer',
    category: 'ai',
    description: 'Build intelligent systems using LLMs, AI agents, RAG, and vector search.',
    iconName: 'Sparkles',
    aliases: ['ai', 'artificial intelligence', 'ai developer', 'ai engineer', 'genai'],
  },
  'ml-engineer': {
    id: 'ml-engineer',
    name: 'ML Engineer',
    slug: 'ml-engineer',
    category: 'ai',
    description: 'Design, train, and deploy machine learning models to production systems.',
    iconName: 'Cpu',
    aliases: ['ml', 'machine learning', 'ml engineer', 'machine learning engineer'],
  },
  'software-engineer': {
    id: 'software-engineer',
    name: 'Software Engineer',
    slug: 'software-engineer',
    category: 'engineering',
    description: 'Full lifecycle software engineering: DSA, systems design, APIs, and databases.',
    iconName: 'Laptop',
    aliases: ['sde', 'swe', 'software development engineer', 'software engineer', 'programmer'],
  },
  'python-developer': {
    id: 'python-developer',
    name: 'Python Developer',
    slug: 'python-developer',
    category: 'engineering',
    description: 'Master backend architectures, FastAPI microservices, and Python algorithms.',
    iconName: 'Code2',
    aliases: ['python', 'python developer', 'python backend', 'django', 'fastapi'],
  },
  'full-stack-developer': {
    id: 'full-stack-developer',
    name: 'Full Stack Developer',
    slug: 'full-stack-developer',
    category: 'engineering',
    description: 'End-to-end web engineering across frontend, backend, and cloud databases.',
    iconName: 'Layers',
    aliases: ['full stack', 'fullstack', 'full-stack', 'web developer', 'mern'],
  },
  'data-analyst': {
    id: 'data-analyst',
    name: 'Data Analyst',
    slug: 'data-analyst',
    category: 'data',
    description: 'Extract business insights using SQL, Excel, Python Pandas, and dashboards.',
    iconName: 'LineChart',
    aliases: ['data analyst', 'business analyst', 'analytics', 'data analysis', 'sql analyst'],
  },
  'data-scientist': {
    id: 'data-scientist',
    name: 'Data Scientist',
    slug: 'data-scientist',
    category: 'data',
    description: 'Apply statistics, predictive modeling, and exploratory data science to complex datasets.',
    iconName: 'Brain',
    aliases: ['data science', 'data scientist', 'predictive modeling', 'statistical analysis'],
  },
  'data-engineer': {
    id: 'data-engineer',
    name: 'Data Engineer',
    slug: 'data-engineer',
    category: 'data',
    description: 'Construct robust data pipelines, ETL workflows, data lakehouses, and BigQuery analytics.',
    iconName: 'Database',
    aliases: ['data engineer', 'etl', 'big data', 'spark', 'data pipelines'],
  },
  'cloud-engineer': {
    id: 'cloud-engineer',
    name: 'Cloud Engineer',
    slug: 'cloud-engineer',
    category: 'infrastructure',
    description: 'Architect and secure scalable infrastructure on AWS, Azure, and Google Cloud.',
    iconName: 'Cloud',
    aliases: ['cloud', 'cloud engineer', 'aws engineer', 'azure engineer', 'gcp engineer'],
  },
  'devops-engineer': {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    slug: 'devops-engineer',
    category: 'infrastructure',
    description: 'Automate CI/CD pipelines, container orchestration, Docker, and Kubernetes clusters.',
    iconName: 'Workflow',
    aliases: ['devops', 'sre', 'site reliability', 'ci/cd', 'platform engineer'],
  },
  cybersecurity: {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    category: 'security',
    description: 'Safeguard networks, applications, and cloud assets against modern cyber threats.',
    iconName: 'Shield',
    aliases: ['security', 'cyber security', 'infosec', 'penetration testing', 'soc analyst'],
  },
  'mlops-engineer': {
    id: 'mlops-engineer',
    name: 'MLOps Engineer',
    slug: 'mlops-engineer',
    category: 'ai',
    description: 'Automate machine learning lifecycles, model monitoring, drift tracking, and pipelines.',
    iconName: 'GitBranch',
    aliases: ['mlops', 'ml infrastructure', 'machine learning operations', 'ml pipeline'],
  },
  'generative-ai-engineer': {
    id: 'generative-ai-engineer',
    name: 'Generative AI Engineer',
    slug: 'generative-ai-engineer',
    category: 'ai',
    description: 'Specialize in fine-tuning, prompt design, multimodal models, and agent architectures.',
    iconName: 'Bot',
    aliases: ['generative ai', 'genai', 'prompt engineering', 'llm engineer'],
  },
  'nlp-engineer': {
    id: 'nlp-engineer',
    name: 'NLP Engineer',
    slug: 'nlp-engineer',
    category: 'ai',
    description: 'Build text intelligence, transformer models, semantic search, and speech systems.',
    iconName: 'MessageSquare',
    aliases: ['nlp', 'natural language processing', 'computational linguistics', 'text analytics'],
  },
  'computer-vision-engineer': {
    id: 'computer-vision-engineer',
    name: 'Computer Vision Engineer',
    slug: 'computer-vision-engineer',
    category: 'ai',
    description: 'Develop image processing, object detection, YOLO pipelines, and video intelligence.',
    iconName: 'Camera',
    aliases: ['computer vision', 'cv', 'image processing', 'opencv', 'yolo'],
  },
  'bi-analyst': {
    id: 'bi-analyst',
    name: 'BI Analyst',
    slug: 'bi-analyst',
    category: 'data',
    description: 'Deliver executive intelligence with Power BI, Tableau, DAX modeling, and KPI reports.',
    iconName: 'BarChart3',
    aliases: ['bi analyst', 'business intelligence', 'power bi', 'tableau analyst', 'bi developer'],
  },
};

export const CAREER_PATHS_LIST: CareerPathDefinition[] = Object.values(CAREER_PATHS_CATALOG);

/**
 * Match a raw career interest string from student profile to standard CareerPathId
 */
export function matchStudentCareerPath(rawInterest?: string | null): CareerPathId | null {
  if (!rawInterest || typeof rawInterest !== 'string') return null;
  const str = rawInterest.toLowerCase().trim();
  if (!str) return null;

  for (const career of CAREER_PATHS_LIST) {
    if (career.slug === str || career.id === str) return career.id;
    if (career.name.toLowerCase() === str) return career.id;
    if (career.aliases.some((alias) => str.includes(alias) || alias.includes(str))) {
      return career.id;
    }
  }

  return null;
}
