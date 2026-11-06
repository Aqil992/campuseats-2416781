import { useCart } from "../hooks/useCart.js";

export function OrdersPage() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <div className="card">
        <h2>No orders yet</h2>
        <p className="muted">Your past orders will appear here.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="card" style={{ marginBottom: "1rem" }}>
          <p>
            <strong>Date:</strong> {order.date}
          </p>
          <p>
            <strong>Name:</strong> {order.name}
          </p>
          <p>
            <strong>Mahallah:</strong> {order.mahallah}
          </p>
          <p>
            <strong>Pickup time:</strong> {order.pickupTime}
          </p>
          <p>
            <strong>Total paid:</strong> RM {order.total.toFixed(2)}
          </p>
          <ul>
            {order.items.map((line) => (
              <li key={line.item.id}>
                {line.item.name} (x{line.qty})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
