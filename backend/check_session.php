<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173"); // frontend
header("Access-Control-Allow-Credentials: true");

require_once "db.php";

if (!isset($_COOKIE["session_token"])) {
    echo json_encode(["loggedIn" => false]);
    exit;
}

$token = $_COOKIE["session_token"];

$stmt = $pdo->prepare("SELECT id, email, session_expires FROM users WHERE session_token = ?");
$stmt->execute([$token]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && strtotime($user["session_expires"]) > time()) {
    echo json_encode([
        "loggedIn" => true,
        "email" => $user["email"]
    ]);
} else {
    echo json_encode(["loggedIn" => false]);
}
?>
