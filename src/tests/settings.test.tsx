
import { render, screen } from '@testing-library/react';
import Settings from '../components/settings';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import * as importExport from '../scripts/import-export-css';

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

  test('export fires', async () => {
    const mock = jest.spyOn(importExport, 'assembleCssForExport').mockImplementation(jest.fn())
    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    const exportButton = screen.getByText('export');
    expect(exportButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(exportButton)
    })

    expect(mock).toHaveBeenCalledTimes(1)
  })
})