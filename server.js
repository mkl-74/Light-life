const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Définir le dossier des fichiers statiques (HTML, CSS, JavaScript, etc.)
app.use(express.static(path.join(__dirname, 'Light-life', 'static')));

// Route par défaut - Rediriger vers la page de login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Route pour la page de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'static','login.html'));
});

// Route pour la page d'administration
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'admin.html'));
});

// Route pour la page d'accueil
//app.get('/', (req, res) => {
 //   res.sendFile(path.join(__dirname, 'index.html'));
//});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
