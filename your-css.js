// Create new link Element
let link = document.createElement('style');
const head = document.head;

const style = 'body {background-color: black} header {background-color: yellow}'

link.type = 'text/css'
// Append link element to HTML head
link.appendChild(document.createTextNode(style))
head.appendChild(link);
