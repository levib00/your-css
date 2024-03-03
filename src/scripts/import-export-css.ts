import { IStyle } from "../objects/styles";

export const assembleCssForExport = (domain: string, masterStyles: IStyle) => {
  // Convert object to JSON string
  const jsonString = JSON.stringify(masterStyles[domain], null, 2);

  // Create a Blob from the JSON string
  const file = new Blob([jsonString], {type: 'application/json'});

  // Create a URL for the Blob
  const jsonURL = URL.createObjectURL(file);
  return jsonURL
}

export const parseCssFile = async (file: File) => {
  return await file.text()
}
