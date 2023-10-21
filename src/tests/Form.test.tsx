let teste: FormTestProps
import { render, screen } from '@testing-library/react';
import Form from '../components/form';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

interface FormTestProps {
  styles :{ [key: string]: string}
};



jest.mock('../objects/styles', () => {
  const object = {
    exampleName1: 'example style text 1',
    exampleName2: 'example style text 2',
  }
  teste = {styles: object}
  return teste
});

describe("Listing renders", () => {

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
        <Form website='example website' customCss='exampleCss'/>
      </MemoryRouter>
    );

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

    await act( async() => {
      await userEvent.type(websiteBox, 'websitetest')
      await userEvent.type(cssBox, 'css test')
      await userEvent.click(saveButton)
    });

    expect(teste.styles.websitetest).toBe('css test')
  });

  // TODO: then make sure that function that saves it to extension storage gets called once.
  // TODO: then test that it edits correctly too. then use an after() to set the mock object back to default.
})