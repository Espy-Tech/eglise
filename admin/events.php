<?php
include '../backend/config.php';

// Traitement de l'ajout
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['add_event'])) {
    $title = $_POST['title'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $location = $_POST['location'];

    $stmt = $pdo->prepare("INSERT INTO calendar_events (time, title, location, date, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())");
    $stmt->execute([$time, $title, $location, $date]);
}

// Traitement de la suppression
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    $pdo->prepare("DELETE FROM calendar_events WHERE id = ?")->execute([$id]);
}

$events = $pdo->query("SELECT * FROM calendar_events ORDER BY date DESC");
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Admin - Gestion des Événements</title>
    <link rel="stylesheet" href="css/admin.css"> <style>
        .admin-container { padding: 20px; max-width: 800px; margin: auto; }
        .event-form { background: #f4f4f4; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .event-form input { display: block; width: 100%; margin: 10px 0; padding: 10px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .btn-delete { color: red; text-decoration: none; }
    </style>
</head>
<body>
    <div class="admin-container">
        <h1>Управление событиями (Calendrier)</h1>
        
        <div class="event-form">
            <h3>Добавить новое событие</h3>
            <form method="POST">
                <input type="text" name="title" placeholder="Titre (ex: Богослужение)" required>
                <input type="date" name="date" value="<?php echo date('Y-m-d'); ?>" required>
                <input type="time" name="time" required>
                <input type="text" name="location" placeholder="Lieu (ex: Алексеевская)">
                <button type="submit" name="add_event" style="padding: 10px 20px; background: #2563eb; color: white; border: none; cursor: pointer;">Добавить</button>
            </form>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Время</th>
                    <th>Событие</th>
                    <th>Действие</th>
                </tr>
            </thead>
            <tbody>
                <?php while($row = $events->fetch()): ?>
                <tr>
                    <td><?= $row['date'] ?></td>
                    <td><?= $row['time'] ?></td>
                    <td><?= htmlspecialchars($row['title']) ?></td>
                    <td><a href="?delete=<?= $row['id'] ?>" class="btn-delete" onclick="return confirm('Supprimer ?')">Удалить</a></td>
                </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
        <p><a href="index.php">← Вернуться в админку</a></p>
    </div>
</body>
</html>