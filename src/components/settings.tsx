import { useEffect, useState } from 'react';
import { assembleCssForExport, handleDownloadClick } from '../scripts/import-export-css';
import { getFromStorage, populateSpecialStyles } from '../scripts/storage-handlers';
import { IStyle } from '../objects/styles';

interface ISettingsProps {
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  isDarkMode: boolean
}

function Settings(props: ISettingsProps) {
  const { setIsDarkMode, isDarkMode } = props;
  const [allStyles, setAllStyles] = useState<IStyle | undefined>();
  const [darkModeSelector, setDarModeSelector] = useState(isDarkMode ? 'dark' : 'light');

  useEffect(() => {
    (async () => {
      const storageStyles = await getFromStorage(null) || {};
      setAllStyles(populateSpecialStyles(await storageStyles));
    })();
  }, []);

  const handleSelector = (option: string) => {
    if (option === 'dark') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
    setDarModeSelector(option);
  };

  return (
    <>
      {allStyles ? <>
        <button onClick={() => handleDownloadClick(null, null, allStyles)}>import</button>
        <button onClick={() => assembleCssForExport(allStyles, null)}>export</button>
      </> : 'Loading...'}
      <div>
        <select defaultValue={darkModeSelector} placeholder='Select light or dark mode.'>
          <option onClick={() => handleSelector('light')}>Light</option>
          <option onClick={() => handleSelector('dark')}>Dark</option>
        </select>
      </div>
    </>
  );
}

export default Settings;
