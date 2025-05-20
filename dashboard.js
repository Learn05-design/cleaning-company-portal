const db = firebase.firestore();

// Load work orders (matches your reference table)
function loadWorkOrders() {
  const tbody = document.getElementById('workOrdersBody');
  
  db.collection("work_orders").orderBy("scheduled_for", "desc").get()
    .then((querySnapshot) => {
      tbody.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const order = doc.data();
        const row = `
          <tr>
            <td>${order.order_number}</td>
            <td>${formatDate(order.scheduled_for)}</td>
            <td><span class="status-badge ${getStatusClass(order.status)}">${order.status}</span></td>
            <td>${order.client_name}<br><small>${order.client_phone}</small></td>
            <td>${order.client_address}</td>
            <td>${order.technician}</td>
            <td>€${order.price.toFixed(2)}</td>
            <td>${order.campaign}</td>
            <td>${formatDate(order.due_date)}</td>
          </tr>
        `;
        tbody.innerHTML += row;
      });
    });
}

// Format date as "2024 Mar 15 12:00..." (matches your reference)
function formatDate(timestamp) {
  const date = timestamp.toDate();
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) + '...';
}

// Call this when dashboard loads
document.addEventListener('DOMContentLoaded', () => {
  loadWorkOrders();
});
