import { render, screen } from '@testing-library/react';
import Listing from '../components/listing';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import * as storageHandlers from '../scripts/storage-handlers';
import { setStyles } from '../objects/styles';

describe("Listing renders", () => {

  const stylesMock = {
    styleName: 'style text',
  
  }

  const setAllStylesMock = jest.fn()

  test('Listing renders with correct text', () => {
    render(
      <MemoryRouter>
        <Listing styles={stylesMock} style={'styleName'} setAllStyles={setAllStylesMock} />
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
        <Listing styles={stylesMock} style={'styleName'} setAllStyles={setAllStylesMock} />
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
      styleName: 'style text',
      styleName2: 'style text 2'
    }

    setStyles(masterStylesMock)

    render(
      <MemoryRouter>
        <Listing styles={stylesMock} style={'styleName'} setAllStyles={setAllStylesMock} />
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
})