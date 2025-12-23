<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Товар</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header>
    <div class="container">
      <h1>Магазин обуви</h1>
      <nav>
        <a href="index.html">Каталог</a>
        <a href="cart.html">Корзина</a>
    </nav>
    </div>
  </header>

  <div class="container">
    <div id="product-detail"></div>
  </div>

  <script src="script.js"></script>
  <script>
    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get('id'));
    const product = products.find(p => p.id === id);

    if (product) {
      document.getElementById('product-detail').innerHTML = `
        <div style="display:flex; gap:50px; flex-wrap:wrap; margin-top:40px;">
          <div style="flex:1; min-width:300px;">
            <img src="${product.img}" alt="${product.name}" style="width:100%; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.1);">
          </div>
          <div style="flex:1; min-width:300px;">
            <h1>${product.name}</h1>
            <div class="price" style="font-size:2.8rem; margin:20px 0;">${product.price.toLocaleString()} ₽</div>
            <p><strong>Цвет:</strong> ${product.color}</p>
            <p><strong>Категория:</strong> ${product.category}</p>
            <label style="display:block; margin:30px 0 15px; font-size:1.2rem; font-weight:500;">Выберите размер:</label>
            <select id="size" style="padding:14px; font-size:1.2rem; width:220px; border-radius:8px;">
              ${product.sizes.map(s => `<option value="${s}">${s}</option>`).join('')}
            </select>
            <button class="btn btn-cart" style="margin-top:40px; font-size:1.4rem; padding:16px 40px;" 
                    onclick="addToCart(${product.id}, document.getElementById('size').value)">
              Добавить в корзину
            </button>
          </div>
        </div>
      `;
    } else {
      document.getElementById('product-detail').innerHTML = '<h1 style="text-align:center; margin-top:100px;">Товар не найден</h1>';
    }
  </script>
</body>
</html>