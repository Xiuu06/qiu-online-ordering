const vendorOrdersContainer = document.getElementById('vendor-orders-container');

const updateStatus = async (orderId, status) => {
  if (!status) return;

  try {
    const response = await fetch(`/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    const result = await response.json();

    if (result.success) {
      fetchVendorOrders();
    } else {
      alert(result.message || 'Failed to update status.');
    }
  } catch (error) {
    alert('Error updating order status.');
  }
};

const deleteOrder = async (orderId) => {
  const confirmed = confirm('Are you sure you want to delete this order?');
  if (!confirmed) return;

  try {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'DELETE'
    });

    const result = await response.json();

    if (result.success) {
      fetchVendorOrders();
    } else {
      alert(result.message || 'Failed to delete order.');
    }
  } catch (error) {
    alert('Error deleting order.');
  }
};

const renderVendorOrders = (orders) => {
  if (!orders.length) {
    vendorOrdersContainer.innerHTML = '<p>No orders available.</p>';
    return;
  }

  const validOrders = orders.filter((order) => {
    return order.studentName && order.studentId && order.phone && order.pickupTime;
  });

  if (!validOrders.length) {
    vendorOrdersContainer.innerHTML = '<p>No valid orders available.</p>';
    return;
  }

  vendorOrdersContainer.innerHTML = validOrders
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
          <div class="actions">
            <select onchange="handleStatusChange('${order._id}', this.value)">
              <option value="">Change Status</option>
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Ready">Ready</option>
              <option value="Collected">Collected</option>
            </select>
            <button onclick="handleDeleteOrder('${order._id}')">Delete</button>
          </div>
        </div>
      `;
    })
    .join('');
};

window.handleStatusChange = updateStatus;
window.handleDeleteOrder = deleteOrder;

const fetchVendorOrders = async () => {
  try {
    const response = await fetch('/api/orders');
    const result = await response.json();

    if (result.success) {
      renderVendorOrders(result.data);
    } else {
      vendorOrdersContainer.innerHTML = '<p>Failed to load vendor orders.</p>';
    }
  } catch (error) {
    vendorOrdersContainer.innerHTML = '<p>Error loading vendor orders.</p>';
  }
};

fetchVendorOrders();