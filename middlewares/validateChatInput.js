const geminiConfig = require('../config/gemini');
const { bersihkanPesan, terdeteksiInjection } = require('../utils/promptGuard');

// Middleware validasi untuk POST /api/chat.
// Request yang tidak lolos validasi langsung ditolak di sini,
// sehingga tidak pernah dikirim ke Gemini.
const tolak = (res, status, kode, pesan) =>
  res.status(status).json({ success: false, error: { code: kode, message: pesan } });

const validateChatInput = (req, res, next) => {
  const { message } = req.body || {};

  if (message === undefined || message === null) {
    return tolak(res, 400, 'MESSAGE_REQUIRED', 'Field "message" wajib diisi.');
  }

  if (typeof message !== 'string') {
    return tolak(res, 400, 'MESSAGE_INVALID', 'Field "message" harus berupa teks.');
  }

  const pesan = bersihkanPesan(message);

  if (pesan.length === 0) {
    return tolak(res, 400, 'MESSAGE_EMPTY', 'Pesan tidak boleh kosong.');
  }

  if (pesan.length > geminiConfig.maxMessageLength) {
    return tolak(
      res,
      400,
      'MESSAGE_TOO_LONG',
      `Pesan terlalu panjang. Maksimal ${geminiConfig.maxMessageLength} karakter.`
    );
  }

  if (terdeteksiInjection(pesan)) {
    return tolak(
      res,
      400,
      'PROMPT_INJECTION',
      'Maaf, pesan ini tidak dapat diproses karena mencoba mengubah aturan asisten. ' +
        'Silakan tanyakan seputar layanan Laundry Kilat.'
    );
  }

  // Simpan pesan yang sudah bersih untuk dipakai controller.
  req.chatMessage = pesan;
  next();
};

module.exports = validateChatInput;