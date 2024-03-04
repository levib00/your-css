
import { render, screen } from '@testing-library/react';
import Settings from '../components/settings';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Settings page component',() => {
  test('Renders properly', () => {
    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    const importButton = screen.getByText('import');
    expect(importButton).toBeInTheDocument();
    const exportButton = screen.getByText('export')
    expect(exportButton).toBeInTheDocument();
  })
})