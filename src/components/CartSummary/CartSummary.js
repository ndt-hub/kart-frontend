const CartSummary = ({ subtotal, discounts, total, onRemoveDiscount }) => {
  return (
    <div className="cart-summary">
      <div className="summary-row">
        <p>Subtotal</p>
        <p>${subtotal.toFixed(2)}</p>
      </div>

      {discounts.length > 0 &&
        discounts.map((discount) => (
          <div className="summary-row" key={discount.code}>
            <p>
              Discount
              <span className="highlight-discount">{discount.code}</span> -{' '}
              {discount.value}%
              <button
                className="remove-discount"
                onClick={() => onRemoveDiscount(discount.code)}
              >
                ×
              </button>
            </p>
            <p>-${((subtotal * discount.value) / 100).toFixed(2)}</p>
          </div>
        ))}

      <div className="cart-total">
        <p>Order Total</p>
        <p>${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartSummary;
