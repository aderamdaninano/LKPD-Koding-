import React from 'react';
import { TEACHER_GUIDE, FORMATIVE_QUIZ, LKPD_METADATA } from '../data/lkpdData';
import { 
  GraduationCap, 
  X, 
  CheckCircle2, 
  BookCheck, 
  Award, 
  Lightbulb,
  FileSpreadsheet
} from 'lucide-react';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl text-slate-100">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/80 sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Panduan Fasilitator Guru & Rubrik Penilaian Asesmen</h3>
              <p className="text-xs text-slate-400">
                Dokumen Resmi Penilaian Kurikulum Merdeka - Mata Pelajaran Koding & Kecerdasan Artifisial Kelas X
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs sm:text-sm">
          {/* Petunjuk Pengelolaan Kelas */}
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 space-y-2">
            <div className="font-bold text-indigo-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Skenario Pembelajaran Berdiferensiasi (2 Pertemuan x 45 Menit)</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs">
              <li><strong>Pertemuan 1 (Kegiatan 1 & 2):</strong> Diskusi stimulus dunia AI & eksplorasi memory box visualizer. Siswa mencoba membuat variabel dengan tipe data berbeda secara mandiri atau berpasangan (Pair Programming).</li>
              <li><strong>Pertemuan 2 (Kegiatan 3, 4, & 5):</strong> Eksplorasi perulangan dengan Loop Stepper visualizer, penuntasan mini proyek koding sistem klasifikasi AI, serta pengerjaan asesmen formatif 5 soal.</li>
            </ul>
          </div>

          {/* Rubrik Penilaian Keterampilan Koding */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Rubrik Asesmen Kinerja Portofolio Koding (Skala 1 - 4)</span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-950 text-slate-300 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3 w-1/4">Aspek Penilaian</th>
                    <th className="p-3">Sangat Baik (4)</th>
                    <th className="p-3">Baik (3)</th>
                    <th className="p-3">Cukup (2)</th>
                    <th className="p-3">Perlu Bimbingan (1)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-300">
                  {TEACHER_GUIDE.rubric.map((r, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-emerald-300">{r.aspect}</td>
                      <td className="p-3 text-[11px]">{r.scale4}</td>
                      <td className="p-3 text-[11px]">{r.scale3}</td>
                      <td className="p-3 text-[11px]">{r.scale2}</td>
                      <td className="p-3 text-[11px]">{r.scale1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Kunci Jawaban Resmi Asesmen Formatif */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <BookCheck className="w-4 h-4 text-indigo-400" />
              <span>Kunci Jawaban Resmi Asesmen Formatif (5 Soal)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FORMATIVE_QUIZ.map((q) => (
                <div key={q.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">Soal #{q.id}</span>
                    <span className="font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Kunci: {q.correctKey}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{q.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition"
            >
              Tutup Panduan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
