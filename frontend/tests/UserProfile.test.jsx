import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Profile from '../src/components/UserProfile';
import accService from '../src/services/account.service';

// Mock the account service
vi.mock('../src/services/account.service');

describe('Profile Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('renders "Not logged in" when there is no current user', () => {
    accService.getCurrentUser.mockReturnValue(null);

    render(<Profile />);
    expect(screen.getByText('Not logged in')).toBeInTheDocument();
  });

  it('renders user profile when there is a current user', () => {
    const mockUser = {
      username: 'testuser',
      email: 'test@example.com'
    };
    accService.getCurrentUser.mockReturnValue(mockUser);

    render(<Profile />);
    
    expect(screen.getByText(`${mockUser.username}'s`)).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it('does not render "Not logged in" when there is a current user', () => {
    const mockUser = {
      username: 'testuser',
      email: 'test@example.com'
    };
    accService.getCurrentUser.mockReturnValue(mockUser);

    render(<Profile />);
    
    expect(screen.queryByText('Not logged in')).not.toBeInTheDocument();
  });

  it('calls getCurrentUser from accService', () => {
    render(<Profile />);
    
    expect(accService.getCurrentUser).toHaveBeenCalledTimes(1);
  });
});