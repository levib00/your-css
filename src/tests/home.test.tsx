import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Home from '../components/home';

describe('Home renders', () => {
  test('Home renders with correct text', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>,
      );
    });

    const globalStyles = screen.getByText('global styles');
    expect(globalStyles).toBeInTheDocument();
    const toggleAll = screen.getByText('toggle all');
    expect(toggleAll).toBeInTheDocument();
    const extensionStyles = screen.getByText('extension styles');
    expect(extensionStyles).toBeInTheDocument();
  });

  test('Search bar works', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>,
      );
    });
    const searchBar = screen.getByPlaceholderText('website');
    expect(searchBar).toBeInTheDocument();

    await userEvent.type(searchBar, 'toggle');

    await waitFor(() => {
      const exampleName1 = screen.getByText('toggle all');
      expect(exampleName1).toBeInTheDocument();
      const exampleName2 = screen.queryByText('global styles');
      expect(exampleName2).toBeNull();
    });
  });
});
