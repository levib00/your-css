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

    // TODO: will have to change to aria labels or something once these are changed to icons
    const home = screen.getByText('Home');
    expect(home).toBeInTheDocument();
    const settings = screen.getByText('Settings');
    expect(settings).toBeInTheDocument();
    const about = screen.getByText('About');
    expect(about).toBeInTheDocument();
  });
});
