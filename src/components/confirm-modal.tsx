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
    <div>
      {deleteListing && <>
        <div>Are you sure you want to permanently delete this group?</div>
        <button onClick={deleteListing}>Delete</button>
      </>}
      {(listingInfo && saveCss) && <>
        <div>A style already exists for this website</div>
        <button onClick={() => saveCss(
          listingInfo.websiteInput,
          listingInfo.cssInput,
          listingInfo.isActive,
        )}>Overwrite previous style</button>
      </>}
      {clearListing && <>
        <div>Are you sure you want to clear all css for this entry?</div>
        <button onClick={clearListing}>Clear</button>
      </>}
      <button onClick={toggleModal}>Cancel</button>
    </div>
  );
}

export default ConfirmModal;
