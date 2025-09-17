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

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // si tu utilises Gmail
  auth: {
    user: "ecovoit.test@gmail.com",
    pass: "yfptmbjhsqfeinrx"
  }
});

app.post("/contact", (req, res) => {
  const { nom, email, motif, message } = req.body;

  const mailOptions = {
    from: email,
    to: "ecovoit.test@mail.com",
    subject: `Contact : ${motif} - ${nom}`,
    text: `
Nom : ${nom}
Email : ${email}
Motif : ${motif}
Message :
${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erreur :", error);
      res.status(500).send("Une erreur est survenue lors de l'envoi.");
    } else {
      console.log("Email envoyé :", info.response);
      res.send("Merci ! Votre message a bien été envoyé.");
    }
  });
});