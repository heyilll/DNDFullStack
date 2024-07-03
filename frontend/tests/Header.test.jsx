import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../src/components/Header.jsx'; 

describe('Header', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  }; 

  it('renders the navigation toggle button', () => {
    renderHeader();
    const toggleButton = screen.getByRole('button', { name: /toggle navigation/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('renders the Home link', () => {
    renderHeader();
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders the My View link', () => {
    renderHeader();
    const myViewLink = screen.getByRole('link', { name: /my view/i });
    expect(myViewLink).toHaveAttribute('href', '/myview');
  }); 
});