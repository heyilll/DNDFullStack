import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import AddCharacterToCampaign from '../src/components/AddCharacterToCampaign';
import campaignService from '../src/services/campaigns.service';
 
vi.mock('../src/services/campaigns.service');
describe('AddCharacterToCampaign', () => { 
    beforeEach(() => {
        vi.clearAllMocks(); 
    });

    it('renders loading state initially', () => {
        render(<AddCharacterToCampaign id="123" />, { wrapper: MemoryRouter });
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders campaigns when loaded', async () => {
        const mockCampaigns = [
        { id: '1', name: 'Campaign 1' },
        { id: '2', name: 'Campaign 2' },
        ];
        campaignService.getCampaignsService.mockResolvedValue(mockCampaigns);

        render(<AddCharacterToCampaign id="123" />, { wrapper: MemoryRouter });

        await waitFor(() => { 
            expect(screen.getByText('Campaign 1')).toBeInTheDocument();
            expect(screen.getByText('Campaign 2')).toBeInTheDocument();
        });
    });  

    it('renders no campaigns found message', async () => {
        campaignService.getCampaignsService.mockResolvedValue(null);

        render(<AddCharacterToCampaign id="123" />, { wrapper: MemoryRouter });

        await waitFor(() => {
            expect(screen.getByText('No campaigns found')).toBeInTheDocument();
        });
    });
});