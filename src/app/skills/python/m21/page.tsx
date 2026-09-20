'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  CAPSTONE_PROJECT_OPTIONS,
  CAPSTONE_STAGES,
  CAPSTONE_RUBRIC,
  CAPSTONE_CHECKLIST,
  CapstoneProjectOption,
} from '@/data/pythonCapstoneData';
import {
  getPythonModuleById,
  getAllPythonModules,
} from '@/data/pythonSkillsData';
import {
  fetchUserDynamicData,
  saveUserDynamicData,
  UserDynamicData,
  ModuleProgressRecord,
} from '@/lib/dynamicDatabase';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  Trophy,
  Award,
  BookOpen,
  Code2,
  Database,
  Layers,
  Terminal,
  ExternalLink,
  GitBranch,
  Check,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Clock,
  ListOrdered,
} from 'lucide-react';

export default function PythonCapstonePage() {
  const router = useRouter();
  const { userData, loading } = useAuth();
  const [dynamicData, setDynamicData] = useState<UserDynamicData | null>(null);

  // Active Tab: 'projects' | 'stages' | 'rubric' | 'checklist' | 'submit'
  const [activeTab, setActiveTab] = useState<'projects' | 'stages' | 'rubric' | 'checklist' | 'submit'>('projects');

  // Selected project option
  const [selectedProjectId, setSelectedProjectId] = useState<string>('expense-tracker');

  // Interactive Checklist State (stored in user profile)
  const [checklistCompleted, setChecklistCompleted] = useState<Record<string, boolean>>({});

  // Submission Form State
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [architectureNotes, setArchitectureNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const allModules = useMemo(() => getAllPythonModules(), []);

  useEffect(() => {
    if (!loading && !userData) {
      router.replace('/login');
    }
  }, [userData, loading, router]);

  // Load user dynamic data
  useEffect(() => {
    let mounted = true;
    async function loadData() {
      if (userData?.email) {
        const d = await fetchUserDynamicData(userData.email);
        if (!mounted) return;
        setDynamicData(d);

        // Load existing capstone state if present
        const capstoneRec = d.progress?.python?.m21 || d.capstone;
        if (capstoneRec?.selectedProject) {
          setSelectedProjectId(capstoneRec.selectedProject);
        }
        if (capstoneRec?.checklist) {
          setChecklistCompleted(capstoneRec.checklist);
        }
        if (capstoneRec?.githubUrl) {
          setGithubUrl(capstoneRec.githubUrl);
        }
        if (capstoneRec?.demoUrl) {
          setDemoUrl(capstoneRec.demoUrl);
        }
        if (capstoneRec?.status === 'completed' || capstoneRec?.assignmentPassed) {
          setSubmissionSuccess(true);
        }
      }
    }
    loadData();

    const handleUpdate = (e: any) => {
      if (e?.detail?.data && mounted) {
        const d = e.detail.data;
        setDynamicData(d);
        const capstoneRec = d.progress?.python?.m21 || d.capstone;
        if (capstoneRec?.selectedProject) setSelectedProjectId(capstoneRec.selectedProject);
        if (capstoneRec?.checklist) setChecklistCompleted(capstoneRec.checklist);
        if (capstoneRec?.githubUrl) setGithubUrl(capstoneRec.githubUrl);
        if (capstoneRec?.demoUrl) setDemoUrl(capstoneRec.demoUrl);
        if (capstoneRec?.status === 'completed' || capstoneRec?.assignmentPassed) setSubmissionSuccess(true);
      } else {
        loadData();
      }
    };

    window.addEventListener('levelupdev:dynamic_update', handleUpdate);
    return () => {
      mounted = false;
      window.removeEventListener('levelupdev:dynamic_update', handleUpdate);
    };
  }, [userData]);

  // Check if Module 20 is completed (sequential unlock condition for M21)
  const isModule21Unlocked = useMemo(() => {
    if (!userData) return false;
    const pyProgress = dynamicData?.progress?.python || {};
    const m20 = pyProgress['m20'] || pyProgress['module-20'];
    return !!m20?.assignmentPassed || m20?.status === 'completed';
  }, [userData, dynamicData]);

  const selectedProject = useMemo(() => {
    return CAPSTONE_PROJECT_OPTIONS.find((p) => p.id === selectedProjectId) || CAPSTONE_PROJECT_OPTIONS[0];
  }, [selectedProjectId]);

  const checklistCount = useMemo(() => {
    return Object.values(checklistCompleted).filter(Boolean).length;
  }, [checklistCompleted]);

  const isChecklistComplete = checklistCount >= CAPSTONE_CHECKLIST.length;

  const toggleChecklist = async (id: string) => {
    const updated = {
      ...checklistCompleted,
      [id]: !checklistCompleted[id],
    };
    setChecklistCompleted(updated);

    if (userData?.email && dynamicData) {
      const updatedDynamic = {
        ...dynamicData,
        capstone: {
          ...(dynamicData.capstone || {}),
          checklist: updated,
          selectedProject: selectedProjectId,
        },
      };
      await saveUserDynamicData(userData.email, updatedDynamic);
    }
  };

  const handleSelectProject = async (projId: string) => {
    setSelectedProjectId(projId);
    if (userData?.email && dynamicData) {
      const updatedDynamic = {
        ...dynamicData,
        capstone: {
          ...(dynamicData.capstone || {}),
          selectedProject: projId,
          checklist: checklistCompleted,
        },
      };
      await saveUserDynamicData(userData.email, updatedDynamic);
    }
  };

  const handleSubmitCapstone = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!githubUrl.trim()) {
      setErrorMessage('Please provide a valid GitHub repository URL.');
      return;
    }

    if (!githubUrl.includes('github.com')) {
      setErrorMessage('Repository URL must be a valid GitHub link (e.g., https://github.com/username/project).');
      return;
    }

    if (checklistCount < 8) {
      setErrorMessage('Please verify and complete at least 8 out of 10 items on the verification checklist before submitting.');
      return;
    }

    setSubmitting(true);

    try {
      if (userData?.email && dynamicData) {
        const now = new Date().toISOString();
        const capstoneRecord: ModuleProgressRecord = {
          moduleId: 'm21',
          status: 'completed',
          topicsCompleted: [
            'capstone-project-selection',
            'capstone-architecture-design',
            'capstone-implementation-testing',
            'capstone-final-submission',
          ],
          assignmentPassed: true,
          assignmentScore: 100,
          completedAt: now,
          selectedProject: selectedProjectId,
          githubUrl: githubUrl.trim(),
          demoUrl: demoUrl.trim(),
          checklist: checklistCompleted,
        };

        const updatedProgress = {
          ...(dynamicData.progress || {}),
          python: {
            ...(dynamicData.progress?.python || {}),
            m21: capstoneRecord,
            'module-21': capstoneRecord,
          },
        };

        const updatedDynamic = {
          ...dynamicData,
          progress: updatedProgress,
          capstone: {
            selectedProject: selectedProjectId,
            githubUrl: githubUrl.trim(),
            demoUrl: demoUrl.trim(),
            notes: architectureNotes,
            checklist: checklistCompleted,
            submittedAt: now,
            completed: true,
          },
        };

        await saveUserDynamicData(userData.email, updatedDynamic);
        setDynamicData(updatedDynamic);
        setSubmissionSuccess(true);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to submit capstone. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono text-sm">
        <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-slate-800">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-300">Loading Capstone Workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-emerald-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] -left-40 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-[70%] -right-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 pb-mobile-nav">
        {/* Top Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href="/skills/python"
              className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span>Back to Python Trail</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                Checklist: <strong className="text-emerald-400">{checklistCount}/10 Verified</strong>
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
                <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-bold">Module 21 • Capstone</span>
              </div>
            </div>
          </div>
        </header>

        {/* Lock Warning if Previous Modules Incomplete */}
        {!isModule21Unlocked && (
          <div className="max-w-5xl mx-auto w-full px-4 pt-6">
            <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-4 flex items-center gap-3 text-xs font-mono text-amber-300">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong>Sequential Learning Lock:</strong> Complete Modules 1 through 20 and pass their module assignments to officially certify and submit your Capstone project. You can still preview all project tracks and stage guides below!
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto w-full px-4 pt-8 pb-4 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MODULE 21 • CULMINATING MILESTONE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Python <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Capstone Project</span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Synthesize all 20 modules into an enterprise-grade, portfolio-ready application. Choose from 5 industry tracks, build across 12 development stages, pass automated checks, and earn your Master Python Certification.
          </p>

          {/* Success Banner if already submitted */}
          {submissionSuccess && (
            <div className="max-w-2xl mx-auto bg-emerald-950/60 border border-emerald-500/60 rounded-2xl p-4 text-center space-y-2 mt-4 shadow-xl shadow-emerald-950/40">
              <div className="flex items-center justify-center gap-2 text-emerald-300 font-display font-bold text-lg">
                <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />
                <span>Capstone Project Verified & Complete!</span>
              </div>
              <p className="text-xs font-mono text-emerald-400">
                Congratulations! You have completed all 21 modules of the LevelUpDev Python Skills Trail.
              </p>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="max-w-5xl mx-auto w-full px-4 pt-4 pb-2">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition ${
                activeTab === 'projects'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>1. Project Options</span>
            </button>

            <button
              onClick={() => setActiveTab('stages')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition ${
                activeTab === 'stages'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ListOrdered className="w-4 h-4" />
              <span>2. 12-Stage Guide</span>
            </button>

            <button
              onClick={() => setActiveTab('rubric')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition ${
                activeTab === 'rubric'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>3. Evaluation Rubric</span>
            </button>

            <button
              onClick={() => setActiveTab('checklist')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition ${
                activeTab === 'checklist'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>4. Verification Checklist ({checklistCount}/10)</span>
            </button>

            <button
              onClick={() => setActiveTab('submit')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition ${
                activeTab === 'submit'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <GitBranch className="w-4 h-4" />
              <span>5. Submit & Certify</span>
            </button>
          </div>
        </div>

        {/* Tab Content Area */}
        <main className="max-w-5xl mx-auto w-full py-6 px-4 sm:px-6 flex-1">
          {/* TAB 1: PROJECT OPTIONS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                  Select Your Capstone Project Track
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-sans">
                  Choose one of the 5 industry tracks designed to showcase practical software engineering competence.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {CAPSTONE_PROJECT_OPTIONS.map((proj) => {
                  const isSelected = selectedProjectId === proj.id;
                  return (
                    <div
                      key={proj.id}
                      onClick={() => handleSelectProject(proj.id)}
                      className={`cursor-pointer rounded-3xl p-6 border backdrop-blur-xl transition-all duration-300 relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-slate-900/95 border-emerald-500/60 shadow-xl shadow-emerald-950/40 ring-2 ring-emerald-500/40'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                            {proj.category}
                          </span>
                          {isSelected && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                              <Check className="w-3.5 h-3.5" /> Selected
                            </span>
                          )}
                        </div>

                        <h3 className="font-display text-xl font-bold text-white">
                          {proj.title}
                        </h3>

                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {proj.description}
                        </p>

                        <div className="space-y-1.5 pt-2">
                          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Key Features:</span>
                          <ul className="space-y-1 text-xs text-slate-300">
                            {proj.keyFeatures.slice(0, 3).map((feat, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-emerald-400 shrink-0">✓</span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {proj.recommendedTech.slice(0, 3).map((tech, i) => (
                            <span key={i} className="text-[10px] font-mono bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-slate-400">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <button
                          type="button"
                          className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl transition ${
                            isSelected
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-800 text-slate-300 hover:text-white'
                          }`}
                        >
                          {isSelected ? 'Active Track' : 'Choose Track'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Track Details Callout */}
              <div className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <Terminal className="w-4 h-4" />
                  <span>Architecture Guide for: {selectedProject.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong>Suggested Architecture:</strong> {selectedProject.suggestedArchitecture}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => setActiveTab('stages')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono font-bold shadow-lg shadow-emerald-600/30 transition"
                  >
                    <span>Proceed to 12-Stage Roadmap</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 12-STAGE ROADMAP */}
          {activeTab === 'stages' && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                  12-Stage Development Roadmap
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-sans">
                  Follow this sequential milestone guide to take your project from design to deployment.
                </p>
              </div>

              <div className="space-y-4">
                {CAPSTONE_STAGES.map((stage) => (
                  <div
                    key={stage.stageNumber}
                    className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 backdrop-blur-xl hover:border-slate-700 transition"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                          {stage.stageNumber}
                        </span>
                        <h3 className="font-display font-bold text-base sm:text-lg text-white">
                          {stage.title}
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                        Milestone {stage.stageNumber} of 12
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 mt-3 font-sans leading-relaxed">
                      {stage.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-3 border-t border-slate-800/60">
                      <div>
                        <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase">Deliverables:</span>
                        <ul className="space-y-1 mt-1 text-xs text-slate-300">
                          {stage.deliverables.map((del, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-400 shrink-0">•</span>
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-amber-400 uppercase">Pro Tip:</span>
                        <p className="text-xs text-slate-300 mt-1 italic font-sans">
                          &quot;{stage.tips}&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => setActiveTab('rubric')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono font-bold shadow-lg shadow-emerald-600/30 transition"
                >
                  <span>Review Evaluation Rubric</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: EVALUATION RUBRIC */}
          {activeTab === 'rubric' && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                  Capstone Evaluation Rubric
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-sans">
                  Submissions are graded across 4 core engineering pillars (25% weight each, 70% passing threshold).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {CAPSTONE_RUBRIC.map((crit) => (
                  <div
                    key={crit.id}
                    className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h3 className="font-display font-bold text-lg text-white">
                        {crit.title}
                      </h3>
                      <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                        {crit.weight}% Weight
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-sans">
                      {crit.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      {crit.criteriaLevels.map((lvl, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-[11px] font-mono font-bold ${
                                lvl.level.includes('Excellent')
                                  ? 'text-emerald-400'
                                  : lvl.level.includes('Proficient')
                                  ? 'text-blue-400'
                                  : 'text-slate-400'
                              }`}
                            >
                              {lvl.level}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 font-sans leading-relaxed">
                            {lvl.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => setActiveTab('checklist')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono font-bold shadow-lg shadow-emerald-600/30 transition"
                >
                  <span>Go to Verification Checklist</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: VERIFICATION CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                  10-Point Capstone Checklist
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-sans">
                  Verify each requirement in your repository before final submission ({checklistCount}/10 completed).
                </p>
              </div>

              {/* Progress Bar */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Checklist Readiness</span>
                  <span className="text-emerald-400 font-bold">{Math.round((checklistCount / 10) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                    style={{ width: `${(checklistCount / 10) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                {CAPSTONE_CHECKLIST.map((item) => {
                  const isChecked = !!checklistCompleted[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklist(item.id)}
                      className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex items-start gap-4 ${
                        isChecked
                          ? 'bg-emerald-950/20 border-emerald-500/50 shadow-md'
                          : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition ${
                          isChecked
                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                            : 'bg-slate-800 border border-slate-700 text-transparent'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                      </div>

                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-slate-200">
                            {item.text}
                          </span>
                          <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-sans">
                          {item.hint}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => setActiveTab('submit')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono font-bold shadow-lg shadow-emerald-600/30 transition"
                >
                  <span>Proceed to Final Submission</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: SUBMISSION FORM */}
          {activeTab === 'submit' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                  Submit Capstone Repository
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-sans">
                  Submit your public GitHub link to complete Module 21 and earn your Python Mastery Certificate.
                </p>
              </div>

              {errorMessage && (
                <div className="bg-rose-950/60 border border-rose-500/50 rounded-2xl p-4 flex items-center gap-3 text-xs font-mono text-rose-300">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form
                onSubmit={handleSubmitCapstone}
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl backdrop-blur-xl"
              >
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
                    Selected Project Track
                  </label>
                  <select
                    value={selectedProjectId}
                    onChange={(e) => handleSelectProject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                  >
                    {CAPSTONE_PROJECT_OPTIONS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
                    GitHub Repository URL <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <GitBranch className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="url"
                      required
                      placeholder="https://github.com/your-username/python-capstone"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
                    Live Demo / Video Link (Optional)
                  </label>
                  <div className="relative">
                    <ExternalLink className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="url"
                      placeholder="https://youtu.be/... or asciinema link"
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
                    Architecture & Implementation Notes (Optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Briefly describe key challenges solved, custom decorators used, and database design..."
                    value={architectureNotes}
                    onChange={(e) => setArchitectureNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold shadow-lg shadow-emerald-600/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying & Submitting Capstone...</span>
                      </>
                    ) : (
                      <>
                        <Trophy className="w-4 h-4 text-amber-300" />
                        <span>Submit Capstone Project for Certification</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
