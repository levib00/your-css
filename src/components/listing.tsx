import { useEffect, useRef, useState } from 'react';
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
}

function Listing(props: ListingProps) {
  const {
    domainName, setAllStyles, styleInfo, allStyles, toggleEditing, isBeingEdited,
  } = props;
  const [isActive, setIsActive] = useState(styleInfo.isActive);
  const [deleteModalIsShowing, setDeleteModalIsShowing] = useState(false);
  const [clearModalIsShowing, setClearModalIsShowing] = useState(false);

  const deleteListing = () => {
    const allStylesCopy = { ...allStyles };
    delete allStylesCopy[domainName];
    // @ts-ignore
    browser.storage.local.remove(domainName);
    setAllStyles(allStylesCopy);
    setDeleteModalIsShowing(false);
  };

  const clearListing = () => {
    const allStylesCopy = { ...allStyles };
    allStylesCopy[domainName].css = '';
    // @ts-ignore
    saveToStorage({ [domainName]: allStylesCopy[domainName] });
    setAllStyles(allStylesCopy);
    setClearModalIsShowing(false);
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
            deleteModalIsShowing && <ConfirmModal
              setModalIsShowing={setDeleteModalIsShowing}
              deleteListing={deleteListing}
            />
          }
          {
            clearModalIsShowing && <ConfirmModal
              setModalIsShowing={setClearModalIsShowing}
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
          {domainName !== '___toggleAll' && <button onClick={openEditPage}>edit</button>}
          {domainName !== '___toggleAll' && (
            styleInfo.undeleteable ? <button
              onClick={() => setClearModalIsShowing(true)}>
                clear
              </button> : <button
                onClick={() => setDeleteModalIsShowing(true)}>
                remove
              </button>
          )}
        </>
      }
    </>
  );
}

export default Listing;
