import { IStyle } from "../objects/styles";

export const assembleCssForExport = ( masterStyles: IStyle | null, css: string | null) => {
  let jsonString
  if (css) {
    jsonString = css
  } else if (masterStyles) {
    jsonString = JSON.stringify(masterStyles, null, 2);
  } else {
    return 
  }

  // Create a Blob from the JSON string
  const file = new Blob([jsonString], {type: 'application/json'});

  // Create a URL for the Blob
  const jsonURL = URL.createObjectURL(file);
  return jsonURL
}

export const parseCssFile = async (file: File | undefined) => {
  if (!file) {
    return
  }
  return await file.text()
}

export const parseJsonFile = async (file: File | undefined, masterStyles: IStyle) => {
  const json = await parseCssFile(file)
  if (!json) {
    return
  }
  const parsedJSON = JSON.parse(json)

  return {...parsedJSON, ...masterStyles}
}
