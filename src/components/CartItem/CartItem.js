const CartItem = ({ item, isLast, onDecrement, onRemove, onIncrement }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-name">{item.name}</div>
      <div className="cart-item-details">
        <div className="cart-item-price">
          <span className="item-quantity">{item.quantity}x</span> $
          {item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
        </div>
        <div className="cart-item-controls">
          <button
            className="cart-btn"
            onClick={() => item.quantity > 1 && onDecrement(item.id)}
          >
            -
          </button>
          <button className="cart-btn remove" onClick={() => onRemove(item.id)}>
            ×
          </button>
          <button className="cart-btn" onClick={() => onIncrement(item.id)}>
            +
          </button>
        </div>
      </div>
      {!isLast && <hr />}
    </div>
  );
};

export default CartItem;
