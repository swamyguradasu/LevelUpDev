import {
  CareerHubResource,
  ResourceType,
  CostType,
  DifficultyLevel,
  ProviderId,
  CareerPathId,
  ResourceFilterOptions,
} from './types';
import { INITIAL_RESOURCE_CATALOG } from './catalog';
import { PROVIDER_CATALOG, PROVIDER_LIST } from './providers';
import { CAREER_PATHS_CATALOG, CAREER_PATHS_LIST, matchStudentCareerPath } from './careerPaths';

export * from './types';
export * from './providers';
export * from './careerPaths';
export * from './careerPathDetails';
export * from './catalog';

// Validation constraints
const VALID_RESOURCE_TYPES: Set<ResourceType> = new Set([
  'course',
  'learning_path',
  'certificate',
  'certification',
  'skill_badge',
  'applied_skill',
  'hands_on_lab',
  'practical_credential',
]);

const VALID_COST_TYPES: Set<CostType> = new Set([
  'free',
  'free_training',
  'free_credential',
  'free_with_eligibility',
  'paid',
  'paid_exam',
  'check_provider',
]);

const VALID_DIFFICULTIES: Set<DifficultyLevel> = new Set(['beginner', 'intermediate', 'advanced']);

/**
 * Validates a resource according to quality rules:
 * 1. Name exists and not empty
 * 2. Provider is registered in catalog
 * 3. ResourceType is valid
 * 4. At least one valid careerPath exists
 * 5. Official URL is valid HTTPS string
 * 6. CostType is valid
 * 7. Difficulty is valid
 */
export function validateResource(resource: CareerHubResource): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!resource.name || resource.name.trim().length === 0) {
    errors.push('Resource name is required.');
  }

  if (!resource.provider || !PROVIDER_CATALOG[resource.provider]) {
    errors.push(`Invalid provider: ${resource.provider}`);
  }

  if (!resource.resourceType || !VALID_RESOURCE_TYPES.has(resource.resourceType)) {
    errors.push(`Invalid resourceType: ${resource.resourceType}`);
  }

  if (!resource.careerPaths || resource.careerPaths.length === 0) {
    errors.push('At least one valid careerPath must be assigned.');
  } else {
    for (const cp of resource.careerPaths) {
      if (!CAREER_PATHS_CATALOG[cp]) {
        errors.push(`Invalid careerPath: ${cp}`);
      }
    }
  }

  if (
    !resource.officialUrl ||
    (!resource.officialUrl.startsWith('http://') && !resource.officialUrl.startsWith('https://'))
  ) {
    errors.push('A valid officialUrl is required.');
  }

  if (!resource.costType || !VALID_COST_TYPES.has(resource.costType)) {
    errors.push(`Invalid costType: ${resource.costType}`);
  }

  if (!resource.difficulty || !VALID_DIFFICULTIES.has(resource.difficulty)) {
    errors.push(`Invalid difficulty: ${resource.difficulty}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Returns all verified, valid, active resources.
 */
export function getAllActiveResources(): CareerHubResource[] {
  return INITIAL_RESOURCE_CATALOG.filter((res) => {
    if (!res.isActive) return false;
    const validation = validateResource(res);
    if (!validation.isValid) {
      console.warn(`[CareerHub Data] Skipping invalid resource "${res.id}":`, validation.errors);
      return false;
    }
    return true;
  });
}

/**
 * Get resource by ID
 */
export function getResourceById(id: string): CareerHubResource | undefined {
  return getAllActiveResources().find((r) => r.id === id);
}

/**
 * Helper to compute live data-driven statistics
 */
export function calculateCatalogStats(resources: CareerHubResource[] = getAllActiveResources()) {
  const totalCount = resources.length;
  const uniqueProviders = new Set(resources.map((r) => r.provider)).size;
  const uniqueCareers = new Set(resources.flatMap((r) => r.careerPaths)).size;
  const freeOpportunities = resources.filter(
    (r) =>
      r.isFree ||
      r.costType === 'free' ||
      r.costType === 'free_credential' ||
      r.costType === 'free_training' ||
      r.costType === 'free_with_eligibility'
  ).length;

  return {
    totalResources: `${totalCount}+`,
    careerPaths: `${uniqueCareers}+`,
    providers: `${uniqueProviders}+`,
    freeOpportunities: `${freeOpportunities}+ Free`,
  };
}

/**
 * Core filtering function
 */
export function filterResources(
  resources: CareerHubResource[],
  options: ResourceFilterOptions
): CareerHubResource[] {
  return resources.filter((res) => {
    // 1. Search query
    if (options.searchQuery && options.searchQuery.trim()) {
      const q = options.searchQuery.toLowerCase().trim();
      const matches =
        res.name.toLowerCase().includes(q) ||
        res.shortDescription.toLowerCase().includes(q) ||
        res.longDescription.toLowerCase().includes(q) ||
        res.provider.toLowerCase().includes(q) ||
        res.skills.some((s) => s.toLowerCase().includes(q)) ||
        res.careerPaths.some((c) => c.toLowerCase().includes(q)) ||
        res.tags.some((t) => t.toLowerCase().includes(q));

      if (!matches) return false;
    }

    // 2. Provider filter
    if (options.provider && options.provider !== 'all') {
      if (res.provider !== options.provider) return false;
    }

    // 3. Career Path filter
    if (options.careerPath && options.careerPath !== 'all') {
      if (!res.careerPaths.includes(options.careerPath)) return false;
    }

    // 4. Resource Type filter
    if (options.resourceType && options.resourceType !== 'all') {
      if (res.resourceType !== options.resourceType) return false;
    }

    // 5. Difficulty filter
    if (options.difficulty && options.difficulty !== 'all') {
      if (res.difficulty !== options.difficulty) return false;
    }

    // 6. Cost Type filter
    if (options.costType && options.costType !== 'all') {
      if (options.costType === 'free') {
        const isFree =
          res.isFree ||
          res.costType === 'free' ||
          res.costType === 'free_credential' ||
          res.costType === 'free_training';
        if (!isFree) return false;
      } else if (res.costType !== options.costType) {
        return false;
      }
    }

    // 7. Boolean flags
    if (options.isFreeOnly) {
      const isFree =
        res.isFree ||
        res.costType === 'free' ||
        res.costType === 'free_credential' ||
        res.costType === 'free_training' ||
        res.costType === 'free_with_eligibility';
      if (!isFree) return false;
    }

    if (options.isFeaturedOnly && !res.isFeatured) return false;
    if (options.isRecommendedOnly && !res.isRecommended) return false;

    return true;
  });
}

// UI Glossary and badge mappings
export const RESOURCE_TYPE_METADATA: Record<
  ResourceType,
  { label: string; description: string; badgeClass: string }
> = {
  course: {
    label: 'Course',
    description: 'Learn a skill through structured lectures, video modules, and guided code snippets.',
    badgeClass: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  },
  learning_path: {
    label: 'Learning Path',
    description: 'A curated multi-module progression designed to build end-to-end domain proficiency.',
    badgeClass: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  },
  certificate: {
    label: 'Certificate',
    description: 'Proof of completing a learning program or course sequence from a recognized provider.',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  },
  certification: {
    label: 'Certification',
    description: 'Formal industry credential validating specialized knowledge & competency, usually via a proctored exam.',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  },
  skill_badge: {
    label: 'Skill Badge',
    description: 'Shareable verifiable digital badge demonstrating practical completion of a defined technical milestone.',
    badgeClass: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  },
  applied_skill: {
    label: 'Applied Skill',
    description: 'Scenario-based, hands-on lab credential directly evaluated in realistic interactive cloud/code environments.',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  },
  hands_on_lab: {
    label: 'Hands-on Lab',
    description: 'Practice and troubleshoot in interactive live cloud environments, sandbox consoles, or browser shells.',
    badgeClass: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
  },
  practical_credential: {
    label: 'Practical Credential',
    description: 'Performance-tested assessment validating real-world project delivery and technical capabilities.',
    badgeClass: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  },
};

export const COST_TYPE_METADATA: Record<
  CostType,
  { label: string; badgeClass: string; isFreeBadge: boolean }
> = {
  free: {
    label: 'FREE',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    isFreeBadge: true,
  },
  free_credential: {
    label: 'FREE CREDENTIAL',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 font-bold',
    isFreeBadge: true,
  },
  free_training: {
    label: 'FREE TRAINING',
    badgeClass: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
    isFreeBadge: true,
  },
  free_with_eligibility: {
    label: 'FREE W/ AID',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    isFreeBadge: true,
  },
  paid_exam: {
    label: 'PAID EXAM',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    isFreeBadge: false,
  },
  paid: {
    label: 'PAID',
    badgeClass: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    isFreeBadge: false,
  },
  check_provider: {
    label: 'CHECK PROVIDER',
    badgeClass: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    isFreeBadge: false,
  },
};
