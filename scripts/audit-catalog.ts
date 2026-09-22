import { INITIAL_RESOURCE_CATALOG } from '../src/data/careerHub/catalog';

console.log('=== CAREER HUB CATALOG AUDIT ===');
console.log('Total Resources:', INITIAL_RESOURCE_CATALOG.length);

const ids = new Set<string>();
const duplicates: string[] = [];
INITIAL_RESOURCE_CATALOG.forEach(r => {
  if (ids.has(r.id)) duplicates.push(r.id);
  ids.add(r.id);
});
console.log('Duplicates (should be empty):', duplicates);

const byCost: Record<string, number> = {};
const byType: Record<string, number> = {};
const byProvider: Record<string, number> = {};

INITIAL_RESOURCE_CATALOG.forEach(r => {
  byCost[r.costType] = (byCost[r.costType] || 0) + 1;
  byType[r.resourceType] = (byType[r.resourceType] || 0) + 1;
  byProvider[r.provider] = (byProvider[r.provider] || 0) + 1;
});

console.log('\n--- Cost Distribution ---');
Object.entries(byCost).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

console.log('\n--- Type Distribution ---');
Object.entries(byType).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

console.log('\n--- Provider Distribution ---');
Object.entries(byProvider).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

console.log('\n--- Resource Breakdown ---');
INITIAL_RESOURCE_CATALOG.forEach((r, idx) => {
  console.log(`${idx + 1}. [${r.provider}] [${r.resourceType}] [${r.costType}] ${r.name}`);
  console.log(`   Official: ${r.officialUrl}`);
  console.log(`   Cost: ${r.costDescription}`);
  console.log(`   LastVerified: ${r.lastVerified}`);
});
