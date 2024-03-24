import React, { ChangeEvent, useEffect, useState, KeyboardEvent } from "react";
import { saveToStorage } from "../scripts/storage-handlers";
import { useNavigate } from "react-router-dom";
import { handleDownloadClick, parseCssFile } from "../scripts/import-export-css";
import { IStyle } from "../objects/styles";

interface FormProps {
  styles?: {
    css?: string
    isActive?: boolean
    undeleteable?: boolean
    displayName?: string
  }
  domain?: string
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>
  setAllStyles?: React.Dispatch<React.SetStateAction<IStyle>>
  allStyles?: IStyle
};

const Form = (props: FormProps) => {
  const { setEditMode, setAllStyles, allStyles, styles, domain } = props
  const [websiteInput, setWebsiteInput] = useState(domain || '');
  const [cssInput, setCssInput] = useState(styles?.css ? `${styles?.css}`.replace(/([{;])/g, '$1\n    ').replace(/}/g, '}\n\n') : null || '')
  const [isActive, setIsActive] = useState(styles?.isActive || false)
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
    if (setEditMode && setAllStyles && domain) {
      // @ts-ignore
      browser.storage.local.remove(styles?.website)
      setEditMode(false)
      const allStylesCopy = {...allStyles}
      delete allStylesCopy[domain]
      allStylesCopy[website] = newListing[website]
      setAllStyles(allStylesCopy)
    }
    saveToStorage(newListing)
    navigate('/')
  }

  const indentOnTab = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab' && e.shiftKey) {

      e.preventDefault();

      const target = e.target as HTMLTextAreaElement;
      const { value, selectionEnd } = target;
      target.value = `${value.substring(0, selectionEnd)}\t${value.substring(selectionEnd)}`;
      target.selectionStart = target.selectionEnd = selectionEnd + 1;

      // @ts-ignore
      setCssInput(`${target.value}`)
    }
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

  return (
    <>
      {!styles?.undeleteable && <label htmlFor="website-input">Website</label>}
      {!styles?.undeleteable &&<input type="text" id="website-input" name="website" onChange={(e) => setWebsiteInput(e.target.value)} value={websiteInput}/>}
      <label htmlFor="css-input">custom css</label>
      <textarea name="css-input" id="css-input" className="css-input" onKeyDown={(e) => indentOnTab(e)} onChange={(e) => setCssInput(e.target.value)} value={cssInput}/>
      <div>Shift + Tab to indent</div>
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