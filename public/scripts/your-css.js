var link = document.createElement('style');
;
export var styles = {
    stackoverflow: 'body {background-color: black} header {background-color: yellow}',
};
var url = new URL(window.location.href);
var domain = url.hostname.split('.')[0];
link.appendChild(document.createTextNode(styles[domain]));
document.head.appendChild(link);
