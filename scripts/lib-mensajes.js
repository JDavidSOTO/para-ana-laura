// ══════════════════════════════════════════════════════
// Reglas del "mensaje del día". DEBEN coincidir con las de js/bento.js
// (la tarjeta de la portada): misma fecha de Colombia, mismo orden.
// ══════════════════════════════════════════════════════
'use strict';

const EPOCA = Date.UTC(2025, 0, 1);

/** 'YYYY-MM-DD' de hoy en Colombia, sin importar la zona horaria del servidor */
function fechaBogota(ahora = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit' }).format(ahora);
}

/** Número de día desde el 1 de enero de 2025 */
function indiceDelDia(fechaISO) {
  const [a, m, d] = fechaISO.split('-').map(Number);
  return Math.floor((Date.UTC(a, m - 1, d) - EPOCA) / 86400000);
}

/** Una línea = un mensaje; se ignoran líneas vacías y las que empiezan con # */
function leerMensajes(texto) {
  return String(texto).split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
}

function mensajeDelDia(mensajes, fechaISO) {
  const n = mensajes.length;
  return mensajes[((indiceDelDia(fechaISO) % n) + n) % n];
}

/** ¿Hay un recordatorio especial programado para esa fecha? (reminders.json) */
function hayRecordatorioEn(recordatorios, fechaISO) {
  return Array.isArray(recordatorios) && recordatorios.some((r) => r && r.fecha === fechaISO);
}

module.exports = { fechaBogota, indiceDelDia, leerMensajes, mensajeDelDia, hayRecordatorioEn };
