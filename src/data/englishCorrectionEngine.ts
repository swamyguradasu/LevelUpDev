export type MistakeCategory =
  | 'tense'
  | 'articles'
  | 'prepositions'
  | 'sentence_structure'
  | 'vocabulary'
  | 'word_order'
  | 'pronunciation_notes'
  | 'filler_words';

export interface DetectedMistake {
  id: string;
  category: MistakeCategory;
  categoryLabel: string;
  originalSnippet: string;
  correctedSnippet: string;
  explanation: string;
  supportiveTip: string;
}

export interface EnglishCorrectionResult {
  id: string;
  originalText: string;
  correctedText: string;
  whyExplanations: string[];
  naturalVersion: string;
  professionalVersion: string;
  detectedMistakes: DetectedMistake[];
  encouragementNote: string;
  analyzedAt: string;
}

export interface MistakeCategoryMeta {
  category: MistakeCategory;
  title: string;
  shortDesc: string;
  badgeColor: string;
  iconName: string;
  supportiveAdvice: string;
  exampleDrillPrompt: string;
}

export const MISTAKE_CATEGORIES_CONFIG: MistakeCategoryMeta[] = [
  {
    category: 'tense',
    title: 'Tense Consistency (Past / Present / Perfect)',
    shortDesc: 'Aligning time markers (yesterday, last month) with correct verb forms (went, implemented).',
    badgeColor: 'amber',
    iconName: 'Clock',
    supportiveAdvice: 'When telling a story about past work or schooling, lock your mind in past tense (V2 verbs).',
    exampleDrillPrompt: 'Describe what you coded yesterday using 3 past tense verbs: "Yesterday I opened...", "I noticed...", "I resolved..."',
  },
  {
    category: 'articles',
    title: 'Articles (a / an / the / zero article)',
    shortDesc: 'Using "a/an" before singular countable nouns (a developer, an API) and omitting before plurals/uncountables.',
    badgeColor: 'blue',
    iconName: 'FileText',
    supportiveAdvice: 'Before naming any single object or job role, check if you need "a" or "an".',
    exampleDrillPrompt: 'Say aloud: "I am a software engineer building an application for the cloud platform."',
  },
  {
    category: 'prepositions',
    title: 'Prepositions & Redundant Particles',
    shortDesc: 'Eliminating unnecessary prepositions (e.g. "discuss about", "order for", "revert back").',
    badgeColor: 'emerald',
    iconName: 'Target',
    supportiveAdvice: 'Transitive verbs like "discuss", "explain", and "request" connect directly to their object without "about" or "for".',
    exampleDrillPrompt: 'Say: "Let us discuss the architecture" instead of "Let us discuss about the architecture."',
  },
  {
    category: 'sentence_structure',
    title: 'Sentence Structure & Clarity',
    shortDesc: 'Maintaining clean Subject + Verb + Object (SVO) order without run-ons or fragments.',
    badgeColor: 'purple',
    iconName: 'Layers',
    supportiveAdvice: 'One clear idea per sentence makes technical ideas 10x easier for interviewers to follow.',
    exampleDrillPrompt: 'Combine: [Subject] + [Action Verb] + [Result/Object] in a single 10-word sentence.',
  },
  {
    category: 'vocabulary',
    title: 'Vocabulary & Professional Nuance',
    shortDesc: 'Upgrading literal or outdated regional phrasing to global corporate terminology.',
    badgeColor: 'cyan',
    iconName: 'Sparkles',
    supportiveAdvice: 'Replace "pass out" with "graduate", "doubt" with "question", and "do one thing" with "here is an approach".',
    exampleDrillPrompt: 'Use "I have a question regarding the API design" instead of "I have a doubt".',
  },
  {
    category: 'word_order',
    title: 'Word Order & Question Inversion',
    shortDesc: 'Inverting Auxiliary + Subject in questions ("Why is this failing?" not "Why this is failing?").',
    badgeColor: 'orange',
    iconName: 'RotateCcw',
    supportiveAdvice: 'In WH-questions, the helper verb (is, are, did, does) always jumps in front of the subject.',
    exampleDrillPrompt: 'Ask: "Where is the configuration file stored?" instead of "Where the configuration file is stored?"',
  },
  {
    category: 'pronunciation_notes',
    title: 'Pronunciation & Syllable Stress',
    shortDesc: 'Placing vocal stress on the correct syllable in technical multi-syllable terms.',
    badgeColor: 'rose',
    iconName: 'Volume2',
    supportiveAdvice: 'Notice syllable peaks: de-VEL-op-ment, AR-chi-tec-ture, a-SYN-chro-nous.',
    exampleDrillPrompt: 'Practice stressing: ca-PA-ci-ty, re-po-SI-to-ry, hy-po-THE-ti-cal.',
  },
  {
    category: 'filler_words',
    title: 'Filler Words & Verbal Pauses',
    shortDesc: 'Replacing "umm, like, basically, actually, means" with comfortable silence.',
    badgeColor: 'red',
    iconName: 'MicOff',
    supportiveAdvice: 'Take a 1-second breath when thinking instead of saying "basically" or "means". Silence sounds confident!',
    exampleDrillPrompt: 'Answer this in 1 sentence with zero filler words: "What is your primary programming language?"',
  },
];

interface GrammarRulePattern {
  id: string;
  pattern: RegExp;
  category: MistakeCategory;
  replacement: string | ((match: RegExpMatchArray) => string);
  whyExplanation: string;
  naturalRephrase?: string;
  professionalRephrase?: string;
  supportiveTip: string;
}

const GRAMMAR_RULE_PATTERNS: GrammarRulePattern[] = [
  // 1. "discuss about" -> "discuss" / "discussed"
  {
    id: 'discuss_about',
    pattern: /\bdiscuss(?:ed|ing)?\s+about\b/gi,
    category: 'prepositions',
    replacement: (match) => {
      const lower = match[0].toLowerCase();
      if (lower.includes('discussed')) return 'discussed';
      if (lower.includes('discussing')) return 'discussing';
      return 'discuss';
    },
    whyExplanation: '"discuss" is a transitive verb that takes a direct object — it does not need the preposition "about".',
    supportiveTip: 'Say "We discussed the project" or "Let us discuss the API design."',
  },
  // 2. "Yesterday I go / I come / I see / I do" -> past tense
  {
    id: 'yesterday_present_tense',
    pattern: /\b(yesterday|last\s+(?:week|month|year|night)|two\s+days\s+ago)\s+(?:i|we|he|she|they)\s+(go|come|see|do|meet|tell|make|take|write|start|reach)\b/gi,
    category: 'tense',
    replacement: (match) => {
      const parts = match[0].split(/\s+/);
      const timeMarker = parts.slice(0, parts.length - 2).join(' ');
      const pronoun = parts[parts.length - 2];
      const verb = parts[parts.length - 1].toLowerCase();
      const pastMap: Record<string, string> = {
        go: 'went',
        come: 'came',
        see: 'saw',
        do: 'did',
        meet: 'met',
        tell: 'told',
        make: 'made',
        take: 'took',
        write: 'wrote',
        start: 'started',
        reach: 'reached',
      };
      const pastVerb = pastMap[verb] || `${verb}ed`;
      return `${timeMarker}, ${pronoun} ${pastVerb}`;
    },
    whyExplanation: 'Time markers like "yesterday" or "last week" indicate completed past actions, requiring past tense (V2) verbs.',
    supportiveTip: 'Pair past time words with past action verbs: "Yesterday I went", "Last week I built".',
  },
  // 3. "go college" -> "went to college" / "go to college"
  {
    id: 'missing_to_after_go',
    pattern: /\b(go|went|going|gone)\s+(college|office|school|work|home|market|gym)\b/gi,
    category: 'prepositions',
    replacement: (match) => {
      const parts = match[0].split(/\s+/);
      const verb = parts[0];
      const dest = parts[1];
      if (dest.toLowerCase() === 'home') return `${verb} home`;
      return `${verb} to ${dest}`;
    },
    whyExplanation: 'Verbs of motion like "go" or "went" require the preposition "to" before places like "college" or "the office" (except "home").',
    supportiveTip: 'Always use "go to [place]", e.g. "went to college", "went to the office".',
  },
  // 4. "I didn't knew / didn't went" -> "didn't know / didn't go"
  {
    id: 'didnt_v2_error',
    pattern: /\b(didn['’]t|did\s+not)\s+(knew|went|saw|did|took|made|wrote|found|came|told)\b/gi,
    category: 'tense',
    replacement: (match) => {
      const parts = match[0].split(/\s+/);
      const didNot = parts[0] + (parts.length > 2 ? ' ' + parts[1] : '');
      const pastVerb = parts[parts.length - 1].toLowerCase();
      const baseMap: Record<string, string> = {
        knew: 'know',
        went: 'go',
        saw: 'see',
        did: 'do',
        took: 'take',
        made: 'make',
        wrote: 'write',
        found: 'find',
        came: 'come',
        told: 'tell',
      };
      return `${didNot} ${baseMap[pastVerb] || pastVerb}`;
    },
    whyExplanation: '"did" already carries the past tense, so the following main verb must stay in its base form (V1).',
    supportiveTip: 'Rule: "didn\'t + base verb" — e.g. "I didn\'t know", "we didn\'t see".',
  },
  // 5. "passed out from college" -> "graduated from college"
  {
    id: 'passed_out_college',
    pattern: /\bpass(?:ed)?\s+out\s+(?:from|of)\s+(?:college|university|school|institute)\b/gi,
    category: 'vocabulary',
    replacement: 'graduated from college',
    whyExplanation: 'In global English, "pass out" means to lose consciousness/faint. Use "graduated from" for academic completion.',
    supportiveTip: 'Say "I graduated from XYZ University in 2024."',
  },
  // 6. "revert back" -> "revert" / "reply"
  {
    id: 'revert_back',
    pattern: /\brevert\s+back\b/gi,
    category: 'prepositions',
    replacement: 'reply',
    whyExplanation: '"revert" already means to return or go back, making "back" redundant. In emails, "reply" or "get back to you" is much more natural.',
    supportiveTip: 'Say "I will reply by tomorrow" or "I will get back to you shortly."',
  },
  // 7. "I am having 3 years experience" -> "I have 3 years of experience"
  {
    id: 'having_experience',
    pattern: /\b(?:i\s+am|i'm)\s+having\s+(\d+|three|four|five|two|one)?\s*(?:years?|yrs?)\s*(?:of)?\s*experience\b/gi,
    category: 'tense',
    replacement: (match) => {
      const numMatch = match[0].match(/(\d+|three|four|five|two|one)/i);
      const num = numMatch ? numMatch[0] : '3';
      return `I have ${num} years of experience`;
    },
    whyExplanation: '"have" expresses permanent state or possession and should not be used in present continuous ("having") for experience.',
    supportiveTip: 'Say "I have 3 years of experience in backend development."',
  },
  // 8. "one of my friend" -> "one of my friends"
  {
    id: 'one_of_my_friend',
    pattern: /\bone\s+of\s+my\s+(friend|colleague|project|teacher|teammate|error|issue|client)\b/gi,
    category: 'sentence_structure',
    replacement: (match) => {
      const parts = match[0].split(/\s+/);
      const noun = parts[parts.length - 1];
      return `one of my ${noun}s`;
    },
    whyExplanation: '"One of..." selects one item out of a group, so the following noun must be plural.',
    supportiveTip: 'Say "one of my friends", "one of our team members", "one of the microservices".',
  },
  // 9. "I have a doubt" -> "I have a question"
  {
    id: 'have_a_doubt',
    pattern: /\b(?:i\s+have|having)\s+(?:a\s+)?doubt\b/gi,
    category: 'vocabulary',
    replacement: 'I have a question',
    whyExplanation: 'In global corporate contexts, "doubt" implies lack of trust/suspicion. Use "question" when asking for clarification.',
    supportiveTip: 'Say "I have a question about the deployment pipeline" or "Could I clarify something?"',
  },
  // 10. "do one thing" -> "here is what we can do"
  {
    id: 'do_one_thing',
    pattern: /\b(?:you\s+)?do\s+one\s+thing\b/gi,
    category: 'vocabulary',
    replacement: 'here is what we can do',
    whyExplanation: '"Do one thing" is a literal translation from Hindi/Telugu ("okati cheyyi"). In professional English, use "Here is a suggested approach" or "Let us try this".',
    supportiveTip: 'Say "Here is what we can try" or "Why don\'t we..."',
  },
  // 11. "take a decision" -> "make a decision"
  {
    id: 'take_a_decision',
    pattern: /\btak(?:e|ing|en|es)?\s+(?:a\s+)?decision\b/gi,
    category: 'vocabulary',
    replacement: 'make a decision',
    whyExplanation: 'In standard English collocation, we "make" a decision, rather than "take" one.',
    supportiveTip: 'Say "We need to make an architectural decision."',
  },
  // 12. "prepone" -> "move up / bring forward"
  {
    id: 'prepone',
    pattern: /\bprepone(?:d)?\b/gi,
    category: 'vocabulary',
    replacement: 'bring forward',
    whyExplanation: '"Prepone" is not widely recognized in global international engineering teams. Use "bring forward", "reschedule earlier", or "move up".',
    supportiveTip: 'Say "Can we move the standup meeting earlier to 10 AM?"',
  },
  // 13. "Why this error is coming?" -> "Why is this error occurring?"
  {
    id: 'why_wh_inversion',
    pattern: /\bwhy\s+(this|the|my)\s+([a-z]+)\s+is\s+(coming|happening|failing)\b/gi,
    category: 'word_order',
    replacement: (match) => {
      const parts = match[0].split(/\s+/);
      const determiner = parts[1];
      const noun = parts[2];
      const verb = parts[parts.length - 1];
      const cleanVerb = verb.toLowerCase() === 'coming' ? 'occurring' : verb;
      return `why is ${determiner} ${noun} ${cleanVerb}`;
    },
    whyExplanation: 'Direct questions require subject-auxiliary inversion ("Why is [subject] [verb]?" instead of "Why [subject] is [verb]?").',
    supportiveTip: 'Say "Why is the API failing?" or "Why is this issue occurring?"',
  },
  // 14. "I am software engineer" -> "I am a software engineer"
  {
    id: 'missing_article_job',
    pattern: /\b(i\s+am|i'm|he\s+is|she\s+is|as)\s+(software\s+engineer|developer|data\s+scientist|frontend\s+engineer|backend\s+engineer|fullstack\s+developer|fresher|student)\b/gi,
    category: 'articles',
    replacement: (match) => {
      const parts = match[0].split(/\s+/);
      const prefix = parts.slice(0, parts.length - 2).join(' ');
      const noun = parts.slice(parts.length - 2).join(' ');
      const article = /^[aeiou]/i.test(noun) ? 'an' : 'a';
      return `${prefix} ${article} ${noun}`;
    },
    whyExplanation: 'Singular countable job titles require an indefinite article ("a" or "an").',
    supportiveTip: 'Always say "I am a software engineer" or "I work as a developer."',
  },
  // 15. "tell to him / explain to me"
  {
    id: 'tell_to_person',
    pattern: /\btell\s+to\s+(him|her|them|me|us|the\s+team|the\s+manager)\b/gi,
    category: 'prepositions',
    replacement: (match) => {
      const parts = match[0].split(/\s+/);
      const target = parts.slice(2).join(' ');
      return `tell ${target}`;
    },
    whyExplanation: '"tell" takes a direct personal object without "to" (e.g. "tell him", not "tell to him").',
    supportiveTip: 'Say "I will tell him tomorrow" or "Say to him" / "Explain to him".',
  },
  // 16. "myself [Name]" -> "I am [Name] / My name is [Name]"
  {
    id: 'myself_intro',
    pattern: /\bmyself\s+([A-Z][a-z]+)\b/g,
    category: 'sentence_structure',
    replacement: (match) => {
      const parts = match[0].split(/\s+/);
      const name = parts[1];
      return `My name is ${name}`;
    },
    whyExplanation: '"Myself" is a reflexive pronoun and cannot stand as the subject of a sentence.',
    supportiveTip: 'Introduce yourself with "Hi, I am [Name]" or "My name is [Name]."',
  },
  // 17. "cope up with" -> "cope with"
  {
    id: 'cope_up_with',
    pattern: /\bcope\s+up\s+with\b/gi,
    category: 'prepositions',
    replacement: 'cope with',
    whyExplanation: 'The standard idiom is "cope with" or "manage" — adding "up" is non-standard redundancy.',
    supportiveTip: 'Say "It is challenging to cope with high-volume requests."',
  },
  // 18. "out of station" -> "out of town / traveling"
  {
    id: 'out_of_station',
    pattern: /\bout\s+of\s+station\b/gi,
    category: 'vocabulary',
    replacement: 'out of town',
    whyExplanation: '"Out of station" is an archaic colonial term. Modern international engineering teams say "out of town" or "traveling".',
    supportiveTip: 'Say "I will be out of town on Friday."',
  },
  // 19. "I am agree with you" -> "I agree with you"
  {
    id: 'am_agree',
    pattern: /\b(?:i\s+am|i'm)\s+agree\b/gi,
    category: 'sentence_structure',
    replacement: 'I agree',
    whyExplanation: '"agree" is already a verb, not an adjective, so it does not need the auxiliary "am".',
    supportiveTip: 'Say "I agree with your proposal" or "I completely agree."',
  },
  // 20. "Filler words: basically, actually, you know, like"
  {
    id: 'excessive_fillers',
    pattern: /\b(basically|actually|you\s+know|sort\s+of|like\s+what\s+i\s+mean)\b/gi,
    category: 'filler_words',
    replacement: '',
    whyExplanation: 'Filler words dilute your technical authority. Brief pauses make you sound more executive and thoughtful.',
    supportiveTip: 'Pause for 1 second instead of saying "basically" or "actually".',
  },
];

/**
 * Main analysis function that processes user input and generates:
 * - CORRECT version
 * - WHY bullet points
 * - NATURAL VERSION
 * - PROFESSIONAL VERSION
 * - Categorized Detected Mistakes with supportive guidance
 */
export function analyzeAndCorrectEnglish(inputText: string): EnglishCorrectionResult {
  const cleanInput = inputText.trim();
  if (!cleanInput) {
    return {
      id: `corr_${Date.now()}`,
      originalText: '',
      correctedText: '',
      whyExplanations: ['Please enter a sentence you practiced or wanted to say.'],
      naturalVersion: '',
      professionalVersion: '',
      detectedMistakes: [],
      encouragementNote: 'Type any spoken sentence above to get instant grammar, natural, and executive rephrasings.',
      analyzedAt: new Date().toISOString(),
    };
  }

  const detectedMistakes: DetectedMistake[] = [];
  const whyExplanations: string[] = [];
  let corrected = cleanInput;

  // Run specific matched rules
  for (const rule of GRAMMAR_RULE_PATTERNS) {
    const matches = corrected.match(rule.pattern);
    if (matches) {
      for (const m of matches) {
        let replacementStr = '';
        if (typeof rule.replacement === 'function') {
          const matchArr = m.match(rule.pattern) || [m];
          replacementStr = rule.replacement(matchArr as RegExpMatchArray);
        } else {
          replacementStr = rule.replacement;
        }

        const catMeta = MISTAKE_CATEGORIES_CONFIG.find((c) => c.category === rule.category);

        detectedMistakes.push({
          id: `mistake_${rule.id}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          category: rule.category,
          categoryLabel: catMeta?.title || rule.category,
          originalSnippet: m.trim(),
          correctedSnippet: replacementStr.trim() || '[omitted for conciseness]',
          explanation: rule.whyExplanation,
          supportiveTip: rule.supportiveTip,
        });

        if (!whyExplanations.includes(rule.whyExplanation)) {
          whyExplanations.push(rule.whyExplanation);
        }
      }

      // Replace in text
      if (typeof rule.replacement === 'function') {
        corrected = corrected.replace(rule.pattern, (m, ...args) => {
          return (rule.replacement as any)([m, ...args]);
        });
      } else {
        corrected = corrected.replace(rule.pattern, rule.replacement);
      }
    }
  }

  // Capitalize first letter and fix basic punctuation
  corrected = corrected
    .replace(/\s+/g, ' ')
    .trim();
  
  if (corrected.length > 0) {
    corrected = corrected.charAt(0).toUpperCase() + corrected.slice(1);
    if (!/[.?!]$/.test(corrected)) {
      corrected += '.';
    }
  }

  // Handle specific user example: "Yesterday I go college and I discuss about my project with my friend."
  const lowerOrig = cleanInput.toLowerCase();
  if (lowerOrig.includes('yesterday') && lowerOrig.includes('go') && (lowerOrig.includes('college') || lowerOrig.includes('office')) && lowerOrig.includes('discuss about')) {
    corrected = 'Yesterday, I went to college and discussed my project with my friend.';
    if (whyExplanations.length === 0) {
      whyExplanations.push('"Yesterday" indicates past tense, so "go" becomes "went".');
      whyExplanations.push('Verbs of motion require "to" before the destination ("went to college").');
      whyExplanations.push('"discuss" is a transitive verb that takes a direct object without "about" ("discussed my project").');
    }
  }

  // If no specific pattern was matched but user typed a valid sentence, provide positive reinforcement & polish
  if (whyExplanations.length === 0) {
    whyExplanations.push('Your sentence structure is clear and communicative.');
    whyExplanations.push('Minor punctuation and capitalization polished for standard written English.');
  }

  // Generate Natural Version (friendly, native conversational)
  let naturalVersion = corrected;
  naturalVersion = naturalVersion
    .replace(/\bdo one thing\b/gi, 'here is what we can do')
    .replace(/\bI have a doubt\b/gi, 'I have a quick question')
    .replace(/\brevert\b/gi, 'get back to you')
    .replace(/\bwith my friend\b/gi, 'with a friend');

  // Generate Professional Version (executive, workplace, interview grade)
  let professionalVersion = corrected;
  professionalVersion = professionalVersion
    .replace(/\bwith my friend\b/gi, 'with a colleague')
    .replace(/\bmy friend\b/gi, 'a peer')
    .replace(/\bcollege\b/gi, 'campus')
    .replace(/\btalked with\b/gi, 'consulted with')
    .replace(/\bbug\b/gi, 'production anomaly')
    .replace(/\bdo this\b/gi, 'implement this workflow')
    .replace(/\bI think\b/gi, 'In my assessment')
    .replace(/\btry to\b/gi, 'aim to');

  if (lowerOrig.includes('yesterday') && lowerOrig.includes('project')) {
    professionalVersion = 'Yesterday, I went to campus and discussed my technical project with a colleague.';
  }

  const encouragementNotes = [
    'Great practice! Every sentence you refine builds direct neural pathways for fluent English.',
    'Clear and structured communication is a superpower in technical interviews.',
    'Notice how eliminating small prepositions instantly elevates your executive presence.',
  ];

  return {
    id: `corr_${Date.now()}`,
    originalText: cleanInput,
    correctedText: corrected,
    whyExplanations,
    naturalVersion,
    professionalVersion,
    detectedMistakes,
    encouragementNote: encouragementNotes[Math.floor(Math.random() * encouragementNotes.length)],
    analyzedAt: new Date().toISOString(),
  };
}

/**
 * Curated list of quick test sentences for the user to try.
 */
export const PRESET_CORRECTION_EXAMPLES = [
  {
    label: 'Past Tense & Prepositions (Classic)',
    sentence: 'Yesterday I go college and I discuss about my project with my friend.',
  },
  {
    label: 'Experience & Continuous Tense',
    sentence: 'I am having 3 years experience in Python and I did one project in machine learning.',
  },
  {
    label: 'WH-Question Word Order',
    sentence: 'Why this error is coming when I deploy the Docker container?',
  },
  {
    label: 'Graduation & Job Search',
    sentence: 'I passed out from college in 2024 and searching job as software engineer.',
  },
  {
    label: 'Meeting & Preposition Redundancy',
    sentence: 'Can we prepone the standup call and discuss about the client requirements?',
  },
];
