import React from 'react';
import { FORMATIVE_QUIZ } from '../../data/lkpdData';
import { 
  CheckCircle2, 
  HelpCircle, 
  Award, 
  Printer, 
  RotateCcw, 
  BookOpen, 
  Sparkles, 
  MessageSquareQuote,
  Check,
  X
} from 'lucide-react';

interface Activity5AssessmentProps {
  quizAnswers: Record<number, string>;
  onSelectOption: (questionId: number, optionKey: string) => void;
  quizSubmitted: boolean;
  onSubmitQuiz: () => void;
  reflection: {
    learned: string;
    difficulties: string;
    aiIdea: string;
  };
  onUpdateReflection: (field: 'learned' | 'difficulties' | 'aiIdea', value: string) => void;
  onPrint: () => void;
}

export const Activity5Assessment: React.FC<Activity5AssessmentProps> = ({
  quizAnswers,
  onSelectOption,
  quizSubmitted,
  onSubmitQuiz,
  reflection,
  onUpdateReflection,
  onPrint
}) => {
  // Calculate Quiz Score
  const correctCount = FORMATIVE_QUIZ.reduce((acc, q) => {
    return quizAnswers[q.id] === q.correctKey ? acc + 1 : acc;
  }, 0);

  const totalScore = Math.round((correctCount / FORMATIVE_QUIZ.length) * 100);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
            KEGIATAN 5
          </span>
          <h2 className="text-xl font-bold text-white">
            Asesmen Formatif & Refleksi Pembelajaran
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Uji pemahaman teoritis dan analisis kode mengenai variabel, tipe data, dan perulangan Python melalui asesmen formatif 5 butir soal serta lembar refleksi diri.
        </p>
      </div>

      {/* Score Summary Banner if submitted */}
      {quizSubmitted && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-700/50 p-6 shadow-xl text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Award className="w-8 h-8 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
                  Hasil Asesmen Formatif
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  Skor Anda: {totalScore} / 100
                </h3>
                <p className="text-xs text-slate-300">
                  Menjawab benar {correctCount} dari {FORMATIVE_QUIZ.length} pertanyaan ({totalScore >= 75 ? 'Tuntas / Sangat Baik' : 'Perlu Pendalaman Materi'}).
                </p>
              </div>
            </div>

            <button
              onClick={onPrint}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Hasil LKPD Sekarang</span>
            </button>
          </div>
        </div>
      )}

      {/* Quiz Questions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Soal Pilihan Ganda & Analisis Kode</h3>
              <p className="text-xs text-slate-400">
                Pilihlah salah satu jawaban yang paling tepat (A, B, C, atau D)
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Terjawab: {Object.keys(quizAnswers).length} / {FORMATIVE_QUIZ.length}
          </div>
        </div>

        <div className="space-y-5">
          {FORMATIVE_QUIZ.map((q, idx) => {
            const selected = quizAnswers[q.id];
            const isCorrect = selected === q.correctKey;

            return (
              <div
                key={q.id}
                className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="space-y-2 flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-slate-200 whitespace-pre-line leading-relaxed">
                      {q.question}
                    </p>
                  </div>
                </div>

                {/* Option list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 pl-9">
                  {q.options.map((opt) => {
                    const isOptionSelected = selected === opt.key;
                    let optionStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (quizSubmitted) {
                      if (opt.key === q.correctKey) {
                        optionStyle = 'bg-emerald-950/30 border-emerald-500/60 text-emerald-300 font-semibold';
                      } else if (isOptionSelected) {
                        optionStyle = 'bg-rose-950/30 border-rose-500/60 text-rose-300';
                      }
                    } else if (isOptionSelected) {
                      optionStyle = 'bg-indigo-600/20 border-indigo-500 text-white font-semibold';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => !quizSubmitted && onSelectOption(q.id, opt.key)}
                        disabled={quizSubmitted}
                        className={`text-left p-3 rounded-xl border text-xs flex items-center gap-3 transition ${optionStyle}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-800/80 font-mono font-bold flex items-center justify-center shrink-0">
                          {opt.key}
                        </span>
                        <span className="flex-1">{opt.text}</span>
                        {quizSubmitted && opt.key === q.correctKey && (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {quizSubmitted && isOptionSelected && opt.key !== q.correctKey && (
                          <X className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation when submitted */}
                {quizSubmitted && (
                  <div className="ml-9 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Pembahasan Kunci Jawaban:</span>
                    </div>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!quizSubmitted && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={onSubmitQuiz}
              disabled={Object.keys(quizAnswers).length < FORMATIVE_QUIZ.length}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-md transition"
            >
              Kirim & Periksa Jawaban Kuis
            </button>
          </div>
        )}
      </div>

      {/* Lembar Refleksi Diri 3-2-1 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Lembar Refleksi Pembelajaran Siswa (Model 3-2-1)</h3>
            <p className="text-xs text-slate-400">
              Evaluasi proses belajar mandiri untuk memperkuat metakognisi dan Profil Pelajar Pancasila
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              1. Tiga (3) hal baru yang paling kamu pahami mengenai Variabel, Tipe Data, atau Perulangan Python:
            </label>
            <textarea
              rows={2}
              value={reflection.learned}
              onChange={(e) => onUpdateReflection('learned', e.target.value)}
              placeholder="Contoh: 1) Aturan penamaan snake_case, 2) Perbedaan int dan float, 3) Cara kerja for range loop..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              2. Dua (2) hal yang masih terasa menantang atau membingungkan dan ingin kamu tanyakan pada guru:
            </label>
            <textarea
              rows={2}
              value={reflection.difficulties}
              onChange={(e) => onUpdateReflection('difficulties', e.target.value)}
              placeholder="Contoh: 1) Menentukan batas stop pada range(), 2) Mencegah while loop agar tidak infinite loop..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              3. Satu (1) ide penerapan program Python / AI sederhana yang ingin kamu buat di masa depan:
            </label>
            <textarea
              rows={2}
              value={reflection.aiIdea}
              onChange={(e) => onUpdateReflection('aiIdea', e.target.value)}
              placeholder="Contoh: Membuat program klasifikasi nilai rapor siswa otomatis atau chatbot pengingat jadwal salat..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Seluruh data lembar kerja Anda telah tersimpan secara otomatis.
          </div>

          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan Lembar Kerja (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
