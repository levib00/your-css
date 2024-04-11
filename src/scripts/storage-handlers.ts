import { defaultStyles } from '../objects/styles';

export const saveToStorage = async (
  newObject : { [key: string] : { isActive?: boolean, css?: string } },
) => {
  const existingData = await browser.storage.local.get('styles');

  const stylesObject = existingData.styles || {};

  const mergedObject = { ...stylesObject, ...newObject };

  await browser.storage.local.set({ styles: mergedObject });
};

export const getFromStorage = async (domain: string | null) => {
  const styles = await browser.storage.local.get('styles');
  if (domain) {
    return styles.styles ? styles.styles[domain] : null;
  }
  return styles.styles;
};

export const populateSpecialStyles = (
  newStyle: {
    [key: string] : {
      isActive?: boolean,
      css?: string,
      undeleteable?: boolean,
      displayName?: string,
    },
  },
) => {
  const newStyleCopy = newStyle;
  if (!newStyleCopy.___toggleAll) {
    newStyleCopy.___toggleAll = defaultStyles.___toggleAll;
  }
  newStyleCopy.___toggleAll.undeleteable = true;
  newStyleCopy.___toggleAll.displayName = 'toggle all';
  if (!newStyleCopy.__global) {
    newStyleCopy.__global = defaultStyles.__global;
  }
  newStyleCopy.__global.undeleteable = true;
  newStyleCopy.__global.displayName = 'global styles';
  if (!newStyleCopy._extension) {
    newStyleCopy._extension = defaultStyles._extension;
  }
  newStyleCopy._extension.undeleteable = true;
  newStyleCopy._extension.displayName = 'extension styles';
  return newStyleCopy;
};
