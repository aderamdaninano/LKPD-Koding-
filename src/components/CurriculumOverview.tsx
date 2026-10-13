import React from 'react';
import { LKPD_METADATA } from '../data/lkpdData';
import { 
  Sparkles, 
  Target, 
  Compass, 
  CheckCircle, 
  ArrowRight, 
  Layers, 
  BookMarked, 
  HelpCircle 
} from 'lucide-react';
import { TabKey } from '../types/lkpd';

interface CurriculumOverviewProps {
  onStartLearning: () => void;
  onSelectTab: (tab: TabKey) => void;
}

export const CurriculumOverview: React.FC<CurriculumOverviewProps> = ({
  onStartLearning,
  onSelectTab
}) => {
  return (
    <div className="space-y-6">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 border border-indigo-900/50 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mata Pelajaran: {LKPD_METADATA.subject}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            Mengenal Pemrograman Python: Variabel, Tipe Data, & Perulangan
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
            Selamat datang di Lembar Kerja Peserta Didik (LKPD) Interaktif. Modul ini dirancang khusus bagi siswa Kelas X SMA/SMK Fase E untuk memahami logika dasar koding menggunakan Python dan mengaitkannya dengan prinsip kerja sistem Kecerdasan Artifisial (Artificial Intelligence).
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onStartLearning}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition group"
            >
              <span>Mulai Kegiatan 1 (Stimulus AI)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="text-xs text-slate-400 flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>Alokasi Waktu: {LKPD_METADATA.timeAllocation}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Capaian Pembelajaran & Tujuan Pembelajaran */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CP & TP */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Capaian & Tujuan Pembelajaran</h3>
              <p className="text-xs text-slate-400">Target kompetensi Kurikulum Merdeka Fase E</p>
            </div>
          </div>

          <div className="mb-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <div className="font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
              <BookMarked className="w-3.5 h-3.5" />
              Capaian Pembelajaran (CP)
            </div>
            {LKPD_METADATA.coreCompetencies.cp}
          </div>

          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-slate-200">Tujuan Pembelajaran (TP):</div>
            {LKPD_METADATA.coreCompetencies.tp.map((tp, index) => (
              <div key={index} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{tp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Profil Pelajar Pancasila & Petunjuk Penggunaan */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Dimensi Profil Pelajar Pancasila</h3>
                <p className="text-xs text-slate-400">Karakter yang dikembangkan dalam aktivitas ini</p>
              </div>
            </div>

            <div className="space-y-3">
              {LKPD_METADATA.coreCompetencies.ppp.map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
                  <span className="font-bold text-emerald-300 mr-1.5">{p.trait}:</span>
                  <span className="text-slate-300">{p.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-sm text-white mb-3">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Petunjuk Pengerjaan LKPD Digital</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300">
              <li>Lengkapi Identitas Siswa/Kelompok dengan menekan tombol profil di pojok kanan atas.</li>
              <li>Ikuti setiap kegiatan berurutan: mulai dari Stimulus AI hingga Kuis Evaluasi.</li>
              <li>Manfaatkan simulator interaktif (Kotak Memori, Loop Stepper, & Python Playground) untuk menguji hipotesismu.</li>
              <li>Setelah menyelesaikan seluruh kegiatan, cetak atau simpan laporan LKPD sebagai bukti tugas belajar.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Roadmap Modul Navigasi */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">Alur 5 Kegiatan Pembelajaran Interaktif</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { tab: 'stimulus' as TabKey, num: '1', title: 'Stimulus AI', desc: 'Menghubungkan memori Python dengan AI' },
            { tab: 'variabel' as TabKey, num: '2', title: 'Variabel & Data', desc: 'Memory Box & Tantangan Detektif' },
            { tab: 'perulangan' as TabKey, num: '3', title: 'Perulangan', desc: 'Loop Visualizer & Debugging' },
            { tab: 'proyek' as TabKey, num: '4', title: 'Mini Proyek', desc: 'Playground Koding Monitoring AI' },
            { tab: 'asesmen' as TabKey, num: '5', title: 'Kuis & Refleksi', desc: 'Evaluasi Formatif & Refleksi 3-2-1' },
          ].map((item) => (
            <button
              key={item.tab}
              onClick={() => onSelectTab(item.tab)}
              className="text-left p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 transition group"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mb-2 group-hover:bg-emerald-500 group-hover:text-slate-950 transition">
                {item.num}
              </div>
              <div className="font-semibold text-white text-xs mb-1 group-hover:text-emerald-300 transition">
                {item.title}
              </div>
              <div className="text-[11px] text-slate-400 leading-tight">
                {item.desc}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
