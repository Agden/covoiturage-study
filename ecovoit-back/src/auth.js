const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Database = require("better-sqlite3");
require("dotenv").config();

const router = express.Router();
const db = new Database("ecovoit.db");

// ROUTE LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Email et mot de passe requis" });
  }

  try {
    // Récupérer l'utilisateur par email
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    const user = stmt.get(email);

    if (!user) {
      return res.status(401).json({ success: false, error: "Utilisateur non trouvé" });
    }

    // Comparer le mot de passe
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ success: false, error: "Mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ success: true, token, user: { id: user.id, nom: user.nom, prenom: user.prenom } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});

module.exports = router;