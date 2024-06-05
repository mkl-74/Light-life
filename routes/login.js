const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'mkl',
  password: 'mkl',
  database: 'data_light_life'
});

// Connexion à la base de données
db.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL');
});

// Route pour gérer la soumission du formulaire de login
router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Requête préparée pour vérifier les informations d'identification
  const query = 'SELECT id, password FROM users WHERE username = ?';
  db.execute(query, [username], async (err, results) => {
    if (err) throw err;

    if (results.length === 1) {
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        // L'utilisateur est authentifié avec succès
        req.session.username = username;
        res.redirect('/index.html');
      } else {
        // Échec de l'authentification
        res.redirect('/');
      }
    } else {
      // Échec de l'authentification
      res.redirect('/');
    }
  });
});

module.exports = router;