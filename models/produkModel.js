// WAJIB panggil file db.js secara spesifik!
const db = require('../config/db');

// READ ALL
const getAllProducts = async () => {
    const result = await db.query('SELECT * FROM produk ORDER BY id ASC');
    return result.rows;
};

// READ BY ID
const getProductById = async (id) => {
    const result = await db.query('SELECT * FROM produk WHERE id = $1', [id]);
    return result.rows[0];
};

// CREATE
const createProduct = async (data) => {
    const { nama, kategori, deskripsi, harga, satuan, estimasi } = data;
    const result = await db.query(
        `INSERT INTO produk (nama, kategori, deskripsi, harga, satuan, estimasi) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [nama, kategori, deskripsi, harga, satuan, estimasi]
    );
    return result.rows[0];
};

// UPDATE
const updateProduct = async (id, data) => {
    const { nama, kategori, deskripsi, harga, satuan, estimasi } = data;
    const result = await db.query(
        `UPDATE produk 
         SET nama = $1, kategori = $2, deskripsi = $3, harga = $4, satuan = $5, estimasi = $6 
         WHERE id = $7 RETURNING *`,
        [nama, kategori, deskripsi, harga, satuan, estimasi, id]
    );
    return result.rows[0];
};

// DELETE
const deleteProduct = async (id) => {
    const result = await db.query('DELETE FROM produk WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = { 
    getAllProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct 
};