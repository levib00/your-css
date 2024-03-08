export interface IStyle {
  [key: string] : {
    isActive?: boolean,
    css?: string
    undeleteable?: boolean
    displayName?: string
  }
};

export let styles: IStyle = {
  ___toggleAll: {
    isActive: true,
    css: '',
    undeleteable: true,
    displayName: 'toggle all'
  },
  __global: {
    isActive: false, 
    css: '',
    undeleteable: true,
    displayName: 'global styles'
  },
  _extension: {
    isActive: false,
    css: '',
    undeleteable: true,
    displayName: 'extension styles'
  },
};

export const setStyles = (newStyles: {[key: string] : {isActive?: boolean, css?: string, undeleteable?: boolean, displayName?: string}}) => {
  if (!newStyles.___toggleAll) {
    newStyles.___toggleAll = styles.___toggleAll
  }
  newStyles.___toggleAll.undeleteable = true
  newStyles.___toggleAll.displayName = 'toggle all'
  if (!newStyles.__global) {
    newStyles.__global = styles.__global
  }
  newStyles.__global.undeleteable = true
  newStyles.__global.displayName = 'global styles'
  if (!newStyles._extension) {
    newStyles._extension = styles._extension
  }
  newStyles._extension.undeleteable = true
  newStyles._extension.displayName = 'extension styles'
  styles = newStyles
}