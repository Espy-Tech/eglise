<?php
$host = getenv('DB_HOST') ?: 'NON DEFINI';
$port = getenv('DB_PORT') ?: 'NON DEFINI';
$name = getenv('DB_NAME') ?: 'NON DEFINI';
$user = getenv('DB_USER') ?: 'NON DEFINI';
$pass = getenv('DB_PASS') ?: 'NON DEFINI';

echo "<pre>";
echo "DB_HOST : $host\n";
echo "DB_PORT : $port\n";
echo "DB_NAME : $name\n";
echo "DB_USER : $user\n";
echo "DB_PASS : " . (strlen($pass) > 3 ? substr($pass,0,3).'***' : 'VIDE') . "\n\n";

try {
    $dsn = "mysql:host=$host;port=$port;dbname=$name;charset=utf8mb4";
    echo "DSN : $dsn\n\n";
    $pdo = new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    echo "CONNEXION OK !\n";
} catch(Exception $e) {
    echo "ERREUR : " . $e->getMessage() . "\n";
}
echo "</pre>";
