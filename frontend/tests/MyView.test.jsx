import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MyView from '../src/components/MyView.jsx'
import accService from '../src/services/account.service';
import campaignService from '../src/services/campaigns.service';
import characterService from '../src/services/characters.service';

// Mock the services
vi.mock("../src/services/account.service");
vi.mock("../src/services/campaigns.service");
vi.mock("../src/services/characters.service");

describe('MyView Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  }); 

  it('displays user info when logged in', async () => {
    const mockUser = { _id: '123', username: 'testuser' };
    accService.getCurrentUser.mockResolvedValue(mockUser);
    campaignService.getCampaignsService.mockResolvedValue([]);
    characterService.getCharactersService.mockResolvedValue([]);

    await act(async () => {
      render(<BrowserRouter><MyView /></BrowserRouter>);
    });

    await waitFor(() => {
      expect(screen.getByText('My User Info')).toBeTruthy();
      expect(screen.getByText('Logged in as:')).toBeTruthy();
    });
  });  

  it('displays campaigns when available', async () => {
    const mockCampaigns = [{ _id: '1', name: 'Test Campaign' }];
    accService.getCurrentUser.mockResolvedValue({ _id: '123', username: 'testuser' });
    campaignService.getCampaignsService.mockResolvedValue(mockCampaigns);
    characterService.getCharactersService.mockResolvedValue([]);

    await act(async () => {
      render(<BrowserRouter><MyView /></BrowserRouter>);
    });

    await waitFor(() => {
      expect(screen.getByText('My Campaigns')).toBeTruthy();
      expect(screen.getByText('Test Campaign')).toBeTruthy();
    });
  }); 

  it('displays characters when available', async () => {
    const mockCharacters = [{ _id: '1', name: 'Test Character' }];
    accService.getCurrentUser.mockResolvedValue({ _id: '123', username: 'testuser' });
    campaignService.getCampaignsService.mockResolvedValue([]);
    characterService.getCharactersService.mockResolvedValue(mockCharacters);

    await act(async () => {
      render(<BrowserRouter><MyView /></BrowserRouter>);
    });

    await waitFor(() => {
      expect(screen.getByText('My Characters')).toBeTruthy();
      expect(screen.getByText('Test Character')).toBeTruthy();
    });
  });

  it('displays "No characters found" when no characters are available', async () => {
    accService.getCurrentUser.mockResolvedValue({ _id: '123', username: 'testuser' });
    campaignService.getCampaignsService.mockResolvedValue({response: {status: '403'}});
    characterService.getCharactersService.mockResolvedValue({response: {status: "403"}});

    await act(async () => {
      render(<BrowserRouter><MyView /></BrowserRouter>);
    });

    await waitFor(() => {
      expect(screen.getByText('No characters found')).toBeTruthy();
    });
  });
});