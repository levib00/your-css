import { render, screen } from '@testing-library/react';
import Form from '../components/form';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

describe("Listing renders", () => {

  test('Listing renders with correct text', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );

    const websiteLabel = screen.getByText('Website');
    expect(websiteLabel).toBeInTheDocument();
    const textAreaLabel = screen.getByText('custom css');
    expect(textAreaLabel).toBeInTheDocument()
  });
})