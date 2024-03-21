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

describe("Form renders", () => {

  test('Create new form renders.', () => {
    render(
      <MemoryRouter>
        <Form website='' customCss='' />
      </MemoryRouter>
    );

    const websiteLabel = screen.getByText('Website');
    expect(websiteLabel).toBeInTheDocument();
    const textAreaLabel = screen.getByText('custom css');
    expect(textAreaLabel).toBeInTheDocument()
  });

  test('edit form renders with previous text.', () => {
    render(
      <MemoryRouter>
        <Form website='example website' customCss='exampleCss' isActive={true}/>
      </MemoryRouter>
    );

    const isActive = screen.getByLabelText('activate')
    expect(isActive).toBeChecked()
    const websiteText = screen.getByDisplayValue('example website');
    expect(websiteText).toBeInTheDocument();
    const textAreaText = screen.getByDisplayValue('exampleCss');
    expect(textAreaText).toBeInTheDocument()
  });

  test('New submissions are added to object.', async () => {
    render(
      <MemoryRouter>
        <Form website='' customCss=''/>
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

    expect(testStylesObject.styles.websitetest.css).toBe('css test')
    expect(testStylesObject.styles.websitetest.isActive).toBeTruthy()
  });

  test('Save button on edit form calls function to close form.', async () => {
    const setEditModeMock = jest.fn()
    
    render(
      <MemoryRouter>
        <Form website='test' customCss='test' setEditMode={setEditModeMock}/>
      </MemoryRouter>
    );
    const saveButton = screen.getByText('save');

    await act( async() => {
      await userEvent.click(saveButton)
    });

    expect(setEditModeMock).toHaveBeenCalledTimes(1)
  });

  test('Update listing info.', async () => {
    const setEditModeMock = jest.fn()

    render(
      <MemoryRouter>
        <Form website='exampleName1' customCss='example style text 1' setEditMode={setEditModeMock}/>
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
        <Form website='' customCss=''/>
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
    render(
      <MemoryRouter>
        <Form website='' customCss='css'/>
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
    const setEditModeMock = jest.fn()
    render(
      <MemoryRouter>
        <Form website='' customCss='css' setEditMode={setEditModeMock}/>
      </MemoryRouter>
    );

    const cancelButton = screen.getByText('cancel');

    await act( async() => { 
      await userEvent.click(cancelButton)
    });

    expect(setEditModeMock).toHaveBeenCalledTimes(1)
  })

  test('Cancel on new listing form navigates to home.', async () => {
    const mockNavigate = jest.fn()

    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate)

    render(
      <MemoryRouter>
        <Form website='' customCss='css'/>
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