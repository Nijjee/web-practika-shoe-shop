// Товары
const products = [
  { id: 1, name: "Nike Air Force 1", price: 11990, color: "Белый", category: "Унисекс", sizes: [36,37,38,39,40,41,42,43,44,45], img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc1848?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Adidas Samba", price: 9990, color: "Чёрный/Белый", category: "Унисекс", sizes: [36,37,38,39,40,41,42,43,44], img: "https://images.unsplash.com/photo-1605348532760-6753d0f8c0e6?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "New Balance 550", price: 13990, color: "Белый/Зелёный", category: "Унисекс", sizes: [35,36,37,38,39,40,41,42], img: "https://images.unsplash.com/photo-1620799140401-edc3e0e3a0a4?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Puma Suede Classic", price: 7990, color: "Красный", category: "Унисекс", sizes: [36,37,38,39,40,41,42,43], img: "https://images.unsplash.com/photo-1605733160315-4fc7dac7b5e5?auto=format&fit=crop&w=800&q=80" },
  { id: 5, name: "Converse All Star", price: 6490, color: "Чёрный", category: "Унисекс", sizes: [35,36,37,38,39,40,41,42,43], img: "https://images.unsplash.com/photo-1601925261797-7c9e4e0c0d8b?auto=format&fit=crop&w=800&q=80" },
  { id: 6, name: "Nike Dunk Low", price: 12990, color: "Белый/Чёрный", category: "Унисекс", sizes: [36,37,38,39,40,41,42,43,44], img: "https://images.unsplash.com/photo-1584735174965-048fde6b5e8e?auto=format&fit=crop&w=800&q=80" },
  { id: 7, name: "Vans Old Skool", price: 6990, color: "Классический", category: "Унисекс", sizes: [35,36,37,38,39,40,41,42], img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc1848?auto=format&fit=crop&w=800&q=80" },
  { id: 8, name: "Adidas Stan Smith", price: 9990, color: "Белый/Зелёный", category: "Унисекс", sizes: [36,37,38,39,40,41,42,43], img: "https://images.unsplash.com/photo-1588099768541-6f9d3a6b9f4a?auto=format&fit=crop&w=800&q=80" },
  { id: 9, name: "Reebok Club C", price: 8490, color: "Белый", category: "Унисекс", sizes: [36,37,38,39,40,41,42,43,44], img: "https://images.unsplash.com/photo-1605733160315-4fc7dac7b5e5?auto=format&fit=crop&w=800&q=80" },
  { id: 10, name: "Asics Gel-1130", price: 10990, color: "Серебристый", category: "Унисекс", sizes: [37,38,39,40,41,42,43,44], img: "https://images.unsplash.com/photo-1620799140401-edc3e0e3a0a4?auto=format&fit=crop&w=800&q=80" }
];

// Текущий пользователь
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Регистрация
function register() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;

  if (!name || !email || !password) {
    alert('Заполните все поля!');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.email === email)) {
    alert('Пользователь с таким email уже существует!');
    return;
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  alert('Регистрация успешна! Теперь войдите.');
  window.location.href = 'login.html';
}

// Вход
function login() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert('Неверный email или пароль');
    return;
  }

  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  // Слияние корзины
  const guestCart = JSON.parse(localStorage.getItem('cart')) || [];
  if (guestCart.length > 0) {
    let userCart = JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
    guestCart.forEach(item => {
      const exists = userCart.find(i => i.id === item.id && i.size === item.size);
      if (exists) {
        exists.quantity += item.quantity;
      } else {
        userCart.push(item);
      }
    });
    localStorage.setItem(`cart_${user.email}`, JSON.stringify(userCart));
    localStorage.removeItem('cart'); // очищаем гостевую
  }

  alert(`Добро пожаловать, ${user.name}!`);
  window.location.href = 'index.html';
}

// Выход
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// Добавление в корзину
function addToCart(id, size) {
  const cartKey = currentUser ? `cart_${currentUser.email}` : 'cart';
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const item = { id: Number(id), size: Number(size), quantity: 1 };
  const exists = cart.find(i => i.id === item.id && i.size === item.size);
  if (exists) {
    exists.quantity++;
  } else {
    cart.push(item);
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert('Добавлено в корзину!');
}

// Отрисовка корзины
function renderCart() {
  const cartKey = currentUser ? `cart_${currentUser.email}` : 'cart';
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('total');
  if (!container) return;

  container.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const p = products.find(p => p.id === item.id);
    if (!p) return;
    const sum = p.price * item.quantity;
    total += sum;

    container.innerHTML += `
      <div style="display:flex; justify-content:space-between; padding:15px 0; border-bottom:1px solid #eee;">
        <div>${p.name} (размер ${item.size}) × ${item.quantity}</div>
        <div>${sum.toLocaleString()} ₽</div>
      </div>
    `;
  });

  totalEl.innerText = `Итого: ${total.toLocaleString()} ₽`;
}

//шапка
function updateHeader() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  if (currentUser) {
    nav.innerHTML = `
      <a href="index.html">Каталог</a>
      <a href="cart.html">Корзина</a>
      <span>Привет, ${currentUser.name}!</span>
      <a href="#" onclick="logout(); return false;">Выйти</a>
    `;
  } else {
    nav.innerHTML = `
      <a href="index.html">Каталог</a>
      <a href="cart.html">Корзина</a>
      <a href="login.html">Войти</a>
      <a href="register.html">Регистрация</a>
    `;
  }
}

//Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  updateHeader();

  // Каталог
  if (document.getElementById('catalog')) {
    const catalog = document.getElementById('catalog');
    products.forEach(p => {
      catalog.innerHTML += `
        <div class="card">
          <img src="${p.img}" alt="${p.name}">
          <div class="card-content">
            <h3>${p.name}</h3>
            <div class="price">${p.price.toLocaleString()} ₽</div>
            <a href="product.html?id=${p.id}" class="btn">Подробнее</a>
          </div>
        </div>
      `;
    });
  }

  // Страница товара
  if (document.getElementById('product-detail')) {
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
  }
});