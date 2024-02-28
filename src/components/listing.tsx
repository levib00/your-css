import Form from "./form";
import { IStyle, styles as masterStyles } from "../objects/styles";
import { useState } from "react";
import { saveToStorage } from "../scripts/storage-handlers";

interface ListingProps {
  style : string
  styles : {isActive?: boolean, css?:string } // TODO: fix these names.
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

  const updateIsActive = () => {
    setIsActive(isActive);
    masterStyles[style].isActive = isActive
    setAllStyles({...masterStyles})
    saveToStorage(masterStyles)
  };

  const openEditPage = () => {
    setEditMode(true)
    // TODO: cancel button on form is gonna have to set this to false when pressed and isEdit
   }

  return (
    <>
      {
        editMode ?
        <Form website={style} customCss={styles.css}/>
        : 
        <>
          <input type="checkbox" checked={isActive} onChange={updateIsActive}/>
          <div>
            { style }
          </div>
          <div>
            { styles.css }
          </div>
          <button onClick={openEditPage}>edit</button>
          <button onClick={deleteListing}>delete</button>
        </>
      }
    </>
  )
}

export default Listing
