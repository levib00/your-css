const link: HTMLStyleElement = document.createElement('style');

type Styles = { [key: string] : string };

const style: Styles = {
  stackoverflow: 'body {background-color: black} header {background-color: yellow}',

};
const url = new URL(window.location.href);
const domain: string | undefined = url.hostname.split('.')[0];

link.appendChild(document.createTextNode(style[domain]));
document.head.appendChild(link);
