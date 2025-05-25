import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from './index';

describe('CartItem', () => {
  const mockItem = {
    id: 1,
    name: 'Chocolate Cake',
    price: 12.99,
    quantity: 2,
  };

  const mockOnDecrement = jest.fn();
  const mockOnRemove = jest.fn();
  const mockOnIncrement = jest.fn();

  beforeEach(() => {
    mockOnDecrement.mockClear();
    mockOnRemove.mockClear();
    mockOnIncrement.mockClear();
  });

  test('renders item details correctly', () => {
    render(
      <CartItem
        item={mockItem}
        index={0}
        isLast={false}
        onDecrement={mockOnDecrement}
        onRemove={mockOnRemove}
        onIncrement={mockOnIncrement}
      />
    );

    expect(screen.getByText('Chocolate Cake')).toBeInTheDocument();
    expect(screen.getByText(/2x \$12.99 = \$25.98/)).toBeInTheDocument();
  });

  test('calls onDecrement when - button is clicked', () => {
    render(
      <CartItem
        item={mockItem}
        index={0}
        isLast={false}
        onDecrement={mockOnDecrement}
        onRemove={mockOnRemove}
        onIncrement={mockOnIncrement}
      />
    );

    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);

    expect(mockOnDecrement).toHaveBeenCalledTimes(1);
    expect(mockOnDecrement).toHaveBeenCalledWith(1);
  });

  test('calls onRemove when × button is clicked', () => {
    render(
      <CartItem
        item={mockItem}
        index={0}
        isLast={false}
        onDecrement={mockOnDecrement}
        onRemove={mockOnRemove}
        onIncrement={mockOnIncrement}
      />
    );

    const removeButton = screen.getByText('×');
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
    expect(mockOnRemove).toHaveBeenCalledWith(1);
  });

  test('calls onIncrement when + button is clicked', () => {
    render(
      <CartItem
        item={mockItem}
        index={0}
        isLast={false}
        onDecrement={mockOnDecrement}
        onRemove={mockOnRemove}
        onIncrement={mockOnIncrement}
      />
    );

    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);

    expect(mockOnIncrement).toHaveBeenCalledTimes(1);
    expect(mockOnIncrement).toHaveBeenCalledWith(1);
  });

  test('does not render hr when isLast is true', () => {
    const { container } = render(
      <CartItem
        item={mockItem}
        index={0}
        isLast={true}
        onDecrement={mockOnDecrement}
        onRemove={mockOnRemove}
        onIncrement={mockOnIncrement}
      />
    );

    expect(container.querySelector('hr')).not.toBeInTheDocument();
  });

  test('renders hr when isLast is false', () => {
    const { container } = render(
      <CartItem
        item={mockItem}
        index={0}
        isLast={false}
        onDecrement={mockOnDecrement}
        onRemove={mockOnRemove}
        onIncrement={mockOnIncrement}
      />
    );

    expect(container.querySelector('hr')).toBeInTheDocument();
  });
});
