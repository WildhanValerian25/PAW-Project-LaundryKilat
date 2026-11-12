const geminiService = require('../services/gemini.service');

// Terjemahkan error dari service menjadi status HTTP dan pesan yang aman
// ditampilkan ke pengguna. Detail teknis hanya dicatat di terminal backend.
const petakanError = (err) => {
  switch (err.code) {
    case 'GEMINI_NOT_CONFIGURED':
      return [503, 'Asisten AI belum dikonfigurasi. Hubungi admin aplikasi.'];
    case 'CONTEXT_UNAVAILABLE':
      return [503, 'Data layanan sedang tidak dapat dimuat. Coba lagi nanti.'];
    case 'GEMINI_TIMEOUT':
      return [504, 'Asisten AI terlalu lama merespons. Silakan coba lagi.'];
    case 'GEMINI_EMPTY_RESPONSE':
    case 'GEMINI_INVALID_RESPONSE':
      return [502, 'Asisten AI tidak memberikan jawaban. Silakan coba lagi.'];
    case 'GEMINI_API_ERROR': {
      const status = err.cause && err.cause.status;
      if (status === 429) return [429, 'Kuota asisten AI sedang habis. Coba lagi beberapa saat lagi.'];
      if (status === 400 || status === 401 || status === 403) {
        return [502, 'Konfigurasi asisten AI bermasalah. Hubungi admin aplikasi.'];
      }
      return [502, 'Layanan Gemini sedang tidak tersedia. Silakan coba lagi.'];
    }
    default:
      return [500, 'Terjadi kesalahan pada server.'];
  }
};

// POST /api/chat
exports.chat = async (req, res) => {
  try {
    const { reply, inContext } = await geminiService.tanyaAsisten(req.chatMessage);
    res.json({ success: true, data: { reply, inContext } });
  } catch (err) {
    console.error(`[chat] ${err.code || 'UNKNOWN'}: ${err.message}`);
    const [status, message] = petakanError(err);
    res.status(status).json({
      success: false,
      error: { code: err.code || 'INTERNAL_ERROR', message },
    });
  }
};