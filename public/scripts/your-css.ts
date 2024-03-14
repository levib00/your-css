interface Domain {
  isActive?: boolean,
  css?: string
  undeleteable?: boolean
  displayName?: string
};

interface IStyle {
  [key: string] : Domain
};

const getFromStorage = async(domain: string) => {
  // @ts-ignore
  const obj = await browser.storage.local.get(domain)
  // @ts-ignore
  const ___toggleAll = await browser.storage.local.get('___toggleAll')
  // @ts-ignore
  const __global = await browser.storage.local.get('__global')
  return {domain: obj[domain], ___toggleAll, __global}
}

const domainStyle: HTMLStyleElement = document.createElement('style');

const url = new URL(window.location.href);
const domain: string | undefined = url.hostname.split('.')[0];

interface Domain {
  isActive?: boolean,
    css?: string
    undeleteable?: boolean
    displayName?: string
};

const getStyleValue = (styles: IStyle) => {
  const {domain, ___toggleAll, __global} = styles
  let css = ''
  if ((!domain?.isActive && !__global?.isActive) || !___toggleAll?.isActive) {
    return ''
  } 
  if (__global?.isActive && __global?.css) {
    css = css.concat(__global.css)
  }
  if (domain?.isActive && domain.css){
    css = css.concat(domain.css)
  }
  return css
}

(async() => {
  const css = getStyleValue(await getFromStorage(domain))
  domainStyle.appendChild(document.createTextNode(css))
})()

document.head.appendChild(domainStyle);
