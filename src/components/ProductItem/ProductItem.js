const ProductItem = ({ product, API_URL, onAddToCart }) => {
  return (
    <div className="product-item">
      <div className="product-item-container">
        <img
          src={
            product.image_url ? `${API_URL}${product.image_url}` : '/Image.jpg'
          }
          alt={product.name}
        />
        <button
          className="add-to-cart-edge"
          onClick={() => onAddToCart(product)}
        >
          <svg
            className="cart-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Add to Cart
        </button>
      </div>
      <div className="product-details">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductItem;
