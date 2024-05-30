import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../components/nav';
import '@testing-library/jest-dom';

describe('Nav bar renders', () => {
  test('Nav bar renders with correct text', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

    const home = screen.getByTitle('Home');
    expect(home).toBeInTheDocument();
    const settings = screen.getByTitle('Settings');
    expect(settings).toBeInTheDocument();
    const about = screen.getByTitle('About');
    expect(about).toBeInTheDocument();
  });
});
