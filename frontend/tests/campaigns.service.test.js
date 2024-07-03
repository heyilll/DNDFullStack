// campaignService.test.js
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import campaignService from '../src/services/campaigns.service';

// Mock the authHeader module
vi.mock('./authHeader', () => ({
  default: vi.fn(() => ({ Authorization: 'Bearer mockToken' }))
}));

// Initialize Axios mock adapter
let mock;

beforeEach(() => {
  mock = new MockAdapter(axios);
});

afterEach(() => {
  mock.reset();
});

describe('campaignService', () => {

    describe('getCampaignsService', () => {
        it('should fetch all campaigns successfully', async () => {
        const mockData = [{ id: 1, name: 'Campaign 1' }, { id: 2, name: 'Campaign 2' }];
        mock.onGet(`${import.meta.env.VITE_BACKEND_URL}/campaigns`).reply(200, mockData);

        const campaigns = await campaignService.getCampaignsService();
        
        expect(campaigns).toEqual(mockData);
        });

        it('should handle error while fetching campaigns', async () => {
        mock.onGet(`${import.meta.env.VITE_BACKEND_URL}/campaigns`).reply(500);

        const error = await campaignService.getCampaignsService();
        
        expect(error.response.status).toBe(500);
        });
    });

  describe('getSpecificCampaignService', () => {
    it('should fetch a specific campaign successfully', async () => {
      const mockData = { id: 1, name: 'Campaign 1' };
      mock.onGet(`${import.meta.env.VITE_BACKEND_URL}/campaigns/1`).reply(200, mockData);

      const campaign = await campaignService.getSpecificCampaignService(1);

      expect(campaign).toEqual(mockData);
    });

    it('should handle error while fetching a specific campaign', async () => {
      mock.onGet(`${import.meta.env.VITE_BACKEND_URL}/campaigns/1`).reply(404);

      const error = await campaignService.getSpecificCampaignService(1);

      expect(error.response.status).toBe(404);
    });
  });

  describe('addCampaignService', () => {
    it('should add a new campaign successfully', async () => {
      const mockData = { name: 'New Campaign', description: 'Description', dungeon_master: 'DM', created_by: 'User' };
      mock.onPost(`${import.meta.env.VITE_BACKEND_URL}/campaigns`).reply(201, { message: 'Campaign created' });

      const response = await campaignService.addCampaignService(mockData);

      expect(response.status).toBe(201);
      expect(response.data.message).toBe('Campaign created');
    });

    it('should handle error while adding a campaign', async () => {
      const mockData = { name: 'New Campaign', description: 'Description', dungeon_master: 'DM', created_by: 'User' };
      mock.onPost(`${import.meta.env.VITE_BACKEND_URL}/campaigns`).reply(400, { message: 'Failed to create campaign' });

      const error = await campaignService.addCampaignService(mockData);

      expect(error.response.status).toBe(400);
      expect(error.response.data.message).toBe('Failed to create campaign');
    });
  });

  describe('removeCampaignService', () => {
    it('should remove a campaign successfully', async () => {
      mock.onDelete(`${import.meta.env.VITE_BACKEND_URL}/campaigns/1`).reply(200, { message: 'Campaign deleted' });

      const response = await campaignService.removeCampaignService(1);

      expect(response.status).toBe(200);
      expect(response.data.message).toBe('Campaign deleted');
    });

    it('should handle error while removing a campaign', async () => {
      mock.onDelete(`${import.meta.env.VITE_BACKEND_URL}/campaigns/1`).reply(404, { message: 'Campaign not found' });

      const error = await campaignService.removeCampaignService(1);

      expect(error.response.status).toBe(404);
      expect(error.response.data.message).toBe('Campaign not found');
    });
  });

  describe('editCampaignService', () => {
    it('should edit a campaign successfully', async () => {
      const updateData = { name: 'Updated Campaign' };
      mock.onPatch(`${import.meta.env.VITE_BACKEND_URL}/campaigns/1`).reply(200, { message: 'Campaign updated' });

      const response = await campaignService.editCampaignService(1, updateData);

      expect(response.status).toBe(200);
      expect(response.data.message).toBe('Campaign updated');
    });

    it('should handle error while editing a campaign', async () => {
      const updateData = { name: 'Updated Campaign' };
      mock.onPatch(`${import.meta.env.VITE_BACKEND_URL}/campaigns/1`).reply(400, { message: 'Failed to update campaign' });

      const error = await campaignService.editCampaignService(1, updateData);

      expect(error.response.status).toBe(400);
      expect(error.response.data.message).toBe('Failed to update campaign');
    });
  });

  describe('addCharacterToCampaignService', () => {
    it('should add a character to a campaign successfully', async () => {
      mock.onPatch(`${import.meta.env.VITE_BACKEND_URL}/campaigns/1`).reply(200, { message: 'Character added' });

      const response = await campaignService.addCharacterToCampaignService(1, 123);

      expect(response.status).toBe(200);
      expect(response.data.message).toBe('Character added');
    });

    it('should handle error while adding a character to a campaign', async () => {
      mock.onPatch(`${import.meta.env.VITE_BACKEND_URL}/campaigns/1`).reply(400, { message: 'Failed to add character' });

      const error = await campaignService.addCharacterToCampaignService(1, 123);

      expect(error.response.status).toBe(400);
      expect(error.response.data.message).toBe('Failed to add character');
    });
  });

  describe('removeCharacterFromCampaignService', () => {
    it('should remove a character from a campaign successfully', async () => {
      mock.onPatch(`${import.meta.env.VITE_BACKEND_URL}/campaigns/1`).reply(200, { message: 'Character removed' });

      const response = await campaignService.removeCharacterFromCampaignService(1, 123);

      expect(response.status).toBe(200);
      expect(response.data.message).toBe('Character removed');
    });

    it('should handle error while removing a character from a campaign', async () => {
      mock.onPatch(`${import.meta.env.VITE_BACKEND_URL}/campaigns/1`).reply(400, { message: 'Failed to remove character' });

      const error = await campaignService.removeCharacterFromCampaignService(1, 123);

      expect(error.response.status).toBe(400);
      expect(error.response.data.message).toBe('Failed to remove character');
    });
  });
});
