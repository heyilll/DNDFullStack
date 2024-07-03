import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CharacterView from '../src/components/CharacterView';
import characterService from '../src/services/characters.service';
import { vi } from 'vitest';

// Mock the characterService and useNavigate
vi.mock('../src/services/characters.service'); 

describe('CharacterView Component', () => {
    beforeEach(() => {
        characterService.getSpecificCharactersService.mockClear();
        characterService.removeCharacterService.mockClear();
    });

    test('renders loading state initially', () => {
        render(
            <BrowserRouter>
                <CharacterView />
            </BrowserRouter>
        );
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('fetches and displays character data', async () => {
        const mockCharacter = {
            name: 'John Doe',
            race: 'Elf',
            class: 'Warrior',
            level: 5
        };

        characterService.getSpecificCharactersService.mockResolvedValue(mockCharacter);

        render(
            <BrowserRouter>
                <CharacterView />
            </BrowserRouter>
        );

        // Wait for character data to be fetched and rendered
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Elf')).toBeInTheDocument();
            expect(screen.getByText('Warrior')).toBeInTheDocument();
            expect(screen.getByText('5')).toBeInTheDocument();
        });
    });

    test('handles no character found', async () => {
        characterService.getSpecificCharactersService.mockResolvedValue(null);

        render(
            <BrowserRouter>
                <CharacterView />
            </BrowserRouter>
        );

        // Wait for the no character message
        await waitFor(() => {
            expect(screen.getByText('No character found')).toBeInTheDocument();
        });
    }); 
});
