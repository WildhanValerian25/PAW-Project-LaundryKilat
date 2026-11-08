const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Route khusus untuk status API (opsional)
router.get('/status', (req, res) => {
    res.json({ status: "API Berjalan Normal" });
});

// Endpoint CRUD utama yang terhubung ke apiController
router.get('/produk', apiController.produk);        // READ ALL
router.post('/produk', apiController.create);       // CREATE
router.put('/produk/:id', apiController.update);    // UPDATE
router.delete('/produk/:id', apiController.delete); // DELETE

module.exports = router;