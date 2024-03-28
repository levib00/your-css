export interface IStyle {
  [key: string] : {
    isActive?: boolean,
    css?: string
    undeleteable?: boolean
    displayName?: string
  }
}

export let styles: IStyle = {
  ___toggleAll: {
    isActive: true,
    css: '',
    undeleteable: true,
    displayName: 'toggle all',
  },
  __global: {
    isActive: false,
    css: '',
    undeleteable: true,
    displayName: 'global styles',
  },
  _extension: {
    isActive: false,
    css: '',
    undeleteable: true,
    displayName: 'extension styles',
  },
};

export const setStyles = (
  newStyles: {
    [key: string] : {
      isActive?: boolean,
      css?: string,
      undeleteable?:
      boolean,
      displayName?: string
    }
  },
) => {
  const newStyleCopy = newStyles
  if (!newStyleCopy.___toggleAll) {
    newStyleCopy.___toggleAll = styles.___toggleAll;
  }
  newStyleCopy.___toggleAll.undeleteable = true;
  newStyleCopy.___toggleAll.displayName = 'toggle all';
  if (!newStyleCopy.__global) {
    newStyleCopy.__global = styles.__global;
  }
  newStyleCopy.__global.undeleteable = true;
  newStyleCopy.__global.displayName = 'global styles';
  if (!newStyleCopy._extension) {
    newStyleCopy._extension = styles._extension;
  }
  newStyleCopy._extension.undeleteable = true;
  newStyleCopy._extension.displayName = 'extension styles';
  styles = newStyleCopy;
};
