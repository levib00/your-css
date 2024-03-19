import { ChangeEvent, useState } from "react";
import { styles } from "../objects/styles";
import { saveToStorage } from "../scripts/storage-handlers";
import { useNavigate } from "react-router-dom";
import { handleDownloadClick, parseCssFile } from "../scripts/import-export-css";

interface FormProps {
  website: string
  customCss?: string
  isActive?: boolean
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>
};

const Form = (props: FormProps) => {
  const { setEditMode } = props
  const [websiteInput, setWebsiteInput] = useState(props.website || '');
  const [cssInput, setCssInput] = useState(props.customCss || '')
  const [isActive, setIsActive] = useState(props.isActive || false)
  const [file, setFile] = useState<File>()
  const navigate = useNavigate();

  // TODO: add a warning if it isn't an edit. allow user to confirm update. 
  const saveCss = (website: string, css: string, isActive: boolean) => {
    if (props.website !== website) {
      styles[website] = styles[props.website];
      delete styles[props.website];
    }
    styles[website] = {isActive, css}
    saveToStorage(styles)
    navigate('/')
    if (setEditMode) { // TODO: update allStyles so listing shows new css
      setEditMode(false)
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