interface Style {
  [key: string] : {isActive: boolean, css: string}
};

export let styles: Style = {
};

export const setStyles = (newStyles: {[key: string] : {isActive: boolean, css: string}}) => {
  styles = newStyles
}