let testStylesObject: FormTestProps
import { render, screen } from '@testing-library/react';
import Form from '../components/form';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import * as storageHandlers from '../scripts/storage-handlers';

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

  test('Update css.', async () => {
    render(
      <MemoryRouter>
        <Form website='exampleName1' customCss='example style text 1'/>
      </MemoryRouter>
    );

    const cssBox = screen.getByLabelText('custom css');
    const saveButton = screen.getByText('save');

    await act( async() => { 
      await userEvent.type(cssBox, ' updated')
      await userEvent.click(saveButton)
    });

    expect(testStylesObject.styles.exampleName1.css).toBe('example style text 1 updated')
  });

  test('Update website name.', async () => {
    render(
      <MemoryRouter>
        <Form website='exampleName1' customCss='example style text 1'/>
      </MemoryRouter>
    );

    const websiteBox = screen.getByLabelText('Website');
    const saveButton = screen.getByText('save');

    await act( async() => { 
      await userEvent.type(websiteBox, 'Updated')
      await userEvent.click(saveButton)
    });

    expect(testStylesObject.styles.exampleName1).toBeUndefined()
    expect(testStylesObject.styles.exampleName1Updated).toBeTruthy()
    expect(storageHandlers.saveToStorage).toBeCalledTimes(1)
  });
})