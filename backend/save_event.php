<?php
session_start();
require __DIR__ . '/config.php';

if (empty($_SESSION['admin_id'])) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$time = trim($_POST['time'] ?? '');
$title = trim($_POST['title'] ?? '');
$location = trim($_POST['location'] ?? '');
$date = trim($_POST['date'] ?? '');

if (empty($time) || empty($title) || empty($location) || empty($date)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO calendar_events (time, title, location, date, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())");
    $stmt->execute([$time, $title, $location, $date]);
    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
?>
