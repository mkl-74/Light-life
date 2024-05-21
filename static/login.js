const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const path = require('path');
const app = express();

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'mkl',
  password: 'mkl',
  database: 'data_light_life'
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connecté à la base de données MySQL');
});

// Configuration de la session
app.use(session({
  secret: 'votre_secret_de_session',
  resave: false,
  saveUninitialized: true
}));

// Middleware pour parser les données du formulaire
app.use(express.urlencoded({ extended: true }));

// Route pour gérer la soumission du formulaire de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Requête préparée pour vérifier les informations d'identification
  const query = 'SELECT id FROM users WHERE username = ? AND password = ?';
  db.execute(query, [username, password], (err, results) => {
    if (err) throw err;

    if (results.length === 1) {
      // L'utilisateur est authentifié avec succès
      req.session.username = username;
      res.redirect('/Light-life/static/index.html');
    } else {
      // Échec de l'authentification
      res.redirect('/');
    }
  });
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});
