import { render, screen } from '@testing-library/react';
import Home from '../components/home';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

jest.mock('../objects/styles', () => {
  const object = {
    exampleName1: 'example style text 1',
    exampleName2: 'example style text 2',
  }
  return {
    styles: object,
  };
});

describe("Listing renders", () => {

  test('Listing renders with correct text', () => {
    
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const exampleName1 = screen.getByText('exampleName1');
    expect(exampleName1).toBeInTheDocument();
    const exampleStyle1 = screen.getByText('example style text 1');
    expect(exampleStyle1).toBeInTheDocument()
    const exampleName2 = screen.getByText('exampleName2');
    expect(exampleName2).toBeInTheDocument()
    const exampleStyle2 = screen.getByText('example style text 2');
    expect(exampleStyle2).toBeInTheDocument()
  });
})