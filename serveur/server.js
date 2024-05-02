const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Définir le dossier des fichiers statiques (HTML, CSS, JavaScript, etc.)
app.use(express.static(path.join(__dirname, '/Light-life')));

// Route pour la page de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/Light-life/html/login.html'));
});

// Route pour la page d'administration
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '/Light-life/html/admin.html'));
});

// Route pour la page index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/Light-life/html/index.html'));
});


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
