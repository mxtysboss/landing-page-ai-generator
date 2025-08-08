<?php
$host = "localhost";
$dbname = "generator-landing-page";
$username = "root"; // zmień jeśli masz innego użytkownika
$password = ""; // podaj hasło jeśli jest ustawione

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode([
        "success" => false,
        "message" => "Błąd połączenia z bazą danych: " . $e->getMessage()
    ]));
}
?>
