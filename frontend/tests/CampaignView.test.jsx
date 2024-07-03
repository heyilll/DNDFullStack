import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CampaignView from '../src/components/CampaignView';
import campaignService from '../src/services/campaigns.service';

// Mock the campaign service
vi.mock("../src/services/campaigns.service");

// Mock the child components
vi.mock('./CharacterCards', () => ({
  default: () => <div data-testid="character-card">Mocked Character Card</div>
}));
vi.mock('./MonsterSearch', () => ({
  default: () => <div data-testid="monster-search">Mocked Monster Search</div>
}));
vi.mock('./SpellSearch', () => ({
  default: () => <div data-testid="spell-search">Mocked Spell Search</div>
}));

describe('CampaignView', () => {
    const mockCampaign = {
        id: '1',
        name: 'Test Campaign',
        dungeon_master: 'Test DM',
        description: 'Test Description',
        players: ['1', '2']
    };

    beforeEach(() => {
        campaignService.getSpecificCampaignService.mockResolvedValue(mockCampaign);
        campaignService.removeCampaignService.mockResolvedValue({ status: 201 });
    });

    it('renders loading state initially', () => {
        render(
        <MemoryRouter initialEntries={['/campaign/1']}>
            <Routes>
            <Route path="/campaign/:id" element={<CampaignView />} />
            </Routes>
        </MemoryRouter>
        );
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders campaign details after loading', async () => {
        render(
        <MemoryRouter initialEntries={['/campaign/1']}>
            <Routes>
            <Route path="/campaign/:id" element={<CampaignView />} />
            </Routes>
        </MemoryRouter>
        );

        await waitFor(() => {
        expect(screen.getByText('Test Campaign')).toBeInTheDocument();
        expect(screen.getByText('Test DM')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        });
    }); 
    
    it('renders MonsterSearch and SpellSearch components', async () => {
        render(
        <MemoryRouter initialEntries={['/campaign/1']}>
            <Routes>
            <Route path="/campaign/:id" element={<CampaignView />} />
            </Routes>
        </MemoryRouter>
        );

        await waitFor(() => {
        expect(screen.getByText('Search monsters')).toBeInTheDocument();
        expect(screen.getByText('Search spells')).toBeInTheDocument();
        });
    }); 
});