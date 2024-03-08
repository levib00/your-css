export interface IStyle {
  [key: string] : {
    isActive?: boolean,
    css?: string
    undeleteable?: boolean
    displayName?: string
  }
};

export let styles: IStyle = {
  _toggleAll: {
    isActive: true,
    css: '',
    undeleteable: true,
    displayName: 'toggle all'
  },
  _global: {
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
  if (!newStyles._toggleAll) {
    newStyles._toggleAll = styles._toggleAll
  }
  newStyles._toggleAll.undeleteable = true
  newStyles._toggleAll.displayName = 'toggle all'
  if (!newStyles._global) {
    newStyles._global = styles._global
  }
  newStyles._global.undeleteable = true
  newStyles._global.displayName = 'global styles'
  if (!newStyles._extension) {
    newStyles._extension = styles._extension
  }
  newStyles._extension.undeleteable = true
  newStyles._extension.displayName = 'extension styles'
  styles = newStyles
}