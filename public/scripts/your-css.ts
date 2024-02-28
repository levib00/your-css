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
  let test = ''
  if ((!domain.isActive && !styles._global.isActive) || !styles._toggleAll?.isActive) {
    return ''
  } 
  if (styles._global?.isActive && styles._global.css) {
    test = test.concat(styles._global.css)
  }
  if (domain.isActive && domain.css){
    test = test.concat(domain.css)
  }
  return test 
}

// TODO: test if the optional chain is needed by fixing test setup
domainStyle.appendChild(document.createTextNode(getStyleValue(styles[domain]))); 
document.head.appendChild(domainStyle);
