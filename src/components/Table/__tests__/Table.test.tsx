import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserTable } from '../Table';
import '@testing-library/jest-dom';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    phone: "1234567890",
    company: {
      name: "Example Corp",
      catchPhrase: "Making examples since 2024"
    }
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
    phone: "0987654321",
    company: {
      name: "Test Inc",
      catchPhrase: "Testing everything"
    }
  }
];

describe('UserTable Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders table with user data', () => {
    render(<UserTable users={mockUsers} />);
    
    // Check for presence of user names
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('displays user contact information', () => {
    render(<UserTable users={mockUsers} />);
    
    // Check for presence of contact details
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
  });

  it('displays usernames correctly', () => {
    render(<UserTable users={mockUsers} />);
    
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByText('@janesmith')).toBeInTheDocument();
  });

  it('displays company information', () => {
    render(<UserTable users={mockUsers} />);
    
    expect(screen.getByText('Example Corp')).toBeInTheDocument();
    expect(screen.getByText('Test Inc')).toBeInTheDocument();
    expect(screen.getByText('Making examples since 2024')).toBeInTheDocument();
    expect(screen.getByText('Testing everything')).toBeInTheDocument();
  });

  it('navigates when clicking on a user row', () => {
    render(<UserTable users={mockUsers} />);
    
    // Find and click on a user's name
    fireEvent.click(screen.getByText('John Doe'));
    expect(mockNavigate).toHaveBeenCalledWith('/user/1');
  });

  it('handles empty user list', () => {
    render(<UserTable users={[]} />);
    
    // Check that user data is not present
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('displays column headers', () => {
    render(<UserTable users={mockUsers} />);
    
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });
});
