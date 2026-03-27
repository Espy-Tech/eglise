<?php
session_start();
require __DIR__ . '/../backend/config.php';

// Vérification de la session
if (empty($_SESSION['admin_id'])) {
    header('Location: login.php');
    exit;
}

$msg = "";
$error = "";

// --- LOGIQUE DE SUPPRESSION ---
if (isset($_GET['delete_id'])) {
    $delete_id = (int)$_GET['delete_id'];
    try {
        $stmt = $pdo->prepare("DELETE FROM church_videos WHERE id = ?");
        $stmt->execute([$delete_id]);
        $msg = "La vidéo a été supprimée avec succès.";
    } catch (Exception $e) {
        $error = "Erreur lors de la suppression : " . $e->getMessage();
    }
}

// --- LOGIQUE D'ENVOI (Formulaire) ---
// --- LOGIQUE D'ENVOI ---
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_video'])) {
    $title = trim($_POST['video_title']);
    $url = trim($_POST['video_url']);
    $category = $_POST['video_category']; // Nouvelle variable

    if (!empty($title) && !empty($url)) {
        try {
            $pdo->exec("CREATE TABLE IF NOT EXISTS church_videos (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                youtube_url VARCHAR(255) NOT NULL,
                category VARCHAR(50) DEFAULT 'all',
                created_at DATETIME NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

            $stmt = $pdo->prepare("INSERT INTO church_videos (title, youtube_url, category, created_at) VALUES (?, ?, ?, NOW())");
            $stmt->execute([$title, $url, $category]);
            $msg = "Vidéo ajoutée avec catégorie !";
        } catch (Exception $e) { $error = $e->getMessage(); }
    }
}

// --- RÉCUPÉRATION DES VIDÉOS ---
try {
    $videos = $pdo->query("SELECT * FROM church_videos ORDER BY created_at DESC")->fetchAll();
} catch (Exception $e) {
    $videos = [];
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Admin - Gestion Vidéos</title>
    <link rel="stylesheet" href="../css/index.css">
    <link rel="stylesheet" href="../css/admin.css">
    <script src="https://kit.fontawesome.com/a2e0e6ad5b.js" crossorigin="anonymous"></script>
    <style>
        .admin-form-card { background: #fff; padding: 25px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #e0e0e0; }
        .admin-form-card input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 6px; font-size: 16px; }
        .btn-save { background: #2c3e50; color: white; border: none; padding: 12px 25px; border-radius: 6px; cursor: pointer; font-weight: bold; transition: background 0.3s; }
        .btn-save:hover { background: #34495e; }
        .btn-delete { color: #e74c3c; border: 1px solid #e74c3c; padding: 5px 10px; border-radius: 4px; text-decoration: none; font-size: 13px; transition: 0.3s; }
        .btn-delete:hover { background: #e74c3c; color: white; }
        .alert { padding: 15px; border-radius: 6px; margin-bottom: 20px; }
        .alert-success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .alert-error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .video-table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        .video-table th, .video-table td { text-align: left; padding: 15px; border-bottom: 1px solid #eee; }
        .video-table th { background: #f8f9fa; color: #666; font-weight: 600; }
    </style>
</head>
<body class="admin-body">
    <div class="admin-layout">
        <aside class="admin-sidebar">
            <div class="admin-logo" style="padding:20px; text-align:center;">
                <img src="https://kk-church.ru/slava/wp-content/themes/kk/images/logo.svg" alt="logo" width="120">
            </div>
            <nav class="admin-nav">
                <a href="index.php" class="active"><i class="fas fa-video"></i> Vidéos YouTube</a>
                <a href="events.php"><i class="fas fa-hands-praying"></i> Prières</a>
                <a href="logout.php"><i class="fas fa-sign-out-alt"></i> Déconnexion</a>
            </nav>
        </aside>

        <main class="admin-main">
            <header class="admin-section-header">
                <h1>Panneau de gestion Vidéo</h1>
                <p>Ajoutez ou supprimez les vidéos de la page d'accueil.</p>
            </header>

            <?php if($msg): ?> <div class="alert alert-success"><?= $msg ?></div> <?php endif; ?>
            <?php if($error): ?> <div class="alert alert-error"><?= $error ?></div> <?php endif; ?>

            <div class="admin-form-card">
                <h3>Ajouter une vidéo</h3>
                <form action="index.php" method="POST">
    <label>Titre de la vidéo</label>
    <input type="text" name="video_title" placeholder="Ex: Culte du Dimanche 24 Mars" required>
    
    <label>Lien YouTube</label>
    <input type="url" name="video_url" placeholder="https://www.youtube.com/watch?v=..." required>

    <label>Catégorie</label>
<select name="video_category" required style="width: 100%; padding: 12px; margin: 10px 0;">
    <option value="all">Все (Toutes)</option>
    <option value="sermon">Проповеди (Prédications)</option>
    <option value="worship">Богослужения (Louange/Culte)</option>
    <option value="seminar">Семинары (Séminaires)</option>
    <option value="youth">Молодежные (Jeunesse)</option>
</select>
    
    <button type="submit" name="add_video" class="btn-save">
        <i class="fas fa-plus"></i> Publier sur le site
    </button>
</form>
            </div>

            <h3>Vidéos actuellement en ligne</h3>
            <table class="video-table">
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Lien</th>
                        <th>Date d'ajout</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if(empty($videos)): ?>
                        <tr><td colspan="4">Aucune vidéo enregistrée.</td></tr>
                    <?php else: ?>
                        <?php foreach($videos as $v): ?>
                            <tr>
                                <td><strong><?= htmlspecialchars($v['title']) ?></strong></td>
                                <td><small><?= htmlspecialchars($v['youtube_url']) ?></small></td>
                                <td><?= date('d/m/Y', strtotime($v['created_at'])) ?></td>
                                <td>
                                    <a href="index.php?delete_id=<?= $v['id'] ?>" 
                                       class="btn-delete" 
                                       onclick="return confirm('Voulez-vous vraiment supprimer cette vidéo ?');">
                                        <i class="fas fa-trash"></i> Supprimer
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </main>
    </div>
</body>
</html>