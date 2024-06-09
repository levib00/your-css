import { useEffect, useState } from 'react';
import { handleDownloadClick } from '../scripts/import-export-css';
import { getFromStorage, populateSpecialStyles } from '../scripts/storage-handlers';
import { IStyle } from '../objects/styles';

interface ISettingsProps {
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
}

const fetchStyles = async (setAllStyles: React.Dispatch<React.SetStateAction<IStyle | undefined>>) => {
  const storageStyles = await getFromStorage(null);
  setAllStyles(populateSpecialStyles(await storageStyles || {}));
};

const handleSelector = (
  option: string, 
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>, 
  setDarkModeSelector: React.Dispatch<React.SetStateAction<string>>
) => {
  const isDark = option === 'dark';
  setIsDarkMode(isDark);
  browser.storage.local.set({ darkMode: isDark });
  setDarkModeSelector(option);
};

const Settings = (props: ISettingsProps) => {
  const { setIsDarkMode, isDarkMode } = props;
  const [allStyles, setAllStyles] = useState<IStyle | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [darkModeSelector, setDarkModeSelector] = useState(isDarkMode ? 'dark' : 'light');

  useEffect(() => {
    fetchStyles(setAllStyles);
  }, []);

  const handleOptionClick = (option: string) => {
    handleSelector(option, setIsDarkMode, setDarkModeSelector);
    setIsOpen(false);
  };

  const importHandler = () => {
    browser.windows.create({
      url: browser.runtime.getURL('import-all.html'),
      type: 'popup',
      width: 350,
      height: 420,
    });
  };

  return (
    <div className='settings-page'>
      {allStyles ? (
        <section className='settings-buttons-container'>
          <button onClick={importHandler}>import</button>
          <button onClick={() => handleDownloadClick(null, null, allStyles)}>export</button>
        </section>
      ) : (
        'Loading...'
      )}
      <section className='light-dark-selector-container'>
        <div className='custom-select'>
          <div
            className={`selected-option ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {darkModeSelector}
            <div className='arrow'>&#9660;</div>
          </div>
          {isOpen && (
            <div className='options'>
              <div className='option' onClick={() => handleOptionClick('light')}>
                light
              </div>
              <div className='option' onClick={() => handleOptionClick('dark')}>
                dark
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Settings;