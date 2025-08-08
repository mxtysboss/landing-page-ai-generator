<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173"); // frontend
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["email"], $data["password"])) {
    echo json_encode(["success" => false, "message" => "Brak danych logowania"]);
    exit;
}

$email = trim($data["email"]);
$password = trim($data["password"]);

$stmt = $pdo->prepare("SELECT id, password FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user["password"])) {
    // Generowanie unikalnego tokena
    $token = bin2hex(random_bytes(32));
    $expires = date("Y-m-d H:i:s", time() + 3600); // 1 godzina

    // Zapis tokena do bazy
    $update = $pdo->prepare("UPDATE users SET session_token = ?, session_expires = ? WHERE id = ?");
    $update->execute([$token, $expires, $user["id"]]);

    // Ustawienie cookie (ważne 1h)
    setcookie("session_token", $token, [
        "expires" => time() + 3600,
        "path" => "/",
        "httponly" => true,
        "secure" => false, // zmień na true przy HTTPS
        "samesite" => "Strict"
    ]);

    echo json_encode(["success" => true, "message" => "Logowanie udane"]);
} else {
    echo json_encode(["success" => false, "message" => "Nieprawidłowy email lub hasło"]);
}
?>
