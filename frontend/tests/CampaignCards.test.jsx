import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CampaignCards from '../src/components/CampaignCards';

describe('CampaignCards', () => {
  const mockCampaign = {
    _id: '123',
    name: 'Test Campaign'
  };

  it('renders the campaign name', () => {
    render(
      <MemoryRouter>
        <CampaignCards campaign={mockCampaign} />
      </MemoryRouter>
    );
    expect(screen.getByText('Test Campaign')).toBeTruthy();
  });

  it('links to the correct campaign page', () => {
    render(
      <MemoryRouter>
        <CampaignCards campaign={mockCampaign} />
      </MemoryRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/campaigns/123');
  });  
});