import React, { useState, useEffect } from 'react';
import { TabKey, LKPDAnswers, StudentProfile } from './types/lkpd';
import { PROJECT_STARTER } from './data/lkpdData';
import { HeaderNav } from './components/HeaderNav';
import { StudentProfileModal } from './components/StudentProfileModal';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { CurriculumOverview } from './components/CurriculumOverview';
import { Activity1Intro } from './components/activities/Activity1Intro';
import { Activity2Variables } from './components/activities/Activity2Variables';
import { Activity3Loops } from './components/activities/Activity3Loops';
import { Activity4Project } from './components/activities/Activity4Project';
import { Activity5Assessment } from './components/activities/Activity5Assessment';
import { PrintView } from './components/PrintView';

const STORAGE_KEY = 'lkpd_python_ai_answers_v1';

const DEFAULT_PROFILE: StudentProfile = {
  fullName: 'Ahmad Faiz',
  className: 'X RPL 1',
  studentNumber: '04',
  groupName: 'Kelompok AI Vision',
  schoolName: 'SMA / SMK Negeri 1',
  date: new Date().toISOString().split('T')[0]
};

const DEFAULT_ANSWERS: LKPDAnswers = {
  studentProfile: DEFAULT_PROFILE,
  stimulusAnswers: {
    q1: 'Variabel dibutuhkan untuk menyimpan data seperti suhu, kelembapan, koordinat gambar, atau bobot model AI agar komputer dapat mengolahnya dalam algoritma.',
    q2: 'Perulangan (loops) membuat komputer otomatis memproses ribuan data email atau gambar tanpa perlu menulis ribuan baris kode secara manual.'
  },
  variableExercises: {
    detectiveMatches: {},
    validNameAnswers: {},
    customVariables: []
  },
  loopExercises: {
    stepperCompleted: false,
    debugChallenge1Fixed: false,
    debugChallenge2Fixed: false,
    loopAnalysisResponse: ''
  },
  projectCode: PROJECT_STARTER,
  projectSubmitted: false,
  projectTestPassed: false,
  quizAnswers: {},
  quizSubmitted: false,
  reflection: {
    learned: '',
    difficulties: '',
    aiIdea: ''
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('panduan');
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState(false);

  // Load from localStorage or default
  const [answers, setAnswers] = useState<LKPDAnswers>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_ANSWERS;
  });

  // Persist changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      // ignore
    }
  }, [answers]);

  // Calculate completion progress percentage
  const calculateProgress = (): number => {
    let score = 0;
    // Profile filled: 10%
    if (answers.studentProfile.fullName && answers.studentProfile.className) score += 10;
    // Stimulus responses: 20%
    if (answers.stimulusAnswers.q1.trim().length > 10) score += 10;
    if (answers.stimulusAnswers.q2.trim().length > 10) score += 10;
    // Detective matches: 15%
    const detCount = Object.keys(answers.variableExercises.detectiveMatches).length;
    score += Math.min(15, detCount * 3);
    // Loop challenges: 15%
    if (answers.loopExercises.stepperCompleted) score += 5;
    if (answers.loopExercises.debugChallenge1Fixed) score += 5;
    if (answers.loopExercises.debugChallenge2Fixed) score += 5;
    // Mini project: 20%
    if (answers.projectTestPassed) score += 20;
    else if (answers.projectSubmitted) score += 10;
    // Quiz / Reflection: 10%
    if (answers.quizSubmitted) score += 5;
    if (answers.reflection.learned || answers.reflection.aiIdea) score += 5;

    return Math.min(100, score);
  };

  const progressPercent = calculateProgress();

  if (isPrintMode) {
    return <PrintView answers={answers} onBack={() => setIsPrintMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header & Navigation */}
      <HeaderNav
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        student={answers.studentProfile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
        onPrint={() => setIsPrintMode(true)}
        progressPercent={progressPercent}
      />

      {/* Main Learning Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'panduan' && (
          <CurriculumOverview
            onStartLearning={() => setActiveTab('stimulus')}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === 'stimulus' && (
          <Activity1Intro
            answers={answers.stimulusAnswers}
            onUpdateAnswers={(key, val) =>
              setAnswers((prev) => ({
                ...prev,
                stimulusAnswers: { ...prev.stimulusAnswers, [key]: val }
              }))
            }
            onNext={() => setActiveTab('variabel')}
          />
        )}

        {activeTab === 'variabel' && (
          <Activity2Variables
            detectiveMatches={answers.variableExercises.detectiveMatches}
            onUpdateDetective={(id, selectedType) =>
              setAnswers((prev) => ({
                ...prev,
                variableExercises: {
                  ...prev.variableExercises,
                  detectiveMatches: {
                    ...prev.variableExercises.detectiveMatches,
                    [id]: selectedType
                  }
                }
              }))
            }
            validNameAnswers={answers.variableExercises.validNameAnswers}
            onUpdateValidName={(name, isValid) =>
              setAnswers((prev) => ({
                ...prev,
                variableExercises: {
                  ...prev.variableExercises,
                  validNameAnswers: {
                    ...prev.variableExercises.validNameAnswers,
                    [name]: isValid
                  }
                }
              }))
            }
            onNext={() => setActiveTab('perulangan')}
          />
        )}

        {activeTab === 'perulangan' && (
          <Activity3Loops
            loopExercises={answers.loopExercises}
            onUpdateLoopExercise={(key, val) =>
              setAnswers((prev) => ({
                ...prev,
                loopExercises: { ...prev.loopExercises, [key]: val }
              }))
            }
            onNext={() => setActiveTab('proyek')}
          />
        )}

        {activeTab === 'proyek' && (
          <Activity4Project
            projectCode={answers.projectCode}
            onUpdateCode={(code) =>
              setAnswers((prev) => ({ ...prev, projectCode: code }))
            }
            projectSubmitted={answers.projectSubmitted}
            projectTestPassed={answers.projectTestPassed}
            onUpdateProjectStatus={(submitted, passed) =>
              setAnswers((prev) => ({
                ...prev,
                projectSubmitted: submitted,
                projectTestPassed: passed
              }))
            }
            onNext={() => setActiveTab('asesmen')}
          />
        )}

        {activeTab === 'asesmen' && (
          <Activity5Assessment
            quizAnswers={answers.quizAnswers}
            onSelectOption={(qId, optKey) =>
              setAnswers((prev) => ({
                ...prev,
                quizAnswers: { ...prev.quizAnswers, [qId]: optKey }
              }))
            }
            quizSubmitted={answers.quizSubmitted}
            onSubmitQuiz={() =>
              setAnswers((prev) => ({ ...prev, quizSubmitted: true }))
            }
            reflection={answers.reflection}
            onUpdateReflection={(field, val) =>
              setAnswers((prev) => ({
                ...prev,
                reflection: { ...prev.reflection, [field]: val }
              }))
            }
            onPrint={() => setIsPrintMode(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            LKPD Digital Interaktif • Mata Pelajaran Koding dan Kecerdasan Artifisial (Fase E Kelas X)
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsTeacherGuideOpen(true)}
              className="hover:text-emerald-400 transition"
            >
              Panduan Guru & Rubrik
            </button>
            <span>•</span>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="hover:text-emerald-400 transition"
            >
              Identitas Siswa
            </button>
            <span>•</span>
            <button
              onClick={() => {
                if (window.confirm('Apakah Anda yakin ingin mereset seluruh isian lembar kerja ini?')) {
                  localStorage.removeItem(STORAGE_KEY);
                  setAnswers(DEFAULT_ANSWERS);
                }
              }}
              className="text-rose-400/80 hover:text-rose-400 transition"
            >
              Reset LKPD
            </button>
          </div>
        </div>
      </footer>

      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={answers.studentProfile}
        onSave={(newProfile) =>
          setAnswers((prev) => ({ ...prev, studentProfile: newProfile }))
        }
      />

      {/* Teacher Guide Modal */}
      <TeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
      />
    </div>
  );
}
