import { render, screen } from '@testing-library/react';
import Listing from '../components/listing';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

describe("Listing renders", () => {

  const stylesMock = {
    styleName: 'style text',
  
  }

  test('Listing renders with correct text', () => {
    render(
      <MemoryRouter>
        <Listing styles={stylesMock} style={'styleName'} />
      </MemoryRouter>
    );

    const styleName = screen.getByText('styleName');
    expect(styleName).toBeInTheDocument();
    const styleText = screen.getByText('style text');
    expect(styleText).toBeInTheDocument()
  });
})