import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DiscountSection from './DiscountSection';

describe('DiscountSection', () => {
  const mockOnDiscountChange = jest.fn();
  const mockOnApplyDiscount = jest.fn();

  beforeEach(() => {
    mockOnDiscountChange.mockClear();
    mockOnApplyDiscount.mockClear();
  });

  test('renders input and button correctly', () => {
    render(
      <DiscountSection 
        discountCode="" 
        discountError="" 
        discountLoading={false}
        onDiscountChange={mockOnDiscountChange}
        onApplyDiscount={mockOnApplyDiscount}
      />
    );
    
    expect(screen.getByPlaceholderText('Enter discount code')).toBeInTheDocument();
    expect(screen.getByText('Apply')).toBeInTheDocument();
  });

  test('displays error message when provided', () => {
    render(
      <DiscountSection 
        discountCode="" 
        discountError="Invalid discount code" 
        discountLoading={false}
        onDiscountChange={mockOnDiscountChange}
        onApplyDiscount={mockOnApplyDiscount}
      />
    );
    
    expect(screen.getByText('Invalid discount code')).toBeInTheDocument();
  });

  test('calls onDiscountChange when input changes', () => {
    render(
      <DiscountSection 
        discountCode="" 
        discountError="" 
        discountLoading={false}
        onDiscountChange={mockOnDiscountChange}
        onApplyDiscount={mockOnApplyDiscount}
      />
    );
    
    const input = screen.getByPlaceholderText('Enter discount code');
    fireEvent.change(input, { target: { value: 'DISCOUNT10' } });
    
    expect(mockOnDiscountChange).toHaveBeenCalledTimes(1);
    expect(mockOnDiscountChange).toHaveBeenCalledWith('DISCOUNT10');
  });

  test('calls onApplyDiscount when button is clicked', () => {
    render(
      <DiscountSection 
        discountCode="DISCOUNT10" 
        discountError="" 
        discountLoading={false}
        onDiscountChange={mockOnDiscountChange}
        onApplyDiscount={mockOnApplyDiscount}
      />
    );
    
    const button = screen.getByText('Apply');
    fireEvent.click(button);
    
    expect(mockOnApplyDiscount).toHaveBeenCalledTimes(1);
  });

  test('shows loading state when discountLoading is true', () => {
    render(
      <DiscountSection 
        discountCode="DISCOUNT10" 
        discountError="" 
        discountLoading={true}
        onDiscountChange={mockOnDiscountChange}
        onApplyDiscount={mockOnApplyDiscount}
      />
    );
    
    expect(screen.getByText('Applying...')).toBeInTheDocument();
    expect(screen.getByText('Applying...')).toBeDisabled();
  });
});