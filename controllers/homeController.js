const ProdukModel = require('../models/produkModel');
const config = require('../config');

// GET / -> render halaman utama dengan data produk dari PostgreSQL
exports.index = async (req, res) => {
  try {
    const produkData = await ProdukModel.getAllProducts();
    
    res.render('index', {
      judul: 'Laundry Kilat - Integrasi Database & CRUD',
      namaApp: 'Laundry Kilat',
      tagline: 'Cucian Bersih dan Rapi',
      produk: produkData || []
    });
  } catch (err) {
    console.error("Gagal memuat halaman utama:", err);
    // Tampilkan pesan error detail di browser agar mudah didiagnosis
    res.status(500).send(`
      <h2>Terjadi Kesalahan pada Server</h2>
      <p><b>Detail Error:</b> ${err.message}</p>
      <hr>
      <p>Cek terminal VS Code atau pastikan PostgreSQL sudah berjalan dan tabel 'produk' sudah dibuat.</p>
    `);
  }
};