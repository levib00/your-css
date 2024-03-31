import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ConfirmModal from '../components/confirm-modal';

const setModalIsShowingMock = jest.fn();

describe('Modal renders', () => {
  test('Overwrite Modal renders with correct text', () => {
    render(
      <MemoryRouter>
        <ConfirmModal type={'overwrite'} setModalIsShowing={setModalIsShowingMock}/>
      </MemoryRouter>,
    );

    const prompt = screen.getByText('A style already exists for this website');
    expect(prompt).toBeInTheDocument();
    const overwrite = screen.getByText('Overwrite previous style');
    expect(overwrite).toBeInTheDocument();
    const saveAnyways = screen.getByText('Save as a separate group');
    expect(saveAnyways).toBeInTheDocument();
    const cancel = screen.getByText('Cancel');
    expect(cancel).toBeInTheDocument();
  });

  test('Delete modal renders with correct text', () => {
    render(
      <MemoryRouter>
        <ConfirmModal type={'delete'} setModalIsShowing={setModalIsShowingMock}/>
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
        <ConfirmModal type={'clear'} setModalIsShowing={setModalIsShowingMock}/>
      </MemoryRouter>,
    );

    const prompt = screen.getByText('Are you sure you want to clear all css for this entry?');
    expect(prompt).toBeInTheDocument();
    const deletes = screen.getByText('Clear');
    expect(deletes).toBeInTheDocument();
    const cancel = screen.getByText('Cancel');
    expect(cancel).toBeInTheDocument();
  });
});
