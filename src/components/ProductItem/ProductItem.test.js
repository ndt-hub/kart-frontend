import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductItem from './ProductItem';

describe('ProductItem', () => {
  const mockProduct = {
    id: 1,
    name: 'Chocolate Cake',
    price: 12.99,
    category: 'Dessert',
    image_url: '/images/cake.jpg',
  };

  const mockAddToCart = jest.fn();
  const mockApiUrl = 'http://test-api.com';

  beforeEach(() => {
    mockAddToCart.mockClear();
  });

  test('renders product details correctly', () => {
    render(
      <ProductItem
        product={mockProduct}
        API_URL={mockApiUrl}
        onAddToCart={mockAddToCart}
      />
    );

    expect(screen.getByText('Chocolate Cake')).toBeInTheDocument();
    expect(screen.getByText('Dessert')).toBeInTheDocument();
    expect(screen.getByText('$12.99')).toBeInTheDocument();
  });

  test('calls onAddToCart when button is clicked', () => {
    render(
      <ProductItem
        product={mockProduct}
        API_URL={mockApiUrl}
        onAddToCart={mockAddToCart}
      />
    );

    const addButton = screen.getByText('Add to Cart');
    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  test('displays correct image', () => {
    render(
      <ProductItem
        product={mockProduct}
        API_URL={mockApiUrl}
        onAddToCart={mockAddToCart}
      />
    );

    const image = screen.getByAltText('Chocolate Cake');
    expect(image).toHaveAttribute('src', 'http://test-api.com/images/cake.jpg');
  });

  test('displays fallback image when no image_url is provided', () => {
    const productWithoutImage = { ...mockProduct, image_url: null };
    render(
      <ProductItem
        product={productWithoutImage}
        API_URL={mockApiUrl}
        onAddToCart={mockAddToCart}
      />
    );

    const image = screen.getByAltText('Chocolate Cake');
    expect(image).toHaveAttribute('src', '/Image.jpg');
  });
});
