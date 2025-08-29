const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'ecovoit.db'); // fichier SQLite dans db/
const migrationsPath = path.join(__dirname, 'migrations.sql');

const db = new Database(dbPath);

// Applique les migrations (idempotent)
const sql = fs.readFileSync(migrationsPath, 'utf8');
db.exec(sql);

module.exports = db;