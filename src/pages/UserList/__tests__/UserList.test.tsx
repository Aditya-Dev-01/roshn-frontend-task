import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserList } from '../UserList';
import '@testing-library/jest-dom';
import { useSelector } from 'react-redux';

const mockDispatch = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: vi.fn()
}));

vi.mock('../../../components/Table/Table', () => ({
  UserTable: ({ users }: { users: any[] }) => (
    <div role="table">
      {users.map(user => (
        <div key={user.id} role="row">{user.name}</div>
      ))}
    </div>
  )
}));

vi.mock('../../../components/Pagination/Pagination', () => ({
  Pagination: ({ currentPage, totalPages, onPageChange }: any) => (
    <div role="navigation" aria-label="pagination">
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
    </div>
  )
}));

vi.mock('../../../components/ErrorMessage/ErrorMessage', () => ({
  ErrorMessage: ({ message, onRetry }: any) => (
    <div role="alert">
      {message}
      <button onClick={onRetry}>Retry</button>
    </div>
  )
}));

const mockUsers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' }
];

describe('UserList Component', () => {
  const mockUseSelector = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockDispatch.mockClear();
    mockUseSelector.mockClear();
    vi.mocked(useSelector).mockImplementation(mockUseSelector);
  });

  it('renders loading state', () => {
    mockUseSelector.mockReturnValue({
      users: [],
      loading: true,
      error: null,
      currentPage: 1,
      totalPages: 1
    });

    render(<UserList />);
    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockUseSelector.mockReturnValue({
      users: [],
      loading: false,
      error: 'Failed to load users',
      currentPage: 1,
      totalPages: 1
    });

    render(<UserList />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Failed to load users')).toBeInTheDocument();
  });

  it('renders user list', () => {
    mockUseSelector.mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1
    });

    render(<UserList />);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('User Management Dashboard')).toBeInTheDocument();
  });

  it('handles pagination', () => {
    mockUseSelector.mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 2
    });

    render(<UserList />);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('handles error retry', () => {
    mockUseSelector.mockReturnValue({
      users: [],
      loading: false,
      error: 'Failed to load users',
      currentPage: 1,
      totalPages: 1
    });

    render(<UserList />);
    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('fetches users on mount', () => {
    mockUseSelector.mockReturnValue({
      users: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1
    });

    render(<UserList />);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('displays pagination information', () => {
    mockUseSelector.mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
      currentPage: 2,
      totalPages: 5
    });

    render(<UserList />);
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });

  it('renders user table with data', () => {
    mockUseSelector.mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1
    });

    render(<UserList />);
    mockUsers.forEach(user => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
    });
  });

  it('displays header content', () => {
    mockUseSelector.mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1
    });

    render(<UserList />);
    expect(screen.getByText('User Management Dashboard')).toBeInTheDocument();
    expect(screen.getByText('View and manage all users in the system')).toBeInTheDocument();
  });
});
