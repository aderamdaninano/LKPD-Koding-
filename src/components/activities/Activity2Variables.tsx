import React, { useState } from 'react';
import { DETECTIVE_ITEMS, VARIABLE_NAME_RULES, INITIAL_VARIABLES } from '../../data/lkpdData';
import { getPythonType } from '../../utils/pythonInterpreter';
import { 
  Boxes, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  ArrowRight, 
  Info, 
  Search, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface Activity2VariablesProps {
  detectiveMatches: Record<string, string>;
  onUpdateDetective: (id: string, selectedType: string) => void;
  validNameAnswers: Record<string, boolean | null>;
  onUpdateValidName: (name: string, isValid: boolean) => void;
  onNext: () => void;
}

export const Activity2Variables: React.FC<Activity2VariablesProps> = ({
  detectiveMatches,
  onUpdateDetective,
  validNameAnswers,
  onUpdateValidName,
  onNext
}) => {
  // Local state for interactive custom memory box creator
  const [memoryBoxes, setMemoryBoxes] = useState(INITIAL_VARIABLES);
  const [newVarName, setNewVarName] = useState('');
  const [newVarVal, setNewVarVal] = useState('');
  const [boxError, setBoxError] = useState('');

  const typeBadges: Record<string, { bg: string; text: string; border: string }> = {
    str: { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-500/30' },
    int: { bg: 'bg-blue-500/15', text: 'text-blue-300', border: 'border-blue-500/30' },
    float: { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-500/30' },
    bool: { bg: 'bg-purple-500/15', text: 'text-purple-300', border: 'border-purple-500/30' },
    list: { bg: 'bg-rose-500/15', text: 'text-rose-300', border: 'border-rose-500/30' },
    dict: { bg: 'bg-cyan-500/15', text: 'text-cyan-300', border: 'border-cyan-500/30' },
    NoneType: { bg: 'bg-slate-500/15', text: 'text-slate-300', border: 'border-slate-500/30' },
  };

  const handleAddVariable = (e: React.FormEvent) => {
    e.preventDefault();
    setBoxError('');

    const cleanName = newVarName.trim();
    const cleanVal = newVarVal.trim();

    if (!cleanName || !cleanVal) {
      setBoxError('Nama variabel dan nilai tidak boleh kosong.');
      return;
    }

    if (!/^[a-zA-Z_]\w*$/.test(cleanName)) {
      setBoxError(`Nama "${cleanName}" tidak valid! Harus diawali huruf/garis bawah dan tanpa spasi.`);
      return;
    }

    // Infer type
    let inferred: any = 'str';
    if (cleanVal === 'True' || cleanVal === 'False') inferred = 'bool';
    else if (/^-?\d+$/.test(cleanVal)) inferred = 'int';
    else if (/^-?\d+\.\d+$/.test(cleanVal)) inferred = 'float';
    else if (cleanVal.startsWith('[') && cleanVal.endsWith(']')) inferred = 'list';
    else if ((cleanVal.startsWith('"') && cleanVal.endsWith('"')) || (cleanVal.startsWith("'") && cleanVal.endsWith("'"))) inferred = 'str';
    else inferred = 'str';

    const newBox = {
      id: Date.now().toString(),
      name: cleanName,
      value: cleanVal,
      type: inferred as any,
      description: `Variabel '${cleanName}' dibuat oleh siswa.`
    };

    setMemoryBoxes([newBox, ...memoryBoxes]);
    setNewVarName('');
    setNewVarVal('');
  };

  const handleRemoveVariable = (id: string) => {
    setMemoryBoxes(memoryBoxes.filter((b) => b.id !== id));
  };

  // Calculate scores
  const detectiveScore = DETECTIVE_ITEMS.reduce((acc, item) => {
    return detectiveMatches[item.id] === item.expectedType ? acc + 1 : acc;
  }, 0);

  const validNameScore = VARIABLE_NAME_RULES.reduce((acc, item) => {
    return validNameAnswers[item.name] === item.valid ? acc + 1 : acc;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
            KEGIATAN 2
          </span>
          <h2 className="text-xl font-bold text-white">
            Eksplorasi Variabel & Tipe Data Python
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Memahami konsep variabel sebagai lokasi memori bernama, aturan penamaan sintaks, serta ragam tipe data dasar (int, float, str, bool, list).
        </p>
      </div>

      {/* Ringkasan Konsep Dasar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { type: 'str (String)', color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400', example: '"Halo Dunia"', desc: 'Teks yang diapit tanda petik (" atau \')' },
          { type: 'int (Integer)', color: 'border-blue-500/40 bg-blue-950/20 text-blue-400', example: '25, -10, 0', desc: 'Bilangan bulat positif/negatif tanpa desimal' },
          { type: 'float (Float)', color: 'border-amber-500/40 bg-amber-950/20 text-amber-400', example: '98.5, 3.14', desc: 'Bilangan pecahan dengan tanda titik desimal' },
          { type: 'bool (Boolean)', color: 'border-purple-500/40 bg-purple-950/20 text-purple-400', example: 'True / False', desc: 'Nilai logika kebenaran (True atau False)' },
          { type: 'list (Array/Daftar)', color: 'border-rose-500/40 bg-rose-950/20 text-rose-400', example: '["AI", 95, True]', desc: 'Kumpulan banyak nilai dalam tanda kurung [ ]' }
        ].map((t, idx) => (
          <div key={idx} className={`p-4 rounded-xl border ${t.color} flex flex-col justify-between`}>
            <div>
              <div className="font-bold text-xs uppercase mb-1">{t.type}</div>
              <div className="font-mono text-xs font-semibold text-white bg-slate-900/80 px-2 py-1 rounded border border-slate-800 mb-2">
                {t.example}
              </div>
            </div>
            <p className="text-[11px] text-slate-300 leading-tight">{t.desc}</p>
          </div>
        ))}
      </div>

      {/* Interactive Lab: Memory Box Visualizer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Lab Interaktif: Memory Box Inspector</h3>
              <p className="text-xs text-slate-400">
                Visualisasi penyimpanan variabel ke dalam slot RAM komputer oleh Python
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            {memoryBoxes.length} Variabel Tersimpan di Memori
          </span>
        </div>

        {/* Input Form to create new variable */}
        <form onSubmit={handleAddVariable} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Coba Buat Variabel Baru:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
            <div className="sm:col-span-5">
              <input
                type="text"
                placeholder='Nama variabel (contoh: model_ai, skor)'
                value={newVarName}
                onChange={(e) => setNewVarName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-emerald-300 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="sm:col-span-5">
              <input
                type="text"
                placeholder='Nilai (contoh: "GPT-4o", 98.5, True, [1, 2])'
                value={newVarVal}
                onChange={(e) => setNewVarVal(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Simpan</span>
              </button>
            </div>
          </div>

          {boxError && (
            <p className="text-xs text-rose-400 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              <span>{boxError}</span>
            </p>
          )}
        </form>

        {/* Visual Memory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {memoryBoxes.map((box) => {
            const badge = typeBadges[box.type] || typeBadges.str;
            return (
              <div
                key={box.id}
                className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/80 hover:border-slate-600 transition flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-emerald-300 truncate">
                      {box.name}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}>
                      {box.type}
                    </span>
                  </div>

                  {/* Visual Box Container */}
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 font-mono text-xs text-slate-100 break-all mb-2 shadow-inner">
                    <span className="text-slate-500 mr-2">=</span>
                    <span className="text-amber-300 font-semibold">{box.value}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-2">{box.description}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-700/50 flex justify-between items-center text-[10px] text-slate-500">
                  <span>Alamat Memori: 0x{box.id.slice(-4)}</span>
                  <button
                    onClick={() => handleRemoveVariable(box.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 transition"
                    title="Hapus variabel dari slot memori"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tantangan 1: Detektif Tipe Data */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Tantangan 1: Detektif Tipe Data Python</h3>
              <p className="text-xs text-slate-400">
                Pilihlah tipe data yang tepat untuk setiap potongan kode Python di bawah ini!
              </p>
            </div>
          </div>
          <div className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Skor: <span className="text-emerald-400 font-bold">{detectiveScore}</span> / {DETECTIVE_ITEMS.length}
          </div>
        </div>

        <div className="space-y-3">
          {DETECTIVE_ITEMS.map((item, index) => {
            const selected = detectiveMatches[item.id] || '';
            const isAnswered = Boolean(selected);
            const isCorrect = selected === item.expectedType;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all ${
                  isAnswered
                    ? isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : 'bg-rose-950/20 border-rose-500/40'
                    : 'bg-slate-950/50 border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
                      <code className="font-mono text-xs sm:text-sm font-bold text-emerald-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                        {item.code}
                      </code>
                    </div>
                    <p className="text-xs text-slate-300">{item.prompt}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={selected}
                      onChange={(e) => onUpdateDetective(item.id, e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="">-- Pilih Tipe Data --</option>
                      <option value="int">int (Integer)</option>
                      <option value="float">float (Float)</option>
                      <option value="str">str (String)</option>
                      <option value="bool">bool (Boolean)</option>
                      <option value="list">list (List/Array)</option>
                    </select>

                    {isAnswered && (
                      <span className={`p-1.5 rounded-lg ${isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </span>
                    )}
                  </div>
                </div>

                {isAnswered && !isCorrect && (
                  <p className="text-[11px] text-amber-300/90 mt-2 pt-2 border-t border-slate-800/80 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>Petunjuk: {item.hint}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tantangan 2: Uji Validitas Aturan Penamaan Variabel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Tantangan 2: Uji Kelayakan Nama Variabel Python</h3>
              <p className="text-xs text-slate-400">
                Tentukan apakah nama variabel di bawah ini SAH (Valid) atau TIDAK SAH (Syntax Error) dalam Python!
              </p>
            </div>
          </div>
          <div className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Skor: <span className="text-emerald-400 font-bold">{validNameScore}</span> / {VARIABLE_NAME_RULES.length}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {VARIABLE_NAME_RULES.map((rule) => {
            const currentAnswer = validNameAnswers[rule.name];
            const isAnswered = currentAnswer !== null && currentAnswer !== undefined;
            const isCorrect = currentAnswer === rule.valid;

            return (
              <div
                key={rule.name}
                className={`p-3.5 rounded-xl border transition ${
                  isAnswered
                    ? isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : 'bg-rose-950/20 border-rose-500/40'
                    : 'bg-slate-950/50 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <code className="font-mono text-xs sm:text-sm font-bold text-white bg-slate-900 px-2 py-1 rounded border border-slate-700">
                    {rule.name}
                  </code>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onUpdateValidName(rule.name, true)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                        currentAnswer === true
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      SAH (Valid)
                    </button>
                    <button
                      onClick={() => onUpdateValidName(rule.name, false)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                        currentAnswer === false
                          ? 'bg-rose-500 text-white font-bold shadow'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      TIDAK SAH
                    </button>
                  </div>
                </div>

                {isAnswered && (
                  <p className={`text-[11px] mt-2 pt-2 border-t border-slate-800/80 ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {rule.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition"
          >
            <span>Lanjut ke Kegiatan 3: Perulangan (Loops)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
