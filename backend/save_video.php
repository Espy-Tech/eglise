<?php
session_start();
require __DIR__ . '/config.php';

// Debug: Log session info
error_log('Session data: ' . print_r($_SESSION, true));
error_log('POST data: ' . print_r($_POST, true));

if (empty($_SESSION['admin_id'])) {
    error_log('No admin_id in session');
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized - Please log in as admin first']);
    exit;
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$title = trim($_POST['title'] ?? '');
$url = trim($_POST['url'] ?? '');

if (empty($title) || empty($url)) {
    http_response_code(400);
    echo json_encode(['error' => 'Title and URL are required']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO church_videos (title, youtube_url, created_at) VALUES (?, ?, NOW())");
    $stmt->execute([$title, $url]);
    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
