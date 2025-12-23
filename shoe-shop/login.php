<?php
session_start();
require 'includes/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        header("Location: index.php");
        exit;
    } else {
        echo "Неверные данные";
    }
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
  <title>Вход</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <form method="POST">
    <input name="email" type="email" placeholder="Email" required>
    <input name="password" type="password" placeholder="Пароль" required>
    <button type="submit">Войти</button>
  </form>
</body>
</html>