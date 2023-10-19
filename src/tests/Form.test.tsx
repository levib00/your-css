import { render, screen } from '@testing-library/react';
import Form from '../components/form';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

describe("Listing renders", () => {

  test('Create new form renders.', () => {
    render(
      <MemoryRouter>
        <Form website='' customCss='' />
      </MemoryRouter>
    );

    const websiteLabel = screen.getByText('Website');
    expect(websiteLabel).toBeInTheDocument();
    const textAreaLabel = screen.getByText('custom css');
    expect(textAreaLabel).toBeInTheDocument()
  });

  test('edit form renders with previous text.', () => {
    render(
      <MemoryRouter>
        <Form website='example website' customCss='exampleCss'/>
      </MemoryRouter>
    );

    const websiteText = screen.getByDisplayValue('example website');
    expect(websiteText).toBeInTheDocument();
    const textAreaText = screen.getByDisplayValue('exampleCss');
    expect(textAreaText).toBeInTheDocument()
  });
})