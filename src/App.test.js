import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

describe('App', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Chocolate Cake',
      price: 12.99,
      category: 'Dessert',
      image_url: '/images/cake.jpg',
    },
    {
      id: 2,
      name: 'Ice Cream',
      price: 5.99,
      category: 'Frozen',
      image_url: '/images/ice-cream.jpg',
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    axios.get.mockResolvedValueOnce({ data: mockProducts });
    render(<App />);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  test('handles API error', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Error fetching products/)).toBeInTheDocument();
    });
  });

  test('renders products after loading', async () => {
    axios.get.mockResolvedValueOnce({ data: mockProducts });
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Desserts')).toBeInTheDocument();
    expect(screen.getByText('Your Cart (0)')).toBeInTheDocument();
  });

  test('renders empty cart message when cart is empty', async () => {
    axios.get.mockResolvedValueOnce({ data: mockProducts });
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
    });

    expect(
      screen.getByText('Your added items will appear here')
    ).toBeInTheDocument();
  });
});
