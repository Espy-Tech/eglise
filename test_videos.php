<?php
require 'backend/config.php';

try {
    // Check if videos table exists
    $stmt = $pdo->query("SHOW TABLES LIKE 'church_videos'");
    $tableExists = $stmt->fetch();

    if (!$tableExists) {
        echo "ERROR: church_videos table does not exist\n";
        exit;
    }

    // Count videos
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM church_videos");
    $result = $stmt->fetch();
    echo "Videos in database: " . $result['count'] . "\n";

    // Show recent videos
    $stmt = $pdo->query("SELECT id, title, youtube_url, created_at FROM church_videos ORDER BY created_at DESC LIMIT 5");
    $videos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo "\nRecent videos:\n";
    foreach ($videos as $video) {
        echo "- ID: {$video['id']}, Title: {$video['title']}, URL: {$video['url']}, Created: {$video['created_at']}\n";
    }

} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage() . "\n";
}
?>
