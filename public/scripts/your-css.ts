const link: HTMLStyleElement = document.createElement('style');

interface Style {
  [key: string] : string
};

export const styles: Style = {
  stackoverflow: 'body {background-color: black} header {background-color: yellow}',
};
const url = new URL(window.location.href);
const domain: string | undefined = url.hostname.split('.')[0];

link.appendChild(document.createTextNode(styles[domain]));
document.head.appendChild(link);
