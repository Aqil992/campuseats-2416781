function CartItem({ cartItem, onUpdateQuantity, onRemove }) {
  const { item, qty } = cartItem;
  const lineTotal = item.price * qty;

  return (
    <div className="cart-line">
      <div className="cart-name">
        <strong>{item.name}</strong>
        <p>Price each: RM {item.price.toFixed(2)}</p>
      </div>

      <div className="qty">
        <button
          type="button"
          aria-label={`Decrease ${item.name} quantity`}
          onClick={() => onUpdateQuantity(item.id, -1)}
        >
          −
        </button>

        <span>{qty}</span>

        <button
          type="button"
          aria-label={`Increase ${item.name} quantity`}
          onClick={() => onUpdateQuantity(item.id, 1)}
        >
          +
        </button>
      </div>

      <strong className="line-total">RM {lineTotal.toFixed(2)}</strong>

      <button
        type="button"
        className="remove-button"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;
