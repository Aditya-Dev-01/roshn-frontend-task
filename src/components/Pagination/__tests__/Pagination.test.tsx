import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';
import '@testing-library/jest-dom';

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    defaultProps.onPageChange.mockClear();
  });

  it('renders pagination controls', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('displays correct page information', () => {
    const props = { ...defaultProps, currentPage: 3, totalPages: 10 };
    render(<Pagination {...props} />);
    expect(screen.getByText('Page 3 of 10')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).not.toBeDisabled();
  });

  it('disables next button on last page', () => {
    const props = { ...defaultProps, currentPage: 5, totalPages: 5 };
    render(<Pagination {...props} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).not.toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it('enables both buttons when on middle page', () => {
    const props = { ...defaultProps, currentPage: 3, totalPages: 5 };
    render(<Pagination {...props} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).not.toBeDisabled();
    expect(buttons[1]).not.toBeDisabled();
  });

  it('calls onPageChange with correct value when previous button is clicked', () => {
    const props = { ...defaultProps, currentPage: 2 };
    render(<Pagination {...props} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(props.onPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange with correct value when next button is clicked', () => {
    render(<Pagination {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('handles edge case of single page', () => {
    const props = { ...defaultProps, currentPage: 1, totalPages: 1 };
    render(<Pagination {...props} />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
  });

  it('navigates through pages correctly', () => {
    const props = { ...defaultProps, currentPage: 2, totalPages: 4 };
    render(<Pagination {...props} />);
    
    const buttons = screen.getAllByRole('button');
    
    fireEvent.click(buttons[0]);
    expect(props.onPageChange).toHaveBeenCalledWith(1);
    
    fireEvent.click(buttons[1]);
    expect(props.onPageChange).toHaveBeenCalledWith(3);
  });

  it('displays correct navigation buttons', () => {
    render(<Pagination {...defaultProps} />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('handles page boundary conditions', () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={vi.fn()} />);
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
    
    render(<Pagination currentPage={3} totalPages={3} onPageChange={vi.fn()} />);
    expect(screen.getByText('Page 3 of 3')).toBeInTheDocument();
  });
});
