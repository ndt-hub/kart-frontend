const DiscountSection = ({
  discountCode,
  discountError,
  discountLoading,
  onDiscountChange,
  onApplyDiscount,
}) => {
  return (
    <div className="discount-section">
      <div className="discount-input-container">
        <input
          type="text"
          placeholder="Enter discount code"
          className="discount-input"
          value={discountCode}
          onChange={(e) => onDiscountChange(e.target.value)}
        />
        {discountError && <div className="discount-error">{discountError}</div>}
      </div>
      <button
        className="apply-discount"
        onClick={onApplyDiscount}
        disabled={discountLoading}
      >
        {discountLoading ? 'Applying...' : 'Apply'}
      </button>
    </div>
  );
};

export default DiscountSection;
