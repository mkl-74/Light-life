const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

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
  if (err) throw err;
  console.log('Connecté à la base de données MySQL');
});

// Middleware pour parser les données du formulaire
app.use(express.urlencoded({ extended: true }));

// Route pour gérer la création de compte
app.post('/create-account', async (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  // Validation des données
  if (!username || !email || !password || !confirm_password) {
    return res.status(400).send("Tous les champs sont requis");
  }

  if (password !== confirm_password) {
    return res.status(400).send("Les mots de passe ne correspondent pas");
  }

  try {
    // Hasher le mot de passe avant de l'enregistrer dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10);

    // Requête SQL pour insérer le nouvel utilisateur
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const values = [username, email, hashedPassword];

    db.query(sql, values, (err, result) => {
      if (err) throw err;
      console.log(`Utilisateur ${username} créé avec succès`);
      res.redirect('/login'); // Rediriger vers la page de connexion
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});