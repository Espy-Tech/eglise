<?php
header('Content-Type: application/json');

require __DIR__ . '/config.php';

try {
    $stmt = $pdo->query("SELECT * FROM calendar_events ORDER BY date ASC, time ASC");
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($events);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
?>
