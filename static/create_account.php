<?php
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
$email = $_POST['email'];
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];

// Validation des données
if (empty($username) || empty($email) || empty($password) || empty($confirm_password)) {
    die("Tous les champs sont obligatoires.");
}

if ($password !== $confirm_password) {
    die("Les mots de passe ne correspondent pas.");
}

// Hashage du mot de passe
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Requête préparée pour insérer un nouvel utilisateur dans la table "users"
$query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "sss", $username, $email, $hashed_password);

if (mysqli_stmt_execute($stmt)) {
    // Compte créé avec succès, rediriger vers la page de login
    header("Location: /Light-life/html/login.html");
    exit();
} else {
    die("Erreur lors de la création du compte : " . mysqli_error($conn));
}

mysqli_close($conn);
?>
