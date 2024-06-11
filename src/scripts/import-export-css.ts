import { IStyle } from '../objects/styles';

// Put css into a file to be downloaded by user
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

// Open the download confirmation 
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