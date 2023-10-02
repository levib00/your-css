"use strict";
const link = document.createElement('style');
const style = {
    stackoverflow: 'body {background-color: black} header {background-color: yellow}',
};
const url = new URL(window.location.href);
const domain = url.hostname.split('.')[0];
link.appendChild(document.createTextNode(style[domain]));
document.head.appendChild(link);
