<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["email"], $data["password"])) {
    echo json_encode(["success" => false, "message" => "Brak wymaganych danych"]);
    exit;
}

$email = trim($data["email"]);
$password = trim($data["password"]);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Nieprawidłowy email"]);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode(["success" => false, "message" => "Hasło musi mieć min. 6 znaków"]);
    exit;
}

// Sprawdź czy email istnieje
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->fetch()) {
    echo json_encode(["success" => false, "message" => "Email jest już zajęty"]);
    exit;
}

// Hashuj hasło
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

$stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
if ($stmt->execute([$email, $hashedPassword])) {
    echo json_encode(["success" => true, "message" => "Rejestracja udana"]);
} else {
    echo json_encode(["success" => false, "message" => "Błąd rejestracji"]);
}
?>
