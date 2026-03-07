const cartContainer = document.getElementById('cart-container');
const checkoutForm = document.getElementById('checkout-form');
const checkoutMessage = document.getElementById('checkout-message');

const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

const removeItem = (menuItemId) => {
  const updatedCart = getCart().filter((item) => item.menuItemId !== menuItemId);
  saveCart(updatedCart);
  renderCart();
};

const changeQuantity = (menuItemId, newQuantity) => {
  const cart = getCart();
  const target = cart.find((item) => item.menuItemId === menuItemId);

  if (!target) return;

  target.quantity = Math.max(1, Number(newQuantity));
  saveCart(cart);
  renderCart();
};

const renderCart = () => {
  const cart = getCart();

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartContainer.innerHTML = `
    ${cart
      .map(
        (item) => `
      <div class="cart-item">
        <h3>${item.title}</h3>
        <p>Price: RM ${item.price.toFixed(2)}</p>
        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value="${item.quantity}"
          onchange="handleQuantityChange('${item.menuItemId}', this.value)"
        />
        <div class="actions">
          <button onclick="handleRemoveItem('${item.menuItemId}')">Remove</button>
        </div>
      </div>
    `
      )
      .join('')}
    <p class="total">Total: RM ${total.toFixed(2)}</p>
  `;
};

window.handleRemoveItem = removeItem;
window.handleQuantityChange = changeQuantity;

checkoutForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const cart = getCart();

  if (cart.length === 0) {
    checkoutMessage.textContent = 'Your cart is empty.';
    return;
  }

  const formData = {
    studentName: document.getElementById('studentName').value.trim(),
    studentId: document.getElementById('studentId').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    pickupTime: document.getElementById('pickupTime').value,
    items: cart
  };

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      checkoutMessage.textContent = 'Order placed successfully.';
      checkoutForm.reset();
      localStorage.removeItem('cart');
      renderCart();
    } else {
      checkoutMessage.textContent = result.message || 'Failed to place order.';
    }
  } catch (error) {
    checkoutMessage.textContent = 'An error occurred while placing the order.';
  }
});

renderCart();