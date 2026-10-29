// Data layanan laundry masih berupa array statis (belum memakai database).
// Kalau nanti pindah ke database, cukup ubah isi model ini;
// controller dan route tidak perlu diubah.
const daftarProduk = [
  {
    id: 1,
    nama: 'Cuci Kering Lipat',
    kategori: 'Kiloan',
    deskripsi: 'Pakaian dicuci, dikeringkan, lalu dilipat rapi.',
    harga: 6000,
    satuan: 'kg',
    estimasi: '2 hari',
  },
  {
    id: 2,
    nama: 'Cuci Komplit (Reguler)',
    kategori: 'Kiloan',
    deskripsi: 'Paket lengkap: cuci, kering, setrika, dan pewangi.',
    harga: 8000,
    satuan: 'kg',
    estimasi: '2 hari',
  },
  {
    id: 3,
    nama: 'Setrika Saja',
    kategori: 'Kiloan',
    deskripsi: 'Untuk pakaian yang sudah bersih dan tinggal dirapikan.',
    harga: 5000,
    satuan: 'kg',
    estimasi: '1 hari',
  },
  {
    id: 4,
    nama: 'Cuci Express (1 Hari)',
    kategori: 'Kilat',
    deskripsi: 'Cuci setrika selesai dalam 1 hari.',
    harga: 15000,
    satuan: 'kg',
    estimasi: '1 hari',
  },
  {
    id: 5,
    nama: 'Bed Cover',
    kategori: 'Satuan',
    deskripsi: 'Bed cover ukuran single sampai king.',
    harga: 25000,
    satuan: 'pcs',
    estimasi: '3 hari',
  },
  {
    id: 6,
    nama: 'Cuci Sepatu',
    kategori: 'Satuan',
    deskripsi: 'Deep clean bagian luar, dalam, dan tali sepatu.',
    harga: 30000,
    satuan: 'pasang',
    estimasi: '3 hari',
  },
];

const ProdukModel = {
  getAll() {
    return daftarProduk;
  },
};

module.exports = ProdukModel;
