import Form from "./form";
import { IStyle, styles as masterStyles } from "../objects/styles";
import { useLayoutEffect, useRef, useState } from "react";
import { saveToStorage } from "../scripts/storage-handlers";

interface ListingProps {
  style : string
  styles : {isActive?: boolean, css?: string, undeleteable?: boolean, displayName?: string} // TODO: fix these names.
  setAllStyles: React.Dispatch<React.SetStateAction<IStyle>>
};

function Listing(props: ListingProps) {
  const {style, setAllStyles, styles} = props
  const [editMode, setEditMode] = useState(false)
  const [isActive, setIsActive] = useState(styles.isActive)

  const deleteListing = () => {
    delete masterStyles[style];
    saveToStorage(masterStyles)
    setAllStyles({...masterStyles})
    // TODO: use DI instead of props.
  }

  const openEditPage = () => {
    setEditMode(true)
    // TODO: cancel button on form is gonna have to set this to false when pressed and isEdit
  }

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    masterStyles[style].isActive = isActive
    setAllStyles({...masterStyles})
    saveToStorage(masterStyles)
  }, [isActive]);

  return (
    <>
      {
        editMode ?
        <Form website={style} customCss={styles.css} isActive={styles.isActive}/>
        : 
        <>
          <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)}/>
          <div>
            { styles.displayName || style }
          </div>
          <div>
            { styles.css }
          </div>
          {style !== '_toggleAll' && <button onClick={openEditPage}>edit</button>}
          {style !== '_toggleAll' && (styles.undeleteable ? <button onClick={deleteListing}>clear</button> : <button onClick={deleteListing}>delete</button>)}
        </>
      }
    </>
  )
}

export default Listing
