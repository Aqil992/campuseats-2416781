import CartItem from "./CartItem.jsx";
import CheckoutForm from "./CheckoutForm.jsx";

function CartPage({ cart, onUpdateQuantity, onRemove, onPlaceOrder }) {
  const total = cart.reduce(
    (sum, cartItem) => sum + cartItem.item.price * cartItem.qty,
    0,
  );

  return (
    <section>
      <h2 className="section-title">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. Add some food from the menu!</p>
      ) : (
        <>
          {cart.map((cartItem) => (
            <CartItem
              key={cartItem.item.id}
              cartItem={cartItem}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
            />
          ))}

          <h3>Total: RM {total.toFixed(2)}</h3>

          <CheckoutForm onPlaceOrder={onPlaceOrder} />
        </>
      )}
    </section>
  );
}

export default CartPage;
