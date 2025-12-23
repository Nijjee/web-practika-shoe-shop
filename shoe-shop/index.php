<?php
require 'includes/db.php';

$stmt = $pdo->query("SELECT * FROM products");
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>Магазин обуви</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header>
    <h1>Магазин обуви</h1>
    <nav>
      <a href="index.php">Каталог</a>
      <a href="cart.php">Корзина</a>
      <a href="login.php">Войти</a>
      <a href="register.php">Регистрация</a>
    </nav>
  </header>

  <div class="grid">
    <?php foreach ($products as $p): ?>
      <div class="card">
        <img src="https://via.placeholder.com/300?text=<?= urlencode($p['name']) ?>" alt="<?= htmlspecialchars($p['name']) ?>">
        <h3><?= htmlspecialchars($p['name']) ?></h3>
        <p class="price"><?= number_format($p['price'], 0) ?> ₽</p>
        <a href="product.php?id=<?= $p['id'] ?>" class="btn">Подробнее</a>
      </div>
    <?php endforeach; ?>
  </div>
</body>
</html>