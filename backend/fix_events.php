<?php
require_once 'config.php';

try {
    // Get all events
    $stmt = $pdo->query("SELECT id, time, title, location, date FROM calendar_events ORDER BY id ASC");
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($events as $event) {
        // Check if the data looks swapped (date in title, title in time, etc.)
        // Assuming old events have date in title (YYYY-MM-DD format), title in time, location in date or something

        $id = $event['id'];
        $time = $event['time'];
        $title = $event['title'];
        $location = $event['location'];
        $date = $event['date'];

        // If title looks like a date (YYYY-MM-DD), and time looks like a title, swap them
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $title) && !preg_match('/^\d{2}:\d{2}$/', $time)) {
            // Swap: title (date) -> date, time (title) -> title, location -> location, date (location?) -> time?
            // Old insert was probably: INSERT INTO calendar_events (time, title, location, date) VALUES (?, ?, ?, ?)
            // But with wrong order: date, title, location, time or something.

            // Assuming old: time=title, title=date, location=location, date=time
            $correct_date = $title;
            $correct_title = $time;
            $correct_time = $date;
            $correct_location = $location;

            // Update
            $updateStmt = $pdo->prepare("UPDATE calendar_events SET time = ?, title = ?, location = ?, date = ? WHERE id = ?");
            $updateStmt->execute([$correct_time, $correct_title, $correct_location, $correct_date, $id]);
            echo "Fixed event ID $id\n";
        }
    }

    echo "Fix completed.";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
