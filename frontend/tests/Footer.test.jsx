import { render, screen } from '@testing-library/react';
import Footer from '../src/components/Footer.jsx';
import { describe, test, expect } from 'vitest';

describe('Footer Component', () => {
    test('renders the footer with correct text', () => {
        render(<Footer />);
        const footerElement = screen.getByText('© 2024 DFCorp');
        expect(footerElement).toBeInTheDocument();
    }); 
});
