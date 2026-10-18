/**
 * Confirmaciones de asistencia · Boda Jhair & Nayif
 *
 * Pega este código en Extensiones → Apps Script de tu Google Sheet
 * y publícalo como "Aplicación web" (ver README).
 * Cada confirmación se guarda como una fila en la hoja "Confirmaciones".
 */
const HOJA = 'Confirmaciones';
const COLUMNAS = ['Fecha', 'Nombre', '¿Asistirá?', 'Acompañantes', 'Total personas', 'Celular', 'Mensaje'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const hoja = obtenerHoja_();
    const p = (e && e.parameter) || {};
    const asistira = p.asistira === 'Sí' ? 'Sí' : 'No';
    const acompanantes = asistira === 'Sí' ? Math.min(Math.max(parseInt(p.acompanantes, 10) || 0, 0), 10) : 0;
    hoja.appendRow([
      new Date(),
      limpiar_(p.nombre, 80),
      asistira,
      acompanantes,
      asistira === 'Sí' ? acompanantes + 1 : 0,
      limpiar_(p.telefono, 20),
      limpiar_(p.mensaje, 400)
    ]);
    return respuesta_({ ok: true });
  } catch (err) {
    return respuesta_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Abre la URL /exec en el navegador para comprobar que está activa.
function doGet() {
  return respuesta_({ ok: true, mensaje: 'Confirmaciones activas' });
}

function obtenerHoja_() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(HOJA);
  if (!hoja) {
    hoja = libro.insertSheet(HOJA);
    hoja.appendRow(COLUMNAS);
    hoja.setFrozenRows(1);
    hoja.getRange(1, 1, 1, COLUMNAS.length).setFontWeight('bold').setBackground('#f1cfc6');
    // Resumen a la derecha: total de personas que asistirán
    hoja.getRange('I1').setValue('Total que asistirán');
    hoja.getRange('I2').setFormula('=SUM(E2:E)');
    hoja.getRange('J1').setValue('Respuestas');
    hoja.getRange('J2').setFormula('=COUNTA(B2:B)');
    hoja.getRange('I1:J1').setFontWeight('bold');
  }
  return hoja;
}

// Evita que un texto se interprete como fórmula y recorta su largo.
function limpiar_(valor, max) {
  let s = String(valor || '').trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function respuesta_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
