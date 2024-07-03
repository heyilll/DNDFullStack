import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MyView from '../src/components/MyView';
import accService from '../src/services/account.service';
import campaignService from '../src/services/campaigns.service';
import characterService from '../src/services/characters.service'; 

// Mock the services
vi.mock('../src/services/account.service.js');
vi.mock('../src/services/campaigns.service.js');
vi.mock('../src/services/characters.service.js');
vi.mock('../src/components/CharacterCards', () => ({ default: () => <div>Character Card</div> }));
vi.mock('../src/components/CampaignCards', () => ({ default: () => <div>Campaign Card</div> }));
 
describe('MyView Component', () => {
    beforeEach(() => {
      // Reset all mocks before each test
      vi.resetAllMocks();
    });

    it('displays loading state initially', () => {
      render(<MyView />, { wrapper: BrowserRouter });
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('displays user information when logged in', async () => {
      accService.getCurrentUser.mockResolvedValue({ _id: '1', username: 'testuser' });
      campaignService.getCampaignsService.mockResolvedValue([]);
      characterService.getCharactersService.mockResolvedValue([]);

      render(<MyView />, { wrapper: BrowserRouter });

      await waitFor(() => {
        expect(screen.getByText('My View')).toBeInTheDocument();
        expect(screen.getByText('Logged in as:')).toBeInTheDocument();
        expect(screen.getByText('Change Password')).toBeInTheDocument();
      });
    });

    it('displays "Not logged in" when user is not logged in', async () => {
      accService.getCurrentUser.mockResolvedValue(null);
      campaignService.getCampaignsService.mockResolvedValue([]);
      characterService.getCharactersService.mockResolvedValue([]);

      render(<MyView />, { wrapper: BrowserRouter });

      await waitFor(() => {
        expect(screen.getByText('Not logged in')).toBeInTheDocument();
      });
    });

    it('renders campaigns when available', async () => {
      accService.getCurrentUser.mockResolvedValue({ _id: '1', username: 'testuser' });
      campaignService.getCampaignsService.mockResolvedValue([{ _id: '1' }, { _id: '2' }]);
      characterService.getCharactersService.mockResolvedValue([]);

      render(<MyView />, { wrapper: BrowserRouter });

      await waitFor(() => {
        expect(screen.getAllByText('Campaign Card')).toHaveLength(2);
        expect(screen.getByText('Create new campaign')).toBeInTheDocument();
      });
    });

    it('renders characters when available', async () => {
      accService.getCurrentUser.mockResolvedValue({ _id: '1', username: 'testuser' });
      campaignService.getCampaignsService.mockResolvedValue([]);
      characterService.getCharactersService.mockResolvedValue([{ _id: '1' }, { _id: '2' }, { _id: '3' }]);

      render(<MyView />, { wrapper: BrowserRouter });

      await waitFor(() => {
        expect(screen.getAllByText('Character Card')).toHaveLength(3);
        expect(screen.getByText('Create new character')).toBeInTheDocument();
      });
    });

    it('displays "No campaigns found" when no campaigns are available', async () => {
      accService.getCurrentUser.mockResolvedValue({ _id: '1', username: 'testuser' });
      campaignService.getCampaignsService.mockResolvedValue(null);
      characterService.getCharactersService.mockResolvedValue([]);

      render(<MyView />, { wrapper: BrowserRouter });


      await waitFor(() => {
        expect(screen.getByText('No campaigns found')).toBeInTheDocument();
      });
    });

    it('displays "No characters found" when no characters are available', async () => {
      accService.getCurrentUser.mockResolvedValue({ _id: '1', username: 'testuser' });
      campaignService.getCampaignsService.mockResolvedValue([]);
      characterService.getCharactersService.mockResolvedValue(null);

      render(<MyView />, { wrapper: BrowserRouter });

      await waitFor(() => {
        expect(screen.getByText('No characters found')).toBeInTheDocument();
      });
    });
});