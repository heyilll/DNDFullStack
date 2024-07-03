import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultCards from '../src/components/ResultCards';

describe('ResultCards', () => {
  it('renders monster card correctly', () => {
    const monsterResult = { name: 'Dragon' };
    render(<ResultCards result={monsterResult} format="monster" />);

    expect(screen.getByText('Dragon')).toBeInTheDocument(); 
  });

  it('renders spell card correctly', () => {
    const spellResult = { name: 'Fireball' };
    render(<ResultCards result={spellResult} format="spell" />);

    expect(screen.getByText('Fireball')).toBeInTheDocument();
    expect(screen.getAllByText('Fireball')).toHaveLength(1); 
  }); 
  
  it('returns null for unknown format', () => {
    const result = { name: 'Unknown' };
    const { container } = render(<ResultCards result={result} format="unknown" />);

    expect(container.firstChild).toBeNull();
  });
});