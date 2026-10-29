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
app.use(express.json());

// Routes
app.use('/', routes);

// 404 untuk URL yang tidak terdaftar
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ status: 'error', pesan: 'Endpoint tidak ditemukan' });
  }
  res.status(404).send('Halaman tidak ditemukan');
});

app.listen(config.port, () => {
  console.log(`${config.appName} berjalan di http://localhost:${config.port}`);
});
