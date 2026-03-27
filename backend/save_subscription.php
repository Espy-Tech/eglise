<?php
// Enregistrement d'un abonnement newsletter (footer donate)
require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}

$email   = trim($_POST['email'] ?? '');
$consent = isset($_POST['consent']) && $_POST['consent'] === '1' ? 1 : 0;
$ip      = $_SERVER['REMOTE_ADDR'] ?? null;

if ($email === '') {
    http_response_code(422);
    echo json_encode(['error' => 'Email obligatoire']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO subscriptions (email, consent, ip_address, created_at)
        VALUES (:email, :consent, :ip, NOW())
    ");
    $stmt->execute([
        ':email'   => $email,
        ':consent' => $consent,
        ':ip'      => $ip,
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Спасибо! Вы подписались на новости.',
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Ошибка при сохранении подписки.',
    ]);
}
