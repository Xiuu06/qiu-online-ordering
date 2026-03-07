const menuContainer = document.getElementById('menu-container');

const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

const addToCart = (item) => {
  const cart = getCart();
  const existingItem = cart.find((cartItem) => cartItem.menuItemId === item._id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      menuItemId: item._id,
      title: item.title,
      price: item.price,
      quantity: 1
    });
  }

  saveCart(cart);
  alert(`${item.title} added to cart`);
};

const handleAddToCart = (id) => {
  const item = window.menuItems.find((menuItem) => menuItem._id === id);
  if (item) addToCart(item);
};

const renderMenu = (items) => {
  window.menuItems = items;

  menuContainer.innerHTML = items
    .map(
      (item) => `
    <div class="card">
      <img src="${item.imageUrl}" alt="${item.title}" loading="lazy" />
      <div class="card-body">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p class="price">RM ${item.price.toFixed(2)}</p>
        <button onclick="handleAddToCart('${item._id}')">Add to Cart</button>
      </div>
    </div>
  `
    )
    .join('');
};

window.handleAddToCart = handleAddToCart;

const fetchMenu = async () => {
  try {
    const response = await fetch('/api/menu');
    const result = await response.json();

    if (result.success) {
      renderMenu(result.data);
    } else {
      menuContainer.innerHTML = '<p>Failed to load menu items.</p>';
    }
  } catch (error) {
    menuContainer.innerHTML = '<p>Error loading menu items.</p>';
  }
};

fetchMenu();