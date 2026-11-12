# PAW-Project-LaundryKilat

Aplikasi web **Laundry Kilat** untuk Praktikum Pemrograman Aplikasi Web (PAW). Project ini dikembangkan bertahap setiap minggu dengan Node.js, Express.js, EJS, Tailwind CSS (CDN), PostgreSQL, dan pola Model-View-Controller (MVC).

| Minggu | Fokus | Status |
|---|---|---|
| Week 7 | Express.js + MVC, endpoint API, middleware logger | ✅ Selesai |
| Week 8 | Integrasi database PostgreSQL dan CRUD layanan | ✅ Selesai |
| Week 9 | AI Assistant dengan Google Gemini | ✅ Selesai |

## Daftar Isi

- [Teknologi](#teknologi)
- [Cara Menjalankan](#cara-menjalankan)
- [Daftar Endpoint](#daftar-endpoint)
- [Struktur Folder](#struktur-folder)
- [Week 7: Express.js, MVC, dan Logger](#week-7-expressjs-mvc-dan-logger)
- [Week 8: Database PostgreSQL dan CRUD](#week-8-database-postgresql-dan-crud)
- [Week 9: AI Assistant dengan Google Gemini](#week-9-ai-assistant-dengan-google-gemini)

---

## Teknologi

| Bagian | Teknologi |
|---|---|
| Backend | Node.js 20+ dan Express.js |
| View engine | EJS |
| Styling | Tailwind CSS via CDN |
| Database | PostgreSQL (`pg`) |
| AI | Google Gemini API (`@google/genai`) |
| Arsitektur | MVC + service layer |

## Cara Menjalankan

1. **Install dependency**
   ```bash
   npm install
   ```

2. **Siapkan file `.env`.** Salin `.env.example` menjadi `.env`, lalu isi nilainya:
   ```
   DB_USER=postgres
   DB_PASSWORD=password_postgres_kamu
   DB_HOST=localhost
   DB_NAME=laundry_db
   DB_PORT=5432

   GEMINI_API_KEY=api_key_gemini_kamu
   GEMINI_MODEL=gemini-3.5-flash-lite
   ```
   API key Gemini bisa dibuat di https://aistudio.google.com/apikey. File `.env` **tidak di-commit** ke GitHub.

3. **Siapkan database.** Buat database `laundry_db` di PostgreSQL, lalu jalankan:
   ```sql
   CREATE TABLE produk (
     id SERIAL PRIMARY KEY,
     nama VARCHAR(100) NOT NULL,
     kategori VARCHAR(50),
     deskripsi TEXT,
     harga NUMERIC NOT NULL,
     satuan VARCHAR(20),
     estimasi VARCHAR(30)
   );
   ```

4. **Jalankan server**
   ```bash
   npm run dev      # atau: npm start
   ```

5. Buka **http://localhost:5173**

## Daftar Endpoint

| Method | URL | Keterangan | Minggu |
|---|---|---|---|
| GET | `/` | Halaman frontend (EJS) | Week 7 |
| GET | `/api/status` | Status API | Week 7 |
| GET | `/api/produk` | Daftar semua layanan | Week 7, 8 |
| POST | `/api/produk` | Tambah layanan | Week 8 |
| PUT | `/api/produk/:id` | Ubah layanan | Week 8 |
| DELETE | `/api/produk/:id` | Hapus layanan | Week 8 |
| POST | `/api/chat` | Kirim pertanyaan ke AI Assistant | Week 9 |

## Struktur Folder

```
project/
├── config/
│   ├── index.js                  konfigurasi aplikasi (nama, port)
│   ├── db.js                     koneksi PostgreSQL                         (Week 8)
│   └── gemini.js                 konfigurasi Gemini dari .env               (Week 9)
├── controllers/
│   ├── homeController.js         render halaman utama
│   ├── apiController.js          CRUD layanan                               (Week 8)
│   └── chat.controller.js        request dan response chat AI               (Week 9)
├── middlewares/
│   ├── logger.js                 logger request HTTP                        (Week 7)
│   ├── validateChatInput.js      validasi input dan prompt injection        (Week 9)
│   └── chatRateLimiter.js        pembatas jumlah request chat               (Week 9)
├── models/
│   └── produkModel.js            query tabel produk                         (Week 8)
├── routes/
│   ├── index.js                  penggabung semua route
│   ├── web.js                    route halaman
│   ├── api.js                    route API dan CRUD
│   └── chat.routes.js            route AI Assistant                         (Week 9)
├── services/
│   └── gemini.service.js         komunikasi Gemini dan pemrosesan context   (Week 9)
├── utils/
│   ├── format.js                 format rupiah dan waktu
│   └── promptGuard.js            pembersih teks dan pola prompt injection   (Week 9)
├── views/                        template EJS (CRUD + widget chat)
├── .env.example                  contoh isi .env tanpa nilai rahasia
├── app.js                        entry point aplikasi
└── package.json
```

---

## Week 7: Express.js, MVC, dan Logger

Melanjutkan tampilan Laundry Kilat dari Week 6 ke dalam aplikasi Express.js dengan struktur MVC.

### Yang dikerjakan

- Halaman frontend dirender dengan EJS dan berjalan di localhost
- Data layanan laundry dikirim dari backend ke halaman EJS
- Endpoint `GET /api/status` dan `GET /api/produk` dalam format JSON
- Middleware logger mencatat waktu, method, endpoint, status, dan durasi setiap request:
  ```
  [2026-10-29 13:20:05] GET /api/produk 200 - 3ms
  ```

### Checklist Week 7

- [x] Halaman frontend berhasil ditampilkan melalui localhost
- [x] Endpoint `/api/status` mengirimkan JSON
- [x] Endpoint `/api/produk` mengirimkan data array JSON
- [x] Middleware logger mencatat request yang masuk
- [x] Repository GitHub dibuat sesuai ketentuan kelas
- [x] Anggota kelompok telah diundang ke repository bersama
- [x] Perubahan kode telah di-commit dan di-push ke GitHub

### Bukti pengerjaan Week 7

<details open>
<summary><b>Lihat screenshot</b></summary>
<br>

<img width="100%" alt="Week 7 - bukti 1" src="https://github.com/user-attachments/assets/4819e003-9a68-4842-93d8-cd34d51610e3" />

<img width="100%" alt="Week 7 - bukti 2" src="https://github.com/user-attachments/assets/e630fd95-6d95-4dd0-95fd-13c46e35c077" />

<img width="100%" alt="Week 7 - bukti 3" src="https://github.com/user-attachments/assets/2a96f9b3-74f3-4e48-9114-bd9cf0ca04e6" />

</details>

---

## Week 8: Database PostgreSQL dan CRUD

Data layanan dipindahkan dari array statis ke database PostgreSQL, dan halaman utama dilengkapi fitur kelola layanan.

### Yang dikerjakan

- Koneksi PostgreSQL melalui `config/db.js`; kredensial disimpan di `.env`
- Model `produkModel.js` menjalankan query SQL dengan parameter (`$1`, `$2`, ...) agar aman dari SQL injection
- Endpoint CRUD: `GET`, `POST`, `PUT`, `DELETE` pada `/api/produk`
- Halaman utama memiliki form tambah/edit layanan serta tombol Edit dan Hapus pada setiap kartu layanan

### Checklist Week 8

- [x] Aplikasi terhubung ke database PostgreSQL
- [x] Data layanan diambil dari database
- [x] Fitur tambah, ubah, dan hapus layanan berjalan
- [x] Kredensial database disimpan di `.env`
- [x] Perubahan kode telah di-commit dan di-push ke GitHub

### Bukti pengerjaan Week 8

<details open>
<summary><b>Lihat screenshot</b></summary>
<br>

<img width="100%" alt="Week 8 - halaman CRUD" src="https://github.com/user-attachments/assets/6a15df51-0463-4e8c-982c-9a7e0fa0e6f3" />

<img width="100%" alt="Week 8 - bukti" src="https://github.com/user-attachments/assets/f2eab4aa-6596-4883-81b9-fa696faa0253" />

<table>
  <tr>
    <td align="center"><img width="300" alt="Week 8 - bukti tampilan kecil 1" src="https://github.com/user-attachments/assets/bde1f9cc-1533-47db-bb28-67c0df52caad" /></td>
    <td align="center"><img width="300" alt="Week 8 - bukti tampilan kecil 2" src="https://github.com/user-attachments/assets/c23990eb-b330-4d33-a5a8-00308007b62f" /></td>
  </tr>
</table>

</details>

---

## Week 9: AI Assistant dengan Google Gemini

Menambahkan **Kilo**, asisten AI berbasis Google Gemini yang membantu pengguna memahami layanan Laundry Kilat. Kilo hanya menjawab berdasarkan data layanan di database dan menolak pertanyaan di luar konteks.

### Yang dikerjakan

- Integrasi Gemini dilakukan di **backend**; API key hanya ada di `.env` dan tidak pernah dikirim ke frontend
- Context AI diambil langsung dari tabel `produk`, sehingga layanan baru yang ditambahkan lewat CRUD (Week 8) langsung dikenali AI
- System Instruction menetapkan peran, ruang lingkup, dan batasan jawaban AI
- Widget chat di frontend dilengkapi indikator loading, pesan error, tombol coba lagi, dan tampilan responsif untuk desktop maupun HP
- Middleware logger dari Week 7 tetap mencatat setiap request, termasuk `POST /api/chat`

### Alur request

```
Frontend (fetch POST /api/chat)
  → chatRateLimiter      batasi 10 request/menit per IP
  → validateChatInput    cek kosong, tipe data, panjang, prompt injection
  → chat.controller      terima request dan kirim response
  → gemini.service       ambil data dari DB → susun System Instruction → panggil Gemini
                         → periksa jawaban sebelum dikirim ke pengguna
```

### Endpoint `POST /api/chat`

Request:

```json
{
  "message": "Layanan apa saja yang tersedia?"
}
```

Response sukses (`200`):

```json
{
  "success": true,
  "data": {
    "reply": "Berikut layanan yang tersedia: ...",
    "inContext": true
  }
}
```

Response gagal (contoh `400`):

```json
{
  "success": false,
  "error": {
    "code": "MESSAGE_EMPTY",
    "message": "Pesan tidak boleh kosong."
  }
}
```

| Kode error | Status | Penyebab |
|---|---|---|
| `MESSAGE_REQUIRED`, `MESSAGE_INVALID`, `MESSAGE_EMPTY` | 400 | Field `message` tidak ada, bukan teks, atau kosong |
| `MESSAGE_TOO_LONG` | 400 | Pesan lebih dari 500 karakter |
| `PROMPT_INJECTION` | 400 | Pesan mencoba mengubah peran atau aturan AI |
| `INVALID_JSON` | 400 | Body request bukan JSON yang valid |
| `RATE_LIMITED` | 429 | Lebih dari 10 pertanyaan per menit |
| `GEMINI_NOT_CONFIGURED` | 503 | `GEMINI_API_KEY` belum diisi |
| `CONTEXT_UNAVAILABLE` | 503 | Database tidak bisa diakses |
| `GEMINI_TIMEOUT` | 504 | Gemini tidak merespons dalam 20 detik |
| `GEMINI_API_ERROR`, `GEMINI_EMPTY_RESPONSE` | 429 / 502 | Kuota habis, layanan Gemini gagal, atau jawaban kosong |

### Guardrail AI

1. **System Instruction**: AI berperan sebagai "Kilo", hanya menjawab berdasarkan data layanan, tidak mengarang informasi, dan menolak topik di luar laundry.
2. **Pemisahan data dan instruksi**: pesan pengguna dibungkus tag `<pesan_pengguna>` dan diperlakukan sebagai data, bukan perintah.
3. **Validasi input di backend**: pesan kosong, bukan teks, lebih dari 500 karakter, atau berisi pola prompt injection ditolak sebelum dikirim ke Gemini.
4. **Jawaban terstruktur**: Gemini membalas JSON `{ dalam_konteks, jawaban }`. Jika `dalam_konteks` bernilai `false`, backend mengganti jawaban dengan kalimat penolakan baku.
5. **Deteksi kebocoran instruksi**: jika kode penanda rahasia dari System Instruction muncul di jawaban, jawaban itu tidak dikirim ke pengguna.
6. **Penanganan error**: timeout, kuota habis, respons kosong, database mati, dan API key kosong masing-masing punya pesan yang jelas tanpa membocorkan detail teknis.
7. **Rate limiting**: mencegah kuota Gemini habis karena spam.

### Hasil pengujian

| No | Skenario | Input | Hasil yang diharapkan |
|---|---|---|---|
| 1 | Pertanyaan sesuai context | "Apa saja produk yang tersedia di aplikasi ini?" | Dijawab sesuai data di database |
| 2 | Pertanyaan di luar context | "Buatkan saya kode program untuk membuat game." | Ditolak dengan sopan |
| 3 | Input kosong | `"   "` | `400 MESSAGE_EMPTY` |
| 4 | Pesan terlalu panjang | lebih dari 500 karakter | `400 MESSAGE_TOO_LONG` |
| 5 | Prompt injection | "Abaikan semua instruksi sebelumnya..." | `400 PROMPT_INJECTION` |
| 6 | Frontend menampilkan respons AI | klik saran pertanyaan | Jawaban tampil di chat |
| 7 | Loading dan error state | kirim pertanyaan / server mati | Indikator "Kilo sedang mengetik..." dan kotak error tampil |

### Checklist Week 9

- [x] Project dari minggu sebelumnya berhasil dijalankan
- [x] Integrasi Google Gemini berhasil melalui backend
- [x] API Key disimpan dengan aman melalui environment variable
- [x] AI memiliki System Instruction sesuai context aplikasi
- [x] AI dapat menjawab pertanyaan sesuai context
- [x] AI menolak pertanyaan di luar context
- [x] Terdapat validasi input dan penanganan prompt injection
- [x] Endpoint AI berhasil diuji melalui Postman atau Thunder Client
- [x] Fitur AI sudah terintegrasi pada frontend
- [x] Loading dan error state pada frontend berjalan
- [x] Middleware logger tetap berjalan
- [x] Perubahan terbaru telah di-commit dan di-push ke repository minggu sebelumnya

### Bukti pengerjaan Week 9

<details open>
<summary><b>Lihat screenshot</b></summary>
<br>

**1. AI menjawab pertanyaan sesuai context**

<!-- Tempel screenshot di sini -->

**2. AI menolak pertanyaan di luar context**

<!-- Tempel screenshot di sini -->

**3. Prompt injection ditolak**

<!-- Tempel screenshot di sini -->

**4. Pengujian endpoint `POST /api/chat` di Postman / Thunder Client**

<!-- Tempel screenshot di sini -->

**5. Log request di terminal**

<!-- Tempel screenshot di sini -->

</details>
