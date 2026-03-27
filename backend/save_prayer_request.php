<?php
// Enregistrement d'une demande de молитвенной поддержки
require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}

$name       = trim($_POST['name'] ?? '');
$phone      = trim($_POST['phone'] ?? '');
$email      = trim($_POST['email'] ?? '');
$experience = trim($_POST['experience'] ?? '');
$message    = trim($_POST['message'] ?? '');
$teamsArr   = $_POST['teams'] ?? [];
if (is_string($teamsArr)) {
    $teamsArr = [$teamsArr];
}
$teams = implode(', ', array_map('trim', (array)$teamsArr));
$ip    = $_SERVER['REMOTE_ADDR'] ?? null;

if ($name === '' || $phone === '' || $email === '') {
    http_response_code(422);
    echo json_encode(['error' => 'Пожалуйста, заполните все обязательные поля.']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO prayer_requests
            (name, phone, email, teams, experience, message, ip_address, created_at)
        VALUES
            (:name, :phone, :email, :teams, :experience, :message, :ip, NOW())
    ");
    $stmt->execute([
        ':name'       => $name,
        ':phone'      => $phone,
        ':email'      => $email,
        ':teams'      => $teams,
        ':experience' => $experience,
        ':message'    => $message,
        ':ip'         => $ip,
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.',
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Ошибка при сохранении заявки в базу данных.',
    ]);
}
