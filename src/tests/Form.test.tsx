let testStylesObject: FormTestProps
import { render, screen, act } from '@testing-library/react';
import Form from '../components/form';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import * as storageHandlers from '../scripts/storage-handlers';
import * as importExportCss from '../scripts/import-export-css'
import * as router from 'react-router'

interface FormTestProps {
  styles : {[key: string]: {isActive: boolean, css: string}}
};

beforeEach(() => {
  jest.clearAllMocks()
  jest.spyOn(storageHandlers, 'saveToStorage').mockImplementationOnce(jest.fn())
})

jest.mock('../objects/styles', () => {
  const object = {
    exampleName1: {isActive: true, css: 'example style text 1'},
    exampleName2: {isActive: true, css: 'example style text 2'},

  }
  testStylesObject = {styles: object}
  return testStylesObject
});

const Website = {
  isActive: false,
  css: 'css'
}

describe("Form renders", () => {

  test('Create new form renders.', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );

    const websiteLabel = screen.getByText('Website');
    expect(websiteLabel).toBeInTheDocument();
    const textAreaLabel = screen.getByText('custom css');
    expect(textAreaLabel).toBeInTheDocument()
  });

  test('edit form renders with previous text.', () => {

    const Website = {
      isActive: true,
      css: 'exampleCss'
    }

    render(
      <MemoryRouter>
        <Form styles={Website} domain='example website'/>
      </MemoryRouter>
    );

    const isActive = screen.getByLabelText('activate')
    expect(isActive).toBeChecked()
    const websiteText = screen.getByDisplayValue('example website');
    expect(websiteText).toBeInTheDocument();
    const textAreaText = screen.getByDisplayValue('exampleCss');
    expect(textAreaText).toBeInTheDocument()
  });

  test('New submissions are added to storage.', async () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );

    const websiteBox = screen.getByLabelText('Website');
    const cssBox = screen.getByLabelText('custom css');
    const saveButton = screen.getByText('save');
    const checkbox = screen.getByText('activate');

    await act( async() => {
      await userEvent.type(websiteBox, 'websitetest')
      await userEvent.type(cssBox, 'css test')
      await userEvent.click(checkbox)
      await userEvent.click(saveButton)
    });

    jest.spyOn(storageHandlers, 'saveToStorage').mockImplementation()

    expect(storageHandlers.saveToStorage).toHaveBeenCalledWith({"websitetest": {"css": "css test", "isActive": true}})
  });

  test('Save button on edit form calls function to close form.', async () => {
    const toggleEditingMock = jest.fn()
    const setAllStylesMock = jest.fn()

    render(
      <MemoryRouter>
        <Form styles={Website} domain='Website' toggleEditing={toggleEditingMock} setAllStyles={setAllStylesMock}/>
      </MemoryRouter>
    );
    const saveButton = screen.getByText('save');

    await act( async() => {
      await userEvent.click(saveButton)
    });

    expect(toggleEditingMock).toHaveBeenCalledTimes(1)
  });

  test('Update listing info.', async () => {
    const toggleEditingMock = jest.fn()

    const styleObject = {
      exampleName1: {
        css: "example style text 1",
        isActive: false
      }
    }

    render(
      <MemoryRouter>
        <Form styles={styleObject.exampleName1} domain='exampleName1' toggleEditing={toggleEditingMock} />
      </MemoryRouter>
    );

    const cssBox = screen.getByLabelText('custom css');
    const saveButton = screen.getByText('save');

    await act( async() => { 
      await userEvent.type(cssBox, ' updated')
      await userEvent.click(saveButton)
    });

    jest.spyOn(storageHandlers, 'saveToStorage').mockImplementation()

    expect(storageHandlers.saveToStorage).toHaveBeenCalledWith({"exampleName1": {"css": "example style text 1 updated", "isActive": false}})
  });

  test('Import single css file.', async () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );

    const importButton = screen.getByText('import');

    jest.spyOn(importExportCss, 'parseCssFile').mockResolvedValueOnce('Updated')

    await userEvent.click(importButton)    

    expect(importExportCss.parseCssFile).toHaveBeenCalledTimes(1)
    const cssBox = screen.getByDisplayValue('Updated')
    expect(cssBox).toBeInTheDocument()
  })

  test('Export single listing css file.', async () => {

    const Website = {
      isActive: false,
      css: 'css'
    }
    
    render(
      <MemoryRouter>
        <Form styles={Website}/>
      </MemoryRouter>
    );

    const exportButton = screen.getByText('export');

    jest.spyOn(importExportCss, 'handleDownloadClick').mockImplementationOnce(() => 'Updated')

    await act( async() => { 
      await userEvent.click(exportButton)
    });

    expect(importExportCss.handleDownloadClick).toHaveBeenCalledTimes(1)
  })

  test('Cancel toggles state to close edit box.', async () => {
    const toggleEditingMock = jest.fn()

    const Website = {
      isActive: false,
      css: 'css'
    }
    
    render(
      <MemoryRouter>
        <Form styles={Website} toggleEditing={toggleEditingMock}/>
      </MemoryRouter>
    );

    const cancelButton = screen.getByText('cancel');

    await act( async() => { 
      await userEvent.click(cancelButton)
    });

    expect(toggleEditingMock).toHaveBeenCalledTimes(1)
  })

  test('Cancel on new listing form navigates to home.', async () => {
    const mockNavigate = jest.fn()

    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate)
    
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );

    const cancelButton = screen.getByText('cancel');

    await act( async() => { 
      await userEvent.click(cancelButton)
    });

    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})