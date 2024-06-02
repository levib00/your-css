import { defaultStyles } from '../objects/styles';

// Type definitions for the styles stored in the browser storage
interface StyleEntry {
  isActive?: boolean;
  css?: string;
  undeleteable?: boolean;
  displayName?: string;
}

interface StylesObject {
  [key: string]: StyleEntry;
}

// Function to save new or updated styles to the browser storage
export const saveToStorage = async (
  newObject: StylesObject,
) => {
  try {
    const existingData = await browser.storage.local.get('styles');
    const stylesObject: StylesObject = existingData.styles || {};
    const mergedObject = { ...stylesObject, ...newObject };
    await browser.storage.local.set({ styles: mergedObject });
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
};

// Function to retrieve styles from the browser storage
export const getFromStorage = async (
  domain: string | null,
) => {
  try {
    const { styles } = await browser.storage.local.get('styles');
    if (domain) {
      return styles ? styles[domain] : null;
    }
    return styles || null;
  } catch (error) {
    console.error('Error getting from storage:', error);
    return null;
  }
};

export const populateSpecialStyles = (
  newStyle: StylesObject,
) => {
  const newStyleCopy: StylesObject = { ...newStyle };

  if (!newStyleCopy.___toggleAll) {
    newStyleCopy.___toggleAll = { ...defaultStyles.___toggleAll };
  }
  newStyleCopy.___toggleAll.undeleteable = true;
  newStyleCopy.___toggleAll.displayName = 'toggle all';

  if (!newStyleCopy.__global) {
    newStyleCopy.__global = { ...defaultStyles.__global };
  }
  newStyleCopy.__global.undeleteable = true;
  newStyleCopy.__global.displayName = 'global styles';

  if (!newStyleCopy._extension) {
    newStyleCopy._extension = { ...defaultStyles._extension };
  }
  newStyleCopy._extension.undeleteable = true;
  newStyleCopy._extension.displayName = 'extension styles';

  return newStyleCopy;
};
