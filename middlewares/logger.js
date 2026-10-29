const { formatWaktu } = require('../utils/format');

// Middleware logger: mencatat setiap request yang masuk ke terminal.
// Yang dicatat: waktu (timestamp), method HTTP, path/endpoint,
// status response, dan lama proses.
const logger = (req, res, next) => {
  const mulai = Date.now();

  // Ditulis saat response selesai dikirim, supaya status code sudah diketahui
  res.on('finish', () => {
    const durasi = Date.now() - mulai;
    console.log(
      `[${formatWaktu()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${durasi}ms`
    );
  });

  next();
};

module.exports = logger;
