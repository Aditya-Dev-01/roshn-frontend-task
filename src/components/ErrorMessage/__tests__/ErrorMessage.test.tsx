import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
  const mockRetry = vi.fn();

  it('renders error message', () => {
    render(<ErrorMessage message="Test error message" />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('shows retry button when onRetry is provided', () => {
    render(<ErrorMessage message="Test error" onRetry={mockRetry} />);
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', async () => {
    const user = userEvent.setup();
    render(<ErrorMessage message="Test error" onRetry={mockRetry} />);
    
    await user.click(screen.getByText('Retry'));
    expect(mockRetry).toHaveBeenCalled();
  });
});
