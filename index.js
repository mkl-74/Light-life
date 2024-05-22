const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
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
    console.error('Erreur de connexion à la base de données : ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

app.use(bodyParser.urlencoded({ extended: true }));

// Définir le dossier des fichiers statiques (HTML, CSS, JavaScript, etc.)
app.use(express.static(path.join(__dirname, 'Light-life','static')));

// Route par défaut - Rediriger vers la page de login
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.post('/create-account', (req, res) => {
  // Récupérer les données du formulaire
  const { username, email, password } = req.body;

  // Valider les données (vous pouvez ajouter une validation plus robuste)
  if (!username || !email || !password) {
    return res.status(400).send('Tous les champs sont requis');
  }

  // Insérer le nouvel utilisateur dans la base de données
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion de l\'utilisateur : ' + err.stack);
      return res.status(500).send('Erreur serveur');
    }
    console.log('Utilisateur créé avec succès');
    res.redirect('/login');
  });
});

// Route pour la page de login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'static','login.html'));
});

// Route pour la page d'administration
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'static','admin.html'));
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});