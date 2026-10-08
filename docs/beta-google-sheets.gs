/**
 * Recibe los registros de la beta cerrada de Optipagos y los agrega a la hoja.
 * Se pega en Extensiones → Apps Script de la hoja (ver beta-google-sheets.md).
 */
const SECRET = "CAMBIA-ESTA-CLAVE"; // la misma que BETA_SHEET_SECRET en Vercel
const HEADERS = ["Fecha", "Nombre", "Correo", "WhatsApp", "Uso"];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) return reply({ ok: false, error: "forbidden" });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
      if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
      sheet.appendRow([new Date(), clean(data.name), clean(data.email), clean(data.phone), clean(data.use)]);
    } finally {
      lock.releaseLock();
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

// Evita que un valor que empiece con = + - @ se ejecute como fórmula en la hoja.
function clean(value) {
  const text = String(value || "").slice(0, 300);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
