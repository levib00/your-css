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
    displayName: 'extension style'
  },
};

export const setStyles = (newStyles: {[key: string] : {isActive: boolean, css: string}}) => {
  styles = newStyles
}