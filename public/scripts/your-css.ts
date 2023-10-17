import { styles } from '../../src/objects/styles'

const link: HTMLStyleElement = document.createElement('style');

const url = new URL(window.location.href);
const domain: string | undefined = url.hostname.split('.')[0];

link.appendChild(document.createTextNode(styles[domain]));
document.head.appendChild(link);
