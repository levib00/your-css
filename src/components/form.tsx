import { useState } from "react";
import { styles } from "../objects/styles";
import { saveToStorage } from "../scripts/storage-handlers";
import { useNavigate } from "react-router-dom";

interface FormProps {
  website: string
  customCss?: string
  isActive?: boolean
};

const Form = (props: FormProps) => {
  const [websiteInput, setWebsiteInput] = useState(props.website || '');
  const [cssInput, setCssInput] = useState(props.customCss || '')
  const [isActive, setIsActive] = useState(props.isActive || false)
  const navigate = useNavigate();

  // TODO: add a warning if it isn't an edit. allow user to confirm update. 
  const saveCss = (website: string, css: string, isActive: boolean) => {
    if (props.website !== website) {
      styles[website] = styles[props.website];
      delete styles[props.website];
    }
    styles[website] = {isActive, css} // TODO: allow changing isActive
    saveToStorage(styles)
    navigate('/')
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
    </>
  )
}

export default Form