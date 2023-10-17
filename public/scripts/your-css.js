import { styles } from '../../src/objects/styles';
var link = document.createElement('style');
var url = new URL(window.location.href);
var domain = url.hostname.split('.')[0];
link.appendChild(document.createTextNode(styles[domain]));
document.head.appendChild(link);
