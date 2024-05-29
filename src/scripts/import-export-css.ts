import { IStyle } from '../objects/styles';

export const assembleCssForExport = (
  allStyles: IStyle | null | undefined,
  css: string | null,
) => {
  let jsonString;
  if (css) {
    jsonString = css;
  } else if (allStyles) {
    jsonString = JSON.stringify(allStyles, null, 2);
  } else {
    return '';
  }

  // Create a Blob from the JSON string
  const file = new Blob([jsonString], { type: 'application/json' });

  // Create a URL for the Blob
  const jsonURL = URL.createObjectURL(file);
  return jsonURL;
};

export const parseJsonFile = async (file: File | undefined, allStyles: IStyle) => {
  const json = await file?.text();
  if (!json) {
    return '';
  }
  const parsedJSON = JSON.parse(json);

  return { ...parsedJSON, ...allStyles };
};

export const handleDownloadClick = (
  css: string | null,
  domain: string | null,
  allStyles: IStyle | null | undefined,
) => {
  const link = document.createElement('a');
  let url;
  if (allStyles) {
    url = assembleCssForExport(allStyles, null);
    link.download = 'your-css.json';
  } else if (css) {
    url = assembleCssForExport(null, css);
    link.download = `${domain}.css`;
  }
  if (!url) {
    return;
  }

  link.href = url;

  // Append to html link element page
  document.body.appendChild(link);

  // Start download
  link.click();

  // Clean up and remove the link
  if (link.parentNode) {
    link.parentNode.removeChild(link);
  }
};
