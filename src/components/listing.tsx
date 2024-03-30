import { useEffect, useRef, useState } from 'react';
import Form from './form';
import { IStyle } from '../objects/styles';
import { saveToStorage } from '../scripts/storage-handlers';
import ConfirmModal from './confirm-modal';

interface ListingProps {
  style : string // TODO: fix these names.
  styles : { isActive?: boolean, css?: string, undeleteable?: boolean, displayName?: string }
  setAllStyles: React.Dispatch<React.SetStateAction<IStyle>>
  allStyles: IStyle
  toggleEditing: () => void
  isBeingEdited: boolean
}

function Listing(props: ListingProps) {
  const {
    style, setAllStyles, styles, allStyles, toggleEditing, isBeingEdited,
  } = props;
  const [isActive, setIsActive] = useState(styles.isActive);
  const [ModalIsShowing, setModalIsShowing] = useState(false);

  const deleteListing = () => {
    const allStylesCopy = { ...allStyles };
    delete allStylesCopy[style];
    // @ts-ignore
    browser.storage.local.remove(style);
    setAllStyles(allStylesCopy);
  };

  const clearListing = () => {
    const allStylesCopy = { ...allStyles };
    allStylesCopy[style].css = '';
    // @ts-ignore
    saveToStorage({ [style]: allStylesCopy[style] });
    setAllStyles(allStylesCopy);
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
    allStylesCopy[style].isActive = isActive;
    saveToStorage({ [style]: allStylesCopy[style] });
    setAllStyles({ ...allStylesCopy });
  }, [isActive]);

  return (
    <>
      {
        isBeingEdited
          ? <Form
            styles={styles}
            domain={style}
            toggleEditing={toggleEditing}
            allStyles={allStyles}
            setAllStyles={setAllStyles}
          />
          : <>
          {ModalIsShowing && <ConfirmModal setModalIsShowing={setModalIsShowing} type={'delete'} deleteListing={deleteListing} />}
          <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)}/>
          <div>
            { styles.displayName || style }
          </div>
          <div>
            { styles.css }
          </div>
          {style !== '___toggleAll' && <button onClick={openEditPage}>edit</button>}
          {style !== '___toggleAll' && (styles.undeleteable ? <button onClick={clearListing}>clear</button> : <button onClick={() => setModalIsShowing(true)}>remove</button>)}
        </>
      }
    </>
  );
}

export default Listing;
