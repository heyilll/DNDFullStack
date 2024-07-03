import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MonsterSearch from '../src/components/MonsterSearch';
import dndService from '../src/services/dnd.services';

// Mock the dndService and ResultCards component
vi.mock('../src/services/dnd.services');
vi.mock('./ResultCards', () => ({
  default: ({ result, format }) => (
    <div data-testid="result-card">
      {result.name} - {format}
    </div>
  ),
}));

describe('MonsterSearch Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the search form', () => {
        render(<MonsterSearch />);
        expect(screen.getByLabelText('Search monsters')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter a monster name')).toBeInTheDocument();
    });

    it('updates search input value on change', () => {
        render(<MonsterSearch />);
        const input = screen.getByLabelText('Search monsters');
        fireEvent.change(input, { target: { value: 'dragon' } });
        expect(input.value).toBe('dragon');
    });

    it('calls dndService.monstersService on form submission', async () => {
        dndService.monstersService.mockResolvedValue({ results: [] });
        render(<MonsterSearch />);
        const input = screen.getByLabelText('Search monsters');
        fireEvent.change(input, { target: { value: 'dragon' } });
        fireEvent.submit(screen.getByLabelText('Monster search form'));

        await waitFor(() => {
        expect(dndService.monstersService).toHaveBeenCalledWith('dragon');
        });
    }); 
});