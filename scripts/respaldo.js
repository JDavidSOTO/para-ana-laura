// ══════════════════════════════════════════════════════
// RESPALDO — copia todos los datos de Firestore a archivos JSON.
//   node scripts/respaldo.js [carpeta-destino]      (por defecto: respaldo-out)
//
// · Respalda TODAS las colecciones, así si agregas una nueva más adelante
//   se incluye sola. Se excluye "fcm_tokens" (son tokens de notificaciones
//   de cada dispositivo: se regeneran solos y no vale la pena guardarlos).
// · En el registro (log) solo se imprimen cantidades, nunca el contenido:
//   los registros de GitHub Actions de un repositorio público son visibles.
// ══════════════════════════════════════════════════════
'use strict';
const fs = require('fs');
const path = require('path');
const { exportarColeccion, iniciarAdmin } = require('./lib-json');

const EXCLUIDAS = ['fcm_tokens'];

async function respaldar(db, destino) {
  fs.mkdirSync(destino, { recursive: true });
  const cols = (await db.listCollections()).map((c) => c.id).filter((n) => !EXCLUIDAS.includes(n)).sort();
  const resumen = {};
  let total = 0;
  for (const nombre of cols) {
    const docs = await exportarColeccion(db.collection(nombre));
    fs.writeFileSync(path.join(destino, nombre + '.json'),
      JSON.stringify({ coleccion: nombre, documentos: docs }, null, 2) + '\n');
    resumen[nombre] = docs.length;
    total += docs.length;
    console.log(`  ${nombre}: ${docs.length} documento(s)`);
  }
  // Seguridad: si todo salió vacío casi seguro hubo un problema; no se sobrescribe un buen respaldo con nada.
  if (total === 0) {
    throw new Error('El respaldo salió vacío (0 documentos). No se guarda para no pisar un respaldo bueno. Revisa la cuenta de servicio y el proyecto.');
  }
  fs.writeFileSync(path.join(destino, '_resumen.json'),
    JSON.stringify({ colecciones: resumen, total }, null, 2) + '\n');
  return { resumen, total };
}

module.exports = { respaldar, EXCLUIDAS };

if (require.main === module) {
  const destino = process.argv[2] || 'respaldo-out';
  const admin = iniciarAdmin();
  console.log('Exportando datos de Firestore…');
  respaldar(admin.firestore(), destino)
    .then(({ total }) => console.log(`Listo: ${total} documento(s) guardados en "${destino}".`))
    .catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
}
