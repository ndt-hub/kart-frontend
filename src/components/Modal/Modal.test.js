import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './index';

describe('Modal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test('renders nothing when isOpen is false', () => {
    const { container } = render(
      <Modal
        isOpen={false}
        onClose={mockOnClose}
        title="Test Modal"
        footer={<button>Test Button</button>}
      >
        <p>Test content</p>
      </Modal>
    );

    expect(container.firstChild).toBeNull();
  });

  test('renders modal when isOpen is true', () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        title="Test Modal"
        footer={<button>Test Button</button>}
      >
        <p>Test content</p>
      </Modal>
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        title="Test Modal"
        footer={<button>Test Button</button>}
      >
        <p>Test content</p>
      </Modal>
    );

    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when overlay is clicked', () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        title="Test Modal"
        footer={<button>Test Button</button>}
      >
        <p>Test content</p>
      </Modal>
    );

    const overlay = screen.getByClassName('modal-overlay');
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when modal content is clicked', () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        title="Test Modal"
        footer={<button>Test Button</button>}
      >
        <p>Test content</p>
      </Modal>
    );

    const content = screen.getByText('Test content');
    fireEvent.click(content);

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
