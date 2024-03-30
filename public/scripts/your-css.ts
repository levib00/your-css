(() => {
  const getFromStorage = async (domain: string | undefined) => {
    if (!domain) {
      return {};
    }
    // @ts-ignore
    const domainStorage = await browser.storage.local.get(domain);
    const domainObj = domainStorage[domain];
    // @ts-ignore
    const toggleAllStorage = await browser.storage.local.get('___toggleAll');
    const toggleAll = toggleAllStorage.___toggleAll;
    // @ts-ignore
    const globalStorage = await browser.storage.local.get('__global');
    const global = globalStorage.__global;
    return { domain: domainObj, ___toggleAll: toggleAll, __global: global };
  };

  const domainStyle: HTMLStyleElement = document.createElement('style');

  const url = new URL(window.location.href);
  const domain: string | undefined = url.hostname;

  const getStyleValue = (styles: {
    [key: string]: {
      isActive?: boolean,
      css?: string,
      undeleteable?: boolean,
      displayName?: string, domain: string
    } | undefined
  } | undefined) => {
    if (!styles) {
      return '';
    }
    const { domain: stylesForDomain, ___toggleAll: toggleAll, __global: global } = styles;
    let css = '';
    if ((!stylesForDomain?.isActive && !global?.isActive) || (toggleAll && !toggleAll?.isActive)) {
      return '';
    }
    if (global?.isActive && global?.css) {
      css = css.concat(global.css);
    }
    if (stylesForDomain?.isActive && stylesForDomain.css) {
      css = css.concat(stylesForDomain.css);
    }
    return css;
  };

  (async () => {
    const stylesFromStorage = await getFromStorage(domain);
    let css = '';
    if (stylesFromStorage) {
      css = getStyleValue(stylesFromStorage);
    }
    domainStyle.appendChild(document.createTextNode(css));
  })();

  document.head.appendChild(domainStyle);
})();
