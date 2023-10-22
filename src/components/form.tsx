import { useState } from "react"
import { styles } from "../objects/styles"

interface FormProps {
  website: string
  customCss: string
};

const Form = (props: FormProps) => {
  const [websiteInput, setWebsiteInput] = useState(props.website || '');
  const [cssInput, setCssInput] = useState(props.customCss || '')


  // TODO: add a warning if it isn't an edit. allow user to confirm update. 
  const saveCss = (website: string, css: string) => {
    if (props.website !== website) {
      styles[website] = styles[props.website];
      delete styles[props.website];
    }
    styles[website] = css
  }

  return (
    <>
      <label htmlFor="website-input">Website</label>
      <input type="text" id="website-input" name="website" onChange={(e) => {setWebsiteInput(e.target.value); console.log('changed')}} value={websiteInput}/>
      <label htmlFor="css-input">custom css</label>
      <textarea name="css-input" id="css-input" onChange={(e) => setCssInput(e.target.value)} value={cssInput}/>
      <button onClick={() => saveCss(websiteInput, cssInput)}>save</button>
    </>
  )
}

export default Form