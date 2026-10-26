// ══════════════════════════════════════════════════════
// RESTAURAR — vuelve a escribir en Firestore los datos de un respaldo.
//   node scripts/restaurar.js <carpeta-del-respaldo>              → SIMULACRO (no escribe nada)
//   node scripts/restaurar.js <carpeta-del-respaldo> --confirmar  → restaura de verdad
//
// · Cada documento del respaldo se escribe con su mismo id, reemplazando el
//   que haya ahora. Los documentos que existan en Firestore pero NO estén en
//   el respaldo se dejan como están (nunca se borra nada).
// ══════════════════════════════════════════════════════
'use strict';
const fs = require('fs');
const path = require('path');
const { importarColeccion, iniciarAdmin } = require('./lib-json');
const { EXCLUIDAS } = require('./respaldo');

async function restaurar(admin, db, carpeta, escribir) {
  const archivos = fs.readdirSync(carpeta).filter((f) => f.endsWith('.json') && !f.startsWith('_')).sort();
  if (!archivos.length) throw new Error(`No hay archivos de respaldo en "${carpeta}".`);
  let total = 0;
  for (const archivo of archivos) {
    const { coleccion, documentos } = JSON.parse(fs.readFileSync(path.join(carpeta, archivo), 'utf8'));
    if (!coleccion || !Array.isArray(documentos)) throw new Error(`El archivo ${archivo} no tiene el formato esperado.`);
    if (EXCLUIDAS.includes(coleccion)) continue;
    const n = await importarColeccion(db.collection(coleccion), documentos, { admin, db, escribir });
    console.log(`  ${coleccion}: ${n} documento(s) ${escribir ? 'restaurados' : 'se restaurarían'}`);
    total += n;
  }
  return total;
}

module.exports = { restaurar };

if (require.main === module) {
  const carpeta = process.argv[2];
  const escribir = process.argv.includes('--confirmar');
  if (!carpeta) { console.error('Uso: node scripts/restaurar.js <carpeta-del-respaldo> [--confirmar]'); process.exit(1); }
  const admin = iniciarAdmin();
  console.log(escribir ? 'Restaurando datos en Firestore…' : 'SIMULACRO (no se escribe nada; agrega --confirmar para restaurar de verdad)…');
  restaurar(admin, admin.firestore(), carpeta, escribir)
    .then((n) => console.log(escribir ? `Listo: ${n} documento(s) restaurados.` : `Simulacro terminado: ${n} documento(s) se restaurarían.`))
    .catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
}
