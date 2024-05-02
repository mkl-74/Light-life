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
  if (err) {
    throw err;
  }
  console.log('Connecté à la base de données MySQL');
});

// Middleware pour parser les données du formulaire
app.use(express.urlencoded({ extended: true }));

// Route pour gérer la création de compte
app.post('/create-account', (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  // Validation des données
  if (!username || !email || !password || !confirm_password) {
    return res.status(400).send("Tous
