const geminiConfig = require('../config/gemini');

// Pembatas jumlah request chat per IP, supaya kuota Gemini (free tier)
// tidak habis karena spam. Disimpan di memori, cukup untuk skala praktikum.
const riwayat = new Map(); // ip -> array timestamp request

const chatRateLimiter = (req, res, next) => {
  const { windowMs, maxRequests } = geminiConfig.rateLimit;
  const sekarang = Date.now();
  const ip = req.ip || 'unknown';

  const daftar = (riwayat.get(ip) || []).filter((waktu) => sekarang - waktu < windowMs);

  if (daftar.length >= maxRequests) {
    const tungguDetik = Math.ceil((windowMs - (sekarang - daftar[0])) / 1000);
    res.set('Retry-After', String(tungguDetik));
    return res.status(429).json({
      success: false,
      error: {
        code: 'RATE_LIMITED',
        message: `Terlalu banyak pertanyaan. Coba lagi dalam ${tungguDetik} detik.`,
      },
    });
  }

  daftar.push(sekarang);
  riwayat.set(ip, daftar);
  next();
};

module.exports = chatRateLimiter;