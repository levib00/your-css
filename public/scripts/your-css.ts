import { styles, setStyles } from '../../src/objects/styles'
import { getFromStorage } from '../../src/scripts/storage-handlers'

const domainStyle: HTMLStyleElement = document.createElement('style');

const url = new URL(window.location.href);
const domain: string | undefined = url.hostname.split('.')[0];

setStyles(getFromStorage());

interface Domain {
  isActive?: boolean
  css?: string
};

export const getStyleValue = (domain : Domain) => {
  let css = ''
  if ((!domain?.isActive && !styles._global?.isActive) || !styles._toggleAll?.isActive) {
    return ''
  } 
  if (styles._global?.isActive && styles._global?.css) {
    css = css.concat(styles._global.css)
  }
  if (domain?.isActive && domain.css){
    css = css.concat(domain.css)
  }
  return css
}

domainStyle.appendChild(document.createTextNode(getStyleValue(styles[domain]))); 
document.head.appendChild(domainStyle);
