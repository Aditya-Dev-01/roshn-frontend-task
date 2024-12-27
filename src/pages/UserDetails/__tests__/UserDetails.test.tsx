import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserDetails } from '../UserDetails';
import '@testing-library/jest-dom';

const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: vi.fn((selector) => ({
    selectedUser: mockUser,
    loading: false,
    error: null
  })),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '1' }),
}));

const mockUser = {
  id: 1,
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  phone: "123-456-7890",
  website: "example.com",
  company: {
    name: "Test Company",
    catchPhrase: "Testing is important",
    bs: "Business Strategy"
  },
  address: {
    street: "Test Street",
    suite: "Suite 123",
    city: "Test City",
    zipcode: "12345"
  }
};

describe('UserDetails Component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockNavigate.mockClear();
  });

  it('displays basic user information', () => {
    render(<UserDetails />);

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(`@${mockUser.username}`)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.phone)).toBeInTheDocument();
    expect(screen.getByText(mockUser.website)).toBeInTheDocument();
  });

  it('displays company information', () => {
    render(<UserDetails />);

    expect(screen.getByText(mockUser.company.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.company.catchPhrase)).toBeInTheDocument();
    expect(screen.getByText(mockUser.company.bs)).toBeInTheDocument();
  });

  it('displays address information', () => {
    render(<UserDetails />);

    expect(screen.getByText(`${mockUser.address.street}, ${mockUser.address.suite}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.address.city}, ${mockUser.address.zipcode}`)).toBeInTheDocument();
  });

  it('navigates back when back button is clicked', () => {
    render(<UserDetails />);
    
    const backButton = screen.getByRole('button', { name: /back to list/i });
    fireEvent.click(backButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('fetches user details on component mount', () => {
    render(<UserDetails />);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('cleans up on component unmount', () => {
    const { unmount } = render(<UserDetails />);
    unmount();
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('displays all section headings', () => {
    render(<UserDetails />);

    const headings = [
      'Contact Information',
      'Company Details',
      'Address'
    ];

    headings.forEach(heading => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });
  });

  it('displays contact information in correct format', () => {
    render(<UserDetails />);

    const website = screen.getByText(mockUser.website);
    const email = screen.getByText(mockUser.email);
    const phone = screen.getByText(mockUser.phone);

    expect(website).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
  });

  it('displays user identity correctly', () => {
    render(<UserDetails />);

    const name = screen.getByText(mockUser.name);
    const username = screen.getByText(`@${mockUser.username}`);

    expect(name).toBeInTheDocument();
    expect(username).toBeInTheDocument();
  });
});
