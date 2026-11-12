// Fungsi bantuan untuk membersihkan input chat dan mendeteksi prompt injection.
// Dipakai oleh middlewares/validateChatInput.js (lapisan validasi di backend),
// sehingga pembatasan AI tidak hanya mengandalkan System Instruction.

// Pola kalimat yang umum dipakai untuk mengubah peran AI atau
// membuat AI mengabaikan aturan sistem (bahasa Indonesia dan Inggris).
const POLA_INJECTION = [
  /\b(abaikan|lupakan|hiraukan|langgar|hapus)\b.{0,40}\b(instruksi|perintah|aturan|batasan|prompt)\b/i,
  /\b(ignore|disregard|forget|override|bypass)\b.{0,40}\b(instructions?|rules?|prompts?|guidelines?|restrictions?)\b/i,
  /\b(system|sistem)\s*(prompt|instruction|instruksi)\b/i,
  /\binstruksi\s+sistem\b/i,
  /\b(kamu|anda)\s+(sekarang|mulai sekarang)\s+(adalah|menjadi|bukan)\b/i,
  /\b(you are now|from now on you|act as|pretend to be|roleplay as)\b/i,
  /\b(berpura-pura|pura-pura)\s+(menjadi|jadi|sebagai)\b/i,
  /\b(developer|god|jailbreak|unrestricted)\s*mode\b/i,
  /\bjailbreak\b/i,
  /\b(tampilkan|tunjukkan|bocorkan|ulangi|reveal|show|print|repeat)\b.{0,30}\b(prompt|instruksi|instructions?|aturan rahasia)\b/i,
  /\b(api[\s_-]?key|kunci api)\b/i,
];

// Rapikan teks: buang karakter kontrol, satukan spasi berlebih.
const bersihkanPesan = (teks) =>
  String(teks)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const terdeteksiInjection = (teks) => POLA_INJECTION.some((pola) => pola.test(teks));

module.exports = { bersihkanPesan, terdeteksiInjection };