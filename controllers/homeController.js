const ProdukModel = require('../models/produkModel');
const config = require('../config');
const { formatRupiah } = require('../utils/format');

// GET /  -> render halaman utama dengan data produk dari Model
exports.index = (req, res) => {
  res.render('index', {
    judul: `${config.appName} | ${config.tagline}`,
    namaApp: config.appName,
    tagline: config.tagline,
    produk: ProdukModel.getAll(),
    formatRupiah,
  });
};
