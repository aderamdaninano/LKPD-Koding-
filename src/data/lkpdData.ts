import { QuizQuestion } from '../types/lkpd';

export const LKPD_METADATA = {
  title: 'LEMBAR KERJA PESERTA DIDIK (LKPD) DIGITAL INTERAKTIF',
  subtitle: 'Materi: Mengenal Pemrograman Python (Variabel, Tipe Data, dan Perulangan)',
  subject: 'Koding dan Kecerdasan Artifisial',
  grade: 'Kelas X (Fase E - SMA / SMK)',
  timeAllocation: '2 x 45 Menit (Pertemuan 1 & 2)',
  semester: 'Ganjil / Genap',
  curriculum: 'Kurikulum Merdeka',
  coreCompetencies: {
    cp: 'Pada akhir Fase E, peserta didik mampu menerapkan prinsip berpikir komputasional dalam memodelkan persoalan, merancang algoritma terstruktur dengan bahasa pemrograman Python (variabel, tipe data, dan kontrol alur perulangan), serta memahami relevansinya dalam pengembangan sistem kecerdasan artifisial (AI).',
    tp: [
      'Menjelaskan konsep variabel sebagai alokasi memori serta menerapkan aturan sintaks penamaan variabel dalam Python.',
      'Mengidentifikasi, menguji, dan membedakan tipe data dasar (int, float, str, bool, list) dalam representasi data komputer.',
      'Menganalisis dan mengimplementasikan struktur perulangan (for loop dan while loop) untuk otomasi iterasi data berulang.',
      'Menghubungkan konsep variabel dan perulangan dengan cara kerja model kecerdasan artifisial (iterasi epoch dan akumulasi data).'
    ],
    ppp: [
      { trait: 'Bernalar Kritis', desc: 'Menganalisis kesalahan logika kode (debugging) dan menentukan tipe data yang presisi.' },
      { trait: 'Kreatif', desc: 'Menyusun solusi algoritma perulangan untuk memecahkan persoalan komputasi nyata.' },
      { trait: 'Mandiri', desc: 'Menyelesaikan eksplorasi interaktif dan uji kode secara bertahap dengan rasa percaya diri.' }
    ]
  }
};

export const INITIAL_VARIABLES = [
  { id: '1', name: 'nama_pengguna', value: '"Aisyah"', type: 'str' as const, description: 'Menyimpan teks identitas siswa' },
  { id: '2', name: 'usia', value: '16', type: 'int' as const, description: 'Menyimpan bilangan bulat tahun umur' },
  { id: '3', name: 'skor_akurasi', value: '94.75', type: 'float' as const, description: 'Menyimpan bilangan desimal akurasi model AI' },
  { id: '4', name: 'model_aktif', value: 'True', type: 'bool' as const, description: 'Menyimpan nilai kebenaran status sistem' },
  { id: '5', name: 'dataset_nilai', value: '[85, 90, 78, 92]', type: 'list' as const, description: 'Menyimpan sekumpulan data angka terurut' }
];

export const DETECTIVE_ITEMS = [
  { id: 'd1', code: 'suhu_cpu = 42.8', prompt: 'Variabel suhu_cpu menyimpan nilai 42.8', expectedType: 'float', hint: 'Memiliki tanda desimal (titik)' },
  { id: 'd2', code: 'nama_robot = "RoboAI_v1"', prompt: 'Variabel nama_robot menyimpan "RoboAI_v1"', expectedType: 'str', hint: 'Dikelilingi oleh tanda petik ganda' },
  { id: 'd3', code: 'jumlah_kamera = 4', prompt: 'Variabel jumlah_kamera menyimpan angka 4', expectedType: 'int', hint: 'Bilangan bulat tanpa desimal' },
  { id: 'd4', code: 'deteksi_wajah = True', prompt: 'Variabel deteksi_wajah bernilai True', expectedType: 'bool', hint: 'Hanya bernilai True atau False' },
  { id: 'd5', code: 'label_kelas = ["Kucing", "Anjing", "Burung"]', prompt: 'Variabel label_kelas menyimpan daftar kata dalam kurung siku', expectedType: 'list', hint: 'Kumpulan nilai dalam kurung siku [ ]' }
];

export const VARIABLE_NAME_RULES = [
  { name: 'nama_siswa', valid: true, explanation: 'Benar: Menggunakan huruf kecil dan garis bawah (snake_case).' },
  { name: '1st_ranking', valid: false, explanation: 'Salah: Nama variabel Python TIDAK boleh diawali dengan angka.' },
  { name: 'total_skor_ai', valid: true, explanation: 'Benar: Kombinasi huruf dan underscore yang deskriptif.' },
  { name: 'nilai siswa', valid: false, explanation: 'Salah: Nama variabel TIDAK boleh memuat spasi.' },
  { name: 'class', valid: false, explanation: 'Salah: "class" adalah kata kunci khusus (reserved keyword) dalam Python.' },
  { name: 'akurasi_2026', valid: true, explanation: 'Benar: Angka boleh berada di tengah atau akhir variabel.' }
];

export const LOOP_DEMOS = [
  {
    id: 'for_range',
    title: 'Perulangan FOR dengan range()',
    description: 'Digunakan saat kita sudah tahu berapa kali perulangan harus berjalan secara pasti (contoh: epoch training 5 kali).',
    code: `# Simulasi training model AI 5 putaran (epoch)
for epoch in range(1, 6):
    print(f"Melatih Epoch ke-{epoch} selesai.")
print("Proses training AI selesai!")`
  },
  {
    id: 'for_list',
    title: 'Perulangan FOR pada Elemen List',
    description: 'Mengunjungi setiap item dalam sekumpulan data list satu per satu secara berurutan.',
    code: `sensor_jarak = [15, 28, 9, 34, 12]
for jarak in sensor_jarak:
    if jarak < 10:
        print(f"Jarak {jarak} cm: PERINGATAN! Objek terlalu dekat!")
    else:
        print(f"Jarak {jarak} cm: Jalur aman.")`
  },
  {
    id: 'while_loop',
    title: 'Perulangan WHILE dengan Kondisi',
    description: 'Berjalan selama syarat kondisi masih bernilai True. Hati-hati dengan variabel increment agar tidak macet selamanya (infinite loop)!',
    code: `baterai = 3
while baterai > 0:
    print(f"Daya tersisa: {baterai} bar. Robot AI sedang bertugas...")
    baterai -= 1
print("Baterai habis! Robot kembali ke dock pengisian daya.")`
  }
];

export const DEBUG_CHALLENGES = [
  {
    id: 'ch1',
    title: 'Kasus 1: Menghentikan Infinite Loop pada Robot Pembersih',
    story: 'Siswa menulis kode agar robot mengepel 3 lantai. Namun variabel counter tidak pernah bertambah, akibatnya robot berputar tanpa henti!',
    buggyCode: `lantai = 1
while lantai <= 3:
    print(f"Membersihkan lantai {lantai}")
    # Ada baris kode yang lupa ditulis di sini!
print("Semua lantai bersih!")`,
    solutionSnippet: 'lantai += 1',
    hint: 'Tambahkan penambahan nilai counter "lantai += 1" di dalam blok while sebelum baris terakhir.'
  },
  {
    id: 'ch2',
    title: 'Kasus 2: Menghitung Total Nilai Akurasi Sensor',
    story: 'Program bermaksud menjumlahkan 3 angka akurasi model AI, namun perulangan for tidak memasukkan nilai ke variabel penampung.',
    buggyCode: `akurasi = [80, 85, 90]
total = 0
for nilai in akurasi:
    # Perbaiki baris di bawah agar total terus bertambah
    total = nilai
print("Total akurasi:", total)`,
    solutionSnippet: 'total += nilai',
    hint: 'Gunakan operator akumulasi "total += nilai" atau "total = total + nilai", bukan mengganti langsung nilainya.'
  }
];

export const PROJECT_STARTER = `# MINI PROYEK KODING & AI: "SISTEM MONITORING MODEL KLASIFIKASI"
# Selesaikan 3 tugas di bawah ini:
# 1. Buat variabel nama_model (string) dan ambang_batas (float: 75.0)
# 2. Siapkan list data_akurasi = [82.5, 68.0, 91.0, 74.5, 88.0]
# 3. Buat perulangan 'for' untuk memeriksa setiap nilai dalam data_akurasi:
#    - Jika nilai >= ambang_batas, cetak: f"Akurasi {nilai}%: LOLOS"
#    - Jika kurang, cetak: f"Akurasi {nilai}%: EVALUASI"

# TULIS KODE PYTHON KAMU DI BAWAH INI:
nama_model = "VisionClassifier_Alpha"
ambang_batas = 75.0
data_akurasi = [82.5, 68.0, 91.0, 74.5, 88.0]

print(f"--- LAPORAN PENGUJIAN {nama_model} ---")
for nilai in data_akurasi:
    if nilai >= ambang_batas:
        print(f"Akurasi {nilai}%: LOLOS")
    else:
        print(f"Akurasi {nilai}%: EVALUASI")
`;

export const FORMATIVE_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Di antara pilihan nama variabel Python berikut, manakah penamaan yang SAH (valid) menurut aturan sintaksis Python?',
    options: [
      { key: 'A', text: '2nd_model_ai = "Vision"' },
      { key: 'B', text: 'total skor = 100' },
      { key: 'C', text: 'tingkat_akurasi = 0.95' },
      { key: 'D', text: 'for = 10' }
    ],
    correctKey: 'C',
    explanation: 'Sintaks Python melarang penamaan variabel diawali angka (A), menggunakan spasi (B), atau memakai kata kunci sistem reserved keyword seperti "for" (D). "tingkat_akurasi" adalah penulisan snake_case yang sah dan ideal.'
  },
  {
    id: 2,
    question: 'Perhatikan potongan kode Python berikut:\n\nsensor_status = False\ntemp = 36.6\n\nSecara berturut-turut, apakah tipe data dari variabel sensor_status dan temp?',
    options: [
      { key: 'A', text: 'str dan int' },
      { key: 'B', text: 'bool dan float' },
      { key: 'C', text: 'bool dan int' },
      { key: 'D', text: 'list dan float' }
    ],
    correctKey: 'B',
    explanation: 'Nilai False tanpa tanda petik merupakan tipe data Boolean (bool), sedangkan bilangan yang memiliki tanda koma desimal titik (36.6) merupakan Floating Point (float).'
  },
  {
    id: 3,
    question: 'Berapakah output angka terakhir yang dicetak oleh perulangan berikut ini?\n\nfor i in range(2, 8, 2):\n    print(i)',
    options: [
      { key: 'A', text: '6' },
      { key: 'B', text: '8' },
      { key: 'C', text: '7' },
      { key: 'D', text: '10' }
    ],
    correctKey: 'A',
    explanation: 'Fungsi range(start, stop, step) yaitu range(2, 8, 2) menghasilkan urutan: 2, 4, 6. Nilai stop (8) bersifat eksklusif (tidak diikutsertakan). Sehingga angka terakhir yang dicetak adalah 6.'
  },
  {
    id: 4,
    question: 'Dalam pengembangan Kecerdasan Artifisial (AI), proses iterasi pelatihan model (training loop / epoch) paling tepat diimplementasikan menggunakan konsep pemrograman apa?',
    options: [
      { key: 'A', text: 'Percabangan if-else tunggal' },
      { key: 'B', text: 'Perulangan (Looping) for atau while' },
      { key: 'C', text: 'Konversi tipe data str ke int' },
      { key: 'D', text: 'Pemberian nama variabel dengan huruf kapital' }
    ],
    correctKey: 'B',
    explanation: 'Training AI membutuhkan algoritma yang membaca jutaan sampel data secara berulang (iteratif) dan memperbarui bobot (weights) pada setiap epoch, yang secara mutlak dikendalikan oleh struktur perulangan (loops).'
  },
  {
    id: 5,
    question: 'Perhatikan kode while loop berikut:\n\nx = 5\nwhile x > 0:\n    print(x)\n    x -= 2\n\nBerapa kali kata angka dicetak di terminal sebelum loop berhenti?',
    options: [
      { key: 'A', text: '2 kali (angka 5 dan 3)' },
      { key: 'B', text: '3 kali (angka 5, 3, dan 1)' },
      { key: 'C', text: '5 kali (angka 5, 4, 3, 2, 1)' },
      { key: 'D', text: 'Tidak pernah berhenti (Infinite loop)' }
    ],
    correctKey: 'B',
    explanation: 'Iterasi 1: x=5 (cetak 5, x jadi 3). Iterasi 2: x=3 (cetak 3, x jadi 1). Iterasi 3: x=1 (cetak 1, x jadi -1). Iterasi 4: kondisi -1 > 0 False, loop selesai. Total dicetak 3 kali (5, 3, 1).'
  }
];

export const TEACHER_GUIDE = {
  rubric: [
    {
      aspect: 'Pemahaman Konsep Variabel & Tipe Data',
      scale4: 'Mampu menjelaskan definisi variabel dan menentukan seluruh tipe data (int, float, str, bool, list) dengan 100% tepat.',
      scale3: 'Mampu menentukan 4 tipe data dengan tepat dan memahami aturan penamaan variabel.',
      scale2: 'Mampu menentukan 2-3 tipe data namun masih keliru pada penamaan variabel.',
      scale1: 'Belum mampu membedakan tipe data dasar.'
    },
    {
      aspect: 'Keterampilan Algoritma Perulangan (Loops)',
      scale4: 'Mampu menganalisis alur for/while loop, mendeteksi infinite loop, dan memecahkan studi kasus debugging.',
      scale3: 'Mampu menjalankan perulangan sederhana dan memahami parameter range(start, stop, step).',
      scale2: 'Dapat menulis loop sederhana namun mengalami kesulitan saat menentukan kondisi berhenti.',
      scale1: 'Belum memahami sintaks perulangan dalam Python.'
    },
    {
      aspect: 'Penerapan Kontekstual dalam Kecerdasan Artifisial',
      scale4: 'Mampu mengaitkan variabel dan perulangan dengan pemrosesan dataset AI serta menyelesaikan Mini Proyek Mandiri.',
      scale3: 'Menyelesaikan mini proyek dengan sedikit bimbingan guru/petunjuk interaktif.',
      scale2: 'Menyelesaikan sebagian mini proyek namun logika seleksi masih belum sempurna.',
      scale1: 'Belum mencoba mini proyek koding.'
    }
  ]
};
