import React from 'react';
import { TabKey, StudentProfile } from '../types/lkpd';
import { 
  BookOpen, 
  Cpu, 
  Boxes, 
  Repeat, 
  Terminal, 
  CheckCircle2, 
  Printer, 
  GraduationCap, 
  UserCircle2 
} from 'lucide-react';

interface HeaderNavProps {
  currentTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  student: StudentProfile;
  onOpenProfileModal: () => void;
  onOpenTeacherGuide: () => void;
  onPrint: () => void;
  progressPercent: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentTab,
  onSelectTab,
  student,
  onOpenProfileModal,
  onOpenTeacherGuide,
  onPrint,
  progressPercent
}) => {
  const navItems: { key: TabKey; label: string; number: string; icon: any }[] = [
    { key: 'panduan', label: 'Petunjuk & CP', number: '0', icon: BookOpen },
    { key: 'stimulus', label: '1. Stimulus AI', number: '1', icon: Cpu },
    { key: 'variabel', label: '2. Variabel & Data', number: '2', icon: Boxes },
    { key: 'perulangan', label: '3. Perulangan', number: '3', icon: Repeat },
    { key: 'proyek', label: '4. Mini Proyek', number: '4', icon: Terminal },
    { key: 'asesmen', label: '5. Kuis & Refleksi', number: '5', icon: CheckCircle2 }
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-lg">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-md">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-emerald-400 font-mono font-bold text-lg">
              🐍
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Fase E • Kelas X
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hidden sm:inline-block">
                Kurikulum Merdeka
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              LKPD Digital: Koding & Kecerdasan Artifisial
            </h1>
          </div>
        </div>

        {/* Action Controls & Student info badge */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Student Badge / Click to edit */}
          <button
            onClick={onOpenProfileModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs text-slate-200 transition"
            title="Klik untuk mengisi / mengedit data identitas siswa"
          >
            <UserCircle2 className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <div className="font-semibold text-white truncate max-w-[120px] sm:max-w-[150px]">
                {student.fullName || 'Identitas Siswa'}
              </div>
              <div className="text-[10px] text-slate-400">
                {student.className ? `${student.className} • Absen ${student.studentNumber || '-'}` : 'Klik untuk isi identitas'}
              </div>
            </div>
          </button>

          {/* Teacher Guide modal trigger */}
          <button
            onClick={onOpenTeacherGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/50 text-indigo-300 hover:text-indigo-200 text-xs font-medium transition"
            title="Rubrik Penilaian & Panduan Guru"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Panduan Guru</span>
          </button>

          {/* Print/Download LKPD */}
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition"
            title="Cetak atau Simpan LKPD ke format PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak LKPD</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950/80 border-t border-slate-800/80 px-4 sm:px-6 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-400 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-slate-300">Kemajuan LKPD:</span>
            <div className="w-32 sm:w-48 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-emerald-400 font-mono text-[11px] font-bold">{progressPercent}%</span>
          </div>

          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Topik: Pemrograman Python (Variabel, Tipe Data, Perulangan)
          </span>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto no-scrollbar border-t border-slate-800">
        <nav className="flex space-x-1 py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onSelectTab(item.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
