import { ChangeEvent, useState } from "react";
import { styles } from "../objects/styles";
import { saveToStorage } from "../scripts/storage-handlers";
import { useNavigate } from "react-router-dom";
import { assembleCssForExport, parseCssFile } from "../scripts/import-export-css";

interface FormProps {
  website: string
  customCss?: string
  isActive?: boolean
};

const Form = (props: FormProps) => {
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

  const handleDownloadClick = () => {
    const url = assembleCssForExport(null, null, cssInput)
    if (!url) {
      return
    }
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `${props.website}.css`,
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
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
      <input type="file" onChange={(e) => handleFileUpload(e)} />
      <button onClick={() => importCss(file)}>import</button>
      <button onClick={handleDownloadClick}>export</button>
    </>
  )
}

export default Form