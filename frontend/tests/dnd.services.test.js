// dndService.test.js
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import dndService from '../src/services/dnd.services';

// Initialize Axios mock adapter
let mock;

beforeEach(() => {
  mock = new MockAdapter(axios);
});

afterEach(() => {
  mock.reset();
});

describe('dndService', () => {

    describe('monstersService', () => {
        it('should fetch monsters data successfully', async () => {
            const mockData = {
                id: 1,
                name: 'Goblin',
                type: 'Beast'
            };
            const searchQuery = 'goblin';
            mock.onGet(`${import.meta.env.VITE_BACKEND_URL}/monsters/${searchQuery}`).reply(200, mockData);

            const response = await dndService.monstersService(searchQuery);
            
            expect(response).toEqual(mockData);
        });

        it('should handle error while fetching monsters data', async () => {
            const searchQuery = 'unknown-monster';
            mock.onGet(`${import.meta.env.VITE_BACKEND_URL}/monsters/${searchQuery}`).reply(404, { message: 'Monster not found' });

            const error = await dndService.monstersService(searchQuery);
            
            expect(error.response.status).toBe(404);
            expect(error.response.data.message).toBe('Monster not found');
        });
    });

    describe('spellsService', () => {
        it('should fetch spells data successfully', async () => {
            const mockData = {
                id: 1,
                name: 'Fireball',
                level: 3
            };
            const searchQuery = 'fireball';
            mock.onGet(`${import.meta.env.VITE_BACKEND_URL}/spells/${searchQuery}`).reply(200, mockData);

            const response = await dndService.spellsService(searchQuery);

            expect(response).toEqual(mockData);
        });

        it('should handle error while fetching spells data', async () => {
            const searchQuery = 'unknown-spell';
            mock.onGet(`${import.meta.env.VITE_BACKEND_URL}/spells/${searchQuery}`).reply(404, { message: 'Spell not found' });

            const error = await dndService.spellsService(searchQuery);

            expect(error.response.status).toBe(404);
            expect(error.response.data.message).toBe('Spell not found');
        });
    });

});
