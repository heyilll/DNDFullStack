import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import CharacterCards from '../src/components/CharacterCards'; 
import characterService from '../src/services/characters.service.js';

vi.mock('../src/services/campaigns.service');
vi.mock('../src/services/characters.service');

const mockCharacter = {
    _id: '123',
    name: 'Test Character'
};

describe('CharacterCards Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state when character is a string', async () => {
        characterService.getSpecificCharactersService.mockResolvedValue({ name: 'Loaded Character' });
        
        render(
        <MemoryRouter>
            <CharacterCards character="123" />
        </MemoryRouter>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
        
        await waitFor(() => {
            expect(screen.getByText('Loaded Character')).toBeInTheDocument();
        });
    }); 
    
    it('renders the campaign name', () => {
        render(
        <MemoryRouter>
            <CharacterCards character={mockCharacter} />
        </MemoryRouter>
        );

        expect(screen.getByText('Test Character')).toBeTruthy();
    });
        
        it('links to the correct campaign page', () => {
        render(
            <MemoryRouter>
                <CharacterCards character={mockCharacter} />
            </MemoryRouter>
        );
            
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/characters/123');
    }); 
});