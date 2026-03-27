<?php
session_start();
require __DIR__ . '/../backend/config.php';

// Créer automatiquement un administrateur par défaut si aucun n'existe
try {
    $stmt = $pdo->query("SELECT COUNT(*) AS c FROM admin_users");
    $row = $stmt->fetch();
    $countAdmins = $row ? (int)$row['c'] : 0;
} catch (Throwable $e) {
    $countAdmins = 0;
}

if ($countAdmins === 0) {
    try {
        $hash = password_hash('admin123', PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO admin_users (email, password_hash, full_name, created_at) VALUES (:email, :hash, :full_name, NOW())");
        $stmt->execute([
            ':email' => 'admin@eglise.fr',
            ':hash' => $hash,
            ':full_name' => 'Super Admin',
        ]);
    } catch (Throwable $e) {
        // silence: table peut ne pas exister encore
    }
}

if (!empty($_SESSION['admin_id'])) {
    header('Location: index.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    try {
        $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE email = :email LIMIT 1");
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch();
    } catch (Throwable $e) {
        $user = null;
    }

    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_id']    = $user['id'];
        $_SESSION['admin_email'] = $user['email'];
        $_SESSION['admin_name']  = $user['full_name'] ?: $user['email'];
        header('Location: index.php');
        exit;
    } else {
        $error = "Identifiants incorrects.";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Espace admin - Église</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Styles globaux du site -->
    <link rel="stylesheet" href="../css/index.css">
    <!-- Styles spécifiques admin -->
    <link rel="stylesheet" href="../css/admin.css">
    <link rel="stylesheet" href="../css/responsive.css">
    <script src="https://kit.fontawesome.com/a2e0e6ad5b.js" crossorigin="anonymous"></script>
</head>

<body class="admin-body">
    <div class="admin-auth-wrapper">
        <div class="admin-auth-card">
            <div class="admin-auth-header">
                <a href="../index.html" class="admin-auth-logo">
                    <img src="https://kk-church.ru/slava/wp-content/themes/kk/images/logo.svg" alt="Logo église">
                </a>
                <h1>Connexion administrateur</h1>
                <p>Accédez au panneau d'administration du site de l'église.</p>
            </div>
            <?php if (!empty($error)): ?>
            <div class="admin-error">
                <?php echo htmlspecialchars($error, ENT_QUOTES, 'UTF-8'); ?>
            </div>
            <?php endif; ?>

            
<form class="admin-auth-form" action="login.php" method="post">
                <div class="form-group">
                    <label for="email">E-mail administrateur</label>
                    <input type="email" id="email" name="email" placeholder="admin@eglise.fr" required>
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input type="password" id="password" name="password" placeholder="••••••••" required>
                </div>
                <div class="admin-auth-actions">
                    <label class="remember-me">
                        <input type="checkbox" name="remember"> Se souvenir de moi
                    </label>
                    <a href="#" class="link-muted">Mot de passe oublié ?</a>
                </div>
                <button type="submit" class="btn-primary-full">
                    <i class="fas fa-sign-in-alt"></i>
                    Se connecter
                </button>
            </form>

            <p class="admin-auth-footer">
                Cet espace est réservé à l'équipe de l'église.
            </p>
        </div>
    </div>
</body>
</html>
