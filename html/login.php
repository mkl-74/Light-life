<?php
// Connexion à la base de données
$servername = "localhost";
$username = "votre_nom_utilisateur_mysql";
$password = "votre_mot_de_passe_mysql";
$dbname = "data_light_life";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupération des données du formulaire
$username = $_POST['username'];
$password = $_POST['password'];

// Requête SQL pour vérifier l'utilisateur dans la base de données
$sql = "SELECT id FROM users WHERE username='$username' AND password='$password'";
$result = $conn->query($sql);

// Vérification si l'utilisateur existe dans la base de données
if ($result->num_rows > 0) {
    // Redirection vers index.html après une connexion réussie
    echo "<script>window.location.href='/Light-life/html/index.html';</script>";
} else {
    echo "Invalid username or password.";
}

// Fermeture de la connexion à la base de données
$conn->close();
?>
