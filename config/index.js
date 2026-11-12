// Konfigurasi aplikasi. Port bisa diganti lewat environment variable PORT.
module.exports = {
  appName: 'Laundry Kilat',
  tagline: 'Cucian bersih, wangi, dan rapi tanpa repot',
  port: process.env.PORT || 5173,

  // Informasi toko yang dipakai AI Assistant sebagai sumber jawaban.
  // SESUAIKAN isinya dengan aturan laundry kalian. AI hanya akan menjawab
  // informasi toko berdasarkan daftar ini (dan data layanan di database).
  infoToko: [
    'Minimal order untuk layanan kiloan adalah 2 kg. Berat di bawah 2 kg tetap dihitung 2 kg.',
    'Berat cucian kiloan ditimbang di tempat, dan biaya dihitung dari hasil timbangan (dibulatkan ke 0,5 kg terdekat).',
    'Layanan satuan (misalnya sepatu atau bed cover) dihitung per item, tanpa minimal order.',
    'Pakaian berbahan sensitif (sutra, wol, kulit) sebaiknya memakai layanan satuan, bukan kiloan.',
  ],
};