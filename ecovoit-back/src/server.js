require('dotenv').config();
const app = require('./app'); // ton app.js
const authRoutes = require('./auth'); // <-- auth.js en CommonJS
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Ajouter les routes auth sous /api
app.use('/api', authRoutes);

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`EcoVoit’ API démarrée sur http://localhost:${PORT}`);
});