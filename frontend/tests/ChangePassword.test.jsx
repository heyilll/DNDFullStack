import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChangePassword from '../src/components/ChangePassword';
import { BrowserRouter } from 'react-router-dom';
import accService from '../src/services/account.service';
import { vi } from 'vitest';

vi.mock('../src/services/account.service'); 
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal()
  return {
      ...actual,
      useNavigate: () => vi.fn(),
    // your mocked methods
  }
})

describe('ChangePassword Component', () => {  
  beforeEach(() => {
    vi.clearAllMocks();
    accService.getCurrentUser = vi.fn();
    accService.editPasswordService = vi.fn();
  });

    test('should render "Not logged in" when no current user', () => {
        accService.getCurrentUser.mockReturnValue(null);
        render(
        <BrowserRouter>
            <ChangePassword />
        </BrowserRouter>
        );
        expect(screen.getByText('Not logged in')).toBeInTheDocument();
    });

    test('should render change password form when current user exists', () => {
        accService.getCurrentUser.mockReturnValue({ username: 'testuser' });
        render(
        <BrowserRouter>
            <ChangePassword />
        </BrowserRouter>
        );
        expect(screen.getByText('Change Password')).toBeInTheDocument();
    });

    test('should update newPassword state when input changes', () => {
        accService.getCurrentUser.mockReturnValue({ username: 'testuser' });
        render(
        <BrowserRouter>
            <ChangePassword />
        </BrowserRouter>
        );

        const passwordInput = screen.getByPlaceholderText('New Password');
        fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });
        expect(passwordInput.value).toBe('newpassword123');
    });

    test('should call editPasswordService on form submit', async () => {
        accService.getCurrentUser.mockReturnValue({ username: 'testuser' });
        accService.editPasswordService.mockResolvedValue({ status: 201 });
        render(
            <BrowserRouter>
                <ChangePassword />
            </BrowserRouter>
        );

        const passwordInput = screen.getByPlaceholderText('New Password');
        fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });

        const submitButton = screen.getByRole('button', { name: /login/i });
        userEvent.click(submitButton);

        await waitFor(() => {
            expect(accService.editPasswordService).toHaveBeenCalledWith({
                newPassword: 'newpassword123',
            });
        });
    }); 

    test('should show error message on password change failure', async () => {
        accService.getCurrentUser.mockReturnValue({ username: 'testuser' });
        accService.editPasswordService.mockResolvedValue({ status: 400 });

        render(
        <BrowserRouter>
            <ChangePassword />
        </BrowserRouter>
        );

        const passwordInput = screen.getByPlaceholderText('New Password');
        fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });

        const submitButton = screen.getByRole('button', { name: /login/i });
        userEvent.click(submitButton);

        await waitFor(() => {
        expect(screen.getByText('Try again.')).toBeInTheDocument();
        });
    });

    test('should show error message on API error', async () => {
        accService.getCurrentUser.mockReturnValue({ username: 'testuser' });
        accService.editPasswordService.mockRejectedValue(new Error('Network Error'));

        render(
            <BrowserRouter>
                <ChangePassword />
            </BrowserRouter>
        );

        const passwordInput = screen.getByPlaceholderText('New Password');
        fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });

        const submitButton = screen.getByRole('button', { name: /login/i });
        userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Try again.')).toBeInTheDocument();
        });
    });
});
