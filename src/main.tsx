import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { styles } from './objects/styles'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const domainStyle: HTMLStyleElement = document.createElement('style');
domainStyle.appendChild(document.createTextNode(styles._extension?.isActive && styles._extension?.css ? styles._extension?.css : ''));
document.head.appendChild(domainStyle);