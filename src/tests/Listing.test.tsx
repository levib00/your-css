import { render, screen, waitFor } from '@testing-library/react';
import Listing from '../components/listing';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import * as storageHandlers from '../scripts/storage-handlers';
import { setStyles, styles } from '../objects/styles';

describe("Listing renders", () => {

  const stylesMock = {
    styleName: {
      css: 'style text',
      isActive: true
    }
  }

  const setAllStylesMock = jest.fn()

  test('Listing renders with correct text', () => {
    render(
      <MemoryRouter>
        <Listing styles={stylesMock.styleName} style={'styleName'} setAllStyles={setAllStylesMock} />
      </MemoryRouter>
    );

    const styleName = screen.getByText('styleName');
    expect(styleName).toBeInTheDocument();
    const styleText = screen.getByText('style text');
    expect(styleText).toBeInTheDocument()
  });

  test('Edit button works', async() => {
    render(
      <MemoryRouter>
        <Listing styles={stylesMock.styleName} style={'styleName'} setAllStyles={setAllStylesMock} />
      </MemoryRouter>
    );

    const editButton = screen.getByRole('button', {name: 'edit'})

    await act( async() => {
      await userEvent.click(editButton)
    });

    const websiteLabel = screen.getByText('Website');
    expect(websiteLabel).toBeInTheDocument();
    const textAreaLabel = screen.getByText('custom css');
    expect(textAreaLabel).toBeInTheDocument()
  });

  test('Delete button calls function', async() => {

    jest.spyOn(storageHandlers, 'saveToStorage').mockImplementationOnce(jest.fn())

    const masterStylesMock = {
      styleName: {isActive: true, css: 'style text',},
      styleName2: {isActive: true, css: 'style text 2'}
    }

    setStyles(masterStylesMock)

    render(
      <MemoryRouter>
        <Listing styles={stylesMock.styleName} style={'styleName'} setAllStyles={setAllStylesMock} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole('button', {name: 'delete'})

    await act( async() => {
      await userEvent.click(deleteButton)
    });

    expect(storageHandlers.saveToStorage).toHaveBeenCalledTimes(1)
    expect(storageHandlers.saveToStorage).toHaveBeenCalledWith(masterStylesMock)
    expect(setAllStylesMock).toHaveBeenCalledWith(masterStylesMock)
  });

  test('Checkbox is checked and fires save function', async() => {
    jest.spyOn(storageHandlers, 'saveToStorage').mockImplementationOnce(jest.fn())

    const masterStylesMock = {
      styleName: {isActive: true, css: 'style text',},
      styleName2: {isActive: true, css: 'style text 2'}
    }

    setStyles(masterStylesMock)

    render(
      <MemoryRouter>
        <Listing styles={stylesMock.styleName} style={'styleName'} setAllStyles={setAllStylesMock} />
      </MemoryRouter>
    );

    const styleActive = screen.getByRole('checkbox')

    await act( async() => {
      await userEvent.click(styleActive)
    });

    waitFor(() => {
      expect(styleActive).toBeChecked()
      expect(setAllStylesMock).toHaveBeenCalledWith(masterStylesMock)
    })
  });
})

describe('Special master styles', () => {

  const setAllStylesMock = jest.fn()

  test('Toggle all does not have any buttons but does have checkbox', async () => {
    render(
      <MemoryRouter>
        <Listing styles={styles.___toggleAll} style={'___toggleAll'} setAllStyles={setAllStylesMock} />
      </MemoryRouter>
    );

    const displayName = screen.queryByText('toggle all')
    const styleActive = screen.getByRole('checkbox')
    const clearButton = screen.queryByText('clear')
    const editButton = screen.queryByText('edit')
    const deleteButton = screen.queryByText('delete')

    expect(displayName).toBeInTheDocument()
    expect(styleActive).toBeInTheDocument()
    expect(clearButton).toBeNull()
    expect(editButton).toBeNull()
    expect(deleteButton).toBeNull()
  })

  test('Extension has no delete button but does have clear', () => {
    render(
      <MemoryRouter>
        <Listing styles={styles._extension} style={'_extension'} setAllStyles={setAllStylesMock} />
      </MemoryRouter>
    );

    const displayName = screen.queryByText('extension styles')
    const styleActive = screen.getByRole('checkbox')
    const clearButton = screen.queryByText('clear')
    const editButton = screen.queryByText('edit')
    const deleteButton = screen.queryByText('delete')

    expect(displayName).toBeInTheDocument()
    expect(styleActive).toBeInTheDocument()
    expect(clearButton).toBeInTheDocument()
    expect(editButton).toBeInTheDocument()
    expect(deleteButton).toBeNull()
  })

  test('Global has no delete button but does have clear', () => {
    render(
      <MemoryRouter>
        <Listing styles={styles.__global} style={'__global'} setAllStyles={setAllStylesMock} />
      </MemoryRouter>
    );

    const displayName = screen.queryByText('global styles')
    const styleActive = screen.getByRole('checkbox')
    const clearButton = screen.queryByText('clear')
    const editButton = screen.queryByText('edit')
    const deleteButton = screen.queryByText('delete')

    expect(displayName).toBeInTheDocument()
    expect(styleActive).toBeInTheDocument()
    expect(clearButton).toBeInTheDocument()
    expect(editButton).toBeInTheDocument()
    expect(deleteButton).toBeNull()
  })
})
