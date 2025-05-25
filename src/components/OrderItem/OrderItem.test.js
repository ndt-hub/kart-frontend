import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderItem from './OrderItem';

describe('OrderItem', () => {
  test('renders item details correctly', () => {
    render(<OrderItem name="Chocolate Cake" quantity={2} price={12.99} />);

    expect(screen.getByText('Chocolate Cake × 2')).toBeInTheDocument();
    expect(screen.getByText('$25.98')).toBeInTheDocument();
  });

  test('calculates price correctly', () => {
    render(<OrderItem name="Ice Cream" quantity={3} price={5.5} />);

    expect(screen.getByText('$16.50')).toBeInTheDocument();
  });

  test('handles single quantity correctly', () => {
    render(<OrderItem name="Cheesecake" quantity={1} price={8.75} />);

    expect(screen.getByText('Cheesecake × 1')).toBeInTheDocument();
    expect(screen.getByText('$8.75')).toBeInTheDocument();
  });
});
