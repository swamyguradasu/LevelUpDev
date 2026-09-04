import {
  CurriculumLevel,
  CurriculumModule,
  CurriculumTopic,
  PracticeExercise,
  LEVEL_0_ASSESSMENT,
  LEVEL_1_FOUNDATION,
  LEVEL_2_THINKING,
  LEVEL_3_VOCABULARY,
} from './englishCurriculumLevels0to3';

import {
  LEVEL_4_LISTENING_SHADOWING,
  LEVEL_5_SPEAKING_FLUENCY,
  LEVEL_6_TECH_COMMUNICATION,
} from './englishCurriculumLevels4to6';

import {
  LEVEL_7_PROFESSIONAL_COMM,
  LEVEL_8_INTERVIEW_COMM,
  LEVEL_9_ADVANCED_JOB_READY,
} from './englishCurriculumLevels7to9';

export {
  type CurriculumLevel,
  type CurriculumModule,
  type CurriculumTopic,
  type PracticeExercise,
};

export interface CurriculumCategory {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  levels: CurriculumLevel[];
}

// =========================================================================
// ALL 10 CURRICULUM LEVELS (LEVEL 0 TO LEVEL 9)
// =========================================================================
export const ALL_CURRICULUM_LEVELS: CurriculumLevel[] = [
  LEVEL_0_ASSESSMENT,
  LEVEL_1_FOUNDATION,
  LEVEL_2_THINKING,
  LEVEL_3_VOCABULARY,
  LEVEL_4_LISTENING_SHADOWING,
  LEVEL_5_SPEAKING_FLUENCY,
  LEVEL_6_TECH_COMMUNICATION,
  LEVEL_7_PROFESSIONAL_COMM,
  LEVEL_8_INTERVIEW_COMM,
  LEVEL_9_ADVANCED_JOB_READY,
];

// =========================================================================
// 4 HIGH-LEVEL ROADMAP CATEGORIES
// Category -> Level -> Module -> Topic -> Lesson -> Practice
// =========================================================================
export const CURRICULUM_CATEGORIES: CurriculumCategory[] = [
  {
    id: 'category-foundations',
    title: 'Foundations & English Thinking',
    tagline: 'Build automatic sentence architecture & eliminate internal Telugu translation.',
    description: 'Establish baseline diagnostic metrics, master essential tenses, and develop direct thought-formation in English without mental lag.',
    iconName: 'Sparkles',
    levels: [LEVEL_0_ASSESSMENT, LEVEL_1_FOUNDATION, LEVEL_2_THINKING],
  },
  {
    id: 'category-fluency',
    title: 'Vocabulary, Listening & Shadowing',
    tagline: 'Expand corporate & technical vocabulary while training auditory comprehension.',
    description: 'Acquire 100+ precision software engineering idioms, master auditory keyword extraction, and practice 6-tier speech shadowing.',
    iconName: 'BookOpen',
    levels: [LEVEL_3_VOCABULARY, LEVEL_4_LISTENING_SHADOWING, LEVEL_5_SPEAKING_FLUENCY],
  },
  {
    id: 'category-technical-workplace',
    title: 'Technical & Workplace Communication',
    tagline: 'Articulate system design trade-offs, lead agile meetings & deliver tech demos.',
    description: 'Master the 5-step technical explanation formula, blameless incident postmortems, constructive code reviews, and executive presentation delivery.',
    iconName: 'Cpu',
    levels: [LEVEL_6_TECH_COMMUNICATION, LEVEL_7_PROFESSIONAL_COMM],
  },
  {
    id: 'category-interview-advancement',
    title: 'Interview & Executive Mastery (STAR & PREP)',
    tagline: 'Conquer behavioral & live coding interviews with executive poise.',
    description: 'Master STAR behavioral storytelling, live coding narration, PREP structured persuasion, zero-filler clarity, and capstone job simulation.',
    iconName: 'Award',
    levels: [LEVEL_8_INTERVIEW_COMM, LEVEL_9_ADVANCED_JOB_READY],
  },
];

// =========================================================================
// HELPER QUERY UTILITIES
// =========================================================================

export function getAllCurriculumLevels(): CurriculumLevel[] {
  return ALL_CURRICULUM_LEVELS;
}

export function getCurriculumLevelById(levelId: string): CurriculumLevel | undefined {
  return ALL_CURRICULUM_LEVELS.find((lvl) => lvl.id === levelId || lvl.levelCode.toLowerCase() === levelId.toLowerCase());
}

export function getCurriculumModuleById(moduleId: string): CurriculumModule | undefined {
  for (const lvl of ALL_CURRICULUM_LEVELS) {
    const found = lvl.modules.find((m) => m.id === moduleId);
    if (found) return found;
  }
  return undefined;
}

export function getCurriculumTopicById(topicId: string): { topic: CurriculumTopic; module: CurriculumModule; level: CurriculumLevel } | undefined {
  for (const lvl of ALL_CURRICULUM_LEVELS) {
    for (const mod of lvl.modules) {
      const topic = mod.topics.find((t) => t.id === topicId);
      if (topic) {
        return { topic, module: mod, level: lvl };
      }
    }
  }
  return undefined;
}

export function getAllCurriculumTopics(): Array<{ topic: CurriculumTopic; module: CurriculumModule; level: CurriculumLevel }> {
  const list: Array<{ topic: CurriculumTopic; module: CurriculumModule; level: CurriculumLevel }> = [];
  for (const lvl of ALL_CURRICULUM_LEVELS) {
    for (const mod of lvl.modules) {
      for (const topic of mod.topics) {
        list.push({ topic, module: mod, level: lvl });
      }
    }
  }
  return list;
}

export function getTotalCurriculumTopicsCount(): number {
  return getAllCurriculumTopics().length;
}

export function getCurriculumCategories(): CurriculumCategory[] {
  return CURRICULUM_CATEGORIES;
}
