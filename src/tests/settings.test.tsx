import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import * as importExport from '../scripts/import-export-css';
import Settings from '../components/settings';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Settings page component', () => {
  test('Renders properly', () => {
    render(
      <MemoryRouter>
        <Settings setIsDarkMode={jest.fn()} isDarkMode={true} />
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
        <Settings setIsDarkMode={jest.fn()} isDarkMode={true} />
      </MemoryRouter>,
    );

    const importButton = screen.getByText('Loading...');
    expect(importButton).toBeInTheDocument();
  });

  test('export fires', () => {
    const masterStylesMock = {
      styleName: { isActive: true, css: 'style text' },
      styleName2: { isActive: true, css: 'style text 2' },
    };

    const mock = jest.spyOn(importExport, 'assembleCssForExport').mockImplementation(jest.fn());
    render(
      <MemoryRouter>
        <Settings setIsDarkMode={jest.fn()} isDarkMode={true} />
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

describe('Dark mode', () => {
  const mockSetMode = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Selector renders with options', () => {
    render(
      <MemoryRouter>
        <Settings setIsDarkMode={jest.fn()} isDarkMode={true} />
      </MemoryRouter>,
    );

    const selector = screen.getByPlaceholderText('Select light or dark mode.');
    expect(selector).toBeInTheDocument();
    const light = screen.getByText('Light');
    expect(light).toBeInTheDocument();
    const dark = screen.getByText('Dark');
    expect(dark).toBeInTheDocument();
  });

  test('Light selector works', async () => {
    render(
      <MemoryRouter>
        <Settings setIsDarkMode={mockSetMode} isDarkMode={true} />
      </MemoryRouter>,
    );

    const selector = screen.getByPlaceholderText('Select light or dark mode.');
    const light = screen.getByText('Light');

    await act(async () => {
      await userEvent.click(selector);
      await userEvent.click(light);
    });

    expect(mockSetMode).toHaveBeenCalledTimes(1);
    expect(mockSetMode).toHaveBeenCalledWith(false);
  });

  test('Dark selector works', () => {
    render(
      <MemoryRouter>
        <Settings setIsDarkMode={mockSetMode} isDarkMode={true} />
      </MemoryRouter>,
    );

    waitFor(async () => {
      const selector = screen.getByPlaceholderText('Select light or dark mode.');
      const dark = screen.getByText('Dark');

      await act(async () => {
        if (selector) {
          await userEvent.click(selector);
        }
        await userEvent.click(dark);
      });

      expect(mockSetMode).toHaveBeenCalledTimes(1);
      expect(mockSetMode).toHaveBeenCalledWith(true);
    });
  });
});
