import { defaultStyles } from '../objects/styles';

export const saveToStorage = (
  newObject : { [key: string] : { isActive?: boolean, css?: string } },
) => {
  // @ts-ignore
  browser.storage.local.set(newObject);
};

// @ts-ignore
export const getFromStorage = (domain: string | null) => browser.storage.local.get(domain);

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
