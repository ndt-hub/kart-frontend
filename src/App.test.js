import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

// Mock axios
jest.mock('axios');

describe('App', () => {
  beforeEach(() => {
    // Mock successful product fetch
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: 'Chocolate Cake', price: 12.99, category: 'Dessert', image_url: '/images/cake.jpg' },
        { id: 2, name: 'Ice Cream', price: 5.99, category: 'Frozen', image_url: '/images/ice-cream.jpg' }
      ]
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<App />);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  test('renders products after loading', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Desserts')).toBeInTheDocument();
    expect(screen.getByText('Your Cart (0)')).toBeInTheDocument();
  });

  test('handles API error', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network error'));
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText(/Error fetching products/)).toBeInTheDocument();
  });

  test('renders empty cart message when cart is empty', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Your added items will appear here')).toBeInTheDocument();
  });
});