import { styles, setStyles } from '../../src/objects/styles'
import { getFromStorage } from '../../src/scripts/storage-handlers'

const link: HTMLStyleElement = document.createElement('style');

const url = new URL(window.location.href);
const domain: string | undefined = url.hostname.split('.')[0];

setStyles(getFromStorage());

interface Domain {
  active: boolean
  styles: string
};

export const getStyleValue = (domain : Domain) => {
  if (!domain.active) {
    return null
  } 
  return domain.styles
}

link.appendChild(document.createTextNode(styles[domain]));
document.head.appendChild(link);
