import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import About from '../components/about';

describe('About renders', () => {
  test('About renders with correct text', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const sourceCode = screen.getByText('Source Code');
    expect(sourceCode).toBeInTheDocument();
    const bugAndReports = screen.getByText('Bugs & Reports');
    expect(bugAndReports).toBeInTheDocument();
    const releases = screen.getByText('Releases');
    expect(releases).toBeInTheDocument();
    const buyMeACoffee = screen.getByText('Buy Me A Coffee');
    expect(buyMeACoffee).toBeInTheDocument();
  });
});
