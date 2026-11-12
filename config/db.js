const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'laundry_db',
    password: process.env.DB_PASSWORD || 'password_kamu',
    port: process.env.DB_PORT || 5432,
});

// Tanpa handler ini, server akan crash kalau koneksi database terputus
// (misalnya PostgreSQL di-restart). Dengan handler ini server tetap hidup.
pool.on('error', (err) => {
    console.error('Koneksi database terputus:', err.message);
});

// Cek koneksi sekali saat server menyala, lalu kembalikan koneksi ke pool.
pool.query('SELECT 1')
    .then(() => console.log('Berhasil terhubung ke Database PostgreSQL'))
    .catch((err) => console.error('Koneksi Database Gagal!', err.message));

module.exports = pool;