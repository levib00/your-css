import { styles, setStyles } from '../../src/objects/styles'
import { getFromStorage } from '../../src/scripts/storage-handlers'

const domainStyle: HTMLStyleElement = document.createElement('style');

const url = new URL(window.location.href);
const domain: string | undefined = url.hostname.split('.')[0];

setStyles(getFromStorage());

interface Domain {
  isActive: boolean
  css: string
};

export const getStyleValue = (domain : Domain) => {
  if (!domain.isActive) {
    return null
  } 
  return domain.css
}

// TODO: test if the optional chain is needed by fixing test setup
domainStyle.appendChild(document.createTextNode(styles[domain]?.css)); 
document.head.appendChild(domainStyle);
