interface Style {
  [key: string] : string
};

export let styles: Style = {
};

export const setStyles = (newStyles: {[key: string] : string}) => {
  styles = newStyles
}