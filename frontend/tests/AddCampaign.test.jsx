import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddCampaign from '../src/components/AddCampaign';
import accService from '../src/services/account.service'; 

// Mock the services and useNavigate
vi.mock('../src/services/account.service');
vi.mock('../src/services/campaigns.service');

describe('AddCampaign Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders "Not logged in" when there is no current user', async () => {
        accService.getCurrentUser.mockResolvedValue(null);

        render(<AddCampaign />, { wrapper: BrowserRouter });

        await waitFor(() => {
        expect(screen.getByText('Not logged in')).toBeInTheDocument();
        });
    });

    it('renders the campaign creation form when user is logged in', async () => {
        accService.getCurrentUser.mockResolvedValue({ username: 'testuser', id: '123' });

        render(<AddCampaign />, { wrapper: BrowserRouter });

        await waitFor(() => {
            expect(screen.getByText('Create Your Campaign')).toBeInTheDocument();
            expect(screen.getByLabelText('Campaign Name')).toBeInTheDocument();
            expect(screen.getByLabelText('Campaign Description')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Create Campaign' })).toBeInTheDocument();
        });
    });

    it('updates input values on change', async () => {
        accService.getCurrentUser.mockResolvedValue({ username: 'testuser', id: '123' });

        render(<AddCampaign />, { wrapper: BrowserRouter });
        
        await waitFor(() => {
            const nameInput = screen.getByLabelText('Campaign Name');
            const descriptionInput = screen.getByLabelText('Campaign Description');
            
            fireEvent.change(nameInput, { target: { value: 'Test Campaign' } });
            fireEvent.change(descriptionInput, { target: { value: 'This is a test campaign' } });
            
            expect(nameInput.value).toBe('Test Campaign');
            expect(descriptionInput.value).toBe('This is a test campaign');
        });
    }); 
});