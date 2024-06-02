import { IStyle } from '../objects/styles';

export const assembleCssForExport = (
  allStyles: IStyle | null | undefined,
  css: string | null,
): string => {
  if (!allStyles && !css) {
    return '';
  }

  const jsonString = css ? css : JSON.stringify(allStyles, null, 2);

  const file = new Blob([jsonString], { type: 'application/json' });
  return URL.createObjectURL(file);
};

export const parseJsonFile = async (
  file: File | undefined,
  allStyles: IStyle
): Promise<IStyle> => {
  if (!file) {
    return allStyles;
  }

  try {
    const json = await file.text();
    const parsedJSON = JSON.parse(json);
    return { ...parsedJSON, ...allStyles };
  } catch (error) {
    console.error('Failed to parse JSON file', error);
    return allStyles;
  }
};

export const handleDownloadClick = (
  css: string | null,
  domain: string | null,
  allStyles: IStyle | null | undefined,
): void => {
  const url = assembleCssForExport(allStyles, css);
  if (!url) {
    return;
  }

  const link = document.createElement('a');
  link.href = url;
  link.download = allStyles ? 'your-css.json' : `${domain}.css`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};