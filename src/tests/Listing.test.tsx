import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import * as storageHandlers from '../scripts/storage-handlers';
import { defaultStyles } from '../objects/styles';
import Listing from '../components/listing';

describe('Listing renders', () => {
  const stylesMock = {
    styleName: {
      css: 'style text',
      isActive: true,
    },
  };

  const setAllStylesMock = jest.fn();

  test('Listing renders with correct text', () => {
    render(
      <MemoryRouter>
        <Listing styles={stylesMock.styleName}toggleEditing={jest.fn} isBeingEdited={false} allStyles={stylesMock} style={'styleName'} setAllStyles={setAllStylesMock} />
      </MemoryRouter>,
    );

    const styleName = screen.getByText('styleName');
    expect(styleName).toBeInTheDocument();
    const styleText = screen.getByText('style text');
    expect(styleText).toBeInTheDocument();
  });

  test('Edit button works', async () => {
    const toggleEditingMock = jest.fn();

    render(
      <MemoryRouter>
        <Listing styles={stylesMock.styleName} toggleEditing={toggleEditingMock} isBeingEdited={false} allStyles={stylesMock} style={'styleName'} setAllStyles={setAllStylesMock} />
      </MemoryRouter>,
    );

    const editButton = screen.getByRole('button', { name: 'edit' });

    await act(async () => {
      await userEvent.click(editButton);
    });

    expect(toggleEditingMock).toHaveBeenCalledTimes(1);
  });

  test('Delete button calls function', async () => {
    jest.spyOn(storageHandlers, 'saveToStorage').mockImplementationOnce(jest.fn());

    const deleteStylesMock = {
      styleName: { isActive: true, css: 'style text' },
      styleName2: { isActive: true, css: 'style text 2' },
    };
    const deletedStylesMock = {
      styleName2: {
        isActive: true,
        css: 'style text 2',
      },
    };

    render(
      <MemoryRouter>
        <Listing styles={deleteStylesMock.styleName} toggleEditing={jest.fn} isBeingEdited={false} allStyles={deleteStylesMock} style={'styleName'} setAllStyles={setAllStylesMock} />
      </MemoryRouter>,
    );

    const removeButton = screen.getByRole('button', { name: 'remove' });

    await act(async () => {
      await userEvent.click(removeButton);
    });

    const deleteButton = screen.getByText('Delete');

    await act(async () => {
      await userEvent.click(deleteButton);
    });

    // @ts-ignore
    expect(global.browser.storage.local.remove).toHaveBeenCalledTimes(1);
    // @ts-ignore
    expect(global.browser.storage.local.remove).toHaveBeenCalledWith('styleName');
    expect(setAllStylesMock).toHaveBeenCalledWith(deletedStylesMock);
  });

  test('Checkbox is checked and fires save function', async () => {
    jest.spyOn(storageHandlers, 'saveToStorage').mockImplementationOnce(jest.fn());

    const masterStylesMock = {
      styleName: { isActive: true, css: 'style text' },
      styleName2: { isActive: true, css: 'style text 2' },
    };

    render(
      <MemoryRouter>
        <Listing styles={stylesMock.styleName} toggleEditing={jest.fn} isBeingEdited={false} allStyles={stylesMock} style={'styleName'} setAllStyles={setAllStylesMock} />
      </MemoryRouter>,
    );

    const styleActive = screen.getByRole('checkbox');

    await act(async () => {
      await userEvent.click(styleActive);
    });

    waitFor(() => {
      expect(styleActive).toBeChecked();
      expect(setAllStylesMock).toHaveBeenCalledWith(masterStylesMock);
    });
  });
});

describe('Special master styles', () => {
  const setAllStylesMock = jest.fn();

  test('Toggle all does not have any buttons but does have checkbox', async () => {
    render(
      <MemoryRouter>
        <Listing styles={defaultStyles.___toggleAll} toggleEditing={jest.fn} isBeingEdited={false} allStyles={defaultStyles} style={'___toggleAll'} setAllStyles={setAllStylesMock} />
      </MemoryRouter>,
    );

    const displayName = screen.queryByText('toggle all');
    const styleActive = screen.getByRole('checkbox');
    const clearButton = screen.queryByText('clear');
    const editButton = screen.queryByText('edit');
    const deleteButton = screen.queryByText('delete');

    expect(displayName).toBeInTheDocument();
    expect(styleActive).toBeInTheDocument();
    expect(clearButton).toBeNull();
    expect(editButton).toBeNull();
    expect(deleteButton).toBeNull();
  });

  test('Extension has no delete button but does have clear', () => {
    render(
      <MemoryRouter>
        <Listing styles={defaultStyles._extension} toggleEditing={jest.fn} isBeingEdited={false} allStyles={defaultStyles} style={'_extension'} setAllStyles={setAllStylesMock} />
      </MemoryRouter>,
    );

    const displayName = screen.queryByText('extension styles');
    const styleActive = screen.getByRole('checkbox');
    const clearButton = screen.queryByText('clear');
    const editButton = screen.queryByText('edit');
    const deleteButton = screen.queryByText('delete');

    expect(displayName).toBeInTheDocument();
    expect(styleActive).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeNull();
  });

  test('Global has no delete button but does have clear', () => {
    render(
      <MemoryRouter>
        <Listing styles={defaultStyles.__global} toggleEditing={jest.fn} isBeingEdited={false} allStyles={defaultStyles} style={'__global'} setAllStyles={setAllStylesMock} />
      </MemoryRouter>,
    );

    const displayName = screen.queryByText('global styles');
    const styleActive = screen.getByRole('checkbox');
    const clearButton = screen.queryByText('clear');
    const editButton = screen.queryByText('edit');
    const deleteButton = screen.queryByText('delete');

    expect(displayName).toBeInTheDocument();
    expect(styleActive).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeNull();
  });
});
