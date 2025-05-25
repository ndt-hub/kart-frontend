import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { ProductItem } from './components';
import { CartItem } from './components';
import { DiscountSection } from './components';
import { CartSummary } from './components';
import { Modal } from './components';
import { OrderItem } from './components';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const API_KEY = process.env.REACT_APP_API_KEY || 'apitest';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discounts, setDiscounts] = useState([]);
  const [discountError, setDiscountError] = useState('');
  const [discountLoading, setDiscountLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/product`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products: ' + error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    return discounts.reduce((total, discount) => {
      return total + (subtotal * discount.value) / 100;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const applyDiscount = async () => {
    if (!discountCode.trim()) {
      setDiscountError('Please enter a discount code');
      return;
    }

    if (discounts.some((discount) => discount.code === discountCode)) {
      setDiscountError('This discount code has already been applied');
      return;
    }

    setDiscountLoading(true);
    setDiscountError('');

    try {
      const response = await axios.get(
        `${API_URL}/api/discount/${discountCode}`
      );
      const data = response.data;
      const now = new Date();
      const validFrom = new Date(data.valid_from);
      const validTo = new Date(data.valid_to);

      if (
        now < validFrom ||
        now > validTo ||
        data.discount_value <= 0 ||
        data.remaining_count <= 0
      ) {
        setDiscountError('This discount code is not valid');
      } else {
        setDiscounts([
          ...discounts,
          {
            code: discountCode,
            value: data.discount_value,
          },
        ]);
        setDiscountCode('');
        setDiscountError('');
      }
    } catch (error) {
      setDiscountError(
        error.response?.data?.message || 'Invalid discount code'
      );
    } finally {
      setDiscountLoading(false);
    }
  };

  const removeDiscount = (codeToRemove) => {
    setDiscounts(
      discounts.filter((discount) => discount.code !== codeToRemove)
    );
  };

  const placeOrder = async () => {
    setOrderLoading(true);

    const orderPayload = {
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    if (discounts.length > 0) {
      orderPayload.discount_codes = discounts.map((d) => d.code).join(',');
    }

    try {
      const response = await axios.post(`${API_URL}/api/order`, orderPayload, {
        headers: {
          api_key: API_KEY,
        },
      });

      setOrderData(response.data);
      setOrderConfirmed(true);
      setShowModal(false);
    } catch (error) {
      console.error('Order error:', error);
    } finally {
      setOrderLoading(false);
    }
  };

  const startNewOrder = () => {
    setCartItems([]);
    setDiscountCode('');
    setDiscounts([]);
    setOrderConfirmed(false);
    setOrderData(null);
  };

  return (
    <div className="container">
      <div className="menu-section">
        <h2>Desserts</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                API_URL={API_URL}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
      <div className="cart-section">
        <h2>
          Your Cart (
          {cartItems.reduce((total, item) => total + item.quantity, 0)})
        </h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <img src={`${process.env.PUBLIC_URL}/emptycart.png`} alt="Empty Cart" />
            <p>Your added items will appear here</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <CartItem
                  key={item.id}
                  item={item}
                  index={index}
                  isLast={index === cartItems.length - 1}
                  onDecrement={(id) => {
                    setCartItems((prevItems) =>
                      prevItems.map((i) =>
                        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                      )
                    );
                  }}
                  onRemove={removeFromCart}
                  onIncrement={(id) => {
                    setCartItems((prevItems) =>
                      prevItems.map((i) =>
                        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
                      )
                    );
                  }}
                />
              ))}
            </div>

            <DiscountSection
              discountCode={discountCode}
              discountError={discountError}
              discountLoading={discountLoading}
              onDiscountChange={setDiscountCode}
              onApplyDiscount={applyDiscount}
            />

            <CartSummary
              subtotal={calculateSubtotal()}
              discounts={discounts}
              discountAmount={calculateDiscount()}
              total={calculateTotal()}
              onRemoveDiscount={removeDiscount}
            />
            <p className="carbon-neutral">This is a carbon-neutral delivery</p>
            <button
              className="confirm-order"
              onClick={() => setShowModal(true)}
            >
              Confirm Order
            </button>

            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title="Order Summary"
              footer={
                <>
                  <button
                    className="cancel-order"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="place-order"
                    onClick={placeOrder}
                    disabled={orderLoading}
                  >
                    {orderLoading ? 'Processing...' : 'Place Order'}
                  </button>
                </>
              }
            >
              <div className="order-items">
                {cartItems.map((item) => (
                  <OrderItem
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                  />
                ))}
              </div>
              <CartSummary
                subtotal={calculateSubtotal()}
                discounts={discounts}
                discountAmount={calculateDiscount()}
                total={calculateTotal()}
                onRemoveDiscount={removeDiscount}
              />
            </Modal>

            <Modal
              isOpen={orderConfirmed && orderData !== null}
              onClose={startNewOrder}
              title="Order Confirmed"
              footer={
                <button className="place-order" onClick={startNewOrder}>
                  Start New Order
                </button>
              }
            >
              <p className="confirmation-subtitle">
                We hope you enjoy your food!
              </p>
              <div className="order-items">
                {orderData &&
                  orderData.products.map((product) => {
                    const orderItem = orderData.items.find(
                      (item) => item.product_id === product.id
                    );
                    return (
                      <OrderItem
                        key={product.id}
                        name={product.name}
                        quantity={orderItem.quantity}
                        price={product.price}
                      />
                    );
                  })}
              </div>
              <div className="order-summary">
                <div className="summary-row">
                  <p>Original Total</p>
                  <p>
                    ${orderData ? orderData.original_total.toFixed(2) : '0.00'}
                  </p>
                </div>
                {orderData && orderData.discount_code && (
                  <div className="summary-row">
                    <p>Discount ({orderData.discount_code})</p>
                    <p>
                      -$
                      {(
                        orderData.original_total - orderData.final_total
                      ).toFixed(2)}
                    </p>
                  </div>
                )}
                <div className="order-total">
                  <p>Final Total</p>
                  <p>
                    ${orderData ? orderData.final_total.toFixed(2) : '0.00'}
                  </p>
                </div>
              </div>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
