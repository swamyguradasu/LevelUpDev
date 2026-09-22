export type ResourceType =
  | 'course'
  | 'learning_path'
  | 'certificate'
  | 'certification'
  | 'skill_badge'
  | 'applied_skill'
  | 'hands_on_lab'
  | 'practical_credential';

export type CostType =
  | 'free'
  | 'free_training'
  | 'free_credential'
  | 'free_with_eligibility'
  | 'paid'
  | 'paid_exam'
  | 'check_provider';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type ProviderId =
  | 'microsoft'
  | 'google-cloud'
  | 'ibm'
  | 'aws'
  | 'oracle'
  | 'cisco'
  | 'nvidia'
  | 'linux-foundation'
  | 'github'
  | 'other';

export type CareerPathId =
  | 'ai-engineer'
  | 'ml-engineer'
  | 'software-engineer'
  | 'python-developer'
  | 'full-stack-developer'
  | 'data-analyst'
  | 'data-scientist'
  | 'data-engineer'
  | 'cloud-engineer'
  | 'devops-engineer'
  | 'cybersecurity'
  | 'mlops-engineer'
  | 'generative-ai-engineer'
  | 'nlp-engineer'
  | 'computer-vision-engineer'
  | 'bi-analyst';

export interface CareerHubResource {
  id: string;
  provider: ProviderId;
  providerLogo?: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  resourceType: ResourceType;
  category: string;
  careerPaths: CareerPathId[];
  skills: string[];
  difficulty: DifficultyLevel;
  costType: CostType;
  costDescription: string;
  duration?: string;
  prerequisites: string[];
  officialUrl: string;
  credentialUrl?: string;
  learningUrl?: string;
  assessmentUrl?: string;
  isFree: boolean;
  isFeatured: boolean;
  isRecommended: boolean;
  isActive: boolean;
  tags: string[];
  lastVerified: string;
  sourceType: string;
  learningOutcomes?: string[];
  whyItMatters?: string;
}

export interface ProviderDefinition {
  id: ProviderId;
  name: string;
  shortName: string;
  logo: string;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
  textColor: string;
  description: string;
  officialDomain: string;
}

export interface CareerPathDefinition {
  id: CareerPathId;
  name: string;
  slug: string;
  category: 'engineering' | 'data' | 'ai' | 'infrastructure' | 'security';
  description: string;
  iconName: string;
  aliases: string[];
}

export interface ResourceFilterOptions {
  searchQuery?: string;
  provider?: ProviderId | 'all';
  careerPath?: CareerPathId | 'all';
  resourceType?: ResourceType | 'all';
  difficulty?: DifficultyLevel | 'all';
  costType?: CostType | 'all';
  isFreeOnly?: boolean;
  isFeaturedOnly?: boolean;
  isRecommendedOnly?: boolean;
}
