import React from 'react';
import { 
  Bot, 
  BrainCircuit, 
  HelpCircle, 
  ArrowRight, 
  Lightbulb, 
  Database, 
  Binary, 
  Sparkles,
  Save
} from 'lucide-react';

interface Activity1IntroProps {
  answers: {
    q1: string;
    q2: string;
  };
  onUpdateAnswers: (key: 'q1' | 'q2', val: string) => void;
  onNext: () => void;
}

export const Activity1Intro: React.FC<Activity1IntroProps> = ({
  answers,
  onUpdateAnswers,
  onNext
}) => {
  return (
    <div className="space-y-6">
      {/* Activity Title Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
            KEGIATAN 1
          </span>
          <h2 className="text-xl font-bold text-white">
            Stimulus: Mengapa Kecerdasan Artifisial (AI) Menggunakan Python?
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Mengamati fenomena dunia nyata dan memahami bagaimana komputer serta model AI mengolah informasi melalui kode program.
        </p>
      </div>

      {/* Story & Context Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Story */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
              <Bot className="w-5 h-5" />
              <span>Kisah Di Balik Asisten Cerdas & Pengenalan Objek</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pernahkah kamu bertanya-tanya: saat aplikasi media sosial mengenali wajah temanmu di foto, atau saat ChatGPT menjawab pertanyaanmu dalam bahasa Indonesia yang luwes, bagaimana komputer melakukannya?
            </p>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4 text-purple-400" />
                Dua Fondasi Utama Mesin AI:
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 ml-1">
                <li>
                  <strong className="text-emerald-300">Menyimpan Informasi:</strong> Komputer harus bisa mengingat nama objek, koordinat piksel wajah, probabilitas akurasi, dan kata-kata kalimat. Ini dilakukan menggunakan <strong className="text-emerald-300">Variabel & Tipe Data</strong>.
                </li>
                <li>
                  <strong className="text-emerald-300">Memproses Ribuan Data Berulang:</strong> Model AI tidak belajar hanya dalam sekali lihat. Model harus mengulang (iterasi) jutaan gambar atau teks berulang-ulang sampai pintar. Ini dilakukan menggunakan <strong className="text-emerald-300">Perulangan (Loops)</strong>.
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
                  <Database className="w-4 h-4" />
                  <span>1. Kotak Memori (Variabel)</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Analogi: Seperti loker sekolah berlabel nama. Kita bisa menaruh buku matematika, lalu besok menggantinya dengan kamus bahasa Inggris.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1">
                  <Binary className="w-4 h-4" />
                  <span>2. Putaran Training (Perulangan)</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Analogi: Seperti atlet basket yang berlatih menembak bola 100 kali setiap hari. Pola latihan berulang membuat AI semakin akurat!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Infographic card */}
        <div className="bg-gradient-to-b from-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider mb-3">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Fakta Menarik AI</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">Mengapa Harus Python?</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Python diciptakan oleh Guido van Rossum dengan filosofi: <em>"Readability counts"</em> (keterbacaan kode adalah yang utama). Kodenya mirip bahasa Inggris manusia sehingga para ilmuwan AI dapat fokus pada logika kecerdasan mesin tanpa pusing dengan sintaks rumit.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 flex items-center justify-between">
                <span>Bahasa #1 Data Science</span>
                <span className="text-emerald-400 font-bold">100% Cocok</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 flex items-center justify-between">
                <span>Dukungan Ekosistem AI</span>
                <span className="text-indigo-400 font-bold">Terbesar di Dunia</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 italic">
            "Koding adalah jembatan antara imajinasimu dengan kemampuan super komputer."
          </div>
        </div>
      </div>

      {/* Pertanyaan Pemantik / Respon Siswa LKPD */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-4">
          <HelpCircle className="w-5 h-5" />
          <span>Lembar Respon: Pertanyaan Pemantik Berpikir Kritis</span>
        </div>

        <div className="space-y-5">
          {/* Soal Respon 1 */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-slate-200 leading-snug">
              1. Menurut pemahamanmu setelah membaca stimulus di atas, mengapa sebuah program kecerdasan artifisial (AI) sangat membutuhkan <span className="text-emerald-400">Variabel</span>? Berikan contoh data apa saja yang perlu disimpan oleh AI pendeteksi cuaca!
            </label>
            <textarea
              rows={3}
              value={answers.q1}
              onChange={(e) => onUpdateAnswers('q1', e.target.value)}
              placeholder="Tuliskan analisismu di sini... (Contoh: Variabel dibutuhkan untuk menyimpan data suhu, kelembapan, nama kota agar AI bisa menghitung prediksi hujan...)"
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition resize-y"
            />
            <div className="flex justify-between items-center text-[11px] text-slate-500">
              <span>{answers.q1.trim().length > 15 ? '✓ Respon terisi' : '⚠️ Silakan isi respon minimal 1 kalimat'}</span>
              <span>{answers.q1.length} karakter</span>
            </div>
          </div>

          {/* Soal Respon 2 */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-slate-200 leading-snug">
              2. Bayangkan kamu sedang membuat fitur deteksi spam pada email. Mengapa proses pemeriksaan 1000 email yang masuk membutuhkan konsep <span className="text-indigo-400">Perulangan (Looping)</span>, dan bukan menulis perintah pemeriksaan secara manual satu per satu?
            </label>
            <textarea
              rows={3}
              value={answers.q2}
              onChange={(e) => onUpdateAnswers('q2', e.target.value)}
              placeholder="Tuliskan analisismu di sini... (Contoh: Karena perulangan membuat kode otomatis dan efisien mengulang algoritma deteksi kata spam untuk 1000 email tanpa perlu menulis 1000 baris kode...)"
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition resize-y"
            />
            <div className="flex justify-between items-center text-[11px] text-slate-500">
              <span>{answers.q2.trim().length > 15 ? '✓ Respon terisi' : '⚠️ Silakan isi respon minimal 1 kalimat'}</span>
              <span>{answers.q2.length} karakter</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Save className="w-3.5 h-3.5 text-emerald-400" />
            <span>Jawaban tersimpan otomatis pada LKPD</span>
          </div>

          <button
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition"
          >
            <span>Lanjut ke Kegiatan 2: Variabel & Tipe Data</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
