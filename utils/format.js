// Fungsi bantuan yang bisa dipakai ulang di controller maupun view.

// 12000 -> "Rp12.000"
const formatRupiah = (angka) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka);

// Date -> "2026-10-29 13:20:05" (waktu lokal, enak dibaca di terminal)
const formatWaktu = (tanggal = new Date()) => {
  const dua = (n) => String(n).padStart(2, '0');
  return (
    `${tanggal.getFullYear()}-${dua(tanggal.getMonth() + 1)}-${dua(tanggal.getDate())} ` +
    `${dua(tanggal.getHours())}:${dua(tanggal.getMinutes())}:${dua(tanggal.getSeconds())}`
  );
};

module.exports = { formatRupiah, formatWaktu };
