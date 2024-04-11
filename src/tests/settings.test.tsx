import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import * as importExport from '../scripts/import-export-css';
import Settings from '../components/settings';

describe('Settings page component', () => {
  test('Renders properly', () => {
    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>,
    );

    waitFor(async () => {
      const importButton = screen.getByText('import');
      expect(importButton).toBeInTheDocument();
      const exportButton = screen.getByText('export');
      expect(exportButton).toBeInTheDocument();
    });
  });

  test('Renders loading', () => {
    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>,
    );

    const importButton = screen.getByText('Loading...');
    expect(importButton).toBeInTheDocument();
  });

  test('export fires', async () => {
    const masterStylesMock = {
      styleName: { isActive: true, css: 'style text' },
      styleName2: { isActive: true, css: 'style text 2' },
    };

    const mock = jest.spyOn(importExport, 'assembleCssForExport').mockImplementation(jest.fn());
    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>,
    );

    jest.spyOn(importExport, 'assembleCssForExport').mockImplementationOnce(() => 'Updated');

    waitFor(async () => {
      const exportButton = screen.getByText('export');
      expect(exportButton).toBeInTheDocument();

      await act(async () => {
        await userEvent.click(exportButton);
      });
      expect(mock).toHaveBeenCalledWith(masterStylesMock, null);
    });
  });
});
