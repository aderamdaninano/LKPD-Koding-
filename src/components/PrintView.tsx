import React from 'react';
import { LKPDAnswers } from '../types/lkpd';
import { LKPD_METADATA, FORMATIVE_QUIZ, DETECTIVE_ITEMS, VARIABLE_NAME_RULES } from '../data/lkpdData';
import { Printer, ArrowLeft, CheckCircle2, Award } from 'lucide-react';

interface PrintViewProps {
  answers: LKPDAnswers;
  onBack: () => void;
}

export const PrintView: React.FC<PrintViewProps> = ({ answers, onBack }) => {
  const { studentProfile } = answers;

  // Calculate Quiz Score
  const correctQuizCount = FORMATIVE_QUIZ.reduce((acc, q) => {
    return answers.quizAnswers[q.id] === q.correctKey ? acc + 1 : acc;
  }, 0);
  const quizScore = Math.round((correctQuizCount / FORMATIVE_QUIZ.length) * 100);

  // Calculate Detective Score
  const detectiveScore = DETECTIVE_ITEMS.reduce((acc, item) => {
    return answers.variableExercises.detectiveMatches[item.id] === item.expectedType ? acc + 1 : acc;
  }, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-4 sm:p-8">
      {/* Top Floating Control Bar (Hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden bg-slate-900 text-white p-4 rounded-xl shadow-lg">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Mode Interaktif</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-300 hidden sm:inline">
            Siap untuk dicetak atau disimpan sebagai PDF (Gunakan Print to PDF).
          </span>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow transition"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Sekarang (Print / PDF)</span>
          </button>
        </div>
      </div>

      {/* Official Printable Worksheet Paper Container */}
      <div className="max-w-4xl mx-auto bg-white border border-slate-300 p-8 sm:p-12 shadow-md rounded-lg space-y-6 print:border-none print:shadow-none print:p-0">
        {/* Formal Header */}
        <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
          <div className="text-xs uppercase tracking-widest font-bold text-slate-600">
            KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-slate-900">
            {LKPD_METADATA.title}
          </h1>
          <p className="text-xs font-semibold text-slate-700">
            {LKPD_METADATA.subtitle}
          </p>
          <div className="text-[11px] text-slate-600 flex flex-wrap items-center justify-center gap-3 pt-1">
            <span>Mata Pelajaran: <strong>{LKPD_METADATA.subject}</strong></span>
            <span>•</span>
            <span>Fase/Kelas: <strong>{LKPD_METADATA.grade}</strong></span>
            <span>•</span>
            <span>Alokasi Waktu: <strong>{LKPD_METADATA.timeAllocation}</strong></span>
          </div>
        </div>

        {/* Student Identity Box */}
        <div className="border border-slate-300 rounded-lg p-4 bg-slate-50/60 text-xs space-y-2">
          <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1">
            Identitas Peserta Didik:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-700">
            <div>
              <span className="text-slate-500">Nama Lengkap:</span>{' '}
              <strong className="text-slate-900">{studentProfile.fullName || '...........................................'}</strong>
            </div>
            <div>
              <span className="text-slate-500">Kelas / Rombel:</span>{' '}
              <strong className="text-slate-900">{studentProfile.className || '..................'}</strong>
            </div>
            <div>
              <span className="text-slate-500">No. Presensi:</span>{' '}
              <strong className="text-slate-900">{studentProfile.studentNumber || '......'}</strong>
            </div>
            <div>
              <span className="text-slate-500">Sekolah:</span>{' '}
              <strong className="text-slate-900">{studentProfile.schoolName || '...........................................'}</strong>
            </div>
            <div>
              <span className="text-slate-500">Kelompok:</span>{' '}
              <strong className="text-slate-900">{studentProfile.groupName || '-'}</strong>
            </div>
            <div>
              <span className="text-slate-500">Tanggal:</span>{' '}
              <strong className="text-slate-900">{studentProfile.date || '..................'}</strong>
            </div>
          </div>
        </div>

        {/* Ringkasan Skor & Nilai Kinerja */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 border border-slate-200 rounded-lg bg-emerald-50/50">
            <div className="text-[10px] text-emerald-800 font-bold uppercase">Tantangan Detektif</div>
            <div className="text-lg font-black text-emerald-700">
              {detectiveScore} / {DETECTIVE_ITEMS.length}
            </div>
          </div>
          <div className="p-3 border border-slate-200 rounded-lg bg-indigo-50/50">
            <div className="text-[10px] text-indigo-800 font-bold uppercase">Mini Proyek Koding</div>
            <div className="text-lg font-black text-indigo-700">
              {answers.projectTestPassed ? '100 (Lulus)' : answers.projectSubmitted ? '80 (Revisi)' : 'Belum Selesai'}
            </div>
          </div>
          <div className="p-3 border border-slate-200 rounded-lg bg-amber-50/50">
            <div className="text-[10px] text-amber-800 font-bold uppercase">Skor Kuis Formatif</div>
            <div className="text-lg font-black text-amber-700">
              {quizScore} / 100
            </div>
          </div>
        </div>

        {/* Kegiatan 1: Jawaban Pertanyaan Pemantik */}
        <div className="space-y-2 border-t border-slate-200 pt-4">
          <h2 className="text-xs font-bold uppercase text-slate-900 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center">1</span>
            Kegiatan 1: Stimulus & Analisis Konsep AI
          </h2>
          <div className="text-xs space-y-2 text-slate-700 pl-6">
            <div>
              <strong className="text-slate-900">1. Analisis Peran Variabel dalam Program AI:</strong>
              <div className="mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 italic whitespace-pre-line">
                {answers.stimulusAnswers.q1 || '(Belum dijawab oleh siswa)'}
              </div>
            </div>
            <div>
              <strong className="text-slate-900">2. Analisis Peran Perulangan dalam Pemrosesan Ribuan Data AI:</strong>
              <div className="mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 italic whitespace-pre-line">
                {answers.stimulusAnswers.q2 || '(Belum dijawab oleh siswa)'}
              </div>
            </div>
          </div>
        </div>

        {/* Kegiatan 2: Detektif Variabel & Tipe Data */}
        <div className="space-y-2 border-t border-slate-200 pt-4">
          <h2 className="text-xs font-bold uppercase text-slate-900 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center">2</span>
            Kegiatan 2: Identifikasi Variabel & Tipe Data
          </h2>
          <div className="text-xs pl-6 overflow-x-auto">
            <table className="w-full text-left border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="p-2">Potongan Kode</th>
                  <th className="p-2">Tipe Jawaban Siswa</th>
                  <th className="p-2">Kunci Jawaban</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px]">
                {DETECTIVE_ITEMS.map((item) => {
                  const studentAns = answers.variableExercises.detectiveMatches[item.id] || '-';
                  const isCorrect = studentAns === item.expectedType;
                  return (
                    <tr key={item.id}>
                      <td className="p-2 font-mono font-semibold">{item.code}</td>
                      <td className="p-2 font-mono">{studentAns}</td>
                      <td className="p-2 font-mono text-slate-600">{item.expectedType}</td>
                      <td className="p-2 font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-700">✓ Tepat</span>
                        ) : (
                          <span className="text-rose-700">✗ Keliru</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kegiatan 3: Perulangan */}
        <div className="space-y-2 border-t border-slate-200 pt-4">
          <h2 className="text-xs font-bold uppercase text-slate-900 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center">3</span>
            Kegiatan 3: Eksplorasi Perulangan (Loops) & Debugging
          </h2>
          <div className="text-xs space-y-2 text-slate-700 pl-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                Kasus 1 (Infinite Loop):{' '}
                <strong>{answers.loopExercises.debugChallenge1Fixed ? '✓ Berhasil Diperbaiki' : '✗ Belum Selesai'}</strong>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                Kasus 2 (Akumulasi Sensor):{' '}
                <strong>{answers.loopExercises.debugChallenge2Fixed ? '✓ Berhasil Diperbaiki' : '✗ Belum Selesai'}</strong>
              </div>
            </div>
            <div>
              <strong className="text-slate-900">Analisis Siswa Mengenai Pencegahan Infinite Loop:</strong>
              <div className="mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 italic whitespace-pre-line">
                {answers.loopExercises.loopAnalysisResponse || '(Belum dijawab oleh siswa)'}
              </div>
            </div>
          </div>
        </div>

        {/* Kegiatan 4: Mini Proyek Koding */}
        <div className="space-y-2 border-t border-slate-200 pt-4">
          <h2 className="text-xs font-bold uppercase text-slate-900 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center">4</span>
            Kegiatan 4: Kode Program Mini Proyek Koding Mandiri
          </h2>
          <div className="pl-6 space-y-2">
            <pre className="p-3 bg-slate-900 text-emerald-400 rounded-lg font-mono text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {answers.projectCode}
            </pre>
            <div className="text-xs text-slate-600">
              Status Validasi Otomatis:{' '}
              <strong className={answers.projectTestPassed ? 'text-emerald-700' : 'text-amber-700'}>
                {answers.projectTestPassed ? 'Memenuhi Semua Spesifikasi Soal' : 'Belum Memenuhi Semua Kriteria'}
              </strong>
            </div>
          </div>
        </div>

        {/* Kegiatan 5: Refleksi Siswa 3-2-1 */}
        <div className="space-y-2 border-t border-slate-200 pt-4">
          <h2 className="text-xs font-bold uppercase text-slate-900 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center">5</span>
            Refleksi Pembelajaran Siswa (Model 3-2-1)
          </h2>
          <div className="text-xs space-y-2 text-slate-700 pl-6">
            <div>
              <strong>1. Hal yang Paling Dipahami:</strong>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-800">
                {answers.reflection.learned || '(Belum diisi)'}
              </div>
            </div>
            <div>
              <strong>2. Hal yang Masih Menantang:</strong>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-800">
                {answers.reflection.difficulties || '(Belum diisi)'}
              </div>
            </div>
            <div>
              <strong>3. Ide Penerapan Program AI di Masa Depan:</strong>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-800">
                {answers.reflection.aiIdea || '(Belum diisi)'}
              </div>
            </div>
          </div>
        </div>

        {/* Tanda Tangan Guru & Siswa */}
        <div className="border-t-2 border-slate-900 pt-6 mt-8 grid grid-cols-2 text-center text-xs text-slate-800">
          <div>
            <p>Mengetahui,</p>
            <p className="font-semibold text-slate-900">Guru Mata Pelajaran Koding & AI</p>
            <div className="h-16 flex items-end justify-center text-slate-400">
              ( ...................................................... )
            </div>
            <p className="text-[10px] text-slate-500">NIP. ..........................................</p>
          </div>

          <div>
            <p>Siswa / Ketua Kelompok,</p>
            <p className="font-semibold text-slate-900">{studentProfile.className || 'Kelas X'}</p>
            <div className="h-16 flex items-end justify-center font-bold text-slate-900">
              ( {studentProfile.fullName || '......................................................'} )
            </div>
            <p className="text-[10px] text-slate-500">NISN/No. Presensi: {studentProfile.studentNumber || '......'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
