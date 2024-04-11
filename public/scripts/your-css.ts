(() => {
  const getFromStorage = async (domain: string | undefined) => {
    const styles = await browser.storage.local.get('styles');

    if (!domain) {
      return {};
    }
    const domainObj = await styles.styles[domain];

    const toggleAll = await styles.styles.___toggleAll;

    const global = await styles.styles.__global;

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
