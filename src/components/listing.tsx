import { useEffect, useRef, useState } from 'react';
import { CancelPresentationOutlined, DeleteForever, EditOutlined } from '@mui/icons-material';
import Form from './form';
import { IStyle } from '../objects/styles';
import { saveToStorage } from '../scripts/storage-handlers';
import ConfirmModal from './confirm-modal';

interface ListingProps {
  domainName : string
  styleInfo : { isActive?: boolean, css?: string, undeleteable?: boolean, displayName?: string }
  setAllStyles: React.Dispatch<React.SetStateAction<IStyle | undefined>>
  allStyles?: IStyle
  toggleEditing: () => void
  isBeingEdited: boolean
  toggleModal: () => void
  modalIsShowing: boolean
}

function Listing(props: ListingProps) {
  const {
    domainName,
    setAllStyles,
    styleInfo,
    allStyles,
    toggleEditing,
    isBeingEdited,
    toggleModal,
    modalIsShowing,
  } = props;

  const [isActive, setIsActive] = useState(styleInfo.isActive);

  const deleteListing = () => {
    const allStylesCopy = { ...allStyles };
    delete allStylesCopy[domainName];
    browser.storage.local.set({ styles: { ...allStylesCopy } });
    setAllStyles(allStylesCopy);
    toggleModal();
  };

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

  return (
    <>
      {
        isBeingEdited
          ? <Form
            styleInfo={styleInfo}
            domain={domainName}
            toggleEditing={toggleEditing}
            allStyles={allStyles}
            setAllStyles={setAllStyles}
          />
          : <>
          {
            (!styleInfo.undeleteable && modalIsShowing) && <ConfirmModal
              toggleModal={toggleModal}
              deleteListing={deleteListing}
            />
          }
          {
            (styleInfo.undeleteable && modalIsShowing) && <ConfirmModal
              toggleModal={toggleModal}
              clearListing={clearListing}
            />
          }
          <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)}/>
          <div>
            { styleInfo.displayName || domainName }
          </div>
          <div>
            { styleInfo.css }
          </div>
          {domainName !== '___toggleAll' && <button onClick={openEditPage}><EditOutlined /></button>}
          {domainName !== '___toggleAll' && (
            styleInfo.undeleteable ? <button
              title='clear'
              onClick={toggleModal}>
                <CancelPresentationOutlined />
              </button> : <button
                title='remove'
                onClick={toggleModal}>
                <DeleteForever />
              </button>
          )}
        </>
      }
    </>
  );
}

export default Listing;
