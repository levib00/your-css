export interface IStyle {
  [key: string] : {
    isActive?: boolean,
    css?: string
  }
};

export let styles: IStyle = {
  _global: {
    isActive: false, 
    css: ''
  },
  _extension: {
    isActive: false,
    css: ''
  },
  _toggleAll: {
    isActive: true,
    css: ''
  }
};

export const setStyles = (newStyles: {[key: string] : {isActive: boolean, css: string}}) => {
  styles = newStyles
}