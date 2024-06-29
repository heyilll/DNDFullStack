import { render } from '@testing-library/react';
import Footer from '../src/components/Footer';

test(`Footer matches snapshot`, () => {
  expect(render(<Footer />)).toMatchSnapshot();
});