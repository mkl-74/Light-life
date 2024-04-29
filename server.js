const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'votre_utilisateur',
  password: 'votre_mot_de_passe',  
  database: 'data'
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connecté à la base de données MySQL');
});

// Définir le dossier des fichiers statiques (HTML, CSS, JavaScript, etc.)
app.use(express.static('/Light-life'));

// Middleware pour parser les données JSON
app.use(express.json());

// Route pour la page de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

// Route pour la page d'administration
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '/Light-life/html/admin.html'));
});

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




/*// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.send(__dirname + '/admin.html');
});

// Démarrez le serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});*/