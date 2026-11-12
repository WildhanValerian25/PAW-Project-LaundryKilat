require('dotenv').config(); // muat .env paling awal (DB & GEMINI_API_KEY)

const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('./middlewares/logger');
const routes = require('./routes');

const app = express();

// View engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware (logger dipasang paling awal agar semua request tercatat)
app.use(logger);
app.use(express.json({ limit: '10kb' })); // batasi ukuran body request

// Routes
app.use('/', routes);

// 404 untuk URL yang tidak terdaftar
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ status: 'error', pesan: 'Endpoint tidak ditemukan' });
  }
  res.status(404).send('Halaman tidak ditemukan');
});

// Error handler: body JSON rusak atau terlalu besar
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_JSON', message: 'Format JSON pada body request tidak valid.' },
    });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      error: { code: 'PAYLOAD_TOO_LARGE', message: 'Ukuran request terlalu besar.' },
    });
  }
  console.error(err);
  res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Terjadi kesalahan pada server.' } });
});

app.listen(config.port, () => {
  console.log(`${config.appName} berjalan di http://localhost:${config.port}`);
});