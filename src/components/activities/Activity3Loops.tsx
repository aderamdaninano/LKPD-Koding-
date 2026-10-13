import React, { useState, useEffect } from 'react';
import { LOOP_DEMOS, DEBUG_CHALLENGES } from '../../data/lkpdData';
import { runPythonCode, ExecutionStep } from '../../utils/pythonInterpreter';
import { 
  Repeat, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Terminal, 
  Bug, 
  Check, 
  ArrowRight, 
  Cpu, 
  Lightbulb, 
  AlertTriangle,
  Code2
} from 'lucide-react';

interface Activity3LoopsProps {
  onNext: () => void;
  loopExercises: {
    stepperCompleted: boolean;
    debugChallenge1Fixed: boolean;
    debugChallenge2Fixed: boolean;
    loopAnalysisResponse: string;
  };
  onUpdateLoopExercise: (key: string, value: any) => void;
}

export const Activity3Loops: React.FC<Activity3LoopsProps> = ({
  onNext,
  loopExercises,
  onUpdateLoopExercise
}) => {
  // Stepper state
  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);
  const activeDemo = LOOP_DEMOS[selectedDemoIndex];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);
  const [demoOutput, setDemoOutput] = useState<string[]>([]);

  // Debugging challenges state
  const [ch1Code, setCh1Code] = useState(DEBUG_CHALLENGES[0].buggyCode);
  const [ch1Output, setCh1Output] = useState<string[]>([]);
  const [ch1Error, setCh1Error] = useState('');
  const [ch1Tested, setCh1Tested] = useState(false);

  const [ch2Code, setCh2Code] = useState(DEBUG_CHALLENGES[1].buggyCode);
  const [ch2Output, setCh2Output] = useState<string[]>([]);
  const [ch2Error, setCh2Error] = useState('');
  const [ch2Tested, setCh2Tested] = useState(false);

  // Compile demo when switched
  useEffect(() => {
    const res = runPythonCode(activeDemo.code);
    setExecutionSteps(res.steps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setDemoOutput([]);
  }, [selectedDemoIndex]);

  // Handle auto-play stepper
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < executionSteps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            onUpdateLoopExercise('stepperCompleted', true);
            return prev;
          }
        });
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isPlaying, executionSteps.length]);

  const currentStep = executionSteps[currentStepIndex] || null;
  const currentLines = activeDemo.code.split('\n');

  // Handle Challenge 1 test
  const handleTestCh1 = () => {
    setCh1Tested(true);
    const res = runPythonCode(ch1Code);
    if (!res.success) {
      setCh1Error(res.error || 'Terjadi kesalahan eksekusi.');
      setCh1Output(res.output);
      onUpdateLoopExercise('debugChallenge1Fixed', false);
    } else {
      setCh1Error('');
      setCh1Output(res.output);
      const isFixed = ch1Code.includes('lantai += 1') || ch1Code.includes('lantai = lantai + 1');
      onUpdateLoopExercise('debugChallenge1Fixed', isFixed);
    }
  };

  // Handle Challenge 2 test
  const handleTestCh2 = () => {
    setCh2Tested(true);
    const res = runPythonCode(ch2Code);
    if (!res.success) {
      setCh2Error(res.error || 'Terjadi kesalahan eksekusi.');
      setCh2Output(res.output);
      onUpdateLoopExercise('debugChallenge2Fixed', false);
    } else {
      setCh2Error('');
      setCh2Output(res.output);
      const totalVar = res.variables['total'];
      const isFixed = totalVar === 255; // 80 + 85 + 90
      onUpdateLoopExercise('debugChallenge2Fixed', isFixed);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
            KEGIATAN 3
          </span>
          <h2 className="text-xl font-bold text-white">
            Eksplorasi Perulangan (Loops) dalam Python
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Memahami struktur for loop, range(), perulangan list, while loop, serta peran perulangan dalam proses iterasi dan pelatihan kecerdasan artifisial.
        </p>
      </div>

      {/* Konsep Ringkas Perulangan dalam AI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase">
            <Cpu className="w-4 h-4" />
            <span>Peran dalam AI: Epoch Training</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Pada pembelajaran mesin (Machine Learning), 1 kali putaran model membaca seluruh dataset disebut <strong className="text-emerald-300">Epoch</strong>. Jika model dilatih 50 epoch, algoritma menggunakan <code className="text-amber-300 font-mono">for epoch in range(1, 51)</code>.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
            <Repeat className="w-4 h-4" />
            <span>Perulangan FOR</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Digunakan saat jumlah iterasi <strong className="text-white">sudah diketahui secara pasti</strong> atau ingin mengulang seluruh elemen di dalam sebuah list/koleksi data.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
            <AlertTriangle className="w-4 h-4" />
            <span>Perulangan WHILE</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Digunakan saat perulangan bergantung pada <strong className="text-white">kondisi logika (True/False)</strong>. Wajib ada baris pengubah kondisi agar tidak terjadi <em className="text-rose-400">Infinite Loop</em>.
          </p>
        </div>
      </div>

      {/* Interactive Lab: Loop Step-by-Step Visualizer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Repeat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Lab Interaktif: Loop Step-by-Step Visualizer</h3>
              <p className="text-xs text-slate-400">
                Saksikan jalannya perulangan Python langkah demi langkah dan lacak nilai variabelnya
              </p>
            </div>
          </div>

          {/* Demo Picker */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {LOOP_DEMOS.map((demo, idx) => (
              <button
                key={demo.id}
                onClick={() => setSelectedDemoIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedDemoIndex === idx
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Demo {idx + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-300 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
          <span className="font-bold text-white mr-1">{activeDemo.title}:</span>
          {activeDemo.description}
        </div>

        {/* Stepper Grid: Left (Code highlighting) & Right (Variable & Output) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Code Viewer */}
          <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs overflow-x-auto shadow-inner">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 pb-1 border-b border-slate-800 flex justify-between">
              <span>script.py</span>
              <span>Baris Aktif: {currentStep ? currentStep.lineIndex + 1 : '-'}</span>
            </div>

            <div className="space-y-1">
              {currentLines.map((line, idx) => {
                const isCurrent = currentStep && currentStep.lineIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`flex items-start px-2 py-1 rounded transition-colors ${
                      isCurrent
                        ? 'bg-amber-500/20 text-amber-300 font-bold border-l-2 border-amber-400 pl-2'
                        : 'text-slate-300 hover:bg-slate-900/50'
                    }`}
                  >
                    <span className="text-slate-600 select-none w-6 text-right mr-3 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="whitespace-pre">{line || ' '}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inspector Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Variables state */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center justify-between">
                <span>Nilai Variabel Saat Ini</span>
                <span className="text-emerald-400 font-mono">RAM</span>
              </div>
              <div className="space-y-1.5 min-h-[70px]">
                {currentStep && Object.keys(currentStep.variables).length > 0 ? (
                  Object.entries(currentStep.variables).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between text-xs font-mono p-1.5 rounded bg-slate-900 border border-slate-800"
                    >
                      <span className="text-emerald-400 font-semibold">{k}</span>
                      <span className="text-amber-300">{JSON.stringify(v)}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-500 italic py-2">
                    Belum ada variabel terdaftar di langkah ini.
                  </div>
                )}
              </div>
            </div>

            {/* Step Explanation */}
            <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-xl p-3 text-xs text-indigo-200">
              <div className="font-bold flex items-center gap-1.5 text-indigo-300 mb-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Penjelasan Langkah:</span>
              </div>
              <p>{currentStep ? currentStep.explanation : 'Tekan tombol "Langkah Selanjutnya" atau "Jalankan Otomatis".'}</p>
            </div>

            {/* Terminal Output */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-3 font-mono text-xs">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1 flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-emerald-400" />
                <span>Console Output</span>
              </div>
              <div className="bg-slate-900/90 rounded p-2.5 min-h-[90px] max-h-[120px] overflow-y-auto space-y-1 text-emerald-400 text-[11px]">
                {currentStep && currentStep.output.length > 0 ? (
                  currentStep.output.map((out, idx) => <div key={idx}>&gt; {out}</div>)
                ) : (
                  <span className="text-slate-600 italic">Terminal kosong...</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stepper Controls Bar */}
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Jeda' : 'Jalankan Otomatis'}</span>
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex((prev) => Math.max(0, prev - 1));
              }}
              disabled={currentStepIndex === 0}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition"
              title="Langkah Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex((prev) => {
                  const next = Math.min(executionSteps.length - 1, prev + 1);
                  if (next === executionSteps.length - 1) {
                    onUpdateLoopExercise('stepperCompleted', true);
                  }
                  return next;
                });
              }}
              disabled={currentStepIndex >= executionSteps.length - 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium disabled:opacity-40 transition"
            >
              <span>Langkah Selanjutnya</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(0);
              }}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
              title="Mulai Ulang dari Awal"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Langkah {executionSteps.length > 0 ? currentStepIndex + 1 : 0} dari {executionSteps.length}
          </div>
        </div>
      </div>

      {/* Tantangan Debugging: Memperbaiki Kode Perulangan */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Bug className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Tantangan Debugging: Perbaiki Kode Perulangan Rusak</h3>
            <p className="text-xs text-slate-400">
              Analisis kesalahan logika di bawah ini, edit kodenya secara langsung, dan uji kebenarannya!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kasus 1 */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-amber-300">{DEBUG_CHALLENGES[0].title}</span>
                {loopExercises.debugChallenge1Fixed && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <Check className="w-3 h-3" /> Berhasil Diperbaiki!
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">{DEBUG_CHALLENGES[0].story}</p>

              <textarea
                rows={6}
                value={ch1Code}
                onChange={(e) => setCh1Code(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs text-emerald-300 focus:outline-none focus:border-amber-400"
              />

              <div className="text-[11px] text-slate-400 italic">
                Petunjuk: {DEBUG_CHALLENGES[0].hint}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <button
                onClick={handleTestCh1}
                className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Uji Solusi Kasus 1</span>
              </button>

              {ch1Tested && (
                <div className={`p-2 rounded text-xs font-mono ${ch1Error ? 'bg-rose-950/30 text-rose-300 border border-rose-800/40' : 'bg-slate-900 text-emerald-400'}`}>
                  {ch1Error ? ch1Error : ch1Output.join('\n') || 'Output berhasil dieksekusi.'}
                </div>
              )}
            </div>
          </div>

          {/* Kasus 2 */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-amber-300">{DEBUG_CHALLENGES[1].title}</span>
                {loopExercises.debugChallenge2Fixed && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <Check className="w-3 h-3" /> Berhasil Diperbaiki!
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">{DEBUG_CHALLENGES[1].story}</p>

              <textarea
                rows={6}
                value={ch2Code}
                onChange={(e) => setCh2Code(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs text-emerald-300 focus:outline-none focus:border-amber-400"
              />

              <div className="text-[11px] text-slate-400 italic">
                Petunjuk: {DEBUG_CHALLENGES[1].hint}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <button
                onClick={handleTestCh2}
                className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Uji Solusi Kasus 2</span>
              </button>

              {ch2Tested && (
                <div className={`p-2 rounded text-xs font-mono ${ch2Error ? 'bg-rose-950/30 text-rose-300 border border-rose-800/40' : 'bg-slate-900 text-emerald-400'}`}>
                  {ch2Error ? ch2Error : ch2Output.join('\n') || 'Output berhasil dieksekusi.'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Respon Analisis Perulangan */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-slate-200">
            Pertanyaan Refleksi Kegiatan 3: Mengapa sebuah while loop bisa mengalami <em>Infinite Loop</em> (macet tanpa henti), dan bagaimana cara kamu sebagai programmer mencegahnya?
          </label>
          <textarea
            rows={3}
            value={loopExercises.loopAnalysisResponse}
            onChange={(e) => onUpdateLoopExercise('loopAnalysisResponse', e.target.value)}
            placeholder="Tuliskan jawaban analisismu di sini... (Contoh: Karena kondisi perulangan selalu bernilai True dan variabel penghitung tidak diubah di dalam blok loop...)"
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition resize-y"
          />
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition"
          >
            <span>Lanjut ke Kegiatan 4: Mini Proyek Koding</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
