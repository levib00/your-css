import React from 'react';

interface IModalProps {
  type: string,
  setModalIsShowing: React.Dispatch<React.SetStateAction<boolean>>
  deleteListing?: () => void
  clearListing?: () => void
  saveCss?: (
    website: string,
    css: string,
    activeStatus: boolean
  ) => void
  listingInfo?: {
    websiteInput: string,
    cssInput: string,
    isActive: boolean
  }
}

function ConfirmModal(props: IModalProps) {
  // TODO: think about maybe not passing type string and just using functions for typing
  const {
    type, setModalIsShowing, deleteListing, clearListing, saveCss, listingInfo,
  } = props;

  return (
    <div>
      {type === 'delete' && <>
        <div>Are you sure you want to permanently delete this group?</div>
        <button onClick={deleteListing}>Delete</button>
        <button onClick={() => setModalIsShowing(false)}>Cancel</button>
      </>}
      {(type === 'overwrite' && listingInfo && saveCss) && <>
        <div>A style already exists for this website</div>
        <button onClick={() => saveCss(
          listingInfo.websiteInput,
          listingInfo.cssInput,
          listingInfo.isActive,
        )}>Overwrite previous style</button>
        <button onClick={() => setModalIsShowing(false)}>Cancel</button>
      </>}
      {type === 'clear' && <>
        <div>Are you sure you want to clear all css for this entry?</div>
        <button onClick={clearListing}>Clear</button>
        <button onClick={() => setModalIsShowing(false)}>Cancel</button>
      </>}
    </div>
  );
}

export default ConfirmModal;
