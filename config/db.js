const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'laundry_db',
    password: process.env.DB_PASSWORD || 'password_kamu',
    port: process.env.DB_PORT || 5432,
});

pool.connect((err) => {
    if (err) {
        console.error('Koneksi Database Gagal!', err.stack);
    } else {
        console.log('Berhasil terhubung ke Database PostgreSQL');
    }
});

module.exports = pool;