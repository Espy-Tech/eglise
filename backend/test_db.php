<?php
require __DIR__ . '/config.php';

try {
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM calendar_events");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode([
        'success' => true,
        'event_count' => $result['count'],
        'message' => 'Database connection successful'
    ]);
} catch (Throwable $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'message' => 'Database connection failed'
    ]);
}
?>
