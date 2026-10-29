const ProdukModel = require('../models/produkModel');
const config = require('../config');

// GET /api/status
exports.status = (req, res) => {
  res.status(200).json({
    status: 'ok',
    aplikasi: config.appName,
    pesan: 'Server berjalan dengan baik',
    uptimeDetik: Math.round(process.uptime()),
    waktuServer: new Date().toISOString(),
  });
};

// GET /api/produk
exports.produk = (req, res) => {
  const data = ProdukModel.getAll();
  res.status(200).json(data);
};
