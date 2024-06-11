interface IModalProps {
  toggleModal: () => void;
  deleteListing?: () => void;
  clearListing?: () => void;
  saveCss?: (
    website: string,
    css: string,
    activeStatus: boolean,
    prevStyles: null,
    overwrite: boolean,
  ) => void;
  listingInfo?: {
    websiteInput: string;
    cssInput: string;
    isActive: boolean;
  };
}

// Different components depending on the context to modal is called in

const ConfirmDelete = ({ deleteListing, toggleModal }: { deleteListing: () => void; toggleModal: () => void }) => (
  <>
    <div>Are you sure you want to permanently delete this group?</div>
    <div className="modal-buttons">
      <button className="modal-action" onClick={deleteListing}>Delete</button>
      <button onClick={toggleModal}>Cancel</button>
    </div>
  </>
);

const ConfirmOverwrite = ({
  saveCss, listingInfo, toggleModal,
}: {
  saveCss: (website: string, css: string, activeStatus: boolean, prevStyles: null, overwrite: boolean) => void;
  listingInfo: { websiteInput: string; cssInput: string; isActive: boolean };
  toggleModal: () => void;
}) => (
  <>
    <div>A style already exists for this website</div>
    <div className="modal-buttons">
      <button className="modal-action" onClick={() => saveCss(
        listingInfo.websiteInput,
        listingInfo.cssInput,
        listingInfo.isActive,
        null,
        true,
      )}>Overwrite</button>
      <button onClick={toggleModal}>Cancel</button>
    </div>
  </>
);

const ConfirmClear = ({ clearListing, toggleModal }: { clearListing: () => void; toggleModal: () => void }) => (
  <>
    <div>Are you sure you want to clear all css for this entry?</div>
    <div className="modal-buttons">
      <button className="modal-action" onClick={clearListing}>Clear</button>
      <button onClick={toggleModal}>Cancel</button>
    </div>
  </>
);

const ConfirmModal = (props: IModalProps) => {
  const {
    toggleModal, deleteListing, clearListing, saveCss, listingInfo,
  } = props;

  // Determine which component to load based on which functions have been passed
  return (
    <div className="darken-box">
      <section className="confirm-modal">
        {deleteListing && <ConfirmDelete deleteListing={deleteListing} toggleModal={toggleModal} />}
        {(listingInfo && saveCss) && (
          <ConfirmOverwrite saveCss={saveCss} listingInfo={listingInfo} toggleModal={toggleModal} />
        )}
        {clearListing && <ConfirmClear clearListing={clearListing} toggleModal={toggleModal} />}
      </section>
    </div>
  );
};

export default ConfirmModal;
