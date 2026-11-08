const ProdukModel = require('../models/produkModel');

// GET /api/produk (Menampilkan semua data ke Frontend)
exports.produk = async (req, res) => {
    try {
        const data = await ProdukModel.getAllProducts();
        res.json(data); // Kirim langsung array datanya agar EJS bisa melakukan .forEach()
    } catch (err) {
        console.error("Error GET API:", err);
        res.status(500).json({ error: err.message });
    }
};

// POST /api/produk (Menambah data baru)
exports.create = async (req, res) => {
    try {
        const data = await ProdukModel.createProduct(req.body);
        res.status(201).json(data);
    } catch (err) {
        console.error("Error POST API:", err);
        res.status(500).json({ error: err.message });
    }
};

// PUT /api/produk/:id (Mengubah data)
exports.update = async (req, res) => {
    try {
        const data = await ProdukModel.updateProduct(req.params.id, req.body);
        res.json(data);
    } catch (err) {
        console.error("Error PUT API:", err);
        res.status(500).json({ error: err.message });
    }
};

// DELETE /api/produk/:id (Menghapus data)
exports.delete = async (req, res) => {
    try {
        await ProdukModel.deleteProduct(req.params.id);
        res.json({ message: "Berhasil dihapus" });
    } catch (err) {
        console.error("Error DELETE API:", err);
        res.status(500).json({ error: err.message });
    }
};