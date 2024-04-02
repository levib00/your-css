import { useEffect, useState } from 'react';
import { assembleCssForExport, handleDownloadClick } from '../scripts/import-export-css';
import { getFromStorage, populateSpecialStyles } from '../scripts/storage-handlers';
import { IStyle } from '../objects/styles';

function Settings() {
  const [allStyles, setAllStyles] = useState<IStyle | undefined>();

  useEffect(() => {
    (async () => {
      setAllStyles(populateSpecialStyles(await getFromStorage(null)));
    })();
  });

  return (
    <>
      <button onClick={() => handleDownloadClick(null, null, allStyles)}>import</button>
      <button onClick={() => assembleCssForExport(allStyles, null)}>export</button>
    </>
  );
}

export default Settings;
