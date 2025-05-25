import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartSummary from './index';

describe('CartSummary', () => {
  const mockDiscounts = [
    { code: 'DISCOUNT10', value: 10 },
    { code: 'SUMMER20', value: 20 },
  ];

  const mockOnRemoveDiscount = jest.fn();

  beforeEach(() => {
    mockOnRemoveDiscount.mockClear();
  });

  test('renders subtotal correctly', () => {
    render(
      <CartSummary
        subtotal={100}
        discounts={[]}
        discountAmount={0}
        total={100}
        onRemoveDiscount={mockOnRemoveDiscount}
      />
    );

    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  test('renders discount rows when discounts are provided', () => {
    render(
      <CartSummary
        subtotal={100}
        discounts={mockDiscounts}
        discountAmount={30}
        total={70}
        onRemoveDiscount={mockOnRemoveDiscount}
      />
    );

    expect(screen.getByText(/DISCOUNT10/)).toBeInTheDocument();
    expect(screen.getByText(/SUMMER20/)).toBeInTheDocument();
    expect(screen.getAllByText(/×/).length).toBe(2); // Two remove buttons
  });

  test('calls onRemoveDiscount when remove button is clicked', () => {
    render(
      <CartSummary
        subtotal={100}
        discounts={mockDiscounts}
        discountAmount={30}
        total={70}
        onRemoveDiscount={mockOnRemoveDiscount}
      />
    );

    const removeButtons = screen.getAllByText('×');
    fireEvent.click(removeButtons[0]);

    expect(mockOnRemoveDiscount).toHaveBeenCalledTimes(1);
    expect(mockOnRemoveDiscount).toHaveBeenCalledWith('DISCOUNT10');
  });

  test('renders total correctly', () => {
    render(
      <CartSummary
        subtotal={100}
        discounts={mockDiscounts}
        discountAmount={30}
        total={70}
        onRemoveDiscount={mockOnRemoveDiscount}
      />
    );

    expect(screen.getByText('Order Total')).toBeInTheDocument();
    expect(screen.getByText('$70.00')).toBeInTheDocument();
  });

  test('does not render discount section when no discounts', () => {
    render(
      <CartSummary
        subtotal={100}
        discounts={[]}
        discountAmount={0}
        total={100}
        onRemoveDiscount={mockOnRemoveDiscount}
      />
    );

    expect(screen.queryByText(/Discount/)).not.toBeInTheDocument();
  });
});
