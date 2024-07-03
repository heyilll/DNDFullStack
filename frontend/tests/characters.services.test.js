// characterService.test.js
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import characterService from '../src/services/characters.service';

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

describe('characterService', () => {

    describe('getCharactersService', () => {
        it('should fetch all characters successfully', async () => {
        const mockData = [
            { id: 1, name: 'Character 1' },
            { id: 2, name: 'Character 2' }
        ];
        mock.onGet(`${import.meta.env.VITE_BACKEND_URL}/characters`).reply(200, mockData);

        const characters = await characterService.getCharactersService();
        
        expect(characters).toEqual(mockData);
        });

        it('should handle error while fetching characters', async () => {
        mock.onGet(`${import.meta.env.VITE_BACKEND_URL}/characters`).reply(500);

        const error = await characterService.getCharactersService();
        
        expect(error.response.status).toBe(500);
        });
    });

    describe('getSpecificCharactersService', () => {
        it('should fetch a specific character successfully', async () => {
        const mockData = { id: 1, name: 'Character 1' };
        mock.onGet(`${import.meta.env.VITE_BACKEND_URL}/characters/1`).reply(200, mockData);

        const character = await characterService.getSpecificCharactersService(1);

        expect(character).toEqual(mockData);
        });

        it('should handle error while fetching a specific character', async () => {
            mock.onGet(`${import.meta.env.VITE_BACKEND_URL}/characters/1`).reply(404);

            const error = await characterService.getSpecificCharactersService(1);

            expect(error.response.status).toBe(404);
        });
    });

    describe('addCharacterService', () => {
        it('should add a new character successfully', async () => {
            const mockData = {
                name: 'New Character',
                race: 'Elf',
                dndclass: 'Wizard',
                level: 1,
                created_by: 'User'
            };
            mock.onPost(`${import.meta.env.VITE_BACKEND_URL}/characters`).reply(201, { message: 'Character created' });

            const response = await characterService.addCharacterService(mockData);

            expect(response.status).toBe(201);
            expect(response.data.message).toBe('Character created');
        });

        it('should handle error while adding a character', async () => {
            const mockData = {
                name: 'New Character',
                race: 'Elf',
                dndclass: 'Wizard',
                level: 1,
                created_by: 'User'
            };
            mock.onPost(`${import.meta.env.VITE_BACKEND_URL}/characters`).reply(400, { message: 'Failed to create character' });

            const error = await characterService.addCharacterService(mockData);

            expect(error.response.status).toBe(400);
            expect(error.response.data.message).toBe('Failed to create character');
        });
    });

    describe('removeCharacterService', () => {
        it('should remove a character successfully', async () => {
            mock.onDelete(`${import.meta.env.VITE_BACKEND_URL}/characters/1`).reply(200, { message: 'Character deleted' });

            const response = await characterService.removeCharacterService(1);

            expect(response.status).toBe(200);
            expect(response.data.message).toBe('Character deleted');
        });

        it('should handle error while removing a character', async () => {
            mock.onDelete(`${import.meta.env.VITE_BACKEND_URL}/characters/1`).reply(404, { message: 'Character not found' });

            const error = await characterService.removeCharacterService(1);

            expect(error.response.status).toBe(404);
            expect(error.response.data.message).toBe('Character not found');
        });
    });

    describe('editCharacterService', () => {
        it('should edit a character successfully', async () => {
            const updateData = { name: 'Updated Character' };
            mock.onPatch(`${import.meta.env.VITE_BACKEND_URL}/characters/1`).reply(200, { message: 'Character updated' });

            const response = await characterService.editCharacterService(1, updateData);

            expect(response.status).toBe(200);
            expect(response.data.message).toBe('Character updated');
        });

        it('should handle error while editing a character', async () => {
            const updateData = { name: 'Updated Character' };
            mock.onPatch(`${import.meta.env.VITE_BACKEND_URL}/characters/1`).reply(400, { message: 'Failed to update character' });

            const error = await characterService.editCharacterService(1, updateData);

            expect(error.response.status).toBe(400);
            expect(error.response.data.message).toBe('Failed to update character');
        });
    });

});
