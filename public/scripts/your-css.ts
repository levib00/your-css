interface IStyle {
  [key: string] : {
    isActive?: boolean,
    css?: string
    undeleteable?: boolean
    displayName?: string
  }
};

let styles: IStyle = {
  ___toggleAll: {
    isActive: true,
    css: '',
    undeleteable: true,
    displayName: 'toggle all'
  },
  __global: {
    isActive: false, 
    css: '',
    undeleteable: true,
    displayName: 'global styles'
  },
  _extension: {
    isActive: false,
    css: '',
    undeleteable: true,
    displayName: 'extension styles'
  },
};

const setStyles = (newStyles: {[key: string] : {isActive?: boolean, css?: string, undeleteable?: boolean, displayName?: string}}) => {
  if (!newStyles.___toggleAll) {
    newStyles.___toggleAll = styles.___toggleAll
  }
  newStyles.___toggleAll.undeleteable = true
  newStyles.___toggleAll.displayName = 'toggle all'
  if (!newStyles.__global) {
    newStyles.__global = styles.__global
  }
  newStyles.__global.undeleteable = true
  newStyles.__global.displayName = 'global styles'
  if (!newStyles._extension) {
    newStyles._extension = styles._extension
  }
  newStyles._extension.undeleteable = true
  newStyles._extension.displayName = 'extension styles'
  styles = newStyles
  return styles
}

const getFromStorage = async(domain: string) => {
  // @ts-ignore
  const obj = await browser.storage.local.get(domain)
  return obj[domain]
}

const domainStyle: HTMLStyleElement = document.createElement('style');

const url = new URL(window.location.href);
const domain: string | undefined = url.hostname.split('.')[0];

interface Domain {
  isActive?: boolean
  css?: string
};

const getStyleValue = (domain : Domain) => {
  let css = ''
  if ((!domain?.isActive && !styles.__global?.isActive) || !styles.___toggleAll?.isActive) {
    return ''
  } 
  if (styles.__global?.isActive && styles.__global?.css) {
    css = css.concat(styles.__global.css)
  }
  if (domain?.isActive && domain.css){
    css = css.concat(domain.css)
  }
  return css
}

(async() => {
  await getFromStorage(domain).then((style) => {
    domainStyle.appendChild(document.createTextNode(style.css))
  })
})()

document.head.appendChild(domainStyle);
