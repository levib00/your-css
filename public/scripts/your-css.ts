interface Domain {
  isActive?: boolean,
  css?: string
  undeleteable?: boolean
  displayName?: string
};

interface IStyle {
  [key: string] : Domain
};

(() => {
  const getFromStorage = async(domain: string | undefined) => {
    if (!domain) {
      return
    }
    // @ts-ignore
    const domainStorage = await browser.storage.local.get(domain)
    const domainObj = domainStorage[domain]
    // @ts-ignore
    const ___toggleAllStorage = await browser.storage.local.get('___toggleAll')
    const ___toggleAll = ___toggleAllStorage.___toggleAll
    // @ts-ignore
    const __globalStorage = await browser.storage.local.get('__global')
    const __global = __globalStorage.__global
    return {domain: domainObj, ___toggleAll, __global}
  }

  const domainStyle: HTMLStyleElement = document.createElement('style');

  const url = new URL(window.location.href);
  const domain: string | undefined = url.hostname;

  const getStyleValue = (styles: IStyle | undefined) => {
    if (!styles) {
      return ''
    }
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
})()
