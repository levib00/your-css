import React, {
  useEffect, useState, KeyboardEvent,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from '@mui/icons-material';
import { getFromStorage, saveToStorage } from '../scripts/storage-handlers';
import { handleDownloadClick } from '../scripts/import-export-css';
import { IStyle } from '../objects/styles';
import ConfirmModal from './confirm-modal';

interface IStyleInfo {
  css?: string;
    isActive?: boolean;
    undeleteable?: boolean;
    displayName?: string;
}

interface IFormProps {
  styleInfo?: IStyleInfo
  domain?: string;
  toggleEditing?: () => void;
  setAllStyles?: React.Dispatch<React.SetStateAction<IStyle | undefined>>;
  allStyles?: IStyle;
}

const formatCss = (css: string | undefined) => {
  if (!css) return '';
  // Split declaration blocks into array
  const cssArray = css.split('}')
  // Format remove all white space from each element
  const unformattedCssArray = cssArray.map(string => string.replace(/\s+/g, ' ')
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*:\s*/g, ':').replace(/\s*;\s*/g, ';')
    .trim());
  // Remove any empty elements
  const filteredCssArray = unformattedCssArray.filter(Boolean)
  // Close blocks opened by the split
  const closedCssArray = filteredCssArray.map(string => string.includes('{') ? string.concat('}') : string)
  // Add white space in the right places
  const formattedCssArray = closedCssArray.map(string => string.replace(/;/g, ';\n  ')
    .replace(/{/g, ' {\n  ')
    .replace(/:/g, ': ')
    .replace(/}/g, '\n}')
    .replace(/\n  \n/g, '\n'))
    // Assemble elements back into strings
  return formattedCssArray.join('\n\n')
};

const Form = (props: IFormProps) => {
  const {
    toggleEditing, setAllStyles, allStyles, styleInfo, domain,
  } = props;

  const [websiteInput, setWebsiteInput] = useState(domain || '');
  const [cssInput, setCssInput] = useState(formatCss(styleInfo?.css));
  const [isActive, setIsActive] = useState(styleInfo?.isActive || false);
  const [modalIsShowing, setModalIsShowing] = useState(false);
  const navigate = useNavigate();

  // Set website input to current website upon opening a new form
  useEffect(() => {
    const fetchWebsite = async () => {
      if (!websiteInput) {
        const tabs = await browser.tabs.query({ active: true, lastFocusedWindow: true });
        const url = new URL(tabs[0].url || '').hostname;
        setWebsiteInput(url);
      }
    };
    fetchWebsite();
  }, []);

  const saveCss = async (
    website: string,
    css: string,
    activeStatus: boolean,
    prevStyles?: IStyleInfo | null,
    overwrite: boolean = false,
  ) => {
    let newListing: {
      [website: string]: {
        css?: string,
        isActive?: boolean,
        undeleteable?: boolean,
        displayName?: string,
      }
    };

    // Add undeletable and display name properties if they are special and should exist
    if (prevStyles?.undeleteable) {
      newListing = {
        [website]: {
          isActive: activeStatus,
          css,
          undeleteable: prevStyles?.undeleteable,
          displayName: prevStyles?.displayName,
        },
      };
    } else {
      newListing = {
        [website]: {
          isActive: activeStatus,
          css,
        },
      };
    }

    // If form will overwrite an existing website, show modal else save as new or edit
    if (await getFromStorage(website) && (!overwrite && !toggleEditing)) {
      setModalIsShowing(true);
    } else {
      if (toggleEditing && setAllStyles && domain) {
        toggleEditing();
        const allStylesCopy = { ...allStyles };
        delete allStylesCopy[domain];
        allStylesCopy[website] = newListing[website];
        setAllStyles(allStylesCopy);
      }
      await saveToStorage(newListing);
      navigate('/');
    }
  };

  // Let user indent with shift + tab
  const indentOnTab = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();

      const target = e.target as HTMLTextAreaElement;
      const { value, selectionEnd } = target;
      target.value = `${value.substring(0, selectionEnd)}\t${value.substring(selectionEnd)}`;
      target.selectionStart = selectionEnd + 1;
      target.selectionEnd = selectionEnd + 1;

      setCssInput(`${target.value}`);
    }
  };

  // store the websites style info in local storage and open a options_ui page to import
  const importHandler = () => {
    browser.storage.local.set({
      temp: {
        website: domain || websiteInput,
        displayName: styleInfo?.displayName,
        undeleteable: styleInfo?.undeleteable,
        css: cssInput,
        isActive,
      },
    });

    browser.windows.create({
      url: browser.runtime.getURL('import-listing.html'),
      type: 'popup',
      width: 350,
      height: 420,
    });
  };

  return (
    <div className={!toggleEditing ? 'new-listing' : 'editing-listing-form-container'}>
      {!toggleEditing ? (
        <Link to='/' className='go-back-form-button go-back-new-form-button' title='go back'>
          <ChevronLeft />
        </Link>
      ) : (
        <button className='go-back-form-button' title='go back' onClick={toggleEditing}><ChevronLeft/></button>
      )}
      <form className={!toggleEditing ? 'new-form' : 'editing-form'} onSubmit={(e) => e.preventDefault()}>
        <section>
          {
            modalIsShowing && <ConfirmModal
            toggleModal={() => setModalIsShowing(!modalIsShowing)}
            saveCss={saveCss}
            listingInfo={{ websiteInput, cssInput, isActive }}
          />}
          {!styleInfo?.undeleteable && (
            <label htmlFor='website-input' className='website-input'>
              Website:
              <input
                type='text'
                id='website-input'
                name='website'
                onChange={(e) => setWebsiteInput(e.target.value)}
                value={websiteInput}
                required
                minLength={3}
              />
            </label>
          )}
          <label htmlFor='css-input'>
            <div>Custom css:</div>
            <textarea
              name='css-input'
              id='css-input'
              className='css-input'
              onKeyDown={(e) => indentOnTab(e)}
              onChange={(e) => setCssInput(e.target.value)}
              value={cssInput}
            />
            <label className='shift-tab-label' htmlFor='css-input'>Shift + Tab to indent</label>
          </label>
          <label className='checkbox-label form-input-container style-active-container' htmlFor='active-checkbox'>
            <div className='activate-text'>Activate:</div>
            <div className="checkbox-container form-checkbox-container">
              <input type='checkbox' id='active-checkbox' checked={isActive} onChange={() => setIsActive(!isActive)} />
              <span className='checkmark'></span>
            </div>
          </label>
          <div className='style-form-button-container form-input-container'>
            <button onClick={() => saveCss(websiteInput, cssInput, isActive, styleInfo)}>save</button>
            <button onClick={toggleEditing ? () => toggleEditing() : () => navigate('/')}>cancel</button>
          </div>
        </section>
        <section className='import-export-container'>
          <div className='style-form-button-container form-input-container'>
            <button onClick={importHandler}>import</button>
            <button onClick={() => handleDownloadClick(
              cssInput,
              websiteInput,
              null,
            )}>export</button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default Form;
