import React, { useState } from 'react';
import { PROJECT_STARTER } from '../../data/lkpdData';
import { runPythonCode } from '../../utils/pythonInterpreter';
import { 
  Terminal, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  Check, 
  ArrowRight, 
  Layers, 
  Code2, 
  Sparkles,
  Bot
} from 'lucide-react';

interface Activity4ProjectProps {
  projectCode: string;
  onUpdateCode: (code: string) => void;
  projectSubmitted: boolean;
  projectTestPassed: boolean;
  onUpdateProjectStatus: (submitted: boolean, passed: boolean) => void;
  onNext: () => void;
}

export const Activity4Project: React.FC<Activity4ProjectProps> = ({
  projectCode,
  onUpdateCode,
  projectSubmitted,
  projectTestPassed,
  onUpdateProjectStatus,
  onNext
}) => {
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [executionError, setExecutionError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{
    varModel: boolean;
    varThreshold: boolean;
    loopOutputs: boolean;
  } | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleRunCode = () => {
    const res = runPythonCode(projectCode);

    if (!res.success) {
      setExecutionError(res.error || 'Terjadi kesalahan eksekusi.');
      setOutputLines(res.output);
      setTestResults({
        varModel: false,
        varThreshold: false,
        loopOutputs: false
      });
      onUpdateProjectStatus(true, false);
      return;
    }

    setExecutionError(null);
    setOutputLines(res.output);

    // Validate requirements
    const hasModelVar = typeof res.variables['nama_model'] === 'string' && res.variables['nama_model'].length > 0;
    const hasThreshold = typeof res.variables['ambang_batas'] === 'number';
    const outputText = res.output.join('\n');
    const hasLoopOutput = outputText.includes('LOLOS') && outputText.includes('EVALUASI');

    const tests = {
      varModel: hasModelVar,
      varThreshold: hasThreshold,
      loopOutputs: hasLoopOutput
    };

    setTestResults(tests);
    const allPassed = hasModelVar && hasThreshold && hasLoopOutput;
    onUpdateProjectStatus(true, allPassed);
  };

  const handleReset = () => {
    onUpdateCode(PROJECT_STARTER);
    setOutputLines([]);
    setExecutionError(null);
    setTestResults(null);
    onUpdateProjectStatus(false, false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
            KEGIATAN 4
          </span>
          <h2 className="text-xl font-bold text-white">
            Mini Proyek Koding: Sistem Monitoring Model Klasifikasi AI
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Menerapkan sintaks variabel, tipe data (float, string, list), dan perulangan for loop untuk membangun program penguji akurasi model AI mandiri.
        </p>
      </div>

      {/* Brief Task Specifications */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Studi Kasus & Kriteria Penilaian Proyek</h3>
            <p className="text-xs text-slate-400">
              Tim AI di sekolahmu baru saja melatih model visi komputer. Tugasmu adalah membuat program penguji:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <span>1. Deklarasi Variabel</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Buat variabel <code className="font-mono text-amber-300">nama_model</code> (string) dan <code className="font-mono text-amber-300">ambang_batas = 75.0</code> (float).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
              <span>2. Dataset List</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Buat list angka <code className="font-mono text-amber-300">data_akurasi = [82.5, 68.0, 91.0, 74.5, 88.0]</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
              <span>3. Perulangan & Seleksi</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Gunakan <code className="font-mono text-amber-300">for nilai in data_akurasi:</code> dan cetak "LOLOS" jika nilai &gt;= ambang batas, atau "EVALUASI" jika tidak.
            </p>
          </div>
        </div>
      </div>

      {/* Code Editor & Terminal Playground */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-slate-300">main_project.py</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>{showHint ? 'Tutup Bantuan' : 'Lihat Petunjuk'}</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition"
              title="Reset ke kode awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleRunCode}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Jalankan & Validasi Kode</span>
            </button>
          </div>
        </div>

        {showHint && (
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-300">
              <Sparkles className="w-4 h-4" />
              <span>Panduan Struktur Kode:</span>
            </div>
            <p>
              Pastikan indentasi (spasi menjorok ke dalam) di bawah <code className="font-mono text-amber-300">for</code> dan <code className="font-mono text-amber-300">if/else</code> sudah rapi (gunakan 4 spasi).
            </p>
          </div>
        )}

        {/* Code Input */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 shadow-inner">
          <textarea
            rows={14}
            value={projectCode}
            onChange={(e) => onUpdateCode(e.target.value)}
            spellCheck={false}
            className="w-full bg-transparent font-mono text-xs sm:text-sm text-emerald-300 placeholder-slate-600 focus:outline-none resize-y leading-relaxed"
            placeholder="# Ketikkan kode Python kamu di sini..."
          />
        </div>

        {/* Terminal Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-slate-300">Terminal Konsol Simulasi</span>
            </div>
            <span className="font-mono text-[10px] text-slate-500">Python 3.12 (Virtual Simulator)</span>
          </div>

          <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs min-h-[110px] max-h-[180px] overflow-y-auto">
            {executionError ? (
              <div className="text-rose-400 font-semibold space-y-1">
                <div>Traceback (most recent call last):</div>
                <div>{executionError}</div>
              </div>
            ) : outputLines.length > 0 ? (
              <div className="space-y-1">
                {outputLines.map((line, idx) => (
                  <div key={idx} className="text-emerald-300">
                    <span className="text-slate-600 mr-2 select-none">&gt;&gt;&gt;</span>
                    {line}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-600 italic">
                Tekan tombol "Jalankan & Validasi Kode" di atas untuk melihat hasil output.
              </div>
            )}
          </div>
        </div>

        {/* Automated Test Criteria Badge */}
        {testResults && (
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Hasil Pengujian Otomatis (Unit Test Validator):
              </span>
              {projectTestPassed ? (
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  ✓ Semua Kriteria Terpenuhi!
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                  ⚠️ Masih Ada Kriteria Belum Lolos
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${testResults.varModel ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/20 border-rose-500/40 text-rose-300'}`}>
                {testResults.varModel ? <Check className="w-4 h-4" /> : <span className="font-bold">✗</span>}
                <span>Variabel nama_model (string)</span>
              </div>

              <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${testResults.varThreshold ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/20 border-rose-500/40 text-rose-300'}`}>
                {testResults.varThreshold ? <Check className="w-4 h-4" /> : <span className="font-bold">✗</span>}
                <span>Variabel ambang_batas (angka)</span>
              </div>

              <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${testResults.loopOutputs ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/20 border-rose-500/40 text-rose-300'}`}>
                {testResults.loopOutputs ? <Check className="w-4 h-4" /> : <span className="font-bold">✗</span>}
                <span>Output Perulangan LOLOS/EVALUASI</span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition"
          >
            <span>Lanjut ke Kegiatan 5: Kuis & Refleksi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
