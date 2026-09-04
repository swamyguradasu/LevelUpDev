'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { isEnglishCareerAllowed } from '@/lib/content';
import {
  TRAINING_TRACKS,
  GRAMMAR_TOPICS,
  VOCABULARY_LIST,
  PRONUNCIATION_LIST,
  SPEAKING_PROMPTS,
  LISTENING_SCENARIOS,
  TECHNICAL_ENGLISH_LESSONS,
  INTERVIEW_ENGLISH_LESSONS,
  PROFESSIONAL_EMAIL_TEMPLATES,
  ASSESSMENT_QUESTIONS,
  getDailyMicroMission,
  VocabularyItem,
  SpeakingPrompt,
  GrammarTopic,
  ALL_CURRICULUM_LEVELS,
  CURRICULUM_CATEGORIES,
  CurriculumLevel,
  CurriculumModule,
  CurriculumTopic,
  getAllCurriculumLevels,
  getCurriculumLevelById,
  getCurriculumModuleById,
  getCurriculumTopicById,
  getTotalCurriculumTopicsCount,
} from '@/data/englishCareerData';
import {
  getEnglishCareerState,
  saveEnglishCareerState,
  calculateEnglishCareerMetrics,
  toggleTopicCompletion,
  toggleFlashcardMastery,
  saveSpeakingJournalEntry,
  logDailyTrainingPart,
  saveAssessmentResult,
  saveTopicNote,
  toggleBookmark,
  saveActiveDailySession,
  completeDailyTrainingDay,
  EnglishCareerUserState,
  EnglishCareerMetrics,
  SkillDimensionItem,
  NextBestActionRecommendation,
  WeeklyCategoryProgress,
  DailyTrainingSessionState,
  CompletedDailyLessonRecord,
  DailyPillarProgressState,
  createEmptyEnglishCareerState,
  SpeakingJournalEntry,
  deleteSpeakingJournalEntry,
  recordDetectedMistakes,
  toggleMistakeResolved,
  deleteTrackedMistake,
  TrackedMistakeRecord,
  MistakeCategory,
  saveMockInterviewSession,
  deleteMockInterviewSession,
  saveQuestionPracticeLog,
  MockInterviewSessionRecord,
  QuestionPracticeRecord,
} from '@/lib/englishCareerStorage';
import {
  DailyTrainingPlan,
  getDailyTrainingPlan,
  getTodayPlanForUser,
  getUpcomingTrainingPlans,
} from '@/data/englishDailyTrainingPlan';
import {
  SPEAKING_MODES_CONFIG,
  SPEAKING_EXERCISES,
  SpeakingExercise,
  SpeakingModeConfig,
  getSpeakingExercisesByMode,
  getRandomSpeakingExercise,
} from '@/data/englishSpeakingTrainerData';
import {
  analyzeAndCorrectEnglish,
  EnglishCorrectionResult,
  MISTAKE_CATEGORIES_CONFIG,
  PRESET_CORRECTION_EXAMPLES,
  DetectedMistake,
} from '@/data/englishCorrectionEngine';
import {
  InterviewCategory,
  QuestionDifficulty,
  QuestionFrameworkType,
  InterviewQuestion,
  INTERVIEW_CATEGORIES_CONFIG,
  INTERVIEW_QUESTIONS_BANK,
  BEHAVIORAL_STAR_STEPS,
  TECHNICAL_STEPS,
  PROJECT_8_STEPS,
  GENERAL_STEPS,
  evaluateInterviewResponse,
  InterviewEvaluationResult,
  getQuestionsByCategory,
  getRandomMockQuestions,
} from '@/data/englishInterviewTrainerData';
import {
  Mic,
  MicOff,
  Play,
  Square,
  Volume2,
  CheckCircle2,
  Sparkles,
  Flame,
  Award,
  BookOpen,
  Briefcase,
  ChevronRight,
  ChevronDown,
  Clock,
  Target,
  Cpu,
  Layers,
  Search,
  Lock,
  RefreshCw,
  Copy,
  Check,
  Headphones,
  FileText,
  TrendingUp,
  BarChart2,
  Calendar,
  Star,
  MessageSquare,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  UserCheck,
  Sliders,
  Send,
  GraduationCap,
  Compass,
  Zap,
  RotateCcw,
  Trash2,
  PlayCircle,
  Pause,
  Lightbulb,
  History,
  ListOrdered,
  CheckSquare,
} from 'lucide-react';

type ActiveTab =
  | 'dashboard'
  | 'curriculum'
  | 'daily'
  | 'grammar'
  | 'vocabulary'
  | 'speaking'
  | 'listening'
  | 'technical'
  | 'interview'
  | 'professional'
  | 'assessment'
  | 'journal'
  | 'progress';

const NAVIGATION_TABS: Array<{ id: ActiveTab; label: string; icon: any }> = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
  { id: 'curriculum', label: 'Curriculum (10 Levels)', icon: Layers },
  { id: 'daily', label: 'Daily Training', icon: Flame },
  { id: 'grammar', label: 'Grammar', icon: CheckCircle2 },
  { id: 'vocabulary', label: 'Vocabulary', icon: BookOpen },
  { id: 'speaking', label: 'Speaking', icon: Mic },
  { id: 'listening', label: 'Listening', icon: Headphones },
  { id: 'technical', label: 'Technical English', icon: Cpu },
  { id: 'interview', label: 'Interview English', icon: Award },
  { id: 'professional', label: 'Professional Comm', icon: Briefcase },
  { id: 'assessment', label: 'Weekly Assessment', icon: FileText },
  { id: 'journal', label: 'Speaking Journal', icon: MessageSquare },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
];

const DAILY_PILLARS_CONFIG = [
  { key: 'grammar', title: '1. Grammar', icon: CheckCircle2, label: 'Tenses & SVO' },
  { key: 'vocabulary', title: '2. Vocabulary', icon: BookOpen, label: 'Power Words' },
  { key: 'speaking', title: '3. Speaking', icon: Mic, label: 'Fluency' },
  { key: 'listeningShadowing', title: '4. Listening', icon: Headphones, label: 'Shadowing' },
  { key: 'technicalComm', title: '5. Tech Comm', icon: Cpu, label: '5-Step Explanations' },
  { key: 'professionalInterview', title: '6. Executive / STAR', icon: Award, label: 'Interviews' },
] as const;

function EnglishCareerContent() {
  const { userData, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Tab State
  const initialTab = (searchParams.get('tab') as ActiveTab) || 'dashboard';
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);

  // User State & Storage
  const [userState, setUserState] = useState<EnglishCareerUserState | null>(null);
  const [stateLoading, setStateLoading] = useState<boolean>(true);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Security Access Verification
  const hasAccess = isEnglishCareerAllowed(userData?.email);

  // Copy Feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVocabCategory, setSelectedVocabCategory] = useState<string>('All');

  // Curriculum Explorer State
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedLevelId, setSelectedLevelId] = useState<string>(ALL_CURRICULUM_LEVELS[0].id);
  const [selectedModuleId, setSelectedModuleId] = useState<string>(ALL_CURRICULUM_LEVELS[0].modules[0]?.id || '');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(ALL_CURRICULUM_LEVELS[0].modules[0]?.topics[0]?.id || '');

  // Audio Recording State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordDuration, setRecordDuration] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedSpeakingPrompt, setSelectedSpeakingPrompt] = useState<SpeakingPrompt>(SPEAKING_PROMPTS[0]);
  const [journalSelfRating, setJournalSelfRating] = useState<number>(5);
  const [journalFillerCount, setJournalFillerCount] = useState<number>(0);
  const [journalReflection, setJournalReflection] = useState<string>('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Dedicated Speaking Trainer (8 Modes) State
  const [selectedSpeakingMode, setSelectedSpeakingMode] = useState<SpeakingExercise['modeId']>('daily_self_talk');
  const [selectedSpeakingExercise, setSelectedSpeakingExercise] = useState<SpeakingExercise>(SPEAKING_EXERCISES[0]);
  const [speakingStatus, setSpeakingStatus] = useState<'idle' | 'prepping' | 'speaking' | 'completed'>('idle');
  const [speakingSecondsRemaining, setSpeakingSecondsRemaining] = useState<number>(SPEAKING_EXERCISES[0].timeLimitSeconds);
  const [speakingMicEnabled, setSpeakingMicEnabled] = useState<boolean>(false);
  const [speakingMicError, setSpeakingMicError] = useState<string | null>(null);
  const [speakingAudioUrl, setSpeakingAudioUrl] = useState<string | null>(null);
  const [speakingModelExpanded, setSpeakingModelExpanded] = useState<boolean>(false);
  const [speakingPhraseCopied, setSpeakingPhraseCopied] = useState<string | null>(null);
  const speakingRecorderRef = useRef<MediaRecorder | null>(null);
  const speakingAudioChunksRef = useRef<Blob[]>([]);
  const speakingTimerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Post-Practice Reflection Form / Modal State
  const [isReflectionModalOpen, setIsReflectionModalOpen] = useState<boolean>(false);
  const [reflectionWhatISaid, setReflectionWhatISaid] = useState<string>('');
  const [reflectionWhatIStruggledWith, setReflectionWhatIStruggledWith] = useState<string>('');
  const [reflectionNewWords, setReflectionNewWords] = useState<string>('');
  const [reflectionMistakesNoticed, setReflectionMistakesNoticed] = useState<string>('');
  const [reflectionConfidenceScore, setReflectionConfidenceScore] = useState<number>(4);
  const [reflectionFillerCount, setReflectionFillerCount] = useState<number>(0);

  // Journal Filter State
  const [journalFilterMode, setJournalFilterMode] = useState<string>('all');
  const [journalSearchQuery, setJournalSearchQuery] = useState<string>('');

  // Speaking Journal Sub-Tabs & English Correction Interface State
  const [journalSubTab, setJournalSubTab] = useState<'archive' | 'correction' | 'mistakes'>('archive');
  const [correctionInputText, setCorrectionInputText] = useState<string>(
    'Yesterday I go college and I discuss about my project with my friend.'
  );
  const [correctionResult, setCorrectionResult] = useState<EnglishCorrectionResult | null>(null);
  const [isAnalyzingCorrection, setIsAnalyzingCorrection] = useState<boolean>(false);
  const [mistakesCategoryFilter, setMistakesCategoryFilter] = useState<string>('all');

  // Quiz & Assessment Interactive State
  const [quizSelections, setQuizSelections] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({});
  const [assessmentCompleted, setAssessmentCompleted] = useState<boolean>(false);

  // Notes Modal / Drawer State
  const [activeNoteTopicId, setActiveNoteTopicId] = useState<string | null>(null);
  const [currentNoteText, setCurrentNoteText] = useState<string>('');

  // =========================================================================
  // INTERVIEW TRAINER (10 CATEGORIES + STUDIO + MOCK SIMULATOR) STATE
  // =========================================================================
  const [interviewSubTab, setInterviewSubTab] = useState<'studio' | 'mock' | 'history'>('studio');

  // Studio / Question Explorer Filters & Selection
  const [selectedInterviewCategory, setSelectedInterviewCategory] = useState<InterviewCategory | 'all'>('all');
  const [selectedInterviewDifficulty, setSelectedInterviewDifficulty] = useState<QuestionDifficulty | 'all'>('all');
  const [interviewSearchQuery, setInterviewSearchQuery] = useState<string>('');
  const [selectedInterviewQuestionId, setSelectedInterviewQuestionId] = useState<string>(
    INTERVIEW_QUESTIONS_BANK[0]?.id || 'self_01'
  );

  // Workflow Phases: Question -> Think -> Answer -> Review -> Improve
  const [interviewWorkflowStep, setInterviewWorkflowStep] = useState<'question' | 'think' | 'answer' | 'review' | 'improve'>('question');
  const [studioStepAnswers, setStudioStepAnswers] = useState<Record<string, string>>({});
  const [studioFreeformAnswer, setStudioFreeformAnswer] = useState<string>('');
  const [studioConfidenceRating, setStudioConfidenceRating] = useState<number>(4);
  const [studioFillerCount, setStudioFillerCount] = useState<number>(0);
  const [studioEvaluationResult, setStudioEvaluationResult] = useState<InterviewEvaluationResult | null>(null);
  const [studioIsEvaluating, setStudioIsEvaluating] = useState<boolean>(false);
  const [studioAudioUrl, setStudioAudioUrl] = useState<string | null>(null);
  const [studioIsRecording, setStudioIsRecording] = useState<boolean>(false);
  const [studioRecordSeconds, setStudioRecordSeconds] = useState<number>(0);
  const studioRecorderRef = useRef<MediaRecorder | null>(null);
  const studioAudioChunksRef = useRef<Blob[]>([]);
  const studioTimerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock Interview Simulation Engine State
  const [mockConfig, setMockConfig] = useState<{
    category: InterviewCategory | 'mixed';
    difficulty: QuestionDifficulty | 'mixed';
    questionCount: number;
  }>({
    category: 'mixed',
    difficulty: 'intermediate',
    questionCount: 5,
  });
  const [mockIsRunning, setMockIsRunning] = useState<boolean>(false);
  const [mockQuestions, setMockQuestions] = useState<InterviewQuestion[]>([]);
  const [mockCurrentIndex, setMockCurrentIndex] = useState<number>(0);
  const [mockStepAnswers, setMockStepAnswers] = useState<Record<string, string>>({});
  const [mockFreeformAnswer, setMockFreeformAnswer] = useState<string>('');
  const [mockConfidenceScore, setMockConfidenceScore] = useState<number>(4);
  const [mockFillerCount, setMockFillerCount] = useState<number>(0);
  const [mockAnswersHistory, setMockAnswersHistory] = useState<Array<{
    question: InterviewQuestion;
    userAnswer: string;
    stepAnswers: Record<string, string>;
    evaluation: InterviewEvaluationResult;
  }>>([]);
  const [mockTimerSeconds, setMockTimerSeconds] = useState<number>(0);
  const [mockSessionCompleted, setMockSessionCompleted] = useState<boolean>(false);
  const [mockCompletedRecord, setMockCompletedRecord] = useState<MockInterviewSessionRecord | null>(null);
  const [mockIsSubmittingCurrent, setMockIsSubmittingCurrent] = useState<boolean>(false);
  const mockTimerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Daily Mission Data
  const dailyMission = useMemo(() => getDailyMicroMission(), []);

  // Sync tab with URL query parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab') as ActiveTab;
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Load persistent state
  useEffect(() => {
    if (!userData?.email || !hasAccess) {
      setStateLoading(false);
      return;
    }

    let isMounted = true;
    getEnglishCareerState(userData.email)
      .then((state) => {
        if (isMounted) {
          setUserState(state);
          setStateLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load English Career state:', err);
        if (isMounted) {
          setUserState(createEmptyEnglishCareerState(userData.email!));
          setStateLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [userData?.email, hasAccess]);

  // Computed Metrics
  const metrics: EnglishCareerMetrics = useMemo(() => {
    if (!userState) {
      return calculateEnglishCareerMetrics(createEmptyEnglishCareerState(userData?.email || ''));
    }
    return calculateEnglishCareerMetrics(userState);
  }, [userState, userData?.email]);

  const showNotification = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // =========================================================================
  // DAILY TRAINING SYSTEM STATE & LOGIC
  // =========================================================================
  const [dailySubView, setDailySubView] = useState<'session' | 'history' | 'upcoming' | 'target'>('session');

  const completedDailyDayNumbers = useMemo(() => {
    return (userState?.completedDailyLessons || []).map((l) => l.dayNumber);
  }, [userState?.completedDailyLessons]);

  const todayTrainingPlan: DailyTrainingPlan = useMemo(() => {
    return getTodayPlanForUser(completedDailyDayNumbers);
  }, [completedDailyDayNumbers]);

  const upcomingTrainingPlans: DailyTrainingPlan[] = useMemo(() => {
    return getUpcomingTrainingPlans(todayTrainingPlan.dayNumber, 6);
  }, [todayTrainingPlan.dayNumber]);

  // Active session day & index
  const [currentSessionDay, setCurrentSessionDay] = useState<number>(todayTrainingPlan.dayNumber);
  const [currentPillarIdx, setCurrentPillarIdx] = useState<number>(0);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);

  // Sync session state from persistent storage on load
  useEffect(() => {
    if (userState?.activeDailySession && userState.activeDailySession.dayNumber === todayTrainingPlan.dayNumber) {
      setCurrentSessionDay(userState.activeDailySession.dayNumber);
      setCurrentPillarIdx(userState.activeDailySession.currentPillarIndex || 0);
      setCurrentStepIdx(userState.activeDailySession.currentStepIndex || 0);
    } else {
      setCurrentSessionDay(todayTrainingPlan.dayNumber);
    }
  }, [userState?.activeDailySession, todayTrainingPlan.dayNumber]);

  // Practice Interactive State for Daily Training
  const [dailyPracticeSelections, setDailyPracticeSelections] = useState<Record<string, any>>({});
  const [dailyPracticeSubmitted, setDailyPracticeSubmitted] = useState<Record<string, boolean>>({});
  const [dailyAudioUrl, setDailyAudioUrl] = useState<string | null>(null);
  const [dailyIsRecording, setDailyIsRecording] = useState<boolean>(false);
  const [dailyRecordDuration, setDailyRecordDuration] = useState<number>(0);
  const [dailySelfRating, setDailySelfRating] = useState<number>(5);
  const [dailyFillerCount, setDailyFillerCount] = useState<number>(0);
  const [dailyReflectionNote, setDailyReflectionNote] = useState<string>('');
  const [dailyDayCompleteModal, setDailyDayCompleteModal] = useState<boolean>(false);

  const activeDailyPlan: DailyTrainingPlan = useMemo(() => {
    return getDailyTrainingPlan(currentSessionDay);
  }, [currentSessionDay]);

  const dailyPillarKeys = ['grammar', 'vocabulary', 'speaking', 'listeningShadowing', 'technicalComm', 'professionalInterview'] as const;
  const currentPillarKey = dailyPillarKeys[currentPillarIdx] || 'grammar';

  // Helper to persist in-progress active session immediately
  const persistSessionProgress = async (
    pillarIndex: number,
    stepIndex: number,
    partialProgress?: Partial<DailyPillarProgressState>
  ) => {
    if (!userState) return;
    const existingSession: DailyTrainingSessionState = userState.activeDailySession && userState.activeDailySession.dayNumber === currentSessionDay
      ? userState.activeDailySession
      : {
          dayNumber: currentSessionDay,
          currentPillarIndex: pillarIndex,
          currentStepIndex: stepIndex,
          pillarProgress: {},
          startedAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          isDayComplete: false,
        };

    const currentKey = dailyPillarKeys[pillarIndex];
    const existingPillar = existingSession.pillarProgress[currentKey] || { completed: false };

    const updatedPillar: DailyPillarProgressState = {
      ...existingPillar,
      ...(partialProgress || {}),
    };

    const nextSession: DailyTrainingSessionState = {
      ...existingSession,
      currentPillarIndex: pillarIndex,
      currentStepIndex: stepIndex,
      pillarProgress: {
        ...existingSession.pillarProgress,
        [currentKey]: updatedPillar,
      },
      lastUpdated: new Date().toISOString(),
    };

    try {
      const updatedState = await saveActiveDailySession(userState, nextSession);
      setUserState(updatedState);
    } catch (err) {
      console.error('Error saving active daily session:', err);
    }
  };

  // Switch pillar in daily studio
  const handleSelectDailyPillar = (pillarIndex: number) => {
    setCurrentPillarIdx(pillarIndex);
    setCurrentStepIdx(0);
    setDailyAudioUrl(null);
    setDailyRecordDuration(0);
    persistSessionProgress(pillarIndex, 0);
  };

  // Switch step within pillar
  const handleSelectDailyStep = (stepIndex: number) => {
    setCurrentStepIdx(stepIndex);
    persistSessionProgress(currentPillarIdx, stepIndex);
  };

  // Advance step or complete pillar
  const handleAdvanceDailyStepOrPillar = async () => {
    if (currentStepIdx < 4) {
      const nextStep = currentStepIdx + 1;
      setCurrentStepIdx(nextStep);
      await persistSessionProgress(currentPillarIdx, nextStep);
    } else {
      // Step 4 reached: Mark pillar complete
      const currentKey = dailyPillarKeys[currentPillarIdx];
      await persistSessionProgress(currentPillarIdx, 4, {
        completed: true,
        recordedAudioUrl: dailyAudioUrl || undefined,
        recordDurationSeconds: dailyRecordDuration,
        fillerWordCount: dailyFillerCount,
        selfRating: dailySelfRating,
        notes: dailyReflectionNote,
        completedAt: new Date().toISOString(),
      });
      showNotification(`Pillar ${currentPillarIdx + 1}/6 Completed!`);

      if (currentPillarIdx < 5) {
        const nextPillar = currentPillarIdx + 1;
        setCurrentPillarIdx(nextPillar);
        setCurrentStepIdx(0);
        setDailyAudioUrl(null);
        setDailyRecordDuration(0);
        setDailyReflectionNote('');
        await persistSessionProgress(nextPillar, 0);
      } else {
        setDailyDayCompleteModal(true);
      }
    }
  };

  // Audio Recording for Daily Training Studio
  const startDailyStudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setDailyAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(200);
      setDailyIsRecording(true);
      setDailyRecordDuration(0);

      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = setInterval(() => {
        setDailyRecordDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone access error:', err);
      showNotification('Microphone permission required for speech practice.');
    }
  };

  const stopDailyStudioRecording = () => {
    if (mediaRecorderRef.current && dailyIsRecording) {
      mediaRecorderRef.current.stop();
      setDailyIsRecording(false);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }
  };

  // Finish entire daily training day
  const handleFinalizeDailyDay = async () => {
    if (!userState) return;
    try {
      const updated = await completeDailyTrainingDay(
        userState,
        currentSessionDay,
        activeDailyPlan.estimatedMinutes,
        dailySelfRating,
        dailyReflectionNote || `Completed Day ${currentSessionDay} with 6-pillar mastery.`
      );
      setUserState(updated);
      setDailyDayCompleteModal(false);
      showNotification(`🎉 Day ${currentSessionDay} Training Completed! Streak updated.`);
    } catch (err) {
      console.error('Error finalizing daily day:', err);
    }
  };

  // Switch Tab Handler
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url.toString());
  };

  // Next Best Action Dispatcher
  const handleExecuteNextBestAction = (action: NextBestActionRecommendation) => {
    if (action.targetTab === 'interview') {
      if (action.actionParam) {
        setSelectedInterviewQuestionId(action.actionParam);
      }
      setInterviewSubTab('studio');
      handleTabChange('interview');
    } else if (action.targetTab === 'speaking') {
      if (action.actionParam) {
        setSelectedSpeakingMode(action.actionParam as any);
        const ex = SPEAKING_EXERCISES.find((e) => e.modeId === action.actionParam) || SPEAKING_EXERCISES[0];
        setSelectedSpeakingExercise(ex);
      }
      handleTabChange('speaking');
    } else if (action.targetTab === 'grammar') {
      handleTabChange('grammar');
    } else if (action.targetTab === 'vocabulary') {
      handleTabChange('vocabulary');
    } else if (action.targetTab === 'listening') {
      handleTabChange('listening');
    } else if (action.targetTab === 'technical') {
      handleTabChange('technical');
    } else if (action.targetTab === 'professional') {
      handleTabChange('professional');
    } else if (action.targetTab === 'daily') {
      handleTabChange('daily');
    } else {
      handleTabChange(action.targetTab as ActiveTab);
    }
  };

  // Icon Renderer Helper
  const renderDimensionIcon = (iconName: string, className = 'w-4 h-4') => {
    switch (iconName) {
      case 'Layers':
        return <Layers className={className} />;
      case 'Mic':
        return <Mic className={className} />;
      case 'CheckCircle2':
        return <CheckCircle2 className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'Headphones':
        return <Headphones className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Briefcase':
        return <Briefcase className={className} />;
      case 'Award':
        return <Award className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      default:
        return <Target className={className} />;
    }
  };

  // Copy to Clipboard
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showNotification('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Topic Completion Toggle
  const handleToggleTopic = async (topicId: string) => {
    if (!userState) return;
    try {
      const updated = await toggleTopicCompletion(userState, topicId);
      setUserState(updated);
      const isDone = updated.completedTopicIds.includes(topicId);
      showNotification(isDone ? 'Topic marked as completed!' : 'Topic status updated.');
    } catch (err) {
      console.error('Error toggling topic:', err);
    }
  };

  // Flashcard Mastery Toggle
  const handleToggleMastery = async (vocabId: string) => {
    if (!userState) return;
    try {
      const updated = await toggleFlashcardMastery(userState, vocabId);
      setUserState(updated);
      const isMastered = updated.masteredVocabIds.includes(vocabId);
      showNotification(isMastered ? 'Word added to Mastered Vocabulary!' : 'Word removed from Mastered.');
    } catch (err) {
      console.error('Error toggling vocab mastery:', err);
    }
  };

  // Bookmark Toggle
  const handleToggleBookmark = async (topicId: string) => {
    if (!userState) return;
    try {
      const updated = await toggleBookmark(userState, topicId);
      setUserState(updated);
      const isBookmarked = updated.bookmarkedIds.includes(topicId);
      showNotification(isBookmarked ? 'Bookmarked for review.' : 'Bookmark removed.');
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    }
  };

  // Save Note Handler
  const handleSaveNote = async () => {
    if (!userState || !activeNoteTopicId) return;
    try {
      const updated = await saveTopicNote(userState, activeNoteTopicId, currentNoteText);
      setUserState(updated);
      setActiveNoteTopicId(null);
      showNotification('Note saved successfully!');
    } catch (err) {
      console.error('Error saving note:', err);
    }
  };

  // Open Note Editor
  const openNoteEditor = (topicId: string) => {
    setActiveNoteTopicId(topicId);
    setCurrentNoteText(userState?.notes[topicId]?.noteText || '');
  };

  // =========================================================================
  // AUDIO RECORDING LOGIC (Web Audio / MediaRecorder)
  // =========================================================================
  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(250);
      setIsRecording(true);
      setRecordDuration(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone access error:', err);
      alert('Microphone access is required to practice speaking. Please enable microphone permissions in your browser.');
    }
  };

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  };

  const saveCurrentRecordingToJournal = async () => {
    if (!userState) return;
    try {
      const updated = await saveSpeakingJournalEntry(userState, {
        title: selectedSpeakingPrompt.title,
        promptId: selectedSpeakingPrompt.id,
        promptCategory: selectedSpeakingPrompt.category,
        durationSeconds: recordDuration || 60,
        selfRating: journalSelfRating,
        fillerWordCount: journalFillerCount,
        reflectionNotes: journalReflection || 'Practiced timed engineering delivery and structured articulation.',
        audioBlobUrl: audioUrl || undefined,
        dateStr: new Date().toISOString().split('T')[0],
      });
      setUserState(updated);
      setAudioUrl(null);
      setRecordDuration(0);
      setJournalReflection('');
      setJournalFillerCount(0);
      showNotification('Speaking practice recorded & saved to Journal!');
    } catch (err) {
      console.error('Failed to save journal entry:', err);
    }
  };

  // =========================================================================
  // DEDICATED SPEAKING TRAINER HANDLERS (8 MODES)
  // =========================================================================
  const handleSelectSpeakingMode = (modeId: SpeakingExercise['modeId']) => {
    setSelectedSpeakingMode(modeId);
    const exercisesInMode = getSpeakingExercisesByMode(modeId);
    const firstExercise = exercisesInMode[0] || SPEAKING_EXERCISES[0];
    setSelectedSpeakingExercise(firstExercise);
    setSpeakingSecondsRemaining(firstExercise.timeLimitSeconds);
    setSpeakingStatus('idle');
    setSpeakingAudioUrl(null);
    setSpeakingMicError(null);
    if (speakingTimerIntervalRef.current) {
      clearInterval(speakingTimerIntervalRef.current);
      speakingTimerIntervalRef.current = null;
    }
    if (speakingRecorderRef.current && speakingRecorderRef.current.state !== 'inactive') {
      try {
        speakingRecorderRef.current.stop();
      } catch (e) {
        console.warn('Error stopping speaking recorder:', e);
      }
    }
  };

  const handleSelectSpeakingExercise = (exercise: SpeakingExercise) => {
    setSelectedSpeakingExercise(exercise);
    setSelectedSpeakingMode(exercise.modeId);
    setSpeakingSecondsRemaining(exercise.timeLimitSeconds);
    setSpeakingStatus('idle');
    setSpeakingAudioUrl(null);
    setSpeakingMicError(null);
    if (speakingTimerIntervalRef.current) {
      clearInterval(speakingTimerIntervalRef.current);
      speakingTimerIntervalRef.current = null;
    }
    if (speakingRecorderRef.current && speakingRecorderRef.current.state !== 'inactive') {
      try {
        speakingRecorderRef.current.stop();
      } catch (e) {
        console.warn('Error stopping speaking recorder:', e);
      }
    }
  };

  const handleShuffleSpeakingExercise = () => {
    const randomEx = getRandomSpeakingExercise(selectedSpeakingMode);
    handleSelectSpeakingExercise(randomEx);
  };

  const handleStartSpeakingPractice = async () => {
    setSpeakingAudioUrl(null);
    setSpeakingMicError(null);
    setSpeakingSecondsRemaining(selectedSpeakingExercise.timeLimitSeconds);
    setSpeakingStatus('speaking');

    // Optional microphone recording (graceful fallback if unsupported/denied)
    if (speakingMicEnabled && typeof window !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        speakingAudioChunksRef.current = [];
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) speakingAudioChunksRef.current.push(e.data);
        };
        recorder.onstop = () => {
          const blob = new Blob(speakingAudioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setSpeakingAudioUrl(url);
          stream.getTracks().forEach((track) => track.stop());
        };
        speakingRecorderRef.current = recorder;
        recorder.start(250);
      } catch (err: any) {
        console.warn('Optional microphone access could not be initialized:', err);
        setSpeakingMicError('Microphone is optional. Timer & self-reflection practice are active!');
      }
    }

    if (speakingTimerIntervalRef.current) clearInterval(speakingTimerIntervalRef.current);
    speakingTimerIntervalRef.current = setInterval(() => {
      setSpeakingSecondsRemaining((prev) => {
        if (prev <= 1) {
          handleCompleteSpeakingPractice();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCompleteSpeakingPractice = () => {
    if (speakingTimerIntervalRef.current) {
      clearInterval(speakingTimerIntervalRef.current);
      speakingTimerIntervalRef.current = null;
    }
    if (speakingRecorderRef.current && speakingRecorderRef.current.state !== 'inactive') {
      try {
        speakingRecorderRef.current.stop();
      } catch (e) {
        console.warn('Error stopping speaking recorder on complete:', e);
      }
    }
    setSpeakingStatus('completed');
    setIsReflectionModalOpen(true);
    // Pre-fill / reset reflection form fields
    setReflectionWhatISaid('');
    setReflectionWhatIStruggledWith('');
    setReflectionNewWords('');
    setReflectionMistakesNoticed('');
    setReflectionConfidenceScore(4);
    setReflectionFillerCount(0);
  };

  const handleResetSpeakingPractice = () => {
    if (speakingTimerIntervalRef.current) {
      clearInterval(speakingTimerIntervalRef.current);
      speakingTimerIntervalRef.current = null;
    }
    if (speakingRecorderRef.current && speakingRecorderRef.current.state !== 'inactive') {
      try {
        speakingRecorderRef.current.stop();
      } catch (e) {
        console.warn('Error stopping speaking recorder on reset:', e);
      }
    }
    setSpeakingStatus('idle');
    setSpeakingSecondsRemaining(selectedSpeakingExercise.timeLimitSeconds);
    setSpeakingAudioUrl(null);
    setSpeakingMicError(null);
  };

  const handleSaveSpeakingReflectionToJournal = async () => {
    if (!userState) return;
    try {
      const elapsed = Math.max(1, selectedSpeakingExercise.timeLimitSeconds - speakingSecondsRemaining);
      const newEntryData: Omit<SpeakingJournalEntry, 'id'> = {
        title: selectedSpeakingExercise.topic,
        promptId: selectedSpeakingExercise.id,
        promptCategory: selectedSpeakingExercise.category,
        modeId: selectedSpeakingExercise.modeId,
        durationSeconds: elapsed || selectedSpeakingExercise.timeLimitSeconds,
        selfRating: reflectionConfidenceScore,
        confidenceScore: reflectionConfidenceScore,
        fillerWordCount: reflectionFillerCount,
        reflectionNotes: reflectionWhatISaid || `Practiced ${selectedSpeakingExercise.topic} (${selectedSpeakingExercise.modeTitle})`,
        whatISaid: reflectionWhatISaid,
        whatIStruggledWith: reflectionWhatIStruggledWith,
        newWordsUsed: reflectionNewWords.trim() || undefined,
        mistakesNoticed: reflectionMistakesNoticed.trim() || undefined,
        audioBlobUrl: speakingAudioUrl || undefined,
        dateStr: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString(),
      };

      const updated = await saveSpeakingJournalEntry(userState, newEntryData);
      setUserState(updated);
      setIsReflectionModalOpen(false);
      showNotification('🎯 Practice logged to your Speaking Journal!');
    } catch (err) {
      console.error('Failed to save speaking reflection:', err);
    }
  };

  const handleDeleteJournalEntry = async (entryId: string) => {
    if (!userState) return;
    try {
      const updated = await deleteSpeakingJournalEntry(userState, entryId);
      setUserState(updated);
      showNotification('Journal entry deleted.');
    } catch (err) {
      console.error('Error deleting journal entry:', err);
    }
  };

  // =========================================================================
  // ENGLISH CORRECTION & MISTAKES TRACKER HANDLERS
  // =========================================================================
  const handleAnalyzeCorrection = async (textToAnalyze?: string) => {
    const text = textToAnalyze !== undefined ? textToAnalyze : correctionInputText;
    if (!text.trim()) {
      showNotification('Please enter a sentence to analyze.');
      return;
    }
    setIsAnalyzingCorrection(true);
    try {
      const result = analyzeAndCorrectEnglish(text);
      setCorrectionResult(result);
      if (userState && result.detectedMistakes.length > 0) {
        const updated = await recordDetectedMistakes(userState, result.detectedMistakes);
        setUserState(updated);
      }
      showNotification('✨ Sentence analyzed! Generated Correct, Why, Natural & Professional versions.');
    } catch (e) {
      console.error('Error analyzing sentence:', e);
    } finally {
      setIsAnalyzingCorrection(false);
    }
  };

  const handleToggleMistakeResolved = async (mistakeId: string) => {
    if (!userState) return;
    try {
      const updated = await toggleMistakeResolved(userState, mistakeId);
      setUserState(updated);
      showNotification('Mistake status updated.');
    } catch (e) {
      console.error('Error toggling mistake status:', e);
    }
  };

  const handleDeleteMistake = async (mistakeId: string) => {
    if (!userState) return;
    try {
      const updated = await deleteTrackedMistake(userState, mistakeId);
      setUserState(updated);
      showNotification('Removed mistake from tracking.');
    } catch (e) {
      console.error('Error deleting mistake:', e);
    }
  };

  // Complete Daily Micro-Drill Part
  const handleCompleteDailyPart = async (part: 'speech' | 'grammar' | 'vocab') => {
    if (!userState) return;
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const updated = await logDailyTrainingPart(userState, todayStr, part);
      setUserState(updated);
      showNotification(`Daily ${part} challenge completed!`);
    } catch (err) {
      console.error('Error logging daily drill:', err);
    }
  };

  // Submit Assessment
  const handleSubmitAssessment = async () => {
    if (!userState) return;
    let correct = 0;
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};

    ASSESSMENT_QUESTIONS.forEach((q) => {
      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { correct: 0, total: 0 };
      }
      categoryBreakdown[q.category].total += 1;

      if (assessmentAnswers[q.id] === q.correctIndex) {
        correct++;
        categoryBreakdown[q.category].correct += 1;
      }
    });

    const scorePercent = Math.round((correct / ASSESSMENT_QUESTIONS.length) * 100);

    try {
      const updated = await saveAssessmentResult(userState, {
        dateStr: new Date().toISOString().split('T')[0],
        scorePercent,
        totalQuestions: ASSESSMENT_QUESTIONS.length,
        correctCount: correct,
        categoryBreakdown,
      });
      setUserState(updated);
      setAssessmentCompleted(true);
      showNotification(`Weekly Assessment submitted! Score: ${scorePercent}%`);
    } catch (err) {
      console.error('Error saving assessment result:', err);
    }
  };

  // Active Curriculum Level & Module
  const activeCurriculumLevel: CurriculumLevel = useMemo(() => {
    return getCurriculumLevelById(selectedLevelId) || ALL_CURRICULUM_LEVELS[0];
  }, [selectedLevelId]);

  const activeCurriculumModule: CurriculumModule = useMemo(() => {
    const found = activeCurriculumLevel.modules.find((m) => m.id === selectedModuleId);
    return found || activeCurriculumLevel.modules[0] || ALL_CURRICULUM_LEVELS[0].modules[0];
  }, [activeCurriculumLevel, selectedModuleId]);

  const activeCurriculumTopic: CurriculumTopic = useMemo(() => {
    const found = activeCurriculumModule.topics.find((t) => t.id === selectedTopicId);
    return found || activeCurriculumModule.topics[0] || ALL_CURRICULUM_LEVELS[0].modules[0].topics[0];
  }, [activeCurriculumModule, selectedTopicId]);

  // Handle Level Selection
  const handleSelectLevel = (level: CurriculumLevel) => {
    setSelectedLevelId(level.id);
    if (level.modules.length > 0) {
      setSelectedModuleId(level.modules[0].id);
      if (level.modules[0].topics.length > 0) {
        setSelectedTopicId(level.modules[0].topics[0].id);
      }
    }
  };

  // Handle Module Selection
  const handleSelectModule = (module: CurriculumModule) => {
    setSelectedModuleId(module.id);
    if (module.topics.length > 0) {
      setSelectedTopicId(module.topics[0].id);
    }
  };

  // Total topics completed across the 10-level curriculum
  const totalCurriculumTopicsCount = useMemo(() => getTotalCurriculumTopicsCount(), []);
  const completedCurriculumCount = useMemo(() => {
    if (!userState) return 0;
    return userState.completedTopicIds.length;
  }, [userState]);

  // =========================================================================
  // ACCESS CONTROL SECURITY GUARD
  // =========================================================================
  if (loading || (hasAccess && stateLoading)) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-sm text-slate-400">
        <div className="flex items-center gap-3 bg-slate-900 px-6 py-4 rounded-2xl border border-slate-800 shadow-2xl">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span>Verifying Communication Trainer Access &amp; Records...</span>
        </div>
      </div>
    );
  }

  // Unauthorized Account Guard
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-800 text-center space-y-6">
          <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-center mx-auto text-rose-400 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 text-rose-400 text-xs font-mono font-bold rounded-full uppercase tracking-wider">
              Private Security Guard
            </div>
            <h1 className="text-2xl font-bold font-display text-white">
              Restricted Portal
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              The English &amp; Career Communication Trainer is an exclusive private module reserved
              for authorized personnel.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-400">
            Authenticated Account: <span className="text-white">{userData?.email || 'Guest'}</span>
          </div>

          <Link
            href="/home"
            className="w-full py-3.5 bg-gradient-to-r from-[#006cd2] to-blue-600 hover:from-[#005bb5] hover:to-blue-700 text-white font-sans font-bold rounded-2xl transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 text-sm"
          >
            <span>Return to LevelUpDev Hub</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Filtered Vocabulary Items
  const filteredVocab = VOCABULARY_LIST.filter((v) => {
    const matchesCat = selectedVocabCategory === 'All' || v.category === selectedVocabCategory;
    const matchesQuery =
      !searchQuery ||
      v.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.corporateContext.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  // =========================================================================
  // INTERVIEW TRAINER COMPUTED & HANDLER FUNCTIONS
  // =========================================================================
  const filteredInterviewQuestions = useMemo(() => {
    return INTERVIEW_QUESTIONS_BANK.filter((q) => {
      if (selectedInterviewCategory !== 'all' && q.category !== selectedInterviewCategory) return false;
      if (selectedInterviewDifficulty !== 'all' && q.difficulty.toLowerCase() !== selectedInterviewDifficulty.toLowerCase()) return false;
      if (interviewSearchQuery.trim()) {
        const query = interviewSearchQuery.toLowerCase();
        const matchTitle = (q.title || q.categoryTitle || '').toLowerCase().includes(query);
        const matchQuestion = q.question.toLowerCase().includes(query);
        const keywords = q.expectedKeywords || q.thinkPhase?.keyKeywords || [];
        const matchKeywords = keywords.some((k: string) => k.toLowerCase().includes(query));
        if (!matchTitle && !matchQuestion && !matchKeywords) return false;
      }
      return true;
    });
  }, [selectedInterviewCategory, selectedInterviewDifficulty, interviewSearchQuery]);

  const currentStudioQuestion: InterviewQuestion = useMemo(() => {
    return (
      INTERVIEW_QUESTIONS_BANK.find((q) => q.id === selectedInterviewQuestionId) ||
      filteredInterviewQuestions[0] ||
      INTERVIEW_QUESTIONS_BANK[0]
    );
  }, [selectedInterviewQuestionId, filteredInterviewQuestions]);

  const getFrameworkStepList = (frameworkType: QuestionFrameworkType) => {
    const norm = (frameworkType || '').toLowerCase();
    if (norm.includes('star')) return BEHAVIORAL_STAR_STEPS;
    if (norm.includes('tech')) return TECHNICAL_STEPS;
    if (norm.includes('project')) return PROJECT_8_STEPS;
    return GENERAL_STEPS;
  };

  const handleSelectInterviewQuestion = (qId: string) => {
    setSelectedInterviewQuestionId(qId);
    setInterviewWorkflowStep('question');
    setStudioStepAnswers({});
    setStudioFreeformAnswer('');
    setStudioEvaluationResult(null);
    setStudioAudioUrl(null);
  };

  // Studio Audio Recording
  const startStudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      studioAudioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          studioAudioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(studioAudioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setStudioAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      studioRecorderRef.current = mediaRecorder;
      mediaRecorder.start(250);
      setStudioIsRecording(true);
      setStudioRecordSeconds(0);

      if (studioTimerIntervalRef.current) clearInterval(studioTimerIntervalRef.current);
      studioTimerIntervalRef.current = setInterval(() => {
        setStudioRecordSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone access error:', err);
      showNotification('Microphone access is required to record your spoken answer.');
    }
  };

  const stopStudioRecording = () => {
    if (studioRecorderRef.current && studioIsRecording) {
      studioRecorderRef.current.stop();
      setStudioIsRecording(false);
      if (studioTimerIntervalRef.current) {
        clearInterval(studioTimerIntervalRef.current);
        studioTimerIntervalRef.current = null;
      }
    }
  };

  // Studio Evaluation Handler
  const handleEvaluateStudioAnswer = async () => {
    if (!currentStudioQuestion) return;
    setStudioIsEvaluating(true);

    const steps = getFrameworkStepList(currentStudioQuestion.frameworkType);
    const stepAnswersList = steps.map((s) => studioStepAnswers[s.key] || '');
    const combinedAnswer = [
      studioFreeformAnswer,
      ...steps.map((s) => `${s.label.toUpperCase()}: ${studioStepAnswers[s.key] || ''}`),
    ]
      .filter(Boolean)
      .join('\n\n');

    const result = evaluateInterviewResponse({
      question: currentStudioQuestion,
      freeformAnswer: combinedAnswer,
      stepAnswers: stepAnswersList,
      userConfidenceRating: studioConfidenceRating,
      fillerWordCount: studioFillerCount,
    });

    setStudioEvaluationResult(result);
    setStudioIsEvaluating(false);
    setInterviewWorkflowStep('review');

    if (userState) {
      try {
        const practiceRecord: QuestionPracticeRecord = {
          id: `practice_${Date.now()}`,
          questionId: currentStudioQuestion.id,
          category: currentStudioQuestion.category,
          difficulty: currentStudioQuestion.difficulty,
          frameworkType: currentStudioQuestion.frameworkType,
          userAnswer: combinedAnswer,
          stepAnswers: studioStepAnswers,
          evaluation: {
            clarityScore: result.clarityScore,
            structureScore: result.structureScore,
            relevanceScore: result.relevanceScore,
            confidenceScore: result.confidenceScore,
            technicalAccuracyScore: result.technicalAccuracyScore,
            concisenessScore: result.concisenessScore,
            overallScore: result.overallScore,
            strengths: result.strengths,
            weakAreas: result.weakAreas,
            recommendations: result.recommendations,
          },
          completedAt: new Date().toISOString(),
        };
        const updated = await saveQuestionPracticeLog(userState, practiceRecord);
        setUserState(updated);
        showNotification('Answer evaluated across 6 dimensions & saved to progress!');
      } catch (err) {
        console.error('Failed to save practice log:', err);
      }
    }
  };

  // Mock Interview Simulator Handlers
  const handleStartMockInterview = () => {
    const questions = getRandomMockQuestions(
      mockConfig.category,
      mockConfig.difficulty,
      mockConfig.questionCount
    );

    setMockQuestions(questions);
    setMockCurrentIndex(0);
    setMockStepAnswers({});
    setMockFreeformAnswer('');
    setMockConfidenceScore(4);
    setMockFillerCount(0);
    setMockAnswersHistory([]);
    setMockTimerSeconds(0);
    setMockSessionCompleted(false);
    setMockCompletedRecord(null);
    setMockIsRunning(true);

    if (mockTimerIntervalRef.current) clearInterval(mockTimerIntervalRef.current);
    mockTimerIntervalRef.current = setInterval(() => {
      setMockTimerSeconds((prev) => prev + 1);
    }, 1000);
  };

  const handleCancelMockInterview = () => {
    if (mockTimerIntervalRef.current) {
      clearInterval(mockTimerIntervalRef.current);
      mockTimerIntervalRef.current = null;
    }
    setMockIsRunning(false);
  };

  const handleSubmitCurrentMockAnswer = async () => {
    if (mockQuestions.length === 0) return;
    const currentQ = mockQuestions[mockCurrentIndex];
    if (!currentQ) return;

    setMockIsSubmittingCurrent(true);

    const steps = getFrameworkStepList(currentQ.frameworkType);
    const stepAnswersList = steps.map((s) => mockStepAnswers[s.key] || '');
    const combinedAnswer = [
      mockFreeformAnswer,
      ...steps.map((s) => `${s.label.toUpperCase()}: ${mockStepAnswers[s.key] || ''}`),
    ]
      .filter(Boolean)
      .join('\n\n');

    const evalResult = evaluateInterviewResponse({
      question: currentQ,
      freeformAnswer: combinedAnswer,
      stepAnswers: stepAnswersList,
      userConfidenceRating: mockConfidenceScore,
      fillerWordCount: mockFillerCount,
    });

    const updatedHistory = [
      ...mockAnswersHistory,
      {
        question: currentQ,
        userAnswer: combinedAnswer,
        stepAnswers: { ...mockStepAnswers },
        evaluation: evalResult,
      },
    ];
    setMockAnswersHistory(updatedHistory);

    const nextIndex = mockCurrentIndex + 1;
    if (nextIndex < mockQuestions.length) {
      // Proceed to next question
      setMockCurrentIndex(nextIndex);
      setMockStepAnswers({});
      setMockFreeformAnswer('');
      setMockConfidenceScore(4);
      setMockFillerCount(0);
      setMockIsSubmittingCurrent(false);
    } else {
      // Finalize Mock Session!
      if (mockTimerIntervalRef.current) {
        clearInterval(mockTimerIntervalRef.current);
        mockTimerIntervalRef.current = null;
      }

      // Compute aggregate scores across the 6 dimensions
      const totalQ = updatedHistory.length;
      const sumClarity = updatedHistory.reduce((acc, h) => acc + h.evaluation.clarityScore, 0);
      const sumStructure = updatedHistory.reduce((acc, h) => acc + h.evaluation.structureScore, 0);
      const sumRelevance = updatedHistory.reduce((acc, h) => acc + h.evaluation.relevanceScore, 0);
      const sumConfidence = updatedHistory.reduce((acc, h) => acc + h.evaluation.confidenceScore, 0);
      const sumTech = updatedHistory.reduce((acc, h) => acc + h.evaluation.technicalAccuracyScore, 0);
      const sumConcise = updatedHistory.reduce((acc, h) => acc + h.evaluation.concisenessScore, 0);
      const sumOverall = updatedHistory.reduce((acc, h) => acc + h.evaluation.overallScore, 0);

      const dimensionScores = {
        clarity: Math.round(sumClarity / totalQ),
        structure: Math.round(sumStructure / totalQ),
        relevance: Math.round(sumRelevance / totalQ),
        confidence: Math.round(sumConfidence / totalQ),
        technicalAccuracy: Math.round(sumTech / totalQ),
        conciseness: Math.round(sumConcise / totalQ),
      };
      const overallScore = Math.round(sumOverall / totalQ);

      // Aggregate distinct weak areas & recommendations
      const allWeakAreas: string[] = [];
      const allRecs: string[] = [];
      updatedHistory.forEach((h) => {
        h.evaluation.weakAreas.forEach((w) => {
          if (!allWeakAreas.includes(w)) allWeakAreas.push(w);
        });
        h.evaluation.recommendations.forEach((r) => {
          if (!allRecs.includes(r)) allRecs.push(r);
        });
      });

      const sessionRecord: MockInterviewSessionRecord = {
        id: `mock_session_${Date.now()}`,
        dateStr: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        category: mockConfig.category,
        difficulty: mockConfig.difficulty,
        totalQuestions: totalQ,
        overallScore,
        dimensionScores,
        questionSummaries: updatedHistory.map((h) => ({
          questionId: h.question.id,
          questionText: h.question.question,
          category: h.question.category,
          score: h.evaluation.overallScore,
          userAnswer: h.userAnswer,
          feedback: h.evaluation.strengths[0] || 'Structured answer submitted.',
        })),
        identifiedWeakAreas: allWeakAreas.slice(0, 5),
        recommendedDrills: allRecs.slice(0, 5),
        completedAt: new Date().toISOString(),
      };

      setMockCompletedRecord(sessionRecord);
      setMockSessionCompleted(true);
      setMockIsRunning(false);
      setMockIsSubmittingCurrent(false);

      if (userState) {
        try {
          const updated = await saveMockInterviewSession(userState, sessionRecord);
          setUserState(updated);
          showNotification('Mock Interview completed! Session saved to your performance record.');
        } catch (err) {
          console.error('Failed to save mock interview:', err);
        }
      }
    }
  };

  const handleDeleteMockSession = async (sessionId: string) => {
    if (!userState) return;
    try {
      const updated = await deleteMockInterviewSession(userState, sessionId);
      setUserState(updated);
      showNotification('Mock session removed from history.');
    } catch (err) {
      console.error('Failed to delete mock session:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-[#006cd2] selection:text-white flex flex-col relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-[#006cd2]/10 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] -right-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px]" />
      </div>

      {/* Floating Save Toast */}
      <AnimatePresence>
        {saveToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-xl text-xs font-mono shadow-2xl flex items-center gap-2 backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{saveToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Note Editor Drawer / Modal */}
      <AnimatePresence>
        {activeNoteTopicId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-white font-bold font-display text-base">
                  <FileText className="w-4 h-4 text-[#006cd2]" />
                  <span>Personal Topic Note</span>
                </div>
                <button
                  onClick={() => setActiveNoteTopicId(null)}
                  className="text-slate-400 hover:text-white text-xs font-mono"
                >
                  ✕ Close
                </button>
              </div>

              <p className="text-xs text-slate-400 font-mono">
                Topic ID: <span className="text-cyan-400">{activeNoteTopicId}</span>
              </p>

              <textarea
                rows={6}
                value={currentNoteText}
                onChange={(e) => setCurrentNoteText(e.target.value)}
                placeholder="Write your personal reminders, power phrases, or speaking nuances here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#006cd2] resize-none"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setActiveNoteTopicId(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-mono text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNote}
                  className="px-5 py-2 bg-[#006cd2] hover:bg-blue-600 text-white rounded-xl text-xs font-mono font-bold shadow-md shadow-blue-500/20"
                >
                  Save Note
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post-Practice Reflection Modal */}
      <AnimatePresence>
        {isReflectionModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl my-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display text-white">
                      Speaking Practice Reflection
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Log what you said, struggles, new words &amp; mistakes
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsReflectionModalOpen(false)}
                  className="text-slate-400 hover:text-white text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800"
                >
                  ✕ Close
                </button>
              </div>

              {/* Topic context pill */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">
                    {selectedSpeakingExercise.modeTitle}
                  </span>
                  <span className="font-semibold text-white">
                    {selectedSpeakingExercise.topic}
                  </span>
                </div>
                <span className="font-mono text-slate-400 text-[11px] shrink-0">
                  Target: {selectedSpeakingExercise.timeLimitSeconds}s
                </span>
              </div>

              {/* Audio player if user recorded audio */}
              {speakingAudioUrl && (
                <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-800/40 space-y-2">
                  <span className="text-[10px] font-mono text-blue-400 uppercase font-bold flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5" />
                    <span>Your Recorded Audio</span>
                  </span>
                  <audio controls src={speakingAudioUrl} className="w-full h-8" />
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-4">
                {/* 1. What I said */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
                    <span>1. What I Said / Key Points Covered:</span>
                    <span className="text-slate-500 font-normal">Summary of your response</span>
                  </label>
                  <textarea
                    rows={3}
                    value={reflectionWhatISaid}
                    onChange={(e) => setReflectionWhatISaid(e.target.value)}
                    placeholder="E.g., I defined the Kafka architecture, described consumer group balancing, and explained how we handled duplicate event deduplication."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                {/* 2. What I struggled with */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-amber-400 flex items-center justify-between">
                    <span>2. What I Struggled With:</span>
                    <span className="text-slate-500 font-normal">Hesitations, missing words, pacing</span>
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionWhatIStruggledWith}
                    onChange={(e) => setReflectionWhatIStruggledWith(e.target.value)}
                    placeholder="E.g., Hesitated for 5 seconds when transitioning between problem statement and architectural solution."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 resize-none"
                  />
                </div>

                {/* 3. New words & 4. Mistakes I noticed (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-cyan-400">
                      3. New Words / Phrases Used:
                    </label>
                    <input
                      type="text"
                      value={reflectionNewWords}
                      onChange={(e) => setReflectionNewWords(e.target.value)}
                      placeholder="e.g. throughput, decoupled, bottleneck"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-rose-400">
                      4. Mistakes I Noticed:
                    </label>
                    <input
                      type="text"
                      value={reflectionMistakesNoticed}
                      onChange={(e) => setReflectionMistakesNoticed(e.target.value)}
                      placeholder="e.g. said 'discussed about', used 4 'ums'"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                {/* 5. Confidence Score (1-5) & Filler Words */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-300 block">
                      5. Confidence Score (1–5):
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((score) => {
                        const labels = ['1 (Hesitant)', '2 (Fair)', '3 (Clear)', '4 (Confident)', '5 (Masterful)'];
                        return (
                          <button
                            key={score}
                            type="button"
                            onClick={() => setReflectionConfidenceScore(score)}
                            title={labels[score - 1]}
                            className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center justify-center gap-1 border ${
                              reflectionConfidenceScore === score
                                ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                            }`}
                          >
                            <Star className={`w-3.5 h-3.5 ${reflectionConfidenceScore >= score ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                            <span>{score}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-300 block">
                      Filler Words Counted:
                    </label>
                    <div className="flex items-center gap-2">
                      {[0, 1, 2, 3, 5].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setReflectionFillerCount(count)}
                          className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition border ${
                            reflectionFillerCount === count
                              ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {count === 5 ? '5+' : count}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsReflectionModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={handleSaveSpeakingReflectionToJournal}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-sans font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save to Speaking Journal</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col flex-1 pb-mobile-nav">
        {/* Top Header Navigation */}
        <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/home"
                className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-slate-700"
              >
                <ChevronRight className="w-3.5 h-3.5 rotate-180 text-[#006cd2]" />
                <span>Back to Home</span>
              </Link>
              <div className="h-4 w-px bg-slate-800 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-blue-400 font-semibold flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-[#006cd2]" />
                  English &amp; Career Communication Trainer
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-semibold">{metrics.currentLevel}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Training Streak */}
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-orange-400 bg-orange-950/40 border border-orange-800/40 px-3 py-1.5 rounded-xl">
                <Flame className="w-3.5 h-3.5 fill-orange-400 animate-pulse" />
                <span>{metrics.trainingStreak} Day Streak</span>
              </div>

              {/* Overall Readiness Badge */}
              <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1.5 rounded-xl">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>{metrics.overallReadiness}% Readiness</span>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs Ribbon */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none py-1 border-t border-slate-900">
            {NAVIGATION_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#006cd2] text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
          {/* ========================================================================= */}
          {/* 1. DASHBOARD TAB */}
          {/* ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* ========================================================================= */}
              {/* HERO & OVERALL COMMUNICATION READINESS */}
              {/* ========================================================================= */}
              <section className="relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006cd2] via-cyan-400 to-emerald-400" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="space-y-3 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-mono font-bold tracking-wide">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#006cd2]" />
                      <span>PRIVATE ENGLISH &amp; CAREER COMMUNICATION TRAINER</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                      Master English fluency for{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
                        global tech leadership.
                      </span>
                    </h1>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Real-time communication readiness index computed deterministically from your actual speech recordings, grammar drills, mock interview evaluations, and daily training milestones.
                    </p>
                  </div>

                  {/* Overall Readiness Card */}
                  <div className="bg-slate-950/90 border border-slate-800/90 rounded-3xl p-6 w-full lg:w-88 space-y-4 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-cyan-400" />
                        OVERALL READINESS
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-bold">
                        {metrics.currentLevel}
                      </span>
                    </div>

                    <div className="py-1">
                      <div className="font-display text-5xl font-black text-white flex items-center justify-center gap-2 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400">
                          {metrics.overallReadiness}%
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 block mt-1">
                        Communication Readiness Score
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-800">
                        <div
                          className="bg-gradient-to-r from-[#006cd2] via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-700 shadow-sm"
                          style={{ width: `${Math.max(5, metrics.overallReadiness)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1">
                        <span>Streak: <b className="text-orange-400 font-bold">{metrics.trainingStreak} Days 🔥</b></span>
                        <span>Completed: <b className="text-white font-bold">{metrics.trainingDaysCompleted} Days</b></span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ========================================================================= */}
              {/* NEXT BEST ACTION (AI RECOMMENDATION ENGINE) */}
              {/* ========================================================================= */}
              <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-amber-950/20 border border-amber-500/30 p-6 sm:p-7 backdrop-blur-xl shadow-xl">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2.5 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold tracking-wide">
                        <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>NEXT BEST ACTION</span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px] font-mono">
                        <span>Weakest Skill:</span>
                        <span className="text-amber-400 font-bold">{metrics.weakestSkill.name}</span>
                        <span className="text-slate-400">({metrics.weakestSkill.score}%)</span>
                      </div>

                      <div className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>~{metrics.nextBestAction.estimatedMinutes} min</span>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg sm:text-xl font-bold font-display text-white flex items-center gap-2">
                        {metrics.nextBestAction.activityTitle}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1">
                        {metrics.nextBestAction.activityDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleExecuteNextBestAction(metrics.nextBestAction)}
                      className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-sans font-extrabold rounded-2xl transition-all duration-300 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
                    >
                      <span>Start Practice</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </button>
                  </div>
                </div>
              </section>

              {/* ========================================================================= */}
              {/* THIS WEEK PROGRESS (7-DAY GOAL TRACKER) */}
              {/* ========================================================================= */}
              <section className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-400" />
                    <h2 className="text-base sm:text-lg font-bold font-display text-white">
                      THIS WEEK PROGRESS
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-[10px] font-mono font-bold">
                      Past 7 Days
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Actual stored completions vs weekly targets
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
                  {/* Grammar This Week */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-2.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Grammar
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {metrics.thisWeek.grammar.completed}/{metrics.thisWeek.grammar.target}
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${metrics.thisWeek.grammar.percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>{metrics.thisWeek.grammar.isMet ? '✅ Goal Met' : `${metrics.thisWeek.grammar.target - metrics.thisWeek.grammar.completed} more left`}</span>
                      <span>{metrics.thisWeek.grammar.percent}%</span>
                    </div>
                  </div>

                  {/* Speaking This Week */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-2.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                        <Mic className="w-3.5 h-3.5 text-cyan-400" /> Speaking
                      </span>
                      <span className="text-cyan-400 font-bold">
                        {metrics.thisWeek.speaking.completed}/{metrics.thisWeek.speaking.target}
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${metrics.thisWeek.speaking.percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>{metrics.thisWeek.speaking.isMet ? '✅ Goal Met' : `${metrics.thisWeek.speaking.target - metrics.thisWeek.speaking.completed} more left`}</span>
                      <span>{metrics.thisWeek.speaking.percent}%</span>
                    </div>
                  </div>

                  {/* Listening This Week */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-2.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                        <Headphones className="w-3.5 h-3.5 text-indigo-400" /> Listening
                      </span>
                      <span className="text-indigo-400 font-bold">
                        {metrics.thisWeek.listening.completed}/{metrics.thisWeek.listening.target}
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${metrics.thisWeek.listening.percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>{metrics.thisWeek.listening.isMet ? '✅ Goal Met' : `${metrics.thisWeek.listening.target - metrics.thisWeek.listening.completed} more left`}</span>
                      <span>{metrics.thisWeek.listening.percent}%</span>
                    </div>
                  </div>

                  {/* Technical This Week */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-2.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-sky-400" /> Technical
                      </span>
                      <span className="text-sky-400 font-bold">
                        {metrics.thisWeek.technical.completed}/{metrics.thisWeek.technical.target}
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-sky-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${metrics.thisWeek.technical.percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>{metrics.thisWeek.technical.isMet ? '✅ Goal Met' : `${metrics.thisWeek.technical.target - metrics.thisWeek.technical.completed} more left`}</span>
                      <span>{metrics.thisWeek.technical.percent}%</span>
                    </div>
                  </div>

                  {/* Interview This Week */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-2.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-purple-400" /> Interview
                      </span>
                      <span className="text-purple-400 font-bold">
                        {metrics.thisWeek.interview.completed}/{metrics.thisWeek.interview.target}
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${metrics.thisWeek.interview.percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>{metrics.thisWeek.interview.isMet ? '✅ Goal Met' : `${metrics.thisWeek.interview.target - metrics.thisWeek.interview.completed} more left`}</span>
                      <span>{metrics.thisWeek.interview.percent}%</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* ========================================================================= */}
              {/* KEY PERFORMANCE STATISTICS & DRILL METRICS */}
              {/* ========================================================================= */}
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-[#006cd2]" />
                    <h2 className="text-base sm:text-lg font-bold font-display text-white">
                      PERFORMANCE STATISTICS &amp; REPOSITORY MILESTONES
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Real state counters
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                  {/* Current Level */}
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Current Level
                    </div>
                    <div className="text-xs sm:text-sm font-bold font-display text-white truncate" title={metrics.currentLevel}>
                      {metrics.currentLevel}
                    </div>
                    <div className="text-[10px] font-mono text-cyan-400 font-semibold">
                      {metrics.overallReadiness}% Readiness
                    </div>
                  </div>

                  {/* Training Days Completed */}
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Training Days
                    </div>
                    <div className="text-lg sm:text-xl font-bold font-display text-white">
                      {metrics.trainingDaysCompleted}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Daily Lessons Done
                    </div>
                  </div>

                  {/* Current Streak */}
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Current Streak
                    </div>
                    <div className="text-lg sm:text-xl font-bold font-display text-orange-400 flex items-center gap-1">
                      <Flame className="w-4 h-4 fill-orange-400" />
                      <span>{metrics.trainingStreak} Days</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Consecutive Active
                    </div>
                  </div>

                  {/* Total Speaking Sessions */}
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Speaking Sessions
                    </div>
                    <div className="text-lg sm:text-xl font-bold font-display text-cyan-400">
                      {metrics.totalSpeakingSessions}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Recorded Journal Drills
                    </div>
                  </div>

                  {/* Technical Explanations */}
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Tech Explanations
                    </div>
                    <div className="text-lg sm:text-xl font-bold font-display text-sky-400">
                      {metrics.technicalExplanationsCompleted}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Architecture &amp; Code Drills
                    </div>
                  </div>

                  {/* Mock Interviews */}
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Mock Interviews
                    </div>
                    <div className="text-lg sm:text-xl font-bold font-display text-purple-400">
                      {metrics.mockInterviewsCompleted}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Completed Sessions
                    </div>
                  </div>

                  {/* Grammar Accuracy */}
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Grammar Accuracy
                    </div>
                    <div className="text-lg sm:text-xl font-bold font-display text-emerald-400">
                      {metrics.grammarAccuracy}%
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Assessments &amp; Precision
                    </div>
                  </div>

                  {/* Vocabulary Learned */}
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Vocab Learned
                    </div>
                    <div className="text-lg sm:text-xl font-bold font-display text-amber-400">
                      {metrics.vocabularyLearned}
                      <span className="text-xs text-slate-500 font-normal"> / {metrics.totalVocabulary}</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Mastered Terms
                    </div>
                  </div>

                  {/* Common Mistakes */}
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Common Mistakes
                    </div>
                    <div className="text-base sm:text-lg font-bold font-display text-rose-400">
                      {metrics.commonMistakesCount} Unresolved
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 truncate" title={metrics.topMistakeCategory}>
                      Top: <b className="text-slate-300">{metrics.topMistakeCategory}</b>
                    </div>
                  </div>

                  {/* Weakest Skill */}
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Weakest Skill
                    </div>
                    <div className="text-xs sm:text-sm font-bold font-display text-amber-400 truncate" title={metrics.weakestSkill.name}>
                      {metrics.weakestSkill.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Score: <b className="text-amber-400">{metrics.weakestSkill.score}%</b>
                    </div>
                  </div>

                  {/* Strongest Skill */}
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-2">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Strongest Skill
                    </div>
                    <div className="text-xs sm:text-sm font-bold font-display text-emerald-400 truncate" title={metrics.strongestSkill.name}>
                      {metrics.strongestSkill.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Proficiency: <b className="text-emerald-400">{metrics.strongestSkill.score}%</b> ({metrics.strongestSkill.badge})
                    </div>
                  </div>
                </div>
              </section>

              {/* ========================================================================= */}
              {/* OVERALL COMMUNICATION READINESS — 10 SKILL DIMENSIONS BREAKDOWN */}
              {/* ========================================================================= */}
              <section className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#006cd2]" />
                    <h2 className="text-base sm:text-lg font-bold font-display text-white">
                      OVERALL COMMUNICATION READINESS BREAKDOWN
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-mono font-bold">
                      10 Dimensions
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Live aggregate scoring based on curriculum mastery &amp; evaluation logs
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.values(metrics.tenDimensions).map((dimension) => {
                    const isWeakest = dimension.id === metrics.weakestSkill.id;
                    const isStrongest = dimension.id === metrics.strongestSkill.id;

                    return (
                      <div
                        key={dimension.id}
                        className={`p-5 rounded-2xl bg-slate-900/80 border transition-all duration-300 space-y-3.5 flex flex-col justify-between ${
                          isWeakest
                            ? 'border-amber-500/40 bg-gradient-to-b from-amber-950/10 to-slate-900/90 shadow-lg shadow-amber-500/5'
                            : isStrongest
                            ? 'border-emerald-500/40 bg-gradient-to-b from-emerald-950/10 to-slate-900/90'
                            : 'border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="p-2 rounded-xl bg-slate-800/80 text-cyan-400 border border-slate-700/60">
                                {renderDimensionIcon(dimension.iconName, 'w-4 h-4')}
                              </div>
                              <div>
                                <h3 className="text-sm font-bold font-display text-white">
                                  {dimension.name}
                                </h3>
                                <span className="text-[10px] font-mono text-slate-400">
                                  {dimension.category}
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-base font-bold font-display text-white block">
                                {dimension.score}%
                              </span>
                              <span
                                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                                  isWeakest
                                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                    : isStrongest
                                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                    : dimension.score >= 80
                                    ? 'bg-emerald-500/10 text-emerald-400'
                                    : dimension.score >= 40
                                    ? 'bg-blue-500/10 text-blue-400'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {isWeakest ? 'Needs Focus' : dimension.badge}
                              </span>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800/80">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isWeakest
                                  ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                                  : isStrongest
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                                  : dimension.score >= 80
                                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-400'
                                  : dimension.score >= 40
                                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400'
                                  : 'bg-gradient-to-r from-slate-600 to-slate-500'
                              }`}
                              style={{ width: `${Math.max(5, dimension.score)}%` }}
                            />
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed min-h-[32px]">
                            {dimension.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-slate-400">
                            {dimension.totalCompleted} Completed
                          </span>
                          <button
                            onClick={() => {
                              if (dimension.targetTab === 'grammar') handleTabChange('grammar');
                              else if (dimension.targetTab === 'vocabulary') handleTabChange('vocabulary');
                              else if (dimension.targetTab === 'speaking') handleTabChange('speaking');
                              else if (dimension.targetTab === 'listening') handleTabChange('listening');
                              else if (dimension.targetTab === 'technical') handleTabChange('technical');
                              else if (dimension.targetTab === 'interview') handleTabChange('interview');
                              else if (dimension.targetTab === 'professional') handleTabChange('professional');
                              else handleTabChange('daily');
                            }}
                            className="text-cyan-400 hover:text-cyan-300 font-bold inline-flex items-center gap-1 transition"
                          >
                            <span>Practice</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* ========================================================================= */}
              {/* QUICK JUMP TRAINING MODULES */}
              {/* ========================================================================= */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: 10-Level Curriculum */}
                <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold">
                      <Layers className="w-3.5 h-3.5" />
                      <span>10-LEVEL CURRICULUM</span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-white">
                      Full 30-Module Roadmap
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Structured progression from Sentence Foundations to Advanced Job-Ready Leadership.
                    </p>
                  </div>

                  <button
                    onClick={() => handleTabChange('curriculum')}
                    className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-sans font-bold rounded-xl transition text-xs flex items-center justify-center gap-2"
                  >
                    <span>Explore 10 Levels</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card 2: Today's Daily Training */}
                <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 font-mono text-xs font-bold">
                        <Flame className="w-3.5 h-3.5 fill-orange-400" />
                        <span>TODAY&apos;S TRAINING — DAY {todayTrainingPlan.dayNumber}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {todayTrainingPlan.estimatedMinutes} min
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-0.5">
                        {todayTrainingPlan.levelTitle}
                      </span>
                      <h3 className="text-base font-bold font-display text-white line-clamp-1">
                        {todayTrainingPlan.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {todayTrainingPlan.objective}
                    </p>

                    {/* Mini Pillar Progress */}
                    {(() => {
                      const sessionPillars = userState?.activeDailySession?.dayNumber === todayTrainingPlan.dayNumber
                        ? userState.activeDailySession.pillarProgress
                        : {};
                      const completedCount = Object.values(sessionPillars).filter((p) => p?.completed).length;
                      const pct = Math.round((completedCount / 6) * 100);
                      const isComplete = completedDailyDayNumbers.includes(todayTrainingPlan.dayNumber);

                      return (
                        <div className="space-y-1.5 pt-1">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-slate-400">
                              {isComplete ? 'Day Complete' : `${completedCount}/6 Pillars Complete`}
                            </span>
                            <span className="text-orange-400 font-bold">{isComplete ? '100%' : `${pct}%`}</span>
                          </div>
                          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full transition-all duration-500"
                              style={{ width: `${isComplete ? 100 : Math.max(5, pct)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  <button
                    onClick={() => handleTabChange('daily')}
                    className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-sans font-bold rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                  >
                    <span>
                      {completedDailyDayNumbers.includes(todayTrainingPlan.dayNumber)
                        ? `Review Day ${todayTrainingPlan.dayNumber}`
                        : userState?.activeDailySession?.dayNumber === todayTrainingPlan.dayNumber && (userState.activeDailySession.currentPillarIndex || 0) > 0
                        ? `Continue Training (Pillar ${(userState.activeDailySession.currentPillarIndex || 0) + 1}/6)`
                        : `Start Day ${todayTrainingPlan.dayNumber} Training`}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card 3: Speaking Sandbox */}
                <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-mono text-xs font-bold">
                      <Mic className="w-3.5 h-3.5" />
                      <span>SPEAKING PRACTICE</span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-white">
                      Speech Sandbox &amp; Audio Journal
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Record timed responses to architectural trade-offs and track filler word counts.
                    </p>
                  </div>

                  <button
                    onClick={() => handleTabChange('speaking')}
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-sans font-bold rounded-xl transition text-xs flex items-center justify-center gap-2"
                  >
                    <span>Launch Speech Recorder</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. FULL 10-LEVEL CURRICULUM EXPLORER TAB */}
          {/* ========================================================================= */}
          {activeTab === 'curriculum' && (
            <div className="space-y-8">
              {/* Category Filter Tabs */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-cyan-400" />
                      <span>10-Level Career Communication Curriculum</span>
                    </h2>
                    <p className="text-xs text-slate-400">
                      Category &rarr; Level &rarr; Module &rarr; Topic &rarr; Lesson &rarr; Practice
                    </p>
                  </div>

                  <div className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                    {completedCurriculumCount} / {totalCurriculumTopicsCount} Topics Mastered
                  </div>
                </div>

                {/* Categories Bar */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {['All', ...CURRICULUM_CATEGORIES.map((c) => c.title)].map((catTitle) => (
                    <button
                      key={catTitle}
                      onClick={() => setSelectedCategoryFilter(catTitle)}
                      className={`px-3.5 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition ${
                        selectedCategoryFilter === catTitle
                          ? 'bg-[#006cd2] text-white font-bold shadow-md shadow-blue-500/25'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {catTitle}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Selector Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
                {ALL_CURRICULUM_LEVELS.map((lvl) => {
                  const isSelected = selectedLevelId === lvl.id;
                  const levelTopics = lvl.modules.flatMap((m) => m.topics);
                  const completedInLevel = levelTopics.filter((t) => userState?.completedTopicIds.includes(t.id)).length;
                  const isLevelDone = completedInLevel === levelTopics.length && levelTopics.length > 0;

                  return (
                    <button
                      key={lvl.id}
                      onClick={() => handleSelectLevel(lvl)}
                      className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1.5 ${
                        isSelected
                          ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/15'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-cyan-400">
                          {lvl.levelCode}
                        </span>
                        {isLevelDone && (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        )}
                      </div>
                      <div className="text-xs font-bold text-white font-display line-clamp-1">
                        {lvl.title.replace('LEVEL ', '')}
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 block truncate">
                        {lvl.weeks}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Module and Topic Master-Detail Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Modules & Topic Selector */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        {activeCurriculumLevel.levelCode}: {activeCurriculumLevel.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      {activeCurriculumLevel.objective}
                    </p>
                  </div>

                  {/* Modules Accordion / List */}
                  <div className="space-y-3">
                    {activeCurriculumLevel.modules.map((mod) => {
                      const isModSelected = activeCurriculumModule.id === mod.id;
                      return (
                        <div
                          key={mod.id}
                          className={`rounded-2xl border transition overflow-hidden ${
                            isModSelected
                              ? 'bg-slate-900/90 border-blue-500/40'
                              : 'bg-slate-900/40 border-slate-800'
                          }`}
                        >
                          <button
                            onClick={() => handleSelectModule(mod)}
                            className="w-full text-left p-4 flex items-center justify-between gap-2"
                          >
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">
                                Module {mod.moduleNumber} (~{mod.estimatedMinutes} min)
                              </span>
                              <div className="text-sm font-bold text-white font-display">
                                {mod.title}
                              </div>
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 text-slate-500 transition-transform ${
                                isModSelected ? 'rotate-90 text-blue-400' : ''
                              }`}
                            />
                          </button>

                          {/* Topics List under active module */}
                          {isModSelected && (
                            <div className="px-3 pb-3 space-y-1.5 border-t border-slate-800/60 pt-2">
                              {mod.topics.map((top) => {
                                const isTopSelected = activeCurriculumTopic.id === top.id;
                                const isTopDone = userState?.completedTopicIds.includes(top.id);
                                return (
                                  <button
                                    key={top.id}
                                    onClick={() => setSelectedTopicId(top.id)}
                                    className={`w-full text-left p-2.5 rounded-xl font-mono text-xs transition flex items-center justify-between ${
                                      isTopSelected
                                        ? 'bg-[#006cd2] text-white font-bold shadow-sm'
                                        : 'bg-slate-950/60 text-slate-300 hover:bg-slate-950 hover:text-white'
                                    }`}
                                  >
                                    <span className="truncate pr-2">{top.title}</span>
                                    {isTopDone ? (
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                                    ) : (
                                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Deep-Dive Lesson & Practice Viewer */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
                    {/* Lesson Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                          <span className="text-cyan-400 font-bold">{activeCurriculumLevel.levelCode}</span>
                          <span>&bull;</span>
                          <span>Module {activeCurriculumModule.moduleNumber}</span>
                        </div>
                        <h3 className="text-2xl font-bold font-display text-white">
                          {activeCurriculumTopic.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openNoteEditor(activeCurriculumTopic.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Notes</span>
                        </button>
                        <button
                          onClick={() => handleToggleBookmark(activeCurriculumTopic.id)}
                          className={`p-2 rounded-xl border text-xs font-mono transition ${
                            userState?.bookmarkedIds.includes(activeCurriculumTopic.id)
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleTopic(activeCurriculumTopic.id)}
                          className={`px-4 py-1.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5 ${
                            userState?.completedTopicIds.includes(activeCurriculumTopic.id)
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#006cd2] text-white hover:bg-blue-600'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>
                            {userState?.completedTopicIds.includes(activeCurriculumTopic.id)
                              ? 'Completed'
                              : 'Mark Complete'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Summary & Core Concept */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                        <span className="font-mono text-[10px] uppercase font-bold text-cyan-400">
                          Core Concept:
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed font-sans">
                          {activeCurriculumTopic.coreConcept}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                        <span className="font-mono text-[10px] uppercase font-bold text-emerald-400">
                          Why It Matters:
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed font-sans">
                          {activeCurriculumTopic.whyItMatters}
                        </p>
                      </div>
                    </div>

                    {/* Lesson Overview & Key Points */}
                    <div className="space-y-3">
                      <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                        Lesson Breakdown:
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {activeCurriculumTopic.lessonContent.overview}
                      </p>
                      <ul className="space-y-1.5 pt-1">
                        {activeCurriculumTopic.lessonContent.keyPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#006cd2] mt-1.5 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Telugu-to-English Translation Pitfall Alert */}
                    {activeCurriculumTopic.lessonContent.teluguPitfallNote && (
                      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-1 text-xs">
                        <div className="flex items-center gap-2 text-amber-400 font-bold font-mono">
                          <AlertCircle className="w-4 h-4" />
                          <span>Telugu-to-English Translation Pitfall Notice:</span>
                        </div>
                        <p className="text-amber-200/90 leading-relaxed">
                          {activeCurriculumTopic.lessonContent.teluguPitfallNote}
                        </p>
                      </div>
                    )}

                    {/* Reusable Templates / Patterns if present */}
                    {activeCurriculumTopic.lessonContent.templatesOrPatterns && (
                      <div className="space-y-3 pt-2">
                        <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                          Reusable Sentence Patterns &amp; Formulas:
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {activeCurriculumTopic.lessonContent.templatesOrPatterns.map((tpl, tIdx) => (
                            <div
                              key={tIdx}
                              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs"
                            >
                              <div className="font-mono text-cyan-400 font-bold">{tpl.pattern}</div>
                              <p className="text-slate-300 italic">&ldquo;{tpl.example}&rdquo;</p>
                              <span className="text-[10px] font-mono text-slate-500 block">
                                Context: {tpl.usageTip}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interactive Practice Workspace for Topic */}
                    <div className="p-6 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-blue-400 uppercase flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5" />
                          Interactive Practice Exercise
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">
                          Type: {activeCurriculumTopic.practice.type}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-bold text-white">
                        {activeCurriculumTopic.practice.prompt}
                      </p>

                      {/* If Quiz Practice */}
                      {activeCurriculumTopic.practice.options && (
                        <div className="space-y-2">
                          {activeCurriculumTopic.practice.options.map((opt, oIdx) => {
                            const selected = quizSelections[activeCurriculumTopic.practice.id];
                            const submitted = quizSubmitted[activeCurriculumTopic.practice.id];
                            return (
                              <button
                                key={oIdx}
                                onClick={() => {
                                  setQuizSelections((prev) => ({
                                    ...prev,
                                    [activeCurriculumTopic.practice.id]: oIdx,
                                  }));
                                  setQuizSubmitted((prev) => ({
                                    ...prev,
                                    [activeCurriculumTopic.practice.id]: true,
                                  }));
                                }}
                                className={`w-full text-left p-3 rounded-xl font-mono text-xs transition border flex items-center justify-between ${
                                  submitted
                                    ? oIdx === activeCurriculumTopic.practice.correctIndex
                                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                                      : selected === oIdx
                                      ? 'bg-rose-950/40 border-rose-500 text-rose-300'
                                      : 'bg-slate-900 border-slate-800 text-slate-400'
                                    : selected === oIdx
                                    ? 'bg-[#006cd2]/20 border-[#006cd2] text-white'
                                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                                }`}
                              >
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                          {quizSubmitted[activeCurriculumTopic.practice.id] && (
                            <p className="text-xs text-slate-400 font-mono pt-1">
                              Explanation: {activeCurriculumTopic.practice.explanation}
                            </p>
                          )}
                        </div>
                      )}

                      {/* If Speech / Explanation Practice */}
                      {activeCurriculumTopic.practice.sampleAnswer && (
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                          <span className="font-mono text-[10px] text-cyan-400 uppercase font-bold">
                            Model Spoken Answer:
                          </span>
                          <p className="text-slate-200 italic leading-relaxed">
                            &ldquo;{activeCurriculumTopic.practice.sampleAnswer}&rdquo;
                          </p>
                        </div>
                      )}

                      {/* Tips & Rubrics */}
                      {activeCurriculumTopic.practice.rubricOrTips && (
                        <div className="text-[11px] text-slate-400 font-mono space-y-1">
                          <span className="text-slate-500 uppercase font-bold block">Evaluation Rubric:</span>
                          <ul className="list-disc list-inside space-y-0.5">
                            {activeCurriculumTopic.practice.rubricOrTips.map((tip, tIdx) => (
                              <li key={tIdx}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. DAILY TRAINING TAB (6-PILLAR, 5-STEP GUIDED SYSTEM) */}
          {/* ========================================================================= */}
          {activeTab === 'daily' && (
            <div className="space-y-8">
              {/* Daily Training Top Header Card */}
              <div className="bg-gradient-to-r from-orange-950/50 via-slate-900 to-slate-900 border border-orange-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold rounded-full">
                    <Flame className="w-4 h-4 fill-orange-400" />
                    <span>DAILY TRAINING — DAY {activeDailyPlan.dayNumber} OF 90</span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                    <span className="text-cyan-400 font-bold">{activeDailyPlan.levelTitle}</span>
                    <span>&bull;</span>
                    <span className="text-amber-400 font-bold">{activeDailyPlan.estimatedMinutes} min target</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                    {activeDailyPlan.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                    {activeDailyPlan.objective}
                  </p>
                </div>

                {/* Sub-View Navigation Pills */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { id: 'session', label: 'Active Training Studio', icon: Flame },
                    { id: 'history', label: `Completed Days (${(userState?.completedDailyLessons || []).length})`, icon: CheckCircle2 },
                    { id: 'upcoming', label: 'Upcoming Roadmap', icon: Calendar },
                    { id: 'target', label: `Weekly Consistency (${metrics.weeklyCompletion.completedDays}/7)`, icon: Target },
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setDailySubView(sub.id as any)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 whitespace-nowrap ${
                        dailySubView === sub.id
                          ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/25'
                          : 'bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <sub.icon className="w-3.5 h-3.5" />
                      <span>{sub.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ===================================================================== */}
              {/* SUB-VIEW 1: ACTIVE TRAINING STUDIO (6 PILLARS x 5 STEPS) */}
              {/* ===================================================================== */}
              {dailySubView === 'session' && (
                <div className="space-y-6">
                  {/* 6 Pillars Selection Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {DAILY_PILLARS_CONFIG.map((pillar, pIdx) => {
                      const sessionPillars = userState?.activeDailySession?.dayNumber === currentSessionDay
                        ? userState.activeDailySession.pillarProgress
                        : {};
                      const isCompleted = sessionPillars[pillar.key]?.completed;
                      const isActive = currentPillarIdx === pIdx;

                      return (
                        <button
                          key={pillar.key}
                          onClick={() => handleSelectDailyPillar(pIdx)}
                          className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between space-y-2 ${
                            isActive
                              ? 'bg-slate-900 border-orange-500/60 shadow-lg shadow-orange-500/10 ring-1 ring-orange-500/40'
                              : isCompleted
                              ? 'bg-slate-900/60 border-emerald-500/30 hover:border-emerald-500/50'
                              : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <pillar.icon
                              className={`w-4 h-4 ${
                                isCompleted ? 'text-emerald-400' : isActive ? 'text-orange-400' : 'text-slate-400'
                              }`}
                            />
                            {isCompleted ? (
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            ) : isActive ? (
                              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                            ) : null}
                          </div>

                          <div>
                            <div className="font-mono text-xs font-bold text-white truncate">
                              {pillar.title}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400 truncate">
                              {pillar.label}
                            </div>
                          </div>

                          <div className="text-[10px] font-mono">
                            {isCompleted ? (
                              <span className="text-emerald-400 font-bold">✓ Complete</span>
                            ) : isActive ? (
                              <span className="text-orange-400">Step {currentStepIdx + 1}/5</span>
                            ) : (
                              <span className="text-slate-500">Pending</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* 5-Step Workflow Stepper Header */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
                    {[
                      { idx: 0, name: 'Learn', icon: Sparkles, desc: 'Concept & Model' },
                      { idx: 1, name: 'Practice', icon: Target, desc: 'Active Recall' },
                      { idx: 2, name: 'Speak', icon: Mic, desc: 'Audio Studio' },
                      { idx: 3, name: 'Review', icon: Sliders, desc: 'Self-Rating' },
                      { idx: 4, name: 'Complete', icon: CheckCircle2, desc: 'Pillar Wrap-Up' },
                    ].map((step) => {
                      const isCurrent = currentStepIdx === step.idx;
                      const isPast = currentStepIdx > step.idx;

                      return (
                        <button
                          key={step.idx}
                          onClick={() => handleSelectDailyStep(step.idx)}
                          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition text-xs font-mono whitespace-nowrap ${
                            isCurrent
                              ? 'bg-[#006cd2] text-white font-bold shadow-md shadow-blue-500/20'
                              : isPast
                              ? 'bg-slate-950 border border-slate-800 text-emerald-400 font-semibold'
                              : 'bg-slate-950/60 border border-slate-800/60 text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          <step.icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : isPast ? 'text-emerald-400' : 'text-slate-500'}`} />
                          <span>STEP {step.idx + 1}: {step.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Main Studio Interactive Container */}
                  <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
                    {/* ============================================================= */}
                    {/* STEP 1: LEARN (CONCEPT, RULES & MODELS) */}
                    {/* ============================================================= */}
                    {currentStepIdx === 0 && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono uppercase font-bold text-orange-400 tracking-wider">
                              Step 1 of 5 &bull; Learn &amp; Assimilate
                            </span>
                            <h3 className="text-xl font-bold font-display text-white">
                              {currentPillarIdx === 0 && activeDailyPlan.pillars.grammar.title}
                              {currentPillarIdx === 1 && activeDailyPlan.pillars.vocabulary.title}
                              {currentPillarIdx === 2 && activeDailyPlan.pillars.speaking.title}
                              {currentPillarIdx === 3 && activeDailyPlan.pillars.listeningShadowing.title}
                              {currentPillarIdx === 4 && activeDailyPlan.pillars.technicalComm.title}
                              {currentPillarIdx === 5 && activeDailyPlan.pillars.professionalInterview.title}
                            </h3>
                          </div>

                          <button
                            onClick={handleAdvanceDailyStepOrPillar}
                            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-sans font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md shadow-orange-500/20"
                          >
                            <span>Proceed to Practice</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Pillar 0: Grammar Learn Content */}
                        {currentPillarIdx === 0 && (
                          <div className="space-y-6">
                            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                              <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">
                                Core Rule:
                              </span>
                              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                                {activeDailyPlan.pillars.grammar.learnContent.rule}
                              </p>
                            </div>

                            <div className="space-y-3">
                              <span className="text-xs font-mono uppercase text-slate-400 font-semibold block">
                                Correct vs. Incorrect Examples:
                              </span>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {activeDailyPlan.pillars.grammar.learnContent.examples.map((ex, exIdx) => (
                                  <div key={exIdx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                                    <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300">
                                      <span className="font-bold">❌ Incorrect: </span>
                                      &ldquo;{ex.incorrect}&rdquo;
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                                      <span className="font-bold">✓ Correct: </span>
                                      &ldquo;{ex.correct}&rdquo;
                                    </div>
                                    <p className="text-[11px] text-slate-400 italic">
                                      {ex.explanation}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {activeDailyPlan.pillars.grammar.learnContent.teluguPitfallNote && (
                              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-1 text-xs">
                                <div className="flex items-center gap-2 text-amber-400 font-bold font-mono">
                                  <AlertCircle className="w-4 h-4" />
                                  <span>Regional Telugu-to-English Habit Notice:</span>
                                </div>
                                <p className="text-amber-200/90 leading-relaxed">
                                  {activeDailyPlan.pillars.grammar.learnContent.teluguPitfallNote}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Pillar 1: Vocabulary Learn Content */}
                        {currentPillarIdx === 1 && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {activeDailyPlan.pillars.vocabulary.words.map((w, wIdx) => (
                                <div key={wIdx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                                      {w.partOfSpeech}
                                    </span>
                                    <span className="text-xs font-mono text-slate-500">
                                      {w.phonetic}
                                    </span>
                                  </div>

                                  <div>
                                    <h4 className="text-lg font-bold font-display text-white">
                                      {w.term}
                                    </h4>
                                    <p className="text-xs text-slate-300 pt-1 leading-relaxed">
                                      {w.definition}
                                    </p>
                                  </div>

                                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 italic">
                                    &ldquo;{w.sampleSentence}&rdquo;
                                  </div>

                                  {w.professionalUpgrade && (
                                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                                      <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                                        Executive Upgrade:
                                      </div>
                                      <div className="text-slate-400 line-through text-[11px]">&ldquo;{w.professionalUpgrade.amateur}&rdquo;</div>
                                      <div className="text-amber-300 font-semibold text-[11px]">&ldquo;{w.professionalUpgrade.executive}&rdquo;</div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Pillar 2: Speaking Learn Content */}
                        {currentPillarIdx === 2 && (
                          <div className="space-y-6">
                            <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-3">
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-blue-400 font-bold uppercase">Prompt Focus: {activeDailyPlan.pillars.speaking.category}</span>
                                <span className="text-slate-400">{activeDailyPlan.pillars.speaking.targetDurationSeconds}s target duration</span>
                              </div>

                              <p className="text-base font-bold font-display text-white">
                                &ldquo;{activeDailyPlan.pillars.speaking.prompt}&rdquo;
                              </p>
                            </div>

                            {/* Evaluation Rubric */}
                            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                              <span className="text-xs font-mono uppercase text-slate-400 font-semibold block">
                                Performance Rubric:
                              </span>
                              <ul className="space-y-1.5 text-xs text-slate-300">
                                {activeDailyPlan.pillars.speaking.rubric.map((r, rIdx) => (
                                  <li key={rIdx} className="flex items-start gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                                    <span>{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Sample Transcript */}
                            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                              <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">
                                Model Audio Delivery Transcript:
                              </span>
                              <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                                &ldquo;{activeDailyPlan.pillars.speaking.sampleAudioTranscript}&rdquo;
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Pillar 3: Listening / Shadowing Learn Content */}
                        {currentPillarIdx === 3 && (
                          <div className="space-y-6">
                            <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-3">
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-indigo-400 font-bold uppercase">Speaker: {activeDailyPlan.pillars.listeningShadowing.speakerRole}</span>
                                <span className="text-slate-400">{activeDailyPlan.pillars.listeningShadowing.speedCategory}</span>
                              </div>

                              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                                &ldquo;{activeDailyPlan.pillars.listeningShadowing.audioTranscript}&rdquo;
                              </div>
                            </div>

                            <div className="space-y-2">
                              <span className="text-xs font-mono uppercase text-slate-400 font-semibold block">
                                Key Phrases to Shadow (Listen &rarr; Pause &rarr; Repeat):
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {activeDailyPlan.pillars.listeningShadowing.keyPhrasesToShadow.map((phrase, phIdx) => (
                                  <div key={phIdx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-indigo-300 font-mono flex items-center gap-2">
                                    <Headphones className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                                    <span>{phrase}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Pillar 4: Technical Comm Learn Content */}
                        {currentPillarIdx === 4 && (
                          <div className="space-y-6">
                            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2">
                              <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">
                                5-Step Formula: {activeDailyPlan.pillars.technicalComm.formulaStep}
                              </span>
                              <h4 className="text-base font-bold font-display text-white">
                                {activeDailyPlan.pillars.technicalComm.topic}
                              </h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {activeDailyPlan.pillars.technicalComm.frameworkSteps.map((step, stIdx) => (
                                <div key={stIdx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                                  <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase">
                                    {step.stepName}
                                  </span>
                                  <p className="text-slate-300 leading-relaxed font-sans">
                                    {step.content}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                              <span className="font-mono text-[10px] text-cyan-400 uppercase font-bold">
                                Model Executive Explanation:
                              </span>
                              <p className="text-slate-200 italic leading-relaxed">
                                &ldquo;{activeDailyPlan.pillars.technicalComm.sampleResponse}&rdquo;
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Pillar 5: Professional & Interview Learn Content */}
                        {currentPillarIdx === 5 && (
                          <div className="space-y-6">
                            <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-3">
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-purple-400 font-bold uppercase">Framework: {activeDailyPlan.pillars.professionalInterview.methodology}</span>
                                <span className="text-slate-400 uppercase">Type: {activeDailyPlan.pillars.professionalInterview.type}</span>
                              </div>

                              <h4 className="text-base font-bold font-display text-white">
                                {activeDailyPlan.pillars.professionalInterview.prompt}
                              </h4>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                              <span className="text-[10px] font-mono uppercase font-bold text-purple-400">
                                Guided Strategy / Template:
                              </span>
                              <p className="text-slate-300 leading-relaxed font-mono">
                                {activeDailyPlan.pillars.professionalInterview.guidedTemplate}
                              </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                              <span className="font-mono text-[10px] text-purple-400 uppercase font-bold">
                                Executive Sample Response:
                              </span>
                              <p className="text-slate-200 italic leading-relaxed">
                                &ldquo;{activeDailyPlan.pillars.professionalInterview.sampleExecutiveResponse}&rdquo;
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ============================================================= */}
                    {/* STEP 2: PRACTICE (INTERACTIVE ACTIVE RECALL DRILL) */}
                    {/* ============================================================= */}
                    {currentStepIdx === 1 && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 tracking-wider">
                              Step 2 of 5 &bull; Active Recall Practice
                            </span>
                            <h3 className="text-xl font-bold font-display text-white">
                              Interactive Skill Check &amp; Synthesis
                            </h3>
                          </div>

                          <button
                            onClick={handleAdvanceDailyStepOrPillar}
                            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-sans font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md shadow-orange-500/20"
                          >
                            <span>Proceed to Speak</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Practice 0: Grammar Quiz */}
                        {currentPillarIdx === 0 && (
                          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                            <p className="text-sm font-bold text-white">
                              {activeDailyPlan.pillars.grammar.practiceQuiz.question}
                            </p>

                            <div className="space-y-2">
                              {activeDailyPlan.pillars.grammar.practiceQuiz.options.map((opt, oIdx) => {
                                const qKey = `daily_q_${currentSessionDay}_grammar`;
                                const selected = dailyPracticeSelections[qKey];
                                const submitted = dailyPracticeSubmitted[qKey];
                                const isCorrectOpt = oIdx === activeDailyPlan.pillars.grammar.practiceQuiz.correctIndex;

                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => {
                                      setDailyPracticeSelections((prev) => ({ ...prev, [qKey]: oIdx }));
                                      setDailyPracticeSubmitted((prev) => ({ ...prev, [qKey]: true }));
                                    }}
                                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-mono transition flex items-center justify-between ${
                                      submitted
                                        ? isCorrectOpt
                                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                                          : selected === oIdx
                                          ? 'bg-rose-950/40 border-rose-500 text-rose-300'
                                          : 'bg-slate-900 border-slate-800 text-slate-400'
                                        : selected === oIdx
                                        ? 'bg-[#006cd2]/20 border-[#006cd2] text-white'
                                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                                    }`}
                                  >
                                    <span>{opt}</span>
                                    {submitted && isCorrectOpt && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                                  </button>
                                );
                              })}

                              {dailyPracticeSubmitted[`daily_q_${currentSessionDay}_grammar`] && (
                                <p className="text-xs text-slate-400 font-mono pt-2">
                                  Explanation: {activeDailyPlan.pillars.grammar.practiceQuiz.explanation}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Practice 1: Vocabulary Fill-In-The-Blank */}
                        {currentPillarIdx === 1 && (
                          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                            <p className="text-sm font-bold text-white">
                              {activeDailyPlan.pillars.vocabulary.practiceDrill.prompt}
                            </p>

                            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300">
                              &ldquo;{activeDailyPlan.pillars.vocabulary.practiceDrill.fillInBlankSentence}&rdquo;
                            </div>

                            <div className="space-y-2">
                              <span className="text-[11px] font-mono text-slate-400">
                                Hint: {activeDailyPlan.pillars.vocabulary.practiceDrill.hint}
                              </span>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Type the missing executive word..."
                                  value={dailyPracticeSelections[`daily_vocab_${currentSessionDay}`] || ''}
                                  onChange={(e) =>
                                    setDailyPracticeSelections((prev) => ({
                                      ...prev,
                                      [`daily_vocab_${currentSessionDay}`]: e.target.value,
                                    }))
                                  }
                                  className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 flex-1"
                                />
                                <button
                                  onClick={() =>
                                    setDailyPracticeSubmitted((prev) => ({
                                      ...prev,
                                      [`daily_vocab_${currentSessionDay}`]: true,
                                    }))
                                  }
                                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs font-mono transition"
                                >
                                  Check
                                </button>
                              </div>

                              {dailyPracticeSubmitted[`daily_vocab_${currentSessionDay}`] && (
                                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                                  Expected Word: <span className="text-emerald-400 font-bold">{activeDailyPlan.pillars.vocabulary.practiceDrill.missingWord}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Practice 2: Speaking Outline Builder */}
                        {currentPillarIdx === 2 && (
                          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                            <span className="text-xs font-mono uppercase text-blue-400 font-bold block">
                              Mental Outline Preparation:
                            </span>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              Before recording in Step 3, organize your thoughts into three 20-second blocks:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                                <span className="text-blue-400 font-bold">0–20s: Hook &amp; Claim</span>
                                <p className="text-slate-400 text-[11px]">Clear declarative statement without hesitation.</p>
                              </div>
                              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                                <span className="text-cyan-400 font-bold">20–60s: Technical Proof</span>
                                <p className="text-slate-400 text-[11px]">2 concrete engineering examples &amp; trade-offs.</p>
                              </div>
                              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                                <span className="text-emerald-400 font-bold">60–90s: Impact &amp; Close</span>
                                <p className="text-slate-400 text-[11px]">Summary metric and crisp executive finish.</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Practice 3: Listening Comprehension Check */}
                        {currentPillarIdx === 3 && (
                          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                            <p className="text-sm font-bold text-white">
                              {activeDailyPlan.pillars.listeningShadowing.comprehensionQuestion.question}
                            </p>

                            <div className="space-y-2">
                              {activeDailyPlan.pillars.listeningShadowing.comprehensionQuestion.options.map((opt, oIdx) => {
                                const qKey = `daily_listening_${currentSessionDay}`;
                                const selected = dailyPracticeSelections[qKey];
                                const submitted = dailyPracticeSubmitted[qKey];
                                const isCorrectOpt = oIdx === activeDailyPlan.pillars.listeningShadowing.comprehensionQuestion.correctIndex;

                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => {
                                      setDailyPracticeSelections((prev) => ({ ...prev, [qKey]: oIdx }));
                                      setDailyPracticeSubmitted((prev) => ({ ...prev, [qKey]: true }));
                                    }}
                                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-mono transition flex items-center justify-between ${
                                      submitted
                                        ? isCorrectOpt
                                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                                          : selected === oIdx
                                          ? 'bg-rose-950/40 border-rose-500 text-rose-300'
                                          : 'bg-slate-900 border-slate-800 text-slate-400'
                                        : selected === oIdx
                                        ? 'bg-[#006cd2]/20 border-[#006cd2] text-white'
                                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                                    }`}
                                  >
                                    <span>{opt}</span>
                                    {submitted && isCorrectOpt && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Practice 4: Technical 5-Step Ordering Drill */}
                        {currentPillarIdx === 4 && (
                          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                            <span className="text-xs font-mono uppercase text-cyan-400 font-bold block">
                              5-Step Structure Verification:
                            </span>
                            <div className="space-y-2 text-xs font-mono">
                              {[
                                '1. Definition — What is it in one clear sentence?',
                                '2. Explanation — How does it work under the hood?',
                                '3. Example — What is a concrete API/code illustration?',
                                '4. Use Case — Why did you choose it over alternatives?',
                                '5. Conclusion — What is the overarching engineering impact?',
                              ].map((step, idx) => (
                                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
                                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Practice 5: Interview STAR Alignment */}
                        {currentPillarIdx === 5 && (
                          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                            <span className="text-xs font-mono uppercase text-purple-400 font-bold block">
                              STAR Framework Check:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                                <span className="text-purple-400 font-bold block mb-1">Situation &amp; Task</span>
                                <p className="text-slate-400 text-[11px]">Set the scene in under 20 seconds. Highlight business risk or latency problem.</p>
                              </div>
                              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                                <span className="text-cyan-400 font-bold block mb-1">Action &amp; Result</span>
                                <p className="text-slate-400 text-[11px]">Detail YOUR specific technical actions and state a measurable percentage outcome.</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ============================================================= */}
                    {/* STEP 3: SPEAK (LIVE AUDIO RECORDING STUDIO) */}
                    {/* ============================================================= */}
                    {currentStepIdx === 2 && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono uppercase font-bold text-blue-400 tracking-wider">
                              Step 3 of 5 &bull; Timed Speech Recording Studio
                            </span>
                            <h3 className="text-xl font-bold font-display text-white">
                              Live Voice Delivery &amp; Articulation
                            </h3>
                          </div>

                          <button
                            onClick={handleAdvanceDailyStepOrPillar}
                            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-sans font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md shadow-orange-500/20"
                          >
                            <span>Proceed to Review</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Recording Studio Box */}
                        <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-6 relative overflow-hidden">
                          <div className="space-y-2 max-w-xl mx-auto">
                            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                              Speaking Prompt:
                            </span>
                            <h4 className="text-lg font-bold font-display text-white">
                              {currentPillarIdx === 0 && `Explain the SVO sentence rule and give 2 correct examples in under 45 seconds.`}
                              {currentPillarIdx === 1 && `Use all 3 vocabulary words in a single cohesive 60-second standup or architecture explanation.`}
                              {currentPillarIdx === 2 && activeDailyPlan.pillars.speaking.prompt}
                              {currentPillarIdx === 3 && `Shadow the speaker transcript with natural cadence, pausing, and accent clarity.`}
                              {currentPillarIdx === 4 && activeDailyPlan.pillars.technicalComm.prompt}
                              {currentPillarIdx === 5 && activeDailyPlan.pillars.professionalInterview.prompt}
                            </h4>
                          </div>

                          {/* Live Timer Display */}
                          <div className="flex items-center justify-center gap-3">
                            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-3xl sm:text-4xl font-black text-white flex items-center gap-3">
                              <Clock className={`w-6 h-6 ${dailyIsRecording ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`} />
                              <span>{Math.floor(dailyRecordDuration / 60)}:{(dailyRecordDuration % 60).toString().padStart(2, '0')}</span>
                            </div>
                          </div>

                          {/* Action Controls */}
                          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                            {!dailyIsRecording ? (
                              <button
                                onClick={startDailyStudioRecording}
                                className="px-8 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-sans font-bold rounded-2xl text-sm transition shadow-lg shadow-rose-600/30 flex items-center gap-2"
                              >
                                <Mic className="w-4 h-4" />
                                <span>{dailyAudioUrl ? 'Re-Record Audio' : 'Start Recording Voice'}</span>
                              </button>
                            ) : (
                              <button
                                onClick={stopDailyStudioRecording}
                                className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-sans font-bold rounded-2xl text-sm transition border border-slate-700 flex items-center gap-2"
                              >
                                <Square className="w-4 h-4 text-rose-400 fill-current" />
                                <span>Stop Recording</span>
                              </button>
                            )}
                          </div>

                          {/* Audio Playback if Recorded */}
                          {dailyAudioUrl && (
                            <div className="pt-4 max-w-md mx-auto space-y-2">
                              <span className="text-[11px] font-mono text-emerald-400 block font-bold">
                                ✓ Recording Saved Locally
                              </span>
                              <audio controls src={dailyAudioUrl} className="w-full h-10 rounded-xl" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ============================================================= */}
                    {/* STEP 4: REVIEW (COMPARISON, FEEDBACK & SELF-RATING) */}
                    {/* ============================================================= */}
                    {currentStepIdx === 3 && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-wider">
                              Step 4 of 5 &bull; Review &amp; Self-Calibration
                            </span>
                            <h3 className="text-xl font-bold font-display text-white">
                              Evaluate Fluency, Fillers &amp; Delivery
                            </h3>
                          </div>

                          <button
                            onClick={handleAdvanceDailyStepOrPillar}
                            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-sans font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md shadow-orange-500/20"
                          >
                            <span>Complete Pillar</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Model Comparison Box */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                            <span className="font-mono text-xs text-cyan-400 font-bold uppercase">
                              Ideal Executive Model Delivery:
                            </span>
                            <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                              {currentPillarIdx === 0 && `&ldquo;I ran the Python script yesterday to benchmark response times. My name is Swamy, and I lead backend API development.&rdquo;`}
                              {currentPillarIdx === 1 && `&ldquo;We investigated the latency bottleneck and implemented Redis caching to ensure horizontal scalability.&rdquo;`}
                              {currentPillarIdx === 2 && `&ldquo;${activeDailyPlan.pillars.speaking.sampleAudioTranscript}&rdquo;`}
                              {currentPillarIdx === 3 && `&ldquo;${activeDailyPlan.pillars.listeningShadowing.audioTranscript}&rdquo;`}
                              {currentPillarIdx === 4 && `&ldquo;${activeDailyPlan.pillars.technicalComm.sampleResponse}&rdquo;`}
                              {currentPillarIdx === 5 && `&ldquo;${activeDailyPlan.pillars.professionalInterview.sampleExecutiveResponse}&rdquo;`}
                            </p>
                          </div>

                          {/* Calibration Star Rating & Filler Counter */}
                          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between">
                            <div className="space-y-3">
                              <span className="font-mono text-xs text-amber-400 font-bold uppercase block">
                                Fluency Self-Rating:
                              </span>
                              <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    onClick={() => setDailySelfRating(star)}
                                    className={`p-2 rounded-xl transition ${
                                      dailySelfRating >= star
                                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                        : 'bg-slate-900 border border-slate-800 text-slate-600'
                                    }`}
                                  >
                                    <Star className="w-5 h-5 fill-current" />
                                  </button>
                                ))}
                                <span className="font-mono text-xs text-slate-400 pl-2">
                                  {dailySelfRating}/5 Stars
                                </span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <span className="font-mono text-xs text-rose-400 font-bold uppercase block">
                                Filler Words Count (umm / like / basically):
                              </span>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => setDailyFillerCount((prev) => Math.max(0, prev - 1))}
                                  className="w-8 h-8 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono font-bold"
                                >
                                  -
                                </button>
                                <span className="font-mono text-base font-bold text-white w-8 text-center">
                                  {dailyFillerCount}
                                </span>
                                <button
                                  onClick={() => setDailyFillerCount((prev) => prev + 1)}
                                  className="w-8 h-8 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono font-bold"
                                >
                                  +
                                </button>
                                <span className="text-[11px] font-mono text-slate-400">
                                  Goal: Zero fillers
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Reflection Notes */}
                        <div className="space-y-2">
                          <span className="font-mono text-xs text-slate-400 uppercase font-semibold">
                            Pillar Takeaway / Personal Notes:
                          </span>
                          <textarea
                            rows={3}
                            value={dailyReflectionNote}
                            onChange={(e) => setDailyReflectionNote(e.target.value)}
                            placeholder="Note down any pronunciation slips, power connectors you liked, or vocabulary nuances..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500 resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* ============================================================= */}
                    {/* STEP 5: COMPLETE (PILLAR WRAP-UP & ADVANCE) */}
                    {/* ============================================================= */}
                    {currentStepIdx === 4 && (
                      <div className="p-8 rounded-3xl bg-slate-950 border border-emerald-500/40 text-center space-y-6">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>

                        <div className="space-y-2 max-w-lg mx-auto">
                          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                            Pillar {currentPillarIdx + 1} of 6 Completed
                          </span>
                          <h3 className="text-2xl font-bold font-display text-white">
                            {currentPillarIdx === 0 && 'Grammar Accuracy Mastered'}
                            {currentPillarIdx === 1 && 'Executive Vocabulary Integrated'}
                            {currentPillarIdx === 2 && 'Timed Speaking Prompt Delivered'}
                            {currentPillarIdx === 3 && 'Speech Shadowing Completed'}
                            {currentPillarIdx === 4 && '5-Step Technical Explanation Structured'}
                            {currentPillarIdx === 5 && 'Executive Interview Response Polished'}
                          </h3>
                          <p className="text-xs text-slate-400">
                            Your performance and audio recording have been persisted.
                          </p>
                        </div>

                        <div className="pt-2 flex justify-center">
                          {currentPillarIdx < 5 ? (
                            <button
                              onClick={handleAdvanceDailyStepOrPillar}
                              className="px-8 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-sans font-bold rounded-2xl text-xs transition flex items-center gap-2 shadow-lg shadow-orange-500/25"
                            >
                              <span>Proceed to Pillar {currentPillarIdx + 2}: {DAILY_PILLARS_CONFIG[currentPillarIdx + 1].title}</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => setDailyDayCompleteModal(true)}
                              className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-sans font-bold rounded-2xl text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-500/25"
                            >
                              <span>Finish &amp; Lock In Day {currentSessionDay} Completion</span>
                              <Award className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ===================================================================== */}
              {/* SUB-VIEW 2: COMPLETED LESSONS HISTORY */}
              {/* ===================================================================== */}
              {dailySubView === 'history' && (
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span>Completed Daily Training History</span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        Verified records saved to Cloud Firestore &amp; LocalStorage
                      </p>
                    </div>
                    <span className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl">
                      {(userState?.completedDailyLessons || []).length} Days Completed
                    </span>
                  </div>

                  {(userState?.completedDailyLessons || []).length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                      <Clock className="w-10 h-10 text-slate-600 mx-auto" />
                      <p className="text-sm font-mono text-slate-400">
                        No completed daily training days recorded yet.
                      </p>
                      <button
                        onClick={() => setDailySubView('session')}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs rounded-xl"
                      >
                        Start Day 1 Training Now
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(userState?.completedDailyLessons || []).map((rec) => (
                        <div
                          key={rec.id}
                          className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold">
                              Day {rec.dayNumber} Complete
                            </span>
                            <span className="text-[11px] font-mono text-slate-500">
                              {rec.dateStr}
                            </span>
                          </div>

                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-slate-400">Time Spent: {rec.timeSpentMinutes} min</span>
                            <span className="text-amber-400 flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-current" /> {rec.selfRating}/5 Rating
                            </span>
                          </div>

                          {rec.journalSummary && (
                            <p className="text-xs text-slate-300 italic bg-slate-900 p-3 rounded-xl border border-slate-800/80">
                              &ldquo;{rec.journalSummary}&rdquo;
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ===================================================================== */}
              {/* SUB-VIEW 3: UPCOMING ROADMAP */}
              {/* ===================================================================== */}
              {dailySubView === 'upcoming' && (
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-cyan-400" />
                        <span>Upcoming Daily Lessons Roadmap</span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        Next 6 days in chronological curriculum sequence
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {upcomingTrainingPlans.map((plan) => (
                      <div
                        key={plan.dayNumber}
                        className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-mono">
                            <span className="text-orange-400 font-bold">DAY {plan.dayNumber}</span>
                            <span className="text-slate-600">&bull;</span>
                            <span className="text-cyan-400">{plan.levelTitle}</span>
                            <span className="text-slate-600">&bull;</span>
                            <span className="text-slate-400">{plan.estimatedMinutes} min</span>
                          </div>

                          <h4 className="text-sm sm:text-base font-bold font-display text-white">
                            {plan.title}
                          </h4>

                          <p className="text-xs text-slate-300 line-clamp-2">
                            {plan.objective}
                          </p>
                        </div>

                        <div className="shrink-0 font-mono text-xs text-slate-500 border border-slate-800 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                          Locked until Day {plan.dayNumber - 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===================================================================== */}
              {/* SUB-VIEW 4: WEEKLY TARGET & CONSISTENCY */}
              {/* ===================================================================== */}
              {dailySubView === 'target' && (
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                        <Target className="w-5 h-5 text-orange-400" />
                        <span>Weekly Target &amp; Habit Tracker</span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        Deterministic streak verified against completed lessons and logs
                      </p>
                    </div>

                    <div className="font-mono text-sm font-bold text-orange-400 bg-orange-950/40 border border-orange-800/40 px-4 py-2 rounded-xl flex items-center gap-2">
                      <Flame className="w-4 h-4 fill-orange-400" />
                      <span>{metrics.trainingStreak} Day Streak</span>
                    </div>
                  </div>

                  {/* 7-Day Consistency Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-7 gap-3">
                    {Array.from({ length: 7 }).map((_, idx) => {
                      const now = new Date();
                      const dayDate = new Date(now.getTime() - (6 - idx) * 24 * 60 * 60 * 1000);
                      const dateKey = dayDate.toISOString().split('T')[0];
                      const dayName = dayDate.toLocaleDateString('en-US', { weekday: 'short' });
                      const isComplete =
                        (userState?.completedDailyLessons || []).some((l) => l.dateStr === dateKey) ||
                        userState?.dailyTrainingLogs[dateKey]?.completed;

                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-2xl border text-center space-y-2 ${
                            isComplete
                              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                              : 'bg-slate-950 border-slate-800 text-slate-500'
                          }`}
                        >
                          <div className="text-xs font-mono uppercase font-bold">{dayName}</div>
                          <div className="w-8 h-8 rounded-full mx-auto flex items-center justify-center border font-mono text-xs font-bold ${isComplete ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-600'}">
                            {isComplete ? '✓' : idx + 1}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">
                            {isComplete ? 'Done' : 'Rest / Open'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Day Completion Confirmation Modal */}
              <AnimatePresence>
                {dailyDayCompleteModal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
                  >
                    <motion.div
                      initial={{ scale: 0.95, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.95, y: 10 }}
                      className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg w-full space-y-6 shadow-2xl text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center mx-auto">
                        <Flame className="w-8 h-8 fill-current" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold font-display text-white">
                          Day {currentSessionDay} Training Completed!
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          You have successfully completed all 6 communication pillars: Grammar, Vocabulary, Speaking, Listening, Technical Communication, and Interview Mastery.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                          <span className="text-slate-400 block text-[11px]">Time Invested</span>
                          <span className="text-white font-bold text-base">{activeDailyPlan.estimatedMinutes} min</span>
                        </div>
                        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                          <span className="text-slate-400 block text-[11px]">New Streak</span>
                          <span className="text-orange-400 font-bold text-base">{metrics.trainingStreak + 1} Days</span>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          onClick={() => setDailyDayCompleteModal(false)}
                          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleFinalizeDailyDay}
                          className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/25"
                        >
                          Save &amp; Unlock Next Day
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. GRAMMAR TAB */}
          {/* ========================================================================= */}
          {activeTab === 'grammar' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Grammar for Technical &amp; Engineering Leaders</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Eliminate ESL habits and master precise conditional &amp; modal structures.
                  </p>
                </div>
                <div className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  {metrics.grammarProgress}% Mastered
                </div>
              </div>

              <div className="space-y-6">
                {GRAMMAR_TOPICS.map((topic) => {
                  const isCompleted = userState?.completedTopicIds.includes(topic.id);
                  const isBookmarked = userState?.bookmarkedIds.includes(topic.id);
                  const selectedQuizAnswer = quizSelections[topic.id];
                  const hasSubmittedQuiz = quizSubmitted[topic.id];

                  return (
                    <div
                      key={topic.id}
                      className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden backdrop-blur-md"
                    >
                      {/* Card Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold rounded-lg">
                            {topic.level}
                          </span>
                          <h3 className="text-lg font-bold font-display text-white">
                            {topic.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openNoteEditor(topic.id)}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Notes</span>
                          </button>
                          <button
                            onClick={() => handleToggleBookmark(topic.id)}
                            className={`p-2 rounded-xl border text-xs font-mono transition ${
                              isBookmarked
                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                            }`}
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleToggleTopic(topic.id)}
                            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5 ${
                              isCompleted
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-800 border border-slate-700 text-slate-300 hover:border-emerald-500/40'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Rule Summary */}
                      <div className="space-y-2">
                        <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                          CORE PRINCIPLE
                        </div>
                        <p className="text-sm text-slate-200 leading-relaxed font-sans">
                          {topic.ruleSummary}
                        </p>
                      </div>

                      {/* Examples Comparison Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {topic.examples.map((ex, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2.5 text-xs"
                          >
                            <div className="font-mono text-cyan-400 font-semibold">
                              Scenario: {ex.scenario}
                            </div>
                            <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-300">
                              <span className="font-bold">Avoid: </span>{ex.incorrect}
                            </div>
                            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-300">
                              <span className="font-bold">Use Instead: </span>{ex.correct}
                            </div>
                            <p className="text-[11px] text-slate-400 italic">
                              Why: {ex.explanation}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Quick Interactive Knowledge Check */}
                      <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
                        <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>QUICK KNOWLEDGE CHECK</span>
                        </div>
                        <p className="text-xs sm:text-sm text-white font-medium">
                          {topic.quickQuiz.question}
                        </p>

                        <div className="space-y-2">
                          {topic.quickQuiz.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => {
                                setQuizSelections((prev) => ({ ...prev, [topic.id]: optIdx }));
                                setQuizSubmitted((prev) => ({ ...prev, [topic.id]: true }));
                              }}
                              className={`w-full text-left p-3 rounded-xl font-mono text-xs transition border flex items-center justify-between ${
                                hasSubmittedQuiz
                                  ? optIdx === topic.quickQuiz.correctIndex
                                    ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                                    : selectedQuizAnswer === optIdx
                                    ? 'bg-rose-950/40 border-rose-500/60 text-rose-300'
                                    : 'bg-slate-900 border-slate-800 text-slate-400'
                                  : selectedQuizAnswer === optIdx
                                  ? 'bg-[#006cd2]/20 border-[#006cd2] text-white'
                                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                              }`}
                            >
                              <span>{opt}</span>
                              {hasSubmittedQuiz && optIdx === topic.quickQuiz.correctIndex && (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              )}
                            </button>
                          ))}
                        </div>

                        {hasSubmittedQuiz && (
                          <p className="text-xs text-slate-400 font-mono pt-1">
                            Explanation: {topic.quickQuiz.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 5. VOCABULARY TAB */}
          {/* ========================================================================= */}
          {activeTab === 'vocabulary' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                    <span>Executive Tech Vocabulary Flashcards</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    High-impact precision words used in senior architecture and executive strategy.
                  </p>
                </div>
                <div className="font-mono text-xs text-amber-400 bg-amber-950/40 border border-amber-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  {userState?.masteredVocabIds.length || 0} / {VOCABULARY_LIST.length} Mastered
                </div>
              </div>

              {/* Category Filter & Search */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                  {['All', 'Executive', 'System Architecture', 'Product & Strategy', 'Agile & Collaboration'].map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedVocabCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition ${
                          selectedVocabCategory === cat
                            ? 'bg-amber-600 text-white font-bold'
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search terms..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Flashcards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVocab.map((item) => {
                  const isMastered = userState?.masteredVocabIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between backdrop-blur-md relative overflow-hidden"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">
                            {item.category}
                          </span>
                          <button
                            onClick={() => handleToggleMastery(item.id)}
                            className={`p-1.5 rounded-lg border text-xs transition ${
                              isMastered
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                            }`}
                          >
                            <Star className={`w-3.5 h-3.5 ${isMastered ? 'fill-emerald-400' : ''}`} />
                          </button>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold font-display text-white">
                            {item.term}
                          </h3>
                          <div className="text-xs font-mono text-amber-400">
                            {item.phonetic}
                          </div>
                        </div>

                        <p className="text-xs text-slate-200 leading-relaxed">
                          {item.definition}
                        </p>

                        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs space-y-1">
                          <span className="font-mono text-[10px] text-cyan-400 uppercase font-bold">
                            Corporate Context:
                          </span>
                          <p className="text-slate-300 text-[11px] leading-relaxed">
                            {item.corporateContext}
                          </p>
                        </div>

                        <div className="space-y-1 text-xs">
                          <span className="font-mono text-[10px] text-slate-400 uppercase font-bold">
                            Sample Sentence:
                          </span>
                          <p className="text-slate-300 text-xs italic">
                            &ldquo;{item.sampleSentences[0]}&rdquo;
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-500">
                          Synonyms: {item.synonyms.slice(0, 2).join(', ')}
                        </span>
                        <span className={isMastered ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                          {isMastered ? 'Mastered' : 'Unmastered'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 6. DEDICATED SPEAKING TRAINER TAB (8 PRACTICE MODES) */}
          {/* ========================================================================= */}
          {activeTab === 'speaking' && (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
                    <Mic className="w-6 h-6 text-blue-400" />
                    <span>Dedicated Speaking Trainer</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Improve fluency, confidence, sentence formation, pronunciation awareness, and professional communication across 8 practice modes.
                  </p>
                </div>
                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <div className="font-mono text-xs text-blue-400 bg-blue-950/40 border border-blue-800/40 px-3 py-1.5 rounded-xl">
                    {metrics.speakingConfidence}% Fluency Score
                  </div>
                  <div className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl">
                    {userState?.journalEntries.length || 0} Sessions Logged
                  </div>
                </div>
              </div>

              {/* 8 Practice Modes Selector Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 uppercase font-bold tracking-wider">
                    Select Practice Mode (8 Specialized Frameworks)
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400">
                    Active: {SPEAKING_MODES_CONFIG.find((m) => m.id === selectedSpeakingMode)?.title}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
                  {SPEAKING_MODES_CONFIG.map((mode, idx) => {
                    const isSelected = selectedSpeakingMode === mode.id;
                    const modeIcons: Record<string, any> = {
                      daily_self_talk: MessageSquare,
                      random_topic: Zap,
                      two_minute_challenge: Clock,
                      five_minute_tech: Cpu,
                      project_explanation: Layers,
                      interview_answer: Award,
                      workplace_scenario: Briefcase,
                      presentation_practice: Sliders,
                    };
                    const IconComponent = modeIcons[mode.id] || Mic;

                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => handleSelectSpeakingMode(mode.id)}
                        className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between relative overflow-hidden group ${
                          isSelected
                            ? 'bg-blue-950/60 border-blue-500 shadow-lg shadow-blue-500/10'
                            : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
                        )}
                        <div className="flex items-center justify-between w-full mb-2">
                          <span
                            className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs ${
                              isSelected
                                ? 'bg-blue-500 text-white'
                                : 'bg-slate-800 text-slate-400 group-hover:text-white'
                            }`}
                          >
                            <IconComponent className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            #{idx + 1}
                          </span>
                        </div>
                        <div>
                          <div className={`text-xs font-bold font-display line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                            {mode.title.replace(/^\d+\.\s*/, '')}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                            {mode.targetDurationDesc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mode Objective & Prompts Bar */}
              {(() => {
                const currentModeConfig = SPEAKING_MODES_CONFIG.find((m) => m.id === selectedSpeakingMode);
                const exercisesInCurrentMode = getSpeakingExercisesByMode(selectedSpeakingMode);

                return (
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold uppercase">
                          {currentModeConfig?.title}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          Focus: {currentModeConfig?.recommendedFocus}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        {currentModeConfig?.shortDesc}
                      </p>
                    </div>

                    {/* Prompt Select & Shuffle */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <select
                        value={selectedSpeakingExercise.id}
                        onChange={(e) => {
                          const found = exercisesInCurrentMode.find((ex) => ex.id === e.target.value);
                          if (found) handleSelectSpeakingExercise(found);
                        }}
                        className="flex-1 md:w-64 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                      >
                        {exercisesInCurrentMode.map((ex) => (
                          <option key={ex.id} value={ex.id}>
                            {ex.topic}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={handleShuffleSpeakingExercise}
                        title="Shuffle Random Topic in this mode"
                        className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* DEDICATED EXERCISE STUDIO CARD */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
                {/* 1. TOPIC & TIME LIMIT */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        TOPIC
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                        {selectedSpeakingExercise.category}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                      {selectedSpeakingExercise.topic}
                    </h3>
                  </div>

                  {/* TIME LIMIT BADGE */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <div>
                        <span className="text-[10px] text-slate-500 block leading-none">TIME LIMIT</span>
                        <span className="font-bold text-white text-sm">
                          {Math.floor(selectedSpeakingExercise.timeLimitSeconds / 60)}m {selectedSpeakingExercise.timeLimitSeconds % 60 > 0 ? `${selectedSpeakingExercise.timeLimitSeconds % 60}s` : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. OBJECTIVE */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-mono text-xs text-blue-400 font-bold uppercase">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span>OBJECTIVE</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-sans pl-6">
                    {selectedSpeakingExercise.objective}
                  </p>
                </div>

                {/* 3. STRUCTURE */}
                <div className="space-y-3">
                  <div className="font-mono text-xs text-cyan-400 font-bold uppercase flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>STRUCTURE (Step-by-Step Delivery Framework):</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {selectedSpeakingExercise.structure.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-xs text-slate-300 leading-snug">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. USEFUL PHRASES */}
                <div className="space-y-3">
                  <div className="font-mono text-xs text-emerald-400 font-bold uppercase flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>USEFUL PHRASES (Click phrase to copy):</span>
                    </div>
                    {speakingPhraseCopied && (
                      <span className="text-[10px] text-emerald-400 font-mono">
                        ✓ Copied phrase!
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedSpeakingExercise.usefulPhrases.map((phrase, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(phrase);
                          setSpeakingPhraseCopied(phrase);
                          setTimeout(() => setSpeakingPhraseCopied(null), 2000);
                        }}
                        className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/40 hover:bg-emerald-950/10 text-left transition flex items-start justify-between gap-3 group"
                      >
                        <span className="text-xs text-slate-200 group-hover:text-white leading-relaxed italic">
                          &ldquo;{phrase}&rdquo;
                        </span>
                        <Copy className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 shrink-0 mt-0.5 transition" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Collapsible Model Spoken Answer & Pro Tips */}
                <div className="border border-slate-800 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setSpeakingModelExpanded(!speakingModelExpanded)}
                    className="w-full p-4 bg-slate-950/60 hover:bg-slate-950 flex items-center justify-between text-left transition text-xs font-mono font-bold text-slate-300"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span>EXPERT SPOKEN MODEL &amp; PRO TIPS</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${speakingModelExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {speakingModelExpanded && (
                    <div className="p-5 bg-slate-950/90 border-t border-slate-800 space-y-4 text-xs">
                      <div className="space-y-1.5">
                        <span className="font-mono text-[10px] text-blue-400 uppercase font-bold block">
                          Golden Standard Spoken Script:
                        </span>
                        <p className="text-slate-300 leading-relaxed italic bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                          &ldquo;{selectedSpeakingExercise.sampleSpokenModel}&rdquo;
                        </p>
                      </div>

                      {selectedSpeakingExercise.proTips && selectedSpeakingExercise.proTips.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="font-mono text-[10px] text-amber-400 uppercase font-bold block">
                            Key Delivery Pro Tips:
                          </span>
                          <ul className="list-disc list-inside text-slate-300 space-y-1">
                            {selectedSpeakingExercise.proTips.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* MIC & GRACEFUL FALLBACK NOTICE */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSpeakingMicEnabled(!speakingMicEnabled)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition ${
                        speakingMicEnabled
                          ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {speakingMicEnabled ? <Mic className="w-3.5 h-3.5 text-blue-400" /> : <MicOff className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{speakingMicEnabled ? 'Microphone Enabled (Optional)' : 'Microphone Off (Practice with Timer Only)'}</span>
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Microphone is 100% optional. No permissions required to complete speaking drills.
                  </span>
                </div>

                {speakingMicError && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{speakingMicError}</span>
                  </div>
                )}

                {/* 5. LIVE STUDIO ACTION BAR (START BUTTON, LIVE TIMER, COMPLETED BUTTON) */}
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
                  {/* Timer & Waveform Status */}
                  <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center font-mono">
                      <span className="text-[10px] text-slate-500 uppercase">TIMER</span>
                      <span className={`text-base font-bold ${speakingStatus === 'speaking' ? 'text-cyan-400 animate-pulse' : 'text-white'}`}>
                        {Math.floor(speakingSecondsRemaining / 60)}:{(speakingSecondsRemaining % 60).toString().padStart(2, '0')}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="font-display font-bold text-white text-base flex items-center gap-2">
                        {speakingStatus === 'speaking' && (
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                        )}
                        <span>
                          {speakingStatus === 'speaking'
                            ? 'Speaking Practice in Progress...'
                            : speakingStatus === 'completed'
                            ? 'Practice Session Completed!'
                            : 'Ready to Practice'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {speakingStatus === 'speaking'
                          ? 'Deliver your response aloud following the numbered framework.'
                          : 'Press START to start the timer, then click COMPLETED to log your reflection.'}
                      </p>
                    </div>
                  </div>

                  {/* Audio visualizer effect if speaking */}
                  {speakingStatus === 'speaking' && (
                    <div className="flex items-center gap-1.5 h-8 px-4 py-1 rounded-xl bg-slate-900/80 border border-slate-800">
                      {[12, 24, 18, 28, 16, 22, 32, 14, 26, 18, 30, 20].map((h, i) => (
                        <span
                          key={i}
                          style={{ height: `${(h * (1 + (i % 3) * 0.2)).toFixed(0)}px` }}
                          className="w-1 bg-cyan-400 rounded-full animate-pulse"
                        />
                      ))}
                    </div>
                  )}

                  {/* Action Buttons: START, COMPLETED, RESET */}
                  <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
                    {speakingStatus === 'speaking' ? (
                      <button
                        type="button"
                        onClick={handleCompleteSpeakingPractice}
                        className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-sans font-bold rounded-2xl text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>COMPLETED (LOG REFLECTION)</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleStartSpeakingPractice}
                        className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-sans font-bold rounded-2xl text-xs transition flex items-center gap-2 shadow-lg shadow-blue-500/25 group"
                      >
                        <Play className="w-4 h-4 fill-white group-hover:scale-110 transition" />
                        <span>START BUTTON</span>
                      </button>
                    )}

                    {/* Manual Completed button available anytime */}
                    {speakingStatus !== 'speaking' && (
                      <button
                        type="button"
                        onClick={handleCompleteSpeakingPractice}
                        className="px-5 py-3.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-2xl text-xs font-mono text-slate-300 hover:text-white transition flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>COMPLETED BUTTON</span>
                      </button>
                    )}

                    {/* Reset button */}
                    <button
                      type="button"
                      onClick={handleResetSpeakingPractice}
                      title="Reset timer"
                      className="p-3.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Optional Recorded Audio Playback */}
                {speakingAudioUrl && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Mic className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="font-mono text-xs text-white font-bold">
                          Session Audio Recording Available
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Re-listen to analyze pacing and pronunciation before logging notes.
                        </div>
                      </div>
                    </div>
                    <audio controls src={speakingAudioUrl} className="h-8 w-full sm:w-64" />
                  </div>
                )}
              </div>

              {/* Pronunciation & Phonetics Directory */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Tech Pronunciation &amp; Syllable Stress Guides</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PRONUNCIATION_LIST.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold font-display text-white">
                          {item.term}
                        </span>
                        <span className="text-xs font-mono text-cyan-400">
                          {item.phonetic}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-amber-300">
                        Stress: {item.syllableBreakdown}
                      </div>

                      <p className="text-xs text-slate-300">
                        <b className="text-rose-400">Avoid: </b>{item.commonMispronunciation}
                      </p>

                      <p className="text-xs text-slate-400 italic">
                        &ldquo;{item.practiceSentence}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 7. LISTENING TAB */}
          {/* ========================================================================= */}
          {activeTab === 'listening' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <Headphones className="w-5 h-5 text-indigo-400" />
                    <span>Global Stakeholder Listening Comprehension</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Process rapid architectural briefings and subtle product requirement changes.
                  </p>
                </div>
                <div className="font-mono text-xs text-indigo-400 bg-indigo-950/40 border border-indigo-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  {metrics.listeningProgress}% Completed
                </div>
              </div>

              <div className="space-y-6">
                {LISTENING_SCENARIOS.map((scenario) => (
                  <div
                    key={scenario.id}
                    className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-xs font-mono text-indigo-400 uppercase font-bold">
                          {scenario.speakerRole} ({scenario.accent})
                        </span>
                        <h3 className="text-lg font-bold font-display text-white mt-0.5">
                          {scenario.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-slate-500">
                        {scenario.durationApprox}
                      </span>
                    </div>

                    {/* Audio Transcript Box */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-sans text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                      {scenario.audioTranscript}
                    </div>

                    <p className="text-xs text-cyan-300 font-mono italic">
                      Context Note: {scenario.contextNote}
                    </p>

                    {/* Comprehension Questions */}
                    <div className="space-y-4 pt-2">
                      <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                        Comprehension Verification:
                      </div>

                      {scenario.questions.map((q) => {
                        const selected = quizSelections[q.id];
                        const submitted = quizSubmitted[q.id];

                        return (
                          <div
                            key={q.id}
                            className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5"
                          >
                            <p className="text-xs font-bold text-white">
                              {q.question}
                            </p>

                            <div className="space-y-1.5">
                              {q.options.map((opt, optIdx) => (
                                <button
                                  key={optIdx}
                                  onClick={() => {
                                    setQuizSelections((prev) => ({ ...prev, [q.id]: optIdx }));
                                    setQuizSubmitted((prev) => ({ ...prev, [q.id]: true }));
                                  }}
                                  className={`w-full text-left p-2.5 rounded-xl font-mono text-xs transition border flex items-center justify-between ${
                                    submitted
                                      ? optIdx === q.correctIndex
                                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                                        : selected === optIdx
                                        ? 'bg-rose-950/40 border-rose-500 text-rose-300'
                                        : 'bg-slate-900 border-slate-800 text-slate-400'
                                      : selected === optIdx
                                      ? 'bg-indigo-950 border-indigo-500 text-white'
                                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                                  }`}
                                >
                                  <span>{opt}</span>
                                </button>
                              ))}
                            </div>

                            {submitted && (
                              <p className="text-[11px] text-slate-400 font-mono">
                                {q.explanation}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 8. TECHNICAL ENGLISH TAB */}
          {/* ========================================================================= */}
          {activeTab === 'technical' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    <span>Technical English &amp; Architectural Articulation</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Constructive code reviews, blameless postmortems, and crisp RFC design documents.
                  </p>
                </div>
                <div className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  {metrics.technicalProgress}% Mastered
                </div>
              </div>

              <div className="space-y-6">
                {TECHNICAL_ENGLISH_LESSONS.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                          {lesson.focusArea}
                        </span>
                        <h3 className="text-xl font-bold font-display text-white mt-0.5">
                          {lesson.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                        {lesson.framework}
                      </span>
                    </div>

                    {/* Good vs Bad Examples */}
                    <div className="space-y-4">
                      {lesson.goodVsBadExamples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                        >
                          <div className="font-mono text-xs text-white font-bold">
                            Situation: {ex.situation}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 space-y-1">
                              <span className="font-bold font-mono text-[10px] uppercase block">
                                Unprofessional / Abrasive:
                              </span>
                              &ldquo;{ex.unprofessional}&rdquo;
                            </div>

                            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
                              <span className="font-bold font-mono text-[10px] uppercase block">
                                High-Impact Engineering Leadership:
                              </span>
                              &ldquo;{ex.professional}&rdquo;
                            </div>
                          </div>

                          <p className="text-xs text-slate-400 italic">
                            Key Distinction: {ex.keyDifference}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Reusable Templates with Copy */}
                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                        Reusable Fill-in-the-Blank Patterns:
                      </div>

                      {lesson.templates.map((tpl, tIdx) => (
                        <div
                          key={tIdx}
                          className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <span className="font-mono text-xs font-bold text-cyan-400">
                              {tpl.name}
                            </span>
                            <p className="text-xs text-slate-300 font-mono">
                              Pattern: {tpl.pattern}
                            </p>
                            <p className="text-xs text-slate-400 italic">
                              Example: &ldquo;{tpl.fillInExample}&rdquo;
                            </p>
                          </div>

                          <button
                            onClick={() => handleCopyText(tpl.fillInExample, `${lesson.id}_${tIdx}`)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 self-start sm:self-auto shrink-0"
                          >
                            {copiedId === `${lesson.id}_${tIdx}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>{copiedId === `${lesson.id}_${tIdx}` ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 9. INTERVIEW TRAINER TAB (10 CATEGORIES, 5-STEP WORKFLOW & MOCK SIMULATOR) */}
          {/* ========================================================================= */}
          {activeTab === 'interview' && (
            <div className="space-y-6">
              {/* Header & Sub-Navigation */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-400" />
                    <span>Software &amp; AI Interview Trainer</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    10 specialized tracks • Question &rarr; Think &rarr; Answer &rarr; Review &rarr; Improve • STAR &amp; Technical frameworks • 6-dimensional AI evaluation
                  </p>
                </div>

                {/* Sub-view mode toggles */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
                  <button
                    onClick={() => setInterviewSubTab('studio')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                      interviewSubTab === 'studio'
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Question Studio</span>
                  </button>
                  <button
                    onClick={() => setInterviewSubTab('mock')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                      interviewSubTab === 'mock'
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Mock Interview</span>
                  </button>
                  <button
                    onClick={() => setInterviewSubTab('history')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                      interviewSubTab === 'history'
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>History &amp; Drills</span>
                  </button>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* SUB-VIEW 1: QUESTION STUDIO & EXPLORER */}
              {/* ========================================================================= */}
              {interviewSubTab === 'studio' && (
                <div className="space-y-6">
                  {/* Category Pill Selector (10 Categories) */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                      Select Interview Category (10 Specialized Tracks):
                    </span>
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                      <button
                        onClick={() => setSelectedInterviewCategory('all')}
                        className={`px-3 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition border ${
                          selectedInterviewCategory === 'all'
                            ? 'bg-purple-600/20 border-purple-500/60 text-purple-300 shadow-sm'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        All Tracks ({INTERVIEW_QUESTIONS_BANK.length})
                      </button>
                      {INTERVIEW_CATEGORIES_CONFIG.map((cat) => {
                        const count = INTERVIEW_QUESTIONS_BANK.filter((q) => q.category === cat.category).length;
                        const isSelected = selectedInterviewCategory === cat.category;
                        return (
                          <button
                            key={cat.category}
                            onClick={() => setSelectedInterviewCategory(cat.category)}
                            className={`px-3 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition border flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-purple-600/20 border-purple-500/60 text-purple-300 shadow-sm'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <span>{cat.icon || '🎯'}</span>
                            <span>{cat.title}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-950 text-slate-400">
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Difficulty Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-slate-900/60 border border-slate-800 rounded-2xl">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono text-slate-400 mr-1 hidden sm:inline">Difficulty:</span>
                      {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((diff) => (
                        <button
                          key={diff}
                          onClick={() => setSelectedInterviewDifficulty(diff)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium capitalize transition ${
                            selectedInterviewDifficulty === diff
                              ? 'bg-slate-800 text-white border border-slate-700'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>

                    <div className="relative flex-1 max-w-xs">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        value={interviewSearchQuery}
                        onChange={(e) => setInterviewSearchQuery(e.target.value)}
                        placeholder="Search questions or keywords..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* Main Studio Grid: Left Sidebar (Question List) & Right Panel (5-Phase Studio) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left List of Questions */}
                    <div className="lg:col-span-4 space-y-2 max-h-[680px] overflow-y-auto pr-1">
                      <div className="text-xs font-mono text-slate-400 flex items-center justify-between px-1 pb-1">
                        <span>QUESTIONS ({filteredInterviewQuestions.length})</span>
                        <span className="text-[10px] text-slate-500">Select to practice</span>
                      </div>

                      {filteredInterviewQuestions.length === 0 ? (
                        <div className="p-8 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-500 text-xs font-mono">
                          No interview questions found matching criteria.
                        </div>
                      ) : (
                        filteredInterviewQuestions.map((q) => {
                          const isSelected = currentStudioQuestion.id === q.id;
                          const isCompleted = userState?.completedTopicIds.includes(`interview_q_${q.id}`);
                          return (
                            <div
                              key={q.id}
                              onClick={() => handleSelectInterviewQuestion(q.id)}
                              className={`p-3.5 rounded-2xl border cursor-pointer transition space-y-2 ${
                                isSelected
                                  ? 'bg-purple-950/30 border-purple-500/60 shadow-md shadow-purple-500/10'
                                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-950 text-purple-400 uppercase font-bold border border-purple-900/40">
                                  {q.category.replace('_', ' ')}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${
                                      q.difficulty.toLowerCase() === 'beginner'
                                        ? 'text-emerald-400 bg-emerald-950/40'
                                        : q.difficulty.toLowerCase() === 'intermediate'
                                        ? 'text-amber-400 bg-amber-950/40'
                                        : 'text-rose-400 bg-rose-950/40'
                                    }`}
                                  >
                                    {q.difficulty}
                                  </span>
                                  {isCompleted && (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                  )}
                                </div>
                              </div>
                              <h4 className="text-xs font-bold text-slate-200 line-clamp-2">
                                {q.question}
                              </h4>
                              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                                <span>Framework: {q.frameworkType.toUpperCase()}</span>
                                <span>~{Math.round((q.timeLimitSeconds || q.thinkPhase?.targetDurationSec || 120) / 60)}m limit</span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Right Active Question Studio: 5-Step Workflow */}
                    <div className="lg:col-span-8 space-y-4">
                      {/* Active Question Hero Banner */}
                      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-2.5 py-1 rounded-lg uppercase font-bold">
                              {currentStudioQuestion.category.replace('_', ' ')}
                            </span>
                            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded-lg uppercase">
                              Framework: {currentStudioQuestion.frameworkType.toUpperCase()}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            Target: {Math.round((currentStudioQuestion.timeLimitSeconds || currentStudioQuestion.thinkPhase?.targetDurationSec || 120) / 60)} min
                          </span>
                        </div>

                        <div>
                          <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                            Interview Question:
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold font-display text-white mt-1 leading-snug">
                            &ldquo;{currentStudioQuestion.question}&rdquo;
                          </h3>
                        </div>

                        <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-200 flex items-start gap-2">
                          <Target className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <div>
                            <b className="text-white">Objective: </b>
                            {currentStudioQuestion.objective || currentStudioQuestion.thinkPhase?.whatInterviewerLooksFor || currentStudioQuestion.categoryTitle}
                          </div>
                        </div>

                        {/* 5-Step Workflow Navigation Tabs */}
                        <div className="grid grid-cols-5 gap-1 pt-2 border-t border-slate-800">
                          {(
                            [
                              { id: 'question', label: '1. Question', icon: HelpCircle },
                              { id: 'think', label: '2. Think', icon: Lightbulb },
                              { id: 'answer', label: '3. Answer', icon: Mic },
                              { id: 'review', label: '4. Review', icon: CheckSquare },
                              { id: 'improve', label: '5. Improve', icon: Sparkles },
                            ] as const
                          ).map((step) => {
                            const Icon = step.icon;
                            const isActive = interviewWorkflowStep === step.id;
                            return (
                              <button
                                key={step.id}
                                onClick={() => setInterviewWorkflowStep(step.id)}
                                className={`py-2 px-1 rounded-xl font-mono text-[11px] font-bold transition flex flex-col sm:flex-row items-center justify-center gap-1.5 border ${
                                  isActive
                                    ? 'bg-purple-600 border-purple-400 text-white shadow-md shadow-purple-500/20'
                                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                                }`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">{step.label}</span>
                                <span className="sm:hidden">{step.id}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* WORKFLOW PHASE 1: QUESTION DETAILS */}
                      {interviewWorkflowStep === 'question' && (
                        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
                          <div className="space-y-3">
                            <h4 className="text-sm font-bold font-mono text-purple-300 uppercase flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              <span>Phase 1: Question Understanding &amp; Expected Keywords</span>
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              Before jumping into your response, read the question carefully, recognize the underlying competencies the interviewer is probing, and keep key technical terminology ready.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <span className="text-xs font-mono text-slate-400 font-semibold block">
                              Expected Keywords &amp; Core Concepts:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {(currentStudioQuestion.expectedKeywords || currentStudioQuestion.thinkPhase?.keyKeywords || []).map((kw, kwIdx) => (
                                <span
                                  key={kwIdx}
                                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300"
                                >
                                  #{kw}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <span className="text-xs font-mono text-amber-400 uppercase font-bold block">
                              Anchor Phrases to Anchor Your Delivery:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {currentStudioQuestion.reviewPhase.keyPhrases.slice(0, 4).map((p, pIdx) => (
                                <div
                                  key={pIdx}
                                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 italic flex items-center justify-between gap-2"
                                >
                                  <span>&ldquo;{p}&rdquo;</span>
                                  <button
                                    onClick={() => handleCopyText(p, `p1_${pIdx}`)}
                                    className="text-slate-500 hover:text-white shrink-0"
                                  >
                                    {copiedId === `p1_${pIdx}` ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2 flex justify-end">
                            <button
                              onClick={() => setInterviewWorkflowStep('think')}
                              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-purple-500/20"
                            >
                              <span>Next: Step 2 &rarr; Think Phase</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* WORKFLOW PHASE 2: THINK */}
                      {interviewWorkflowStep === 'think' && (
                        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
                          <div className="space-y-1.5">
                            <h4 className="text-sm font-bold font-mono text-amber-300 uppercase flex items-center gap-2">
                              <Lightbulb className="w-4 h-4" />
                              <span>Phase 2: Think &amp; Structure (Mental Blueprint)</span>
                            </h4>
                            <p className="text-xs text-slate-400">
                              Take 15–30 seconds to mentally outline your answer before speaking. Avoid rambling or skipping context.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* What the interviewer looks for */}
                            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                              <span className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                                <Target className="w-3.5 h-3.5" />
                                <span>What Interviewer Evaluates:</span>
                              </span>
                              <p className="text-xs text-slate-300 leading-relaxed">
                                {currentStudioQuestion.thinkPhase?.whatInterviewerLooksFor || currentStudioQuestion.thinkPhase?.mentalFramework || 'Clear technical reasoning, structured delivery, and confident ownership.'}
                              </p>
                            </div>

                            {/* Traps to avoid */}
                            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                              <span className="text-xs font-mono text-rose-400 uppercase font-bold flex items-center gap-1.5">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>Traps / Pitfalls to Avoid:</span>
                              </span>
                              <p className="text-xs text-rose-200 leading-relaxed">
                                {currentStudioQuestion.thinkPhase?.trapsToAvoid || (currentStudioQuestion.thinkPhase?.pointsToAvoid || []).join('; ') || 'Avoid speaking without clear structure.'}
                              </p>
                            </div>
                          </div>

                          {/* Mental Outline */}
                          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                            <span className="text-xs font-mono text-purple-300 uppercase font-bold flex items-center gap-1.5">
                              <ListOrdered className="w-4 h-4" />
                              <span>Structured Mental Outline:</span>
                            </span>
                            <div className="space-y-2">
                              {(currentStudioQuestion.thinkPhase?.mentalOutline || currentStudioQuestion.thinkPhase?.pointsToAvoid || [currentStudioQuestion.thinkPhase?.mentalFramework || 'Structure into clear phases']).map((point, ptIdx) => (
                                <div
                                  key={ptIdx}
                                  className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed"
                                >
                                  <span className="font-mono text-purple-400 font-bold shrink-0 mt-0.5">
                                    0{ptIdx + 1}.
                                  </span>
                                  <span>{point}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <button
                              onClick={() => setInterviewWorkflowStep('question')}
                              className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                            >
                              &larr; Back to Question
                            </button>
                            <button
                              onClick={() => setInterviewWorkflowStep('answer')}
                              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-purple-500/20"
                            >
                              <span>Next: Step 3 &rarr; Answer Phase</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* WORKFLOW PHASE 3: ANSWER */}
                      {interviewWorkflowStep === 'answer' && (
                        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold font-mono text-emerald-300 uppercase flex items-center gap-2">
                              <Mic className="w-4 h-4" />
                              <span>Phase 3: Answer Entry (Framework Inputs &amp; Voice Recording)</span>
                            </h4>
                            <p className="text-xs text-slate-400">
                              Fill in the structured framework fields below or speak your answer aloud.
                            </p>
                          </div>

                          {/* Framework Specific Inputs */}
                          <div className="space-y-4">
                            <span className="text-xs font-mono text-cyan-400 uppercase font-bold block">
                              Framework Breakdown ({currentStudioQuestion.frameworkType.toUpperCase()}):
                            </span>

                            {getFrameworkStepList(currentStudioQuestion.frameworkType).map((step) => (
                              <div key={step.key} className="space-y-1.5">
                                <label className="text-xs font-mono font-semibold text-slate-300 flex items-center justify-between">
                                  <span className="text-purple-300 font-bold">{step.label}</span>
                                  <span className="text-slate-500 font-normal text-[11px]">{step.hint || step.guidance || ''}</span>
                                </label>
                                <textarea
                                  rows={2}
                                  value={studioStepAnswers[step.key] || ''}
                                  onChange={(e) =>
                                    setStudioStepAnswers((prev) => ({ ...prev, [step.key]: e.target.value }))
                                  }
                                  placeholder={step.placeholder}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 resize-none"
                                />
                              </div>
                            ))}
                          </div>

                          {/* Freeform Answer / Spoken Transcript */}
                          <div className="space-y-1.5 pt-2 border-t border-slate-800">
                            <label className="text-xs font-mono font-semibold text-slate-300 flex items-center justify-between">
                              <span>Full Spoken Response / Freeform Draft:</span>
                              <span className="text-slate-500 font-normal text-[11px]">Optional continuous answer</span>
                            </label>
                            <textarea
                              rows={3}
                              value={studioFreeformAnswer}
                              onChange={(e) => setStudioFreeformAnswer(e.target.value)}
                              placeholder="Write or paste your continuous speech transcript here..."
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 resize-none"
                            />
                          </div>

                          {/* Audio Recording Section */}
                          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={studioIsRecording ? stopStudioRecording : startStudioRecording}
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition shadow-lg ${
                                  studioIsRecording
                                    ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse shadow-rose-500/30'
                                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/30'
                                }`}
                              >
                                {studioIsRecording ? <Square className="w-5 h-5 fill-white" /> : <Mic className="w-5 h-5" />}
                              </button>
                              <div>
                                <div className="text-xs font-mono font-bold text-white">
                                  {studioIsRecording ? 'Recording Speech...' : studioAudioUrl ? 'Audio Recorded' : 'Record Your Spoken Answer'}
                                </div>
                                <div className="text-[11px] font-mono text-slate-400">
                                  {studioIsRecording
                                    ? `Elapsed: ${studioRecordSeconds}s`
                                    : 'Speak naturally to practice your delivery and pacing.'}
                                </div>
                              </div>
                            </div>

                            {studioAudioUrl && (
                              <audio controls src={studioAudioUrl} className="h-8 max-w-[220px]" />
                            )}
                          </div>

                          {/* Confidence Rating & Filler Words */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                            <div className="space-y-1.5">
                              <label className="text-xs font-mono font-bold text-slate-300 block">
                                Self-Confidence Rating (1-5):
                              </label>
                              <div className="flex items-center gap-1.5">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <button
                                    key={rating}
                                    type="button"
                                    onClick={() => setStudioConfidenceRating(rating)}
                                    className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold border transition ${
                                      studioConfidenceRating === rating
                                        ? 'bg-purple-600 border-purple-400 text-white shadow'
                                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                                    }`}
                                  >
                                    {rating}★
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-mono font-bold text-slate-300 block">
                                Filler Word Count (uh, um, like):
                              </label>
                              <div className="flex items-center gap-1.5">
                                {[0, 1, 2, 3, 5].map((cnt) => (
                                  <button
                                    key={cnt}
                                    type="button"
                                    onClick={() => setStudioFillerCount(cnt)}
                                    className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold border transition ${
                                      studioFillerCount === cnt
                                        ? 'bg-rose-600/30 border-rose-500 text-rose-300'
                                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                                    }`}
                                  >
                                    {cnt === 5 ? '5+' : cnt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between pt-2">
                            <button
                              onClick={() => setInterviewWorkflowStep('think')}
                              className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                            >
                              &larr; Back to Think
                            </button>

                            <button
                              disabled={studioIsEvaluating}
                              onClick={handleEvaluateStudioAnswer}
                              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                            >
                              {studioIsEvaluating ? (
                                <>
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                  <span>Evaluating 6 Dimensions...</span>
                                </>
                              ) : (
                                <>
                                  <CheckSquare className="w-4 h-4" />
                                  <span>Evaluate &amp; Review Answer</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* WORKFLOW PHASE 4: REVIEW */}
                      {interviewWorkflowStep === 'review' && (
                        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                            <div>
                              <h4 className="text-sm font-bold font-mono text-cyan-300 uppercase flex items-center gap-2">
                                <CheckSquare className="w-4 h-4" />
                                <span>Phase 4: Multi-Dimensional Evaluation &amp; Golden Benchmark</span>
                              </h4>
                              <p className="text-xs text-slate-400">
                                Evaluated on Clarity, Structure, Relevance, Confidence, Technical Accuracy, and Conciseness.
                              </p>
                            </div>

                            {studioEvaluationResult && (
                              <div className="px-3.5 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-xs font-mono font-bold text-purple-300">
                                Overall Score: {studioEvaluationResult.overallScore}/100
                              </div>
                            )}
                          </div>

                          {/* 6 Dimensions Score Breakdown */}
                          {studioEvaluationResult && (
                            <div className="space-y-3">
                              <span className="text-xs font-mono text-slate-400 font-semibold block">
                                6-DIMENSIONAL COMMUNICATION EVALUATION:
                              </span>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {[
                                  { label: 'Clarity', score: studioEvaluationResult.clarityScore, color: 'text-blue-400' },
                                  { label: 'Structure', score: studioEvaluationResult.structureScore, color: 'text-indigo-400' },
                                  { label: 'Relevance', score: studioEvaluationResult.relevanceScore, color: 'text-emerald-400' },
                                  { label: 'Confidence', score: studioEvaluationResult.confidenceScore, color: 'text-amber-400' },
                                  { label: 'Tech Accuracy', score: studioEvaluationResult.technicalAccuracyScore, color: 'text-purple-400' },
                                  { label: 'Conciseness', score: studioEvaluationResult.concisenessScore, color: 'text-cyan-400' },
                                ].map((dim, dIdx) => (
                                  <div
                                    key={dIdx}
                                    className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5"
                                  >
                                    <div className="flex items-center justify-between text-xs font-mono">
                                      <span className="text-slate-400">{dim.label}</span>
                                      <span className={`font-bold ${dim.color}`}>{dim.score}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                                        style={{ width: `${dim.score}%` }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Strengths & Weak Areas */}
                          {studioEvaluationResult && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                                <span className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Identified Strengths:</span>
                                </span>
                                <ul className="space-y-1 text-xs text-emerald-200">
                                  {studioEvaluationResult.strengths.map((s, sIdx) => (
                                    <li key={sIdx}>• {s}</li>
                                  ))}
                                </ul>
                              </div>

                              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                                <span className="text-xs font-mono text-amber-400 uppercase font-bold flex items-center gap-1.5">
                                  <AlertCircle className="w-3.5 h-3.5" />
                                  <span>Areas for Improvement:</span>
                                </span>
                                <ul className="space-y-1 text-xs text-amber-200">
                                  {studioEvaluationResult.weakAreas.map((w, wIdx) => (
                                    <li key={wIdx}>• {w}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}

                          {/* Golden Model Response */}
                          <div className="space-y-2">
                            <div className="text-xs font-mono uppercase text-slate-400 font-semibold flex items-center justify-between">
                              <span className="text-purple-300">BENCHMARK GOLDEN / MODEL RESPONSE:</span>
                              <button
                                onClick={() => handleCopyText(currentStudioQuestion.reviewPhase.goldenAnswer || currentStudioQuestion.reviewPhase.goldenModelAnswer || '', 'golden_ans')}
                                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                              >
                                {copiedId === 'golden_ans' ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                                <span>{copiedId === 'golden_ans' ? 'Copied' : 'Copy Response'}</span>
                              </button>
                            </div>
                            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-mono">
                              {currentStudioQuestion.reviewPhase.goldenAnswer || currentStudioQuestion.reviewPhase.goldenModelAnswer}
                            </div>
                          </div>

                          {/* Action Navigation */}
                          <div className="flex items-center justify-between pt-2">
                            <button
                              onClick={() => setInterviewWorkflowStep('answer')}
                              className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                            >
                              &larr; Refine Answer
                            </button>
                            <button
                              onClick={() => setInterviewWorkflowStep('improve')}
                              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-purple-500/20"
                            >
                              <span>Next: Step 5 &rarr; Improve Phase</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* WORKFLOW PHASE 5: IMPROVE */}
                      {interviewWorkflowStep === 'improve' && (
                        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold font-mono text-indigo-300 uppercase flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-indigo-400" />
                              <span>Phase 5: Improve &amp; Polish Delivery</span>
                            </h4>
                            <p className="text-xs text-slate-400">
                              Elevate your answer by adopting executive vocabulary, removing fillers, and tightening sentence transitions.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Vocabulary Upgrades */}
                            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                              <span className="text-xs font-mono text-cyan-400 uppercase font-bold block">
                                Recommended Vocabulary Upgrades:
                              </span>
                              <div className="space-y-2">
                                {currentStudioQuestion.improvePhase.vocabularyUpgrades.map((item, vIdx) => (
                                  <div
                                    key={vIdx}
                                    className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 text-xs font-mono flex items-center justify-between gap-2"
                                  >
                                    <span className="text-rose-400 line-through">{item.from}</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                                    <span className="text-emerald-400 font-bold">{item.to}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Conciseness Tips */}
                            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                              <span className="text-xs font-mono text-amber-400 uppercase font-bold block">
                                Conciseness &amp; Flow Tips:
                              </span>
                              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed list-disc list-inside">
                                {currentStudioQuestion.improvePhase.concisenessTips.map((tip, tIdx) => (
                                  <li key={tIdx}>{tip}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Next Actions */}
                          <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div className="text-xs text-purple-200">
                              Ready for the next challenge? Select another question or simulate a real interview round.
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setInterviewWorkflowStep('answer');
                                  setStudioFreeformAnswer('');
                                  setStudioStepAnswers({});
                                }}
                                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-slate-200"
                              >
                                Retry Answer
                              </button>
                              <button
                                onClick={() => setInterviewSubTab('mock')}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-mono font-bold"
                              >
                                Launch Mock Interview &rarr;
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* SUB-VIEW 2: MOCK INTERVIEW SIMULATOR */}
              {/* ========================================================================= */}
              {interviewSubTab === 'mock' && (
                <div className="space-y-6">
                  {!mockIsRunning && !mockSessionCompleted && (
                    /* Mock Interview Setup Screen */
                    <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
                      <div className="space-y-2 text-center sm:text-left">
                        <span className="text-xs font-mono text-purple-400 uppercase font-bold tracking-wider">
                          REAL-TIME SIMULATION ENGINE
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                          Configure Mock Interview Round
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Test your answers under realistic conditions. One question at a time with instant multi-dimensional evaluation across Clarity, Structure, Relevance, Confidence, Technical Accuracy, and Conciseness.
                        </p>
                      </div>

                      {/* Setup Grid: Track, Difficulty, Count */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* 1. Track Selector */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono font-bold text-slate-300">
                            1. Interview Track:
                          </label>
                          <select
                            value={mockConfig.category}
                            onChange={(e) =>
                              setMockConfig((prev) => ({ ...prev, category: e.target.value as any }))
                            }
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-purple-500"
                          >
                            <option value="mixed">Mixed Tracks (Comprehensive)</option>
                            {INTERVIEW_CATEGORIES_CONFIG.map((c) => (
                              <option key={c.category} value={c.category}>
                                {c.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* 2. Difficulty */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono font-bold text-slate-300">
                            2. Difficulty Level:
                          </label>
                          <select
                            value={mockConfig.difficulty}
                            onChange={(e) =>
                              setMockConfig((prev) => ({ ...prev, difficulty: e.target.value as any }))
                            }
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-purple-500"
                          >
                            <option value="beginner">Beginner (Foundational)</option>
                            <option value="intermediate">Intermediate (Standard)</option>
                            <option value="advanced">Advanced (Senior / Staff)</option>
                            <option value="mixed">Mixed Difficulties</option>
                          </select>
                        </div>

                        {/* 3. Question Count */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono font-bold text-slate-300">
                            3. Round Length:
                          </label>
                          <select
                            value={mockConfig.questionCount}
                            onChange={(e) =>
                              setMockConfig((prev) => ({ ...prev, questionCount: Number(e.target.value) }))
                            }
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-purple-500"
                          >
                            <option value={3}>3 Questions (Quick Sprint ~10m)</option>
                            <option value={5}>5 Questions (Standard Round ~20m)</option>
                            <option value={8}>8 Questions (Full Loop ~35m)</option>
                          </select>
                        </div>
                      </div>

                      {/* Launch Button */}
                      <div className="pt-4 border-t border-slate-800 flex justify-center sm:justify-end">
                        <button
                          onClick={handleStartMockInterview}
                          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-sans font-bold text-sm rounded-2xl transition flex items-center justify-center gap-2 shadow-xl shadow-purple-500/25"
                        >
                          <Play className="w-4 h-4 fill-white" />
                          <span>Start Mock Interview Session</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Mock Interview Active Runner */}
                  {mockIsRunning && mockQuestions.length > 0 && (
                    <div className="max-w-4xl mx-auto space-y-6">
                      {/* Top Timer & Progress Bar */}
                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-xl">
                            Question {mockCurrentIndex + 1} of {mockQuestions.length}
                          </span>
                          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                            Track: {mockQuestions[mockCurrentIndex]?.category.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 font-mono text-xs text-amber-400 bg-amber-950/40 border border-amber-800/40 px-3 py-1 rounded-xl">
                            <Clock className="w-3.5 h-3.5" />
                            <span>
                              {Math.floor(mockTimerSeconds / 60)}:
                              {(mockTimerSeconds % 60).toString().padStart(2, '0')}
                            </span>
                          </div>

                          <button
                            onClick={handleCancelMockInterview}
                            className="text-xs font-mono text-slate-500 hover:text-rose-400 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>

                      {/* Single Question Runner Card */}
                      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-slate-950 text-cyan-400 uppercase font-bold border border-slate-800">
                              Framework: {mockQuestions[mockCurrentIndex]?.frameworkType.toUpperCase()}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-amber-400 uppercase font-bold">
                              {mockQuestions[mockCurrentIndex]?.difficulty}
                            </span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                            &ldquo;{mockQuestions[mockCurrentIndex]?.question}&rdquo;
                          </h3>
                          <p className="text-xs text-purple-300">
                            Objective: {mockQuestions[mockCurrentIndex]?.objective || mockQuestions[mockCurrentIndex]?.thinkPhase?.whatInterviewerLooksFor || mockQuestions[mockCurrentIndex]?.categoryTitle}
                          </p>
                        </div>

                        {/* Framework input fields */}
                        <div className="space-y-3">
                          <span className="text-xs font-mono text-slate-400 font-semibold block">
                            Enter Structured Framework Response:
                          </span>

                          {getFrameworkStepList(mockQuestions[mockCurrentIndex]?.frameworkType).map((step) => (
                            <div key={step.key} className="space-y-1">
                              <label className="text-xs font-mono text-purple-300 font-bold flex items-center justify-between">
                                <span>{step.label}</span>
                                <span className="text-slate-500 font-normal text-[10px]">{step.hint || step.guidance || ''}</span>
                              </label>
                              <textarea
                                rows={2}
                                value={mockStepAnswers[step.key] || ''}
                                onChange={(e) =>
                                  setMockStepAnswers((prev) => ({ ...prev, [step.key]: e.target.value }))
                                }
                                placeholder={step.placeholder}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 resize-none"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Freeform speech transcript */}
                        <div className="space-y-1.5 pt-2 border-t border-slate-800">
                          <label className="text-xs font-mono text-slate-300 font-semibold">
                            Or Full Freeform Spoken Answer:
                          </label>
                          <textarea
                            rows={3}
                            value={mockFreeformAnswer}
                            onChange={(e) => setMockFreeformAnswer(e.target.value)}
                            placeholder="Type or paste your answer here..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 resize-none"
                          />
                        </div>

                        {/* Confidence & Filler Controls */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                          <div className="space-y-1.5">
                            <span className="text-xs font-mono text-slate-400">Confidence:</span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((r) => (
                                <button
                                  key={r}
                                  type="button"
                                  onClick={() => setMockConfidenceScore(r)}
                                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold border ${
                                    mockConfidenceScore === r
                                      ? 'bg-purple-600 border-purple-400 text-white'
                                      : 'bg-slate-950 border-slate-800 text-slate-400'
                                  }`}
                                >
                                  {r}★
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-xs font-mono text-slate-400">Filler Words:</span>
                            <div className="flex items-center gap-1">
                              {[0, 1, 2, 3, 5].map((cnt) => (
                                <button
                                  key={cnt}
                                  type="button"
                                  onClick={() => setMockFillerCount(cnt)}
                                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold border ${
                                    mockFillerCount === cnt
                                      ? 'bg-rose-600/30 border-rose-500 text-rose-300'
                                      : 'bg-slate-950 border-slate-800 text-slate-400'
                                  }`}
                                >
                                  {cnt === 5 ? '5+' : cnt}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Submit Question */}
                        <div className="flex justify-end pt-4 border-t border-slate-800">
                          <button
                            disabled={mockIsSubmittingCurrent}
                            onClick={handleSubmitCurrentMockAnswer}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-purple-500/20"
                          >
                            {mockIsSubmittingCurrent ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Evaluating Answer...</span>
                              </>
                            ) : (
                              <>
                                <span>
                                  {mockCurrentIndex + 1 === mockQuestions.length
                                    ? 'Submit & Finish Mock Interview'
                                    : 'Submit & Next Question'}
                                </span>
                                <ChevronRight className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mock Interview Completion Report Card */}
                  {mockSessionCompleted && mockCompletedRecord && (
                    <div className="max-w-4xl mx-auto space-y-6">
                      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                          <div>
                            <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">
                              SIMULATION COMPLETE
                            </span>
                            <h3 className="text-2xl font-bold font-display text-white mt-1">
                              Mock Interview Performance Report
                            </h3>
                            <p className="text-xs text-slate-400">
                              Evaluated across {mockCompletedRecord.totalQuestions} questions on {mockCompletedRecord.dateStr}
                            </p>
                          </div>

                          <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-center">
                            <span className="text-[10px] font-mono text-purple-300 uppercase block">
                              Overall Readiness
                            </span>
                            <span className="text-3xl font-bold font-display text-white">
                              {mockCompletedRecord.overallScore}
                              <span className="text-lg text-purple-400">/100</span>
                            </span>
                          </div>
                        </div>

                        {/* 6 Dimension Radar Breakdown */}
                        <div className="space-y-3">
                          <span className="text-xs font-mono text-slate-400 font-semibold block uppercase">
                            6-Dimensional Communication Profile:
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[
                              { label: 'Clarity', score: mockCompletedRecord.dimensionScores.clarity, color: 'text-blue-400' },
                              { label: 'Structure', score: mockCompletedRecord.dimensionScores.structure, color: 'text-indigo-400' },
                              { label: 'Relevance', score: mockCompletedRecord.dimensionScores.relevance, color: 'text-emerald-400' },
                              { label: 'Confidence', score: mockCompletedRecord.dimensionScores.confidence, color: 'text-amber-400' },
                              { label: 'Technical Accuracy', score: mockCompletedRecord.dimensionScores.technicalAccuracy, color: 'text-purple-400' },
                              { label: 'Conciseness', score: mockCompletedRecord.dimensionScores.conciseness, color: 'text-cyan-400' },
                            ].map((dim, dIdx) => (
                              <div
                                key={dIdx}
                                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5"
                              >
                                <div className="flex items-center justify-between text-xs font-mono">
                                  <span className="text-slate-400">{dim.label}</span>
                                  <span className={`font-bold ${dim.color}`}>{dim.score}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                                    style={{ width: `${dim.score}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Weak Areas & Recommended Practice Drills */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                            <span className="text-xs font-mono text-rose-400 uppercase font-bold flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>Identified Weak Areas:</span>
                            </span>
                            <ul className="space-y-1.5 text-xs text-rose-200">
                              {mockCompletedRecord.identifiedWeakAreas.map((w, wIdx) => (
                                <li key={wIdx}>• {w}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
                            <span className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                              <Target className="w-3.5 h-3.5" />
                              <span>Recommended Future Practice:</span>
                            </span>
                            <ul className="space-y-1.5 text-xs text-cyan-200">
                              {mockCompletedRecord.recommendedDrills.map((r, rIdx) => (
                                <li key={rIdx}>• {r}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Question by Question Summary */}
                        <div className="space-y-3 pt-2 border-t border-slate-800">
                          <span className="text-xs font-mono text-slate-400 font-semibold block uppercase">
                            Question Summaries:
                          </span>
                          <div className="space-y-2">
                            {mockCompletedRecord.questionSummaries.map((qSum, qIdx) => (
                              <div
                                key={qIdx}
                                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                              >
                                <div className="space-y-0.5">
                                  <span className="font-mono text-[10px] text-purple-400 uppercase font-bold">
                                    Q{qIdx + 1} • {qSum.category.replace('_', ' ')}
                                  </span>
                                  <p className="font-bold text-slate-200">{qSum.questionText}</p>
                                  <p className="text-slate-400 text-[11px] italic">{qSum.feedback}</p>
                                </div>
                                <div className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-slate-900 text-purple-300 border border-slate-800 shrink-0">
                                  {qSum.score}%
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Return / Retry Action */}
                        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                          <button
                            onClick={() => {
                              setMockSessionCompleted(false);
                              setInterviewSubTab('studio');
                            }}
                            className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 hover:text-white"
                          >
                            &larr; Back to Question Studio
                          </button>
                          <button
                            onClick={() => {
                              setMockSessionCompleted(false);
                              setMockIsRunning(false);
                            }}
                            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl"
                          >
                            New Mock Round
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================================= */}
              {/* SUB-VIEW 3: HISTORY & PRACTICE LOGS */}
              {/* ========================================================================= */}
              {interviewSubTab === 'history' && (
                <div className="space-y-6">
                  {/* Mock Interview History */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-mono font-bold text-purple-400 uppercase flex items-center gap-2">
                        <History className="w-4 h-4" />
                        <span>Saved Mock Interview Sessions</span>
                      </h3>
                      <span className="text-xs font-mono text-slate-500">
                        {userState?.mockInterviewHistory?.length || 0} Sessions Recorded
                      </span>
                    </div>

                    {(!userState?.mockInterviewHistory || userState.mockInterviewHistory.length === 0) ? (
                      <div className="p-8 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
                        <Award className="w-8 h-8 text-slate-600 mx-auto" />
                        <p className="text-xs text-slate-400 font-mono">
                          No mock interview sessions recorded yet. Launch a mock interview to evaluate your readiness!
                        </p>
                        <button
                          onClick={() => setInterviewSubTab('mock')}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-mono font-bold"
                        >
                          Start First Mock Interview
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userState.mockInterviewHistory.map((session) => (
                          <div
                            key={session.id}
                            className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono font-bold text-purple-400 uppercase">
                                    {session.category.toUpperCase()} • {session.difficulty.toUpperCase()}
                                  </span>
                                  <span className="text-xs font-mono text-slate-500">• {session.dateStr}</span>
                                </div>
                                <span className="text-xs text-slate-400 font-mono">
                                  {session.totalQuestions} Questions Evaluated
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="px-3.5 py-1 rounded-xl bg-purple-950/60 border border-purple-500/40 font-mono font-bold text-xs text-purple-300">
                                  Score: {session.overallScore}%
                                </div>
                                <button
                                  onClick={() => handleDeleteMockSession(session.id)}
                                  className="text-slate-500 hover:text-rose-400 p-1.5 transition"
                                  title="Delete session"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Dimension Mini Bars */}
                            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                              {Object.entries(session.dimensionScores).map(([dim, score]) => (
                                <div key={dim} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                                  <span className="text-[10px] font-mono text-slate-500 capitalize block truncate">
                                    {dim.replace(/([A-Z])/g, ' $1')}
                                  </span>
                                  <span className="text-xs font-mono font-bold text-slate-200">{score}%</span>
                                </div>
                              ))}
                            </div>

                            {/* Weak Areas & Recommendations */}
                            {session.identifiedWeakAreas.length > 0 && (
                              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs text-rose-200">
                                <b className="text-rose-400">Target Weak Areas: </b>
                                {session.identifiedWeakAreas.join('; ')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Individual Question Practice Logs */}
                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase flex items-center gap-2">
                        <CheckSquare className="w-4 h-4" />
                        <span>Question Studio Practice Logs</span>
                      </h3>
                      <span className="text-xs font-mono text-slate-500">
                        {userState?.questionPracticeHistory?.length || 0} Drills Logged
                      </span>
                    </div>

                    {(!userState?.questionPracticeHistory || userState.questionPracticeHistory.length === 0) ? (
                      <div className="p-6 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-xs font-mono text-slate-500">
                        No studio practice evaluations logged yet. Practice a question in the Question Studio to record answers.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {userState.questionPracticeHistory.slice(0, 10).map((log) => (
                          <div
                            key={log.id}
                            className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-purple-400 uppercase font-bold border border-slate-800">
                                {log.category.replace('_', ' ')}
                              </span>
                              <span className="font-mono text-emerald-400 font-bold">
                                {log.evaluation?.overallScore || 80}%
                              </span>
                            </div>
                            <p className="text-slate-300 font-mono text-[11px] line-clamp-2">
                              {log.userAnswer}
                            </p>
                            <span className="text-[10px] text-slate-500 font-mono block">
                              {new Date(log.completedAt).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 10. PROFESSIONAL EMAIL TAB */}
          {/* ========================================================================= */}
          {activeTab === 'professional' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-teal-400" />
                    <span>Executive Email &amp; Workplace Presence</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Proactive delay notices, diplomatic scope pushback, and promotion cases.
                  </p>
                </div>
                <div className="font-mono text-xs text-teal-400 bg-teal-950/40 border border-teal-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  {metrics.professionalProgress}% Templates Mastered
                </div>
              </div>

              <div className="space-y-6">
                {PROFESSIONAL_EMAIL_TEMPLATES.map((tmpl) => (
                  <div
                    key={tmpl.id}
                    className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-xs font-mono text-teal-400 uppercase font-bold">
                          {tmpl.category}
                        </span>
                        <h3 className="text-xl font-bold font-display text-white mt-0.5">
                          {tmpl.title}
                        </h3>
                      </div>

                      <button
                        onClick={() => handleCopyText(`Subject: ${tmpl.subjectLine}\n\n${tmpl.body}`, tmpl.id)}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-md"
                      >
                        {copiedId === tmpl.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === tmpl.id ? 'Copied Full Email' : 'Copy Template'}</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 italic">
                      <b className="text-white not-italic">Scenario Context: </b>{tmpl.scenario}
                    </p>

                    {/* Email Window Preview */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden text-xs sm:text-sm font-sans">
                      <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 font-mono text-xs text-slate-300">
                        <span className="text-slate-500">Subject: </span>
                        <span className="text-white font-bold">{tmpl.subjectLine}</span>
                      </div>
                      <div className="p-5 text-slate-200 whitespace-pre-line leading-relaxed">
                        {tmpl.body}
                      </div>
                    </div>

                    {/* Key Strategic Principles */}
                    <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                        KEY EXECUTIVE PRINCIPLES:
                      </span>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                        {tmpl.keyTakeaways.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 11. WEEKLY ASSESSMENT TAB */}
          {/* ========================================================================= */}
          {activeTab === 'assessment' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <span>Weekly Communication Diagnostic Benchmark</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Comprehensive 5-question evaluation testing technical grammar, vocabulary precision, and interview leadership.
                  </p>
                </div>
                <div className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  {userState?.assessmentHistory.length || 0} Assessments Completed
                </div>
              </div>

              {assessmentCompleted ? (
                <div className="p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/40 space-y-6 text-center max-w-xl mx-auto shadow-2xl">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-display text-white">
                      Assessment Submitted!
                    </h3>
                    <p className="text-xs text-slate-300">
                      Your diagnostic score has been recorded and factored into your overall Career Communication Readiness index.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setAssessmentCompleted(false);
                      setAssessmentAnswers({});
                    }}
                    className="px-6 py-3 bg-[#006cd2] hover:bg-blue-600 text-white font-sans font-bold text-xs rounded-xl transition"
                  >
                    Retake Assessment
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {ASSESSMENT_QUESTIONS.map((q, idx) => {
                    const selected = assessmentAnswers[q.id];
                    return (
                      <div
                        key={q.id}
                        className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-emerald-400 uppercase font-bold">
                            Question {idx + 1} of {ASSESSMENT_QUESTIONS.length} • {q.category}
                          </span>
                        </div>

                        <p className="text-sm font-bold text-white leading-relaxed font-sans">
                          {q.question}
                        </p>

                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() =>
                                setAssessmentAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                              }
                              className={`w-full text-left p-3.5 rounded-xl font-mono text-xs transition border flex items-center justify-between ${
                                selected === optIdx
                                  ? 'bg-[#006cd2]/20 border-[#006cd2] text-white'
                                  : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                              }`}
                            >
                              <span>{opt}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  <button
                    onClick={handleSubmitAssessment}
                    disabled={Object.keys(assessmentAnswers).length < ASSESSMENT_QUESTIONS.length}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-sans font-bold text-sm rounded-2xl transition disabled:opacity-50 shadow-xl shadow-emerald-500/20"
                  >
                    Submit Assessment &amp; Update Readiness Index
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 12. SPEAKING JOURNAL, CORRECTION STUDIO & COMMON MISTAKES TAB */}
          {/* ========================================================================= */}
          {activeTab === 'journal' && (() => {
            const allEntries = userState?.journalEntries || [];
            const allMistakes = userState?.trackedMistakes || [];

            const filteredEntries = allEntries.filter((entry) => {
              const matchesMode =
                journalFilterMode === 'all' ||
                entry.modeId === journalFilterMode ||
                (!entry.modeId && journalFilterMode === 'all');
              const matchesQuery =
                !journalSearchQuery ||
                entry.title.toLowerCase().includes(journalSearchQuery.toLowerCase()) ||
                (entry.reflectionNotes && entry.reflectionNotes.toLowerCase().includes(journalSearchQuery.toLowerCase())) ||
                (entry.whatISaid && entry.whatISaid.toLowerCase().includes(journalSearchQuery.toLowerCase())) ||
                (entry.whatIStruggledWith && entry.whatIStruggledWith.toLowerCase().includes(journalSearchQuery.toLowerCase())) ||
                (entry.newWordsUsed && entry.newWordsUsed.toLowerCase().includes(journalSearchQuery.toLowerCase()));
              return matchesMode && matchesQuery;
            });

            const filteredMistakes = allMistakes.filter((m) => {
              if (mistakesCategoryFilter === 'all') return true;
              if (mistakesCategoryFilter === 'unresolved') return !m.resolved;
              if (mistakesCategoryFilter === 'resolved') return !!m.resolved;
              return m.category === mistakesCategoryFilter;
            });

            // Calculate category frequency counts
            const mistakeCategoryCounts: Record<string, number> = {};
            MISTAKE_CATEGORIES_CONFIG.forEach((c) => {
              mistakeCategoryCounts[c.category] = 0;
            });
            allMistakes.forEach((m) => {
              mistakeCategoryCounts[m.category] = (mistakeCategoryCounts[m.category] || 0) + m.occurrenceCount;
            });

            // Sort categories by frequency to prioritize top repeated mistakes
            const prioritizedCategories = [...MISTAKE_CATEGORIES_CONFIG].sort((a, b) => {
              const countA = mistakeCategoryCounts[a.category] || 0;
              const countB = mistakeCategoryCounts[b.category] || 0;
              return countB - countA;
            });

            const avgConfidence = allEntries.length > 0
              ? (allEntries.reduce((acc, curr) => acc + (curr.confidenceScore || curr.selfRating || 4), 0) / allEntries.length).toFixed(1)
              : '0.0';
            const totalMinutes = Math.round(
              allEntries.reduce((acc, curr) => acc + (curr.durationSeconds || 60), 0) / 60
            );
            const allNewWords = Array.from(
              new Set(
                allEntries.flatMap((e) =>
                  e.newWordsUsed ? e.newWordsUsed.split(',').map((w) => w.trim()).filter(Boolean) : []
                )
              )
            );

            return (
              <div className="space-y-6">
                {/* Header with Sub-Navigation Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
                      <MessageSquare className="w-6 h-6 text-blue-400" />
                      <span>Speaking Journal &amp; English Correction Studio</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Log your speech sessions, analyze sentences with instant explanations, and target your repeated mistakes.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={() => handleTabChange('speaking')}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-blue-500/20"
                    >
                      <Mic className="w-4 h-4" />
                      <span>Speaking Studio</span>
                    </button>
                  </div>
                </div>

                {/* Sub-Navigation Tabs Strip */}
                <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setJournalSubTab('archive')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 ${
                      journalSubTab === 'archive'
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Speech Logs ({allEntries.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setJournalSubTab('correction')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 ${
                      journalSubTab === 'correction'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span>AI English Correction Interface</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setJournalSubTab('mistakes')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 ${
                      journalSubTab === 'mistakes'
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/25'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4 text-amber-300" />
                    <span>My Common Mistakes ({allMistakes.length})</span>
                  </button>
                </div>

                {/* ========================================================================= */}
                {/* SUB-TAB 1: AI ENGLISH CORRECTION INTERFACE */}
                {/* ========================================================================= */}
                {journalSubTab === 'correction' && (
                  <div className="space-y-6">
                    {/* Supportive Philosophy Banner */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-slate-900 border border-blue-500/30 flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <div className="space-y-1 text-xs">
                        <span className="font-mono font-bold text-white uppercase">
                          Supportive &amp; Practical Speech Refinement
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          Type or paste what you tried to say during practice. The engine analyzes tense consistency, preposition drops, and generates natural conversational and executive workplace versions.
                        </p>
                      </div>
                    </div>

                    {/* Correction Input Studio */}
                    <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-2">
                          <span>Enter What You Tried to Say:</span>
                        </label>
                        <span className="text-[11px] font-mono text-slate-500">
                          {correctionInputText.length} characters
                        </span>
                      </div>

                      {/* Textarea */}
                      <textarea
                        rows={3}
                        value={correctionInputText}
                        onChange={(e) => setCorrectionInputText(e.target.value)}
                        placeholder="e.g. Yesterday I go college and I discuss about my project with my friend."
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm font-sans text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none leading-relaxed"
                      />

                      {/* Preset Try-Out Examples */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                          Try Common Practice Examples:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {PRESET_CORRECTION_EXAMPLES.map((ex, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setCorrectionInputText(ex.sentence);
                                handleAnalyzeCorrection(ex.sentence);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition text-left"
                            >
                              💡 {ex.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => {
                            setCorrectionInputText('');
                            setCorrectionResult(null);
                          }}
                          className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition"
                        >
                          Clear
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAnalyzeCorrection()}
                          disabled={isAnalyzingCorrection || !correctionInputText.trim()}
                          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-sans font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-lg shadow-blue-500/25 disabled:opacity-50"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>{isAnalyzingCorrection ? 'Analyzing...' : 'Analyze & Refine English'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Correction Results Display Card */}
                    {correctionResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-blue-500/30 space-y-6 shadow-2xl"
                      >
                        {/* 1. CORRECT VERSION */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono text-emerald-400 font-bold uppercase flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>CORRECT VERSION:</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyText(correctionResult.correctedText, 'corr_correct')}
                              className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg"
                            >
                              {copiedId === 'corr_correct' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedId === 'corr_correct' ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 text-sm sm:text-base font-semibold text-emerald-200 leading-relaxed">
                            &ldquo;{correctionResult.correctedText}&rdquo;
                          </div>
                        </div>

                        {/* 2. WHY (Detailed Rule Reasoning) */}
                        <div className="space-y-2">
                          <span className="text-xs font-mono text-cyan-400 font-bold uppercase flex items-center gap-2">
                            <HelpCircle className="w-4 h-4" />
                            <span>WHY (Grammar &amp; Usage Explanations):</span>
                          </span>
                          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                            <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                              {correctionResult.whyExplanations.map((exp, idx) => (
                                <li key={idx} className="flex items-start gap-2.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                                  <span className="leading-relaxed">{exp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* 3. NATURAL & PROFESSIONAL VERSIONS (2-Column Grid) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          {/* Natural Version */}
                          <div className="p-4 rounded-2xl bg-slate-950 border border-blue-800/40 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-mono text-blue-400 uppercase font-bold flex items-center gap-1.5">
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>NATURAL CONVERSATIONAL:</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyText(correctionResult.naturalVersion, 'corr_nat')}
                                className="text-[10px] font-mono text-slate-400 hover:text-white"
                              >
                                {copiedId === 'corr_nat' ? '✓ Copied' : 'Copy'}
                              </button>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                              &ldquo;{correctionResult.naturalVersion}&rdquo;
                            </p>
                          </div>

                          {/* Professional Version */}
                          <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-800/40 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-mono text-indigo-400 uppercase font-bold flex items-center gap-1.5">
                                <Briefcase className="w-3.5 h-3.5" />
                                <span>PROFESSIONAL / EXECUTIVE:</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyText(correctionResult.professionalVersion, 'corr_prof')}
                                className="text-[10px] font-mono text-slate-400 hover:text-white"
                              >
                                {copiedId === 'corr_prof' ? '✓ Copied' : 'Copy'}
                              </button>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                              &ldquo;{correctionResult.professionalVersion}&rdquo;
                            </p>
                          </div>
                        </div>

                        {/* 4. Detected Mistakes & Tracking Pill */}
                        {correctionResult.detectedMistakes.length > 0 && (
                          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold flex items-center gap-1.5">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>Tracked Mistakes in this sentence:</span>
                              </span>
                              <span className="text-[10px] font-mono text-emerald-400">
                                ✓ Auto-saved to &ldquo;My Common Mistakes&rdquo;
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {correctionResult.detectedMistakes.map((dm) => (
                                <div
                                  key={dm.id}
                                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-mono text-[10px] uppercase font-bold text-cyan-400">
                                      {dm.categoryLabel}
                                    </span>
                                    <span className="text-rose-400 line-through text-[11px]">
                                      {dm.originalSnippet}
                                    </span>
                                  </div>
                                  <div className="text-emerald-300 font-bold text-xs">
                                    → {dm.correctedSnippet}
                                  </div>
                                  <p className="text-[11px] text-slate-400 pt-0.5">
                                    {dm.supportiveTip}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Encouragement Note */}
                        <div className="p-3.5 rounded-2xl bg-blue-950/20 border border-blue-800/30 text-xs font-sans text-blue-300 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                          <span>{correctionResult.encouragementNote}</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* ========================================================================= */}
                {/* SUB-TAB 2: MY COMMON MISTAKES (PRIORITIZED FOCUS) */}
                {/* ========================================================================= */}
                {journalSubTab === 'mistakes' && (
                  <div className="space-y-6">
                    {/* Tone & Philosophy Card */}
                    <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/30 space-y-2">
                      <div className="flex items-center gap-2 text-white font-bold font-display text-base">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                        <span>Supportive Error Analytics: Focus on High-Frequency Habits</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Rather than studying random grammar textbooks, this system pinpoints your personal speech habits (such as tense shifts or extra prepositions like &ldquo;discuss about&rdquo;). Master these patterns one by one to elevate your speaking confidence.
                      </p>
                    </div>

                    {/* 8 Mistake Categories Tally Grid (Ordered by Priority) */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-400 uppercase font-bold tracking-wider">
                          Recurring Mistake Patterns (Prioritized by Occurrence)
                        </span>
                        <span className="text-[11px] font-mono text-cyan-400">
                          {allMistakes.reduce((acc, m) => acc + m.occurrenceCount, 0)} Total Occurrences
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {prioritizedCategories.map((catMeta) => {
                          const count = mistakeCategoryCounts[catMeta.category] || 0;
                          const isTop = count > 0 && count === Math.max(...Object.values(mistakeCategoryCounts));

                          return (
                            <div
                              key={catMeta.category}
                              className={`p-4 rounded-2xl border text-left transition space-y-2 ${
                                count > 0
                                  ? 'bg-slate-900/90 border-slate-800'
                                  : 'bg-slate-950/60 border-slate-900 opacity-60'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                                  {catMeta.category.replace('_', ' ')}
                                </span>
                                {isTop && (
                                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold">
                                    TOP FOCUS
                                  </span>
                                )}
                              </div>

                              <div className="text-2xl font-bold font-display text-white">
                                {count} <span className="text-xs text-slate-500 font-normal">times</span>
                              </div>

                              <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                                {catMeta.shortDesc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Filter toolbar for Mistakes Feed */}
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {['all', 'unresolved', 'resolved', 'tense', 'prepositions', 'articles', 'vocabulary', 'sentence_structure'].map((filterKey) => (
                          <button
                            key={filterKey}
                            type="button"
                            onClick={() => setMistakesCategoryFilter(filterKey)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition capitalize ${
                              mistakesCategoryFilter === filterKey
                                ? 'bg-amber-600 text-white shadow-md'
                                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                          >
                            {filterKey.replace('_', ' ')}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setJournalSubTab('correction')}
                        className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        <span>+ Test Sentence in Correction Studio</span>
                      </button>
                    </div>

                    {/* Tracked Mistakes List */}
                    {filteredMistakes.length === 0 ? (
                      <div className="p-12 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-4">
                        <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-white">
                            {allMistakes.length === 0 ? 'No Common Mistakes Logged Yet' : 'No Mistakes Matching Filter'}
                          </h3>
                          <p className="text-xs text-slate-400 max-w-md mx-auto">
                            {allMistakes.length === 0
                              ? 'Enter sentences into the AI English Correction Studio. Detected grammar slips will automatically be cataloged here to build personalized drills.'
                              : 'Adjust your filter to view all tracked mistakes.'}
                          </p>
                        </div>
                        <button
                          onClick={() => setJournalSubTab('correction')}
                          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl text-xs font-mono font-bold"
                        >
                          Open Correction Studio
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredMistakes.map((mistake) => (
                          <div
                            key={mistake.id}
                            className={`p-6 rounded-3xl border transition space-y-3 ${
                              mistake.resolved
                                ? 'bg-slate-950/60 border-slate-900 opacity-60'
                                : 'bg-slate-900/90 border-slate-800'
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                  {mistake.category.replace('_', ' ')}
                                </span>
                                <span className="text-xs font-mono text-slate-400">
                                  Seen {mistake.occurrenceCount} {mistake.occurrenceCount === 1 ? 'time' : 'times'}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleToggleMistakeResolved(mistake.id)}
                                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 border ${
                                    mistake.resolved
                                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                                  }`}
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>{mistake.resolved ? 'Mastered ✓' : 'Mark Mastered'}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteMistake(mistake.id)}
                                  title="Delete mistake"
                                  className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Comparison */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1">
                                <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">
                                  Identified Slip:
                                </span>
                                <p className="text-rose-300 font-mono font-semibold">
                                  &ldquo;{mistake.originalSnippet}&rdquo;
                                </p>
                              </div>

                              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                                  Recommended Form:
                                </span>
                                <p className="text-emerald-300 font-mono font-bold">
                                  &ldquo;{mistake.correctedSnippet}&rdquo;
                                </p>
                              </div>
                            </div>

                            {/* Explanation */}
                            <p className="text-xs text-slate-300 leading-relaxed font-sans">
                              <b className="text-slate-200">Why: </b>{mistake.explanation}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ========================================================================= */}
                {/* SUB-TAB 3: SPEECH SESSIONS ARCHIVE */}
                {/* ========================================================================= */}
                {journalSubTab === 'archive' && (
                  <div className="space-y-6">
                    {/* Metrics Summary Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                        <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">
                          TOTAL SESSIONS
                        </span>
                        <div className="text-2xl font-bold font-display text-white">
                          {allEntries.length}
                        </div>
                        <p className="text-[11px] text-slate-400">Speech logs recorded</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                        <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                          AVG CONFIDENCE
                        </span>
                        <div className="text-2xl font-bold font-display text-amber-400 flex items-center gap-1.5">
                          <span>{avgConfidence}</span>
                          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        </div>
                        <p className="text-[11px] text-slate-400">Out of 5.0 rating scale</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                          SPEAKING TIME
                        </span>
                        <div className="text-2xl font-bold font-display text-cyan-400">
                          {totalMinutes}m
                        </div>
                        <p className="text-[11px] text-slate-400">Total verbal delivery</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                          WORDS CATALOGED
                        </span>
                        <div className="text-2xl font-bold font-display text-emerald-400">
                          {allNewWords.length}
                        </div>
                        <p className="text-[11px] text-slate-400">New active vocabulary</p>
                      </div>
                    </div>

                    {/* Filter & Search Toolbar */}
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      {/* Mode Filter Pills */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setJournalFilterMode('all')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                            journalFilterMode === 'all'
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                          }`}
                        >
                          All Modes ({allEntries.length})
                        </button>
                        {SPEAKING_MODES_CONFIG.map((m) => {
                          const count = allEntries.filter((e) => e.modeId === m.id).length;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => setJournalFilterMode(m.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                                journalFilterMode === m.id
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                          >
                            {m.title.replace(/^\d+\.\s*/, '')} ({count})
                          </button>
                        );
                      })}
                    </div>

                    {/* Search box */}
                    <div className="relative w-full md:w-64">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search reflections, words..."
                        value={journalSearchQuery}
                        onChange={(e) => setJournalSearchQuery(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Journal Entries List */}
                  {filteredEntries.length === 0 ? (
                    <div className="p-12 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-4">
                      <Mic className="w-12 h-12 text-slate-600 mx-auto" />
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-white">
                          {allEntries.length === 0 ? 'No Speaking Sessions Recorded Yet' : 'No Matching Journal Entries'}
                        </h3>
                        <p className="text-xs text-slate-400 max-w-md mx-auto">
                          {allEntries.length === 0
                            ? 'Select one of the 8 practice modes in the Speaking Studio, run your timed drill, and log your reflection.'
                            : 'Try adjusting your mode filter or search query.'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleTabChange('speaking')}
                        className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-mono font-bold shadow-lg shadow-blue-500/20"
                      >
                        Open Speaking Studio
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {filteredEntries.map((entry) => {
                        const modeConfig = SPEAKING_MODES_CONFIG.find((m) => m.id === entry.modeId);
                        const rating = entry.confidenceScore || entry.selfRating || 4;

                        return (
                          <div
                            key={entry.id}
                            className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-slate-700 transition"
                          >
                            {/* Entry Header */}
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                    {modeConfig?.title || entry.promptCategory || 'Speaking Practice'}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400">
                                    {entry.dateStr}
                                  </span>
                                </div>
                                <h4 className="text-lg font-bold font-display text-white">
                                  {entry.title}
                                </h4>
                              </div>

                              {/* Badges & Actions */}
                              <div className="flex items-center gap-3">
                                {/* Confidence Score */}
                                <div className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                                  <span className="text-[10px] font-mono text-slate-400 mr-1">CONFIDENCE:</span>
                                  <div className="flex items-center gap-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`w-3.5 h-3.5 ${rating >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs font-mono font-bold text-amber-400 ml-1">
                                    {rating}/5
                                  </span>
                                </div>

                                {/* Duration Badge */}
                                <div className="hidden sm:flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                                  <span>{entry.durationSeconds || 60}s</span>
                                </div>

                                {/* Fillers Count */}
                                {entry.fillerWordCount !== undefined && (
                                  <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 font-mono text-xs text-rose-400">
                                    {entry.fillerWordCount} Fillers
                                  </div>
                                )}

                                {/* Delete button */}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteJournalEntry(entry.id)}
                                  title="Delete this journal entry"
                                  className="p-2 bg-slate-950 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/40 rounded-xl text-slate-500 hover:text-rose-400 transition"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* 1. What I Said */}
                            {entry.whatISaid ? (
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                                  What I Said / Key Delivery:
                                </span>
                                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
                                  {entry.whatISaid}
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                                  Reflection Note:
                                </span>
                                <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
                                  &ldquo;{entry.reflectionNotes}&rdquo;
                                </p>
                              </div>
                            )}

                            {/* 2. What I Struggled With & Mistakes Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {entry.whatIStruggledWith && (
                                <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold flex items-center gap-1.5">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    <span>What I Struggled With:</span>
                                  </span>
                                  <p className="text-xs text-slate-300 leading-relaxed">
                                    {entry.whatIStruggledWith}
                                  </p>
                                </div>
                              )}

                              {entry.mistakesNoticed && (
                                <div className="p-3.5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-1">
                                  <span className="text-[10px] font-mono text-rose-400 uppercase font-bold flex items-center gap-1.5">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    <span>Mistakes Noticed:</span>
                                  </span>
                                  <p className="text-xs text-slate-300 leading-relaxed">
                                    {entry.mistakesNoticed}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* 3. New Words Used */}
                            {entry.newWordsUsed && (
                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                                  New Words:
                                </span>
                                {entry.newWordsUsed
                                  .split(',')
                                  .map((w) => w.trim())
                                  .filter(Boolean)
                                  .map((word, wIdx) => (
                                    <span
                                      key={wIdx}
                                      className="px-2.5 py-0.5 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-mono"
                                    >
                                      {word}
                                    </span>
                                  ))}
                              </div>
                            )}

                            {/* 4. Audio Playback if Available */}
                            {entry.audioBlobUrl && (
                              <div className="pt-2 border-t border-slate-800/60 flex items-center gap-3">
                                <span className="text-[10px] font-mono text-blue-400 uppercase font-bold shrink-0 flex items-center gap-1">
                                  <Mic className="w-3.5 h-3.5" />
                                  <span>Voice Playback:</span>
                                </span>
                                <audio controls src={entry.audioBlobUrl} className="h-8 w-full sm:w-80" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  </div>
                )}
              </div>
            );
          })()}

          {/* ========================================================================= */}
          {/* 13. PROGRESS OVERVIEW TAB */}
          {/* ========================================================================= */}
          {activeTab === 'progress' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    <span>Holistic Communication Mastery &amp; Progress</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Comprehensive 10-dimension proficiency breakdown, next best actions, and specialized track completion.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl font-bold">
                    {metrics.currentLevel}
                  </span>
                  <div className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1.5 rounded-xl font-bold">
                    {metrics.overallReadiness}% Overall Index
                  </div>
                </div>
              </div>

              {/* NEXT BEST ACTION CARD */}
              <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-amber-950/20 border border-amber-500/30 p-6 backdrop-blur-xl shadow-xl">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600" />
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                        <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>RECOMMENDED NEXT BEST ACTION</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        Weakest: <b className="text-amber-400">{metrics.weakestSkill.name}</b> ({metrics.weakestSkill.score}%)
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-white">
                      {metrics.nextBestAction.activityTitle}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {metrics.nextBestAction.activityDescription}
                    </p>
                  </div>
                  <button
                    onClick={() => handleExecuteNextBestAction(metrics.nextBestAction)}
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition"
                  >
                    <span>Start Activity</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>
                </div>
              </section>

              {/* 10-DIMENSION SKILL GRID */}
              <section className="space-y-4">
                <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span>10 Communication Readiness Dimensions</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.values(metrics.tenDimensions).map((dimension) => (
                    <div
                      key={dimension.id}
                      className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700/60">
                              {renderDimensionIcon(dimension.iconName, 'w-4 h-4')}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold font-display text-white">
                                {dimension.name}
                              </h4>
                              <span className="text-[10px] font-mono text-slate-400">
                                {dimension.category}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold font-display text-white block">
                              {dimension.score}%
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {dimension.badge}
                            </span>
                          </div>
                        </div>

                        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                          <div
                            className="h-full bg-gradient-to-r from-[#006cd2] to-cyan-400 rounded-full transition-all"
                            style={{ width: `${Math.max(5, dimension.score)}%` }}
                          />
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {dimension.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-400">{dimension.totalCompleted} Completed</span>
                        <button
                          onClick={() => {
                            if (dimension.targetTab === 'grammar') handleTabChange('grammar');
                            else if (dimension.targetTab === 'vocabulary') handleTabChange('vocabulary');
                            else if (dimension.targetTab === 'speaking') handleTabChange('speaking');
                            else if (dimension.targetTab === 'listening') handleTabChange('listening');
                            else if (dimension.targetTab === 'technical') handleTabChange('technical');
                            else if (dimension.targetTab === 'interview') handleTabChange('interview');
                            else if (dimension.targetTab === 'professional') handleTabChange('professional');
                            else handleTabChange('daily');
                          }}
                          className="text-cyan-400 hover:text-cyan-300 font-bold inline-flex items-center gap-1"
                        >
                          <span>Practice</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tracks Curriculum Directory */}
              <section className="space-y-4">
                <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>Communication Curriculum Tracks</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {TRAINING_TRACKS.map((track) => (
                    <div
                      key={track.id}
                      className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                            {track.category} TRACK
                          </span>
                          <span className="text-xs font-mono text-slate-500">
                            ~{track.estimatedHours} Hours
                          </span>
                        </div>

                        <h3 className="text-lg font-bold font-display text-white">
                          {track.title}
                        </h3>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {track.shortDescription}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-400">
                          {track.totalModules} Core Lessons
                        </span>
                        <button
                          onClick={() => {
                            if (track.id === 'grammar') handleTabChange('grammar');
                            else if (track.id === 'vocabulary') handleTabChange('vocabulary');
                            else if (track.id === 'speaking') handleTabChange('speaking');
                            else if (track.id === 'listening') handleTabChange('listening');
                            else if (track.id === 'technical') handleTabChange('technical');
                            else if (track.id === 'interview') handleTabChange('interview');
                            else if (track.id === 'professional') handleTabChange('professional');
                            else handleTabChange('daily');
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-[#006cd2] text-xs font-mono text-slate-200 hover:text-white transition"
                        >
                          Open Track
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function SaveJournalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

export default function EnglishCareerTrainerPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-sm text-slate-400">
          <div className="flex items-center gap-3 bg-slate-900 px-6 py-4 rounded-2xl border border-slate-800 shadow-2xl">
            <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
            <span>Loading English &amp; Career Communication Trainer...</span>
          </div>
        </div>
      }
    >
      <EnglishCareerContent />
    </React.Suspense>
  );
}
