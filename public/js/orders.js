const ordersContainer = document.getElementById('orders-container');

const renderOrders = (orders) => {
  if (!orders.length) {
    ordersContainer.innerHTML = '<p>No orders found.</p>';
    return;
  }

  const validOrders = orders.filter((order) => {
    return order.studentName && order.studentId && order.phone && order.pickupTime;
  });

  if (!validOrders.length) {
    ordersContainer.innerHTML = '<p>No valid orders found.</p>';
    return;
  }

  ordersContainer.innerHTML = validOrders
    .map((order) => {
      const totalAmount =
        typeof order.totalAmount === 'number' ? order.totalAmount : 0;

      const itemsHtml =
        Array.isArray(order.items) && order.items.length
          ? order.items
              .map((item) => `<li>${item.title} x ${item.quantity}</li>`)
              .join('')
          : '<li>No items</li>';

      return `
        <div class="order-card">
          <h3>${order.studentName} (${order.studentId})</h3>
          <p><strong>Phone:</strong> ${order.phone}</p>
          <p><strong>Pickup Time:</strong> ${order.pickupTime}</p>
          <p><strong>Total:</strong> RM ${totalAmount.toFixed(2)}</p>
          <p class="status">${order.status || 'Pending'}</p>
          <p><strong>Items:</strong></p>
          <ul>
            ${itemsHtml}
          </ul>
          <p><small>Created: ${new Date(order.createdAt).toLocaleString()}</small></p>
        </div>
      `;
    })
    .join('');
};

const fetchOrders = async () => {
  try {
    const response = await fetch('/api/orders');
    const result = await response.json();

    if (result.success) {
      renderOrders(result.data);
    } else {
      ordersContainer.innerHTML = '<p>Failed to load orders.</p>';
    }
  } catch (error) {
    ordersContainer.innerHTML = '<p>Error loading orders.</p>';
  }
};

fetchOrders();

