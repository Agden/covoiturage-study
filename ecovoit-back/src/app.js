const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5500", credentials: true }));

// Charger la DB (initialise les tables via migrations)
const db = require('../db/index');

// Endpoint health
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// ➜ Créer un utilisateur (POST /api/users)
app.post('/api/users', (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ success: false, error: 'Champs manquants' });
  }

  const stmt = db.prepare(
    'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)'
  );

  try {
    const info = stmt.run(firstname, lastname, email, password);
    return res.status(201).json({ success: true, userId: info.lastInsertRowid });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

// ➜ Lister les utilisateurs (GET /api/users)
app.get('/api/users', (req, res) => {
  try {
    const users = db.prepare('SELECT id, firstname, lastname, email, created_at FROM users').all();
    return res.json({ success: true, users });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = app;