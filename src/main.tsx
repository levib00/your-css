import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './assets/styles/styles.scss';
import { getFromStorage } from './scripts/storage-handlers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

(async () => {
  const extensionStyles = await getFromStorage('_extension');

  const domainStyle: HTMLStyleElement = document.createElement('style');
  domainStyle.appendChild(document.createTextNode(await extensionStyles?.isActive && extensionStyles.css ? extensionStyles.css : ''));
  document.head.appendChild(domainStyle);
})();
