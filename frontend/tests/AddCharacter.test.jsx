import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddCharacter from '../src/components/AddCharacter';
import accService from '../src/services/account.service';
import characterService from '../src/services/characters.service';

// Mock the services and useNavigate
vi.mock('../src/services/account.service');
vi.mock('../src/services/characters.service'); 

describe('AddCharacter Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        accService.getCurrentUser.mockResolvedValue({ id: '123' });
    });

    it('renders the character creation form', () => {
        render(<AddCharacter />, { wrapper: BrowserRouter });

        expect(screen.getByText('Create Your Character')).toBeInTheDocument();
        expect(screen.getByLabelText('Character Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Race')).toBeInTheDocument();
        expect(screen.getByLabelText('Character Class')).toBeInTheDocument();
        expect(screen.getByLabelText('Character Level')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Create Character' })).toBeInTheDocument();
    });

    it('updates input values on change', () => {
        render(<AddCharacter />, { wrapper: BrowserRouter });
        
        const nameInput = screen.getByLabelText('Character Name');
        fireEvent.change(nameInput, { target: { value: 'Aragorn' } });
        expect(nameInput.value).toBe('Aragorn');

        const raceSelect = screen.getByLabelText('Race');
        fireEvent.change(raceSelect, { target: { value: 'human' } });
        expect(raceSelect.value).toBe('human');

        const classSelect = screen.getByLabelText('Character Class');
        fireEvent.change(classSelect, { target: { value: 'ranger' } });
        expect(classSelect.value).toBe('ranger');

        const levelSelect = screen.getByLabelText('Character Level');
        fireEvent.change(levelSelect, { target: { value: '5' } });
        expect(levelSelect.value).toBe('5');
    }); 
    
    it('logs error when character creation fails', async () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        characterService.addCharacterService.mockRejectedValue(new Error('Creation failed'));

        render(<AddCharacter />, { wrapper: BrowserRouter });
        
        fireEvent.change(screen.getByLabelText('Character Name'), { target: { value: 'Gimli' } });
        fireEvent.change(screen.getByLabelText('Race'), { target: { value: 'dwarf' } });
        fireEvent.change(screen.getByLabelText('Character Class'), { target: { value: 'fighter' } });
        fireEvent.change(screen.getByLabelText('Character Level'), { target: { value: '8' } });

        fireEvent.click(screen.getByRole('button', { name: 'Create Character' }));

        await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
        });

        consoleSpy.mockRestore();
    });
});