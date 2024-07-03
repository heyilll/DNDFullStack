import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import SpellSearch from '../src/components/SpellSearch';
import dndService from '../src/services/dnd.services';
import ResultCards from '../src/components/ResultCards';

// Mock the dndService and ResultCards
vi.mock('../src/services/dnd.services');
vi.mock('../src/components/ResultCards', () => ({
  default: vi.fn(() => <div data-testid="result-card" />)
}));

describe('SpellSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the search form correctly', () => {
    render(<SpellSearch />);
    
    expect(screen.getByText('Search spells')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter a spell name')).toBeInTheDocument();
  });

  it('calls dndService.spellsService on form submission', async () => {
    dndService.spellsService.mockResolvedValue({ results: [] });
    render(<SpellSearch />);
    const input = screen.getByText('Search spells'); 

    await act(async () => {
      await userEvent.type(input, 'fireball');
      fireEvent.submit(screen.getByLabelText('Spell search form'));
    });

    expect(dndService.spellsService).toHaveBeenCalledWith('fireball');
  });
});