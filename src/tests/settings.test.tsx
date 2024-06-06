import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import * as importExport from '../scripts/import-export-css';
import * as storageHandlers from '../scripts/storage-handlers';
import Settings from '../components/settings';

describe('Settings page component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  test('Renders properly', async () => {
    render(
      <MemoryRouter>
        <Settings setIsDarkMode={jest.fn()} isDarkMode={true} />
      </MemoryRouter>,
    );

    const importButton = await screen.findByText('import');
    const exportButton = await screen.findByText('export');

    expect(importButton).toBeInTheDocument();
    expect(exportButton).toBeInTheDocument();
  });

  test('Renders loading', async () => {
    render(
      <MemoryRouter>
        <Settings setIsDarkMode={jest.fn()} isDarkMode={true} />
      </MemoryRouter>,
    );

    const loadingText = await screen.findByText('Loading...');

    expect(loadingText).toBeInTheDocument();
  });

  test('export fires', async () => {
    const masterStylesMock = {
      styleName: { isActive: true, css: 'style text' },
      styleName2: { isActive: true, css: 'style text 2' },
    };

    const expectedResult = {
      ___toggleAll: {
        css: "",
        displayName: "toggle all",
        isActive: true,
        undeleteable: true,
      },
      __global:  {
        css: "",
        displayName: "global styles",
        isActive: false,
        undeleteable: true,
      },
      _extension: {
        css: "",
        displayName: "extension styles",
        isActive: false,
        undeleteable: true,
      },
      styleName: { isActive: true, css: 'style text' },
      styleName2: { isActive: true, css: 'style text 2' },
    }

    const mock = jest.spyOn(importExport, 'assembleCssForExport').mockReturnValue('Updated');

    jest.spyOn(storageHandlers, 'getFromStorage').mockResolvedValue(masterStylesMock);

    render(
      <MemoryRouter>
        <Settings setIsDarkMode={jest.fn()} isDarkMode={true} />
      </MemoryRouter>,
    );

    const exportButton = await screen.findByText('export');

    await act(async () => {
      await userEvent.click(exportButton);
    });

    expect(mock).toHaveBeenCalledWith(expectedResult, null);
  });
});

describe('Dark mode', () => {
  const mockSetMode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  test('Selector renders with options', async () => {
    render(
      <MemoryRouter>
        <Settings setIsDarkMode={jest.fn()} isDarkMode={true} />
      </MemoryRouter>,
    );

    const selector = screen.getByText('dark');
    expect(selector).toBeInTheDocument();

    await userEvent.click(selector);

    const light = screen.getByText('light');
    const dark = screen.getAllByText('dark')[1];
    expect(light).toBeInTheDocument();
    expect(dark).toBeInTheDocument();
  });

  test('Dark selector works', async () => {
    render(
      <MemoryRouter>
        <Settings setIsDarkMode={mockSetMode} isDarkMode={false} />
      </MemoryRouter>,
    );

    const lightSelector = screen.getByText('light');
    await userEvent.click(lightSelector);

    const darkSelector = screen.getByText('dark');
    await userEvent.click(darkSelector);

    expect(mockSetMode).toHaveBeenCalledTimes(1);
    expect(mockSetMode).toHaveBeenCalledWith(true);
  });

  describe('light mode', () => {
    test('Light selector toggles dark mode off', async () => {
      render(
        <MemoryRouter>
          <Settings setIsDarkMode={mockSetMode} isDarkMode={true} />
        </MemoryRouter>,
      );

      const darkSelector = screen.getByText('dark');
      await userEvent.click(darkSelector);

      const lightSelector = screen.getByText('light');
      await userEvent.click(lightSelector);

      expect(mockSetMode).toHaveBeenCalledTimes(1);
      expect(mockSetMode).toHaveBeenCalledWith(false);
    });
  });
});
