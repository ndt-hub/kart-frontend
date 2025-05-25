const OrderItem = ({ name, quantity, price }) => {
  return (
    <div className="order-item">
      <span>
        {name} × {quantity}
      </span>
      <span>${(price * quantity).toFixed(2)}</span>
    </div>
  );
};

export default OrderItem;
