<?php
session_start();

// Connexion à la base de données
$db_host = 'localhost';
$db_username = 'mkl';
$db_password = 'mkl';
$db_name = 'data_light_life';

$conn = mysqli_connect($db_host, $db_username, $db_password, $db_name);

if (!$conn) {
    die("Erreur de connexion à la base de données : " . mysqli_connect_error());
}

// Récupération des données du formulaire
$username = $_POST['username'];
$password = $_POST['password'];

// Requête préparée pour vérifier les informations d'identification
$query = "SELECT id FROM users WHERE username = ? AND password = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "ss", $username, $password);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) == 1) {
    // L'utilisateur est authentifié avec succès
    $_SESSION['username'] = $username;
    header("Location: /Light-life/index.html"); // Redirigez vers index.html après l'authentification
    exit();
} else {
    // Échec de l'authentification
    header("/"); // Redirigez vers la page de connexion avec un message d'erreur
}

mysqli_close($conn);
?>
