
import { render, screen } from '@testing-library/react';
import Settings from '../components/settings';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import * as importExport from '../scripts/import-export-css';
import { setStyles } from '../objects/styles';

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

    const masterStylesMock = {
      styleName: {isActive: true, css: 'style text',},
      styleName2: {isActive: true, css: 'style text 2'}
    }

    setStyles(masterStylesMock)

    jest.spyOn(importExport, 'assembleCssForExport').mockImplementationOnce(() => 'Updated')

    const exportButton = screen.getByText('export');
    expect(exportButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(exportButton)
    })

    expect(mock).toHaveBeenCalledWith(masterStylesMock, null)
  })
})