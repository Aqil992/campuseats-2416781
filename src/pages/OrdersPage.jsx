import { useCart } from "../hooks/useCart.js";

function OrdersPage() {
  const { orders } = useCart();

  return (
    <section>
      <h2 className="section-title">My Orders</h2>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article className="checkout-card" key={order.id}>
              <h3>Order #{order.id}</h3>

              <p>Name: {order.name}</p>
              <p>Mahallah: {order.mahallah}</p>
              <p>Pickup Time: {order.pickupTime}</p>
              <p>Total: RM {order.total.toFixed(2)}</p>

              <h4>Items</h4>
              <ul>
                {order.items.map((cartItem) => (
                  <li key={cartItem.item.id}>
                    {cartItem.item.name} × {cartItem.qty}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default OrdersPage;
