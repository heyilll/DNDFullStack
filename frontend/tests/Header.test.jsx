import { render } from '@testing-library/react';
import Header from '../src/components/Header';
import { BrowserRouter } from 'react-router-dom';

test(`Header matches snapshot`, () => {
  expect(render(
  <BrowserRouter>  
    <Header />
  </BrowserRouter>)).toMatchSnapshot();
});