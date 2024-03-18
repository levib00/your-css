import Form from "./form";
import { IStyle } from "../objects/styles";
import { useEffect, useRef, useState } from "react";
import { saveToStorage } from "../scripts/storage-handlers";

interface ListingProps {
  style : string
  styles : {isActive?: boolean, css?: string, undeleteable?: boolean, displayName?: string} // TODO: fix these names.
  setAllStyles: React.Dispatch<React.SetStateAction<IStyle>>
  allStyles: IStyle
};

function Listing(props: ListingProps) {
  const {style, setAllStyles, styles, allStyles} = props
  const [editMode, setEditMode] = useState(false)
  const [isActive, setIsActive] = useState(styles.isActive)

  const deleteListing = () => { // TODO: fix clear
    const allStylesCopy = {...allStyles}
    delete allStylesCopy[style];
    // @ts-ignore
    browser.storage.local.remove(style)
    setAllStyles(allStylesCopy)
  }

  const openEditPage = () => {
    setEditMode(true)
    // TODO: cancel button on form is gonna have to set this to false when pressed and isEdit
  }

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const allStylesCopy = {...allStyles}
    allStylesCopy[style].isActive = isActive
    saveToStorage({[style]: allStylesCopy[style]})
    setAllStyles({...allStylesCopy})
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
          {style !== '___toggleAll' && <button onClick={openEditPage}>edit</button>}
          {style !== '___toggleAll' && (styles.undeleteable ? <button onClick={deleteListing}>clear</button> : <button onClick={deleteListing}>delete</button>)}
        </>
      }
    </>
  )
}

export default Listing
