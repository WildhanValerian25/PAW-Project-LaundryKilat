Bukti pengerjaan WEEK 7 
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4819e003-9a68-4842-93d8-cd34d51610e3" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e630fd95-6d95-4dd0-95fd-13c46e35c077" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2a96f9b3-74f3-4e48-9114-bd9cf0ca04e6" />
Aplikasi web Laundry Kilat untuk praktikum Pemrograman Aplikasi Web (PAW). Dibangun dengan Node.js, Express.js, EJS, dan Tailwind CSS (CDN) menggunakan pola Model-View-Controller (MVC). Data layanan masih berupa array statis yang dikelola melalui Model.

## Fitur

- Halaman frontend dirender dengan EJS dan berjalan di localhost
- Daftar paket layanan laundry yang datanya berasal dari backend
- Formulir pemesanan dengan validasi nama, nomor WhatsApp, dan paket (lanjutan Week 6)
- Endpoint REST API `/api/status` dan `/api/produk` dalam format JSON
- Middleware logger yang mencatat setiap request di terminal

## Teknologi

- Node.js + Express.js
- EJS (view engine)
- Tailwind CSS via CDN
- Pola MVC

## Cara menjalankan

```bash
npm install
npm run dev      # atau: npm start
```

Buka http://localhost:5173

## Endpoint

| Method | URL | Keterangan |
|---|---|---|
| GET | `/` | Halaman frontend (EJS) |
| GET | `/api/status` | Status server dalam JSON |
| GET | `/api/produk` | Daftar layanan laundry dalam array JSON |

Contoh respons `/api/status`:

```json
{
  "status": "ok",
  "aplikasi": "Laundry Kilat",
  "pesan": "Server berjalan dengan baik",
  "uptimeDetik": 12,
  "waktuServer": "2026-10-29T06:20:18.194Z"
}
```

## Middleware logger

Setiap request dicatat di terminal oleh `middlewares/logger.js`. Yang dicatat: waktu request, method HTTP, endpoint, status response, dan lama proses.

```
[2026-10-29 13:20:05] GET /api/produk 200 - 3ms
```

## Struktur folder

```
project/
├── config/        konfigurasi aplikasi (nama, port)
├── models/        data layanan laundry (array statis)
├── middlewares/   logger request HTTP
├── controllers/   logika halaman dan API
├── routes/        pemetaan URL ke controller
├── views/         template EJS + partials
├── utils/         fungsi bantuan (format rupiah, format waktu)
├── app.js         entry point aplikasi
└── package.json   dependencies dan script
```

## Checklist Week 7

- [x] Halaman frontend berhasil ditampilkan melalui localhost
- [x] Endpoint `/api/status` mengirimkan JSON
- [x] Endpoint `/api/produk` mengirimkan data array JSON
- [x] Middleware logger mencatat request yang masuk
- [x] Repository GitHub dibuat sesuai ketentuan kelas
- [x] Anggota kelompok telah diundang ke repository bersama
- [x] Perubahan kode telah di-commit dan di-push ke GitHub
