const express = require('express');
const app = express();
const port = 3000;


// Définir le dossier des fichiers statiques (HTML, CSS, JavaScript, etc.)
app.use(express.static('/Light-life'));

// Route pour la page de login
app.get('/login', (req, res)) => {
    res.sendFile(path.join(__dirname, '/Light-lif/login.html'));
});

// Route pour la page d'administration
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '/Light-life/admin.html'));
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});




/*// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.send(__dirname + '/admin.html');
});

// Démarrez le serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});*/