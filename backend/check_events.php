<?php
require_once 'config.php';

try {
    $stmt = $pdo->query("SELECT id, time, title, location, date FROM calendar_events ORDER BY id ASC");
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo "<pre>";
    foreach ($events as $event) {
        echo "ID: {$event['id']}\n";
        echo "Time: {$event['time']}\n";
        echo "Title: {$event['title']}\n";
        echo "Location: {$event['location']}\n";
        echo "Date: {$event['date']}\n";
        echo "---\n";
    }
    echo "</pre>";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
