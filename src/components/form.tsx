import React, { ChangeEvent, useEffect, useState } from "react";
import { saveToStorage } from "../scripts/storage-handlers";
import { useNavigate } from "react-router-dom";
import { handleDownloadClick, parseCssFile } from "../scripts/import-export-css";
import { IStyle } from "../objects/styles";

interface FormProps {
  website: string
  customCss?: string
  isActive?: boolean
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>
  setAllStyles?: React.Dispatch<React.SetStateAction<IStyle>>
  allStyles?: IStyle
};

const Form = (props: FormProps) => {
  const { setEditMode, setAllStyles, allStyles } = props
  const [websiteInput, setWebsiteInput] = useState(props.website || ''); // TODO: get website domain on open new form
  const [cssInput, setCssInput] = useState(props.customCss || '')
  const [isActive, setIsActive] = useState(props.isActive || false)
  const [file, setFile] = useState<File>()
  const navigate = useNavigate();

  useEffect(() => {
    if (!websiteInput) {
      // @ts-ignore
      browser.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = new URL(tabs[0].url).hostname;
        setWebsiteInput(url)
      });
    }
  })

  // TODO: add a warning if it isn't an edit. allow user to confirm update. 
  const saveCss = (website: string, css: string, isActive: boolean) => {
    const newListing = {[website]: {isActive, css}}
    if (setEditMode && setAllStyles) {
      // @ts-ignore
      browser.storage.local.remove(props.website)
      setEditMode(false)
      const allStylesCopy = {...allStyles}
      delete allStylesCopy[props.website]
      allStylesCopy[website] = newListing[website]
      setAllStyles(allStylesCopy)
    }
    saveToStorage(newListing)
    navigate('/')
  }

  const importCss = async (file: File | undefined) => {
    const importedCss = await parseCssFile(file)
    if (!importedCss) {
      return
    }
    setCssInput(cssInput.concat(' ', importedCss))
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files){
      return
    }
    setFile(e.target.files[0])
  }
  // TODO: disable website field on special listings
  return (
    <>
      <label htmlFor="website-input">Website</label>
      <input type="text" id="website-input" name="website" onChange={(e) => setWebsiteInput(e.target.value)} value={websiteInput}/>
      <label htmlFor="css-input">custom css</label>
      <textarea name="css-input" id="css-input" onChange={(e) => setCssInput(e.target.value)} value={cssInput}/>
      <label htmlFor="active-checkbox">activate</label>
      <input type="checkbox" id="active-checkbox" checked={isActive} onChange={() => {setIsActive(!isActive)}} />
      <button onClick={() => saveCss(websiteInput, cssInput, isActive)}>save</button>
      <button onClick={() => {setEditMode ? setEditMode(false) : navigate('/')}}>cancel</button>
      <input type="file" onChange={(e) => handleFileUpload(e)} />
      <button onClick={() => importCss(file)}>import</button>
      <button onClick={() => handleDownloadClick(cssInput, websiteInput, null)}>export</button>
    </>
  )
}

export default Form