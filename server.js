const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session');
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
app.use(bodyParser.json());

// Configuration de la session
app.use(session({
  secret: 'votre_secret_de_session',
  resave: false,
  saveUninitialized: true
}));

// Définir le dossier des fichiers statiques (HTML, CSS, JavaScript, etc.)
app.use(express.static('static', { index: 'login.html' }));

// Routes
app.use('/create-account', require('./routes/create_account'));
app.use('/login', require('./routes/login'));

// Route par défaut - Rediriger vers la page de login
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

// Route pour sauvegarder les tâches
app.post('/save-tasks', (req, res) => {
    const tasks = req.body.tasks;
    const today = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(today.getDate() + 7);

    tasks.forEach(task => {
        const { member_name, age, task_name, date } = task;
        const sql = 'INSERT INTO tasks (member_name, age, task, date, expiration_date) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [member_name, age, task_name, date, expirationDate], (err, result) => {
            if (err) throw err;
        });
    });

    res.send('Tasks saved successfully!');
});

// Routes pour sauvegarder et charger les listes de courses
app.post('/save-base-list', (req, res) => {
    saveShoppingList(1, req.body.ingredients, res);
});

app.get('/load-base-list', (req, res) => {
    loadShoppingList(1, res);
});

app.post('/save-frais-list', (req, res) => {
    saveShoppingList(2, req.body.ingredients, res);
});

app.get('/load-frais-list', (req, res) => {
    loadShoppingList(2, res);
});

app.post('/save-entretien-list', (req, res) => {
    saveShoppingList(3, req.body.ingredients, res);
});

app.get('/load-entretien-list', (req, res) => {
    loadShoppingList(3, res);
});

function saveShoppingList(id, ingredients, res) {
    const sql = 'REPLACE INTO shopping_list (id, ingredients) VALUES (?, ?)';
    db.query(sql, [id, JSON.stringify(ingredients)], (err, result) => {
        if (err) throw err;
        res.send('Shopping list saved successfully!');
    });
}

function loadShoppingList(id, res) {
    const sql = 'SELECT ingredients FROM shopping_list WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({ ingredients: JSON.parse(result[0].ingredients) });
        } else {
            res.json({ ingredients: [] });
        }
    });
}

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
