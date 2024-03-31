import React from 'react';

interface IModalProps {
  type: string,
  setModalIsShowing: React.Dispatch<React.SetStateAction<boolean>>
  deleteListing?: () => void
  clearListing?: () => void
}

function ConfirmModal(props: IModalProps) {
  const {
    type, setModalIsShowing, deleteListing, clearListing,
  } = props;

  return (
    <dialog>
      {type === 'delete' && <>
        <div>Are you sure you want to permanently delete this group?</div>
        <button onClick={deleteListing}>Delete</button>
        <button onClick={() => setModalIsShowing(false)}>Cancel</button>
      </>}
      {type === 'overwrite' && <>
        <div>A style already exists for this website</div>
        <button>Overwrite previous style</button>
        <button>Save as a separate group</button>
        <button onClick={() => setModalIsShowing(false)}>Cancel</button>
      </>}
      {type === 'clear' && <>
        <div>Are you sure you want to clear all css for this entry?</div>
        <button onClick={clearListing}>Clear</button>
        <button onClick={() => setModalIsShowing(false)}>Cancel</button>
      </>}
    </dialog>
  );
}

export default ConfirmModal;
