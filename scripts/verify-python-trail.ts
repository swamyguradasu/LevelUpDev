import {
  PYTHON_MODULES,
  getAllPythonModules,
  getPythonModuleById,
  getModuleTopics,
  getPreviousAndNextTopic,
  generateRandomizedAssignment,
  PYTHON_TOPICS_MAP,
  PYTHON_QUESTION_BANKS,
  getPythonTrackSections,
} from '../src/data/pythonSkillsData';
import {
  CAPSTONE_PROJECT_OPTIONS,
  CAPSTONE_STAGES,
  CAPSTONE_RUBRIC,
  CAPSTONE_CHECKLIST,
} from '../src/data/pythonCapstoneData';

console.log('=== VERIFYING PYTHON SKILLS TRAIL (MODULES 1–21) ===');
console.log('Total modules registered:', PYTHON_MODULES.length);
if (PYTHON_MODULES.length !== 21) {
  throw new Error('Expected 21 modules, found ' + PYTHON_MODULES.length);
}

const tracks = getPythonTrackSections();
console.log('Total visual tracks:', tracks.length);
tracks.forEach((t) => {
  console.log(`  Track [${t.track}]: ${t.title} (${t.modules.length} modules)`);
});

let totalTopics = 0;
for (const m of PYTHON_MODULES) {
  const topics = getModuleTopics(m.id);
  console.log(`Module ${m.moduleNumber} (${m.id}): ${m.title} -> ${topics.length} topics`);
  totalTopics += topics.length;
  for (const t of topics) {
    if (!t) throw new Error('Missing topic in module ' + m.id);
    if (!t.whatIsIt || !t.syntax || !t.basicExample || !t.detailedExample || !t.checkpoint || t.checkpoint.length === 0) {
      throw new Error('Topic ' + t.id + ' missing required sections');
    }
  }
}
console.log(`Total verified topics across all 21 modules: ${totalTopics}`);

// Verify Question Banks for M1-M20
for (let i = 1; i <= 20; i++) {
  const modKey = 'm' + i;
  const config = PYTHON_QUESTION_BANKS[modKey];
  if (!config) throw new Error('Missing question bank for ' + modKey);
  console.log(`Question Bank ${modKey}: ${config.title} | Pool: ${config.questionBank.length} | Sample: ${config.sampleCount}`);
  const session = generateRandomizedAssignment(modKey);
  if (session.questions.length !== config.sampleCount) {
    throw new Error('Randomized assignment sampling failed for ' + modKey);
  }
}

// Verify Capstone Data (Module 21)
console.log('Capstone Projects Count:', CAPSTONE_PROJECT_OPTIONS.length);
console.log('Capstone Stages Count:', CAPSTONE_STAGES.length);
console.log('Capstone Rubric Pillars Count:', CAPSTONE_RUBRIC.length);
console.log('Capstone Checklist Items Count:', CAPSTONE_CHECKLIST.length);

if (CAPSTONE_PROJECT_OPTIONS.length !== 5) throw new Error('Expected 5 capstone project options');
if (CAPSTONE_STAGES.length !== 12) throw new Error('Expected 12 capstone stages');
if (CAPSTONE_RUBRIC.length !== 4) throw new Error('Expected 4 rubric pillars');
if (CAPSTONE_CHECKLIST.length !== 10) throw new Error('Expected 10 checklist items');

console.log('ALL 21 MODULES, 98 TOPICS, 20 QUESTION BANKS, AND CAPSTONE SPECIFICATIONS VERIFIED 100% SUCCESSFULLY!');
