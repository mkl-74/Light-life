const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

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

// Définir le dossier des fichiers statiques
app.use(express.static('/Light-life/html'));

// Middleware pour parser les données JSON
app.use(express.json());

//Creation de compte
app.get('/create-account', (req, res) => {
  res.sendFile(path.join(__dirname, '/Light-life/html/create_account.html'));
});

// Route pour la page de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Requête pour insérer les données dans la table 'users'
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
    if (err) throw err;
    console.log("Utilisateur enregistré !");
    res.send('Utilisateur enregistré avec succès');
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});