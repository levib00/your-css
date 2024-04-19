interface IModalProps {
  toggleModal: () => void
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
  const {
    toggleModal, deleteListing, clearListing, saveCss, listingInfo,
  } = props;

  return (
    <div className="confirm-modal">
      {deleteListing && <>
        <div>Are you sure you want to permanently delete this group?</div>
        <div className="modal-button">
          <button className="modal-action" onClick={deleteListing}>Delete</button>
          <button onClick={toggleModal}>Cancel</button>
        </div>
      </>}
      {(listingInfo && saveCss) && <>
        <div>A style already exists for this website</div>
        <div className="modal-buttons">
          <button className="modal-action" onClick={() => saveCss(
            listingInfo.websiteInput,
            listingInfo.cssInput,
            listingInfo.isActive,
          )}>Overwrite previous style</button>
          <button onClick={toggleModal}>Cancel</button>
        </div>
      </>}
      {clearListing && <>
        <div>Are you sure you want to clear all css for this entry?</div>
        <div className="modal-buttons">
          <button className="modal-action" onClick={clearListing}>Clear</button>
          <button onClick={toggleModal}>Cancel</button>
        </div>
      </>}
    </div>
  );
}

export default ConfirmModal;
