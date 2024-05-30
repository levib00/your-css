import {
  render,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Form from '../components/form';
import '@testing-library/jest-dom';
import * as storageHandlers from '../scripts/storage-handlers';
import * as importExportCss from '../scripts/import-export-css';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Form renders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(storageHandlers, 'saveToStorage').mockImplementationOnce(jest.fn());
  });

  const Website = {
    isActive: false,
    css: 'css',
  };

  test('Create new form renders.', async () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>,
    );

    await act(async () => {
      const websiteLabel = screen.getByText('Website:');
      expect(websiteLabel).toBeInTheDocument();
      const textAreaLabel = screen.getByText('Custom css:');
      expect(textAreaLabel).toBeInTheDocument();
    });
  });

  test('edit form renders with previous text.', () => {
    const editWebsite = {
      isActive: true,
      css: 'exampleCss',
    };

    render(
      <MemoryRouter>
        <Form styleInfo={editWebsite} domain='example website'/>
      </MemoryRouter>,
    );

    const isActive = screen.getByLabelText('Activate:');
    expect(isActive).toBeChecked();
    const websiteText = screen.getByDisplayValue('example website');
    expect(websiteText).toBeInTheDocument();
    const textAreaText = screen.getByDisplayValue('exampleCss');
    expect(textAreaText).toBeInTheDocument();
  });

  test('New submissions are added to storage.', async () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>,
    );

    const websiteBox = screen.getByLabelText('Website:');
    const cssBox = screen.getByLabelText('Custom css:');
    const saveButton = screen.getByText('save');
    const checkbox = screen.getByText('Activate:');

    await waitFor(async () => {
      const tabQueryResult = await screen.findByDisplayValue('example.com');
      expect(tabQueryResult).toBeInTheDocument();
    });

    await act(async () => {
      await userEvent.type(websiteBox, 'm');
      await userEvent.type(cssBox, 'css test');
      await userEvent.click(checkbox);
      await userEvent.click(saveButton);
    });

    jest.spyOn(storageHandlers, 'saveToStorage').mockImplementation();

    expect(storageHandlers.saveToStorage).toHaveBeenCalledWith({ 'example.comm': { css: 'css test', isActive: true } });
  });

  test('Save button on edit form calls function to close form.', async () => {
    const toggleEditingMock = jest.fn();
    const setAllStylesMock = jest.fn();

    render(
      <MemoryRouter>
        <Form styleInfo={Website} domain='Website' toggleEditing={toggleEditingMock} setAllStyles={setAllStylesMock}/>
      </MemoryRouter>,
    );
    const saveButton = screen.getByText('save');

    await act(async () => {
      await userEvent.click(saveButton);
    });

    expect(toggleEditingMock).toHaveBeenCalledTimes(1);
  });

  test('Update listing info.', async () => {
    const toggleEditingMock = jest.fn();

    const styleObject = {
      exampleName1: {
        css: 'example style text 1',
        isActive: false,
      },
    };

    render(
      <MemoryRouter>
        <Form styleInfo={styleObject.exampleName1} domain='exampleName1' toggleEditing={toggleEditingMock} />
      </MemoryRouter>,
    );

    const cssBox = screen.getByLabelText('Custom css:');
    const saveButton = screen.getByText('save');

    await act(async () => {
      await userEvent.type(cssBox, ' updated');
      await userEvent.click(saveButton);
    });

    jest.spyOn(storageHandlers, 'saveToStorage').mockImplementation();

    expect(storageHandlers.saveToStorage).toHaveBeenCalledWith({ exampleName1: { css: 'example style text 1 updated', isActive: false } });
  });

  test('Export single listing css file.', async () => {
    const exportWebsite = {
      isActive: false,
      css: 'css',
    };

    render(
      <MemoryRouter>
        <Form styleInfo={exportWebsite}/>
      </MemoryRouter>,
    );

    await waitFor(async () => {
      const tabQueryResult = await screen.findByDisplayValue('example.com');
      expect(tabQueryResult).toBeInTheDocument();
    });

    const exportButton = screen.getByText('export');

    jest.spyOn(importExportCss, 'handleDownloadClick').mockImplementationOnce(() => 'Updated');

    await act(async () => {
      await userEvent.click(exportButton);
    });

    expect(importExportCss.handleDownloadClick).toHaveBeenCalledTimes(1);
  });

  test('Cancel toggles state to close edit box.', async () => {
    const toggleEditingMock = jest.fn();

    const cancelWebsite = {
      isActive: false,
      css: 'css',
    };

    render(
      <MemoryRouter>
        <Form styleInfo={cancelWebsite} toggleEditing={toggleEditingMock}/>
      </MemoryRouter>,
    );

    await waitFor(async () => {
      const tabQueryResult = await screen.findByDisplayValue('example.com');
      expect(tabQueryResult).toBeInTheDocument();
    });

    const cancelButton = screen.getByText('cancel');

    await act(async () => {
      await userEvent.click(cancelButton);
    });

    expect(toggleEditingMock).toHaveBeenCalledTimes(1);
  });
});
