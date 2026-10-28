import CartItem from "./CartItem.jsx";
import CheckoutForm from "./CheckoutForm.jsx";
import { useCart } from "../hooks/useCart.js";

function CartPage({ onPlaceOrder }) {
  const { cart, total, changeQty, removeFromCart } = useCart();

  return (
    <section>
      <h2 className="section-title">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. Add some food from the menu!</p>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cart.map((cartItem) => (
              <CartItem
                key={cartItem.item.id}
                cartItem={cartItem}
                onUpdateQuantity={changeQty}
                onRemove={removeFromCart}
              />
            ))}

            <div className="cart-total">
              <strong>Total: RM {total.toFixed(2)}</strong>
            </div>
          </div>

          <div className="checkout-card">
            <CheckoutForm onPlaceOrder={onPlaceOrder} />
          </div>
        </div>
      )}
    </section>
  );
}

export default CartPage;
