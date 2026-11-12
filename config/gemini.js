// Konfigurasi integrasi Google Gemini.
// API Key WAJIB diambil dari environment variable (file .env), tidak boleh
// ditulis langsung di kode dan tidak boleh dikirim ke frontend.
require('dotenv').config();

module.exports = {
  apiKey: process.env.GEMINI_API_KEY,

  // Model bisa diganti lewat .env tanpa mengubah kode.
  model: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',

  // Suhu rendah supaya jawaban konsisten dan tidak "mengarang".
  temperature: 0.2,

  // Batas panjang jawaban (jangan di bawah 512 agar JSON tidak terpotong).
  maxOutputTokens: 512,

  // Batas waktu menunggu respons Gemini (milidetik). 20000 = 20 detik.
  timeoutMs: 20000,

  // Batas input pengguna (dipakai middleware validateChatInput).
  maxMessageLength: 500,

  // Batas request chat per IP (dipakai middleware chatRateLimiter).
  rateLimit: {
    windowMs: 60 * 1000, // 1 menit
    maxRequests: 10,
  },
};