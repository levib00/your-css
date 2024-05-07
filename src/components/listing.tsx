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
    <div className={isBeingEdited ? 'listing editing-listing' : 'listing'}>
      {
        isBeingEdited
          ? <>
            <div className='editing-display-name'>
              { styleInfo.displayName || domainName }
            </div>
            <Form
              styleInfo={styleInfo}
              domain={domainName}
              toggleEditing={toggleEditing}
              allStyles={allStyles}
              setAllStyles={setAllStyles}
            />
          </>
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
          <div>
            { styleInfo.displayName || domainName }
          </div>
          <div className='button-container'>
            {domainName !== '___toggleAll' && <button onClick={openEditPage} title='edit'><EditOutlined /></button>}
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
              <div className="checkbox-container" >
                <input type="checkbox" className='active-checkbox' defaultChecked={isActive} />
                <span className="checkmark" onClick={() => setIsActive(!isActive)}></span>
              </div>
          </div>
        </>
      }
    </div>
  );
}

export default Listing;
