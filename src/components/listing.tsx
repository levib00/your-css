import Form from "./form";
import { styles as masterStyles } from "../objects/styles";
import { useState } from "react";
import { saveToStorage } from "../scripts/storage-handlers";

interface ListingProps {
  style : string
  styles :{ [key: string]: string} // TODO: fix these names.
  setAllStyles: any
};

function Listing(props: ListingProps) {
  const {style, setAllStyles} = props
  const [editMode, setEditMode] = useState(false)

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

  return (
    <>
      {
        editMode ?
        <Form website={style} customCss={props.styles[style]}/>
        : 
        <>
          <div>
            { style }
          </div>
          <div>
            { props.styles[style] }
          </div>
          <button onClick={openEditPage}>edit</button>
          <button onClick={deleteListing}>delete</button>
        </>
      }
    </>
  )
}

export default Listing
