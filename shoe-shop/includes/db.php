<?php
$dbFile = __DIR__ . '/../database.db'; // путь к файлу БД

try {
    $pdo = new PDO("sqlite:$dbFile");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Ошибка подключения к SQLite: " . $e->getMessage());
}

// Создаём таблицы, если их нет
$pdo->exec("
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        phone TEXT,
        role TEXT DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        category TEXT,
        brand TEXT,
        price REAL NOT NULL,
        color TEXT,
        material TEXT,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS product_sizes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        size REAL NOT NULL,
        quantity INTEGER DEFAULT 0,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS carts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cart_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        size REAL NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
    );
");

// Добавим тестовые данные
$stmt = $pdo->query("SELECT COUNT(*) FROM products");
if ($stmt->fetchColumn() == 0) {
    $pdo->exec("
        INSERT INTO products (name, price, category, color) VALUES 
        ('Nike Air Force 1', 11990, 'Унисекс', 'Белый'),
        ('Adidas Samba', 9990, 'Унисекс', 'Чёрный/Белый'),
        ('New Balance 550', 13990, 'Унисекс', 'Белый/Зелёный')
    ");

    $pdo->exec("
        INSERT INTO product_sizes (product_id, size, quantity) VALUES 
        (1, 40.0, 5), (1, 41.0, 3),
        (2, 39.0, 10), (2, 40.0, 8)
    ");
}
?>