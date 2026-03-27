<?php
// get_all_videos.php
require __DIR__ . '/backend/config.php';

try {
    // 1. Récupérer toutes les vidéos de la base de données
    // Extrait de get_all_videos.php
$stmt = $pdo->query("SELECT title, youtube_url, category, created_at FROM church_videos");
// ... le reste du code qui transforme l'URL en videoId ...
    $videos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 2. Transformer l'URL YouTube en ID pour le JavaScript (C'EST ICI QUE VA LE CODE)
    foreach ($videos as &$v) {
        preg_match('%(?:youtube\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $v['youtube_url'], $match);
        $v['videoId'] = $match[1] ?? '';
        $v['embed_url'] = "https://www.youtube.com/embed/" . $v['videoId'];
    }

    // 3. Envoyer le résultat au format JSON pour index.js
    header('Content-Type: application/json');
    echo json_encode($videos);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}