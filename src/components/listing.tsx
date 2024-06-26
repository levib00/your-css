import { useEffect, useRef, useState } from 'react';
import {
  CancelPresentationOutlined,
  DeleteForever,
  EditOutlined,
} from '@mui/icons-material';
import Form from './form';
import { IStyle } from '../objects/styles';
import { saveToStorage } from '../scripts/storage-handlers';
import ConfirmModal from './confirm-modal';

interface ListingProps {
  domainName: string;
  styleInfo: {
    isActive?: boolean;
    css?: string;
    undeleteable?: boolean;
    displayName?: string;
  };
  setAllStyles: React.Dispatch<React.SetStateAction<IStyle | undefined>>;
  allStyles?: IStyle;
  toggleEditing: () => void;
  isBeingEdited: boolean;
  toggleModal: () => void;
  modalIsShowing: boolean;
}

const Listing = ({
  domainName,
  styleInfo,
  allStyles,
  setAllStyles,
  toggleEditing,
  isBeingEdited,
  toggleModal,
  modalIsShowing,
}: ListingProps) => {
  const [isActive, setIsActive] = useState(styleInfo.isActive);


  // Prevent unnecessary updates when checkbox is checked and save checked state to storage
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const allStylesCopy = { ...allStyles };
    allStylesCopy[domainName].isActive = isActive;
    saveToStorage({ [domainName]: allStylesCopy[domainName] });
    setAllStyles({ ...allStylesCopy });
  }, [isActive]);

  // Delete listing from storage
  const deleteListing = () => {
    const allStylesCopy = { ...allStyles };
    delete allStylesCopy[domainName];
    browser.storage.local.set({ styles: { ...allStylesCopy } });
    setAllStyles(allStylesCopy);
    toggleModal();
  };

  // Clear css for undeleteable listings
  const clearListing = () => {
    const allStylesCopy = { ...allStyles };
    allStylesCopy[domainName].css = '';
    saveToStorage({ [domainName]: allStylesCopy[domainName] });
    setAllStyles(allStylesCopy);
    toggleModal();
  };

  const openEditPage = () => {
    toggleEditing();
  };

  // Open modal with relevant props
  const renderModal = () => {
    if (modalIsShowing) {
      if (styleInfo.undeleteable) {
        return <ConfirmModal toggleModal={toggleModal} clearListing={clearListing} />;
      }
      return <ConfirmModal toggleModal={toggleModal} deleteListing={deleteListing} />;
    }
    return null;
  };

  const renderForm = () => (
    <>
      <div className="editing-display-name display-name">
        <h2 className="display-name-text">{styleInfo.displayName || domainName}</h2>
      </div>
      <Form
        styleInfo={styleInfo}
        domain={domainName}
        toggleEditing={toggleEditing}
        allStyles={allStyles}
        setAllStyles={setAllStyles}
      />
    </>
  );

  const renderListing = () => (
    <>
      {renderModal()}
      <div className="display-name">
        {styleInfo.displayName || domainName}
      </div>
      <div className="button-container">
        {domainName !== '___toggleAll' && (
          <button onClick={openEditPage} title="edit">
            <EditOutlined />
          </button>
        )}
        {domainName !== '___toggleAll' && (
          styleInfo.undeleteable ? (
            <button title="clear" onClick={toggleModal}>
              <CancelPresentationOutlined />
            </button>
          ) : (
            <button title="remove" onClick={toggleModal}>
              <DeleteForever />
            </button>
          )
        )}
        <div className="checkbox-container">
          <input
            type="checkbox"
            className="active-checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
          <span
            className="checkmark"
            onClick={() => setIsActive(!isActive)}
          ></span>
        </div>
      </div>
    </>
  );

  return (
    <section className={isBeingEdited ? 'listing editing-listing' : 'listing'}>
      {isBeingEdited ? renderForm() : renderListing()}
    </section>
  );
};

export default Listing;