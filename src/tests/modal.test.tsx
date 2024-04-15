import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import ConfirmModal from '../components/confirm-modal';

const toggleModalMock = jest.fn();

describe('Modal renders', () => {
  test('Overwrite Modal renders with correct text', () => {
    render(
      <MemoryRouter>
        <ConfirmModal toggleModal={toggleModalMock} listingInfo={{ websiteInput: 'website', cssInput: 'css', isActive: true }} saveCss={jest.fn()} />
      </MemoryRouter>,
    );

    const prompt = screen.getByText('A style already exists for this website');
    expect(prompt).toBeInTheDocument();
    const overwrite = screen.getByText('Overwrite previous style');
    expect(overwrite).toBeInTheDocument();
    const cancel = screen.getByText('Cancel');
    expect(cancel).toBeInTheDocument();
  });

  test('Overwrite button calls saveCss', async () => {
    const saveCssMock = jest.fn();

    render(
      <MemoryRouter>
        <ConfirmModal toggleModal={toggleModalMock} listingInfo={{ websiteInput: 'website', cssInput: 'css', isActive: true }} saveCss={saveCssMock} />
      </MemoryRouter>,
    );

    const overwrite = screen.getByText('Overwrite previous style');

    await act(async () => {
      await userEvent.click(overwrite);
    });

    expect(saveCssMock).toHaveBeenCalledTimes(1);
  });

  test('Delete modal renders with correct text', () => {
    render(
      <MemoryRouter>
        <ConfirmModal deleteListing={jest.fn()} toggleModal={toggleModalMock}/>
      </MemoryRouter>,
    );

    const prompt = screen.getByText('Are you sure you want to permanently delete this group?');
    expect(prompt).toBeInTheDocument();
    const deletes = screen.getByText('Delete');
    expect(deletes).toBeInTheDocument();
    const cancel = screen.getByText('Cancel');
    expect(cancel).toBeInTheDocument();
  });

  test('Delete modal renders with correct text', () => {
    render(
      <MemoryRouter>
        <ConfirmModal clearListing={jest.fn()} toggleModal={toggleModalMock}/>
      </MemoryRouter>,
    );

    const prompt = screen.getByText('Are you sure you want to clear all css for this entry?');
    expect(prompt).toBeInTheDocument();
    const deletes = screen.getByText('Clear');
    expect(deletes).toBeInTheDocument();
    const cancel = screen.getByText('Cancel');
    expect(cancel).toBeInTheDocument();
  });

  test('Cancel button works', async () => {
    render(
      <MemoryRouter>
        <ConfirmModal toggleModal={toggleModalMock}/>
      </MemoryRouter>,
    );

    const cancel = screen.getByText('Cancel');

    await act(async () => {
      await userEvent.click(cancel);
    });

    expect(toggleModalMock).toHaveBeenCalledTimes(1);
  });
});
