function CartItem({ cartItem, onUpdateQuantity, onRemove }) {
  const { item, qty } = cartItem;
  const lineTotal = item.price * qty;

  return (
    <div className="cart-item">
      <div>
        <h3>{item.name}</h3>
        <p>Price each: RM {item.price.toFixed(2)}</p>
        <p>Subtotal: RM {lineTotal.toFixed(2)}</p>
      </div>

      <div>
        <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>

        <span> {qty} </span>

        <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>

        <button onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    </div>
  );
}

export default CartItem;
