import { IStyle } from "../objects/styles";

export const assembleCssForExport = (domain: string | null, masterStyles: IStyle | null, css: string | null) => {
  let jsonString
  if (css) {
    jsonString = JSON.stringify(css, null, 2)
  } else if (masterStyles && domain) {
    jsonString = JSON.stringify(masterStyles[domain], null, 2);
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
